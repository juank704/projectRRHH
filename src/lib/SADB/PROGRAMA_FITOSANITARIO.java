package lib.SADB;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import lib.classSA.CUARTEL_PF;
import lib.classSA.DETALLE_CONSUMO;
import lib.classSA.FILTRO_PF;
import lib.classSA.LIBRO_CAMPO;
import lib.classSA.MATERIAL;
import lib.classSA.MATERIAL_PF;
import lib.classSA.PERFIL;
import lib.classSA.PROGRA_FITOSANITARIO;
import lib.classSA.calificacion_campo;
import lib.classSA.filtro_cc;
import lib.classSA.notificacion;
import lib.classSA.programa_aplicacion;
import lib.db.ConnectionDB;

public class PROGRAMA_FITOSANITARIO { 
	
	

//	----------PROGRAMA_FITOSANITARIO---------------
//	SELECT
	public static ArrayList<PROGRA_FITOSANITARIO> getPF(FILTRO_PF filtro) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<PROGRA_FITOSANITARIO> list = new ArrayList<PROGRA_FITOSANITARIO>();
		ConnectionDB db = new ConnectionDB();
		try{  
			sql = "select pf.*,e.especie nespecie, pf.variedad nvariedad, pa.descripcion nproapli, ef.estado_fenologicos nestadofenologico," 
					+ " tc.control_aplicacion nombretipocontrol, pf.tipo_programa, oa.id orden, pf.libro_campo"
					+ " from programa_fitosanitario pf"
					+ " left join especie e on e.codigo = pf.especie"
					+ " left join variedad v on v.codigo = pf.variedad"
					+ " left join programa_aplicacion pa on pa.codigo = pf.programa_aplicacion"
					+ " left join estado_fenologico ef on ef.codigo = pf.estado_fenologico"
					+ " left join control_aplicacion tc on tc.codigo = pf.tipo_control"
					+ " left join usuario us on us.codigo = pf.usuario_ja"
					+ " left join orden_aplicacion oa on oa.codigo_pf = pf.codigo"
					+ " where temporada='" +filtro.getTemporada()+ "'"
					+ " and campo ='" +filtro.getCampo() +"'"
					+ " and  fecha_estimada between '" +filtro.getFecha_desde()+ "' and '" +filtro.getFecha_hasta() + "'"
					+ " and pf.tipo_programa = 1 "
					//+" and pf.codigo not in (select codigo_pf from orden_aplicacion)"
					+" order by pf.fecha_estimada asc"; 
			System.out.println(sql);
				ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			int a = 0;
			
			while(rs.next()){
				PROGRA_FITOSANITARIO ob = new PROGRA_FITOSANITARIO();
				ob.setCodigo(rs.getInt("codigo"));
				ob.setId(rs.getInt("id"));
				ob.setFecha_estimada(rs.getString("fecha_estimada"));
				ob.setFecha_alerta(rs.getString("fecha_alerta"));
				ob.setTipo_control(rs.getInt("tipo_control"));
				ob.setEstado_fenologico(rs.getInt("estado_fenologico"));
				ob.setEstado_pf(rs.getInt("estado_pf"));
				ob.setPrograma_aplicacion(rs.getInt("programa_aplicacion"));
				ob.setUsuario(rs.getInt("usuario"));
				ob.setUsuario_ja(rs.getInt("usuario_ja"));
				ob.setObservacion(rs.getString("observacion"));
				ob.setMojamiento(rs.getInt("mojamiento"));
				ob.setTemporada(rs.getInt("temporada"));
				ob.setCampo(rs.getString("campo"));
				ob.setEspecie(rs.getInt("especie"));
				ob.setVariedad(rs.getInt("variedad"));
				ob.setNombre_especie(rs.getString("nespecie"));
				ob.setNombre_variedad(rs.getString("nvariedad"));
				ob.setNombre_tipo_control(rs.getString("nombretipocontrol"));
				ob.setNombre_estado_fenologico(rs.getString("nestadofenologico"));
				ob.setNombre_programa_aplicacion(rs.getString("nproapli"));
				ob.setNombre_usuario_ja(rs.getString("campo")); 
				//ob.setCuart_PF(cuartel.getCPF(rs.getInt("codigo")));
				//ob.setMater_PF(material.getMPF(rs.getInt("codigo")));
				ob.setTipo_programa(rs.getInt("tipo_programa"));
				ob.setOrden(rs.getString("orden"));
				ob.setReserva(rs.getString("nreserva"));
				ob.setSolped(rs.getString("solped"));
				ob.setLibro_campo(rs.getString("libro_campo"));
				list.add(ob);
				//System.out.println(a);
				a++;
			}
			rs.close();
			ps.close();
			db.conn.close();
		} catch (Exception e) {
			System.out.println("Error: " + e.getMessage());
		}finally {
			db.close();
		}
		return list;
		
	}
