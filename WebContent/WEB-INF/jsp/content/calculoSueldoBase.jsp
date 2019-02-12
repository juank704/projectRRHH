<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>


<style>
.customEdit:hover {
	color: red !important;
}

div {
	/* border: 1px solid red; */
	
}

form {
	outline: none !important;
	padding: 0em !important;
	border: 0px !important;
	border-radius: 0 !important;
	margin: 0 !important;
	box-shadow: 0 !important;
}

.help-block {
	color: red !important;
}

.customEdit:hover {
	color: red !important;
}

radio:focus {
	outline: none;
}

.radio-test {
	-webkit-appearance: button;
	-moz-appearance: button;
	appearance: button;
	border: 4px solid #ccc;
	border-top-color: #bbb;
	border-left-color: #bbb;
	background: #fff;
	width: 25px;
	height: 25px;
	border-radius: 50%;
	margin-left: 35px !important;
}

.radio-test:checked {
	border: 10px solid #4099ff;
}

.blank-form {
	outline: none !important;
	padding: 0em !important;
	border: 0px !important;
	border-radius: 0 !important;
	margin: 0 !important;
	box-shadow: none !important;
}

.blank-input {
	outline: none !important;
	border: none !important;
}

.display-none {
	display: none !important;
}

.padding-30 {
	padding: 30px;
}

.padding-top-50 {
	padding-top: 50px;
}

.custom-icon-nav {
	border-bottom: hidden !important;
	right: 0px !important;
	margin-top: 10px !important;
	background-color: #ffff !important;
	border: 1px solid #ddd !important;
	border-bottom-color: transparent !important;
	margin-right: 7px !important;
	margin-left: 10px !important;
	/*display: none !important;*/
}

.label-color {
	color: #337ab7
}
</style>


<!-- Inicio Calculo Sueldo Base -->

<div class="padding-30"></div>


