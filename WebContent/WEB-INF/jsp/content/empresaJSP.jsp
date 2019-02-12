<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
 String id=session.getAttribute("id").toString();
%>

<div class="modal fade" id="editarEmpresaModal" tabindex="-1" role="dialog" aria-labelledby="editarEmpresaLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content noRadius">
    
		<div class="modal-body">
        	<form class="form-horizontal form-fix noRadius noBorder" id="editEmpresaForm" role="form">
				<div class="form-body">
							<input type="text" class="form-control noRadius hide" id="editarIdEmpresa" name="editarId" placeholder="id"> 
					<div class="form-group">
						<label class="col-md-3 control-label">Razón Social</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="editarRazonSocialEmpresa" name="editarRazonSocialEmpresa" placeholder="Razón Social"> 
						</div>
					</div>					
                   	<div class="form-group">
						<label class="col-md-3 control-label">Rut Empresa</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="editarRutEmpresa" name="editarRutEmpresa" placeholder="Rut" > 
						</div>
					</div>	
					<div class="form-group">
                                            <label for="single" class="control-label">Representante Legal</label>
                                            <select id="singleEditRepresentanteLegal" class="form-control select2">
                                                <option></option>
                                                <option value="1">Representante 1</option>
                                                <option value="1">Representante 1</option>
                                            </select>
                                        </div>
					<div class="form-group">
						<label class="col-md-3 control-label">Dirección Empresa</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="editarFechaModificacion" name="editarFechaModificacion" placeholder="Dirección Empresa" > 
						</div>
					</div>	
                   		
				
					<div class="form-actions right1">
						<button type="button" class="btn default" data-dismiss="modal">Cancelar</button>
						<button type="submit" class="btn green" id="submitEditEmpresa">Editar Empresa</button>
					</div>
				</div>
			</form>	
      </div>
	  
    </div>
  </div>
</div> 

<div class="modal fade" id="agregarEmpresaModal" tabindex="-1" role="dialog" aria-labelledby="agregarDocumentoModal" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
    <h3 class="modal-title title-padding" id="agregarDocumentoLabel">Agregar Nueva Empresa</h3>
		<div class="modal-body padding-top-5">
        	<form class="form-horizontal form-fix noRadius noBorder" id="editEmpresaForm" role="form">
				<div class="form-body">
							
					<div class="form-group">
						<label class="col-md-3 control-label">Razón Social</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="addRazonSocialEmpresa" name="addRazonSocialEmpresa" placeholder="Razón Social"> 
						</div>
					</div>					
                   	<div class="form-group">
						<label class="col-md-3 control-label">Rut Empresa</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="editarFechaCreacion" name="editarFechaCreacion" placeholder="Rut" > 
						</div>
					</div>	
					<div class="form-group">
                                            <label for="single" class="control-label">RepresentanteLegal</label>
                                            <select id="singleAddRepresentanteLegal" class="form-control select2">
                                                <option></option>
                                                <option value="1">Representante 1</option>
                                                <option value="1">Representante 1</option>
                                            </select>
                                        </div>
					<div class="form-group">
						<label class="col-md-3 control-label">Dirección Empresa</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="addDireccionEmpressa" name="addDireccionEmpressa" placeholder="Dirección Empresa" > 
						</div>
					</div>	
                   		
				
					<div class="form-actions right1">
						<button type="button" class="btn default" data-dismiss="modal">Cancelar</button>
						<button type="submit" class="btn green" id="submitAddEmpresa">Agregar Empresa</button>
					</div>
				</div>
			</form>	
      </div>
	  
    </div>
  </div>
</div> 



<h3>Empresas</h3>
	
<div id="divCierre" class="col-xs-12 col-sm-12">
	<div class="table-responsive" id="ignore">
		<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_doc">
			<thead>  
			      <tr>        
					<th class="text-center">N° Empresa</th>
					<th class="text-center">Razón Social</th>					
	                <th class="text-center">Rut</th>                
					<th class="text-center">Representante Legal</th>
					<th class="text-center">Dirección</th>	                
					<th class="text-center min-width-180">editar /eliminar</th>
                </tr>
			</thead>
			
			<tbody id="tblBodyDocuments"></tbody>

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

