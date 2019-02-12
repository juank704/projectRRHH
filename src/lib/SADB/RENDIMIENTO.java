package lib.SADB;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.http.HttpSession;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;

import lib.classSA.BLOQUEO_LABOR;
import lib.classSA.CUADRATURA_HORA;
import lib.classSA.CUADRILLA;
import lib.classSA.CUARTEL_PF;
import lib.classSA.FILTRO_CUADRAR_HR;
import lib.classSA.LABOR;
import lib.classSA.LIQUIDACION;
import lib.classSA.RENDIMIENTO_DIARIO;
import lib.classSA.RENDIMIENTO_GENERAL;
import lib.classSA.Trabajador;
import lib.classSA.TrabajadoresAgro;
import lib.classSA.asiento_contable;
import lib.classSA.calificacion_rendimiento;
import lib.classSA.cierre_mensual;
import lib.classSA.detalle_rendimiento;
import lib.classSA.estado_rendimiento;
import lib.classSA.faena;
import lib.classSA.recorrido;
import lib.classSA.respuesta;
import lib.classSA.revision_asistencia;
import lib.classSW.CreateLiquidacion;
import lib.db.ConnectionDB;
import lib.security.session;
import lib.struc.trabajadores;
import wordCreator.utils;

public class RENDIMIENTO {
	public static ArrayList<RENDIMIENTO_DIARIO> GET_RENDIMIENTO_DIARIO_TRABAJADOR(int id) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<RENDIMIENTO_DIARIO> lista = new ArrayList<RENDIMIENTO_DIARIO>();
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "SELECT * FROM rendimiento_diario WHERE ";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				RENDIMIENTO_DIARIO ob = new RENDIMIENTO_DIARIO();
				ob.setCodigo(rs.getInt("codigo"));
				ob.setTrabajador(rs.getInt("trabajador"));
				ob.setBase_piso_hora(rs.getInt("base_piso_hora"));
				ob.setSubsidio(rs.getInt("subsidio"));
				ob.setLabor(rs.getInt("labor"));
				ob.setValor(rs.getInt("valor"));
				ob.setTipo_trato(rs.getInt("tipo_trato"));
				ob.setRendimiento(rs.getInt("rendimiento"));
				ob.setHoras_trabajadas(rs.getInt("horas_trabajadas"));
				ob.setHoras_extras(rs.getInt("horas_extras"));
				ob.setBono1(rs.getInt("bono1"));
				ob.setBono2(rs.getInt("bono2"));
				ob.setValor_liquido(rs.getInt("valor_liquido"));
				ob.setMaquinaria(rs.getInt("maquinaria"));
				ob.setImplemento(rs.getInt("implemento"));
				ob.setEstado(rs.getInt("estado"));
				lista.add(ob);
			}
			rs.close();
			ps.close();
			db.conn.close();
			
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch (Exception e){
			System.out.println("Error:" + e.getMessage());
		} finally {
			db.close();
		}
		return lista;
	}
	public static boolean INSERT_CUADRILLA_UPDATE(int rut, int codigo_rg) throws Exception{
		PreparedStatement ps = null;
		//TODO
		ConnectionDB db = new ConnectionDB();
		String sql = "";
		try {
			sql = "INSERT INTO cuadrilla_trabajador (codigo_cuadrilla, rut_trabajador, asistencia)";
			sql += "SELECT *FROM (SELECT (SELECT c.codigo FROM cuadrilla c INNER JOIN rendimiento_general rg ON(c.codigo = rg.codigo_cuadrilla) WHERE rg.codigo_rg = "+codigo_rg+"), )";
			ps = db.conn.prepareStatement(sql);
			ps.execute();
			return true;
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error:" + e.getMessage());
		} finally {
			ps.close();
			db.close();
		}
		return false;
	}
	public static respuesta DEL_RENDIMIENTO_DIARIO(ConnectionDB db, RENDIMIENTO_DIARIO r) throws Exception{
		respuesta res = new respuesta();
		res.setEstado(false);
		res.setObjeto(r);
		try{
			CallableStatement cStmt = db.conn.prepareCall("{call sa_deleteRendimiento(?, ?, ?)}");
			cStmt.setString(1, r.getRut());
			cStmt.setInt(2, r.getCodigo_rg());
			cStmt.setInt(3, r.getCodigo());
			cStmt.execute();
			db.conn.close();
			res.setEstado(true);
		}catch(Exception ex){
			System.out.println("Error: "+ex.getMessage());
		}finally{
			db.close();
		}
		return res;
	}
	public static boolean ADD_NOT_EXIST(ArrayList<RENDIMIENTO_DIARIO> rd) throws Exception{
		PreparedStatement ps = null;
		ConnectionDB db = new ConnectionDB();
		String sql = "";
		try {
			for(RENDIMIENTO_DIARIO r: rd){
				sql = "INSERT INTO cuadrilla_trabajador (codigo_cuadrilla, rut_trabajador, asistencia) ";
				sql += "SELECT * FROM (SELECT ";
				sql += "(SELECT codigo_cuadrilla FROM rendimiento_general WHERE codigo_rg = "+r.getCodigo_rg()+"), ";
				sql += "(SELECT rut FROM trabajadores WHERE id = "+r.getTrabajador()+"), 5) AS tmp ";
				sql += "WHERE NOT EXISTS (";
				sql += "SELECT rut_trabajador FROM cuadrilla_trabajador WHERE codigo_cuadrilla = (SELECT codigo_cuadrilla FROM rendimiento_general WHERE codigo_rg = "+r.getCodigo_rg()+") AND rut_trabajador = (SELECT rut FROM trabajadores WHERE id = "+r.getTrabajador()+") ";
				sql += ") LIMIT 1;";
				ps = db.conn.prepareStatement(sql);
				ps.execute();
			}
			return true;
		} catch (SQLException e) {
			System.out.println("Error  ADD_NOT:" + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error ADD:" + e.getMessage());
		} finally {
			ps.close();
			db.close();
		}
		return false;
	}
	public static boolean ADD_RENDIMIENTO_INDIVIDUAL(ConnectionDB db, RENDIMIENTO_GENERAL rg) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		try {
			sql = "INSERT INTO rendimiento_general (fecha, especie, variedad, cuartel, faena, labor, horas, tipo_pago, codigo_cuadrilla, codigo_supervisor,estado)";
			sql += "VALUES (?,?,?,?,?,?,"+String.valueOf(rg.getHoras())+",?,0,?,3)";
			ps = db.conn.prepareStatement(sql);
			ps.setString(1, rg.getFecha());
			ps.setInt(2, rg.getEspecie());
			ps.setInt(3, rg.getVariedad());
			ps.setInt(4, rg.getCuartel());
			ps.setInt(5, rg.getFaena());
			ps.setInt(6, rg.getLabor());
			ps.setInt(7, rg.getTipo_pago());
			ps.setInt(8, rg.getCodigo_supervisor());
			ps.execute();
			return true;
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error:" + e.getMessage());
		} finally {
			ps.close();
			db.close();
		}
		return false;
	}
	public static boolean ADD_RENDIMIENTO_DIARIO_INDIVIDUAL(ConnectionDB db, RENDIMIENTO_DIARIO rd) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		try {
			sql = "INSERT INTO rendimiento_diario (trabajador, base_piso_hora, subsidio, labor, valor, tipo_trato, rendimiento, horas_trabajadas, horas_extras, bono1, bono2, valor_liquido, maquinaria, implemento, estado, codigo_rg) ";
			sql += "VALUES ("+rd.trabajador+",";
			sql += "'"+rd.base_piso_hora+"', ";
			sql += ""+rd.subsidio+", ";
			sql += ""+rd.labor+", ";
			sql += ""+rd.valor+", ";
			sql += ""+rd.tipo_trato+", ";
			sql += ""+rd.rendimiento+", ";
			sql += "'"+rd.horas_trabajadas+"', ";
			sql += "'"+rd.horas_extras+"', ";
			sql += ""+rd.bono1+", ";
			sql += ""+rd.bono2+", ";
			sql += ""+rd.valor_liquido+", ";
			sql += ""+rd.maquinaria+", ";
			sql += ""+rd.implemento+", ";
			sql += ""+rd.estado+", ";
			sql += "(SELECT MAX(codigo_rg) FROM rendimiento_general)); ";
			ps = db.conn.prepareStatement(sql);
			ps.execute();
			return true;
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error:" + e.getMessage());
		} finally {
			ps.close();
			db.close();
		}
		return false;
	}
//	UPDATE
	public static boolean UPDATE_RENDIMIENTO_DIARIO(RENDIMIENTO_DIARIO rd) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "UPDATE rendimiento_diario set codigo='" +rd.getCodigo()+ "', trabajador='" +rd.getTrabajador()+ "', base_piso_hora='" +rd.getBase_piso_hora()
				+ "', subsidio='" +rd.getSubsidio()+ "', labor='" +rd.getLabor()+ "', valor='" +rd.getValor()+ "', tipo_trato='" +rd.getTipo_trato()
				+ "', rendimiento='" +rd.getRendimiento()+ "', horas_trabajadas='" +rd.getHoras_trabajadas()+ "', horas_extras='" +rd.getHoras_extras()
				+ "', bono1='" +rd.getBono1()+"', bono2='"+rd.getBono2()+"', valor_liquido='" +rd.getValor_liquido()+ "', maquinaria='" +rd.getMaquinaria()
				+ "', implemento='" +rd.getImplemento()+ "', estado= '" +rd.getEstado()+ "', codigo_rg='" +rd.getCodigo_rg()+ "'";
			ps = db.conn.prepareStatement(sql);
			ps.execute();
			return true;
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error:" + e.getMessage());
		} finally {
			ps.close();
			db.conn.close();
		}
		return false;
	}
	public static ArrayList<RENDIMIENTO_GENERAL> GET_RENDIMIENTO_GENERAL_FECHA(String fecha) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<RENDIMIENTO_GENERAL> lista = new ArrayList<RENDIMIENTO_GENERAL>();
		ConnectionDB db = new ConnectionDB();
		try{
		sql = "SELECT rg.* FROM cuadrilla c RIGHT JOIN rendimiento_general rg ON(c.codigo = rg.codigo_cuadrilla) WHERE c.codigo = "+fecha;
		ps = db.conn.prepareStatement(sql);
		ResultSet rs = ps.executeQuery(sql);
		while (rs.next()) {
			RENDIMIENTO_GENERAL ob = new RENDIMIENTO_GENERAL();
			ob.setCodigo(rs.getInt("codigo"));
			ob.setFecha(rs.getString("fecha"));
			ob.setEspecie(rs.getInt("especie"));
			ob.setVariedad(rs.getInt("variedad"));
			ob.setCuartel(rs.getInt("cuartel"));
			ob.setFaena(rs.getInt("faena"));
			ob.setLabor(rs.getInt("labor"));
			ob.setHoras(rs.getInt("horas"));
			ob.setTipo_pago(rs.getInt("tipo_pago"));
			ob.setCodigo_cuadrilla(rs.getInt("codigo_cuadrilla_trabajador"));
			ob.setCodigo_supervisor(rs.getInt("codigo_supervisor"));
			lista.add(ob);
		}
		rs.close();
		ps.close();
		db.conn.close();
		}catch (SQLException e){
			System.out.println("Erro:" + e.getMessage());
		}catch (Exception e){
			System.out.println("Error:" + e.getMessage());
		}finally {
			db.close();
		}
		return lista;
	}
	public static ArrayList<RENDIMIENTO_GENERAL> GET_RENDIMIENTO_GENERAL_CUADRILLA(	int codigo) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<RENDIMIENTO_GENERAL> lista = new ArrayList<RENDIMIENTO_GENERAL>();
		ConnectionDB db = new ConnectionDB();
		try{
		sql = "SELECT rg.* FROM cuadrilla c RIGHT JOIN rendimiento_general rg ON(c.codigo = rg.codigo_cuadrilla) WHERE c.codigo = "+codigo;
		ps = db.conn.prepareStatement(sql);
		ResultSet rs = ps.executeQuery(sql);
		while (rs.next()) {
			RENDIMIENTO_GENERAL ob = new RENDIMIENTO_GENERAL();
			ob.setCodigo(rs.getInt("codigo"));
			ob.setFecha(rs.getString("fecha"));
			ob.setEspecie(rs.getInt("especie"));
			ob.setVariedad(rs.getInt("variedad"));
			ob.setCuartel(rs.getInt("cuartel"));
			ob.setFaena(rs.getInt("faena"));
			ob.setLabor(rs.getInt("labor"));
			ob.setHoras(rs.getInt("horas"));
			ob.setTipo_pago(rs.getInt("tipo_pago"));
			ob.setCodigo_cuadrilla(rs.getInt("codigo_cuadrilla_trabajador"));
			ob.setCodigo_supervisor(rs.getInt("codigo_supervisor"));
			lista.add(ob);
		}
		rs.close();
		ps.close();
		db.conn.close();
		}catch (SQLException e){
			System.out.println("Erro:" + e.getMessage());
		}catch (Exception e){
			System.out.println("Error:" + e.getMessage());
		}finally {
			db.close();
		}
		return lista;
	}
	public static ArrayList<RENDIMIENTO_GENERAL> GET_RENDIMIENTO_GENERAL(String fecha, int id, String cuartel, String tipo) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<RENDIMIENTO_GENERAL> lista = new ArrayList<RENDIMIENTO_GENERAL>();
		ConnectionDB db = new ConnectionDB();
		try{
			sql = "SELECT *FROM rendimiento_general WHERE fecha = '"+fecha+"' AND codigo_supervisor = "+id+" AND estado != 7 ";
			sql += "AND (cuartel = '"+cuartel+"' OR ceco = '"+cuartel+"' OR ordenco = '"+cuartel+"')";
			if(tipo.equals("PLANTA")){
				sql += " AND contratista IS NULL";
			}else{
				sql += " AND contratista IS NOT NULL";
			}
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while (rs.next()) {
				RENDIMIENTO_GENERAL ob = new RENDIMIENTO_GENERAL();
				ob.setCodigo(rs.getInt("codigo_rg"));
				ob.setFecha(rs.getString("fecha"));
				ob.setEspecie(rs.getInt("especie"));
				ob.setVariedad(rs.getInt("variedad"));
				ob.setCuartel(rs.getInt("cuartel"));
				ob.setFaena(rs.getInt("faena"));
				ob.setLabor(rs.getInt("labor"));
				ob.setHoras(rs.getInt("horas"));
				ob.setTipo_pago(rs.getInt("tipo_pago"));
				ob.setValor(rs.getInt("valor"));
				ob.setCodigo_cuadrilla(rs.getInt("codigo_cuadrilla"));
				ob.setCodigo_supervisor(rs.getInt("codigo_supervisor"));
				ob.setContratista(rs.getString("contratista"));
				ob.setMacro(rs.getString("macro"));
				ob.setCeco(rs.getString("ceco"));
				ob.setOrdenco(rs.getString("ordenco"));
				lista.add(ob);
			}
			rs.close();
			ps.close();
			db.conn.close();
		}catch (SQLException e){
			System.out.println("Erro:" + e.getMessage());
		}catch (Exception e){
			System.out.println("Error:" + e.getMessage());
		}finally {
			db.close();
		}
		return lista;
	}
	public static int r_folio(String sql) throws Exception{
		int id = 0;
		PreparedStatement ps = null;
		ConnectionDB db = new ConnectionDB();
		try {
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			if(rs.next()){
				id = rs.getInt("folio");
			}
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch (Exception e){
			System.out.println("Error:" + e.getMessage());
		} finally {
			ps.close();
			db.conn.close();
		}
		return id;
	}
	public static boolean ADD_RENDIMIENTO_GENERAL(RENDIMIENTO_GENERAL rg) throws Exception {
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		try {
			int folio = r_folio("SELECT MAX(FOLIO+1) as folio FROM rendimiento_general WHERE campo = '"+rg.getCampo()+"'");
			if(folio == 0){
				folio = 1;
			}
			System.out.println(rg.getHoras());
			sql = "INSERT INTO rendimiento_general (fecha, campo, especie, variedad, cuartel, faena, labor, horas, tipo_pago, valor, base_piso_dia, codigo_supervisor, estado, folio,contratista,ncontratista, ";
			sql += "macro, ceco, ordenco)";
			sql += "VALUES (?,?,?,?,?,?,?,"+String.valueOf(rg.getHoras())+",?,?,?,?,1,"+folio+",?,?,?,?,?)";
			ps = db.conn.prepareStatement(sql);
			ps.setString(1, rg.getFecha());
			ps.setString(2, rg.getCampo());
			ps.setInt(3, rg.getEspecie());
			ps.setInt(4, rg.getVariedad());
			ps.setInt(5, rg.getCuartel());
			ps.setInt(6, rg.getFaena());
			ps.setInt(7, rg.getLabor());
			ps.setInt(8, rg.getTipo_pago());
			ps.setInt(9, rg.getValor());
			ps.setInt(10, rg.getBase_piso_dia());
			ps.setInt(11, rg.getCodigo_supervisor());
			ps.setString(12, rg.getContratista());
			ps.setString(13, rg.getNcontratista());
			ps.setString(14, rg.getMacro());
			ps.setString(15, rg.getCeco());
			ps.setString(16, rg.getOrdenco());
			ps.execute();
			return true;
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch (Exception e){
			System.out.println("Error:" + e.getMessage());
		} finally {
			ps.close();
			db.conn.close();
		}
		return false;
	}
//	UPDATE
	public static boolean UPDATE_RENDIMIENTO_GENERAL (RENDIMIENTO_GENERAL rg)throws Exception{
		PreparedStatement ps  = null;
		 String sql = "";
		 ConnectionDB db = new ConnectionDB();
		 try {
			sql ="UPDATE rendimiento_general set fecha = ?, especie = ?, variedad = ?, cuartel = ?, faena = ?, labor = ?, horas = "+String.valueOf(rg.getHoras())+", tipo_pago = ?, codigo_cuadrilla = ?, codigo_supervisor = ?, where codigo = ?";
			ps = db.conn.prepareStatement(sql);
			ps.setString(1, rg.getFecha());
			ps.setInt(2, rg.getEspecie());
			ps.setInt(3, rg.getVariedad());
			ps.setInt(4, rg.getCuartel());
			ps.setInt(5, rg.getFaena());
			ps.setInt(6, rg.getLabor());
			ps.setInt(7, rg.getTipo_pago());
			ps.setInt(8, rg.getCodigo_cuadrilla());
			ps.setInt(9, rg.getCodigo_supervisor());
			ps.setInt(10, rg.getCodigo());
			ps.execute();
			return true;
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error:" + e.getMessage());
		} finally {
			ps.close();
			db.conn.close();
		}
		 return false;
	}
	public static ArrayList<estado_rendimiento> GETER () throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<estado_rendimiento> lista  = new ArrayList<estado_rendimiento>();
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "SELECT * FROM estado_rendimiento";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				estado_rendimiento ob = new estado_rendimiento();
				ob.setCodigo(rs.getInt("codigo"));
				ob.setDescripcion(rs.getString("descripcion"));
				lista.add(ob);
			}
			rs.close();
			ps.close();
			db.conn.close();
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch (Exception e){
			System.out.println("Error:" + e.getMessage());
		} finally {
			db.close();
		}
		return lista;
	}
//-------------FIN ESTADO_RENDIMIENTO------------------
			
			
			
			
			
//--------------CALIFICAR_RENDIMIENTO----------------
//			SELECT
	public static ArrayList<calificacion_rendimiento> GET_CALIFICAR_RENDIMIENTO ()throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<calificacion_rendimiento> lista = new ArrayList<calificacion_rendimiento>();
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "SELECT * FROM calificacion_rendimiento";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
			calificacion_rendimiento ob = new calificacion_rendimiento();
			ob.setCodigo(rs.getInt("codigo"));
			ob.setTrabajado(rs.getInt("trabajado"));
			ob.setRendimiento(rs.getInt("rendimiento"));
			ob.setPromedio_cuadrilla(rs.getInt("promedio_cuadrilla"));
			ob.setCalificacion(rs.getInt("calificacion"));
			ob.setCaudrilla(rs.getInt("cuadrilla"));
			ob.setLabor(rs.getInt("labor"));
			lista.add(ob);
			}
			rs.close();
			ps.close();
			db.conn.close();
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error:" + e.getMessage());
		} finally {
			db.close();
		}
		return lista;
	}
