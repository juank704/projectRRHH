<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
    <h3>Utilitario <small>> Cierre de Periodo</small></h3>
<div id="divFiltro" class="col-xs-12 col-sm-12">
	<div class="col-xs-12 col-sm-6 col-md-6 portlet light bordered">
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<label style="color: #337ab7;">Año: </label>
			<select  name="par" id="cantidad" class="btn blue btn-outline btn-circle btn-sm">
				<option value="">Seleccione...</option>
				<option value="">2009</option>
				<option value="">2010</option>
				<option value="">2011</option>
				<option value="">2012</option>
				<option value="">2013</option>
				<option value="">2014</option>
				<option value="">2015</option>
				<option value="">2016</option>
				<option value="">2017</option>
			</select>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			
		</div>
	</div>
</div> 
<div id="divCierre" class="col-xs-12 col-sm-12">
	<div class="table-responsive">
		<table class="table table-bordered table-hover table-striped table-condensed">
			<thead>
				<th style="text-align: center; width: 33%;">MES</th>
				<th style="text-align: center;">AÑO</th>
				<th style="text-align: center; width: 33%;">Liquidaciones de Sueldo</th>
			</thead>
			<tbody id="tblCierre"></tbody>
		</table>
	</div>
</div>

<div id="divCierre2" style="text-align: center;">
	<a id="addCierre" class="btn btn-circle red btn-outline">
		<i class="fa fa-plus"></i> Cerrar Periodo 
	</a>
</div>

<div id="divAddCierre" class="col-xs-12 col-sm-12 portlet light bordered" style="display: none;">
	<div class="col-xs-12 col-sm-12 col-md-3 ">
		
	</div>
	<div class="col-xs-12 col-sm-12 col-md-6 portlet light bordered">
	<h4>Agregar Periodo Bloqueado</h4>
		<div class="col-xs-6 col-sm-6 col-md-6 ">
			<label style="color: #337ab7;"><label style="color: #FF0000;">*</label>Periodo:</label>
		</div>
		<div class="col-xs-6 col-sm-6 col-md-6">
			<input type="month" id="pCierre" class="btn blue btn-outline btn-circle btn-sm">
		</div>
		<br><br><br>
		<div id="divDep2" style="text-align: center;">
			<a id="addNewCierre" class="btn btn-circle green btn-outline">
				<i class="fa fa-plus"></i> Cerrar
			</a>
			<a id="cancelAddCierre" class="btn btn-circle red btn-outline">
				<i class="fa fa-times"></i> Cancelar
			</a>
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-3 ">
		
	</div>
</div>
