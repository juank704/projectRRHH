<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>


<div class="modal fade" id="editarDocumentoModal" tabindex="-1" role="dialog" aria-labelledby="editarDocumentoLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content noRadius">
    
		<div class="modal-body">
        	<form class="form-horizontal form-fix noRadius noBorder" id="editDocForm" role="form">
				<div class="form-body">
							<input type="text" class="form-control noRadius hide" id="editarId" name="editarId" placeholder="id"> 
					<div class="form-group">
						<label class="col-md-3 control-label">Nombre</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="editarNombre" name="editarNombre" placeholder="Nombre"> 
						</div>
					</div>	
					<div class="row fileupload-buttonbar">
                    	<div class="col-sm-12 col-md-12 col-lg-12">
                        	<span class="btn green fileinput-button btn-fixed-m">
                                  <i class="fa fa-plus"></i>
                                  <span> Adjuntar Archivo </span>
                                  <input type="file" name="editarFile" id="editarFile">
                            </span>
	                        <button type="button" class="btn red delete">
	                            <i class="fa fa-trash"></i>
	                            <span> Borrar archivo </span>
	                        </button>
	                        
	                        <span class="fileupload-process" id="editFileUploadText"> </span>
	                    </div>
	                  
	                    <div class="col-lg-5 fileupload-progress fade">
	                       
	                        <div class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100">
	                            <div class="progress-bar progress-bar-success" style="width:0%;"> </div>
	                        </div>
	                        
	                        <div class="progress-extended"> &nbsp; </div>
	                    </div>
                   	</div>
                    	<div class="form-group">
						<label class="col-md-3 control-label">Tipo Documento</label>
						<div class="col-md-9">
							<select class="form-control noRadius" id="editarTipoDocumento" name="editarTipoDocumento" required></select> 
						</div>
					</div>
                   	<div class="form-group">
						<label class="col-md-3 control-label">Empresa</label>
						<div class="col-md-9">
							<select class="form-control noRadius" id="editarEmpresaDocumento" name="editarEmpresaDocumento" required></select> 
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">Huerto</label>
						<div class="col-md-9">
							<select class="form-control noRadius" id="editarHuertoDocumento" name="editarHuertoDocumento" ></select> 
						</div>
					</div>
                   	<div class="form-group">
						<label class="col-md-3 control-label">Fecha de Creación</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="editarFechaCreacion" name="editarFechaCreacion" disabled>
						</div>
					</div>	
					<div class="form-group">
						<label class="col-md-3 control-label">Fecha de Modificacion</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="editarFechaModificacion" name="editarFechaModificacion" placeholder="Fecha de Modificacion" disabled> 
						</div>
					</div>	
                   		
				
					<div class="form-actions right1">
						<button type="button" class="btn default" data-dismiss="modal">Cancelar</button>
						<button type="submit" class="btn green" id="submitEditDocument">Editar Documento</button>
					</div>
				</div>
			</form>	
      </div>
	  
    </div>
  </div>
</div> 

