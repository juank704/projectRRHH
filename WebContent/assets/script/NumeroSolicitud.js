$(document).ready(function(){
	detalleNotificacionVer();
	$("#loading").hide();
	$("#fechaMasiva").change(function(){
	
		   var fechaMasiva = $("#fechaMasiva").val();
		   
		   var nFilas = $("#preseleccionados tr").length;
		   for(var i = 0; i < nFilas;i++){
			   $("#fecha"+i).val(fechaMasiva);
			   $("#fecha"+i).prop( "disabled", true );
		   }
		   
	    });
	LoadCargo();
	rechazoLista();
	detalleNotificacion();
	$("#loadCargo").change(function(){
	cargarTabla();
	
	   
});
	var get = getINFO();
	$( "#numSolicitud" ).append("SOLICITUD Nº:"+get.id_pet);
	

});

function limpiar(){
	
	 if ($('#fechaMasiva').val() === '') {
		 alerta("Debe Seleccinar una Fecha Masiva");
	 }else
		 {
		 var nFilas = $("#preseleccionados tr").length;
		   for(var i = 0; i < nFilas;i++){
			   
			   $("#fecha"+i).prop( "disabled", false );
			   $("#fecha"+i).val("");
			   $("#fechaMasiva").val("");
		   }
		 }
}

function cargarTabla(){
	  
	if ($('#loadCargo').val() === '') {
		
		 alerta("Debe Seleccinar N° Petición");
		 return;
	}
		
		  $('#tbl_Info').dataTable().fnClearTable();
		    $('#tbl_Info').dataTable().fnDestroy();
		var numeroPeticion = $("#loadCargo").val();
		var get = getINFO();
		var entero = get.id_pet;
		$("#loading").show();
		$.getJSON("/simpleWeb/json/work/preseTrabajadores/"+numeroPeticion+","+entero , function(data){
			
			datos = data;
			var numero = 1;
			$.each(data, function(k, v){
				jsonTRab = v.trabajadores;
				
				var bodyPreselect = "";
				bodyPreselect += "<tr id='botonSel"+k+"'>";
				bodyPreselect += 	"<td style='display: none;' id='botonSel"+k+"'>"+v.codigo+"</td>";
				bodyPreselect += 	"<td id='botonSel"+k+"'>"+numero+"</td>";
				bodyPreselect += 	"<td id='botonSel"+k+"'>"+v.nombre+"</td>";
				bodyPreselect += 	"<td>"+v.nombre_cargo+"</td>";
				bodyPreselect += "<td>"+v.posicion+"</td>";
				bodyPreselect += 	"<td></td>";
				bodyPreselect += 	"<td></td>";
				bodyPreselect += 	"<td style='display: none;'>"+v.obra+"</td>";
				bodyPreselect += 	"<td>"+v.telefono+"</td>";
				bodyPreselect += 	"<td>"+v.email+"</td>";

				if(v.est_contrato == 'Rechazado')
					{
					 
					  bodyPreselect += 	"<td style='color:red'>"+v.est_contrato+":<br>"+v.id_rechazo+"</td>";
					
					}
				else if(v.est_contrato == 'Preseleccionado')
				{
					bodyPreselect += 	"<td style='color:orange'>"+v.est_contrato+":</td>";
				}
				else if(v.est_contrato == 'Seleccionado')
				{
					bodyPreselect += 	"<td style='color:blue'>"+v.est_contrato+":</td>";
				}
				else if(v.est_contrato == 'Disponible')
				{
					bodyPreselect += 	"<td style='color:green'>"+v.est_contrato+":</td>";
				}
				else if(v.est_contrato == 'Contratado')
				{
					bodyPreselect += 	"<td style='color:#22c71f'>"+v.est_contrato+":</td>";
				}
				else if(v.est_contrato == 'Traspazado')
				{
					bodyPreselect += 	"<td style='color:black'>"+v.est_contrato+":</td>";
				}
				
				
				
				
				bodyPreselect +="<td><input type='date' id='fecha"+k+"' class='form-control input-circle' onchange='javascript: valDias(this)'></td>";
				bodyPreselect += 	"<td>";
				
				bodyPreselect +=		"<a href='detalleTrabajador?id="+v.id+"' target='blank'><button title='Ver ficha' id='botonSel'  class='btn btn-circle yellow btn-outline btn-sm'><i class='fa fa-align-justify fa-lg'></i></button></a>";
				
				if(v.est_contrato == 'Contratado' || v.est_contrato == 'Rechazado' || v.est_contrato == 'Traspazado')
				{
					bodyPreselect +=		"<button id='botonSel"+k+"'onclick='idRechazar(this.id);' title='Rechazo' data-toggle='modal' data-target='#myModal' class='btn btn-circle red btn-outline btn-sm' disabled ><i class='fa fa-close fa-lg'></i></button>";

				}
				else{
					bodyPreselect +=		"<button id='botonSel"+k+"'onclick='idRechazar(this.id);' title='Rechazo' data-toggle='modal' data-target='#myModal' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button>";

				}
				
			
				
				
				

				
				if(v.est_contrato == 'Seleccionado' || v.est_contrato == 'Rechazado' || v.est_contrato == 'Traspazado' ){
					bodyPreselect +="<button onclick='Seleccionar("+k+");' title='No se Puede volver a Seleccionar' id='botonSel"+k+"'  class='btn btn-circle green btn-outline btn-sm' disabled><i class='fa fa-check fa-lg'></i></button>";
				}
				else if(v.est_contrato == 'Contratado')
					{
					bodyPreselect +="<button onclick='Seleccionar("+k+");' title='No se Puede volver a Seleccionar' id='botonSel"+k+"'  class='btn btn-circle green btn-outline btn-sm' disabled><i class='fa fa-check fa-lg'></i></button>";
					}
				else if(v.est_contrato == 'Rechazado'){
					bodyPreselect +="<button onclick='Seleccionar("+k+");' title='No se Puede volver a Seleccionar' id='botonSel"+k+"'  class='btn btn-circle green btn-outline btn-sm' disabled><i class='fa fa-check fa-lg'></i></button>";
					
				}
				
				
				

				else{
					bodyPreselect +=		"<button onclick='Seleccionar("+k+");' title='Seleccionar' id='botonSel"+k+"'  class='btn btn-circle green btn-outline btn-sm'><i class='fa fa-check fa-lg'></i></button>";
				}
				
				if(v.est_contrato == 'Rechazado' || v.est_contrato == 'Traspazado' || v.est_contrato == 'Contratado'){
				bodyPreselect += 	"<button onclick='Traspasar("+v.codigo+");' title='Traspasar' id='botonSel"+k+"'  class='btn btn-circle green btn-outline btn-sm' disabled><i class='fa fa-clipboard fa-lg'></i></button>";
				}else{
					bodyPreselect += 	"<button onclick='Traspasar("+v.codigo+");' title='Traspasar' id='botonSel"+k+"'  class='btn btn-circle green btn-outline btn-sm'><i class='fa fa-clipboard fa-lg'></i></button>";	
				}
				
				
				
				bodyPreselect += 	"</td>";
				
				bodyPreselect += "</tr>" ;
				
				$("#preseleccionados").append(bodyPreselect);
				numero = numero+1;
			})
			$("#loading").hide();
			$('#tbl_Info').DataTable({
				"sPaginationType": "full_numbers" ,
				
				
		});  
	 
	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})
		
		
		
		
		
}

