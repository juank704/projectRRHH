$(document).ready(function() {
	$('#loading').hide();
	getCampos();
	SetValor();
	getEspecie();
});

var arrayFormAplic;
var SESION = getVars();
var CUARTEL = getCuartel();

function BuscarCalificacion(codigo){
	if (!$("#BoxCampo").val()){
		alerta("Seleccione un Campo")
		return;
	}else if(!$("#BoxFaena").val()){
		alerta("Seleccione una Faena")
		return;
	}else if (!$("#BoxLabor").val()){
		alerta("Debe seleccionar una Labor");
	}else{	
		var row = {};
		row.campo = $('#BoxCampo').val();
		row.labor = $('#BoxLabor').val();
		
		var campo;
		$.ajax({
			url : "/simpleWeb/json/AGRO/GETCALIFICACION/",
			async: false,
			type : "GET",
			success: function(data){
				calificacion = data;
			}
		});
		var  noExiste = true;
		$.each(calificacion,function(key, value){console.log(value);
			if (value.codigo == codigo){
				$('#bajo_max').val(value.bajo_max);
				$('#promedio_min').val(value.bajo_max);
				$('#promedio_max').val(value.promedio_max);
				$('#bueno_min').val(value.promedio_max);
				$('#bueno_max').val(value.bueno_max);
				$('#destacado_min').val(value.bueno_max);
			}
		})	
	}
}

//Pongo a valor normal los TextBox
function SetValor (){
	$('#bajo_max').val(-10);
	$('#promedio_min').val(-10);
	$('#promedio_max').val(10);
	$('#bueno_min').val(10);
	$('#bueno_max').val(20);
	$('#destacado_min').val(20);
}



var arrayCampo;
function getCampos(){
	var campoSesion;
	$.ajax({
		url: "/simpleWeb/json/AGRO/GETCAMPO/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			$.each(data, function(ks,va){
				selectCampo += "<option value='"+va.campo+"'>"+va.descripcion+"</option>";
			})
			$("#BoxCampo").html(selectCampo);		
		}
	})
}

var selectCampo;



//Lleno Select de filtro Especie
var arrayEspecie;
function getEspecie(){
	var selectEspecie = "<option value=''>Seleccionar</option>";
	$.ajax({
		url: "/simpleWeb/json/AGRO/GETESPECIE/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			$.each(data, function(ks,va){
				selectEspecie += "<option value='"+va.codigo+"'>"+va.especie+"</option>";
			})		
		}
	})
	$("#BoxEspecie").html(selectEspecie);
}

var selectEspecie;




function Guardar() {
	if (!$("#BoxCampo").val()){
		alerta("Seleccione un Campo")
	}else if(!$("#BoxEspecie").val()){
		alerta("Seleccione una Especie")
	}else if (!$("#BoxFaena").val()){
		alerta("Seleccione una Faena")
	}else if (!$("#BoxLabor").val()){
		alerta("Debe seleccionar una Labor")
	}else{
		var descripc = {
				codigo : $("#BoxLabor").val(),
				campo : $("#BoxCampo").val(),
				bajo_max : $("#bajo_max").val(),
				promedio_max : $("#promedio_max").val(),
				bueno_max : $("#bueno_max").val(),
				labor : $("#BoxLabor").val(),
				especie : $("#BoxEspecie").val(),
				faena : $("#BoxFaena").val()
			}
			$.ajax({
				url : "/simpleWeb/json/AGRO/ADDCAMPO_LABOR/",
				type : "PUT",
				data : JSON.stringify(descripc),
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},success: function(){
					SetValor();
					$("#BoxLabor").append(selectCampo);
					alerta("Datos Guardados Satisfactoriamente");
					BuscarCalificacion($("#BoxLabor").val());
				}
			})
			$("#loading").hide();
		} 
}


var arrayCampo;
function getCampos1(){
	var campoSesion;
	$.ajax({
		url: "/simpleWeb/json/AGRO/GET_LABOR/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			arrayCampo = data;
		}
	})
	return campoSesion;
}
getCampos1();
var selectLabor;
//$.each(arrayCampo, function(ks,va){
//	selectLabor += "<option value='"+va.codigo+"'>"+va.labor+"</option>";
//})
//$("#BoxLabor").append(selectLabor);


var arrayFaena;
function getFaena(){
	var selectFaena = "<option value=''>Seleccionar</option>";
	var selectFaena;
	$.ajax({
		url: "/simpleWeb/json/AGRO/GETFAENA/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			$.each(data, function(ks,va){
				selectFaena += "<option value='"+va.codigo+"'>"+va.faena+"</option>";	
			})
		}
	})
	$("#BoxFaena").html(selectFaena);
}




$("#BoxLabor").change(function() {
	BuscarCalificacion($("#BoxLabor").val());
});

$("#bajo_max").change(function(){
	$("#promedio_min").val($(this).val());
});

$("#promedio_max").change(function(){
	$("#bueno_min").val($(this).val());
});

$("#bueno_max").change(function(){
	$("#destacado_min").val($(this).val());
});

//filtrar Especie por Campo y Variedad
function cambioCampo(campo){
	var especie_rendimiento;
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
		//$('#BoxEspecie').html(especie_rendimiento);
	})
	getEspecie();
}

//Cambio FAENA - LABOR
function CambioFaena(faena){
	var labor_rendimiento = "<option value=''>Seleccionar</option>";
	$.ajax({
		url : "/simpleWeb/json/AGRO/GET_LABOR_FAENA/"+faena,
		type : "GET",
		dataType : 'json',
		async : false,
		success : function(data) {
			$.each(data, function(k, v) {
				labor_rendimiento += "<option value="+v.codigo+">"+v.labor+"</option>";
			})
			$("#BoxLabor").html(labor_rendimiento);
		}
	})
}
function cambioEspecie(){
	getFaena();
}