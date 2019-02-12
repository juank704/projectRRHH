<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>


<div class="modal fade" id="editarTurnoModal" tabindex="-1" role="dialog" aria-labelledby="editarTurnoLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content noRadius">
    
		<div class="modal-body">
        	<form class="form-horizontal form-fix noRadius noBorder" id="editTurnoForm" role="form">
				<div class="form-body">
						<div class="alert alert-danger display-hide text-left" id="editarTextoResponseFalseAlert">
                        	<button class="close" data-close="alert"></button>
                        	<p id="editarTextoResponseFalse">
                        	
                        	 </p>
                        </div>
                        <div class="alert alert-success display-hide" id="editarTextoResponseTrueAlert">
                            <button class="close" data-close="alert"></button>
                        	<p id="editarTextoResponseTrue">
                        	
                        	 </p>
                        </div>
							<input type="text" class="form-control noRadius hide" id="editarIdTurno" name="editarIdTurno" placeholder="id"> 
					<div class="form-group col-md-10">
						<label class="col-md-3 control-label">Nombre</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="editarNombreTurno" name="editarNombreTurno" required>
						</div>
					</div>	
                   	<div class="form-group col-md-10">
						<label class="col-md-3 control-label">Descripción</label>
						<div class="col-md-9">
							<textarea id="editarDescripcionTurno" name="editarDescripcionTurno" required>
							</textarea>
						</div>
					</div>	
					<div class="form-group col-md-10">
						<label class="col-md-3 control-label">Jornada</label>
						<div class="col-md-9">
							<select class="form-control noRadius" id="editarJornadaTurno" name="editarJornadaTurno" required></select>
						</div>
					</div>
					<div class="form-group col-md-10">
						<label class="col-md-3 control-label">Horas</label>
						<div class="col-md-9">
							<input type="number" class="form-control noRadius" id="editarHorasTurno" name="editarHorasTurno" min="0" step="any" value="0.0" required/>
						</div>
					</div>
					
					<div class="form-group">
						<table class="table table-bordered table-hover table-striped table-condensed">
							<thead>  
								<tr>
								
									<th class="text-center"></th>
									        
									<th class="text-center">Lunes</th>
									<th class="text-center">Martes</th>					
					                <th class="text-center">Miercoles</th>                
									<th class="text-center">Jueves</th>
									<th class="text-center">Viernes</th>
									<th class="text-center">Sabado</th>
									<th class="text-center">Domingo</th>
								</tr>
							</thead>
							<tbody>  
								<tr>
								
									<td class="text-center">Desde </td>
									<td class="text-center"><input type="time" class="form-control noRadius" id="editarLunesAI" name="editarLunesAI" value="00:00:00" onchange="check('AI',this);getSum('editar',this);valTH('editar')" required/></td>
									<td class="text-center"><input type="time" class="form-control noRadius" id="editarMartesAI" name="editarMartesAI" value="00:00:00" onchange="check('AI',this);getSum('editar',this);valTH('editar')" required/></td>					
					                <td class="text-center"><input type="time" class="form-control noRadius" id="editarMiercolesAI" name="editarMiercolesAI" value="00:00:00" onchange="check('AI',this);getSum('editar',this);valTH('editar')" required/></td>                
									<td class="text-center"><input type="time" class="form-control noRadius" id="editarJuevesAI" name="editarJuevesAI" value="00:00:00" onchange="check('AI',this);getSum('editar',this);valTH('editar')" required/></td>
									<td class="text-center"><input type="time" class="form-control noRadius" id="editarViernesAI" name="editarViernesAI" value="00:00:00" onchange="check('AI',this);getSum('editar',this);valTH('editar')" required/></td>
									<td class="text-center"><input type="time" class="form-control noRadius" id="editarSabadoAI" name="editarSabadoAI" value="00:00:00" onchange="check('AI',this);getSum('editar',this);valTH('editar')" required/></td>
									<td class="text-center"><input type="time" class="form-control noRadius" id="editarDomingoAI" name="editarDomingoAI" value="00:00:00" onchange="check('AI',this);getSum('editar',this);valTH('editar')" required/></td>
								</tr>
								<tr>
								
									<td class="text-center">Hasta</td>
									        
									<td class="text-center"><input type="time" class="form-control noRadius" id="editarLunesAF" name="editarLunesAF" value="00:00:00" onchange="check('AF',this);getSum('editar',this);valTH('editar')" required/></td>
									<td class="text-center"><input type="time" class="form-control noRadius" id="editarMartesAF" name="editarMartesAF" value="00:00:00" onchange="check('AF',this);getSum('editar',this);valTH('editar')" required/></td>					
					                <td class="text-center"><input type="time" class="form-control noRadius" id="editarMiercolesAF" name="editarMiercolesAF" value="00:00:00" onchange="check('AF',this);getSum('editar',this);valTH('editar')" required/></td>                
									<td class="text-center"><input type="time" class="form-control noRadius" id="editarJuevesAF" name="editarJuevesAF" value="00:00:00" onchange="check('AF',this);getSum('editar',this);valTH('editar')" required/></td>
									<td class="text-center"><input type="time" class="form-control noRadius" id="editarViernesAF" name="editarViernesAF" value="00:00:00" onchange="check('AF',this);getSum('editar',this);valTH('editar')" required/></td>
									<td class="text-center"><input type="time" class="form-control noRadius" id="editarSabadoAF" name="editarSabadoAF" value="00:00:00" onchange="check('AF',this);getSum('editar',this);valTH('editar')" required/></td>
									<td class="text-center"><input type="time" class="form-control noRadius" id="editarDomingoAF" name="editarDomingoAF" value="00:00:00" onchange="check('AF',this);getSum('editar',this);valTH('editar')" required/></td>
								</tr>
									</table>
										<h4 class="text-center">Horario PM</h4>
										<table class="table table-bordered table-hover table-striped table-condensed">	
								<tr>   
									<td class="text-center">Desde</td>     
									<td class="text-center"><input type="time" class="form-control noRadius" id="editarLunesPI" name="editarLunesPI" value="00:00:00" onchange="check('PI',this);getSum('editar',this);valTH('editar')" required/></td>
									<td class="text-center"><input type="time" class="form-control noRadius" id="editarMartesPI" name="editarMartesPI" value="00:00:00" onchange="check('PI',this);getSum('editar',this);valTH('editar')" required/></td>					
					                <td class="text-center"><input type="time" class="form-control noRadius" id="editarMiercolesPI" name="editarMiercolesPI" value="00:00:00" onchange="check('PI',this);getSum('editar',this);valTH('editar')" required/></td>                
									<td class="text-center"><input type="time" class="form-control noRadius" id="editarJuevesPI" name="editarJuevesPI" value="00:00:00" onchange="check('PI',this);getSum('editar',this);valTH('editar')" required/></td>
									<td class="text-center"><input type="time" class="form-control noRadius" id="editarViernesPI" name="editarViernesPI" value="00:00:00" onchange="check('PI',this);getSum('editar',this);valTH('editar')" required/></td>
									<td class="text-center"><input type="time" class="form-control noRadius" id="editarSabadoPI" name="editarSabadoPI" value="00:00:00" onchange="check('PI',this);getSum('editar',this);valTH('editar')" required/></td>
									<td class="text-center"><input type="time" class="form-control noRadius" id="editarDomingoPI" name="editarDomingoPI" value="00:00" onchange="check('PI',this);getSum('editar',this);valTH('editar')" required/></td>
								</tr>
								
								<tr>
									<td class="text-center">Hasta</td>        
									<td class="text-center"><input type="time" class="form-control noRadius" id="editarLunesPF" name="editarLunesPF" value="00:00" onchange="check('PF',this);getSum('editar',this);valTH('editar')" required/></td>
									<td class="text-center"><input type="time" class="form-control noRadius" id="editarMartesPF" name="editarMartesPF" value="00:00" onchange="check('PF',this);getSum('editar',this);valTH('editar')" required/></td>					
					                <td class="text-center"><input type="time" class="form-control noRadius" id="editarMiercolesPF" name="editarMiercolesPF" value="00:00" onchange="check('PF',this);getSum('editar',this);valTH('editar')" required/></td>                
									<td class="text-center"><input type="time" class="form-control noRadius" id="editarJuevesPF" name="editarJuevesPF" value="00:00" onchange="check('PF',this);getSum('editar',this);valTH('editar')" required/></td>
									<td class="text-center"><input type="time" class="form-control noRadius" id="editarViernesPF" name="editarViernesPF" value="00:00" onchange="check('PF',this);getSum('editar',this);valTH('editar')" required/></td>
									<td class="text-center"><input type="time" class="form-control noRadius" id="editarSabadoPF" name="editarSabadoPF" value="00:00" onchange="check('PF',this);getSum('editar',this);valTH('editar')" required/></td>
									<td class="text-center"><input type="time" class="form-control noRadius" id="editarDomingoPF" name="editarDomingoPF" value="00:00" onchange="check('PF',this);getSum('editar',this);valTH('editar')" required/></td>
								</tr>
								<tr>
									<td class="text-center">Total Horas</td>        
									<td class="text-center"><input type="number" class="form-control noRadius" id="editarLunesTurno" name="editarLunesTurno" value="0.0" disabled/></td>
									<td class="text-center"><input type="number" class="form-control noRadius" id="editarMartesTurno" name="editarMartesTurno" value="0.0" disabled/></td>					
					                <td class="text-center"><input type="number" class="form-control noRadius" id="editarMiercolesTurno" name="editarMiercolesTurno" value="0.0" disabled/></td>                
									<td class="text-center"><input type="number" class="form-control noRadius" id="editarJuevesTurno" name="editarJuevesTurno" value="0.0" disabled/></td>
									<td class="text-center"><input type="number" class="form-control noRadius" id="editarViernesTurno" name="editarViernesTurno" value="0.0" disabled/></td>
									<td class="text-center"><input type="number" class="form-control noRadius" id="editarSabadoTurno" name="editarSabadoTurno" value="0.0" disabled/></td>
									<td class="text-center"><input type="number" class="form-control noRadius" id="editarDomingoTurno" name="editarDomingoTurno" value="0.0" disabled/></td>
								</tr>
						</table>
					</div>	
					<div class="form-actions right1">
						<button type="button" class="btn default" data-dismiss="modal">Cancelar</button>
						<button type="submit" class="btn green" id="submitEditTurno">Editar Turno</button>
					</div>
				</div>
			</form>	
      </div>
	  
    </div>
  </div>
