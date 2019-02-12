<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!-- AGRGAR DATOS GENERALES -->

<div class="col-xs-12 col-sm-12 col-md-12" id="agregar_datos_comunes" style="display: block;">
	<h3 style="text-align: center;">Registro Incidencia</h3>
	<div class="col-xs-12 col-sm-12 col-md-12">
		<div class="col-xs-12 col-sm-12 col-md-12 portlet">
			<div class="col-xs-12 col-sm-3 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Fecha:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" name="fecha" id="fecha_incidencia" class="form-control fecha required" readonly>
					<label id="message" style="color: #FF0000;font-weight: bold;display: none;">La fecha no puede ser mayor a la actual</label>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Campo:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id="campo_incidencia" class="form-control input-sm required" onchange="javascript: cambioCampo(this.value);"></select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-4">
				<div class="col-xs-12 col-sm-12 col-md-12">	
					<label style="color: #337ab7;font-weight: bold">Especie:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id="especie_incidencia" class="form-control input-sm required" onchange="javascript: cambioEspecie(this.value);"></select>
				</div>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12 portlet">
			<div class="col-xs-12 col-sm-3 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Variedad:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id="variedad_incidencia" class="form-control input-sm required" onchange="javascript: cambioVariedad(this.value);"></select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12 ">
					<label style="color: #337ab7;font-weight: bold">Cuartel:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12 ">
					<select id="cuartel_incidencia"  class="form-control input-sm required" ></select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12 ">
					<label style="color: #337ab7;font-weight: bold">Tipo Incidencia:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12 ">
					<select id="tipo_incidencia"  class="form-control input-sm required" >
						<option value='1'>Preventiva</option>
						<option value='2'>Correctiva</option>
					</select>
				</div>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12 portlet">
			<div class="col-xs-12 col-sm-3 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12 ">
					<label style="color: #337ab7;font-weight: bold">Observación:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12 ">
					<input type="text" name="observacion" class="form-control" id="observacion"  >
				</div>
			</div>
			<div class="col-md-4">
				<div class="col-xs-12 col-sm-12 col-md-12 ">
					<label style="color: #337ab7;font-weight: bold"></label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12 ">
					<span class="btn green fileinput-button">
		            	<i class="fa fa-upload"></i>
		           		<span> Subir Imagen </span>
		            	<input id="1" value="Subir Archivo" style="height: 34px;"  type="file" accept="application/jpg" > 
		            </span>
		        </div>
	        </div>
			<!--  <div class="col-md-4">
				<div class="col-xs-12 col-sm-12 col-md-12 ">
					<label for="7" title="Subir Archivo" alt="Subir Archivo"class="btn btn-circle green btn-outline"> <i
					class="fa fa-upload"></i>Subir Archivo</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12 ">
					 <input id="1" class="form-control" value="Subir Archivo"  type="file" accept="application/jpg" >
				</div>
			</div>-->
		</div>
		
		<div style="text-align: center;">
			<a id="addRendimientoGeneral" onclick="javascript: addIncidencia();" class="btn red submit">
				 <i></i> Guardar Incidencia
			</a>
		</div>
	</div>
</div>
<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>
.