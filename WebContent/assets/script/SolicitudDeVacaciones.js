$(document).ready(function(){
	
	var f = new Date();
	var dia=f.getDate();
	var mes=+f.getMonth()+1;
	if(mes<10)
	{
		mes="0"+mes;
	}
	
	var anio=f.getFullYear();
	var n=dia+"-"+mes+"-"+anio;
	llenarSelectores();
	
	$( "#fechaSolicitudVacaciones" ).val(n);
	$("#fechaSolicitudInicioVacaciones").datepicker({
         dateFormat:"dd-mm-yy"
     });
	
})

function cambiarCodigo(){
	
	var id=	$("#SelectorDeRut").val();
	$("#SelectorDeCodigo > option[value="+id+"]").attr('selected', 'selected');
	var valor=$("#SelectorDeCodigo > option[value="+id+"]").html();
	var valor2= $("#select2-SelectorDeCodigo-container").html(valor);
	//work/getTrabajadorById/
	$.ajax({
		  type: "GET",
	      async: false,			    
		  url: "/simpleWeb/json/work/getTrabajadorById/"+id,			  
		  success:function (data){
			 $("#nombreTrabajador").val(data.nombre);
			 
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
	
	
	
	calcularFin();
	
}
function cambiarRut(){
	var id=	$("#SelectorDeCodigo").val();
	$("#SelectorDeRut > option[value="+id+"]").attr('selected', 'selected');
	var valor=$("#SelectorDeRut > option[value="+id+"]").html();
	var valor2= $("#select2-SelectorDeRut-container").html(valor);
	
	$.ajax({
		  type: "GET",
	      async: false,			    
		  url: "/simpleWeb/json/work/getTrabajadorById/"+id,			  
		  success:function (data){
			 $("#nombreTrabajador").val(data.nombre);
			 
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
	
	
	
	calcularFin();
}
function calcularFechaFin()
{
	
	//validaciones
	
	var text="tienes algunos errores, Revisa el campo ";
	 var dias=$("#diasSolicitudVacacion").val();
	 var fecha=$("#fechaSolicitudInicioVacaciones").val();
	 var Rut=$("#SelectorDeRut").val();
	 var Codigo=$("#SelectorDeCodigo").val();
	 
	 var datos=new Array();
	 if(dias==0 || dias=="" || fecha=="" ||Rut==0 ||Rut=="" || Codigo==0 || Codigo=="")
	 {
		 if(dias==0 || dias=="")
	    	{
	    		datos.push("días");
	    	}
	    	if(fecha=="")
	    	{
	    		datos.push("fecha Inicio");
	    	}
	    	if(Rut==0 || Codigo=="" || Codigo==0 || Rut=="")
	    	{
	    		datos.push("Codigo o rut");
	    	}
	    	
	    	for(var i=0;i<datos.length;i++)
	    	{
	    		if(i==0){
	    			text+=datos[i];
	    		}
	    		else{
	    			text+=", "+datos[i]
	    		}
	    	}
	 }
	 else{
		 
		 $("#Vwa").css("display","none");
		 calcularFin();
	 }
}
function calcularFin(){
	
	var vca= new Object();
	vca.idregion=$("#SelectRegion").val();
	vca.fechaInicioSolicitud=$("#fechaSolicitudInicioVacaciones").val();
	vca.cantidadDiasSolicitud=$("#diasSolicitudVacacion").val();
	
	
	$.ajax({
		  type: "POST",
	      async: false,			    
		  url: "/simpleWeb/json/work/solicitud/getFechaFin/",	
		  data: JSON.stringify(vca),
		  beforeSend: function(xhr) {
    	      xhr.setRequestHeader("Accept", "application/json");
    	      xhr.setRequestHeader("Content-Type", "application/json");
    	    },
		  success:function (data){			  
			 $("#fechaSolicitudFinalVacaciones").val(data.responseText);
			
		  },
		  error:function (ex){
			  $("#fechaSolicitudFinalVacaciones").val(ex.responseText);
		  }  
		});
}
function llenarSelectores()
{
	$.ajax({
		  type: "GET",
	      async: false,			    
		  url: "/simpleWeb/json/work/getTrabajadores/",			  
		  success:function (data){
			 
			  $("#SelectorDeRut").append('<option value=0>Seleccionar...</option>');
			  $("#SelectorDeCodigo").append('<option value=0>Seleccionar...</option>');
			    $.each(data, function(k, v) {
			    	
			    	$("#SelectorDeRut").append('<option value='+v.id+'>'+v.rut+'</option>');
			    	$("#SelectorDeCodigo").append('<option value='+v.id+'>'+v.codigo+'</option>');
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



function borrarMant($id) {
  swal({
    title: "Estás Seguro?",
    text: "No serás capaz de revertir esto",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Bórralo!"
  }).then(function(result) {
    if (result.value) {
      deleteSolicitud($id);
      
    }
  });
}
function deleteSolicitud($id) {
	  $.ajax({
	    type: "PUT",
	    async: false,
	    url: "/simpleWeb/json/work/solicitudVacacion/deleteSolicitudVTrabajador/" + $id,

	    beforeSend: function(xhr) {
	      xhr.setRequestHeader("Accept", "application/json");
	      xhr.setRequestHeader("Content-Type", "application/json");
	    },
	    success: function(data) {
	      
	      alerta("Solicitud borrada con éxito");
	      location.reload();
	    },
	    error: function(ex) {
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
function onLoadSolicitudDeVacaciones()
{
	//inicializo la tabla
	var table;	
	 if ( $.fn.dataTable.isDataTable( '#tbl_solicitudV' ) ) {
	    table = $('#tbl_solicitudV').DataTable();
	    table.clear();
	}
	else {
	    table = $('#tbl_solicitudV').DataTable( 
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
		  url: "/simpleWeb/json/work/solicitud/getSolicitudVacaciones/",			  
		  success:function (data){
			  
			    $.each(data, function(k, v) {
			    	var acciones = ""
			   		acciones +=		"<button title='Actualizar' id='"+k+"' onclick=\"javascript:modificarMant('" +v.idSolicitud + "')\" class='btn btn-circle green btn-outline btn-sm col-md-4 margin-left-7'><i class='fa fa-pencil-square-o fa-lg'></i></button>";
			   	 	acciones +=		"<button title='Borrar' id='" +k+"' onclick=\"javascript:borrarMant("+v.idSolicitud+")\" class='btn btn-circle red btn-outline btn-sm col-md-4'><i class='fa fa-trash-o fa-lg'></i></button>";		
			   	 
			    	table.row.add([  v.idTrabajador,
			    	                 v.fechaSolicitud,
			    	                 v.fechaInicioSolicitud,
			    	                 v.fechaFinSolicitud,
			    	                 v.periodoSolicitud,
			    	                 v.cantidadDiasSolicitud,
			    	                 v.estadoSolicitud,
			    	                 v.comprobanteSolicitud,
			    	                 acciones
			    	                 ]);
			  	});
			    table.draw();
			    $("#loading").hide();
			  
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
function clearData(){
	var checkArray=new Array();
	  $("#seeWorkersModal").modal("toggle");

}
function seeWorkersModal(){
	  $("#seeWorkersModal").modal("toggle");
}
function getWorkers(){

	var table;
	
		
		if ( $.fn.dataTable.isDataTable( '#seeWorkersTable' ) ) {
		    table = $('#seeWorkersTable').DataTable();
		    table.clear();
		}
		else {
		    table = $('#seeWorkersTable').DataTable( 
		    	{
		    		searching: false,
		    		paging: true,
		    		info: false,
		    		search: false
		    	}
		    )
		}
		$.ajax({
			  type: "GET",
		      async: false,			    
			  url: "/simpleWeb/json/work/getTrabajadores/",			  
			  success:function (data){
				    $.each(data, function(k, v) {
				    	table.row.add(["<input type='checkbox' style='margin-left:auto; margin-right:auto;' title='Seleccionar "+v.nombre+" "+v.apellidoPaterno+"' id='"+v.id+"' value='"+v.id+"' name='check'  class='checkbox'/>", 
				    	               v.id, v.codigo, v.nombre, v.apellidoPaterno ]);
				  	});
				    table.draw();
				    $("#seeWorkersModal").modal("toggle");
				   
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
			var checkArray=new Array();

	
	
	
	
}





function agregarworkerstoInput(){
	
	var checkTr=[];
	$('#seeWorkersTable input[type=checkbox]:checked').each(function(){
		checkTr.push($(this).val());
	});
	if(checkTr.length>1){
		swal({
			  position: 'top-end',
			  type: 'error',
			  title: ' se seleccionó más de un trabajador',
			  showConfirmButton: false,
			  timer: 1500
			});
	}
	else if(checkTr.lenght==0 || checkTr.lenght<0)
	{
		swal({
			  position: 'top-end',
			  type: 'error',
			  title: ' no se seleccionó ningun trabajador',
			  showConfirmButton: false,
			  timer: 1500
			});
	}
	else{
		
		$.ajax({
			  type: "GET",
		      async: false,			    
			  url: "/simpleWeb/json/work/getTrabajadorById/"+checkTr[0],			  
			  success:function (data){
				    $("#codigoWorker").val(data.codigo);
				    $("#seeWorkersModal").modal("toggle");

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
}
$("#addSolicitudForm").submit(function(event) {
		event.preventDefault();
	 	var text="tienes algunos errores, Revisa el campo";
		var codigoWorker=$("#SelectorDeCodigo").val();
		var rutWorker=$("#SelectorDeRut").val();
	    var fechaSolicitudVacaciones=$("#fechaSolicitudInicioVacaciones").val();
	    var diasSolicitudVacacion=$("#diasSolicitudVacacion").val();
	    var datos=new Array();
	    
	    if((codigoWorker!=0) && (fechaSolicitudVacaciones!="") && (diasSolicitudVacacion!="") ){
		    insertarSolicitud(codigoWorker,fechaSolicitudVacaciones,diasSolicitudVacacion);
	    }
	    else {
	    	alerta("existen Datos vacios");
	    }
	    
	    
	    
	    
	    
});
function insertarVacacionesDB(){
	
}


function insertarSolicitud($codigoWorker,$fechaSolicitudVacaciones,$diasSolicitudVacacion)
{
	var a=$fechaSolicitudVacaciones.split("-");
	var periodo=a[2];
	var solicitud=new Object();
	
	
	
	$.ajax({
		  type: "GET",
	      async: false,			    
		  url: "/simpleWeb/json/work/getTrabajadorById2/"+$codigoWorker,			  
		  success:function (data){
			  
			   solicitud.fechaSolicitud=$("#fechaSolicitudVacaciones").val();
			   solicitud.fechaInicioSolicitud=$("#fechaSolicitudInicioVacaciones").val();
			   solicitud.fechaFinSolicitud="";
			   solicitud.periodoSolicitud=periodo;
			   solicitud.cantidadDiasSolicitud=$diasSolicitudVacacion;
			   solicitud.estadoSolicitud="En Trámite";
			   solicitud.descripcionSolicitud="";
			   solicitud.comprobanteSolicitud=0;
			   solicitud.codTrabajador=data.codigo;
			   solicitud.idContrato=data.idContrato;
			   
			   $.ajax({
			        type: "PUT",
			        async: false,
			        url: "/simpleWeb/json/work/solicitudVacacion/createSolicitudVacaciones/",
			        data: JSON.stringify(solicitud),
			        beforeSend: function(xhr) {
			          xhr.setRequestHeader("Accept", "application/json");
			          xhr.setRequestHeader("Content-Type", "application/json");
			        },
			        success: function(d) {
			        	alerta("Solicitud Creada");
			            
			          
			        },
			        error: function(ex) {

			          swal({
			            title: '<i>ERROR</i>',
			            type: 'info',
			            html:
			            JSON.stringify(ex),
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

