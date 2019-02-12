<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<div class="col-xs-12 col-sm-12 portlet light bordered" style="width: 100%;">
  	<div class="col-xs-12 col-sm-6 col-md-3">
		<label style="color: #337ab7;font-weight: bold">Campo: </label>
		<div style="width: 100%;">
			<select class="form-control input-sm" id="selCampo"></select>
		</div>
	</div>
	<div class="col-xs-12 col-sm-6 col-md-3">
		<label style="color: #337ab7;font-weight: bold" >Especie: </label>
		<div style="width: 100%;">
			<select class="form-control input-sm" onchange="cambioEspecie(this)" id="especie"></select>
		</div>
	</div>
</div>
<div class="col-xs-12 col-sm-12 portlet light bordered" style="width: 100%;">
	<div class="col-xs-12 col-sm-6 col-md-3">
		<div class="form-group row">
    		<label style="color: #C70039;font-weight: bold" for="staticEmail" class="col-sm-2 col-form-label">Has:</label>
    		<div class="col-sm-10">
      			<label for="staticEmail">Hectareas por Cuartel</label>
    		</div>
  		</div>
	</div>
	<div class="col-xs-12 col-sm-6 col-md-3">
		<div class="form-group row">
    		<label style="color: #C70039;font-weight: bold" for="staticEmail" class="col-sm-2 col-form-label">PH:</label>
    		<div class="col-sm-10">
      			<label for="staticEmail" >Plantas por Hectareas:</label>
    		</div>
  		</div>
	</div>
</div>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light">
	<div class="table-responsive">
		<div class="table-scrollable">
			<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Param">
				<thead>
					<tr>
						<th>Identificador</th>
						<th style="min-width: 250px; max-width: 250px;">Tipo</th>
						<th>Descipción *</th>
						<th>Formula</th>
						<th style="width: 5%;" colspan="2">Opciones</th>
					</tr>
				</thead>
				<tbody id="body_Param">
<!-- 					<tr id="kghas"> -->
<!-- 						<td><input type="text" value="KGHAS" id="id0" class="form-control" disabled></td> -->
<!-- 						<td style="min-width: 250px; max-width: 250px;"><select class='form-control input-sm param0' disabled id='tipo0'><option value="4">Formuula</option></select></td> -->
<!-- 						<td><input type="text" value="KILOS/HECTAREAS" id="descripcion0" class="form-control" disabled></td> -->
<!-- 						<td><input value='' type='text' class='form-control param0' id='formula0'></td> -->
<!-- 						<td><button title='Guardar' style='display: block;' onclick='addParam(0);' class='btn green-dark btn-outline btn-sm param-button-0'><i class='icon-cloud-upload' aria-hidden='true'></i></button></td> -->
<!-- 						<td></td> -->
<!-- 					</tr> -->
				</tbody>
				<tfoot>
					<tr>
						<th></th>
						<th style="min-width: 250px; max-width: 250px;"></th>
						<th></th>
						<th></th>
						<th style="width: 5%;" colspan="2"><a class="btn btn-circle red btn-outline btn-sm" onclick="sumParam()"><i class="fa fa-plus"></i></a></th>
					</tr>
				</tfoot>
			</table>
		</div>
	</div>
<!-- 	<div style="text-align: center;" class=""> -->
<!-- 		<a onclick="javascript: asignarRendimiento()" class="btn btn-circle green-dark btn-outline"> -->
<!-- 			<i class="icon-cloud-upload"></i> Agregar Rendimiento Diario -->
<!-- 		</a> -->
<!-- 		<button id="recRendimiento" onclick="javascript: rechazar();" class="btn btn-circle red btn-outline"> -->
<!-- 			<i class="fa fa-times"></i> Rechazar  -->
<!-- 		</button> -->
<!-- 	</div> -->
</div>
.