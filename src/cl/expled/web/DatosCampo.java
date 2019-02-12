package cl.expled.web;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import lib.db.sw.DatosCampoDB;
import lib.security.session;
@Controller
public class DatosCampo {
private final static Logger LOG = LoggerFactory.getLogger(DatosCampo.class);
	
	//Instanciamos clase que se conecta a BD
DatosCampoDB emp = new DatosCampoDB();
	
	@RequestMapping("/DatosCampo")
	public ModelAndView DatosCampoModulo(Model model,HttpSession httpSession) {
		LOG.info("Iniciamos la configuracion del modulo.");
		session ses= new session(httpSession);	
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		LOG.info("Session correcta.");
		model.addAttribute("menuActual","Campo");
		model.addAttribute("paginaActual", "Datos del Huerto");
		model.addAttribute("content", "DatosCampo");
		model.addAttribute("javaScriptPage","DatosCampo");
		LOG.info("Se termina de configurar modulo.");
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/DatosCampo")
	public ModelAndView DatosCampoContent(Model model,HttpSession httpSession) {
		LOG.info("Se empieza a obtener datos para cargar pagina.");
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/DatosCampo");
	}
}
