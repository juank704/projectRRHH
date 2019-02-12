package cl.expled.web;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import lib.security.session;

@Controller
public class ImportadorController {

	@RequestMapping("/ImportadorProcesoExcel")
	public ModelAndView ImportadorProcesoExcel(Model model, HttpSession httpSession) throws Exception {
		session ses = new session(httpSession);
		if (ses.isValid()) {
			return new ModelAndView("redirect:/webApp/login");
		}

		model.addAttribute("menuActual", "ImportadorProcesoExcel");
		model.addAttribute("paginaActual", "ImportadorProcesoExcel");
		model.addAttribute("content", "ImportadorProcesoExcel");
		model.addAttribute("javaScriptPage", "ImportadorProcesoExcel");
		model.addAttribute("idRandom", Math.random());

		return new ModelAndView("layout/_main");
	}

	@RequestMapping("/content/ImportadorProcesoExcel")
	public ModelAndView ImportadorProcesoExcelContent(Model model, HttpSession httpSession) throws Exception {
		session ses = new session(httpSession);
		if (ses.isValid()) {
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/ImportadorProcesoExcel");
	}
	
	
	
	
	
}
