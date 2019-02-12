package cl.expled.web;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import lib.db.sw.APVDB;

import lib.security.session;

@Controller
public class APV {
	
	//Instanciamos clase que se conecta a BD
	private final static Logger LOG = LoggerFactory.getLogger(Finiquitos.class);
	APVDB emp = new APVDB();
	
	@RequestMapping("/APV")
	public ModelAndView APVModulo(Model model,HttpSession httpSession) {
		LOG.info("Iniciamos la configuracion del modulo.");
		session ses= new session(httpSession);	
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		LOG.info("Session correcta.");
		model.addAttribute("menuActual","Mantenedores");
		model.addAttribute("paginaActual", "APVs");
		model.addAttribute("content", "APV");
		model.addAttribute("javaScriptPage","APVJS");
		LOG.info("Se termina de configurar modulo.");
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/APV")
	public ModelAndView APVContent(Model model,HttpSession httpSession) {
		LOG.info("Se empieza a obtener datos para cargar pagina.");
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/APV");
	}
}
