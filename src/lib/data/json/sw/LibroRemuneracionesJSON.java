package lib.data.json.sw;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Set;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import cl.expled.web.periodoLibroRem;
import excelCreator.Excel;
import lib.classSW.LibroRemuneraciones;
import lib.db.sw.LibroRemuneracionesDB;
import lib.security.session;
import wordCreator.utils;

@Controller		
public class LibroRemuneracionesJSON {
	@RequestMapping(value = "/work/Remuneraciones/getLibroRemuneraciones/", method = { RequestMethod.GET })
	public @ResponseBody int getLibroRemuneraciones(HttpSession httpSession) throws Exception {

		session ses = new session(httpSession);
		ArrayList<LibroRemuneraciones> libro=LibroRemuneracionesDB.getRows();
		Excel excel=new Excel();
		if (ses.isValid()) {
			return 0;
		}
		excel.CrearLibroDeRemuneraciones(libro, "libroDePrueba");
	
		return 1;

	}
	@RequestMapping(value = "/work/Remuneraciones/getPeriodos/", method = { RequestMethod.GET })
	public @ResponseBody ArrayList<periodoLibroRem> getPeriodos(HttpSession httpSession) throws Exception {

		session ses = new session(httpSession);
		ArrayList<periodoLibroRem> periodos= new ArrayList<periodoLibroRem>();
		
		if (ses.isValid()) {
			return periodos;
		}
		return LibroRemuneracionesDB.getPeriodos();
	}
	@RequestMapping(value = "/work/Remuneraciones/getLibroRemuneracionesByEmpresaPeriodo/{Nombre}/{Empresa}/{Periodo}", method = { RequestMethod.GET })
	public @ResponseBody int getLibroRemuneracionesByEmpresaPeriodo(@PathVariable("Nombre") String Nombre,@PathVariable("Empresa") String Empresa, @PathVariable("Periodo") int Periodo,HttpSession httpSession) throws Exception {

		session ses = new session(httpSession);
		ArrayList<LibroRemuneraciones> libro=LibroRemuneracionesDB.getRowsByFilter(Empresa, Periodo);
		Excel excel=new Excel();
		if (ses.isValid()) {
			return 0;
		}
		excel.CrearLibroRemuneracionesByEmpresaPeriodo(libro, Nombre);
	
		return 1;

	}
	@RequestMapping(value = "/work/Remuneraciones/crearLibro/{Nombre}/{Empresa}/{Periodo}/{Huerto}", method = { RequestMethod.GET })
	public @ResponseBody String crearLibro(@PathVariable("Nombre") String Nombre,@PathVariable("Empresa") String Empresa, @PathVariable("Periodo") int Periodo,@PathVariable("Huerto") String Huerto,HttpSession httpSession) throws Exception {

		session ses = new session(httpSession);
		ArrayList<LibroRemuneraciones> libro=LibroRemuneracionesDB.crearLibro(Empresa, Periodo,Huerto);
		
		
		
		Excel excel=new Excel();
		if (ses.isValid()) {
			return "0";
		}
		String a=excel.CrearLibroRemuneraciones(libro, Nombre);
	
		return a;

	}
	@RequestMapping(value = "/work/Remuneraciones/descargarLibroRemuneraciones/{nombre}", method = RequestMethod.GET)
	@CrossOrigin(origins = {"*"})
	public @ResponseBody ResponseEntity<Set<String>> descargarLibroRemuneraciones(@PathVariable String nombre ,HttpServletRequest request, HttpServletResponse response,
			HttpSession session) {
		try {
			String fileName = nombre;
			fileName = fileName.replaceAll("\"", "");
			System.out.println("ruta: {}"+fileName);
			
			String urlDocGenerado = utils.reportesExcel() + fileName+".xlsx";
			
		
			System.out.println("aqui   "+urlDocGenerado);
			File file = new File(urlDocGenerado);
			FileInputStream fileInputStreamReader = new FileInputStream(file);
            byte[] bytes = IOUtils.toByteArray(fileInputStreamReader);			
			response.addHeader("Content-disposition", "attachment; filename= "+fileName+".xlsx");
			response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
			response.setContentLength(bytes.length);
			response.setCharacterEncoding("iso-8859-1");
			ServletOutputStream out = response.getOutputStream();
			
			out.write(bytes);
			out.flush();
			out.close();
			fileInputStreamReader.close();
			System.out.println("termine de hacer el archivo");
			return new ResponseEntity<>(Collections.singleton(urlDocGenerado), HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			Collections.singleton("");
			return null;
		}
	}
	
	
	
	
	
}
