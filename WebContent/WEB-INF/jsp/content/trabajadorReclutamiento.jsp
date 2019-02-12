<div class="row">
<form id="insertarTrabajadorForm1" class="col-md-12 blank-form">
	<div class="col-md-12" id="navigation">
		<div class="col-xs-12 col-sm-12 col-md-12">
			<ul class="nav nav-tabs">
				<li id="personales" class="active"><a data-toggle="tab"
					href="#datos_personales">Trabajador Reclutamiento</a></li>

				<button type="submit" id='btnSave' title='salvar'
					style="display: none;"
					class='custom-icon-nav btn blue btn-outline btn-md btn_save customEdit'>
					<span class='fa fa-plus fa-lg customEdit'></span>
				</button>

				<a id='btnEdit' title='editar' style="display: none;"
					class='custom-icon-nav btn yellow btn-outline btn-md btn_edit customEdit'><span
					class='fa fa-pencil-square-o fa-lg customEdit'></span></a>

				<a id='btnUpdate' title='actualizar' style="display: none;"
					class='custom-icon-nav btn yellow btn-outline btn-md btn_update customEdit'><span
					class='fa fa-plus fa-lg customEdit'></span></a>

				<a id='btnCancel' title='cancelar'
					onclick="javascript:history.back();"
					class='custom-icon-nav btn red btn-outline btn-md btn_cancel customEdit'>
					<span class='fa fa-times fa-lg customEdit'></span>
				</a>
			</ul>
		</div>
	</div>
</form>

