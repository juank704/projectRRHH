<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<div class='col-xs-12 col-sm-12 col-md-12'>
	<table id='datosRg' class='table table-striped table-bordered table-condensed' >
		<thead>
			<tr>
				<th style='min-width: 100px;'>Fecha</th>
				<th style='min-width: 125px;'>Contratista</th>
				<th style='min-width: 200px;'>Supervisor</th>
				<th style='min-width: 200px;'>Nombre Trabajador</th>
				<th style='min-width: 125px;'>Rut Trabajador</th>
				<th style='min-width: 170px;'>Faena</th>
				<th style='min-width: 200px;'>Labor</th>
				<th style='min-width: 100px;'>Tipo Pago</th>
				<th style='min-width: 125px;'>Valor Trato</th>
				<th>Rendimiento</th>
				<th style='min-width: 150px;'>Valor Rendimiento</th>
				<th style='min-width: 100px;'>Bono</th>
				<th style='min-width: 125px;'>Valor Liquido</th>
				<th>Eliminar</th>
			</tr>
		</thead>
		<tbody id='detalleTblOrden'></tbody>
		<tfoot>
            <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th style="color: #337ab7;font-weight: bold; text-align:right">Total Neto:</th>
                <th></th>
                <th style="color: #337ab7;font-weight: bold; text-align:right">Iva:</th>
                <th></th>
                <th style="color: #337ab7;font-weight: bold; text-align:right">Total:</th>
                <th></th>
            </tr>
        </tfoot>
	</table>
</div>
<div style="text-align: center; width: 100%;" class="col-xs-12 col-sm-12 col-md-12 portlet">
	<div style="float: right;" class="">
		<div style="width: 200px" >
			Total 
			<div class='input-icon'>
				<i class='fa fa-usd'></i>
				<input type="text" readonly class="form-control number required" id="total">
			</div>
		</div>
	</div>
	<div style="float: right;" class="">
		<div style="width: 200px" >
			Iva
			<div class='input-icon'>
				<i class='fa fa-usd'></i>
				<input type="text" readonly class="form-control number required" id="total_iva">
			</div>
		</div>
	</div>
	<div style="float: right;" class="">
		<div style="width: 200px" >
			Total Neto
			<div class='input-icon'>
				<i class='fa fa-usd'></i>
				<input type="text" readonly class="form-control number required" id="total_liquidos">
			</div>
		</div>
	</div>
</div>
<div style='text-align: center;'>
	<a class='btn green-dark submit-modal' onclick='popUpDetalle()'>Generar Orden de Pago</a>
	<a href='liquidacionContratista' class='btn red'>Cancelar</a>
</div>