<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>


<div class="modal fade" id="editarTramoModal" tabindex="-1" role="dialog" aria-labelledby="editarTramoLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content noRadius">
    
		<div class="modal-body">
        	<form class="form-horizontal form-fix noRadius noBorder" id="editTramoForm" role="form">
				<div class="form-body">
					<div class="alert alert-danger display-hide text-left" id="twe">
	                   	<button class="close" data-close="alert"></button>
	                   	<p id="textotwe">
	                   	
	                   	</p>
                    </div>
                    <div class="alert alert-success display-hide" id="tge">
                        <button class="close" data-close="alert"></button> No se encontraron errores
                    </div>
					<input type="text" class="form-control noRadius hide" id="editarIdTramo" name="editarIdTramo" placeholder="id"> 
					<div class="form-group">
						<label class="col-md-3 control-label">Descripción</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="editarNombreTramo" name="editarNombreTramo" placeholder="Nombre Tramo" required> 
						</div>
					</div>	
                   		
					<div class="form-group">
						<label class="col-md-12 control-label text-center">Rango Tramo</label>
						<div class="col-md-6">
							<label class="col-md-12 control-label text-center">Desde</label>
							<input type="number" class="form-control noRadius" id="editarInicioTramo" name="editarInicioTramo" placeholder="valor - valor" min="0" step="1" required/>
						</div>
						<div class="col-md-6">
							<label class="col-md-12 control-label text-center">Hasta</label>
							<input type="number" class="form-control noRadius" id="editarFinTramo" name="editarFinTramo" placeholder="valor - valor" min="0" step="1" required/>
						</div>
					</div>
						
					<div class="form-actions right1">
						<button type="button" class="btn default" data-dismiss="modal">Cancelar</button>
						<button type="submit" class="btn green" id="submitEditTramo">Editar Tramo</button>
					</div>
				</div>
			</form>	
      </div>
	  
    </div>
  </div>
