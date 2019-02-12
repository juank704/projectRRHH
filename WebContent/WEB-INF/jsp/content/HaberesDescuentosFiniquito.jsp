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



<div class="col-md-12 portlet light bordered"  id='panelform' style="margin-top: 10px;">

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
	<div class="col-md-12" style="margin-top: 10px;">
		<div class="col-md-2">
			<label style="color: #337ab7;">Tipo de Haber/Descuento</label>
		</div>
		<div class="col-md-2 ">
			<select id="haberes_descuentos" class=" form-control btn-circle btn-sm mayusculasWork">
							<option value="">Seleccione..</option>
							<option value="hn" class="noimponible">Haber no Imponible</option>
							<option value="h"  class="imponible">Haber Imponible</option>			
							<option value="d">Descuento</option>
							<option value="c">Costo Empresa</option>
						</select>
		</div>
		<div class="col-md-1 ">
			<label style="color: #337ab7;">Conceptos: </label>
		</div>
		<div class="col-md-7">

						   	<select id="conceptos" class="form-control input-sm input-circle ">
				       
			</select>
		</div>
	</div>
	<div class="col-md-12 " style="margin-top: 10px">
		<div class="col-md-2 ">
			<label style="color: #337ab7;">Código Trabajador: </label>
		</div>
		<div class="col-md-2">
			<select id="CodigoTra" class="form-control input-sm input-circle mayusculasWork"></select>
		</div>
		<div class="col-md-2 ">
	   		<label style="color: #337ab7;">Tipo Moneda: </label>
	    </div>
	    <div class="col-md-2 ">
			<select id="tipoMoneda" class=" form-control btn-circle btn-sm mayusculasWork">
				<option value=''>Seleccione..</option>	
			</select>
	    </div>
		<div class="col-md-2 ">
			<label style="color: #337ab7;">Monto:</label>
		</div>
		<div class="col-md-2 ">
		    <input type="number" class="form-control input-circle" style="display: none;" id="montonewold" onchange="setTwoNumberDecimal" min="0"  step="0.01" value="0.00" />
			<input id="monto" type="text" name="ReAct" id="cantidadP" class="form-control input-circle number" >
		</div>
	</div>
	
	<div class="col-md-12 " style="margin-top: 10px">
		<div class="col-md-2 ">
	    	<label style="color: #337ab7;" id="">N° Días/Años: </label>		
	    </div>
	    <div class="col-md-2 ">
			<input type="number" class="form-control input-circle" id="monto2" onchange="setTwoNumberDecimal" min="0"  step="0.01" value="0.00" />
	    </div>
		<div class="col-md-2">
      		<label style="color: #337ab7;">Fecha Contrato: </label> 
		</div>
		<div class="col-md-2 "> 
			<select id="idContrato" class=" form-control btn-circle btn-sm mayusculasWork"></select>
		</div> 
		<div class="col-md-2 ">
	    	<label style="color: #337ab7;" id="labelfecha">Mes de Periodo: </label>
	    </div>
	    <div class="col-md-2 ">
	    	<input   type="text" id="fechaCuotas" class="form-control input-circle mayusculasWork" onchange="javascript: valDias(this)" placeholder="Seleccione una Fecha">
	    </div>
	</div>
	
	<div class="col-md-12 " style="margin-top: 10px">
	    <div class="col-md-2">
			<a id="1" class="btn btn-circle red btn-outline" onclick="javascript: addForm();"><i class="fa fa-plus"> Añadir Individual</i> </a>			
		</div>
		<div class="col-md-2">
			<button title="Añadir Todos" id="addAll" onclick="addAll()" class="btn btn-circle blue btn-outline">
				<i class="fa fa-plus"> Añadir Todos</i>
		    </button>
		</div>
	
		<div class="col-md-2">
			<a class="btn btn-circle blue btn-outline" onclick="javascript: Enviar();"> 
				<i class="fa fa-floppy-o fa-lg">Grabar</i>
			</a>
		</div>
		<div class="col-md-2">
			<h4 id='tiposimbolo'>Total Monto $: </h4>
		</div>
		<div class="col-md-2" style="margin-left: -27px;">
				<h4><span id='totalMonto'>0</span></h4>
			</div>
	</div><!-- end col-md-12- -->
	<div style="margin-top: 160px"></div>
</div>

<div class="table-responsive">
	<table class="table table-bordered table-hover tzable-striped table-condensed dataTable no-footer" id="tbl_Fito">
		<thead>
			<tr>
			    <th style='display: none;' >Concepto</th>
			    <th>Concepto</th>
				<th >Código</th>
				<th >Apellidos</th>
				<th>Nombres</th>
				<th>Tipo de Moneda</th>
				<th style='display: none;' >id moneda</th>
				<th>Monto</th>
				<th style='display: none;'>idFrecuencia</th>
				<th>Días</th>
				<th>Fecha Termino</th>
				<th>Opciones</th>
				<th style='display: none;'>Tipo</th>
				<th style='display: none;'>id Contrato</th>
				
			</tr>
		</thead>
		<tbody id="tblPeticion"></tbody>
	</table>
</div>


<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>


	
