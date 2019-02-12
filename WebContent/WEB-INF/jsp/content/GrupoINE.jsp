<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>


<div class="modal fade" id="editarGrupoINEModal" tabindex="-1" role="dialog" aria-labelledby="editarGrupoINELabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content noRadius">
    
		<div class="modal-body">
        	<form class="form-horizontal form-fix noRadius noBorder" id="editGrupoINEForm" role="form">
				<div class="form-body">
						<div class="alert alert-danger display-hide text-left" id="editarTextoResponseFalseAlert">
                        	<button class="close" data-close="alert"></button>
                        	<p id="editarTextoResponseFalse">
                        	
                        	 </p>
                        </div>
                        <div class="alert alert-success display-hide" id="editarTextoResponseTrueAlert">
                            <button class="close" data-close="alert"></button>
                        	<p id="editarTextoResponseTrue">
                        	
                        	 </p>
                        </div>
							<input type="text" class="form-control noRadius hide" id="editarIdGrupoINE" name="editarIdGrupoINE" placeholder="id"> 
					<div class="form-group">
						<label class="col-md-3 control-label">Grupo Ocupacional</label>
						<div class="col-md-9">
							<select class="form-control noRadius" id="editarNombreGrupoINE" name="editarNombreGrupoINE"></select> 
						</div>
					</div>	
                   	<div class="form-group">
						<label class="col-md-3 control-label">Cargo</label>
						<div class="col-md-9">
							<select class="form-control noRadius" id="editarCargoGrupoINE" name="editarCargoGrupoINE" required/></select>
						</div>
					</div>	
					<div class="form-group">
						<label class="col-md-3 control-label">Empresa</label>
						<div class="col-md-9">
							<select class="form-control noRadius" id="editarEmpresaGrupoINE" name="editarEmpresaGrupoINE" min="0" required/></select>
						</div>
					</div>
						
					<div class="form-actions right1">
						<button type="button" class="btn default" data-dismiss="modal">Cancelar</button>
						<button type="submit" class="btn green" id="submitEditGrupoINE">Editar GrupoINE</button>
					</div>
				</div>
			</form>	
      </div>
	  
    </div>
  </div>
</div> 

<div class="modal fade" id="agregarGrupoINEModal" tabindex="-1" role="dialog" aria-labelledby="agregarGrupoINEModal" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
    <h3 class="modal-title title-padding" id="agregarGrupoINELabel">Agregar Nuevo GrupoINE</h3>
		<div class="modal-body padding-top-5">
        	<form class="form-horizontal form-fix noRadius noBorder"  id="insertGrupoINEForm" role="form">
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
						<label class="col-md-3 control-label">Grupo Ocupacional</label>
						<div class="col-md-9">
							<select class="form-control noRadius" id="agregarNombreGrupoINE" name="agregarNombreGrupoINE"></select> 
						</div>
					</div>	
                   	<div class="form-group">
						<label class="col-md-3 control-label">Cargo</label>
						<div class="col-md-9">
							<select class="form-control noRadius" id="agregarCargoGrupoINE" name="agregarCargoGrupoINE" required/></select>
						</div>
					</div>	
					<div class="form-group">
						<label class="col-md-3 control-label">Empresa</label>
						<div class="col-md-9">
							<select class="form-control noRadius" id="agregarEmpresaGrupoINE" name="agregarEmpresaGrupoINE" min="0" required/></select>
						</div>
					</div>
					<div class="form-actions right1">
						<button type="button" class="btn default" onclick="javascript:cerrarModalAgregar()">Cancelar</button>
						<button type="submit" class="btn green" id="agregarSubmit">Agregar GrupoINE</button>
					</div>
				</div>
			</form>	
      </div>
	  
    </div>
  </div>
</div> 



	
<div id="divCierre" class="col-xs-12 col-sm-12">



	<div class="table-responsive" id="ignore">
		<div class="alert alert-danger display-hide text-left" id="Twa">
         	<button class="close" data-close="alert"></button>
         	<p id="textoTwa">
         		
         	 </p>
         </div>
		<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_GrupoINE">
			<thead>  
			      <tr>        
					<th class="text-center">N°</th>
					<th class="text-center">Grupo ocupacional</th>					
	                <th class="text-center">Cargo</th>                
					<th class="text-center">Empresa</th>
					<th class="text-center">editar /eliminar</th>
                </tr>
			</thead>
			
			<tbody id="tblBodyGrupoINEs"></tbody>

		</table>
	</div>
	<div>
		
		
		<div id="agregarDocumentoHref" style="float: right;">
	         
			<button id="addGrupoINE" title="Agregar" class="btn btn-circle red btn-outline" data-toggle="modal" onclick="javascript:agregarGrupoINE()">
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
#tbl_GrupoINE_filter
{
display:none !important;

}
.swal2-popup.swal2-modal.animated.bounceIn.swal2-noanimation {

}
.swal2-container.swal2-shown {
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 99999 !important;
}
.col-md-offset-3{
margin-left: 25% !important;


}
.col-md-offset-2
{
	margin-left:12.5% !important;
}
</style>

