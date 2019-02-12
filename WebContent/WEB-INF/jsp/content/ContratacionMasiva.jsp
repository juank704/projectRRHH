<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!-- Modal Impresion -->
<div class="modal fade" tabindex="-1" role="dialog"
	id="imprimirDocumentos" data-keyboard="false" data-backdrop="static">

	<div class="modal-dialog" role="document">
		<form id="imprimirForm" action="" class="col-md-12 blank-form"
			method="post">
			<div class="modal-content">

				<div class="modal-header">
					<h3 class="modal-title">Impresión de Documentos</h3>
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">

					<table
						class="table table-striped table-bordered table-hover table-checkable">

						<tr style="display: none;" class="row">
							<th class="col-md-6"><label>Informacion del Modal
									para Imprimir</label></th>
							<td class="col-md-6"><input id="informacionImprimir">
							</td>
						</tr>

						<tr class="row">
							<th class="col-md-6"><label>EMPRESA: </label></th>
							<td class="col-md-6"><select id="idSociedadImpresion"
								name="idEmpresa">
									<option value="">Seleccione...</option>
							</select></td>
						</tr>

						<tr class="row">
							<th class="col-md-6"><label>HUERTO: </label></th>
							<td class="col-md-6"><select id="idHuertoImpresion"
								name="idHuerto">
									<option value="">Seleccione...</option>
							</select></td>
						</tr>

						<tr class="row">
							<th class="col-md-6"><label>TIPO DOCUMENTO: </label></th>
							<td class="col-md-6"><select id="documentoContrato"
								name="tipoDocumento" type="checkbox">
									<option selected value="7">Carta de Termino</option>
							</select></td>
						</tr>

						<tr class="row">
							<th class="col-md-6"><label>DOCUMENTO: </label></th>
							<td class="col-md-6"><select id="idTemplate">
									<option value="">Seleccione...</option>
							</select></td>
						</tr>

					</table>

				</div>
				<div class="modal-footer">
					<button style="display: visible;" id="imprimirMasivoBotonModal"
						type="button" class="btn btn-primary"
						onclick="generarDocumentosMasivos()">IMPRIMIR
						DOCUMENTACIÓN MASIVO</button>
					<button type="button" class="btn btn-secondary"
						data-dismiss="modal"
						onclick="javascript:$('#imprimirMasivoBotonModal').hide();">CERRAR</button>
				</div>

			</div>
		</form>
	</div>

</div>
<!-- Modal Impresion-->



<form action="#" id="searchForm"
	class="blank-form col-md-12 portlet light bordered" method="post">

	<h4>Filtros</h4>


	<div class="row" style="margin-top: -40px;">
		<div class="col-md-2 col-md-offset-2 text-center">
			<h5 class="text-center">EMPRESA</h5>
			<select id="idSociedad"
				class=" form-control input-circle input-sm mayusculasWork row_dataFiltros"
				name="idSociedad">
				<option value="">Seleccione una Empresa</option>
			</select>
		</div>
		<div class="col-md-2">
			<h5 class="text-center">HUERTO</h5>
			<select id="idHuerto"
				class=" form-control input-circle input-sm mayusculasWork row_dataFiltros"
				name="idHuerto">
				<option value="">Seleccione Huerto</option>
			</select>
		</div>
		<div class="col-md-2">
			<h5 class="text-center">CECO</h5>
			<select id="idCECO"
				class=" form-control input-circle input-sm mayusculasWork row_dataFiltros"
				name="idCECO">
				<option value="">Seleccione CECO</option>
			</select>
		</div>
		<div class="col-md-2">
			<h5 class="text-center">TIPO CONTRATO</h5>
			<select id="tipoContrato"
				class=" form-control input-circle input-sm mayusculasWork row_dataFiltros"
				name="tipoContrato">
				<option value="">Seleccione T/Contrato</option>
			</select>
		</div>
		<div class="col-md-offset-1 col-md-1">
			<input id="filtros" type="checkbox" checked />
		</div>
		<div class="col-md-12 text-center">
			<h5>Agregar Datos para Contratacion Masiva</h5>
		</div>
		
	</div>
	</form>

