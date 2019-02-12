$(document).ready(function() {
	$("#loading").hide();
	$.fn.dataTable.ext.errMode = 'none';
	
	var get = getINFO();
	
	if(get == undefined){
		allDataTable();
	}else{
		onLoad();
	}
	
	var currentTime = new Date();	
    var startDateFrom = new Date(currentTime.getFullYear(), currentTime.getMonth() -3, 1);

	// -- controlar fechas----------------
	$('#fechacentralizacion').datepicker({
		dateFormat : 'dd/mm/yy',
		minDate : startDateFrom,
		firstDay: 1,
		changeMonth: true
		  
	})
	

})

function allDataTable(){
	$("#loading").show();
	
	var valorConcep = "";
  		$.getJSON('/simpleWeb/json/work/AllNominaAnticipos/', function(data) {
  			console.log(data);
  			$.each(data, function(k, v){
  				
  			
  				
  				var fechaI1 = ""+v.fechaanticipo+"";
  				var fechaI2 = fechaI1.split("-");
  				var fecha = (fechaI2[2] + "-" + fechaI2[1] + "-" + fechaI2[0]);
  				
  				 var str = v.periodo;
  				 var res1 = str.toString().substr(0,4);
  			     var res2 = str.toString().substr(-2);
  			     var res3 = res1+"-"+res2;

  				var bodyPreselect = "";
  				bodyPreselect += "<tr id='td"+k+"'>";
  				bodyPreselect += 	"<td style='display:none'>"+v.idtablaswnomina+"</td>";
  				bodyPreselect += 	"<td >"+v.concepto+"</td>";	
  				bodyPreselect += 	"<td>"+res3+"</td>";
  				bodyPreselect += 	"<td>"+fecha+"</td>";
  				bodyPreselect += 	"<td id='number' style='text-align: right;'>"+String(v.totalmonto).replace(/(.)(?=(\d{3})+$)/g,'$1.')+"</td>";
  				bodyPreselect += 	"<td>"+v.estado+"</td>";
  				bodyPreselect += 	"<td style='display:none'>"+v.numeroestado+"</td>";
  				bodyPreselect += 	"<td id='"+k+"'>";
  				// ver nomina
  				if(v.idconcepto == 1){
  					bodyPreselect +=		"<button id='1' title='Ver Detalle'  class='btn btn-circle  btn-sm' onclick='verDetalle("+v.idtablaswnomina+",(this.id));'><i class='fa fa-eye fa-lg'></i></button>";
  				}else if(v.idconcepto == 2){
  					bodyPreselect +=		"<button id='2' title='Ver Detalle'  class='btn btn-circle  btn-sm' onclick='verDetalle("+v.idtablaswnomina+",(this.id));'><i class='fa fa-eye fa-lg'></i></button>";
  				}
  				else if(v.idconcepto == 3){
  					bodyPreselect +=		"<button id='3' title='Ver Detalle'  class='btn btn-circle  btn-sm' onclick='verDetalle("+v.idtablaswnomina+",(this.id));'><i class='fa fa-eye fa-lg'></i></button>";;
  				}
  				
  				if(v.idconcepto == 1){
  					bodyPreselect +=		"<button title='Enviar Mail' id='1' onclick='EnviarMAIL("+v.idtablaswnomina+",(this.id));' class='btn btn-circle green btn-outline btn-sm'><i class='fa fa-envelope fa-lg'></i></button>";
  				}else if(v.idconcepto == 2){
  					bodyPreselect +=		"<button title='Enviar Mail' id='2' onclick='EnviarMAIL("+v.idtablaswnomina+",(this.id));' class='btn btn-circle green btn-outline btn-sm'><i class='fa fa-envelope fa-lg'></i></button>";
  				}
  				else if(v.idconcepto == 3){
  					bodyPreselect +=		"<button title='Enviar Mail' id='3' onclick='EnviarMAIL("+v.idtablaswnomina+",(this.id));' class='btn btn-circle green btn-outline btn-sm'><i class='fa fa-envelope fa-lg'></i></button>";
  				}
  				//Aprobar nomina
  				if(v.idconcepto == 1){
  					bodyPreselect +=		"<button title='Aprobar' id='1' onclick='aprovar("+v.idtablaswnomina+",(this.id));' class='btn btn-circle green btn-outline btn-sm'><i class='fa fa-check-circle fa-lg'></i></button>";
  				}else if(v.idconcepto == 2){
  					bodyPreselect +=		"<button title='Aprobar' id='2' onclick='aprovar("+v.idtablaswnomina+",(this.id));' class='btn btn-circle green btn-outline btn-sm'><i class='fa fa-check-circle fa-lg'></i></button>";
  				}
  				else if(v.idconcepto == 3){
  					bodyPreselect +=		"<button title='Aprobar' id='3' onclick='aprovar("+v.idtablaswnomina+",(this.id));' class='btn btn-circle green btn-outline btn-sm'><i class='fa fa-check-circle fa-lg'></i></button>";
  				}
  				//rechazar nomina
  				if(v.idconcepto == 1){
  					bodyPreselect +=		"<button id='1' title='Rechazar' onclick='rechazar("+v.idtablaswnomina+",(this.id));' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button>";
  				}else if(v.idconcepto == 2){
  					bodyPreselect +=		"<button id='2' title='Rechazar' onclick='rechazar("+v.idtablaswnomina+",(this.id));' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button>";
  				}
  				else if(v.idconcepto == 3){
  					bodyPreselect +=		"<button id='3' title='Rechazar' onclick='rechazar("+v.idtablaswnomina+",(this.id));' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button>";
  				}
  				bodyPreselect +=		"<button id='3' title='Descargar Excel' onclick='DescargarExcel("+v.idtablaswnomina+");' class='btn btn-circle green btn-outline btn-sm'><i class='fa fa-file-excel-o fa-lg'></i></button>";
  				
  				bodyPreselect +=        "<a href='#' onclick = 'javascript:DescargarNomina("+v.idtablaswnomina+");''><button  title='Descargar txt' class='btn btn-circle black btn-outline btn-sm'><i class='fa fa-file-text-o fa-lg'></i></button></a>";
  				
  				if(v.estado == "APROBADO"){
  					bodyPreselect +=		"<button id='centralizador' title='Centralizar' onclick='Centralizar("+v.idtablaswnomina+");' class='btn btn-circle green btn-outline btn-sm'><i class='fa fa-cloud-upload fa-lg'></i></button>";
  				}
  				

  				
  				bodyPreselect +=	"</td>";
  				bodyPreselect += "</tr>" ;
  				
  				
  				$("#tableNomina").append(bodyPreselect);
  			});
  			$("#loading").hide();
  			$('#tbl_Info').dataTable( {
  			  "ordering": false,
  			  "pageLength": 10
  			} );
  		
  			
  		}).fail(function(jqXHR, textStatus, errorThrown) {

		    alerta(errorThrown);
			$("#loading").hide();
		})
  	}
