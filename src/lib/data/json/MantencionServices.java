package lib.data.json;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import lib.SADB.MantecionDB;
import lib.SADB.RENDIMIENTO;
import lib.SADB.ServicioExterno;
import lib.classSA.RENDIMIENTO_DIARIO;
import lib.classSA.Servicio_Externo;
import lib.classSA.gestion_material;
import lib.classSA.motivo_ingreso;
import lib.classSA.reingreso_taller;
import lib.classSA.taller;
import lib.classSW.trabajador;
import lib.db.ConnectionDB;
import lib.security.session;

@Controller
public class MantencionServices {
	@RequestMapping(value = "/AGRO/GET_MOTIVO_INGRESO/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ArrayList<motivo_ingreso> GET_MOTIVO_INGRESO(HttpSession httpSession) throws Exception {
		session ses = new session(httpSession);
		
		ArrayList<motivo_ingreso> r = new ArrayList<motivo_ingreso>();
		if (ses.isValid()) {
			return r;
		}
		r = MantecionDB.GET_MOTIVO_INGRESO();
		return r;
	}
	@RequestMapping(value = "/AGRO/GET_OPERADOR/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ArrayList<trabajador> GET_OPERADOR(HttpSession httpSession) throws Exception {
		session ses = new session(httpSession);
		
		ArrayList<trabajador> r = new ArrayList<trabajador>();
		if (ses.isValid()) {
			return r;
		}
		r = MantecionDB.GET_OPERADOR();
		return r;
	}
	@RequestMapping(value = "/AGRO/ADD_TALLER/", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody boolean ADD_TALLER(@RequestBody  taller row, HttpSession httpSession) throws Exception {
		session ses = new session(httpSession);
		if (ses.isValid()) {
			return false;
		}
		return MantecionDB.ADD_TALLER(row);
	}

	@RequestMapping(value = "/AGRO/GET_TALLER_ALL/{campo}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ArrayList<taller> GET_TALLER_ALL(@PathVariable String[] campo ,HttpSession httpSession) throws Exception {
		session ses = new session(httpSession);
		ArrayList<taller> r = new ArrayList<taller>();
		if (ses.isValid()) {
			return r;
		}
		r = MantecionDB.GET_TALLER_ALL(campo);
		return r;
	}
	@RequestMapping(value = "/AGRO/CERRAR_INGRESO_TALLER/", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody boolean CERRAR_INGRESO_TALLER(@RequestBody taller row,HttpSession httpSession) throws Exception {
		session ses = new session(httpSession);
		if (ses.isValid()) {
			return false;
		}	
		return MantecionDB.CERRAR_INGRESO_TALLER(row);
	}
	@RequestMapping(value = "/AGRO/ADD_REINGRESO_TALLER/", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody boolean ADD_REINGRESO_TALLER(@RequestBody  reingreso_taller row, HttpSession httpSession) throws Exception {
		session ses = new session(httpSession);
		if (ses.isValid()) {
			return false;
		}
		return MantecionDB.ADD_REINGRESO_TALLER(row);
	}
	
	@RequestMapping(value = "/AGRO/UPDATE_RESERVA_SOLPED/{codigo}/{numero}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody boolean UPDATE_RESERVA_SOLPED(@PathVariable String codigo, @PathVariable String numero, HttpSession httpSession) throws Exception {
		session ses = new session(httpSession);
		if (ses.isValid()) {
			return false;
		}
		return MantecionDB.UPDATE_RESERVA_SOLPED(codigo, numero);
	}

	@RequestMapping(value = "/AGRO/INSERT_GESTION_MATERIAL/{codigo}/{numero}/{tipo}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody boolean INSERT_GESTION_MATERIAL(@PathVariable String codigo, @PathVariable String numero, @PathVariable int tipo, HttpSession httpSession) throws Exception {
		session ses = new session(httpSession);
		if (ses.isValid()) {
			return false;
		}
		return MantecionDB.INSERT_GESTION_MATERIAL(codigo, numero, tipo);
	}
	@RequestMapping(value = "/AGRO/UPDATE_GESTION_MATERIAL/{reserva}/{consumo}/{devolucion}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody boolean INSERT_GESTION_MATERIAL(@PathVariable String reserva, @PathVariable String consumo, @PathVariable String devolucion, HttpSession httpSession) throws Exception {
		session ses = new session(httpSession);
		if (ses.isValid()) {
			return false;
		}
		return MantecionDB.UPDATE_GESTION_MATERIAL(reserva, consumo, devolucion);
	}
	@RequestMapping(value = "/AGRO/GET_DETALLE_SAP/{folio}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ArrayList<gestion_material> GET_DETALLE_SAP(@PathVariable int folio,HttpSession httpSession) throws Exception {
		session ses = new session(httpSession);
		ArrayList<gestion_material> r = new ArrayList<gestion_material>();
		if (ses.isValid()) {
			return r;
		}
		r = MantecionDB.GET_DETALLE_SAP(folio);
		return r;
	}
	@RequestMapping(value = "/AGRO/DELETE_GESTION_MATERIAL/{id}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody boolean DELETE_GESTION_MATERIAL(@PathVariable int id,HttpSession httpSession) throws Exception {
		session ses = new session(httpSession);
		ArrayList<gestion_material> r = new ArrayList<gestion_material>();
		if (ses.isValid()) {
			return false;
		}
		return MantecionDB.DELETE_GESTION_MATERIAL(id);
	}
	@RequestMapping(value = "/AGRO/GET_MAQUINAS_EN_TALLER", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ArrayList<taller> GET_MAQUINAS_EN_TALLER(HttpServletRequest request,HttpSession httpSession) throws Exception {
		session ses = new session(httpSession);
		ArrayList<taller> r = new ArrayList<taller>();
		if (ses.isValid()) {
			return r;
		}
		String fecha = request.getParameter("FECHA");
		r = MantecionDB.GET_MAQUINAS_EN_TALLER(fecha);
		return r;
	}
	
	
}
