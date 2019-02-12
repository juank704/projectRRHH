<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <div class="col-xs-12 col-sm-12 col-md-12">
    	<div class="col-xs-12 col-sm-4 col-md-4">
			<h3>Programa Aplicaciones</h3>
		</div>
		
	</div>
	
<div class="col-xs-12 col-sm-12 col-md-12">
	<div class="col-xs-12 col-sm-12 col-md-12 portlet">
		<div class="col-xs-12 col-sm-12 col-md-3 ">
			<label style="color: #337ab7;" >Campo: </label>
			<select id="dataHuerto" class="form-control2 input-sm2" style="width: 280px;" >
			</select>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-2 ">
			<label style="color: #337ab7;" >Temporada: </label>
			<select id="temporada" class="form-control2 input-sm2" style="width:150px" disabled>
				<option value="0" selected>2018/2019</option>
			</select>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-2 ">
			<label style="color: #337ab7;" >Fecha Desde: </label>
			<input type="text" name="fecha" id="fechaDesde" readonly class="form-control " onchange="javascript: valDias(this)">
		</div>	
		<div class="col-xs-12 col-sm-4 col-md-2 ">
			<label style="color: #337ab7;" >Fecha Hasta: </label>
			<input type="text" name="fecha" id="fechaHasta" readonly class="form-control " onchange="javascript: valDias(this)">
		</div>	
		<div class="col-xs-12 col-sm-3 col-md-2">
			<br>
			<button id="listar" class="btn blue">Listar
			</button>
		</div>	
	</div>
</div>

<div style="text-align: right;">
	<a id="1" class="btn btn-circle red btn-outline" onclick="javascript: addMenuTbl(this.id);">
		<i class="fa fa-plus"></i>
	</a>
</div>
<div class="table-responsive">
	<table class="table table-bordered table-striped table-condensed dataTable no-footer" id="tbl_Fito">
		<thead>
			<tr>
				<th>N°</th>
				<th>N° Orden</th>
				<th style="width: 15%; min-width: 130px;">Fecha Programa</th>
				<th>Especie</th>
				<th>Variedad</th>
				<th>Cuartel</th>
				<th>Estado Fenológico</th>
				<th>Programa Aplicación</th>				
				<th>Mojamiento</th> 
				<th>Material</th>
				<th>Tipo Control</th>
				<th style="min-width: 130px;">Fecha Alerta</th>
				<th style="min-width: 200px;">Observacion</th>
				<th>Libro Campo</th>
				<th style="min-width: 150px;">Generar Orden</th>
			</tr>
		</thead>
		<tbody id="tblInfo">
		</tbody>
	</table>
</div>


<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>
<!--  <div style="text-align: center;">
	<a class="btn btn-circle red btn-outline" onclick="javascript: redirect();">
		<i class="icon-cloud-upload"></i> Enviar
	</a>
</div>-->