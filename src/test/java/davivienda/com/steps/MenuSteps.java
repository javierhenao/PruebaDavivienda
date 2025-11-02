package davivienda.com.steps;

import davivienda.com.pageobjects.MenuPage;
import net.thucydides.core.annotations.Step;

	
public class MenuSteps {

	MenuPage menuPage;
			
	
	@Step
	public void validoIngresoExitosoSteps() {
		menuPage.validoIngresoExitoso();
	}
		
	@Step
	public void ingresoModuloPIMSteps() {
		menuPage.ingresoModuloPIMPage();
	}
	
	
	
	@Step
	public void ingresoModuloDirectoryStep() {
		menuPage.ingresoModuloDirectoryPage();
	}
	
	
	
}
