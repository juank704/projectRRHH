package lib.db.sw;
import java.math.BigDecimal;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import cl.expled.web.periodoLibroRem;
import lib.ClassSASW.CentroCosto;
import lib.classSW.HaberDescuento;
import lib.classSW.LibroRemuneraciones;
import lib.db.ConnectionDB;
import lib.db.SASW.CentroCostoDB;

public class LibroRemuneracionesDB {
public static ArrayList<LibroRemuneraciones> getRows() throws SQLException{
	PreparedStatement ps = null;
	ConnectionDB db = new ConnectionDB();
	String sql="";
	
	ArrayList<LibroRemuneraciones> lista=new ArrayList<LibroRemuneraciones>();
	try{
		sql = "SELECT "+
				"codTrabajador,trabajadores.nombre, trabajadores.apellidoPaterno, trabajadores.apellidoMaterno,idContrato, periodo, "+
				"SUM(CASE WHEN idConcepto = 0 and sw_liquidacionDetalle.descripcion  like 'Tipo Trabajador (0 FIJO, 1 INDEFINIDO)%' THEN valor ELSE 0 END)  tipoTrabajador, "+
				"SUM(CASE WHEN idConcepto = 1 THEN valor ELSE 0 END)  sueldoBase, "+
				"SUM(CASE WHEN idConcepto = 2 THEN round(valor) ELSE 0 END)  diasTrabajados, "+
				"SUM(CASE WHEN idConcepto = 3 THEN valor ELSE 0 END)  sueldoBase2, "+
				"SUM(CASE WHEN idConcepto = 4 THEN valor ELSE 0 END)  bonosImponibles, "+
				"SUM(CASE WHEN idConcepto = 7 THEN valor ELSE 0 END)  horaExtra, "+
				"SUM(CASE WHEN idConcepto = 9 THEN valor ELSE 0 END)  gratificacion, "+
				"SUM(CASE WHEN idConcepto = 10 THEN valor ELSE 0 END)  totalHaberesImponibles, "+
				"SUM(CASE WHEN idConcepto = 11 THEN valor ELSE 0 END)  bonosNoImponibles, "+
				"SUM(CASE WHEN idConcepto = 15 THEN valor ELSE 0 END)  cargaFamiliarSimple, "+
				"SUM(CASE WHEN idConcepto = 16 THEN valor ELSE 0 END)  cargaFamiliarMaternal, "+
				"SUM(CASE WHEN idConcepto = 17 THEN valor ELSE 0 END)  cargaFamiliaresRetro, "+
				"SUM(CASE WHEN idConcepto = 20 THEN valor ELSE 0 END)  totalHabNoImponible, "+
				"SUM(CASE WHEN idConcepto = 21 THEN valor ELSE 0 END)  totalHaberes, "+
				"SUM(CASE WHEN idConcepto = 22 THEN valor ELSE 0 END)  baseTributable, "+
				"SUM(CASE WHEN idConcepto = 31 THEN valor ELSE 0 END)  AFP, "+
				"SUM(CASE WHEN idConcepto = 32 and sw_liquidacionDetalle.descripcion not like 'CAJA%' THEN valor ELSE 0 END)  salud, "+
				"SUM(CASE WHEN idConcepto = 32 and sw_liquidacionDetalle.descripcion  like 'CAJA%' THEN valor ELSE 0 END)  caja, "+
				"SUM(CASE WHEN idConcepto = 33 THEN valor ELSE 0 END)  seguroCesantiaAFCTrabajador, "+
				"SUM(CASE WHEN idConcepto = 34 THEN valor ELSE 0 END)  APV, "+
				"SUM(CASE WHEN idConcepto = 39 THEN valor ELSE 0 END)  impuestoUnico, "+
				"SUM(CASE WHEN idConcepto = 40 THEN valor ELSE 0 END)  totalDescuentosImp, "+
				"SUM(CASE WHEN idConcepto = 43 THEN valor ELSE 0 END)  anticipo, "+
				"SUM(CASE WHEN idConcepto = 44 THEN valor ELSE 0 END)  descuentos, "+
				"SUM(CASE WHEN idConcepto = 48 THEN valor ELSE 0 END)  ahoroVoluntarioAfp, "+
				"SUM(CASE WHEN idConcepto = 50 THEN valor ELSE 0 END)  totalDescuentosNoImp, "+
				"SUM(CASE WHEN idConcepto = 51 THEN valor ELSE 0 END)  totalDescuentos, "+
				"SUM(CASE WHEN idConcepto = 91 THEN valor ELSE 0 END)  cotizacionSIS, "+
				"SUM(CASE WHEN idConcepto = 92 THEN valor ELSE 0 END)  seguroSesantiaAFC, "+
				"SUM(CASE WHEN idConcepto = 94 THEN valor ELSE 0 END)  cotizacionBasica, "+
				"SUM(CASE WHEN idConcepto = 95 THEN valor ELSE 0 END)  cotizacionAdicional, "+
				"SUM(CASE WHEN idConcepto = 96 THEN valor ELSE 0 END)  cotizacionExtraordinaria, "+
				"SUM(CASE WHEN idConcepto = 97 THEN valor ELSE 0 END)  SANNA, "+
				"SUM(CASE WHEN idConcepto = 100 THEN valor ELSE 0 END)  totalPago, "+
				"SUM(CASE WHEN idConcepto = 101 THEN valor ELSE 0 END)  totalLiquidoMes, "+
				"sociedad.sociedad, sociedad.denominacionSociedad "+
				"FROM sw_liquidacionDetalle "+
				"inner join trabajadores on sw_liquidacionDetalle.codTrabajador=trabajadores.codigo "+
				"inner join campo on campo.campo=trabajadores.idHuerto "+
				"inner join sociedad on sociedad.sociedad=campo.sociedad "+
				"group by sociedad.denominacionSociedad,sociedad.sociedad, codTrabajador,idContrato,periodo order by apellidoPaterno ASC, apellidoMaterno ASC ";
        
		ps = db.conn.prepareStatement(sql);
		ResultSet rs = ps.executeQuery(sql);			
		while(rs.next()){				
			LibroRemuneraciones row= new LibroRemuneraciones();				
			row.setCodTrabajador(rs.getInt("codTrabajador"));
			row.setNombre(rs.getString("nombre").toUpperCase());
			row.setApellidoPaterno(rs.getString("apellidoPaterno").toUpperCase());
			row.setApellidoMaterno(rs.getString("apellidoMaterno").toUpperCase());
			row.setIdContrato(rs.getInt("idContrato"));
			row.setPeriodo(rs.getInt("periodo"));
			row.setTipoTrabajador(rs.getBigDecimal("tipoTrabajador"));
			row.setSueldoBase(rs.getBigDecimal("sueldoBase"));
			row.setDiasTrabajados(rs.getBigDecimal("diasTrabajados"));
			row.setSueldoBase2(rs.getBigDecimal("sueldoBase2"));
			row.setBonosImponibles(rs.getBigDecimal("bonosImponibles"));
			row.setHoraExtra(rs.getBigDecimal("horaExtra"));
			row.setGratificacion(rs.getBigDecimal("gratificacion"));
			row.setTotalHaberesImponibles(rs.getBigDecimal("totalHaberesImponibles"));
			row.setBonosNoImponibles(rs.getBigDecimal("bonosNoImponibles"));
			row.setCargaFamiliarSimple(rs.getBigDecimal("cargaFamiliarSimple"));
			row.setCargaFamiliarMaternal(rs.getBigDecimal("cargaFamiliarMaternal"));
			row.setCargaFamiliaresRetro(rs.getBigDecimal("cargaFamiliaresRetro"));
			row.setTotalHabNoImponible(rs.getBigDecimal("totalHabNoImponible"));
			row.setTotalHaberes(rs.getBigDecimal("totalHaberes"));
			row.setBaseTributable(rs.getBigDecimal("baseTributable"));
			row.setAFP(rs.getBigDecimal("AFP"));
			row.setSalud(rs.getBigDecimal("salud"));
			row.setCaja(rs.getBigDecimal("caja"));
			row.setSeguroCesantiaAFCTrabajador(rs.getBigDecimal("seguroCesantiaAFCTrabajador"));
			row.setAPV(rs.getBigDecimal("APV"));
			row.setImpuestoUnico(rs.getBigDecimal("impuestoUnico"));
			row.setTotalDescuentosImp(rs.getBigDecimal("totalDescuentosImp"));
			row.setAnticipo(rs.getBigDecimal("anticipo"));
			row.setDescuentos(rs.getBigDecimal("descuentos"));
			row.setAhoroVoluntarioAfp(rs.getBigDecimal("ahoroVoluntarioAfp"));
			row.setTotalDescuentosNoImp(rs.getBigDecimal("totalDescuentosNoImp"));
			row.setTotalDescuentos(rs.getBigDecimal("totalDescuentos"));
			row.setCotizacionSIS(rs.getBigDecimal("cotizacionSIS"));
			row.setSeguroSesantiaAFC(rs.getBigDecimal("seguroSesantiaAFC"));
			row.setCotizacionBasica(rs.getBigDecimal("cotizacionBasica"));
			row.setCotizacionAdicional(rs.getBigDecimal("cotizacionAdicional"));
			row.setCotizacionExtraordinaria(rs.getBigDecimal("cotizacionExtraordinaria"));
			row.setSANNA(rs.getBigDecimal("SANNA"));
			row.setTotalPago(rs.getBigDecimal("totalPago"));
			row.setTotalLiquidoMes(rs.getBigDecimal("totalLiquidoMes"));
			row.setSociedad(rs.getString("sociedad"));
			row.setDenominacionSociedad(rs.getString("denominacionSociedad"));
			lista.add(row);
		}		
	}catch (Exception e){
		System.out.println("Error: " + e.getMessage());
	}finally {
		ps.close();
	}		
	return lista;
}

public static ArrayList<LibroRemuneraciones> getRowsByFilter(String empresa, int periodo) throws SQLException {
	PreparedStatement ps = null;
	ConnectionDB db = new ConnectionDB();
	String sql="";
	String filter="";
	if(empresa.equals("0")){
		if(periodo==0){
			filter="";
		}
		else{
			filter="WHERE periodo='"+periodo+"'";
		}
	}
	else{
		if(periodo==0){
			filter="WHERE sociedad='"+empresa+"'";
		}
		else{
			filter="WHERE sociedad='"+empresa+"' and periodo='"+periodo+"'";
		}
		
	}
	
	
	
	
	ArrayList<LibroRemuneraciones> lista=new ArrayList<LibroRemuneraciones>();
	try{
		sql = "SELECT "+
				"codTrabajador,trabajadores.nombre, trabajadores.apellidoPaterno, trabajadores.apellidoMaterno,idContrato, periodo, "+
				"SUM(CASE WHEN idConcepto = 0 and sw_liquidacionDetalle.descripcion  like 'Tipo Trabajador (0 FIJO, 1 INDEFINIDO)%' THEN valor ELSE 0 END)  tipoTrabajador, "+
				"SUM(CASE WHEN idConcepto = 1 THEN valor ELSE 0 END)  sueldoBase, "+
				"SUM(CASE WHEN idConcepto = 2 THEN round(valor) ELSE 0 END)  diasTrabajados, "+
				"SUM(CASE WHEN idConcepto = 3 THEN valor ELSE 0 END)  sueldoBase2, "+
				"SUM(CASE WHEN idConcepto = 4 THEN valor ELSE 0 END)  bonosImponibles, "+
				"SUM(CASE WHEN idConcepto = 7 THEN valor ELSE 0 END)  horaExtra, "+
				"SUM(CASE WHEN idConcepto = 9 THEN valor ELSE 0 END)  gratificacion, "+
				"SUM(CASE WHEN idConcepto = 10 THEN valor ELSE 0 END)  totalHaberesImponibles, "+
				"SUM(CASE WHEN idConcepto = 11 THEN valor ELSE 0 END)  bonosNoImponibles, "+
				"SUM(CASE WHEN idConcepto = 15 THEN valor ELSE 0 END)  cargaFamiliarSimple, "+
				"SUM(CASE WHEN idConcepto = 16 THEN valor ELSE 0 END)  cargaFamiliarMaternal, "+
				"SUM(CASE WHEN idConcepto = 17 THEN valor ELSE 0 END)  cargaFamiliaresRetro, "+
				"SUM(CASE WHEN idConcepto = 20 THEN valor ELSE 0 END)  totalHabNoImponible, "+
				"SUM(CASE WHEN idConcepto = 21 THEN valor ELSE 0 END)  totalHaberes, "+
				"SUM(CASE WHEN idConcepto = 22 THEN valor ELSE 0 END)  baseTributable, "+
				"SUM(CASE WHEN idConcepto = 31 THEN valor ELSE 0 END)  AFP, "+
				"SUM(CASE WHEN idConcepto = 32 and sw_liquidacionDetalle.descripcion not like 'CAJA%' THEN valor ELSE 0 END)  salud, "+
				"SUM(CASE WHEN idConcepto = 32 and sw_liquidacionDetalle.descripcion  like 'CAJA%' THEN valor ELSE 0 END)  caja, "+
				"SUM(CASE WHEN idConcepto = 33 THEN valor ELSE 0 END)  seguroCesantiaAFCTrabajador, "+
				"SUM(CASE WHEN idConcepto = 34 THEN valor ELSE 0 END)  APV, "+
				"SUM(CASE WHEN idConcepto = 39 THEN valor ELSE 0 END)  impuestoUnico, "+
				"SUM(CASE WHEN idConcepto = 40 THEN valor ELSE 0 END)  totalDescuentosImp, "+
				"SUM(CASE WHEN idConcepto = 43 THEN valor ELSE 0 END)  anticipo, "+
				"SUM(CASE WHEN idConcepto = 44 THEN valor ELSE 0 END)  descuentos, "+
				"SUM(CASE WHEN idConcepto = 48 THEN valor ELSE 0 END)  ahoroVoluntarioAfp, "+
				"SUM(CASE WHEN idConcepto = 50 THEN valor ELSE 0 END)  totalDescuentosNoImp, "+
				"SUM(CASE WHEN idConcepto = 51 THEN valor ELSE 0 END)  totalDescuentos, "+
				"SUM(CASE WHEN idConcepto = 91 THEN valor ELSE 0 END)  cotizacionSIS, "+
				"SUM(CASE WHEN idConcepto = 92 THEN valor ELSE 0 END)  seguroSesantiaAFC, "+
				"SUM(CASE WHEN idConcepto = 94 THEN valor ELSE 0 END)  cotizacionBasica, "+
				"SUM(CASE WHEN idConcepto = 95 THEN valor ELSE 0 END)  cotizacionAdicional, "+
				"SUM(CASE WHEN idConcepto = 96 THEN valor ELSE 0 END)  cotizacionExtraordinaria, "+
				"SUM(CASE WHEN idConcepto = 97 THEN valor ELSE 0 END)  SANNA, "+
				"SUM(CASE WHEN idConcepto = 100 THEN valor ELSE 0 END)  totalPago, "+
				"SUM(CASE WHEN idConcepto = 101 THEN valor ELSE 0 END)  totalLiquidoMes, "+
				"sociedad.sociedad, sociedad.denominacionSociedad "+
				"FROM sw_liquidacionDetalle "+
				"inner join trabajadores on sw_liquidacionDetalle.codTrabajador=trabajadores.codigo "+
				"inner join campo on campo.campo=trabajadores.idHuerto "+
				"inner join sociedad on sociedad.sociedad=campo.sociedad "+
				"group by sociedad.denominacionSociedad,sociedad.sociedad, codTrabajador,idContrato,periodo order by apellidoPaterno ASC, apellidoMaterno ASC "
				+filter;
		ps = db.conn.prepareStatement(sql);
		ResultSet rs = ps.executeQuery(sql);
	
		while(rs.next()){				
			LibroRemuneraciones row= new LibroRemuneraciones();				
			row.setCodTrabajador(rs.getInt("codTrabajador"));
			row.setNombre(rs.getString("nombre"));
			row.setApellidoPaterno(rs.getString("apellidoPaterno"));
			row.setApellidoMaterno(rs.getString("apellidoMaterno"));
			row.setIdContrato(rs.getInt("idContrato"));
			row.setPeriodo(rs.getInt("periodo"));
			row.setTipoTrabajador(rs.getBigDecimal("tipoTrabajador"));
			row.setSueldoBase(rs.getBigDecimal("sueldoBase"));
			row.setDiasTrabajados(rs.getBigDecimal("diasTrabajados"));
			row.setSueldoBase2(rs.getBigDecimal("sueldoBase2"));
			row.setBonosImponibles(rs.getBigDecimal("bonosImponibles"));
			row.setHoraExtra(rs.getBigDecimal("horaExtra"));
			row.setGratificacion(rs.getBigDecimal("gratificacion"));
			row.setTotalHaberesImponibles(rs.getBigDecimal("totalHaberesImponibles"));
			row.setBonosNoImponibles(rs.getBigDecimal("bonosNoImponibles"));
			row.setCargaFamiliarSimple(rs.getBigDecimal("cargaFamiliarSimple"));
			row.setCargaFamiliarMaternal(rs.getBigDecimal("cargaFamiliarMaternal"));
			row.setCargaFamiliaresRetro(rs.getBigDecimal("cargaFamiliaresRetro"));
			row.setTotalHabNoImponible(rs.getBigDecimal("totalHabNoImponible"));
			row.setTotalHaberes(rs.getBigDecimal("totalHaberes"));
			row.setBaseTributable(rs.getBigDecimal("baseTributable"));
			row.setAFP(rs.getBigDecimal("AFP"));
			row.setSalud(rs.getBigDecimal("salud"));
			row.setCaja(rs.getBigDecimal("caja"));
			row.setSeguroCesantiaAFCTrabajador(rs.getBigDecimal("seguroCesantiaAFCTrabajador"));
			row.setAPV(rs.getBigDecimal("APV"));
			row.setImpuestoUnico(rs.getBigDecimal("impuestoUnico"));
			row.setTotalDescuentosImp(rs.getBigDecimal("totalDescuentosImp"));
			row.setAnticipo(rs.getBigDecimal("anticipo"));
			row.setDescuentos(rs.getBigDecimal("descuentos"));
			row.setAhoroVoluntarioAfp(rs.getBigDecimal("ahoroVoluntarioAfp"));
			row.setTotalDescuentosNoImp(rs.getBigDecimal("totalDescuentosNoImp"));
			row.setTotalDescuentos(rs.getBigDecimal("totalDescuentos"));
			row.setCotizacionSIS(rs.getBigDecimal("cotizacionSIS"));
			row.setSeguroSesantiaAFC(rs.getBigDecimal("seguroSesantiaAFC"));
			row.setCotizacionBasica(rs.getBigDecimal("cotizacionBasica"));
			row.setCotizacionAdicional(rs.getBigDecimal("cotizacionAdicional"));
			row.setCotizacionExtraordinaria(rs.getBigDecimal("cotizacionExtraordinaria"));
			row.setSANNA(rs.getBigDecimal("SANNA"));
			row.setTotalPago(rs.getBigDecimal("totalPago"));
			row.setTotalLiquidoMes(rs.getBigDecimal("totalLiquidoMes"));
			row.setSociedad(rs.getString("sociedad"));
			row.setDenominacionSociedad(rs.getString("denominacionSociedad"));
			lista.add(row);
		}		
	}catch (Exception e){
		System.out.println("Error: " + e.getMessage());
	}finally {
		ps.close();
	}		
	return lista;
}

public static ArrayList<periodoLibroRem> getPeriodos() throws SQLException {
	PreparedStatement ps = null;
	String sql="";
	ArrayList<periodoLibroRem> lista = new ArrayList<periodoLibroRem>();
	ConnectionDB db = new ConnectionDB();

	try{

		sql = "SELECT distinct(periodo) FROM sw_liquidacionDetalle order by periodo ASC";
		ps = db.conn.prepareStatement(sql);
		ResultSet rs = ps.executeQuery(sql);

		while(rs.next()){
			periodoLibroRem plr = new periodoLibroRem();
			plr.setPeriodo(rs.getInt("periodo"));
			String aux=""+plr.getPeriodo();
			aux=aux.substring(4)+"-"+aux.substring(0, 4);
			plr.setDescripcion(aux);
			lista.add(plr);
		}


	}catch (Exception e){
		System.out.println("Error: " + e.getMessage());
	}finally {
		ps.close();
		db.close();
	}		

	return lista;
}

public static ArrayList<LibroRemuneraciones> crearLibro(String empresa, int periodo, String Huerto) throws SQLException {
	ArrayList<HaberDescuento> haberesImponibles=HaberDescuentoDB.getHaberImponibleUtilizado(periodo);
	ArrayList<HaberDescuento> haberesNoImponibles=HaberDescuentoDB.getHaberNoImponibleUtilizado(periodo);
	ArrayList<HaberDescuento> Descuentos=HaberDescuentoDB.getDescuentosUtilizados(periodo);
	ArrayList<HaberDescuento> costoempresa=HaberDescuentoDB.getCostoEmpresaUtilizados(periodo);
	
	// haberes y descuento finiquito
    ArrayList<HaberDescuento> haberesImponiblesFiniquito=HaberDescuentoDB.getHaberesydescuentoFiniquito(periodo);
	ArrayList<HaberDescuento> haberesNoImponiblesFiniquito=HaberDescuentoDB.getHaberesyDescuentoNoImponibleFiniquito(periodo);
    ArrayList<HaberDescuento> DescuentosFiniquito=HaberDescuentoDB.getDescuentosUtilizadosFiniquito(periodo);
	ArrayList<HaberDescuento> costoempresaFiniquito=HaberDescuentoDB.getCostoEmpresaUtilizadosFiniquito(periodo);
	
	String camposSql="";
	String HIUS="";
	String camposSql2="";
	String camposSql5="";
	String HNIUS="";
	String camposSql3="";
	String camposSql4 = "";
	String camposSql8 = "";
	String camposSql6 = "";
	String camposSql7 = "";
	String DUS="";
	String COE = "";
	
	// haberes no imponibles finiquito
	String HDF_HN = "";
	// haberes finiquito
	String HDF_H = "";
	// descuentos finiquito
	String HDF_D = "";
	// costo empresa finiquito
	String HDF_CE = "";
	
	for(int i=0;i<haberesImponibles.size();i++){
		camposSql=camposSql+", c"+haberesImponibles.get(i).getCodigo();
		HIUS=HIUS+", "+"sum(case when codigo_hd='"+haberesImponibles.get(i).getCodigo()+"' then sw_haberesDescuentos.monto Else 0 END) c"+haberesImponibles.get(i).getCodigo()+"";
	}
	
	for(int i=0;i<costoempresa.size();i++){
		camposSql4=camposSql4+", c"+costoempresa.get(i).getCodigo();
		COE=COE+", "+"sum(case when codigo_hd='"+costoempresa.get(i).getCodigo()+"' then sw_haberesDescuentos.monto Else 0 END) c"+costoempresa.get(i).getCodigo()+"";
	}

	for(int j=0;j<haberesNoImponibles.size();j++){
		camposSql2=camposSql2+", c"+haberesNoImponibles.get(j).getCodigo();
		HNIUS=HNIUS+", "+"sum(case when codigo_hd='"+haberesNoImponibles.get(j).getCodigo()+"' then sw_haberesDescuentos.monto Else 0 END) c"+haberesNoImponibles.get(j).getCodigo()+"";
	}
    
	// descuentos 
	for(int k=0;k<Descuentos.size();k++){
		
		 String nombreconcepU= Descuentos.get(k).getDescripcion().replace(' ', '_');
		 String nombreconcepU2 = nombreconcepU.replaceAll("\\.", "");
	   
	        
		camposSql3=camposSql3+", c"+nombreconcepU2;
		DUS=DUS+" "+"SUM(CASE WHEN idConcepto = 45 and sw_liquidacionDetalle.descripcion = '"+Descuentos.get(k).getDescripcion()+"' THEN valor ELSE 0 END)  c"+nombreconcepU2+",";
	}
        
	
	

	
	// haberes no imponibles finiquitos
	for(int i=0;i<haberesNoImponiblesFiniquito.size();i++){
		camposSql5=camposSql5+", hdf_tipo_hn"+haberesNoImponiblesFiniquito.get(i).getCodigo();
		HDF_HN=HDF_HN+", "+"sum(case when codigo_hd='"+haberesNoImponiblesFiniquito.get(i).getCodigo()+"' then sw_haberesDescuentosFiniquito.monto Else 0 END) hdf_tipo_hn"+haberesNoImponiblesFiniquito.get(i).getCodigo()+"";
	}
	
	// haberes finiquito
		for(int i=0;i<haberesImponiblesFiniquito.size();i++){
			camposSql6=camposSql6+", hdf_tipo_h"+haberesImponiblesFiniquito.get(i).getCodigo();
			HDF_H=HDF_H+", "+"sum(case when codigo_hd='"+haberesImponiblesFiniquito.get(i).getCodigo()+"' then sw_haberesDescuentosFiniquito.monto Else 0 END) hdf_tipo_h"+haberesImponiblesFiniquito.get(i).getCodigo()+"";
		}
		
		// descuentos finiquito
				for(int i=0;i<DescuentosFiniquito.size();i++){
					camposSql7=camposSql7+", hdf_tipo_d"+DescuentosFiniquito.get(i).getCodigo();
					HDF_D=HDF_D+", "+"sum(case when codigo_hd='"+DescuentosFiniquito.get(i).getCodigo()+"' then sw_haberesDescuentosFiniquito.monto Else 0 END) hdf_tipo_d"+DescuentosFiniquito.get(i).getCodigo()+"";
				}
				
				// costo empresa finiquito
				for(int i=0;i<costoempresaFiniquito.size();i++){
					camposSql8=camposSql8+", hdf_tipo_ce"+costoempresaFiniquito.get(i).getCodigo();
					HDF_CE=HDF_CE+", "+"sum(case when codigo_hd='"+costoempresaFiniquito.get(i).getCodigo()+"' then sw_haberesDescuentosFiniquito.monto Else 0 END) hdf_tipo_ce"+costoempresaFiniquito.get(i).getCodigo()+"";
				}
	
	
	
	PreparedStatement ps = null;
	ConnectionDB db = new ConnectionDB();
	String sql="";
	
	ArrayList<LibroRemuneraciones> lista=new ArrayList<LibroRemuneraciones>();
	try{
		sql = 	"select distinct trabajadores.codigo as codTrabajador, UPPER(trabajadores.apellidoPaterno) as apellidoPaterno, "+
				"UPPER(trabajadores.apellidoMaterno) as apellidoMaterno, UPPER(trabajadores.nombre) as nombreTrabajador, "+
				" CASE WHEN trabajadores.rut = '' THEN trabajadores.rutTemporal ELSE trabajadores.rut END as rut ,cargos.cargos,campo.descripcion as nombreCampo, trabajadores.idCECO,sw_m_faena.nombreFaena as faena, contratos.id as idContrato, "+
				"p.descripcion as nombreCuenta,fechaPago as fecha_pago, d.tipoTrabajador,tt.descripcion as nombreTipoTrabajor, d.diasTrabajados, d.sueldoBase2, d.bonosImponibles "+camposSql+", d.horaExtra, d.gratificacion, d.totalHaberesImponibles, "+
				"d.bonosNoImponibles"+camposSql2+", d.cargaFamiliarSimple,d.cargaFamiliarMaternal, d.cargaFamiliaresRetro, d.totalHabNoImponible, d.totalHaberes, "+
				"pa.descripcion as AFP,d.valorAFP, par.descripcion as institucionSalud, d.salud,d.caja,d.adicionalSalud,d.adicionalSaludTRIBU,d.seguroCesantiaAFCTrabajador,d.APV, papv.descripcion as nombreAPV,d.impuestoUnico, "+
				"d.sueldoBase,d.totalDescuentosImp,d.anticipos,d.descuentos "+camposSql3+",d.ahoroVoluntarioAfp,d.totalDescuentosNoImp, d.totalDescuentos, "+ 
				"d.totalPago,d.totalLiquidoMes,d.cotizacionSIS,d.seguroCesantiaAFC, d.cotizacionBasica,d.cotizacionAdicional,d.baseTributable, "+
				"d.cotizacionExtraordinaria, d.SANNA, sociedad.sociedad, sociedad.denominacionSociedad, d.horasfalta,d.descripcionHfalta,"
				+ "d.horasextra, d.descripcionHextra, fechaInicio_actividad,FechaTerminoContrato, "+
				"(select nombre from sw_m_articuloTerminoContrato where idArticuloTerminoContrato = contratos.articuloTerminoContrato) as articulo,"+
				"(select descripcion from sw_m_incisoTerminoContrato where idArticuloTerminoContrato = contratos.articuloTerminoContrato and idIncisoTerminoContrato = contratos.incisoTerminoContrato) as causal "+
				""+camposSql4 + camposSql5+camposSql6+camposSql7+camposSql8+",d.liquidoagro,d.bonoproduccionagro,valorFeriadoproporcional,d.costovidacamara "+
				" from contratos "+
				"inner join sociedad on sociedad.idSociedad=contratos.idSociedad "+
				"left join sw_haberesDescuentosFiniquito swf on contratos.codigo_trabajador=swf.codigo_trabajador "+
				"inner join cargos on contratos.cargo=cargos.id_cargo "+
				"inner join trabajadores on contratos.codigo_trabajador=trabajadores.codigo "+
				"left join sw_m_faena on trabajadores.idFaena=sw_m_faena.idFaena "+
				"left join (select distinct(codigoTrabajador) as codigoTrabajador, idTipoCuenta from cuentaBancaria WHERE cuentaPrimaria=1) as cb on trabajadores.codigo=cb.codigoTrabajador "+
				"left join (SELECT * FROM parametros WHERE codigo='TIPO_DE_CUENTA') AS p on cb.idTipoCuenta=p.codPrevired "+
				"left join (SELECT * FROM sw_liquidacion WHERE periodo='"+periodo+"') as liq on contratos.id=liq.id_contrato "+
				"left join (SELECT * FROM parametros WHERE codigo='AFP') as pa on trabajadores.idAFP=pa.llave "+
				"left join (SELECT * FROM parametros WHERE codigo='ISAPRE') as par on trabajadores.idIsapre=par.llave "+
				"inner join campo on trabajadores.idHuerto=campo.campo "+
				"left join "+
				"(SELECT codigo_trabajador,idContrato "+
				HIUS+HNIUS+COE+
				" from sw_haberesDescuentos "+
				"where periodo='"+periodo+"' "+
				"group by codigo_trabajador, idContrato "+
				"order by 1)as hd on contratos.id=hd.idContrato "+
				
				// haberes no imponibles  finiquito
                 "left join (SELECT codigo_trabajador,idContrato  "+
                 HDF_HN+
                 " from sw_haberesDescuentosFiniquito "+
                 "where periodo='"+periodo+"' group by codigo_trabajador, idContrato,periodo order by 1)as hd2 "+
        		 "on contratos.id=hd2.idContrato "+
                 
				//haberes  imponibles finiquito
				"left join (SELECT codigo_trabajador,idContrato  "+
				HDF_H+
				" from sw_haberesDescuentosFiniquito "+
				"where periodo='"+periodo+"' and tipo = 'h' group by codigo_trabajador, idContrato,periodo order by 1)as hd3 "+
				"on contratos.id=hd3.idContrato "+
				
				//descuentos finiquito
				"left join (SELECT codigo_trabajador,idContrato  "+
				HDF_D+
				" from sw_haberesDescuentosFiniquito "+
				"where periodo='"+periodo+"' and tipo = 'd' group by codigo_trabajador, idContrato,periodo order by 1)as hd4 "+
				"on contratos.id=hd4.idContrato "+
				
				//costo empresa finiquito
				"left join (SELECT codigo_trabajador,idContrato  "+
				HDF_CE+
				" from sw_haberesDescuentosFiniquito "+
				"where periodo='"+periodo+"' and tipo = 'c' group by codigo_trabajador, idContrato,periodo order by 1)as hd5 "+
				"on contratos.id=hd5.idContrato "+
				
				
				//Feriado proporcional Finiquito
				
				"left join (SELECT codTrabajador,idContrato," +
				"SUM(CASE "+
				"WHEN idConcepto = 2006 THEN sw_detalleFiniquito.valor "+
				"ELSE 0 "+ 
				"END) valorFeriadoproporcional "+
			    "from sw_detalleFiniquito "+
			    "where periodo= '"+periodo+"'  group by codTrabajador, idContrato order by 1)as hd6 "+
				"on contratos.id=hd6.idContrato "+
		 
				
				"inner join "+
				"(SELECT codTrabajador,idContrato, periodo, "+
				DUS+
				"SUM(CASE WHEN idConcepto = 0 and sw_liquidacionDetalle.descripcion  like 'Tipo Trabajador (0 FIJO, 1 INDEFINIDO)%' THEN round(valor) ELSE 0 END)  tipoTrabajador, "+
				"SUM(CASE WHEN idConcepto = 1 THEN valor ELSE 0 END)  sueldoBase, "+
				"SUM(CASE WHEN idConcepto = 2 THEN round(valor) ELSE 0 END)  diasTrabajados, "+
				"SUM(CASE WHEN idConcepto = 3 THEN valor ELSE 0 END)  sueldoBase2, "+
				"SUM(CASE WHEN idConcepto = 4 THEN valor ELSE 0 END)  bonosImponibles, "+
				"SUM(CASE WHEN idConcepto = 7 THEN valor ELSE 0 END)  horaExtra, "+
				"SUM(CASE WHEN idConcepto = 9 THEN valor ELSE 0 END)  gratificacion, "+
				"SUM(CASE WHEN idConcepto = 10 THEN valor ELSE 0 END)  totalHaberesImponibles, "+
				"SUM(CASE WHEN idConcepto = 11 THEN valor ELSE 0 END)  bonosNoImponibles, "+
				"SUM(CASE WHEN idConcepto = 15 THEN valor ELSE 0 END)  cargaFamiliarSimple, "+
				"SUM(CASE WHEN idConcepto = 16 THEN valor ELSE 0 END)  cargaFamiliarMaternal, "+
				"SUM(CASE WHEN idConcepto = 17 THEN valor ELSE 0 END)  cargaFamiliaresRetro, "+
				"SUM(CASE WHEN idConcepto = 20 THEN valor ELSE 0 END)  totalHabNoImponible, "+
				"SUM(CASE WHEN idConcepto = 21 THEN valor ELSE 0 END)  totalHaberes, "+
				"SUM(CASE WHEN idConcepto = 22 THEN valor ELSE 0 END)  baseTributable, "+
				"SUM(CASE WHEN idConcepto = 31 THEN valor ELSE 0 END)  valorAFP, "+
				"SUM(CASE WHEN idConcepto = 32 and sw_liquidacionDetalle.descripcion not like 'CAJA%' THEN valor ELSE 0 END)  salud, "+
				"SUM(CASE WHEN idConcepto = 32 and sw_liquidacionDetalle.descripcion  like 'CAJA%' THEN valor ELSE 0 END)  caja, "+
				"SUM(CASE WHEN idConcepto = 32 and sw_liquidacionDetalle.descripcion  like '%ADIC%' THEN valor ELSE 0 END)  adicionalSaludTRIBU, "+
				"SUM(CASE WHEN idConcepto = 98 THEN valor ELSE 0 END)  costovidacamara, "+
				"SUM(CASE WHEN idConcepto = 33 THEN valor ELSE 0 END)  seguroCesantiaAFCTrabajador, "+
				"SUM(CASE WHEN idConcepto = 34 THEN valor ELSE 0 END)  APV, "+
				"SUM(CASE WHEN idConcepto = 39 THEN valor ELSE 0 END)  impuestoUnico, "+
				"SUM(CASE WHEN idConcepto = 40 THEN valor ELSE 0 END)  totalDescuentosImp, "+
				"SUM(CASE WHEN idConcepto = 42 THEN valor ELSE 0 END)  adicionalSalud, "+
				"SUM(CASE WHEN idConcepto = 43 THEN valor ELSE 0 END)  anticipos, "+
				"SUM(CASE WHEN idConcepto = 44 THEN valor ELSE 0 END)  descuentos, "+
				"SUM(CASE WHEN idConcepto = 48 THEN valor ELSE 0 END)  ahoroVoluntarioAfp, "+
				"SUM(CASE WHEN idConcepto = 50 THEN valor ELSE 0 END)  totalDescuentosNoImp, "+
				"SUM(CASE WHEN idConcepto = 51 THEN valor ELSE 0 END)  totalDescuentos, "+
				"SUM(CASE WHEN idConcepto = 91 THEN valor ELSE 0 END)  cotizacionSIS, "+
				"SUM(CASE WHEN idConcepto = 92 THEN valor ELSE 0 END)  seguroCesantiaAFC, "+
				"SUM(CASE WHEN idConcepto = 94 THEN valor ELSE 0 END)  cotizacionBasica, "+
				"SUM(CASE WHEN idConcepto = 95 THEN valor ELSE 0 END)  cotizacionAdicional, "+
				"SUM(CASE WHEN idConcepto = 96 THEN valor ELSE 0 END)  cotizacionExtraordinaria, "+ 
				"SUM(CASE WHEN idConcepto = 97 THEN valor ELSE 0 END)  SANNA, "+
				"SUM(CASE WHEN idConcepto = 100 THEN valor ELSE 0 END)  totalPago, "+ 
				"SUM(CASE WHEN idConcepto = 101 THEN valor ELSE 0 END)  totalLiquidoMes, "+
				"SUM(CASE WHEN idConcepto = 6 THEN REPLACE(CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(valor, '(', -1), ')', 1) AS DECIMAL(10,4)) , '-', '')  ELSE 0 END) horasfalta, "+
				"SUM(CASE WHEN idConcepto = 6 THEN  CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(descripcion, '(', -1), ')', 1) AS DECIMAL(10,4)) "+
				"ELSE 0 END )descripcionHfalta, "+
				"SUM(CASE WHEN idConcepto = 7 THEN REPLACE(CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(valor, '(', -1), ')', 1) AS DECIMAL(10,4)) , '-', '')  ELSE 0 END) horasextra, "+
				"SUM(CASE WHEN idConcepto = 7 THEN  CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(descripcion, '(', -1), ')', 1) AS DECIMAL(10,4)) "+
				"ELSE 0 END )descripcionHextra, "+
				// liquido agro
 				"SUM(CASE WHEN idConcepto = -1 AND sw_liquidacionDetalle.descripcion LIKE '%LIQUIDO AGRO%' THEN valor ELSE 0 END) liquidoagro, "+
				// bono produccion agro
				"SUM(CASE WHEN idConcepto = 4 AND sw_liquidacionDetalle.descripcion LIKE '%BONO PRODUCCION(AGRO)%' THEN valor ELSE 0 END) bonoproduccionagro "+
				
				"FROM sw_liquidacionDetalle "+
				"where periodo='"+periodo+"' "+ 
				"group by  codTrabajador,idContrato, periodo) as d on contratos.id =d.idContrato "+
				"left join (SELECT * FROM parametros WHERE codigo='APV' and activo=1) as papv on trabajadores.institucionAPV=papv.llave "+
				"left join (SELECT * FROM parametros WHERE codigo='TIPO_CONTRATO' and activo=1) as tt on contratos.tipoContrato=tt.llave "+
				"where sociedad.sociedad='"+empresa+"'";
				if("null".equals(Huerto)){}else{sql += " and trabajadores.idHuerto = '"+Huerto+"'";}
				sql += " order by apellidoPaterno, apellidoMaterno, nombreTrabajador";
				
		
				System.out.println("///////////////////////// query ultima //////////////");
				System.out.println(sql);		
		ps = db.conn.prepareStatement(sql);
		ResultSet rs = ps.executeQuery(sql);			
		while(rs.next()){				
			LibroRemuneraciones row= new LibroRemuneraciones();				
			row.setCodTrabajador(rs.getInt("codTrabajador"));
			row.setNombre(rs.getString("nombreTrabajador"));
			row.setApellidoPaterno(rs.getString("apellidoPaterno"));
			row.setApellidoMaterno(rs.getString("apellidoMaterno"));
			row.setRut(rs.getString("rut"));
			row.setCargo(rs.getString("cargos"));
			row.setHuerto(rs.getString("nombreCampo"));
			row.setCeco(rs.getString("idCECO"));
			ArrayList<CentroCosto> cecos = new ArrayList<CentroCosto>();
			cecos=CentroCostoDB.getCentrosCostosByCECO(row.getCeco(), "p");
			row.setNombreCECO(cecos.get(0).getNAME());
			
			row.setFaena(rs.getString("faena"));
			row.setIdContrato(rs.getInt("idContrato"));
			row.setTipoCuenta(rs.getString("nombreCuenta"));
			row.setFechaPago(rs.getString("fecha_pago"));
			row.setTipoTrabajador(rs.getBigDecimal("tipoTrabajador"));
			row.setNombreTipoTrabajador(rs.getString("nombreTipoTrabajor"));
			row.setSueldoBase(rs.getBigDecimal("sueldoBase"));
			row.setDiasTrabajados(rs.getBigDecimal("diasTrabajados"));
			row.setSueldoBase2(rs.getBigDecimal("sueldoBase2"));
			row.setBonosImponibles(rs.getBigDecimal("bonosImponibles"));
			row.setNombreSalud(rs.getString("institucionSalud"));
			row.setHoraExtra(rs.getBigDecimal("horaExtra"));
			row.setGratificacion(rs.getBigDecimal("gratificacion"));
			row.setTotalHaberesImponibles(rs.getBigDecimal("totalHaberesImponibles"));
			row.setBonosNoImponibles(rs.getBigDecimal("bonosNoImponibles"));
			row.setPeriodo(periodo);
			row.setNombreAFP(rs.getString("AFP"));
			row.setBonosNoImponibles(rs.getBigDecimal("bonosNoImponibles"));
			row.setMontoHorafalta(rs.getBigDecimal("horasfalta"));
			row.setHoraFalta(rs.getBigDecimal("descripcionHfalta"));
			
			row.setMontoHoraExtra(rs.getBigDecimal("horasextra"));
			row.setHoraExtraJ(rs.getBigDecimal("descripcionHextra"));
			
			row.setFechaInicio_actividad(rs.getString("fechaInicio_actividad"));
			row.setFechaTerminoContrato(rs.getString("FechaTerminoContrato"));
			row.setArticulo(rs.getInt("articulo"));
			row.setCausal(rs.getString("causal"));
			
			row.setLiquidoAgro(rs.getBigDecimal("liquidoagro"));
			row.setBonoProduccionAgro(rs.getBigDecimal("bonoproduccionagro"));
			
			
			row.setValorFeriadoProporcional(rs.getBigDecimal("valorFeriadoproporcional"));
			
			
		
			
			ArrayList<HaberDescuento> hds=new ArrayList<HaberDescuento>();
			
			for(int z=0;z<haberesImponibles.size();z++){
				HaberDescuento aux=new HaberDescuento();
				aux.setDescripcion(haberesImponibles.get(z).getDescripcion());
				aux.setCodigo(haberesImponibles.get(z).getCodigo());
				aux.setImponible(haberesImponibles.get(z).getImponible());
				aux.setTributable(haberesImponibles.get(z).getTributable());
				BigDecimal BD=rs.getBigDecimal("c"+haberesImponibles.get(z).getCodigo());
				aux.setValor(BD==null?BigDecimal.ZERO:BD);
				hds.add(aux);
			}
			
			row.setHaberesImponibles(hds);
			ArrayList<HaberDescuento> hni=new ArrayList<HaberDescuento>();
			for(int y=0;y<haberesNoImponibles.size();y++){
				HaberDescuento ni=new HaberDescuento();
				ni.setDescripcion(haberesNoImponibles.get(y).getDescripcion());
				ni.setCodigo(haberesNoImponibles.get(y).getCodigo());
				ni.setImponible(haberesNoImponibles.get(y).getImponible());
				ni.setTributable(haberesNoImponibles.get(y).getTributable());
				BigDecimal BD=rs.getBigDecimal("c"+haberesNoImponibles.get(y).getCodigo());
				ni.setValor(BD==null?BigDecimal.ZERO:BD);
//				System.out.println("haberNoImponible "+y+"-"+haberesNoImponibles.get(y).getValor());
				hni.add(ni);
			}
			
			row.setHaberesNoImponibles2(hni);
			
			// haberes imponibles finiquito
						ArrayList<HaberDescuento> hifiniquito=new ArrayList<HaberDescuento>();
						for(int y=0;y<haberesImponiblesFiniquito.size();y++){
							HaberDescuento niF=new HaberDescuento();
							niF.setDescripcion(haberesImponiblesFiniquito.get(y).getDescripcion());
							niF.setCodigo(haberesImponiblesFiniquito.get(y).getCodigo());
							niF.setImponible(haberesImponiblesFiniquito.get(y).getImponible());
							niF.setTributable(haberesImponiblesFiniquito.get(y).getTributable());
							BigDecimal BD=rs.getBigDecimal("hdf_tipo_h"+haberesImponiblesFiniquito.get(y).getCodigo());
							niF.setValor(BD==null?BigDecimal.ZERO:BD);
							hifiniquito.add(niF);
//							
						}
						
				row.setHaberesImponiblesF(hifiniquito);
				
				// haberes NO imponibles finiquito
				ArrayList<HaberDescuento> HNIfiniquito=new ArrayList<HaberDescuento>();
				for(int y=0;y<haberesNoImponiblesFiniquito.size();y++){
					HaberDescuento niFn=new HaberDescuento();
					niFn.setDescripcion(haberesNoImponiblesFiniquito.get(y).getDescripcion());
					niFn.setCodigo(haberesNoImponiblesFiniquito.get(y).getCodigo());
					niFn.setImponible(haberesNoImponiblesFiniquito.get(y).getImponible());
					niFn.setTributable(haberesNoImponiblesFiniquito.get(y).getTributable());
					BigDecimal BD=rs.getBigDecimal("hdf_tipo_hn"+haberesNoImponiblesFiniquito.get(y).getCodigo());
					niFn.setValor(BD==null?BigDecimal.ZERO:BD);
					HNIfiniquito.add(niFn);
				}
				
		row.setHaberesNoImponiblesF(HNIfiniquito);
		
		
		// DESCUENTOS finiquito
		ArrayList<HaberDescuento> DESCUENTOfiniquito=new ArrayList<HaberDescuento>();
		for(int y=0;y<DescuentosFiniquito.size();y++){
			HaberDescuento DESC_FINIQ=new HaberDescuento();
			DESC_FINIQ.setDescripcion(DescuentosFiniquito.get(y).getDescripcion());
			DESC_FINIQ.setCodigo(DescuentosFiniquito.get(y).getCodigo());
			DESC_FINIQ.setImponible(DescuentosFiniquito.get(y).getImponible());
			DESC_FINIQ.setTributable(DescuentosFiniquito.get(y).getTributable());
			BigDecimal BD=rs.getBigDecimal("hdf_tipo_d"+DescuentosFiniquito.get(y).getCodigo());
			DESC_FINIQ.setValor(BD==null?BigDecimal.ZERO:BD);
			DESCUENTOfiniquito.add(DESC_FINIQ);
		}
		
		row.setDescuentoF(DESCUENTOfiniquito);
		
		
		// COSTO EMPRESA FINIQUITO
				ArrayList<HaberDescuento> COSTOPATRONALfiniquito=new ArrayList<HaberDescuento>();
				for(int y=0;y<costoempresaFiniquito.size();y++){
					HaberDescuento CP_FINIQ=new HaberDescuento();
					CP_FINIQ.setDescripcion(costoempresaFiniquito.get(y).getDescripcion());
					CP_FINIQ.setCodigo(costoempresaFiniquito.get(y).getCodigo());
					CP_FINIQ.setImponible(costoempresaFiniquito.get(y).getImponible());
					CP_FINIQ.setTributable(costoempresaFiniquito.get(y).getTributable());
					BigDecimal BD=rs.getBigDecimal("hdf_tipo_ce"+costoempresaFiniquito.get(y).getCodigo());
					CP_FINIQ.setValor(BD==null?BigDecimal.ZERO:BD);
					COSTOPATRONALfiniquito.add(CP_FINIQ);
				}
				
				row.setCostoempresaF(COSTOPATRONALfiniquito);
				
				
				
						
			for(int h=0;h<row.getHaberesNoImponibles2().size();h++){
//				System.out.println("haberNoImponible "+row.getHaberesNoImponibles2().get(h).getCodigo()+": "+row.getHaberesNoImponibles2().get(h).getValor());
			}
			
//			// DESCUENTOS TABA HABERES Y DESCUENTOS
//			for(int x=0;x<Descuentos.size();x++){
//				Descuentos.get(x).setValor(rs.getBigDecimal("c"+Descuentos.get(x).getCodigo()));
//			}
//			row.setDescuentos(Descuentos);
			
			
			// DESCUENTOS finiquito
			ArrayList<HaberDescuento> DESCUENTOS=new ArrayList<HaberDescuento>();
			for(int y=0;y<Descuentos.size();y++){
				HaberDescuento DESC_=new HaberDescuento();
				DESC_.setDescripcion(Descuentos.get(y).getDescripcion());
				
				 String nombreconcepU2= Descuentos.get(y).getDescripcion().replace(' ', '_');
				 String nombreconcepU22 = nombreconcepU2.replaceAll("\\.", "");
				
				BigDecimal BD=rs.getBigDecimal("c"+nombreconcepU22);
				DESC_.setValor(BD==null?BigDecimal.ZERO:BD);
				DESCUENTOS.add(DESC_);
			}
			
			row.setDescuento2(DESCUENTOS);
			
			row.setCargaFamiliarSimple(rs.getBigDecimal("cargaFamiliarSimple"));
			row.setCargaFamiliarMaternal(rs.getBigDecimal("cargaFamiliarMaternal"));
			row.setCargaFamiliaresRetro(rs.getBigDecimal("cargaFamiliaresRetro"));
			row.setTotalHabNoImponible(rs.getBigDecimal("totalHabNoImponible"));
			row.setTotalHaberes(rs.getBigDecimal("totalHaberes"));
			row.setBaseTributable(rs.getBigDecimal("baseTributable"));
			row.setAFP(rs.getBigDecimal("valorAFP"));
			row.setSalud(rs.getBigDecimal("salud"));
			row.setCaja(rs.getBigDecimal("caja"));		
			row.setAdicionalSalud(rs.getBigDecimal("adicionalSalud"));
			row.setAdicionalTribu(rs.getBigDecimal("adicionalSaludTRIBU"));
			
			row.setSeguroCesantiaAFCTrabajador(rs.getBigDecimal("seguroCesantiaAFCTrabajador"));
			row.setAPV(rs.getBigDecimal("APV"));
			row.setNombreAPV(rs.getString("nombreAPV"));
			row.setImpuestoUnico(rs.getBigDecimal("impuestoUnico"));
			row.setTotalDescuentosImp(rs.getBigDecimal("totalDescuentosImp"));
			row.setAnticipo(rs.getBigDecimal("anticipos"));
			row.setDescuentos(rs.getBigDecimal("descuentos"));
			row.setAhoroVoluntarioAfp(rs.getBigDecimal("ahoroVoluntarioAfp"));
			row.setTotalDescuentosNoImp(rs.getBigDecimal("totalDescuentosNoImp"));
			row.setTotalDescuentos(rs.getBigDecimal("totalDescuentos"));
			row.setCotizacionSIS(rs.getBigDecimal("cotizacionSIS"));
			row.setSeguroSesantiaAFC(rs.getBigDecimal("seguroCesantiaAFC"));
			row.setCotizacionBasica(rs.getBigDecimal("cotizacionBasica"));
			row.setCotizacionAdicional(rs.getBigDecimal("cotizacionAdicional"));
			row.setCotizacionExtraordinaria(rs.getBigDecimal("cotizacionExtraordinaria"));
			row.setSANNA(rs.getBigDecimal("SANNA"));
			row.setTotalPago(rs.getBigDecimal("totalPago"));
			row.setTotalLiquidoMes(rs.getBigDecimal("totalLiquidoMes"));
			row.setSociedad(rs.getString("sociedad"));
			row.setDenominacionSociedad(rs.getString("denominacionSociedad"));
			row.setCostoVidaCamara(rs.getBigDecimal("costovidacamara"));
			
			
			
			
			
			lista.add(row);
		}		
	}catch (Exception e){
		System.out.println("Error: " + e.getMessage());
	}finally {
		ps.close();
	}		
	return lista;
	
}
	
	
	

}
