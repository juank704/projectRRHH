$(document).ready(function(){
	llenarSelectorEmpresa();
	$("#selectorSociedad").select2({
	    placeholder: "TODOS",
	    allowClear: true
	});
	$("#loading").hide();
});

function llenarSelectorEmpresa(){
	$.ajax({
		  type: "GET",
	      async: false,
		  dataType: "json",	  
		  url: "/simpleWeb/json/work/Empresas/getEmpresas/",	  
		  processData: false,
		  contentType: false,
		  success:function (data){
			
			  debugger;
			  let allOption = new Option("TODOS", "", false, false);
			  $('#selectorSociedad').append(allOption);
			  
			  $.each(data, function(k, v) {
				  if(v.idSociedad!=-1){
			    	if ($('#selectorSociedad').find("option[value='" + v.sociedad + "']").length) {
			    		
			    	} else { 
			    	    // Create a DOM Option and pre-select by default
			    	    var newOption = new Option(v.denominacionSociedad, v.sociedad, false, false);
			    	    // Append it to the select
			    	    $('#selectorSociedad').append(newOption);
			    	}
				  }
			  	});
			  
			    
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
function llenarSelectorPeriodo(){
	$.ajax({
		  type: "GET",
	      async: false,
		  dataType: "json",	  
		  url: "/simpleWeb/json/work/Remuneraciones/getPeriodos/",	  
		  processData: false,
		  contentType: false,
		  success:function (data){
			
			  $.each(data, function(k, v) {
				 
			    	if ($('#selectorPeriodo').find("option[value='" + v.periodo + "']").length) {
			    		
			    	} else { 
			    	    // Create a DOM Option and pre-select by default
			    	    var newOption = new Option(v.descripcion, v.periodo, false, false);
			    	    // Append it to the select
			    	    $('#selectorPeriodo').append(newOption);
			    	}
				  
			  	});
			  
			  
			    
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
function abrirCerrarModal(){
	
	if($('#selectorInformes').val() == ""){
		alerta("Seleccione Informe");
		return false;
	}
	
	$("#crearLibroModal").modal("toggle");
	$("#crearNombreLibro").val("");
}
$("#agregarSubmit").click(function(event) {
	
	  event.preventDefault();
	  var nombre=$("#crearNombreLibro").val();
	  var Empresa=$("#selectorSociedad").val();
	  
	  $("#loading").show();
	  $("#crearLibroModal").modal("toggle"); 
	
	  crearLibro(nombre, Empresa);
	
	  
	  
	});
function crearLibro($nombre, $empresa){
	debugger;
	$("#loading").show();
	
	let queryString = $("#searchForm").serialize();
	//let queryString = "";
	
	$.ajax({
		  type: "GET",
	      async: false,
		  dataType: "json",	  
		  url: "/simpleWeb/json/work/reportesTrabajador/getInformeTrabajadorDuplicados/"+$nombre+"/?"+queryString,
		  success:function (data){
			  debugger;
			  window.open("/simpleWeb/json/work/excel/showExcel/"+data[0]+"/");
			  alerta("Reporte Generado Satisfactoriamente");
			  $("#loading").hide();
		  },
		  error:function (ex){
			  //debugger;
			  //window.open("/simpleWeb/json/work/excel/showExcel/"+ex.responseText+"/");
			  //alerta("Reporte Generado Satisfactoriamente");
			  //$("#loading").hide();
		  },
		  complete:function (){
			  $("#loading").hide();
		  }
		});
	
	
}




