
$(document).ready(function(){
	onLoadTable();
	var f = new Date();
	var dia=f.getDate();
	var mes=+f.getMonth()+1;
	if(mes<10)
	{
		mes="0"+mes;
	}
	
	var anio=f.getFullYear();
	var n=dia+"-"+mes+"-"+anio;
	$('#selectorRutEvMut').select2();
	
	 $("#selectorRutWithLicenseEvMut").select2({
		dropdownParent: $("#agregarevMutModal")
	 });
	
	$( "#fechaRegistroEvMut" ).val(n);
	$("#fechaRegistroEvMut").datepicker({
         dateFormat:"dd-mm-yy",
         minDate: +0,
     });
	
	llenarSelectores();
	llenarDivisionSubdivision();
	//necesario para deshabilitar elementos
	//$element=$("#agregarProfesionOficioEvMut");
	//$element.prop('disabled', true);
	
})
function llenarDivisionSubdivision()
{
	$.ajax({
		  type: "GET",
	      async: true,			    
		  url: "/simpleWeb/json/work/getParametros/"+"DIVISION_PERSONAL",			  
		  success:function (data){
			  $("#agregarDivisionEvMut").append("<option value=0>Seleccionar...</option>");
			  $("#editDivisionEvMut").append("<option value=0>Seleccionar...</option>");

			    $.each(data, function(k, v) {
			    	$("#agregarDivisionEvMut").append("<option value="+v.llave+">"+v.descripcion+"</option>");
			    	$("#editDivisionEvMut").append("<option value="+v.llave+">"+v.descripcion+"</option>");

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
	$.ajax({
		  type: "GET",
	      async: true,			    
		  url: "/simpleWeb/json/work/getParametros/"+"SUBDIVISION_PERSONAL",			  
		  success:function (data){
			  $("#agregarSubdivisionEvMut").append("<option value=0>Seleccionar...</option>");
			  $("#editSubdivisionEvMut").append("<option value=0>Seleccionar...</option>");

			    $.each(data, function(k, v) {
			    	$("#agregarSubdivisionEvMut").append("<option value="+v.llave+">"+v.descripcion+"</option>");
			    	$("#editSubdivisionEvMut").append("<option value="+v.llave+">"+v.descripcion+"</option>");

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
function llenarCampos($value, $id){
	if($value.value!=0){
		if($id==1)
		{
			llenarDesdeRut($value);
		}
		else if($id==2){
			llenarDesdeLicencia($value);
		}
	}
	else{
		$("#agregarApPaternoEvMut").prop('disabled', false);
		  $("#agregarApMaternoEvMut").prop('disabled', false);
		  $("#agregarNombresEvMut").prop('disabled', false);
		  $("#agregarProfesionOficioEvMut").prop('disabled', false);
		  $("#agregarEdadEvMut").prop('disabled', false);
		  $("#agregarCargoEvMut").prop('disabled', false);
		  $("#agregarAnosAntiguedadEvMut").prop('disabled', false);
		  $("#agregarDivisionEvMut").prop('disabled', false);
		  $("#agregarSubdivisionEvMut").prop('disabled', false);
		  $("#agregarLugarTrabajoEvMut").prop('disabled', false);
		  
		  $("#editarIdTrabajador").val("");
		  $("#agregarApPaternoEvMut").val("");
		  $("#agregarApMaternoEvMut").val("");
		  $("#agregarNombresEvMut").val("");
		  $("#agregarProfesionOficioEvMut").val();
		  $("#agregarCargoEvMut").val("");
		  $("#agregarEdadEvMut").val();
		  $("#agregarAnosAntiguedadEvMut").val();
		  $("#agregarDivisionEvMut").val("");
		  $("#agregarSubdivisionEvMut").val("");
		  $("#agregarLugarTrabajoEvMut").val();
		  
	}
}
function llenarDesdeRut($value){
	if($value.value!=0){
		$.ajax({
			  type: "GET",
		      async: false,			    
			  url: "/simpleWeb/json/work/eventos/getTrabajadoresById/"+$value.value,			  
			  success:function (data){
				  console.log(JSON.stringify(data));
				  var f = new Date();
					var dia=f.getDate();
					var mes=+f.getMonth()+1;
					if(mes<10)
					{
						mes="0"+mes;
					}
					
					var anio=f.getFullYear();
					var n=dia+"-"+mes+"-"+anio;
				  
				  
				  
				  var edad= parseInt(anio)-parseInt(data.fNacimiento.split("-")[0]);
				  var anA= parseInt(anio)-parseInt(data.fechaIngresoCompania.split("-")[0]);
				  var meA=parseInt(mes)-parseInt(data.fechaIngresoCompania.split("-")[1]);
				  
				  
				  
				  $("#editIdTrabajador").val(data.id);
				  $("#agregarApPaternoEvMut").val(data.apellidoPaterno);
				  $("#agregarApMaternoEvMut").val(data.apellidoMaterno);
				  $("#agregarNombresEvMut").val(data.nombre);
				  $("#agregarProfesionOficioEvMut").val();
				  
				  $("#agregarCargoEvMut > option[value="+data.cargo+"]").attr("selected", true);
				 
			
				  $("#agregarEdadEvMut").val(edad);
				  $("#agregarAnosAntiguedadEvMut").val(anA+" años y "+meA+" Meses");
				  
				  
				  $("#agregarDivisionEvMut > option[value="+data.division+"]").attr("selected", true);
				  $("#agregarSubdivisionEvMut > option[value="+data.idSubDivision+"]").attr("selected", true);
				  
				  $("#agregarLugarTrabajoEvMut").val();
				  
				  $("#agregarApPaternoEvMut").prop('disabled', true);
				  $("#agregarApMaternoEvMut").prop('disabled', true);
				  $("#agregarNombresEvMut").prop('disabled', true);
				  $("#agregarProfesionOficioEvMut").prop('disabled', true);
				  $("#agregarEdadEvMut").prop('disabled', true);
				  $("#agregarCargoEvMut").prop('disabled', true);
				  $("#agregarAnosAntiguedadEvMut").prop('disabled', true);
				  $("#agregarDivisionEvMut").prop('disabled', true);
				  $("#agregarSubdivisionEvMut").prop('disabled', true);
				  $("#agregarLugarTrabajoEvMut").prop('disabled', true);
				  
				  
				 
				  
				  
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
function llenarDesdeLicencia(){
	if($value.value!=0){
		$.ajax({
			  type: "GET",
		      async: false,			    
			  url: "/simpleWeb/json/work/eventos/getTrabajadoresById/"+$value.value,			  
			  success:function (data){
				  console.log(JSON.stringify(data));
				  $("#editarIdTrabajador").val(data.id);
				  
				  $("#agregarApPaternoEvMut").val(data.apellidoPaterno);
				  $("#agregarApMaternoEvMut").val(data.apellidoMaterno);
				  $("#agregarNombresEvMut").val(data.nombre);
				  
				  
				  
				  
				  $("#agregarProfesionOficioEvMut").val();
				  $("#agregarCargoEvMut").val(data.cargo);
				  
				  
				  
				  
				  $("#agregarEdadEvMut").val();
				  $("#agregarAnosAntiguedadEvMut").val();
				  $("#agregarDivisionEvMut").val(data.division);
				  $("#agregarSubdivisionEvMut").val(data.idSubDivision);
				  $("#agregarLugarTrabajoEvMut").val();
				  
				  $("#agregarApPaternoEvMut").prop('disabled', true);
				  $("#agregarApMaternoEvMut").prop('disabled', true);
				  $("#agregarNombresEvMut").prop('disabled', true);
				  $("#agregarProfesionOficioEvMut").prop('disabled', true);
				  $("#agregarEdadEvMut").prop('disabled', true);
				  $("#agregarCargoEvMut").prop('disabled', true);
				  $("#agregarAnosAntiguedadEvMut").prop('disabled', true);
				  $("#agregarDivisionEvMut").prop('disabled', true);
				  $("#agregarSubdivisionEvMut").prop('disabled', true);
				  $("#agregarLugarTrabajoEvMut").prop('disabled', true);
				  
				  
				 
				  
				  
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
function onLoadTable(){
	//inicializo la tabla
	var table;	
	 if ( $.fn.dataTable.isDataTable( '#tbl_EvMut' ) ) {
	    table = $('#tbl_EvMut').DataTable();
	    table.clear();
	}
	else {
	    table = $('#tbl_EvMut').DataTable( 
	    	{
	    		searching: false,
	    		paging:true,
	    		info: false,
	    		search: false
	    	}
	    )	    
	}
	 llenarCargos();
		$.ajax({
		  type: "GET",
	      async: false,			    
		  url: "/simpleWeb/json/work/eventos/getEvMuts/",			  
		  success:function (data){
			  
			    $.each(data, function(k, v) {
			    	var acciones = "";
			   		acciones +=		"<button title='Actualizar' id='"+k+"' onclick=\"javascript:modificarMant('" +v.idEventosMutualidad + "')\" class='btn btn-circle green btn-outline btn-sm col-md-4'><i class='fa fa-pencil-square-o fa-lg'></i></button>";
			   	 	acciones +=		"<button title='Borrar' id='" +k+"' onclick=\"javascript:borrarMant("+v.idEventosMutualidad+")\" class='btn btn-circle red btn-outline btn-sm col-md-4'><i class='fa fa-trash-o fa-lg'></i></button>";		
			   	 
			    	table.row.add([  k,
			    	                 v.fechaRegistro,
			    	                 v.rut,
			    	                 v.nombreTrabajador,			    	                
			    	                 v.ubicacionAccidente,
			    	                 v.actividadTrabajador,
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
$("#editEvMutForm").submit(function(event){
	
	
	 var idev=$("#editIdEvMut").val();
	var text="tienes algunos errores, Revisa el campo ";
	var idTrabajador=$("#editIdTrabajador").val();
	var fechaRegistro=$("#editFechaRegistroEvMut").val();
	
	var rut=$("#editRutRegistroEvMut").val();
	var apellidoTrabajador=$("#editApPaternoEvMut").val()+"/"+$("#editApMaternoEvMut").val();;
				
	var nombreTrabajador=$("#editNombresEvMut").val();
	$("#editProfesionOficioEvMut").val();
	var cargo=$("#editCargoEvMut").val();
	var edadTrabajador=$("#editEdadEvMut").val();
	var anosAntiguedad=$("#editAnosAntiguedadEvMut").val();
				
	var fechaAccidente= $("#editHoraAccidenteEvMut").val();
				
	var lugarTrabajador=$("#editLugarTrabajoEvMut").val();
				  
	var apellidoJefe=$("#editApPaternoJefeEvMut").val()+"/"+$("#editApMaternoJefeEvMut").val();
	var nombreJefe=$("#editNombreJefeEvMut").val();
	var cargoJefe=$("#editCargoJefeEvMut").val();
				
	var ubicacionAccidente=$("#editLugarAccidenteEvMut").val();
	var actividadTrabajador=$("#editActividadRealizadaEvMut").val();
	//var tipoPeligro=$("#selectTipoPeligro").val();
	var causaAccidente=$("#editCausaAccidenteEvMut").val();
	var consecuencia=$("#editConsecuenciaAccidenteEvMut").val();
	var responsableMejora=$("#editResponsableMejoraEvMut").val();
	var plazoMejora=$("#editPlazoMejoraEvMut").val();
	var accionMejora=$("#editAccionMejoraEvMut").val();
	var estado_trab=$("#EstadoTrab").val();
			    
			    
	var evMut= new Object();
	evMut.idEventosMutualidad=idev;
	evMut.idTrabajador=idTrabajador;
	evMut.fechaRegistro=fechaRegistro;
	evMut.rut=rut;
	evMut.nombreTrabajador=nombreTrabajador;
	evMut.apellidoTrabajador=apellidoTrabajador;
	evMut.edadTrabajador=edadTrabajador;
	evMut.anosAntiguedad=anosAntiguedad;
	evMut.fechaHoraAccidente=fechaAccidente;
	evMut.ubicacionAccidente=ubicacionAccidente;
	evMut.actividadTrabajador=actividadTrabajador;
	evMut.lugarTrabajador= lugarTrabajador;
	evMut.consecuencia=consecuencia;
	//evMut.tipoPeligro=tipoPeligro;
	evMut.causaAccidente=causaAccidente;
	evMut.accionMejora=accionMejora;
	evMut.ResponsableMejora=responsableMejora;
	evMut.plazoMejora=plazoMejora;
	evMut.nombreJefe=nombreJefe;
	evMut.apellidoJefe=apellidoJefe;
	evMut.cargoJefe=cargoJefe;

	evMut.idCargo=cargo;
	//evMut.idLicencia=idLicencia;
	evMut.estado=estado_trab;
	
	
	
	
	editarEvMut(evMut);
	

	
	
});




$("#insertevMutForm").submit(function(event) {
	
	var text="tienes algunos errores, Revisa el campo ";
	var idTrabajador=$("#selectorRutEvMut").val();
	var fechaRegistro=$("#fechaRegistroEvMut").val();
	var rut=$("#selectorRutEvMut :selected").text();
	var apellidoTrabajador=$("#agregarApPaternoEvMut").val()+"/"+$("#agregarApMaternoEvMut").val();;
				
	var nombreTrabajador=$("#agregarNombresEvMut").val();
	$("#agregarProfesionOficioEvMut").val();
	var cargo=$("#agregarCargoEvMut").val();
	var edadTrabajador=$("#agregarEdadEvMut").val();
	var anosAntiguedad=$("#agregarAnosAntiguedadEvMut").val();
				
	var fechaAccidente=$("#agregarFechaAccidenteEvMut").val()+" "+$("#agregarHoraAccidenteEvMut").val();
				
	var division=$("#agregarDivisionEvMut").val();
	var Subdivision=$("#agregarSubdivisionEvMut").val();
	var lugarTrabajador=$("#agregarLugarTrabajoEvMut").val();
				  
	var apellidoJefe=$("#agregarApPaternoJefeEvMut").val()+"/"+$("#agregarApMaternoJefeEvMut").val();
	var nombreJefe=$("#agregarNombreJefeEvMut").val();
	var cargoJefe=$("#agregarCargoJefeEvMut").val();
				
	var ubicacionAccidente=$("#agregarLugarAccidenteEvMut").val();
	var actividadTrabajador=$("#agregarActividadRealizadaEvMut").val();
	//var tipoPeligro=$("#selectTipoPeligro").val();
	var causaAccidente=$("#agregarCausaAccidenteEvMut").val();
	var consecuencia=$("#agregarConsecuenciaAccidenteEvMut").val();
	var responsableMejora=$("#agregarResponsableMejoraEvMut").val();
	var plazoMejora=$("#agregarPlazoMejoraEvMut").val();
	var accionMejora=$("#agregarAccionMejoraEvMut").val();
			    
			    
	var evMut= new Object();
	
	evMut.idTrabajador=idTrabajador;
	evMut.fechaRegistro=fechaRegistro;
	evMut.rut=rut;
	evMut.nombreTrabajador=nombreTrabajador;
	evMut.apellidoTrabajador=apellidoTrabajador;
	evMut.edadTrabajador=edadTrabajador;
	evMut.anosAntiguedad=anosAntiguedad;
	evMut.fechaHoraAccidente=fechaAccidente;
	evMut.ubicacionAccidente=ubicacionAccidente;
	evMut.actividadTrabajador=actividadTrabajador;
	evMut.lugarTrabajador= lugarTrabajador;
	evMut.consecuencia=consecuencia;
	//evMut.tipoPeligro=tipoPeligro;
	evMut.causaAccidente=causaAccidente;
	evMut.accionMejora=accionMejora;
	evMut.ResponsableMejora=responsableMejora;
	evMut.plazoMejora=plazoMejora;
	evMut.nombreJefe=nombreJefe;
	evMut.apellidoJefe=apellidoJefe;
	evMut.cargoJefe=cargoJefe;
	evMut.division=division;
	evMut.subdivision=Subdivision;
	evMut.idCargo=cargo;
	//evMut.idLicencia=idLicencia;
	insertarEvMut(evMut);

});
function editarEvMut($evento)
{
	$.ajax({
        type: "POST",
        async: false,
        url: "/simpleWeb/json/work/eventos/updateEvMut/",
        data: JSON.stringify($evento),
        beforeSend: function(xhr) {
          xhr.setRequestHeader("Accept", "application/json");
          xhr.setRequestHeader("Content-Type", "application/json");
        },
        success: function(d) {
        	cerrarModalEdit();
        	swal({
                position: "top-end",
                type: "success",
                title: "Solicitud creada con éxito",
                showConfirmButton: false,
                timer: 1800
              });
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



function insertarEvMut($evento){
	$.ajax({
        type: "PUT",
        async: false,
        url: "/simpleWeb/json/work/eventos/createEvMut/",
        data: JSON.stringify($evento),
        beforeSend: function(xhr) {
          xhr.setRequestHeader("Accept", "application/json");
          xhr.setRequestHeader("Content-Type", "application/json");
        },
        success: function(d) {
        	swal({
                position: "top-end",
                type: "success",
                title: "Solicitud creada con éxito",
                showConfirmButton: false,
                timer: 1800
              });
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



function onChange(){
	 var checkBox = document.getElementById("agregarIcheckLicenciaEvMut");
	  // Get the output text
	  var s1 = $("#selectorUno");
	  var s2 = $("#selectorDos");
	
	if (checkBox.checked == true){
	    s1.removeClass("show");
	    s1.addClass("hide");
	    s2.removeClass("hide");
	    s2.addClass("show");
	    
	  } else {
		  s2.removeClass("show");
		    s2.addClass("hide");
		    s1.removeClass("hide");
		    s1.addClass("show");
	  }
	
	
}
function llenarSelectores()
{
	
	$.ajax({
		  type: "GET",
	      async: true,			    
		  url: "/simpleWeb/json/work/getTrabajadores/",			  
		  success:function (data){
			
			  
			  
			  
			  $("#selectorRutEvMut").append("<option value=0>Seleccionar...</option>");
			    $.each(data, function(k, v) {
			    
			    	if ($('#selectorRutEvMut').find("option[value='" + v.id + "']").length) {
			    	    $('#selectorRutEvMut').val(v.id);
			    	} else { 
			    	    // Create a DOM Option and pre-select by default
			    	    var newOption = new Option(v.rut, v.id, true, true);
			    	    // Append it to the select
			    	    $('#selectorRutEvMut').append(newOption);
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
	$.ajax({
		  type: "GET",
	      async: true,			    
		  url: "/simpleWeb/json/work/eventos/readDataWithLicenses/",			  
		  success:function (data){
			  
			  $("#selectorRutWithLicenseEvMut").append("<option value=0>Seleccionar...</option>");
			    $.each(data, function(k, v) {
			    	
			    	$("#selectorRutWithLicenseEvMut").append("<option value="+v.idTrabajador+">"+v.rut+"|"+v.idLicencia +"</option>");
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
function llenarCargos(){
	$.ajax({
		  type: "GET",
	      async: true,			    
		  url: "/simpleWeb/json/work/cargos/getCargos/",			  
		  success:function (data){
			  
			  
			  
			  
			  $("#agregarCargoJefeEvMut").append("<option value=0>Seleccionar...</option>");
			  $("#agregarCargoEvMut").append("<option value=0>Seleccionar...</option>");
			  $("#editCargoJefeEvMut").append("<option value=0>Seleccionar...</option>");
			  $("#editCargoEvMut").append("<option value=0>Seleccionar...</option>");
			    $.each(data, function(k, v) {
			    	$("#agregarCargoJefeEvMut").append("<option value="+v.id_cargo+">"+v.cargos+"</option>");
			    	$("#agregarCargoEvMut").append("<option value="+v.id_cargo+">"+v.cargos+"</option>");
			    	$("#editCargoJefeEvMut").append("<option value="+v.id_cargo+">"+v.cargos+"</option>");
			    	$("#editCargoEvMut").append("<option value="+v.id_cargo+">"+v.cargos+"</option>");
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




function agregarOpenModal()
{
	$("#agregarevMutModal").modal("toggle");
}
function cleanModal(){
	$("#editarIdTrabajador").val("");
	$("#agregarApPaternoEvMut").val("");
	$("#agregarApMaternoEvMut").val("");
	$("#agregarNombresEvMut").val("");
	$("#agregarProfesionOficioEvMut").val("");
	$("#agregarCargoEvMut").val(0);
	$("#agregarEdadEvMut").val("");
	$("#agregarAnosAntiguedadEvMut").val("");
	$("#agregarDivisionEvMut").val("");
	$("#agregarSubdivisionEvMut").val("");
	$("#agregarLugarTrabajoEvMut").val("");
	  
	$("#agregarApPaternoJefeEvMut").val("");
	$("#agregarApMaternoJefeEvMut").val("");
	$("#agregarNombreJefeEvMut").val("");
	$("#agregarCargoJefeEvMut").val("");
	$("#agregarLugarAccidenteEvMut").val("");
	$("#agregarActividadRealizadaEvMut").val("");
	  
	$("#agregarCausaAccidenteEvMut").val("");
	$("#agregarConsecuenciaAccidenteEvMut").val("");

	$("#agregarApPaternoEvMut").prop('disabled', false);
	$("#agregarApMaternoEvMut").prop('disabled', false);
	$("#agregarNombresEvMut").prop('disabled', false);
	$("#agregarProfesionOficioEvMut").prop('disabled', false);
	$("#agregarEdadEvMut").prop('disabled', false);
	$("#agregarCargoEvMut").prop('disabled', false);
	$("#agregarAnosAntiguedadEvMut").prop('disabled', false);
	$("#agregarDivisionEvMut").prop('disabled', false);
	$("#agregarSubdivisionEvMut").prop('disabled', false);
	$("#agregarLugarTrabajoEvMut").prop('disabled', false);
	
	//-----------------------------------------------------------
	
	
	
	  
	  

}
function cerrarModalAgregar()
{
	cleanModal();
	$("#agregarevMutModal").modal("toggle");
}
function borrarMant($id){
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
		      deleteEvMut($id);
		      
		    }
		  });
}
function deleteEvMut($id){
	$.ajax({
	    type: "PUT",
	    async: false,
	    url: "/simpleWeb/json/work/eventos/deleteEvMut/" + $id,

	    beforeSend: function(xhr) {
	      xhr.setRequestHeader("Accept", "application/json");
	      xhr.setRequestHeader("Content-Type", "application/json");
	    },
	    success: function(data) {
	      swal({
	        position: "top-end",
	        type: "success",
	        title: "Evento Borrado con éxito",
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
function modificarMant($id){
	volcarDatosFormularioEdit($id);
	
	$("#editEvMutModal").modal("toggle");
}
function cerrarModalEdit(){
	$("#editEvMutModal").modal("toggle");
}
function volcarDatosFormularioEdit($id)
{
	 $.ajax({
		    type: "GET",
		    async: false,
		    
		    url: "/simpleWeb/json/work/eventos/readEvMut/" + $id,
		    
		    success: function(data) {    
		    
		    $("#editIdEvMut").val(data.idEventosMutualidad);
			$("#editIdTrabajador").val(data.idTrabajador);
			$("#editIdLicencia").val(data.idLicencia);
			$("#editFechaRegistroEvMut").val(data.fechaRegistro);
			
			$("#editFechaAccidenteEvMuthasta").val(data.fecha_hasta);
			$("#editRutRegistroEvMut").val(data.rut);
			
			$("#editNombresEvMut").val(data.nombreTrabajador);
			
			
			$("#editApPaternoEvMut").val(data.apellidoTrabajador.split(" ")[0]);			
			$("#editApMaternoEvMut").val(data.apellidoTrabajador.split(" ")[1]);
			
			$("#editEdadEvMut").val(data.edadTrabajador);
			$("#editProfesionOficioEvMut").val();
			$("#editCargoEvMut").val(data.idCargo);
			$("#editSexoEvMut").val();
			$("#editDivisionEvMut").val(data.divisionstring);
			$("#editSubdivisionEvMut").val(data.subdivision);
			$("#editAnosAntiguedadEvMut").val(data.anosAntiguedad);
			$("#EstadoTrab").val(data.estado);
			
		    if(data.hora_accidente == null || data.hora_accidente == 'null'){
		    	
		    }else{
			
			$("#editHoraAccidenteEvMut").val(data.hora_accidente);
		    }
		    
			$("#editLugarTrabajoEvMut").val(data.lugarTrabajador);
			
			
			if(data.apellidoJefe == null || data.apellidoJefe == 'null'){
				
			}else{
			$("#editApPaternoJefeEvMut").val(data.apellidoJefe.split("/")[0]);
			$("#editApMaternoJefeEvMut").val(data.apellidoJefe.split("/")[1]);
			}
			$("#editNombreJefeEvMut").val(data.nombreJefe);			
			$("#editCargoJefeEvMut").val(data.cargoJefe);
			
			
			$("#editLugarAccidenteEvMut").val(data.ubicacionAccidente);
			$("#editActividadRealizadaEvMut").val(data.actividadTrabajador);			  
			$("#editCausaAccidenteEvMut").val(data.causaAccidente);
			$("#editConsecuenciaAccidenteEvMut").val(data.consecuencia);
		      
			$("#editAccionMejoraEvMut").val(data.accionMejora);			  
			$("#editResponsableMejoraEvMut").val(data.ResponsableMejora);
			$("#editPlazoMejoraEvMut").val(data.plazoMejora);  
			     

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