//	INSERT
	public static PROGRA_FITOSANITARIO insertPF (PROGRA_FITOSANITARIO c) throws Exception{  
		PreparedStatement ps = null;
		PreparedStatement ps2 = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		PROGRA_FITOSANITARIO prog = new PROGRA_FITOSANITARIO();
		try {
			
			sql = "INSERT INTO programa_fitosanitario (fecha_estimada, fecha_alerta, tipo_control, estado_pf, "
					+ " programa_aplicacion, usuario, usuario_ja, observacion, temporada, campo, especie, variedad,"
					+ " estado_fenologico, mojamiento, tipo_programa,id, libro_campo,nreserva,solped)";
			sql += "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
			ps = db.conn.prepareStatement(sql);
			ps.setString(1, c.getFecha_estimada());
			ps.setString(2, c.getFecha_alerta());
			ps.setInt(3, c.getTipo_control());
			ps.setInt(4, c.getEstado_pf());
			ps.setInt(5, c.getPrograma_aplicacion());
			ps.setInt(6, c.getUsuario());
			ps.setInt(7, c.getUsuario_ja());
			ps.setString(8, c.getObservacion());
			ps.setInt(9, c.getTemporada());
			ps.setString(10, c.getCampo());
			ps.setInt(11, c.getEspecie());
			ps.setString(12, c.getNombre_variedad());
			ps.setInt(13, c.getEstado_fenologico());
			ps.setInt(14, c.getMojamiento());
			ps.setInt(15, c.getTipo_programa());
			int idPd = 0;
			if(c.getTipo_programa() == 1){
				idPd = getIdPf(c.getCampo(),c.getTemporada());
			}			
			ps.setInt(16, idPd);
			ps.setString(17, c.getLibro_campo());
			ps.setString(18, c.getReserva());
			ps.setString(19, c.getSolped());
			System.out.println(getIdPf(c.getCampo(),c.getTemporada()));
			ps.execute();
			String sql2 = "";
			sql2 = "SELECT MAX(codigo) as codigo from programa_fitosanitario";
			ResultSet idNew = ps.executeQuery(sql2);
			int codPF = 0;
			while (idNew.next()) { 
				codPF = idNew.getInt("codigo"); 
			}
			double has = 0;
			cuartel.deleteCPF(codPF,"cuartel_pf");
			for(CUARTEL_PF cpf: c.getCuart_PF()){
				cpf.setCodigo_pf(codPF);
				cuartel.insertCPF(cpf);
				has += cpf.getHas();
			}
			
			material.deleteMPF(codPF);
			MATERIAL mt = new MATERIAL();
			for(MATERIAL_PF mpf: c.getMater_PF()){
				mpf.setCodigo_pf(codPF);
				material.insertMPF(mpf);
			}
			notificacion n = new notificacion();
			n.setCodigo_tarea(codPF);
			n.setTipo(1);
			n.setUsuario_origen(1);
			n.setUsuario_receptor(c.getUsuario_ja());
			n.setFecha_alerta(c.getFecha_alerta());
			n.setEstado(0);			
			NOTIFICACIONES.insertN(n);
			n = new notificacion();
			n.setCodigo_tarea(codPF);
			n.setTipo(2);
			n.setUsuario_origen(1);
			n.setUsuario_receptor(c.getUsuario_ja());
			n.setFecha_alerta(c.getFecha_estimada());
			n.setEstado(0);			
			NOTIFICACIONES.insertN(n);
			prog.setId(idPd);
			prog.setCodigo(codPF);
			return prog;	
		} catch (SQLException e) {
			System.out.println("Error: 1" + e.getMessage());
		}catch (Exception e) {
			System.out.println("Error: 1" + e.getMessage());
		}finally {
			ps.close();
			db.conn.close();
		}
		
		return prog;
	}
