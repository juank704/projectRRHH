var hora_extra_precio;
$(document).ready(function(){
	$.ajax({
		url: IPSERVERSAP+"JSON_BAPI_INTERNALORDER_GETLIST.aspx?TIPO=Z600",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			MACRO = data;
		}
	})
	console.log(CUARTEL)
	$("#next").hide();
	loadFaena();
	cargaCampos();
	loadByURL();
	$(".select2.select2-container.select2-container--bootstrap").attr("style", "");
})
valor_general = 0;
var MACRO;
var CECO;
var aux = [];
var rg = [];
var supervisores;
var FAENA;
var LABOR;
var trabajador;
var cargo = 0;
var revaja;
var cuadrillaSelect = {
	codigo: 0,
	estado: 0,
	fecha_creacion: 0,
	nombre_cuadrilla: "",
	supervisor: 0,
	rendimiento_general: [],
	trab: []
};
var trabajadoresCuadrilla = [];
var CUARTEL = getCuartel();
var laborBloqueo = [];
var datosActuales;
var CAMPO;
var get = getINFO();
function loadByURL(){
	if(get){
		var url = "/simpleWeb/json/AGRO/GET_RD_INDIVIDUAL?CODIGO="+get.CODIGO*1;
		if(get.CODIGO_RG){
			url = "/simpleWeb/json/AGRO/GET_RD_INDIVIDUAL_RG?CODIGO="+get.CODIGO*1+"&CODIGO_RG="+get.CODIGO_RG*1;
		}
		$.ajax({
			url: url,
			type:	"GET",
			dataType: 'json',
			async: false,
			success: function(v){
				console.log(v)
				//TODO
				rd_i = v;
				var valorLiquidoMod = v.valor_rendimiento/v.rendimiento;
				if(valorLiquidoMod.toString() == "NaN"){
					valorLiquidoMod = 0;
				}
				if(v.cuartel == 0){
					$("#check_ingreso").trigger("click");
				}
				baseCargo = v.baseCargo;
				$("#fecha_rendimiento").val(formatFecha(v.fecha));
				$("#campo_rendimiento").val(v.nombre).trigger("change");
				if(v.cuartel == 0){
					$("#macro").val(v.macroco).trigger("change");
					if(v.ceco){
						console.log(v.ceco)
						$("#ceco").val(v.ceco).trigger("change");
					}else{
						console.log(v.ordenco)
						$("#ceco").val(v.ordenco).trigger("change");
					}
				}else{
					$("#especie_rendimiento").val(v.especie).trigger("change");
					$("#variedad_rendimiento").val(v.variedad).trigger("change");
					$("#cuartel_rendimiento").val(v.cuartel).trigger("change");
				}
				if(get.CODIGO_RG){
					$("#supervisor").val(v.supervisor).trigger("change");
				}else{
					$("#supervisor").val(v.supervisor_i).trigger("change");
				}
				$("#contratista").val(v.idContratista*1).trigger("change");
				$("#addtrabajdor").val(v.nvnombre.split(" | ")[0]).trigger("change");
				$("#faena_rendimiento").val(v.faena).trigger("change");
				$("#labor_rendimiento").val(v.labor).trigger("change");
				$("#maquinaria").val(v.maquinaria).trigger("change");
				$("#implemento").val(v.implemento).trigger("change");
				$("#bus").val(v.bus).trigger("change");
				if(v.n_personas == 0){
					v.n_personas = 1;
				}
				$("#cantidad_personas").val(v.n_personas).trigger("keyup");
				if(get.CODIGO_GR){
					$("#horas_trabajadas").val(formatNumber(String(v.horas_totales).split(".").join(","))).trigger("keyup");
				}else{
					$("#horas_trabajadas").val(formatNumber(String(v.horas_trabajadas).split(".").join(","))).trigger("keyup");
				}
				
				$("#horas_extras").val(v.horas_extras);
				if(get.CODIGO_RG){
					$("#basePiso").val(formatNumber(String(v.valor).split(".").join(","))).trigger("change");
				}else{
					$("#basePiso").val(formatNumber(String(v.base_piso_hora).split(".").join(","))).trigger("change");
				}
				$("#tipo_pago").val(v.tipo_trato).trigger("change");
				if((v.valor_liquido - v.bono1) == v.valor){
					$("#checkDia").trigger("click");
				}
				$("#valor_dia").val(formatNumber(String(v.valor).split(".").join(","))).trigger("keyup");
				$("#valor_general").val(formatNumber(String(valorLiquidoMod).split(".").join(","))).trigger("keyup");
				$("#rendimiento").val(formatNumber(String(v.rendimiento).split(".").join(","))).trigger("keyup");
				$("#valor_rendimiento").val(formatNumber(String(v.valor_rendimiento).split(".").join(","))).trigger("keyup");
				$("#bono").val(formatNumber(String(v.bono1).split(".").join(","))).trigger("keyup");
				$("#bono_dos").val(formatNumber(String(v.bono2).split(".").join(","))).trigger("keyup");
				$("#valor_liquido").val(formatNumber(String(v.valor_liquido).split(".").join(",")));
				var campo;
				$.each(SESION.campo, function(ka,va){
					if(va.campo == v.nombre){
						campo = va.codigo;
					}
				})
				var rut = v.nvnombre.toString().split(" | ");
				$.ajax({
					url: IPSERVERWORK+ "/simpleWeb/json/AGRO/getTrabajadoresAgro/?TRABAJADOR=*&CAMPO=*&RUT="+rut[0]+"&CARGO=*&FECHA="+formatFecha($("#fecha_rendimiento").val())+"&CONTRATISTA=00"+$("#contratista").val(),
					type:	"GET",
					dataType: 'json',
					async: false,
					success: function(data){
						cargo = data[0].cargo;
						trabajador = data[0];
						loading.hide();
						var validate = true;
						$.each(cuadrillaSelect.trab, function(ka,va){
							if(cuadrillaSelect.trab.length != 0 && cuadrillaSelect.trab[ka].idTrabajador == data[0].idTrabajador ){
								//cleanRut();
								validate = false;
							}
						})
					},error: function(er){
						console.log(er);
					}
				})
				$(".no-edit").prop("disabled", true);
				$("#addRendimientoGeneralTabla").trigger("click");
			}
		})
	}
}
function recorrer(campo){
	var especie_rendimiento = "<option value=''>Seleccione Especie</option>";
	var especies = [];
	$.each(CUARTEL, function(k,v){
		if(v.campo == campo){
			$.each(SESION.variedad, function(ka,va){
				if(va.codigo == v.variedad){
					$.each(SESION.especie, function(kb,vb){
						if(va.especie == vb.codigo && especies.indexOf(vb.codigo) == -1){
							especies.push(vb.codigo);
							especie_rendimiento += "<option value="+vb.codigo+">"+vb.especie+"</option>";
						}
					})
				}
			})
		}
	})
	loading.hide();
	$('#especie_rendimiento').html(especie_rendimiento);
}
function activateBasePIsoDia(){
	var campo = $("#campo_rendimiento").val();
	var horas = $("#horas_trabajadas").val();
	if(campo && horas){
		$("#baseDiaDiv").removeClass("disabledbutton");
	}else{
		$("#baseDiaDiv").addClass("disabledbutton");
	}
}
var horasMes;
function resetSupervisor(input){
	var hoy = new Date(dateHoy());
	var newDate = new Date(formatFecha(input.value));
	if(hoy < newDate){
		$("#message").show();
		$("#"+input.id).addClass("has-error");
		$("#"+input.id).val("");
	}else{
		$("#message").hide();
	}
	var fecha = formatFecha(input.value);
	fecha = fecha.split("-");
	fecha = fecha[0]+""+fecha[1];
	$.ajax({
		url: "/simpleWeb/json/AGRO/GET_HORAS_MES/"+fecha*1,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			horasMes = data;
		}
	})
}
function cargaCampos(){
	var especie_rendimiento = "<option value=''>Seleccione Especie</option>";
	$.each(SESION.especie, function( key, val ) {
		especie_rendimiento += "<option value="+val.codigo+">"+val.especie+"</option>";
	});
	$('#especie_rendimiento').html(especie_rendimiento);
	$('#especie_rendimiento_mod').html(especie_rendimiento);
	loading.hide();
}
function loadCuadrilla(){
	var id = $("#supervisor").val();
	$.ajax({
		url: "/simpleWeb/json/AGRO/GET_CUADRILLA_SUPERVISOR/"+id,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			var selectCuadrilla = "<option value=''>Seleccione</option>";
			$.each(data, function(k,v){
				var crl = 1;
				selectCuadrilla += "<option value="+v.fecha+">"+v.fecha+" | "+v.nsupervisor+"</option>";
			})
			$("#selectCuadrilla").html(selectCuadrilla);
		}
	})
}
var meses=["","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
function returnMes(fecha){
	var mes;
	fecha = fecha.split("-");
	fecha = fecha[1];
	if(fecha*1 < 10){
		fecha = fecha.replace("0", "");
	}
	mes = meses[fecha];
	return mes;
}
function getBloqueoFaena(num){
	var campo = $("#campo_rendimiento").val();
	var fecha = $("#fecha_rendimiento").val();
	var especie = $("#especie_rendimiento").val();
	if(!especie){
		especie = 0;
	}
	var zona = "";
	$.each(SESION.campo, function(k,v){
		if(campo == v.campo){
			zona = v.zona;
			return false;
		}
	})
	var mes = returnMes(fecha);
	$.ajax({
		url: "/simpleWeb/json/AGRO/GET_LABOR_BLOQUEO/"+campo+"/"+mes.toLowerCase()+"/"+especie,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			$.each(data, function(k,v){
				laborBloqueo.push(v.id_labor);
			})
			var faena_rendimiento = "<option value=''></option>";
			$.each(FAENA, function(k, v){
				if(laborBloqueo.indexOf(v.codigo) == -1 && v.zona == zona){
					faena_rendimiento += "<option value=" + v.codigo + ">"+ v.faena + "</option>";
				}
			})
			$("#faena_rendimiento").html(faena_rendimiento);
		}
	})
}
function loadTrabContratistas(){
	$("#addtrabajdor").val("");
	$.ajax({
		url: IPSERVERWORK+ "/simpleWeb/json/AGRO/getTrabajadoresAgro2/?TRABAJADOR=*&CAMPO=*&RUT=*&CARGO=*&FECHA="+formatFecha($("#fecha_rendimiento").val())+"&CONTRATISTA="+"00"+$("#contratista").val(),
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			var addtrabajador = "<option value=''></option>";
			$.each(data, function(k,v){
				addtrabajador += "<option value='"+v.rut+"'>"+v.rut+" | "+(v.nombre).toUpperCase()+"</option>";
			})
			$("#addtrabajdor").html(addtrabajador);
		}
	})
}
function cargarAddTrabajador(rut){
	if(rut){
		$.ajax({
			url: IPSERVERWORK+ "/simpleWeb/json/AGRO/getTrabajadoresAgro/?TRABAJADOR=*&CAMPO=*&RUT="+rut+"&CARGO=*&FECHA="+formatFecha($("#fecha_rendimiento").val())+"&CONTRATISTA="+$("#contratista").val(),
			type:	"GET",
			dataType: 'json',
			async: false,
			success: function(data){
				cargo = data[0].cargo;
				trabajador = data[0];
				loading.hide();
				var validate = true;
				$.each(cuadrillaSelect.trab, function(ka,va){
					if(cuadrillaSelect.trab.length != 0 && cuadrillaSelect.trab[ka].idTrabajador == data[0].idTrabajador ){
						//cleanRut();
						validate = false;
					}
				})
			},error: function(er){
				console.log(er);
			}
		})
	}
}
function cargarContratista(sociedad){
	//var url = IPSERVERSAP+ "JSON_BAPI_LISTA_PROVEEDORES.aspx?SOCIEDAD="+sociedad;
	var url = IPSERVERSAP+ "JSON_ZMOV_10036.aspx?CONTRATISTA=X";
	$.ajax({
		url: url,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			var selectContratista = "<option value=''>Seleccione</option>";
			$.each(data.ET_DATPROV, function(k,v){
				selectContratista += "<option value="+parseInt(v.LIFNR)+">"+v.STCD1+" "+v.NAME1+"</option>";
			})
			$("#contratista").html(selectContratista);
		}
	})
}
function cambioCampo(campo){
	loading.show();
	activateBasePIsoDia();
	$.each(SESION.campo, function(k,v){
		if(v.campo == campo){
			loadSupervisor(v.codigo);
			cargarContratista(v.sociedad);
		}
	})
	var campoId;
	var gcc = "";
	$.each(SESION.campo, function(k,v){
		if($("#campo_rendimiento").val() == v.campo){
			campoId = v.codigo;
			sociedad = v.sociedad;
			grupo = v.grupo;
			gcc = v.grupo_co;
			return false;
		}
	})
	recorrer(campo)
	if(!$("#check_ingreso")[0].checked){
		$.ajax({
			url: IPSERVERSAP+"JSON_BAPI_COSTCENTER_GETLIST1.aspx?SOCIEDAD="+sociedad+"&GRUPO="+grupo,
			type:	"GET",
			dataType: 'json',
			async: false,
			success: function(data){
				CECO = "<option value=''></option>";
				var cecoInCuartel = [];
				$.each(CUARTEL,function(k,v){
					cecoInCuartel.push(v.ceco);
				})
				$.each(data.COSTCENTERLIST, function(k,v){
					if(cecoInCuartel.indexOf(v.COSTCENTER) == -1){
						CECO += "<option value="+v.COSTCENTER+">"+v.DESCRIPT+"</option>";
					}
				})
				$("#ceco").html(CECO);
			}
		})
		var arrGcc = gcc.split(";");
		var macros = "<option value=''></option>";
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
		$("#macro").html(macros);
	}
	var fecha = $("#fecha_rendimiento").val();
	if(fecha){
		var mes = returnMes(fecha);
//		if($("#especie_rendimiento").val()){
			getBloqueoFaena(1);
//		}
		var cuartel_rendimiento = "<option value=''>Seleccione</option>";
		$.each(SESION.sector, function(k,v){
			if(v.campo == campo){
				$.each(CUARTEL, function(ka,va){
					if(va.sector == v.sector){
						cuartel_rendimiento += "<option value='"+va.codigo+"'>"+va.nombre+"</option>";
					}
				})
			}
		})
		$("#cuartel_rendimiento").html(cuartel_rendimiento);
	}else{
		alerta("Debe seleccionar una Fecha");
		cargaCampos();
		return;
	}
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
				if(va.EQUICATGRY == "I"){
					jsonMaq.implemento += '<option value="'+va.EQUIPMENT+'">'+va.DESCRIPT+'</option>';
				}
			})
		}
	})
	$("#maquinaria").html(jsonMaq.maquinaria);
	$("#implemento").html(jsonMaq.implemento);
	return jsonMaq;
}
function changeLabor(labor){
	var faena = $("#faena_rendimiento").val();
	var zona = "";
	$.each(SESION.campo, function(k,v){
		if($("#campo_rendimiento").val() == v.campo){
			zona = v.zona;
		}
	})
	//TODO
	$.ajax({
		url : "/simpleWeb/json/AGRO/GET_LABOR_FAENA/"+faena+"/"+zona,
		type : "GET",
		dataType : 'json',
		async : false,
		success : function(data) {
			$.each(data, function(k,v){
				if(v.codigo == labor){
					if(v.maquinaria == 0){
						$("#maquinaria").prop("disabled", true);
						$("#implemento").prop("disabled", true);
					}else{
						$("#maquinaria").prop("disabled", false);
						$("#implemento").prop("disabled", false);
					}
					revaja = v.rebaja;
					if(revaja == 3){
						$("#rendimiento").removeClass("required");
					}else{
						$("#rendimiento").addClass("required");
					}
				}
			})
		}
	})
}
function cambioVariedad(variedad){
	var campo = $("#campo_rendimiento").val();
	var cuartel_rendimiento = "<option value=''>Seleccione</option>";
	$.each(CUARTEL, function(ka,va){
		if(va.variedad == variedad && va.campo == campo){
			cuartel_rendimiento += "<option value='"+va.codigo+"'>"+va.nombre+"</option>";
		}
	})
	$("#cuartel_rendimiento").html(cuartel_rendimiento);
}
function loadFaena(){
	$.ajax({
		url: "/simpleWeb/json/AGRO/GETFAENA/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			FAENA = data;
		}
	})
}
function withCuartel(input){
	if(!input.checked){
		$("#especie_rendimiento").prop("disabled", true);
		$("#especie_rendimiento").removeClass("required");
		$("#especie_rendimiento").val("").trigger("change");
		$("#variedad_rendimiento").prop("disabled", true);
		$("#variedad_rendimiento").removeClass("required");
		$("#variedad_rendimiento").val("");
		$("#cuartel_rendimiento").val("");
		$("#cuartel_rendimiento").removeClass("required");
		$("#cuartel_rendimiento").attr("disabled", true);
		$(".hide-show").toggle();
		var zona;
		if($("#campo_rendimiento").val()){
			var sociedad;
			var grupo;
			var gcc = "";
			$.each(SESION.campo, function(k,v){
				if($("#campo_rendimiento").val() == v.campo){
					campoId = v.codigo;
					sociedad = v.sociedad;
					grupo = v.grupo;
					zona = v.zona;
					gcc = v.grupo_co;
					return false;
				}
			})
			$.getJSON(IPSERVERSAP+"JSON_BAPI_COSTCENTER_GETLIST1.aspx?SOCIEDAD="+sociedad+"&GRUPO="+grupo, function(data){
				CECO = "<option value=''></option>";
				var cecoInCuartel = [];
				$.each(CUARTEL,function(k,v){
					cecoInCuartel.push(v.ceco);
				})
				$.each(data.COSTCENTERLIST, function(k,v){
					if(cecoInCuartel.indexOf(v.COSTCENTER) == -1){
						CECO += "<option value="+v.COSTCENTER+">"+v.DESCRIPT+"</option>";
					}
				})
				$("#ceco").html(CECO);
			})
			var macros = "<option value=''></option>";
			$.ajax({
				url: IPSERVERSAP+ "JSON_BAPI_INTERNALORDRGRP_GETDETAIL.aspx?GRUPO="+gcc,
				type:	"GET",
				dataType: 'json',
				async: false,
				success: function(data){
					$.each(data.HIERARCHYNODES, function(k,v){
						var e = v.GROUPNAME;
						if(e[e.length-1]*1 == 1 && e[e.length-2]*1 == 0){
							macros += "<option value='"+v.GROUPNAME+"'>"+v.DESCRIPT+"</option>";
						}
					})
					macros += "<option value='1'>OTROS CENTRO DE COSTO</option>";
					$("#macro").html(macros);
				}
			})
		}
		var faena_rendimiento = "<option value=''></option>"
		$.each(FAENA, function(k, v){
			if(laborBloqueo.indexOf(v.codigo) == -1 && v.zona == zona){
				faena_rendimiento += "<option value=" + v.codigo + ">"+ v.faena + "</option>";
			}
		})
		$("#faena_rendimiento").html(faena_rendimiento);
	}else{
		$("#especie_rendimiento").prop("disabled", false);
		$("#especie_rendimiento").addClass("required");
		$("#variedad_rendimiento").prop("disabled", false);
		$("#variedad_rendimiento").addClass("required");
		$("#cuartel_rendimiento").addClass("required");
		$("#cuartel_rendimiento").attr("disabled", false);
		$(".hide-show").toggle();
		$("#macro").val("");
		$("#ceco").val("");
	}
}
function rtrnValCeco(e){
	var r = false;
	if(e[e.length-1]*1 == 6 && e[e.length-2]*1 == 1 && e != ""){
		r = true;
	}
	return r;
}
function selectMacro(input){
	var ordenco = "<option value=''></option>"; 
	var campo = $("#campo_rendimiento").val();
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
		var cecos;
		$.each(SESION.campo, function(k,v){
			if(v.campo == $("#campo_rendimiento").val()){
				sociedad = v.idSociedad;
				grupo = v.grupo_ceco_work;
				cecos = v.cecos;
				return false;
			}
		})
		$.ajax({
			url: IPSERVERSAP+"JSON_BAPI_COSTCENTER_GETLIST1.aspx?SOCIEDAD="+sociedad+"&GRUPO="+grupo+"&CECO="+cecos,
			type:	"GET",
			dataType: 'json',
			async: false,
			success: function(data){
				CECO = "<option value=''></option>";
				var auxCeco = [];
				$.each(data.COSTCENTERLIST, function(k,v){
					if(auxCeco.indexOf(v.COSTCENTER) == -1){
						CECO += "<option value="+v.COSTCENTER+">"+v.DESCRIPT+"</option>";
						auxCeco.push(v.COSTCENTER);
					}
					
				})
				$("#ceco").html(CECO);
			}
		})
//		$("#ceco").append(CECO);
	}else{
		$("#ceco").html(ordenco);
	}
	
}
function cambioFaena(faena){
	var zona = "";
	$.each(SESION.campo, function(k,v){
		if($("#campo_rendimiento").val() == v.campo){
			zona = v.zona;
		}
	})
	//TODO
	$.ajax({
		url : "/simpleWeb/json/AGRO/GET_LABOR_FAENA/"+faena+"/"+zona,
		type : "GET",
		dataType : 'json',
		async : false,
		success : function(data) {
			LABOR = data;
			var labor_rendimiento = "<option value=''>Seleccione</option>"
			$.each(data, function(k, v){
				labor_rendimiento += "<option value=" + v.codigo + ">"+ v.labor + "</option>";
			})
			$("#labor_rendimiento").html(labor_rendimiento);
		}
	})
}
function cambioEspecie(especie){
	var variedad_rendimiento = "<option value=''>Seleccione Variedad</option>";
	var arrVarieables = [];
	$.each(CUARTEL, function(k,v){
		if(v.especie == especie*1 && arrVarieables.indexOf(v.variedad) == -1){
			arrVarieables.push(v.variedad);
			variedad_rendimiento += "<option value='"+v.variedad+"'>"+v.nvariedad+"</option>";
			if(v.especie == ""){
				variedad_rendimiento = "<option value=''>Sin Variedad</option>";
			}
		}
	})
	$("#variedad_rendimiento").html(variedad_rendimiento);
	if($("#campo_rendimiento").val()){
		getBloqueoFaena(2);
	}
}
function addCuadrilla(boton){
	$("#addTrabCuadrilla").hide();
//	$("#addCuadrilla").show();
	$("#buscarCuadrilla").hide();
	runEffect();
}
var basePiso = 1;
function basePisoAdd(input){
	if(input.checked){
		basePiso = 1;
		$("#basePiso").prop("disabled", false);
		$("#basePiso").val("");
		$("#basePiso").addClass("required");
		$("#btnChange").prop("disabled", false);
	}else{
		basePiso = 2;
		$("#basePiso").prop("disabled", true);
		$("#basePiso").val(0);
		$("#basePiso").removeClass("required");
		$("#btnChange").prop("disabled", true);
	}
}
function tblCampo(cuartel){
	var campo;
	$.each(CUARTEL, function(k,v){
		if(v.codigo == cuartel){
			$.each(SESION.campo, function(ka,va){
				if(v.campo == va.campo){
					campo = v.descripcion;
				}
			})
		}
	})
	return campo;
}
var hora_precio = 0;
$('#basePiso').change(function(){
	var cantHorasMes = 189;
	var valorMensual = parseInt($('#basePiso').val().replace(".",""));
	var cantHoras = parseFloat($("#horas_trabajadas").val().replace(".",""));
	var valorHora = valorMensual / cantHorasMes;
	var valorDia  = valorHora * cantHoras;
	hora_extra_precio = valorHora * 1.5;
	hora_precio = valorHora;
	if(parseInt(valorDia) == NaN){
		valorDia = 0;
	}
	$('#valor_dia').val(parseInt(valorDia));
});
function cleanRut(){
	setTimeout(function(){ $("#addtrabajdor").val(""); }, 100);
}
function block(){
	var min = $(".min");
	for(var i = 0; i < min.length; i++){
		$(min[i]).val("2018-06-04");
	}
}
function deleteTrab(id){
	$.each(cuadrillaSelect.trab, function(k,v){
		if(v.idTrabajador == id){
			cuadrillaSelect.trab.splice(k, 1);
			$("#tr"+id).remove();
			return false;
		}
	})
	if($("#tbl_Miembros tr").length == 2){
		var tr = "";
		var texto = "No se han Asignado trabajadores";
		tr += "<tr id='trEmpty'><td colspan='5' style='text-align: center;'>"+texto.bold().fontcolor("red")+"</td></tr>";
		$("#body_Miembros").append(tr);
	}
}
function loadSupervisor(campo){
	$.ajax({
		url: IPSERVERWORK+ "/simpleWeb/json/AGRO/getTrabajadoresAgro2/?TRABAJADOR=*&CAMPO="+campo+"&RUT=*&CARGO=8&FECHA="+formatFecha($("#fecha_rendimiento").val())+"&DIGITADOR="+SESION.idUser,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			console.log(data)
			supervisores = data;
			var supervisor = "<option value=''>Seleccione</option>";
			$.each(data, function(k,v){
				supervisor += "<option value='"+v.idTrabajador+"'>"+v.nombre.toUpperCase()+"</option>";
			})
			$("#supervisor").html(supervisor);
		}
	})
}
var row;
function refRen(){
	window.location.href = ("rendimiento?cuadrilla="+row.fecha_creacion+"&supervisor="+row.supervisor);
}
function asignCuadrilla(){
	if(cuadrillaSelect.trab.length == 0){
		alerta("No se han seleccionado trabajadores");
		return;
	}else{
		loading.show();
		row = {
			codigo: 0, 
			nombre_cuadrilla: "Cuadrilla "+dateHoy(),
			supervisor: $("#supervisor").val(),
			fecha_creacion: dateHoy(),
			estado: 0,
			trab: cuadrillaSelect.trab,
			rendimiento_general: [rg]
		}
		$.ajax({
			url : "/simpleWeb/json/AGRO/ADD_CUADRILLA/",
			type : "PUT",
			data : JSON.stringify(row),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept","application/json");
				xhr.setRequestHeader("Content-Type","application/json");
			},
			success : function(data, textStatus, jqXHR) {
				loading.hide();
				alerta("Se ha creado una nueva Cuadrila");
				$(swal.getConfirmButton).click(function(){
					window.location.href = ("rendimiento?cuadrilla="+rg.fecha+"&supervisor="+row.supervisor+"&cuartel="+rg.cuartel);
				})
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alerta("No se ha podido registrar la infomacion, consulte con el administrador del sistema");
			}
		});
	}
}
function cambioCuartel(input){
	if(input.value != ""){
		$("#supervisor").prop("disabled", false);
//		buscarCuadrillaSupervisor(input);
	}
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
	baseSueldo +=				"</tr>";
	baseSueldo +=			"</thead>";
	baseSueldo +=			"<body id='bodyValores'>"+loadTipos_Pago(id)+"</body>";
	baseSueldo +=		"</table>";
	baseSueldo +=	'</div>';
	baseSueldo += 	"<div style='text-align: center;'>";
	baseSueldo += 		"<a id='confirmBase' class='btn green-dark submit-modal'onclick='cambiarPisoDia()'>Aceptar</a>";
	baseSueldo += 		"<a class='btn red' onclick='closeModal();'>Cancelar</a>";
	baseSueldo += 	"</div>";
	popUp("Base Sueldo", baseSueldo, true, "450px", true);
}
function cambiarPisoDia(){
	var radios = document.getElementsByName('optvalor');
	for (var i = 0, length = radios.length; i < length; i++) {
		if (radios[i].checked) {
			$.each(cargos, function(k,v){
				if(selected == v.cargo){
					cargo = v.id;
				}
			})
			sueldo_base = radios[i].value.split(",")[0] * $("#horas_trabajadas").val()*1;
			baseCargo = sueldo_base;
			selected = radios[i].value.split(", ")[1];
			$("#basePiso").val(formatNumber((sueldo_base/horasMes).toFixed(0)));
			closeModal();
			break;
		}
	}
}
var cargos;
var selected;
function loadTipos_Pago(id){
	var cargosAux = [];
	var tBody = "";
	$.ajax({
		url : "/simpleWeb/json/AGRO/GETSUELDOSCARGO/"+$("#campo_rendimiento").val(),
		type : "GET",
		dataType : 'json',
		async : false,
		success : function(data) {
			$.each(data, function(k,v){
				cargosAux.push(v);
			})
		}
	})
	var c = 0;
	var valor = $("#basePiso").val().split(".").join("");
	cargos = cargosAux;
	$.each(cargosAux, function(k,v){
		if(selected == v.cargo){
			tBody += "<tr>";
			tBody += 	"<td><div class='form-check'><input class='form-check-input' type='radio' checked value='"+v.sueldo.toFixed(0)+", "+v.cargo+"' id='baseSelect' name='optvalor'><label class='form-check-label' for='baseSelect'></label></div></td>";
			tBody += 	"<td>"+v.cargo.bold()+"</td>";
			tBody += 	"<td>$ "+formatNumber(v.sueldo.toFixed(0)).fontcolor("red")+"</td>";
			tBody += "</tr>";
		}else{
			tBody += "<tr>";
			tBody += 	"<td><div class='form-check'><input class='form-check-input' type='radio' value='"+v.sueldo.toFixed(0)+", "+v.cargo+"' id='baseSelect' name='optvalor'><label class='form-check-label' for='baseSelect'></label></div></td>";
			tBody += 	"<td>"+v.cargo.bold()+"</td>";
			tBody += 	"<td>$ "+formatNumber(v.sueldo.toFixed(0)).fontcolor("red")+"</td>";
			tBody += "</tr>";
		}
		c++;
	})
	return tBody;
}
function tblSupervisor(id){
	var supervisor = "";
	$.each(supervisores, function(k,v){
		if(v.idTrabajador == id){
			supervisor = v.nombre;
		}
	})
	return supervisor;
}
function tblEspecie(id){
	var especie = "";
	$.each(SESION.especie, function(k,v){
		if(v.codigo == id){
			especie = v.especie;
		}
	})
	return especie;
}
function tblVariedad(id){
	var variedad = "";
	$.each(SESION.variedad, function(k,v){
		if(v.codigo == id){
			variedad = v.variedad;
		}
	})
	return variedad;
}
function tblCuartel(id){
	var cuartel = "";
	$.each(CUARTEL, function(k,v){
		if(v.codigo == id){
			cuartel = v.nombre;
		}
	})
	return cuartel;
}
function tblFaena(id){
	var faena = "";
	$.each(FAENA, function(k,v){
		if(v.codigo == id){
			faena = v.faena;
		}
	})
	return faena;
}
function tblLabor(id){
	var labor = "";
	$.each(LABOR, function(k,v){
		if(v.codigo == id){
			labor = v.labor;
		}
	})
	return labor;
}
var corr = -1;
function appendTablaWeona(json){
	corr++;
	json.especie = $("#especie_rendimiento").val();
	json.variedad = $("#variedad_rendimiento").val();
	json.nvnombre = $("#addtrabajdor").val();
	json.faena = $("#faena_rendimiento").val();
	json.corr = corr;
	var tbl = "";
	tbl += 	"<tr class='tr' id='"+corr+"'>>";
	tbl += 		"<td>"+$("#fecha_rendimiento").val()+"</td>";
	tbl += 		"<td>"+$('#campo_rendimiento option:selected').text()+"</td>";
	tbl += 		"<td>"+$('#especie_rendimiento option:selected').text()+"</td>";
	tbl += 		"<td>"+$('#variedad_rendimiento option:selected').text()+"</td>";
	tbl += 		"<td>"+$('#cuartel_rendimiento option:selected').text()+"</td>";
	tbl += 		"<td>"+$('#supervisor option:selected').text()+"</td>";
	tbl += 		"<td>"+$('#contratista option:selected').text()+"</td>";
	tbl += 		"<td>"+$("#addtrabajdor option:selected").text().split(" | ")[0]+"</td>";
	tbl += 		"<td>"+$("#addtrabajdor option:selected").text().split(" | ")[1]+"</td>";
	tbl += 		"<td>"+$('#faena_rendimiento option:selected').text()+"</td>";
	tbl += 		"<td>"+$('#labor_rendimiento option:selected').text()+"</td>";
	tbl += 		"<td>"+$("#cantidad_personas").val()+"</td>";
	tbl += 		"<td>"+$("#horas_trabajadas").val()+"</td>";
	tbl += 		"<td>"+$("#horas_totales").val()+"</td>";
	tbl += 		"<td>"+$('#tipo_pago option:selected').text()+"</td>";
	tbl += 		"<td>"+$("#valor_dia").val()+"</td>";
	tbl += 		"<td>"+$("#valor_general").val()+"</td>";
	tbl += 		"<td>"+$("#rendimiento").val()+"</td>";
	tbl += 		"<td>"+$("#valor_rendimiento").val()+"</td>";
	tbl += 		"<td>"+$("#bono").val()+"</td>";
	tbl += 		"<td>"+$("#valor_liquido").val()+"</td>";
	tbl += 		"<td><a class='btn yellow' onclick='modIngreso("+JSON.stringify(json)+")'><i class='fa fa-pencil-square-o'></i></a></td>";
	tbl += 		"<td><a class='btn red' onclick='eliminarRend("+JSON.stringify(json)+")'><i class='fa fa-trash'></i></a></td>";
	tbl += 	"</tr>";
	$("#bodyRendimiento").append(tbl);
	loading.hide();
}
function modIngreso(v){
	loading.show();
	setTimeout(function(){
		modId = v.corr;
		var valorLiquidoMod = v.valor_rendimiento/v.rendimiento;
		if(valorLiquidoMod.toString() == "NaN"){
			valorLiquidoMod = 0;
		}
		baseCargo = v.baseCargo;
		$("#fecha_rendimiento").val(formatFecha(v.fecha)).trigger("change");
		$("#campo_rendimiento").val(v.campo).trigger("change");
		if(v.macroco != "" && v.macroco != null && v.macroco != undefined){
			if($("#check_ingreso")[0].checked){
				$("#check_ingreso").trigger("click");
			}
		}else{
			if($("#check_ingreso")[0].checked == false){
				$("#check_ingreso").trigger("click");
			}
		}
		if(v.macroco != "" && v.macroco != null && v.macroco != undefined){
			$("#macro").val(v.macroco).trigger("change");
			$("#ceco").val(v.ceco).trigger("change");
		}else{
			$("#especie_rendimiento").val(v.especie).trigger("change");
			$("#variedad_rendimiento").val(v.variedad).trigger("change");
			$("#cuartel_rendimiento").val(v.cuartel).trigger("change");
		}
		$("#supervisor").val(v.supervisor_i).trigger("change");
		$("#contratista").val(v.idContratista*1).trigger("change");
		$("#addtrabajdor").val(v.nvnombre).trigger("change");
		$("#faena_rendimiento").val(v.faena).trigger("change");
		$("#labor_rendimiento").val(v.labor).trigger("change");
		$("#maquinaria").val(v.maquinaria).trigger("change");
		$("#implemento").val(v.implemento).trigger("change");
		$("#bus").val(v.bus).trigger("change");
		$("#cantidad_personas").val(v.n_personas).trigger("keyup");
		$("#valor_dia").val(formatNumber(String(v.valor).split(".").join(","))).trigger("keyup");
		$("#valor_general").val(formatNumber(String(valorLiquidoMod).split(".").join(","))).trigger("keyup");
		$("#rendimiento").val(formatNumber(String(v.rendimiento).split(".").join(","))).trigger("keyup");
		$("#valor_rendimiento").val(formatNumber(String(v.valor_rendimiento).split(".").join(","))).trigger("keyup");
		$("#bono").val(formatNumber(String(v.bono1).split(".").join(","))).trigger("keyup");
		$("#bono_dos").val(formatNumber(String(v.bono2).split(".").join(","))).trigger("keyup");
		$("#valor_liquido").val(formatNumber(String(v.valor_liquido).split(".").join(",")));
		loading.hide();
	}, 50);
}
function eliminarRend(v){
	var c = confirmar.confirm("Desea eliminar el rendimiento de "+v.nvnombre.split("|")[1]);
	$(c.aceptar).click(function(){
		$(".tr").each(function(){
			if($(this)[0].id*1 == v.corr*1){
				$(this).remove();
				jsonRendimientoDiario[v.corr*1].trabajador = 0;
			}
		})
	})
}
var jsonRendimientoDiario = [];
var url = "";
var modId;
function addRendimientoIndividual(){
	loading.show();
	$(".tr").each(function(){
		if($(this)[0].id*1 == modId*1){
			$(this).remove();
			jsonRendimientoDiario[modId*1].trabajador = 0;
		}
	})
	if(!$("#fecha_rendimiento").val()){
		alerta("No ha ingresado una fecha");
		loading.hide();
		return;
	}else if(!$("#campo_rendimiento").val()){
		alerta("Debe seleccionar un Campo");
		loading.hide();
		return;
	}else if(!$("#especie_rendimiento").val() && $("#check_ingreso")[0].checked){
		alerta("Debe seleccionar una Especie");
		loading.hide();
		return;
	}else if(!$("#variedad_rendimiento").val() && $("#check_ingreso")[0].checked){
		alerta("Debe seleccionar una Variedad");
		loading.hide();
		return;
	}else if(!$("#macro").val() && !$("#check_ingreso")[0].checked){
		alerta("Debe seleccionar una agrupación");
		loading.hide();
		return;
	}else if(!$("#ceco").val() && !$("#check_ingreso")[0].checked){
		alerta("Debe seleccionar un Centro de Costo");
		loading.hide();
		return;
	}else if(!$("#cuartel_rendimiento").val() && $("#check_ingreso")[0].checked){
		alerta("Debe seleccionar un Cuartel");
		loading.hide();
		return;
	}else if(!$("#supervisor").val()){
		alerta("Debe seleccionar un Cuartel");
		loading.hide();
		return;
	}else if(!$("#addtrabajdor").val()){
		alerta("Debe ingresar un Trabajador");
		loading.hide();
		return;
	}else if(!$("#faena_rendimiento").val()){
		alerta("Debe seleccionar una Faena");
		loading.hide();
		return;
	}else if(!$("#labor_rendimiento").val()){
		alerta("Debe seleccionar una Labor");
		loading.hide();
		return;
	}else if(!$("#horas_trabajadas").val()){
		alerta("Horas trabajadas no puede estar vacio");
		loading.hide();
		return;
	}else if(!$("#cantidad_personas").val()){
		alerta("Debe ingresar la cantidad de personas que trabajaron para este rendimiento");
		loading.hide();
		return;
	}else if(!$("#tipo_pago").val()){
		alerta("Debe seleccionar un Tipo de Pago");
		loading.hide();
		return;
	}else if(!$("#valor_dia").val() && $("#tipo_pago").val()*1 == 1){
		alerta("Debe ingresar un Valor Dia");
		loading.hide();
		return;
	}else if((revaja == 1 || revaja == 2) && !$("#rendimiento").val()){
		alerta("Debe ingresar la cantidad de rendimiento");
		loading.hide();
		return;
	}else if($("#tipo_pago").val()*1 == 2 && !$("#valor_general").val()){
		alerta("Debe seleccionar un Valor Trato");
		loading.hide();
		return;
	}else if(!$("#valor_liquido").val()){
		alerta("No se ha ingresado un valor liquido a pagar");
		loading.hide();
		return;
	}else{
		var validate = true;
//		$.each(jsonRendimientoDiario, function(k,v){
//			if(v.cuartel == $("#cuartel_rendimiento").val() && v.fecha == formatFecha($("#fecha_rendimiento").val()) && v.trabajador == trabajador.idTrabajador && !get){
//				alerta("No se puede ingresar un rendimiento, para el mismo trabajador, fecha y cuartel");
//				loading.hide();
//				validate = false;
//			}
//		})
		if(validate){
			var codigo_rd = 0;
			var codigo_rg = 1;
			url = "/simpleWeb/json/AGRO/ADD_RENDIMIENTO_DIARIO/";
			if(get){
				jsonRendimientoDiario = [];
				$("#bodyRendimiento").html("");
				codigo_rd = rd_i.codigo;
				url = "/simpleWeb/json/AGRO/UPD_RENDIMIENTO_DIARIO/";
			}else{
				codigo_rg = 0;
			}
			if(get){
				if(get.CODIGO_RG){
					codigo_rg = get.CODIGO_RG;
				}
			}
			
			var json = {
				codigo: codigo_rd,
				trabajador: trabajador.idTrabajador,
				base_piso_hora: 0,
				subsidio: 0,
				cuartel: $("#cuartel_rendimiento").val(),
				labor: $("#labor_rendimiento").val(),
				valor: formatNumberDB($("#valor_dia").val()),
				tipo_trato: ($("#tipo_pago").val())*1,
				rendimiento: formatNumberDB($("#rendimiento").val()),
				valor_rendimiento: formatNumberDB($("#valor_rendimiento").val()),
				horas_trabajadas: formatNumberDB($("#horas_totales").val()),
				bono1: formatNumberDB($("#bono").val()),
				valor_liquido: formatNumberDB($("#valor_liquido").val()),
				estado: 8,
				codigo_rg: codigo_rg,
				cargo: cargo,
				idContratista: $("#contratista").val(),
				bonoCargo: 0,
				bonoProduccion: 0,
				baseFicha:0,
				baseCargo:0,
				valor_hx: 0,
				monto_hx: 0,
				hx_dos: 0,
				valor_hx_dos: 0,
				fecha: formatFecha($("#fecha_rendimiento").val()),
				supervisor_i: $("#supervisor").val(),
				macroco: $("#macro").val(),
				campo: $("#campo_rendimiento").val(),
				n_personas: formatNumberDB($("#cantidad_personas").val()),
				horas_totales: formatNumberDB($("#horas_trabajadas").val())
			}
			if(json.idContratista == "" || json.idContratista == null){
				json.idContratista = 0;
			}
			if($("#macro").val()*1 == 1){
				json.ceco = $("#ceco").val();
			}else{
				json.ordenco = $("#ceco").val();
			}
			appendTablaWeona(json);
			if(!get){
				$("#addtrabajdor").val("").trigger("change");
			}
			jsonRendimientoDiario.push(json);
		}
	}
}
function guardarDatos(){
	if(jsonRendimientoDiario.length == 0){
		alerta("No se han digitado rendimientos")
		return;
	}
	var arrJson = [];
	$.each(jsonRendimientoDiario, function(k,v){
		if(v.trabajador != 0){
			arrJson.push(v);
		}
	})
	loading.show();
	setTimeout(function(){
	$.ajax({
		url : url,
		type : "PUT",
		data : JSON.stringify(arrJson),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept","application/json");
			xhr.setRequestHeader("Content-Type","application/json");
		},
		success : function(data, textStatus, jqXHR) {
			jsonRendimientoDiario = [];
			loading.hide();
			var a = alerta("Informacion Guardada con exito");
			$(a.aceptar).click(function(){
				if(get){
					if(get.CODIGO_RG){
						window.location.href = ("DetalleRendimiento?codigo_rg="+get.CODIGO_RG);
					}else{
						window.location.href = ("DetalleRendimiento?codigo_rd="+rd_i.codigo);
					}
				}else{
					window.location.href = ("individual_contratista");
				}
			})
		},
		error : function(jqXHR, textStatus, errorThrown) {
			loading.hide();
			swal({
				  title: "Error!",
				  text: "No se ha podido registrar la infomacion, consulte con el administrador del sistema",
				  type: "error",
				  confirmButtonText: "Aceptar"
			});
		}
	});
	}, 500);
}
window.onbeforeunload = function(e) {
	if (jsonRendimientoDiario.length != 0) {
		return "Todavía no has guardado los datos. Si abandonas la página, se perderán por siempre jamás.";
	}
};
function calcularHoras(input){
	var check = $("#checkHoras")[0].checked;
	if(check){
		var horas_trabajadas = formatNumberDB($("#horas_trabajadas").val());
		var n_personas = formatNumberDB($("#cantidad_personas").val());
		$("#horas_totales").val(formatNumber(String((horas_trabajadas*1 * (n_personas*1)).toFixed(3)).split(".").join(",")));
		calcularValor($("#horas_trabajadas"))
	}else{
		$("#horas_totales").val($("#horas_trabajadas").val());
		calcularValor($("#horas_trabajadas"));
	}
}
function calcularValor(input){
	if(input.id == "horas_trabajadas" || input.id == "checkHoras"){
		calcularHoras(input);
	}
	var valor_liquido = 0;
	var horas_trabajadas = formatNumberDB($("#horas_trabajadas").val());
	var tipo_pago = formatNumberDB($("#tipo_pago").val());
	var rendimiento = formatNumberDB($("#rendimiento").val());
	var bono = formatNumberDB($("#bono").val());
	var valor_general = formatNumberDB($("#valor_general").val());
	var valor = formatNumberDB($("#valor_dia").val());
	var checkDia = 1;
	if(!$("#checkDia")[0].checked){
		checkDia = 2;
	}
	if(rendimiento != ""){
		$("#rend").removeClass("has-error");
	}
	if(valor != ""){
		$("#val").removeClass("has-error");
	}
	if(input.value < 0){
		input.value = "";
	}
	valor_liquido = valor_liquido + ((horas_trabajadas*1) * hora_precio);
	valor_liquido = valor_liquido + (bono*1);
	if(tipo_pago*1 == 1){
		$("#valor_dia").addClass("required");
		$("#valor_rendimiento").attr("disabled", false);
		var valor_rendimiento = (valor_general*1) * (rendimiento*1);
		valor_liquido = valor_liquido + valor_rendimiento;
		$("#valor_rendimiento").val(valor_rendimiento);
	}else{
		$("#valor_dia").removeClass("required");
		$("#valor_rendimiento").attr("disabled", true);
		valor_liquido = valor_liquido + valor*1;
		$("#valor_rendimiento").val("");
	}
	if(tipo_pago*1 == 2){
		$("#valor_general").addClass("required");
	}else{
		$("#valor_general").removeClass("required");
	}
	var valor_rendimiento = (valor_general*1) * (rendimiento*1);
	$("#valor_rendimiento").val(formatNumber(String(valor_rendimiento).split(".").join(",")));

	switch(tipo_pago*1){
		case 1:
			if(checkDia == 1){
				$("#valor_liquido").val(formatNumber(String((((valor*1 / 9) * formatNumberDB($("#horas_totales").val())*1) + (bono*1)).toFixed(0)).split(".").join(",")));
			}else{
				$("#valor_liquido").val(formatNumber(valor + bono*1));
			}
			break;
		case 2:
			$("#valor_liquido").val(formatNumber(String(valor_rendimiento*1 + (bono*1)).split(".").join(",")));
			break;
		case 3:
			if(checkDia == 1){
				$("#valor_liquido").val(formatNumber(String((((valor*1 / 9) * formatNumberDB($("#horas_totales").val())*1) + valor_rendimiento + (bono*1)).toFixed(0)).split(".").join(",")));
			}else{
				$("#valor_liquido").val(formatNumber(String((valor + valor_rendimiento + bono*1).toFixed(0)).split(".").join(",")));
			}
			break;
		default:
	}
}