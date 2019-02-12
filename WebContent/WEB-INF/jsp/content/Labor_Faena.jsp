<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
    
<div class="col-xs-12 col-sm-12 col-md-12 portlet">
	<div class="col-xs-12 col-sm-3 col-md-3 ">
		<label style="color: #337ab7;font-weight: bold" >Campo: </label>
		<select id="campo_rendimiento" class="form-control input-sm required no-edit" onchange="loadFaenaZona(this);">
			<option value=''></option>
			<c:if test="${not empty actualSesion}">
				<c:forEach items="${actualSesion.campo}" var="campo">
					<option value="${campo.zona}">${campo.descripcion} | Zona ${campo.zona}</option>
				</c:forEach>
			</c:if>
		</select>
	</div>
	<div class="col-xs-12 col-sm-3 col-md-3 ">
		<label style="color: #337ab7;font-weight: bold">Faena:</label>
		<select class="form-control input-sm" id="filtroFaena" onchange="cambioFaena(this.value)"></select>
	</div>
</div>

	
	<div class="table-responsive" id="Div_TableLaborFaena">
	<table class="table table-bordered table-hover table-striped table-condensed dataTable no-footer" id="Table_LaborFaena">
		<thead>
			<tr>

				<th style="width: 15%; min-width: 100px;">Labor</th>
				<th style="width: 15%; min-width: 100px;">Maquinaria</th>
				<th style="width: 15%; min-width: 100px;">Rebaja</th>
			<!--<th style="width: 15%; min-width: 100px;">Tipo Labor</th>-->
				<th style="width: 2%"> Modificar</th>
				<th style="width: 2%"> Eliminar</th>
			</tr>
		</thead>
		<tbody id="BodyLabor_Faena"></tbody>
	</table>
</div>
<div style="text-align: center;">
	<a id="addFormAP" onclick="javascript: addModLabor()" class="btn btn-circle red btn-outline">
		<i class="fa fa-plus"></i> Agregar
	</a>
</div><div id="fileArea" style="display: none;"></div>

<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>