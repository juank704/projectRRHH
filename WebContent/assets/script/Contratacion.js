$(document).ready(function(){
	devolverSeleccionados();
	$("#loading").hide();
	
	$.fn.dataTable.ext.errMode = 'none';
	onLoad();
	detalleNotificacion();
	
});

function onLoad(){
	
	var get = getINFO();
	$("#loading").show();                              
	$.getJSON("/simpleWeb/json/work/ContratacionSelecc/"+get.id_pet+","+get.cod_pet+"", function(data){
	
		datos = data;
		var numero = 1;
		$.each(data, function(k, v){
			jsonTRab = v.trabajadores;
			var bodyPreselect = "";
			bodyPreselect += "<tr id='numFila"+k+"'>";
			bodyPreselect += 	"<td style='display: none;' >"+v.codigo+"</td>";
			bodyPreselect += 	"<td>"+numero+"</td>";
			bodyPreselect += 	"<td>"+v.nombre+"</td>";
			bodyPreselect += 	"<td>"+v.cargo+"</td>";
			bodyPreselect += 	"<td>"+v.posicion+"</td>";
			bodyPreselect += 	"<td>0</td>";
			bodyPreselect += 	"<td>0</td>";
			bodyPreselect += 	"<td>"+v.telefono+"</td>";
			bodyPreselect += 	"<td></td>";
			bodyPreselect += 	"<td>"+v.fecha_inicio+"</td>";
			bodyPreselect += 	"<td>";
			bodyPreselect +=		"<a href='detalleTrabajador?id="+v.id+"' target='blank'><button target='blank' title='Ver ficha' id='botonSel'  class='btn btn-circle yellow btn-outline btn-sm'><i class='fa fa-align-justify fa-lg'></i></button></a>";
			bodyPreselect +=		"<button title='Emitir Contrato' onclick='EmitirContrato("+v.codigo+");' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-file-pdf-o fa-lg'></i></button>";
			bodyPreselect +=	"</td>";
			bodyPreselect += "</tr>" ;
			$("#tablePreselect").append(bodyPreselect);
			numero = numero+1;
		})
		$("#loading").hide();
			$('#tbl_Info').DataTable({
			"destoy": true ,
			
	});
		$('#tbl_Info').DataTable({
			"sPaginationType": "full_numbers" ,
			
	}); 
}).fail(function(jqXHR, textStatus, errorThrown) {

    alerta(errorThrown);
	$("#loading").hide();
})
}

function ver(codigo){

}

function EmitirContrato(codigo){
	
			$("#loading").show();

	var get = getINFO();
	var id_P = get.id_pet;
	var codigo_P = get.cod_pet;

	var row = {
		codigo_trabajador : codigo,
		id_peticion : id_P,
		codigo_peticion : codigo_P

	}
			
			
	$.ajax({
	    url: "/simpleWeb/json/work/insertContratacion/" + codigo_P + "," + id_P + "",
	    type: "PUT",
	    data: JSON.stringify(row),
	    beforeSend: function(xhr) {
	        xhr.setRequestHeader("Accept", "application/json");
	        xhr.setRequestHeader("Content-Type", "application/json");
	    },
	    success: function(data, textStatus, jqXHR) {
            
	        saldo();
	        saldoOrden();
	        
	        $('#tbl_Info').dataTable().fnClearTable();
	        $('#tbl_Info').dataTable().fnDestroy();
	        onLoad();


	        $("#loading").hide();
	        alerta("Trabajador Contratado con Exito ");
	        



	    },
	    error: function(ex) {
	        console.log(ex);
	    }

	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})
       
	

}
function detalleNotificacion(){
	var get = getINFO();
	var entero = get.cod_pet;
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


// saldo por peticion
function saldo(){
	var get = getINFO();
	var id_P = get.id_pet;
	var codigo_P = get.cod_pet;
	
	var row = {
			
			id_peticion :  id_P,
			codigo_peticion : codigo_P
		  			
		  		}
	$.ajax({
		url : "/simpleWeb/json/work/selectSaldoNotificacion/"+codigo_P+","+id_P+"",
		type : "GET",
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept","application/json");
			xhr.setRequestHeader("Content-Type","application/json");
		},
		success : function(data, textStatus, jqXHR) {
              
		
			var saldo = data[0].total_saldo; 
			var cantidadTotal =  data[0].cantidad_total; 
			
			var id_P = get.id_pet;
			var codigo_P = get.cod_pet;
			var row = {
					codigo_peticion : codigo_P,
					id_peticion  : id_P
					
				  			
				  		}
			
			if(data[0].total_saldo == 0){
				   
				$.ajax({
					url : "/simpleWeb/json/work/updateListaPeticion/",
					type : "PUT",
					data : JSON.stringify(row),
					beforeSend : function(xhr) {
						xhr.setRequestHeader("Accept","application/json");
						xhr.setRequestHeader("Content-Type","application/json");
					},
					success : function(data, textStatus, jqXHR) {
                         
					},
					error : function(ex) {
						console.log(ex);
					}
				      
				}).fail(function(jqXHR, textStatus, errorThrown) {

				    alerta(errorThrown);
					$("#loading").hide();
				})
				devolverSeleccionados();
			}else{
				
			}
            
		},
		error : function(ex) {
			console.log(ex);
		}
	
	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})
}

