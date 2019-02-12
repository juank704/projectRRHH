<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">


<div class="col-md-12 ">
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
      <div class="col-md-2">
         <label style="color: #337ab7;">CECO: </label>
      </div>
      <div class="col-md-2">
         <select id="listagrupoB" class=" form-control btn-circle btn-sm mayusculasWork" style="width: 134%;margin-left: -51px;">
            <option value="">Seleccione CECO</option>
         </select>
      </div>
   </div>
   <!-- end col-md-12 -->
   <div style="margin-top: 40px"></div>
   <div class="col-md-12 ">
      <div class="col-md-1">
         <label style="color: #337ab7;">Tipo Contrato: </label>
      </div>
      <div class="col-md-3">
         <select id="tipoContrato" class=" form-control btn-circle btn-sm mayusculasWork">
            <option value="">Seleccione Tipo</option>
         </select>
      </div>
	  <div class="col-md-1">
         <label style="color: #337ab7;">Fecha Termino: </label>
      </div>
      <div class="col-md-3">
        <input type="text" id="fechaTermino"  placeholder="Seleccione Fecha Termino"class="form-control btn-circle btn-sm mayusculasWork">
      </div>
	  <div class="col-md-2 ">
	    			<label style="color: #337ab7;" id="labelfecha">Periodo Centralización: </label>
	    		</div>
	    		<div class="col-md-2 ">
	    		<input   autocomplete="off" type="text" id="fechaCuotas" class="form-control input-circle mayusculasWork"
				onchange="javascript: valDias(this)" placeholder="Seleccione una Fecha" style="width: 134%;margin-left: -51px;">
	    </div>
      
   </div>
   <div style="margin-top: 80px;"></div>
   <div class="col-md-12 ">
   		
     <div class="col-md-2 ">
         <label style="color: #337ab7;">Código Trabajador: </label>
      </div>
      <div class="col-md-6">
         <select id="CodigoTra" class="form-control input-sm input-circle mayusculasWork">
            <option value="">Buscar</option>
         </select>
      </div>
   </div>
   
   <div class="col-md-12" style="margin-top: 10px;">
   <button class="btn btn-circle blue btn-outline idupdate" id="" onclick="agregarFila()">
   <i class="fa fa-plus">Añadir Individual</i> 
   </button>
   <button class="btn btn-circle blue btn-outline idupdate" id="addAll" onclick="addAll()">
   <i class="fa fa-reply-all" aria-hidden="true">Añadir Todos</i>
   </button>
   <button id="addDocumento" title="Agregar" class="btn btn-circle green btn-outline" data-toggle="modal" onclick="javascript:Enviar()">
   <i class="fa fa-floppy-o fa-lg"> Grabar</i>
   </button>
</div>
</div>

<div class="table-responsive">
   <table class="table table-bordered table-hover tzable-striped table-condensed dataTable no-footer" id="tbl_Info" style='margin-top: 20px;'>
      <thead>
         <tr>
            <th>Cód T</th>
            <th>Nombre</th>
            <th>Rut</th>
            <th>Fecha<br>Inicio</th>
            <th>Fecha<br>Termino</th>
            <th>id contrato</th>
            <th>Causal</th>
            <th>articulo</th>
            <th>inciso</th>
            <th>letra</th>
            <th>Feriado<br>Básico</th>
            <th>Feriado<br>Progresivo</th>
            <th>Feriado<br>Convencional</th>
            <th>Subtotal</th>
            <th>Días<br>Tomado</th>
            <th>Total</th>
            <th>Dias<br>Inhabiles</th>
            <th>Proporcional</th>
            <th>Total Pago</th>
            <th>Opciones</th>
            <th>trID</th>
            <th>descripcion</th>
            <th>fecha pago</th>
            <th>hora pago</th>
            <th>lugar pago</th>
            <th>aviso</th>
            <th>periodo</th>
            <th>INDEMNIZACION MES DE NO AVISO</th>
            <th>INDEMNIZACION AÑOS DE SERVICIO</th>
            <th>FERIADO PROPORCIONAL</th>
            <th>PERIODO CENTRALIZACION</th>
         </tr>
      </thead>
      <tbody id="tblPeticion"></tbody>
   </table>
</div>
	

