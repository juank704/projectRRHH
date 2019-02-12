package cl.expled.web;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import lib.db.sw.BancoDB;
import lib.security.session;
@Controller
public class IndicadorMonetario {
private final static Logger LOG = LoggerFactory.getLogger(Finiquitos.class);
	
	//Instanciamos clase que se conecta a BD
	BancoDB emp = new BancoDB();
	
	@RequestMapping("/IndicadorMonetario")
	public ModelAndView IndicadorMonetarioModulo(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("menuActual", "Indicadores");
		model.addAttribute("paginaActual", "Monetarios");
		model.addAttribute("content", "IndicadorMonetario");
		model.addAttribute("javaScriptPage","IndicadorMonetarioJS");
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/IndicadorMonetario")
	public ModelAndView IndicadorMonetarioContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/IndicadorMonetario");
	}
	
}
