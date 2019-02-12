<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<div class="col-md-12" style="margin-top: 10px;">
	<div class="col-md-1 ">
		<label style="color: #337ab7;">Empresa:</label>
	</div>
	<div class="col-md-4 ">
		<select id="Sociedad" class=" form-control btn-circle btn-sm mayusculasWork" >
			<option value="">Seleccione una Empresa</option>
		</select>
	</div>
</div>

<div class="col-md-12 portlet light bordered" id="todo" style="margin-top: 10px;">
	<div class="col-md-12 ">
	   <div class="col-md-1">
	      <label style="color: #337ab7;">Huerto: </label>
	   </div>
	   <div class="col-md-3">
	      <select id="tipodivisionB" class=" form-control btn-circle btn-sm mayusculasWork" >
	         <option value="">Seleccione Huerto</option>
	      </select>
	   </div>
	   <div class="col-md-1">
	      <label style="color: #337ab7;">Zona: </label>
	   </div>
	   <div class="col-md-3">
	      <select id="tiposubdivisionB" class=" form-control btn-circle btn-sm mayusculasWork" >
	         <option value="">Seleccione ZONA</option>
	      </select>
	   </div>
	   <div class="col-md-1">
	      <label style="color: #337ab7;">CECO: </label>
	   </div>
	   <div class="col-md-3">
	      <select id="listagrupoB" class=" form-control btn-circle btn-sm mayusculasWork">
	         <option value="">Seleccione CECO</option>
	      </select>
	   </div>
	</div>	
	
	<div  style="margin-top: 45px;"></div>
	
	<div class="col-md-12 ">
	    <div class="col-md-1 ">
	        <label style="color: #337ab7;">Fecha Contrato:</label>
	    </div>
	    <div class="col-md-3">
	        <select autocomplete="off" id="idContrato" class=" form-control btn-circle btn-sm mayusculasWork" disabled></select>
	    </div>
	    <div class="col-md-1 ">
	        <label style="color: #337ab7;">Código Trabajador:</label>
	    </div>
	    <div class="col-md-7">
	        <select id="CodigoTra" class="form-control input-sm input-circle mayusculasWork ">
	
	        </select>
	    </div>
	</div>
	
	<br>
	<div class="col-md-12 portlet light bordered" id="todo" style="display:none">
     <div id='detalletrab' style="margin-top: 25px;"></div>
     </div>
</div>

<div class="col-md-12 portlet light bordered">
<div class="col-md-12 portlet light bordered">
	<div class="col-md-12 ">
		<div class="col-md-2">
			<label style="color: #337ab7;">Acción </label>
		</div>
		<div class="col-md-4">
			<select id="accion" class=" form-control btn-circle btn-sm mayusculasWork">
				<option value=''>Seleccione..</option>
				<option value='1'>Permiso con Goce de Sueldo</option>
				<option value='4'>Permiso Sin Goce de Sueldo</option>
				<option value='2'>Licencia</option>
				<option value='3'>Falta</option>
				
				
			</select>
		</div>
		<div class="col-md-5"></div>
		<div class="col-md-1">
		
		</div>
		
		
		
	</div>
</div>

<div id="divlicencia" style="display:none" >

	<div class="col-md-12 ">
		<div class="col-md-2">
			<label style="color: #337ab7;">Tipo Licencia </label>
		</div>
		<div class="col-md-2 ">
			<select id="tipolicencia" class=" form-control btn-circle btn-sm mayusculasWork">
						<option value=''>Seleccione..</option>		
			</select>
		</div>
    <div class="col-md-2 ">
			<label id="labelsubtipo" style="color: #337ab7;">Sub Tipo Licencia: </label>
		</div>
		<div class="col-md-2">
			<select id="subtipolicencia" class=" form-control btn-circle btn-sm mayusculasWork">
						<option value=''>Seleccione..</option>			
			</select>
		</div>
	</div>
	
