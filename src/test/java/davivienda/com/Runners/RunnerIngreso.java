package davivienda.com.Runners;

import java.io.IOException;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.junit.runner.RunWith;

import cucumber.api.CucumberOptions;
import cucumber.api.SnippetType;
import cucumber.api.junit.Cucumber;
import davivienda.com.utilidades.BeforeSuite;
import davivienda.com.utilidades.DataToFeature;
import net.serenitybdd.cucumber.CucumberWithSerenity;



@CucumberOptions(features ="src/test/resources/feature/"
				,glue = "davivienda.com"
				,tags = {"@CrearValidarEmpleadoExitoso"},
				monochrome= true)
@RunWith(RunnerPersonalizado.class)
public class RunnerIngreso {

	@BeforeSuite
	public static void test() throws InvalidFormatException, IOException {		
		DataToFeature.overrideFeatureFiles("./src/test/resources/feature/");
		}
}
 



