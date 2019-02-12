var DatoCampo=new Object();
$("#editarRutRep").rut();
$( document ).ready(function() {
	
	getDatosCampo(); 
	
});




function getDatosCampo(){
	var table;	
	 if ( $.fn.dataTable.isDataTable("#tbl_DT") ) {
	    table = $("#tbl_DT").DataTable();
	    table.clear();
	}
	else {
	    table = $("#tbl_DT").DataTable( 
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
		  url: "/simpleWeb/json/work/DatosCampo/getDatosCampo/",	  
		  processData: false,
		  contentType: false,
		  success:function (data){
			  $.each(data, function(k, v) {

			    	var acciones = ""
			   		acciones +=		"<button title='Actualizar' id='"+k+"' onclick=\"javascript:modificarMant('" +v.codigo + "')\" class='btn btn-circle green btn-outline btn-sm col-md-6 col-md-offset-3'><i class='fa fa-pencil-square-o fa-lg'></i></button>";
			    	table.row.add([  k+1, v.descripcion, v.direccion_huerto, v.representante_legal_apPaterno, v.representante_legal_apMaterno, v.representante_legal_nombre,v.representante_legal_rut, v.numero_telefono, v.ciudad_huerto, v.comuna_huerto, acciones]);
			   	 	
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
	    url: "/simpleWeb/json/work/DatosCampo/getDatosCampoById/" + $id,
	    success: function(data) {
	    	
	    	console.log(data);

	    	DatoCampo.codigo=data.codigo;
	    	DatoCampo.campo=data.campo;
	    	DatoCampo.sociedad=data.sociedad;
	    	DatoCampo.descripcion=data.descripcion;
	    	DatoCampo.direccion_huerto=data.direccion_huerto;
	    	DatoCampo.representante_legal_apPaterno=data.representante_legal_apPaterno;
	    	DatoCampo.representante_legal_apMaterno=data.representante_legal_apMaterno;
	    	DatoCampo.representante_legal_nombre=data.representante_legal_nombre;
	    	DatoCampo.representante_legal_rut=data.representante_legal_rut;
	    	DatoCampo.numero_telefono=data.numero_telefono;
	    	DatoCampo.ciudad_huerto=data.ciudad_huerto;
	    	DatoCampo.comuna_huerto=data.comuna_huerto;
	    	$("#editarCiuHuerto").val(DatoCampo.ciudad_huerto);
	    	$("#editarComHuerto").val(DatoCampo.comuna_huerto);
	    	$("#editarDireccionDT").val(DatoCampo.direccion_huerto);
	    	$("#editarNombreRep").val(DatoCampo.representante_legal_nombre);
	    	$("#editarApPatRep").val(DatoCampo.representante_legal_apPaterno);
	    	$("#editarApMatRep").val(DatoCampo.representante_legal_apMaterno);
	    	$("#editarRutRep").val(DatoCampo.representante_legal_rut);
	    	$("#editarTelRep").val(DatoCampo.numero_telefono);
	    	
	    	
	    	
	    	
	    	
	    	
	    	
	      
	      //parte critica funcional
	      $("#editarDTModal").modal("toggle");
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
$("#editDTForm").submit(function(event) {
	  event.preventDefault();
	  DatoCampo.direccion_huerto=$("#editarDireccionDT").val();
  	DatoCampo.representante_legal_apPaterno=$("#editarApPatRep").val();
  	DatoCampo.representante_legal_apMaterno=$("#editarApMatRep").val();
  	DatoCampo.representante_legal_nombre=$("#editarNombreRep").val();
  	DatoCampo.representante_legal_rut=$("#editarRutRep").val();
  	DatoCampo.numero_telefono=$("#editarTelRep").val();
  	DatoCampo.ciudad_huerto=$("#editarCiuHuerto").val();
  	DatoCampo.comuna_huerto=$("#editarComHuerto").val();
	  updateDC();
	});
function updateDC() {
	  $.ajax({
	    type: "POST",
	    async: false,
	    url: "/simpleWeb/json/work/DatosCampo/updateDatosCampo/",
	    data: JSON.stringify(DatoCampo),
	    beforeSend: function(xhr) {
	      xhr.setRequestHeader("Accept", "application/json");
	      xhr.setRequestHeader("Content-Type", "application/json");
	    },
	    success: function(data) {
	    	$("#editarDTModal").modal("toggle");
	    	alerta("Datos del Campo Actualizado");
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

