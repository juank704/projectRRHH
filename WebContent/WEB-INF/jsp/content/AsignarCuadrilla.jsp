<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!-- AGRGAR DATOS GENERALES -->

<div class="col-xs-12 col-sm-12 col-md-12" id="agregar_datos_comunes" style="display: block;">
	<h3 style="text-align: center;">Agregar Datos Base</h3>
	<div class="portlet">
		<div style="float: left;">
			<label style="color: #337ab7;font-weight: bold">Ingreso por Especie/Variedad: </label>
			<input type='checkbox' title='Con Cuartel/Sin Cuartel' checked data-toggle="toggle" id="check_ingreso" data-size="mini" data-onstyle="info" onchange='withCuartel(this);' class='checkbox'/>
		</div>
		<div style="float: right;">
			<button id="check_ingreso" onclick='copiarCuadrilla();' class="btn btn-info">Replicar Rendimiento</button>
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-12">
		<div class="col-xs-12 col-sm-12 col-md-12 portlet">
			<div class="col-xs-12 col-sm-4 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Fecha:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" name="fecha" id="fecha_rendimiento" onchange="resetSupervisor(this)" class="form-control fecha required bloqueo-agro" readonly>
					<label id="message" style="color: #FF0000;font-weight: bold;display: none;">La fecha no puede ser mayor a la actual</label>
				</div>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Campo:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id="campo_rendimiento" class="form-control input-sm required bloqueo-agro" onchange="javascript: cambioCampo(this);"></select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4 hide-show">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Especie:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id="especie_rendimiento" class="form-control input-sm required" onchange="javascript: cambioEspecie(this.value);"></select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4 hide-show" style="display: none;">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Agrupación:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id="macro" class="form-control input-sm required" onchange="selectMacro(this);"></select>
				</div>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12 portlet">
			<div class="col-xs-12 col-sm-4 col-md-4 hide-show">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Variedad:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id="variedad_rendimiento" class="form-control input-sm required" onchange="javascript: cambioVariedad(this.value);"></select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4 hide-show" style="display: none;">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Centro de Costo / OrdenCo:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id="ceco" class="form-control input-sm required" onchange="cambioVariedad(this.value);"></select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12 ">
					<label style="color: #337ab7;font-weight: bold">Cuartel:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12 ">
					<select id="cuartel_rendimiento" onchange="cambioCuartel(this);" class="form-control input-sm required" ></select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Supervisor:</label>
				</div>
				<div  class="col-xs-12 col-sm-12 col-md-12">
					<select id="supervisor" onchange="buscarCuadrillaSupervisor(this);" class="form-control input-sm required"></select>
				</div>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12 portlet" >
			<div class="col-xs-12 col-sm-4 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12 ">
					<label style="color: #337ab7;font-weight: bold">Faena</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12 ">
					<select id="faena_rendimiento" class="form-control input-sm required" onchange="javascript: cambioFaena(this.value);"></select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Labor:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id="labor_rendimiento" class="form-control input-sm required" ></select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Tipo de Pago:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id="pago_rendimiento" onchange="camioBaseDia(this)" class="form-control input-sm required" >
						<option value="">Seleccione</option>
						<option value="1">Dia</option>
						<option value="2">Trato</option>
						<option value="3">Mixto</option>
					</select>
				</div>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12 portlet" >
			<div class="col-xs-12 col-sm-4 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Horas:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" onkeyup="activarBtn(this)" id="hora_rendimietno" class="form-control required">
				</div>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Valor Trato:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<div class='input-icon'>
						<i class='fa fa-usd'></i>
						<input type="text" class="form-control number required" id="valor">
					</div>
				</div>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4 disabledbutton" id="baseDiaDiv">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Base piso Dia:</label>
				</div>
				<div class="col-xs-10 col-sm-10 col-md-10">
					<div class='input-icon'>
						<i class='fa fa-usd'></i>
						<input type="text" class="form-control number required" required id="base_piso_dia">
					</div>
					<input type='checkbox' id="checkBase" checked title='Agregar Base Piso Dia' data-toggle="toggle"  data-size="mini" data-onstyle="success" onchange='javascript: basePisoAdd(this);' class='checkbox'/>
				</div>
				<div class="col-xs-2 col-sm-2 col-md-2">
					<button class="btn blue" id="cngBtn" onclick="changeBaseBtn()"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
				</div>
			</div>
		</div>
		<div style="text-align: center;">
			<a id="addRendimientoGeneral" onclick="javascript: addRendimientoGeneral();" class="btn btn-circle red btn-outline submit">
				 <i class="fa fa-arrow-right"></i> Guardar Datos Generales 
			</a>
<!-- 			<a id="updDatos_generales" onclick="javascript: updateDatos();" class="btn btn-circle red btn-outline" > -->
<!-- 				<i class="fa fa-refresh"></i> Actualizar -->
<!-- 			</a> -->
			<a id="next" onclick="next();" class="btn btn-circle red btn-outline" >
				 Siguiente <i class="fa fa-arrow-right"></i>
			</a>
		</div>
	</div>
