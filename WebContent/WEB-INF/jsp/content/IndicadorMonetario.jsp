<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>


<div class="modal fade" id="editarIndicadorModal" tabindex="-1" role="dialog" aria-labelledby="editarIndicadorLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content noRadius">
    
		<div class="modal-body">
        	<form class="form-horizontal form-fix noRadius noBorder" id="editIndicadorForm" role="form">
				<div class="form-body">
						<div class="alert alert-danger display-hide" id="Iwe">
                        	<button class="close" data-close="alert"></button> tienes algunos errores, por favor revisa tu formulario 
                        </div>
                        <div class="alert alert-success display-hide" id="Ige">
                            <button class="close" data-close="alert"></button> No se encontraron errores
                        </div>
							<input type="text" class="form-control noRadius hide" id="editarIdIndicador" name="editarIdIndicador" placeholder="id"> 
					<div class="form-group">
						<label class="col-md-3 control-label">Moneda</label>
						<div class="col-md-9">
							<select class="form-control noRadius" id="editarMonedaIndicador" name="editarMonedaIndicador" required></select> 
						</div>
					</div>	
                   	<div class="form-group">
						<label class="col-md-3 control-label">Valor</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="editarValorIndicador" name="editarValorIndicador" onkeyup="valorParcialEdicion(this)" required/>
						</div>
					</div>	
					<div class="form-group">
						<label class="col-md-3 control-label">Fecha</label>
						<div class="col-md-9">
							<input type="date" class="form-control noRadius" id="editarFechaIndicador" name="editarFechaIndicador" required/>
						</div>
					</div>
						
					<div class="form-actions right1">
						<button type="button" class="btn default" onclick="javascript:cerrarModalEditar()">Cancelar</button>
						<button type="submit" class="btn green" id="submitEditAFP">Editar AFP</button>
					</div>
				</div>
			</form>	
      </div>
	  
    </div>
  </div>
</div> 

<div class="modal fade" id="agregarIndicadorModal" tabindex="-1" role="dialog" aria-labelledby="agregarIndicadorModal" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
    <h3 class="modal-title title-padding" id="agregarIndicadorLabel">Agregar nuevo Indicador </h3>
		<div class="modal-body padding-top-5">
        	<form class="form-horizontal form-fix noRadius noBorder"  id="insertIndicadorForm" role="form">
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
						<label class="col-md-3 control-label">Moneda</label>
						<div class="col-md-9">
							<select class="form-control noRadius" id="insertMonedaIndicador" name="insertMonedaIndicador" required></select> 
						</div>
					</div>	
                   	<div class="form-group">
						<label class="col-md-3 control-label">Valor</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="insertValorIndicador" name="insertValorIndicador" onkeyup="valorParcialInsercion(this)" required/>
						</div>
					</div>	
					<div class="form-group">
						<label class="col-md-3 control-label">Fecha</label>
						<div class="col-md-9">
							<input type="date" class="form-control noRadius" id="insertFechaIndicador" name="insertFechaIndicador" required/>
						</div>
					</div>
					<div class="form-actions right1">
						<button type="button" class="btn default" onclick="javascript:cerrarModalAgregar()">Cancelar</button>
						<button type="submit" class="btn green" id="agregarSubmit">Agregar Indicador</button>
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
	<div>
		<div class="col-md-6">
			<div class="col-md-6">
				<div class="col-md-12">
					<label> Tipo de moneda </label>
				</div>
				<div class="col-md-12">
					<select class="form-control noRadius" id="selectorTipoMoneda" name="selectorTipoMoneda" onchange="javascript:search()"></select> 
				</div>
				
			</div>
			<div class="col-md-6">
				<div class="col-md-12">
					<label> Periodo</label>
				</div>
				<div class="col-md-12">
					<select class="form-control noRadius" id="selectorPeriodo" name="selectorPeriodo" onchange="javascript:searchPeriodo()"></select> 
				</div>
			
			</div>
		</div>
	</div>
	
		<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Ind">
			<thead>  
			      <tr>        
					<th class="text-center">N° Indicador</th>
					<th class="text-center">Moneda</th>					
	                <th class="text-center">Valor</th>                
					<th class="text-center">Fecha</th>
					<th class="text-center">Acciones</th>
                </tr>
			</thead>
			
			<tbody id="tblBodyInds"></tbody>

		</table>
	</div>
	<div>
		
		
		<div id="agregarDocumentoHref" style="float: right;">
	         
			<button id="addIndicador" title="Agregar" class="btn btn-circle red btn-outline" data-toggle="modal" onclick="javascript:agregarIndicador()">
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
#tbl_Ind_length,#tbl_Ind_filter{
display:none !important;
}
</style>

