<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
    <h3>Lista Solicitudes</h3>
    <div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	
		<div style="height: 50px;"></div>
			<div class="table-responsive" id="ignore">
				<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Info">
					<thead>
						<tr>
							<th>N� Solicitud</th>
							<th>faena</th>
							<th>Usuario</th>
							<th cellspacing="10">Cant. <br>Trabajadores<br> Solicitados</th>
							<th>Cant. <br>Trabajadores<br>  Preseleccionado</th>
							<th>Cant. <br>Trabajadores<br>  Seleccionado</th>
							<th>Saldo</th>
							<th style="min-width: 100px;">Opciones</th>
						</tr>
					</thead>
					<tbody id="tablePreselect"></tbody>
				</table>
			</div>
		<br>	
</div>

<p style="color:white">.</p>
<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>