</div>
<!-- AGREGAR CUADRILLA -->
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered" id="addCuadrilla" style="display: none;">
	<div class="col-xs-12 col-sm-12 col-md-12 portlet light">
		<div class="col-xs-12 col-sm-12 col-md-12 bordered" style ="text-align: center;">
			<h4 style="font-weight: bold; color: #337ab7;">Datos Rendimiento</h4>
			<div class="table-scrollable">
				<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Datos_Comunes">
					<thead>
						<tr>
							<th>Supervisor</th>
							<th>Campo</th>
							<th class="cuartel">Especie</th>
							<th class="cuartel">Variedad</th>
							<th class="cuartel">Cuartel</th>
							<th class="ceco">Centro de Costo/OrdenCO</th>
							<th>Faena</th>
							<th>Labor</th>
							<th style="min-width: 75px;">Fecha Rendimiento</th>
							<th>Valor</th>
							<th style="width: 2%;">Horas</th>
						</tr>
					</thead>
					<tbody id="body_Datos_Comunes"></tbody>
				</table>
			</div>
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-12">
		<h3 style="text-align: center;">Agregar Cuadrilla</h3>
		<div class="col-xs-12 col-sm-6 col-md-6 ">
			<div class="col-xs-12 col-sm-12 col-md-12 ">
				<label style="color: #337ab7;font-weight: bold">Replicar Cuadrilla:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-12">
				<select id="selectCuadrilla" onchange="replicarCuadrilla(this);" class="form-control input-sm"></select>
			</div>
		</div>
		<div class="col-xs-12 col-sm-6 col-md-6 ">
			<div class="col-xs-12 col-sm-12 col-md-12 ">
				<div class="col-xs-12 col-sm-12 col-md-12 ">
					<label style="color: #337ab7;font-weight: bold">Agregar Trabajador:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" name="asignCuadrilla" id="addtrabajdor" class="form-control">
				</div>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-2 ">
		</div>
		<div class="col-xs-12 col-sm-12 col-md-8 portlet light">
			<div class="col-xs-12 col-sm-12 col-md-12 portlet light">
				
			</div>
			<div class="table-responsive">
				<h4 style="text-align: center;">Miembros Cuadrilla</h4>
				<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Miembros">
					<thead>
						<tr>
							<th>Codigo Trabajador</th>
							<th>Rut</th>
							<th>Nombre</th>
							<th style="width: 2%;">Opciones</th>
							<th style="width: 2%;">Asistencia</th>
						</tr>
					</thead>
					<tbody id="body_Miembros" style="max-height: 150px; overflow: auto;" ></tbody>
				</table>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-2">
		</div>
	</div>
	<div style="text-align: center;">
<!-- 		<a id="crear" onclick="javascript: atras();" class="btn blue"> -->
<!-- 			<i class="fa fa-arrow-left"></i> Atras -->
<!-- 		</a> -->
		<a id="crear" onclick="javascript: asignCuadrilla();" class="btn red ">
			<i class="fa fa-plus"></i> Crear
		</a>
	</div>
</div>
<!-- BUSCAR CUADRILLA -->
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered" id="buscarCuadrilla" style="display: none;">
	<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
		<h3>Buscar/Modificar Cuadrilla</h3>
		<div class="col-xs-3 col-sm-4 col-md-3">
			<div class="col-xs-4 col-sm-4 col-md-4 ">
				<label style="color: #337ab7;font-weight: bold" >Cuadrilla: </label>
			</div>
			<div class="col-xs-8 col-sm-8 col-md-8 ">
				<select id="select_cuadrilla" onchange="javascript: select_cuadrilla(this.value);" class="form-control input-sm" style="float: right;"></select>
			</div>
		</div>
		<div style="text-align: left;">
			<button id="datos_comun" onclick="addDatosComunes();" class="btn btn-circle red btn-outline" disabled>
				<i class="fa fa-plus"></i> Datos Comunes
			</button>
		</div>
	</div>
	<div class="col-xs-0 col-sm-2 col-md-3">
	</div>
	<div class="col-xs-12 col-sm-8 col-md-6 portlet light">
		<div class="table-responsive">
			<h4 style="text-align: center;">Datos Cuadrilla</h4>
			<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Cuadrilla">
				<thead>
					<tr>
						<th>Codigo Cuadrilla</th>
						<th>Nombre</th>
						<th>Fecha Creacion</th>
						<th>Supervisor</th>
						<th>Estado</th>
					</tr>
				</thead>
				<tbody id="body_Cuadrilla"></tbody>
			</table>
		</div>
	</div>
	<div class="col-xs-0 col-sm-2 col-md-3">
	</div>
	<div class="col-xs-12 col-sm-12 col-md-12">
		<div class="col-xs-0 col-sm-2 col-md-3">
		</div>
		<div class="col-xs-12 col-sm-8 col-md-6" style="text-align: center;">
			<div class="table-responsive">
				<h4 style="align: center;">Miembros Cuadrilla</h4>
				<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Miembros">
					<thead>
						<tr>
							<th>Codigo Trabajador</th>
							<th>Rut</th>
							<th>Nombre</th>
							<th>Apellido</th>
							<th colspan="2">Opciones</th>
						</tr>
					</thead>
					<tbody id="body_Miembros"></tbody>
				</table>
			</div>
			<div style="text-align: center; display: none;" id="addTrabCuadrilla">
				<input type="text" name="asignCuadrilla" id="addtrabajdor" placeholder="Agregar Trabajador" class="form-control input-circle">
			</div>
			<div style="text-align: center;" class="portlet light">
				<a onclick="javascript: update()" class="btn btn-circle red btn-outline">
					<i class="fa fa-refresh"></i> Actualizar Cuadrilla
				</a>
			</div>
		</div>
		<div class="col-xs-0 col-sm-2 col-md-3">
		</div>
	</div>
	
	
	<div class="col-xs-12 col-sm-12 col-md-12" id="datos_comunes" style="display: none;">
		<h3 style="text-align: center; border-bottom: 10px;">Agregar Datos comunes</h3>
		<div class="col-xs-12 col-sm-12 col-md-12">
			<div class="col-xs-12 col-sm-12 col-md-12 portlet light" style="margin-bottom: 5px;">
				<div class="col-xs-12 col-sm-4 col-md-4 ">
					<div class="col-xs-12 col-sm-12 col-md-12">
						<label style="color: #337ab7;font-weight: bold">Fecha:</label>
					</div>
