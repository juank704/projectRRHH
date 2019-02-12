<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
   <h3>Movimientos <small>> Haberes y Descuentos</small></h3>
<div class="col-md-12 ">
<div class="col-md-7"></div>
<div class="col-md-2 ">
		<label style="color: #337ab7;">Empresa:</label>
	</div>
	
	
	<div class="col-md-3 ">
	<select id="Sociedad" class=" form-control btn-circle btn-sm mayusculasWork" >
				<option value="">Seleccione una Empresa</option>
				</select>
	</div>
</div>
<div style="margin-top: 60px"></div>
<div class="col-md-12 portlet light bordered"  id='panelform' >
	<div class="col-md-12 ">
		<div class="col-md-2">
			<label style="color: #337ab7;">Tipo de Haber/Descuento</label>
		</div>
		<div class="col-md-2 ">
			<select id="haberes_descuentos" class=" form-control btn-circle btn-sm mayusculasWork">
							<option value="">Seleccione..</option>
							<option value="h">Haber</option>
							<option value="d">Descuento</option>
						</select>
		</div>
		<div class="col-md-1 ">
			<label style="color: #337ab7;">Conceptos: </label>
		</div>
		<div class="col-md-3">
<!-- 			<select id="conceptos" class=" form-control btn-circle btn-sm"> -->
<!-- 						<option value=''>Seleccione..</option>	 -->
							
<!-- 						</select> -->
						   	<select id="conceptos" class="form-control input-sm input-circle ">
				       
			</select>
		</div>
<!-- 		<div class="col-md-2"> -->
<!-- 			<label style="color: #337ab7;">Mes de Periodo: </label> -->
<!-- 		</div> -->
<!-- 		<div class="col-md-2"> -->
				
<!-- 			<input type="month" name="filLiq" id="periodo" class="form-control input-circle mayusculasWork"> -->
<!-- 		</div> -->

	</div>
	<div style="margin-top: 40px"></div>



	<div class="col-md-12 ">
	    		<div class="col-md-2 ">
			<label style="color: #337ab7;">Código Trabajador: </label>
			
		</div>
		<div class="col-md-2">
		<select id="CodigoTra" class="form-control input-sm input-circle mayusculasWork">
          
         
          
</select>
		

		</div>
		<div class="col-md-2 ">
			<label style="color: #337ab7;">Monto:</label>
		</div>
		<div class="col-md-2 ">
		    <input type="number" class="form-control input-circle" style="display: none;" id="montonew" onchange="setTwoNumberDecimal" min="0"  step="0.01" value="0.00" />
			<input id="monto" type="text" name="ReAct" id="cantidadP" class="form-control input-circle number" >
		</div>
		<div class="col-md-2">
      <label style="color: #337ab7;">Fecha Contrato: </label> 
		</div>
	<div class="col-md-2 "> 
	<select id="idContrato" class=" form-control btn-circle btn-sm mayusculasWork">
						
							
						</select>
<!-- 			<input readonly type="text" id="fecha" class="form-control input-circle" -->
<!-- 				onchange="javascript: valDias(this)" placeholder="Seleccione una Fecha"> -->
</div> 
		
	</div>
	<div style="margin-top: 80px"></div>
	<div class="col-md-12 ">
	    		<div class="col-md-2 ">
	    		<label style="color: #337ab7;">Frecuencia: </label>
	    		</div>
	    		<div class="col-md-2 ">
	    	
				<select id="frecuencia" class=" form-control btn-circle btn-sm mayusculasWork">
						<option value=''>Seleccione..</option>	
							
						</select>
	    		</div>
	    		
	    		<div class="col-md-2 ">
	    			<label style="color: #337ab7;">Proporcional: </label>
	    		</div>
	    		<div class="col-md-2 ">
 					<input type='checkbox' id='checkProporcional' value='' style='-ms-transform: scale(1.5);-moz-transform: scale(1.5);-webkit-transform: scale(1.5);-o-transform: scale(1.5);'>
	    		</div>
	    		
	    		<div class="col-md-2 ">
	    			<label style="color: #337ab7;">Tipo Moneda: </label>
	    		</div>
	    		<div class="col-md-2 ">
					<select id="tipoMoneda" class=" form-control btn-circle btn-sm mayusculasWork">
						<option value=''>Seleccione..</option>	
					</select>
	    		</div>
	    		
	    		
	    		
	    	
	    		
	</div>
	<div style="margin-top: 120px"></div>
	<div class="col-md-12 ">
	    <div class="col-md-2 ">
	    			<label style="color: #337ab7;" id="labelfecha">Mes de Periodo: </label>
	    		</div>
	    		<div class="col-md-2 ">
	    		<input   type="text" id="fechaCuotas" class="form-control input-circle mayusculasWork"
				onchange="javascript: valDias(this)" placeholder="Seleccione una Fecha">
	    </div>
	    
	    
	    <div class="col-md-2 ">
	    			<label style="color: #337ab7;display: none;" id="labelnumero">N°: </label>
	    		</div>
	    		<div class="col-md-2 ">
	    		<input style="display: none;" id="monto2" type="number" name="ReAct" class="form-control input-circle" disabled>
	    </div>
	    		
		<div class="col-md-2 ">
	    	<label style="color: #337ab7; display: none;" id="labelfechaCuotasTermino">Fecha Término: </label>
	    </div>
	    
	    <div class="col-md-2 ">
	    		<input style="display: none;" type="text" id="fechaCuotasTermino" class="form-control input-circle mayusculasWork"
				onchange="javascript: valDias(this)" placeholder="Seleccione una Fecha" >
	    </div>
	    
	    
		
	</div><!-- end col-md-12- -->
	<div style="margin-top: 160px"></div>
	<div class="col-md-12 ">
	<div class="col-md-2">
			<a id="1" class="btn btn-circle red btn-outline"
				onclick="javascript: addForm();"><i class="fa fa-plus"></i> </a>
		</div>
		<div class="col-md-8"></div>
		<div class="col-md-2">
			<a class="btn btn-circle blue btn-outline"
				onclick="javascript: Enviar();"> <i class="fa fa-floppy-o fa-lg">
					Grabar</i>
			</a>
		</div>
	</div>
</div>

<div class="table-responsive">
	<table class="table table-bordered table-hover tzable-striped table-condensed dataTable no-footer" id="tbl_Fito">
		<thead>
			<tr>
			    <th style='display: none;' >Concepto</th>
			    <th>Concepto</th>
				<th >Código</th>
				<th >Apellidos</th>
				<th>Nombres</th>
				<th>Proporcional</th>
				<th>Tipo de Moneda</th>
				<th style='display: none;' >id moneda</th>
				<th>Monto</th>
				<th>Frecuencia</th>
				<th style='display: none;'>idFrecuencia</th>
				<th>Cuotas</th>
				<th>Fecha Inicio</th>
				<th>Fecha Termino</th>
				<th>Opciones</th>
				<th style='display: none;'>Tipo</th>
				<th style='display: none;'>id Contrato</th>
				
			</tr>
		</thead>
		<tbody id="tblPeticion"></tbody>
	</table>
</div>


<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>


	
