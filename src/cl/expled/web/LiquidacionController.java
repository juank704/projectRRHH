package cl.expled.web;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import lib.classSW.sociedad;
import lib.db.sw.sociedadDB;
import lib.security.session;
import lib.struc.filterSql;

@Controller
public class LiquidacionController {

	@RequestMapping("/calculoMensualLiquidaciones")
	public ModelAndView calculoMensualLiquidacionesContract(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		
		
		model.addAttribute("menuActual", "Remuneraciones");
		model.addAttribute("paginaActual", "Cálculo Mensual Liquidaciones");
		model.addAttribute("content", "calculoMensualLiquidaciones");
		model.addAttribute("javaScriptPage","calculoMensualLiquidaciones");
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/calculoMensualLiquidaciones")
	public ModelAndView calculoMensualLiquidacionesContent(Model model,HttpSession httpSession) throws Exception {
		
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		
		// sociedades
		List<sociedad> listaSociedad = new ArrayList<>();
		listaSociedad = sociedadDB.getSociedad(new ArrayList<filterSql>());
		model.addAttribute("listaSociedad", listaSociedad);
		
		return new ModelAndView("content/calculoMensualLiquidaciones");
		
	}
	
	//Impresion Liquidacion
	
	@RequestMapping("/impresionLiquidacion")
	public ModelAndView impresionLiquidacion(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		
		
		model.addAttribute("menuActual", "Remuneraciones");
		model.addAttribute("paginaActual", "Impresión Liquidaciones");
		model.addAttribute("content", "impresionLiquidacion");
		model.addAttribute("javaScriptPage","impresionLiquidacion");
		model.addAttribute("idRandom", Math.random());
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/impresionLiquidacion")
	public ModelAndView impresionLiquidacionContent(Model model,HttpSession httpSession) throws Exception {
		
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		
		// sociedades
		List<sociedad> listaSociedad = new ArrayList<>();
		listaSociedad = sociedadDB.getSociedad(new ArrayList<filterSql>());
		model.addAttribute("listaSociedad", listaSociedad);
		
		return new ModelAndView("content/impresionLiquidacion");
		
	}
	
	
	//Previsualizar Liquidacion
	@RequestMapping("/previsualizarLiquidacion")
	public ModelAndView previsualizarLiquidacion(Model model,HttpSession httpSession) {
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		
		
		model.addAttribute("menuActual", "Remuneraciones");
		model.addAttribute("paginaActual", "Previzualizar Liquidaciones");
		model.addAttribute("content", "previsualizarLiquidacion");
		model.addAttribute("javaScriptPage","previsualizarLiquidacion");
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/previsualizarLiquidacion")
	public ModelAndView previsualizarLiquidacionContent(Model model,HttpSession httpSession) throws Exception {
		
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		
		// sociedades
		List<sociedad> listaSociedad = new ArrayList<>();
		listaSociedad = sociedadDB.getSociedad(new ArrayList<filterSql>());
		model.addAttribute("listaSociedad", listaSociedad);
		
		return new ModelAndView("content/previsualizarLiquidacion");
		
	}
	
	
	
	
	
	
}
