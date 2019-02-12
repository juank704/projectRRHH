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


import lib.SADB.LISTA_APLICACIONES;
import lib.SADB.ORDEN_APLICA;
import lib.SADB.PROGRAMA_FITOSANITARIO;
import lib.SADB.material;
import lib.classSA.CONFIRMACION_APLICACION;
import lib.classSA.DETALLE_CONSUMO;
import lib.classSA.FILTRO_PF;
import lib.classSA.IMPLEMENTO_OBJ;
import lib.classSA.LIBRO_CAMPO;
import lib.classSA.LISTA_APLICACIONES_OBJ;
import lib.classSA.MAQUINARIA_OBJ;
import lib.classSA.MAQUINARIA_PF;
import lib.classSA.MATERIAL;
import lib.classSA.MATERIAL_PF;
import lib.classSA.MERCADO_OBJ;
import lib.classSA.ORDEN_APLICACION;
import lib.classSA.PROGRA_FITOSANITARIO;
import lib.security.session;

@Controller
public class SA_Lista_Aplicaciones {
	

	
	//----------------------------------LISTA_APLICACIONES--------------------------------------------------------
//		SElECT
		@RequestMapping(value = "/AGRO/LISTA_APLICACIONES_GETLISTA", method = {RequestMethod.GET, RequestMethod.POST}, produces = MediaType.APPLICATION_JSON_VALUE)
		public @ResponseBody ArrayList<LISTA_APLICACIONES_OBJ> GETLISTA_APLICACION( HttpSession httpSession) throws Exception {
			session ses = new session(httpSession);
			ArrayList<LISTA_APLICACIONES_OBJ> r = new ArrayList<LISTA_APLICACIONES_OBJ>();
			if (ses.isValid()) {
				return r;
			}
			r = LISTA_APLICACIONES.getListaAplicaciones(); 
			
			return r;
		}
	
		@RequestMapping(value = "/AGRO/LISTA_APLICACIONES_PENDIENTE", method = {RequestMethod.GET, RequestMethod.POST}, produces = MediaType.APPLICATION_JSON_VALUE)
		public @ResponseBody ArrayList<LISTA_APLICACIONES_OBJ> LISTA_APLICACIONES_PENDIENTE( HttpSession httpSession) throws Exception {
			session ses = new session(httpSession);
			ArrayList<LISTA_APLICACIONES_OBJ> r = new ArrayList<LISTA_APLICACIONES_OBJ>();
			if (ses.isValid()) {
				return r;
			}
			r = LISTA_APLICACIONES.getListaAplicacionesPendientes(); 
			
			return r;
		}
		
//		SElECT
		@RequestMapping(value = "/AGRO/LISTA_APLICACIONES_DETALLE/{id}", method = {RequestMethod.GET, RequestMethod.POST}, produces = MediaType.APPLICATION_JSON_VALUE)
		public @ResponseBody LISTA_APLICACIONES_OBJ GETDETALLE_APLICACION(@PathVariable int id , HttpSession httpSession) throws Exception {
			session ses = new session(httpSession);
			LISTA_APLICACIONES_OBJ r = new LISTA_APLICACIONES_OBJ();
			if (ses.isValid()) {
				return r;
			}
			r = LISTA_APLICACIONES.getDetalleAplicacion(id);
			
			return r;
		}

		
		//SElECT
		@RequestMapping(value = "/AGRO/LISTA_ORDEN_DETALLE/{id}", method = {RequestMethod.GET, RequestMethod.POST}, produces = MediaType.APPLICATION_JSON_VALUE)
		public @ResponseBody LISTA_APLICACIONES_OBJ GETDETALLE_ORDEN(@PathVariable int id , HttpSession httpSession) throws Exception {
			session ses = new session(httpSession);
			LISTA_APLICACIONES_OBJ r = new LISTA_APLICACIONES_OBJ();
//			if (ses.isValid()) {
//				return r;
//			}
			r = LISTA_APLICACIONES.getDetalleAplicacionbyOrden(id);
			
			return r;
		}
		
		//SElECT
				@RequestMapping(value = "/AGRO/LISTA_ORDEN_DETALLE2/{id}", method = {RequestMethod.GET, RequestMethod.POST}, produces = MediaType.APPLICATION_JSON_VALUE)
				public @ResponseBody LISTA_APLICACIONES_OBJ GETDETALLE_ORDEN2(@PathVariable int id , HttpSession httpSession) throws Exception {
					session ses = new session(httpSession);
					LISTA_APLICACIONES_OBJ r = new LISTA_APLICACIONES_OBJ();
					if (ses.isValid()) {
						return r;
					}
					r = LISTA_APLICACIONES.getDetalleAplicacionbyOrden2(id);
					
					return r;
				}
		
