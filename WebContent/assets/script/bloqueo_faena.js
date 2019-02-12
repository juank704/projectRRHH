$(document).ready(function() {
//	$.fn.dataTable.ext.errMode = 'none'; // para que no salga el mensaje de tabla repetida. 
	$('#loading').hide();
	bt_marcar_todo();
});

var arrayFormAplic;

function BuscarCalificacion(){
	desmarcar_check();
	
	if(!$("#BoxTemporada").val()){
		alerta("Seleccione Temporada")
		return;
	}else if (!$("#BoxCampo").val()){
		alerta("Debe seleccionar un Campo")
		return;
	}else if(!$("#BoxEspecie").val()){
		alerta("Seleccione Especie");
		return;
	}else if(!$("#BoxFaena").val()){
		alerta("Seleccione una Faena")
		return;
	}else{	
	var row = {};
	row.temporada = $('#BoxTemporada').val();
	row.campo = $('#BoxCampo').val();
	row.especie = $('#BoxEspecie').val();
	row.faena = $('#BoxFaena').val();
	$.ajax({
		url : "/simpleWeb/json/AGRO/GETBLOQUEO_LABOR_ID/",
		async: false,
		type : "GET",
		success: function(data){
			calificacion = data;
		}
	});
	$.each(calificacion,function(key, value){
if ($('#BoxTemporada').val()==value.temporada && $("#BoxCampo").val()==value.id_campo && $('#BoxEspecie').val()==value.id_especie && $('#BoxFaena').val()==value.id_faena){			
				if(value.enero == 1){
					$("#enero").prop("checked", true);
				}
				if(value.febrero == 1){ 
					$("#febrero").prop("checked", true);	
				}
				if(value.marzo == 1){
				 	$("#marzo").prop("checked", true);
				}
				if(value.abril == 1){
					$("#abril").prop("checked", true);
				}
				if(value.mayo == 1){
					$("#mayo").prop("checked", true);
				}
				if(value.junio == 1){
					$("#junio").prop("checked", true);
				}
				if(value.julio == 1){
				 $("#julio").prop("checked", true);
				}
				if(value.agosto == 1){
					$("#agosto").prop("checked", true);
				}
				if(value.septiembre == 1){
					$("#septiembre").prop("checked", true);
				}
				if(value.octubre == 1){
					$("#octubre").prop("checked", true);
				}
				if(value.noviembre == 1){
					$("#noviembre").prop("checked", true);
				}
				if( value.diciembre == 1){
					 $("#diciembre").prop("checked", true);
				}
				$("#enero").val(value.enero);
				$("#febrero").val(value.febrero);
				$("#marzo").val(value.marzo);
				$("#abril").val(value.abril);
				$("#mayo").val(value.mayo);
				$("#junio").val(value.junio);
				$("#julio").val(value.julio);
				$("#agosto").val(value.agosto);
				$("#septiembre").val(value.septiembre);
				$("#octubre").val(value.octubre);
				$("#noviembre").val(value.noviembre);
				$("#diciembre").val(value.diciembre);				
			return false;	
		}else{
			desmarcar_check();
			}
		})

	}
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
			arrayCampo = data;
		}
	})
	return campoSesion;
}
getCampos();
var selectCampo = "<option value=''>Seleccione</option>";
$.each(arrayCampo, function(ks,va){
	selectCampo += "<option value='"+va.campo+"'>"+va.descripcion+"</option>";
})
$("#BoxCampo").append(selectCampo)


function bt_marcar_todo(){
	$('#bt_desmarcar').show();
	$('#bt_marcar_todo').hide();	
	
	$('#enero').prop("checked", true).val(1)
	$('#febrero').prop("checked", true).val(1)
	$('#marzo').prop("checked", true).val(1)
	$('#abril').prop("checked", true).val(1)
	$('#mayo').prop("checked", true).val(1)
	$('#junio').prop("checked", true).val(1)
	$('#julio').prop("checked", true).val(1)
	$('#agosto').prop("checked", true).val(1)
	$('#septiembre').prop("checked", true).val(1)
	$('#octubre').prop("checked", true).val(1)
	$('#noviembre').prop("checked", true).val(1)
	$('#diciembre').prop("checked", true).val(1)
}


