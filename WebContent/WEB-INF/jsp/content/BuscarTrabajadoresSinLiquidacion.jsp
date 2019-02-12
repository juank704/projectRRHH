<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<div class="col-md-12 portlet light bordered" id="panelform">
	<div class="col-md-12">
	   <div class="col-md-1">
	      <label style="color: #337ab7;">Empresa:</label>
	   </div>
	   <div class="col-md-3">
	      <select id="Sociedad" class=" form-control btn-circle btn-sm mayusculasWork" >
	         <option value="-1">Seleccione una Empresa</option>
	      </select>
	   </div>
	   <div class="col-md-1">
	      <label style="color: #337ab7;">Periodo:</label>
	   </div>
	   <div class="col-md-3">
	    		<input autocomplete="off" type="text" id="peridoS" class="form-control input-circle mayusculasWork" onchange="javascript: valDias(this)" placeholder="Seleccione un Periodo">
	    </div>
	    <div class="col-md-2 ">
	   		<button id="Documento" title="Generar Excel" class="btn btn-circle green btn-outline" data-toggle="modal" onclick="javascript:Enviar()">
   				<i class="fa fa-file-excel-o fa-lg"> Generar Excel</i>
   			</button>
   		</div>
   	</div>
	</div>

<p style="color:white">.</p>
<article id="loading" class="loading_dos" style="display: block;"> </article>
	
</article>