<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<style>
.close {
	display: none;
}

.cuentaBancaria1 {
	position: absolute !important;
	top: 480px !important;
}

.cuentaBancaria2 {
	position: absolute !important;
	top: 480px !important;
	left: 410px !important;
}

.help-block {
	color: red !important;
}

.customEdit:hover {
	color: red !important;
}

div {
	/*border: 1px solid red;*/
	
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

/* .moneyWork {
	margin-left: 30px;
	width: 100px;
}
 */
i.fa.fa-usd {
	display: none;
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

.tr-display-none {
	display: none;
}

.tr-display-table-row {
	display: table-row;
}

input[type="checkbox"] {
	float: right;
}

.swal2-container {
	z-index: 15000 !important;
}


.desplegar input[type='checkbox'] + label:before {
  -webkit-appearance: initial;
  content: '\2796';
 /* background-color: #428bca;*/
  border: 1px solid #cacece;
  padding: 1px;
  background-color : #e7505a;
}
.desplegar input[type='checkbox']:checked + label:before {
    -webkit-appearance: initial;
    content: '\2795';
  /*  background-color: #428bca;*/
    border: 1px solid #cacece;
	padding: 2px;
	background-color: #3598dc;
	 
}
.desplegar input[type='checkbox'] {
    display:none;
}
.desplegar label {
    cursor:pointer;
}
.desplegar-label {
	float:right;
}




</style>



<div class="row padding-30">
	<form id="insertarTrabajadorForm" action="#" method="post"
		class="col-md-12 blank-form">

		<!-- Navegacion -->

		<div class="row" id="navigation">
			<div class="col-xs-12 col-sm-12 col-md-12">
				<ul class="nav nav-tabs">
					<li id="personales" class="active"><a data-toggle="tab"
						href="#datos_personales">Personales</a></li>
					<li id="laborales"><a data-toggle="tab"
						href="#datos_laborales">Laborales</a></li>

					<a id='btnSiguiente' title='Guardar'
						class='custom-icon-nav btn blue btn-outline btn-md btn_siguiente customEdit'>
						<span class='fa fa-floppy-o fa-lg customEdit'></span> Guardar
					</a>
					<button type="submit" id='btnSave' title='salvar'
						style="display: none;"
						class='custom-icon-nav btn blue btn-outline btn-md btn_save customEdit'>
						<span class='fa fa-floppy-o fa-lg customEdit'></span> Guardar
					</button>
					<a id='btnCancel' title='cancelar'
						onclick="javascript:history.back();"
						class='custom-icon-nav btn red btn-outline btn-md btn_cancel customEdit'>
						<span class='fa fa-times fa-lg customEdit'></span> Cancelar
					</a>
				</ul>
			</div>
		</div>

		<!-- Navegacion -->

		<div class="tab-content">

			<div class="tab-pane fade in active" id="datos_personales"
				style="padding: 30px;">


				<div class="row">

					<div class="col-md-4">

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
									class="blank-input form-control input-md row_data rut"
									col_name="rut" type="text" name="rut"></td>
							</tr>
							<tr class="tr-display-none">
								<th>Pasaporte</th>
								<td><input id="pasaporte"
									class="blank-input form-control input-md row_data"
									col_name="pasaporte" type="text" name="pasaporte"></td>
							</tr>
							<tr class="tr-display-none">
								<th>Rut Temporal</th>
								<td><input id="rutTemporal"
									class="blank-input form-control input-md row_data rut"
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
							<tr>
								<td colspan="2" class="text-center"><a title="Subir Foto"
									class="btn btn-circle green btn-outline" data-toggle="modal" 
									style="position:absolute;top:-100px;right:-600px;"
									data-target=".subirFoto"> <i class="fa fa-upload"></i>
										Subir Foto
								</a></td>
								</div>
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
							<tr>
								<th>Etnia/Comunidad:</th>
								<td><select id="idEtnia"
									class="form-control input-circle row_data" edit-type="click"
									col_name="idEtnia" name="idEtnia">
										<option value="">Seleccione...</option>
								</select></td>
							</tr>
						</table>

						<table class="table table-condensed table-bordered">
							<tr>
								<th>Direccion:</th>
								<td class="desplegar" ><input type="checkbox" id="datosDireccion" checked
									class="row_data checkbox checkboxOption checkboxCollapse"
									col_name="datosDireccion">
								<label class="desplegar-label" for="datosDireccion"></label>	
									</td>
							</tr>
							<tr>
								<th>Calle:</th>
								<td><input id="calle"
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
								<td><input id="depto"
									class="blank-input form-control input-md row_data row_dataDireccion"
									edit-type="click" col_name="depto" name="depto"></input></td>
							</tr>

							<tr>
								<th>Pobl/Villa:</th>
								<td><input id="poblacion"
									class="blank-input form-control input-md row_data row_dataDireccion"
									edit-type="click" col_name="poblacion" name="poblacion"></input></td>
							</tr>
							<!-- <tr>
								<th>Direccion:</th>
								<td><input id="direccion" 
									class="blank-input form-control input-md row_data row_dataDireccion"
									edit-type="click" col_name="direccion" name="direccion"></input></td>
							</tr> -->
						</table>

						<table class="table table-condensed table-bordered">
							<tr>
								<th>Region:</th>
								<td><select id="idRegion"
									class="form-control input-circle row_data" edit-type="click"
									col_name="idRegion" name="idRegion">
										<option value="">Seleccione...</option>
										<c:if test="${not empty listaRegion}">
											<c:forEach items="${listaRegion}" var="region">
												<c:if test="${region.idregion != 16}">
													<option value="${region.idregion}">${region.region}</option>
												</c:if>
											</c:forEach>
										</c:if>
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

					<div class="col-md-4">

						<table class="table table-condensed table-bordered">
							<tr>
								<th>Ley 21.015 (Inclusión)</th>
								<td class="desplegar"><input type='checkbox' id='capacidades'
									class='row_data checkbox checkboxOption checkboxCollapse' col_name="capacidades" />
									<label class="desplegar-label" for="capacidades"></label>
									</td>
							</tr>
							<tr class="tr-display-non">
								<th>N° Credencial</th>
								<td><input id="nCredencial"
									onkeypress="return justNumbers2(event);"
									class="blank-input form-control input-md row_dataDiscapacidad"
									col_name="nCredencial" type="text" name="nCredencial"></td>
							</tr>
							<tr class="tr-display-non">
								<th>Fecha Reevaluacion</th>
								<td><input readonly id="fechaReevaluacion" type="text"
									onkeypress="return justNumbers2(event);"
									class="form-control input-circle row_dataDiscapacidad"
									col_name="fechaReevaluacion" name="fechaReevaluacion"></td>
							</tr>
							<tr class="tr-display-non">
								<th>Grado Discapacidad</th>
								<td><select id="gradoDiscapacidad"
									class="form-control input-circle row_dataDiscapacidad"
									col_name="gradoDiscapacidad" type="text"
									name="gradoDiscapacidad">
										<option value="">Seleccione...</option>
								</select></td>
							</tr>
							<tr class="tr-display-non">
								<th>Porcentaje de Discapacidad</th>
								<td><input id="porcentajeDiscapacidad"
									onkeypress="return justNumbers2(event);"
									class="blank-input form-control input-md row_dataDiscapacidad percentage"
									col_name="porcentajeDiscapacidad" type="text"
									name="porcentajeDiscapacidad"></td>
							</tr>
							<tr class="tr-display-non">
								<th>Causa Discapacidad</th>
								<td><select id="causaDiscapacidad"
									class="form-control input-circle row_dataDiscapacidad"
									col_name="causaDiscapacidad" type="text"
									name="causaDiscapacidad">
										<option value="">Seleccione...</option>
								</select></td>
							</tr>
							<tr class="tr-display-non">
								<th>Movilidad Reducida</th>
								<td><select id="movilidadReducida"
									class="form-control input-circle row_dataDiscapacidad"
									col_name="movilidadReducida" type="text"
									name="movilidadReducida">
										<option value="">Seleccione...</option>
								</select></td>
							</tr>
						</table>

						<table class="table table-condensed table-bordered">
							<tr>
								<th>Informacion de Contacto:</th>
								<td class="desplegar"><input type="checkbox" id="informacionContacto" checked
									class="row_data checkbox checkboxOption checkboxCollapse "
									col_name="informacionContacto">
									<label class="desplegar-label" for="informacionContacto"></label>
									</td>
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

						<table class="table table-condensed table-bordered">
							<tr>
								<th>Contacto Emergencias:</th>
								<td class="desplegar"><input type="checkbox" id="datosEmergencia"
									class="row_data checkbox checkboxOption checkboxCollapse "
									col_name="datosEmergencia">
									<label class="desplegar-label" for="datosEmergencia"></label>
									</td>
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

						<table class="table table-condensed table-bordered">
							<tr>
								<th>Recorrido Bus:</th>
								<td class="desplegar" ><input type="checkbox" id="datosRecorrido"
									class="row_data checkbox checkboxOption checkboxCollapse "
									col_name="datosRecorrido">
									<label class="desplegar-label" for="datosRecorrido"></label>
									</td>
							</tr>
							<tr style="display: none;">
								<th>Recorrido:</th>
								<td><select id="recorrido"
									class="form-control input-circle row_data row_dataRecorrido "
									edit-type="click" col_name="recorrido" name="idSector">
										<option value="">Seleccione...</option>
										<c:if test="${not empty listaRecorrido}">
											<c:forEach items="${listaRecorrido}" var="recorrido">
												<option value="${recorrido.id_recorrido}">${recorrido.detalle}</option>
											</c:forEach>
										</c:if>
								</select></td>
							</tr>
							<tr style="display: none;">
								<th>Sector:</th>
								<td><select id="idSector"
									class="form-control input-circle row_data row_dataRecorrido"
									edit-type="click" col_name="idSector" name="idSector">
										<option value="">Seleccione...</option>
										<c:if test="${not empty listaSector}">
											<c:forEach items="${listaSector}" var="sector">
												<option value="${sector.codigo}">${sector.descripcion}</option>
											</c:forEach>
										</c:if>
								</select></td>
							</tr>
						</table>

						<table class="table table-condensed table-bordered">
							<tr>
								<th>Datos Academicos</th>
								<td class="desplegar"><input type='checkbox' id='datosAcademicos'
									class='row_data checkbox checkboxOption checkboxCollapse'
									col_name="datosAcademicos" />
									<label class="desplegar-label" for="datosAcademicos"></label>
									</td>
							</tr>
							<tr style="display: none;">
								<th>Nivel de Educacion:</th>
								<td><select id="nivelEducacion"
									class="form-control input-circle row_dataInstitucion"
									edit-type="click" col_name="nivelEducacion"
									name="nivelEducacion">
										<option value="">Seleccione...</option>
								</select></td>
							</tr>
							<tr style="display: none;">
								<th>Nivel:</th>
								<td><select id="nivel"
									class="form-control input-circle row_dataInstitucion"
									edit-type="click" col_name="nivel" name="nivel">
										<option value="">Seleccione...</option>
								</select></td>
							</tr>
							<tr style="display: none;">
								<th>Carrera/Oficio:</th>
								<td><select id="carrera"
									class="form-control input-circle row_dataInstitucion"
									edit-type="click" col_name="carrera" name="carrera">
										<option value="">Seleccione...</option>
								</select></td>
							</tr>
							<tr style="display: none;">
								<th>Instituciones:</th>
								<td><select id="instituciones"
									class="form-control input-circle row_dataInstitucion"
									edit-type="click" col_name="instituciones" name="instituciones">
										<option value="">Seleccione...</option>
								</select></td>
							</tr>
							<tr style="display: none;">
								<th>Nombre Institucion:</th>
								<td><select id="nombreInstitucion"
									class="form-control input-circle row_dataInstitucion"
									edit-type="click" col_name="nombreInstitucion"
									name="nombreInstitucion">
										<option value="">Seleccione...</option>
								</select></td>
							</tr>
							<tr style="display: none;">
								<th>Fecha Desde:</th>
								<td><input id="fechaDesdeInstitucion" type="text"
									class="form-control input-circle row_dataInstitucion dateWork"
									edit-type="click" col_name="fechaDesdeInstitucion"
									name="fechaDesdeInstitucion"></td>
							</tr>
							<tr style="display: none;">
								<th>Fecha Hasta:</th>
								<td><input id="fechaHastaInstitucion" type="text"
									class="form-control input-circle row_dataInstitucion dateWork"
									edit-type="click" col_name="fechaHastaInstitucion"
									name="fechaHastaInstitucion"></td>
							</tr>
						</table>

						<table class="table table-condensed table-bordered">
							<tr>
								<th>Cuenta Bancaria</th>
								<td class="desplegar"><input type='checkbox' checked id='cuentaPrimaria'
									class='row_data checkbox checkboxOption checkboxCollapse'
									col_name="cuentaPrimaria" />
									<label class="desplegar-label" for="cuentaPrimaria"></label>
									</td>
							</tr>
							<tr>
								<th>Cuenta Primaria:</th>
								<td id="cuentaPrimaria1"><center>
										<input disabled type="radio" col_name="cuentaPrimaria"
											class="form-check-input row_dataCuenta row_dataCuenta1 "
											name="cuentaPrimaria" id="i1">
									</center></td>
							</tr>
							<tr>
								<th>Banco:</th>
								<td><select id="idBanco1"
									class="form-control input-circle row_dataCuenta row_dataCuenta1"
									edit-type="click" col_name="idBanco" name="idBanco1">
										<option value="">Seleccione...</option>
								</select></td>
							</tr>
							<tr>
								<th>Tipo de Cuenta:</th>
								<td><select id="idTipoCuenta1"
									class="form-control input-circle row_dataCuenta row_dataCuenta1"
									edit-type="click" col_name="idTipoCuenta" name="idTipoCuenta1">
										<option value="">Seleccione...</option>
								</select></td>
							</tr>
							<tr>
								<th>Cuenta:</th>
								<td><input onkeypress="return justNumbers2(event);"
									id="nCuenta1"
									class="blank-input form-control input-md row_dataCuenta row_dataCuenta1"
									col_name="nCuenta" type="text" name="nCuenta1"></td>
							</tr>
						</table>

					</div>

					<div class="col-md-4">

						<table class="table table-condensed table-bordered">
							<tr>
								<th>Cuenta Bancaria</th>
								<td aling="left" class="desplegar"><input type='checkbox' checked
									id='cuentaSecundaria' class='row_data checkbox checkboxOption checkboxCollapse'
									col_name="cuentaSecundaria" />
									<label class="desplegar-label" for="cuentaSecundaria"></label>
									</td>
							</tr>
							<tr>
								<th>Cuenta Primaria:</th>
								<td id="cuentaPrimaria2"><center>
										<input type="radio" col_name="cuentaPrimaria"
											class="form-check-input center row_dataCuenta row_dataCuenta2 "
											name="cuentaPrimaria" id="i2">
									</center></td>
							</tr>
							<tr>
								<th>Banco:</th>
								<td><select id="idBanco2"
									class="form-control input-circle row_dataCuenta row_dataCuenta2"
									edit-type="click" col_name="idBanco" name="idBanco2">
										<option value="">Seleccione...</option>
								</select></td>
							</tr>
							<tr>
								<th>Tipo de Cuenta:</th>
								<td><select id="idTipoCuenta2"
									class="form-control input-circle row_dataCuenta row_dataCuenta2"
									edit-type="click" col_name="idTipoCuenta" name="idTipoCuenta2">
										<option value="">Seleccione...</option>
								</select></td>
							</tr>
							<tr>
								<th>Cuenta:</th>
								<td><input onkeypress="return justNumbers2(event);"
									id="nCuenta2"
									class="blank-input form-control input-md row_dataCuenta row_dataCuenta2"
									col_name="nCuenta" type="text" name="nCuenta2"></td>
							</tr>
						</table>

					</div>

				</div>
				<!-- form -->
			</div>
			<!-- Fin Datos Personales -->

			<!-- Inicio Datos Laborales -->
			<div class="padding-30 tab-pane fade" id="datos_laborales">

				<div class="col-md-12">
					<div class="row" style="padding-bottom: 0px;">
						<div class="col-xs-12 col-sm-12 col-md-12">
							<ul class="nav nav-tabs">
								<li id="nuevoContrato" class="active"><a>Nuevo Contrato</a></li>
							</ul>
						</div>
					</div>
				</div>



				<div class="col-md-12">
					<div class="col-md-4">
						<div class="table-responsive">
							<table class="table table-condensed table-bordered">
								<tr>
									<th>Tipo de Trabajador:</th>
									<td><select id="tipoTrabajador"
										class="form-control input-circle row_dataLaboral"
										name="tipoTrabajador" col_name="tipoTrabajador">
											<option value="">Seleccion...</option>
									</select></td>
								</tr>
								<tr>
									<th>Empresa:</th>
									<td><select id="sociedad"
										class="form-control input-circle row_dataLaboral"
										name="sociedad" col_name="id_sociedad">
											<option value="">Seleccion...</option>
											<c:if test="${not empty listaSociedad}">
												<c:forEach items="${listaSociedad}" var="sociedad">
													<c:if test="${sociedad.idSociedad != -1}">
														<option value="${sociedad.idSociedad}">${sociedad.sociedad}</option>
													</c:if>
												</c:forEach>
											</c:if>
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
								<tr style="display:none;">
									<th>Huerto Contrato</th>
									<td><input id="idHuertoContrato"
										class="form-control input-circle row_dataLaboral" name="idHuertoContrato"
										col_name="idHuertoContrato" />
									</td>
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
								<tr style="display:none;" >
									<th>CECO Contrato</th>
									<td><input id="idCECOContrato"
										class="form-control input-circle row_dataLaboral" name="idCECOContrato"
										col_name="idCECOContrato" />
									</td>
								</tr>
								<tr style="display:none;">
									<th>Faena</th>
									<td><select id="idFaena"
										class="form-control input-circle row_data" name="idFaena"
										col_name="idFaena">
											<option value="">Seleccion...</option>
									</select>
								</tr>
								<tr>
									<th>Faena</th>
									<td><select id="idFaenaContrato"
										class="form-control input-circle row_dataLaboral" name="idFaenaContrato"
										col_name="idFaenaContrato">
											<option value="">Seleccion...</option>
									</select>
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
									<th>INE</th>
									<td><select id="posicion"
										class="form-control input-circle row_dataLaboral"
										name="posicion" col_name="posicion">
											<option value="">Seleccion...</option>
											<option value="1">Posicion 1</option>
											<option value="2">Posicion 2</option>
											<option value="3">Posicion 3</option>
											<option value="4">Posicion 4</option>
											<option value="5">Posicion 5</option>
											<option value="6">Posicion 6</option>
											<option value="7">Posicion 7</option>
											<option value="8">Posicion 8</option>
									</select>
								</tr>
								<tr>
									<th>Supervisor</th>
									<td><input type='checkbox' id='supervisor'
										class='row_dataLaboral checkbox checkboxOption'
										col_name="supervisor" /></td>
								</tr>
								<tr>
									<th>Aplicador</th>
									<td><input type='checkbox' name="maquinista"
										id='maquinista'
										class='row_dataLaboral checkbox checkboxOption'
										col_name="maquinista" /></td>
								</tr>
								<tr>
									<th>Licencia de Conducir:</th>
									<td aling="left" class="desplegar"><input type='checkbox'
										id='licenciaConducir' class='row_data checkbox checkboxOption checkboxCollapse'
										col_name="licenciaConducir" />
										<label class="desplegar-label" for="licenciaConducir"></label>
										</td>
								</tr>
								<tr style="display: none;">
									<th>Tipo de Licencia:</th>
									<td><select id="idTipoLicenciaConducir1"
										class="form-control input-circle row_dataConducir"
										edit-type="click" col_name="idTipoLicenciaConducir1"
										name="idTipoLicenciaConducir1">
											<option value="">Seleccione...</option>
									</select></td>
								</tr>
								<tr style="display: none;">
									<th>Tipo de Licencia:</th>
									<td><select id="idTipoLicenciaConducir2"
										class="form-control input-circle row_dataConducir"
										edit-type="click" col_name="idTipoLicenciaConducir2"
										name="idTipoLicenciaConducir2">
											<option value="">Seleccione...</option>
									</select></td>
								</tr>
								<tr style="display: none;">
									<th>Tipo de Licencia:</th>
									<td><select id="idTipoLicenciaConducir3"
										class="form-control input-circle row_dataConducir"
										edit-type="click" col_name="idTipoLicenciaConducir3"
										name="idTipoLicenciaConducir3">
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
								<!-- Licencia Quimicos -->
								<tr>
									<th>Credencial SAG:</th>
									<td aling="left" class="desplegar"><input type='checkbox'
										id='licenciaQuimicos' class='row_data checkbox checkboxOption checkboxCollapse'
										col_name="licenciaQuimicos" />
										<label class="desplegar-label" for="licenciaQuimicos"></label>
										</td>
								</tr>
								<!-- <tr style="display: none;">
									<th>Tipo de Licencia Quimicos:</th>
									<td><select id="idTipoLicenciaConducir" 
										class="form-control input-circle licenciaQuimicos"
										edit-type="click" col_name="idTipoLicenciaConducir"
										name="idTipoLicenciaConducir">
											<option value="">Seleccione...</option>
									</select></td>
								</tr> -->
								<tr style="display: none;">
									<th>Numero Credencial SAG:</th>
									<td class="col-md-6"><input id="numeroLicenciaSAG"
										name="numeroLicenciaSAG"
										onkeypress="return justNumbers2(event);"
										class="row_dataQuimicos form-control input-md blank-input"
										col_name="numeroLicenciaSAG"></td>
								</tr>
								<tr style="display: none;">
									<th>Fecha Vencimiento Credencial SAG:</th>
									<td><input id="fechaVencimientoSAG" type="text"
										class="form-control input-circle row_dataQuimicos dateWork"
										col_name="fechaVencimientoSAG" name="fechaVencimientoSAG"></td>
								</tr>
								<!-- Licencia Quimicos -->
								<tr>
									<th>AGRO</th>
									<td><input type='checkbox' id='agro' name="agro"
										class='row_data checkbox checkboxOption' col_name="agro" /></td>
								</tr>
								<tr>
									<th>Trabajador Agricola</th>
									<td><input type='checkbox' name="trabajadorAgricola"
										id='trabajadorAgricola'
										class='row_data checkbox checkboxOption'
										col_name="trabajadorAgricola" /></td>
								</tr>
							</table>
						</div>

					</div>

					<div class="col-md-4">
						<div class="table-responsive">
							<table class="table table-condensed table-bordered">
								<!-- <tr style="display:none;">
									<th>Fecha de Contrato:</th>
									<td><input id="fechaIngresoCompania" type="text"
										class="form-control input-circle dateWork"
										col_name="fechaIngresoCompania" name="fechaIngresoCompania"></td>
								</tr>
								<tr style="display:none;">
									<th>Fecha de Contrato:</th>
									<td><input id="fIngresoCompContrato" type="text"
										class="form-control input-circle dateWork"
										col_name="fIngresoCompContrato" name="fIngresoCompContrato"></td>
								</tr> -->
								<tr>
									<th>Fecha de Ingreso:</th>
									<td><input id="fechaIngreso" type="text"
										class="form-control input-circle row_dataLaboral dateWork"
										col_name="fecha_inicio_actividad"
										name="fecha_inicio_actividad"></td>
								</tr>
								<tr>
									<th>Tipo de Contrato</th>
									<td><select id="tipoContrato"
										class="form-control input-circle row_dataLaboral"
										name="tipoContrato" col_name="tipoContrato">
											<option value="">Seleccion...</option>
									</select></td>
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
									<td><div class="input-icon">
											<i class="fa fa-usd"></i><input readonly
												onkeypress="return justNumbers(event);" id="sueldo_mensual"
												class="blank-input form-control input-md moneyWork row_dataLaboral"
												col_name="sueldoBase" type="text" name="sueldo_mensual">
										</div></td>
								</tr>
								<tr>
									<th>Part Time</th>
									<td><input type='checkbox' id='partTime'
										class='row_dataLaboral checkbox checkboxOption'
										col_name="partTime" /></td>
								</tr>
								<tr>
									<th>Horas Semanales:</th>
									<td><input onkeypress="return justNumbers2(event);"
										id="hrs_semanal"
										class="blank-input form-control input-md row_dataLaboral"
										col_name="horasSemanales" type="text" name="hrs_semanal"></td>
								</tr>
								<tr>
									<th>Turno Supervisor</th>
									<td><select id="idTurno"
										class="form-control input-circle row_dataLaboral"
										name="idTurno" col_name="idTurno">
											<option value="">Seleccione...</option>
											<c:if test="${not empty listaTurno}">
												<c:forEach items="${listaTurno}" var="turno">
													<option value="${turno.idTurno}">${turno.nombreTurno}</option>
												</c:forEach>
											</c:if>
									</select>
								</tr>
							</table>
						</div>

					</div>

					<div class="col-md-4">
						<div class="table-responsive">
							<table class="table table-condensed table-bordered">
								<tr>
									<th>Institucion Previsional</th>
									<td><select id="idAFP"
										class="form-control input-circle row_data" name="idAFP"
										col_name="idAFP">
											<option value="">Seleccion...</option>
											<%-- <c:if test="${not empty listaAFP}">
												<c:forEach items="${listaAFP}" var="AFP">
													<option value="${AFP.idafp}">${AFP.nombreAFP}</option>
												</c:forEach>
											</c:if> --%>
									</select></td>
								</tr>
								<tr>
									<th>Fecha de Afiliacion AFP</th>
									<td><input id="fechaAfiliacionAFP" type="text"
										class="blank-input form-control input-circle row_data dateWork"
										edit-type="click" col_name="fechaAfiliacionAFP"
										name="fechaAfiliacionAFP"></td>
								</tr>
								<tr>
									<th>Pensionado</th>
									<td><input type='checkbox' name="pensionados"
										id='pensionados' class='row_data checkbox checkboxOption'
										col_name="pensionados" /></td>
								</tr>
								<tr>
									<th>Pensionado Cotizante</th>
									<td><input type='checkbox' name="pensionadosCotizante"
										id='pensionadosCotizantes'
										class='row_data checkbox checkboxOption'
										col_name="pensionadosCotizantes" /></td>
								</tr>
								<tr>
									<th>Cotizacion AFC Mas de 11 años Empresa</th>
									<td><input type='checkbox' id='mayor11Anos'
										name="mayor11Anos" class='row_data checkbox checkboxOption'
										col_name="mayor11Anos" /></td>
								</tr>
								<tr>
									<th>S. Cesantia</th>
									<td><input type='checkbox' name="sCesantia" id='sCesantia'
										value="1" class='row_data checkbox checkboxOption'
										col_name="sCesantia" /></td>
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
							</table>
						</div>

					</div>




				</div>

				<div class="col-md-12">
					<div class="row" style="padding-bottom: 0px;">
						<div class="col-xs-12 col-sm-12 col-md-12">
							<ul class="nav nav-tabs">
								<li id="masInformacion" class="active"><a>Otros
										Antecedentes</a></li>
							</ul>
						</div>
					</div>
				</div>

				<div class="col-md-12">
					<div class="col-md-4">
						<div class="table-responsive">
							<table class="table table-condensed table-bordered">
								<tr>
									<th>Ahorro AFP:</th>
									<td class="desplegar"><input type="checkbox" id="ahorroAFP"
										class="row_data checkbox checkboxOption checkboxCollapse" col_name="ahorroAFP">
										<label class="desplegar-label" for="ahorroAFP"></label>
										</td>
								</tr>
								<tr style="display: none;">
									<th>Institucion Ahorro AFP</th>
									<td><select id="idAdicionalAFP"
										class="form-control input-circle row_data row_dataAhorroAFP"
										name="idAdicionalAFP" col_name="idAdicionalAFP">
											<option value="">Seleccion...</option>
									</select></td>
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
									<th>APV:</th>
									<td class="desplegar"><input type="checkbox" id="apv"
										class="row_data checkbox checkboxOption checkboxCollapse" col_name="apv">
										<label class="desplegar-label" for="apv"></label>
										</td>
								</tr>
								<tr style="display: none;">
									<th>Institucion APV:</th>
									<td><select id="institucionAPV" name="institucionAPV"
										class="row_data row_dataAPV form-control input-circle"
										col_name="institucionAPV">
											<option value="1" >Seleccione...</option>
											<%-- <c:if test="${not empty listaAFP}">
												<c:forEach items="${listaAFP}" var="AFP">
													<option value="${AFP.idafp}">${AFP.nombreAFP}</option>
												</c:forEach>
											</c:if> --%>
									</select></td>
								</tr>
								<tr style="display: none;">
									<th>Moneda APV:</th>
									<td><select id="idMonedaAPV" name="idMonedaAPV"
										class="row_data row_dataAPV form-control input-circle"
										col_name="idMonedaAPV">
											<option value="">Seleccione..</option>
									</select></td>

								</tr>
								<tr style="display: none;">
									<th>Deposito APV:</th>
									<td><div class="input-icon">
											<i style="paddin: 100px;" class="fa fa-usd"></i><input
												onkeypress="return justNumbers(event);"
												id="valorDepositoAPV"
												class="blank-input form-control input-md moneyWork row_data row_dataAPV"
												col_name="valorDepositoAPV" type="text"
												name="valorDepositoAPV">
										</div></td>
								</tr>
								<tr>
									<th>Ahorro Convenido:</th>
									<td class="desplegar"><input type="checkbox" id="convenido"
										class="row_data checkbox checkboxOption checkboxCollapse" col_name="convenido">
										<label class="desplegar-label" for="convenido"></label>
										</td>
								</tr>
								<tr style="display: none;">
									<th>Institucion Ahorro Convenido:</th>
									<td><select id="institucionConvenido"
										name="institucionConvenido"
										class="row_data row_dataConvenido form-control input-circle"
										col_name="institucionConvenido">
											<option value="">Seleccione...</option>
											<%-- <c:if test="${not empty listaAFP}">
												<c:forEach items="${listaAFP}" var="AFP">
													<option value="${AFP.idafp}">${AFP.nombreAFP}</option>
												</c:forEach>
											</c:if> --%>
									</select></td>
								</tr>
								<tr style="display: none;">
									<th>Moneda Ahorro Convenido:</th>
									<td><select id="idMonedaConvenido"
										name="idMonedaConvenido"
										class="row_data row_dataConvenido form-control input-circle"
										col_name="idMonedaConvenido">
											<option value="">Seleccione..</option>
									</select></td>
								</tr>
								<tr style="display: none;">
									<th>Monto Ahorro Convenido:</th>
									<td><div class="input-icon">
											<i style="paddin: 100px;" class="fa fa-usd"></i><input
												onkeypress="return justNumbers(event);" id="valorConvenido"
												class="blank-input form-control input-md moneyWork row_data row_dataConvenido"
												col_name="valorConvenido" type="text" name="valorConvenido">
										</div></td>
								</tr>
								<tr style="display: none;">
									<th>Nro Contrato:</th>
									<td class="col-md-6"><input id="nContrato"
										name="nContrato" onkeypress="return justNumbers2(event);"
										class="row_data row_dataConvenido row_dataAPV form-control input-md blank-input"
										col_name="nContrato"></td>

								</tr>
							</table>
						</div>
					</div>

					<div class="col-md-4">
						<div class="table-responsive">
							<table class="table table-condensed table-bordered">
								<!-- <tr>
									<th>Subgrupo</th>
									<td><select id="idSubGrupo"
										class="form-control input-circle row_data" name="idSubGrupo"
										col_name="idSubGrupo">
											<option value="">Seleccion...</option>
									</select>
								</tr> -->
								<tr>
									<th>Licencia Maternal</th>
									<td class="desplegar"><input type='checkbox' id='licenciaMaternal'
										class='row_data checkbox checkboxOption checkboxCollapse'
										col_name="licenciaMaternal" />
										<label class="desplegar-label" for="licenciaMaternal"></label>
										</td>
								</tr>
								<tr style="display: none;">
									<th>Fecha Probable de Concepcion:</th>
									<td><input id="fechaConcepcion" type="text"
										class="form-control input-circle row_dataMaternal dateWork"
										col_name="fechaConcepcion" name="fechaConcepcion"></td>
								</tr>
								<tr style="display: none;">
									<th>Fecha Probable de Termino de Contrato:</th>
									<td><input id="fechaTerminoContrato" type="text"
										class="form-control input-circle row_dataMaternal dateWork"
										col_name="fechaTerminoContrato" name="fechaTerminoContrato"></td>
								</tr>
								<tr>
									<th>Trabajador Joven</th>
									<td><input type='checkbox' name="trabajadorJoven"
										id='trabajadorJoven'
										class='row_data checkbox checkboxOption'
										col_name="trabajadorJoven" /></td>
								</tr>
							</table>
						</div>

					</div>

					<div class="col-md-4">
						<div class="table-responsive">
							<table class="table table-condensed table-bordered">

							</table>
						</div>

					</div>

				</div>

			</div>
			<!-- Fin Datos Laborales -->


		</div>
		<!-- Tab Content -->
	</form>
</div>

<div style="text-align: left;">
	<a onclick="javascript:history.back();"
		class="btn btn-circle red btn-outline"> <i class="fa fa-reply"></i>
		Volver
	</a>
</div>
</div>

<div class="modal fade subirFoto" tabindex="-1" role="dialog"
	aria-labelledby="myLargeModalLabel" aria-hidden="true"
	data-backdrop="static" data-close="false">
	<div class="modal-dialog modal-md">
		<div class="modal-content">
			<form id="formFotoTrabajador" method="post" action="#" style="width:100%;"
				class="blank-form text-center" enctype="multipart/form-data">
				<input id="idDocumento" data-show-upload="false" name="documento"
					col_name="documento" type="file" class="file row_dataDocumentos">
				<input style="visibility: hidden;" value="50" type="text"
					id="idTipoDocumento" name="tipoDocumento" col_name="tipoDocumento"
					row_dataDocumento" class="row_dataDocumentos">
				<div class="modal-footer">
					<a data-dismiss="modal" type="button"
						class="btn btn-circle btn-primary">Grabar Cambios</a>
					<button type="button" class="btn btn-circle btn-secondary"
						data-dismiss="modal">Cerrar</button>
			</form>
		</div>
	</div>
</div>



<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>
