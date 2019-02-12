<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <h3>Trabajadores <small>> Agregar Trabajador</small></h3>
    <!-- DATOS PERSONALES -->
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	
<!-- 	DATOS PERSONALES -->
<div class="col-xs-12 col-sm-12 col-md-12">
	<h4>Datos Personales</h4>
	<div class="col-xs-12 col-sm-4 col-md-2 portlet light bordered">
		<div id="rut" name="hasDiv" class="">
			<label style="color: #337ab7;" for="rutWorker"><label style="color: #FF0000;">*</label>Rut:</label>
			<input id="rutWorker" onblur="valRutChar(this)" onfocus="formatRut(this)" maxlength="9" type="text" name="adwork" class="form-control input-circle">
		</div>
		<div id="nombres" name="hasDiv" class="">
			<label style="color: #337ab7;" for="nameWorker"><label style="color: #FF0000;">*</label>Nombres:</label>
			<input id="nameWorker" type="text" onblur="javascript: onBlurEroor(this)" name="adwork" class="form-control input-circle">
		</div>
	</div>
	<div class="col-xs-12 col-sm-4 col-md-3 portlet light bordered ">
		<label style="color: #337ab7;" for="patWorker"><label style="color: #FF0000;">*</label>Apellidos:</label>
		<input id="patWorker" type="text" name="adwork" class="form-control input-circle">
		<label style="color: #337ab7;" for="matWorker"><label style="color: #FF0000;">*</label>Fecha de Nacimiento:</label>
		<input id="birthWorker" name="adwork" type="date" class="form-control input-circle">
	</div>
	<div class="col-xs-12 col-sm-4 col-md-2 portlet light bordered">
		<label style="color: #337ab7;" for="birthWorker"><label style="color: #FF0000;">*</label>Nacionalidad:</label>
		<select id="nacWorker" name="adwork" class="form-control input-circle">
			<option value="">Seleccione...</option>
			<option value="1">Chilena</option>
			<option value="2">Peruana</option>
			<option value="3">Venezolana</option>
		</select>
		<label style="color: #337ab7;" for="nacWorker"><label style="color: #FF0000;">*</label>Estado Civil:</label>
		<select id="estWorker" name="adwork" class="form-control input-circle">
			<option value="">Seleccione...</option>
			<option value="1">Soltero</option>
			<option value="2">Casado</option>
		</select>
		<label style="color: #337ab7;" for="generoWorker"><label style="color: #FF0000;">*</label>Genero:</label>
		<select id="generoWorker" name="adwork" class="form-control input-circle">
			<option value="">Seleccione...</option>
			<option value="1">Masculino</option>
			<option value="2">Femenino</option>
		</select>
	</div>
	<div class="col-xs-12 col-sm-6 col-md-2 portlet light bordered">
		<label style="color: #337ab7;" for="estWorker"><label style="color: #FF0000;">*</label>Telefono:</label>
		<input id="phoneWorker" type="text" name="adwork" onkeypress='return justNumbers(event);' maxlength="9"  class="form-control input-circle">
		<label style="color: #337ab7;" for="phoneWorker"><label style="color: #FF0000;">*</label>E-mail:</label>
		<input id="mailWorker" name="adwork" type="text" onblur="javascript: mailValidate();" class="form-control input-circle">
	</div>
	<div class="col-xs-12 col-sm-6 col-md-3 portlet light bordered">
		<label style="color: #337ab7;" for="mailWorker"><label style="color: #FF0000;">*</label>Direccion:</label>
		<input id="direWorker" name="adwork" type="text" class="form-control input-circle">
		<label style="color: #337ab7;" for="direWorker"><label style="color: #FF0000;">*</label>Direccion:</label>
		<input id="direWorker" name="" type="text" class="form-control input-circle">
	</div>
</div>
	
<!-- 	DATOS LABORALES -->

