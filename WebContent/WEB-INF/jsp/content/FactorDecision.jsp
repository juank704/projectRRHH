<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <div class="col-xs-12 col-sm-12 portlet light bordered" style="width: 100%;">
    	<h4>Filtros</h4>
    	<div class="col-xs-3 col-sm-3 col-md-3">
    		<h5>Campo</h5>
    		<div style="width: 100%;">
				<select id="filtroCampo" class="form-control input-sm" style="float: right;"></select>
			</div>
		</div>
		<div class="col-xs-3 col-sm-3 col-md-3">
    		<h5>Equipo/Bomba</h5>
    		<div style="width: 100%;">
				<select id="filtroEquipo" class="form-control input-sm" style="float: right;"></select>
			</div>
		</div>
<!--     	<div class="col-xs-3 col-sm-3 col-md-3"> -->
<!--     		<h5>Bloque</h5> -->
<!--     		<div style="width: 100%;"> -->
<!-- 				<select id="filtroBloque" class="form-control input-sm" style="float: right;"></select> -->
<!-- 			</div> -->
<!-- 		</div> -->
    </div>
	<div class="table-responsive" id="ignore">
	<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Info">
		<thead>
			<tr>
				<th style="min-width: 120px;">Bloque</th>
				<th style="min-width: 120px;">Enero</th>
				<th style="min-width: 120px;">Febreo</th>
				<th style="min-width: 120px;">Marzo</th>
				<th style="min-width: 120px;">Abril</th>
				<th style="min-width: 120px;">Mayo</th>
				<th style="min-width: 120px;">Junio</th>
				<th style="min-width: 120px;">Julio</th>
				<th style="min-width: 120px;">Agosto</th>
				<th style="min-width: 120px;">Septiembre</th>
				<th style="min-width: 120px;">Octubre</th>
				<th style="min-width: 120px;">Noviembre</th>
				<th style="min-width: 120px;">Diciembre</th>			
				<th id='exclude' style="width: 2%;">Editar / Guardar</th>
			</tr>
		</thead>
		<tbody id="tblInfo"></tbody>
	</table> 
</div>
<!--  <div id="ignore_2" style="text-align: center;"> -->
<!--  	<a id="viewAll" class="btn btn-circle red btn-outline"> -->
<!-- 		<i class="fa fa-plus"></i> Guardar -->
<!-- 	</a> -->
<!-- </div> -->
	


<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>