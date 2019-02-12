<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<div class="col-xs-12 col-sm-12 col-md-12" style="text-align: center;">
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
			<div style="text-align: left;" class="">
				<div style="width: 200px" >
					<input placeholder="Agregar Trabajador" id="add_Trabakador" class="form-control">
				</div>
			</div>
			<div class="table-scrollable">
				<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Rendimiento">
					<thead>
						<tr>
							<th class='static' style="width: 84px;" scope="col"></th>
							<th class='static2'></th>
							<th class='static3' style="min-width: 125px;"></th>
						    <th class='first-col' style="display:none"></th>
							<th style="display:none"></th>
							<th></th>
							<th ></th>
							<th style="display:none" id="hxth"></th>
							<th style="min-width: 200px;" class="trHide cuartel"></th>
							<th style="min-width: 200px;" class="trHide cuartel"></th>
							<th style="min-width: 200px;" class="trHide cuartel"></th>
							<th style="min-width: 200px;" class="trHide ceco"></th>
							<th style="min-width: 200px;" class="trHide ceco"></th>
							<th class="trHide"></th>
							<th class="trHide"></th>
							<th><a id="aShow" title='Ver mas Configuraciones' onclick="trShow()"><i class="fa fa-caret-right" aria-hidden="true"></i></a></th>
							<th style="min-width: 125px;" id="valorth"></th>
							<th></th>
							<th style="min-width: 125px;"></th>
							<th style="min-width: 125px;"></th>
							<th style="min-width: 125px;" id="bonoth"></th>
							  <th style="min-width: 125px; max-width: 125px;display:none;" id="bono2th"></th>
							<th style="min-width: 125px;display:none;"></th>
							<th style="display:none"></th>
							<th></th>
							<th></th>
						</tr>
						<tr>
							<th class='static' style="width: 84px;" scope="col">Opciones</th>
<!-- 							<th></th> -->
							<th class='static2' >Rut *</th>
							<th class='static3' style="min-width: 125px;">Nombre *</th>
							<th class='first-col'>Tipo Pago *</th>
							<th>Horas Trabajadas *</th>
							<th style="min-width: 200px;" class="trHide cuartel">Especie *</th>
							<th style="min-width: 200px;" class="trHide cuartel">Variedad *</th>
							<th style="min-width: 200px;" class="trHide cuartel">Cuartel *</th>
							<th style="min-width: 200px;" class="trHide ceco">Agrupación</th>
							<th style="min-width: 200px;" class="trHide ceco">CeCO/OrdenCO *</th>
							<th class="trHide">Faena *</th>
							<th class='trHide'>Labor *</th>
							<th></th>
							 <th style="min-width: 125px;">Valor Dia *</th>
							<th><input type='checkbox' title='Seleccionar Todo' checked data-toggle="toggle"  data-size="mini" data-onstyle="success" id='checkAll' onchange='javascript: selectALL(this);' class='checkbox'/></th>
							<th style="min-width: 125px;">Rendimiento *</th>
							<th style="min-width: 125px;">Valor Rendimiento</th>
							<th style="min-width: 125px;">bono</th>
							<th style="min-width: 125px;">Valor Liquido *</th>
						</tr>
					</thead>
					<tbody id="body_Rendimiento"></tbody>
				</table>
			</div>
		</div>
		<div style="text-align: center; width: 100%;" class="col-xs-12 col-sm-12 col-md-12 portlet">
			<div style="float: left;" class="bordered">
				<div style="width: 200px" >
					<input placeholder="Agregar Trabajador" id="addTrabakador" class="form-control">
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
			<a onclick="history.back();"class="btn red">
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