<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="UTF-8"%>    
    
<!-- modificar modal     -->
    
<div class="modal fade" id="editarHDModal" tabindex="-1" role="dialog" aria-labelledby="editarHDLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content noRadius">
    
		<div class="modal-body">
        	<form class="form-horizontal form-fix noRadius noBorder" id="editHDForm" role="form">
				<div class="form-body">
						<div class="alert alert-danger display-hide" id="fwe">
                        	<button class="close" data-close="alert"></button> Tienes errores en el rut
                        </div>
                        <div class="alert alert-success display-hide" id="fge">
                            <button class="close" data-close="alert"></button> No se encontraron errores
                        </div>
							<input type="text" class="form-control noRadius hide" id="editarIdHD" name="editarIdHD" placeholder="id"> 
					
					<div class="form-group">
						<label class="col-md-3 control-label">Nombre Haber y Descuento</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="editarNombreHD" name="editarNombreHD" placeholder="Descripción" onkeyup="toUpperCase(this)" required > 
						</div>
					</div>
					
<!-- 					Selectores -->
					<div class="form-group">
						<label class="col-md-3 control-label">Tipo Haber Descuento</label>
						<div class="col-md-9">
							<select  class="form-control noRadius" id="editarSelectorTipoHD" name="editarSelectorTipoHD" disabled> </select>
						</div>
					</div>
					<div class="form-group" id="editarImponible">
						<label class="col-md-3 control-label">Imponible</label>
						<div class="col-md-9">
							<select  class="form-control noRadius" id="editarSelectorImponibleHD" name="editarSelectorImponibleHD" disabled></select> 
						</div>
					</div>
					<div class="form-group" id="editarTributable">
						<label class="col-md-3 control-label">Tributable</label>
						<div class="col-md-9">
							<select  class="form-control noRadius" id="editarSelectorTributableHD" name="editarSelectorTributableHD" disabled></select> 
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">Proveedor</label>
						<div class="col-md-9">
							<select class="form-control noRadius newRut" id="editarRutEmpresaHD" name="editarRutEmpresaHD"  required onchange="proveedorOnChangeUp(this)"></select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">Código SAP</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="editarCodigoSapHD" name="editarCodigoSapHD" placeholder="Codigo Sap" onkeyup="toUpperCase(this)" disabled > 
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">Centro de Costo</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="editarCentroCostoHD" name="editarCentroCostoHD" placeholder="Centro de Costo" onkeyup="toUpperCase(this)" required > 
						</div>
					</div>
					                   	
					<div class="form-actions right1">
						<button type="button" class="btn default" onclick="javascript:cerrarUpdate()">Cancelar</button>
						<button type="submit" class="btn green" id="submitEditHD">Editar Haber y Descuento</button>
					</div>
				</div>
			</form>	
      </div>
	  
    </div>
  </div>
</div> 
<!-- cierre mpodificacion -->

<!-- agregar haberes y descuentos -->

<div class="modal fade" id="agregarHDModal" tabindex="-1" role="dialog" aria-labelledby="agregarHDLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content noRadius">
    
		<div class="modal-body">
        	<form class="form-horizontal form-fix noRadius noBorder" id="insertHDForm" role="form">
				<div class="form-body">
						<div class="alert alert-danger display-hide text-left" id="fwa">
                        	<button class="close" data-close="alert"></button> Se encontraron algunos errores... <br> Revise su formulario
                        </div>
                        <div class="alert alert-success display-hide" id="fga">
                            <button class="close" data-close="alert"></button> No se encontraron errores
                        </div>
							<input type="text" class="form-control noRadius hide" id="agregarIdBanco" name="agregarIdBanco" placeholder="id"> 
					
					<div class="form-group">
						<label class="col-md-3 control-label">Nombre Haber y Descuento</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="agregarNombreHD" name="agregarNombreHD" placeholder="Descripción" onkeyup="toUpperCase(this)" required> 
						</div>
					</div>
					
