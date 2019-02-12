<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<div>
	<h3>Movimientos <small>> Movimientos de Personal</small></h3>
</div>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	<h4>Filtros</h4>
	<div class="col-xs-12 col-sm-12 col-md-3 ">
		<label style="color: #337ab7;" >Desde: </label>
		<input type="month" name="filLiq" id="liqDes" class="btn blue btn-outline btn-circle btn-sm">
	</div>
	<div class="col-xs-12 col-sm-12 col-md-3 ">
		<label style="color: #337ab7;" >Hasta: </label>
		<input type="month" name="filLiq" id="liqHas" class="btn blue btn-outline btn-circle btn-sm">
	</div>
	<div class="col-xs-12 col-sm-12 col-md-3 ">
		<label style="color: #337ab7;" >Funcionario: </label>
		<select name="filLiq" id="cantidad" class="btn blue btn-outline btn-circle btn-sm">
			<option value="">Seleccione...</option>
		</select>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-3 ">
		<a id="seMov" title="Buscar" class="btn btn-circle red btn-outline">
			<i class="fa fa-search"></i> Buscar
		</a>
	</div>	
</div>

<div id="divCierre" class="col-xs-12 col-sm-12">
	<div class="table-responsive">
		<table class="table table-bordered table-hover table-striped table-condensed">
			<thead>
				<th style="text-align: center;">Periodo</th>
				<th style="text-align: center;">Funcionario</th>
				<th style="text-align: center;">Tipo Movimiento</th>
				<th style="text-align: center;">Evento</th>
				<th style="text-align: center; width: 2%;">Editar/Eliminar</th>
			</thead>
			<tbody id="tblCierre">
				<tr>
					<td>agosto de 2013</td>
					<td>Aquiles Baeza</td>
					<td>Haber</td>
					<td>Pago de remuneraciones</td>
					<td>
						<a id="addCierre" title="Modificar" class="btn btn-circle yellow btn-outline">
							<i class="fa fa-pencil-square-o fa-lg"></i>
						</a>
						<a id="addCierre" title="Eliminar" class="btn btn-circle red btn-outline">
							<i class="fa fa-trash-o fa-lg"></i>
						</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
<div>
	<div id="divCierre2" style="float: left;">
		<a id="addReportMovPersonal" title="Generar Reporte" class="btn btn-circle yellow btn-outline">
			<i class="fa fa-file-text-o"></i> Reporte
		</a>
	</div>
	
	<div id="divCierre2" style="float: right;">
		<a id="addHaberes" href="addMovPersonal" title="Agregar" class="btn btn-circle red btn-outline">
			<i class="fa fa-plus"></i> Agregar
		</a>
	</div>
</div>