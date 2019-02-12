<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>


<div class="modal fade" id="editarCorreoModal" tabindex="-1" role="dialog" aria-labelledby="editarCorreoLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content noRadius">
    
		<div class="modal-body">
        	<form class="form-horizontal form-fix noRadius noBorder" id="editCorreoForm" role="form">
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
							<input type="text" class="form-control noRadius hide" id="editarIdCorreo" name="editarIdCorreo" placeholder="id"> 
					<div class="form-group">
						<label class="col-md-3 control-label">Tipo Correo</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius newRut" id="editarTipoCorreo" name="editarTipoCorreo" disabled>
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">Correo</label>
						<div class="col-md-9">
							<input type="email" class="form-control noRadius" id="editarCorreo" name="editarCorreo"  placeholder="sophie@example.com" required> 
						</div>
					</div>	
					
                   	
					<div class="form-actions right1">
						<button type="button" class="btn default" onclick="javascript:cerrarUpdate()">Cancelar</button>
						<button type="submit" class="btn green" id="submitEditCorreo">Editar Correo</button>
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
		<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Correo">
			<thead>  
			      <tr>        
					<th class="text-center">N°</th>
					<th class="text-center">Codigo</th>
					<th class="text-center">Correo</th>
					<th class="text-center">editar </th>
                </tr>
			</thead>
			
			<tbody id="tblBodyCorreos"></tbody>

		</table>
	</div>
	<div>
		
		
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
.col-md-offset-3
{
margin-left:25% !important;
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
.swal2-container.swal2-shown {
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 99999 !important;
}
.alert {
    text-align: left !important;
}
.sorting_1
{
	text-align:center;
}
</style>

