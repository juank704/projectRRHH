var arrayCampo;
$(document).ready(function() {

	$('#loading').hide();
	$('.form-control.input-sm').select2({
		multiple: false,
		placeholder: "Seleccione"
	});
});

function getHuertos(){
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
getHuertos();


$.each(arrayCampo, function(k, v){
	var tb = "";
	tb += '<tr>';
	tb += '<td class="ListCampo" id="'+v.codigo+'">'+v.descripcion+'</td>';
	tb += '<td><select id="sub'+v.codigo+'" class="form-control input-sm">';
	if(v.subsidio == 1){
		tb += '<option value="1" selected>Diario</option>';
		tb += '<option value="2">Mensual</option>';
	} else {
		tb += '<option value="1" >Diario</option>';
		tb += '<option value="2" selected>Mensual</option>';
	}
	tb += '</select></td>';
	tb += '</tr>';
	$('#tbl_sub').append(tb);
});

function Consulta(ListCodigo) {
//	console.log("Entró")
	console.log(ListCodigo)
	for(var i = 0; i < ListCodigo.length; i++){
//		console.log(i + ""+ "Esto es I")
			var valores = {
					codigo : ListCodigo[i].id,
					subsidio: $("#sub"+ListCodigo[i].id).val()
			}
		console.log(valores + "" + "VALORES")
			$.ajax({
				url : "/simpleWeb/json/AGRO/UP_SUBSIDIO_CUARTEL/",
				async: false,
				type : "PUT",
				data : JSON.stringify(valores),
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");

			}
		})
	}

	alerta("Guardado Exitosamente");
}

function Guardar(codigo){

	var arrayCampo = [];
	$('.ListCampo').each(function(index,element){

			var arrayC = {};
			var id = element.id;
			arrayC.id= id;
			arrayC.subsidio = $('#sub'+id).val();
			arrayCampo.push(arrayC);
			console.log("llega");
		
	});

	console.log(arrayCampo);
	Consulta(arrayCampo);
	
	
	
}


