<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
	<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
			<div class="row">
				<div class="col-md-4">
					<div class=" col-md-12">
						<h4>Empresa</h4>
					</div>
					<div class="col-md-12">
						<select id="selectorSociedad" class="form-control btn-sm mayusculasWork" onchange="selectorSociedad(this)">
						</select>
					</div>
				</div>			
				
				
			</div>
			
			
		</div>

<div class="modal fade" id="editarCargosModal" tabindex="-1" role="dialog" aria-labelledby="editarCargosLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content noRadius">
    
		<div class="modal-body">
        	<form class="form-horizontal form-fix noRadius noBorder" id="editCargosForm" role="form">
				<div class="form-body">
						<div class="alert alert-danger display-hide" id="fwe">
                        	<button class="close" data-close="alert"></button> tienes algunos errores, por favor revisa tu formulario 
                        </div>
                        <div class="alert alert-success display-hide" id="fge">
                            <button class="close" data-close="alert"></button> No se encontraron errores
                        </div>
							<input type="text" class="form-control noRadius hide" id="editarIdCargos" name="editarIdCargos" placeholder="id"> 
					<div class="form-group">
						<label class="col-md-3 control-label">Nombre Cargo</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="editarNombreCargos" name="editarNombreCargos" required> 
						</div>
					</div>	
                   	<div class="form-group">
						<label class="col-md-3 control-label">Sueldo Base</label>
						<div class="col-md-9">
							<input type="number" class="form-control noRadius" id="editarSueldoBaseCargos" name="editarSueldoBaseCargos" min="0"  step="any" value="0" required/>
						</div>
					</div>	
					<div class="form-group">
						<label class="col-md-3 control-label">Empresa</label>
						<div class="col-md-9">
							<select class="form-control " id="editarSelectorEmpresa" name="editarSelectorEmpresa"></select> 
						</div>
					</div>		
					<div class="form-actions right1">
						<button type="button" class="btn default" data-dismiss="modal">Cancelar</button>
						<button type="submit" class="btn green" id="submitEditCargos">Editar Cargos</button>
					</div>
				</div>
			</form>	
      </div>
	  
    </div>
  </div>
</div> 

<div class="modal fade" id="agregarCargosModal" tabindex="-1" role="dialog" aria-labelledby="agregarCargosModal" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
    <h3 class="modal-title title-padding" id="agregarCargosLabel">Agregar Nuevo Cargo</h3>
		<div class="modal-body padding-top-5">
        	<form class="form-horizontal form-fix noRadius noBorder"  id="insertCargosForm" role="form">
				<div class="form-body">
					<div class="alert alert-danger display-hide text-left" id="fwa">
                        	<button class="close" data-close="alert"></button>
                        	<p id="textofwa">
                        	
                        	 </p>
                        </div>
                        <div class="alert alert-success display-hide" id="fga">
                            <button class="close" data-close="alert"></button> No se encontraron errores
                        </div>
					<div class="form-group">
						<label class="col-md-3 control-label">Nombre Cargo</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="agregarNombreCargos" name="agregarNombreCargos" required>
						</div>
					</div>	
                   	<div class="form-group">
						<label class="col-md-3 control-label">Sueldo Base</label>
						<div class="col-md-9">
							<input type="number" class="form-control noRadius" id="agregarSueldoBaseCargos" name="agregarSueldoBaseCargos" min="0" step="any" value="0" required/>
							
						</div>
					</div>	
					<div class="form-group">
						<label class="col-md-3 control-label">Empresa</label>
						<div class="col-md-9">
							<select class="form-control " id="agregarSelectorEmpresa" name="agregarSelectorEmpresa"></select> 
							
						</div>
					</div>	
					<div class="form-actions right1">
						<button type="button" class="btn default" onclick="javascript:cerrarModalAgregar()">Cancelar</button>
						<button type="submit" class="btn green" id="agregarSubmit">Agregar Cargos</button>
					</div>
				</div>
			</form>	
      </div>
	  
    </div>
  </div>
</div> 




<br>	

	
<div id="divCierre" class="col-xs-12 col-sm-12">



	<div class="table-responsive" id="ignore">
		<div class="alert alert-danger display-hide text-left" id="Twa">
         	<button class="close" data-close="alert"></button>
         	<p id="textoTwa">
         		
         	 </p>
         </div>
		<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_cargos">
			<thead>  
			      <tr>        
					<th class="text-center width-70">N° </br> Cargo</th>
					<th class="text-center">Nombre Cargo</th>	
					<th class="text-center width-360">Empresa</th>   			
	                <th class="text-center width-120">Sueldo </br> Base</th>                
					
					<th class="text-center width-150">editar /eliminar</th>
                </tr>
			</thead>
			
			<tbody id="tblBodyCargoss"></tbody>

		</table>
	</div>
	<div>
		
		
		<div id="agregarDocumentoHref" style="float: right;">
	         
			<button id="addCargos" title="Agregar" class="btn btn-circle red btn-outline" data-toggle="modal" onclick="javascript:agregarCargos()">
				<i class="fa fa-plus"></i> Agregar
			</button>
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

<style>
.width-70{
	width: 70px !important;

}
.width-120{
	width: 120px !important;

}
.width-150{
	width: 150px !important;

}
.width-360{
	width: 360px !important;

}
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
.min-width-180{
min-width: 180px;
}
.margin-left-7{
    margin-left: 7% !important;
}
#selectorPeriodo
{
text-align:right;
margin-bottom:30px;
padding-bottom: 1.3em;
}
#tbl_afp_filter
{
display:none !important;

}
.swal2-popup.swal2-modal.animated.bounceIn.swal2-noanimation {

}

.swal2-container.swal2-shown {
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 99999 !important;
}
</style>