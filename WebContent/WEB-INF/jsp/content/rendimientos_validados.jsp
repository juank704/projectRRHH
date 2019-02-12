<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
 <div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
  	<div class="col-xs-11 col-sm-11 col-md-11">
		<div class="col-xs-12 col-sm-6 col-md-3">
			<label style="color: #337ab7;font-weight: bold;" >Tipo: </label>
			<div style="width: 100%;">
				<select class="form-control input-sm" id="tipo">
					<option value='1'>MASIVO</option>
					<option value='2'>INDIVIDUAL</option>
				</select>
			</div>
		</div>
		<div class="col-xs-12 col-sm-6 col-md-3">
			<label style="color: #337ab7;font-weight: bold;" >Campo: </label>
			<div style="width: 100%;">
				<select class="form-control input-sm" id="dataHuerto"></select>
			</div>
		</div>
		<div class="col-xs-12 col-sm-6 col-md-3">
			<label style="color: #337ab7;font-weight: bold;" >Fecha Desde: </label>
			<div style="width: 100%;">
				<input type="text" readonly name="fecha" class="form-control" id="fecha">
			</div>
		</div>
		<div class="col-xs-12 col-sm-6 col-md-3">
			<label style="color: #337ab7;font-weight: bold;" >Fecha Hasta: </label>
			<div style="width: 100%;">
				<input type="text" readonly name="fecha" class="form-control" id="fecha_hasta">
			</div>
		</div>
	</div>
  	<div class="col-xs-1 col-sm-1 col-md-1">
  		<div class="col-xs-12 col-sm-12 col-md-12">
  			<label style="color: #337ab7;font-weight: bold;" >Buscar </label>
  			<div style="width: 100%;">
				<a onclick="buscar()" class="btn btn-info">
					<i class="icon-magnifier"></i>
				</a>
			</div>
		</div>
  	</div>
</div>
<div class="table-responsive" id="ignore">
	<table class="table table-bordered table-hovertable-striped  table-condensed nowrap" id="tbl_RendimientoVlidadr"></table> 
</div>
<!-- <div style="text-align: center;" class=""> -->
<!-- 	<a onclick="javascript: validateRendimientos()" class="btn btn-success"> -->
<!-- 		<i class="icon-cloud-upload"></i> Validar Rendimientos Seleccionados -->
<!-- 	</a> -->
<!-- </div> -->


<div id="fileArea" style="display: none;"></div>

