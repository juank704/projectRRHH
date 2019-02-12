<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	<h3>Agregar Movimiento de Personal</h3>
	<div class="col-xs-12 col-sm-12 col-md-1 ">
		
	</div>
	<div class="col-xs-12 col-sm-12 col-md-10 portlet light bordered">
		<div class="col-xs-12 col-sm-12 col-md-6 " id="div_funcionario" style="display: none;">
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label style="color: #337ab7;" ><label style="color: #FF0000;">*</label>Funcionario:</label>
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
				<label style="color: #337ab7;" ><label style="color: #FF0000;">*</label>Tipo de Movimiento:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<select  name="exportar" id="cantidad" class="btn blue btn-outline btn-circle btn-sm">
					<option value="">AFP</option>
				</select>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label style="color: #337ab7;" ><label style="color: #FF0000;">*</label>Evento:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<select  name="exportar" id="cantidad" class="btn blue btn-outline btn-circle btn-sm">
					<option value="">Contratacion a plazo fijo</option>
				</select>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label style="color: #337ab7;" ><label style="color: #FF0000;">*</label>Fecha Inicio:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<input name="exportar" type="date" id="cantidad" class="btn blue btn-outline btn-circle btn-sm"">
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label style="color: #337ab7;" ><label style="color: #FF0000;">*</label>Fecha Termino:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<input name="exportar" type="date" id="cantidad" class="btn blue btn-outline btn-circle btn-sm"">
			</div>
		</div>
		
		<div style="text-align: center;" class="col-xs-12 col-sm-12 col-md-12 ">
		<br>
			<a id="btnExportar" class="btn btn-circle red btn-outline">
				<i class="icon-cloud-upload"></i> Agregar
			</a>
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-1 ">
		
	</div>
</div>