<div class="modal fade" id="agregarDocumentoModal" tabindex="-1" role="dialog" aria-labelledby="agregarDocumentoModal" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
    <h3 class="modal-title title-padding" id="agregarDocumentoLabel">Agregar Nuevo Documento</h3>
		<div class="modal-body padding-top-5">
        	<form class="form-horizontal form-fix noRadius noBorder"  id="insertDocForm" role="form">
				<div class="form-body">
					
					<div class="form-group">
						<label class="col-md-3 control-label noRadius">Nombre</label>
						<div class="col-md-9">
							<input type="text" class="form-control" id="agregarNombre" name="agregarNombre" placeholder="Nombre" required> 
						</div>
					</div>	
					<div class="row fileupload-buttonbar">
                    	<div class="col-sm-12 col-md-12 col-lg-12">
                        	<span class="btn green fileinput-button btn-fixed-m">
                                  <i class="fa fa-plus"></i>
                                  <span> Adjuntar Archivo </span>
                                  <input type="file" name="agregarfile" id="agregarFile" onchange="dataFile(this)"> </span>
	                        <button type="button" class="btn red delete">
	                            <i class="fa fa-trash"></i>
	                            <span> Borrar archivo </span>
	                        </button>
	                        
	                        <span class="fileupload-process" id="eagregarFileUploadText"> </span>
	                    </div>
	                   
	                    <div class="col-lg-5 fileupload-progress fade">
	                       
	                        <div class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100">
	                            <div class="progress-bar progress-bar-success" style="width:0%;"> </div>
	                        </div>
	                        
	                        <div class="progress-extended"> &nbsp; </div>
	                    </div>
                   	</div>
                   	<div class="form-group">
						<label class="col-md-3 control-label">Tipo Documento</label>
						<div class="col-md-9">
							<select class="form-control noRadius" id="agregarTipoDocumento" name="agregarTipoDocumento" required></select> 
						</div>
					</div>
                   	<div class="form-group">
						<label class="col-md-3 control-label">Empresa</label>
						<div class="col-md-9">
							<select class="form-control noRadius" id="agregarEmpresaDocumento" name="agregarEmpresaDocumento" required></select> 
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">Huerto</label>
						<div class="col-md-9">
							<select class="form-control noRadius" id="agregarHuertoDocumento" name="agregarHuertoDocumento" ></select> 
						</div>
					</div>
                   	<div class="form-group">
						<label class="col-md-3 control-label">Fecha de Creación</label>
						<div class="col-md-9">
							<input type="text"  id="agregarFechaCreacion" class="form-control noRadius" name="agregarFechaCreacion" placeholder="Fecha de Creación" disabled> 
						</div>
					</div>	
					<div class="form-group">
						<label class="col-md-3 control-label">Fecha de Modificación</label>
						<div class="col-md-9">
							<input type="text" id="agregarFechaModificacion" class="form-control noRadius" name="agregarFechaModificacion" placeholder="Fecha de Modificación" disabled> 
						</div>
					</div>	
                   		
				
					<div class="form-actions right1">
						<button type="button" class="btn default" data-dismiss="modal">Cancelar</button>
						<button type="submit" class="btn green" id="agregarSubmit"><i class="fa fa-floppy-o fa-lg"></i> Grabar Documento</button>
					</div>
				</div>
			</form>	
      </div>
	  
    </div>
  </div>
</div> 

<br>	
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	<h4>Filtros</h4>
	
	<div class="col-xs-12 col-sm-12 col-md-3 ">
		<label style="color: #337ab7;" >Descripcion: </label>
		<input type="text" name="par" id="searchDescripcion" class="form-control input-circle" onkeyup="toUpperCase(this);searchDescripcion()">
	</div>
	<div class="col-xs-12 col-sm-12 col-md-3 ">
		<label style="color: #337ab7;" >Empresa: </label>
		<div class="col-xs-12 col-sm-12 col-md-12 ">
			<select name="par" id="searchEmpresa" class="btn blue btn-outline btn-circle btn-sm"  onchange="searchEmpresa()">
			</select>
		</div>
	</div>
	
	
	<div class="col-xs-12 col-sm-12 col-md-3 ">
		<label style="color: #337ab7;" >Tipo Documento: </label>
		<div class="col-xs-12 col-sm-12 col-md-12 ">
			<select name="par" id="searchTipo" class="btn blue btn-outline btn-circle btn-sm"  onchange="searchTipo()">
				
			</select>
		</div>
	</div>
	
</div>
	
<div id="divCierre" class="col-xs-12 col-sm-12">
	<div class="table-responsive" id="ignore">
		<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_doc">
			<thead>  
			      <tr>        
					<th class="text-center">N°</th>
					<th class="text-center">Nombre <br> Documento</th>					
	                <th class="text-center">Tipo</th>                
				
					<th class="text-center">Empresa</th>
					<th class="text-center">fecha <br> Modificación</th>
					<th class="text-center">Usuario</th>
					
					<th class="text-center">editar /eliminar</th>
                </tr>
			</thead>
		</table>
	</div>
	<div>
		
		
		<div id="agregarDocumentoHref" style="float: right;">
	         
			<button id="addDocumento" title="Agregar" class="btn btn-circle red btn-outline" data-toggle="modal" onclick="javascript:agregarDocumentoNuevo()">
				<i class="fa fa-plus"></i> Agregar
			</button>		
	        
		</div>
	</div>	
</div>


<div class="dragbox ui-resizable">
	<div class="dragbox-content"></div>
</div>

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
#tbl_doc_filter{
display:none !important;
}
</style>

