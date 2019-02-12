<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>


<div class="content col-sm-12 col-md-12">
	<form class="form-horizontal form-fix noRadius noBorder" id="editRHCalculosForm" role="form" action="#">
				<div class="form-body">
					<div class="alert alert-danger display-hide text-left" id="rhwa">
                       	<button class="close" data-close="alert"></button>
                       	<p id="textorhwa">
                       	
                       	 </p>
                       </div>
                       <div class="alert alert-success display-hide" id="rhga">
                           <button class="close" data-close="alert"></button> No se encontraron errores
                       </div>
					<input type="text" class="form-control noRadius hide" id="editarIdRHCalculos" name="editarIdRHCalculos" > 
					<div class="form-group col-md-6">
						<div class="col-md-12 margin-bottom-2">
							<div class="col-md-6">
								<label class="control-label">Ingreso Mínimo</label>
							</div>
							<div class="col-md-6">
								<input type="text" class="form-control noRadius input-circle newMoney" id="editarIngresoMinimo" name="editarIngresoMinimo" min="0" value="0" step="1" required> 
							</div>
						</div>
						<div class="col-md-12 margin-bottom-1">
							<div class="col-md-6">
								<label class="control-label">Porcentaje Seguro cesantía empleado indefinido</label>
							</div>
							<div class="col-md-6">
								<input type="number" class="form-control noRadius input-circle" id="editarPorcentajeSCI" name="editarPorcentajeSCI" min="0" value="0" step="0.0001" required>
							</div>
						</div>
						<div class="col-md-12 margin-bottom-1">
							<div class="col-md-6">
								<label class="control-label">Porcentaje seguro cesantía empresa indefinido</label>
							</div>
							<div class="col-md-6">
								<input type="number" class="form-control noRadius input-circle" id="editarPorcentajeSCEI" name="editarPorcentajeSCEI" min="0" value="0" step="0.0001" required>
							</div>
						</div>
						<div class="col-md-12 margin-bottom-1">
							<div class="col-md-6">
								<label class="control-label">Porcentaje seguro cesantía empresa fijo</label>
							</div>
							<div class="col-md-6">
								<input type="number" class="form-control noRadius input-circle" id="editarPorcentajeSCEF" name="editarPorcentajeSCEF" min="0" value="0" step="0.0001" required>
							</div>
						</div>
						
						<div class="col-md-12 margin-bottom-2">
							<div class="col-md-6">
								<label class="control-label">Hora Extra</label>
							</div>
							<div class="col-md-6">
								<input type="number" class="form-control noRadius input-circle" id="editarHoraExtra" name="editarHoraExtra" min="0" step="any" required>	
							</div>
						</div>
						<div class="col-md-12 margin-bottom-2">
							<div class="col-md-6">
								<label class="control-label">Porcentaje fondo sol cesantía</label>
							</div>
							<div class="col-md-6">
								<input type="number" class="form-control noRadius input-circle" id="editarPorcentajeFSC" name="editarPorcentajeFSC" min="0" value="0" step="0.0001" required>
							</div>
						</div>
						<div class="col-md-12 margin-bottom-2">
							<div class="col-md-6">
								<label class="control-label">Días laborales</label>
							</div>
							<div class="col-md-6">
								<input type="number" class="form-control noRadius input-circle" id="editarDiasLaborales" name="editarDiasLaborales" min="0" value="0" step="any" required>
							</div>
						</div>
						<div class="col-md-12 margin-bottom-2">
							<div class="col-md-6">
								<label class="control-label">Tope hora extra diario</label>
							</div>
							<div class="col-md-6">
								<input type="number" class="form-control noRadius input-circle" id="editarHoraExtraDiario" name="editarHoraExtraDiario" min="0" value="0" step="any" required>
							</div>
						</div>
						<div class="col-md-12 margin-bottom-2">
							<div class="col-md-6">
								<label class="control-label">Tope hora extra semanal</label>
							</div>
							<div class="col-md-6">
								<input type="number" class="form-control noRadius input-circle" id="editarHoraExtraSemanal" name="editarHoraExtraSemanal" min="0" value="0" step="any" required>
							</div>
						</div>
						<div class="col-md-12 margin-bottom-2">
							<div class="col-md-6">
								<label class="control-label">Moneda tope finiquito</label>
							</div>
							<div class="col-md-6">
								<select name="editarSelectTFI" id="editarSelectTFI" class="form-control input-circle" required></select>
							</div>
						</div>
						<div class="col-md-12 margin-bottom-2">
							<div class="col-md-6">
								<label class="control-label">Tope Finiquito</label>
							</div>
							<div class="col-md-6">
								<input type="number" class="form-control noRadius input-circle" id="editarTopeFI" name="editarTopeFI" min="0" value="0" step="0.01" required>
							</div>
						</div>
					</div>
					<div class="form-group col-md-6">	
						<div class="col-md-12 margin-bottom-2">
							<div class="col-md-6">
								<label class="control-label">Moneda tope imponible</label>
							</div>
							<div class="col-md-6">
								<select name="editarSelectTI" id="editarSelectTI" class="form-control input-circle" required></select>
							</div>
						</div>
						<div class="col-md-12 margin-bottom-2">
							<div class="col-md-6">
								<label class="control-label">tope imponible</label>
							</div>
							<div class="col-md-6">
								<input type="number" class="form-control noRadius input-circle" id="editarTopeImponible" name="editarTopeImponible" min="0" step="any" required>
							</div>
						</div>
						<div class="col-md-12 margin-bottom-2">
							<div class="col-md-6">
								<label class="control-label">Moneda tope seguro cesantía </label>
							</div>
							<div class="col-md-6">
								<select name="editarSelectTS" id="editarSelectTS" class="form-control input-circle" required></select>
							</div>
						</div>
						<div class="col-md-12 margin-bottom-2">
							<div class="col-md-6">
								<label class="control-label">Tope seguro cesantía</label>
							</div>
							<div class="col-md-6">
								<input type="number" class="form-control noRadius input-circle" id="editarTopeSC" name="editarTopeSC" min="0" value="0" step="0.0001" required>
							</div>
						</div>
						<div class="col-md-12 margin-bottom-2">
							<div class="col-md-6">
								<label class="control-label">Moneda tope APV</label>
							</div>
							<div class="col-md-6">
								<select name="editarSelectTAPV" id="editarSelectTAPV" class="form-control input-circle" required></select>
							</div>
						</div>
						<div class="col-md-12 margin-bottom-2">
							<div class="col-md-6">
								<label class="control-label">Tope APV</label>
							</div>
							<div class="col-md-6">
								<input type="number" class="form-control noRadius input-circle" id="editarTopeAPV" name="editarTopeAPV" min="0" value="0" step="0.01" required>
							</div>
						</div>
						<div class="col-md-12 margin-bottom-1">
							<div class="col-md-6">
								<label class="control-label">Moneda tope depósito convenido</label>
							</div>
							<div class="col-md-6">
								<select name="editarSelectTDC" id="editarSelectTDC" class="form-control input-circle" required></select>
							</div>
						</div>
						<div class="col-md-12 margin-bottom-1">
							<div class="col-md-6">
								<label class="control-label">Tope deposito convenido</label>
							</div>
							<div class="col-md-6">
								<input type="number" class="form-control noRadius input-circle" id="editarTopeDepConv" name="editarTopeDepConv" min="0" value="0" step="0.01" required>
							</div>
						</div>
						<div class="col-md-12 margin-bottom-1">
							<div class="col-md-6">
								<label class="control-label">Moneda tope imponible IPS</label>
							</div>
							<div class="col-md-6">
								<select name="editarSelectTIPS" id="editarSelectTIPS" class="form-control input-circle" required></select>
							</div>
						</div>
						<div class="col-md-12 margin-bottom-1">
							<div class="col-md-6">
								<label class="control-label">Tope imponible IPS</label>
							</div>
							<div class="col-md-6">
								<input type="number" class="form-control noRadius input-circle" id="editarTopeIPS" name="editarTopeIPS" min="0" value="0" step="0.01" required>
							</div>
						</div>
					</div>
					
                   		
				
					<div class="form-actions right1 col-md-12">
						
						<button type="submit" class="btn green" id="submitEditarRHCalculo">Modificar</button>
					</div>
				</div>
			</form>	




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
.margin-bottom-1{
margin-bottom:1%;
}
.margin-bottom-2{
margin-bottom:3%;
}
.min-width-180{
min-width: 180px;
}
.margin-left-7{
    margin-left: 7% !important;
}
#tblBodyFeriados > tr> td
{
	text-align:center;

}
</style>

