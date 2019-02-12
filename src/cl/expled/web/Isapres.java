package cl.expled.web;



import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;


import lib.db.sw.IsapreDB;
import lib.security.session;

@Controller
public class Isapres {
	private final static Logger LOG = LoggerFactory.getLogger(Finiquitos.class);
	
	//Instanciamos clase que se conecta a BD
	IsapreDB emp = new IsapreDB();
	
	@RequestMapping("/Isapres")
	public ModelAndView IsapresModulo(Model model,HttpSession httpSession) {
		LOG.info("Iniciamos la configuracion del modulo.");
		session ses= new session(httpSession);	
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		LOG.info("Session correcta.");
		model.addAttribute("menuActual","Isapres");
		model.addAttribute("paginaActual", "ISAPRES");
		model.addAttribute("content", "Isapres");
		model.addAttribute("javaScriptPage","Isapres");
		LOG.info("Se termina de configurar modulo.");
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/Isapres")
	public ModelAndView IsapresContent(Model model,HttpSession httpSession) {
		LOG.info("Se empieza a obtener datos para cargar pagina.");
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/Isapres");
	}
	
}
