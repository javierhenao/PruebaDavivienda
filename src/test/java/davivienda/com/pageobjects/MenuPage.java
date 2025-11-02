package davivienda.com.pageobjects;

import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import static org.junit.Assert.assertTrue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import net.serenitybdd.core.pages.PageObject;

public class MenuPage extends PageObject {

	protected static final Logger logger = LoggerFactory.getLogger(MenuPage.class);

	
	@FindBy(xpath = "//img[@alt='client brand banner']")
	public WebElementFacade lblOrangeHRM;

	
	
	@FindBy(xpath = "//span[normalize-space()='PIM']")
	public WebElementFacade menuPIM;

		
	@FindBy(xpath = "//span[normalize-space()='Directory']")
	public WebElementFacade menuDirectory;
	
	

	public void validoIngresoExitoso() {
		logger.info("Inicio el paso: Valido la autenticación en el sistema");
		if (lblOrangeHRM.isPresent()) {
			logger.info("✅ Ingreso correcto");
		} else {
			assertTrue("No se realizo login, revise las credenciales de acceso", false);
		}
		logger.info("Termino el paso: Valido la autenticación en el sistema");
	}

		
	public void ingresoModuloPIMPage () {
		logger.info("Inicio el paso: Ingreso al módulo PIM.");
		waitForAngularRequestsToFinish();
		if (menuPIM.isPresent()) {
			menuPIM.click();
	        logger.info("✅ Clic en la opcion PIM");
			waitFor(1).seconds();
			//waitForAngularRequestsToFinish();
		} else {
			assertTrue("No se encuentra la opción PIM", false);
		}

		logger.info("Termino el paso: Ingreso al módulo PIM. ");
	}

		
	public void ingresoModuloDirectoryPage() {
		logger.info("Inicio el paso: Ingreso al módulo Directory.");
		waitForAngularRequestsToFinish();
		if (menuDirectory.isPresent()) {
			menuDirectory.click();
			logger.info("✅ Clic en la opcion Directory");
			waitFor(1).seconds();
			//waitForAngularRequestsToFinish();
		} else {
			assertTrue("No se encuentra la opción Directory", false);
		}

		logger.info("Termino el paso: Ingreso al módulo Directory. ");
	}

	
}