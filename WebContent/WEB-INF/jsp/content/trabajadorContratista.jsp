
<div class="row cabecera" style="display: none;">

	<div class="col-md-12" style="padding: 10px;">

		<div class="col-md-10" style="">
			<div class="col-md-12" style="">
				<div class="col-md-4" style="width: 27%;">
					<h4>
						<strong id="name"></strong>
					</h4>
				</div>
				<div class="col-md-3" style="padding-left: 0px; width: 20%;">
					<div class=""></div>
					<h5>
						Codigo:<strong name="strong" id="codigo"></strong>
					</h5>
					<h5>
						Dirección: <strong name="strong" id="direWorker"></strong>
					</h5>
				</div>
				<div class="col-md-4" style="width: 27%;">
					<h5>
						<label id="labelRut">RUT: </label><strong name="strong"
							id="rutWorkerHead"></strong>
					</h5>
				</div>
				<div class="col-md-3" style="">
					<h5>
						Telefono: <strong name="strong" id="phoneWorker"></strong>
					</h5>
				</div>
			</div>
		</div>


		<div class="col-md-2" style="">
			<!-- Aqui va la foto  -->
		</div>

	</div>

</div>
<!-- FIN ROW -->

<div class="row">
	<div class="col-md-12 text-right" >
		<a onclick="javascript:history.back();"
			class="btn btn-circle red btn-outline"> <i class="fa fa-reply"></i>
			Volver
		</a>
	</div>
</div>

