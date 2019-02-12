$(document).ready(function() {

	//loadTrabajador();
	handleDemo1();
	
	$( "#fechaIngreso" ).datepicker({ dateFormat: 'yy-mm-dd' });
	$( "#fechaActual" ).datepicker({ dateFormat: 'yy-mm-dd' });
	$( "#fechaInicio" ).datepicker({ dateFormat: 'yy-mm-dd' });
	$( "#fechaTermino" ).datepicker({ dateFormat: 'yy-mm-dd' });
	
});





function loadTrabajador() {
	
	//Obtener Trabajador
	var trabajador;
	$.ajax({
		async: false,
		dataType: 'json',
		url: "/simpleWeb/json/work/getTrabajadorById/"+getINFO().id,
		success: function(data){
			trabajador = data;
		},
		error: function(ex){
			alerta("Error, No se encuentra el Trabajador: " + ex);
		}
	});
	
	//Cargar Datos Basicos Trabajador
	$("#name").html(trabajador.nombre+" "+trabajador.apellidoPaterno + " ");
	$("#codigo").html(trabajador.codigo);
	$("#fechaIngresoCompania").html(trabajador.fechaIngresoCompania);
	
	$("#fechaActual").datepicker({ dateFormat: "yy-mm-dd"}).datepicker("setDate", "0");
	
	$("#fechaIngreso").datepicker({ dateFormat: "yy-mm-dd"}).datepicker("setDate", trabajador.fechaIngresoCompania);
	
	
}


//Tabla dinamica con Filtros
function handleDemo1() {

	var grid = new Datatable();

	grid
			.init({
				src : $("#datatable_ajax"),
				loadingMessage : 'Cargando...',
				dataTable : {
					"paging": false,
					"info":false,
					"bStateSave" : true, // save datatable
					// state(pagination, sort, etc)
					// in cookie.
					"ajax" : {
						"url" : "/simpleWeb/json/work/getAllVacacionesWithFilter/"
					},
					"columnDefs" : [

							{
								
								
							}

					],
					"language": { // language settings
	                    "metronicAjaxRequestGeneralError": "Could not complete request. Please check your internet connection"
	                },
					"order" : [ [ 1, "asc" ] ]
				// set first column as a default sort by asc

				}
			});

}



//Obtener objecto JSON por Servicio synchronous
jQuery.fn.getJSONSync = function (urlServicioPath) {

    var objectData = new Object;

    $.ajax({
        type: "GET",
        async: false,
        url: urlServicioPath,
        dataType: "json",
        success: function (data) {
            objectData = data;
        },
        error: function (ex) {
            alert('Error:' + ex);
        }
    });

    return objectData;

};

