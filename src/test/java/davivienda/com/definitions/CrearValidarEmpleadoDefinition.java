package davivienda.com.definitions;

import cucumber.api.java.en.And;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import davivienda.com.steps.CrearValidarEmpleadoSteps;
import net.thucydides.core.annotations.Steps;

public class CrearValidarEmpleadoDefinition {

	@Steps
	CrearValidarEmpleadoSteps crearValidarEmpleadoSteps;

	@When("^Pulso el botón Add$")
	public void pulso_el_botón_Add() throws Exception {
		crearValidarEmpleadoSteps.pulsoBotonAddSteps();
	}

	@When("^Agregar nuevo empleado Nombre \"([^\"]*)\" y Apellido \"([^\"]*)\"$")
	public void agregar_nuevo_empleado_Nombre_y_Apellido(String nombreEmpleado, String apellidoEmpleado)
			throws Exception {
		crearValidarEmpleadoSteps.agregarNuevoEmpleadoSteps(nombreEmpleado, apellidoEmpleado);

	}

	@When("^Subo la foto del empleado$")
	public void subo_la_foto_del_empleado() throws Exception {
		crearValidarEmpleadoSteps.suboFotoEmpleadoSteps();
	}

	@When("^Pulso el botón Save$")
	public void pulso_el_botón_Save() throws Exception {
		crearValidarEmpleadoSteps.pulsoBotonSaveSteo();
	}

	@When("^Ejecuto busqueda empleado Nombre \"([^\"]*)\" y Apellido \"([^\"]*)\"$")
	public void ejecuto_busqueda_empleado_Nombre_y_Apellido(String nombreEmpleado, String apellidoEmpleado)
			throws Exception {
		crearValidarEmpleadoSteps.ejecutoBusquedaEmpleadoNombreApellidoSteps(nombreEmpleado, apellidoEmpleado);
	}

	@When("^Pulso el botón Search$")
	public void pulso_el_botón_Search() throws Exception {
		crearValidarEmpleadoSteps.pulsoBotonSearchSteps();
	}

	@Then("^Valido que el empleado exista Nombre \"([^\"]*)\" y Apellido \"([^\"]*)\"$")
	public void valido_que_el_empleado_exista_Nombre_y_Apellido(String nombreEmpleado, String apellidoEmpleado)
			throws Exception {
		crearValidarEmpleadoSteps.validoEmpleadoExisteEnTablaSteps(nombreEmpleado, apellidoEmpleado);
	}

}
