<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<div class="col-xs-12 col-sm-12 col-md-12 portlet">
	<div class="col-xs-12 col-sm-3 col-md-3">
		<label >Campo: </label>
		<div style="width: 100%;">
			<select class="form-control input-md multiple" id="BoxCampo" onchange="javascript: filterTable(this.value)"></select>
		</div>
	</div>
	<div class="col-xs-12 col-sm-3 col-md-3">
		<label >Estado: </label>
			<div style="width: 100%;">
			<select class="form-control input-md multiple" id="Estado" onchange="javascript: filterTable(this.value)">
				<option value='0'>Todos</option>
				<option value=1>Activo</option>
				<option value=2>Inactivo</option>
			</select>
		</div>
	</div>
</div>
<div class="table-responsive" id="Recorrido_Tabla">
	<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Info">
		<thead>
			<tr>
				<th style="min-width: 130px;">Campo</th>
				<th style="min-width: 130px;">Bus</th>
				<th style="min-width: 130px;">Chofer</th>
				<th style="min-width: 130px;">Tipo Vehículo</th>
				<th style="min-width: 130px;">Patente</th>
				<th style="min-width: 130px;">Origen</th>
				<th style="min-width: 130px;">Destino</th>
				<th style="min-width: 130px;">Responsable</th>
				<th style="min-width: 130px;">Cant. Personas</th>
				<th style="min-width: 130px;">Horario Salida</th>
				<th style="min-width: 130px;">Horario Llegada</th>
				<th style="min-width: 130px;">Tipo Pago</th>
				<th style="min-width: 130px;">Tarifa</th>
				<th style="min-width: 130px;">Estado</th>				
				<th style="min-width: 130px;">Porcentaje Rendimiento</th>
				<th style="min-width: 130px;">Vigencia Desde</th>
				<th style="min-width: 130px;">Vigencia Hasta</th>			
				<th id='exclude' style="width: 2%;">Editar / Guardar</th>
				<th style="min-width: 130px;">Histórico</th>
			</tr>
		</thead>
		<tbody id="Tabla_Recorrido"></tbody>
	</table> 
</div>

 <div id="ignore_2" style="text-align: center;">
 	<a id="Agregar" onclick="AgregarFila_Tabla()" class="btn btn-circle red btn-outline" >
		<i class="fa fa-plus"></i> Agregar
	</a>
</div>

<div id="fileArea" style="display: none;"></div>

<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>
<label style="color: #fff;">.</label>