<div class="row">
	<div class="tab-content">
		<div class="tab-pane fade in active" id="datos_personales"
			style="padding: 30px;">

			<form id="insertarTrabajadorForm2" class="col-md-12 blank-form">

				<div class="col-xs-12 col-sm-12 col-md-12">

					<div class="wrapper">

						<div class="row">

							<div class="one col-md-12">
								<div class="table-responsive">
									<table class="table table-condensed table-bordered">
										<tr>
											<th>Nacionalidad:</th>
											<td><select disabled id="idNacionalidad"
												class="form-control input-circle row_data" edit-type="click"
												col_name="idNacionalidad" name="idNacionalidad">
													<option value="">Seleccione...</option>
											</select></td>
										</tr>
										<tr>
											<th>Rut</th>
											<td><input id="rutWorker"
												class="blank-input form-control input-md row_data input_rut rut"
												col_name="rut" type="text" name="rut"></td>
										</tr>
										<tr class="tr-display-none">
											<th>Pasaporte</th>
											<td><input id="pasaporte"
												onkeypress="return justNumbers2(event);"
												class="blank-input form-control input-md row_data"
												col_name="pasaporte" type="text" name="pasaporte"></td>
										</tr>
										<tr class="tr-display-none">
											<th>Rut Temporal</th>
											<td><input id="rutTemporal"
												class="blank-input form-control input-md row_data input_rut rut"
												col_name="rutTemporal" type="text" name="rutTemporal"></td>
										</tr>
										<tr>
											<th>Nombre</th>
											<td><input id="name2"
												class="blank-input form-control input-md row_data"
												edit-type="click" col_name="nombre" name="nombre"></td>
										</tr>
										<tr>
											<th>Apellido Paterno</th>
											<td><input id="apellidoPaterno"
												class="blank-input form-control input-md row_data"
												edit-type="click" col_name="apellidoPaterno"
												name="apellidoPaterno"></td>
										</tr>
										<tr>
											<th>Apellidos Materno</th>
											<td><input id="apellidoMaterno"
												class="blank-input form-control input-md row_data"
												edit-type="click" col_name="apellidoMaterno"
												name="apellidoMaterno"></td>
										</tr>
									</table>
								</div>

							</div>


							<div class="seven col-md-12">

								<div class="table-responsive">
									<table class="table table-condensed table-bordered">
										<tr>
											<th>Cuenta Primaria:</th>
											<td id="cuentaPrimaria1"><center>
													<input disabled type="radio" col_name="cuentaPrimaria"
														class="form-check-input row_dataCuenta"
														name="cuentaPrimaria" id="i1">
												</center></td>
										</tr>
										<tr>
											<th>Tipo de Cuenta:</th>
											<td><select id="idTipoCuenta1"
												class="form-control input-circle row_dataCuenta"
												edit-type="click" col_name="idTipoCuenta"
												name="idTipoCuenta">
													<option value="">Seleccione...</option>
											</select></td>
										</tr>
										<tr>
											<th>Banco:</th>
											<td><select id="idBanco1"
												class="form-control input-circle row_dataCuenta"
												edit-type="click" col_name="idBanco" name="idBanco">
													<option value="">Seleccione...</option>
											</select></td>
										</tr>
										<tr>
											<th>Cuenta:</th>
											<td><input onkeypress="return justNumbers2(event);"
												id="nCuenta1"
												class="blank-input form-control input-md row_dataCuenta"
												col_name="nCuenta" type="text" name="nCuenta"></td>
										</tr>
									</table>
								</div>

							</div>


							<div class="eight col-md-12">

								<div class="table-responsive">
									<table class="table table-condensed table-bordered">
										<tr>
											<th>Cuenta Primaria:</th>
											<td id="cuentaPrimaria2"><center>
													<input type="radio" col_name="cuentaPrimaria"
														class="form-check-input center row_dataCuenta"
														name="cuentaPrimaria" id="i2">
												</center></td>
										</tr>
										<tr>
											<th>Tipo de Cuenta:</th>
											<td><select id="idTipoCuenta2"
												class="form-control input-circle row_dataCuenta"
												edit-type="click" col_name="idTipoCuenta"
												name="idTipoCuenta">
													<option value="">Seleccione...</option>
											</select></td>
										</tr>
										<tr>
											<th>Banco:</th>
											<td><select id="idBanco2"
												class="form-control input-circle row_dataCuenta"
												edit-type="click" col_name="idBanco" name="idBanco">
													<option value="">Seleccione...</option>
											</select></td>
										</tr>
										<tr>
											<th>Cuenta:</th>
											<td><input onkeypress="return justNumbers2(event);"
												id="nCuenta2"
												class="blank-input form-control input-md row_dataCuenta"
												col_name="nCuenta" type="text" name="nCuenta"></td>
										</tr>
									</table>

								</div>

							</div>


						</div>

						<div class="row">

							<div class="two col-md-12">
								<div class="table-responsive">
									<table class="table table-condensed table-bordered">
										<tr>
											<th>Region:</th>
											<td><select id="idRegion"
												class="form-control input-circle row_data" edit-type="click"
												col_name="idRegion" name="idRegion">
													<option value="">Seleccione...</option>
											</select></td>
										</tr>
										<tr>
											<th>Provincia:</th>
											<td><select id="idProvincia"
												class="form-control input-circle row_data" edit-type="click"
												col_name="idProvincia" name="idProvincia">
													<option value="">Seleccione...</option>
											</select></td>
										</tr>
										<tr>
											<th>Comuna:</th>
											<td><select id=idComuna
												class="form-control input-circle row_data" edit-type="click"
												col_name="idComuna" name="idComuna">
													<option value="">Seleccione...</option>
											</select></td>
										</tr>
									</table>
								</div>
							</div>

							<div class="three col-md-12">

								<div class="table-responsive">
									<table class="table table-condensed table-bordered">
										<tr>
											<th>F/Nacimiento:</th>
											<td><input readonly id="fNacimiento" type="text"
												class="form-control input-circle row_data fecha"
												edit-type="click" col_name="fNacimiento" name="fNacimiento"></td>
										</tr>
										<tr>
											<th>Sexo:</th>
											<td><select id="idGenero"
												class="form-control input-circle row_data" edit-type="click"
												col_name="idGenero" name="idGenero">
													<option value="">Seleccione...</option>
											</select></td>
										</tr>
										<tr>
											<th>Estado Civil:</th>
											<td><select disabled id="idEstadoCivil"
												class="form-control input-circle row_data" edit-type="click"
												col_name="idEstadoCivil" name="idEstadoCivil">
													<option value="">Seleccione...</option>
											</select></td>
										</tr>
									</table>
								</div>

							</div>

							<div class="four col-md-12">
								<div class="table-responsive">
									<table class="table table-condensed table-bordered">
										<tr>
											<th>Contacto Emergencias:</th>
											<td></td>
										</tr>
										<tr>
											<th>Nombre</th>
											<td><input id="nombreEmergencia"
												class="blank-input form-control input-md row_data"
												edit-type="click" col_name="nombreEmergencia"
												name="nombreEmergencia"></td>
										</tr>
										<tr>
											<th>Telefono</th>
											<td><input onkeypress="return justNumbers2(event);"
												id="telefonoEmergencia"
												class="blank-input form-control input-md row_data"
												edit-type="click" col_name="telefonoEmergencia"
												name="telefonoEmergencia"></td>
										</tr>
										<tr>
											<th>Email</th>
											<td><input id="emailEmergencia"
												class="blank-input form-control input-md row_data"
												edit-type="click" col_name="emailEmergencia"
												name="emailEmergencia"></td>
										</tr>
										<tr>
											<th>parentesco</th>
											<td><select id="parentesco" name="parentesco"
												class="form-control input-circle row_data" edit-type="click"
												col_name="parentesco">
													<option value="">Seleccione...</option></td>
										</tr>
									</table>
								</div>
							</div>

						</div>


						<div class="row">

							<div class="five col-md-12">
								<div class="table-responsive">
									<table class="table table-condensed table-bordered">
										<tr>
											<th>Casa:</th>
											<td><input id="phoneCasa"
												onkeypress="return justNumbers2(event);"
												class="blank-input form-control input-md row_data"
												edit-type="click" col_name="telefono" name="telefono"></input></td>
										</tr>
										<tr>
											<th>Celular:</th>
											<td><input id="celular"
												onkeypress="return justNumbers2(event);"
												class="blank-input form-control input-md row_data"
												edit-type="click" col_name="celular" name="celular"></input></td>
										</tr>
										<tr>
											<th>E-mail:</th>
											<td><input id="mailWorker"
												class="blank-input form-control input-md row_data"
												edit-type="click" col_name="email" name="email"></input></td>
										</tr>
										<tr>
											<th>Direccion:</th>
											<td><input id="direccion"
												class="blank-input form-control input-md row_data"
												edit-type="click" col_name="direccion" name="direccion"></input></td>
										</tr>
										<tr>
											<th>Recorrido Bus:</th>
										</tr>
										<tr>
											<th>Recorrido:</th>
											<td><select id="recorrido"
												class="form-control input-circle row_data" edit-type="click"
												col_name="recorrido" name="idSector">
													<option value="">Seleccione...</option>
											</select></td>
										</tr>
										<tr>
											<th>Sector:</th>
											<td><select id="idSector"
												class="form-control input-circle row_data" edit-type="click"
												col_name="idSector" name="idSector">
													<option value="">Seleccione...</option>
											</select></td>
										</tr>

									</table>
								</div>

							</div>

							<div class="six col-md-12">
								<div class="table-responsive">
									<table class="table table-condensed table-bordered">
										<tr>
											<th>Nivel de Educacion:</th>
											<td><select id="nivelEducacion"
												class="form-control input-circle row_dataInstitucion"
												edit-type="click" col_name="nivelEducacion"
												name="nivelEducacion">
													<option value="">Seleccione...</option>
											</select></td>
										</tr>
										<tr>
											<th>Nivel:</th>
											<td><select id="nivel"
												class="form-control input-circle row_dataInstitucion"
												edit-type="click" col_name="nivel" name="nivel">
													<option value="">Seleccione...</option>
											</select></td>
										</tr>
										<tr>
											<th>Carrera/Oficio:</th>
											<td><select id="carrera"
												class="form-control input-circle row_dataInstitucion"
												edit-type="click" col_name="carrera" name="carrera">
													<option value="">Seleccione...</option>
											</select></td>
										</tr>
										<tr>
											<th>Instituciones:</th>
											<td><select id="instituciones"
												class="form-control input-circle row_dataInstitucion"
												edit-type="click" col_name="instituciones"
												name="instituciones">
													<option value="">Seleccione...</option>
											</select></td>
										</tr>
										<tr>
											<th>Nombre Institucion:</th>
											<td><select id="nombreInstitucion"
												class="form-control input-circle row_dataInstitucion"
												edit-type="click" col_name="nombreInstitucion"
												name="nombreInstitucion">
													<option value="">Seleccione...</option>
											</select></td>
										</tr>
										<tr>
											<th>Fecha Desde:</th>
											<td><input readonly id="fechaDesdeInstitucion"
												type="text"
												class="form-control input-circle row_dataInstitucion fecha"
												edit-type="click" col_name="fechaDesdeInstitucion"
												name="fechaDesdeInstitucion"></td>
										</tr>
										<tr>
											<th>Fecha Hasta:</th>
											<td><input readonly id="fechaHastaInstitucion"
												type="text"
												class="form-control input-circle row_dataInstitucion fecha"
												edit-type="click" col_name="fechaHastaInstitucion"
												name="fechaHastaInstitucion"></td>
										</tr>
									</table>
								</div>


							</div>

						</div>

					</div>

				</div>

			</form>

		</div>
	</div>
	<!-- Fin Datos Personales -->