function rechazar(id,val){
	 
	 var popupCierre = "";

	 popupCierre +=    '<div class="col-xs-12 col-sm-12 col-md-12" style="margin-bottom: 10px;">';
	  
	 popupCierre +=    '<div class="col-xs-12 col-sm-12 col-md-12" style="margin-bottom: 10px;">';
	 popupCierre += "Observación<textarea  rows='3' wrap='oft' class='form-control mayusculasWork' id='textarea'></textarea>";
	 popupCierre +='</div>';
	 popupCierre +=    '</div>';
	 popupCierre +=    '<div ></div>';
	 popupCierre +='<div class="col-sm-12 col-md-12">';
	 
	 
	 popupCierre +=          "<div class='btn btn-circle green btn-outline'  onclick='enviarEliminar("+id+","+val+");'><i class='fa fa-check'></i> Rechazar Nomina</div>";
	 popupCierre +=          "<div class='btn btn-circle red btn-outline' onclick='closeModal();'> Cancelar</div>";
	 popupCierre +='</div>';

	    popUp("Rechazar Nomina Anticipo", popupCierre, true, "400px", true);
}
function enviarEliminar(id,val){

	
	if(val == 1){
		var row = {
				idtablaswnomina : id,
				observacion : $('#textarea').val()
			}
			
			
			$.ajax({
				url : "/simpleWeb/json/work/UpdateEstadoNominaAnticipo/",
				type : "PUT",
				data : JSON.stringify(row),
				async: false,
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},
				success : function(data, textStatus, jqXHR) {
					closeModal();
					alerta("Solicitud Rechazada")
					$('#tbl_Info').dataTable().fnClearTable();
					$('#tbl_Info').dataTable().fnDestroy();
					allDataTable()
					

				},
				error : function(ex) {

				}

			}).fail(function(jqXHR, textStatus, errorThrown) {

			    alerta(errorThrown);
				$("#loading").hide();
			})
	}else if(val == 2){
		var row = {
				idtablaswnomina : id,
				observacion : $('#textarea').val()
			}
			
			
			$.ajax({
				url : "/simpleWeb/json/work/UpdateEstadoNominaLiquidacion/",
				type : "PUT",
				data : JSON.stringify(row),
				async: false,
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},
				success : function(data, textStatus, jqXHR) {
					closeModal();
					alerta("Solicitud Rechazada")
					$('#tbl_Info').dataTable().fnClearTable();
					$('#tbl_Info').dataTable().fnDestroy();
					allDataTable()
					

				},
				error : function(ex) {

				}

			}).fail(function(jqXHR, textStatus, errorThrown) {

			    alerta(errorThrown);
				$("#loading").hide();
			})
	}else if(val == 3){
		var row = {
				idtablaswnomina : id,
				observacion : $('#textarea').val()
			}
			
			
			$.ajax({
				url : "/simpleWeb/json/work/UpdateEstadoNominaFiniquito/",
				type : "PUT",
				data : JSON.stringify(row),
				async: false,
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},
				success : function(data, textStatus, jqXHR) {
					closeModal();
					alerta("Solicitud Rechazada")
					$('#tbl_Info').dataTable().fnClearTable();
					$('#tbl_Info').dataTable().fnDestroy();
					allDataTable()
					

				},
				error : function(ex) {

				}

			}).fail(function(jqXHR, textStatus, errorThrown) {

			    alerta(errorThrown);
				$("#loading").hide();
			})
	}
	

}
function aprovar(id,val){
	 
	 var popupCierre = "";

	 popupCierre +=    '<div class="col-xs-12 col-sm-12 col-md-12" style="margin-bottom: 10px;">';
	  
	 popupCierre +=    '<div class="col-xs-12 col-sm-12 col-md-12" style="margin-bottom: 10px;">';
	 popupCierre += "Observación<textarea  rows='3' wrap='oft' class='form-control mayusculasWork' id='textarea2'></textarea>";
	 popupCierre +='</div>';
	 popupCierre +=    '</div>';
	 popupCierre +=    '<div ></div>';
	 popupCierre +='<div class="col-sm-12 col-md-12">';
	 popupCierre +=          "<div class='btn btn-circle green btn-outline'  onclick='enviarAprovar("+id+","+val+");'><i class='fa fa-check'></i> Aprobar Nomina</div>";
	 popupCierre +=          "<div class='btn btn-circle red btn-outline' onclick='closeModal();'> Cancelar</div>";
	 popupCierre +='</div>';

	    popUp("Aprobar Nomina Anticipo", popupCierre, true, "400px", true);
}
function enviarAprovar(id,val){

	var row = {
		idtablaswnomina : id,
		observacion : $('#textarea2').val()

	}
	console.log(row);
	
	$.ajax({
		url : "/simpleWeb/json/work/UpdateEstadoNominaAnticipoAprovar/",
		type : "PUT",
		data : JSON.stringify(row),
		async: false,
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success : function(data, textStatus, jqXHR) {
			closeModal();
			alerta("Solicitud Aprovada")
			$('#tbl_Info').dataTable().fnClearTable();
			$('#tbl_Info').dataTable().fnDestroy();
			allDataTable()
			

		},
		error : function(ex) {

		}

	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})

}

