<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<div class="col-xs-12 col-sm-12 col-md-12" id="agregar_datos_comunes" style="display: block;">
	<h3 id="titleGeneral">Generar Orden de Aplicación</h3>	
	<h4 id='titlePrograma'>Programa</h4>
	<div class="col-xs-12 col-sm-12 col-md-12">
		<div class="col-xs-12 col-sm-12 col-md-12 portlet">
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Fecha Orden:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" name="fecha" class="form-control" id=fecha_estimada_aplicacion readonly="readonly" >
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Campo:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id='dataHuerto'  class='form-control input-sm'>		
					</select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Especie:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id='especie'  class='form-control input-sm'>		
					</select>
				</div>
			</div>		
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Variedad:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id='variedad'  class='form-control2 input-sm2' style="width:320px" >		
					</select>
				</div>
			</div>
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-12">
		<div class="col-xs-12 col-sm-12 col-md-12 portlet">
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left; font-weight: bold">Estado Fenológico:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id='estFen'  class='form-control input-sm'>		
					</select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left; font-weight: bold">Programa Aplicación:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id='programaAplicacion'  class='form-control input-sm'>		
					</select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Mojamiento:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" name="mojamiento" id="mojamiento" class="form-control" id=control_de " >
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Control de:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id='control'  class='form-control input-sm'>		
					</select>
				</div>
			</div>
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-12">
		<div class="col-xs-12 col-sm-12 col-md-12 portlet">
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Jefe de Aplicación (*):</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id='jefe_aplicacion'  class='form-control input-sm'>		
					</select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Nombre Aplicador (*):</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id='nombre_aplicador'  class='form-control input-sm'>		
					</select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Mercado (*):</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id='mercado'  class='form-control input-sm'>		
					</select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Forma de Aplicación (*):</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id='forma_aplicacion'  class='form-control input-sm oblig'>		
					</select>
				</div>
			</div>
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-12">
		<div class="col-xs-12 col-sm-12 col-md-12 portlet">
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Capacidad Lts Maquina:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="number" name="capacidad_maquina" class="form-control" id="capacidad_maquina" placeholder="" >
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-34 ">
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
			<div class="col-xs-12 col-sm-3 col-md-3 ">
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
			<div class="col-xs-12 col-sm-3 col-md-3 ">
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
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Observación:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<textarea name="observacion" class="form-control" id="observacion" ></textarea>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-2 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Libro Campo:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id='libro'  class='form-control input-sm oblig'>
						<option value="0">SI</option>
						<option value="1">NO</option>										
					</select>	
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-1 ">
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Reserva:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" name="reserva" class="form-control" id="reserva" disabled>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Solped:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" name="solped" class="form-control" id="solped" disabled>
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
						<th style='width: 2%; text-align: center;'><input type='checkbox' checked id='cbSelectTodo' onchange='selectTodoCuartel()' ></th>
						<th>Variedad</th>
						<th>Cuartel</th>
						<th>Has</th>	
						<!--  <th>Fecha estimada de cosecha</th>
						<th>Días a cosecha</th>	-->				
					</tr>
				</thead>
				<tbody id="tblCuartel" ></tbody>
			</table> 
		</div>
	</div>
	<h4 id='materiales'>Materiales</h4>
	<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
		<div class="table-responsive" id="ignore">
			<div style="text-align: right;">
				<a id="1" class="btn btn-circle red btn-outline" onclick="javascript: menuAddMaterial();">
					<i class="fa fa-plus"></i>
				</a>
			</div> 
			<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Materiales">
				<thead id='headMaterial'>
					<tr>
						<th>Producto</th>
						<th>Cantidad a retirar</th>
						<th>UM</th>
						<th>Dosis 100</th>
						<th>Dosis Has</th>
						<th>Días de carencia</th>
						<th>Hora de reingreso</th>
					</tr>
				</thead>
				<tbody id="tblMateriales"></tbody>
			</table> 
		</div>
	</div>	
</div>
<div style="text-align: center;">
	<a id="addAct" class="btn btn-circle red btn-outline">
		<i class="fa fa-plus"></i> Generar Orden de Aplicación
	</a>
	<a id="updateAct" onclick="javascript: updateAct();" class="btn btn-circle red btn-outline">
		<i class="fa fa-plus"></i> Actualizar Orden de Aplicación
	</a>
</div>
<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>