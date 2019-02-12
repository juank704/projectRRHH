package cl.expled.web;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import lib.db.sw.InstitucionDB;
import lib.security.session;
@Controller
public class Institucion {
	//Instanciamos clase que se conecta a BD
		private final static Logger LOG = LoggerFactory.getLogger(Finiquitos.class);
		InstitucionDB In = new InstitucionDB();
		
		@RequestMapping("/Institucion")
		public ModelAndView InstitucionModulo(Model model,HttpSession httpSession) {
			LOG.info("Iniciamos la configuracion del modulo.");
			session ses= new session(httpSession);	
			if (ses.isValid())
			{
				return new ModelAndView("redirect:/webApp/login");
			}
			LOG.info("Session correcta.");
			model.addAttribute("menuActual","Mantenedores");
			model.addAttribute("content", "Institucion");
			model.addAttribute("javaScriptPage","Institucion");
			LOG.info("Se termina de configurar modulo.");
			return new ModelAndView("layout/_main");
		}
		
		@RequestMapping("/content/Institucion")
		public ModelAndView InstitucionContent(Model model,HttpSession httpSession) {
			LOG.info("Se empieza a obtener datos para cargar pagina.");
			session ses= new session(httpSession);
			if (ses.isValid())
			{
				return new ModelAndView("redirect:/webApp/login");
			}
			return new ModelAndView("content/Institucion");
		}
}
