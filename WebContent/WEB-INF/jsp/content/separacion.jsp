<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<div class="row">
	<div class="col-md-12 table-responsive">
		<h4 style="text-align: center;">Datos Basicos del trabajador</h4>
		<table
			class="table table-bordered table-hover table-striped table-condensed"
			id="datatable_ajax">
			<thead>
				<tr>
					<th>Rut</th>
					<th>Nombre</th>
					<th>Empresa Actual</th>
					<th>Fecha Ingreso</th>
					<th>Fecha Termino</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody id="bodySeparacion"></tbody>
		</table>
	</div>
</div>

<h4 style="text-align: center;">Finzalizacion de Contrato</h4>

<form id="separacionForm" style="width: 70%; margin: auto;" action="#">

	<div class=row>


		<div class="col-md-2"></div>

		<div class="col-xs-12 col-sm-12 col-md-8 portlet light bordered">
			<div class="col-xs-12 col-sm-6 col-md-6 ">
				<label style="color: #337ab7;" for="rutBuss">Fecha de
					Termino:</label> <input readonly id="fechaTermino" name="fechaTermino"
					type="text" class="form-control input-circle">
			</div>
			<div class="col-xs-12 col-sm-6 col-md-6 ">
				<label style="color: #337ab7;" for="articuloBuss">Articulo:</label>
				<select id="articulo" name="articulo"
					class="form-control input-circle">
					<option value="">Seleccione...</option>
					<c:if test="${not empty listaArticuloTerminoContrato}">
						<c:forEach items="${listaArticuloTerminoContrato}" var="articuloTerminoContrato">
								<option value="${articuloTerminoContrato.idArticuloTerminoContrato}">${articuloTerminoContrato.descripcion}</option>
						</c:forEach>
					</c:if>
				</select>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-6 ">
				<label style="color: #337ab7;" for="incisoBuss">Inciso:</label>
				<select id="inciso" name="inciso" class="form-control input-circle">
				<option value="">Seleccione...</option>
				<c:if test="${not empty listaIncisoTerminoContrato}">
						<c:forEach items="${listaIncisoTerminoContrato}" var="incisoTerminoContrato">
								<option value="${incisoTerminoContrato.idIncisoTerminoContrato}">${incisoTerminoContrato.descripcion}</option>
						</c:forEach>
					</c:if>
				</select>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-6">
				<label style="color: #337ab7;" for="letraBuss">Letra:</label> 
				<select id="letra" name="letra" class="form-control input-circle">
				<option value="">Seleccione...</option>
				<c:if test="${not empty listaLetraTerminoContrato}">
						<c:forEach items="${listaLetraTerminoContrato}" var="letraTerminoContrato">
								<option value="${letraTerminoContrato.idLetraTerminoContrato}">${letraTerminoContrato.letraTerminoContrato} - ${letraTerminoContrato.descripcion} </option>
						</c:forEach>
					</c:if>
				</select>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-12">
				<label style="color: #337ab7;" for="descripcionBuss">Descipcion:</label>
				<textarea id="descripcion" class="form-control input-circle"
					rows="5" name="descripcion"></textarea>
			</div>

		</div>

		<div class="col-md-2"></div>

	</div>


	<div class="row">


		<div class="col-md-2" style=""></div>

		<div class="col-md-8" style="text-align: center;">

			<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
				<div class="col-xs-12 col-sm-4 col-md-4 ">
					<label style="color: #337ab7;" for="fechaPago">Fecha de
						Pago:</label> <input readonly id="fechaPago" name="fechaPago" type="text"
						class="form-control input-circle">
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4 ">
					<label style="color: #337ab7;" for="rutBuss">Lugar de Pago:</label>
					<input id="lugarPago" type="text" class="form-control input-circle"
						name="lugarPago">
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4 ">
					<label style="color: #337ab7;" for="horaPago">Hora de Pago:</label>
					<input readonly id="horaPago" type="text"
						class="form-control input-circle" name="horaPago">
				</div>
			</div>

			<div class="col-md-2"></div>

			<div class="col-xs-4 col-sm-4 col-md-12" style="text-align: center;">
				<div>
					<button id="addBuss" class="btn btn-circle green btn-outline"
						type="submit">
						<i class="icon-cloud-upload"></i> Guardar
					</button>
					<a onclick="javasript: history.back();"
						class="btn btn-circle red btn-outline"> <i class="fa fa-times"></i>
						Cancelar
					</a>
				</div>
			</div>


		</div>

		<div class="col-md-2"></div>

	</div>

</form>

<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>

</article>








