<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>


<div class="modal fade" id="editarCajaCompensacionModal" tabindex="-1" role="dialog" aria-labelledby="editarCajaCompensacionLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content noRadius">
    
		<div class="modal-body">
        	<form class="form-horizontal form-fix noRadius noBorder" id="editCajaCompensacionForm" role="form">
				<div class="form-body">
					<div class="alert alert-danger display-hide" id="fwe">
                    	<button class="close" data-close="alert"></button> Tienes algunos errores en el rut
                    </div>
                    <div class="alert alert-success display-hide" id="fge">
                        <button class="close" data-close="alert"></button> No se encontraron errores
                    </div>
						<input type="text" class="form-control noRadius hide" id="editarIdCajaCompensacion" name="editarIdCajaCompensacion" placeholder="id"> 
					<div class="form-group">
						<label class="col-md-3 control-label">Nombre Caja</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="editarNombreCajaCompensacion" name="editarNombreCajaCompensacion" placeholder="Nombre CajaCompensacion" required> 
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">RUT Caja</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius newRut" id="editarRutCajaCompensacion" name="editarRutCajaCompensacion" placeholder="Rut CajaCompensacion" required> 
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">Codigo Caja</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="editarCodigoCajaCompensacion" name="editarCodigoCajaCompensacion" placeholder="Codigo CajaCompensacion" required> 
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">Codigo SAP</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="editarCodSapCajaCompensacion" name="editarCodSapCajaCompensacion" placeholder="Codigo CajaCompensacion" required> 
						</div>
					</div>
					
					<div class="form-actions right1">
						<button type="button" class="btn default" onclick="javascript:cerrarUpdate()">Cancelar</button>
						<button type="submit" class="btn green" id="submitEditCajaCompensacion">Editar CajaCompensacion</button>
					</div>
				</div>
			</form>	
      </div>
	  
    </div>
  </div>
</div> 

<div class="modal fade" id="agregarCajaCompensacionModal" tabindex="-1" role="dialog" aria-labelledby="agregarCajaCompensacionModal" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
    <h3 class="modal-title title-padding" id="agregarCajaCompensacionLabel">Agregar Nueva Caja de Compensacion</h3>
		<div class="modal-body padding-top-5">
        	<form class="form-horizontal form-fix noRadius noBorder"  id="insertCajaCompensacionForm" role="form">
				<div class="form-body">
					<div class="alert alert-danger display-hide text-left" id="fwa">
                        	<button class="close" data-close="alert"></button> Tienes errores en el rut
                        </div>
                        <div class="alert alert-success display-hide" id="fga">
                            <button class="close" data-close="alert"></button> No se encontraron errores
                        </div>
					<div class="form-group">
						<label class="col-md-3 control-label">Nombre Caja</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="agregarNombreCajaCompensacion" name="agregarNombreCajaCompensacion" placeholder="Nombre CajaCompensacion" required> 
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">RUT Caja</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius newRut" id="agregarRutCajaCompensacion" name="agregarRutCajaCompensacion" placeholder="Rut CajaCompensacion" required> 
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">Codigo Caja</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="agregarCodigoCajaCompensacion" name="agregarCodigoCajaCompensacion" placeholder="Codigo CajaCompensacion" required> 
						</div>
					</div>	
					<div class="form-group">
						<label class="col-md-3 control-label">Codigo SAP</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="agregarCodSapCajaCompensacion" name="agregarCodSapCajaCompensacion" placeholder="Codigo CajaCompensacion" required> 
						</div>
					</div>
					
					<div class="form-actions right1">
						<button type="button" class="btn default"  onclick="javascript:cerrarAgregar()">Cancelar</button>
						<button type="submit" class="btn green" id="agregarSubmit">Agregar CajaCompensacion</button>
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
		<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_CajaCompensacion">
			<thead>  
			      <tr>        
					<th class="text-center">N° CajaCompensacion</th>
					<th class="text-center">Nombre CajaCompensacion</th>
					<th class="text-center">RUT CajaCompensacion</th>
					<th class="text-center">Código CajaCompensacion</th>
					<th class="text-center min-width-180">editar /eliminar</th>
                </tr>
			</thead>
			
			<tbody id="tblBodyCajaCompensacions"></tbody>

		</table>
	</div>
	<div>
		
		
		<div id="agregarDocumentoHref" style="float: right;">
	         
			<button id="addCajaCompensacion" title="Agregar" class="btn btn-circle red btn-outline" data-toggle="modal" onclick="javascript:agregar()">
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
.swal2-container.swal2-shown {
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 99999 !important;
}
.alert {
    text-align: left !important;
}
</style>

