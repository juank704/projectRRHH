package cl.expled.web;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import lib.db.sw.ListaSolicitudVacacionesDB;
import lib.security.session;
@Controller
public class ListaSolicitudVacaciones {
private final static Logger LOG = LoggerFactory.getLogger(ListaSolicitudVacaciones.class);
	
	//Instanciamos clase que se conecta a BD
ListaSolicitudVacacionesDB emp = new ListaSolicitudVacacionesDB();
	
	@RequestMapping("/ListaSolicitudVacaciones")
	public ModelAndView ListaSolicitudVacacionesModulo(Model model,HttpSession httpSession) {
		LOG.info("Iniciamos la configuracion del modulo.");
		session ses= new session(httpSession);	
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		LOG.info("Session correcta.");
		model.addAttribute("menuActual","Vacaciones");
		model.addAttribute("paginaActual", "Lista Solicitudes de Vacaciones");
		model.addAttribute("content", "ListaSolicitudVacaciones");
		model.addAttribute("javaScriptPage","ListaSolicitudVacaciones");
		LOG.info("Se termina de configurar modulo.");
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/ListaSolicitudVacaciones")
	public ModelAndView ListaSolicitudVacacionesContent(Model model,HttpSession httpSession) {
		LOG.info("Se empieza a obtener datos para cargar pagina.");
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/ListaSolicitudVacaciones");
	}
}
