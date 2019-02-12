<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<div class="col-xs-12 col-sm-12 portlet" style="width: 100%;">
	<div class="col-xs-12 col-sm-12 portlet" style="width: 100%;">
		<div class="col-xs-12 col-sm-6 col-md-3">
			<label style="color: #337ab7;font-weight: bold">Campo: </label>
			<div style="width: 100%;">
				<select class="form-control input-sm" id="selCampo" onchange="cambioCampo(this)"></select>
			</div>
		</div>
	</div>
	<div class="col-xs-12 col-sm-6 col-md-3">
		<label style="color: #337ab7;font-weight: bold" >Sector: </label>
		<div style="width: 100%;">
			<select class="form-control input-sm" onchange="cambioSector(this)" id="sector"></select>
		</div>
	</div>
	<div class="col-xs-12 col-sm-6 col-md-3">
		<label style="color: #337ab7;font-weight: bold" >Especie: </label>
		<div style="width: 100%;">
			<select class="form-control input-sm" onchange="cambioEspecie(this)" id="especie"></select>
		</div>
	</div>
	<div class="col-xs-12 col-sm-6 col-md-3">
		<label style="color: #337ab7;font-weight: bold" >Variedad: </label>
		<div style="width: 100%;">
			<select class="form-control input-sm" onchange="cambioVariedad(this)" id="variedad"></select>
		</div>
	</div>
</div>
<div class="col-xs-12 col-sm-12 col-md-12"> 
<div class="col-xs-0 col-sm-1 col-md-2"> 
</div>
<div class="col-xs-12 col-sm-10 col-md-8"> 
	<div class="table-responsive">
		<div class="row">
			<div class="col-md-12 col-sm-12">
				<h2 style="    margin: 0;font-size: 13px;padding: 5px;background: #f0f0f0;color: #000;font-family: 'Open Sans', 'Trebuchet MS', arial, sans-serif;border-bottom: 1px solid #eee;cursor: move;" class="h2 ui-sortable-handle" id="pqc">PQC<span class="" column="9"></span></h2>
				

						<div class="row" style="margin-left: 0px;margin-right: 0px;">                                
							<div class="text-center no_selected" >
								<span class="text-bold">PQC Semana <span id="nroSemana"></span></span>
							</div>    
						</div>
						<div class="row overflow">
								<div id="calendarioSemana" class="wtHolder" style="position: relative; width: 100%; height: 230px;">
									
								</div>
						</div>
				
			</div>
		</div>
	</div>
</div>
<div class="col-xs-0 col-sm-1 col-md-2"> 
</div>
<div class="col-xs-0 col-sm-1 col-md-2"> 
</div>
<div class="col-xs-12 col-sm-10 col-md-offset-2 col-md-8"> 
	<div class="table-responsive">
		<div style="text-align: center;" class="">
			<a onclick="javascript: GuardarEstimacion()" class="btn btn-circle green-dark btn-outline submit">
				<i class="icon-cloud-upload"></i> Guardar
			</a>
		</div>
	</div>
</div>
<div class="col-xs-0 col-sm-1 col-md-2"> 
</div>
</div>

<br>
.