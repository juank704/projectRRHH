<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="col-xs-12 col-sm-3 col-md-3 ">
	<div class="form-group">
		<label style="color: #337ab7;font-weight: bold">Sociedad:</label>
		<select id="campo" class="form-control input-sm required no-edit">
		<!--  	<option value=''></option>
			<c:if test="${not empty actualSesion}">
				<c:forEach items="${actualSesion.campo}" var="campo">
					<option value="${campo.campo}">${campo.descripcion}</option>
				</c:forEach>
			</c:if>-->
		</select>
	</div>
</div>
<div class="col-xs-12 col-sm-3 col-md-3 ">
	<div class="form-group">
	    <label style="color: #337ab7;font-weight: bold">Periodo:</label>
	    <input type="month" class="form-control form-control-1" id="periodo" >
	</div>
</div>
<div class="col-xs-12 col-sm-3 col-md-3 ">
	<div class="col-xs-12 col-sm-12 col-md-12">
		<label style="color: #337ab7;font-weight: bold">Buscar:</label>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-12">
		<a onclick="btnCierreMensual()" class="btn btn-success">
			<i class="icon-cloud-upload"></i> 
		</a>
	</div>
</div>
<div class="">
<div class="table-responsive table-scrollable">
	<table class="table table-bordered table-hover table-striped  table-condensed" id="tbl_RendimientoVlidadr">
		
	</table> 
</div>
</div>
<div style="text-align: center;" class="">
	<a onclick="generarCierre()" class="btn btn-success">
		<i class="icon-cloud-upload"></i> Generar Cierre
	</a>
</div>