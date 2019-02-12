package cl.expled.web;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import lib.SADB.ConsumoMaterialDB;
import lib.security.session;

@Controller
public class ConsumoMaterial {
private final static Logger LOG = LoggerFactory.getLogger(ConsumoMaterial.class);
	
	//Instanciamos clase que se conecta a BD
	ConsumoMaterialDB emp = new ConsumoMaterialDB();
	
	@RequestMapping("/ConsumoMaterial")
	public ModelAndView ConsumoMaterialModulo(Model model,HttpSession httpSession) {
		LOG.info("Iniciamos la configuracion del modulo.");
		session ses= new session(httpSession);	
		if (ses.isValid())
		{ 
			return new ModelAndView("redirect:/webApp/login");
		}
		LOG.info("Session correcta.");
		model.addAttribute("menuActual","Consumos");
		model.addAttribute("paginaActual", "Consumo de Materiales");
		model.addAttribute("content", "ConsumoMateriales");
		model.addAttribute("javaScriptPage","consumoMateriales");
		model.addAttribute("idRandom", Math.random());
		LOG.info("Se termina de configurar modulo.");
		return new ModelAndView("layout/_main");
	}
	
	@RequestMapping("/content/ConsumoMaterial")
	public ModelAndView ConsumoMaterialContent(Model model,HttpSession httpSession) {
		LOG.info("Se empieza a obtener datos para cargar pagina.");
		session ses= new session(httpSession);
		if (ses.isValid())
		{
			return new ModelAndView("redirect:/webApp/login");
		}
		return new ModelAndView("content/ConsumoMaterial");
	}
	
}
