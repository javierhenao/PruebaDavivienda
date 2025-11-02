package davivienda.com.pageobjects;

import net.serenitybdd.core.Serenity;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import static org.junit.Assert.assertTrue;
import org.openqa.selenium.support.ui.Select;
import net.serenitybdd.core.pages.PageObject;

public class IngresoPage extends PageObject{	
	protected static final Logger logger = LoggerFactory.getLogger(IngresoPage.class);
			 				
	
	@FindBy(name="username")
	public WebElementFacade txtUserName;
	
	@FindBy(name="password")
	public WebElementFacade txtPasswordDocumento;
	
	@FindBy (xpath = "//button[normalize-space()='Login']")               
	public WebElementFacade bntLogIn;
			
	
	public void ingresarSitioPage(String username, String password) {		
		logger.info("Inicia el paso: Ingreso el username y password, pulso el botón Login");
		waitFor(1).seconds();
		if(txtUserName.isPresent()) {
			
			txtUserName.sendKeys(username);
			logger.info(String.format("Escribí en el campo Username: '%s'",username));
			txtPasswordDocumento.sendKeys(password);		
			logger.info(String.format("Escribí en el campo password: '%s'",password));
			Serenity.takeScreenshot();
			bntLogIn.click();
			logger.info("Pulse el botón LogIn");		
			logger.info("Finaliza el paso: Ingreso el username y password, pulso el botón Login");			
		}else {
			assertTrue("No se encuentra el sitio para realizar login", false);
		}
		
	}
		
}