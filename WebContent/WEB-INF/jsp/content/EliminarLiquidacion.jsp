<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
 <div class="col-md-12" style="margin-top: 10px;">
	<div class="col-md-1 ">
		<label style="color: #337ab7;">Empresa:</label>
	</div>
	<div class="col-md-4 ">
		<select id="Sociedad" class=" form-control btn-circle btn-sm mayusculasWork" >
			<option value="">Seleccione una Empresa</option>
		</select>
	</div>
</div>   

<div class='col-md-12 portlet light bordered' id='todo' style='margin-top: 10px'>
	<div class="col-md-12 ">
	   <div class="col-md-1">
	      <label style="color: #337ab7;">Huerto: </label>
	   </div>
	   <div class="col-md-3">
	      <select id="tipodivisionB" class=" form-control btn-circle btn-sm mayusculasWork" >
	         <option value="">Seleccione Huerto</option>
	      </select>
	   </div>
	   <div class="col-md-1">
	      <label style="color: #337ab7;">Zona: </label>
	   </div>
	   <div class="col-md-3">
	      <select id="tiposubdivisionB" class=" form-control btn-circle btn-sm mayusculasWork" >
	         <option value="">Seleccione ZONA</option>
	      </select>
	   </div>
	   <div class="col-md-1">
	      <label style="color: #337ab7;">CECO: </label>
	   </div>
	   <div class="col-md-3">
	      <select id="listagrupoB" class=" form-control btn-circle btn-sm mayusculasWork">
	         <option value="">Seleccione CECO</option>
	      </select>
	   </div>
	</div>
	<div class="col-md-12" style="margin-top: 10px">
	
	<div class="col-md-1">
		<label style="color: #337ab7;">Mes de Periodo: </label>
	</div>
	<div class="col-md-3">	
		<input type="month" name="filLiq" id="periodo" class="form-control input-circle mayusculasWork">
	</div>
		
				
	
</div>
<div class="col-md-12" style="margin-top: 10px">
	
	<div class="col-md-1 ">
		<label style="color: #337ab7;">Código Trabajador: </label>
	</div>
	<div class="col-md-6">
		<select id="CodigoTra" class="form-control input-sm input-circle mayusculasWork">
			<option value="">Buscar</option>
		</select>
	</div>
	<div class="col-md-1">
			<label style="color: #337ab7;">Fecha Contrato: </label>
	</div>
	<div class="col-md-3 ">
		<select id="idContrato" class=" form-control btn-circle btn-sm mayusculasWork"></select>
	</div>		
	<div class="col-md-1">
		<button title="Buscar" id="1" onclick="buscar();" class="btn btn-circle blue btn-outline btn-sm">
			<i class="fa fa-search"></i>
		</button>
	</div>
</div>
</div>

 <div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	
		<div style="height: 50px;"></div>
		<div class="table-responsive" id="ignore">
			<table class="table table-bordered table-hover table-striped table-condensed col-md-12" id="loadTabla" >
				<thead>
					<tr>
						
						<th>Periodo</th>
						<th>Cód.<br> Trabajador</th>
						<th>Nombre</th>
						<th>Fecha Pago</th>
						<th>Total Pago</th>
						<th>Opciones</th>
						
					</tr>
				</thead>
				<tbody id="tablePreselect"></tbody>
			</table>
		</div>
		<br>	
</div>
<p style="color:white">.</p>
<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>