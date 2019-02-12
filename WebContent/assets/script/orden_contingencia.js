 //$(document).ready(function(){
//	loadTblOrden();
//});
var mayor = 0;
var countMa = 1;
var arrayMaterial;
var arrayMaquinaria  = [];
var arrayImplemento  = [];
var maxCarencia = 0;
var auxCuartel = getCuartel();
var campo = '';
var numero_orden;
var codigo_orden;
var arrayCuarteles = [];
var arrayMateriales = [];
var has = 0;
var cm = 0;
var idP = 0;
var arrayAlmacen = [];
var num_reserva = 0; 
arrayAlmacen['Z010'] = '2000';
arrayAlmacen['Z011'] = '3000';
arrayAlmacen['Z119'] = '9500';
arrayAlmacen['Z120'] = '4000';
arrayAlmacen['Z121'] = '1000';
arrayAlmacen['Z122'] = '6000';
arrayAlmacen['Z123'] = '5000';
var arraySubFamiliaMat = ['','Z121','Z010','Z011','Z120','Z123','Z119','Z122'];
$(document).ready(function(){
	fechas();
	$('.form-control2.input-sm2').select2({
		multiple: true,
		placeholder: "Seleccione",
		closeOnSelect: false
	});
	$('.form-control.input-sm').select2({
		multiple: false,
		placeholder: "Seleccione"
	});
	$('#updateAct').hide();
	$("#loading").hide();
	formaAplicacion();
});


var arrayMaterial = [];
getMaterial();
function getMaterial(){
	$.ajax({
		//url: "/simpleWeb/json/AGRO/GETMA/",
		url: IPSERVERSAP + "JSON_ZMOV_10020.aspx?FAMILIA=ZQCO",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			arrayMaterial.push(data.LT_DETALLE);
			console.log(arrayMaterial);
		}
	})
	//console.log(IPSERVERSAP + "JSON_ZMOV_10020.aspx?FAMILIA=ZFER");
	$.ajax({
		//url: "/simpleWeb/json/AGRO/GETMA/",
		url: IPSERVERSAP + "JSON_ZMOV_10020.aspx?FAMILIA=ZFER",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			arrayMaterial.push(data.LT_DETALLE);
			console.log(arrayMaterial);
		}
	})
	var sortResults=function(json,prop, asc) {
        json = json.sort(function(a, b) {
	        if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
	        else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
	    });
        return json;
	};
	sortResults(arrayMaterial[0],'MAKTX','asc');
	sortResults(arrayMaterial[1],'MAKTX','asc');
	
}
var guardado = false;
var arrayCampo;
function getHuertos(){
	var campoSesion;
	$.ajax({
		url: "/simpleWeb/json/AGRO/GETCAMPO/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			console.log(data);
			arrayCampo = data;
		}
	})
	return campoSesion;
}
getHuertos();

var selectHuerto = "";
selectHuerto += "<option value='-1'>Seleccione Campo</option>";
$.each(arrayCampo, function(ks,va){
	selectHuerto += "<option value='"+va.campo+"'>"+va.descripcion+"</option>";
})
$("#dataHuerto").append(selectHuerto);
console.log(arrayCampo);
$.ajax({
	url: "/simpleWeb/json/AGRO/Get_CampoEspecie/",
	type:	"GET",
	dataType: 'json',
	async: false,
	success: function(data){
		campo_especie = data;
	}
})

var arrayEspecie;
function getEspecies(){
	$.ajax({
		url: "/simpleWeb/json/AGRO/GETESPECIE/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			arrayEspecie = data;
		}
	})
}
getEspecies();
var arrayControl;
function getControl(){
	$.ajax({
		url: "/simpleWeb/json/AGRO/GETCONTROL_APLICACION/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			arrayControl = data;
		}
	})
}
getControl();
var arrayEstadoFeno;
function getEstadoFeno(){
	
	//var url = "/simpleWeb/json/AGRO/getMantenedorEspecie/ALL/Estado Fenologico/";
	
	$.ajax({
		url: "/simpleWeb/json/AGRO/GET_EstadoFenologico/", 
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			arrayEstadoFeno = data;    //
		}
	})
}
getEstadoFeno();


$("#dataHuerto").change(function(){
	$("#loading").show();
	setTimeout(function(){
		arrayCuarteles = [];
		$("#tblCuartel").empty();
		$("#especie").empty();
		console.log(campo_especie);
		console.log(arrayEspecie);
		$.each(campo_especie, function(kb,vb){
			if(vb.codigo_campo == $('#dataHuerto').val()){
				$.each(arrayEspecie,function(key,value){
					if(vb.codigo_especie == value.codigo){
						$("#especie").append( '<option value="'+value.codigo+'">'+value.especie+'</option>');
					}
				});
			}
		});
		changeEspecie();
		loadJefeAplicacion($('#dataHuerto').val());
		loadNombreAplicador($('#dataHuerto').val());
		$("#loading").hide();
	}, 500);
});

$("#especie").change(function(){
	changeEspecie();
	arrayCuarteles = [];
	$("#tblCuartel").empty();
});
$("#variedad").change(function(){
	cargarCuartel();
});
var arrayVariedad;
function changeEspecie(){
	var e = $("#especie").val();
	selectVariead = "<option value=''>Seleccione</option>";
	var validaVariedad = [];
	$.each(auxCuartel,function(kk,vv){			
		if(e == vv.especie && vv.campo == $("#dataHuerto").val()){
			if(validaVariedad.indexOf(vv.variedad) == -1){
				selectVariead += "<option value="+vv.variedad+">"+vv.nvariedad+"</option>";
				validaVariedad.push(vv.variedad);
			}
				
		}
	});
	$("#estFen").empty();
	$.each(arrayEstadoFeno, function(ks,va){
		if(va.especie == e){
			$("#estFen").append("<option value='"+va.codigo+"'>"+va.estado_fenologicos+"</option>");
		}
	})
	$("#control").empty();
	$.each(arrayControl, function(ks,va){
		if(va.especie == e){
			$("#control").append("<option value='"+va.codigo+"'>"+va.control_aplicacion+"</option>");
		}
		
	})
	console.log(selectVariead);
	$("#variedad").empty();
	$("#variedad").append(selectVariead);
	
}
var arrayProgramaApl;
function getProgramaApl(){
	$("#programaAplicacion").empty();
	$.ajax({
		url: "/simpleWeb/json/AGRO/getPA/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			$.each(data,function(key,value){
				$("#programaAplicacion").append('<option value="'+value.codigo+'">'+value.descripcion+'</option>');	
			});
		}
	})
}
var programa = 0;
$("#programaAplicacion").change(function(){
	cargaCabeceraMaterial($("#programaAplicacion").val());
	if($("#programaAplicacion").val() == 3) {
		if(programa != 3) {
			$("#tblMateriales").empty();
		}		
		$("#mojamiento").val('0');
		$("#mojamiento").attr('disabled','disabled');
	} else {
		if(programa == 3) {
			$("#tblMateriales").empty();
		}	
		//$("#mojamiento").val('0');
		$("#mojamiento").attr('disabled',false);
	}
	programa = $("#programaAplicacion").val();
	$("#mojamiento").trigger("change");
});
getProgramaApl();

loadMercado();
function loadMercado(){		
	$.getJSON("/simpleWeb/json/AGRO/GETMERCADOS", function(data){
		$.each(data, function(k, v){
			$('#mercado').append($('<option>', {value: v.codigo, text: v.descripcion}));
		})
	});
}

loadFormaAplicacion();
function loadFormaAplicacion(){		
	$.getJSON("/simpleWeb/json/AGRO/GETFA/", function(data){
		$.each(data, function(k, v){
			$('#forma_aplicacion').append($('<option>', {value: v.codigo, text: v.descripcion}));
		})	
	});
	setTimeout(function(){
		formaAplicacion();
	},500);
}

