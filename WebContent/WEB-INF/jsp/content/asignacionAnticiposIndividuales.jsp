<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

    <div class="col-md-12" style="margin-top: 10px;">
        <div class="col-md-1 ">
            <label style="color: #337ab7;">Empresa:</label>
        </div>
        <div class="col-md-4 ">
            <select id="SociedadB" class=" form-control btn-circle btn-sm mayusculasWork">
                <option value="">Seleccione una Empresa</option>
            </select>
        </div>
    </div>

    <div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered" style="margin-top: 10px;">

        <div class="col-md-12 ">
            <div class="col-md-1">
                <label style="color: #337ab7;">Huerto: </label>
            </div>
            <div class="col-md-3">
                <select id="tipodivisionB" class=" form-control btn-circle btn-sm mayusculasWork">
                    <option value="">Seleccione Huerto</option>
                </select>
            </div>
            <div class="col-md-1">
                <label style="color: #337ab7;">Zona: </label>
            </div>
            <div class="col-md-3">
                <select id="tiposubdivisionB" class=" form-control btn-circle btn-sm mayusculasWork">
                    <option value="">Seleccione ZONA</option>
                </select>
            </div>
            <div class="col-md-1">
                <label style="color: #337ab7;">CECO: </label>
            </div>
            <div class="col-md-3">
                <select id="listagrupoB" class=" form-control btn-circle btn-sm mayusculasWork">
                    <option value="">Seleccione CECO</option>
                </select>
            </div>
        </div>

        <div class="col-md-12" style="margin-top: 10px;">
            <div class="col-md-1">
                <label style="color: #337ab7;">Periodo Proceso: </label>
            </div>
            <div class="col-md-3">
                <input type="text" id="periodoRemuneracionesB" class=" form-control btn-circle btn-sm mayusculasWork" placeholder="Seleccione Periodo">
            </div>

            <div class="col-md-1">
                <label style="color: #337ab7;">Fecha Anticipo: </label>
            </div>
            <div class="col-md-3">
                 <select id="fechaPagoB" class=" form-control btn-circle btn-sm mayusculasWork">
                    <option value="">Seleccione...</option>
                </select>
                
            </div>

        </div>
        <div class="col-md-12">

            <div class="col-md-6">
                <h5 class="text-center">Trabajador</h5>
                <div class="input-icon right">
                    <select id="nombreTrabajadorB" class="form-control input-sm input-circle mayusculasWork ">

                    </select>
                </div>
            </div>

            <div class="col-md-2">
                <h5>&nbsp;</h5>
                <button id="" title="buscar" class="btn btn-circle blue btn-outline" data-toggle="modal" onclick="javascript:buscarTrabajadorByParams()">
                    <i class="fa fa-search"> Buscar</i>
                </button>

            </div>

            <div class="col-md-2">
                <h5>&nbsp;</h5>
                <button id="" title="Enviar Excel" class="btn btn-circle red btn-outline" data-toggle="modal" onclick="EnviarExcel()">
                    <i class="fa fa-plus"> Envio de Anticipos</i>
                </button>
            </div>

            <div class="col-md-2">
                <h5>&nbsp;</h5>
                <button id="generar" title="Generar Excel" class="btn btn-circle blue btn-outline" data-toggle="modal" onclick="generarArchivo();">
                    <i class="fa fa-plus"> Generar Excel</i>
                </button>
            </div>

        </div>
    </div>
    <br>

    <div class="table-responsive2">
        <div class="row">
            <div class="col-md-4"></div>
            <div class="col-md-4">
                <p style="text-align: center;">Resultado Busqueda</p>
            </div>
            <div class="col-md-4">
                <p style="text-align: center;">Total $ <span id="totalpreselec">0</span></p>
            </div>
        </div>

        <table class="table table-bordered table-hover tzable-striped table-condensed dataTable no-footer" id="tbl_Info2">

            <thead>
                <tr>

                    <th>Fecha</th>
                    <th>Cód T</th>
                    <th>Trabajador</th>
                    <th>Monto</th>
                    <th>rut</th>
                    <th>tipo_cuenta</th>
                    <td>numero cuenta</td>
                    <td>nombre banco</td>
                    <td>rut empresa</td>
                    <td>Huerto</td>
                    <td>ceco</td>

                    <!-- 				<th style='text-align: center;'>Opciones</th> -->

                </tr>
            </thead>
            <tbody id="tblPeticion2"></tbody>
        </table>
    </div>

    <p style="color:white">.</p>
    


