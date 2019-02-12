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

<div class='col-md-12 portlet light bordered' id='todo' style='margin-top: 10px'>
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
	<div class="col-md-12" style="margin-top: 10px">
	<div class="col-md-1">
			<label style="color: #337ab7;">Fecha Contrato: </label>
	</div>
	<div class="col-md-3 ">
		<select id="idContrato" class=" form-control btn-circle btn-sm mayusculasWork"></select>
	</div>
	
	<div class="col-md-2">
			<label style="color: #337ab7;">Tipo de Haber/Descuento</label>
		</div>
		<div class="col-md-2 ">
			<select id="haberes_descuentos" class=" form-control btn-circle btn-sm mayusculasWork">
							<option value="">Seleccione..</option>
							<option value="hn" class="noimponible">Haber no Imponible</option>
							<option value="h"  class="imponible">Haber Imponible</option>			
							<option value="d">Descuento</option>
							<option value="c">Costo Empresa</option>
						</select>
		</div>
		<div class="col-md-1 ">
			<label style="color: #337ab7;">Conceptos: </label>
		</div>
				<div class="col-md-3">
					<select id="conceptos" class="form-control input-sm input-circle ">
				</select>
				</div>
	
</div>
<div class="col-md-12" style="margin-top: 10px">
	<div class="col-md-1">
		<label style="color: #337ab7;">Mes de Periodo: </label>
	</div>
	<div class="col-md-3">	
		<input type="month" name="filLiq" id="periodo" class="form-control input-circle mayusculasWork">
	</div>
	<div class="col-md-1 ">
		<label style="color: #337ab7;">Código Trabajador: </label>
	</div>
	<div class="col-md-6">
		<select id="CodigoTra" class="form-control input-sm input-circle mayusculasWork">
			<option value="">Buscar</option>
		</select>
	</div>		
	<div class="col-md-1">
		<button title="Buscar" id="1" onclick="buscar();" class="btn btn-circle blue btn-outline btn-sm">
			<i class="fa fa-search"></i>
		</button>
	</div>
</div>
</div>	

 <div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	
		<div style="height: 50px;"></div>
		<div class="table-responsive" id="ignore">
			<table class="table table-bordered table-hover table-striped table-condensed col-md-12" id="loadTabla" >
				<thead>
					<tr>
						
						<th>Periodo</th>
						<th>Cód.<br> Trabajador</th>
						<th>Nombre</th>
						<th >Tipo id</th>
						<th>Tipo</th>
						<th>Código HD</th>
						<th>Código HD</th>
						<th>Tipo Monedaaa</th>
						<th>ID Moneda</th>
						<th>Monto</th>
						<th>Frecuencia</th>
						<th>idfrecuencia</th>
						<th>Cuotas</th>
						<th>Fecha<br>Inicio</th>
						<th>Fecha<br>Termino</th>
						
						<th style="min-width: 100px;">Opciones</th>
						<th>id</th>
						<th>id frecuencia</th>
						<th>proporcional</th>
					
						
					</tr>
				</thead>
				<tbody id="tablePreselect"></tbody>
			</table>
		</div>
		<br>	