</div> 

<div class="modal fade" id="agregarTurnoModal" tabindex="-1" role="dialog" aria-labelledby="agregarTurnoModal" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
    <h3 class="modal-title title-padding" id="agregarTurnoLabel">Agregar Nueva Turno</h3>
		<div class="modal-body padding-top-5">
        	<form class="form-horizontal form-fix noRadius noBorder"  id="insertTurnoForm" role="form">
				<div class="form-body">
					<div class="alert alert-danger display-hide text-left" id="agregarTextoResponseFalseAlert">
                        	<button class="close" data-close="alert"></button>
                        	<p id="agregarTextoResponseFalse">
                        	
                        	 </p>
                        </div>
                        <div class="alert alert-success display-hide" id="agregarTextoResponseTrueAlert">
                            <button class="close" data-close="alert"></button>
                        	<p id="agregarTextoResponseTrue">
                        	
                        	 </p>
                        </div>
					<div class="form-group col-md-10">
						<label class="col-md-3 control-label">Nombre</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="agregarNombreTurno" name="agregarNombreTurno" required>
						</div>
					</div>	
                   	<div class="form-group col-md-10">
						<label class="col-md-3 control-label">Descripción</label>
						<div class="col-md-9">
							<textarea id="agregarDescripcionTurno" name="agregarDescripcionTurno" required>
							</textarea>
						</div>
					</div>	
					<div class="form-group col-md-10">
						<label class="col-md-3 control-label">Jornada</label>
						<div class="col-md-9">
							<select class="form-control noRadius" id="agregarJornadaTurno" name="agregarJornadaTurno" required></select>
						</div>
					</div>
					<div class="form-group col-md-10">
						<label class="col-md-3 control-label">Horas</label>
						<div class="col-md-9">
							<input type="number" class="form-control noRadius" id="agregarHorasTurno" name="agregarHorasTurno" min="0" step="any" value="0.0" required/>
						</div>
					</div>
					
					<div class="form-group">
						<table class="table table-bordered table-hover table-striped table-condensed">
							<thead>  
								<tr>
								
									<th class="text-center"></th>
									        
									<th class="text-center">Lunes</th>
									<th class="text-center">Martes</th>					
					                <th class="text-center">Miercoles</th>                
									<th class="text-center">Jueves</th>
									<th class="text-center">Viernes</th>
									<th class="text-center">Sabado</th>
									<th class="text-center">Domingo</th>
								</tr>
							</thead>
							<tbody>  
								<tr>
								
									<td class="text-center">Desde </td>
									<td class="text-center"><input type="time" class="form-control noRadius" id="agregarLunesAI" name="agregarLunesAI" value="00:00:00" onchange="check('AI',this);getSum('agregar',this);valTH('agregar')" required/></td>
									<td class="text-center"><input type="time" class="form-control noRadius" id="agregarMartesAI" name="agregarMartesAI" value="00:00:00" onchange="check('AI',this);getSum('agregar',this);valTH('agregar')" required/></td>					
					                <td class="text-center"><input type="time" class="form-control noRadius" id="agregarMiercolesAI" name="agregarMiercolesAI" value="00:00:00" onchange="check('AI',this);getSum('agregar',this);valTH('agregar')" required/></td>                
									<td class="text-center"><input type="time" class="form-control noRadius" id="agregarJuevesAI" name="agregarJuevesAI" value="00:00:00" onchange="check('AI',this);getSum('agregar',this);valTH('agregar')" required/></td>
									<td class="text-center"><input type="time" class="form-control noRadius" id="agregarViernesAI" name="agregarViernesAI" value="00:00:00" onchange="check('AI',this);getSum('agregar',this);valTH('agregar')" required/></td>
									<td class="text-center"><input type="time" class="form-control noRadius" id="agregarSabadoAI" name="agregarSabadoAI" value="00:00:00" onchange="check('AI',this);getSum('agregar',this);valTH('agregar')" required/></td>
									<td class="text-center"><input type="time" class="form-control noRadius" id="agregarDomingoAI" name="agregarDomingoAI" value="00:00:00" onchange="check('AI',this);getSum('agregar',this);valTH('agregar')" required/></td>
								</tr>
								<tr>
								
									<td class="text-center">Hasta</td>
									        
									<td class="text-center"><input type="time" class="form-control noRadius" id="agregarLunesAF" name="agregarLunesAF" value="00:00:00" onchange="check('AF',this);getSum('agregar',this);valTH('agregar')" required/></td>
									<td class="text-center"><input type="time" class="form-control noRadius" id="agregarMartesAF" name="agregarMartesAF" value="00:00:00" onchange="check('AF',this);getSum('agregar',this);valTH('agregar')" required/></td>					
					                <td class="text-center"><input type="time" class="form-control noRadius" id="agregarMiercolesAF" name="agregarMiercolesAF" value="00:00:00" onchange="check('AF',this);getSum('agregar',this);valTH('agregar')" required/></td>                
									<td class="text-center"><input type="time" class="form-control noRadius" id="agregarJuevesAF" name="agregarJuevesAF" value="00:00:00" onchange="check('AF',this);getSum('agregar',this);valTH('agregar')" required/></td>
									<td class="text-center"><input type="time" class="form-control noRadius" id="agregarViernesAF" name="agregarViernesAF" value="00:00:00" onchange="check('AF',this);getSum('agregar',this);valTH('agregar')" required/></td>
									<td class="text-center"><input type="time" class="form-control noRadius" id="agregarSabadoAF" name="agregarSabadoAF" value="00:00:00" onchange="check('AF',this);getSum('agregar',this);valTH('agregar')" required/></td>
									<td class="text-center"><input type="time" class="form-control noRadius" id="agregarDomingoAF" name="agregarDomingoAF" value="00:00:00" onchange="check('AF',this);getSum('agregar',this);valTH('agregar')" required/></td>
								</tr>
							</table>
							<h4 class="text-center">Horario PM</h4>
							<table class="table table-bordered table-hover table-striped table-condensed">		
								<tr>   
									<td class="text-center">Desde</td>     
									<td class="text-center"><input type="time" class="form-control noRadius" id="agregarLunesPI" name="agregarLunesPI" value="00:00:00" onchange="check('PI',this);getSum('agregar',this);valTH('agregar')" required/></td>
									<td class="text-center"><input type="time" class="form-control noRadius" id="agregarMartesPI" name="agregarMartesPI" value="00:00:00" onchange="check('PI',this);getSum('agregar',this);valTH('agregar')" required/></td>					
					                <td class="text-center"><input type="time" class="form-control noRadius" id="agregarMiercolesPI" name="agregarMiercolesPI" value="00:00:00" onchange="check('PI',this);getSum('agregar',this);valTH('agregar')" required/></td>                
									<td class="text-center"><input type="time" class="form-control noRadius" id="agregarJuevesPI" name="agregarJuevesPI" value="00:00:00" onchange="check('PI',this);getSum('agregar',this);valTH('agregar')" required/></td>
									<td class="text-center"><input type="time" class="form-control noRadius" id="agregarViernesPI" name="agregarViernesPI" value="00:00:00" onchange="check('PI',this);getSum('agregar',this);valTH('agregar')" required/></td>
									<td class="text-center"><input type="time" class="form-control noRadius" id="agregarSabadoPI" name="agregarSabadoPI" value="00:00:00" onchange="check('PI',this);getSum('agregar',this);valTH('agregar')" required/></td>
									<td class="text-center"><input type="time" class="form-control noRadius" id="agregarDomingoPI" name="agregarDomingoPI" value="00:00" onchange="check('PI',this);getSum('agregar',this);valTH('agregar')" required/></td>
								</tr>
								<tr>
									<td class="text-center">Hasta</td>        
									<td class="text-center"><input type="time" class="form-control noRadius" id="agregarLunesPF" name="agregarLunesPF" value="00:00" onchange="check('PF',this);getSum('agregar',this);valTH('agregar')" required/></td>
									<td class="text-center"><input type="time" class="form-control noRadius" id="agregarMartesPF" name="agregarMartesPF" value="00:00" onchange="check('PF',this);getSum('agregar',this);valTH('agregar')" required/></td>					
					                <td class="text-center"><input type="time" class="form-control noRadius" id="agregarMiercolesPF" name="agregarMiercolesPF" value="00:00" onchange="check('PF',this);getSum('agregar',this);valTH('agregar')" required/></td>                
									<td class="text-center"><input type="time" class="form-control noRadius" id="agregarJuevesPF" name="agregarJuevesPF" value="00:00" onchange="check('PF',this);getSum('agregar',this);valTH('agregar')" required/></td>
									<td class="text-center"><input type="time" class="form-control noRadius" id="agregarViernesPF" name="agregarViernesPF" value="00:00" onchange="check('PF',this);getSum('agregar',this);valTH('agregar')" required/></td>
									<td class="text-center"><input type="time" class="form-control noRadius" id="agregarSabadoPF" name="agregarSabadoPF" value="00:00" onchange="check('PF',this);getSum('agregar',this);valTH('agregar')" required/></td>
									<td class="text-center"><input type="time" class="form-control noRadius" id="agregarDomingoPF" name="agregarDomingoPF" value="00:00" onchange="check('PF',this);getSum('agregar',this);valTH('agregar')" required/></td>
								</tr>
								<tr>
									<td class="text-center">Total Horas</td>        
									<td class="text-center"><input type="number" class="form-control noRadius" id="agregarLunesTurno" name="agregarLunesTurno" value="0.0" disabled/></td>
									<td class="text-center"><input type="number" class="form-control noRadius" id="agregarMartesTurno" name="agregarMartesTurno" value="0.0" disabled/></td>					
					                <td class="text-center"><input type="number" class="form-control noRadius" id="agregarMiercolesTurno" name="agregarMiercolesTurno" value="0.0" disabled/></td>                
									<td class="text-center"><input type="number" class="form-control noRadius" id="agregarJuevesTurno" name="agregarJuevesTurno" value="0.0" disabled/></td>
									<td class="text-center"><input type="number" class="form-control noRadius" id="agregarViernesTurno" name="agregarViernesTurno" value="0.0" disabled/></td>
									<td class="text-center"><input type="number" class="form-control noRadius" id="agregarSabadoTurno" name="agregarSabadoTurno" value="0.0" disabled/></td>
									<td class="text-center"><input type="number" class="form-control noRadius" id="agregarDomingoTurno" name="agregarDomingoTurno" value="0.0" disabled/></td>
								</tr>
						</table>
					</div>	
					<div class="form-actions right1">
						<button type="button" class="btn default" onclick="javascript:cerrarModalAgregar()">Cancelar</button>
						<button type="submit" class="btn green" id="agregarSubmit">Agregar Turno</button>
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
		<div class="alert alert-danger display-hide text-left" id="Twa">
         	<button class="close" data-close="alert"></button>
         	<p id="textoTwa">
         		
         	 </p>
         </div>
		<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Turno">
			<thead>  
			      <tr>        
					<th class="text-center">N°</th>
					<th class="text-center">Nombre </th>					
	                <th class="text-center">Descripción</th>                
					<th class="text-center">Jornada</th>
					<th class="text-center">Horas</th>
					
					<th class="text-center">editar /eliminar</th>
                </tr>
			</thead>
			
			<tbody id="tblBodyTurnos"></tbody>

		</table>
	</div>
	<div>
		
		
		<div id="agregarDocumentoHref" style="float: right;">
	         
			<button id="addTurno" title="Agregar" class="btn btn-circle red btn-outline" data-toggle="modal" onclick="javascript:agregarTurno()">
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
#selectorPeriodo
{
text-align:right;
margin-bottom:30px;
padding-bottom: 1.3em;
}
#tbl_Turno_filter
{
display:none !important;

}
.swal2-popup.swal2-modal.animated.bounceIn.swal2-noanimation {

}
.swal2-container.swal2-shown {
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 99999 !important;
}
textarea {
  resize: none;
  width:100%
}
.modal-dialog
{
width: 900px !important;
}



</style>

