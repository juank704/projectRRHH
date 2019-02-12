<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>




 


	
<div id="divCierre" class="col-xs-12 col-sm-12">
	<div class="table-responsive" id="ignore">
	
		<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">
			<div class="row">
				<div class="col-md-4">
					<div class=" col-md-12">
						<h4>Empresa</h4>
					</div>
					<div class="col-md-12">
						<select id="Sociedad" class="form-control btn-sm mayusculasWork" onchange="selectHuertoBySociedad(this)">
						</select>
					</div>
				</div>			
				<div class="col-md-4">
					<div class="col-md-12">
						<h4>Huerto</h4>
					</div>
					<div class="col-md-12">
						<select id="tipoCampo" class=" form-control btn-sm mayusculasWork" onchange="selectGrupoByHuerto(this)">
						</select>
					</div>
				</div>
				<div class="col-md-4">
					<div class="col-md-12">
						<h4>Zona</h4>
					</div>
					<div class="col-md-12">
						<select id="listaGrupos" class=" form-control btn-sm mayusculasWork" onchange="selectCECOByGrupo(this)">
						</select>
					</div>
				</div>
				
			</div>
			<div class="row">		
				<div class="col-md-4">
					<div class="col-md-12">
						<h4>CECO</h4>
					</div>
					<div class="col-md-12">
						<select id="listaCecos"	class=" form-control btn-sm mayusculasWork" onchange="selectTrabajadorByCeco(this)">
						</select>
					</div>
				</div>
				<div class="col-md-4">
					<div class="col-md-12">
						<h4>Nombre</h4>
					</div>
					<div class="col-md-12">
						<select style="width:100%"  id="nombreTrabajador" class="form-control mayusculasWork">
						</select>
					</div>
				</div>
				<div class="col-md-4">
					<div class="col-md-12">
						<h4>Periodo proceso</h4>
					</div>
					<div class="col-md-12">
						<input type="text" id="periodoSolicitud" class="form-control btn-sm" placeholder="Seleccione Periodo">
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4 hide">
					<div class="col-md-12">
						<h4>TIPO CONTRATO</h4>
					</div>
					<div class="col-md-12">
						<select id="tipocontratoSelect"	class=" form-control btn-circle btn-sm mayusculasWork">
							<option value="-1">SELECCIONE</option>
						</select>
					</div>
				</div>
			</div>
		</div>
		<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_Lvacas">
			<thead>  
			      <tr>        
					<th class="text-center">N°<br>&nbsp;</th>
					<th class="text-center">Nombre <br>&nbsp;</th>					
	                <th class="text-center">Cod. <br> Trabajador</th>                
					<th class="text-center">Dias<br>&nbsp;</th>
					<th class="text-center">Fecha <br> Solicitud</th>
					<th class="text-center">Fecha <br> Inicio</th>
					<th class="text-center">Fecha <br> Fin</th>
					<th class="text-center">Acciones <br>&nbsp;</th>
                </tr>
			</thead>
			
			<tbody id="tblBodyInds"></tbody>

		</table>
	</div>
	<div>
		
		
		<div id="agregarDocumentoHref" style="float: right;">
	         
			<a id="addLVacas" title="Agregar" class="btn btn-circle red btn-outline" data-toggle="modal" href="/simpleWeb/webApp/SolicitudDeVacaciones">
				<i class="fa fa-plus"></i> Agregar
			</a>		
	        
		</div>
	</div>	
</div>


<div class="dragbox ui-resizable">
	<div class="dragbox-content"></div>
</div>
<p style="color:white">.</p>
<article id="loading" class="loading_dos" style="display: block;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>

<style>
.noShadowNoRadius{
	box-shadow: none;
}
.noRadius{
	box-shadow: none;
	border-radius:0px;
}
.noBorder{
	    border: none;
}
.text-right{
	text-align: right;
}
.text-left{
	text-align:left;
}
.padding-top-5{
padding-top: 5px;
}
.title-padding{
padding-top: 2%;
    padding-left: 2.5%;}
.form-fix{
	width: auto;   
    margin: 1em;    
    text-align: right;
    }
input[type="file"] {
   	height: 2.39em;
    left: -1px;
    top: -26px;
    width: 9em;
    position: relative;
    opacity: 0;
    }
.btn-fixed-m{
	position: absolute;
    top: 0;
    left: 40%;
    height: 2.4em;
}
.min-width-180{
min-width: 180px;
}
.margin-left-7{
    margin-left: 7% !important;
}
#tbl_Lvacas_length,#tbl_Lvacas_filter{
display:none !important;
}
</style>

