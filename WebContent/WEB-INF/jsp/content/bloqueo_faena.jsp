<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
	<h4>Bloqueo de Faena</h4>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	<div class="col-xs-12 col-sm-6 col-md-3">
		<label>Temporada:</label> 
		<select id="BoxTemporada" class="input-circle form-control input-sm" style="float: left; width: 200px;">
		<option value ="">Seleccione</option>
		<option value ="2018">2018</option>
		</select>
	</div>

	<div class="col-xs-12 col-sm-6 col-md-3">
		<label>Campo:</label> 
		<select id="BoxCampo" onchange="javascript: cambioCampo(this.value);" class="input-circle form-control input-sm" style="float: left; width: 200px;"></select>
	</div>

	<div class="col-xs-12 col-sm-6 col-md-3">
		<label>Especie:</label> 
		<select id="BoxEspecie"	class="input-circle form-control input-md multiple" style="float: left; width: 200px;"></select>
	</div>

	<div class="col-xs-12 col-sm-6 col-md-3">
		<label style="text-align: center;">Faena: </label>
		 <select id="BoxFaena" class="input-circle form-control input-md multiple " style="width: 200px;"></select>
	</div>
</div>

<div style="text-align: left;">
	<a id="bt_marcar_todo" class="btn btn-circle red btn-outline"
		onclick="javascript: bt_marcar_todo('+codigo+')">Marcar Todos</a> <a
		id="bt_desmarcar" class="btn btn-circle red btn-outline"
		onclick="javascript: bt_desmarcar('+codigo+')" style="display: none;">Desmarcar</a>

</div>
<br>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
		<div class="col-xs-12 col-sm-6 col-md-4 portlet light bordered" >	
		<input type="checkbox" id="enero" value="0" > Enero
		 	<br>
			<br>
		<input type="checkbox"  id="febrero" value="0"> Febrero 
			<br>
			<br>
		<input type="checkbox" id="marzo" value="0"> Marzo
			<br><br>
		<input type="checkbox" id="abril" value="0"> Abril
			<br><br>
	</div>
	
	<div class="col-xs-12 col-sm-6 col-md-4 portlet light bordered" >	
		<input type="checkbox" id="mayo"  value="0"> Mayo
			<br><br>
		<input type="checkbox" id="junio"  value="0"> Junio
			<br><br>
	
		<input type="checkbox" id="julio"  value="0"> Julio
			<br><br>
		<input type="checkbox" id="agosto"  value="0"> Agosto
			<br><br>
	</div>
	
	<div class="col-xs-12 col-sm-6 col-md-4 portlet light bordered" >	
		<input type="checkbox" id="septiembre" value="0"> Septiembre
			<br><br>
		<input type="checkbox" id="octubre" value="0"> Octubre
			<br><br>
		<input type="checkbox" id="noviembre"  value="0"> Noviembre
			<br><br>
		<input type="checkbox" id="diciembre"  value="0"> Diciembre
			<br><br>
	</div>
</div>

<div style="text-align: center;">
	<a id="Guardar" onclick="javascript: Guardar(0)" class="btn btn-circle red btn-outline">
		<i class="fa fa-plus"></i> Guardar
	</a>
</div>
<div id="fileArea" style="display: none;"></div>

<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>