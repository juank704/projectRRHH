<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>


<div class="col-md-12">

	
</div>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">

    <div class="col-md-12">
        <h4>Filtros</h4>
            <div class="col-md-12">
            <div class="col-md-3"></div>
            <div class="col-md-3">
                    <h5 class="text-center">Periodo Proceso</h5>
                <div class="col-md-12 text-center">
                   
                    <input type="text" id="periodoRemuneracionesB" class=" form-control btn-circle btn-sm mayusculasWork">
               
                </div>
            </div>
            <div class="col-md-3 text-center">
                   <h5 class="text-center">Fecha Anticipo </h5>
                <div class="col-md-12 ">
                     <input type="date" id="fechaPagoB" class=" form-control btn-circle btn-sm mayusculasWork">
                </div>
            </div> 
              <div class="col-md-3"></div> 
           </div>     
    </div> 
    <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="col-xs-12 col-sm-2 col-md-2  col-sm-offset-1 col-md-offset-1 text-center">
                <h5 class="text-center">Empresa</h5>
                	<select id="SociedadB" class=" form-control btn-circle btn-sm mayusculasWork" >
				<option value="">Seleccione una Empresa</option>
				</select>
            </div>
             <div class="col-xs-12 col-sm-2 col-md-2 text-center">
                <h5 class="text-center">Huerto</h5>
                      	<select id="tipodivisionB" class=" form-control btn-circle btn-sm mayusculasWork" >
				<option value="">Seleccione HUERTO</option>
				</select>
            </div>
            <div class="col-xs-12 col-sm-2 col-md-2 text-center">
                <h5 class="text-center">Grupo</h5>
                     	<select id="tiposubdivisionB" class=" form-control btn-circle btn-sm mayusculasWork" >
				<option value="-1">Seleccione GRUPO</option>
				</select>
            </div> 
             <div class="col-xs-12 col-sm-2 col-md-2 text-center">
                <h5 class="text-center">CECO</h5>
			<select id="listagrupoB" class=" form-control btn-circle btn-sm mayusculasWork">
				<option value="-1">Seleccione CECO</option>
			</select>
		</div>  
             <div class="col-xs-12 col-sm-2 col-md-2 text-center">
                <h5 class="text-center">Tipo Contrato</h5>
               	<select id="tipocontratoSelect" class=" form-control btn-circle btn-sm mayusculasWork" >
				<option value="-1">Seleccione</option>
				</select>
            </div>    
    </div>
    <div class="col-xs-12 col-sm-12 col-md-12">
          
              <div class="col-xs-3 col-sm-3 col-md-3"> </div>
            <div class="col-xs-6 col-sm-6 col-md-6">
                     <h5 class="text-center">Trabajador</h5>
			<div class="input-icon right">
				<select id="nombreTrabajadorB"
					class="form-control input-sm input-circle mayusculasWork ">

				</select>
			</div>
		</div>
            <div class="col-xs-3 col-sm-3 col-md-3"> </div>
            <div class="col-xs-12 col-sm-2 col-md-2 text-center">
                     <button id="" title="buscarTrabajador" class="btn btn-circle blue btn-outline marginDefaced width100" data-toggle="modal" onclick="javascript:buscarTrabajadorByParams()">
                        <i class="fa fa-search"></i> Buscar
                    </button>
            </div>
  
             <div class="col-xs-12 col-sm-1 col-md-1 text-center">
<!--                      <button id="" title="buscarTrabajador" class="btn btn-circle blue btn-outline marginDefaced2" data-toggle="modal" onclick="agregarFila()"> -->
<!--                         <i class="fa fa-plus"></i> -->
<!--                     </button> -->
            </div>
    </div>
</div>

<br>	


<div class="table-responsive2">
<p style="text-align: center;">Resultado Busqueda</p>
	<table class="table table-bordered table-hover tzable-striped table-condensed dataTable no-footer" id="tbl_Info2">
		
		<thead>
			<tr>
			   
				<th style='text-align: center;'>Fecha</th>
				<th style='text-align: center;'>Cód T</th>
				<th style='text-align: center;'>Trabajador</th>
				<th style='text-align: center;'>Monto</th>
				<th style='text-align: center;'>Opciones</th>

				
			</tr>
		</thead>
		<tbody id="tblPeticion2"></tbody>
	</table>
</div>


<p style="color:white">.</p>

<div id="ModalUpdate" class="modal fade" role="dialog">
 

  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Actualizar</h4>
      </div>
      <div class="modal-body">
				<div class="swal2-content">
					<div id="swal2-content" style="display: block;">
						<div class="col-xs-12 col-sm-12 col-md-12"
							style="margin-bottom: 10px;">
							<div class="col-xs-6 col-sm-6 col-md-6">
								<div class="col-xs-12 col-sm-12 col-md-12">
									<h4>Codigo Trabajador</h4>
								</div>
								<div class="col-xs-12 col-sm-12 col-md-12">
									<input type="text" class="form-control mayusculasWork" id="cod_trabUpdate"
										value="" disabled="">
								</div>
							</div>
							<div class="col-xs-6 col-sm-6 col-md-6">
								<div class="col-xs-12 col-sm-12 col-md-12">
									<h4>Nombre</h4>
								</div>
								<div class="col-xs-12 col-sm-12 col-md-12">
									<input type="text" class="form-control mayusculasWork" id="nombre_trabUpdate"
										value="" disabled="">
								</div>
							</div>
							<div class="col-xs-6 col-sm-6 col-md-6">
								<div class="col-xs-12 col-sm-12 col-md-12">
									<h4>Periodo proceso</h4>
								</div>
								<div class="col-xs-12 col-sm-12 col-md-12">
									<input type="month" id="periodoRemuneracionesUpdate" class="btn blue btn-outline btn-circle btn-sm mayusculasWork">
								</div>
							</div>
							<div class="col-xs-6 col-sm-6 col-md-6">
								<div class="col-xs-12 col-sm-12 col-md-12">
									<h4>Fecha Anticipo</h4>
								</div>
								<div class="col-xs-12 col-sm-12 col-md-12">
									<input type="date" id="fechaPagoUpdate"
										class="btn blue btn-outline btn-circle btn-sm mayusculasWork">
								</div>
							</div>
							<div class="col-xs-6 col-sm-6 col-md-6">
								<div class="col-xs-12 col-sm-12 col-md-12">
									<h4>Empresa</h4>
								</div>
								<div class="col-xs-12 col-sm-12 col-md-12">
									<select id="SociedadUpdate"
										class=" form-control btn-circle btn-sm mayusculasWork" disabled>
										<option value="">Seleccione una Empresa</option>
									</select>
								</div>
							</div>
