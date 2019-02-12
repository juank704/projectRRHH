<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
	<h4>Crear Estado</h4>

<div class="col-xs-12 col-sm-12 col-md-12 portlet">
	<div class="col-xs-12 col-sm-3 col-md-3">
		<label >Campo:</label>
		<select id="BoxCampo" class="form-control input-sm" style="float: left; width: 200px;">
		<option value="" disabled selected hidden="">Seleccione</option>
		</select>
	</div>
</div>
<div class="table-responsive">
<table class="table table-bordered table-striped table-condensed dataTable no-footer" id="Tabla_Estado">
	<thead>
		<tr>
			<th style="width: 15%; min-width: 100px;" id="Estado" >Estado</th>
			<th style="width: 15%; min-width: 100px;" id="Desde">Desde</th>
			<th style="width: 15%; min-width: 100px;" id="Hasta">Hasta</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td id="BoxVerde">Verde</td>
			<td>  <input type='number' class='form-control' id="verde_desde" value=0 disabled></td>
			<td>  <input type='number' class='form-control' id="Verde" value=60 ></td>
		</tr>			
		<tr>
			<td id="BoxAmarillo">Amarillo</td>
			<td>  <input type='number' class='form-control'  id="amarillo_desde" value=61 disabled></td>
			<td>  <input type='number' class='form-control'  id="Amarillo" value=90></td>
		</tr>		
		<tr>
			<td id="BoxRojo">Rojo</td>
			<td>  <input type='number' class='form-control' id="rojo_desde" value=91 disabled></td>
			<td>  <input type='number' class='form-control' id="Rojo" value=100 disabled></td>
		</tr>
	</tbody>
	<tbody id="BodyEstado"></tbody>
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