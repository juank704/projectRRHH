<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!-- AGRGAR DATOS GENERALES -->
<div class="col-xs-12 col-sm-12 col-md-12" id="agregar_datos_comunes" style="display: block;">
	<h5 style="text-align: center;color: #337ab7;font-weight: bold">Marco Rendimiento</h5>
	<div class="col-xs-12 col-sm-12 col-md-12">
		<label style="color: #337ab7;font-weight: bold">Ingreso por Especie/Variedad: </label>
		<input type='checkbox' title='Con Cuartel/Sin Cuartel' checked data-toggle="toggle" id="check_ingreso" data-size="mini" data-onstyle="info" onchange='withCuartel(this);' class='checkbox'/>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-12">
		<div class="col-xs-12 col-sm-12 col-md-12 portlet">
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Fecha:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" name="fecha" id="fecha_rendimiento" onchange="resetSupervisor(this)" class="form-control fecha required no-edit bloqueo-agro" readonly>
					<label id="message" style="color: #FF0000;font-weight: bold;display: none;">Hasta 10 dias despues de hoy</label>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Campo:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id="campo_rendimiento" class="form-control input-sm required no-edit bloqueo-agro" onchange="cambioCampo(this.value);">
						<option value=''></option>
						<c:if test="${not empty actualSesion}">
							<c:forEach items="${actualSesion.campo}" var="campo">
								<option value="${campo.campo}">${campo.descripcion}</option>
							</c:forEach>
						</c:if>
					</select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3 hide-show">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Especie:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id="especie_rendimiento" class="form-control input-sm required" onchange="javascript: cambioEspecie(this.value);"></select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3 hide-show">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Variedad:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id="variedad_rendimiento" class="form-control input-sm required" onchange="javascript: cambioVariedad(this.value);"></select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3 hide-show" style="display: none;">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Agrupación:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id="macro" class="form-control input-sm required" onchange="selectMacro(this);"></select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3 hide-show" style="display: none;">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Centro de Costo / OrdenCo:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id="ceco" class="form-control input-sm required" onchange="cambioVariedad(this.value);"></select>
				</div>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12 portlet">			
			<div class="col-xs-12 col-sm-3 col-md-3 tipo_ingreso">
				<div class="col-xs-12 col-sm-12 col-md-12 ">
					<label style="color: #337ab7;font-weight: bold">Cuartel:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12 ">
					<select id="cuartel_rendimiento" onchange="cambioCuartel(this);" class="form-control input-sm required" ></select>
				</div>
			</div>		
			<div class="col-xs-12 col-sm-3 col-md-3 tipo_ingreso" style="display: none;">
				<div class="col-xs-12 col-sm-12 col-md-12 ">
					<label style="color: #337ab7;font-weight: bold">Centro de Costo:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12 ">
					<select id="ceco" onchange="cambioCuartel(this);" class="form-control input-sm required" ></select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Supervisor:</label>
				</div>
				<div  class="col-xs-12 col-sm-12 col-md-12">
					<!--  onchange="buscarCuadrillaSupervisor(this);"-->
					<select id="supervisor"  class="form-control input-sm required"></select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Trabajador:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id="addtrabajdor" class="form-control input-sm no-edit required" onchange="cargarAddTrabajador(this.value);"></select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12 ">
					<label style="color: #337ab7;font-weight: bold">Faena</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12 ">
					<select id="faena_rendimiento" class="form-control input-sm required" onchange="javascript: cambioFaena(this.value);"></select>
				</div>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12 portlet" >			
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Labor:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id="labor_rendimiento" onchange="changeLabor(this.value)" class="form-control input-sm required" ></select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Maquinaria:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id="maquinaria" class="form-control input-sm required" >
					</select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Implemento:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id="implemento" class="form-control input-sm" >
					</select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Bus:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id="bus" class="form-control input-sm " >
					</select>
				</div>
				
			</div>
			
		</div>	
