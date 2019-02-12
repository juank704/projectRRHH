<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <div id="ignore" style="display: none;">
		<h3>Movimientos <small>> Liquidaciones de Sueldo > Visualizacion de Liquidaciones de Sueldo</small></h3>
	</div>
<div id="sectionLiqui">
	<div id="title">
		<h3>Movimientos <small>> Liquidaciones de Sueldo</small></h3>
	</div>
	
	
	<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
		<div class="col-xs-12 col-sm-12 col-md-3 ">
			<label style="color: #337ab7;" >Desde: </label>
			<input type="month" name="filLiq" id="liqDes" class="btn blue btn-outline btn-circle btn-sm">
		</div>
		<div class="col-xs-12 col-sm-12 col-md-3 ">
			<label style="color: #337ab7;" >Hasta: </label>
			<input type="month" name="filLiq" id="liqHas" class="btn blue btn-outline btn-circle btn-sm">
		</div>
		<div class="col-xs-12 col-sm-12 col-md-3 ">
			<label style="color: #337ab7;" >Funcionario: </label>
			<select name="filLiq" id="cantidad" class="btn blue btn-outline btn-circle btn-sm">
				<option value="">Seleccione...</option>
			</select>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-3 ">
			<a id="seLiq" title="Buscar" class="btn btn-circle red btn-outline">
				<i class="fa fa-search"></i> Buscar
			</a>
		</div>	
	</div>
	
		
	<div id="divCierre" class="col-xs-12 col-sm-12 portlet light bordered">
		<div class="table-responsive">
			<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_liqui">
				<thead>
					<th style="text-align: center;">Periodo</th>
					<th style="text-align: center;">Funcionario</th>
					<th style="text-align: center;">Total Haberes</th>
					<th style="text-align: center;">Total Descuentos</th>
					<th style="text-align: center;">Liquido</th>
					<th style="text-align: center; width: 2%;">Opciones</th>
				</thead>
				<tbody id="tblCierre">
					<tr>
						<td>08/2017</td>
						<td>Aquiles Baeza</td>
						<td>689.523</td>
						<td>89.523</td>
						<td>600.000</td>
						<td>
							<a id="" href="liqui" title="Ver Liquidacion de sueldo" class="btn btn-circle red btn-outline">
								<i class="fa fa-file-pdf-o fa-lg"></i> 
							</a>
						</td>
					</tr>
					<tr>
						<td>07/2017</td>
						<td>Ivan araya</td>
						<td>589.523</td>
						<td>89.523</td>
						<td>500.000</td>
						<td>
							<a id="" href="liqui" title="Ver Liquidacion de sueldo" class="btn btn-circle red btn-outline">
								<i class="fa fa-file-pdf-o fa-lg"></i> 
							</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	
	<div>
		
		
	<!-- 	<div id="divCierre2" style="float: right;"> -->
	<!-- 		<a id="addHaberes" title="Agregar" class="btn btn-circle red btn-outline"> -->
	<!-- 			<i class="fa fa-plus"></i> Agregar -->
	<!-- 		</a> -->
	<!-- 		<label for="importHaberes" title="Importar" class="btn btn-circle red btn-outline"> -->
	<!-- 			<i class="fa fa-cloud-upload"></i> Importar -->
	<!-- 		</label> -->
	<!-- 		<input type="file" id="importHaberes" style="display: none;"> -->
	<!-- 	</div> -->
	</div>
</div>
<div style="text-align: center;">
	<div id="divBacktLiq" style="display: none; float: left;" >
		<a id="backLiqui" title="Liquidaciones de Sueldo" class="btn btn-circle red btn-outline">
			<i class="fa fa-reply"></i> Volver
		</a>
	</div>
	<div id="divReportLiq" style="float: rigth;">
		<a id="addReportLiq" title="Generar Reporte" class="btn btn-circle yellow btn-outline">
			<i class="fa fa-file-text-o"></i> Reporte
		</a>
	</div>
<!-- 	<div id="divAsPdf" style="display: block; text-align: right;" > -->
<!-- 		<a id="" href="liqui" title="Ver como PDF" class="btn btn-circle red btn-outline"> -->
<!-- 			<i class="fa fa-file-pdf-o fa-lg"></i> Ver Liquidacion de sueldo -->
<!-- 		</a> -->
<!-- 	</div> -->
</div>


