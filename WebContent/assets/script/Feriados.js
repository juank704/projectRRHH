$(document).ready(function() {
  $("#loading").show();
  onLoadFeriado();
  llenarRegiones();
});
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
function cerrarModalAgregar(){
	$("#hwa").css("display", "none");
	$("#agregarFeriadoModal").modal("toggle");
}
/*--------------submits--------------------------*/
$("#insertFeriadoForm").submit(function(event) {
	 event.preventDefault();
	 var text="tienes algunos errores, Revisa el campo ";
	 var nombre=$("#agregarNombreFeriado").val();
	 var fecha=$("#agregarFechaFeriado").val();
	 var region=$("#agregarSelectRegion").val();
	 var datos=new Array();
	 
	 
	 
	 if(nombre=="" || fecha=="" || region==0)
	 {
		 if(nombre=="")
	    	{
	    		datos.push("nombre");
	    	}
	    	if(fecha=="")
	    	{
	    		datos.push("fecha");
	    	}
	    	if(region=="0")
	    	{
	    		datos.push("region");
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
	    	$("#hwa").css("display","block");
	    	$("#textohwa").html(text);
	 }
	 else{
		 var holiday=new Object();
		 holiday.nombreFeriado=nombre;
		 holiday.fechaFeriado=fecha;
		 var date=fecha.split("-");
		 date[2]=parseInt(date[2])+1;
		 
		 if(date[2]<10)
		 {
			 date[2]="0"+date[2];
			 
		 }
		 holiday.fechaFeriado=date[0]+"-"+date[1]+"-"+date[2];
		 
		 holiday.idRegion=region;
	
		 
		 
		 
		 $.ajax({
		        type: "POST",
		        async: false,
		        url: "/simpleWeb/json/work/holidays/validateHoliday/",
		        data: JSON.stringify(holiday),
		        beforeSend: function(xhr) {
		          xhr.setRequestHeader("Accept", "application/json");
		          xhr.setRequestHeader("Content-Type", "application/json");
		        },
		        success: function(data) {
		        	if(data==true)
		        	{
		        		$("#agregarFeriadoModal").modal("toggle");
		        		
		        	
		       		 addFeriado();
		       		 location.reload();
		        	}
		        	else if(data=="true"){
		        		alerta("pase prueba de string");
		        	}
		        	else{
		        		alerta("Ya existe un feriado asignado a esa fecha, pase prueba");
		        	}
		          
		        },
		        error: function(ex) {

		         alert(JSON.stringify(ex));
		          
		        }
		      });
	 }
});

$("#editFeriadoForm").submit(function(event) {
  event.preventDefault();

  updateFeriado();
});
function llenarRegiones(){
  $.ajax({
	    type: "GET",
    url: '/simpleWeb/json/work/getAllRegion', 
    dataType: "json",
    success: function(data){
    	$("#editarSelectRegion").append('<option value=0>Seleccionar...</option>');
    	$("#agregarSelectRegion").append('<option value=0>Seleccionar...</option>');
    	$.each(data,function(key, registro) {
        $("#editarSelectRegion").append('<option value='+registro.idregion+'>'+registro.region+'</option>');
        $("#agregarSelectRegion").append('<option value='+registro.idregion+'>'+registro.region+'</option>');
     
    	});        
    },
    error: function(data) {
      alert('error');
    }
  });
	
}

/*-----------------CRUD-----------------------*/
/*-----------------onload-----------------------*/
function onLoadFeriado() {
  readFeriados();
}
/*-----------------Read-----------------------*/
function readFeriados() {
	var table;	
	 if ( $.fn.dataTable.isDataTable("#tbl_feriado") ) {
	    table = $("#tbl_feriado").DataTable();
	    table.clear();
	}
	else {
	    table = $("#tbl_feriado").DataTable( 
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
	  dataType: "json",	  
	  url: "/simpleWeb/json/work/holidays/getHolidays/",	  
	  processData: false,
	  contentType: false,
	  success:function (data){
		  
		    $.each(data, function(k, v) {
		    	var acciones = ""
			   		acciones +=		"<button title='Actualizar' id='"+k+"' onclick=\"javascript:modificarMant('" +v.idFeriado + "')\" class='btn btn-circle green btn-outline btn-sm col-md-4 margin-left-7'><i class='fa fa-pencil-square-o fa-lg'></i></button>";
			   	 	acciones +=		"<button title='Borrar' id='" +k+"' onclick=\"javascript:borrarMant("+v.idFeriado+")\" class='btn btn-circle red btn-outline btn-sm col-md-4'><i class='fa fa-trash-o fa-lg'></i></button>";		
			   	 var date=v.fechaFeriado.split("-");
	       		 v.fechaFeriado=date[2]+"-"+date[1]+"-"+date[0];
	       		
			   	 table.row.add([  k+1, v.nombreFeriado, v.fechaFeriado, v.nombreRegion, acciones]); 		
		    	
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

/*-----------------Create-----------------------*/

function addFeriado() {
  var holiday= new Object();
  var newHoliday;
      holiday.nombreFeriado = $("#agregarNombreFeriado").val();
      holiday.fechaFeriado = $("#agregarFechaFeriado").val();
      var date=holiday.fechaFeriado.split("-");
		 date[2]=parseInt(date[2])+1;
		 
		 if(date[2]<10)
		 {
			 date[2]="0"+date[2];
		 }
		 holiday.fechaFeriado=date[0]+"-"+date[1]+"-"+date[2];
      holiday.descripcionFeriado = $("#agregarDescripcionFeriado").val();
      holiday.idRegion = $("#agregarSelectRegion").val();
      
      $.ajax({
        type: "PUT",
        async: false,
        url: "/simpleWeb/json/work/holidays/createHoliday/",
        data: JSON.stringify(holiday),
        beforeSend: function(xhr) {
          xhr.setRequestHeader("Accept", "application/json");
          xhr.setRequestHeader("Content-Type", "application/json");
        },
        success: function(data) {
        		alerta("Feriado creado");
            location.reload();
          
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
      deleteFeriado($id);
      
    }
  });
}
/*----------------Delete function------------------------*/

function deleteFeriado($id) {
  $.ajax({
    type: "PUT",
    async: false,
    url: "/simpleWeb/json/work/holidays/deleteHolidays/" + $id,

    beforeSend: function(xhr) {
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
    },
    success: function(data) {
    	alerta("Feriado borrado con éxito");
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
/*----------------Modify------------------------*/
function modificarMant($id) {
  $.ajax({
    type: "GET",
    async: false,
    
    url: "/simpleWeb/json/work/holidays/readHoliday/"+$id,
    
    success: function(data) {
    	
      $("#editarIdFeriado").val(data.idFeriado);
      $("#editarNombreFeriado").val(data.nombreFeriado);
      
      
      
      $("#editarFechaFeriado").val(data.fechaFeriado);
      $("#editarDescripcionFeriado").val(data.descripcionFeriado);
      
      
      $("#editarSelectRegion option").each(function(){
    	  if ($(this).val() == data.idRegion)
    	    $(this).attr("selected","selected");
    	});
      //pzfgd critica funcional
      $("#editarFeriadoModal").modal("toggle");
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

/*----------------Create------------------------*/
function agregarFeriado() {
  $("#agregarFeriadoModal").modal("toggle");
}
/*---------------Update Document--------------- */

function updateFeriado() {
  $id = $("#editarIdFeriado").val();
  var holiday;
  $.ajax({
	    type: "GET",
	    async: false,
	    url: "/simpleWeb/json/work/holidays/readHoliday/"+$id,
	    beforeSend: function(xhr) {
	      xhr.setRequestHeader("Accept", "application/json");
	      xhr.setRequestHeader("Content-Type", "application/json");
	    },
	    success: function(data) {
	    	
	    	
	    	holiday = data;
	    	holiday.idFeriado=$id;
	    	holiday.nombreFeriado = $("#editarNombreFeriado").val();	      
	    
	      holiday.fechaFeriado = $("#editarFechaFeriado").val();
	      holiday.descripcionFeriado = $("#editarDescripcionFeriado").val();
	      holiday.idRegion = $("#editarSelectRegion").val();
	    	
	      $.ajax({
		        type: "POST",
		        async: false,
		        url: "/simpleWeb/json/work/holidays/validateHoliday/",
		        data: JSON.stringify(holiday),
		        beforeSend: function(xhr) {
		          xhr.setRequestHeader("Accept", "application/json");
		          xhr.setRequestHeader("Content-Type", "application/json");
		        },
		        success: function(data) {
		       
		        	if(data==true)
		        	{
		        		$("#agregarFeriadoModal").modal("toggle");
		        		var date=holiday.fechaFeriado.split("-");
		       		 date[2]=parseInt(date[2])+1;
		       		 
		       		 if(date[2]<10)
		       		 {
		       			 date[2]="0"+date[2];
		       			 
		       		 }
		       		 holiday.fechaFeriado=date[0]+"-"+date[1]+"-"+date[2];
		       		
		        		
		        		uFeriado(holiday);
		       		 	location.reload();
		        	}
		        	else if(data=="true"){
		        		alerta("pase prueba de string");
		        	}
		        	else{
		        		alerta("Ya existe un feriado asignado a esa fecha");
		        	}
		          
		        },
		        error: function(ex) {

		         alert(JSON.stringify(ex));
		          
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

function uFeriado($holiday)
{
	
	$.ajax({
	    type: "POST",
	    async: false,
	    url: "/simpleWeb/json/work/holidays/updateHoliday/",
	    data: JSON.stringify($holiday),
	    beforeSend: function(xhr) {
	      xhr.setRequestHeader("Accept", "application/json");
	      xhr.setRequestHeader("Content-Type", "application/json");
	    },
	    success: function(data) {
	    	alerta("Feriado modificado con éxito");
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






