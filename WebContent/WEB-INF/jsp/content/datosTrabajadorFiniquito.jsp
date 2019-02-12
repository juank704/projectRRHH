<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%-- <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%> --%>
<%-- <%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%> --%>

<div class="row">
	<div class="col-md-12 table-responsive">
		<h4 style="text-align: center;">Datos Basicos del trabajador</h4>
		<table
			class="table table-bordered table-hover table-striped table-condensed"
			id="datatable_ajax">
			<thead>
				<tr>
					<th>Rut</th>
					<th>Nombre</th>
					<th>Empresa Actual</th>
					<th>Fecha Ingreso</th>
					<th>Fecha Termino</th>
					<th>Tipo Contrato</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody id="bodyFiniquito">
					<tr>
	                    <td id="rut_trabajador"></td>
	                    <td id="nombre_trabajador"></td>
	                    <td id="sociedad_trabajador"></td>
	                    <td id="FechaI_trabajador"></td>
	                    <td id="FechaT_trabajador"></td>
	                    <td id="des_tipoContrato"></td>
	                    <td><a id="detCol" onclick="javascript: detCol('${trabajador.id}')" title="Detalles" class="btn btn-circle blue btn-outline btn-sm"><i class="fa fa-eye fa-lg"></i></a></td>
	                </tr>
			</tbody>
		</table>
	</div>
</div>

<h4 style="text-align: center;">Finiquito</h4>

