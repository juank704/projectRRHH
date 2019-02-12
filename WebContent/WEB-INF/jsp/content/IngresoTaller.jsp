<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<div class="col-xs-12 col-sm-12 col-md-12 portlet" style="display: block;">
	<div class="col-xs-12 col-sm-12 col-md-12">
		<div class="col-xs-12 col-sm-12 col-md-12 portlet">
			<div class="col-xs-12 col-sm-4 col-md-4">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Fecha:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" name="" id="fecha_taller" onchange="cambioFecha(this.value)" class="form-control required" readonly>
				</div>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Campo:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id="campo_taller" class="form-control input-sm required"></select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Tipo de Ingreso:</label>
				</div>
				<div  class="col-xs-12 col-sm-12 col-md-12">
					<select id="tipo_ingreso" onchange="cambio_tipo(this);" class="form-control input-sm required" ></select>
				</div>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12 portlet taller">
			<div class="col-xs-12 col-sm-4 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Tipo:</label>
				</div>
				<div  class="col-xs-12 col-sm-12 col-md-12">
					<select id="tipo_taller" class="form-control input-sm required taller-input" ></select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Equipo:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id="vehiculo_taller" class="form-control input-sm required equipo taller-input"></select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Motivo Ingreso:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id="motivo_ingreso" class="form-control input-sm required motivo taller-input" onchange="cambioMotivo(this)"></select>
				</div>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12 portlet taller" >
			<div class="col-xs-12 col-sm-4 col-md-4">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Causa</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id="causa" class="form-control input-sm"></select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Operador:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12" id="divOprTra">
					<select id="operador_taller" class="form-control input-sm required taller-input"></select>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12" id="divOprVeh" style="display:none">
					<input type="text" class="form-control" id="operador_taller_V" >
				</div>
				
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Horómetro de Ingreso</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" class="form-control required taller-input" id="horomtr_taller" onkeypress="return justNumbers(event);">
				</div>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12 portlet taller" >
			<div class="col-xs-12 col-sm-4 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Diagnostico Preliminar:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" id="obs_taller" class="form-control " >
				</div>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Cantidad Petroleo (%):</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" id="range" value="" name="range" />
				</div>
			</div>
			<!--  <div class="col-xs-12 col-sm-4 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Número de Reserva:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" id="nreserva" class="form-control" disabled>
				</div>
			</div>-->
		</div>
<!-- 		TODO RIEGO --> 
		<div class="col-xs-12 col-sm-12 col-md-12 portlet riego">
			<div class="col-xs-12 col-sm-4 col-md-4">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Caseta:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id="BoxCaseta" class="form-control input-sm riego-input required" >
						<option value="" disabled selected hidden="">Seleccione</option>
						<option value="1">Caseta1</option>
						<option value="2">Caseta2</option>
						<option value="3">Caseta3</option>
					</select>
				</div>
			</div>	
			<div class="col-xs-12 col-sm-4 col-md-4">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Equipo:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id="vehiculo_riego" class="form-control input-sm equipo riego-input required" ></select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Motivo de Ingreso:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id="BoxMotivoIngreso" class="form-control input-sm motivo riego-input required" ></select>
				</div>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12 portlet riego">
			<div class="col-xs-12 col-sm-4 col-md-4">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Diagnostico Preliminar:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" id="BoxDiagnostico" class="form-control  "  placeholder="Ingrese Diagnostico">
				</div>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Número de Reserva:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" id="nreserva" class="form-control" disabled>
				</div>	
			</div>
		</div>
