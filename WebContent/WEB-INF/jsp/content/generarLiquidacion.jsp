<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
 <div class="col-xs-12 col-sm-12 col-md-12">
	<div class="col-xs-12 col-sm-12 col-md-12 portlet">
		<div class="col-xs-12 col-sm-3 col-md-3 ">
			<label style="color: #337ab7;" >Campo: </label>
			<select class="form-control input-sm" id="dataHuerto"  ></select>
		</div>
		<div class="col-xs-12 col-sm-3 col-md-3 ">
			<label style="color: #337ab7;" >Contratista: </label>
			<select class="form-control input-sm" id="contratista" ></select>
		</div>
		<div class="col-xs-12 col-sm-2 col-md-2 ">
			<label style="color: #337ab7;font-weight: bold">Fecha Desde:</label>
			<input id="BoxFecha" type="text" name="fecha" class="form-control" onchange="" readonly placeholder="dd-mm-aa">
		</div>
		<div class="col-xs-12 col-sm-2 col-md-2 ">
			<label style="color: #337ab7;font-weight: bold">Fecha Hasta:</label>
			<input id="BoxFecha2" type="text" name="fecha" class="form-control" onchange="" readonly placeholder="dd-mm-aa">
		</div>
		<div class="col-xs-12 col-sm-2 col-md-2">
			<br>
			<button id="ver" class="btn blue">Listar
			</button>
		</div>
	</div>
</div>

<!--  <div class="table-responsive" id="ignore">-->
<div class="table-scrollable">
	<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_RendimientoVlidadr"></table> 
</div>

<div id="ignore_2" style="text-align: center;">
	<button id="liquidacion" onclick="generarLiquidacion()" class="btn green dark">
		<i class="fa file-invoice-dollar fa-lg"></i>Generar Pre-Liquidación
	</button> 
</div>

<div id="fileArea" style="display: none;"></div>

<article id="loading" class="loading_dos" style="display: none;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>