</div>
<div class="col-xs-12 col-sm-12 col-md-12" id="agregar_datos_comunes" style="display: block;">
	<h5 style="text-align: center;color: #337ab7;font-weight: bold">Marco Pago</h5>
		<div class="col-xs-12 col-sm-12 col-md-12 portlet" >
			<div class="col-xs-12 col-sm-3 col-md-3">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Tipo de Pago:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id="tipo_pago" class="form-control input-sm required" onchange='calcularValor(this);' >
						<option value="">Seleccione</option>
						<option value="1">Dia</option>
						<option value="2">Trato</option>
						<option value="3">Mixto</option>
					</select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Horas:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" class="form-control number required" onkeyup='calcularValor(this);' id="horas_trabajadas">
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3 disabledbutton" id="baseDiaDiv">
				<div class="col-xs-12 col-sm-12 col-md-9">
					<label style="color: #337ab7;font-weight: bold">Valor Día:</label> 
					<input type='checkbox' title='Agregar Base Piso Dia' checked data-toggle="toggle"  data-size="mini" data-onstyle="success" onchange='javascript: basePisoAdd(this);' id="checkBasePiso" class='checkbox'/>
				</div>
				<div class="col-xs-9 col-sm-9 col-md-9">
					<div class='input-icon'>
						<i class='fa fa-usd'></i>
						<input type="text" class="form-control number required" onchange='calcularValor(this);' required id="basePiso">
					</div>
				</div>
				<div class="col-xs-2 col-sm-2 col-md-3">
					<button class="btn blue" id="btnChange" onclick="changeBaseBtn()"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Valor Trato:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<div class='input-icon'>
						<i class='fa fa-usd'></i>
						<input type="text" class="form-control number required" onkeyup='calcularValor(this);' id="valor_general">
					</div>
				</div>
			</div>
			
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12 portlet" >
			<div class="col-xs-12 col-sm-3 col-md-3">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Rendimiento:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" class="form-control number required" onkeyup='calcularValor(this);' id="rendimiento">
				</div>
			</div>
			<input type="hidden" id="cargo">
			<div class="col-xs-12 col-sm-3 col-md-3">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Valor Rendimiento:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<div class='input-icon'>
						<i class='fa fa-usd'></i>
						<input type="text" readonly class="form-control number required" onkeyup='calcularValor(this);' id="valor_rendimiento">
					</div>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Bono:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<div class='input-icon'>
						<i class='fa fa-usd'></i>
						<input type="text" class="form-control number " onkeyup='calcularValor(this);' id="bono">
					</div>
				</div>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12 portlet" >
			<div class="col-xs-12 col-sm-3 col-md-3">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Horas extras: <a id="hx_semana" title="Ver resumen Semanal" style="color: #FF0000;" onclick="detalleHxSemana();"></a></label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" class="form-control number " onkeyup='calcularValor(this);' id="horas_extras">
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Valor por Hora Extra:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<div class='input-icon'>
						<i class='fa fa-usd'></i>
						<input type="text" readonly class="form-control number " onkeyup='calcularValor(this);' id="valor_hx">
					</div>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Valor Pactado:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<div class='input-icon'>
						<i class='fa fa-usd'></i>
						<input type="text" class="form-control number " onblur='calcularValor(this);' id="valor_hx_pdo">
					</div>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Monto Horas Extras:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<div class='input-icon'>
						<i class='fa fa-usd'></i>
						<input type="text" class="form-control number " readonly onkeyup='calcularValor(this);' id="monto_hx">
					</div>
				</div>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12 portlet" >
			<div class="col-xs-12 col-sm-3 col-md-3">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Horas Extras 2:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" class="form-control number" onkeyup='calcularhxDos(this);' id="horas_hx2">
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Valor por Hora Extra 2:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<div class='input-icon'>
						<i class='fa fa-usd'></i>
						<input type="text" class="form-control number " onkeyup='calcularhxDos(this);' id="valor_hs2">
					</div>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Bono 2:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<div class='input-icon'>
						<i class='fa fa-usd'></i>
						<input type="text" class="form-control number" readonly onkeyup='calcularValor(this);' id="bono_dos">
					</div>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Valor liquido:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<div class='input-icon'>
						<i class='fa fa-usd'></i>
						<input type="text" class="form-control required" readonly id="valor_liquido">
					</div>
				</div>
			</div>
		</div>
		
		<div style="text-align: center;">
			<a id="addRendimientoGeneralTabla" onclick="addRendimientoIndividual();" class="btn btn-circle red btn-outline btn-mod submit">
				 <i class="icon-cloud-upload"></i> Agregar Rendimiento 
			</a>
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-12 portlet light">
		<div class="col-xs-12 col-sm-12 col-md-12 bordered" style ="text-align: center;">
			<h4 style="font-weight: bold; color: #337ab7;">Datos Rendimiento</h4>
			<div class="table-scrollable">
				<table class="table table-bordered table-hover table-striped table-condensed" id="tblRendimiento">
					<thead>
						<tr>
							<th style="min-width: 100px;">Fecha</th>
							<th style="min-width: 100px;">Campo</th>
							<th style="min-width: 100px;">Especie</th>
							<th style="min-width: 100px;">Variedad</th>
							<th style="min-width: 200px;">Cuartel</th>
							<th style="min-width: 150px;">Centro de Costo</th>
							<th style="min-width: 150px;">Supervisor</th>
							<th style="min-width: 100px;">Rut</th>
							<th style="min-width: 200px;">Trabajador</th>
							<th style="min-width: 100px;">Faena</th>
							<th style="min-width: 200px;">Labor</th>
							<th style="min-width: 150px;">Maquina</th>
							<th style="min-width: 150px;">Implemento</th>
							<th style="min-width: 150px;">Bus</th>
							<th style="min-width: 80px;">Horas</th>
							<th style="min-width: 80px;">Horas Extras</th>
							<th style="min-width: 80px;">Valor día</th>
							<th style="min-width: 100px;">Tipo Pago</th>
							<th style="min-width: 100px;">Valor Trato</th>
							<th style="min-width: 80px;">Rendimiento</th>
							<th style="min-width: 100px;">Valor Rendimiento</th>
							<th style="min-width: 100px;">Bono</th>
							<th style="min-width: 100px;">Bono 2</th>
							<th style="min-width: 100px;">Valor Liquido</th>
							<th style="min-width: 100px;" colspan="2">Opciones</th>
						</tr>
					</thead>
					<tbody id="bodyRendimiento"></tbody>
				</table>
			</div>
		</div>
	</div>
	<div style="text-align: center;">
		<a id="addRendimientoGeneral" onclick="guardarDatos();" class="btn btn-circle red btn-outline btn-mod">
			 <i class="icon-cloud-upload"></i> Guardar Rendimiento 
		</a>
		<a id="volcerbtn" style="display: none;" onclick="volcer();" class="btn btn-circle red btn-outline btn-mod">
			 <i class="fa fa-reply"></i> Volver
		</a>
	</div>
</div>
<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>
.