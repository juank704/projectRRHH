<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>



<div class="modal fade" id="updateMImpuestoModal" tabindex="-1" role="dialog" aria-labelledby="updateMImpuestoModal" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
    <h3 class="modal-title title-padding" id="updateMImpuestoLabel">Modificar Todos los Tramos</h3>
		<div class="modal-body padding-top-5">
        	<form class="form-horizontal form-fix noRadius noBorder"  id="updateMImpuestoForm" role="form">
				<div class="form-body">
					<div class="alert alert-danger display-hide text-left" id="twa">
                        	<button class="close" data-close="alert"></button>
                        	<p id="textotwa">
                        	
                        	 </p>
                        </div>
                        <div class="alert alert-success display-hide" id="tga">
                            <button class="close" data-close="alert"></button> No se encontraron errores
                        </div>
                     
              
					<input type="text" class="form-control noRadius hide" id="updatePeriodoImpuestos" name="updatePeriodoImpuestos" class="updatePeriodoImpuestos"/>
					<div class="table-responsive" id="ignore">
						<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_ImpuestoM">
							<thead>  
							      <tr>        
									<th class="text-center">Tramo</th>
									<th class="text-center">Desde</th>
									<th class="text-center">Hasta</th>
									<th class="text-center">Factor</th>
									<th class="text-center">Rebaja</th>
									<th class="text-center">Tasa Máxima</th>									
				                </tr>
							</thead>
							
							<tbody id="tblBodyImpuesto">
								<tr>
									<td>1</td>
									<td class="hide">
										<input type="number" class="form-control noRadius" id="updateIdImpuesto1" name="updateIdImpuesto1" class="updateIdImpuesto"/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateDesdeImpuesto1" name="updateDesdeImpuesto1" class="updateDesdeImpuesto" placeholder="valor Minimo" step="0.001" disabled/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateHastaImpuesto1" name="updateHastaImpuesto1" class="updateHastaImpuesto" placeholder="valor Máximo" step="0.001" required/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateFactorImpuesto1" name="updateFactorImpuesto1" class="updateFactorImpuesto" placeholder="Factor" step="0.001" required/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateRebajaImpuesto1" name="updateRebajaImpuesto1" class="updateRebajaImpuesto" placeholder="Rebaja" step="0.001" required/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateTasaMImpuesto1" name="updateTasaMImpuesto1" class="updateTasaMImpuesto" placeholder="Tasa Maxima" step="0.001" required/>
									</td>
								</tr>
								<tr>
									<td>2</td>
									<td class="hide">
										<input type="number" class="form-control noRadius" id="updateIdImpuesto2" name="updateIdImpuesto2" class="updateIdImpuesto"/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateDesdeImpuesto2" name="updateDesdeImpuesto2" class="updateDesdeImpuesto" placeholder="valor Minimo" step="0.001" required/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateHastaImpuesto2" name="updateHastaImpuesto2" class="updateHastaImpuesto" placeholder="valor Máximo" step="0.001" required/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateFactorImpuesto2" name="updateFactorImpuesto2" class="updateFactorImpuesto" placeholder="Factor" step="0.001" required/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateRebajaImpuesto2" name="updateRebajaImpuesto2" class="updateRebajaImpuesto" placeholder="Rebaja" step="0.001" required/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateTasaMImpuesto2" name="updateTasaMImpuesto2" class="updateTasaMImpuesto" placeholder="Tasa Maxima" step="0.001" required/>
									</td>
								</tr>
								<tr>
									<td>3</td>
									<td class="hide">
										<input type="number" class="form-control noRadius" id="updateIdImpuesto3" name="updateIdImpuesto3" class="updateIdImpuesto"/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateDesdeImpuesto3" name="updateDesdeImpuesto3" class="updateDesdeImpuesto" placeholder="valor Minimo" step="0.001" required/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateHastaImpuesto3" name="updateHastaImpuesto3" class="updateHastaImpuesto" placeholder="valor Máximo" step="0.001" required/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateFactorImpuesto3" name="updateFactorImpuesto3" class="updateFactorImpuesto" placeholder="Factor" step="0.001" required/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateRebajaImpuesto3" name="updateRebajaImpuesto3" class="updateRebajaImpuesto" placeholder="Rebaja" step="0.001" required/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateTasaMImpuesto3" name="updateTasaMImpuesto3" class="updateTasaMImpuesto" placeholder="Tasa Maxima" step="0.001" required/>
									</td>
								</tr>
								<tr>
									<td>4</td>
									<td class="hide">
										<input type="number" class="form-control noRadius" id="updateIdImpuesto4" name="updateIdImpuesto4" class="updateIdImpuesto"/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateDesdeImpuesto4" name="updateDesdeImpuesto4" class="updateDesdeImpuesto" placeholder="valor Minimo" step="0.001" required/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateHastaImpuesto4" name="updateHastaImpuesto4" class="updateHastaImpuesto" placeholder="valor Máximo" step="0.001" required/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateFactorImpuesto4" name="updateFactorImpuesto4" class="updateFactorImpuesto" placeholder="Factor" step="0.001" required/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateRebajaImpuesto4" name="updateRebajaImpuesto4" class="updateRebajaImpuesto" placeholder="Rebaja" step="0.001" required/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateTasaMImpuesto4" name="updateTasaMImpuesto4" class="updateTasaMImpuesto" placeholder="Tasa Maxima" step="0.001" required/>
									</td>
								</tr>
								<tr>
									<td>5</td>
									<td class="hide">
										<input type="number" class="form-control noRadius" id="updateIdImpuesto5" name="updateIdImpuesto5" class="updateIdImpuesto"/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateDesdeImpuesto5" name="updateDesdeImpuesto5" class="updateDesdeImpuesto" placeholder="valor Minimo" step="0.001" required/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateHastaImpuesto5" name="updateHastaImpuesto5" class="updateHastaImpuesto" placeholder="valor Máximo" step="0.001" Required/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateFactorImpuesto5" name="updateFactorImpuesto5" class="updateFactorImpuesto" placeholder="Factor" step="0.001" required/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateRebajaImpuesto5" name="updateRebajaImpuesto5" class="updateRebajaImpuesto" placeholder="Rebaja" step="0.001" required/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateTasaMImpuesto5" name="updateTasaMImpuesto5" class="updateTasaMImpuesto" placeholder="Tasa Maxima" step="0.001" required/>
									</td>
								</tr>
								<tr>
									<td>6</td>
									<td class="hide">
										<input type="number" class="form-control noRadius" id="updateIdImpuesto6" name="updateIdImpuesto6" class="updateIdImpuesto"/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateDesdeImpuesto6" name="updateDesdeImpuesto6" class="updateDesdeImpuesto" placeholder="valor Minimo" step="0.001" required/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateHastaImpuesto6" name="updateHastaImpuesto6" class="updateHastaImpuesto" placeholder="valor Máximo" step="0.001" required/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateFactorImpuesto6" name="updateFactorImpuesto6" class="updateFactorImpuesto" placeholder="Factor" step="0.001" required/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateRebajaImpuesto6" name="updateRebajaImpuesto6" class="updateRebajaImpuesto" placeholder="Rebaja" step="0.001" required/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateTasaMImpuesto6" name="updateTasaMImpuesto6" class="updateTasaMImpuesto" placeholder="Tasa Maxima" step="0.001" required/>
									</td>
								</tr>
								<tr>
									<td>7</td>
									<td class="hide">
										<input type="number" class="form-control noRadius" id="updateIdImpuesto7" name="updateIdImpuesto7" class="updateIdImpuesto"/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateDesdeImpuesto7" name="updateDesdeImpuesto7" class="updateDesdeImpuesto" placeholder="valor Minimo" step="0.001" required/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateHastaImpuesto7" name="updateHastaImpuesto7" class="updateHastaImpuesto" placeholder="valor Máximo" Disabled/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateFactorImpuesto7" name="updateFactorImpuesto7" class="updateFactorImpuesto" placeholder="Factor" step="0.001" required/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateRebajaImpuesto7" name="updateRebajaImpuesto7" class="updateRebajaImpuesto" placeholder="Rebaja" step="0.001" required/>
									</td>
									<td>
										<input type="number" class="form-control noRadius" id="updateTasaMImpuesto7" name="updateTasaMImpuesto7" class="updateTasaMImpuesto" placeholder="Tasa Maxima" step="0.001" required/>
									</td>
								</tr>
							
							</tbody>
				
						</table>
					</div>
					<div class="form-actions right1">
						<button type="button" class="btn default" onclick="javascript:cerrarModalMupdate()">Cancelar</button>
						<button type="submit" class="btn green" id="updateMSubmit">Modificar Masivo</button>
					</div>
				</div>
			</form>	
      </div>
    </div>
  </div>
