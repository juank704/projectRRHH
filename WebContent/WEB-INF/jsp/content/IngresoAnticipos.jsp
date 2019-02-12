<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div class="w3-light-grey">
<div id="myBar" class="w3-container w3-green" style="width:0%;margin-top: 30px;height: 34px;">0%</div>
</div>    
 
<div class="col-md-12 portlet light bordered" id="todo" style="margin-top: 10px;">
    <div class=" col-md-12" style="margin-bottom: 10px;">
        <div class="row">

            <div class="col-md-4">
                <div class=" col-md-12">
                    <h4>Empresa</h4>
                </div>
                <div class="col-md-12">
                    <select id="Sociedad" class="form-control btn-circle btn-sm mayusculasWork">
                        <option value="-1">Seleccione una Empresa</option>
                    </select>
                </div>
            </div>
            <div class="col-md-4">
                <div class="col-md-12">
                    <h4>Periodo proceso</h4>
                </div>
                <div class="col-md-12">
                    <input autocomplete="off" type="text" id="periodoRemuneraciones" class="form-control btn-circle btn-sm" placeholder="Seleccione Periodo">
                </div>
            </div>
            <div class="col-md-4">
                <div class="col-md-12">
                    <h4>Fecha Anticipo</h4>
                </div>
                <div class="col-md-12">
                    <input autocomplete="off" type="text" id="fechaPago" class="form-control btn-circle btn-sm mayusculasWork" placeholder="Fecha Anticipo">
                </div>
            </div>

        </div>
        <div class="row">
            <div class="col-md-4">
                <div class="col-md-12">
                    <h4>Huerto</h4>
                </div>
                <div class="col-md-12">
                    <select id="tipodivision" class=" form-control btn-circle btn-sm mayusculasWork">
                        <option value="-1">Seleccione HUERTO</option>
                    </select>
                </div>
            </div>
            <div class="col-md-4">
                <div class="col-md-12">
                    <h4>Zona</h4>
                </div>
                <div class="col-md-12">
                    <select id="tiposubdivision" class=" form-control btn-circle btn-sm mayusculasWork">
                        <option value="-1">Seleccione ZONA</option>
                    </select>
                </div>
            </div>
            <div class="col-md-4">
                <div class="col-md-12">
                    <h4>CECO</h4>
                </div>
                <div class="col-md-12">
                    <select id="listagrupo" class=" form-control btn-circle btn-sm mayusculasWork">
                        <option value="-1">Seleccione CECO</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="row">

            <div class="col-md-4">
                <div class="col-md-12">
                    <h4>Nombre</h4>
                </div>
                <div class="col-md-12">
                    <select style="width:100%" id="nombreTrabajador" class="form-control input-sm input-circle mayusculasWork">
                        <option value='0'>Buscar</option>
                    </select>

                </div>
            </div>
            <div class="col-md-4">
                <div class="col-md-12">
                    <h4>TIPO CONTRATO</h4>
                </div>
                <div class="col-md-12">
                    <select id="tipocontratoSelect" class=" form-control btn-circle btn-sm mayusculasWork">
                        <option value="-1">SELECCIONE</option>
                    </select>
                </div>
            </div>
            <div class="col-md-4">
                <div class="col-md-12">
                    <h4>Monto</h4>
                </div>
                <div class="col-md-12">

                    <input id="montoTrabajador" type="text" name="ReAct" class="form-control input-circle number mayusculasWork" placeholder="Monto a Pagar">

                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <div class="col-md-12">
                    <h4>Fecha Contrato</h4>
                </div>
                <div class="col-md-12">
                    <select id="idContrato" class=" form-control btn-circle btn-sm mayusculasWork" disabled>

                    </select>

                </div>
            </div>
            <div class="col-md-4">
                <div class="col-md-12">

                </div>
                <div class="col-md-12">
                </div>
            </div>
            <div class="col-md-4">
                <div class="col-md-12">
                    <h4></h4>
                </div>
                <div class="col-md-12">
                    <h4>Total Monto: $<spand id="totalMonto">0</span></h4>
                </div>
            </div>

        </div>

        <div class="row" style="margin-top: 10px;">
            <div class="col-md-2"></div>
            <div class="col-md-8">
                <button class="btn btn-circle blue btn-outline idupdate" id="" onclick="agregarFila()">
                    <i class="fa fa-plus">Añadir Individual</i>
                </button>
                <button class="btn btn-circle blue btn-outline idupdate" id="addAll" onclick="addAll()">
                    <i class="fa fa-reply-all" aria-hidden="true">Añadir Todos</i>
                </button>
                <button id="addDocumento" title="Agregar" class="btn btn-circle green btn-outline" data-toggle="modal" onclick="javascript:Enviar()">
                    <i class="fa fa-floppy-o fa-lg"> Grabar</i>
                </button>
                <button data-dismiss="modal" class="btn btn-circle red btn-outline" id="cerrarModal" onclick="closeModal()">
                    <i class="fa fa-times fa-lg"> Cancelar</i>
                </button>
            </div>
            <div class="col-md-2"></div>

        </div>

    </div>

    <div class="col-md-12">
        <div class="table-responsive">
            <table class="table table-bordered table-hover tzable-striped table-condensed dataTable no-footer" id="tbl_InfoPopup" style='margin-top: 20px;'>
                <thead>
                    <tr>
                        <th>Periodo</th>
                        <th>Fecha</th>
                        <th>Cód T</th>
                        <th>Trabajador</th>
                        <th>Fecha Contrato</th>
                        <th>Tipo Trabajador</th>
                        <th>Monto Ganado</th>
                        <th>Monto</th>
                        <th>Opciones</th>
                        <th style="display: none;">Empresa</th>
                        <th>trID</th>

                    </tr>
                </thead>

                <tbody id="tblPeticion"></tbody>
            </table>
        </div>

    </div>
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

    
    