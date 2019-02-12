<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

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
	        <label style="color: #337ab7;">Código Trabajador:</label>
	    </div>
	    <div class="col-md-7">
	        <select id="CodigoTra" class="form-control input-sm input-circle mayusculasWork ">
	
	        </select>
	    </div>
	</div>
	
	<br>
	
</div>

<div class="col-md-12 portlet light bordered">
	<div class="col-md-12 ">
		<div class="col-md-2">
			<label style="color: #337ab7;">Acción </label>
		</div>
		<div class="col-md-4">
			<select id="accion" class=" form-control btn-circle btn-sm mayusculasWork">
				<option value=''>Seleccione..</option>
				<option value='1'>Permiso con Goce de Sueldo</option>
				<option value='4'>Permiso Sin Goce de Sueldo</option>
				<option value='2'>Licencia</option>
				<option value='3'>Falta</option>
				
				
			</select>
		</div>
		<div class="col-md-5"></div>
		<div class="col-md-1">
		
		</div>
		
		
		
	</div>
</div>

   <div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered" id="tablaLicencia" style="display:none">
	<p>Licencia</p>
		<div style="height: 50px;"></div>
		<div class="table-responsive" id="ignore">
			<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Info2">
				<thead>
					<tr>
						<th>Cod. trabajador</th>              
						<th>Nombres/Apellidos</th>
						<th>Tipo de<br>Licencia</th>
						<th>Subtipo<br>Licencia</th>
						<th>Reposo Parcial</th>
						<th>Incluye<br>feriados</th>
						<th>Fecha Desde</th>
						<th>Fecha Hasta</th>
						<th>Horas<br>Inasistencia</th>
						<th>Dias<br>Corridos</th>
						<th>Opciones</th>
						<th>tipo_licencia</th>
						<th>Subtipo_licenciaid</th>
						<th>reposo</th>
						<th>doctor</th>
						<th>especialidad</th>
						<th>reposo parcial</th>
						<th>Tipo reposo</th>
			
						
					</tr>
				</thead>
				<tbody id="tableLic"></tbody>
			</table>
		</div>
		<br>	
</div>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered" id="tablaPermiso" style="display:none">
<p>Permiso</p>	
		<div style="height: 50px;"></div>
		<div class="table-responsive" id="ignore">
			<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Info">
				<thead>
					<tr>
						<th>Cod. trabajador</th> 
						<th>Nombres/Apellidos</th> 
						<th>Fecha Desde</th>  
						<th>Fecha Hasta</th> 
						<th>Horas<br>Inasistencia</th> 
						<th>Dias<br>Corridos</th> 
						<th>Opciones</th>
						
					</tr>
				</thead>
				<tbody id="tablePer"></tbody>
			</table>
		</div>
		<br>	
</div>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered" id="tablaPermisoSG" style="display:none">
<p>Permiso Sin Goce</p>	
		<div style="height: 50px;"></div>
		<div class="table-responsive" id="ignore">
			<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Info3">
				<thead>
					<tr>
						<th>Cod. trabajador</th>
						<th>Nombres/Apellidos</th>
						<th>Incluye<br>feriados</th>
						<th>Fecha Desde</th>
						<th>Fecha Hasta</th>
						<th>Horas<br>Inasistencia</th>
						<th>Dias<br>Corridos</th>
						<th>Opciones</th>
						
					</tr>
				</thead>
				<tbody id="tablePerSG"></tbody>
			</table>
		</div>
		<br>	
</div>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered" id="tablaLicenciaMutual" style="display:none">
<p>Falta</p>	
		<div style="height: 50px;"></div>
		<div class="table-responsive" id="ignore">
			<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Info4">
				<thead>
					<tr>
						<th>Cod. trabajador</th>
						<th>Nombres/Apellidos</th>
						<th>Incluye<br>feriados</th>
						<th>Fecha Desde</th>
						<th>Fecha Hasta</th>
						<th>Horas<br>Inasistencia</th>
						<th>Dias<br>Corridos</th>
						<th>Opciones</th>
						
						
					</tr>
				</thead>
				<tbody id="tableLM"></tbody>
			</table>
		</div>
		<br>	
</div>
 
