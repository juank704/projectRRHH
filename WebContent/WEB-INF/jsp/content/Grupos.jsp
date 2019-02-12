<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>


<div class="modal fade" id="editarGrupoModal" tabindex="-1" role="dialog" aria-labelledby="editarGrupoLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content noRadius">
    
		<div class="modal-body">
        	<form class="form-horizontal form-fix noRadius noBorder" id="editGrupoForm" role="form" action="#">
				<div class="form-body">
							<input type="text" class="form-control noRadius hide" id="editarIdGrupo" name="editarIdFeriado" placeholder="id"> 
					
					<div class="form-group">
						<label class="col-md-3 control-label">Nombre Feriado</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="editarNombreGrupo" name="editarNombreGrupo" placeholder="Nombre Feriado"> 
						</div>
					</div>	
					
                   	<div class="form-group">
						<label class="col-md-3 control-label">Fecha Feriado</label>
						<div class="col-md-9">
							<input type="date" class="form-control noRadius" id="editarFechaFeriado" name="editarFechaGrupo" placeholder="Fecha de Feriado"> 
						</div>
					</div>	
					<div class="form-group hide">
						<label class="col-md-3 control-label">Descripción Feriado</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="editarDescripcionGrupo" name="editarDescripcionGrupo" placeholder="Descripción Feriado"> 
						</div>
					</div>	
					<div class="form-group">
						<label class="col-md-3 control-label">Región</label>
						<div class="col-md-9">
                            <select class="form-control" id="editarSelectRegion">
                            	
                            </select>
                        </div>
					</div>	
                   		
                   		
				
					<div class="form-actions right1">
						<button type="button" class="btn default" data-dismiss="modal">Cancelar</button>
						<button type="submit" class="btn green" id="submitEditGrupo">Editar Grupo</button>
					</div>
				</div>
			</form>	
      </div>
	  
    </div>
  </div>
</div> 

<div class="modal fade" id="agregarFeriadoModal" tabindex="-1" role="dialog" aria-labelledby="agregarFeriadoModal" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
    <h3 class="modal-title title-padding" id="agregarFeriadoLabel">Agregar Nuevo Feriado</h3>
		<div class="modal-body padding-top-5">
        	<form class="form-horizontal form-fix noRadius noBorder"  id="insertFeriadoForm" role="form">
				<div class="form-body">
					<div class="alert alert-danger display-hide text-left" id="hwa">
                        	<button class="close" data-close="alert"></button>
                        	<p id="textohwa">
                        	
                        	 </p>
                        </div>
                        <div class="alert alert-success display-hide" id="hga">
                            <button class="close" data-close="alert"></button> No se encontraron errores
                        </div>
					<div class="form-group">
						<label class="col-md-3 control-label">Nombre Feriado</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="agregarNombreFeriado" name="agregarNombreFeriado" placeholder="Nombre Feriado"> 
						</div>
					</div>	
					
                   	<div class="form-group">
						<label class="col-md-3 control-label">Fecha Feriado</label>
						<div class="col-md-9">
							<input type="date" class="form-control noRadius" id="agregarFechaFeriado" name="agregarFechaFeriado" placeholder="Fecha de Feriado"> 
						</div>
					</div>	
					<div class="form-group hide">
						<label class="col-md-3 control-label">Descripción Feriado</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="agregarDescripcionFeriado" name="agregarDescripcionFeriado" placeholder="Descripción Feriado"> 
						</div>
					</div>	
					<div class="form-group">
						<label class="col-md-3 control-label">Región</label>
						<div class="col-md-9">
                            <select class="form-control" id="agregarSelectRegion">
                            	
                            </select>
                        </div>
					</div>
                   		
				
					<div class="form-actions right1">
						<button type="button" class="btn default" onclick="javascript:cerrarModalAgregar()">Cancelar</button>
						<button type="submit" class="btn green" id="agregarFeriadoSubmit">Agregar Feriado</button>
					</div>
				</div>
			</form>	
      </div>
	  
    </div>
  </div>
</div> 




<div id="divCierre" class="col-xs-12 col-sm-12">
	<div class="table-responsive" id="ignore">
		<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_feriado">
			<thead>  
			      <tr>        
					<th class="text-center">id Feriado</th>
					<th class="text-center">Nombre Feriado</th>					
	                <th class="text-center">Fecha Feriado</th>                
				
					<th class="text-center">Región</th>
					<th class="text-center min-width-180">editar /eliminar</th>
                </tr>
			</thead>
			
			<tbody id="tblBodyFeriados"></tbody>

		</table>
	</div>
	<div>
		
		
		<div id="agregarFeriadoHref" style="float: right;">
	         
			<button id="addFeriado" title="Agregar" class="btn btn-circle red btn-outline" data-toggle="modal" onclick="javascript:agregarFeriado()">
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
</style>

