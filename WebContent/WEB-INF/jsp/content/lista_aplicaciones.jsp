<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
  <div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	<!--  <h4>Filtros</h4>-->
	<div class="col-xs-12 col-sm-6 col-md-3 ">
		<label style="color: #337ab7;" >Campo: </label>
		<div style="width: 100%;">
			<select class="form-control input-sm" id="dataHuerto" onchange="javascript: cambioCampo(this.value);"></select>
		</div>
	</div>
	<!-- <div class="col-xs-12 col-sm-6 col-md-3 ">
		<label style="color: #337ab7;" >Sector: </label>
		<div style="width: 100%;">
			<select class="form-control input-sm" id="sectorFilter" onchange="javascript: filterTable(this.value);"></select>
		</div>
	</div>
	<div class="col-xs-12 col-sm-6 col-md-3 ">
		<label style="color: #337ab7;" >Especie: </label>
	<div style="width: 100%;">
			<select class="form-control input-sm" id="especieFilter" onchange="javascript: cambioEspecie(this.value);"></select>
		</div>
	</div>
	<div class="col-xs-12 col-sm-6 col-md-3 ">
		<label style="color: #337ab7;" >Variedad: </label>
		<div style="width: 100%;">
			<select class="form-control input-sm" id="variedadFilter" onchange="javascript: filterTable(this.value);"></select>
		</div>
	</div> -->
</div>
<div class="table-scrollable" id="ignore">
	<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_RendimientoVlidadr">
		<thead>
			<tr>
				<th>N° de Orden</th>
				<th>N° de Programa</th>
				<th>N° de Reserva</th>
				<th>Campo</th>
				<th>Nombre de aplicador</th>
				<th>Fecha según programa</th>
				<th>Estado Fenológico</th>
				<!--  <th>Fecha estimada de cosecha</th>-->
				<th>Mercado</th>
				<th>Forma de Aplicacion</th>
				<th>Estado</th>				
				<th id='exclude' style="width: 10%;"></th>
			</tr>
		</thead>
		<tbody id="tblListaAplicaciones"></tbody>
	</table> 