<div class="row">

	<div class="col-md-12 portlet light bordered">
		<h4>Buscar Trabajador</h4>
		<div class="col-md-3 col-md-offset-2">
			<label class="label-color">Codigo: </label> <input type="text"
				name="codigo" id="codigo" class="form-control input-circle">
		</div>
		<div class="col-md-3">
			<label class="label-color">Rut: </label> <input type="text"
				name="rut" id="rut" class="form-control input-circle input_rut">
		</div>

		<div class="col-md-3">
			<button id="searchWorker" title="Buscar"
				onclick="searchWorker($('#rut').val());" disabled
				class="btn btn-circle red btn-outline">
				<i class="fa fa-search"></i> Buscar
			</button>
		</div>
	</div>




	<div class="col-md-10 col-md-offset-1">
		<form id="calcularSueldoBaseForm"
			style="width: 100%; height: 100% !important; padding: 0 !important; border: 0 !important;">
			<div class="col-md-12">

				<div class="col-md-12 portlet light bordered">

					<div class="row">

						<div class="row" style="margin-bottom: 5px;">
							<div class="col-md-2">
								<label class="label-color">Porcentaje AFP:</label>
							</div>
							<div class="col-md-3 ">
								<input id="porcentajeAFP" type="text"
									class="row_dataCalculo form-control input-circle"
									col_name="porcentajeAFP" name="porcentajeAFP">
							</div>
							<div class="col-md-2 ">
								<label class="label-color">Valor UF: </label>
							</div>
							<div class="col-md-3">
								<input id="valorUF" readonly
									class="row_dataCalculo form-control input-circle"
									col_name="valorUF" name="valorUF">
							</div>
						</div>
						<div class="row" style="margin-bottom: 5px;">
							<div class="col-md-2">
								<label class="label-color">AFP: </label>
							</div>
							<div class="col-md-3">
								<select id="idAFP"
									class="row_dataCalculo form-control input-circle"
									col_name="idAFP" name="idAFP">
									<option value="">Seleccione</option>
								</select>
							</div>
							<div class="col-md-2 ">
								<label class="label-color">Valor UTM:</label>
							</div>
							<div class="col-md-3 ">
								<input id="valorUTM" readonly
									class="row_dataCalculo form-control input-circle"
									col_name="valorUTM" name="valorUTM">
							</div>
						</div>
						<div class="row" style="margin-bottom: 5px;">
							<div class="col-md-2">
								<label class="label-color">Salud: </label>
							</div>
							<div class="col-md-3">
								<input id="salud" readonly
									class="row_dataCalculo form-control input-circle"
									col_name="salud" name="salud">
							</div>
							<div class="col-md-2 ">
								<label class="label-color">Sueldo Minimo:</label>
							</div>
							<div class="col-md-3 ">
								<input id="sueldoMinimo" type="number" col_name="sueldoMinimo"
									readonly class="row_dataCalculo form-control input-circle"
									name="sueldoMinimo">
							</div>
						</div>

						<div class="row" style="margin-bottom: 5px;">
							<div class="col-md-2">
								<label class="label-color">AFC: </label>
							</div>
							<div class="col-md-3">
								<input id="valorAFC" readonly
									class="row_dataCalculo form-control input-circle"
									col_name="valorAFC" name="valorAFC">
							</div>
						</div>


						<div class="row" style="margin-bottom: 5px;">
							<div class="col-md-2">
								<label class="label-color">AFC: </label>
							</div>
							<div class="col-md-3">
								Si <input type="radio" id="AFC" class="row_dataCalculo"
									col_name="AFC" name="AFC" value="1" checked> No <input
									type="radio" id="AFC" class="row_dataCalculo" col_name="AFC"
									name="AFC" value="0" >
							</div>
							<div class="col-md-2">
								<label class="label-color">Tope AFP:</label>
							</div>
							<div class="col-md-3">
								<input id="topeAFP" type="text" col_name="topeAFP" readonly
									name="topeAFP"
									class="row_dataCalculo form-control input-circle">
							</div>
						</div>


						<div class="row" style="margin-bottom: 5px;">

							<div class="col-md-2">
								<label class="label-color">Gratificación: </label>
							</div>
							<div class="col-md-3">
								<label>Si</label> <input type="radio" id="gratificacion"
									class="row_dataCalculo" col_name="gratificacion"
									name="gratificacion" value="1"> <label>No</label> <input
									type="radio" id="gratificacion" class="row_dataCalculo"
									col_name="gratificacion" name="gratificacion" value="0" checked>
							</div>

							<div class="col-md-2">
								<label class="label-color">Tope AFC:</label>
							</div>
							<div class="col-md-3">
								<input id="topeAFC" type="text" col_name="topeAFC" readonly
									name="topeAFC"
									class="row_dataCalculo form-control input-circle">
							</div>


						</div>


						<div class="row" style="margin-top: 40px; margin-bottom: 40px;">

							<div class="col-md-7"></div>

							<div class="col-md-2">
								<label class="label-color">Sueldo Liquido Pactado: </label>
							</div>
							<div class="col-md-3">
								<input id="sueldoLiquido" type="text" col_name="sueldoLiquido"
									name="sueldoLiquido"
									class="row_dataCalculo form-control input-circle">
							</div>

						</div>

					</div>


					<div class="row padding-30">
						<h4>Haberes</h4>

						<!-- 	<div class="col-md-2 padding-30">
							<a id="addHaberImponible" class="btn btn-circle red btn-outline">
								<i class="fa fa-plus"></i>
							</a>
						</div> -->


						<table
							class="table table-striped table-bordered table-hover table-checkable"
							id="datatable_haberes">

							<thead>
								<tr role="row" class="heading">
									<th style="width: 2%;"><input
										style="margin-left: auto; margin-right: auto;" type='checkbox'
										title='Seleccionar Todo' id='checkAll'
										onchange='javascript: selectALL(this);' class='checkbox' /></th>

									<th>Tipo de Bono</th>
									<th style="min-width: 100px;">Nombre</th>
									<th>Monto</th>
									<th>Descripción</th>
									<th style="min-width: 100px;">Actions</th>
								</tr>
							</thead>
							<tbody></tbody>

						</table>

					</div>



					<div class="row padding-30">
						<h4>Haberes No Imponibles</h4>

						<table
							class="table table-striped table-bordered table-hover table-checkable"
							id="datatable_haberesNoImponibles">

							<thead>
								<tr role="row" class="heading">
									<th style="width: 2%;"><input
										style="margin-left: auto; margin-right: auto;" type='checkbox'
										title='Seleccionar Todo' id='checkAll'
										onchange='javascript: selectALL(this);' class='checkbox' /></th>

									<th>Tipo de Bono</th>
									<th style="min-width: 100px;">Nombre</th>
									<th>Monto</th>
									<th>Descripción</th>
									<th style="min-width: 100px;">Actions</th>
								</tr>
							</thead>
							<tbody></tbody>

						</table>

					</div>


					<div class="row padding-30">

						<h4>Descuentos</h4>

						<table
							class="table table-striped table-bordered table-hover table-checkable"
							id="datatable_descuentos">

							<thead>
								<tr role="row" class="heading">
									<th style="width: 2%;"><input
										style="margin-left: auto; margin-right: auto;" type='checkbox'
										title='Seleccionar Todo' id='checkAll'
										onchange='javascript: selectALL(this);' class='checkbox' /></th>

									<th>Tipo de Bono</th>
									<th style="min-width: 100px;">Nombre</th>
									<th>Monto</th>
									<th>Descripción</th>
									<th style="min-width: 100px;">Actions</th>
								</tr>
							</thead>
							<tbody></tbody>

						</table>


					</div>



					<!-- <div class="row padding-30">

						<h4>APV</h4>

						<table
							class="table table-striped table-bordered table-hover table-checkable"
							id="datatable_APV">

							<thead>
								<tr role="row" class="heading">
									<th style="width: 2%;"><input
										style="margin-left: auto; margin-right: auto;" type='checkbox'
										title='Seleccionar Todo' id='checkAll'
										onchange='javascript: selectALL(this);' class='checkbox' /></th>

									<th>Institucion APV</th>
									<th>Moneda APV</th>
									<th>Valor APV</th>
									<th>Deposito APV</th>
									<th style="min-width: 100px;">Actions</th>
								</tr>
							</thead>
							<tbody></tbody>

						</table>


					</div> -->


				</div>





			</div>

			<div class="col-md-12">
				<div class="col-md-2 col-md-offset-4">
					<button id="cambiar" class="btn btn-circle blue btn-outline"
						type="submit">
						<i class="fa fa-plus"></i> Guardar
					</button>
				</div>
				<div>
					<a id="addAct" onclick="javascript:history.back();"
						class="btn btn-circle red btn-outline"> <i class="fa fa-plus"></i>
						Cancelar
					</a>
				</div>
			</div>


		</form>
	</div>




</div>

<!-- <article id="loading" class="loading_dos" style="display: block;">
<div id="modal" class="modal" style="display: block;"></div>
</article> -->