$(document).ready(function(){
	$.fn.dataTable.ext.errMode = 'none';
	$("#loading").hide();
	fechas();
});
var supervisores;
var tabla;
var detalle_horas;
var especie;
var variedad;
var CUARTEL = getCuartel();
var detalleCuartel;
function formatearDate(fecha){
	fechar = new Date(fecha);
	var yyyy = fechar.getFullYear();
	var mm = fechar.getMonth()+1;
	var dd = fechar.getDate();
	if(mm < 10){
		mm = "0"+mm;
	}
	if(dd < 10){
		dd = "0"+dd;
	}
	fechar = (yyyy+"-"+mm+"-"+dd);
	return fechar;
}
function loadInfo(codigo){
	if(!$('#fecha_desde').val() || !$('#fecha_hasta').val() || !$('#dataHuerto').val() || !$('#horas').val()){
		return;
	}else{
		var fecha_desde = new Date(formatFecha($('#fecha_desde').val()));
		var fecha_hasta = new Date(formatFecha($('#fecha_hasta').val()));
		
		var finicio = fecha_desde.getTime();
		var ffin = fecha_hasta.getTime();
		
		var diff = finicio - ffin;
		diff = (diff*-1)/(1000*60*60*24);
		var fechas = "";
		var c = 0;
		for(var i = 1; i <= diff+1; i++){
			fecha_desde.setDate(fecha_desde.getDate() + 1);
			if(c == 0){
				fechas += ""+formatearDate(fecha_desde);
			}else{
				fechas += ","+formatearDate(fecha_desde);
			}
			c++;
		}
		$("#loading").show();
		setTimeout(function(){ 
			
		$.ajax({
			url: "/simpleWeb/json/AGRO/GET_CUADRATURA_HORAS?CAMPO="+$('#dataHuerto').val()+"&FECHAS="+fechas+"&HORAS="+$('#horas').val(),
			type:	"GET",
			dataType: 'json',
			async: false,
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept","application/json");
				xhr.setRequestHeader("Content-Type","application/json");
			},
			success: function(data){
				console.log(datos)
				if(tabla){
					tabla.destroy();
			        $('#tbl_RendimientoVlidadr').empty(); 
				}
				var datos = [];
				$.each(data, function(k,v){
					datos.push([v.campo, formatFecha(v.fecha), v.codigo	, v.rut, v.nombre, v.horas, v.horasFalta, "<a class='btn blue' onclick='detalle("+JSON.stringify(v)+");'><i class='icon-magnifier'></i></a>"])
				})
				tabla = $('#tbl_RendimientoVlidadr').DataTable({
					dom: 'Bfrtip',
					data: datos,
					columns: [
					    { title: "Campo" },
					    { title: "Fecha" },   
					    { title: "Codigo Trabajador" },  
					    { title: "Rut Trabajador" },   
					    { title: "Nombre Trabajador	" },   
					    { title: "Horas Trabajadaa" },
					    { title: "Horas Falta" },     
					    { title: "Detalle" }      
					],
				    buttons: [
				        {  extend: 'excel',
				            text: 'Excel',
				            className: 'btn btn-success',
				            exportOptions: {
				                columns: [0,1,2,3,4,5,6]
				            }
				        }
				    ],
					autoWidth: true,
					ordering: false,
					fixedHeader: true
				});
				var tbl = "";
				$("#tbl_RendimientoVlidadr_filter").hide();

				$('#tbl_RendimientoVlidadr thead tr').clone(true).appendTo( '#tbl_RendimientoVlidadr thead' );
			    $('#tbl_RendimientoVlidadr thead tr:eq(1) th').each( function (i) {
			    	if($(this).text() != "" && $(this).text() != "Detalle"){
			    		var title = $(this).text();
			            $(this).html( '<input type="text" class="form-control input-sm" placeholder="'+title+'" />' );
			     
			            $( 'input', this ).on( 'keyup change', function () {
			                if ( tabla.column(i).search() !== this.value ) {
			                	tabla
			                        .column(i)
			                        .search( this.value )
			                        .draw();
			                }
			            } );
			    	}else{
			    		$(this).html("");
			    	}
			    } );
			}
		})	
		loading.hide();
		}, 50);
	}
}

function detalle(v){
	var nombre;
	var detalle = "";
	var row = {};
	row.fecha = v.fecha;
	row.horas = $('#horas').val();
	row.campo = $('#dataHuerto').val();
	row.rut   = v.rut;
	var detalle = "";
	detalle += 	"<div class='col-xs-12 col-md-12 col-lg-12 table-scrollable'>";
	detalle += 		"<table class='table table-bordered table-hover table-striped table-condensed' id='tbl_RendimientoVlidadr'>";
	detalle += 			"<thead>";
	detalle += 				"<tr>";
	detalle += 					"<th style='min-width: 125px;'>Supervisor</th>";
	detalle += 					"<th style='min-width: 125px;'>Cuartel</th>";
	detalle += 					"<th style='min-width: 125px;'>Fecha</th>";
	detalle += 					"<th style='min-width: 125px;'>Rut</th>";
	detalle += 					"<th style='min-width: 125px;'>Trabajador</th>";
	detalle += 					"<th style='width: 2%;'>Horas</th>";
	detalle += 					"<th style='width: 2%;'>Asistencia</th>";
	detalle += 				"</tr>";
	detalle += 			"</thead>";
	detalle += 			"<tbody>";
	$.ajax({
		url: "/simpleWeb/json/AGRO/DETALLE_RENDIMIENTO/",
		type : "PUT",
		data : JSON.stringify(row),
		async: false,
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept","application/json");
			xhr.setRequestHeader("Content-Type","application/json");
		},
		success: function(data){
			console.log(data)
			$.each(data,function(k,va){	
				var iconAsistencia = "<i class='fa fa-check' aria-hidden='true'></i>";
				if(va.motivo != 0){
					iconAsistencia = "<i class='fa fa-times' aria-hidden='true'></i>";
				}
				detalle += 				"<tr>";
				detalle += 					"<td>"+va.supervisor+"</td>";
				detalle += 					"<td>"+va.cuartel+"</td>";
				detalle += 					"<td>"+va.fecha+"</td>";
				detalle += 					"<td>"+va.rut+"</td>";
				detalle += 					"<td>"+va.nombre+"</td>";
				detalle += 					"<td>"+va.horas+"</td>";
				detalle += 					"<td>"+iconAsistencia+"</td>";
				detalle += 					"<td><a onclick='eliminar("+va.codigo+")'>Borrar</a></td>";
				detalle += 				"</tr>";
			});
		}
	})
	detalle += 			"</tbody>";
	detalle += 		"</table>";
	detalle += 	"</div>";
	detalle += 	"<div style='text-align: center;'>";
	detalle += 		"<a class='btn red' onclick='closeModal();'>Cancelar</a>";
	detalle += 	"</div>";
	popUp("Detalle", detalle, true, "800px", true);
	$("#loading").hide();
}
function eliminar(v){
	console.log(v);
	$.ajax({
		url:	"/simpleWeb/json/AGRO/DELETE_RENDIMIENTO_DUPLICADO/"+v,
		type:	"POST",
		success: function(){
			alerta("Se ha eliminado el Rendimiento");
			closeModal();
		},
		error: function(a, b){
			console.log(a);
		}
	});
}