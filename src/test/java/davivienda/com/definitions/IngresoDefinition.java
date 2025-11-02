package davivienda.com.definitions;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.When;
import davivienda.com.steps.IngresoSteps;
import net.thucydides.core.annotations.Steps;

public class IngresoDefinition {

	@Steps
	IngresoSteps ingresoSteps;
	
	@Given("^Ingreso al sitio$") 
	public void ingresoSitioLogin(){
		ingresoSteps.ingresoSitioLoginSteps(); 
	}	
	
	@When("^Ingreso el \"([^\"]*)\", \"([^\"]*)\", y pulso el botón Login$")
	public void ingreso_el_y_pulso_el_botón_Login(String username, String password) throws Exception {
	    ingresoSteps.ingresarSitioSteps(username, password);
	    
	}
	
}