<div class="col-md-12 " style="margin-top: 15px;">	
			<div class="col-md-2">
			<label style="color: #337ab7;">Tipo de reposo </label>
		</div>
		<div class="col-md-2 ">
			<select id="TipoR" class=" form-control btn-circle btn-sm mayusculasWork">
						<option value=''>Seleccione..</option>		
			</select>
		</div>
	
	
				<div class="col-md-2">
			<label id="labelParcial" style="color: #337ab7;">Parcial: </label>
		</div>
		<div class="col-md-2 ">
			<select id="parcial" class=" form-control btn-circle btn-sm mayusculasWork" >
							
			</select>
		</div>
	</div>
	
	
	

	<div class="col-md-12 " style="margin-top: 15px;">
	    		<div class="col-md-2 ">
			<label style="color: #337ab7;">Fecha Inicio: </label>
			
		</div>
		<div class="col-md-2">
			<input  autocomplete="off" type="text" id="fechaInicio" class="form-control input-circle mayusculasWork" placeholder="Seleccione una Fecha"></input>
		</div>
		<div class="col-md-2 ">
			<label style="color: #337ab7;">Fecha Fin:</label>
		</div>
		<div class="col-md-2 ">
			<input autocomplete="off" type="text" id="fechaFin" class="form-control input-circle mayusculasWork" placeholder="Seleccione una Fecha">
		</div>
		<div class="col-md-2">
			<label style="color: #337ab7;">Días Corridos: </label>
		</div>
		<div class="col-md-2 ">
			<input id="diascorridosL" type="number" name="ReAct"  class="form-control input-circle" >
		</div>

	
	</div>
	<div class="col-md-12 " style="margin-top: 15px;">
		<div class="col-md-2">
			<label style="color: #337ab7;">Nombre Doctor </label>
		</div>
		<div class="col-md-2 ">
			<input id="nombredoctor" type="text" name="nombredoctor"  class="form-control input-circle" > 
		</div>
		<div class="col-md-2">
			<label style="color: #337ab7;">Especialidad</label>
		</div>
		<div class="col-md-2 ">
			<input id="especialidad" type="text" name="especialidad"  class="form-control input-circle" > 
		</div>
		<div class="col-md-1">
			<label style="color: #337ab7;">Incluye Feriados: </label>
		</div>
		<div class="col-md-1 ">
			<input type='checkbox' id='checkLicencia' value='' style='-ms-transform: scale(1.5);-moz-transform: scale(1.5);-webkit-transform: scale(1.5);-o-transform: scale(1.5);'>
		</div>
		
		
		
	
	</div>
		<div class="col-md-12 " style="margin-top: 15px;">
		<div class="col-md-8">
		<a id="1" class="btn btn-circle red btn-outline" onclick="javascript: addForm1();"><i class="fa fa-floppy-o fa-lg"> Grabar</i>
				</a>
		</div>
			<div class="col-md-2">
			 <label style="color: #337ab7;">Documento: </label>
		</div>
			<div class="col-md-2">
			<label for="7" title="Subir Archivo" class="btn btn-circle green btn-outline"> <i
				class="fa fa-upload"></i>Subir Archivo
			</label><br> <input id="7"  type="file" accept="application/pdf" >


		</div>
	</div>
   </div>
   <div id="divpermiso" style="display:none">

	<div style="margin-top: 130px"></div>
	
	<div class="col-md-12 ">
		
		<div class="col-md-2 ">
		   
			<label style="color: #337ab7;margin-left: -1px;"><input type="checkbox" id="checkPlegales" value="" style="-ms-transform: scale(1.5);-moz-transform: scale(1.5);-webkit-transform: scale(1.5);-o-transform: scale(1.5);">   Permisos Legales:</label>
		</div>
		<div class="col-md-2 ">
			<select id="permisolegales" class=" form-control btn-circle btn-sm mayusculasWork" disabled>
					<option value="">Seleccione..</option>
			</select>
		</div>
		<div class="col-md-2 ">
		   
			<label style="color: #337ab7; margin-left: 3px;"> <input type="checkbox" id="checkPconvenc" value="" style="-ms-transform: scale(1.5);-moz-transform: scale(1.5);-webkit-transform: scale(1.5);-o-transform: scale(1.5);">   Permisos convencionales:</label>
		</div>
		<div class="col-md-2 ">
			<select id="permisoConven" class=" form-control btn-circle btn-sm mayusculasWork" disabled>
					<option value="">Seleccione..</option>
			</select>
		</div>
	</div>
	
	<div class="col-md-12 ">
		<div class="col-md-2 ">
			<label style="color: #337ab7;">Fecha Inicio: </label>
		</div>
		<div class="col-md-2">
			<input autocomplete="off" type="text" id="fechaInicioP" class="form-control input-circle mayusculasWork" placeholder="Seleccione una Fecha"></input>
		</div>
		<div class="col-md-2 ">
			<label style="color: #337ab7;">Fecha Fin:</label>
		</div>
		<div class="col-md-2 ">
			<input autocomplete="off" type="text" id="fechaFinP" class="form-control input-circle mayusculasWork" placeholder="Seleccione una Fecha">
		</div>
		<div class="col-md-2">
			 <label style="color: #337ab7;">Documento: </label>
		</div>
		<div class="col-md-2">
			<label for="7" title="Subir Archivo" 
				class="btn btn-circle green btn-outline"> <i
				class="fa fa-upload"></i>Subir Archivo
			</label><br> <input id="8"  type="file"
				accept="application/pdf">
		</div>
	</div>
	<div class="col-md-12 ">
		<div class="col-md-12 " style="margin-top: 15px;"></div>
        <div class="col-md-2">
			<label style="color: #337ab7;">Días Habiles: </label>
		</div>
		<div class="col-md-2 ">
			<input id="diascorridosP" type="number" name="ReAct"  class="form-control input-circle" >
		</div>
		
	
		
		
		<div class="col-md-2 ">
			<button class="btn blue" id="btnChange" onclick="changeBaseBtn()">
				<i class="fa fa-pencil-square-o" aria-hidden="true"></i>
			</button>
		</div>
	</div>

	
	<div class="col-md-12 " style="margin-top: 15px;">
		<a id="1" class="btn btn-circle red btn-outline" onclick="javascript: addForm2();"><i class="fa fa-floppy-o fa-lg"> Grabar</i>
				</a>
	</div>
   </div>
   
   <div id="divpermisoSinGoce" style="display:none">
		<div style="margin-top: 130px"></div>
			<div class="col-md-12 ">
	    		<div class="col-md-2 ">
					<label style="color: #337ab7;">Fecha Inicio: </label>
				</div>
				<div class="col-md-2">
					<input autocomplete="off" type="text" id="fechaInicioPSG" class="form-control input-circle mayusculasWork" placeholder="Seleccione una Fecha"></input>
				</div>
				<div class="col-md-2 ">
					<label style="color: #337ab7;">Fecha Fin:</label>
				</div>
				<div class="col-md-2 ">
					<input autocomplete="off" type="text" id="fechaFinPSG" class="form-control input-circle mayusculasWork" placeholder="Seleccione una Fecha">
				</div>	
				<div class="col-md-2">
					 <label style="color: #337ab7;">Documento: </label>
				</div>
				<div class="col-md-2">
					<label for="7" title="Subir Archivo" 
						class="btn btn-circle green btn-outline"> <i
						class="fa fa-upload"></i>Subir Archivo
					</label><br> <input id="9"  type="file"
						accept="application/pdf">
				</div>
			</div>

			<div class="col-md-12 " style="margin-top: 15px;">
				<div class="col-md-2">
					<label style="color: #337ab7;">Días Corridos: </label>
				</div>
				<div class="col-md-2 ">
					<input id="diascorridosPSG" type="number" name="ReAct"  class="form-control input-circle" >
				</div>
				<div class="col-md-2">
					<label style="color: #337ab7;">Incluye Feriados: </label>
				</div>
				<div class="col-md-2 ">
					<input type='checkbox' id='checkPermisoSG' value='' style='-ms-transform: scale(1.5);-moz-transform: scale(1.5);-webkit-transform: scale(1.5);-o-transform: scale(1.5);'>
				</div>
			</div><!-- end col-md-12 -->
			
	<div class="col-md-12 " style="margin-top: 15px;">
		<a id="1" class="btn btn-circle red btn-outline" onclick="javascript: addForm4();"><i class="fa fa-floppy-o fa-lg"> Grabar</i>
				</a>
	</div>
   </div>
   
   <div id="divlicenciaMutual" style="display:none">

	<div style="margin-top: 130px"></div>



	<div class="col-md-12 ">
	    		<div class="col-md-2 ">
			<label style="color: #337ab7;">Fecha Inicio: </label>
			
		</div>
		<div class="col-md-2">
			<input autocomplete="off" type="text" id="fechaInicioLM" class="form-control input-circle mayusculasWork" placeholder="Seleccione una Fecha">
		</div>
		<div class="col-md-2 ">
			<label style="color: #337ab7;">Fecha Fin:</label>
		</div>
		<div class="col-md-2 ">
			<input autocomplete="off" type="text" id="fechaFinLM" class="form-control input-circle mayusculasWork" placeholder="Seleccione una Fecha">
		</div>
		<div class="col-md-2">