<!-- 					Selectores -->
					<div class="form-group">
						<label class="col-md-3 control-label">Tipo Haber Descuento</label>
						<div class="col-md-9">
							<select  class="form-control noRadius" id="agregarSelectorTipoHD" name="agregarSelectorTipoHD" onchange="cambiarAtrib(this)" required> </select>
						</div>
					</div>
					<div class="form-group" id="agregarImponible">
						<label class="col-md-3 control-label">Imponible</label>
						<div class="col-md-9">
							<select  class="form-control noRadius" id="agregarSelectorImponibleHD" name="agregarSelectorImponibleHD" required></select> 
						</div>
					</div>
					<div class="form-group" id="agregarTributable">
						<label class="col-md-3 control-label">Tributable</label>
						<div class="col-md-9">
							<select  class="form-control noRadius" id="agregarSelectorTributableHD" name="agregarSelectorTributableHD" required></select> 
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">Proveedor</label>
						<div class="col-md-9">
							<select  class="form-control noRadius" id="agregarRutEmpresaHD" name="agregarRutEmpresaHD"  required onchange="proveedorOnChange(this)"></select> 
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">Código SAP</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="agregarCodigoSapHD" name="agregarCodigoSapHD" placeholder="Codigo Sap" onkeyup="toUpperCase(this)" disabled > 
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">Centro de Costo</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="agregarCentroCostoHD" name="agregarCentroCostoHD" placeholder="Centro de Costo" onkeyup="toUpperCase(this)" required > 
						</div>
					</div>
					
                   	
					<div class="form-actions right1">
						<button type="button" class="btn default" onclick="cerrarModalAgregar()">Cancelar</button>
						<button type="submit" class="btn green" id="submitInsertHD">Agregar Haber y Descuento</button>
					</div>
				</div>
			</form>	
      </div>
	  
    </div>
  </div>
</div> 
<!-- cierre -->
    
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	<h4>Filtros</h4>
	
	<div class="col-xs-12 col-sm-12 col-md-3 ">
		<label style="color: #337ab7;" >Descripcion: </label>
		<input type="text" name="par" id="searchDescripcion" class="form-control input-circle" onkeyup="toUpperCase(this);searchDescripcion()">
	</div>
	<div class="col-xs-12 col-sm-12 col-md-3 ">
		<label style="color: #337ab7;" >Tipo: </label>
		<div class="col-xs-12 col-sm-12 col-md-12 ">
			<select name="par" id="searchTipo" class="btn blue btn-outline btn-circle btn-sm"  onchange="searchTipo()">
				<option value="">Seleccione...</option>
				<option value="HABER IMPONIBLE">Haber Imponible</option>
				<option value="HABER NO IMPONIBLE">Haber no imponible</option>
				
				<option value="DESCUENTO">Descuento</option>
				<option value="COSTO EMPRESA">Costo Empresa</option>
			</select>
		</div>
	</div>
	
</div>

<div id="divCierre" class="col-xs-12 col-sm-12">
	
	<div class="table-responsive" id="ignore">
		<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_HD">
			<thead>
				<tr>
					<th>Codigo</th>
					<th>Descripcion</th>
					<th>Tipo</th>
					<th>Imponible</th>
					<th>Tributario</th>	
					<th>acciones</th>		
				  </tr>
			</thead>
			
			<tbody id="tblBodyHDs"></tbody>

		</table>
	</div>
	<div>
		
		
		<div id="agregarDocumentoHref" style="float: right;">
	         
			<button id="addHD" title="Agregar" class="btn btn-circle red btn-outline" data-toggle="modal" onclick="javascript:agregarHD()">
				<i class="fa fa-plus"></i> Agregar
			</button>		
	        
		</div>
	</div>	
</div>
<div class="dragbox ui-resizable">
	<div class="dragbox-content"></div>
</div>
<p style="color:white">.</p>
<article id="loading" class="loading_dos" style="display: hide;">
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
#tbl_HD_filter{
display:none !important;
}
</style>
