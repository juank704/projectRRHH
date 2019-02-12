<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>



<!-- Datos Basicos Trabajador -->
<div class="row">

	<div class="col-md-12 padding-30-0-30-0">

		<div class="col-md-10">
			<div class="col-md-12">
				<h4>
					<strong id="name"></strong>
				</h4>
				<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
					<div class="col-md-6">
					<h5>
						Codigo:<strong name="strong" id="codigo"></strong>
					</h5>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
					<h5>
						Antiguedad:<strong name="strong" id="fechaIngresoCompania"></strong>
					</h5>
					</div>
				</div>
			</div>
		</div>

	</div>

</div>
<!-- Datos Basicos Trabajador -->

<!-- Seccion de Formulario -->

	<form id="vacacionesForm" class="col-md-12 col-md-offset-0"
		action="#" method="post">

		<div class="col-md-12">

			<div class="col-md-12 portlet light bordered">

				<div class="row margin-bottom-5">

					<div class="col-xs-12 col-sm-12 col-md-2 col-lg-2">
						<label class="colorLabel">Fecha de Ingreso:</label>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-2 col-lg-2">
						<input disabled readonly id="fechaIngreso" type="text"
							class="row_data form-control input-circle"
							col_name="fechaIngreso" name="fechaIngreso">
					</div>
					<div class="col-xs-12 col-sm-12 col-md-2 col-lg-2">
						<label class="colorLabel">Fecha Actual: </label>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-2 col-lg-2">
						<input readonly disabled id="fechaActual" class="row_data form-control input-circle"
							col_name="fechaActual" name="fechaActual">
					</div>

				</div>

				<div class="row margin-bottom-5">

					<div class="col-xs-12 col-sm-12 col-md-2 col-lg-2">
						<label class="colorLabel">Dias Legales: </label>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-2 col-lg-2">
						<input type="number" min="0" id="diasLegales" class="row_data form-control input-circle"
							col_name="diasLegales" name="diasLegales">
					</div>

					<div class="col-xs-12 col-sm-12 col-md-2 col-lg-2">
						<label class="colorLabel">Dias Disponibles: </label>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-2 col-lg-2">
						<input type="number" min="0" id="diasDisponibles"
							class="row_data form-control input-circle"
							col_name="diasDisponibles" name="diasDisponibles">
					</div>

				</div>


				<div class="row margin-bottom-5">

					<div class="col-xs-12 col-sm-12 col-md-2 col-lg-2">
						<label class="colorLabel">Dias Convencionales: </label>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-2 col-lg-2">
						<input type="number" min="0" id="diasConvencionales"
							class="row_data form-control input-circle"
							col_name="diasConvencionales" name="diasConvencionales">
					</div>

					<div class="col-xs-12 col-sm-12 col-md-2 col-lg-2">
						<label class="colorLabel">Desde: </label>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-2 col-lg-2">
						<input readonly id="fechaInicio" type="text"
						class="row_data form-control input-circle"
						col_name="fechaInicio" name="fechaInicio">
					</div>

					<div class="col-xs-12 col-sm-12 col-md-2 col-lg-2">
						<label class="colorLabel">Hasta: </label>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-2 col-lg-2">
						<input readonly id="fechaTermino" type="text"
							class="row_data form-control input-circle"
							col_name="fechaTermino" name="fechaTermino">
					</div>

				</div>


				<div class="row">

					<div class="col-xs-12 col-sm-12 col-md-2 col-lg-2">
						<label class="colorLabel">Dias Progresivos: </label>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-2 col-lg-2">
						<input type="number" min="0" id="diasProgresivos"
							class="row_data form-control input-circle"
							col_name="diasProgresivos" name="diasProgresivos">
					</div>

				</div>


				<div class="row">

					<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>

					<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
							<button id="addSolicitudVacaciones"
								class="btn btn-circle red btn-outline" type="submit">
								<i class="fa fa-plus"></i>
							</button>
						</div>
					</div>

					<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>

				</div>

			</div>

		</div>

	</form>

<!-- Seccion de Formulario -->


<div class="col-md-12">

	<table
		class="table table-striped table-bordered table-hover table-checkable"
		id="datatable_ajax">

		<thead>
			<tr role="row" class="heading">
				<th class="min-width-50">N°</th>
				<th class="min-width-150">Fecha Desde</th>
				<th class="min-width-150">Fecha Hasta</th>
				<th class="min-width-100">Días Habiles</th>
				<th class="min-width-100">Período</th>
				<th class="min-width-50">L</th>
				<th class="min-width-50">P</th>
				<th class="min-width-50">C</th>
				<th class="min-width-150">Actions</th>
			</tr>

		</thead>
		<tbody></tbody>

	</table>


</div>

<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
	<button class="btn btn-circle red btn-outline"
		onclick="javascript:history.back();">
		Volver <i class="fa fa-reply"></i>
	</button>
</div>

<span class="espacio">.</span>

<style>
.colorLabel{
color: #337ab7;
}
.min-width-150{
min-width: 150px;
}
.min-width-100{
min-width: 100px;
}
.min-width-50{
min-width: 50px;
}
.padding-30-0-30-0{
padding: 30px 0 30px 0;
}
.margin-bottom-5{
margin-bottom: 5px;
}
.espacio {
color: #FFFFFF;
}
</style>