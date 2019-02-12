$("#bodyRendimiento_length").hide();
var MACRO;
//$.getJSON(IPSERVERSAP+"JSON_BAPI_INTERNALORDER_GETLIST.aspx?TIPO=Z600", function(data){
//	MACRO = data;
//})
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
	$("#next").hide();
//	cargarAddTrabajador();
	loadFaena();
	cargaCampos();
	loadByURL();
	$(".select2.select2-container.select2-container--bootstrap").attr("style", "");
})
valor_general = 0;
$('#valor').change(function(){
	valor_general = $(this).val();
})
var day;
var aux = [];
var rg = [];
var supervisores;
var FAENA;
var LABOR;
var trabajador;
var cargo = 0;
var revaja;
var baseCargo = 0;
var valor_hx = 0;
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
var laborBloqueo = [];
var datosActuales;
var CAMPO;
var get = getINFO();
var rd_i;
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
				rd_i = v;
				baseCargo = v.baseCargo;
				if(v.cuartel == 0){
					$("#check_ingreso").trigger("click");
				}
				$("#fecha_rendimiento").val(formatFecha(v.fecha)).trigger("change");
				$("#campo_rendimiento").val(v.nombre).trigger("change");
				if(v.cuartel == 0){
					$("#macro").val(v.macroco).trigger("change");
					$("#ceco").val(v.ceco).trigger("change");
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
				var trabajador = v.nvnombre.split(" | ")[0];
				var opcion = "<option value='"+trabajador+"'>"+v.nvnombre+"</option>";
				$("#addtrabajdor").html(opcion).trigger("change");
				$("#faena_rendimiento").val(v.faena).trigger("change");
				$("#labor_rendimiento").val(v.labor).trigger("change");
				$("#maquinaria").val(parseFolio18(v.maquinaria)).trigger("change");
				$("#implemento").val(parseFolio18(v.implemento)).trigger("change");
				$("#bus").val(v.bus).trigger("change");
				$("#horas_trabajadas").val(formatNumber(String(v.horas_trabajadas).split(".").join(","))).trigger("keyup");
				$("#horas_extras").val(v.horas_extras).trigger("keyup");
				$("#horas_hx2").val(formatNumber(String(v.hx_dos).split(".").join(","))).trigger("keyup");
				$("#valor_hx_pdo").val(formatNumber(v.res_hx*1  + valor_hx*1)).trigger("keyup");
				if(v.valor_hx_dos != 0){
					$("#valor_hs2").val(formatNumber(v.valor_hx_dos)).trigger("keyup");
				}else{
					$("#valor_hs2").val(formatNumber(valor_hx)).trigger("keyup");
				}
				
				if(v.base_piso_hora == 0){
					$("#checkBasePiso").trigger("click");
				}
				if(get.CODIGO_RG){
					$("#basePiso").val(formatNumber(String(v.valor).split(".").join(","))).trigger("change");
				}else{
					$("#basePiso").val(formatNumber(String(v.base_piso_hora).split(".").join(","))).trigger("change");
				}
				$("#tipo_pago").val(v.tipo_trato).trigger("change");
				var valor_g = v.valor_rendimiento/v.rendimiento;
				if(valor_g.toString() == "NaN"){
					valor_g = 0;
				}
				$("#valor_general").val(formatNumber(String(valor_g).split(".").join(","))).trigger("keyup");
				$("#rendimiento").val(formatNumber(String(v.rendimiento).split(".").join(","))).trigger("keyup");
				$("#valor_rendimiento").val(formatNumber(String(v.valor_rendimiento).split(".").join(","))).trigger("keyup");
				$("#bono").val(formatNumber(String(v.bono1).split(".").join(","))).trigger("keyup");
				$("#bono_dos").val(formatNumber(String(v.bono2).split(".").join(","))).trigger("keyup");
				var campo;
				$.each(SESION.campo, function(ka,va){
					if(va.campo == v.nombre){
						campo = va.codigo;
					}
				});
				$("#volcerbtn").show();
				$(".no-edit").prop("disabled", true);
				$("#addRendimientoGeneralTabla").trigger("click");
			}
		})
	}
}
function volcer(){
	if(get.CODIGO_RG){
		window.location.href = ("DetalleRendimiento?codigo_rg="+get.CODIGO_RG);
	}else{
		window.location.href = ("DetalleRendimiento?codigo_rd="+get.CODIGO);
	}
}
function modIngreso(v){
	loading.show();
	setTimeout(function(){
		modId = v.corr;
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
		$("#macro").val(v.macroco).trigger("change");
		$("#ceco").val(v.ceco).trigger("change");
		$("#especie_rendimiento").val(v.especie).trigger("change");
		$("#variedad_rendimiento").val(v.variedad).trigger("change");
		$("#cuartel_rendimiento").val(v.cuartel).trigger("change");
		if(v.macroco != "" || v.macroco != null || v.macroco != undefined){
			
		}else{
			
		}
		$("#supervisor").val(v.supervisor_i).trigger("change");
		$("#addtrabajdor").val(v.nvnombre).trigger("change");
		$("#faena_rendimiento").val(v.faena).trigger("change");
		$("#labor_rendimiento").val(v.labor).trigger("change");
		$("#maquinaria").val(parseFolio18(v.maquinaria)).trigger("change");
		$("#implemento").val(parseFolio18(v.implemento)).trigger("change");
		$("#bus").val(v.bus).trigger("change");
		$("#horas_trabajadas").val(v.horas_trabajadas).trigger("keyup");
		$("#horas_extras").val(v.horas_extras);
		if(v.base_piso_hora == 0){
			$("#checkBasePiso").trigger("click");
		}
		$("#basePiso").val(formatNumber(String(v.base_piso_hora).split(".").join(","))).trigger("change");
		$("#tipo_pago").val(v.tipo_trato).trigger("change");
		var valor_g = v.valor_rendimiento/v.rendimiento;
		if(valor_g.toString() == "NaN"){
			valor_g = 0;
		}
		$("#valor_general").val(valor_g).trigger("keyup");
		$("#rendimiento").val(formatNumber(String(v.rendimiento).split(".").join(","))).trigger("keyup");
		$("#valor_rendimiento").val(formatNumber(String(v.valor_rendimiento).split(".").join(","))).trigger("keyup");
		$("#bono").val(formatNumber(String(v.bono1).split(".").join(","))).trigger("keyup");
		$("#bono_dos").val(formatNumber(String(v.bono2).split(".").join(","))).trigger("keyup");
		var campo;
		$.each(SESION.campo, function(ka,va){
			if(va.campo == v.nombre){
				campo = va.codigo;
			}
		})
		var rut = v.nvnombre.toString().split(" | ");
		$.ajax({
			url: IPSERVERWORK+ "/simpleWeb/json/AGRO/getTrabajadoresAgro/?TRABAJADOR=*&CAMPO=*&RUT="+rut[0]+"&CARGO=*&FECHA="+formatFecha($("#fecha_rendimiento").val()),
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
	}, 50);
}
function parseFolio18(value){
    var res="";
    if(!isNaN(parseInt(value))){
         res = ("000000000000000000" + value).slice (-18);
    }else{
        res = false;
    }
    return res;
}
function recorrer(campo){
	var especie_rendimiento = "<option value=''></option>";
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
function masDies(fecha){
	fecha.setDate(fecha.getDate() + 10);
	return fecha;
}
function resetSupervisor(input){
	var hoy = new Date(dateHoy());
	day = new Date(formatFecha(input.value));
	day = day.getDay();
	var newDate = new Date(formatFecha(input.value));
	hoy = masDies(hoy);
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
	var especie_rendimiento = "<option value=''></option>";
	$.each(SESION.especie, function( key, val ) {
		especie_rendimiento += "<option value="+val.codigo+">"+val.especie+"</option>";
	});
	$('#campo_rendimiento_mod').html(campo_rendimiento);
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
			var selectCuadrilla = "<option value=''></option>";
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
function getBloqueoFaena(){
	var campo = $("#campo_rendimiento").val();
	var fecha = $("#fecha_rendimiento").val();
	var especie = $("#especie_rendimiento").val();
	if(!especie){
		especie = 0;
	}
	var mes = returnMes(fecha);
	var zona = "";
	$.each(SESION.campo, function(k,v){
		if(campo == v.campo){
			zona = v.zona;
			return false;
		}
	})
	$.ajax({
		url: "/simpleWeb/json/AGRO/GET_LABOR_BLOQUEO/"+campo+"/"+mes.toLowerCase()+"/"+especie,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			$.each(data, function(k,v){
				laborBloqueo.push(v.id_labor);
			})
			var faena_rendimiento = "<option value=''></option>"
			$.each(FAENA, function(k, v){
				if(laborBloqueo.indexOf(v.codigo) == -1 && v.zona == zona){
					faena_rendimiento += "<option value=" + v.codigo + ">"+ v.faena + "</option>";
				}
			})
			$("#faena_rendimiento").html(faena_rendimiento);
		}
	})
}
function cambioCampo(campo){
	loading.show();
	activateBasePIsoDia();
	$.each(SESION.campo, function(k,v){
		if(v.campo == campo){
			loadSupervisor(v.codigo);
		}
	})
	var campoId;
	var sociedad;
	var grupo;
	var gcc = "";
	var cecos;
	$.each(SESION.campo, function(k,v){
		if($("#campo_rendimiento").val() == v.campo){
			campoId = v.codigo;
			sociedad = v.sociedad;
			grupo = v.grupo_ceco_work;
			gcc = v.grupo_co;
			cecos = v.cecos;
			return false;
		}
	})
//	setTimeout(function(){
		if(!$("#check_ingreso")[0].checked){
			var arrGcc = gcc.split(";");
			var macros = "<option value=''></option>";
			$.each(arrGcc, function (k,v){
				console.log(IPSERVERSAP+ "JSON_BAPI_INTERNALORDRGRP_GETDETAIL.aspx?GRUPO="+v)
				$.ajax({
					url: IPSERVERSAP+ "JSON_BAPI_INTERNALORDRGRP_GETDETAIL.aspx?GRUPO="+v,
					type:	"GET",
					dataType: 'json',
					async: false,
					success: function(data){
						$.each(data.HIERARCHYNODES, function(k,v){
							var e = v.GROUPNAME;
							console.log(campoId)
							if(campoId == 10){
								macros += "<option value='"+v.GROUPNAME+"'>"+v.DESCRIPT+"</option>";
							}else if((e[e.length-1]*1 == 1 || e[e.length-1]*1 == 2) && e[e.length-2]*1 == 0){
								macros += "<option value='"+v.GROUPNAME+"'>"+v.DESCRIPT+"</option>";
							}
						})
					}
				})
			});
			macros += "<option value='1'>OTROS CENTRO DE COSTO</option>";
			$("#macro").html(macros);
			$.ajax({
				url: IPSERVERSAP+"JSON_BAPI_COSTCENTER_GETLIST1.aspx?SOCIEDAD="+sociedad+"&GRUPO="+grupo+"&CECO="+cecos,
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
		}
	if(!get){
		$.ajax({
//			url: IPSERVERWORK+ "/simpleWeb/json/AGRO/getTrabajadoresAgro2/?TRABAJADOR=*&CAMPO="+campoId+"&RUT=*&CARGO=*&FECHA="+formatFecha($("#fecha_rendimiento").val())+"&DIGITADOR="+SESION.idUser,
			url: IPSERVERWORK+ "/simpleWeb/json/AGRO/GET_TRABAJADORES_AGRO/?FECHA="+formatFecha($("#fecha_rendimiento").val()),
			type:	"GET",
			dataType: 'json',
			async: false,
			success: function(data){
				console.log(data)
				aux = [];
				var addtrabajador = "<option value=''></option>"
				$.each(data, function(k,v){
					addtrabajador += "<option value='"+v.rut+"'>"+v.codigo+" | "+v.rut+" | "+(v.nombre).toUpperCase()+"</option>";
				})
				$("#addtrabajdor").html(addtrabajador);
				loading.hide();
//				cargarAddTrabajador();
			}
 		})
	}
//	}, 100);
	getMaquinaria(campo);
	recorrer(campo)
	if(get){
		getBloqueoFaena();
	}
	var fecha = $("#fecha_rendimiento").val();
	if(fecha){
		var mes = returnMes(fecha);
//		if($("#especie_rendimiento").val()){
			getBloqueoFaena();
//		}
		var cuartel_rendimiento = "<option value=''></option>";
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
function getMaquinaria(c){
	$.each(SESION.campo, function(k,v){
		if(v.campo == c){
			c = v.campos_maq;
			return false;
		}
	})
	var jsonMaq = {
		maquinaria: "<option value=''></option>",
		implemento: "<option value=''></option>"
	}
	$.ajax({
		url: IPSERVERSAP + "/JSON_BAPI_EQUI_GETLIST.aspx?CENTRO="+c,//ZREP
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			$.each(data.EQUIPMENT_LIST, function(ka,va){
				if(va.EQUICATGRY == "T"){
					jsonMaq.maquinaria += '<option value="'+va.EQUIPMENT+'">'+va.DESCRIPT+'</option>';
				}
				if(va.EQUICATGRY != "T" && va.EQUICATGRY != "V"){
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
	$.ajax({
		url : "/simpleWeb/json/AGRO/GET_LABOR_FAENA/"+faena+"/"+zona,
		type : "GET",
		dataType : 'json',
		async : false,
		success : function(data) {
			$.each(data, function(k,v){
				if(v.codigo == labor){
					if(v.maquinaria == 0){
						$("#maquinaria").val("").trigger("change");
						$("#implemento").val("").trigger("change");
						$("#maquinaria").prop("disabled", true);
						$("#implemento").prop("disabled", true);
						$("#maquinaria").removeClass("required");
//						$("#implemento").removeClass("required");
					}else{
						$("#maquinaria").prop("disabled", false);
						$("#implemento").prop("disabled", false);
						$("#maquinaria").addClass("required");
//						$("#implemento").addClass("required");
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
	var cuartel_rendimiento = "<option value=''></option>";
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
function cambioFaena(faena){
	var zona = "";
	$.each(SESION.campo, function(k,v){
		if($("#campo_rendimiento").val() == v.campo){
			zona = v.zona;
		}
	})
	$.ajax({
		url : "/simpleWeb/json/AGRO/GET_LABOR_FAENA/"+faena+"/"+zona,
		type : "GET",
		dataType : 'json',
		async : false,
		success : function(data) {
			LABOR = data;
			var labor_rendimiento = "<option value=''></option>"
			$.each(data, function(k, v){
				labor_rendimiento += "<option value=" + v.codigo + ">"+ v.labor + "</option>";
			})
			$("#labor_rendimiento").html(labor_rendimiento);
		}
	})
}
function cambioEspecie(especie){
	var campo = $("#campo_rendimiento").val();
	var variedad_rendimiento = "<option value=''></option>";
	var arrVarieables = [];
	$.each(CUARTEL, function(k,v){
		if(v.especie == especie*1 && arrVarieables.indexOf(v.variedad) == -1 && v.campo == campo){
			arrVarieables.push(v.variedad);
			variedad_rendimiento += "<option value='"+v.variedad+"'>"+v.nvariedad+"</option>";
			if(v.especie == ""){
				variedad_rendimiento = "<option value=''>Sin Variedad</option>";
			}
		}
	})
	$("#variedad_rendimiento").html(variedad_rendimiento);
	if($("#campo_rendimiento").val() && $("#especie_rendimiento").val()){
		getBloqueoFaena();
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
		calcularValor(input)
	}else{
		basePiso = 2;
		$("#basePiso").prop("disabled", true);
		$("#basePiso").val(0);
		$("#basePiso").removeClass("required");
		$("#btnChange").prop("disabled", true);
		calcularValor(input)
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
var hx_semana;
var hx_restante = 0;
var auxJsonBase = {};
function cargarAddTrabajador(rut){
	if(rut){
		$.ajax({
			url: IPSERVERWORK+ "/simpleWeb/json/AGRO/SA_GETGETALLETRABAJADOR/?RUT="+rut+"&FECHA="+formatFecha($("#fecha_rendimiento").val()),
			type:	"GET",
			dataType: 'json',
			async: false,
			success: function(data){
				console.log(data[0])
				trabajador = data[0];
				auxJsonBase.id = data[0].cargo;
				auxJsonBase.cargo = "Ficha";
				auxJsonBase.sueldo = trabajador.sueldoBase;
				auxJsonBase.campo = "";
				baseCargo = sueldo_base/horasMes;
				valor_hx = trabajador.hx.toFixed(0);
				$("#valor_hx").val(formatNumber(valor_hx));
				$("#valor_hs2").val(formatNumber(valor_hx));
				if(selected == "Ficha"){
					$("#basePiso").val(formatNumber(String((trabajador.sueldoBase/horasMes).toFixed(0) * formatNumberDB($("#horas_trabajadas").val())).split(".").join(","))).trigger("keyup");
					calcularValor($("#basePiso"))
				}
				cargo = data[0].cargo;
				hx_semana = trabajador.hx_semana;
				hx_restante = 12 - trabajador.hx_semana;
				$("#hx_semana").html(""+formatNumber(String(trabajador.hx_semana).split(".").join(",")));
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
function detalleHxSemana(){
	$.ajax({
		url: "/simpleWeb/json/AGRO/GET_DETALLE_HX_SEMANA/?TRABAJADOR="+trabajador.idTrabajador+"&FECHA="+formatFecha($("#fecha_rendimiento").val()),
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			var pop = "";
			pop +=	"<div class='table-responsive'>";
			pop +=		"<table class='table table-bordered table-hover table-striped table-condensed' id='tbl_Datos_Comunes'>";
			pop +=			"<thead>";
			pop +=				"<tr>";
			pop +=					"<th>Domingo</th>";
			pop +=					"<th>Lunes</th>";
			pop +=					"<th>Martes</th>";
			pop +=					"<th>Miercoles</th>";
			pop +=					"<th>Jueves</th>";
			pop +=					"<th>Viernes</th>";
			pop +=					"<th>Sabado</th>";
			pop +=					"<th>Total Actual</th>";
			pop +=					"<th>Maximo Restante</th>";
			pop +=				"</tr>";
			pop +=			"</thead>";
			pop +=			"<body id='bodyValores'>";
			pop +=				"<tr>";
			$.each(data, function(k,v){
				pop +=				"<td>"+formatNumber(String(v.horas_extras).split(".").join(","))+"</td>";
			})
			pop +=					"<td>"+formatNumber(String(hx_semana).split(".").join(","))+"</td>";
			pop +=					"<td>"+formatNumber(String(12-hx_semana).split(".").join(","))+"</td>";
			pop +=				"</tr>";
			pop +=			"</body>";
			pop +=		"</table>";
			pop +=	'</div>';
			pop += 	"<div style='text-align: center;'>";
			pop += 		"<a id='confirmBase' class='btn green-dark submit-modal'onclick='closeModal()'>Aceptar</a>";
			pop += 	"</div>";
			popUp("Detalle Horas Extras "+trabajador.nombre.toUpperCase(), pop, true, "650px", true);
		},error: function(er){
			console.log(er);
		}
	})
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
			var supervisor = "<option value=''></option>";
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
	var basePiso = $("#basePiso").val();
	var baseSueldo = "";
	baseSueldo +=	"<div class='table-responsive portlet' style='height: 320px; overflow: auto;'>";
	baseSueldo +=		"<table class='table table-bordered table-hover table-striped table-condensed' id='tbl_Datos_Comunes'>";
	baseSueldo +=			"<thead>";
	baseSueldo +=				"<tr>";
	baseSueldo +=					"<th>#</th>";
	baseSueldo +=					"<th>Tipo Trabajo</th>";
	baseSueldo +=					"<th>Sueldo Mensual</th>";
	baseSueldo +=				"</tr>";
	baseSueldo +=			"</thead>";
	baseSueldo +=			"<body id='bodyValores'>"+loadTipos_Pago()+"</body>";
	baseSueldo +=		"</table>";
	baseSueldo +=	'</div>';
	baseSueldo += 	"<div style='text-align: center;'>";
	baseSueldo += 		"<a id='confirmBase' class='btn green-dark submit-modal'onclick='cambiarPisoDia()'>Aceptar</a>";
	baseSueldo += 		"<a class='btn red' onclick='closeModal();'>Cancelar</a>";
	baseSueldo += 	"</div>";
	popUp("Base Sueldo", baseSueldo, true, "450px", true);
	format();
	$(".selectBase").click(function(){
		var json = JSON.parse($(this).val());
		if(json.id != 0){
			$("#otro").val("");
			$("#otro").removeClass("required-modal");
			$("#otro").attr("disabled", true);
			validateModal();
		}else{
			$("#otro").attr("disabled", false);
			$("#otro").addClass("required-modal");
		}
	})
}
function cambiarPisoDia(){
	if(validateModal()){
		$(".selectBase").each(function(){
			if($(this)[0].checked){
				var v = JSON.parse($(this).val());
				cargo = v.id;
				sueldo_base = v.sueldo;
				if(sueldo_base*1 == 0){
					sueldo_base = formatNumberDB($("#otro").val());
					monto = formatNumberDB($("#otro").val());
				}
				baseCargo = sueldo_base/horasMes;
				selected = v.cargo;
				var plata = ((sueldo_base/horasMes) * formatNumberDB($("#horas_trabajadas").val())).toFixed(0);
				plata = formatNumber(String(plata).split(".").join(","))
				$("#basePiso").val(plata).trigger("keyup");
				calcularValor($("#basePiso"))
				closeModal();
			}
		})
	}
}
var cargos;
var selected;
var monto;
function loadTipos_Pago(){
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
	var json = {
		id: 0,
		campo: '',
		cargo: 'Otro',
		sueldo: 0
	}
	cargosAux.push(json);
//	cargosAux.push(auxJsonBase);
	cargos = cargosAux;
	$.each(cargosAux, function(k,v){
		if(v.id != 0){
			if(selected == v.cargo){
				tBody += "<tr>";
				tBody += 	"<td><div class='form-check'><input class='form-check-input selectBase' type='radio' checked value='"+JSON.stringify(v)+"' id='baseSelect' name='optvalor'><label class='form-check-label' for='baseSelect'></label></div></td>";
				tBody += 	"<td>"+v.cargo.bold()+"</td>";
				tBody += 	"<td>$ "+formatNumber(v.sueldo.toFixed(0)).fontcolor("red")+"</td>";
				tBody += "</tr>";
			}else{
				tBody += "<tr>";
				tBody += 	"<td><div class='form-check'><input class='form-check-input selectBase' type='radio' value='"+JSON.stringify(v)+"' id='baseSelect' name='optvalor'><label class='form-check-label' for='baseSelect'></label></div></td>";
				tBody += 	"<td>"+v.cargo.bold()+"</td>";
				tBody += 	"<td>$ "+formatNumber(v.sueldo.toFixed(0)).fontcolor("red")+"</td>";
				tBody += "</tr>";
			}
			c++;
		}
	})
	var otro = "otro";
	var check = "";
	if(selected == "Otro"){
		check = "checked";
	}
	tBody += "<tr id='tr_otro'>";
	tBody += 	"<td><div class='form-check'><input class='form-check-input selectBase' "+check+" type='radio' value='"+JSON.stringify(cargos[cargos.length-1])+"' id='baseSelect' name='optvalor'><label class='form-check-label' for='baseSelect'></label></div></td>";
	tBody += 	"<td>"+otro.bold()+"</td>";
	tBody += 	"<td><div class='input-icon input-icon-sm'><i class='fa fa-usd'></i><input type='text' class='form-control input-sm number' id='otro'></div></td>";
	tBody += "</tr>";
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
					gcc = v.grupo_co;
					zona = v.zona;
					return false;
				}
			})
			//TODO
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
//		var faena_rendimiento = "<option value=''></option>";
//		$.each(FAENA, function(k, v){
//			if(laborBloqueo.indexOf(v.codigo) == -1 && v.zona == zona){
//				faena_rendimiento += "<option value=" + v.codigo + ">"+ v.faena + "</option>";
//			}
//		})
//		$("#faena_rendimiento").html(faena_rendimiento);
	}else{
		$("#especie_rendimiento").prop("disabled", false);
		$("#especie_rendimiento").addClass("required");
		$("#variedad_rendimiento").prop("disabled", false);
		$("#variedad_rendimiento").addClass("required");
		$("#cuartel_rendimiento").addClass("required");
		$("#cuartel_rendimiento").attr("disabled", false);
		$(".hide-show").toggle();
		$("#ceco").val("");
//		$(".tipo_ingreso").toggle();
	}
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
	tbl += 	"<tr class='tr' id='"+corr+"'>";
	tbl += 		"<td>"+$("#fecha_rendimiento").val()+"</td>";
	tbl += 		"<td>"+$('#campo_rendimiento option:selected').text()+"</td>";
	tbl += 		"<td>"+$('#especie_rendimiento option:selected').text()+"</td>";
	tbl += 		"<td>"+$('#variedad_rendimiento option:selected').text()+"</td>";
	tbl += 		"<td>"+$('#cuartel_rendimiento option:selected').text()+"</td>";
	tbl += 		"<td>"+$('#ceco option:selected').text()+"</td>";
	tbl += 		"<td>"+$('#supervisor option:selected').text()+"</td>";
	tbl += 		"<td>"+$("#addtrabajdor option:selected").text().split(" | ")[1]+"</td>";
	tbl += 		"<td>"+$("#addtrabajdor option:selected").text().split(" | ")[2]+"</td>";
	tbl += 		"<td>"+$('#faena_rendimiento option:selected').text()+"</td>";
	tbl += 		"<td>"+$('#labor_rendimiento option:selected').text()+"</td>";
	tbl += 		"<td>"+$('#maquinaria option:selected').text()+"</td>";
	tbl += 		"<td>"+$('#implemento option:selected').text()+"</td>";
	tbl += 		"<td>"+$('#bus option:selected').text()+"</td>";
	tbl += 		"<td>"+$("#horas_trabajadas").val()+"</td>";
	tbl += 		"<td>"+$("#horas_extras").val()+"</td>";
	tbl += 		"<td>"+$("#basePiso").val()+"</td>";
	tbl += 		"<td>"+$('#tipo_pago option:selected').text()+"</td>";
	tbl += 		"<td>"+$("#valor_general").val()+"</td>";
	tbl += 		"<td>"+$("#rendimiento").val()+"</td>";
	tbl += 		"<td>"+$("#valor_rendimiento").val()+"</td>";
	tbl += 		"<td>"+$("#bono").val()+"</td>";
	tbl += 		"<td>"+$("#bono_dos").val()+"</td>";
	tbl += 		"<td>"+$("#valor_liquido").val()+"</td>";
	tbl += 		"<td><a class='btn yellow' onclick='modIngreso("+JSON.stringify(json)+")'><i class='fa fa-pencil-square-o'></i></a></td>";
	tbl += 		"<td><a class='btn red' onclick='eliminarRend("+JSON.stringify(json)+")'><i class='fa fa-trash'></i></a></td>";
	tbl += 	"</tr>";
	$("#bodyRendimiento").append(tbl);
	loading.hide();
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
//TODOf
var url = "";
var modId;
function addRendimientoIndividual(){
	$(".tr").each(function(){
		if($(this)[0].id*1 == modId*1){
			$(this).remove();
			jsonRendimientoDiario[modId*1].trabajador = 0;
		}
	})
	loading.show();
	setTimeout(function(){ 
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
	}else if(!$("#cuartel_rendimiento").val() && $("#check_ingreso")[0].checked){
		alerta("Debe seleccionar un Cuartel");
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
	}else if(!$("#maquinaria").val() && $("#maquinaria")[0].disabled == false){
		alerta("Debe seleccionar una Maquinaria");
		loading.hide();
		return;
	}else if(!$("#horas_trabajadas").val()){
		alerta("Debe ingresar las horas trabajadas");
		loading.hide();
		return;
	}else if(!$("#basePiso").val()){
		alerta("Debe ingresar un Base PIso Dia");
		loading.hide();
		return;
	}else if(!$("#tipo_pago").val()){
		alerta("Debe seleccionar un Tipo de Pago");
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
//			if($("#cuartel_rendimiento").val()){
//				if(v.cuartel == $("#cuartel_rendimiento").val() && v.fecha == formatFecha($("#fecha_rendimiento").val()) && v.trabajador == trabajador.idTrabajador && !get){
//					alerta("No se puede ingresar un rendimiento, para el mismo trabajador, fecha y cuartel");
//					loading.hide();
//					validate = false;
//				}
//			}else if($("#ceco").val()){
//				if(v.ceco == $("#ceco").val() && v.fecha == formatFecha($("#fecha_rendimiento").val()) && v.trabajador == trabajador.idTrabajador && !get){
//					alerta("No se puede ingresar un rendimiento, para el mismo trabajador, fecha y Centro de Costo");
//					loading.hide();
//					validate = false;
//				}
//			}
//		})
		if(validate){
			if($("#check_ingreso")[0].checked){
				$("#macro").val("");
				$("#ceco").val("");
			}else{
				$("#especie_rendimiento").val("");
				$("#variedad_rendimiento").val("");
				$("#cuartel_rendimiento").val("");
			}
			baseCargo = baseCargo * $("#horas_trabajadas").val();
			var baseFicha = ((trabajador.sueldoDiario/horasMes)/9) * (formatNumberDB($("#horas_trabajadas").val()));
			var bono_produccion = formatNumberDB($("#valor_liquido").val()) - baseCargo;
			var bono_cargo = parseInt(baseCargo) - parseInt(baseFicha);
			if(bono_cargo < 0) {
				bono_cargo = 0;
			}
			if(bono_produccion < 0) {
				bono_produccion = 0;
			}
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
			var estado = 8;
//			if(rd_i){
//				estado = rd_i.estado;
//			}
			var json = {
				codigo: codigo_rd,
				trabajador: trabajador.idTrabajador,
				base_piso_hora: $("#basePiso").val().split(".").join(""),
				subsidio: 0,
				cuartel: $("#cuartel_rendimiento").val(),
				labor: $("#labor_rendimiento").val(),
				valor: formatNumberDB($("#basePiso").val().split(".").join("")),
				tipo_trato: ($("#tipo_pago").val())*1,
				rendimiento: formatNumberDB($("#rendimiento").val()),
				valor_rendimiento: formatNumberDB($("#valor_rendimiento").val()),
				horas_trabajadas: formatNumberDB($("#horas_trabajadas").val()),
				horas_extras: formatNumberDB($("#horas_extras").val()),
				bono1: formatNumberDB($("#bono").val()),
				bono2: formatNumberDB($("#bono_dos").val()),
				valor_liquido: formatNumberDB($("#valor_liquido").val()),
				maquinaria: $("#maquinaria").val(),
				implemento: $("#implemento").val(),
				bus: $("#bus").val(),
				estado: estado,
				codigo_rg: codigo_rg,
				cargo: cargo,
				idContratista: trabajador.idContratista,
				bonoCargo: bono_cargo,
				bonoProduccion: bono_produccion,
				baseFicha: baseFicha,
				baseCargo: baseCargo,
				fecha: formatFecha($("#fecha_rendimiento").val()),
				supervisor_i: $("#supervisor").val(),
				macroco: $("#macro").val(),
				campo: $("#campo_rendimiento").val(),
			}
			if($("#horas_extras").val()){
				json.valor_hx = formatNumberDB($("#valor_hx").val());
				json.monto_hx = formatNumberDB($("#monto_hx").val());
				if($("#valor_hx_pdo").val()){
					json.res_hx = formatNumberDB($("#valor_hx_pdo").val()) - valor_hx;
				}
			}
			if($("#horas_hx2").val()){
				json.hx_dos = formatNumberDB($("#horas_hx2").val());
				json.valor_hx_dos = formatNumberDB($("#valor_hs2").val());
			}
			if($("#tipo_pago").val()*1 == 2){
				json.subsidio = $("#basePiso").val().split(".").join("")*1 - ($("#valor_rendimiento").val().split(".").join(""))*1;
				if(json.subsidio < 0){
					json.subsidio = 0;
				}
			}
			if(json.idContratista == "" || json.idContratista == null){
				json.idContratista = 0;
			}
			if($("#macro").val()*1 == 1){
				json.ceco = $("#ceco").val();
			}else{
				json.ordenco = $("#ceco").val();
			}
			if(json.ceco == null){
				json.ceco = "";
			}
			appendTablaWeona(json);
			jsonRendimientoDiario.push(json);
			if(!get){
				$("#addtrabajdor").val("").trigger("change");
			}
		}
	}}, 100);
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
	console.log(arrJson)
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
			console.log(data);
			
			var correctos = 0;
			var fallidos = 0;
			var arrFallidos = [];
			$.each(data, function(k,v){
				if(v.estado == true){
					correctos++;
				}else{
					arrFallidos.push(v.objeto);
					fallidos++;
				}
			})
			var mensaje = "";
			mensaje +=	"<div class='table-responsive'>";
			mensaje +=		"<table class='table table-bordered table-hover table-striped table-condensed' id='tbl_Datos_Comunes'>";
			mensaje +=			"<thead>";
			mensaje +=				"<tr>";
			mensaje +=					"<th>Ingresos Correctos</th>";
			mensaje +=					"<th>Ingresos Fallidos</th>";
			mensaje +=				"</tr>";
			mensaje +=			"</thead>";
			mensaje +=			"<body id='bodyMensaje'>";
			mensaje += 				"<tr>";
			mensaje +=					"<td>"+correctos+"</td>";
			mensaje +=					"<td><a title='Ver Detalle' onclick='detaleFallas("+JSON.stringify(arrFallidos)+")'>"+fallidos+"</a></td>";
			mensaje +=				"</tr>";
			mensaje +=			"</body>";
			mensaje +=		"</table>";
			mensaje +=	'</div>';
			var a = alerta(mensaje, true);
			jsonRendimientoDiario = [];
			loading.hide();
			$(a.aceptar).click(function(){
				if(get){
					if(get.CODIGO_RG){
						window.location.href = ("DetalleRendimiento?codigo_rg="+get.CODIGO_RG);
					}else{
						window.location.href = ("DetalleRendimiento?codigo_rd="+rd_i.codigo);
					}
				}else{
					window.location.href = ("rendimiento_individual");
				}
			})
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
	}, 100);
}
function detaleFallas(data){
	console.log(data)
	var mensaje = "";
	mensaje +=	"<div class='table-responsive'>";
	mensaje +=		"<table class='table table-bordered table-hover table-striped table-condensed' id='tbl_Datos_Comunes'>";
	mensaje +=			"<thead>";
	mensaje +=				"<tr>";
	mensaje +=					"<th>Fecha</th>";
	mensaje +=					"<th>Campo</th>";
	mensaje +=					"<th>Trabajador</th>";
	mensaje +=					"<th>Horas</th>";
	mensaje +=					"<th>Valor Liquido</th>";
	mensaje +=				"</tr>";
	mensaje +=			"</thead>";
	mensaje +=			"<body id='bodyMensaje'>";
	$.each(data, function(k,v){
		var campo = "";
		var cuartel = "";
		$.each(SESION.campo, function(ka,va){
			if(va.campo == v.campo){
				campo = va.descripcion;
			}
		})
		$.each(CUARTEL, function(ka,va){
			if(va.codigo == v.cuartel){
				cuartel = v.nombre;
			}
		})
		mensaje += 			"<tr>";
		mensaje +=				"<td>"+v.fecha+"</td>";
		mensaje +=				"<td>"+campo+"</td>";
		mensaje +=				"<td>"+v.nvnombre+"</td>";
		mensaje +=				"<td>"+v.horas_trabajadas+"</td>";
		mensaje +=				"<td>"+v.valor_liquido+"</td>";
		mensaje +=			"</tr>";
	})
	mensaje +=			"</body>";
	mensaje +=		"</table>";
	mensaje +=	'</div>';
	mensaje += 	"<div style='text-align: center;'>";
	mensaje += 		"<a id='confirmBase' class='btn green-dark submit-modal'onclick='closeModal()'>Aceptar</a>";
	mensaje += 	"</div>";
	popUp("Detalle Ingresos Fallidos", mensaje, true, "700px", true);
}
var sueldo_base;
window.onbeforeunload = function(e) {
	if (jsonRendimientoDiario.length != 0) {
		return "Todavía no has guardado los datos. Si abandonas la página, se perderán por siempre jamás.";
	}
};
function valDias(dia){
	if(dia == 0 || dia == 1 || dia == 2 || dia == 3 || dia == 4){
		return 0;
	}else{
		return 1;
	}
}
function calcularhxDos(input){
	var horas_hxdos = formatNumberDB($("#horas_hx2").val());
	var valor_hxdos = formatNumberDB($("#valor_hs2").val());
	var bono_dos = valor_hxdos * horas_hxdos;
	$("#bono_dos").val(formatNumber(String(bono_dos).split(".").join(","))).trigger("keyup");
}
function validarHxDos(){
	var valor_hxdos = formatNumberDB($("#valor_hs2").val());
	if(valor_hxdos < valor_hx){
		$("#valor_hs2").val(formatNumber(valor_hx));
	}
	calcularhxDos();
}
function calcularValor(input){
	if(sueldo_base){
		if(input.id == "horas_trabajadas"){
			var base_piso = formatNumber(String((sueldo_base/horasMes).toFixed(0) * formatNumberDB($("#horas_trabajadas").val())).split(".").join(","));
			base_piso = formatNumberDB(base_piso);
			$("#basePiso").val(formatNumber(base_piso.toFixed(0)));
		}
	}
	if(input.id == "valor_hx_pdo"){
		if(formatNumberDB(input.value) < valor_hx){
			$(input).val(formatNumber(valor_hx));
		}
	}
	var valor_liquido = 0;
	activateBasePIsoDia();
	var valor_liquido = 0;
	if(input.id == "basePiso" || input.id == "tipo_pago"){
		var tp = $("#tipo_pago").val();
		var bpd = $("#basePiso").val();
		if(tp*1 == 2 && bpd*1 == 2){
			$("#btnCambio").prop("disabled", true);
			$("#valor").prop("disabled", true);
			$("#valor").val(0);
		}else{
			$("#btnCambio").prop("disabled", false);
			$("#valor").prop("disabled", false);
		}
	}
	if(input.id == "confirmBase"){
		var radios = document.getElementsByName('optvalor'+id);
		for (var i = 0; i < radios.length; i++) {
			if (radios[i].checked) {
				sueldo_base = radios[i].value;
				$.each(cargos, function(k,v){
					if(sueldo_base*1 == v.descripcion){
						$("#cargo"+id).val(v.id);
					}
				})
				$("#valor").val(sueldo_base*1);
				$("#btnCambio"+id).prop("disabled", false);
				closeModal();
				break;
			}
		}
	}
	var basePiso = 2;
	if($("#basePiso").val()*1 != 0){
		basePiso = 1;
	}
	var horas_trabajadas = formatNumberDB($("#horas_trabajadas").val());
	var horas_extras = formatNumberDB($("#horas_extras").val());
	var tipo_pago = formatNumberDB($("#tipo_pago").val());
	var rendimiento = formatNumberDB($("#rendimiento").val());
	var bono = formatNumberDB($("#bono").val());
	var bono_dos = formatNumberDB($("#bono_dos").val());
	var valor_hx_pdo = formatNumberDB($("#valor_hx_pdo").val());
	var valor = 0;
	if(input.id == "valor_general"){
		valor_general = formatNumberDB(input.value);
	}
	if(tipo_pago*1 == 1 && $("#basePiso")[0].disabled == false || basePiso*1 == 1){
		valor = formatNumberDB($("#basePiso").val());
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
	var monto_hx = 0;
	if((horas_extras > 2 || horas_extras > hx_restante) && valDias(day) == 0){
		alerta("Las horas Extras no pueden exceder el numero legal permitido (2) para un dia Habil")
		$("#horas_extras").val("");
		$("#hx").val("");
		$("#monto_hx").val("");
	}else if((horas_extras > 7.5 || horas_extras > hx_restante) && valDias(day) == 1){
		alerta("Las horas Extras no pueden exceder el numero legal permitido (7,5) para un fin de Semana")
		$("#horas_extras").val("");
		$("#hx").val("");
		$("#monto_hx").val("");
	}else{
		if($("#valor_hx_pdo").val()){
			$("#monto_hx").val(formatNumber(String(horas_extras * valor_hx_pdo*1).split(".").join(",")));
		}else{
			$("#monto_hx").val(formatNumber(String(horas_extras * valor_hx*1).split(".").join(",")));
		}
	}
	monto_hx = formatNumberDB($("#monto_hx").val());
	valor_liquido = valor_liquido + ((horas_extras*1) * hora_extra_precio);
	valor_liquido = valor_liquido + ((horas_trabajadas*1) * hora_precio);
	valor_liquido = valor_liquido + (bono*1);
	valor_liquido = valor_liquido + (bono_dos*1);
	if(tipo_pago == 1){
		$("#valor_rendimiento").attr("disabled", true);
		var valor_rendimiento = (valor_general*1) * (rendimiento*1);
		valor_liquido = valor_liquido + valor_rendimiento;
		$("#valor_rendimiento").val(valor_rendimiento);
	}else{
		$("#valor_rendimiento").attr("disabled", true);
		valor_liquido = valor_liquido + valor*1;
		$("#valor_rendimiento").val("");
	}
	if(tipo_pago == 1){
		$("#valor_general").removeClass("required");
	}else{
		$("#valor_general").addClass("required");
	}
	var valor_rendimiento = (valor_general*1) * (rendimiento*1);
	$("#valor_rendimiento").val(formatNumber(String(valor_rendimiento).split(".").join(",")));
	$("#val_liq").removeClass("has-error");
	var valor_final = 0;
	switch(basePiso*1) {
	    case 1:
	    	switch(tipo_pago*1){
		    	case 1:
		    		valor_final = (String(valor*1 + (bono*1) + (bono_dos*1) + monto_hx).split(".").join(","));
		    		break;
		    	case 2:
		    		if(valor_rendimiento*1 > valor*1){
		    			valor_final = (String(valor_rendimiento + (bono*1) + (bono_dos*1) + monto_hx).split(".").join(","));
			    	}else if(valor_rendimiento*1 == valor*1){
		    			valor_final = (String(valor_rendimiento + (bono*1) + (bono_dos*1) + monto_hx).split(".").join(","));
			    	}else if(valor_rendimiento*1 < valor*1){
		    			valor_final = (String(valor + (bono*1) + (bono_dos*1) + monto_hx).split(".").join(","));
			    	}
		    		break;
	    		case 3:
	    			valor_final = (String(valor + valor_rendimiento + (bono*1) + (bono_dos*1) + monto_hx).split(".").join(","));
	    			break;
		    	default:
	    	}
	        break;
	    case 2:
	    	switch(tipo_pago*1){
	    		case 1:
	    			valor_final = valor + (bono) + (bono_dos) + monto_hx;
	    			break;
	    		case 2:
	    			valor_final = String(valor_rendimiento + (bono*1) + (bono_dos*1) + monto_hx).split(".").join(",");
	    			break;
	    		case 3:
	    			valor_final = String(valor + valor_rendimiento + (bono*1) + (bono_dos*1) + monto_hx).split(".").join(",");
	    			break;
	    		default:
	    	}
	        break;
	    default:
	}
	valor_final = String(valor_final).split(",").join(".");
	$("#valor_liquido").val(formatNumber((valor_final*1).toFixed(0)));
}