package SWDB;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.logging.Level;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.PrintSetup;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import lib.classSW.CCAFLosAndes;
import lib.classSW.DatosAvisoInspeccionTrabajo;
import lib.classSW.DatosTrabajadorFiniquito;
import lib.classSW.Liquidacion;
import lib.classSW.PreNominaAnticipo;
import lib.db.ConnectionDB;
import lib.db.sw.FiniquitosBD;
import wordCreator.utils;

public class AvisoInspeccionTrabajoDB {

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	public static String generarExcelAvisoInspeccion(int idSociedad,ArrayList<Object> row) throws Exception {

		String RutaArchivo = "";
		int ultimoID = 0;
		String ruta = utils.AvisoInspeccionTrabajo();

		Date fechaActual = new Date();
		System.out.println(fechaActual);

		// Formateando la fecha:
		DateFormat formatHora = new SimpleDateFormat("HH:mm:ss");
		DateFormat formatFecha = new SimpleDateFormat("dd-MM-yyyy");

		String formatoHora = "" + formatHora.format(fechaActual).toString() + "";
		String formatoFecha = "" + formatFecha.format(fechaActual).toString() + "";
		System.out.println(formatoHora);
		System.out.println(formatoFecha);

		try {

			////////////////////// EXCEL///////////////////////////

			// Creamos el archivo donde almacenaremos la hoja
			// de calculo, recuerde usar la extension correcta,
			// en este caso .xlsx

			String horaf = formatoHora.replaceAll("[:]", "");
			String Nombrearchivo = "AVISOTERMINOCONTRATO" + horaf + ".xls";
			File archivo = new File("AVISOTERMINOCONTRATO" + horaf + ".xls");

			// Creamos el libro de trabajo de Excel formato OOXML
			Workbook workbook = new XSSFWorkbook();

			// La hoja donde pondremos los datos
			Sheet pagina = workbook.createSheet("Hoja1");
			pagina.getPrintSetup().setLandscape(true);
			pagina.setFitToPage(true);
			PrintSetup ps = pagina.getPrintSetup();
			ps.setFitWidth((short) 1);
			ps.setFitHeight((short) 0);

			Row fila = pagina.createRow(0);

			fila = pagina.createRow(0);

			String[] titulo6 = { "rut_tr", "dv_tr", "nombres_tr", "ap_paterno_tr", "ap_materno_tr", "comuna_tr", "sexo",
					"fecha_notificacion", "medio_notificacion", "oficina_correos", "fecha_inicio", "fecha_termino",
					"monto_anio_servicio", "monto_aviso_previo", "CodigoTipoCausal", "ArticuloCausal", "HechosCausal",
					"EstadoCotizaciones", "TipoDocCotizaciones" };

			for (int i = 0; i < titulo6.length; i++) {
				Cell celda = fila.createCell(i);
				celda.setCellValue(titulo6[i]);
			}

			

			int numeroFor = 1;
			int valorAnio = 0;
			int valorMesAviso = 0;
			int rut;
			String dvtrab = "";
			String NombreTrab = "";
			String apellidopaterno = "";
			String apellidomaterno = "";
			int comuna;
			String sexo = "";
			String fechaNotificacion = "";
			String medionotificacion = "";
			String oficinaCorreo = "";
			String fechainicio = "";
			String fechatermino = "";
			int codigotipocausal;
			String Articulocausal;
			String hechos = "";
			String estadocotizaciones = "";
			int tipodoccotizaciones;
			fila = pagina.createRow(1);
			
			for (Object datos : row) {
				
				@SuppressWarnings("unchecked")
				ArrayList<DatosAvisoInspeccionTrabajo> datos2 = (ArrayList<DatosAvisoInspeccionTrabajo>) datos;
				
				for (DatosAvisoInspeccionTrabajo emplista : datos2) {

					if (emplista.getIdconcepto() == 2007) {
						valorAnio = emplista.getValor();
						System.out.println("valor año " + valorAnio);
					} else if (emplista.getIdconcepto() == 2008) {
						valorMesAviso = emplista.getValor();
						System.out.println("valor mes " + valorMesAviso);

					}

					else if (emplista.getIdconcepto() == 3) {
						hechos = "" + emplista.getHechoscausal() + "";
						System.out.println("hechos " + hechos);
					}
					// Trabajador.get(0).getRut();
					rut = emplista.getRut();
					dvtrab = emplista.getDv();
					NombreTrab = emplista.getNombre();
					apellidopaterno = emplista.getAp_paterno();
					apellidomaterno = emplista.getAp_materno();
					comuna = emplista.getComuna();
					sexo = emplista.getSexo();
					fechaNotificacion = emplista.getFecha_notificacion();
					String fechaNotificacionsplit[]  = fechaNotificacion.split("-");
					String fechaNotificacion2 = fechaNotificacionsplit[2]+"/"+fechaNotificacionsplit[1]+"/"+fechaNotificacionsplit[0];
					medionotificacion = emplista.getMedio_notficacion();
					oficinaCorreo = emplista.getOficina_correos();
					fechainicio = emplista.getFecha_inicio();
					String fechainiciosplit[]  = fechainicio.split("-");
					String fechainicio2 = fechainiciosplit[2]+"/"+fechainiciosplit[1]+"/"+fechainiciosplit[0];
					fechatermino = emplista.getFecha_termino();
					String fechaterminosplit[]  = fechatermino.split("-");
					String fechatermino2 = fechaterminosplit[2]+"/"+fechaterminosplit[1]+"/"+fechaterminosplit[0];
					codigotipocausal = emplista.getCodigotipocausal();
					Articulocausal = emplista.getArticulocausal();
					estadocotizaciones = emplista.getEstadocotizaciones();
					tipodoccotizaciones = emplista.getTipodoccotizaciones();

					String[] titulo7 = { "" + rut + "", "" + dvtrab + "", "" + NombreTrab + "", "" + apellidopaterno + "",
							"" + apellidomaterno + "", "" + comuna + "", "" + sexo + "", "" + fechaNotificacion2 + "",
							"" + medionotificacion + "", "" + oficinaCorreo + "", "" + fechainicio2 + "",
							"" + fechatermino2 + "", "" + valorAnio + "", "" + valorMesAviso + "",
							"" + codigotipocausal + "", "" + Articulocausal + "", "" + hechos + "",
							"" + estadocotizaciones + "", "" + tipodoccotizaciones + "" };

					Cell celda = fila.createCell(0);
					celda.setCellValue(titulo7[0]);

					Cell celda1 = fila.createCell(1);
					celda1.setCellValue(titulo7[1]);

					Cell celda2 = fila.createCell(2);
					celda2.setCellValue(titulo7[2]);

					Cell celda3 = fila.createCell(3);
					celda3.setCellValue(titulo7[3]);

					Cell celda4 = fila.createCell(4);
					celda4.setCellValue(titulo7[4]);

					Cell celda5 = fila.createCell(5);
					celda5.setCellValue(titulo7[5]);

					Cell celda6 = fila.createCell(6);
					celda6.setCellValue(titulo7[6]);

					Cell celda7 = fila.createCell(7);
					celda7.setCellValue(titulo7[7]);

					Cell celda8 = fila.createCell(8);
					celda8.setCellValue(titulo7[8]);

					Cell celda9 = fila.createCell(9);
					celda9.setCellValue(titulo7[9]);

					Cell celda10 = fila.createCell(10);
					celda10.setCellValue(titulo7[10]);

					Cell celda11 = fila.createCell(11);
					celda11.setCellValue(titulo7[11]);

					Cell celda12 = fila.createCell(12);
					celda12.setCellValue(titulo7[12]);

					Cell celda13 = fila.createCell(13);
					celda13.setCellValue(titulo7[13]);

					Cell celda14 = fila.createCell(14);
					celda14.setCellValue(titulo7[14]);

					Cell celda15 = fila.createCell(15);
					celda15.setCellValue(titulo7[15]);

					Cell celda16 = fila.createCell(16);
					celda16.setCellValue(titulo7[16]);

					Cell celda17 = fila.createCell(17);
					celda17.setCellValue(titulo7[17]);

					Cell celda18 = fila.createCell(18);
					celda18.setCellValue(titulo7[18]);
					
					

				}
				numeroFor = numeroFor +1;
				fila = pagina.createRow(numeroFor);
			}
			
			pagina.autoSizeColumn(0);
			pagina.autoSizeColumn(1);
			pagina.autoSizeColumn(2);
			pagina.autoSizeColumn(3);
			pagina.autoSizeColumn(4);
			pagina.autoSizeColumn(5);
			pagina.autoSizeColumn(6);
			pagina.autoSizeColumn(7);
			pagina.autoSizeColumn(8);
			pagina.autoSizeColumn(9);
			pagina.autoSizeColumn(10);
			pagina.autoSizeColumn(11);
			pagina.autoSizeColumn(12);
			pagina.autoSizeColumn(13);
			pagina.autoSizeColumn(14);
			pagina.autoSizeColumn(15);
			pagina.autoSizeColumn(16);
			pagina.autoSizeColumn(17);
			pagina.autoSizeColumn(18);
		

					
					
			

			FileOutputStream salida = new FileOutputStream(ruta + archivo);
			RutaArchivo = ruta + Nombrearchivo;

			// Almacenamos el libro de
			// Excel via ese
			// flujo de datos
			workbook.write(salida);

			// Cerramos el libro para concluir operaciones
			workbook.close();

			// LOGGER.log(Level.INFO, "Archivo creado existosamente en {0}",
			// archivo.getAbsolutePath());
		} catch (FileNotFoundException ex) {
			// LOGGER.log(Level.SEVERE, "Archivo no localizable en sistema de
			// archivos");
		} catch (IOException e) {
			e.printStackTrace();
			// LOGGER.log(Level.SEVERE, "Error de entrada/salida");
			return "";
		}

		return RutaArchivo;
		// return Integer.toString(ultimoID);
		// return null;
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////// OBTENER DATOS PARA AGREGARLOS AL
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////// EXCEL///////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	public static ArrayList<DatosAvisoInspeccionTrabajo> obtenerDatosAviso(int idSociedad, int cod , int idcont) throws Exception {
		Statement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		ArrayList<DatosAvisoInspeccionTrabajo> Lista = new ArrayList<DatosAvisoInspeccionTrabajo>();

		try {

						
			sql = "select "
			+"co.codigo_trabajador,"
			+"co.articuloTerminoContrato as co1 ,co.incisoTerminoContrato as co2,"
			+"idSociedad,id,co.fechaInicio_actividad,co.FechaTerminoContrato,co.fechaNotificacion,"
			+"(SELECT codPrevired FROM parametros WHERE codigo = 'SEXO' AND llave  = (select idGenero from trabajadores where codigo = co.codigo_trabajador)) as sexo,"
			+"(select inspecionTrabajo from comuna WHERE id = (select idComuna from trabajadores where codigo = co.codigo_trabajador)) as comuna,"
			+"(select nombre from trabajadores where codigo = co.codigo_trabajador) as nombre,"
			+"(select apellidoMaterno from trabajadores where codigo = co.codigo_trabajador) as apma,"
			+"(select apellidoPaterno from trabajadores where codigo = co.codigo_trabajador) as appa,"
			+"(select SUBSTRING_INDEX(REPLACE(rut, '.', ''), '-', 1) from trabajadores where codigo = co.codigo_trabajador) as rut,"
			+"(select SUBSTRING_INDEX(rut, '-', -1) from trabajadores where codigo = co.codigo_trabajador) as dv,"
			+"'P' as medio_notificacion,'' as ofiCorreo,'Pagado' as EstadoCotizaciones,1  as TipoDocCotizaciones,"
			+"co.descripcion   as HechosCausal,"
			+"(select codigo_afc from sw_m_incisoTerminoContrato WHERE idArticuloTerminoContrato = co1 AND idIncisoTerminoContrato =  co2) AS CodigoTipoCausal,"
			+"(select ArticuloCausal from sw_m_incisoTerminoContrato WHERE idArticuloTerminoContrato = co1 AND idIncisoTerminoContrato =  co2) AS ArticuloCausal "
			+"from contratos co "
			+"WHERE co.paraFiniquitar = 1 and co.idSociedad = "+idSociedad+" AND co.codigo_trabajador = "+cod+" AND co.id = "+idcont+"";
        

			System.out.println(sql);
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);

			while (rs.next()) {

				// añadir codigo de la comuna segun archivo de la AFC

				// public String articulocausal;
				//

				DatosAvisoInspeccionTrabajo tr = new DatosAvisoInspeccionTrabajo();
				//tr.setIdconcepto(rs.getInt("idConcepto"));
				tr.setRut(rs.getInt("rut"));
				tr.setDv(rs.getString("dv"));
				tr.setNombre(rs.getString("nombre"));
				tr.setAp_paterno(rs.getString("appa"));
				tr.setAp_materno(rs.getString("apma"));
				tr.setComuna(rs.getInt("comuna"));
				tr.setSexo(rs.getString("sexo"));
				tr.setFecha_notificacion(rs.getString("fechaNotificacion"));
				tr.setMedio_notficacion(rs.getString("medio_notificacion"));
				tr.setOficina_correos(rs.getString("ofiCorreo"));
				tr.setFecha_inicio(rs.getString("fechaInicio_actividad"));
				tr.setFecha_termino(rs.getString("FechaTerminoContrato"));
				tr.setCodigotipocausal(rs.getInt("CodigoTipoCausal"));
				tr.setTipodoccotizaciones(rs.getInt("TipoDocCotizaciones"));
				tr.setEstadocotizaciones(rs.getString("EstadoCotizaciones"));
				tr.setEstadocotizaciones(rs.getString("EstadoCotizaciones"));
				tr.setHechoscausal(rs.getString("HechosCausal"));
				tr.setArticulocausal(rs.getString("ArticuloCausal"));
				//tr.setValor(rs.getInt("valor"));

				Lista.add(tr);

			}

		} catch (SQLException e) {
			System.out.println("Error: " + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error: " + e.getMessage());
		} finally {
			ps.close();
			db.close();
		}
		return Lista;
	}
	
	
	public static ArrayList<DatosAvisoInspeccionTrabajo> buscartrabajadores(int idSociedad, String fechainicio,String fechatermino, String huerto) throws Exception {
		Statement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		ArrayList<DatosAvisoInspeccionTrabajo> Lista = new ArrayList<DatosAvisoInspeccionTrabajo>();

		try {

			sql = "SELECT "
					+ "co.codigo_trabajador, co.id"
					+" FROM "
					+"contratos co "
					+ "INNER JOIN trabajadores TR on TR.codigo = co.codigo_trabajador "
					+"WHERE "
					    +"co.paraFiniquitar = 1 "
					        +"AND co.idSociedad = "+idSociedad+" and (co.FechaTerminoContrato BETWEEN '"+fechainicio+"' AND '"+fechatermino+"') "
					        + "AND NOT TR.tipoTrabajador = 4 ";
					if("null".equals(huerto)){}else{sql += " and TR.idHuerto = '"+huerto+"'";}
					sql += "GROUP BY co.codigo_trabajador , co.id ";
			
			
			System.out.println(sql);
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);

			while (rs.next()) {

				// añadir codigo de la comuna segun archivo de la AFC

				// public String articulocausal;
				//

				DatosAvisoInspeccionTrabajo tr = new DatosAvisoInspeccionTrabajo();
				tr.setCodigotrabajador(rs.getInt("codigo_trabajador"));
				tr.setIdcontrato(rs.getInt("id"));
				

				Lista.add(tr);

			}

		} catch (SQLException e) {
			System.out.println("Error: " + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error: " + e.getMessage());
		} finally {
			ps.close();
			db.close();
		}
		return Lista;
	}
	
