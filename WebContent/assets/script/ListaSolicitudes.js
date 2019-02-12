$(document).ready(function(){
	$("#loading").hide();
	$.fn.dataTable.ext.errMode = 'none';
	onLoad();
});

function onLoad(){
	$("#loading").show();
	$.getJSON("/simpleWeb/json/work/ListaSolicitud/", function(data){
		
		datos = data;
		$.each(data, function(k, v){
			jsonTRab = v.trabajadores;
			var bodyPreselect = "";
			bodyPreselect += "<tr id='botonFila"+v.id_reclutamiento+"'>";
			bodyPreselect += 	"<td >"+v.id_reclutamiento+"</td>";
			bodyPreselect += 	"<td>"+v.faena+"</td>";
			bodyPreselect += 	"<td>"+v.usuario+"</td>";
			bodyPreselect += 	"<td>"+v.cantidad_total+"</td>";
			bodyPreselect += 	"<td>"+v.preseleccionado+"</td>";
			bodyPreselect += 	"<td>"+v.seleccionado+"</td>";
			bodyPreselect += 	"<td>"+v.total_saldo+"</td>";
			bodyPreselect += 	"<td>";
			bodyPreselect +=		"<a href='NumeroSolicitud?id_pet="+v.id_reclutamiento+"'><button title='Ver Notificación'  class='btn btn-circle  btn-sm'><i class='fa fa-eye fa-lg'></i></button></a>";
			bodyPreselect +=		"<button title='Detalle' onclick='detalleSolicitud("+v.id_reclutamiento+");' class='btn btn-circle yellow btn-outline btn-sm'><i class='fa fa-align-justify fa-lg'></i></button>";
			bodyPreselect +=		"<button title='Eliminar Solicitud' onclick='eliminarSolicitud("+v.id_reclutamiento+");' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button>";
			bodyPreselect +=	"</td>";
			bodyPreselect += "</tr>" ;
			$("#tablePreselect").append(bodyPreselect);
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

function detalleSolicitud(id){
	
	$("#loading").show();
  
     var popupDetalle = "";
	 popupDetalle += "<table class='table table-bordered table-hover table-striped table-condensed dataTable no-footer' id='tbl_Fito'>";
	 popupDetalle +=	"<thead>";
	 popupDetalle +=	"<tr>";
	 popupDetalle +=	"		<th style='width: 20%; min-width: 150px;'>N°</th>";
	 popupDetalle +=	"<th style='width: 15%; min-width: 130px;'>Obra/Faena</th>";
				 popupDetalle +=	"<th>Usuario</th>";
				 popupDetalle +=	"<th>Cant.Trab. Solicitados</th>";
				 popupDetalle +=	"<th style='min-width: 150px;'>Cant.Trab. Preseleccionados</th>";
				 popupDetalle +=	"<th style='min-width: 150px;'>Cant.Trab. Seleccionados</th>";
				 popupDetalle +=	"<th style='min-width: 150px;'>Saldo</th>";
				 popupDetalle +=	"</tr>";
				 popupDetalle +=	"</thead>";
			 popupDetalle +=	"<tbody id='append1'>" +
			 
		    	$.getJSON("/simpleWeb/json/work/PreseleccionDetalleVerLista/" + id,
						function(data) {
				    		
							$.each(data, function(k, v) {
								
								var popupDetalle1 = "";
								var popupbus = "";
								
								
								popupDetalle1 += "<tr>";
								popupDetalle1 += "<td>1</td><td>"+v.obra+"</td>";
								popupDetalle1 += "<td>"+v.usuario+"</td>";
								popupDetalle1 += "<td>"+v.cantidad+"</td>";
								popupDetalle1 += "<td>"+v.preseleccionado+"</td>";
								popupDetalle1 += "<td>"+v.seleccionado+"</td>";
								popupDetalle1 += "<td>"+v.saldo+"</td>";
								popupDetalle1 += "</tr>";
								popupDetalle1 += "<tr style='background-color: #3523231f;'>";
								popupDetalle1 += "<td></td><td></td>";
								popupDetalle1 += "<td></td>";
								popupDetalle1 += "<td></td>";
								popupDetalle1 += "<td></td>";
								popupDetalle1 += "<td></td>";
								popupDetalle1 += "<td></td>";
								popupDetalle1 += "</tr>";
								popupbus += ""+v.seleccionado+"";
								
							
								$("#append1").append(popupDetalle1);
								$("#totalbus").append(popupbus);
							})
						}).fail(function(jqXHR, textStatus, errorThrown) {

						    alerta(errorThrown);
							$("#loading").hide();
						})
			 
			 
			 
			 		
			 		
			 popupDetalle +="<tr style='background-color: #3523231f;'>" +
			 		"<td> </td>" +
			 		"<td> </td>" +
			 		"<td> </td>" +
			 		"<td> </td>" +
			 		"<td> </td>" +
			 		"<td> </td>" +
			 		"<td> </td>" +
			 		"</tr>" +
			 	
			 		"<tbody id='append'></tbody>";
                    
    		
		    	$.getJSON("/simpleWeb/json/work/PreseleccionDetalleVer/" + id,
				function(data) {
		    	
		    		var numero = 1;
					$.each(data, function(k, v) {
						var trayecto = "";
						var popupDetalle2 = "";
						popupDetalle2 += "<tr>";
						popupDetalle2 += "<td></td>";
						popupDetalle2 += "<td>" + v.cargo + "</td>";
						popupDetalle2 += "<td>" + v.posicion + "</td>";
						popupDetalle2 += "<td>" + v.cantidad + "</td>";
						popupDetalle2 += "<td>" + v.preseleccionado + "</td>";
						popupDetalle2 += "<td>" + v.seleccionado + "</td>";
						popupDetalle2 += "<td>" + v.saldo + "</td>";
						popupDetalle2 += "</tr>";
						trayecto +="<tr>" +
				 		"<td></td>" +
				 		"<td>Trayecto "+numero+" :</td>" +
				 		"<td>"+v.seleccionado+"</td>" +
				 		"<td></td>" +
				 		"<td></td>" +
				 		"<td></td>" +
				 		"<td></td>" +
				 		"</tr>";
						$("#trayecto").append(trayecto);
						$("#append").append(popupDetalle2);
						numero = numero +1;
					})
					
				}).fail(function(jqXHR, textStatus, errorThrown) {

				    alerta(errorThrown);
					$("#loading").hide();
				})

     popupDetalle +=	"<tr style='background-color: #3523231f;'>" +
			 		"<td> </td>" +
			 		"<td> </td>" +
			 		"<td> </td>" +
			 		"<td> </td>" +
			 		"<td> </td>" +
			 		"<td> </td>" +
			 		"<td> </td>" +
			 		"</tr>" +
			 		
			 		
			 		"<tr>" +
			 		"<td> </td>" +
			 		"<td>Trayecto de Bus:</td>" +
			 		"<td id='totalbus'></td>" +
			 		"<td></td>" +
			 		"<td></td>" +
			 		"<td></td>" +
			 		"<td></td>" +
			 		"</tr>" +
			 		"<tbody id='trayecto'></tbody>";
			 		"</tbody>";
			 popupDetalle +=	"</table>";

	    popUp("Detalle", popupDetalle, true, "100%", true);
	    $("#loading").hide();
}



function eliminarSolicitud(id){
	 var id2 = "#botonEliminar";
	 var popupCierre = "";

	 popupCierre +=    '<div class="col-xs-12 col-sm-12 col-md-12" style="margin-bottom: 10px;">';
	  
	 popupCierre +=    '<div class="col-xs-12 col-sm-12 col-md-12" style="margin-bottom: 10px;">';
	 popupCierre += "Observación<textarea  rows='3' wrap='oft' class='form-control mayusculasWork' id='textarea'></textarea>";
	 popupCierre +='</div>';
	 popupCierre +=    '</div>';
	 popupCierre +=    '<div ></div>';
	 popupCierre +='<div class="col-sm-12 col-md-12">';
	 popupCierre +=          "<div class='btn btn-circle blue btn-outline'  onclick='enviarEliminar("+id+");'><i class='fa fa-clock-o'></i> Enviar</div>";
	 popupCierre +=          "<div class='btn btn-circle red btn-outline' onclick='closeModal();'> Cancelar</div>";
	 popupCierre +='</div>';

	    popUp("Cerrar Orden Reclutamiento", popupCierre, true, "400px", true);
}

function enviarEliminar(id){

		var row = {
		id_reclutamiento : id,
		observacion : $("#textarea").val()

	}
$.ajax({
	url : "/simpleWeb/json/work/UpdateOrdenReclutamiento/",
	type : "PUT",
	data : JSON.stringify(row),
	beforeSend : function(xhr) {
		xhr.setRequestHeader("Accept","application/json");
		xhr.setRequestHeader("Content-Type","application/json");
	},
	success : function(data, textStatus, jqXHR) {
		  closeModal();
		   alerta("Solicitud Eliminada")
		    $('#tbl_Info').dataTable().fnClearTable();
		    $('#tbl_Info').dataTable().fnDestroy();

		onLoad();
	  
	},
	error : function(ex) {
		
	}

}).fail(function(jqXHR, textStatus, errorThrown) {

    alerta(errorThrown);
	$("#loading").hide();
})
	

}