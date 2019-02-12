<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="col-xs-12 col-sm-12 col-md-12 portlet">   
	<div class="col-xs-12 col-sm-3 col-md-3 ">
		<div class="col-xs-12 col-sm-12 col-md-12">
			<label style="color: #337ab7;font-weight: bold">Usuario:</label>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12">
			<select id="usuarios" class="form-control input-sm required no-edit">
				<option value=''></option>
				<c:if test="${not empty usuarios}">
					<c:forEach items="${usuarios}" var="us">
						<option value="${us.codigo}">${us.descripcion}</option>
					</c:forEach>
				</c:if>
			</select>
		</div>
	</div>
</div>

<div class="col-xs-12 col-sm-12 col-md-12 portlet">
	<div class="col-xs-12 col-sm-12 col-md-12">
		<label style="color: #337ab7;font-weight: bold">Campos:</label>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-12">
		<c:if test="${not empty campos}">
			<c:forEach items="${campos}" var="cam">
				<div class="col-xs-4 col-sm-4 col-md-4">
					<input type="checkbox" class="check" id="${cam.campo}" value="${cam.campo}"> ${cam.descripcion}
				</div>
			</c:forEach>
		</c:if>
	</div>
</div>
<div style="text-align: center;">
	<a id="Guardar" onclick="asignarCampos()" class="btn btn-circle red ">
		<i class="fa fa-plus"></i> Asignar
	</a>
</div>