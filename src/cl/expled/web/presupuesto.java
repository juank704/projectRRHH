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
public class presupuesto {
	@RequestMapping("/ManoObra")
	public ModelAndView ManoObra(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "ManoObra");
		model.addAttribute("javaScriptPage","ManoObra");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/ManoObra")
	public ModelAndView ManoObraContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/ManoObra");
	}
	
	@RequestMapping("/Operaciones")
	public ModelAndView Operaciones(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "Operaciones");
		model.addAttribute("javaScriptPage","Operaciones");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/Operaciones")
	public ModelAndView OperacionesContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/Operaciones");
	}
	
}
