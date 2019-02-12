<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
	<h4>Faena</h4>
	<div class="col-xs-12 col-sm-12 col-md-12">
<div class="col-xs-12 col-sm-3 col-md-3 ">
	<div class="col-xs-12 col-sm-12 col-md-12">
		<label style="color: #337ab7;font-weight: bold">Campo:</label>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-12">
		<select id="campo_rendimiento" class="form-control input-sm required no-edit" onchange="loadInfo(this.value);">
			<option value=''></option>
			<c:if test="${not empty actualSesion}">
				<c:forEach items="${actualSesion.campo}" var="campo">
					<option value="${campo.campo}">${campo.descripcion} | Zona ${campo.zona}</option>
				</c:forEach>
			</c:if>
		</select>
	</div>
</div>
</div>
<div class="table-responsive" id="Div_TableFaena">
	<table class="table table-bordered table-hover table-striped table-condensed dataTable no-footer" id="TableFaena">
		<thead>
			<tr>
				<th style="width: 15%; min-width: 120px;">Descripción</th>
				<th style="width: 15%; min-width: 120px;">Clasificación</th>
				<th style="width: 1%"> Modificar </th>
				<th style="width: 1%;"> Eliminar </th>
			</tr>
		</thead>
		<tbody id="BodyFormaAplicacion"></tbody>
	</table>
</div>
<div style="text-align: center;">
	<a id="addFormAP" onclick="javascript: addFormAP(0)" class="btn btn-circle red btn-outline">
		<i class="fa fa-plus"></i> Agregar
	</a>
</div><div id="fileArea" style="display: none;"></div>

<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>