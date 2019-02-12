$(document).ready(function(){
//	loadImplemento();
	loadInit(dateHoy());
})
var trabs = [];
var LABOR_GENERAL;
var tipo_pago_global;
var hora_precio = 0;
var countLabor = 1;
var hora_extra_precio = 0;
var sueldo_base;
var cuadrillaSeleccionada;
var rendimiento;
var datosGenerales;
var datosTrab;
var CUARTEL = getCuartel();
var FAENA = loadFaena();
var jsonRendimientoDiario = [];
var dataR_D;
var valorXhora;
var tipos_cargosJson = []; 
var basePiso;
var tipo_pago = [{
	codigo: 2,
	descripcion: "Trato"
},{
	codigo: 1,
	descripcion: "Dia"
},{
	codigo: 3,
	descripcion: "Mixto"
}];
var base_pisoArray = [{
	codigo: 1,
	descripcion: "Trato"
},{
	codigo: 2,
	descripcion: "Dia"
}];
var tipos_Base_Pago = [{
	codigo: 1,
	descripcion: "Jornal",
	valor: 12000
},{
	codigo: 2,
	descripcion: "Operario",
	valor: 10000
},{
	codigo: 3,
	descripcion: "Riego",
	valor: 15000
},{
	codigo: 4,
	descripcion: "Tractorista",
	valor: 18000
}]
var aux = 0;
var auxArr = [];
var valor_general;
var subsidio;
var CAMPO;
var NOMBRECAMPO;
function loadSuperviasores(id){
	var s;
	$.ajax({
		url: IPSERVERWORK + "/simpleWeb/json/AGRO/getTrabajadoresAgro/?TRABAJADOR=*&CAMPO=*&RUT=*&CARGO=8&FECHA=*",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			supervisores = data;
			$.each(data, function(k,v){
				if(v.idTrabajador == id){
					s = v.nombre;
				}
			})
		}
	})
	return s;
}
var codigo_rg;
function loadInit(fecha){
	loading.show();
	var get = getINFO();
	var supervisor;
	var cuartel;
	if(get){
		fecha = get.cuadrilla;
		supervisor = get.supervisor;
		cuartel = get.cuartel;
	}
	$.ajax({
		url: "/simpleWeb/json/AGRO/GET_REND_MASIVO/"+get.CODIGO_RG,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			console.log(data)
			dataR_D = data.rd;
			datosGenerales = data;
			datosTrab = data.trab;
			rendimiento = data.rendimiento_general[0];
			valorXhora = rendimiento.valor_x_hora.toFixed(0)*1;
			if(rendimiento.base_piso_dia != 0){
				basePiso = 1;
			}else{
				basePiso = 2;
			}
			if(rendimiento.cuartel == 0){
				$.ajax({
					url: IPSERVERSAP+"JSON_BAPI_INTERNALORDER_GETLIST.aspx?TIPO=Z600",
					type:	"GET",
					dataType: 'json',
					async: false,
					success: function(data){
						MACRO = data;
					}
				})
			}
			codigo_rg = rendimiento.codigo;
			returnCampo(rendimiento.campo);
			tipo_pago_global = rendimiento.tipo_pago;
			var fecha = rendimiento.fecha.split(" ");
			valor_general = rendimiento.valor;
			var body_Datos_Comunes = "";
			body_Datos_Comunes += 	"<tr>";
			body_Datos_Comunes += 		"<td>"+loadSuperviasores(data.supervisor)+"</td>";
			body_Datos_Comunes += 		"<td>"+rendimiento.campo+"</td>";
			body_Datos_Comunes += 		"<td class='cuartel'>"+tblEspecie(rendimiento.especie)+"</td>";
			body_Datos_Comunes += 		"<td class='cuartel'>"+tblVariedad(rendimiento.variedad)+"</td>";
			body_Datos_Comunes += 		"<td class='cuartel'>"+tblCuartel(rendimiento.cuartel)+"</td>";
			if(rendimiento.ceco){
				body_Datos_Comunes += 		"<td class='ceco'>"+rendimiento.ceco+"</td>";
			}else{
				body_Datos_Comunes += 		"<td class='ceco'>"+rendimiento.ordenco+"</td>";
			}
			body_Datos_Comunes += 		"<td>"+tblFaena(rendimiento.faena)+"</td>";
			body_Datos_Comunes += 		"<td id='labor'></td>";
			body_Datos_Comunes += 		"<td>"+formatFecha(fecha[0])+"</td>";
			body_Datos_Comunes += 		"<td><input type='text' min='0' onkeyup='cambiarValorGeneral(this)' value='"+rendimiento.valor+"' class='form-control input-sm number' id='valor_general'></td>";
			body_Datos_Comunes += 		"<td>"+formatNumber(String(rendimiento.base_piso_dia))+"</td>";
			body_Datos_Comunes += 		"<td>"+rendimiento.horas+"</td>";
			body_Datos_Comunes += 	"</tr>";
			$("#body_Datos_Comunes").html(body_Datos_Comunes);
			$("#valorth").append("<div class='input-icon input-icon-sm'><i class='fa fa-usd'></i><input type='text' min='0' onkeyup='valorXAll(this);' class='form-control input-sm number' id='valor'></div>");
			$("#hxth").append("<input type='text' min='0' onkeyup='horasXAll(this);' class='form-control input-sm number' id='hx'>");
			$("#bonoth").append("<div class='input-icon input-icon-sm'><i class='fa fa-usd'></i><input type='text' min='0' onkeyup='bonoAll(this);' class='form-control input-sm number' id='bono'></div>");
			$("#bono2th").append("<div class='input-icon input-icon-sm'><i class='fa fa-usd'></i><input type='text' min='0' onkeyup='bono_dosAll(this);' class='form-control input-sm number' id='bono_dos'></div>");
			$.each(data.trab, function(k,v){
				if(trabs.indexOf(v) == -1){
					trabs.push(v);
				}
			})
			$.each(trabs, function(kTrab, vTrab){
				var jsonCargos = {
					codigo: aux,
					cargo: "",
					sueldo: rendimiento.base_piso_dia / rendimiento.horas,
					labor: "",
					rebaja: 0,
					rut: vTrab.rut,
					codigo_rd: dataR_D[kTrab].codigo
				}
				tipos_cargosJson.push(jsonCargos);
				var tbl = "";
				var horas_extras = 0;
				tbl += 	"<tr id='"+kTrab+"'>";
				tbl += 		"<td class='static' scope='row'><button title='Agregar Actividad a este trabajador' onclick='addActivity("+JSON.stringify(vTrab)+");' class='btn blue btn-outline btn-sm'><i class='fa fa-plus' aria-hidden='true'></i></button>";
				tbl += 		"<button title='Eliminar actividad de este Trabajaddor' onclick='delActivity("+kTrab+");' class='btn red btn-outline btn-sm'><i class='fa fa-minus' aria-hidden='true'></i></button></td>";
				tbl += 		"<td class='static2 rut' scope='row'   style='font-weight: bold'>"+vTrab.rut+"</td>";
				tbl += 		"<td class='static3' id='nombre"+aux+"' style='font-weight: bold'>"+vTrab.nombre+"</td>";
				tbl += 		"<td style='display:none'>";
				tbl +=			"<div name='divHas' id='baseDiv"+aux+"' class=''>";
/* BASE PISO*/	tbl += 				"<select id='basePiso"+aux+"' style='min-width: 125px; max-width: 125px; float: left;' class='btn blue btn-outline btn-sm' onchange='calcularValor(this, "+aux+");'><option value=''>Seleccione</option><option value='1'>Si</option><option value='2' selected>No</option></select>";
				tbl += 			"</div>";
				tbl += 		"</td>";
				tbl += 		"<td class='first-col'>";
/* TIPO PAGO*/	tbl += 			"<select id='tipo_pago"+aux+"' name='tippag' class='form-control input-sm' onchange='calcularValor(this, "+aux+");'>"+cargarTipoPago()+"</select>";
				tbl += 		"</td>";
				tbl += 		"<td style='display:none'>";
				tbl += 			"<button style='float: right;' onclick='changeBaseBtn("+aux+");' id='btnCambio"+aux+"' class='btn blue btn-outline btn-sm'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></button><input type='hidden' value="+vTrab.cargo+" id='cargo"+aux+"'>";
				tbl += 		"</td>";
				tbl += 		"<td>";
				tbl += 			"<div name='divHas' id='hoursDiv"+aux+"' class='input-group has-feedback'>";
				tbl += 				"<input type='text' min='0' onkeyup='calcularValor(this, "+aux+");' class='form-control input-sm has-error ' id='horas_trabajadas"+aux+"'>";
				tbl += 				"<span title='Las horas trabajadas exceden las 9 horas diarias' id='hours"+aux+"' style='display: none;' class='input-group-addon btn-sm btn btn-outline yellow'>";
				tbl += 					"<i class='fa fa-exclamation-triangle fa-yellow' aria-hidden='true'></i>";
/*HORAS */		tbl += 				"</span>";
				tbl += 			"</div>";
				tbl += 		"</td>";
				tbl += 		"<td style='display:none'>";
/*HRS EXTRAS */	tbl += 			"<input type='text' min='0' value='"+data.rd[kTrab].horas_extras+"' onkeyup='calcularValor(this, "+aux+");' class='form-control input-sm number hrx' id='horas_extras"+aux+"'>";
				tbl += 		"</td>";
				tbl += 		"<td class='trHide cuartel'>";
				tbl += 			"<select id='especie"+aux+"' style='min-width: 150px; max-width: 150px;' name='esp' class='form-control input-sm' onchange='changeEspecie(this.value,"+aux+");'>"+loadEspecie()+"</select>";
				tbl += 		"</td>";
				tbl += 		"<td class='trHide cuartel'>";
				tbl += 			"<select id='variedad"+aux+"' style='min-width: 150px; max-width: 150px;' name='varie' class='form-control input-sm' onchange='changeVariedad(this.value, "+aux+");'></select>";
				tbl += 		"</td>";
				tbl += 		"<td class='trHide cuartel'>";
				tbl += 			"<select id='cuartel"+aux+"' style='min-width: 150px; max-width: 150px;' name='cuar' class='form-control input-sm' onchange='changeCuartel(this.val);'></select>";
				tbl += 		"</td>";
				tbl += 		"<td class='trHide ceco'>"; //MACROCO
				tbl += 			"<select id='macro"+aux+"' style='min-width: 150px; max-width: 150px;' name='esp' class='form-control input-sm' onchange='selectMacro(this,"+aux+");'>"+loadMacros()+"</select>";
				tbl += 		"</td>";
				tbl += 		"<td class='trHide ceco'>"; //CECO
				tbl += 			"<select id='ceco"+aux+"' style='min-width: 150px; max-width: 150px;' name='esp' class='form-control input-sm'></select>";
				tbl += 		"</td>";
				tbl += 		"<td class='trHide'>";
				tbl += 			"<select id='faena"+aux+"' style='min-width: 150px; max-width: 150px;' name='fae' class='form-control input-sm' onchange='cambioFaena(this.value,"+aux+");'>"+cargarFaena()+"</select>";
				tbl += 		"</td>";
				tbl += 		"<td class='trHide'>";
				tbl += 			"<select id='labor"+aux+"' style='min-width: 150px; max-width: 150px;' name='lab' class='form-control input-sm' onchange='changeLabor(this.value, "+aux+");'></select>";
				tbl += 		"</td>";
				tbl += 		"<td>";
				tbl += 		"</td>";
				tbl += 		"<td>";
				tbl += 			"<div name='divHas' id='val"+aux+"' class='input-icon input-icon-sm'>";
				tbl += 				"<i class='fa fa-usd'></i>";
				tbl += 				"<input type='text' min='0' onkeyup='calcularValor(this, "+aux+");' class='form-control input-sm number valor' value='' id='valor"+aux+"'>";
				tbl += 			"</div>";
				tbl += 		"</td>";
				tbl += 		"<td><input name='check' type='checkbox' checked value='"+kTrab+"'title='Seleccionar' id='check"+kTrab+"' class='checkbox'/></td>";
				tbl += 		"<td>";
				tbl += 			"<div name='divHas' id='rend"+aux+"' class=''>";
				tbl += 				"<input type='text' min='0' onkeyup='calcularValor(this, "+aux+");' class='form-control input-sm number rendimiento' value='"+formatNumber(String(data.rd[kTrab].rendimiento).split(".").join(","))+"' id='rendimiento"+aux+"'>";
				tbl += 			"</div>";
				tbl += 		"</td>";
				tbl += 		"<td>";
				tbl += 			"<div class='input-icon input-icon-sm'>";
				tbl += 				"<i class='fa fa-usd'></i>";
				tbl += 				"<input type='text' min='0' onkeyup='calcularValor(this, "+aux+");' class='form-control input-sm number' id='valor_rendimiento"+aux+"' value='"+formatNumber(String((rendimiento.valor)*1 * (data.rd[kTrab].rendimiento)*1).split(".").join(","))+"' readonly>";
				tbl += 			"</div>";
				tbl += 		"</td>";
				tbl += 		"<td >";
				tbl += 			"<div class='input-icon input-icon-sm'>";
				tbl += 				"<i class='fa fa-usd'></i>";
				tbl += 				"<input type='text' value='"+formatNumber(String(data.rd[kTrab].bono1).split(".").join(","))+"' min='0' onkeyup='calcularValor(this, "+aux+");' class='form-control input-sm number bono' id='bono"+aux+"'>";
				tbl += 			"</div>";
				tbl += 		"</td>";
				tbl += 		"<td style='display:none'>";
				tbl += 			"<div class='input-icon input-icon-sm'>";
				tbl += 				"<i class='fa fa-usd'></i>";
				tbl += 				"<input type='text' value='"+formatNumber(String(data.rd[kTrab].bono2).split(".").join(","))+"' min='0' onkeyup='calcularValor(this, "+aux+");' class='form-control input-sm number bono_dos' id='bono_dos"+aux+"'>";
				tbl += 			"</div>";
				tbl += 		"</td>";
				tbl += 		"<td >";
				tbl += 			"<div name='divHas' id='val_liq"+aux+"' class='input-icon input-icon-sm'>";
				tbl += 				"<i class='fa fa-usd'></i>";
				tbl += 				"<input type='text' value='"+formatNumber(String(data.rd[kTrab].valor_liquido).split(".").join(","))+"' min='0' class='form-control input-sm number liquido' readonly id='valor_liquido"+aux+"'>";
				tbl += 			"</div>";
				tbl += 		"</td>";
				tbl += 		"<td style='display:none'><select id='maquinaria"+aux+"' style='min-width: 150px; max-width: 150px;' class='form-control input-sm' onchange='changeMaquinaria(this.val);'>"+getMaquinaria(CAMPO).maquinaria+"</select></td>";
				tbl += 		"<td style='display:none'><select id='implemento"+aux+"' style='min-width: 150px; max-width: 150px;' class='form-control input-sm' onchange='changeImplemento(this.val);'>"+getMaquinaria(CAMPO).implemento+"</select></td>";
				tbl += 		"<td style='display:none'><select id='bus"+aux+"' style='min-width: 150px; max-width: 150px;' class='form-control input-sm'>"+getRecorrido(CAMPO)+"</select></td>";
				tbl += 	"</tr>";
				$("#body_Rendimiento").append(tbl);
				if(data.rd[kTrab].codigo == 0){
					$("#recRendimiento").attr("disabled", true)
					$("#faena"+aux).val(rendimiento.faena).trigger("change");
					$("#labor"+aux).val(rendimiento.labor);
					$("#valor"+aux).val(formatNumber(rendimiento.base_piso_dia));
					$("#basePiso"+aux).val(1);
					$("#especie"+aux).val(rendimiento.especie).trigger("change");
					$("#variedad"+aux).val(rendimiento.variedad).trigger("change");
					$("#cuartel"+aux).val(rendimiento.cuartel);
					$("#macro"+aux).val(rendimiento.macro).trigger("change");
					if(rendimiento.ceco){
						$("#ceco"+aux).val(rendimiento.ceco);
					}else{
						$("#ceco"+aux).val(rendimiento.ordenco);
					}
					$("#horas_trabajadas"+aux).val(rendimiento.horas);
					$("#tipo_pago"+aux).val(rendimiento.tipo_pago);
					calcularValor($("#horas_trabajadas"+aux), aux);
				}else{
					var rdt = data.rd[kTrab];
					var faenaRD;
					var auxDataVariedadSelect = [];
					var zona;
					$.each(SESION.campo, function(ka,va){
						if(va.campo == CAMPO){
							zona = va.zona;
						}
					})
					var rd_trab = data.rd[kTrab];
					var urlCTM = "/simpleWeb/json/AGRO/GET_FAENA_LABOR/"+rd_trab.labor*1+"/"+zona;
					$.ajax({
						url : urlCTM,
						type : "GET",
						dataType : 'json',
						async : false,
						success : function(data) {
							$.each(FAENA, function(kz,vz){
								if(data.faena == vz.faena && zona == vz.zona){
									faenaRD = vz.codigo;
								}
							})
						}
					})
					var basePiso = data.rd[aux].base_piso_hora*1;
					if(basePiso == 2){
						if(data.rd[aux].tipo_trato*1 == 2){
							$("#btnCambio"+aux).attr("disabled", true);
							$("#valor"+aux).attr("disabled", true);
						}
					}
					$("#basePiso"+aux).val(basePiso);
					$("#variedad"+aux).val(data.rd[aux].variedad);
					$("#valor"+aux).val(formatNumber(data.rd[kTrab].valor));
					$("#horas_trabajadas"+aux).val(formatNumber(data.rd[kTrab].horas_trabajadas));
					$("#valor_hx_dos"+aux).val(formatNumber(data.rd[kTrab].valor_hx_dos));
					$("#especie"+aux).val(rdt.especie).trigger("change");
					$("#variedad"+aux).val(rdt.variedad);
					$("#cuartel"+aux).val(rdt.cuartel);
					$("#macro"+aux).val(rdt.macroco).trigger("change");
					if(rdt.ceco){
						$("#ceco"+aux).val(rdt.ceco);
					}else{
						$("#ceco"+aux).val(rdt.ordenco);
					}
					$("#faena"+aux).val(faenaRD).trigger("change");
					$("#labor"+aux).val(data.rd[aux].labor).trigger("change");
					$("#tipo_pago"+aux).val(data.rd[aux].tipo_trato*1);
					$("#rendimiento"+aux).val(formatNumber(String(data.rd[kTrab].rendimiento).split(".").join(",")));
					calcularValor($("#horas_trabajadas"+aux), aux);
				}
				changeLabor($("#labor"+aux).val(), aux);
				aux++;
			})
			if(rendimiento.cuartel == 0){
				$(".cuartel").hide();
			}else{
				$(".ceco").hide();
			}
			realV();
			format();
			selectCss();
			addTranajadorCuadrilla();
			loading.hide();
		},errror: function(er){
			alerta("Ha ocurrido un error interno del servidor, consulte con el administrador del sistema")
		}
	})
	calcularTotales();
}
function apendTabla(data){
	$.each(data, function(k,vTrab){
		var tbl = "";
		var horas_extras = 0;
		tbl += 	"<tr id='"+aux+"'>";
		tbl += 		"<td class='static' scope='row'><button title='Agregar Actividad a este trabajador' onclick='addActivity("+JSON.stringify(vTrab)+");' class='btn blue btn-outline btn-sm'><i class='fa fa-plus' aria-hidden='true'></i></button>";
		tbl += 		"<button title='Eliminar actividad de este Trabajaddor' onclick='delActivity("+aux+");' class='btn red btn-outline btn-sm'><i class='fa fa-minus' aria-hidden='true'></i></button></td>";
		tbl += 		"<td class='static2 rut' style='font-weight: bold'>"+vTrab.rut+"</td>";
		tbl += 		"<td class='static3' id='nombre"+aux+"' style='font-weight: bold'>"+vTrab.nombre+"</td>";
		tbl += 		"<td style='display:none'>";
		tbl +=			"<div name='divHas' id='baseDiv"+aux+"' class=''>";
		tbl += 				"<select id='basePiso"+aux+"' style='min-width: 125px; max-width: 125px; float: left;' class='btn blue btn-outline btn-sm' onchange='calcularValor(this, "+aux+");'><option value=''>Seleccione</option><option value='1'>Si</option><option value='2'>No</option></select>";
		tbl += 			"</div>";
		tbl += 		"</td>";
		tbl += 		"<td class='first-col'>";
		tbl += 			"<select id='tipo_pago"+aux+"' name='tippag' class='form-control input-sm' onchange='calcularValor(this, "+aux+");'>"+cargarTipoPago()+"</select>";
		tbl += 		"</td>";
		tbl += 		"<td style='display:none'>";
		tbl += 			"<button style='float: right;' onclick='changeBaseBtn("+aux+");' id='btnCambio"+aux+"' class='btn blue btn-outline btn-sm'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></button><input type='hidden' value="+vTrab.cargo+" id='cargo"+aux+"'>";
		tbl += 		"</td>";
		tbl += 		"<td>";
		tbl += 			"<div name='divHas' id='hoursDiv"+aux+"' class='input-group has-feedback'>";
		tbl += 				"<input type='text' min='0' onkeyup='calcularValor(this, "+aux+");' class='form-control input-sm has-error number' value='"+datosGenerales.rendimiento_general[0].horas+"' id='horas_trabajadas"+aux+"'>";
		tbl += 				"<span title='Las horas trabajadas exceden las 9 horas diarias' id='hours"+aux+"' style='display: none;' class='input-group-addon btn-sm btn btn-outline yellow'>";
		tbl += 					"<i class='fa fa-exclamation-triangle fa-yellow' aria-hidden='true'></i>";
		tbl += 				"</span>";
		tbl += 			"</div>";
		tbl += 		"</td>";
		tbl += 		"<td style='display:none'>";
		tbl += 			"<input type='text' min='0' onkeyup='calcularValor(this, "+aux+");' class='form-control input-sm number hrx' id='horas_extras"+aux+"'>";
		tbl += 		"</td>";
		tbl += 		"<td class='trHide cuartel'>";
		tbl += 			"<select id='especie"+aux+"' style='min-width: 150px; max-width: 150px;' name='esp' class='form-control input-sm' onchange='changeEspecie(this.value,"+aux+");'>"+loadEspecie()+"</select>";
		tbl += 		"</td>";
		tbl += 		"<td class='trHide cuartel'>";
		tbl += 			"<select id='variedad"+aux+"' style='min-width: 150px; max-width: 150px;' name='varie' class='form-control input-sm' onchange='changeVariedad(this.value, "+aux+");'></select>";
		tbl += 		"</td>";
		tbl += 		"<td class='trHide cuartel'>";
		tbl += 			"<select id='cuartel"+aux+"' style='min-width: 150px; max-width: 150px;' name='cuar' class='form-control input-sm' onchange='changeCuartel(this.val);'></select>";
		tbl += 		"</td>";
		tbl += 		"<td class='trHide ceco'>"; //MACROCO
		tbl += 			"<select id='macro"+aux+"' style='min-width: 150px; max-width: 150px;' name='esp' class='form-control input-sm' onchange='selectMacro(this,"+aux+");'>"+loadMacros()+"</select>";
		tbl += 		"</td>";
		tbl += 		"<td class='trHide ceco'>"; //CECO
		tbl += 			"<select id='ceco"+aux+"' style='min-width: 150px; max-width: 150px;' name='esp' class='form-control input-sm'></select>";
		tbl += 		"</td>";
		tbl += 		"<td class='trHide'>";
		tbl += 			"<select id='faena"+aux+"' style='min-width: 150px; max-width: 150px;' name='fae' class='form-control input-sm' onchange='cambioFaena(this.value,"+aux+");'>"+cargarFaena()+"</select>";
		tbl += 		"</td>";
		tbl += 		"<td class='trHide'>";
		tbl += 			"<select id='labor"+aux+"' style='min-width: 150px; max-width: 150px;' name='lab' class='form-control input-sm' onchange='changeLabor(this.value, "+aux+");'></select>";
		tbl += 		"</td>";
		tbl += 		"<td>";
		tbl += 		"</td>";
		tbl += 		"<td>";
		tbl += 			"<div name='divHas' id='val"+aux+"' class='input-icon input-icon-sm'>";
		tbl += 				"<i class='fa fa-usd'></i>";
		tbl += 				"<input type='text' min='0' onkeyup='calcularValor(this, "+aux+");' class='form-control input-sm number valor' value='' id='valor"+aux+"'>";
		tbl += 			"</div>";
		tbl += 		"</td>";
		tbl += 		"<td><input name='check' type='checkbox' checked value='"+aux+"'title='Seleccionar' id='check"+aux+"' class='checkbox'/></td>";
		tbl += 		"<td>";
		tbl += 			"<div name='divHas' id='rend"+aux+"' class=''>";
		tbl += 				"<input type='text' min='0' onkeyup='calcularValor(this, "+aux+");' class='form-control input-sm number rendimiento' id='rendimiento"+aux+"'>";
		tbl += 			"</div>";
		tbl += 		"</td>";
		tbl += 		"<td>";
		tbl += 			"<div class='input-icon input-icon-sm'>";
		tbl += 				"<i class='fa fa-usd'></i>";
		tbl += 				"<input type='text' min='0' onkeyup='calcularValor(this, "+aux+");' class='form-control input-sm number' id='valor_rendimiento"+aux+"' readonly>";
		tbl += 			"</div>";
		tbl += 		"</td>";
		tbl += 		"<td>";
		tbl += 			"<div class='input-icon input-icon-sm'>";
		tbl += 				"<i class='fa fa-usd'></i>";
		tbl += 				"<input type='text' min='0' onkeyup='calcularValor(this, "+aux+");' class='form-control input-sm number bono' id='bono"+aux+"'>";
		tbl += 			"</div>";
		tbl += 		"</td>";
		tbl += 		"<td style='display:none'>";
		tbl += 			"<div class='input-icon input-icon-sm'>";
		tbl += 				"<i class='fa fa-usd'></i>";
		tbl += 				"<input type='text' min='0' onkeyup='calcularValor(this, "+aux+");' class='form-control input-sm number bono_dos' id='bono_dos"+aux+"'>";
		tbl += 			"</div>";
		tbl += 		"</td>";
		tbl += 		"<td>";
		tbl += 			"<div name='divHas' id='val_liq"+aux+"' class='input-icon input-icon-sm'>";
		tbl += 				"<i class='fa fa-usd'></i>";
		tbl += 				"<input type='text' min='0' class='form-control input-sm number liquido' readonly id='valor_liquido"+aux+"'>";
		tbl += 			"</div>";
		tbl += 		"</td>";
		tbl += 		"<td style='display:none'><select id='maquinaria"+aux+"' style='min-width: 150px; max-width: 150px;' class='form-control input-sm' onchange='changeMaquinaria(this.val);'>"+getMaquinaria(CAMPO).maquinaria+"</select></td>";
		tbl += 		"<td style='display:none'><select id='implemento"+aux+"' style='min-width: 150px; max-width: 150px;' class='form-control input-sm' onchange='changeImplemento(this.val);'>"+getMaquinaria(CAMPO).implemento+"</select></td>";
		tbl += 		"<td style='display:none'><select id='bus"+aux+"' style='min-width: 150px; max-width: 150px;' class='form-control input-sm'>"+getRecorrido(CAMPO)+"</select></td>";
		tbl += 	"</tr>";
		$("#body_Rendimiento").append(tbl);
		$("#faena"+aux).val(rendimiento.faena).trigger("change");
		$("#labor"+aux).val(rendimiento.labor).trigger("change");
		$("#especie"+aux).val(rendimiento.especie).trigger("change")
		$("#variedad"+aux).val(rendimiento.variedad).trigger("change");
		$("#cuartel"+aux).val(rendimiento.cuartel);
		$("#macro"+aux).val(rendimiento.macro).trigger("change");
		if(rendimiento.ceco){
			$("#ceco"+aux).val(rendimiento.ceco);
		}else{
			$("#ceco"+aux).val(rendimiento.ordenco);
		}
		datosTrab.push(vTrab);
		trabs.push(vTrab);
		if(datosGenerales.rendimiento_general[0].base_piso_dia == 0){
			$("#basePiso"+aux).val(2);
			$("#valor"+aux).val(formatNumber(vTrab.sueldoDiario));
		}else{
			$("#basePiso"+aux).val(1);
			$("#valor"+aux).val(formatNumber(datosGenerales.rendimiento_general[0].base_piso_dia));
			
		}
		$("#tipo_pago"+aux).val(datosGenerales.rendimiento_general[0].tipo_pago);
//		tipopago();
		format();
		cleanRut();
		selectCss();
		realV();
		aux++;
		if(rendimiento.cuartel == 0){
			$(".cuartel").hide();
		}else{
			$(".ceco").hide();
		}
	})
}
function loadMacros(){
	var macros = "<option value=''></option>";
	if(rendimiento.cuartel == 0){
		var gcc = "";
		$.each(SESION.campo, function(k,v){
			if(rendimiento.campo == v.descripcion){
				gcc = v.grupo_co;
				return false;
			}
		})
		var arrGcc = gcc.split(";");
		$.each(arrGcc, function (k,v){
			$.ajax({
				url: IPSERVERSAP+ "JSON_BAPI_INTERNALORDRGRP_GETDETAIL.aspx?GRUPO="+v,
				type:	"GET",
				dataType: 'json',
				async: false,
				success: function(data){
					$.each(data.HIERARCHYNODES, function(k,v){
						var e = v.GROUPNAME;
						if((e[e.length-1]*1 == 1 || e[e.length-1]*1 == 2) && e[e.length-2]*1 == 0){
							macros += "<option value='"+v.GROUPNAME+"'>"+v.DESCRIPT+"</option>";
						}
					})
				}
			})
		});
		macros += "<option value='1'>OTROS CENTRO DE COSTO</option>";
	}
	return macros;
}
function selectMacro(input, id){
	if(rendimiento.cuartel == 0){
		var ordenco = "<option value=''></option>"; 
		var campo = CAMPO;
		var sector;
		var cecoCuartel = [0];
		$.each(CUARTEL, function(k,v){
			if(v.campo == campo){
				cecoCuartel.push(v.ordenco);
			}
		})
		var auxArr = [];
		$.each(MACRO.ORDER_LIST, function(k,v){
			if(v.ORDER.indexOf(input.value) != -1 && auxArr.indexOf(v.OBJECT_NO) == -1 && !rtrnValCeco(v.OBJECT_NO)){
				auxArr.push(v.OBJECT_NO);
				ordenco += "<option value="+v.ORDER+">"+v.ORDER_NAME+"</option>";
			}
		})
		if(input.value*1 == 1){
			var sociedad;
			var grupo;
			$.each(SESION.campo, function(k,v){
				if(v.campo == campo){
					sociedad = v.idSociedad;
					grupo = v.grupo_ceco_work;
					return false;
				}
			})
			$.ajax({
				url: IPSERVERSAP+"JSON_BAPI_COSTCENTER_GETLIST1.aspx?SOCIEDAD="+sociedad+"&GRUPO="+grupo,
				type:	"GET",
				dataType: 'json',
				async: false,
				success: function(data){
					CECO = "<option value=''></option>";
					$.each(data.COSTCENTERLIST, function(k,v){
						CECO += "<option value="+v.COSTCENTER+">"+v.DESCRIPT+"</option>";
					})
					$("#ceco"+id).html(CECO);
				}
			})
			$("#ceco"+id).append(CECO);
		}else{
			$("#ceco"+id).html(ordenco);
		}
	}
}
function rtrnValCeco(e){
	var r = false;
	if(e[e.length-1]*1 == 6 && e[e.length-2]*1 == 1 && e != ""){
		r = true;
	}
	return r;
}
function realV(){
	if(realView){
		$(".trHide").hide();
	}else{
		$(".trHide").show();
	}
}
var viewCount = 1;
var realView = true;
function trShow(){
	if(viewCount == 1){
		$("#aShow").html("<i class='fa fa-caret-left' aria-hidden='true'></i>");
		var selectedEffect = "slide";
		var options = {
			direction: "left"
		}
		$(".trHide").show(selectedEffect, options, 500, callback);
		realView = false;
		viewCount = 0;
	}else{
		$("#aShow").html("<i class='fa fa-caret-right' aria-hidden='true'></i>");
		var selectedEffect = "slide";
		var options = {
			direction: "left"
		}
		$(".trHide").hide(selectedEffect, options, 500, callback);
		realView = true;
		viewCount = 1;
	}
	setTimeout(function(){
		if(rendimiento.cuartel == 0){
			$(".cuartel").hide();
		}else{
			$(".ceco").hide();
		}
	}, 500);
}
function callback() {
	setTimeout(function() {
		$("#effect:visible").removeAttr("style").fadeOut();
	}, 1000);
};
function getRecorrido(campo){
	var recorrido = "<option value=''>Seleccione</option>";;
	$.ajax({
		url : "/simpleWeb/json/AGRO/GET_RECORRIDO_CAMPO/"+campo,
		type : "GET",
		dataType : 'json',
		async : false,
		success : function(data) {
			if(data.length == 0){
				recorrido = "<option value='0'>Sin Bus</option>";;
			}
			$.each(data, function(k,v){
				recorrido += "<option value='"+v.id_recorrido+"'>"+v.detalle+"</option>";
			})
		}
	})
	return recorrido;
}
function changeBaseBtn(id){
	var basePiso = $("#basePiso"+id).val();
	var baseSueldo = "";
	baseSueldo +=	"<div class='table-responsive'>";
	baseSueldo +=		"<table class='table table-bordered table-hover table-striped table-condensed' id='tbl_Datos_Comunes'>";
	baseSueldo +=			"<thead>";
	baseSueldo +=				"<tr>";
	baseSueldo +=					"<th>#</th>";
	baseSueldo +=					"<th>Tipo Trabajo</th>";
	baseSueldo +=					"<th>Sueldo Mensual</th>";
	baseSueldo +=					"<th>Sueldo Diario</th>";
	baseSueldo +=					"<th>Sueldo por Hora</th>";
	baseSueldo +=				"</tr>";
	baseSueldo +=			"</thead>";
	baseSueldo +=			"<body id='bodyValores'>"+loadTipos_Pago(id)+"</body>";
	baseSueldo +=		"</table>";
	baseSueldo +=	'</div>';
	baseSueldo += 	"<div style='text-align: center;'>";
	baseSueldo += 		"<a class='btn green-dark submit-modal' id='confirmBase"+id+"' onclick='calcularValor(this, "+id+")'>Aceptar</a>";
	baseSueldo += 		"<a class='btn red' onclick='cancelAddPisoDia("+id+");'>Cancelar</a>";
	baseSueldo += 	"</div>";
	popUp("Base Sueldo", baseSueldo, true, "600px", true);
}
function returnCampo(campo){
	$.each(SESION.campo, function(k,v){
		if(v.descripcion == campo){
			CAMPO = v.campo;
		}
	})
}
function cambiarValorGeneral(input){
	valor_general = input.value;
	var rend = $(".rendimiento");
	$(".rendimiento").each(function(){
		var id = $(this)[0].id.split("dimiento")
		id = id[1];
		if($("#check"+id)[0].checked == true && $("#rendimiento"+id)[0].disabled == false){
			format();
			calcularValor($(this), id);
		}
	})
}
function valorXAll(input){
	var hrx = $(".valor");
	$(".valor").each(function(){
		var id = $(this)[0].id.split("lor"),
		id = id[1];
		if($("#check"+id)[0].checked == true && $("#valor"+id)[0].disabled == false){
			format();
			$(this).val(formatNumber(input.value));
			calcularValor($(this), id);
		}
	})
}
function bonoAll(input){
	var bono = $(".bono");
	for(var i = 0; i < bono.length; i++){
		var id = $(bono[i])[0].id.split("no");
		id = id[1];
		if($("#check"+id)[0].checked == true ){
			format();
			$(bono[i]).val(formatNumber(input.value));
			calcularValor($(bono[i]), id);
		}
	}
}
function selectALL(all){
	var check = document.getElementsByName("check");
	if(all.checked == true){
		for(var x = 0; x < check.length; x++){
			check[x].checked = all.checked;
		}
	}else{
		for(var x = 0; x < check.length; x++){
			check[x].checked = all.unchecked;
		}
	}
}
function addActivity(vTrab){
	var bodyTabla = document.getElementById("body_Rendimiento"); 
	var fila = bodyTabla.getElementsByTagName("TR"); 
	var indexFila;
	for(var i = 0; i < fila.length; i++){
		if(fila[i].childNodes[2].innerHTML.split(" ").join("") == vTrab.nombre.split(" ").join("")){
			indexFila = i;
		}
	}
	loading.show();
	var jsonCargos = {
		codigo: aux,
		cargo: "",
		sueldo: rendimiento.base_piso_dia / rendimiento.horas,
		labor: "",
		rebaja: 0,
		rut: vTrab.rut
	}
	tipos_cargosJson.push(jsonCargos);
			var tbl = "";
			var horas_extras = 0;
			tbl += 	"<tr  id='"+aux+"'>";
			tbl += 		"<td class='static'><button title='Agregar Actividad a este trabajador' onclick='addActivity("+JSON.stringify(vTrab)+");' class='btn blue btn-outline btn-sm'><i class='fa fa-plus' aria-hidden='true'></i></button>";
			tbl += 		"<button title='Eliminar actividad de este Trabajaddor' onclick='delActivity("+aux+");' class='btn red btn-outline btn-sm'><i class='fa fa-minus' aria-hidden='true'></i></button></td>";
			tbl += 		"<td class='static2 rut' style='font-weight: bold'>"+vTrab.rut+"</td>";
			tbl += 		"<td class='static3' id='nombre"+aux+"' style='font-weight: bold'>"+vTrab.nombre+"</td>";
			tbl += 		"<td style='display:none'>";
			tbl +=			"<div name='divHas' id='baseDiv"+aux+"' class=''>";
			tbl += 				"<select id='basePiso"+aux+"' style='min-width: 125px; max-width: 125px; float: left;' class='btn blue btn-outline btn-sm' onchange='calcularValor(this, "+aux+");'><option value=''>Seleccione</option><option value='1'>Si</option><option value='2'>No</option></select>";
			tbl += 			"</div>";
			tbl += 		"</td>";
			tbl += 		"<td class='first-col'>";
			tbl += 			"<select id='tipo_pago"+aux+"' name='tippag' class='form-control input-sm' onchange='calcularValor(this, "+aux+");'>"+cargarTipoPago()+"</select>";
			tbl += 		"</td>";
			tbl += 		"<td style='display:none'>";
			tbl += 			"<button style='float: right;' onclick='changeBaseBtn("+aux+");' id='btnCambio"+aux+"' class='btn blue btn-outline btn-sm'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></button><input type='hidden' value="+vTrab.cargo+" id='cargo"+aux+"'>";
			tbl += 		"</td>";
			tbl += 		"<td>";
			tbl += 			"<div name='divHas' id='hoursDiv"+aux+"' class='input-group has-feedback'>";
			tbl += 				"<input type='text' min='0' onkeyup='calcularValor(this, "+aux+");' class='form-control input-sm has-error number' value='"+datosGenerales.rendimiento_general[0].horas+"' id='horas_trabajadas"+aux+"'>";
			tbl += 				"<span title='Las horas trabajadas exceden las 9 horas diarias' id='hours"+aux+"' style='display: none;' class='input-group-addon btn-sm btn btn-outline yellow'>";
			tbl += 					"<i class='fa fa-exclamation-triangle fa-yellow' aria-hidden='true'></i>";
			tbl += 				"</span>";
			tbl += 			"</div>";
			tbl += 		"</td>";
			tbl += 		"<td style='display:none'>";
			tbl += 			"<input type='text' min='0' onkeyup='calcularValor(this, "+aux+");' class='form-control input-sm number hrx' id='horas_extras"+aux+"'>";
			tbl += 		"</td>";
			tbl += 		"<td class='trHide cuartel'>";
			tbl += 			"<select id='especie"+aux+"' style='min-width: 150px; max-width: 150px;' name='esp' class='form-control input-sm' onchange='changeEspecie(this.value,"+aux+");'>"+loadEspecie()+"</select>";
			tbl += 		"</td>";
			tbl += 		"<td class='trHide cuartel'>";
			tbl += 			"<select id='variedad"+aux+"' style='min-width: 150px; max-width: 150px;' name='varie' class='form-control input-sm' onchange='changeVariedad(this.value, "+aux+");'></select>";
			tbl += 		"</td>";
			tbl += 		"<td class='trHide cuartel'>";
			tbl += 			"<select id='cuartel"+aux+"' style='min-width: 150px; max-width: 150px;' name='cuar' class='form-control input-sm' onchange='changeCuartel(this.val);'></select>";
			tbl += 		"</td>";
			tbl += 		"<td class='trHide ceco'>"; //MACROCO
			tbl += 			"<select id='macro"+aux+"' style='min-width: 150px; max-width: 150px;' name='esp' class='form-control input-sm' onchange='selectMacro(this,"+aux+");'>"+loadMacros()+"</select>";
			tbl += 		"</td>";
			tbl += 		"<td class='trHide ceco'>"; //CECO
			tbl += 			"<select id='ceco"+aux+"' style='min-width: 150px; max-width: 150px;' name='esp' class='form-control input-sm'></select>";
			tbl += 		"</td>";
			tbl += 		"<td class='trHide'>";
			tbl += 			"<select id='faena"+aux+"' style='min-width: 150px; max-width: 150px;' name='fae' class='form-control input-sm' onchange='cambioFaena(this.value,"+aux+");'>"+cargarFaena()+"</select>";
			tbl += 		"</td>";
			tbl += 		"<td class='trHide'>";
			tbl += 			"<select id='labor"+aux+"' style='min-width: 150px; max-width: 150px;' name='lab' class='form-control input-sm' onchange='changeLabor(this.value, "+aux+");'></select>";
			tbl += 		"</td>";
			tbl += 		"<td>";
			tbl += 		"</td>";
			tbl += 		"<td>";
			tbl += 			"<div name='divHas' id='val"+aux+"' class='input-icon input-icon-sm'>";
			tbl += 				"<i class='fa fa-usd'></i>";
			tbl += 				"<input type='text' min='0' onkeyup='calcularValor(this, "+aux+");' class='form-control input-sm number valor' value='' id='valor"+aux+"'>";
			tbl += 			"</div>";
			tbl += 		"</td>";
			tbl += 		"<td><input name='check' type='checkbox' checked value='"+aux+"'title='Seleccionar' id='check"+aux+"' class='checkbox'/></td>";
			tbl += 		"<td>";
			tbl += 			"<div name='divHas' id='rend"+aux+"' class=''>";
			tbl += 				"<input type='text' min='0' onkeyup='calcularValor(this, "+aux+");' class='form-control input-sm number rendimiento' id='rendimiento"+aux+"'>";
			tbl += 			"</div>";
			tbl += 		"</td>";
			tbl += 		"<td>";
			tbl += 			"<div class='input-icon input-icon-sm'>";
			tbl += 				"<i class='fa fa-usd'></i>";
			tbl += 				"<input type='text' min='0' onkeyup='calcularValor(this, "+aux+");' class='form-control input-sm number' id='valor_rendimiento"+aux+"' readonly>";
			tbl += 			"</div>";
			tbl += 		"</td>";
			tbl += 		"<td>";
			tbl += 			"<div class='input-icon input-icon-sm'>";
			tbl += 				"<i class='fa fa-usd'></i>";
			tbl += 				"<input type='text' min='0' onkeyup='calcularValor(this, "+aux+");' class='form-control input-sm number bono' id='bono"+aux+"'>";
			tbl += 			"</div>";
			tbl += 		"</td>";
			tbl += 		"<td style='display:none'>";
			tbl += 			"<div class='input-icon input-icon-sm'>";
			tbl += 				"<i class='fa fa-usd'></i>";
			tbl += 				"<input type='text' min='0' onkeyup='calcularValor(this, "+aux+");' class='form-control input-sm number bono_dos' id='bono_dos"+aux+"'>";
			tbl += 			"</div>";
			tbl += 		"</td>";
			tbl += 		"<td>";
			tbl += 			"<div name='divHas' id='val_liq"+aux+"' class='input-icon input-icon-sm'>";
			tbl += 				"<i class='fa fa-usd'></i>";
			tbl += 				"<input type='text' min='0' class='form-control input-sm number liquido' readonly id='valor_liquido"+aux+"'>";
			tbl += 			"</div>";
			tbl += 		"</td>";
			tbl += 		"<td style='display:none'><select id='maquinaria"+aux+"' style='min-width: 150px; max-width: 150px;' class='form-control input-sm' onchange='changeMaquinaria(this.val);'>"+getMaquinaria(CAMPO).maquinaria+"</select></td>";
			tbl += 		"<td style='display:none'><select id='implemento"+aux+"' style='min-width: 150px; max-width: 150px;' class='form-control input-sm' onchange='changeImplemento(this.val);'>"+getMaquinaria(CAMPO).implemento+"</select></td>";
			tbl += 		"<td style='display:none'><select id='bus"+aux+"' style='min-width: 150px; max-width: 150px;' class='form-control input-sm'>"+getRecorrido(CAMPO)+"</select></td>";
			tbl += 	"</tr>";
			$("#tdAdd").html(tbl);
			bodyTabla.insertBefore($("#tdAdd")[0].childNodes[0], fila[indexFila+1]);
			$("#faena"+aux).val(rendimiento.faena).trigger("change");
			$("#labor"+aux).val(rendimiento.labor).trigger("change");
			$("#especie"+aux).val(rendimiento.especie).trigger("change")
			$("#variedad"+aux).val(rendimiento.variedad).trigger("change");
			$("#cuartel"+aux).val(rendimiento.cuartel);
			$("#macro"+aux).val(rendimiento.macro).trigger("change");
			if(rendimiento.ceco){
				$("#ceco"+aux).val(rendimiento.ceco);
			}else{
				$("#ceco"+aux).val(rendimiento.ordenco);
			}
			if(datosGenerales.rendimiento_general[0].base_piso_dia == 0){
				$("#basePiso"+aux).val(2);
//				$("#valor"+aux).val(formatNumber(vTrab.sueldoDiario));
			}else{
				$("#basePiso"+aux).val(1);
//				$("#valor"+aux).val(formatNumber(datosGenerales.rendimiento_general[0].base_piso_dia));
			}
			$("#tipo_pago"+aux).val(datosGenerales.rendimiento_general[0].tipo_pago);
			changeLabor($("#labor"+aux).val(), aux)
			$( "#"+aux ).draggable();
			aux++;
			datosTrab.push(vTrab);
		format();
		realV();
		selectCss();
		loading.hide();
		if(rendimiento.cuartel == 0){
			$(".cuartel").hide();
		}else{
			$(".ceco").hide();
		}
}
function delActivity(id){
	var c = confirmar.confirm("Desea Eliminar esta Actividad");
	$(c.aceptar).click(function(){
		for(var i = 0; i < datosTrab.length; i++){
			if(i == id){
				$("#"+id).remove();
				datosTrab[id] = [];
			}
		}
	})
}
function asignarRendimiento(){
	loading.show();
	setTimeout(function(){ 
	var count = 0;
	var x = 0;
	jsonRendimientoDiario = [];
	updJsonRendimientoDiario = [];
	delRD = [];
	$.each(datosTrab, function(ka,va){
		if(va.idTrabajador != 0){
			x++;
		}
	})
	var arrJsonValidate = [];
	var validarTabla = true;
	$.each(datosTrab, function(k,v){
		if(v.length != 0){
			var message = "";
			var e = 0;
			if(!$("#basePiso"+k).val()){
				$("#baseDiv"+k).addClass("has-error");
				e++;
			}
			if(!$("#horas_trabajadas"+k).val() || $("#horas_trabajadas"+k).val() == 0){
				$("#hoursDiv"+k).addClass('has-error');
				e++;
			}if(!$("#especie"+k).val() && rendimiento.cuartel != 0){
				e++;
			}if(!$("#variedad"+k).val() && rendimiento.cuartel != 0){
				e++;
			}if(!$("#cuartel"+k).val() && rendimiento.cuartel != 0){
				e++;
			}if(!$("#macro"+k).val() && rendimiento.cuartel == 0){
				e++;
			}if(!$("#ceco"+k).val() && rendimiento.cuartel == 0){
				e++;
			}if(!$("#labor"+k).val()){
				e++;
			}if(!$("#tipo_pago"+k).val() && $("#tipo_pago"+k)[0].disabled == false){
				$("#hoursDiv"+k).addClass('has-error');
				e++;
			}
			switch($("#basePiso"+k).val()*1){
			case 1:
				if($("#tipo_pago"+k).val()*1 == 1){
					if(!$("#valor"+k).val() || $("#valor"+k).val() == 0){
						$("#val"+k).addClass('has-error');
						e++;
					}
				}
				break;
			case 2:
				if($("#tipo_pago"+k).val()*1 == 1){
					if(!$("#valor"+k).val() || $("#valor"+k).val() == 0){
						$("#val"+k).addClass('has-error');
						e++;
					}
				}else{
					$("#val"+k).removeClass('has-error');
				}
				break;
			default:
				break;
			}
			var validateLaborRend = validateLaborWithRend($("#labor"+k).val(), k);
			if(validateLaborRend == 1 || validateLaborRend == 2){
				if($("#rendimiento"+k).val() == 0 || !$("#rendimiento"+k).val()){
					$("#rend"+k).addClass('has-error');
					e++;
				}
			}
			if(!$("#valor_liquido"+k).val() || $("#valor_liquido"+k).val() == 0){
				$("#val_liq"+k).addClass('has-error');
				e++;
			}
			if(e != 0){
				validarTabla = false;
			}
		}else{
			if(dataR_D[k]){
				delRD.push({codigo: tipos_cargosJson[k].codigo_rd, rut: tipos_cargosJson[k].rut});
				count++;
			}
		}
	})
	if(validarTabla){
		$.each(datosTrab, function(k,v){
			if(dataR_D[k] != undefined && dataR_D[k].codigo != 0){
				if(v.length != 0){
					var updJson = {
						codigo: dataR_D[k].codigo*1,
						trabajador: v.idTrabajador*1,
						base_piso_hora: ($("#basePiso"+k).val())*1,
						subsidio: 0,
						labor: ($("#labor"+k).val())*1,
						valor: formatNumberDB($("#valor"+k).val().split(".").join("")),
						tipo_trato: ($("#tipo_pago"+k).val())*1,
						rendimiento: formatNumberDB($("#rendimiento"+k).val().split(".").join("")),
						valor_rendimiento: formatNumberDB($("#valor_rendimiento"+k).val().split(".").join("")),
						horas_trabajadas: ($("#horas_trabajadas"+k).val().split(".").join(""))*1,
						bono1: formatNumberDB($("#bono"+k).val().split(".").join("")),
						valor_liquido: formatNumberDB($("#valor_liquido"+k).val().split(".").join("")),
						maquinaria: ($("#maquinaria"+k).val())*1,
						implemento: ($("#implemento"+k).val())*1,
						bus: ($("#bus"+k).val())*1,
						estado: 8,
						codigo_rg: rendimiento.codigo*1,
						cargo: $("#cargo"+k).val(),
						idContratista: rendimiento.contratista,
						bonoCargo: 0,
						bonoProduccion: 0,
						baseFicha:0,
						baseCargo:0,
						n_personas: 1,
					}
					if($("#rendimiento"+k)[0].disabled == false){
						updJson.subsidio = rendimiento.base_piso_dia - ($("#valor_rendimiento"+k).val().split(".").join(""))*1
					}
					if(updJson.idContratista == "" || updJson.idContratista == null){
						updJson.idContratista = 0;
					}
					if(JSON.stringify(dataR_D[k]) != JSON.stringify(updJson)){
						updJsonRendimientoDiario.push(updJson);
					}
					if(rendimiento.cuartel == 0){
						updJson.macroco = $("#macro"+k).val();
						if($("#macro"+k).val()*1 == 1){
							updJson.ceco = $("#ceco"+k).val();
						}else{
							updJson.ordenco = $("#ceco"+k).val();
						}
					}else{
						updJson.cuartel = $("#cuartel"+k).val();
					}
					count++;
				}
			}else{
				if(v.length != 0){
					var json = {
						codigo: 0,
						trabajador: v.idTrabajador,
						base_piso_hora: $("#basePiso"+k).val(),
						subsidio: 0,
						labor: $("#labor"+k).val(),
						valor: formatNumberDB($("#valor"+k).val()),
						tipo_trato: ($("#tipo_pago"+k).val())*1,
						rendimiento: formatNumberDB($("#rendimiento"+k).val()),
						valor_rendimiento: formatNumberDB($("#valor_rendimiento"+k).val()),
						horas_trabajadas: formatNumberDB($("#horas_trabajadas"+k).val()),
						horas_extras: formatNumberDB($("#horas_extras"+k).val()),
						bono1: formatNumberDB($("#bono"+k).val()),
						valor_liquido: formatNumberDB($("#valor_liquido"+k).val()),
						maquinaria: $("#maquinaria"+k).val(),
						implemento: $("#implemento"+k).val(),
						bus: $("#bus"+k).val(),
						estado: 8,
						codigo_rg: rendimiento.codigo,
						cargo: $("#cargo"+k).val(),
						idContratista: rendimiento.contratista,
						bonoCargo: 0,
						bonoProduccion: 0,
						baseFicha:0,
						baseCargo:0,
					}
					if($("#rendimiento"+k)[0].disabled == false){
						json.subsidio = rendimiento.base_piso_dia - ($("#valor_rendimiento"+k).val().split(".").join(""))*1
					}
					if(json.idContratista == "" || json.idContratista == null){
						json.idContratista = 0;
					}
					if(rendimiento.cuartel == 0){
						json.macroco = $("#macro"+k).val();
						if($("#macro"+k).val()*1 == 1){
							json.ceco = $("#ceco"+k).val();
						}else{
							json.ordenco = $("#ceco"+k).val();
						}
					}else{
						json.cuartel = $("#cuartel"+k).val();
					}
					jsonRendimientoDiario.push(json);
					count++;
				}
			}
		})
	}else{
		loading.hide();
		alerta("Faltan registros por completar, favor revisar");
		return;
	}
	console.log(delRD)
//	return;
	var countIngreso = 0;
	var auxCountIngreso = 0;
	if(jsonRendimientoDiario.length != 0){
		countIngreso++;
	}
	if(updJsonRendimientoDiario.length != 0){
		countIngreso++;
	}
	if(delRD.length != 0){
		countIngreso++;
	}
	console.log(count)
	console.log(x)
	if(validarTabla){
		if(jsonRendimientoDiario.length != 0){
			auxCountIngreso++;
			$.ajax({
				url : "/simpleWeb/json/AGRO/ADD_RENDIMIENTO_DIARIO/",
				type : "PUT",
				async : false,
				data : JSON.stringify(jsonRendimientoDiario),
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Accept","application/json");
					xhr.setRequestHeader("Content-Type","application/json");
				},
				success : function(data, textStatus, jqXHR) {
					jsonRendimientoDiario = [];
				},
				error : function(jqXHR, textStatus, errorThrown) {
					swal({
						  title: "Error!",
						  text: "No se ha podido registrar la infomacion, consulte con el administrador del sistema",
						  type: "error",
						  confirmButtonText: "Aceptar"
					});
				}
			});
		}
		if(updJsonRendimientoDiario.length != 0){
			auxCountIngreso++;
			$.ajax({
				url : "/simpleWeb/json/AGRO/UPD_RENDIMIENTO_DIARIO/",
				type : "PUT",
				async : false,
				data : JSON.stringify(updJsonRendimientoDiario),
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Accept","application/json");
					xhr.setRequestHeader("Content-Type","application/json");
				},
				success : function(data, textStatus, jqXHR) {
					updJsonRendimientoDiario = [];
				},
				error : function(jqXHR, textStatus, errorThrown) {
					swal({
						  title: "Error!",
						  text: "No se ha podido registrar la infomacion, consulte con el administrador del sistema",
						  type: "error",
						  confirmButtonText: "Aceptar"
					});
				}
			});
		}
		if(delRD.length != 0){
			auxCountIngreso++;
			$.ajax({
				url : "/simpleWeb/json/AGRO/DEL_RENDIMIENTO_DIARIO/",
				type : "PUT",
				async : false,
				data : JSON.stringify(delRD),
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Accept","application/json");
					xhr.setRequestHeader("Content-Type","application/json");
				},
				success : function(data, textStatus, jqXHR) {
					delRD = [];
				},
				error : function(jqXHR, textStatus, errorThrown) {
					swal({
						  title: "Error!",
						  text: "No se ha podido registrar la infomacion, consulte con el administrador del sistema",
						  type: "error",
						  confirmButtonText: "Aceptar"
					});
				}
			});
		}
		if(updJsonRendimientoDiario.length == 0 && jsonRendimientoDiario.length == 0 && delRD.length == 0){
			loading.hide();
			var a = alerta("Informacion Guardada con exito");
			$(a.aceptar).click(function(){
				window.location.href = ("AsignarCuadrillaContratista");
			})
		}
	}
	}, 50);
}
function tblEspecie(especie){
	var especier;
	$.each(SESION.especie, function(k,v){
		if(v.codigo == especie){
			especier = v.especie;
			return false;
		}
	})
	return especier;
}
function tblVariedad(vari){
	var variedad;
	$.each(SESION.variedad, function(k,v){
		if(v.codigo == vari){
			variedad = v.variedad;
		}
	})
	return variedad;
}
function tblCuartel(cuar){
	var cuartel;
	$.each(CUARTEL, function(k,v){
		if(v.codigo == cuar){
			cuartel = v.nombre;
		}
	})
	return cuartel;
}
function tblFaena(fae){
	var faena;
	$.each(FAENA, function(k,v){
		if(v.codigo == fae){
			faena = v.faena;
		}
	})
	return faena;
}
function cargarTipoPago(){
	var pago = "<option value=''>Seleccione</option>";
	$.each(tipo_pago, function(k,v){
		pago += "<option value='"+v.codigo+"'>"+v.descripcion+"</option>";
	})
	return pago;
}
function cargarFaena(){
	var zona = "";
	$.each(SESION.campo, function(k,v){
		if(CAMPO == v.campo){
			zona = v.zona;
			return false;
		}
	})
	var faena = "<option value=''>Seleccione</option>";
	$.each(FAENA, function(k,v){
		if(zona == v.zona){
			faena += "<option value='"+v.codigo+"'>"+v.faena+"</option>";
		}
	})
	return faena;
}
function validateLaborWithRend(labor, id){
	var vali = false;
	$.each(tipos_cargosJson, function(k,v){
		if(v.codigo == id){
			vali = v.revaja;
		}
	})
	return vali;
}
function validarLaborCampo(faena, labor){
	var reque;
	var zona = "";
	$.each(SESION.campo, function(k,v){
		if(CAMPO == v.campo){
			zona = v.zona;
		}
	})
	$.ajax({
		url : "/simpleWeb/json/AGRO/GET_LABOR_FAENA/"+faena+"/"+zona,
		type : "GET",
		dataType : 'json',
		async : false,
		success : function(data) {
			$.each(data, function(k,v){
				if(v.codigo == labor){
					reque = v.maquinaria;
				}
			})
		}
	})
	return reque;
}
function changeLabor(labor, id){
	var faena = $("#faena"+id).val();
	var zona = "";
	$.each(SESION.campo, function(k,v){
		if(CAMPO == v.campo){
			zona = v.zona;
		}
	})
	$.ajax({
		url : "/simpleWeb/json/AGRO/GET_LABOR_FAENA/"+faena+"/"+zona,
		type : "GET",
		dataType : 'json',
		async : false,
		success : function(data) {
			$.each(data, function(k,v){
				if(v.codigo == labor){
					if(v.maquinaria == 0){
						$("#maquinaria"+id).prop("disabled", true);
						$("#implemento"+id).prop("disabled", true);
					}else{
						$("#maquinaria"+id).prop("disabled", false);
						$("#implemento"+id).prop("disabled", false);
					}
					$.each(tipos_cargosJson, function(kj,vj){
						if(vj.codigo == id){
							vj.labor = labor;
							vj.revaja = v.rebaja;
						}
					})
				}
			})
		}
	})
}
function cambioFaena(faena, id){
	//TODO
	var labor = "<option value=''>Seleccione</option>";
	var zona = "";
	$.each(SESION.campo, function(k,v){
		if(CAMPO == v.campo){
			zona = v.zona;
		}
	})
	$.ajax({
		url : "/simpleWeb/json/AGRO/GET_LABOR_FAENA/"+faena+"/"+zona,
		type : "GET",
		dataType : 'json',
		async : false,
		success : function(data) {
			LABOR_GENERAL = data;
			laborTbl(rendimiento.labor);
			$.each(data, function(k,v){
				labor += "<option value='"+v.codigo+"'>"+v.labor+"</option>";
			})
		}
	})
	$("#labor"+id).html(labor);
	return labor;
}
function laborTbl(labor){
	$.each(LABOR_GENERAL, function(k,v){
		if(v.codigo == labor){
			$("#labor").html(v.labor);
		}
	})
}
function changeVariedad(variedad, id){
	var cuartel = "<option value=''>Selecciones</option>";
	var count = 0;
	$.each(CUARTEL, function(k,v){
		if(v.variedad == variedad && CAMPO == v.campo){
			cuartel += "<option value='"+v.codigo+"'>"+v.nombre+"</option>";
			count++;
		}
	})
	var cuartel_null = "<option value=''>Sin Cuartel</option>";
	if(count == 0){
		$("#cuartel"+id).html(cuartel_null);
	}else{
		$("#cuartel"+id).html(cuartel);
	}
}
function changeEspecie(especie, id){
	var variedad = "<option value=''>Selecciones</option>";
	var cuartel = "<option value=''>Selecciones</option>";
	var count = 0;
	$.each(CUARTEL, function(k,v){
		if(v.especie == especie && CAMPO == v.campo){
			cuartel += "<option value='"+v.codigo+"'>"+v.nombre+"</option>";
			count++;
		}
	})
	$.each(SESION.variedad, function(k,v){
		if(v.especie == especie){
			variedad += "<option value='"+v.codigo+"'>"+v.variedad+"</option>";
		}
	})
	
	$("#variedad"+id).html(variedad);
	var cuartel_null = "<option value=''>Sin Cuartel</option>";
	if(count == 0){
		$("#cuartel"+id).html(cuartel_null);
	}else{
		$("#cuartel"+id).html(cuartel);
	}
}
function loadEspecie(id){
	var especie = "<option value=''>Seleccione</option>";
	$.each(SESION.especie, function(k,v){
		especie += "<option value='"+v.codigo+"'>"+v.especie+"</option>";
	})
	return especie;
}
var cargos;
function loadTipos_Pago(id){
	var cargosAux = [];
	$.each(datosTrab, function(k,v){
		if(k == id){
			var json = {
				id: 0,
				codigo: "Ficha",
				descripcion: v.sueldoDiario
			}
			cargosAux.push(json);
		}
	})
	var tBody = "";
	$.ajax({
		url : "/simpleWeb/json/AGRO/GET_CARGOS/",
		type : "GET",
		dataType : 'json',
		async : false,
		success : function(data) {
			$.each(data, function(k,v){
				cargosAux.push(v);
			})
		}
	})
	var valor = $("#valor"+id).val().replace(".", "")*1;
	var c = 0;
	cargos = cargosAux;
	$.each(cargosAux, function(k,v){
		v.descripcion = v.descripcion*1;
		if(c == 0 || valor == v.descripcion*1){
			tBody += "<tr>";
			tBody += 	"<td><div class='form-check'><input class='form-check-input' type='radio' checked value='"+v.descripcion*1+"' id='baseSelect"+id+"' name='optvalor"+id+"'><label class='form-check-label' for='baseSelect"+id+"'></label></div></td>";
			tBody += 	"<td>"+v.codigo.bold()+"</td>";
			tBody += 	"<td>$ "+formatNumber(v.descripcion.toFixed(0)*30).fontcolor("red")+"</td>";
			tBody += 	"<td>$ "+formatNumber(v.descripcion.toFixed(0)).fontcolor("red")+"</td>";
			tBody += 	"<td>$ "+formatNumber((v.descripcion.toFixed(0)/9).toFixed(0)).fontcolor("red")+"</td>";
			tBody += "</tr>";
		}else{
			tBody += "<tr>";
			tBody += 	"<td><div class='form-check'><input class='form-check-input' type='radio' value='"+v.descripcion*1+"' id='baseSelect"+id+"' name='optvalor"+id+"'><label class='form-check-label' for='baseSelect"+id+"'></label></div></td>";
			tBody += 	"<td>"+v.codigo.bold()+"</td>";
			tBody += 	"<td>$ "+formatNumber(v.descripcion.toFixed(0)*30).fontcolor("red")+"</td>";
			tBody += 	"<td>$ "+formatNumber(v.descripcion.toFixed(0)).fontcolor("red")+"</td>";
			tBody += 	"<td>$ "+formatNumber((v.descripcion.toFixed(0)/9).toFixed(0)).fontcolor("red")+"</td>";
			tBody += "</tr>";
		}
		c++;
	})
	return tBody;
}
function cancelAddPisoDia(id){
//	$("#basePiso"+id).val("");
	closeModal();
}
function addTranajadorCuadrilla(){
	var campo;
	$.each(SESION.campo, function(k,v){
		if(v.campo == CAMPO){
			campo = v.codigo;
		}
	})
	$.ajax({
		url: IPSERVERWORK+ "/simpleWeb/json/AGRO/getTrabajadoresAgro2/?TRABAJADOR=*&CAMPO=*&RUT=*&CARGO=*&FECHA=*&CONTRATISTA="+rendimiento.contratista,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			loading.hide();
			auxArr = [];
			$.each(data, function(k,v){
				auxArr.push(v.rut+" | "+v.nombre);
			})
			$("#addTrabakador").autocomplete({
				source: auxArr,
				select: function(a, b){
					var rut = b.item.value.toString().split(" | ");
					$.ajax({
						url: IPSERVERWORK + "/simpleWeb/json/AGRO/getTrabajadoresAgro/?TRABAJADOR=*&CAMPO=*&RUT="+rut[0]+"&CARGO=*&FECHA="+rendimiento.fecha,
						type:	"POST",
						dataType: 'json',
						async: false,
						data: {rut: rut[0]},
						success: function(data){
							apendTabla(data);
						}
					})
				}
			}).dblclick(function(){
				$(this).autocomplete("search", " ");
			});
			$("#add_Trabakador").autocomplete({
				source: auxArr,
				select: function(a, b){
					var rut = b.item.value.toString().split(" | ");
					$.ajax({
						url: IPSERVERWORK + "/simpleWeb/json/AGRO/getTrabajadoresAgro/?TRABAJADOR=*&CAMPO=*&RUT="+rut[0]+"&CARGO=*&FECHA="+rendimiento.fecha,
						type:	"POST",
						dataType: 'json',
						async: false,
						data: {rut: rut[0]},
						success: function(data){
							apendTabla(data);
						}
					})
				}
			}).dblclick(function(){
				$(this).autocomplete("search", " ");
			});
		}
	})
}
function cleanRut(){
	setTimeout(function(){ $("#addTrabakador").val(""); $("#add_Trabakador").val("");}, 100);
}
function getMaquinaria(c){
	var jsonMaq = {
		maquinaria: "<option value=''>Seleccionar</option>",
		implemento: "<option value=''>Seleccionar</option>"
	}
	$.ajax({
		url: IPSERVERSAP + "/JSON_BAPI_EQUI_GETLIST.aspx?CENTRO="+c,//ZREP
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			$.each(data.EQUIPMENT_LIST, function(ka,va){
				if(va.EQUICATGRY == "M"){
					jsonMaq.maquinaria += '<option value="'+va.EQUIPMENT+'">'+va.DESCRIPT+'</option>';
				}
				if(va.EQUICATGRY != "T" && va.EQUICATGRY != "V"){
					jsonMaq.implemento += '<option value="'+va.EQUIPMENT+'">'+va.DESCRIPT+'</option>';
				}
			})
		}
	})
	return jsonMaq;
}
function rechazar(){
	var option = {
		title: "Observacion",
		input: "text",
		id: "obsRechazo",
		required: true
	}
	var c = confirmar.confirm("¿Desea rechazar este Rendimiento?");
	$(c.aceptar).click(function(){
		$.ajax({
			url: "/simpleWeb/json/AGRO/UPDATE_RENDIMIENTO?TIPO=MASIVO&ESTADO=7&CODIGO="+codigo_rg,
			type:	"GET",
			dataType: 'json',
			async: false,
			success: function(data){
				var a = alerta("Se ha rechazado este Rendimiento");
				$(a.aceptar).click(function(){
					history.back();
				})
			},errror: function(er){
				alerta("Ha ocurrido un error interno del servidor, consulte con el administrador del sistema")
			}
		})
	})
}
function horasTrabajadas(input, id){
	if(input.value > 9){
//		$("#hours"+id).show();
	}else{
//		$("#hours"+id).hide();
	}
	var valor_piso; 
	if(input.value == 0){
		$("#rendimiento"+id).prop("disabled", true);
		$("#bono_dos"+id).prop("disabled", true);
		$("#rendimiento"+id).val(0);
		$("#bono_dos"+id).val(0);
		valor_piso = valorXhora * input.value;
	}else{
		var input_rut;
		$.each(datosTrab, function(k,v){
			if(id == k){
				input_rut = v.rut;
			}
		})
		var res_horas;
		var vres_horas;
		var c_res = 0;
		$.each(datosTrab, function(k,v){
			if(input_rut == v.rut){
				vres_horas = v.horas_restantes;
				res_horas = v.horas_restantes - $(input).val();
			}
			c_res++;
			if(c_res == datosTrab.length){
				if(res_horas < 0){
//					alerta("djkfsdfhjkdj")
				}
			}
		})
		
		$("#rendimiento"+id).prop("disabled", false);
		$("#bono_dos"+id).prop("disabled", false);
		valor_piso = valorXhora * input.value;
	}
	changeLabor($("#labor"+id).val(), id);
	if(valor_piso > datosGenerales.rendimiento_general[0].base_piso_dia && input.value == datosGenerales.rendimiento_general[0].horas){
		valor_piso = datosGenerales.rendimiento_general[0].base_piso_dia;
	}
	$("#valor"+id).val(formatNumber(valor_piso));
}
function calcularTotales(){
	var total_liquidos = 0;
	$(".liquido").each(function(){
		total_liquidos = total_liquidos*1 + formatNumberDB($(this).val());
	})
	$("#total_liquidos").val(formatNumber(String(total_liquidos).split(".").join(",")));
	var bonos = 0;
	$(".bono_dos").each(function(){
		bonos = bonos*1 + formatNumberDB($(this).val());
	})
	$(".bono").each(function(){
		bonos = bonos*1 + formatNumberDB($(this).val());
	})
	$("#total_bonos").val(formatNumber(String(bonos).split(".").join(",")));
}
function calcularValor(input, id){
	if(input.id == "horas_trabajadas"+id){
		horasTrabajadas(input, id);
	}
	var valor_liquido = 0;
	if(input.id == "basePiso"+id || input.id == "tipo_pago"+id){
		var tp = $("#tipo_pago"+id).val();
		var bpd = $("#basePiso"+id).val();
		if(tp*1 == 2 && bpd*1 == 2){
			$("#btnCambio"+id).prop("disabled", true);
//			$("#valor"+id).prop("disabled", true);
			$("#valor"+id).val(0);
		}else{
			$("#btnCambio"+id).prop("disabled", false);
			$("#valor"+id).prop("disabled", false);
			$.each(datosTrab, function(k,v){
				if(id == k){
					$("#valor"+id).val(formatNumber(v.sueldoDiario.toFixed(0)));
				}
			})
		}
	}
	if(input.id == "confirmBase"+id){
		var radios = document.getElementsByName('optvalor'+id);
		for (var i = 0, length = radios.length; i < length; i++) {
			if (radios[i].checked) {
				sueldo_base = radios[i].value;
				$.each(cargos, function(k,v){
					if(sueldo_base*1 == v.descripcion){
						$("#cargo"+id).val(v.id);
					}
				})
				$("#valor"+id).val(formatNumber((sueldo_base*1).toFixed(0)));
				$("#btnCambio"+id).prop("disabled", false);
				closeModal();
				break;
			}
		}
	}
	var basePiso = $("#basePiso"+id).val();
	var horas_trabajadas = formatNumberDB($("#horas_trabajadas"+id).val());
	var horas_extras = formatNumberDB($("#horas_extras"+id).val());
	var hrx = formatNumberDB($("#hx").val());
	var tipo_pago = formatNumberDB($("#tipo_pago"+id).val());
	var rendimiento = formatNumberDB($("#rendimiento"+id).val());
	var bono = formatNumberDB($("#bono"+id).val());
	var bono_dos = formatNumberDB($("#bono_dos"+id).val());
	var valor = 0;
	if(tipo_pago*1 == 1 && $("#valor"+id)[0].disabled == false || basePiso*1 == 1){
		valor = formatNumberDB($("#valor"+id).val());
	}
	if(rendimiento != ""){
		$("#rend"+id).removeClass("has-error");
	}
	if(valor != ""){
		$("#val"+id).removeClass("has-error");
	}
	if(input.value < 0){
		input.value = "";
	}
	if(horas_extras > 2 || hrx > 2){
		alerta("Las horas Extras no pueden exceder el numero legal permitido (2)")
		$("#horas_extras"+id).val("");
		$("#hx").val("");
	}
	valor_liquido = valor_liquido + ((horas_extras*1) * hora_extra_precio);
	valor_liquido = valor_liquido + ((horas_trabajadas*1) * hora_precio);
	valor_liquido = valor_liquido + (bono*1);
	valor_liquido = valor_liquido + (bono_dos*1);
	if(tipo_pago == 1){
		$("#valor_rendimiento"+id).attr("disabled", false);
		var valor_rendimiento = (valor_general*1) * (rendimiento*1);
		valor_liquido = valor_liquido + valor_rendimiento;
		$("#valor_rendimiento"+id).val(valor_rendimiento);
	}else{
		$("#valor_rendimiento"+id).attr("disabled", true);
		valor_liquido = valor_liquido + valor*1;
		$("#valor_rendimiento"+id).val("");
	}
	var valor_rendimiento = (valor_general) * (rendimiento);
	$("#valor_rendimiento"+id).val(formatNumber(String(valor_rendimiento).split(".").join(",")));
	$("#val_liq"+id).removeClass("has-error");

	switch(tipo_pago*1){
		case 1:
			$("#valor_liquido"+id).val(formatNumber(valor + (bono) + (bono_dos)));
			break;
		case 2:
			if(valor_rendimiento*1 > valor*1){
	    		$("#valor_liquido"+id).val(formatNumber(String(valor_rendimiento + (bono*1) + (bono_dos*1)).split(".").join(",")));
	    	}else if(valor_rendimiento*1 == valor*1){
	    		$("#valor_liquido"+id).val(formatNumber(String(valor_rendimiento + (bono*1) + (bono_dos*1)).split(".").join(",")));
	    	}else if(valor_rendimiento*1 < valor*1){
	    		$("#valor_liquido"+id).val(formatNumber(String(valor + (bono*1) + (bono_dos*1)).split(".").join(",")));
	    	}
			break;
		case 3:
			$("#valor_liquido"+id).val(formatNumber(valor + valor_rendimiento + (bono) + (bono_dos)));
			break;
		default:
	}
	calcularTotales();
}