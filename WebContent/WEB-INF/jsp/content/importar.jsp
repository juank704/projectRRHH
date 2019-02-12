<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	<h3>Utilitario <small>> Importar Haberes y Descuentos</small></h3>
	<div class="col-xs-12 col-sm-12 col-md-2 ">
		
	</div>
	<div class="col-xs-12 col-sm-12 col-md-8 portlet light bordered">
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label style="color: #337ab7;"><label style="color: #FF0000;">*</label>Tipo de Informacion:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<select name="importar" id="tInfo" class="btn blue btn-outline btn-circle btn-sm">
					<option value="">Seleccione...</option>
				</select>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label style="color: #337ab7;"><label style="color: #FF0000;">*</label>Identificador:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<select name="importar" id="iden" onchange="javascript: selectRut(this.value);" class="btn blue btn-outline btn-circle btn-sm"></select>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label style="color: #337ab7;"><label style="color: #FF0000;">*</label>Archivo:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label for="fileImport" class="btn btn-circle blue btn-outline"><i class="fa fa-cloud-upload"></i> Subir Archivo</label>
				<input id="fileImport" type="file" style="display:none">
			</div>
			<div class="col-xs-12 col-sm-12 col-md-12 ">
				<label id="fImport" >Ningun archivo seleccionado</label>
				<a id="desFiles" title="Descartar Arhivo" onclick="javascript: desFiles();" style="display: none;">
					<i class="fa fa-times"></i>
				</a>
			</div>
		</div>
		<br><br><br><br><br>
		<div style="text-align: center;" class="col-xs-12 col-sm-12 col-md-12 ">
			<a id="btnAndes" class="btn btn-circle red btn-outline">
				<i class="fa fa-cloud-upload"></i> Importar
			</a>
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-2 ">
		
	</div>
</div>