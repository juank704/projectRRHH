<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	<h3>Utilitario <small>> Archivo de pago Automatico de Remuneraciones</small></h3>
	<div class="col-xs-12 col-sm-12 col-md-1 ">
		
	</div>
	<div class="col-xs-12 col-sm-12 col-md-10 portlet light bordered">
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label style="color: #337ab7;"><label style="color: #FF0000;">*</label>Periodo:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<input  name="par" type="month" id="cantidad" class="btn blue btn-outline btn-circle btn-sm">
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label style="color: #337ab7;"><label style="color: #FF0000;">*</label>Dia de Pago:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<input  name="par" type="date" id="cantidad" class="btn blue btn-outline btn-circle btn-sm">
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label style="color: #337ab7;"><label style="color: #FF0000;">*</label>Tipo de Archivo:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<select  name="par" id="cantidad" class="btn blue btn-outline btn-circle btn-sm">
					<option value="">Seleccione...</option>
				</select>
			</div>
		</div>
		<br><br><br><br>
		<div style="text-align: center;" class="col-xs-12 col-sm-12 col-md-12 ">
			<a id="btnPar" class="btn btn-circle red btn-outline">
				<i class="icon-layers 	"></i> Generar
			</a>
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-1 ">
		
	</div>
</div>