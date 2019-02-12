<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	<h3>Registro de Labores: <small id="campo"> </small></h3>
	<div class="col-xs-12 col-sm-12 col-md-3 ">
	</div>
	<div class="col-xs-12 col-sm-12 col-md-6">
		<div class="col-xs-12 col-sm-12 col-md-12 ">
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label style="color: #337ab7;"><label style="color: #FF0000;">*</label>Buscar Trabajador:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<input type="text" name="labores" class="form-control input-circle" id="bus_trab" placeholder="Nombre Trabajador">
<!-- 				<input type="text" name="ReAct" id="cod" class="form-control input-circle" onkeypress="javascript: seCodigo(event);"> -->
			</div>
		</div>
		<div class="table" style="display: none;" id="tblHide">
			<table class="table table-bordered table-striped table-condensed">
				<tbody id="bodyLaboresTrab">
					<tr>
						<td><strong>Codigo</strong></td>
						<td id="tdCod"></td>
					</tr>
					<tr>
						<td><strong>Rut</strong></td>
						<td id="tdRut">11.111.111-1</td>
					</tr>
					<tr>
						<td><strong>Nombre</strong></td>
						<td id="tdCNombre">Juan Perez</td>
					</tr>
<!-- 					<tr> -->
<!-- 						<td>Actividad</td> -->
<!-- 						<td id="tdCod">Trato</td> -->
<!-- 					</tr> -->
				</tbody>
			</table>
		</div>
		<br>
		<div id="con_bod_div" style="display: block;" class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
			<div class="col-xs-6 col-sm-6 col-md-6 ">
				<label style="color: #337ab7; float: left;">Campo:</label>
				<div class="col-md-12 ">
					<select style="float: left;" onchange="javascript: actSelect();" name="labores" id="selCoordenadas" class="btn blue btn-outline btn-circle btn-sm"></select>
				</div>
			</div>
		</div>
		<div id="con_bod_div" style="display: block;" class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
			<div class="col-xs-6 col-sm-6 col-md-6 ">
				<label style="color: #337ab7; float: left;">Actividades:</label>
				<div class="col-md-12 ">
					<select style="float: left;" onchange="javascript: actSelect();" name="labores" id="sAct" class="btn blue btn-outline btn-circle btn-sm">
						<option value="">Seleccione...</option>
						<option value="Zanja">Zanja</option>
						<option value="Cosecha">Cosecha</option>
						<option value="Poda">Poda</option>
					</select>
				</div>
			</div>
			<div id="medidaDiv" class="col-xs-6 col-sm-6 col-md-6 " style="text-align: center; display: none;">
				<label id="medida" style="color: #337ab7; text-align: center;"></label>
				<div class="col-md-12 ">
					<input style=" float: left;" id="inputMedida" type="number" name="labores" class="form-control input-circle" >
				</div>
			</div><br><br><br><br>
			<div class="col-xs-12 col-sm-12 col-md-12 ">
				<label style="color: #337ab7; float: left;">Fecha para la Orden:</label>
				<div class="col-md-12 ">
					<input id="fecha_labor" name="labores" type="date" class="btn blue btn-outline btn-circle btn-sm">
				</div>
			</div><br><br><br><br>
			<div class="col-xs-12 col-sm-12 col-md-12 ">
				<label style="color: #337ab7; float: left;">Observacion de Orden:</label>
				<div class="col-md-12 ">
					<textarea id="observaciones" name="labores" class="form-control blue input-circle"></textarea>
				</div>
			</div>
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-3">
	</div>
</div>
<div style="text-align: center;">
	<a id="addAct" onclick="javascript: addAct();" class="btn btn-circle red btn-outline">
		<i class="fa fa-plus"></i> Guardar
	</a>
<!-- 	<a href="homePage" id="addEmpresa" class="btn btn-circle red btn-outline"> -->
<!-- 		<i class="fa fa-times"></i> Cancelar -->
<!-- 	</a> -->
</div>