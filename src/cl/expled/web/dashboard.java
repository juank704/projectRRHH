package cl.expled.web;


import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import lib.security.session;

/*
 * author: Crunchify.com
 * 
 */

@Controller
public class dashboard {
	
		
	@RequestMapping("/empresaJSP")
	public ModelAndView empresaJSP(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Mantenedores");
		model.addAttribute("paginaActual", "Empresas");
		model.addAttribute("content", "empresaJSP");
		model.addAttribute("javaScriptPage","empresaJS");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/empresaJSP")
	public ModelAndView empresaJSPContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/empresaJSP");
	}

	@RequestMapping("/exportar")
	public ModelAndView exportar(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "exportar");
		model.addAttribute("javaScriptPage","exportarJS");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/exportar")
	public ModelAndView exportarContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/exportar");
	}
	
	@RequestMapping("/importar")
	public ModelAndView importar(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "importar");
		model.addAttribute("javaScriptPage","import");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/importar")
	public ModelAndView importarContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/importar");
	}
	
	@RequestMapping("/parJSP")
	public ModelAndView parJSP(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "parJSP");
		model.addAttribute("javaScriptPage","import");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/parJSP")
	public ModelAndView parJSPContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/parJSP");
	}
	
	@RequestMapping("/araucana")
	public ModelAndView araucana(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "araucana");
		model.addAttribute("javaScriptPage","araucanaJS");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/araucana")
	public ModelAndView araucanaContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/araucana");
	}
	
	@RequestMapping("/andes")
	public ModelAndView andes(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "andes");
		model.addAttribute("menuActual", "Importar/Exportar");
		model.addAttribute("paginaActual", "Caja los Andes");
		model.addAttribute("javaScriptPage","andesJS");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/andes")
	public ModelAndView andesContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/andes");
	}
	
	@RequestMapping("/previred")
	public ModelAndView previred(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Archivos Planos");
		model.addAttribute("paginaActual", "Previred");
		model.addAttribute("content", "previred");
		model.addAttribute("javaScriptPage","previredJs");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/previred")
	public ModelAndView previredContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/previred");
	}
	
	@RequestMapping("/haberesydescuentos")
	public ModelAndView haberesydescuentos(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "haberesydescuentos");
		model.addAttribute("javaScriptPage","haberesydescuentosJS");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/haberesydescuentos")
	public ModelAndView haberesydescuentosContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/haberesydescuentos");
	}
	
	@RequestMapping("/BuscarContrato")
	public ModelAndView BuscarContrato(Model model, HttpSession httpSession) {
		session ses = new session(httpSession);
		if (ses.isValid()) {
			return new ModelAndView("redirect:/webApp/login");
		}
		
		model.addAttribute("menuActual", "Remuneraciones");
		model.addAttribute("paginaActual", "Calculo de Liquidacion");
		model.addAttribute("content", "BuscarContrato");
		model.addAttribute("javaScriptPage", "BuscarContrato");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
		
	}
	@RequestMapping("/content/BuscarContrato")
	public ModelAndView BuscarContratoContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/BuscarContrato");
	}
	@RequestMapping("/departamentos")
	public ModelAndView departamentos(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "departamentos");
		model.addAttribute("javaScriptPage","departamentosJS");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/departamentos")
	public ModelAndView departamentosContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/departamentos");
	}
	
	@RequestMapping("/cierre")
	public ModelAndView cierre(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "cierre");
		model.addAttribute("javaScriptPage","cierreJS");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/cierre")
	public ModelAndView cierreContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/cierre");
	}
	
	
	@RequestMapping("/haberes")
	public ModelAndView haberes(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Haberes y descuentos");
		model.addAttribute("paginaActual", "Haberes Descuentos");
		model.addAttribute("content", "haberes");
		model.addAttribute("javaScriptPage","haberesJS");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/haberes")
	public ModelAndView haberesContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/haberes");
	}
	
	@RequestMapping("/haberesfijos")
	public ModelAndView haberesfijos(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "haberesfijos");
		model.addAttribute("javaScriptPage","haberesfijosJS");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/haberesfijos")
	public ModelAndView haberesfijosContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/haberesfijos");
	}
	
	@RequestMapping("/liquidacion")
	public ModelAndView liquidacion(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "liquidacion");
		model.addAttribute("javaScriptPage","liquidacionJS");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/liquidacion")
	public ModelAndView liquidacionContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/liquidacion");
	}
	
	@RequestMapping("/comprobantes")
	public ModelAndView comprobantes(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "comprobantes");
		model.addAttribute("javaScriptPage","comprobantesJS");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/comprobantes")
	public ModelAndView comprobantesContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/comprobantes");
	}
	
	@RequestMapping("/reDescuentos")
	public ModelAndView reDescuentos(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "reDescuentos");
		model.addAttribute("javaScriptPage","reDescuentosJS");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/reDescuentos")
	public ModelAndView reDescuentosContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/reDescuentos");
	}
	
	@RequestMapping("/reHaberFijos")
	public ModelAndView reHaberFijos(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "reHaberFijos");
		model.addAttribute("javaScriptPage","reHaberFijosJS");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/reHaberFijos")
	public ModelAndView reHaberFijosContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/reHaberFijos");
	}
	
	@RequestMapping("/reLiquidacion")
	public ModelAndView reLiquidacion(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "reLiquidacion");
		model.addAttribute("javaScriptPage","reLiquidacion");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/reLiquidacion")
	public ModelAndView reLiquidacionFijosContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/reLiquidacion");
	}
	
	@RequestMapping("/movPersonal")
	public ModelAndView movPersonal(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "movPersonal");
		model.addAttribute("javaScriptPage","movPersonalJS");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/movPersonal")
	public ModelAndView movPersonalContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/movPersonal");
	}
	
	@RequestMapping("/reMovPersonal")
	public ModelAndView reMovPersonal(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "reMovPersonal");
		model.addAttribute("javaScriptPage","reMovPersonalJS");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/reMovPersonal")
	public ModelAndView reMovPersonalContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/reMovPersonal");
	}
	
	@RequestMapping("/addEmpresa")
	public ModelAndView addEmpresa(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "addEmpresa");
		model.addAttribute("javaScriptPage","addEmpresaJS");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/addEmpresa")
	public ModelAndView addEmpresaContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/addEmpresa");
	}
	
	@RequestMapping("/ConsumoBodega")
	public ModelAndView ConsumoBodega(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "ConsumoBodega");
		model.addAttribute("javaScriptPage","ConsumoBodegaJS");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/ConsumoBodega")
	public ModelAndView ConsumoBodegaContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/ConsumoBodega");
	}
	@RequestMapping("/addHaberYDescuento")
	public ModelAndView addHaberYDescuento(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "addHaberYDescuento");
		model.addAttribute("javaScriptPage","addHaberYDescuentoJS");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/addHaberYDescuento")
	public ModelAndView addHaberYDescuentoContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/addHaberYDescuento");
	}
	@RequestMapping("/addMovPersonal")
	public ModelAndView addMovPersonal(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "addMovPersonal");
		model.addAttribute("javaScriptPage","addMovPersonalJS");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/addMovPersonal")
	public ModelAndView addMovPersonalContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/addMovPersonal");
	}
	@RequestMapping("/documentos")
	public ModelAndView documentos(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "documentos");
		model.addAttribute("javaScriptPage","documentosJS");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/documentos")
	public ModelAndView documentosContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/documentos");
	}
	@RequestMapping("/test")
	public ModelAndView test(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "test");
		model.addAttribute("javaScriptPage","testJS");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/test")
	public ModelAndView testContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/test");
	}
	@RequestMapping("/cargos")
	public ModelAndView cargos(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "cargos");
		model.addAttribute("javaScriptPage","cargosJS");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/cargos")
	public ModelAndView cargosContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/cargos");
	}
	@RequestMapping("/parametros")
	public ModelAndView parametros(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "parametros");
		model.addAttribute("javaScriptPage","parametrosJS");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/parametros")
	public ModelAndView parametrosContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/parametros");
	}
	@RequestMapping("/liqui")
	public ModelAndView liqui(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "liqui");
		model.addAttribute("javaScriptPage","liquiJS");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/liqui")
	public ModelAndView liquiContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/liqui");
	}
	@RequestMapping("/createPetition")
	public ModelAndView createPetition(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "createPetition");
		model.addAttribute("javaScriptPage","createPetition");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/createPetition")
	public ModelAndView createPetitiontoContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/createPetition");
	}
	@RequestMapping("/preseleccion")
	public ModelAndView preseleccion(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "preseleccion");
		model.addAttribute("javaScriptPage","preseleccion");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/preseleccion")
	public ModelAndView preseleccionContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/preseleccion");
	}
	@RequestMapping("/seleccion")
	public ModelAndView seleccion(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "seleccion");
		model.addAttribute("javaScriptPage","seleccion");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/seleccion")
	public ModelAndView seleccionContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/seleccion");
	}
	@RequestMapping("/Contratacion")
	public ModelAndView Contratacion(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "Contratacion");
		model.addAttribute("javaScriptPage","Contratacion");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/Contratacion")
	public ModelAndView ContratacionContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/Contratacion");
	}
	@RequestMapping("/cambioempresa")
	public ModelAndView cambioempresa(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		
		model.addAttribute("menuActual", "Colaboradores");
		model.addAttribute("paginaActual", "Cambio de Empresas");
		model.addAttribute("content", "cambioempresa");
		model.addAttribute("javaScriptPage","cambioempresa");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/cambioempresa")
	public ModelAndView cambioempresaContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/cambioempresa");
	}
	
	@RequestMapping(value = {"/contratos/", "/contratos"})
	public ModelAndView contratos(Model model,@RequestParam MultiValueMap<String, String> masivos,HttpSession httpSession) {
		
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		
		String[] idContratacion = masivos.get("id").get(0).split("\\s*,\\s*");
		
		model.addAttribute("menuActual", "Colaboradores");
	    if(idContratacion.length >= 2) {model.addAttribute("paginaActual", "Contratación Masiva");}
	    else {model.addAttribute("paginaActual", "Contratación");}
		
		model.addAttribute("content", "contratos");
		model.addAttribute("javaScriptPage","contratos");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/contratos")
	public ModelAndView contratosContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/contratos");
	}
	
	@RequestMapping("/PermisosyLicencias")
	public ModelAndView PermisosyLicencias(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Permisos y Licencias");
		model.addAttribute("paginaActual", "Permisos y Licencias");
		model.addAttribute("content", "PermisosyLicencias");
		model.addAttribute("javaScriptPage","PermisosyLicencias");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/PermisosyLicencias")
	public ModelAndView PermisosyLicenciasContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/PermisosyLicencias");
	}
	
	@RequestMapping("/SolicitudDeVacaciones")
	public ModelAndView SolicitudDeVacaciones(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Asistencias y Permisos");
		model.addAttribute("paginaActual", "Solicitud de Vacaciones");
		model.addAttribute("content", "SolicitudDeVacaciones");
		model.addAttribute("javaScriptPage","SolicitudDeVacaciones");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/SolicitudDeVacaciones")
	public ModelAndView SolicitudDeVacacionesContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/SolicitudDeVacaciones");
	}
	@RequestMapping("/ActSueldoMinimo")
	public ModelAndView ActSueldoMinimo(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "ActSueldoMinimo");
		model.addAttribute("javaScriptPage","ActSueldoMinimo");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/ActSueldoMinimo")
	public ModelAndView ActSueldoMinimoContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/ActSueldoMinimo");
	}
	@RequestMapping("/anticipos")
	public ModelAndView anticipos(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "anticipos");
		model.addAttribute("javaScriptPage","anticipos");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/anticipos")
	public ModelAndView anticiposContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/anticipos");
	}
	@RequestMapping("/ListaSolicitudes")
	public ModelAndView ListaSolicitudes(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "ListaSolicitudes");
		model.addAttribute("javaScriptPage","ListaSolicitudes");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/ListaSolicitudes")
	public ModelAndView ListaSolicitudesContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/ListaSolicitudes");
	}
	
	@RequestMapping("/NumeroSolicitud")
	public ModelAndView NumeroSolicitud(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "NumeroSolicitud");
		model.addAttribute("javaScriptPage","NumeroSolicitud");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/NumeroSolicitud")
	public ModelAndView NumeroSolicitudContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/NumeroSolicitud");
	}
	
	@RequestMapping("/ListadoHaberesDescuentos")
	public ModelAndView ListadoHaberesDescuentos(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Haberes y Descuentos");
		model.addAttribute("paginaActual", "Listado Haberes y Descuentos");
		model.addAttribute("content", "ListadoHaberesDescuentos");
		model.addAttribute("javaScriptPage","ListadoHaberesDescuentos");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/ListadoHaberesDescuentos")
	public ModelAndView ListadoHaberesDescuentosContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/ListadoHaberesDescuentos");
	}
	
	@RequestMapping("/nominaPagoFiniquitos")
	public ModelAndView nominaPagoFiniquitosContract(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "nominaPagoFiniquitos");
		model.addAttribute("javaScriptPage","nominaPagoFiniquitos");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/nominaPagoFiniquitos")
	public ModelAndView nominaPagoFiniquitosContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/nominaPagoFiniquitos");
	}
	@RequestMapping("/nominaPago")
	public ModelAndView nominaPagoContract(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Nominas");
		model.addAttribute("paginaActual", "Generar Nóminas De Pago");
		model.addAttribute("content", "nominaPago");
		model.addAttribute("javaScriptPage","nominaPago");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/nominaPago")
	public ModelAndView nominaPagoContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/nominaPago");
	}
	
	@RequestMapping("/AprobarNomina")
	public ModelAndView AprobarNominaContract(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Nominas");
		model.addAttribute("paginaActual", "Aprovar Nomina Anticipos");
		model.addAttribute("content", "AprobarNomina");
		model.addAttribute("javaScriptPage","AprobarNomina");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/AprobarNomina")
	public ModelAndView AprobarNominaContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/AprobarNomina");
	}
	
	
	
	
	
	
	
	
	
	@RequestMapping("/nominaPagoLiquidacion")
	public ModelAndView nominaPagoLiquidacionContract(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "nominaPagoLiquidacion");
		model.addAttribute("javaScriptPage","nominaPagoLiquidacion");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/nominaPagoLiquidacion")
	public ModelAndView nominaPagoLiquidacionContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/nominaPagoLiquidacion");
	}
	@RequestMapping("/asignacionAnticiposIndividuales")
	public ModelAndView asignacionAnticiposIndividualesContract(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Anticipos");
		model.addAttribute("paginaActual", "Solicitud Anticipos");
		model.addAttribute("content", "asignacionAnticiposIndividuales");
		model.addAttribute("javaScriptPage","asignacionAnticiposIndividuales");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/asignacionAnticiposIndividuales")
	public ModelAndView asignacionAnticiposIndividualesContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/asignacionAnticiposIndividuales");
	}
	@RequestMapping("/asignacionAnticiposMasivos")
	public ModelAndView asignacionAnticiposMasivosContract(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "asignacionAnticiposMasivos");
		model.addAttribute("javaScriptPage","asignacionAnticiposMasivos");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/asignacionAnticiposMasivos")
	public ModelAndView asignacionAnticiposMasivosContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/asignacionAnticiposMasivos");
	}
	
	@RequestMapping("/calculoSueldoBase")
	public ModelAndView calculoSueldoBaseContract(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		
		model.addAttribute("menuActual", "Administración");
		model.addAttribute("paginaActual", "Cálculo de Sueldo Base");
		model.addAttribute("content", "calculoSueldoBase");
		model.addAttribute("javaScriptPage","calculoSueldoBase");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/calculoSueldoBase")
	public ModelAndView calculoSueldoBaseContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/calculoSueldoBase");
	}
	@RequestMapping("/vacacionesPanel")
	public ModelAndView vacacionesPanelContract(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "vacacionesPanel");
		model.addAttribute("javaScriptPage","vacacionesPanel");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/vacacionesPanel")
	public ModelAndView vacacionesPanelContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/vacacionesPanel");
	}
	
	@RequestMapping("/Grupos")
	public ModelAndView Grupo(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Mantenedores");
		model.addAttribute("paginaActual", "Grupos");
		model.addAttribute("content", "Grupos");
		model.addAttribute("javaScriptPage","Grupos");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/Grupos")
	public ModelAndView GrupoContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/Grupos");
	}
	@RequestMapping("/AFPs")
	public ModelAndView AFP(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Mantenedores");
		model.addAttribute("paginaActual", "AFPs");
		model.addAttribute("content", "AFPs");
		model.addAttribute("javaScriptPage","AFPs");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/AFPs")
	public ModelAndView AFPContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/AFPs");
	}
	@RequestMapping("/RepresentantesLegales")
	public ModelAndView RepresentantesLegales(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Mantenedores");
		model.addAttribute("paginaActual", "Empresas");
		model.addAttribute("content", "RepresentantesLegales");
		model.addAttribute("javaScriptPage","RepresentantesLegales");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/RepresentantesLegales")
	public ModelAndView RepresentantesLegalesContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/RepresentantesLegales");
	}
	@RequestMapping("/Feriados")
	public ModelAndView Feriados(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Mantenedores");
		model.addAttribute("paginaActual", "Feriados");
		model.addAttribute("content", "Feriados");
		model.addAttribute("javaScriptPage","Feriados");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/Feriados")
	public ModelAndView FeriadosContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/Feriados");
	}
	@RequestMapping("/eventosMutualidad")
	public ModelAndView eventosMutualidad(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Eventos");
		model.addAttribute("paginaActual", "Mutualidad");
		model.addAttribute("content", "eventosMutualidad");
		model.addAttribute("javaScriptPage","eventosMutualidad");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/eventosMutualidad")
	public ModelAndView eventosMutualidadContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/eventosMutualidad");
	}
	@RequestMapping("/rhcalculo")
	public ModelAndView rhcalculo(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Calculos");
		model.addAttribute("paginaActual", "RRHH");
		model.addAttribute("content", "rhcalculo");
		model.addAttribute("javaScriptPage","rhcalculo");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/rhcalculo")
	public ModelAndView rhcalculoContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/rhcalculo");
	}
	
	@RequestMapping("/HorasAsistencia")
	public ModelAndView HorasAsistenciaContract(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Permisos y Licencias");
		model.addAttribute("paginaActual", "Horas Extras/Faltas");
		model.addAttribute("content", "HorasAsistencia");
		model.addAttribute("javaScriptPage","HorasAsistencia");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/HorasAsistencia")
	public ModelAndView HorasAsistenciaContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/HorasAsistencia");
	}
	
	@RequestMapping("/ListadoHorasAsistencia")
	public ModelAndView ListadoHorasAsistenciaContract(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Permisos y Licencias");
		model.addAttribute("paginaActual", "Listado Horas Asistencia");
		model.addAttribute("content", "ListadoHorasAsistencia");
		model.addAttribute("javaScriptPage","ListadoHorasAsistencia");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/ListadoHorasAsistencia")
	public ModelAndView ListadoHorasAsistenciaContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/ListadoHorasAsistencia");
	}
	
	@RequestMapping("/ListadoPermisoyLicencia")
	public ModelAndView ListadoPermisoyLicencia(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Permisos y Licencias");
		model.addAttribute("paginaActual", "Listado Permiso y Licencia");
		model.addAttribute("content", "ListadoPermisoyLicencia");
		model.addAttribute("javaScriptPage","ListadoPermisoyLicencia");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/ListadoPermisoyLicencia")
	public ModelAndView ListadoPermisoyLicenciaContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/ListadoPermisoyLicencia");
	}
	
	@RequestMapping("/QuitarAnticipos")
	public ModelAndView QuitarAnticipos(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Anticipos");
		model.addAttribute("paginaActual", "Quitar Anticipos");
		model.addAttribute("content", "QuitarAnticipos");
		model.addAttribute("javaScriptPage","QuitarAnticipos");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/QuitarAnticipos")
	public ModelAndView QuitarAnticiposContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/QuitarAnticipos");
	}
	
	@RequestMapping("/ImpresionAnticipos")
	public ModelAndView ImpresionAnticipos(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Impresión de Documentos");
		model.addAttribute("paginaActual", "Anticipos de Sueldos");
		model.addAttribute("content", "ImpresionAnticipos");
		model.addAttribute("javaScriptPage","ImpresionAnticipos");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/ImpresionAnticipos")
	public ModelAndView ImpresionAnticiposContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/ImpresionAnticipos");
	}
	
	@RequestMapping("/FiniquitosMasivo")
	public ModelAndView FiniquitosMasivo(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Finiquitos");
		model.addAttribute("paginaActual", "Finiquitos Masivo");
		model.addAttribute("content", "FiniquitosMasivo");
		model.addAttribute("javaScriptPage","FiniquitosMasivo");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/FiniquitosMasivo")
	public ModelAndView FiniquitosMasivoContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/FiniquitosMasivo");
	}
	
	@RequestMapping("/ImprimirFiniquito")
	public ModelAndView ImprimirFiniquito(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Impresión de Documentos");
		model.addAttribute("paginaActual", "Imprimir Finiquito");
		model.addAttribute("content", "ImprimirFiniquito");
		model.addAttribute("javaScriptPage","ImprimirFiniquito");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/ImprimirFiniquito")
	public ModelAndView ImprimirFiniquitoContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/ImprimirFiniquito");
	}
	
	@RequestMapping("/HaberesDescuentosFiniquito")
	public ModelAndView HaberesDescuentosFiniquito(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Finiquitos");
		model.addAttribute("paginaActual", "Haberes Descuentos");
		model.addAttribute("content", "HaberesDescuentosFiniquito");
		model.addAttribute("javaScriptPage","HaberesDescuentosFiniquito");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/HaberesDescuentosFiniquito")
	public ModelAndView HaberesDescuentosFiniquitoContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/HaberesDescuentosFiniquito");
	}
	
	@RequestMapping("/EliminarFiniquitos")
	public ModelAndView EliminarFiniquitos(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Finiquitos");
		model.addAttribute("paginaActual", "Eliminar Finiquitos");
		model.addAttribute("content", "EliminarFiniquitos");
		model.addAttribute("javaScriptPage","EliminarFiniquitos");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/EliminarFiniquitos")
	public ModelAndView EliminarFiniquitosContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/EliminarFiniquitos");
	}
	
	@RequestMapping("/ModificarHaberesDescuentosFiniquito")
	public ModelAndView ModificarHaberesDescuentosFiniquito(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Finiquitos");
		model.addAttribute("paginaActual", "Modificar Haberes Descuentos");
		model.addAttribute("content", "ModificarHaberesDescuentosFiniquito");
		model.addAttribute("javaScriptPage","ModificarHaberesDescuentosFiniquito");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/ModificarHaberesDescuentosFiniquito")
	public ModelAndView ModificarHaberesDescuentosFiniquitoContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/ModificarHaberesDescuentosFiniquito");
	}
	
	@RequestMapping("/IngresoAnticipos")
	public ModelAndView IngresoAnticiposAnticipos(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Anticipos");
		model.addAttribute("paginaActual", "Ingreso Anticipos");
		model.addAttribute("content", "IngresoAnticipos");
		model.addAttribute("javaScriptPage","IngresoAnticipos");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/IngresoAnticipos")
	public ModelAndView IngresoAnticiposContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/IngresoAnticipos");
	}
	
	@RequestMapping("/AvisoInspeccionTrabajo")
	public ModelAndView AvisoInspeccionTrabajo(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Otros");
		model.addAttribute("paginaActual", "Aviso Inspección del Trabajo");
		model.addAttribute("content", "AvisoInspeccionTrabajo");
		model.addAttribute("javaScriptPage","AvisoInspeccionTrabajo");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/AvisoInspeccionTrabajo")
	public ModelAndView AvisoInspeccionTrabajoContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/AvisoInspeccionTrabajo");
	}
	
	@RequestMapping("/CuentasSAP")
	public ModelAndView CuentasSAP(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Mantenedores");
		model.addAttribute("paginaActual", "Cuentas SAP");
		model.addAttribute("content", "CuentasSAP");
		model.addAttribute("javaScriptPage","CuentasSAP");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/CuentasSAP")
	public ModelAndView CuentasSAPContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/CuentasSAP");
	}
	
	@RequestMapping("/NominaAFC")
	public ModelAndView NominaAFC(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Informes");
		model.addAttribute("paginaActual", "Nomina AFC");
		model.addAttribute("content", "NominaAFC");
		model.addAttribute("javaScriptPage","NominaAFC");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/NominaAFC")
	public ModelAndView NominaAFCContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/NominaAFC");
	}
	
	
	@RequestMapping("/BloqueoMensual")
	public ModelAndView BloqueoMensual(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Cierre de Periodos");
		model.addAttribute("paginaActual", "Bloqueo Mensual");
		model.addAttribute("content", "BloqueoMensual");
		model.addAttribute("javaScriptPage","BloqueoMensual");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/BloqueoMensual")
	public ModelAndView BloqueoMensualContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/BloqueoMensual");
	}
	
	@RequestMapping("/importarExcelHoraAsistencia")
	public ModelAndView importarExcelHoraAsistencia(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Permisos y Licencias");
		model.addAttribute("paginaActual", "Importar Excel Horas Asistencia");
		model.addAttribute("content", "importarExcelHoraAsistencia");
		model.addAttribute("javaScriptPage","importarExcelHoraAsistencia");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/importarExcelHoraAsistencia")
	public ModelAndView importarExcelHoraAsistenciaContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/importarExcelHoraAsistencia");
	}
	
	@RequestMapping("/importarDiasFalta")
	public ModelAndView importarDiasFalta(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Permisos y Licencias");
		model.addAttribute("paginaActual", "Importar Días Falta");
		model.addAttribute("content", "importarDiasFalta");
		model.addAttribute("javaScriptPage","importarDiasFalta");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/importarDiasFalta")
	public ModelAndView importarDiasFaltaContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/importarDiasFalta");
	}
	
	@RequestMapping("/importarExcelAnticipos")
	public ModelAndView importarExcelAnticipos(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Anticipos");
		model.addAttribute("paginaActual", "Importar Anticipos");
		model.addAttribute("content", "importarExcelAnticipos");
		model.addAttribute("javaScriptPage","importarExcelAnticipos");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/importarExcelAnticipos")
	public ModelAndView importarExcelAnticiposContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/importarExcelAnticipos");
	}
	
	@RequestMapping("/AfiliaciondeTrabajadoresPREVIRED")
	public ModelAndView AfiliaciondeTrabajadoresPREVIRED(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Archivos Planos");
		model.addAttribute("paginaActual", "Afiliación de Trabajadores");
		model.addAttribute("content", "AfiliaciondeTrabajadoresPREVIRED");
		model.addAttribute("javaScriptPage","AfiliaciondeTrabajadoresPREVIRED");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/AfiliaciondeTrabajadoresPREVIRED")
	public ModelAndView AfiliaciondeTrabajadoresPREVIREDContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/AfiliaciondeTrabajadoresPREVIRED");
	}
	
	@RequestMapping("/EliminarLiquidacion")
	public ModelAndView EliminarLiquidacion(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Remuneraciones");
		model.addAttribute("paginaActual", "Eliminar Liquidación");
		model.addAttribute("content", "EliminarLiquidacion");
		model.addAttribute("javaScriptPage","EliminarLiquidacion");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/EliminarLiquidacion")
	public ModelAndView EliminarLiquidacionContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/EliminarLiquidacion");
	}
	
	@RequestMapping("/Retenciones")
	public ModelAndView Retenciones(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Remuneraciones");
		model.addAttribute("paginaActual", "Retenciones");
		model.addAttribute("content", "Retenciones");
		model.addAttribute("javaScriptPage","Retenciones");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/Retenciones")
	public ModelAndView RetencionesContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/Retenciones");
	}
	
	
	@RequestMapping("/ArchivoBasededatosCCAFLosAndes")
	public ModelAndView ArchivoBasededatosCCAFLosAndes(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Archivos Planos");
		model.addAttribute("paginaActual", "Archivo Base de datos CCAF Los Andes");
		model.addAttribute("content", "ArchivoBasededatosCCAFLosAndes");
		model.addAttribute("javaScriptPage","ArchivoBasededatosCCAFLosAndes");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/ArchivoBasededatosCCAFLosAndes")
	public ModelAndView ArchivoBasededatosCCAFLosAndesContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/ArchivoBasededatosCCAFLosAndes");
		
	}
	
	@RequestMapping("/BuscarTrabajadoresSinLiquidacion")
	public ModelAndView BuscarTrabajadoresSinLiquidacion(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Remuneraciones");
		model.addAttribute("paginaActual", "Buscar Trabajadores Sin Liquidación");
		model.addAttribute("content", "BuscarTrabajadoresSinLiquidacion");
		model.addAttribute("javaScriptPage","BuscarTrabajadoresSinLiquidacion");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/BuscarTrabajadoresSinLiquidacion")
	public ModelAndView BuscarTrabajadoresSinLiquidacionContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/BuscarTrabajadoresSinLiquidacion");
		
	}
	
	@RequestMapping("/MantenedorRepresentantes")
	public ModelAndView MantenedorRepresentantes(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Mantenedores");
		model.addAttribute("paginaActual", "Representantes Legales");
		model.addAttribute("content", "MantenedorRepresentantes");
		model.addAttribute("javaScriptPage","MantenedorRepresentantes");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/MantenedorRepresentantes")
	public ModelAndView MantenedorRepresentantesContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/MantenedorRepresentantes");
		
	}
	
	
	
}
