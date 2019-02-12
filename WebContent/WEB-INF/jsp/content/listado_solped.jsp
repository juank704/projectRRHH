<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
 <div class="col-xs-12 col-sm-12 col-md-12">
	<div class="col-xs-12 col-sm-12 col-md-12 portlet">
		<div class="col-xs-12 col-sm-3 col-md-3 ">
			<label style="color: #337ab7;" >Campo: </label>
			<select class="form-control input-sm" id="dataHuerto"  ></select>
		</div>
		<div class="col-xs-12 col-sm-2 col-md-2">
			<br>
			<button id="ver" class="btn blue">Listar
			</button>
		</div>
	</div>
</div>

<!--  <div class="table-responsive" id="ignore">-->
<div class="table-scrollable">
	<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_ListaRendimiento">
		<thead>
			<tr>
				<th style=" min-width: 100px;">Solped</th>
				<th>Creada por</th>
				<th>Fecha Creación</th>
				<th>Material</th>
				<th>Centro</th>
				<th>Almacen</th>
				<th>Grupo Material</th>
				<th>Cantidad</th>
				<th>Unidad</th>
				<th>Fecha entrega</th>
				<th>Programa</th>
			</tr>
		</thead>
		<tbody id="tblListaRendiemiento"></tbody>
	</table> 
</div>


<div id="fileArea" style="display: none;"></div>

<article id="loading" class="loading_dos" style="display: none;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>