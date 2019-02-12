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
</div>
<div class="col-xs-8 col-sm-8 portlet col-md-offset-2 col-xs-offset-2 col-sm-offset-2">
	<div class="table-responsive" id="Div_Table_FormaAplicacion">
		<table class="table table-bordered table-hover table-striped table-condensed dataTable no-footer" id="Table_mantenedor">
			<thead>
				<tr>
					<th style="min-width: 10%; text-align: center;"></th>
					<th style="min-width: 20%; text-align: center;">Desde:</th>
					<th style="min-width: 20%; text-align: center;">Hasta:</th>
				</tr>
				<tr>
					<th style="min-width: 10%;" id="verde"></th>
					<th style="min-width: 20%;" id="desdeVerde"></th>
					<th style="min-width: 20%;" id="hastaVerde"></th>
				</tr>
				<tr>
					<th style="min-width: 10%;" id="amarillo"></th>
					<th style="min-width: 20%;" id="desdeAmarillo"></th>
					<th style="min-width: 20%;" id="hastaAmarillo"></th>
				</tr>
				<tr>
					<th style="min-width: 10%;" id="rojo"></th>
					<th style="min-width: 20%;" id="desdeRojo"></th>
					<th style="min-width: 20%;" id="hastaRojo"></th>
				</tr>
			</thead>
		</table>
	</div>
</div>
<div style="clear: both;">
</div>
<div style="text-align: center;">
	<a id="addFormAP" onclick="javascript: Guardar()" class="btn btn-circle red btn-outline">
		<i class="fa fa-plus"></i> Guardar
	</a>
</div><div id="fileArea" style="display: none;"></div>
<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>