
var dataTable = $('#tbl_Datos_Comunes').DataTable({
	dom: 'Bfrtip',
    buttons: [
        'excel', 'pdf'
    ],
	"sPaginationType": "full_numbers" ,
	"filter": false,
	//"ordering": true,
	 "order": [[ 0, "desc" ]]
	
});
$(document).ready(function(){
	loadTabla($("#dataHuerto").val());
//	setInterval(function(){ loadIncidencias() }, 15000);
})
var SESION = getVars();
var inci;
function loadIncidencias2(){
	console.log(SESION.incidencia)
	
}
var arrayCampo = [];
$.ajax({
	url: "/simpleWeb/json/AGRO/GETCAMPO/",
	type:	"GET",
	dataType: 'json',
	async: false,
	success: function(data){
		console.log(data);
		arrayCampo = data;
	}
})
var selectHuerto = "";
$.each(arrayCampo, function(ks,va){
	selectHuerto += "<option value='"+va.campo+"'>"+va.descripcion+"</option>";
})
$("#dataHuerto").append(selectHuerto);
var dataIncidencia = [];
$.ajax({
	url: "/simpleWeb/json/AGRO/GET_ALL_INCIDENCIA/",
	type:	"GET",
	dataType: 'json',
	async: false,
	success: function(data){
		dataIncidencia = data;
	}
})

$("#dataHuerto").change(function(){
	loadTabla($(this).val());
})

