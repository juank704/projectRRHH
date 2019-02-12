<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<div class="modal fade" id="agregarevMutModal" tabindex="-1" role="dialog" aria-labelledby="agregarevMutModal" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
    <h3 class="modal-title title-padding" id="agregarevMutLabel">Antecedentes del accidente</h3>
		<div class="modal-body padding-top-5">
        	<form class="form-horizontal form-fix noRadius noBorder"  id="insertevMutForm" role="form">
				<div class="form-body">
					<input type="text" class="form-control noRadius hide" id="editarIdTrabajador" name="editarIdTrabajador" placeholder="id">
					<input type="text" class="form-control noRadius hide" id="editarIdLicencia" name="editarIdLicencia" placeholder="id">  
					<div class="alert alert-danger display-hide text-left" id="fwa">
                    	<button class="close" data-close="alert"></button>
                    	<p id="textofwa">
                    	
                    	</p>
                    </div>
                    <div class="col-md-12">
                    	<div class="row margin-bottom-6">
                    		<div class="form-group col-md-8">
                    			
                    		</div>
                    		<div class="form-group col-md-4">
                    			<div class="col-md-5">
									<label class="control-label" id="labelForRegisterDateEvMut">Fecha Registro</label>
								</div>
								<div class="col-md-6 show">
									<input type="text" name="fechaRegistroEvMut" id="fechaRegistroEvMut" class="form-control input-circle" disabled>
								</div>
                    		</div>
                    	</div>                    	
                    	<div class="row margin-bottom-5">
                   			
                    		<div class="col-md-4 show" id="selectorUno">
                    			<div class="col-md-6">
									<label class="control-label" id="labelForRut">Rut</label>
								</div>
								<div class="col-md-6">
									<select name="selectorRutEvMut" id="selectorRutEvMut" onchange="llenarCampos(this,1)" class="form-control col-md-12"></select>
								</div>
                    		</div>
                    		<div class="col-md-4 hide" id="selectorDos">
                    			<div class="col-md-6">
									<label class="control-label" id="labelForRutWithLicense">Ruts con licencias</label>
								</div>
								<div class="col-md-6">
									<select name="selectorRutWithLicenseEvMut" id="selectorRutWithLicenseEvMut" class="form-control input-sm col-md-12"></select>	
								</div>
                    		</div>
                    		<div class="col-md-3 col-md-offset-1">
                    			<div class="form-group col-md-9">
									<label class="control-label">licencia</label>
								</div>								
								<div class="col-md-3 text-left input-group">
									 <input type="checkbox" class="icheck" id="agregarIcheckLicenciaEvMut" name="agregarIcheckLicenciaEvMut" onclick="onChange()">
								</div>
							</div>
                    	</div>
                    	<div class="row margin-bottom-5">
                    			<div class="col-md-2">
									<label class="control-label">Nombres</label>
								</div>
								<div class="col-md-5">
									<input type="text" class="form-control noRadius" id="agregarNombresEvMut" name="agregarNombresEvMut"> 
								</div>
                    	</div>		
                    	
                    	<div class="row margin-bottom-5">
                    		<div class="col-md-4 margin-bottom-5">
                    			<div class="col-md-6">
									<label class="control-label">Apellido Paterno</label>
								</div>
								<div class="col-md-6">
									<input type="text" class="form-control noRadius" id="agregarApPaternoEvMut" name="agregarApPaternoEvMut" > 
								</div>
                    		</div>
                    		<div class="col-md-4 margin-bottom-5">
                    			<div class="col-md-6">
									<label class="control-label">Apellido Materno</label>
								</div>
								<div class="col-md-6">
									<input type="text" class="form-control noRadius" id="agregarApMaternoEvMut" name="agregarApPaternoEvMut" > 
								</div>
                    		</div>
                    		<div class="col-md-4 margin-bottom-5">
                    			<div class="col-md-6">
										<label class="control-label">Edad</label>
									</div>
									<div class="col-md-6">
										<input type="text" class="form-control noRadius" id="agregarEdadEvMut" name="agregarEdadEvMut" > 
									</div>
                    		</div>
                    	</div>
                    	
                    	<div class="row margin-bottom-5">
                    		<div class="col-md-4">                    			
	                    			<div class="col-md-6">
										<label class="control-label">Profesión / oficio</label>
									</div>
									<div class="col-md-6">
										<input type="text" class="form-control noRadius" id="agregarProfesionOficioEvMut" name="agregarProfesionOficioEvMut" > 
									</div>
	                    	
                    		</div>
                    		<div class="col-md-4">
	                    			<div class="col-md-6">
										<label class="control-label">cargo</label>
									</div>
									<div class="col-md-6">
										<select class="form-control noRadius" id="agregarCargoEvMut" name="agregarCargoEvMut" ></select> 
									</div>
	                    		
                    		</div>
                    		<div class="col-md-4 hide">
	                    			<div class="col-md-6">
										<label class="control-label">Sexo</label>
									</div>
									<div class="col-md-6">
										<select name="selectorSexoEvMut" id="selectorSexoEvMut" class="form-control ">
												<option value="1">Masculino</option>
												<option value="2">Femenino</option>
										</select>
									</div>
	                    		
                    		</div>
                    		
                    	</div>
                    
                    	<div class="row margin-bottom-5">
                    		<div class="col-md-4">                    			
	                    			<div class="col-md-6">
										<label class="control-label">Huerto </label>
									</div>
									<div class="col-md-6">
										<select class="form-control noRadius" id="agregarDivisionEvMut" name="agregarDivisionEvMut" > </select>
									</div>
                    		</div>
                    		<div class="col-md-4">
	                    			<div class="col-md-6">
										<label class="control-label">Subdivisión</label>
									</div>
									<div class="col-md-6">
										<select class="form-control noRadius" id="agregarSubdivisionEvMut" name="agregarSubdivisionEvMut" > </select>
									</div>
                    		</div>
                    	</div>
                    	<div class="row margin-bottom-5">
                    		<div class="col-md-4">
                    			<div class="col-md-6">
										<label class="control-label">Fecha Contrato</label>
									</div>
									<div class="col-md-6">
										<input type="text" class="form-control noRadius" id="agregarAnosAntiguedadEvMut" name="agregarAnosAntiguedadEvMut" > 
									</div>
                    		</div>
                    		<div class="col-md-4">
                    			<div class="col-md-6">
									<label class="control-label">Fecha Accidente</label>
								</div>
								<div class="col-md-6">
									<input type="date" class="form-control noRadius" id="agregarFechaAccidenteEvMut" name="agregarFechaAccidenteEvMut" required> 
								</div>
                    		</div>
                    		<div class="col-md-4">
                    			<div class="col-md-6">
									<label class="control-label">Hora Accidente</label>
								</div>
								<div class="col-md-6">
									<input type="time" class="form-control noRadius" id="agregarHoraAccidenteEvMut" name="agregarHoraAccidenteEvMut" required> 
								</div>
                    		
                    		</div>
                    	</div>
                    	<div class="row margin-bottom-5">
                    		
                    			<div class="col-md-2">
									<label class="control-label">Lugar de Trabajo</label>
								</div>
								<div class="col-md-5">
									<input type="text" class="form-control noRadius" id="agregarLugarTrabajoEvMut" name="agregarLugarTrabajoEvMut" > 
								</div>
                    		
                    	</div>
                    	<h4 class="text-left"> Jefatura</h4>
                    	<div class="row margin-bottom-5">
                    		
                    			<div class="col-md-2">
									<label class="control-label">Nombres</label>
								</div>
								<div class="col-md-5">
									<input type="text" class="form-control noRadius" id="agregarNombreJefeEvMut" name="agregarNombreJefeEvMut" required> 
								</div>
                    	</div> 
                    	<div class="row margin-bottom-5">
                    		<div class="col-md-4 margin-bottom-5">
                    			<div class="col-md-6">
									<label class="control-label">Apellido Paterno</label>
								</div>
								<div class="col-md-6">
									<input type="text" class="form-control noRadius" id="agregarApPaternoJefeEvMut" name="agregarApPaternoJefeEvMut"  required> 
								</div>
                    		</div>
                    		<div class="col-md-4 margin-bottom-5">
                    			<div class="col-md-6">
									<label class="control-label">Apellido Materno</label>
								</div>
								<div class="col-md-6">
									<input type="text" class="form-control noRadius" id="agregarApMaternoJefeEvMut" name="agregarApPaternoJefeEvMut" required> 
								</div>
                    		</div>
                    		<div class="col-md-4 margin-bottom-5">
                    			<div class="col-md-6">
									<label class="control-label">Cargo</label>
								</div>
								<div class="col-md-6">
									<select class="form-control noRadius" id="agregarCargoJefeEvMut" name="agregarCargoJefeEvMut"  required></select> 
								</div>
                    		</div>
                    	</div>
                    	 
                    	<div class="row margin-bottom-5">
                    		
                    			
                    		
                    	
                    	</div>
                    	<h4 class="text-left">Descripción del accidente</h4>                	
	                    <div class="row margin-bottom-5">	
	                    	<div class="col-md-6">
	                    		<div class="col-md-4">
										<label class="control-label">Lugar Accidente </label>
									</div>
									<div class="col-md-6">
										<input type="text" class="form-control noRadius" id="agregarLugarAccidenteEvMut" name="agregarLugarAccidenteEvMut" required> 
									</div>
	                    	
	                    	</div>
	                    	<div class="col-md-6">
	                    		<div class="col-md-4">
										<label class="control-label">Actividad Realizada </label>
									</div>
									<div class="col-md-6">
										<input type="text" class="form-control noRadius" id="agregarActividadRealizadaEvMut" name="agregarActividadRealizadaEvMut" required> 
									</div>
	                    	
	                    	</div>
                    	</div>
                    	
                    	<div class="row margin-bottom-5">
                    		<div class="col-md-6">
                    			<div class="col-md-4">
									<label class="control-label">Causa Accidente </label>
								</div>
								<div class="col-md-6">
									<input type="text" class="form-control noRadius" id="agregarCausaAccidenteEvMut" name="agregarCausaAccidenteEvMut" required> 
								</div>
                    		</div>
                    		<div class="col-md-6">
                    			<div class="col-md-4">
									<label class="control-label">Consecuencia Accidente </label>
								</div>
								<div class="col-md-6">
									<input type="text" class="form-control noRadius" id="agregarConsecuenciaAccidenteEvMut" name="agregarConsecuenciaAccidenteEvMut" required> 
								</div>
                    		</div>
                    	</div>
                    	 	<h4 class="text-left">Apartado Mejoras</h4> 
                    	 <div class="row margin-bottom-5">
                    		<div class="col-md-6">
                    			<div class="col-md-4">
									<label class="control-label">Acción Mejora</label>
								</div>
								<div class="col-md-8">
									<input type="text" class="form-control noRadius" id="agregarAccionMejoraEvMut" name="agregarAccionMejoraEvMut"> 
								</div>
                    		</div>
                    		<div class="col-md-6">
                    			<div class="col-md-4">
									<label class="control-label">Responsable Mejora</label>
								</div>
								<div class="col-md-8">
									<input type="text" class="form-control noRadius" id="agregarResponsableMejoraEvMut" name="agregarResponsableMejoraEvMut"> 
								</div>
                    		</div>
                    		
                    	</div>
                    	<div class="row margin-bottom-5">
                    		<div class="col-md-6">
                    			<div class="col-md-4">
									<label class="control-label">Plazo Mejora</label>
								</div>
								<div class="col-md-8">
									<input type="date" class="form-control noRadius" id="agregarPlazoMejoraEvMut" name="agregarPlazoMejoraEvMut" > 
								</div>
                    		</div>
                    		
                    	</div>	
                    		
                    </div>
					
					<div class="form-actions right1">
						<button type="button" class="btn default" onclick="javascript:cerrarModalAgregar()">Cancelar</button>
						<button type="submit" class="btn green" id="agregarSubmit">Agregar evMut</button>
					</div>
				</div>
			</form>	
      </div>
    </div>
  </div>