<form id="finiquitoForm" style="width: 100%; margin: auto;" action="#">
	<input type="hidden" id="sueldoBase" name="sueldoBase" value="" />
	<input type="hidden" id="numAnosService" name="numAnosService" value="" />
	<input type="hidden" id="feriadosProp" name="feriadosProp" value="" />
	<input type="hidden" id="topePagoFiniquito" name="topePagoFiniquito" value="" />
	<div class=row>
		<div class="col-md-2"></div>
		<div class="col-md-12 table-responsive">
			<div class="col-xs-12 col-sm-6 col-md-6 ">
				<label style="color: #337ab7;" for="rutBuss">Fecha de Termino:</label> 
				<input  id="fechaTermino" name="fechaTermino" type="text" class="form-control input-circle" value ="">
			</div>
			<div class="col-xs-12 col-sm-6 col-md-6 ">
				<label style="color: #337ab7;" for="articuloBuss">Artículo:</label>
				<select id="articulo" name="articulo" class="form-control input-circle"></select>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-6 ">
				<label style="color: #337ab7;" for="incisoBuss">Inciso:</label> 
				<select id="inciso" name="inciso" class="form-control input-circle"></select>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-6">
				<label style="color: #337ab7;" for="letraBuss">Letra:</label> 
				<select id="letra" name="letra" class="form-control input-circle"></select>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-12">
				<label style="color: #337ab7;" for="descripcionBuss">Descripcion:</label>
				<textarea id="descripcion" class="form-control input-circle" rows="5" name="descripcion"></textarea>
			</div>
		</div>
		<div class="col-md-2"></div>
	</div>
	
	<h4 id="label_mes_aviso" style="text-align: center;">Mes de Aviso</h4>
	
	<div class="col-md-12 table-responsive">
		<div class="col-xs-12 col-sm-6 col-md-6 ">
			<div class="col-xs-12 col-sm-6 col-md-6 "style="visibility:hidden">
				<label></label> 
				<input type="text" class="form-control input-circle">
			</div>
		</div>
		<div class="col-md-2"></div>
	</div>
	
	<div class=row>
		<div class="col-md-2"></div>
			<div class="col-md-12 table-responsive">
				<table class="table table-bordered table-hover table-striped table-condensed" id="calculo-finiquito-aviso">
					<thead>
						<tr>
							<th style="width: 30%;">Item</th>
							<th>Mes 1</th>
							<th>Mes 2</th>
							<th>Mes 3</th>
							<th style="width: 30%;">Promedio</th>
						</tr>
					</thead>
					<tbody id="body-calculo-finiquito-aviso">
						
							
								<tr>
				                    <td id="item">SUELDO</td>
				                    <td><input readonly="" type="text" id="mes1" class="form-control" value="0"></td>
				                    <td><input readonly="" type="text" id="mes2" class="form-control" value="0"></td>
				                    <td><input readonly="" type="text" id="mes3" class="form-control" value="0"></td>
				                    <td>
				                    	<div class="input-group">
										  <span class="input-group-addon">$</span>
										    <input type="text" class="form-control number" id="promedioAvisoSueldo" class="form-control" value=""/>
										</div>
				                    </td>
				                </tr>
				                <tr>
				                    <td id="item">ASIGNACIONES IMPONIBLES</td>
				                    <td><input readonly="" type="text" id="mes21" class="form-control" value="0"></td>
				                    <td><input readonly="" type="text" id="mes22" class="form-control" value="0"></td>
				                    <td><input readonly="" type="text" id="mes23" class="form-control" value="0"></td>
				                    <td>
				                    	<div class="input-group">
										  <span class="input-group-addon">$</span>
										    <input type="text" class="form-control number" id="promedioAvisoAsigInpo" class="form-control" value=""/>
										</div>
				                    </td>
				                </tr>
				                <tr>
				                    <td id="item">GRATIFICACION</td>
				                    <td><input readonly="" type="text" id="mes31" class="form-control" value="0"></td>
				                    <td><input readonly="" type="text" id="mes32" class="form-control" value="0"></td>
				                    <td><input readonly="" type="text" id="mes33" class="form-control" value="0"></td>
				                    <td>
				                    	<div class="input-group">
										  <span class="input-group-addon">$</span>
										    <input type="text" class="form-control number" id="promedioAvisoGrati" class="form-control" value=""/>
										</div>
				                    </td>
				                </tr>	
				                <tr>
				                    <td id="item">ASIGNACIONES NO IMPONIBLES</td>
				                    <td><input readonly="" type="text" id="mes41" class="form-control" value="0"></td>
				                    <td><input readonly="" type="text" id="mes42" class="form-control" value="0"></td>
				                    <td><input readonly="" type="text" id="mes43" class="form-control" value="0"></td>
				                    <td>
				                    	<div class="input-group">
										  <span class="input-group-addon">$</span>
										    <input type="text" class="form-control number" id="promedioAvisoNoimponible" class="form-control" value=""/>
										</div>
				                    </td>
				                </tr>					
	                     
	                        <tr>
			                    <td>TOTAL ITEM</td>
			                    <td/>
			                    <td/>
			                    <td/>
			                    <td>
									<div class="input-group">
									  <span class="input-group-addon">$</span>
									    <input readonly type="text" id="promedioTotalAviso" class="form-control number" value=""/>
									</div>
								</td>
			                </tr>	
		            
					</tbody>
				</table>
			</div>
		<div class="col-md-2"></div>
	</div>
	
	<div class=row>
		<div class="col-md-2"></div>
		<div class="col-md-12" style="text-align: center;">
			<div class="col-md-12 table-responsive"  id="divPagoMesAviso">
				<div class="col-xs-12 col-sm-3 col-md-3 " id="aviso30">
					<label>Aviso con 30 Días&nbsp;&nbsp;</label>
					<input type="checkbox" id="sinAviso" class="input-circle" name="aviso">
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 ">
					<label style="color: #337ab7;" for="pagoMesAvisoBuss">Valor Mes de aviso: (1 Sueldo)</label> 
					<input readonly id="pagoMesAviso" name="pagoMesAviso" type="text" class="form-control input-circle" value ="0">
				</div>
				<div class="col-xs-12 col-sm-3 col-md-3 ">
					<label>Con tope&nbsp;&nbsp;</label>
					<input type="checkbox" id="topeMesAviso" class="input-circle">
					<br><label id="valorTopeAviso">$ 0 </label>
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 "style="visibility:hidden">
					<label></label> 
					<input type="text" class="form-control input-circle">
				</div>
			</div>
		</div>
		<div class="col-md-2"></div>
		<div class="col-md-2"></div><br><br>
	</div>
	<h4 id="label_anio_servicio" style="text-align: center;">Años de Servicio</h4>
	<div class=row>
		<div class="col-md-2"></div>
			<div class="col-md-12 table-responsive">
				<table class="table table-bordered table-hover table-striped table-condensed" id="calculo-finiquito-servicios">
					<thead>
						<tr>
							<th style="width: 30%;">Item</th>
							<th>Mes 1</th>
							<th>Mes 2</th>
							<th>Mes 3</th>
							<th style="width: 30%;">Promedio</th>
						</tr>
					</thead>
					<tbody id="body-calculo-finiquito-servicios">
						<tr>
				                    <td id="item">SUELDO</td>
				                    <td><input readonly="" type="text" id="mes51" class="form-control" value="0"></td>
				                    <td><input readonly="" type="text" id="mes52" class="form-control" value="0"></td>
				                    <td><input readonly="" type="text" id="mes53" class="form-control" value="0"></td>
				                    <td>
				                    	<div class="input-group">
										  <span class="input-group-addon">$</span>
										    <input type="text" class="form-control number" id="promedioAvisoSueldo2" class="form-control" value=""/>
										</div>
				                    </td>
				                </tr>
				                <tr>
				                    <td id="item">ASIGNACIONES IMPONIBLES</td>
				                    <td><input readonly="" type="text" id="mes61" class="form-control" value="0"></td>
				                    <td><input readonly="" type="text" id="mes62" class="form-control" value="0"></td>
				                    <td><input readonly="" type="text" id="mes63" class="form-control" value="0"></td>
				                    <td>
				                    	<div class="input-group">
										  <span class="input-group-addon">$</span>
										    <input type="text" class="form-control number" id="promedioAvisoAsigInpo2" class="form-control" value=""/>
										</div>
				                    </td>
				                </tr>
				                <tr>
				                    <td id="item">GRATIFICACION</td>
				                    <td><input readonly="" type="text" id="mes71" class="form-control" value="0"></td>
				                    <td><input readonly="" type="text" id="mes72" class="form-control" value="0"></td>
				                    <td><input readonly="" type="text" id="mes73" class="form-control" value="0"></td>
				                    <td>
				                    	<div class="input-group">
										  <span class="input-group-addon">$</span>
										    <input type="text" class="form-control number" id="promedioAvisoGrati2" class="form-control" value=""/>
										</div>
				                    </td>
				                </tr>	
				                <tr>
				                    <td id="item">ASIGNACIONES NO IMPONIBLES</td>
				                    <td><input readonly="" type="text" id="mes81" class="form-control" value="0"></td>
				                    <td><input readonly="" type="text" id="mes82" class="form-control" value="0"></td>
				                    <td><input readonly="" type="text" id="mes83" class="form-control" value="0"></td>
				                    <td>
				                    	<div class="input-group">
										  <span class="input-group-addon">$</span>
										    <input type="text" class="form-control number" id="promedioAvisoNoimponible2" class="form-control" value=""/>
										</div>
				                    </td>
				                </tr>					
	                        <tr>
			                    <td>TOTAL ITEM</td>
			                    <td/>
			                    <td/>
			                    <td/>
			                    <td>
									<div class="input-group">
									  <span class="input-group-addon">$</span>
									    <input readonly type="text" id="promedioTotalAviso2" class="form-control number" value=""/>
									</div>
								</td>
			                </tr>	
		                
					</tbody>
				</table>
			</div>
		<div class="col-md-2"></div>
	</div>
	
	<div id="anio_valor" class=row>
		<div class="col-md-2"></div>
		<div class="col-md-12 table-responsive">
			<div class="col-xs-12 col-sm-3 col-md-3 "style="visibility:hidden">
				<label></label> 
				<input type="text" class="form-control input-circle">
			</div>
			<div class="col-xs-12 col-sm-6 col-md-6 ">
				<label style="color: #337ab7;" for="anioServicioBuss" id="aniosServicio">Valor Años servicio: ()</label> 
				<label id="aniosServicio2" style="display:none">0</label>
				<input readonly id="anioServicio" name="anioServicio" type="text" class="form-control input-circle" value ="0">
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3 ">
				<label>Con tope&nbsp;&nbsp;</label>
				<input type="checkbox" id="topeAnoServicio" class="input-circle">
				<br><label id="valorTopeAnoServicio">$ 0 </label>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-6 "style="visibility:hidden">
				<label></label> 
				<input type="text" class="form-control input-circle">
			</div>
		</div>
		<div class="col-md-2"></div>
		<div class="col-md-2"></div><br><br>
	</div>
	<h4 style="text-align: center;">Feriado Proporcional</h4>
	
	<div class=row>
		<div class="col-md-2"></div>
			<div class="col-md-12 table-responsive">
				<table class="table table-bordered table-hover table-striped table-condensed" id="calculo-finiquito-feriados">
					<thead>
						<tr>
							<th style="width: 30%;">Item</th>
							<th>Mes 1</th>
							<th>Mes 2</th>
							<th>Mes 3</th>
							<th style="width: 30%;">Promedio</th>
						</tr>
					</thead>
					<tbody id="body-calculo-finiquito-feriados">
						<tr>
				                    <td id="item">SUELDO</td>
				                    <td><input readonly="" type="text" id="mes91" class="form-control" value="0"></td>
				                    <td><input readonly="" type="text" id="mes92" class="form-control" value="0"></td>
				                    <td><input readonly="" type="text" id="mes93" class="form-control" value="0"></td>
				                    <td>
				                    	<div class="input-group">
										  <span class="input-group-addon">$</span>
										    <input type="text" class="form-control number"  id="promedioAvisoSueldo3" class="form-control" value=""/>
										</div>
				                    </td>
				                </tr>
				                <tr>
				                    <td id="item">ASIGNACIONES IMPONIBLES</td>
				                    <td><input readonly="" type="text" id="mes101" class="form-control" value="0"></td>
				                    <td><input readonly="" type="text" id="mes102" class="form-control" value="0"></td>
				                    <td><input readonly="" type="text" id="mes103" class="form-control" value="0"></td>
				                    <td>
				                    	<div class="input-group">
										  <span class="input-group-addon">$</span>
										    <input type="text" class="form-control number" id="promedioAvisoAsigInpo3" class="form-control" value=""/>
										</div>
				                    </td>
				                </tr>
				                <tr>
				                    <td id="item">Otros</td>
				                    <td></td>
				                    <td></td>
				                    <td></td>
				                    <td>
				                    	<div class="input-group">
										  <span class="input-group-addon">$</span>
										    <input type="text" class="form-control number" id="promedioAvisoNoimponible3" class="form-control" value=""/>
										</div>
				                    </td>
				                </tr>					
	                        <tr>
			                    <td>TOTAL ITEM</td>
			                    <td/>
			                    <td/>
			                    <td/>
			                    <td>
									<div class="input-group">
									  <span class="input-group-addon">$</span>
									    <input readonly type="text" id="promedioTotalAviso3" class="form-control number" value=""/>
									</div>
								</td>
			                </tr>	
					</tbody>
				</table>
			</div>
		<div class="col-md-2"></div>
	</div>
	
	<div class=row>
		<div class="col-md-2"></div>
		<div class="col-md-12 table-responsive">
			<div class="col-xs-12 col-sm-3 col-md-3 "style="visibility:hidden">
				<label></label> 
				<input type="text" class="form-control input-circle">
			</div>
			<div class="col-xs-12 col-sm-6 col-md-6 ">
				<label style='color: #337ab7' for='feriadosProporcionalesBuss'>Valor Feriado proporcional: <span id="valorProporcionales">0</span> <span id="valorProporcionales2" style="display:none">0</span></label> 
				<input readonly id="feriadosProporcionales" name="feriadosProporcionales" type="text" class="form-control input-circle" value ="0">
			</div>
			
			<div class="col-xs-12 col-sm-6 col-md-6 "style="visibility:hidden">
				<label></label> 
				<input type="text" class="form-control input-circle">
			</div>
		</div>
		<div class="col-md-2"></div>
		<div class="col-md-2"></div><br><br>
	</div>
	
			<div class="col-md-12 table-responsive">
				<table class="table table-bordered table-hover table-striped table-condensed" id="calculo-finiquito-feriados">
					<thead>
						<tr>
							<th style="text-align: center;">Feriado Básico</th>
							<th style="width: 14%;text-align: center;">Feriado Progresivo</th>
							<th style="width: 16%;text-align: center;">Feriado Convencional</th>
							<th style="text-align: center;">Subtotal</th>
							<th style="text-align: center;">Días Tomado</th>
							<th style="text-align: center;">Saldo disponible</th>
							<th style="text-align: center;">Días Inhábiles</th>
							<th>Total Días</th>
						</tr>
					</thead>
					<tbody id="body-calculo-finiquito-feriados">
						<tr>
		                    <td><input type="number" id="f_b" class="form-control" onchange="setTwoNumberDecimal" min="0"  step="0.01" value="0"></td>
				            <td><input type="number" id="f_p" class="form-control" onchange="setTwoNumberDecimal" min="0"  step="0.01" value="0"></td>
				            <td><input type="number" id="f_c" class="form-control" onchange="setTwoNumberDecimal" min="0"  step="0.01" value="0"></td>
				            <td><input readonly type="number" id="totalbpc" class="form-control" onchange="setTwoNumberDecimal" min="0"  step="0.01" value="0"></td>
				            <td><input type="number" id="diastomado" class="form-control" value="0"></td>
				            <td><input readonly type="number" id="subtotal" class="form-control" onchange="setTwoNumberDecimal" min="0"  step="0.01" value="0"></td>
				            <td><input readonly type="number" id="d_i" class="form-control" onchange="setTwoNumberDecimal" min="0"  step="0.01" value="0"></td>
				            <td><input readonly type="number" id="t_grupo" class="form-control" value="0"></td>
				         </tr>
					</tbody>
				</table>
				
			</div>
			
			<div class=row>
				<div class="col-md-10"></div>
				<div class="col-md-2" id="btn_apli_rech">
					<a id="rehacer" onclick="rehacer()" title="Rehacer" class="btn btn-circle red btn-outline btn-sm"><i class="fa fa-undo fa-lg"></i></a>
                	<a id="aplicar" onclick="aplicar()" title="Aplicar Cambios" class="btn btn-circle green btn-outline btn-sm"><i class="fa fa-check-circle fa-lg"></i></a>
                	
                </div>
            </div>
            
            <h4 style="text-align: center;" id="textohd">Haberes y Descuentos<span id="totalhd"></span></h4>
            <div class="row2" style="margin-left: 112px; margin-right: 112px;">
            <div class="table-responsive">
	<table class="table table-bordered table-hover tzable-striped table-condensed dataTable no-footer" id="tbl_Fito">
		<thead>
			<tr>
			    
			    <th>Código HD</th>
				<th>Concepto</th>
				<th>Tipo</th>
				<th>total</th>
				
				
			</tr>
		</thead>
		<tbody id="tblPeticion"></tbody>
	</table>
