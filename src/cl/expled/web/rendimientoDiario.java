 package cl.expled.web;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import lib.ClassSASW.parametros;
import lib.SADB.FAENA;
import lib.SADB.cuadrilla;
import lib.classSA.CAMPO;
import lib.classSA.CUADRILLA;
import lib.classSA.RENDIMIENTO_GENERAL;
import lib.classSA.SESIONVAR;
import lib.classSA.tipo_pago;
import lib.db.SASW.TrabajadoresAgroDB;
import lib.security.session;
import lib.sesionSA.SESION;

/*
 * author: Crunchify.com
 * 
 */

@Controller
public class rendimientoDiario {
	
	
	
	@RequestMapping("/labor")
	public ModelAndView labor(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "labor");
		model.addAttribute("menuActual", "Rendimiento");
		model.addAttribute("paginaActual", "Labor");
		model.addAttribute("javaScriptPage","laborJS");
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/labor")
	public ModelAndView laborContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/labor");
	}
	@RequestMapping("/rendimiento")
	public ModelAndView rendimiento(Model model,HttpSession httpSession, HttpServletRequest request) throws Exception {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		int codigo_rg = Integer.parseInt(request.getParameter("CODIGO_RG"));
		CUADRILLA r = new CUADRILLA();
		r = cuadrilla.GET_REND_MASIVO(codigo_rg);
		ArrayList<RENDIMIENTO_GENERAL> rg = r.getRendimiento_general();
		SESION mc = new SESION(httpSession);
		SESIONVAR s = mc.getView();
		String zona = "";
		String campo = "";
		String codCampo = "";
		String fecha = "";
		for(RENDIMIENTO_GENERAL rgl: rg){
			campo = rgl.getCampo();
			fecha = rgl.getFecha();
		}
		for(CAMPO c: s.getCampo()){
			if(c.getDescripcion().equals(campo)){
				codCampo = c.getCampo();
				zona = c.getZona();
			}
		}
		model.addAttribute("content", "rendimiento");
		model.addAttribute("menuActual", "Rendimiento");
		model.addAttribute("paginaActual", "Rendimiento Diario");
		model.addAttribute("javaScriptPage","rendimientoJS");
		model.addAttribute("idRandom", Math.random());
		model.addAttribute("trabajadores", TrabajadoresAgroDB.getTrabajadoresAgro2("*", codCampo, "*", "*", fecha, "*", s.getIdUser()));
		model.addAttribute("faena", FAENA.GET_FAENA_ZONA(zona));
		model.addAttribute("labor", FAENA.GET_LABOR_ZONA(zona));
		model.addAttribute("campo", codCampo);
		model.addAttribute("rg", r);
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/rendimiento")
	public ModelAndView rendimientoContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/rendimiento");
	}
	@RequestMapping("/rendimiento_contratista")
	public ModelAndView rendimiento_contratista(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "rendimiento_contratista");
		model.addAttribute("menuActual", "Rendimiento");
		model.addAttribute("paginaActual", "Rendimiento Diario");
		model.addAttribute("javaScriptPage","rendimiento_contratista");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/rendimiento_contratista")
	public ModelAndView rendimiento_contratistaContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/rendimiento_contratista");
	}
	@RequestMapping("/rendimiento_individual")
	public ModelAndView rendimiento_individual(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "rendimiento_individual");
		model.addAttribute("menuActual", "Rendimiento");
		model.addAttribute("paginaActual", "Rendimiento Individual");
		model.addAttribute("javaScriptPage","rendimiento_individual");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/rendimiento_individual")
	public ModelAndView rendimiento_individualContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/rendimiento_individual");
	}

	@RequestMapping("/individual_contratista")
	public ModelAndView individual_contratista(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "individual_contratista");
		model.addAttribute("menuActual", "Rendimiento");
		model.addAttribute("paginaActual", "Rendimiento Individual Contratista");
		model.addAttribute("javaScriptPage","individual_contratista");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/individual_contratista")
	public ModelAndView individual_contratistaContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/individual_contratista");
	}
	@RequestMapping("/cuadraturaHoras")
	public ModelAndView cuadraturaHoras(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "cuadraturaHoras");
		model.addAttribute("menuActual", "Rendimiento");
		model.addAttribute("paginaActual", "Cuadratura de Horas");
		model.addAttribute("javaScriptPage","cuadraturaHoras");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/cuadraturaHoras")
	public ModelAndView cuadraturaHorasContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/cuadraturaHoras");
	}
	@RequestMapping("/validarRendimiento")
	public ModelAndView validarRendimiento(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "validarRendimiento");
		model.addAttribute("menuActual", "Rendimiento");
		model.addAttribute("paginaActual", "Validar Rendimiento");
		model.addAttribute("javaScriptPage","validarRendimiento");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/validarRendimiento")
	public ModelAndView validarRendimientoContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/validarRendimiento");
	}
	@RequestMapping("/liquidacionContratista")
	public ModelAndView liquidacionContratista(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "liquidacionContratista");
		model.addAttribute("menuActual", "Rendimiento");
		model.addAttribute("paginaActual", "Liquidacion Contratista");
		model.addAttribute("javaScriptPage","liquidacionContratista");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/liquidacionContratista")
	public ModelAndView liquidacionContratistaContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/liquidacionContratista");
	}
	@RequestMapping("/generarLiquidacion")
	public ModelAndView generarLiquidacion(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "generarLiquidacion");
		model.addAttribute("menuActual", "Rendimiento");
		model.addAttribute("paginaActual", "Generar Liquidación Contratista");
		model.addAttribute("javaScriptPage","generarLiquidacion");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/generarLiquidacion")
	public ModelAndView generarLiquidacionContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/generarLiquidacion");
	}
	@RequestMapping("/listado_rendimiento")
	public ModelAndView listado_rendimiento(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "listado_rendimiento");
		model.addAttribute("menuActual", "Rendimiento");
		model.addAttribute("paginaActual", "Listado del Rendimiento");
		model.addAttribute("javaScriptPage","listado_rendimiento");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/listado_rendimiento")
	public ModelAndView listado_rendimientoContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/listado_rendimiento");
	}
	
	@RequestMapping("/AsignarCuadrilla")
	public ModelAndView AsignarCuadrilla(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "AsignarCuadrilla");
		model.addAttribute("menuActual", "Rendimiento");
		model.addAttribute("paginaActual", "Rendimiento Masivo");
		model.addAttribute("javaScriptPage","AsignarCuadrillaJS");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/AsignarCuadrilla")	
	public ModelAndView AsignarCuadrillaContentContratista(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/AsignarCuadrilla");
	}
	@RequestMapping("/content/AsignarCuadrillaContratista")	
	public ModelAndView AsignarCuadrillaContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/AsignarCuadrillaContratista");
	}
	@RequestMapping("/AsignarCuadrillaContratista")
	public ModelAndView AsignarCuadrillaContratista(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "AsignarCuadrillaContratista");
		model.addAttribute("menuActual", "Rendimiento");
		model.addAttribute("paginaActual", "Rendimiento Diario Contratista");
		model.addAttribute("javaScriptPage","AsignarCuadrillaContratista");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	
	@RequestMapping("/DetalleRendimiento")
	public ModelAndView DetalleRendimiento(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "DetalleRendimiento");
		model.addAttribute("menuActual", "Rendimiento");
		model.addAttribute("paginaActual", "Validar Rendimiento - Detalle Rendimiento");
		model.addAttribute("javaScriptPage","DetalleRendimiento");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/DetalleRendimiento")
	public ModelAndView DetalleRendimientoContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/DetalleRendimiento");
	}
		
	@RequestMapping("/configuracion_subsidio")
	public ModelAndView configuracion_subsidio(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "configuracion_subsidio");
		model.addAttribute("menuActual", "Mantenedor");
		model.addAttribute("paginaActual", "configuracion_subsidio");
		model.addAttribute("javaScriptPage","configuracion_subsidio");
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/configuracion_subsidio") 
	public ModelAndView configuracion_subsidioContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/configuracion_subsidio"); 
	}
		