function loadTabla(campo){
	dataTable.clear().draw();
	var body_Incidencias = "";
	$.each(dataIncidencia, function(k, v) {
		if(campo == v.campo) {
			var boton = "<a class='btn btn-circle blue btn-outline' onclick='javascript: detalleIncidencia2("+v.codigo+");'><i class='icon-magnifier'></i>";
			var tbl = [v.ncampo,v.ncuartel,v.tipo_incidencia,formatFecha(v.fecha_ingreso),v.trabajador,v.observacion,boton]
			var rowNode = dataTable
		    .row.add( tbl )
		    .draw()
		    .node();
		}
			
	})
	$('#tbl_Datos_Comunes_paginate').css('text-align','center');
	
	//$("#body_Incidencias").html(body_Incidencias);
	loading.hide();
}
function detalleIncidencia2(codigo){
	$.ajax({
		url : "/simpleWeb/json/AGRO/DETALLE_INCIDENCIA_CODIGO/"+codigo,
		type : "GET",
		dataType : 'json',
		async : false,
		success : function(v) {
			console.log(v)
			var detalleNotificacion = "";
			detalleNotificacion +='<div class="table-responsive">';
			detalleNotificacion +=	'<table class="table table-striped table-condensed" id="tbl_colaboradores">';
			detalleNotificacion +=		'<thead style="text-align: center;">';
			detalleNotificacion +=			'<tr>';
			detalleNotificacion +=				'<th style="text-align: center;">Fecha Ingreso</th>';
			detalleNotificacion +=				'<th style="text-align: center;">Tipo Incidencia</th>';
			detalleNotificacion +=				'<th style="text-align: center;">Ingresado Por:</th>';
			detalleNotificacion +=				'<th style="text-align: center;">Cuartel</th>';
			detalleNotificacion +=				'<th style="text-align: center;">Onbservacion</th>';
			detalleNotificacion +=			'</tr>';
			detalleNotificacion +=		'</thead>';
			detalleNotificacion +=		'<tbody id="tblMaterial">';
			detalleNotificacion +=			"<td>"+v.fecha_ingreso+"</td>";
			detalleNotificacion +=			"<td>"+v.tipo_incidencia+"</td>";
			detalleNotificacion +=			"<td>"+v.trabajador+"</td>";
			detalleNotificacion +=			"<td>"+v.ncuartel+"</td>";
			detalleNotificacion +=			"<td>"+v.observacion+"</td>";
			detalleNotificacion +=		'</tbody>';
			detalleNotificacion +=	'</table>';
			detalleNotificacion +='</div>';

			detalleNotificacion +=	'<h4>Cerrar Incidencia</h4<';
			detalleNotificacion +='<div class="table-responsive">';
			detalleNotificacion +=	'<table class="table table-striped table-condensed table-bordered" id="tbl_colaboradores">';
			detalleNotificacion +=		'<thead style="text-align: center;">';
			detalleNotificacion +=			'<tr>';
			detalleNotificacion +=				'<th style="text-align: center;width:30%;">Accion</th>';
			detalleNotificacion +=				'<th style="text-align: center;width:70%">Onservacion</th>';
			detalleNotificacion +=			'</tr>';
			detalleNotificacion +=		'</thead>';
			detalleNotificacion +=		'<tbody id="tblMaterial">';
			detalleNotificacion +=		"<tr>";
			detalleNotificacion +=			"<td><select class='form-control input-sm' id='accion"+v.codigo+"'><option value=''>Seleccione</option><option value='1'>Aplicaiones</option><option value='2'>Rendimiento Diario</option><option value='3'>Riego</option></select></td>";
			detalleNotificacion +=			"<td><textarea class='form-control' id='obscierre"+v.codigo+"'></textarea></td>";
			detalleNotificacion +=		"</tr>";
			detalleNotificacion +=		"</tbody>";
			detalleNotificacion +=	"</table>";
			detalleNotificacion +="</div>";
			///simpleAgro/Incidencia/28-2018-8-2-20-1-53.jpg
			detalleNotificacion += '<div class="col-sm-12 col-md-12">';
			detalleNotificacion += '<img src="/simpleAgro/Incidencia/'+v.img+'" alt="Smiley face" height="300" width="300">';
			detalleNotificacion +='</div>';
			detalleNotificacion +='<div class="col-sm-12 col-md-12">';
			detalleNotificacion +=		"<div class='btn btn-circle blue btn-outline' id='reprogramar' onclick='cerrarIncidencia2("+v.codigo+");'><i class='fa fa-clock-o'></i> Cerrar Incidencia</div>";
//			detalleNotificacion +=		"<div class='btn btn-circle red btn-outline' onclick='confirmRechazar("+v.id_programa+");'>Rechazar</div>";
//			detalleNotificacion +=		'<div class="btn btn-circle green-dark btn-outline" onclick="javascript: hrefOrden('+v.id_programa+');"><i class="fa fa-clock-o"></i> Emitir Orden</div>';
			detalleNotificacion +='</div>';
			popUp("Detalle Incidencia", detalleNotificacion, true, "700px", true);
		}
	})
}
function cerrarIncidencia2(codigo){
	if(!$("#accion"+codigo).val()){
		alerta("Debe seleccionar una accion");
		return;
	}else if(!$("#obscierre"+codigo).val()){
		alerta("Debe especificar una observacion");
		return;
	}else{
		var row = {
				usuario_cierre: SESION.idUser,
				accion: $("#accion"+codigo).val(),
				observacion_cierre: $("#obscierre"+codigo).val(),
				fecha_cierre: dateHoy(),
				codigo: codigo
			}
			$.ajax({
				url : "/simpleWeb/json/AGRO/CERRAR_INCIDENCIA/",
				type : "PUT",
				data : JSON.stringify(row),
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Accept","application/json");
					xhr.setRequestHeader("Content-Type","application/json");
				},
				success : function(data, textStatus, jqXHR) {
					closeModal();
					$.each(SESION.incidencia, function(ka,va){
						if(va.codigo == codigo){
							SESION.incidencia.splice(ka, 1);
							inci.splice(ka, 1);
							return false;
						}
					})
					loadTabla(inci);
					loadIncidencias();
					alerta("Incidencia cerrada Correctamente");
				},
				error : function(jqXHR, textStatus, errorThrown) {
					swal({
						  title: "Error!",
						  text: "No se ha podido registrar la infomacion, consulte con el administrador del sistema",
						  type: "error",
						  confirmButtonText: "Aceptar"
					});
				}
			});
	}
}