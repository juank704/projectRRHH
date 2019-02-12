<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	<h3>Consumo Bodega</h3>
	<h3>Campo: <small id="campo"> </small></h3>
	<div class="col-xs-12 col-sm-12 col-md-2 ">
	</div>
	<div class="col-xs-12 col-sm-12 col-md-8">
		<div class="col-xs-12 col-sm-12 col-md-12 ">
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label style="color: #337ab7;"><label style="color: #FF0000;">*</label>Responsable:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<select name="c_bodega" id="selectResponsable" class="btn blue btn-outline btn-circle btn-sm"></select>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12 ">
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label style="color: #337ab7;"><label style="color: #FF0000;">*</label>Consumir Bodega:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<div class="radio-inline">
					<label>
					    <input type="radio" name="opciones" id="opciones_1" onclick="javascript: radioCheck(this);" value="si" checked> Si
					</label>
				</div>
				<div class="radio-inline">
					<label>
					    <input type="radio" name="opciones" id="opciones_1" onclick="javascript: radioCheck(this);" value="no" checked> No
					</label>
				</div>
			</div>
		</div>
		<br>
		<div class="col-xs-12 col-sm-12 col-md-12 ">
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label style="color: #337ab7;"><label style="color: #FF0000;">*</label>Fecha:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<input id="fechaAsignacion" name="c_bodega" type="date" class="btn blue btn-outline btn-circle btn-sm">
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12 ">
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label style="color: #337ab7;"><label style="color: #FF0000;">*</label>Descripcion:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-12 ">
				<textarea id="descripcion" name="c_bodega" class="form-control blue input-circle"></textarea>
			</div>
		</div>
		<div id="con_bod_div" style="display: none;" class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
			<a id="1" title="Agregar Material" onclick="javascript: addMaterial();" style="display: block;">
				<i class="fa fa-plus"></i>
			</a>
			<div class="col-xs-6 col-sm-6 col-md-6" id="mat_Div">
				<div class="col-xs-12 col-sm-12 col-md-6 ">
					<label style="color: #337ab7;"><label style="color: #FF0000;">*</label>Material:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12 ">
					<select name='p_bodega' id="se1" onchange="javascript: chaMat(1);" class="btn blue btn-outline btn-circle btn-sm"></select>
				</div>
			</div>
			<div class="col-xs-6 col-sm-6 col-md-6" id="cant_Div">
				<div class="col-xs-12 col-sm-12 col-md-12 ">
					<label style="color: #337ab7;"><label style="color: #FF0000;">*</label>Cantidad:</label>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12 ">
					<select name='p_bodega' id="cant1" class="btn blue btn-outline btn-circle btn-sm">
						<option value="">Seleccione...</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">4</option>
						<option value="6">6</option>
					</select>
					<label id="tMaterialInfo1" ></label>
				</div>
			</div>
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-2">
	</div>
</div>
<div style="text-align: center;">
	<a id="addConsumoBodega" onclick="javascript: addConsumoBodega();" class="btn btn-circle red btn-outline">
		<i class="fa fa-plus"></i> Guardar
	</a>
	<a href="homePage" id="addEmpresa" class="btn btn-circle red btn-outline">
		<i class="fa fa-times"></i> Cancelar
	</a>
</div>