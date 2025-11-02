package davivienda.com.definitions;

import static org.junit.Assert.*;
import cucumber.api.java.en.*;
import io.restassured.response.Response;
import davivienda.com.Api.OrangeHrmApi;

public class EmpleadosApiDefinition {

    OrangeHrmApi api = new OrangeHrmApi(System.getProperty(
        "orange.api.base",
        "https://opensource-demo.orangehrmlive.com"
    ));
    Response resp;

    @Given("^inicio sesión en la API con usuario \"([^\"]+)\" y clave \"([^\"]+)\"$")
    public void loginApi(String user, String pass) {
        api.login(user, pass); // prepara cookies de sesión
    }

    @When("^consulto la API de empleados por nombre \"([^\"]+)\"$")
    public void consultarApiPorNombre(String nombreCompleto) {
        resp = api.buscarEmpleadosPorNombre(nombreCompleto);
    }

    @Then("^la respuesta debe tener status (\\d+)$")
    public void validarStatus(int esperado) {
        assertEquals("Código de respuesta inesperado", esperado, resp.statusCode());
    }

    @And("^la respuesta debe incluir el nombre \"([^\"]+)\" y el apellido \"([^\"]+)\"$")
    public void validarNombreApellido(String nombre, String apellido) {
        String body = resp.asString();
        assertTrue("No se encontró el nombre en la respuesta", body.contains(nombre));
        assertTrue("No se encontró el apellido en la respuesta", body.contains(apellido));
    }
    
    

}
