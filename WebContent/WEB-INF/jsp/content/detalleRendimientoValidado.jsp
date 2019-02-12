<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<div class="table-scrollable">
	<table class="table table-bordered table-striped table-condensed" id="tbl_Detalle">
		<thead>
			<tr>
				<th style="min-width: 100px;">Nombre</th>
				<th id="thbasedia" style="min-width: 125px;">Base Piso Día</th>
				<th>Horas Trabajadas</th>
				<th>Horas Extras</th>
				<th style="min-width: 100px;">Valor Hora Extra</th>
				<th style="min-width: 100px;">Monto Horas Extras</th>
				<th style="min-width: 100px;">Horas Extras 2</th>
				<th style="min-width: 100px;">Valor Hora Extra 2</th>
				<th style="min-width: 100px;">Bono 2</th>
				<th style="min-width: 150px;">Cuartel</th>
				<th style="min-width: 125px;">Faena</th>
				<th style="min-width: 125px;">Labor</th>
				<th>Tipo Pago</th>
				<th style="min-width: 100px;">Valor Dia</th>
				<th>Rendimiento</th>
				<th style="min-width: 100px;">Bono</th>
				<th style="min-width: 125px;">Valor Liquido</th>
				<th style="min-width: 125px;">Maquinaria</th>
				<th style="min-width: 125px;">Implemento</th>
				<th style="min-width: 125px;">Bus</th>
				<th id='col-hide' style="width: 2%;">Modificar</th>
			</tr>
		</thead>
		<tbody id="body_Detalle"></tbody>
	</table>
</div>
<div style="text-align: center">
	<a style="display: none;" id="modRendimiento" onclick="modRendimientoDuiario();" class="btn yellow">
		<i class="fa fa-pencil-square-o"></i> Modificar 
	</a>
	<a style="display: none;" id="modRendimientoIndividual" onclick="modRendimientoIndividual();" class="btn yellow">
		<i class="fa fa-pencil-square-o"></i> Modificar 
	</a>
	<a id="modRendimiento" onclick="rechazar();" class="btn red">
		<i class="fa fa-times"></i> Rechazar 
	</a>
	<a id="volver" onclick="volver()" class="btn blue">
		<i class="fa fa-reply"></i> Volver 
	</a>
</div>