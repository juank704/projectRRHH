<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<div class="col-xs-12 col-sm-12 portlet light bordered"
	style="width: 100%;">
	<h4>Filtros</h4>
	<div class="col-xs-3 col-sm-3 col-md-3">
		<h5>Campo</h5>
		<div style="width: 100%;">
			<select id="filtroCampo" class="form-control input-sm"
				style="float: right;"></select>
		</div>
	</div>
	<div class="col-xs-3 col-sm-3 col-md-3 ">
		<h5>Historial</h5>
		<div style="width: 100%;">
			<input type="text" name="fecha" id="fecha_rendimiento" onchange="fechaRiego(this)" class="form-control fecha required" readonly>
		</div>
	</div>
</div>
<div class="table-responsive" id="Div_Table_FormaAplicacion">
	<table class="table table-bordered table-hover table-striped table-condensed dataTable no-footer" id="Table_mantenedor">
		<thead>
			<tr>
				<th style="width: 15%; min-width: 150px;">Bloque</th>
				<th style="width: 15%"> Horas </th>
				<th style="width: 15%" id="fecha"> Fecha Último Riego </th>
				<th style="width: 10%">  </th>
			</tr>
		</thead>
	</table>
</div>

<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>