<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 
<div class="col-md-12 ">
<div class="col-md-2">
<label style="color: #337ab7;">Tipo Nómina</label>
</div>
<div class="col-md-5">
		<select id="TipoNomina"
			class=" form-control btn-circle btn-sm mayusculasWork">
			<option value="">Seleccione un Tipo de Nómina</option>
			<option value="1" selected >Nómina De Pago Anticipos</option>
			<option value="3">Nómina De Pago Liquidación</option>
			<option value="2">Nómina De Pago Finiquito</option>
			
		</select>
	</div>
<div class="col-md-2 ">
		<label style="color: #337ab7;">Empresa:</label>
	</div>
	<div class="col-md-3 ">
	<select id="empresaB" class=" form-control btn-circle btn-sm mayusculasWork valoridEmpresa" name="valoridEmpresa">
				<option value="">Seleccione una Empresa</option>
				</select>
	<select id="empresaFiniquito" class=" form-control btn-circle btn-sm mayusculasWork valoridEmpresa" name="valoridEmpresa" style="display:none">
				<option value="">Seleccione una Empresa</option>
				</select>
	<select id="empresaLiquidacion" class=" form-control btn-circle btn-sm mayusculasWork valoridEmpresa" name="valoridEmpresa" style="display:none">
				<option value="">Seleccione una Empresa</option>
				</select>
	</div>
</div>
<br>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered" style="margin-top: 10px;" id="divAnticipo">
<p>Nómina De Pago Anticipos</p>
    <div class="col-md-12">
        <h4>Filtros</h4>
          <div class="row">
            <div class="col-md-3">
                    <h5 class="text-center">Periodo Proceso</h5>
                <div class="col-md-12 text-center">
                    <input autocomplete="off" type="month" id="periodoRemuneraciones" class="form-control input-circle mayusculasWork">
                </div>
            </div>
            <div class="col-md-3">
                   <h5 class="text-center">Fecha Pago</h5>
				<div class="col-md-12 ">

					<select autocomplete="off" id="fechaPago"
						class="row_dataCuenta form-control input-circle mayusculasWork" edit-type="click"
						name="selectTipoCuenta">
						<option value="">Seleccione...</option>

					</select>
				</div>
			</div> 
			<div class="col-md-3">  
              <h5 class="text-center">Tipo Cuenta</h5>
                <div class="col-xs-12 col-sm-12 col-md-12">
                       <select id="selectTipoCuenta" class="row_dataCuenta form-control input-circle mayusculasWork" edit-type="click" name="selectTipoCuenta">
                                <option value="">Seleccione...</option>
                                
                        </select>
                </div>
             </div>
			<div class="col-md-3">
				<h5 class="text-center">Huerto</h5>
				<div class="col-md-12">
					<select id="divisionB"
						class="row_dataCuenta form-control input-circle mayusculasWork"
						edit-type="click" name="selectTipoCuenta">
						<option value="">Seleccione...</option>

					</select>

				</div>
			</div>
		</div> 
    </div> 
    <div class="col-md-12">
       <div class="row">
			<div class="col-md-3">
				<h5 class="text-center">Zona</h5>
				<div class="col-md-12">


					<select id="subdivisionB"
						class="row_dataCuenta form-control input-circle mayusculasWork"
						edit-type="click" name="selectTipoCuenta">
						<option value="">Seleccione...</option>

					</select>

				</div>
			</div>
			<div class="col-md-3">
				<h5 class="text-center">CECO</h5>
				<div class="col-md-12">


					<select id="grupoB"
						class="row_dataCuenta form-control input-circle mayusculasWork"
						edit-type="click" name="selectTipoCuenta">
						<option value="">Seleccione...</option>

					</select>

				</div>
			</div>
			
			<div class="col-md-3">
				<h5 class="text-center">Banco</h5>
				<div class="col-md-12">


					<select id="bancoB"
						class="row_dataCuenta form-control input-circle mayusculasWork"
						edit-type="click" name="selectTipoCuenta">
						<option value="">Seleccione...</option>

					</select>

				</div>
			</div>
			
       </div>    
    </div>
    <div class="col-md-12">
         <div class="row">
			
            <div class="col-md-3">
             <h5 class="text-center"  id="label_nombre_PA_anticipo" style="display: none;">Nombre Persona Autorizada</h5>
             <input type="text"  id="nombrePersonaAutorizada" placeholder="Ingrese Nombre" class="form-control blue input-circle mayusculasWork" style="display: none;">
            </div>
            <div class="col-md-3">
            	<h5 class="text-center" id="label_rut_PA_anticipo" style="display: none;">RUT Persona Autorizada</h5>
            	<input type="text"  id="rutPersonaAutorizada" placeholder="Ingrese RUT" class="form-control blue input-circle mayusculasWork newRut" style="display: none;">
            </div>
            <div class="col-md-6">
            <h5 class="text-center" id="label_oficina" style="display: none;">Oficina</h5>
            <select id="oficina" class="form-control input-sm input-circle mayusculasWork"></select>
			</div>
		</div>    
            
          
        
               
    </div>
    
    
    <div class="col-md-12">
         <div class="row">
    
    
    <div class="col-md-3">
			<div class="col-md-12">
			
             	<button id="Enviartesoreria" title="Generar Voucher" style="margin-top: 35px;"
					class="btn btn-circle yellow btn-outline" data-toggle="modal"
					onclick="javascript:modalAnticipo();">
					<i class="fa fa-dollar"></i> Generar Voucher
				</button>
				
				
				
			  </div>
             </div>
             <div class="col-md-4">
             
             </div>

             <div class="col-md-5">
				<h5 class="text-center">Monto Total Operación</h5>
				<div class="col-md-12">
					<div class="input-icon col-md-12 ">
					<i class="fa fa-dollar font-green formatedBox"></i> <input
						type="text" name="montoTotal" id="montoTotal"
						class="form-control blue input-circle  mayusculasWork"
						placeholder="Monto Total" disabled>
				</div>
				</div>
			</div>
    
    </div>
    </div>
    
    
    
