package davivienda.com.steps;

import static org.junit.Assert.assertTrue;
import net.thucydides.core.annotations.Step;
import net.serenitybdd.rest.SerenityRest;
import io.restassured.response.Response;
import net.serenitybdd.core.Serenity;
import net.thucydides.core.steps.ScenarioSteps;
import net.thucydides.core.annotations.Step;


public class ApiEmpleadosSteps extends ScenarioSteps {

	private String baseUrl = System.getProperty(
		    "orange.api.base",
		    "https://opensource-demo.orangehrmlive.com"
		);

    @Step("Consultar empleados por nombre: {0}")
    public Response consultarEmpleadosPorNombre(String nombreCompleto) {
        // Puedes cambiar path y query según el servicio real o un mock
        Response resp = SerenityRest.given()
                .baseUri(baseUrl)
                .basePath("/web/index.php/api/v2/pim/employees")
                .queryParam("name", nombreCompleto)
            .when()
                .get();

        // Registra request/response en el reporte Serenity
        Serenity.recordReportData()
                .withTitle("API Request")
                .andContents("GET " + baseUrl + "/web/index.php/api/v2/pim/employees?name=" + nombreCompleto);

        //Serenity.recordReportData()
                //.withTitle("API Response (" + resp.statusCode() + ")")
                //.andContents(resp.asPrettyString());
        
        Serenity.recordReportData()
        .withTitle("API Response (" + resp.statusCode() + ")")
        .andContents(resp.asString());
                


        return resp;
    }

    @Step("Validar status HTTP: {1}")
    public void validarStatus(Response resp, int statusEsperado) {
        resp.then().statusCode(statusEsperado);
    }

    @Step("Validar que el body contenga nombre: {0} y apellido: {1}")
    public void validarNombreApellido(Response resp, String nombre, String apellido) {
        String body = resp.asString();
        assertTrue("No se encontró el nombre en la respuesta", body.contains(nombre));
        assertTrue("No se encontró el apellido en la respuesta", body.contains(apellido));
    }
}