</div> 

<br>	

<div class="modal fade" id="editEvMutModal" tabindex="-1" role="dialog" aria-labelledby="editEvMutModal" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
    <h3 class="modal-title title-padding" id="editEvMutLabel">Antecedentes del accidente</h3>
		<div class="modal-body padding-top-5">
        	<form class="form-horizontal form-fix noRadius noBorder"  id="editEvMutForm" role="form">
				<div class="form-body">
					<input type="text" class="form-control noRadius hide" id="editIdEvMut" name="editIdEvMut" placeholder="id">
					<input type="text" class="form-control noRadius hide" id="editIdTrabajador" name="editIdTrabajador" placeholder="id">
					<input type="text" class="form-control noRadius hide" id="editIdLicencia" name="editIdLicencia" placeholder="id">  
					<div class="alert alert-danger display-hide text-left" id="fwa">
                    	<button class="close" data-close="alert"></button>
                    	<p id="textofwa">
                    	
                    	</p>
                    </div>
                    <div class="col-md-12">
                    	<div class="row margin-bottom-6">
                    		<div class="form-group col-md-8">
                    			
                    		</div>
                    		<div class="form-group col-md-4">
                    			<div class="col-md-5">
									<label class="control-label" id="labelForRegisterDateEvMut">Fecha Registro</label>
								</div>
								<div class="col-md-6 show">
									<input type="text" name="editFechaRegistroEvMut" id="editFechaRegistroEvMut" class="form-control input-circle" disabled>
								</div>
                    		</div>
                    	</div>
                    	<div class="col-md-12 portlet light bordered" id="panelform">                  	
                    	<div class="row margin-bottom-5">
                   			
                    		<div class="col-md-4 show" id="selectorUno">
                    			<div class="col-md-6">
									<label class="control-label" id="labelForRut">Rut</label>
								</div>
								<div class="col-md-6">
									<input type="text" name="editRutRegistroEvMut" id="editRutRegistroEvMut" class="form-control" disabled>									
								</div>
                    		</div>
                    		
                    		<div class="col-md-4 margin-bottom-5">
                    			<div class="col-md-6">
										<label class="control-label">Edad</label>
									</div>
									<div class="col-md-6">
										<input type="text" class="form-control noRadius" id="editEdadEvMut" name="editEdadEvMut" disabled> 
									</div>
                    		</div>
                    		
                    	
                    		
                    	</div>
                    	<div class="row margin-bottom-5">
                    			<div class="col-md-2">
									<label class="control-label">Nombres</label>
								</div>
								<div class="col-md-5">
									<input type="text" class="form-control noRadius" id="editNombresEvMut" name="editNombresEvMut" disabled> 
								</div>
                    	</div>		
                    	
                    	<div class="row margin-bottom-5">
                    		<div class="col-md-4 margin-bottom-5">
                    			<div class="col-md-6">
									<label class="control-label">Apellido Paterno</label>
								</div>
								<div class="col-md-6">
									<input type="text" class="form-control noRadius" id="editApPaternoEvMut" name="editApPaternoEvMut" disabled> 
								</div>
                    		</div>
                    		<div class="col-md-8 margin-bottom-5">
                    			<div class="col-md-3">
									<label class="control-label">Apellido Materno</label>
								</div>
								<div class="col-md-5">
									<input type="text" class="form-control noRadius" id="editApMaternoEvMut" name="editApPaternoEvMut" disabled> 
								</div>
                    		</div>
                    		
                    	</div>
                    	
                    	<div class="row margin-bottom-5">
                    		<div class="col-md-4">                    			
	                    			<div class="col-md-6">
										<label class="control-label">Profesión / oficio</label>
									</div>
									<div class="col-md-6">
										<input type="text" class="form-control noRadius" id="editProfesionOficioEvMut" name="editProfesionOficioEvMut" disabled> 
									</div>
	                    	
                    		</div>
                    		<div class="col-md-8">
	                    			<div class="col-md-3">
										<label class="control-label">cargo</label>
									</div>
									<div class="col-md-5">
										<select class="form-control noRadius" id="editCargoEvMut" name="editCargoEvMut" disabled> </select>
									</div>
	                    		
                    		</div>
                    		<div class="col-md-4 hide">
	                    			<div class="col-md-6">
										<label class="control-label">Sexo</label>
									</div>
									<div class="col-md-6">
										<input type="text" class="form-control noRadius" id="editSexoEvMut" name="editSexoEvMut" disabled> 
									</div>
	                    		
                    		</div>
                    		
                    	</div>
                    
                    	<div class="row margin-bottom-5">
                    		<div class="col-md-4">                    			
	                    			<div class="col-md-6">
										<label class="control-label">Huerto </label>
									</div>
									<div class="col-md-6">
										<input type="text" class="form-control noRadius" id="editDivisionEvMut" name="editDivisionEvMut"  disabled> 
									</div>
                    		</div>
                    		<div class="col-md-8">
	                    			<div class="col-md-3">
										<label class="control-label">Zona</label>
									</div>
									<div class="col-md-5">
									<input type="text" class="form-control noRadius" id="editSubdivisionEvMut" name="editSubdivisionEvMut"  disabled> 
									</div>
                    		</div>
                    	</div>
                    	<div class="row margin-bottom-5">
                    		<div class="col-md-4">
                    			<div class="col-md-6">
										<label class="control-label">Fecha Contrato</label>
									</div>
									<div class="col-md-6">
										<input type="text" class="form-control noRadius" id="editAnosAntiguedadEvMut" name="editAnosAntiguedadEvMut" disabled> 
									</div>
                    		</div>
                    		<div class="col-md-8">
                    			<div class="col-md-2">
									<label class="control-label">Fecha Accidente</label>
								</div>
								<div class="col-md-4">
									<input type="date" class="form-control noRadius" id="editFechaAccidenteEvMut" name="editFechaAccidenteEvMut" required disabled> 
								</div>
								<div class="col-md-2">
									<label class="control-label">Fecha Hasta Accidente</label>
								</div>
								<div class="col-md-4">
									<input type="date" class="form-control noRadius" id="editFechaAccidenteEvMuthasta" name="editFechaAccidenteEvMuthasta" required disabled> 
								</div>
                    		</div>
                    		
                    	</div>
                    	</div>
                    	
                    	<div class="col-md-12 portlet light bordered" id="panelform">  
                    	<div class="row margin-bottom-5">
                    		
                    			<div class="col-md-2">
									<label class="control-label">Lugar de Trabajo</label>
								</div>
								<div class="col-md-4">
									<input type="text" class="form-control noRadius" id="editLugarTrabajoEvMut" name="editLugarTrabajoEvMut" > 
								</div>
								
								
                    			<div class="col-md-2">
									<label class="control-label">Hora Accidente</label>
								</div>
								<div class="col-md-4">
									<input type="time" class="form-control noRadius" id="editHoraAccidenteEvMut" name="editHoraAccidenteEvMut" required> 
								</div>
                    		
                    	
                    		
                    	</div>
                    	<h4 class="text-left"> Jefatura</h4>
                    	<div class="row margin-bottom-5">
                    		
                    			<div class="col-md-2">
									<label class="control-label">Nombres</label>
								</div>
								<div class="col-md-5">
									<input type="text" class="form-control noRadius" id="editNombreJefeEvMut" name="editNombreJefeEvMut" required> 
								</div>
                    	</div> 
                    	<div class="row margin-bottom-5">
                    		<div class="col-md-4 margin-bottom-5">
                    			<div class="col-md-6">
									<label class="control-label">Apellido Paterno</label>
								</div>
								<div class="col-md-6">
									<input type="text" class="form-control noRadius" id="editApPaternoJefeEvMut" name="editApPaternoJefeEvMut"  required> 
								</div>
                    		</div>
                    		<div class="col-md-4 margin-bottom-5">
                    			<div class="col-md-6">
									<label class="control-label">Apellido Materno</label>
								</div>
								<div class="col-md-6">
									<input type="text" class="form-control noRadius" id="editApMaternoJefeEvMut" name="editApPaternoJefeEvMut" required> 
								</div>
                    		</div>
                    		<div class="col-md-4 margin-bottom-5">
                    			<div class="col-md-6">
									<label class="control-label">Cargo</label>
								</div>
								<div class="col-md-6">
									<select class="form-control noRadius" id="editCargoJefeEvMut" name="editCargoJefeEvMut"  required> </select>
								</div>
                    		</div>
                    	</div>
                    	 
                    	<div class="row margin-bottom-5">
                    		
                    			
                    		
                    	
                    	</div>
                    	<h4 class="text-left">Descripción del accidente</h4>                	
	                    <div class="row margin-bottom-5">	
	                    	<div class="col-md-6">
	                    		<div class="col-md-4">
										<label class="control-label">Lugar Accidente </label>
									</div>
									<div class="col-md-6">
										<input type="text" class="form-control noRadius" id="editLugarAccidenteEvMut" name="editLugarAccidenteEvMut" required> 
									</div>
	                    	
	                    	</div>
	                    	<div class="col-md-6">
	                    		<div class="col-md-4">
										<label class="control-label">Actividad Realizada </label>
									</div>
									<div class="col-md-6">
										<input type="text" class="form-control noRadius" id="editActividadRealizadaEvMut" name="editActividadRealizadaEvMut" required> 
									</div>
	                    	
	                    	</div>
                    	</div>
                    	
                    	<div class="row margin-bottom-5">
                    		<div class="col-md-6">
                    			<div class="col-md-4">
									<label class="control-label">Causa Accidente </label>
								</div>
								<div class="col-md-6">
									<input type="text" class="form-control noRadius" id="editCausaAccidenteEvMut" name="editCausaAccidenteEvMut" required> 
								</div>
                    		</div>
                    		<div class="col-md-6">
                    			<div class="col-md-4">
									<label class="control-label">Consecuencia Accidente </label>
								</div>
								<div class="col-md-6">
									<input type="text" class="form-control noRadius" id="editConsecuenciaAccidenteEvMut" name="editConsecuenciaAccidenteEvMut" required> 
								</div>
                    		</div>
                    	</div>
                    	 	<h4 class="text-left">Apartado Mejoras</h4> 
                    	 <div class="row margin-bottom-5">
                    		<div class="col-md-6">
                    			<div class="col-md-4">
									<label class="control-label">Acción Mejora</label>
								</div>
								<div class="col-md-8">
									<input type="text" class="form-control noRadius" id="editAccionMejoraEvMut" name="editAccionMejoraEvMut" > 
								</div>
                    		</div>
                    		<div class="col-md-6">
                    			<div class="col-md-4">
									<label class="control-label">Responsable Mejora</label>
								</div>
								<div class="col-md-8">
									<input type="text" class="form-control noRadius" id="editResponsableMejoraEvMut" name="editResponsableMejoraEvMut" > 
								</div>
                    		</div>
                    		
                    	</div>
                    	<div class="row margin-bottom-5">
                    		<div class="col-md-6">
                    			<div class="col-md-4">
									<label class="control-label">Plazo Mejora</label>
								</div>
								<div class="col-md-8">
									<input type="date" class="form-control noRadius" id="editPlazoMejoraEvMut" name="editPlazoMejoraEvMut" > 
								</div>
                    		</div>
                    		<div class="col-md-4 margin-bottom-5">
                    			<div class="col-md-6">
									<label class="control-label">Estado</label>
								</div>
								<div class="col-md-6">
									<select class="form-control noRadius" id="EstadoTrab" name="EstadoTrab"  required> 
									<option value='1'>Estado 1</option>
									<option value='2'>Estado 2</option>
									<option value='3'>Estado 3</option>
									</select>
								</div>
                    		</div>
                    		
                    	</div>
                    	</div>
                    		
                    </div>
					
					<div class="form-actions right1">
						<button type="button" class="btn default" onclick="javascript:cerrarModalEdit()">Cancelar</button>
						<button type="submit" class="btn green" id="editSubmit">Grabar</button>
					</div>
				</div>
			</form>	
      </div>
    </div>
  </div>
