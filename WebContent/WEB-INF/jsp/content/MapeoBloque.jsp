<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <div class="col-xs-12 col-sm-12 portlet light bordered" style="width: 100%;">
    	<h4>Filtros</h4>
    	<div class="col-xs-3 col-sm-3 col-md-3">
    		<h5>Campo</h5>
    		<div style="width: 100%;">
				<select id="filtroCampo" class="form-control input-sm" style="float: right;"></select>
			</div>
		</div>
		<div class="col-xs-3 col-sm-3 col-md-3">
    		<h5>Equipo/Bomba</h5>
    		<div style="width: 100%;">
				<select id="filtroEquipo" class="form-control input-sm" style="float: right;"></select>
			</div>
		</div>
<!-- 		<div class="col-xs-3 col-sm-3 col-md-3"> -->
<!--     		<h5>Sector</h5> -->
<!--     		<div style="width: 100%;"> -->
<!-- 				<select id="filtroSector" class="form-control input-sm" style="float: right;"></select> -->
<!-- 			</div> -->
<!-- 		</div> -->
    	<div class="col-xs-3 col-sm-3 col-md-3">
    		<h5>Bloque</h5>
    		<div style="width: 100%;">
				<select id="filtroBloque" class="form-control input-sm" style="float: right;"></select>
			</div>
		</div>
		<div class="col-xs-1 col-sm-1 col-md-1">
			<br>
		</div>
		<div class="col-xs-12 col-sm-2 col-md-2">
			<a onclick="eliminarFiltro();" class="btn btn-circle red "> Eliminar Filtros </a>
		</div>
    </div>
<div class="col-xs-12 col-sm-12 portlet light bordered" style="width: 100%;">
	<div class="col-xs-3 col-sm-3 col-md-3">
		<input type="text" class="form-control" id="address" placeholder="Ingresa una Direccion">
	</div>
	<div class="col-xs-12 col-sm-4 col-md-4">
		<!--  <a onclick="adSector();" class="btn btn-circle red btn-outline" >
			<i class="fa fa-plus"></i> Agregar Sector
		</a>-->
		<a onclick="addBloque();" class="btn btn-circle red btn-outline" ><i class="fa fa-plus"></i> Agregar Bloque</a>
	</div>
</div>

<div class="col-xs-12 col-sm-12 col-md-12">
	<div class="col-xs-12 col-sm-12 col-md-12">
		<div id="mapa" style="width: 100%; height: 500px; float: left;"></div>
		<div class="col-md-12">
			<div id="color_palette" style="display: none;"></div>
			<a id="delete" class="btn btn-circle red btn-outline" style="float: right; display:none;">
				<i class="fa fa-trash-o"></i> Eliminar
			</a>
			<a id="editar" class="btn btn-circle red btn-outline" onclick="javascript: editarBloque();" style="float: right; display: none;">
				<i class="fa fa-pencil-square-o fa-lg"></i> Editar
			</a>
		</div>
	</div>

	<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered" id="addBloque" style="display: none">
		<div id="data" >
		<div class="col-xs-12 col-sm-12 col-md-12 portlet light">
		    <div class="col-xs-12 col-sm-6 col-md-3">
				<label style="color: #337ab7;font-weight: bold" for="especie">(*) Especie:</label>
				<select id="especie" name="map" onchange="selectEscpecie();" class="form-control input-sm" style='width:200px'>
					<option value="">Seleccione</option>
				</select>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-3">
				<label style="color: #337ab7;font-weight: bold" for="variedad">(*) Variedad:</label>
				<select id="variedad" name="map" onchange='cargarCuartel()' class="form-control input-sm" style='width:200px'>
					<option value="">Seleccione</option>
				</select>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-3">
				<label style="color: #337ab7;font-weight: bold" for="nameCuartel">(*) Nombre:</label>
				<input type="text" id="nameCuartel" name="map" class="form-control"><br>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-3">
				<label style="color: #337ab7;font-weight: bold" for="especie">(*) Agregar Cuartel:</label>
				<div class="col-md-12">
					<button title='Agregar Cuarteles' onclick='javascript: modalAddCuartel();' class='btn blue btn-outline btn-sm'><i class='fa fa-map-o fa-lg'></i></button>
				</div>
			</div>
		</div>		
		<div class="col-xs-12 col-sm-12 col-md-12 portlet light">
			<div class="col-xs-12 col-sm-6 col-md-3">
				<label style="color: #337ab7;font-weight: bold" for="estado">(*) Tipo Riego:</label>
				<select id="tipoRiego" name="tipoRiego" class="form-control input-sm">
					<option value="">Seleccione</option>
					<option value="1">Goteo</option>
					<option value="2">Aspersor</option>
				</select>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-3">
				<label style="color: #337ab7;font-weight: bold" for="tipo_plantacion">(*) Precipitación Nominativa:</label>
				<input type="text" id="precipitacion" name="precipitacion" class="form-control"><br>
			</div>
			
			<div class="col-xs-12 col-sm-6 col-md-3">
				<label style="color: #337ab7;font-weight: bold" for="clon">(*) Aforo mm/Hora:</label>
				<input type="text" name="map" id="aforo" class="form-control"><br>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-3">
				<label style="color: #337ab7;font-weight: bold" for="ceco">(*) Reposición:</label>
				<input type="text" name="map" id="reposicion" class="form-control"><br>
			</div>
			<div style="text-align: center;">
				<label style="color: #337ab7;font-weight: bold" for="clon"></label>
				<a id="save" class="btn btn-circle red btn-outline" onclick="javascript: saveBloque();">
					<i class="icon-cloud-upload"></i> Guardar
				</a>
				<a id="update" class="btn btn-circle red btn-outline" onclick="javascript: updateBloque();" style="display: none;">
					<i class="fa fa-refresh"></i> Actualizar
				</a>
				<a id="cancelar" class="btn btn-circle red btn-outline" onclick="javascript: cancelar();" >
					<i class="fa fa-close"></i> Cancelar
				</a>
				<input type="hidden" id="coordenadas" />
				<input type="hidden" id="codigo" />
			</div>
		</div>
			
		</div>
	</div>
</div>
.


<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>