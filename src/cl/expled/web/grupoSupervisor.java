package cl.expled.web;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import lib.db.sw.GrupoSupervisorDB;
import lib.security.session;
@Controller
public class grupoSupervisor {
	//Instanciamos clase que se conecta a BD
			private final static Logger LOG = LoggerFactory.getLogger(grupoSupervisor.class);
			GrupoSupervisorDB emp = new GrupoSupervisorDB();
			
			@RequestMapping("/GrupoSupervisor")
			public ModelAndView GrupoSupervisorModulo(Model model,HttpSession httpSession) {
				LOG.info("Iniciamos la configuracion del modulo.");
				session ses= new session(httpSession);	
				if (ses.isValid())
				{
					return new ModelAndView("redirect:/webApp/login");
				}
				LOG.info("Session correcta.");
				model.addAttribute("menuActual","Supervisores");
				model.addAttribute("paginaActual", "Grupos Por Supervisor");
				model.addAttribute("content", "GrupoSupervisor");
				model.addAttribute("javaScriptPage","GrupoSupervisor");
				LOG.info("Se termina de configurar modulo.");
				return new ModelAndView("layout/_main");
			}
			
			@RequestMapping("/content/GrupoSupervisor")
			public ModelAndView GrupoSupervisorContent(Model model,HttpSession httpSession) {
				LOG.info("Se empieza a obtener datos para cargar pagina.");
				session ses= new session(httpSession);
				if (ses.isValid())
				{
					return new ModelAndView("redirect:/webApp/login");
				}
				return new ModelAndView("content/GrupoSupervisor");
			}
}
