<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<h3>Actualizacion de Sueldo Minimo</h3>
<div class="col-xs-12 col-sm-12 col-md-12 ">
	<div class="col-xs-0 col-sm-2 col-md-2">
	</div>
	<div class="col-xs-12 col-sm-8 col-md-8 portlet light bordered">
		<div class="col-xs-12 col-sm-6 col-md-6">
			<h5>Sueldo Minimo Anterior</h5>
			<div class="input-icon">
				<i class="fa fa-usd" aria-hidden="true"></i>
				<input type="text" class="form-control input-circle" id="sueldoAnterior" value="270.000" readonly>
			</div>
		</div>
		<div class="col-xs-12 col-sm-6 col-md-6">
			<h5>Sueldo Minimo Actual</h5>
			<div class="input-icon">
				<i class="fa fa-usd" aria-hidden="true"></i>
				<input type="text" class="form-control input-circle" id="sueldoActual">
			</div>
		</div>
	</div>
	<div class="col-xs-2 col-sm-2 col-md-2">
	</div>
</div>
<div style="text-align: center;">
	<a id="addAct" onclick="javascript: addPermiso();" class="btn btn-circle red btn-outline">
		<i class="icon-cloud-upload"></i> Guargar
	</a>
</div>
<ul>

