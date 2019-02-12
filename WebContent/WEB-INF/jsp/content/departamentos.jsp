<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
    <h3>Maestros <small>> Departamentos</small></h3>
<div id="divDep" class="col-xs-12 col-sm-12">
	<div class="table-responsive">
		<table class="table table-bordered table-hover table-striped table-condensed">
			<thead>
				<th style="text-align: center;">CODIGO</th>
				<th style="text-align: center;">DESCRIPCION</th>
				<th style="text-align: center;">CENTRO DE COSTOS</th>
				<th style="text-align: center; width: 2%;">EDITAR/ELIMINAR</th>
			</thead>
			<tbody id="tblEmpresa">
				<tr>
					<td>001</td>
					<td>Gerencia</td>
					<td>258</td>
					<td>
						<a id="addCierre" title="Modificar" onclick="javascript: editDep(this.id);"class="btn btn-circle yellow btn-outline">
							<i class="fa fa-pencil-square-o fa-lg"></i>
						</a>
						<a id="addCierre" title="Eliminar" class="btn btn-circle red btn-outline">
							<i class="fa fa-trash-o fa-lg"></i>
						</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

<div id="divDep2" style="text-align: center;">
	<a id="addDep" class="btn btn-circle red btn-outline">
		<i class="fa fa-plus"></i> Añadir
	</a>
</div>

<div id="divAdd" class="col-xs-12 col-sm-12" style="display: none;">
	<div class="col-xs-12 col-sm-12 col-md-1 ">
		
	</div>
	<div class="col-xs-12 col-sm-12 col-md-10 portlet light bordered">
	<h4>Agregar Departamento</h4>
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<div class="col-xs-12 col-sm-12 col-md-4 ">
				<label style="color: #337ab7;" for="cantidad"><label style="color: #FF0000;">*</label>Codigo:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-8 ">
				<input type="text" name="exportar" id="depCod" class="form-control blue input-circle">
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<div class="col-xs-12 col-sm-12 col-md-4 ">
				<label style="color: #337ab7;" for="cantidad"><label style="color: #FF0000;">*</label>Descripcion:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-8 ">
				<input type="text" name="exportar" id="depDesc" class="form-control blue input-circle">
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<div class="col-xs-12 col-sm-12 col-md-4 ">
				<label style="color: #337ab7;" for="cantidad"><label style="color: #FF0000;">*</label>Centro de Costo:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-8 ">
				<select id="nacWorker" name="adwork" class="btn btn-circle blue btn-outline">
					<option value="">Seleccione...</option>
					<option value="Chilena">Si</option>
					<option value="Peruana">No</option>
				</select>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<div class="col-xs-12 col-sm-12 col-md-4 ">
				<label style="color: #337ab7;" for="cantidad"><label style="color: #FF0000;">*</label>Codigo Centro de Costos:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-8 ">
				<input type="text" name="exportar" id="depDesc" class="form-control blue input-circle">
			</div>
		</div>
		<br><br><br>
		<div id="divDep2" style="text-align: center;">
			<a id="addNewDep" class="btn btn-circle green btn-outline">
				<i class="fa fa-floppy-o"></i>&nbsp; Guardar
			</a>
			<a id="editDep" class="btn btn-circle green btn-outline">
				<i class="fa fa-refresh"></i>&nbsp; Actualizar
			</a>
			<a id="cancelAdd" class="btn btn-circle red btn-outline">
				<i class="fa fa-times"></i>&nbsp; Cancelar
			</a>
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-1 ">
		
	</div>
</div>

	