<!--         <div class="modal-dialog"> -->

<!--             Modal content -->
<!--             <div class="modal-content"> -->
<!--                 <div class="modal-header"> -->
<!--                     <button type="button" class="close" data-dismiss="modal">&times;</button> -->
<!--                     <h4 class="modal-title">Actualizar</h4> -->
<!--                 </div> -->
<!--                 <div class="modal-body"> -->
<!--                     <div class="swal2-content"> -->
<!--                         <div id="swal2-content" style="display: block;"> -->
<!--                             <div class="col-xs-12 col-sm-12 col-md-12" style="margin-bottom: 10px;"> -->
<!--                                 <div class="col-xs-6 col-sm-6 col-md-6"> -->
<!--                                     <div class="col-xs-12 col-sm-12 col-md-12"> -->
<!--                                         <h4>Codigo Trabajador</h4> -->
<!--                                     </div> -->
<!--                                     <div class="col-xs-12 col-sm-12 col-md-12"> -->
<!--                                         <input type="text" class="form-control mayusculasWork" id="cod_trabUpdate" value="" disabled=""> -->
<!--                                     </div> -->
<!--                                 </div> -->
<!--                                 <div class="col-xs-6 col-sm-6 col-md-6"> -->
<!--                                     <div class="col-xs-12 col-sm-12 col-md-12"> -->
<!--                                         <h4>Nombre</h4> -->
<!--                                     </div> -->
<!--                                     <div class="col-xs-12 col-sm-12 col-md-12"> -->
<!--                                         <input type="text" class="form-control mayusculasWork" id="nombre_trabUpdate" value="" disabled=""> -->
<!--                                     </div> -->
<!--                                 </div> -->
<!--                                 <div class="col-xs-6 col-sm-6 col-md-6"> -->
<!--                                     <div class="col-xs-12 col-sm-12 col-md-12"> -->
<!--                                         <h4>Periodo proceso</h4> -->
<!--                                     </div> -->
<!--                                     <div class="col-xs-12 col-sm-12 col-md-12"> -->
<!--                                         <input type="month" id="periodoRemuneracionesUpdate" class="btn blue btn-outline btn-circle btn-sm mayusculasWork"> -->
<!--                                     </div> -->
<!--                                 </div> -->
<!--                                 <div class="col-xs-6 col-sm-6 col-md-6"> -->
<!--                                     <div class="col-xs-12 col-sm-12 col-md-12"> -->
<!--                                         <h4>Fecha Anticipo</h4> -->
<!--                                     </div> -->
<!--                                     <div class="col-xs-12 col-sm-12 col-md-12"> -->
<!--                                         <input type="date" id="fechaPagoUpdate" class="btn blue btn-outline btn-circle btn-sm mayusculasWork"> -->
<!--                                     </div> -->
<!--                                 </div> -->
<!--                                 <div class="col-xs-6 col-sm-6 col-md-6"> -->
<!--                                     <div class="col-xs-12 col-sm-12 col-md-12"> -->
<!--                                         <h4>Empresa</h4> -->
<!--                                     </div> -->
<!--                                     <div class="col-xs-12 col-sm-12 col-md-12"> -->
<!--                                         <select id="SociedadUpdate" class=" form-control btn-circle btn-sm mayusculasWork" disabled> -->
<!--                                             <option value="">Seleccione una Empresa</option> -->
<!--                                         </select> -->
<!--                                     </div> -->
<!--                                 </div> -->
<!--                                 <div class="col-xs-6 col-sm-6 col-md-6"> -->
<!--                                     <div class="col-xs-12 col-sm-12 col-md-12"> -->
<!--                                         <h4>Huerto</h4> -->
<!--                                     </div> -->
<!--                                     <div class="col-xs-12 col-sm-12 col-md-12"> -->
<!--                                         <select id="tipodivisionUpdate" class=" form-control btn-circle btn-sm mayusculasWork" disabled> -->
<!--                                             <option value="-1">Seleccione HUERTO</option> -->
<!--                                         </select> -->
<!--                                     </div> -->
<!--                                 </div> -->
<!--                                 <div class="col-xs-6 col-sm-6 col-md-6"> -->
<!--                                     <div class="col-xs-12 col-sm-12 col-md-12"> -->
<!--                                         <h4>Zona</h4> -->
<!--                                     </div> -->
<!--                                     <div class="col-xs-12 col-sm-12 col-md-12"> -->
<!--                                         <select id="tiposubdivisionUpdate" class=" form-control btn-circle btn-sm mayusculasWork" disabled> -->
<!--                                             <option value="-1">Seleccione ZONA</option> -->
<!--                                         </select> -->
<!--                                     </div> -->
<!--                                 </div> -->