		//SElECT
		@RequestMapping(value = "/AGRO/DETALLE_MATERIAL/{id}", method = {RequestMethod.GET, RequestMethod.POST}, produces = MediaType.APPLICATION_JSON_VALUE)
		public @ResponseBody MATERIAL DETALLE_MATERIAL(@PathVariable int id , HttpSession httpSession) throws Exception {
			session ses = new session(httpSession);
			MATERIAL r = new MATERIAL();
			if (ses.isValid()) {
				return r;
			}
			r = material.GETMATDETALLE(id);
			
			return r;
		}
		
//		SElECT
		@RequestMapping(value = "/AGRO/GETMERCADOS", method = {RequestMethod.GET, RequestMethod.POST}, produces = MediaType.APPLICATION_JSON_VALUE)
		public @ResponseBody ArrayList<MERCADO_OBJ> GETMERCADOS( HttpSession httpSession) throws Exception {
			session ses = new session(httpSession);
			ArrayList<MERCADO_OBJ> r = new ArrayList<MERCADO_OBJ>();
			if (ses.isValid()) {
				return r;
			}
			r = lib.SADB.MERCADO.getMercados();
			
			return r;
		}
		
//		SElECT
		@RequestMapping(value = "/AGRO/GETMAQUINARIAS", method = {RequestMethod.GET, RequestMethod.POST}, produces = MediaType.APPLICATION_JSON_VALUE)
		public @ResponseBody ArrayList<MAQUINARIA_OBJ> GETMAQUINARIAS( HttpSession httpSession) throws Exception {
			session ses = new session(httpSession);
			ArrayList<MAQUINARIA_OBJ> r = new ArrayList<MAQUINARIA_OBJ>();
			if (ses.isValid()) {
				return r;
			}
			r = lib.SADB.MAQUINARIA.getMaquinarias();
			
			return r;
		}
		
