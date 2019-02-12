<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	<div class="col-xs-12 col-sm-12 col-md-12 portlet">
		<div class="col-xs-12 col-sm-4 col-md-4">
			<div class="col-xs-12 col-sm-12 col-md-12">
				<label style="color: #337ab7;font-weight: bold">Fecha:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-12">
				<input id="BoxFecha" type="text" name="fecha" class="form-control" readonly>
			</div>
		</div>
		<div class="col-xs-12 col-sm-4 col-md-4">
			<div class="col-xs-12 col-sm-12 col-md-12">
				<label style="color: #337ab7;font-weight: bold">Campo:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-12">
				<select id="campo_taller" class="form-control input-sm"></select>
			</div>
		</div>
		<div class="col-xs-12 col-sm-4 col-md-4">
			<label style="color: #337ab7;font-weight: bold">Caseta:</label>
			<select id="BoxCaseta" class="form-control input-sm" >
				<option value="" disabled selected hidden="">Seleccione</option>
				<option value="1">Caseta1</option>
				<option value="2">Caseta2</option>
				<option value="3">Caseta3</option>
			</select>
		</div>	
	</div>
	<div class="col-xs-12 col-sm-12 col-md-12 portlet">
		<div class="col-xs-12 col-sm-4 col-md-4">
			<div class="col-xs-12 col-sm-12 col-md-12">
				<label style="color: #337ab7;font-weight: bold">Equipo:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-12">
				<select id="vehiculo_taller" class="form-control input-sm" ></select>
			</div>
		</div>
		<div class="col-xs-12 col-sm-4 col-md-4">
			<div class="col-xs-12 col-sm-12 col-md-12">
				<label style="color: #337ab7;font-weight: bold">Motivo de Ingreso:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-12">
				<select id="BoxMotivoIngreso" class="form-control input-sm" ></select>
			</div>
		</div>
		<div class="col-xs-12 col-sm-4 col-md-4">
			<label style="color: #337ab7;font-weight: bold">Diagnostico Preliminar:</label>
			<input type="text" id="BoxDiagnostico" class="form-control"  placeholder="Ingrese Diagnostico">
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-12 portlet">
		<div class="col-xs-12 col-sm-4 col-md-4">
			<div class="col-xs-12 col-sm-12 col-md-12">
				<label style="color: #337ab7;font-weight: bold">Número de Reserva:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-12">
				<input type="text" id="nreserva" class="form-control" disabled>
			</div>	
		</div>
	</div>
<h4>Materiales</h4>
		<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
			<div class="table-responsive" id="ignore">
				<table class="table table-bordered table-hover table-striped table-condensed" id="tblMateriales">
					<thead>
						<tr>
							<th style="width:200px">Material</th>
							<th style="width:200px">UM</th>
							<th style="width:200px">Cantidad Reserva</th>
							<th style="width:200px">Stock</th>
							<th style="width:200px">Cantidad Solped</th>
							<th style="width:200px">Solped</th>
							<th style="width:200px">Cantidad</th>
							<th style="width:200px">Fecha</th>
							<th style="width:100px"></th>						
						</tr>					
					</thead>
					<tbody id="tbl_Materiales">
					</tbody>
					<tfoot id="tfoot_Materiales">
					</tfoot>
				</table>
				<div style="text-align: right;">
					<a id="1" class="btn btn-circle red btn-outline" onclick="javascript: addMateriales();">
						<i class="fa fa-plus"></i>
					</a>
				</div> 
			</div>
			<div style="text-align: center;">
				<div id="reservarDiv">
					<button id="addReserva" onclick="javascript: reservar();" style="display:none" class="btn btn-circle red btn-outline">
						 <i class="icon-cloud-upload"></i> Reservar
					</button>
				</div>
				<div id="solpedDiv">
					<button id="addSolped" onclick="javascript: solped();" style="display:none" class="btn btn-circle red btn-outline">
						 <i class="icon-cloud-upload"></i> Solicitar
					</button>
				</div>
			</div>
		</div>
		
	</div>

<div style="text-align: center;">
	<a id="Guardar" onclick="javascript: Guardar()" class="btn btn-circle red btn-outline">
		<i class="icon-cloud-upload"></i> Ingreso Riego
	</a>
</div>
<div id="fileArea" style="display: none;"></div>

<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>