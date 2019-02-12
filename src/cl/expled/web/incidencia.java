package cl.expled.web;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import lib.security.session;

/*
 * author: Crunchify.com
 * 
 */

@Controller
public class incidencia {
	@RequestMapping("/RegistroIncidencia")
	public ModelAndView ManoObra(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Incidencias");
		model.addAttribute("content", "RegistroIncidencia");
		model.addAttribute("paginaActual", "Registro de Incidencia");
		model.addAttribute("javaScriptPage","RegistroIncidencia");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/RegistroIncidencia")
	public ModelAndView ManoObraContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/RegistroIncidencia");
	}
	
	
}