</div>
<div id="jspdf" style="display:none">	
	<table style="width:1200px">
		<tr>
			<td style="width:25%"><b >AGRI. SAN CLEMENTE</b></td>	
			<td style="width:50%"></td>
			<td style="width:12%"></td>
			<td style="width:13%"></td>						
		</tr>
		<tr>
			<td><b>TEMP 2018/2019</b></td>
			<td>ORDEN APLICACIÓN PRODUCTO AGROQUÍMICOS Y FERLTILIZANTE</td>
			<td><b>NRO ORDEN</b></td>
			<td><b id="norden">XXX</b>	</td>
		</tr>
		<tr>
			<td><b>DE:</b></td>
			<td><label id="jefeAplicacion"></label></td>
			<td colspan="2"><b id="nprograma">TIPO PROGRAMA N° INSECTICIDA</b>	</td>
		</tr>
		<tr>
			<td style="width:20%"><b>PARA:</b></td>
			<td style="width:60%"><label id="aplicador"></label></td>
			<td style="width:10%"></td>
			<td style="width:10%"></td>
		</tr>
		<tr>
			<td style="width:20%"><b>PREDIO:</b></td>
			<td style="width:60%"><label id="campo"></label></td>
			<td style="width:10%"></td>
			<td style="width:10%"></td>
		</tr>
		<tr>
			<td style="width:20%"><b>FECHA RECOMENDACIÓN APLICACIÓN:</b></td>
			<td style="width:60%"><label id="fechaEstimada"></label></td>
			<td style="width:10%"></td>
			<td style="width:10%"></td>
		</tr>
		<tr>
			<td style="width:20%"><b>FECHA INICIO APLICACIÓN:</b></td>
			<td style="width:60%"><label id="fechaInicio"></label></td>
			<td style="width:10%"></td>
			<td style="width:10%"></td>
		</tr>
		<tr>
			<td style="width:20%"><b>FORMA DE APLICACIÓN:</b></td>
			<td style="width:60%"><label id="forma"></label></td>
			<td style="width:10%"></td>
			<td style="width:10%"></td>
		</tr>
	</table>
	<table style="width:1100px" class="table table-bordered table-hover table-striped table-condensed">
		<thead>
			<tr>
				<th style="background-color:#D7DBDD;font-weight: bold;">NOMBRE COMERCIAL</th>
				<th style="background-color:#D7DBDD;font-weight: bold;">INGREDIENTE ACTIVO</th>
				<th style="background-color:#D7DBDD;font-weight: bold;">DOSIS (100)</th>
				<th style="background-color:#D7DBDD;font-weight: bold;">DOSIS POR Ha</th>
				<th style="background-color:#D7DBDD;font-weight: bold;">DOSIS POR BOMBADA</th>
				<th style="background-color:#D7DBDD;font-weight: bold;">CAPACIDAD MÁQUINA</th>
				<th style="background-color:#D7DBDD;font-weight: bold;">CONTROL</th>
				<th style="background-color:#D7DBDD;font-weight: bold;">APLICACIÓN NRO</th>
				<th style="background-color:#D7DBDD;font-weight: bold;">A RETIRAR BODEGA</th>
				<th style="background-color:#D7DBDD;font-weight: bold;">UNIDAD MEDIDA</th>	
			</tr>
		</thead>
		<tbody id="detalleMaterial"></tbody>
	</table> 
	<table style="width:600px" class="table table-bordered table-hover table-striped table-condensed">
		<thead>
			<tr style=" border-color:black;">
				<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;width:35%">CUARTEL</th>
				<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;width:8%">HAS</th>
				<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;width:17%">VARIEDAD</th>
				<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;width:20%">E. FENLÓGICO</th>
				<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;width:20%">MOJAMIENTO X Ha</th>
			</tr>
		</thead>
		<tbody id="detalleCuartel"></tbody>
	</table>
	<table class="table table-bordered table-hover table-striped table-condensed">
		<thead>
			<tr>
				<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">NOMBRE APLICADOR</th>
				<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">TRACTOR</th>
				<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">IMPLEMENTO</th>
				<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">CAMBIO TRACTOR</th>
				<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">MARCHA TRACTOR</th>
				<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">PRESION BOMBA</th>
				<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">VELOCIDAD</th>
			</tr>
		</thead>
		<tbody id="detalleEquipo"></tbody>
	</table>
	<table style="width:1200px">
		<tr>
			<td style="width:70%">
				<table class="table table-bordered table-hover table-striped table-condensed">
					<thead>
						<tr>
							<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">VARIEDAD</th>
							<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">FECHA ESTIMADA</th>
							<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">FECHA VIABLE</th>
							<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">DIAS A COSECHA</th>
							<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">DIAS CARENCIA</th>
							<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">MERCADO CONTROL AP</th>
							<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">HORAS REINGRESO</th>
						</tr>
					</thead>
					<tbody id="detalleVariedad"></tbody>
				</table>
			</td>
			<td style="width:30%">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<b>PRECAUCIONES:</b>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<b>USAR EQUIPOS DE PROTECCIÓN SEGUN PICTOGRAMA</b>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<b>DE LA ETIQUETA Y PRODUCTO RECOMENDADO</b>
				</div>
			</td>
		</tr>
	</table>
	<div style="height:40px"></div>
	<table style="width:1200px">
		<tr>
			<td style="width:20%"></td>
			<td style="width:20%"><b>OBSERVACIÓN:</b></td>
			<td style="width:30%" id="observacion"></td>
			<td style="width:30%"></td>
		</tr>
	</table> 
	<div style="height:40px"></div>
	<table style="width:1200px">
		<tr>
			<td style="width:33%"><b style="align:center">V° B° RESPONSABLE ORDEN APLICACIÓN</b></td>
			<td style="width:33%"><b style="align:center">V° B° RESPONSABLE ORDEN APLICACIÓN</b></td>
			<td style="width:33%"><b style="align:center">V° B° RESPONSABLE ORDEN APLICACIÓN</b></td>
		</tr>
		<tr>
			<td style="width:33%"><b style="align:center">ADMINISTRADOR</b></td>
			<td style="width:33%"><b style="align:center">JEFE HUERTO O</b></td>
			<td style="width:33%"><b style="align:center">BODEGA</b></td>
		</tr>
		<tr>
			<td style="width:33%"><b style="align:center"></b></td>
			<td style="width:33%"><b style="align:center">ENCARGADO APLICACIONES</b></td>
			<td style="width:33%"><b style="align:center"></b></td>
		</tr>
	</table> 
