<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
  	<div class="col-xs-11 col-sm-11 col-md-11">
		<div class="col-xs-12 col-sm-3 col-md-3 ">
			<label style="color: #337ab7;font-weight: bold;">Campo: </label>
			<div style="width: 100%;">
				<select class="form-control input-md multiple" id="dataHuerto" ></select>
			</div>
		</div>
		<div class="col-xs-12 col-sm-3 col-md-3 ">
			<label style="color: #337ab7;font-weight: bold;">Sector: </label>
			<div style="width: 100%;">
				<select class="form-control input-md multiple" id="sectorFilter" ></select>
			</div>
		</div>
		<div class="col-xs-12 col-sm-3 col-md-3 ">
			<label style="color: #337ab7;font-weight: bold;">Especie: </label>
		<div style="width: 100%;">
				<select class="form-control input-md multiple" id="especieFilter" ></select>
			</div>
		</div>
		<div class="col-xs-12 col-sm-3 col-md-3 ">
			<label style="color: #337ab7;font-weight: bold;">Variedad: </label>
			<div style="width: 100%;">
				<select class="form-control input-md multiple" id="variedadFilter" ></select>
			</div>
		</div>
	</div>
  	<div class="col-xs-1 col-sm-1 col-md-1">
  		<div class="col-xs-12 col-sm-12 col-md-12">
  			<label style="color: #337ab7;font-weight: bold;" >Buscar </label>
  			<div style="width: 100%;">
				<a onclick="loadInfo()" class="btn btn-info">
					<i class="icon-magnifier"></i>
				</a>
			</div>
		</div>
  	</div>
</div>

<div class="table-responsive" id="ignore">
	<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Info">
		<thead>
			<tr>
				<th style="min-width: 200px;">Nombre Sector</th>
				<th style="min-width: 120px;">Especie</th>
				<th style="min-width: 120px;">Variedad</th>
				<th style="min-width: 120px;">Nombre Cuartel</th>
				<th style="min-width: 120px;">Zona</th>
				<th style="min-width: 120px;">Superficie</th>
				<th style="min-width: 120px;">Plantas</th>
				<th style="min-width: 120px;">Tipo Plantas</th>
				<th style="min-width: 120px;">Patron</th>
				<th style="min-width: 120px;">Entre hileras</th>
				<th style="min-width: 120px;">Sobre hileras</th>				
				<th style="min-width: 120px;">Formación</th>			
				<th style="min-width: 120px;">Vivero</th>
				<th style="min-width: 120px;">Tipo Control Heladas</th>
				<th style="min-width: 120px;">Tipo Protección</th>
				<th style="min-width: 120px;">Limitante Suelo</th>
				<th style="min-width: 120px;">Polinizante</th>
				<th style="min-width: 120px;">Tipo Plantación</th>
				<th style="min-width: 120px;">Clon</th>
				<th style="min-width: 120px;">Año Plantación</th>
				<th style="min-width: 130px;">Ceco/Orden Ceo</th>
				<th style="min-width: 120px;">Estado</th>
				
				
				<!--  <th id='exclude' style="width: 2%;">Editar / Guardar</th>-->
			</tr>
		</thead>
		<tbody id="tblInfo"></tbody>
	</table> 
</div>
 <div id="ignore_2" style="text-align: center;">
 	<a id="viewAll" class="btn btn-circle red btn-outline">
		<i class="fa fa-plus"></i> Agregar
	</a>

	<button id="infoExcel" class="btn btn-circle red btn-outline">
		<i class="fa fa-file-excel-o fa-lg"></i> Exportar Excel   
	</button>
<!-- 	<button id="infoExcel" class="btn btn-circle red btn-outline" onclick="javascript:pdf();"> -->
<!-- 		<i class="fa fa fa-file-pdf-o fa-lg"></i> Exportar PDF    -->
<!-- 	</button> -->
	
	
	<!-- <a id="viewAll" onclick="javascript:addMenuTbl(this.id);" class="btn btn-circle red btn-outline">
		<i class="fa fa-plus"> Agregar</i> 
	</a>-->
</div>

<div id="fileArea" style="display: none;"></div>

<div id="dvjson"></div>
<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>
<label style="color: #fff;">.</label>