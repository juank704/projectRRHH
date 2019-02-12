<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>


<div class="modal fade" id="editarAFPModal" tabindex="-1" role="dialog" aria-labelledby="editarAFPLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content noRadius">
    
		<div class="modal-body">
        	<form class="form-horizontal form-fix noRadius noBorder" id="editAFPForm" role="form">
				<div class="form-body">
						<div class="alert alert-danger display-hide" id="fwe">
                        	<button class="close" data-close="alert"></button> tienes algunos errores, por favor revisa tu formulario 
                        </div>
                        <div class="alert alert-success display-hide" id="fge">
                            <button class="close" data-close="alert"></button> No se encontraron errores
                        </div>
							<input type="text" class="form-control noRadius hide" id="editarIdAFP" name="editarIdAFP" placeholder="id"> 
					<div class="form-group">
						<label class="col-md-3 control-label">Nombre</label>
						<div class="col-md-9">
							<select class="form-control noRadius" id="editarNombreAFP" name="editarNombreAFP"></select> 
						</div>
					</div>	
                   	<div class="form-group">
						<label class="col-md-3 control-label">Tasa AFP</label>
						<div class="col-md-9">
							<input type="number" class="form-control noRadius" id="editarTasaAFP" name="editarSISAFP" min="0" max="30" step="0.01" value="0.00" required/>
						</div>
					</div>	
					<div class="form-group">
						<label class="col-md-3 control-label">SIS AFP</label>
						<div class="col-md-9">
							<input type="number" class="form-control noRadius" id="editarSISAFP" name="editarSISAFP" min="0" max="30" step="0.01" value="0.00" required/>
						</div>
					</div>
					<div class="form-group hide">
						<label class="col-md-3 control-label">Tasa Total AFP</label>
						<div class="col-md-9">
							<input type="number" class="form-control noRadius" id="editarTasaTotalAFP" name="editarTasaTotalAFP" min="0" max="30" step="0.01" value="0.00" />
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">periodo AFP</label>
						<div class="col-md-9">
							<input type="month" class="form-control noRadius input-circle" id="editarPeriodoAFP" name="editarPeriodoAFP"  required/>
						</div>
					</div>		
					<div class="form-actions right1">
						<button type="button" class="btn default" data-dismiss="modal">Cancelar</button>
						<button type="submit" class="btn green" id="submitEditAFP">Editar AFP</button>
					</div>
				</div>
			</form>	
      </div>
	  
    </div>
  </div>
