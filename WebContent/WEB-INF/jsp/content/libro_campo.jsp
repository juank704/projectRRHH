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
		    <label style="color: #337ab7;font-weight: bold">Fecha Creación Desde:</label>
			<input id="BoxFecha" type="text" name="fecha" class="form-control" onchange="" readonly placeholder="dd-mm-aa">
		</div>
		<div class="col-xs-12 col-sm-2 col-md-2 ">
			<label style="color: #337ab7;font-weight: bold">Fecha Creación Hasta:</label>
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
				<th colspan='8'></th>
				<th colspan='2'>Producto Utilizado</th>
				<th></th>
				<th colspan='2'>Dosis/100 L</th>
				<th colspan='2'>Dosis/ha.</th>
				<th>Mojamiento</th>
				<th colspan='2'></th>
				<th colspan='2'>Equipo</th>
				<th colspan='3'></th>
				<th>Total producto utilizado</th>
			</tr>
			<tr>
				<th>N OA</th>
				<th>Predio</th>
				<th style="min-width: 80px;">Especie</th>
				<th style="min-width: 100px;">Variedad</th>
				<th style="min-width: 150px;">Cuartel</th>
				<th>Ha Cuartel</th>
				<th style="min-width: 100px;">Fecha Aplicación</th>
				<th style="min-width: 100px;">Para Control de</th>
				<th style="min-width: 150px;">Nombre Comercial</th>
				<th style="min-width: 100px;">Ingrediente Activo</th>
				<th style="min-width: 100px;">Fecha Reingreso</th>
				<th>Cantidad y Unidad</th>
				<th style="min-width: 150px;">grm. cc.</th>
				<th style="min-width: 50px;">Cantidad y Unidad</th>
				<th style="min-width: 50px;">grm. cc.</th>
				<th style="min-width: 50px;">Real (Lts/ha)</th>
				<th style="min-width: 100px;">Forma Aplicación</th>
				<th style="min-width: 100px;">Pesona que aplicó</th>
				<th style="min-width: 100px;">N° Tractor</th>
				<th style="min-width: 100px;">N° Maq</th>
				<th style="min-width: 150px;">Dosificador</th>
				<th style="min-width: 150px;">Mercado</th>
				<th style="min-width: 150px;">Inicio Potencial Cosecha</th>
				<th style="min-width: 150px;">Observacion</th>
			</tr>
		</thead>
		<tbody id="tblLibroCampo"></tbody>-->
	</table> 
</div>

<!--  <div id="ignore_2" style="text-align: center;">
	<button id="liquidacion" onclick="generarLiquidacion()" class="btn green dark">
		<i class="fa file-invoice-dollar fa-lg"></i>Generar Liquidación
	</button> 
</div>-->

<div id="fileArea" style="display: none;"></div>

<article id="loading" class="loading_dos" style="display: none;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>
..