package lib.data.json.sw;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.IOUtils;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import SWDB.sw_nominaAFCDB;
import lib.classSW.AFC;
import lib.classSW.DatosAvisoInspeccionTrabajo;
import lib.classSW.ExportarCSV;
import lib.security.session;

@Controller
public class sw_nominaAFC {
	
	
	//---------------GENERAR NOMINA AFC--------------------------------------------------------
			@RequestMapping(value = "/work/generateNominaAFC/{idSociedad},{fechainicio},{fechatermino},{huerto},{cese}", method = { RequestMethod.PUT,
					RequestMethod.POST }, produces = MediaType.APPLICATION_JSON_VALUE)
			public @ResponseBody String generarExcelAvisoInspeccion(@PathVariable int idSociedad,@PathVariable String fechainicio,@PathVariable String fechatermino,@PathVariable String huerto,@PathVariable int cese, HttpSession httpSession)
					throws Exception {

				session ses = new session(httpSession);

				String r = "";
				if (ses.isValid()) {
					return "";

				}
				
				
				ArrayList<AFC> BuscarTrabajadorAFC = new ArrayList<AFC>();
				BuscarTrabajadorAFC = sw_nominaAFCDB.buscartrabajadoresAFC(idSociedad, fechainicio, fechatermino,huerto, cese );
				
				
				
				if(BuscarTrabajadorAFC.size() >= 1){
					r = sw_nominaAFCDB.getTextAFC(BuscarTrabajadorAFC,idSociedad,BuscarTrabajadorAFC.size(),cese);
				}else
				{
					r = "NO DATA";
				}
				
				return r;

			}
			
	//---------------------------DESCARGAR NOMINA TXT--------------------------------------------------------
			@RequestMapping(value = "/work/descargarNominaAFC", method = RequestMethod.GET)
			public @ResponseBody String getAutorizacion(HttpServletRequest request, HttpServletResponse response,
					HttpSession session) {
				try {
					String fileName = request.getParameter("FILE");
					fileName = fileName.replaceAll("\"", "");
					
					String split[]  = fileName.split("/");
					String nombreArchi = split[4];

					String urlDocGenerado = fileName;

					@SuppressWarnings("unused")
					File file = new File(urlDocGenerado);
					System.out.println("aqui   " + urlDocGenerado);

					FileInputStream fileInputStreamReader = new FileInputStream(urlDocGenerado);
					byte[] bytes = IOUtils.toByteArray(fileInputStreamReader);
					response.addHeader("Content-disposition", "attachment; filename= " + nombreArchi + "");
					response.setContentType("application/octet-stream");
					response.setContentLength(bytes.length);
					response.setCharacterEncoding("iso-8859-1");
					ServletOutputStream out = response.getOutputStream();
					out.write(bytes);
					out.flush();
					out.close();

					return "1";

				} catch (Exception e) {
					e.printStackTrace();
					return "0";
				}
			}

}
