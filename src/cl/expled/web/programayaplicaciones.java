package cl.expled.web;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import lib.security.session;

/*
 * author: Crunchify.com
 * 
 */

@Controller
public class programayaplicaciones {
	@RequestMapping("/ordenDosificacion")
	public ModelAndView ordenDosificacion(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "ordenDosificacion");
		model.addAttribute("menuActual", "Programa y Aplicaciones");
		model.addAttribute("paginaActual", "Orden de Aplicacion");
		model.addAttribute("javaScriptPage","orden");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}

	@RequestMapping("/content/ordenDosificacion")
	public ModelAndView ordenDosificacionContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/ordenDosificacion");
	}
	@RequestMapping("/RegistroLabores")
	public ModelAndView RegistroLabores(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "RegistroLabores");
		model.addAttribute("menuActual", "Programa y Aplicaciones");
		model.addAttribute("paginaActual", "Registro de Labores");
		model.addAttribute("javaScriptPage","RegistroLaboresJS");
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/RegistroLabores")
	public ModelAndView RegistroLaboresContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/RegistroLabores");
	}
	@RequestMapping("/programa_fitosanitario")
	public ModelAndView programa_fitosanitario(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "programa_fitosanitario");
		model.addAttribute("menuActual", "Programa y Aplicaciones");
		model.addAttribute("paginaActual", "Programa Fitosanitario");
		model.addAttribute("javaScriptPage","fitosanitario");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/programa_fitosanitario")
	public ModelAndView programa_fitosanitarioContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/programa_fitosanitario");
	}
	
	@RequestMapping("/lista_aplicaciones")
	public ModelAndView lista_aplicaciones(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "lista_aplicaciones");
		model.addAttribute("menuActual", "Programa y Aplicaciones");
		model.addAttribute("paginaActual", "Lista de Aplicaciones");
		model.addAttribute("javaScriptPage","lista_aplicaciones");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/lista_aplicaciones")
	public ModelAndView lista_aplicacionesContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/lista_aplicaciones");
	}
	
	@RequestMapping("/libro_campo")
	public ModelAndView libro_campo(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "libro_campo");
		model.addAttribute("menuActual", "Programa y Aplicaciones");
		model.addAttribute("paginaActual", "Libro de Campo Químicos");
		model.addAttribute("javaScriptPage","libro_campo");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/libro_campo")
	public ModelAndView libro_campoContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/libro_campo");
	}
	
	@RequestMapping("/libro_campoF")
	public ModelAndView libro_campoF(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "libro_campoF");
		model.addAttribute("menuActual", "Programa y Aplicaciones");
		model.addAttribute("paginaActual", "Libro de Campo Fertilizante");
		model.addAttribute("javaScriptPage","libro_campoF");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/libro_campoF")
	public ModelAndView libro_campoContentF(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/libro_campoF");
	}
	
	@RequestMapping("/listado_solped")
	public ModelAndView listado_solped(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "listado_solped");
		model.addAttribute("menuActual", "");
		model.addAttribute("paginaActual", "Lista de Solped");
		model.addAttribute("javaScriptPage","listado_solped");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/listado_solped")
	public ModelAndView listado_solpedContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/listado_solped");
	}
	
	@RequestMapping("/lista_reservas")
	public ModelAndView lista_reservas(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "lista_reservas");
		model.addAttribute("menuActual", "");
		model.addAttribute("paginaActual", "Lista de Reservas");
		model.addAttribute("javaScriptPage","lista_reservas");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/lista_reservas")
	public ModelAndView lista_reservasContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/lista_reservas");
	}
	
	@RequestMapping("/detalle_aplicacion")
	public ModelAndView detalle_aplicacion(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "detalle_aplicacion");
		model.addAttribute("menuActual", "Programa y Aplicaciones");
		model.addAttribute("paginaActual", "Confirmación de Aplicación");
		model.addAttribute("javaScriptPage","detalle_aplicacion");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/detalle_aplicacion")
	public ModelAndView detalle_aplicacionContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/detalle_aplicacion");
	}
	
	@RequestMapping("/confirmar_devolucion")
	public ModelAndView confirmar_devolucion(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "confirmar_devolucion");
		model.addAttribute("menuActual", "Programa y Aplicaciones");
		model.addAttribute("paginaActual", "Confirmación de Devolución");
		model.addAttribute("javaScriptPage","confirmar_devolucion");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/confirmar_devolucion")
	public ModelAndView confirmar_devolucionContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/confirmar_devolucion");
	}
	
	@RequestMapping("/Notificaciones")
	public ModelAndView Notificaciones(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "Notificaciones");
		model.addAttribute("menuActual", "Programa y Aplicaciones");
		model.addAttribute("paginaActual", "Notificaciones");
		model.addAttribute("javaScriptPage","Notificaciones");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/Notificaciones")
	public ModelAndView NotificacionesContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/Notificaciones");
	}
	
	@RequestMapping("/orden_contingencia")
	public ModelAndView orden_contingencia(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "orden_contingencia");
		model.addAttribute("menuActual", "Programa y Aplicaciones");
		model.addAttribute("paginaActual", "Orden por Contingencia");
		model.addAttribute("javaScriptPage","orden_contingencia");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/orden_contingencia")
	public ModelAndView orden_contingenciaContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/orden_contingencia");
	}
	
	
	@RequestMapping("/orden_contingencia_edi")
	public ModelAndView orden_contingencia_edi(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "orden_contingencia_edi");
		model.addAttribute("menuActual", "Programa y Aplicaciones");
		model.addAttribute("paginaActual", "Orden por Contingencia");
		model.addAttribute("javaScriptPage","orden_contingencia_edi");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/orden_contingencia_edi")
	public ModelAndView orden_contingencia_ediContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/orden_contingencia_edi");
	}
	
	//
	@RequestMapping("/formasAplicacion")
	public ModelAndView formasAplicacion(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "formasAplicacion");
		model.addAttribute("menuActual", "Programa y Aplicaciones");
		model.addAttribute("paginaActual", "Formas de Aplicaiones");
		model.addAttribute("javaScriptPage","formasAplicacion");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/formasAplicacion")
	public ModelAndView formasAplicacionContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/formasAplicacion");
	}
	
	
	//
	@RequestMapping("/confirmacionOrden")
	public ModelAndView confirmacionAplicacion(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "confirmacionOrden");
		model.addAttribute("menuActual", "Programa y Aplicaciones");
		model.addAttribute("paginaActual", "Confirmación de Orden");
		model.addAttribute("javaScriptPage","confirmacionOrden");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/confirmacionOrden")
	public ModelAndView confirmacionAplicacionContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/confirmacionOrden");
	}
	
	//
	@RequestMapping("/controlAplicacion")
	public ModelAndView ControlAplicacion(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "controlAplicacion");
		model.addAttribute("menuActual", "Programa y Aplicaciones");
		model.addAttribute("paginaActual", "Control de Aplicación");
		model.addAttribute("javaScriptPage","controlAplicacion");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/controlAplicacion")
	public ModelAndView ControlAplicacionContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/controlAplicacion");
	}
	
	//
	@RequestMapping("/estadoFenologico")
	public ModelAndView estadoFenologico(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "estadoFenologico");
		model.addAttribute("menuActual", "Programa y Aplicaciones");
		model.addAttribute("paginaActual", "Estado Fenologico");
		model.addAttribute("javaScriptPage","estadoFenologico");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/estadoFenologico")
	public ModelAndView estadoFenologicoContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/estadoFenologico");
	}

	@RequestMapping("/reporte_fitosanitario")
	public ModelAndView reporte_fitosanitario(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "reporte_fitosanitario");
		model.addAttribute("menuActual", "Programa y Aplicaciones");
		model.addAttribute("paginaActual", "Reporte Sanitario");
		model.addAttribute("javaScriptPage","reporte_fitosanitario");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/reporte_fitosanitario")
	public ModelAndView reporte_fitosanitarioContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/reporte_fitosanitario");
	}
	
}
