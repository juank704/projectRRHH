<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
	
<div class="col-xs-12 col-sm-12 col-md-12 portlet" style="display: none;">	
<div class="col-xs-6 col-sm-6 col-md-6 portlet light bordered" style="width: 500px;" >
	<div class="col-xs-12 col-sm-12 col-md-12">
		<label style="color: #337ab7;font-weight: bold">Fecha:</label>
		<input id="BoxFecha" type="text" name="fecha" class="form-control" readonly  placeholder="Seleccione Fecha">
	</div>
	<div class="col-xs-12 col-sm-12 col-md-12">
		<label style="color: #337ab7;font-weight: bold">Tipo de Servicio:</label>
		<select id="BoxServicio" class="form-control input-sm">
			<option value="" disabled selected hidden="">Seleccione</option>
			<option value=1>Servicio 1</option>
			<option value=2>Servicio 2</option>
			<option value=3>Servicio 3</option>
		</select>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-12">
		<label style="color: #337ab7;font-weight: bold">Horómetro</label>
		<input id="BoxHorometro" class="form-control" placeholder="Ingrese Horómetro">
	</div>
</div>
</div>

	<div class="table-responsive" id="Div_TableServicio">
		<table class="table table-bordered table-hover table-striped table-condensed" id="Table_Servicio">
			<thead>  
			      <tr>        
					<th class="text-center">Fecha</th>
					<th class="text-center">Campo</th>
					<th class="text-center">Maquina</th>
					<th class="text-center">Tipo Servicio</th>					
	                <th class="text-center">Horómetro</th>
					<th class="text-center" style="width: 4%">Recepcionar</th>
                </tr>
			</thead>
			
			<tbody id="BodyServicio"></tbody>

		</table>
	</div>
	
	
<div style="text-align: center;">
	<a id="Guardar" onclick="javascript: PopUP()" class="btn btn-circle red btn-outline">
		<i class="icon-cloud-upload"></i> Agregar
	</a>
</div>
<div id="fileArea" style="display: none;"></div>

<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>