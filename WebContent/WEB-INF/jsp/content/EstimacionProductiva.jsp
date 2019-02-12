<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<div class="col-xs-12 col-sm-12 portlet" style="width: 100%;">
	<div class="col-xs-12 col-sm-6 col-md-3">
		<label style="color: #337ab7;font-weight: bold">Campo: </label>
		<div style="width: 100%;">
			<select class="form-control input-sm" id="selCampo" onchange="cambioCampo(this)"></select>
		</div>
	</div>
</div>
<div class="col-xs-12 col-sm-12 portlet" style="width: 100%;">
	<div class="col-xs-12 col-sm-6 col-md-3">
		<label style="color: #337ab7;font-weight: bold" >Sector: </label>
		<div style="width: 100%;">
			<select class="form-control input-sm" onchange="cambioSector(this)" id="sector"></select>
		</div>
	</div>
	<div class="col-xs-12 col-sm-6 col-md-3">
		<label style="color: #337ab7;font-weight: bold" >Especie: </label>
		<div style="width: 100%;">
			<select class="form-control input-sm" onchange="cambioEspecie(this)" id="especie"></select>
		</div>
	</div>
	<div class="col-xs-12 col-sm-6 col-md-3">
		<label style="color: #337ab7;font-weight: bold" >Variedad: </label>
		<div style="width: 100%;">
			<select class="form-control input-sm" onchange="cambioVariedad(this)" id="variedad"></select>
		</div>
	</div>
	<div class="col-xs-12 col-sm-6 col-md-3">
		<label style="color: #337ab7;font-weight: bold" >Cuartel: </label>
		<div style="width: 100%;">
			<select class="form-control input-sm" onchange="cambioCuartel(this)" id="cuartel"></select>
		</div>
	</div>
</div>
<div class="col-xs-12 col-sm-12 col-md-12"> 
<div class="col-xs-0 col-sm-1 col-md-2"> 
</div>
<div class="col-xs-12 col-sm-10 col-md-8"> 
	<div class="table-responsive">
		<h4 style="color: #337ab7;font-weight: bold; text-align: center;" >Variables: </h4>
		<div class="table-scrollable">
			<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_valores">
				<thead>
					<tr>
						<th>Variable</th>
						<th>Descripcion</th>
						<th>Valor</th>
					</tr>
				</thead>
				<tbody id="b_valores">
					<tr>
						<td style='color: #C70039;font-weight: bold'>Has:</td>
						<td>Hectareas</td>
						<td>------</td>
					</tr>
					<tr>
						<td style='color: #C70039;font-weight: bold'>PH:</td>
						<td>Plantas por Hectareas</td>
						<td>------</td>
					</tr>
					<tr>
						<td style='color: #C70039;font-weight: bold'>PC:</td>
						<td>Peso por Caja</td>
						<td>------</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
<div class="col-xs-0 col-sm-1 col-md-2"> 
</div>
<div class="col-xs-0 col-sm-1 col-md-2"> 
</div>
<div class="col-xs-12 col-sm-10 col-md-offset-2 col-md-8"> 
	<div class="table-responsive">
		<h4 style="color: #337ab7;font-weight: bold; text-align: center;" >Parametros: </h4>
		<div class="table-scrollable">
			<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Param">
				<thead>
					<tr>
						<th>Identificador</th>
						<th>Descripcion</th>
						<th>Formula</th>
						<th>Resultado *</th>
					</tr>
				</thead>
				<tbody id="body_Param">
				</tbody>
			</table>
		</div>
		<div style="text-align: center;" class="">
			<a onclick="javascript: GuardarEstimacion()" class="btn btn-circle green-dark btn-outline submit">
				<i class="icon-cloud-upload"></i> Guardar
			</a>
		</div>
	</div>
</div>
<div class="col-xs-0 col-sm-1 col-md-2"> 
</div>
</div>
<br>
.