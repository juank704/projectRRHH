<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
   
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	<!-- <div class="col-xs-12 col-sm-4 col-md-4">
		<button id="BT_Taller" class="btn btn-circle green btn-outline">
			<i class=""></i> Ver Taller   
		</button>
	</div>
	<div class="col-xs-12 col-sm-4 col-md-4">
		<button id="BT_Riego" class="btn btn-circle green btn-outline">
			<i class=""></i> Ver Riego   
		</button>
	</div>
	<div class="col-xs-12 col-sm-4 col-md-4">
		<button id="BT_Packing" class="btn btn-circle green btn-outline">
			<i class=""></i> Ver Packing   
		</button>
	</div>  -->
	<div class="col-xs-12 col-sm-4 col-md-4 ">
		<div class="col-xs-12 col-sm-12 col-md-12">
			<label style="color: #337ab7;font-weight: bold">Tipo Ingreso:</label>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12">
			<select id="tipo_ingreso" class="form-control input-sm">
				<option value='1'>Ingreso Taller</option>			
			</select>
		</div>
	</div>
	
	<div class="col-xs-12 col-sm-4 col-md-4 ">
		<div class="col-xs-12 col-sm-12 col-md-12">
			<label style="color: #337ab7;font-weight: bold">Campo:</label>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12">
			<select id="campo_taller" onchange="cambioCampo(this)" class="form-control input-md multiple"></select>
		</div>
	</div>
	
</div>
    
<div class="table-responsive" id="taller_info">
	<h4 id="HTaller" style="display: none;">Taller</h4>
	<div class="table-scrollable">
		<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Taller" style="display: none;">
			<thead>
				<tr>
					<th>Folio Ingreso</th>
					<th>Campo</th>
					<th>Tipo Equipo</th>
					<th>Maquinaria</th>
					<th>Motivo de Ingreso</th>
					<th>Fecha Ingreso</th>
					<th>Responsable</th>
					<th>Horómetro Ingreso</th>
					<th>Diagnóstico Preliminar</th>
					<th>Estado</th>
					<th>Gestion Material</th>
					<th>Gestion Taller</th>
				</tr>
			</thead>
			<tbody id="tblTaller"></tbody>
		</table> 
	</div>
</div>

<div class="table-responsive" id="Div_TableRiego">
<h4 id="HRiego" style="display: none;">Riego</h4>
	<table class="table table-bordered table-hover table-striped table-condensed" id="TableRiego" style="display: none;">
		<thead>
			<tr>
				<th style="min-width: 120px;">Codigo</th>
				<th style="min-width: 120px;">Campo</th>
				<th style="min-width: 120px;">Caseta</th>
				<th style="min-width: 120px;">Equipo</th>
				<th style="min-width: 120px;">Fecha</th>
				<th style="min-width: 120px;">Motivo</th>
				<th style="min-width: 120px;">Diagnostico Preliminar</th>
				<th style="min-width: 120px;">Cerrar</th>
			</tr>
		</thead>		
		<tbody id="BodyRiego"></tbody>
	</table>
</div>

<div class="table-responsive" id="Div_Packing">
<h4 id="HPacking" style="display: none;">Packing Frigorifico</h4>
	<table class="table table-bordered table-hover table-striped table-condensed" id="TablePacking" style="display: none;">
		<thead>
			<tr>
				<th style="min-width: 120px;">Codigo</th>
				<th style="min-width: 120px;">Campo</th>
				<th style="min-width: 120px;">Equipo</th>
				<th style="min-width: 120px;">Fecha</th>				
				<th style="min-width: 120px;">Motivo</th>
				<th style="min-width: 120px;">Diagnostico Preliminar</th>
				<th style="min-width: 120px;">Cerrar</th>
			</tr>
		</thead>		
		<tbody id="BodyPacking"></tbody>
	</table>
</div>