@RequestMapping("/sector")
public ModelAndView sector(Model model,HttpSession httpSession) {
	session ses= new session(httpSession);
	if (ses.isValid())
	{
		return new ModelAndView("redirect:/webApp/login");
	}
	model.addAttribute("content", "sector");
	model.addAttribute("menuActual", "Mantenedor");
	model.addAttribute("paginaActual", "sector");
	model.addAttribute("javaScriptPage","sector");
	model.addAttribute("idRandom", Math.random());
	return new ModelAndView("layout/_main");
}

@RequestMapping("/content/sector") 
public ModelAndView sectorContent(Model model,HttpSession httpSession) {
	session ses= new session(httpSession);
	if (ses.isValid())
	{
		return new ModelAndView("redirect:/webApp/login");
	}
	return new ModelAndView("content/sector"); 
}

@RequestMapping("/ingreso_riego")
public ModelAndView ingreso_riego(Model model,HttpSession httpSession) {
	session ses= new session(httpSession);
	if (ses.isValid())
	{
		return new ModelAndView("redirect:/webApp/login");
	}
	model.addAttribute("content", "ingreso_riego");
	model.addAttribute("menuActual", "Mantención");
	model.addAttribute("paginaActual", "Ingreso del Riego");
	model.addAttribute("javaScriptPage","ingreso_riego");
	model.addAttribute("idRandom", Math.random());
	return new ModelAndView("layout/_main");
}

