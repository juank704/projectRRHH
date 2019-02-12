<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<div class="row" style="">

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
						Codigo:<strong name="strong" id="codigo"></strong> <a
							id="buscarTrabajador"
							class="btn btn-circle blue btn-outline btn-xs"> <i
							class="fa fa-search"></i>
						</a>
					</h5>
					<h5>
						<label id="labelRut">RUT: </label><strong name="strong"
							id="rutWorkerHead"></strong>
					</h5>
				</div>

				<div class="col-md-4" style="width: 27%;">
					<h5>
						Fecha Ingreso: <strong name="strong" id="inWorker"></strong>
					</h5>
					<h5>
						Empresa: <strong name="strong" id="empresaWorker"></strong>
					</h5>
				</div>
				<div class="col-md-3" style="">
					<h5>
						Telefono: <strong name="strong" id="phoneWorker"></strong>
					</h5> 
					<div id="rolPrivadoDiv" style="display:none;">
					<label>Rol Privado</label>
					<input type='checkbox' id='rolPrivado' name="rolPrivado"
						class='checkbox checkboxOption double' col_name="rolPrivado" 
						style="display: inline;" />
					</div>
					
				</div>
				
				
				
			</div>
		</div>

		<div class="col-md-2" style="right: 80px;">
			<img id="imgFoto" data-toggle="modal" data-target=".subirFoto"
				height="100px" width="60%" data-idtipodocumento="50" onclick="previsualizarImagen(50)"
				src="../assets/pages/img/avatars/img-default.png" />
		</div>

		<div class="col-md-12">
			<div class="col-md-2">
				<a onclick="javascript:history.back();"
				class="btn btn-circle red btn-outline"> <i class="fa fa-reply"></i>
				Volver
				</a>
			</div>
			<div class="col-md-4" style="bottom: 35px; left: 45px;">
				<input id="searchByName" style="max-with:80px; border: 1px solid red;" class="btn btn-circle btn-outline btn-xs "  placeholder="Buscar por Nombre: " />
				<a class="btn btn-circle blue btn-outline btn-xs" onclick="searchByName($('#searchByName').val())" ><i class="fa fa-search"></i></a>
			</div>	
			<div class="col-md-2">
				<a id="btnEditPeriodo" class="btn btn-circle btn-warning " onclick="modificarPeriodo()">Modificar Periodo Anterior</a>
				<a id="btnSavePeriodo" style="display:none;" class="btn btn-circle btn-primary " onclick="salvarPeriodo()">Guardar Periodo</a>
			</div>	
			<div class="col-md-2">
				<a id="btnCancelPeriodo" style="display:none;" class="btn btn-circle btn-danger " onclick="location.reload()">Cancel Periodo</a>
			</div>	
		</div>

	</div>

</div>
<!-- FIN ROW -->

<div class="row" id="navigation" style="padding-bottom: 10px;">
	<div class="col-xs-12 col-sm-12 col-md-12">
		<ul class="nav nav-tabs">
			<li id="personales" class="active"
				onclick="javascript:$('#btnSave').is(':visible') == true ? $('#btnEdit').hide() : $('#btnEdit').show();"><a
				data-toggle="tab" href="#datos_personales">Personales</a></li>
			<li id="laborales"
				onclick="javascript:$('#btnSave').is(':visible') == true ? $('#btnEdit').hide() : $('#btnEdit').show();"><a
				data-toggle="tab" href="#datos_laborales">Laborales</a></li>
			<li id="asignacionFamiliar"><a data-toggle="tab"
				onclick="javascript:$('#btnEdit').hide();$('#btnSave').hide();$('#btnCancel').hide();"
				href="#datos_asignacionFamiliar">Grupo Familiar</a></li>
			<li id="contrato"><a data-toggle="tab" href="#datos_contrato">Documentos</a></li>
			<li id="movimientos"><a data-toggle="tab"
				href="#datos_movimientos">Movimientos</a></li>
			<li id="movimientos"><a data-toggle="tab" href="#datos_permisos">Permisos</a></li>
			<li id="movimientos"><a data-toggle="tab"
				href="#datos_licencias">Licencias</a></li>
			<!-- 		<li id="centroDistribucion"><a data-toggle="tab"
				href="#datos_centroCosto">Centro de Costo</a></li> -->
			<li data-toggle="tab"><a id='btnEdit' title='editar'
				style="border-bottom: hidden; right: 0px; background-color: #ffff; border: 1px solid #ddd; border-bottom-color: transparent;"
				class='btn  yellow btn-outline btn-sm btn_edit customEdit'><span
					class='fa fa-pencil-square-o fa-lg customEdit'></span> Modificar</a></li>
			<li data-toggle="tab"><a id='btnSave' title='editar'
				style="border-bottom: hidden; right: 0px; background-color: #ffff; border: 1px solid #ddd; border-bottom-color: transparent; display: none;"
				class='btn blue btn-outline btn-sm btn_save customEdit'><span
					class='fa fa-floppy-o fa-lg customEdit'></span> Guardar</a></li>
			<li data-toggle="tab"><a id='btnCancel' title='editar'
				style="border-bottom: hidden; right: 0px; background-color: #ffff; border: 1px solid #ddd; border-bottom-color: transparent; display: none;"
				class='btn red btn-outline btn-sm btn_cancel customEdit'><span
					class='fa fa-times fa-lg customEdit'></span> Cancelar</a></li>
		</ul>
	</div>