function verDetalle(id,val){
	
     var popupDetalle = "";
     popupDetalle = "<h3>Total: $ <spand id='totalpopup'></spand></h3>"
	 popupDetalle += "<table class='table table-bordered table-hover table-striped table-condensed dataTable no-footer' id='tbl_Fito'>";
	 popupDetalle +=	"<thead>";
	 popupDetalle +=	"<tr>";
	 popupDetalle +=	"<th>N°</th>";
	 popupDetalle +=	"<th>Periodo</th>";
				 
				 popupDetalle +=	"<th>Fecha de Pago</th>";
				 popupDetalle +=	"<th>Tabajador</th>";
				 popupDetalle +=	"<th>Monto Ingresado</th>";
				 popupDetalle +=	"<th >Banco</th>";
				 popupDetalle +=	"</tr>";
				 popupDetalle +=	"</thead>";
			 popupDetalle +=	"<tbody id='append1'>";
			 
			 $("#loading").show();
			 
			 if(val == 1){
					$.getJSON("/simpleWeb/json/work/DetalleVerListaNomina/" + id,
							function(data) {
						
						
						var montototal = data[0].totalmonto;
					
						$("#totalpopup").append(String(montototal).replace(/(.)(?=(\d{3})+$)/g,'$1.'));
					    	var numero = 1;
								$.each(data, function(k, v) {
									
									var fechaI1 = ""+v.fechaanticipo+"";
					  				var fechaI2 = fechaI1.split("-");
					  				var fecha = (fechaI2[2] + "-" + fechaI2[1] + "-" + fechaI2[0]);
					  				
					  				var str = v.periodo;
					  			    var res1 = str.toString().substr(0,4);
					  			    var res2 = str.toString().substr(-2);
					  			    var res3 = res1+"-"+res2;
					  			     
									var popupDetalle1 = "";
			
									popupDetalle1 += "<tr>";
									popupDetalle1 += "<td>"+numero+"</td>";
									popupDetalle1 += "<td>"+res3+"</td>";
									popupDetalle1 += "<td>"+fecha+"</td>";
									popupDetalle1 += "<td style='text-align: left;'>"+v.cod_trabajador+" | "+v.apellidopaterno.toUpperCase()+" "+v.apellidomaterno.toUpperCase()+" "+v.nombre.toUpperCase()+"</td>";
									popupDetalle1 += "<td style='text-align: right;'>"+String(v.montoingresado).replace(/(.)(?=(\d{3})+$)/g,'$1.')+"</td>";
									popupDetalle1 += "<td>"+v.nombrebanco+"</td>";
									popupDetalle1 += "</tr>";
									
									$("#append1").append(popupDetalle1);
									
									
									numero = numero + 1;
								})
								$('#tbl_Fito').DataTable({
					  				"sPaginationType": "full_numbers" ,
					  				
					  				
					  		});  
					  			$('#tbl_Fito').DataTable({
					  				"sPaginationType": "full_numbers" ,
					  				
					  		});
							}).fail(function(jqXHR, textStatus, errorThrown) {

							    alerta(errorThrown);
								$("#loading").hide();
							})
			 }else if(val == 2){
					$.getJSON("/simpleWeb/json/work/DetalleVerListaNominaLiquidacion/" + id,
							function(data) {
						console.log(data);
						var montototal = data[0].totalmonto;
						
						$("#totalpopup").append(String(montototal).replace(/(.)(?=(\d{3})+$)/g,'$1.'));
					 
					    	var numero = 1;
								$.each(data, function(k, v) {
									
									var fechaI1 = ""+v.fechaanticipo+"";
					  				var fechaI2 = fechaI1.split("-");
					  				var fecha = (fechaI2[2] + "-" + fechaI2[1] + "-" + fechaI2[0]);
					  				
					  				var str = v.periodo;
					  			    var res1 = str.toString().substr(0,4);
					  			    var res2 = str.toString().substr(-2);
					  			    var res3 = res1+"-"+res2;
					  			     
									var popupDetalle1 = "";
			
									popupDetalle1 += "<tr>";
									popupDetalle1 += "<td>"+numero+"</td>";
									popupDetalle1 += "<td>"+res3+"</td>";
									popupDetalle1 += "<td>"+fecha+"</td>";
									popupDetalle1 += "<td style='text-align: left;'>"+v.cod_trabajador+" | "+v.apellidopaterno.toUpperCase()+" "+v.apellidomaterno.toUpperCase()+" "+v.nombre.toUpperCase()+"</td>";
									popupDetalle1 += "<td style='text-align: right;'>"+String(v.montoingresado).replace(/(.)(?=(\d{3})+$)/g,'$1.')+"</td>";
									popupDetalle1 += "<td>"+v.nombreempresa+"</td>";
									popupDetalle1 += "</tr>";
									
									$("#append1").append(popupDetalle1);
									
									numero = numero + 1;
								})
								$('#tbl_Fito').DataTable({
					  				"sPaginationType": "full_numbers" ,
					  				orderSequence:["asc"]
					  				
					  		});  
					  			$('#tbl_Fito').DataTable({
					  				"sPaginationType": "full_numbers" ,
					  				orderSequence:["asc"]
					  		});
							}).fail(function(jqXHR, textStatus, errorThrown) {

							    alerta(errorThrown);
								$("#loading").hide();
							})
			 }else{
					$.getJSON("/simpleWeb/json/work/DetalleVerListaNominaFiniquito/" + id,
							function(data) {
						var montototal = data[0].totalmonto;
						
						$("#totalpopup").append(String(montototal).replace(/(.)(?=(\d{3})+$)/g,'$1.'));
					    	var numero = 1;
								$.each(data, function(k, v) {
									console.log(data);
									var fechaI1 = ""+v.fechaanticipo+"";
					  				var fechaI2 = fechaI1.split("-");
					  				var fecha = (fechaI2[2] + "-" + fechaI2[1] + "-" + fechaI2[0]);
					  				
					  				var str = v.periodo;
					  			    var res1 = str.toString().substr(0,4);
					  			    var res2 = str.toString().substr(-2);
					  			    var res3 = res1+"-"+res2;
					  			     
									var popupDetalle1 = "";
			
									popupDetalle1 += "<tr>";
									popupDetalle1 += "<td>"+numero+"</td>";
									popupDetalle1 += "<td>"+res3+"</td>";
									popupDetalle1 += "<td>"+fecha+"</td>";
									popupDetalle1 += "<td style='text-align: left;'>"+v.cod_trabajador+" | "+v.apellidopaterno.toUpperCase()+" "+v.apellidomaterno.toUpperCase()+" "+v.nombre.toUpperCase()+"</td>";
									popupDetalle1 += "<td style='text-align: right;'>"+String(v.montoingresado).replace(/(.)(?=(\d{3})+$)/g,'$1.')+"</td>";
									popupDetalle1 += "<td>"+v.nombreempresa+"</td>";
									popupDetalle1 += "</tr>";
									
									$("#append1").append(popupDetalle1);
									
									numero = numero + 1;
								})
								$('#tbl_Fito').DataTable({
					  				"sPaginationType": "full_numbers" ,
					  				
					  				
					  		});  
					  			$('#tbl_Fito').DataTable({
					  				"sPaginationType": "full_numbers" ,
					  				
					  		});
							}).fail(function(jqXHR, textStatus, errorThrown) {

							    alerta(errorThrown);
								$("#loading").hide();
							})
			 }
		    

			 popupDetalle +=	"</tbody></table>";

	    popUp("Detalle", popupDetalle, true, "100%", true);
	    $("#loading").hide();
}
function onLoad(){
	
	var get = getINFO();
	$("#loading").show();                              
	$.getJSON("/simpleWeb/json/work/obtenerNominaPorMail/"+get.nomina+"", function(data){
	
		$.each(data, function(k, v){
				console.log(v.idconcepto);
				var fechaI1 = ""+v.fechaanticipo+"";
				var fechaI2 = fechaI1.split("-");
				var fecha = (fechaI2[2] + "-" + fechaI2[1] + "-" + fechaI2[0]);
				
				 var str = v.periodo;
				 var res1 = str.toString().substr(0,4);
			     var res2 = str.toString().substr(-2);
			     var res3 = res1+"-"+res2;

				var bodyPreselect = "";
				bodyPreselect += "<tr id='td"+k+"'>";
				bodyPreselect += 	"<td style='display:none'>"+v.idtablaswnomina+"</td>";
				bodyPreselect += 	"<td >"+v.concepto+"</td>";
				bodyPreselect += 	"<td>"+res3+"</td>";
				bodyPreselect += 	"<td>"+fecha+"</td>";
				bodyPreselect += 	"<td id='number' style='text-align: right;'>"+String(v.totalmonto).replace(/(.)(?=(\d{3})+$)/g,'$1.')+"</td>";
				bodyPreselect += 	"<td>"+v.estado+"</td>";
				bodyPreselect += 	"<td style='display:none'>"+v.numeroestado+"</td>";
				bodyPreselect += 	"<td id='"+k+"'>";
				if(v.idconcepto == 1){
  					bodyPreselect +=		"<button id='1' title='Ver Detalle'  class='btn btn-circle  btn-sm' onclick='verDetalle("+v.idtablaswnomina+",(this.id));'><i class='fa fa-eye fa-lg'></i></button>";
  				}else if(v.idconcepto == 2){
  					bodyPreselect +=		"<button id='2' title='Ver Detalle'  class='btn btn-circle  btn-sm' onclick='verDetalle("+v.idtablaswnomina+",(this.id));'><i class='fa fa-eye fa-lg'></i></button>";
  				}
  				else if(v.idconcepto == 3){
  					bodyPreselect +=		"<button id='3' title='Ver Detalle'  class='btn btn-circle  btn-sm' onclick='verDetalle("+v.idtablaswnomina+",(this.id));'><i class='fa fa-eye fa-lg'></i></button>";;
  				}
				//aprobar nomina
  				if(v.idconcepto == 1){
  					bodyPreselect +=		"<button title='Aprobar' id='1' onclick='aprovar("+v.idtablaswnomina+",(this.id));' class='btn btn-circle green btn-outline btn-sm'><i class='fa fa-check-circle fa-lg'></i></button>";
  				}else if(v.idconcepto == 2){
  					bodyPreselect +=		"<button title='Aprobar' id='2' onclick='aprovar("+v.idtablaswnomina+",(this.id));' class='btn btn-circle green btn-outline btn-sm'><i class='fa fa-check-circle fa-lg'></i></button>";
  				}
  				else if(v.idconcepto == 3){
  					bodyPreselect +=		"<button title='Aprobar' id='3' onclick='aprovar("+v.idtablaswnomina+",(this.id));' class='btn btn-circle green btn-outline btn-sm'><i class='fa fa-check-circle fa-lg'></i></button>";
  				}
  				//rechazar nomina
  				if(v.idconcepto == 1){
  					bodyPreselect +=		"<button id='1' title='Rechazar' onclick='rechazar("+v.idtablaswnomina+",(this.id));' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button>";
  				}else if(v.idconcepto == 2){
  					bodyPreselect +=		"<button id='2' title='Rechazar' onclick='rechazar("+v.idtablaswnomina+",(this.id));' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button>";
  				}
  				else if(v.idconcepto == 3){
  					bodyPreselect +=		"<button id='3' title='Rechazar' onclick='rechazar("+v.idtablaswnomina+",(this.id));' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button>";
  				}
  				bodyPreselect +=		"<button id='3' title='Descargar Excel' onclick='DescargarExcel("+v.idtablaswnomina+",(this.id));' class='btn btn-circle green btn-outline btn-sm'><i class='fa fa-file-excel-o fa-lg'></i></button>";
				bodyPreselect +=        "<a href='#' onclick = 'javascript:DescargarNomina("+v.idtablaswnomina+");''><button title='Descargar txt' class='btn btn-circle black btn-outline btn-sm'><i class='fa fa-file-text-o fa-lg'></i></button></a>";
				if(v.estado == "APROBADO"){
  					bodyPreselect +=		"<button id='centralizador' title='Centralizar' onclick='Centralizar("+v.idtablaswnomina+");' class='btn btn-circle green btn-outline btn-sm'><i class='fa fa-cloud-upload fa-lg'></i></button>";
  				}
				bodyPreselect +=	"</td>";
				bodyPreselect += "</tr>" ;
				
				
				$("#tableNomina").append(bodyPreselect);
			});
			$("#loading").hide();
		 
		
})
.fail(function(jqXHR, textStatus, errorThrown) {

    alerta(errorThrown);
	$("#loading").hide();
})

}

