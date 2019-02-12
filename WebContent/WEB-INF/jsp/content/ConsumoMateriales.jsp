<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<div class="col-xs-12 col-sm-12 col-md-12" id="agregar_datos_comunes" style="display: block;">

	<div class="col-xs-12 col-sm-12 col-md-12">
		<div class="col-xs-12 col-sm-12 col-md-12 portlet">
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Fecha:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<input type="text" name="fecha" class="form-control" id=fecha_consumo readonly="readonly" >
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Campo:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id='campo'  class='form-control' onchange="onchangeCampo(this)">		
					</select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7; float: left;font-weight: bold">Solicitante:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id='solicitante'  class='form-control input-sm' >		
					</select>
				</div>
			</div>
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-12">
		<div class="col-xs-12 col-sm-12 col-md-12 portlet">
			
			
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Especie:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id='especie'  class='form-control' onchange="onchangeEspecie(this)">		
					</select>
				</div>
			</div>		
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Variedad:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id='variedad'  class='form-control2 input-sm2 col-md-12' onchange="onchangeVariedad(this)">		
					</select>
				</div>
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<label style="color: #337ab7;font-weight: bold">Familia Material:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12">
					<select id='familia'  class='form-control input-sm' onchange="getMaterial(this.value)">
						<option value='0'>Seleccione</option>
						<option value='ZHER'>Herramientas</option>	
						<option value='ZMCO'>Materiales de Construcción</option>	
						<option value='ZMHU'>Materiales de Huerto</option>	
						<option value='ZREP'>Repuesto</option>	
						<option value='HIBE'>Material aux/combustible</option>
						<option value='ZEPP'>EPP</option>
						<option value='LEER'>Materiales de embalaje</option>	
								
					</select>
				</div>
			</div>
			
		</div>
	</div>
	<h4 id='materiales'>Materiales</h4>
	<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
		<div class="table-responsive" id="ignore">
			<div style="text-align: right;">
				<a id="1" class="btn btn-circle red btn-outline" onclick="AddMaterial()">
					<i class="fa fa-plus"></i>
				</a>
			</div> 
			<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_MaterialesM">
				<thead id='headMaterial'>
					<tr>
						<th >#</th>
						<th style="min-width:400px">Material</th>
						<th>Codigo</th>
						<th style="min-width:300px">Almacen</th>
						<th>Cantidad</th>
						<th>UM</th>
						<th>Stock</th>
						<th>Devolución</th>
						<th>Almacen Devolución</th>
						<th>Detalle</th>
						<th>Descartar</th>
					</tr>
				</thead>
				<tbody id="tblMaterialesCM"></tbody>
			</table> 
		</div>
	</div>	
	<h4 id="especie">Detalle Cuartel</h4>
	<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
		<div class="table-responsive" id="ignore">
			<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Cuartel">
				<thead>
					<tr>
						<th style='width: 2%; text-align: center;'><input type='checkbox' checked id='cbSelectTodo' onchange='selectTodoCuartel()' ></th>
						<th>Variedad</th>
						<th>Cuartel</th>
						<th>Has</th>
						<th>% Has</th>	
						<th>Ceco/Orden CO</th>			
					</tr>
				</thead>
				<tbody id="tblCuartel" ></tbody>
				<tfoot id="footer"></tfoot>
			</table>
		</div>
	</div>
	
</div>
<div style="text-align: center;">
	<a id="addAct" class="btn btn-circle red btn-outline" onclick="consumoSap()">
		<i class="fa fa-plus"></i> Generar Consumo
	</a>
	
</div>
<article id="loading" class="loading_dos" style="display: none;">
	<div id="modal" class="modal" style="display: none;"></div>
</article>