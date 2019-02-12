package SWDB;

import java.io.File;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;
import cl.expled.web.AfiliacionPREVIRED;
import lib.db.ConnectionDB;
import wordCreator.utils;



@Controller
public class AfiliaciondeTrabajadoresPREVIREDBD {
	public static String createArchivoPlanoAfilacionPREVIRED (String empresa, String periodo) throws Exception{
		
		 	String s=periodo;  
	        String format1 = s.substring(0,4);
	        String format2 = s.substring(4);
	        String PeriodoFormat = format2+format1;
	        
		List<AfiliacionPREVIRED> lista = obtenerDatosAfiliacionPrevired(empresa);
		
		String ruta = utils.csvDetalleNomina();
		Date fechaActual = new Date();
		
		String nombre = "";
		String apellido_paterno = "";
		String apellido_materno = "";
		String rut_trabajador = "";
		String dv_trabajador = "";
		String cod_previred = "";
		
		DateFormat formatHora = new SimpleDateFormat("HH:mm:ss");
//		DateFormat formatFecha = new SimpleDateFormat("dd-MM-yyyy");
		
		String formatoHora =  ""+formatHora.format(fechaActual).toString()+"";
//		String formatoFecha = ""+formatFecha.format(fechaActual).toString()+"";
		
		String horaf = formatoHora.replaceAll("[:]", "");;
	   

		String nombre_nominaT = "AFILIACIONPREVIRED";
		
		 String nombreArchivo = nombre_nominaT+horaf+".txt";
		 String outputFile = ruta+nombreArchivo;
		  
		 // VER SI EL ARCHIVO EXISTE 
		  boolean alreadyExists = new File(outputFile).exists();
       
		  if(alreadyExists){
		      File ArchivoEmpleados = new File(outputFile);
		      ArchivoEmpleados.delete();
		  }    
		  
		  String datosLinea2 = "";
	
		for (AfiliacionPREVIRED datos : lista) 
        {
			String datosLinea = "";
			nombre = datos.getNombre().toUpperCase();
			apellido_paterno = datos.getApPaterno().toUpperCase();
			apellido_materno = datos.getApMaterno().toUpperCase();
			rut_trabajador = datos.getRut();
			dv_trabajador = datos.getDv();
			cod_previred = datos.getCodigoPrevired();
			
			
			       datosLinea = String.format("%s", ""+rut_trabajador+";");
				   datosLinea += String.format("%s", ""+dv_trabajador+";");
				   datosLinea += String.format("%s", ""+apellido_paterno+";");
				   datosLinea += String.format("%s", ""+apellido_materno+";");
				   datosLinea += String.format("%s", ""+nombre+";");
				   datosLinea += String.format("%s", ""+cod_previred+";");
				   datosLinea += String.format("%s", ""+PeriodoFormat+"");
				   datosLinea += "\n";
			
				   datosLinea2 = datosLinea2 + datosLinea;
			
		}// end for
		
		 File f= new File(outputFile);
		 System.out.println(outputFile);
		 FileUtils.writeStringToFile(f,datosLinea2, "ISO-8859-1");
		 
		System.out.println(""+empresa+" "+""+periodo+"");
		return outputFile; 
		
	}
	

	 public static List<AfiliacionPREVIRED> obtenerDatosAfiliacionPrevired(String empresa) throws Exception {
			
		 	
		 	PreparedStatement ps = null;
			String sql="";
			List<AfiliacionPREVIRED> lista = new ArrayList<>();
			ConnectionDB db = new ConnectionDB();
			try{
			    sql = "select "
						+"SUBSTRING_INDEX(REPLACE((case when tr.rut = '' then tr.rutTemporal else tr.rut end), '.', ''), '-', 1) as rut, "
						+"SUBSTRING_INDEX(REPLACE((case when tr.rut = '' then tr.rutTemporal else tr.rut end), '.', ''), '-', -1) as dv, "
						+"tr.apellidoPaterno,tr.apellidoMaterno,"
						+"tr.nombre,"
						+"case when pa.codPrevired != 901 then pa.codPrevired else '00' end as codPrevired "
						+"from contratos co "
						+"inner join trabajadores tr on co.codigo_trabajador = tr.codigo "
						+"inner join parametros pa on pa.llave = tr.idAFP "   
						+"where co.idSociedad = "+empresa+" and co.EstadoContrato = 1 and pa.codigo = 'AFP' AND tr.tipoTRabajador != 4";
			    
			    
			    System.out.println(sql);
			    ps = db.conn.prepareStatement(sql);
				ResultSet rs = ps.executeQuery(sql);
				
				while(rs.next()){
					AfiliacionPREVIRED p = new AfiliacionPREVIRED();
					
					p.setNombre(rs.getString("nombre"));
					p.setRut(rs.getString("rut"));
					p.setDv(rs.getString("dv"));
					p.setApPaterno(rs.getString("apellidoPaterno"));
					p.setApMaterno(rs.getString("apellidoMaterno"));
					p.setCodigoPrevired(rs.getString("codPrevired"));
					
					lista.add(p);
				}

			}catch (Exception e){
				System.out.println("Error: " + e.getMessage());
			}
			return lista;	
		}
	 
	 

}
