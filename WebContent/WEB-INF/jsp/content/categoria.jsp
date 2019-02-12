<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
	<h4>Ingreso de Categoría</h4>
	
	<div class="table-responsive" id="DivCategoria">
	<table class="table table-bordered table-hover table-striped table-condensed dataTable no-footer" id="TableCategoria">
		<thead>
			<tr>
				<th style="width: 15%; min-width: 100px;">Descripción</th>
				<th style="width: 15%; min-width: 100px;">Especie</th>
				<th style="width: 1%"> Modificar </th>
				<th style="width: 1%"> Eliminar </th>
			</tr>
		</thead>
		<tbody id="BodyCategoria"></tbody>
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