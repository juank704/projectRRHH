<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<div class="col-xs-12 col-sm-12 col-md-12">
	<h3>Confirma Aplicacion</h3>
	<div class="col-xs-12 col-sm-12 col-md-3 ">
	</div>
	<div class="col-xs-12 col-sm-12 col-md-10 portlet light bordered">
	
	<h4>Cabecera</h4>
	
		<div id="con_bod_div" style="display: block;" class=" row col-xs-12 col-sm-12 col-md-12 portlet light ">
			<div class="col-xs-2">
				<label style="color: #337ab7; float: left; font-weight: bold">Numero de orden:</label>
			</div>
			<div class="col-xs-2">
				<input type="text" name="numero_orden" class="form-control input-circle" id="numero_orden" readonly="readonly" >
			</div>
			
			<div class="col-xs-2">
				<label style="color: #337ab7; float: left;font-weight: bold">Nombre Aplicador:</label>
			</div>
			<div class="col-xs-2">
				<input type="text" name="nombre_aplicador" class="form-control input-circle" id="nombre_aplicador" readonly="readonly" >
			</div>
			
			<div class="col-xs-2">
				<label style="color: #337ab7; float: left;font-weight: bold">Fecha segun programa:</label>
			</div>
			<div class="col-xs-2">
				<input type="text" name="fecha_estimada_aplicacion" class="form-control input-circle" id=fecha_estimada_aplicacion readonly="readonly" >
			</div>
		</div>
		<div id="con_bod_div" style="display: block;" class=" row col-xs-12 col-sm-12 col-md-12 portlet light ">	
			<div class="col-xs-2">
				<label style="color: #337ab7; float: left;font-weight: bold">Estado Fenologico:</label>
			</div>
			<div class="col-xs-2">
				<input type="text" name="estado_fenologico" class="form-control input-circle" id="estado_fenologico" readonly="readonly" >
			</div>
			
			<div class="col-xs-2">
				<label style="color: #337ab7; float: left;font-weight: bold">Fecha Estimada Cocecha:</label>
			</div>
			<div class="col-xs-2">
				<input type="text" name="fecha_estimada_cosecha" class="form-control input-circle" id="fecha_estimada_cosecha" readonly="readonly" >
			</div>
			
			<div class="col-xs-2">
				<label style="color: #337ab7; float: left;font-weight: bold">Mercado:</label>
			</div>
			<div class="col-xs-2">
				<select id='mercado'  class='btn blue btn-outline btn-circle btn-sm'>		
				</select>
			</div>
				</div>
		<div id="con_bod_div" style="display: block;" class=" row col-xs-12 col-sm-12 col-md-12 portlet light">	
			<div class="col-xs-2">
				<label style="color: #337ab7; float: left;font-weight: bold">Forma de Aplicacion:</label>
			</div>
			<div class="col-xs-2">
				<select id='forma_aplicacion'  class='btn blue btn-outline btn-circle btn-sm'>		
				</select>
			</div>
			
			
			
			<div class="col-xs-2">
				<label style="color: #337ab7; float: left;font-weight: bold">Jefe de Aplicacion:</label>
			</div>
			<div class="col-xs-2">
			<select id='jefe_aplicacion'  class='btn blue btn-outline btn-circle btn-sm'>		
				</select>
				
			</div>
		
		</div>
		
		
		
	<h4>Confirmacion</h4>
	<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
		<div class="table-responsive" id="ignore">
 			<div id="con_bod_div" style="display: block;" class=" row col-xs-12 col-sm-12 col-md-12 portlet light">
		<div class="col-xs-2">
				<label style="color: #337ab7; float: left;font-weight: bold">Marcha Tractor:</label>
			</div>
			<div class="col-xs-2">
			<select id='marcha_tractor'  class='btn blue btn-outline btn-circle btn-sm'>
					<option >Seleccione</option>
					<option value="1">Lenta</option>
					<option value="2">Media</option>
					<option value="3">Rapida</option>					
				</select>
				
			</div>
			
			<div class="col-xs-2">
				<label style="color: #337ab7; float: left;font-weight: bold">Fecha Termino:</label>
			</div>
			<div class="col-xs-2">
				<input type="date" name="fecha_termino" class="form-control input-circle" id="fecha_termino">
				
			</div>
			
			
			<div class="col-xs-2">
				<label style="color: #337ab7; float: left;font-weight: bold">Combinacion Boquilla:</label>
			</div>
			<div class="col-xs-2">
			<select id='boquilla'  class='btn blue btn-outline btn-circle btn-sm'>
					<option >Seleccione</option>
					<option value="1">Rojo</option>
					<option value="2">Verde</option>
					<option value="3">Azul</option>
					<option value="4">Amarillo</option>	
					<option value="5">Blanco</option>
				</select>
				
			</div>
			
		</div>
		</div>
		
		
		<div id="con_bod_div" style="display: block;" class=" row col-xs-12 col-sm-12 col-md-12 portlet light">	
			
			
			
			<div class="col-xs-2">
				<label style="color: #337ab7; float: left;font-weight: bold">Presion bomba:</label>
			</div>
			<div class="col-xs-2">
				<input type="number" name="presion_bombada" class="form-control input-circle" id="presion_bombada" placeholder="Dosis por Bombada">
			</div>
			
			
			
			<div class="col-xs-2">
				<label style="color: #337ab7; float: left; font-weight: bold">Mojamiento:</label>
			</div>
			<div class="col-xs-2">
				<input type="number" name="fecha_viable" class="form-control input-circle" id="fecha_viable" >
			</div>
		
		</div>
	</div>	
	
	<h4>Materiales</h4>
	<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
		<div class="table-responsive" id="ignore">
			<table class="table table-bordered table-hover table-striped table-condensed" id="tblMateriales">
				<thead>
					<tr>
						<th>Producto</th>
						<th>Cantidad a retirar</th>
						<th>Dias de carencia</th>
						<th>Hora de reingreso</th>
					</tr>
				</thead>
				<tbody id="tblMateriales"></tbody>
			</table> 
		</div>
		
	</div>	

	
	</div>
	<div class="col-xs-12 col-sm-12 col-md-3">
	</div>
</div>
<div style="text-align: center;">
	<a id="addAct" onclick="javascript: addAct();" class="btn btn-circle red btn-outline">
		<i class="fa fa-plus"></i> Generar Orden de Aplicacion
	</a>
</div>