<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<div class="col-md-12 portlet light bordered" id="todo"
	style="margin-top: 10px;">
	<div class="col-md-12 ">
		<div class="col-md-2">
			<label style="color: #337ab7;">Documento: </label>
		</div>
		<div class="col-md-2">
			<label for="7" title="Subir Archivo"
				class="btn btn-circle green btn-outline"> <i
				class="fa fa-upload"></i>Subir Archivo
			</label><br> <input id="7" type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
		</div>
		<div class="col-md-2">
		<a id="1" class="btn btn-circle red btn-outline" onclick="javascript: addForm1();"><i class="fa fa-floppy-o fa-lg"> Grabar</i>
				</a>
		</div>
		<div class="col-md-2"></div>
		<div class="col-md-2">
		<a id="1" class="btn btn-circle green btn-outline" onclick="javascript: excel();"><i class="fa fa fa-file-excel-o  fa-lg" style="color:green"> Descargar Planilla</i>
				</a>
		</div>
	</div>
</div>
<p style="color:white">.</p>
<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>