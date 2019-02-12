<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
	<h4>Crear Calificacion</h4>
	
	<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	<div class="col-xs-12 col-sm-3 col-md-3">
		<label >Campo:</label>
		<br>
		<select id="BoxCampo" onchange="cambioCampo(this.value);" class="form-control input-sm" style="float: left; width: 200px;">
		<option value="" disabled selected hidden="">Seleccione</option>
		</select>
	</div>
	
	<div class="col-xs-12 col-sm-3 col-md-3">
		<label  style="text-align: center;">Especie: </label>
		<select id="BoxEspecie" onchange="cambioEspecie();"  class="form-control input-sm" style="width: 200px;">
		<option value="" disabled selected hidden="">Seleccione</option>
		</select>
	</div>

	
	<div class="col-xs-12 col-sm-3 col-md-3">
		<label  style="text-align: center;">Faena: </label>
		<select id="BoxFaena" onchange="javascript: CambioFaena(this.value);" class="form-control input-sm" style="width: 200px;">
		<option value="" disabled selected hidden="">Seleccione</option>
		</select>
	</div>
	
	<div class="col-xs-12 col-sm-3 col-md-3">
		<label>Labor: </label>
		<select id="BoxLabor" class="form-control input-sm" style= "width: 200px;">
		<option value="" disabled selected hidden="">Seleccione</option>
		</select>
	</div>
</div>
	
	
	
	<div class="table-responsive">
	<table class="table table-bordered table-hover table-striped table-condensed dataTable no-footer" id="tbl_fa">
		<thead>
			<tr>
				<th style="width: 15%; min-width: 100px;" id="calificacion">Calificacion</th>
				<th style="width: 15%; min-width: 100px;" id="min">Detalle Mininimo %</th>
				<th style="width: 15%; min-width: 100px;" id="max">Detalle Maximo %</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Bajo</td>
				<td>  <input type='number' class='form-control' id="bajo_min"disabled></td>
				<td>  <input type='number' class='form-control' id="bajo_max"></td>
			</tr>
			
			<tr>
				<td>Promedio</td>
				<td>  <input type='number' class='form-control'  id="promedio_min"disabled></td>
				<td>  <input type='number' class='form-control'  id="promedio_max"></td>
			</tr>
			
			<tr>
				<td>Bueno</td>
				<td>  <input type='number' class='form-control' id="bueno_min"disabled></td>
				<td>  <input type='number' class='form-control' id="bueno_max"></td>
			</tr>
			
			<tr>
				<td>Destacado</td>
				<td>  <input type='number' class='form-control' id="destacado_min" disabled></td>
				<td>  <input type='number' class='form-control' id="destacado_max" disabled></td>
			</tr>
		</tbody>
		<tbody id="BodyCalificacion"></tbody>
	</table>
</div>

<div style="text-align: center;">
	<a id="Guardar" onclick="javascript: Guardar(0)" class="btn btn-circle red btn-outline">
		<i class="fa fa-plus"></i> Guardar
	</a>
</div>
<div id="fileArea" style="display: none;"></div>

<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>