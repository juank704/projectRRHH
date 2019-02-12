<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<form action="#" id="searchForm"
	class="blank-form col-md-12 portlet light bordered" method="post">

	<h4>Filtros</h4>


	<!-- 	<div class="row">
				<div class="col-md-3 col-md-offset-3">
					<h5 class="text-center">Periodo Proceso</h5>
					<div class="col-md-12 text-center">
						<input type="text" id="periodoProceso"
							class=" form-control btn-circle btn-sm mayusculasWork monthWork">
					</div>
				</div>
				<div class="col-md-3 text-center">
					<h5 class="text-center">Fecha Pago</h5>
					<div class="col-md-12 ">
						<input type="text" id="fechaPago"
							class=" form-control btn-circle btn-sm mayusculasWork dateWork">
					</div>
				</div>
			</div> -->


	<div class="row">
		<div class="col-md-4">
			<h5 class="text-center">Empresa</h5>
		</div>
		<div class="col-md-4">
			<select id="idSociedad"
				class=" form-control btn-circle btn-sm mayusculasWork"
				name="idSociedad">
				<option value="">TODAS</option>
				<c:if test="${not empty listaSociedad}">
					<c:forEach items="${listaSociedad}" var="sociedad">
						<c:if test="${sociedad.idSociedad != -1}">
							<option value="${sociedad.idSociedad}">${sociedad.sociedad}</option>
						</c:if>
					</c:forEach>
				</c:if>
			</select>
		</div>		
	</div>
	
	<div class="row" style="padding-top:10px;">
		<div class="col-md-4">
			<h5 class="text-center">Huerto</h5>
		</div>
		<div class="col-md-4">
			<select id="idHuerto"
				class=" form-control btn-circle btn-sm mayusculasWork"
				name="idHuerto">
				<option value="">TODAS</option>
			</select>
		</div>
		<div class="col-md-4 text-right">
			<a id="documentacionMasiva"
				title="Generar Liquidaciones de los Trabajadores Seleccionados"
				class="btn btn-circle green btn-outline" data-toggle="modal"
				onclick="generarFichaDinamicaColaborador()"> <i
				class="fa fa-file-excel-o fa-lg"></i> Generar Ficha Dinamica de
				Colaborador
			</a>
		</div>

	</div>



	<div class="row" style="margin-top: 30px; margin-bottom: 30px;">



	</div>

</form>

<br>


<p style="color: white">.</p>
<br>
<br>
<br>
<br>
<br>

<div class="dragbox ui-resizable">
	<div class="dragbox-content"></div>
</div>

<p style="color: white">.</p>
<article id="loading" class="loading_dos" style="display: none;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>
<p style="color: white">.</p>


<div id="loadingTest" class="modal">
	<div class="center">
		<img alt="" class="loading_dos" src="../img/loading_info.gif" />
	</div>
</div>





<style>
.noShadowNoRadius {
	box-shadow: none;
}

.noRadius {
	box-shadow: none;
	border-radius: 0px;
}

.noBorder {
	border: none;
}

.text-right {
	text-align: right;
}

.text-left {
	text-align: left;
}

.padding-top-5 {
	padding-top: 5px;
}

.title-padding {
	padding-top: 2%;
	padding-left: 2.5%;
}

.form-fix {
	width: auto;
	margin: 1em;
	text-align: right;
}

input[type="file"] {
	height: 2.39em;
	left: -1px;
	top: -26px;
	width: 9em;
	position: relative;
	opacity: 0;
}

.btn-fixed-m {
	position: absolute;
	top: 0;
	left: 40%;
	height: 2.4em;
}

.formatedBox {
	margin: 11px 2px 4px -11px !important;
}

.marginDefaced {
	margin-top: 25%;
}

.marginDefaced2 {
	margin-top: 64% !important;
}

.width100 {
	width: 100%;
}

.formatedIcon {
	margin-left: -19px !important;
}

.formatedPadding {
	padding-left: 9px !important;
}

.select2-hidden-accessible {
	border: 0 !important;
	clip: rect(0, 0, 0, 0) !important;
	height: 1px !important;
	margin: -1px !important;
	overflow: hidden !important;
	padding: 0 !important;
	position: absolute !important;
	width: 1px !important
}

.tdSociedad {
	display: none;
}

.tdMontoIngresado {
	display: none;
}

.swal2-container.swal2-shown {
	background-color: rgba(0, 0, 0, 0.4);
	z-index: 99999 !important;
}

.blank-form {
	outline: none !important;
	padding: 0em !important;
	border: 0px !important;
	border-radius: 0 !important;
	margin: 0 !important;
	box-shadow: none !important;
}

.mostrar {
	display:;
}

.ocultar {
	display: none;
}

.loading_dos {
	display: block;
	margin: 0 auto;
	position: fixed;
	z-index: 1000;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: rgba(0, 0, 0, .4) 50% 50% no-repeat;
}
</style>

