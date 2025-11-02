package davivienda.com.steps;

import davivienda.com.pageobjects.IngresoPage;
import net.thucydides.core.annotations.Step;

	
public class IngresoSteps {

	IngresoPage ingresoPage;
			
	@Step
	public void ingresoSitioLoginSteps() {
		ingresoPage.open();
	}
			
	@Step
	public void ingresarSitioSteps(String username, String password) {		
		ingresoPage.ingresarSitioPage(username,password);
	}
				
	
}
