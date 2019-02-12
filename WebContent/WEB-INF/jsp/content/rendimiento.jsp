<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<div  style="text-align: center;">
	<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
		<h4 style="font-weight: bold">Datos Comunes Cuadrilla</h4>
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
						<th style="min-width: 75px;">Valor</th>
						<th style="min-width: 75px;">Base Piso Dia</th>
						<th style="width: 2%;">Horas</th>
					</tr>
				</thead>
				<tbody id="body_Datos_Comunes"></tbody>
			</table>
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-12 portlet light">
		<div class="table-responsive">
			<h4 style="align: center;font-weight: bold;">Miembros Cuadrilla</h4>
			<div style="float: left;" class="">
				<div style="width: 400px" >
					<select id="add_Trabakador" class="form-control input-sm" onchange="slectAddTrab(this)">
						<option value=''></option>
						<c:if test="${not empty trabajadores}">
							<c:forEach items="${trabajadores}" var="value">
								<option value="${value.rut}">${value.rut} | ${value.nombre.toUpperCase()}</option>
							</c:forEach>
						</c:if>
					</select>
				</div>
			</div>
			<div style="float: right;">
				<div style="width: 400px" >
					<input type="text" class="form-control" placeholder="Buscar Trabajador (Nombre o Rut)" id="buscador">
				</div>
			</div>
			<div class="table-scrollable">
				<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Rendimiento">
					<thead>
						<tr>
							<th class='static-rg' scope='col'></th>
							<th class='static2-rg'></th>
							<th class='static3-rg' style="min-width: 125px;"></th>
							<th class='static4-rg' style="min-width: 200px;"></th>
							<th class='first-col-rg'></th>
							<th></th>
							<th></th>
							<th></th>
							<th style="min-width: 150px;" class="trHide" id="hxth"></th>
							<th class="trHide"></th>
							<th class="trHide"></th>
							<th class="trHide"></th>
							<th class="trHide" id="hx2th"></th>
							<th class="trHide" id="bono2th"></th>
							<th class="trHide" style="min-width: 125px; max-width: 125px;"></th>
							<th style="min-width: 200px;" class="trHide cuartel"></th>
							<th style="min-width: 200px;" class="trHide cuartel"></th>
							<th style="min-width: 200px;" class="trHide ceco"></th>
							<th style="min-width: 200px;" class="trHide ceco"></th>
							<th style="min-width: 200px;" class="trHide cuartel"></th>
							<th style="min-width: 200px;" class="trHide"></th>
							<th style="min-width: 200px;" class="trHide"></th>
							<th><a id="aShow" title='Ver mas Configuraciones' onclick="trShow()"><i class="fa fa-caret-right fa-2x" aria-hidden="true"></i></a></th>
							<th style="min-width: 125px;" id="valorth"></th>
							<th style="min-width: 125px;"></th>
							<th style="min-width: 125px;"></th>
							<th style="min-width: 125px;" id="bonoth"></th>
							<th style="min-width: 125px;"></th>
							<th style="min-width: 200px;"></th>
							<th style="min-width: 200px;"></th>
							<th></th>
						</tr>
						<tr>
							<th class='static-rg' scope='col'><input type='checkbox' title='Seleccionar Todo' checked data-toggle="toggle"  data-size="mini" data-onstyle="success" id='checkAll' onchange='javascript: selectALL(this);' class='checkbox'/></th>
							<th class='static2-rg'>Opciones</th>
							<th class='static3-rg' style="min-width: 125px;">Rut</th>
							<th class='static4-rg' style="min-width: 200px;">Nombre</th>
							<th class='first-col-rg'  style="min-width: 125px;">Base PIso Dia</th>
							<th>Tipo Pago *</th>
							<th>Cargo</th>
							<th>Horas Trabajadas *</th>
							<th style="min-width: 150px;" class="trHide">Horas Extras</th>
							<th class="trHide">Valor Hora Extra</th>
							<th class="trHide">Valor Pactado</th>
							<th class="trHide">Monto Hora Extra</th>
							<th class="trHide">Horas Extras 2</th>
							<th class="trHide">Valor Hora Extra 2</th>
							<th class="trHide" style="min-width: 125px; max-width: 125px;">Bono 2</th>
							<th style="min-width: 200px;" class="trHide cuartel">Especie *</th>
							<th style="min-width: 200px;" class="trHide cuartel">Variedad *</th>
							<th style="min-width: 200px;" class="trHide ceco">Agrupación</th>
							<th style="min-width: 200px;" class="trHide ceco">CeCO/OrdenCO *</th>
							<th style="min-width: 200px;" class="trHide cuartel">Cuartel *</th>
							<th style="min-width: 200px;" class="trHide">Faena *</th>
							<th style="min-width: 200px;" class='trHide'>Labor *</th>
							<th></th>
							<th style="min-width: 125px;">Valor Dia *</th>
							<th style="min-width: 125px;">Rendimiento *</th>
							<th style="min-width: 125px;">Valor Rendimiento</th>
							<th style="min-width: 125px;">Bono</th>
							<th style="min-width: 125px;">Valor Liquido *</th>
							<th style="min-width: 200px;">Maquinaria</th>
							<th style="min-width: 200px;">Implemento</th>
							<th>Bus</th>
						</tr>
					</thead>
					<tbody id="body_Rendimiento" style="max-height: 450px!important; overflow: auto;">
						<c:if test="${not empty rg}">
							<c:forEach items="${rg.trab}" var="v" varStatus="k">
								<tr id="${k.index}">
									<td class='static-rg'><input name='check' type='checkbox' checked value="${k.index}" title='Seleccionar' id="check${k.index}" onchange="selectTr(this, tr${k.index});" class='checkbox'/></td>
									<td class='static2-rg'><button title='Agregar Actividad a este trabajador' onclick="apendTabla(${v.toString()})" class='btn blue btn-outline btn-sm'><i class='fa fa-plus' aria-hidden='true'></i></button>
										<button title='Eliminar actividad de este Trabajaddor' onclick="delActivity(${k.index});" class='btn red btn-outline btn-sm'><i class='fa fa-minus' aria-hidden='true'></i></button></td>
									<td class='static3-rg rut' style='font-weight: bold'>${v.rut}</td>
									<td class='static4-rg' id="nombre${k.index}" style='font-weight: bold'>${v.nombre}</td>
									<td class='first-col-rg'>
										<div name='divHas' id="baseDiv${k.index}" class=''>
											<select id="basePiso${k.index}" style='min-width: 125px; max-width: 125px; float: left;' class='form-control input-sm' onchange='calcularValor(this, ${k.index});'><option value=''>Seleccione</option><option value='1'>Si</option><option value='2'>No</option></select>
										</div>
									</td>
									<td>
										<select id="tipo_pago${k.index}" name='tippag' class='form-control input-sm' onchange='calcularValor(this, ${k.index});'>
											<option value=''></option>
											<option value='1'>Dia</option>
											<option value='2'>Trato</option>
											<option value='3'>Mixto</option>
										</select>
									</td>
									<td><button style='float: right;' onclick='changeBaseBtn(${k.index});' id='btnCambio${k.index}' class='btn blue btn-outline btn-sm'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></button><input type='hidden' value="${v.cargo}" id='cargo${k.index}'></td>
									<td>
										<div name='divHas' id='hoursDiv${k.index}' class='input-group has-feedback'>
											<input type='text' min='0' onkeyup='calcularValor(this, ${k.index});' onkeydown='mover(event, this, ${k.index})' class='form-control input-sm has-error' id='horas_trabajadas${k.index}'>
											<span title='Las horas trabajadas exceden las 9 horas diarias' id='hours${k.index}' style='display: none;' class='input-group-addon btn-sm btn btn-outline yellow'>
												<i class='fa fa-exclamation-triangle fa-yellow' aria-hidden='true'></i>
											</span>
										</div>
									</td>
									<td class='trHide'>
										<input type='text' onkeydown='mover(event, this, ${k.index})' min='0' style='min-width: 110px; max-width: 110px; float: left;' onkeyup='calcularValor(this, ${k.index});' class='form-control input-sm number hrx' id='horas_extras${k.index}'>
										<a title='Ver resumen Semanal' style='color: #008000;' onclick="detalleHxSemana(${v.toString()})" id='hx_restante${k.index}'>${v.hx_semana}</a>
									</td>
									<td class='trHide'>
										<div class='input-icon input-icon-sm'>
											<i class='fa fa-usd'></i>
											<input type='text' readonly value='' class='form-control input-sm number' id='valor_hx${k.index}'>
										</div>
									</td>
									<td class='trHide'>
										<div class='input-icon input-icon-sm'>
											<i class='fa fa-usd'></i>
											<input type='text' class='form-control input-sm number' onblur='calcularValor(this, ${k.index});' id='valor_hx_pdo${k.index}'>
										</div>
									</td>
									<td class='trHide'>
										<div class='input-icon input-icon-sm'>
											<i class='fa fa-usd'></i>
											<input type='text' class='form-control input-sm number' id='monto_hx${k.index}'>
										</div>
									</td>
									<td class='trHide'>
										<input type='text' min='0' onkeyup='calcularValor(this, ${k.index});' class='form-control input-sm number hx_dos' id='hx_dos${k.index}'>
									</td>
									<td class='trHide'>
										<div class='input-icon input-icon-sm'>
											<i class='fa fa-usd'></i>
											<input type='text' value='' class='form-control input-sm number bono_dos' id='valor_hx_dos${k.index}'>
										</div>
									</td>
									<td class='trHide'>
										<div class='input-icon input-icon-sm'>
											<i class='fa fa-usd'></i>
											<input type='text' readonly min='0' onkeyup='calcularValor(this, ${k.index});' class='form-control input-sm number bono_hx_dos' id='bono_dos${k.index}'>
										</div>
									</td>
									<td class='trHide cuartel'>
										<select id='especie${k.index}' style='min-width: 150px; max-width: 150px;' name='esp' class='form-control input-sm' onchange='changeEspecie(this.value,${k.index});'>
											<option value=''></option>
											<c:if test="${not empty actualSesion}">
												<c:forEach items="${actualSesion.especie}" var="especieValue">
													<option value="${especieValue.codigo}">${especieValue.especie}</option>
												</c:forEach>
											</c:if>
										</select>
									</td>
									<td class='trHide cuartel'>
										<select id='variedad${k.index}' style='min-width: 150px; max-width: 150px;' name='varie' class='form-control input-sm' onchange='changeVariedad(this.value, ${k.index});'></select>
									</td>
									<td class='trHide ceco'>
										<select id='macro${k.index}' style='min-width: 150px; max-width: 150px;' name='esp' class='form-control input-sm' onchange='selectMacro(this,${k.index});'></select>
									</td>
									<td class='trHide ceco'>
										<select id='ceco${k.index}' style='min-width: 150px; max-width: 150px;' name='esp' class='form-control input-sm'></select>
									</td>
									<td class='trHide cuartel'>
										<select id='cuartel${k.index}' style='min-width: 150px; max-width: 150px;' name='cuar' class='form-control input-sm' ></select>
									</td>
									<td class='trHide'>
										<select id='faena${k.index}' style='min-width: 150px; max-width: 150px;' name='fae' class='form-control input-sm' onchange='cambioFaena(this.value,${k.index});'>
											<option value=''></option>
											<c:if test="${not empty faena}">
												<c:forEach items="${faena}" var="faena">
													<option value="${faena.codigo}">${faena.faena}</option>
												</c:forEach>
											</c:if>
										</select>
									</td>
									<td class='trHide'>
										<select id='labor${k.index}' style='min-width: 150px; max-width: 150px;' name='lab' class='form-control input-sm' onchange='changeLabor(this.value, ${k.index});'></select>
									</td>
									<td></td>
									<td><div name='divHas' id='val${k.index}' class='input-icon input-icon-sm'>
										<i class='fa fa-usd'></i>
										<input type='text' min='0' onkeyup='calcularValor(this, ${k.index});' class='form-control input-sm number valor' value='' id='valor${k.index}'>
									</div></td>
									<td><div name='divHas' id='rend${k.index}' class=''>
										<input type='text' min='0' onkeyup='calcularValor(this, ${k.index});' onkeydown='mover(event, this, ${k.index})' class='form-control input-sm number rendimiento move' value='' id='rendimiento${k.index}'>
									</div></td>
									<td><div class='input-icon input-icon-sm'>
										<i class='fa fa-usd'></i>
										<input type='text' min='0' onkeyup='calcularValor(this, ${k.index});' class='form-control input-sm number' id='valor_rendimiento${k.index}' readonly>
									</div></td>
									<td><div class='input-icon input-icon-sm'>
										<i class='fa fa-usd'></i>
										<input type='text' min='0' onkeyup='calcularValor(this, ${k.index});' class='form-control input-sm number bono' id='bono${k.index}'>
									</div></td>
									<td><div name='divHas' id='val_liq${k.index}' class='input-icon input-icon-sm'>
										<i class='fa fa-usd'></i>
										<input type='text' min='0' readonly class='form-control input-sm number required liquido' id='valor_liquido${k.index}'>
									</div></td>
									<td><select id='maquinaria${k.index}' style='min-width: 150px; max-width: 150px;' onchange='cambiarColor(this)' class='form-control input-sm'></select></td>
									<td><select id='implemento${k.index}' style='min-width: 150px; max-width: 150px;' onchange='cambiarColor(this)' class='form-control input-sm'></select></td>
									<td><select id='bus${k.index}' style='min-width: 150px; max-width: 150px;' class='form-control input-sm'></select></td>
								</tr>
							</c:forEach>
						</c:if>
					</tbody>
				</table>
			</div>
		</div>
		<div style="text-align: center; width: 100%;" class="col-xs-12 col-sm-12 col-md-12 portlet">
			<div style="float: left;text-align: left;" class="bordered">
				<div style="width: 400px" >
					<select id="addTrabakador" class="form-control input-sm" onchange="slectAddTrab(this)">
						<option value=''></option>
						<c:if test="${not empty trabajadores}">
							<c:forEach items="${trabajadores}" var="value">
								<option value="${value.rut}">${value.rut} | ${value.nombre.toUpperCase()}</option>
							</c:forEach>
						</c:if>
					</select>
				</div>
			</div>
			<div style="float: right;" class="">
				<div style="width: 200px" >
					Total Liquido
					<div class='input-icon'>
						<i class='fa fa-usd'></i>
						<input type="text" readonly class="form-control number required" onkeyup='calcularValor(this);' id="total_liquidos">
					</div>
				</div>
			</div>
			<div style="float: right;" class="">
				<div style="width: 200px" >
					Total Bonos
					<div class='input-icon'>
						<i class='fa fa-usd'></i>
						<input type="text" readonly class="form-control number required" onkeyup='calcularValor(this);' id="total_bonos">
					</div>
				</div>
			</div>
		</div>
		<div style="text-align: center;" class="">
			<a onclick="javascript: asignarRendimiento()" class="btn green-dark">
				<i class="icon-cloud-upload"></i> Guardar Rendimiento
			</a>
			<button id="recRendimiento" onclick="javascript: rechazar();" class="btn red">
				<i class="fa fa-times"></i> Rechazar 
			</button>
			<a href="AsignarCuadrilla" class="btn red">
				<i class="fa fa-reply" aria-hidden="true"></i> Cancelar 
			</a>
		</div>
	</div>
</div>
<div id="tdAdd" style="display: none;">
</div>
<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>

<label style="color: #FFFFFF;">.</label>

<script type="text/javascript">
	var arrTrabCampo = ${trabajadores};
	var FAENA = ${faena};
	var LABOR_RG = ${labor};
	var codigo_rg = ${rg.codigo};
	var estado_rg = ${rg.estado};
// 	var fecha_creacion = ${rg.fecha_creacion};
	var supervisor = ${rg.supervisor};
	var rendimiento_rg = {
		codigo: codigo_rg,
		estado: estado_rg,
// 		fecha_creacion: fecha_creacion,
		supervisor: supervisor
	}
	var trab = ${rg.trab};
	var rd = ${rg.rd};
	var rg = ${rg.rendimiento_general};
	rendimiento_rg.rd = rd;
	rendimiento_rg.rendimiento_general = rg;
	rendimiento_rg.trab = trab;
</script>