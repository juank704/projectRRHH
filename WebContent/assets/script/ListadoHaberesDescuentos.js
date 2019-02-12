//Colocar Permisos
var sociedadPrivilege = new Set();
var huertoPrivilege = new Array();
//Obtener Sociedades y Huertos que tiene acceso
$.each(SESION.campo, function(key, value){
	sociedadPrivilege.add(value.idSociedad);
	huertoPrivilege.push(value.campo);
});

$(document).ready(function(){
	$("#loading").hide();
	Listafrecuencia();
	TipoMoneda();
	ListaSociedad();
	LoadHDReady();
	
	$('#cuotaT').keyup(function(e) {
		var code = e.keyCode || e.which;
		if (code == 109 || code == 189) { // Enter keycode
			// Do something
			var valor = $(this).val();
			$(this).val(valor.replace(/[-]/g, ''))
		}
	});

	monto2Change();
	
	var table = $('#loadTabla').DataTable({
//		"sorting": false,
		responsive: true,
		columnDefs: [
			             {
			                 targets: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
			                 className: 'tdcenter'
			             }
			           ],
			           
			           dom: 'Bfrtip',
			           buttons: [
			                     {
			                      
			                     
			                         extend: 'excelHtml5',
			                         exportOptions: {
			                        	 columns: [ 0, 1, 2, 4, 6, 7, 9, 10, 12, 13, 14 ]
			                      
			                     		
			                         }
			                     }
			                     
			                 ]
			         } 		
	);
	 

	table.columns( [3] ).visible( false );
	table.columns( [5] ).visible( false );
	table.columns( [8] ).visible( false );
	table.columns( [11] ).visible( false );
//	table.columns( [14] ).visible( false );
	table.columns( [16] ).visible( false );
	table.columns( [17] ).visible( false );
	table.columns( [18] ).visible( false );

	var currentTime = new Date();	
    var startDateFrom = new Date(currentTime.getFullYear(), currentTime.getMonth() -1, 1);
	$("#fechaI_trab").datepicker({ 
		dateFormat: 'mm-yy',
		minDate : startDateFrom,
		firstDay: 1,
        changeMonth: true,
        changeYear: true,
       
       

		});
	$("#fechT_trab").datepicker({ 
		dateFormat: 'mm-yy',
		minDate : startDateFrom,
		firstDay: 1,
        changeMonth: true,
        changeYear: true,
        
       

		});
	var numeroBuscar = 0;
	
	
	    
	

  	
	$('#panelform').css({"display" : "block", "opacity" : "0.5"});
	
	
	$("#panelform").click(function() {
		
		
		if ($('#panelform').css("opacity") == '0.5') {
	
			alerta ('Debe Seleccionar una Empresa')
		    $("#Sociedad").focus();
	
		}
		else {
		   
		}
		
		});
	
	$("#idContrato").prop("disabled", true);
});


var estadoAddAll = 0;

