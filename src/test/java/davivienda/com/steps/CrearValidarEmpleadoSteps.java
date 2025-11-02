package davivienda.com.steps;

import java.io.IOException;

import davivienda.com.pageobjects.CrearValidarEmpleadoPage;
import net.thucydides.core.annotations.Step;

public class CrearValidarEmpleadoSteps {

	CrearValidarEmpleadoPage crearValidarEmpleadoPage;

	@Step
	public void pulsoBotonAddSteps() {
		crearValidarEmpleadoPage.pulsoBotonAddPage();
	}

	@Step
	public void agregarNuevoEmpleadoSteps(String nombreEmpleado, String apellidoEmpleado) {
		crearValidarEmpleadoPage.agregarNuevoEmpleadoPage(nombreEmpleado, apellidoEmpleado);
	}

	@Step
	public void suboFotoEmpleadoSteps() {
		crearValidarEmpleadoPage.suboFotoEmpleadoPage();
	}

	@Step
	public void pulsoBotonSaveSteo() {
		crearValidarEmpleadoPage.pulsoBotonSavePage();
	}

	@Step
	public void ejecutoBusquedaEmpleadoNombreApellidoSteps(String nombreEmpleado, String apellidoEmpleado) {
		crearValidarEmpleadoPage.ejecutoBusquedaEmpleadoNombreApellidoPage(nombreEmpleado, apellidoEmpleado);
	}

	@Step
	public void pulsoBotonSearchSteps() {
		crearValidarEmpleadoPage.pulsoBotonSearchPage();
	}

	@Step
	public void validoEmpleadoExisteEnTablaSteps(String nombreEsperado, String apellidoEsperado) {
		crearValidarEmpleadoPage.validoEmpleadoExisteEnTablaPage(nombreEsperado, apellidoEsperado);
	}

}
