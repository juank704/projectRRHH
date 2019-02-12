<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	<h3>Reportes <small>> Liquidaciones de Sueldo</small></h3>
	<div class="col-xs-12 col-sm-12 col-md-1 ">
		
	</div>
	<div class="col-xs-12 col-sm-12 col-md-10 portlet light bordered">
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label style="color: #337ab7;" for="cantidad"><label style="color: #FF0000;">*</label>Periodo:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<input type="month"  name="exportar" id="cantidad" class="btn blue btn-outline btn-circle btn-sm">
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label style="color: #337ab7;" for="cantidad"><label style="color: #FF0000;">*</label>Universo:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<select name="exportar" id="cantidad" class="btn blue btn-outline btn-circle btn-sm"">
					<option value="">Seleccione...</option>
				</select>
			</div>
		</div>
		<br><br>
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label style="color: #337ab7;" for="cantidad"><label style="color: #FF0000;">*</label>Formato Liquidacion:</label>
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
				<label style="color: #337ab7;" for="cantidad"><label style="color: #FF0000;">*</label>Informacion Adicional:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label for="adInfo" class="btn btn-circle blue btn-outline">
					<i class="fa fa-cloud-upload"></i> Archivo
				</label>
				<input type="file" id="adInfo" style="display: none;">
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label style="color: #337ab7;" for="cantidad"><label style="color: #FF0000;">*</label>Fecha de Pago:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<input type="date" name="exportar" id="cantidad" class="btn blue btn-outline btn-circle btn-sm">
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label style="color: #337ab7;" for="cantidad"><label style="color: #FF0000;">*</label>Ordenado Por:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<select  name="exportar" id="cantidad" class="btn blue btn-outline btn-circle btn-sm">
					<option value="">Seleccione...</option>
				</select>
			</div>
		</div>
		
		<div style="text-align: center;" class="col-xs-12 col-sm-12 col-md-12 ">
		<br>
			<a id="addnewWorker" class="btn btn-circle red btn-outline">
				<i class="fa fa-file-text-o"></i> Generar Reporte
			</a>
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-1 ">
		
	</div>
</div>