function loadJefeAplicacion(campo){		
	var url = "/simpleWeb/json/AGRO/getParametros_campoByCampo/"+campo+"/Jefe Aplicacion";
	//$('#jefe_aplicacion').append($('<option>', {value: 0, text: "Prueba sin carga"}));	
	console.log(url);
	$('#jefe_aplicacion').empty();
	$.ajax({
		url: url,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			$.each(data, function(k, v){
				$('#jefe_aplicacion').append($('<option>', {value: v.codigo, text: v.descripcion }));
			})
		}
	})
	//$('#jefe_aplicacion').append($('<option>', {value: 0, text: "Seleccione"}));
	/*$.getJSON("/simpleWeb/json/AGRO/getP/6", function(data){
		$.each(data, function(k, v){
			$('#jefe_aplicacion').append($('<option>', {value: v.codigo, text: v.nombre + " "+v.apellido_paterno}));
		})
	});*/
}
cargaCabeceraMaterial();
function cargaCabeceraMaterial(prgAplicacion){
	$("#headMaterial").empty();
	var addMaterial =			'<tr>';
	addMaterial +=				'<th style="text-align: center;">Material</th>';
	var width = "1200px";
	var addMaterial2 = '';
	if(prgAplicacion == "3"){
		addMaterial +=			'<th style="text-align: center;">Nitrógeno</th>';
		addMaterial +=			'<th style="text-align: center;">Fósforo</th>';
		addMaterial +=			'<th style="text-align: center;">Potasio</th>';
		addMaterial +=			'<th style="text-align: center;">Azúfre</th>';
		addMaterial +=			'<th style="text-align: center;">Calcio</th>';
		addMaterial +=			'<th style="text-align: center;">Zinc</th>';
		addMaterial +=			'<th style="text-align: center;">Fierro</th>';
		addMaterial +=			'<th style="text-align: center;">Cobre</th>';
		addMaterial +=			'<th style="text-align: center;">Magnesio</th>';
		addMaterial +=			'<th style="text-align: center;">Kilos (Has)</th>';
		width = "1800px";
	}else{
		addMaterial +=			'<th style="text-align: center;">Código Material</th>';
		addMaterial +=			'<th style="text-align: center;">Dosis (100)</th><th></th>';		
		addMaterial +=			'<th style="text-align: center;">Dosis (Ha)</th><th></th>';
		addMaterial2 = 			'<th style="text-align: center;">Dosis Po bombada</th>';
	}
	
	addMaterial +=				'<th style="text-align: center;">Has</th>';
	addMaterial +=				'<th style="text-align: center;width:100px">Total</th>';
	addMaterial +=				'<th style="text-align: center;">UM</th>'+addMaterial2;
	addMaterial +=				'<th style="text-align: center;">Descartar</th>';
	addMaterial +=			'</tr>';
	$("#headMaterial").html(addMaterial);
}

function loadNombreAplicador(campo){		
	var fecha = formatFecha($("#fecha_estimada_aplicacion").val());
	var url = "/simpleWeb/json/AGRO/getTrabajadoresAgro2/?TRABAJADOR=*&CAMPO="+campo+"&RUT=*&CARGO=7&FECHA="+fecha+"&DIGITADOR="+SESION.idUser;
//	var url = "";
	$('#nombre_aplicador').empty();
	console.log(url);
	$.ajax({
		url: url,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			$.each(data, function(k, v){
				$('#nombre_aplicador').append($('<option>', {value: v.idTrabajador, text: v.nombre }));
			})
		}
	})
}

$("#mojamiento").change(function(){
	var moj = parseFloat($(this).val()) / 100;
	$("#dosis_bombada").val(moj);
});