<!-- 		Consumo -->
		<div class="col-xs-12 col-sm-12 col-md-12 portlet consumo">
			<div class="col-xs-12 col-ms-4 col-md-4">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Tipo:</label>
				</div>
				
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id="BoxTipo" class="form-control input-sm consumo-input required" style="width: 200px;">
						<option value="" disabled selected hidden="">Seleccione</option>
						<option value=1>Vehículo</option>
						<option value=2>Agrícola</option>	
					</select>
				</div>
			</div>
			<div class="col-xs-12 col-ms-4 col-md-4">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Combustible:</label>
				</div>
				
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id="BoxCombustible" class="form-control input-sm consumo-input required" style="width: 200px;">						
					</select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Stock Combustible:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" id="stock" class="form-control" disabled placeholder="">
				</div>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Saldo Stock Combustible:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" id="stocksaldo" class="form-control" disabled placeholder="">
				</div>
			</div>
		</div>

		<div class="col-xs-12 col-sm-12 col-md-12 portlet consumo">
		<div class="table-responsive" id="ignore">
			<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_ConsumoCombustible">
				<thead>
					<tr>
						<th><input type='checkbox'  id='cbSelectTodo' onchange='selectTodoCuartel()' ></th>
						<th>Equipo</th>
						<th>Litros</th>
						<th>Horometro</th>
						<th>Operador</th>										
						
					</tr>
				</thead>
				<tbody id="tblListaAplicaciones"></tbody>
			</table> 
		</div>
		</div>
	</div>
	
	


<!-- 		<h4>Materiales</h4> -->
<!-- 		<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered"> -->
<!-- 			<div class="table-responsive" id="ignore"> -->
<!-- 				<table class="table table-bordered table-hover table-striped table-condensed" id="tblMateriales"> -->
<!-- 					<thead> -->
<!-- 						<tr> -->
<!-- 							<th style="width:200px">Material</th> -->
<!-- 							<th style="width:200px">UM</th> -->
<!-- 							<th style="width:200px">Cantidad Reserva</th> -->
<!-- 							<th style="width:200px">Stock</th> -->
<!-- 							<th style="width:200px">Cantidad Solped</th> -->
<!-- 							<th style="width:200px">Solped</th> -->
<!-- 							<th style="width:200px">Cantidad</th> -->
<!-- 							<th style="width:200px">Fecha</th> -->
<!-- 							<th style="width:100px"></th>						 -->
<!-- 						</tr>					 -->
<!-- 					</thead> -->
<!-- 					<tbody id="tbl_Materiales"> -->
<!-- 					</tbody> -->
<!-- 					<tfoot id="tfoot_Materiales"> -->
<!-- 					</tfoot> -->
<!-- 				</table> -->
<!-- 				<div style="text-align: right;"> -->
<!-- 					<a id="1" class="btn btn-circle red btn-outline" onclick="javascript: addMateriales();"> -->
<!-- 						<i class="fa fa-plus"></i> -->
<!-- 					</a> -->
<!-- 				</div>  -->
<!-- 			</div> -->
<!-- 			<div style="text-align: center;"> -->
<!-- 				<div id="reservarDiv"> -->
<!-- 					<button id="addReserva" onclick="javascript: reservar();" style="display:none" class="btn btn-circle red btn-outline"> -->
<!-- 						 <i class="icon-cloud-upload"></i> Reservar -->
<!-- 					</button> -->
<!-- 				</div> -->
<!-- 				<div id="solpedDiv"> -->
<!-- 					<button id="addSolped" onclick="javascript: solped();" style="display:none" class="btn btn-circle red btn-outline"> -->
<!-- 						 <i class="icon-cloud-upload"></i> Solicitar -->
<!-- 					</button> -->
<!-- 				</div> -->
<!-- 			</div> -->
<!-- 		</div> -->
		
	</div>
	<div style="text-align: center;">
		<a id="addTaller" onclick="javascript: addTaller();" class="btn btn-circle red btn-outline submit taller">
			 <i class="icon-cloud-upload"></i> Ingresar Taller
		</a>
		<a id="Guardar" onclick="javascript: Guardar()" class="btn btn-circle red btn-outline submit riego">
			<i class="icon-cloud-upload"></i> Ingreso Riego
		</a>
		<a id="Guardar" onclick="javascript: modalAddCuartel()" class="btn btn-circle red btn-outline submit consumo">
			<i class="icon-cloud-upload"></i> Ingresar Consumo
		</a>
	</div>