</div> 
<div class="modal fade" id="updateMTramoModal" tabindex="-1" role="dialog" aria-labelledby="updateMTramoModal" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
    <h3 class="modal-title title-padding" id="updateMTramoLabel">Modificar Todos los Tramos</h3>
		<div class="modal-body padding-top-5">
        	<form class="form-horizontal form-fix noRadius noBorder"  id="updateMTramoForm" role="form">
				<div class="form-body">
					<div class="alert alert-danger display-hide text-left" id="twa">
                        	<button class="close" data-close="alert"></button>
                        	<p id="textotwa">
                        	
                        	 </p>
                        </div>
                        <div class="alert alert-success display-hide" id="tga">
                            <button class="close" data-close="alert"></button> No se encontraron errores
                        </div>
                     
              
					<input type="text" class="form-control noRadius hide" id="updatePeriodoTramos" name="updatePeriodoTramos" class="updatePeriodoTramos"/>
					<div class="table-responsive" id="ignore">
						<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_TramoM">
							<thead>  
							      <tr>        
									<th class="text-center">Tramo</th>
									<th class="text-center">Desde</th>
									<th class="text-center">Hasta</th>
									<th class="text-center">Monto</th>
				                </tr>
							</thead>
							
							<tbody id="tblBodyTramo">
								<tr>
									<td>A</td>
									<td class="hide">
										<input type="text" class="form-control noRadius" id="updateIdTramoA" name="updateIdTramoA" class="updateIdTramo"/>
									</td>
									<td>
										<input type="text" class="form-control noRadius" id="updateInicioTramoA" name="updateInicioTramoA" class="updateInicioTramo" placeholder="valor Minimo" disabled/>
									</td>
									<td>
										<input type="text" class="form-control noRadius" id="updateFinTramoA" name="updateFinTramoA" class="updateFinTramo" placeholder="valor Máximo" onkeyup="textToMoneyWithoutComa(this)" required/>
									</td>
									<td>
										<input type="text" class="form-control noRadius" id="updateMontoTramoA" name="updateMontoTramoA" class="updateMontoTramo" placeholder="Monto" onkeyup="textToMoneyWithoutComa(this)" required/>
									</td>
								</tr>
								<tr>
									<td>B</td>
									<td class="hide">
										<input type="text" class="form-control noRadius" id="updateIdTramoB" name="updateIdTramoB" class="updateIdTramo"/>
									</td>
									<td>
										<input type="text" class="form-control noRadius" id="updateInicioTramoB" name="updateInicioTramoB" class="updateInicioTramo" placeholder="valor Minimo" onkeyup="textToMoneyWithoutComa(this)" required/>
									</td>
									<td>
										<input type="text" class="form-control noRadius" id="updateFinTramoB" name="updateFinTramoB" class="updateFinTramo" placeholder="valor Máximo" onkeyup="textToMoneyWithoutComa(this)" required/>
									</td>
									<td>
										<input type="text" class="form-control noRadius" id="updateMontoTramoB" name="updateMontoTramoB" class="updateMontoTramo" placeholder="Monto" onkeyup="textToMoneyWithoutComa(this)" required/>
									</td>
								</tr>
								<tr>
									<td>C</td>
									<td class="hide">
										<input type="text" class="form-control noRadius" id="updateIdTramoC" name="updateIdTramoC" class="updateIdTramo"/>
									</td>
									<td>
										<input type="text" class="form-control noRadius" id="updateInicioTramoC" name="updateInicioTramoC" class="updateInicioTramo" placeholder="valor Minimo" onkeyup="textToMoneyWithoutComa(this)" required/>
									</td>
									<td>
										<input type="text" class="form-control noRadius" id="updateFinTramoC" name="updateFinTramoC" class="updateFinTramo" placeholder="valor Máximo" onkeyup="textToMoneyWithoutComa(this)" required/>
									</td>
									<td>
										<input type="text" class="form-control noRadius" id="updateMontoTramoC" name="updateMontoTramoC" class="updateMontoTramo" placeholder="Monto" onkeyup="textToMoneyWithoutComa(this)" required/>
									</td>
								</tr>
								<tr>
									<td>D</td>
									<td class="hide">
										<input type="text" class="form-control noRadius" id="updateIdTramoD" name="updateIdTramoD" class="updateIdTramo"/>
									</td>
									<td>
										<input type="text" class="form-control noRadius" id="updateInicioTramoD" name="updateInicioTramoD" class="updateInicioTramo" placeholder="valor Minimo" onkeyup="textToMoneyWithoutComa(this)" required/>
									</td>
									<td>
										<input type="text" class="form-control noRadius" id="updateFinTramoD" name="updateFinTramoD" class="updateFinTramo" placeholder="valor Máximo" Disabled/>
									</td>
									<td>
										<input type="text" class="form-control noRadius" id="updateMontoTramoD" name="updateMontoTramoD" class="updateMontoTramo" placeholder="Monto" onkeyup="textToMoneyWithoutComa(this)" required/>
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
 
