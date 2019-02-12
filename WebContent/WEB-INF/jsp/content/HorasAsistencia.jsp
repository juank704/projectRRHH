<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<div class="col-md-12" style="margin-top: 10px;">
	<div class="col-md-1 ">
		<label style="color: #337ab7;">Empresa:</label>
	</div>
	<div class="col-md-4 ">
		<select id="Sociedad" class=" form-control btn-circle btn-sm mayusculasWork" >
			<option value="">Seleccione una Empresa</option>
		</select>
	</div>
</div>


<div class="col-md-12 portlet light bordered" id="todo" style="margin-top: 10px;">
	<div class="col-md-12 ">
	   <div class="col-md-1">
	      <label style="color: #337ab7;">Huerto: </label>
	   </div>
	   <div class="col-md-3">
	      <select id="tipodivisionB" class=" form-control btn-circle btn-sm mayusculasWork" >
	         <option value="">Seleccione Huerto</option>
	      </select>
	   </div>
	   <div class="col-md-1">
	      <label style="color: #337ab7;">Zona: </label>
	   </div>
	   <div class="col-md-3">
	      <select id="tiposubdivisionB" class=" form-control btn-circle btn-sm mayusculasWork" >
	         <option value="">Seleccione ZONA</option>
	      </select>
	   </div>
	   <div class="col-md-1">
	      <label style="color: #337ab7;">CECO: </label>
	   </div>
	   <div class="col-md-3">
	      <select id="listagrupoB" class=" form-control btn-circle btn-sm mayusculasWork">
	         <option value="">Seleccione CECO</option>
	      </select>
	   </div>
	</div>	
	
	<div  style="margin-top: 45px;"></div>
	
	<div class="col-md-12 ">
	    <div class="col-md-1 ">
	        <label style="color: #337ab7;">Fecha Contrato:</label>
	    </div>
	    <div class="col-md-3">
	        <select id="idContrato" class=" form-control btn-circle btn-sm mayusculasWork" disabled></select>
	    </div>
	    <div class="col-md-1 ">
	        <label style="color: #337ab7;">Código Trabajador:</label>
	    </div>
	    <div class="col-md-7">
	        <select id="CodigoTra" class="form-control input-sm input-circle mayusculasWork ">
	
	        </select>
	    </div>
	</div>
	
	<br>
	
</div>

<div style="margin-top: 30px"></div>
<div class="row">
	<div class="col-md-1">
		<label style="color: #337ab7;">Concepto:</label>
	</div>
	<div class="col-md-2">
<select id="concepto"
			class=" form-control btn-circle btn-sm mayusculasWork">
			<option value="-1">Seleccione un Concepto</option>
			<option value="1">HORA EXTRA</option> 
			<option value="2">HORA FALTA</option>  
</select>	
	</div>
	<div class="col-md-1">
		<label style="color: #337ab7;">Periodo:</label> 
	</div>
	<div class="col-md-2">
		<input autocomplete="off" type="text" id="periodo" class=" form-control btn-circle btn-sm mayusculasWork" placeholder="Seleccione un periodo"> 
	</div>
	<div class="col-md-1">
		<label style="color: #337ab7;">Fecha:</label>
	</div>
	<div class="col-md-2">
		<input  autocomplete="off" type="text" id="fechaFinLM" class="form-control input-circle mayusculasWork" 
				onchange="javascript: valDias(this)" placeholder="Seleccione una Fecha">
	</div>
	
		
	<div class="col-md-1">
		<label style="color: #337ab7;">Horas:</label>
	</div>
	<div class="col-md-2">

  

      <div class="form-group">
      
        <div class="input-group">
          <input value="00" type="number" class="form-control" name="horas" id="horas" min="0" max="190" maxlength="3" >
          <span class="input-group-addon">:</span>
         <input value="00" class="form-control" id="minutos" type="number" name="minutos" min="0" max="59" maxlength="2">
        </div>
      </div>
 


	</div>

	
	

	</div>


<div style="margin-top: 30px"></div>
	<div class="row">
		<div class="col-md-4"></div>
		<div class="col-md-4" style="text-align:center">
			<button id="grabar" title="Agregar" class="btn btn-circle green btn-outline" data-toggle="modal" onclick="javascript:Enviar()">
				<i class="fa fa-floppy-o fa-lg"> Grabar</i>
			</button>
		</div>
		<div class="col-md-4"></div>
	</div>
</div>







<p style="color: white">.</p>
<article id="loading" class="loading_dos" style="display: block;">
<div id="modal" class="modal" style="display: block;"></div>
</article>
<style>
.bootstrap-timepicker-widget dropdown-menu timepicker-orient-left timepicker-orient-top open{
display:none;
}
</style>