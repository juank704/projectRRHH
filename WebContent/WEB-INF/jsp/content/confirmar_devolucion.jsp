<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
  <div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	<!--  <h4>Filtros</h4>-->
	<div class="col-xs-12 col-sm-6 col-md-3 ">
		<label style="color: #337ab7;" >Campo: </label>
		<div style="width: 100%;">
			<select class="form-control input-sm" id="dataHuerto" onchange="javascript: cambioCampo(this.value);"></select>
		</div>
	</div>
	<!-- <div class="col-xs-12 col-sm-6 col-md-3 ">
		<label style="color: #337ab7;" >Sector: </label>
		<div style="width: 100%;">
			<select class="form-control input-sm" id="sectorFilter" onchange="javascript: filterTable(this.value);"></select>
		</div>
	</div>
	<div class="col-xs-12 col-sm-6 col-md-3 ">
		<label style="color: #337ab7;" >Especie: </label>
	<div style="width: 100%;">
			<select class="form-control input-sm" id="especieFilter" onchange="javascript: cambioEspecie(this.value);"></select>
		</div>
	</div>
	<div class="col-xs-12 col-sm-6 col-md-3 ">
		<label style="color: #337ab7;" >Variedad: </label>
		<div style="width: 100%;">
			<select class="form-control input-sm" id="variedadFilter" onchange="javascript: filterTable(this.value);"></select>
		</div>
	</div> -->
</div>
<div class="table-responsive" id="ignore">
	<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_ListaAplicaciones">
		<thead>
			<tr>
				<th>N° de Orden</th>
				<th>N° de Programa</th>
				<th>Campo</th>
				<th>Nombre de aplicador</th>
				<th>Fecha según programa</th>
				<th>Estado Fenológico</th>
				<!--  <th>Fecha estimada de cosecha</th>-->
				<th>Mercado</th>
				<th>Forma de Aplicacion</th>
				<th>Estado</th>				
				<th id='exclude' style="width: 10%;"></th>
			</tr>
		</thead>
		<tbody id="tblListaAplicaciones"></tbody>
	</table> 
</div>


<div id="fileArea" style="display: none;"></div>

<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>