function DescargarNomina(ruta){
	
	window.open('/simpleWeb/json/work/getRutaSWNomina.html?ruta='+ruta);
}
function DescargarExcel(ruta){
	
	window.open('/simpleWeb/json/work/getRutaSWNominaExel.html?ruta='+ruta);
}

function EnviarMAIL(idtabla, idconcepto){
	
	
	$("#loading").show();	
		
		$.ajax({
			url : "/simpleWeb/json/work/EnviarMailBoton/"+idtabla+","+idconcepto+"",
			type : "PUT",
			async: true,
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},
			success : function(data, textStatus, jqXHR) {
			
				console.log(data);
				if(data == true){
					alerta("Enviado con Exito");
				}

			},
			error : function(ex) {

			}

		}).fail(function(jqXHR, textStatus, errorThrown) {

		    alerta(errorThrown);
			$("#loading").hide();
		}).done(function() {
			
			$("#loading").hide();
		})
	
	
}

function Centralizar(idnomina){
	$("#fechacentralizacion").val("")
	$('#myModal').modal({show: 'false'}); 
	$("#CentralizarModal").attr("onclick","Centralizar2("+idnomina+");");
}



function Centralizar2(idnomina){
	
	var fecha_cen = $("#fechacentralizacion").val();
	if(fecha_cen == ""){
		alerta("Debe Seleccionar una fecha de Centralización");
		return;
	}
	
	var fecha_c_split = fecha_cen.split("/");
	var fechaEnviar_C = fecha_c_split[2]+fecha_c_split[1]+fecha_c_split[0];
    var aniofiscal_C = fecha_c_split[2];
    
	$("#loading").show();
	$('#myModal').modal('hide')
	
	// centralizacion
	var CUENTAS = [];
	var nItem = 1;
	
	
	
	var numerocuentaSap;
	$("#loading").show();
	$.ajax({url : "/simpleWeb/json/work/numeroCuentaSAPanticipos/",
		type : "GET",
				async : false,
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Accept",
							"application/json");
					xhr.setRequestHeader(
							"Content-Type",
							"application/json");

				},
				success : function(data, textStatus,jqXHR) 
				{
				   
				    numerocuentaSap = data;
					
				}
			}).done(function() {

		$("#loading").hide();
	}).fail(function(jqXHR, textStatus, errorThrown) {

		alerta(errorThrown);
		$("#loading").hide();

	})
	
	
	
	var sociedadDatosC = 0;

	  $.ajax({
   		type : "GET",
   		url : "/simpleWeb/json/work/datoscentralizacion/" + idnomina ,
   		async: false,
   		dataType : "JSON",
   		success : function(data) {
   		    console.log(data);
  			$.each(data, function(k, v){
  				
  				sociedadDatosC = v.empresa_c;
  				

  				var sociedadSap ="";
  				$.ajax({url : "/simpleWeb/json/work/getCampoBySociedad/"+ sociedadDatosC + "",
  					type : "GET",
  							async : false,
  							beforeSend : function(xhr) {
  								xhr.setRequestHeader("Accept",
  										"application/json");
  								xhr.setRequestHeader(
  										"Content-Type",
  										"application/json");

  							},
  							success : function(data, textStatus,jqXHR) 
  							{
  							
  								$.each(data, function(k, v) {
  									

  									sociedadSap = v.sociedad;

  								})
  								
  							}
  						}).done(function() {

  					$("#loading").hide();
  				}).fail(function(jqXHR, textStatus, errorThrown) {

  					alerta(errorThrown);
  					$("#loading").hide();

  				})	
  				
  				
  			CUENTAS = [{
			ITEM: 1,
			CUENTA: numerocuentaSap,
			VALOR: v.montocentralizar_c *1,
			CENTROCOSTO: v.idCECO_c,
			ORDENCO:""
		},{
			ITEM: 2,
			CUENTA: numerocuentaSap,
			VALOR: - v.montocentralizar_c *1,
			CENTROCOSTO:"",
			ORDENCO:""
		}]
		
  				var ASIENTO_CONTABLE = {
  					BAPI: "BAPI_ACC_DOCUMENT_POST",
  					RUNTEST: "false",
  				};		
  				
	
		ASIENTO_CONTABLE.PARAMETROS = {
				BUS_ACT: "RFBU",
				TIPO_DOC: "KA",
				TEXTO: "ANT. SA CONT",
				USUARIO: SESION.user,
				SOCIEDAD: sociedadSap,
				FECHA: fechaEnviar_C,
				ANOFISCAL: aniofiscal_C,
				REFERENCIA: "TEXTO",
				CUENTAS: CUENTAS
				 
			}
			console.log(ASIENTO_CONTABLE)
			console.log(IPSERVERSAP + "JSON_BAPI_ACC_DOCUMENT_POST.aspx?PARAMETRO="+JSON.stringify(ASIENTO_CONTABLE)+"&USPAS="+SESION.user+"X*X"+SESION.pass)
		var mensaje = "";
		var asiento = "";
		$.ajax({
			url: IPSERVERSAP + "JSON_BAPI_ACC_DOCUMENT_POST.aspx?PARAMETRO="+JSON.stringify(ASIENTO_CONTABLE)+"&USPAS="+SESION.user+"X*X"+SESION.pass,
			type:	"GET",
			dataType: 'json',
			async: false,
			success: function(data){
				
				asiento = data.OBJ_KEY;
				
				mensaje += "Asiento Contable Codigo: "+data.OBJ_KEY+" Realizado con exito. \n";
				alerta(mensaje);
				
				
				$("#loading").show();
				
				$.ajax({
					url : "/simpleWeb/json/work/insertRespuestaSapNomina/"+asiento+","+idnomina,
					type : "PUT",
					dataType : "text",
					
					beforeSend : function(xhr) {
						xhr.setRequestHeader("Accept", "application/json");
						xhr.setRequestHeader("Content-Type", "application/json");
						$("#loading").show();

					},
					success : function(data, textStatus, jqXHR) {
							
						alerta(data);
						
						

						$("#loading").hide();
					},
					error : function(ex) {
						console.log(ex);
					}
				}).fail(function(jqXHR, textStatus, errorThrown) {
					console.log(errorThrown);
				    alerta(errorThrown);
					$("#loading").hide();
				})	
				
				
				
				
			},error:function(e){
				console.log(e);
			}
		})
  				
  				
  				
			}) // end ecach
   			
   		}
   	}).fail(function(jqXHR, textStatus, errorThrown) {

		    alerta(errorThrown);
			$("#loading").hide();
		}).done(function() {
			
			
			
$("#loading").hide();


})
	
$("#fechacentralizacion").val("");
		
}