</div>
<div id="jspdfC" style="display:none">	
	<table style="width:1200px">
		<tr>
			<td style="width:25%"><b >AGRI. SAN CLEMENTE</b></td>	
			<td style="width:50%"></td>
			<td style="width:12%"></td>
			<td style="width:13%"></td>						
		</tr>
		<tr>
			<td><b>TEMP 2018/2019</b></td>
			<td>ORDEN APLICACIÓN PRODUCTO AGROQUÍMICOS Y FERLTILIZANTE</td>
			<td><b>NRO ORDEN</b></td>
			<td><b id="nordenC">XXX</b>	</td>
		</tr>
		<tr>
			<td><b>DE:</b></td>
			<td><label id="jefeAplicacionC"></label></td>
			<td colspan="2"><b id="nprogramaC">TIPO PROGRAMA N° INSECTICIDA</b>	</td>
		</tr>
		<tr>
			<td style="width:20%"><b>PARA:</b></td>
			<td style="width:60%"><label id="aplicadorC"></label></td>
			<td style="width:10%"></td>
			<td style="width:10%"></td>
		</tr>
		<tr>
			<td style="width:20%"><b>PREDIO:</b></td>
			<td style="width:60%"><label id="campoC"></label></td>
			<td style="width:10%"></td>
			<td style="width:10%"></td>
		</tr>
		<tr>
			<td style="width:20%"><b>FECHA RECOMENDACIÓN APLICACIÓN:</b></td>
			<td style="width:60%"><label id="fechaEstimadaC"></label></td>
			<td style="width:10%"></td>
			<td style="width:10%"></td>
		</tr>
		<tr>
			<td style="width:20%"><b>FECHA INICIO APLICACIÓN:</b></td>
			<td style="width:60%"><label id="fechaInicioC"></label></td>
			<td style="width:10%"></td>
			<td style="width:10%"></td>
		</tr>
		<tr>
			<td style="width:20%"><b>FORMA DE APLICACIÓN:</b></td>
			<td style="width:60%"><label id="formaC"></label></td>
			<td style="width:10%"></td>
			<td style="width:10%"></td>
		</tr>
	</table>
	<table style="width:1100px" class="table table-bordered table-hover table-striped table-condensed">
		<thead>
			<tr>
				<th style="background-color:#D7DBDD;font-weight: bold;">NOMBRE COMERCIAL</th>
				<th style="background-color:#D7DBDD;font-weight: bold;">INGREDIENTE ACTIVO</th>
				<th style="background-color:#D7DBDD;font-weight: bold;">DOSIS (100)</th>
				<th style="background-color:#D7DBDD;font-weight: bold;">DOSIS POR Ha</th>
				<th style="background-color:#D7DBDD;font-weight: bold;">DOSIS POR BOMBADA</th>
				<th style="background-color:#D7DBDD;font-weight: bold;">CAPACIDAD MÁQUINA</th>
				<th style="background-color:#D7DBDD;font-weight: bold;">CONTROL</th>
				<th style="background-color:#D7DBDD;font-weight: bold;">APLICACIÓN NRO</th>
				<th style="background-color:#D7DBDD;font-weight: bold;">A RETIRAR BODEGA</th>
				<th style="background-color:#D7DBDD;font-weight: bold;">UNIDAD MEDIDA</th>	
			</tr>
		</thead>
		<tbody id="detalleMaterialC"></tbody>
	</table> 
	<table style="width:600px" class="table table-bordered table-hover table-striped table-condensed">
		<thead>
			<tr style=" border-color:black;">
				<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;width:35%">CUARTEL</th>
				<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;width:8%">HAS</th>
				<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;width:17%">VARIEDAD</th>
				<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;width:20%">E. FENLÓGICO</th>
				<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;width:20%">MOJAMIENTO X Ha</th>
			</tr>
		</thead>
		<tbody id="detalleCuartelC"></tbody>
	</table>
	<table class="table table-bordered table-hover table-striped table-condensed">
		<thead>
			<tr>
				<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">NOMBRE APLICADOR</th>
				<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">TRACTOR</th>
				<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">IMPLEMENTO</th>
				<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">CAMBIO TRACTOR</th>
				<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">MARCHA TRACTOR</th>
				<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">PRESION BOMBA</th>
				<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">VELOCIDAD</th>
			</tr>
		</thead>
		<tbody id="detalleEquipoC"></tbody>
	</table>
	<table style="width:1200px">
		<tr>
			<td style="width:70%">
				<table class="table table-bordered table-hover table-striped table-condensed">
					<thead>
						<tr>
							<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">VARIEDAD</th>
							<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">FECHA ESTIMADA</th>
							<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">FECHA VIABLE</th>
							<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">DIAS A COSECHA</th>
							<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">DIAS CARENCIA</th>
							<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">MERCADO CONTROL AP</th>
							<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">HORAS REINGRESO</th>
						</tr>
					</thead>
					<tbody id="detalleVariedadC"></tbody>
				</table>
			</td>
			<td style="width:30%">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<b>PRECAUCIONES:</b>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<b>USAR EQUIPOS DE PROTECCIÓN SEGUN PICTOGRAMA</b>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<b>DE LA ETIQUETA Y PRODUCTO RECOMENDADO</b>
				</div>
			</td>
		</tr>
	</table>
	<div style="height:40px"></div>
	<table style="width:1200px">
		<tr>
			<td style="width:20%"></td>
			<td style="width:20%"><b>OBSERVACIÓN:</b></td>
			<td style="width:30%" id="observacionC"></td>
			<td style="width:30%"></td>
		</tr>
	</table> 
	<div style="height:40px"></div>
	<table style="width:1200px">
		<tr>
			<td style="width:33%"><b style="align:center">V° B° RESPONSABLE ORDEN APLICACIÓN</b></td>
			<td style="width:33%"><b style="align:center">V° B° RESPONSABLE ORDEN APLICACIÓN</b></td>
			<td style="width:33%"><b style="align:center">V° B° RESPONSABLE ORDEN APLICACIÓN</b></td>
		</tr>
		<tr>
			<td style="width:33%"><b style="align:center">ADMINISTRADOR</b></td>
			<td style="width:33%"><b style="align:center">JEFE HUERTO O</b></td>
			<td style="width:33%"><b style="align:center">BODEGA</b></td>
		</tr>
		<tr>
			<td style="width:33%"><b style="align:center"></b></td>
			<td style="width:33%"><b style="align:center">ENCARGADO APLICACIONES</b></td>
			<td style="width:33%"><b style="align:center"></b></td>
		</tr>
	</table> 
