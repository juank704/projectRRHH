<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<h3>Reportes <small>> Haberes y Descuentos Fijos</small></h3>

<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	<div class="col-xs-12 col-sm-12 col-md-2">
		
	</div>
	<div class="col-xs-12 col-sm-12 col-md-8 portlet light bordered">
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label style="color: #337ab7;"><label style="color: #FF0000;">*</label>Periodo Involucrado:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<input type="month" name="importar" id="pInvo" class="btn blue btn-outline btn-circle btn-sm">
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label style="color: #337ab7;"><label style="color: #FF0000;">*</label>Formato:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<select name="importar" id="iden" class="btn blue btn-outline btn-circle btn-sm">
					<option value="">Seleccione...</option>
				</select>
			</div>
		</div>
		<br><br>
		<div style="text-align: center;" class="col-xs-12 col-sm-12 col-md-12 ">
			<a id="btnAndes" class="btn btn-circle red btn-outline">
				<i class="fa fa-file-text-o"></i> Generar Reporte
			</a>
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-4">
		
	</div>
</div>