</div>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered" style="margin-top: 10px;display: none;" id="divLiquidacion">
<p>Nómina De Pago Liquidación</p>
    <div class="col-md-12">
        <h4>Filtros</h4>
          <div class="row">
            
            <div class="col-md-3">
                    <h5 class="text-center">Periodo Proceso</h5>
                <div class="col-md-12">
                    <input autocomplete="off" type="month" id="periodoRemuneracionesLiqui" class="form-control input-circle mayusculasWork">
                </div>
            </div>
            <div class="col-md-3">
                   <h5 class="text-center">Fecha Pago</h5>
				<div class="col-md-12 ">

					<select autocomplete="off" id="fechaPagoLiquidacion"
						class="row_dataCuenta form-control input-circle mayusculasWork" edit-type="click"
						name="selectTipoCuentaLiqui">
						<option value="">Seleccione...</option>

					</select>
				</div>
			</div>
			<div class="col-md-3">

				<h5 class="text-center">Tipo Cuenta</h5>
				<div class="col-md-12">
					<select id="selectTipoCuentaLiqui"
						class="row_dataCuenta form-control input-circle mayusculasWork"
						edit-type="click" name="">
						<option value="">Seleccione...</option>

					</select>
				</div>

			</div>
			<div class="col-md-3">
				<h5 class="text-center">Huerto</h5>
				<div class="col-md-12">


					<select id="divisionLiqui"
						class="row_dataCuenta form-control input-circle mayusculasWork" edit-type="click" name="">
						<option value="">Seleccione...</option>
					</select>

				</div>
			</div>
		</div> 
    </div> 
    <div class="col-md-12">
            <div class="row">

			<div class="col-md-3">
				<h5 class="text-center">Zona</h5>
				<div class="col-md-12">


					<select id="subdivisionLiqui"
						class="row_dataCuenta form-control input-circle mayusculasWork"	edit-type="click" name="selectTipoCuenta">
						<option value="">Seleccione...</option>
					</select>

				</div>
			</div>
			<div class="col-md-3">
				<h5 class="text-center">CECO</h5>
				<div class="col-md-12">
					<select id="grupoLiqui"
						class="row_dataCuenta form-control input-circle mayusculasWork"	edit-type="click" name="selectTipoCuenta">
						<option value="">Seleccione...</option>
					</select>
				</div>
			</div>
			<div class="col-md-3">
				<h5 class="text-center">Banco</h5>
				<div class="col-md-12">
					<select id="bancoLiqui"
						class="row_dataCuenta form-control input-circle mayusculasWork"	edit-type="click" name="selectTipoCuenta">
						<option value="">Seleccione...</option>
					</select>
				</div>
			</div>

		</div>
              
    </div>
    
    <div class="col-md-12">
         <div class="row">
			
            <div class="col-md-3">
             <h5 class="text-center"  id="label_nombre_PA_liquidacion" style="display: none;">Nombre Persona Autorizada</h5>
             <input type="text"  id="nombrePersonaAutorizadaliquidacion" placeholder="Ingrese Nombre" class="form-control blue input-circle mayusculasWork" style="display: none;">
            </div>
            <div class="col-md-3">
            	<h5 class="text-center" id="label_rut_PA_liquidacion" style="display: none;">RUT Persona Autorizada</h5>
            	<input type="text"  id="rutPersonaAutorizadaliquidacion" placeholder="Ingrese RUT" class="form-control blue input-circle mayusculasWork newRut" style="display: none;">
            </div>
            <div class="col-md-6">
            <h5 class="text-center" id="label_oficinaliquidacion" style="display: none;">Oficina</h5>
            <select id="oficinaliquidacion" class="form-control input-sm input-circle mayusculasWork"></select>
			</div>
		</div>    
            
          
        
               
    </div>
    <div class="col-md-12">
          <div class="row">
   <div class="col-md-3">
	<button id="Enviartesoreria" title="Generar Voucher" style="margin-top: 35px;"
					class="btn btn-circle yellow btn-outline" data-toggle="modal"
					onclick="javascript:modalLiquidacion()">
					<i class="fa fa-dollar"></i> Generar Voucher
				</button>
				
					
				
    </div>
			<div class="col-md-4">
			
			</div>
			<div class="col-md-5">
				
                <h5 class="text-center">Monto Total Operación</h5>
                <div class="col-md-12 ">
					<div class="input-icon col-md-12 ">
                        <i class="fa fa-dollar font-green formatedBox"></i>
                    	<input type="text" name="montoTotalLiqui" id="montoTotalLiqui" class="form-control blue input-circle number mayusculasWork" placeholder="Monto Total" disabled>
					</div>
                </div>
           
			</div>
		  </div>   
    </div>