<!--                                 <div class="col-xs-6 col-sm-6 col-md-6"> -->
<!--                                     <div class="col-xs-12 col-sm-12 col-md-12"> -->
<!--                                         <h4>CECO</h4> -->
<!--                                     </div> -->
<!--                                     <div class="col-xs-12 col-sm-12 col-md-12"> -->
<!--                                         <select id="listagrupoUpdate" class=" form-control btn-circle btn-sm mayusculasWork" disabled> -->
<!--                                             <option value="">Seleccione CECO</option> -->
<!--                                         </select> -->

<!--                                     </div> -->
<!--                                 </div> -->
<!--                                 <div class="col-xs-6 col-sm-6 col-md-6"> -->
<!--                                     <div class="col-xs-12 col-sm-12 col-md-12"> -->
<!--                                         <h4>Subgrupo</h4> -->
<!--                                     </div> -->
<!--                                     <div class="col-xs-12 col-sm-12 col-md-12"> -->
<!--                                         <select id="listasubgrupoUpdate" class=" form-control btn-circle btn-sm mayusculasWork" disabled> -->
<!--                                             <option value="">Seleccione Sub Grupo</option> -->
<!--                                         </select> -->
<!--                                     </div> -->
<!--                                 </div> -->
<!--                                 <div class="col-xs-6 col-sm-6 col-md-6"> -->
<!--                                     <div class="col-xs-12 col-sm-12 col-md-12"> -->
<!--                                         <h4>Monto</h4> -->
<!--                                     </div> -->
<!--                                     <div class="col-xs-12 col-sm-12 col-md-12"> -->

<!--                                         <input id="montoTrabajadorUpdate" type="text" name="ReAct" class="form-control input-circle number mayusculasWork" placeholder="Monto a Pagar"> -->
<!--                                     </div> -->
<!--                                 </div> -->

<!--                             </div> -->
<!--                             <div></div> -->
<!--                             <div class="col-sm-12 col-md-12"> -->

<!--                             </div> -->

<!--                         </div> -->

<!--                     </div> -->
<!--                     <div class="modal-footer"> -->

<!--                         <div class="btn btn-circle blue btn-outline idupdate" id="" onclick="actualizarTrabajador(this.id);"> -->
<!--                             <i class="fa fa-clock-o"></i> Actualizar -->
<!--                         </div> -->
<!--                         <div data-dismiss="modal" class="btn btn-circle red btn-outline" id="cerrarModal">Cancelar</div> -->
<!--                     </div> -->

<!--                 </div> -->
<!--             </div> -->

<!--         </div> -->


    <div class="dragbox ui-resizable">
        <div class="dragbox-content"></div>
    </div>
    <p style="color:white">.</p>
    <article id="loading" class="loading_dos" style="display: none;">
        <div id="modal" class="modal" style="display: block;"></div>
    </article>
    <p style="color:white">.</p>

    <style>
        .noShadowNoRadius {
            box-shadow: none;
        }
        
        .noRadius {
            box-shadow: none;
            border-radius: 0px;
        }
        
        .noBorder {
            border: none;
        }
        
        .text-right {
            text-align: right;
        }
        
        .text-left {
            text-align: left;
        }
        
        .padding-top-5 {
            padding-top: 5px;
        }
        
        .title-padding {
            padding-top: 2%;
            padding-left: 2.5%;
        }
        
        .form-fix {
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
        
        .btn-fixed-m {
            position: absolute;
            top: 0;
            left: 40%;
            height: 2.4em;
        }
        
        .formatedBox {
            margin: 11px 2px 4px -11px !important;
        }
        
        .marginDefaced {
            margin-top: 25%;
        }
        
        .marginDefaced2 {
            margin-top: 64% !important;
        }
        
        .width100 {
            width: 100%;
        }
        
        .formatedIcon {
            margin-left: -19px !important;
        }
        
        .formatedPadding {
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
        
        .tdSociedad {
            display: none;
        }
    </style>