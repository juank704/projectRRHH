<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
	<div class="col-xs-12 col-sm-12 col-md-12 ">
	<div class="col-xs-12 col-sm-3 col-md-3 portlet">
		<label  style="text-align: center;">Maestro Motivo: </label>
		<select id="BoxMaestro" class="form-control input-md multiple" onchange="javascript: filterTable(this.value)"></select>
	</div>
	</div>
	
	<div class="table-responsive" id="Div_TableMaestroMotivo">
	<table class="table table-bordered table-hover table-striped table-condensed dataTable no-footer" id="Table_Maestro">
		<thead>
			<tr>
				<th style="width: 15%; min-width: 100px;">Descripción</th>
				<th style="width: 1%"> Modificar</th>
				<th style="width: 1%"> Eliminar</th>
			</tr>
		</thead>
		<tbody id="BodyMaestro"></tbody>
	</table>
</div>
<div style="text-align: center;">
	<a id="addFormAP" onclick="javascript: addformAp(0)" class="btn btn-circle red btn-outline">
		<i class="fa fa-plus"></i> Agregar
	</a>
</div><div id="fileArea" style="display: none;"></div>

<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>