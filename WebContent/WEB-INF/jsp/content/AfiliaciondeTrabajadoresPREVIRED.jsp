<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
	
	<div class="col-xs-12 col-sm-12 col-md-1 ">
		
	</div>
	<div class="col-xs-12 col-sm-12 col-md-10 portlet light bordered">
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label style="color: #337ab7;" ><label style="color: #FF0000;">*</label>Periodo:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<input  name="par" type="month" id="cantidad" class="btn blue btn-outline btn-circle btn-sm">
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-6 ">
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<label style="color: #337ab7;" ><label style="color: #FF0000;">*</label>Empresa:</label>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 ">
				<select id="Sociedad" class=" form-control btn-circle btn-sm mayusculasWork" >
				<option value="">Seleccione una Empresaa</option>
				</select>

			</div>
		</div>
		<br><br><br><br>
		<div style="text-align: center;" class="col-xs-12 col-sm-12 col-md-12 ">
			<a href="#" class="btn btn-circle red btn-outline" onclick="generarArchivo();">
				<i class="icon-layers"></i> Generar
			</a>
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-1 ">
		
	</div>
</div>
<p style="color: white">.</p>
<article id="loading" class="loading_dos" style="display: block;">
<div id="modal" class="modal" style="display: block;"></div>
</article>