function editarFicha(td, id,id_contrato){
		
	$("#modalupdate").modal('show');

	var letraHD = [];
	var codTrabajador = [];
	var nombreTrabajador = [];
	var codigo_hd = [];
	var idFrecuencia = [];
	var PeriodoTerminoHD = [];
	var PeriodoInicioHD = [];
	var ValorCuota = [];
	var Valormonto = [];
	var idTipoMoneda = [];
	var proprcional_trab = [];
	
	
	
	var table = $('#loadTabla').DataTable();
	
	idTipoMoneda = table.row().column(8).data().draw(); 
	var textoValormonto= idTipoMoneda[td]; 
	var textoidTipoMoneda2 = $(textoValormonto).text();
	var idTipoMonedatoString = textoidTipoMoneda2.toString();
	$('#tipoMoneda').val(idTipoMonedatoString);
	
	console.log("id moneda"+idTipoMonedatoString );
	
	if(idTipoMonedatoString == 4){
		$("#monto").show();
		$("#montonew").hide();
	}else{
		$("#monto").hide();
		$("#montonew").show();
	}
	
	
	
	
	console.log(idTipoMonedatoString);
	
	Valormonto = table.row().column(9).data().draw(); 
	var textoValormonto= Valormonto[td]; 
	var textoValormonto2 = $(textoValormonto).text();
	var ValormontoString = textoValormonto2.toString();
	
	if(idTipoMonedatoString == "4"){
		$("#monto_trab").show();
		$("#montonew").hide();
		$('#monto_trab').val(ValormontoString);
 		
	}else{
		$("#monto_trab").hide();
		$("#montonew").show();
		$('#montonew').val(ValormontoString);
 		
		
	}
	
	
	ValorCuota = table.row().column(12).data().draw(); 
	var textoValorCuota= ValorCuota[td]; 
	var textoValorCuota2 = $(textoValorCuota).text();
	var ValorCuotaString = textoValorCuota2.toString();
	$('#cuotaT').val(ValorCuotaString);
	
	if(ValorCuotaString == "N/A"){
		$("#cuotaT").hide();
		$("#labelcuotaT").hide();
		
	}else{
		$("#cuotaT").show();
		$("#labelcuotaT").show();
	}
	
	PeriodoInicioHD = table.row().column(13).data().draw(); 
	var textoPeriodoInicioHD = PeriodoInicioHD[td]; 
	var textoPeriodoInicioHD2 = $(textoPeriodoInicioHD).text();
	var PeriodoInicioHDToString = textoPeriodoInicioHD2.toString();
	
	
	if(PeriodoInicioHDToString == "N/A"){
		$("#fechaI_trab").hide();
		$("#labelfechaI_trab").hide();
		
	}else{
		$("#fechaI_trab").show();
		$("#labelfechaI_trab").show();
		$('#fechaI_trab').val(PeriodoInicioHDToString);
	}
	
	PeriodoTerminoHD = table.row().column(14).data().draw(); 
	var textoPeriodoHD = PeriodoTerminoHD[td]; 
	var textoPeriodoHD2 = $(textoPeriodoHD).text();
	var PeriodoHDToString = textoPeriodoHD2.toString();
	
	if(PeriodoHDToString == "N/A"){
		$("#fechT_trab").hide();
		$("#labelfechT_trab").hide();
		
	}else{
		$("#fechT_trab").show();
		$("#labelfechT_trab").show();
		$('#fechT_trab').val(PeriodoHDToString);
	}
	

	
	
	idFrecuencia = table.row().column(11).data().draw(); 
	var textoidFrecuencia = idFrecuencia[td]; 
	var textoidFrecuencia2 = $(textoidFrecuencia).text();
	var idFrecuenciaToString = textoidFrecuencia2.toString();
	$('#frecuenciaT').val(idFrecuenciaToString);
	
	
	codTrabajador = table.row().column(1).data().draw(); 
	var textocodTrabajador = codTrabajador[td]; 
	var textocodTrabajador2 = $(textocodTrabajador).text();
	var codTrabajadorToString = textocodTrabajador2.toString();
	$('#cod_trab').val(codTrabajadorToString);
	
	nombreTrabajador = table.row().column(2).data().draw(); 
	var textonombreTrabajador = nombreTrabajador[td]; 
	var textotextonombreTrabajador2 = $(textonombreTrabajador).text();
	var nombreTrabajadorToString = textotextonombreTrabajador2.toString();
	$('#nombre_trab').val(nombreTrabajadorToString);
	 
	letraHD = table.row().column(3).data().draw(); 
	var textoHD = letraHD[td]; 
	var textoHD2 = $(textoHD).text();
	var letraHDToString = textoHD2.toString();
	$('#tipo_trab').val(letraHDToString);
	
	proprcional_trab = table.row().column(18).data().draw(); 
	var textoValorpropor= proprcional_trab[td]; 
	var textoValorpropor2 = $(textoValorpropor).text();
	var textoValorpropor3 = textoValorpropor2.toString();
	
	if(textoValorpropor3 == 2){
		$( "#checkProporcional" ).prop( "checked", true );
	}else{
		$( "#checkProporcional" ).prop( "checked", false );
	}
	
	
$("#loading").show();
	
	HD = letraHDToString;
	
	
	codigo_hd = table.row().column(5).data().draw(); 
	var textocodigo_hd = codigo_hd[td]; 
	var textotextocodigo_hd2 = $(textocodigo_hd).text();
	var codigo_hdToString = textotextocodigo_hd2.toString();


	$.getJSON(
			"/simpleWeb/json/work/LoadConceptos/" + HD,
			function(data) {

				$.each(data, function(k, v) {
					
					  var str = "";
					  str = codigo_hdToString;
					    var res = str.substr(0, 1);
			
					    if(res == "2" && v.codigo >= 2000 && v.codigo <= 2999){
							var SelectConcepto = "";
							SelectConcepto += "<option value=" + v.codigo + ">"+ v.codigo + " | "+ v.conceptos + "</option>";

							$("#conceptos2").append(SelectConcepto);
							$('#tipo_trab').val("hn");
							
						}else if(res == "1" && v.codigo >= 1000 && v.codigo <= 1999){
							var SelectConcepto = "";
							SelectConcepto += "<option value=" + v.codigo + ">"+ v.codigo + " | "+ v.conceptos + "</option>";

							$("#conceptos2").append(SelectConcepto);
							$('#tipo_trab').val("h");
						
						}
							else if(HD == "d"){
							var SelectConcepto = "";
							SelectConcepto += "<option value=" + v.codigo + ">"+ v.codigo + " | "+ v.conceptos + "</option>";

							$("#conceptos2").append(SelectConcepto);}
					    
						

				});
				
				
//				codigo_hd = table.row().column(5).data().draw(); 
//				var textocodigo_hd = codigo_hd[td]; 
//				var textotextocodigo_hd2 = $(textocodigo_hd).text();
//				var codigo_hdToString = textotextocodigo_hd2.toString();
				$('#conceptos2').val(codigo_hdToString);
				console.log(codigo_hdToString);
				
			}).done(function() {
		$("#loading").hide();
	})
	
	$("#actualizarUp").attr("onclick","actualizarTrabajador("+id+");");
	$("#cerrarActualiza").attr("onclick","cerraryactualizar("+id+","+codTrabajadorToString+","+id_contrato+");");
	
	
}

 function actualizarTrabajador(id){
	
	  var vaaloIdContrato = $("#idContrato").val();

			
			var tipoTrabajador = $('#tipo_trab').val();
			if(tipoTrabajador == "hn"){
				tipoTrabajador = "h";
			}
			
			var codigoHD = $('#conceptos2').val();
			var montoN2 = "";
			var valorfrecuencia = $('#frecuenciaT').val();
			
			var valorCuota;
			valorCuota = $('#cuotaT').val();
			
			var periodo = $("#fechaI_trab").val();
			
			if(periodo == ""){
				alerta("Debe Ingresar una Fecha de Inicio");
				segundoPopup();
				return;
			}
			
			
			periodo = periodo.split('-');
			periodo = periodo[1]+"-"+periodo[0];
			var periodoF = periodo.replace(/-/gi, "");
			
			var tipo_Moneda = $("#tipoMoneda").val();
			
			if(tipo_Moneda == "4"){
				var montoN = "";
				montoN = $('#monto_trab').val();
				montoN2 = montoN.toString().replace(/\./g, '');
				
				
				
			   
			}else if(tipo_Moneda == "2"){
				
				montoN2 = $('#montonew').val();
				
			
				
			}
			
			if(valorfrecuencia == '180'){ 
				


				} else {
		if ($('#fechaI_trab').length) {
			var fechaI = $('#fechaI_trab').val()
			fechaI = fechaI.split('-');
			fechaI = fechaI[1]+"-"+fechaI[0];
			var fechaI3 = fechaI.replace(/-/gi, "");
		}
	}
			
			if(valorfrecuencia == '180' || valorfrecuencia == '182'){ 
				
			}else{
				if ($('#fechT_trab').length) {
			var fechaT = $('#fechT_trab').val();
			
			
			fechaT = fechaT.split('-');
			fechaT = fechaT[1]+"-"+fechaT[0];
			var fechaT3 = fechaT.replace(/-/gi, "");
			}
			}
			
			if(valorfrecuencia == '180'){
				valorCuota = 0;
				fechaI3 = 0;
				fechaT3 = 0;
			}else if (valorfrecuencia == '182'){
				fechaT3 = 0;
				valorCuota = 0;
			}else{}
			
			var valorcheck = 0;
			
			if($("#checkProporcional").prop('checked') == true){
				valorcheck = 2;
			}else{
				valorcheck = 1;
			}
			
			
			var row = {
					
				     tipo_t : tipoTrabajador,
					 codigo_hd_t : codigoHD,
					 montonew  : montoN2,
					 frecuencia_t : valorfrecuencia, 
					 cuota : valorCuota,
					 periodo_t : periodoF,
				     fecha_inicio : fechaI3,
				     fecha_termino : fechaT3,  
					 id : id,
					 idmoneda : tipo_Moneda,
					 proporcional : valorcheck
				  		}
			 
			$("#loading").show();
			$.ajax({
					url : "/simpleWeb/json/work/updateTrabHD",
					type : "PUT",
					data : JSON.stringify(row),
					beforeSend : function(xhr) {
						xhr.setRequestHeader("Accept","application/json");
						xhr.setRequestHeader("Content-Type","application/json");
					},
					success : function(data, textStatus, jqXHR) {
						
						
						$('#modalupdate').modal('hide'); 

							cargar();
//							}
					    
						 
		           alerta("Trabajador Actualizado con exito ");
						 
							
		                
					},
					error : function(ex) {
						console.log(ex);
					}
				
				}).fail(function(jqXHR, textStatus, errorThrown) {

				    alerta(errorThrown);
					$("#loading").hide();
				})
	
}

function trabajadores() {
	$("#loading").show();
	var SelectConcepto = "";
	SelectConcepto += " <option value='0'>Buscar</option>";
	$("#CodigoTra").append(SelectConcepto);
	
	var codigoS = $("#Sociedad").val();
	Sociedad
	$.getJSON(
			"/simpleWeb/json/work/allTrabajadoresCodNomHD/"+codigoS,
			function(data) {

				$.each(data, function(k, v) {
					$("#loading").show();
					var SelectConcepto = "";

					SelectConcepto += "<option value=" + v.codigo + ">"
							+ v.codigo + " | " + v.nombre + " "+v.ap_paterno+" "+v.ap_materno+"</option>";
					$("#CodigoTra").append(SelectConcepto);
					
					
				});

			}).done(function() {
		$("#loading").hide();

	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})

}

function buscar(){
 cargar();

}



function eliminar(id){
	
	PopupEliminar = "";
	PopupEliminar +='<div class="col-sm-12 col-md-12">';
	PopupEliminar +=          "<div class='btn btn-circle blue btn-outline' id='"+id+"' onclick='validarEliminar(this.id);'><i class='fa fa-clock-o'></i> Confirmar</div>";
	PopupEliminar +=          "<div class='btn btn-circle red btn-outline' onclick='closeModal();'> Cancelar</div>";
	PopupEliminar +='</div>';

    popUp("Confirmar Para eliminar", PopupEliminar, true, "400px", true);
	
}

