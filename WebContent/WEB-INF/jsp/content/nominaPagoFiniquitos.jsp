<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div class="modal fade" id="generarArchivoPlano" tabindex="-1" role="dialog" aria-labelledby="generarArchivoPlano" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content noRadius">
    
		<div class="modal-body">
        	<form class="form-horizontal form-fix noRadius noBorder" id="formaPagoForm" role="form">
				<div class="form-body">
							<input type="text" class="form-control noRadius hide" id="generarArchivoPlanoId" name="generarArchivoPlanoId" placeholder="id"> 
					<div class="form-group">
						<label class="col-md-3 control-label">Forma de Pago</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="formaDePago" name="formaDePago" placeholder="Forma De Pago"> 
						</div>
					</div>						
                   	<div class="form-group">
						<label class="col-md-3 control-label">Tipo de Endoso</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="tipoDeEndoso" name="tipoDeEndoso" placeholder="Tipo De Endoso" disabled> 
						</div>
					</div>	
					<div class="form-group">
						<label class="col-md-3 control-label">Descripción</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="Descripcion" name="Descripcion" placeholder="Descripción" disabled> 
						</div>
					</div>	
                    <div class="form-group">
						<label class="col-md-3 control-label">Ruta de Descarga</label>
						<div class="col-md-9">
							<input type="text" class="form-control noRadius" id="Ruta de Descarga" name="Ruta de Descarga" placeholder="Ruta de Descarga" disabled> 
						</div>
					</div>
                   		
				
					<div class="form-actions right1">
						<button type="button" class="btn default" data-dismiss="modal">Cancelar</button>
						<button type="submit" class="btn green" id="submitFormaDePago">Aceptar</button>
					</div>
				</div>
			</form>	
      </div>
	  
    </div>
  </div>
</div> 

<h3>Generar Nóminas De Pago Finiquitos</h3>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">

    <div class="col-xs-12 col-sm-12 col-md-12">
        <h4>Filtros</h4>
            
            <div class="col-xs-12 col-sm-4 col-md-4">
                    <h5 class="text-center">Periodo Remuneraciones</h5>
                <div class="col-xs-12 col-sm-12 col-md-12 text-center">
                    <input type="month" id="periodoRemuneraciones" class="btn blue btn-outline btn-circle btn-sm">
                </div>
            </div>
            <div class="col-xs-12 col-sm-4 col-md-4">
                    <h5 class="text-center">Fecha Operación</h5>
                <div class="col-xs-12 col-sm-12 col-md-12 text-center">
                     <input type="date" id="fechaOperacion" class="btn blue btn-outline btn-circle btn-sm">
                </div>
                                
            </div>
            <div class="col-xs-12 col-sm-4 col-md-4 text-center">
                   <h5 class="text-center">Fecha Pago</h5>
                <div class="col-xs-12 col-sm-12 col-md-12 ">
                     <input type="date" id="fechaPago" class="btn blue btn-outline btn-circle btn-sm">
                </div>
            </div>    
    </div> 
    <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="col-xs-12 col-sm-4 col-md-4 text-center">
            <h5 class="text-center">Tipo de Pago</h5>
                <div class="col-xs-12 col-sm-12 col-md-12 ">

                    <div class="form-group text-center">
                       
                        
                        <div class="mt-radio-list col-xs-12 col-sm-6 col-md-6 col-sm-offset-3 col-md-offset-3  text-center">
                            <label class="mt-radio"> Liquidación
                                <input type="radio" value="1" name="test" />
                                <span></span>
                            </label>
                            <label class="mt-radio"> Finiquito
                                <input type="radio" value="1" name="test" />
                                <span></span>
                            </label>
                            
                        </div>
                        
                    </div>
                </div>          
            </div>
             <div class="col-xs-12 col-sm-4 col-md-4 text-center">
                    <h5 class="text-center">Tipo Cuenta</h5>
                <div class="col-xs-12 col-sm-12 col-md-12">
                       <select id="selectTipoCuenta" class="row_dataCuenta form-control input-circle" edit-type="click" name="selectTipoCuenta">
                                <option value="">Seleccione...</option>
                                <option value="0">Corriente</option>
                                <option value="1">Ahorro</option>
                                <option value="2">Vista</option>
                                <option value="3">rut</option>
                        </select>
                </div>
                
                                
            </div>
            <div class="col-xs-12 col-sm-4 col-md-4">
                <h5 class="text-center">Monto Total Operación</h5>
                <div class="col-xs-12 col-sm-12 col-md-12 ">
					<div class="input-icon col-md-offset-2 col-xs-8 col-sm-8 col-md-8 ">
                        <i class="fa fa-dollar font-green formatedBox"></i>
                    	<input type="text" name="nombre" id="nombre" class="form-control blue input-circle" placeholder="Monto Total">
					</div>
                </div>
            </div>    
    </div>
    <div class="col-xs-12 col-sm-12 col-md-12">
           <div class="col-xs-12 col-sm-2 col-md-2">
                    <h5 class="text-center">Empresa</h5>
                
                     <select id="selectTipoCuenta" class="row_dataCuenta form-control input-circle" edit-type="click" name="selectTipoCuenta">
                                <option value="">Seleccione...</option>
                                <option value="0">Empresa A</option>
                                <option value="1">Empresa B</option>
                                <option value="2">Empresa C</option>
                                <option value="3">Empresa D</option>
                        </select>
                         
            </div>
            <div class="col-xs-12 col-sm-2 col-md-2">
                    <h5 class="text-center">División</h5>
               
                     <select id="selectTipoCuenta" class="row_dataCuenta form-control input-circle" edit-type="click" name="selectTipoCuenta">
                                <option value="">Seleccione...</option>
                                <option value="0">División A</option>
                                <option value="1">División B</option>
                                <option value="2">División C</option>
                                <option value="3">División D</option>
                        </select>
                        
            </div>
             <div class="col-xs-12 col-sm-2 col-md-2">
                    <h5 class="text-center">Subdivisión</h5>
               
                     <select id="selectTipoCuenta" class="row_dataCuenta form-control input-circle" edit-type="click" name="selectTipoCuenta">
                                <option value="">Seleccione...</option>
                                <option value="0">Subdivisión A</option>
                                <option value="1">Subdivisión B</option>
                                <option value="2">Subdivisión C</option>
                                <option value="3">Subdivisión D</option>
                        </select>
                         
            </div>
             <div class="col-xs-12 col-sm-2 col-md-2">
                    <h5 class="text-center">Grupo</h5>
               
                     <select id="selectTipoCuenta" class="row_dataCuenta form-control input-circle" edit-type="click" name="selectTipoCuenta">
                                <option value="">Seleccione...</option>
                                <option value="0">Grupo A</option>
                                <option value="1">Grupo B</option>
                                <option value="2">Grupo C</option>
                                <option value="3">Grupo D</option>
                        </select>
                     
            </div>
             <div class="col-xs-12 col-sm-2 col-md-2">
                    <h5 class="text-center">Subgrupo</h5>
               
                     <select id="selectTipoCuenta" class="row_dataCuenta form-control input-circle" edit-type="click" name="selectTipoCuenta">
                                <option value="">Seleccione...</option>
                                <option value="0">Subgrupo A</option>
                                <option value="1">Subgrupo B</option>
                                <option value="2">Subgrupo C</option>
                                <option value="3">Subgrupo D</option>
                        </select>
                         
            </div>
             <div class="col-xs-12 col-sm-2 col-md-2">
                    <h5 class="text-center">Banco</h5>
               
                     <select id="selectTipoCuenta" class="row_dataCuenta form-control input-circle" edit-type="click" name="selectTipoCuenta">
                                <option value="">Seleccione...</option>
                                <option value="0">Banco A</option>
                                <option value="1">Banco B</option>
                                <option value="2">Banco C</option>
                                <option value="3">Banco D</option>
                        </select>
                         
            </div>
               
    </div>
