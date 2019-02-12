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
public class mantencion {

	
	@RequestMapping("/IngresoTaller")
	public ModelAndView IngresoTaller(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "IngresoTaller");
		model.addAttribute("menuActual", "Mantención");
		model.addAttribute("paginaActual", "Ingreso de Taller");
		model.addAttribute("javaScriptPage","IngresoTaller");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/IngresoTaller")
	public ModelAndView IngresoTallerContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/IngresoTaller");
	}
//	
	@RequestMapping("/servicio_externo")
	public ModelAndView servicio_externo(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "servicio_externo");
		model.addAttribute("menuActual", "Mantención");
		model.addAttribute("paginaActual", "Servicio Externo");
		model.addAttribute("javaScriptPage","servicio_externo");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/servicio_externo")
	public ModelAndView servicio_externoContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/servicio_externo");
	}
	
	@RequestMapping("/packing_frigorifico")
	public ModelAndView packing_frigorifico(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "packing_frigorifico");
		model.addAttribute("menuActual", "Mantención");
		model.addAttribute("paginaActual", "Ingreso Packing Frigorífico");
		model.addAttribute("javaScriptPage","packing_frigorifico");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/packing_frigorifico")
	public ModelAndView packing_frigorificoContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/packing_frigorifico");
	}
	
	@RequestMapping("/Maestro_MotivoIngreso")
	public ModelAndView Maestro_MotivoIngreso(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "Maestro_MotivoIngreso");
		model.addAttribute("menuActual", "Mantención");
		model.addAttribute("paginaActual", "Maestro Motivo de Ingresos");
		model.addAttribute("javaScriptPage","Maestro_MotivoIngreso");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/Maestro_MotivoIngreso")
	public ModelAndView Maestro_MotivoIngresoContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/Maestro_MotivoIngreso");
	}
	
	@RequestMapping("/IngresoRiego")
	public ModelAndView IngresoRiego(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "IngresoRiego");
		model.addAttribute("javaScriptPage","IngresoRiego");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/IngresoRiego")
	public ModelAndView IngresoRiegoContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/IngresoRiego");
	}
	
	@RequestMapping("/IngresoFrigorifico")
	public ModelAndView IngresoFrigorifico(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "IngresoFrigorifico");
		model.addAttribute("javaScriptPage","IngresoFrigorifico");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/IngresoFrigorifico")
	public ModelAndView IngresoFrigorificoContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/IngresoFrigorifico");
	}
	
	@RequestMapping("/ReservaStock")
	public ModelAndView ReservaStock(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "ReservaStock");
		model.addAttribute("javaScriptPage","ReservaStock");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/ReservaStock")
	public ModelAndView ReservaStockContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/ReservaStock");
	}

	@RequestMapping("/ServicioExterno")
	public ModelAndView ServicioExterno(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "ServicioExterno");
		model.addAttribute("javaScriptPage","ServicioExterno");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	@RequestMapping("/content/ServicioExterno")
	public ModelAndView ServicioExternoContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/ServicioExterno");
	}
	
	@RequestMapping("/MantencionDocumentos")
	public ModelAndView MantencionDocumentos(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "documentos");
		model.addAttribute("javaScriptPage","documentoMantencion");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/MantencionDocumentos")
	public ModelAndView MantencionDocumentosContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/documentos");
	}

	@RequestMapping("/ListaMantencion")
	public ModelAndView ListaMantencion(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "ListaMantencion");
		model.addAttribute("menuActual", "Mantención");
		model.addAttribute("paginaActual", "Lista de Ingresos");
		model.addAttribute("javaScriptPage","ListaMantencion");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/ListaMantencion")
	public ModelAndView ListaMantencionContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/ListaMantencion");
	}
	
	@RequestMapping("/ConsumoRepuesto")
	public ModelAndView ConsumoRepuesto(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "ConsumoRepuesto");
		model.addAttribute("menuActual", "Mantención");
		model.addAttribute("paginaActual", "Consumo de Repuestos");
		model.addAttribute("javaScriptPage","ConsumoRepuesto");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/ConsumoRepuesto")
	public ModelAndView ConsumoRepuestoContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/ConsumoRepuesto");
	}

	@RequestMapping("/listado_maquinarias")
	public ModelAndView listado_maquinarias(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		model.addAttribute("content", "listado_maquinarias");
		model.addAttribute("menuActual", "Mantención");
		model.addAttribute("paginaActual", "Listado de Maquinaras");
		model.addAttribute("javaScriptPage","listado_maquinarias");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/listado_maquinarias")
	public ModelAndView listado_maquinariasContent(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/listado_maquinarias");
	}
}