</div>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered" style="margin-top: 10px; display: none;" id="divFiniquito">
<p>Nómina De Pago Finiquito</p>
    <div class="col-md-12">
        <h4>Filtros</h4>
		<div class="row">
		<div class="col-md-3">
                    <h5 class="text-center">Periodo Proceso</h5>
                <div class="col-md-12 text-center">
                    <input autocomplete="off" type="month" id="periodoRemuneracionesFiniquito" class="form-control input-circle mayusculasWork">
                </div>
            </div>
			<div class="col-md-3 text-center">
				<h5 class="text-center">Fecha de Pago</h5>
				<div class="col-md-12 ">
                   
					<select autocomplete="off" id="fechaTerminoContratoFiniquito"
						class="row_dataCuenta form-control input-circle mayusculasWork"
						edit-type="click" name="">
						<option value="">Seleccione...</option>

					</select>
				</div>
			</div>
			 <div class="col-md-3">
			 	      <h5 class="text-center">Tipo Cuenta</h5>
                <div class="col-md-12">
                       <select id="selectTipoCuentaFiniquito" class="row_dataCuenta form-control input-circle mayusculasWork" edit-type="click" name="selectTipoCuenta">
                                <option value="">Seleccione...</option>
                                
                        </select>
                </div>
			 
			 </div>
			<div class="col-md-3">
				<h5 class="text-center">Huerto</h5>
				<div class="col-md-12">
					<select id="divisionFiniquito"
						class="row_dataCuenta form-control input-circle mayusculasWork"
						edit-type="click" name="selectTipoCuentaFiniquito">
						<option value="">Seleccione...</option>
					</select>
				</div>
			</div>
			
		</div>
	</div> 

    <div class="col-xs-12 col-sm-12 col-md-12">
         <div class="row">
         	<div class="col-md-3">
                    <h5 class="text-center">Zona</h5>
                     <div class="col-md-12">
	                     <select id="subdivisionFiniquito" class="row_dataCuenta form-control input-circle mayusculasWork" edit-type="click" name="selectTipoCuenta">
	                                <option value="-1">Seleccione...</option>                               
	                     </select> 
            		</div>
        	 </div>
        	 <div class="col-md-3">
        	 	 <h5 class="text-center">CECO</h5>
        	 	  <div class="col-md-12">
        	 	  	<select id="grupoFiniquito" class="row_dataCuenta form-control input-circle mayusculasWork" edit-type="click" name="selectTipoCuenta">
                                <option value="">Seleccione...</option>
                              
                        </select>
        	 	  </div>
        	 </div>
        	  
        	  <div class="col-md-3">
        	  	<h5 class="text-center">Banco</h5>
        	  	<div class="col-md-12">
        	  		  <select id="bancoFiniquito" class="row_dataCuenta form-control input-circle mayusculasWork" edit-type="click" name="selectTipoCuenta">
                                <option value="">Seleccione...</option>
                               
                        </select>
        	  	</div>
        	   </div>
         </div>         
    </div>
    
    <div class="col-md-12">
         <div class="row">
			
            <div class="col-md-3">
             <h5 class="text-center"  id="label_nombre_PA_finiquito" style="display: none;">Nombre Persona Autorizada</h5>
             <input type="text"  id="nombrePersonaAutorizadaFiniquito" placeholder="Ingrese Nombre" class="form-control blue input-circle mayusculasWork" style="display: none;">
            </div>
            <div class="col-md-3">
            	<h5 class="text-center" id="label_rut_PA_finiquito" style="display: none;">RUT Persona Autorizada</h5>
            	<input type="text"  id="rutPersonaAutorizadaFiniquito" placeholder="Ingrese RUT" class="form-control blue input-circle mayusculasWork newRut" style="display: none;">
            </div>
            <div class="col-md-6">
            <h5 class="text-center" id="label_oficina_finiquito" style="display: none;">Oficina</h5>
            <select id="oficinaFiniquito" class="form-control input-sm input-circle mayusculasWork"></select>
			</div>
		</div>    
            
          
        
               
    </div>
    
     <div class="col-xs-12 col-sm-12 col-md-12">
         <div class="row">
            <div class="col-md-3">
             	<button id="Enviartesoreria" title="Generar Voucher" style="margin-top: 35px;"
					class="btn btn-circle yellow btn-outline" data-toggle="modal"
					onclick="javascript:modalfiniquito()">
					<i class="fa fa-dollar"></i> Generar Voucher
				</button>
						
				
             </div>
            <div class="col-md-4">
            	
            </div>
		    <div class="col-md-5">
						<h5 class="text-center">Monto Total Operación</h5>
		                <div class="col-md-12 ">
							<div class="input-icon col-md-12 ">
		                        <i class="fa fa-dollar font-green formatedBox"></i>
		                    	<input type="text" name="montoTotalFiniquito" id="montoTotalFiniquito" class="form-control blue input-circle number mayusculasWork" placeholder="Monto Total" disabled>
							</div>
		                </div>
					</div>
			</div>
	</div>
    
