package SWDB;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import lib.classSW.AnticiposIndividuales;
import lib.classSW.CargarTipodePago;
import lib.classSW.CreateLiquidacion;
import lib.classSW.GetDatosContratoTrabajador;
import lib.classSW.InsertContrato;
import lib.classSW.InsertHD;
import lib.classSW.ListaSociedad;
import lib.classSW.ListaSolicitudes;
import lib.classSW.LoadCargoPreseleccion;
import lib.classSW.LoadConceptos;
import lib.classSW.LoadContratacion;
import lib.classSW.LoadTrabajadorSociedad;
import lib.classSW.NominaAnticipos;
import lib.classSW.NotificacionContrato;
import lib.classSW.PreseleccionDetalle;
import lib.classSW.PreseleccionDetalleVer;
import lib.classSW.RechazoPreseleccionado;
import lib.classSW.TipoLicencia;
import lib.classSW.TodoTablaContrato;
import lib.classSW.UpdateEstadoReclutamiento;
import lib.classSW.UpdateTrabajadorHD;
import lib.classSW.auxiliar;
import lib.classSW.Cargo;
import lib.classSW.contrato_SW;
import lib.classSW.haberesDescuentos;
import lib.classSW.listaRechazo;
import lib.classSW.posiciones;
import lib.classSW.preseleccionados;
import lib.classSW.reclutamiento;
import lib.classSW.seleccionados;
import lib.classSW.sw_haberesDescuentos;
import lib.classSW.sw_huerto;
import lib.classSW.tablaPermisoLicencia;
//import lib.classSW.movimiento;
import lib.classSW.trabajador;
import lib.classSW.trabajador_pre;
import lib.classSW.trabajadores_prese;
import lib.db.ConnectionDB;
import lib.struc.trabajadores;
public class impexp_trabajador {
	//trabajadores por rut
	public static ArrayList<trabajador> gettrabajador(String tra)  throws Exception{
		PreparedStatement ps = null;
		String sql="";
		ArrayList<trabajador> lista = new ArrayList<trabajador>();
		ConnectionDB db = new ConnectionDB();
		try{
			sql = "select * from trabajador where rut = '"+tra+"'";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				trabajador tr = new trabajador();
				tr.setIdTrabajador(rs.getInt("idTrabajador"));
				tr.setIdPerfil(rs.getInt("idPerfil"));
				tr.setRut(rs.getString("rut"));
				tr.setApellidoPaterno(rs.getString("apellidoPaterno"));
				tr.setApellidoMaterno(rs.getString("apellidoMaterno"));
				tr.setNombre(rs.getString("nombre"));
				tr.setFechaNacimiento(rs.getString("fechaNacimiento"));
				tr.setEdad(rs.getString("edad"));
				tr.setIdNacionalidad(rs.getInt("idNacionalidad"));
				tr.setIdGenero(rs.getInt("idGenero"));
				tr.setIdStatus(rs.getInt("idStatus"));
				tr.setIdEstadoCivil(rs.getInt("idEstadoCivil"));
				tr.setIdContrato(rs.getInt("idContrato"));
				lista.add(tr);
			}			
		}catch (SQLException e){
			System.out.println("Error: " + e.getMessage());
		}catch (Exception e){
			System.out.println("Error: " + e.getMessage());
		}finally {
			ps.close();
			db.close();
		}		
		return lista;
	}
	//rut de todos los trabajadores
	public static ArrayList<trabajador> getruttrab()  throws Exception{
		PreparedStatement ps = null;
		String sql="";
		ArrayList<trabajador> lista = new ArrayList<trabajador>();
		ConnectionDB db = new ConnectionDB();
		try{
			sql = "select rut, nombre from trabajador  order by nombre";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				trabajador tr = new trabajador();
				tr.setRut(rs.getString("rut"));
				tr.setNombre(rs.getString("nombre"));
				lista.add(tr);
			}			
		}catch (SQLException e){
			System.out.println("Error: " + e.getMessage());
		}catch (Exception e){
			System.out.println("Error: " + e.getMessage());
		}finally {
			ps.close();
			db.close();
		}		
		return lista;
	}
	//trabajadores po codigo de preseleccion
	public static ArrayList<trabajadores_prese> getTrabajPrese(int pre , int entero)  throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<trabajadores_prese> lista = new ArrayList<trabajadores_prese>();
		ConnectionDB db = new ConnectionDB();
		try{
			sql = "select P.codigo_trabajador, P.codigo_peticion, P.id_peticion,TR.nombre,PE.cargo,PE.posicion,PE.obra,TR.telefono,TR.email, P.status, P.id_rechazo,TR.id   from preseleccionados P inner join peticion_trabajador PE on PE.id_peticion = P.id_peticion inner join trabajadores TR on TR.codigo = P.codigo_trabajador where P.codigo_peticion = "+entero+" and P.id_peticion = "+pre+" group by PE.cargo,P.codigo_trabajador, P.codigo_peticion, P.id_peticion, P.status,TR.nombre,PE.obra,PE.posicion,TR.telefono,TR.email, P.id_rechazo ";	
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				trabajadores_prese trab = new trabajadores_prese();
				
				trab.setCodigo(rs.getInt("codigo_trabajador"));
				trab.setCodigo_peticion(rs.getInt("codigo_peticion"));
				trab.setId_peticion(rs.getInt("id_peticion"));
				trab.setNombre(rs.getString("nombre"));
				trab.setEmail(rs.getString("email"));
				trab.setTelefono(rs.getString("telefono"));
				trab.setNombre_cargo(rs.getString("cargo"));
				trab.setPosicion(rs.getString("posicion"));
				trab.setId(rs.getInt("id"));
				trab.setEst_contrato(rs.getString("status"));
				trab.setId_rechazo(rs.getString("id_rechazo"));
				
				lista.add(trab);				
			}
		}catch (SQLException e){
			System.out.println("Error: "+e.getMessage());
		}catch (Exception e){
			System.out.println("Error: "+e.getMessage());
		}finally {
			ps.close();
			db.close();
		}
		return lista;		
	}
	//trabajadores supervisores
	public static ArrayList<trabajador> getsupervisores()  throws Exception{
		PreparedStatement ps = null;
		String sql="";
		ArrayList<trabajador> lista = new ArrayList<trabajador>();
		ConnectionDB db = new ConnectionDB();
		try{
			sql = "select * from trabajador where idPerfil = 7";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				trabajador tr = new trabajador();
				tr.setIdTrabajador(rs.getInt("idTrabajador"));
				tr.setIdPerfil(rs.getInt("idPerfil"));
				tr.setRut(rs.getString("rut"));
				tr.setApellidoPaterno(rs.getString("apellidoPaterno"));
				tr.setApellidoMaterno(rs.getString("apellidoMaterno"));
				tr.setNombre(rs.getString("nombre"));
				tr.setFechaNacimiento(rs.getString("fechaNacimiento"));
				tr.setEdad(rs.getString("edad"));
				tr.setIdNacionalidad(rs.getInt("idNacionalidad"));
				tr.setIdGenero(rs.getInt("idGenero"));
				tr.setIdStatus(rs.getInt("idStatus"));
				tr.setIdEstadoCivil(rs.getInt("idEstadoCivil"));
				tr.setIdContrato(rs.getInt("idContrato"));
				lista.add(tr);
			}			
		}catch (SQLException e){
			System.out.println("Error: " + e.getMessage());
		}catch (Exception e){
			System.out.println("Error: " + e.getMessage());
		}finally {
			ps.close();
			db.close();
		}		
		return lista;
	}//traer datos desde aux
	public static ArrayList<auxiliar> getAlgo() throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<auxiliar> lista = new ArrayList<auxiliar>();
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "select * from aux";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				auxiliar ob = new auxiliar();
				ob.setId_aux(rs.getInt("id_aux"));
				ob.setCampo(rs.getString("campo"));
				ob.setValor(rs.getInt("valor"));
				lista.add(ob);
			}
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error:" + e.getMessage());
		}finally {
			ps.close();
			db.close();
		}
		return lista;
	}
	//todos los trabajadores
		public static ArrayList<trabajador> getalltrabaja()  throws Exception{
			PreparedStatement ps = null;
			String sql="";
			ArrayList<trabajador> lista = new ArrayList<trabajador>();
			ConnectionDB db = new ConnectionDB();
			try{
				sql = "select * from trabajador";
				ps = db.conn.prepareStatement(sql);
				ResultSet rs = ps.executeQuery(sql);
				while(rs.next()){
					trabajador tr = new trabajador();
					tr.setIdTrabajador(rs.getInt("idTrabajador"));
					tr.setIdPerfil(rs.getInt("idPerfil"));
					tr.setRut(rs.getString("rut"));
					tr.setApellidoPaterno(rs.getString("apellidoPaterno"));
					tr.setApellidoMaterno(rs.getString("apellidoMaterno"));
					tr.setNombre(rs.getString("nombre"));
					tr.setFechaNacimiento(rs.getString("fechaNacimiento"));
					tr.setEdad(rs.getString("edad"));
					tr.setIdNacionalidad(rs.getInt("idNacionalidad"));
					tr.setIdGenero(rs.getInt("idGenero"));
					tr.setIdStatus(rs.getInt("idStatus"));
					tr.setIdEstadoCivil(rs.getInt("idEstadoCivil"));
					tr.setIdContrato(rs.getInt("idContrato"));
					lista.add(tr);
				}			
			}catch (SQLException e){
				System.out.println("Error: " + e.getMessage());
			}catch (Exception e){
				System.out.println("Error: " + e.getMessage());
			}finally {
				ps.close();
				db.close();
			}		
			return lista;
		}//trabajadores por id_contrato
		public static ArrayList<trabajador> gettrabajadorPorId(String id)  throws Exception{
			PreparedStatement ps = null;
			String sql="";
			ArrayList<trabajador> lista = new ArrayList<trabajador>();
			ConnectionDB db = new ConnectionDB();
			try{
				sql = "select * from trabajador where id_contrato = '"+id+"'";
				ps = db.conn.prepareStatement(sql);
				ResultSet rs = ps.executeQuery(sql);
				while(rs.next()){
					trabajador tr = new trabajador();
					tr.setIdTrabajador(rs.getInt("idTrabajador"));
					tr.setIdPerfil(rs.getInt("idPerfil"));
					tr.setRut(rs.getString("rut"));
					tr.setApellidoPaterno(rs.getString("apellidoPaterno"));
					tr.setApellidoMaterno(rs.getString("apellidoMaterno"));
					tr.setNombre(rs.getString("nombre"));
					tr.setFechaNacimiento(rs.getString("fechaNacimiento"));
					tr.setEdad(rs.getString("edad"));
					tr.setIdNacionalidad(rs.getInt("idNacionalidad"));
					tr.setIdGenero(rs.getInt("idGenero"));
					tr.setIdStatus(rs.getInt("idStatus"));
					tr.setIdEstadoCivil(rs.getInt("idEstadoCivil"));
					tr.setIdContrato(rs.getInt("idContrato"));
					lista.add(tr);
				}			
			}catch (SQLException e){
				System.out.println("Error: " + e.getMessage());
			}catch (Exception e){
				System.out.println("Error: " + e.getMessage());
			}finally {
				ps.close();
				db.close();
			}		
			return lista;
		}
