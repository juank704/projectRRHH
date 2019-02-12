<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <div class="col-xs-12 col-sm-12 col-md-12" style="align-text: center;">
		<h3>Labores</h3>
	</div>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	<h4>Filtros</h4>
	<div class="col-xs-12 col-sm-6 col-md-6 ">
		<label style="color: #337ab7;" >Campo: </label>
		<select id="dataHuerto" class="btn blue btn-outline btn-circle btn-sm">
		</select>
	</div>
	<div class="col-xs-12 col-sm-6 col-md-6 ">
		<label style="color: #337ab7;" >Estado: </label>
		<select id="selectEspecie" class="btn blue btn-outline btn-circle btn-sm">
			<option value="">Seleccione...</option>
			<option value="1">Terminado</option>
			<option value="2">Pendiente</option>
		</select>
	</div>
</div>
<div class="table-responsive" id="ignore">
	<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Labor">
		<thead>
			<th>Codigo</th>
			<th>Descripcion</th>
			<th>Tipo</th>
			<th>Unidad de Medida</th>
			<th>Precio</th>
			<th>Fecha Inicio</th>
			<th>Fecha Termino</th>
			<th>Estado</th>
			<th style="width: 8%;">Mod./Borrar</th>
		</thead>
		<tbody id="BodyLabor">
		</tbody>
	</table>
</div>
<div style="text-align: center;">
	<a id="addLabor" onclick="javascript: addLabor()" class="btn btn-circle red btn-outline">
		<i class="fa fa-plus"></i> Agregar
	</a>
</div>