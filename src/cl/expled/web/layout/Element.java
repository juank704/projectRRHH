package cl.expled.web.layout;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import lib.security.session;

@Controller
public class Element {
	
	
	
	
	
	@RequestMapping(value = "/layout_menu/{id:.+}", method = { RequestMethod.GET })
	public ModelAndView menu(Model model, @PathVariable String id, HttpSession httpSession) {
		session ses = new session(httpSession);
		if (ses.isValid()) {
			return new ModelAndView("redirect:/webApp/login");
		}

		//System.out.println("PERFIL::::::::::::::::::::::::::::" + id + "=" + ses.getIdPerfil());

		String mMantenedor = "";
		
	

		
		
		System.out.println("MENU: "+id);
		System.out.println(ses.getIdPerfil());
		//model.addAttribute("mantenedor", mMantenedor);
		//ses.setIdPerfil(1);
		menu m= new menu();
		String[] strMenu= m.create(0,id,ses.getIdPerfil());
		
		model.addAttribute("menu", strMenu[1]);
		model.addAttribute("hola", "2");

		return new ModelAndView("layout/menu");
	}

	@RequestMapping("/layout_user")
	public ModelAndView menu_user(Model model, HttpSession httpSession) {
		session ses = new session(httpSession);
		if (ses.isValid()) {
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("nombre", ses.getValue("nombre"));
		String message = "esto es una maldita prueba";
		return new ModelAndView("layout/user", "message", message);
	}

	@RequestMapping("/layout_alert")
	public ModelAndView Alert(Model model, HttpSession httpSession) {
		session ses = new session(httpSession);
		if (ses.isValid()) {
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("id", "jajajajaj :)");
		String message = "esto es una maldita prueba";
		return new ModelAndView("layout/alert", "message", message);
	}

	@RequestMapping("/layout_config")
	public ModelAndView Config(Model model, HttpSession httpSession) {
		session ses = new session(httpSession);
		if (ses.isValid()) {
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("id", "jajajajaj :)");
		String message = "esto es una maldita prueba";
		return new ModelAndView("layout/config", "message", message);
	}

}
