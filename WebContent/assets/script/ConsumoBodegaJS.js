$(document).ready(function(){
	getData();
	loadWorker();
});
var plus = 1;
var kilos = "<option value=''>Seleccione...</option>";
var id_incidencia;
var datos;
var checkValue;
var datosMaterial;

var se1 = "<option value=''>Seleccione</option>";
function radioCheck(radio){
	if(radio.value == "si"){
		$("#con_bod_div").show();
		$.getJSON("/simpleWeb/json/map/loadMaterial/", function(data){
			console.log(data);
			datosMaterial = data;
			$.each(data, function(k,v){
				se1 += "<option value='"+v.id_material+"'>"+v.nombre_material+"</option>";
			})
			$("#se1").append(se1);
		})
		checkValue = "si";
	}else if(radio.value == "no"){
		$("#con_bod_div").hide();
		checkValue = "no";
	}
}
function loadWorker(){
	$.getJSON("/simpleWeb/json/map/innerPersonal/", function(data){
		datos = data;
		var selectTrabajador = "<option value=''>Seleccionar Trabajador</option>;"
		$.each(data, function(k, v){
			selectTrabajador += "<option value="+v.id+">"+v.nombre+" - "+v.aefc_seg_accidentes+"</option>";
		})
		$("#selectResponsable").append(selectTrabajador);
		$("#loading").hide();
	})
};
function addMaterial(){
	var location = document.location.href;
	plus = plus + 1;
	var mat = "<div class='col-xs-12 col-sm-12 col-md-12' id='mat"+plus+"'>" +
				"<select name='p_bodega' id='se"+plus+"' onchange='javascript: chaMat("+plus+");' class='btn blue btn-outline btn-circle btn-sm'>" +
				"</select>" +
			"</div>";
	var cant = "<div class='col-xs-12 col-sm-12 col-md-12'>" +
				"<select name='p_bodega' id='cant"+plus+"' class='btn blue btn-outline btn-circle btn-sm'>" +
					"<option value=''>Seleccione...</option>" +
					"<option value='1'>1</option>" +
					"<option value='2'>2</option>" +
					"<option value='3'>3</option>" +
					"<option value='4'>4</option>" +
					"<option value='5'>5</option>" +
					"<option value='6'>6</option>" +
				"</select>" +
				"<label id='tMaterialInfo"+plus+"'></label>" +
				"<label>" +
					"<a id='"+plus+"' title='Descartar Material' onclick='javascript: desMat(this.id);'> " +
						"<i class='fa fa-times'></i>" +
					"</a>" +
				"</label>" +
			"</div>";
	$("#cant_Div").append(cant);
	$("#mat_Div").append(mat);
	var select = document.getElementById("se"+plus);
	$("#"+select.id).append(se1);
}
function addConsumoBodega(){
	var validate = true;
	var p_bodega;
	var c_bodega = document.getElementsByName("c_bodega");
	if(checkValue == "si"){
		p_bodega = document.getElementsByName("p_bodega");
		for(var i = 0; i < p_bodega.length;i++){
			if($(p_bodega[i]).val() == ""){
				$(p_bodega[i]).focus();
				validate = false;
				return;
			}
		}
	}
	for(var i = 0; i < c_bodega.length;i++){
		if($(c_bodega[i]).val() == ""){
			$(c_bodega[i]).focus();
			validate = false;
			return;
		}
	}
	if(validate){
		var jsonAsign = [];
		var row;
		for(var i = 1; i <= plus;i++){
			row = {};
			var select = document.getElementById("se"+i);
			row.id_trabajador = $("#selectResponsable").val();
			row.id_incidencia = id_incidencia;
			row.fecha = $("#fechaAsignacion").val();
			row.descripcion = $("#descripcion").val();
			row.id_material = $("#"+select.id).val();
			row.cantidad = $("#cant"+i).val();
			row.unidad = $("#tMaterialInfo"+i).html();
			jsonAsign.push(row);
		}
		$.ajax({
			url : "/simpleWeb/json/map/AsignarIncidencia/",
			type : "PUT",
			data : JSON.stringify(jsonAsign),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept","application/json");
				xhr.setRequestHeader("Content-Type","application/json");
			},
			success : function(data, textStatus, jqXHR) {
				alert("Incidencia Asiganda correctamente");
			},
			error : function(ex) {
				console.log(es);
			}
		});
	}
}
function chaMat(id){
	console.log(id);
	if($("#se"+id).val() == 1){
		$("#tMaterialInfo"+id).html("Kilos")
	}else if($("#se"+id).val() == 2){
		$("#tMaterialInfo"+id).html("Metros")
	}else if($("#se"+id).val() == 3){
		$("#tMaterialInfo"+id).html("Kilos")
	}
}
$("#sMaterial").change(function(){
	if($("#sMaterial").val() == 1){
		$("#tMaterialInfo").html("Kilos");
	}else if($("#sMaterial").val() == 2){
		$("#tMaterialInfo").html("Metros");
	}else if($("#sMaterial").val() == 3){
		$("#tMaterialInfo").html("Kilos");
	}else if($("#sMaterial").val() == 4){
		$("#tMaterialInfo").html("Kilos");
	}else if($("#sMaterial").val() == ""){
		$("#tMaterialInfo").html("");
	}
});
function desMat(id){
	plus--;
	$("#mat"+id).html("");
	$("#cant"+id).html("");
}
function getData(){
	var location = document.location.href;
	if(location.indexOf('?')>0){
		var getString = location.split('?')[1];
		var GET = getString.replace('%20', ' ');
		$("#campo").html(GET);
		id_incidencia = GET;
	}
}