<form id="insertarTrabajadorForm2" class="col-md-12 blank-form">
	<div class="row" id="navigation">
		<div class="col-xs-12 col-sm-12 col-md-12">
			<ul class="nav nav-tabs">
				<li id="personales" class="active"><a data-toggle="tab"
					href="#datos_personales">Trabajador Contratista</a></li>

				<button type="submit" id='btnSave' title='salvar'
					style="display: none;"
					class='custom-icon-nav btn blue btn-outline btn-md btn_save customEdit'>
					Guardar <span class='fa fa-floppy-o fa-lg customEdit'></span>
				</button>

				<a id='btnEdit' title='editar' style="display: none;"
					class='custom-icon-nav btn yellow btn-outline btn-md btn_edit customEdit'>
				 Editar	<span class='fa fa-pencil-square-o fa-lg customEdit'></span></a>

				<a id='btnUpdate' title='actualizar' style="display: none;"
					class='custom-icon-nav btn yellow btn-outline btn-md btn_update customEdit'>
				 Guardar/Actualizar	<span class='fa fa-floppy-o fa-lg customEdit'></span></a>

				<a id='btnCancel' title='cancelar'
					onclick="javascript:history.back();"
					class='custom-icon-nav btn red btn-outline btn-md btn_cancel customEdit'>
					<span class='fa fa-times fa-lg customEdit'></span>
				</a>
			</ul>
		</div>
	</div>


	<div class="row">
		<div class="tab-content">
			<div class="tab-pane fade in active" id="datos_personales"
				style="padding: 30px;">



				<div class="row">

					<div class="col-md-6">
						<table class="table table-condensed table-bordered">
							<tr>
								<th>Razon Social:</th>
								<td><input type="checkbox" id="razonSocial"
									class="row_dataRazonSocial checkbox checkboxOption checkboxCollapse "
									col_name="razonSocial"></td>
							</tr>
						</table>

						<table class="table table-condensed table-bordered">
							<tr>
								<th id="textContratista" colspan="2">Contratista</th>
							</tr>
							<tr>
								<th>Empresa:</th>
								<td><select id="sociedad"
									class="form-control input-circle select-2 row_dataLaboral"
									name="sociedad" col_name="id_sociedad">
										<option value="">Seleccion...</option>
								</select></td>
							</tr>
							<tr>
								<th>Huerto</th>
								<td><select id="idHuerto"
									class="form-control input-circle row_data" name="idHuerto"
									col_name="idHuerto">
										<option value="">Seleccion...</option>
								</select></td>
							</tr>
							<tr>
								<th>Zona</th>
								<td><select id="idZona"
									class="form-control input-circle row_data" name="idZona"
									col_name="idZona">
										<option value="">Seleccion...</option>
								</select></td>
							</tr>
							<tr>
								<th>Ceco</th>
								<td><select id="idCECO"
									class="form-control input-circle row_data" name="idCECO"
									col_name="idCECO">
										<option value="">Seleccion...</option>
								</select>
							</tr>
							<tr>
								<th>Contratista</th>
								<td><select id="idContratista"
									class="form-control input-circle row_data" name="idContratista"
									col_name="idContratista">
										<option value="">Seleccion...</option>
								</select></td>
							</tr>
						</table>

						<table class="table table-condensed table-bordered">
							<tr>
								<th>Fecha de Inicio:</th>
								<td><input id="fechaIngreso" type="text"
									class="form-control input-circle row_dataLaboral dateWork"
									col_name="fecha_inicio_actividad" name="fecha_inicio_actividad"></td>
							</tr>
							<tr>
								<th>Fecha Termino:</th>
								<td><input id="fechaTermino" type="text"
									class="row_dataLaboral form-control input-circle dateWork"
									col_name="fecha_termino_actividad"
									name="fecha_termino_actividad"></td>
							</tr>
							<tr>
								<th>Sueldo Base</th>
								<td><input onkeypress="return justNumbers(event);"
									id="sueldo_mensual"
									class="blank-input form-control input-md moneyWork row_dataLaboral"
									col_name="sueldoBase" type="text" name="sueldo_mensual">
								</td>
							</tr>
							<tr>
								<th>Cargo</th>
								<td><select id="cargo"
									class="form-control input-circle row_dataLaboral" name="cargo"
									col_name="cargo">
									<option value="">Seleccion...</option>
								</select>
							</tr>
							<tr>
								<th>Supervisor</th>
								<td><input type='checkbox' id='supervisor'
									class='row_dataLaboral checkbox checkboxOption'
									col_name="supervisor" /></td>
							</tr>
							<tr>
								<th>AGRO</th>
								<td><input type='checkbox' id='agro' name="agro"
									class='row_data checkbox checkboxOption' col_name="agro" /></td>
							</tr>
							<tr>
								<th>Aplicador</th>
								<td><input type='checkbox' name="maquinista"
									id='maquinista' class='row_dataLaboral checkbox checkboxOption'
									col_name="maquinista" /></td>
							</tr>
							<tr>
								<th>Licencia de Conducir:</th>
								<td aling="left"><input type='checkbox'
									id='licenciaConducir'
									class='row_data checkbox checkboxOption checkboxCollapse'
									col_name="licenciaConducir" /></td>
							</tr>
							<tr style="display: none;">
								<th>Tipo de Licencia:</th>
								<td><select id="idTipoLicenciaConducir" 
									class="form-control input-circle row_dataConducir"
									edit-type="click" col_name="idTipoLicenciaConducir"
									name="idTipoLicenciaConducir">
										<option value="">Seleccione...</option>
								</select></td>
							</tr>
							<tr style="display: none;">
								<th>Numero de Licencia:</th>
								<td class="col-md-6"><input id="numeroLicencia"
									name="numeroLicencia" onkeypress="return justNumbers2(event);"
									class="row_dataConducir form-control input-md blank-input"
									col_name="numeroLicencia"></td>
							</tr>
							<tr style="display: none;">
								<th>Fecha Vencimiento:</th>
								<td><input id="fechaVencimiento" type="text"
									class="form-control input-circle row_dataConducir dateWork"
									col_name="fechaVencimiento" name="fechaVencimiento"></td>
							</tr>
						</table>

						

						

						
					</div>

					<div class="col-md-4">
					
					<table class="table table-condensed table-bordered">
							<tr>
								<th>Nacionalidad:</th>
								<td><select id="idNacionalidad"
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
					
						<table class="table table-condensed table-bordered">
							<tr>
								<th>F/Nacimiento:</th>
								<td><input id="fNacimiento" type="text"
									class="form-control input-circle row_data dateWork"
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
								<td><select id="idEstadoCivil"
									class="form-control input-circle row_data" edit-type="click"
									col_name="idEstadoCivil" name="idEstadoCivil">
										<option value="">Seleccione...</option>
								</select></td>
							</tr>
						</table>
						
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
							<!-- <tr>
								<th>Direccion:</th>
								<td><input id="direccion" 
									class="blank-input form-control input-md row_data row_dataContacto"
									edit-type="click" col_name="direccion" name="direccion"></input></td>
							</tr> -->
						</table>
					
					
					</div>


					<div class="col-md-4">


						<table class="table table-condensed table-bordered">
							<tr>
								<th>Informacion de Contacto:</th>
								<td><input type="checkbox" id="informacionContacto" checked
									class="row_data checkbox checkboxOption checkboxCollapse "
									col_name="informacionContacto"></td>
							</tr>
							<tr>
								<th>Telefono Casa:</th>
								<td><input id="phoneCasa" 
									onkeypress="return justNumbers2(event);"
									class="blank-input form-control input-md row_data row_dataContacto"
									edit-type="click" col_name="telefono" name="telefono"></input></td>
							</tr>
							<tr>
								<th>Telefono Celular:</th>
								<td><input id="celular" 
									onkeypress="return justNumbers2(event);"
									class="blank-input form-control input-md row_data row_dataContacto"
									edit-type="click" col_name="celular" name="celular"></input></td>
							</tr>
							<tr>
								<th>E-mail:</th>
								<td><input id="mailWorker" 
									class="blank-input form-control input-md row_data row_dataContacto"
									edit-type="click" col_name="email" name="email"></input></td>
							</tr>
						</table>


						<!-- <table class="table table-condensed table-bordered">

							<tr>
								<th>AFP</th>
								<td><select id="idAFP"
									class="form-control input-circle row_data" name="idAFP"
									col_name="idAFP">
										<option value="">Seleccion...</option>
								</select></td>
							</tr>
							<tr>
								<th>Ahorro AFP:</th>
								<td><input type="checkbox" id="ahorroAFP"
									class="row_data checkbox checkboxOption checkboxCollapse"
									col_name="ahorroAFP"></td>
							</tr>
							<tr style="display: none;">
								<th>Moneda Ahorro AFP</th>
								<td><select id="idMonedaAFP"
									class="form-control input-circle row_data row_dataAhorroAFP"
									name="idMonedaAFP" col_name="idMonedaAFP">
										<option value="">Seleccion...</option>
								</select></td>
							</tr>
							<tr style="display: none;">
								<th>Valor Ahorro AFP</th>
								<td><div class="input-icon">
										<i class="fa fa-usd"></i><input
											onkeypress="return justNumbers(event);" id="valorAFP"
											class="blank-input form-control input-md moneyWork row_data row_dataAhorroAFP"
											col_name="valorAFP" type="text" name="valorAFP">
									</div></td>
							</tr>
							<tr>
								<th>Salud</th>
								<td><select id="idIsapre"
									class="form-control input-circle row_data" name="idIsapre"
									col_name="idIsapre">
										<option value="">Seleccion...</option>
								</select></td>
							</tr>
							<tr>
								<th>Moneda Plan</th>
								<td><select id="idMonedaPlan"
									class="form-control input-circle row_data" name="idMonedaPlan"
									col_name="idMonedaPlan">
										<option value="">Seleccion...</option>
								</select></td>
							</tr>
							<tr>
								<th>Valor Plan</th>
								<td><div class="input-icon">
										<i style="paddin: 100px;" class="fa fa-usd"></i><input
											onkeypress="return justNumbers(event);" id="valorPlan"
											class="blank-input form-control input-md moneyWork row_data"
											col_name="valorPlan" type="text" name="valorPlan">
									</div></td>
							</tr>
							<tr>
								<th>Fecha de Afiliacion AFP</th>
								<td><input id="fechaAfiliacionAFP" type="text"
									class="form-control input-circle row_data dateWork"
									edit-type="click" col_name="fechaAfiliacionAFP"
									name="fechaAfiliacionAFP"></td>
							</tr>
						</table> -->
						
						
						<table class="table table-condensed table-bordered">
							<tr>
								<th>Direccion:</th>
								<td><input type="checkbox" id="datosDireccion" checked
									class="row_data checkbox checkboxOption "
									col_name="datosDireccion"></td>
							</tr>
							<tr>
								<th>Calle:</th>
								<td><input id="calle" tabindex="15"
									class="blank-input form-control input-md row_data row_dataDireccion"
									edit-type="click" col_name="calle" name="calle"></input></td>
							</tr>
							<tr>
								<th>N:</th>
								<td><input id="ndireccion" name="ndireccion"
									onkeypress="return justNumbers3(event);"
									class="blank-input form-control input-md row_data row_dataDireccion"
									col_name="ndireccion"></td>

							</tr>
							<tr>
								<th>Depto:</th>
								<td><input id="depto" tabindex="15"
									class="blank-input form-control input-md row_data row_dataDireccion"
									edit-type="click" col_name="depto" name="depto"></input></td>
							</tr>

							<tr>
								<th>Pobl/Villa:</th>
								<td><input id="poblacion" tabindex="15"
									class="blank-input form-control input-md row_data row_dataDireccion"
									edit-type="click" col_name="poblacion" name="poblacion"></input></td>
							</tr>
							<!-- <tr>
								<th>Direccion:</th>
								<td><input id="direccion" tabindex="15"
									class="blank-input form-control input-md row_data row_dataDireccion"
									edit-type="click" col_name="direccion" name="direccion"></input></td>
							</tr> -->
						</table>
						
						<table class="table table-condensed table-bordered">
							<tr>
								<th>Contacto Emergencias:</th>
								<td><input type="checkbox" id="datosEmergencia"
									class="row_data checkbox checkboxOption checkboxCollapse "
									col_name="datosEmergencia"></td>
							</tr>
							<tr style="display: none;">
								<th>Nombre</th>
								<td><input id="nombreEmergencia" 
									class="blank-input form-control input-md row_data row_dataEmergencia"
									edit-type="click" col_name="nombreEmergencia"
									name="nombreEmergencia"></td>
							</tr>
							<tr style="display: none;">
								<th>Telefono</th>
								<td><input onkeypress="return justNumbers2(event);"
									
									class="blank-input form-control input-md row_data row_dataEmergencia"
									edit-type="click" col_name="telefonoEmergencia"
									name="telefonoEmergencia"></td>
							</tr>
							<tr style="display: none;">
								<th>Email</th>
								<td><input id="emailEmergencia" 
									class="blank-input form-control input-md row_data row_dataEmergencia"
									edit-type="click" col_name="emailEmergencia"
									name="emailEmergencia"></td>
							</tr>
							<tr style="display: none;">
								<th>parentesco</th>
								<td><select id="parentesco" name="parentesco" 
									class="form-control input-circle row_data row_dataEmergencia"
									edit-type="click" col_name="parentesco">
										<option value="">Seleccione...</option></td>
							</tr>
						</table>


					</div>
					
					
					<!-- <div class="row" style="padding-bottom: 0px;">
						<div class="col-xs-12 col-sm-12 col-md-12">
							<ul class="nav nav-tabs">
								<li id="masInformacion" class="active"><a>Otros Antecedentes</a></li>
							</ul>
						</div>
					</div> -->
					
					
				</div>
				
				
				
				
					
				
				
				
</form>

</div>
</div>
<!-- Fin Datos Personales -->



</div>

<div class="row invisible">
	<div class="col-md-12" style="padding-left: 50px;">
		<a onclick="javascript:history.back();"
			class="btn btn-circle red btn-outline"> <i class="fa fa-reply"></i>
			Volver
		</a>
	</div>
</div>



<style>
/* .money {
	margin-left: 30px;
	width: 100px;
	padding: 10px;
	width: 160px;
} */
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

input[type="checkbox"] {
	float: right;
}

.select2-container {
	width: 100% !important;
	text-transform: uppercase !important;
}
</style>