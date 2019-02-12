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
public class riego {
	@RequestMapping("/MapeoBloque")
	public ModelAndView MapeoBloque(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("google_map", "src='https://maps.googleapis.com/maps/api/js?key=AIzaSyA-gfDufUPg8zkB-VRiVUiudqMfTYWa3GY&libraries=drawing,geometry,places&callback=initMap' async defer");
		model.addAttribute("content", "MapeoBloque");
		model.addAttribute("menuActual", "Riego");
		model.addAttribute("paginaActual", "Mapeo de Bloque");
		model.addAttribute("javaScriptPage","MapeoBloque");
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/MapeoBloque")
	public ModelAndView MapeoBloqueContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/MapeoBloque");
	}
	
	
	@RequestMapping("/FactorDecision")
	public ModelAndView FactorDecision(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "FactorDecision");
		model.addAttribute("menuActual", "Riego");
		model.addAttribute("paginaActual", "Factor de Decisión");
		model.addAttribute("javaScriptPage","FactorDecision");
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/FactorDecision")
	public ModelAndView FactorDecisionContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/FactorDecision");
	}
	@RequestMapping("/Evaporacion")
	public ModelAndView Evaporacion(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "Evaporacion");
		model.addAttribute("menuActual", "Riego");
		model.addAttribute("paginaActual", "Evaporación");
		model.addAttribute("javaScriptPage","Evaporacion");
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/Evaporacion")
	public ModelAndView EvaporacionContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/Evaporacion");
	}
	@RequestMapping("/EvaporacionAcumulada")
	public ModelAndView EvaporacionAcumulada(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "EvaporacionAcumulada");
		model.addAttribute("menuActual", "Riego");
		model.addAttribute("paginaActual", "Evaporación Acumulada");
		model.addAttribute("javaScriptPage","EvaporacionAcumulada");
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/EvaporacionAcumulada")
	public ModelAndView EvaporacionAcumualadaContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/EvaporacionAcumulada");
	}
	@RequestMapping("/RegistroRiego")
	public ModelAndView RegistroRiego(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "RegistroRiego");
		model.addAttribute("menuActual", "Riego");
		model.addAttribute("paginaActual", "Registro e Riego");
		model.addAttribute("javaScriptPage","RegistroRiego");
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/RegistroRiego")
	public ModelAndView RegistroRiegoContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/RegistroRiego");
	}
}