<div class="col-xs-12 col-sm-12 col-md-12">
	<h4>Datos Laborales</h4>
	<div class="col-xs-12 col-sm-4 col-md-2 portlet light bordered">
		<label style="color: #337ab7;" for="inWorker"><label style="color: #FF0000;">*</label>Fecha Ingreso:</label>
		<input id="inWorker" name="adwork" type="date" class="form-control input-circle">
		<label style="color: #337ab7;" for="outWorker"><label style="color: #FF0000;">*</label>Fecha Termino:</label>
		<input id="outWorker" name="" type="date" class="form-control input-circle">
	</div>
	<div class="col-xs-12 col-sm-4 col-md-3 portlet light bordered">
		<label style="color: #337ab7;" for="estadoWorker"><label style="color: #FF0000;">*</label>Estado del Contrato:</label>
		<select id="estadoWorker" name="" class="form-control input-circle btn-md">
			<option value="">Seleccione...</option>
			<option value="1">Activo</option>
			<option value="2">Inactivo</option>
		</select>
		<label style="color: #337ab7;" for="tipoconWorker"><label style="color: #FF0000;">*</label>Tipo de Contrato:</label>
		<select id="tipoconWorker" onchange="javascript: tipoconWorker();" name="" class="form-control input-circle">
			<option value="">Seleccione...</option>
			<option value="Fijo">Fijo</option>
			<option value="Indefinido">Indefinido</option>
		</select>
	</div>
	<div class="col-xs-12 col-sm-4 col-md-2 portlet light bordered">
		<label style="color: #337ab7;" for="depaWorker"><label style="color: #FF0000;">*</label>Departamento:</label>
		<select id="depaWorker" name="" class="form-control input-circle"></select>
		<label style="color: #337ab7;" for="cargoWorker"><label style="color: #FF0000;">*</label>Cargo:</label>
		<select id="cargoWorker" name="" class="form-control input-circle"></select>
	</div>
	<div class="col-xs-12 col-sm-6 col-md-2 portlet light bordered">
		<label style="color: #337ab7;" for="estaWorker"><label style="color: #FF0000;">*</label>Establecimiento:</label>
		<select id="estaWorker" name="" class="form-control input-circle">
			<option value="">Seleccione...</option>
			<option value="Providencia">Providencia</option>
			<option value="Huechuraba">Huechuraba</option>
			<option value="Las Condes">Las Condes</option>
		</select>
		<label style="color: #337ab7;" for="horasWorker"><label style="color: #FF0000;">*</label>Horas Semanales:</label>
		<input id="horasWorker" name="" type="text" class="form-control input-circle">
	</div>
	<div class="col-xs-12 col-sm-6 col-md-3 portlet light bordered">
		<label style="color: #337ab7;" for="afsbWorker"><label style="color: #FF0000;">*</label>Afecto ajuste sueldo base:</label>
		<select id="afsbWorker" name="" class="form-control input-circle">
			<option value="">Seleccione...</option>
			<option value="Si">Si</option>
			<option value="No">No</option>
		</select>
		<label style="color: #337ab7;" for="abscWorker"><label style="color: #FF0000;">*</label>Afecto benef. semana Corrida:</label>
		<select id="abscWorker" name="" class="form-control input-circle">
			<option value="">Seleccione...</option>
			<option value="Si">Si</option>
			<option value="No">No</option>
		</select>
	</div>
</div>

<!-- 	INFORMACION DE VACACIONES -->

	<h4>Informacion de Vacaciones</h4>
	<div class="col-xs-12 col-sm-4 col-md-2 portlet light bordered">
		<label style="color: #337ab7;" for="diasTomados"><label style="color: #FF0000;">*</label>Dias Tomados:</label>
		<input id="diasTomados" name="" type="text" class="form-control input-circle">
	</div>
	<div class="col-xs-12 col-sm-4 col-md-3 portlet light bordered">
		<label style="color: #337ab7;" for="diasProgre"><label style="color: #FF0000;">*</label>Consume primero dias Progresivos:</label>
		<select id="diasProgre" name="" class="form-control input-circle">
			<option value="">Seleccione...</option>
			<option value="Si">Si</option>
			<option value="No">No</option>
		</select>
	</div>
	<div class="col-xs-12 col-sm-4 col-md-2 portlet light bordered">
		<label style="color: #337ab7;" for="dateInit"><label style="color: #FF0000;">*</label>Fecha Inicio:</label>
		<input id="dateInit" name="" type="date" class="form-control input-circle">
	</div>
	<div class="col-xs-12 col-sm-6 col-md-2 portlet light bordered">
		<label style="color: #337ab7;" for="dateEnd"><label style="color: #FF0000;">*</label>Fecha Termino:</label>
		<input id="dateEnd" name="" type="date" class="form-control input-circle">
	</div>
	<div class="col-xs-12 col-sm-6 col-md-3 portlet light bordered">
		<label style="color: #337ab7;" for="vacaXtreme"><label style="color: #FF0000;">*</label>Vacaciones zona extrema:</label>
		<select id="vacaXtreme" name="" class="form-control input-circle">
			<option value="">Seleccione...</option>
			<option value="Si">Si</option>
			<option value="No">No</option>
		</select>
	</div>
	
