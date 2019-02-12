package cl.expled.web;


import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;


import lib.security.session;
@Controller
public class Centralizacion {
	
	@RequestMapping("/Centralizacion")
	public ModelAndView CentralizacionModel(Model model, HttpSession httpSession) throws Exception {
		session ses = new session(httpSession);
		if (ses.isValid()) {
			return new ModelAndView("redirect:/webApp/login");
		}

		model.addAttribute("menuActual", "Centralizacion");
		model.addAttribute("paginaActual", "Centralizacion");
		model.addAttribute("content", "Centralizacion");
		model.addAttribute("javaScriptPage", "Centralizacion");
		model.addAttribute("idRandom", Math.random());

		return new ModelAndView("layout/_main");
	}

	@RequestMapping("/content/Centralizacion")
	public ModelAndView CentralizacionContent(Model model, HttpSession httpSession) throws Exception {
		session ses = new session(httpSession);
		if (ses.isValid()) {
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/Centralizacion");
	}
	
	@RequestMapping("/ImportarCentralizacion")
	public ModelAndView ImportarCentralizacionModel(Model model, HttpSession httpSession) throws Exception {
		session ses = new session(httpSession);
		if (ses.isValid()) {
			return new ModelAndView("redirect:/webApp/login");
		}

		model.addAttribute("menuActual", "Importar Centralizacion");
		model.addAttribute("paginaActual", "Importar Centralizacion");
		model.addAttribute("content", "ImportarCentralizacion");
		model.addAttribute("javaScriptPage", "ImportarCentralizacion");
		model.addAttribute("idRandom", Math.random());

		return new ModelAndView("layout/_main");
	}

	@RequestMapping("/content/ImportarCentralizacion")
	public ModelAndView ImportarCentralizacionContent(Model model, HttpSession httpSession) throws Exception {
		session ses = new session(httpSession);
		if (ses.isValid()) {
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/ImportarCentralizacion");
	}
	
	
	@RequestMapping("/CentralizacionGeneradas")
	public ModelAndView CentralizacionGeneradasModel(Model model, HttpSession httpSession) throws Exception {
		session ses = new session(httpSession);
		if (ses.isValid()) {
			return new ModelAndView("redirect:/webApp/login");
		}

		model.addAttribute("menuActual", "Centralizacion");
		model.addAttribute("paginaActual", "Detalle Centralizaciones");
		model.addAttribute("content", "CentralizacionGeneradas");
		model.addAttribute("javaScriptPage", "CentralizacionGeneradas");
		model.addAttribute("idRandom", Math.random());

		return new ModelAndView("layout/_main");
	}

	@RequestMapping("/content/CentralizacionGeneradas")
	public ModelAndView CentralizacionGeneradasContent(Model model, HttpSession httpSession) throws Exception {
		session ses = new session(httpSession);
		if (ses.isValid()) {
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/CentralizacionGeneradas");
	}
	
	
	
	
}