function validarEliminar(id){
	$.ajax({
	    url: "/simpleWeb/json/work/EliminarHaberDescuento/" + id + "",
	    type: "PUT",
	    beforeSend: function(xhr) {
	        xhr.setRequestHeader("Accept", "application/json");
	        xhr.setRequestHeader("Content-Type", "application/json");
	    },
	    success: function(data, textStatus, jqXHR) {
            
	    
	    	closeModal();
	    	
	  
		    buscar();
	        alerta("Elimado con Exito ");

	    },
	    error: function(ex) {
	        console.log(ex);
	    }

	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})
	
	
}
//function fechat(id,ho,fe,val1,val,frec){
//
//	   var res = "  ";
//		var res2 = " ";
//		var periodo = " ";
//		$("#fecha_trab"+id).val("");
////		periodo = $("#periodo_trab"+id).val();
//		periodo = ho;
//		var fe2 = fe.replace(/-/gi, "/");
//		$("#fecha_trab"+id).val(fe2);
//
//
//	    var str2 = "-02";
//
//		res = periodo.concat(str2);
//		var date = new Date(res);
//		var primerDia = new Date(date.getFullYear(), date
//				.getMonth(), 1);
//		var ultimoDia = new Date(date.getFullYear(), date
//				.getMonth() + 1, 0);
//
//		var sumadia = (ultimoDia.getDate()) + 1;
//
//
//
//
//					var fechaUltimo = "";
//		if (ultimoDia.getDate() == 31
//				|| ultimoDia.getDate() == 30
//				|| ultimoDia.getDate() == 28
//				|| ultimoDia.getDate() == 29) {
//			var numero = periodo.replace(/-/gi, "");
//
//			var total = parseInt(numero);
//			var total2 = total + 1;
//
//			var str = total2;
//			var res1 = str.toString().substr(0, 4);
//			var res2 = str.toString().substr(-2);
//			var res3 = res1 + "-" + res2
//			var str4 = "-01";
//
//			var resultadoFecha = res3.concat(str4);
//
//			fechaUltimo = resultadoFecha;
//		} else {
//		}	   
//$("#fecha_trab"+id).datepicker( 'destroy' ).datepicker({ 
//dateFormat : 'yy/mm/dd',
//minDate: new Date(res),
//maxDate :new Date(fechaUltimo)
//
//});	
//	
//    $("#periodo_trab"+id).change(function(){
//		   var res = "  ";
//		var res2 = " ";
//		var periodo = " ";
//		$("#fecha_trab"+id).val("");
//		periodo = $("#periodo_trab"+id).val();
//		$("#fecha").val(periodo);
//
//
//	    var str2 = "-02";
//
//		res = periodo.concat(str2);
//		var date = new Date(res);
//		var primerDia = new Date(date.getFullYear(), date
//				.getMonth(), 1);
//		var ultimoDia = new Date(date.getFullYear(), date
//				.getMonth() + 1, 0);
//
//		var sumadia = (ultimoDia.getDate()) + 1;
//
//
//
//
//					var fechaUltimo = "";
//		if (ultimoDia.getDate() == 31
//				|| ultimoDia.getDate() == 30
//				|| ultimoDia.getDate() == 28
//				|| ultimoDia.getDate() == 29) {
//			var numero = periodo.replace(/-/gi, "");
//
//			var total = parseInt(numero);
//			var total2 = total + 1;
//
//			var str = total2;
//			var res1 = str.toString().substr(0, 4);
//			var res2 = str.toString().substr(-2);
//			var res3 = res1 + "-" + res2
//			var str4 = "-01";
//
//			var resultadoFecha = res3.concat(str4);
//
//			fechaUltimo = resultadoFecha;
//		} else {
//		}	   
//$("#fecha_trab"+id).datepicker( 'destroy' ).datepicker({ 
//dateFormat : 'yy/mm/dd',
//minDate: new Date(res),
//maxDate :new Date(fechaUltimo)
//
//});
//
//
//});
//    
//    
//    loadHD();
//    Listafrecuencia();
//    formatFechas(id);
//    montoChange(id);
//    monto2Change(id);
//    fechaInicioChange(id);
//    fechaTerminoChange(id);
//    frecuenciaChange(id);
//    formatoMonto(id);
//    formatNumber();
//    format();
//    	
//    	$("#tipo_trab"+id).change(function() {
//    		$("#conceptos"+id).empty();
//    		loadHD();
//    	});
//    
//    	
//    	function loadHD(){
//    		$("#loading").show();
//        	var HD = $("#tipo_trab"+id).val();
//        	$.getJSON(
//        			"/simpleWeb/json/work/LoadConceptos/" + HD,
//        			function(data) {
//        				var SelectConcepto = "";
//        				SelectConcepto += "<option value=''>Seleccione</option>";
//
//				$("#conceptos"+id).append(SelectConcepto);
//        				
//        				$.each(data, function(k, v) {
//
//        					var SelectConcepto = "";
//        					SelectConcepto += "<option value=" + v.codigo + ">"
//        							+ v.conceptos + "</option>";
//
//        					$("#conceptos"+id).append(SelectConcepto);
//
//        				});
//                       
//        			
//        			}).done(function() {
//        		$("#loading").hide();
//        		$('#conceptos'+id+' option[value='+fe+']').attr('selected','selected');
//        		
//        	}).fail(function(jqXHR, textStatus, errorThrown) {
//
//    		    alerta(errorThrown);
//    			$("#loading").hide();
//    		})
//    	}
//    	
// function Listafrecuencia() {
//    		$("#loading").show();
//    		$.getJSON("/simpleWeb/json/work/ListaFrecuencia/", function(data) {
//    			var SelectFrecuencia = "";
//    			SelectFrecuencia += "<option value=''>Seleccione</option>";
//
//				$('#frecuenciaT'+id).append(SelectFrecuencia);
//    			$.each(data, function(k, v) {
//    				var SelectFrecuencia = "";
//    				SelectFrecuencia += "<option value=" + v.id + ">" + v.descripcion
//    						+ "</option>";
//
//    				$('#frecuenciaT'+id).append(SelectFrecuencia);
//    			})
//    			
//    		}).done(function() {
//        		$("#loading").hide();
//        		$('#frecuenciaT'+id+' option[value='+frec+']').attr('selected','selected');
//        		
//        	}).fail(function(jqXHR, textStatus, errorThrown) {
//
//    		    alerta(errorThrown);
//    			$("#loading").hide();
//    		})
//    	}
//    
//    
//}
var numeroP = 0;
function cerrarModal(){

if(numeroP == 0){
	$('.swal2-close').click();
	 $(".swal2-close").toggle();
	$('.swal2-container').modal('hide');
	$('.swal2-container').modal('hide');
	 $(".swal2-popup ").toggle();
	 $('.swal2-popup').modal('hide');
   $(".swal2-container").toggle();
   $('.swal2-close').click();
	 $(".swal2-close").toggle();
	 $( '.swal2-container' ).remove();
    numeroP = numeroP +1;
	 
	  
	 $('.swal2-container').modal('hide');
}else{
	closeModal();
	$( '.swal2-container' ).remove();
}
	
	
}

