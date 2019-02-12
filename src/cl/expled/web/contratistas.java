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
public class contratistas {

	@RequestMapping("/Contratistas")
	public ModelAndView Contratistas(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Colaboradores");
		model.addAttribute("paginaActual", "Trabajador Contratista");
		model.addAttribute("content", "Contratistas");
		model.addAttribute("javaScriptPage","Contratistas");
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/Contratistas")
	public ModelAndView contratistasContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/Contratistas");
	}
	
	@RequestMapping("/trabajadorContratista")
	public ModelAndView trabajadorContratista(Model model, HttpSession httpSession) {
		
		model.addAttribute("menuActual", "Colaboradores");
		model.addAttribute("paginaActual", "Agregar Trabajador Contratista");
		model.addAttribute("content", "trabajadorContratista");
		model.addAttribute("javaScriptPage", "trabajadorContratista");
		
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/trabajadorContratista")
	public ModelAndView trabajadorContratistaContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/trabajadorContratista");
	}
	

}
