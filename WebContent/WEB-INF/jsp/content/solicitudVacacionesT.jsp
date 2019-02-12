<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	<form class="form-horizontal form-fix noRadius noBorder col-sm-offset-3 col-sm-6" id="agregarSolicitud" action="#" role="form">
		<div class="form-body">
				
			<div class="form-group">
				<label class="col-md-3 control-label">Rut o codigo</label>
				<div class="col-md-9">
					<input type="text" class="form-control noRadius" id="rutTrabajador" onblur="javascript:validacionRut(this)" onchange="javascript:setearRut(this)" name="rutTrabajador" placeholder="Rut" required> 
				</div>
			</div>	
            <div class="form-group">
				<label class="col-md-3 control-label">Fecha de Inicio</label>
				<div class="col-md-9">
					<input type="date" class="form-control noRadius" id="fechaInicioSolicitud" name="fechaInicioSolicitud"  required/>
				</div>
			</div>	
			<div class="form-group">
				<label class="col-md-3 control-label">Cantidad de Días</label>
				<div class="col-md-9">
					<input type="number" class="form-control noRadius" id="cantidadDiasSolicitud" name="cantidadDiasSolicitud" min="0" step="1" required/>
				</div>
			</div>
			<div class="form-actions text-center">
				<button type="submit" class="btn green" id="submitAddSolicitud">Solicitar</button>
			</div>
		</div>
	</form>
</div>

<style>

.noRadius{
	box-shadow: none;
	border-radius:0px;
}
.noBorder{
	    border: none;
}

</style>
