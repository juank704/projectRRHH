<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
 <div class="col-xs-12 col-sm-12 col-md-12">
	<div class="col-xs-12 col-sm-3 col-md-3 ">
		<label style="color: #337ab7;font-weight: bold">Tipo: </label>
		<select class="form-control input-sm" id="tipo">
			<option value='1'>Pre-Liquidación</option>
			<option value='2'>Liquidación</option>
		</select>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-12 portlet">
		<div class="col-xs-12 col-sm-3 col-md-3 ">
			<label style="color: #337ab7;font-weight: bold">Campo: </label>
			<select class="form-control input-sm" id="dataHuerto"  ></select>
		</div>
		<div class="col-xs-12 col-sm-3 col-md-3 ">
			<label style="color: #337ab7;font-weight: bold">Contratista: </label>
			<select class="form-control input-sm" id="contratista" ></select>
		</div>
		<div class="col-xs-12 col-sm-2 col-md-2 ">
		    <label style="color: #337ab7;font-weight: bold">Fecha Creación Desde:</label>
			<input id="BoxFecha" type="text" name="fecha" class="form-control" onchange="" readonly placeholder="dd-mm-aa">
		</div>
		<div class="col-xs-12 col-sm-2 col-md-2 ">
			<label style="color: #337ab7;font-weight: bold">Fecha Creación Hasta:</label>
			<input id="BoxFecha2" type="text" name="fecha" class="form-control" onchange="" readonly placeholder="dd-mm-aa">
		</div>
		<div class="col-xs-12 col-sm-2 col-md-2">
			<br>
			<button id="ver" class="btn blue">Listar
			</button>
		</div>
	</div>
</div>

<div class="table-responsive" id="ignore">
	<div class="table-scrollable">
		<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_ListaRendimiento">
			<thead>
				<tr>
					<th style="min-width: 2%;"><input type='checkbox' title='Seleccionar Todo' checked id='checkAll' onchange='javascript: selectALL(this);' class='checkbox'/></th>
					<th>Id</th>
					<th style=" min-width: 100px;">Fecha Creada</th>
					<!--  <th style=" min-width: 100px;">Periodo Desde</th>
					<th style=" min-width: 100px;">Periodo Hasta</th>-->
					<th>Codigo Contratista</th>
					<th>Contratista</th>
					<th>Neto</th>				
					<th>IVA</th>				
					<th>Total</th>
					<th>Valor Líquido</th>
					<th style="min-width: 80px!important;">IVA</th>
					<th style="min-width: 80px;">Bruto</th>
					<th style="min-width: 80px;">Estado</th>
					<th>Monto Pagado</th>
					<th>Monto Retenido</th>
					<th>N° Orden</th>
					<th>N° Factura</th>
					<th style="min-width: 86px!important;; max-width: 86px!important;">Gestión</th>
				</tr>
			</thead>
			<tbody id="tblListaRendiemiento"></tbody>
		</table> 
	</div>
</div>

<div id="ignore_2" style="text-align: center; display:none;">
	<button id="retencion_btn" onclick="btnRetencion()" class="btn green dark">
		<i class="fa file-invoice-dollar fa-lg"></i> Generar pago de retenciones Seleccionadas
	</button> 
</div>

<div id="fileArea" style="display: none;"></div>

<article id="loading" class="loading_dos" style="display: none;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>