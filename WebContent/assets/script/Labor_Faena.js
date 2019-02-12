var dataTable = $('#Table_LaborFaena').DataTable({
	sPaginationType: "full_numbers" ,
	filter: false
});
$(document).ready(function() {
	$.fn.dataTable.ext.errMode = 'none';
	loading.hide();
});
var arrayFormAplic;
var detalle_faena;
var count = 1;
var detalle;
var table;
var tablaLaborFaena = $("#Div_TableLaborFaena").html();
var cod_faena;
function loadFaenaZona($this){
	$.ajax({
		url: "/simpleWeb/json/AGRO/GET_FAENA_ZONA?ZONA="+$this.value,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			var faenas = "<option value=''></option>";
	        $.each(data, function(k, v) {
	        	faenas += "<option value='" + v.codigo + "'>" + v.faena+ "</option>";
	        });
	        if($this.id == "campo_rendimiento"){
	        	$('#filtroFaena').html(faenas);
	        }else{
	        	$('#faenaModal').html(faenas);
	        }
	    }
	})
}
function cambioFaena(faena){
	faena = $("#filtroFaena").val();
	if(faena){
		dataTable.clear().draw();
		$.ajax({
			url: "/simpleWeb/json/AGRO/GET_LABOR/"+faena,
			type:	"GET",
			dataType: 'json',
			async: false,
			success: function (data) { 
				console.log(data)
				detalle_faena = data;
				$.each(data,function(k, v) {
					var rebaja;
					var maquinaria;
					if(v.maquinaria == 0){
						maquinaria = "No Aplica";
					}else if(v.maquinaria == 1){
						maquinaria = "Si Aplica";
					}
					if(v.rebaja == 3){
						rebaja = "No Aplica";
					}else if (v.rebaja == 2){
						rebaja = "Plantas";
					}else if(v.rebaja == 1){
						rebaja = "Cajas/Bins";
					}
			
					var editar = "<div class='dropdown dropleft' style='float: left;'><button class='btn btn-circle yellow btn-outline btn-sm dropdown-toggle' title='Modificar' onclick='javascript: addModLabor("+JSON.stringify(v)+")' type='button' data-toggle='dropdown'><span class='fa fa-pencil-square-o fa-lg'></span></button>";
					var eliminar = "<div class='dropdown dropleft' style='float: left;'><button id='CambioEstado' class='btn btn-circle red btn-outline btn-sm dropdown-toggle' title='Eliminar' onclick='javascript: CambioEstado("+JSON.stringify(v)+")' type='button' data-toggle='dropdown'><span class='fa fa-trash fa-2x'></span></button>";
					var tbl = [v.labor, maquinaria, rebaja, editar, eliminar];
					var rowNode = dataTable.row.add(tbl).draw().node();
				})
		    }
		})
	}
}
function addModLabor(v){
	console.log(v)
	var descripcion = "";
	var titulo = "Registro de Labor";
	var id = 0;
	var faena = 0;
	var zona = "";
	var labor = "";
	var maq = 4;
	var rebaja = 4;
	if (v){
		id = v.codigo;
		faena = v.faena;
		zona = v.zona;
		labor = v.labor;
		maq = v.maquinaria;
		rebaja = v.rebaja;
		titulo = "Modificar Labor: "+labor;
	}
	var pop = "";
	pop = 	"<div class='col-xs-12 col-sm-12 col-md-12 portlet'>";
	pop += 		"<div class='col-xs-6 col-sm-6 col-md-6'>";
	pop += 			"<div class='col-xs-12 col-sm-12 col-md-12'>";
	pop += 				"<h5 style='color: #337ab7;font-weight: bold'>Zona</h5>";
	pop += 			"</div>";
	pop += 			"<div class='col-xs-12 col-sm-12 col-md-12 '>";
	pop += 				"<select type='text' class='form-control input-sm required-modal' id='zona' onchange='loadFaenaZona(this)'>";
	pop += 					"<option value=''></option>";
	pop += 					"<option value='Norte'>Norte</option>";
	pop += 					"<option value='Sur'>Sur</option>";
	pop += 				"</select>";
	pop += 			"</div>";
	pop += 		"</div>";
	pop += 		"<div class='col-xs-6 col-sm-6 col-md-6'>";
	pop += 			"<div class='col-xs-12 col-sm-12 col-md-12'>";
	pop += 				"<h5 style='color: #337ab7;font-weight: bold'>Faena</h5>";
	pop += 			"</div>";
	pop += 			"<div class='col-xs-12 col-sm-12 col-md-12'>";
	pop += 				"<select type='text' class='form-control input-sm required-modal' id='faenaModal'></select>";
	pop += 			"</div>";
	pop += 		"</div>";
	pop += 		"<div class='col-xs-6 col-sm-6 col-md-6'>";
	pop += 			"<div class='col-xs-12 col-sm-12 col-md-12'>";
	pop += 				"<h5 style='color: #337ab7;font-weight: bold'>Nombre Labor</h5>";
	pop += 			"</div>";
	pop += 			"<div class='col-xs-12 col-sm-12 col-md-12 '>";
	pop += 				"<input type='text' class='form-control required-modal' id='newLabor'>";
	pop += 			"</div>";
	pop += 		"</div>";
	pop += 		"<div class='col-xs-6 col-sm-6 col-md-6'>";
	pop += 			"<div class='col-xs-12 col-sm-12 col-md-12'>";
	pop += 				"<h5 style='color: #337ab7;font-weight: bold'>Maquinaria</h5>";
	pop += 			"</div>";
	pop += 			"<div class='col-xs-12 col-sm-12 col-md-12'>";
	pop += 				"<select type='text' class='form-control input-sm required-modal' id='maqModal'>";
	pop += 					"<option value=''></option>";
	pop += 					"<option value='1'>Si</option>";
	pop += 					"<option value='0'>No</option>";
	pop += 				"</select>";
	pop += 			"</div>";
	pop += 		"</div>";
	pop += 		"<div class='col-xs-6 col-sm-6 col-md-6'>";
	pop += 			"<div class='col-xs-12 col-sm-12 col-md-12'>";
	pop += 				"<h5 style='color: #337ab7;font-weight: bold'>Tipo de Rebaja</h5>";
	pop += 			"</div>";
	pop += 			"<div class='col-xs-12 col-sm-12 col-md-12'>";
	pop += 				"<select type='text' class='form-control input-sm required-modal' id='rebajaModal'>";
	pop += 					"<option value=''></option>";
	pop += 					"<option value='1'>Cajas/Bins</option>";
	pop += 					"<option value='2'>Plantas</option>";
	pop += 					"<option value='3'>No</option>";
	pop += 				"</select>";
	pop += 			"</div>";
	pop += 		"</div>";
	pop += 	"</div>";
	pop += 	"<div style='text-align: center;'>";
	pop += 		"<a class='btn green-dark submit-modal' onclick='guardarLabor("+id+")'> Guardar</a>";
	pop += 		"<a class='btn red' onclick='closeModal()'>Cancelar</a>";
	pop += 	"</div>";
	popUp(titulo, pop, true, "600px", true);
	selectCss();
	if(id != 0){
		$("#zona").attr("disabled", true);
		$("#faenaModal").attr("disabled", true);
	}
	$("#zona").val(zona).trigger("change");
	$("#faenaModal").val(faena);
	$("#newLabor").val(labor);
	$("#maqModal").val(maq).trigger("change");
	$("#rebajaModal").val(rebaja).trigger("change");
}
function guardarLabor(id){
	console.log(id)
	if(validateModal()){
		var json = {
			faena: $("#faenaModal").val(),
			labor: $("#newLabor").val(),
			maquinaria: $("#maqModal").val(),
			rebaja: $("#rebajaModal").val(),
			zona: $("#zona").val()
		}
		var url = "/simpleWeb/json/AGRO/ADD_LABOR/"
		if(id != 0){
			json.codigo = id;
			url = "/simpleWeb/json/AGRO/UPDATE_LABOR/"; 
		}
		$.ajax({
			url : url,
			type : "PUT",
			data : JSON.stringify(json),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},success: function(){
				closeModal();
				alerta("Registrado Correctamente");
				cambioFaena();
			}
		})
	}
}
function CambioEstado(codigo){
	var c = confirmar.confirm("¿Estas seguro de eliminar esta Labor?")
	$(c.aceptar).click(function(){
		var newAplicaciones = {
				codigo : codigo
			}
			console.log(newAplicaciones)
			$.ajax({
				type: "PUT",
				async: false,
				url: "/simpleWeb/json/AGRO/UP_LABOR_FAENA_ESTADO/",
				data: JSON.stringify(newAplicaciones),
				beforeSend : function(xhr){
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},success: function(){
					alerta("Estado se eliminó");
				},
			});
		loadInfo();
	})
}