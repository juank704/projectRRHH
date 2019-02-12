package cl.expled.web;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import lib.db.sw.ImpuestoUnicoDB;
import lib.security.session;
@Controller
public class ImpuestoUnico {
	//Instanciamos clase que se conecta a BD
			private final static Logger LOG = LoggerFactory.getLogger(ImpuestoUnico.class);
			ImpuestoUnicoDB emp = new ImpuestoUnicoDB();
			
			@RequestMapping("/ImpuestoUnico")
			public ModelAndView ImpuestoUnicoModulo(Model model,HttpSession httpSession) {
				LOG.info("Iniciamos la configuracion del modulo.");
				session ses= new session(httpSession);	
				if (ses.isValid())
				{
					return new ModelAndView("redirect:/webApp/login");
				}
				LOG.info("Session correcta.");
				model.addAttribute("menuActual","Mantenedores");
				model.addAttribute("paginaActual", "Impuesto Unico");
				model.addAttribute("content", "ImpuestoUnico");
				model.addAttribute("javaScriptPage","ImpuestoUnico");
				LOG.info("Se termina de configurar modulo.");
				return new ModelAndView("layout/_main");
			}
			
			@RequestMapping("/content/ImpuestoUnico")
			public ModelAndView ImpuestoUnicoContent(Model model,HttpSession httpSession) {
				LOG.info("Se empieza a obtener datos para cargar pagina.");
				session ses= new session(httpSession);
				if (ses.isValid())
				{
					return new ModelAndView("redirect:/webApp/login");
				}
				return new ModelAndView("content/ImpuestoUnico");
			}
}