//			INSERT
	public static boolean ADD_CALIFICAR_RENDIMIENTO (calificacion_rendimiento c)throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "INSERT INTO calificacion_rendimiento (trabajado, rendimiento, promedio_cuadrilla,"
					+ " calificacion, cuadrilla, labor)";
			sql += "VALUES (?,?,?,?,?,?)";
			ps = db.conn.prepareStatement(sql);
			ps.setInt(1, c.getTrabajado());
			ps.setInt(2, c.getRendimiento());
			ps.setInt(3, c.getPromedio_cuadrilla());
			ps.setInt(4, c.getCalificacion());
			ps.setInt(5, c.getCaudrilla());
			ps.setInt(6, c.getLabor());
			ps.execute();
			return true;
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch  (Exception e){	
			System.out.println("Error:" + e.getMessage());
		} finally {
			ps.close();
			db.conn.close();
		}
		return false;
	}
	
	
	public static ArrayList<RENDIMIENTO_DIARIO> GET_Listado(String fecha_desde, String fecha_hasta, 
			String campo, String especie, String variedad, String faena, 
			String labor, String trabajador, String tipo_trabajador,String contratista,String cuartel, int estado, int valor, HttpSession httpSession) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<RENDIMIENTO_DIARIO> lista = new ArrayList<RENDIMIENTO_DIARIO>();
		ConnectionDB db = new ConnectionDB();
		try {
			session ses = new session(httpSession);
			String[] lengthCampo = campo.split(",");
			System.out.println(campo);
			sql += 	"SELECT DISTINCT ";
			sql += 		"rd.*, t.rut,c.especie, e.especie AS nespecie, l.faena, ";
			sql += 		"case when(rd.rd_contratista is null) then 0 else rd.rd_contratista end as contratista, ";
			sql += 		"UPPER(CONCAT(t.apellidoPaterno, ' ', t.apellidoMaterno, ' ', t.nombre)) AS nTrabajador, ";
			sql += 		"UPPER(CONCAT(trs.apellidoPaterno, ' ', trs.apellidoMaterno, ' ', trs.nombre)) AS supervisor, ";
			sql += 		"CASE ";
			sql += 			"WHEN (rg.fecha IS NULL) THEN rd.fecha_i ";
			sql += 			"ELSE rg.fecha ";
			sql += 		"END fecha_rendimiento, ";
			sql += 		"UPPER(CONCAT(c.codigo_cuartel, ' ', c.nombre)) AS nvnombre, cam.descripcion AS campo, c.variedad, v.variedad AS nVariedad, f.faena AS nFaena, l.labor AS nLabor, er.descripcion AS nestado ";
			if(valor == 0){
				sql += 		", CAST(vla.liquido * GETPORCENTAJEVALOR(rd.trabajador, ";
				sql += 				"DATE_FORMAT((SELECT ";
				sql += 								"CASE ";
				sql += 									"WHEN (rdr.fecha_i = '') THEN rgr.fecha ";
				sql += 									"ELSE rdr.fecha_i ";
				sql += 								"END AS fecha ";
				sql += 							"FROM ";
				sql += 								"rendimiento_diario rdr ";
				sql += 								"LEFT JOIN rendimiento_general rgr ON (rdr.codigo_rg = rgr.codigo_rg) ";
				sql += 							"WHERE ";
				sql += 								"rdr.codigo = rd.codigo), '%Y%m'), ";
				sql += 				"rd.valor_liquido, ";
				sql += 				"(SELECT sociedad FROM campo WHERE campo = cam.campo)) / 100 AS SIGNED)AS costo_empresa ";
			}
			sql += 		",CAST((rd.valor_rendimietno/rd.rendimiento) as signed) as valor_trato ";
			sql += 	"FROM rendimiento_diario rd ";
			sql += 		"LEFT JOIN rendimiento_general rg ON(rd.codigo_rg = rg.codigo_rg) ";
			sql += 		"LEFT JOIN trabajadores t ON(t.id = rd.trabajador) ";
			sql += 		"LEFT JOIN trabajadores trs ON(trs.id = rg.codigo_supervisor OR trs.id = rd.supervisor_i) ";
			if(valor == 0){
				sql += 		"LEFT JOIN vw_liquidoAgro vla ON (vla.codTrabajador = t.codigo AND vla.sociedad = (SELECT sociedad FROM campo WHERE campo IN ("+campo+")) AND vla.periodo = DATE_FORMAT('"+fecha_hasta+"', '%Y%m'))";
			}
			sql += 		"LEFT JOIN estado_rendimiento er ON(er.codigo = rd.estado) ";
			sql += 		"LEFT JOIN cuartel c ON(c.codigo = rd.cuartel) ";
			sql += 		"LEFT JOIN especie e ON(e.codigo = c.especie) ";
			sql += 		"LEFT JOIN variedad v ON(v.codigo = c.variedad) ";
			sql += 		"LEFT JOIN campo cam ON(cam.campo = rd.campo_rd OR cam.campo = rg.campo) ";
			sql += 		"LEFT JOIN sector s ON (s.sector = c.sector) ";
			sql += 		"LEFT JOIN labor l ON(l.codigo = rd.labor) ";
			sql += 		"LEFT JOIN faena f ON(f.codigo = l.faena) ";
			sql += 	"WHERE ";
			sql += 		"(rg.fecha BETWEEN '"+fecha_desde+"' AND '"+fecha_hasta+"' OR rd.fecha_i BETWEEN '"+fecha_desde+"' AND '"+fecha_hasta+"')";
			sql += 		"AND (cam.campo IN ("+campo+")) ";
			sql += 		"AND (rg.especie IN ('"+especie+"') or '"+especie+"' = 0) ";
			sql += 		"AND (v.codigo IN ('"+variedad+"') or '"+variedad+"' = 0) ";
			sql += 		"AND (f.codigo IN ('"+faena+"') or '"+faena+"' = 0) ";
			sql += 		"AND (rd.labor IN ('"+labor+"') or '"+labor+"' = 0) ";
			sql += 		"AND (rd.trabajador IN ('"+trabajador+"') or '"+trabajador+"' = 0) ";
			sql += 		"AND (rd.cuartel IN ('"+cuartel+"') or '"+cuartel+"' = 0) ";
			sql += 		"AND (rd.rd_contratista IN ('"+contratista+"') or '"+contratista+"' = 0) ";
			sql += 		"AND (rd.estado IN ('"+estado+"') or '"+estado+"' = 0) ";
			if(tipo_trabajador.equals("1")) {
				sql += " AND (rd.rd_contratista = 0 or rd.rd_contratista = '' or rd.rd_contratista is null)";
			}
			if(tipo_trabajador.equals("2")) {
				sql += " AND (rd.rd_contratista != 0 and rd.rd_contratista != '' and rd.rd_contratista is not null)";
			}
			sql += " AND rd.estado != 7";
			System.out.println(sql);
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				RENDIMIENTO_DIARIO ob = new RENDIMIENTO_DIARIO();
				ob.setCodigo(rs.getInt("codigo"));
				ob.setNombre(rs.getString("nTrabajador"));
				ob.setRut(rs.getString("rut"));
				ob.setHoras_trabajadas(rs.getFloat("horas_trabajadas"));
				ob.setHoras_extras(rs.getFloat("horas_extras"));
				ob.setEspecie(rs.getInt("especie"));
				ob.setVariedad(rs.getInt("variedad"));
				ob.setFaena(rs.getInt("faena"));
				ob.setLabor(rs.getInt("labor"));
				ob.setValor(rs.getInt("valor"));
				ob.setValor_rendimiento(rs.getFloat("valor_rendimietno"));
				ob.setRendimiento(rs.getFloat("rendimiento"));
				ob.setTipo_pago(rs.getInt("tipo_trato"));
				ob.setValor_liquido(rs.getInt("valor_liquido"));
				ob.setBono1(rs.getInt("bono1"));
				ob.setBono2(rs.getInt("bono2"));
				ob.setMaquinaria(rs.getInt("maquinaria"));
				ob.setImplemento(rs.getInt("implemento"));
				ob.setFecha(rs.getString("fecha_rendimiento")); 
				ob.setNvnombre(rs.getString("nvnombre"));
				ob.setDescripcion(rs.getString("campo"));
				ob.setnVariedad(rs.getString("nVariedad"));
				ob.setnEspecie(rs.getString("nEspecie"));
//				ob.setnMaquinaria(rs.getString("nMaquinaria"));
//				ob.setnImplemento(rs.getString("nImplemento"));
				ob.setnFaena(rs.getString("nFaena"));
				ob.setnLabor(rs.getString("nLabor"));
				ob.setSupervisor(rs.getString("supervisor"));
				ob.setBase_piso_hora(rs.getInt("base_piso_hora"));
				ob.setIdContratista(rs.getString("contratista"));
				ob.setNestado(rs.getString("nestado"));
				ob.setValor_hx(rs.getFloat("valor_hx"));
				ob.setMonto_hx(rs.getFloat("monto_hx"));
				ob.setHx_dos(rs.getFloat("hx_dos"));
				ob.setValor_hx_dos(rs.getFloat("valor_hx_dos"));
				ob.setMacroco(rs.getString("macroco"));
				ob.setCeco(rs.getString("ceco"));
				ob.setOrdenco(rs.getString("ordenco"));
				ob.setRes_hx(rs.getInt("res_hx"));
				ob.setSubsidio(rs.getInt("subsidio"));
				ob.setCuartel(rs.getInt("rd.cuartel"));
				ob.setValor_trato(rs.getFloat("valor_trato"));
				if(valor == 0){
					ob.setCosto_empresa(rs.getInt("costo_empresa"));
				}
				lista.add(ob);
			}
			rs.close();
			ps.close();
			db.conn.close();
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error:" + e.getMessage());
		} finally {
			db.close();
		}
		return lista;
	}
	
	public static ArrayList<Trabajador> GETTRABAJADOR() throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<Trabajador> lista = new ArrayList<Trabajador>();
		ConnectionDB db = new ConnectionDB();
		try {
			sql = " SELECT idTrabajador,nombre, rut, apellidoPaterno, apellidoMaterno from trabajador";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				Trabajador ob = new Trabajador();
				ob.setIdTrabajador(rs.getInt("idTrabajador"));
				ob.setNombre(rs.getString("nombre"));
				ob.setApellidoPaterno(rs.getString("apellidoPaterno"));
				ob.setApellidoMaterno(rs.getString("apellidoMaterno"));
				ob.setRut(rs.getString("rut"));
				lista.add(ob);
			}
			rs.close();
			ps.close();
			db.conn.close();
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error:" + e.getMessage());
		} finally {
			db.close();
		}
		return lista;
	}
	public static ArrayList<CUADRATURA_HORA> GET_CUADRATURA_HORAS (String campo, String[] fechas, double horas)throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<CUADRATURA_HORA> lista = new ArrayList<CUADRATURA_HORA>();
		ConnectionDB db = new ConnectionDB();
		try {
			int count = 0;
			for(int i = 0; i < fechas.length; i++){
				if(count == 0){
					sql += 	"SELECT ";
					sql += 		"tr.id, tr.codigo, tr.rut AS rut_trabajador, ";
					sql += 		"CONCAT(tr.apellidoPaterno, ' ', tr.apellidoMaterno, ' ', tr.nombre) AS nombre, ";
					sql += 		"cm.descripcion AS campo, rd.horas, ha.horasFalta, DATE('"+fechas[i]+"') AS fecha ";
					sql += 	"FROM trabajadores tr ";
					sql += 		"LEFT JOIN contratos ct ON (ct.codigo_trabajador = tr.codigo) ";
//					sql += 		"LEFT JOIN permiso_licencia pl ON(ct.codigo_trabajador = pl.codigo_trabajador)";
					sql += 		"LEFT JOIN campo cm ON (cm.campo = tr.idHuerto) ";
					sql += 		"LEFT JOIN (SELECT SUM(horas_trabajadas) horas, trabajador ";
					sql += 			"FROM rendimiento_diario rd ";
					sql += 			"LEFT JOIN rendimiento_general rg ON (rg.codigo_rg = rd.codigo_rg) ";
					sql += 			"WHERE (rd.fecha_i = '"+fechas[i]+"' OR rg.fecha = '"+fechas[i]+"') AND(rg.campo = '"+campo+"' or rd.campo_rd = '"+campo+"') AND rd.estado != 7 ";
					sql += 			"GROUP BY trabajador) rd ON rd.trabajador = tr.id ";
					sql += 		"LEFT JOIN (SELECT SUM(nHoras) AS horasFalta, codTrabajador ";
					sql += 			"FROM sw_horasAsistencia WHERE fecha = '"+fechas[i]+"' ";
					sql += 			"GROUP BY 2) ha ON(tr.codigo = ha.codTrabajador) ";
					sql += 	"WHERE ct.EstadoContrato = 1 AND tr.agro = 1 ";
					sql += 		"AND cm.campo = '"+campo+"' ";
					sql += 		"AND (rd.horas IS NULL OR rd.horas != "+horas+") ";
					sql += 		"AND ct.fechaInicio_actividad <= '"+fechas[i]+"' ";
					sql += 		"AND (ct.FechaTerminoContrato >= '"+fechas[i]+"' OR ct.FechaTerminoContrato IS NULL) ";
//					sql += 		"AND pl.fecha_desde <= '"+fechas[i]+"' ";
//					sql += 		"AND pl.fecha_hasta >= '"+fechas[i]+"' ";
				}else{
					sql += 	"UNION ALL SELECT ";
					sql += 		"tr.id, tr.codigo, tr.rut AS rut_trabajador, ";
					sql += 		"CONCAT(tr.apellidoPaterno, ' ', tr.apellidoMaterno, ' ', tr.nombre) AS nombre, ";
					sql += 		"cm.descripcion AS campo, rd.horas, ha.horasFalta, DATE('"+fechas[i]+"') AS fecha ";
					sql += 	"FROM trabajadores tr ";
					sql += 		"LEFT JOIN contratos ct ON (ct.codigo_trabajador = tr.codigo) ";
//					sql += 		"LEFT JOIN permiso_licencia pl ON(ct.codigo_trabajador = pl.codigo_trabajador)";
					sql += 		"LEFT JOIN campo cm ON (cm.campo = tr.idHuerto) ";
					sql += 		"LEFT JOIN (SELECT SUM(horas_trabajadas) horas, trabajador ";
					sql += 			"FROM rendimiento_diario rd ";
					sql += 			"LEFT JOIN rendimiento_general rg ON (rg.codigo_rg = rd.codigo_rg) ";
					sql += 			"WHERE (rd.fecha_i = '"+fechas[i]+"' OR rg.fecha = '"+fechas[i]+"') AND(rg.campo = '"+campo+"' or rd.campo_rd = '"+campo+"') AND rd.estado != 7 ";
					sql += 			"GROUP BY trabajador) rd ON rd.trabajador = tr.id ";
					sql += 		"LEFT JOIN (SELECT SUM(nHoras) AS horasFalta, codTrabajador ";
					sql += 			"FROM sw_horasAsistencia WHERE fecha = '"+fechas[i]+"' ";
					sql += 			"GROUP BY 2) ha ON(tr.codigo = ha.codTrabajador) ";
					sql += 	"WHERE ct.EstadoContrato = 1 AND tr.agro = 1 ";
					sql += 		"AND cm.campo = '"+campo+"' ";
					sql += 		"AND (rd.horas IS NULL OR rd.horas != "+horas+") ";
					sql += 		"AND ct.fechaInicio_actividad <= '"+fechas[i]+"' ";
					sql += 		"AND (ct.FechaTerminoContrato >= '"+fechas[i]+"' OR ct.FechaTerminoContrato IS NULL) ";
//					sql += 		"AND pl.fecha_desde <= '"+fechas[i]+"' ";
//					sql += 		"AND pl.fecha_hasta >= '"+fechas[i]+"' ";
				}
				count++;
			}
			sql +=	"ORDER BY 8,4;";
			System.out.println(sql);
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql); 
			while(rs.next()){
				CUADRATURA_HORA ob = new CUADRATURA_HORA();
				ob.setCuartel(rs.getString("id"));
				ob.setCodigo(rs.getInt("codigo"));
				ob.setCampo(rs.getString("campo"));
				ob.setFecha(rs.getString("fecha"));
				ob.setRut(rs.getString("rut_trabajador"));
				ob.setNombre(rs.getString("nombre"));
				ob.setHoras(rs.getInt("horas"));
				ob.setHorasFalta(rs.getFloat("horasFalta"));
				lista.add(ob);
			}
			rs.close();
			ps.close();
			db.conn.close();
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error:" + e.getMessage());
		} finally {
			db.close();
		}
		return lista;
	}			
			

	public static ArrayList<CUADRATURA_HORA> GET_DETALLE_RENDIMIENTO_RUT (FILTRO_CUADRAR_HR t)throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<CUADRATURA_HORA> list = new ArrayList<CUADRATURA_HORA>();
		ConnectionDB db = new ConnectionDB();
		try {
			sql += 	"SELECT ";
			sql += 		"rd.codigo,rd.trabajador id, tr.rut rut_trabajador, cam.descripcion AS campo, rd.horas_trabajadas AS horas, ";
			sql += 		"CONCAT(tr.apellidoPaterno,' ', tr.apellidoMaterno, ' ', tr.nombre) AS nombreTrabajador, ";
			sql += 		"CASE ";
			sql += 			"WHEN(rg.fecha IS NULL) THEN  ";
			sql += 				"rd.fecha_i ";
			sql += 			"ELSE rg.fecha ";
			sql += 		"END AS fecha, ";
			sql += 		"CASE ";
			sql += 			"WHEN(rd.cuartel IS NULL) THEN ";
			sql += 				"CASE ";
			sql += 					"WHEN(rd.ceco IS NULL)THEN ";
			sql += 						"rd.ordenco ";
			sql += 					"ELSE rd.ceco ";
			sql += 				"END ";
			sql += 			"ELSE c.nombre ";
			sql += 		"END AS cuartel, ";
			sql += 		"CONCAT(trS.apellidoPaterno,' ', trS.apellidoMaterno, ' ', trS.nombre) AS supervisor ";
			sql += 	"FROM rendimiento_diario rd ";
			sql += 		"LEFT JOIN rendimiento_general rg ON (rd.codigo_rg = rg.codigo_rg) ";
			sql += 		"LEFT JOIN trabajadores tr ON (tr.id = rd.trabajador) ";
			sql += 		"LEFT JOIN trabajadores trS ON (trS.id = rg.codigo_supervisor OR trS.id = rd.supervisor_i) ";
			sql += 		"LEFT JOIN cuartel c ON (c.codigo = rd.cuartel) ";
			sql += 		"LEFT JOIN campo cam ON (cam.campo = rg.campo OR rd.campo_rd = cam.campo) ";
			sql += 	"WHERE ";
			sql += 		"(rg.fecha = '"+t.getFecha()+"' or rd.fecha_i = '"+t.getFecha()+"') ";
			sql += 		"AND (rg.campo = '"+t.getCampo()+"' OR rd.campo_rd = '"+t.getCampo()+"')";
			sql += 		"AND tr.rut = '"+t.getRut()+"' AND rd.estado != 7;";
			System.out.println(sql);
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				CUADRATURA_HORA ob = new CUADRATURA_HORA();
				ob.setCodigo(rs.getInt("codigo"));
				ob.setCampo(rs.getString("campo"));
				ob.setRut(rs.getString("rut_trabajador"));
				ob.setNombre(rs.getString("nombreTrabajador"));
				ob.setHoras(rs.getInt("horas"));
				ob.setSupervisor(rs.getString("id"));
				ob.setCuartel(rs.getString("cuartel"));
				ob.setFecha(rs.getString("fecha"));
				ob.setSupervisor(rs.getString("supervisor"));
				list.add(ob);
			}
			rs.close();
			ps.close();
			db.conn.close();
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error:" + e.getMessage());
		} finally {
			db.close();
		}
		return list;
	}	
//-------------FIN CUADRATURA HORAS-------------
			
