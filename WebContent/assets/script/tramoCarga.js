var tramo=new Object();
$(document).ready(function() {
  $("#loading").show();
  onLoadTramo();
  $("#selectorPeriodo").select2();
  getPeriodos();
});
var tramos=[];

function verMant($id)
{
	window.open("/simpleWeb/json/work/Tramo/viewTramo/"+$id,"_blank");
	
}
function buscarMan($Id, $dd) {
  swal({
    position: "top-end",
    type: "success",
    title: "Búsqueda exitosa",
    showConfirmButton: false,
    timer: 550
  });
}
function generateReport($form) {
  swal({
    position: "top-end",
    type: "success",
    title: "Tu reporte ha sido generado para: " + $form,
    showConfirmButton: false,
    timer: 1500
  });
} 

/*--------------submits--------------------------*/
$("#insertTramoForm").submit(function(event) {
	 event.preventDefault();
	 var text="tienes algunos errores, Revisa el campo ";
	var nombre=$("#agregarNombreTramo").val();
    var inicio=$("#agregarInicioTramo").val();
    var fin=$("#agregarFinTramo").val();

    var datos=new Array();
    
    if(nombre=="" || monto=="0" || inicio==""){
    	if(nombre=="")
    	{
    		datos.push("Descripción");
    	}
    	if(monto=="0")
    	{
    		datos.push("Monto Tramo");
    	}
    	if(inicio=="")
    	{
    		datos.push("Inicio Tramo");
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
    	$("#twa").css("display","block");
    	$("#textotwa").html(text);
    	
    }
    else{
    	 
        $("#fwa").css("display", "none");
        $("#agregarTramoModal").modal("toggle");
        addTramo();
        location.reload();
        }   
});

$("#editTramoForm").submit(function(event) {
  event.preventDefault();

  updateTramo();
});

$("#updateMTramoForm").submit(function(event){
	event.preventDefault();


	upTramos();
});
function cerrarModalAgregar(){
	$("#twa").css("display", "none");
	$("#agregarTramoModal").modal("toggle");
}
/*-----------------CRUD-----------------------*/
/*-----------------onload-----------------------*/
function onLoadTramo() {
  readTramos();
}
/*-----------------Read-----------------------*/
function readTramos() {
  
	var table;
  
  if ( $.fn.dataTable.isDataTable( '#tbl_Tramo' ) ) {
	    table = $('#tbl_Tramo').DataTable();
	    table.clear();
	}
	else {
	    table = $('#tbl_Tramo').DataTable( 
	    	{
	    		searching: false,
	    		paging: false,
	    		info: false,
	    		search: false,
	    		"columnDefs": [
	    		               { className: "text-center", "targets": [ 0,1,2,3,4 ] }
	    		             ]
	    	}
	    )
	}
  $("#loading").show();
  $.ajax({
	  type: "GET",
      async: false,
	  dataType: "json",	  
	  url: "/simpleWeb/json/work/tramo/getTramosByLastPeriod/",	  
	  processData: false,
	  contentType: false,
	  success:function (data){
		
		    $.each(data, function(k, v) {
		    	 //var acciones="<button title='Actualizar' id='"+k+"' onclick=\"javascript:modificarTramo('" +v.idTramoCarga + "')\" class='btn btn-circle green btn-outline btn-sm col-md-4 margin-left-7'><i class='fa fa-pencil-square-o fa-lg'></i></button>"; 	
			      
			      var desde=formatearAMoneda(v.inicioTramoCarga);
			      var hasta=parseInt(v.finTramoCarga)>10000000? "Y Más": formatearAMoneda(v.finTramoCarga);	  
			      
			      var p=""+v.periodoTramoCarga;
			      var a=p.substring(0, 4);
			      var b=p.substring(4, 6);
			      var periodo= b+"-"+a;
			      
			      table.row.add([  v.letraTramoCarga, desde, hasta, formatearAMoneda( v.montoTramoCarga),periodo ]);
		      
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
	  complete:function(){
		  $("#loading").hide();
	  }
		  
	});
  
}

/*-----------------Create-----------------------*/

function addTramo() {
  

	tramo.descripcionTramoCarga = $("#agregarNombreTramo").val();
	tramo.inicioTramoCarga = $("#agregarInicioTramo").val();
	tramo.finTramoCarga = $("#agregarFinTramo").val();

$.ajax({
  type: "PUT",
  async: false,
  url: "/simpleWeb/json/work/tramo/createTramo/",
  data: JSON.stringify(tramo),
  beforeSend: function(xhr) {
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
  },
  success: function(data) {
  		swal({
              position: "top-end",
              type: "success",
              title: "Tramo Carga Creado Con éxito",
              showConfirmButton: false,
              timer: 550
            });
      
    
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
}
/*----------------Delete------------------------*/

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
      deleteTramo($id);
      
    }
  });
}
/*----------------Delete function------------------------*/

function deleteTramo($id) {
  $.ajax({
    type: "PUT",
    async: false,
    url: "/simpleWeb/json/work/tramo/deleteTramo/" + $id,

    beforeSend: function(xhr) {
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
    },
    success: function(data) {
      swal({
        position: "top-end",
        type: "success",
        title: "AFP Borrada con éxito",
        showConfirmButton: false,
        timer: 550
      }).then(function(result){
        location.reload();
      });
      

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

/*----------------Create------------------------*/
function agregarTramos() {
	//traer el ultimo periodo en curso, si no lo encuentra generar vacios,
	
	
	
  $("#agregarMTramoModal").modal("toggle");
}
function cerrarModalMAgregar(){
	$("#agregarMTramoModal").modal("toggle");
}
function updateTramos(){
	modificarTramoMasivo();
	
}
function cerrarModalMupdate(){
	$("#updateMTramoModal").modal("toggle");
}



/*----------------Modify------------------------*/
function modificarTramo($id) {
  $.ajax({
    type: "GET",
    async: false,
    
    url: "/simpleWeb/json/work/tramo/readTramo/" + $id,
    
    success: function(data) {
    	
      $("#editarIdTramo").val(data.idTramoCarga);
      $("#editarNombreTramo").val(data.descripcionTramoCarga);
       $("#editarInicioTramo").val(data.inicioTramoCarga);
      $("#editarFinTramo").val(data.finTramoCarga);
    
      //pzfgd critica funcional
      $("#editarTramoModal").modal("toggle");
      //manejador de la llamada a la base de datos

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
      })
    }
  });
}
function modificarTramoMasivo() {
	var periodo=document.getElementById("selectorPeriodo").value;
	var desdes=document.getElementsByClassName("updateInicioTramo");
	var hastas=document.getElementsByClassName("updateFinTramo");
	var montos=document.getElementsByClassName("updateMontoTramo");
	
	tramos=[];
	console.log(desdes);
	  $.ajax({
	    type: "GET",
	    async: false,
	    
	    url: "/simpleWeb/json/work/tramo/getTramosByPeriodo/" + periodo,
	    
	    success: function(data) {
	    	
	    	$.each(data, function(k, v) {
	    	var tramo=new Object;
	    	tramo.idTramoCarga=v.idTramoCarga;
	    	tramo.descripcionTramoCarga=v.descripcionTramoCarga;
	    	tramo.inicioTramoCarga=v.inicioTramoCarga;
	    	tramo.finTramoCarga=v.finTramoCarga;
	    	tramo.montoTramoCarga=v.montoTramoCarga;
	    	tramo.letraTramoCarga=v.letraTramoCarga;
	    	tramo.periodoTramoCarga=v.periodoTramoCarga;
	    	
	    	tramos.push(tramo);
	    	var inicio="#updateInicioTramo"+v.letraTramoCarga; 
	    	var fin="#updateFinTramo"+v.letraTramoCarga;
	    	var monto="#updateMontoTramo"+v.letraTramoCarga;
	    	
	    	$(inicio).val(formatearAMoneda(v.inicioTramoCarga));
	    	fintramo=parseInt(v.finTramoCarga)>99999999?"Y MAS":formatearAMoneda(v.finTramoCarga);
	    	
	    	$(fin).val(fintramo);
	    	$(monto).val(formatearAMoneda(v.montoTramoCarga));
	    		
	    		
	    		
	    	
	    	});
	    	
	    	
	    	$("#updateMTramoModal").modal("toggle");
	    	


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
	      })
	    }
	  });
	}





/*---------------Update Document--------------- */

function updateTramo() {
  $id = $("#editarIdTramo").val();
  $("#editarTramoModal").modal("toggle");
  $.ajax({
	    type: "GET",
	    async: false,
	    url: "/simpleWeb/json/work/tramo/readTramo/"+$id,
	    beforeSend: function(xhr) {
	      xhr.setRequestHeader("Accept", "application/json");
	      xhr.setRequestHeader("Content-Type", "application/json");
	    },
	    success: function(data) {
	    	data.idTramoCarga=$id;
	    	data.descripcionTramoCarga=$("#editarNombreTramo").val();

	    	data.inicioTramoCarga=$("#editarInicioTramo").val();	    	
	    	data.finTramoCarga=$("#editarFinTramo").val();
	    	$.ajax({
	    	    type: "POST",
	    	    async: false,
	    	    url: "/simpleWeb/json/work/tramo/updateTramo/",
	    	    data: JSON.stringify(data),
	    	    beforeSend: function(xhr) {
	    	      xhr.setRequestHeader("Accept", "application/json");
	    	      xhr.setRequestHeader("Content-Type", "application/json");
	    	    },
	    	    success: function(data) {
	    	    	swal({
	    	            position: "top-end",
	    	            type: "success",
	    	            title: "Tramo Actualizado",
	    	            showConfirmButton: false,
	    	            timer: 550
	    	          }).then(function(result){
	    	        	 
	    	            location.reload();
	    	          });
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
function upTramos(){
	
	
	$.each(tramos, function(k, v) {    	
    	var inicio=v.letraTramoCarga=='A'?v.inicioTramoCarga:moneyToText($("#updateInicioTramo"+v.letraTramoCarga).val());
    	var fin=v.letraTramoCarga=='D'? v.finTramoCarga: moneyToText($("#updateFinTramo"+v.letraTramoCarga).val());
    	var monto=moneyToText($("#updateMontoTramo"+v.letraTramoCarga).val());
    	v.inicioTramoCarga=inicio;
    	v.finTramoCarga=fin;
    	v.montoTramoCarga=monto;
    	
    	});
	
	$.ajax({
	    type: "POST",
	    async: false,
	    url: "/simpleWeb/json/work/tramo/updateTramosByPeriodo/"+tramos[0].periodoTramoCarga,
	    data: JSON.stringify(tramos),
	    beforeSend: function(xhr) {
	      xhr.setRequestHeader("Accept", "application/json");
	      xhr.setRequestHeader("Content-Type", "application/json");
	    },
	    success: function(data) {
	    	$("#updateMTramoModal").modal("toggle");
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
	    },
	    complete:function(){
	    	alerta("Tramo Actualizado");
	    	location.reload();
	    }
	  });
	 
}
function getPeriodos(){
	$.ajax({
		  type: "GET",
	      async: true,			    
		  url: "/simpleWeb/json/work/tramo/getPeriodos/",			  
		  success:function (data){			  
			  
			  var newOption1 = new Option("seleccionar..", "0", true, true);
			  $("#selectorPeriodo").append(newOption1);
			 
			    $.each(data, function(k, v) {		    
			    	if ($('#selectorPeriodo').find("option[value='" + v.periodoTramoCarga + "']").length) {
			    		 $('#selectorPeriodo').val(v.periodoTramoCarga);
			    	} else { 
			    	    // Create a DOM Option and pre-select by default
			    		var p=""+v.periodoTramoCarga;
					      var a=p.substring(0, 4);
					      var b=p.substring(4, 6);
					      var periodo= b+"-"+a;
			    		
			    		
			    	    var newOption = new Option(periodo, v.periodoTramoCarga, true, true);
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
function mostrarPeriodo($this){
	$("#loading").show();
	var periodo=$this.value;
	
	if(periodo==0){
		$("#loading").hide();
	}
	else{
	
	var table;
	  
	  if ( $.fn.dataTable.isDataTable( '#tbl_Tramo' ) ) {
		    table = $('#tbl_Tramo').DataTable();
		    table.clear();
		}
		else {
		    table = $('#tbl_Tramo').DataTable( 
		    	{
		    		searching: false,
		    		paging: false,
		    		info: false,
		    		search: false,
		    		"columnDefs": [
		    		               { className: "text-center", "targets": [ 0,1,2,3,4 ] }
		    		             ]
		    	}
		    )
		}
	  //$("#loading").fade();
	  $.ajax({
		  type: "GET",
	      async: false,
		  dataType: "json",	  
		  url: "/simpleWeb/json/work/tramo/getTramosByPeriodo/"+periodo,	  
		  processData: false,
		  contentType: false,
		  success:function (data){
			
			    $.each(data, function(k, v) {
			    	 //var acciones="<button title='Actualizar' id='"+k+"' onclick=\"javascript:modificarTramo('" +v.idTramoCarga + "')\" class='btn btn-circle green btn-outline btn-sm col-md-4 margin-left-7'><i class='fa fa-pencil-square-o fa-lg'></i></button>"; 	
				      
				      var desde=formatearAMoneda(v.inicioTramoCarga);
				      var hasta=parseInt(v.finTramoCarga)>10000000? "Y Más": formatearAMoneda(v.finTramoCarga);	  
				      
				      var p=""+v.periodoTramoCarga;
				      var a=p.substring(0, 4);
				      var b=p.substring(4, 6);
				      var periodo= b+"-"+a;
				      
				      table.row.add([  v.letraTramoCarga, desde, hasta, formatearAMoneda( v.montoTramoCarga),periodo ]);
			      
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
			  
		  },
		  complete:function(){
			  $("#loading").hide();
		  }
			  
		});}
}