		@RequestMapping(value = "/AGRO/GETMAQUINARIAS_PF/{campo}", method = {RequestMethod.GET, RequestMethod.POST}, produces = MediaType.APPLICATION_JSON_VALUE)
		public @ResponseBody ArrayList<MAQUINARIA_PF> GETMAQUINARIAS_PF(@PathVariable String campo , HttpSession httpSession) throws Exception {
			session ses = new session(httpSession);
			ArrayList<MAQUINARIA_PF> r = new ArrayList<MAQUINARIA_PF>();
			if (ses.isValid()) {
				return r;
			}
			r = lib.SADB.MAQUINARIA.getMaquinarias_pf(campo);
			
			return r;
		}

//		SElECT
		@RequestMapping(value = "/AGRO/GETIMPLEMENTOS", method = {RequestMethod.GET, RequestMethod.POST}, produces = MediaType.APPLICATION_JSON_VALUE)
		public @ResponseBody ArrayList<IMPLEMENTO_OBJ> GETIMPLEMENTOS( HttpSession httpSession) throws Exception {
			session ses = new session(httpSession);
			ArrayList<IMPLEMENTO_OBJ> r = new ArrayList<IMPLEMENTO_OBJ>();
			if (ses.isValid()) {
				return r;
			}
			r = lib.SADB.IMPLEMENTO.getImplementos();
			
			return r;
		}
		
		
		//	insert
		@RequestMapping(value = "/AGRO/ADDORDENAPLICACION/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
		public @ResponseBody boolean ADDOrdenAplicacion(@RequestBody  ORDEN_APLICACION row, HttpSession httpSession) throws Exception {
			session ses = new session(httpSession);
			if (ses.isValid()) {
				return false;
			}
			return ORDEN_APLICA.ADDOrdenAplicacion(row);
		}
		
//		UPDATE
//		@RequestMapping(value = "/AGRO/UPORDENAPLICACION/", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
//		public @ResponseBody boolean updateOrdenAplicacion(@RequestBody  ORDEN_APLICACION row, HttpSession httpSession) throws Exception {
//			session ses = new session(httpSession);
//			if (ses.isValid()) {
//				return false;
//			}
//			return ORDEN_APLICA.updateOrdenAplicacion(row);
//		}
		
//		UPDATE
		@RequestMapping(value = "/AGRO/CONFIRMAAPLICACION/", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
		public @ResponseBody boolean confirmarAplicacion(@RequestBody  CONFIRMACION_APLICACION row, HttpSession httpSession) throws Exception {
			
			session ses = new session(httpSession);
			if (ses.isValid()) {
				return false;
			}
			return ORDEN_APLICA.confirmarAplicacion(row);
		}
		
		
		@RequestMapping(value = "/AGRO/UpdateMaterialRechazado/", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
		public @ResponseBody boolean UpdateMaterialRechazado(@RequestBody  CONFIRMACION_APLICACION row, HttpSession httpSession) throws Exception {
			
			session ses = new session(httpSession);
			if (ses.isValid()) {
				return false;
			}
			for(MATERIAL_PF mpf: row.getLista_materiales()){
				material.confirmMPF(mpf);
			}
			return true;
		}
		
		@RequestMapping(value = "/AGRO/CONFIRMADEVOLUCION/", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
		public @ResponseBody boolean confirmarDevolcuin(@RequestBody  CONFIRMACION_APLICACION row, HttpSession httpSession) throws Exception {
			
			session ses = new session(httpSession);
			if (ses.isValid()) {
				return false;
			}
			return ORDEN_APLICA.confirmarDecolucion(row);
		}
		
		//	insert
		@RequestMapping(value = "/AGRO/RESERVA_MATERIAL/", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
		public @ResponseBody boolean RESERVA_MATERIAL(@RequestBody  ArrayList<PROGRA_FITOSANITARIO> row, HttpSession httpSession) throws Exception {
			session ses = new session(httpSession);
			if (ses.isValid()) {
				return false;
			}
			return material.reserva_material(row);
		}
		
		@RequestMapping(value = "/AGRO/GETSOLPED_PF/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
		public @ResponseBody int GETSOLPED_PF(@PathVariable String id, HttpSession httpSession) throws Exception {
			session ses = new session(httpSession);
			if (ses.isValid()) {
				return 0;
			}
			return PROGRAMA_FITOSANITARIO.getSolpedPF(id);
		}
		
		@RequestMapping(value = "/AGRO/GETSAP/{campo}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
		public @ResponseBody ArrayList<PROGRA_FITOSANITARIO> GETSAP(@PathVariable String campo, HttpSession httpSession) throws Exception {
			session ses = new session(httpSession);
			ArrayList<PROGRA_FITOSANITARIO> pf = new ArrayList<PROGRA_FITOSANITARIO>();
			if (ses.isValid()) {
				return pf;
			}
			return PROGRAMA_FITOSANITARIO.getSAP(campo);
		}
		
		@RequestMapping(value = "/AGRO/LIBROCAMPO/{campo}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
		public @ResponseBody ArrayList<LIBRO_CAMPO> LIBROCAMPO(@PathVariable String campo, HttpSession httpSession) throws Exception {
			session ses = new session(httpSession);
			ArrayList<LIBRO_CAMPO> r = new ArrayList<LIBRO_CAMPO>();
			if (ses.isValid()) {
				return r;
			}
			r = PROGRAMA_FITOSANITARIO.getLibroCampo(campo); 			
			return r;
		}
		
		@RequestMapping(value = "/AGRO/LIBROCAMPO2/{campo}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
		public @ResponseBody ArrayList<LIBRO_CAMPO> LIBROCAMPO2(@PathVariable String campo, HttpSession httpSession) throws Exception {
			session ses = new session(httpSession);
			ArrayList<LIBRO_CAMPO> r = new ArrayList<LIBRO_CAMPO>();
			if (ses.isValid()) {
				return r;
			}
			r = PROGRAMA_FITOSANITARIO.getLibroCampo2(campo); 			
			return r;
		}
		
		@RequestMapping(value = "/AGRO/GET_CONFIRMACION/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
		public @ResponseBody CONFIRMACION_APLICACION GETCONFIRMACION(@PathVariable String id, HttpSession httpSession) throws Exception {
			session ses = new session(httpSession);
			CONFIRMACION_APLICACION row = new CONFIRMACION_APLICACION();
			if (ses.isValid()) {
				return row;
			}
			return ORDEN_APLICA.getConfirmacion(id);
		}
		
		@RequestMapping(value = "/AGRO/reporte_fitosanitario/{campo}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
		public @ResponseBody ArrayList<DETALLE_CONSUMO> reporte_fitosanitario(@PathVariable String campo, HttpSession httpSession) throws Exception {
			session ses = new session(httpSession);
			ArrayList<DETALLE_CONSUMO> row = new ArrayList<DETALLE_CONSUMO>();
			if (ses.isValid()) {
				return row;
			}
			return PROGRAMA_FITOSANITARIO.reporte_fitosanitario(campo);
		}


}
