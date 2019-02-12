var Faena=new Object();
$( document ).ready(function() {
	llenarSelectores();
	getFaenas(); 
	
});
function llenarSelectores()
{
	$.ajax({
		  type: "GET",
	      async: false,
		  dataType: "json",	  
		  url: "/simpleWeb/json/work/Empresas/getEmpresas/",	  
		  processData: false,
		  contentType: false,
		  success:function (data){
		        $("#agregarEmpresaFaena").append('<option value=-1>Seleccionar...</option>');
			  		
			  $.each(data,function(key, registro) {
			        $("#editarEmpresaFaena").append('<option value='+registro.idSociedad+'>'+registro.denominacionSociedad+'</option>');
			        $("#agregarEmpresaFaena").append('<option value='+registro.idSociedad+'>'+registro.denominacionSociedad+'</option>');
			     
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

function searchNombre(){
	var table = $('#tbl_faena').DataTable();
	var value=$("#searchNombre").val();

	
	table.column(1).search(value).draw();
}

function getFaenas()
{
	var table;	
	 if ( $.fn.dataTable.isDataTable("#tbl_faena") ) {
	    table = $("#tbl_faena").DataTable();
	    table.clear();
	}
	else {
	    table = $("#tbl_faena").DataTable( 
	    	{
	    		searching: true,
	    		paging:true,
	    		info: false,
	    		search: true,
	    		autoWidth: true
	    	}
	    )	    
	}
	  $.ajax({
		  type: "GET",
	      async: false,
		  dataType: "json",	  
		  url: "/simpleWeb/json/work/Faenas/getFaenas/",	  
		  processData: false,
		  contentType: false,
		  success:function (data){
			  $.each(data, function(k, v) {
				  var acciones="";
				   acciones += "<button title='Actualizar' id='"+k+"' onclick=\"javascript:modificarMant('" +v.idFaena + "')\" class='btn btn-circle green btn-outline btn-sm col-md-4 col-md-offset-2'><i class='fa fa-pencil-square-o fa-lg'></i></button>";
			    	acciones +="<button title='Borrar' id='" +k+"' onclick=\"javascript:borrarMant("+v.idFaena+")\" class='btn btn-circle red btn-outline btn-sm col-md-4'><i class='fa fa-trash-o fa-lg'></i></button>";
			    	table.row.add([  v.idFaena, v.nombreFaena, v.nombreEmpresa, acciones]);
			   	 	
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

function modificarMant($id)
{
	$.ajax({
	    type: "GET",
	    async: false,
	    url: "/simpleWeb/json/work/Faenas/getFaenaById/" + $id,
	    success: function(data) {
	    	Faena.idFaena=data.idFaena;
	    	Faena.nombreFaena=data.nombreFaena;
	    	Faena.idEmpresa=data.idEmpresa;
	    	Faena.nombreEmpresa=data.nombreEmpresa;
	    	
	    	
	      $("#editarIdFaena").val(data.idFaena);
	      $("#editarNombreFaena").val(Faena.nombreFaena);
	      $("#editarEmpresaFaena").val(Faena.idEmpresa);   
	     
	      
	      //parte critica funcional
	      $("#editarFaenaModal").modal("toggle");
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
$("#editFaenaForm").submit(function(event) {
	  event.preventDefault();
	  updateFaena();
	});
function updateFaena() {
	  $id = $("#editarIdFaena").val();
	  Faena.nombreFaena=$("#editarNombreFaena").val();
	  Faena.idEmpresa=$("#editarEmpresaFaena").val();	
	  $.ajax({
  	    type: "POST",
  	    async: false,
  	    url: "/simpleWeb/json/work/Faenas/updateFaena/",
  	    data: JSON.stringify(Faena),
  	    beforeSend: function(xhr) {
  	      xhr.setRequestHeader("Accept", "application/json");
  	      xhr.setRequestHeader("Content-Type", "application/json");
  	    },
  	    success: function(data) {
  	    	$("#editarFaenaModal").modal("toggle");
  	    	alerta("Faena Actualizada");
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

function cerrarUpdate()
{
	$("#editarFaenaModal").modal("toggle");
}
function cerrarAgregar(){

	$("#agregarFaenaModal").modal("toggle");
	
}


function agregarFaena(){
	$("#agregarNombreFaena").val("");
	$("#agregarEmpresaFaena").val(-1);
		
	$("#agregarFaenaModal").modal("toggle");
}

$("#insertFaenaForm").submit(function(event) {
	  event.preventDefault();
	  insertFaena();
	});
function insertFaena() {
	 
	  Faena.nombreFaena=$("#agregarNombreFaena").val();
	  Faena.idEmpresa=$("#agregarEmpresaFaena").val();
	  
	  if(Faena.idEmpresa!=-1){
	  
	  $.ajax({
	    type: "PUT",
	    async: false,
	    url: "/simpleWeb/json/work/Faenas/createFaena/",
	    data: JSON.stringify(Faena),
	    beforeSend: function(xhr) {
	      xhr.setRequestHeader("Accept", "application/json");
	      xhr.setRequestHeader("Content-Type", "application/json");
	    },
	    success: function(data) {
	    	$("#agregarFaenaModal").modal("toggle");
	    	alerta("Faena Creada");
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
	  else{
		  $("#fwa").css("display","block");
		  
	  }
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
	      deleteFaena($id);
	      
	    }
	  });
	}
	/*----------------Delete function------------------------*/

	function deleteFaena($id) {
	  $.ajax({
	    type: "PUT",
	    async: false,
	    url: "/simpleWeb/json/work/Faenas/deleteFaenaById/" + $id,

	    beforeSend: function(xhr) {
	      xhr.setRequestHeader("Accept", "application/json");
	      xhr.setRequestHeader("Content-Type", "application/json");
	    },
	    success: function(data) {
	    	alerta("Faena borrada con éxito");
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

