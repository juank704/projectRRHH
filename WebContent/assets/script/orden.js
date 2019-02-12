 //$(document).ready(function(){
//	loadTblOrden();
//});
var mayor = 0;
var countMa = 1;
var arrayMaterial;
var arrayMaquinaria  = [];
var arrayImplemento  = [];
var maxCarencia = 0;
var campo = '';
var numero_orden;
var codigo_orden;
$(document).ready(function(){
	fechas();
	onLoad();
	$('.form-control.input-sm').select2({
		multiple: false,
		placeholder: "Seleccione"
	});
	$('.form-control2.input-sm2').select2({
		multiple: false,
		placeholder: "Seleccione",
		width: "380px"
	});
	$('#updateAct').hide();
});


/*function getMaquinaria(c){
	arrayMaquinaria = [];
	$.ajax({
		url: IPSERVERSAP + "JSON_BAPI_EQUI_GETLIST.aspx?CENTRO="+c,//ZREP
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			arrayMaquinaria = data.EQUIPMENT_LIST;
		}
	})
}
function getImplemento(c){
	arrayImplemento = [];
	$.ajax({
		url: IPSERVERSAP + "JSON_BAPI_EQUI_GETLIST.aspx?CENTRO="+c,//ZREP
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			arrayImplemento = data.EQUIPMENT_LIST;
		}
	})
}*/

function getMaterial(){
	$.ajax({
		url: "/simpleWeb/json/AGRO/GETMA/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			arrayMaterial = data;
		}
	})
}
function loadMercado(){		
		
	//$('#mercado').append($('<option>', {value: 0, text: "Seleccione"}));
	$.getJSON("/simpleWeb/json/AGRO/GETMERCADOS", function(data){
		$.each(data, function(k, v){
			$('#mercado').append($('<option>', {value: v.codigo, text: v.descripcion}));
		})
	});
}


function loadFormaAplicacion(){		
	
	//$('#forma_aplicacion').append($('<option>', {value: 0, text: "Seleccione"}));
	$.getJSON("/simpleWeb/json/AGRO/GETFA/", function(data){
		$.each(data, function(k, v){
			$('#forma_aplicacion').append($('<option>', {value: v.codigo, text: v.descripcion}));
		})
	
	});
}

