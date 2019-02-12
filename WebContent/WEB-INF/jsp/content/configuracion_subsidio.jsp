<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
	<h4>Configuración Subsidio</h4>	
	<div class="table-responsive ">
	<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
		<div class="col-xs-6 col-sm-6 col-md-6 portlet light bordered">
		<table class="table table-bordered table-hover table-striped table-condensed dataTable no-footer" id="tblsub">
			<thead>
				<tr>
					<th>Campo</th>
					<th>Subsidio</th>
				</tr>
			</thead>
			<tbody id="tbl_sub">
			
			</tbody>
			<tbody id="BodyCalificacion"></tbody>
		</table>
		</div>
	</div>
</div>

<div style="text-align: center;">
	<a id="Guardar" onclick="javascript: Guardar(0);" class="btn btn-circle red btn-outline">
		<i class="fa fa-plus"></i> Guardar
	</a>
</div>
<div id="fileArea" style="display: none;"></div>

<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>
.