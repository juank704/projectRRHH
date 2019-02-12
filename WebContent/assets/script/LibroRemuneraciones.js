//Colocar Permisos
var sociedadPrivilege = new Set();
var huertoPrivilege = new Array();
//Obtener Sociedades y Huertos que tiene acceso
$.each(SESION.campo, function(key, value){
	sociedadPrivilege.add(value.idSociedad);
	huertoPrivilege.push(value.campo);
});

$(document).ready(function(){
	llenarSelectorEmpresa();
	$("#selectorSociedad").select2({
	    placeholder: "Seleccionar..",
	    allowClear: true
	});
	llenarSelectorPeriodo();
	$('#selectorPeriodo').select2({
	    placeholder: "Seleccionar..",
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
	$("#crearLibroModal").modal("toggle");
	$("#crearNombreLibro").val("");
}
$("#agregarSubmit").click(function(event) {
	  event.preventDefault();
	  var nombre=$("#crearNombreLibro").val();
	  var Empresa=$("#selectorSociedad").val();
	  var periodo=$("#selectorPeriodo").val();
	  $("#loading").show();
	  $("#crearLibroModal").modal("toggle"); 
	  $("#crearLibroModal").modal("hide"); 
		  crearLibro(nombre, Empresa, periodo);
		
	  
	  
	});
function crearLibro($nombre, $empresa, $periodo){
	$("#loading").show();
	
	
	 var tipo_division = $("#tipodivisionB").val();
		
	    if(tipo_division === "-1"){tipo_division = null;}
	    else if(tipo_division == ''){
			tipo_division = null;
		}
		else{
			 tipo_division = $("#tipodivisionB").val();
		}
	 
	$.ajax({
		  type: "GET",
	     
		  dataType: "text",	  
		  url: "/simpleWeb/json/work/Remuneraciones/crearLibro/"+$nombre+"/"+$empresa+"/"+$periodo+"/"+tipo_division,	  
		  processData: false,
		  contentType: false,
		  success:function (data){
			  
				  $("#crearNombreLibro").val("");
				  
			    	window.open("/simpleWeb/json/work/Remuneraciones/descargarLibroRemuneraciones/"+data);
			    	 alerta("Libro Creado Satisfactoriamente");
			  
			 
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
		  },
		  complete:function (){
			  $("#loading").hide();
			 
		  }
		});
	
	
}

$('#selectorSociedad').change(function(e) {
	
	$("#tipodivisionB").empty();
	var soci_sap = "";
	$("#loading").show();
	$.getJSON("/simpleWeb/json/work/getSociedadBySoc/"+$('#selectorSociedad').val()+"" , function(data){
       
		soci_sap = JSON.stringify(data.sociedad);
	
		
	}).done(function() {
		
		$("#tipodivisionB").append("<option value='-1'>Seleccione Huerto</option>");
		var soci_sapFinal  = soci_sap.replace(/\"/g, '');
		
		$.getJSON("/simpleWeb/json/work/getCampoByCodigoSociedad/"+$('#selectorSociedad').val()+"" , function(data){
	       
			console.log(data);
	      //Obtener huertos en base a los privilegios del usuario
	    	let queryString = huertoPrivilege == null ? "" : JSON.stringify(huertoPrivilege).slice(1,-1);
	    	
			$.each(data, function(k, v){
				  var SelectHuerto = "";
				
                console.log("campo "+v.campo);
                console.log("priv "+JSON.stringify(huertoPrivilege));
               if(huertoPrivilege.includes(v.campo) == true){
               	SelectHuerto += 	"<option value="+v.campo+">"+v.descripcion+"</option>";
               }
				$("#tipodivisionB").append(SelectHuerto);
			})
			
		}).done(function() {
			$("#loading").hide();

		})
	})
	
	});



