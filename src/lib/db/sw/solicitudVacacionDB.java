package lib.db.sw;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import lib.classSW.Campo;
import lib.classSW.SVExtended;
import lib.classSW.calculadoraVacaciones;
import lib.classSW.cva;
import lib.classSW.sociedad;
import lib.classSW.solicitudVacacion;
import lib.db.ConnectionDB;

public class solicitudVacacionDB {

	public static boolean createSolicitudVacacion(solicitudVacacion solicitud) throws SQLException {
		PreparedStatement ps= null,ps0=null;
		ConnectionDB db= new ConnectionDB();
		ResultSet rs=null;
		
		String fechaInicio=solicitud.getFechaInicioSolicitud();
		int diasDeVacaciones=solicitud.getCantidadDiasSolicitud();
		calculadoraVacaciones cv=new calculadoraVacaciones();
		cv.setFechaInicial(fechaInicio);
		cv.setCantidadDias(diasDeVacaciones);
		try{
			//traer feriados
			
			String sql0="SELECT fechaFeriado FROM sw_m_feriados";
			ps0=db.conn.prepareStatement(sql0);
			rs=ps0.executeQuery(sql0);
			while(rs.next()){
				cv.addFeriado(rs.getString("fechaFeriado"));
			}
			SimpleDateFormat formatoDelTexto = new SimpleDateFormat("dd-MM-yyyy");
			String strFecha = solicitud.getFechaSolicitud();
			Date fecha = null;
			fecha = formatoDelTexto.parse(strFecha);
			java.sql.Date a=new java.sql.Date(fecha.getTime());
			System.out.println( a.toString());
			
					
			String sql="INSERT INTO sw_m_solicitud_vacaciones (fechaSolicitud, fechaInicioSolicitud, fechaFinSolicitud, periodoSolicitud, cantidadDiasSolicitud, estadoSolicitud, descripcionSolicitud, comprobanteSolicitud, codTrabajador, idContrato) VALUES (?,?,?,?,?,?,?,?,?,?)";
			ps = db.conn.prepareStatement(sql);
			ps.setDate(1, a);
			fecha = formatoDelTexto.parse(solicitud.getFechaInicioSolicitud());
			a=new java.sql.Date(fecha.getTime());
			System.out.println( a.toString());
			ps.setDate(2, a);
			fecha = formatoDelTexto.parse(cv.CalcularFechaFin());
			a=new java.sql.Date(fecha.getTime());
			System.out.println( a.toString());
			ps.setDate(3,a);
			ps.setInt(4, solicitud.getPeriodoSolicitud());
			ps.setInt(5,solicitud.getCantidadDiasSolicitud());
			ps.setString(6,"En Trámite");
			ps.setString(7,"");
			ps.setInt(8,0);
			ps.setInt(9,solicitud.getCodTrabajador());
			ps.setInt(10,solicitud.getIdContrato());
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

	public static boolean updateSolicitudVacacion(solicitudVacacion solicitud) throws SQLException {
		PreparedStatement ps= null;
		ConnectionDB db= new ConnectionDB();
		try{
			String sql="UPDATE sw_m_solicitud_vacaciones SET fechaSolicitud=?, fechaInicioSolicitud=?,fechaFinSolicitud=?, periodoSolicitud=?, cantidadDiasSolicitud=?, estadoSolicitud=?,comprobanteSolicitud=? WHERE idSolicitud="+solicitud.getIdSolicitud();
			ps = db.conn.prepareStatement(sql);
			
			
			ps.setString(1, solicitud.getFechaSolicitud());
			ps.setString(2, solicitud.getFechaInicioSolicitud());
			ps.setString(3,solicitud.getFechaFinSolicitud());
			ps.setInt(4, solicitud.getPeriodoSolicitud());
			ps.setInt(5,solicitud.getCantidadDiasSolicitud());
			ps.setString(6,solicitud.getEstadoSolicitud());
			ps.setInt(7,solicitud.getComprobanteSolicitud());
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

	public static solicitudVacacion getSolicitudVacacionById(int id) throws SQLException {
		PreparedStatement ps = null;
		String sql="";
		solicitudVacacion solicitud=new solicitudVacacion(); 
		ConnectionDB db = new ConnectionDB();
			
		try{
			sql = "select * from sw_m_solicitud_vacaciones where idSolicitud="+id;
			ps = db.conn.prepareStatement(sql);
			
			
			ResultSet rs = ps.executeQuery(sql);			
			while(rs.next()){				
				solicitudVacacion sol= new solicitudVacacion();				
				sol.setIdSolicitud(id);
				sol.setFechaSolicitud(rs.getString("fechaSolicitud"));
				sol.setFechaInicioSolicitud(rs.getString("fechaInicioSolicitud"));
				sol.setFechaFinSolicitud(rs.getString("fechaFinSolicitud"));
				sol.setPeriodoSolicitud(rs.getInt("periodoSolicitud"));
				sol.setCantidadDiasSolicitud(rs.getInt("cantidadDiasSolicitud"));
				sol.setEstadoSolicitud(rs.getString("estadoSolicitud"));
				sol.setDescripcionSolicitud(rs.getString("descripcionSolicitud"));
				sol.setComprobanteSolicitud(rs.getInt("comprobanteSolicitud"));
				
				
				
				
				solicitud=sol;
			}		

		}catch (Exception e){
			System.out.println("Error: " + e.getMessage());
		}finally {
			ps.close();
			db.close();
		}		
		return solicitud;
		
	}
	public static solicitudVacacion getLastSolicitudVacacion() throws SQLException{
		PreparedStatement ps = null;
		String sql="";
		solicitudVacacion solicitud=new solicitudVacacion(); 
		ConnectionDB db = new ConnectionDB();
			
		try{
			sql = "select * from sw_m_solicitud_vacaciones order By idSolicitud DESC LIMIT 1";
			ps = db.conn.prepareStatement(sql);
			
			
			ResultSet rs = ps.executeQuery(sql);			
			while(rs.next()){				
				solicitudVacacion sol= new solicitudVacacion();				
				sol.setIdSolicitud(rs.getInt("idSolicitud"));
				sol.setFechaSolicitud(rs.getString("fechaSolicitud"));
				sol.setFechaInicioSolicitud(rs.getString("fechaInicioSolicitud"));
				sol.setFechaFinSolicitud(rs.getString("fechaFinSolicitud"));
				sol.setPeriodoSolicitud(rs.getInt("periodoSolicitud"));
				sol.setCantidadDiasSolicitud(rs.getInt("cantidadDiasSolicitud"));
				sol.setEstadoSolicitud(rs.getString("estadoSolicitud"));
				sol.setDescripcionSolicitud(rs.getString("descripcionSolicitud"));
				sol.setComprobanteSolicitud(rs.getInt("comprobanteSolicitud"));
				solicitud=sol;
			}		

		}catch (Exception e){
			System.out.println("Error: " + e.getMessage());
		}finally {
			ps.close();
			db.close();
		}		
		return solicitud;
		
		
	}
	public static solicitudVacacion getSolicitudVacacionTById(int id) throws SQLException {
		PreparedStatement ps = null;
		String sql="";
		solicitudVacacion solicitud=new solicitudVacacion(); 
		ConnectionDB db = new ConnectionDB();
			
		try{
			sql = "select * from sw_r_solicitudvacaciones_trabajador Inner join sw_m_solicitud_vacaciones on sw_r_solicitudvacaciones_trabajador.idSolicitud=sw_m_solicitud_vacaciones.idSolicitud WHERE sw_r_solicitudvacaciones_trabajador.idSolicitud="+id;
			ps = db.conn.prepareStatement(sql);
			
			
			ResultSet rs = ps.executeQuery(sql);			
			while(rs.next()){				
				solicitudVacacion sol= new solicitudVacacion();				
				sol.setIdSolicitud(id);
				sol.setIdTrabajador(rs.getInt("id"));
				sol.setFechaSolicitud(rs.getString("fechaSolicitud"));
				sol.setFechaInicioSolicitud(rs.getString("fechaInicioSolicitud"));
				sol.setFechaFinSolicitud(rs.getString("fechaFinSolicitud"));
				sol.setPeriodoSolicitud(rs.getInt("periodoSolicitud"));
				sol.setCantidadDiasSolicitud(rs.getInt("cantidadDiasSolicitud"));
				sol.setEstadoSolicitud(rs.getString("estadoSolicitud"));
				sol.setDescripcionSolicitud(rs.getString("descripcionSolicitud"));
				sol.setComprobanteSolicitud(rs.getInt("comprobanteSolicitud"));
				
				
				
				
				solicitud=sol;
			}		

		}catch (Exception e){
			System.out.println("Error: " + e.getMessage());
		}finally {
			ps.close();
			db.close();
		}		
		return solicitud;
		
	}

	public static solicitudVacacion getBlankSolicitudVacacion() {
		// TODO Auto-generated method stub
		
		solicitudVacacion s=new solicitudVacacion();
		
		return s.createBlankSolicitudVacacion();
	}
	public static ArrayList<solicitudVacacion> getAllsolicitudVacacionesT() throws SQLException {
		PreparedStatement ps= null;
		ConnectionDB db= new ConnectionDB();
		String sql="";
		ArrayList<solicitudVacacion> lista= new ArrayList<solicitudVacacion>();
	
		try{
			sql = "select * from sw_r_solicitudvacaciones_trabajador Inner join sw_m_solicitud_vacaciones on sw_r_solicitudvacaciones_trabajador.idSolicitud=sw_m_solicitud_vacaciones.idSolicitud";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);			
			while(rs.next()){				
				solicitudVacacion sol= new solicitudVacacion();				
				sol.setIdSolicitud(rs.getInt("idSolicitud"));
				sol.setIdTrabajador(rs.getInt("idTrabajador"));
				sol.setFechaSolicitud(rs.getString("fechaSolicitud"));
				sol.setFechaInicioSolicitud(rs.getString("fechaInicioSolicitud"));
				sol.setFechaFinSolicitud(rs.getString("fechaFinSolicitud"));
				sol.setPeriodoSolicitud(rs.getInt("periodoSolicitud"));
				sol.setCantidadDiasSolicitud(rs.getInt("cantidadDiasSolicitud"));
				sol.setEstadoSolicitud(rs.getString("estadoSolicitud"));
				sol.setDescripcionSolicitud(rs.getString("descripcionSolicitud"));
				sol.setComprobanteSolicitud(rs.getInt("comprobanteSolicitud"));
				
				lista.add(sol);
			}		

		}catch (Exception e){
			System.out.println("Error: " + e.getMessage());
		}finally {
			ps.close();
			db.close();
		}		
		return lista;
		
		
		
		
	}

	public static boolean deleteSolicitudVacacionById(int id) throws SQLException {
		PreparedStatement ps= null, ps2=null;
		String sql="", sql2="";
		
		ConnectionDB db= new ConnectionDB();
		try{
			sql = "DELETE * FROM sw_r_solicitudvacaciones_trabajador WHERE idSolicitud="+id;
			ps = db.conn.prepareStatement(sql);					
			ps.execute();
			sql2="DELETE * FROM sw_m_solicitud_vacaciones WHERE idSolicitud="+id;
			ps2=db.conn.prepareStatement(sql2);
			ps2.execute();
			
			
			
			return true;			

		}catch (Exception e){
			return false;
		}finally {
			ps.close();
			db.close();
		}		

		
		
		
		
		
	}

	public static boolean createSolicitudVacacionTrabajador(int idTrabajador) throws SQLException {
		PreparedStatement ps= null,ps0=null;
		ConnectionDB db= new ConnectionDB();
		try{
			String sql0="SELECT idSolicitud FROM sw_m_solicitud_vacaciones order by idSolicitud desc limit 1";
			ps0=db.conn.prepareStatement(sql0);
			ResultSet rs=ps0.executeQuery();
			int idSol=0;
			while(rs.next())
			{
				idSol=rs.getInt("idSolicitud");
			}
			String sql="INSERT INTO sw_r_solicitudvacaciones_trabajador (idTrabajador, idSolicitud) VALUES (?,?)";
			ps = db.conn.prepareStatement(sql);
			ps.setInt(1, idTrabajador);
			ps.setInt(2, idSol);
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

	public static String getFechaFinal(cva cvas) throws SQLException {
		PreparedStatement ps0=null;
		ConnectionDB db= new ConnectionDB();
		
		calculadoraVacaciones cv= new calculadoraVacaciones();
		cv.setFechaInicial(cvas.getFechaInicioSolicitud());
		cv.setCantidadDias(cvas.getCantidadDiasSolicitud());
		String fechaFinSolicitud="";
		try{
			//traer feriados
			
			String sql0="SELECT fechaFeriado FROM sw_m_feriados WHERE idRegion='16' or idRegion="+cvas.getIdregion();
			ps0=db.conn.prepareStatement(sql0);
			ResultSet rs=ps0.executeQuery(sql0);
			while(rs.next()){
				String fecha=rs.getString("fechaFeriado");
				
				cv.addFeriado(fecha);
				
			}
			cv.getFeriados();
			fechaFinSolicitud= cv.CalcularFechaFin();		
			
			}
			
			catch(Exception ex){
				return "false";
			}
			finally{
				db.conn.close();
			}
		
		
		
		
		
		
		
		
		
		return fechaFinSolicitud;
	}
	
	
	public static Integer getDiasSolicitudVacacionByIdContrato(int id){
		PreparedStatement ps = null;
		ConnectionDB db = new ConnectionDB();
		Integer cantidad = 0;	
		try{
			String sql = "select sum(cantidadDiasSolicitud) as cantidad from sw_m_solicitud_vacaciones where idContrato = "+id;
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);			
			while(rs.next()){				
				cantidad = rs.getInt("cantidad");
			}		

		}catch (Exception e){
			System.out.println("Error: " + e.getMessage());
			e.printStackTrace();
		}finally {
			try {
				ps.close();
			} catch (SQLException e) {
				System.out.println("Error: " + e.getMessage());
				e.printStackTrace();
			}
			db.close();
		}		
		return cantidad;
		
	}

	public static ArrayList<solicitudVacacion> getSolicitudes() throws SQLException {
		PreparedStatement ps= null;
		ConnectionDB db= new ConnectionDB();
		String sql="";
		ArrayList<solicitudVacacion> lista= new ArrayList<solicitudVacacion>();
	
		try{
			sql = "SELECT * FROM sw_m_solicitud_vacaciones "+
				  "inner join trabajadores on sw_m_solicitud_vacaciones.codTrabajador=trabajadores.codigo "+
				  "order by sw_m_solicitud_vacaciones.codTrabajador, sw_m_solicitud_vacaciones.fechaInicioSolicitud";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);			
			while(rs.next()){				
				solicitudVacacion sol= new solicitudVacacion();				
				sol.setIdSolicitud(rs.getInt("idSolicitud"));
				
				sol.setCodTrabajador(rs.getInt("codTrabajador"));
				sol.setApellidoPaterno(rs.getString("apellidoPaterno"));
				sol.setApellidoMaterno(rs.getString("apellidoMaterno"));
				sol.setNombre(rs.getString("nombre"));
				sol.setFechaSolicitud(rs.getString("fechaSolicitud"));
				sol.setFechaInicioSolicitud(rs.getString("fechaInicioSolicitud"));
				sol.setFechaFinSolicitud(rs.getString("fechaFinSolicitud"));
				sol.setPeriodoSolicitud(rs.getInt("periodoSolicitud"));
				sol.setCantidadDiasSolicitud(rs.getInt("cantidadDiasSolicitud"));
				sol.setEstadoSolicitud(rs.getString("estadoSolicitud"));
				sol.setDescripcionSolicitud(rs.getString("descripcionSolicitud"));
				sol.setComprobanteSolicitud(rs.getInt("comprobanteSolicitud"));
				
				lista.add(sol);
			}		

		}catch (Exception e){
			System.out.println("Error: " + e.getMessage());
		}finally {
			ps.close();
			db.close();
		}		
		return lista;
	}
	public static ArrayList<sociedad> getEmpresas() throws SQLException {
		PreparedStatement ps = null;
		String sql="";
		ArrayList<sociedad> lista = new ArrayList<sociedad>();
		ConnectionDB db = new ConnectionDB();
		
		try{
			
			sql = "select * from sociedad order by denominacionSociedad ASC";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			
			while(rs.next()){
				sociedad sc = new sociedad();
				sc.setIdSociedad(rs.getInt("idSociedad"));
				sc.setSociedad(rs.getString("sociedad"));
				sc.setDenominacionSociedad(rs.getString("denominacionSociedad"));
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
	public static ArrayList<SVExtended> getTrabajadoresFiltering(String Empresa, String Campo, String Grupo, String CECO) throws SQLException{
		PreparedStatement ps = null;
		String sql="";
		String addToSql="";
		
		System.out.println(Empresa+"-"+Campo+"-"+Grupo+"-"+CECO);
		
		
		if(Empresa.equals("0")){
			if(Campo.equals("0")){
				if(Grupo.equals("0")){
					if(CECO.equals("0")){
						// Empresa 0, Huerto 0, Grupo 0, CECO 0
						addToSql="";
					}
					else{
						// Empresa 0, Huerto 0, Grupo 0, CECO 1
						
						addToSql="WHERE idCECO='"+CECO+"'";
					}
				}
				else{
					if(CECO.equals("0")){
						// Empresa 0, Huerto 0, Grupo 1, CECO 0
						addToSql="WHERE campo.grupo='"+Grupo+"'";
					}
					else{
						// Empresa 0, Huerto 0, Grupo 1, CECO 1
						addToSql="WHERE campo.grupo='"+Grupo+"' and idCECO='"+CECO+"'";
					}
				}
			}
			else{
				
				if(Grupo.equals("0")){
					if(CECO.equals("0")){
						// Empresa 0, campo 1, Grupo 0, CECO 0
						addToSql="WHERE campo='"+Campo+"'";
					}
					else{
						// Empresa 0, Campo 1, Grupo 0, CECO 1
						addToSql="WHERE Campo='"+Campo+"' AND idCECO='"+CECO+"'";
					}
				}
				else{
					if(CECO.equals("0")){
						// Empresa 0, Campo 1, Grupo 1, CECO 0
						addToSql="WHERE Campo='"+Campo+"' AND campo.grupo='"+Grupo+"'";
					}
					else{
						// Empresa 0, Campo 1, Grupo 1, CECO 1
						addToSql="WHERE Campo='"+Campo+"' AND campo.grupo='"+Grupo+"' AND idCECO='"+CECO+"'";
					}
				}
			}
			
		}
		else{
			// Empresa 1, Huerto 0, Grupo 0, CECO 0,
			if(Campo.equals("0")){
				if(Grupo.equals("0")){
					if(CECO.equals("0")){
						// Empresa 1, Huerto 0, Grupo 0, CECO 0
						addToSql="WHERE sociedad='"+Empresa+"'";
					}
					else{
						// Empresa 1, Huerto 0, Grupo 0, CECO 1
						addToSql="WHERE sociedad='"+Empresa+"' AND idCECO='"+CECO+"'";
					}
				}
				else{
					if(CECO.equals("0")){
						// Empresa 1, Huerto 0, Grupo 1, CECO 0
						addToSql="WHERE sociedad='"+Empresa+"' AND campo.grupo='"+Grupo+"'";
					}
					else{
						// Empresa 1, Huerto 0, Grupo 1, CECO 1
						addToSql="WHERE sociedad='"+Empresa+"' AND campo.grupo='"+Grupo+"' AND idCECO='"+CECO+"'";
					}
				}
			}
			else{
				if(Grupo.equals("0")){
					if(CECO.equals("0")){
						// Empresa 1, Campo 1, Grupo 0, CECO 0
						addToSql="WHERE sociedad='"+Empresa+"' AND campo='"+Campo+"'";
						
					}
					else{
						// Empresa 1, Campo 1, Grupo 0, CECO 1
						addToSql="WHERE sociedad='"+Empresa+"' AND campo='"+Campo+"' AND idCECO='"+CECO+"'";
					}
				}
				else{
					if(CECO.equals("0")){
						// Empresa 1, Campo 1, Grupo 1, CECO 0
						addToSql="WHERE sociedad='"+Empresa+"' AND campo='"+Campo+"' AND campo.grupo='"+Grupo+"'";
					}
					else{
						// Empresa 1, Campo 1, Grupo 1, CECO 1
						addToSql="WHERE sociedad='"+Empresa+"' AND campo='"+Campo+"' AND campo.grupo='"+Grupo+"' AND idCECO='"+CECO+"'";
					}
				}
			}
		}
		ArrayList<SVExtended> lista = new ArrayList<SVExtended>();
		ConnectionDB db = new ConnectionDB();
		
		try{
			
			sql = "SELECT trabajadores.id,trabajadores.idCECO , trabajadores.codigo, trabajadores.rut, trabajadores.nombre, trabajadores.rutTemporal, trabajadores.apellidoPaterno, "+
					"trabajadores.apellidoMaterno, campo.campo, campo.sociedad, campo.zona,idSolicitud, grupo_ceco_work, campo.grupo, "+
					"sw_m_solicitud_vacaciones.cantidadDiasSolicitud,sw_m_solicitud_vacaciones.fechaSolicitud,sw_m_solicitud_vacaciones.fechaInicioSolicitud, "+
					"sw_m_solicitud_vacaciones.fechaFinSolicitud "+ 
					"FROM trabajadores "+
					"left JOIN campo ON trabajadores.idHuerto=campo.campo "+
					"left JOIN sw_m_solicitud_vacaciones ON trabajadores.codigo=sw_m_solicitud_vacaciones.codTrabajador "+addToSql;

			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			
			while(rs.next()){
				SVExtended sv = new SVExtended();
				sv.setIdSolicitud(rs.getInt("id"));
				sv.setCodTrabajador(rs.getInt("codigo"));
				sv.setRut(rs.getString("rut"));
				sv.setNombre(rs.getString("nombre"));
				sv.setApellidoPaterno(rs.getString("apellidoPaterno"));
				sv.setApellidoMaterno(rs.getString("apellidoMaterno"));
				sv.setCampo(rs.getString("campo"));
				sv.setSociedad(rs.getString("sociedad"));
				sv.setZona(rs.getString("zona"));
				sv.setGrupo_ceco_work(rs.getString("grupo_ceco_work"));
				sv.setGrupo(rs.getString("grupo"));			
				sv.setFechaSolicitud(rs.getString("fechaSolicitud"));
				sv.setFechaInicioSolicitud(rs.getString("fechaInicioSolicitud"));
				sv.setFechaFinSolicitud(rs.getString("fechaFinSolicitud"));
				sv.setCantidadDiasSolicitud(rs.getInt("cantidadDiasSolicitud"));
				
				lista.add(sv);
			}
		}catch (Exception e){
			System.out.println("Error: " + e.getMessage());
		}finally {
			ps.close();
			db.close();
		}	
		return lista;
	}
	
	

	public static ArrayList<Campo> getZonas(String campo) throws SQLException {
		PreparedStatement ps = null;
		String sql="";
		ArrayList<Campo> lista = new ArrayList<Campo>();
		ConnectionDB db = new ConnectionDB();
		
		try{
			
			sql = "SELECT distinct(zona) FROM campo where campo.campo='"+campo+"'";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			
			while(rs.next()){
				Campo sc = new Campo();
				sc.setZona(rs.getString("zona"));
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
	
}
