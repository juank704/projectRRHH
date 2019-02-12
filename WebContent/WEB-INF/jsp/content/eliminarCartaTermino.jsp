<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="row">

	<div class="col-md-12">

		<form action="#" id="searchForm"
			class="blank-form col-md-12 portlet light bordered" method="post">

			<h4>Filtros</h4>

			<div class="row" style="margin-top: -40px;">
				<div class="col-md-2 col-md-offset-2 text-center">
					<h5 class="text-center">EMPRESA</h5>
					<select id="idSociedad"
						class=" form-control btn-circle input-sm btn-sm mayusculasWork row_dataFiltros"
						name="idSociedad">
						<option value="">Seleccione una Empresa</option>
					</select>
				</div>
				<div class="col-md-2">
					<h5 class="text-center">HUERTO</h5>
					<select id="idHuerto"
						class=" form-control btn-circle input-sm btn-sm mayusculasWork row_dataFiltros"
						name="idHuerto">
						<option value="">Seleccione Huerto</option>
					</select>
				</div>
				<div class="col-md-2">
					<h5 class="text-center">CECO</h5>
					<select id="idCECO"
						class=" form-control btn-circle input-sm btn-sm mayusculasWork row_dataFiltros"
						name="idCECO">
						<option value="">Seleccione CECO</option>
					</select>
				</div>
				<div class="col-md-2">
					<h5 class="text-center">TIPO CONTRATO</h5>
					<select id="tipoContrato"
						class=" form-control btn-circle input-sm btn-sm mayusculasWork row_dataFiltros"
						name="tipoContrato">
						<option value="">Seleccione T/Contrato</option>
					</select>
				</div>
				<div class="col-md-offset-1 col-md-1">
					<input id="filtros" type="checkbox" checked />
				</div>
				<div class="col-md-12 text-center">
					<h5>Finzalizacion de Contrato</h5>
				</div>

				<div class="col-md-12">
					<div class="col-md-3">
						<label>FECHA DE NOTIFICACION: </label> <input name="fechaNotificacion_date"
							id="fechaNotificacion" col_name="fechaNotificacion" type="text"
							class="form-control input-circle input-sm row_dataFiltros dateWork">
					</div>
					<div class="col-md-3">
						<label>FECHA DE TERMINO: </label> <input id="fechaTermino" name="FechaTerminoContrato_date"
							col_name="fechaTerminoContrato" type="text"
							class="form-control input-circle input-sm row_dataFiltros dateWork">
					</div>
					<div class="col-md-3">
						<label>ARTICULO:</label> <select id="articulo"
							col_name="articuloTerminoContrato" name="articuloTerminoContrato"
							class="form-control input-circle input-sm row_dataFiltros">
							<option value="">Seleccione...</option>
							<c:if test="${not empty listaArticuloTerminoContrato}">
								<c:forEach items="${listaArticuloTerminoContrato}"
									var="articuloTerminoContrato">
									<option
										value="${articuloTerminoContrato.idArticuloTerminoContrato}">${articuloTerminoContrato.descripcion}</option>
								</c:forEach>
							</c:if>
						</select>
					</div>
					<div class="col-md-3">
						<label>INCISO:</label> <select id="inciso" name="incisoTerminoContrato"
							col_name="incisoTerminoContrato"
							class="form-control input-circle input-sm row_dataFiltros">
							<option value="">Seleccione...</option>
							<c:if test="${not empty listaIncisoTerminoContrato}">
								<c:forEach items="${listaIncisoTerminoContrato}"
									var="incisoTerminoContrato">
									<option data-chained="${incisoTerminoContrato.idArticuloTerminoContrato}"
										value="${incisoTerminoContrato.idIncisoTerminoContrato}">${incisoTerminoContrato.descripcion}</option>
								</c:forEach>
							</c:if>
						</select>
					</div>
					<div class="col-md-3">
						<label>LETRA:</label> <select id="letra" name="letraTerminoContrato"
							col_name="letraTerminoContrato" class="form-control input-circle input-sm row_dataFiltros">
							<option value="">Seleccione...</option>
							<c:if test="${not empty listaLetraTerminoContrato}">
								<c:forEach items="${listaLetraTerminoContrato}"
									var="letraTerminoContrato">
									<option	data-chained="${letraTerminoContrato.idIncisoTerminoContrato}" 
									value="${letraTerminoContrato.idLetraTerminoContrato}">${letraTerminoContrato.letraTerminoContrato}
										- ${letraTerminoContrato.descripcion}</option>
								</c:forEach>
							</c:if>
						</select>
					</div>
					<div class="col-md-3">
						<label>FECHA DE PAGO: </label> <input id="fechaPago" name="fechaPago_date"
							col_name="fechaPago" type="text"
							class="form-control input-circle input-sm row_dataFiltros dateWork">
					</div>
					<div class="col-md-3">
						<label>LUGAR DE PAGO: </label> <input id="lugarPago" type="text" name="lugarPago"
							class="form-control row_dataFiltros input-sm input-circle"
							col_name="lugarPago">
					</div>
					<div class="col-md-3">
						<label>DESCRIPCION: </label>
						<input id="descripcion"
							class="form-control row_dataFiltros input-circle input-sm" name="descripcion"
							col_name="descripcion" />
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

				<div class="col-md-2">
						<a id="btnBuscar" title="buscarTrabajador"
							class="btn btn-circle blue btn-outline" data-toggle="modal"
							onclick="javascript:buscarTrabajadorByParams()"> <i
							class="fa fa-search"></i> Buscar
						</a>
				</div>

				<div class="col-md-offset-2 col-md-2">
					<a id="eliminarMasivo"
						title="Eliminar Masivo"
						style="display: none;" class="btn btn-circle red btn-outline input-sm"
						data-toggle="modal" onclick="generarAccionMasivos()">
						<i class="fa fa-floppy-o fa-lg"></i> Eliminar Masivo
					</a>
				</div>

			</div>

		</form>

	</div>

	<div class="col-md-12">

		<div id="divTable" class="table-responsive pre-scrollable"> 
			<table
				class="table table-bordered table-hover table-striped table-condensed dataTable no-footer"
				id="datatableCartaTermino">

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
						<th style='text-align: center; min-width: 150px; width: 150px;'>Fecha
							de Notificacion</th>
						<th style='text-align: center; min-width: 150px; width: 150px;'>Fecha
							de Termino</th>
						<th style='text-align: center; min-width: 150px; width: 150px;'>Articulo</th>
						<th style='text-align: center; min-width: 150px; width: 150px;'>Inciso</th>
						<th style='text-align: center; min-width: 150px; width: 150px;'>Letra</th>
						<th style='text-align: center; min-width: 150px; width: 150px;'>Fecha
							de Pago</th>
						<th style='text-align: center; min-width: 150px; width: 150px;'>Lugar
							de Pago</th>
						<th style='text-align: center; min-width: 150px; width: 150px;'>Hora
							de Pago Inicio</th>
						<th style='text-align: center; min-width: 150px; width: 150px;'>Hora
							de Pago Fin</th>
						<th style='text-align: center; min-width: 150px; width: 150px;'>Descripcion</th>
						<th style='text-align: center; min-width: 150px; width: 150px;'>Opciones</th>


					</tr>
				</thead>
				<tbody id="tblCartaTermino"></tbody>
			</table>
		</div>
	</div>

</div>

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

.dataTables_scrollHead {
	margin-top : -30px;
}


</style>