</div>
<br>	
<div id="tblAnticipo" class="col-xs-12 col-sm-12" style="">
	<div class="table-responsive" >
		<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Info">
			<thead>  
			      <tr>        
					<th><input type="checkbox" disabled id="" value="option2" checked></th>
					<th>Fecha Anticipo</th>
					<th>Cód T</th>
	                <th>Trabajador</th>                
					<th>Banco</th>
					<th>id Banco</th>
					<th>N° Cuenta</th>
	                <th>Tipo Cta</th>
	                <th>id Tipo Cta</th>
                    <th>Monto</th>
                    <th>idtabla_sw_asignacionAnticipos</th>
                    <th>Periodo</th>
                    <th>Rut</th>
                    <th>Direccion</th>
                    <th>Huerto</th>
					
                </tr>
			</thead>
			
			<tbody id="tablePreselect">
             
               
            
            </tbody>

		</table>
	</div>
</div>
<div id="tblFiniquito" class="col-xs-12 col-sm-12" style="display:none;">
	<div class="table-responsive">
		<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Info2">
			<thead>  
			      <tr>        
					<th class="text-center"><input type="checkbox" disabled id="" value="option2" checked></th>
					<th class="text-center">Fecha Anticipo</th>
					<th class="text-center">Cód T</th>
	                <th class="text-center">Trabajador</th>                
					<th class="text-center">Banco</th>
					<th class="text-center" style='display: none;'>id Banco</th>
					<th class="text-center">N° Cuenta</th>
	                <th class="text-center">Tipo Cta</th>
	                <th class="text-center" style='display: none;'>id Tipo Cta</th>
                    <th class="text-center">Monto</th>
                     <th class="text-center" style='display: none;'>idtabla_sw_asignacionAnticipos</th>
                    <th class="text-center" style='display: none;'>Periodo</th>
                    <th class="text-center" style='display: none;'>Rut</th>
                    <th class="text-center" style='display: none;'>Direccion</th>
                    <th>Huerto</th>
					
                </tr>
			</thead>
			
			<tbody id="tablePreselectFiniquito">
             
               
            
            </tbody>

		</table>
	</div>
