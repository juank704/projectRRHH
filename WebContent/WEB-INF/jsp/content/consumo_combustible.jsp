<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
<div class="col-xs-12 col-sm-12 col-md-12 portlet">
	<div class="col-xs-12 col-sm-4 col-md-4">
		<label style="color: #337ab7;font-weight: bold">Fecha:</label>
		<input id="BoxFecha" type="text" name="fecha" class="form-control" readonly style="width: 200px;" placeholder="Ingrese Fecha">
	</div>

	<div class="col-xs-12 col-sm-4 col-md-4">
		<label style="color: #337ab7;font-weight: bold">Campo:</label>
		<select id="BoxCampo" class="form-control input-sm required" onchange="cambioCampo(this);" style="width: 200px;">
			<option value="" disabled selected hidden=""></option>	
		</select>
	</div>
	
	<div class="col-xs-12 col-ms-4 col-md-4">
		<label style="color: #337ab7;font-weight: bold">Tipo:</label>
		<select id="BoxTipo" class="form-control input-sm" style="width: 200px;">
			<option value="" disabled selected hidden="">Seleccione</option>
			<option value=1>Vehículo</option>
			<option value=2>Agrícola</option>	
		</select>
	</div>
</div>	

<div class="col-xs-12 col-sm-12 col-md-12 portlet">
	<div class="col-xs-12 col-sm-4 col-md-4">
		<label style="color: #337ab7;font-weight: bold">Vehículo:</label>
		<select id="BoxVehiculo" class="form-control input-sm" style="width: 200px;">
		</select>
	</div>
	<div class="col-xs-12 col-sm-4 col-md-4">
		<label style="color: #337ab7;font-weight: bold">Stock Combustible:</label>
		<input type="number" id="stock" class="form-control" disabled style="width: 200px;" placeholder="">
	</div>
	<div class="col-xs-12 col-sm-4 col-md-4">
		<label style="color: #337ab7;font-weight: bold">Litros:</label>
		<input type="text" id="BoxLitro" onkeypress='return justNumbers(event);' onkeyup="valStock(this);" class="form-control" style="width: 200px;" placeholder="Ingrese Cantidad Litros">
	</div>
</div>

<div class="col-xs-12 col-sm-12 col-md-12 portlet">
	<div class="col-xs-12 col-sm-4 col-md-4">
		<label style="color: #337ab7;font-weight: bold">Horómetro:</label>
		<input type="text" id="BoxHorometro" onkeypress='return justNumbers(event);' class="form-control" style="width: 200px;" placeholder="Ingrese Horómetro">
	</div>
	
	<div class="col-xs-12 col-sm-4 col-md-4">
		<label style="color: #337ab7;font-weight: bold">Operadores:</label>
		<select id="BoxTrabajador" class="form-control input-sm" style="width: 200px"></select>	
	</div>
	
<!-- 	<div class="col-xs-12 col-sm-4 col-md-4"> -->
<!-- 		<label style="color: #337ab7;font-weight: bold">Implemento:</label> -->
<!-- 		<select id="BoxImplemento" class="form-control input-sm" style="width: 200px"> -->
<!-- 			<option value="" disabled selected hidden="">Seleccione</option> -->
<!-- 			<option value=1>Implemento1</option> -->
<!-- 			<option value=2>Implemento2</option> -->
<!-- 			<option value=3>Implemento3</option> -->
<!-- 		</select> -->
<!-- 	</div> -->
</div>

</div>


<div style="text-align: center;">
	<a id="Guardar" onclick="javascript: ingresar_consumo()" class="btn btn-circle red btn-outline">
		<i class="icon-cloud-upload"></i> Ingresar Consumo
	</a>
</div>
<div id="fileArea" style="display: none;"></div>

<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>