//-------------FIN VALIDAR RENDIMIENTO-------------
	public static ArrayList<RENDIMIENTO_GENERAL> GET_RENDIMIENTOS_FECHA (String campo, String fecha_desde, String fecha_hasta, String tipo, int estado)throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<RENDIMIENTO_GENERAL> lista = new ArrayList<RENDIMIENTO_GENERAL>();
		ConnectionDB db = new ConnectionDB();
		try {
			sql +=	"SELECT ";
			sql +=		"rg.codigo_rg, rg.fecha, cam.campo AS codigoCampo,cam.descripcion AS campo, rg.ceco, rg.ordenco, ";
			sql +=		"CONCAT(t.apellidoPaterno, ' ', t.apellidoMaterno, ' ', t.nombre) AS supervisor, ";
			sql +=		"fa.faena, la.labor, rg.horas, rg.tipo_pago, rg.folio, rg.contratista, rg.ncontratista, e.especie, v.variedad, c.nombre ";
			sql +=	"FROM rendimiento_general rg ";
			sql +=		"LEFT JOIN campo cam ON(cam.campo = rg.campo) ";
			sql +=		"LEFT JOIN faena fa ON(fa.codigo = rg.faena) ";
			sql +=		"LEFT JOIN labor la ON(la.codigo = rg.labor) ";
			sql +=		"LEFT JOIN cuartel c ON(c.codigo = rg.cuartel) ";
			sql +=		"LEFT JOIN variedad v ON(v.codigo = rg.variedad) ";
			sql +=		"LEFT JOIN especie e ON(e.codigo = rg.especie) ";
			sql +=		"LEFT JOIN trabajadores t ON(t.id = rg.codigo_supervisor) ";
			sql +=	"WHERE ";
			sql +=		"rg.fecha BETWEEN '"+fecha_desde+"' AND '"+fecha_hasta+"' ";
			sql +=		"AND cam.campo = '"+campo+"' ";
			sql +=		"AND rg.estado = "+estado+" ";
			if(tipo.equals("PLANTA")){
				sql += 	"AND rg.contratista IS NULL ";
			}else{
				sql += 	"AND rg.contratista IS NOT NULL ";
			}
			sql	+= "ORDER BY 2, 4;";
			ps = db.conn.prepareStatement(sql);
			System.out.println(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				RENDIMIENTO_GENERAL ob = new RENDIMIENTO_GENERAL();
				ob.setCodigo(rs.getInt("codigo_rg"));
				ob.setFecha(rs.getString("fecha"));
				ob.setCampo(rs.getString("campo"));
				ob.setNsupervisor(rs.getString("supervisor"));
				ob.setNlabor(rs.getString("labor"));
				ob.setHoras(rs.getInt("horas"));
				ob.setTipo_pago(rs.getInt("tipo_pago"));
				ob.setNespecie(rs.getString("especie"));
				ob.setNvariedad(rs.getString("variedad"));
				ob.setNfaena(rs.getString("faena"));
				ob.setNcuartel(rs.getString("nombre"));
				ob.setFolio(rs.getInt("folio"));
				ob.setContratista(rs.getString("contratista"));
				ob.setOrdenco(rs.getString("ordenco"));
				ob.setCeco(rs.getString("ceco"));
				ob.setNcontratista(rs.getString("ncontratista"));
				lista.add(ob);
			}
			rs.close();
			ps.close();
			db.conn.close();
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error:" + e.getMessage());
		} finally {
			db.close();
		}
		return lista;
	}
	public static ArrayList<RENDIMIENTO_GENERAL> GET_RENDIMIENTOS_FECHA_INDIVIDUAL (String campo, String fecha_desde, String fecha_hasta, String tipo, int estado)throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<RENDIMIENTO_GENERAL> lista = new ArrayList<RENDIMIENTO_GENERAL>();
		ConnectionDB db = new ConnectionDB();
		try {
			sql += 	"SELECT ";
			sql += 		"rd.codigo AS codigo_rg, rd.fecha_i, cam.descripcion, ";
			sql += 		"CONCAT(t.apellidoPaterno, ' ', t.apellidoMaterno, ' ', t.nombre) AS supervisor, ";
			sql += 		"CONCAT(trs.apellidoPaterno, ' ', trs.apellidoMaterno, ' ', trs.nombre) AS trabajador, ";
			sql += 		"f.faena, l.labor, rd.horas_trabajadas, rd.tipo_trato, e.especie, v.variedad, c.nombre, rd.macroco, rd.ceco, rd.ordenco, rd.rd_contratista ";
			sql += 	"FROM rendimiento_diario rd ";
			sql += 		"LEFT JOIN labor l ON(l.codigo = rd.labor) ";
			sql += 		"LEFT JOIN faena f ON(l.faena = f.codigo) ";
			sql += 		"LEFT JOIN trabajadores t ON(t.id = rd.supervisor_i) ";
			sql += 		"LEFT JOIN trabajadores trs ON(trs.id = rd.trabajador) ";
			sql += 		"LEFT JOIN campo cam ON(cam.campo = rd.campo_rd) ";
			sql += 		"LEFT JOIN cuartel c ON(c.codigo = rd.cuartel) ";
			sql += 		"LEFT JOIN especie e ON(e.codigo = c.especie) ";
			sql += 		"LEFT JOIN variedad v ON(v.codigo = c.variedad) ";
			sql += 	"WHERE ";
			sql += 		"rd.fecha_i BETWEEN '"+fecha_desde+"' AND '"+fecha_hasta+"' ";
			sql += 		"AND rd.codigo_rg = 0 ";
			sql += 		"AND (cam.campo = '"+campo+"' OR rd.campo_rd = '"+campo+"') ";
			sql += 		"AND rd.estado = "+estado+" ";
			if(tipo.equals("PLANTA")){
				sql += "AND rd.rd_contratista = 0 ";
			}else{
				sql += "AND rd.rd_contratista != 0 ";
			}
			sql	+= "ORDER BY 2, 4;";
			System.out.println(sql);
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				RENDIMIENTO_GENERAL ob = new RENDIMIENTO_GENERAL();
				ob.setCodigo(rs.getInt("codigo_rg"));
				ob.setFecha(rs.getString("fecha_i"));
				ob.setCampo(rs.getString("descripcion"));
				ob.setNsupervisor(rs.getString("supervisor"));
				ob.setTrabajador(rs.getString("trabajador"));
				ob.setNfaena(rs.getString("faena"));
				ob.setNlabor(rs.getString("labor"));
				ob.setHoras(rs.getFloat("horas_trabajadas"));
				ob.setTipo_pago(rs.getInt("tipo_trato"));
				ob.setNespecie(rs.getString("especie"));
				ob.setNvariedad(rs.getString("variedad"));
				ob.setNcuartel(rs.getString("nombre"));
				ob.setMacro(rs.getString("macroco"));
				ob.setCeco(rs.getString("ceco"));
				ob.setOrdenco(rs.getString("ordenco"));
				ob.setContratista(rs.getString("rd_contratista"));
				lista.add(ob);
			}
			rs.close();
			ps.close();
			db.conn.close();
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error:" + e.getMessage());
		} finally {
			db.close();
		}
		return lista;
	}	
			
	public static ArrayList<detalle_rendimiento> GET_DETALLE_RENDIMIENTO_DIARIO (String tipo, String codigorg)throws Exception{
		int codigo = Integer.parseInt(codigorg);
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<detalle_rendimiento> lista = new ArrayList<detalle_rendimiento>();
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "SELECT rd.*, CONCAT(t.apellidoPaterno, ' ', t.apellidoMaterno, ' ',t.nombre) AS nombre_trabajador, c.nombre AS nombre_cuartel, fa.faena AS des_faena, la.labor AS des_labor, m.descripcion AS maquinaria_desc, i.descripcion AS implemento_desc ";
			sql	+= "FROM  rendimiento_diario rd ";
			sql	+= "LEFT JOIN trabajadores t ON(t.id = rd.trabajador) ";
			sql	+= "LEFT JOIN cuartel c ON(c.codigo = rd.cuartel) ";
			sql	+= "JOIN labor la ON(la.codigo = rd.labor) ";
			sql	+= "JOIN faena fa ON(fa.codigo = la.faena) ";
			sql	+= "LEFT JOIN implemento i ON(i.codigo = rd.implemento) ";
			sql	+= "LEFT JOIN maquinaria m ON(m.codigo = rd.maquinaria) ";
			if(tipo.equals("MASIVO")){
				sql	+= "WHERE rd.codigo_rg = "+codigo+"";
			}else{
				sql	+= "WHERE rd.codigo = "+codigo+"";
			}
			System.out.println(sql);
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				detalle_rendimiento e = new detalle_rendimiento();
				e.setCodigo(rs.getInt("codigo"));
				e.setTrabajador(rs.getInt("rd.trabajador"));
				e.setNombre_trabajador(rs.getString("nombre_trabajador"));
				e.setBase_piso_hora(rs.getFloat("base_piso_hora"));
				e.setSubsidio(rs.getInt("subsidio"));
				e.setNombre_cuartel(rs.getString("nombre_cuartel"));
				e.setDes_faena(rs.getString("des_faena"));
				e.setDes_labor(rs.getString("des_labor"));
				e.setValor(rs.getInt("valor"));
				e.setTipo_trato(rs.getInt("tipo_trato"));
				e.setRendimiento(rs.getFloat("rendimiento"));
				e.setHoras_trabajadas(rs.getFloat("horas_trabajadas"));
				e.setHoras_extras(rs.getFloat("horas_extras"));
				e.setBono1(rs.getInt("bono1"));
				e.setBono2(rs.getInt("bono2"));
				e.setValor_liquido(rs.getFloat("valor_liquido"));
				e.setMaquinaria_desc(rs.getString("maquinaria_desc"));
				e.setImplemento_desc(rs.getString("implemento_desc"));
				e.setMaquinaria(rs.getInt("maquinaria"));
				e.setImplemento(rs.getInt("implemento"));
				e.setBus(rs.getInt("bus"));
				e.setIdContratista(rs.getString("rd_contratista"));
				e.setCeco(rs.getString("ceco"));
				e.setCampo(rs.getString("campo_rd"));
				e.setValor_hx(rs.getFloat("valor_hx"));
				e.setMonto_hx(rs.getFloat("monto_hx"));
				e.setValor_hx_dos(rs.getFloat("valor_hx_dos"));
				e.setHx_dos(rs.getFloat("hx_dos"));
				lista.add(e);
			}
			rs.close();
			ps.close();
			db.conn.close();
		} catch (SQLException e) {
			System.out.println("Error GET_DETALLE_RENDIMIENTO_DIARIO:" + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error GET_DETALLE_RENDIMIENTO_DIARIO:" + e.getMessage());
		} finally {
			db.close();
		}
		return lista;
	}
	public static ArrayList<detalle_rendimiento> GET_DETALLE_RENDIMIENTO_GENERAL (String tipo, String codigorg)throws Exception{
		int codigo = Integer.parseInt(codigorg);
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<detalle_rendimiento> lista = new ArrayList<detalle_rendimiento>();
		ConnectionDB db = new ConnectionDB();
		try {
			sql += 	"SELECT ";
			sql += 		"rd.*, ";
			sql += 		"CONCAT(t.apellidoPaterno, ' ', t.apellidoMaterno, ' ', t.nombre) AS nombre_trabajador, ";
			sql += 		"cl.nombre AS nombre_cuartel, fa.faena AS des_faena, la.labor AS des_labor, m.descripcion AS maquinaria_desc, i.descripcion AS implemento_desc ";
			sql += 	"FROM ";
			sql += 		"cuadrilla c ";
			sql += 		"LEFT JOIN cuadrilla_trabajador ct ON (c.codigo = ct.codigo_cuadrilla) ";
			sql += 		"RIGHT JOIN trabajadores t ON (ct.rut_trabajador = t.rut OR ct.rut_trabajador = t.rutTemporal) ";
			sql += 		"INNER JOIN rendimiento_general rg ON (c.codigo = rg.codigo_cuadrilla) ";
			sql += 		"LEFT JOIN rendimiento_diario rd ON (rg.codigo_rg = rd.codigo_rg AND rd.trabajador = t.id) ";
			sql += 		"LEFT JOIN trabajadores tr ON (tr.id = rg.codigo_supervisor) ";
			sql += 		"LEFT JOIN cuartel cl ON (cl.codigo = rd.cuartel) ";
			sql += 		"LEFT JOIN especie e ON (e.codigo = cl.especie) ";
			sql += 		"LEFT JOIN variedad v ON (v.codigo = cl.variedad) ";
			sql += 		"LEFT JOIN campo cam ON (rg.campo = cam.campo) ";
			sql += 		"LEFT JOIN labor la ON (la.codigo = rd.labor) ";
			sql += 		"JOIN faena fa ON (fa.codigo = la.faena) ";
			sql += 		"LEFT JOIN implemento i ON (i.codigo = rd.implemento) ";
			sql += 		"LEFT JOIN maquinaria m ON (m.codigo = rd.maquinaria) ";
			sql += 	"WHERE ";
			sql += 		"rg.codigo_rg = "+codigorg;
			sql += 		" AND ct.asistencia IN (1 , 5)";
			System.out.println(sql);
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				detalle_rendimiento e = new detalle_rendimiento();
				e.setCodigo(rs.getInt("codigo"));
				e.setTrabajador(rs.getInt("rd.trabajador"));
				e.setNombre_trabajador(rs.getString("nombre_trabajador"));
				e.setBase_piso_hora(rs.getFloat("base_piso_hora"));
				e.setSubsidio(rs.getInt("subsidio"));
				e.setNombre_cuartel(rs.getString("nombre_cuartel"));
				e.setDes_faena(rs.getString("des_faena"));
				e.setDes_labor(rs.getString("des_labor"));
				e.setValor(rs.getInt("valor"));
				e.setTipo_trato(rs.getInt("tipo_trato"));
				e.setRendimiento(rs.getFloat("rendimiento"));
				e.setHoras_trabajadas(rs.getFloat("horas_trabajadas"));
				e.setHoras_extras(rs.getFloat("horas_extras"));
				e.setBono1(rs.getInt("bono1"));
				e.setBono2(rs.getInt("bono2"));
				e.setValor_liquido(rs.getFloat("valor_liquido"));
				e.setMaquinaria_desc(rs.getString("maquinaria_desc"));
				e.setImplemento_desc(rs.getString("implemento_desc"));
				e.setMaquinaria(rs.getInt("maquinaria"));
				e.setImplemento(rs.getInt("implemento"));
				e.setBus(rs.getInt("bus"));
				e.setIdContratista(rs.getString("rd_contratista"));
				e.setCeco(rs.getString("ceco"));
				e.setCampo(rs.getString("campo_rd"));
				e.setValor_hx(rs.getFloat("valor_hx"));
				e.setMonto_hx(rs.getFloat("monto_hx"));
				e.setValor_hx_dos(rs.getFloat("valor_hx_dos"));
				e.setHx_dos(rs.getFloat("hx_dos"));
				lista.add(e);
			}
			rs.close();
			ps.close();
			db.conn.close();
		} catch (SQLException e) {
			System.out.println("Error GET_DETALLE_RENDIMIENTO_DIARIO:" + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error GET_DETALLE_RENDIMIENTO_DIARIO:" + e.getMessage());
		} finally {
			db.close();
		}
		return lista;
	}
			
	public static int ESTADO_PERFIL (int perfil)throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		int estado = 0;
		try {
			sql = "SELECT codigo FROM SAN_CLEMENTE.estado_rendimiento where perfil = " + perfil;
			
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				RENDIMIENTO_DIARIO ob = new RENDIMIENTO_DIARIO();
				estado = rs.getInt("codigo");
			}
			rs.close();
			ps.close();
			db.conn.close();
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error:" + e.getMessage());
		} finally {
			db.close();
		}
		return estado;
	}
			