</div>

<div class="tab-content">

	<%@ include file="datosPersonalesColaborador.jspf"%>

	<%@ include file="datosLaboralesColaborador.jspf"%>

	<%@ include file="datosFamiliaresColaborador.jspf"%>

	<%@ include file="datosDocumentosColaborador.jspf"%>

	<%@ include file="datosPermisosColaborador.jspf"%>

	<%@ include file="datosLicenciasColaborador.jspf"%>

	<%@ include file="datosCentroCostosColaborador.jspf"%>

	<%@ include file="datosMovimientosColaborador.jspf"%>

</div>



<div style="text-align: left;">
	<a onclick="javascript:history.back();"
		class="btn btn-circle red btn-outline"> <i class="fa fa-reply"></i>
		Volver
	</a>
</div>


<%@ include file="datosModalesColaborador.jspf"%>


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

.wrapper {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(7, 100px);
	grid-gap: 10px;
	/*grid-auto-rows: minmax(100px, auto);*/
}

.one {
	grid-column: 1;
	grid-row: 1/3;
}

.two {
	grid-column: 1;
	grid-row: 3/5;
}

.three {
	grid-column: 2;
	grid-row: 1/2;
}

.four {
	grid-column: 2;
	grid-row: 3/4;
}

.five {
	grid-column: 3;
	grid-row: 1/4;
}

.six {
	grid-column: 3;
	grid-row: 5/6;
}

.seven {
	grid-column: 1;
	grid-row: 5/6;
}

.eight {
	grid-column: 2;
	grid-row: 5/6;
	padding-top: 10%
}

.nine {
	grid-column: 3;
	grid-row: 3;
}

tfoot {
	display: table-row-group;
}

strong {
	text-transform: uppercase;
}

.swal2-container {
	z-index: 15000 !important;
}

/* enable absolute positioning */
.inner-addon { 
    position: relative; 
}

/* style icon */
.inner-addon .glyphicon {
  position: absolute;
  padding: 10px;
  /*pointer-events: none;*/
}

/* align icon */
.left-addon .glyphicon  { left:  0px;}
.right-addon .glyphicon { right: 0px;}

/* add padding  */
.left-addon input  { padding-left:  30px; }
.right-addon input { padding-right: 30px; }

.charCloseX { 
    right: 0px;
    position: absolute;
    padding: 10px;
    display: none;
}


/*.checkboxCollapse {
	-webkit-appearance: none;
	background-color: #fafafa;
	border: 1px solid #cacece;
	box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05);
	padding: 9px;
	border-radius: 3px;
	display: inline-block;
	position: relative;
}

.checkboxCollapse:active, .regular-checkbox:checked:active {
	box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px 1px 3px rgba(0,0,0,0.1);
}

.checkboxCollapse:checked {
	background-color: #e9ecee;
	border: 1px solid #adb8c0;
	box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05), inset 15px 10px -12px rgba(255,255,255,0.1);
	color: #99a1a7;
}

.checkboxCollapse:checked:after {
	content: '\2714';
	font-size: 14px;
	position: absolute;
	top: 0px;
	left: 3px;
	color: #99a1a7;
}*/

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



<article id="loading" class="loading_dos" style="display: none;">
	<div id="modal" class="modal"></div>
</article>

<!-- <script type="text/javascript" src="../assets/script/funcionesEditarColaborador.js"></script>
<script type="text/javascript" src="../assets/script/detalleTrabajadorJS.js"></script> -->

