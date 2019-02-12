<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div id="myModal2" class="modal fade" role="dialog">
	<div class="modal-dialog">

		<!-- Modal content-->
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title">Modal Header</h4>
			</div>
			<div class="modal-body">
				<p>Some text in the modal.</p>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div>

	</div>
</div>
<div class="col-md-12">
	<div class="col-md-10">
		<h3>Modulo Finiquitos</h3>
	</div>
</div>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	<div class="col-md-12">
		<h4>Filtros</h4>
		<div class="col-md-12">
			<div class="col-md-3"></div>
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-12">
		<div
			class="col-xs-12 col-sm-2 col-md-2  col-sm-offset-1 col-md-offset-1 text-center">
			<h5 class="text-center">Empresa</h5>
	      </select> <select id="Sociedad" class=" form-control btn-circle btn-sm mayusculasWork" >
	         <option value="-1">Seleccione una Empresa</option>
	      </select>
		</div>
		<div class="col-xs-12 col-sm-2 col-md-2 text-center">
			<h5 class="text-center">Huerto</h5>
			<select id="tipodivision"
					class=" form-control btn-circle btn-sm mayusculasWork">
					<option value="-1">Seleccione HUERTO</option>
				</select>
		</div>
		<div class="col-xs-12 col-sm-2 col-md-2 text-center">
			<h5 class="text-center">Zona</h5>
			<select id="tiposubdivision"
					class=" form-control btn-circle btn-sm mayusculasWork">
					<option value="-1">Seleccione ZONA</option>
				</select>
		</div>
		<div class="col-xs-12 col-sm-2 col-md-2 text-center">
			<h5 class="text-center">CECO</h5>
			<select id="listagrupo"
					class=" form-control btn-circle btn-sm mayusculasWork">
					<option value="-1">Seleccione CECO</option>
				</select>
		</div>
		
	</div>
	<div class="col-xs-12 col-sm-12 col-md-12">

		<div class="col-xs-3 col-sm-3 col-md-3">
		
		
		</div>
		<div class="col-xs-6 col-sm-6 col-md-6">
			<h5 class="text-center">Trabajador</h5>
			<div class="input-icon right">
				<select id="nombreTrabajador"
					class="form-control input-sm input-circle ">

				</select>
			</div>
		</div>
		<div class="col-xs-3 col-sm-3 col-md-3"></div>
		<div class="col-xs-12 col-sm-2 col-md-2 text-center">
			<button id="" title="buscarTrabajador"
				class="btn btn-circle blue btn-outline marginDefaced width100"
				data-toggle="modal" onclick="javascript:buscarTrabajadorByParams()">
				<i class="fa fa-search"></i> Buscar
			</button>
		</div>

		<div class="col-xs-12 col-sm-1 col-md-1 text-center">
			<!--                      <button id="" title="buscarTrabajador" class="btn btn-circle blue btn-outline marginDefaced2" data-toggle="modal" onclick="agregarFila()"> -->
			<!--                         <i class="fa fa-plus"></i> -->
			<!--                     </button> -->
		</div>
	</div>
</div>
<br>
<br>
<br>
<br>
<br>

<div class="dragbox ui-resizable">
	<div class="dragbox-content"></div>
</div>
<p style="color: white">.</p>
<article id="loading" class="loading_dos" style="display: none;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>
<p style="color: white">.</p>
<style>
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

.formatedBox {
	margin: 11px 2px 4px -11px !important;
}

.marginDefaced {
	margin-top: 25%;
}

.marginDefaced2 {
	margin-top: 64% !important;
}

.width100 {
	width: 100%;
}

.formatedIcon {
	margin-left: -19px !important;
}

.formatedPadding {
	padding-left: 9px !important;
}
</style>