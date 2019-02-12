$(document).ready(function(){
	$.fn.dataTable.ext.errMode = 'none';
	filtros();
	$('#Table_CajaEspecie').DataTable({
		"sPaginationType" : "full_numbers",
		"filter": false
	});
	add();
	$("#loading").hide();
});  
var tabla = $("#Div_CajaEspecie").html();

var DotacionDiaria;
var exportTabla = [];

function loadInfo() {
	$("#BodyCajaEspecie").html("");
	
		var row = {};
		row.codigo_campo = $('#BoxCampo').val();
		 
		console.log(row)
	 	$.ajax({
			type : "GET",
			async : false,
			url : "/simpleWeb/json/AGRO/Get_CampoEspecie/",
			async: false,
			type : "GET",
			success: function(data){
				calificacion = data;
				console.log(data)
			
				$("#Div_CajaEspecie").html("");
				$("#Div_CajaEspecie").html(tabla);
//				var existeRegistro = true;
				
				$.each(data, function(k, v) {
//					existeRegistro = false;
					
					if($('#BoxCampo').val()==v.codigo_campo){
						
						var dotacion = "";			
						dotacion += "<tr>";
						dotacion += "<td>" + v.codigo_especie + "</td>";
	//					dotacion += "<td>" + v.descripcion + "</td>";
						dotacion += "</tr>";
						$('#BodyCajaEspecie').append(dotacion);
					}
				})
				$('#Table_CajaEspecie').DataTable({
					"sPaginationType" : "full_numbers",
				});
					add();
//				if(existeRegistro){
//					alerta("El registro que busca no existe");
//				}	
			}

		})
	
}
	
function filtros(){
	var selectCampo = "<option value=''></option>";
	$.each(SESION.campo, function(ks,va){
		selectCampo += "<option value='"+va.campo+"'>"+va.descripcion+"</option>";
	})
	$("#BoxCampo").append(selectCampo);
}

$("#BoxCampo").change(function() {
	loadInfo();
});

function add(){
	var object1 = document.getElementById('Table_CajaEspecie_paginate');
	object1.style.float = "right";
}