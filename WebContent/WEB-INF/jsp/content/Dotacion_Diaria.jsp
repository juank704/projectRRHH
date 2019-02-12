<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	<h4>Filtros</h4>
	<div class="col-xs-12 col-sm-3 col-md-3 ">
		<label style="color: #337ab7;" >Campo: </label>
		<div style="width: 100%;">
			<select class="form-control input-md multiple" id="BoxCampo"></select>
		</div>
	</div>
	<div class="col-xs-12 col-sm-3 col-md-3 ">
		<label style="color: #337ab7;" >Fecha: </label>
		<div style="width: 100%;">
			<input type="text" class="form-control" id="BoxFecha" name="fecha" readonly="readonly">
		</div>
	</div>
	<div class="col-xs-12 col-sm-3 col-md-3 ">
		<label style="color: #337ab7;" >Faena: </label>
	<div style="width: 100%;">
			<select class="form-control input-sm" id="BoxFaena" onchange="javascript: CambioLabor_Faena(this.value);"></select>
		</div>
	</div>
	<div class="col-xs-12 col-sm-3 col-md-3 ">
		<label style="color: #337ab7;" >Labor: </label>
		<div style="width: 100%;">
			<select class="form-control input-md multiple" id="BoxLabor"></select>
		</div>
	</div>
</div>

<div class="table-responsive" id="Div_DotacionDiaria">
	<table class="table table-bordered table-hover table-striped table-condensed" id="Table_DotacionDiaria">
		<thead>
			<tr>
				<th style="min-width: 130px;">Campo</th>
				<th style="min-width: 130px;">Especie</th>
				<th style="min-width: 130px;">Variedad</th>
				<th style="min-width: 130px;">Cuartel</th>
				<th style="min-width: 200px;">Faena</th>
				<th style="min-width: 300px;">Labor</th>
<!-- 				<th style="min-width: 130px;">Cant. Trabajador</th>	 -->
				<th style="min-width: 200px;">Trabajador</th>
				<th style="min-width: 130px;">Total Permiso</th>
				<th style="min-width: 130px;">Total Licencia</th>
				<th style="min-width: 130px;">Total Falta</th>			
			</tr>
		</thead>
		<tbody id="BodyDotacionDiaria"></tbody>
	</table> 
</div>
 <div id="ignore_2" style="text-align: center;">
	<button id="Excel" class="btn btn-circle red btn-outline">
		<i class="fa fa-file-excel-o fa-lg"></i> Exportar Excel   
	</button>
	<button id="BT_Buscar" class="btn btn-circle green btn-outline" onclick="loadInfo();">
		<i class="glyphicon glyphicon-search"></i> Buscar   
	</button>
	
</div>

<div id="fileArea" style="display: none;"></div>

<div id="dvjson"></div>
<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>
<label style="color: #fff;">.</label>