//-------------FIN VALIDAR RENDIMIENTO-------------
	public static ArrayList<BLOQUEO_LABOR> GET_LABOR_BLOQUEO (String campo, String mes, String especie)throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<BLOQUEO_LABOR> lista = new ArrayList<BLOQUEO_LABOR>();
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "SELECT * FROM bloqueo_labor WHERE id_campo = '"+campo+"' AND "+mes+" = 0 AND id_especie = '"+especie+"';";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				BLOQUEO_LABOR e = new BLOQUEO_LABOR();
				e.setId_campo(rs.getString("id_campo"));
				e.setId_labor(rs.getInt("id_faena"));
				e.setEnero(rs.getInt("enero"));
				e.setFebrero(rs.getInt("febrero"));
				e.setMarzo(rs.getInt("marzo"));
				e.setAbril(rs.getInt("abril"));
				e.setMayo(rs.getInt("mayo"));
				e.setJunio(rs.getInt("junio"));
				e.setJulio(rs.getInt("julio"));
				e.setAgosto(rs.getInt("agosto"));
				e.setSeptiembre(rs.getInt("septiembre"));
				e.setOctubre(rs.getInt("octubre"));
				e.setNoviembre(rs.getInt("noviembre"));
				e.setDiciembre(rs.getInt("diciembre"));
				lista.add(e);
			}
			rs.close();
			ps.close();
			db.conn.close();
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error:" + e.getMessage());
		} finally {
			db.close();
		}
		return lista;
	}	
	public static ArrayList<LABOR> GET_LABOR_ALL()throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<LABOR> lista = new ArrayList<LABOR>();
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "select * from labor where estado = 1";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while (rs.next()){
				LABOR ob = new LABOR();
				ob.setCodigo(rs.getInt("codigo"));
				ob.setFaena(rs.getInt("faena"));
				ob.setLabor(rs.getString("labor"));
				ob.setMaquinaria(rs.getInt("maquinaria"));
				ob.setRebaja(rs.getInt("rebaja"));
				ob.setTipo_labor(rs.getInt("tipo_labor"));
				ob.setEstado(rs.getInt("estado"));
				lista.add(ob);
			}
			rs.close();
			ps.close();
			 db.conn.close();
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch (Exception e){
			System.out.println("Error:" + e.getMessage());
		} finally {
			db.close();
		}
		return lista;
	}
	public static boolean UPDATE_RENDIMIENTO (String tipo, int estado, int codigo_rg)throws Exception{
		System.out.println(estado);
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		try {
			if(tipo.equals("INDIVIDUAL")){
				sql = "UPDATE rendimiento_diario SET estado = "+estado+" WHERE codigo = "+codigo_rg;
				System.out.println(estado);
			}else{
				sql = "UPDATE rendimiento_diario SET estado = "+estado+" WHERE codigo_rg = "+codigo_rg;
			}
			ps = db.conn.prepareStatement(sql);
			ps.execute();
			UPDATE_ESTADO_RENDIMIENTO_GENERAL(estado, codigo_rg);
			return true;
		} catch (SQLException e) {
			System.out.println("Error dfsdfsd:" + e.getMessage());
		} catch  (Exception e){	
			System.out.println("Error:" + e.getMessage());
		} finally {
			ps.close();
			db.close();
		}
		return false;
	}
	public static boolean UPDATE_ESTADO_RENDIMIENTO_GENERAL (int estado, int codigo_rg)throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "UPDATE rendimiento_general SET estado = "+estado+" WHERE codigo_rg = "+codigo_rg;
			ps = db.conn.prepareStatement(sql);
			ps.execute();
			return true;
		} catch (SQLException e) {
			System.out.println("Error tgyhuj:" + e.getMessage());
		} catch  (Exception e){	
			System.out.println("Error:" + e.getMessage());
		} finally {
			ps.close();
			db.close();
		}
		return false;
	}
			
	public static boolean DELETE_CALIFICACION_RD (int codigo_rg)throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "DELETE FROM calificacion_rendimiento WHERE codigo_rg = "+codigo_rg;
			ps = db.conn.prepareStatement(sql);
			ps.execute();
			return true;
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch  (Exception e){	
			System.out.println("Error:" + e.getMessage());
		} finally {
			ps.close();
			db.close();
		}
		return false;
	}
			
	public static boolean calificacion_cuadrilla (int codigo_rg)throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "INSERT INTO calificacion_rendimiento ";
			sql += "SELECT 0 codigo, rd.trabajador,  ";
			sql += "rg.codigo_cuadrilla, rd.codigo_rg,   rd.labor,  s.campo, ";
			sql += "SUM(rd.horas_trabajadas + rd.horas_extras) horas, ";
			sql += "SUM(rd.rendimiento) as rendimiento,   ";
			sql += "SUM(rd.rendimiento) /  SUM(rd.horas_trabajadas + rd.horas_extras) AS promedio, ";
			sql += "(SELECT avg( horas_trabajadas + horas_extras ) FROM rendimiento_diario where codigo_rg = "+codigo_rg+") as promedio_de_horas, ";
			sql += "(SELECT avg( rendimiento ) FROM rendimiento_diario where codigo_rg = "+codigo_rg+" ) / ";
			sql += "(SELECT avg( horas_trabajadas + horas_extras ) FROM rendimiento_diario where codigo_rg = "+codigo_rg+") as promedio_cuadrilla, ";
			sql += "case  ";
			sql += "when  ";
			sql += "((SELECT avg( rendimiento ) FROM rendimiento_diario where codigo_rg = "+codigo_rg+" ) / ";
			sql += "(SELECT avg( horas_trabajadas + horas_extras ) FROM rendimiento_diario where codigo_rg = "+codigo_rg+") * ((100 + cc.bajo_max) / 100)) >  ";
			sql += "( SUM(rd.rendimiento) /  SUM(rd.horas_trabajadas + rd.horas_extras))   ";
			sql += "then 1 ";
			sql += "when  ";
			sql += "((SELECT avg( rendimiento ) FROM rendimiento_diario where codigo_rg = "+codigo_rg+" ) / ";
			sql += "(SELECT avg( horas_trabajadas + horas_extras ) FROM rendimiento_diario where codigo_rg = "+codigo_rg+") * ((100 + cc.bajo_max) / 100)) <=  ";
			sql += "( SUM(rd.rendimiento) /  SUM(rd.horas_trabajadas + rd.horas_extras)) and ((SELECT avg( rendimiento ) FROM rendimiento_diario where codigo_rg = "+codigo_rg+" ) / ";
			sql += "(SELECT avg( horas_trabajadas + horas_extras ) FROM rendimiento_diario where codigo_rg = "+codigo_rg+") * ((100 + cc.promedio_max) / 100)) >  ";
			sql += "( SUM(rd.rendimiento) /  SUM(rd.horas_trabajadas + rd.horas_extras))  ";
			sql += "then 2 ";
			sql += "when  ";
			sql += "((SELECT avg( rendimiento ) FROM rendimiento_diario where codigo_rg = "+codigo_rg+" ) / ";
			sql += "(SELECT avg( horas_trabajadas + horas_extras ) FROM rendimiento_diario where codigo_rg = "+codigo_rg+") * ((100 + cc.promedio_max) / 100)) <=   ";
			sql += "( SUM(rd.rendimiento) /  SUM(rd.horas_trabajadas + rd.horas_extras)) and ((SELECT avg( rendimiento ) FROM rendimiento_diario where codigo_rg = "+codigo_rg+" ) /  ";
			sql += "(SELECT avg( horas_trabajadas + horas_extras ) FROM rendimiento_diario where codigo_rg = "+codigo_rg+") * ((100 + cc.bueno_max) / 100)) >  ";
			sql += "( SUM(rd.rendimiento) /  SUM(rd.horas_trabajadas + rd.horas_extras))  ";
			sql += "then 3 ";
			sql += "when  ";
			sql += "((SELECT avg( rendimiento ) FROM rendimiento_diario where codigo_rg = "+codigo_rg+" ) /  ";
			sql += "(SELECT avg( horas_trabajadas + horas_extras ) FROM rendimiento_diario where codigo_rg = "+codigo_rg+") * ((100 + cc.bueno_max) / 100)) <=  ";
			sql += "( SUM(rd.rendimiento) /  SUM(rd.horas_trabajadas + rd.horas_extras))   ";
			sql += "then 4 ";
			sql += "end nota   ";
			sql += "FROM  rendimiento_diario rd ";
			sql += "left join rendimiento_general rg on rg.codigo_rg = rd.codigo_rg ";
			sql += "left join cuartel c on c.codigo = rd.cuartel ";
			sql += "left join sector s on s.sector = c.sector ";
			sql += "left join calificacion_campo cc on cc.campo = s.campo and cc.labor = rd.labor ";
			sql += "where rd.codigo_rg = "+codigo_rg+" ";
			sql += "and rd.labor in (select labor from calificacion_campo where campo = s.campo) ";
			sql += "group by trabajador,rd.labor,rg.codigo_cuadrilla, s.campo, cc.bajo_max, cc.promedio_max,cc.bueno_max ";
			DELETE_CALIFICACION_RD(codigo_rg);
			ps = db.conn.prepareStatement(sql);
			ps.execute();
			return true;
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch  (Exception e){	
			System.out.println("Error:" + e.getMessage());
		} finally {
			ps.close();
			db.close();
		}
		return false;
	}
			
	public static faena GET_FAENA_LABOR(int codigo, String zona) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		faena e = new faena();
		ConnectionDB db = new ConnectionDB();
		try{
		sql = "SELECT *FROM faena WHERE codigo = (SELECT faena FROM labor WHERE codigo = "+codigo+") AND zona = '"+zona+"'";
		ps = db.conn.prepareStatement(sql);
		ResultSet rs = ps.executeQuery(sql);
		while (rs.next()) {
			e.setCodigo(rs.getInt("codigo"));
			e.setFaena(rs.getString("faena"));
		}
		rs.close();
		ps.close();
		db.conn.close();
		}catch (SQLException ex){
			System.out.println("Erro:" + ex.getMessage());
		}catch (Exception ex){
			System.out.println("Error:" + ex.getMessage());
		}finally {
			db.close();
		}
		return e;
	}
	public static int GET_HORAS_MES(int mes) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		int horas = 0;
		ConnectionDB db = new ConnectionDB();
		try{
			sql = "SELECT getDiasHabiles("+mes+")*9 as horas FROM dual";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			if (rs.next()) {
				horas = rs.getInt("horas");
			}
			rs.close();
			ps.close();
			db.conn.close();
		}catch (SQLException ex){
			System.out.println("Erro:" + ex.getMessage());
		}catch (Exception ex){
			System.out.println("Error:" + ex.getMessage());
		}finally {
			db.close();
		}
		return horas;
	}
	public static RENDIMIENTO_GENERAL GET_RENDIMIENTOS_CODIGO(int codigo) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		RENDIMIENTO_GENERAL e = new RENDIMIENTO_GENERAL();
		ConnectionDB db = new ConnectionDB();
		try{
		sql = "SELECT fecha, codigo_supervisor, cuartel, contratista FROM rendimiento_general WHERE codigo_rg = "+codigo;
		ps = db.conn.prepareStatement(sql);
		ResultSet rs = ps.executeQuery(sql);
		if(rs.next()) {
			e.setFecha(rs.getString("fecha"));
			e.setCodigo_supervisor(rs.getInt("codigo_supervisor"));
			e.setCuartel(rs.getInt("cuartel"));
			e.setContratista(rs.getString("contratista"));
		}
		rs.close();
		ps.close();
		db.conn.close();
		}catch (SQLException ex){
			System.out.println("Erro:" + ex.getMessage());
		}catch (Exception ex){
			System.out.println("Error:" + ex.getMessage());
		}finally {
			db.close();
		}
		return e;
	}
	public static ArrayList<recorrido> GET_RECORRIDO_CAMPO(String campo) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<recorrido> data = new ArrayList<recorrido>();
		ConnectionDB db = new ConnectionDB();
		try{
			sql = "SELECT *FROM recorrido WHERE campo = '"+campo+"'";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while (rs.next()) {
				recorrido e = new recorrido();
				e.setId_recorrido(rs.getInt("id_recorrido"));
				e.setCampo(rs.getString("campo"));
				e.setDetalle(rs.getString("detalle"));
				e.setChofer(rs.getString("chofer"));
				e.setTipo_vehiculo(rs.getString("tipo_vehiculo"));
				e.setPatente(rs.getString("patente"));
				e.setOrigen(rs.getString("origen"));
				e.setDestino(rs.getString("destino"));
				e.setResponsable(rs.getString("responsable"));
				e.setCantidad_persona(rs.getInt("cantidad_persona"));
				e.setHorario_salida(rs.getString("horario_salida"));
				e.setHorario_llegada(rs.getString("horario_llegada"));
				data.add(e);
			}
			rs.close();
			ps.close();
			db.conn.close();
		}catch (SQLException ex){
			System.out.println("Erro:" + ex.getMessage());
		}catch (Exception ex){
			System.out.println("Error:" + ex.getMessage());
		}finally {
			db.close();
		}
		return data;
	}
	
	public static ArrayList<RENDIMIENTO_DIARIO> GET_ListRendContratista(String CAMPO, String CONTRATISTA, String DESDE, String HASTA) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<RENDIMIENTO_DIARIO> data = new ArrayList<RENDIMIENTO_DIARIO>();
		ConnectionDB db = new ConnectionDB();
		try{
			sql += 	"SELECT ";
			sql += 		"rd.codigo, cam.descripcion AS campo, rg.contratista, ";
			sql += 		"CASE ";
			sql += 			"WHEN rg.fecha IS NULL THEN rd.fecha_i ";
			sql += 			"ELSE rg.fecha ";
			sql += 		"END fecha_rendimiento, ";
			sql += 		"CONCAT(trS.nombre, ' ', trS.apellidoPaterno) AS supervisor, ";
			sql += 		"CONCAT(tr.nombre, ' ', tr.apellidoPaterno) AS trabajador, ";
			sql += 		"CONCAT(c.codigo_cuartel, ' ', c.nombre) AS cuartel,";
			sql += 		"rd.ceco, rd.ordenco, rd.macroco, tr.rut AS rut_trabajador, rd.rendimiento,";
			sql += 		"rd.valor_liquido, es.especie nespecie, var.variedad nvariedad, fa.faena nfaena, ";
			sql += 		"lab.labor nlabor, rd.rd_contratista, rd.bono1, rd.valor_rendimietno, rd.tipo_trato ";
			sql += 	"FROM ";
			sql += 		"rendimiento_diario rd ";
			sql += 		"LEFT JOIN rendimiento_general rg ON (rd.codigo_rg = rg.codigo_rg) ";
			sql += 		"LEFT JOIN trabajadores tr ON (tr.id = rd.trabajador) ";
			sql += 		"LEFT JOIN trabajadores trS ON (trS.id = rg.codigo_supervisor OR trS.id = rd.supervisor_i)";
			sql += 		"LEFT JOIN cuartel c ON (c.codigo = rd.cuartel) ";
			sql += 		"LEFT JOIN sector s ON (s.sector = c.sector) ";
			sql += 		"LEFT JOIN campo cam ON (cam.campo = rd.campo_rd OR cam.campo = rg.campo) ";
			sql += 		"LEFT JOIN especie es ON (es.codigo = c.especie) ";
			sql += 		"LEFT JOIN variedad var ON (var.codigo = c.variedad) ";
			sql += 		"LEFT JOIN labor lab ON (lab.codigo = rd.labor) ";
			sql += 		"LEFT JOIN faena fa ON (fa.codigo = lab.faena) ";
			sql += 	"WHERE ";
			sql += 		"(rg.fecha BETWEEN '"+DESDE+"' AND '"+HASTA+"' OR (rd.fecha_i BETWEEN '"+DESDE+"' AND '"+HASTA+"')) ";
			sql += 		"AND (rd.campo_rd = '"+CAMPO+"' OR rg.campo = '"+CAMPO+"') ";
			sql += 		"AND rd.rd_contratista = '"+CONTRATISTA+"' ";
			sql += 		"AND rd.estado = 3 ";
			sql += 		"AND rd.codigo NOT IN (SELECT  lr.codigo_rd ";
			sql += 			"FROM liquidacion_contratista lc ";
			sql += 				"JOIN ";
			sql += 				"liquidacion_rendimiento lr ON (lr.codigo_liq = lc.codigo) ";
			sql += 			"WHERE ";
			sql += 				"lc.contratista = '"+CONTRATISTA+"') ";
			sql += 	"ORDER BY rg.fecha ASC;";
			System.out.println(sql);
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while (rs.next()) {
				RENDIMIENTO_DIARIO e = new RENDIMIENTO_DIARIO();
				e.setCodigo(rs.getInt("codigo"));
				//e.setCampo(rs.getString("campo"));
				e.setNvnombre(rs.getString("cuartel"));
				e.setFecha(rs.getString("fecha_rendimiento"));
				e.setIdContratista(rs.getString("rd_contratista"));
				e.setSupervisor(rs.getString("supervisor"));		
				e.setNombre(rs.getString("trabajador"));
				e.setRut(rs.getString("rut_trabajador"));
				//e.setValor(rs.getInt("valor"));
				e.setValor_rendimiento(rs.getFloat("valor_rendimietno"));
				e.setRendimiento(rs.getFloat("rendimiento"));
				e.setTipo_pago(rs.getInt("tipo_trato"));
				e.setValor_liquido(rs.getFloat("valor_liquido"));
				e.setBono1(rs.getInt("bono1"));
				e.setnVariedad(rs.getString("nvariedad"));
				e.setnEspecie(rs.getString("nespecie"));
				e.setnFaena(rs.getString("nfaena"));
				e.setnLabor(rs.getString("nlabor"));
				e.setCeco(rs.getString("ceco"));
				e.setOrdenco(rs.getString("ordenco"));
				e.setMacroco(rs.getString("macroco"));
				data.add(e);
			}
			rs.close();
			ps.close();
			db.conn.close();
		}catch (SQLException ex){
			System.out.println("Erro:" + ex.getMessage());
		}catch (Exception ex){
			System.out.println("Error:" + ex.getMessage());
		}finally {
			db.close();
		}
		return data;
	}
	
	public static int GENERAR_LIQUIDACION (LIQUIDACION c)throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "INSERT INTO liquidacion_contratista ( contratista, fecha,"
					+ " usuario, campo, estado,fecha_desde,fecha_hasta, estado_liquidacion, semanas)";
			sql += "VALUES (?,NOW(),?,?,1,?,?, 1, ?)";
			ps = db.conn.prepareStatement(sql);
			ps.setString(1, c.getContratista());
			ps.setString(2, c.getUsuario());
			ps.setString(3, c.getCampo());
			ps.setString(4, c.getFecha_desde());
			ps.setString(5, c.getFecha_hasta());
			ps.setString(6, c.getSemanas());
			ps.execute();
			
			String sql2 = "";
			sql2 = "SELECT MAX(codigo) as codigo from liquidacion_contratista";
			ResultSet idNew = ps.executeQuery(sql2);
			int codCont = 0;
			while (idNew.next()) { 
				codCont = idNew.getInt("codigo"); 
			}
			String sql3 = "";
			for(String id: c.getRendimientos()){
				sql3 = "INSERT INTO liquidacion_rendimiento (codigo_rd,codigo_liq) values ('"+id+"','"+codCont+"')";
				ps = db.conn.prepareStatement(sql3);
				ps.execute();
			}
			return codCont;
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch  (Exception e){	
			System.out.println("Error:" + e.getMessage());
		} finally {
			ps.close();
			db.conn.close();
		}
		return 0;
	}
	
	public static ArrayList<LIQUIDACION> GET_LIQUIDACION(LIQUIDACION liq) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<LIQUIDACION> data = new ArrayList<LIQUIDACION>();
		ConnectionDB db = new ConnectionDB();
		try{
		sql = "select lc.*, cam.descripcion ncampo , le.descripcion nestado , SUM(rd.valor_liquido) "
				+ "valor_liquido, cam.sociedad, lc.orden_pago from liquidacion_contratista lc "
				+ "left join liquidacion_rendimiento lr on lr.codigo_liq = lc.codigo "
				+ "left join rendimiento_diario rd on rd.codigo = lr.codigo_rd "
				+ "left join campo cam on cam.campo = lc.campo "
				+ "left join (SELECT * FROM SAN_CLEMENTE.parametros where codigo = 'ESTADO_LIQUIDACION')  le "
				+ "on le.llave = lc.estado "
				+ "where contratista = '"+liq.getContratista()+"' "
				+ "and fecha between '"+liq.getFecha_desde()+"' and '"+liq.getFecha_hasta()+"' "
				+ "and lc.campo = '"+liq.getCampo()+"' "
				+ "AND lc.estado_liquidacion = "+liq.getCodigo()
				+ " GROUP BY lc.codigo,  cam.descripcion, le.descripcion, cam.sociedad, lc.orden_pago";
		
		ps = db.conn.prepareStatement(sql);
		ResultSet rs = ps.executeQuery(sql);
		while (rs.next()) {
			LIQUIDACION e = new LIQUIDACION();
			e.setCodigo(rs.getInt("codigo"));
			e.setFecha(rs.getString("fecha"));
			e.setContratista(rs.getString("contratista"));
			e.setValor_liquido(rs.getInt("valor_liquido"));
			e.setEstado(rs.getString("nestado"));
			e.setCampo(rs.getString("ncampo"));
			e.setSociedad(rs.getString("sociedad"));
			e.setOrden(rs.getString("orden_pago"));
			e.setN_factura(rs.getString("n_factura"));
			e.setSemanas(rs.getString("semanas"));
			e.setValor_retencion(rs.getInt("valor_retencion"));
			e.setAsiento_contable(rs.getString("asiento"));
			data.add(e);
		}
		rs.close();
		ps.close();
		db.conn.close();
		}catch (SQLException ex){
			System.out.println("Erro:" + ex.getMessage());
		}catch (Exception ex){
			System.out.println("Error:" + ex.getMessage());
		}finally {
			db.close();
		}
		return data;
	}
	public static RENDIMIENTO_DIARIO GET_RD_INDIVIDUAL (int codigo_rd)throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		RENDIMIENTO_DIARIO e = new RENDIMIENTO_DIARIO();
		ConnectionDB db = new ConnectionDB();
		try {
			sql = 	"SELECT rd.*, ";
			sql += 	"CASE ";
			sql += 		"WHEN(rd.ceco IS NULL OR rd.ceco = '') THEN rd.ordenco ";
			sql += 		"ELSE rd.ceco ";
			sql += 	"END AS rdceco, ";
			sql += 	"f.codigo AS faena, cam.campo, c.especie, c.variedad, CONCAT(t.rut, ' | ', t.nombre, ' ',t.apellidoPaterno) AS nombreTrabajador ";
			sql	+= 	"FROM rendimiento_diario rd ";
			sql	+= 	"LEFT JOIN trabajadores t ON (t.id = rd.trabajador) ";
			sql	+= 	"LEFT JOIN cuartel c ON(c.codigo = rd.cuartel) ";
			sql	+= 	"LEFT JOIN sector s ON (c.sector = s.sector) ";
			sql	+= 	"LEFT JOIN campo cam ON (cam.campo = s.campo OR cam.campo = rd.campo_rd) ";
			sql	+= 	"LEFT JOIN variedad v ON (v.codigo = c.variedad) ";
			sql	+= 	"LEFT JOIN especie e ON (e.codigo = c.especie) ";
			sql	+= 	"LEFT JOIN labor l ON (l.codigo = rd.labor) ";
			sql	+= 	"JOIN faena f ON (f.codigo = l.faena) ";
			sql	+= 	"WHERE rd.codigo = "+codigo_rd;
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			if(rs.next()){
				e.setCodigo(rs.getInt("codigo"));
				e.setTrabajador(rs.getInt("trabajador"));
				e.setBase_piso_hora(rs.getInt("base_piso_hora"));
				e.setCuartel(rs.getInt("cuartel"));
				e.setLabor(rs.getInt("labor"));
				e.setValor(rs.getInt("valor"));
				e.setTipo_trato(rs.getInt("tipo_trato"));
				e.setRendimiento(rs.getFloat("rendimiento"));
				e.setValor_rendimiento(rs.getFloat("valor_rendimietno"));
				e.setHoras_trabajadas(rs.getFloat("horas_trabajadas"));
				e.setHoras_extras(rs.getFloat("horas_extras"));
				e.setBono1(rs.getInt("bono1"));
				e.setBono2(rs.getInt("bono2"));
				e.setValor_liquido(rs.getFloat("valor_liquido"));
				e.setMaquinaria(rs.getInt("maquinaria"));
				e.setImplemento(rs.getInt("implemento"));
				e.setBus(rs.getInt("bus"));
				e.setFecha(rs.getString("fecha_i"));
				e.setSupervisor_i(rs.getInt("supervisor_i"));
				e.setFaena(rs.getInt("faena"));
				e.setNombre(rs.getString("campo"));
				e.setEspecie(rs.getInt("especie"));
				e.setVariedad(rs.getInt("variedad"));
				e.setNvnombre(rs.getString("nombreTrabajador").toUpperCase());
				e.setBaseCargo(rs.getString("base_cargo"));
				e.setIdContratista(rs.getString("rd_contratista"));
				e.setCeco(rs.getString("rdceco"));
				e.setN_personas(rs.getInt("n_personas"));
				e.setValor_hx(rs.getFloat("valor_hx"));
				e.setMonto_hx(rs.getFloat("monto_hx"));
				e.setValor_hx_dos(rs.getFloat("valor_hx_dos"));
				e.setHx_dos(rs.getFloat("hx_dos"));
				e.setEstado(rs.getInt("estado"));
				e.setMacroco(rs.getString("macroco"));
				e.setHoras_totales(rs.getFloat("horas_totales"));
				e.setRes_hx(rs.getInt("res_hx"));
			}
			rs.close();
			ps.close();
			db.conn.close();
		} catch (SQLException ex) {
			System.out.println("Error:" + ex.getMessage());
		} catch (Exception ex) {
			System.out.println("Error:" + ex.getMessage());
		} finally {
			db.close();
		}
		return e;
	}
	public static RENDIMIENTO_DIARIO GET_RD_INDIVIDUAL_RG (int codigo_rd, int codigo_rg)throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		RENDIMIENTO_DIARIO e = new RENDIMIENTO_DIARIO();
		ConnectionDB db = new ConnectionDB();
		try {
			sql += 	"SELECT ";
			sql += 		"rd.*, f.codigo AS faena, cam.campo, c.especie, c.variedad, rg.fecha, rg.codigo_supervisor, ";
			sql += 		"CONCAT(trs.rut, ' | ', trs.nombre, ' ', trs.apellidoPaterno) AS nombreTrabajador ";
			sql	+= 	"FROM rendimiento_diario rd ";
			sql	+= 		"LEFT JOIN rendimiento_general rg ON(rd.codigo_rg = rg.codigo_rg) ";
			sql	+= 		"LEFT JOIN labor l ON(l.codigo = rd.labor) ";
			sql	+= 		"LEFT JOIN faena f ON(l.faena = f.codigo) ";
			sql	+= 		"LEFT JOIN trabajadores t ON(t.id = rd.supervisor_i) ";
			sql	+= 		"LEFT JOIN trabajadores trs ON(trs.id = rd.trabajador) ";
			sql	+= 		"LEFT JOIN campo cam ON(cam.campo = rd.campo_rd OR cam.campo = rg.campo) ";
			sql	+= 		"LEFT JOIN cuartel c ON(c.codigo = rd.cuartel) ";
			sql	+= 		"LEFT JOIN especie e ON(e.codigo = c.especie) ";
			sql	+= 		"LEFT JOIN variedad v ON(v.codigo = c.variedad) ";
			sql	+= 	"WHERE rd.codigo = "+codigo_rd+" AND rg.codigo_rg = "+codigo_rg;
			System.out.println(sql);
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			if(rs.next()){
				e.setCodigo(rs.getInt("codigo"));
				e.setTrabajador(rs.getInt("trabajador"));
				e.setBase_piso_hora(rs.getInt("base_piso_hora"));
				e.setCuartel(rs.getInt("cuartel"));
				e.setLabor(rs.getInt("labor"));
				e.setValor(rs.getInt("valor"));
				e.setTipo_trato(rs.getInt("tipo_trato"));
				e.setRendimiento(rs.getFloat("rendimiento"));
				e.setValor_rendimiento(rs.getFloat("valor_rendimietno"));
				e.setHoras_trabajadas(rs.getFloat("horas_trabajadas"));
				e.setHoras_extras(rs.getFloat("horas_extras"));
				e.setBono1(rs.getInt("bono1"));
				e.setBono2(rs.getInt("bono2"));
				e.setValor_liquido(rs.getFloat("valor_liquido"));
				e.setMaquinaria(rs.getInt("maquinaria"));
				e.setImplemento(rs.getInt("implemento"));
				e.setBus(rs.getInt("bus"));
				e.setFecha(rs.getString("fecha"));
				e.setSupervisor_i(rs.getInt("supervisor_i"));
				e.setFaena(rs.getInt("faena"));
				e.setNombre(rs.getString("campo"));
				e.setEspecie(rs.getInt("especie"));
				e.setVariedad(rs.getInt("variedad"));
				e.setNvnombre(rs.getString("nombreTrabajador").toUpperCase());
				e.setBaseCargo(rs.getString("base_cargo"));
				e.setIdContratista(rs.getString("rd_contratista"));
				e.setValor(rs.getInt("valor"));
				e.setSupervisor(rs.getString("codigo_supervisor"));
				e.setN_personas(rs.getInt("n_personas"));
				e.setValor_hx(rs.getFloat("valor_hx"));
				e.setMonto_hx(rs.getFloat("monto_hx"));
				e.setValor_hx_dos(rs.getFloat("valor_hx_dos"));
				e.setHx_dos(rs.getFloat("hx_dos"));
				e.setMacroco(rs.getString("macroco"));
				e.setCeco(rs.getString("ceco"));
				e.setOrdenco(rs.getString("ordenco"));
				e.setEstado(rs.getInt("estado"));
			}
			rs.close();
			ps.close();
			db.conn.close();
		} catch (SQLException ex) {
			System.out.println("Error:" + ex.getMessage());
		} catch (Exception ex) {
			System.out.println("Error:" + ex.getMessage());
		} finally {
			db.close();
		}
		return e;
	}
	public static CUADRILLA GET_RENDIMIENTOS_GENERALES (int codigo_rg)throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		CUADRILLA CU = new CUADRILLA();
		ConnectionDB db = new ConnectionDB();
		try {
			sql += 	"SELECT ";
			sql += 		"rg.*, e.especie AS n_especie, v.variedad AS n_variedad, c.nombre AS nombreCuartel, f.faena AS nombreFaena, l.labor AS nombreLabor, tr.id, 	";
			sql += 		"CONCAT(tr.apellidoPaterno, ' ', tr.apellidoMaterno, ' ', tr.nombre) AS trabajador, ";
			sql += 		"tr.rut, tr.codigo ";
			sql += 	"FROM rendimiento_general rg ";
			sql += 		"LEFT JOIN cuadrilla_trabajador ct ON (rg.codigo_cuadrilla = ct.codigo_cuadrilla) ";
			sql += 		"LEFT JOIN trabajadores tr ON (tr.rut = ct.rut_trabajador OR tr.rutTemporal = ct.rut_trabajador) ";
			sql += 		"LEFT JOIN cuartel c ON (c.codigo = rg.cuartel) ";
			sql += 		"LEFT JOIN especie e ON (e.codigo = c.especie) ";
			sql += 		"LEFT JOIN variedad v ON (v.codigo = c.variedad) ";
			sql += 		"LEFT JOIN labor l ON (l.codigo = rg.labor) ";
			sql += 		"LEFT JOIN faena f ON (f.codigo = l.faena) ";
			sql += 	"WHERE ";
			sql += 		"rg.codigo_rg = "+codigo_rg+" ";
			sql += 		"AND ct.asistencia IN (1 , 4) ";
			sql += 		"AND contratista IS NULL;";
			ps = db.conn.prepareStatement(sql);
			System.out.println(sql);
			ResultSet rs = ps.executeQuery(sql);
			ArrayList<TrabajadoresAgro> trabajador = new ArrayList<TrabajadoresAgro>();
			ArrayList<RENDIMIENTO_GENERAL> rendimiento_general = new ArrayList<RENDIMIENTO_GENERAL>();
			int count = 1;
			while(rs.next()){
				TrabajadoresAgro tr = new TrabajadoresAgro();
				RENDIMIENTO_GENERAL rg = new RENDIMIENTO_GENERAL();
				if (count == 1){
					CU.setCodigo(rs.getInt("codigo_rg"));	
//					CU.setNombre_cuadrilla(rs.getString("nombre_cuadrilla"));
//					CU.setSupervisor(rs.getInt("supervisor"));
//					CU.setFecha_creacion(rs.getString("fecha_creacion"));
//					CU.setEstado(rs.getInt("estado"));
					rg.setCodigo(rs.getInt("codigo_rg"));
					rg.setFecha(rs.getString("fecha"));
					rg.setEspecie(rs.getInt("especie"));
					rg.setVariedad(rs.getInt("variedad"));
					rg.setCuartel(rs.getInt("cuartel"));
					rg.setFaena(rs.getInt("faena"));
					rg.setLabor(rs.getInt("labor"));
					rg.setHoras(rs.getFloat("horas"));
					rg.setTipo_pago(rs.getInt("tipo_pago"));
					rg.setCodigo_cuadrilla(rs.getInt("codigo_cuadrilla"));
					rg.setCodigo_supervisor(rs.getInt("codigo_supervisor"));
					rg.setNespecie(rs.getString("n_especie"));
					rg.setNvariedad(rs.getString("n_variedad"));
					rg.setNcuartel(rs.getString("nombreCuartel"));
					rg.setNfaena(rs.getString("nombreFaena"));
					rg.setNlabor(rs.getString("nombreLabor"));
					rg.setCampo(rs.getString("campo"));
					rg.setValor(rs.getInt("valor"));
					rg.setBase_piso_dia(rs.getInt("base_piso_dia"));
					rg.setMacro(rs.getString("macro"));
					rg.setCeco(rs.getString("ceco"));
					rg.setOrdenco(rs.getString("ordenco"));
					rendimiento_general.add(rg);
				}
				tr.setCodigo(rs.getString("codigo"));
				tr.setIdTrabajador(rs.getInt("id"));
				tr.setNombre(rs.getString("trabajador"));
				tr.setRut(rs.getString("rut"));
				trabajador.add(tr);
				count ++;	
			}
			CU.setTrab(trabajador);
			CU.setRendimiento_general(rendimiento_general);
			rs.close();
			ps.close();
			db.conn.close();
		} catch (SQLException e) {
			System.out.println("Error    :" + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error:" + e.getMessage());
		} finally {
			db.close();
		}
		return CU;
	}
	public static boolean ORDEN_PAGO (String codigo, String orden, String n_factura, int valor_retencion)throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		try {
			sql  = 	"UPDATE liquidacion_contratista ";
			sql += 	"SET orden_pago = "+orden+", estado = 3, estado_liquidacion = 2, n_factura = '"+n_factura+"', valor_retencion = "+valor_retencion+" ";
			sql += 	"WHERE codigo ="+codigo;
			ps = db.conn.prepareStatement(sql);
			ps.execute();
			return true;
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch  (Exception e){	
			System.out.println("Error:" + e.getMessage());
		} finally {
			ps.close();
			db.conn.close();
		}
		return false;
	}
	
	public static boolean RECHAZAR (String codigo)throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "UPDATE liquidacion_contratista SET estado = 2 where codigo ="+codigo;
			ps = db.conn.prepareStatement(sql);
			ps.execute();
			DELETE_LIQUIDACION_RENDIMIENTO(codigo);
			return true;
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch  (Exception e){	
			System.out.println("Error:" + e.getMessage());
		} finally {
			ps.close();
			db.conn.close();
		}
		return false;
	}
	
	public static boolean DELETE_LIQUIDACION_RENDIMIENTO (String codigo)throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "DELETE from liquidacion_rendimiento where codigo_liq = "+codigo;
			ps = db.conn.prepareStatement(sql);
			ps.execute();
			return true;
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch  (Exception e){	
			System.out.println("Error:" + e.getMessage());
		} finally {
			ps.close();
			db.conn.close();
		}
		return false;
	}
	public static ArrayList<RENDIMIENTO_DIARIO> GREN_CON_BY_ID(int codigo_rd) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<RENDIMIENTO_DIARIO> data = new ArrayList<RENDIMIENTO_DIARIO>();
		ConnectionDB db = new ConnectionDB();
		try{
			sql = 	"SELECT rd.codigo, cam.descripcion campo, ";
			sql += 	"CASE ";
			sql += 		"WHEN rg.fecha IS NULL THEN rd.fecha_i ";
			sql += 		"ELSE rg.fecha ";
			sql += 	"END fecha_rendimiento, ";
			sql += 	"rg.contratista, CONCAT(trS.nombre, ' ', trS.apellidoPaterno) supervisor, CONCAT(tr.nombre, ' ', tr.apellidoPaterno) trabajador, ";
			sql += 	"tr.rut rut_trabajador, rd.rendimiento, rd.valor_liquido, es.especie nespecie, var.variedad nvariedad, ";
			sql += 	"fa.faena nfaena, lab.labor nlabor, rd.rd_contratista, rd.bono1, rd.valor_rendimietno, rd.tipo_trato, ";
			sql += 	"CAST((rd.valor_rendimietno/rd.rendimiento)AS DECIMAL(18,3)) AS valor_x_rend, ";
			sql += 	"getValorLiquidacion("+codigo_rd+") AS totalLiquidacion, ";
			sql += 	"CAST((getValorLiquidacion("+codigo_rd+") * (0.19))AS SIGNED) AS iva, ";
			sql += 	"CAST((getValorLiquidacion("+codigo_rd+") * (0.19))+getValorLiquidacion("+codigo_rd+") AS SIGNED) AS total_liquido ";
			sql += 	"FROM rendimiento_diario rd ";
			sql += 		"LEFT JOIN rendimiento_general rg ON (rd.codigo_rg = rg.codigo_rg) ";
			sql += 		"LEFT JOIN trabajadores tr ON (tr.id = rd.trabajador)";
			sql += 		"LEFT JOIN trabajadores trS ON (trS.id = rg.codigo_supervisor OR trS.id = rd.supervisor_i) ";
			sql += 		"LEFT JOIN cuartel c ON (c.codigo = rd.cuartel) ";
			sql += 		"LEFT JOIN sector s ON (s.sector = c.sector) ";
			sql += 		"LEFT JOIN campo cam ON (cam.campo = s.campo OR cam.campo = rd.campo_rd OR cam.campo = rg.campo) ";
			sql += 		"LEFT JOIN especie es ON (es.codigo = c.especie) ";
			sql += 		"LEFT JOIN variedad var ON (var.codigo = c.variedad) ";
			sql += 		"LEFT JOIN labor lab ON (lab.codigo = rd.labor) ";
			sql += 		"LEFT JOIN faena fa ON (fa.codigo = lab.faena) ";
			sql += 	"WHERE ";
			sql += 		"rd.codigo IN (SELECT codigo_rd FROM liquidacion_rendimiento WHERE codigo_liq = "+codigo_rd+") ";
			sql += 		"AND rd.estado = 3 ";
			sql += 	"ORDER BY rg.fecha ASC;";
			System.out.println(sql);
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while (rs.next()) {
				RENDIMIENTO_DIARIO e = new RENDIMIENTO_DIARIO();
				e.setCodigo(rs.getInt("codigo"));
				e.setCampo(rs.getString("campo"));
				e.setFecha(rs.getString("fecha_rendimiento"));
				e.setIdContratista(rs.getString("rd_contratista"));
				e.setSupervisor(rs.getString("supervisor"));		
				e.setNombre(rs.getString("trabajador"));
				e.setRut(rs.getString("rut_trabajador"));
				e.setValor_rendimiento(rs.getFloat("valor_rendimietno"));
				e.setRendimiento(rs.getFloat("rendimiento"));
				e.setTipo_pago(rs.getInt("tipo_trato"));
				e.setValor_liquido(rs.getFloat("valor_liquido"));
				e.setBono1(rs.getInt("bono1"));
				e.setnVariedad(rs.getString("nvariedad"));
				e.setnEspecie(rs.getString("nespecie"));
				e.setnFaena(rs.getString("nfaena"));
				e.setnLabor(rs.getString("nlabor"));
				e.setValor_trato(rs.getFloat("valor_x_rend"));
				e.setTotalLiquidacion(rs.getFloat("totalLiquidacion"));
				e.setIva(rs.getInt("iva"));
				e.setTotal_liquido(rs.getInt("total_liquido"));
				data.add(e);
			}
			rs.close();
			ps.close();
			db.conn.close();
		}catch (SQLException ex){
			System.out.println("Erro:" + ex.getMessage());
		}catch (Exception ex){
			System.out.println("Error:" + ex.getMessage());
		}finally {
			db.close();
		}
		return data;
	}

	public static boolean DELETE_RENDIMIENTO_LIQUIDACION (int codigo)throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "DELETE from liquidacion_rendimiento where codigo_rd = "+codigo;
			ps = db.conn.prepareStatement(sql);
			ps.execute();
			return true;
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch  (Exception e){	
			System.out.println("Error:" + e.getMessage());
		} finally {
			ps.close();
			db.conn.close();
		}
		return false;
	}
	public static boolean UPD_RENDIMIENTO_LIQUIDACION (int codigo, int n_factura)throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "UPDATE liquidacion_contratista SET n_factura = '"+n_factura+"' where codigo ="+codigo;
			ps = db.conn.prepareStatement(sql);
			ps.execute();
			return true;
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch  (Exception e){	
			System.out.println("Error:" + e.getMessage());
		} finally {
			ps.close();
			db.conn.close();
		}
		return false;
	}
	public static ArrayList<RENDIMIENTO_DIARIO> GET_DETALLE_HX_SEMANA (int trabajador, String fecha)throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<RENDIMIENTO_DIARIO> data = new ArrayList<RENDIMIENTO_DIARIO>();
		ConnectionDB db = new ConnectionDB();
		try {
			sql = 	"SELECT SUM(rd.horas_extras)AS hx_dia, ";
			sql	+= 		"CASE ";
			sql	+= 			"WHEN (rd.fecha_i IS NULL) THEN rg.fecha ";
			sql	+= 			"ELSE rd.fecha_i ";
			sql	+= 		"END AS fecha, ";
			sql	+= 		"CASE ";
			sql	+= 			"WHEN (rd.fecha_i IS NULL) THEN DAYOFWEEK(rg.fecha) ";
			sql	+= 			"ELSE DAYOFWEEK(rd.fecha_i) ";
			sql	+= 		"END AS dia ";
			sql	+= 	"FROM rendimiento_diario rd ";
			sql	+= 	"LEFT JOIN rendimiento_general rg ON(rg.codigo_rg = rd.codigo_rg) ";
			sql	+= 	"WHERE (YEARWEEK(rd.fecha_i) = YEARWEEK('"+fecha+"') OR YEARWEEK(rg.fecha) = YEARWEEK('"+fecha+"')) ";
			sql	+= 	"AND rd.trabajador = "+trabajador+" ";
			sql	+= 	"GROUP BY 2, 3 ORDER BY 2";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			for(int i = 1; i < 8; i++){
				RENDIMIENTO_DIARIO e = new RENDIMIENTO_DIARIO();
				e.setCodigo(i);
				data.add(e);
			}
			while(rs.next()){
				data.get(rs.getInt("dia")-1).setCodigo(rs.getInt("dia"));
				data.get(rs.getInt("dia")-1).setFecha(rs.getString("fecha"));
				data.get(rs.getInt("dia")-1).setHoras_extras(rs.getFloat("hx_dia"));
			}
			rs.close();
			ps.close();
			db.conn.close();
		} catch (SQLException ex) {
			System.out.println("Error:" + ex.getMessage());
		} catch (Exception ex) {
			System.out.println("Error:" + ex.getMessage());
		} finally {
			db.close();
		}
		return data;
	}
	public static ArrayList<RENDIMIENTO_GENERAL> GET_RENDIMIENTOS_VALIDADOS (String campo, String fecha_desde, String fecha_hasta, String tipo)throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<RENDIMIENTO_GENERAL> lista = new ArrayList<RENDIMIENTO_GENERAL>();
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "SELECT rg.codigo_rg, rg.fecha, cam.campo as codigoCampo, cam.descripcion AS campo, t.nombre AS supervisor, cd.nombre_cuadrilla, fa.faena, la.labor, rg.horas, rg.tipo_pago, rg.folio, rg.contratista, e.especie, v.variedad, c.nombre ";
			sql	+= "FROM rendimiento_general rg ";
			sql	+= "LEFT JOIN cuartel c ON(c.codigo = rg.cuartel) ";
			sql	+= "RIGHT JOIN sector s ON(s.sector = c.sector) ";
			sql	+= "RIGHT JOIN campo cam ON(cam.campo = s.campo) ";
			sql	+= "JOIN trabajadores t ON(t.id = rg.codigo_supervisor) ";
			sql	+= "JOIN cuadrilla cd ON(cd.codigo = rg.codigo_cuadrilla) ";
			sql	+= "JOIN faena fa ON(fa.codigo = rg.faena) ";
			sql	+= "JOIN labor la ON(la.codigo = rg.labor) ";
			sql	+= "JOIN especie e ON(e.codigo = rg.especie) ";
			sql	+= "JOIN variedad v ON(v.codigo = rg.variedad) ";
			// " left join rendimiento_diario rd on rd.codigo_rg = rg.codigo_rg " +
			sql	+= "WHERE rg.fecha BETWEEN '"+fecha_desde+"' AND '"+fecha_hasta+"' AND cam.campo = '"+campo+"' AND rg.estado = 3 ";
			if(tipo.equals("PLANTA")){
				sql += "AND rg.contratista IS NULL";
			}else{
				sql += "AND rg.contratista IS NOT NULL";
			}
			ps = db.conn.prepareStatement(sql);
			System.out.println(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				RENDIMIENTO_GENERAL ob = new RENDIMIENTO_GENERAL();
				ob.setCodigo(rs.getInt("codigo_rg"));
				ob.setFecha(rs.getString("fecha"));
				ob.setCampo(rs.getString("campo"));
				ob.setNsupervisor(rs.getString("supervisor"));
				ob.setNcuadrilla(rs.getString("nombre_cuadrilla"));
				ob.setNlabor(rs.getString("labor"));
				ob.setHoras(rs.getInt("horas"));
				ob.setTipo_pago(rs.getInt("tipo_pago"));
				ob.setNespecie(rs.getString("especie"));
				ob.setNvariedad(rs.getString("variedad"));
				ob.setNfaena(rs.getString("faena"));
				ob.setNcuartel(rs.getString("nombre"));
				ob.setFolio(rs.getInt("folio"));
				ob.setContratista(rs.getString("contratista"));
				lista.add(ob);
			}
			rs.close();
			ps.close();
			db.conn.close();
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error:" + e.getMessage());
		} finally {
			db.close();
		}
		return lista;
	}
	public static ArrayList<RENDIMIENTO_GENERAL> GET_RENDIMIENTOS_VALIDADOS_INDIVIDUAL (String campo, String fecha_desde, String fecha_hasta, String tipo)throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<RENDIMIENTO_GENERAL> lista = new ArrayList<RENDIMIENTO_GENERAL>();
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "SELECT rd.codigo AS codigo_rg, rd.fecha_i, cam.descripcion, CONCAT(t.apellidoPaterno, ' ', t.apellidoMaterno, ' ', t.nombre) AS supervisor, CONCAT(trs.apellidoPaterno,' ',trs.apellidoMaterno,' ',trs.nombre) AS trabajador, f.faena, l.labor, rd.horas_trabajadas, "
					+ "rd.tipo_trato, e.especie, v.variedad, c.nombre, rd.ceco, CONCAT(t.apellidoPaterno, ' ', t.apellidoMaterno, ' ', t.nombre) nombreTrabajador ";
			sql	+= "FROM rendimiento_diario rd ";
			sql	+= "LEFT JOIN trabajadores t ON (t.id = rd.supervisor_i) ";
			sql	+= "JOIN trabajadores trs ON (trs.id = rd.trabajador) ";
			sql	+= "JOIN labor l ON (l.codigo = rd.labor) ";
			sql	+= "LEFT JOIN faena f ON (f.codigo = l.faena) ";
			sql	+= "LEFT JOIN cuartel c ON (c.codigo = rd.cuartel) ";
			sql	+= "LEFT JOIN variedad v ON (v.codigo = c.variedad)";
			sql	+= "LEFT JOIN especie e ON (e.codigo = v.especie) ";
			sql	+= "LEFT JOIN  sector s ON (s.sector = c.sector) ";
			sql	+= "LEFT JOIN  campo cam ON (cam.campo = s.campo or rd.campo_rd = cam.campo) ";
			sql	+= "WHERE rd.fecha_i BETWEEN '"+fecha_desde+"' AND '"+fecha_hasta+"' AND rd.codigo_rg = 0 AND (cam.campo = '"+campo+"' or rd.campo_rd = '"+campo+"') AND rd.estado = 8 ";
			if(tipo.equals("PLANTA")){
				sql += "AND rd.rd_contratista = 0";
			}else{
				sql += "AND rd.rd_contratista != 0";
			}
			System.out.println(sql);
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				RENDIMIENTO_GENERAL ob = new RENDIMIENTO_GENERAL();
				ob.setCodigo(rs.getInt("codigo_rg"));
				ob.setFecha(rs.getString("fecha_i"));
				ob.setCampo(rs.getString("descripcion"));
				ob.setNsupervisor(rs.getString("supervisor"));
				ob.setNcuadrilla(rs.getString("trabajador"));
				ob.setNlabor(rs.getString("labor"));
				ob.setHoras(rs.getFloat("horas_trabajadas"));
				ob.setTipo_pago(rs.getInt("tipo_trato"));
				ob.setNespecie(rs.getString("especie"));
				ob.setNvariedad(rs.getString("variedad"));
				ob.setNfaena(rs.getString("faena"));
				ob.setNcuartel(rs.getString("nombre"));
				ob.setNcontratista(rs.getString("ceco"));
				ob.trabajador = rs.getString("nombreTrabajador");
				lista.add(ob);
			}
			rs.close();
			ps.close();
			db.conn.close();
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error:" + e.getMessage());
		} finally {
			db.close();
		}
		return lista;
	}
	public static respuesta ADD_RENDIMIENTO_DIARIO(ConnectionDB db, RENDIMIENTO_DIARIO r) throws Exception{
		PreparedStatement ps = null;
		respuesta res = new respuesta();
		res.setEstado(false);
		res.setObjeto(r);
		String sql = "";
		try {
			//TODO
			sql = "INSERT INTO rendimiento_diario (trabajador, base_piso_hora, subsidio, cuartel, labor, valor, "
					+ "tipo_trato, rendimiento, valor_rendimietno, horas_trabajadas, horas_extras, bono1, bono2, "
					+ "valor_liquido, maquinaria, implemento, bus, estado, codigo_rg, cargo, rd_contratista"
					+ ",bono_cargo, bono_produccion, base_ficha, base_cargo, valor_hx, monto_hx, hx_dos, valor_hx_dos"
					+ ", fecha_i, supervisor_i, macroco, ceco, campo_rd, n_personas, horas_totales, idContrato, ordenco, res_hx)";
			sql += "VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, (SELECT MAX(id) FROM contratos WHERE codigo_trabajador = (SELECT codigo FROM trabajadores WHERE id = "+r.getTrabajador()+") "
					+ "AND fechaInicio_actividad <= '"+r.getFecha()+"' AND (FechaTerminoContrato >= '"+r.getFecha()+"' OR FechaTerminoContrato IS NULL)), ?, ?)";
			ps = db.conn.prepareStatement(sql);
			ps.setInt(1, r.getTrabajador());
			ps.setFloat(2, r.getBase_piso_hora());
			ps.setInt(3, r.getSubsidio());
			ps.setInt(4, r.getCuartel());
			ps.setInt(5, r.getLabor());
			ps.setInt(6, r.getValor());
			ps.setInt(7, r.getTipo_trato());
			ps.setFloat(8, r.getRendimiento());
			ps.setFloat(9, r.getValor_rendimiento());
			ps.setFloat(10, r.getHoras_trabajadas());
			ps.setFloat(11, r.getHoras_extras());
			ps.setInt(12, r.getBono1());
			ps.setInt(13, r.getBono2());
			ps.setFloat(14, r.getValor_liquido());
			ps.setInt(15, r.getMaquinaria());
			ps.setInt(16, r.getImplemento());
			ps.setInt(17, r.getBus());
			ps.setInt(18, r.getEstado());
			ps.setInt(19, r.getCodigo_rg());
			ps.setInt(20, r.getCargo());
			ps.setString(21, r.getIdContratista());
			ps.setString(22, r.getBonoCargo());
			ps.setString(23, r.getBonoProduccion());
			ps.setString(24, r.getBaseFicha());
			ps.setString(25, r.getBaseCargo());
			ps.setFloat(26, r.getValor_hx());
			ps.setFloat(27, r.getMonto_hx());
			ps.setFloat(28, r.getHx_dos());
			ps.setFloat(29, r.getValor_hx_dos());
			ps.setString(30, r.getFecha());
			ps.setInt(31, r.getSupervisor_i());
			ps.setString(32, r.getMacroco());
			ps.setString(33, r.getCeco());
			ps.setString(34, r.getCampo());
			ps.setInt(35, r.getN_personas());
			ps.setFloat(36, r.getHoras_totales());
			ps.setString(37, r.getOrdenco());
			ps.setInt(38, r.getRes_hx());
			System.out.println(sql);
			ps.execute();
			res.setEstado(true);
			res.setObjeto(r);
			return res;
		} catch (SQLException e) {
			System.out.println("Error  fghfgh:" + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error ytyrtyr:" + e.getMessage());
		} finally {
//			ps.close();
			db.close();
		}
		return res;
	}
	public static boolean UPD_ORDEN_PAGO(LIQUIDACION e) throws Exception{
		PreparedStatement ps = null;
		ConnectionDB db = new ConnectionDB();
		String sql = "";
		try {
			sql += 	"UPDATE liquidacion_contratista ";
			sql += 	"SET orden_pago = ?, ";
			sql += 	"estado = 3, ";
			sql += 	"estado_liquidacion = 2, ";
			sql += 	"n_factura = ?, ";
			sql += 	"valor_retencion = ?, ";
			sql += 	"orden_retencion = ?, ";
			sql += 	"asiento = ? ";
			sql += 	"WHERE codigo = ?";
			ps = db.conn.prepareStatement(sql);
			ps.setString(1, e.getOrden());
			ps.setString(2, e.getN_factura());
			ps.setInt(3, e.getValor_retencion());
			ps.setString(4, e.getOrden_retencion());
			ps.setString(5, e.getAsiento_contable());
			ps.setInt(6, e.getCodigo());
			ps.execute();
			return true;
		} catch (SQLException ex) {
			System.out.println("Error:" + ex.getMessage());
		} catch (Exception ex) {
			System.out.println("Error:" + ex.getMessage());
		} finally {
			ps.close();
			db.close();
		}
		return false;
	}
	public static ArrayList<asiento_contable> GEN_ASIENTO_CONTABLE(int codigo_rd) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<asiento_contable> data = new ArrayList<asiento_contable>();
		ConnectionDB db = new ConnectionDB();
		try{
			sql = 	"SELECT f.cuenta_prd AS cuenta, ";
			sql += 	"CASE ";
			sql += 		"WHEN(rd.cuartel = 0)THEN ";
			sql += 			"CASE ";
			sql += 				"WHEN(rd.ceco IS NULL OR rd.ceco = '') THEN '' ";
			sql += 				"ELSE rd.ceco ";
			sql += 			"END ";
			sql += 		"ELSE ";
			sql += 			"CASE ";
			sql += 				"WHEN(c.estado = 1) THEN c.ceco ";
			sql += 				"ELSE '' ";
			sql += 			"END ";
			sql += 	"END AS ceco, ";
			sql += 	"CASE ";
			sql += 		"WHEN(rd.cuartel = 0)THEN ";
			sql += 			"CASE ";
			sql += 				"WHEN(rd.ceco IS NULL OR rd.ceco = '') THEN rd.ordenco ";
			sql += 				"ELSE '' ";
			sql += 			"END ";
			sql += 		"ELSE ";
			sql += 			"CASE ";
			sql += 				"WHEN(c.estado = 2) THEN c.ordenco ";
			sql += 				"ELSE '' ";
			sql += 			"END ";
			sql += 	"END AS ordenco, ";
			sql += 	"SUM(rd.valor_liquido) AS valor ";
			sql += 	"FROM faena f join labor l ON(l.faena = f.codigo) ";
			sql += 	"JOIN rendimiento_diario rd ON(rd.labor = l.codigo) ";
			sql += 	"LEFT JOIN rendimiento_general rg ON (rd.codigo_rg = rg.codigo_rg) ";
			sql += 	"LEFT JOIN cuartel c on(c.codigo = rd.cuartel) ";
			sql += 	"WHERE rd.codigo IN (SELECT codigo_rd ";
			sql += 		"FROM liquidacion_rendimiento ";
			sql += 		"WHERE codigo_liq = "+codigo_rd+") ";
			sql += 	"AND rd.estado = 3 ";
			sql += 	"GROUP BY 2, 3, 1;";
			System.out.println(sql);
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while (rs.next()) {
				asiento_contable e = new asiento_contable();
				e.setCuenta(rs.getString("cuenta"));
				e.setCeco(rs.getString("ceco"));
				e.setOrdenco(rs.getString("ordenco"));
				e.setValor(rs.getFloat("valor"));
				data.add(e);
			}
			rs.close();
			ps.close();
			db.conn.close();
		}catch (SQLException ex){
			System.out.println("Erro:" + ex.getMessage());
		}catch (Exception ex){
			System.out.println("Error:" + ex.getMessage());
		}finally {
			db.close();
		}
		return data;
	}
	public static RENDIMIENTO_GENERAL GET_REND_GNRAL(int codigo_rg) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		RENDIMIENTO_GENERAL e = new RENDIMIENTO_GENERAL();
		ConnectionDB db = new ConnectionDB();
		try{
			sql += 	"SELECT rg.*, COUNT(ct.codigo) AS n_trab ";
			sql +=	"FROM rendimiento_general rg ";
			sql +=	"LEFT JOIN cuadrilla_trabajador ct ON(rg.codigo_cuadrilla = ct.codigo_cuadrilla) ";
			sql +=	"WHERE rg.codigo_rg = "+codigo_rg;
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			if(rs.next()) {
				e.setCodigo(rs.getInt("codigo_rg"));
				e.setFecha(rs.getString("fecha"));
				e.setEspecie(rs.getInt("especie"));
				e.setVariedad(rs.getInt("variedad"));
				e.setCuartel(rs.getInt("cuartel"));
				e.setFaena(rs.getInt("faena"));
				e.setLabor(rs.getInt("labor"));
				e.setHoras(rs.getInt("horas"));
				e.setTipo_pago(rs.getInt("tipo_pago"));
				e.setCodigo_cuadrilla(rs.getInt("codigo_cuadrilla"));
				e.setCodigo_supervisor(rs.getInt("codigo_supervisor"));
				e.setMacro(rs.getString("macro"));
				e.setCeco(rs.getString("ceco"));
				e.setOrdenco(rs.getString("ordenco"));
				e.setN_trab(rs.getInt("n_trab"));
			}
			rs.close();
			ps.close();
			db.conn.close();
		}catch (SQLException ex){
			System.out.println("Erro:" + ex.getMessage());
		}catch (Exception ex){
			System.out.println("Error:" + ex.getMessage());
		}finally {
			db.close();
		}
		return e;
	}
	public static respuesta UPD_RENDIMIENTO_DIARIO(ConnectionDB db, RENDIMIENTO_DIARIO r) throws Exception{
		PreparedStatement ps = null;
		respuesta res = new respuesta();
		res.setEstado(false);
		res.setObjeto(r);
		String sql = "";
		try {
			sql = "UPDATE rendimiento_diario SET ";
			sql += "trabajador = ?, base_piso_hora = ?, subsidio = ?, ";
			sql += "cuartel = ?, labor = ?, valor = ?, ";
			sql += "tipo_trato = ?, rendimiento = ?, valor_rendimietno = ?, ";
			sql += "horas_trabajadas = ?, horas_extras = ?, bono1 = ?, ";
			sql += "bono2 = ?, valor_liquido = ?, maquinaria = ?, ";
			sql += "implemento = ?, bus = ?, estado = ?, ";
			sql += "cargo = ?, rd_contratista = ?, ";
			sql += "bono_cargo = ? , bono_produccion = ?, base_ficha = ?, ";
			sql += "base_cargo = ? , valor_hx = ?, monto_hx = ?, ";
			sql += "hx_dos = ? , valor_hx_dos = ?, fecha_i = ?, ";
			sql += "supervisor_i = ? , macroco = ?, ceco = ?, ";
			sql += "campo_rd = ? , n_personas = ?, horas_totales = ?, ";
			sql += "ordenco = ?, res_hx = ? ";
			sql += "WHERE codigo = ?";
			ps = db.conn.prepareStatement(sql);
			ps.setInt(1, r.getTrabajador());
			ps.setFloat(2, r.getBase_piso_hora());
			ps.setInt(3, r.getSubsidio());
			ps.setInt(4, r.getCuartel());
			ps.setInt(5, r.getLabor());
			ps.setInt(6, r.getValor());
			ps.setInt(7, r.getTipo_trato());
			ps.setFloat(8, r.getRendimiento());
			ps.setFloat(9, r.getValor_rendimiento());
			ps.setFloat(10, r.getHoras_trabajadas());
			ps.setFloat(11, r.getHoras_extras());
			ps.setInt(12, r.getBono1());
			ps.setInt(13, r.getBono2());
			ps.setFloat(14, r.getValor_liquido());
			ps.setInt(15, r.getMaquinaria());
			ps.setInt(16, r.getImplemento());
			ps.setInt(17, r.getBus());
			ps.setInt(18, r.getEstado());
			ps.setInt(19, r.getCargo());
			ps.setString(20, r.getIdContratista());
			ps.setString(21, r.getBonoCargo());
			ps.setString(22, r.getBonoProduccion());
			ps.setString(23, r.getBaseFicha());
			ps.setString(24, r.getBaseCargo());
			ps.setFloat(25, r.getValor_hx());
			ps.setFloat(26, r.getMonto_hx());
			ps.setFloat(27, r.getHx_dos());
			ps.setFloat(28, r.getValor_hx_dos());
			ps.setString(29, r.getFecha());
			ps.setInt(30, r.getSupervisor_i());
			ps.setString(31, r.getMacroco());
			ps.setString(32, r.getCeco());
			ps.setString(33, r.getCampo());
			ps.setInt(34, r.getN_personas());
			ps.setFloat(35, r.getHoras_totales());
			ps.setString(36, r.getOrdenco());
			float res_hx = r.getMonto_hx() - r.getValor_hx();
			ps.setFloat(37, r.getRes_hx());
			ps.setInt(38, r.getCodigo());
			ps.execute();
			res.setEstado(true);
			return res;
		} catch (SQLException e) {
			System.out.println("Error error:" + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error error 2:" + e.getMessage());
		} finally {
			ps.close();
			db.close();
			
		}
		return res;
	}
	public static  ArrayList<cierre_mensual> GET_CIERRE_MENSUAL(String campo, String periodo) throws Exception{
		CallableStatement cStmt = null;
		String sql = "";
		ArrayList<cierre_mensual> data = new ArrayList<cierre_mensual>();
		ConnectionDB db = new ConnectionDB();
		try{
			sql = "call sa_getCierrePeriodo('"+periodo+"-01', '"+campo+"')";
			System.out.println(sql);
			cStmt = db.conn.prepareCall(sql);
			ResultSet rs = cStmt.executeQuery(sql);
			while(rs.next()){
				cierre_mensual e = new cierre_mensual();
				e.setId(rs.getInt("id"));
				e.setCodigo(rs.getInt("tr.codigo"));
				e.setTrabajador(rs.getString("trabajador"));
				e.setCuenta(rs.getString("cuenta"));
				e.setCeco(rs.getString("ceco"));
				e.setOrdenco(rs.getString("ordenco"));
				e.setValor(rs.getFloat("valor"));
				e.setPercent(rs.getFloat("percent"));
				e.setCosto_empresa(rs.getInt("costo_empresa"));
				e.setSociedadCentralizacion(rs.getString("sociedadCentralizacion"));
				e.setSociedadImputacion(rs.getString("sociedadImputacion"));
				e.setPeriodo(rs.getString("periodo"));
				e.setP_hx(rs.getFloat("p_hx"));
				e.setP_bono(rs.getFloat("p_bono"));
				e.setP_bono_dos(rs.getFloat("p_bono_dos"));
				e.setP_valor_rendimiento(rs.getFloat("p_valor_rendimiento"));
				e.setP_base_dia(rs.getFloat("p_base_dia"));
				data.add(e);
			}
			db.conn.close();
		}catch(Exception ex){
			System.out.println("Error: "+ex.getMessage());
		}finally{
			db.close();
		}
		return data;
	}
//	public static ArrayList<cierre_mensual> GET_CIERRE_MENSUAL(String campo, String periodo) throws Exception{
//		PreparedStatement ps = null;
//		String sql = "";
//		ArrayList<cierre_mensual> data = new ArrayList<cierre_mensual>();
//		ConnectionDB db = new ConnectionDB();
//		try{
//			sql = 	"SELECT tr.id, ";
//			sql += 	"CONCAT(tr.apellidoPaterno, ' ', tr.apellidoMaterno, ' ',tr.nombre) AS trabajador, ";
//			sql += 	"f.cuenta_prd AS cuenta, tr.codigo, ";
//			sql += 	"CASE ";
//			sql += 		"WHEN ((SELECT sociedad from campo where campo = cm.campo) != '"+campo+"') THEN ";
//			sql += 			"(SELECT ceco from camos_ceco where origen = '"+campo+"' and destino = (SELECT sociedad from campo where campo = cm.campo)) ";
//			sql += 		"ELSE ";
//			sql += 			"CASE WHEN (rd.cuartel = 0) THEN rd.ceco ";
//			sql += 				"ELSE CASE ";
//			sql += 					"WHEN (c.estado = 1) THEN c.ceco ";
//			sql += 					"ELSE '' ";
//			sql += 				"END ";
//			sql += 			"END ";
//			sql += 	"END AS ceco, ";
//			sql += 	"CASE ";
//			sql += 		"WHEN(rd.cuartel = 0)THEN ";
//			sql += 				"rd.ordenco ";
//			sql += 		"ELSE ";
//			sql += 			"CASE ";
//			sql += 				"WHEN(c.estado = 2) THEN c.ordenco ";
//			sql += 				"ELSE '' ";
//			sql += 			"END ";
//			sql += 	"END AS ordenco, ";
//			sql +=  "vla.liquido * GETPORCENTAJEVALOR(tr.id, DATE_FORMAT('"+periodo+"-01', '%Y%m'), SUM(rd.valor_liquido), '"+campo+"') / 100 costo_empresa, ";
//			sql += 	"SUM(rd.valor_liquido) AS valor, ";
//			sql += 	"getPorcentajeValor(tr.id, DATE_FORMAT('"+periodo+"-01', '%Y%m'), SUM(rd.valor_liquido), '"+campo+"') AS percent, ";
//			sql +=  "s.sociedad sociedadCentralizacion, cm.sociedad sociedadImputacion, DATE_FORMAT('2018-09-01', '%Y%m') periodo ";
//			sql += 	"FROM faena f join labor l ON(l.faena = f.codigo) ";
//			sql += 	"JOIN rendimiento_diario rd ON(rd.labor = l.codigo) ";
//			sql += 	"LEFT JOIN rendimiento_general rg ON (rd.codigo_rg = rg.codigo_rg) ";
//			sql += 	"LEFT JOIN cuartel c on(c.codigo = rd.cuartel) ";
//			sql += 	"LEFT JOIN trabajadores tr ON(rd.trabajador = tr.id) ";
//			sql +=  "left join vw_liquidoAgro vla ON vla.codTrabajador = tr.codigo and vla.periodo = DATE_FORMAT('"+periodo+"-01', '%Y%m')";
//			sql +=  "LEFT JOIN contratos ct on ct.id = rd.idContrato ";
//			sql +=  "left join sociedad s on s.idSociedad = ct.idSociedad "
//					+ "left join campo cm on (cm.campo = rd.campo_rd or cm.campo = rg.campo) ";
//			sql += 	"WHERE (DATE_FORMAT(rd.fecha_i, '%Y%m') = DATE_FORMAT('"+periodo+"-01', '%Y%m') ";
//			sql += 		"OR DATE_FORMAT(rg.fecha, '%Y%m') = DATE_FORMAT('"+periodo+"-01', '%Y%m')) ";
//			sql += 		"AND rd.estado = 3 ";
//			sql += " and s.sociedad = '"+campo+"' and rd.rd_contratista = 0 ";
//			//sql += 		"AND (rd.campo_rd in (select campo from campo where sociedad = '"+campo+"')  "
//			//		+ " OR rg.campo in (select campo from campo where sociedad = '"+campo+"') ) "
//			//				+ " AND rd.rd_contratista = 0";
//			sql += 	"GROUP BY 1 , 3  , 5 ,6,s.sociedad ,cm.sociedad, vla.liquido;";
//			System.out.println(sql);
//			ps = db.conn.prepareStatement(sql);
//			ResultSet rs = ps.executeQuery(sql);
//			while (rs.next()) {
//				cierre_mensual e = new cierre_mensual();
//				e.setId(rs.getInt("id"));
//				e.setCodigo(rs.getInt("tr.codigo"));
//				e.setTrabajador(rs.getString("trabajador"));
//				e.setCuenta(rs.getString("cuenta"));
//				e.setCeco(rs.getString("ceco"));
//				e.setOrdenco(rs.getString("ordenco"));
//				e.setValor(rs.getFloat("valor"));
//				e.setPercent(rs.getFloat("percent"));
//				e.setCosto_empresa(rs.getInt("costo_empresa"));
//				e.setSociedadCentralizacion(rs.getString("sociedadCentralizacion"));
//				e.setSociedadImputacion(rs.getString("sociedadImputacion"));
//				e.setPeriodo(rs.getString("periodo"));
//				data.add(e);
//			}
//			rs.close();
//			ps.close();
//			db.conn.close();
//		}catch (SQLException ex){
//			System.out.println("Erro:" + ex.getMessage());
//		}catch (Exception ex){
//			System.out.println("Error:" + ex.getMessage());
//		}finally {
//			db.close();
//		}
//		return data;
//	}
	public static boolean ADD_CIERRE_MENSUAL(ConnectionDB db, String periodo, String sociedad) throws Exception{
		PreparedStatement ps = null;
		respuesta res = new respuesta();
		String sql = "";
		try {
			//TODO
			sql +=	"INSERT INTO cierre_periodo (idTrabajador, cuenta, ceco, ordenco, valor, porcentaje, costo_empresa,sociedad_centralizacion,sociedad_imputacion,periodo) ";
			sql += 	"SELECT tr.id, ";
			//sql += 	"CONCAT(tr.apellidoPaterno, ' ', tr.apellidoMaterno, ' ',tr.nombre) AS trabajador, ";
			sql += 	"f.cuenta_prd AS cuenta, ";
			sql += 	"CASE ";
			sql += 		"WHEN(rd.cuartel = 0)THEN ";
//			sql += 			"CASE ";
//			sql += 				"WHEN(rd.ceco IS NULL OR rd.ceco = '') THEN '' ";
//			sql += 				"ELSE rd.ceco ";
//			sql += 			"END ";
			sql += 				"rd.ceco ";
			sql += 		"ELSE ";
			sql += 			"CASE ";
			sql += 				"WHEN(c.estado = 1) THEN c.ceco ";
			sql += 				"ELSE '' ";
			sql += 			"END ";
			sql += 	"END AS ceco, ";
			sql += 	"CASE ";
			sql += 		"WHEN(rd.cuartel = 0)THEN ";
//			sql += 			"CASE ";
//			sql += 				"WHEN(rd.ceco IS NULL OR rd.ceco != '') THEN rd.ordenco ";
//			sql += 				"ELSE '' ";
//			sql += 			"END ";
			sql += 				"rd.ordenco ";
			sql += 		"ELSE ";
			sql += 			"CASE ";
			sql += 				"WHEN(c.estado = 2) THEN c.ordenco ";
			sql += 				"ELSE '' ";
			sql += 			"END ";
			sql += 	"END AS ordenco, ";
			sql += 	"SUM(rd.valor_liquido) AS valor, ";
			sql += 	"getPorcentajeValor(tr.id, DATE_FORMAT('"+periodo+"-01', '%Y%m'), SUM(rd.valor_liquido), '"+sociedad+"') AS percent, ";
			sql +=  "vla.liquido * GETPORCENTAJEVALOR(tr.id, DATE_FORMAT('"+periodo+"-01', '%Y%m'), SUM(rd.valor_liquido), '"+sociedad+"') / 100 costo_empresa, ";
			sql +=  "s.sociedad sociedadCentralizacion, cm.sociedad sociedadImputacion, DATE_FORMAT('"+periodo+"-01', '%Y%m') periodo ";
			sql += 	"FROM faena f join labor l ON(l.faena = f.codigo) ";
			sql += 	"JOIN rendimiento_diario rd ON(rd.labor = l.codigo) ";
			sql += 	"LEFT JOIN rendimiento_general rg ON (rd.codigo_rg = rg.codigo_rg) ";
			sql += 	"LEFT JOIN cuartel c on(c.codigo = rd.cuartel) ";
			sql += 	"LEFT JOIN trabajadores tr ON(rd.trabajador = tr.id) ";
			sql +=  "left join vw_liquidoAgro vla ON vla.codTrabajador = tr.codigo and vla.periodo = DATE_FORMAT('"+periodo+"-01', '%Y%m')";
			sql +=  "LEFT JOIN contratos ct on ct.id = rd.idContrato ";
			sql +=  "left join sociedad s on s.idSociedad = ct.idSociedad "
					+ "left join campo cm on (cm.campo = rd.campo_rd or cm.campo = rg.campo) ";
			sql += 	"WHERE (DATE_FORMAT(rd.fecha_i, '%Y%m') = DATE_FORMAT('"+periodo+"-01', '%Y%m') ";
			sql += 		"OR DATE_FORMAT(rg.fecha, '%Y%m') = DATE_FORMAT('"+periodo+"-01', '%Y%m')) ";
			sql += 		"AND rd.estado = 3 ";
			sql += " and s.sociedad = '"+sociedad+"' and rd.rd_contratista = 0 ";
			//sql += 		"AND (rd.campo_rd in (select campo from campo where sociedad = '"+campo+"')  "
			//		+ " OR rg.campo in (select campo from campo where sociedad = '"+campo+"') ) "
			//				+ " AND rd.rd_contratista = 0";
			sql += 	"GROUP BY 1 , 2 , 3 , 4 ,s.sociedad ,cm.sociedad, vla.liquido;";			
			System.out.println(sql);
			ps = db.conn.prepareStatement(sql);
			ps.execute();
			return true;
		} catch (SQLException e) {
			System.out.println("Error  fghfgh:" + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error ytyrtyr:" + e.getMessage());
		} finally {
			ps.close();
			db.close();
		}
		return false;
	}
	public static boolean DELETE_CIERRE_MENSUAL (ConnectionDB db, String periodo, String sociedad)throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		try {
			sql = "DELETE FROM cierre_periodo WHERE periodo = DATE_FORMAT('"+periodo+"-01', '%Y%m') and sociedad_centralizacion = '"+sociedad+"'";
			ps = db.conn.prepareStatement(sql);
			ps.execute();
			return true;
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch  (Exception e){	
			System.out.println("Error:" + e.getMessage());
		} finally {
			ps.close();
//			db.conn.close();
		}
		return false;
	}
	public static ArrayList<trabajadores>  GET_ALL_TRABAJADORES(int id) throws Exception{
		PreparedStatement ps = null;
		ConnectionDB db = new ConnectionDB();
		ArrayList<trabajadores> data = new ArrayList<trabajadores>();
		try {
			String sql = "";
			sql += 	"SELECT DISTINCT ";
			sql += 		"tr.id, tr.rut, CONCAT(tr.apellidoPaterno, ' ', tr.apellidoMaterno, ' ', tr.nombre) AS nombre ";
			sql += 	"FROM trabajadores tr ";
			sql += 		"LEFT JOIN contratos ct ON(tr.codigo = ct.codigo_trabajador) ";
			sql += 	"WHERE ";
			sql += 		"idHuerto IN (SELECT codigo_campo FROM usuario_campo WHERE codigo_usuario = "+id+") ";
			sql += 		"AND tr.agro = 1;";
			ps = db.conn.prepareStatement(sql);
			System.out.println(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				trabajadores e = new trabajadores();
				e.setId(rs.getInt("id"));
				e.setRut(rs.getString("rut"));
				e.setNombre(rs.getString("nombre"));
				data.add(e);
			}
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch (Exception e){
			System.out.println("Error:" + e.getMessage());
		} finally {
			ps.close();
			db.conn.close();
		}
		return data;
	}
	public static ArrayList<RENDIMIENTO_DIARIO> GETLISTADO_CODIFICADO(String fecha_desde, String fecha_hasta, 
			String campo, String especie, String variedad, String faena, 
			String labor, String trabajador, String tipo_trabajador,String contratista,String cuartel, int estado) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<RENDIMIENTO_DIARIO> lista = new ArrayList<RENDIMIENTO_DIARIO>();
		ConnectionDB db = new ConnectionDB();
		try {
			System.out.println(campo);
			sql += 	"SELECT ";
			sql += 		"rd.*, t.rut, t.codigo,c.especie, e.especie AS nespecie, l.faena, ";
			sql += 		"CONCAT(t.apellidoPaterno, ' ', t.apellidoMaterno, ' ', t.nombre) AS nTrabajador, ";
			sql += 		"CONCAT(trs.apellidoPaterno, ' ', trs.apellidoMaterno, ' ', trs.nombre) AS supervisor, ";
			sql += 		"CASE ";
			sql += 			"WHEN (rg.fecha IS NULL) THEN rd.fecha_i ";
			sql += 			"ELSE rg.fecha ";
			sql += 		"END fecha_rendimiento, ";
			sql += 		"c.nombre AS nvnombre, s.descripcion, c.variedad, v.variedad AS nVariedad, f.faena AS nFaena, l.labor AS nLabor, er.descripcion AS nestado ";
			sql += 	"FROM rendimiento_diario rd ";
			sql += 		"LEFT JOIN rendimiento_general rg ON(rd.codigo_rg = rg.codigo_rg) ";
			sql += 		"LEFT JOIN trabajadores t ON(t.id = rd.trabajador) ";
			sql += 		"LEFT JOIN trabajadores trs ON(trs.id = rg.codigo_supervisor OR trs.id = rd.supervisor_i) ";
			sql += 		"LEFT JOIN estado_rendimiento er ON(er.codigo = rd.estado) ";
			sql += 		"LEFT JOIN cuartel c ON(c.codigo = rd.cuartel) ";
			sql += 		"LEFT JOIN especie e ON(e.codigo = c.especie) ";
			sql += 		"LEFT JOIN variedad v ON(v.codigo = c.variedad) ";
			sql += 		"LEFT JOIN campo cam ON(cam.campo = rd.campo_rd OR cam.campo = rg.campo) ";
			sql += 		"LEFT JOIN sector s ON (s.sector = c.sector) ";
			sql += 		"LEFT JOIN labor l ON(l.codigo = rd.labor) ";
			sql += 		"LEFT JOIN faena f ON(f.codigo = l.faena) ";
			sql += 	"WHERE ";
			sql += 		"(rg.fecha BETWEEN '"+fecha_desde+"' AND '"+fecha_hasta+"' OR rd.fecha_i BETWEEN '"+fecha_desde+"' AND '"+fecha_hasta+"')";
			sql += 		"AND (cam.campo IN ("+campo+")) ";
			sql += 		"AND (rg.especie IN ('"+especie+"') or '"+especie+"' = 0) ";
			sql += 		"AND (v.codigo IN ('"+variedad+"') or '"+variedad+"' = 0) ";
			sql += 		"AND (f.codigo IN ('"+faena+"') or '"+faena+"' = 0) ";
			sql += 		"AND (rd.labor IN ('"+labor+"') or '"+labor+"' = 0) ";
			sql += 		"AND (rd.trabajador IN ('"+trabajador+"') or '"+trabajador+"' = 0) ";
			sql += 		"AND (rd.cuartel IN ('"+cuartel+"') or '"+cuartel+"' = 0) ";
			sql += 		"AND (rd.rd_contratista IN ('"+contratista+"') or '"+contratista+"' = 0) ";
			sql += 		"AND (rd.estado IN ('"+estado+"') or '"+estado+"' = 0) ";
			if(tipo_trabajador.equals("1")) {
				sql += " AND (rd.rd_contratista = 0 or rd.rd_contratista = '' or rd.rd_contratista is null)";
			}
			if(tipo_trabajador.equals("2")) {
				sql += " AND (rd.rd_contratista != 0 and rd.rd_contratista != '' and rd.rd_contratista is not null)";
			}
			sql += " AND rd.estado != 7";
			System.out.println(sql);
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				RENDIMIENTO_DIARIO ob = new RENDIMIENTO_DIARIO();
				ob.setCodigo(rs.getInt("rd.codigo"));
				ob.setNombre(rs.getString("nTrabajador"));
				ob.setRut(rs.getString("rut"));
				ob.setHoras_trabajadas(rs.getFloat("horas_trabajadas"));
				ob.setHoras_extras(rs.getFloat("horas_extras"));
				ob.setEspecie(rs.getInt("especie"));
				ob.setVariedad(rs.getInt("variedad"));
				ob.setFaena(rs.getInt("faena"));
				ob.setLabor(rs.getInt("labor"));
				ob.setValor(rs.getInt("valor"));
				ob.setValor_rendimiento(rs.getFloat("valor_rendimietno"));
				ob.setRendimiento(rs.getFloat("rendimiento"));
				ob.setTipo_pago(rs.getInt("tipo_trato"));
				ob.setValor_liquido(rs.getInt("valor_liquido"));
				ob.setBono1(rs.getInt("bono1"));
				ob.setBono2(rs.getInt("bono2"));
				ob.setMaquinaria(rs.getInt("maquinaria"));
				ob.setImplemento(rs.getInt("implemento"));
				ob.setFecha(rs.getString("fecha_rendimiento")); 
				ob.setNvnombre(rs.getString("nvnombre"));
				ob.setDescripcion(rs.getString("descripcion"));
				ob.setnVariedad(rs.getString("nVariedad"));
				ob.setnEspecie(rs.getString("nEspecie"));
//				ob.setnMaquinaria(rs.getString("nMaquinaria"));
//				ob.setnImplemento(rs.getString("nImplemento"));
				ob.setnFaena(rs.getString("nFaena"));
				ob.setnLabor(rs.getString("nLabor"));
				ob.setSupervisor(rs.getString("supervisor"));
				ob.setBase_piso_hora(rs.getInt("base_piso_hora"));
				ob.setIdContratista(rs.getString("rd_contratista"));
				ob.setNestado(rs.getString("nestado"));
				ob.setValor_hx(rs.getFloat("valor_hx"));
				ob.setMonto_hx(rs.getFloat("monto_hx"));
				ob.setHx_dos(rs.getFloat("hx_dos"));
				ob.setValor_hx_dos(rs.getFloat("valor_hx_dos"));
				ob.setMacroco(rs.getString("macroco"));
				ob.setCeco(rs.getString("ceco"));
				ob.setOrdenco(rs.getString("ordenco"));
				ob.setRes_hx(rs.getInt("res_hx"));
				ob.setSubsidio(rs.getInt("subsidio"));
				if(rs.getFloat("valor_rendimietno") > 0 && rs.getFloat("rendimiento") > 0){
					ob.setValor_trato(rs.getFloat("valor_rendimietno") / rs.getFloat("rendimiento"));
				}else{
					ob.setValor_trato(0);
				}
				ob.setTrabajador(rs.getInt("t.codigo"));
				ob.setCuartel(rs.getInt("rd.cuartel"));
				lista.add(ob);
			}
			rs.close();
			ps.close();
			db.conn.close();
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error:" + e.getMessage());
		} finally {
			db.close();
		}
		return lista;
	}
	public static ArrayList<cierre_mensual> GET_CIERRE_TERCEROS(String campo, String periodo) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<cierre_mensual> data = new ArrayList<cierre_mensual>();
		ConnectionDB db = new ConnectionDB();
		try{
			sql = 	"SELECT tr.id, ";
			sql += 	"CONCAT(tr.apellidoPaterno, ' ', tr.apellidoMaterno, ' ',tr.nombre) AS trabajador, ";
			sql += 	"f.cuenta_prd AS cuenta, tr.codigo, ";
			sql += 	"CASE ";
			sql += 		"WHEN (rd.cuartel = 0) THEN rd.ceco ";
			sql += 		"ELSE CASE ";
			sql += 			"WHEN (c.estado = 1) THEN c.ceco ";
			sql += 			"ELSE '' ";
			sql += 		"END ";
			sql += 	"END AS ceco, ";
			sql += 	"CASE ";
			sql += 		"WHEN(rd.cuartel = 0)THEN ";
			sql += 				"rd.ordenco ";
			sql += 		"ELSE ";
			sql += 			"CASE ";
			sql += 				"WHEN(c.estado = 2) THEN c.ordenco ";
			sql += 				"ELSE '' ";
			sql += 			"END ";
			sql += 	"END AS ordenco, ";
			sql +=  "vla.liquido * GETPORCENTAJEVALOR(tr.id, DATE_FORMAT('"+periodo+"-01', '%Y%m'), SUM(rd.valor_liquido), s.sociedad) / 100 costo_empresa, ";
			sql += 	"SUM(rd.valor_liquido) AS valor, ";
			sql += 	"getPorcentajeValor(tr.id, DATE_FORMAT('"+periodo+"-01', '%Y%m'), SUM(rd.valor_liquido), s.sociedad) AS percent, ";
			sql +=  "s.sociedad sociedadCentralizacion, cm.sociedad sociedadImputacion, DATE_FORMAT('2018-09-01', '%Y%m') periodo ";
			sql += 	"FROM faena f join labor l ON(l.faena = f.codigo) ";
			sql += 		"JOIN rendimiento_diario rd ON(rd.labor = l.codigo) ";
			sql += 		"LEFT JOIN rendimiento_general rg ON (rd.codigo_rg = rg.codigo_rg) ";
			sql += 		"LEFT JOIN cuartel c on(c.codigo = rd.cuartel) ";
			sql += 		"LEFT JOIN trabajadores tr ON(rd.trabajador = tr.id) ";
			sql +=  	"left join vw_liquidoAgro vla ON vla.codTrabajador = tr.codigo and vla.periodo = DATE_FORMAT('"+periodo+"-01', '%Y%m')";
			sql +=  	"LEFT JOIN contratos ct on ct.id = rd.idContrato ";
			sql +=  	"left join sociedad s on s.idSociedad = ct.idSociedad "
						+ "left join campo cm on (cm.campo = rd.campo_rd or cm.campo = rg.campo) ";
			sql += 	"WHERE (DATE_FORMAT(rd.fecha_i, '%Y%m') = DATE_FORMAT('"+periodo+"-01', '%Y%m') ";
			sql += 		"OR DATE_FORMAT(rg.fecha, '%Y%m') = DATE_FORMAT('"+periodo+"-01', '%Y%m')) ";
			sql += 		"AND rd.estado = 3 ";
			sql += 		"AND (rd.campo_rd IN (SELECT campo from campo WHERE sociedad = '"+campo+"') OR rg.campo IN (SELECT campo from campo WHERE sociedad = '"+campo+"'))";
			sql += 		"AND s.sociedad != cm.sociedad ";
			sql += 		"AND rd.rd_contratista = 0 ";
			sql += 	"GROUP BY 1 , 3  , 5 ,6,s.sociedad ,cm.sociedad, vla.liquido;";
			System.out.println(sql);
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while (rs.next()) {
				cierre_mensual e = new cierre_mensual();
				e.setId(rs.getInt("id"));
				e.setCodigo(rs.getInt("tr.codigo"));
				e.setTrabajador(rs.getString("trabajador"));
				e.setCuenta(rs.getString("cuenta"));
				e.setCeco(rs.getString("ceco"));
				e.setOrdenco(rs.getString("ordenco"));
				e.setValor(rs.getFloat("valor"));
				e.setPercent(rs.getFloat("percent"));
				e.setCosto_empresa(rs.getInt("costo_empresa"));
				e.setSociedadCentralizacion(rs.getString("sociedadCentralizacion"));
				e.setSociedadImputacion(rs.getString("sociedadImputacion"));
				e.setPeriodo(rs.getString("periodo"));
				data.add(e);
			}
			rs.close();
			ps.close();
			db.conn.close();
		}catch (SQLException ex){
			System.out.println("Erro:" + ex.getMessage());
		}catch (Exception ex){
			System.out.println("Error:" + ex.getMessage());
		}finally {
			db.close();
		}
		return data;
	}
	public static boolean ADD_CIERRE_TERCEROS(ConnectionDB db, String periodo, String campo) throws Exception{
		PreparedStatement ps = null;
		respuesta res = new respuesta();
		String sql = "";
		try {
			//TODO
			sql +=	"INSERT INTO cierre_terceros (idTrabajador, cuenta, ceco, ordenco, valor, porcentaje, costo_empresa,sociedad_centralizacion,sociedad_imputacion,periodo) ";
			sql += 	"SELECT tr.id, ";
			sql += 	"f.cuenta_prd AS cuenta, tr.codigo, ";
			sql += 	"CASE ";
			sql += 		"WHEN (rd.cuartel = 0) THEN rd.ceco ";
			sql += 		"ELSE CASE ";
			sql += 			"WHEN (c.estado = 1) THEN c.ceco ";
			sql += 			"ELSE '' ";
			sql += 		"END ";
			sql += 	"END AS ceco, ";
			sql += 	"CASE ";
			sql += 		"WHEN(rd.cuartel = 0)THEN ";
			sql += 				"rd.ordenco ";
			sql += 		"ELSE ";
			sql += 			"CASE ";
			sql += 				"WHEN(c.estado = 2) THEN c.ordenco ";
			sql += 				"ELSE '' ";
			sql += 			"END ";
			sql += 	"END AS ordenco, ";
			sql +=  "vla.liquido * GETPORCENTAJEVALOR(tr.id, DATE_FORMAT('"+periodo+"-01', '%Y%m'), SUM(rd.valor_liquido), s.sociedad) / 100 costo_empresa, ";
			sql += 	"SUM(rd.valor_liquido) AS valor, ";
			sql += 	"getPorcentajeValor(tr.id, DATE_FORMAT('"+periodo+"-01', '%Y%m'), SUM(rd.valor_liquido), s.sociedad) AS percent, ";
			sql +=  "s.sociedad sociedadCentralizacion, cm.sociedad sociedadImputacion, DATE_FORMAT('2018-09-01', '%Y%m') periodo ";
			sql += 	"FROM faena f join labor l ON(l.faena = f.codigo) ";
			sql += 		"JOIN rendimiento_diario rd ON(rd.labor = l.codigo) ";
			sql += 		"LEFT JOIN rendimiento_general rg ON (rd.codigo_rg = rg.codigo_rg) ";
			sql += 		"LEFT JOIN cuartel c on(c.codigo = rd.cuartel) ";
			sql += 		"LEFT JOIN trabajadores tr ON(rd.trabajador = tr.id) ";
			sql +=  	"left join vw_liquidoAgro vla ON vla.codTrabajador = tr.codigo and vla.periodo = DATE_FORMAT('"+periodo+"-01', '%Y%m')";
			sql +=  	"LEFT JOIN contratos ct on ct.id = rd.idContrato ";
			sql +=  	"left join sociedad s on s.idSociedad = ct.idSociedad "
						+ "left join campo cm on (cm.campo = rd.campo_rd or cm.campo = rg.campo) ";
			sql += 	"WHERE (DATE_FORMAT(rd.fecha_i, '%Y%m') = DATE_FORMAT('"+periodo+"-01', '%Y%m') ";
			sql += 		"OR DATE_FORMAT(rg.fecha, '%Y%m') = DATE_FORMAT('"+periodo+"-01', '%Y%m')) ";
			sql += 		"AND rd.estado = 3 ";
			sql += 		"AND (rd.campo_rd IN (SELECT campo from campo WHERE sociedad = '"+campo+"') OR rg.campo IN (SELECT campo from campo WHERE sociedad = '"+campo+"'))";
			sql += 		"AND s.sociedad != cm.sociedad ";
			sql += 		"AND rd.rd_contratista = 0 ";
			sql += 	"GROUP BY 1 , 3  , 5 ,6,s.sociedad ,cm.sociedad, vla.liquido;";			
			System.out.println(sql);
			ps = db.conn.prepareStatement(sql);
			ps.execute();
			return true;
		} catch (SQLException e) {
			System.out.println("Error  fghfgh:" + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error ytyrtyr:" + e.getMessage());
		} finally {
			ps.close();
			db.close();
		}
		return false;
	}
	public static boolean DELETE_CIERRE_TERCEROS (ConnectionDB db, String periodo, String sociedad)throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		try {
			sql = "DELETE FROM cierre_terceros WHERE periodo = DATE_FORMAT('"+periodo+"-01', '%Y%m') and sociedad_imputacion = '"+sociedad+"'";
			ps = db.conn.prepareStatement(sql);
			ps.execute();
			return true;
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch  (Exception e){	
			System.out.println("Error:" + e.getMessage());
		} finally {
			ps.close();
//			db.conn.close();
		}
		return false;
	}
	public static ArrayList<String[]> GET_REVISION_ASISTENCIA (String campo, String[] fechas, int estado)throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		ArrayList<String> titulos = new ArrayList<>();
		ArrayList<String[]> data = new ArrayList<>();
		try {
			sql += 	"SELECT ";
			sql += 		"t.codigo, t.nombre, t.fechaInicio_actividad, t.FechaTerminoContrato";
			for(int i = 0; i < fechas.length; i++){
				sql += 		", MAX(IF(t.fecha = '"+fechas[i]+"', t.horas, 0)) AS 'f"+fechas[i]+"' ";
			}
			sql += 	"FROM ";
			sql += 		"(SELECT ";
			sql += 			"tr.codigo, UPPER(CONCAT(tr.apellidoPaterno, ' ',  tr.apellidoMaterno, ' ', tr.nombre)) AS nombre, ";
			sql += 			"ct.fechaInicio_actividad, ";
			sql += 			"CASE WHEN (ct.FechaTerminoContrato IS NULL)THEN '' ELSE ct.FechaTerminoContrato END AS FechaTerminoContrato, ";
			sql += 				"CASE ";
			sql += 					"WHEN (rd.fecha_i IS NULL OR rd.fecha_i = '') THEN rg.fecha ";
			sql += 					"ELSE rd.fecha_i ";
			sql += 				"END AS fecha, ";
			sql += 				"SUM(rd.horas_trabajadas) AS horas ";
			sql += 		"FROM ";
			sql += 			"rendimiento_diario rd ";
			sql += 			"LEFT JOIN rendimiento_general rg ON (rd.codigo_rg = rg.codigo_rg) ";
			sql += 			"RIGHT JOIN trabajadores tr ON (tr.id = rd.trabajador) ";
			sql += 			"LEFT JOIN contratos ct ON(ct.codigo_trabajador = tr.codigo) ";
			sql += 		"WHERE ";
			sql += 			"(fecha_i BETWEEN '"+fechas[0]+"' AND '"+fechas[fechas.length-1]+"' OR rg.fecha BETWEEN '"+fechas[0]+"' AND '"+fechas[fechas.length-1]+"') ";
			if(estado != 0){
				sql += 		"AND rd.estado = "+estado+" ";
			}else{
				sql += 		"AND rd.estado != 7 ";
			}
			sql += 			"AND (tr.idHuerto = '"+campo+"') ";
//			sql += 			"AND ct.periodo = DATE_FORMAT('"+fechas[0]+"', '%Y%m')";
//			sql += 			"AND ct.fechaInicio_actividad <= '"+fechas[0]+"' ";
//			sql += 			"AND (ct.FechaTerminoContrato >= '"+fechas[0]+"' OR ct.FechaTerminoContrato IS NULL) ";
			sql += 			"AND ct.EstadoContrato = 1 ";
			sql += 			"AND (rd.rd_contratista = 0 OR rd.rd_contratista IS NULL) ";
			sql += 		"GROUP BY 1, 2, 3,4,5) AS t ";
			sql += 	"GROUP BY t.codigo,t.nombre,3,4 ";
			sql +=	"ORDER BY t.nombre;";
			System.out.println(sql);
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql); 
			ResultSetMetaData md = rs.getMetaData();
			int count = md.getColumnCount();
			for (int i = 1; i <= count; i++) {
				titulos.add(md.getColumnName(i));
			}
			while(rs.next()){
				String datos = "";
				for(String t: titulos){
					String horas = rs.getString(t);
					datos += horas+",";
				}
				String [] dataAux = datos.split(",");
				data.add(dataAux);
			}
			rs.close();
			ps.close();
			db.conn.close();
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error:" + e.getMessage());
		} finally {
			db.close();
		}
		return data;
	}	
	public static boolean DELETE_RENDIMIENTO_DUPLICADO (int codigo)throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "DELETE from rendimiento_diario where codigo = "+codigo;
			ps = db.conn.prepareStatement(sql);
			ps.execute();
			return true;
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch  (Exception e){	
			System.out.println("Error:" + e.getMessage());
		} finally {
			ps.close();
			db.conn.close();
		}
		return false;
	}
	public static ArrayList<CUADRATURA_HORA> GET_TR_SIN_RENDIMIENTO (String campo, String[] fechas)throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<CUADRATURA_HORA> lista = new ArrayList<CUADRATURA_HORA>();
		ConnectionDB db = new ConnectionDB();
		try {
			int count = 0;
			for(int i = 0; i < fechas.length; i++){
				if(count == 0){
					sql += 	"SELECT ";
					sql += 		"tr.id, tr.codigo, ";
					sql += 		"UPPER(CONCAT(tr.apellidoPaterno, ' ',  tr.apellidoMaterno,  ' ',   tr.nombre)) AS nombre, ";
					sql += 		"cm.campo AS campo, rd.horas, DATE('"+fechas[i]+"') AS fecha ";
					sql += 	"FROM ";
					sql += 		"trabajadores tr ";
					sql += 		"LEFT JOIN contratos ct ON (ct.codigo_trabajador = tr.codigo) ";
					sql += 		"LEFT JOIN campo cm ON (cm.campo = tr.idHuerto) ";
					sql += 		"LEFT JOIN (SELECT ";
					sql += 			"SUM(horas_trabajadas) horas, trabajador ";
					sql += 			"FROM ";
					sql += 				"rendimiento_diario rd ";
					sql += 				"LEFT JOIN rendimiento_general rg ON (rg.codigo_rg = rd.codigo_rg) ";
					sql += 			"WHERE ";
					sql += 				"(rd.fecha_i = '"+fechas[i]+"' OR rg.fecha = '"+fechas[i]+"') ";
					sql += 				"AND (rg.campo = '"+campo+"' OR rd.campo_rd = '"+campo+"') ";
					sql += 				"AND rd.estado != 7 ";
					sql += 			"GROUP BY trabajador) rd ON rd.trabajador = tr.id ";
					sql += 	"WHERE ";
					sql += 		"ct.EstadoContrato = 1 AND tr.agro = 1 ";
					sql += 		"AND cm.campo = '"+campo+"' ";
					sql += 		"AND (rd.horas IS NULL OR rd.horas = 0) ";
					sql += 		"AND ct.fechaInicio_actividad <= '"+fechas[i]+"' ";
					sql += 		"AND (ct.FechaTerminoContrato >= '"+fechas[i]+"' OR ct.FechaTerminoContrato IS NULL) ";
					sql += 		"AND (DAYOFWEEK('"+fechas[i]+"') != 7 OR DAYOFWEEK('"+fechas[i]+"') != 1)";
				}else{
					sql += 	"UNION ALL SELECT ";
					sql += 		"tr.id, tr.codigo, ";
					sql += 		"UPPER(CONCAT(tr.apellidoPaterno, ' ',  tr.apellidoMaterno,  ' ',   tr.nombre)) AS nombre, ";
					sql += 		"cm.campo AS campo, rd.horas, DATE('"+fechas[i]+"') AS fecha ";
					sql += 	"FROM ";
					sql += 		"trabajadores tr ";
					sql += 		"LEFT JOIN contratos ct ON (ct.codigo_trabajador = tr.codigo) ";
					sql += 		"LEFT JOIN campo cm ON (cm.campo = tr.idHuerto) ";
					sql += 		"LEFT JOIN (SELECT ";
					sql += 			"SUM(horas_trabajadas) horas, trabajador ";
					sql += 			"FROM ";
					sql += 				"rendimiento_diario rd ";
					sql += 				"LEFT JOIN rendimiento_general rg ON (rg.codigo_rg = rd.codigo_rg) ";
					sql += 			"WHERE ";
					sql += 				"(rd.fecha_i = '"+fechas[i]+"' OR rg.fecha = '"+fechas[i]+"') ";
					sql += 				"AND (rg.campo = '"+campo+"' OR rd.campo_rd = '"+campo+"') ";
					sql += 				"AND rd.estado != 7 ";
					sql += 			"GROUP BY trabajador) rd ON rd.trabajador = tr.id ";
					sql += 	"WHERE ";
					sql += 		"ct.EstadoContrato = 1 AND tr.agro = 1 ";
					sql += 		"AND cm.campo = '"+campo+"' ";
					sql += 		"AND (rd.horas IS NULL OR rd.horas = 0) ";
					sql += 		"AND ct.fechaInicio_actividad <= '"+fechas[i]+"' ";
					sql += 		"AND (ct.FechaTerminoContrato >= '"+fechas[i]+"' OR ct.FechaTerminoContrato IS NULL) ";
					sql += 		"AND (DAYOFWEEK('"+fechas[i]+"') != 7 OR DAYOFWEEK('"+fechas[i]+"') != 1)";
				}
				count++;
			}
			sql +=	"ORDER BY 6 , 3;";
			System.out.println(sql);
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql); 
			while(rs.next()){
				CUADRATURA_HORA ob = new CUADRATURA_HORA();
				ob.setCuartel(rs.getString("id"));
				ob.setCodigo(rs.getInt("codigo"));
				ob.setCampo(rs.getString("campo"));
				ob.setFecha(rs.getString("fecha"));
				ob.setNombre(rs.getString("nombre"));
				ob.setHoras(rs.getInt("horas"));
				lista.add(ob);
			}
			rs.close();
			ps.close();
			db.conn.close();
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error:" + e.getMessage());
		} finally {
			db.close();
		}
		return lista;
	}
	public static ArrayList<String[]> GET_RESUMEN_DIGITACION (String sociedad, String campo, String periodo, int estado)throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		ArrayList<String> titulos = new ArrayList<>();
		ArrayList<String[]> data = new ArrayList<>();
		try {
			sql += 	"SELECT ";
			sql += 		"tr.codigo, ";
			sql += 		"CASE ";
			sql += 			"WHEN (tr.rut = '') THEN tr.rutTemporal ";
			sql += 			"ELSE tr.rut ";
			sql += 		"END AS rut, ";
			sql += 		"UPPER(CONCAT(tr.apellidoPaterno, ' ', tr.apellidoMaterno, ' ', tr.nombre)) AS nombre, ";
			sql += 		"ct.fechaInicio_actividad, ";
			sql += 		"CASE ";
			sql += 			"WHEN (ct.FechaTerminoContrato IS NULL) THEN '' ";
			sql += 			"ELSE ct.FechaTerminoContrato ";
			sql += 		"END AS FechaTerminoContrato, ";
			sql += 		"t.dias_totales, t.diasFalta, t.horas_trabajadas, t.horas_extras, t.m_hx, t.m_b, t.hx_dos, t.m_b2, t.valor_rend, t.base_dia, t.valor_liquido ";
			sql += 	"FROM ";
			sql += 		"(SELECT  ";
			sql += 			"rd.trabajador,";
			sql += 			"COUNT(DISTINCT CASE ";
			sql += 				"WHEN (rd.fecha_i IS NULL) THEN rg.fecha ";
			sql += 				"ELSE rd.fecha_i ";
			sql += 			"END) AS dias_totales, ";
			sql += 			"getDiasSinDigitacion((SELECT codigo from trabajadores WHERE id = rd.trabajador),DATE_FORMAT('"+periodo+"-01', '%Y%m')) AS diasFalta,";
			sql += 			"SUM(rd.monto_hx) AS m_hx, ";
			sql += 			"SUM(rd.bono1) AS m_b, ";
			sql += 			"SUM(rd.bono2) AS m_b2, ";
			sql += 			"SUM(rd.horas_trabajadas) AS horas_trabajadas, ";
			sql += 			"SUM(rd.horas_extras) AS horas_extras, ";
			sql += 			"SUM(rd.hx_dos) AS hx_dos, ";
			sql += 			"SUM(CASE ";
			sql += 				"WHEN ";
			sql += 					"(rd.tipo_trato = 2) ";
			sql += 				"THEN ";
			sql += 					"CASE ";
			sql += 						"WHEN (rd.base_piso_hora = 2) THEN rd.valor_rendimietno ";
			sql += 						"ELSE CASE ";
			sql += 							"WHEN (rd.valor > rd.valor_rendimietno) THEN 0 ";
			sql += 							"ELSE rd.valor_rendimietno ";
			sql += 						"END ";
			sql += 					"END ";
			sql += 				"ELSE CASE ";
			sql += 					"WHEN (rd.tipo_trato = 3) THEN rd.valor_rendimietno ";
			sql += 					"ELSE 0 ";
			sql += 				"END ";
			sql += 			"END) AS valor_rend, ";
			sql += 			"SUM(CASE ";
			sql += 				"WHEN ";
			sql += 					"(rd.tipo_trato = 2) ";
			sql += 				"THEN ";
			sql += 					"CASE ";
			sql += 						"WHEN (rd.base_piso_hora = 2) THEN 0 ";
			sql += 						"ELSE CASE ";
			sql += 							"WHEN (rd.valor > rd.valor_rendimietno) THEN rd.valor ";
			sql += 							"ELSE 0 ";
			sql += 						"END ";
			sql += 					"END ";
			sql += 				"ELSE rd.valor ";
			sql += 			"END) AS base_dia, ";
			sql += 			"SUM(rd.valor_liquido) AS valor_liquido ";
			sql += 		"FROM ";
			sql += 			"rendimiento_diario rd ";
			sql += 		"LEFT JOIN rendimiento_general rg ON (rd.codigo_rg = rg.codigo_rg) ";
			sql += 		"WHERE ";
			sql += 			"rd.trabajador != 0 ";
			sql += 			"AND (DATE_FORMAT(rd.fecha_i, '%Y%m') = DATE_FORMAT('"+periodo+"-01', '%Y%m') ";
			sql += 			"OR DATE_FORMAT(rg.fecha, '%Y%m') = DATE_FORMAT('"+periodo+"-01', '%Y%m')) ";
			if(estado != 0){
				sql += 		"AND rd.estado = "+estado+" ";
			}else{
				sql += 		"AND rd.estado != 7 ";
			}
			sql += 			"AND (rd.rd_contratista = 0 OR rd.rd_contratista IS NULL) ";
			sql += 		"GROUP BY 1) AS t ";
			sql += 		"LEFT JOIN trabajadores tr ON (t.trabajador = tr.id) ";
			sql += 		"LEFT JOIN contratos ct ON (tr.codigo = ct.codigo_trabajador) ";
			sql += 	"WHERE ";
			sql += 		"DATE_FORMAT(ct.fechaInicio_actividad, '%Y%m') <= DATE_FORMAT('"+periodo+"-01', '%Y%m') ";
			sql += 		"AND (DATE_FORMAT(ct.FechaTerminoContrato, '%Y%m') >= DATE_FORMAT('"+periodo+"-01', '%Y%m') ";
			sql += 		"OR ct.FechaTerminoContrato IS NULL) ";
			sql += 		"AND ct.idSociedad = (SELECT idSociedad FROM sociedad WHERE sociedad = '"+sociedad+"') ";
			sql += 		"AND tr.idHuerto = '"+campo+"';";
			System.out.println(sql);
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql); 
			ResultSetMetaData md = rs.getMetaData();
			int count = md.getColumnCount();
			for (int i = 1; i <= count; i++) {
				titulos.add(md.getColumnName(i));
			}
			while(rs.next()){
				String datos = "";
				for(String t: titulos){
					String horas = rs.getString(t);
					datos += horas+",";
				}
				String [] dataAux = datos.split(",");
				data.add(dataAux);
			}
			rs.close();
			ps.close();
			db.conn.close();
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error:" + e.getMessage());
		} finally {
			db.close();
		}
		return data;
	}	
	public static boolean ADD_TR_SIN_DIGITACION (String[] fechas)throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		try {
			int count = 0;
			sql +=	"INSERT INTO tr_sin_digitacion ";
			for(int i = 0; i < fechas.length; i++){
				if(count == 0){
					sql += 	"SELECT ";
					sql += 		"tr.id, tr.codigo as codigo, ct.id as idContrato, '"+fechas[i]+"' as fecha ";
					sql += 	"FROM ";
					sql += 		"trabajadores tr ";
					sql += 		"LEFT JOIN contratos ct ON (ct.codigo_trabajador = tr.codigo) ";
					sql += 		"LEFT JOIN(SELECT ";
					sql += 						"SUM(horas_trabajadas) AS horas, trabajador ";
					sql += 					"FROM ";
					sql += 						"rendimiento_diario rd ";
					sql += 						"LEFT JOIN rendimiento_general rg ON (rg.codigo_rg = rd.codigo_rg) ";
					sql += 					"WHERE ";
					sql += 						"(rd.fecha_i = '"+fechas[i]+"' OR rg.fecha = '"+fechas[i]+"') ";
					sql += 						"AND rd.estado != 7 ";
					sql += 						"AND (rd.rd_contratista = 0 OR rd.rd_contratista IS NULL) ";
					sql += 					"GROUP BY trabajador) rd ON rd.trabajador = tr.id ";
					sql += 	"WHERE ";
					sql += 		"tr.agro = 1 ";
					sql += 		"AND (rd.horas IS NULL OR rd.horas = 0) ";
					sql += 		"AND tr.idContratista IS NULL ";
					sql += 		"AND (ct.fechaInicio_actividad <= '"+fechas[i]+"' ";
					sql += 		"AND (ct.FechaTerminoContrato >= '"+fechas[i]+"' OR ct.FechaTerminoContrato IS NULL)) ";
					sql += 		"AND (DAYOFWEEK('"+fechas[i]+"') != 7 OR DAYOFWEEK('"+fechas[i]+"') != 1)";
				}else{
					sql += 	"UNION ALL SELECT ";
					sql += 		"tr.id, tr.codigo as codigo, ct.id as idContrato, '"+fechas[i]+"' as fecha ";
					sql += 	"FROM ";
					sql += 		"trabajadores tr ";
					sql += 		"LEFT JOIN contratos ct ON (ct.codigo_trabajador = tr.codigo) ";
					sql += 		"LEFT JOIN(SELECT ";
					sql += 						"SUM(horas_trabajadas) AS horas, trabajador ";
					sql += 					"FROM ";
					sql += 						"rendimiento_diario rd ";
					sql += 						"LEFT JOIN rendimiento_general rg ON (rg.codigo_rg = rd.codigo_rg) ";
					sql += 					"WHERE ";
					sql += 						"(rd.fecha_i = '"+fechas[i]+"' OR rg.fecha = '"+fechas[i]+"') ";
					sql += 						"AND rd.estado != 7 ";
					sql += 						"AND (rd.rd_contratista = 0 OR rd.rd_contratista IS NULL) ";
					sql += 					"GROUP BY trabajador) rd ON rd.trabajador = tr.id ";
					sql += 	"WHERE ";
					sql += 		"tr.agro = 1 ";
					sql += 		"AND (rd.horas IS NULL OR rd.horas = 0) ";
					sql += 		"AND tr.idContratista IS NULL ";
					sql += 		"AND (ct.fechaInicio_actividad <= '"+fechas[i]+"' ";
					sql += 		"AND (ct.FechaTerminoContrato >= '"+fechas[i]+"' OR ct.FechaTerminoContrato IS NULL)) ";
					sql += 		"AND (DAYOFWEEK('"+fechas[i]+"') != 7 OR DAYOFWEEK('"+fechas[i]+"') != 1)";
				}
				count++;
			}
			sql +=	"ORDER BY 1;";
			System.out.println(sql);
			ps = db.conn.prepareStatement(sql);
			ps.execute();
			ps.close();
			db.conn.close();
			return true;
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error:" + e.getMessage());
		} finally {
			db.close();
		}
		return false;
	}
	public static boolean DELETE_TR_SIN (String fecha)throws Exception{
		PreparedStatement ps = null;
		ConnectionDB db = new ConnectionDB();
		String sql = "";
		try {
			sql = "DELETE FROM tr_sin_digitacion WHERE DATE_FORMAT(fecha, '%Y%m') = DATE_FORMAT('"+fecha+"', '%Y%m');";
			System.out.println(sql);
			ps = db.conn.prepareStatement(sql);
			ps.execute();
			return true;
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch  (Exception e){	
			System.out.println("Error:" + e.getMessage());
		} finally {
			ps.close();
//			db.conn.close();
		}
		return false;
	}
	public static ArrayList<RENDIMIENTO_DIARIO> GETLISTADO_TR_HUERTO(String fecha_desde, String fecha_hasta, 
			String campo, String especie, String variedad, String faena, 
			String labor, String trabajador, String tipo_trabajador,String contratista,String cuartel, int estado, int valor, HttpSession httpSession) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<RENDIMIENTO_DIARIO> lista = new ArrayList<RENDIMIENTO_DIARIO>();
		ConnectionDB db = new ConnectionDB();
		try {
			session ses = new session(httpSession);
			String[] lengthCampo = campo.split(",");
			System.out.println(campo);
			sql += 	"SELECT DISTINCT ";
			sql += 		"rd.*, t.rut,c.especie, e.especie AS nespecie, l.faena, ";
			sql += 		"case when(rd.rd_contratista is null) then 0 else rd.rd_contratista end as contratista, ";
			sql += 		"UPPER(CONCAT(t.apellidoPaterno, ' ', t.apellidoMaterno, ' ', t.nombre)) AS nTrabajador, ";
			sql += 		"UPPER(CONCAT(trs.apellidoPaterno, ' ', trs.apellidoMaterno, ' ', trs.nombre)) AS supervisor, ";
			sql += 		"CASE ";
			sql += 			"WHEN (rg.fecha IS NULL) THEN rd.fecha_i ";
			sql += 			"ELSE rg.fecha ";
			sql += 		"END fecha_rendimiento, ";
			sql += 		"UPPER(CONCAT(c.codigo_cuartel, ' ', c.nombre)) AS nvnombre, cam.descripcion AS campo, c.variedad, v.variedad AS nVariedad, f.faena AS nFaena, l.labor AS nLabor, er.descripcion AS nestado ";
			if(valor == 0){
				sql += 		", CAST(vla.liquido * GETPORCENTAJEVALOR(rd.trabajador, ";
				sql += 				"DATE_FORMAT((SELECT ";
				sql += 								"CASE ";
				sql += 									"WHEN (rdr.fecha_i = '') THEN rgr.fecha ";
				sql += 									"ELSE rdr.fecha_i ";
				sql += 								"END AS fecha ";
				sql += 							"FROM ";
				sql += 								"rendimiento_diario rdr ";
				sql += 								"LEFT JOIN rendimiento_general rgr ON (rdr.codigo_rg = rgr.codigo_rg) ";
				sql += 							"WHERE ";
				sql += 								"rdr.codigo = rd.codigo), '%Y%m'), ";
				sql += 				"rd.valor_liquido, ";
				sql += 				"(SELECT sociedad FROM campo WHERE campo = cam.campo)) / 100 AS SIGNED)AS costo_empresa ";
			}
			sql += 		",CAST((rd.valor_rendimietno/rd.rendimiento) as signed) as valor_trato ";
			sql += 	"FROM rendimiento_diario rd ";
			sql += 		"LEFT JOIN rendimiento_general rg ON(rd.codigo_rg = rg.codigo_rg) ";
			sql += 		"LEFT JOIN trabajadores t ON(t.id = rd.trabajador) ";
			sql += 		"LEFT JOIN trabajadores trs ON(trs.id = rg.codigo_supervisor OR trs.id = rd.supervisor_i) ";
			if(valor == 0){
				sql += 		"LEFT JOIN vw_liquidoAgro vla ON (vla.codTrabajador = t.codigo AND vla.sociedad = (SELECT sociedad FROM campo WHERE campo IN ("+campo+")) AND vla.periodo = DATE_FORMAT('"+fecha_hasta+"', '%Y%m'))";
			}
			sql += 		"LEFT JOIN estado_rendimiento er ON(er.codigo = rd.estado) ";
			sql += 		"LEFT JOIN cuartel c ON(c.codigo = rd.cuartel) ";
			sql += 		"LEFT JOIN especie e ON(e.codigo = c.especie) ";
			sql += 		"LEFT JOIN variedad v ON(v.codigo = c.variedad) ";
			sql += 		"LEFT JOIN campo cam ON(cam.campo = t.idHuerto) ";
			sql += 		"LEFT JOIN sector s ON (s.sector = c.sector) ";
			sql += 		"LEFT JOIN labor l ON(l.codigo = rd.labor) ";
			sql += 		"LEFT JOIN faena f ON(f.codigo = l.faena) ";
			sql += 	"WHERE ";
			sql += 		"(rg.fecha BETWEEN '"+fecha_desde+"' AND '"+fecha_hasta+"' OR rd.fecha_i BETWEEN '"+fecha_desde+"' AND '"+fecha_hasta+"')";
			sql += 		"AND (cam.campo IN ("+campo+")) ";
			sql += 		"AND (rg.especie IN ('"+especie+"') or '"+especie+"' = 0) ";
			sql += 		"AND (v.codigo IN ('"+variedad+"') or '"+variedad+"' = 0) ";
			sql += 		"AND (f.codigo IN ('"+faena+"') or '"+faena+"' = 0) ";
			sql += 		"AND (rd.labor IN ('"+labor+"') or '"+labor+"' = 0) ";
			sql += 		"AND (rd.trabajador IN ('"+trabajador+"') or '"+trabajador+"' = 0) ";
			sql += 		"AND (rd.cuartel IN ('"+cuartel+"') or '"+cuartel+"' = 0) ";
			sql += 		"AND (rd.rd_contratista IN ('"+contratista+"') or '"+contratista+"' = 0) ";
			sql += 		"AND (rd.estado IN ('"+estado+"') or '"+estado+"' = 0) ";
			if(tipo_trabajador.equals("1")) {
				sql += " AND (rd.rd_contratista = 0 or rd.rd_contratista = '' or rd.rd_contratista is null)";
			}
			if(tipo_trabajador.equals("2")) {
				sql += " AND (rd.rd_contratista != 0 and rd.rd_contratista != '' and rd.rd_contratista is not null)";
			}
			sql += " AND rd.estado != 7";
			System.out.println(sql);
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				RENDIMIENTO_DIARIO ob = new RENDIMIENTO_DIARIO();
				ob.setCodigo(rs.getInt("codigo"));
				ob.setNombre(rs.getString("nTrabajador"));
				ob.setRut(rs.getString("rut"));
				ob.setHoras_trabajadas(rs.getFloat("horas_trabajadas"));
				ob.setHoras_extras(rs.getFloat("horas_extras"));
				ob.setEspecie(rs.getInt("especie"));
				ob.setVariedad(rs.getInt("variedad"));
				ob.setFaena(rs.getInt("faena"));
				ob.setLabor(rs.getInt("labor"));
				ob.setValor(rs.getInt("valor"));
				ob.setValor_rendimiento(rs.getFloat("valor_rendimietno"));
				ob.setRendimiento(rs.getFloat("rendimiento"));
				ob.setTipo_pago(rs.getInt("tipo_trato"));
				ob.setValor_liquido(rs.getInt("valor_liquido"));
				ob.setBono1(rs.getInt("bono1"));
				ob.setBono2(rs.getInt("bono2"));
				ob.setMaquinaria(rs.getInt("maquinaria"));
				ob.setImplemento(rs.getInt("implemento"));
				ob.setFecha(rs.getString("fecha_rendimiento")); 
				ob.setNvnombre(rs.getString("nvnombre"));
				ob.setDescripcion(rs.getString("campo"));
				ob.setnVariedad(rs.getString("nVariedad"));
				ob.setnEspecie(rs.getString("nEspecie"));
//				ob.setnMaquinaria(rs.getString("nMaquinaria"));
//				ob.setnImplemento(rs.getString("nImplemento"));
				ob.setnFaena(rs.getString("nFaena"));
				ob.setnLabor(rs.getString("nLabor"));
				ob.setSupervisor(rs.getString("supervisor"));
				ob.setBase_piso_hora(rs.getInt("base_piso_hora"));
				ob.setIdContratista(rs.getString("contratista"));
				ob.setNestado(rs.getString("nestado"));
				ob.setValor_hx(rs.getFloat("valor_hx"));
				ob.setMonto_hx(rs.getFloat("monto_hx"));
				ob.setHx_dos(rs.getFloat("hx_dos"));
				ob.setValor_hx_dos(rs.getFloat("valor_hx_dos"));
				ob.setMacroco(rs.getString("macroco"));
				ob.setCeco(rs.getString("ceco"));
				ob.setOrdenco(rs.getString("ordenco"));
				ob.setRes_hx(rs.getInt("res_hx"));
				ob.setSubsidio(rs.getInt("subsidio"));
				ob.setCuartel(rs.getInt("rd.cuartel"));
				ob.setValor_trato(rs.getFloat("valor_trato"));
				if(valor == 0){
					ob.setCosto_empresa(rs.getInt("costo_empresa"));
				}
				lista.add(ob);
			}
			rs.close();
			ps.close();
			db.conn.close();
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error:" + e.getMessage());
		} finally {
			db.close();
		}
		return lista;
	}
	public String GENERAR_EXCEL_LISTADO(ArrayList<RENDIMIENTO_DIARIO> row) throws Exception{
		String urlDocGenerado = utils.reportesExcel();
		urlDocGenerado=urlDocGenerado+"listado"+".xlsx";
		File archivo = new File(urlDocGenerado);
		try {
			HSSFWorkbook workbook = new HSSFWorkbook();
	        HSSFSheet sheet = workbook.createSheet();
	        workbook.setSheetName(0, "Listado Rendimiento");
	        String[] headers = new String[]{
                "Fecha",
                "Supervisor",
                "Rut",
                "Trabajador",
                "Tipo",
                "Contratista",
                "Fundo",
                "Especie",
                "Variedad",
                "Cuartel",
                "Agrupación",
                "OrdenCO",
                "CeCO",
                "Faena",
                "Labor",
                "Horas Trabajadas",
                "Horas Extras",
                "Valor Horas Extras",
                "Valor Pagado",
                "Monto Horas Extras",
                "Horas Extras 2",
                "Valor Horas Extras 2",
                "Bono 2",
                "Base Piso",
                "Tipo Pago",
                "Valor",
                "Valor Trato",
                "Rendimiento",
                "Valor Rendimiento",
                "Bono",
                "Subsidio",
                "Valor Líquido",
                "Maquinaria",
                "Implemento",
                "Estado",
                "Costo Empresa"
	        };
	        CellStyle headerStyle = workbook.createCellStyle();
	        Font font = workbook.createFont();
	        font.setBold(true);
	        headerStyle.setFont(font);
	        
	        CellStyle style = workbook.createCellStyle();
	        style.setFillForegroundColor(IndexedColors.LIGHT_YELLOW.getIndex());
	        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
	        HSSFRow headerRow = sheet.createRow(0);
	        
	        for (int i = 0; i < headers.length; ++i) {
	            String header = headers[i];
	            HSSFCell cell = headerRow.createCell(i);
	            cell.setCellStyle(headerStyle);
	            cell.setCellValue(header);
	        }
	        int i = 1;
	        for(RENDIMIENTO_DIARIO rd: row){
	        	HSSFRow dataRow = sheet.createRow(i);
	        	dataRow.createCell(0).setCellValue(rd.getFecha());
	        	dataRow.createCell(1).setCellValue(rd.getSupervisor());
	        	dataRow.createCell(2).setCellValue(rd.getRut());
	        	dataRow.createCell(3).setCellValue(rd.getNombre());
	        	if(rd.getIdContratista().equals("0")){
	        		dataRow.createCell(4).setCellValue("PROPIO");
	        	}else{
	        		dataRow.createCell(4).setCellValue("CONTRATISTA");
	        	}
	        	dataRow.createCell(5).setCellValue(rd.getIdContratista());
	        	dataRow.createCell(6).setCellValue(rd.getCampo());
	        	dataRow.createCell(7).setCellValue(rd.getnEspecie());
	        	dataRow.createCell(8).setCellValue(rd.getnVariedad());
	        	dataRow.createCell(9).setCellValue(rd.getNvnombre());
	        	dataRow.createCell(10).setCellValue(rd.getMacroco());
	        	dataRow.createCell(11).setCellValue(rd.getOrdenco());
	        	dataRow.createCell(12).setCellValue(rd.getCeco());
	        	dataRow.createCell(13).setCellValue(rd.getnFaena());
	        	dataRow.createCell(14).setCellValue(rd.getnLabor());
	        	dataRow.createCell(15).setCellValue(rd.getHoras_trabajadas());
	        	dataRow.createCell(16).setCellValue(rd.getHoras_extras());
	        	dataRow.createCell(17).setCellValue(rd.getValor_hx());
	        	dataRow.createCell(18).setCellValue(rd.getRes_hx() + rd.getValor_hx());
	        	dataRow.createCell(19).setCellValue(rd.getMonto_hx());
	        	dataRow.createCell(20).setCellValue(rd.getHx_dos());
	        	dataRow.createCell(21).setCellValue(rd.getValor_hx_dos());
	        	dataRow.createCell(22).setCellValue(rd.getBono2());
	        	if(rd.getBase_piso_hora() == 1){
	        		dataRow.createCell(23).setCellValue("SI");
	        	}else{
	        		dataRow.createCell(23).setCellValue("NO");
	        	}
	        	if(rd.getTipo_pago() == 1){
	        		dataRow.createCell(24).setCellValue("DIA");
	        	}else if(rd.getTipo_pago() == 2){
	        		dataRow.createCell(24).setCellValue("TRATO");
	        	}else{
	        		dataRow.createCell(24).setCellValue("MIXTO");
	        	}
	        	dataRow.createCell(25).setCellValue(rd.getValor());
	        	dataRow.createCell(26).setCellValue(rd.getValor_trato());
	        	dataRow.createCell(27).setCellValue(String.valueOf(rd.getRendimiento()));
	        	dataRow.createCell(28).setCellValue(rd.getValor_rendimiento());
	        	dataRow.createCell(29).setCellValue(rd.getBono1());
	        	dataRow.createCell(30).setCellValue(rd.getSubsidio());
	        	dataRow.createCell(31).setCellValue(rd.getValor_liquido());
	        	dataRow.createCell(32).setCellValue(rd.getnMaquinaria());
	        	dataRow.createCell(33).setCellValue(rd.getnImplemento());
	        	dataRow.createCell(34).setCellValue(rd.getNestado());
	        	dataRow.createCell(35).setCellValue(rd.getCosto_empresa());
	        	i++;
	        }
	        HSSFRow dataRow = sheet.createRow(1 + row.size());
	        HSSFCell total = dataRow.createCell(31);
	        total.setCellType(CellType.FORMULA);
	        total.setCellStyle(style);
	        total.setCellFormula(String.format("SUM(AF2:AF%d)", 1 + row.size()));
	        FileOutputStream salida = new FileOutputStream(archivo);
	        workbook.write(salida);
	        workbook.close();
	        salida.close();
	        System.out.println("Archivo creado existosamente");
	        return archivo.getName();
		}catch (FileNotFoundException ex) {
			System.out.println("Archivo no localizable en sistema de archivos");
		    return "0";
		} catch (IOException ex) {
			System.out.println("Error de entrada/salida");
	        return "0";
		}
		//return false;
		//return "0";
	}
}