<form action="#" id="accionForm"
	class="blank-form col-md-12 portlet light bordered" method="post">
		<div class="col-md-12">
			<div class="col-md-3">
				<label>Tipo de Trabajador:</label> <select id="tipoTrabajador_new" name="tipoTrabajador_new"
					col_name="tipoTrabajador"
					class="form-control input-circle input-sm">
					<option value="">Seleccione...</option>
				</select>
			</div>
			<div class="col-md-3">
				<label>Tipo de Contrato:</label> <select id="tipoContrato_new" name="tipoContrato_new"
					col_name="tipoContrato"
					class="form-control input-circle input-sm">
					<option value="">Seleccione...</option>
				</select>
			</div>
			<div class="col-md-3">
				<label>Empresa:</label> <select id="idSociedad_new" name="idSociedad_new"
					col_name="idSociedad"
					class="form-control input-circle input-sm">
					<option value="">Seleccione...</option>
				</select>
			</div>
			<div class="col-md-3">
				<label>Huerto:</label> <select id="idHuerto_new" name="idHuerto_new"
					col_name="idHuertoContrato"
					class="form-control input-circle input-sm">
					<option value="">Seleccione...</option>
				</select>
			</div>
			<div class="col-md-3">
				<label>CECO:</label> <select id="idCECO_new" name="idCECO_new"
					col_name="idCECOContrato"
					class="form-control input-circle input-sm">
					<option value="">Seleccione...</option>
				</select>
			</div>
				<div class="col-md-3">
				<label>Faena:</label> <select id="idFaena_new" name="idFaena_new"
					col_name="idFaena"
					class="form-control input-circle input-sm">
					<option value="">Seleccione...</option>
				</select>
			</div>
			<div class="col-md-3">
				<label>Cargo:</label> <select id="idCargo_new" name="idCargo_new"
					col_name="cargo"
					class="form-control input-circle input-sm">
					<option value="">Seleccione...</option>
				</select>
			</div>
			<!-- TODO: -->
			<div class="col-md-3">
				<label>Fecha de Ingreso: </label> <input id="fechaIngreso_new" name="fechaIngreso_new"
					col_name=fecha_inicio_actividad type="text"
					class="form-control input-circle input-sm dateWork">
			</div>
			<div class="col-md-3">
				<label>Fecha de Termino: </label> <input id="fechaTermino_new" name="fechaTermino_new"
					col_name=fecha_termino_actividad type="text"
					class="form-control input-circle input-sm dateWork">
			</div>
			<div class="col-md-3">
				<label>Sueldo Base: </label> <input id="sueldoBase_new" type="text" name="sueldoBase_new"
					class="form-control input-circle input-sm moneyWork" col_name="sueldoBase">
			</div>
			<div class="col-md-3">
				<label>Horas Semanales: </label> <input id="horasSemanales_new" type="number" name="horasSemanales_new"
					class="form-control input-circle input-sm" col_name="horasSemanales">
			</div>
			<div class="col-md-2" style="margin-top: 30px;">
				<a id="btnBuscar" title="buscarTrabajador"
					class="btn btn-circle blue btn-outline input-sm" data-toggle="modal"
					onclick="javascript:buscarTrabajadorByParams()"> <i
					class="fa fa-search"></i> Buscar
				</a>
			</div>

		</div>



	<div class="row">
		<div class="col-md-8">
			<h5 class="text-center">TRABAJADOR</h5>
			<div class="input-icon right">
				<select id="trabajadores" multiple="multiple"
					class="form-control input-md multiple input-circle mayusculasWork input-sm ">
				</select>
			</div>
		</div>
	</div>

	<div class="row">

		<div class="col-md-2">
			<a id="volver" title="Limpiar Proceso"
				class="btn btn-circle red btn-outline input-sm"
				onclick="javascript:cleanScreen();"> <i
				class="fa fa-reply fa-lg"></i> Volver
			</a>
		</div>

		<div class="col-md-offset-1  col-md-2">
			<a style="display: none;" id="btnAnadirIndividual"
				class="btn btn-circle blue btn-outline input-sm" id=""
				onclick="agregarFila()"> <i class="fa fa-plus">Añadir
					Individual</i>
			</a>
		</div>

		<div class="col-md-2">
			<a style="display: none;" class="btn btn-circle blue btn-outline input-sm"
				id="btnAnadirMasivo" onclick="agregarMasivo()"> <i
				class="fa fa-reply-all" aria-hidden="true">Añadir Todos</i>
			</a>
		</div>

		<div class="col-md-offset-2 col-md-2">
			<a id="documentacionMasiva"
				title="Generar Separacion de los Trabajadores Seleccionados"
				style="display: none;" class="btn btn-circle red btn-outline input-sm"
				data-toggle="modal" onclick="javascript:generarAccionMasivos()">
				<i class="fa fa-floppy-o fa-lg"></i> Grabar
			</a>
		</div>

	</div>