$("#CodigoTra").change(function() {
	
	
	 
	$("#idContrato").empty();
	
	var codt = $('#CodigoTra').val();
	$("#loading").show();
	$.getJSON(
			"/simpleWeb/json/work/LoadSelectIdContratoPantallaListadoHD/" + codt,
			function(data) {

            cantidadData = data.length;
            
            if(cantidadData > 1){
           	 $("#idContrato").prop("disabled", false);
           	 var SelectIdContrato = "";
				SelectIdContrato += "<option value=''>Seleccione..</option>";

				$("#idContrato").append(SelectIdContrato);
				$.each(data, function(k, v) {

					var SelectIdContrato = "";
					SelectIdContrato += "<option value=" + v.id+ ">"
							+ v.fecha_inicio_actividad + "</option>";

					$("#idContrato").append(SelectIdContrato);

				});
            }else if(cantidadData == 1){
           	 $("#idContrato").prop("disabled", true);
			
				$.each(data, function(k, v) {

					var SelectIdContrato = "";
					SelectIdContrato += "<option value=" + v.id+ ">"
							+ v.fecha_inicio_actividad + "</option>";

					$("#idContrato").append(SelectIdContrato);

				});
            }else if(cantidadData == 0){
           	 $("#idContrato").prop("disabled", true);
            }
      
			}).done(function() {
		$("#loading").hide();
	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})
	
		

		

		});





 $('#Sociedad').change(function(e) {

	 $("#idContrato").prop("disabled", true);
	 $("#tipodivisionB").empty();
	 $('#idContrato').val("");
	 $('#idContrato').empty("");
	 SelectIdContrato = "";
	 SelectIdContrato += "<option value=''>Seleccione..</option>";

	$("#idContrato").append(SelectIdContrato);
	$('#periodo').val("");
	
	var soc = $('#Sociedad').val();
	if(soc == ""){
		alerta("Debe Seleccionar una Empresa");
		return;
	}
	$("#CodigoTra").empty();
	trabajadores();
	$("#panelform").removeAttr( 'style' );
	
	var soci_sap = "";
	$("#loading").show();
	$.getJSON("/simpleWeb/json/work/getSociedadById/"+$('#Sociedad').val()+"" , function(data){
        
		soci_sap = JSON.stringify(data.sociedad);
	
		
	}).done(function() {
		
		$("#tipodivisionB").append("<option value='-1'>Seleccione Huerto</option>");
		var soci_sapFinal  = soci_sap.replace(/\"/g, '');
		
		$.getJSON("/simpleWeb/json/work/getCampoBySociedad/"+$('#Sociedad').val()+"" , function(data){
	        
	      //Obtener huertos en base a los privilegios del usuario
	    	let queryString = huertoPrivilege == null ? "" : JSON.stringify(huertoPrivilege).slice(1,-1);
	    	
			$.each(data, function(k, v){
				  var SelectHuerto = "";
				

                if(huertoPrivilege.includes(v.campo) == true){
                	SelectHuerto += 	"<option value="+v.campo+">"+v.descripcion+"</option>";
                }
				$("#tipodivisionB").append(SelectHuerto);
			})
			
		}).done(function() {
			$("#loading").hide();

		})
	})
	
	
	});
 
 
 $('#tipodivisionB').change(function(e) {
		
		var huertoValor = $("#tipodivisionB").val();
		
			if(huertoValor == "" || huertoValor == -1){
				alerta("Debe Seleccionar un Huerto"); $("#tipodivisionB").focus();
				return;
			}
			
			var zona_sap = "";	 
			$("#loading").show();
			$("#tiposubdivisionB").empty();
			$("#listagrupoB").empty();
			$("#listagrupoB").append("<option value='-1'>Seleccione CECO</option>");
			
			
			$.getJSON("/simpleWeb/json/work/getCampoByCampo/"+$('#tipodivisionB').val()+"" , function(data){
				var SelecZona = "";
				SelecZona +=  "<option value=''>Seleccione Zona</option>";
				$.each(data, function(k, v){
					
					SelecZona += 	"<option value="+v.grupo+">"+v.zona+"</option>";
					
					$("#tiposubdivisionB").append(SelecZona);
					
					
				})

			}).done(function() {
				
				$("#loading").hide();
				
			});
		});
 
 $('#tiposubdivisionB').change(function(e) {
		
		$("#listagrupoB").empty();
		var valor_zona = $("#tiposubdivisionB").val();
		
		if(valor_zona == "" || valor_zona == ""){
			alerta("Debe Seleccionar una Zona");$("#tiposubdivisionB").focus();
			return;
		}
		
		var soci_sap = "";
		$("#loading").show();
		$.getJSON("/simpleWeb/json/work/getSociedadById/"+$('#Sociedad').val()+"" , function(data){
	        
			soci_sap = JSON.stringify(data.sociedad);
		
			
		}).done(function() {
			
			var CECOAgrupacion;

            $.each(SESION.campo, function(key, value){

                  if(value.campo == $('#tipodivisionB').val()){

                        CECOAgrupacion = value.cecos;
                  }
            });
			
			var soci_sapFinal  = soci_sap.replace(/\"/g, '');
			$.getJSON("http://200.55.206.140/SCLEM/JSON_BAPI_COSTCENTER_GETLIST1.aspx?SOCIEDAD="+$('#Sociedad').val()+"&GRUPO="+valor_zona+"&CECO="+CECOAgrupacion , function(data){
				var SelectCECO = "";
				SelectCECO +=  "<option value=''>Seleccione CECO</option>";
			
					
					$.each(data.COSTCENTERLIST, function(k, v){
						
						
						if(v.DESCRIPT.indexOf("Cuartel") > -1 == true ){
							
						}else{SelectCECO += 	"<option value="+v.COSTCENTER+">"+v.DESCRIPT+"</option>";}
			
					})
					$("#listagrupoB").append(SelectCECO);
					
					$("#loading").hide();
			}).done(function() {
				$("#loading").hide();
			
			})
			

		})
	});
 
 
 $('#tipodivisionB,#tiposubdivisionB,#listagrupoB').change(function(e) {
		
		var soc = $('#Sociedad').val();
		if(soc == ""){
			alerta("Debe Seleccionar una Empresa");
			return;
		}
		$("#CodigoTra").empty();
		trabajadores();
		
		});

 function ListaSociedad(){
		$("#loading").show();
		//Obtener Sociedades en base a los privilegios del usuario
		let queryString = sociedadPrivilege == null ? "" : JSON.stringify(sociedadPrivilege).slice(1,-1);
		
		$.getJSON("/simpleWeb/json/work/getSociedad/?idSociedad="+queryString, function(data){
			
			
			$.each(data, function(k, v){
				var SelectSociedad = "";
				if(v.idSociedad == -1){
					
				}else{
				SelectSociedad += 	"<option value="+v.idSociedad+">"+v.sociedad+"</option>";
				
				$("#Sociedad").append(SelectSociedad);
				}
			})
	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	}).done(function() {
		$("#loading").hide();
	});

	}

var count = 0;
function cargar(){
	
	
	var table = $('#loadTabla').DataTable();

	table.clear().draw();

	var soci = $("#Sociedad").val();
	 if(soci === "-1"){soci = null;}
	    else if(soci == ''){
	    	soci = null;
		}
		else{
			soci = $("#Sociedad").val();
		}
	 
	 var periodo = $("#periodo").val();
	 if(periodo === ""){periodo = null;}
	   
		else{
			periodo = periodo.replace(/-/gi, "");
		}
	 
	 var idcontrato = $("#idContrato").val();
	 
	 if(idcontrato === ""){idcontrato = null;}
	 else if(idcontrato === "-1"){idcontrato = null;}
		else{
			idcontrato = $("#idContrato").val();
		}
	 
	 var codtrabajador = $("#CodigoTra").val();
	 
	 if(codtrabajador === "0"){codtrabajador = null;}
	    else if(codtrabajador == ''){
	    	codtrabajador = null;
		}
		else{
			codtrabajador = $("#CodigoTra").val();
		}
	 
	 var tipo_division = $("#tipodivisionB").val();
		
	    if(tipo_division === "-1"){tipo_division = null;}
	    else if(tipo_division == ''){
			tipo_division = null;
		}
		else{
			 tipo_division = $("#tipodivisionB").val();
		}
	    
		
		var tipo_subdivision = $("#tiposubdivisionB").val();
		if(tipo_subdivision === "-1"){tipo_subdivision = null;}
		else if(tipo_subdivision == ''){
			tipo_subdivision = null;
		}else{
			tipo_subdivision = null;
		}
		
		var grupo = $("#listagrupoB").val();
		if(grupo === "-1"){grupo = null;}
		else if(grupo == ''){
			grupo = null;
		}else{
			 grupo = $("#listagrupoB").val();
		}
		
		var hdimput = $("#haberes_descuentos").val();
		if (hdimput === "-1") 
		{
			hdimput = null;
		}
		else if(hdimput == ''){
			hdimput = null;
		}else{
			hdimput = $("#haberes_descuentos").val();
		}
		
		
		var hdimput = $("#haberes_descuentos").val();
		if (hdimput === "-1") 
		{
			hdimput = null;
		}
		else if(hdimput == ''){
			hdimput = null;
		}else{
			hdimput = $("#haberes_descuentos").val();
		}
		
		var concepto = $("#conceptos").val();
		if (concepto === "-1" || concepto == null || concepto == 'null' ) 
		{
			concepto = null;
		}
		else if(concepto == ''){
			concepto = null;
		}else{
			concepto = $("#conceptos").val();
		}
		
		
		
		
	
	$("#loading").show();
	
	  var tableadd = $('#loadTabla').DataTable();

		  $.ajax({
	     		type : "GET",
	     		url : "/simpleWeb/json/work/allHDperiodo/" + periodo + "," + soci + ","+ idcontrato + "," +codtrabajador+","+ tipo_division +","+ tipo_subdivision+","+grupo+","+hdimput+","+concepto,
	     		async: true,
	     		dataType : "JSON",
	     		success : function(data) {
	     		    console.log(data);
	    			$.each(data, function(k, v){
	    				var str = v.periodo;
	    				 var res1 = str.toString().substr(0,4);
	    			     var res2 = str.toString().substr(-2);
	    			     var res3 = res1+"-"+res2;
	    			     
	    			     var monto_tipo;
	    			     var tdopciones;
	    			     
	    			     var fechaI3 ='';
	    			     if(v.fechainicio == 0){
	    			    	 fechaI3 ='N/A';
	    			     }else{
	    			    	  fechaI = v.fechainicio;
	    						 var fechaI1 = fechaI.toString().substr(0,4);
	    					     var fechaI2 = fechaI.toString().substr(-2);
	    					      fechaI3 = fechaI2+"-"+fechaI1; 
	    			     }
	    			     
	    			     var fechaT6 = '';
	    			     if(v.fechatermino == 0){
	    			    	 fechaT6 ='N/A';
	    			     }else{
	    			    	 var fechaT = v.fechatermino;
	    					 var fechaT1 = fechaT.toString().substr(0,4);
	    				     var fechaT2 = fechaT.toString().substr(-2);
	    				     var fechaT6 = fechaT2+"-"+fechaT1;
	    				     
	    				   
	    			     }
	    			     
	    			     var cuotaT = ''	
	    	              if (v.cuotas == 0) {
	    	            	  cuotaT = 'N/A';
	    				} else {
	    					 cuotaT = v.cuotas;
	    				}
	    			     var frecuenciaT = ''	
	    		              if (v.nombreFrecuencia == null) {
	    		            	  frecuenciaT = 'N/A';
	    					} else {
	    						frecuenciaT = v.nombreFrecuencia;
	    					}
	    			     var tipohaberDescuento;
	    			     if(v.tipo == 'h'){tipohaberDescuento = "Haber"}
	    			     else if(v.tipo == 'd'){tipohaberDescuento = "Descuento"}
	    			     else if(v.tipo == 'c'){tipohaberDescuento = "Costo Empresa"}
	    			     
	    			     console.log(v.llavemoneda);
	    			     
	    			 	if(v.llavemoneda == 4){
	    			 		monto_tipo = "<td id='number'>"+String(v.monto2).replace(/(.)(?=(\d{3})+$)/g,'$1.')+"</td>"
	    			
	    			 	}else{
		    					monto_tipo = "<td>"+v.monto2+"</td>"
		    					
		    				}
	    			 	if(v.esta_cambio == 1){
                        	tdopciones = "<td>" +
	                        				"<button title='Modificar' id='"+k+"' onclick='editarFicha("+count+","+v.id+","+v.idcontrato+");' class='btn btn-circle yellow btn-outline btn-sm' disabled>" +
	                        					"<i class='fa fa-pencil-square-o fa-lg'></i>" +
	                        				"</button>" +
	                        				"<button title='Eliminar' id='"+v.id+"'onclick='eliminar(this.id);' class='btn btn-circle red btn-outline btn-sm' disabled>" +
	                        						"<i class='fa fa-close fa-lg'></i>" +
	                        				"</button>" +
	                        			"</td>";
                        }else{
                        	tdopciones = "<td><button title='Modificar' id='"+k+"' onclick='editarFicha("+count+","+v.id+","+v.idcontrato+");' class='btn btn-circle yellow btn-outline btn-sm'><i class='fa fa-pencil-square-o fa-lg'></i></button><button title='Eliminar' id='"+v.id+"'onclick='eliminar(this.id);' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button></td>";
                        }
	    			     
	    			     tableadd.row.add( [
	    				"<td >"+res3+"</td>",
	    				"<td >"+v.codigo_trabajador+"</td>",
	    				"<td>"+v.apellidopaterno+" "+v.apellidomaterno+" "+v.nombre+"</td>",
	    				"<td>"+v.tipo+"</td>",
	    				"<td>"+tipohaberDescuento+"</td>",
	    				"<td>"+v.codigo_hd+"</td>",
	    				"<td>"+v.nombrecodigohd+"</td>",
	    				"<td>"+v.nombremoneda+"</td>",
	    				"<td>"+v.llavemoneda+"</td>",    				
	    				monto_tipo,
	    				"<td>"+frecuenciaT+"</td>",
	    				"<td>"+v.idfrecuencia+"</td>",
	    				"<td>"+cuotaT+"</td>",
	    				"<td>"+fechaI3+"</td>",
	    				"<td>"+fechaT6+"</td>",
	    				tdopciones,
	    				"<td>"+v.id+"</td>",
	    				"<td>"+v.idfrecuencia+"</td>",
	    				"<td>"+v.proporcional+"</td>",
	    				] ).node().id =  count;
	    	     		tableadd.draw();
	    				
	    	     	
	    	     		count ++;
				
				
				})
	     			
	     		}
	     	}).fail(function(jqXHR, textStatus, errorThrown) {

			    alerta(errorThrown);
				$("#loading").hide();
			}).done(function() {
	$("#loading").hide();
	count = 0;

})
}
function montoChange(id){
	$('#cuotaT'+id+'').change(function(e) {
		
		var valor = $(this).val();
		$(this).val(valor.replace(/[-]/g, ''))
		
		monto = $('#cuotaT'+id).val();
		fechaIC = $("#fechaI_trab"+id).val();

	    var str2 = "-02";

		res = fechaIC.concat(str2);
		var date = new Date(res);
		var primerDia = new Date(date.getFullYear(), date
				.getMonth(), 1);
		var ultimoDia = new Date(date.getFullYear(), date
				.getMonth() + 1, 0);

		var sumadia = (ultimoDia.getDate()) + 1;




					var fechaUltimo = "";
		if (ultimoDia.getDate() == 31
				|| ultimoDia.getDate() == 30
				|| ultimoDia.getDate() == 28
				|| ultimoDia.getDate() == 29) {
			var numero = fechaIC.replace(/-/gi, "");
          
			var total = parseInt(numero);
			var total2 = total;
			
			var str = total2;
			var res1 = str.toString().substr(0, 4);
			var res2 = str.toString().substr(-2);
			var res3 = res1 + "-" + res2
			var str4 = "-01";

			var resultadoFecha = res3.concat(str4);

			fechaUltimo = resultadoFecha;
			
		} else {
		}	
		
	    var valNew = fechaUltimo.split('-');
	    var valNew2 = valNew[2]+"-"+valNew[1]+"-"+valNew[0];
		var cantidadtotal = '+';
		var resultadocantidad = cantidadtotal.concat(monto);

		var nuevo = editar_fecha(valNew2,resultadocantidad, "m"); 
		

		 var nuevoModificado = nuevo.split('-');
		  var nuevoModificado2 = nuevoModificado[2]+"-"+nuevoModificado[1]+"-"+nuevoModificado[0];
		  
		  
$("#fechT_trab"+id).val(nuevoModificado2);
		
	$("#fechT_trab"+id).datepicker( 'destroy' ).datepicker({ 
	dateFormat : 'yy-mm-dd',
	setDate: new Date(nuevoModificado2)

	});
	});
}
function editar_fecha(fecha, intervalo, dma, separador) {
	 
	  var separador = separador || "-";
	  var arrayFecha = fecha.split(separador);
	  var dia = arrayFecha[0];
	  var mes = arrayFecha[1];
	  var anio = arrayFecha[2]; 
	  
	  var fechaInicial = new Date(anio, mes - 1, dia);
	  var fechaFinal = fechaInicial;
	  if(dma=="m" || dma=="M"){
	    fechaFinal.setMonth(fechaInicial.getMonth()+parseInt(intervalo));
	  }else if(dma=="y" || dma=="Y"){
	    fechaFinal.setFullYear(fechaInicial.getFullYear()+parseInt(intervalo));
	  }else if(dma=="d" || dma=="D"){
	    fechaFinal.setDate(fechaInicial.getDate()+parseInt(intervalo));
	  }else{
	    return fecha;
	  }
	  dia = fechaFinal.getDate();
	  mes = fechaFinal.getMonth() + 1;
	  anio = fechaFinal.getFullYear();
	 
	  dia = (dia.toString().length == 1) ? "0" + dia.toString() : dia;
	  mes = (mes.toString().length == 1) ? "0" + mes.toString() : mes;
	 
	  return mes + "-" + anio;
	}
function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth()+1; 
    return months <= 0 ? 0 : months;
}
function monto2Change(){
	$('#cuotaT').change(function(e) {
		var valor = $(this).val();
		$(this).val(valor.replace(/[-]/g, ''))
		
//		
//		   var res = "  ";
//		var res2 = " ";
//		var periodo = " ";
//		
//		$("#monto2").val("");
		monto = $("#cuotaT").val();
		fechaIC = $("#fechaI_trab").val();
		
		var fec_ini = "01-"+fechaIC;
	    
        

	  
		var cantidadtotal = '+';
		var resultadocantidad = cantidadtotal.concat(monto);

		
//		editar_fecha("01-01-2017", "+5", "d"); // 06-01-2017
//		editar_fecha("01-01-2017", "-5", "d"); // 27-12-2016
//		editar_fecha("01/01/2017", "+2", "m", "/"); // 01-03-2017
//		editar_fecha("01/01/2017", "+2", "y", "/"); // 01-01-2019
		var nuevo = editar_fecha(fec_ini,resultadocantidad, "m");
		
		
		
		var concatenar = "01-"+nuevo;
		var nuevo_resta = editar_fecha2(concatenar,"-1", "m"); 
		
   
//		  var nuevodato = nuevoModificado[1]+"-"+nuevoModificado[0];
		  
		$("#fechT_trab").val(nuevo_resta);
		var currentTime = new Date();	
		var startDateFrom = new Date(currentTime.getFullYear(), currentTime.getMonth() -1, 1);
		
	$("#fechT_trab").datepicker( 'destroy' ).datepicker({ 
	dateFormat : 'mm-yy',
	minDate : startDateFrom,
	firstDay: 1,
	setdate: new Date(nuevo_resta)
    //maxDate :new Date(nuevoModificado2)

	});
	});
}
function formatFechas(id){
	$('#fechaI_trab'+id).datepicker({ 
		dateFormat: 'yy-mm',
        changeMonth: true,
        changeYear: true,
        minDate : 'today',
       

		});
	$('#fechT_trab'+id).datepicker({ 
		dateFormat: 'yy-mm',
        changeMonth: true,
        changeYear: true,
        //minDate : 'today',
       

		});
}
function fechaInicioChange(id){
	$("#fechaI_trab"+id).change(function(e) {
		   var fechaI = $("#fechaI_trab"+id).val();
		    var fechaT = $("#fechT_trab"+id).val();
		    
		    if(fechaT == ''){
		    	alerta("Debe Seleccionar una Fecha Termino o un N° de Cuotas");
		    	segundoPopup();
		    	return;
		    }else{
		    	var startdate = new Date(fechaI);
			    var enddate = new Date(fechaT);
			    enddate.setDate(enddate.getDate() - startdate.getDate());
			    var agregarValor = (monthDiff(startdate,enddate));
			    $('#cuotaT'+id).val(agregarValor);
			   
		    }   
		    var valor = $(this).val();

			monto = $('#cuotaT'+id).val();
			fechaIC = $("#fechaI_trab"+id).val();
			
			




		    var str2 = "-02";

			res = fechaIC.concat(str2);
			var date = new Date(res);
			var primerDia = new Date(date.getFullYear(), date
					.getMonth(), 1);
			var ultimoDia = new Date(date.getFullYear(), date
					.getMonth() + 1, 0);

			var sumadia = (ultimoDia.getDate()) + 1;




						var fechaUltimo = "";
			if (ultimoDia.getDate() == 31
					|| ultimoDia.getDate() == 30
					|| ultimoDia.getDate() == 28
					|| ultimoDia.getDate() == 29) {
				var numero = fechaIC.replace(/-/gi, "");
		      
				var total = parseInt(numero);
				var total2 = total;
				
				var str = total2;
				var res1 = str.toString().substr(0, 4);
				var res2 = str.toString().substr(-2);
				var res3 = res1 + "-" + res2
				var str4 = "-01";

				var resultadoFecha = res3.concat(str4);

				fechaUltimo = resultadoFecha;
				
			} else {
			}	
			


		    var valNew = fechaUltimo.split('-');
		    var valNew2 = valNew[2]+"-"+valNew[1]+"-"+valNew[0];
			var cantidadtotal = '+';
			var resultadocantidad = cantidadtotal.concat(monto);


			var nuevo = editar_fecha(valNew2,resultadocantidad, "m"); // 02-03-2017
			

			 var nuevoModificado = nuevo.split('-');
			  var nuevoModificado2 = nuevoModificado[2]+"-"+nuevoModificado[1]+"-"+nuevoModificado[0];
			  
			  
		$("#fechT_trab"+id).val(nuevoModificado2);
			
		$("#fechT_trab"+id).datepicker( 'destroy' ).datepicker({ 
		dateFormat : 'yy-mm-dd',
		setDate: new Date(nuevoModificado2)

		});
		
	});
}
$('#fechT_trab').change(function(e) {
	 
	
    var fechaI = $("#fechaI_trab").val();
    var fechaT = $("#fechT_trab").val(); 
    
    var fecha1 = fechaI.split('-');
    var fechainicio = fecha1[1]+"-"+fecha1[0];
    
    var fecha2 = fechaT.split('-');
    var fechafin = fecha2[1]+"-"+fecha2[0];
    
    
    if(fechaI == ''){
    	alerta("Debe Seleccionar una Fecha Inicio");
    	segundoPopup();
    	return;
    }else{
    	var startdate = new Date(fechainicio);
	    var enddate = new Date(fechafin);
	    enddate.setDate(enddate.getDate() - startdate.getDate());
	    var agregarValor = (monthDiff(startdate,enddate));
	    $("#cuotaT").val(agregarValor + 1);
    }    
});
function frecuenciaChange(id){
	$('#frecuenciaT'+id).change(function(e) {
		var valorFrecuencia = $("#frecuenciaT"+id).val();

		if (valorFrecuencia == 181) {
			$('#cuotaT'+id).show();
			$("#fechaI_trab"+id).show();
			$("#labelfechaI_trab"+id).show();
			$('#labelcuotaT'+id).show();
			$("#fechT_trab"+id).show();
			$("#labelfechT_trab"+id).show();
		} else if (valorFrecuencia == 180) {
			$('#cuotaT'+id).hide();
			$("#fechaI_trab"+id).hide();
			$("#labelfechaI_trab"+id).hide();
			$('#labelcuotaT'+id).hide();
			$("#fechT_trab"+id).hide();
			$("#labelfechT_trab"+id).hide();
		} else if (valorFrecuencia == 182) {
			$('#cuotaT'+id).hide();
			$("#fechaI_trab"+id).show();
			$("#labelfechaI_trab"+id).show();
			$('#labelcuotaT'+id).hide();
			$("#fechT_trab"+id).hide();
			$("#labelfechT_trab"+id).hide();
		}

	});
}
function formatoMonto(id){
	$('#monto_trab'+id).keypress(function(tecla) {
        if(tecla.charCode < 48 || tecla.charCode > 57) return false;
    });
	$('#monto_trab'+id).keyup(function(e) {
		 
		var code = e.keyCode || e.which;
		if (code == 109 || code == 189) { 
			var valor = $(this).val();
			$(this).val(valor.replace(/[-]/g, ''))
		
		}
	});

	$('#monto_trab'+id).change(function(e) {
		var valor = $(this).val();
		$(this).val(valor.replace(/[-]/g, ''))
	});
}
function formatNumber (n) {
	n = String(n).replace(/\D/g, "");
	return n === '' ? n : Number(n).toLocaleString();
}
function format() {
	var number = $('.number');
	for(var i = 0; i < number.length; i++){
		number[i].addEventListener('keyup', function(e){
			var element = e.target;
			var value = element.value;
			element.value = formatNumber(value);
		})
	}
}

function Listafrecuencia() {

	$.getJSON("/simpleWeb/json/work/ListaFrecuencia/", function(data) {
		datos = data;
		$.each(data, function(k, v) {
			var SelectFrecuencia = "";
			SelectFrecuencia += "<option value=" + v.id + ">" + v.descripcion
					+ "</option>";

			$("#frecuenciaT").append(SelectFrecuencia);
		})
		$("#frecuencia").val('180');
	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})
}

function LoadHD() {
	$("#loading").show();
	
	HD = $("#tipo_trab").val();

	var IFHD = $("#tipo_trab").val();
	
	if(HD == "hn"){
		
		HD = "h";
	}
	

	$.getJSON(
			"/simpleWeb/json/work/LoadConceptos/" + HD,
			function(data) {

				$.each(data, function(k, v) {

					if(IFHD == "hn" && v.codigo >= 2000 && v.codigo <= 2999){
						var SelectConcepto = "";
						SelectConcepto += "<option value=" + v.codigo + ">"+ v.codigo + " | "+ v.conceptos + "</option>";

						$("#conceptos").append(SelectConcepto);
						
					}else if(IFHD == "h" && v.codigo >= 1000 && v.codigo <= 1999){
						var SelectConcepto = "";
						SelectConcepto += "<option value=" + v.codigo + ">"+ v.codigo + " | "+ v.conceptos + "</option>";

						$("#conceptos").append(SelectConcepto);
					
					}
					else if(IFHD == "c" && v.codigo >= 4000 && v.codigo <= 4999){
						var SelectConcepto = "";
						SelectConcepto += "<option value=" + v.codigo + ">"+ v.codigo + " | "+ v.conceptos + "</option>";

						$("#conceptos").append(SelectConcepto);
					
					}
					
					else{
						
						if(HD == "d"){
						var SelectConcepto = "";
						SelectConcepto += "<option value=" + v.codigo + ">"+ v.codigo + " | "+ v.conceptos + "</option>";

						$("#conceptos").append(SelectConcepto);}
					}

				});

				
			}).done(function() {
		$("#loading").hide();
	})

}

$("#tipo_trab").change(function() {

	
	if ($('#tipo_trab').val() === '') {

		alerta('Seleccione Otra Opción');
		segundoPopup();
		return;
	} else {
		

		$('#conceptos').empty();
		

		
		LoadHD();
		

	}

});

function TipoMoneda() {

	$.getJSON("/simpleWeb/json/work/TipoMonedaHD/", function(data) {
		datos = data;
		$.each(data, function(k, v) {
			var SelectFrecuencia = "";
			SelectFrecuencia += "<option value=" + v.id + ">" + v.descripcion
					+ "</option>";

			$("#tipoMoneda").append(SelectFrecuencia);
		})
		$("#tipoMoneda").val(4);
	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})
}

function setTwoNumberDecimal(event) {
    this.value = parseFloat(this.value).toFixed(2);
}


$('#frecuenciaT').change(function(e) {
	var valorFrecuencia = $("#frecuenciaT").val();

	if (valorFrecuencia == 181) {
		$("#cuotaT").show();
		$("#labelcuotaT").show();
		
		$("#labelfechaI_trab").show();
		$("#fechaI_trab").show();
		
		$("#labelfechT_trab").show();
		$("#fechT_trab").show();
		
	} else if (valorFrecuencia == 180) {
		$("#cuotaT").hide();
		$("#labelcuotaT").hide();
		
		$("#labelfechT_trab").hide();
		$("#fechT_trab").hide();
		
		$("#labelfechaI_trab").show();
		$("#fechaI_trab").show();
		
		$("#fechT_trab").val("");
		$("#cuotaT").val("");
		
	} else if (valorFrecuencia == 182) {
		
		$("#cuotaT").hide();
		$("#labelcuotaT").hide();
		
		$("#labelfechT_trab").hide();
		$("#fechT_trab").hide();
		
		$("#labelfechaI_trab").show();
		$("#fechaI_trab").show();
		
		$("#fechT_trab").val("");
		$("#cuotaT").val("");
		
		
		
		
	}

});

function editar_fecha2(fecha, intervalo, dma, separador) {
	 
	  var separador = separador || "-";
	  var arrayFecha = fecha.split(separador);
	  var dia = arrayFecha[0];
	  var mes = arrayFecha[1];
	  var anio = arrayFecha[2]; 
	  
	  var fechaInicial = new Date(anio, mes - 1, dia);
	  var fechaFinal = fechaInicial;
	  if(dma=="m" || dma=="M"){
	    fechaFinal.setMonth(fechaInicial.getMonth()+parseInt(intervalo));
	  }else if(dma=="y" || dma=="Y"){
	    fechaFinal.setFullYear(fechaInicial.getFullYear()+parseInt(intervalo));
	  }else if(dma=="d" || dma=="D"){
	    fechaFinal.setDate(fechaInicial.getDate()+parseInt(intervalo));
	  }else{
	    return fecha;
	  }
	  dia = fechaFinal.getDate();
	  mes = fechaFinal.getMonth() + 1;
	  anio = fechaFinal.getFullYear();
	 
	  dia = (dia.toString().length == 1) ? "0" + dia.toString() : dia;
	  mes = (mes.toString().length == 1) ? "0" + mes.toString() : mes;
	 
	  return mes + "-" + anio;
	}


$('#fechaCuotas').change(function(e) {
	  $("#cuotaT").val("");
	  $("#fechT_trab").val("");
	  $("#cuotaT").prop("disabled", false);
	
});

$('#tipoMoneda').change(function(e) {
	var tipo_moneda = $("#tipoMoneda").val();
	if(tipo_moneda == 4){
		$("#monto_trab").show();
		$("#monto_trab").val("");
		$("#montonew").hide();
		
	}else if(tipo_moneda == 2){
		$("#monto_trab").hide();
		$("#montonew").show();
		$("#montonew").val("");
	}
	
	});

function segundoPopup(){

$('.swal2-container').css('z-index', '15000');


}

function LoadHDReady() {
	$("#loading").show();
	var HD = "h";

	$.getJSON(
			"/simpleWeb/json/work/LoadConceptos/" + HD,
			function(data) {
				
				var SelectConcepto1 = "";
				SelectConcepto1 += "<option value=''>Seleccione...</option>";
				$("#conceptos").append(SelectConcepto1);
				$.each(data, function(k, v) {
					
					if(HD == "h" && v.codigo >= 1000 && v.codigo <= 1999){
						var SelectConcepto = "";
						SelectConcepto += "<option value=" + v.codigo + ">"+ v.codigo + " | "+ v.conceptos + "</option>";

						$("#conceptos").append(SelectConcepto);
					
					}
				});

			}).done(function() {
		$("#loading").hide();
	})

}

$("#haberes_descuentos").change(function() {

	$("#CodigoTra").prop("disabled", false);
	if ($('#haberes_descuentos').val() === '') {

		alerta('Seleccione Otra Opción');
		$('#conceptos').empty();
		return;
	} else {
		$("#conceptos").prop("disabled", false);

		

		LoadHD2();

	}

});

function LoadHD() {
	$("#loading").show();
	var HD = $("#tipo_trab").val();
	var IFHD = $("#tipo_trab").val();
	
	if(HD == "hn"){
		
		HD = "h";
	}

	$.getJSON(
			"/simpleWeb/json/work/LoadConceptos/" + HD,
			function(data) {

				var SelectConcepto1 = "";
				SelectConcepto1 += "<option value=''>Seleccione...</option>";
				$("#conceptos").append(SelectConcepto1);
				$.each(data, function(k, v) {

					 
					if(IFHD == "hn" && v.codigo >= 2000 && v.codigo <= 2999){
						var SelectConcepto = "";
						SelectConcepto += "<option value=" + v.codigo + ">"+ v.codigo + " | "+ v.conceptos + "</option>";

						$("#conceptos2").append(SelectConcepto);
						
					}else if(IFHD == "h" && v.codigo >= 1000 && v.codigo <= 1999){
						var SelectConcepto = "";
						SelectConcepto += "<option value=" + v.codigo + ">"+ v.codigo + " | "+ v.conceptos + "</option>";

						$("#conceptos2").append(SelectConcepto);
					
					}
					
					else if(IFHD == "c" && v.codigo >= 4000 && v.codigo <= 4999){
						var SelectConcepto = "";
						SelectConcepto += "<option value=" + v.codigo + ">"+ v.codigo + " | "+ v.conceptos + "</option>";

						$("#conceptos2").append(SelectConcepto);
					
					}
					
					else{
						
						if(HD == "d"){
						var SelectConcepto = "";
						SelectConcepto += "<option value=" + v.codigo + ">"+ v.codigo + " | "+ v.conceptos + "</option>";

						$("#conceptos2").append(SelectConcepto);}
					}

				});

			}).done(function() {
		$("#loading").hide();
	})

}

function LoadHD2() {
	$("#loading").show();
	var HD = $("#haberes_descuentos").val();
	var IFHD = $("#haberes_descuentos").val();
	
	if(HD == "hn"){
		
		HD = "h";
	}

	$.getJSON(
			"/simpleWeb/json/work/LoadConceptos/" + HD,
			function(data) {

				var SelectConcepto1 = "";
				SelectConcepto1 += "<option value=''>Seleccione...</option>";
				$("#conceptos").append(SelectConcepto1);
				$.each(data, function(k, v) {

					 
					if(IFHD == "hn" && v.codigo >= 2000 && v.codigo <= 2999){
						var SelectConcepto = "";
						SelectConcepto += "<option value=" + v.codigo + ">"+ v.codigo + " | "+ v.conceptos + "</option>";

						$("#conceptos").append(SelectConcepto);
						
					}else if(IFHD == "h" && v.codigo >= 1000 && v.codigo <= 1999){
						var SelectConcepto = "";
						SelectConcepto += "<option value=" + v.codigo + ">"+ v.codigo + " | "+ v.conceptos + "</option>";

						$("#conceptos").append(SelectConcepto);
					
					}
					
					else if(IFHD == "c" && v.codigo >= 4000 && v.codigo <= 4999){
						var SelectConcepto = "";
						SelectConcepto += "<option value=" + v.codigo + ">"+ v.codigo + " | "+ v.conceptos + "</option>";

						$("#conceptos").append(SelectConcepto);
					
					}
					
					else{
						
						if(HD == "d"){
						var SelectConcepto = "";
						SelectConcepto += "<option value=" + v.codigo + ">"+ v.codigo + " | "+ v.conceptos + "</option>";

						$("#conceptos").append(SelectConcepto);}
					}

				});

			}).done(function() {
		$("#loading").hide();
	})

}


function cerraryactualizar(id,codigo_trabajador,id_contrato){
	
	  var vaaloIdContrato = $("#idContrato").val();

			
			var tipoTrabajador = $('#tipo_trab').val();
			if(tipoTrabajador == "hn"){
				tipoTrabajador = "h";
			}
			
			var codigoHD = $('#conceptos2').val();
			var montoN2 = "";
			var valorfrecuencia = $('#frecuenciaT').val();
			
			var valorCuota;
			valorCuota = $('#cuotaT').val();
			
			var periodo = $("#fechaI_trab").val();
			
			if(periodo == ""){
				alerta("Debe Ingresar una Fecha de Inicio");
				segundoPopup();
				return;
			}
			
			
			periodo = periodo.split('-');
			periodo = periodo[1]+"-"+periodo[0];
			var periodoF = periodo.replace(/-/gi, "");
			
			var tipo_Moneda = $("#tipoMoneda").val();
			
			if(tipo_Moneda == "4"){
				var montoN = "";
				montoN = $('#monto_trab').val();
				montoN2 = montoN.toString().replace(/\./g, '');
				
				
				
			   
			}else if(tipo_Moneda == "2"){
				
				montoN2 = $('#montonew').val();
				
			
				
			}
			
			if(valorfrecuencia == '180'){ 
				


				} else {
		if ($('#fechaI_trab').length) {
			var fechaI = $('#fechaI_trab').val()
			fechaI = fechaI.split('-');
			fechaI = fechaI[1]+"-"+fechaI[0];
			var fechaI3 = fechaI.replace(/-/gi, "");
		}
	}
			
			if(valorfrecuencia == '180' || valorfrecuencia == '182'){ 
				
			}else{
				if ($('#fechT_trab').length) {
			var fechaT = $('#fechT_trab').val();
			
			
			fechaT = fechaT.split('-');
			fechaT = fechaT[1]+"-"+fechaT[0];
			var fechaT3 = fechaT.replace(/-/gi, "");
			}
			}
			
		    
	
			
			if(valorfrecuencia == '180'){
				valorCuota = 0;
				fechaI3 = 0;
				fechaT3 = 0;
			}else if (valorfrecuencia == '182'){
				fechaT3 = 0;
				valorCuota = 0;
			}else{}
			
			var valorcheck = 0;
			
			if($("#checkProporcional").prop('checked') == true){
				valorcheck = 2;
			}else{
				valorcheck = 1;
			}
			
			
			
			
			var row = {
					
				     tipo_t : tipoTrabajador,
					 codigo_hd_t : codigoHD,
					 montonew  : montoN2,
					 frecuencia_t : valorfrecuencia, 
					 cuota : valorCuota,
					 periodo_t : periodoF,
				     fecha_inicio : fechaI3,
				     fecha_termino : fechaT3,  
					 id : id,
					 idmoneda : tipo_Moneda,
					 proporcional : valorcheck,
					 cod_t : codigo_trabajador,
					 id_contrato : id_contrato
				  		}
			
			$("#loading").hide();
			$.ajax({
					url : "/simpleWeb/json/work/cerraryactualizarHD",
					type : "PUT",
					data : JSON.stringify(row),
					beforeSend : function(xhr) {
						xhr.setRequestHeader("Accept","application/json");
						xhr.setRequestHeader("Content-Type","application/json");
					},
					success : function(data, textStatus, jqXHR) {
						
						
						$('#modalupdate').modal('hide'); 

							cargar();
						 
		           alerta("Trabajador Actualizado con exito ");
							
		                
					},
					error : function(ex) {
						console.log(ex);
					}
				
				}).fail(function(jqXHR, textStatus, errorThrown) {

				    alerta(errorThrown);
					$("#loading").hide();
				})
	
}