<!-- 	INFORMACION PREVICIONAL -->

	<div class="col-xs-12 col-sm-12 col-md-12 ">
		<h4>Informacion Previcional</h4>
		<div class="col-xs-12 col-sm-6 col-md-2 portlet light bordered">
			<label style="color: #337ab7;" for="prevWorker"><label style="color: #FF0000;">*</label>Previcion(AFP):</label>
			<select id="prevWorker" name="" class="form-control input-circle">
				<option value="">Seleccione...</option>
				<option value="Habitat">Habitat</option>
				<option value="Cuprum">Cuprum</option>
				<option value="PlanVital">PlanVital</option>
				<option value="Provida">Provida</option>
				<option value="Capital">Capital</option>
				<option value="Modelo">Modelo</option>
			</select>
			<label style="color: #337ab7;" for="carNorPrev"><label style="color: #FF0000;">*</label>Cargas Normales:</label>
			<input id="carNorPrev" name="" type="text" class="form-control input-circle">
			<label style="color: #337ab7;" for="carInvPrev"><label style="color: #FF0000;">*</label>Cargas Invalidas:</label>
			<input id="carInvPrev" name="" type="text" class="form-control input-circle">
		</div>
		<div class="col-xs-12 col-sm-6 col-md-3 portlet light bordered">
			<label style="color: #337ab7;" for="segPrev"><label style="color: #FF0000;">*</label>Seguro de Cesantia:</label>
			<select id="segPrev" name="" class="form-control input-circle">
				<option value="">Seleccione...</option>
				<option value="Si">Si</option>
				<option value="No">No</option>
			</select>
			<label style="color: #337ab7;" for="iniPerSeCe"><label style="color: #FF0000;">*</label>Inicio periodo Seguro de Cesantia:</label>
			<input id="iniPerSeCe" name="" type="month" class="form-control input-circle">
			<label style="color: #337ab7;" for="AfecPrev"><label style="color: #FF0000;">*</label>Afecto Seguro Accidentes:</label>
			<select id="AfecPrev" name="" class="form-control input-circle">
				<option value="">Seleccione...</option>
				<option value="Si">Si</option>
				<option value="No">No</option>
			</select>
		</div>
		<div class="col-xs-12 col-sm-4 col-md-2 portlet light bordered">
			<label style="color: #337ab7;" for="isaPrev"><label style="color: #FF0000;">*</label>Isapre:</label>
			<select id="isaPrev" name="" class="form-control input-circle">
				<option value="">Seleccione...</option>
				<option value="ConSalud">ConSalud</option>
				<option value="BanMedica">BanMedica</option>
				<option value="Cruz Blanca">Cruz Blanca</option>
			</select>
			<label style="color: #337ab7;" for="tipoPacto"><label style="color: #FF0000;">*</label>Tipo de Pacto:</label>
			<select id="tipoPacto" name="" class="form-control input-circle">
				<option value="">Seleccione...</option>
				<option value="U.F.">U.F.</option>
				<option value="U.T.M.">U.T.M.</option>
			</select>
			<label style="color: #337ab7;" for="gesPrev"><label style="color: #FF0000;">*</label>Moneda Monto GES:</label>
			<select id="gesPrev" name="" class="form-control input-circle">
				<option value="">Seleccione...</option>
				<option value="U.F.">U.F.</option>
				<option value="U.T.M.">U.T.M.</option>
			</select>
		</div>
		<div class="col-xs-12 col-sm-4 col-md-2 portlet light bordered">
			<label style="color: #337ab7;" for="jubPrev"><label style="color: #FF0000;">*</label>Es jubilado:</label>
			<select id="jubPrev" name="" class="form-control input-circle">
				<option value="">Seleccione...</option>
				<option value="Si">Si</option>
				<option value="No">No</option>
			</select>
			<label style="color: #337ab7;" for="monPac"><label style="color: #FF0000;">*</label>Monto pactado:</label>
			<input id="monPac" name="" type="text" class="form-control input-circle">
			<label style="color: #337ab7;" for="monGes"><label style="color: #FF0000;">*</label>Monto GES:</label>
			<input id="monGes" name="" type="text" class="form-control input-circle">
		</div>
		<div class="col-xs-12 col-sm-4 col-md-3 portlet light bordered">
			<label style="color: #337ab7;" for="tramoPrev"><label style="color: #FF0000;">*</label>Tramo asignacion Familiar:</label>
			<select id="tramoPrev" name="" class="form-control input-circle">
				<option value="">Seleccione...</option>
				<option value="Tramo 1">Tramo 1</option>
				<option value="Tramo 2">Tramo 2</option>
				<option value="Tramo 3">Tramo 3</option>
			</select>
		</div>
	</div>
	

	<div class="col-xs-12 col-sm-12 col-md-12">
		<div id="addXpDiv" class="col-xs-12 col-sm-12 col-md-6 portlet light bordered">
		
		<!-- 	EXPERIENCIAS -->
			<h4>Experiencias Laborales</h4>
			<a id="addXp" onclick="javascript: addXp()">
				<i class="fa fa-plus"></i> Agregar
			</a>
			<br>
			<div id="addXpDivXp" class="col-xs-12 col-sm-12 col-md-12 portlet light bordered" style="display: none;">
				<div id="addXpDivXp" class="col-xs-12 col-sm-12 col-md-6">
					<label style="color: #337ab7;" for="vacaXtreme"><label style="color: #FF0000;">*</label>Empresa:</label>
					<input id="empresaXp" name="addXP" type="text" class="form-control input-circle">
					<label style="color: #337ab7;" for="vacaXtreme"><label style="color: #FF0000;">*</label>Sector de la Empresa:</label>
					<input id="sectorXp" name="addXP" type="text" class="form-control input-circle">
				</div>
				<div id="addXpDivXp" class="col-xs-12 col-sm-12 col-md-6">
					<label style="color: #337ab7;" for="vacaXtreme"><label style="color: #FF0000;">*</label>Cargo:</label>
					<input id="cargoXp" name="addXP" type="text" class="form-control input-circle">
					<label style="color: #337ab7;" for="vacaXtreme"><label style="color: #FF0000;">*</label>Area:</label>
					<input id="areaXp" name="addXP" type="text" class="form-control input-circle">
				</div>
				<div id="addXpDivXp" class="col-xs-12 col-sm-12 col-md-6">
					<label style="color: #337ab7;" for="vacaXtreme"><label style="color: #FF0000;">*</label>Desde:</label>
					<input id="areaXp" name="addXP" type="month" class="form-control input-circle">
				</div>
				<div id="addXpDivXp" class="col-xs-12 col-sm-12 col-md-6">
					<label style="color: #337ab7;" for="vacaXtreme"><label style="color: #FF0000;">*</label>Hasta:</label>
					<input id="areaXp" name="addXP" type="month" class="form-control input-circle">
				</div>
				<div id="addXpDivXp" class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;" for="vacaXtreme"><label style="color: #FF0000;">*</label>Funciones y Logros del Cargo:</label>
					<textarea id="areaXp" name="addXP" class="form-control input-circle"></textarea>
				</div>
				<div style="text-align: right;">
					<a id="addnewXP" onclick="javascript: addnewXP();" class="btn btn-circle red btn-outline">
						<i class="fa fa-floppy-o"></i> Guardar
					</a>
					<a id="cancelAddXp" onclick="javascript: cancelAddXp()" class="btn btn-circle red btn-outline">
						<i class="fa fa-times"></i> Cancelar
					</a>
				</div>
			</div>
		</div>
		<div id="viewXpDiv" class="col-xs-12 col-sm-12 col-md-6 portlet light bordered">
		
		<!-- 	COMPETENCIAS --> 
			<h4>Lista de Experiencias</h4>
			<a id="addXp">
				<i class="fa fa-plus"></i> Ver
			</a>
		</div>
		
	</div>
	

