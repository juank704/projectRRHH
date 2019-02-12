package lib.data.json.sw;

import java.util.ArrayList;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import lib.classSW.VacacionesTrabajador;
import lib.db.sw.VacacionesDB;
import lib.security.session;
import lib.struc.filterSql;

@Controller
public class VacacionesJSON {

	// Obtener Todos los Trabajador con sus respectivos contratos
	@RequestMapping(value = "/work/getAllVacacionesWithFilter/", method = { RequestMethod.GET })
	public @ResponseBody ArrayList<VacacionesTrabajador> getAllVacacionesWithFilter(HttpSession httpSession, HttpServletRequest request) throws Exception {

		//Crear la lista de Trabajadores vacia
		ArrayList<VacacionesTrabajador> vacacionesTrabajador = new ArrayList<VacacionesTrabajador>();
		session ses = new session(httpSession);

		if (ses.isValid()) {
			return vacacionesTrabajador;
		}

		//Obtener todos los parametros del URL
		Map<String, String[]> parameters = request.getParameterMap();

		ArrayList<filterSql> filter = new ArrayList<filterSql>();

		//Obtener todos los parametros enviados por el URL
		for (String key : parameters.keySet()) {
			String[] vals = parameters.get(key);
			//Obtener cada uno de los parametros y valores
			for (String val : vals) {
				filterSql fil = new filterSql();
				fil.setCampo(key);
				fil.setValue(val);
				//Añadir campo y valor 
				filter.add(fil);
			}
		}

		vacacionesTrabajador = VacacionesDB.getAllVacacionesWithFilter(filter);
		return vacacionesTrabajador;

	}
	
	
	
	
}