function updateAct(){
	$(".oblig").each(function(){
		if($(this).val()== ''){
			alerta("Debe competar los datos obigatorios (*)");
			return false;
		}
	})

	var oa = {};
	var arrayMaqquinaria = [];
	var arrayMaq = {};
	for (var i = 0; i < cMaq; i++) {
		var maq = $('#maquinarias'+i).val();
		arrayMaq = {};
		if(maq != undefined){
			arrayMaq.maquinaria = $('#maquinarias'+i).val();
			arrayMaq.implemento = $('#implementos'+i).val();
			console.log(arrayMaq);
			arrayMaqquinaria.push(arrayMaq);
			console.log(arrayMaqquinaria);
		}
	}
	oa.codigo                 = codigo_orden;
	oa.codigo_pf              = numero_orden;
	oa.aplicador              = $('#nombre_aplicador').val();
	oa.fecha_programa         = formatFecha($('#fecha_estimada_aplicacion').val());
	oa.estado_fenologico      = $('#estado_fenologico').val();
	oa.fecha_estimada_cosecha = "";
	oa.mercado                = $('#mercado').val();
	oa.codigo_fa			  = $('#forma_aplicacion').val();
	oa.fecha_inicio			  = formatFecha($("#fecha_inicio").val());
	oa.jefe_aplicacion		  = $('#jefe_aplicacion').val();
	oa.dosis_bombada		  = 0;
	oa.cambio_tractor		  = $('#cambio_tractor').val();
	oa.presion_bomba		  = $('#presion_bombada').val();
	oa.marcha_tractor		  = $('#marcha_tractor').val();
	oa.dias_cosecha			  = "0";
	oa.fecha_viable_cosecha   = formatFecha($("#fecha_viable").val());
	oa.maquinaria_pf		  = arrayMaqquinaria;
	oa.campo 				  = campo;
	oa.um					  = $('#um_dosis').val();
	oa.capacidad_maquina	  = parseNumericFloat($('#capacidad_maquina').val());
	console.log(oa);
	$.ajax({
		url : "/simpleWeb/json/AGRO/UPDATEOA/",
		type : "PUT",
		data : JSON.stringify(oa),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept","application/json");
			xhr.setRequestHeader("Content-Type","application/json");
		},
		success : function(data, textStatus, jqXHR) {
			console.log(data);
			if(data){
				alerta("Guardado Correctamente");
				
				$('.swal2-confirm').click(function(){
					window.location.href = ("lista_aplicaciones");
				})
				
			}
			
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
$("#addAct").click(function(){
	
	addCuartel('');
	addMaterial('');
	detNotificacion();
	
});

function addAct(){
	$('#btnGuardar').hide();
	$("#loading").show();
	setTimeout(function(){
	$(".oblig").each(function(){
		if($(this).val()== ''){
			alerta("Debe competar los datos obigatorios (*)");
			return false;
		}
	})
	
	var row = {};
	row.codigo              = 0;
	row.fecha_estimada      = formatFecha($("#fecha_estimada_aplicacion").val());
	row.fecha_alerta        = null;
	row.tipo_control        = $("#control").val();
	row.nombre_tipo_control = "1";
	row.estado_pf           = "1";
	row.programa_aplicacion = $("#programaAplicacion").val();
	row.nombre_programa_aplicacion = "1";
	row.usuario             = SESION.idUser;
	row.usuario_ja          = "1";
	row.nombre_usuario_ja   = "1";
	row.observacion         = $("#observacion").val();
	row.temporada           = 0;
	row.campo               = $("#dataHuerto").val();
	row.nombre_especie      = "1";
//	row.especie		        = $("#EspText"+id+" option[disabled]:selected").val();
	row.variedad      		= $("#variedad").val();
	row.especie		        = $("#especie").val();
	row.variedad      		= "0";
	row.nombre_variedad     = $("#variedad").val().toString();
	row.estado_fenologico   = $("#estFen").val();
	row.nombre_estado_fenologico = "1";
	row.mojamiento          = $("#mojamiento").val();
	row.cuart_PF 			= arrayCuarteles;
	row.mater_PF 			= arrayMateriales;
	row.tipo_programa		= 2;
	row.libro_campo			= $("#libro").val();
	row.reserva             = $("#reserva").val();
	row.solped              = $("#solped").val();
	console.log(row);
	
	$.ajax({
		url : "/simpleWeb/json/AGRO/INSERTPF/",
		type : "PUT",
		data : JSON.stringify(row),
		beforeSend : function(xhr) {	
			xhr.setRequestHeader("Accept","application/json");
			xhr.setRequestHeader("Content-Type","application/json");
		},
		success : function(data, textStatus, jqXHR) {
			console.log(data);
			var oa = {};
			var arrayMaqquinaria = [];
			var arrayMaq = {};
			oa.codigo_pf              = data.codigo;
			oa.aplicador              = $('#nombre_aplicador').val();
			oa.fecha_programa         = formatFecha($('#fecha_estimada_aplicacion').val());
			oa.estado_fenologico      = $('#estFen option:selected').text();
			oa.fecha_estimada_cosecha = "";
			oa.mercado                = $('#mercado').val();
			oa.codigo_fa			  = $('#forma_aplicacion').val();
			oa.fecha_inicio			  = formatFecha($("#fecha_estimada_aplicacion").val());
			oa.jefe_aplicacion		  = $('#jefe_aplicacion').val();
			oa.dosis_bombada		  = $('#dosis_bombada').val();
			oa.cambio_tractor		  = $('#cambio_tractor').val();
			oa.presion_bomba		  = $('#presion_bombada').val();
			oa.marcha_tractor		  = $('#marcha_tractor').val();
			oa.dias_cosecha			  = "0";
			oa.fecha_viable_cosecha   = formatFecha($("#fecha_estimada_aplicacion").val());
			oa.maquinaria_pf		  = [];
			oa.campo 				  = $("#dataHuerto").val();
			oa.temporada			  = 0;
			oa.um					  = $('#um_dosis').val();
			oa.capacidad_maquina	  = parseNumericFloat($('#capacidad_maquina').val());
			console.log(oa);
			$.ajax({
				url : "/simpleWeb/json/AGRO/ADDOA/",
				type : "PUT",
				data : JSON.stringify(oa),
				beforeSend : function(xhr) {	
					xhr.setRequestHeader("Accept","application/json");
					xhr.setRequestHeader("Content-Type","application/json");
				},
				success : function(data, textStatus, jqXHR) {
					console.log(data);
					if(data){
						guardado = true;
						$("#reserva").val("");
						$("#solped").val("");
						alerta("Orden "+data +" Guardada Correctamente");
						$('.swal2-confirm').click(function(){
							window.location.href = ("lista_aplicaciones");
						})
					}
					
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
	$("#btnGuardar").hide();
	$("#loading").hide();
	},500);
	
	
	
}
var cMaq = 0;
function descartarCuartel(c){
	$('#tr'+c).remove();
}

function descartarMaterial(desc){
	console.log(desc);
	$(".trM"+desc).remove();
}



$('#fecha_inicio').change(function(){

	//alert("ok");
	//$("#fecha_viable").val(addDays($("#fecha_inicio").val(),mayor));
	var fechaInicio = new Date($(this).val());
	$('#fecha_viable').val(sumarDias(fechaInicio,maxCarencia));
	
});

function fechas2(){
	var fecha = document.getElementsByName("fecha");
	for(var i = 0; i < fecha.length; i++){
		$(fecha[i]).datepicker({
		    format: 'dd-mm-yy',
		    autoclose: true
		});
	}
}

function addDays(date, days) {
	var result = new Date(date);
	result.setDate(result.getDate() + days+1);
	 
	var dd = result.getDate();
	var mm = result.getMonth()+1; //January is 0!
	var yyyy = result.getFullYear();
	if(dd<10){
		dd='0'+dd;
	} 
	if(mm<10){
		mm='0'+mm;
	} 
	var today = dd+'/'+mm+'/'+yyyy;
	return  today;	  
}



function valFechaHoy(id){
	console.log(id);
	var val = $('#'+id).val();
	var hoy = dateHoy();
	var h = hoy;
	hoy = hoy.split("-");
	hoy = new Date(hoy[0], hoy[1], hoy[2]);
	var fechaSelect = val.split("-");
	fechaSelect = new Date(fechaSelect[2], fechaSelect[1], fechaSelect[0]);
	var auxFecha = fechaSelect.getTime();
}


function formaAplicacion(){
	console.log($('#forma_aplicacion').val());
	if($('#forma_aplicacion').val() == '1'){
		$('#presion_bombada').attr('disabled',true);
		$('#um_dosis').attr('disabled',true);
		$('#dosis_bombada').attr('disabled',true);
		$('#cambio_tractor').attr('disabled',true);
		$('#marcha_tractor').attr('disabled',true);
		$('#capacidad_maquina').attr('disabled',true);
		
		$('#cambio_tractor').val(6).trigger('change');
		$('#marcha_tractor').val(6).trigger('change');
		
		
	} else {
		$('#presion_bombada').attr('disabled',false);
		$('#um_dosis').attr('disabled',false);
		$('#dosis_bombada').attr('disabled',false);
		$('#capacidad_maquina').attr('disabled',false);
		$('#cambio_tractor').attr('disabled',false);
		$('#marcha_tractor').attr('disabled',false);
	}
}
$('#forma_aplicacion').change(function(){
	formaAplicacion();
	
});

function sumarDias(fecha, dias){
	console.log(fecha);
	fecha.setDate(fecha.getDate() + dias);
	dia = fecha.getDate();
    mes = fecha.getMonth()+1;
    if(mes < 10){
    	mes = "0" + mes;
    }
    if(dia < 10){
    	dia = "0" + dia;
    }
    anho = fecha.getFullYear();
	return dia+"-"+mes+"-"+anho;
}

function orderFecha(fecha){
	var newFecha = fecha.split("-");
	newFecha = newFecha[2]+"-"+newFecha[1]+"-"+newFecha[0];
	return newFecha;
}


function cargarCuartel(id){	
	arrayCuarteles = [];
	has = 0;
	var vari = $('#variedad').val();
	$.each(auxCuartel, function(k,v){
		if(v.campo == $('#dataHuerto').val() && $('#variedad').val().indexOf(v.variedad+"") != -1){
			console.log(v);
			var arrayCuartPf       = {};
			arrayCuartPf.codigo    = 0;
			arrayCuartPf.codigo_pf = id;
			arrayCuartPf.cuartel   = v.codigo;
			arrayCuartPf.has       = v.superficie;
			arrayCuartPf.nCuartel  = v.nombre;
			arrayCuartPf.nVariedad = v.nvariedad;
			arrayCuartPf.estado    = 'checked';
			arrayCuartPf.max       = v.superficie;
			arrayCuarteles.push(arrayCuartPf);
			has += parseFloat(v.superficie);
		}
	})
	has = has;
	console.log(arrayCuarteles);
	
	var tHas = 0;
	var bodyAddCuartel = "";
	$.each(arrayCuarteles, function(k,va){
		bodyAddCuartel +="<tr>" ;
		bodyAddCuartel +=	"<td><input type='checkbox' class='cbCuartel' onchange='calcularTotalHas()' id='cbCuartel"+va.cuartel+"' "+va.estado+" value='"+va.cuartel+"' ></td>" ;
		bodyAddCuartel +=	"<td>"+va.nVariedad+"</td>" ;
		bodyAddCuartel +=	"<td>"+va.nCuartel+"</td>" ;
		bodyAddCuartel +=	"<td>" ;
		bodyAddCuartel +=		"<input type='text' class='form-control hasReal' value='"+formatNumber((va.has+"").replace(",", "."))+"' onchange='validaMaxHas(this.id)' max='"+va.max+"' min='0' name='hecCuartel' id='hecCuartel"+va.cuartel+"'>" ;
		bodyAddCuartel +=	"</td>" ;
		bodyAddCuartel +="</tr>";
		tHas += va.has;
	});
	bodyAddCuartel +="<tr>" ;
	bodyAddCuartel +=	"<td></td>" ;
	bodyAddCuartel +=	"<td></td>" ;
	bodyAddCuartel +=	"<td>Total</td>" ;
	bodyAddCuartel +=	"<td id='totalHas'></td>" ;
	bodyAddCuartel +="</tr>";
	$("#tblCuartel").html(bodyAddCuartel);
	calcularTotalHas();
	var tempMateriales = arrayMateriales;
	arrayMateriales = [];
	$.each(tempMateriales, function(k,v){
		if($('#programaAplicacion').val() == 3){
			var cant = (parseFloat(v.dosis_has)) * has;
		} else {
			var cant = (parseFloat(v.dosis_has) / 1000) * has;
		}
		
		v.cantidad = formatNumber2(cant);
		arrayMateriales.push(v);
	});
	
}

function validaMaxHas(id){
	var v = parseFloat($('#'+id).val());
	var m = parseFloat($('#'+id).attr('max'));
	//var min = parseFloat($('#'+id).attr('min'));
	if(v > m) {
		alerta("No puede agregar mas hectáreas de las que posee el cuartel");
		$('#'+id).val(m);
	}
	if(v < 0){
		alerta("No puede ingresar número menor que 0");
		$('#'+id).val(0);
	}
	calcularTotalHas();
}

function calcularTotalHas(){
	var total = 0;
	$('.hasReal').each(function(index,element){
		var id = element.id.split('hecCuartel')[1];
		if($("#cbCuartel"+id).is(':checked')){
			var value = element.value;
			value = value.replace(",", ".");
			total += parseFloat(value);
		}
	});
	has = total;
	
	$('#totalHas').html(formatNumber(total));
	$('.hasTotal').html(formatNumber(total));
	$('.calculoTotalHas').trigger("change");
}

function selectTodoCuartel(){
	console.log($("#cbSelectTodo").is(':checked'));
	if($("#cbSelectTodo").is(':checked')){
		$('.cbCuartel').prop('checked', true);
	} else {
		$('.cbCuartel').prop('checked', false);
	}
	calcularTotalHas();
}

function menuAddMaterial(x){
	if(!parseInt($("#mojamiento").val()) > 0 && $("#programaAplicacion").val() != 3){
		alerta("Mojamiento debe ser mayor a 0");
		return false;
	}
	if(has == 0){
		alerta("Debe seleccionar un cuartel");
		return false;
	}
	countMa++;
	$("#tblMateriales").append(createTblMaterial(x));
	$('.form-control.input-sm').select2({
		multiple: false,
		placeholder: "Seleccione"
	});
}


function addMaterial(id){
	var validate = true;
	var prgAplicacion =  $("#programaAplicacion").val();
	var material = document.getElementsByName("material");
	var dosiscien = document.getElementsByName("dosiscien");
	var dosisHa = document.getElementsByName("dosisHa");
	var Niteogeno = document.getElementsByName("Niteogeno");
	var Fosforo = document.getElementsByName("Fosforo");
	var Potasio = document.getElementsByName("Potasio");
	var Azufre = document.getElementsByName("Azufre");
	var Calcio = document.getElementsByName("Calcio");
	var Zinc = document.getElementsByName("Zinc");
	var Fierro = document.getElementsByName("Fierro");
	var Cobre = document.getElementsByName("Cobre");
	var Magnesio = document.getElementsByName("Magnesio");
	var Total = document.getElementsByName("total");
	var Almacen = document.getElementsByName("almacen");
	console.log(dosiscien);
	arrayMateriales = [];
	for(i = 0; i < material.length; i++){
		
		if(parseFloat(Total[i]['value'])<0 || Total[i]['value']=='-' || Total[i]['value']==0 || Total[i]['value']=='')
		{
			alerta("No puede ingresar valores vacio");
			
			return;			
		}
		var arrayMtPf = {}; 
		arrayMtPf.codigo = 0;
		arrayMtPf.codigo_pf       = id;
		arrayMtPf.codigo_material = material[i]['value'];
		arrayMtPf.almacen 		  = Almacen[i]['value'];
		arrayMtPf.cantidad        = 0;
		if(prgAplicacion == "3"){
			arrayMtPf.NITROGENO = parseFloat((Niteogeno[i]['value']).replace(".","").replace(",","."));
			arrayMtPf.FOSFORO   = parseFloat((Fosforo[i]['value']).replace(".","").replace(",","."));
			arrayMtPf.POTASIO   = parseFloat((Potasio[i]['value']).replace(".","").replace(",","."));
			arrayMtPf.AZUFRE    = parseFloat((Azufre[i]['value']).replace(".","").replace(",","."));
			arrayMtPf.CALCIO    = parseFloat((Calcio[i]['value']).replace(".","").replace(",","."));
			arrayMtPf.ZINC	    = parseFloat((Zinc[i]['value']).replace(".","").replace(",","."));		
			arrayMtPf.FIERRO    = parseFloat((Fierro[i]['value']).replace(".","").replace(",","."));
			arrayMtPf.COBRE     = parseFloat((Cobre[i]['value']).replace(".","").replace(",","."));
			arrayMtPf.MANGANESO = parseFloat((Magnesio[i]['value']).replace(".","").replace(",","."));
			arrayMtPf.dosis_has = parseFloat((dosisHa[i]['value']).replace(".","").replace(",","."));
			arrayMtPf.cantidad  = parseFloat((Total[i]['value']).replace(".","").replace(",","."));
		} else {
			arrayMtPf.dosis_100 = parseFloat((dosiscien[i]['value']+"").replace(".","").replace(",","."));
			arrayMtPf.dosis_has = parseFloat((dosisHa[i]['value']+"").replace(".","").replace(",","."));
			arrayMtPf.cantidad  = parseFloat((Total[i]['value']+"").replace(".","").replace(",","."));
		}
		arrayMateriales.push(arrayMtPf);
	}
	console.log(arrayMateriales);
	//alerta("Se ha guaradado correctamente.");  
}

function addCuartel(id){
	has = 0;
	arrayCuarteles = [];
	$.each(auxCuartel, function(k,v){
		if(v.campo == $('#dataHuerto').val() && $('#variedad'+id).val().indexOf(v.variedad+"") != -1){
			console.log(v);
			var arrayCuartPf       = {};
			arrayCuartPf.codigo    = 0;
			arrayCuartPf.codigo_pf = id;
			arrayCuartPf.cuartel   = v.codigo;
			arrayCuartPf.nVariedad = v.nVariedad;
			arrayCuartPf.has       = $('#hecCuartel'+v.codigo).val().replace(",",".");
			arrayCuartPf.nCuartel  = v.nombre;
			arrayCuartPf.nVariedad = v.nvariedad;
			arrayCuartPf.max       = v.superficie;
			if($("#cbCuartel"+v.codigo).is(':checked')){
				arrayCuartPf.estado = 'checked';
				var value = $('#hecCuartel'+v.codigo).val();
				value = value.replace(",",".");
				has += parseFloat(value);
			} else {
				arrayCuartPf.estado = '';
			}
			
			arrayCuarteles.push(arrayCuartPf);
		}
	})
	var calculoHas = has;
	//has = formatNumber(has);
	console.log(arrayMateriales);
	var tempMateriales = arrayMateriales;
	arrayMateriales = [];
	$.each(tempMateriales, function(k,v){
		if($('#programaAplicacion').val() == 3){
			var cant = (parseFloat(v.dosis_has)) * calculoHas;
		} else {
			var cant = (parseFloat(v.dosis_has) / 1000) * calculoHas;
		}
		
		v.cantidad = formatNumber2(cant);
		arrayMateriales.push(v);
	});
	console.log(arrayMateriales);
	closeModal();
}

function cabeceraMaterial(id, x, guardado){
	//console.log(x+":"+id);
	//$.getJSON('/simpleWeb/json/AGRO/DETALLE_MATERIAL/'+id, function(data){
	//console.log(IPSERVERSAP + "/SCLEM/JSON_ZMOV_10020.aspx?MATERIAL="+id);
	$.getJSON(IPSERVERSAP + "JSON_ZMOV_10020.aspx?MATERIAL="+id, function(data){
		data = data.LT_DETALLE[0];
		//console.log(data);
		//console.log(data.MTART);
		$('#codMaterial'+x).html(parseInt(id));
		if(data.MTART == 'ZFER'){
			if(data.NITROGENO == 0){
				$('#Niteogeno'+x).attr('disabled', true);
			} else {
				$('#Niteogeno'+x).attr('disabled', false);				
			}
			if(data.FOSFORO == 0){
				$('#Fosforo'+x).attr('disabled', true);
			} else {
				$('#Fosforo'+x).attr('disabled', false);				
			}
			if(data.POTASIO == 0){
				$('#Potasio'+x).attr('disabled', true);
			} else {
				$('#Potasio'+x).attr('disabled', false);				
			}
			if(data.AZUFRE == 0){
				$('#Azufre'+x).attr('disabled', true);
			} else {
				$('#Azufre'+x).attr('disabled', false);				
			}
			if(data.CALCIO == 0){
				$('#Calcio'+x).attr('disabled', true);
			} else {
				$('#Calcio'+x).attr('disabled', false);				
			}
			if(data.ZINC == 0){
				$('#Zinc'+x).attr('disabled', true);
			} else {
				$('#Zinc'+x).attr('disabled', false);				
			}
			if(data.FIERRO == 0){
				$('#Fierro'+x).attr('disabled', true);
			} else {
				$('#Fierro'+x).attr('disabled', false);				
			}
			if(data.COBRE == 0){
				$('#Cobre'+x).attr('disabled', true);
			} else {
				$('#Cobre'+x).attr('disabled', false);				
			}
			if(data.MANGANESO == 0){
				$('#Magnesio'+x).attr('disabled', true);
			} else {
				$('#Magnesio'+x).attr('disabled', false);				
			}
			$('#LNiteogeno'+x).html(data.NITROGENO + " %");
			$('#LFosforo'+x).html(data.FOSFORO + " %");
			$('#LPotasio'+x).html(data.POTASIO + " %");
			$('#LAzufre'+x).html(data.AZUFRE + " %");
			$('#LCalcio'+x).html(data.CALCIO + " %");
			$('#LZinc'+x).html(data.ZINC + " %");
			$('#LCobre'+x).html(data.COBRE + " %");
			$('#LMagnesio'+x).html(data.MANGANESO + " %");
			$('#LFierro'+x).html(data.FIERRO + " %");
			
			if(guardado == 0){
				$('#Niteogeno'+x).val(0);
				$('#Fosforo'+x).val(0);
				$('#Potasio'+x).val(0);
				$('#Azufre'+x).val(0);
				$('#Calcio'+x).val(0);
				$('#Zinc'+x).val(0);
				$('#Cobre'+x).val(0);
				$('#Magnesio'+x).val(0);
				$('#Fierro'+x).val(0);
				$('#Total'+x).val(0);
			}
			
		}
		$('#lum'+x).html(data.MEINS);
		console.log(arrayAlmacen);
		console.log(data.MATKL);
		console.log(arrayAlmacen[data.MATKL]);
		$('#almacen'+x).val(arrayAlmacen[data.MATKL]);
		if(data.MEINS == 'L') {
			$('#lbDosCien'+x).html('CC');
			$('#lbHas'+x).html('CC');
		} else {
			$('#lbDosCien'+x).html('Grm');
			$('#lbHas'+x).html('Grm');
		}
		$("#dosisHa"+x).trigger("change");
	});
	
}

function createTblMaterial(x){
	
	var prgAplicacion = $("#programaAplicacion").val();
	var tblMaterial = '<tr class="trM'+cm+'">'+
				'<td>'+
				'<select class="form-control input-sm material" name="material" onchange="cabeceraMaterial(this.value,'+cm+',0)" id="material'+cm+'">';
//					'<option value="">Seleccione</option>'+
//					'<option value="1">Cuartel 01</option>'+
//					'<option value="2">Cuartel 02</option>'+
//					'<option value="3">Cuartel 03</option>'+
	tblMaterial += '<option value="1">Seleccione</option>';
	console.log(arrayMaterial[1]);
	if(prgAplicacion == 3) {
		$.each(arrayMaterial[1],function(key,value){
			//if(value.MATKL == arraySubFamiliaMat[prgAplicacion]){
				tblMaterial += "<option value='"+value.MATNR+"'>"+parseInt(value.MATNR)+"-"+value.MAKTX+" ("+value.IACTIVO+")</option>";
				
			//}
		});
	} else {
		$.each(arrayMaterial[0],function(key,value){
			//if(value.MATKL == arraySubFamiliaMat[prgAplicacion]){
				tblMaterial += "<option value='"+value.MATNR+"'>"+parseInt(value.MATNR)+"-"+value.MAKTX+" ("+value.IACTIVO+")</option>";				
			//}
		});
		$.each(arrayMaterial[1],function(key,value){
			//if(value.MATKL == 'Z010'){
				tblMaterial += "<option value='"+value.MATNR+"'>"+parseInt(value.MATNR)+"-"+value.MAKTX+" ("+value.IACTIVO+")</option>";
				
			//}
		});
	}
	
	tblMaterial +=	'</select>';
			if(prgAplicacion == "3"){
				
				tblMaterial += '<td><label id="LNiteogeno'+cm+'"></label></td>';
				tblMaterial += '<td><label id="LFosforo'+cm+'"></label></td>';
				tblMaterial += '<td><label id="LPotasio'+cm+'"></label></td>';
				tblMaterial += '<td><label id="LAzufre'+cm+'"></label></td>';
				tblMaterial += '<td><label id="LCalcio'+cm+'"></label></td>';
				tblMaterial += '<td><label id="LZinc'+cm+'"></label></td>';
				tblMaterial += '<td><label id="LFierro'+cm+'"></label></td>';
				tblMaterial += '<td><label id="LCobre'+cm+'"></label></td>';
				tblMaterial += '<td><label id="LMagnesio'+cm+'"></label></td>';
				tblMaterial += "<td></td><td class='hasTotal'>"+formatNumber(has)+"</td><td></td><td></td>" ;
				
				var tblMaterial2 = '<tr class="trM'+cm+'">';
				tblMaterial2 += '<td><label id="codMaterial'+cm+'"></label></td>';
				tblMaterial2 += '<td><input type="text" type="text" class="form-control " name="Niteogeno" id="Niteogeno'+cm+'" onchange="calcularTotalFS(this.id,'+cm+')"></td>';
				tblMaterial2 += '<td><input type="text" type="text" class="form-control " name="Fosforo" id="Fosforo'+cm+'" onchange="calcularTotalFS(this.id,'+cm+')"></td>';
				tblMaterial2 += '<td><input type="text" type="text" class="form-control " name="Potasio" id="Potasio'+cm+'" onchange="calcularTotalFS(this.id,'+cm+')"></td>';
				tblMaterial2 += '<td><input type="text" type="text" class="form-control " name="Azufre" id="Azufre'+cm+'" onchange="calcularTotalFS(this.id,'+cm+')"></td>';
				tblMaterial2 += '<td><input type="text" type="text" class="form-control " name="Calcio" id="Calcio'+cm+'" onchange="calcularTotalFS(this.id,'+cm+')"></td>';
				tblMaterial2 += '<td><input type="text" type="text" class="form-control " name="Zinc" id="Zinc'+cm+'" onchange="calcularTotalFS(this.id,'+cm+')"></td>';
				tblMaterial2 += '<td><input type="text" type="text" class="form-control " name="Fierro" id="Fierro'+cm+'" onchange="calcularTotalFS(this.id,'+cm+')"></td>';
				tblMaterial2 += '<td><input type="text" type="text" class="form-control " name="Cobre" id="Cobre'+cm+'" onchange="calcularTotalFS(this.id,'+cm+')"></td>';
				tblMaterial2 += '<td><input type="text" type="text" class="form-control " name="Magnesio" id="Magnesio'+cm+'" onchange="calcularTotalFS(this.id,'+cm+')"></td>';
				
				tblMaterial2 += '<td><input type="text" class="form-control calculoTotalHas" name="dosisHa" id="dosisHa'+cm+'" placeholder="" onchange="calcularProcentajeFS('+cm+')"></td>';
				tblMaterial2 += '<td></td><td><input type="text" class="form-control " name="total" id="total'+cm+'" placeholder="Total" disabled></td>';
				tblMaterial2 += "<td><label id='lum"+cm+"'></label></td></tr>";
				
				
			}else{
				tblMaterial += '<td><label id="codMaterial'+cm+'"></label></td>';
				tblMaterial += '<td><input type="text" class="form-control" tittle="" onchange="calcularDosisHas('+cm+','+x+')" name="dosiscien" id="dosiscien'+cm+'"></td><td><label id="lbDosCien'+cm+'"></label></td>';
				tblMaterial += '<td><input type="text" class="form-control calculoTotalHas" tittle="" onchange="calcularDosis100('+cm+','+x+')"  name="dosisHa" id="dosisHa'+cm+'"></td><td><label id="lbHas'+cm+'"></label></td>';
				tblMaterial +=	"<td class='hasTotal'>"+formatNumber(has)+"</td>" ;
				//var total = parseFloat(has) * parseFloat(va.dosis_has);
				tblMaterial +=	"<td><input type='text' class='form-control' value='' disabled name='total' id='total"+cm+"'></td>"; 
				tblMaterial += "<td><label id='lum"+cm+"'></label></td>";
				tblMaterial += "<td><label id='bombada"+cm+"'></label></td>";
			}
			tblMaterial += '<td style="display:none"><input type="hidden" name="almacen" id="almacen'+cm+'"></td>'
			tblMaterial += '<td>';
		//if(x > 0){
			tblMaterial += '<a class="" id="des'+cm+'" onclick="descartarMaterial('+cm+');">'+
					'<i class="fa fa-minus">'+
				'</a>';
		//}
		tblMaterial += '</td>'+
		'</tr>';
		tblMaterial += tblMaterial2;
		cm++;
	return tblMaterial;
}

function calcularDosis100(idM,idP){
	var mojamiento = parseInt($('#mojamiento').val());
	var cap_maq = parseNumericFloat($("#capacidad_maquina").val());
	var dosishasPuntoDecimalSinComa = $('#dosisHa'+idM).val().replace(".","").replace(",",".");
	var dosishas = parseFloat(dosishasPuntoDecimalSinComa);

	var hasPuntoDecimalSinComa = has;
	
	var dosis100 = parseFloat(dosishas / (mojamiento/100)) ;
	var total_ca = ((cap_maq / 100) * dosis100) /1000;
	if($("#lum"+idM).html() == 'G'){
		var total    = (dosishas ) * parseFloat(hasPuntoDecimalSinComa);
	} else {
		var total    = (dosishas / 1000) * parseFloat(hasPuntoDecimalSinComa);
	}
	$('#dosisHa'+idM).val(formatNumber2(dosishas));
	$('#dosiscien'+idM).val(formatNumber2(dosis100));
	$('#total'+idM).val(formatNumber2(total));
	console.log(total_ca);
	$('#bombada'+idM).html(formatNumber2(total_ca));
}



function calcularDosisHas(idM,idP){
//	var shas = 0;
////	$.each(arrayCuarteles, function(k,va){
////		shas += va.has;
////	})

	var mojamiento = parseInt($('#mojamiento').val());
	var cap_maq = parseNumericFloat($("#capacidad_maquina").val());
	
	var dosis100PuntoDecimalSinComa = $('#dosiscien'+idM).val().replace(".","").replace(",",".");
	var dosis100 = parseFloat(dosis100PuntoDecimalSinComa);
	var total_ca = ((cap_maq / 100) * dosis100) /1000;
	var hasPuntoDecimalSinComa = has;
	
	var dosishas = parseFloat((mojamiento/100) * dosis100);
//	var total    = dosishas * parseFloat(has);
	if($("#lum"+idM).html() == 'G'){
		var total    = (parseFloat(dosishas) ) * parseFloat(hasPuntoDecimalSinComa);
	} else {
		var total    = (parseFloat(dosishas) / 1000) * parseFloat(hasPuntoDecimalSinComa);
	}
	
	$('#dosiscien'+idM).val(formatNumber2(dosis100));
	$('#dosisHa'+idM).val(formatNumber2(dosishas));
	$('#total'+idM).val(formatNumber2(total));
	
	$('#bombada'+idM).html(formatNumber2(total_ca));
}

function recalcularMaterial(mojamiento,id){
	console.log(arrayMateriales);
	var tempMateriales = arrayMateriales;
	arrayMateriales = [];
	$.each(tempMateriales, function(k,va){
		var dosis100 = parseFloat(va.dosis_100);
		console.log(dosis100);
		var dosishas = (mojamiento/100) * dosis100;
		console.log(dosishas);
		if($('#programaAplicacion').val() == 3){
			var cantidad =  (dosishas) * parseFloat(has);
			va.cantidad  = cantidad;
			va.dosis_has  = dosishas;
		} else {
			var cantidad     = (dosishas / 1000) * parseFloat(has);
			va.cantidad      = cantidad;
			va.dosis_has     = dosishas;
		}
		
		arrayMateriales.push(va);
	});
	console.log(arrayMateriales);
}

function detNotificacion(){
	
	$('#loading').show();
	
	setTimeout(function(){
		var detalleNotificacion = "";
		detalleNotificacion +='<div class="table-responsive">';
		detalleNotificacion +=	'<table class="table table-striped table-condensed" id="tbl_colaboradores">';
		detalleNotificacion +=		'<thead style="text-align: center;">';
		detalleNotificacion +=			'<tr>';
		detalleNotificacion +=				'<th style="text-align: center;">Campo</th>';
		detalleNotificacion +=				'<th style="text-align: center;">Especie</th>';
		detalleNotificacion +=				'<th style="text-align: center;">Fecha</th>';
		detalleNotificacion +=				'<th style="text-align: center;">Estado Fenológico</th>';
		detalleNotificacion +=				'<th style="text-align: center;">Programa Aplicación</th>';
		detalleNotificacion +=				'<th style="text-align: center;">Control de</th>';
		detalleNotificacion +=				'<th style="text-align: center;">Reserva</th>';
		detalleNotificacion +=				'<th style="text-align: center;">Solped</th>'; 
		detalleNotificacion +=			'</tr>';
		detalleNotificacion +=		'</thead>';
		detalleNotificacion +=		'<tbody >';
		detalleNotificacion +=			'<tr>';
		detalleNotificacion +=			"<td>"+$("#dataHuerto option:selected").text()+"</td>";
		detalleNotificacion +=			"<td>"+$("#especie option:selected").text()+"</td>";
		detalleNotificacion +=			"<td>"+formatFecha(dateHoy())+"</td> " ;
		detalleNotificacion +=			"<td>"+$("#estFen option:selected").text()+"</td>";
		detalleNotificacion +=			"<td>"+$("#programaAplicacion option:selected").text()+"</td>";
		detalleNotificacion +=			"<td>"+$("#control option:selected").text()+"</td>";
		detalleNotificacion +=			"<td id='tdReserva'>"+$("#reserva").val()+"</td>";
		detalleNotificacion +=			"<td id='tdSolped'>"+$("#solped").val()+"</td>";
		detalleNotificacion +=			'</tr>';
		detalleNotificacion +=			'<tr>';
		detalleNotificacion +=				'<th style="text-align: center;" colspan="2">Fecha Entrega Solped</th>';
		detalleNotificacion +=				'<th style="text-align: center;" colspan="2" >Observación Solped</th>';
		detalleNotificacion +=			'</tr>';
		detalleNotificacion +=			'<tr>';
		detalleNotificacion +=			"<td colspan='2'><input size='16' type='text' name='fecha' style='width:230px' class='form-control' " +
		//		"value='"+formatFecha(arrayListaNot.fecha_estimada_aplicacion)+"' id='fechaEst"+arrayListaNot.numero_orden+"' readonly onchange='valFechaHoy(this.id)'></td> " ;
		"value='"+formatFecha(dateHoy())+"' id='fechaSol' readonly onchange='valFechaHoy(this.id)'></td> " ;
		detalleNotificacion +=			"<td colspan='3'><input size='16' type='text' name='observacion' style='width:330px' class='form-control' value='' id='observacionSolped'  </td> " ;
		detalleNotificacion +=			'</tr>';
		detalleNotificacion +=		'</tbody>';
		detalleNotificacion +=	'</table>';
		detalleNotificacion +='</div>';
		
		detalleNotificacion +='<div class="table-responsive">';
		detalleNotificacion +=	'<table class="table table-striped table-condensed table-bordered" id="tbl_colaboradores">';
		detalleNotificacion +=		'<thead style="text-align: center;">';
		detalleNotificacion +=			'<tr>';
		detalleNotificacion +=				'<th style="text-align: center;"><input type="checkbox" checked id="cbSelectTodo" onchange="selectTodo()" ></th>';
		detalleNotificacion +=				'<th style="text-align: center;">Material</th>';
		detalleNotificacion +=				'<th style="text-align: center;">Cantidad a Reserva</th>';
		detalleNotificacion +=				'<th style="text-align: center;width:140px">Cantidad Solicitar</th>';
		detalleNotificacion +=				'<th style="text-align: center;">UM</th>';
		detalleNotificacion +=				'<th style="text-align: center;">Ingrediente Activo</th>';
		detalleNotificacion +=				'<th style="text-align: center;">Stock</th>';
		detalleNotificacion +=				'<th style="text-align: center;">T/Dtco</th>';
		detalleNotificacion +=				'<th style="text-align: center;">Número</th>';
		detalleNotificacion +=				'<th style="text-align: center;">Programa</th>';
		detalleNotificacion +=				'<th style="text-align: center;">Cantidad</th>';
		detalleNotificacion +=				'<th style="text-align: center;">Fecha</th>';
		detalleNotificacion +=			'</tr>';
		detalleNotificacion +=		'</thead>';
		detalleNotificacion +=		'<tbody>';
		var disabled = "";
		var disabledE = "";
		var disabledS = "";
		arrayListMat = [];
		var xid = 0;
		$('.material').each(function(index,element){
		//$.each(arrayListaNot.lista_materiales, function(km, vm){
			var id = element.id;
			id = id.split("material");
			console.log(id);
			console.log(element);
			console.log(index);
			var dataMat = [];
			$.ajax({
				url: IPSERVERSAP + "JSON_ZMOV_10020.aspx?MATERIAL="+$("#material"+id[1]).val(),
				type:	"GET",
		//		data : JSON.stringify(row),
				dataType: 'json',
				async: false,
				success: function(data){
					dataMat = data;
				}
			})
			console.log(dataMat.LT_DETALLE[0].MATKL);
			var arrayList      = {};
			arrayList.C        = xid;
			arrayList.COD      = $("#material"+id[1]).val();
			arrayList.CANTIDAD = $("#total"+id[1]).val();
			var almacen = arrayAlmacen[dataMat.LT_DETALLE[0].MATKL];
			arrayList.ALMACEN  = almacen;
			arrayListMat.push(arrayList);
			console.log(arrayListMat);
			var dataStock = [];
			//console.log(IPSERVERSAP + "JSON_BAPI_MATERIAL_STOCK_REQ_LIST.aspx?CENTRO="+$("#dataHuerto").val()+"&MATERIAL="+vm.codigo_material+"&ALMACEN="+almacen);
			$.ajax({
				url: IPSERVERSAP + "JSON_BAPI_MATERIAL_STOCK_REQ_LIST.aspx?CENTRO="+$("#dataHuerto").val()+"&MATERIAL="+$("#material"+id[1]).val()+"&ALMACEN="+almacen,
				type:	"GET",
		//		data : JSON.stringify(row),
				dataType: 'json',
				async: false,
				success: function(data){
					dataStock = data;
				}
			})
			console.log(dataStock);
			console.log(IPSERVERSAP + "JSON_BAPI_REQUISITION_GETITEMS.aspx?CENTRO="+$("#dataHuerto").val()+"&MATERIAL="+$("#material"+id[1]).val());
			var dataSoped = [];
			$.ajax({
				url: IPSERVERSAP + "JSON_BAPI_REQUISITION_GETITEMS.aspx?CENTRO="+$("#dataHuerto").val()+"&MATERIAL="+$("#material"+id[1]).val(),
				type:	"GET",
		//		data : JSON.stringify(row),
				dataType: 'json',
				async: false,
				success: function(data){
					dataSoped = data;
				}
			})
			console.log(dataSoped);
			var MAKTX = '';
			var MEINS = '';
			var IACTIVO = '';
			if(dataMat.LT_DETALLE.length > 0){
				MAKTX = dataMat.LT_DETALLE[0].MAKTX;
				MEINS = dataMat.LT_DETALLE[0].MEINS;
				IACTIVO = dataMat.LT_DETALLE[0].IACTIVO;
			}
			var AVAIL_QTY1 = '';
			if(dataStock.T_STOCK_MATNR.length > 0){
				AVAIL_QTY1 = dataStock.T_STOCK_MATNR[0].LABST;
			}
			console.log(AVAIL_QTY1);
			console.log(formatNumber(AVAIL_QTY1));
			console.log(formatNumber(AVAIL_QTY1+""));
			detalleNotificacion +=		"<tr>";
			detalleNotificacion += 			"<td><input type='checkbox' class='cbMaterial' id='cbMaterial"+xid+"' checked ></td>" ;
			detalleNotificacion +=			"<td>"+MAKTX+"</td>";
			detalleNotificacion +=			"<td>"+$("#total"+id[1]).val()+"</td>";
			detalleNotificacion += 			"<td><input class='form-control required' type='number' id='cant"+xid+"'></td>";	
			detalleNotificacion +=			"<td>"+MEINS+"</td>";
			detalleNotificacion +=			"<td>"+IACTIVO+"</td>";					
			detalleNotificacion +=			"<td>"+formatNumber(AVAIL_QTY1)+"</td>";
			var data = [];
			var x = 0;
			$.each(dataSoped.REQUISITION_ITEMS, function(ka,va){
				var datId = '';
				$.ajax({
					url: "/simpleWeb/json/AGRO/GETSOLPED_PF/"+va.PREQ_NO,
					type:	"GET",
		//			data : JSON.stringify(row),
					dataType: 'json',
					async: false,
					success: function(data){
						datId = data;
					}
				})
				if(x>0){
					detalleNotificacion +=		"<tr>";
					detalleNotificacion += "<td></td>";
					detalleNotificacion += "<td></td>";
					detalleNotificacion += "<td></td>";
					detalleNotificacion += "<td></td>";
					detalleNotificacion += "<td></td>";
					detalleNotificacion += "<td></td>";
					detalleNotificacion += "<td></td>";
				}
				detalleNotificacion +=			"<td>Solped</td>";
				detalleNotificacion +=			"<td>"+va.PREQ_NO+"</td>";
				detalleNotificacion +=			"<td>"+datId+"</td>";
				detalleNotificacion +=			"<td>"+va.QUANTITY+"</td>";
				detalleNotificacion +=			"<td>"+formatFecha(va.REL_DATE)+"</td>";
				detalleNotificacion +=		"</tr>";
				x++;
			})
			if(dataSoped.REQUISITION_ITEMS.length == 0) {
				detalleNotificacion += "<td></td>";
				detalleNotificacion += "<td></td>";
				detalleNotificacion += "<td></td>";
				detalleNotificacion += "<td></td>";
				detalleNotificacion += "<td></td>";
				detalleNotificacion +=		"</tr>";
			}
			xid++;
		});
		if(xid == 0){
			alerta("Debe seleccionar al menos un material.");
			$('#loading').hide();
			return false;
		}
		detalleNotificacion +=		"</tbody>";
		detalleNotificacion +=	"</table>";
		detalleNotificacion +="</div>";
		detalleNotificacion +='<div class="col-sm-12 col-md-12">';
		if($("#reserva").val() != ''){
			detalleNotificacion +=		"<td><div class='btn btn-circle red btn-outline' id='btnReserva' onclick='reservar();' style='display:none'> Reservar</div></td>";
			detalleNotificacion +=		"<td><div class='btn btn-circle green btn-outline' id='btnGuardar' onclick='addAct();' > Generar Orden</div></td>";
		} else {
			detalleNotificacion +=		"<td><div class='btn btn-circle red btn-outline' id='btnReserva' onclick='reservar();'> Reservar</div></td>";
			detalleNotificacion +=		"<td><div class='btn btn-circle green btn-outline' id='btnGuardar' onclick='addAct();' style='display:none'> Generar Orden</div></td>";
		}
		
		if($("#solped").val() != ''){
			detalleNotificacion +=		"<td><div class='btn btn-circle red btn-outline' style='display:none' id='btnSolped' onclick='solped();'> Solicitar</div></td>";
		} else {
			detalleNotificacion +=		"<td><div class='btn btn-circle red btn-outline' id='btnSolped' onclick='solped();'> Solicitar</div></td>";
		}
		detalleNotificacion +='</div>';
		$('#loading').hide();
		
		popUp("Detalle Orden de Aplicación", detalleNotificacion, true, "1400px", true);
		fechas();
	},500);
}

function reservar(id){
	$('#btnReserva').hide();
	$("#loading").show();
	
	if(SESION.user == undefined){
		alerta("Se perdió sesión");
		$('.swal2-confirm').click(function(){
			window.location.href = ("login");
		})
		return false;
	}
	setTimeout(function(){
	var fecha = "";
	var codMat = "";
	var cantMat = "";
	var ceco = "";
	var almacen = "";
	var campo = "";
	fecha = dateHoy();
	fecha = fecha.replace("-", "").replace("-", "");
	campo = $("#dataHuerto").val();
	var mat = {};
	mat.MATERIALES = [];
	console.log();		
	$.each(arrayListMat, function(k,v){
		var arrayList = {};
		arrayList.COD = v.COD;
		arrayList.CANTIDAD = v.CANTIDAD.replace(".","").replace(",",".");
		arrayList.ALMACEN  = v.ALMACEN; 
		mat.MATERIALES.push(arrayList);
	});
	console.log(mat);
	var materiales = JSON.stringify(mat);
	almacen = '';
	var url  = IPSERVERSAP + "JSON_BAPI_RESERVATION_CREATE1.aspx?FECHA="+fecha+"&ALMACEN=&ALMACENDESTINO=TRAN"+"&MATERIALES="+materiales+"&CENTRO="+campo+"&MOVIMIENTO=311&CENTROCOSTO=&EQUIPO=";
	var user = "&USPAS="+SESION.user+"X*X"+SESION.pass;
	url  += user;
	console.log(url);
	//return;
	$.getJSON(url, function(response){
		if(response.RESERVATION != 0){
			alerta("Se ha reservado con éxito, número de reserva "+response.RESERVATION);
			$('#tdReserva').html(response.RESERVATION);
			$('#reserva').val(response.RESERVATION);
			$('#btnGuardar').show();
		} else {
			var mensaje = "";
			$.each(response.RETURN, function(key, val){
				mensaje += val.MESSAGE+"<br>";
			});
			$('#btnReserva').show();
			alerta(mensaje);
		}
		$("#loading").hide();
	});
	}, 500);
}

function solped(id){
	if(SESION.user == undefined){
		alerta("Se perdió sesión");
		$('.swal2-confirm').click(function(){
			window.location.href = ("login");
		})
		return false;
	}
	
	$('#btnSolped').hide();
	$("#loading").show();
	var fecha = "";
	var codMat = "";
	var cantMat = "";
	var ceco = "";
	var almacen = "";
	var campo = "";
	setTimeout(function(){
	fecha = dateHoy();
	fecha = fecha.replace("-", "").replace("-", "");
	var mat = {};
	mat.MATERIALES = listMaterialesSolped();
	var fecha2 = formatFecha($('#fechaSol').val());
	fecha2 = fecha2.replace("-", "").replace("-", "");
	var observacion = $('#observacionSolped').val();

	
	var materiales = JSON.stringify(mat);
	campo = $("#dataHuerto").val();
	almacen = '';
	
	var url  = IPSERVERSAP + "JSON_BAPI_REQUISITION_CREATE.aspx?FECHA="+fecha+"&MATERIALES="+materiales+"&ALMACEN=&CENTRO="+campo+"&CENTROCOSTO=&EQUIPO=";
	url += "&FECHAENTREGA="+fecha2+"&OBSERVACION="+observacion;	
	var user = "&USPAS="+SESION.user+"X*X"+SESION.pass;
	user += "&GRUPO_COMRPA="+SESION.grupoCompra+"&SOLICITANTE="+SESION.solicitante;
	url  += user;
	console.log(url);
	$.getJSON(url, function(response){
		console.log(response);
		if(response == 'A conversion error occurred.'){
			alerta(response);
			$('#btnSolped').show();
			$("#loading").hide();
		}
		if(response.NUMBER != ""){
			alerta("Se ha realizado la solicitud de pédido "+response.NUMBER);
			$('#solped').val(response.NUMBER);
			$('#tdSolped').html(response.NUMBER);
		
		} else {
			var mensaje = "";
			$.each(response.RETURN, function(key, val){
				mensaje += val.MESSAGE+"<br>";
			});
			alerta(mensaje);
			$('#btnSolped').show();
		}
		$("#loading").hide();
	});
	}, 500);
}
function listMaterialesSolped(){
	var arrayListMatS = [];
	$.each(arrayListMat, function(k,v){
		if($("#cbMaterial"+v.C).is(':checked')){
			if($('#cant'+v.C).val() != "" || $('#cant'+v.C).val() < 0){
				var arrayList = {};
				arrayList.COD = v.COD;
				arrayList.CANTIDAD = $('#cant'+v.C).val();
				arrayList.ALMACEN  = v.ALMACEN;
				arrayListMatS.push(arrayList);
			}
		}
	})
	return arrayListMatS;
	
}
function calcularTotalFS(id,x){
	var por = parseFloat($('#L'+id).text().split('%')[0]);
	var valor = parseFloat($('#'+id).val());
	var dosisHa = (valor / por) * 100;
	$('#dosisHa'+x).val(formatNumber(dosisHa));
	var total = (dosisHa * parseFloat(has));
	$('#total'+x).val(formatNumber2(total));
	calcularProcentajeFS(x);
}

function calcularProcentajeFS(x){
	var Niteogeno = parseFloat($('#LNiteogeno'+x).text().split('%')[0]);
	var Fosforo = parseFloat($('#LFosforo'+x).text().split('%')[0]);
	var Potasio = parseFloat($('#LPotasio'+x).text().split('%')[0]);
	var Azufre = parseFloat($('#LAzufre'+x).text().split('%')[0]);
	var Calcio = parseFloat($('#LCalcio'+x).text().split('%')[0]);
	var Zinc = parseFloat($('#LZinc'+x).text().split('%')[0]);
	var Fierro = parseFloat($('#LFierro'+x).text().split('%')[0]);
	var Cobre = parseFloat($('#LCobre'+x).text().split('%')[0]);
	var Magnesio = parseFloat($('#LMagnesio'+x).text().split('%')[0]);
	var dosisHa = parseFloat($('#dosisHa'+x).val().replace(".","").replace(",","."));
	var total = (dosisHa * parseFloat(has)) ;
	$('#Niteogeno'+x).val(formatNumber2((dosisHa * Niteogeno / 100)));
	$('#Fosforo'+x).val(formatNumber2((dosisHa * Fosforo / 100)));
	$('#Potasio'+x).val(formatNumber2((dosisHa * Potasio / 100)));
	$('#Azufre'+x).val(formatNumber2((dosisHa * Azufre / 100)));
	$('#Calcio'+x).val(formatNumber2((dosisHa * Calcio / 100)));
	$('#Zinc'+x).val(formatNumber2((dosisHa * Zinc / 100)));
	$('#Fierro'+x).val(formatNumber2((dosisHa * Fierro / 100)));
	$('#Cobre'+x).val(formatNumber2((dosisHa * Cobre / 100)));
	$('#Magnesio'+x).val(formatNumber2((dosisHa * Magnesio / 100)));
	$('#total'+x).val(formatNumber2(total));
	$('#dosisHa'+x).val(formatNumber2(dosisHa));
}

function formatNumber(num) {
    if (!num || num == 'NaN') return '0';
    if (num == 'Infinity') return '&#x221e;';
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
        num = num.substring(0, num.length - (4 * i + 3)) + '.' + num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num + ',' + cents);
}
function formatNumber2(num) {
    if (!num || num == 'NaN') return '0';
    if (num == 'Infinity') return '&#x221e;';
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 1000 + 0.50000000001);
    console.log(num);
    cents = num % 1000;
    console.log(cents);
    num = Math.floor(num / 1000).toString();
    if (cents < 100)
        cents = "0" + cents;
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
        num = num.substring(0, num.length - (4 * i + 3)) + '.' + num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num + ',' + cents);
}

$(window).on('beforeunload', function() {
	console.log(guardado);
	if(!guardado){
		var mensaje = '';
		var x = 0;
		if($("#reserva").val() != ''){
			$.ajax({						
				url: IPSERVERSAP+"JSON_BAPI_RESERVATION_DELETE.aspx?RESERVA="+$("#reserva").val(),
				type:	"GET",
				dataType: 'json',
				async: false,
				success: function(data){
					mensaje += data.RETURN[0].MESSAGE+"<br>";
					x++;
				}
			})
		}
		var solped = $("#solped").val();
		if(solped != '') {
			var posiciones = [];
			var urlGetSolped = IPSERVERSAP+"JSON_BAPI_REQUISITION_GETITEMS.aspx?CENTRO="+$("#dataHuerto").val()+"&SOLPED="+solped;
			var p = 10;
			$.ajax({
				url: urlGetSolped,
				type:	"GET",
				dataType: 'json',
				async: false,
				success: function(data){
					$.each(data, function(k,v){
						var pos = {};
						pos.POSICION = p;
						p += 10;
						posiciones.push(pos);
					})
				}
			})
			console.log(posiciones);
			var parametro = {};
			parametro.PARAMETROS = {};
			parametro.PARAMETROS.NUMERO = solped;
			parametro.PARAMETROS.POSICIONES = posiciones; 
			
			var ulrEliminarSolped = IPSERVERSAP+"JSON_BAPI_REQUISITION_DELETE.aspx?PARAMETRO="+JSON.stringify(parametro);
			console.log(ulrEliminarSolped);
			
			$.ajax({
				url: ulrEliminarSolped,
				type:	"GET",
				dataType: 'json',
				async: false,
				success: function(data){
					mensaje += data.RETURN[0].MESSAGE+"<br>";
					x++;
				}
			})
		}
		if(x > 0){
			alerta(mensaje);
		}
	}
});


