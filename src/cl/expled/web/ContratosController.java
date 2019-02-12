package cl.expled.web;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import lib.classSW.ArticuloTerminoContrato;
import lib.classSW.IncisoTerminoContrato;
import lib.classSW.LetraTerminoContrato;
import lib.db.sw.ArticuloTerminoContratoDB;
import lib.db.sw.IncisoTerminoContratoDB;
import lib.db.sw.LetraTerminoContratoDB;
import lib.security.session;

@Controller
public class ContratosController {

	@RequestMapping("/ImpresionContrato")
	public ModelAndView ImpresionContrato(Model model, HttpSession httpSession) throws Exception {
		session ses = new session(httpSession);
		if (ses.isValid()) {
			return new ModelAndView("redirect:/webApp/login");
		}

		model.addAttribute("menuActual", "Impresión de Documentos");
		model.addAttribute("paginaActual", "Imprimir Contratos");
		model.addAttribute("content", "ImpresionContrato");
		model.addAttribute("javaScriptPage", "ImpresionContrato");
		model.addAttribute("idRandom", Math.random());

		return new ModelAndView("layout/_main");
	}

	@RequestMapping("/content/ImpresionContrato")
	public ModelAndView ImpresionContratoContent(Model model, HttpSession httpSession) throws Exception {
		session ses = new session(httpSession);
		if (ses.isValid()) {
			return new ModelAndView("redirect:/webApp/login");
		}

		// Articulos para Termino de Contrato
		List<ArticuloTerminoContrato> listaArticuloTerminoContrato = new ArrayList<ArticuloTerminoContrato>();
		listaArticuloTerminoContrato = ArticuloTerminoContratoDB.getArticuloTerminoContrato();
		model.addAttribute("listaArticuloTerminoContrato", listaArticuloTerminoContrato);

		// Inciso para Termino de Contrato
		List<IncisoTerminoContrato> listaIncisoTerminoContrato = new ArrayList<IncisoTerminoContrato>();
		listaIncisoTerminoContrato = IncisoTerminoContratoDB.getIncisoTerminoContrato();
		model.addAttribute("listaIncisoTerminoContrato", listaIncisoTerminoContrato);

		// Letra para Termino de Contrato
		List<LetraTerminoContrato> listaLetraTerminoContrato = new ArrayList<LetraTerminoContrato>();
		listaLetraTerminoContrato = LetraTerminoContratoDB.getLetraTerminoContrato();
		model.addAttribute("listaLetraTerminoContrato", listaLetraTerminoContrato);

		return new ModelAndView("content/ImpresionContrato");
	}
	
	
	@RequestMapping("/ContratacionMasiva")
	public ModelAndView ContratacionMasiva(Model model, HttpSession httpSession) throws Exception {
		session ses = new session(httpSession);
		if (ses.isValid()) {
			return new ModelAndView("redirect:/webApp/login");
		}

		model.addAttribute("menuActual", "Contratacion Masiva");
		model.addAttribute("paginaActual", "Contratacion Masiva");
		model.addAttribute("content", "ContratacionMasiva");
		model.addAttribute("javaScriptPage", "ContratacionMasiva");
		model.addAttribute("idRandom", Math.random());

		return new ModelAndView("layout/_main");
	}

	@RequestMapping("/content/ContratacionMasiva")
	public ModelAndView ContratacionMasivaContent(Model model, HttpSession httpSession) throws Exception {
		session ses = new session(httpSession);
		if (ses.isValid()) {
			return new ModelAndView("redirect:/webApp/login");
		}

		// Articulos para Termino de Contrato
		List<ArticuloTerminoContrato> listaArticuloTerminoContrato = new ArrayList<ArticuloTerminoContrato>();
		listaArticuloTerminoContrato = ArticuloTerminoContratoDB.getArticuloTerminoContrato();
		model.addAttribute("listaArticuloTerminoContrato", listaArticuloTerminoContrato);

		// Inciso para Termino de Contrato
		List<IncisoTerminoContrato> listaIncisoTerminoContrato = new ArrayList<IncisoTerminoContrato>();
		listaIncisoTerminoContrato = IncisoTerminoContratoDB.getIncisoTerminoContrato();
		model.addAttribute("listaIncisoTerminoContrato", listaIncisoTerminoContrato);

		// Letra para Termino de Contrato
		List<LetraTerminoContrato> listaLetraTerminoContrato = new ArrayList<LetraTerminoContrato>();
		listaLetraTerminoContrato = LetraTerminoContratoDB.getLetraTerminoContrato();
		model.addAttribute("listaLetraTerminoContrato", listaLetraTerminoContrato);

		return new ModelAndView("content/ContratacionMasiva");
		
	}
	
	
	
}
