<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
	<div class="modal fade" id="seeWorkersModal" tabindex="-1" role="dialog" aria-labelledby="seeWorkersModal" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
		<div class="modal-body padding-top-5">
        	<form class="form-horizontal form-refactored noRadius noBorder"  id="seeWorkersForm" role="form">
				<div class="form-body">
						
					<div class="form-group">
						<h4 >Trabajadores</h4>
						<div class="col-md-12">
							<table class="table table-striped table-bordered table-hover dt-responsive table-checkable" id="seeWorkersTable">
                                <thead> 
			                        <tr role="row" class="heading">
			                        <th style="width:2%;">check</th>
				                        <th style="width:2%;">id</th>
				                        <th style="min-width:150px;">Codigo</th>
				                        <th width="20%">Nombre</th>
				                        <th width="20%">Apellido</th>				                        
			                        </tr>
                    			</thead>
                    			<tbody id="tblBodySeeWorkers"></tbody>
            				</table>
						</div>
					</div>	
					
                   	
					<div class="form-actions right1">
						<button type="button" class="btn default" onclick="clearData()">Cancelar</button>
						<button type="button" class="btn green" onclick="agregarworkerstoInput()">Agregar Trabajador</button>
					</div>
				</div>
			</form>	
      </div>
    </div>
  </div>
</div>    
	
	
	
	
	
	
	
	
	
	
	
	
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	<form action="#" class="noBorder noRadios noShadow col-md-12" id="addSolicitudForm">
		<div class="alert alert-danger display-hide text-left" id="Vwa">
	       	<button class="close" data-close="alert"></button>
	       	<p id="textovwa">
	       	
	       	 </p>
       </div>
       <div class="alert alert-success display-hide" id="Vga">
           <button class="close" data-close="alert"></button> No se encontraron errores
       </div>
		<div class="form-body">
			<div class="form-group col-md-12 margin-bottom-1">
				<div class="col-md-6">
				    <div class="col-md-6 form-group">
				    	<div class="col-md-12">
				    		<label class="col-md-12">Rut</label>
						</div>
				    	<div class="col-md-12">
							<select name="SelectorDeRut" id="SelectorDeRut" onchange="cambiarCodigo()" class="form-control input-sm input-circle col-md-12"></select>
						</div>
						
				    </div>
				    <div class="col-md-6 form-group">
				    	<div class="col-md-12">
				    	<label class="col-md-12">Codigo</label>
				    	</div>
				    	<div class="col-md-12">
						<select name="SelectorDeCodigo" id="SelectorDeCodigo" onchange="cambiarRut()" class="form-control  input-sm input-circle col-md-12"></select>
						</div>
				    </div>
				    
								
				</div>	
			
			
                    			
			</div>
			
			
			<div class="form-group col-md-6">
				<div class="col-md-12 margin-bottom-1">
					<div class="col-md-6">
						<label class="colorLabel">Nombre Trabajador:</label>
					</div>
					<div class="col-md-6">
						<input id="nombreTrabajador" type="text" class="form-control input-circle" name="nombreTrabajador">
					</div>
				</div>
				<div class="col-md-12 margin-bottom-1">
					<div class="col-md-6">
						<label class="colorLabel">Feriados Legales:</label>
					</div>
					<div class="col-md-6">
						<input id="feriadosLegales" type="text" class="form-control input-circle" name="feriadosLegales">
					</div>
				</div>
				<div class="col-md-12 margin-bottom-1">
					<div class="col-md-6">
						<label class="colorLabel">Feriados Progresivos:</label>
					</div>
					<div class="col-md-6">
						<input id="feriadosLegales" type="text" class="form-control input-circle" name="feriadosLegales">
					</div>
				</div>
				<div class="col-md-12 margin-bottom-1">
					<div class="col-md-6">
						<label class="colorLabel">Feriados Convencionales:</label>
					</div>
					<div class="col-md-6">
						<input id="feriadosLegales" type="text" class="form-control input-circle" name="feriadosLegales">
					</div>
				</div>			
			</div>
			<div class="form-group col-md-6">
				<div class="col-md-12">
					<div class="col-md-6">
						<label class="colorLabel">Dias Disponibles:</label>
					</div>
					<div class="col-md-6">
						<input id="feriadosLegales" type="text" class="form-control input-circle" name="feriadosLegales">
					</div>
				</div>		
			</div>
			<div class="col-md-12 margin-bottom-1">
				<div class="col-md-3">
				
					<div class="col-md-12 text-center">
						<label class="colorLabel ">fecha solicitud:</label>
					</div>
					<div class="col-md-offset-3 col-md-6">
						<input type="text" class="form-control input-circle text-center" name="fechaSolicitudVacaciones" id="fechaSolicitudVacaciones" disabled/>	
					</div>
					
				</div>
				<div class="col-md-3">
				
					<div class="col-md-12 text-center">
						<label class="colorLabel ">fecha Inicio</label>
					</div>
					<div class="col-md-offset-3 col-md-6">
						<input type="text" class="form-control input-circle text-center" name="fechaSolicitudInicioVacaciones" id="fechaSolicitudInicioVacaciones" onchange="calcularFechaFin()" />	
					</div>
					
				</div>
				
				<div class="col-md-3">
					<div class="col-md-12 text-center">
						<label class="colorLabel ">Cantidad de Días</label>
					</div>
					<div class="col-md-offset-3 col-md-6">
						<input type="number" class="form-control input-circle text-center" name="diasSolicitudVacacion" id="diasSolicitudVacacion" min="0" onchange="calcularFechaFin()"/>
					</div>
				</div>
				<div class="col-md-3">
				
					<div class="col-md-12 text-center">
						<label class="colorLabel ">fecha fin</label>
					</div>
					<div class="col-md-offset-3 col-md-6">
						<input type="text" class="form-control input-circle text-center" name="fechaSolicitudFinalVacaciones" id="fechaSolicitudFinalVacaciones" disabled/>	
					</div>
					
				</div>
			
			</div>
			<div class="form-group">
				<div class="col-md-12">
					<div class="col-md-offset-5 col-md-4">
						<button id="addSolicitudVacaciones" class="btn btn-circle red btn-outline" type="submit"><i class="fa fa-plus"></i> Guardar 
						</button>
					</div>
				</div>
			</div>
		
		</div>
	</form>


</div>



<!-- Seccion de Formulario -->





<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
	<button class="btn btn-circle red btn-outline" onclick="javascript:history.back();">
		Volver <i class="fa fa-reply"></i>
	</button>
</div>

<article id="loading" class="loading_dos" style="display: none;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>
<span class="espacio">.</span>

<style>
.colorLabel{
color: #337ab7;
}
.min-width-150{
min-width: 150px;
}
.min-width-250{
min-width: 250px;
}
.min-width-100{
min-width: 100px;
}
.min-width-50{
min-width: 50px;
}
.padding-30-0-30-0{
padding: 30px 0 30px 0;
}
.margin-bottom-5{
margin-bottom: 5px;
}
.espacio > div > span {
color: #FFFFFF;
}
.noRadius{
	box-shadow: none;
	border-radius:0px;
}
.noBorder{
	    border: none;
}
.margin-bottom-1{
margin-bottom:1%;
}
.noShadow{
box-shadow: none;


}
.form-refactored{
    width: 101%;
    margin: auto;
    border: none;
    box-shadow: none;


}
.swal2-container.swal2-shown {

    z-index: 99999 !important;
}

</style>


			