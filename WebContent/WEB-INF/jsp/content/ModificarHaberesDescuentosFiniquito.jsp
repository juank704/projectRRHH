<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">


<div class="col-md-12 ">
   <div class="row" style="margin-top: 10px;">
	   <div class="col-md-2 ">
	      <label style="color: #337ab7;">Empresa:</label>
	   </div>
	   <div class="col-md-3" style="margin-left: -61px;">
	      <select id="Sociedad" class=" form-control btn-circle btn-sm mayusculasWork" >
	         <option value="-1">Seleccione una Empresa</option>
	      </select>
	   </div>
	</div>
</div>

<div style="margin-top: 60px"></div>
<div class="col-md-12 portlet light bordered" id="panelform">
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

   <div style="margin-top: 40px"></div>
   <div class="col-md-12 ">
		 <div class="col-md-1">
         	<label style="color: #337ab7;">Tipo Contrato: </label>
      	</div>
      	<div class="col-md-3">
	         <select id="tipoContrato" class=" form-control btn-circle btn-sm mayusculasWork">
	            <option value="">Seleccione Tipo</option>
	         </select>
      	</div>
   		<div class="col-md-1">
         	<label style="color: #337ab7;">Fecha Termino: </label>
      	</div>
	      <div class="col-md-3">
	        <input type="text" id="periodoHD"  placeholder="Seleccione Periodo"class="form-control btn-circle btn-sm mayusculasWork">
	      </div> 
   </div>
	<div style="margin-top: 80px;"></div>
	<div class="col-md-12 ">
		<div class="col-md-1 ">
         	<label style="color: #337ab7;">Código Trabajador: </label>
      	</div>
        <div class="col-md-7">
	         <select id="CodigoTra" class="form-control input-sm input-circle mayusculasWork">
	            <option value="">Buscar</option>
	         </select>
     	 </div>
     	 <div class="col-md-2">
   			<button id="addDocumento" title="Buscar" class="btn btn-circle green btn-outline" data-toggle="modal" onclick="javascript:Buscar()">
  				 <i class="fa fa fa-search fa-lg"> Buscar</i>
  			 </button>
		</div>	
   	</div>
   
</div>

<div class="table-responsive">
   <table class="table table-bordered table-hover tzable-striped table-condensed dataTable no-footer" id="tbl_Info" style='margin-top: 20px;'>
      <thead>
         <tr>
            <th>id</th>
            <th>Cód T</th>
            <th>Nombre</th>
            <th>Rut</th>
            <th>Tipo</th>
            <th>codigo_hd</th>
            <th>Periodo</th>
            <th>Concepto</th>
            <th>monto</th>
            <th>Días/Años</th>
            <th>idContrato</th>
            <th>Opciones</th>
         </tr>
      </thead>
      <tbody id="tblPeticion"></tbody>
   </table>
</div>
	
<div id="modalUpdate" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content" style="margin-left: -196px;width: 172%;">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Modificar <span id="nombreTrabajador"></span></h4>
            </div>
            <div class="modal-body">
                <div class="col-md-12" style="margin-top: 20px;">
                    <div class="col-md-2">
                        <label style="color: #337ab7;">Tipo de Haber/Descuento</label>
                    </div>
                    <div class="col-md-3 ">
                        <select id="haberes_descuentos" class=" form-control btn-circle btn-sm mayusculasWork">
                            <option value="">Seleccione..</option>
                            <option value="hn" class="noimponible">Haber no Imponible</option>
                            <option value="h" class="imponible">Haber Imponible</option>
                            <option value="d">Descuento</option>
                            <option value="c">Costo Empresa</option>
                        </select>
                    </div>
                    <div class="col-md-1 ">
						<label style="color: #337ab7;">Conceptos: </label>
					</div>
					<div class="col-md-6">
    				<select id="conceptos" class=" form-control btn-circle btn-sm mayusculasWork" value="" ></select>
				</div>
                </div>
                <div class="col-md-12">
                	 <div class="col-md-2 ">
						<label style="color: #337ab7;">Monto:</label>
					</div>
					<div class="col-md-2 ">
						<input id="monto" type="text" name="ReAct" id="cantidadP" class="form-control input-circle number" >
					</div>
	                <div class="col-md-2 ">
		    			<label style="color: #337ab7;" id="">N° Días/Años: </label>		
		    		</div>
				    <div class="col-md-2 ">
						<input type="number" class="form-control input-circle" id="monto2" onchange="setTwoNumberDecimal" min="0"  step="0.01" value="0.00" />
				    </div>
	                <div class="col-md-2 ">
		    			<label style="color: #337ab7;" id="labelfecha">Mes de Periodo: </label>
		   			 </div>
				    <div class="col-md-2 ">
				    	<input   type="text" id="fechaCuotas" class="form-control input-circle mayusculasWork" onchange="javascript: valDias(this)" placeholder="Seleccione una Fecha">
				    </div>
               	</div>
		
            </div>
            <div class="modal-footer">
                <div class="col-md-4" style="margin-top: 20px;">
           <div class='btn btn-circle blue btn-outline' id='actualizarUp' onclick="actualizarTrabajadorDHF();"><i class='fa fa-clock-o'></i> Actualizar</div>
          <div class='btn btn-circle red btn-outline'data-dismiss="modal">Cerrar</div>
           </div>
            </div>
        </div>
    </div>
</div>
