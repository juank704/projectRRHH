var Correo=new Object();
$( document ).ready(function() {
	
	getCorreos(); 
	
});
function getCorreos()
{
	var table;	
	 if ( $.fn.dataTable.isDataTable("#tbl_Correo") ) {
	    table = $("#tbl_Correo").DataTable();
	    table.clear();
	}
	else {
	    table = $("#tbl_Correo").DataTable( 
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
		  url: "/simpleWeb/json/work/Correos/getCorreos/",	  
		  processData: false,
		  contentType: false,
		  success:function (data){
			  $.each(data, function(k, v) {
			    	var acciones = ""
			   		acciones +=		"<button title='Actualizar' id='"+k+"' onclick=\"javascript:modificarMant('" +v.id + "')\" class='btn btn-circle green btn-outline btn-sm col-md-6 col-md-offset-3'><i class='fa fa-pencil-square-o fa-lg'></i></button>";
			    	table.row.add([  k+1, v.codigo, v.descripcion, acciones]);
			   	 	
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


function modificarMant($id)
{
	$.ajax({
	    type: "GET",
	    async: false,
	    url: "/simpleWeb/json/work/Correos/getCorreoById/" + $id,
	    success: function(data) {
	    	Correo.id=data.id;
	    	Correo.codigo=data.codigo;
	    	Correo.descripcion=data.descripcion;
	    	Correo.llave=data.llave;
	    	
	    	
	      $("#editarIdCorreo").val(Correo.id);
	      $("#editarTipoCorreo").val(Correo.codigo);
	      $("#editarCorreo").val(Correo.descripcion); 
	      
	      
	      //parte critica funcional
	      $("#editarCorreoModal").modal("toggle");
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
$("#editCorreoForm").submit(function(event) {
	  event.preventDefault();
	  updateCorreo();
	});
function updateCorreo() {
	 
	  Correo.codigo=$("#editarTipoCorreo").val();	  
	  Correo.descripcion=$("#editarCorreo").val();
	  
	  $.ajax({
  	    type: "POST",
  	    async: false,
  	    url: "/simpleWeb/json/work/Correos/updateCorreo/",
  	    data: JSON.stringify(Correo),
  	    beforeSend: function(xhr) {
  	      xhr.setRequestHeader("Accept", "application/json");
  	      xhr.setRequestHeader("Content-Type", "application/json");
  	    },
  	    success: function(data) {
  	    	$("#editarCorreoModal").modal("toggle");
  	    	alerta("Correo Actualizado");
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
	$("#editarCorreoModal").modal("toggle");
}
