package lib.db.sw;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import lib.classSW.CentroCostoTrabajador;
import lib.db.ConnectionDB;

public class CentroCostoTrabajadorDB {

	//Insert CentroCostoTrabajador
	public static boolean insertCentroCostoTrabajador(CentroCostoTrabajador CentroCostoTrabajador) throws Exception {

		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		int i = 1;


		try{

			sql = "INSERT INTO sw_r_centroCostoTrabajador "
					+ " ( "
					+ " idCentroCostoTrabajador, "
					+ " idTrabajador, "
					+ " idDivision, "
					+ " idSubDivision, "
					+ " porcentaje "
					+ "  ) "
					+ " VALUES "
					+ " (?,?,?,?,?)";

			ps = db.conn.prepareStatement(sql);

			ps.setInt(i++, CentroCostoTrabajador.getIdCentroCostoTrabajador());
			ps.setInt(i++, CentroCostoTrabajador.getIdTrabajador());
			ps.setInt(i++, CentroCostoTrabajador.getIdDivision());
			ps.setInt(i++, CentroCostoTrabajador.getIdSubDivision());
			ps.setDouble(i++, CentroCostoTrabajador.getPorcentaje());

			ps.execute();

			return true;

		}catch(Exception e){

			System.out.println("Error insertCentroCostoTrabajador:" + e.getMessage());
			e.printStackTrace();

		}finally{
			db.conn.close();
		}

		return false;
	}


	//Obtener Todos las CentroCostoTrabajadores
	public static ArrayList<CentroCostoTrabajador> getCentroCostoTrabajador() throws Exception {

		PreparedStatement ps = null;
		String sql="";
		ArrayList<CentroCostoTrabajador> lista = new ArrayList<CentroCostoTrabajador>();
		ConnectionDB db = new ConnectionDB();

		try{

			sql = "select * from sw_r_centroCostoTrabajador";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);

			while(rs.next()){
				CentroCostoTrabajador sc = new CentroCostoTrabajador();

				sc.setIdCentroCostoTrabajador(rs.getInt("idCentroCostoTrabajador"));
				sc.setIdTrabajador(rs.getInt("idTrabajador"));
				sc.setIdDivision(rs.getInt("idDivision"));
				sc.setIdSubDivision(rs.getInt("idSubDivision"));
				sc.setPorcentaje(rs.getInt("porcentaje"));

				lista.add(sc);
			}


		}catch (Exception e){
			System.out.println("Error: " + e.getMessage());
		}finally {
			ps.close();
			db.close();
		}		

		return lista;

	}


	//Obtener CentroCostoTrabajador por Id
	public static CentroCostoTrabajador getCentroCostoTrabajadorById(String id)  throws Exception{

		PreparedStatement ps = null;
		String sql="";
		ConnectionDB db = new ConnectionDB();

		CentroCostoTrabajador sc = new CentroCostoTrabajador();

		try{
			sql = "SELECT * FROM sw_r_centroCostoTrabajador WHERE idCentroCostoTrabajador = '"+id+"'";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);

			while(rs.next()){

				sc.setIdCentroCostoTrabajador(rs.getInt("idCentroCostoTrabajador"));
				sc.setIdTrabajador(rs.getInt("idTrabajador"));
				sc.setIdDivision(rs.getInt("idDivision"));
				sc.setIdSubDivision(rs.getInt("idSubDivision"));
				sc.setPorcentaje(rs.getInt("porcentaje"));

			}			
		}catch (Exception e){
			System.out.println("Error: " + e.getMessage());
		}finally {
			ps.close();
			db.close();
		}		
		return sc;
	}



	//Actualizar CentroCostoTrabajador
	public static boolean updateCentroCostoTrabajador(CentroCostoTrabajador CentroCostoTrabajador) throws  Exception{

		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB  db = new ConnectionDB();	
		int i = 1;

		try {

			sql = ""
					+ " UPDATE sw_r_centroCostoTrabajador "
					+ " SET "
					+ " idTrabajador = ?, "
					+ " idDivision = ?, "
					+ " idSubDivision = ?, "
					+ " porcentaje = ? "
					+ " WHERE idCentroCostoTrabajador = ?";

			ps = db.conn.prepareStatement(sql);

			ps.setInt(i++, CentroCostoTrabajador.getIdTrabajador());
			ps.setInt(i++, CentroCostoTrabajador.getIdDivision());
			ps.setInt(i++, CentroCostoTrabajador.getIdSubDivision());
			ps.setDouble(i++, CentroCostoTrabajador.getPorcentaje());
			ps.setInt(i++, CentroCostoTrabajador.getIdCentroCostoTrabajador());

			ps.execute();

			return true;

		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
			e.printStackTrace();
		}catch (Exception e) {
			System.out.println("Error: " + e.getMessage());
		}finally {
			ps.close();
			db.close();
		}		
		return false;
	}


}
