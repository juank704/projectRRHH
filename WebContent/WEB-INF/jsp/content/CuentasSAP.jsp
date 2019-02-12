<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	
		<div style="height: 50px;"></div>
		<div class="table-responsive" id="ignore">
			<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Info">
				<thead>
					<tr>
						<tr>
						<th>Nombre Cuenta</th>
						<th>N° Cuenta</th>				
						<th>Opciones</th>
					</tr>
				</thead>
				<tbody id="tablePreselect"></tbody>
			</table>
		</div>
		<br>	
</div>
<div class="container">
    <div class="modal fade" id="modalupdate" role="dialog">
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
                                <h4>N° Cuenta</h4>
                            </div>
                            <div class="col-md-12">
                            	<input class="form-control" type="number" value="" id="numerocuenta">
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-12">
                    </div>
                </div>
                <div class="modal-footer">
                    <div class='btn btn-circle blue btn-outline' id='actualizarUp'><i class='fa fa-clock-o'></i> Actualizar</div>
                    <div class='btn btn-circle red btn-outline' data-dismiss="modal">Cerrar</div>
                </div>
            </div>

        </div>
    </div>
</div>
<p style="color:white">.</p>
<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>