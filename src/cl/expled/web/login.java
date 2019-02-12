package cl.expled.web;

import java.util.Map;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import lib.SADB.INCIDENCIAS;
import lib.db.conSimpleAgro;
import lib.db.simpleagroDB;
import lib.sesionSA.SESION;
import lib.struc.loginApp;


/*
 * author: Crunchify.com
 * 
 */

@Controller
public class login extends HttpServlet{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public HttpSession sesion;
	@RequestMapping(value = "/login", method = { RequestMethod.POST, RequestMethod.GET })
	public ModelAndView loginPage(Model model, HttpServletRequest request, HttpSession httpSession, HttpServletResponse response) {
		Map<String, String[]> parameters = request.getParameterMap();
		
		
		try {
			sesion = request.getSession();
			String username =new String(parameters.get("username")[0].getBytes("ISO-8859-1"),"UTF-8");
			String pass     	=new String(parameters.get("password")[0].getBytes("ISO-8859-1"),"UTF-8");
			
			loginApp us = conSimpleAgro.getLogin(username, pass);
			if ( us != null)  {
				sesion.setAttribute("usuario", us);
				sesion.setAttribute("perfil", us.perfilText);
				sesion.setAttribute("id",us.getId());
				lib.security.session  ses= new lib.security.session(httpSession);
				ses.setIdUser(us.getId());
				ses.setIdPerfil(us.getPerfil());
				ses.setGrupoCompra(us.getGrupoCompra());
				ses.setSolicitante(us.getSolicitante());
				ses.setRolPrivado(us.getRolPrivado());
				ses.init();
				if(us.getPerfilText().equals("work")){
					SESION mc= new SESION(httpSession);
					mc.addIdUser(us.getId());					
					mc.addUser(username);
					mc.addPass(pass);
					mc.addGrupoCompra(us.getGrupoCompra());
					mc.addSolicitante(us.getSolicitante());
					mc.addRolPrivado(us.getRolPrivado());
					simpleagroDB.getCAMPO(httpSession, us.getId());
					simpleagroDB.getSECTOR(httpSession);
					simpleagroDB.getESPECIE(httpSession);
					simpleagroDB.getVARIEDAD(httpSession);
					simpleagroDB.getBloqueo(httpSession);
					INCIDENCIAS.GET_INCIDENCIA(httpSession);
					sesion.setAttribute("actualSesion", mc.getView());
					model.addAttribute("cuartel", simpleagroDB.getCUARTEL(httpSession));
					return new ModelAndView("redirect:/webApp/index");
				}
				if(us.getPerfilText().equals("agro") || us.getPerfilText().equals("admin")){
					SESION mc= new SESION(httpSession);
					mc.addIdUser(us.getId());					
					mc.addUser(username);
					mc.addPass(pass);
					mc.addGrupoCompra(us.getGrupoCompra());
					mc.addSolicitante(us.getSolicitante());
					mc.addRolPrivado(us.getRolPrivado());
					simpleagroDB.getCAMPO(httpSession, us.getId());
					simpleagroDB.getSECTOR(httpSession);
					simpleagroDB.getESPECIE(httpSession);
					simpleagroDB.getVARIEDAD(httpSession);
					simpleagroDB.getBloqueo(httpSession);
					INCIDENCIAS.GET_INCIDENCIA(httpSession);
					sesion.setAttribute("actualSesion", mc.getView());
					model.addAttribute("cuartel", simpleagroDB.getCUARTEL(httpSession));
					return new ModelAndView("redirect:/webApp/index");
				}
				return new ModelAndView("redirect:/webApp/index");
			} else {
				return new ModelAndView("login");
			}
		} catch (Exception e) {
			// TODO: handle exception
			model.addAttribute("alerta", "display-hide");
			return new ModelAndView("login");
		}
	}

	/*@RequestMapping("/index")
	public ModelAndView helloWorld2(Model model) {
		model.addAttribute("id", "jajajajaj :)");
		String message = "esto es una maldita prueba";
		return new ModelAndView("index", "message", message);
	}*/
	
	@RequestMapping("/exit")
	public ModelAndView exit(Model model, HttpSession httpSession) {
		lib.security.session  ses= new lib.security.session(httpSession);
		ses.close();
		return new ModelAndView("redirect:/webApp/login");
	}

}