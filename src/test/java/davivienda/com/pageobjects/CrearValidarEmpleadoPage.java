package davivienda.com.pageobjects;

import static org.junit.Assert.assertTrue;

import java.io.File;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import davivienda.com.utilidades.DaviviendaFunctions;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.core.pages.WebElementFacade;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.remote.LocalFileDetector;

import java.net.URL;

public class CrearValidarEmpleadoPage extends PageObject {

	protected static final Logger logger = LoggerFactory.getLogger(CrearValidarEmpleadoPage.class);
	DaviviendaFunctions funcionesGenerales = new DaviviendaFunctions();
	// String rutaFoto =
	// "C:\\davivienda-automatizacion-master\\src\\test\\resources\\ArchivosFuentes";
	// String rutaDocumento = Paths.get(recurso.toURI()).toFile().getAbsolutePath();
	URL recurso = getClass().getClassLoader().getResource("ArchivosFuentes/Foto.jpeg");

	@FindBy(xpath = "//button[normalize-space()='Add']")
	public WebElementFacade botonAdd;

	// @FindBy(xpath = "//h6[normalize-space()='Add Employee']")
	@FindBy(xpath = "//h6[contains(@class,'orangehrm-main-title') and normalize-space()='Add Employee']")
	public WebElementFacade tituloAddEmployee;

	@FindBy(name = "firstName")
	public WebElementFacade txtFirstName;

	@FindBy(name = "lastName")
	public WebElementFacade txtLastName;

	@FindBy(xpath = "//h6[contains(@class,'orangehrm-main-title') and normalize-space()='Add Employee']")
	private WebElementFacade tituloAddEmployee2;

	@FindBy(xpath = "//button[i[contains(@class,'bi-plus')]]")
	private WebElementFacade btnAddPhoto;

	@FindBy(xpath = "(//input[@type='file'])[1]")
	private WebElementFacade inputFile;

	@FindBy(xpath = "//div[contains(@class,'employee-image')]//img | //img[contains(@class,'employee-image')]")
	private WebElementFacade previewFoto;

	@FindBy(xpath = "//button[normalize-space()='Save']")
	public WebElementFacade botonSave;

	@FindBy(xpath = "//input[@placeholder='Type for hints...']")
	private WebElementFacade campoBusquedaEmpleado;

	@FindBy(xpath = "//button[normalize-space()='Search']")
	public WebElementFacade botonSearch;

	@FindBy(xpath = "//div[contains(@class,'orangehrm-employee-list')]")
	private WebElementFacade tablaEmpleados;

	@FindBy(xpath = "//div[contains(@class,'oxd-table-body')]//div[contains(@class,'oxd-table-row') and @role='row']")
	private List<WebElementFacade> filasTabla;

	public void pulsoBotonAddPage() {
		logger.info("Inicio el paso: Pulso el botón Add");

		if (botonAdd.isPresent()) {

			logger.info("✅ Doy click en boton Add");
			botonAdd.click();
			waitFor(1).seconds();

		} else {
			String error = "❌ La aplicacion no carga el botón ADD";
			logger.error(error);
			assertTrue(error, false);
		}

		logger.info("Termino el paso: Pulso el botón Add");
	}

	public void agregarNuevoEmpleadoPage(String nombreEmpleado, String apellidoEmpleado) {
		logger.info("Inicio el paso: Agregar nuevo empleado Nombre y Apellido.");

		if (tituloAddEmployee.isPresent()) {
			logger.info("✅ Ingreso al modulo de Add Employee");
			waitFor(1).seconds();
			txtFirstName.type(nombreEmpleado);
			logger.info("✅ Ingreso nombre empleado: " + nombreEmpleado);

			txtLastName.type(apellidoEmpleado);
			logger.info("✅ Ingreso apellido empleado: " + apellidoEmpleado);
			waitFor(1).seconds();

		} else {
			String error = "❌ No se ingrese a Add Employee";
			logger.error(error);
			assertTrue(error, false);
		}

		logger.info("Termino el paso: Agregar nuevo empleado Nombre y Apellido.");
	}

