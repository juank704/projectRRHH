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
function buscar(){
	if(!$('#fecha_desde').val() || !$('#fecha_hasta').val() || !$('#dataHuerto').val()){
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
			url: "/simpleWeb/json/AGRO/GET_REVISION_ASISTENCIA?CAMPO="+$('#dataHuerto').val()+"&FECHAS="+fechas+"&ESTADO="+$("#estado").val()*1,
			type:	"GET",
			dataType: 'json',
			async: false,
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept","application/json");
				xhr.setRequestHeader("Content-Type","application/json");
			},
			success: function(data){
				if(tabla){
					tabla.destroy();
			        $('#tbl_RendimientoVlidadr').empty(); 
				}
				var columnasAux = fechas.split(",");
				var columnas = ["Codigo","Nombre Trabajador", "Fecha Inicio", "Fecha Termino"];
				for(var i = 0; i < columnasAux.length; i++){
					columnas.push(formatFecha(columnasAux[i]));
				}
				var finalColumn = [];
				for(var i = 0; i < columnas.length; i++){
					finalColumn.push({title: columnas[i]})
				}
				tabla = $('#tbl_RendimientoVlidadr').DataTable({
					dom: 'Bfrtip',
					data: data,
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