	//---------------GENERAR EXCEL Base de Datos CCAF--------------------------------------------------------

	public static ArrayList<CCAFLosAndes> buscartrabajadoresCCAF(int idSociedad,int periodo) throws Exception {
		Statement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		ArrayList<CCAFLosAndes> Lista = new ArrayList<CCAFLosAndes>();

		try {

			sql = "select "
					+"case when tr.rut = '' then "
					+"UPPER(SUBSTRING_INDEX(REPLACE(tr.rutTemporal, '.', ''),'-',1)) "
					+"else " 
					+"UPPER(SUBSTRING_INDEX(REPLACE(tr.rut, '.', ''),'-',1)) end "
					+"as rut,"
					+"case when tr.rut = '' then " 
					+"UPPER(SUBSTRING_INDEX(REPLACE(tr.rutTemporal, '.', ''),'-',-1)) "
					+"else " 
					+"UPPER(SUBSTRING_INDEX(REPLACE(tr.rut, '.', ''),'-',-1)) end "
					+"as dv,"
					+"trim(UPPER(CONCAT(tr.apellidoPaterno, ' ', tr.apellidoMaterno, ' ',tr.nombre))) as nombrecompleto,"
					+"SUBSTRING(UPPER(pa.descripcion),1,1) as sexo,"
					+"case " 
					+"when tr.idIsapre = 7 then 2 else 1 end as regimensalud,"
					+"case "
					+"when tr.idAFP = 1 then 20 "
					+"when tr.idAFP = 2 then 18 "
					+"when tr.idAFP = 3 then 27 "
					+"when tr.idAFP = 4 then 22 "
					+"when tr.idAFP = 5 then 24 "
					+"when tr.idAFP = 6 then 19 "
					+"else 0 end as regimenprevisional,"
					+"REPLACE(tr.fNacimiento, '-', '') as fechanacimiento,"
					+"SUBSTRING(trim(UPPER(CONCAT(tr.calle, ' ', tr.ndireccion))),1,50) as direccion,"
					+"SUBSTRING(UPPER(comuna.nombre),1,25) as comuna,"
					+"SUBSTRING(UPPER(provincia.nombre),1,25) as provincia,"
					+"SUBSTRING_INDEX(tr.telefono,' ',1) as codigoarea,"
					+"SUBSTRING_INDEX(tr.telefono,' ',-1) as telefono,"
					+"SUBSTRING(REPLACE(REPLACE(tr.celular,' ',''),'-',''),1,9)as celular,"
					+"SUBSTRING(UPPER(tr.email),1,40) as email,"
					+"REPLACE(con.fechaInicio_actividad, '-', '')  as fechacontrato "
					+"from trabajadores tr "
					+"inner join parametros pa on tr.idGenero = pa.llave "
					+"inner join comuna comuna on comuna.id = tr.idComuna "
					+"inner join provincia provincia on provincia.id = tr.idProvincia "
					+"inner join contratos con on con.codigo_trabajador = tr.codigo "
					+"where tr.tipoTrabajador != 4 and  pa.codigo = 'SEXO' AND tr.idIsapre !=0 AND con.idSociedad = "+idSociedad+" "
					+ "and date_format(fechaInicio_actividad, '%Y%m') <= "+periodo+" "
					+"and (date_format(FechaTerminoContrato, '%Y%m') >= "+periodo+" or FechaTerminoContrato is null)" ;
				
			
			
			System.out.println(sql);
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			ResultSetMetaData rsmd = rs.getMetaData();
			
			int columnCount = rsmd.getColumnCount();

			CCAFLosAndes tr1 = new CCAFLosAndes();
			for (int i = 1; i <= columnCount; i++ ) {
			  String name = rsmd.getColumnName(i);
			  System.out.println(name);
			  	
			    
				if(i == 1){tr1.setRut_t(name);}
				else if(i == 2){tr1.setDv_t(name);}
				else if(i == 3){tr1.setNombrecompleto_t(name);}
				else if(i == 4){tr1.setSexo_t(name);}
				else if(i == 5){tr1.setRegimensalud_t(name);}
				else if(i == 6){tr1.setRegimenprevisional_t(name);}
				else if(i == 7){tr1.setFechanacimiento_t(name);}
				else if(i == 8){tr1.setDireccion_t(name);}
				else if(i == 9){tr1.setComuna_t(name);}
				else if(i == 10){tr1.setProvincia_t(name);}
				else if(i == 11){tr1.setCodigoarea_t(name);}
				else if(i == 12){tr1.setTelefono_t(name);}
				else if(i == 13){tr1.setCelular_t(name);}
				else if(i == 14){tr1.setEmail_t(name);}
				else if(i == 15){tr1.setFechacontrato_t(name);}
				
			}
			
			Lista.add(tr1);

			while (rs.next()) {

				
				CCAFLosAndes tr = new CCAFLosAndes();
				tr.setRut_t(rs.getString("rut"));
				tr.setDv_t(rs.getString("dv"));
				tr.setNombrecompleto_t(rs.getString("nombrecompleto"));
				tr.setSexo_t(rs.getString("sexo"));
				tr.setRegimensalud_t(rs.getString("regimensalud"));
				tr.setRegimenprevisional_t(rs.getString("regimenprevisional"));
				tr.setFechanacimiento_t(rs.getString("fechanacimiento"));
				tr.setDireccion_t(rs.getString("direccion"));
				tr.setComuna_t(rs.getString("comuna"));
				tr.setProvincia_t(rs.getString("provincia"));
				tr.setCodigoarea_t(rs.getString("codigoarea"));
				tr.setTelefono_t(rs.getString("telefono"));
				tr.setCelular_t(rs.getString("celular"));
				tr.setEmail_t(rs.getString("email"));
				tr.setFechacontrato_t(rs.getString("fechacontrato"));
				     
				

				Lista.add(tr);

			}

		} catch (SQLException e) {
			System.out.println("Error: " + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error: " + e.getMessage());
		} finally {
			ps.close();
			db.close();
		}
		return Lista;
	}
	
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	public static String generarExcelBDCCAF(int idSociedad, ArrayList<CCAFLosAndes> buscarTrabajadorCCAF) throws Exception {

		String RutaArchivo = "";
		
		String ruta = utils.AvisoInspeccionTrabajo();


		try {

			////////////////////// EXCEL///////////////////////////

			// Creamos el archivo donde almacenaremos la hoja
			// de calculo, recuerde usar la extension correcta,
			// en este caso .xlsx
			CCAFLosAndes ru = AvisoInspeccionTrabajoDB.getRutEmpresa(idSociedad);
			String rut_empresa = ru.getRutEmpresa();
			
			String Nombrearchivo = rut_empresa + ".xlsx";
			File archivo = new File(rut_empresa + ".xlsx");

			// Creamos el libro de trabajo de Excel formato OOXML
			Workbook workbook = new XSSFWorkbook();
            
			CellStyle style2 = workbook.createCellStyle();
			style2.setAlignment(CellStyle.ALIGN_RIGHT);
			
			// La hoja donde pondremos los datos
			Sheet pagina = workbook.createSheet("Hoja1");
			pagina.getPrintSetup().setLandscape(true);
			pagina.setFitToPage(true);
			PrintSetup ps = pagina.getPrintSetup();
			ps.setFitWidth((short) 1);
			ps.setFitHeight((short) 0);

			Row fila = pagina.createRow(0);

			
			
			   	int numeroFor = 0;
			    String  rut;
				String 	dv = "";
				String 	nombrecompleto = "";
				String 	sexo = "";
				String  regimensalud;
				String  regimenprevisional = "";
				String  fechanacimiento = "";
				String 	direccion = "";
				String 	comuna = "";
				String 	provincia = "";
				String 	codigoarea = "";
				String 	telefono = "";
				String 	celular = "";
				String 	email = "";
				String 	fechacontrato = "";
				
			
				for (CCAFLosAndes emplista : buscarTrabajadorCCAF) {
					
					rut = emplista.getRut_t();
					dv= emplista.getDv_t();
					nombrecompleto= emplista.getNombrecompleto_t();
					sexo= emplista.getSexo_t();
					regimensalud = emplista.getRegimensalud_t();
					regimenprevisional= emplista.getRegimenprevisional_t();
					fechanacimiento= emplista.getFechanacimiento_t();
					direccion= emplista.getDireccion_t();
					comuna= emplista.getComuna_t();
					provincia= emplista.getProvincia_t();
					codigoarea= emplista.getCodigoarea_t();
					telefono= emplista.getTelefono_t();
					celular= emplista.getCelular_t();
					email= emplista.getEmail_t();
					fechacontrato= emplista.getFechacontrato_t();
					
					String[] titulo7 = { "" + rut + "", "" + dv + "", "" + nombrecompleto + "",
							"" + sexo + "", "" + regimensalud + "", "" + regimenprevisional + "", "" + fechanacimiento + "",
							"" + direccion + "", "" + comuna + "", "" + provincia + "",
							"" + codigoarea + "", "" + telefono + "", "" + celular + "",
							"" + email + "", "" + fechacontrato + "" };
					
					if(numeroFor == 0){
					Cell celda = fila.createCell(0);
					celda.setCellValue(titulo7[0]);
					}else{
					Cell celda = fila.createCell(0);
					celda.setCellValue(titulo7[0]);
					celda.setCellStyle(style2);
				    }
					
					if(numeroFor == 0){
					Cell celda1 = fila.createCell(1);
					celda1.setCellValue(titulo7[1]);	
					}else{
					Cell celda1 = fila.createCell(1);
					celda1.setCellValue(titulo7[1]);
					celda1.setCellStyle(style2);
					}
				
					Cell celda2 = fila.createCell(2);
					celda2.setCellValue(titulo7[2]);

					Cell celda3 = fila.createCell(3);
					celda3.setCellValue(titulo7[3]);
					
					if(numeroFor == 0){
					Cell celda4 = fila.createCell(4);
					celda4.setCellValue(titulo7[4]);	
					}else{
					Cell celda4 = fila.createCell(4);
					celda4.setCellValue(titulo7[4]);
					celda4.setCellStyle(style2);
					}
					
					if(numeroFor == 0){
					Cell celda5 = fila.createCell(5);
					celda5.setCellValue(titulo7[5]);
					}else{
					Cell celda5 = fila.createCell(5);
					celda5.setCellValue(titulo7[5]);
					celda5.setCellStyle(style2);
					}
					
					if(numeroFor == 0){
					Cell celda6 = fila.createCell(6);
					celda6.setCellValue(titulo7[6]);
					}else{
					Cell celda6 = fila.createCell(6);
					celda6.setCellValue(titulo7[6]);
					celda6.setCellStyle(style2);
					}
					
					Cell celda7 = fila.createCell(7);
					celda7.setCellValue(titulo7[7]);

					Cell celda8 = fila.createCell(8);
					celda8.setCellValue(titulo7[8]);

					Cell celda9 = fila.createCell(9);
					celda9.setCellValue(titulo7[9]);

					Cell celda10 = fila.createCell(10);
					celda10.setCellValue(titulo7[10]);

					Cell celda11 = fila.createCell(11);
					celda11.setCellValue(titulo7[11]);

					Cell celda12 = fila.createCell(12);
					celda12.setCellValue(titulo7[12]);

					Cell celda13 = fila.createCell(13);
					celda13.setCellValue(titulo7[13]);

					if(numeroFor == 0){
					Cell celda14 = fila.createCell(14);
					celda14.setCellValue(titulo7[14]);
					}else{
					Cell celda14 = fila.createCell(14);
					celda14.setCellValue(titulo7[14]);
					celda14.setCellStyle(style2);
					}

					
					numeroFor = numeroFor + 1;
					fila = pagina.createRow(numeroFor);
				}
			
			

			pagina.autoSizeColumn(0);
			pagina.autoSizeColumn(1);
			pagina.autoSizeColumn(2);
			pagina.autoSizeColumn(3);
			pagina.autoSizeColumn(4);
			pagina.autoSizeColumn(5);
			pagina.autoSizeColumn(6);
			pagina.autoSizeColumn(7);
			pagina.autoSizeColumn(8);
			pagina.autoSizeColumn(9);
			pagina.autoSizeColumn(10);
			pagina.autoSizeColumn(11);
			pagina.autoSizeColumn(12);
			pagina.autoSizeColumn(13);
			pagina.autoSizeColumn(14);
			pagina.autoSizeColumn(15);
		

			FileOutputStream salida = new FileOutputStream(ruta + archivo);
			RutaArchivo = ruta + Nombrearchivo;

			// Almacenamos el libro de
			// Excel via ese
			// flujo de datos
			workbook.write(salida);

			// Cerramos el libro para concluir operaciones
			workbook.close();

			// LOGGER.log(Level.INFO, "Archivo creado existosamente en {0}",
			// archivo.getAbsolutePath());
		} catch (FileNotFoundException ex) {
			// LOGGER.log(Level.SEVERE, "Archivo no localizable en sistema de
			// archivos");
		} catch (IOException e) {
			e.printStackTrace();
			// LOGGER.log(Level.SEVERE, "Error de entrada/salida");
			return "";
		}

		return RutaArchivo;
		
	}
	
	public static CCAFLosAndes getRutEmpresa(int id) throws Exception {
		PreparedStatement ps = null;
		String sql = "";
		CCAFLosAndes permiso = new CCAFLosAndes();
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "select REPLACE(rut,'.','') AS rut from sociedad where idSociedad = "+id+"";

			ps = db.conn.prepareStatement(sql);

			ResultSet rs = ps.executeQuery(sql);
			if (rs.next()) {

				permiso.setRutEmpresa(rs.getString("rut"));

			}

		} catch (SQLException e) {
			System.out.println("Error: " + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error: " + e.getMessage());
		} finally {
			ps.close();
			db.close();
		}
		return permiso;

	}
	
	
	///////////////////////////// TRABAJADORES SIN LIQUIDACION ///////////////////////////////////////////////
	
	public static ArrayList<Liquidacion> buscartrabajoresSinLiqui(int idSociedad,String periodo) throws Exception {
		Statement ps = null;
		String[] parts = periodo.split("-");
		String periodo1 = parts[1]+"-"+parts[0];
		String periodo2 = parts[0]+parts[1];
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		ArrayList<Liquidacion> Lista = new ArrayList<Liquidacion>();

		try {

			sql = "select co.codigo_trabajador as Codigo, tr.rut as Rut,"
				+ "upper(concat(tr.apellidoPaterno,' ',tr.apellidoMaterno,' ',tr.nombre)) as Nombre, "
				+"CASE "
				    +"WHEN 1 = 1 THEN '"+periodo1+"' "
				+"END as Periodo,"
				+"UPPER((select descripcion from campo where campo = tr.idHuerto)) AS Huerto,"
				+"(select denominacionSociedad from sociedad where idSociedad = co.idSociedad) as Empresa "
				+"from contratos co "
				+"inner join trabajadores tr on tr.codigo = co.codigo_trabajador "
				+"where co.idSociedad = 4  and tr.tipoTrabajador !=4 "
				+"AND DATE_format(fechaInicio_actividad,'%Y-%m') <= DATE_format('"+periodo+"-01', '%Y-%m' ) and "
				+"co.id NOT IN "
				+"(select id_contrato from sw_liquidacion where  id_sociedad = 4 and periodo = "+periodo2+") and co.EstadoContrato = 1" ;
				
			
			
			System.out.println(sql);
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			ResultSetMetaData rsmd = rs.getMetaData();
			
			int columnCount = rsmd.getColumnCount();

			Liquidacion tr1 = new Liquidacion();
			for (int i = 1; i <= columnCount; i++ ) {
			  String name = rsmd.getColumnName(i);
			  System.out.println(name);
			  
				if(i == 1){tr1.setCodigoTrab(name);}
				else if(i == 2){tr1.setRut(name);}
				else if(i == 3){tr1.setNombre(name);}
				else if(i == 4){tr1.setPeriodostring(name);}
				else if(i == 5){tr1.setHuerto(name);}
				else if(i == 6){tr1.setNombreempresa(name);}
				
				
			}
			
			Lista.add(tr1);

			while (rs.next()) {

				
				Liquidacion tr = new Liquidacion();
				
				tr.setCodigoTrab(rs.getString("Codigo"));
				tr.setRut(rs.getString("Rut"));
				tr.setNombre(rs.getString("Nombre"));
				tr.setPeriodostring(rs.getString("Periodo"));
				tr.setHuerto(rs.getString("Huerto"));
				tr.setNombreempresa(rs.getString("Empresa"));

				Lista.add(tr);

			}

		} catch (SQLException e) {
			System.out.println("Error: " + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error: " + e.getMessage());
		} finally {
			ps.close();
			db.close();
		}
		return Lista;
	}
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	public static String generarExcelSinLiqui(int idSociedad, ArrayList<Liquidacion> BuscarTrabajadorSN)
			throws Exception {

		String RutaArchivo = "";

		String ruta = utils.AvisoInspeccionTrabajo();

		try {

			////////////////////// EXCEL///////////////////////////

			// Creamos el archivo donde almacenaremos la hoja
			// de calculo, recuerde usar la extension correcta,
			// en este caso .xlsx
			CCAFLosAndes ru = AvisoInspeccionTrabajoDB.getRutEmpresa(idSociedad);
			String rut_empresa = ru.getRutEmpresa();

			String Nombrearchivo = rut_empresa + ".xlsx";
			File archivo = new File(rut_empresa + ".xlsx");

			// Creamos el libro de trabajo de Excel formato OOXML
			Workbook workbook = new XSSFWorkbook();

			CellStyle style2 = workbook.createCellStyle();
			style2.setAlignment(CellStyle.ALIGN_RIGHT);

			// La hoja donde pondremos los datos
			Sheet pagina = workbook.createSheet("Hoja1");
			pagina.getPrintSetup().setLandscape(true);
			pagina.setFitToPage(true);
			PrintSetup ps = pagina.getPrintSetup();
			ps.setFitWidth((short) 1);
			ps.setFitHeight((short) 0);

			Row fila = pagina.createRow(0);

			int numeroFor = 0;
			String codigo_t = "";
			String rut_t = "";
			String nombrecompleto = "";
			String periodo_t;
			String huerto_t = "";
			String empresa_t = "";
			

			for (Liquidacion emplista : BuscarTrabajadorSN) {

				codigo_t = emplista.getCodigoTrab();
				rut_t = emplista.getRut();
				nombrecompleto = emplista.getNombre();
				periodo_t = emplista.getPeriodostring();
				huerto_t = emplista.getHuerto();
				empresa_t = emplista.getNombreempresa();
				

				String[] titulo7 = { "" + codigo_t + "", "" + rut_t + "", "" + nombrecompleto + "", "" + periodo_t + "",
						"" + huerto_t + "", "" + empresa_t + "" };

				if (numeroFor == 0) {
					Cell celda = fila.createCell(0);
					celda.setCellValue(titulo7[0]);
				} else {
					Cell celda = fila.createCell(0);
					celda.setCellValue(titulo7[0]);
					celda.setCellStyle(style2);
				}

				
					Cell celda1 = fila.createCell(1);
					celda1.setCellValue(titulo7[1]);
					
					Cell celda2 = fila.createCell(2);
					celda2.setCellValue(titulo7[2]);
	
					Cell celda3 = fila.createCell(3);
					celda3.setCellValue(titulo7[3]);

					Cell celda4 = fila.createCell(4);
					celda4.setCellValue(titulo7[4]);
					
					Cell celda5 = fila.createCell(5);
					celda5.setCellValue(titulo7[5]);
				

				numeroFor = numeroFor + 1;
				fila = pagina.createRow(numeroFor);
			}

			pagina.autoSizeColumn(0);
			pagina.autoSizeColumn(1);
			pagina.autoSizeColumn(2);
			pagina.autoSizeColumn(3);
			pagina.autoSizeColumn(4);
			pagina.autoSizeColumn(5);
			

			FileOutputStream salida = new FileOutputStream(ruta + archivo);
			RutaArchivo = ruta + Nombrearchivo;

			// Almacenamos el libro de
			// Excel via ese
			// flujo de datos
			workbook.write(salida);

			// Cerramos el libro para concluir operaciones
			workbook.close();

			// LOGGER.log(Level.INFO, "Archivo creado existosamente en {0}",
			// archivo.getAbsolutePath());
		} catch (FileNotFoundException ex) {
			// LOGGER.log(Level.SEVERE, "Archivo no localizable en sistema de
			// archivos");
		} catch (IOException e) {
			e.printStackTrace();
			// LOGGER.log(Level.SEVERE, "Error de entrada/salida");
			return "";
		}

		return RutaArchivo;

	}

}




