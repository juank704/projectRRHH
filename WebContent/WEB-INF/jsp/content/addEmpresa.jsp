<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <h3>Empresas <small>> Agregar Empresa</small></h3>
<!-- DATOS BASICOS -->

<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	<h4>Datos Basicos</h4>
	<div class="col-xs-12 col-sm-4 col-md-4 portlet light bordered">
		<label style="color: #337ab7;" for="rutBuss"><label style="color: #FF0000;">*</label>Rut:</label>
		<input id="rutBuss" name="adbuss" type="text" class="form-control input-circle">
		<label style="color: #337ab7;" for="nameBuss"><label style="color: #FF0000;">*</label>Nombre:</label>
		<input id="nameBuss" name="adbuss" type="text" class="form-control input-circle">
	</div>
	<div class="col-xs-12 col-sm-4 col-md-4 portlet light bordered">
		<label style="color: #337ab7;" for="lastBuss"><label style="color: #FF0000;">*</label>Apellidos:</label>
		<input id="lastBuss" name="adbuss" type="text" class="form-control input-circle">
		<label style="color: #337ab7;" for="razonBuss"><label style="color: #FF0000;">*</label>Razon Social:</label>
		<input id="razonBuss" name="adbuss" type="text" class="form-control input-circle">
	</div>
	<div class="col-xs-12 col-sm-4 col-md-4 portlet light bordered">
		<label style="color: #337ab7;" for="regBuss"><label style="color: #FF0000;">*</label>Region:</label>
		<select id="regBuss" name="adbuss" class="form-control input-circle">
			<option value="XIII Region Matropolitana">XIII Region Matropolitana</option>
		</select>
		<label style="color: #337ab7;" for="ciuBuss"><label style="color: #FF0000;">*</label>Ciudad:</label>
		<select id="ciuBuss" name="adbuss" class="form-control input-circle">
			<option value="Santiago">Santiago</option>
		</select>
	</div>
	<div class="col-xs-12 col-sm-4 col-md-4 portlet light bordered">
		<label style="color: #337ab7;" for="comBuss"><label style="color: #FF0000;">*</label>Comuna:</label>
		<select id="comBuss" name="adbuss" class="form-control input-circle">
			<option value="Providencia">Providencia</option>
		</select>
		<label style="color: #337ab7;" for="dirBuss"><label style="color: #FF0000;">*</label>Direccion:</label>
		<input id="dirBuss" name="adbuss" type="text" class="form-control input-circle">
	</div>
	<div class="col-xs-12 col-sm-4 col-md-4 portlet light bordered">
		<label style="color: #337ab7;" for="phoneBuss"><label style="color: #FF0000;">*</label>Telefono:</label>
		<input id="phoneBuss" name="adbuss" type="text" class="form-control input-circle">
		<label style="color: #337ab7;" for="mailBuss"><label style="color: #FF0000;">*</label>E-mail:</label>
		<input id="mailBuss" name="adbuss" placeholder="ejemplo@correo.cl" type="text" class="form-control input-circle">
	</div>
	<div class="col-xs-12 col-sm-4 col-md-4 portlet light bordered">
		<label style="color: #337ab7;" for="phoneBuss"><label style="color: #FF0000;">*</label>Giro Comercial:</label>
		<input id="phoneBuss" name="adbuss" type="text" class="form-control input-circle">
		<label style="color: #337ab7;" for="mailBuss"><label style="color: #FF0000;">*</label>Actividad Economica:</label>
		<input id="mailBuss" name="adbuss" type="text" class="form-control input-circle">
	</div>
	
	<div class="col-xs-12 col-sm-6 col-md-4 portlet light bordered">
		<h4>Representante Legal</h4>
		<div class="col-xs-12 col-sm-6 col-md-6">
			<label style="color: #337ab7;" for="rutLegal"><label style="color: #FF0000;">*</label>Rut:</label>
			<input id="rutLegal" name="adbuss" type="text" class="form-control input-circle">
		</div>
		<div style="float: right;" class="col-xs-12 col-sm-6 col-md-6">
			<label style="color: #337ab7;" for="nameLegal"><label style="color: #FF0000;">*</label>Nombre:</label>
			<input id="nameLegal" name="adbuss" type="text" class="form-control input-circle">
		</div>
	</div>
	
	<div class="col-xs-12 col-sm-6 col-md-8 portlet light bordered">
	<h4>Caja de Compensacion</h4>
		<div class="col-xs-12 col-sm-6 col-md-3">
			<label style="color: #337ab7;" for="nameBox"><label style="color: #FF0000;">*</label>Nombre:</label>
			<select id="nameBox" name="adbuss" class="form-control input-circle">
				<option value="INP">INP</option>
			</select>
		</div>
		<div class="col-xs-12 col-sm-6 col-md-3">
			<label style="color: #337ab7;" for="cotiBox"><label style="color: #FF0000;">*</label>Cotizacion(%):</label>
			<input id="cotiBox" name="adbuss" type="text" class="form-control input-circle">
		</div>
		<div class="col-xs-12 col-sm-6 col-md-3">
			<label style="color: #337ab7;" for="ageBox"><label style="color: #FF0000;">*</label>Agencia:</label>
			<input id="ageBox" name="adbuss" type="text" class="form-control input-circle">
		</div>
		<div class="col-xs-12 col-sm-6 col-md-3">
			<label style="color: #337ab7;" for="nroSocio"><label style="color: #FF0000;">*</label>N° de Socio:</label>
			<input id="nroSocio" name="adbuss" type="text" class="form-control input-circle">
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-9 portlet light bordered">
		<h4>Mutual de Seguridad</h4>
		<div class="col-xs-12 col-sm-6 col-md-3">
			<label style="color: #337ab7;" for="nameMutual"><label style="color: #FF0000;">*</label>Nombre:</label>
			<select id="nameMutual" name="adbuss" class="form-control input-circle">
				<option value="ACHS">ACHS</option>
			</select>
		</div>
		<div class="col-xs-12 col-sm-6 col-md-3">
			<label style="color: #337ab7;" for="nameMutual"><label style="color: #FF0000;">*</label>Cotizacion Basica(%):</label>
			<input type="text" name="adbuss" id="nameMutual" class="form-control input-circle">
		</div>
		<div class="col-xs-12 col-sm-6 col-md-3">
			<label style="color: #337ab7;" for="nameMutual"><label style="color: #FF0000;">*</label>Cotizacion Adicional(%):</label>
			<input type="text" name="adbuss" id="nameMutual" class="form-control input-circle">
		</div>
		<div class="col-xs-12 col-sm-6 col-md-3">
			<label style="color: #337ab7;" for="nroSocio"><label style="color: #FF0000;">*</label>N° de Socio:</label>
			<input id="nroSocio" name="adbuss" type="text" class="form-control input-circle">
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-3 portlet light bordered">
		<h4>Base para Comision</h4>
		<div class="col-xs-12 col-sm-6 col-md-12">
			<label style="color: #337ab7;" for="codPAR"><label style="color: #FF0000;">*</label>Monto:</label>
			<input type="text" name="adbuss" id="codPAR" class="form-control input-circle">
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-8 portlet light bordered">
		<h4>Pago Automatico de Remuneraciones(PAR)</h4>
		<div class="col-xs-12 col-sm-6 col-md-4">
			<label style="color: #337ab7;" for="codPAR"><label style="color: #FF0000;">*</label>Codigo convenio o Cta. Cte.:</label>
			<input type="text" name="adbuss" id="codPAR" class="form-control input-circle">
		</div>
		<div class="col-xs-12 col-sm-6 col-md-4">
			<label style="color: #337ab7;" for="instiPAR"><label style="color: #FF0000;">*</label>Institucion:</label>
			<select id="instiPAR" name="adbuss" class="form-control input-circle">
				<option value="Banco de Chile">Banco de Chile</option>
			</select>
		</div>
		<div class="col-xs-12 col-sm-6 col-md-4">
			<label style="color: #337ab7;" for="instiPAR"><label style="color: #FF0000;">*</label>Formato PAR:</label>
			<select id="instiPAR" name="adbuss" class="form-control input-circle">
				<option value="Formato Actual">Formato Actual</option>
			</select>
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-4 portlet light bordered">
		<h4>Sueldo base y semana corrida(Ley 20.281)</h4>
		<div class="col-xs-12 col-sm-12 col-md-12">
			<label style="color: #337ab7;" for="instiPAR"><label style="color: #FF0000;">*</label>Periodo de Inicio:</label>
			<input id="perSBSC" name="adbuss" type="month" class="form-control input-circle">
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-12">
		<div class="col-xs-12 col-sm-4 col-md-4">
			<h4>Ahorro previcional voluntario Colectivo(APVC)</h4>
			<label style="color: #337ab7;" for="apvi"><label style="color: #FF0000;">*</label>Tiene APVC:</label>
			<select id="apvi" name="adbuss" class="btn blue btn-outline btn-circle btn-sm">
				<option value="">Seleccione...</option>
				<option value="1">Si</option>
				<option value="2">No</option>
			</select>
		</div>
		<div class="col-xs-12 col-sm-4 col-md-4">
			<h4>Seguro de invalidez y Sobrevivencia(SIS)</h4>
			<label style="color: #337ab7;" for="apvc"><label style="color: #FF0000;">*</label>Aporte con carga a:</label>
			<select id="apvc" name="adbuss" class="btn blue btn-outline btn-circle btn-sm"></select>
		</div>
		<div class="col-xs-12 col-sm-4 col-md-4">
			<h4>Vacaciones</h4>
			<label style="color: #337ab7;" for="afiliado"><label style="color: #FF0000;">*</label>Periodos de vaciones segun:</label>
			<select id="afiliado" name="adbuss" class="btn blue btn-outline btn-circle btn-sm"></select>
		</div>
	</div>
</div>

<div style="text-align: center;">
	<a id="addBuss" class="btn btn-circle green btn-outline">
		<i class="icon-cloud-upload"></i> Guardar
	</a>
	<a id="cancelBuss" class="btn btn-circle red btn-outline">
		<i class="fa fa-times"></i> Cancelar
	</a>
</div>