</div> 
<div class="modal fade" id="editarAFPMasModal" tabindex="-1" role="dialog" aria-labelledby="editarAFPLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content noRadius">
    
		<div class="modal-body">
        	<form class="form-horizontal form-fix noRadius noBorder" id="editAFPForm2" role="form">
				<div class="form-body">
						<div class="alert alert-danger display-hide" id="fwe">
                        	<button class="close" data-close="alert"></button> tienes algunos errores, por favor revisa tu formulario 
                        </div>
                        <div class="alert alert-success display-hide" id="fge">
                            <button class="close" data-close="alert"></button> No se encontraron errores
                        </div>
					<input type="text" class="form-control noRadius hide" id="editPeriodoAFPForm" name="editPeriodoAFPForm" class="editPeriodoAFPForm"/>
					<div class="table-responsive" id="ignore">
						<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_AFPedit">
							<thead>  
							      <tr>
							              
									<th class="text-center min-width-120">AFP</th>
									<th class="text-center">TASA AFP</th>
									<th class="text-center">SIS AFP</th>
									<th class="text-center">TOTAL</th>
									<th class="text-center" style="width: 27%"></th>
									
				                </tr>
							</thead>
							
							<tbody id="tblBodyTramo">
								<tr>
									<td><label id="updateNombre0" class="updateNombre text-left col-md-12-e"></label></td>
									<td class="hide">
										<input type="text" class="form-control noRadius" id="updateId0" name="updateId0" class="updateId"/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateTasa0" name="updateTasa0" class="updateTasa" placeholder="TASA" min="0" step="0.01" onkeyup="calcularTotal(this)" onchange="calcularTotal(this)" required/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateSIS0" name="updateSIS0" class="updateSIS" placeholder="SIS" min="0" step="0.01" onkeyup="calcularTotal(this)" onchange="calcularTotal(this)" required/>
									</td>
									<td><label id="totalTasa0" class="totalTasas text-left"></label></td>
								</tr>
								<tr>
									<td><label id="updateNombre1" class="updateNombre text-left col-md-12-e"></label></td>
									<td class="hide">
										<input type="text" class="form-control noRadius" id="updateId1" name="updateId1" class="updateId"/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateTasa1" name="updateTasa1" class="updateTasa" placeholder="TASA" min="0" step="0.01" onkeyup="calcularTotal(this)" onchange="calcularTotal(this)" required/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateSIS1" name="updateSIS1" class="updateSIS" placeholder="SIS" min="0" step="0.01" onkeyup="calcularTotal(this)" onchange="calcularTotal(this)" required/>
									</td>
									<td><label id="totalTasa1" class="totalTasas text-left"></label></td>
								</tr>
								<tr>
									<td><label id="updateNombre2" class="updateNombre text-left col-md-12-e"></label></td>
									<td class="hide">
										<input type="text" class="form-control noRadius" id="updateId2" name="updateId2" class="updateId"/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateTasa2" name="updateTasa2" class="updateTasa" placeholder="TASA" min="0" step="0.01" onkeyup="calcularTotal(this)" onchange="calcularTotal(this)" required/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateSIS2" name="updateSIS2" class="updateSIS" placeholder="SIS" min="0" step="0.01" onkeyup="calcularTotal(this)" onchange="calcularTotal(this)" required/>
									</td>
									<td><label id="totalTasa2" class="totalTasas text-left"></label></td>
								</tr>
								<tr>
									<td><label id="updateNombre3" class="updateNombre text-left col-md-12-e"></label></td>
									<td class="hide">
										<input type="text" class="form-control noRadius" id="updateId3" name="updateId3" class="updateId"/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateTasa3" name="updateTasa3" class="updateTasa" placeholder="TASA" min="0" step="0.01" onkeyup="calcularTotal(this)" onchange="calcularTotal(this)" required/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateSIS3" name="updateSIS3" class="updateSIS" placeholder="SIS" min="0" step="0.01" onkeyup="calcularTotal(this)" onchange="calcularTotal(this)" required/>
									</td>
									<td><label id="totalTasa3" class="totalTasas text-left"></label></td>
								</tr>
								<tr>
									<td><label id="updateNombre4" class="updateNombre text-left col-md-12-e"></label></td>
									<td class="hide">
										<input type="text" class="form-control noRadius" id="updateId4" name="updateId4" class="updateId"/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateTasa4" name="updateTasa4" class="updateTasa" placeholder="TASA" min="0" step="0.01" onkeyup="calcularTotal(this)" onchange="calcularTotal(this)" required/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateSIS4" name="updateSIS4" class="updateSIS" placeholder="SIS" min="0" step="0.01" onkeyup="calcularTotal(this)" onchange="calcularTotal(this)" required/>
									</td>
									<td><label id="totalTasa4" class="totalTasas text-left"></label></td>
								</tr>
								<tr>
									<td><label id="updateNombre5" class="updateNombre text-left col-md-12-e"></label></td>
									<td class="hide">
										<input type="text" class="form-control noRadius" id="updateId5" name="updateId5" class="updateId"/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateTasa5" name="updateTasa5" class="updateTasa" placeholder="TASA" min="0" step="0.01" onkeyup="calcularTotal(this)" onchange="calcularTotal(this)" required/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateSIS5" name="updateSIS5" class="updateSIS" placeholder="SIS" min="0" step="0.01" onkeyup="calcularTotal(this)" onchange="calcularTotal(this)" required/>
									</td>
									<td><label id="totalTasa5" class="totalTasas text-left"></label></td>
								</tr>
								<tr>
									<td><label id="updateNombre6" class="updateNombre text-left col-md-12-e"></label></td>
									<td class="hide">
										<input type="text" class="form-control noRadius" id="updateId6" name="updateId6" class="updateId"/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateTasa6" name="updateTasa6" class="updateTasa" placeholder="TASA" min="0" step="0.01" onkeyup="calcularTotal(this)" onchange="calcularTotal(this)" required/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateSIS6" name="updateSIS6" class="updateSIS" placeholder="SIS" min="0" step="0.01" onkeyup="calcularTotal(this)" onchange="calcularTotal(this)" required/>
									</td>
									<td><label id="totalTasa6" class="totalTasas text-left"></label></td>
									<td>
										<select id="idAFP" 	class="form-control input-circle row_data row_dataCalculo"
										name="idAFP" col_name="idAFP"></select>
									</td>
								</tr>
							</tbody>
						</table>
					</div>		
					<div class="form-actions right1">
						<button type="button" class="btn default" data-dismiss="modal">Cancelar</button>
						<button type="submit" class="btn green" id="submitEditAFP">Editar AFP's</button>
					</div>
				</div>
			</form>	
      </div>
	  
    </div>
  </div>
