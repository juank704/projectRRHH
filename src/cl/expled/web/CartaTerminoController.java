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
public class CartaTerminoController {

	@RequestMapping("/CartaTermino")
	public ModelAndView CartaTermino(Model model, HttpSession httpSession) throws Exception {
		session ses = new session(httpSession);
		if (ses.isValid()) {
			return new ModelAndView("redirect:/webApp/login");
		}

		model.addAttribute("menuActual", "Finiquito");
		model.addAttribute("paginaActual", "Carta de Termino");
		model.addAttribute("content", "CartaTermino");
		model.addAttribute("javaScriptPage", "CartaTermino");
		model.addAttribute("idRandom", Math.random());

		return new ModelAndView("layout/_main");
	}

	@RequestMapping("/content/CartaTermino")
	public ModelAndView CartaTerminoContent(Model model, HttpSession httpSession) throws Exception {
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

		return new ModelAndView("content/CartaTermino");
	}

	@RequestMapping("/eliminarCartaTermino")
	public ModelAndView EliminarCartaTermino(Model model, HttpSession httpSession) throws Exception {
		session ses = new session(httpSession);
		if (ses.isValid()) {
			return new ModelAndView("redirect:/webApp/login");
		}

		model.addAttribute("menuActual", "Finiquito");
		model.addAttribute("paginaActual", "Eliminar Carta de Termino");
		model.addAttribute("content", "eliminarCartaTermino");
		model.addAttribute("javaScriptPage", "eliminarCartaTermino");
		model.addAttribute("idRandom", Math.random());

		return new ModelAndView("layout/_main");
	}

	@RequestMapping("/content/eliminarCartaTermino")
	public ModelAndView EliminarCartaTerminoContent(Model model, HttpSession httpSession) throws Exception {
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

		return new ModelAndView("content/eliminarCartaTermino");
	}
	
	
	@RequestMapping("/ImprimirCartaTermino")
	public ModelAndView ImprimirCartaTermino(Model model, HttpSession httpSession) throws Exception {
		session ses = new session(httpSession);
		if (ses.isValid()) {
			return new ModelAndView("redirect:/webApp/login");
		}

		model.addAttribute("menuActual", "Impresión de Documentos");
		model.addAttribute("paginaActual", "Imprimir Carta de Termino");
		model.addAttribute("content", "ImprimirCartaTermino");
		model.addAttribute("javaScriptPage", "ImprimirCartaTermino");
		model.addAttribute("idRandom", Math.random());

		return new ModelAndView("layout/_main");
	}

	@RequestMapping("/content/ImprimirCartaTermino")
	public ModelAndView ImprimirCartaTerminoContent(Model model, HttpSession httpSession) throws Exception {
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

		return new ModelAndView("content/ImprimirCartaTermino");
	}
	
	

}
