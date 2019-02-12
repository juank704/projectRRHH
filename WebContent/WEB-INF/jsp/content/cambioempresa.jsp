<!-- TODO: Desasociar al Trabajador del grupo al cual pertenezca. sw_r_grupoTrabajador  -->

<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>


<div class="col-md-12">
	<h4 style="text-align: center;">Datos Basicos del trabajador</h4>
	<table
		class="table table-striped table-bordered table-hover table-checkable"
		id="datatable_ajax">

		<thead>
			<tr role="row" class="heading">
				<th style="min-width: 150px;">Nombre</th>
				<th style="min-width: 150px;">Empresa</th>
				<th width="20%">Fecha Ingreso</th>
				<th width="20%">Fecha Termino</th>
				<th style="min-width: 150px;">Actions</th>
			</tr>

			<!--  <tr role="row" class="filter">
                            <td><input type="text" class="form-control form-filter input-sm" name="vw_idTrabajador"></td>
                            <td><input type="text" class="form-control form-filter input-sm" name="vw_sociedad"></td>
                            <td><input type="text" class="form-control form-filter input-sm" name="vw_fechaIngreso"></td>
                            <td><input type="text" class="form-control form-filter input-sm" name="vw_fechaTermino"></td>
                                
                            <td>
                                <div class="margin-bottom-5"><button class="btn btn-sm green btn-outline filter-submit margin-bottom">
                                    <i class="fa fa-search"></i>
                                        </button>
                                            <button class="btn btn-sm red btn-outline filter-cancel">
                                                <i class="fa fa-times"></i> Reset
                                            </button>
                                </div>
                            </td>
                        </tr>
              -->

		</thead>
		<tbody></tbody>

	</table>


</div>

<!--  -->

<!--  -->

<h4 style="text-align: center;">Nuevos Datos</h4>
<div class="col-md-1"></div>
<div class="col-md-10">
	<form id="cambioEmpresaForm" style="width: 100%" action="#"
		method="post">
		<div class="form-group">
			<table
				class="table table-bordered table-hover table-striped table-condensed"
				id="tblCambioEmpresa2">
				<thead>
					<tr>
						<th>Empresa a ser trasladado</th>
						<th>Fecha de Termino(Empresa Anterior)</th>
						<th>Fecha Inicio</th>
						<th>Anexo de contrato</th>
					</tr>
				</thead>
				<tbody id="bodyCambioEmpresa2">
					<tr>
						<td><select class="btn blue btn-outline btn-circle btn-sm"
							id="newEmpresa" name="nuevaEmpresa"></select></td>
						<td><input readonly type="text"
							class="form-control input-circle" id="fechaTermino"
							name="fechaTermino"></td>
						<td><input readonly type="text"
							class="form-control input-circle" id="fechaInicio"
							name="fechaInicio"></td>
						<td><a id="addAct" onclick="javascript: generarContrato();"
							class="btn btn-circle red btn-outline"> <i
								class="fa fa-file-pdf-o fa-lg"></i> Generar Documento
						</a></td>
						<!--  
				<td>
					<button onclick="document.getElementById('lightbox').style.display='inline';">Show lightbox</button>
				</td>
				-->
					</tr>
				</tbody>
			</table>


			<div style="text-align: center;">

				<button id="cambiar" class="btn btn-circle red btn-outline"
					type="submit">
					<i class="fa fa-plus"></i> Guardar
				</button>

				<a id="addAct" onclick="javascript:history.back();"
					class="btn btn-circle red btn-outline"> <i class="fa fa-plus"></i>
					Cancelar
				</a>


			</div>
		</div>
	</form>
</div>
<div class="col-md-1"></div>

<style>

</style>