</div>
     </div>       
            
			<div class=row>
				<div class="col-md-2"></div>
				<div class="col-md-12 table-responsive">
					<div class="col-xs-12 col-sm-6 col-md-6 ">
						<label style="color: #337ab7;" for="totalFiniquitoBuss">Total Finiquito:</label> 
						<input readonly id="totalFiniquito" name="totalFiniquito" type="text" class="form-control input-circle" value ="0">
					</div>
				</div>
				<div class="col-md-2"></div>
				<div class="col-md-2"></div><br><br>
			</div>

	<div class="row">
		<div class="col-md-2" style=""></div>
		<div class="col-md-8" style="text-align: center;">
			<div class="col-md-12 table-responsive">
				<div class="col-xs-12 col-sm-4 col-md-4 ">
					<label style="color: #337ab7;" for="fechaPago">Fecha de Pago:</label> 
					<input readonly id="fechaPago" name="fechaPago" type="text" class="form-control input-circle" value = "">
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4 ">
					<label style="color: #337ab7;" for="rutBuss">Lugar de Pago:</label>
					<input id="lugarPago" type="text" class="form-control input-circle" name="lugarPago" value = "">
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4 ">
					<label style="color: #337ab7;" for="horaPago">Hora de Pago:</label>
					<input readonly id="horaPago" type="text" class="form-control input-circle" name="horaPago" value = "">
				</div>
			</div>
			<div class="col-md-2"></div>
			<div class="col-md-2"></div>

			<div class="col-xs-4 col-sm-4 col-md-12" style="text-align: center; margin-top: 20px;">
				<div>
					<a onclick="javasript:Enviar();" class="btn btn-circle green btn-outline" >
						<i class="icon-cloud-upload"></i> Guardar
					</a>
					<a onclick="javasript: history.back();" class="btn btn-circle red btn-outline"> 
						<i class="fa fa-times"></i> Cancelar
					</a>
				</div>
			</div>
		</div>
		<div class="col-md-2"></div>
	</div>
</form>