function bt_desmarcar(){
	$('#bt_marcar_todo').show();
	$('#bt_desmarcar').hide();
		
	$('#enero').prop("checked", false).val(0)
	$('#febrero').prop("checked", false).val(0)
	$('#marzo').prop("checked", false).val(0)
	$('#abril').prop("checked", false).val(0)
	$('#mayo').prop("checked", false).val(0)
	$('#junio').prop("checked", false).val(0)
	$('#julio').prop("checked", false).val(0)
	$('#agosto').prop("checked", false).val(0)
	$('#septiembre').prop("checked", false).val(0)
	$('#octubre').prop("checked", false).val(0)
	$('#noviembre').prop("checked", false).val(0)
	$('#diciembre').prop("checked", false).val(0)
}


function marcar_check(){
	$('#bt_desmarcar').show();
	$('#bt_marcar_todo').hide();	
	
	$('#enero').prop("checked", true).val(1)
	$('#febrero').prop("checked", true).val(1)
	$('#marzo').prop("checked", true).val(1)
	$('#abril').prop("checked", true).val(1)
	$('#mayo').prop("checked", true).val(1)
	$('#junio').prop("checked", true).val(1)
	$('#julio').prop("checked", true).val(1)
	$('#agosto').prop("checked", true).val(1)
	$('#septiembre').prop("checked", true).val(1)
	$('#octubre').prop("checked", true).val(1)
	$('#noviembre').prop("checked", true).val(1)
	$('#diciembre').prop("checked", true).val(1)
}


function desmarcar_check(){
	$('#bt_marcar_todo').show();
	$('#bt_desmarcar').hide();
		
	$('#enero').prop("checked", false).val(0)
	$('#febrero').prop("checked", false).val(0)
	$('#marzo').prop("checked", false).val(0)
	$('#abril').prop("checked", false).val(0)
	$('#mayo').prop("checked", false).val(0)
	$('#junio').prop("checked", false).val(0)
	$('#julio').prop("checked", false).val(0)
	$('#agosto').prop("checked", false).val(0)
	$('#septiembre').prop("checked", false).val(0)
	$('#octubre').prop("checked", false).val(0)
	$('#noviembre').prop("checked", false).val(0)
	$('#diciembre').prop("checked", false).val(0)
} 


function Guardar() {
	var especie;
	var faena;
	
	if(!$("#BoxTemporada").val()){
		alerta("Seleccione Temporada")
		return;
	}else if (!$("#BoxCampo").val()){
		alerta("Debe seleccionar un Campo")
		return;
	}else if(!$("#BoxEspecie").val()){
		alerta("Debe seleccionar una Especie")
		return;
	}else if (!$("#BoxFaena").val()){
		alerta("Debe seleccionar un tipo Faena")	
		return; 
	}else{
		
		for (var i = 0; i < $("#BoxEspecie").val().length; i++) {
			especie = $("#BoxEspecie").val()[i];
			for (var e = 0; e < $("#BoxFaena").val().length; e++) {
				faena = $("#BoxFaena").val()[e];
				 
					var descripc = {
//							codigo:codigo,
							id_campo : $("#BoxCampo").val(),
							id_faena : faena,
							id_especie : especie,
							temporada : $("#BoxTemporada").val(),
							enero : $("#enero").val(),
							febrero : $("#febrero").val(),
							marzo : $("#marzo").val(),
							abril : $("#abril").val(),
							mayo : $("#mayo").val(),
							junio : $("#junio").val(),
							julio : $("#julio").val(),
							agosto : $("#agosto").val(),
							septiembre : $("#septiembre").val(),
							octubre : $("#octubre").val(),
							noviembre : $("#noviembre").val(),
							diciembre : $("#diciembre").val(),			
					}
					console.log(descripc);
						$.ajax({
							type : "PUT",
							async : false,
							url : "/simpleWeb/json/AGRO/ADDBLOQUEO_LABOR/",
							data : JSON.stringify(descripc),
							beforeSend : function(xhr) {
								xhr.setRequestHeader("Accept", "application/json");
								xhr.setRequestHeader("Content-Type", "application/json");
							},
					});		
				}
			}
		alerta("Datos Guardados Satisfactoriamente");
		$("#loading").hide();
		bt_marcar_todo();
	}
}


