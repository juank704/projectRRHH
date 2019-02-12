package lib.data.json.sw;

import java.util.ArrayList;

import javax.servlet.http.HttpSession;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


import lib.classSW.CentroCostoTrabajador;
import lib.db.sw.CentroCostoTrabajadorDB;
import lib.security.session;

@Controller
public class CentroCostoTrabajadorJSON {


	//Insert CentroCosto
	@RequestMapping(value = "/work/insertCentroCostoTrabajador/", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody boolean insertCentroCostoTrabajador(@RequestBody CentroCostoTrabajador CentroCostoTrabajador, HttpSession httpSession) throws Exception{

		session ses = new session(httpSession);
		if(ses.isValid()){
			return false;
		}

		return CentroCostoTrabajadorDB.insertCentroCostoTrabajador(CentroCostoTrabajador);
	}


	//Obtener Todas las CentroCostoTrabajadores
	@RequestMapping(value = "/work/getCentroCostoTrabajador/", method = {RequestMethod.GET,RequestMethod.POST})
	public @ResponseBody ArrayList<CentroCostoTrabajador> getCentroCostoTrabajador(HttpSession httpSession) throws Exception {

		session ses = new session(httpSession);

		ArrayList<CentroCostoTrabajador> CentroCostoTrabajadorList = new ArrayList<CentroCostoTrabajador>();

		if (ses.isValid()) {
			return CentroCostoTrabajadorList;
		}

		CentroCostoTrabajadorList = CentroCostoTrabajadorDB.getCentroCostoTrabajador();
		return CentroCostoTrabajadorList;

	}

	//Obtener CentroCostoTrabajador por Id
	@RequestMapping(value = "/work/getCentroCostoTrabajadorById/{id}", method = {RequestMethod.GET})
	public @ResponseBody CentroCostoTrabajador getCentroCostoTrabajadorById(@PathVariable String id, HttpSession httpSession) throws Exception {

		session ses = new session(httpSession);
		CentroCostoTrabajador CentroCostoTrabajador = new CentroCostoTrabajador();

		if (ses.isValid()) {
			return CentroCostoTrabajador;
		}

		CentroCostoTrabajador = CentroCostoTrabajadorDB.getCentroCostoTrabajadorById(id);
		return CentroCostoTrabajador;

	}

	//Actualizar CentroCostoTrabajador
	@RequestMapping(value = "/work/updateCentroCostoTrabajador/", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody boolean updateTrabajador(@RequestBody CentroCostoTrabajador CentroCostoTrabajador,HttpSession httpSession) throws Exception {

		session ses = new session(httpSession);

		if (ses.isValid()) {
			return false;
		}
		return CentroCostoTrabajadorDB.updateCentroCostoTrabajador(CentroCostoTrabajador);
	}




}
