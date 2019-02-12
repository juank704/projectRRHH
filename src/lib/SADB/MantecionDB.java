package lib.SADB;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.apache.poi.ss.formula.functions.Code;

import lib.classSA.RENDIMIENTO_DIARIO;
import lib.classSA.gestion_material;
import lib.classSA.motivo_ingreso;
import lib.classSA.reingreso_taller;
import lib.classSA.taller;
import lib.classSW.trabajador;
import lib.db.ConnectionDB;

public class MantecionDB {
	public static ArrayList<motivo_ingreso> GET_MOTIVO_INGRESO ()throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<motivo_ingreso> lista = new ArrayList<motivo_ingreso>();
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "SELECT * FROM maestro_motivos_ingreso";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				motivo_ingreso ob = new motivo_ingreso();
				ob.setCodigo(rs.getInt("codigo"));
				ob.setDescripcion(rs.getString("descripcion"));
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
	public static ArrayList<trabajador> GET_OPERADOR ()throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<trabajador> lista = new ArrayList<trabajador>();
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "SELECT * FROM trabajador WHERE idPerfil != 7";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				trabajador e = new trabajador();
				e.setIdTrabajador(rs.getInt("idTrabajador"));
				e.setRut(rs.getString("rut"));
				e.setNombre(rs.getString("nombre"));
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
	public static boolean ADD_TALLER(taller tl) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "INSERT INTO taller (campo, tipo, vehiculo, motivo, causa, fecha, operador, horometro, observacion, nreserva,estado) VALUES(?,?,?,?,?,?,?,"+String.valueOf(tl.getHorometro())+",?,?,0)";
			ps = db.conn.prepareStatement(sql);
			ps.setString(1, tl.getCampo());
			ps.setString(2, tl.getTipo());
			ps.setInt(3, tl.getVehiculo());
			ps.setString(4, tl.getMotivo());
			ps.setInt(5, tl.getCausa());
			ps.setString(6, tl.getFecha());
			ps.setString(7, tl.getOperador());
			ps.setString(8, tl.getObservacion());
			ps.setString(9,tl.getNreserva());
			ps.execute();
			System.out.println(ps);
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
	public static boolean ADD_REINGRESO_TALLER(reingreso_taller t) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "INSERT INTO reingreso_taller (ingreso, horometro_reingreso, estado_reingreso, fecha_reingreso) VALUES(?,?,?,?)";
			ps = db.conn.prepareStatement(sql);
			ps.setInt(1, t.getIngreso());
			ps.setFloat(2, t.getHorometro_reingreso());
			ps.setInt(3, t.getEstado_reingreso());
			ps.setString(4, t.getFecha_reingreso());
			ps.execute();
			UPD_ESTADO_TALLER(t.getIngreso(), 0);
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
	public static ArrayList<taller> GET_TALLER_ALL (String[] campo)throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<taller> lista = new ArrayList<taller>();
		ConnectionDB db = new ConnectionDB();
		try {
			String sqlCampos = "";
			int c = 0;
			for(int i = 0; i < campo.length; i++){
				if(c == 0){
					sqlCampos += " '"+campo[i]+"'";
				}else{
					sqlCampos += ", '"+campo[i]+"'";
				}
				c++;
			}
			sql = "SELECT tl.*,case when tl.tipo = 'V' then tl.operador else CONCAT(tr.nombre, ' ', tr.apellidoPaterno) end nombreOperador, mi.descripcion as motivoIngreso ";
			sql += "FROM taller tl ";
			sql += "left join trabajadores tr on tr.id = tl.operador ";
			sql += "left join maestro_motivos_ingreso mi on mi.codigo = tl.motivo";
			sql += " where tl.estado != 1 and campo IN ("+sqlCampos+") ORDER BY tl.codigo";
			System.out.println(sql);
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				taller e = new taller();
				e.setCodigo(rs.getInt("codigo"));
				e.setCampo(rs.getString("campo"));
				e.setTipo(rs.getString("tipo"));
				e.setVehiculo(rs.getInt("vehiculo"));
				e.setMotivo(rs.getString("motivoIngreso"));
				e.setFecha(rs.getString("fecha"));
				e.setOperador(rs.getString("nombreOperador"));
				e.setHorometro(rs.getFloat("horometro"));
				e.setObservacion(rs.getString("observacion"));
				e.setEstado(rs.getInt("estado"));
				e.setNreserva(rs.getString("nreserva"));
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
	
	public static boolean CERRAR_INGRESO_TALLER(taller tl) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "UPDATE taller SET estado = 1, fecha_cierre =?, horometro_cierre = ?, dgtco_dfnvo = ?, recomendacion = ? WHERE codigo = ?";
			ps = db.conn.prepareStatement(sql);
			ps.setString(1, tl.getFechaCierre());
			ps.setFloat(2, tl.getHoroCierre());
			ps.setString(3, tl.getDgtco_dfnvo());
			ps.setString(4, tl.getRecomendacion());
			ps.setInt(5, tl.getCodigo());
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
	
	public static boolean UPDATE_RESERVA_SOLPED(String  codigo, String numero) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		try {
			
			sql = "UPDATE taller SET nreserva = "+numero+"  WHERE codigo = "+codigo;
			
			ps = db.conn.prepareStatement(sql);
			//ps.setString(1, numero);
			//ps.setString(2, codigo);
			
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
	public static void UPD_ESTADO_TALLER (int codigo, int estado) throws Exception {
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "UPDATE taller SET estado = "+estado+" WHERE codigo = "+codigo;
			ps = db.conn.prepareStatement(sql);
			ps.execute();
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error:" + e.getMessage());
		} finally {
			 ps.close();
			 db.close();
		}
	}
	public static boolean INSERT_GESTION_MATERIAL(String  folio, String numero, int tipo) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "INSERT INTO gestion_material(folio, numero, tipo) VALUES ("+folio+", '"+numero+"', "+tipo+")";
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
	public static boolean UPDATE_GESTION_MATERIAL(String  reserva, String consumo, String devolucion) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "UPDATE gestion_material set consumo = '"+consumo+"', devolucion = '"+devolucion+"' where numero = '"+reserva+"' and tipo = 1 and id > 0";
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
	public static ArrayList<gestion_material> GET_DETALLE_SAP (int folio)throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<gestion_material> lista = new ArrayList<gestion_material>();
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "SELECT * FROM gestion_material WHERE folio = "+folio;
			System.out.println(sql);
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				gestion_material e = new gestion_material();
				e.setId(rs.getInt("id"));
				e.setFolio(rs.getInt("folio"));
				e.setNumero(rs.getString("numero"));
				e.setTipo(rs.getInt("tipo"));
				e.setConsumo(rs.getString("consumo"));
				e.setDevolucion(rs.getString("devolucion"));
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
	public static boolean DELETE_GESTION_MATERIAL (int id)throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "DELETE FROM gestion_material where id = "+id; 
			ps = db.conn.prepareStatement(sql);
			ps.execute();
			return true;
		} catch (SQLException e){
			System.out.println("Error:" + e.getMessage());		
		} catch (Exception e) {
			System.out.println("Error:" + e.getMessage());
		}finally {
			ps.close();
			db.conn.close();
		}
		return false;
	}
	public static ArrayList<taller> GET_MAQUINAS_EN_TALLER (String fecha)throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<taller> lista = new ArrayList<taller>();
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "select *from taller where fecha <= '"+fecha+"' AND (fecha_cierre >= '"+fecha+"' OR fecha_cierre IS NULL);";
			System.out.println(sql);
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				taller e = new taller();
				e.setCodigo(rs.getInt("codigo"));
				e.setCampo(rs.getString("campo"));
				e.setTipo(rs.getString("tipo"));
				e.setVehiculo(rs.getInt("vehiculo"));
				e.setFecha(rs.getString("fecha"));
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
}