<!-- 			<label style="color: #337ab7;">Horas de Inasistencia: </label> -->
		</div>
		<div class="col-md-2 ">
<!-- 			<input id="HoraInasistenciaLM" type="number" name="ReAct"  class="form-control input-circle" > -->
		</div>
	
	</div>

		<div class="col-md-12 " style="margin-top: 15px;">
	<div class="col-md-2">
			<label style="color: #337ab7;">Días Corridos: </label>
		</div>
		<div class="col-md-2 ">
			<input id="diascorridosLM" type="number" name="ReAct"  class="form-control input-circle" >
		</div>
		<div class="col-md-2">
			<label style="color: #337ab7;">Incluye Feriados: </label>
		</div>
		<div class="col-md-2 ">
			<input type='checkbox' id='checkLicenciaMutual' value='' style='-ms-transform: scale(1.5);-moz-transform: scale(1.5);-webkit-transform: scale(1.5);-o-transform: scale(1.5);'>
		</div>
		

	
	</div>
	<div class="col-md-12 " style="margin-top: 15px;">
		<a id="1" class="btn btn-circle red btn-outline" onclick="javascript: addForm3();"><i class="fa fa-floppy-o fa-lg"> Grabar</i>
				</a>
	</div>
   </div>
	

</div>

   <div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered" id="tablaLicencia" style="display:none">
	<p>Licencia</p>
		<div style="height: 50px;"></div>
		<div class="table-responsive" id="ignore">
			<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Info2">
				<thead>
					<tr>
						<th>Cod. trabajador</th>
						<th>Tipo de<br>Licencia</th>
						<th>Subtipo<br>Licencia</th>
						<th>Reposo Parcial</th>
						<th>Incluye<br>feriados</th>
						<th>Fecha Desde</th>
						<th>Fecha Hasta</th>
						<th>Horas<br>Inasistencia</th>
						<th>Dias<br>Corridos</th>
						<th>Opciones</th>
						
					</tr>
				</thead>
				<tbody id="tableLic"></tbody>
			</table>
		</div>
		<br>	
