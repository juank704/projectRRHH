$(document).ready(function(){
	
});
var tabla;
var selectHuerto = "<option value=''></option>";
$.ajax({
	url: "/simpleWeb/json/AGRO/GET_SOCIEDAD/"+SESION.idUser,
	type:	"GET",
	dataType: 'json',
	async: false,
	success: function(data){
		$.each(data, function(ka,va){
			selectHuerto += "<option value='"+va.sociedad+"'>"+va.descripcion+"</option>";
		});
	}
})
$("#dataHuerto").html(selectHuerto);
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
function cambioSociedad(value){
	var campos = "<option value=''></option>";
	$.each(SESION.campo, function(k,v){
		if(v.sociedad == value){
			campos += "<option value='"+v.campo+"'>"+v.descripcion+"</option>";
		}
	});
	$("#campo").html(campos);
}
function buscar(){
	if(!$('#periodo').val() || !$('#dataHuerto').val() || !$('#campo').val()){
		return;
	}else{
		$("#loading").show();
		setTimeout(function(){ 
			
		$.ajax({
			url: "/simpleWeb/json/AGRO/GET_RESUMEN_DIGITACION?SOCIEDAD="+$('#dataHuerto').val()+"&CAMPO="+$('#campo').val()+"&PERIODO="+$("#periodo").val()+"&ESTADO="+$("#estado").val()*1,
			type:	"GET",
			dataType: 'json',
			async: false,
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept","application/json");
				xhr.setRequestHeader("Content-Type","application/json");
			},
			success: function(data){
				console.log(data);
				if(tabla){
					tabla.destroy();
			        $('#tbl_RendimientoVlidadr').empty(); 
				}
				var columnas = ["Codigo", "Rut", "Nombre Trabajador", "Fecha Inicio", "Fecha Termino","Dias Totales","Dias Falta","Horas Trabajadas", "Horas Extras", "Monto horas Extras", "Bono", "Horas Extras 2", "Bono 2", "Valor Rendimiento", "Base Dia", "Valor Liquido"];
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