</div>
<div class="container">
 <div class="modal fade"  id="modalupdate"  role="dialog">
    <div class="modal-dialog modal-lg">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          
          <h4 class="modal-title">Editar</h4>
        </div>
        <div class="modal-body">
        	
        		<div class="col-md-6" style="margin-top: 10px;">
   					<div class="col-md-12">
    					<h4>Codigo Trabajador</h4>
    				</div>
    				<div class="col-md-12">
    					<input type="text" class="form-control btn-circle btn-sm mayusculasWork"  id="cod_trab" value="" disabled>
    				</div>
    			</div>
   
        	
     		<div class="col-md-6" style="margin-top: 10px;">
    			<div class="col-md-12">
    				<h4>Nombre</h4>
    			</div>
   				 <div class="col-md-12">
    				<input type="text" class="form-control btn-circle btn-sm mayusculasWork"  id="nombre_trab" value="" disabled>
    			</div>
   			 </div>
   			 
   			 <div class="col-md-6">
    		 	<div class="col-md-12">
    				<h4>Tipo</h4>
    			</div>
    			<div class="col-md-12">
    				<select id="tipo_trab" class=" form-control btn-circle btn-sm mayusculasWork" value=""  selected="selected">
    	    			<option value=''>Seleccione...</option>
    	    			<option value="hn" class="noimponible">Haber no Imponible</option>
						<option value="h"  class="imponible">Haber Imponible</option>	
    	    			<option value="d">Descuento</option>
    	    			<option value="c">Costo Empresa</option>
    	    		</select>
    	    	</div>
    		 </div>
    		 
    		 <div class="col-md-6">
   			 	<div class="col-md-12">
    				<h4>Código HD</h4>
    			</div>
    			<div class="col-md-12">
    				<select id="conceptos2" class=" form-control btn-circle btn-sm mayusculasWork" value="" ></select>
				</div>
			</div>
			
			<div class="col-md-6">
    			<div class="col-md-12">
    				<h4>Monto</h4>
    			</div>
    			<div class="col-md-12">
    			    <input type="number" class="form-control input-circle" style="display: none;" id="montonew" onchange="setTwoNumberDecimal" min="0"  step="0.01" placeholder="0.00" value="0.00" />
    				<input type="text" class="form-control btn-circle btn-sm number"  id="monto_trab" value="" name="" style="display: none;">
    			</div>
   			</div>
   			
   			<div class="col-md-6">
    			<div class="col-md-12">
    				<h4 id="labelfrecuenciaT">Frecuencia</h4>
    			</div>
    			<div class="col-md-12">
    				<select id="frecuenciaT" class=" form-control btn-circle btn-sm mayusculasWork" value="" >
    				<option value=''>Seleccione...</option>
    				</select>
    			</div>
    		</div>
    		
    		<div class="col-md-6">
    			<div class="col-md-12">
  					<h4 id="labelcuotaT">Cuotas</h4>
    			</div>
   				<div class="col-md-12">
   					 <input type="number" class="form-control btn-circle btn-sm mayusculasWork"  id="cuotaT" value="" >
    			</div>
    		</div>
    		
   			<div class="col-md-6">
    			<div class="col-md-12">
    				<h4>Tipo Moneda</h4>
    			</div>
    			<div class="col-md-12">
    				<select id="tipoMoneda" class=" form-control btn-circle btn-sm mayusculasWork">
						<option value=''>Seleccione..</option>	
					</select>
    			</div>
    		</div>
    		
    		<div class="col-md-6">
    	    	<div class="col-md-12">
    	    		<h4 id="labelfechaI_trab">Fecha Inicio</h4>
    	    	</div>
    	    	<div class="col-md-12">
    	    		<input type="text" class="form-control btn-circle btn-sm mayusculasWork"  id="fechaI_trab" value="" placeholder="Seleccione...">
    	    	</div>
    	    </div>
    	    
    	    <div class="col-md-6">
    			<div class="col-md-12">
   					<h4 id="labelfechT_trab">Fecha Termino</h4>
    			</div>
    			<div class="col-md-12">
    				<input type="text" class="form-control btn-circle btn-sm mayusculasWork"  id="fechT_trab" value="" placeholder="Seleccione...">
    			</div>
    		</div>
    		<div class="col-md-6">
    			<div class="col-md-12">
   					<h4 id="labelfechT_trab">Proporcional</h4>
    			</div>
    			<div class="col-md-12">
    			 <input type="checkbox" id="checkProporcional" value="" style="-ms-transform: scale(1.5);-moz-transform: scale(1.5);-webkit-transform: scale(1.5);-o-transform: scale(1.5);">
    			</div>
    		</div>
    		
    
    		<div class="col-md-6"  style="display: none;">
   				<div class="col-md-12">
    				<h4>id</h4>
    			</div>
    			<div class="col-md-12">
    				<input type="text" class="form-control"  id="id_trab" value="" disabled>
    			</div>
    		</div>
			
        </div><!-- end modal-body" -->
        <div class="modal-footer">
        <div class="col-md-4"></div>
          <div class="col-md-6" style="margin-top: 40px;">
           <div class='btn btn-circle blue btn-outline' id='actualizarUp' onclick="actualizarTrabajador();"><i class='fa fa-clock-o'></i> Actualizar</div>
            <div class='btn btn-circle blue btn-outline' id='cerrarActualiza' onclick="cerraryactualizar();"><i class='fa fa-clock-o'></i> Cerrar y Actualizar </div>
          <div class='btn btn-circle red btn-outline'data-dismiss="modal">Cerrar</div>
           </div>
           <div class="col-md-4"></div>
        </div>
      </div>
      
    </div>
  </div>
  </div>

<p style="color:white">.</p>
<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>
<style>
.tdcenter{
text-align: center;
}
.tdnone{
display: none;
}
</style>