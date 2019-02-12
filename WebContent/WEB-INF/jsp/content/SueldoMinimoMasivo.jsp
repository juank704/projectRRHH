<div class="portlet light bordered">
	
	<div class="portlet-body form">
		<!-- BEGIN FORM-->
		<form class="form-horizontal" id="formSueldoMinimoActual">
			<div class="row">
				<div class="col-md-12">
					<h4 class="h4SueldoMinimo"><span><strong>Sueldo Mínimo Actual</strong></span>: <label id="sueldoMinimoActualLabel"></label></h4>
				</div>
			</div>
				<div class="col-md-5" style="padding-top:10px;">
					<label class="col-md-5 control-label" >Nuevo Sueldo Mínimo</label>
					<div class="col-md-4">
						<input type="text" class="form-control newMoney" id="inputSueldoBaseNuevo" onkeyup="javascript:listarSueldo()" placeholder="Sueldo Mínimo">
						<span class="help-block hide"> A block of help text. </span>
					</div>
				</div>
			<div class="form-body col-md-12">
				<div class="form-group">
					<label class="col-md-3 control-label">Horas</label>
					
				</div>
				<div id="blocksSueldos">
					
				</div>
			</div>
			<div class="form-actions text-center" id="form-action-sueldo-">
				<div class="row">
					<div class="col-md-offset-3 col-md-9">
						<button type="submit" class="btn green">Submit</button>
						<button type="button" class="btn default">Cancel</button>
					</div>
				</div>
			</div>
		</form>
		<!-- END FORM-->
	</div>
</div>
<style>
form {
    width: 98% !important;
}
.h4SueldoMinimo
{
	padding-left: 8em !important;
}


</style>






