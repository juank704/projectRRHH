package lib.SADB;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import javax.servlet.http.HttpSession;

import lib.classSA.BLOQUE;
import lib.classSA.CUARTEL;
import lib.classSA.CUARTEL_PF;
import lib.classSA.FACTOR;
import lib.classSW.EQUIPO;
import lib.classSW.evaporacion;
import lib.classSW.evaporacionAcumulada;
import lib.classSW.riegos;
import lib.db.ConnectionDB;


public class RIEGO {
	public static boolean addBloque(BLOQUE c) throws Exception{
		PreparedStatement ps = null;
		PreparedStatement ps2 = null;
		PreparedStatement ps4 = null;
		String sql = "";
		String sql3 = "";
		String sql4 = "";
		ConnectionDB db = new ConnectionDB();
		try{
			sql = "INSERT INTO bloque ( nombre, sector,especie, variedad, tipo_riego, precipitacion, aforo, reposicion,georeferencia,campo)";
			sql += "VALUES (?,?,?,?,?,?,?,?,?,?)";
			
			sql3 += "INSERT INTO factor_decision (cod_campo, cod_bloque, enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre)";
			sql3 += "SELECT (?), MAX(codigo), 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 FROM bloque;";
//			
			DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd");
			LocalDate localDate = LocalDate.now();
			String fecha = dtf.format(localDate);
			
			sql4 = "INSERT INTO riegos (campo, bloque, horas, fecha, activo)";
			sql4 += "SELECT (?), MAX(codigo), 10, '"+fecha+"', 1 FROM bloque";
			
			ps2 = db.conn.prepareStatement(sql3);
			ps4 = db.conn.prepareStatement(sql4);
			ps = db.conn.prepareStatement(sql);
			
			ps.setString(1, c.getNombre());
			ps.setString(2, c.getSector());
			ps.setString(3, c.getEspecie());
			ps.setString(4, c.getVariedad());
			ps.setString(5, c.getTipo_riego());
			ps.setString(6, c.getPrecipitacion_nominativa());
			ps.setString(7, c.getAforo());
			ps.setString(8, c.getReposicion());
			ps.setString(9, c.getGeoreferencia());
			ps.setString(10, c.getCampo());
			ps2.setString(1, c.getCampo());
			ps4.setString(1, c.getCampo());

			String sql2 = "SELECT MAX(codigo) as codigo from bloque";
			ResultSet idNew = ps.executeQuery(sql2);
			int cod = 0;
			while (idNew.next()) { 
				cod = idNew.getInt("codigo"); 
			}
			for(CUARTEL_PF cpf: c.getCuarteles()){
				cpf.setCodigo_pf(cod);
				if(cpf.getEstado() == "checked") {
					cuartel.insertCPBloque(cpf);
				}
				
			}
			ps.execute();
			ps2.execute();
			ps4.execute();
			return true;
		}
		catch(SQLException e){
			System.out.println("Error: " +e.getMessage());
		}
		catch(Exception e) {
			System.out.println("Error: "+e.getMessage());
		}
		finally{
			ps.close();
			db.close();
		}
		return false;
	}
	
