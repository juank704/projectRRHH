package lib.data.json.sw;

import javax.servlet.http.HttpSession;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import lib.security.session;

@Controller
public class AfiliaciondeTrabajadoresJSON {
	
	
	@RequestMapping(value = "/work/generateAfiliacionTrabajadoresPrevired/{empresa},{periodo}", method = { RequestMethod.PUT,
			RequestMethod.POST }, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody String createArchivoPlanoAfilacionPREVIRED(@PathVariable String empresa,@PathVariable String periodo, HttpSession httpSession)
			throws Exception {

		session ses = new session(httpSession);

		String r = "";
		if (ses.isValid()) {
			return "";

		}
		
		r = SWDB.AfiliaciondeTrabajadoresPREVIREDBD.createArchivoPlanoAfilacionPREVIRED(empresa,periodo);
		return r;

	}

}