function Seleccionar(id)
{
	datoFila = [];
	 if ($("#fecha"+id).val() === '') {
	        alerta("Debe Ingresar una Fecha");
	        $("#fecha"+id).focus();
	        return;
	 }
	 $("#botonSel" + id + " td").each(function() {
		 datoFila.push($(this).text());
	    });
	 
	 
	var get = getINFO();
	datoSeleccion = [];
	
	
	datoSeleccion.push(datoFila[0]);
	datoSeleccion.push($("#loadCargo").val());
	datoSeleccion.push(get.id_pet);
	datoSeleccion.push($("#fecha"+id).val());
	

	
    var row = {
    		codigo_trabajador: datoSeleccion[0],
			id_peticion: datoSeleccion[1],
			codigo_peticion: datoSeleccion[2],
            fechaInicio: datoSeleccion[3],
            usuario:  usuarioOrden[0]
   
    
			
		}
  
	$.ajax({
	    url: "/simpleWeb/json/work/Seleccionado",
	    type: "PUT",
	    data: JSON.stringify(row),
	    beforeSend: function(xhr) {
	        xhr.setRequestHeader("Accept", "application/json");
	        xhr.setRequestHeader("Content-Type", "application/json");
	    },
	    success: function(data, textStatus, jqXHR) {
	    	 $( "#modalBody2" ).empty();
			 	
		    	detalleNotificacionVer();
	    	cargarTabla();

	        alerta("Trabajador Seleccionado con exito ");

	    },
	    error: function(ex) {
	        console.log(ex);
	    }

	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})
	
}

datoFilaR = [];
function idRechazar(id){
	
	datoFilaR = [];
	$("#nombreEliminar").html("");
	$("#observacion").val("");
	
	$("#" + id + " td").each(function() {
		datoFilaR.push($(this).text());
		 
	   });
	
	$("#nombreEliminar").append(datoFilaR[2]);
	
	
	
}
	
