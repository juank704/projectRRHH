<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>


<div class="modal fade" id="editarDTModal" tabindex="-1" role="dialog" aria-labelledby="editarDTLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content noRadius">
    
		<div class="modal-body">
        	<form class="form-horizontal form-fix noRadius noBorder" id="editDTForm" role="form">
				<div class="form-body">
						<div class="alert alert-danger display-hide" id="fwe">
                        	<button class="close" data-close="alert"></button> tienes errores en rut o código
                        </div>
                        <div class="alert alert-success display-hide" id="fge">
                            <button class="close" data-close="alert"></button> No se encontraron errores
                        </div>
							<input type="text" class="form-control noRadius hide" id="editarIdDT" name="editarIdDT" placeholder="id"> 
					<div class="form-group">
						<label class="col-md-3 control-label">Ciudad Huerto</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius newRut" id="editarCiuHuerto" name="editarCiuHuerto" placeholder="Rut AFPm" required> 
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">Comuna Huerto</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="editarComHuerto" name="editarComHuerto" placeholder="Rut AFPm" required> 
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">Direccion Huerto</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="editarDireccionDT" name="editarDireccionDT" placeholder="Dirección huerto " required> 
						</div>
					</div>	
                   	
					<div class="form-group">
						<label class="col-md-3 control-label">Nombre Representante</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius " id="editarNombreRep" name="editarNombreRep" placeholder="Rut AFPm" required> 
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">Apellido Paterno Representante</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="editarApPatRep" name="editarApPatRep" placeholder="Rut AFPm" required> 
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">Apellido Materno Representante</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="editarApMatRep" name="editarApMatRep" placeholder="Rut AFPm" required> 
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">RUT Representante</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius newRut" id="editarRutRep" name="editarRutRep" placeholder="Rut AFPm" required> 
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">Numero de Teléfono</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius newRut" id="editarTelRep" name="editarTelRep" placeholder="Rut AFPm" required> 
						</div>
					</div>
					
							
						
					<div class="form-actions right1">
						<button type="button" class="btn default" onclick="javascript:cerrarUpdate()">Cancelar</button>
						<button type="submit" class="btn green" id="submitEditDT">Editar Datos del Campo</button>
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
		<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_DT">
			<thead>  
			      <tr>        
					<th class="text-center">N°</th>
					<th class="text-center">Nombre </th>
					<th class="text-center">Dirección</th>
					<th class="text-center">Apellido P <br> Representante</th>
					<th class="text-center">Apellido M <br> Representante</th>
					<th class="text-center">Nombre <br> Representante</th>
					<th class="text-center">Rut <br> Representante</th>
					<th class="text-center">Telefono <br> Representante</th>
					<th class="text-center">Ciudad</th>
					<th class="text-center">Comuna</th>
					<th class="text-center">Acciones</th>
					
					
                </tr>
			</thead>
			
			<tbody id="tblBodyDT"></tbody>

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

