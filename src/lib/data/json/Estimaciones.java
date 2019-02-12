package lib.data.json;


import java.util.ArrayList;

import javax.servlet.http.HttpSession;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import lib.SADB.Categoria;
import lib.SADB.MAPA;
import lib.SADB.RENDIMIENTO;
import lib.classSA.CATEGORIA;
import lib.classSA.RENDIMIENTO_GENERAL;
import lib.classSA.estimacion_productiva;
import lib.classSA.parametros_estimacion;
import lib.security.session;
@Controller
public class Estimaciones {

	@RequestMapping(value = "/AGRO/ADD_Categoria/", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody boolean ADD_Categoria(@RequestBody  CATEGORIA row, HttpSession httpSession) throws Exception {
		session ses = new session(httpSession);
		if (ses.isValid()) {
			return false;
		}
		return Categoria.ADD_Categoria(row);
	}
	@RequestMapping(value = "/AGRO/ADD_PARAMETRO_ESTIMACION/", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody boolean ADD_PARAMETRO_ESTIMACION(@RequestBody parametros_estimacion row, HttpSession httpSession) throws Exception {
		session ses = new session(httpSession);
		if (ses.isValid()) {
			return false;
		}
		return Categoria.ADD_PARAMETRO_ESTIMACION(row);
	}
	@RequestMapping(value = "/AGRO/GET_PARAMETRO_ESTIMACION/{campo}/{especie}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ArrayList<parametros_estimacion> GET_PARAMETRO_ESTIMACION(@PathVariable String campo, @PathVariable int especie, HttpSession httpSession) throws Exception {
		session ses = new session(httpSession);
		
		ArrayList<parametros_estimacion> r = new ArrayList<parametros_estimacion>();
		if (ses.isValid()) {
			return r;
		}
		r = Categoria.GET_PARAMETRO_ESTIMACION(campo, especie);
		return r;
	}
	@RequestMapping(value = "/AGRO/DELETE_PARAMETRO_ESTIMACION/{codigo}", method = {RequestMethod.PUT,RequestMethod.POST})
	public @ResponseBody boolean DELETE_PARAMETRO_ESTIMACION(@PathVariable int codigo,HttpSession httpSession) throws Exception {
		
		session ses = new session(httpSession);
		
		if (ses.isValid()) {
			return false;
		}
		return Categoria.DELETE_PARAMETRO_ESTIMACION(codigo);

	}
	@RequestMapping(value = "/AGRO/ADD_ESTIMACION_PRODUCTIVA/", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody boolean ADD_ESTIMACION_PRODUCTIVA(@RequestBody estimacion_productiva row, HttpSession httpSession) throws Exception {
		session ses = new session(httpSession);
		if (ses.isValid()) {
			return false;
		}
		return Categoria.ADD_ESTIMACION_PRODUCTIVA(row);
	}
	@RequestMapping(value = "/AGRO/GET_ESTIMACION_PRODUCTIVA/{campo}/{especie}/{cuartel}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ArrayList<estimacion_productiva> GET_ESTIMACION_PRODUCTIVA(@PathVariable String campo, @PathVariable int especie, @PathVariable int cuartel, HttpSession httpSession) throws Exception {
		session ses = new session(httpSession);
		
		ArrayList<estimacion_productiva> r = new ArrayList<estimacion_productiva>();
		if (ses.isValid()) {
			return r;
		}
		r = Categoria.GET_ESTIMACION_PRODUCTIVA(campo, especie, cuartel);
		return r;
	}
}
