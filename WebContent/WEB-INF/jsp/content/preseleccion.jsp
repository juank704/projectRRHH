<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
	<h3>Preselección</h3>
	
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
			  VER: <button title="" class="btn btn-circle  btn-sm" data-toggle='modal' data-target='#myModal'><i class="fa fa-eye fa-lg"></i></button>
			</div> 
			 
			
		</div>
              
</div>	


 <div class="col-md-12 portlet light bordered">

		
		<div class="col-md-12 ">
		<div class="row">
		<div class="col-xs-2 col-md-4">
 			<select id="Sociedad" class="btn blue btn-outline btn-circle btn-sm">
				<option value="">Seleccione una Empresa</option>
				</select>
    	</div>
    				<div class="col-xs-2 col-md-4">
 			<div class="dropdown dropleft">
				<button class="btn btn-circle blue  btn-outline dropdown-toggle" title="Modificar" type="button" data-toggle="dropdown">
	      			 División <span class="caret"></span></button>
	    		<ul class="dropdown-menu">
	        		<li><a onclick="javascript: funcion1();">1</a></li>
	        		<li><a onclick="javascript: funcion2();">2</a></li>
	        		<li><a onclick="javascript: funcion3();">3</a></li>
	    		</ul>
    		</div>
    	</div>
    			<div class="col-xs-2 col-md-4">
 			<div class="dropdown dropleft">
				<button class="btn btn-circle blue  btn-outline dropdown-toggle" title="Modificar" type="button" data-toggle="dropdown">
	      			 Subdivisión <span class="caret"></span></button>
	    		<ul class="dropdown-menu">
	        		<li><a onclick="javascript: funcion1();">1</a></li>
	        		<li><a onclick="javascript: funcion2();">2</a></li>
	        		<li><a onclick="javascript: funcion3();">3</a></li>
	    		</ul>
    		</div>
    	</div>
    	
    	</div>
    </div>
    
    <div class="col-md-12 ">
    		<div class="col-xs-2 col-md-4">
                
                <select id="loadCargo" class="btn blue btn-outline btn-circle btn-sm">
				<option value="">Seleccione un Cargo</option>
				</select>
    	</div>
    			<div class="col-xs-2 col-md-4">
 			<div class="dropdown dropleft">
				<button class="btn btn-circle blue  btn-outline dropdown-toggle" title="Modificar" type="button" data-toggle="dropdown">
	      			 Recorrido Bus <span class="caret"></span></button>
	    		<ul class="dropdown-menu">
	        		<li><a onclick="javascript: funcion1();">1</a></li>
	        		<li><a onclick="javascript: funcion2();">2</a></li>
	        		<li><a onclick="javascript: funcion3();">3</a></li>
	    		</ul>
    		</div>
    	</div>
    	</div>
</div>
	
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	
		<div style="height: 50px;"></div>
		<div class="table-responsive" id="ignore">
			<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Info">
				<thead>
					<tr>
					    <th style="display: none;">Codigo</th>
					    <th>N°</th>
					    <th>Apellido/Nombre</th>
					    <th>Cargo de<br>  Postulación</th>
					    <th>Fecha Último<br>  Contrato</th>
					    <th>Dirección</th>
					    <th>Teléfono</th>
					    <th>E-MAIL</th>
					    <th>Fecha Entrevista</th>
						<th style="min-width: 100px;">Detalles</th>
					</tr>
				</thead>
				<tbody id="tablePreselect"></tbody>
			</table>
		</div>
		<br>	
</div>

<!-- <table -->
<!--    class="table table-striped table-bordered table-hover table-checkable" -->
<!--    id="datatable_ajax"> -->
<!--    <thead> -->
<!--       <tr role="row" class="heading"> -->
<!--          <th width="30%">CertificacionesCol</th> -->
<!--          <th width="20%">Creado</th> -->
<!--          <th width="20%">Modificado</th> -->
<!--          <th width="20%">Actions</th> -->
<!--       </tr> -->
<!--       <tr role="row" class="filter"> -->
<!--          <td><input type="text" -->
<!--             class="form-control form-filter input-sm" name="vw_certificacionescol"> -->
<!--          </td> -->
<!--          <td><input type="text" -->
<!--             class="form-control form-filter input-sm" name="vw_creado"> -->
<!--          </td> -->
<!--          <td><input type="text" -->
<!--             class="form-control form-filter input-sm" name="vw_modificado"></td> -->
<!--          <td> -->
<!--             <div class="margin-bottom-5"> -->
<!--                <button -->
<!--                   class="btn btn-sm green btn-outline filter-submit margin-bottom"> -->
<!--                <i class="fa fa-search"></i> -->
<!--                </button> -->
<!--                <button class="btn btn-sm red btn-outline filter-cancel"> -->
<!--                <i class="fa fa-times"></i> Reset -->
<!--                </button> -->
<!--             </div> -->
<!--          </td> -->
<!--       </tr> -->
<!--    </thead> -->
<!--    <tbody> -->
<!--    </tbody> -->
<!-- </table> -->

<div style="text-align: center;">
	<a id="addAct" onclick="javascript: addAct();" class="btn btn-circle red btn-outline">
		<i class="fa fa-plus"></i> Guardar
	</a>
<!-- 	<a href="homePage" id="addEmpresa" class="btn btn-circle red btn-outline"> -->
<!-- 		<i class="fa fa-times"></i> Cancelar -->
<!-- 	</a> -->
</div>

<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog modal-lg">
   	<div class="modal-content">
      	<div class="modal-header">
       	 <button type="button" class="close" data-dismiss="modal">&times;</button>
       		 <h4 class="modal-title">Orden de Reclutamiento</h4>
      	</div>
      	<div class="modal-body">






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
<tbody id="modalBody">


</tbody>
</table>
             
                       
		  
	 </div>
	 
	 <div >
	
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
      </div>
    </div>

  </div>
</div>

