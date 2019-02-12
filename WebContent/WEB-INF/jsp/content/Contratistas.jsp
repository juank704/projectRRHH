<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div class="float-right">
	<a id="addWorker" class="btn btn-circle red btn-outline col-md-4">
		<i class="fa fa-plus"></i> Agregar
	</a> <a id="addTest" onclick="javascript: addTest();"
		class="btn btn-circle red btn-outline col-md-8 invisible"> <i
		class="fa fa-plus"></i> Haberes y Descuentos
	</a>
</div>
<div class="col-md-12">

	<table
		class="table table-striped table-bordered table-hover table-checkable"
		id="datatable_ajax">
		<thead>
			<!-- <div class="col-md-12">
				<div class="col-md-offset-5">
					<label>Buscar por Rut: <input id="buscador_rut" class="form-control input-small input-inline" type="text"></label>
				</div>
			</div> -->
			<tr role="row" class="heading">
				<th style="width: 2%;"><input
					style="margin-left: auto; margin-right: auto;" type='checkbox'
					title='Seleccionar Todo' id='checkAll'
					onchange='javascript: selectALL(this);' class='checkbox' /></th>
				<th style="width: 2%;">Codigo</th>
				<th style="min-width: 150px;">Rut</th>
				<th width="20%">Nombre</th>
				<th width="20%">telefono</th>
				<th width="20%">celular</th>
				<th style="min-width: 150px;">email</th>
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


td {
	text-transform: uppercase
}
</style>










