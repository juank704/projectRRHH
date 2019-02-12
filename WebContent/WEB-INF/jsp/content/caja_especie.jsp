<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	<h4>Filtros</h4>
	<div class="col-xs-12 col-sm-3 col-md-3 ">
		<label style="color: #337ab7;" >Campo: </label>
		<div style="width: 100%;">
			<select class="form-control input-sm " id="BoxCampo"></select>
		</div>
	</div>
</div>

<div class="table-responsive" id="Div_CajaEspecie">
	<table class="table table-bordered table-hover table-striped table-condensed" id="Table_CajaEspecie">
		<thead>
			<tr>
				<th style="min-width: 130px;">Especie</th>
<!-- 				<th style="min-width: 130px;">Peso</th>		 -->
			</tr>
		</thead>
		<tbody id="BodyCajaEspecie"></tbody>
	</table> 
</div>
 <div id="ignore_2" style="text-align: center;">
	<button id="BT_Buscar" class="btn btn-circle green btn-outline" onclick="loadInfo();">
		<i class="glyphicon glyphicon-search"></i> Buscar   
	</button>	
</div>

<div id="fileArea" style="display: none;"></div>

<div id="dvjson"></div>
<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>
<label style="color: #fff;">.</label>