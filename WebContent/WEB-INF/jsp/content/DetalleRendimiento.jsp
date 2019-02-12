<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<table class="table table-bordered table-striped table-condensed" id="tbl_RendimientoVlidadr">
	<tfoot>
		<tr class="success">
			<th>Totales</th>
			<th></th>
			<th id="tHoras"></th>
			<th></th>
			<th></th>
			<th></th>
			<th></th>
			<th></th>
			<th id="tBono2"></th>
			<th></th>
			<th></th>
			<th></th>
			<th></th>
			<th id="tValorDia"></th>
			<th id="tRendimiento"></th>
			<th id="tBono1"></th>
			<th id="tValorLiquido"></th>
			<th></th>
			<th></th>
			<th></th>
<!-- 			<th></th> -->
		</tr>
	</tfoot>
</table>
<div style="text-align: center">
	<a id="updDatos" onclick="updateRendimiento();" class="btn green-dark ">
		<i class="fa fa-check"></i> Validar
	</a>
	<a style="display: none;" id="modRendimiento" onclick="modRendimientoDuiario();" class="btn yellow">
		<i class="fa fa-pencil-square-o"></i> Modificar 
	</a>
	<a style="display: none;" id="modRendimientoIndividual" onclick="modRendimientoIndividual();" class="btn yellow">
		<i class="fa fa-pencil-square-o"></i> Modificar 
	</a>
	<a id="modRendimiento" onclick="rechazar();" class="btn red">
		<i class="fa fa-times"></i> Eliminar 
	</a>
	<a id="volver" onclick="volver()" class="btn blue">
		<i class="fa fa-reply"></i> Volver 
	</a>
</div>