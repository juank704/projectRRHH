<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

 <h3>Contratación</h3>
<div class="col-md-12 portlet light bordered">
		<div class="col-md-12 ">
			<div class="col-md-4" id="idPeticion">
			  
			</div> 
			<div class="col-md-3" id="cantid">
			   
			</div> 
		</div>
		
				<div class="col-md-12 ">
			<div class="col-md-4" id="fechaSoli">
			
			</div> 
			<div class="col-md-4" id="obraFaena">
			
			</div> 
			
			 
			
		</div>
              
</div>
    <div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	
		<div style="height: 50px;"></div>
		<div class="table-responsive" id="ignore">
			<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Info">
				<thead>
					<tr>
						 <th style='display: none;'>Codigo</th>
						 <th>N°</th>
				<th>Apellido/Nombre</th>
						<th>Cargo de <br> Contratación</th>
				<th>Posición</th>
						<th>Sueldo Base</th>
				<th>Asignación <br> Turno</th>
				<th>Teléfono</th>
				<th>Observaciones</th>
				<th>Inicio <br> Actividades</th>
						<th style="min-width: 100px;">Opciones</th>
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
