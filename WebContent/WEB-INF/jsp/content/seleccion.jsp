<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<h3>Seleccion</h3>
<div class="table-responsive">
	<table class="table table-bordered table-hover table-striped table-condensed" id="tblSeleccion">
		<thead>
			<tr>
				<th>Seleccion</th>
				<th>Apellido</th>
				<th>Nombre</th>
				<th>Sueldo Base</th>
				<th>Cargo</th>
				<th>Posicion</th>
				<th>Observaciones</th>
				<th>Fecha de Inicio</th>
			</tr>
		</thead>
		<tbody id="bodySeleccion"></tbody>
	</table>
</div>
<div style="text-align: center;">
	<a id="addAct" onclick="javascript: finish();" class="btn btn-circle red btn-outline">
		<i class="fa fa-plus"></i> Terminar Proceso
	</a>
</div>