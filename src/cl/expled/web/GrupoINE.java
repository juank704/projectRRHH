package cl.expled.web;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import lib.db.sw.GrupoINEDB;
import lib.security.session;

@Controller
public class GrupoINE {
	//Instanciamos clase que se conecta a BD
		private final static Logger LOG = LoggerFactory.getLogger(GrupoINE.class);
		GrupoINEDB emp = new GrupoINEDB();
		
		@RequestMapping("/GrupoINE")
		public ModelAndView GrupoINEModulo(Model model,HttpSession httpSession) {
			LOG.info("Iniciamos la configuracion del modulo.");
			session ses= new session(httpSession);	
			if (ses.isValid())
			{
				return new ModelAndView("redirect:/webApp/login");
			}
			LOG.info("Session correcta.");
			model.addAttribute("menuActual","Mantenedores");
			model.addAttribute("paginaActual", "Grupo INE");
			model.addAttribute("content", "GrupoINE");
			model.addAttribute("javaScriptPage","GrupoINE");
			LOG.info("Se termina de configurar modulo.");
			return new ModelAndView("layout/_main");
		}
		
		@RequestMapping("/content/GrupoINE")
		public ModelAndView GrupoINEContent(Model model,HttpSession httpSession) {
			LOG.info("Se empieza a obtener datos para cargar pagina.");
			session ses= new session(httpSession);
			if (ses.isValid())
			{
				return new ModelAndView("redirect:/webApp/login");
			}
			return new ModelAndView("content/GrupoINE");
		}
}