</div>
<div id="tblLiquidacion" class="col-xs-12 col-sm-12" style="display:none;">
	<div class="table-responsive">
		<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Info3">
			<thead>  
			      <tr>        
					<th><input type="checkbox" disabled id="" value="option2" checked></th>
					<th>Fecha Pago</th>
					<th>Cód T</th>
	                <th>Trabajador</th>                
					<th>Banco</th>
					<th>id Banco</th>
					<th>N° Cuenta</th>
	                <th>Tipo Cta</th>
	                <th>id Tipo Cta</th>
                    <th>Monto</th>
                    <th>idtabla_sw_liquidacion</th>
                    <th>Periodo</th>
                    <th>Rut</th>
                    <th>Direccion</th>
                    <th>Huerto</th>
                    
					
                </tr>
			</thead>
			
			<tbody id="tablePreselectLiquidacion">
             
               
            
            </tbody>

		</table>
	</div>
</div>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered" id="botonAnticipos" style="">

    <div class="col-md-12">
         <div class="row">
           <div class="col-md-4"> </div>
            
           
            
             
             <div class="col-md-4"> </div>
           
            </div>
    </div>
</div>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered" id="botonFiniquito" style="display:none">

    <div class="col-md-12">
         <div class="row">
           <div class="col-md-4"> </div>
            
           
            
             
             <div class="col-md-4"> </div>
           
            </div>
    </div>
</div>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered" id="botonLiquidacion" style="display:none">

    
</div>
<br>
<br>
<br>
<br>
<br>
<div class="container">
 <div class="modal fade"  id="nombre_nomina_liquidacion"  role="dialog">
    <div class="modal-dialog modal-lg">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          
          <h4 class="modal-title">Nombre Nómina Liquidación</h4>
        </div>
        <div class="modal-body">
        	
        		<div class="col-md-6" style="margin-top: 10px;">
   					<div class="col-md-12">
    					<h4>Ingrese un Nombre de Nómina</h4>
    				</div>
    				<div class="col-md-12">
    					<input type="text" class="form-control btn-circle btn-sm mayusculasWork"  id="nombreNominaLiquidacion" value="" maxlength="25">
    				</div>
    			</div>
   
			
        </div><!-- end modal-body" -->
        <div class="modal-footer">
        <div class="col-md-4"></div>
          <div class="col-md-4" style="margin-top: 20px;">
           <div class='btn btn-circle blue btn-outline' id='' onclick="javascript:EnviarTesoreriaLiquidacion()"><i class='fa fa-clock-o'></i>Generar Voucher</div>
          <div class='btn btn-circle red btn-outline'data-dismiss="modal">Cerrar</div>
           </div>
           <div class="col-md-4"></div>
        </div>
      </div>
      
    </div>
  </div>
  </div>
