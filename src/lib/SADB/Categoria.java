package lib.SADB;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

//import org.junit.experimental.categories.Categories;

import lib.classSA.CALIBRE;
import lib.classSA.CATEGORIA;
import lib.classSA.RENDIMIENTO_GENERAL;
import lib.classSA.estado_fenologico;
import lib.classSA.estimacion_productiva;
import lib.classSA.parametros_estimacion;
import lib.db.ConnectionDB;

public class Categoria {

//	INSERT
	public static boolean ADD_Categoria(CATEGORIA c) throws Exception{
		PreparedStatement ps = null;
		 String sql = "";
		 ConnectionDB db = new ConnectionDB();
		 try {
			 sql = "INSERT INTO mantenedor_sa(categoria, descripcion, cod_campo, cod_especie, estado) VALUES('CATEGORIA',?,'1',?,'1')";
			 System.out.println(sql);
			 ps = db.conn.prepareStatement(sql);
			 ps.setString(1, c.getDescripcion());
			 ps.setInt(2, c.getCod_especie());
			 ps.execute();
			 return true;
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());;
		} catch (Exception e){
			System.out.println("Error:" + e.getMessage());
		}finally {
			ps.close();
			db.close();
		}
		 return false;
	}
	
	public static boolean UPDATE_Categoria (CATEGORIA c) throws Exception {
		PreparedStatement ps = null;
		 String sql = "";
		 ConnectionDB db = new ConnectionDB();
		 try {
			sql = " UPDATE mantenedor_sa set descripcion='" +c.getDescripcion()+ "', "
				+ " cod_especie='"+c.getCod_especie()+"' where codigo='" +c.getCodigo()+ "'";
			System.out.println(sql);
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
	
	public static boolean UP_EstadoFenologico_Estado(estado_fenologico es) throws Exception {
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "UPDATE estado_fenologico set estado=0 where codigo='"+es.getCodigo()+"'";
			ps = db.conn.prepareStatement(sql);
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
	
	public static boolean UP_Categoria_Estado(CATEGORIA es) throws Exception {
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "UPDATE mantenedor_sa set estado=0 where codigo='"+es.getCodigo()+"'";
			System.out.println(sql);
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
	public static boolean ADD_PARAMETRO_ESTIMACION(parametros_estimacion c) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		try {
			if (c.getCodigo() == 0) {
				sql = "INSERT INTO parametros_estimacion(campo, especie, id, tipo, descripcion, formula) VALUES(?,?,?,?,?,?)";
				ps = db.conn.prepareStatement(sql);
				ps.setString(1, c.getCampo());
				ps.setString(2, c.getEspecie());
				ps.setString(3, c.getId());
				ps.setInt(4, c.getTipo());
				ps.setString(5, c.getDescripcion());
				ps.setString(6, c.getFormula());
			}else{
				sql = "UPDATE parametros_estimacion SET id = ?, tipo = ?, descripcion = ?, formula = ? WHERE codigo = ?";
				ps = db.conn.prepareStatement(sql);
				ps.setString(1, c.getId());
				ps.setInt(2, c.getTipo());
				ps.setString(3, c.getDescripcion());
				ps.setString(4, c.getFormula());
				ps.setInt(5, c.getCodigo());
			}
			ps.execute();
			return true;
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
			;
		} catch (Exception e) {
			System.out.println("Error:" + e.getMessage());
		} finally {
			ps.close();
			db.close();
		}
		return false;
	}
	public static ArrayList<parametros_estimacion> GET_PARAMETRO_ESTIMACION(String campo, int especie) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<parametros_estimacion> data = new ArrayList<parametros_estimacion>();
		ConnectionDB db = new ConnectionDB();
		try{
		sql = "SELECT *FROM parametros_estimacion WHERE campo = '"+campo+"' AND especie = '"+especie+"'";
		ps = db.conn.prepareStatement(sql);
		ResultSet rs = ps.executeQuery(sql);
		while (rs.next()) {
			parametros_estimacion e = new parametros_estimacion();
			e.setCodigo(rs.getInt("codigo"));
			e.setCampo(rs.getString("campo"));
			e.setEspecie(rs.getString("especie"));
			e.setId(rs.getString("id"));
			e.setTipo(rs.getInt("tipo"));
			e.setDescripcion(rs.getString("descripcion"));
			e.setFormula(rs.getString("formula"));
			data.add(e);
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
		return data;
	}
	public static boolean DELETE_PARAMETRO_ESTIMACION(int codigo) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		
		try{
			sql = "DELETE FROM parametros_estimacion WHERE codigo = "+codigo+"";
			ps = db.conn.prepareStatement(sql);
			
			ps.execute();
			ps.close();
			return true;
		}catch(Exception ex){
			System.out.println("Error: "+ex.getMessage());
		}finally{
			db.close();
		}
		return false;
	}
	public static boolean ADD_ESTIMACION_PRODUCTIVA(estimacion_productiva c) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		try {
			if (c.getCodigo_e() == 0) {
				sql = "INSERT INTO estimacion_productiva(campo, especie, cuartel, kep, ke, kxp, kx, ct, cth) VALUES(?,?,?,?,?,?,?,?,?)";
				ps = db.conn.prepareStatement(sql);
				ps.setString(1, c.getCampo());
				ps.setString(2, c.getEspecie());
				ps.setInt(3, c.getCuartel());
				ps.setFloat(4, c.getKep());
				ps.setFloat(5, c.getKe());
				ps.setFloat(6, c.getKxp());
				ps.setFloat(7, c.getKx());
				ps.setFloat(8, c.getCt());
				ps.setFloat(9, c.getCth());
			}else{
				sql = "UPDATE estimacion_productiva SET kep = ?, ke = ?, kxp = ?, kx = ?, ct = ?, cth = ? WHERE codigo = ?";
				ps = db.conn.prepareStatement(sql);
				ps.setFloat(1, c.getKep());
				ps.setFloat(2, c.getKe());
				ps.setFloat(3, c.getKxp());
				ps.setFloat(4, c.getKx());
				ps.setFloat(5, c.getCt());
				ps.setFloat(6, c.getCth());
				ps.setInt(7, c.getCodigo_e());
			}
			ps.execute();
			return true;
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
			;
		} catch (Exception e) {
			System.out.println("Error:" + e.getMessage());
		} finally {
			ps.close();
			db.close();
		}
		return false;
	}
	public static ArrayList<estimacion_productiva> GET_ESTIMACION_PRODUCTIVA(String campo, int especie, int cuartel) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<estimacion_productiva> data = new ArrayList<estimacion_productiva>();
		ConnectionDB db = new ConnectionDB();
		try{
			sql = "SELECT pe.*, e.*, e.codigo AS codigo_e FROM parametros_estimacion pe ";
			sql += "left join estimacion_productiva e on (pe.campo = e.campo AND pe.especie = e.especie) ";
			sql += "WHERE pe.campo = '"+campo+"' AND pe.especie = '"+especie+"' AND e.cuartel = "+cuartel;
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while (rs.next()) {
				estimacion_productiva e = new estimacion_productiva();
				e.setCodigo(rs.getInt("codigo"));
				e.setCampo(rs.getString("campo"));
				e.setEspecie(rs.getString("especie"));
				e.setId(rs.getString("id"));
				e.setTipo(rs.getInt("tipo"));
				e.setDescripcion(rs.getString("descripcion"));
				e.setFormula(rs.getString("formula"));
				
				e.setCodigo_e(rs.getInt("codigo_e"));
				e.setCuartel(rs.getInt("cuartel"));
				e.setKep(rs.getFloat("kep"));
				e.setKe(rs.getFloat("ke"));
				e.setKxp(rs.getFloat("kxp"));
				e.setCt(rs.getFloat("ct"));
				e.setCth(rs.getFloat("cth"));
				data.add(e);
			}
			rs.close();
			ps.close();
			db.conn.close();
		}catch (SQLException e){
			System.out.println("Error dsfs:" + e.getMessage());
		}catch (Exception e){
			System.out.println("Error:" + e.getMessage());
		}finally {
			db.close();
		}
		return data;
	}
}