//		INSERT
		public static boolean insertTraba (trabajador trab) throws Exception{
			PreparedStatement ps = null;
			String sql = "";
			ConnectionDB db = new ConnectionDB();
			try{
				sql = "INSERT INTO trabajador";
				sql+= "VALUES "
						+ "('"+trab.getIdTrabajador()+"', '"+trab.getIdPerfil()+"', '"+trab.getRut()+"', "
						+ "'"+trab.getApellidoPaterno()+"', '"+trab.getApellidoMaterno()+"', "
						+ "'"+trab.getNombre()+"', '"+trab.getFechaNacimiento()+"', "
						+ "'"+trab.getEdad()+"', '"+trab.getIdNacionalidad()+"', "
						+ "'"+trab.getIdGenero()+"', '"+trab.getIdStatus()+"', "
						+ "'"+trab.getIdEstadoCivil()+"', '"+trab.getIdContrato()+"')";
				
				ps = db.conn.prepareStatement(sql);
				ps.execute();
				return true;
			}catch (SQLException e){
				System.out.println("Error: "+ e.getMessage());
			}catch (Exception e){
				System.out.println("Error: "+ e.getMessage());
			}finally {
				ps.close();
				db.close();
			}
			return false;
		}//contratos segun id trabajador
		public static ArrayList<contrato_SW> getcontratoById(String id)  throws Exception{
			PreparedStatement ps = null;
			String sql="";
			ArrayList<contrato_SW> lista = new ArrayList<contrato_SW>();
			ConnectionDB db = new ConnectionDB();
			try{
				sql = "select * from contrato_sw where id_trabajador = '"+id+"'";
				ps = db.conn.prepareStatement(sql);
				ResultSet rs = ps.executeQuery(sql);
				while(rs.next()){
					contrato_SW c = new contrato_SW();
					c.setId_contrato(rs.getInt("id_contrato"));
					c.setId_trabajador(rs.getInt("id_trabajador"));
					c.setFecha_fin_contrato(rs.getString("fecha_fin_contrato"));
					c.setFecha_inicio_contrato(rs.getString("fecha_inicio_contrato"));
					c.setCargo(rs.getInt("cargo"));
					c.setPosicion(rs.getInt("posicion"));
					c.setTipo_contrato(rs.getString("tipo_contrato"));
					c.setEstado_contrato(rs.getString("estado_contrato"));
					c.setArticulo_termino_contrato(rs.getInt("articulo_termino_contrato"));
					c.setInciso_termino_contrato(rs.getInt("inciso_termino_contrato"));
					c.setLetra_termino_contrato(rs.getInt("letra_termino_contrato"));
					lista.add(c);
				}			
			}catch (SQLException e){
				System.out.println("Error: " + e.getMessage());
			}catch (Exception e){
				System.out.println("Error: " + e.getMessage());
			}finally {
				ps.close();
				db.close();
			}		
			return lista;
		}//update trabajador
		public static boolean updateTrabajadorPre(trabajador_pre pre) throws  Exception{
			PreparedStatement ps = null;
			String sql = "";
			ConnectionDB  db = new ConnectionDB();	
			try {
				sql = "Update trabajadores set "
					+ "nombre= '"+ pre.getNombre()+"', "
					+ "direccion='" +pre.getDireccion()+ "', email='" +pre.getEmail() + "', "
					+ "telefono='" +pre.getTelefono() + "' where codigo = '"+pre.getCodigo()+"'";  
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
		
		//trabajadores por rut
		public static trabajador getTrabajadorById(String id)  throws Exception{
			PreparedStatement ps = null;
			String sql="";
			ConnectionDB db = new ConnectionDB();
			
			trabajador tr = new trabajador();
			
			try{
				sql = "select * from trabajador where id_trabajador = '"+id+"'";
				ps = db.conn.prepareStatement(sql);
				ResultSet rs = ps.executeQuery(sql);
				
				while(rs.next()){
					
					tr.setIdTrabajador(rs.getInt("idTrabajador"));
					tr.setIdPerfil(rs.getInt("idPerfil"));
					tr.setRut(rs.getString("rut"));
					tr.setApellidoPaterno(rs.getString("apellidoPaterno"));
					tr.setApellidoMaterno(rs.getString("apellidoMaterno"));
					tr.setNombre(rs.getString("nombre"));
					tr.setFechaNacimiento(rs.getString("fechaNacimiento"));
					tr.setEdad(rs.getString("edad"));
					tr.setIdNacionalidad(rs.getInt("idNacionalidad"));
					tr.setIdGenero(rs.getInt("idGenero"));
					tr.setIdStatus(rs.getInt("idStatus"));
					tr.setIdEstadoCivil(rs.getInt("idEstadoCivil"));
					tr.setIdContrato(rs.getInt("idContrato"));
			
				}			
			}catch (SQLException e){
				System.out.println("Error: " + e.getMessage());
			}catch (Exception e){
				System.out.println("Error: " + e.getMessage());
			}finally {
				ps.close();
				db.close();
			}		
			return tr;
		}
		
		
//		public static ArrayList<movimiento> getMovimientosByIdTrabajador(String id) throws Exception {
//
//			PreparedStatement ps = null;
//			String sql="";
//			ConnectionDB db = new ConnectionDB();
//			
//			ArrayList<movimiento> movimientosList = new ArrayList<movimiento>();
//			
//			try {
//			
//				sql = "select * from movimientos where id_trabajador = '"+id+"'";
//				ps = db.conn.prepareStatement(sql);
//				ResultSet rs = ps.executeQuery(sql);
//				
//				while(rs.next()){
//					
//					movimiento mv = new movimiento();
//					
//					mv.setFecha_inicio(rs.getString("fecha_inicio"));
//					mv.setId_movimientos(rs.getInt("id_movimientos"));
//					mv.setId_tiposmovimientos(rs.getInt("id_tiposmovimientos"));
//					mv.setId_trabajador(rs.getInt("id_trabajador"));
//					
//					movimientosList.add(mv);
//			
//				}	
//				
//				
//			} catch (Exception e) {
//				System.out.println("Error: " + e.getMessage());
//			} finally {
//				ps.close();
//				db.close();
//			}
//			
//			
//			
//			return movimientosList;
//		}
		
	//get Contrato por Id
	public static contrato_SW getContratoById(String id) throws Exception {
	
		PreparedStatement ps = null;
		String sql="";
		ConnectionDB db = new ConnectionDB();
		contrato_SW contrato = new contrato_SW();
		
		
		try {
			
			sql = "select * from contrato_sw where id_contrato = '"+id+"'";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			
			while(rs.next()){
				
				contrato.setId_contrato(rs.getInt("id_contrato"));
				contrato.setId_trabajador(rs.getInt("id_trabajador"));
				contrato.setFecha_inicio_contrato(rs.getString("fecha_inicio_contrato"));
				contrato.setFecha_fin_contrato(rs.getString("fecha_fin_contrato"));
				contrato.setCargo(rs.getInt("cargo"));
				contrato.setPosicion(rs.getInt("posicion"));
				contrato.setTipo_contrato(rs.getString("tipo_contrato"));
				contrato.setEstado_contrato(rs.getString("estado_contrato"));
				contrato.setArticulo_termino_contrato(rs.getInt("articulo_termino_contrato"));
				contrato.setInciso_termino_contrato(rs.getInt("inciso_termino_contrato"));
				contrato.setLetra_termino_contrato(rs.getInt("letra_termino_contrato"));
			}
			
			
			
		} catch (Exception e) {
			System.out.println("Error: " + e.getMessage());
		} finally {
			ps.close();
			db.close();
		}
		
		
		return contrato;
	}
	
	//Update Contrato
	public static boolean updateContrato(contrato_SW contrato) throws Exception {
		
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		
		try {
			sql = "UPDATE contrato_sw set " 
				+ " id_trabajador='"             + contrato.getId_trabajador()+"', "
				+ " fecha_inicio_contrato='"     + contrato.getFecha_inicio_contrato()+"', "
				+ " fecha_fin_contrato='"        + contrato.getFecha_fin_contrato()+"', "
				+ " cargo='"                     + contrato.getCargo()+"', "
				+ " posicion='"                  + contrato.getPosicion()+"', "
				+ " tipo_contrato='"             + contrato.getTipo_contrato()+"', "
				+ " estado_contrato='"           + contrato.getEstado_contrato()+"', "
				+ " articulo_termino_contrato='" + contrato.getArticulo_termino_contrato()+"', "
				+ " inciso_termino_contrato='"   + contrato.getInciso_termino_contrato()+"', "
				+ " letra_termino_contrato='"    + contrato.getLetra_termino_contrato()+"' "
			
				+ " where id_contrato='" 		 +contrato.getId_contrato()+ "'";
			
			ps = db.conn.prepareStatement(sql);
			ps.execute();
			return true;				
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} finally {
			ps.close();
			db.close();
		}
		
		return false;
	}
	
	//Insertar Contrato
	public static boolean insertContrato(contrato_SW contrato) throws Exception {
		
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		
		try{
			sql = "INSERT INTO contrato_sw (id_contrato,id_trabajador,fecha_inicio_contrato,fecha_fin_contrato,cargo,posicion,tipo_contrato,estado_contrato,articulo_termino_contrato,inciso_termino_contrato,letra_termino_contrato) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
			ps = db.conn.prepareStatement(sql);
			ps.setInt   (1,  contrato.getId_contrato());
			ps.setInt   (2,  contrato.getId_trabajador());
			ps.setString(3,  contrato.getFecha_inicio_contrato());
			ps.setString(4,  contrato.getFecha_fin_contrato());
			ps.setInt   (5,  contrato.getCargo());
			ps.setInt   (6,  contrato.getPosicion());
			ps.setString(7,  contrato.getTipo_contrato());
			ps.setString(8,  contrato.getEstado_contrato());
			ps.setInt   (9,  contrato.getArticulo_termino_contrato());
			ps.setInt   (10, contrato.getInciso_termino_contrato());
			ps.setInt   (11, contrato.getLetra_termino_contrato());
			
			ps.execute();
			
			return true;
			
		}catch(Exception e){
			System.out.println("Error: " +e.getMessage());
			return false;
		}finally{
			
			ps.close();
			db.conn.close();
			
		}
		

	}
	
	public static boolean PreseleccionSimple (lib.classSW.PreseleccionSimple r) throws Exception{
		Statement ps = null;
		Statement ps2 = null;
		String sql="", sql2 = "";
		ConnectionDB db = new ConnectionDB();
		
		try{
			sql = "INSERT INTO preseleccionados (codigo_trabajador, codigo_peticion, status, id_peticion)";
			sql+= "VALUES ('"+r.getCodigoTrabajador()+"','"+r.getId_reclutamiento()+"','Preseleccionado',"+r.getId_peticion()+");";
							
			
			sql2 = "UPDATE trabajadores SET" 
					+ " id_pet_tbl_PT='"+ r.getId_peticion()+"', "
					+ " est_contrato='Preseleccionado',"
					+ " estado_preselec = 1"
					+ " WHERE codigo ='"+r.getCodigoTrabajador()+ "'";
			
			ps = db.conn.prepareStatement(sql);
			ps2 = db .conn.prepareStatement(sql2);
			
			ps.execute(sql);
			ps2.execute(sql2);
			
			return true;
		}catch (SQLException e){
			System.out.println("Error: "+ e.getMessage());
		}catch (Exception e){
			System.out.println("Error: "+ e.getMessage());
		}finally {
			ps.close();
			ps2.close();
			db.close();
		}
		return false;
	}
	
	
	// rechazo Preseleccionado
	public static boolean rechazoPre (RechazoPreseleccionado r) throws Exception{
      	Statement ps = null;
		Statement ps2 = null;
		String sql = "";
		String sql2 = "";
		ConnectionDB db = new ConnectionDB();
	
		try{
	
		
			sql = "UPDATE trabajadores SET" 
					+ " estado_preselec='0'"
					+ " WHERE codigo ='"+r.getCodigo()+ "'";
			
			
			sql2 = "UPDATE preseleccionados SET status = 'Rechazado', id_rechazo = '"+r.getId_rechazo()+"', observacion = '"+r.getObservacion()+"' WHERE codigo_trabajador = "+r.getCodigo()+" AND codigo_peticion = " +r.getId_peticion()+ " and id_peticion = "+r.getCodigo_peticion()+"";

     		ps = db.conn.prepareStatement(sql);
			ps2 = db .conn.prepareStatement(sql2);

			
			
     		ps.execute(sql);
			ps2.execute(sql2);

			
			return true;
		}catch (SQLException e){
			System.out.println("Error: "+ e.getMessage());
		}catch (Exception e){
			System.out.println("Error: "+ e.getMessage());
		}finally {
			ps.close();
			ps2.close();

			db.close();
		}
		return false;
	}
	
	// Seleccionar trabajador
	
	public static boolean seleccionPre (seleccionados r) throws Exception{

		Statement ps2 = null;

		String sql2 = "";
		ConnectionDB db = new ConnectionDB();
	
		try{
			sql2 = "UPDATE preseleccionados SET status = 'Seleccionado',fecha_inicio = '"+r.getFechaInicio()+"' "
					+ "WHERE codigo_trabajador = "+r.getCodigo_trabajador()+" and codigo_peticion = "+r.getCodigo_peticion()+ " and id_peticion = "+r.getId_peticion()+" ";
			
			
			ps2 = db .conn.prepareStatement(sql2);
			ps2.execute(sql2);
			
			return true;
		}catch (SQLException e){
			System.out.println("Error: "+ e.getMessage());
		}catch (Exception e){
			System.out.println("Error: "+ e.getMessage());
		}finally {
			ps2.close();
			db.close();
		}
		return false;
	}
	
	
	public static boolean insertReclu2 (reclutamiento r) throws Exception{
		Statement ps2 = null;
		String sql2 = "";
		
		ConnectionDB db = new ConnectionDB();
		try{
		
		sql2 = "INSERT INTO peticion_trabajador (cargo, posicion, obra, cantidad, fecha_inicio, id_reclutamiento)";
		sql2+= "VALUES ('"+r.getCargo()+"','"+r.getPosicion()+"','"+r.getObra()+"',"+r.getCantidad()+",'"+r.getFecha_estimada()+"', (select max(id_reclutamiento) from reclutamiento_c));";
				
		
		ps2 = db .conn.prepareStatement(sql2);
		ps2.execute(sql2);
		
	return true;
		}catch (SQLException e){
			System.out.println("Error: "+ e.getMessage());
		}catch (Exception e){
			System.out.println("Error: "+ e.getMessage());
		}finally {
		
			ps2.close();
			db.close();
		}
		return false;
	}//return cargos
	
	//		INSERT reclutamiento
	public static boolean insertReclu (reclutamiento r) throws Exception{
		Statement ps = null;
	
		String sql="";
		ConnectionDB db = new ConnectionDB();
		
		try{
					
			sql = "INSERT INTO reclutamiento_c (usuario,empresa,cantidad,estado,fecha_now)";
			sql += "VALUES ('"+r.getUsuario()+"','"+r.getEmpresa()+"',"+r.getCantidad()+",1,"
					+ "NOW());";
			
			ps = db.conn.prepareStatement(sql);
			
			
			ps.execute(sql);
		
			
			return true;
		}catch (SQLException e){
			System.out.println("Error: "+ e.getMessage());
		}catch (Exception e){
			System.out.println("Error: "+ e.getMessage());
		}finally {
			ps.close();
		
			db.close();
		}
		return false;
	}//return cargos
	public static ArrayList<Cargo> getCargos()  throws Exception{
		PreparedStatement ps = null;
		String sql="";
		ArrayList<Cargo> lista = new ArrayList<Cargo>();
		ConnectionDB db = new ConnectionDB();
		try{
			sql = "select * from cargos";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				Cargo cr = new Cargo();
				cr.setId_cargo(rs.getInt("id_cargo"));
				cr.setCargos(rs.getString("cargos"));
				lista.add(cr);
			}			
		}catch (SQLException e){
			System.out.println("Error: " + e.getMessage());
		}catch (Exception e){
			System.out.println("Error: " + e.getMessage());
		}finally {
			ps.close();
			db.close();
		}		
		return lista;
	}//return posiciones
	public static ArrayList<posiciones> getPosiciones()  throws Exception{
		PreparedStatement ps = null;
		String sql="";
		ArrayList<posiciones> lista = new ArrayList<posiciones>();
		ConnectionDB db = new ConnectionDB();
		try{
			sql = "select * from posiciones";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				posiciones cr = new posiciones();
				cr.setId_posicion(rs.getInt("id_posicion"));
				cr.setPosicion(rs.getString("posicion"));
				lista.add(cr);
			}			
		}catch (SQLException e){
			System.out.println("Error: " + e.getMessage());
		}catch (Exception e){
			System.out.println("Error: " + e.getMessage());
		}finally {
			ps.close();
			db.close();
		}		
		return lista;
	}
	
	
	
	public static ArrayList<ListaSociedad> getSociedad()  throws Exception{
		PreparedStatement ps = null;
		String sql="";
		ArrayList<ListaSociedad> lista = new ArrayList<ListaSociedad>();
		ConnectionDB db = new ConnectionDB();
		try{
			sql = "select * from sociedad";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				ListaSociedad cr = new ListaSociedad();
				cr.setSociedad(rs.getString("sociedad"));
				cr.setDenominacionSociedad(rs.getString("denominacionSociedad"));
				cr.setIdSociedad(rs.getInt("idSociedad"));
				lista.add(cr);
			}			
		}catch (SQLException e){
			System.out.println("Error: " + e.getMessage());
		}catch (Exception e){
			System.out.println("Error: " + e.getMessage());
		}finally {
			ps.close();
			db.close();
		}		
		return lista;
	}
	
	// cargar notificacion contrato
	public static ArrayList<NotificacionContrato> ListaNotificacionContrato()  throws Exception{
		PreparedStatement ps = null;
		String sql="";
		ArrayList<NotificacionContrato> lista = new ArrayList<NotificacionContrato>();
		ConnectionDB db = new ConnectionDB();
		try{
			sql = " select count(P.codigo_peticion) as requeridos,P.codigo_peticion,P.id_peticion,R.empresa,R.usuario from preseleccionados P left join reclutamiento_c R on  R.id_reclutamiento = P.codigo_peticion where status = 'Seleccionado'group by P.codigo_peticion,P.codigo_peticion,P.id_peticion,R.empresa,R.usuario order by P.codigo_peticion desc";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				NotificacionContrato cr = new NotificacionContrato();
				cr.setRequeridos(rs.getInt("requeridos"));
				cr.setId_peticion(rs.getInt("id_peticion"));
				cr.setCodigo_peticion(rs.getInt("codigo_peticion"));
				cr.setUsuario(rs.getString("usuario"));
				lista.add(cr);
			}			
		}catch (SQLException e){
			System.out.println("Error: " + e.getMessage());
		}catch (Exception e){
			System.out.println("Error: " + e.getMessage());
		}finally {
			ps.close();
			db.close();
		}		
		return lista;
	}
	
	public static ArrayList<listaRechazo> getRechazos()  throws Exception{
		PreparedStatement ps = null;
		String sql="";
		ArrayList<listaRechazo> lista = new ArrayList<listaRechazo>();
		ConnectionDB db = new ConnectionDB();
		try{
			sql = "select * from lista_rechazo";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				listaRechazo cr = new listaRechazo();
				cr.setId_lista(rs.getInt("id_lista"));
				cr.setNombre_lista(rs.getString("nombre_lista"));
				lista.add(cr);
			}			
		}catch (SQLException e){
			System.out.println("Error: " + e.getMessage());
		}catch (Exception e){
			System.out.println("Error: " + e.getMessage());
		}finally {
			ps.close();
			db.close();
		}		
		return lista;
	}
	
	// cargar trabajadores seleccionados en pantalla de contratacion
	public static ArrayList<LoadContratacion> LoadSeleccContratacion(int id_peticion,int cod_peticion ) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<LoadContratacion> data = new ArrayList<LoadContratacion>();
		ConnectionDB db = new ConnectionDB();
		try{
			sql ="select distinct  P.codigo_trabajador,(select nombre from trabajadores where codigo = codigo_trabajador) as nombre,(select cargo from peticion_trabajador where id_peticion = "+id_peticion+") as cargo,(select posicion from peticion_trabajador where id_peticion = "+id_peticion+") as posicion,(select telefono from trabajadores where codigo = codigo_trabajador) as telefono,P.fecha_inicio,P.id_peticion,P.codigo_peticion,(select id from trabajadores where codigo = P.codigo_trabajador group by id) as id from preseleccionados P where P.codigo_peticion = "+cod_peticion+" and P.id_peticion = "+id_peticion+" and P.status = 'Seleccionado' GROUP BY P.codigo_trabajador,P.fecha_inicio";
			
			
			
			 ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				LoadContratacion e = new LoadContratacion();
				e.setCodigo(rs.getInt("codigo_trabajador"));
				e.setNombre(rs.getString("nombre"));
				e.setPosicion(rs.getString("posicion"));
				e.setFecha_inicio(rs.getString("fecha_inicio"));
				e.setCargo(rs.getString("cargo"));
				e.setTelefono(rs.getString("telefono"));
				e.setId(rs.getInt("id"));
				
				
				
				data.add(e);
			}
			rs.close();
			ps.close();
			db.conn.close();
		}catch(Exception ex){
			System.out.println("Error: "+ex.getMessage());
		}finally{
			db.close();
		}
		return data;
	}
	
	
	// cargar select cargo pantalla preseleccion
	public static ArrayList<LoadCargoPreseleccion> getCargoPreseleccion(int entero ) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<LoadCargoPreseleccion> data = new ArrayList<LoadCargoPreseleccion>();
		ConnectionDB db = new ConnectionDB();
		try{
			sql ="select P.cargo, P.posicion, P.id_peticion,R.usuario from reclutamiento_c R join peticion_trabajador P on R.id_reclutamiento = P.id_reclutamiento where P.id_reclutamiento = "+entero+" and estado_peticion = 1 group by P.cargo, P.id_peticion,P.posicion";
			
			
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				LoadCargoPreseleccion e = new LoadCargoPreseleccion();
				e.setCargo(rs.getString("cargo"));
				e.setId_peticion(rs.getInt("id_peticion"));
				e.setUsuario(rs.getString("usuario"));
				e.setPosicion(rs.getString("posicion"));
				
				data.add(e);
			}
			rs.close();
			ps.close();
			db.conn.close();
		}catch(Exception ex){
			System.out.println("Error: "+ex.getMessage());
		}finally{
			db.close();
		}
		return data;
	}
	
	public static ArrayList<PreseleccionDetalle> LoadNSolicitud(int entero ) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<PreseleccionDetalle> data = new ArrayList<PreseleccionDetalle>();
		ConnectionDB db = new ConnectionDB();
		try{
			sql ="select P.id_reclutamiento, sum(P.cantidad) as cantidad, P.obra,P.fecha_inicio,R.fecha_now from peticion_trabajador P join reclutamiento_c R on P.id_reclutamiento = R.id_reclutamiento where P.id_reclutamiento = "+entero+" group by P.obra,P.id_reclutamiento,P.fecha_inicio";
			
			
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				PreseleccionDetalle e = new PreseleccionDetalle();
				e.setId_reclutamiento(rs.getInt("id_reclutamiento"));
				e.setCantidad(rs.getInt("cantidad"));
				e.setObra(rs.getString("obra"));
				e.setFecha_inicio(rs.getString("fecha_inicio"));
				e.setFecha_now(rs.getString("fecha_now"));

				data.add(e);
			}
			rs.close();
			ps.close();
			db.conn.close();
		}catch(Exception ex){
			System.out.println("Error: "+ex.getMessage());
		}finally{
			db.close();
		}
		return data;
	}
	
	
	public static ArrayList<PreseleccionDetalleVer> PreseleccionDetalleVerMasLista(int entero ) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<PreseleccionDetalleVer> data = new ArrayList<PreseleccionDetalleVer>();
		ConnectionDB db = new ConnectionDB();
		try{
			sql =" select P.id_reclutamiento, sum(P.cantidad) as cantidad_total, P.obra as faena, P.fecha_inicio,R.usuario, (select count(*) from preseleccionados where codigo_peticion = P.id_reclutamiento and status = 'Seleccionado') as seleccionado, (select count(*) from preseleccionados where codigo_peticion = P.id_reclutamiento and status = 'Preseleccionado') as preseleccionado, (select count(*) from preseleccionados where codigo_peticion = P.id_reclutamiento and status = 'Contratado') as con, sum(P.cantidad) - (select sum((SELECT count(status) from preseleccionados where status = 'Contratado' and id_peticion =  P.id_peticion and codigo_peticion = P.id_reclutamiento))) as saldo from peticion_trabajador P join reclutamiento_c R on P.id_reclutamiento = R.id_reclutamiento where R.estado = 1 and P.id_reclutamiento = "+entero+" group by P.obra,P.id_reclutamiento,P.fecha_inicio ";

			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				PreseleccionDetalleVer e = new PreseleccionDetalleVer();
				e.setId_lista(rs.getInt("id_reclutamiento"));
				e.setCantidad(rs.getInt("cantidad_total"));
				e.setObra(rs.getString("faena"));
				e.setUsuario(rs.getString("usuario"));
				e.setSaldo(rs.getInt("saldo"));
				e.setSeleccionado(rs.getInt("seleccionado"));
				e.setPreseleccionado(rs.getInt("preseleccionado"));
				
				
				

				data.add(e);
			}
			rs.close();
			ps.close();
			db.conn.close();
		}catch(Exception ex){
			System.out.println("Error: "+ex.getMessage());
		}finally{
			db.close();
		}
		return data;
	}
	
	// Preseleccion boton ver mas
	public static ArrayList<PreseleccionDetalleVer> PreseleccionDetalleVerMas(int entero ) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<PreseleccionDetalleVer> data = new ArrayList<PreseleccionDetalleVer>();
		ConnectionDB db = new ConnectionDB();
		try{
			sql ="select  P.id_peticion AS id_lista ,P.cargo,( select count(status) from preseleccionados  where status = 'Preseleccionado' and  id_peticion = id_lista ) as preseleccionado,( select count(status) from preseleccionados  where status = 'Seleccionado' and  id_peticion = id_lista ) as seleccionado, P.posicion,P.obra, P.cantidad,P.fecha_inicio, (P.cantidad) -(select sum((SELECT count(status) from preseleccionados  where status = 'Contratado' and id_peticion =  P.id_peticion and codigo_peticion = "+entero+")) ) as saldo from reclutamiento_c R join peticion_trabajador P on R.id_reclutamiento = P.id_reclutamiento where P.id_reclutamiento = "+entero+" group by P.id_peticion,P.cargo, P.posicion,P.obra, P.cantidad,P.fecha_inicio,id_lista";
			
			
			
			
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				PreseleccionDetalleVer e = new PreseleccionDetalleVer();
				e.setId_lista(rs.getInt("id_lista"));
				e.setCargo(rs.getString("cargo"));
				e.setObra(rs.getString("obra"));
				e.setCantidad(rs.getInt("cantidad"));
				e.setFecha_inicio(rs.getString("fecha_inicio"));
				e.setPosicion(rs.getString("posicion"));
				e.setSaldo(rs.getInt("saldo"));
				e.setSeleccionado(rs.getInt("seleccionado"));
				e.setPreseleccionado(rs.getInt("preseleccionado"));

				data.add(e);
			}
			rs.close();
			ps.close();
			db.conn.close();
		}catch(Exception ex){
			System.out.println("Error: "+ex.getMessage());
		}finally{
			db.close();
		}
		return data;
	}
	public static boolean UpdateReclutamiento(UpdateEstadoReclutamiento map) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		try{
			sql = "UPDATE reclutamiento_c SET observacion = ?, estado=0 WHERE id_reclutamiento= ? ";
			ps = db.conn.prepareStatement(sql);
			ps.setString(1, map.getObservacion());
			ps.setInt(2, map.getId_reclutamiento());
			
			
			ps.execute();
			return true;
		}catch(Exception ex){
			System.out.println("Error: "+ex.getMessage());
		}finally{
			ps.close();
			db.conn.close();
		}
		return false;
	}
	public static ArrayList<trabajadores> loadPersonal() throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<trabajadores> data = new ArrayList<trabajadores>();
		ConnectionDB db = new ConnectionDB();
		try{
			sql = "SELECT  * FROM trabajadores WHERE id_status = 0 and estado_preselec = 0";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				trabajadores e = new trabajadores();
				e.setCodigo(rs.getString("codigo"));
				e.setRut(rs.getString("rut"));
				e.setNombre(rs.getString("nombre"));
				e.setfNacimineto(rs.getString("fNacimiento"));
				e.setDireccion(rs.getString("direccion"));
				e.setTelefono(rs.getString("telefono"));
				e.setId(rs.getInt("id"));
				e.setId_perfil(rs.getInt("id_perfil"));
				e.setF_termino(rs.getString("f_termino"));
				e.setEmail(rs.getString("email"));
				//e.setF_ingreso(rs.getString("f_ingreso"));
				//e.setNacionalidad(rs.getString("nacionalidad"));
				//e.setEstado_civil(rs.getString("estado_civil"));
				
				//e.setIsapre(rs.getString("isapre"));
				//e.setPrevision(rs.getString("prevision"));
				//e.setC_normales(rs.getInt("c_normales"));
				//e.setC_invalidas(rs.getInt("c_invalidas"));
				//e.setT_asign_familiar(rs.getString("t_asign_familiar"));
				
				e.setEst_contrato(rs.getString("est_contrato"));
				e.setTipo_contrato(rs.getString("tipo_contrato"));
//				e.setId_departamento(rs.getInt("id_departamento"));
//				e.setEstablecimiento(rs.getString("establecimiento"));
//				e.setHrs_semanal(rs.getInt("hrs_semanal"));
//				e.setAjus_sueldo_base(rs.getString("ajus_sueldo_base"));
//				e.setBene_semana_corrida(rs.getString("bene_semana_corrida"));
//				e.setSeguro_cesantia(rs.getString("seguro_cesantia"));
//				e.setIn_per_seg_ces(rs.getString("in_per_seg_ces"));
//				e.setAefc_seg_accidentes(rs.getString("afec_seg_accidentes"));
//				e.setTipo_pacto(rs.getString("tipo_pacto"));
//				e.setMoneda_mon_ges(rs.getString("moneda_mon_ges"));
//				e.setMonto_pactado(rs.getInt("monto_pactado"));
//				e.setMonto_ges(rs.getInt("monto_ges"));
//				e.setTipo_sueldo_base(rs.getString("tipo_sueldo_base"));
//				e.setSueldo_mensual(rs.getInt("sueldo_mensual"));
//				e.setAsign_zona_extrema(rs.getInt("asign_zona_extrema"));
//				e.setGratificacion_legal(rs.getString("gratificacion_legal"));
//				e.setNo_cuenta(rs.getString("no_cuenta"));
//				e.setInstitucion_bco(rs.getString("institucion_bco"));
				e.setCargo(rs.getInt("cargo"));
				data.add(e);
			}
			rs.close();
			ps.close();
			db.conn.close();
		}catch(Exception ex){
			System.out.println("Error: "+ex.getMessage());
		}finally{
			db.close();
		}
		return data;
	}
	//cargar p haberes descuentos
	public static ArrayList<haberesDescuentos> getHaberDsc() throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<haberesDescuentos> lista = new ArrayList<haberesDescuentos>();
		ConnectionDB db = new ConnectionDB();
		try{
			sql = "SELECT * FROM sw_p_haberesDescuentos";
			
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				haberesDescuentos hd = new haberesDescuentos();
				hd.setCodigo(rs.getInt("codigo"));
				hd.setDescripcion(rs.getString("descripcion"));
				hd.setTipo(rs.getString("tipo"));
				hd.setImponible(rs.getString("imponible"));
				hd.setTributable(rs.getString("tributable"));
				hd.setGratificacion(rs.getString("gratificacion"));
				hd.setIncluirGlosa(rs.getString("incluirGlosa"));
				hd.setCaracterFija(rs.getString("caracterFija"));
				hd.setCaracterVariable(rs.getString("caracterVariable"));
				hd.setSemanaCorrida(rs.getString("semanaCorrida"));
				lista.add(hd);
			}			
		}catch (SQLException e){
			System.out.println("Error: " + e.getMessage());
		}catch (Exception e){
			System.out.println("Error: " + e.getMessage());
		}finally {
			ps.close();
			db.close();
		}
		return lista;
	}


				// cargar conceptos haberes y descuentos
				public static ArrayList<LoadConceptos> getConceptos(String HD ) throws Exception{
					PreparedStatement ps = null;
					String sql = "";
					ArrayList<LoadConceptos> data = new ArrayList<LoadConceptos>();
					ConnectionDB db = new ConnectionDB();
					try{
						sql ="select codigo, descripcion from sw_p_haberesDescuentos where tipo = '"+HD+"'";
						
						
						ps = db.conn.prepareStatement(sql);
						ResultSet rs = ps.executeQuery(sql);
						while(rs.next()){
							LoadConceptos e = new LoadConceptos();
							
							e.setCodigo(rs.getInt("codigo"));
							e.setConceptos(rs.getString("descripcion"));
						
							data.add(e);
						}
						rs.close();
						ps.close();
						db.conn.close();
					}catch(Exception ex){
						System.out.println("Error: "+ex.getMessage());
					}finally{
						db.close();
					}
					return data;
				}
	
				
				//todos los trabajadores codigo y nombre
				public static ArrayList<trabajadores> getallTrabajaCodNom(String idSociedad,String huerto, String zona, String ceco,int rolPrivado)  throws Exception{
					PreparedStatement ps = null;
					String sql="";
					ArrayList<trabajadores> lista = new ArrayList<trabajadores>();
					ConnectionDB db = new ConnectionDB();
					try{
						sql = "select  "
								+ "TR.codigo,"
								+ "TR.nombre,"
								+ "TR.apellidoPaterno,"
								+ "TR.apellidoMaterno "
								+ "from contratos CO "
								+ "inner join trabajadores TR on TR.codigo = CO.codigo_trabajador "
								+ "where 1 = 1 and CO.EstadoContrato = 1  ";
						System.out.println("roll privado es "+rolPrivado);
						
						if(rolPrivado == 1){
							sql += " and  TR.rolPrivado in (1,0)";
						}else{
							sql += " and  TR.rolPrivado in (0)";
						}
						
						
						if("null".equals(idSociedad)){}else{sql += " and idSociedad = "+idSociedad+"";}
						if("null".equals(huerto)){}else{sql += " and TR.idHuerto = '"+huerto+"'";}
						if("null".equals(zona)){}else{sql += " and TR.idZona = '"+zona+"'";}
						if("null".equals(ceco)){}else{sql += " and TR.idCECO = '"+ceco+"'";}
						
						//sql += " and CO.EstadoContrato = 1 group by CO.codigo_trabajador";
						sql += " group by CO.codigo_trabajador";
						System.out.println(sql);
						ps = db.conn.prepareStatement(sql);
						ResultSet rs = ps.executeQuery(sql);
						while(rs.next()){
							trabajadores tr = new trabajadores();
							tr.setCodigo(rs.getString("codigo"));
							tr.setNombre(rs.getString("nombre"));
							tr.setAp_paterno(rs.getString("apellidoPaterno"));
							tr.setAp_materno(rs.getString("apellidoMaterno"));
							lista.add(tr);
						}			
					}catch (SQLException e){
						System.out.println("Error: " + e.getMessage());
					}catch (Exception e){
						System.out.println("Error: " + e.getMessage());
					}finally {
						ps.close();
						db.close();
					}		
					return lista;
				}
				
				
				// insert haberes y descuento para trabajadores
				
				public static boolean insertarHD (InsertHD r) throws Exception{
					Statement ps = null;
				
					String sql="";
					ConnectionDB db = new ConnectionDB();
					
					try{
						sql = "INSERT INTO sw_haberesDescuentos (periodo , tipo, codigo_hd , monto , codigo_trabajador,frecuencia,cuotas,fecha_inicio,fecha_termino,idContrato,llave_moneda,proporcional)";
						sql+= "VALUES ("+r.getPeriodo()+",'"+r.getTipo()+"',"+r.getCodigo_hd()+","+r.getMonto()+","+r.getCodigo_trabajador()+","+r.getFrecuencia()+","+r.getCuotas()+","+r.getFecha_inicio()+","+r.getFecha_termino()+","+r.getId_contrato()+ ","+r.getIdmoneda()+","+r.getValorcheck()+");";
										
						System.out.println(sql);
						
						ps = db.conn.prepareStatement(sql);
						
						
						ps.execute(sql);
					
						
						return true;
					}catch (SQLException e){
						System.out.println("Error: "+ e.getMessage());
					}catch (Exception e){
						System.out.println("Error: "+ e.getMessage());
					}finally {
						ps.close();
					
						db.close();
					}
					return false;
				}
				
				public static ArrayList<sw_haberesDescuentos> sw_haberesDescuento() throws Exception{
					PreparedStatement ps = null;
					String sql = "";
					ArrayList<sw_haberesDescuentos> lista = new ArrayList<sw_haberesDescuentos>();
					ConnectionDB db = new ConnectionDB();
					try{
						sql = "SELECT sw.id,sw.periodo,sw.tipo,sw.codigo_hd,sw.monto,sw.fecha,sw.codigo_trabajador,"
								+ "(select descripcion from parametros where id = sw.frecuencia) as frecuencia,"
								+ "sw.frecuencia as idfrecuencia,sw.cuotas,sw.fecha_inicio,sw.fecha_termino, tr.nombre,tr.apellidoPaterno,tr.apellidoMaterno FROM sw_haberesDescuentos sw inner join trabajadores tr on sw.codigo_trabajador = tr.codigo ";
						
						ps = db.conn.prepareStatement(sql);
						ResultSet rs = ps.executeQuery(sql);
						while(rs.next()){
							sw_haberesDescuentos hd = new sw_haberesDescuentos();
							hd.setId(rs.getInt("id"));
							hd.setPeriodo(rs.getInt("periodo"));
							hd.setTipo(rs.getString("tipo"));
							hd.setNombre(rs.getString("nombre"));
							hd.setApellidopaterno(rs.getString("apellidoPaterno"));
							hd.setApellidomaterno(rs.getString("apellidoMaterno"));
							hd.setCodigo_hd(rs.getInt("codigo_hd"));
							hd.setMonto(rs.getInt("monto"));
							hd.setFecha(rs.getDate("fecha"));
							hd.setCodigo_trabajador(rs.getString("codigo_trabajador"));
							
							hd.setNombreFrecuencia(rs.getString("frecuencia"));
							hd.setIdfrecuencia(rs.getInt("idfrecuencia"));
							hd.setCuotas(rs.getInt("cuotas"));
							hd.setFechainicio(rs.getInt("fecha_inicio"));
							hd.setFechatermino(rs.getInt("fecha_termino"));
					
							
					
							
							
							
							lista.add(hd);
						}			
					}catch (SQLException e){
						System.out.println("Error: " + e.getMessage());
					}catch (Exception e){
						System.out.println("Error: " + e.getMessage());
					}finally {
						ps.close();
						db.close();
					}
					return lista;
				}
				
				public static boolean updateTHD(UpdateTrabajadorHD pre) throws  Exception{
					PreparedStatement ps = null;
					String sql = "";
					ConnectionDB  db = new ConnectionDB();	
					try {

						sql = "Update sw_haberesDescuentos set "
							+ "periodo = "+ pre.getPeriodo_t()+", "
							+ "tipo ='" +pre.getTipo_t()+ "',"
							+ "codigo_hd = " +pre.getCodigo_hd_t()+ ","
							+ "monto = " +pre.getMontonew()+ ","
							+ "frecuencia = " +pre.getFrecuencia_t()+ ","
							+ "cuotas = " +pre.getCuota()+ ","
						    + "fecha_inicio = " +pre.getPeriodo_t()+ ","
						    + "fecha_termino = " +pre.getFecha_termino()+ ","
						    + "proporcional = " +pre.getProporcional()+ ","
						    + "llave_moneda = " +pre.getIdmoneda()+ " "	
							+ "where id = "+pre.getId()+""; 
				
						
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
				
			// insertar contratos
				
				public static GetDatosContratoTrabajador insertarContrato (InsertContrato r, int pet,int cod) throws Exception{
					Statement ps = null;
					Statement ps2 = null;
					Statement ps3 = null;
					Statement ps4 = null;
					
					String sql="";
					String sql2="";
					String sql3="";
					String sql4="";
					
					ConnectionDB db = new ConnectionDB();
					GetDatosContratoTrabajador tr = new GetDatosContratoTrabajador();
					
					try{
						sql = "INSERT INTO contratos (codigo_trabajador,id_peticion,codigo_peticion)";
						sql+= "VALUES ("+r.getCodigo_trabajador()+","+r.getId_peticion()+","+r.getCodigo_peticion()+");";
										
						sql2 = "select TR.codigo as codigoTrabajador,'ciudadContrato',(select empresa from reclutamiento_c where id_reclutamiento = "+pet+") as nombreEmpresa,TR.apellidoPaterno as appPatTrabajador,TR.apellidoMaterno as appMaternoTrabajador,TR.rut as rutCompletoTrabajador,(select descripcion from parametros where codigo = 'ESTADO_CIVIL' and llave = TR.idEstadoCivil) as estadoCivil,TR.fNacimiento as fechaNacimientoTrabajador,(select pais from nacionalidad  where idnacionalidad = TR.idNacionalidad) as nacionalidadTrabajador, TR.direccion as direccionTrabajador,(select nombre from comuna  where id = TR.idComuna) as comuna, (select cargo from peticion_trabajador  where id_reclutamiento = "+pet+" group by cargo) as cargoTrabajador,(select obra from peticion_trabajador  where id_reclutamiento = "+pet+" group by obra) as faenaContratacion,'SueldoCpuntosTrabajador',(select fecha_inicio from preseleccionados where codigo_trabajador = "+r.getCodigo_trabajador()+" and codigo_peticion = "+pet+") as fechaInicio,'ciudadContrato',TR.rut as rutCompletoTrabajador from trabajadores TR where codigo = "+r.getCodigo_trabajador()+"";
						
						sql3 = "UPDATE trabajadores SET id_status = 1 WHERE codigo = "+r.getCodigo_trabajador()+"";	  
						
						sql4 = "UPDATE preseleccionados SET status = 'Contratado' WHERE codigo_trabajador = "+r.getCodigo_trabajador()+" and codigo_peticion = "+pet+" and id_peticion = "+cod+"";
						
						
						ps = db.conn.prepareStatement(sql);
						ps2 = db.conn.prepareStatement(sql2);
						ps3 = db.conn.prepareStatement(sql3);
						ps4 = db.conn.prepareStatement(sql4);
						
						ps.execute(sql);
						ps3.execute(sql3);
						ps4.execute(sql4);
						
						ResultSet rs = ps2.executeQuery(sql2);
						
						while(rs.next()){
							
							tr.setCodigoTrabajador(rs.getString("codigoTrabajador"));
							tr.setCiudadContrato(rs.getString("ciudadContrato"));
							tr.setNombreEmpresa(rs.getString("nombreEmpresa"));
							tr.setAppPatTrabajador(rs.getString("appPatTrabajador"));
							tr.setAppMaternoTrabajador(rs.getString("appMaternoTrabajador"));
							tr.setRutCompletoTrabajador(rs.getString("rutCompletoTrabajador"));
							tr.setEstadoCivil(rs.getString("estadoCivil"));
							tr.setFechaNacimientoTrabajador(rs.getString("fechaNacimientoTrabajador"));
							tr.setNacionalidadTrabajador(rs.getString("nacionalidadTrabajador"));
							tr.setDireccionTrabajador(rs.getString("direccionTrabajador"));
							tr.setComunaTrabajador(rs.getString("comuna"));
							tr.setCargoTrabajador(rs.getString("cargoTrabajador"));
							tr.setFaenaContratacion(rs.getString("faenaContratacion"));
							tr.setSueldoCPuntosTrabajador(rs.getString("SueldoCpuntosTrabajador"));
							tr.setFechaInicio(rs.getString("fechaInicio"));
							tr.setCiudadContrato(rs.getString("ciudadContrato"));
							tr.setRutCompletoTrabajador(rs.getString("rutCompletoTrabajador"));
						 
							
							
							
							return tr;
							
						}		
						
					}catch (SQLException e){
						System.out.println("Error: "+ e.getMessage());
					}catch (Exception e){
						System.out.println("Error: "+ e.getMessage());
					}finally {
						ps.close();
						ps2.close();
						ps3.close();
						ps4.close();
						db.close();
					}
					return null;
				}
				
				//cargar saldo de lista de peticion
				public static ArrayList<ListaSolicitudes> saldoNotificacion(int codigo_P, int id_P) throws Exception{
					PreparedStatement ps = null;
					String sql = "";
					ArrayList<ListaSolicitudes> lista = new ArrayList<ListaSolicitudes>();
					ConnectionDB db = new ConnectionDB();
					try{
						sql = "select P.id_reclutamiento,P.id_peticion,sum(P.cantidad) as cantidad_total,P.obra as faena, P.fecha_inicio,R.usuario, (select count(*)from preseleccionados where codigo_peticion = P.id_reclutamiento  and status = 'Seleccionado') as seleccionado,	(select count(*) from preseleccionados where codigo_peticion = P.id_reclutamiento	and status = 'Preseleccionado') as preseleccionado, sum(P.cantidad) - (select sum((SELECT count(status) from preseleccionados where status = 'Contratado' and id_peticion =  P.id_peticion and codigo_peticion = P.id_reclutamiento)) )as saldo from peticion_trabajador P join reclutamiento_c R on P.id_reclutamiento = R.id_reclutamiento where R.estado = 1 and R.id_reclutamiento = "+codigo_P+" and P.id_peticion = "+id_P+" group by P.obra,P.id_reclutamiento,P.fecha_inicio,P.id_peticion";
						
						 
						ps = db.conn.prepareStatement(sql);
						ResultSet rs = ps.executeQuery(sql);
						while(rs.next()){
							ListaSolicitudes hd = new ListaSolicitudes();
							hd.setTotal_saldo(rs.getInt("saldo"));
							hd.setCantidad_total(rs.getInt("cantidad_total"));
							
							lista.add(hd);
						}			
					}catch (SQLException e){
						System.out.println("Error: " + e.getMessage());
					}catch (Exception e){
						System.out.println("Error: " + e.getMessage());
					}finally {
						ps.close();
						db.close();
					}
					return lista;
				}
				//cambiar estado peticion pagina lista preseleccion
				public static boolean updateListadoP(NotificacionContrato map) throws Exception{
					PreparedStatement ps = null;
					String sql = "";
					ConnectionDB db = new ConnectionDB();
					try{
						sql = "UPDATE peticion_trabajador SET estado_peticion = 0 WHERE id_peticion = ? and id_reclutamiento = ?";
						
						ps = db.conn.prepareStatement(sql);
						ps.setInt(1, map.getId_peticion());
						ps.setInt(2, map.getCodigo_peticion());
						
						
						
						ps.execute();
						return true;
					}catch(Exception ex){
						System.out.println("Error: "+ex.getMessage());
					}finally{
						ps.close();
						db.conn.close();
					}
					return false;
				}
				
				// saldo por orden
				public static ArrayList<ListaSolicitudes> saldoxOrden(int codigo_P, int id_P) throws Exception{
					PreparedStatement ps = null;
					String sql = "";
					ArrayList<ListaSolicitudes> lista = new ArrayList<ListaSolicitudes>();
					ConnectionDB db = new ConnectionDB();
					try{
						sql = "select P.id_reclutamiento, sum(P.cantidad) as cantidad_total,P.obra as faena, P.fecha_inicio,R.usuario,(select count(*) from preseleccionados where codigo_peticion = P.id_reclutamiento and status = 'Seleccionado') as seleccionado, (select count(*) from preseleccionados where codigo_peticion = P.id_reclutamiento and status = 'Preseleccionado') as preseleccionado, sum(P.cantidad) - (select sum((SELECT count(status) from preseleccionados where status = 'Contratado' and id_peticion =  P.id_peticion and codigo_peticion = P.id_reclutamiento)))as saldo from peticion_trabajador P join reclutamiento_c R on P.id_reclutamiento = R.id_reclutamiento where R.estado = 1 and R.id_reclutamiento = "+codigo_P+" group by P.obra,P.id_reclutamiento,P.fecha_inicio ";
						
						 
						ps = db.conn.prepareStatement(sql);
						ResultSet rs = ps.executeQuery(sql);
						while(rs.next()){
							ListaSolicitudes hd = new ListaSolicitudes();
							hd.setTotal_saldo(rs.getInt("saldo"));
							hd.setCantidad_total(rs.getInt("cantidad_total"));
							
							lista.add(hd);
						}			
					}catch (SQLException e){
						System.out.println("Error: " + e.getMessage());
					}catch (Exception e){
						System.out.println("Error: " + e.getMessage());
					}finally {
						ps.close();
						db.close();
					}
					return lista;
				}
				//cambiar estado orden cuando se completa el total de la cantidad de personas solicitadas

				public static boolean updateListadoO(NotificacionContrato map) throws Exception{
					PreparedStatement ps = null;
					String sql = "";
					ConnectionDB db = new ConnectionDB();
					try{
						sql = " UPDATE reclutamiento_c SET estado = 0 WHERE id_reclutamiento = ?";
						
						ps = db.conn.prepareStatement(sql);
						ps.setInt(1, map.getCodigo_peticion());
						
						
						
						ps.execute();
						return true;
					}catch(Exception ex){
						System.out.println("Error: "+ex.getMessage());
					}finally{
						ps.close();
						db.conn.close();
					}
					return false;
				}
				
				// devolver seleccionados a preseleccionados 
				public static ArrayList<preseleccionados> devolverSelec(int codigo_P, int id_P) throws Exception{
					PreparedStatement ps = null;
					String sql = "";
					ArrayList<preseleccionados> lista = new ArrayList<preseleccionados>();
					ConnectionDB db = new ConnectionDB();
					try{
						sql = "select distinct  P.codigo_trabajador,(select nombre from trabajadores where codigo = codigo_trabajador) as nombre,(select cargo from peticion_trabajador where id_peticion = "+id_P+") as cargo,(select posicion from peticion_trabajador where id_peticion = "+id_P+") as posicion,(select telefono from trabajadores where codigo = codigo_trabajador) as telefono,P.fecha_inicio,P.id_peticion,P.codigo_peticion from preseleccionados P	where P.codigo_peticion = "+codigo_P+" and P.id_peticion = "+id_P+" and P.status = 'Seleccionado' GROUP BY P.codigo_trabajador,P.fecha_inicio";
						
						 
						ps = db.conn.prepareStatement(sql);
						ResultSet rs = ps.executeQuery(sql);
						while(rs.next()){
							preseleccionados hd = new preseleccionados();
							hd.setCodigo_trabajador(rs.getInt("codigo_trabajador"));
							
							
							lista.add(hd);
						}			
					}catch (SQLException e){
						System.out.println("Error: " + e.getMessage());
					}catch (Exception e){
						System.out.println("Error: " + e.getMessage());
					}finally {
						ps.close();
						db.close();
					}
					return lista;
				}
				
				// update trabajadores que no fueron contratados  por que ya se culmplio el total requerido
				// volver al estado para preseleccionarlo para otra orden de reclutamiento
				
				public static boolean UTraNoSelec(preseleccionados map) throws Exception{
					PreparedStatement ps = null;
					String sql = "";
					ConnectionDB db = new ConnectionDB();
					try{
						sql = " UPDATE trabajadores SET estado_preselec = 0 WHERE codigo = ?";
						
						ps = db.conn.prepareStatement(sql);
						ps.setInt(1, map.getCodigo_trabajador());
						
						
						
						ps.execute();
						return true;
					}catch(Exception ex){
						System.out.println("Error: "+ex.getMessage());
					}finally{
						ps.close();
						db.conn.close();
					}
					return false;
				}
				// traspazar trabajador
				public static boolean traspazarTr (RechazoPreseleccionado r) throws Exception{
			      	Statement ps = null;
					Statement ps2 = null;
					String sql = "";
					String sql2 = "";
					ConnectionDB db = new ConnectionDB();
				
					try{
				
					
						sql = "UPDATE trabajadores SET" 
								+ " estado_preselec='0'"
								+ " WHERE codigo ='"+r.getCodigo()+ "'";
						
						
						sql2 = "UPDATE preseleccionados SET status = 'Traspazado', observacion = '"+r.getObservacion()+"' WHERE codigo_trabajador = "+r.getCodigo()+" AND codigo_peticion = " +r.getId_peticion()+ " and id_peticion = "+r.getCodigo_peticion()+"";

			     		ps = db.conn.prepareStatement(sql);
						ps2 = db .conn.prepareStatement(sql2);

						
						
			     		ps.execute(sql);
						ps2.execute(sql2);

						
						return true;
					}catch (SQLException e){
						System.out.println("Error: "+ e.getMessage());
					}catch (Exception e){
						System.out.println("Error: "+ e.getMessage());
					}finally {
						ps.close();
						ps2.close();

						db.close();
					}
					return false;
				}
				
				// Cargar todos los trabajadores asociados a una empresa
				public static ArrayList<LoadTrabajadorSociedad> getSociedadTrab(String idSociedad,String huerto, String zona, String ceco, int iduser) throws Exception{
					PreparedStatement ps = null;
					String sql = "";
					ArrayList<LoadTrabajadorSociedad> data = new ArrayList<LoadTrabajadorSociedad>();
					ConnectionDB db = new ConnectionDB();
					try{
						sql ="select TR.codigo,"
								+ "TR.nombre,"
								+ "TR.apellidoPaterno,"
								+ "TR.apellidoMaterno, "
								+ "TR.division,TR.idSubDivision,"
								+ "TR.grupo,TR.idSubgrupo,"
								+ "TR.rut "
								+ "from trabajadores TR "
								+ "left join contratos  CO  on TR.codigo = CO.codigo_trabajador "
								+ "left join campo ca on ca.campo = TR.idHuerto "
								+ "where 1 = 1 " ; 
						
						
						if("null".equals(idSociedad)){}else{sql += " and idSociedad = "+idSociedad+"";}
						if("null".equals(huerto)){}else{sql += " and TR.idHuerto = '"+huerto+"'";}
						if("null".equals(zona)){}else{sql += " and TR.idZona = '"+zona+"'";}
						if("null".equals(ceco)){}else{sql += " and TR.idCECO = '"+ceco+"'";}
						
						
						sql += " and CO.EstadoContrato = 1 "
								+ "and ca.campo in ( select codigo_campo FROM usuario_campo where codigo_usuario = "+iduser+")"
								+ "group by CO.codigo_trabajador";
						

						ps = db.conn.prepareStatement(sql);
						ResultSet rs = ps.executeQuery(sql);
						while(rs.next()){
							LoadTrabajadorSociedad e = new LoadTrabajadorSociedad();
							
							e.setCodigotrabajador(rs.getInt("codigo"));
							e.setNombre(rs.getString("nombre"));
							e.setApellidoPaterno(rs.getString("apellidoPaterno"));
							e.setApellidoMaterno(rs.getString("apellidoMaterno"));
						    e.setRut(rs.getString("rut"));
							data.add(e);
						}
						rs.close();
						ps.close();
						db.conn.close();
					}catch(Exception ex){
						System.out.println("Error: "+ex.getMessage());
					}finally{
						db.close();
					}
					return data;
				}
				
				// detalle trabajador para pantalla permiso y licencia
				public static ArrayList<LoadTrabajadorSociedad> getTrabajadorPermisolicencia(int codigo,int id ) throws Exception{
					PreparedStatement ps = null;
					String sql = "";
					ArrayList<LoadTrabajadorSociedad> data = new ArrayList<LoadTrabajadorSociedad>();
					ConnectionDB db = new ConnectionDB();
					try{
						sql ="select TR.codigo,TR.rut,TR.nombre,TR.apellidoPaterno,TR.apellidoMaterno,TR.direccion,TR.telefono,(select denominacionSociedad from sociedad where idSociedad = "+id+" ) AS empresa,TR.division as idDivision,(select division_personal from division_personal where iddivision_personal = idDivision) as divisionName,TR.idSubDivision,(select subdivision_de_personal from subdivision_personal where idsubdivision_personal = TR.idSubDivision) as subdivisionName,TR.grupo as idGrupo,(select grupo from grupo where idgrupo = TR.grupo) as grupoName,TR.idSubGrupo,(select subgrupo from subgrupo where idsubgrupo = TR.idSubGrupo) as subgrupoName from contratos  CO inner join trabajadores TR on TR.codigo = CO.codigo_trabajador where idSociedad = "+id+" and TR.codigo = "+codigo+" and CO.EstadoContrato = 1 group by CO.codigo_trabajador;";
						
						ps = db.conn.prepareStatement(sql);
						ResultSet rs = ps.executeQuery(sql);
						while(rs.next()){
							LoadTrabajadorSociedad e = new LoadTrabajadorSociedad();
							
							e.setCodigotrabajador(rs.getInt("codigo"));
							e.setRut(rs.getString("rut"));
							e.setNombre(rs.getString("nombre"));
							e.setApellidoPaterno(rs.getString("apellidoPaterno"));
							e.setApellidoMaterno(rs.getString("apellidoMaterno"));
							e.setDireccion(rs.getString("direccion"));
							e.setTelefono(rs.getString("telefono"));
							e.setEmpresa(rs.getString("empresa"));
							e.setIddivision(rs.getInt("idDivision"));
							e.setNombredivision(rs.getString("divisionName"));
							e.setIdsubdivision(rs.getInt("idSubDivision"));
							e.setNombresubdivision(rs.getString("subdivisionName"));
							e.setIdgrupo(rs.getInt("idGrupo"));
							e.setNombregrupo(rs.getString("grupoName"));
							e.setIdsubgrupo(rs.getInt("idSubGrupo"));
							e.setNombresubgrupo(rs.getString("subgrupoName"));

							data.add(e);
						}
						rs.close();
						ps.close();
						db.conn.close();
					}catch(Exception ex){
						System.out.println("Error: "+ex.getMessage());
					}finally{
						db.close();
					}
					return data;
				}
				
				///cargar tabla pantalla permiso licencia
				public static ArrayList<tablaPermisoLicencia> getTablaPL(String codigo,int idAccion,int idEmpresa,String huerto, String zona, String ceco ) throws Exception{
					PreparedStatement ps = null;
					String sql = "";
					ArrayList<tablaPermisoLicencia> data = new ArrayList<tablaPermisoLicencia>();
					ConnectionDB db = new ConnectionDB();
					try{
						sql ="select p.id,"
						   + "id_empresa,"
						   + "codigo_trabajador,"
						   + "(select nombre from trabajadores where codigo = codigo_trabajador)as nombretrab,"
						   + "(select apellidoPaterno from trabajadores where codigo = codigo_trabajador)as appaterno,"
						   + "(select apellidoMaterno from trabajadores where codigo = codigo_trabajador)as apmaterno,"
						   + "accion,"
						   + "(select descripcion from parametros where id = tipo_licencia) as tipo_licencia,"
						   + "(select descripcion from parametros where id = subtipo_licencia) as subtipo_licencia,"
						   + "(select descripcion from parametros where id = reposo) as nombre_reposo,"
						   + "reposo,"
						   + "incluye_feriados,"
						   + "fecha_desde,"
						   + "fecha_hasta,"
						   + "fecha_creacion,"
						   + "horas_inasistencia,"
						   + "dias_corridos,"
						   + "reposo,"
						   + "tipo_reposo,"
						   + "doctor,"
						   + "especialidad,"
						   + "tipo_licencia AS TipoLicenciaId,"
						   + "subtipo_licencia AS subTipoLicenciaId,"
						   + "ruta_archivo "
						   + "from permiso_licencia p "
						   + "INNER JOIN trabajadores tr on tr.codigo = p.codigo_trabajador where accion = "+idAccion+" ";
						   if("null".equals(codigo)){}else{sql += "and codigo_trabajador = "+codigo+" ";}
						   if("null".equals(huerto)){}else{sql += " and tr.idHuerto = '"+huerto+"' ";}
						   if("null".equals(zona)){}else{sql += " and tr.idZona = '"+zona+"' ";}
						   if("null".equals(ceco)){}else{sql += " and tr.idCECO = '"+ceco+"' ";}
						   sql+= " and id_empresa ="+idEmpresa+" ORDER BY p.id DESC";
						
					
						ps = db.conn.prepareStatement(sql);
						ResultSet rs = ps.executeQuery(sql);
						while(rs.next()){
							tablaPermisoLicencia e = new tablaPermisoLicencia();
							
							e.setId_empresa(rs.getInt("id_empresa"));
							e.setCodigo_trabajador(rs.getInt("codigo_trabajador"));
							e.setAccion(rs.getInt("accion"));
							e.setTipo_licencia(rs.getString("tipo_licencia"));
							e.setSubtipo_licencia(rs.getString("subtipo_licencia"));
							e.setIncluye_feriados(rs.getInt("incluye_feriados"));
							e.setFecha_desde(rs.getString("fecha_desde"));
							e.setFecha_hasta(rs.getString("fecha_hasta"));
							e.setFecha_creacion(rs.getString("fecha_creacion"));
							e.setHoras_inasistencia(rs.getInt("horas_inasistencia"));
							e.setDias_corridos(rs.getInt("dias_corridos"));
							e.setRuta_archivo(rs.getString("ruta_archivo"));
							e.setNombre_reposo(rs.getString("nombre_reposo"));
							e.setId(rs.getInt("id"));
							e.setSubtipo_licenciaid(rs.getInt("subTipoLicenciaId"));
							e.setTipo_licenciaid(rs.getInt("TipoLicenciaId"));
							e.setReposo(rs.getInt("reposo"));
							e.setDoctor(rs.getString("doctor"));
							e.setEspecialidad(rs.getString("especialidad"));
							e.setTipo_reposo(rs.getInt("tipo_reposo"));
							e.setNombrecompleto(rs.getString("appaterno")+" "+rs.getString("apmaterno")+" "+rs.getString("nombretrab"));
							data.add(e);
						}
						rs.close();
						ps.close();
						db.conn.close();
					}catch(Exception ex){
						System.out.println("Error: "+ex.getMessage());
					}finally{
						db.close();
					}
					return data;
				}
				public static boolean insertarPermisoConGoce (tablaPermisoLicencia r) throws Exception{
					
					PreparedStatement ps = null;
					String sql="";
					ConnectionDB db = new ConnectionDB();
					
					try{
						sql = "INSERT INTO permiso_licencia (id_empresa, codigo_trabajador, accion, fecha_desde, fecha_hasta, fecha_creacion,dias_corridos, ruta_archivo,idContrato,permisos_legales,permisos_convencionales) VALUES (?,?,?,?,?,NOW(),?,?,?,?,?)";
						ps = db.conn.prepareStatement(sql);
						
						ps.setInt    (1,  r.getId_empresa());
						ps.setInt    (2,  r.getCodigo_trabajador());
						ps.setInt    (3,  r.getAccion());
						ps.setString (4,  r.getFecha_desde());
						ps.setString (5,  r.getFecha_hasta());	
						ps.setInt    (6, r.getDias_corridos());
						ps.setString (7, r.getRuta_archivo());
						ps.setInt    (8, r.getIdContrato());
						ps.setInt    (9, r.getPermisolegal());
						ps.setInt    (10, r.getPermisoconvencional());
						ps.execute();
						
						return true;
					}catch (SQLException e){
						System.out.println("Error: "+ e.getMessage());
					}catch (Exception e){
						System.out.println("Error: "+ e.getMessage());
					}finally {
						ps.close();
					
						db.close();
					}
					return false;
				}
				
				public static boolean insertarPermiso (tablaPermisoLicencia r) throws Exception{
					
					PreparedStatement ps = null;
					String sql="";
					ConnectionDB db = new ConnectionDB();
					
					try{
						sql = "INSERT INTO permiso_licencia (id_empresa, codigo_trabajador, accion,incluye_feriados, fecha_desde, fecha_hasta, fecha_creacion,dias_corridos, ruta_archivo,idContrato) VALUES (?,?,?,?,?,?,NOW(),?,?,?)";
						ps = db.conn.prepareStatement(sql);
						
						
						ps.setInt    (1,  r.getId_empresa());
						ps.setInt    (2,  r.getCodigo_trabajador());
						ps.setInt    (3,  r.getAccion());
						ps.setInt    (4,  r.getIncluye_feriados());
						ps.setString (5,  r.getFecha_desde());
						ps.setString (6,  r.getFecha_hasta());	
						ps.setInt    (7, r.getDias_corridos());
						ps.setString (8, r.getRuta_archivo());
						ps.setInt    (9, r.getIdContrato());
						ps.execute();
						
						return true;
					}catch (SQLException e){
						System.out.println("Error: "+ e.getMessage());
					}catch (Exception e){
						System.out.println("Error: "+ e.getMessage());
					}finally {
						ps.close();
					
						db.close();
					}
					return false;
				}
//---------  
				public static ArrayList<TipoLicencia> getTipoLicencia()  throws Exception{
					PreparedStatement ps = null;
					String sql="";
					ArrayList<TipoLicencia> lista = new ArrayList<TipoLicencia>();
					ConnectionDB db = new ConnectionDB();
					try{
						sql = "select * from parametros where codigo = 'TIPO_LICENCIA' and activo = 1";
						ps = db.conn.prepareStatement(sql);
						ResultSet rs = ps.executeQuery(sql);
						while(rs.next()){
							TipoLicencia cr = new TipoLicencia();
							cr.setId(rs.getInt("id"));
							cr.setDescripcion(rs.getString("descripcion"));
						
							lista.add(cr);
						}			
					}catch (SQLException e){
						System.out.println("Error: " + e.getMessage());
					}catch (Exception e){
						System.out.println("Error: " + e.getMessage());
					}finally {
						ps.close();
						db.close();
					}		
					return lista;
				}
				
//-----------------------Listado Subtipo Licencia----------------------------
				
				
				
				public static ArrayList<TipoLicencia> getSubtipoLicencia()  throws Exception{
					PreparedStatement ps = null;
					String sql="";
					ArrayList<TipoLicencia> lista = new ArrayList<TipoLicencia>();
					ConnectionDB db = new ConnectionDB();
					try{
						sql = "select * from parametros where codigo = 'Sub_Tipo_Licencia' and activo = 1";
						ps = db.conn.prepareStatement(sql);
						ResultSet rs = ps.executeQuery(sql);
						while(rs.next()){
							TipoLicencia cr = new TipoLicencia();
							cr.setId(rs.getInt("id"));
							cr.setDescripcion(rs.getString("descripcion"));
						
							lista.add(cr);
						}			
					}catch (SQLException e){
						System.out.println("Error: " + e.getMessage());
					}catch (Exception e){
						System.out.println("Error: " + e.getMessage());
					}finally {
						ps.close();
						db.close();
					}		
					return lista;
				}
//---------------------------------------------------------------------------------
				public static boolean insertarLicencia (tablaPermisoLicencia r) throws Exception{
					
					PreparedStatement ps = null;
					String sql="";
					ConnectionDB db = new ConnectionDB();
					
					try{
						sql = "INSERT INTO permiso_licencia (id_empresa, codigo_trabajador, accion, tipo_licencia, subtipo_licencia, incluye_feriados, fecha_desde, fecha_hasta, fecha_creacion, dias_corridos, ruta_archivo,reposo,doctor,especialidad,tipo_reposo,idContrato) VALUES (?,?,?,?,?,?,?,?,NOW(),?,?,?,?,?,?,?)";
						ps = db.conn.prepareStatement(sql);
						
						
						
						ps.setInt    (1,  r.getId_empresa());
						ps.setInt    (2,  r.getCodigo_trabajador());
						ps.setInt    (3,  r.getAccion());
						ps.setInt    (4,  r.getTipo_licenciaid());
						ps.setInt    (5,  r.getSubtipo_licenciaid());
						ps.setInt    (6,  r.getIncluye_feriados());
						ps.setString (7,  r.getFecha_desde());
						ps.setString (8,  r.getFecha_hasta());	
						ps.setInt    (9, r.getDias_corridos());
						ps.setString (10, r.getRuta_archivo());
						ps.setInt    (11, r.getReposo());
						ps.setString (12, r.getDoctor());
						ps.setString (13, r.getEspecialidad());
						ps.setInt    (14, r.getTipo_reposo());
						ps.setInt    (15, r.getIdContrato());
						ps.execute();
						
						return true;
					}catch (SQLException e){
						System.out.println("Error: "+ e.getMessage());
					}catch (Exception e){
						System.out.println("Error: "+ e.getMessage());
					}finally {
						ps.close();
					
						db.close();
					}
					return false;
				}
//-----------------eliminar habers y descuento----------------------------
				public static boolean eliminarHD(int id) throws  Exception{
					PreparedStatement ps = null;
					String sql = "";
					ConnectionDB  db = new ConnectionDB();	
					try {
						sql = "DELETE FROM sw_haberesDescuentos WHERE id="+id+"";
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
//--------------------load Tipo de Pago--------------------------------------------------------
				public static ArrayList<CargarTipodePago> getTipoPago()  throws Exception{
					PreparedStatement ps = null;
					String sql="";
					ArrayList<CargarTipodePago> lista = new ArrayList<CargarTipodePago>();
					ConnectionDB db = new ConnectionDB();
					try{
						sql = "select * from parametros where codigo = 'TIPO_PAGO'  AND activo = 1  ORDER BY descripcion;";
						ps = db.conn.prepareStatement(sql);
						ResultSet rs = ps.executeQuery(sql);
						while(rs.next()){
							CargarTipodePago cr = new CargarTipodePago();
							cr.setId(rs.getInt("id"));
							cr.setDescripcion(rs.getString("descripcion"));
		
							
							lista.add(cr);
						}			
					}catch (SQLException e){
						System.out.println("Error: " + e.getMessage());
					}catch (Exception e){
						System.out.println("Error: " + e.getMessage());
					}finally {
						ps.close();
						db.close();
					}		
					return lista;
				}
//-------------------Load lista de división-----------------------------------------------
				public static ArrayList<CargarTipodePago> getTipoDivision()  throws Exception{
					PreparedStatement ps = null;
					String sql="";
					ArrayList<CargarTipodePago> lista = new ArrayList<CargarTipodePago>();
					ConnectionDB db = new ConnectionDB();
					try{
						sql = "select * from parametros where codigo = 'DIVISION_PERSONAL'  AND activo = 1  ORDER BY descripcion;";
						ps = db.conn.prepareStatement(sql);
						ResultSet rs = ps.executeQuery(sql);
						while(rs.next()){
							CargarTipodePago cr = new CargarTipodePago();
							cr.setId(rs.getInt("id"));
							cr.setDescripcion(rs.getString("descripcion"));
		
							
							lista.add(cr);
						}			
					}catch (SQLException e){
						System.out.println("Error: " + e.getMessage());
					}catch (Exception e){
						System.out.println("Error: " + e.getMessage());
					}finally {
						ps.close();
						db.close();
					}		
					return lista;
				}
//-------------------Load lista de sub-división-----------------------------------------------
				public static ArrayList<CargarTipodePago> getTipoSubDivision()  throws Exception{
					PreparedStatement ps = null;
					String sql="";
					ArrayList<CargarTipodePago> lista = new ArrayList<CargarTipodePago>();
					ConnectionDB db = new ConnectionDB();
					try{
						sql = "select * from parametros where codigo = 'SUBDIVISION_PERSONAL'  AND activo = 1  ORDER BY descripcion;";
						ps = db.conn.prepareStatement(sql);
						ResultSet rs = ps.executeQuery(sql);
						while(rs.next()){
							CargarTipodePago cr = new CargarTipodePago();
							cr.setId(rs.getInt("id"));
							cr.setDescripcion(rs.getString("descripcion"));
		
							
							lista.add(cr);
						}			
					}catch (SQLException e){
						System.out.println("Error: " + e.getMessage());
					}catch (Exception e){
						System.out.println("Error: " + e.getMessage());
					}finally {
						ps.close();
						db.close();
					}		
					return lista;
				}
//-------------------Load lista Grupo-----------------------------------------------
				public static ArrayList<CargarTipodePago> getListaGrupo()  throws Exception{
					PreparedStatement ps = null;
					String sql="";
					ArrayList<CargarTipodePago> lista = new ArrayList<CargarTipodePago>();
					ConnectionDB db = new ConnectionDB();
					try{
						sql = "select * from parametros where codigo = 'GRUPO'  AND activo = 1  ORDER BY descripcion;";
						ps = db.conn.prepareStatement(sql);
						ResultSet rs = ps.executeQuery(sql);
						while(rs.next()){
							CargarTipodePago cr = new CargarTipodePago();
							cr.setId(rs.getInt("id"));
							cr.setDescripcion(rs.getString("descripcion"));
		
							
							lista.add(cr);
						}			
					}catch (SQLException e){
						System.out.println("Error: " + e.getMessage());
					}catch (Exception e){
						System.out.println("Error: " + e.getMessage());
					}finally {
						ps.close();
						db.close();
					}		
					return lista;
				}
//-------------------Load lista SubGrupo-----------------------------------------------
				public static ArrayList<CargarTipodePago> getListaSubGrupo()  throws Exception{
					PreparedStatement ps = null;
					String sql="";
					ArrayList<CargarTipodePago> lista = new ArrayList<CargarTipodePago>();
					ConnectionDB db = new ConnectionDB();
					try{
						sql = "select * from parametros where codigo = 'SUBGRUPO'  AND activo = 1  ORDER BY descripcion;";
						ps = db.conn.prepareStatement(sql);
						ResultSet rs = ps.executeQuery(sql);
						while(rs.next()){
							CargarTipodePago cr = new CargarTipodePago();
							cr.setId(rs.getInt("id"));
							cr.setDescripcion(rs.getString("descripcion"));
		
							
							lista.add(cr);
						}			
					}catch (SQLException e){
						System.out.println("Error: " + e.getMessage());
					}catch (Exception e){
						System.out.println("Error: " + e.getMessage());
					}finally {
						ps.close();
						db.close();
					}		
					return lista;
				}
//-------------------Load lista Frecuencia-----------------------------------------------
				public static ArrayList<CargarTipodePago> getListaFrecuencia()  throws Exception{
					PreparedStatement ps = null;
					String sql="";
					ArrayList<CargarTipodePago> lista = new ArrayList<CargarTipodePago>();
					ConnectionDB db = new ConnectionDB();
					try{
						sql = "select * from parametros where codigo = 'FRECUENCIA'  AND activo = 1  ORDER BY descripcion;";
						ps = db.conn.prepareStatement(sql);
						ResultSet rs = ps.executeQuery(sql);
						while(rs.next()){
							CargarTipodePago cr = new CargarTipodePago();
							cr.setId(rs.getInt("id"));
							cr.setDescripcion(rs.getString("descripcion"));
		
							
							lista.add(cr);
						}			
					}catch (SQLException e){
						System.out.println("Error: " + e.getMessage());
					}catch (Exception e){
						System.out.println("Error: " + e.getMessage());
					}finally {
						ps.close();
						db.close();
					}		
					return lista;
				}
//-------------------Load Lista Tipo de Reposo-----------------------------------------------
				public static ArrayList<CargarTipodePago> getListaTipoReposo()  throws Exception{
					PreparedStatement ps = null;
					String sql="";
					ArrayList<CargarTipodePago> lista = new ArrayList<CargarTipodePago>();
					ConnectionDB db = new ConnectionDB();
					try{
						sql = "select * from parametros where llave = 3 and codigo = 'Sub_Tipo_Licencia' and activo = 1;";
						ps = db.conn.prepareStatement(sql);
						ResultSet rs = ps.executeQuery(sql);
						while(rs.next()){
							CargarTipodePago cr = new CargarTipodePago();
							cr.setId(rs.getInt("id"));
							cr.setDescripcion(rs.getString("descripcion"));
		
							
							lista.add(cr);
						}			
					}catch (SQLException e){
						System.out.println("Error: " + e.getMessage());
					}catch (Exception e){
						System.out.println("Error: " + e.getMessage());
					}finally {
						ps.close();
						db.close();
					}		
					return lista;
				}
//-------------------Load Lista Tipo de Reposo Parcial-----------------------------------------------
				public static ArrayList<CargarTipodePago> getListaTipoReposoParcial()  throws Exception{
					PreparedStatement ps = null;
					String sql="";
					ArrayList<CargarTipodePago> lista = new ArrayList<CargarTipodePago>();
					ConnectionDB db = new ConnectionDB();
					try{
						sql = "select * from parametros where codigo = 'REPOSO_PARCIAL' and activo = 1;";
						ps = db.conn.prepareStatement(sql);
						ResultSet rs = ps.executeQuery(sql);
						while(rs.next()){
							CargarTipodePago cr = new CargarTipodePago();
							cr.setId(rs.getInt("id"));
							cr.setDescripcion(rs.getString("descripcion"));
		
							
							lista.add(cr);
						}			
					}catch (SQLException e){
						System.out.println("Error: " + e.getMessage());
					}catch (Exception e){
						System.out.println("Error: " + e.getMessage());
					}finally {
						ps.close();
						db.close();
					}		
					return lista;
				}
//-------------------Load Lista Accidente Trabajo-----------------------------------------------
				public static ArrayList<CargarTipodePago> getListaAccidenteTrabajo()  throws Exception{
					PreparedStatement ps = null;
					String sql="";
					ArrayList<CargarTipodePago> lista = new ArrayList<CargarTipodePago>();
					ConnectionDB db = new ConnectionDB();
					try{
						sql = "select * from parametros where llave = 2 and codigo = 'Sub_Tipo_Licencia' and activo = 1;";
						ps = db.conn.prepareStatement(sql);
						ResultSet rs = ps.executeQuery(sql);
						while(rs.next()){
							CargarTipodePago cr = new CargarTipodePago();
							cr.setId(rs.getInt("id"));
							cr.setDescripcion(rs.getString("descripcion"));
		
							
							lista.add(cr);
						}			
					}catch (SQLException e){
						System.out.println("Error: " + e.getMessage());
					}catch (Exception e){
						System.out.println("Error: " + e.getMessage());
					}finally {
						ps.close();
						db.close();
					}		
					return lista;
				}
//-------------------Load Lista Maternal-----------------------------------------------
				public static ArrayList<CargarTipodePago> getListaMaternal()  throws Exception{
					PreparedStatement ps = null;
					String sql="";
					ArrayList<CargarTipodePago> lista = new ArrayList<CargarTipodePago>();
					ConnectionDB db = new ConnectionDB();
					try{
						sql = "select * from parametros where llave = 1 and codigo = 'Sub_Tipo_Licencia' and activo = 1;";
						ps = db.conn.prepareStatement(sql);
						ResultSet rs = ps.executeQuery(sql);
						while(rs.next()){
							CargarTipodePago cr = new CargarTipodePago();
							cr.setId(rs.getInt("id"));
							cr.setDescripcion(rs.getString("descripcion"));
		
							
							lista.add(cr);
						}			
					}catch (SQLException e){
						System.out.println("Error: " + e.getMessage());
					}catch (Exception e){
						System.out.println("Error: " + e.getMessage());
					}finally {
						ps.close();
						db.close();
					}		
					return lista;
				}
//--------------insert Licencia Mutualidad----------------------------------------------------------------
				public static boolean insertarLicenciaMutualidad (tablaPermisoLicencia r) throws Exception{
					
					PreparedStatement ps = null;
					String sql="";
					ConnectionDB db = new ConnectionDB();
					
					try{
						sql = "INSERT INTO permiso_licencia (id_empresa, codigo_trabajador, accion,incluye_feriados, fecha_desde, fecha_hasta, fecha_creacion,dias_corridos,idContrato) VALUES (?,?,?,?,?,?,NOW(),?,?)";
						ps = db.conn.prepareStatement(sql);
						
						
						
						ps.setInt    (1,  r.getId_empresa());
						ps.setInt    (2,  r.getCodigo_trabajador());
						ps.setInt    (3,  r.getAccion());
						ps.setInt    (4,  r.getIncluye_feriados());
						ps.setString (5,  r.getFecha_desde());
						ps.setString (6,  r.getFecha_hasta());	
						ps.setInt    (7, r.getDias_corridos());
						ps.setInt    (8, r.getIdContrato());
						
						ps.execute();
						
						return true;
					}catch (SQLException e){
						System.out.println("Error: "+ e.getMessage());
					}catch (Exception e){
						System.out.println("Error: "+ e.getMessage());
					}finally {
						ps.close();
					
						db.close();
					}
					return false;
				}
//--- cargar todo de tabla contrato--------------------------------------------------------------------
				public static ArrayList<TodoTablaContrato> getIdContrato(int cod ) throws Exception{
					PreparedStatement ps = null;
					String sql = "";
					ArrayList<TodoTablaContrato> data = new ArrayList<TodoTablaContrato>();
					ConnectionDB db = new ConnectionDB();
					try{
						sql ="select  *,tr.agro, tr.nombre, tr.apellidoPaterno, tr.apellidoMaterno from contratos co INNER JOIN trabajadores tr on tr.codigo = co.codigo_trabajador where co.codigo_trabajador = "+cod+"  and co.EstadoContrato = 1";
						
			
						ps = db.conn.prepareStatement(sql);
						ResultSet rs = ps.executeQuery(sql);
						while(rs.next()){
							TodoTablaContrato e = new TodoTablaContrato();
							
							e.setId(rs.getInt("id"));
							e.setCodigo_trabajador(rs.getInt("codigo_trabajador"));
							e.setId_peticion(rs.getInt("id_peticion"));
							e.setCod_peticion(rs.getInt("codigo_peticion"));
							e.setId_sociedad(rs.getInt("idSociedad"));
							e.setFecha_inicio_actividad(rs.getString("fechaInicio_actividad"));
							e.setFecha_contrato_emitido(rs.getString("fechaContrato_emitido"));
							e.setFecha_termino_contrato(rs.getString("FechaTerminoContrato"));
							e.setEstado_contrato(rs.getInt("EstadoContrato"));
							e.setAgro(rs.getInt("agro"));
							
							e.setNombre(rs.getString("nombre"));
							e.setApppaterno(rs.getString("apellidoPaterno"));
							e.setAppmaterno(rs.getString("apellidoMaterno"));
							
				
						
							data.add(e);
						}
						rs.close();
						ps.close();
						db.conn.close();
					}catch(Exception ex){
						System.out.println("Error: "+ex.getMessage());
					}finally{
						db.close();
					}
					return data;
				}
//--- cargar todo id contrato para pantalla de listado de haberes y descuento--------------------------------------------------------------------
				public static ArrayList<TodoTablaContrato> getIdContratoPLHD(int cod ) throws Exception{
					PreparedStatement ps = null;
					String sql = "";
					ArrayList<TodoTablaContrato> data = new ArrayList<TodoTablaContrato>();
					ConnectionDB db = new ConnectionDB();
					try{
						sql ="select  idContrato, CO.fechaInicio_actividad from  sw_haberesDescuentos SW inner join contratos CO on SW.idContrato = CO.id where SW.codigo_trabajador = "+cod+" group by idContrato";
						
						
						ps = db.conn.prepareStatement(sql);
						ResultSet rs = ps.executeQuery(sql);
						while(rs.next()){
							TodoTablaContrato e = new TodoTablaContrato();
							
							e.setId(rs.getInt("idContrato"));
							e.setFecha_inicio_actividad(rs.getString("fechaInicio_actividad"));
							
				
						
							data.add(e);
						}
						rs.close();
						ps.close();
						db.conn.close();
					}catch(Exception ex){
						System.out.println("Error: "+ex.getMessage());
					}finally{
						db.close();
					}
					return data;
				}

//-----------------------cargar haberes y descuentos por Periodo -------------------------------------------------------------
				public static ArrayList<sw_haberesDescuentos> getswHDPeriodo(String periodo,String soci, String idcontrato, String codtrabajador,String huerto, String zona, String ceco, String hdimput, String concepto) throws Exception{
					PreparedStatement ps = null;
					String sql = "";
					ArrayList<sw_haberesDescuentos> lista = new ArrayList<sw_haberesDescuentos>();
					ConnectionDB db = new ConnectionDB();
					try{
						sql ="SELECT (select descripcion from  parametros where codigo = 'MONEDA_PLAN' and llave = sw.llave_moneda)as nombremoneda,sw.llave_moneda,sw.id,sw.periodo,"
								+ "sw.tipo,sw.codigo_hd,sw.monto,sw.idContrato,sw.proporcional as propor,"
								+ "sw.codigo_trabajador,"
								+ "(select descripcion from parametros where id = sw.frecuencia) as frecuencia,"
								+ "(select descripcion from sw_p_haberesDescuentos where codigo = sw.codigo_hd) as nombreCodigoHD,"
								+ "sw.frecuencia as idfrecuencia,sw.cuotas,sw.fecha_inicio,sw.fecha_termino,"
								+ "tr.nombre,tr.apellidoPaterno,tr.apellidoMaterno "
								+ "FROM sw_haberesDescuentos sw "
								+ "inner join trabajadores tr on sw.codigo_trabajador = tr.codigo "
								+ "join contratos CO on sw.idContrato = CO.id "
								+ "where 1 = 1 ";
						        
						
						if("null".equals(periodo)){}else{sql += " and sw.periodo = "+periodo+"";}
						if("null".equals(soci)){}else{sql += " and  CO.idSociedad = "+soci+"";}
						if("null".equals(idcontrato)){}else{sql += " and  sw.idContrato = "+idcontrato+"";}
						if("null".equals(codtrabajador)){}else{sql += " and  sw.codigo_trabajador = "+codtrabajador+"";}
						if("null".equals(huerto)){}else{sql += " and tr.idHuerto = '"+huerto+"'";}
						if("null".equals(zona)){}else{sql += " and tr.idZona = '"+zona+"'";}
						if("null".equals(ceco)){}else{sql += " and tr.idCECO = '"+ceco+"'";}
						if("null".equals(hdimput)){}else{sql += " and sw.tipo = '"+hdimput+"'";}
						if("null".equals(concepto)){}else{sql += " and sw.codigo_hd = "+concepto+"";}
						
						System.out.println(sql);
						ps = db.conn.prepareStatement(sql);
						ResultSet rs = ps.executeQuery(sql);
						while(rs.next()){
							sw_haberesDescuentos hd = new sw_haberesDescuentos();
							hd.setId(rs.getInt("id"));
							hd.setPeriodo(rs.getInt("periodo"));
							hd.setTipo(rs.getString("tipo"));
							hd.setNombre(rs.getString("nombre"));
							hd.setApellidopaterno(rs.getString("apellidoPaterno"));
							hd.setApellidomaterno(rs.getString("apellidoMaterno"));
							hd.setCodigo_hd(rs.getInt("codigo_hd"));
							hd.setMonto2(rs.getBigDecimal("monto"));
							hd.setCodigo_trabajador(rs.getString("codigo_trabajador"));
							hd.setNombrecodigohd(rs.getString("nombreCodigoHD"));
							hd.setNombreFrecuencia(rs.getString("frecuencia"));
							hd.setIdfrecuencia(rs.getInt("idfrecuencia"));
							hd.setCuotas(rs.getInt("cuotas"));
							hd.setFechainicio(rs.getInt("fecha_inicio"));
							hd.setFechatermino(rs.getInt("fecha_termino"));
							hd.setLlavemoneda(rs.getInt("llave_moneda"));
							hd.setNombremoneda(rs.getString("nombremoneda"));
							hd.setIdcontrato(rs.getInt("idContrato"));
							hd.setProporcional(rs.getInt("propor"));
							
							
							
						
							lista.add(hd);
							System.out.println(lista);
						}			
					}catch (SQLException e){
						System.out.println("Error: " + e.getMessage());
					}catch (Exception e){
						System.out.println("Error: " + e.getMessage());
					}finally {
						ps.close();
						db.close();
					}
					return lista;
				}
//-----------------------insert Anticipos Individuales-------------------------------------------------------------

				public static boolean insertarAnticiposInd (AnticiposIndividuales r) throws Exception{
					Statement ps = null;
				
					String sql="";
					ConnectionDB db = new ConnectionDB();
					
					try{
						sql = "INSERT INTO sw_asignacionAnticipos (periodo , fecha, cod_trabajador , monto_ingresado,empresa,idContrato)";
						sql+= "VALUES ("+r.getPeriodo()+",'"+r.getFecha()+"',"+r.getCodtrabajador()+","+r.getMontoingresado()+","+r.getEmpresa()+","+r.getIdcontrato()+");";
										
						
						
						ps = db.conn.prepareStatement(sql);
						
						
						ps.execute(sql);
					
						
						return true;
					}catch (SQLException e){
						System.out.println("Error: "+ e.getMessage());
					}catch (Exception e){
						System.out.println("Error: "+ e.getMessage());
					}finally {
						ps.close();
					
						db.close();
					}
					return false;
				}
				
//-----------cargar popup pantalla asignacion simple-------------------------------------------------------------------------
				public static ArrayList<AnticiposIndividuales> getUpdateAnticiposIndividuales(int id) throws Exception{
					PreparedStatement ps = null;
					String sql = "";
					ArrayList<AnticiposIndividuales> lista = new ArrayList<AnticiposIndividuales>();
					ConnectionDB db = new ConnectionDB();
					try{
						sql ="select *, tr.nombre, tr.apellidoPaterno,tr.apellidoMaterno, tr.division, tr.idSubDivision as division ,tr.idSubDivision as subDivision, tr.grupo as grupo, tr.idSubGrupo as subgrupo  from sw_asignacionAnticipos sw inner join trabajadores tr on tr.codigo = sw.cod_trabajador  where sw.id = "+id+"";
			          
						ps = db.conn.prepareStatement(sql);
						ResultSet rs = ps.executeQuery(sql);
						while(rs.next()){
							AnticiposIndividuales hd = new AnticiposIndividuales();
							
							hd.setId(rs.getInt("id"));
							hd.setPeriodo(rs.getInt("periodo"));
							hd.setFecha(rs.getString("fecha"));
							hd.setCodtrabajador(rs.getInt("cod_trabajador"));
							hd.setMontoingresado(rs.getInt("monto_ingresado"));
							hd.setEmpresa(rs.getInt("empresa"));
							hd.setDivision(rs.getInt("division"));
							hd.setSubDivision(rs.getInt("subDivision"));
							hd.setGrupo(rs.getInt("grupo"));
							hd.setSubgrupo(rs.getInt("subgrupo"));
							hd.setNombre(rs.getString("nombre"));
							hd.setAppaterno(rs.getString("apellidoPaterno"));
							hd.setAppmaterno(rs.getString("apellidoMaterno"));

							lista.add(hd);
							System.out.println(lista);
						}			
					}catch (SQLException e){
						System.out.println("Error: " + e.getMessage());
					}catch (Exception e){
						System.out.println("Error: " + e.getMessage());
					}finally {
						ps.close();
						db.close();
					}
					return lista;
				}
//------pantalla anticipos simple cargar por codigo trabajador ---------------------------------------------------------------------------------------				
				public static ArrayList<AnticiposIndividuales> getcargarXCodTrabajador(int cod) throws Exception{
					PreparedStatement ps = null;
					String sql = "";
					ArrayList<AnticiposIndividuales> lista = new ArrayList<AnticiposIndividuales>();
					ConnectionDB db = new ConnectionDB();
					try{
						sql ="select sw.id, sw.cod_trabajador, sw.periodo ,sw.fecha,sw.monto_ingresado,sw.empresa,tr.nombre, tr.apellidoPaterno, tr.apellidoMaterno, tr.rut,tr.division,tr.idSubDivision as division ,tr.idSubDivision as subDivision,tr.grupo as grupo,tr.idSubGrupo as subgrupo from sw_asignacionAnticipos sw inner join trabajadores tr on tr.codigo = sw.cod_trabajador where sw.cod_trabajador = "+cod+"";
			          
						ps = db.conn.prepareStatement(sql);
						ResultSet rs = ps.executeQuery(sql);
						while(rs.next()){
							AnticiposIndividuales hd = new AnticiposIndividuales();
							
							hd.setId(rs.getInt("id"));
							hd.setPeriodo(rs.getInt("periodo"));
							hd.setFecha(rs.getString("fecha"));
							hd.setCodtrabajador(rs.getInt("cod_trabajador"));
							hd.setMontoingresado(rs.getInt("monto_ingresado"));
							hd.setEmpresa(rs.getInt("empresa"));
							hd.setDivision(rs.getInt("division"));
							hd.setSubDivision(rs.getInt("subDivision"));
							hd.setGrupo(rs.getInt("grupo"));
							hd.setSubgrupo(rs.getInt("subgrupo"));
							hd.setNombre(rs.getString("nombre"));
							hd.setAppaterno(rs.getString("apellidoPaterno"));
							hd.setAppmaterno(rs.getString("apellidoMaterno"));
							hd.setRut(rs.getString("rut"));

							lista.add(hd);
							System.out.println(lista);
						}			
					}catch (SQLException e){
						System.out.println("Error: " + e.getMessage());
					}catch (Exception e){
						System.out.println("Error: " + e.getMessage());
					}finally {
						ps.close();
						db.close();
					}
					return lista;
				}
//-----------Eliminar anticipo simple-----------------------------------------
				public static boolean DeleteAnticipoSimple(AnticiposIndividuales map) throws Exception{
					PreparedStatement ps = null;
					String sql = "";
					ConnectionDB db = new ConnectionDB();
					try{
						sql = "DELETE FROM sw_asignacionAnticipos WHERE id=?";
						ps = db.conn.prepareStatement(sql);
					
						ps.setInt(1, map.getId());
						
						
						ps.execute();
						return true;
					}catch(Exception ex){
						System.out.println("Error: "+ex.getMessage());
					}finally{
						ps.close();
						db.conn.close();
					}
					return false;
				}
//------Cargar todos los trabajadores asociados a una empresa y si tienen anticipos  ---------------------------------------------------------------------------------------				

				public static ArrayList<LoadTrabajadorSociedad> getSociedaTrabAS(String id,String div,String subdiv,String gru ) throws Exception{
					PreparedStatement ps = null;
					String sql = "";
					ArrayList<LoadTrabajadorSociedad> data = new ArrayList<LoadTrabajadorSociedad>();
					ConnectionDB db = new ConnectionDB();
					try{
						sql ="select TR.codigo,TR.nombre,TR.apellidoPaterno,"
								+ "TR.apellidoMaterno,TR.rut, TR.division,"
								+ "TR.idSubDivision,TR.grupo,TR.idSubgrupo "
								+ "from contratos  CO "
								+ "inner join trabajadores TR on TR.codigo = CO.codigo_trabajador "
								+ "join sw_asignacionAnticipos sw on TR.codigo = sw.cod_trabajador "
								+ "where 1 = 1 ";
						
						if("null".equals(id)){}else{sql += "and idSociedad = "+id+"";}
						if("null".equals(div)){}else{sql += " and TR.idHuerto = '"+div+"'";}
						if("null".equals(subdiv)){}else{sql += " and TR.idZona = '"+subdiv+"'";}
						if("null".equals(gru)){}else{sql += " and TR.idCECO = '"+gru+"'";}
						
						
						sql += " AND CO.EstadoContrato = 1 group by CO.codigo_trabajador";
						
						System.out.println(sql);
						ps = db.conn.prepareStatement(sql);
						ResultSet rs = ps.executeQuery(sql);
						while(rs.next()){
							LoadTrabajadorSociedad e = new LoadTrabajadorSociedad();
							
							e.setCodigotrabajador(rs.getInt("codigo"));
							e.setNombre(rs.getString("nombre"));
							e.setApellidoPaterno(rs.getString("apellidoPaterno"));
							e.setApellidoMaterno(rs.getString("apellidoMaterno"));
							e.setIddivision(rs.getInt("division"));
							e.setIdsubdivision(rs.getInt("idSubDivision"));
							e.setIdgrupo(rs.getInt("grupo"));
						    e.setIdsubgrupo(rs.getInt("idSubgrupo"));
						    e.setRut(rs.getString("rut"));
						
							data.add(e);
						}
						rs.close();
						ps.close();
						db.conn.close();
					}catch(Exception ex){
						System.out.println("Error: "+ex.getMessage());
					}finally{
						db.close();
					}
					return data;
				}
				//------Cargar todos los trabajadores asociados a una empresa y si tienen anticipos  ---------------------------------------------------------------------------------------				

				public static ArrayList<LoadTrabajadorSociedad> getSociedaTrabAS2(String empr,String div,String subdiv,String gru, String tipo_contrato) throws Exception{
					PreparedStatement ps = null;
					String sql = "";
					ArrayList<LoadTrabajadorSociedad> data = new ArrayList<LoadTrabajadorSociedad>();
					ConnectionDB db = new ConnectionDB();
					
					try{
						
						sql = "select TR.codigo,TR.nombre,TR.apellidoPaterno,TR.apellidoMaterno,TR.rut, "
								+ "TR.division,TR.idSubDivision,TR.grupo,TR.idSubgrupo "
								+ "from contratos CO  "
								+ "join trabajadores TR on TR.codigo = CO.codigo_trabajador "
								+ "where 1 = 1 ";
						
						if("null".equals(empr)){}else{sql += "and CO.idSociedad = "+empr+"";}
						if("null".equals(div)){}else{sql += " and TR.idHuerto ='"+div+"'";}
						if("null".equals(subdiv)){}else{sql += " and TR.idZona = '"+subdiv+"'";}
						if("null".equals(gru)){}else{sql += " and TR.idCECO = '"+gru+"'";}
						if("null".equals(tipo_contrato)){}else{sql += " and CO.tipoContrato = "+tipo_contrato+"";}
						
									
						
					sql += " and CO.EstadoContrato = 1 group by CO.codigo_trabajador;";
						
						System.out.println(sql);
						
						ps = db.conn.prepareStatement(sql);
						ResultSet rs = ps.executeQuery(sql);
						while(rs.next()){
							LoadTrabajadorSociedad e = new LoadTrabajadorSociedad();
							
							e.setCodigotrabajador(rs.getInt("codigo"));
							e.setNombre(rs.getString("nombre"));
							e.setApellidoPaterno(rs.getString("apellidoPaterno"));
							e.setApellidoMaterno(rs.getString("apellidoMaterno"));
							e.setIddivision(rs.getInt("division"));
							e.setIdsubdivision(rs.getInt("idSubDivision"));
							e.setIdgrupo(rs.getInt("grupo"));
						    e.setIdsubgrupo(rs.getInt("idSubgrupo"));
						    e.setRut(rs.getString("rut"));
						
							data.add(e);
						}
						rs.close();
						ps.close();
						db.conn.close();
					}catch(Exception ex){
						System.out.println("Error: "+ex.getMessage());
					}finally{
						db.close();
					}
					return data;
				}
//-----------cargar por tipo de pago  pantalla asignacion anticipos Simple-------------------------------------------------------------------------
				public static ArrayList<AnticiposIndividuales> getCodTrabAsignacionSimple(int p) throws Exception{
					PreparedStatement ps = null;
					String sql = "";
					ArrayList<AnticiposIndividuales> lista = new ArrayList<AnticiposIndividuales>();
					ConnectionDB db = new ConnectionDB();
					try{
						sql ="select *, tr.nombre, tr.apellidoPaterno, tr.apellidoMaterno from sw_asignacionAnticipos sw inner join trabajadores tr on tr.codigo = sw.cod_trabajador  where sw.cod_trabajador = "+p+"";
			          
						ps = db.conn.prepareStatement(sql);
						ResultSet rs = ps.executeQuery(sql);
						while(rs.next()){
							AnticiposIndividuales hd = new AnticiposIndividuales();
							
							hd.setId(rs.getInt("id"));
							hd.setPeriodo(rs.getInt("periodo"));
							hd.setFecha(rs.getString("fecha"));
							hd.setCodtrabajador(rs.getInt("cod_trabajador"));
							hd.setTipopago(rs.getInt("tipoPago"));
							hd.setMontoingresado(rs.getInt("monto_ingresado"));
							hd.setEmpresa(rs.getInt("empresa"));
							hd.setDivision(rs.getInt("division"));
							hd.setSubDivision(rs.getInt("subDivision"));
							hd.setGrupo(rs.getInt("grupo"));
							hd.setSubgrupo(rs.getInt("subgrupo"));
							hd.setNombre(rs.getString("nombre"));
							hd.setAppaterno(rs.getString("apellidoPaterno"));
							hd.setAppmaterno(rs.getString("apellidoMaterno"));

							lista.add(hd);
							
						}			
					}catch (SQLException e){
						System.out.println("Error: " + e.getMessage());
					}catch (Exception e){
						System.out.println("Error: " + e.getMessage());
					}finally {
						ps.close();
						db.close();
					}
					return lista;
				}
//-----------cargar por fecha  pantalla asignacion anticipos Simple-------------------------------------------------------------------------
				public static ArrayList<AnticiposIndividuales> getFechaAsignacionSimple(String p) throws Exception{
					PreparedStatement ps = null;
					String sql = "";
					ArrayList<AnticiposIndividuales> lista = new ArrayList<AnticiposIndividuales>();
					ConnectionDB db = new ConnectionDB();
					try{
						sql ="select *, tr.nombre, tr.apellidoPaterno, tr.apellidoMaterno from sw_asignacionAnticipos sw inner join trabajadores tr on tr.codigo = sw.cod_trabajador  where sw.fecha = '"+p+"'";
			          
						ps = db.conn.prepareStatement(sql);
						ResultSet rs = ps.executeQuery(sql);
						while(rs.next()){
							AnticiposIndividuales hd = new AnticiposIndividuales();
							
							hd.setId(rs.getInt("id"));
							hd.setPeriodo(rs.getInt("periodo"));
							hd.setFecha(rs.getString("fecha"));
							hd.setCodtrabajador(rs.getInt("cod_trabajador"));
							hd.setTipopago(rs.getInt("tipoPago"));
							hd.setMontoingresado(rs.getInt("monto_ingresado"));
							hd.setEmpresa(rs.getInt("empresa"));
							hd.setDivision(rs.getInt("division"));
							hd.setSubDivision(rs.getInt("subDivision"));
							hd.setGrupo(rs.getInt("grupo"));
							hd.setSubgrupo(rs.getInt("subgrupo"));
							hd.setNombre(rs.getString("nombre"));
							hd.setAppaterno(rs.getString("apellidoPaterno"));
							hd.setAppmaterno(rs.getString("apellidoMaterno"));

							lista.add(hd);
							
						}			
					}catch (SQLException e){
						System.out.println("Error: " + e.getMessage());
					}catch (Exception e){
						System.out.println("Error: " + e.getMessage());
					}finally {
						ps.close();
						db.close();
					}
					return lista;
				}
//-----------Update anticipo simple-----------------------------------------
				public static boolean UpdateAnticipoSimple(AnticiposIndividuales map) throws Exception{
					PreparedStatement ps = null;
					String sql = "";
					ConnectionDB db = new ConnectionDB();
					try{
						sql = "UPDATE sw_asignacionAnticipos SET periodo = ?, fecha = ?, monto_ingresado = ? WHERE id= ?";
						ps = db.conn.prepareStatement(sql);
	
						ps.setInt(1,map.getPeriodo());
						ps.setString(2,map.getFecha());
						ps.setInt(3,map.getMontoingresado());
						ps.setInt(4, map.getId());
						
						
						ps.execute();
						return true;
					}catch(Exception ex){
						System.out.println("Error: "+ex.getMessage());
					}finally{
						ps.close();
						db.conn.close();
					}
					return false;
				}
//--- get codigo trabajador x rut--------------------------------------------------------------------
				public static ArrayList<TodoTablaContrato> getcodxrut(String rut ) throws Exception{
					PreparedStatement ps = null;
					String sql = "";
					ArrayList<TodoTablaContrato> data = new ArrayList<TodoTablaContrato>();
					ConnectionDB db = new ConnectionDB();
					try{
						sql ="select codigo from trabajadores where rut = '"+rut+"'";
						
						System.out.println(sql);
						ps = db.conn.prepareStatement(sql);
						ResultSet rs = ps.executeQuery(sql);
						while(rs.next()){
							TodoTablaContrato e = new TodoTablaContrato();
							
						  
							e.setCodigo_trabajador(rs.getInt("codigo"));
							
				
						
							data.add(e);
						}
						rs.close();
						ps.close();
						db.conn.close();
					}catch(Exception ex){
						System.out.println("Error: "+ex.getMessage());
					}finally{
						db.close();
					}
					return data;
				}	
//--- crear liquidacion--------------------------------------------------------------------
				public static ArrayList<CreateLiquidacion> getCreateLiquidacion(int cod, int idcontrato,int periodo) throws Exception{

					ArrayList<CreateLiquidacion> data = new ArrayList<CreateLiquidacion>();
					ConnectionDB db = new ConnectionDB();
					try{
						CallableStatement cStmt = db.conn.prepareCall("{call SAN_CLEMENTE.sw_createLiquidacion(?, ?, ?,0,1)}");
						
						  cStmt.setInt(1, cod);
						  cStmt.setInt(2, idcontrato);
						  cStmt.setInt(3, periodo);
						  System.out.println(cStmt);
				          cStmt.execute();
				          ResultSet rs = cStmt.getResultSet();
						
						
						while(rs.next()){
							CreateLiquidacion e = new CreateLiquidacion();
							
						
							e.setCodTrabajador(rs.getInt("codTrabajador"));
							e.setIdContrato(rs.getInt("idContrato"));
							e.setIdConcepto(rs.getInt("idConcepto"));
							e.setDescripcion(rs.getString("descripcion"));
							e.setValor(rs.getString("valor"));
							
							
				
						
							data.add(e);
						}
						rs.close();
//						ps.close();
						db.conn.close();
					}catch(Exception ex){
						System.out.println("Error: "+ex.getMessage());
					}finally{
						db.close();
					}
					return data;
				}
				
public static tablaPermisoLicencia getRutaTablapermisoLicencia(String idruta) throws Exception{
					PreparedStatement ps = null;
					String sql = "";
					tablaPermisoLicencia permiso = new tablaPermisoLicencia();
					ConnectionDB db = new ConnectionDB();
					try{
						sql ="SELECT ruta_archivo FROM permiso_licencia where id = "+idruta+"";
                        System.out.println(sql);
						ps = db.conn.prepareStatement(sql);
		
						ResultSet rs = ps.executeQuery(sql);
						if(rs.next()){
							
							permiso.setRuta_archivo(rs.getString("ruta_archivo"));
							
							
						}
						
					}catch (SQLException e){
						System.out.println("Error: " + e.getMessage());
					}catch (Exception e){
						System.out.println("Error: " + e.getMessage());
					}finally {
						ps.close();
						db.close();
					}
					return permiso;
					
				}
public static ArrayList<sw_haberesDescuentos> getswHDNombreTrabajador2(int codigo) throws Exception{
	PreparedStatement ps = null;
	String sql = "";
	ArrayList<sw_haberesDescuentos> lista = new ArrayList<sw_haberesDescuentos>();
	ConnectionDB db = new ConnectionDB();
	try{
		sql ="select nombre,apellidoPaterno,apellidoMaterno from trabajadores where codigo = "+codigo+";";
        System.out.println(sql);
		ps = db.conn.prepareStatement(sql);
		ResultSet rs = ps.executeQuery(sql);
		while(rs.next()){
			sw_haberesDescuentos hd = new sw_haberesDescuentos();
			
			hd.setNombre(rs.getString("nombre"));
			hd.setApellidopaterno(rs.getString("apellidoPaterno"));
			hd.setApellidomaterno(rs.getString("apellidoMaterno"));
		
			
			lista.add(hd);
			System.out.println(lista);
		}			
	}catch (SQLException e){
		System.out.println("Error: " + e.getMessage());
	}catch (Exception e){
		System.out.println("Error: " + e.getMessage());
	}finally {
		ps.close();
		db.close();
	}
	return lista;
}

public static ArrayList<sw_haberesDescuentos> getswHDNombreTrabajador(int codigo) throws Exception{
	PreparedStatement ps = null;
	String sql = "";
	ArrayList<sw_haberesDescuentos> lista = new ArrayList<sw_haberesDescuentos>();
	ConnectionDB db = new ConnectionDB();
	try{
		sql ="select tr.nombre,tr.apellidoPaterno,tr.apellidoMaterno, co.id as idcontra from trabajadores tr inner join contratos co on codigo_trabajador = tr.codigo where tr.codigo = "+codigo+";";

		ps = db.conn.prepareStatement(sql);
		ResultSet rs = ps.executeQuery(sql);
		while(rs.next()){
			sw_haberesDescuentos hd = new sw_haberesDescuentos();
			
			hd.setNombre(rs.getString("nombre"));
			hd.setApellidopaterno(rs.getString("apellidoPaterno"));
			hd.setApellidomaterno(rs.getString("apellidoMaterno"));
			hd.setIdcontrato(rs.getInt("idcontra"));
			
			lista.add(hd);
			System.out.println(lista);
		}			
	}catch (SQLException e){
		System.out.println("Error: " + e.getMessage());
	}catch (Exception e){
		System.out.println("Error: " + e.getMessage());
	}finally {
		ps.close();
		db.close();
	}
	return lista;
}

	public static GetDatosContratoTrabajador obtenerDatosTrabajador(String idTrabajador) throws Exception{
		Statement ps = null;		
		String sql="";
		ConnectionDB db = new ConnectionDB();
		GetDatosContratoTrabajador tr = new GetDatosContratoTrabajador();
		
		try{
			sql = "select tr.codigo as codigoTrabajador, soc.denominacionSociedad as nombreEmpresa, "
				+ "tr.apellidoPaterno as appPatTrabajador,tr.apellidoMaterno as appMaternoTrabajador, "
				+ "tr.rut as rutCompletoTrabajador,tr.nombre as nombreTrabajador, 'Soltero' as estadoCivil, "
				+ "tr.fNacimiento as fechaNacimientoTrabajador, nac.pais as nacionalidadTrabajador, "
				+ "tr.direccion as direccionTrabajador, com.nombre as comuna, "
				+ "cntt.cargo as cargoTrabajador, 'PODA' as faenaContratacion, "
				+ "'2018' as temporadaContratacion, cntt.sueldoBase as sueldoCpuntosTrabajador,  "
				+ "'Talca' as ciudadContrato, soc.rut as rutEmpresa, 'Trescientos Mil Pesos' as sueldoEnPalabrasTrabajador, "
				+ "cntt.fechaInicio_actividad as fechaInicio "
				+ "from trabajadores tr "
				+ "inner join contratos cntt on tr.codigo = cntt.codigo_trabajador and cntt.id in  "
				+ "		(select max(id) from contratos where codigo_trabajador = tr.codigo) "
				+ "inner join sociedad soc on cntt.idSociedad = soc.idSociedad "
				+ "inner join parametros nac on tr.idNacionalidad = nac.llave and nac.codigo = 'NACIONALIDAD' "
				+ "inner join comuna com on tr.idcomuna = com.id "
				+ "where tr.id = "+ idTrabajador;
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			
			while(rs.next()){				
				tr.setCodigoTrabajador(rs.getString("codigoTrabajador"));
				tr.setCiudadContrato(rs.getString("ciudadContrato"));
				tr.setNombreEmpresa(rs.getString("nombreEmpresa"));
				tr.setAppPatTrabajador(rs.getString("appPatTrabajador"));
				tr.setAppMaternoTrabajador(rs.getString("appMaternoTrabajador"));
				tr.setNombreTrabajador(rs.getString("nombreTrabajador"));
				tr.setRutCompletoTrabajador(rs.getString("rutCompletoTrabajador"));
				tr.setEstadoCivil(rs.getString("estadoCivil"));
				tr.setFechaNacimientoTrabajador(rs.getString("fechaNacimientoTrabajador"));
				tr.setNacionalidadTrabajador(rs.getString("nacionalidadTrabajador"));
				tr.setDireccionTrabajador(rs.getString("direccionTrabajador"));
				tr.setComunaTrabajador(rs.getString("comuna"));
				tr.setCargoTrabajador(rs.getString("cargoTrabajador"));
				tr.setFaenaContratacion(rs.getString("faenaContratacion"));
				tr.setTemporadaContratacion(rs.getString("temporadaContratacion"));
				tr.setSueldoCPuntosTrabajador(rs.getString("SueldoCpuntosTrabajador"));
				tr.setSueldoEnPalabrasTrabajador(rs.getString("sueldoEnPalabrasTrabajador"));
				tr.setFechaInicio(rs.getString("fechaInicio"));
				tr.setCiudadContrato(rs.getString("ciudadContrato"));
				tr.setRutEmpresa(rs.getString("rutEmpresa"));				
				return tr;
			}
			
		}catch (SQLException e){
			System.out.println("Error: "+ e.getMessage());
		}catch (Exception e){
			System.out.println("Error: "+ e.getMessage());
		}finally {
			ps.close();
			db.close();
		}
		return tr;
	}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
public static NominaAnticipos getUltimoIdSW() throws Exception{
	PreparedStatement ps = null;
	String sql = "";
	NominaAnticipos permiso = new NominaAnticipos();
	ConnectionDB db = new ConnectionDB();
	try{
		sql ="select max(id_nomina)as id from sw_nomina";

		ps = db.conn.prepareStatement(sql);

		ResultSet rs = ps.executeQuery(sql);
		if(rs.next()){
			
			permiso.setIdtablaswnomina(rs.getInt("id"));
			
			
		}
		
	}catch (SQLException e){
		System.out.println("Error: " + e.getMessage());
	}catch (Exception e){
		System.out.println("Error: " + e.getMessage());
	}finally {
		ps.close();
		db.close();
	}
	return permiso;
	
}
////////////update nombre Archivos sw_nomina////////////////////////////////////////////
public static void updateNOmbreArchivoSW_nomina(String ruta, int id) throws Exception{
	PreparedStatement ps = null;
	String sql = "";
	
	ConnectionDB db = new ConnectionDB();
	String rutafinal = ruta.replace("\\", "\\\\");
	
	try{
		
		sql ="UPDATE sw_nomina SET ruta_detalle='"+rutafinal+"' WHERE id_nomina = "+id+";";
        System.out.println(sql);
		ps = db.conn.prepareStatement(sql);
		ps.execute();
	
		
	}catch (SQLException e){
		System.out.println("Error: " + e.getMessage());
	}catch (Exception e){
		System.out.println("Error: " + e.getMessage());
	}finally {
		ps.close();
		db.close();
	}
	
	
}

public static void updateNOmbreArchivoSW_nomina_excel(String ruta, int id) throws Exception{
	PreparedStatement ps = null;
	String sql = "";
	
	ConnectionDB db = new ConnectionDB();
	String rutafinal = ruta.replace("\\", "\\\\");

	try{
		
		sql ="UPDATE sw_nomina SET ruta_excel='"+rutafinal+"' WHERE id_nomina = "+id+";";
        System.out.println(sql);
		ps = db.conn.prepareStatement(sql);
		ps.execute();
	
		
	}catch (SQLException e){
		System.out.println("Error: " + e.getMessage());
	}catch (Exception e){
		System.out.println("Error: " + e.getMessage());
	}finally {
		ps.close();
		db.close();
	}
	
	
}

public static ArrayList<trabajadores> getallTrabajaCodNomHD(int cod)  throws Exception{
	PreparedStatement ps = null;
	String sql="";
	ArrayList<trabajadores> lista = new ArrayList<trabajadores>();
	ConnectionDB db = new ConnectionDB();
	try{
		sql = "select  TR.codigo,TR.nombre,TR.apellidoPaterno,TR.apellidoMaterno from contratos CO inner join trabajadores TR on TR.codigo = CO.codigo_trabajador join sw_haberesDescuentos HD on HD.codigo_trabajador = CO.codigo_trabajador	where EstadoContrato = 1 and idSociedad = "+cod+" group by codigo";
		System.out.println(sql);
		ps = db.conn.prepareStatement(sql);
		ResultSet rs = ps.executeQuery(sql);
		while(rs.next()){
			trabajadores tr = new trabajadores();
			tr.setCodigo(rs.getString("codigo"));
			tr.setNombre(rs.getString("nombre"));
			tr.setAp_paterno(rs.getString("apellidoPaterno"));
			tr.setAp_materno(rs.getString("apellidoMaterno"));
			lista.add(tr);
		}			
	}catch (SQLException e){
		System.out.println("Error: " + e.getMessage());
	}catch (Exception e){
		System.out.println("Error: " + e.getMessage());
	}finally {
		ps.close();
		db.close();
	}		
	return lista;
}

//-------------------Load Tipo Moneda Pantalla Permiso y Licencia-----------------------------------------------
public static ArrayList<CargarTipodePago> TipoMonedaHD()  throws Exception{
	PreparedStatement ps = null;
	String sql="";
	ArrayList<CargarTipodePago> lista = new ArrayList<CargarTipodePago>();
	ConnectionDB db = new ConnectionDB();
	try{
		sql = "select * from parametros where codigo = 'MONEDA_PLAN'  AND activo = 1 AND llave in (4,2)  ORDER BY descripcion;";
		ps = db.conn.prepareStatement(sql);
		ResultSet rs = ps.executeQuery(sql);
		while(rs.next()){
			CargarTipodePago cr = new CargarTipodePago();
			cr.setId(rs.getInt("llave"));
			cr.setDescripcion(rs.getString("descripcion"));
			
			
			lista.add(cr);
		}			
	}catch (SQLException e){
		System.out.println("Error: " + e.getMessage());
	}catch (Exception e){
		System.out.println("Error: " + e.getMessage());
	}finally {
		ps.close();
		db.close();
	}		
	return lista;
}

public static ArrayList<sw_haberesDescuentos> getswHDPeriodoAll(String codtrabajador) throws Exception{
	PreparedStatement ps = null;
	String sql = "";
	ArrayList<sw_haberesDescuentos> lista = new ArrayList<sw_haberesDescuentos>();
	ConnectionDB db = new ConnectionDB();
	try{
		sql ="SELECT (select descripcion from  parametros where codigo = 'MONEDA_PLAN' and llave = sw.llave_moneda)as nombremoneda,sw.llave_moneda,sw.id,sw.periodo,"
				+ "sw.tipo,sw.codigo_hd,sw.monto,sw.estadoCambio,"
				+ "sw.codigo_trabajador,"
				+ "(select descripcion from parametros where id = sw.frecuencia) as frecuencia,"
				+ "(select descripcion from sw_p_haberesDescuentos where codigo = sw.codigo_hd) as nombreCodigoHD,"
				+ "sw.frecuencia as idfrecuencia,sw.cuotas,sw.fecha_inicio,sw.fecha_termino,"
				+ "tr.nombre,tr.apellidoPaterno,tr.apellidoMaterno "
				+ "FROM sw_haberesDescuentos sw "
				+ "inner join trabajadores tr on sw.codigo_trabajador = tr.codigo "
				+ "join contratos CO on sw.idContrato = CO.id "
				+ "where 1 = 1 ";
		        
		
		    sql += " and  sw.codigo_trabajador in ("+codtrabajador+")";
		
        
		ps = db.conn.prepareStatement(sql);
		ResultSet rs = ps.executeQuery(sql);
		while(rs.next()){
			sw_haberesDescuentos hd = new sw_haberesDescuentos();
			hd.setId(rs.getInt("id"));
			hd.setPeriodo(rs.getInt("periodo"));
			hd.setTipo(rs.getString("tipo"));
			hd.setNombre(rs.getString("nombre"));
			hd.setApellidopaterno(rs.getString("apellidoPaterno"));
			hd.setApellidomaterno(rs.getString("apellidoMaterno"));
			hd.setCodigo_hd(rs.getInt("codigo_hd"));
			hd.setMonto2(rs.getBigDecimal("monto"));
			hd.setCodigo_trabajador(rs.getString("codigo_trabajador"));
			hd.setNombrecodigohd(rs.getString("nombreCodigoHD"));
			hd.setNombreFrecuencia(rs.getString("frecuencia"));
			hd.setIdfrecuencia(rs.getInt("idfrecuencia"));
			hd.setCuotas(rs.getInt("cuotas"));
			hd.setFechainicio(rs.getInt("fecha_inicio"));
			hd.setFechatermino(rs.getInt("fecha_termino"));
			hd.setLlavemoneda(rs.getInt("llave_moneda"));
			hd.setNombremoneda(rs.getString("nombremoneda"));
			hd.setEstado_cambio(rs.getInt("estadoCambio"));
		
			lista.add(hd);
			
		}			
	}catch (SQLException e){
		System.out.println("Error: " + e.getMessage());
	}catch (Exception e){
		System.out.println("Error: " + e.getMessage());
	}finally {
		ps.close();
		db.close();
	}
	return lista;
}

//-----------------eliminar habers y descuento----------------------------
public static boolean eliminarPL(int id) throws  Exception{
	PreparedStatement ps = null;
	String sql = "";
	ConnectionDB  db = new ConnectionDB();	
	try {
		sql = "DELETE FROM permiso_licencia WHERE id="+id+"";
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

//-------------------Load lista de Huerto-----------------------------------------------
public static ArrayList<sw_huerto> getHuertoLista()  throws Exception{
	PreparedStatement ps = null;
	String sql="";
	ArrayList<sw_huerto> lista = new ArrayList<sw_huerto>();
	ConnectionDB db = new ConnectionDB();
	try{
		sql = "select campo, descripcion from campo;";
		ps = db.conn.prepareStatement(sql);
		ResultSet rs = ps.executeQuery(sql);
		while(rs.next()){
			sw_huerto cr = new sw_huerto();
		    
			cr.setCampo(rs.getString("campo"));
			cr.setDescripcion(rs.getString("descripcion"));

			
			lista.add(cr);
		}			
	}catch (SQLException e){
		System.out.println("Error: " + e.getMessage());
	}catch (Exception e){
		System.out.println("Error: " + e.getMessage());
	}finally {
		ps.close();
		db.close();
	}		
	return lista;
}

//------Cargar todos los trabajadores asociados a una empresa y si tienen anticipos para imprimir ---------------------------------------------------------------------------------------				

public static ArrayList<LoadTrabajadorSociedad> getTrabajadoresAnticipoImprimir(int id ) throws Exception{
	PreparedStatement ps = null;
	String sql = "";
	ArrayList<LoadTrabajadorSociedad> data = new ArrayList<LoadTrabajadorSociedad>();
	ConnectionDB db = new ConnectionDB();
	try{
		sql ="SELECT sw.cod_trabajador, tr.nombre, "
				+ "tr.apellidoPaterno, "
				+ "tr.apellidoMaterno, tr.rut "
				+ "FROM sw_asignacionAnticipos sw "
				+ "inner join trabajadores tr  "
				+ "on  sw.cod_trabajador = tr.codigo "
				+ "WHERE estado = 1 AND empresa = "+id+" order by tr.apellidoPaterno asc";
		

		ps = db.conn.prepareStatement(sql);
		ResultSet rs = ps.executeQuery(sql);
		while(rs.next()){
			LoadTrabajadorSociedad e = new LoadTrabajadorSociedad();
			
			e.setCodigotrabajador(rs.getInt("cod_trabajador"));
			e.setNombre(rs.getString("nombre"));
			e.setApellidoPaterno(rs.getString("apellidoPaterno"));
			e.setApellidoMaterno(rs.getString("apellidoMaterno"));
		    e.setRut(rs.getString("rut"));
		
			data.add(e);
		}
		rs.close();
		ps.close();
		db.conn.close();
	}catch(Exception ex){
		System.out.println("Error: "+ex.getMessage());
	}finally{
		db.close();
	}
	return data;
}
// PERMISOS LEGALES
public static ArrayList<TipoLicencia> getPermisoslegales()  throws Exception{
	PreparedStatement ps = null;
	String sql="";
	ArrayList<TipoLicencia> lista = new ArrayList<TipoLicencia>();
	ConnectionDB db = new ConnectionDB();
	try{
		sql = "SELECT * FROM parametros WHERE codigo = 'PERMISOS_LEGALES' and activo = 1";
		ps = db.conn.prepareStatement(sql);
		ResultSet rs = ps.executeQuery(sql);
		while(rs.next()){
			TipoLicencia cr = new TipoLicencia();
			cr.setId(rs.getInt("llave"));
			cr.setDescripcion(rs.getString("descripcion"));
		
			lista.add(cr);
		}			
	}catch (SQLException e){
		System.out.println("Error: " + e.getMessage());
	}catch (Exception e){
		System.out.println("Error: " + e.getMessage());
	}finally {
		ps.close();
		db.close();
	}		
	return lista;
}

//PERMISOS CONVENCIONALES
public static ArrayList<TipoLicencia> getPermisosConvencionales()  throws Exception{
	PreparedStatement ps = null;
	String sql="";
	ArrayList<TipoLicencia> lista = new ArrayList<TipoLicencia>();
	ConnectionDB db = new ConnectionDB();
	try{
		sql = "SELECT * FROM parametros WHERE codigo = 'PERMISOS_CONVENCIONALES' and activo = 1";
		ps = db.conn.prepareStatement(sql);
		ResultSet rs = ps.executeQuery(sql);
		while(rs.next()){
			TipoLicencia cr = new TipoLicencia();
			cr.setId(rs.getInt("llave"));
			cr.setDescripcion(rs.getString("descripcion"));
		
			lista.add(cr);
		}			
	}catch (SQLException e){
		System.out.println("Error: " + e.getMessage());
	}catch (Exception e){
		System.out.println("Error: " + e.getMessage());
	}finally {
		ps.close();
		db.close();
	}		
	return lista;
}

//--- BUSCAR HUERTO TRABAJADOR-------------------------------------------------------------------
public static ArrayList<TodoTablaContrato> getHuertoTrab(int cod ) throws Exception{
	PreparedStatement ps = null;
	String sql = "";
	ArrayList<TodoTablaContrato> data = new ArrayList<TodoTablaContrato>();
	ConnectionDB db = new ConnectionDB();
	try{
		sql ="select idHuerto,id,agro from SAN_CLEMENTE.trabajadores idHuerto where codigo = "+cod+"";
		
		ps = db.conn.prepareStatement(sql);
		ResultSet rs = ps.executeQuery(sql);
		while(rs.next()){
			TodoTablaContrato e = new TodoTablaContrato();
		
			e.setIdhuerto(rs.getString("idHuerto"));
		    e.setId(rs.getInt("id"));
		    e.setAgro(rs.getInt("agro"));
			data.add(e);
		}
		rs.close();
		ps.close();
		db.conn.close();
	}catch(Exception ex){
		System.out.println("Error: "+ex.getMessage());
	}finally{
		db.close();
	}
	return data;
}

public static boolean insertarPermisoRendimientoDiario (tablaPermisoLicencia r) throws Exception{
	Statement ps2 = null;
	String sql2 = "";
	
	ConnectionDB db = new ConnectionDB();
	try{
		

	
	sql2 = "insert into rendimiento_diario(estado, valor_liquido,fecha_i,codigo_rg,idContrato,trabajador,tipo_permiso,cargo,campo_rd) values(3,CAST(("+r.getTotalliquidodia()+"/getDiasHabiles(DATE_FORMAT('"+r.getFechapermiso()+"', '%Y%m')))as SIGNED),'"+r.getFechapermiso()+"',0,"
			+ "(SELECT MAX(id) FROM contratos WHERE codigo_trabajador =  "+r.getCodigo_trabajador()+"),"+r.getIdtrabajador()+",1,"+r.getCargo()+",'"+r.getHuerto()+"')";

	ps2 = db .conn.prepareStatement(sql2);
	ps2.execute(sql2);
	
return true;
	}catch (SQLException e){
		System.out.println("Error: "+ e.getMessage());
	}catch (Exception e){
		System.out.println("Error: "+ e.getMessage());
	}finally {
	
		ps2.close();
		db.close();
	}
	return false;
}
////////////cargar trabajadores con permisos y licencias////////////////////////////////////////////
public static ArrayList<LoadTrabajadorSociedad> getSociedadTrabListadoP(String idSociedad,String huerto, String zona, String ceco) throws Exception{
	PreparedStatement ps = null;
	String sql = "";
	ArrayList<LoadTrabajadorSociedad> data = new ArrayList<LoadTrabajadorSociedad>();
	ConnectionDB db = new ConnectionDB();
	try{
		sql ="select TR.codigo,"
				+"TR.nombre,"
				+"TR.apellidoPaterno,"
				+"TR.apellidoMaterno, "
				+"TR.rut,"
				+"CO.EstadoContrato "
				+"from permiso_licencia P "
				+"inner join trabajadores TR on TR.codigo = P.codigo_trabajador "
				+"inner join contratos CO on CO.codigo_trabajador = P.codigo_trabajador "
				+"where 1 = 1 ";
				
		
		
		if("null".equals(idSociedad)){}else{sql += " and CO.idSociedad = "+idSociedad+"";}
		if("null".equals(huerto)){}else{sql += " and TR.idHuerto = '"+huerto+"'";}
		if("null".equals(zona)){}else{sql += " and TR.idZona = '"+zona+"'";}
		if("null".equals(ceco)){}else{sql += " and TR.idCECO = '"+ceco+"'";}
		
		
		sql += " and CO.EstadoContrato = 1 group by CO.codigo_trabajador";
		
		ps = db.conn.prepareStatement(sql);
		ResultSet rs = ps.executeQuery(sql);
		while(rs.next()){
			LoadTrabajadorSociedad e = new LoadTrabajadorSociedad();
			
			e.setCodigotrabajador(rs.getInt("codigo"));
			e.setNombre(rs.getString("nombre"));
			e.setApellidoPaterno(rs.getString("apellidoPaterno"));
			e.setApellidoMaterno(rs.getString("apellidoMaterno"));
		    e.setRut(rs.getString("rut"));
			data.add(e);
		}
		rs.close();
		ps.close();
		db.conn.close();
	}catch(Exception ex){
		System.out.println("Error: "+ex.getMessage());
	}finally{
		db.close();
	}
	return data;
}


public static boolean closeAndUpdateHD(UpdateTrabajadorHD r) throws  Exception{
	PreparedStatement ps = null;
	String sql = "";
	
	Statement ps2 = null;
	String sql2="";
	
	ConnectionDB  db = new ConnectionDB();	
	try {

		sql = "Update sw_haberesDescuentos set "
		    + "estadoCambio = 1 "	
			+ "where id = "+r.getId()+""; 
		
		System.out.println(sql);
		
		ps = db.conn.prepareStatement(sql);
		ps.execute();
		
		sql2 = "INSERT INTO sw_haberesDescuentos (periodo , tipo, codigo_hd , monto , codigo_trabajador,frecuencia,cuotas,fecha_inicio,fecha_termino,idContrato,llave_moneda,proporcional)";
		sql2+= "VALUES ("+r.getPeriodo_t()+",'"+r.getTipo_t()+"',"+r.getCodigo_hd_t()+","+r.getMontonew()+","+r.getCod_t()+","+r.getFrecuencia_t()+","+r.getCuota()+","+r.getFecha_inicio()+","+r.getFecha_termino()+","+r.getId_contrato()+ ","+r.getIdmoneda()+","+r.getProporcional()+");";

		System.out.println(sql2);
		
		ps2 = db.conn.prepareStatement(sql2);
		
		
		ps2.execute(sql2);
				
		return true;
	} catch (SQLException e) {
		System.out.println("Error:" + e.getMessage());
		e.printStackTrace();
	}catch (Exception e) {
		System.out.println("Error: " + e.getMessage());
	}finally {
		ps.close();
		ps2.close();
		db.close();
	}		
	return false;
}
}
