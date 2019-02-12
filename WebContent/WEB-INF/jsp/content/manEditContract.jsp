<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <!--ISO-8859-1-->
<h3>Contratos</h3>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">

    <div class="col-xs-12 col-sm-12 col-md-12">
        <h4>Filtros</h4>
            
            <div class="col-xs-7 col-sm-7 col-md-7">
                    <h5 class="text-center">Fecha de Creación o Modificación</h5>
                <div class="col-xs-12 col-sm-12 col-md-6 ">
                    <label style="color: #337ab7;" >Desde: </label>
                    <input type="date" id="inHIM" class="btn blue btn-outline btn-circle btn-sm">
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 ">
                    <label style="color: #337ab7;" >Hasta: </label>
                    <input type="date" id="finHIM" class="btn blue btn-outline btn-circle btn-sm">
                </div>
                                
            </div>
            <div class="col-xs-5 col-sm-5 col-md-5">
                <h5 class="text-center">Nombre</h5>
                <div class="col-xs-12 col-sm-12 col-md-12 ">
					<div class="col-md-offset-2 col-xs-8 col-sm-8 col-md-8 ">
                    	<input type="text" name="nombre" id="nombre" class="form-control blue input-circle">
					</div>
                </div>
            </div>    
    </div> 
</div>
<!--onclick="javascript: seHab();"-->
<div id="divCierre2" style="text-align: center;">
	<a id="seHab"  onclick="javascript:alert('hola')" title="Buscar" class="btn btn-circle red btn-outline">
		<i class="fa fa-search"></i> Buscar
	</a>
</div>
<br>	
<%

String id="asdasd";


%>
	
<div id="divCierre" class="col-xs-12 col-sm-12">
	<div class="table-responsive">
		<table class="table table-bordered table-hover table-striped table-condensed">
			<thead>
                <!--
				<th style="text-align: center;"><%= id %></th> -->
				<th class="text-center">N° Plantilla</th>
				<th class="text-center">Nombre Documento</th>
				<th class="text-center">Archivo</th>
                <th class="text-center">Fecha de Creación</th>                
				<th class="text-center">Estado</th>
				<th class="text-center">Fecha De Modificación</th>
                <th class="text-center">Usuario Modificador</th>
				<th class="text-center">editar /eliminar</th>
                
			</thead>
			<tbody id="tblCierre">
				
			</tbody>
		</table>
	</div>
</div>

<div class="dragbox ui-resizable">
	<div class="dragbox-content"></div>
</div>

<div>
	<div id="divCierre2" style="float: left;">
		<a id="addReportHaberes" title="Generar Reporte" onclick="javascript:generateReport()" class="btn btn-circle yellow btn-outline">
			<i class="fa fa-file-text-o"></i> Reporte
		</a>
	</div>
	
	<div id="divCierre2" style="float: right;">
         
		<a id="addHaberes" title="Agregar" href="javascript:createTemplate()" class="btn btn-circle red btn-outline">
			<i class="fa fa-plus"></i> Agregar
		</a>		
        
	</div>
</div>
