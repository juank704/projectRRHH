package cl.expled.web;



import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;


import lib.db.sw.EmpresaDB;

import lib.security.session;

@Controller
public class Empresas {
	private final static Logger LOG = LoggerFactory.getLogger(Finiquitos.class);
	
	//Instanciamos clase que se conecta a BD
	EmpresaDB emp = new EmpresaDB();
	
	@RequestMapping("/Empresas")
	public ModelAndView EmpresaModulo(Model model,HttpSession httpSession) {
		LOG.info("Iniciamos la configuracion del modulo.");
		session ses= new session(httpSession);	
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		LOG.info("Session correcta.");
		model.addAttribute("menuActual","Mantenedores");
		model.addAttribute("paginaActual", "Empresas");
		model.addAttribute("content", "Empresas");
		model.addAttribute("javaScriptPage","Empresas");
		LOG.info("Se termina de configurar modulo.");
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/Empresas")
	public ModelAndView EmpresaModuloContent(Model model,HttpSession httpSession) {
		LOG.info("Se empieza a obtener datos para cargar pagina.");
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/Empresas");
	}
	
}
