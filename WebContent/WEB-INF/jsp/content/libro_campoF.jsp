<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
 <div class="col-xs-12 col-sm-12 col-md-12">
	<div class="col-xs-12 col-sm-12 col-md-12 portlet">
		<div class="col-xs-12 col-sm-3 col-md-3 ">
			<label style="color: #337ab7;" >Campo: </label>
			<select class="form-control input-sm" id="dataHuerto"  ></select>
		</div>
		<!--<div class="col-xs-12 col-sm-3 col-md-3 ">
			<label style="color: #337ab7;" >Contratista: </label>
			<select class="form-control input-sm" id="contratista" ></select>
		</div>
		<div class="col-xs-12 col-sm-2 col-md-2 ">
		    <label style="color: #337ab7;font-weight: bold">Fecha Creaci�n Desde:</label>
			<input id="BoxFecha" type="text" name="fecha" class="form-control" onchange="" readonly placeholder="dd-mm-aa">
		</div>
		<div class="col-xs-12 col-sm-2 col-md-2 ">
			<label style="color: #337ab7;font-weight: bold">Fecha Creaci�n Hasta:</label>
			<input id="BoxFecha2" type="text" name="fecha" class="form-control" onchange="" readonly placeholder="dd-mm-aa">
		</div> -->
		<div class="col-xs-12 col-sm-2 col-md-2">
			<br>
			<button id="ver" class="btn blue">Listar
			</button>
		</div>
	</div>
</div>

<!--  <div class="table-responsive" id="ignore">-->
<div class="table-scrollable">
	<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_LibroCampo">
		<!--  <thead>
		    <tr>
				<th colspan='19'></th>
				<th colspan='10'>Datos</th>
			</tr>
			<tr>
				<th>N OA</th>
				<th>Predio</th>
				<th style="min-width: 80px;">Especie</th>
				<th style="min-width: 100px;">Variedad</th>
				<th style="min-width: 150px;">Cuartel</th>
				<th>Ha Cuartel</th>
				<th style="min-width: 100px;">Fecha Aplicaci�n</th>
				<th style="min-width: 100px;">Para Control de</th>
				<th style="min-width: 150px;">Nombre Comercial</th>
				<th style="min-width: 100px;">Ingrediente Activo</th>
				<th style="min-width: 100px;">Fecha Reingreso</th>
				<th style="min-width: 100px;">Estado Fenol�gico</th>
				<th style="min-width: 100px;">Forma de aplicaci�n</th>
				<th style="min-width: 100px;">Pesona que aplic�</th>
				<th style="min-width: 150px;">Dosificador</th>
				<th style="min-width: 150px;">Carencia</th>
				<th style="min-width: 150px;">Fecha Viable</th>
				<th style="min-width: 50px;">H.I</th>
				<th style="min-width: 50px;">H.T</th>
				<th style="min-width: 150px;">Suma de Uni. H� Ca</th>
				<th style="min-width: 150px;">Suma de Uni. H� Cu</th>
				<th style="min-width: 150px;">Suma de Uni. H� Fe</th>
				<th style="min-width: 150px;">Suma de Uni. H� K</th>
				<th style="min-width: 150px;">Suma de Uni. H� Mg</th>
				<th style="min-width: 150px;">Suma de Uni. H� Mn</th>
				<th style="min-width: 150px;">Suma de Uni. H� N</th>
				<th style="min-width: 150px;">Suma de Uni. H� P</th>
				<th style="min-width: 150px;">Suma de Uni. H� S</th>
				<th style="min-width: 150px;">Suma de Uni. H� Zn</th>
			</tr>
		</thead>
		<tbody id="tblListaRendiemiento"></tbody>-->
	</table> 
</div>

<!--  <div id="ignore_2" style="text-align: center;">
	<button id="liquidacion" onclick="generarLiquidacion()" class="btn green dark">
		<i class="fa file-invoice-dollar fa-lg"></i>Generar Liquidaci�n
	</button> 
</div>-->

<div id="fileArea" style="display: none;"></div>

<article id="loading" class="loading_dos" style="display: none;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>
..