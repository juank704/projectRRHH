package lib.SADB;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.ArrayList;

import lib.classSA.CECO;
import lib.classSA.CUARTEL_PF;
import lib.db.ConnectionDB;

public class cuartel {
	

//----------------------------CUARTEL_PF------------------------------------
//	SELECT 
		public static ArrayList<CUARTEL_PF> getCPF (int codigo) throws Exception{
			PreparedStatement ps = null;
			String sql = "";
			ArrayList<CUARTEL_PF> lista = new ArrayList<CUARTEL_PF>();
			ConnectionDB db = new ConnectionDB();
			DecimalFormat nmf = new DecimalFormat("#.00");
			try {
				sql = "SELECT cpf.*, c.nombre, c.variedad , v.variedad nVariedad, v.fecha_estimada_cosecha, c.superficie, c.ceco, c.estado estadoP, c.ordenco, c.macroco  "
						+ " FROM cuartel_pf cpf "
						+ " left join cuartel c on c.codigo = cpf.cuartel "
						+ " left join variedad v on v.codigo = c.variedad  "
						+ " where codigo_pf=" +codigo+ " ";
				sql += " order by c.especie, v.variedad, c.nombre";
				ps = db.conn.prepareStatement(sql);
				ResultSet rs = ps.executeQuery(sql);
				while (rs.next()) {
					CUARTEL_PF ob = new CUARTEL_PF();
					ob.setCodigo(rs.getInt("codigo"));
					ob.setCodigo_pf(rs.getInt("codigo_pf"));
					ob.setCuartel(rs.getInt("cuartel"));
					ob.setHas(rs.getDouble("has"));
					ob.nCuartel = rs.getString("nombre");
					ob.has_real = rs.getDouble("has_real");
					ob.setMax(rs.getDouble("superficie"));
					ob.setnVariedad(rs.getString("nVariedad"));
					ob.setVariedad(rs.getInt("variedad"));
					ob.setEstado(rs.getString("estado"));
					ob.setFechaEstimadaCosecha(rs.getString("fecha_estimada_cosecha"));
					
					ob.setTipo(rs.getString("estadoP"));
					if(rs.getString("estadoP").equals("1")){
						ob.setCeco(rs.getString("ceco"));
					} else {
						ob.setCeco(rs.getString("ordenco"));
					}
					
					lista.add(ob); 
				}
				ps.close();
				rs.close();
				db.conn.close();
			} catch (SQLException e) {
				System.out.println("Error:" + e.getMessage());
			} catch (Exception e){
				System.out.println("Error:" + e.getMessage());
			}finally {
				db.close();
			}
			return lista;
		}	
//	Insert
		public static boolean insertCPF (CUARTEL_PF cpf) throws Exception {
			PreparedStatement ps = null;
			String sql = "";
			ConnectionDB db = new ConnectionDB();
			try {
				sql = "INSERT INTO cuartel_pf ( codigo_pf, cuartel, has,has_real,estado) VALUES (?,?,?,0,?)";
				ps = db.conn.prepareStatement(sql);
				ps.setInt(1, cpf.getCodigo_pf());
				ps.setInt(2, cpf.getCuartel());
				ps.setDouble(3, cpf.getHas());
				ps.setString(4, cpf.getEstado());
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
		public static boolean insertCPBloque (CUARTEL_PF cpf) throws Exception {
			PreparedStatement ps = null;
			String sql = "";
			ConnectionDB db = new ConnectionDB();
			try {
				sql = "INSERT INTO cuartel_bloque ( codigo_bloque, cuartel, has) VALUES (?,?,?)";
				ps = db.conn.prepareStatement(sql);
				ps.setInt(1, cpf.getCodigo_pf());
				ps.setInt(2, cpf.getCuartel());
				ps.setDouble(3, cpf.getHas());
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
//		DELETE
		public static boolean deleteCPF(int id, String table) throws Exception {
			PreparedStatement ps = null;
			String sql = "";
			ConnectionDB db = new ConnectionDB();
			try {
				sql = "DELETE FROM "+table+" where codigo_pf='"+id+"'";
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
//-------------------------fin CUARTEL_PF----------------------------

	
	
	
	
//----------------CECO---------------------------------
//	SELECT
	public static ArrayList<CECO> GETCECO (int campo) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<CECO> lista  = new ArrayList<CECO>();
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "select * from ceco where campo =  '"+campo+"' not in (select ceco from cuartel);";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				CECO ob = new CECO();
				ob.setCodigo(rs.getInt("codigo"));
				ob.setCeco(rs.getString("ceco"));
				ob.setCampo(rs.getString("campo"));
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
	public static ArrayList<CECO> GET_ALL_CECO() throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<CECO> lista  = new ArrayList<CECO>();
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "select * from ceco;";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				CECO ob = new CECO();
				ob.setCodigo(rs.getInt("codigo"));
				ob.setCeco(rs.getString("ceco"));
				ob.setCampo(rs.getString("campo"));
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
	
	
	//UPDATE CONFIRMACION DATOS REALES APLICADOS
	public static boolean confirmCPF (CUARTEL_PF cpf) throws Exception {
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "UPDATE cuartel_pf SET has_real = "+cpf.has_real+" where codigo = "+cpf.codigo;
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

}