//	UPDATE
	public static boolean updatePF(PROGRA_FITOSANITARIO c) throws  Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB  db = new ConnectionDB();	
		try {
			sql = "Update programa_fitosanitario set "
				+ "estado_fenologico= '"+ c.getEstado_fenologico()+"', "
				+ "mojamiento='" +c.getMojamiento()+ "', fecha_estimada='" +c.getFecha_estimada()+ "', "
				+ "fecha_alerta='" +c.getFecha_alerta()+ "', programa_aplicacion='" +c.getPrograma_aplicacion()+ "', variedad = '"+c.getNombre_variedad()+"', "
				+ "tipo_control='" +c.getTipo_control()+ "', observacion='" +c.getObservacion() + "' , nreserva = null , solped = '', libro_campo = '"+c.getLibro_campo()+"' "
				+ " where codigo = '"+c.getCodigo()+"'";
			System.out.println(sql);
			ps = db.conn.prepareStatement(sql);
			ps.execute();
			
			int codPF = c.getCodigo();
			cuartel.deleteCPF(codPF,"cuartel_pf");
			for(CUARTEL_PF cpf: c.getCuart_PF()){
				cpf.setCodigo_pf(codPF);
				cuartel.insertCPF(cpf);
			}
			material.deleteMPF(codPF);
			for(MATERIAL_PF mpf: c.getMater_PF()){
				mpf.setCodigo_pf(codPF);
				material.insertMPF(mpf);
			}			
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
	
	public static boolean updatePF2(PROGRA_FITOSANITARIO c) throws  Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB  db = new ConnectionDB();	
		try {
			sql = "Update programa_fitosanitario set "
				+ "estado_fenologico= '"+ c.getEstado_fenologico()+"', "
				+ "mojamiento='" +c.getMojamiento()+ "', fecha_estimada='" +c.getFecha_estimada()+ "', "
				+ " programa_aplicacion='" +c.getPrograma_aplicacion()+ "', variedad = '"+c.getNombre_variedad()+"', "
				+ "tipo_control='" +c.getTipo_control()+ "', observacion='" +c.getObservacion() + "' , nreserva = '"+c.getReserva()+"' , solped = '"+c.getSolped()+"', libro_campo = '"+c.getLibro_campo()+"' "
				+ " where codigo = '"+c.getCodigo()+"'";
			System.out.println(sql);
			ps = db.conn.prepareStatement(sql);
			ps.execute();
			
			int codPF = c.getCodigo();
			cuartel.deleteCPF(codPF,"cuartel_pf");
			for(CUARTEL_PF cpf: c.getCuart_PF()){
				cpf.setCodigo_pf(codPF);
				cuartel.insertCPF(cpf);
			}
			material.deleteMPF(codPF);
			for(MATERIAL_PF mpf: c.getMater_PF()){
				mpf.setCodigo_pf(codPF);
				material.insertMPF(mpf);
			}			
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
	
//	RECHAZAR
	public static boolean rechazarPF(int id, int estado) throws  Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB  db = new ConnectionDB();	
		try {
			sql = "Update programa_fitosanitario set "
				+ "estado_pf = '"+estado+"' "
				+ " where codigo = '"+id+"'";  
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
//	------------FIN PROGRAMA FITOSANITARIO-----------------
	
	
//	-----------PROGRAMA_APLICACION-------------------------
//	SELECT
	public static ArrayList<programa_aplicacion> getProgramaAplicacion() throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<programa_aplicacion> lista = new ArrayList<programa_aplicacion>();
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "SELECT * FROM programa_aplicacion where estado = 0";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				programa_aplicacion ob = new programa_aplicacion();
				ob.setCodigo(rs.getInt("codigo"));
				ob.setDescripcion(rs.getString("descripcion"));
				ob.setTipo(rs.getString("tipo"));
				lista.add(ob);
			}
			rs.close();
			ps.close();
			db.conn.close();
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch(Exception e){
			System.out.println("Error:" + e.getMessage());
		}finally {
			db.close();
		}
		return lista;
	}
//	INSERT 
	public static boolean insertPA (programa_aplicacion pa) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		try {
			sql = "INSERT INTO programa_aplicacion (descripcion, tipo)";
			sql += "VALUES (?,?)";
			ps = db.conn.prepareStatement(sql);
			ps.setString(1, pa.getDescripcion());
			ps.setString(2, pa.getTipo());
			ps.execute();
			return true;
		} catch (SQLException e) {
			System.out.println("Error:" + e.getMessage());
		} catch (Exception e) {
			System.out.println("Error:" + e.getMessage());
		}finally {
			ps.close();
			db.conn.close();
		}
		return false;
	}