	public static boolean updateBloque(BLOQUE c) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		try{
			sql = "UPDATE bloque SET nombre = '"+c.getNombre()+"', especie = '"+c.getEspecie()+"', "
					+ "variedad = '"+c.getVariedad()+"', tipo_riego = '"+c.getTipo_riego()+"', precipitacion = '"+c.getPrecipitacion_nominativa()+"', "
							+ "aforo = '"+c.getAforo()+"', reposicion = '"+c.getReposicion()+"' where codigo = "+c.getCodigo();
			ps = db.conn.prepareStatement(sql);
			ps.execute();
//			int cod = c.getCodigo();
//			cuartel.deleteCPF(cod,"cuartel_bloque");
//			for(CUARTEL_PF cpf: c.getCuarteles()){
//				cpf.setCodigo_pf(cod);
//				if(cpf.getEstado() == "checked") {
//					cuartel.insertCPBloque(cpf);
//				}
//			}
			
			return true;
		}
		catch(SQLException e){
			System.out.println("Error: " +e.getMessage());
		}
		catch(Exception e) {
			System.out.println("Error: "+e.getMessage());
		}
		finally{
			ps.close();
			db.close();
		}
		return false;
	}
	public static boolean deleteBloque(String id) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ConnectionDB db = new ConnectionDB();
		try{
			sql = "DELETE from bloque where codigo = "+id;
			ps = db.conn.prepareStatement(sql);
			ps.execute();
			cuartel.deleteCPF(Integer.parseInt(id),"cuartel_bloque");
			return true;
		}
		catch(SQLException e){
			System.out.println("Error: " +e.getMessage());
		}
		catch(Exception e) {
			System.out.println("Error: "+e.getMessage());
		}
		finally{
			ps.close();
			db.close();
		}
		return false;
	}
	
	public static ArrayList<BLOQUE> GET_BLOQUES(String[] codigos) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<BLOQUE> list = new ArrayList<BLOQUE>();
		ConnectionDB db = new ConnectionDB();
		try{
			String sqlCodigos = "";
			int c = 0;
			for(int i = 0; i < codigos.length; i++){
				if(c == 0){
					sqlCodigos += " '"+codigos[i]+"'";
				}else{
					sqlCodigos += ", '"+codigos[i]+"'";
				}
				c++;
			}
			sql = "select * FROM bloque where codigo IN ("+sqlCodigos+")";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				BLOQUE ob = new BLOQUE();
				ob.setCodigo(rs.getInt("codigo"));
				ob.setNombre(rs.getString("nombre"));
				ob.setSector(rs.getString("sector"));
				ob.setEspecie(rs.getString("especie"));
				ob.setVariedad(rs.getString("variedad"));
				ob.setTipo_riego(rs.getString("tipo_riego"));
				ob.setPrecipitacion_nominativa(rs.getString("precipitacion"));
				ob.setAforo(rs.getString("aforo"));
				ob.setReposicion(rs.getString("reposicion"));
				ob.setGeoreferencia(rs.getString("georeferencia"));				
				list.add(ob);
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
	
	
	public static ArrayList<CUARTEL_PF> GET_BLOQUES_CUARTEL(String codigo) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<CUARTEL_PF> list = new ArrayList<CUARTEL_PF>();
		ConnectionDB db = new ConnectionDB();
		try{  
			sql = "select cb.*, c.nombre ncuartel, v.variedad nvariedad FROM cuartel_bloque cb "
					+ "left join cuartel c on c.codigo = cb.cuartel "
					+ "left join variedad v on v.codigo = c.variedad "
					+ "where codigo_bloque = '"+codigo+"' ";
					//+ "and (especie = '"+filtro.getEspecie()+"' or '"+filtro.getEspecie()+"' = 0)"
					//+ " and (sector = '"+filtro.getSector()+"' or '"+filtro.getSector()+"' = 0) and (variedad = '"+filtro.getVariedad()+"' or '"+filtro.getVariedad()+"' = 0)";
			System.out.println(sql);		
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				CUARTEL_PF ob = new CUARTEL_PF();
				ob.setCodigo(rs.getInt("codigo"));
				ob.setHas(rs.getFloat("has"));
				ob.setnCuartel(rs.getString("ncuartel"));
				ob.setnVariedad(rs.getString("nvariedad"));
				ob.setMax(rs.getFloat("superficie"));
				list.add(ob);
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

	public static ArrayList<EQUIPO> GET_EQUIPO(String codigo) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<EQUIPO> list = new ArrayList<EQUIPO>();
		ConnectionDB db = new ConnectionDB();
		try{  
			sql = "select distinct codigo_equipo, descripcion FROM equipo_riego where codigo_campo = '"+codigo+"' ";
		
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				EQUIPO ob = new EQUIPO();
				ob.setCodigo_equipo(rs.getString("codigo_equipo"));
//				ob.setCodigo_campo(rs.getString("codigo_campo"));
//				ob.setCodigo_bloque(rs.getString("codigo_bloque"));
				ob.setDescripcion(rs.getString("descripcion"));				
				list.add(ob);
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
	public static ArrayList<EQUIPO> GET_EQUIPOBYCOD(String codigo) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<EQUIPO> list = new ArrayList<EQUIPO>();
		ConnectionDB db = new ConnectionDB();
		try{  
			sql = "select codigo_bloque FROM equipo_riego where codigo_equipo = '"+codigo+"' ";
		
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				EQUIPO ob = new EQUIPO();
//				ob.setCodigo_equipo(rs.getString("codigo_equipo"));
//				ob.setCodigo_campo(rs.getString("codigo_campo"));
				ob.setCodigo_bloque(rs.getString("codigo_bloque"));
//				ob.setDescripcion(rs.getString("descripcion"));				
				list.add(ob);
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

	public static ArrayList<BLOQUE> GET_BLOQUESBYCAMPO(String codigo) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<BLOQUE> list = new ArrayList<BLOQUE>();
		ConnectionDB db = new ConnectionDB();
		try{
			sql = "select * FROM bloque where campo = '"+codigo+"' ";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				BLOQUE ob = new BLOQUE();
				ob.setCodigo(rs.getInt("codigo"));
				ob.setNombre(rs.getString("nombre"));
				ob.setSector(rs.getString("sector"));
				ob.setEspecie(rs.getString("especie"));
				ob.setVariedad(rs.getString("variedad"));
				ob.setTipo_riego(rs.getString("tipo_riego"));
				ob.setPrecipitacion_nominativa(rs.getString("precipitacion"));
				ob.setAforo(rs.getString("aforo"));
				ob.setReposicion(rs.getString("reposicion"));
				ob.setGeoreferencia(rs.getString("georeferencia"));				
				list.add(ob);
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
	public static ArrayList<EQUIPO> GET_BLOQUESBYEQUIPO(String cod_campo, String cod_equipo) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<EQUIPO> list = new ArrayList<EQUIPO>();
		ConnectionDB db = new ConnectionDB();
		try{
			sql = "select codigo_bloque FROM equipo_riego where codigo_equipo = '"+cod_equipo+"' and codigo_campo = '"+cod_campo+"'";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				EQUIPO ob = new EQUIPO();
				ob.setCodigo_bloque(rs.getString("codigo_bloque"));		
				list.add(ob);
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

	public static ArrayList<evaporacion> getEvaporacionByCampo(String campo) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<evaporacion> list = new ArrayList<evaporacion>();
		ConnectionDB db = new ConnectionDB();
		try{
			sql = "select * from evaporacion where campo = '"+campo+"'";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				evaporacion ob = new evaporacion();
				ob.setCodigo(rs.getInt("codigo"));
				ob.setCampo(rs.getString("campo"));
				ob.setLunes(rs.getString("lunes"));
				ob.setMartes(rs.getString("martes"));
				ob.setMiercoles(rs.getString("miercoles"));
				ob.setJueves(rs.getString("jueves"));
				ob.setViernes(rs.getString("viernes"));
				ob.setSabado(rs.getString("sabado"));
				ob.setDomingo(rs.getString("domingo"));
				ob.setLunesnext(rs.getString("lunesnext"));
				ob.setMartesnext(rs.getString("martesnext"));
				ob.setMiercolesnext(rs.getString("miercolesnext"));
				ob.setJuevesnext(rs.getString("juevesnext"));
				ob.setViernesnext(rs.getString("viernesnext"));
				ob.setSabadonext(rs.getString("sabadonext"));
				ob.setDomingonext(rs.getString("domingonext"));

				list.add(ob);
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

	public static boolean UPEVAPORACIONACTUAL(evaporacion c) throws Exception {
		PreparedStatement ps = null;
		 String sql = "";
		 ConnectionDB db = new ConnectionDB();
		 try {
			sql = " UPDATE evaporacion set lunes='" +c.getLunes()+ "', "
				+ " martes="+c.getMartes()
				+ ", miercoles="+c.getMiercoles()
				+ ", jueves="+c.getJueves()
				+ ", viernes="+c.getViernes()
				+ ", sabado="+c.getSabado()
				+ ", domingo="+c.getDomingo()
				+" where campo='" +c.getCampo()+"'";

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
	public static boolean UPEVAPORACIONNEXT(evaporacion c) throws Exception {
		PreparedStatement ps = null;
		 String sql = "";
		 ConnectionDB db = new ConnectionDB();
		 try {
			sql = " UPDATE evaporacion set lunesnext='" +c.getLunesnext()+ "', "
				+ " martesnext="+c.getMartesnext()
				+ ", miercolesnext="+c.getMiercolesnext()
				+ ", juevesnext="+c.getJuevesnext()
				+ ", viernesnext="+c.getViernesnext()
				+ ", sabadonext="+c.getSabadonext()
				+ ", domingonext="+c.getDomingonext()
				+" where campo='" +c.getCampo()+"'";

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

	public static ArrayList<evaporacionAcumulada> getEvaporacionAcumulada(String campo) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<evaporacionAcumulada> list = new ArrayList<evaporacionAcumulada>();
		ConnectionDB db = new ConnectionDB();
		try{
			sql = "select * from evaporacion_acumulada where campo = '"+campo+"'";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				evaporacionAcumulada ob = new evaporacionAcumulada();
				ob.setCodigo(rs.getInt("codigo"));
				ob.setCampo(rs.getString("campo"));
				ob.setHasta_verde(rs.getString("hasta_verde"));
				ob.setDesde_verde(rs.getString("desde_verde"));
				ob.setHasta_amarillo(rs.getString("hasta_amarillo"));
				ob.setDesde_amarillo(rs.getString("desde_amarillo"));
				ob.setHasta_rojo(rs.getString("hasta_rojo"));
				ob.setDesde_rojo(rs.getString("desde_rojo"));

				list.add(ob);
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
	public static boolean UPEVAPORACIONACUMULADA(evaporacionAcumulada c) throws Exception {
		PreparedStatement ps = null;
		 String sql = "";
		 ConnectionDB db = new ConnectionDB();
		 try {
			sql = " UPDATE evaporacion_acumulada set hasta_verde='" +c.getHasta_verde()+ "', "
				+ " desde_verde="+c.getDesde_verde()
				+ ", hasta_amarillo="+c.getHasta_amarillo()
				+ ", desde_amarillo="+c.getDesde_amarillo()
				+ ", hasta_rojo="+c.getHasta_rojo()
				+ ", desde_rojo="+c.getDesde_rojo()
				+" where campo='" +c.getCampo()+"'";

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

	public static ArrayList<riegos> getRiegosByCampo(String campo) throws Exception{
		PreparedStatement ps = null;
		String sql = "";
		ArrayList<riegos> list = new ArrayList<riegos>();
		ConnectionDB db = new ConnectionDB();
		try{
			sql = "select cb.*, c.nombre nombre_bloque FROM riegos cb";
			sql += " left join bloque c on c.codigo = cb.bloque";
			sql += " where cb.campo = '"+campo+"'";
			ps = db.conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery(sql);
			while(rs.next()){
				riegos ob = new riegos();
				ob.setCodigo(rs.getInt("codigo"));
				ob.setCampo(rs.getString("campo"));
				ob.setBloque(rs.getString("bloque"));
				ob.setHoras(rs.getInt("horas"));
				ob.setFecha(rs.getString("fecha"));
				ob.setActivo(rs.getString("activo"));
				ob.setNombre_bloque(rs.getString("nombre_bloque"));
				list.add(ob);
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

	public static boolean updateEstadoRiego(riegos c) throws Exception{
		PreparedStatement ps = null;
		PreparedStatement ps2 = null;
		String sql = "";
		String sql2 = "";
		ConnectionDB db = new ConnectionDB();
		
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd");
		LocalDate localDate = LocalDate.now();
		String fecha = dtf.format(localDate);
		
		
		try{
			sql = "UPDATE riegos SET activo = 0, fecha = '"+fecha+"', horas = "+c.getHoras()+" where codigo = "+c.getCodigo();
			sql2 = "INSERT into riegos (campo, bloque, horas, fecha, activo) values ('"+c.getCampo()+"', '"+c.getBloque()+"', "+c.getHoras()+", '"+fecha+"', '1')";
			ps = db.conn.prepareStatement(sql);
			ps2 = db.conn.prepareStatement(sql2);
			ps.execute();
			ps2.execute();
			return true;
		}
		catch(SQLException e){
			System.out.println("Error: " +e.getMessage());
		}
		catch(Exception e) {
			System.out.println("Error: "+e.getMessage());
		}
		finally{
			ps.close();
			ps2.close();
			db.close();
		}
		return false;
	}
}