	public void suboFotoEmpleadoPage() {
		logger.info("Inicio el paso: Subo la foto del empleado.)");

		URL recursoImg = getClass().getClassLoader().getResource("ArchivosFuentes/Foto.jpeg"); // o Foto.png
		if (recursoImg == null) {
			String error = "❌ No se encontró 'src/test/resources/ArchivosFuentes/Foto.jpeg'";
			logger.error(error);
			assertTrue(error, false);
		}
		File img = new File(recursoImg.getFile());
		if (!img.exists()) {
			String error = "❌ La imagen no existe físicamente: " + img.getAbsolutePath();
			logger.error(error);
			assertTrue(error, false);
		}
		String rutaDocumento = img.getAbsolutePath();
		logger.info("📁 Ruta del archivo a subir: " + rutaDocumento);

		boolean esRemoto = (getDriver() instanceof RemoteWebDriver);

		if (btnAddPhoto.isPresent()) {
			evaluateJavascript("arguments[0].scrollIntoView({block:'center'});", btnAddPhoto);
			evaluateJavascript("arguments[0].click();", btnAddPhoto);
			logger.info("🖱️ Click (JS) en 'Add photo'");
		} else {
			String error = "❌ No se encontró el botón 'Add photo'.";
			logger.error(error);
			assertTrue(error, false);
		}

		if (esRemoto) {

			((RemoteWebDriver) getDriver()).setFileDetector(new LocalFileDetector());
			logger.info("🌐 RemoteWebDriver detectado: habilito LocalFileDetector");

			if (inputFile.isPresent()) {
				evaluateJavascript("arguments[0].style.display='block';" + "arguments[0].style.visibility='visible';"
						+ "arguments[0].removeAttribute('hidden');" + "arguments[0].removeAttribute('disabled');",
						inputFile);
				inputFile.sendKeys(rutaDocumento);
				logger.info("📤 Archivo enviado por sendKeys (remoto).");
			} else {
				String error = "❌ No se encontró el <input type='file'> en modo remoto.";
				logger.error(error);
				assertTrue(error, false);
			}

		} else {

			String autoIt3Path = DaviviendaFunctions.AUTOIT3_PATH;

			URL recursoAu3 = getClass().getClassLoader().getResource("ArchivosFuentes/CargarDocumentoSoporte.au3");
			if (recursoAu3 == null) {
				String error = "❌ No se encontró 'src/test/resources/ArchivosFuentes/CargarDocumentoSoporte.au3'";
				logger.error(error);
				assertTrue(error, false);
			}
			String rutaAu3 = new File(recursoAu3.getFile()).getAbsolutePath();
			logger.info("📄 Script AU3: " + rutaAu3);

			URL recursoExe = getClass().getClassLoader().getResource("ArchivosFuentes/CargarDocumentoSoporte.exe");
			if (recursoExe == null) {
				String error = "❌ No se encontró 'src/test/resources/ArchivosFuentes/CargarDocumentoSoporte.exe'";
				logger.error(error);
				assertTrue(error, false);
			}
			String rutaExe = new File(recursoExe.getFile()).getAbsolutePath();
			logger.info("🧰 Ejecutable EXE: " + rutaExe);

			DaviviendaFunctions.ejecutarAutoItScript(autoIt3Path, rutaAu3, rutaDocumento);
			waitFor(1).seconds();
			DaviviendaFunctions.cargarArchivoUploadWindowsFijo(rutaExe);

			logger.info("📤 Subida ejecutada con AU3 + EXE (local).");
		}

		if (previewFoto.isPresent()) {
			previewFoto.waitUntilVisible();
			logger.info("✅ Foto cargada y vista previa visible.");
		} else {
			String error = "❌ La vista previa de la foto no se visualiza correctamente.";
			logger.error(error);
			assertTrue(error, false);
		}

		waitFor(1).seconds();
		logger.info("Termino el paso: Subo la foto del empleado.");
	}