function loadJefeAplicacion(campo){		
	var url = "/simpleWeb/json/AGRO/getParametros_campoByCampo/"+campo+"/Jefe Aplicacion";	
	console.log(url);
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
}
function loadNombreAplicador(campo){		
	var url = "/simpleWeb/json/AGRO/getTrabajadoresAgro2/?TRABAJADOR=*&CAMPO="+campo+"&RUT=*&CARGO=7&FECHA=*&DIGITADOR="+SESION.idUser;
	console.log(url);
	//$('#nombre_aplicador').append($('<option>', {value: 0, text: "Seleccionar"}));	
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

function updateAct(){
	$("#loading").show();
	setTimeout(function(){
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
	if($('#nombre_aplicador').val() == ''){
		oa.aplicador              = 0;
	} else {
		oa.aplicador              = $('#nombre_aplicador').val();
	}
	
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
	//return;
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
	//$("#loading").hide();
	},500);
}

function addAct(){
	$("#loading").show();
	setTimeout(function(){
	$(".oblig").each(function(){
		if($(this).val()== ''){
			alerta("Debe competar los datos obigatorios (*)");
			$("#loading").hide();
			return false;
		}
	})

	var oa = {};
	var arrayMaqquinaria = [];
	var arrayMaq = {};
//	arrayMaq.maquinaria = $('#maquinarias').val();
//	arrayMaq.implemento = $('#implementos').val();
//	console.log(arrayMaq);
//	arrayMaqquinaria.push(arrayMaq);
//	console.log(arrayMaqquinaria);
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
	oa.codigo_pf              = numero_orden;
	console.log($('#nombre_aplicador').val());
	if($('#nombre_aplicador').val() == null){
		oa.aplicador              = 0;
	} else {
		oa.aplicador              = $('#nombre_aplicador').val();
	}
	oa.fecha_programa         = formatFecha($('#fecha_estimada_aplicacion').val());
	oa.estado_fenologico      = $('#estado_fenologico').val();
	oa.fecha_estimada_cosecha = "";
	oa.mercado                = $('#mercado').val();
	oa.codigo_fa			  = $('#forma_aplicacion').val();
	oa.fecha_inicio			  = formatFecha($("#fecha_inicio").val());
	oa.jefe_aplicacion		  = $('#jefe_aplicacion').val();
	oa.dosis_bombada		  = "0";
	oa.cambio_tractor		  = $('#cambio_tractor').val();
	oa.presion_bomba		  = $('#presion_bombada').val();
	oa.marcha_tractor		  = $('#marcha_tractor').val();
	oa.dias_cosecha			  = "0";
	oa.fecha_viable_cosecha   = formatFecha($("#fecha_viable").val());
	oa.maquinaria_pf		  = arrayMaqquinaria;
	oa.campo 				  = campo;
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
	//$("#loading").hide();
	},500);
}
var cMaq = 0;
function addMaquinaria(){
	if($('#cambio_tractor').val() == '6' || $('#cambio_tractor').val() == '7'){
		alerta("Maquinaria no aplica");
		return false;
	}
	var tr  = "<tr id='tr"+cMaq+"'>";
	    tr += "<td><select id='maquinarias"+cMaq+"'  class='form-control2 input-sm2'>";		
		tr += $.each(arrayMaquinaria, function(key, val){
			tr += "<option value='"+val.EQUIPMENT+"'>"+val.DESCRIPT+"</option>";
		});
	    tr += "</select>";
		tr += "</td>";
		tr += "<td>";
		tr += "<select id='implementos"+cMaq+"'  class='form-control2 input-sm2'>";
		tr += $.each(arrayImplemento, function(key, val){
			tr += "<option value='"+val.EQUIPMENT+"'>"+val.DESCRIPT+"</option>";
		});
		tr += "</select>";
		tr += "</td>";						
		tr += 	'<td>';
		tr += 		'<a onclick="descartarCuartel('+cMaq+');">';
		tr +=			'<i class="fa fa-minus">';
		tr +=		'</a>';
		tr += '</td>';
		tr += "</tr>";
		$('#tbl_Maquinaria').append(tr);
		$('.form-control2.input-sm2').select2({
			multiple: false,
			placeholder: "Seleccione",
			width: "380px"
		});
		$.each(arrayMaq, function(key, val){
			if(v.maquinaria == val.codigo) {
				tbl += "<option value='"+val.codigo+"' selected>"+val.descripcion+"</option>";
			} else {
				tbl += "<option value='"+val.codigo+"'>"+val.descripcion+"</option>";
			}
		});
		cMaq++;
}
function descartarCuartel(c){
	$('#tr'+c).remove();
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
var dataMaterial = [];
function onLoad(){
	$("#loading").show();
	$.getJSON("/simpleWeb/json/AGRO/LISTA_ORDEN_DETALLE/"+window.location.hash.replace("#",""), function(data){
		console.log(data);
		loadMercado();
		loadFormaAplicacion();
		loadJefeAplicacion(data.codCampo);
		//getMaquinaria(data.codCampo);
		//getImplemento(data.codCampo);
		loadNombreAplicador(data.codCampo);
		$("#titlePrograma").html("Programa N° <b>"+data.idPrograma+"</b>");
		$("#campo").val(data.campo);
		$("#especie").val(data.especie);
		$("#estado_fenologico").val(data.estado_fenologico.trim());
		$("#fecha_estimada_aplicacion").val(formatFecha(data.fecha_estimada_aplicacion));
		$("#fecha_estimada_cosecha").val(data.fecha_estimada_cosecha);
		$("#forma_aplicacion").val(data.forma_aplicacion);
		$("#programa_aplicacion").val(data.programa_aplicacion);
		$("#control_de").val(data.tipo_control.trim());
		$("#observacion").val(data.observacion);
		console.log(formatNumber(data.mojamiento));
		var mojamiento = formatNumber(data.mojamiento);
		$("#mojamiento").val(mojamiento);
		$('#dosis_bombada').val((parseInt(data.mojamiento)/100));
		$("#especie").html("Especie "+data.especie);
		campo = data.codCampo;
		codigo_orden = data.idorden;
		numero_orden = data.numero_orden;
		setTimeout(function(){ 
			formaAplicacion();
		},500);
		
		if(data.tipo_programa == 1) {
			$('#tipo_aplicacion').val('PROGRAMADA');
		} else {
			$('#tipo_aplicacion').val('CONTINGENCIA');
		}
		console.log(data.idProgramaAplicacion);
		if(data.idProgramaAplicacion == 3){
			//$('#forma_aplicacion').attr('disabled','disabled');
			//$("#presion_bombada").attr('disabled','disabled');
		}
		$('#materiales').html("Lista Materiales N° Reserva <b>"+data.nreserva+"</b>");
		//$("#dias_cosecha").val(diff/(1000*60*60*24) );	
		
		//console.log(fechaInicio);
		
	
		dataMaterial = data.lista_materiales;
		$.each(data.lista_materiales, function(k, v){			
			console.log(k);
			console.log(v);
			$.getJSON(IPSERVERSAP + "JSON_ZMOV_10020.aspx?MATERIAL="+v.codigo_material, function(dataMat){
				
				if(dataMat.LT_DETALLE[0].CARENCIA > mayor)				
				mayor = dataMat.LT_DETALLE[0].CARENCIA; 
				if(maxCarencia < parseInt(dataMat.LT_DETALLE[0].CARENCIA)){
					maxCarencia = dataMat.LT_DETALLE[0].CARENCIA;
				}
				var tbl = "";
				tbl += "<tr>";
				tbl += 		"<td>"+dataMat.LT_DETALLE[0].MAKTX+"</td>";
				tbl += 		"<td>"+formatNumber2(v.cantidad)+"</td>";
				tbl +=      "<td>"+dataMat.LT_DETALLE[0].MEINS+"</td>";
				tbl += 		"<td>"+formatNumber2(v.dosis_100)+"</td>";
				tbl += 		"<td>"+formatNumber2(v.dosis_has)+"</td>";
				tbl += 		"<td>"+dataMat.LT_DETALLE[0].CARENCIA+"</td>";
				tbl += 		"<td>"+dataMat.LT_DETALLE[0].REINGRESO+"</td>";
				tbl += 		"<td id='mat"+v.codigo_material+"'>0</td>";
				tbl += "</tr>";
				$('#tblMateriales').append(tbl);
			})
		})
		var hoy = new Date();
		//$('#fecha_viable').val(sumarDias(hoy,maxCarencia));
		var totalHas = 0;
		$.each(data.lista_cuarteles, function(k, v){
			
			if(v.estado != '' ) {
				var fechaInicio = new Date(v.fechaEstimadaCosecha);
				
				var diff = fechaInicio - hoy;
				diff = diff/(1000*60*60*24);
				var diasACosecha = 0;
				var tbl = "";
				tbl += "<tr>";
				tbl += 		"<td>"+v.nVariedad+"</td>";
				tbl += 		"<td>"+v.nCuartel+"</td>";			
				tbl += 		"<td>"+formatNumber(v.has)+"</td>";
				tbl += 		"<td>"+orderFecha(v.fechaEstimadaCosecha)+"</td>";
				tbl += 		"<td>"+parseInt(diff)+"</td>";	
				tbl += "</tr>";
				totalHas += parseFloat(v.has);
				$('#tblCuartel').append(tbl);
			}
		}) 
		var tbl = "";
		tbl += "<tr>";
		tbl += 		"<td></td>";
		tbl += 		"<th>Total</th>";			
		tbl += 		"<td>"+formatNumber(totalHas)+"</td>";
		tbl += 		"<td></td>";
		tbl += 		"<td></td>";
		tbl += "</tr>";
		$('#tblCuartel').append(tbl);
		
		var dataDetalle  = [];
		$.ajax({
			url: "/simpleWeb/json/AGRO/LISTA_APLICACIONES_DETALLE/"+data.idorden,
			type:	"GET",
//			data : JSON.stringify(row),
			dataType: 'json',
			async: false,
			success: function(data){
				dataDetalle = data;
			}
		})
		
		console.log("/simpleWeb/json/AGRO/LISTA_APLICACIONES_DETALLE/"+data.idorden);
		//$.getJSON("/simpleWeb/json/AGRO/LISTA_APLICACIONES_DETALLE/"+data.idorden, function(data2){
			console.log(dataDetalle);
			setTimeout(function(){
			if(dataDetalle.codigo != 0) {
				$("#fecha_inicio").val(formatFecha(dataDetalle.fecha_estimada_aplicacion));
				$("#mercado").val(dataDetalle.codMercado).trigger('change');
				$("#nombre_aplicador").val(dataDetalle.nombre_aplicador).trigger('change');
				$("#jefe_aplicacion").val(dataDetalle.jefe_aplicacion).trigger('change');
				$("#forma_aplicacion").val(dataDetalle.implemento).trigger('change');//se utiliza implemento para no crear otra variable en el mismo servicio xd
				
				$("#titleGeneral").html("Orden de Aplicación "+dataDetalle.codigo);
				$("#fecha_viable").val(formatFecha(dataDetalle.fecha_viable));
				$("#capacidad_maquina").val(data.capacidad_maquina).trigger('change');
				if(data.idProgramaAplicacion != 3){
					$("#presion_bombada").val(dataDetalle.presion_bomba).trigger("change");
				} else {
					$("#presion_bombada").val(0).trigger("change");
				}
				$("#cambio_tractor").val(dataDetalle.cambio_tractor).trigger('change');
				$("#marcha_tractor").val(dataDetalle.marcha_tractor).trigger('change');
				if(dataDetalle.codigo != 0){
					$('#addAct').hide();
					$('#updateAct').show();
				}
				$("#um_dosis").val(dataDetalle.um).trigger('change');
				if(dataDetalle.estado != 'Emitida' && dataDetalle.estado != 'Creada'){
					$("#jefe_aplicacion").attr("disabled",true);
					$("#nombre_aplicador").attr("disabled",true);
					$("#mercado").attr("disabled",true);
					$("#forma_aplicacion").attr("disabled",true);
					$("#capacidad_maquina").attr("disabled",true);
					$("#presion_bombada").attr("disabled",true);
					$("#cambio_tractor").attr("disabled",true);
					$("#um_dosis").attr("disabled",true);
					$("#marcha_tractor").attr("disabled",true);
					$("#fecha_inicio").attr("disabled",true);
					$('#updateAct').hide();
				}
			}
			
			$("#loading").hide();
			},500);
		//});
		
	});
	

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
	/*if(fechaSelect < hoy){
		alerta("La fecha seleccionada no puede ser mayor a la actual");
		$('#'+id).val(formatFecha(h));
		return;
	}*/
}


function formaAplicacion(){
	if($('#forma_aplicacion').val() == '1'){
		$('#presion_bombada').attr('disabled',true);
		$('#presion_bombada').val('');
		$('#um_dosis').attr('disabled',true);
		$('#um_dosis').val('');
		$('#dosis_bombada').attr('disabled',true);
		//$('#dosis_bombada').val();
		$('#capacidad_maquina').attr('disabled',true);
		$('#capacidad_maquina').val('');
		$('#cambio_tractor').val(6).trigger('change');
		$('#marcha_tractor').val(6).trigger('change');
	} else {
		$('#presion_bombada').attr('disabled',false);
		$('#um_dosis').attr('disabled',false);
		$('#dosis_bombada').attr('disabled',false);
		$('#capacidad_maquina').attr('disabled',false);
	}
}
$('#forma_aplicacion').change(function(){
	formaAplicacion();
	
});
$("#capacidad_maquina").change(function(){
	console.log($(this).val());
	var cap_maq = parseNumericFloat($(this).val());
	console.log(cap_maq);
	$.each(dataMaterial ,function(k,v){
		var dosis_100 = v.dosis_100;
		console.log(dosis_100);
		var total = ((cap_maq / 100) * dosis_100) /1000;
		console.log(total);
		$("#mat"+v.codigo_material).html(formatNumber2(total));
	});
	$("#capacidad_maquina").val(formatNumber2($(this).val()));
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



function modalAddRetirarBodega(id){
	var tblRetiroBodega = "";
	tblRetiroBodega +='<div class="table-responsive" id="ignore">';
	tblRetiroBodega +=	'<table class="table table-striped table-condensed" id="tbl_colaboradores">';
	tblRetiroBodega +=		'<thead style="text-align: center;">';
	tblRetiroBodega +=			'<tr>';
	tblRetiroBodega +=				'<th style="text-align: center;">Material</th>';
	tblRetiroBodega +=				'<th style="text-align: center;">Unidad de Medida</th>';
	tblRetiroBodega +=				'<th style="text-align: center;">Cantidad</th>';
	tblRetiroBodega +=				'<th style="width: 2%; text-align: center;">Descartar</th>';
	tblRetiroBodega +=			'</tr>';
	tblRetiroBodega +=		'</thead>';
	tblRetiroBodega +=		'<tbody id="tblRetiroBodega">';
	tblRetiroBodega += 			createTblRetiroBodega(id);
	tblRetiroBodega += 		'</tbody>';
	tblRetiroBodega +=	'</table>';
	tblRetiroBodega +='</div>';
	tblRetiroBodega +='<div style="text-align: right;">';
//	tblRetiroBodega +=	'<a id="" class="" onclick="javascript: menuAddMaquinaria('+auxEx+');">';
//	tblRetiroBodega +=		'<i class="fa fa-plus"></i>';
//	tblRetiroBodega +=	'</a>';
	tblRetiroBodega +='</div>';
	tblRetiroBodega +='<div class="col-sm-12 col-md-12">';
	tblRetiroBodega +=	'<div class="btn btn-circle blue btn-outline" id="addCuartel" onclick="addCuartel('+auxEx+')" >Guardar</div>';
	tblRetiroBodega +=	'<div class="btn btn-circle red btn-outline" onclick="closeModal();">Cancelar</div>';
	tblRetiroBodega +='</div>';
	/*popUp(Titulo, Contenido(HTML), Animacion(true o false), Tamaño(% o px), Boton Cerrar(true o false))*/
	popUp("Cantidad de material a retirar de Bodega", tblRetiroBodega, true, '600px', true);
}
function createTblRetiroBodega(id){
	auxEx++;
	var idNew = "new"+auxEx;
	var tblRetiroBodega = "";
	tblRetiroBodega += '<tr id="trnew'+auxEx+'">';
	tblRetiroBodega += 	'<td>';
	tblRetiroBodega += 		'<select class="btn blue btn-outline btn-circle btn-md" name="cuartel" id="material'+idNew+'" onchange="changeCuartel(this)">';
//	tblRetiroBodega +=			selectCuartel();
	tblRetiroBodega +=		'</select>';
	tblRetiroBodega += 	'</td>';
	tblRetiroBodega += 	'<td id="tdnew'+auxEx+'">';
	tblRetiroBodega += 		'<input class="form-control input-circle" id="uni_med'+idNew+'" name="" onselect="valHas(this.id);" onkeyup="valHas(this.id);" ">';
	tblRetiroBodega += 	'</td>';
	tblRetiroBodega += 	'<td id="tdnew'+auxEx+'">';
	tblRetiroBodega += 		'<input class="form-control input-circle" id="hecCuartel'+idNew+'" name="" onselect="valHas(this.id);" onkeyup="valHas(this.id);" ">';
	tblRetiroBodega += 		'<br><label id="lblnew'+auxEx+'" style="color: #FF0000; display: none;"">El valor no puede ser mayor a las hectareas del cuartel seleccionado</label>';
	tblRetiroBodega += 	'</td>';
	tblRetiroBodega += 	'<td>';
	tblRetiroBodega += 		'<a class="" id="desc'+idNew+'" onclick="descartarCuartel('+auxEx+');">';
	tblRetiroBodega +=			'<i class="fa fa-minus">';
	tblRetiroBodega +=		'</a>';
	tblRetiroBodega += 	'</td>';
	tblRetiroBodega += '</tr>';
	return tblRetiroBodega;
}
function modalAddMaquinaria(id){
	console.log(id)
	var tblAddMaquinaria = "";
	tblAddMaquinaria +=	'<div class="table-responsive" id="ignore">';
	tblAddMaquinaria +=		'<table class="table table-striped table-condensed" id="tbl_colaboradores">';
	tblAddMaquinaria +=			'<thead style="text-align: center;">';
	tblAddMaquinaria +=				'<tr>';
	tblAddMaquinaria +=					'<th style="text-align: center;">Maquina</th>';
	tblAddMaquinaria +=					'<th style="text-align: center;">Implemento</th>';
	tblAddMaquinaria +=					'<th style="width: 2%; text-align: center;">Descartar</th>';
	tblAddMaquinaria +=				'</tr>';
	tblAddMaquinaria +=			'</thead>';
	tblAddMaquinaria +=			'<tbody id="tblAddMaquinaria'+id+'">';
	tblAddMaquinaria += 			createtblAddMaquinaria(id);
	tblAddMaquinaria += 		'</tbody>';
	tblAddMaquinaria +=		'</table>';
	tblAddMaquinaria +=	'</div>';
	tblAddMaquinaria +=	'<div style="text-align: right;">';
	tblAddMaquinaria +=		'<a id="" class="" onclick="javascript: menuAddMaquinaria('+id+');">';
	tblAddMaquinaria +=			'<i class="fa fa-plus"></i>';
	tblAddMaquinaria +=		'</a>';
	tblAddMaquinaria +=	'</div>';
	tblAddMaquinaria +=	'<div class="col-sm-12 col-md-12">';
	tblAddMaquinaria +=		'<div class="btn btn-circle blue btn-outline" id="addCuartel" onclick="addCuartel('+auxEx+')" >Guardar</div>';
	tblAddMaquinaria +=		'<div class="btn btn-circle red btn-outline" onclick="closeModal();">Cancelar</div>';
	tblAddMaquinaria +=	'</div>';
	/*popUp(Titulo, Contenido(HTML), Animacion(true o false), Tamaño(% o px), Boton Cerrar(true o false))*/
	popUp("Agregar Maquinaria", tblAddMaquinaria, true, '500px', true);
}
function createtblAddMaquinaria(id){
	auxEx++;
	var idNew = "new"+auxEx;
	var bodyAddMaquinaria = "";
	bodyAddMaquinaria += '<tr id="trnew'+auxEx+'">';
	bodyAddMaquinaria += 	'<td>';
	bodyAddMaquinaria += 		'<select class="btn blue btn-outline btn-circle btn-md" name="cuartel" id="maquina'+idNew+'" onchange="changeCuartel(this)">';
//	tblRetiroBodega +=			selectCuartel();
	bodyAddMaquinaria +=		'</select>';
	bodyAddMaquinaria += 	'</td>';
	bodyAddMaquinaria += 	'<td>';
	bodyAddMaquinaria += 		'<select class="btn blue btn-outline btn-circle btn-md" name="cuartel" id="implemento'+idNew+'" onchange="changeCuartel(this)">';
//	tblRetiroBodega +=			selectCuartel();
	bodyAddMaquinaria +=		'</select>';
	bodyAddMaquinaria += 	'</td>';
	bodyAddMaquinaria += 	'<td>';
	bodyAddMaquinaria += 		'<a class="" id="desc'+idNew+'" onclick="descartarMaquina('+auxEx+');">';
	bodyAddMaquinaria +=			'<i class="fa fa-minus">';
	bodyAddMaquinaria +=		'</a>';
	bodyAddMaquinaria += 	'</td>';
	bodyAddMaquinaria += '</tr>';
	return bodyAddMaquinaria;
}
function menuAddMaquinaria(id){
	$("#tblAddMaquinaria"+id).append(createtblAddMaquinaria(id));
}
function descartarMaquina(e){
	$("#trnew"+e).remove();
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

