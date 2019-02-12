<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<div class="col-md-12 ">
<div class="col-md-7"></div>
<div class="col-md-2 ">
		<label style="color: #337ab7;">Empresa:</label>
	</div>
	<div class="col-md-3 ">
	<select id="Sociedad" class=" form-control btn-circle btn-sm mayusculasWork" >
				<option value="-1">Seleccione una Empresa</option>
				</select>
	</div>
</div>
<div style="margin-top: 60px"></div>
<div class="col-md-12 portlet light bordered" id="panelform">
	<div class="col-md-12 ">
		<div class="col-md-2 ">
			<label style="color: #337ab7;">Código Trabajador: </label>

		</div>
		<div class="col-md-6">
			<select id="CodigoTra" class="form-control input-sm input-circle mayusculasWork">
				<option value="">Buscar</option>
			</select>
		</div>
	
		<div class="col-md-2">
			<label style="color: #337ab7;">Huerto: </label>
		</div>
		<div class="col-md-2">
        	<select id="tipodivisionB" class=" form-control btn-circle btn-sm mayusculasWork" >
				<option value="">Seleccione Huerto</option>
			</select>
          </div>
	</div><!-- end col-md-12 -->
   <div style="margin-top: 40px"></div>
  <div class="col-md-12 ">
		<div class="col-md-2">
			<label style="color: #337ab7;">Zona: </label>
		</div>
		<div class="col-md-2">
			<select id="tiposubdivisionB" class=" form-control btn-circle btn-sm mayusculasWork" >
				<option value="">Seleccione ZONA</option>
			</select>
		</div>
		<div class="col-md-2">
			<label style="color: #337ab7;">CECO: </label>
		</div>
		<div class="col-md-2">
			<select id="listagrupoB" class=" form-control btn-circle btn-sm mayusculasWork">
				<option value="">Seleccione CECO</option>
			</select>
		</div>
			<div class="col-md-2">
			<label style="color: #337ab7;">Concepto:</label>
		</div>
		<div class="col-md-2">
			<select id="concepto" class=" form-control btn-circle btn-sm mayusculasWork">
				<option value="-1">Seleccione un Concepto</option>
				<option value="1">HORA EXTRA</option> 
				<option value="2">HORA FALTA</option>  
			</select>	
		</div>
		
  </div>
	 <div style="margin-top: 80px"></div>
	
	<div class="col-md-12 ">
	
			<div class="col-md-2">
			<label style="color: #337ab7;">Mes de Periodo: </label>
		</div>
		<div class="col-md-2">
				
			<input autocomplete="off" type="month" name="filLiq" id="periodo" class="form-control input-circle mayusculasWork">
		</div>
	
	
		
		<div class="col-md-2">
		<button title="Buscar" id="1" onclick="buscar();" class="btn btn-circle blue btn-outline btn-sm">
		<i class="fa fa-search"></i></button>
	
		</div>
	</div>

</div>

 <div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	
		<div style="height: 50px;"></div>
		<div class="table-responsive" id="ignore">
			<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Info">
				<thead>
					<tr>
						<tr>
						<th>ID Concepto</th>
						<th>Concepto</th>
						<th>Cód.<br> Trabajador</th>
						<th>Nombre Trabajador</th>
						<th>N° Horas</th>
						<th>Periodo</th>
						<th>Fecha</th>					
						<th>Opciones</th>
					</tr>
						
					</tr>
				</thead>
				<tbody id="tablePreselect"></tbody>
			</table>
		</div>
		<br>	
</div>

<div class="container">
 

  <div class="modal fade"  id="modalupdate"  role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          
          <h4 class="modal-title">Editar</h4>
        </div>
        <div class="modal-body">
			<div class="col-md-12" style="margin-top: 10px;">
   <div class="col-md-6">
      <div class="col-md-12">
         <h4>Concepto</h4>
      </div>
      <div class="col-md-12">
        <select id="conceptos" class=" form-control btn-circle btn-sm mayusculasWork">
		
           </select>
      </div>
   </div>
</div>
<div class="col-md-12" style="margin-bottom: 10px;">
   <div class="col-md-6">
      <div class="col-md-12">
         <h4>Periodo</h4>
      </div>
      <div class="col-md-12">
         <input type="text" class="form-control input-circle mayusculasWork"  id="periodoupdate" >
      </div>
   </div>
</div>
<div class="col-md-12" style="margin-bottom: 10px;">
   <div class="col-md-6">
      <div class="col-md-12">
         <h4>Fecha</h4>
      </div>
      <div class="col-md-12">
         <input autocomplete="off" type="text" id="fechaupdate" class="form-control input-circle mayusculasWork" onchange="javascript: valDias(this)" placeholder="Seleccione una Fecha">
      </div>
   </div>
</div>
<div class="col-md-12" style="margin-bottom: 10px;">
   <div class="col-md-6">
      <div class="col-md-12">
         <h4>Hora</h4>
      </div>
      <div class="col-md-12">
         <input type="time" name="eta" id="horas"class="form-control input-circle" >
      </div>
   </div>
</div>
<div ></div>
<div class="col-sm-12 col-md-12">
  
 
 

</div>
        </div>
        <div class="modal-footer">
           <div class='btn btn-circle blue btn-outline' id='actualizarUp'><i class='fa fa-clock-o'></i> Actualizar</div>
          <div class='btn btn-circle red btn-outline'data-dismiss="modal">Cerrar</div>
        </div>
      </div>
      
    </div>
  </div>
  
</div>

<p style="color:white">.</p>
<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>
<style>
.tdcenter{
text-align: center;
}
.tdnone{
display: none;
}
</style>