	public void pulsoBotonSavePage() {
		logger.info("Inicio el paso: Pulso el botón Save");
		waitFor(2).seconds();

		if (botonSave.isPresent()) {
			evaluateJavascript("arguments[0].scrollIntoView({block:'center'});", botonSave);
			botonSave.waitUntilClickable().click();
			logger.info("✅ Clic en botón Save");
			waitFor(1).seconds();
		} else {
			String error = "❌ La aplicación no cargó el botón Save";
			logger.error(error);
			assertTrue(error, false);
		}

		logger.info("Termino el paso: Pulso el botón Save");
	}

	public void ejecutoBusquedaEmpleadoNombreApellidoPage(String nombreEmpleado, String apellidoEmpleado) {
		logger.info("Inicio el paso: Ejecuto búsqueda del empleado por Nombre <" + nombreEmpleado + "> y Apellido <"
				+ apellidoEmpleado + ">");

		if (campoBusquedaEmpleado.isPresent()) {
			campoBusquedaEmpleado.waitUntilVisible();
			campoBusquedaEmpleado.clear();
			waitFor(1).seconds();

			String textoBusqueda = nombreEmpleado + " " + apellidoEmpleado;
			campoBusquedaEmpleado.type(textoBusqueda);
			logger.info("🖋️ Escribo en el campo de búsqueda: " + textoBusqueda);

			waitFor(2).seconds();
			logger.info("✅ Búsqueda ingresada correctamente.");

		} else {
			String error = "❌ La aplicación no cargó el campo de búsqueda del empleado.";
			logger.error(error);
			assertTrue(error, false);
		}

		logger.info("Termino el paso: Ejecuto búsqueda del empleado por Nombre y Apellido.");
	}

	public void pulsoBotonSearchPage() {
		logger.info("Inicio el paso: Pulso el botón  Search ");

		if (botonSearch.isPresent()) {
			evaluateJavascript("arguments[0].scrollIntoView({block:'center'});", botonSearch);
			botonSearch.waitUntilClickable().click();
			logger.info("✅ Clic en botón  Search ");
			waitFor(1).seconds();
		} else {
			String error = "❌ La aplicación no cargó el botón Search.";
			logger.error(error);
			assertTrue(error, false);
		}

		logger.info("Termino el paso: Pulso el botón Search.");
	}

	public void validoEmpleadoExisteEnTablaPage(String nombreEsperado, String apellidoEsperado) {
		logger.info("Inicio el paso: Valido empleado en tabla -> Nombre <" + nombreEsperado + "> Apellido <"
				+ apellidoEsperado + ">");

		if (tablaEmpleados.isPresent()) {
			tablaEmpleados.waitUntilVisible();
			waitFor(1).seconds();
		} else {
			String error = "❌ La tabla de empleados no está visible.";
			logger.error(error);
			assertTrue(error, false);
		}

		if (filasTabla == null || filasTabla.isEmpty()) {
			String error = "❌ No se encontraron filas en la tabla de empleados.";
			logger.error(error);
			assertTrue(error, false);
		}

		boolean encontrado = false;
		for (WebElementFacade fila : filasTabla) {

			WebElementFacade celdaNombre = fila.findBy(".//div[@role='cell'][3]//div[normalize-space()]");
			WebElementFacade celdaApellido = fila.findBy(".//div[@role='cell'][4]//div[normalize-space()]");

			String nombreTabla = (celdaNombre != null) ? celdaNombre.getText().trim() : "";
			String apellidoTabla = (celdaApellido != null) ? celdaApellido.getText().trim() : "";

			logger.info("🔎 Fila -> Nombre: '" + nombreTabla + "' | Apellido: '" + apellidoTabla + "'");

			if (nombreTabla.equalsIgnoreCase(nombreEsperado.trim())
					&& apellidoTabla.equalsIgnoreCase(apellidoEsperado.trim())) {
				encontrado = true;
				logger.info("✅ Empleado encontrado en la tabla: " + nombreTabla + " " + apellidoTabla);
				break;
			}
		}

		if (!encontrado) {
			String error = "❌ Empleado NO encontrado en la tabla: " + nombreEsperado + " " + apellidoEsperado;
			logger.error(error);
			assertTrue(error, false);
		}

		logger.info("Termino el paso: Validación de empleado en tabla.");
	}

}