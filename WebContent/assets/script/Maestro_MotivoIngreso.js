var dataTable = $('#Table_Maestro').DataTable({
	"sPaginationType": "full_numbers" ,
	"filter": false
	
});
$(document).ready(function() {
	$.fn.dataTable.ext.errMode = 'none';
	loadInfo();
});

var ArrayMaestro;
var detalleMaestroIngreso;
var count = 1;
var table;
var tablaMotivoIngreso = $("#Div_TableMaestroMotivo").html();

//function LimpiarTabla() {
//	$("#Div_TableMaestroMotivo").html("");
//	$("#Div_TableMaestroMotivo").html(tablaMotivoIngreso);
//	$('#BodyMaestro').html("");
//}

function loadInfo(){
	dataTable.clear().draw();
	var tbl = "";
	loading.show();
	$.getJSON("/simpleWeb/json/AGRO/Get_MaestroIngreso/", function(data) {
		detalleMaestroIngreso = data;
		$.each(data,function(k, v){
//			tbl += "<tr>";
//			tbl += 		"<td>" + v.descripcion + "</td>";
//			tbl +=		"<td><div class='dropdown dropleft' style='float: left;'>";
//			tbl +=			"<button class='btn btn-circle yellow btn-outline btn-sm dropdown-toggle' title='Modificar' onclick='javascript: addformAp("+ v.codigo+ ")' type='button' data-toggle='dropdown'>";
//			tbl +=			"<span class='fa fa-pencil-square-o fa-lg'></span></button></div>";
//			tbl +=		"<td><div class='dropdown dropleft' style='float: left;'>";
//			tbl +=			"<button id='CambioEstado' class='btn btn-circle red btn-outline btn-sm dropdown-toggle' title='Eliminar' onclick='javascript: CambioEstado("+ v.codigo+ ")' type='button' data-toggle='dropdown'>";
//			tbl +=			"<i class='fa fa-trash fa-2x'></i></button></td>";
//			tbl += 		"</td>";
//			tbl += "</tr>";			
//		});
//		$('#BodyMaestro').html(tbl);
			var editar = "<div class='dropdown dropleft' style='float: left;'><button class='btn btn-circle yellow btn-outline btn-sm dropdown-toggle' title='Modificar' onclick='javascript: addFormAP("+v.codigo+")' type='button' data-toggle='dropdown'><span class='fa fa-pencil-square-o fa-lg'></span></button>";
			var eliminar = "<div class='dropdown dropleft' style='float: left;'><button id='CambioEstado' class='btn btn-circle red btn-outline btn-sm dropdown-toggle' title='Eliminar' onclick='javascript: CambioEstado("+v.codigo+")' type='button' data-toggle='dropdown'><span class='fa fa-trash fa-2x'></span></button>";
			var tbl = [v.descripcion, editar, eliminar];
			var rowNode = dataTable
		    .row.add( tbl )
		    .draw()
		    .node();
		})
		loading.hide();
	});	
}

function ingresarRegistro(){
	if(!$('#BoxDescripcion').val()){
		alerta("Ingrese una Descripción");
	}else{
		dato={
				descripcion:$('#BoxDescripcion').val()
		}
		console.log(dato)
		$.ajax({
			url:"/simpleWeb/json/AGRO/ADD_MaestroIngreso/",
			type:"PUT",
			data : JSON.stringify(dato),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},success:function(){
				closeModal();
//				LimpiarTabla();
//				$('#BodyMaestro').html("");
				alerta("Registrado Correctamente");
				loadInfo();
			}
		})
	}
}


function getMaestro(){
	var Maestro;
	$.ajax({
		url: "/simpleWeb/json/AGRO/Get_MaestroIngreso/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			ArrayMaestro = data;
		}
	})
	return Maestro;
}
getMaestro();
var selectMaestro = "<option value='0'>Todos</option>";
$.each(ArrayMaestro, function(ks,va){
	selectMaestro += "<option value='"+va.codigo+"'>"+va.descripcion+"</option>";
})
$("#BoxMaestro").append(selectMaestro);


function updateRegistro(codigo){
//	LimpiarTabla();
		var dato = {
			codigo : codigo,
			descripcion:$('#BoxDescripcion'+codigo).val()
		}
		console.log(dato)
		$.ajax({
			url : "/simpleWeb/json/AGRO/UP_MaestroMotivoIngreso/",
			type : "PUT",
			data : JSON.stringify(dato),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},success: function(data){
				closeModal();
//				LimpiarTabla();
//				$('#BodyMaestro').html("");
				loadInfo();
				var a = alerta("Modificado Correctamente");
				$(a.aceptar).click(function(){
				})
			}
		})
}


