<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<div class="col-md-12 portlet light bordered">
	<div class="row">
		<div class="col-md-4">
			<div class=" col-md-12">
				<h4>Empresa</h4>
			</div>
			<div class="col-md-12">
				<select id="Sociedad"
					class="form-control btn-circle btn-sm mayusculasWork">
					<option value="-1">Seleccione una Empresa</option>
				</select>
			</div>
		</div>
		<div class="col-md-4">
			<div class="col-md-12">
				<h4>Periodo proceso</h4>
			</div>
			<div class="col-md-12">
				<input autocomplete="off" type="text" placeholder="Seleccione un Periodo" id="periodoRemuneraciones"class="form-control btn-circle btn-sm mayusculasWork">
			</div>
		</div>
		<div class="col-md-4">
			<div class="col-md-12">
				<h4>Fecha Anticipo</h4>
			</div>
			<div class="col-md-12">
				<input autocomplete="off" type="text" id="fechaPago"  placeholder="Seleccione Fecha Anticipo"class="form-control btn-circle btn-sm mayusculasWork">
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-md-4">
			<div class="col-md-12">
				<h4>Huerto</h4>
			</div>
			<div class="col-md-12">
				<select id="tipodivision"
					class=" form-control btn-circle btn-sm mayusculasWork">
					<option value="-1">Seleccione HUERTO</option>
				</select>
			</div>
		</div>
		<div class="col-md-4">
			<div class="col-md-12">
				<h4>Zona</h4>
			</div>
			<div class="col-md-12">
				<select id="tiposubdivision"
					class=" form-control btn-circle btn-sm mayusculasWork">
					<option value="-1">Seleccione ZONA</option>
				</select>
			</div>
		</div>
		<div class="col-md-4">
			<div class="col-md-12">
				<h4>CECO</h4>
			</div>
			<div class="col-md-12">
				<select id="listagrupo"
					class=" form-control btn-circle btn-sm mayusculasWork">
					<option value="-1">Seleccione CECO</option>
				</select>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-md-4">
			<div class="col-md-12">
				<h4>Tipo Cuenta</h4>
			</div>
			<div class="col-md-12">
				<select id="selectTipoCuenta"
					class="row_dataCuenta form-control input-circle mayusculasWork"
					edit-type="click" name="selectTipoCuenta">
					<option value="">Seleccione...</option>

				</select>
			</div>
		</div>
		<div class="col-md-4">
			<div class="col-md-12">
				<h4>Nombre</h4>
			</div>
			<div class="col-md-12">
				<select style="width: 100%" id="nombreTrabajador"
					class="form-control input-sm input-circle mayusculasWork">
					<option value='0'>Buscar</option>
				</select>
			</div>
		</div>
		<div class="col-md-2">
		<h4 style="color:white">.</h4>
			<button class="btn btn-circle blue btn-outline idupdate" id="addAll" onclick="buscarTrabajadorByParams()">
			<i class="fa fa-search fa-lg" aria-hidden="true"> Buscar</i>
		</button>
		</div>
		<div class="col-md-2">
			<h4 style="color:white">.</h4>
		<button id="addDocumento" title="Imprimir" class="btn btn-circle green btn-outline" data-toggle="modal" onclick='javascript:ImprimirMasivo()' >
			<i class="fa fa-print fa-lg"> Imprimir</i>
		</button>	
		</div>
	</div>
</div>

<div class="table-responsive2">
	<div class="row">
  <div class="col-md-4"></div>
  <div class="col-md-4"><p style="text-align: center;">Resultado Busqueda</p></div>
</div>

	<table class="table table-bordered table-hover tzable-striped table-condensed dataTable no-footer" id="tbl_Info2">
		
		<thead>
			<tr>
			   
				<th>Fecha</th>
				<th>Cód T</th>
				<th>Trabajador</th>
				<th>Monto</th>
				<th>rut</th>
				<th>tipo_cuenta</th>
			    <td>numero cuenta</td>
			    <td>nombre banco</td>
			    <td>rut empresa</td>
			    <th style='text-align: center;'>Opciones</th>
			    <td>id tabla</td>
			</tr>
		</thead>
		<tbody id="tblPeticion2"></tbody>
	</table>
</div>

<p style="color:white">.</p>
<article id="loading" class="loading_dos" style="display: none;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>

					

							
				