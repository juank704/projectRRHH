<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Fecha Centralización</h4>
        </div>
        <div class="modal-body">
          
                <div class="col-md-12 text-center">
                   <div class="col-md-5">
               <input  type="text" id=fechacentralizacion class="form-control input-circle mayusculasWork" placeholder="Seleccione una Fecha"></input>
            </div>
                </div>
            
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal" id='CentralizarModal' onclick="Centralizar2();">Centralizar</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
        </div>
      </div>
      
    </div>
  </div>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered" id="tablaNominaAnticipos" >
	
		<div style="height: 50px;"></div>
		<div class="table-responsive" id="ignore">
			<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Info">
				<thead>
					<tr>
						<th style='display:none'>id</th>
						<th >Concepto</th>
						<th>Periodo</th>
						<th>Fecha Pago</th>
						<th>Total Monto</th>
						<th>Estado</th>
						<th style='display:none'>N° Estado</th>
						<th>Opciones</th>
					</tr>
				</thead>
				<tbody id="tableNomina"></tbody>
			</table>
		</div>
		<br>	
</div>
<p style="color:white">.</p>
<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>