</div> 







<div class="modal fade" id="agregarAFPModal" tabindex="-1" role="dialog" aria-labelledby="agregarAFPModal" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
    <h3 class="modal-title title-padding" id="agregarAFPLabel">Agregar Nueva AFP</h3>
		<div class="modal-body padding-top-5">
        	<form class="form-horizontal form-fix noRadius noBorder"  id="insertAFPForm" role="form">
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
						<label class="col-md-3 control-label">Nombre</label>
						<div class="col-md-9">
							<select class="form-control noRadius" id="agregarNombreAFP" name="agregarNombreAFP"></select> 
						</div>
					</div>	
                   	<div class="form-group">
						<label class="col-md-3 control-label">Tasa AFP</label>
						<div class="col-md-9">
							<input type="number" class="form-control noRadius" id="agregarTasaAFP" name="agregarTasaAFP" min="0" max="30" step="0.01" value="0.00" required/>
							
						</div>
					</div>	
					<div class="form-group">
						<label class="col-md-3 control-label">SIS AFP</label>
						<div class="col-md-9">
							<input type="number" class="form-control noRadius" id="agregarSISAFP" name="agregarSISAFP" min="0" max="30" step="0.01" value="0.00" required/>
						</div>
					</div>
					<div class="form-group hide">
						<label class="col-md-3 control-label">Tasa Total AFP</label>
						<div class="col-md-9">
							<input type="number" class="form-control noRadius" id="agregarTasaTotalAFP" name="agregarTasaTotalAFP" min="0" max="30" step="0.01" value="0.00" required/>
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">periodo AFP</label>
						<div class="col-md-9">
							<input type="month" class="form-control noRadius input-circle" id="agregarPeriodoAFP" name="agregarPeriodoAFP"  required/>
						</div>
					</div>
					<div class="form-actions right1">
						<button type="button" class="btn default" onclick="javascript:cerrarModalAgregar()">Cancelar</button>
						<button type="submit" class="btn green" id="agregarSubmit">Agregar AFP</button>
					</div>
				</div>
			</form>	
      </div>
	  
    </div>
  </div>
</div> 




<br>	
<div id="selectorPeriodo">
	<div class="col-md-offset-7 col-md-5">
		<div class="col-md-6">
			Periodo:
		</div>
		<div class="col-md-6">
			<select name="selectorAnioMes" id="selectorAnioMes" class="form-control input-circle" onchange="periodoOnchange(this)" ></select>
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
		<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_afp">
			<thead>  
			      <tr>        
					<th class="text-center">N° AFP</th>
					<th class="text-center">Nombre AFP</th>					
	                <th class="text-center">Tasa AFP</th>                
					<th class="text-center">SIS AFP</th>
					<th class="text-center">Tasa Total AFP</th>
					<th class="text-center">Periodo AFP</th>
				
					
                </tr>
			</thead>
			
			<tbody id="tblBodyAFPs"></tbody>

		</table>
	</div>
	<div>
		
		
		<div id="agregarDocumentoHref" style="float: right;">
	         <button id="updateAFP" title="Update" class="btn btn-circle yellow btn-outline" data-toggle="modal" onclick="javascript:updateAFPMasivo()">
				<i class="fa fa-plus"></i> Modificar Tasas
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
.min-width-120{
min-width:120px !important;
}
.col-md-12-e{
width:100%;
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
#tbl_afp_filter
{
display:none !important;

}
.swal2-popup.swal2-modal.animated.bounceIn.swal2-noanimation {

}
.swal2-container.swal2-shown {
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 99999 !important;
}
</style>

