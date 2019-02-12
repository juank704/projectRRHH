<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="modal fade" id="addGroupToWorkersModal" tabindex="-1"
	role="dialog" aria-labelledby="addGroupToWorkersModal"
	aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-body padding-top-5">
				<form class="form-horizontal form-refactored noRadius noBorder"
					id="addGroupToWorkersForm" role="form">
					<div class="form-body">
						<div class="form-group">
							<label class="col-md-4 control-label">Nombre de grupo</label>
							<div class="col-md-8">
								<input type="text" class="form-control " id="nombreGrupo"
									name="nombreGrupo" required>
							</div>
						</div>
						<div class="form-group">
							<h4>Trabajadores</h4>
							<div class="col-md-12">
								<table
									class="table table-striped table-bordered table-hover dt-responsive"
									id="addGroupTable">
									<thead>
										<tr role="row" class="heading">
											<th style="width: 2%;">id</th>
											<th style="min-width: 150px;">Rut</th>
											<th width="20%">Nombre</th>
											<th width="20%">Apellido</th>
										</tr>
									</thead>
									<tbody id="tblBodyAddWorkersToGroup"></tbody>
								</table>
							</div>
						</div>


						<div class="form-actions right1">
							<button type="button" class="btn default" onclick="clearData()">Cancelar</button>
							<button type="submit" class="btn green"
								id="agregarworkerstogroupSubmit">Agregar a grupo</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>


<!--
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	 <div class="col-md-2">
		<h4>División</h4>
		<select id="division" class="row_dataCalculo form-control input-circle"  name="division">
			<option value="">Seleccione</option>
		</select>
	</div>
	<div class="col-md-2">
		<h4>SubDivision</h4>
		<select id="idSubDivision" class="row_dataCalculo form-control input-circle"  name="idSubDivision">
			<option value="">Seleccione</option>
		</select>
	</div> 
	<div class="col-xs-4 col-sm-3 col-md-2">
		<h4>Grupos</h4>
		<select id="SelectGroup"
			class="col-md-12 btn btn-circle dark btn-outline btn-sm"
			onchange="javascript:selectingGroup(this.value)"></select>
	</div> -->
	<!-- <div class="col-md-2" >
		<h4>SubGrupo</h4>		
		<select id="idSubGrupo" class="row_dataCalculo form-control input-circle" name="idSubGrupo">
			<option value="">Seleccione</option>
		</select>
	</div> 
</div>
-->

<div class="row">
	<div class='dropdown dropleft float-left'>
		<button class='btn btn-circle red btn-outline dropdown-toggle'
			title='Modificar' type='button' data-toggle='dropdown'>
			Movimietnos Masivos <span class='caret'></span>
		</button>
		<ul class='dropdown-menu'>
			<li><a onclick='javascript: menuImprimirMasivo();'>Impresion de Contratos Masivos <i class="fa fa-print fa-lg"></i></a></li>
			<!-- <li><a onclick='javascript: excelReportListaTrabajadores();'>Impresion de Reporte en Excel <i class="fa fa-file-excel-o fa-lg"></i></a></li>  -->
			<!-- <li><a onclick='javascript: fanticipos();'>Anticipos Masivos</a></li> -->
<!-- 			<li><a onclick='javascript: contratoMasivos();'>Contratacion
					Masivos</a></li> -->
			<!-- <li><a onclick='javascript: addToGroup();'>Adherir a Grupo</a></li> -->

		</ul>
	</div>
	<div class="float-right col-md-4">
		<a id="addWorker" class="btn btn-circle red btn-outline col-md-4">
			<i class="fa fa-plus"></i> Agregar
		</a> <!-- <a id="addTest" onclick="javascript: addTest();"
			class="btn btn-circle red btn-outline col-md-8"> <i
			class="fa fa-plus"></i> Haberes y Descuentos
		</a> -->
	</div>
</div>

