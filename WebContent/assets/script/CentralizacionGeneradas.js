//Colocar Permisos
var sociedadPrivilege = new Set();
var huertoPrivilege = new Set();
//Obtener Sociedades y Huertos que tiene acceso
$.each(SESION.campo, function(key, value){
	sociedadPrivilege.add(value.idSociedad);
	huertoPrivilege.add(value.campo);
}); 

//Pantalla de carga en cada Ajax Request
var $loading = $('#loading').hide();
$(document)
  .ajaxStart(function () {
    $loading.show();
  })
  .ajaxStop(function () {
    $loading.hide();
});

var sociedades=[];
var sociedad;
var sociedadElegida;

$(document).ready(function(){
	
	// Cargar Formato de los Inputs
	setFormatInputs();

	// Colocar Eventos de Inputs
	setEventInputs();

	// Obtener Selects
	getSelector();
	
});


function setFormatInputs(){
	
	$("#idSociedad").select2({
	    placeholder: "Seleccionar..",
	    allowClear: true
	});
	
}


function setEventInputs(){
	
	
	
}



//Llenar los Select
async function getSelector(){
	
	getSociedad();
	
}

async function getSociedad(){
	
	//Obtener Sociedades en base a los privilegios del usuario
	let queryString = sociedadPrivilege == null ? "" : JSON.stringify(sociedadPrivilege).slice(1,-1);
	
	//Obtener sociedades
	sociedades = await $.getJSON('/simpleWeb/json/work/getSociedad2/?idSociedad='+queryString);
	
	//Limpiar Select
	$('#idSociedad, #idSociedadImpresion').each(function(key,value){$(value).children('option:not(:first)').remove();});
	
	//Colocar Sociedades en el Select
	$('#idSociedad, #idSociedadImpresion').setOptionsByArray(sociedades, "denominacionSociedad", "sociedad");
	
}


function traerPeriodos($this){
	var soc=$this.value;
	$("#periodo").html("");
	debugger;
	for(var i=0;i<sociedades.length;i++){
		if(sociedades[i].idSociedad==soc){
			sociedadElegida=sociedades[i].denominacionSociedad;
			sociedad=sociedades[i].sociedad;
			break;
		}
	}
	
	if ( $.fn.dataTable.isDataTable("#tbl_Centra") ) {
	    table = $("#tbl_Centra").DataTable();
	    table.clear().draw();
	}
	else {
	    table = $("#tbl_Centra").DataTable( 
	    	{
	    		searching: false,
	    		paging:false,
	    		info: false,
	    		search: false,
	    		"ordering": false
	    	}
	    )	    
	}

	$.ajax({
		  type: "GET",
	      async: false,
		  dataType: "json",	  
		  url: "/simpleWeb/json/work/Centralizacion/getPeriodosBy/"+soc,	  
		  processData: false,
		  contentType: false,
		  success:function (data){
			  if(data.length!=0){
				  var newOption = new Option("seleccionar..", "0", false, false);
		    	    // Append it to the select
		    	    $('#periodo').append(newOption);
				  $.each(data, function(k, v) {
						 
				    	if ($('#periodo').find("option[value='" + v.periodo + "']").length) {
				    		
				    	} else { 
				    	    // Create a DOM Option and pre-select by default
				    		
				    		var year=""+v.periodo;
				    			year=year.substring(0,4);
				    		var month=""+v.periodo;
				    		month=month.substring(4,6);
				    	    var newOption = new Option(month+"-"+year, v.periodo, false, false);
				    	    // Append it to the select
				    	    $('#periodo').append(newOption);
				    	}
				  	});
			  }
			  else{
				  alerta("seleccione una empresa con datos");
			  }
		  },
		  error:function (ex){
			  swal({
		            title: '<i>ERROR</i>',
		            type: 'info',
		            html: JSON.stringify(ex),
		            showCloseButton: true,
		            showCancelButton: true,
		            focusConfirm: false,
		            confirmButtonText:
		              '<i class="fa fa-thumbs-up"></i>OK!',
		            confirmButtonAriaLabel: 'Thumbs up, great!',
		            cancelButtonText:
		            '<i class="fa fa-thumbs-down"></i>',
		            cancelButtonAriaLabel: 'Thumbs down',
		          });
		  } 
		});
}


async function buscarCentralizacion(){
	
	if($('#fecha_proceso').val() == ""){
		alerta("Debe seleccionar una fecha de proceso");
		return false;
	}
	
	if($('#periodo').val() == ""){
		alerta("Debe seleccionar un periodo");
		return false;
	}
	
	if($('#idSociedad').val() == ""){
		alerta("Debe seleccionar una Empresa");
		return false;
	}
	
	// Obtener los atributos del Filtro
	let queryString = $("#searchForm").serialize();
	
	let centralizacion = await $.getJSON("/simpleWeb/json/work/Centralizacion/getCentralizacionWithFilter/?" + queryString);
	
	alerta(centralizacion);
	
	
	
}







jQuery.fn.setOptionsByArray = function(array, nameProperty1, nameProperty2) {

	let select = this;
	
	$.each(array, function(key, value) {
		$(select).append($('<option>').text(eval("value."+nameProperty1)).val(eval("value."+nameProperty2)));
	});

};
