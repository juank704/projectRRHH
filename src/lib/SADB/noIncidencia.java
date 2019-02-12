package lib.SADB;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.http.HttpSession;

import lib.classSA.CAMPO;
import lib.classSA.CUARTEL;
import lib.classSA.RENDIMIENTO_DIARIO;
import lib.classSA.detalleNoIncidencia;
import lib.classSA.incidenciaClass;
import lib.db.ConnectionDB;
import lib.sesionSA.SESION;
import lib.struc.incidencia;

public class noIncidencia {
	public static detalleNoIncidencia DETALLE_INCIDENCIA_CODIGO(int id) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		detalleNoIncidencia e = new detalleNoIncidencia();
		ConnectionDB db = new ConnectionDB();
		try{
			sql = "SELECT i.*, t.nombre AS trabajador, c.nombre AS ncuartel FROM incidencia i ";
			sql += "LEFT JOIN trabajadores t ON(i.usuario_ingreso = t.id) ";
			sql += "INNER JOIN cuartel c ON(c.codigo = i.cuartel) ";
			sql += "WHERE i.codigo = "+id;
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				e.setCodigo(rs.getInt("codigo"));
				e.setFecha_ingreso(rs.getString("fecha_ingreso"));
				e.setTipo_incidencia(rs.getString("tipo_incidencia"));
				e.setGeoreferencia(rs.getString("georeferencia"));
				e.setUsuario_ingreso(rs.getInt("usuario_ingreso"));
				e.setCuartel(rs.getInt("cuartel"));
				e.setObservacion(rs.getString("observacion"));
				e.setTrabajador(rs.getString("trabajador"));
				e.setNcuartel(rs.getString("ncuartel"));
				e.setImg(rs.getString("foto"));
			}
			rs.close();
			ps.close();
			db.conn.close();
		}catch(Exception ex){
			System.out.println("Error: "+ex.getMessage());
		}finally{
			db.close();
		}
		return e;
	}
	public static boolean CERRAR_INCIDENCIA(detalleNoIncidencia e,HttpSession httpSession) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "UPDATE incidencia SET usuario_cierre = ?, accion = ?, observacion_cierre = ?, fecha_cierre = ?, estado = 2 WHERE codigo = ?";
			ps = db.conn.prepareStatement(sql);
			ps.setInt(1, e.getUsuario_cierre());
			ps.setString(2, e.getAccion());
			ps.setString(3, e.getObservacion_cierre());
			ps.setString(4, e.getFecha_cierre());
			ps.setInt(5, e.getCodigo());
			ps.execute();
			SESION mc= new SESION(httpSession);
			mc.delIncidencia(e.getCodigo());
			mc.save();
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
	public static ArrayList<detalleNoIncidencia> GET_ALL_INCIDENCIA() throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<detalleNoIncidencia> lista = new ArrayList<detalleNoIncidencia>();
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "SELECT i.*, CONCAT(t.nombre,' ', t.apellidoPaterno) AS trabajador, c.nombre AS ncuartel, cam.campo, cam.descripcion ncampo "
					+ " FROM incidencia i ";
			sql += "LEFT JOIN trabajadores t ON(i.usuario_ingreso = t.id) ";
			sql += "INNER JOIN cuartel c ON(c.codigo = i.cuartel) "
					+ "  left join sector s on s.sector = c.sector"
					+ "	left join campo cam on cam.campo = s.campo"	
					+ " WHERE i.estado = 1";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				detalleNoIncidencia e = new detalleNoIncidencia();
				e.setCodigo(rs.getInt("codigo"));
				e.setFecha_ingreso(rs.getString("fecha_ingreso"));
				e.setTipo_incidencia(rs.getString("tipo_incidencia"));
				e.setGeoreferencia(rs.getString("georeferencia"));
				e.setUsuario_ingreso(rs.getInt("usuario_ingreso"));
				e.setCuartel(rs.getInt("cuartel"));
				e.setObservacion(rs.getString("observacion"));
				e.setTrabajador(rs.getString("trabajador"));
				e.setNcuartel(rs.getString("ncuartel"));
				e.setImg(rs.getString("foto"));
				e.setCampo(rs.getString("campo"));
				e.setNcampo(rs.getString("ncampo"));				
				lista.add(e);
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
}
