var arrayMaquinaria;
var tipo_tallerArr = [
    {
		codigo: 'V',
		descripcion: "Vehiculos"}
	,{	codigo: 'T',
		descripcion: "Tractor"}
	,{	codigo: 'I',
		descripcion: "Implementos"}
	,{	codigo: 'A',
		descripcion: "Implementos de Aplicación"}
	,{	codigo: 'Y',
		descripcion: "Otros Equipos"}
	,{	codigo: 'O',
		descripcion: "Otras Maquinas a Combustion"
	}
];
var tipo = "<option value=''></option>";
$.each(tipo_tallerArr, function(k,v){
	tipo += "<option value='"+v.codigo+"'>"+v.descripcion+"</option>";
})
$("#tipo").html(tipo);
var tabla;
function buscar(){
	if($("#campo").val() && $("#tipo").val()){
		var datos = [];
		$.each(arrayMaquinaria, function(k,v){
			if(v.EQUICATGRY == $("#tipo").val()){
				datos.push([v.MAINTPLANT,v.EQUICATGRY , v.EQUIPMENT, v.DESCRIPT]);
			}
		});
		var columnas = [{
			title: "Campo"
		},{
			title: "Categoria"
		},{
			title: "Codigo"
		},{
			title: "Descripción"
		}];
		if(tabla){
			tabla.destroy();
	        $('#tbl_RendimientoVlidadr').empty(); 
		}
		tabla = $('#tbl_RendimientoVlidadr').DataTable({
			dom: 'Bfrtip',
			data: datos,
			columns: columnas,
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
}
function cambioCampo($value){
	$.ajax({
		url: IPSERVERSAP + "JSON_BAPI_EQUI_GETLIST.aspx?CENTRO="+$value,//ZREP
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			arrayMaquinaria = data.EQUIPMENT_LIST;
		}
	})
}