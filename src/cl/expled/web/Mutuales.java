package cl.expled.web;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import lib.db.sw.MutualesDB;
import lib.security.session;

@Controller
public class Mutuales {

	//Instanciamos clase que se conecta a BD
	private final static Logger LOG = LoggerFactory.getLogger(Finiquitos.class);
	MutualesDB mut = new MutualesDB();
	
	@RequestMapping("/Mutuales")
	public ModelAndView MutualesModulo(Model model,HttpSession httpSession) {
		LOG.info("Iniciamos la configuracion del modulo.");
		session ses= new session(httpSession);	
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		LOG.info("Session correcta.");
		model.addAttribute("menuActual","Mantenedores");
		model.addAttribute("paginaActual", "Mutuales");
		model.addAttribute("content", "Mutuales");
		model.addAttribute("javaScriptPage","Mutuales");
		LOG.info("Se termina de configurar modulo.");
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/Mutuales")
	public ModelAndView MutualesContent(Model model,HttpSession httpSession) {
		LOG.info("Se empieza a obtener datos para cargar pagina.");
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/Mutuales");
	}
}
