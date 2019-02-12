package cl.expled.web;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import lib.db.sw.CajaCompensacionDB;
import lib.security.session;

@Controller
public class Cargas {
private final static Logger LOG = LoggerFactory.getLogger(Cargas.class);
	
	//Instanciamos clase que se conecta a BD
	CajaCompensacionDB emp = new CajaCompensacionDB();
	
	@RequestMapping("/Cargas")
	public ModelAndView CargasModulo(Model model,HttpSession httpSession) {
		LOG.info("Iniciamos la configuracion del modulo.");
		session ses= new session(httpSession);	
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		LOG.info("Session correcta.");
		model.addAttribute("menuActual","Mantenedores");
		model.addAttribute("paginaActual", "Cargas");
		model.addAttribute("content", "Cargas");
		model.addAttribute("javaScriptPage","Cargas");
		LOG.info("Se termina de configurar modulo.");
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/Cargas")
	public ModelAndView CargasContent(Model model,HttpSession httpSession) {
		LOG.info("Se empieza a obtener datos para cargar pagina.");
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/Cargas");
	}
	
}
