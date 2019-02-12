<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <h3>Reportes <small>> Comprobantes de Feriados</small></h3>
<div class="col-xs-12 col-sm-12 col-md-12 wwportlet light bordered">
	<div class="col-xs-12 col-sm-12 col-md-2 ">
		<label style="color: #337ab7;">Tipo de reporte:</label>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-2 ">
		<select  name="par" id="cantidad" class="btn blue btn-outline btn-circle btn-sm">
			<option value="">Seleccione...</option>
			<option value="">Completo</option>
			<option value="">Resumido</option>
		</select>
	</div>
</div>

<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	<div class="col-xs-12 col-sm-3 col-md-4">
		
	</div>
	<div class="col-xs-12 col-sm-6 col-md-4 portlet light bordered">
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<label style="color: #337ab7;">Funcionario:</label>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<select  name="par" id="cantidad" class="btn blue btn-outline btn-circle btn-sm">
				<option value="">Seleccione...</option>
			</select>
		</div>
	</div>
	<div class="col-xs-12 col-sm-3 col-md-4">
		
	</div>
</div>

<div style="text-align: center;">
	<a id="addnewWorker" class="btn btn-circle red btn-outline">
		<i class="fa fa-file-text-o"></i> Generar Reporte
	</a>
</div>