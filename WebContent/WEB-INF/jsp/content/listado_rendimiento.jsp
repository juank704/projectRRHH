<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
    
<div class="col-xs-12 col-sm-12 col-md-12">
	<div class="col-xs-12 col-sm-12 col-md-12 portlet">
		<div class="col-xs-12 col-sm-3 col-md-3 ">
			<label style="color: #337ab7;font-weight: bold" >Campo: </label>
			<select class="form-control input-md multiple" id="BoxCampo" onchange="cambioCampo(this.value)" style="width: 280px;">
				<option value=''></option>
				<option value='0'>Todos</option>
				<c:if test="${not empty actualSesion}">
					<c:forEach items="${actualSesion.campo}" var="campo">
						<option value="${campo.campo}">${campo.descripcion}</option>
					</c:forEach>
				</c:if>
			</select>
		</div>
		<div class="col-xs-12 col-sm-3 col-md-3 ">
			<label style="color: #337ab7;font-weight: bold">Fecha Desde:</label>
			<input id="BoxFecha" type="text" name="fecha" class="form-control" onchange="" readonly placeholder="dd-mm-aa">
		</div>
		<div class="col-xs-12 col-sm-3 col-md-3 ">
			<label style="color: #337ab7;font-weight: bold">Fecha Hasta:</label>
			<input id="BoxFecha2" type="text" name="fecha" class="form-control" onchange="" readonly placeholder="dd-mm-aa">
		</div>	
		<div class="col-xs-12 col-sm-3 col-md-3 ">
			<label style="color: #337ab7;font-weight: bold" >Tipo Trabajador: </label>
			<select class="form-control input-sm" id="tipoTrabajador" onchange="" style="width: 280px;">
				<option value='0'>Todos</option>
				<option value='1'>Propios</option>
				<option value='2'>Contratista</option>
			</select>
		</div>	
	</div>
	<div class="col-xs-12 col-sm-12 col-md-12 portlet">
		<div class="col-xs-12 col-sm-3 col-md-3 ">
			<label style="color: #337ab7;font-weight: bold">Contratista:</label>
			<select class="form-control input-sm" id="contratista" disabled onchange="" style="width: 280px;"></select>
		</div>
		<div class="col-xs-12 col-sm-3 col-md-3 ">
			<label style="color: #337ab7;font-weight: bold">Trabajador:</label>
			<select class="form-control input-sm" id="BoxTrabajador" onchange="" style="width: 280px;"></select>
		</div>
		<div class="col-xs-12 col-sm-3 col-md-3">
			<label style="color: #337ab7;font-weight: bold">Especie:</label>
			<select id="BoxEspecie" class="form-control input-sm" onchange="cambioEspecie()" style="width: 280px;"></select>
		</div>
		<div class="col-xs-12 col-sm-3 col-md-3">
			<label style="color: #337ab7;font-weight: bold">Variedad:</label>
			<select id="BoxVariedad" class="form-control input-sm " onchange="cambioVariedad()" style="width: 280px;" ></select>
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-12 portlet">
		<div class="col-xs-12 col-sm-3 col-md-3">
			<label style="color: #337ab7;font-weight: bold">Cuartel:</label>
			<select id="BoxCuartel" class="form-control input-sm " onchange="" style="width: 280px;"></select>
		</div>
		<div class="col-xs-12 col-sm-3 col-md-3">
			<label style="color: #337ab7;font-weight: bold">Faena:</label>
			<select id="BoxFaena" class="form-control input-sm " onchange="cambioFaena(this.value)" style="width: 280px;"></select>
		</div>
		<div class="col-xs-12 col-sm-3 col-md-3">
			<label style="color: #337ab7;font-weight: bold">Labor:</label>
			<select id="BoxLabor" class="form-control input-sm" onchange="" style="width: 280px;"></select>
		</div>
		<div class="col-xs-12 col-sm-3 col-md-3">
			<label style="color: #337ab7;font-weight: bold">Estado:</label>
			<select class="form-control input-sm" id="estado">
				<option value='0'>Todos</option>
				<option value='8'>Ingresados</option>
				<option value='3'>Validados</option>
			</select>
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-12 portlet">
		<div style="text-align: center;">
			<button id="ver" class="btn blue"> Buscar</button>
		</div>
	</div>
</div>
<!-- <div class="table-responsive" id="Div_ListadoRendimiento"> -->
<div class="table-scrollable">
	<table class="table table-bordered table-hover table-striped  table-condensed" id="tableListado"></table> 	
</div>

<div style="text-align: center;">
	<button onclick="generarExcel()" class="btn green-dark"><i class="fa fa-file-excel-o" aria-hidden="true"></i> Exportar Excel</button>
</div>
<div id="fileArea" style="display: none;"></div>

<div id="dvjson"></div>
<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>
<label style="color: #fff;">.</label>