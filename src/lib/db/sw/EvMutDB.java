package lib.db.sw;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import lib.classSW.EvMut;
import lib.classSW.trabajadores;
import lib.db.ConnectionDB;

public class EvMutDB {
	/*------------------Debug For SQL SENTENCES------------------------------*/
	public static ResultSet getQuery(String query) throws SQLException
	{
		PreparedStatement ps = null;
		String sql=query;
		ConnectionDB db = new ConnectionDB();
		ResultSet rs = null;
		
		try{
			ps = db.conn.prepareStatement(sql);
			rs = ps.executeQuery(sql);

			return rs;		
		}catch (Exception e){
			System.out.println("Error: " + e.getMessage());
			
		}finally {
			ps.close();
			db.close();
		}		
		return rs;
	}
	/*------------------blanks------------------------------*/	
	
/*------------------CRUD------------------------------*/	
	
	
	
	/*------------------CREATE---------------------*/	
	
	
	
	/*------------------DELETE---------------------*/
	
	
	public static boolean createEvMut(EvMut evento) throws SQLException {
		PreparedStatement ps= null;
		ConnectionDB db= new ConnectionDB();
		
		
		try{
		String sql="INSERT INTO sw_m_eventos_mutualidad (fechaRegistro, rut, nombreTrabajador, apellidoTrabajador, edadTrabajador, fechaContrato, fechaHoraAccidente, ubicacionAccidente, actividadTrabajador, lugarTrabajador, consecuencia, tipoPeligro, causaAccidente, accionMejora, responsableMejora, plazoMejora, nombreJefe, apellidoJefe, cargoJefe, division, subdivision, idCargo, idLicencia, idUsuario) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		ps = db.conn.prepareStatement(sql);
		ps.setString(1,evento.getFechaRegistro());
		ps.setString(2,evento.getRut());
		ps.setString(3,evento.getNombreTrabajador());
		ps.setString(4,evento.getApellidoTrabajador());
		ps.setInt(5,evento.getEdadTrabajador());
		ps.setString(6,evento.getAnosAntiguedad());
		ps.setString(7,evento.getFechaHoraAccidente());
		ps.setString(8,evento.getUbicacionAccidente());
		ps.setString(9,evento.getActividadTrabajador());
		ps.setString(10,evento.getLugarTrabajador());
		ps.setString(11,evento.getConsecuencia());
		ps.setInt(12,evento.getTipoPeligro());
		ps.setString(13,evento.getCausaAccidente());
		ps.setString(14,evento.getAccionMejora());
		ps.setString(15,evento.getResponsableMejora());
		ps.setString(16,evento.getPlazoMejora());
		ps.setString(17,evento.getNombreJefe());
		ps.setString(18,evento.getApellidoJefe());
		ps.setInt(19,evento.getCargoJefe());
		ps.setInt(20,evento.getDivision());
		ps.setString(21,evento.getSubdivision());
		ps.setInt(22,evento.getIdCargo());
		ps.setInt(23,evento.getIdLicencia());
		ps.setInt(24,evento.getIdUsuario());
		
		
		ps.execute();
		return true;
		}
		catch(Exception ex){
			return false;
		}
		finally{
			db.conn.close();
		}
	}

	
	public static boolean updateEvMut(EvMut evento) throws  Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB  db = new ConnectionDB();	
		try {

			sql = "Update sw_m_eventos_mutualidad set "
				+ "nombreJefe = '"+ evento.getNombreJefe()+"', "
				+"ubicacionAccidente = '"+evento.getUbicacionAccidente()+"',"
				+"actividadTrabajador = '"+evento.getActividadTrabajador()+"',"
				+"lugarTrabajador = '"+evento.getLugarTrabajador()+"',"
				+"consecuencia =  '"+evento.getConsecuencia()+"',"
				+"tipoPeligro =  "+evento.getTipoPeligro()+","
				+"causaAccidente = '"+evento.getCausaAccidente()+"',"
				+"accionMejora = '"+evento.getAccionMejora()+"',"
				+"responsableMejora = '"+evento.getResponsableMejora()+"',"
				+"plazoMejora = '"+evento.getPlazoMejora()+"',"
				+"apellidoJefe =  '"+evento.getApellidoJefe()+"',"
				+"cargoJefe = "+evento.getCargoJefe()+", "
				+"hora_accidente = '"+evento.getFechaHoraAccidente()+"', "
				+"estado = "+evento.getEstado()+" "
				+ "where idEventosMutualidad = "+evento.getIdEventosMutualidad()+""; 
			
			
			System.out.println(sql);
			ps = db.conn.prepareStatement(sql);
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
	
	
	public static EvMut getEvMutById(int id) throws SQLException {
		
		//Gson g= new Gson();
		
		
		
		PreparedStatement ps = null;
		String sql="";
		EvMut eventoO=new EvMut(); 
		ConnectionDB db = new ConnectionDB();
		try{
			sql = "select * from sw_m_eventos_mutualidad WHERE idEventosMutualidad="+id;
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);			
			while(rs.next()){
				
				
				EvMut evento= new EvMut();				
				evento.setIdEventosMutualidad(rs.getInt("idEventosMutualidad"));				
				evento.setFechaRegistro(rs.getString("fechaRegistro"));
				evento.setRut(rs.getString("rut"));
				evento.setNombreTrabajador(rs.getString("nombreTrabajador"));			
				evento.setApellidoTrabajador(rs.getString("apellidoTrabajador"));
				evento.setEdadTrabajador(rs.getInt("edadTrabajador"));
				evento.setAnosAntiguedad(rs.getString("fechaContrato"));
				evento.setFechaHoraAccidente(rs.getString("fechaHoraAccidente"));
				evento.setUbicacionAccidente(rs.getString("ubicacionAccidente"));
				evento.setActividadTrabajador(rs.getString("actividadTrabajador"));
				evento.setLugarTrabajador(rs.getString("lugarTrabajador"));
				evento.setConsecuencia(rs.getString("consecuencia"));
				evento.setTipoPeligro(rs.getInt("tipoPeligro"));
				evento.setCausaAccidente(rs.getString("causaAccidente"));
				evento.setAccionMejora(rs.getString("accionMejora"));
				evento.setResponsableMejora(rs.getString("responsableMejora"));
				evento.setPlazoMejora(rs.getString("plazoMejora"));
				evento.setNombreJefe(rs.getString("nombreJefe"));
				evento.setApellidoJefe(rs.getString("apellidoJefe"));
				evento.setCargoJefe(rs.getInt("cargoJefe"));
				evento.setDivisionstring(rs.getString("division"));
				evento.setSubdivision(rs.getString("subdivision"));
				evento.setIdCargo(rs.getInt("idCargo"));
				evento.setIdLicencia(rs.getInt("idLicencia"));
				evento.setIdUsuario(rs.getInt("idUsuario"));
				evento.setOficioTrabajador(rs.getString("oficio_trabajador"));
				evento.setFecha_hasta(rs.getString("fechaHasta"));
				evento.setHora_accidente(rs.getString("hora_accidente"));
				evento.setEstado(rs.getInt("estado"));
				
				eventoO=evento;
			}		

		}catch (Exception e){
			System.out.println("Error: " + e.getMessage());
		}finally {
			ps.close();
			db.close();
		}		
		return eventoO;
	}
	public static EvMut getBlankEvMut() {
		new ConnectionDB();
		EvMut evento = new EvMut();

		return evento.createBlankEvMut();
	}
	public static ArrayList<EvMut> getAllEvMut() throws SQLException {
		PreparedStatement ps = null;
		String sql="";
		ConnectionDB db = new ConnectionDB();
		ArrayList<EvMut> lista=new ArrayList<EvMut>();
		try{
			sql = "select * from sw_m_eventos_mutualidad order by nombreTrabajador ASC";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);			
			while(rs.next()){				
				EvMut evento= new EvMut();				
				evento.setIdEventosMutualidad(rs.getInt("idEventosMutualidad"));				
				evento.setFechaRegistro(rs.getString("fechaRegistro"));
				evento.setRut(rs.getString("rut"));
				evento.setNombreTrabajador(rs.getString("nombreTrabajador"));
				evento.setApellidoTrabajador(rs.getString("apellidoTrabajador"));
				evento.setEdadTrabajador(rs.getInt("edadTrabajador"));
				evento.setAnosAntiguedad(rs.getString("fechaContrato"));
				evento.setFechaHoraAccidente(rs.getString("fechaHoraAccidente"));
				evento.setUbicacionAccidente(rs.getString("ubicacionAccidente"));
				evento.setActividadTrabajador(rs.getString("actividadTrabajador"));
				evento.setLugarTrabajador(rs.getString("lugarTrabajador"));
				evento.setConsecuencia(rs.getString("consecuencia"));
				evento.setTipoPeligro(rs.getInt("tipoPeligro"));
				evento.setCausaAccidente(rs.getString("causaAccidente"));
				evento.setAccionMejora(rs.getString("accionMejora"));
				evento.setResponsableMejora(rs.getString("responsableMejora"));
				evento.setPlazoMejora(rs.getString("plazoMejora"));
				evento.setNombreJefe(rs.getString("nombreJefe"));
				evento.setApellidoJefe(rs.getString("apellidoJefe"));
				evento.setCargoJefe(rs.getInt("cargoJefe"));
				evento.setDivisionstring(rs.getString("division"));
				evento.setSubdivision(rs.getString("subdivision"));
				evento.setIdCargo(rs.getInt("idCargo"));
				evento.setIdLicencia(rs.getInt("idLicencia"));
				evento.setIdUsuario(rs.getInt("idUsuario"));
				evento.setFecha_hasta(rs.getString("fechaHasta"));
				evento.setHora_accidente(rs.getString("hora_accidente"));
				evento.setEstado(rs.getInt("estado"));
				
				lista.add(evento);
			}		

		}catch (Exception e){
			System.out.println("Error: " + e.getMessage());
		}finally {
			ps.close();
			db.close();
		}		
		return lista;
		}
	public static boolean deleteEvMutById(int id) throws SQLException {
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		try{
			sql ="DELETE FROM sw_m_eventos_mutualidad WHERE idEventosMutualidad="+id;
			ps = db.conn.prepareStatement(sql);					
			ps.execute();
			return true;
		}catch(Exception ex){
			return false;
		}finally{
			db.conn.close();
		}
	}
	public static EvMut getDataByidLicencia(int idLicencia) throws SQLException {
		PreparedStatement ps = null;
		String sql="";
		ConnectionDB db = new ConnectionDB();
		EvMut eventoO=new EvMut();
		try{
			sql = "SELECT * from trabajadores join permiso_licencia on trabajadores.codigo = permiso_licencia.codigo_trabajador WHERE permiso_licencia.id="+idLicencia;
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);			
			while(rs.next()){				
				EvMut evento= new EvMut();				
								
				
				evento.setRut(rs.getString("rut"));
				evento.setNombreTrabajador(rs.getString("nombre"));
				evento.setApellidoTrabajador(rs.getString("apellidoPaterno"));
				
				
				
				
				evento.setEdadTrabajador(rs.getInt("edadTrabajador"));
				evento.setAnosAntiguedad(rs.getString("fechaContrato"));
				evento.setFechaHoraAccidente(rs.getString("fechaHoraAccidente"));
				evento.setUbicacionAccidente(rs.getString("ubicacionAccidente"));
				evento.setActividadTrabajador(rs.getString("actividadTrabajador"));
				evento.setLugarTrabajador(rs.getString("lugarTrabajador"));
				evento.setConsecuencia(rs.getString("consecuencia"));
				evento.setTipoPeligro(rs.getInt("tipoPeligro"));
				evento.setCausaAccidente(rs.getString("causaAccidente"));
				evento.setAccionMejora(rs.getString("accionMejora"));
				evento.setResponsableMejora(rs.getString("responsableMejora"));
				evento.setPlazoMejora(rs.getString("plazoMejora"));
				evento.setNombreJefe(rs.getString("nombreJefe"));
				evento.setApellidoJefe(rs.getString("apellidoJefe"));
				evento.setCargoJefe(rs.getInt("cargoJefe"));
				evento.setDivision(rs.getInt("division"));
				evento.setSubdivision(rs.getString("subdivision"));
				evento.setIdCargo(rs.getInt("idCargo"));
				evento.setIdLicencia(rs.getInt("idLicencia"));
				evento.setIdUsuario(rs.getInt("idUsuario"));
				
				eventoO=evento;
			}		

		}catch (Exception e){
			System.out.println("Error: " + e.getMessage());
		}finally {
			ps.close();
			db.close();
		}		
		return eventoO;
	}

	public static trabajadores getTrabajadorById(int id) throws SQLException {
		PreparedStatement ps = null;
		String sql="SELECT * FROM trabajadores WHERE id="+id;
		ConnectionDB db = new ConnectionDB();

		trabajadores single = new trabajadores();
		ps = db.conn.prepareStatement(sql);
		ResultSet rs = ps.executeQuery(sql);	
			
		try{
			
			while(rs.next()){
				trabajadores tr=new trabajadores();
				tr.setId(rs.getInt("id"));
				tr.setCodigo(rs.getString("codigo"));
				tr.setRut(rs.getString("rut"));
				tr.setNombre(rs.getString("nombre"));				
				tr.setDireccion(rs.getString("direccion"));
				tr.setTelefono(rs.getString("telefono"));	
				tr.setApellidoPaterno(rs.getString("apellidoPaterno"));
				tr.setApellidoMaterno(rs.getString("apellidoMaterno"));
				tr.setFechaIngresoCompania(rs.getString("fechaIngresoCompania"));
				tr.setfNacimiento(rs.getString("fNacimiento"));
				tr.setCargo(rs.getInt("cargo"));
				tr.setDivision(rs.getInt("division"));
				tr.setIdSubDivision(rs.getInt("idSubDivision"));
				single=tr;
			}		
			
			return single;
		}
		catch (Exception e){
			System.out.println("Error: " + e.getMessage());
		}finally {
			ps.close();
			db.close();
		}
		return single;	
	}

	public static ArrayList<EvMut> getDataForLicenses() throws SQLException {
		
		PreparedStatement ps = null;
	    String sql="SELECT trabajadores.id AS idTrabajador, trabajadores.codigo, trabajadores.rut, permiso_licencia.id AS idLicencia FROM SAN_CLEMENTE.trabajadores JOIN SAN_CLEMENTE.permiso_licencia on SAN_CLEMENTE.trabajadores.codigo=SAN_CLEMENTE.permiso_licencia.codigo_trabajador WHERE permiso_licencia.tipo_licencia=168 AND permiso_licencia.subtipo_licencia=184"; 
		ConnectionDB db = new ConnectionDB();
		ArrayList<EvMut> eventoO=new ArrayList<EvMut>();
		
		
		try{
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);			
			while(rs.next()){				
				EvMut evento= new EvMut();				
								
				evento.setIdTrabajador(rs.getInt("idTrabajador"));
				evento.setRut(rs.getString("rut"));
			
				evento.setIdLicencia(rs.getInt("idLicencia"));
				eventoO.add(evento);
			}		

		}catch (Exception e){
			System.out.println("Error: " + e.getMessage());
		}finally {
			ps.close();
			db.close();
		}		
		
		
		return eventoO;
		
		
		
		
	}
	
	
}
