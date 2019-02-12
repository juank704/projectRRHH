<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<h3>Anticipos</h3>
<div class="col-xs-12 col-sm-12 col-md-12 ">
	<div class="col-xs-2 col-sm-2 col-md-2 ">
	</div>
	<div class="col-xs-8 col-sm-8 col-md-8 " id="div_monto">
		<div class="col-xs-4 col-sm-4 col-md-4">
			<div class="col-xs-6 col-sm-6 col-md-6">
				<h4>Monto Anticipo Masivo</h4>
			</div>
			<div class="col-xs-6 col-sm-6 col-md-6">
				<div class="input-icon">
					<i class="fa fa-usd" aria-hidden="true"></i>
					<input type="text" class="form-control input-circle" id="sueldoAnterior">
				</div>
			</div>
		</div>
		<div class="col-xs-4 col-sm-4 col-md-4">
			<div class="col-xs-6 col-sm-6 col-md-6">
				<h4>Fecha de Pago</h4>
			</div>
			<div class="col-xs-6 col-sm-6 col-md-6">
				<input type="text" name="fecha" class="form-control input-circle" readonly id="fechaPagoAll">
			</div>
		</div>
		<div class="col-xs-12 col-sm-4 col-md-4">
			<a id="addWorker" class="btn btn-circle red btn-outline">
				<i class="fa fa-plus"></i> Asignar
			</a>
		</div>
	</div>
	<div class="col-xs-2 col-sm-2 col-md-2 ">
	</div>
</div>
<div class="col-xs-12 col-sm-12 col-md-12 ">
	<div class="col-xs-2 col-sm-2 col-md-2 ">
	</div>
	<div class="col-xs-8 col-sm-8 col-md-8" id="table_anticipo">
		<div class="table-responsive" >
			<h4 style="text-align: center;">Datos de Anticipo</h4>
			<table class="table table-bordered table-hover table-striped table-condensed" id="tblAnticipo">
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Empresa Actual</th>
						<th>Fecha de Pago</th>
						<th>Monto</th>
						<th colspan="2" style="width: 2%;">Acciones</th>
					</tr>
				</thead>
				<tbody id="bodyAnticipo"></tbody>
			</table>
		</div>
	</div>
	<div class="col-xs-2 col-sm-2 col-md-2 ">
	</div>
</div>
<div class="table-responsive" id="table_unanticipo">
	<h4 style="text-align: center;">Datos Actuales</h4>
	<table class="table table-bordered table-hover table-striped table-condensed" id="tblunAnticipo">
		<thead>
			<tr>
				<th>Nombre</th>
				<th>Empresa Actual</th>
				<th>Fecha Inicio</th>
				<th>Fecha Termino</th>
			</tr>
		</thead>
		<tbody id="bodyunAnticipo"></tbody>
	</table>
</div>
<div id="un_anticipo">
	<div class="col-xs-12 col-sm-12 col-md-12 ">
		<div class="col-xs-0 col-sm-2 col-md-2">
		</div>
		<div class="col-xs-12 col-sm-8 col-md-8 portlet light bordered">
			<div class="col-xs-12 col-sm-4 col-md-4">
				<h5>Monto</h5>
				<div class="input-icon">
					<i class="fa fa-usd" aria-hidden="true"></i>
					<input type="text" class="form-control input-circle" id="sueldoAnterior">
				</div>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<h5>Mes/Año</h5>
				<input type="month" class="form-control input-circle" id="sueldoActual">
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<h5>Fecha de Pago</h5>
				<input type="text" name="fecha" class="form-control input-circle" id="sueldoActual" readonly>
			</div>
		</div>
		<div class="col-xs-2 col-sm-2 col-md-2">
		</div>
	</div>
</div>
	<div style="text-align: center;">
		<a id="addWorker" class="btn btn-circle red btn-outline">
			<i class="fa fa-plus"></i> Guardar
		</a>
		<a onclick="javascript: history.back();" class="btn btn-circle red btn-outline">
			<i class="fa fa-plus"></i> Cancelar
		</a>
	</div>