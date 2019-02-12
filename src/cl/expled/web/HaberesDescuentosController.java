package cl.expled.web;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import lib.security.session;

@Controller
public class HaberesDescuentosController {

	@RequestMapping("/ImportarHaberesDescuentos")
	public ModelAndView ImportarHaberesDescuentosModel(Model model, HttpSession httpSession) throws Exception {
		session ses = new session(httpSession);
		if (ses.isValid()) {
			return new ModelAndView("redirect:/webApp/login");
		}

		model.addAttribute("menuActual", "Importar Haberes Descuentos");
		model.addAttribute("paginaActual", "Importar Haberes Descuentos");
		model.addAttribute("content", "ImportarHaberesDescuentos");
		model.addAttribute("javaScriptPage", "ImportarHaberesDescuentos");
		model.addAttribute("idRandom", Math.random());

		return new ModelAndView("layout/_main");
	}

	@RequestMapping("/content/ImportarHaberesDescuentos")
	public ModelAndView ImportarHaberesDescuentosContent(Model model, HttpSession httpSession) throws Exception {
		session ses = new session(httpSession);
		if (ses.isValid()) {
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/ImportarHaberesDescuentos");
	}
	
	
}