function Rechazar(){
	datoFilaR.push($("#listaRechazo2").val());
	datoFilaR.push($("#observacion").val());
	var get = getINFO();
	$('#myModal').modal('hide');
    var row = {
    		codigo: datoFilaR[0],
			id_rechazo: datoFilaR[13],
			observacion: datoFilaR[14],
			id_peticion: get.id_pet,
			codigo_peticion: $("#loadCargo").val()

		}
     console.log(row);
	$.ajax({
	    url: "/simpleWeb/json/work/RechazarPreseleccionado",
	    type: "PUT",
	    data: JSON.stringify(row),
	    beforeSend: function(xhr) {
	        xhr.setRequestHeader("Accept", "application/json");
	        xhr.setRequestHeader("Content-Type", "application/json");
	    },
	    success: function(data, textStatus, jqXHR) {
	    	
	    	 $( "#modalBody2" ).empty();
			 	
		    	detalleNotificacionVer();
	    	cargarTabla();

	        alerta("Trabajador Rechazado con exito ");

	    },
	    error: function(ex) {
	        console.log(ex);
	    }

	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})
	
	
}



function LoadCargo(){
	var get = getINFO();
	var entero = get.id_pet;
	usuarioOrden = [];
$.getJSON("/simpleWeb/json/work/LoadCargoPreseleccion/"+entero, function(data){
	$.each(data, function(k,v){
	   
		var SelectCargo = "";	
		SelectCargo += 	"<option value="+v.id_peticion+">N°"+v.id_peticion+" "+v.cargo+": "+v.posicion+"</option>";
		
		usuarioOrden.push(v.usuario);	
		$("#loadCargo").append(SelectCargo);
		 	
	});
}).fail(function(jqXHR, textStatus, errorThrown) {

    alerta(errorThrown);
	$("#loading").hide();
})

}


function testClick(id){
	checkTr = [];	
	 $("#"+id+" td").each(function(){
		 checkTr.push($(this).text());
		 
		 });
	   		var row = {	
	   				    codigo: checkTr[1],
			  			nombre: checkTr[2],
			  			email: checkTr[3],
			  			telefono: checkTr[4],
			  			fecha_entrevista: checkTr[5]
  			
	   				   }
//  		$.ajax({
//  			url : "/simpleWeb/json/work/addSeleccionados",
//  			type : "PUT",
//  			data : JSON.stringify(row),
//  			beforeSend : function(xhr) {
//  				xhr.setRequestHeader("Accept","application/json");
//  				xhr.setRequestHeader("Content-Type","application/json");
//  			},
//  			success : function(data, textStatus, jqXHR) {
//  				
//  				alert("Trabajador "+checkTr[1]+" Seleccionado con exito.")
//  				
//  			},
//  			error : function(ex) {
//  				console.log(ex);
//  			}
//  		
//  		})
}


function rechazo(){
	
	$.getJSON("/simpleWeb/json/work/rechazo/", function(data){
		datos = data;
		$.each(data, function(k, v){
			jsonTRab = v.trabajadores;
			var Selectposicion = "";	
			Selectposicion += 	"<option value="+v.nombre_lista+">"+v.nombre_lista+"</option>";
			
			$("#listaRechazo").append(Selectposicion);
		})
}).fail(function(jqXHR, textStatus, errorThrown) {

    alerta(errorThrown);
	$("#loading").hide();
})
	 var popupCierre = "";

	 popupCierre +=    '<div class="col-xs-12 col-sm-12 col-md-12" style="margin-bottom: 10px;">';
	  
		$.getJSON("/simpleWeb/json/work/rechazo/", function(data){
			datos = data;
			$.each(data, function(k, v){
				jsonTRab = v.trabajadores;
				var Selectposicion = "";	
				Selectposicion += 	"<option value="+v.id_lista+">"+v.nombre_lista+"</option>";
				;
				$("#listaRechazo").append(Selectposicion);
				$("#listaRechazo").html(Selectposicion);
				 
			})
			
	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})
	
		                        
		popupCierre +="<select id='listaRechazo' class='btn blue btn-outline btn-circle btn-sm'>";
	     popupCierre +="</select>"
		 
		
		
	     

	 popupCierre += "Observación<textarea  rows='3' wrap='oft' class='form-control'></textarea>";
	 popupCierre +='</div>';
	 popupCierre +=    '</div>';
	 popupCierre +=    '<div ></div>';
	 popupCierre +='<div class="col-sm-12 col-md-12">';
	 popupCierre +=          "<div class='btn btn-circle blue btn-outline'  onclick='actualizarTrabajador(this.id);'><i class='fa fa-clock-o'></i> Enviar</div>";
	 popupCierre +=          "<div class='btn btn-circle red btn-outline' onclick='closeModal();'> Cancelar</div>";
	 popupCierre +='</div>';

	    popUp("Rechazo", popupCierre, true, "400px", true);
}

