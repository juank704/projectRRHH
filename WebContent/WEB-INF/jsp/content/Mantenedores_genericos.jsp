<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	<!--  <h4>Filtros</h4>-->
	<div class="col-xs-12 col-sm-6 col-md-3 ">
		<label style="color: #337ab7;" >Filtro: </label>
		<div style="width: 100%;">
			<select class="form-control input-sm" id="filtro"></select>
		</div>
	</div>

</div>
	
<div class="table-responsive" id="Div_Table_FormaAplicacion">
	<table class="table table-bordered table-hover table-striped table-condensed dataTable no-footer" id="Table_mantenedor">
		<thead>
			<tr>
				<th style="width: 15%; min-width: 150px;">Descripción</th>
				<th style="width: 1%"> Modificar </th>
				<th style="width: 1%"> Eliminar </th>
			</tr>
		</thead>
		<tbody id="BodyMantenedorGenerico"></tbody>
	</table>
</div>
<div style="text-align: center;">
	<a id="addFormAP" onclick="javascript: addFormAP(0)" class="btn btn-circle red btn-outline">
		<i class="fa fa-plus"></i> Agregar
	</a>
</div><div id="fileArea" style="display: none;"></div>

<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>