<div class="col-md-12">

	<table
		class="table table-striped table-bordered table-hover table-checkable"
		id="datatable_ajax">
		<thead>
			<tr role="row" class="heading">
				<th style="width: 2%;"><input
					style="margin-left: auto; margin-right: auto;" type='checkbox'
					title='Seleccionar Todo' id='checkAll'
					onchange='javascript: selectALL(datatable_ajax);' class='checkbox' /></th>
				<th style="width: 2%;">Codigo</th>
				<th style="width: 100px;">Rut</th>
				<th>Nombre</th>
				<th>Fecha Ingreso</th>
				<th>Empresa</th>
				<th>Teléfono</th>
				<th>Estado del Trabajador</th>
				<th>Opciones</th>
			</tr>
		</thead>
		<tfoot>
			<tr role="row" class="heading">
				<th style="width: 2%;"></th>
				<th style="width: 2%;">Codigo</th>
				<th style="width: 100px;">Rut</th>
				<th style="width: 200px;">Nombre</th>
				<th style="width: 100px;">Fecha Ingreso</th>
				<th style="width: 200px;">Empresa</th>
				<th style="width: 200px;">Teléfono</th>
				<th style="width: 200px;">Estado del Trabajador</th>
				<th style="width: 200px;"></th>
			</tr>
		</tfoot>
		<tbody id="dataBodyC"></tbody>
	</table>

</div>


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
							<th class="col-md-6"><label>Informacion del Modal para Imprimir</label></th>
							<td class="col-md-6"><input id="informacionImprimir">
							</td>
						</tr>

						<!-- <tr>
			<th><label>Tipo de Documento</label></th>
			<td><select id="tipoDocumento">
						<option value="">Seleccione...</option>
					</select></td>
			</tr> -->
						
						<tr class="row">
							<th class="col-md-6"><label>EMPRESA: </label></th>
							<td class="col-md-6"><select id="idSociedad" name="idEmpresa">
							</select></td>
						</tr>
						
						<tr class="row">
							<th class="col-md-6"><label>HUERTO: </label></th>
							<td class="col-md-6"><select id="idHuerto" name="idHuerto">
							</select></td>
						</tr>
						
						<tr class="row">
								<th class="col-md-6"><label>TIPO DOCUMENTO: </label></th>
								<td class="col-md-6"><select id="documentoContrato" 
								name="tipoDocumento" type="checkbox" >
								<option value="">Seleccione...</option>
								<option value="1">Contrato</option>
								</select></td>
						</tr>
						
						<tr class="row">
							<th class="col-md-6"><label>DOCUMENTO: </label></th>
							<td class="col-md-6"><select id="idTemplate">
							</select></td>
						</tr>
						
						<tr style="display: none;" class="row">
							<th class="col-md-6"><label>FECHA DE ESCRITURACIÓN: </label></th>
							<td class="col-md-6"><input id="fechaImpresionContrato"
								class="row_dataImpresionContrato dateWork" name="fechaImpresionContrato">
							</td>
						</tr>
						
						<tr style="display: none;" class="row">
							<th class="col-md-6"><label>FECHA FIN PACTO DE HORAS EXTRAORDINARIAS: </label></th>
							<td class="col-md-6"><input id="fechaPactoHorasExtra"
								class="row_dataImpresionContrato dateWork" name="fechaPactoHorasExtra">
							</td>
						</tr>
					</table>

					



				</div>
				<div class="modal-footer">
					<button style="display: none;" id="imprimirBotonModal" type="button" class="btn btn-primary" onclick="imprimir()">IMPRIMIR
						DOCUMENTACIÓN</button>
					<button style="display: none;" id="imprimirMasivoBotonModal" type="button" class="btn btn-primary" onclick="imprimirMasivo()">IMPRIMIR
						DOCUMENTACIÓN MASIVO</button>
					<button type="button" class="btn btn-secondary"
						data-dismiss="modal"  onclick="javascript:$('#imprimirBotonModal, #imprimirMasivoBotonModal').hide();" >CERRAR</button>
				</div>

			</div>
		</form>
	</div>

</div>
<!-- Modal Impresion-->




<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>

</article>

<style>
.form-refactored {
	width: 101%;
	margin: auto;
	border: none;
	box-shadow: none;
}

.page-content {
	float: left;
}

.float-left {
	float: left;
}

.float-right {
	float: right;
}

.table-scrollable {
	overflow-y: unset !important;
	overflow-x: unset !important;
}

#datatable_ajax_filter {
	display: none !important;
}

tfoot {
	display: table-row-group;
}

td {
	text-transform: uppercase
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

button.close {
display : none;
}

</style>