function rechazoLista(){
	
	$.getJSON("/simpleWeb/json/work/rechazo/", function(data){
		datos = data;
		$.each(data, function(k, v){
			jsonTRab = v.trabajadores;
			var Selectposicion = "";	
			Selectposicion += 	"<option value="+v.nombre_lista+">"+v.nombre_lista+"</option>";
			
			$("#listaRechazo2").append(Selectposicion);
			
		})
}).fail(function(jqXHR, textStatus, errorThrown) {

    alerta(errorThrown);
	$("#loading").hide();
})

}

function detalleNotificacion(){
	var get = getINFO();
	var entero = get.id_pet;
$.getJSON("/simpleWeb/json/work/LoadNumeroSolicitud/"+entero, function(data){
	$.each(data, function(k,v){
		
		$("#idPeticion").append("SOLICITUD Nº: "+v.id_reclutamiento+"");  
		$("#cantid").append("CANT. SOLICITADOS: "+v.cantidad+"");
		$("#fechaSoli").append("FECHA DE SOLICITUD: "+v.fecha_now+"");
		$("#obraFaena").append("OBRA/FAENA: "+v.obra+"");	
	});
	
	
}).fail(function(jqXHR, textStatus, errorThrown) {

    alerta(errorThrown);
	$("#loading").hide();
})
}

function detalleNotificacionVer(){
	var get = getINFO();
	var entero = get.id_pet;
$.getJSON("/simpleWeb/json/work/PreseleccionDetalleVer/"+entero, function(data){
	$.each(data, function(k, v){
		 var reprogramar = "";
		
		 reprogramar +="<tr>"+
		 "<td>"+v.cargo+"</td>"+
		 "<td>"+v.posicion+"</td>"+
		 "<td>"+v.cantidad+"</td>"+
		 "<td>"+v.preseleccionado+"</td>"+
		 "<td>"+v.seleccionado+"</td>"+
		 "<td>"+v.saldo+"</td>"+
		 "<td>"+v.fecha_inicio+"</td>"+
		 "</tr>";

		
		 $("#modalBody2").append(reprogramar);	 	   
		
		
	})
}).fail(function(jqXHR, textStatus, errorThrown) {

    alerta(errorThrown);
	$("#loading").hide();
})

}
function Traspasar(id){
	
	 var popupTraspazar = "";

	 popupTraspazar +=    '<div class="col-xs-12 col-sm-12 col-md-12" style="margin-bottom: 10px;">';
	 
	 popupTraspazar += "Observación<textarea  rows='3' wrap='oft' class='form-control'id='textareaTraspazar'></textarea>";
	 popupTraspazar +='</div>';
	 popupTraspazar +=    '</div>';
	 popupTraspazar +=    '<div ></div>';
	 popupTraspazar +='<div class="col-sm-12 col-md-12">';
	 popupTraspazar +=          "<div class='btn btn-circle blue btn-outline'  onclick='traspazarEnviar("+id+");'><i class='fa fa-clock-o'></i> Enviar</div>";
	 popupTraspazar +=          "<div class='btn btn-circle red btn-outline' onclick='closeModal();'> Cancelar</div>";
	 popupTraspazar +='</div>';
	 popUp("Traspazar", popupTraspazar, true, "400px", true);  
}

function traspazarEnviar(id){
	var get = getINFO();
	var valorTexArea = $("#textareaTraspazar").val();

	closeModal();
    var row = {
    		codigo: id,
			observacion: valorTexArea,
			id_peticion: get.id_pet,
			codigo_peticion: $("#loadCargo").val()

		}
     console.log(row);
	$.ajax({
	    url: "/simpleWeb/json/work/traspazar",
	    type: "PUT",
	    data: JSON.stringify(row),
	    beforeSend: function(xhr) {
	        xhr.setRequestHeader("Accept", "application/json");
	        xhr.setRequestHeader("Content-Type", "application/json");
	    },
	    success: function(data, textStatus, jqXHR) {
	    	
	    	 
			 	
		    	
	    	cargarTabla();

	        alerta("Trabajador Traspazado con exito ");

	    },
	    error: function(ex) {
	        console.log(ex);
	    }

	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})
}
