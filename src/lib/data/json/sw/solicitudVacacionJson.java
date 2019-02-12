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

import lib.classSW.Campo;
import lib.classSW.SVExtended;
import lib.classSW.cva;
import lib.classSW.sociedad;
import lib.classSW.solicitudVacacion;
import lib.db.sw.solicitudVacacionDB;
import lib.security.session;

@Controller
public class solicitudVacacionJson {
	@RequestMapping(value = "/work/solicitudVacacion/createSolicitudVacaciones/" , method= {RequestMethod.PUT}, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody boolean insertSolicitudVacacion(@RequestBody solicitudVacacion solicitud,HttpSession httpSession) throws Exception 
    {
          boolean resp = false;
         session ses= new session(httpSession);
          if (ses.isValid()) {        	  
                 return false;
          }
          System.out.println(solicitud.getIdTrabajador());
          System.out.println(solicitud.getIdSolicitud());
          System.out.println(solicitud.getFechaSolicitud());
          System.out.println(solicitud.getFechaInicioSolicitud());
          System.out.println(solicitud.getFechaFinSolicitud());
          System.out.println(solicitud.getCodTrabajador());
          
          
          
          
          
          resp = solicitudVacacionDB.createSolicitudVacacion(solicitud);
        return resp;
    }
	 @RequestMapping(value = "/work/solicitudVacacion/updateSolicitudVacaciones/", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	    public @ResponseBody boolean updateSolicitudVacacion(@RequestBody solicitudVacacion solicitud,HttpSession httpSession) throws Exception {
	    	 boolean resp = false;
	    	 
			session ses = new session(httpSession);
			if (ses.isValid()) {
				return false;
			}
			
			resp = solicitudVacacionDB.updateSolicitudVacacion(solicitud);
	        return resp;
		}
	    //Obtener AFP por Id
	    @RequestMapping(value = "/work/solicitudVacacion/readSolicitudVacaciones/{id}", method = {RequestMethod.GET})
			public @ResponseBody solicitudVacacion readSolicitudVacacion(@PathVariable("id") int id, HttpSession httpSession) throws Exception {

				session ses = new session(httpSession);
				
				solicitudVacacion solicitud = solicitudVacacionDB.getSolicitudVacacionById(id);
				if (ses.isValid()) {
					return solicitud;
					}			
				return solicitud;

			}
	    //Obtener AFP por Id
	    @RequestMapping(value = "/work/solicitudVacacion/getBlankSolicitudVacaciones/", method = {RequestMethod.GET})
			public @ResponseBody solicitudVacacion getBlankSolicitudVacacion(HttpSession httpSession) throws Exception {

				session ses = new session(httpSession);
				solicitudVacacion solicitud = solicitudVacacionDB.getBlankSolicitudVacacion();
				
				if (ses.isValid()) {
					return solicitud;
					}			
				return solicitud;

			}
	  //Obtener Todas las solicitudes
	    @RequestMapping(value = "/work/solicitud/getSolicitudVacaciones/", method = {RequestMethod.GET})
		public @ResponseBody ArrayList<solicitudVacacion> getSolicitudVacaciones( HttpSession httpSession) throws Exception {
	    	
			session ses = new session(httpSession);
			ArrayList<solicitudVacacion> afps = new ArrayList<solicitudVacacion>();
			afps = solicitudVacacionDB.getAllsolicitudVacacionesT();
			if (ses.isValid()) {
				return afps;
			}		
			return afps;

		}
		 @RequestMapping(value = "/work/solicitud/getSolicitudes/", method = {RequestMethod.GET})
			public @ResponseBody ArrayList<solicitudVacacion> getSolicitudes( HttpSession httpSession) throws Exception {
		    	
				session ses = new session(httpSession);
				ArrayList<solicitudVacacion> sols = new ArrayList<solicitudVacacion>();
				sols = solicitudVacacionDB.getSolicitudes();
				if (ses.isValid()) {
					return sols;
				}		
				return sols;

			}
			@RequestMapping(value = "/work/solicitud/getEmpresas/", method = {RequestMethod.GET})
			public @ResponseBody ArrayList<sociedad> getEmpresas( HttpSession httpSession) throws Exception {
		    	
				session ses = new session(httpSession);
				ArrayList<sociedad> sols = new ArrayList<sociedad>();
				sols = solicitudVacacionDB.getEmpresas();
				if (ses.isValid()) {
					return sols;
				}		
				return sols;

			}
			@RequestMapping(value = "/work/solicitud/getZona/{Campo}", method = {RequestMethod.GET})
			public @ResponseBody ArrayList<Campo> getZona(@PathVariable("Campo") String Campo, HttpSession httpSession) throws Exception {
		    	
				session ses = new session(httpSession);
				ArrayList<Campo> zonas = new ArrayList<Campo>();
				zonas = solicitudVacacionDB.getZonas(Campo);
				if (ses.isValid()) {
					return zonas;
				}		
				return zonas;

			}
	    @RequestMapping(value = "/work/SolicitudVacaciones/deleteSolicitudVacacion/{id}", method = {RequestMethod.PUT})
		public @ResponseBody boolean deleteSolicitudVacacion(@PathVariable("id") int id ,HttpSession httpSession) throws Exception {
							
			session ses = new session(httpSession);
							
			if (ses.isValid()) {
				return false;
			}
							
			return solicitudVacacionDB.deleteSolicitudVacacionById(id);

		}
//relaciones

	    @RequestMapping(value = "/work/solicitudVacacion/createSolicitudVTrabajador/{id}" , method= {RequestMethod.PUT}, produces = MediaType.APPLICATION_JSON_VALUE)
	    public @ResponseBody boolean insertSolicitudVTrabajador(@PathVariable("id") int id  ,HttpSession httpSession) throws Exception 
	    {
	          boolean resp = false;
	         session ses= new session(httpSession);
	          if (ses.isValid()) {        	  
	                 return false;
	          }     
	          resp = solicitudVacacionDB.createSolicitudVacacionTrabajador(id);
	        return resp;
	    } 
	    @RequestMapping(value = "/work/solicitudVacacion/deleteSolicitudVTrabajador/{id}", method = {RequestMethod.PUT})
		public @ResponseBody boolean deleteSolicitudVTrabajador(@PathVariable("id") int id ,HttpSession httpSession) throws Exception {
							
			session ses = new session(httpSession);
							
			if (ses.isValid()) {
				return false;
			}
							
			return solicitudVacacionDB.deleteSolicitudVacacionById(id);

		}
	    @RequestMapping(value = "/work/solicitud/GetTrabajadoresBy/{Empresa}/{Campo}/{Grupo}/{Ceco}", method = {RequestMethod.GET})
		public @ResponseBody ArrayList<SVExtended> GetTrabajadoresBy(@PathVariable("Empresa") String Empresa ,@PathVariable("Campo") String Campo ,@PathVariable("Grupo") String Grupo ,@PathVariable("Ceco") String Ceco , HttpSession httpSession) throws Exception {
	    	
			session ses = new session(httpSession);
			ArrayList<SVExtended> lista=new ArrayList<SVExtended>();
			if (ses.isValid()) {
				return lista;
			}
						
			lista= solicitudVacacionDB.getTrabajadoresFiltering(Empresa, Campo, Grupo, Ceco);
			return lista;

		}
	    @RequestMapping(value = "/work/solicitud/getFechaFin/", method = {RequestMethod.POST})
		public @ResponseBody String getFechaFinSolicitud(@RequestBody cva Cva, HttpSession httpSession) throws Exception {
	    	
			session ses = new session(httpSession);
			
			if (ses.isValid()) {
				return "";
			}
						
			return solicitudVacacionDB.getFechaFinal(Cva);

		}
	    
}
