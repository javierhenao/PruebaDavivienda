package davivienda.com.Api;

import io.restassured.http.Cookies;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.Cookie; // ✅ import correcto de Selenium

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Convierte las cookies del WebDriver (UI) en cookies de Rest-Assured,
 * para reutilizar la sesión del navegador en las pruebas de API.
 */
public class SessionCookies {

    public static Cookies from(WebDriver driver) {
        // Cookies del navegador (Selenium)
        Set<Cookie> selCookies = driver.manage().getCookies();

        // Convertirlas a cookies de Rest-Assured
        List<io.restassured.http.Cookie> restCookies = selCookies.stream()
                .map(c -> new io.restassured.http.Cookie.Builder(c.getName(), c.getValue())
                        .setDomain(c.getDomain())
                        .setPath(c.getPath())
                        .setSecured(c.isSecure())
                        .setHttpOnly(c.isHttpOnly())
                        .build())
                .collect(Collectors.toList());

        return new Cookies(restCookies);
    }
    
    
}