</div>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered" id="tablaPermiso" style="display:none">
<p>Permiso</p>	
		<div style="height: 50px;"></div>
		<div class="table-responsive" id="ignore">
			<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Info">
				<thead>
					<tr>
						<th>Cod. trabajador</th>
						<th>Fecha Desde</th>
						<th>Fecha Hasta</th>
						<th>Horas<br>Inasistencia</th>
						<th>Dias<br>Corridos</th>
						<th>Opciones</th>
						
					</tr>
				</thead>
				<tbody id="tablePer"></tbody>
			</table>
		</div>
		<br>	
</div>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered" id="tablaPermisoSG" style="display:none">
<p>Permiso Sin Goce</p>	
		<div style="height: 50px;"></div>
		<div class="table-responsive" id="ignore">
			<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Info3">
				<thead>
					<tr>
						<th>Cod. trabajador</th>
						<th>Incluye<br>feriados</th>
						<th>Fecha Desde</th>
						<th>Fecha Hasta</th>
						<th>Horas<br>Inasistencia</th>
						<th>Dias<br>Corridos</th>
						<th>Opciones</th>
						
					</tr>
				</thead>
				<tbody id="tablePerSG"></tbody>
			</table>
		</div>
		<br>	
</div>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered" id="tablaLicenciaMutual" style="display:none">
<p>Falta</p>	
		<div style="height: 50px;"></div>
		<div class="table-responsive" id="ignore">
			<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Info4">
				<thead>
					<tr>
						<th>Cod. trabajador</th>
						<th>Incluye<br>feriados</th>
						<th>Fecha Desde</th>
						<th>Fecha Hasta</th>
						<th>Horas<br>Inasistencia</th>
						<th>Dias<br>Corridos</th>
						<th>Opciones</th>
						
						
					</tr>
				</thead>
				<tbody id="tableLM"></tbody>
			</table>
		</div>
		<br>	
</div>
<p style="color:white">.</p>
<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>
 <style>
        .Holidays a{
            background-color: gray !important; 
        }
        .nonbusiness a{
            background-color: red !important;
            color: white !important; 
        }
        .ui-datepicker-week-end a {
            background-color: green;
             color: white; 
        }
</style>