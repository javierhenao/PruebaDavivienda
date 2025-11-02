package davivienda.com.utilidades;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Iterator;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class LeerExcel {
	
	@SuppressWarnings("deprecation")
	public static String ReadExcelFiel(String ruta,String posicion) throws IOException {
		FileInputStream file = new FileInputStream(new File(ruta));		
		String celdas[];
		String valorencontrado="";
		celdas = posicion.split(":");
		int Columna =Integer.parseInt(celdas[0]);
		int fila = Integer.parseInt(celdas[1]);;
		// Crear el objeto que tendra el libro de Excel
		
		int i = 0, j = 0;
		XSSFWorkbook workbook = new XSSFWorkbook(file);
		XSSFSheet sheet = workbook.getSheetAt(0);
		Iterator<Row> rowIterator = sheet.iterator();
		Row row;
		// Recorremos todas las filas para mostrar el contenido de cada celda
		while (rowIterator.hasNext()) {
			i = i + 1;
			j = 0;
			row = rowIterator.next();
			// Obtenemos el iterator que permite recorres todas las celdas de una fila
			Iterator<Cell> cellIterator = row.cellIterator();
			Cell celda;
			while (cellIterator.hasNext()) {
				j = j + 1;

				celda = cellIterator.next();
				if (i == fila && j == Columna)
					switch (celda.getCellType()) {
					case Cell.CELL_TYPE_NUMERIC:
						if (DateUtil.isCellDateFormatted(celda)) {
							System.out.println(celda.getDateCellValue());
						} else {
							System.out.println(celda.getNumericCellValue());
						}
						break;
					case Cell.CELL_TYPE_STRING:
						valorencontrado=celda.getStringCellValue();
						break;
					case Cell.CELL_TYPE_BOOLEAN:
						System.out.println(celda.getBooleanCellValue());
						break;
					}

			}
		}

		// cerramos el libro excel

		workbook.close();
		return valorencontrado;

	}

}
