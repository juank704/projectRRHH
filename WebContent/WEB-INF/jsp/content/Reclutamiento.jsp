<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
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








<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered invisible">
	<!-- <div class="col-md-2">
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
	</div> -->
	<div class="col-xs-4 col-sm-3 col-md-2">
		<h4>Grupos</h4>
		<select id="SelectGroup"
			class="col-md-12 btn btn-circle dark btn-outline btn-sm"
			onchange="javascript:selectingGroup(this.value)"></select>
	</div>
	<!-- <div class="col-md-2" >
		<h4>SubGrupo</h4>		
		<select id="idSubGrupo" class="row_dataCalculo form-control input-circle" name="idSubGrupo">
			<option value="">Seleccione</option>
		</select>
	</div> -->
</div>
<div class="col-md-12">

	<table
		class="table table-striped table-bordered table-hover table-checkable"
		id="datatable_ajax">
		<thead>
			<div class="col-md-12">
				<div class="col-md-offset-5">
					<label>Buscar por Rut: <input id="buscador_rut" class="form-control input-small input-inline" type="text"></label>
				</div>
			</div>
			<tr role="row" class="heading">
				<th style="width: 2%;"><input
					style="margin-left: auto; margin-right: auto;" type='checkbox'
					title='Seleccionar Todo' id='checkAll'
					onchange='javascript: selectALL(this);' class='checkbox' /></th>
				<th style="width: 2%;">Codigo</th>
				<th style="min-width: 150px;">Rut</th>
				<th width="20%">Nombre</th>
				<th width="20%">Apellido</th>
				<th width="20%">Fecha Ingreso</th>
				<th style="min-width: 150px;">Dirección</th>
				<th width="20%">Teléfono</th>
				<th style="min-width: 150px;">Actions</th>
			</tr>
		</thead>
		<tbody id="dataBodyC"></tbody>
	</table>

</div>
<div>
	<div class='dropdown dropleft float-left invisible'>
		<button class='btn btn-circle red btn-outline dropdown-toggle'
			title='Modificar' type='button' data-toggle='dropdown'>
			Movimietnos Masivos <span class='caret'></span>
		</button>
		<ul class='dropdown-menu'>
			<li><a onclick='javascript: movMasivos();'>Movimientos
					masivos</a></li>
			<li><a onclick='javascript: fanticipos();'>Anticipos Masivos</a></li>
			<li><a onclick='javascript: contratoMasivos();'>Contratacion
					Masivos</a></li>
			<li><a onclick='javascript: addToGroup();'>Adherir a Grupo</a></li>

		</ul>
	</div>
	<div class="float-right">
		<a id="addWorker" class="btn btn-circle red btn-outline col-md-4">
			<i class="fa fa-plus"></i> Agregar
		</a> <a id="addTest" onclick="javascript: addTest();"
			class="btn btn-circle red btn-outline col-md-8 invisible"> <i
			class="fa fa-plus"></i> Haberes y Descuentos
		</a>
	</div>

</div>


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
</style>