<!-- 	REMUNERACIONES -->

<div class="col-xs-12 col-sm-12 col-md-12">
	<h4>Remuneraciones</h4>
	<div class="col-xs-12 col-sm-3 col-md-3 portlet light bordered">
		<label style="color: #337ab7;" for="tipoSueldoBase"><label style="color: #FF0000;">*</label>Tipo Sueldo Base:</label>
		<select id="tipoSueldoBase" name="" class="form-control input-circle">
			<option value="">Seleccione...</option>
			<option value="Sueldo/Mes">Sueldo/Mes</option>
		</select>
	</div>
	<div class="col-xs-12 col-sm-3 col-md-3 portlet light bordered">
		<label style="color: #337ab7;" for="sueldoMensual"><label style="color: #FF0000;">*</label>Sueldo Mensual:</label>
		<input id="sueldoMensual" name="" type="text" class="form-control input-circle">
	</div>
	<div class="col-xs-12 col-sm-3 col-md-3 portlet light bordered">
		<label style="color: #337ab7;" for="asignZonaExtrema"><label style="color: #FF0000;">*</label>Asignacion Zona Extrema(%):</label>
		<input id="asignZonaExtrema" name="" type="text" class="form-control input-circle">
	</div>
	<div class="col-xs-12 col-sm-3 col-md-3 portlet light bordered">
		<label style="color: #337ab7;" for="gratLegal"><label style="color: #FF0000;">*</label>Gratificacion Legal:</label>
		<select id="gratLegal" name="" class="form-control input-circle">
			<option value="">Seleccione...</option>
			<option value="Tope 4,75 (IMM)">Tope 4,75 (IMM)</option>
		</select>
	</div>
