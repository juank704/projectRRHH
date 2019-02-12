<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<div class="col-xs-12 col-sm-12 col-md-12" id="agregar_datos_comunes" style="display: block;">
	<h3>Detalle Aplicación</h3>
	<div class="col-xs-12 col-sm-12 col-md-12">
		<h4 id='h4program'>Programa</h4>
		<div class="col-xs-12 col-sm-12 col-md-12 portlet">
			<div class="col-xs-12 col-sm-3 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left; font-weight: bold">Número de orden:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" name="numero_orden" class="form-control" id="numero_orden" readonly="readonly" >
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Fecha según programa:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" name="fecha_estimada_aplicacion" class="form-control" id=fecha_estimada_aplicacion readonly="readonly" >
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Campo:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" name="campo" class="form-control" id=campo readonly="readonly" >
				</div>
				<input id="codCampo" value="" type="hidden">
				<input id="idProgramaApl" value="" type="hidden">
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12 portlet">
			<div class="col-xs-12 col-sm-3 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left; font-weight: bold">Programa Aplicación:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" name="programa_aplicacion" class="form-control" id="programa_aplicacion" readonly="readonly" >
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Control de:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" name="control_de" class="form-control" id=control_de readonly="readonly" >
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Estado Fenólogico:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" name="estado_fenologico" class="form-control" id="estado_fenologico" readonly="readonly" >
				</div>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12 portlet">
			<div class="col-xs-12 col-sm-3 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Mercado:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" name="mercado" class="form-control" id="mercado" readonly="readonly" >
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Forma de Aplicación:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" name="forma_aplicacion" class="form-control" id="forma_aplicacion" readonly="readonly" >
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Observación:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<textarea name="observacion" class="form-control" id="observacion" readonly="readonly" ></textarea>
				</div>
			</div>
		</div>
		<h4 id="especie">Especie</h4>
		<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
			<div class="table-responsive" id="ignore">
				<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Cuartel">
					<thead>
						<tr>
							<th>Variedad</th>
							<th>Cuartel</th>
							<th>Has</th>
							<th>Has Real</th>
							<th>% Costo</th>	
							<th>Fecha estimada de cosecha</th>
							<th>Días a cosecha</th>
							<th>Ceco</th>						
						</tr>
					</thead>
					<tbody id="tblCuartel"></tbody>
				</table> 
			</div>
		</div>
		<h4 class="divMojamiento">Confirmar Mojamiento</h4>
		<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered divMojamiento">
			<div class="col-xs-2">
				<label style="color: #337ab7; float: left;font-weight: bold">Mojamiento:</label>
			</div>
			<div class="col-xs-2">
				<input type="text" name="mojamiento" class="form-control" id="mojamiento"  disabled>
			</div>
			<div class="col-xs-2">
				<label style="color: #337ab7; float: left;font-weight: bold">Mojamiento Real por has:</label>
			</div>
			<div class="col-xs-2">
				<input type="text" name="mojamientoReal" class="form-control" id="mojamientoReal"  >
			</div>
			<div class="col-xs-2">
				<label style="color: #337ab7; float: left;font-weight: bold">Mojamiento Total:</label>
			</div>
			<div class="col-xs-2">
				<input type="text" name="mojamientoTotal" class="form-control" id="mojamientoTotal"  >
			</div>
		</div>
		<h4 id='materiales'>Materiales</h4>
		<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
			<div class="table-responsive" id="ignore">
				<table class="table table-bordered table-hover table-striped table-condensed" id="tblMateriales">
					<thead id="headMateriales">
						<!--  <tr>
							<th>Producto</th>
							<th>Dosis 100</th>
							<th>Dosis Has</th>
							<th>Cantiadad</th>
							<th>Cantidad Real</th>
							<th>Devolución</th>
							<th>Diferencia de consumo</th>
						</tr>-->
					</thead>
					<tbody id="tblMateriales"></tbody>
				</table> 
			</div>
		</div>
		<h4 id='traspaso'>Detalle Traspaso Material</h4>
		<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
			<div class="table-responsive" id="ignore">
				<table class="table table-bordered table-hover table-striped table-condensed" id="tblTraspasos">
					<thead id="headTraspaso">
						  <tr>
						 	<th>Código Material</th>
							<th>Material</th>
							<th>Cantidad</th>
							<th>UM</th>
							<th>Documento</th>
							<th>Fecha</th>
							<th>Tipo</th>
						</tr>
					</thead>
					<tbody id="tblTraspaso"></tbody>
				</table> 
			</div>
		</div>
		<h4 id="divMaquinaria">Maquinaria</h4>
		<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
			<div class="table-responsive" id="ignore">
				<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Maquinaria">
					<thead id="headMateriales">
						  <tr>
							<th>Maquinaria</th>
							<th>Implemento</th>
							<th>Cambio Tracto</th>
							<th>Marcha Tracto</th>
							<th>Velocidad Tractor</th>
							<th>Presión Bomba</th> 
							<th>Responsable</th>
							<th></th>
						</tr>
					</thead>
					<tbody id="tblMaquinaria"></tbody>
				</table> 
				<div style="text-align: right;">
					<a id="addMaq" class="btn btn-circle red btn-outline" onclick="javascript: addMaquinaria();">
						<i class="fa fa-plus"></i>
					</a>
				</div> 
			</div>
		</div>
		<h4>Detalle</h4>
		<div class="col-xs-12 col-sm-12 col-md-12 portlet">
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Fecha Inicio (*):</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" name="fecha" class="form-control oblig" onchange="valFechaHoy(this.id)" id="fecha_inicio" readonly="readonly" >
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Hora Inicio (*):</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="time" name="hora_inicio" class="form-control oblig" id="hora_inicio" >
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Fecha término (*):</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" name="fecha" class="form-control oblig" id="fecha_termino" onchange="valFechaTermino()" readonly="readonly" >
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Hora Término (*):</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="time" name="hora_termino" class="form-control oblig" id="hora_termino"  >
				</div>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12 portlet">
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Orientación Viento:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" name="orientacion_viento" class="form-control" id="orientacion_viento"  >
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Velocidad del Viento:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" name="velocidad_viento" class="form-control" id="velocidad_viento" >
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Temperatura:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" name="temperatura" class="form-control" id="temperatura" >
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Capacidad Lts Maquina:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" name="capacidad_maquina" class="form-control" id="capacidad_maquina" disabled >
				</div>
			</div>
		</div>
	</div>
</div>
<div style="text-align: center;" id="divGuardar">
	<a id="addAct" onclick="javascript: addAct();" class="btn btn-circle red btn-outline">
		<i class="fa fa-plus"></i> Confirmar Aplicación
	</a>
</div>
<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>
.