@RequestMapping("/content/ingreso_riego") 
public ModelAndView ingreso_riegoContent(Model model,HttpSession httpSession) {
	session ses= new session(httpSession);
	if (ses.isValid())
	{
		return new ModelAndView("redirect:/webApp/login");
	}
	return new ModelAndView("content/ingreso_riego"); 
}

@RequestMapping("/consumo_combustible")
public ModelAndView consumo_combustible(Model model,HttpSession httpSession) {
	session ses= new session(httpSession);
	if (ses.isValid())
	{
		return new ModelAndView("redirect:/webApp/login");
	}
	model.addAttribute("content", "consumo_combustible");
	model.addAttribute("menuActual", "Mantención");
	model.addAttribute("paginaActual", "Ingreso Consumo de Combustible");
	model.addAttribute("javaScriptPage","consumo_combustible");
	model.addAttribute("idRandom", Math.random());
	return new ModelAndView("layout/_main");
}

@RequestMapping("/content/consumo_combustible") 
public ModelAndView consumo_combustibleContent(Model model,HttpSession httpSession) {
	session ses= new session(httpSession);
	if (ses.isValid())
	{
		return new ModelAndView("redirect:/webApp/login");
	}
	return new ModelAndView("content/consumo_combustible"); 
}
@RequestMapping("/validarRendimientoContratista")
public ModelAndView validarRendimientoContratista(Model model,HttpSession httpSession) {
	session ses= new session(httpSession);
	if (ses.isValid())
	{
		return new ModelAndView("redirect:/webApp/login");
	}
	model.addAttribute("content", "validarRendimientoContratista");
	model.addAttribute("menuActual", "Contratistas");
	model.addAttribute("paginaActual", "Validar Rendimiento Contratista");
	model.addAttribute("javaScriptPage","validarRendimientoContratista");
	return new ModelAndView("layout/_main");
}

