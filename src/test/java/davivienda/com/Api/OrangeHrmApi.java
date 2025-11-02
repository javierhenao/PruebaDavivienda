package davivienda.com.Api;

import net.serenitybdd.rest.SerenityRest;
import io.restassured.http.Cookies;
import io.restassured.response.Response;
import io.restassured.filter.log.RequestLoggingFilter;
import io.restassured.filter.log.ResponseLoggingFilter;
import net.serenitybdd.core.Serenity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class OrangeHrmApi {

    private static final Logger LOG = LoggerFactory.getLogger(OrangeHrmApi.class);

    private final String baseUrl;
    private Cookies session;
    private String csrfToken = "";

    public OrangeHrmApi(String baseUrl) {
        this.baseUrl = baseUrl.endsWith("/") ? baseUrl.substring(0, baseUrl.length() - 1) : baseUrl;
        // Logs de request/response en el reporte Serenity
        SerenityRest.filters(new RequestLoggingFilter(), new ResponseLoggingFilter());
    }

    /** Login: guarda cookies y obtiene CSRF desde página autenticada */
    public Cookies login(String user, String pass) {
        // 1) GET de la página de login: toma cookies y token SPA
        Response loginPage = SerenityRest.given()
                .baseUri(baseUrl)
            .when()
                .get("/web/index.php/auth/login");

        Cookies initialCookies = loginPage.detailedCookies();

        String spaToken = extractSpaLoginToken(loginPage.asString());
        spaToken = htmlUnescapeBasic(spaToken); // limpia &quot;...&quot; -> valor real

        // Construye Origin y Referer
        String referer = baseUrl + "/web/index.php/auth/login";
        String origin  = baseUrl; // ya viene con https://... sin / final

        // 2) POST de credenciales: incluye cookies del GET, token y headers
        Response auth = SerenityRest.given()
                .baseUri(baseUrl)
                .cookies(initialCookies)                           // <-- imprescindible
                .header("Origin",  origin)
                .header("Referer", referer)
                .header("X-Requested-With", "XMLHttpRequest")
                .contentType("application/x-www-form-urlencoded; charset=UTF-8")
                // Algunas versiones esperan _token, otras token -> enviamos ambas
                .formParam("_token", spaToken == null ? "" : spaToken)
                .formParam("token",  spaToken == null ? "" : spaToken)
                .formParam("username", user)
                .formParam("password", pass)
            .when()
                .post("/web/index.php/auth/validate");

        // Mezcla cookies del GET y del POST (el POST suele emitir nueva cookie de sesión)
        Cookies merged = mergeCookies(initialCookies, auth.detailedCookies());
        this.session = merged;

        // 3) Verifica si realmente estás autenticado visitando un recurso protegido
        Response dash = SerenityRest.given()
                .baseUri(baseUrl)
                .cookies(session)
            .when()
                .get("/web/index.php/dashboard/index");

        boolean stillOnLogin = dash.asString().contains("<auth-login")
                            || dash.asString().toLowerCase().contains("auth-login");

        if (stillOnLogin) {
            // No se autenticó: registra data para depurar y corta aquí
            LOG.warn("⚠️ Login NO exitoso. Verifica token/headers. Se quedó en la pantalla de login.");
            Serenity.recordReportData().withTitle("Login page (after POST)").andContents(dash.asString());
            // Deja csrfToken vacío y devuelve las cookies actuales (no autenticadas)
            this.csrfToken = "";
            return this.session;
        }

        // 4) Ya autenticado: navega a PIM y extrae CSRF
        Response pim = SerenityRest.given()
                .baseUri(baseUrl)
                .cookies(session)
            .when()
                .get("/web/index.php/pim/viewEmployeeList");

        this.csrfToken = firstNonEmpty(
                extractMetaCsrf(pim.asString()),
                extractJsCsrf(pim.asString())
        );

        // Si por alguna razón no se obtuvo en PIM, intenta en Dashboard (ya autenticado)
        if (isBlank(csrfToken)) {
            Response dash2 = SerenityRest.given()
                    .baseUri(baseUrl)
                    .cookies(session)
                .when()
                    .get("/web/index.php/dashboard/index");
            this.csrfToken = firstNonEmpty(
                    csrfToken,
                    extractMetaCsrf(dash2.asString()),
                    extractJsCsrf(dash2.asString())
            );
        }

        LOG.info("⛭ CSRF token capturado: '{}'", csrfToken);
        LOG.info("⛭ Cookies de sesión: {}", session.asList());

        Serenity.recordReportData().withTitle("CSRF token").andContents(csrfToken == null ? "" : csrfToken);
        Serenity.recordReportData().withTitle("Cookies de sesión").andContents(session.asList().toString());

        return this.session;
    }

    /** Buscar empleados por nombre (o ID) */
    public Response buscarEmpleadosPorNombre(String nombreCompleto) {
        io.restassured.specification.RequestSpecification req = SerenityRest.given()
                .baseUri(baseUrl)
                .basePath("/web/index.php/api/v2/pim/employees")
                .cookies(session)
                .header("X-Requested-With", "XMLHttpRequest")
                .header("Accept", "application/json")
                .queryParam("limit", 50)
                .queryParam("offset", 0)
                .queryParam("nameOrId", nombreCompleto);

        if (!isBlank(csrfToken)) {
            req.header("X-CSRF-Token", csrfToken);
        }

        return req.when().get();
    }


    // ---------------- utilidades ----------------

    // token="&quot;....&quot;" en el componente <auth-login ...>
    private String extractSpaLoginToken(String html) {
        Pattern p = Pattern.compile("token=\\\"&quot;([^\\\"]+)&quot;\\\"");
        Matcher m = p.matcher(html);
        return m.find() ? m.group(1) : "";
    }

    private String htmlUnescapeBasic(String s) {
        if (s == null) return null;
        return s.replace("&quot;", "\"")
                .replace("&amp;", "&")
                .replace("&#39;", "'")
                .replace("&lt;", "<")
                .replace("&gt;", ">");
    }

    // <meta name="csrf-token" content="XYZ">
    private String extractMetaCsrf(String html) {
        Pattern p = Pattern.compile(
                "<meta\\s+name=[\"']csrf-token[\"']\\s+content=[\"']([^\"']+)[\"']\\s*/?>",
                Pattern.CASE_INSENSITIVE
        );
        Matcher m = p.matcher(html);
        return m.find() ? m.group(1) : "";
    }

    // Busca en scripts algo como: "csrfToken":"XXXX"
    private String extractJsCsrf(String html) {
        Pattern p = Pattern.compile("\"csrfToken\"\\s*:\\s*\"([^\"]+)\"");
        Matcher m = p.matcher(html);
        return m.find() ? m.group(1) : "";
    }

    private static boolean isBlank(String s) {
        return s == null || s.trim().isEmpty();
    }

    @SafeVarargs
    private static <T> T firstNonEmpty(T... values) {
        for (T v : values) {
            if (v instanceof String) {
                if (!isBlank((String) v)) return v;
            } else if (v != null) {
                return v;
            }
        }
        return null;
    }
    
    private Cookies mergeCookies(Cookies a, Cookies b) {
        io.restassured.http.Cookie.Builder builder = null; // no se usa, pero dejamos visible
        io.restassured.http.Cookies result = a;
        for (io.restassured.http.Cookie c : b.asList()) {
            result = result.hasCookieWithName(c.getName())
                    ? result // si ya está, lo deja
                    : new Cookies(result.asList()) {{
                          asList().add(c);
                      }};
        }
        // Si b trae una cookie con el mismo nombre, mejor preferimos b:
        for (io.restassured.http.Cookie c : b.asList()) {
            if (result.hasCookieWithName(c.getName())) {
                // reemplazo "manual": reconstruir listado
                java.util.List<io.restassured.http.Cookie> list = new java.util.ArrayList<>(result.asList());
                list.removeIf(x -> x.getName().equalsIgnoreCase(c.getName()));
                list.add(c);
                result = new Cookies(list);
            }
        }
        return result;
    }

    // Getters opcionales si los necesitas en otras clases
    public Cookies getSession() { return session; }
    public String getCsrfToken() { return csrfToken; }
}
