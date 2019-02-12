<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <div class="col-xs-12 col-sm-12 col-md-12">
    	<div class="col-xs-8 col-sm-8 col-md-8">
			<h3>Orden de Reclutamiento</h3>
		</div>
	</div>
	


<div class="col-md-12 portlet light bordered">
		<div class="col-md-12 ">
			<div class="col-md-2">
				<label style="color: #337ab7;" >Cargo: </label>
			</div>
			<div class="col-md-2 ">
				<select id="cargo" class="form-control btn-circle btn-sm mayusculasWork">
				<option value="">Seleccione un Cargo</option>
				</select>
			</div>
			<div class="col-md-2 ">
				<label style="color: #337ab7;" >Posición: </label>
			</div>
			<div class="col-md-2">
				<select id="posicion" class="form-control btn-circle btn-sm mayusculasWork">
				<option value="">Seleccione una Posición</option>
				</select>
			</div>
			<div class="col-md-1">
				<label style="color: #337ab7;" >Obra/Faena</label>
			</div>
			<div class="col-md-3">
				<select id="operacion2" class="form-control btn-circle btn-sm mayusculasWork">
				<option value="">Seleccione una Obra/Faena </option>
					
				</select>
			</div>
			
	</div>
	<div style="margin-top: 40px"></div>
			
		
		
		<div class="col-md-12 ">
			<div class="col-md-2 ">
				<label style="color: #337ab7;" >Cant.Personas:</label>
			</div>
			<div class="col-md-2 ">
				<input type="number" name="ReAct" id="cantidadP" class="form-control input-circle" onkeypress="javascript: seCodigo(event);">
			</div>
			<div class="col-md-2">
				<label style="color: #337ab7;" >Fecha Estimada: </label>
			</div>
			<div class="col-md-2 ">
				<input type="date" id="fechaE" class="form-control input-circle mayusculasWork" onchange="javascript: valDias(this)">
			</div>
			<div class="col-md-2">
				<a id="1" class="btn btn-circle red btn-outline" onclick="javascript: addForm();"><i class="fa fa-plus"></i>
				</a>
			</div>
		</div>
		
		
		
</div>

<div class="table-responsive">
	<table class="table table-bordered table-hover table-striped table-condensed dataTable no-footer" id="tbl_Fito">
		<thead>
			<tr>
				<th style="width: 20%; min-width: 150px;">Cargo</th>
				<th style="width: 15%; min-width: 130px;">Posición</th>
				<th>Obra/Faena</th>
				<th>Cant.Personas</th>
				<th style="min-width: 150px;">Fecha Estimada Inicio Funciones</th>
				<th>eliminar</th>
			</tr>
		</thead>
		<tbody id="tblPeticion"></tbody>
	</table>
</div>

<div style="text-align: center;">
	<a class="btn btn-circle red btn-outline" onclick="javascript: Enviar();">
		<i class="icon-cloud-upload"></i> Enviar
	</a>
</div>  
    
<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>
