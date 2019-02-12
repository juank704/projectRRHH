package cl.expled.web;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import lib.db.sw.CorreosDB;
import lib.security.session;

@Controller
public class FaenaSW {
private final static Logger LOG = LoggerFactory.getLogger(FaenaSW.class);
	
	//Instanciamos clase que se conecta a BD
	CorreosDB emp = new CorreosDB();
	
	@RequestMapping("/FaenaSW")
	public ModelAndView FaenaSWModulo(Model model,HttpSession httpSession) {
		LOG.info("Iniciamos la configuracion del modulo.");
		session ses= new session(httpSession);	
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		LOG.info("Session correcta.");
		model.addAttribute("menuActual","Mantenedores");
		model.addAttribute("paginaActual", "Faenas");
		model.addAttribute("content", "FaenaSW");
		model.addAttribute("javaScriptPage","FaenaSW");
		LOG.info("Se termina de configurar modulo.");
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/FaenaSW")
	public ModelAndView FaenaSWContent(Model model,HttpSession httpSession) {
		LOG.info("Se empieza a obtener datos para cargar pagina.");
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/FaenaSW");
	}
	
	
	
	
	
}