</div>

<!-- 	INFORMACION PREVICIONAL -->
	<h4>Pago Automatico de Remuneraciones</h4>
	<div class="col-xs-12 col-sm-3 col-md-3 portlet light bordered">
		<label style="color: #337ab7;" for="nroCta"><label style="color: #FF0000;">*</label>N° Cuenta:</label>
		<input id="nroCta" name="" type="text" class="form-control input-circle">
	</div>
	<div class="col-xs-12 col-sm-3 col-md-3 portlet light bordered">
		<label style="color: #337ab7;" for="institucion"><label style="color: #FF0000;">*</label>Institucion:</label>
		<select id="institucion" name="" class="form-control input-circle">
			<option value="">Seleccione...</option>
			<option value="Banco Estado">Banco Estado</option>
			<option value="Banco Bci">Banco Bci</option>
			<option value="Banco Scotiabank">Banco Scotiabank</option>
			<option value="Banco Santander">Banco Santander</option>
		</select>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-12">
		<div class="col-xs-12 col-sm-4 col-md-4">
			<h4>Ahorro previcional voluntario individual(APVI)</h4>
			<label style="color: #337ab7;" for="apvi"><label style="color: #FF0000;">*</label>Tiene APVI:</label>
			<select id="apvi" name="" class="btn blue btn-outline btn-circle btn-sm">
				<option value="">Seleccione...</option>
				<option value="1">Si</option>
				<option value="2">No</option>
			</select>
		</div>
		<div class="col-xs-12 col-sm-4 col-md-4">
			<h4>Ahorro previcional voluntario Colectivo(APVC)</h4>
			<label style="color: #337ab7;" for="apvc"><label style="color: #FF0000;">*</label>Tiene APVC:</label>
			<select id="apvc" name="" class="btn blue btn-outline btn-circle btn-sm">
				<option value="">Seleccione...</option>
				<option value="1">Si</option>
				<option value="2">No</option>
			</select>
		</div>
		<div class="col-xs-12 col-sm-4 col-md-4">
			<h4>Afiliado Voluntario</h4>
			<label style="color: #337ab7;" for="afiliado"><label style="color: #FF0000;">*</label>Tiene Afiliado:</label>
			<select id="afiliado" name="" class="btn blue btn-outline btn-circle btn-sm">
				<option value="">Seleccione...</option>
				<option value="1">Si</option>
				<option value="2">No</option>
			</select>
		</div>
	</div>
</div>

<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>

<div style="text-align: center;">
	<a id="updWorker" onclick="javascript: editWorker(this.id)" style="display: none;" class="btn btn-circle red btn-outline">
		<i class="fa fa-refresh"></i> Actualizar
	</a>
	<a id="addnewWorker" onclick="javascript: addnewWorker(this.id)" class="btn btn-circle red btn-outline">
		<i class="icon-cloud-upload"></i> Guardar
	</a>
	<a id="cancelAdd" onclick="javascript: cancelAdd()" class="btn btn-circle red btn-outline">
		<i class="fa fa-times"></i> Cancelar
	</a>
	<a id="cancelAdd" onclick="javascript: viewDoc()" class="btn btn-circle red btn-outline">
		<i class="fa fa-times"></i> Ver Documento
	</a>
</div>