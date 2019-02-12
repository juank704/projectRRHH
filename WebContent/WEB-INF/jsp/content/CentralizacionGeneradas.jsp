<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="modal fade" id="crearLibroModal" tabindex="-1" role="dialog" aria-labelledby="crearLibroModal" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
    <h3 class="modal-title title-padding" id="crearLibroLabel">Crear archivo de Centralización</h3>
		<div class="modal-body padding-top-5">
        	<form class="form-horizontal form-fix noRadius noBorder"  id="crearLibroForm" role="form">
				<div class="form-body">
					<div class="alert alert-danger display-hide text-left" id="fwa">
                        	<button class="close" data-close="alert"></button> Tienes errores en el rut
                        </div>
                        <div class="alert alert-success display-hide" id="fga">
                            <button class="close" data-close="alert"></button> No se encontraron errores
                        </div>
					<div class="form-group">
						<label class="col-md-3 control-label">Nombre Archivo</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="crearNombreCentralizacion" name="crearNombreCentralizacion" placeholder="Nombre Centralizacion" required> 
						</div>
					</div>
					<div class="form-actions right1">
						<button type="button" class="btn default" onclick="abrirCerrarModal()">Cancelar</button>
						<button type="submit" class="btn green" id="agregarSubmit">Crear Centralización</button>
					</div>
				</div>
			</form>	
      </div>
	  
    </div>
  </div>
</div> 
<div class="modal fade" id="responseModal" tabindex="-1" role="dialog" aria-labelledby="responseModal" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
    <h3 class="modal-title title-padding" id="crearLibroLabel">Respuestas de SAP</h3>
		<div class="modal-body padding-top-5">
        	<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_E">
				<thead>  
				      <tr>        
						<th class="text-center">ID</th>
						<th class="text-center">NUMBER</th>
						<th class="text-center">MESSAGE</th>
						<th class="text-center">MESSAGE_V1</th>
						<th class="text-center">MESSAGE_V2</th>
						<th class="text-center">MESSAGE_V3</th>
						<th class="text-center">MESSAGE_V4</th>
						<th class="text-center">PARAMETER</th>
						<th class="text-center">ROW</th>
						<th class="text-center">FIELD</th>
						<th class="text-center">SYSTEM</th>
	                </tr>
				</thead>
				<tbody id="tblBodyE"></tbody>
			</table>
				<div class="form-actions right1">
						<button type="button" class="btn default" onclick="abrirCerrarModal2()">Cerrar</button>
						
					</div>
			
      </div>
	  
    </div>
  </div>
</div> 





<form action="#" id="searchForm" class="blank-form col-md-12 portlet light bordered margin-top" method="post">

<h4>Filtros</h4>
	<div class="row margin-bottom">
		<div class="col-md-4">
			<div class="col-md-4">
				<h5 class="text-center">Empresa</h5>
			</div>
			<div class="col-md-6">
				<select id="idSociedad" class=" form-control btn-circle btn-sm mayusculasWork" name="id_sociedad" onchange="traerPeriodos(this)">
				</select>
			</div>
		</div>
		<div class="col-md-4">
			<div class="col-md-4">
				<h5 class="text-center">Periodo</h5>
			</div>
			<div class="col-md-6">
				<select id="periodo" class=" form-control btn-circle btn-sm mayusculasWork" name="periodo" >
				</select>
			</div>
		</div>
		<div class="col-md-4" >
			<div class="col-md-6">
				<h5 class="text-center">Fecha Proceso</h5>
			</div>
			<div class="col-md-6">
				<input id="fecha_proceso" type="date" class=" form-control btn-circle btn-sm mayusculasWork dateWork" name="fecha_proceso"  />				
			</div>
		</div>
	</div>
		<div class="row">
			<div class="col-md-offset-8 col-md-2 text-right">
				<a id="documentacionMasiva"
					title="Generar Liquidaciones de los Trabajadores Seleccionados"
					class="btn btn-circle red btn-outline col-md-11"
					data-toggle="modal" onclick="abrirCerrarModal()">
					<i class="fa fa-download fa-lg"></i> Generar
				</a>
			</div>
			<div class=" col-md-2 text-right">
				<a id="documentacionMasiva"
					title="Buscar Centralizaciones Generadas"
					class="btn btn-circle green btn-outline col-md-11"
					data-toggle="modal" onclick="buscarCentralizacion()">
					<i class="fa fa-search fa-lg"></i> Buscar
				</a>
			</div>
		</div>
		<div class="row" style="margin-top:30px; margin-bottom:30px;">
		</div>
	
</form>


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

.dataTables_scrollHead {
	margin-top : -30px;
}

.margin-bottom{
	margin-bottom: 1em;
}

</style>