function addformAp(codigo){
	var descripcion = "";
	var titulo = "Registrar";
	var boton;
	if (!codigo) {
		codigo = "";
		boton = '<div class="btn btn-circle blue btn-outline" id="ingresarRegistro"  onclick="ingresarRegistro()" >Registrar</div>';
	} else {
		titulo = "Modificar";
		boton = '<div class="btn btn-circle blue btn-outline" id="ingresarRegistro"  onclick="updateRegistro('+codigo+')">Actualizar</div>'
		$.each(detalleMaestroIngreso, function(ka, va) {
			if (codigo == va.codigo) {
				descripcion = va.descripcion
			}
		})
	}
	  var html = 
		  '<div class="col-xs-12 col-md-12 col-lg-12" id="formProductor">'
		+ '<div class="box-datos-generales" style="width: 100%">'
		+ '<div class="col-xs-12 col-md-12 col-lg-12">'

		+ '<div class="col-xs-12 col-md-12 col-lg-12 portlet light bordered">'
		+ '<h4>Maestro Motivo Ingreso</h4>'
		+ '<input type="text" id="BoxDescripcion'+codigo+'" class="form-control" value="'+descripcion+'" placeholder="Ingrese Maestro Motivo">'
		+'<input type="hidden" id="codigoEdit" value="'+ codigo+ '">'
		+ '</div>'
		+ '</div>'
		+ '</div>' 
		+ '<div class="col-xs-12 col-md-12 col-lg-12 portled">'+boton
		+ '<div class="btn btn-circle red btn-outline" id="cancelarFormaAp" onclick="closeModal();">Cancelar</div>'
		+ '</div>' + '</div>';
	  popUp(titulo, html, true, "400px", false);
}


function CambioEstado(codigo){
	var c = confirmar.confirm("¿Estás seguro?")
	$(c.aceptar).click(function(){
//	LimpiarTabla();
		var newAplicaciones = {
				codigo : codigo
			}
			$.ajax({
				type: "PUT",
				async: false,
				url: "/simpleWeb/json/AGRO/UP_MaestroMotivoIngreso_Estado/",
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

var s;
var table = [];
var detalle;
function filterTable(){
	table = [];
//	$('#BodyMaestro').html("");
	var descripcion = $("#BoxMaestro").val();
	if(!descripcion){
		descripcion=0
		}
	$.each(detalleMaestroIngreso, function(k,v){
		if(descripcion == 0){
			llenarTabla(v);
		}else{
			for(var i = 0; i < descripcion.length; i++){
				console.log("1")
				if(descripcion[i] != 0 && descripcion[i] == v.descripcion){
					console.log("llega")
					llenarTabla(v);
				}
			}
		}
	})
}

function llenarTabla(vr){
	dataTable.clear().draw();
//	$('#BodyMaestro').html("");			
		if(table.length != 0){
			$.each(table, function(ka,va){
				if(table.indexOf(vr)==-1){
					table.push(vr);
			}
		})
	}else{
		table.push(vr);
	}
	$.each(table, function(k,va){
		var tbl = "";
//		tbl += "<tr>";
//		tbl += 		"<td>" + va.descripcion + "</td>";
//		tbl +=		"<td><div class='dropdown dropleft' style='float: left;'>";
//		tbl +=			"<button class='btn btn-circle yellow btn-outline btn-sm dropdown-toggle' title='Modificar' onclick='javascript: addformAp("+ va.codigo+ ")' type='button' data-toggle='dropdown'>";
//		tbl +=			"<span class='fa fa-pencil-square-o fa-lg'></span></button></div>";
//		tbl +=		"<td><div class='dropdown dropleft' style='float: left;'>";
//		tbl +=			"<button id='CambioEstado' class='btn btn-circle red btn-outline btn-sm dropdown-toggle' title='Eliminar' onclick='javascript: CambioEstado("+ va.codigo+ ")' type='button' data-toggle='dropdown'>";
//		tbl +=			"<i class='fa fa-trash fa-2x'></i></button></td>";
//		tbl += 		"</td>";
//		tbl += "</tr>";
//		$('#BodyMaestro').append(tbl);
		var editar = "<div class='dropdown dropleft' style='float: left;'><button class='btn btn-circle yellow btn-outline btn-sm dropdown-toggle' title='Modificar' onclick='javascript: addFormAP("+v.codigo+")' type='button' data-toggle='dropdown'><span class='fa fa-pencil-square-o fa-lg'></span></button>";
		var eliminar = "<div class='dropdown dropleft' style='float: left;'><button id='CambioEstado' class='btn btn-circle red btn-outline btn-sm dropdown-toggle' title='Eliminar' onclick='javascript: CambioEstado("+v.codigo+")' type='button' data-toggle='dropdown'><span class='fa fa-trash fa-2x'></span></button>";
		var tbl = [v.descripcion, editar, eliminar];
		var rowNode = dataTable
	    .row.add( tbl )
	    .draw()
	    .node();
	})
}