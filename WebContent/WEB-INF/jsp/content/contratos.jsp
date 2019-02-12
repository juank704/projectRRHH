<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<!-- Seccion de Formulario -->

<!-- Seccion de Formulario -->

<div class="table-responsive">
	<h4 style="text-align: center;">Nuevos Datos</h4>
	<table class="table table-bordered table-hover table-striped table-condensed" id="tblCambioEmpresa2">
		<thead>
			<tr>
				<th>Empresa a ser Contratado </th>
				<th>Obra</th>
				<th>Cargo</th>
				<th>Posicion</th>
				<th>Fecha de Termino(Empresa Anterior)</th>
				<th>Fecha Inicio</th>
				<th>Contrato</th>
			</tr>
		</thead>
		<tbody id="bodyCambioEmpresa2">
			<tr>
				<td>
					<select class="btn blue btn-outline btn-circle btn-sm" id="newEmpresa">
						<option value="">Seleccione...</option>
						<option value="arandanos">Arandanos SA</option>
						<option value="Manzanas">Manzanas SA</option>
						<option value="Uvas">Uvas SA</option>
						<option value="Kiwis">Kiwis SA</option>
						<option value="Cerezas">Cerezas SA</option>
					</select>
				</td>
				<td><select class="btn blue btn-outline btn-circle btn-sm" id="select"></select></td>
				<td><select class="btn blue btn-outline btn-circle btn-sm" id="select"></select></td>
				<td><select class="btn blue btn-outline btn-circle btn-sm" id="select"></select></td>
				<td>
					<input type="date" class="form-control input-circle" id="fechaInicio">
				</td>
				<td>
					<input type="date" class="form-control input-circle" id="fechaTermino">
				</td>
				<td>
					<a id="addAct" onclick="javascript: generarContrato();" class="btn btn-circle red btn-outline">
					<i class="fa fa-file-pdf-o fa-lg"></i> Ver Contrato
					</a>
				</td>
				<!--  
				<td>
					<button onclick="document.getElementById('lightbox').style.display='inline';">Show lightbox</button>
				</td>
				-->
			</tr>
		</tbody>
	</table>
</div>
<div style="text-align: center;">
	<a id="addAct" onclick="javascript: CambiarEmpresa();" class="btn btn-circle red btn-outline">
		<i class="fa fa-plus"></i> Crear Contratos
	</a>
	<a id="addAct" onclick="javascript:history.back();" class="btn btn-circle red btn-outline">
		<i class="fa fa-plus"></i> Cancelar
	</a>
</div>
<br></br>
<div style="display: none;" id="listaColaboradores">
	<div class="table-responsive">
		<h4 style="text-align: center;">Colaboradores</h4>
		<table class="table table-bordered table-hover table-striped table-condensed" id="tblCambioEmpresa">
			<thead>
				<tr>
					<th>Faena</th>
					<th>Obra</th>
					<th>Cargo</th>
					<th>Posicion</th>
					<th>Fecha de Inicio</th>
					<th>Fecha de Termino</th>
				</tr>
			</thead>
			<tbody id="bodyCambioEmpresa"></tbody>
		</table>
	</div>
</div>


<!-- New -->

 
<!--  -->
 
<!--  -->

 	<div class="col-md-12"> 
    
            <table 
                class="table table-striped table-bordered table-hover table-checkable"
                id="datatable_ajax">
                        
                    <thead>
                        <tr role="row" class="heading">
                        <th style="width:2%;">Codigo</th>
                        <th style="min-width:150px;">Nombre</th>
                        <th width="20%">Apellido</th>
                        <th width="20%">Empresa</th>
                        <th width="20%">Faena</th>
                        <th style="min-width:150px;">Obra</th>
                        <th width="20%">Cargo</th>
                        <th style="min-width:150px;">Fecha de Inicio</th>
                        </tr>
                                                                                                

                    </thead>
                    <tbody></tbody>
            </table>
        
        
    </div> 

<!--  --> 

<!--  -->




<!-- New -->













<!-- LIGHTBOX CODE BEGIN 

<button onclick="document.getElementById('lightbox').style.display='inline';">

Show lightbox

</button>





<div id="lightbox" class="lightbox" style="display:none"

      onclick="document.getElementById('lightbox').style.display='none';">



   <table class="lightbox_table">

   <tr>

   <td class="lightbox_table_cell" align="center">

      <div id="lightbox_content" style=

            "width:300px; background-color:white; border:5px solid black;">



         <p>Click anywhere to close the lightbox.</p>

         <p>Use Javascript to insert anything here.</p>



      </div>

   </td>

   </tr>

   </table>



</div>

 LIGHTBOX CODE END -->

