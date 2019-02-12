var currentTime = new Date();
var startDateFrom = new Date(currentTime.getFullYear(), currentTime.getMonth() - 1, 1);

$(document).ready(function() {
	$("#tipoCampo").select2();
	$("#listaGrupos").select2();
	$("#listaCecos").select2();
	$("#nombreTrabajador").select2();


  $("#Sociedad").select2();
  ListaSociedad();
  loadSolicitudes();
  datesPickers();
	
	
  
});
function llenarSelectores(){
	var newOption1 = new Option("seleccionar..", "0", true, true);
	var newOption2 = new Option("seleccionar..", "0", true, true);
	var newOption3 = new Option("seleccionar..", "0", true, true);
	var newOption4 = new Option("seleccionar..", "0", true, true);
	
	
	
	$("#tipoCampo").append(newOption1);
	$("#listaGrupos").append(newOption2);
	$("#listaCecos").append(newOption3);
	$("#nombreTrabajador").append(newOption4);
	$("#tipoCampo").val(0);
	$("#listaGrupos").val(0);
	$("#listaCecos").val(0);
	$("#nombreTrabajador").val(0);
	
	
	
}
//mensual
function datesPickers(){
	$("#periodoSolicitud").datepicker({
		dateFormat : 'yy-mm',
		firstDay : 1,
		changeMonth : true,
		changeYear : true,
		minDate : startDateFrom,

	});
}
function loadSolicitudes(){
	//inicializo la tabla
	var table;	
	 if ( $.fn.dataTable.isDataTable( '#tbl_Lvacas' ) ) {
	    table = $('#tbl_Lvacas').DataTable();
	    table.clear();
	}
	else {
	    table = $('#tbl_Lvacas').DataTable( 
	    	{
	    		searching: false,
	    		paging:true,
	    		info: false,
	    		search: false
	    	}
	    )	    
	}
		$.ajax({
		  type: "GET",
	      async: false,			    
		  url: "/simpleWeb/json/work/solicitud/getSolicitudes/",			  
		  success:function (data){
			  
			    $.each(data, function(k, v) {
			    	var acciones = ""
			   		acciones +=		"<button title='Actualizar' id='"+k+"' onclick=\"javascript:modificarMant('" +v.idSolicitud + "')\" class='btn btn-circle green btn-outline btn-sm col-md-4 margin-left-7'><i class='fa fa-pencil-square-o fa-lg'></i></button>";
			   	 	acciones +=		"<button title='Borrar' id='" +k+"' onclick=\"javascript:borrarMant("+v.idSolicitud+")\" class='btn btn-circle red btn-outline btn-sm col-md-4'><i class='fa fa-trash-o fa-lg'></i></button>";		
			   	 
			    	table.row.add([  k+1,
			    	                 v.apellidoPaterno +" "+v.apellidoMaterno+", "+v.nombre ,
			    	                 v.codTrabajador,
			    	                 v.cantidadDiasSolicitud,
			    	                 v.fechaSolicitud,
			    	                 v.fechaInicioSolicitud,
			    	                 v.fechaFinSolicitud,
			    	                 acciones
			    	                 ]);
			  	});
			    table.draw();
			    llenarSelectores();
			  
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
		  complete: function(){
			  $("#loading").hide();
			  drawTableByFilters();
		  }
			  
		});
	
	
}
function ListaSociedad() {
	
	
	$.ajax({
		  type: "GET",
	      async: false,			    
		  url: "/simpleWeb/json/work/solicitud/getEmpresas/",			  
		  success:function (data){
			
			  var newOption1 = new Option("seleccionar..", "0", true, true);
			  $("#Sociedad").append(newOption1);
			  $.each(data, function(k, v) {
				  if(v.idSociedad!=-1){
			    	if ($('#Sociedad').find("option[value='" + v.sociedad + "']").length) {
			    		
			    	} else { 
			    	    // Create a DOM Option and pre-select by default
			    	    var newOption = new Option(v.denominacionSociedad, v.sociedad, true, true);
			    	    // Append it to the select
			    	    $('#Sociedad').append(newOption);
			    	}
				  }
			  	});
			  
			  $('#Sociedad').val(0);
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
function selectHuertoBySociedad($this){
	var value= $this.value;
	$("#tipoCampo").html("");
	$("#listaGrupos").html("");
	$("#listaCecos").html("");
	$("#nombreTrabajador").html("");
	
	var newOption2 = new Option("seleccionar..", "0", true, true);
	var newOption3 = new Option("seleccionar..", "0", true, true);
	var newOption4 = new Option("seleccionar..", "0", true, true);
	
	
	
	
	$("#listaGrupos").append(newOption2);
	$("#listaCecos").append(newOption3);
	$("#nombreTrabajador").append(newOption4);
	
	alert(value);
	$.ajax({
		  type: "GET",
	      async: false,			    
		  url: "/simpleWeb/json/work/getCampoBySoc/"+value,			  
		  success:function (data){
			 if(data.length!=0){
			  var newOption1 = new Option("seleccionar..", "0", true, true);
			  $("#tipoCampo").append(newOption1);
			  $.each(data, function(k, v) {
				  
			    	if ($('#tipoCampo').find("option[value='" + v.campo + "']").length) {
			    		
			    	} else { 
			    		
				    	
			    	    // Create a DOM Option and pre-select by default
			    	    var newOption = new Option(v.descripcion, v.campo, true, true);
			    	    // Append it to the select
			    	    $('#tipoCampo').append(newOption);
			    	}
				  
			  	});
			 }
			 else{
				 alerta("La sociedad seleccionada no posee Huertos asociados");
				 var newOption1 = new Option("seleccionar..", "0", true, true);
				  $("#tipoCampo").append(newOption1);
			 }
			  $('#tipoCampo').val(0);
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
		  complete: function(){
			  drawTableByFilters();
		  }
		});

}
function selectGrupoByHuerto($this){
	var value= $this.value;
	$('#listaGrupos').html("");
	$('#listaCecos').html("");
	$('#nombreTrabajador').html("");
	var newOption3 = new Option("seleccionar..", "0", true, true);
	var newOption4 = new Option("seleccionar..", "0", true, true);
	$("#listaCecos").append(newOption3);
	$("#nombreTrabajador").append(newOption4);
	
	$.ajax({
		  type: "GET",
	      async: false,			    
		  url: "/simpleWeb/json/work/getGruposByCampo/"+value,			  
		  success:function (data){
			 if(data.length!=0){
			  var newOption1 = new Option("seleccionar..", "0", true, true);
			  $("#listaGrupos").append(newOption1);
			 
			  $.each(data, function(k, v) {
				  
			    	if ($('#listaGrupos').find("option[value='" + v.grupo + "']").length) {
			    		
			    	} else { 
			    	    // Create a DOM Option and pre-select by default
			    	    var newOption = new Option(v.zona, v.grupo, true, true);
			    	    // Append it to the select
			    	    $('#listaGrupos').append(newOption);
			    	}
				  
			  	});
			 }
			 else{
				 alerta("El Huerto Seleccionado no posee grupos asociados");
				  var newOption1 = new Option("seleccionar..", "0", true, true);
				  $("#listaGrupos").append(newOption1);
			 }
			  $('#listaGrupos').val(0);
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
		  complete: function(){
			  drawTableByFilters();
		  }  
		});
}
function drawTableByFilters(){
var sociedad=$("#Sociedad").val();
var huerto=$("#tipoCampo").val();
var grupo=$("#listaGrupos").val();
var ceco=$("#listaCecos").val();

var table;	
if ( $.fn.dataTable.isDataTable( '#tbl_Lvacas' ) ) {
   table = $('#tbl_Lvacas').DataTable();
   table.clear();
}
else {
   table = $('#tbl_Lvacas').DataTable( 
   	{
   		searching: false,
   		paging:true,
   		info: false,
   		search: false
   	}
   )	    
}
	$.ajax({
	  type: "GET",
     async: false,			    
	  url: "/simpleWeb/json/work/solicitud/GetTrabajadoresBy/"+sociedad+"/"+huerto+"/"+grupo+"/"+ceco,			  
	  success:function (data){
		  
		    $.each(data, function(k, v) {
		    	var acciones = ""
		   		acciones +=		"<button title='Actualizar' id='"+k+"' onclick=\"javascript:modificarMant('" +v.idSolicitud + "')\" class='btn btn-circle green btn-outline btn-sm col-md-4 margin-left-7'><i class='fa fa-pencil-square-o fa-lg'></i></button>";
		   	 	acciones +=		"<button title='Borrar' id='" +k+"' onclick=\"javascript:borrarMant("+v.idSolicitud+")\" class='btn btn-circle red btn-outline btn-sm col-md-4'><i class='fa fa-trash-o fa-lg'></i></button>";		
		   	 
		    	table.row.add([  k+1,
		    	                 v.apellidoPaterno +" "+v.apellidoMaterno+", "+v.nombre ,
		    	                 v.codTrabajador,
		    	                 v.cantidadDiasSolicitud,
		    	                 v.fechaSolicitud,
		    	                 v.fechaInicioSolicitud,
		    	                 v.fechaFinSolicitud,
		    	                 acciones
		    	                 ]);
		  	});
		    table.draw();
		 
		  
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
	  complete: function(){
		  $("#loading").hide();
		  
	  }
		  
	});
	
	
	
	
}






function selectCECOByGrupo($this){
	var soc=$("#Sociedad").val();

	var newOption4 = new Option("seleccionar..", "0", true, true);
	
	$("#nombreTrabajador").append(newOption4);
	var idSoc=0;
	if(soc!=0){
	
	
	$.ajax({
		  type: "GET",
	      async: false,			    
		  url:"/simpleWeb/json/work/getSociedadByCodigo/"+soc, 			  
		  success:function (data){
			  $.each(data, function(k, v) {
				  idSoc=v.idSociedad;
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
	
	
	
	
	var value= $this.value;
	var url ="http://200.55.206.140/SCLEM/JSON_BAPI_COSTCENTER_GETLIST1.aspx?SOCIEDAD="+idSoc+"&GRUPO="+value;
	$("#listaCecos").html("");
	$.ajax({
		  type: "GET",
	      async: false,
		  url:url,
		  success:function (data){
			 
			  var newOption1 = new Option("seleccionar..", "0", true, true);
			  $("#listaCecos").append(newOption1);
			 datos=JSON.parse(data);
			 
			 if(datos.COSTCENTERLIST.length==0){
				 alerta("No hay Centro de costo asociado a este Grupo");
				
			 }
			 else{
				 for(var i=0;i<datos.COSTCENTERLIST.length;i++){
					 if ($('#listaCecos').find("option[value='" + datos.COSTCENTERLIST[i].COSTCENTER + "']").length) {
				    		
				    	} else { 
				    	    // Create a DOM Option and pre-select by default
				    	    var newOption = new Option(datos.COSTCENTERLIST[i].NAME, datos.COSTCENTERLIST[i].COSTCENTER, true, true);
				    	    // Append it to the select
				    	    $('#listaCecos').append(newOption);
				    	}
					 
				 }
				 $('#listaCecos').val(0);
			 }
			  
			 // $('#selectorZona').val(0);
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
		  complete: function(){
			  drawTableByFilters();
		  }  
		});
	}
	else{
		alerta("Debe seleccionar al menos una sociedad");
		
	}
	
}

function selectTrabajadorByCeco($this){
	var value=$this.value;
	var sociedad=$("#Sociedad").val();
	var huerto=$("#tipoCampo").val();
	var grupo=$("#listaGrupos").val();
	var ceco=$("#listaCecos").val();
	
	drawTableByFilters();
	
	
	
	
}