</form>

<div class="table-responsive2">
	<table
		class="table table-bordered table-striped table-condensed "
		id="datatableContratacionMasiva">

		<thead>
			<tr>
				<th style='text-align: center;'><input
					style="margin-left: auto; margin-right: auto;" type="checkbox"
					title="Seleccionar Todo" id="checkAll"
					onchange="javascript: selectALL(this);"
					class="checkbox text-uppercase" value=""></th>
				<th style='text-align: center; width: 2%;'>Cod</th>
				<th style='text-align: center; min-width: 350px; width: 350px;'>Nombre</th>
				<th style='text-align: center; min-width: 100px; width: 100px;'>Rut</th>
				<th style='text-align: center; min-width: 150px; width: 150px;'>Tipo de Trabajador</th>
				<th style='text-align: center; min-width: 150px; width: 150px;'>Tipo de Contrato</th>
				<th style='text-align: center; min-width: 150px; width: 150px;'>Empresa</th>
				<th style='text-align: center; min-width: 150px; width: 150px;'>Huerto</th>
				<th style='text-align: center; min-width: 150px; width: 150px;'>CECO</th>
				<th style='text-align: center; min-width: 150px; width: 150px;'>Faena</th>
				<th style='text-align: center; min-width: 150px; width: 150px;'>Cargo</th>
				<th style='text-align: center; min-width: 150px; width: 150px;'>Fecha de Ingreso</th>
				<th style='text-align: center; min-width: 150px; width: 150px;'>Fecha de Termino</th>
				<th style='text-align: center; min-width: 150px; width: 150px;'>Sueldo Base</th>
				<th style='text-align: center; min-width: 150px; width: 150px;'>Horas Semanales</th>
				<th style='text-align: center;'>Opciones</th>
			</tr>
		</thead>
		<tbody id="tblContratacionMasiva"></tbody>
	</table>
</div>

<div class="dragbox ui-resizable">
	<div class="dragbox-content"></div>
</div>

<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>

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

.select2-hidden-accessible {
	border: 0 !important;
	clip: rect(0, 0, 0, 0) !important;
	height: 1px !important;
	margin: -1px !important;
	overflow: hidden !important;
	padding: 0 !important;
	position: absolute !important;
	width: 1px !important
}

.tdSociedad {
	display: none;
}

.tdMontoIngresado {
	display: none;
}

.swal2-container.swal2-shown {
	background-color: rgba(0, 0, 0, 0.4);
	z-index: 99999 !important;
}

.blank-form {
	outline: none !important;
	padding: 0em !important;
	border: 0px !important;
	border-radius: 0 !important;
	margin: 0 !important;
	box-shadow: none !important;
}


</style>