// saldo por orden 
function saldoOrden(){
	var get = getINFO();
	var id_P = get.id_pet;
	var codigo_P = get.cod_pet;
	
	var row = {
			
			id_peticion :  id_P,
			codigo_peticion : codigo_P
		  			
		  		}
	$.ajax({
		url : "/simpleWeb/json/work/selectSaldoOrden/"+codigo_P+","+id_P+"",
		type : "GET",
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept","application/json");
			xhr.setRequestHeader("Content-Type","application/json");
		},
		success : function(data, textStatus, jqXHR) {
              
		
			var saldo = data[0].total_saldo; 
			var cantidadTotal =  data[0].cantidad_total; 
			
			
			var id_P = get.id_pet;
			var codigo_P = get.cod_pet;
			var row = {
					codigo_peticion : codigo_P,
					id_peticion  : id_P
					
				  			
				  		}
			
			if(data[0].total_saldo == 0){
			
				$.ajax({
					url : "/simpleWeb/json/work/updateListaOrden/",
					type : "PUT",
					data : JSON.stringify(row),
					beforeSend : function(xhr) {
						xhr.setRequestHeader("Accept","application/json");
						xhr.setRequestHeader("Content-Type","application/json");
					},
					success : function(data, textStatus, jqXHR) {
                         
					},
					error : function(ex) {
						console.log(ex);
					}
				
				}).fail(function(jqXHR, textStatus, errorThrown) {

				    alerta(errorThrown);
					$("#loading").hide();
				})
			}else{
				
			}
            
		},
		error : function(ex) {
			console.log(ex);
		}
	
	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})
}

//devolver trabajadores que quedaron en lista de seleccionado a preseleccion
function devolverSeleccionados(){
	var get = getINFO();
	
	
	var id_P = get.id_pet;
	var codigo_P = get.cod_pet;
	
	$.ajax({
		url : "/simpleWeb/json/work/devolverSeleccionados/"+codigo_P+","+id_P+"",
		type : "GET",
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept","application/json");
			xhr.setRequestHeader("Content-Type","application/json");
		},
		success : function(data, textStatus, jqXHR) {
              
			trabajadoresCodigo = [];
			$.each(data, function(k,v){
				
				
				trabajadoresCodigo.push(v.codigo_trabajador);
				
			});
			trabajadoresCodigo2 = [];
			for (var i = 0; i < trabajadoresCodigo.length; i++) {

				var row = {

						
						codigo_trabajador : trabajadoresCodigo[i]
						
					}
				trabajadoresCodigo2.push(row);
				
			}
			
			
			$.ajax({
			url : "/simpleWeb/json/work/updateTranajadorNoSelec/",
			type : "PUT",
			data : JSON.stringify(trabajadoresCodigo2),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept","application/json");
				xhr.setRequestHeader("Content-Type","application/json");
			},
			success : function(data, textStatus, jqXHR) {
					
				
			},
			error : function(ex) {
				console.log(ex);
			}

		}).fail(function(jqXHR, textStatus, errorThrown) {

		    alerta(errorThrown);
			$("#loading").hide();
		})
			
			
            
		},
		error : function(ex) {
			console.log(ex);
		}
	
	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
//	$.getJSON("/simpleWeb/json/work/devolverSeleccionados/"+codigo_P+","+id_P+"", function(data){
//		
//		$.each(data, function(k,v){
//			trabajadoresCodigo2 = [];
//			
//			trabajadoresCodigo.push(v.codigo_trabajador);
//			
//		});
//		trabajadoresCodigo2 = trabajadoresCodigo;
//	
//	})
//	   alerta(trabajadoresCodigo);
//	   


}
