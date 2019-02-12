<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>


<div class="modal fade" id="editarEmpresaModal" tabindex="-1" role="dialog" aria-labelledby="editarEmpresaLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content noRadius">
    
		<div class="modal-body">
        	<form class="form-horizontal form-fix noRadius noBorder" id="editEmpresaForm" role="form">
				<div class="form-body">
						<div class="alert alert-danger display-hide" id="Ewe">
                        	<button class="close" data-close="alert"></button> tienes algunos errores, por favor revisa tu formulario 
                        </div>
                        <div class="alert alert-success display-hide" id="Ege">
                            <button class="close" data-close="alert"></button> No se encontraron errores
                        </div>
							<input type="text" class="form-control noRadius hide" id="editarIdEmpresa" name="editarIdEmpresa" placeholder="id"> 
					<div class="form-group">
						<label class="col-md-3 control-label">Nombre Empresa</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="editarNombreEmpresa" name="editarNombreEmpresa" placeholder="Nombre Empresa" disabled> 
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">Código Empresa</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="editarCodigoEmpresa" name="editarCodigoEmpresa" placeholder="Codigo Empresa" disabled> 
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">Rut Empresa</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="editarRutEmpresa" name="editarRutEmpresa" placeholder="Rut Empresa" disabled> 
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">Porcentaje de gratificación</label>
						<div class="col-md-9">
							<input type="number" class="form-control noRadius" id="editarGratificacionEmpresa" name="editarGratificacionEmpresa" step="any"> 
						</div>
					</div>
					<div class="form-group display-hide">
						<label class="col-md-3 control-label">Número de Convenio</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="editarNumeroConvenioEmpresa" name="editarNumeroConvenioEmpresa" placeholder="Número De Convenio" disabled> 
						</div>
					</div>
					<div class="form-group display-hide">
						<label class="col-md-3 control-label">Número de Nómina</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="editarNumeroNominaEmpresa" name="editarNumeroNominaEmpresa" placeholder="Número De Nómina" disabled> 
						</div>
					</div>	
					<div class="form-group display-hide">
						<label class="col-md-3 control-label">Tipo de Nómina</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="editarTipoNominaEmpresa" name="editarTipoNominaEmpresa" placeholder="Rut Empresa" disabled> 
						</div>
					</div>
					
					<div class="form-group">
						<label class="col-md-3 control-label">Caja de Compensación</label>
						<div class="col-md-9">
							<select class="form-control noRadius" id="editarCajaCompensacionEmpresa" name="editarCajaCompensacionEmpresa"></select> 
						</div>
					</div>
					<div id="borde">
					
					
					<div class="form-group">
						<label class="col-md-3 control-label">Mutual</label>
						<div class="col-md-9">
							<select class="form-control noRadius" id="editarMutualEmpresa" name="editarMutualEmpresa" onchange="aparecerCampos();"></select> 
						</div>
					</div>
					<div class="form-group" id="T1">
						<label class="col-md-3 control-label">Cotización Básica</label>
						<div class="col-md-9">
							<input type="number" class="form-control noRadius" id="editarTasaUnoEmpresa" name="editarTasaUnoEmpresa" placeholder="Tasa 1" min="0" step="any"> 
						</div>
					</div>
					<div class="form-group" id="T2">
						<label class="col-md-3 control-label">Cotización Adicional</label>
						<div class="col-md-9">
							<input type="number" class="form-control noRadius" id="editarTasaDosEmpresa" name="editarTasaDosEmpresa" placeholder="Tasa 2" min="0" step="any"> 
						</div>
					</div>
					<div class="form-group" id="T3">
						<label class="col-md-3 control-label">Cotización extraordinaria</label>
						<div class="col-md-9">
							<input type="number" class="form-control noRadius" id="editarTasaTresEmpresa" name="editarTasaTresEmpresa" placeholder="Tasa 3" min="0" step="any"> 
						</div>
					</div>
					<div class="form-group" id="T4">
						<label class="col-md-3 control-label">SANNA</label>
						<div class="col-md-9">
							<input type="number" class="form-control noRadius" id="editarTasaCuatroEmpresa" name="editarTasaCuatroEmpresa" placeholder="Tasa 4" step="any"> 
						</div>
					</div>
					</div>
					<div class="form-actions right1">
						<button type="button" class="btn default" onclick="javascript:cerrarUpdate()">Cancelar</button>
						<button type="submit" class="btn green" id="submitEditEmpresa">Editar Empresa</button>
					</div>
				</div>
			</form>	
      </div>
	  
    </div>
  </div>
</div> 
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	<h4>Filtros</h4>
	
	<div class="col-xs-12 col-sm-12 col-md-3 ">
		<label style="color: #337ab7;" >Nombre: </label>
		<input type="text" name="par" id="searchNombre" class="form-control input-circle" onkeyup="toUpperCase(this);searchNombre()">
	</div>
	<div class="col-xs-12 col-sm-12 col-md-3 ">
		<label style="color: #337ab7;" >Rut: </label>
		<input type="text" name="par" id="searchRut" class="form-control input-circle" onkeyup="searchRut()">
	</div>
	
	
</div>

	
<div id="divCierre" class="col-xs-12 col-sm-12">
	<div class="table-responsive" id="ignore">
		<table class="table table-bordered table-hover table-striped table-responsive" id="tbl_Empresa">
			<thead>  
			      <tr>        
					<th class="text-center">N°</th>
					<th class="text-center">Nombre <br> Empresa</th>
					<th class="text-center width-100">RUT</th>
					<th class="text-center">Mutual</th>
					<th class="text-center">Cotización <br> de comp.</th>
					<th class="text-center">Cotización <br> Básica</th>
					<th class="text-center">Cotización <br> Adicional</th>
					<th class="text-center">Cotización <br> extraordinaria</th>
					<th class="text-center">SANNA</th>
					<th class="text-center">Porc. Grat.</th>
					<th class="text-center">editar</th>
                </tr>
			</thead>
			
			<tbody id="tblBodyEmpresas"></tbody>

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
.width-100{
width: 100px !important;
}
.margin-left-7{
    margin-left: 7% !important;
}
#tbl_Empresa_filter{
display:none;
}
.borde{
border:0.5px solid lightgray; 
margin: 5px;
padding: 5px;
}
</style>

