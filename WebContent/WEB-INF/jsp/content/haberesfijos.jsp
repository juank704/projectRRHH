<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
   <h3>Movimientos <small>> Haberes y Descuentos Fijos</small></h3>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	<h4>Filtros</h4>
	<div class="col-xs-12 col-sm-12 col-md-3 ">
		<label style="color: #337ab7;" >Desde: </label>
		<input type="month" name="par" id="cantidad" class="btn blue btn-outline btn-circle btn-sm">
	</div>
	<div class="col-xs-12 col-sm-12 col-md-3 ">
		<label style="color: #337ab7;" >Hasta: </label>
		<input type="month" name="par" id="cantidad" class="btn blue btn-outline btn-circle btn-sm">
	</div>
	<div class="col-xs-12 col-sm-12 col-md-3 ">
		<label style="color: #337ab7;" >Funcionario: </label>
		<select name="par" id="cantidad" class="btn blue btn-outline btn-circle btn-sm">
			<option value="">Seleccione...</option>
		</select>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-3 ">
		<label style="color: #337ab7;" >Haber/Descuento: </label>
		<select name="par" id="cantidad" class="btn blue btn-outline btn-circle btn-sm">
			<option value="">Seleccione...</option>
		</select>
	</div>
</div>

<div id="divCierre2" style="text-align: center;">
	<a id="addCierre" title="Buscar" class="btn btn-circle red btn-outline">
		<i class="fa fa-search"></i> Buscar
	</a>
</div>	

	
<div id="divCierre" class="col-xs-12 col-sm-12">
	<div class="table-responsive">
		<table class="table table-bordered table-hover table-striped table-condensed">
			<thead>
				<th style="text-align: center;">Funcionario</th>
				<th style="text-align: center;">Haber Descuneto</th>
				<th style="text-align: center;">Periodo</th>
				<th style="text-align: center;">Tipo</th>
			</thead>
			<tbody id="tblCierre"></tbody>
		</table>
	</div>
</div>

<div>
	<div id="divCierre2" style="float: left;">
		<a id="addReportFijos" title="Generar Reporte" class="btn btn-circle yellow btn-outline">
			<i class="fa fa-file-text-o"></i> Reporte
		</a>
	</div>
	
	<div id="divCierre2" style="float: right;">
		<a id="addHaberes" title="Agregar" class="btn btn-circle red btn-outline">
			<i class="fa fa-plus"></i> Agregar
		</a>
		<label for="importHaberes" title="Importar" class="btn btn-circle red btn-outline">
			<i class="fa fa-cloud-upload"></i> Importar
		</label>
		<input type="file" id="importHaberes" style="display: none;" accept="application/vnd.ms-excel">
	</div>
</div>