<div class="modal fade" id="agregarMTramoModal" tabindex="-1" role="dialog" aria-labelledby="agregarMTramoModal" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
    <h3 class="modal-title title-padding" id="agregarMTramoLabel">Agregar Nuevos Tramo</h3>
		<div class="modal-body padding-top-5">
        	<form class="form-horizontal form-fix noRadius noBorder"  id="insertMTramoForm" role="form">
				<div class="form-body">
					<div class="alert alert-danger display-hide text-left" id="twa">
                        	<button class="close" data-close="alert"></button>
                        	<p id="textotwa">
                        	
                        	 </p>
                        </div>
                        <div class="alert alert-success display-hide" id="tga">
                            <button class="close" data-close="alert"></button> No se encontraron errores
                        </div>
                     
                     	<div class="col-md-6 margin-bottom">
							<label class="col-md-12 control-label text-center">Periodo </label>
							<input type="month" class="form-control text-center noRadius" id="agregarPeriodoTramoMasivo" name="agregarPeriodoTramoMasivo" required/>
						</div>   
					
					<br>
					<div class="table-responsive" id="ignore">
						<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_TramoM">
							<thead>  
							      <tr>        
									<th class="text-center">Tramo</th>
									<th class="text-center">Desde</th>
									<th class="text-center">Hasta</th>
									<th class="text-center">Monto</th>
				                </tr>
							</thead>
							
							<tbody id="tblBodyTramo">
								<tr>
										
									<td>A</td>
									<td>
										<input type="text" class="form-control noRadius" id="agregarInicioTramoA" name="agregarInicioTramoA" class="agregarInicioTramo" placeholder="valor Minimo" required/>
									</td>
									<td>
										<input type="text" class="form-control noRadius" id="agregarFinTramoA" name="agregarFinTramoA" class="agregarFinTramo" placeholder="valor Minimo" required/>
									</td>
									<td>
										<input type="text" class="form-control noRadius" id="agregarMontoTramoA" name="agregarMontoTramoA" class="agregarMontoTramo" placeholder="Monto" required/>
									</td>
								</tr>
								<tr>
									<td>B</td>
									<td>
										<input type="text" class="form-control noRadius" id="agregarInicioTramoA" name="agregarInicioTramoB" class="agregarInicioTramo" placeholder="valor Minimo" required/>
									</td>
									<td>
										<input type="text" class="form-control noRadius" id="agregarFinTramoA" name="agregarFinTramoB" class="agregarFinTramo" placeholder="valor Máximo" required/>
									</td>
									<td>
										<input type="text" class="form-control noRadius" id="agregarMontoTramoA" name="agregarMontoTramoB" class="agregarMontoTramo" placeholder="Monto" required/>
									</td>
								</tr>
								<tr>
									<td>C</td>
									<td>
										<input type="text" class="form-control noRadius" id="agregarInicioTramoA" name="agregarInicioTramoC" class="agregarInicioTramo" placeholder="valor Minimo" required/>
									</td>
									<td>
										<input type="text" class="form-control noRadius" id="agregarFinTramoA" name="agregarFinTramoC" class="agregarFinTramo" placeholder="valor Máximo" required/>
									</td>
									<td>
										<input type="text" class="form-control noRadius" id="agregarMontoTramoA" name="agregarMontoTramoC" class="agregarMontoTramo" placeholder="Monto" required/>
									</td>
								</tr>
								<tr>
									<td>D</td>
									<td>
										<input type="text" class="form-control noRadius" id="agregarInicioTramoA" name="agregarInicioTramoD" class="agregarInicioTramo" placeholder="valor Minimo" required/>
									</td>
									<td>
										<input type="text" class="form-control noRadius" id="agregarFinTramoA" name="agregarFinTramoD" class="agregarFinTramo" placeholder="valor Máximo" required/>
									</td>
									<td>
										<input type="text" class="form-control noRadius" id="agregarMontoTramoA" name="agregarMontoTramoD" class="agregarMontoTramo" placeholder="Monto" required/>
									</td>
								</tr>
							
							</tbody>
				
						</table>
					</div>
					<div class="form-actions right1">
						<button type="button" class="btn default" onclick="javascript:cerrarModalMAgregar()">Cancelar</button>
						<button type="submit" class="btn green" id="agregarSubmit">Agregar Tramo</button>
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
		<table class="table table-bordered table-hover table-striped table-condensed td-body-center" id="tbl_Tramo">
			<thead>  
			      <tr>        
					<th class="text-center">Tramo</th>
					<th class="text-center">Desde</th>  
					<th class="text-center">Hasta</th>  
					<th class="text-center">Monto</th>
					<th class="text-center ">Periodo</th>
                </tr>
			</thead>
			
			<tbody id="tblBodyTramo"></tbody>

		</table>
	</div>
	<div>
		<div id="agregarDocumentoHref" style="float: right;">
	         <button id="momdifyTramo" title="Agregar" class="btn btn-circle yellow btn-outline" data-toggle="modal" onclick="javascript:updateTramos()">
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

