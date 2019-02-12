<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

 <h3>Selección</h3>
<div class="col-md-12 portlet light bordered">
		<div class="col-md-12 ">
			<div class="col-md-4" id="idPeticion">
			  
			</div> 
			<div class="col-md-3" id="cantid">
			   
			</div> 
			<div class="col-md-1">
			  FECHA MASIVA: 
			</div> 
			
			<div class="col-md-2">
			<input type="date" id="fechaMasiva" class="form-control input-circle mayusculasWork" onchange="javascript: valDias(this)">
			
			
			</div>
			<div class="col-md-1">
			  <button onclick="limpiar();"><i class="fa fa-eraser"></i></button> 
			</div> 
		</div>
		
				<div class="col-md-12 ">
			<div class="col-md-4" id="fechaSoli">
			
			</div> 
			<div class="col-md-4" id="obraFaena">
			
			</div> 
			<div class="col-md-4">
			  VER: <button title="" class="btn btn-circle  btn-sm" data-toggle='modal' data-target='#modalR'><i class="fa fa-eye fa-lg"></i></button>
			</div> 
			 
			
		</div>
		
		    <div class="col-md-12 ">
    		<div class="col-xs-2 col-md-4">
                
                <select id="loadCargo" class="form-control btn-circle btn-sm mayusculasWork">
				<option value="">Seleccione N° de Petición</option>
				</select>
    	</div>
    		
    	</div>
              
</div>
 

 
  <div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
  
	
		<div style="height: 50px;"></div>
		<div class="table-responsive" id="ignore">
			<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Info">
				<thead>
					<tr>
					     <th style='display: none;'>codigo</th> 
						<th>N°</th>
						<th>Apellido/Nombre</th>
						<th>Cargo de <br> Contratación</th>
						<th>Posición</th>
						<th>Sueldo Base</th>
						<th>Asignación Turno</th>
						<th style='display: none;'>Obra/Faena</th>
						<th>Teléfono</th>
						<th>E-MAIL</th>
						<th>Status</th>
					    <th>Fecha Inicio<br>Funciones</th>
						<th>Opciones</th>
						
					</tr>
				</thead>
				<tbody id="preseleccionados"></tbody>
			</table>
		</div>
		<br>	
</div>
<div style="text-align: center;">
	<a id="addAct" onclick="javascript: addAct();" class="btn btn-circle red btn-outline">
		<i class="fa fa-plus"></i> Guardar
	</a>

</div>

<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">
   	<div class="modal-content">
      	<div class="modal-header">
       	 <button type="button" class="close" data-dismiss="modal">&times;</button>
       		 <h4 class="modal-title">Rechazar</h4>
       		 <p id="nombreEliminar"></p>
      	</div>
      	<div class="modal-body">
                             
		<select id='listaRechazo2' class='btn blue btn-outline btn-circle btn-sm'>
	    </select>
		  Observación
	    <textarea id="observacion" rows='3' wrap='oft' class='form-control'></textarea>
	 </div>
	 
	 <div >
	 <div class="col-sm-12 col-md-12">
	 <div class='btn btn-circle blue btn-outline' onclick='Rechazar()';><i class='fa fa-clock-o'></i> Enviar</div>
	
	 </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
      </div>
    </div>

  </div>
</div>

<div id="modalR" class="modal fade" role="dialog">
  <div class="modal-dialog modal-lg">
   	<div class="modal-content">
      	<div class="modal-header">
       	 <button type="button" class="close" data-dismiss="modal">&times;</button>
       		 <h4 class="modal-title">Orden de Reclutamiento</h4>
      	</div>
      	

        <table class="table table-hover">
<thead>
<tr>
<th>Cargo</th>
<th>Posición</th>
<th>Cant.Personas</th>
<th>Cant. Trabajadores<br>  Preseleccionado</th>
<th>Cant. Trabajadores<br>  Seleccionado</th>
<th>Saldo Trabajadores</th>
<th>Fecha Estimada Inicio<br> Funciones</th>
</tr>
</thead> 
<tbody id="modalBody2">


</tbody>
</table>

  <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
 </div>
	 
	 <div>
	
      </div>
    

  </div>
<p style="color:white">.</p>

<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>