</div> 
	
<div id="divCierre" class="col-xs-12 col-sm-12">
	<div class="table-responsive" id="ignore">
		<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_EvMut">
			<thead>  
			      <tr>        
					<th class="text-center">N°</th>
					<th class="text-center">Fecha</th>					
	                <th class="text-center">Rut</th>                
					<th class="text-center">Nombre</th>
					<th class="text-center">Ubicación</th>
					<th class="text-center">Actividad</th>
					<th class="text-center">Acciones</th>
                </tr>
			</thead>
			<tbody id="tblBodyEvMuts"></tbody>
		</table>
	</div>
	<div>
<!-- 		<div id="agregarDocumentoHref" style="float: right;"> -->
	         
<!-- 			<button id="addevMut" title="Agregar" class="btn btn-circle red btn-outline" data-toggle="modal" onclick="agregarOpenModal()"> -->
<!-- 				<i class="fa fa-plus"></i> Agregar -->
<!-- 			</button>	 -->
<!-- 		</div> -->
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
.modal-dialog {
    width: 1200px;
    margin: 30px auto;
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
.margin-bottom-5{
margin-bottom: 5px;
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
.icheck{
margin-left: 0.3em !important;
    font-size: 2em;
    height: 1em;
    padding-left: 1em;
}
.select2-close-mask{
    z-index: 12099;
}
.select2-dropdown{
    z-index: 13051;
}
span.select2.select2-container.select2-container--bootstrap.select2-container--below{
width:100% !important;
}
span.select2.select2-container{
width:100% !important;
}
.select2-container--open {
    z-index: auto !important;
}
</style>

