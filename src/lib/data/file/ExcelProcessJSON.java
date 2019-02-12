package lib.data.file;

import java.io.InputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.Set;
import java.util.TimeZone;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.ss.usermodel.DateUtil;
//import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import lib.db.sw.ProcedimientoDB;
import lib.utils.GeneralUtility;
import lib.utils.TimeUtility;

@Controller
public class ExcelProcessJSON {

	
	//Importar Excel
	@RequestMapping(value = "/work/ExcelImport/modifyDataTrabajadorPerProcess/", method = RequestMethod.POST)
	public @ResponseBody ResponseEntity<Set<String>> modifyDataTrabajadorPerProcess(HttpServletRequest request, HttpSession httpSession,
		@RequestParam("documento") MultipartFile multipartFile) throws Exception{
		
		//Mensajes de Error
		String process_error = "";
		
		// Obtener Documento en InputStream
		InputStream fileInputStream = multipartFile.getInputStream();
		System.out.println(multipartFile.getSize());
		LinkedHashMap<Integer,LinkedList<String>> datos = new LinkedHashMap<Integer, LinkedList<String>>();
		
		//Leer Excel
		OPCPackage pkg = OPCPackage.open(fileInputStream);
		//POIFSFileSystem fs = new POIFSFileSystem(fileInputStream);
		
		//Instancia del Libro
		 Workbook workbook;
	     workbook = WorkbookFactory.create(pkg);
	     Sheet sheet = workbook.getSheetAt(0);
	     Row row;
	       for (int i = 1; i <= sheet.getLastRowNum(); i++) {
	    	   
	    	   row = (Row) sheet.getRow(i);
	    	   //int maxCell=  row.getLastCellNum();
	    	   LinkedList<String> celdaExcel = new LinkedList<>();
	        	
	    	   boolean error = false;

	    	   String rut = "";
	    	   String fechaIngreso = "";
	    	   String fechaTermino = "";
	    	   
	    	   try {
	    		   fechaIngreso =  row.getCell(3).getStringCellValue();
	    	   } catch (Exception e) {
	    		   fechaIngreso = "";
	    	   }
	    	   
	    	   try {
	    		   fechaTermino =  row.getCell(4).getStringCellValue();
	    	   } catch (Exception e) {
	    		   fechaTermino = "";
		       }
	    	  
	    		   
	    		   try{
	  
	    			 if(!row.getCell(1).getStringCellValue().isEmpty()){
	    				 rut = row.getCell(1).getStringCellValue();
	    			 }
	    			 
	    			 if(!row.getCell(3).getStringCellValue().isEmpty()){
	    				 rut = row.getCell(3).getStringCellValue();
	    			 }
	    			   
	    			 if(!row.getCell(4).getStringCellValue().isEmpty()){
	    				 rut = row.getCell(4).getStringCellValue();
	    			 } 
	    			 
	    			 
	    			 fechaIngreso = GeneralUtility.convertStringToYYYYMMDD(fechaIngreso);
	    			 fechaTermino = GeneralUtility.convertStringToYYYYMMDD(fechaTermino);
	    			 
	    			 celdaExcel.add(rut);
	    			 celdaExcel.add(fechaIngreso);
	    			 celdaExcel.add(fechaTermino);
	    			 
			    	 } catch (Exception e) {
			    		 process_error += " <br> <p class='btn-danger'> Error en la Linea: "+ (i+1) + "</p> ";
			    		 error = true;
			    	 }
	    		   
	    	   if(!error){
	    	   datos.put(i, celdaExcel);
	    	   }
	    	   
	        }
	        	
	    process_error = ProcedimientoDB.modifyDataTrabajadorPerProcess2(datos, process_error);

		return new ResponseEntity<>(Collections.singleton(process_error), HttpStatus.OK);
	}
			
	
	
}