</div> 
 





<br>	

	
<div id="divCierre" class="col-xs-12 col-sm-12">
						<div class="col-md-3 col-md-offset-9 margin-bottom">
							<div class="col-md-12 margin-bottom">
								<label class="col-md-12 control-label text-center">Periodo </label>
							</div>
							<div class="col-md-12 margin-bottom">
								<select class="form-control" id="selectorPeriodo" name="selectorPeriodo" onchange="mostrarPeriodo(this)"> </select>
							</div>
							
						</div> 
	<div class="table-responsive" id="ignore">
		<table class="table table-bordered table-hover table-striped table-condensed td-body-center" id="tbl_Impuesto">
			<thead>  
			      <tr>        
					<th class="text-center">#</th>
					<th class="text-center">Desde (UTM)</th> 
					<th class="text-center">Hasta (UTM)</th>  
					<th class="text-center">Rebaja (UTM)</th>
					<th class="text-center">Desde ($)</th>
					<th class="text-center">Hasta ($)</th> 
					<th class="text-center">Factor (UTM)</th> 
					<th class="text-center">Rebaja ($)</th>
					<th class="text-center ">T. Máxima (UTM)</th>
					<th class="text-center ">T. Máxima ($)</th>
                </tr>
			</thead>
			
			<tbody id="tblBodyImpuesto"></tbody>

		</table>
	</div>
	<div>
		<div id="agregarDocumentoHref" style="float: right;">
	         <button id="momdifyImpuesto" title="Agregar" class="btn btn-circle yellow btn-outline" data-toggle="modal" onclick="javascript:modificarImpuestoMasivo()">
				<i class="fa fa-pencil-square-o fa-lg"></i> Modificación Masiva
			</button>
			
		</div>
	</div>	
</div>


<div class="dragbox ui-resizable">
	<div class="dragbox-content"></div>
</div>
<p style="color:white">.</p>
<article id="loading" class="loading_dos" style="display: block;">
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
    margin-left: 33.33% !important;
}
.text-center{
text-align:center !important;
}
.margin-bottom{
	margin-bottom:10px;
	padding-left:0px;
	padding-right:0px;
}
.swal2-popup {
z-index:auto !important;

}
</style>

