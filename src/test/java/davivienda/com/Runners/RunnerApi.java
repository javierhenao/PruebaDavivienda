package davivienda.com.Runners;

import org.junit.runner.RunWith;

import cucumber.api.CucumberOptions;



@RunWith(net.serenitybdd.cucumber.CucumberWithSerenity.class)
@CucumberOptions(
    features = "src/test/resources/feature",
    glue = {"davivienda.com.definitions"},
    tags = "@PruebaAPI",                 // filtra por tag si quieres
    monochrome = true,
    plugin = {"pretty"}
)
public class RunnerApi { }


 



