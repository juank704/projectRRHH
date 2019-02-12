$(document).ready(function(){
	fechas();
	format();
	var divLoading = "<article id='loading' class='loading_dos' style='display: none;'>";
	divLoading += 		"<div id='modal' class='modal' style='display: block;'></div>"
	divLoading += "</article>";
	$("#simpleAgro").append(divLoading);
	$('.form-control.input-md.multiple').select2({
		multiple: true,
		placeholder: "Seleccionar"
	});
	selectCss();
//	if(!SESION){
//		
//	}else{
//		SESION = JSON.parse(localStorage.getItem("SESION"));
//	}
	console.log(SESION)
	$('#tbl_Fito_length').hide();
	$(".select2.select2-container.select2-container--bootstrap").attr("style", "");
	getUserPrivilege();
})
$('.form-control.input-md.multiple').each(function(){
	var glovalInput;
	$(this).change(function(){
		var inputSelect = $(this).html();
		var input = $(this).val();
		console.log(input[0])
		var newVal;
		var arrSel = [];
		if(input){
			for(var i = 0; i < input.length; i++){
				if(input[i] != 0){
					arrSel.push(input[i]);
				}
			}
		}
		if(glovalInput && input){
			for(var i = 0; i < input.length; i++){
				if(glovalInput.indexOf(input[i]) == -1){
					newVal = input[i];
				}
			}
			if(newVal == 0){
				$(this).html(inputSelect);
				$(this).val(0);
			}else{
				$(this).html(inputSelect);
				$(this).val(arrSel);
			}
		}
		var input = $(this).val();
		glovalInput = input;
	})
})
//var IPSERVERSAP = "http://200.54.43.156/SCLEM_DEV/";
var IPSERVERSAP = "http://200.54.43.156/SCLEM/"; //Desarrollo
//var IPSERVERSAP = "http://200.55.206.140/SCLEM/"; //Produccion
//var CODPRETOLEO = "10000032";//Desarrollo
var PERIODO = '2018';
var CODPRETOLEO = "10000048";//Produccion
var IPSERVERWORK = "";
var SESION = getVars();
var CUARTEL = getCuartel();
var minutos = 60;
var segundos = 0;
function selectCss(){
	var selects = document.getElementsByTagName("select");
	$.each(selects, function(){
		if($(this)[0].className.indexOf("form-control input-sm") != -1){
			$(this).select2({
				multiple: false,
				placeholder: "Seleccionar"
			});
		}
	})
	$(".select2.select2-container.select2-container--bootstrap").attr("style", "");
}
function select3(){
	$('.form-control.input-xs').select2({
		multiple: false,
		placeholder: "Seleccionar"
	});
}
var loading = function loading(){}
loading.hide = function(){
	$("#loading").hide();
}
loading.show = function(){
	$("#loading").show();
}
function viewFecha(fecha){
	fecha = fecha.split("-");
	fecha = fecha[2]+"-"+fecha[1]+"-"+fecha[0];
	return fecha;
}
setInterval(function(){
	if (segundos === 0) {
		segundos = 59;
		minutos--;
	}
//	if (minutos === 0) {
//		window.location.href=("login");
//	}
	segundos--;
	var string = "";
	string += minutos + ':' + segundos;
	document.getElementById("reloj").innerHTML = string;
}, 1000);
function classSlect(){
	$('.form-control.input-sm').select2({
		multiple: false,
		placeholder: "Seleccone"
	});
}
function formatNumber (numero) {
	const noTruncarDecimales = {maximumFractionDigits: 20};
	var resultado = "";
	numero = numero.toString();
    if(numero[0] == "-"){
        nuevoNumero = numero.replace(/\./g,'').substring(1);
    }else{
        nuevoNumero = numero.replace(/\./g,'');
    }
    if(numero.indexOf(",") >= 0){
        nuevoNumero = nuevoNumero.substring(0,nuevoNumero.indexOf(","));
    }
    for (var j, i = nuevoNumero.length - 1, j = 0; i >= 0; i--, j++){
        resultado = nuevoNumero.charAt(i) + ((j > 0) && (j % 3 == 0)? ".": "") + resultado;
    }
    if(numero.indexOf(",") >= 0){
        resultado += numero.substring(numero.indexOf(","));
    }
    if(numero[0] == "-"){
        return "-"+resultado;
    }else{
        return resultado;
    }
}
function formatNumberDB(n){
	n = String(n).split(".").join("").split(",").join(".");
	return n*1;
}
function format() {
	var number = $('.number');
	if(number.length != 0){
		for(var i = 0; i < number.length; i++){
			number[i].addEventListener('keyup', function(e){
				var element = e.target;
				var value = element.value;
				element.value = formatNumber(value);
			})
		}
	}
}
function justNumbers(e){
	var keynum = window.event ? window.event.keyCode : e.which;
	if ((keynum == 8) || (keynum == 46))
	return true;
	 
	return /\d/.test(String.fromCharCode(keynum));
}
function justUpperLeters(e){
	e.value = String(e.value).toUpperCase();
//	$(e).val(e.value.toUpperCase())
}
function spaceOff(e){
	$(e).val(e.value.replace(/ /g, ""))
}
function resNot(id){
	$.each(auxDataFito, function(k,v){
		if(v.id_programa == id){
			detalleNotificacion(v);
		}
	})
}
var especie;
var variedad;
var huertos;
function rEspecie(){
	return especie;
}
function onLoadPreseleccion(){
	$("#pendingWork").html(auxDataReclutamiento.length);
	$("#notificacionWork").html(auxDataReclutamiento.length);
	$.getJSON("/simpleWeb/json/map/loadNotiPreseleccion/", function(data){
		$("#notificacionWork").html(data.length);
		$("#pendingWork").html(data.length);
		datos = data;
		$.each(data, function(k, v){
			var noti_preseleccion = "";
			noti_preseleccion += "<li>";
			noti_preseleccion += 	"<a href='preseleccion?id_pet="+v.id_orden+"'>";
			noti_preseleccion += 		"<span class='details'>Notificación :"+v.id_orden+" / Cantidad: "+v.cantidad_total+" / Operacion: "+v.obra+" / Fecha Inicio: <strong>"+v.fecha_inicio+"</strong> / Empresa: <strong>"+v.empresa+"</strong></span>";
			noti_preseleccion += 	"</a>";
			noti_preseleccion += "</li>";
			
			//$("#loadnotifi").append(noti_preseleccion);
			$("#listWorkReclutamiento").append(noti_preseleccion);
		})
	});
}
function especies(){
	$.ajax({
		url: "/simpleWeb/json/AGRO/GETESPECIE/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			especie = data;
		}
	})
}
var requerido;
$(".submit").click(function(){
	$(".labelRe").each(function(){
		$(this).remove();
	})
	requerido = $(".required");
	requerido.each(function(){
		var content = $(this)[0].parentNode;
		if(!$(this).val()){
			for(var i = 0; i < content.childNodes.length; i++){
				if(content.childNodes[i].className == "labelRe"){
					content.removeChild(content.childNodes[i]);
				}
			}
			var label = "<label class='labelRe' style='color: #FF0000;'>Requerido</label>";
			$(content).append(label);
		}else{
			for(var i = 0; i < content.childNodes.length; i++){
				if(content.childNodes[i].className == "labelRe"){
					content.removeChild(content.childNodes[i]);
				}
			}
		}
	})
})
$(".required").keyup(function(){
	var content = $(this)[0].parentNode;
	if($(this).val()){
		for(var i = 0; i < content.childNodes.length; i++){
			if(content.childNodes[i].className == "labelRe"){
				content.removeChild(content.childNodes[i]);
			}
		}
	}
})
$(".required").change(function(){
	var content = $(this)[0].parentNode;
	if($(this).val()){
		for(var i = 0; i < content.childNodes.length; i++){
			if(content.childNodes[i].className == "labelRe"){
				content.removeChild(content.childNodes[i]);
			}
		}
	}
})
function getCuartel(){
	return SESION.cuartel;
}
function returnCUARTEL(){
	return JSON.parse(localStorage.getItem("CUARTEL"));
}
function loadFaena(){
	var FAENA;
	$.ajax({
		url: "/simpleWeb/json/AGRO/GETFAENA/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			FAENA = data;
			var faena_rendimiento = "<option value=''>Seleccione</option>"
			$.each(data, function(k,v){
				faena_rendimiento += "<option value="+v.codigo+">"+v.faena+"</option>";
			})
			$("#faena_rendimiento").html(faena_rendimiento);
		}
	})
	return FAENA;
}
function getCeco(){
	var CECO;
	$.ajax({
		url: "/simpleWeb/json/AGRO/GET_ALL_CECO/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			CECO = data;
		}
	})
	return CECO;
}