<div class="modal fade"  id="modalupdatePermisoConGose"  role="dialog">
    <div class="modal-dialog modal-lg">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          
          <h4 class="modal-title">Editar</h4>
        </div>
        <div class="modal-body">
        	
        		<div class="col-md-6" style="margin-top: 10px;">
   					<div class="col-md-12">
    					<h4>Fecha Inicio:</h4>
    				</div>
    				<div class="col-md-12">
    					<input autocomplete="off" type="text" id="fechaInicioP" class="form-control input-circle mayusculasWork" placeholder="Seleccione una Fecha"></input>
    				</div>
    			</div>
   
        	
     		<div class="col-md-6" style="margin-top: 10px;">
    			<div class="col-md-12">
    				<h4>Fecha Fin:</h4>
    			</div>
   				 <div class="col-md-12">
   				 <input autocomplete="off" type="text" id="fechaFinP" class="form-control input-circle mayusculasWork" placeholder="Seleccione una Fecha"></input>
    			</div>
   			 </div>
   			 
   			 <div class="col-md-6">
    		 	<div class="col-md-12">
    				<h4>Días Corridos: </h4>
    			</div>
    			<div class="col-md-12">
    				<input id="diascorridosP" type="number" name="ReAct"  class="form-control input-circle" >
    	    	</div>
    		 </div>
    		 
    		 <div class="col-md-6">
    		 	<div class="col-md-12">
    				<h4>Documento:  </h4>
    			</div>
    			<div class="col-md-12">
    				<label for="7" title="Subir Archivo"  class="btn btn-circle green btn-outline"> 
    				<i class='fa fa-upload'></i>Subir Archivo
			</label><br>
			<input id="8"  type="file" style="height: 3em;" accept="application/pdf"></input>
    	    	</div>
    		 </div>
    		 
    		 
 			
        </div><!-- end modal-body" -->
        <div class="modal-footer">
        <div class="col-md-4"></div>
          <div class="col-md-4" style="margin-top: 20px;">
           <div class='btn btn-circle blue btn-outline' id='actualizarPCG' onclick="addForm2();"><i class='fa fa-clock-o'></i> Actualizar</div>
          <div class='btn btn-circle red btn-outline'data-dismiss="modal">Cerrar</div>
           </div>
           <div class="col-md-4"></div>
        </div>
      </div>
      
    </div>
  </div>
  
  <div class="modal fade"  id="modalupdatePermisoSinGose"  role="dialog">
    <div class="modal-dialog modal-lg">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          
          <h4 class="modal-title">Editar</h4>
        </div>
        <div class="modal-body">
        	
        		<div class="col-md-6" style="margin-top: 10px;">
   					<div class="col-md-12">
    					<h4>Fecha Inicio:</h4>
    				</div>
    				<div class="col-md-12">
    					<input autocomplete="off" type="text" id="fechaInicioPSG" class="form-control input-circle mayusculasWork" placeholder="Seleccione una Fecha"></input>
    				</div>
    			</div>
   
        	
     		<div class="col-md-6" style="margin-top: 10px;">
    			<div class="col-md-12">
    				<h4>Fecha Fin:</h4>
    			</div>
   				 <div class="col-md-12">
   				<input autocomplete="off" type="text" id="fechaFinPSG" class="form-control input-circle mayusculasWork" placeholder="Seleccione una Fecha">
    			</div>
   			 </div>
   			 
   			 <div class="col-md-6">
    		 	<div class="col-md-12">
    				<h4>Días Corridos: </h4>
    			</div>
    			<div class="col-md-12">
    				<input id="diascorridosPSG" type="number" name="ReAct"  class="form-control input-circle" >
    	    	</div>
    		 </div>
    		 
    		  <div class="col-md-6">
    		 	<div class="col-md-12">
    				<h4>Documento:  </h4>
    			</div>
    			<div class="col-md-12">
    				<label for="7" title="Subir Archivo" 
						class="btn btn-circle green btn-outline"> <i
						class="fa fa-upload"></i>Subir Archivo
					</label><br> <input id="9"  type="file" style="height: 3em;" accept="application/pdf">
    	    	</div>
    		 </div>
    		 
    		 	  <div class="col-md-6">
    		 	<div class="col-md-12">
    				<h4>Incluye Feriados:</h4>
    			</div>
    			<div class="col-md-12">
    				<input type='checkbox' id='checkPermisoSG' value='' style='-ms-transform: scale(1.5);-moz-transform: scale(1.5);-webkit-transform: scale(1.5);-o-transform: scale(1.5);'>
    	    	</div>
    		 </div>
    		 
    		 
			
		
    		 
 			
        </div><!-- end modal-body" -->
        <div class="modal-footer">
        <div class="col-md-4"></div>
          <div class="col-md-4" style="margin-top: 20px;">
           <div class='btn btn-circle blue btn-outline' id='actualizarPSG' onclick="addForm4();"><i class='fa fa-clock-o'></i> Actualizar</div>
          <div class='btn btn-circle red btn-outline'data-dismiss="modal">Cerrar</div>
           </div>
           <div class="col-md-4"></div>
        </div>
      </div>
      
    </div>
  </div>
  
  <div class="modal fade"  id="modalupdateLicencia"  role="dialog">
    <div class="modal-dialog modal-lg">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          
          <h4 class="modal-title">Editar</h4>
        </div>
        <div class="modal-body">
        	<div class="row">
        	<div class="col-md-12">
        		<div class="col-md-6" style="margin-top: 10px;">
   					<div class="col-md-12">
    					<h4>Tipo Licencia</h4>
    				</div>
    				<div class="col-md-12">
    					<select id="tipolicencia" class=" form-control btn-circle btn-sm mayusculasWork">
							<option value=''>Seleccione..</option>		
			            </select>
    				</div>
    			</div>
    			
    			<div class="col-md-6" style="margin-top: 10px;">
   					<div class="col-md-12">
    					<h4 id="labelSubTeipoLicencia">Sub Tipo Licencia:</h4>
    				</div>
    				<div class="col-md-12">
    					<select id="subtipolicencia" class=" form-control btn-circle btn-sm mayusculasWork">
							<option value=''>Seleccione..</option>		
			            </select>
			            
			          
    				</div>
    			</div>
   
        	
     		
   			 </div>
   			</div> 
   			
   			
   			
   			
   			<div class="col-md-6">
    		 	<div class="col-md-12">
    				<h4>Tipo de reposo: </h4>
    			</div>
    			<div class="col-md-12">
    				<select id="TipoR" class=" form-control btn-circle btn-sm mayusculasWork">
						<option value=''>Seleccione..</option>		
				</select>
    	    	</div>
    		 </div>
    		 
    		 <div class="col-md-6">
    		 	<div class="col-md-12">
    				<h4 id="labelParcial" >Parcial: </h4>
    			</div>
    			<div class="col-md-12">
    				<select id="parcial" class=" form-control btn-circle btn-sm mayusculasWork" ></select>
    	    	</div>
    		 </div>
    		 
    		  
    		 
    		  <div class="col-md-6">
    		 	<div class="col-md-12">
    				<h4>Fecha Inicio: </h4>
    			</div>
    			<div class="col-md-12">
    				<input  autocomplete="off" type="text" id="fechaInicio" class="form-control input-circle mayusculasWork"  placeholder="Seleccione una Fecha"></input>
    	    	</div>
    		 </div>
    		 
    		  <div class="col-md-6">
    		 	<div class="col-md-12">
    				<h4>Fecha Fin: </h4>
    			</div>
    			<div class="col-md-12">
    			<input  autocomplete="off" type="text" id="fechaFin" class="form-control input-circle mayusculasWork" placeholder="Seleccione una Fecha"></input>
    	    	</div>
    		 </div>
    		 
    		  <div class="col-md-6">
    		 	<div class="col-md-12">
    				<h4>Días Corridos: </h4>
    			</div>
    			<div class="col-md-12">
    				<input id="diascorridosL" type="number" name="ReAct"  class="form-control input-circle" >
    	    	</div>
    		 </div>
    		 
    		  <div class="col-md-6">
    		 	<div class="col-md-12">
    				<h4>Nombre Doctor: </h4>
    			</div>
    			<div class="col-md-12">
    				<input id="nombredoctor" type="text" name="nombredoctor"  class="form-control input-circle" > 
    	    	</div>
    		 </div>
    		 
    		  <div class="col-md-6">
    		 	<div class="col-md-12">
    				<h4>Especialidad: </h4>
    			</div>
    			<div class="col-md-12">
    				<input id="especialidad" type="text" name="especialidad"  class="form-control input-circle" > 
    	    	</div>
    		 </div>
    		 
    		  <div class="col-md-6">
    		 	<div class="col-md-12">
    				<h4>Incluye Feriados: </h4>
    			</div>
    			<div class="col-md-12">
    				<input type='checkbox' id='checkLicencia' value='' style='-ms-transform: scale(1.5);-moz-transform: scale(1.5);-webkit-transform: scale(1.5);-o-transform: scale(1.5);'>
       	    	</div>
    		 </div>
    		 
    		  <div class="col-md-6">
    		 	<div class="col-md-12">
    				<h4>Documento: </h4>
    			</div>
    			<div class="col-md-12">
    				<label for="7" title="Subir Archivo"  class="btn btn-circle green btn-outline"> <i class="fa fa-upload"></i>Subir Archivo	</label>
			<br> <input id="7"  type="file"  style="height: 3em;" accept="application/pdf" >
    	    	</div>
    		 </div>
   			 
    		 
    		 
 			
        </div><!-- end modal-body" -->
        <div class="modal-footer">
        <div class="col-md-4"></div>
          <div class="col-md-4" style="margin-top: 20px;">
           <div class='btn btn-circle blue btn-outline' id='actualizarlicencia' onclick="addForm1();"><i class='fa fa-clock-o'></i> Actualizar</div>
          <div class='btn btn-circle red btn-outline'data-dismiss="modal">Cerrar</div>
           </div>
           <div class="col-md-4"></div>
        </div>
      </div>
      
    </div>
  </div>
  
  <div class="modal fade"  id="modalupdateFalta"  role="dialog">
    <div class="modal-dialog modal-lg">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          
          <h4 class="modal-title">Editar</h4>
        </div>
        <div class="modal-body">
        	
        		<div class="col-md-6" style="margin-top: 10px;">
   					<div class="col-md-12">
    					<h4>Fecha Inicio:</h4>
    				</div>
    				<div class="col-md-12">
    					<input autocomplete="off"  type="text" id="fechaInicioFalta" class="form-control input-circle mayusculasWork" placeholder="Seleccione una Fecha"></input>
    				</div>
    			</div>
   
        	
     		<div class="col-md-6" style="margin-top: 10px;">
    			<div class="col-md-12">
    				<h4>Fecha Fin:</h4>
    			</div>
   				 <div class="col-md-12">
   				 <input autocomplete="off" type="text" id="fechaFinFalta" class="form-control input-circle mayusculasWork" placeholder="Seleccione una Fecha">
    			</div>
   			 </div>
   			 
   			 <div class="col-md-6">
    		 	<div class="col-md-12">
    				<h4>Días Corridos: </h4>
    			</div>
    			<div class="col-md-12">
    				<input id="diascorridosFalta" type="number" name="ReAct"  class="form-control input-circle" >
    	    	</div>
    		 </div>
    		  <div class="col-md-6">
    		 	<div class="col-md-12">
    				<h4>Incluye Feriados:</h4>
    			</div>
    			<div class="col-md-12">
    				<input type='checkbox' id='checkFalta' value='' style='-ms-transform: scale(1.5);-moz-transform: scale(1.5);-webkit-transform: scale(1.5);-o-transform: scale(1.5);'>
    	    	</div>
    		 </div>
    		 
    		 
    		 
 			
        </div><!-- end modal-body" -->
        <div class="modal-footer">
        <div class="col-md-4"></div>
          <div class="col-md-4" style="margin-top: 20px;">
           <div class='btn btn-circle blue btn-outline' id='actualizarfalta' onclick="addForm3();"><i class='fa fa-clock-o'></i> Actualizar</div>
          <div class='btn btn-circle red btn-outline'data-dismiss="modal">Cerrar</div>
           </div>
           <div class="col-md-4"></div>
        </div>
        
        
        

      </div>
      
    </div>
  </div>
 
<p style="color:white">.</p>
<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>