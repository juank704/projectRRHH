$(document).ready(function(){
	
});
var tabla;
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
var fechas;
function getFechasPeriodo($periodo){
	var anno = ($periodo.split("-")[0]);
	var mes = ($periodo.split("-")[1]);
	console.log(mes)
	var feriados = [];
	$.ajax({
 		type : "GET",
 		url : '/simpleWeb/json/work/holidays/getHolidaysByYear/'+anno+'',
 		async: false,
 		dataType : "json",
 		success : function(data) {
 			console.log(data)
 			contadorferiados = 0;
			$.each(data, function(k, v) {
				if(v.fechaFeriado.split("-")[0] == anno){
					feriados.push(v.fechaFeriado);
				}
			})
 		}
 		}).fail(function(jqXHR, textStatus, errorThrown) {
 			alerta(errorThrown);
			$("#loading").hide();
		})
	var fechas = "";
	var tipo = 0;
	if(mes == "01" || mes == "03" || mes == "05" || mes == "07" || mes == "08" || mes == "10" || mes == "12"){
		var fecha_desde = new Date(anno+'-'+mes+'-01');
		var fecha_hasta = new Date(anno+'-'+mes+'-31');
		
		
		var finicio = fecha_desde.getTime();
		var ffin = fecha_hasta.getTime();
		var diff = finicio - ffin;
		diff = (diff*-1)/(1000*60*60*24);
		var c = 0;
		for(var i = 1; i <= diff+1; i++){
			fecha_desde.setDate(fecha_desde.getDate() + 1);
			if(fecha_desde.getDay() != 6 && fecha_desde.getDay() != 0){
				if(feriados.indexOf(formatearDate(fecha_desde)) == -1){
					if(c == 0){
						fechas += ""+formatearDate(fecha_desde);
					}else{
						fechas += ","+formatearDate(fecha_desde);
					}
					c++;
				}
			}
		}
	}
	if(mes == "04" || mes == "06" || mes == "11" || mes == "09"){
		var fecha_desde = new Date(anno+'-'+mes+'-01');
		var fecha_hasta = new Date(anno+'-'+mes+'-30');
		
		var finicio = fecha_desde.getTime();
		var ffin = fecha_hasta.getTime();
		
		var diff = finicio - ffin;
		diff = (diff*-1)/(1000*60*60*24);
		var c = 0;
		for(var i = 1; i <= diff+1; i++){
			fecha_desde.setDate(fecha_desde.getDate() + 1);
			if(fecha_desde.getDay() != 6 && fecha_desde.getDay() != 0){
				if(feriados.indexOf(formatearDate(fecha_desde)) == -1){
					if(c == 0){
						fechas += ""+formatearDate(fecha_desde);
					}else{
						fechas += ","+formatearDate(fecha_desde);
					}
					c++;
				}
			}
		}
	}
	if(mes == "02"){
		var fecha_desde = new Date(anno+'-'+mes+'-01');
		var fecha_hasta = new Date(anno+'-'+mes+'-28');
		
		var finicio = fecha_desde.getTime();
		var ffin = fecha_hasta.getTime();
		
		var diff = finicio - ffin;
		diff = (diff*-1)/(1000*60*60*24);
		var c = 0;
		for(var i = 1; i <= diff+1; i++){
			fecha_desde.setDate(fecha_desde.getDate() + 1);
			if(fecha_desde.getDay() != 6 && fecha_desde.getDay() != 0){
				if(feriados.indexOf(formatearDate(fecha_desde)) == -1){
					if(c == 0){
						fechas += ""+formatearDate(fecha_desde);
					}else{
						fechas += ","+formatearDate(fecha_desde);
					}
					c++;
				}
			}
		}
	}
	return fechas;
}
function buscar(){
//	return;
	if(!$('#periodo').val() || !$('#dataHuerto').val()){
		return;
	}else{
		fechas = getFechasPeriodo($("#periodo").val());
		console.log(fechas)
		$("#loading").show();
		setTimeout(function(){ 
			
		$.ajax({
			url: "/simpleWeb/json/AGRO/GET_TR_SIN_RENDIMIENTO?CAMPO="+$('#dataHuerto').val()+"&FECHAS="+fechas,
			type:	"GET",
			dataType: 'json',
			async: false,
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept","application/json");
				xhr.setRequestHeader("Content-Type","application/json");
			},
			success: function(data){
				console.log(data);
				var datos = [];
				$.each(data, function(k,v){
					v.id = v.cuartel*1;
					var tbl = [v.codigo, v.nombre, v.fecha];
					datos.push(tbl);
				})
				if(tabla){
					tabla.destroy();
			        $('#tbl_RendimientoVlidadr').empty(); 
				}
				var columnas = ["Codigo","Nombre Trabajador", "Fecha"];
				var finalColumn = [];
				for(var i = 0; i < columnas.length; i++){
					finalColumn.push({title: columnas[i]})
				}
				tabla = $('#tbl_RendimientoVlidadr').DataTable({
					dom: 'Bfrtip',
					data: datos,
					columns: finalColumn,
				    buttons: [
				        {  extend: 'excel',
				            text: 'Excel',
				            className: 'btn btn-success',
				        }
				    ],
					autoWidth: true,
					ordering: false,
					fixedHeader: true
				});
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
function addTrSinDigitacion(){
	console.log(fechas)
	if(fechas){
		var url = "/simpleWeb/json/AGRO/ADD_TR_SIN_DIGITACION?FECHAS="+fechas;
		$.ajax({
			url: url,
			type:	"GET",
			dataType: 'json',
			async: false,
			success: function(data){
				if(data){
					alerta("Datos guardados");
				}else{
					alerta("Error")
				}
			},errror: function(er){
				alerta("Ha ocurrido un error interno del servidor, consulte con el administrador del sistema")
			}
		})
	}
}