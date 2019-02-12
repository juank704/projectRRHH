package cl.expled.web;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import lib.SADB.MAPA;
import lib.classSA.CAMPO;
import lib.classSA.LABOR;
import lib.classSA.SESIONVAR;
import lib.classSW.CargarTipodePago;
import lib.classSW.sociedad;
import lib.security.session;
import lib.sesionSA.SESION;
@Controller
public class mantenedores {
	
	@RequestMapping("/categoria")
	public ModelAndView categoria(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "categoria");
		model.addAttribute("menuActual", "Estimaciones");
		model.addAttribute("paginaActual", "categoria");
		model.addAttribute("javaScriptPage","categoria");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/categoria")
	public ModelAndView categoriaContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/categoria");
	}
	@RequestMapping("/calibre")
	public ModelAndView calibre(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "calibre");
		model.addAttribute("menuActual", "Estimaciones");
		model.addAttribute("paginaActual", "Calibre");
		model.addAttribute("javaScriptPage","calibre");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/calibre")
	public ModelAndView calibreContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/calibre");
	}
	
	@RequestMapping("/faena")
	public ModelAndView faena(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "faena");
		model.addAttribute("menuActual", "Rendimiento");
		model.addAttribute("paginaActual", "Faena");
		model.addAttribute("javaScriptPage","faenaJS");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/faena")
	public ModelAndView faenaContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/faena");
	}
	@RequestMapping("/crear_calificacion")
	public ModelAndView crear_calificacion(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "crear_calificacion");
		model.addAttribute("menuActual", "Mantenedor");
		model.addAttribute("paginaActual", "Crear Calificacion");
		model.addAttribute("javaScriptPage","crear_calificacion");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/crear_calificacion")
	public ModelAndView crear_calificacionContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/crear_calificacion");
	}
	
	
	@RequestMapping("/bloqueo_faena")
	public ModelAndView bloqueo_faena(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "bloqueo_faena");
		model.addAttribute("menuActual", "Mantenedor");
		model.addAttribute("paginaActual", "Bloqueo Faena");
		model.addAttribute("javaScriptPage","bloqueo_faena");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/bloqueo_faena")
	public ModelAndView bloqueo_faenaContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/bloqueo_faena");
	}
	@RequestMapping("/Labor_Faena")
	public ModelAndView Labor_Faena(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}

		SESION mc = new SESION(httpSession);
		SESIONVAR s = mc.getView();
		ArrayList<LABOR> zona = new ArrayList<LABOR>();
		for(CAMPO c: s.getCampo()){
			if(zona.indexOf(c.getZona()) == -1){
				LABOR l = new LABOR();
				l.setZona(c.getZona());
				zona.add(l);
			}
		}
		
		model.addAttribute("zona", zona);
		model.addAttribute("content", "Labor_Faena");
		model.addAttribute("menuActual", "Mantenedor");
		model.addAttribute("paginaActual", "Labor_Faena ");
		model.addAttribute("javaScriptPage","Labor_Faena");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/Labor_Faena")
	public ModelAndView Labor_FaenaContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/Labor_Faena");
	}
	@RequestMapping("/Recorrido")
	public ModelAndView Recorrido(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "Recorrido");
		model.addAttribute("menuActual", "Mantenedor");
		model.addAttribute("paginaActual", "Recorrido");
		model.addAttribute("javaScriptPage","Recorrido");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/Recorrido") 
	public ModelAndView RecorridoContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/Recorrido"); 
	}

	@RequestMapping("/crear_estado")
	public ModelAndView crear_estado(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "crear_estado");
		model.addAttribute("menuActual", "Mantenedor");
		model.addAttribute("paginaActual", "Estado");
		model.addAttribute("javaScriptPage","crear_estado");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/crear_estado") 
	public ModelAndView crear_estadoContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/crear_estado"); 
	}	
	@RequestMapping("/Dotacion_Diaria")
	public ModelAndView Dotacion_Diaria(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "Dotacion_Diaria");
		model.addAttribute("menuActual", "Rendimiento");
		model.addAttribute("paginaActual", "Dotacion Diaria");
		model.addAttribute("javaScriptPage","Dotacion_Diaria");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/Dotacion_Diaria")
	public ModelAndView Dotacion_DiariaContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/Dotacion_Diaria");
	}
	@RequestMapping("/caja_especie")
	public ModelAndView caja_especie(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "caja_especie");
		model.addAttribute("menuActual", "Mantenedor");
		model.addAttribute("paginaActual", "Caja Por Especie");
		model.addAttribute("javaScriptPage","caja_especie");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/caja_especie") 
	public ModelAndView caja_especieContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/caja_especie"); 
	}
	@RequestMapping("/Especie_Campo")
	public ModelAndView Especie_Campo(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "Especie_Campo");
		model.addAttribute("menuActual", "Mantenedores");
		model.addAttribute("paginaActual", "Mantenedor Especie por Campo");
		model.addAttribute("javaScriptPage","Especie_Campo");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/Especie_Campo") 
	public ModelAndView Especie_CampoContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/Especie_Campo"); 
	}
	@RequestMapping("/Mantenedores_genericos")
	public ModelAndView Mantenedores_genericos(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "Mantenedores_genericos");
		model.addAttribute("menuActual", "Mantenedores");
		model.addAttribute("paginaActual", "Mantenedor Genérico");
		model.addAttribute("javaScriptPage","Mantenedores_genericos");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/Mantenedores_genericos") 
	public ModelAndView Mantenedores_genericosContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/Mantenedores_genericos"); 
	}
	@RequestMapping("/Mantenedor_especie")
	public ModelAndView Mantenedor_especie(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "Mantenedor_especie");
		model.addAttribute("menuActual", "Mantenedores");
		model.addAttribute("paginaActual", "Mantenedor Especie");
		model.addAttribute("javaScriptPage","Mantenedor_especie");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/Mantenedor_especie") 
	public ModelAndView Mantenedor_especieContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/Mantenedor_especie"); 
	}
	@RequestMapping("/Mantenedor_campo")
	public ModelAndView Mantenedor_campo(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("google_map", "src='https://maps.googleapis.com/maps/api/js?key=AIzaSyA-gfDufUPg8zkB-VRiVUiudqMfTYWa3GY&libraries=drawing,geometry,places&callback=initMap' async defer");
		model.addAttribute("content", "Mantenedor_campo");
		model.addAttribute("menuActual", "Mantenedores");
		model.addAttribute("paginaActual", "Mantenedor de Campo");
		model.addAttribute("javaScriptPage","Mantenedor_campo");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/Mantenedor_campo") 
	public ModelAndView Mantenedor_campoContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/Mantenedor_campo"); 
	}
	@RequestMapping("/Sueldos_Cargo")
	public ModelAndView Sueldos_Cargo(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "Sueldos_Cargo");
		model.addAttribute("menuActual", "Mantenedores");
		model.addAttribute("paginaActual", "Sueldos por Cargo");
		model.addAttribute("javaScriptPage","Sueldos_Cargo");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/Sueldos_Cargo")
	public ModelAndView Sueldos_CargoContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/Sueldos_Cargo");
	}
	@RequestMapping("/Mantenedor_variedades")
	public ModelAndView Mantenedor_variedades(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "Mantenedor_variedades");
		model.addAttribute("menuActual", "Mantenedores");
		model.addAttribute("paginaActual", "Variedades");
		model.addAttribute("javaScriptPage","Mantenedor_variedades");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/Mantenedor_variedades")
	public ModelAndView Mantenedor_variedadesContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/Mantenedor_variedades");
	}
	@RequestMapping("/Jefe_aplicacion")
	public ModelAndView Jefe_aplicacion(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "Jefe_aplicacion");
		model.addAttribute("menuActual", "Mantenedores");
		model.addAttribute("paginaActual", "Jefe de Aplicación");
		model.addAttribute("javaScriptPage","Jefe_aplicacion");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/Jefe_aplicacion")
	public ModelAndView Jefe_aplicacionContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/Jefe_aplicacion");
	}
	@RequestMapping("/campo_usuario")
	public ModelAndView campo_usuario(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		try {
			ArrayList<CAMPO> c = new ArrayList<CAMPO>();
			c = MAPA.GET_CAMPO_MANTENEDOR();
			model.addAttribute("campos", c);

			ArrayList<CAMPO> u = new ArrayList<CAMPO>();
			u = MAPA.GET_USUARIOS_MANTENEDOR();
			model.addAttribute("usuarios", u);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		model.addAttribute("content", "campo_usuario");
		model.addAttribute("menuActual", "Mantenedores");
		model.addAttribute("paginaActual", "Usuario Campo");
		model.addAttribute("javaScriptPage","campo_usuario");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/campo_usuario")
	public ModelAndView campo_usuarioContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/campo_usuario");
	}
}