</div>



<div class="row">
	<div class="col-md-12" style="padding-left: 50px; padding-top:50px;">
		<a onclick="javascript:history.back();"
			class="btn btn-circle red btn-outline"> <i class="fa fa-reply"></i>
			Volver
		</a>
	</div>
</div>

.
</div>
<style>
.money {
	margin-left: 30px;
	width: 100px;
	padding: 10px;
	width: 160px;
}

.tr-display-none {
	display: none;
}

.tr-display-table-row {
	display: table-row;
}

.customEdit:hover {
	color: red !important;
}

div {
	/*border: 1px solid red;*/
	
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

.noShadowNoRadius {
	box-shadow: none;
}

.noRadius {
	box-shadow: none;
	border-radius: 0px;
}

.noBorder {
	border: none;
}

.text-right {
	text-align: right;
}

.text-left {
	text-align: left;
}

.padding-top-5 {
	padding-top: 5px;
}

.title-padding {
	padding-top: 2%;
	padding-left: 2.5%;
}

.form-fix {
	width: auto;
	margin: 1em;
	text-align: right;
}

input[type="file"] {
	height: 2.39em;
	left: -1px;
	top: -26px;
	width: 9em;
	position: relative;
	opacity: 0;
}

.btn-fixed-m {
	position: absolute;
	top: 0;
	left: 40%;
	height: 2.4em;
}

.min-width-180 {
	min-width: 180px;
}

.margin-left-7 {
	margin-left: 7% !important;
}

.wrapper {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(6, 100px);
	grid-gap: 10px;
	/*grid-auto-rows: minmax(100px, auto);*/
}

.one {
	grid-column: 1;
	grid-row: 1/3;
}

.seven {
	grid-column: 1;
	grid-row: 3;
}

.three {
	grid-column: 2;
	grid-row: 1/2;
}

.two {
	grid-column: 2;
	grid-row: 3/4;
	align-self: end;
}

.five {
	grid-column: 3;
	grid-row: 1/4;
}

.six {
	grid-column: 3;
	grid-row: 4/6;
}

.four {
	grid-column: 2;
	grid-row: 4;
}
</style>