//		UPDATE
		public static boolean updatePA (programa_aplicacion pa)throws Exception {
			PreparedStatement ps = null;
			String sql = "";
			ConnectionDB db = new ConnectionDB();
			try {
				sql = "UPDATE programa_aplicacion set "
					+ "descripcion='" +pa.getDescripcion()+ "', tipo='" +pa.getTipo()
					+ "', where codigo='" +pa.getCodigo()+ "'";
				ps = db.conn.prepareStatement(sql);
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
//--------------------FIN PROGRAMA_APLICACION--------------------
		
		
//--------------------PERFIL--------------------------------------
		public static ArrayList<PERFIL> getPerfil (int perfil) throws Exception {
			PreparedStatement ps = null;
			String sql = "";
			ArrayList<PERFIL> lista = new ArrayList<PERFIL>();
			ConnectionDB db = new ConnectionDB();
			try {
				sql = "	select u.codigo, u.usuario,  u.clave "
					+ " from usuario u "
					+ " where u.perfil = " + perfil;
				//System.out.println(sql);
				ps = db.conn.prepareStatement(sql);
				ResultSet rs = ps.executeQuery(sql);
				while (rs.next()){
					PERFIL ob = new PERFIL();
					ob.setCodigo(rs.getInt("codigo"));
					ob.setNombre(rs.getString("usuario"));
					ob.setApellido_paterno(rs.getString("clave"));
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
//--------------------FIN PERFIL------------------------------------
		
		
			

		
		
		

//-----------CALIFICACION_CAMPO-------------------
//		SELECT
		public static ArrayList<calificacion_campo> GETCC (filtro_cc c) throws Exception{
			PreparedStatement ps = null;
			String sql = "";
			ArrayList<calificacion_campo> lista = new ArrayList<calificacion_campo>();
			ConnectionDB db = new ConnectionDB();
			try {
				sql = "SELECT * FROM calificacion_campos where labor='" +c.getLabor()+ "', campo='" +c.getCampo()+ "'";
				ps = db.conn.prepareStatement(sql);
				ResultSet rs = ps.executeQuery(sql);
				while (rs.next()){
					calificacion_campo ob = new calificacion_campo();
					ob.setCodigo(rs.getInt("codigo"));
					ob.setCampo(rs.getString("campo"));
					ob.setBajo_max(rs.getInt("bajo_max"));
					ob.setPromedio_max(rs.getInt("promedio_max"));
					ob.setBueno_max(rs.getInt("bueno_max"));
					ob.setLabor(rs.getInt("labor"));
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
//		INSERT
		public static boolean insertCC (calificacion_campo c)throws Exception{
			PreparedStatement ps = null;
			String sql = "";
			ConnectionDB db = new ConnectionDB();
			try {
				sql = "INSERT INTO calificaion_campo (campo, bajo_max, promedio_max, bueno_max, labor)";
				sql += "VALUES (?,?,?,?,?)";
				ps = db.conn.prepareStatement(sql);
				ps.setString(1, c.getCampo());
				ps.setFloat(2, c.getBajo_max());
				ps.setFloat(3, c.getPromedio_max());
				ps.setFloat(4, c.getBueno_max());
				ps.setInt(5, c.getLabor());
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
//		UPDATE
		public static boolean updateCC(calificacion_campo c) throws Exception{
			PreparedStatement ps = null;
			String sql = "";
			ConnectionDB db = new ConnectionDB();
			try {
				sql = "UPDATE caificacion_campo set campo='" +c.getCampo()+ "', bajo_max='" +c.getBajo_max()
					+ "', promedio_max='" +c.getPromedio_max()+ "', bueno_max='" +c.getBueno_max()
					+ "', labor='" +c.labor+ "' where codigo='" + c.getCodigo()+ "'";
				ps = db.conn.prepareStatement(sql);
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
		
//----------FIN CALIFICACION_CAMPO-----------------
		
//		Reprogramar Programa
		public static boolean reprogramaPF (int codigo, String fecha )throws Exception {
			PreparedStatement ps = null;
			String sql = "";
			ConnectionDB db = new ConnectionDB();
			try {
				sql = "UPDATE programa_fitosanitario set "
					+ "fecha ='" +fecha+ "' where codigo = "+codigo;
				ps = db.conn.prepareStatement(sql);
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
		
//		Reprogramar Programa
		public static int getIdPf (String campo, int temporada)throws Exception {
			PreparedStatement ps = null;
			String sql = "";
			ConnectionDB db = new ConnectionDB();
			try {
				
				sql = "SELECT MAX(id) as id from programa_fitosanitario where campo = '"+campo +"' and temporada = " +temporada;
				ps = db.conn.prepareStatement(sql);
				ResultSet idNew = ps.executeQuery(sql);
				int codPF = 0;
				while (idNew.next()) { 
					codPF = idNew.getInt("id"); 
				}
				codPF++;
				return codPF;				
			} catch (SQLException e) {
				System.out.println("Error:" + e.getMessage());
			} catch (Exception e){
				System.out.println("Error:" + e.getMessage());
			} finally {
				ps.close();
				db.conn.close();
			}
			return 0;
		}
		
		public static int getSolpedPF (String id)throws Exception {
			PreparedStatement ps = null;
			String sql = "";
			ConnectionDB db = new ConnectionDB();
			try {
				
				sql = "SELECT id from programa_fitosanitario where (solped = '"+id+"' or  '"+id+"' = '0')";
				ps = db.conn.prepareStatement(sql);
				ResultSet idNew = ps.executeQuery(sql);
				int codPF = 0;
				while (idNew.next()) { 
					codPF = idNew.getInt("id"); 
				}
				return codPF;				
			} catch (SQLException e) {
				System.out.println("Error:" + e.getMessage());
			} catch (Exception e){
				System.out.println("Error:" + e.getMessage());
			} finally {
				ps.close();
				db.conn.close();
			}
			return 0;
		}
		
		public static ArrayList<PROGRA_FITOSANITARIO> getSAP (String campo)throws Exception {
			PreparedStatement ps = null;
			String sql = "";
			ConnectionDB db = new ConnectionDB();
			ArrayList<PROGRA_FITOSANITARIO> list = new ArrayList<PROGRA_FITOSANITARIO>();
			try {
				PROGRA_FITOSANITARIO ob = new PROGRA_FITOSANITARIO();
				sql = "SELECT id,solped,nreserva from programa_fitosanitario where campo = '"+campo+"'";
				ps = db.conn.prepareStatement(sql);
				ResultSet rs = ps.executeQuery(sql);
				while(rs.next()){
					ob.setId(rs.getInt("id"));
					ob.setReserva(rs.getString("nreserva"));
					ob.setSolped(rs.getString("solped"));
				}
				return list;				
			} catch (SQLException e) {
				System.out.println("Error:" + e.getMessage());
			} catch (Exception e){
				System.out.println("Error:" + e.getMessage());
			} finally {
				ps.close();
				db.conn.close();
			}
			return list;
		}
		
		public static ArrayList<LIBRO_CAMPO>  getLibroCampo (String campo)throws Exception {
			PreparedStatement ps = null;
			String sql = "";
			ArrayList<LIBRO_CAMPO> lista = new ArrayList<LIBRO_CAMPO>();
			ConnectionDB db = new ConnectionDB();
			try {
				sql = "SELECT pf.codigo codigo_pf,pf.id id_programa, oa.id id_orden,cam.descripcion campo, pf.fecha_estimada fecha_programa, ca.fecha_inicio, ca.fecha_termino, "
						+ "esp.especie, var.variedad, cua.nombre cuartel, cua.superficie has, cpf.has_real, esf.estado_fenologicos, pra.descripcion tipo_programa, "
						+ "ctr.control_aplicacion, mpf.codigo_material, mpf.dosis_100, mpf.dosis_has, ca.mojamiento, fa.descripcion forma_aplicacion, CONCAT(traApl.nombre,' ',traApl.apellidoPaterno) aplicador, "
						+ "traJA.descripcion jefe_aplicacion, var.fecha_estimada_cosecha, mer.descripcion mercado, (mpf.cantidad_real / tHas.has_real * cpf.has_real) cantidad_real "
						+ "FROM SAN_CLEMENTE.programa_fitosanitario pf "
						+ "INNER join orden_aplicacion oa on oa.codigo_pf = pf.codigo "
						+ "INNER join confirmacion_aplicacion ca on ca.codigo_orden = oa.codigo "
						+ "left join cuartel_pf cpf on cpf.codigo_pf = pf.codigo "
						+ "left join cuartel cua on cua.codigo = cpf.cuartel "
						+ "left join variedad var on var.codigo = cua.variedad "
						+ "left join especie esp on esp.codigo = pf.especie "
						+ "left join campo cam on cam.campo = pf.campo "
						+ "left join programa_aplicacion pra on pra.codigo = pf.programa_aplicacion "
						+ "left join estado_fenologico esf on esf.codigo = pf.estado_fenologico "
						+ "left join control_aplicacion ctr on ctr.codigo = pf.tipo_control "
						+ "left join material_pf mpf on mpf.codigo_pf = pf.codigo "
						+ "left join forma_aplicacion fa on fa.codigo = oa.codigo_fa "
						+ "left join trabajadores traApl on traApl.id = oa.aplicador "
						+ "left join (SELECT * FROM parametros_campo where tabla = 'Jefe Aplicacion') traJA ON traJA.codigo = oa.jefe_aplicacion "
						+ "left join mercado mer on mer.codigo = oa.mercado "
						+ "Left join ( select codigo_pf, Sum(has_real) has_real from cuartel_pf "
						+ "where estado = 'checked' group by codigo_pf, estado ) tHas on tHas.codigo_pf = pf.codigo "
						//+ "left join maquinaria_pf mqpf on mqpf.codigo_pf = pf.codigo "
						+ "where pf.campo = '"+campo+"' and pf.libro_campo = 0 and pf.programa_aplicacion != 3 and cpf.estado = 'checked'";
				System.out.println(sql);
				ps = db.conn.prepareStatement(sql);
				ResultSet rs = ps.executeQuery(sql);
				while(rs.next()){
					LIBRO_CAMPO ob = new LIBRO_CAMPO();
					ob.setCodigo_pf(rs.getInt("codigo_pf"));
					ob.setIdPrograma(rs.getInt("id_programa"));
					ob.setIdOrden(rs.getInt("id_orden"));
					ob.setCampo(rs.getString("campo"));
					ob.setFecha_estimada(rs.getString("fecha_programa"));
					ob.setFecha_inicio(rs.getString("fecha_inicio"));
					ob.setFecha_termino(rs.getString("fecha_termino"));
					ob.setNombre_especie(rs.getString("especie"));
					ob.setNombre_variedad(rs.getString("variedad"));
					ob.setNombre_cuartel(rs.getString("cuartel"));
					ob.setHas(rs.getString("has"));
					ob.setHas_real(rs.getString("has_real"));
					ob.setNombre_estado_fenologico(rs.getString("estado_fenologicos"));
					ob.setNombre_programa_aplicacion(rs.getString("tipo_programa"));
					ob.setNombre_tipo_control(rs.getString("control_aplicacion"));
					ob.setCodigo_material(rs.getString("codigo_material"));
					ob.setDosis_100(rs.getDouble("dosis_100"));
					ob.setDosis_has(rs.getDouble("dosis_has"));
					ob.setMojamiento(rs.getInt("mojamiento"));
					ob.setForma_apliacion(rs.getString("forma_aplicacion"));
					ob.setAplicador(rs.getString("aplicador"));
					ob.setJefe_aplicacion(rs.getString("jefe_aplicacion"));
					//ob.setMaquinaria(rs.getString("maquinaria"));
					//ob.setImplemento(rs.getString("implemento"));
					ob.setFecha_estimada_cosecha(rs.getString("fecha_estimada_cosecha"));
					ob.setMercado(rs.getString("mercado"));
					ob.setCantidad_real(rs.getDouble("cantidad_real"));
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
				ps.close();
				db.conn.close();
			}
			return lista;
		}
		
		public static ArrayList<LIBRO_CAMPO>  getLibroCampo2 (String campo)throws Exception {
			PreparedStatement ps = null;
			String sql = "";
			ArrayList<LIBRO_CAMPO> lista = new ArrayList<LIBRO_CAMPO>();
			ConnectionDB db = new ConnectionDB();
			try {
				sql = "SELECT pf.codigo codigo_pf,pf.id id_programa, oa.id id_orden,cam.descripcion campo, pf.fecha_estimada fecha_programa, ca.fecha_inicio, ca.fecha_termino, "
						+ "esp.especie, var.variedad, cua.nombre cuartel, cua.superficie has, cpf.has_real, esf.estado_fenologicos, pra.descripcion tipo_programa, "
						+ "ctr.control_aplicacion, mpf.codigo_material, mpf.dosis_100, mpf.dosis_has, ca.mojamiento, fa.descripcion forma_aplicacion, traApl.nombre aplicador, "
						+ "traJA.nombre jefe_aplicacion, var.fecha_estimada_cosecha, mer.descripcion mercado, mpf.cantidad_real, oa.fecha_viable_cosecha, mpf.fierro, "
						+ "mpf.azufre,    mpf.calcio,    mpf.cobre,    mpf.diferencia,    mpf.fosforo,    mpf.manganeso,    mpf.nitrogeno,    mpf.potasio,    mpf.zinc "
						+ "FROM SAN_CLEMENTE.programa_fitosanitario pf "
						+ "INNER join orden_aplicacion oa on oa.codigo_pf = pf.codigo "
						+ "INNER join confirmacion_aplicacion ca on ca.codigo_orden = oa.codigo "
						+ "left join cuartel_pf cpf on cpf.codigo_pf = pf.codigo "
						+ "left join cuartel cua on cua.codigo = cpf.cuartel "
						+ "left join variedad var on var.codigo = cua.variedad "
						+ "left join especie esp on esp.codigo = pf.especie "
						+ "left join campo cam on cam.campo = pf.campo "
						+ "left join programa_aplicacion pra on pra.codigo = pf.programa_aplicacion "
						+ "left join estado_fenologico esf on esf.codigo = pf.estado_fenologico "
						+ "left join control_aplicacion ctr on ctr.codigo = pf.tipo_control "
						+ "left join material_pf mpf on mpf.codigo_pf = pf.codigo "
						+ "left join forma_aplicacion fa on fa.codigo = oa.codigo_fa "
						+ "left join trabajadores traApl on traApl.codigo = oa.aplicador "
						+ "left join trabajadores traJA on traJA.codigo = oa.jefe_aplicacion "
						+ "left join mercado mer on mer.codigo = oa.mercado "
						//+ "left join maquinaria_pf mqpf on mqpf.codigo_pf = pf.codigo "
						+ "where pf.campo = '"+campo+"' and pf.libro_campo = 0 and pf.programa_aplicacion = 3  AND cpf.estado = 'checked'";
				System.out.println(sql);
				ps = db.conn.prepareStatement(sql);
				ResultSet rs = ps.executeQuery(sql);
				while(rs.next()){
					LIBRO_CAMPO ob = new LIBRO_CAMPO();
					ob.setCodigo_pf(rs.getInt("codigo_pf"));
					ob.setIdPrograma(rs.getInt("id_programa"));
					ob.setIdOrden(rs.getInt("id_orden"));
					ob.setCampo(rs.getString("campo"));
					ob.setFecha_estimada(rs.getString("fecha_programa"));
					ob.setFecha_inicio(rs.getString("fecha_inicio"));
					ob.setFecha_termino(rs.getString("fecha_termino"));
					ob.setNombre_especie(rs.getString("especie"));
					ob.setNombre_variedad(rs.getString("variedad"));
					ob.setNombre_cuartel(rs.getString("cuartel"));
					ob.setHas(rs.getString("has"));
					ob.setHas_real(rs.getString("has_real"));
					ob.setNombre_estado_fenologico(rs.getString("estado_fenologicos"));
					ob.setNombre_programa_aplicacion(rs.getString("tipo_programa"));
					ob.setNombre_tipo_control(rs.getString("control_aplicacion"));
					ob.setCodigo_material(rs.getString("codigo_material"));
					ob.setDosis_100(rs.getDouble("dosis_100"));
					ob.setDosis_has(rs.getDouble("dosis_has"));
					ob.setMojamiento(rs.getInt("mojamiento"));
					ob.setForma_apliacion(rs.getString("forma_aplicacion"));
					ob.setAplicador(rs.getString("aplicador"));
					ob.setJefe_aplicacion(rs.getString("jefe_aplicacion"));
					//ob.setMaquinaria(rs.getString("maquinaria"));
					//ob.setImplemento(rs.getString("implemento"));
					ob.setFecha_estimada_cosecha(rs.getString("fecha_estimada_cosecha"));
					ob.setMercado(rs.getString("mercado"));
					ob.setCantidad_real(rs.getDouble("cantidad_real"));
					ob.setFecha_viable_cosecha(rs.getString("fecha_viable_cosecha"));
					MATERIAL_PF material = new MATERIAL_PF();
					material.AZUFRE     = rs.getFloat("azufre");
					material.CALCIO     = rs.getFloat("calcio");
					material.COBRE      = rs.getFloat("cobre");
					material.FIERRO     = rs.getFloat("fierro");
					material.FOSFORO    = rs.getFloat("fosforo");
					material.MANGANESO  = rs.getFloat("manganeso");
					material.NITROGENO  = rs.getFloat("nitrogeno");
					//material.OTROS      = rs.getFloat("");
					material.POTASIO    = rs.getFloat("potasio");
					material.ZINC       = rs.getFloat("zinc");
					//material.MANGANESIO = rs.getFloat("");
					ob.setDetalleMaterial(material);
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
				ps.close();
				db.conn.close();
			}
			return lista;
		}
		
		public static ArrayList<DETALLE_CONSUMO>  reporte_fitosanitario (String campo)throws Exception {
			PreparedStatement ps = null;
			String sql = "";
			ArrayList<DETALLE_CONSUMO> lista = new ArrayList<DETALLE_CONSUMO>();
			ConnectionDB db = new ConnectionDB();
			try {
				sql +=	"SELECT ";
				sql +=		"pf.codigo AS codigo_pf, pf.campo, pf.especie, pf.id AS idprograma, pf.nreserva, pf.id, oa.id AS idorden, mpf.codigo_material, ";
				sql +=		"CAST(mpf.cantidad AS DECIMAL(18,3)) AS cantidad, ";
				sql +=		"CAST(mpf.cantidad_real AS DECIMAL(18,3)) AS cantidad_real, ";
				sql +=		"CAST(mpf.diferencia AS DECIMAL(18,3)) AS sobreconsumo, ";
				sql +=		"CAST(mpf.devolucion_real AS DECIMAL(18,3)) AS devolucion_real, ";
				sql +=		"ca.consumo, ca.devolucion, ca.diferencia, cas.consumo AS docConsumo, cas.devolucion AS docDevolucion, cas.sobreconsumo AS docSobreConsumo, ";
				sql +=		"ca.fecha_termino AS fecha, DATE_FORMAT(ca.fecha_termino, '%Y') AS periodo ";
				sql +=	"FROM ";
				sql +=		"programa_fitosanitario pf ";
				sql +=		"LEFT JOIN orden_aplicacion oa ON (oa.codigo_pf = pf.codigo) ";
				sql +=		"LEFT JOIN material_pf mpf ON (mpf.codigo_pf = pf.codigo) ";
				sql +=		"INNER JOIN confirmacion_aplicacion ca ON (ca.codigo_orden = oa.codigo) ";
				sql +=		"LEFT JOIN confirmacion_documento_sap cas ON (cas.codigo_confirmacion = ca.codigo) ";
				sql +=	"WHERE ";
				sql +=		"pf.campo = '"+campo+"'  AND pf.estado_pf = 4 ";
				sql +=	"ORDER BY ca.fecha_termino DESC;";
				System.out.println(sql);
				ps = db.conn.prepareStatement(sql);
				ResultSet rs = ps.executeQuery(sql);
				while(rs.next()){
					DETALLE_CONSUMO ob = new DETALLE_CONSUMO();
					ob.setCodigo_pf(rs.getInt("codigo_pf"));
					ob.setIdPrograma(rs.getInt("idprograma"));
					ob.setIdOrden(rs.getInt("idorden"));
					ob.setCampo(rs.getString("campo"));
					ob.setReserva(rs.getString("nreserva"));
					ob.setCodigo_material(rs.getString("codigo_material"));
					ob.setCantidad_real(rs.getDouble("cantidad_real"));
					
					ob.setCantidad(rs.getDouble("cantidad"));
					ob.setDocConsumo(rs.getString("docConsumo"));
					
					ob.setDevolucion(rs.getDouble("devolucion_real"));
					ob.setDocDevolucion(rs.getString("docDevolucion"));
					
					ob.setSobreConsumo(rs.getDouble("sobreconsumo"));
					ob.setDocSobreConsumo(rs.getString("docSobreConsumo"));
					ob.setFecha(rs.getString("fecha"));
					ob.setPeriodo(rs.getInt("periodo"));
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
				ps.close();
				db.conn.close();
			}
			return lista;
		}
		
}
