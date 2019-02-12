package lib.db.sw;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import lib.classSW.Divisas;

import lib.classSW.RHCalculo;
import lib.classSW.sociedad;
import lib.db.ConnectionDB;

public class rhcalculoDB {

	public static boolean updateRHCalculo(RHCalculo calculo) throws SQLException {
		PreparedStatement ps= null;
		ConnectionDB db= new ConnectionDB();
		
		
		
		try{
			String sql="UPDATE sw_rhcalculo SET concepto=?, idMoneda=?, valor=?, idSociedad=?, modificado=?, idUsuario=? WHERE idCalculo="+calculo.getIdCalculo();
			ps = db.conn.prepareStatement(sql);
			ps.setString(1, calculo.getConcepto());
			ps.setInt(2, calculo.getMoneda());
			ps.setDouble(3, calculo.getValor());
			ps.setInt(4, calculo.getIdSociedad());
			ps.setString(5, calculo.getModificado());
			ps.setInt(6, calculo.getIdUsuario());
			ps.executeUpdate();
			return true;
			
			
		}
		catch(Exception ex){
			return false;
		}
		finally{
			db.conn.close();
		}
	}
	public static RHCalculo getConceptoById(int id) throws SQLException
	{
		PreparedStatement ps = null;
		String sql="";
		ConnectionDB db = new ConnectionDB();
		RHCalculo rhc=new RHCalculo();
		try{
			sql = "select idCalculo, concepto, idMoneda FROM sw_rhcalculo2 WHERE idCalculo="+id+" limit 1";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);	
			while(rs.next()){
				RHCalculo r=new RHCalculo();
				r.setIdCalculo(rs.getInt("idCalculo"));
				r.setConcepto(rs.getString("concepto"));
				r.setMoneda(rs.getInt("idMoneda"));
				rhc=r;
			}
		}
		catch(Exception e){
			System.out.println("Error: " + e.getMessage());
		}
		finally{
			db.conn.close();
		}
		return rhc;	
	} 
	public static RHCalculo getRHCalculoById(int id) throws SQLException {
		PreparedStatement ps = null;
		String sql="";
		ConnectionDB db = new ConnectionDB();
		RHCalculo rhc=new RHCalculo();
		try{
			sql = "SELECT * FROM sw_rhcalculo JOIN sw_rhmoneda ON sw_rhcalculo.idMoneda=sw_rhmoneda.idMoneda JOIN sociedad ON sw_rhcalculo.idSociedad=sociedad.idSociedad where idCalculo="+id;
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);	
			while(rs.next()){
				RHCalculo r=new RHCalculo();
				sociedad s=new sociedad();
				Divisas m= new Divisas();
				s.setIdSociedad(rs.getInt("idSociedad"));
				s.setDenominacionSociedad(rs.getString("denominacionSociedad"));
				s.setSociedad(rs.getString("sociedad"));
				r.setSoc(s);
				
				r.setIdCalculo(rs.getInt("idCalculo"));
				r.setConcepto(rs.getString("concepto"));
				r.setMoneda(rs.getInt("idMoneda"));
				m.setIdMoneda(rs.getInt("idMoneda"));
				m.setMoneda(rs.getString("moneda"));
				r.setMon(m);
				
				r.setValor(rs.getDouble("valor"));
				r.setIdSociedad(rs.getInt("idSociedad"));
				r.setModificado(rs.getString("modificado"));
				r.setIdUsuario(rs.getInt("idUsuario"));
				
				
				
				rhc=r;
			}	
			
			
			
			
		}
		catch(Exception e){
			System.out.println("Error: " + e.getMessage());
		}
		finally{
			db.conn.close();
		}
		return rhc;	
	}

	public static ArrayList<RHCalculo> getAllRHCalculos() throws SQLException {
		PreparedStatement ps = null;
		String sql="";
		ConnectionDB db = new ConnectionDB();
		ArrayList<RHCalculo> rhc=new ArrayList<RHCalculo>();
		try{
			sql = "SELECT * FROM sw_rhcalculo";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);	
			while(rs.next()){
				RHCalculo r=new RHCalculo();
				sociedad s=new sociedad();
				Divisas m= new Divisas();
				s.setIdSociedad(rs.getInt("idSociedad"));
				r.setSoc(s);
				r.setIdCalculo(rs.getInt("idCalculo"));
				r.setConcepto(rs.getString("concepto"));
				r.setMoneda(rs.getInt("idMoneda"));
				m.setIdMoneda(rs.getInt("idMoneda"));
				r.setMon(m);
				r.setValor(rs.getDouble("valor"));
				r.setIdSociedad(rs.getInt("idSociedad"));
				r.setModificado(rs.getString("modificado"));
				r.setIdUsuario(rs.getInt("idUsuario"));
				
				
				
				rhc.add(r);
			}	
			
			
			
			
		}
		catch(Exception e){
			System.out.println("Error: " + e.getMessage());
		}
		finally{
			db.conn.close();
		}
		return rhc;	
		}
	

}
