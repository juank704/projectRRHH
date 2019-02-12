<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
 <div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
  	<div class="col-xs-11 col-sm-11 col-md-11">
		<div class="col-xs-12 col-sm-6 col-md-3">
			<label style="color: #337ab7;font-weight: bold;" >Campo: </label>
			<div style="width: 100%;">
				<select class="form-control input-sm" id="campo" onchange="cambioCampo(this.value)">
					<option value=''></option>
					<c:if test="${not empty actualSesion}">
						<c:forEach items="${actualSesion.campo}" var="campo">
							<option value="${campo.campos_maq}">${campo.descripcion}</option>
						</c:forEach>
					</c:if>
				</select>
			</div>
		</div>
		<div class="col-xs-12 col-sm-6 col-md-3">
			<label style="color: #337ab7;font-weight: bold;" >Tipo Maquinaria: </label>
			<div style="width: 100%;">
				<select class="form-control input-sm" id="tipo"></select>
			</div>
		</div>
	</div>
  	<div class="col-xs-1 col-sm-1 col-md-1">
  		<div class="col-xs-12 col-sm-12 col-md-12">
  			<label style="color: #337ab7;font-weight: bold;" >Buscar </label>
  			<div style="width: 100%;">
				<a onclick="buscar()" class="btn btn-info">
					<i class="icon-magnifier"></i>
				</a>
			</div>
		</div>
  	</div>
</div>
<div class="table-responsive" id="ignore">
	<table class="table table-bordered table-hovertable-striped table-scrollable table-condensed nowrap" id="tbl_RendimientoVlidadr"></table> 
</div>