</div>
<!--  <div id="jspdfCC" style="display:none">
	<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered" >
		<div class="col-xs-12 col-sm-12 col-md-12">
			<div class="col-xs-12 col-sm-6 col-md-2 " style="text-align:left">
				<b >AGRI. SAN CLEMENTE</b>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12">
			<div class="col-xs-12 col-sm-6 col-md-2" style="text-align:left">
				<b>TEMP 2018/2019</b>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-7">
				
			</div>
			<div class="col-xs-12 col-sm-6 col-md-1" style="text-align:left">
				<b>NRO ORDEN</b>			
			</div>
			<div class="col-xs-12 col-sm-6 col-md-1" style="text-align:left">
				<b id="nordenC">XXX</b>			
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12">
			<div class="col-xs-12 col-sm-6 col-md-2 ">
				
			</div>
			<div class="col-xs-12 col-sm-6 col-md-7">
				<b>CONFIRMACION ORDEN APLICACION PRODUCTO AGROQUIMICOS Y FERLTILIZANTE</b>	
			</div>
			<div class="col-xs-12 col-sm-6 col-md-2 ">
				
			</div>
			<div class="col-xs-12 col-sm-6 col-md-2 " style="text-align:left">
				<b id="nprogramaC">TIPO PROGRAMA N° INSECTICIDA</b>	
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12">
			<div class="col-xs-12 col-sm-6 col-md-2 ">
				
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12">
			<div class="col-xs-12 col-sm-6 col-md-2 " style="text-align:left">
				<b>DE:</b>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-2 " style="text-align:left">
				<label id="jefeAplicacionC">SEBASTIAN ROJAS ARAVENA</label>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12">
			<div class="col-xs-12 col-sm-6 col-md-2 " style="text-align:left">
				<b>PARA:</b>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-2 " style="text-align:left">
				<label id="aplicadorC">SEBASTIAN ROJAS ARAVENA</label>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12">
			<div class="col-xs-12 col-sm-6 col-md-2 " style="text-align:left">
				<b>PREDIO:</b>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-2 " style="text-align:left">
				<label id="campoC">SAN JOSE</label>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12">
			<div class="col-xs-12 col-sm-6 col-md-2 " style="text-align:left">
				<b>FECHA RECOMENDACION APLICACION:</b>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-2 " style="text-align:left">
				<label id="fechaEstimadaC">XX/XX/XXXX</label>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12">
			<div class="col-xs-12 col-sm-6 col-md-2 " style="text-align:left">
				<b>FECHA INICIO APLICACION:</b>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-2 " style="text-align:left">
				<label id="fechaInicioC">XX/XX/XXXX</label>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12">
			<div class="col-xs-12 col-sm-6 col-md-2 " style="text-align:left">
				<b>FORMA DE APLICACION:</b>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-2 " style="text-align:left">
				<label id="formaC">NEBULIZADORA</label>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12">	
			<div class="table-responsive" id="ignore">
				<table class="table table-bordered table-hover table-striped table-condensed">
					<thead>
						<tr>
							<th style="font-weight: bold;">NOMBRE COMERCIAL</th>
							<th style="font-weight: bold;">INGREDIENTE ACTIVO</th>
							<th style="font-weight: bold;">DOSIS (100)</th>
							<th style="font-weight: bold;">DOSIS POR Ha</th>
							<th style="font-weight: bold;">DOSIS POR BOMBADA</th>
							<th style="font-weight: bold;">CAPACIDAD MAQUINA</th>
							<th style="font-weight: bold;">CONTROL</th>
							<th style="font-weight: bold;">APLICACION NRO</th>
							<th style="font-weight: bold;">A RETIRAR BODEGA</th>
							<th style="font-weight: bold;">UNIDAD MEDIDA</th>	
						</tr>
					</thead>
					<tbody id="detalleMaterialC"></tbody>
				</table> 
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12">
			<div class="col-xs-12 col-sm-12 col-md-6">
				<div class="table-responsive" id="ignore">
					<table class="table table-bordered table-hover table-striped table-condensed">
						<thead>
							<tr style=" border-color:black;">
								<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">CUARTEL</th>
								<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">HAS</th>
								<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">VARIEDAD</th>
								<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">ESTADO FENLOGICO</th>
								<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">MOJAMIENTO X Ha</th>
							</tr>
						</thead>
						<tbody id="detalleCuartelC"></tbody>
					</table> 
				</div>
			</div>
			 <div class="col-xs-12 col-sm-12 col-md-6">
			 	<div class="table-responsive" id="ignore">
					<table class="table table-bordered table-hover table-striped table-condensed">
						<thead>
							<tr>
								<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">NOMBRE APLICADOR</th>
								<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">TRACTOR</th>
								<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">IMPLEMENTO</th>
								<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">CAMBIO TRACTOR</th>
								<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">MARCHA TRACTOR</th>
								<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">PRESION BOMBA</th>
								<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">VELOCIDAD</th>
							</tr>
						</thead>
						<tbody id="detalleEquipoC"></tbody>
					</table> 
				</div>
			</div> 
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12">
			<div class="col-xs-12 col-sm-12 col-md-6">
				<div class="table-responsive" id="ignore">
					<table class="table table-bordered table-hover table-striped table-condensed">
						<thead>
							<tr>
								<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">VARIEDAD</th>
								<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">FECHA ESTIMADA</th>
								<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">FECHA VIABLE</th>
								<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">DIAS A COSECHA</th>
								<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">DIAS CARENCIA</th>
								<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">MERCADO CONTROL AP</th>
								<th style="background-color:#D7DBDD; border-color:black; font-weight: bold;">HORAS REINGRESO</th>
							</tr>
						</thead>
						<tbody id="detalleVariedadC"></tbody>
					</table> 
				</div>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<b>PRECAUCIONES:</b>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<b>USAR EQUIPOS DE PROTECCION SEGUN PICTOGRAMA</b>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<b>DE LA ETIQUETA Y PRODUCTO RECOMENDADO</b>
				</div>
			</div>
		</div>
	</div>
</div>-->
<div id="fileArea" style="display: none;"></div>
<script type="text/javascript" src="simple-excel.js"></script>
<style>
@media print
{
body * { visibility: hidden; }
.div2 * { visibility: visible; }
@page {size: landscape}
#print {display:none}
}
        
        </style>
<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>
.