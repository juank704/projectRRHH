<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<div class="col-xs-12 col-sm-12 col-md-12" id="agregar_datos_comunes" style="display: block;">
	<h3 id="titleGeneral">Generar Orden de Aplicación</h3>	
	<h4 id='titlePrograma'>Programa</h4>
	<div class="col-xs-12 col-sm-12 col-md-12">
		<div class="col-xs-12 col-sm-12 col-md-12 portlet">
			<div class="col-xs-12 col-sm-3 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Campo:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" name="campo" class="form-control " id="campo" readonly="readonly" >
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Fecha según programa:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" name="fecha_estimada_aplicacion" class="form-control" id=fecha_estimada_aplicacion readonly="readonly" >
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Estado Fenólogico:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" name="estado_fenologico" class="form-control" id="estado_fenologico" readonly="readonly" >
				</div>
			</div>
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-12">
		<div class="col-xs-12 col-sm-12 col-md-12 portlet">
			<div class="col-xs-12 col-sm-3 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left; font-weight: bold">Programa Aplicación:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" name="programa_aplicacion" class="form-control" id="programa_aplicacion" readonly="readonly" >
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Control de:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" name="control_de" class="form-control" id=control_de readonly="readonly" >
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Observación:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<textarea name="observacion" class="form-control" id="observacion" readonly="readonly" ></textarea>
				</div>
			</div>
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-12">
		<div class="col-xs-12 col-sm-12 col-md-12 portlet">
			<div class="col-xs-12 col-sm-3 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left; font-weight: bold">Tipo Aplicación:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" name="tipo_aplicacion" class="form-control" id="tipo_aplicacion" readonly="readonly" >
				</div>
			</div>
		</div>
	</div>
	<h4 id="especie">Especie</h4>
	<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
		<div class="table-responsive" id="ignore">
			<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Cuartel">
				<thead>
					<tr>
						<th>Variedad</th>
						<th>Cuartel</th>
						<th>Has</th>	
						<th>Fecha estimada de cosecha</th>
						<th>Días a cosecha</th>					
					</tr>
				</thead>
				<tbody id="tblCuartel"></tbody>
			</table> 
		</div>
	</div>
	<h4 id='materiales'>Materiales</h4>
	<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
		<div class="table-responsive" id="ignore">
			<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Materiales">
				<thead>
					<tr>
						<th>Producto</th>
						<th>Cantidad a retirar</th>
						<th>UM</th>
						<th>Dosis 100</th>
						<th>Dosis Has</th>
						<th>Días de carencia</th>
						<th>Hora de reingreso</th>
						<th>Dosis por Bombada</th>
					</tr>
				</thead>
				<tbody id="tblMateriales"></tbody>
			</table> 
		</div>
	</div>	
		
	<h4>Emisión Orden</h4>
	<div class="col-xs-12 col-sm-12 col-md-12">
		<div class="col-xs-12 col-sm-12 col-md-12 portlet">
			<div class="col-xs-12 col-sm-3 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Jefe de Aplicación (*):</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id='jefe_aplicacion'  class='form-control input-sm oblig'>		
					</select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Nombre Aplicador:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id='nombre_aplicador'  class='form-control input-sm'>		
					</select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Mercado (*):</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id='mercado'  class='form-control input-sm'>		
					</select>
				</div>
			</div>
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-12">
		<div class="col-xs-12 col-sm-12 col-md-12 portlet">
			<div class="col-xs-12 col-sm-3 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Forma de Aplicación (*):</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id='forma_aplicacion'  class='form-control input-sm oblig'>		
					</select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Mojamiento:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" name="mojamiento" class="form-control" id="mojamiento" placeholder="" disabled>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Capacidad Lts Maquina:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" name="capacidad_maquina" class="form-control" id="capacidad_maquina" placeholder="" disabled>
				</div>
			</div>
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-12">
		<div class="col-xs-12 col-sm-12 col-md-12 portlet">
			<div class="col-xs-12 col-sm-3 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-8">
					<label style="color: #337ab7; float: left;font-weight: bold">Presión bomba:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-4">
					<label style="color: #337ab7; float: left;font-weight: bold">UM:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-8">
					<input type="number" name="presion_bombada" class="form-control" id="presion_bombada" placeholder="" min="0" max="100">
				</div>				
				<div class="col-xs-12 col-sm-12 col-md-4">
					<input type="text" name="um_dosis" class="form-control" id="um_dosis" placeholder="" min="0" max="100">
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Cambio Tractor (*):</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id='cambio_tractor'  class='form-control input-sm oblig'>
					<option value="7">Según instrucción adjunta</option>
					<option value="1">Primera</option>
					<option value="2">Segunda</option>
					<option value="3">Tercera</option>
					<option value="4">Cuarta</option>
					<option value="5">Quinta</option>
					<option value="6">No Aplica</option>
										
				</select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Marcha Tractor (*):</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id='marcha_tractor'  class='form-control input-sm oblig'>
						<option value="7">Según instrucción adjunta</option>
						<option value="1">Lenta</option>
						<option value="2">Media</option>
						<option value="3">Rápida</option>
						<option value="6">No Aplica</option>											
					</select>	
				</div>
			</div>
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-12">
		<div class="col-xs-12 col-sm-12 col-md-12 portlet">
			<!--  <div class="col-xs-12 col-sm-3 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Dosis por Bombada:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="number" name="dosis_bombada" class="form-control" id="dosis_bombada" placeholder="" disabled>
				</div>
			</div>-->
			<div class="col-xs-12 col-sm-3 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left; font-weight: bold">Fecha Inicio (*):</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" name="fecha" class="form-control oblig" onchange="valFechaHoy(this.id)" id="fecha_inicio" readonly="readonly" >
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left; font-weight: bold">Fecha viable cosecha (*):</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" name="fecha_viable" class="form-control oblig" id="fecha_viable" readonly="readonly" >
				</div>
			</div>
		</div>
	</div>
</div>
<div style="text-align: center;">
	<a id="addAct" onclick="javascript: addAct();" class="btn btn-circle red btn-outline">
		<i class="fa fa-plus"></i> Generar Orden de Aplicación
	</a>
	<a id="updateAct" onclick="javascript: updateAct();" class="btn btn-circle red btn-outline">
		<i class="fa fa-plus"></i> Actualizar Orden de Aplicación
	</a>
</div>
<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>..