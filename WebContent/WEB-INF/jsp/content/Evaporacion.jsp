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
					<th colspan="7" style="text-align:center;" id="semana"></th>
				</tr>
				<tr>
					<th style="min-width: 10%; text-align: center;" id="lunes"></th>
					<th style="min-width: 10%; text-align: center;" id="martes"></th>
					<th style="min-width: 10%; text-align: center;" id="miercoles"></th>
					<th style="min-width: 10%; text-align: center;" id="jueves"></th>
					<th style="min-width: 10%; text-align: center;" id="viernes"></th>
					<th style="min-width: 10%; text-align: center;" id="sabado"> </th>
					<th style="min-width: 10%; text-align: center;" id="domingo"></th>
					<th style="min-width: 13%; text-align: center;" id="editar">Editar</th>
				</tr>

			</thead>
		</table>
	</div>
</div>
<div style="clear: both;">
</div>
<div style="text-align: center; ">
	<a id="anterior" style="display: none;" onclick="javascript: loadInfo()" class="btn btn-circle red btn-outline">Actual
	</a>
	<a id="siguiente" onclick="javascript: siguiente()" class="btn btn-circle red btn-outline">Siguiente
	</a>
</div><div id="fileArea" style="display: none;"></div>

<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>