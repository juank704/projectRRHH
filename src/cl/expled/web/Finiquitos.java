package cl.expled.web;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import lib.classSW.CalculoFiniquito;
import lib.classSW.CargarTipodePago;
import lib.classSW.Finiquito;
import lib.classSW.LiquidacionPeriodo;
import lib.classSW.contrato;
import lib.classSW.sociedad;
import lib.classSW.trabajadores;
import lib.data.json.ConvierteNumToPalabras;
import lib.db.conSimpleAgro;
import lib.db.sw.FiniquitosBD;
import lib.db.sw.contratoDB;
import lib.db.sw.solicitudVacacionDB;
import lib.security.session;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class Finiquitos {
	
	private final static Logger LOG = LoggerFactory.getLogger(Finiquitos.class);
	
	//Instanciamos clase que se conecta a BD
	FiniquitosBD finiquitosBD = new FiniquitosBD();
	
	contratoDB cntt = new contratoDB();
	
	conSimpleAgro conSimpleAgro = new conSimpleAgro();
	
	@RequestMapping("/finiquitosModulo")
	public ModelAndView finiquitosModulo(Model model,HttpSession httpSession) {
		LOG.info("Iniciamos la configuracion del modulo.");
		session ses= new session(httpSession);	
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		LOG.info("Session correcta.");
		model.addAttribute("menuActual", "Modulo Finiquito");
		model.addAttribute("content", "finiquitosModulo");
		model.addAttribute("javaScriptPage","finiquitosModulo");
		LOG.info("Se termina de configurar modulo.");
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/finiquitosModulo")
	public ModelAndView finiquitosModulotoContent(Model model,HttpSession httpSession) {
		LOG.info("Se empieza a obtener datos para cargar pagina.");
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		
		try {
			List<sociedad> listaSociedad = new ArrayList<>();
			List<sociedad> listaSociedadAux = finiquitosBD.getSociedad();
			for(sociedad s : listaSociedadAux){
				if(s.getIdSociedad() != -1){
					listaSociedad.add(s);
				}
			}
			LOG.info("Se cargan " +listaSociedad.size()+ " empresas ");
			model.addAttribute("listaSociedead", listaSociedad);
			
			List<CargarTipodePago> listaTipoDivision = finiquitosBD.getTipoDivision();
			LOG.info("se cargan " +listaTipoDivision.size()+ " tipo de divisiones ");
			model.addAttribute("listaTipoDivision", listaTipoDivision);
			
			List<CargarTipodePago> listaTipoSubDivision = finiquitosBD.getTipoSubDivision();
			LOG.info("Se cargan " +listaTipoSubDivision.size()+ " tipo de sub divisiones ");
			model.addAttribute("listaTipoSubDivision", listaTipoSubDivision);
			
			List<CargarTipodePago> listaGrupo = finiquitosBD.getListaGrupo();
			LOG.info("Se cargan " +listaGrupo.size()+ " grupos ");
			model.addAttribute("listaGrupo", listaGrupo);
			
			List<CargarTipodePago> listaSubGrupo = finiquitosBD.getListaSubGrupo();
			LOG.info("Se cargan " +listaSubGrupo.size()+ " sub-grupos ");
			model.addAttribute("listaSubGrupo", listaSubGrupo);
			
		} catch (Exception e) {
			LOG.error("Ha ocurrido un error del tipo ",e);
			e.printStackTrace();
		}
		LOG.info("Se termina de obtener datos para cargar pagina.");
		return new ModelAndView("content/finiquitosModulo");
	}
	
	@RequestMapping("/datosTrabajadorFiniquito")
	public ModelAndView datosTrabajadorFiniquito(Model model,HttpSession httpSession) {
		LOG.info("Iniciamos la configuracion del modulo.");
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		LOG.info("Session correcta.");
		model.addAttribute("menuActual", "Modulo Finiquito");
		model.addAttribute("paginaActual", "Datos trabajador finiquito");
		model.addAttribute("content", "datosTrabajadorFiniquito");
		model.addAttribute("javaScriptPage","datosTrabajadorFiniquito");
		LOG.info("Finalizamos la configuracion del modulo.");
		return new ModelAndView("layout/_main");
	}
	
//	@RequestMapping("/content/datosTrabajadorFiniquito")
//	public ModelAndView datosTrabajadorFiniquitoContent(Model model, HttpServletRequest request,HttpSession httpSession) {
//		LOG.info("Se empieza a obtener datos para cargar pagina.");
//		session ses= new session(httpSession);
//		if (ses.isValid())
//		{
//			return new ModelAndView("redirect:/webApp/login");
//		}
//		
//		try {
//			if(request.getParameter("id") != null && !"".equals(request.getParameter("id"))){
//				String idTrabajador = request.getParameter("id").toString();
//				LOG.info("Id del trabajador es "+ idTrabajador);
//				trabajadores trabajadores = finiquitosBD.getTrabajadorById(idTrabajador);
//				String fechaString = "";
//				if(trabajadores.getFechaIngresoCompania()!= null && !"".equalsIgnoreCase(trabajadores.getFechaIngresoCompania())){
//					Date fechaDate = new SimpleDateFormat("yyyy-MM-dd").parse(trabajadores.getFechaIngresoCompania());
//					fechaString = new SimpleDateFormat("dd-MM-yyyy").format(fechaDate);
//				}
//				trabajadores.setFechaIngresoCompania(fechaString);
//				String idSociedad = finiquitosBD.getIdSociedadXCodTrabajador(trabajadores.getCodigo());
//				
//				model.addAttribute("nombreEmpresa", finiquitosBD.getSociedadById(idSociedad).getDenominacionSociedad());
//				model.addAttribute("trabajador", trabajadores);
//				
//				Finiquito finiquito = finiquitosBD.getFiniquitoByCodTrabajador(trabajadores.getCodigo());
//				if(finiquito != null){
//					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
//					if(finiquito.getFechaTerminoContrato() != null && !"".equalsIgnoreCase(finiquito.getFechaTerminoContrato())){
//						Date fechaTerminoContrato = sdf.parse(finiquito.getFechaTerminoContrato());
//						finiquito.setFechaTerminoContrato(new SimpleDateFormat("dd-MM-yyyy").format(fechaTerminoContrato));
//					}
//					if(finiquito.getFechaPago() != null && !"".equalsIgnoreCase(finiquito.getFechaPago())){
//						Date fechaPago = sdf.parse(finiquito.getFechaPago());
//						finiquito.setFechaPago(new SimpleDateFormat("dd-MM-yyyy").format(fechaPago));
//					}
//				}
//				model.addAttribute("finiquito", finiquito);
//				
//				contrato contrato = cntt.getUltimoContratoActivoByIdTrabajador(trabajadores.getCodigo());
//				Integer servicios = this.calcularAniosServicio(contrato);
//				float vacacionesProp = this.calcularVacionesProporcionales(contrato);
//				Integer topePagoFiniquito = this.calcularTope();
//				model.addAttribute("topePagoFiniquito", topePagoFiniquito);
//				LOG.info("codigo trabajador >> {}",trabajadores.getCodigo());
//				LOG.info("Id de contrato >> {}",contrato.getId());
//				Integer codTrabajador = Integer.parseInt(trabajadores.getCodigo());
//				Map<String, CalculoFiniquito> calculosMap = this.obtenerCalculoFiniquito(codTrabajador, contrato);
//				List<CalculoFiniquito> calculos = new ArrayList<>();
//				for(String key : calculosMap.keySet()){
//					calculos.add(calculosMap.get(key));
//				}
//				LOG.info("Calculos >> {}",calculos.size());
//				model.addAttribute("calculos", calculos);
//				Integer totalItems = 0;
//				this.calcularPromedioItem(calculos);
//				for(CalculoFiniquito c : calculos){
//					totalItems += c.getValorPromedio();
//				}
//				//SUELDO
////				CalculoFiniquito calculoSueldo = calculosMap.get("SUELDO BASE CONTRATO");
//				CalculoFiniquito calculoSueldo = calculosMap.get("SUELDO");
//				model.addAttribute("sueldoBase", calculoSueldo.getValorMes3());
//				model.addAttribute("totalItems", totalItems);
//				model.addAttribute("anoServicios", servicios);
//				model.addAttribute("feriadosProp", vacacionesProp);			
//				
//			}
//		} catch (Exception e) {
//			LOG.error("Ha ocurrido un error del tipo ",e);
//			e.printStackTrace();
//		}
//		LOG.info("Se termmina de obtener datos del modulo ");
//		return new ModelAndView("content/datosTrabajadorFiniquito");
//	}
	
//	private Integer calcularAniosServicio(contrato contrato){
//		LOG.info("Calculo cantidad años de servicio");
//		Calendar inicio = Calendar.getInstance();
//        Calendar fin = Calendar.getInstance();
//        int contA = 0;
//        try {
//			inicio.setTime(new SimpleDateFormat("yyyy-MM-dd").parse(contrato.getFecha_inicio_actividad()));
//			if(contrato.getFecha_termino_actividad()!=null && !"".equalsIgnoreCase(contrato.getFecha_termino_actividad())){
//				fin.setTime(new SimpleDateFormat("yyyy-MM-dd").parse(contrato.getFecha_termino_actividad()));
//			}else{
//				fin.setTime(new SimpleDateFormat("yyyy-MM-dd").parse(new SimpleDateFormat("yyyy-MM-dd").format(new Date())));
//			}
//			
//	        int difA = fin.get(Calendar.YEAR) - inicio.get(Calendar.YEAR);
//	        int difM = difA * 12 + fin.get(Calendar.MONTH) - inicio.get(Calendar.MONTH);
//	        int dias=(int) ((fin.getTimeInMillis()-inicio.getTimeInMillis())/86400000);
//	        float diasDivision = (float)dias / 365;
//	        float diasOriginal = diasDivision * 12;
//	        diasOriginal = diasOriginal - difM;
//	        int primerA = 12, demasA = 6;
//	        LOG.info("Cantidad de meses >> {} - dias >> {} - dias Original >> {}", difM, dias, diasOriginal);
//	        while(difM >= 0){
//	        	int resta = difM - primerA;
//        		int resta2 = difM - demasA;
//        		if(resta >= 0){
//        			difM -= primerA;
//    	        	contA++;
//        		}else if(resta2 >= 0 && (inicio.get(Calendar.YEAR) < fin.get(Calendar.YEAR))){
//        			difM -= demasA;
//    	        	contA++;
//        		}else{
//        			break;
//        		}
//	        }
//    		
//    		if(difM == 0 && diasOriginal <= 0){
//    			contA--;
//    		}
//		} catch (ParseException e) {
//			LOG.error("Ha ocurrido un error del tipo ",e);
//			e.printStackTrace();
//		}
//        LOG.info("Calculo cantidad años de servicio >> {}", contA);
//        return contA;
//	}
	
//	private Map<String, CalculoFiniquito> obtenerCalculoFiniquito(Integer codTrabajador, contrato contrato){
//		LiquidacionPeriodo liquidacion;
//		CalculoFiniquito calculo;
//		Map<String, CalculoFiniquito> map = new HashMap<>();
//		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"); 
//		try{
//			for(int i = 0; i < 3; i++){
//				Calendar fecha = Calendar.getInstance();
//				//VALIDAR FECHAS DE CONTRATO
//				Calendar fechaAuxInicio = Calendar.getInstance();
//				Calendar fechaAuxFin = Calendar.getInstance();
//				fechaAuxInicio.setTime(sdf.parse(contrato.getFecha_inicio_actividad()));
//				fechaAuxFin.add(Calendar.MONTH, -i);
//				if(fechaAuxInicio.before(fechaAuxFin)){
//					liquidacion = new LiquidacionPeriodo();
//					int mesPeriodo = (fecha.get(Calendar.MONTH)+1) - i;
//					String anoPeriodo = ""+ fecha.get(Calendar.YEAR);
//					String periodo = "";
//					if(mesPeriodo < 10){
//						periodo = anoPeriodo + "0" + mesPeriodo;
//					}else{
//						periodo = anoPeriodo + mesPeriodo;
//					}		
//					liquidacion.setCodTrabajador(codTrabajador);
//					liquidacion.setIdContrato(contrato.getId());
//					liquidacion.setPeriodo(Integer.parseInt(periodo));
//					List<LiquidacionPeriodo> lista = finiquitosBD.obtenerLiquidacionPeriodo(liquidacion);
//					for(LiquidacionPeriodo l : lista){
//						if(l.getIdConcepto() > 0 && l.getConcepto() != null){
//							calculo = new CalculoFiniquito();
//							if(map.containsKey(l.getConcepto().trim())){
//								calculo = map.get(l.getConcepto().trim());
//							}else{
//								calculo.setItem(l.getConcepto().trim());
//							}
//							this.calculoValoresMensuales(calculo, l, i);
//							map.put(l.getConcepto().trim(), calculo);
//							LOG.info("{} ",calculo.toString());
//						}
//					}
//				}else{
//					break;
//				}
//			}	
//		}catch(Exception e){
//			LOG.error("Ha ocurrido un error del tipo ",e);
//			e.printStackTrace();
//		}
//		return map;
//	}
	
//	private void calculoValoresMensuales(CalculoFiniquito calculo, LiquidacionPeriodo liquidacion, int i){
//		try{
//			switch (i){
//				case 0:
//					if(liquidacion.getValorDouble() != null){
//						calculo.setValorMes3(liquidacion.getValorDouble().intValue());
//					}
//					break;
//				case 1:
//					if(liquidacion.getValorDouble() != null){
//						calculo.setValorMes2(liquidacion.getValorDouble().intValue());
//					}
//					break;
//				case 2:
//					if(liquidacion.getValorDouble() != null){
//						calculo.setValorMes1(liquidacion.getValorDouble().intValue());
//					}
//					break;
//				default:
//					break;							
//			}
//			
//		}catch(Exception e){
//			LOG.error("Ha ocurrido un error del tipo ",e);
//			e.printStackTrace();
//		}
//	}
	
//	private void calcularPromedioItem (List<CalculoFiniquito> calculos){
//		for(CalculoFiniquito c : calculos){
//			int divisor = 0;
//			if(c.getValorMes1() != 0){
//				divisor++;
//			}
//			if(c.getValorMes2() != 0){
//				divisor++;
//			}
//			if(c.getValorMes3() != 0){
//				divisor++;
//			}
//			Integer promedio = (c.getValorMes1() + c.getValorMes2() + c.getValorMes3()) / divisor;
//			c.setValorPromedio(promedio);
//		}
//	}
	
//	private float calcularVacionesProporcionales(contrato contrato){
//		LOG.info("Calculo cantidad vacaciones proporcionales");
//		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
//		Calendar inicio = Calendar.getInstance();
//        Calendar fin = Calendar.getInstance();
//        float feriadosProp = 0;
//        try {
//        	LOG.info("Fecha inicio actividades >> {}", contrato.getFecha_inicio_actividad());
//			inicio.setTime(sdf.parse(contrato.getFecha_inicio_actividad()));
//			if(contrato.getFecha_termino_actividad()!=null && !"".equalsIgnoreCase(contrato.getFecha_termino_actividad())){
//				fin.setTime(sdf.parse(contrato.getFecha_termino_actividad()));
//			}
//			
//	        int difA = fin.get(Calendar.YEAR) - inicio.get(Calendar.YEAR);
//	        int difM = (difA * 12 + fin.get(Calendar.MONTH) - inicio.get(Calendar.MONTH)) + 1;
//	        LOG.info("Cantidad meses trabajados >> {}", difM);
//	        float diasDivision = (float)(difM * (1.25));
//	        LOG.info("Cantidad vacaciones proporcionales >> {}", diasDivision);
//	        Integer vacionesPedidas = solicitudVacacionDB.getDiasSolicitudVacacionByIdContrato(contrato.getId());
//	        LOG.info("Cantidad vacaciones solicitadas >> {}", vacionesPedidas);
//	        feriadosProp = diasDivision - vacionesPedidas;
//	        
//	        if(feriadosProp < 0){
//	        	feriadosProp = 0;
//	        }
//	        
//	        int enteroFeriados = (int) feriadosProp; 
//	        List<Date> listaFeriados = new ArrayList<Date>();
//	        int diasTotales = this.diasTotalesVacProporciones(fin, enteroFeriados, listaFeriados);
//	        feriadosProp = (diasTotales - enteroFeriados) + feriadosProp;
//	        LOG.info("cantidad de dias totales {} << desde >> {}", feriadosProp, new SimpleDateFormat().format(fin.getTime()));
//	        LOG.info("Total feriados prporcionales >> {}", feriadosProp);
//		} catch (ParseException e) {
//			LOG.error("Ha ocurrido un error del tipo ",e);
//			e.printStackTrace();
//		}
//        LOG.info("Calculo cantidad vacaciones proporcionales >> {}", feriadosProp);
//        return feriadosProp;
//	}
	
//	private Integer calcularTope(){
//		LOG.info("Calculo tope pago finiquito");
//		Calendar fecha = Calendar.getInstance();
//		Integer tope = 0;
//        try {
//        	LiquidacionPeriodo liquidacion = new LiquidacionPeriodo();
//			int mesPeriodo = fecha.get(Calendar.MONTH) + 1;
//			String anoPeriodo = ""+ fecha.get(Calendar.YEAR);
//			String periodo = "";
//			if(mesPeriodo < 10){
//				periodo = anoPeriodo + "0" + mesPeriodo;
//			}else{
//				periodo = anoPeriodo + mesPeriodo;
//			}
//			liquidacion.setPeriodo(Integer.parseInt(periodo));
//			tope = finiquitosBD.obtenerTopeCalculoFiniquito(liquidacion);
//		} catch (Exception e) {
//			LOG.error("Ha ocurrido un error del tipo ",e);
//			e.printStackTrace();
//			tope = 0;
//		}
//        LOG.info("Calculo tope pago finiquito >> {}", tope);
//        return tope;
//	}
	
//	private int diasTotalesVacProporciones(Calendar fechaInicial, int diasVacaciones, List<Date> listaFechasNoLaborables) {
//		int diffDays = 0;
//		// mientras numero de dias de vaciones sea mayor a cero
//		while (diasVacaciones > 0) {
//			if (fechaInicial.get(Calendar.DAY_OF_WEEK) != Calendar.SUNDAY
//					&& fechaInicial.get(Calendar.DAY_OF_WEEK) != Calendar.SATURDAY) {
//				// se aumentan los dias de diferencia entre min y max
//				diffDays++;
//				diasVacaciones--;
//			} else {
//				diffDays++;
//			}
//			fechaInicial.add(Calendar.DATE, 1);
//		}
//		
//		Calendar fechaFeriado = Calendar.getInstance();
//		if (!listaFechasNoLaborables.isEmpty()) {
//            for (Date date : listaFechasNoLaborables) {
//            	fechaFeriado.setTime(date);
//                if (fechaFeriado.get(Calendar.DAY_OF_WEEK) != Calendar.SUNDAY && fechaFeriado.get(Calendar.DAY_OF_WEEK) != Calendar.SATURDAY) {
//                    //se aumentan los dias de diferencia entre min y max
//                	diffDays++;
//                	fechaInicial.add(Calendar.DATE, 1);
//                }
//            }
//        }
//		return diffDays;
//	}
	
//	private Map<String, CalculoFiniquito> obtenerCalculoFiniquito(Integer codTrabajador, contrato contrato){
//		LiquidacionPeriodo liquidacion;
//		CalculoFiniquito calculo;
//		Map<String, CalculoFiniquito> map = new HashMap<>();
//		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"); 
//		try{
//			for(int i = 0; i < 3; i++){
//				Calendar fecha = Calendar.getInstance();
//				//VALIDAR FECHAS DE CONTRATO
//				Calendar fechaAuxInicio = Calendar.getInstance();
//				Calendar fechaAuxFin = Calendar.getInstance();
//				fechaAuxInicio.setTime(sdf.parse(contrato.getFecha_inicio_actividad()));
//				fechaAuxFin.add(Calendar.MONTH, -i);
//				if(fechaAuxInicio.before(fechaAuxFin)){
//					liquidacion = new LiquidacionPeriodo();
//					int mesPeriodo = (fecha.get(Calendar.MONTH)+1) - i;
//					String anoPeriodo = ""+ fecha.get(Calendar.YEAR);
//					String periodo = "";
//					if(mesPeriodo < 10){
//						periodo = anoPeriodo + "0" + mesPeriodo;
//					}else{
//						periodo = anoPeriodo + mesPeriodo;
//					}		
//					liquidacion.setCodTrabajador(codTrabajador);
//					liquidacion.setIdContrato(contrato.getId());
//					liquidacion.setPeriodo(Integer.parseInt(periodo));
//					List<LiquidacionPeriodo> lista = finiquitosBD.obtenerLiquidacionPeriodo(liquidacion);
//					for(LiquidacionPeriodo l : lista){
//						calculo = new CalculoFiniquito();
//						switch (l.getIdConcepto()){
//							case 1:
//								if(map.containsKey("SUELDO")){
//									calculo = map.get("SUELDO");
//								}else{
//									calculo.setItem("SUELDO");
//								}
//								this.calculoValoresMensuales(calculo, l, i);
//								map.put("SUELDO", calculo);
//								LOG.info("{} ",calculo.toString());
//								break;
//							case 9:
//								if(map.containsKey("GRATIFICACION")){
//									calculo = map.get("GRATIFICACION");
//								}else{
//									calculo.setItem("GRATIFICACION");
//								}
//								this.calculoValoresMensuales(calculo, l, i);
//								map.put("GRATIFICACION", calculo);
//								LOG.info("{} ",calculo.toString());
//								break;
//							case 10:
//								if(map.containsKey("ASIGNACIONES_IMPONIBLES")){
//									calculo = map.get("ASIGNACIONES_IMPONIBLES");
//								}else{
//									calculo.setItem("ASIGNACIONES IMPONIBLES");
//								}
//								this.calculoValoresMensuales(calculo, l, i);
//								map.put("ASIGNACIONES_IMPONIBLES", calculo);
//								LOG.info("{} ",calculo.toString());
//								break;
//							case 20:
//								if(map.containsKey("ASIGNACIONES_NO_IMP")){
//									calculo = map.get("ASIGNACIONES_NO_IMP");
//								}else{
//									calculo.setItem("ASIGNACIONES NO IMPONIBLES");
//								}
//								this.calculoValoresMensuales(calculo, l, i);
//								map.put("ASIGNACIONES_NO_IMP", calculo);
//								LOG.info("{} ",calculo.toString());
//								break;
//							default:
//								break;							
//						}
//					}
//				}else{
//					break;
//				}
//			}	
//		}catch(Exception e){
//			LOG.error("Ha ocurrido un error del tipo ",e);
//			e.printStackTrace();
//		}
//		return map;
//	}
}
