<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
   	 	<div class="col-xs-12 col-sm-6 col-md-3 ">
			<label style="color: #337ab7;" >Campo: </label>
			<div style="width: 100%;">
				<select class="form-control input-sm" id="dataHuerto" ></select>
			</div>
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
		
		<div class="table-scrollable">
			<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Datos_Comunes">
				<thead>
					<tr>
						<th>Campo</th>
						<th>Cuartel</th>
						<th>Tipo Incidencia</th>
						<th>Fecha Ingreso</th>						
						<th>Ingresado Por</th>						
						<th>Observacion</th>
						<th>Detalle</th>
					</tr>
				</thead>
				<tbody id="body_Incidencias"></tbody>
			</table>
		</div>
	</div>