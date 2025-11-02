package davivienda.com.hooks;

import cucumber.api.java.Before;
import net.serenitybdd.rest.SerenityRest;

public class ApiHooks {
    @Before("@PruebaAPI")
    public void habilitarLoggingApi() {
        // Muestra request/response en el reporte cuando una aserción falle
        SerenityRest.enableLoggingOfRequestAndResponseIfValidationFails();
    }
}
