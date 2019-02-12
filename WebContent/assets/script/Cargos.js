var cargo=new Object();
$( document ).ready(function() {
	getCargos(); 
	llenarSelector();
});
function selectorSociedad($this){
	var valor= $this.value;
	
	var url="/simpleWeb/json/work/cargos/getCargos/";
	if(valor!=0){
		url="/simpleWeb/json/work/cargos/getCargoBySoc/"+valor;
	}
	
	var table;	
	 if ( $.fn.dataTable.isDataTable("#tbl_cargos") ) {
	    table = $("#tbl_cargos").DataTable();
	    table.clear();
	}
	else {
	    table = $("#tbl_cargos").DataTable( 
	    	{
	    		searching: false,
	    		paging:true,
	    		info: false,
	    		search: false, 
	    		"sPaginationType": "full_numbers"
	    	}
	    )	    
	}
	  $.ajax({
		  type: "GET",
	      async: false,
		  dataType: "json",	  
		  url: url,	  
		  processData: false,
		  contentType: false,
		  success:function (data){
			  $.each(data, function(k, v) {
				
			    	var acciones = "";
			    		
			   		acciones +=		"<button title='Actualizar' id='"+k+"' onclick=\"javascript:modificarMant('" +v.id_cargo + "')\" class='btn btn-circle green btn-outline btn-sm col-md-5'><i class='fa fa-pencil-square-o fa-lg'></i></button>";
			    	acciones +=		"<button title='Borrar' id='" +k+"' onclick=\"javascript:borrarMant("+v.id_cargo+")\" class='btn btn-circle red btn-outline btn-sm col-md-5'><i class='fa fa-trash-o fa-lg'></i></button>";
			    	table.row.add([  k+1, v.cargos,v.denominacionSociedad, v.sueldoBase, acciones]);
			   	 	
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
function llenarSelector(){
	
	$.ajax({
		  type: "GET",
	      async: false,			    
		  url: "/simpleWeb/json/work/solicitud/getEmpresas/",			  
		  success:function (data){
			
			  var newOption1 = new Option("seleccionar..", "0", true, true);
			  $("#agregarSelectorEmpresa").append(newOption1);
			  var newOption2 = new Option("seleccionar..", "0", true, true);
			  $("#editarSelectorEmpresa").append(newOption2);
			  var newOption3 = new Option("seleccionar..", "0", true, true);
			  $("#selectorSociedad").append(newOption2);
			  $.each(data, function(k, v) {
				  if(v.idSociedad!=-1){
			    	if ($('#selectorEmpresa').find("option[value='" + v.sociedad + "']").length) {
			    		
			    	} else { 
			    	    // Create a DOM Option and pre-select by default
			    	    var newOption0 = new Option(v.denominacionSociedad, v.sociedad, true, true);
			    	    // Append it to the select
			    	    $('#agregarSelectorEmpresa').append(newOption0);
			    	    var newOption = new Option(v.denominacionSociedad, v.sociedad, true, true);
			    	    // Append it to the select
			    	    $('#editarSelectorEmpresa').append(newOption);
			    	    var newOption4 = new Option(v.denominacionSociedad, v.sociedad, true, true);
			    	    // Append it to the select
			    	    $('#selectorSociedad').append(newOption4);
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


function getCargos()
{
	var table;	
	 if ( $.fn.dataTable.isDataTable("#tbl_cargos") ) {
	    table = $("#tbl_cargos").DataTable();
	    table.clear();
	}
	else {
	    table = $("#tbl_cargos").DataTable( 
	    	{
	    		searching: false,
	    		paging:true,
	    		info: false,
	    		search: false, 
	    		"sPaginationType": "full_numbers"
	    	}
	    )	    
	}
	  $.ajax({
		  type: "GET",
	      async: false,
		  dataType: "json",	  
		  url: "/simpleWeb/json/work/cargos/getCargos/",	  
		  processData: false,
		  contentType: false,
		  success:function (data){
			  $.each(data, function(k, v) {
				
			    	var acciones = "";
			    		
			   		acciones +=		"<button title='Actualizar' id='"+k+"' onclick=\"javascript:modificarMant('" +v.id_cargo + "')\" class='btn btn-circle green btn-outline btn-sm col-md-5'><i class='fa fa-pencil-square-o fa-lg'></i></button>";
			    	acciones +=		"<button title='Borrar' id='" +k+"' onclick=\"javascript:borrarMant("+v.id_cargo+")\" class='btn btn-circle red btn-outline btn-sm col-md-5'><i class='fa fa-trash-o fa-lg'></i></button>";
			    	table.row.add([  k+1, v.cargos,v.denominacionSociedad, v.sueldoBase, acciones]);
			   	 	
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
	    url: "/simpleWeb/json/work/cargos/getCargoById/" + $id,
	    success: function(data) {
	    	
	    	cargo.id_cargo=data.id_cargo;
	    	cargo.cargos=data.cargos;
	    	cargo.sueldoBase=data.sueldoBase;
	    	cargo.sociedad=data.sociedad;
	    	
	    	$("#editarIdCargos").val(cargo.id_cargo);
	    	$("#editarNombreCargos").val(cargo.cargos);
	    	$("#editarSueldoBaseCargos").val(cargo.sueldoBase);
	    	$("#editarSelectorEmpresa").val(cargo.sociedad);
	      
	      
	      //parte critica funcional
	      $("#editarCargosModal").modal("toggle");
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
$("#insertCargosForm").submit(function(event){
	event.preventDefault();
	insertCargo();
});
function insertCargo()
{
	cargo.id_cargo=$("#agregarIdCargos").val()
	cargo.cargos=$("#agregarNombreCargos").val();
	cargo.sueldoBase=$("#agregarSueldoBaseCargos").val();
	cargo.sociedad=$("#agregarSelectorEmpresa").val();
	
	  $.ajax({
  	    type: "PUT",
  	    async: false,
  	    url: "/simpleWeb/json/work/cargos/createCargo/",
  	    data: JSON.stringify(cargo),
  	    beforeSend: function(xhr) {
  	      xhr.setRequestHeader("Accept", "application/json");
  	      xhr.setRequestHeader("Content-Type", "application/json");
  	    },
  	    success: function(data) {
  	    	$("#agregarCargosModal").modal("toggle");
  	    	alerta("Cargo Creado");
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
$("#editCargosForm").submit(function(event) {
	  event.preventDefault();
	  updateCargos();
	});
function updateCargos() {
	
	cargo.cargos=$("#editarNombreCargos").val();
	cargo.sueldoBase=$("#editarSueldoBaseCargos").val();
	cargo.sociedad=$("#editarSelectorEmpresa").val();
	
	  $.ajax({
  	    type: "POST",
  	    async: false,
  	    url: "/simpleWeb/json/work/cargos/updateCargo/",
  	    data: JSON.stringify(cargo),
  	    beforeSend: function(xhr) {
  	      xhr.setRequestHeader("Accept", "application/json");
  	      xhr.setRequestHeader("Content-Type", "application/json");
  	    },
  	    success: function(data) {
  	    	$("#editarCargosModal").modal("toggle");
  	    	alerta("Cargo Actualizado");
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
	$("#editarCargosModal").modal("toggle");
}
function cerrarModalAgregar()
{
	$("#agregarCargosModal").modal("toggle");



}
function agregarCargos()
{
	$("#agregarNombreCargos").val("");
	$("#agregarSueldoBaseCargos").val(0);
	$("#agregarCargosModal").modal("toggle");
}



function borrarMant($id)
{
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
	    	$.ajax({
	    	    type: "PUT",
	    	    async: false,
	    	    url: "/simpleWeb/json/work/cargos/deleteCargo/" + $id,

	    	    beforeSend: function(xhr) {
	    	      xhr.setRequestHeader("Accept", "application/json");
	    	      xhr.setRequestHeader("Content-Type", "application/json");
	    	    },
	    	    success: function(data) {
	    	      alerta("Cargo borrado");
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
	  });
	
}