<div class="container">
 <div class="modal fade"  id="nombre_nomina_finiquito"  role="dialog">
    <div class="modal-dialog modal-lg">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          
          <h4 class="modal-title">Nombre Nómina Finiquito</h4>
        </div>
        <div class="modal-body">
        	
        		<div class="col-md-6" style="margin-top: 10px;">
   					<div class="col-md-12">
    					<h4>Ingrese un Nombre de Nómina</h4>
    				</div>
    				<div class="col-md-12">
    					<input type="text" class="form-control btn-circle btn-sm mayusculasWork"  id="nombreNominaFiniquito" value="" maxlength="25">
    				</div>
    			</div>
   
			
        </div><!-- end modal-body" -->
        <div class="modal-footer">
        <div class="col-md-4"></div>
          <div class="col-md-4" style="margin-top: 20px;">
           <div class='btn btn-circle blue btn-outline' id='' onclick="javascript:EnviarTesoreriaFiniquito()"><i class='fa fa-clock-o'></i>Generar Voucher</div>
          <div class='btn btn-circle red btn-outline'data-dismiss="modal">Cerrar</div>
           </div>
           <div class="col-md-4"></div>
        </div>
      </div>
      
    </div>
  </div>
  </div>
<div class="container">
 <div class="modal fade"  id="nombre_nomina_anticipo"  role="dialog">
    <div class="modal-dialog modal-lg">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          
          <h4 class="modal-title">Nombre Nómina Anticipo</h4>
        </div>
        <div class="modal-body">
        	
        		<div class="col-md-6" style="margin-top: 10px;">
   					<div class="col-md-12">
    					<h4>Ingrese un Nombre de Nómina</h4>
    				</div>
    				<div class="col-md-12">
    					<input type="text" class="form-control btn-circle btn-sm mayusculasWork"  id="nombreNominaAnticipo" value="" maxlength="25">
    				</div>
    			</div>
   
			
        </div><!-- end modal-body" -->
        <div class="modal-footer">
        <div class="col-md-4"></div>
          <div class="col-md-4" style="margin-top: 20px;">
           <div class='btn btn-circle blue btn-outline' id='' onclick="javascript:EnviarTesoreria()"><i class='fa fa-clock-o'></i>Generar Voucher</div>
          <div class='btn btn-circle red btn-outline'data-dismiss="modal">Cerrar</div>
           </div>
           <div class="col-md-4"></div>
        </div>
      </div>
      
    </div>
  </div>
  </div>


<div class="dragbox ui-resizable">
	<div class="dragbox-content"></div>
</div>
<p style="color:white">.</p>
<article id="loading" class="loading_dos" style="display: none;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>
<div id="wait" style="display:none;width:69px;height:89px;border:1px solid black;position:absolute;top:50%;left:50%;padding:2px;"><img src='https://cdn.dribbble.com/users/597268/screenshots/2991038/dribbble_2x.gif' width="64" height="64" /><br>Loading..</div>
<style>
.noShadowNoRadius{
	box-shadow: none;
}
.noRadius{
	box-shadow: none;
	border-radius:0px;
}
.noBorder{
	    border: none;
}
.text-right{
	text-align: right;
}
.text-left{
	text-align:left;
}
.padding-top-5{
padding-top: 5px;
}
.title-padding{
padding-top: 2%;
    padding-left: 2.5%;}
.form-fix{
width: auto;
 
   
    margin: 1em;
    
    text-align: right;
    }
input[type="file"] {
   	height: 2.39em;
    left: -1px;
    top: -26px;
    width: 9em;
    position: relative;
    opacity: 0;
    }
.btn-fixed-m{
	position: absolute;
    top: 0;
    left: 40%;
    height: 2.4em;
}
.formatedBox{
    margin: 11px 2px 4px -11px !important;
}

</style>

