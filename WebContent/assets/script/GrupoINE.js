var GrupoINE=new Object();
$( document ).ready(function() {
	llenarSelectorGO();
	llenarSelectorEmpresa();
	llenarSelectorCargos();
	getGruposINE()
	
});
function llenarSelectorGO()
{
	$.ajax({
		  type: "GET",
	      async: false,
		  dataType: "json",	  
		  url: "/simpleWeb/json/work/getParametros/GRUPOS_OCUPACIONALES/",	  
		  processData: false,
		  contentType: false,
		  success:function (data){
			  $("#editarNombreGrupoINE").append('<option value=-1>Seleccionar...</option>');
			  $("#agregarNombreGrupoINE").append('<option value=-1>Seleccionar...</option>');
		    	$.each(data,function(key, registro) {
		        $("#editarNombreGrupoINE").append('<option value='+registro.llave+'>'+registro.descripcion+'</option>');
		        $("#agregarNombreGrupoINE").append('<option value='+registro.llave+'>'+registro.descripcion+'</option>');
		     
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
function llenarSelectorEmpresa()
{
	$.ajax({
		  type: "GET",
	      async: false,
		  dataType: "json",	  
		  url: "/simpleWeb/json/work/Empresas/getEmpresas/",	  
		  processData: false,
		  contentType: false,
		  success:function (data){
			  		$("#editarEmpresaGrupoINE").append('<option value=-1>Seleccionar...</option>');
			  		$("#agregarEmpresaGrupoINE").append('<option value=-1>Seleccionar...</option>');
			  $.each(data,function(key, registro) {
			        $("#editarEmpresaGrupoINE").append('<option value='+registro.idSociedad+'>'+registro.denominacionSociedad+'</option>');
			        $("#agregarEmpresaGrupoINE").append('<option value='+registro.idSociedad+'>'+registro.denominacionSociedad+'</option>');
			     
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
function llenarSelectorCargos()
{

	$.ajax({
		  type: "GET",
	      async: false,
		  dataType: "json",	  
		  url: "/simpleWeb/json//work/cargos/getCargos/",	  
		  processData: false,
		  contentType: false,
		  success:function (data){
			  		$("#editarCargoGrupoINE").append('<option value=-1>Seleccionar...</option>');
			  		$("#agregarCargoGrupoINE").append('<option value=-1>Seleccionar...</option>');
			  $.each(data,function(key, registro) {
			        $("#editarCargoGrupoINE").append('<option value='+registro.id_cargo+'>'+registro.cargos+'</option>');
			        $("#agregarCargoGrupoINE").append('<option value='+registro.id_cargo+'>'+registro.cargos+'</option>');
			     
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

function getGruposINE()
{
	var table;	
	 if ( $.fn.dataTable.isDataTable("#tbl_GrupoINE") ) {
	    table = $("#tbl_GrupoINE").DataTable();
	    table.clear();
	}
	else {
	    table = $("#tbl_GrupoINE").DataTable( 
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
		  url: "/simpleWeb/json/work/GruposINE/getGruposINE/",	  
		  processData: false,
		  contentType: false,
		  success:function (data){
			  $.each(data, function(k, v) {
			    	var acciones = ""
			   		acciones +=		"<button title='Actualizar' id='"+k+"' onclick=\"javascript:modificarMant('" +v.idGrupoINE + "')\" class='btn btn-circle green btn-outline btn-sm col-md-4 col-md-offset-2'><i class='fa fa-pencil-square-o fa-lg'></i></button>";
			    	acciones +="<button title='Borrar' id='" +k+"' onclick=\"javascript:borrarMant("+v.idGrupoINE+")\" class='btn btn-circle red btn-outline btn-sm col-md-4'><i class='fa fa-trash-o fa-lg'></i></button>";
			    	table.row.add([  k+1, v.nombreGrupoOcupacional, v.nombreCargo, v.nombreEmpresa, acciones]);
			   	 	2
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
	    url: "/simpleWeb/json/work/GruposINE/getGrupoINEById/" + $id,
	    success: function(data) {
	    	
	    	GrupoINE.idGrupoINE=data.idGrupoINE;
	    	GrupoINE.idGrupoOcupacional=data.idGrupoOcupacional;
	    	GrupoINE.nombreGrupoOcupacional=data.nombreGrupoOcupacional;
	    	GrupoINE.idCargo=data.idCargo;
	    	GrupoINE.nombreCargo=data.nombreCargo;
	    	GrupoINE.idEmpresa=data.idEmpresa;
	    	GrupoINE.nombreEmpresa=data.nombreEmpresa;
	    	
	    	
	      $("#editarIdGrupoINE").val(data.idSociedad);
	      $("#editarNombreGrupoINE > option[value='"+GrupoINE.idGrupoOcupacional+"']").attr('selected', 'selected');
	      $("#editarCargoGrupoINE > option[value='"+GrupoINE.idCargo+"']").attr('selected', 'selected');
	      $("#editarEmpresaGrupoINE > option[value='"+GrupoINE.idEmpresa+"']").attr('selected', 'selected');
	      
	      
	      //parte critica funcional
	      $("#editarGrupoINEModal").modal("toggle");
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
$("#insertGrupoINEForm").submit(function(event) {
	  event.preventDefault();
	  insertGrupoINE();
	});
function insertGrupoINE() {
	 
	  GrupoINE.idGrupoOcupacional=$("#agregarNombreGrupoINE").val();
	  GrupoINE.idCargo=$("#agregarCargoGrupoINE").val();	  
	  GrupoINE.idEmpresa=$("#agregarEmpresaGrupoINE").val();
	  
	  
	  
	  
	  $.ajax({
  	    type: "PUT",
  	    async: false,
  	    url: "/simpleWeb/json/work/GruposINE/createGrupoINE/",
  	    data: JSON.stringify(GrupoINE),
  	    beforeSend: function(xhr) {
  	      xhr.setRequestHeader("Accept", "application/json");
  	      xhr.setRequestHeader("Content-Type", "application/json");
  	    },
  	    success: function(data) {
  	    	$("#editarGrupoINEModal").modal("toggle");
  	    	alerta("GrupoINE Actualizado");
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
$("#editGrupoINEForm").submit(function(event) {
	  event.preventDefault();
	  updateGrupoINE();
	});
function updateGrupoINE() {
	  $id = $("#editarIdGrupoINE").val();
	  GrupoINE.idGrupoOcupacional=$("#editarNombreGrupoINE").val();
	  GrupoINE.idCargo=$("#editarCargoGrupoINE").val();	  
	  GrupoINE.idEmpresa=$("#editarEmpresaGrupoINE").val();
	  
	  
	  
	  
	  $.ajax({
  	    type: "POST",
  	    async: false,
  	    url: "/simpleWeb/json/work/GruposINE/updateGrupoINE/",
  	    data: JSON.stringify(GrupoINE),
  	    beforeSend: function(xhr) {
  	      xhr.setRequestHeader("Accept", "application/json");
  	      xhr.setRequestHeader("Content-Type", "application/json");
  	    },
  	    success: function(data) {
  	    	$("#editarGrupoINEModal").modal("toggle");
  	    	alerta("GrupoINE Actualizado");
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
	      deleteTurno($id);
	    }
	  });
	}
	/*----------------Delete function------------------------*/

	function deleteTurno($id) {
	  $.ajax({
	    type: "PUT",
	    async: false,
	    url: "/simpleWeb/json/work/GruposINE/deleteGrupoINEById/" + $id,

	    beforeSend: function(xhr) {
	      xhr.setRequestHeader("Accept", "application/json");
	      xhr.setRequestHeader("Content-Type", "application/json");
	    },
	    success: function(data) {
	      alerta("Grupo INE Borrado");
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
function cerrarUpdate()
{
	$("#editarGrupoINEModal").modal("toggle");
}
function agregarGrupoINE(){
	$("#agregarGrupoINEModal").modal("toggle");
}
function cerrarModalAgregar(){
	 $("#agregarNombreGrupoINE > option[value='-1']").attr('selected', 'selected');
     $("#agregarCargoGrupoINE > option[value='-1']").attr('selected', 'selected');
     $("#agregarEmpresaGrupoINE > option[value='-1']").attr('selected', 'selected');
     $("#agregarGrupoINEModal").modal("toggle");
	
}


