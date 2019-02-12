<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	<h3>Utilitario <small>> Exportar</small></h3>
	<div class="col-xs-12 col-sm-12 col-md-1 ">
		
	</div>
	<div class="col-xs-12 col-sm-12 col-md-10 portlet light bordered">
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label style="color: #337ab7;" ><label style="color: #FF0000;">*</label>Tipo de Informacion:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<select name="exportar" id="cantidad" class="btn blue btn-outline btn-circle btn-sm">
					<option value="">Seleccione...</option>
				</select>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label style="color: #337ab7;" ><label style="color: #FF0000;">*</label>Periodo:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<input name="exportar" type="month" id="cantidad" class="btn blue btn-outline btn-circle btn-sm"">
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label style="color: #337ab7;" ><label style="color: #FF0000;">*</label>Desglosar AFP:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<select  name="exportar" id="cantidad" class="btn blue btn-outline btn-circle btn-sm">
					<option value="">Seleccione...</option>
					<option value="1">Si</option>
					<option value="2">No</option>
				</select>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label style="color: #337ab7;" ><label style="color: #FF0000;">*</label>Desglosar ISAPRE:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<select  name="exportar" id="cantidad" class="btn blue btn-outline btn-circle btn-sm">
					<option value="">Seleccione...</option>
					<option value="1">Si</option>
					<option value="2">No</option>
				</select>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label style="color: #337ab7;" ><label style="color: #FF0000;">*</label>Desglosar	Otros Descuentos:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<select  name="exportar" id="cantidad" class="btn blue btn-outline btn-circle btn-sm">
					<option value="">Seleccione...</option>
					<option value="1">Si</option>
					<option value="2">No</option>
				</select>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label style="color: #337ab7;" ><label style="color: #FF0000;">*</label>Desglosar Haberes:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<select  name="exportar" id="cantidad" class="btn blue btn-outline btn-circle btn-sm">
					<option value="">Seleccione...</option>
					<option value="1">Si</option>
					<option value="2">No</option>
				</select>
			</div>
		</div>
		
		<div style="text-align: center;" class="col-xs-12 col-sm-12 col-md-12 ">
		<br>
			<a id="btnExportar" class="btn btn-circle red btn-outline">
				<i class="fa fa-cloud-download"></i> Exportar
			</a>
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-1 ">
		
	</div>
</div>