<!-- 					<div class="col-xs-12 col-sm-12 col-md-12"> -->
<!-- 						<input type="text" name="fecha" id="fecha_rendimiento_mod" class="form-control input-circle" readonly> -->
<!-- 					</div> -->
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4 ">
					<div class="col-xs-12 col-sm-12 col-md-12">
						<label style="color: #337ab7;font-weight: bold">Campo:</label>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-12">
						<select id="campo_rendimiento_mod" class="form-control input-sm" onchange="javascript: cambioCampo(this.value);"></select>
					</div>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4 ">
					<div class="col-xs-12 col-sm-12 col-md-12">
						<label style="color: #337ab7;font-weight: bold">Horas:</label>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-12">
						<input type="number" id="hora_rendimietno_mod" class="form-control input-circle">
					</div>
				</div>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-12 portlet light" style="margin-bottom: 5px;">
				<div class="col-xs-12 col-sm-4 col-md-4 ">
					<div class="col-xs-12 col-sm-12 col-md-12">
						<label style="color: #337ab7;font-weight: bold">Especie:</label>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-12">
						<select id="especie_rendimiento_mod" class="form-control input-sm" onchange="javascript: cambioEspecie(this.value);"></select>
					</div>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4 ">
					<div class="col-xs-12 col-sm-12 col-md-12">
						<label style="color: #337ab7;font-weight: bold">Variedad:</label>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-12">
						<select id="variedad_rendimiento_mos" class="form-control input-sm" onchange="javascript: cambioVariedad(this.value);"></select>
					</div>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4 ">
					<div class="col-xs-12 col-sm-12 col-md-12 ">
						<label style="color: #337ab7;font-weight: bold">Cuartel:</label>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-12 ">
						<select id="cuartel_rendimiento_mos" class="form-control input-sm" ></select>
					</div>
				</div>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-12 portlet light" style="margin-bottom: 5px;">
				<div class="col-xs-12 col-sm-4 col-md-4 ">
					<div class="col-xs-12 col-sm-12 col-md-12 ">
						<label style="color: #337ab7;font-weight: bold">Faena</label>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-12 ">
						<select id="faena_rendimiento_mod" class="form-control input-sm" onchange="javascript: cambioFaena(this.value);"></select>
					</div>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4 ">
					<div class="col-xs-12 col-sm-12 col-md-12">
						<label style="color: #337ab7;font-weight: bold">Labor:</label>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-12">
						<select id="labor_rendimiento_mod" class="form-control input-sm" ></select>
					</div>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4 ">
					<div class="col-xs-12 col-sm-12 col-md-12">
						<label style="color: #337ab7;font-weight: bold">Tipo de Pago:</label>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-12">
						<select id="pago_rendimiento_mod" class="form-control input-sm" >
							<option value="">Seleccione</option>
							<option value="1">Dia</option>
							<option value="2">Trato</option>
						</select>
					</div>
				</div>
			</div>
			<div style="text-align: center; width: 150px;">
				<a id="updDatos" onclick="javascript: updateDatos();" class="btn btn-circle red btn-outline" style="display: block;">
					<i class="fa fa-refresh"></i> Actualizar
				</a>
			</div>
		</div>
	</div>
</div>
<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>
.