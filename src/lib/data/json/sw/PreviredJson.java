package lib.data.json.sw;

import java.io.BufferedWriter;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Formatter;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import lib.classSW.LiquidacionPeriodo;
import lib.classSW.Previred;
import lib.db.sw.FiniquitosBD;
import lib.db.sw.PreviredDB;
import wordCreator.utils;

@Controller
public class PreviredJson {
	
	private final static Logger LOG = LoggerFactory.getLogger(PreviredJson.class);
	
	PreviredDB previredDb = new PreviredDB();
	
	FiniquitosBD finiquitosBD = new FiniquitosBD();
	
	@RequestMapping(value = "/work/obtenerPrevired", method = {RequestMethod.GET})
	public @ResponseBody String obtenerPrevired(HttpServletRequest request, HttpServletResponse response,
			HttpSession session) {
		//LOG.info("Obtener archivo Previred...");
		String urlDocGenerado = utils.obtenerCarpetaServidor() + File.separator;
		String nombreArchivo = "Previred"+ Calendar.getInstance().getTimeInMillis()+".txt";

		try {
			String periodo = request.getParameter("periodo");
			String empresa = request.getParameter("empresa");
			//LOG.info("Periodo seleccionado >> {}",periodo);
			InputStream fileInputStreamReader = this.generaFilePrevired(periodo, urlDocGenerado + nombreArchivo, empresa);
			byte[] bytes = IOUtils.toByteArray(fileInputStreamReader);
			response.addHeader("Content-disposition", "attachment; filename= " + nombreArchivo + "");
			//response.setContentType("text/plain; charset=");
			response.setContentType("text/plain");
			response.setContentLength(bytes.length);
			response.setCharacterEncoding("iso-8859-1");
			//response.setCharacterEncoding("windows-1252");
		
			
			ServletOutputStream out = response.getOutputStream();
			out.write(bytes);
			out.flush();
			out.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return "1";
	}
	
	private InputStream generaFilePrevired(String periodo, String urlDocGenerado, String empresa){
		ByteArrayInputStream is = null;
		try {
			Calendar fecha = Calendar.getInstance();
			File previred = new File(urlDocGenerado);
			FileWriter fw = new FileWriter(previred);
            BufferedWriter bw = new BufferedWriter(fw);
            ArrayList<Previred> previredLista = new ArrayList<>();
            List<Previred> previredLista2 = new ArrayList<>();
            List<Previred> previredLista3 = new ArrayList<>();
            ArrayList<Previred> listaFinal=new ArrayList<Previred>();
            // obtiene codigo trabajador id contrato que tengan liquidacion para x periodo
            List<LiquidacionPeriodo> lista5 = previredDb.obtenerLiquidacionPeriodotablaLiquidacion(periodo,empresa);
           
           
            int count = 0;
            int contadorfor = 0;
            int codAmterior = 0;

            for (LiquidacionPeriodo datos : lista5) 
            {
            	if(contadorfor == 0)
            	{
            		codAmterior = datos.getCodTrabajador();
            	}
					
            	if(codAmterior == datos.getCodTrabajador() && contadorfor >= 1)
            	{
            		count = 1;	
            	}
				
            	codAmterior = datos.getCodTrabajador();
            	
            	
            	previredLista2.addAll(previredDb.getDatosPreviredContratados(periodo,empresa,datos.getCodTrabajador() + "", datos.getIdContrato() + "",count));
            	contadorfor ++;	
            	count = 0;
			}// end for
            
//            previredLista2.addAll(previredDb.getDatosPreviredContratados(periodo,empresa));
//            previredLista2.addAll(previredDb.getDatosPreviredRetirados(periodo));
//            previredLista2.addAll(previredDb.getDatosPreviredCambioAfpIsapre(periodo));
           
            for(Previred p : previredLista2){
            	LiquidacionPeriodo liquidacion = new LiquidacionPeriodo();	
				liquidacion.setCodTrabajador(p.getCodTrabajador());
				liquidacion.setIdContrato(p.getIdContrato());
				liquidacion.setPeriodo(Integer.parseInt(periodo));
				List<LiquidacionPeriodo> lista = finiquitosBD.obtenerLiquidacionPeriodo(liquidacion);
			
				 int DescuentoCargaFA = 0;
				 int valor_accidente_trabajo = 0;
				 int cotizacion_voluntaria = 0;
				for(LiquidacionPeriodo liq : lista){
					
              
					switch (liq.getIdConcepto()){
//						case 1:
//							break;
						case 200: //Tramo Asignacion Familiar
							p.setTramoAsignacionFamiliar(liq.getConcepto());
							break;
						case 202: //Cargas Simples
							p.setnCargasSimples(liq.getValor());
							break;
						case 201: //Cargas Maternales
							p.setnCargasMaternales(liq.getValor());
							break;
						case 203: //Cargas Invalidas
							p.setnCargasInvalidas(liq.getValor());
							break;
						case 204: //Asignacion Familiar
							p.setAsignacionFamiliar(liq.getValor());
							break;
						case 210: //Cotizacion Obligatoria Afp
							p.setCotizacionObligatoriaAfp(liq.getValor());
							break;
						case 211: //Cotizacion Seguro Invalidez Sobrevivencia
							p.setCotizacionSeguroInvalidezSobrevivencia(liq.getValor());
							break;
						case 2: //Dias Trabajados
							p.setDiasTrabajados(liq.getValor());
							break;
						case 48: //Cuenta Ahorro Voluntario Afp
							p.setCuentaAhorroVoluntarioAfp(liq.getValor());
							break;
						case 213: //Codigo Institucion Apvi
							p.setCodigoInstitucionApvi(liq.getValor());
							break;
						case 214: //Codigo Institucion Apvi
							p.setNumeroContratoApvi(liq.getConcepto());
							break;
						case 218: //Tasa Cotizacion ExCaja Regimen
							p.setTasaCotizacionExCajaRegimen(liq.getConcepto());
							p.setCotizacionObligatoriaIPS(liq.getValor());
							break;
						case 224: //Cotizacion Fonasa
							p.setCotizacionFonasa(liq.getValor());
							break;
						case 14: //Descuento Cargas Familiares CCAF
							DescuentoCargaFA = DescuentoCargaFA + Integer.parseInt(liq.getValor());
							break;
						case 15: //Descuento Cargas Familiares CCAF
							DescuentoCargaFA = DescuentoCargaFA + Integer.parseInt(liq.getValor());
							break;
						case 16: //Descuento Cargas Familiares CCAF
							DescuentoCargaFA = DescuentoCargaFA + Integer.parseInt(liq.getValor());
							break;
						case 17: //Descuento Cargas Familiares CCAF
							DescuentoCargaFA = DescuentoCargaFA + Integer.parseInt(liq.getValor());
							break;
						case 230: //Mondeda PlanPactado Isapre
							p.setMondedaPlanPactadoIsapre(liq.getValor());
							break;
						case 232: //Cotizacion Obligatoria Isapre
							p.setCotizacionObligatoriaIsapre(liq.getValor());
							break;
						case 42: //Cotizacion Adicional Voluntaria
							cotizacion_voluntaria = cotizacion_voluntaria + Integer.parseInt(liq.getValor());
							
							break;
						case 32: //Cotizacion Adicional Voluntaria
							 String a = liq.getConcepto();
							 if(a.contains("TRIB2") ){
								 cotizacion_voluntaria = cotizacion_voluntaria + Integer.parseInt(liq.getValor());
							 }else{
							
							 }
							break;
						case 138: //Descuentos Leasing
							p.setDescuentosLeasing(liq.getValor());
							break;
			/**/		case 139: //Descuentos Seguro Vida CCAF
							p.setDescuentosSeguroVidaCCAF(liq.getValor());
							break;
		    /**/		case 140: //Otros Descuentos CCAF
							p.setOtrosDescuentosCCAF(liq.getValor());
							break;
						case 241: //Cotizacion CCAF No Afil Isapres
							p.setCotizacionCCAFNoAfilIsapres(liq.getValor());
							break;
		   /**/			case 143: //Otros Descuentos CCAF 1
							p.setOtrosDescuentosCCAF1(liq.getValor());
							break;
	      /**/			case 144: //Otros Descuentos CCAF 2
							p.setOtrosDescuentosCCAF2(liq.getValor());
							break;
						case 94: //Cotizacion Accidente Trabajo
							valor_accidente_trabajo = valor_accidente_trabajo + Integer.parseInt(liq.getValor());
							break;
						case 95: 
							valor_accidente_trabajo = valor_accidente_trabajo + Integer.parseInt(liq.getValor());
							break;
						case 96: 
							valor_accidente_trabajo = valor_accidente_trabajo + Integer.parseInt(liq.getValor());
							break;
						case 97: 
							valor_accidente_trabajo = valor_accidente_trabajo + Integer.parseInt(liq.getValor());
							break;
		  /**/				case 150: //Sucursal Pago Mutual
							p.setSucursalPagoMutual(liq.getValor());
							break;
						case 252: //Aporte Trabajador Seguro Cesantia
							p.setAporteTrabajadorSeguroCesantia(liq.getValor());
							break;
						case 253: //Aporte Empleador Seguro Cesantia
							p.setAporteEmpleadorSeguroCesantia(liq.getValor());
							break;
						case 256: 
							p.setTopeImL(liq.getValor());
							break;
						case 34: 
							p.setCotizacionApvi(liq.getValor());
							break;
							
						case 257:
							p.setImponibleL(liq.getValor());
							p.setRentaImponibleIPS(liq.getValor());
							p.setRentaImponibleSeguroCesantia(liq.getValor());
							break;
						case 0:
							if(liq.getConcepto().equals("Tope Seguro")){
							p.setTopeseguro(liq.getValor());	
							}
							
							break;
						default:
							
							break;
							
							
					} // end case
				} 
                previredLista3.add(p);
                //p.setDescuentoCargasFamiliaresISL(""+DescuentoCargaFA+"");
                p.setDescCargasFamiliaresCCAF(""+DescuentoCargaFA+"");
                p.setCotizacionAccidenteTrabajo(""+valor_accidente_trabajo+"");
                p.setCotizacionAdicionalVoluntaria(""+cotizacion_voluntaria);
                
                DescuentoCargaFA = 0;
                valor_accidente_trabajo = 0;
            }// end for previredLista2
            
            
            
			for (Previred datospermisolicencia : previredLista3) {
				
				previredLista.addAll(previredDb.getDatosPreviredpermisoyLicencia(periodo,empresa,datospermisolicencia));
               
			}
			
		

			Previred t0=previredLista.get(0);
			Previred t1;
			int codTrabajador0=previredLista.get(0).getCodTrabajador();
			int codTrabajadorX=0;
			boolean flag=true;
			//codigo trabajador
			previredLista.get(0).getCodTrabajador();//integer
			//tipo linea
			previredLista.get(0).getTipoLinea(); //String 
			//
			boolean existe02=false;
			boolean existe01=false;
			boolean existe00=false;
			ArrayList<Previred> u=previredLista;
			ArrayList<Previred> aux=new ArrayList<Previred>();
			
			while(flag==true)
			{			
				if(u.size()!=0){
					codTrabajadorX=u.get(0).getCodTrabajador();
					existe00=false;
					existe01=false;
					existe02=false;
					for(int a=0;a<u.size();a++){
						
						if(u.get(a).getCodTrabajador()==codTrabajadorX){
								if(u.get(a).getTipoLinea().equals("00")){
									existe00=true;
								}
								if(u.get(a).getTipoLinea().equals("01")){
									existe01=true;
								}
								// segundo contrato
								if(u.get(a).getTipoLinea().equals("02")){
									existe02=true;
								}
						}
						else{
							
						}
					}
//					System.out.println(existe00+" "+existe01+" "+existe02 );
//					System.out.println(u.size());
					for(int i=0;i<u.size();i++){
						
						//
						if(existe00){
							if(u.get(i).getTipoLinea().equals("00")){
								listaFinal.add(u.remove(i));
								break;
							}
						}
						else{
							if(existe01 && existe02){
								if(u.get(i).getTipoLinea().equals("02")){
									listaFinal.add(u.remove(i));
									break;
								}
							}
							else if(existe01 && !existe02){
								if(u.get(i).getTipoLinea().equals("01")){
									listaFinal.add(u.remove(i));
									break;
								}
							
							}
							else if(!existe01 && existe02){
								if(u.get(i).getTipoLinea().equals("02")){
									listaFinal.add(u.remove(i));
									break;
								}
							
							}
							
						}
					}
				}
				else
				{
					flag=false;					
				}
			}// end while
			
	
			// imprime en txt fila
            for(Previred p2 : listaFinal)
            {
                bw.write(this.contenidoPrevired(p2));
            }
           
            
            bw.close();			
			is = new ByteArrayInputStream(FileUtils.readFileToByteArray(previred));

			if (previred.exists()) {
				previred.delete();
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return is;
	}
	
	private String contenidoPrevired(Previred previred){
		String contenido = "";
		//Datos del trabajador
		
		contenido += String.format("%011d", Integer.parseInt(previred.getRutTrabajador()));
		contenido += String.format("%-1s", previred.getDvTrabajador());
		contenido += String.format("%-30s", previred.getApellidoPaterno().toUpperCase());
		contenido += String.format("%-30s", previred.getApellidoMaterno().toUpperCase());
		contenido += String.format("%-30s", previred.getNombres().toUpperCase());
		contenido += String.format("%-1s", previred.getSexo());
		
		if(previred.getNacionalidad() == null || previred.getNacionalidad() == "null"){
			contenido += String.format("%01d", Integer.parseInt("0"));
		}else{
			contenido += String.format("%01d", Integer.parseInt(previred.getNacionalidad()));
		}
		
		
		contenido += String.format("%02d", Integer.parseInt(previred.getTipoPago()));
		contenido += String.format("%06d", Integer.parseInt(previred.getPeriodoDesde()));
		contenido += String.format("%06d", Integer.parseInt(previred.getPeriodoHasta()));
/*11*/	contenido += String.format("%-3s", previred.getRegimenPrevisional());
		contenido += String.format("%01d", Integer.parseInt(previred.getTipoTrabajador()));
		contenido += String.format("%02d", Integer.parseInt(previred.getDiasTrabajados()));
		contenido += String.format("%-2s", previred.getTipoLinea());
		contenido += String.format("%02d", Integer.parseInt(previred.getCodigoMovimientoPersonal()));
		contenido += String.format("%-10s", previred.getFechaDesde());
		contenido += String.format("%-10s", previred.getFechaHasta());
		
		if(previred.getTramoAsignacionFamiliar() == ""){
			contenido += String.format("%-1s", "D");
		}else{
		contenido += String.format("%-1s", previred.getTramoAsignacionFamiliar());
		}
		contenido += String.format("%02d", Integer.parseInt(previred.getnCargasSimples()));
		contenido += String.format("%01d", Integer.parseInt(previred.getnCargasMaternales()));
		contenido += String.format("%01d", Integer.parseInt(previred.getnCargasInvalidas()));
		contenido += String.format("%06d", Integer.parseInt(previred.getAsignacionFamiliar().replace(".", "")));
		contenido += String.format("%06d", Integer.parseInt(previred.getAsignacionFamiliarRetroactiva()));
		
	   
		
	
		String montoreintegro = previred.getReintegroCargasFamiliares();
		if(montoreintegro == null || montoreintegro == "null"){
			montoreintegro = "0";
		}
		contenido += String.format("%06d", Integer.parseInt(montoreintegro));
		
		
		if(previred.getSolicitudTrabajadorJoven().equals("") || previred.getSolicitudTrabajadorJoven().equals("null") )
		{
			contenido += String.format("%-1s", "N");
		}else{
		contenido += String.format("%-1s", previred.getSolicitudTrabajadorJoven());
		}
		
		//Datos AFP
		
		
		    
		if("7".equals(previred.getIdafp())){
			
			if(previred.getValorsss() == null || previred.getValorsss() == "null"){
				contenido += String.format("%02d", Integer.parseInt(""));
			}else{
				contenido += String.format("%02d", Integer.parseInt(previred.getValorsss()));
			}
			
		}else{
			contenido += String.format("%02d", Integer.parseInt(previred.getCodigoAfp()));
		}
		
		
		
		int imponibAFP = 0;
		int topelAFP = 0;
		String RentaImponibleCCAF_AFP = "";
		
		if(previred.getTopeImL() == null || previred.getTopeImL() == "null"){
			topelAFP = 0;
		}else{
			topelAFP = Integer.parseInt(previred.getTopeImL());
		}
		
		if(previred.getImponibleL() == null || previred.getImponibleL() == "null"){
			imponibAFP = 0;
		}else{
			imponibAFP = Integer.parseInt(previred.getImponibleL());
		}
		
		
		
		
			if(imponibAFP > topelAFP){
				RentaImponibleCCAF_AFP = ""+topelAFP+"";
			}else{
				RentaImponibleCCAF_AFP = ""+imponibAFP+"";
			}
		
		  if(previred.getRegimenPrevisional().equals("INP"))
		  {
			 /*27*/ contenido += String.format("%08d", Integer.parseInt("0"));
			
		  }else{
			  if(previred.getTipoLinea().equals("00")){
					 /*27*/	contenido += String.format("%08d", Integer.parseInt(RentaImponibleCCAF_AFP.replace(".", "")));
				}
			  else if(previred.getTipoLinea().equals("02")){
				  /*27*/	contenido += String.format("%08d", Integer.parseInt(RentaImponibleCCAF_AFP.replace(".", "")));
			  } 
			  else{
					 /*27*/ contenido += String.format("%08d", Integer.parseInt("0"));
					
				}
		  }
		  if(previred.getRegimenPrevisional().equals("INP"))
		  {
			  /*28*/	contenido += String.format("%08d", Integer.parseInt("0"));

		  }else{
			  /*28*/	contenido += String.format("%08d", Integer.parseInt(previred.getCotizacionObligatoriaAfp().replace(".", ""))).substring(0, 8);

		  }
		
/*29*/	contenido += String.format("%08d", Integer.parseInt(previred.getCotizacionSeguroInvalidezSobrevivencia().replace(".", "")));
/*30*/	contenido += String.format("%08d", Integer.parseInt(previred.getCuentaAhorroVoluntarioAfp()));
		contenido += String.format("%08d", Integer.parseInt(previred.getRentaImponibleSustAfp()));
		contenido += String.format("%05d", Integer.parseInt(previred.getTasaPactadaSustit()));
		contenido += String.format("%09d", Integer.parseInt(previred.getAporteIndemnSustit()));
		contenido += String.format("%02d", Integer.parseInt(previred.getnPeriodosSustit()));
		contenido += String.format("%-10s", previred.getPreiodoDesdeSustit());
		contenido += String.format("%-10s", previred.getPeriosoHastaSustit());
		contenido += String.format("%-40s", previred.getPuestoTrabajoPesado());
		contenido += String.format("%05d", Integer.parseInt(previred.getPorcCotizacionTrabajoPesado()));
		contenido += String.format("%06d", Integer.parseInt(previred.getCotizacionTrabajoPesado()));
		
		//Datos ahorro previsional voluntario individual
		contenido += String.format("%03d", Integer.parseInt(previred.getCodigoInstitucionApvi()));
		contenido += String.format("%-20s", previred.getNumeroContratoApvi());
		contenido += String.format("%01d", Integer.parseInt(previred.getFormaPagoApvi()));
/*43*/	contenido += String.format("%08d",  Integer.parseInt(previred.getCotizacionApvi().replace(".", "")));
/*43*/ //	contenido += String.format("%08d", (int)Double.parseDouble(previred.getCotizacionApvi()));
		contenido += String.format("%08d", Integer.parseInt(previred.getCotizacionDepositosConvenidos()));
		
		//Datos ahorro previsional voluntario individual
		contenido += String.format("%03d", Integer.parseInt(previred.getCodigoIntitucionAutorizadaApvc()));
		contenido += String.format("%-20s", previred.getNumeroContratoApvc());
		contenido += String.format("%01d", Integer.parseInt(previred.getFormaPagoApvc()));
		contenido += String.format("%08d", Integer.parseInt(previred.getCotizacionTrabajadorApvc()));
		contenido += String.format("%08d", Integer.parseInt(previred.getCotizacionEmpleadorApvc()));
		
		//Datos afiliado voluntario
		contenido += String.format("%011d", Integer.parseInt(previred.getRutAfiliadoVoluntario()));
		contenido += String.format("%-1s", previred.getDvAfiliadoVoluntario());
		contenido += String.format("%-30s", previred.getApellidoPaternoAfiliado());
		contenido += String.format("%-30s", previred.getApellidoMaternoAfiliado());
		contenido += String.format("%-30s", previred.getNombresAfiliado());
		contenido += String.format("%02d", Integer.parseInt(previred.getCodigoMovimientoPersonalAfiliado()));
		contenido += String.format("%-10s", previred.getFechaDesdeAfililado());
		contenido += String.format("%-10s", previred.getFechaHastaAfiliado());
		contenido += String.format("%02d", Integer.parseInt(previred.getCodigoAfpAfiliado()));
		contenido += String.format("%08d", Integer.parseInt(previred.getMontoCapitalizacionVoluntaria()));
		contenido += String.format("%08d", Integer.parseInt(previred.getMontoAhorroVoluntarioAfiliado()));
		contenido += String.format("%02d", Integer.parseInt(previred.getNumPeriodosCotizacionAfiliado()));
		
		//Datos IPS - ISL - FONASA
		
		if("7".equals(previred.getIdafp())){
/*62*/  contenido += String.format("%04d", Integer.parseInt(previred.getCodigosssExcaja()));
		}else{
/*62*/	contenido += String.format("%04d", Integer.parseInt("0"));;
		}
		
		
		// Tasa Cotizacion ExCaja Regimen
		if(previred.getTasaCotizacionExCajaRegimen() != "0"){
			String stringEXtasa = previred.getTasaCotizacionExCajaRegimen();
	        String[] partsEXtasa = stringEXtasa.split("\\(");
	        String porcentajeEXtasa = partsEXtasa[1];
	        String[] partsEXtasa2 = porcentajeEXtasa.split("\\%");
	       
/*63*/ contenido += String.format("%5s", partsEXtasa2[0].replace(",", ".")).replace(' ','0');
		}else{
/*63*/  contenido += String.format("%05d", Integer.parseInt(previred.getTasaCotizacionExCajaRegimen()));
		}
		
		
	
		 	String RentaImponible_ips_ = "";
	      int imponible_ips = 0;
			
			if(previred.getTopeImL() == null || previred.getTopeImL() == "null"){
				topelAFP = 0;
			}else{
				topelAFP = Integer.parseInt(previred.getTopeImL());
			}
			
			if(previred.getImponibleL() == null || previred.getImponibleL() == "null"){
				imponible_ips = 0;
			}else{
				imponible_ips = Integer.parseInt(previred.getRentaImponibleIPS().replace(".", ""));
			}
			
			
			
			
				if(imponibAFP > topelAFP){
					RentaImponible_ips_ = ""+topelAFP+"";
				}else{
					RentaImponible_ips_ = ""+imponible_ips+"";
				}
			

  
	  if(previred.getIsapreFonasa() != 13){
/*64*/	contenido += String.format("%08d", Integer.parseInt("0")); 
	
		}else{
			
			if(previred.getTipoLinea().equals("00")){
				/*64*/	contenido += String.format("%08d", Integer.parseInt(RentaImponible_ips_.replace(".", "")));
			}
			 else if(previred.getTipoLinea().equals("02")){
					/*64*/	contenido += String.format("%08d", Integer.parseInt(RentaImponible_ips_.replace(".", "")));
			  } 
			else{
				/*84*/  contenido += String.format("%08d", Integer.parseInt("0"));
				
			}		
			


		}
  
		contenido += String.format("%08d", Integer.parseInt(previred.getCotizacionObligatoriaIPS()));
		contenido += String.format("%08d", Integer.parseInt(previred.getRentaImponibleDesahucion())); // DEFAULT 0
		contenido += String.format("%04d", Integer.parseInt(previred.getCodigoExCajaRegimenDesahucion()));
		contenido += String.format("%05d", Integer.parseInt(previred.getTasaCotDeshaExCajaPrevision()));
		contenido += String.format("%08d", Integer.parseInt(previred.getCotizacionDesahucion()));
		contenido += String.format("%08d", Integer.parseInt(previred.getCotizacionFonasa().replace(".", "")));
		contenido += String.format("%08d", Integer.parseInt(previred.getCotizacionAccidenteTrabajoISL()));
		contenido += String.format("%08d", Integer.parseInt(previred.getBonificacionLey15386()));
		contenido += String.format("%08d", Integer.parseInt(previred.getDescuentoCargasFamiliaresISL()));
		contenido += String.format("%08d", Integer.parseInt(previred.getBonoGobierno()));
		
		//Datos salud
		contenido += String.format("%02d", Integer.parseInt(previred.getCodigoInstitucionSalud()));
  /*76*/contenido += String.format("%-16s", previred.getNumeroFUN());
		
		int imponib = 0;
		int topel = 0;
		
		if(previred.getTopeImL() == null || previred.getTopeImL() == "null"){
			topel = 0;
		}else{
			topel = Integer.parseInt(previred.getTopeImL());
		}
		
		if(previred.getImponibleL() == null || previred.getImponibleL() == "null"){
			imponib = 0;
		}else{
			imponib = Integer.parseInt(previred.getImponibleL());
		}
		
		// RENTA IMPONIBLE ISAPRE
		String  RentaImponibleIsapre = "";
		
		if(previred.getIsapreFonasa() != 13){
			if(imponib > topel){
				RentaImponibleIsapre = ""+topel+"";
			}else{
				RentaImponibleIsapre = ""+imponib+"";
			}
		}else{
			RentaImponibleIsapre = "0";
		}
		
		contenido += String.format("%08d", Integer.parseInt(RentaImponibleIsapre));
		// algunos trabajadores en la tabla de trabajadores tiene cambiado su moneda en 0
/*78*/  contenido += String.format("%01d", Integer.parseInt(previred.getMondedaPlanPactadoIsapre()));
		
		//contenido += String.format("%08d", (int)Double.parseDouble((previred.getCotizacionPactada())));
		
		 Formatter fmt = new Formatter();

/*79*/ contenido += String.format("%8s", previred.getCotizacionPactada().replace(",", ".")).replace(' ','0');
		
//		Double.parseDouble(liq.getValor().replace(".", "").replace(",", "."))
/*80*/	contenido += String.format("%08d", Integer.parseInt(previred.getCotizacionObligatoriaIsapre().replace(".", ""))).substring(0, 8);
/*81*/	contenido += String.format("%08d", Integer.parseInt(previred.getCotizacionAdicionalVoluntaria()));
/*82*/	contenido += String.format("%08d", Integer.parseInt(previred.getMontoGarantiaGES()));
		
		//Datos caja de compensacion
/*83*/	contenido += String.format("%02d", Integer.parseInt(previred.getCodigoCCAF()));
		
		
		String RentaImponibleCCAF2 = "";
		
		
		
		
		
		
		if(previred.getIsapreFonasa() == 13){
			if(imponib > topel){
				RentaImponibleCCAF2 = ""+topel+"";
			}else{
				RentaImponibleCCAF2 = ""+imponib+"";
			}
		}else{
			RentaImponibleCCAF2 = "0";
		}

		
		if(previred.getTipoLinea().equals("00")){
			/*84*/	contenido += String.format("%08d", Integer.parseInt(RentaImponibleCCAF2));
		}
		else if(previred.getTipoLinea().equals("02")){
			/*84*/	contenido += String.format("%08d", Integer.parseInt(RentaImponibleCCAF2));
	  } 
		else{
			/*84*/  contenido += String.format("%08d", Integer.parseInt("0"));
			
		}		

		
		
		String creditoccaf = previred.getCreditosPersonalesCCAF();
		if(creditoccaf == null || montoreintegro == "null"){
			creditoccaf = "0";
		}
/*85*/  contenido += String.format("%08d", Integer.parseInt(creditoccaf));
/*86*/	contenido += String.format("%08d", Integer.parseInt(previred.getDescuentoDentalCCAF()));
/*87*/	contenido += String.format("%08d", Integer.parseInt(previred.getDescuentosLeasing()));
/*88*/	contenido += String.format("%08d", Integer.parseInt(previred.getDescuentosSeguroVidaCCAF()));
/*89*/	contenido += String.format("%08d", Integer.parseInt(previred.getOtrosDescuentosCCAF()));
		
		String valorNoafiliado = "";
		if(previred.getIsapreFonasa() != 13){
			valorNoafiliado = "0";
		}else{
			valorNoafiliado = previred.getCotizacionCCAFNoAfilIsapres().replace(".", "");
			
		}
/*90*/	contenido += String.format("%08d", Integer.parseInt(valorNoafiliado));
/*91*/	contenido += String.format("%08d", Integer.parseInt(previred.getDescCargasFamiliaresCCAF()));
/*92*/	contenido += String.format("%08d", Integer.parseInt(previred.getOtrosDescuentosCCAF1()));
/*93*/	contenido += String.format("%08d", Integer.parseInt(previred.getOtrosDescuentosCCAF2()));
/*94*/	contenido += String.format("%08d", Integer.parseInt(previred.getBonoGobiernoCCAF()));
/*95*/	contenido += String.format("%-20s", previred.getCodigoSucursalCCAF());
		
		//Datos mutualildad
		
/*96*/	contenido += String.format("%02d",  Integer.parseInt(previred.getCodigoMutualidad()));
		
		// RENTA IMPONIBLE MUTUALIDAD
		String RentaImponibleMutualidad = "";
		if(imponib > topel){
			RentaImponibleMutualidad = ""+topel+"";
		}else{
			RentaImponibleMutualidad = ""+imponib+"";
		}
		
		if(previred.getTipoLinea().equals("00")){
			/*97*/  contenido += String.format("%08d", Integer.parseInt(RentaImponibleMutualidad.replace(".", "")));
		}
		else if(previred.getTipoLinea().equals("02")){
			/*97*/  contenido += String.format("%08d", Integer.parseInt(RentaImponibleMutualidad.replace(".", "")));
	  } 
		else{
			/*97*/  contenido += String.format("%08d", Integer.parseInt("0"));
			
		}
		



/*98*/	contenido += String.format("%08d", Integer.parseInt(previred.getCotizacionAccidenteTrabajo().replace(".", "")));
/*99*/	contenido += String.format("%03d", Integer.parseInt(previred.getSucursalPagoMutual()));
		
		//Datos administradora seguro cesantia
		
		
		  String RentaImponible_seguro = "";
	      int imponible_seguro_ce = 0;
	      int tope_seg = 0;
			
			if(previred.getTopeseguro() == null || previred.getTopeseguro() == "null"){
				tope_seg = 0;
			}else{
				tope_seg = Integer.parseInt(previred.getTopeseguro());
			}
			
			if(previred.getRentaImponibleSeguroCesantia() == null || previred.getRentaImponibleSeguroCesantia() == "null"){
				imponible_seguro_ce = 0;
			}else{
				imponible_seguro_ce = Integer.parseInt(previred.getRentaImponibleSeguroCesantia().replace(".", ""));
			}
			
			
			
			
				if(imponible_seguro_ce > tope_seg){
					RentaImponible_seguro = ""+tope_seg+"";
				}else{
					RentaImponible_seguro = ""+imponible_seguro_ce+"";
				}
		
/*100*/	contenido += String.format("%08d", Integer.parseInt(RentaImponible_seguro.replace(".", ""))).substring(0, 8);
		
		
		contenido += String.format("%08d", Integer.parseInt(previred.getAporteTrabajadorSeguroCesantia().replace(".", ""))).substring(0, 8);
		contenido += String.format("%08d", Integer.parseInt(previred.getAporteEmpleadorSeguroCesantia().replace(".", ""))).substring(0, 8);
		
		//Datos afiliado voluntario
		
		if(previred.getCodigoMovimientoPersonalAfiliado() == "03" || 
		   previred.getCodigoMovimientoPersonalAfiliado() == "3"){
			contenido += String.format("%011d", Integer.parseInt(previred.getRutPagadoraSubsidio()));
		}else{
			contenido += String.format("%011d", Integer.parseInt("0"));
		}
		
		if(previred.getCodigoMovimientoPersonalAfiliado() == "03" ||
		   previred.getCodigoMovimientoPersonalAfiliado() == "3"){
			contenido += String.format("%-1s", previred.getDvPagadoraSubsidio());
		}else{
			contenido += String.format("%-1s", "0");
		}
		
		
		
		//Datos afiliado voluntario
		contenido += String.format("%-20s", previred.getCentroCostoSucAgencia());
		contenido += "\r\n";
		
		return contenido;
	}

}
