package davivienda.com.utilidades;

import static org.junit.Assert.assertTrue;

import java.awt.AWTException;
import java.awt.Rectangle;
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.datatransfer.StringSelection;
import java.awt.event.KeyEvent;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.Connection;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Random;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.imageio.ImageIO;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.io.comparator.LastModifiedFileComparator;
import org.apache.commons.lang.math.RandomUtils;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.encryption.InvalidPasswordException;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.pdfbox.text.PDFTextStripperByArea;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.Wait;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.Marker;
import org.slf4j.MarkerFactory;
import com.codoid.products.exception.FilloException;
import com.codoid.products.fillo.Fillo;
import com.codoid.products.fillo.Recordset;
import com.paulhammant.ngwebdriver.ByAngular;
import com.paulhammant.ngwebdriver.ByAngularBinding.FindBy;
import io.restassured.RestAssured;
import net.serenitybdd.core.Serenity;
import net.serenitybdd.core.exceptions.SerenityManagedException;
import net.serenitybdd.core.pages.PageObject;
import net.thucydides.core.steps.StepEventBus;

import java.net.URL;


@SuppressWarnings("unused")
public class DaviviendaFunctions extends PageObject {
	
	Properties prop = new Properties();
	InputStream input = null;
	static Marker fatal = MarkerFactory.getMarker("FATAL");
	static final Logger logger = LoggerFactory.getLogger(DaviviendaFunctions.class);
	static String fechaGeneradaCUPGlobal = "";
		
		    	
	public static void cargarArchivoUploadWindowsFijo(String exeAutoItFijo){
	    try{
	        new ProcessBuilder(exeAutoItFijo).start(); // sin argumentos
	    }catch(Exception e){
	        assertTrue("Fallo AutoIt fijo: " + e.getMessage(), false);
	    }
	}
	
	
	// Ruta instalada de AutoIt3.exe (ajústala a tu equipo)
	public static final String AUTOIT3_PATH = "C:\\Program Files (x86)\\AutoIt3\\AutoIt3.exe";
	// Si usas x64: public static final String AUTOIT3_PATH = "C:\\Program Files\\AutoIt3\\AutoIt3.exe";

	public static void ejecutarAutoItScript(String autoIt3Exe, String rutaAu3, String argumentoOpcional) {
	    try {
	        ProcessBuilder pb = (argumentoOpcional == null || argumentoOpcional.trim().isEmpty())
	                ? new ProcessBuilder(autoIt3Exe, rutaAu3)                 // AU3 “fijo”
	                : new ProcessBuilder(autoIt3Exe, rutaAu3, argumentoOpcional); // AU3 con argumento (ruta del archivo)
	        pb.redirectErrorStream(true);
	        pb.start();
	    } catch (Exception e) {
	        assertTrue("Fallo ejecutando AutoIt3 + AU3: " + e.getMessage(), false);
	    }
	}

	
	}