function getUserPrivilege(){
	let set = new Set();
	$.each(SESION.campo, function(key, value){
		set.add(value.campo);
	});
	localStorage.setItem('idHuerto',JSON.stringify(set));
}

function getVars(){
	var SESION;
	$.ajax({
		url: "/simpleWeb/json/AGRO/GETVARS/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			SESION = data;
//			localStorage.setItem("SESION",JSON.stringify(SESION)); //NO TOCAR
		}
	})
	return SESION;
}
function dateHoy(){
	var hoy = new Date();
	var yyyy = hoy.getFullYear();
	var mm = hoy.getMonth()+1;
	var dd = hoy.getDate();
	if(mm < 10){
		mm = "0"+mm;
	}
	if(dd < 10){
		dd = "0"+dd;
	}
	hoy = (yyyy+"-"+mm+"-"+dd);
	return hoy;
}
function valDias(val){
	var res = val.id.substring(4, 10000000);
	var sub = val.id.substring(0, 4);
	if(val.id == "fechaDesde"){
		var fechaHasta = $("#fechaHasta").val();
		if(fechaHasta != ""){
			var fechaDesde = val.value.split("-");
			fechaDesde = new Date(fechaDesde[0], fechaDesde[1], fechaDesde[2]);
			fechaHasta = fechaHasta.split("-");
			fechaHasta = new Date(fechaHasta[0], fechaHasta[1], fechaHasta[2]);
			if(fechaDesde > fechaHasta){
				alerta("La fecha desde no puede mayor a fecha hasta");
				$("#"+val.id).val("");
				return;
			}
		}
	}else if(val.id == "fechaHasta"){
		var fechaDesde = $("#fechaDesde").val();
		if(fechaDesde != ""){
			var fechaHasta = val.value.split("-");
			fechaHasta = new Date(fechaHasta[0], fechaHasta[1], fechaHasta[2]);
			fechaDesde = fechaDesde.split("-");
			fechaDesde = new Date(fechaDesde[0], fechaDesde[1], fechaDesde[2]);
			if(fechaDesde > fechaHasta){
				alerta("La fecha desde no puede mayor a fecha hasta");
				$("#"+val.id).val("");
				return;
			}
		}
	}else{
		var hoy = dateHoy();
		hoy = hoy.split("-");
		hoy = new Date(hoy[0], hoy[1], hoy[2]);
		var fechaSelect = val.value.split("/");
		fechaSelect = new Date(fechaSelect[2], fechaSelect[0], fechaSelect[1]);
		if(fechaSelect < hoy){
			alerta("La fecha seleccionada no puede ser menor a la actual");
			$("#"+val.id).val("");
			return;
		}else if(sub == "date"){
			var fAlerta = sumQuince(fechaSelect, -15);
			var dd = fAlerta.getDate();
			var mm = fAlerta.getMonth();
			var yyyy = fAlerta.getFullYear();
			if(mm < 10){
				mm = "0"+mm;
			}
			if(dd < 10){
				fAlerta = mm+'/0'+dd+'/'+yyyy;
			}else{
				fAlerta = mm+'/'+dd+'/'+yyyy;
			}
			$("#fechaAlerta"+res).val(fAlerta);
		}
	}
}
function sumQuince(fecha, sum){
	fecha.setDate(fecha.getDate() + sum);
	return fecha;
}
function getVariedad(e){
	$('#varLoading').show();
	var VarOp = [];
	var arrPrd = [];
	$.each(variedad.ET_PROD_VAR,function(key,value){
		if(value.ESPECIE == e){
			VarOp.push({DESCRIPTION:value.VAR,VALUE_CHAR:value.COD_VAR})
		}
	})
	var aux = "<option value=''>Seleccione</option>";
	var cont = 0;
	$.each(VarOp,function(k,v){
		if(arrPrd.indexOf(v.DESCRIPTION) == -1){
			aux +=  "<option value='"+v.DESCRIPTION+"'>"+v.DESCRIPTION+"</option>";
			arrPrd.push(v.DESCRIPTION);
			cont++;
		}
	})
	if(cont==0){
		var aux = "<option value=''>Sin Variedad</option>";
	}
	$("#VarTest").prop("disabled", false);
	$('#varLoading').hide();
	$('#VarTest').html(aux);
		
	return aux; 
}
function fechas(){
	var fecha = document.getElementsByName("fecha");
	for(var i = 0; i < fecha.length; i++){
		$(fecha[i]).attr("placeholder", "dd-mm-aaaa")
		$(fecha[i]).datepicker({
		    format: 'dd/mm/yyyy',
		    autoclose: true
		});
		$(fecha[i]).on("change", function(e){
			var f = e.target.value.split("/");
			if(f[1] != undefined && f[2] != undefined){
				e.target.value = f[1]+"-"+f[0]+"-"+f[2];
			}
		})
	}
}
var confirmar = function popUpQuestion(){}
confirmar.confirm = function(text, options){
	var html = "<h4>"+text+"</h4>";
	var required;
	var submit;
	if(options){
		var labelR = "<h5 class='labelRe' id='labelRequired' style='color: #FF0000; display: none;font-weight: bold;'>Requerido</h5>";
		html += "<h5 style='text-align: center;font-weight: bold;'>"+options.title+"</h5>";
		if(options.required == true){
			required = "required";
			submit = "submit";
		}else{
			required = "";
			submit = "";
		}
		if(options.input == "textarea"){
			html += "<textarea id="+options.id+" class='form-control "+required+"'></textarea>";
			
		}else{
			html += "<input type="+options.input+" id="+options.id+" class='form-control "+required+"'>"
		}
		if(options.required){
			html += labelR;
		}
	}
	var modal2 = {};
	modal2.popUp = swal({
		title: "Confirmar",
		html: html,
		position: 'top',
		animation: false,
		customClass: 'animated fadeInDown',
		width: "500px",
		showCancelButton: true,
		cancelButtonColor: '#d33',
		confirmButtonClass: 'swal2-confirm swal2-styled '+submit+'',
		confirmButtonText: 'Aceptar',
		preConfirm: function(){
			if(options && options.required == true){
				if(!$("#"+options.id).val()){
					$("#labelRequired").show();
					return false;
				}
			}
		},
		confirmButtonColor: '#008000',
		cancelButtonText: 'Cancelar',
		focusCancel: true,
		showCloseButton: false,
		showConfirmButton: true,
		allowOutsideClick: false,
		allowEscapeKey: false,
//		customClass: "col-xs-12 col-sm-12 col-md-12 portlet light"
	});
	modal2.aceptar = swal.getConfirmButton();
	modal2.cancelar = swal.getCancelButton();
	return modal2;
}
confirmar.question = function(options){
	var modal2 = {};
	modal2.popUp = swal({
		title: "Corfirmar",
		html: "<h4>"+options.question+"</h4>",
		position: 'top',
		animation: false,
		customClass: 'animated fadeInDown',
		width: "500px",
		showCancelButton: true,
		confirmButtonText: options.btnGreen,
		confirmButtonClass: 'btn btn-circle blue btn-sm',
		cancelButtonText: options.btnRed,
		cancelButtonClass: 'btn btn-circle blue btn-sm',
		focusCancel: true,
		showCloseButton: false,
		showConfirmButton: true,
		allowOutsideClick: false,
		allowEscapeKey: false
	});
	modal2.btnGreen = swal.getConfirmButton();
	modal2.btnRed = swal.getCancelButton();
	return modal2;
}
function formatFecha(fecha){
	if(fecha == null) {
		return '';
	}
	fecha = fecha.split("-");
	fecha = fecha[2]+"-"+fecha[1]+"-"+fecha[0];
	return fecha;
}
function popUp(title, html, animation, width, showCloseButton){
	swal({
		position: 'center',
		title: title,
		html: html,
		animation: !animation,
		customClass: 'animated fadeInDown',
		width: width,
		showCloseButton: showCloseButton,
		showConfirmButton: false,
		focusConfirm: true,
		allowOutsideClick: false,
		allowEscapeKey: false,
		allowEnterKey: false
	});
	activateRequiredModal();
//	$(".swal2-header").draggable();
}
function activateRequiredModal(){
	$(".required-modal").keyup(function(){
		var content = $(this)[0].parentNode;
		if($(this).val()){
			for(var i = 0; i < content.childNodes.length; i++){
				if(content.childNodes[i].className == "labelRe"){
					content.removeChild(content.childNodes[i]);
				}
			}
		}
	})
	$(".required-modal").change(function(){
		var content = $(this)[0].parentNode;
		if($(this).val()){
			for(var i = 0; i < content.childNodes.length; i++){
				if(content.childNodes[i].className == "labelRe"){
					content.removeChild(content.childNodes[i]);
				}
			}
		}
	})
}
function closeModal(){
	swal.closeModal();
}
function alerta(html, body){
	var buton = [];
	if(!body){
		html = "<h4>"+html+"</h4>";
	}
	swal({
		title: "Alerta",
		html: html,
		position: 'top',
		animation: false,
		customClass: 'animated bounceIn',
		width: "500px",
		showCloseButton: false,
		showConfirmButton: true,
		focusConfirm: true,
		allowOutsideClick: false,
		allowEscapeKey: false
	});
	buton.aceptar = $(swal.getConfirmButton()).click(function(){});
	return buton;
}
function alerta2(html){
	var buton = [];
	html = "<h4>"+html+"</h4>";
	swal({
		title: "Alerta",
		html: html,
		position: 'top',
		animation: false,
		customClass: 'animated bounceIn',
		width: "500px",
		showCloseButton: false,
		showConfirmButton: true,
		focusConfirm: true,
		allowOutsideClick: false,
		allowEscapeKey: false
	});
	buton.aceptar = $(swal.getConfirmButton()).click(function(){});
	return buton;
}
function confirmar(text){
	text = "<h4>"+text+"</h4>";
	var modal2 = swal({
		title: "Corfirmar",
		html: text,
		position: 'top',
		animation: false,
		customClass: 'animated fadeInDown',
		width: "500px",
		showCancelButton: true,
		cancelButtonColor: '#d33',
		confirmButtonText: 'Aceptar',
		confirmButtonColor: '#008000',
		cancelButtonText: 'Cancelar',
		focusCancel: true,
		showCloseButton: false,
		showConfirmButton: true,
		allowOutsideClick: false,
		allowEscapeKey: false
	});
	var aceptar = $(".swal2-confirm.swal2-styled");
	return aceptar;
}
function notify(type, html){
	Command: toastr[type](html)
	toastr.options = {
		closeButton: false,
	  	debug: false,
	  	newestOnTop: true,
	  	progressBar: false,
	  	positionClass: "toast-top-right",
	  	preventDuplicates: false,
	  	showDuration: "300",
	  	hideDuration: "1000",
	  	timeOut: "3000",
	  	extendedTimeOut: "1000",
	  	showEasing: "swing",
	  	hideEasing: "linear",
	  	showMethod: "fadeIn",
	  	hideMethod: "fadeOut"
	}
}
function detalleNotificacion(v){
	var detalleNotificacion = "";
	detalleNotificacion +='<div class="table-responsive">';
	detalleNotificacion +=	'<table class="table table-striped table-condensed" id="tbl_colaboradores">';
	detalleNotificacion +=		'<thead style="text-align: center;">';
	detalleNotificacion +=			'<tr>';
	detalleNotificacion +=				'<th style="text-align: center;">Fecha</th>';
	detalleNotificacion +=				'<th style="text-align: center;">Solicitud</th>';
	detalleNotificacion +=				'<th style="text-align: center;">Programa Aplicacion</th>';
	detalleNotificacion +=				'<th style="text-align: center;">Estado Fenologico</th>';
	detalleNotificacion +=			'</tr>';
	detalleNotificacion +=		'</thead>';
	detalleNotificacion +=		'<tbody id="tblMaterial">';
	detalleNotificacion +=			"<td>"+v.fecha+"</td>";
	detalleNotificacion +=			"<td>"+v.control+"</td>";
	detalleNotificacion +=			"<td>"+v.programa_aplicacion+"</td>";
	detalleNotificacion +=			"<td>"+v.estado_fenologico+"</td>";
	detalleNotificacion +=		'</tbody>';
	detalleNotificacion +=	'</table>';
	detalleNotificacion +='</div>';

	detalleNotificacion +='<div class="table-responsive">';
	detalleNotificacion +=	'<table class="table table-striped table-condensed table-bordered" id="tbl_colaboradores">';
	detalleNotificacion +=		'<thead style="text-align: center;">';
	detalleNotificacion +=			'<tr>';
	detalleNotificacion +=				'<th style="text-align: center;">Material</th>';
	detalleNotificacion +=				'<th style="text-align: center;">Cantidad</th>';
	detalleNotificacion +=				'<th style="text-align: center;">Ingrediente Activo</th>';
	detalleNotificacion +=				'<th style="text-align: center;">Stock</th>';
	detalleNotificacion +=				'<th style="text-align: center;">Reservar Stock</th>';
	detalleNotificacion +=				'<th style="text-align: center;">Solicitud Material</th>';
	detalleNotificacion +=			'</tr>';
	detalleNotificacion +=		'</thead>';
	detalleNotificacion +=		'<tbody id="tblMaterial">';
	$.each(v.material, function(km, vm){
		detalleNotificacion +=		"<tr>";
		detalleNotificacion +=			"<td>"+vm.material+"</td>";
		detalleNotificacion +=			"<td>"+vm.cantidad+"</td>";
		detalleNotificacion +=			"<td>"+vm.dosis_ha+"</td>";
		detalleNotificacion +=			"<td>"+vm.stock+"</td>";
		detalleNotificacion +=			"<td><div class='btn btn-circle red btn-outline' onclick='confirmRechazar("+v.id_programa+");'> Reservar</div></td>";
		detalleNotificacion +=			"<td><div class='btn btn-circle red btn-outline' onclick='confirmRechazar("+v.id_programa+");'> Solicitar</div></td>";
		detalleNotificacion +=		"</tr>";
	})
	detalleNotificacion +=		"</tbody>";
	detalleNotificacion +=	"</table>";
	detalleNotificacion +="</div>";
	detalleNotificacion +='<div class="col-sm-12 col-md-12">';
	detalleNotificacion +=		"<div class='btn btn-circle blue btn-outline' id='reprogramar' onclick='javascript: reprogramar("+v.id_programa+");'><i class='fa fa-clock-o'></i> Reprogramar</div>";
	detalleNotificacion +=		"<div class='btn btn-circle red btn-outline' onclick='confirmRechazar("+v.id_programa+");'>Rechazar</div>";
	detalleNotificacion +=		'<div class="btn btn-circle green-dark btn-outline" onclick="javascript: hrefOrden('+v.id_programa+');"><i class="fa fa-clock-o"></i> Emitir Orden</div>';
	detalleNotificacion +='</div>';
	popUp("Detalle Orden", detalleNotificacion, true, "700px", true);
}
function reprogramar(id){
	$.each(auxDataFito, function(k,v){
		if(id == v.id_programa){
			var reprogramar = "";
			reprogramar +=	'<div class="col-xs-12 col-sm-12 col-md-12" style="margin-bottom: 10px;">';
			reprogramar +=		'<div class="col-xs-6 col-sm-6 col-md-6">';
			reprogramar +=			'<div class="col-xs-12 col-sm-12 col-md-12">';
			reprogramar +=				'<h4>Fecha</h4>';
			reprogramar +=			'</div>';
			reprogramar +=			'<div class="col-xs-12 col-sm-12 col-md-12">';
			reprogramar +=				'<input size="16" type="text" class="form-control input-circle" id="fecha_RE'+v.fecha+'" value="'+v.fecha+'" name="fecha" readonly onchange="javascript: valFechaAlerta(this)">';
			reprogramar +=			'</div>';
			reprogramar +=		'</div>';
			reprogramar +=		'<div class="col-xs-6 col-sm-6 col-md-6">';
			reprogramar +=			'<div class="col-xs-12 col-sm-12 col-md-12">';
			reprogramar +=				'<h4>Fecha Alerta</h4>';
			reprogramar +=			'</div>';
			reprogramar +=			'<div class="col-xs-12 col-sm-12 col-md-12">';
			reprogramar +=				'<input size="16" type="text" class="form-control input-circle" id="fecha_RE'+v.fecha_alerta+'" value="'+v.fecha_alerta+'" name="fecha" readonly onchange="javascript: valFechaAlerta(this)">';
			reprogramar +=			'</div>';
			reprogramar +=		'</div>';
			reprogramar +=	'</div>';
			reprogramar +=	'<div ></div>';
			reprogramar +='<div class="col-sm-12 col-md-12">';
			reprogramar +=		"<div class='btn btn-circle blue btn-outline' id='reprogramar' onclick='javascript: saveReprogrmar("+v.id_programa+");'><i class='fa fa-clock-o'></i> Reprogramar</div>";
			reprogramar +=		"<div class='btn btn-circle red btn-outline' onclick='closeModal();'> Cancelar</div>";
			reprogramar +='</div>';
			popUp("Reprogramar Fechas", reprogramar, true, "400px", true);
			fechas();
		}
	})
}
function confirmRechazar(id){
	confirmar("¿Seguro que quiere rechazar esta Orden?");
	$(swal.getConfirmButton()).click(function(){
		// CODE FOR CONFIRM POPUP
	})
}
function getINFO(){
	var location = document.location.href;
	if(location.indexOf('?')>0){
		var getString = location.split('?')[1];
		var GET = getString.split('&');
		var get = {};
		
		for(var i = 0, l = GET.length; i < l; i++){
			var tmp = GET[i].split('=');
            get[tmp[0]] = unescape(decodeURI(tmp[1]));
		}
		return get;
	}
}
function parseFolio(value){
    var res="";
    if(!isNaN(parseInt(value))){
         res = ("0000000000" + value).slice (-10);
    }else{
        res = false;
    }
    return res;
}
function parseVeinte(value){
    var res="";
    if(!isNaN(parseInt(value))){
         res = ("00000000000000000000" + value).slice (-20);
    }else{
        res = false;
    }
    return res;
}
function validateModal(){
	var validate = true;
	$(".labelRe").each(function(){
		$(this).remove();
	})
	requerido = $(".required-modal");
	requerido.each(function(){
		var content = $(this)[0].parentNode;
		if(!$(this).val()){
			for(var i = 0; i < content.childNodes.length; i++){
				if(content.childNodes[i].className == "labelRe"){
					content.removeChild(content.childNodes[i]);
				}
			}
			var label = "<h5 class='labelRe' style='color: #FF0000;'>Requerido</h5>";
			$(content).append(label);
			validate = false;
		}else{
			for(var i = 0; i < content.childNodes.length; i++){
				if(content.childNodes[i].className == "labelRe"){
					content.removeChild(content.childNodes[i]);
				}
			}
		}
	})
	return validate;
}
function parseNumericFloat(value){
	value = value.replace(".","");
	value = value.replace(",",".");
	return parseFloat(value);
}