<!-- 							<div class="col-xs-6 col-sm-6 col-md-6"> -->
<!-- 								<div class="col-xs-12 col-sm-12 col-md-12"> -->
<!-- 									<h4>División</h4> -->
<!-- 								</div> -->
<!-- 								<div class="col-xs-12 col-sm-12 col-md-12"> -->
<!-- 									<select id="tipodivisionUpdate" -->
<!-- 										class=" form-control btn-circle btn-sm mayusculasWork" disabled> -->
<!-- 										<option value="">Seleccione División</option> -->
<!-- 									</select> -->
<!-- 								</div> -->
<!-- 							</div> -->
<!-- 							<div class="col-xs-6 col-sm-6 col-md-6"> -->
<!-- 								<div class="col-xs-12 col-sm-12 col-md-12"> -->
<!-- 									<h4>Subdivision</h4> -->
<!-- 								</div> -->
<!-- 								<div class="col-xs-12 col-sm-12 col-md-12"> -->
<!-- 									<select id="tiposubdivisionUpdate" -->
<!-- 										class=" form-control btn-circle btn-sm mayusculasWork" disabled> -->
<!-- 										<option value="">Seleccione Sub División</option> -->
<!-- 									</select> -->
<!-- 								</div> -->
<!-- 							</div> -->
							
<!-- 							<div class="col-xs-6 col-sm-6 col-md-6"> -->
<!-- 								<div class="col-xs-12 col-sm-12 col-md-12"> -->
<!-- 									<h4>Grupo</h4> -->
<!-- 								</div> -->
<!-- 								<div class="col-xs-12 col-sm-12 col-md-12"> -->
<!-- 									<select id="listagrupoUpdate" class=" form-control btn-circle btn-sm mayusculasWork" disabled> -->
<!-- 										<option value="">Seleccione Grupo</option> -->
<!-- 									</select> -->

<!-- 								</div> -->
<!-- 							</div> -->
<!-- 							<div class="col-xs-6 col-sm-6 col-md-6"> -->
<!-- 								<div class="col-xs-12 col-sm-12 col-md-12"> -->
<!-- 									<h4>Subgrupo</h4> -->
<!-- 								</div> -->
<!-- 								<div class="col-xs-12 col-sm-12 col-md-12"> -->
<!-- 									<select id="listasubgrupoUpdate" -->
<!-- 										class=" form-control btn-circle btn-sm mayusculasWork" disabled> -->
<!-- 										<option value="">Seleccione Sub Grupo</option> -->
<!-- 									</select> -->
<!-- 								</div> -->
<!-- 							</div> -->
							<div class="col-xs-6 col-sm-6 col-md-6">
								<div class="col-xs-12 col-sm-12 col-md-12">
									<h4>Monto</h4>
								</div>
								<div class="col-xs-12 col-sm-12 col-md-12">
						
									<input id="montoTrabajadorUpdate" type="text" name="ReAct" class="form-control input-circle number mayusculasWork" placeholder="Monto a Pagar">
								</div>
							</div>
							
							
						</div>
						<div></div>
						<div class="col-sm-12 col-md-12">
							
						
					</div>
					
					
					</div>
				
			</div>
      <div class="modal-footer">
       
        <div class="btn btn-circle blue btn-outline idupdate" id=""
								onclick="actualizarTrabajador(this.id);">
								<i class="fa fa-clock-o"></i> Actualizar
							</div>
			<div data-dismiss="modal" class="btn btn-circle red btn-outline" id="cerrarModal">Cancelar</div>
						</div>
       
      </div>
    </div>

  </div>
</div>


<br>
<br>
<br>
<br>
<br>

<div class="dragbox ui-resizable">
	<div class="dragbox-content"></div>
</div>
<p style="color:white">.</p>
<article id="loading" class="loading_dos" style="display: none;">
	<div id="modal" class="modal" style="display: block;"></div>
</article>
<p style="color:white">.</p>
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
.formatedBox{
    margin: 11px 2px 4px -11px !important;
}
.marginDefaced{
        margin-top: 25%;
}
.marginDefaced2{
    margin-top: 64% !important;
}
.width100{
    width:100%;
}
.formatedIcon{
    margin-left: -19px !important;
}
.formatedPadding{
   padding-left: 9px !important;
}
.select2-hidden-accessible {
    border: 0 !important;
    clip: rect(0 0 0 0) !important;
    height: 1px !important;
    margin: -1px !important;
    overflow: hidden !important;
    padding: 0 !important;
    position: absolute !important;
    width: 1px !important
}
.tdSociedad{
 display: none;
}
</style>

