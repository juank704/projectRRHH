$(document).ready(function(){
	onLoad();
	loadSelect();
});
var aux = [];
var idTRab;
var nameTrab;
var unidad;
var dataHuerto;
function seCodigo(e){
	tecla = (document.all) ? e.keyCode : e.which;
	if (tecla==13){
		if(!$("#cod").val()){
			return false;
		}else{
			var cod = $("#cod").val();
			$("#tdCod").html(cod);
			$("#tblHide").show();
		}
	}
}
function onLoad(){
	$.getJSON("/simpleWeb/json/map/loadPersonal/", function(data){
		datos = data;
		$.each(data, function(k, v){
			aux.push(v.nombre);
		})
		$("#bus_trab").autocomplete({
			source: aux,
			select: function(a, b){
				var bodyLaboresTrab = "";
				$.each(data, function(k,v){
					if(v.nombre == b.item.value){
						idTRab = v.id;
						nameTrab = v.nombre;
						$("#tblHide").show();
						$("#tdCod").html(v.codigo);
						$("#tdRut").html(v.rut);
						$("#tdCNombre").html(v.nombre);
					}
				})
			}
		}).dblclick(function(){
			$(this).autocomplete("search", " ");
		});
	})
}
function actSelect(){
	var sAct = $("#sAct").val();
	if(sAct == "Zanja"){
		$("#medidaDiv").show();
		$("#medida").html("Metros");
		unidad = "Metros";
	}else if(sAct == "Cosecha"){
		$("#medidaDiv").show();
		$("#medida").html("KG");
		unidad = "Kilos";
	}else if(sAct == "Poda"){
		$("#medidaDiv").show();
		$("#medida").html("Cantidad");
		unidad = "Cantidad";
	}else{
		$("#medidaDiv").hide();
		$("#medida").html("");
	}
}
function loadSelect(){
	dataHuerto = JSON.parse(localStorage.getItem("dataHuerto"));
	console.log(dataHuerto);
	$('#selCoordenadas').html("");
	$('#selCoordenadas').append("<option value=''>Seleccione Campo</option>");
	$.each( dataHuerto, function( key, val ) {
		cadena = "";
		cadena = "<option value="+val.idtest+">"+val.valor1+"</option>";
		$('#selCoordenadas').append(cadena);
	});
}
function addAct(){
	var validate = true;
  	var labores = document.getElementsByName("labores");
  	for(var i = 0; i < labores.length;i++){
  		if(!$(labores[i]).val()){
  			$(labores[i]).focus();
  			validate = false;
  			return;
  		}
  	}
  	if(validate){
  		var row = {
  			id_campo: $('#selCoordenadas').val(),
  			id_trabajador: idTRab,
  			actividad: $("#sAct").val(),
  			cantidad: $("#inputMedida").val(),
  			fecha: $("#fecha_labor").val(),
  			unidad: unidad,
  			observaciones: $("#observaciones").val()
  		}
  		$.ajax({
  			url : "/simpleWeb/json/map/addLabores/",
  			type : "PUT",
  			data : JSON.stringify(row),
  			beforeSend : function(xhr) {
  				xhr.setRequestHeader("Accept","application/json");
  				xhr.setRequestHeader("Content-Type","application/json");
  			},
  			success : function(data, textStatus, jqXHR) {
  				for(var i = 0; i < labores.length; i++){
  					$(labores[i]).val("");
  				}
  				alert("Labores asignadas a "+nameTrab+"")
  			},
  			error : function(ex) {
  				console.log(ex);
  			}
  		
  		})
  	}
}