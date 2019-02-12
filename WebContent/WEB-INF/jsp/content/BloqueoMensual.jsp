<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>


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
	    		<input   type="text" id="peridoS" class="form-control input-circle mayusculasWork" onchange="javascript: valDias(this)" placeholder="Seleccione un Periodo">
	    </div>
	   
	   
	</div>
	
   	<div class="col-md-12" style="margin-top: 10px;">
   	
   	 <div class="col-md-1">
	      <label style="color: #337ab7;">Agro/Work: </label>
	   </div>
	   <div class="col-md-3">
	      <select id="agrowork" class=" form-control btn-circle btn-sm mayusculasWork" >
	         <option value="">Seleccione..</option>
	         <option value="1">WORK</option>
	         <option value="2">AGRO</option>
	      </select>
	   </div>
   	<div class="col-md-2 ">
	   		<button id="Documento" title="Buscar" class="btn btn-circle green btn-outline" data-toggle="modal" onclick="javascript:buscar()">
   				<i class="fa fa-file-text fa-lg">Buscar</i>
   			</button>
   		</div>
   	</div>
</div>

<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	
		<div style="height: 50px;"></div>
		<div class="table-responsive" id="ignore">
			<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Info">
				<thead>
					<tr>
						<tr>
						<th>Empresa</th>
						<th>Huerto</th>
						<th>Periodo</th>
						<th>Opciones</th>
					</tr>
						
					</tr>
				</thead>
				<tbody id="tablePreselect"></tbody>
			</table>
		</div>
		<br>	
</div>
<p style="color:white">.</p>
<article id="loading" class="loading_dos" style="display: block;"> 
	<div id="modal" class="modal" style="display: block;"></div>
</article>