<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<div class="col-xs-12 col-sm-12 portlet light bordered" style="width: 100%;">
	<div style=" float: left;" class="col-xs-3 col-sm-3 col-md-3">
		<label style="color: #337ab7;" >Campo: </label>
		<select class="form-control input-sm" id="filtroCampo"></select>
	</div>
</div>
<div class="table-responsive" id="Div_Table_SueldosCargo">
	<table class="table table-bordered table-hover table-striped table-condensed dataTable no-footer" id="Table_SueldosCargo">
		<thead>
			<tr>
				<th style="width: 15%; min-width: 150px;">Id</th>
				<th style="width: 15%; min-width: 150px;">Cargo</th>
				<th style="width: 15%; min-width: 150px;">Sueldo Líquido</th>
				<th style="width: 1%"> Modificar </th>
			</tr>
		</thead>
		<tbody id="BodySueldosCargo"></tbody>
	</table>
</div>
<div style="text-align: center;">
	<a id="addFormAP" onclick="javascript: add(0)" class="btn btn-circle red btn-outline">
		<i class="fa fa-plus"></i> Agregar
	</a>
</div><div id="fileArea" style="display: none;"></div>

<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>