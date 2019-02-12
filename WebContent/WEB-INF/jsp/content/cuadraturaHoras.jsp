<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	<div class="col-xs-11 col-sm-11 col-md-11">
		<div class="col-xs-12 col-sm-6 col-md-3">
			<label style="color: #337ab7;font-weight: bold;" >Campo: </label>
			<div style="width: 100%;">
				<select id="dataHuerto" class="form-control input-sm">
					<option value=''></option>
					<c:if test="${not empty actualSesion}">
						<c:forEach items="${actualSesion.campo}" var="campo">
							<option value="${campo.campo}">${campo.descripcion}</option>
						</c:forEach>
					</c:if>
				</select>
			</div>
		</div>
		<div class="col-xs-12 col-sm-6 col-md-3">
			<label style="color: #337ab7;font-weight: bold;" >Fecha Desde: </label>
			<div style="width: 100%;">
				<input type="text" readonly  name="fecha" class="form-control" id="fecha_desde">
			</div>
		</div>
		<div class="col-xs-12 col-sm-6 col-md-3">
			<label style="color: #337ab7;font-weight: bold;" >Fecha Hasta: </label>
			<div style="width: 100%;">
				<input type="text" readonly  name="fecha" class="form-control" id="fecha_hasta">
			</div>
		</div>
		<div class="col-xs-12 col-sm-6 col-md-3 ">
			<label style="color: #337ab7;font-weight: bold;" >Cantidad Horas: </label>
			<div style="width: 100%;">
				<input type="number" onkeypress="return justNumbers(event);" name="horas" class="form-control" id="horas" placeholder="Horas a comparar">
			</div>
		</div>
	</div>
	<div class="col-xs-1 col-sm-1 col-md-1">
  		<div class="col-xs-12 col-sm-12 col-md-12">
  			<label style="color: #337ab7;font-weight: bold;" >Buscar </label>
  			<div style="width: 100%;">
				<a class="btn blue " onclick="javascript: loadInfo();">
					<i class="icon-magnifier"></i>
				</a>
			</div>
		</div>
  	</div>
</div>
<div class="table-responsive" id="ignore">
	<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_RendimientoVlidadr">
		
	</table> 
</div>


<div id="fileArea" style="display: none;"></div>

<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>