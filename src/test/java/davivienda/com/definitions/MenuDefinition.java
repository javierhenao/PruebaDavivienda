package davivienda.com.definitions;

import cucumber.api.java.en.And;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import davivienda.com.steps.MenuSteps;
import net.thucydides.core.annotations.Steps;

public class MenuDefinition {

	@Steps
	MenuSteps menuSteps;
	
	@Then("^Valido la autenticación en el sistema$") 
	public void valido_la_autenticacion_en_el_sistema(){
		menuSteps.validoIngresoExitosoSteps(); 
	}
	
	@When("^Ingreso al módulo PIM$")
	public void ingreso_al_módulo_PIM() throws Exception {
	    menuSteps.ingresoModuloPIMSteps();
	}
	
	@When("^ingreso al modulo Directory$")
	public void ingreso_al_modulo_Directory() throws Exception {
	    menuSteps.ingresoModuloDirectoryStep();
	}

	 
	
	
}
