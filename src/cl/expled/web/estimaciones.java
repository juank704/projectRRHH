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
public class estimaciones {
	@RequestMapping("/ParametrosEstimacion")
	public ModelAndView ParametrosEstimacion(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "ParametrosEstimacion");
		model.addAttribute("menuActual", "Estimaciones");
		model.addAttribute("paginaActual", "Parametros");
		model.addAttribute("javaScriptPage","ParametrosEstimacion");
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/ParametrosEstimacion")
	public ModelAndView ParametrosEstimacionContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/ParametrosEstimacion");
	}
	
	@RequestMapping("/EstimacionProductiva")
	public ModelAndView EstimacionProductiva(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "EstimacionProductiva");
		model.addAttribute("menuActual", "Estimaciones");
		model.addAttribute("paginaActual", "Estimación Productiva");
		model.addAttribute("javaScriptPage","EstimacionProductiva");
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/EstimacionProductiva")
	public ModelAndView EstimacionProductivaContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/EstimacionProductiva");
	}
	
	@RequestMapping("/EstimacionDias")
	public ModelAndView EstimacionDias(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "EstimacionDias");
		model.addAttribute("menuActual", "Estimaciones");
		model.addAttribute("paginaActual", "Estimación Dias");
		model.addAttribute("javaScriptPage","EstimacionDias");
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/EstimacionDias")
	public ModelAndView EstimacionDiasContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/EstimacionDias");
	}
	
	@RequestMapping("/EstimacionComercial")
	public ModelAndView EstimacionComercial(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "EstimacionComercial");
		model.addAttribute("menuActual", "Estimaciones");
		model.addAttribute("paginaActual", "Estimación Comercial");
		model.addAttribute("javaScriptPage","EstimacionComercial");
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/EstimacionComercial")
	public ModelAndView EstimacionComercialContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/EstimacionComercials");
	}
	
	@RequestMapping("/FlujoProceso")
	public ModelAndView FlujoProceso(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "FlujoProceso");
		model.addAttribute("menuActual", "Estimaciones");
		model.addAttribute("paginaActual", "Flujo Proceso");
		model.addAttribute("javaScriptPage","FlujoProceso");
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/FlujoProceso")
	public ModelAndView FlujoProcesoContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/FlujoProceso");
	}
}
