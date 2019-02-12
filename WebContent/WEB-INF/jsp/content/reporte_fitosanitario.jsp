<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="col-xs-12 col-sm-12 col-md-12 portlet">
	<div class="col-xs-12 col-sm-3 col-md-3 ">
		<div class="col-xs-12 col-sm-12 col-md-12">
			<label style="color: #337ab7;font-weight: bold">Campo:</label>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12">
			<select id="campo_rendimiento" class="form-control input-sm">
				<option value=''></option>
				<c:if test="${not empty actualSesion}">
					<c:forEach items="${actualSesion.campo}" var="campo">
						<option value="${campo.campo}">${campo.descripcion}</option>
					</c:forEach>
				</c:if>
			</select>
		</div>
	</div>
  	<div class="col-xs-1 col-sm-1 col-md-1">
  		<div class="col-xs-12 col-sm-12 col-md-12">
  			<label style="color: #337ab7;font-weight: bold;" >Buscar </label>
  			<div style="width: 100%;">
				<a onclick="cargaData()" class="btn btn-info">
					<i class="icon-magnifier"></i>
				</a>
			</div>
		</div>
  	</div>
</div>
<div class="table-responsive">
	<table style="white-space: nowrap;" class="table table-bordered table-hovertable-striped  table-condensed nowrap" id="tbl_Reporte">
	</table> 
</div>