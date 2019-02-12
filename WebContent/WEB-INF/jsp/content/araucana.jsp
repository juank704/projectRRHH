<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	<h3>Utilitario <small>> Archivo Caja la Araucana</small></h3>
	<div class="col-xs-12 col-sm-12 col-md-1 ">
		
	</div>
	<div class="col-xs-12 col-sm-12 col-md-10 portlet light bordered">
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label style="color: #337ab7;" ><label style="color: #FF0000;">*</label>Periodo:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<input name="araucana" type="month" id="araPer" class="btn blue btn-outline btn-circle btn-sm">
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label style="color: #337ab7;" ><label style="color: #FF0000;">*</label>Utilizar Codigo de Depto. como Codigo de Sucursal:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<select name="araucana" id="usCod" class="btn blue btn-outline btn-circle btn-sm">
					<option value="3">Seleccione...</option>
					<option value="1">Si</option>
					<option value="2">No</option>
				</select>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label style="color: #337ab7;" ><label style="color: #FF0000;">*</label>Tipo de Archivo:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<select  name="araucana" id="cantidad" class="btn blue btn-outline btn-circle btn-sm">
					<option value="">Seleccione...</option>
				</select>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label style="color: #337ab7;" ><label style="color: #FF0000;">*</label>Codigo de Sucursal:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<input type="text" name="araucana" id="codSu" class="form-control input-circle blue" disabled>
			</div>
		</div>
		<br><br><br><br><br>
		<div style="text-align: center;" class="col-xs-12 col-sm-12 col-md-12 ">
			<a id="btnAraucana" class="btn btn-circle red btn-outline">
				<i class="icon-layers"></i> Generar
			</a>
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-1 ">
		
	</div>
</div>