</div>

<br>	
<div id="divCierre" class="col-xs-12 col-sm-12">
	<div class="table-responsive" id="ignore">
		<table class="table table-bordered table-hover table-striped table-condensed" id="tbl_doc">
			<thead>  
			      <tr>        
					<th class="text-center"><input type="checkbox" disabled id="inlineCheckbox2" value="option2" checked></th>
					<th class="text-center">Fecha</th>
					<th class="text-center">Cód T</th>
	                <th class="text-center">Trabajador</th>                
					<th class="text-center">Banco</th>
					<th class="text-center">N° Cuenta</th>
	                <th class="text-center">Tipo Cta</th>
                    <th class="text-center">Tipo Monto</th>
					<th class="text-center">Acciones</th>
                </tr>
			</thead>
			
			<tbody id="tblBodyDocuments">
             <tr>        
					<th class="text-center"><input type="checkbox" disabled id="inlineCheckbox2" value="option2" checked></th>
					<th class="text-center">Fecha</th>
					<th class="text-center">Cód T</th>
	                <th class="text-center">Trabajador</th>                
					<th class="text-center">Banco</th>
					<th class="text-center">N° Cuenta</th>
	                <th class="text-center">Tipo Cta</th>
                    <th class="text-center">Tipo Monto</th>
					<th class="text-center">Acciones</th>
                </tr>
                 <tr>        
					<th class="text-center"><input type="checkbox" disabled id="inlineCheckbox2" value="option2" checked></th>
					<th class="text-center">Fecha</th>
					<th class="text-center">Cód T</th>
	                <th class="text-center">Trabajador</th>                
					<th class="text-center">Banco</th>
					<th class="text-center">N° Cuenta</th>
	                <th class="text-center">Tipo Cta</th>
                    <th class="text-center">Tipo Monto</th>
					<th class="text-center">Acciones</th>
                </tr>
            
            </tbody>

		</table>
	</div>
</div>
<div class="col-xs-12 col-sm-12 col-md-12 portlet light bordered">

    <div class="col-xs-12 col-sm-12 col-md-12">
           <div class="col-xs-12 col-sm-4 col-md-4 text-center">
                   <button id="addDocumento" title="Agregar" class="btn btn-circle green btn-outline" data-toggle="modal" onclick="javascript:agregarDocumentoNuevo()">
			<i class="fa fa-plus"></i> Generar Reporte Desgloce
		</button>
            </div>
            <div class="col-xs-12 col-sm-4 col-md-4 text-center">
                    <button id="addDocumento" title="Agregar" class="btn btn-circle yellow btn-outline" data-toggle="modal" onclick="javascript:agregarDocumentoNuevo()">
			<i class="fa fa-plus"></i> Generar voucher a Nómina De Pago
		</button>
            </div>
             <div class="col-xs-12 col-sm-4 col-md-4 text-center">
                      <button id="addDocumento" title="Agregar" class="btn btn-circle red btn-outline" data-toggle="modal" onclick="javascript:agregarDocumentoNuevo()">
			<i class="fa fa-plus"></i> Generar Archivo Plano
		</button>   
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

</style>

