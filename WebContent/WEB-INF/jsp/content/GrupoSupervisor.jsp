<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div class="modal fade" id="agregarTurnoGrupoModal" tabindex="-1" role="dialog" aria-labelledby="agregarTurnoGrupoModal" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
    <h3 class="modal-title title-padding" id="agregarSupervisorLabel">Agregar Turno</h3>
		<div class="modal-body padding-top-5">
        	<form class="form-horizontal form-fix noRadius noBorder"  id="agregarTurnoGrupoForm" role="form">
				<div class="form-body">
					
					<div class="form-group">
						<label class="col-md-3 control-label">Nombre Turno</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="agregarNombreTurnoGrupo" name="agregarNombreTurnoGrupo" placeholder="Nombre Turno" required> 
						</div>
					</div>
					<div class="form-actions right1">
						<button type="button" class="btn default" onclick="javascript:cerrarAgregar()">Cancelar</button>
						<button type="submit" class="btn green" id="agregarSubmit">Agregar Turno</button>
					</div>
				</div>
			</form>	
      </div>
	  
    </div>
  </div>
</div>     
<div class="modal fade" id="editarTurnoGrupoModal" tabindex="-1" role="dialog" aria-labelledby="editarTurnoGrupoModal" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
    <h3 class="modal-title title-padding" id="editarTurnoGrupoLabel">Editar Turno</h3>
		<div class="modal-body padding-top-5">
        	<form class="form-horizontal form-fix noRadius noBorder"  id="editarTurnoGrupoForm" role="form">
				<div class="form-body">
					
					<div class="form-group">
						<label class="col-md-3 control-label">Nombre Turno</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="editarNombreTurnoGrupo" name="editarNombreTurnoGrupo" placeholder="Nombre Turno" required> 
						</div>
					</div>
					<div class="form-actions right1">
						<button type="button" class="btn default" onclick="javascript:cerrarEditar()">Cancelar</button>
						<button type="submit" class="btn green" id="editarSubmit">Agregar Turno</button>
					</div>
				</div>
			</form>	
      </div>
	  
    </div>
  </div>
</div>    
    
    
    
    
 <div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered margin-top-7">
	<div class="row">
		<div class="col-md-10 col-md-offset-1">
			<div class="col-md-6">
				<div class=" col-md-12">
					<h4>Empresa</h4>
				</div>
				<div class="col-md-12">
					<select id="Sociedad" class="form-control btn-sm mayusculasWork" onchange="selectHuertoBySociedad(this)">
					</select>
				</div>
			</div>			
			<div class="col-md-6">
				<div class="col-md-12">
					<h4>Huerto</h4>
				</div>
				<div class="col-md-12">
					<select id="Huerto" class=" form-control btn-sm mayusculasWork" onchange="selectGrupoByHuerto(this)">
					</select>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-md-10 col-md-offset-1">
			<div class="col-md-6">
				<div class=" col-md-12">
					<h4>Zona</h4>
				</div>
				<div class="col-md-12">
					<select id="Zona" class="form-control btn-sm mayusculasWork" onchange="selectHuertoBySociedad(this)">
					</select>
				</div>
			</div>			
			<div class="col-md-6">
				<div class="col-md-12">
					<h4>CECO</h4>
				</div>
				<div class="col-md-12">
					<select id="Ceco" class=" form-control btn-sm mayusculasWork" onchange="selectGrupoByHuerto(this)">
					</select>
				</div>
			</div>
		</div>
	</div>
</div>
 <div class="col-xs-12 col-sm-12 col-md-12 portlet light margin-top-7">
	 <div class="col-md-8">
		<div class=" col-md-2">
			<h4>Turnos</h4>
		</div>
		<div class="col-md-10">
			<select id="Turno" class="form-control btn-sm mayusculasWork" onchange="selectTurno(this)">
			</select>
		</div>
	</div>
	<div class="col-md-2">
		<button title="Actualizar" id="" onclick="addTurno()" class="btn btn-circle red btn-outline btn-sm col-md-3"><i class="fa fa-plus fa-lg"></i></button>
		<button title="Actualizar" id="" onclick="changeTurno()" class="btn btn-circle yellow btn-outline btn-sm col-md-3 col-md-offset-1"><i class="fa fa-pencil-square-o fa-lg"></i></button>
	</div>
		
</div>
 <div class="col-xs-12 col-sm-12 col-md-12 portlet light margin-top-7">
	<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_gsup_1">
			<thead>  
			      <tr>        
<!-- 					<th class="text-center"><input -->
<!-- 					style="margin-left: auto; margin-right: auto;" type='checkbox' -->
<!-- 					title='Seleccionar Todo' id='checkAll' -->
<!-- 					onchange='javascript: selectALL(tbl_gsup_1);' class='checkbox' /></th> -->
					<th class="text-center">Apellido Paterno</th>					
	                <th class="text-center">Apellido Materno</th>                
					<th class="text-center">Nombre</th>
					<th class="text-center">Sociedad</th>
					<th class="text-center">Huerto</th>
<!-- 					<th class="text-center">Acciones </th> -->
                </tr>
			</thead>
			
			<tbody id="tbl_bd_gsup_1"></tbody>

	</table>
	<div>
		
		
		<div id="agregarDocumentoHref" style="float: right;">
	         
			<a id="addLVacas" title="Agregar" class="btn btn-circle red btn-outline" data-toggle="modal" href="/simpleWeb/webApp/SolicitudDeVacaciones">
				<i class="fa fa-plus"></i> Agregar Masivo
			</a>		
	        
		</div>
	</div>
		
</div>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light margin-top-7">
	<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_gsup_2">
			<thead>  
			      <tr>        
<!-- 					<th class="text-center"><input -->
<!-- 					style="margin-left: auto; margin-right: auto;" type='checkbox' -->
<!-- 					title='Seleccionar Todo' id='checkAll' -->
<!-- 					onchange='javascript: selectALL(tbl_gsup_2);' class='checkbox' /></th> -->
					<th class="text-center">Apellido Paterno</th>					
	                <th class="text-center">Apellido Materno</th>                
					<th class="text-center">Nombre</th>
					<th class="text-center">Sociedad</th>
					<th class="text-center">Huerto</th>
<!-- 					<th class="text-center">Acciones </th> -->
                </tr>
			</thead>
			
			<tbody id="tbl_bd_gsup_2"></tbody>

	</table>
	<div>
		
		
		<div id="agregarDocumentoHref" style="float: right;">
	         
			<a id="addLVacas" title="Agregar" class="btn btn-circle red btn-outline hide" data-toggle="modal" onclick="agregarCambios()">
				<i class="fa fa-plus"></i> Agregar
			</a>		
			<a id="addLVacas" title="Agregar" class="btn btn-circle green btn-outline" data-toggle="modal" onclick="guardarCambios()">
				<i class="fa fa-plus"></i> Guardar
			</a>
	        
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






























<style>
.margin-top-7{
    margin-top: 1em !important;
}
.btn.btn-outline.green {
    /*border-color: #008000;
    color: #008000;*/
    background: none;
}

</style>