@RequestMapping("/content/validarRendimientoContratista") 
public ModelAndView validarRendimientoContratistaContent(Model model,HttpSession httpSession) {
	session ses= new session(httpSession);
	if (ses.isValid())
	{
		return new ModelAndView("redirect:/webApp/login");
	}
	return new ModelAndView("content/validarRendimientoContratista"); 
}
	@RequestMapping("/detalleOrdenPago")
	public ModelAndView detalleOrdenPago(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "detalleOrdenPago");
		model.addAttribute("menuActual", "Contratistas");
		model.addAttribute("paginaActual", "Detalle Orden Pago");
		model.addAttribute("javaScriptPage","detalleOrdenPago");
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/detalleOrdenPago") 
	public ModelAndView detalleOrdenPagoContratistaContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/detalleOrdenPago"); 
	}
	@RequestMapping("/rendimientos_validados")
	public ModelAndView rendimientos_validados(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "rendimientos_validados");
		model.addAttribute("menuActual", "Rendimiento ");
		model.addAttribute("paginaActual", "Rendimientos Validados");
		model.addAttribute("javaScriptPage","rendimientos_validados");
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/rendimientos_validados") 
	public ModelAndView rendimientos_validadosContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/rendimientos_validados"); 
	}
	@RequestMapping("/detalleRendimientoValidado")
	public ModelAndView detalleRendimientoValidado(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "detalleRendimientoValidado");
		model.addAttribute("menuActual", "Rendimiento ");
		model.addAttribute("paginaActual", "Detalle Rendimiento Validado");
		model.addAttribute("javaScriptPage","detalleRendimientoValidado");
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/detalleRendimientoValidado") 
	public ModelAndView detalleRendimientoValidadoContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/detalleRendimientoValidado"); 
	}
	@RequestMapping("/rendimientos_validadosContratista")
	public ModelAndView rendimientos_validadosContratista(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "rendimientos_validadosContratista");
		model.addAttribute("menuActual", "Contratista ");
		model.addAttribute("paginaActual", "Rendimientos Validados Contratista");
		model.addAttribute("javaScriptPage","rendimientos_validadosContratista");
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/rendimientos_validadosContratista") 
	public ModelAndView rendimientos_validadosContratistaContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/rendimientos_validadosContratista"); 
	}//
	@RequestMapping("/cierre_mensual")
	public ModelAndView cierre_mensual(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "cierre_mensual");
		model.addAttribute("menuActual", "Contratista ");
		model.addAttribute("paginaActual", "Cierre Mensual");
		model.addAttribute("javaScriptPage","cierre_mensual");
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/cierre_mensual") 
	public ModelAndView cierre_mensualContratistaContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/cierre_mensual"); 
	}
	@RequestMapping("/listado_codificado")
	public ModelAndView listado_codificado(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "listado_codificado");
		model.addAttribute("menuActual", "Rendimiento");
		model.addAttribute("paginaActual", "Listado Rendimiento Codificado");
		model.addAttribute("javaScriptPage","listado_codificado");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/listado_codificado")
	public ModelAndView listado_codificadoContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/listado_codificado");
	}
	@RequestMapping("/cierre_terceros")
	public ModelAndView cierre_terceros(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "cierre_terceros");
		model.addAttribute("menuActual", "Contratista ");
		model.addAttribute("paginaActual", "Cierre Terceros");
		model.addAttribute("javaScriptPage","cierre_terceros");
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/cierre_terceros") 
	public ModelAndView cierre_tercerosContratistaContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/cierre_terceros"); 
	}
	@RequestMapping("/revision_asistencia")
	public ModelAndView revision_asistencia(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "revision_asistencia");
		model.addAttribute("menuActual", "Informes");
		model.addAttribute("paginaActual", "Revision Asistencia");
		model.addAttribute("javaScriptPage","revision_asistencia");
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/revision_asistencia") 
	public ModelAndView revision_asistenciaContratistaContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/revision_asistencia"); 
	}
	@RequestMapping("/tr_sin_rendimiento")
	public ModelAndView tr_sin_rendimiento(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "tr_sin_rendimiento");
		model.addAttribute("menuActual", "Informes");
		model.addAttribute("paginaActual", "Trabajadores sin Digitacion");
		model.addAttribute("javaScriptPage","tr_sin_rendimiento");
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/tr_sin_rendimiento") 
	public ModelAndView tr_sin_rendimientoContratistaContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/tr_sin_rendimiento"); 
	}
	@RequestMapping("/resumen_digitacion")
	public ModelAndView resumen_digitacion(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "resumen_digitacion");
		model.addAttribute("menuActual", "Informes");
		model.addAttribute("paginaActual", "Resumen Digitacion");
		model.addAttribute("javaScriptPage","resumen_digitacion");
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/resumen_digitacion") //listado_tr_huerto
	public ModelAndView resumen_digitacionContratistaContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/resumen_digitacion"); 
	}
	@RequestMapping("/listado_tr_huerto")
	public ModelAndView listado_tr_huerto(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "listado_tr_huerto");
		model.addAttribute("menuActual", "Informes");
		model.addAttribute("paginaActual", "Listado por Huerto del Trabajador");
		model.addAttribute("javaScriptPage","listado_tr_huerto");
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/listado_tr_huerto") //listado_tr_huerto
	public ModelAndView listado_tr_huertoContratistaContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/listado_tr_huerto"); 
	}
}