var arrayFaena;
function getFaena(){
	var campoSesion;
	$.ajax({
		url: "/simpleWeb/json/AGRO/GETFAENA/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			arrayFaena = data;
		}
	})
	return campoSesion;
}
getFaena();
var selectFaena = "<option value=''>Seleccionar</option>";
$.each(arrayFaena, function(ks,va){
	selectFaena += "<option value='"+va.codigo+"'>"+va.faena+"</option>";	
})
$("#BoxFaena").append(selectFaena);


//Lleno Select de filtro Especie
var arrayEspecie;
function getEspecie() {
	var campoSesion;
	$.ajax({
		url : "/simpleWeb/json/AGRO/GETESPECIE/",
		type : "GET",
		dataType : 'json',
		async : false,
		success : function(data) {
			arrayEspecie = data;
		}
	})
	return campoSesion;
}
getEspecie();
var selectCampo = "<option value=''>Seleccione</option>";
$.each(arrayEspecie, function(ks, va) {
	selectCampo += "<option value='"+va.codigo+"'>"+va.especie+"</option>";
})
$("#BoxEspecie").append(selectCampo);



$('#BoxFaena').change(function(){
    //BuscarCalificacion();
});


$('#enero').change(function(){
    if($(this).prop('checked')){
         $(this).val('1');
    }else{
         $(this).val('0');
    }
});
$('#febrero').change(function(){
    if($(this).prop('checked')){
         $(this).val('1');
    }else{
         $(this).val('0');
    }
});
$('#marzo').change(function(){
    if($(this).prop('checked')){
         $(this).val('1');
    }else{
         $(this).val('0');
    }
});
$('#abril').change(function(){
    if($(this).prop('checked')){
         $(this).val('1');
    }else{
         $(this).val('0');
    }
});
$('#mayo').change(function(){
    if($(this).prop('checked')){
         $(this).val('1');
    }else{
         $(this).val('0');
    }
});
$('#junio').change(function(){
    if($(this).prop('checked')){
         $(this).val('1');
    }else{
         $(this).val('0');
    }
});
$('#julio').change(function(){
    if($(this).prop('checked')){
         $(this).val('1');
    }else{
         $(this).val('0');
    }
});
$('#agosto').change(function(){
    if($(this).prop('checked')){
         $(this).val('1');
    }else{
         $(this).val('0');
    }
});
$('#septiembre').change(function(){
    if($(this).prop('checked')){
         $(this).val('1');
    }else{
         $(this).val('0');
    }
});
$('#octubre').change(function(){
    if($(this).prop('checked')){
         $(this).val('1');
    }else{
         $(this).val('0');
    }
});
$('#noviembre').change(function(){
    if($(this).prop('checked')){
         $(this).val('1');
    }else{
         $(this).val('0');
    }
});
$('#diciembre').change(function(){
    if($(this).prop('checked')){
         $(this).val('1');
    }else{
         $(this).val('0');
    }
});


//filtrar Especie por Campo y Variedad
var SESION = getVars();
var CUARTEL = getCuartel();

function cambioCampo(campo){
	var especies = [];
	var especie_rendimiento = "<option value=''>Seleccione Especie</option>";
	$.each(CUARTEL, function(k,v){
		if(v.campo == campo){
			$.each(SESION.variedad, function(ka,va){
				if(va.codigo == v.variedad){
					$.each(SESION.especie, function(kb,vb){
						if(especies.indexOf(vb.codigo) == -1){
							if(va.especie == vb.codigo){
								especies.push(vb.codigo);
								especie_rendimiento += "<option value="+vb.codigo+">"+vb.especie+"</option>";
							}
						}
						
					})
				}
			})
		}
	})
	$('#BoxEspecie').html(especie_rendimiento);
}