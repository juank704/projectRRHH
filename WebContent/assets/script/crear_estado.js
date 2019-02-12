$(document).ready(function() {
	$('#loading').hide();
});

var Campo;
var calificacion;

function getCampo(){
	var campoSesion;
	$.ajax({
		url: "/simpleWeb/json/AGRO/GETCAMPO/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			Campo = data;
		}
	})
	return campoSesion;
}
getCampo();
var dato;
$.each(Campo, function(ks,va){
	dato += "<option value='"+va.campo+"'>"+va.descripcion+"</option>";
})
$("#BoxCampo").append(dato);



function Guardar(codigo){
	if (!$("#BoxCampo").val()){
		alerta("Seleccione un Campo")
		return;
	}else{
	var dato = {
			codigo : codigo,
			campo : $("#BoxCampo").val(),
			verde_hasta : $('#Verde').val(),
			amarillo_hasta : $('#Amarillo').val()
		}
	 console.log(dato)
		$.ajax({
			url : "/simpleWeb/json/AGRO/ADD_Calificacion_Estado/",
			type : "PUT",
			data : JSON.stringify(dato),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},success:function(){
				alerta("Datos Guardados Satisfactoriamente");
			}
		})
		ValorPredeterminado();
	}
}

$("#Verde").change(function(){
	$("#amarillo_desde").val($(this).val());
});
$("#Amarillo").change(function(){
	$("#rojo_desde").val($(this).val());
});

function ValorPredeterminado(){
	$('#Verde').val(60);
	$('#amarillo_desde').val(61);
	$('#Amarillo').val(90);
	$('#rojo_desde').val(91);	
}

function BuscarCalificacion(){
	var row = {};
	row.campo = $('#BoxCampo').val();	
	var campo;
	$.ajax({
		url : "/simpleWeb/json/AGRO/Get_CalificacionEstado/",
		async: false,
		type : "GET",
		success: function(data){
			calificacion = data;
		}
	});
	var  noExiste = true;
	$.each(calificacion,function(key, value){
		if ($("#BoxCampo").val()==value.campo){
			noExiste = false;
			var c = confirmar.confirm("Existen datos los quiere modificar?");
			$(c.cancelar).click(function(){
					ValorPredeterminado();
			});
			$(c.aceptar).click(function(){
				$('#Verde').val(value.verde_hasta);
				$('#Amarillo').val(value.amarillo_hasta);
				$('#amarillo_desde').val(value.verde_hasta);
				$('#rojo_desde').val(value.amarillo_hasta);
			})		
			return false;	
		}
	})	
	if(noExiste)
	{
		alerta("No existe ese Registro");
		ValorPredeterminado();
	}
  }


$("#BoxCampo").change(function() {
	BuscarCalificacion();
});