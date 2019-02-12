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
      <div class="col-md-1">
         <label style="color: #337ab7;">Huerto: </label>
      </div>
      <div class="col-md-3">
         <select id="tipodivisionB" class=" form-control btn-circle btn-sm mayusculasWork" >
            <option value="">Seleccione Huerto</option>
         </select>
      </div>
   </div>
   <!-- end col-md-12 -->
   <div style="margin-top: 40px"></div>
   <div class="col-md-12 ">
      <div class="col-md-2">
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
      <div class="col-md-3">
         <select id="listagrupoB" class=" form-control btn-circle btn-sm mayusculasWork">
            <option value="">Seleccione CECO</option>
         </select>
      </div>
   </div>
   <div style="margin-top: 80px;"></div>
   <div class="col-md-12 ">
   		<div class="col-md-2">
         <label style="color: #337ab7;">Fecha Termino: </label>
      </div>
      <div class="col-md-3">
        <input type="text" id="fechaTermino"  placeholder="Seleccione Fecha Termino"class="form-control btn-circle btn-sm mayusculasWork">
      </div>
      <div class="col-md-2">
         <label style="color: #337ab7;">Tipo Contrato: </label>
      </div>
      <div class="col-md-3">
         <select id="tipoContrato" class=" form-control btn-circle btn-sm mayusculasWork">
            <option value="">Seleccione Tipo</option>
         </select>
      </div>
   </div>
   
   <div class="col-md-12" style="margin-top: 10px;">
   <button id="addDocumento" title="Buscar" class="btn btn-circle green btn-outline" data-toggle="modal" onclick="javascript:Buscar()">
   <i class="fa fa fa-search fa-lg"> Buscar</i>
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
            <th>Fecha Inicio</th>
            <th>Fecha Termino</th>
            <th>Causal</th>
            <th>Total Pago</th>
            <th>Opciones</th>
         </tr>
      </thead>
      <tbody id="tblPeticion"></tbody>
   </table>
</div>
<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>	

