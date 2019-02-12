<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<h3></h3>
<div class="col-md-12 portlet light bordered">
	<h4>Filtros</h4>

	<div class='row'>
		<div class="col-md-2 ">
			<label style="color: #337ab7;">Cod. Trabajador: </label> <input
				type="text" id="rut" name="rut" required oninput="checkRut(this)"
				placeholder="Ingrese Codigo" class="form-control input-circle">
		</div>


		<div class="col-md-2 ">

			<label style="color: #337ab7;">Periodo: </label> <input type="month"
				name="filLiq" id="periodo" class="form-control input-circle">

		</div>
		<div class="col-md-2 ">
			<a id="buscar" title="Buscar" class="btn btn-circle blue btn-outline"
				style="margin-top: 22px;" onclick="javascript: buscar(this.rut);">
				<i class="fa fa-search"></i> Buscar
			</a>
		</div>
		<div class="col-md-2 ">
			<label style="color: #337ab7;">Fecha Contrato: </label> <select
				name="par" id="idContrato"
				class="btn blue btn-outline btn-circle btn-sm">
				<option value="">Seleccione...</option>

			</select>

		</div>
		<div class="col-md-2 ">

			<a id="addAct"
				class="btn btn-circle red btn-outline" style="margin-top: 22px;">
				<i class="icon-cloud-upload"></i> Generar
			</a>

		</div>
		<div id="liquidacionPDF" class="col-md-2" style="display: none;">
			<a id="generarLiquidacion"
				onclick="javascript: generarLiquidacion();"
				class="btn btn-circle red btn-outline" style="margin-top: 22px;">
				<i class="fa fa-file-pdf-o fa-lg"></i> Generar Documento
			</a>
		</div>

	</div>
</div>

<div class="table-responsive2">
	<p style="text-align: center;">Resultado Busqueda</p>
	<table
		class="table table-bordered table-hover tzable-striped table-condensed dataTable no-footer"
		id="tbl_Info">

		<thead>
			<tr>


				<th style='text-align: center;'>Cód T</th>
				<th style='text-align: center;'>Id Contrato</th>
				<th style='text-align: center;'>Id Concepto</th>
				<th style='text-align: center;'>Descripción</th>
				<th style='text-align: center;'>Valor</th>

			</tr>
		</thead>
		<tbody id="tblPeticion2"></tbody>
	</table>
</div>

