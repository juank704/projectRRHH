//Colocar Permisos
var sociedadPrivilege = new Set();
var huertoPrivilege = new Array();
//Obtener Sociedades y Huertos que tiene acceso
$.each(SESION.campo, function(key, value){
	sociedadPrivilege.add(value.idSociedad);
	huertoPrivilege.push(value.campo);
});

var feriadosArray = [];
$(document).ready(function() {
	$("#loading").hide();
	ListaSociedad();
	ListaTipoLicencia();
	ListaSubtipoLicencia();
	tipodereposo();
    parcial();
    
    var fechaActual = new Date();
	var ano = fechaActual.getFullYear();
	
    var feriados = "";
	
	  $.ajax({
		type : "GET",
		url : '/simpleWeb/json/work/holidays/getHolidaysByYear/'+ano+'',
		async: false,
		dataType : "json",
		success : function(data) {
		  contadorferiados = 0;
			$.each(data, function(k, v) {
				
				feriadosArray.push(v.fechaFeriado);
	   if(contadorferiados == 0){
		   feriados = "'"+v.fechaFeriado+"'";
	   }else{
		   feriados = feriados + ",'"+v.fechaFeriado+"'";
	   }
				
				
	   contadorferiados ++;
			})
		}
	}).fail(function(jqXHR, textStatus, errorThrown) {

		    alerta(errorThrown);
			$("#loading").hide();
		})
	
	var feriadosreplace = feriados.replace(/["]/g, '');
	feriadosreplace = feriados.replace(/[']/g, '"');
	var Nonbusinessday = feriadosreplace;
	
	
	var currentTime = new Date();	
    var startDateFrom = new Date(currentTime.getFullYear(), currentTime.getMonth() -1, 1);
    
    $('#fechaInicioP').datepicker({
		dateFormat : 'dd/mm/yy',
		minDate : startDateFrom,
		firstDay: 1,
		changeMonth: true,
        changeYear: true,
        beforeShowDay: function (date) {
            var datestring = jQuery.datepicker.formatDate('yy-mm-dd', date);
            if (Nonbusinessday.indexOf(datestring) != -1) {
                return [true, "nonbusiness"];
            } 
            else {
                return [true];
            }                   
        }
        
	})

    
    
	$('#fechaFinP').datepicker({
		
		dateFormat : 'dd/mm/yy',
		minDate :startDateFrom,
		firstDay: 1,
		changeMonth: true,
        changeYear: true,
        beforeShowDay: function (date) {
            var datestring = jQuery.datepicker.formatDate('yy-mm-dd', date);
            if (Nonbusinessday.indexOf(datestring) != -1) {
                return [true, "nonbusiness"];
            } 
            else {
                return [true];
            }                   
        }
	})
	
	 $('#fechaInicioFalta').datepicker({
		dateFormat : 'dd/mm/yy',
		minDate : startDateFrom,
		firstDay: 1,
		changeMonth: true,
        changeYear: true,
        beforeShowDay: function (date) {
            var datestring = jQuery.datepicker.formatDate('yy-mm-dd', date);
            if (Nonbusinessday.indexOf(datestring) != -1) {
                return [true, "nonbusiness"];
            } 
            else {
                return [true];
            }                   
        }
        
	})

    
    
	$('#fechaFinFalta').datepicker({
		
		dateFormat : 'dd/mm/yy',
		minDate :startDateFrom,
		firstDay: 1,
		changeMonth: true,
        changeYear: true,
        beforeShowDay: function (date) {
            var datestring = jQuery.datepicker.formatDate('yy-mm-dd', date);
            if (Nonbusinessday.indexOf(datestring) != -1) {
                return [true, "nonbusiness"];
            } 
            else {
                return [true];
            }                   
        }
	})
	
	$('#fechaInicio').datepicker({
		dateFormat : 'dd/mm/yy',
		minDate : startDateFrom,
		firstDay: 1,
		changeMonth: true,
        changeYear: true,
        beforeShowDay: function (date) {
            var datestring = jQuery.datepicker.formatDate('yy-mm-dd', date);
            if (Nonbusinessday.indexOf(datestring) != -1) {
                return [true, "nonbusiness"];
            } 
            else {
                return [true];
            }                   
        }
	})
	$('#fechaFin').datepicker({
		dateFormat : 'dd/mm/yy',
		minDate : startDateFrom,
		firstDay: 1,
		changeMonth: true,
        changeYear: true,
        beforeShowDay: function (date) {
            var datestring = jQuery.datepicker.formatDate('yy-mm-dd', date);
            if (Nonbusinessday.indexOf(datestring) != -1) {
                return [true, "nonbusiness"];
            } 
            else {
                return [true];
            }                   
        }
	})
	
	$('#diascorridosFalta').keyup(function(e) {
		var code = e.keyCode || e.which;
		if (code == 109 || code == 189) { // Enter keycode
			// Do something
			var valor = $(this).val();
			$(this).val(valor.replace(/[-]/g, ''))
		}
	});

	$('#diascorridosFalta').change(function(e) {
		var valor = $(this).val();
		$(this).val(valor.replace(/[-]/g, ''))
	});
	
	$('#diascorridosL').keyup(function(e) {
		var code = e.keyCode || e.which;
		if (code == 109 || code == 189) { // Enter keycode
			// Do something
			var valor = $(this).val();
			$(this).val(valor.replace(/[-]/g, ''))
		}
	});

	$('#diascorridosL').change(function(e) {
		var valor = $(this).val();
		$(this).val(valor.replace(/[-]/g, ''))
	});
    $('#diascorridosPSG').keyup(function(e) {
		var code = e.keyCode || e.which;
		if (code == 109 || code == 189) { // Enter keycode
			// Do something
			var valor = $(this).val();
			$(this).val(valor.replace(/[-]/g, ''))
		}
	});

	$('#diascorridosPSG').change(function(e) {
		var valor = $(this).val();
		$(this).val(valor.replace(/[-]/g, ''))
	});
    
    $('#fechaInicioPSG').datepicker({
		dateFormat : 'dd/mm/yy',
		minDate : startDateFrom,
		firstDay: 1,
		changeMonth: true,
        changeYear: true,
        beforeShowDay: function (date) {
            var datestring = jQuery.datepicker.formatDate('yy-mm-dd', date);
            if (Nonbusinessday.indexOf(datestring) != -1) {
                return [true, "nonbusiness"];
            } 
            else {
                return [true];
            }                   
        }
	})
	
	$('#fechaFinPSG').datepicker({
		dateFormat : 'dd/mm/yy',
		minDate : startDateFrom,
		firstDay: 1,
		changeMonth: true,
        changeYear: true,
        beforeShowDay: function (date) {
            var datestring = jQuery.datepicker.formatDate('yy-mm-dd', date);
            if (Nonbusinessday.indexOf(datestring) != -1) {
                return [true, "nonbusiness"];
            } 
            else {
                return [true];
            }                   
        }
	})

	
	
	
	
	
	
		$('#diascorridosP').keyup(function(e) {
		var code = e.keyCode || e.which;
		if (code == 109 || code == 189) { // Enter keycode
			// Do something
			var valor = $(this).val();
			$(this).val(valor.replace(/[-]/g, ''))
		}
	});

	$('#diascorridosP').change(function(e) {
		var valor = $(this).val();
		$(this).val(valor.replace(/[-]/g, ''))
	});
	
	var table = $('#tbl_Info2').DataTable({
		"sorting": false,	
		columnDefs: [
			             {
			                 targets: [0,1,2,3,4,5,6,7,8,9,10],
			                 className: 'tdcenter'
			             }
			           ],
			           dom: 'Bfrtip',
			           buttons: [
			                     {
			                      
			                     
			                         extend: 'excelHtml5',
			                         exportOptions: {
			                        	 columns: [ 0,1,2,3,4,6,7,9 ]
			                      
			                     		
			                         }
			                     }
			                     
			                 ]
			         } 		
	);
	
	table.columns( [8] ).visible( false );

	table.columns( [11] ).visible( false );
	table.columns( [12] ).visible( false );
	table.columns( [13] ).visible( false );
	table.columns( [14] ).visible( false );
	table.columns( [15] ).visible( false );
	table.columns( [16] ).visible( false );
	table.columns( [17] ).visible( false );
	
	var table_per_goce = $('#tbl_Info').DataTable({
		"sorting": false,	
		columnDefs: [
			             {
			                 targets: [0,1,2,3,4,5],
			                 className: 'tdcenter'
			             }
			           ],
			           dom: 'Bfrtip',
			           buttons: [
			                     {
			                      
			                     
			                         extend: 'excelHtml5',
			                         exportOptions: {
			                        	 columns: [ 0,1,2,3,5 ]
			                         }
			                     }
			                     
			                 ]
			         } 		
	);
	table_per_goce.columns( [3] ).visible( false );
	
	var table_per_sin_goce = $('#tbl_Info3').DataTable({
		"sorting": false,	
		columnDefs: [
			             {
			                 targets: [0,1,2,3,4,5,6,7],
			                 className: 'tdcenter'
			             }
			           ],
			           dom: 'Bfrtip',
			           buttons: [
			                     {
			                      
			                     
			                         extend: 'excelHtml5',
			                         exportOptions: {
			                        	 columns: [0,1,3,4,5,6]
			                         }
			                     }
			                     
			                 ]
			         } 		
	);
	
	table_per_sin_goce.columns( [4] ).visible( false );
	
	var table_falta = $('#tbl_Info4').DataTable({
		"sorting": false,	
		columnDefs: [
			             {
			                 targets: [0,1,2,3,4,5,6,7],
			                 className: 'tdcenter'
			             }
			           ],
			           dom: 'Bfrtip',
			           buttons: [
			                     {
			                      
			                     
			                         extend: 'excelHtml5',
			                         exportOptions: {
			                        	 columns: [0,1,3,4,5,6]
			                         }
			                     }
			                     
			                 ]
			         } 		
	);
	
	table_falta.columns( [4] ).visible( false );

	$("#CodigoTra").prop("disabled", true);
	

	
	

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

$('#Sociedad').change(function(e) {
	count = 0;
	var valorSociedad = $('#Sociedad').val();
	if (valorSociedad === '') {
		alerta("Campo Empresa no Puede Estar vacio");
		return;
	}

	$('#divpermiso').hide();
	$('#tablaPermiso').hide();
	$('#divlicencia').hide();
	$('#tablaLicencia').hide();
	$('#divpermisoSinGoce').hide();
	$('#divlicenciaMutual').hide();
	$('#tablaLicenciaMutual').hide();
	$('#tablaPermisoSG').hide();

	$("#tableLic").empty();
	$("#tablePer").empty();
	$("#tablePerSG").empty();
	
	$('#accion').val("");
	$("#CodigoTra").prop("disabled", false);
	$("#detalletrab").empty();
	
	$("#CodigoTra").focus();
	$("#tipodivisionB").empty();
	
	lodtrab();
	
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
	lodtrab();
	onLoad();
	
	});

function lodtrab() {

	$("#CodigoTra").empty();
	var valueSociedad = $('#Sociedad').val();
	
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
	
	
	$("#loading").show();
	$.getJSON(
			"/simpleWeb/json/work/LoadTrabajadorXSociedadListadoPermiso/"+ valueSociedad +","+ tipo_division +","+ tipo_subdivision+","+grupo,
			function(data) {
				$.each(data, function(k, v) {

					var SelectConcepto = "";
					SelectConcepto += "<option value=''>Buscar</option>";
					SelectConcepto += "<option class='mayusculasWork' value=" + v.codigotrabajador
							+ ">" + v.codigotrabajador +  " | " + v.apellidoPaterno.toUpperCase() + " " + v.apellidoMaterno.toUpperCase() + " "
							+ v.nombre.toUpperCase() +  " | " + v.rut + " </option>";
					$("#CodigoTra").append(SelectConcepto);

				});

			}).done(function() {
		$("#loading").hide();

	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})
}

$('#accion').change(function(e) {
    
	//limpiar datos
	$("#fechaInicioP").val();$("#fechaFinP").val();$("#diascorridosP").val();$("#8").val("");
	$("#fechaInicioPSG").val();$("#fechaFinPSG").val();$("#diascorridosPSG").val();$("#checkPermisoSG").val("");$("#9").val("");
	
	$("#tipolicencia").val();$("#TipoR").val();$("#parcial").val();
	$("#fechaInicio").val("");$("#fechaFin").val("");$("#7").val("");
	$("#diascorridosL").val("");$("#checkLicencia").val("");
	
	$("#fechaInicioFalta").val("");$("fechaFinFalta").val("");
	$("#diascorridosP").val("");$("#checkFalta").val("");
	
	count = 0;
	var valorAccion = $("#accion").val();
	if(valorAccion == ""){alerta("Debe Seleccionar una Acción");$("#accion").focus();return;}
	
	
//	$("#parcial").css("display", "none");
//	$("#labelParcial").css("display", "none");
//	$("#labelsubtipo").css("display", "none");
//	$("#subtipolicencia").css("display", "none");


	$("#tableLM").empty();
	$("#tableLic").empty();
	$("#tablePer").empty();
	$("#tablePerSG").empty();
	$("#subtipolicencia").empty();
	$("#subtipolicencia").prop("disabled", true);
	onLoad();
	var accion = $('#accion').val();

	if (accion == 1) {

		$('#divlicenciaMutual').hide();
		$('#divlicencia').hide();
		$('#divpermisoSinGoce').hide();
		
		$('#divpermiso').show();

		$('#tablaLicencia').hide();
		$('#tablaPermiso').show();
		$('#tablaLicenciaMutual').hide();
		$('#tablaPermisoSG').hide();
	} else if (accion == 2) {

		$('#divpermiso').hide();
		$('#divlicenciaMutual').hide();
		$('#divpermisoSinGoce').hide();
		$('#divlicencia').show();

		$('#tablaPermiso').hide();
		$('#tablaLicencia').show();
		$('#tablaLicenciaMutual').hide();
		$('#tablaPermisoSG').hide();

	} else if (accion == 3) {
		$('#divlicenciaMutual').show();
		$('#divpermiso').hide();
		$('#divlicencia').hide();
		$('#divpermisoSinGoce').hide();

		$('#tablaLicenciaMutual').show();
		$('#tablaPermiso').hide();
		$('#tablaLicencia').hide();
		$('#tablaPermisoSG').hide();

	} else if (accion == 4) {
		$('#divpermisoSinGoce').show();
		$('#divlicenciaMutual').hide();
		$('#divpermiso').hide();
		$('#divlicencia').hide();
		
		$('#tablaLicenciaMutual').hide();
		$('#tablaPermiso').hide();
		$('#tablaLicencia').hide();
		$('#tablaPermisoSG').show();
		
	}
	else {
		$('#tablaLicenciaMutual').hide();
		$('#tablaPermiso').hide();
		$('#tablaLicencia').hide();

		$('#divlicenciaMutual').hide();
		$('#divpermiso').hide();
		$('#divlicencia').hide();
	}

});

$('#CodigoTra').change(function(e) 
		{
	count = 0;
	                
	                $("#accion").prop("disabled", false);
					$("#detalletrab").empty();
					var codigo_trab = $("#CodigoTra").val();
					var valueSociedad = $('#Sociedad').val();
					$("#loading").show();
					$
							.getJSON(
									"/simpleWeb/json/work/detalleTrabajadorPermisoLicencia/"
											+ codigo_trab + "," + valueSociedad
											+ "",
									function(data) {

										$
												.each(
														data,
														function(k, v) {
															var detalletra = "";

															detalletra += "<div class='col-md-12'>"
																	+ "<div class='col-md-2'>"
																	+ "<label style='color: #337ab7;'>Código Trabajador: "
																	+ v.codigotrabajador
																	+ "</label></div>"
																	+ "<div class='col-md-2'><label style='color: #337ab7;'>RUT: "
																	+ v.rut
																	+ "</label></div>"
																	+ "<div class='col-md-2'><label style='color: #337ab7;'>Empresa: "
																	+ v.empresa
																	+ "</label></div>"
																	+ "</div>";
															$("#detalletrab")
																	.append(
																			detalletra);

														});

									}).done(function() {
										
									if($("#accion").val() == ""){
										
									}else{
										onLoad();
									}	
										
								$("#loading").hide();
								
							}).fail(function(jqXHR, textStatus, errorThrown) {

							    alerta(errorThrown);
								$("#loading").hide();
							})
				});

var count = 0;
function onLoad() {

	var tablaLicencia = $('#tbl_Info2').DataTable();
	tablaLicencia.clear().draw();
	
	var tablepergoce = $('#tbl_Info').DataTable();
	tablepergoce.clear().draw();
	
	var tablepersingoce = $('#tbl_Info3').DataTable();
	tablepersingoce.clear().draw();
	
	var tablefalta = $('#tbl_Info4').DataTable();
	tablefalta.clear().draw();
	
	
	


	var codigoTrab = $("#CodigoTra").val();
	
	if(codigoTrab === "-1"){codigoTrab = null;}
	else if(codigoTrab == ''){
		codigoTrab = null;
	}else{
		codigoTrab = $("#CodigoTra").val();
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
	
	var idAccion = $("#accion").val();
	var idEmpresa = $('#Sociedad').val();
	$("#loading").show();
	
	console.log("/simpleWeb/json/work/LodtablaPermisoLicencia/"
			+ codigoTrab + "," + idAccion + "," + idEmpresa
			+ "");
	$
			.getJSON(
					"/simpleWeb/json/work/LodtablaPermisoLicencia/"
							+ codigoTrab + "," + idAccion + "," + idEmpresa+","+ tipo_division +","+ tipo_subdivision+","+grupo,
					function(data) {
	                 $.each(data,function(k, v) {
	                	 
	                	 var td_subtipo_licencia;
	                	 var td_nombre_reposo;
	                	 var td_incluye_feriados;
	                	 var td_incluye_feriados2;
	                	 var td_incluye_feriados3;
	                	 var td_ruta_archivo;
	                	 var td_ruta_archivo2;
	                	 var td_ruta_archivo3;
	                	 var td_ruta_archivo4;
	                	 

							            var fechaI1 = v.fecha_desde;
							            var fechaT1 = v.fecha_hasta;


							            var fechaI2 = fechaI1.split("-");
							            var fecha_inicio = (fechaI2[2] + "-" + fechaI2[1] + "-" + fechaI2[0]);

							            var fechaT2 = fechaT1.split("-");
							            var fecha_termino = (fechaT2[2] + "-" + fechaT2[1] + "-" + fechaT2[0]);

							            if (v.accion == 2) {
							            	
							            	if (v.subtipo_licencia == null) {
							            		td_subtipo_licencia = "<td>N/A</td>";
							                } else {
							                	td_subtipo_licencia = "<td>"+v.subtipo_licencia +"</td>";
							                }
							            	
							            	 if (v.nombre_reposo == null) {
							            		 td_nombre_reposo = "<td>N/A</td>";
								                } else {
								                    if (v.nombre_reposo == 'Manana') {
								                    	td_nombre_reposo = "<td>Mañana</td>";
								                    } else {
								                    	td_nombre_reposo = "<td>" + v.nombre_reposo +"</td>";
								                    }

								                }
							            	 
							            	  if (v.incluye_feriados == 1) {
							            		  td_incluye_feriados = "<td><input type='checkbox' value='' checked disabled style='-ms-transform: scale(1.5);-moz-transform: scale(1.5);-webkit-transform: scale(1.5);-o-transform: scale(1.5);'></td>";
								                } else {
								                	td_incluye_feriados = "<td><input type='checkbox' value='' disabled style='-ms-transform: scale(1.5);-moz-transform: scale(1.5);-webkit-transform: scale(1.5);-o-transform: scale(1.5);'></td>";
								                }

								                
								             
								                if (v.ruta_archivo == null) {
								                	td_ruta_archivo = "<button title='Actualizar' id='"+k+"' onclick='editarFicha("+k+","+v.id+","+v.codigo_trabajador+");' class='btn btn-circle yellow btn-outline btn-sm'><i class='fa fa-pencil-square-o fa-lg'></i></button><button title='Eliminar' id='"+v.id+"'onclick='eliminar(this.id);' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button></td>";
								                } else {
								                	td_ruta_archivo = "<td style='text-align:center;'><button title='Descargar' class='btn btn-circle blue btn-outline btn-sm' onclick = 'javascript:mostrarDoc(" + v.id + ");''><i class='fa fa-file-pdf-o fa-lg'></i></button>" +
								                    		"<button title='Actualizar' id='"+k+"' onclick='editarFicha("+k+","+v.id+","+v.codigo_trabajador+");' class='btn btn-circle yellow btn-outline btn-sm'><i class='fa fa-pencil-square-o fa-lg'></i></button><button title='Eliminar' id='"+v.id+"'onclick='eliminar(this.id);' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button></td>";
								               
								                    
								                }
							            	
								                			            	
				tablaLicencia.row.add( [
				                        "<td >"+ v.codigo_trabajador +"</td>",
				                        "<td >"+ v.nombrecompleto +"</td>",
				                        "<td >"+ v.tipo_licencia +"</td>",
				                        td_subtipo_licencia,
				                        td_nombre_reposo,
				                        td_incluye_feriados,
				                        "<td>"+ fecha_inicio +"</td>",
				                        "<td>"+ fecha_termino +"</td>",
					                    "<td>"+ v.horas_inasistencia +"</td>",
					                    "<td>"+ v.dias_corridos +"</td>",
					                    td_ruta_archivo,
					                    "<td>"+ v.tipo_licenciaid +"</td>",
					                    "<td>"+ v.subtipo_licenciaid +"</td>",
					                    "<td>"+ v.reposo +"</td>",
					                    "<td>"+ v.doctor +"</td>",
					                    "<td>"+ v.especialidad +"</td>",
					                    "<td>"+ v.reposo +"</td>",
					                    "<td>"+ v.tipo_reposo +"</td>"
					                   
					                  
					               

					                    ] ).node().id =  count;
										tablaLicencia.draw();


										count ++;			            		    				

							                
							            } else {}
					if (v.accion == 1) 
					{
						
							
							if (v.ruta_archivo == null) 
							{
								td_ruta_archivo2 = "<td><button title='Actualizar' id='"+k+"' onclick='editarFicha("+k+","+v.id+","+v.codigo_trabajador+");' class='btn btn-circle yellow btn-outline btn-sm'><i class='fa fa-pencil-square-o fa-lg'></i></button><button title='Eliminar' id='"+v.id+"'onclick='eliminar(this.id);' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button></td>";
							} else 
							{
								td_ruta_archivo2 = "<td style='text-align:center;'><button title='Descargar' class='btn btn-circle blue btn-outline btn-sm' onclick = 'javascript:mostrarDoc(" + v.id + ");''><i class='fa fa-file-pdf-o fa-lg'></i></button>" +
										"<button title='Actualizar' id='"+k+"' onclick='editarFicha("+k+","+v.id+","+v.codigo_trabajador+");' class='btn btn-circle yellow btn-outline btn-sm'><i class='fa fa-pencil-square-o fa-lg'></i></button><button title='Eliminar' id='"+v.id+"'onclick='eliminar(this.id);' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button></td>";
							}
							
							 			            	
							tablepergoce.row.add( [
								                        "<td >"+ v.codigo_trabajador +"</td>",
								                        "<td >"+ v.nombrecompleto +"</td>",
								                        "<td >"+ fecha_inicio +"</td>",
								                        "<td >"+ fecha_termino +"</td>",
								                        "<td>"+ v.horas_inasistencia +"</td>",
									                    "<td>"+ v.dias_corridos +"</td>",									                  
									                    td_ruta_archivo2

									                    ] ).node().id =  count;
							tablepergoce.draw();


														count ++;	
						
					  } 
					if (v.accion == 4) 
					{
						
						if (v.ruta_archivo == null || v.ruta_archivo == "") 
						{
							td_ruta_archivo3 = "<td><button title='Actualizar' id='"+k+"' onclick='editarFicha("+k+","+v.id+","+v.codigo_trabajador+");' class='btn btn-circle yellow btn-outline btn-sm'><i class='fa fa-pencil-square-o fa-lg'></i></button><button title='Eliminar' id='"+v.id+"'onclick='eliminar(this.id);' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button></td>";
						} else 
						{
							td_ruta_archivo3 = "<td style='text-align:center;'><button title='Descargar' class='btn btn-circle blue btn-outline btn-sm' onclick = 'javascript:mostrarDoc(" + v.id + ");''><i class='fa fa-file-pdf-o fa-lg'></i></button>" +
									"<button title='Actualizar' id='"+k+"' onclick='editarFicha("+k+","+v.id+","+v.codigo_trabajador+");' class='btn btn-circle yellow btn-outline btn-sm'><i class='fa fa-pencil-square-o fa-lg'></i></button><button title='Eliminar' id='"+v.id+"'onclick='eliminar(this.id);' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button></td>";
						}	
						
						 if (v.incluye_feriados == 1) {
		            		  td_incluye_feriados3 = "<td><input type='checkbox' value='' checked disabled style='-ms-transform: scale(1.5);-moz-transform: scale(1.5);-webkit-transform: scale(1.5);-o-transform: scale(1.5);'></td>";
			                } else {
			                	td_incluye_feriados3 = "<td><input type='checkbox' value='' disabled style='-ms-transform: scale(1.5);-moz-transform: scale(1.5);-webkit-transform: scale(1.5);-o-transform: scale(1.5);'></td>";
			                }
						tablepersingoce.row.add( [
						                        "<td >"+ v.codigo_trabajador +"</td>",
						                        "<td >"+ v.nombrecompleto +"</td>",
						                        td_incluye_feriados3,
						                        "<td>" + fecha_inicio + "</td>",
						                        "<td>" + fecha_termino + "</td>",
						                        "<td>" + v.horas_inasistencia + "</td>",
						                        "<td>" + v.dias_corridos + "</td>",
						                        td_ruta_archivo3
						                       

							                    ] ).node().id =  count;
						tablepersingoce.draw();


												count ++;	
						
							
							
					  }										
					if (v.accion == 3) 
					  {
						    
						 
							if (v.incluye_feriados == 1) {
								td_incluye_feriados2 = "<td  style='text-align:center;'><input type='checkbox' value='' checked disabled style='-ms-transform: scale(1.5);-moz-transform: scale(1.5);-webkit-transform: scale(1.5);-o-transform: scale(1.5);'></td>";
			                } else {
			                	td_incluye_feriados2 = "<td style='text-align:center;'><input type='checkbox' value='' disabled style='-ms-transform: scale(1.5);-moz-transform: scale(1.5);-webkit-transform: scale(1.5);-o-transform: scale(1.5);'></td>";
			                }
							
							if (v.ruta_archivo == null) 
							{
								td_ruta_archivo4 = "<td><button title='Actualizar' id='"+k+"' onclick='editarFicha("+k+","+v.id+","+v.codigo_trabajador+");' class='btn btn-circle yellow btn-outline btn-sm'><i class='fa fa-pencil-square-o fa-lg'></i></button><button title='Eliminar' id='"+v.id+"'onclick='eliminar(this.id);' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button></td>";
							} else 
							{
								td_ruta_archivo4 = "<td style='text-align:center;'><button title='Descargar' class='btn btn-circle blue btn-outline btn-sm' onclick = 'javascript:mostrarDoc(" + v.id + ");''><i class='fa fa-file-pdf-o fa-lg'></i></button>" +
										"<button title='Actualizar' id='"+k+"' onclick='editarFicha("+k+","+v.id+","+v.codigo_trabajador+");' class='btn btn-circle yellow btn-outline btn-sm'><i class='fa fa-pencil-square-o fa-lg'></i></button><button title='Eliminar' id='"+v.id+"'onclick='eliminar(this.id);' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button></td>";
							}	
							
						  tablefalta.row.add( [
								                        "<td >"+ v.codigo_trabajador +"</td>",
								                        "<td >"+ v.nombrecompleto +"</td>",
								                        "<td>" + td_incluye_feriados2 + "</td>",
								                        "<td>" + fecha_inicio + "</td>",
								                        "<td>" + fecha_termino + "</td>",
								                        "<td>" + v.horas_inasistencia + "</td>",
								                        "<td>" + v.dias_corridos + "</td>",
								                        td_ruta_archivo4
								                       

									                    ] ).node().id =  count;
						  tablefalta.draw();


														count ++;
							
						
							
						}

					})
							$("#loading").hide();
							
							
							}).done(function() {
							    $("#loading").hide();

							}).fail(function(jqXHR, textStatus, errorThrown) {

							    alerta(errorThrown);
							    $("#loading").hide();
							})								
								
							$('#tbl_Info').css('width', '');
							$('#tbl_Info2').css('width', '');
							$('#tbl_Info3').css('width', '');
							$('#tbl_Info4').css('width', '');
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
	    url: "/simpleWeb/json/work/EliminarPermisoyLicencia/" + id + "",
	    type: "PUT",
	    beforeSend: function(xhr) {
	        xhr.setRequestHeader("Accept", "application/json");
	        xhr.setRequestHeader("Content-Type", "application/json");
	    },
	    success: function(data, textStatus, jqXHR) {
            
	    
	    	closeModal();
	    	
	    	onLoad();
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

function mostrarDoc(ruta){
	
	window.open('/simpleWeb/json/work/getContrato.html?ruta='+ruta);
}

function editarFicha(td,id,codTrab){
	
	var accion_val = $("#accion").val();
	
	if(accion_val == 1)
	{
		
		accionPCG(td,id);
		$("#actualizarPCG").attr("onclick","addForm2("+id+","+codTrab+");"); 

	}
	else if(accion_val == 4)
 	{
		var checkval = [];
		var table = $('#tbl_Info3').DataTable();
		table.rows().every(function(rowIdx, tableLoop, rowLoop) {
			var data = this.node();
			checkval.push($(data).find('input').prop('checked'));

		});

		accionPSG(td, id, checkval[td]);
		$("#actualizarPSG").attr("onclick", "addForm4(" + id + ","+codTrab+");");

	}
	else if(accion_val == 2)
	{   
		var checkvalicencia = [];
		var table = $('#tbl_Info2').DataTable();
		table.rows().every(function(rowIdx, tableLoop, rowLoop) {
			var data = this.node();
			checkvalicencia.push($(data).find('input').prop('checked'));

		});
		accionLicencia(td,id,checkvalicencia[td]);
		$("#actualizarlicencia").attr("onclick","addForm1("+id+","+codTrab+");");
		
		
	}
	else if(accion_val == 3)
	{
		var checkFalta = [];
		var table = $('#tbl_Info4').DataTable();
		table.rows().every(function(rowIdx, tableLoop, rowLoop) {
			var data = this.node();
			checkFalta.push($(data).find('input').prop('checked'));

		});
	      accionfalta(td,id,checkFalta[td]);
	      $("#actualizarfalta").attr("onclick","addForm3("+id+");");
	}
	
	
	

	
	
	
	
	
	if(accion_val == 1)
	{
		$("#modalupdatePermisoConGose").modal('show');
	}
	else if(accion_val == 4)
	{
		$("#modalupdatePermisoSinGose").modal('show');
	}
	else if(accion_val == 2)
	{
		$("#modalupdateLicencia").modal('show');
	}
	else if(accion_val == 3)
	{
		$("#modalupdateFalta").modal('show');
	}
	
	
}

function addForm2(id,codTrab) {

	
	var fechaI1 = $("#fechaInicioP").val();
	var fechaT1 = $("#fechaFinP").val();

	    //Split de las fechas recibidas para separarlas
	    var x = fechaI1.split("/");
	    var z = fechaT1.split("/");


	    fecha1 = x[1] + "-" + x[0] + "-" + x[2];
	    fecha2 = z[1] + "-" + z[0] + "-" + z[2];
	    

	    //Comparamos las fechas
	    if (Date.parse(fecha1) > Date.parse(fecha2)){
	    	alerta("Fecha Fin no Debe Ser Inferion A Fecha Inicio");
	    	segundoPopup();
	        return;
	    }
	
	var codigoTrab = codTrab;
	var form_data = new FormData();

	var d = new Date();

	var month = d.getMonth() + 1;
	var day = d.getDate();
	var year = d.getFullYear();
	var min = d.getMinutes();
	var hour = d.getHours()
	var seconds = d.getSeconds();

	
if ($('#8').val() == '') {
		
	}else{
	 var ruta = "";

     $.ajax({
     		type : "GET",
     		url : '/simpleWeb/json/work/getRutaSinGoceDeSueldo/',
     		async: false,
     		dataType : "text",
     		success : function(data) {
     			ruta = data;
     		}
     	}).fail(function(jqXHR, textStatus, errorThrown) {

		    alerta(errorThrown);
			$("#loading").hide();
		})

	var nombreArchivo = $("#8").prop("files")[0].name;
	var strArray = nombreArchivo.split(".");
	var ruta2 = (ruta + strArray[0] + codigoTrab + "-" + year + "-" + month
			+ "-" + day + "-" + hour + "-" + min + "-" + seconds + "." + strArray[1]);
	}

	 if ($('#fechaInicioP').val() === '') {
		alerta("Debe Seleccionar una fecha de Inicio");
		$("#fechaInicioP").focus();
		return;
	} else if ($('#fechaFinP').val() === 'NaN/NaN/NaN') {
		alerta("Debe Seleccionar una fecha de Fin");
		$("#fechaInicioP").focus();
		return;
	} else if ($('#fechaFinP').val() === '') {
		alerta("Debe Seleccionar una fecha de Fin");
		$("#fechaFinP").focus();
		return;
	}

	var numeroinput = 8;
	if ($('#8').val() == '') {

	} else {
		upload(numeroinput,codTrab);
	}

	var fechaI1 = $("#fechaInicioP").val();
	var fechaT1 = $("#fechaFinP").val();

	var fechaI2 = fechaI1.split("/");
	var fecha_inicio = (fechaI2[2] + "/" + fechaI2[1] + "/" + fechaI2[0]);
	var fechaT2 = fechaT1.split("/");
	var fecha_fin = (fechaT2[2] + "/" + fechaT2[1] + "/" + fechaT2[0]);
	var dias_corridos = $("#diascorridosP").val();
	var fecha_inicio2 = fecha_inicio.replace("/", "-");
	var fecha_inicio3 = fecha_inicio2.replace("/", "-");
	var fecha_fin2 = fecha_fin.replace("/", "-");
	var fecha_fin3 = fecha_fin2.replace("/", "-");

	
	var json2 = {

	
		fecha_desde : fecha_inicio3,
		fecha_hasta : fecha_fin3,
		ruta_archivo : ruta2,
		dias_corridos : dias_corridos,
		id : id

	}


	$("#loading").show();
	$.ajax({
		url : "/simpleWeb/json/work/UpdateConGoceDeSueldo/",
		type : "PUT",
		data : JSON.stringify(json2),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
			$("#loading").show();

		},
		success : function(data, textStatus, jqXHR) {

			

			$("#modalupdatePermisoConGose").modal('hide');
			onLoad();
			$('#9').val("");
			$("#loading").hide();
			alerta("Modificado con Exito");
			
		
			$("#loading").hide();
		},
		error : function(ex) {
			console.log(ex);
		}
	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})

}

function accionPSG(td,id,check2){
	
	   
	   $("#modalupdatePermisoSinGose").modal('show');
		
		var fecha_desde = [];
		var fecha_hasta = [];
		var dias_corridos = [];
	
		
		var table = $('#tbl_Info3').DataTable();

		fecha_desde = table.row().column(3).data().draw(); 
		var textofecha_desde = fecha_desde[td]; 
		var textofecha_desde2 = $(textofecha_desde).text();
		var textofecha_desdetoString = textofecha_desde2.toString().replace(/[-]/g, '/');
		
		
		
		$('#fechaInicioPSG').val(textofecha_desdetoString);
		
		fecha_hasta = table.row().column(4).data().draw(); 
		var textofecha_hasta = fecha_hasta[td]; 
		var textofecha_hasta2 = $(textofecha_hasta).text();
		var fecha_hastatoString = textofecha_hasta2.toString().replace(/[-]/g, '/');
		$('#fechaFinPSG').val(fecha_hastatoString);
		
		dias_corridos = table.row().column(6).data().draw(); 
		var textodias_corridos = dias_corridos[td]; 
		var textodias_corridos2 = $(textodias_corridos).text();
		var dias_corridostoString = textodias_corridos2.toString();
		$('#diascorridosPSG').val(dias_corridostoString);
		
		if(check2){
			
			
			$('#checkPermisoSG').prop('checked', true);
		
		}else{
			$('#checkPermisoSG').prop('checked', false);
			
		}
		
		
	
		
}

function accionPCG(td,id){
	

	
	var fecha_desde = [];
	var fecha_hasta = [];
	var dias_corridos = [];
	
	var table = $('#tbl_Info').DataTable();

	fecha_desde = table.row().column(2).data().draw(); 
	var textofecha_desde = fecha_desde[td]; 
	var textofecha_desde2 = $(textofecha_desde).text();
	var textofecha_desdetoString = textofecha_desde2.toString().replace(/[-]/g, '/');
	$('#fechaInicioP').val(textofecha_desdetoString);
	
	fecha_hasta = table.row().column(3).data().draw(); 
	var textofecha_hasta = fecha_hasta[td]; 
	var textofecha_hasta2 = $(textofecha_hasta).text();
	var fecha_hastatoString = textofecha_hasta2.toString().replace(/[-]/g, '/');
	$('#fechaFinP').val(fecha_hastatoString);
	
	dias_corridos = table.row().column(5).data().draw(); 
	var textodias_corridos = dias_corridos[td]; 
	var textodias_corridos2 = $(textodias_corridos).text();
	var dias_corridostoString = textodias_corridos2.toString();
	$('#diascorridosP').val(dias_corridostoString);
	
	
//	
//	console.log("id moneda"+idTipoMonedatoString );
//	
//	if(idTipoMonedatoString == 4){
//		$("#monto").show();
//		$("#montonew").hide();
//	}else{
//		$("#monto").hide();
//		$("#montonew").show();
//	}
//	
//	
//	
//	
//	console.log(idTipoMonedatoString);
//	
//	Valormonto = table.row().column(9).data().draw(); 
//	var textoValormonto= Valormonto[td]; 
//	var textoValormonto2 = $(textoValormonto).text();
//	var ValormontoString = textoValormonto2.toString();
//	
//	if(idTipoMonedatoString == "4"){
//		$("#monto_trab").show();
//		$("#montonew").hide();
//		$('#monto_trab').val(ValormontoString);
// 		
//	}else{
//		$("#monto_trab").hide();
//		$("#montonew").show();
//		$('#montonew').val(ValormontoString);
// 		
//		
//	}
//	
//	
//	ValorCuota = table.row().column(12).data().draw(); 
//	var textoValorCuota= ValorCuota[td]; 
//	var textoValorCuota2 = $(textoValorCuota).text();
//	var ValorCuotaString = textoValorCuota2.toString();
//	$('#cuotaT').val(ValorCuotaString);
//	
//	if(ValorCuotaString == "N/A"){
//		$("#cuotaT").hide();
//		$("#labelcuotaT").hide();
//		
//	}else{
//		$("#cuotaT").show();
//		$("#labelcuotaT").show();
//	}
//	
//	PeriodoInicioHD = table.row().column(13).data().draw(); 
//	var textoPeriodoInicioHD = PeriodoInicioHD[td]; 
//	var textoPeriodoInicioHD2 = $(textoPeriodoInicioHD).text();
//	var PeriodoInicioHDToString = textoPeriodoInicioHD2.toString();
//	
//	
//	if(PeriodoInicioHDToString == "N/A"){
//		$("#fechaI_trab").hide();
//		$("#labelfechaI_trab").hide();
//		
//	}else{
//		$("#fechaI_trab").show();
//		$("#labelfechaI_trab").show();
//		$('#fechaI_trab').val(PeriodoInicioHDToString);
//	}
//	
//	PeriodoTerminoHD = table.row().column(14).data().draw(); 
//	var textoPeriodoHD = PeriodoTerminoHD[td]; 
//	var textoPeriodoHD2 = $(textoPeriodoHD).text();
//	var PeriodoHDToString = textoPeriodoHD2.toString();
//	
//	if(PeriodoHDToString == "N/A"){
//		$("#fechT_trab").hide();
//		$("#labelfechT_trab").hide();
//		
//	}else{
//		$("#fechT_trab").show();
//		$("#labelfechT_trab").show();
//		$('#fechT_trab').val(PeriodoHDToString);
//	}
//	
//
//	
//	
//	idFrecuencia = table.row().column(11).data().draw(); 
//	var textoidFrecuencia = idFrecuencia[td]; 
//	var textoidFrecuencia2 = $(textoidFrecuencia).text();
//	var idFrecuenciaToString = textoidFrecuencia2.toString();
//	$('#frecuenciaT').val(idFrecuenciaToString);
//	
//	
//	codTrabajador = table.row().column(1).data().draw(); 
//	var textocodTrabajador = codTrabajador[td]; 
//	var textocodTrabajador2 = $(textocodTrabajador).text();
//	var codTrabajadorToString = textocodTrabajador2.toString();
//	$('#cod_trab').val(codTrabajadorToString);
//	
//	nombreTrabajador = table.row().column(2).data().draw(); 
//	var textonombreTrabajador = nombreTrabajador[td]; 
//	var textotextonombreTrabajador2 = $(textonombreTrabajador).text();
//	var nombreTrabajadorToString = textotextonombreTrabajador2.toString();
//	$('#nombre_trab').val(nombreTrabajadorToString);
//	 
//	letraHD = table.row().column(3).data().draw(); 
//	var textoHD = letraHD[td]; 
//	var textoHD2 = $(textoHD).text();
//	var letraHDToString = textoHD2.toString();
//	$('#tipo_trab').val(letraHDToString);
//	
//	$("#conceptos").empty();
//	
//$("#loading").show();
//	
//	HD = letraHDToString;
//

	
}

$('#fechaInicioP').change(function(e) {

	var fechaI1 = $("#fechaInicioP").val();
	var fechaT1 = $("#fechaFinP").val();

	var fechaI2 = fechaI1.split("/");
	var fechaI = (fechaI2[2] + "/" + fechaI2[1] + "/" + fechaI2[0]);

	var fechaT2 = fechaT1.split("/");
	var fechaT = (fechaT2[2] + "/" + fechaT2[1] + "/" + fechaT2[0]);

	if (fechaI == '') {
		alerta("Debe Seleccionar una Fecha Inicio");
		segundoPopup();
		return;
	} else {

		var date_1 = new Date(fechaI);
		var date_2 = new Date(fechaT);

		var day_as_milliseconds = 86400000;
		var diff_in_millisenconds = date_2 - date_1;
		var diff_in_days = diff_in_millisenconds / day_as_milliseconds;

		var agregarValor = (diff_in_days);
		var agregarValorAprox = Math.round(agregarValor);
		var totaldiasvalor = agregarValorAprox + 1;

		$("#diascorridosP").val(totaldiasvalor);
	}
});

$('#fechaFinP').change(function(e) {
	var fechaI1 = $("#fechaInicioP").val();
	var fechaT1 = $("#fechaFinP").val();

	var fechaI2 = fechaI1.split("/");
	var fechaI = (fechaI2[2] + "/" + fechaI2[1] + "/" + fechaI2[0]);

	var fechaT2 = fechaT1.split("/");
	var fechaT = (fechaT2[2] + "/" + fechaT2[1] + "/" + fechaT2[0]);

	if (fechaI == '') {
		alerta("Debe Seleccionar una Fecha Inicio");
		segundoPopup();
		return;
	} else {

		var date_1 = new Date(fechaI);
		var date_2 = new Date(fechaT);

		var day_as_milliseconds = 86400000;
		var diff_in_millisenconds = date_2 - date_1;
		var diff_in_days = diff_in_millisenconds / day_as_milliseconds;

		var agregarValor = (diff_in_days);
		var agregarValorAprox = Math.round(agregarValor);
		var totaldiasvalor = agregarValorAprox + 1;

		$("#diascorridosP").val(totaldiasvalor);
	}
});

$('#diascorridosP').change(function(e) {

	monto = $("#diascorridosP").val();
	
	if(monto == 0){
		alerta("Debe Ingresar un Día Mayor 0");
		segundoPopup();
		return;
	}

	var fechaIC1 = $("#fechaInicioP").val();

	var fechaIC2 = fechaIC1.split("/");
	var fechaIC = (fechaIC2[2] + "/" + fechaIC2[1] + "/" + fechaIC2[0]);

	if (fechaIC1 == '') {
		alerta("Debe Seleccionar una Fecha Inicio");
		segundoPopup();
		$("#diascorridosP").val("");
		return;
	}
	var valNew = fechaIC.split('/');

	var valNew2 = valNew[2] + "-" + valNew[1] + "-" + valNew[0];

	var cantidadtotal = '+';
	var resultadocantidad = cantidadtotal.concat(monto);

	var nuevo = editar_fecha(valNew2, resultadocantidad -1, "d");

	var nuevo2 = nuevo.replace("-", "/");
	var nuevo3 = nuevo2.replace("-", "/");

	var nuevo4 = nuevo3.split('/');

	var nuevo5 = nuevo4[0] + "/" + nuevo4[1] + "/" + nuevo4[2];

	$("#fechaFinP").val(nuevo5);
	
	var currentTime = new Date();	
    var startDateFrom = new Date(currentTime.getFullYear(), currentTime.getMonth() -1, 1);
    
	
		

	$("#fechaFinP").datepicker('destroy').datepicker({
		dateFormat : 'dd/mm/yy',
		setdate : new Date(nuevo5),
		firstDay: 1,
		minDate : startDateFrom,
		changeMonth: true,
        changeYear: true

	});
});

function editar_fecha(fecha, intervalo, dma, separador) {

	var separador = separador || "-";
	var arrayFecha = fecha.split(separador);
	var dia = arrayFecha[0];
	var mes = arrayFecha[1];
	var anio = arrayFecha[2];

	var fechaInicial = new Date(anio, mes - 1, dia);
	var fechaFinal = fechaInicial;
	if (dma == "m" || dma == "M") {
		fechaFinal.setMonth(fechaInicial.getMonth() + parseInt(intervalo));
	} else if (dma == "y" || dma == "Y") {
		fechaFinal
				.setFullYear(fechaInicial.getFullYear() + parseInt(intervalo));
	} else if (dma == "d" || dma == "D") {
		fechaFinal.setDate(fechaInicial.getDate() + parseInt(intervalo));
	} else {
		return fecha;
	}
	dia = fechaFinal.getDate();
	mes = fechaFinal.getMonth() + 1;
	anio = fechaFinal.getFullYear();

	dia = (dia.toString().length == 1) ? "0" + dia.toString() : dia;
	mes = (mes.toString().length == 1) ? "0" + mes.toString() : mes;

	return dia + "-" + mes + "-" + anio;
}

$('#fechaInicioPSG').change(function(e) {

	var fechaI1 = $("#fechaInicioPSG").val();
	var fechaT1 = $("#fechaFinPSG").val();

	var fechaI2 = fechaI1.split("/");
	var fechaI = (fechaI2[2] + "/" + fechaI2[1] + "/" + fechaI2[0]);

	var fechaT2 = fechaT1.split("/");
	var fechaT = (fechaT2[2] + "/" + fechaT2[1] + "/" + fechaT2[0]);

	if (fechaI == '') {
		alerta("Debe Seleccionar una Fecha Inicio");
		segundoPopup();
		return;
	} else {

		var date_1 = new Date(fechaI);
		var date_2 = new Date(fechaT);

		var day_as_milliseconds = 86400000;
		var diff_in_millisenconds = date_2 - date_1;
		var diff_in_days = diff_in_millisenconds / day_as_milliseconds;

		var agregarValor = (diff_in_days);
		var agregarValorAprox = Math.round(agregarValor);
		var totaldiasvalor = agregarValorAprox + 1;

		
		
		if ($('#checkPermisoSG').is(':checked')) 
		{
			$("#diascorridosPSG").val(totaldiasvalor);
		}
	else
		{
		var start = $.datepicker.parseDate('dd/mm/yy', fechaI1);
		var end = $.datepicker.parseDate('dd/mm/yy', fechaT1);

		var startDate = new Date(start);
		var endDate = new Date(end);
		var totalSundays = 0;

		for (var i = startDate; i <= endDate; ){
		    if (i.getDay() == 0){
		        totalSundays++;
		    }
		    i.setTime(i.getTime() + 1000*60*60*24);
		}

		var totalFeriados = totalSundays * 2;
		$("#diascorridosPSG").val(totaldiasvalor - totalFeriados);
		}
	}
});

$('#fechaFinPSG').change(function(e) {
	var fechaI1 = $("#fechaInicioPSG").val();
	var fechaT1 = $("#fechaFinPSG").val();

	var fechaI2 = fechaI1.split("/");
	var fechaI = (fechaI2[2] + "/" + fechaI2[1] + "/" + fechaI2[0]);

	var fechaT2 = fechaT1.split("/");
	var fechaT = (fechaT2[2] + "/" + fechaT2[1] + "/" + fechaT2[0]);

	if (fechaI == '') {
		alerta("Debe Seleccionar una Fecha Inicio");
		segundoPopup();
		return;
	} else {

		var date_1 = new Date(fechaI);
		var date_2 = new Date(fechaT);

		var day_as_milliseconds = 86400000;
		var diff_in_millisenconds = date_2 - date_1;
		var diff_in_days = diff_in_millisenconds / day_as_milliseconds;

		var agregarValor = (diff_in_days);
		var agregarValorAprox = Math.round(agregarValor);
		var totaldiasvalor = agregarValorAprox + 1;

		
		
		if ($('#checkPermisoSG').is(':checked')) 
		{
			$("#diascorridosPSG").val(totaldiasvalor);
		}
	else
		{
		var start = $.datepicker.parseDate('dd/mm/yy', fechaI1);
		var end = $.datepicker.parseDate('dd/mm/yy', fechaT1);

		var startDate = new Date(start);
		var endDate = new Date(end);
		var totalSundays = 0;

		for (var i = startDate; i <= endDate; ){
		    if (i.getDay() == 0){
		        totalSundays++;
		    }
		    i.setTime(i.getTime() + 1000*60*60*24);
		}

		var totalFeriados = totalSundays * 2;
		$("#diascorridosPSG").val(totaldiasvalor - totalFeriados);
		}
	}
});
$('#diascorridosPSG').change(function(e) {

	monto = $("#diascorridosPSG").val();
	
	if(monto == 0){
		alerta("Debe Ingresar un Día Mayor 0");
		segundoPopup();
		return;
	}

	var fechaIC1 = $("#fechaInicioPSG").val();

	var fechaIC2 = fechaIC1.split("/");
	var fechaIC = (fechaIC2[2] + "/" + fechaIC2[1] + "/" + fechaIC2[0]);

	if (fechaIC1 == '') {
		alerta("Debe Seleccionar una Fecha Inicio");
		segundoPopup();
		$("#diascorridosPSG").val("");
		return;
	}
	var valNew = fechaIC.split('/');

	var valNew2 = valNew[2] + "-" + valNew[1] + "-" + valNew[0];

	var cantidadtotal = '+';
	var resultadocantidad = cantidadtotal.concat(monto);

	var nuevo = editar_fecha(valNew2, resultadocantidad -1 , "d");
	var nuevo2 = nuevo.replace("-", "/");
	var nuevo3 = nuevo2.replace("-", "/");

	var nuevo4 = nuevo3.split('/');
	var nuevo5 = nuevo4[0] + "/" + nuevo4[1] + "/" + nuevo4[2];
	$("#fechaFinPSG").val(nuevo5);

	$("#fechaFinPSG").datepicker('destroy').datepicker({
		dateFormat : 'dd/mm/yyyy',
		setdate : new Date(nuevo5),
		firstDay: 1,
		changeMonth: true,
        changeYear: true

	});
	
	$('#checkPermisoSG').prop('checked', true);
});

$('#TipoR').change(
		function(e) {

			$("#parcial").empty();
			var valorSub = $('#TipoR').val();
			if (valorSub == '188') {
				$("#parcial").css("display", "block");
				$("#labelParcial").css("display", "block");

				var SelectTipodeParcial = "";
				SelectTipodeParcial += "<option value=''>Seleccione</option>";
				$("#parcial").append(SelectTipodeParcial);

				$("#loading").show();
				$.getJSON(
						"/simpleWeb/json/work/ListaTipoDeParcial/",
						function(data) {
							$.each(data, function(k, v) {
								var SelectTipodeParcial = "";
								SelectTipodeParcial += "<option value=" + v.id
										+ ">" + v.descripcion + "</option>";

								$("#parcial").append(SelectTipodeParcial);
							})
						}).done(function() {
					$("#loading").hide();

				}).fail(function(jqXHR, textStatus, errorThrown) {

				    alerta(errorThrown);
					$("#loading").hide();
				})
			} else {
				$("#parcial").css("display", "none");
				$("#labelParcial").css("display", "none");
			}
		});

function ListaTipoLicencia() {
	$("#loading").show();
	$.getJSON(
			"/simpleWeb/json/work/ListaTipoLicencia/",
			function(data) {

				$.each(data, function(k, v) {
					var SelectTipoLicencia = "";
					SelectTipoLicencia += "<option value=" + v.id + ">"
							+ v.descripcion + "</option>";

					$("#tipolicencia").append(SelectTipoLicencia);
				})
			}).done(function() {
		$("#loading").hide();

	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})
}

function ListaSubtipoLicencia() {
	$("#loading").show();
	$.getJSON(
			"/simpleWeb/json/work/ListaSubtipoLicencia/",
			function(data) {

				$.each(data, function(k, v) {
					var SelectTipoLicencia = "";
					SelectTipoLicencia += "<option value=" + v.id + ">"
							+ v.descripcion + "</option>";

					$("#subtipolicencia").append(SelectTipoLicencia);
				})
			}).done(function() {
		$("#loading").hide();

	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})
}

$('#tipolicencia').change(
		function(e) {
			
			$("#TipoR").val("");
			$("#parcial").val("");
			$("#labelParcial").css("display", "none");
			$("#parcial").css("display", "none");

			$("#subtipolicencia").prop("disabled", false);
			
			$("#subtipolicencia").empty();
			var valorL = $("#tipolicencia").val();

			if (valorL == '168') {

				$("#labelsubtipo").css("display", "block");
				$("#subtipolicencia").css("display", "block");
				$("#labelSubTeipoLicencia").css("display", "block");
				
				var SelectAccidente = "";
				SelectAccidente += "<option value=''>Seleccione</option>";
				$("#subtipolicencia").append(SelectAccidente);

				$.getJSON("/simpleWeb/json/work/ListaAccidenteTrabajo/",
						function(data) {
					
							$.each(data, function(k, v) {
								var SelectAccidente = "";
								SelectAccidente += "<option value=" + v.id
										+ ">" + v.descripcion + "</option>";

								$("#subtipolicencia").append(SelectAccidente);
							})
						}).fail(function(jqXHR, textStatus, errorThrown) {

						    alerta(errorThrown);
							$("#loading").hide();
						})

			} else if (valorL == '166') {
				$("#labelSubTeipoLicencia").css("display", "block");
				$("#subtipolicencia").css("display", "block");
				var SelectMaternal = "";
				SelectMaternal += "<option value=''>Seleccione</option>";
				$("#subtipolicencia").append(SelectMaternal);
				$("#loading").show();
				$.getJSON(
						"/simpleWeb/json/work/ListaMaternal/",
						function(data) {
							$.each(data, function(k, v) {
								var SelectMaternal = "";
								SelectMaternal += "<option value=" + v.id + ">"
										+ v.descripcion + "</option>";

								$("#subtipolicencia").append(SelectMaternal);
							})
						}).done(function() {
					$("#loading").hide();

				}).fail(function(jqXHR, textStatus, errorThrown) {

				    alerta(errorThrown);
					$("#loading").hide();
				})
			} else {
				$("#labelSubTeipoLicencia").css("display", "none");
				$("#subtipolicencia").css("display", "none");
			}

		});

function tipodereposo() {
	$("#TipoR").empty();
	var SelectTipodeReposo = "";
	SelectTipodeReposo += "<option value=''>Seleccione</option>";
	$("#TipoR").append(SelectTipodeReposo);
	$("#loading").show();
	$.getJSON(
			"/simpleWeb/json/work/ListaTipoDeReposo/",
			function(data) {
				$.each(data, function(k, v) {
					var SelectTipodeReposo = "";
					SelectTipodeReposo += "<option value=" + v.id + ">"
							+ v.descripcion + "</option>";

					$("#TipoR").append(SelectTipodeReposo);
				})
			}).done(function() {
		$("#loading").hide();

	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})
}
$('#fechaInicio').change(function(e) {

	var fechaI1 = $("#fechaInicio").val();
	var fechaT1 = $("#fechaFin").val();

	var fechaI2 = fechaI1.split("/");
	var fechaI = (fechaI2[2] + "/" + fechaI2[1] + "/" + fechaI2[0]);

	var fechaT2 = fechaT1.split("/");
	var fechaT = (fechaT2[2] + "/" + fechaT2[1] + "/" + fechaT2[0]);

	if (fechaI == '') {
		alerta("Debe Seleccionar una Fecha Inicio");
		segundoPopup();
		return;
	} else {

		var date_1 = new Date(fechaI);
		var date_2 = new Date(fechaT);

		var day_as_milliseconds = 86400000;
		var diff_in_millisenconds = date_2 - date_1;
		var diff_in_days = diff_in_millisenconds / day_as_milliseconds;

		var agregarValor = (diff_in_days);
		var agregarValorAprox = Math.round(agregarValor);
        var totaldiasvalor = agregarValorAprox + 1 ;
        
		
		
		if ($('#checkLicencia').is(':checked')) 
		{
			$("#diascorridosL").val(totaldiasvalor);
		}
	else
		{
		var start = $.datepicker.parseDate('dd/mm/yy', fechaI1);
		var end = $.datepicker.parseDate('dd/mm/yy', fechaT1);

		var startDate = new Date(start);
		var endDate = new Date(end);
		var totalSundays = 0;

		for (var i = startDate; i <= endDate; ){
		    if (i.getDay() == 0){
		        totalSundays++;
		    }
		    i.setTime(i.getTime() + 1000*60*60*24);
		}

		var totalFeriados = totalSundays * 2;
		$("#diascorridosL").val(totaldiasvalor - totalFeriados);
		}
	}
});

$('#fechaFin').change(function(e) {

	var fechaI1 = $("#fechaInicio").val();
	var fechaT1 = $("#fechaFin").val();

	var fechaI2 = fechaI1.split("/");
	var fechaI = (fechaI2[2] + "/" + fechaI2[1] + "/" + fechaI2[0]);

	var fechaT2 = fechaT1.split("/");
	var fechaT = (fechaT2[2] + "/" + fechaT2[1] + "/" + fechaT2[0]);

	if (fechaI1 == '') {
		alerta("Debe Seleccionar una Fecha Inicio");
		segundoPopup();
		return;
	} else {

		var date_1 = new Date(fechaI);
		var date_2 = new Date(fechaT);

		var day_as_milliseconds = 86400000;
		var diff_in_millisenconds = date_2 - date_1;
		var diff_in_days = diff_in_millisenconds / day_as_milliseconds;

		var agregarValor = (diff_in_days);
		var agregarValorAprox = Math.round(agregarValor);
		var totaldiasvalor = agregarValorAprox + 1;

		if ($('#checkLicencia').is(':checked')) 
		{
			$("#diascorridosL").val(totaldiasvalor);
		}
	else
		{
		var start = $.datepicker.parseDate('dd/mm/yy', fechaI1);
		var end = $.datepicker.parseDate('dd/mm/yy', fechaT1);

		var startDate = new Date(start);
		var endDate = new Date(end);
		var totalSundays = 0;

		for (var i = startDate; i <= endDate; ){
		    if (i.getDay() == 0){
		        totalSundays++;
		    }
		    i.setTime(i.getTime() + 1000*60*60*24);
		}

		var totalFeriados = totalSundays * 2;
		$("#diascorridosL").val(totaldiasvalor - totalFeriados);
		}
	}
});

$('#diascorridosL').change(function(e) {

	monto = $("#diascorridosL").val();
	
	if(monto == 0){
		alerta("Debe Ingresar un Día Mayor 0");
		segundoPopup();
		return;
	}

	var fechaIC1 = $("#fechaInicio").val();

	var fechaIC2 = fechaIC1.split("/");
	var fechaIC = (fechaIC2[2] + "/" + fechaIC2[1] + "/" + fechaIC2[0]);

	if (fechaIC1 == '') {
		alerta("Debe Seleccionar una Fecha Inicio");
		segundoPopup();
		$("#diascorridosL").val("");
		return;
	}
	var valNew = fechaIC.split('/');

	var valNew2 = valNew[2] + "-" + valNew[1] + "-" + valNew[0];

	var cantidadtotal = '+';
	var resultadocantidad = cantidadtotal.concat(monto);

	var nuevo = editar_fecha(valNew2, resultadocantidad -1, "d");

	var nuevo2 = nuevo.replace("-", "/");
	var nuevo3 = nuevo2.replace("-", "/");

	var nuevo4 = nuevo3.split('/');

	var nuevo5 = nuevo4[0] + "/" + nuevo4[1] + "/" + nuevo4[2];

	$("#fechaFin").val(nuevo5);

	$("#fechaFin").datepicker('destroy').datepicker({
		dateFormat : 'dd/mm/yy',
		setdate : new Date(nuevo5),
		firstDay: 1,
		changeMonth: true,
        changeYear: true

	});
	
	$('#checkLicencia').prop('checked', true);
});


function accionfalta(td,id,checkfalta){
	$("#modalupdateFalta").modal('show');
	
	var table = $('#tbl_Info4').DataTable();
	
	var fecha_desde_falta = [];
	var fecha_hasta_falta = [];
	var dias_corridos_falta = [];
	
	if(checkfalta)
	{
					
		$('#checkFalta').prop('checked', true);
	
	}
	else
	{
		$('#checkFalta').prop('checked', false);
		
	}
	
	fecha_desde_falta = table.row().column(3).data().draw(); 
	var textofecha_desde_falta = fecha_desde_falta[td]; 
	var textofecha_desde_falta2 = $(textofecha_desde_falta).text();
	var textofecha_desde_faltatoString = textofecha_desde_falta2.toString().replace(/[-]/g, '/');
	$('#fechaInicioFalta').val(textofecha_desde_faltatoString);
	
	fecha_hasta_falta = table.row().column(4).data().draw(); 
	var textofecha_hasta_falta = fecha_hasta_falta[td]; 
	var textofecha_hasta_falta2 = $(textofecha_hasta_falta).text();
	var textofecha_hasta_faltatoString = textofecha_hasta_falta2.toString().replace(/[-]/g, '/');
	$('#fechaFinFalta').val(textofecha_hasta_faltatoString);
	
	dias_corridos_falta = table.row().column(6).data().draw(); 
	var textodias_corridos_falta = dias_corridos_falta[td]; 
	var textodias_corridos_falta2 = $(textodias_corridos_falta).text();
	var textodias_corridos_faltatoString = textodias_corridos_falta2.toString();
	$('#diascorridosFalta').val(textodias_corridos_faltatoString);
	
	
	
}


function accionLicencia(td,id,checklicencia){
	
	 $("#modalupdateLicencia").modal('show');
		
		var fecha_desde = [];
		var fecha_hasta = [];
		var dias_corridos = [];
		var tipolicencia = [];
		var subtipolicencia = [];
		var tipo_reposo = [];
		var nombredoctor = [];
		var especialidad = [];
		var parcial = [];
		var TipoR = [];
		
		
		var table = $('#tbl_Info2').DataTable();
		
		
	
		
		
		especialidad = table.row().column(15).data().draw(); 
		var textoespecialidad = especialidad[td]; 
		var textoespecialidad2 = $(textoespecialidad).text();
		var textoespecialidad2toString = textoespecialidad2.toString();
		$('#especialidad').val(textoespecialidad2toString);
		
		nombredoctor = table.row().column(14).data().draw(); 
		var textonombredoctor = nombredoctor[td]; 
		var textonombredoctor2 = $(textonombredoctor).text();
		var textonombredoctortoString = textonombredoctor2.toString();
		$('#nombredoctor').val(textonombredoctortoString);
		
		
		
		tipolicencia = table.row().column(11).data().draw(); 
		var textotipolicencia = tipolicencia[td]; 
		var textotipolicencia2 = $(textotipolicencia).text();
		var textotipolicenciatoString = textotipolicencia2.toString();
		$('#tipolicencia').val(textotipolicenciatoString);
		
		
		
		subtipolicencia = table.row().column(12).data().draw(); 
		var textosubtipolicencia = subtipolicencia[td]; 
		var textosubtipolicencia2 = $(textosubtipolicencia).text();
		var textosubtipolicenciatoString = textosubtipolicencia2.toString();

		if(textosubtipolicenciatoString == "0"){
			$("#subtipolicencia").css("display", "none");
			$("#labelSubTeipoLicencia").css("display", "none");
			
		}else{
			ListaSubtipoLicencia();
			$("#subtipolicencia" ).prop( "disabled", false );
			$("#subtipolicencia").css("display", "block");
			$("#labelSubTeipoLicencia").css("display", "block");
			$('#subtipolicencia').val(textosubtipolicenciatoString);}
		
		

		
		
		parcial = table.row().column(16).data().draw(); 
		var textoparcial = parcial[td]; 
		var textoparcial2 = $(textoparcial).text();
		var textoparcialtoString = textoparcial2.toString();
		$('#parcial').val(textoparcialtoString);
		 
		
		if(textoparcialtoString == "0"){
			$("#parcial").css("display", "none");
			$("#labelParcial").css("display", "none");
		}else{
			$("#parcial").css("display", "block");
			$("#labelParcial").css("display", "block");
		}
		
	
	    
		
		
		fecha_desde = table.row().column(6).data().draw(); 
		var textofecha_desde = fecha_desde[td]; 
		var textofecha_desde2 = $(textofecha_desde).text();
		var textofecha_desdetoString = textofecha_desde2.toString().replace(/[-]/g, '/');
		$('#fechaInicio').val(textofecha_desdetoString);
		
		fecha_hasta = table.row().column(7).data().draw(); 
		var textofecha_hasta = fecha_hasta[td]; 
		var textofecha_hasta2 = $(textofecha_hasta).text();
		var fecha_hastatoString = textofecha_hasta2.toString().replace(/[-]/g, '/');
		$('#fechaFin').val(fecha_hastatoString);
		
		dias_corridos = table.row().column(9).data().draw(); 
		var textodias_corridos = dias_corridos[td]; 
		var textodias_corridos2 = $(textodias_corridos).text();
		var dias_corridostoString = textodias_corridos2.toString();
		$('#diascorridosL').val(dias_corridostoString);
		
		if(checklicencia)
		{
						
			$('#checkLicencia').prop('checked', true);
		
		}
		else
		{
			$('#checkLicencia').prop('checked', false);
			
		}
		
		TipoR = table.row().column(17).data().draw(); 
		var textoTipoR = TipoR[td]; 
		var textoTipoR2 = $(textoTipoR).text();
		var textoTipoRtoString = textoTipoR2.toString();
		var iNum = parseInt(textoTipoRtoString); 
		
		$('#TipoR').val(textoTipoRtoString);
}

function parcial(){
	
	$("#loading").show();
	$.getJSON(
			"/simpleWeb/json/work/ListaTipoDeParcial/",
			function(data) {
				$.each(data, function(k, v) {
					var SelectTipodeParcial = "";
					SelectTipodeParcial += "<option value=" + v.id
							+ ">" + v.descripcion + "</option>";

					$("#parcial").append(SelectTipodeParcial);
				})
			}).done(function() {
		$("#loading").hide();

	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})
}
$('#fechaFinFalta').change(function(e) {
	var fechaI1 = $("#fechaInicioFalta").val();
	var fechaT1 = $("#fechaFinFalta").val();

	var fechaI2 = fechaI1.split("/");
	var fechaI = (fechaI2[2] + "/" + fechaI2[1] + "/" + fechaI2[0]);

	var fechaT2 = fechaT1.split("/");
	var fechaT = (fechaT2[2] + "/" + fechaT2[1] + "/" + fechaT2[0]);


	if (fechaI == '') {
		alerta("Debe Seleccionar una Fecha Inicio");
		segundoPopup();
		return;
	} else {

		var date_1 = new Date(fechaI);
		var date_2 = new Date(fechaT);

		var day_as_milliseconds = 86400000;
		var diff_in_millisenconds = date_2 - date_1;
		var diff_in_days = diff_in_millisenconds / day_as_milliseconds;

		var agregarValor = (diff_in_days);
		var agregarValorAprox = Math.round(agregarValor);
		var totaldiasvalor = agregarValorAprox + 1;

		
		if ($('#checkFalta').is(':checked')) 
		{
			$("#diascorridosFalta").val(totaldiasvalor);
		}
	else
		{
		var start = $.datepicker.parseDate('dd/mm/yy', fechaI1);
		var end = $.datepicker.parseDate('dd/mm/yy', fechaT1);

		var startDate = new Date(start);
		var endDate = new Date(end);
		var totalSundays = 0;

		for (var i = startDate; i <= endDate; ){
		    if (i.getDay() == 0){
		        totalSundays++;
		    }
		    i.setTime(i.getTime() + 1000*60*60*24);
		}

		var totalFeriados = totalSundays * 2;
		$("#diascorridosFalta").val(totaldiasvalor - totalFeriados);
		}
	}
});
$('#fechaInicioFalta').change(function(e) {

	var fechaI1 = $("#fechaInicioFalta").val();
	var fechaT1 = $("#fechaFinFalta").val();

	var fechaI2 = fechaI1.split("/");
	var fechaI = (fechaI2[2] + "/" + fechaI2[1] + "/" + fechaI2[0]);

	var fechaT2 = fechaT1.split("/");
	var fechaT = (fechaT2[2] + "/" + fechaT2[1] + "/" + fechaT2[0]);


	if (fechaI == '') {
		alerta("Debe Seleccionar una Fecha Inicio");
		segundoPopup();
		return;
	} else {

		var date_1 = new Date(fechaI);
		var date_2 = new Date(fechaT);

		var day_as_milliseconds = 86400000;
		var diff_in_millisenconds = date_2 - date_1;
		var diff_in_days = diff_in_millisenconds / day_as_milliseconds;

		var agregarValor = (diff_in_days);
		var agregarValorAprox = Math.round(agregarValor);
		var totaldiasvalor = agregarValorAprox + 1;

		
		if ($('#checkFalta').is(':checked')) 
		{
			$("#diascorridosFalta").val(totaldiasvalor);
		}
	else
		{
		var start = $.datepicker.parseDate('dd/mm/yy', fechaI1);
		var end = $.datepicker.parseDate('dd/mm/yy', fechaT1);

		var startDate = new Date(start);
		var endDate = new Date(end);
		var totalSundays = 0;

		for (var i = startDate; i <= endDate; ){
		    if (i.getDay() == 0){
		        totalSundays++;
		    }
		    i.setTime(i.getTime() + 1000*60*60*24);
		}

		var totalFeriados = totalSundays * 2;
		$("#diascorridosFalta").val(totaldiasvalor - totalFeriados);
		}
	}
});

$('#diascorridosFalta').change(function(e) {

	monto = $("#diascorridosFalta").val();
	
	if(monto == 0){
		alerta("Debe Ingresar un Día Mayor 0");
		segundoPopup();
		return;
	}

	var fechaIC1 = $("#fechaInicioFalta").val();

	var fechaIC2 = fechaIC1.split("/");
	var fechaIC = (fechaIC2[2] + "/" + fechaIC2[1] + "/" + fechaIC2[0]);

	if (fechaIC1 == '') {
		alerta("Debe Seleccionar una Fecha Inicio");
		segundoPopup();
		$("#diascorridosFalta").val("");
		return;
	}
	var valNew = fechaIC.split('/');

	var valNew2 = valNew[2] + "-" + valNew[1] + "-" + valNew[0];

	var cantidadtotal = '+';
	var resultadocantidad = cantidadtotal.concat(monto);

	var nuevo = editar_fecha(valNew2, resultadocantidad -1 , "d");

	var nuevo2 = nuevo.replace("-", "/");
	var nuevo3 = nuevo2.replace("-", "/");

	var nuevo4 = nuevo3.split('/');

	var nuevo5 = nuevo4[0] + "/" + nuevo4[1] + "/" + nuevo4[2];

	$("#fechaFinFalta").val(nuevo5);

	$("#fechaFinFalta").datepicker('destroy').datepicker({
		dateFormat : 'dd/mm/yy',
		setdate : new Date(nuevo5),
	    firstDay: 1,
	    changeMonth: true,
        changeYear: true

	});
	
	$('#checkFalta').prop('checked', true);
});

function segundoPopup(){
	
	$('.swal2-container').css('z-index', '15000');
	
}


//--- funcion Update Faltas-----//
function addForm3(id) {

     if ($('#fechaInicioFalta').val() === '') {
		alerta("Debe Seleccionar una fecha de Inicio");segundoPopup();
		$("#fechaInicioFalta").focus();
		return;
	} else if ($('#fechaFinFalta').val() === '') {
		alerta("Debe Seleccionar una fecha de Fin");segundoPopup();
		$("#fechaFinFalta").focus();
		return;
	} else if ($('#fechaFinFalta').val() === 'NaN/NaN/NaN') {
		alerta("Debe Seleccionar una fecha de Fin");segundoPopup();
		$("#fechaFinFalta").focus();
		return;
	}
	
	var fechaI1 = $("#fechaInicioFalta").val();
	var fechaT1 = $("#fechaFinFalta").val();

	    //Split de las fechas recibidas para separarlas
	    var x = fechaI1.split("/");
	    var z = fechaT1.split("/");


	    fecha1 = x[1] + "-" + x[0] + "-" + x[2];
	    fecha2 = z[1] + "-" + z[0] + "-" + z[2];
	    
	    
	    //Comparamos las fechas
	    if (Date.parse(fecha1) > Date.parse(fecha2)){
	    	alerta("Fecha Fin no Debe Ser Inferion A Fecha Inicio");
	        return;
	    }

	Faltas = [];



	var fechaI1 = $("#fechaInicioFalta").val();
	var fechaT1 = $("#fechaFinFalta").val();

	var fechaI2 = fechaI1.split("/");
	var fecha_inicio = (fechaI2[2] + "/" + fechaI2[1] + "/" + fechaI2[0]);

	var fechaT2 = fechaT1.split("/");
	var fecha_fin = (fechaT2[2] + "/" + fechaT2[1] + "/" + fechaT2[0]);

	
	var dias_corridos = $("#diascorridosFalta").val();
	
	var fecha_inicio2 = fecha_inicio.replace("/", "-");
	var fecha_inicio3 = fecha_inicio2.replace("/", "-");

	var fecha_fin2 = fecha_fin.replace("/", "-");
	var fecha_fin3 = fecha_fin2.replace("/", "-");

	var checkpermiso = 0;
	if ($('#checkFalta').is(':checked')) {
		checkpermiso = 1;
	}
	var json2 = {

		fecha_desde : fecha_inicio3,
		fecha_hasta : fecha_fin3,
		dias_corridos : dias_corridos,
		incluye_feriados : checkpermiso,
		id : id

	}

	Faltas.push(json2);
	
	$("#loading").show();
	$.ajax({
		url : "/simpleWeb/json/work/UpdateFaltas",
		type : "PUT",
		data : JSON.stringify(json2),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
			$("#loading").show();

		},
		success : function(data, textStatus, jqXHR) {

			$("#modalupdateFalta").modal('hide');
			onLoad();
			alerta("Modificación Exitosa");
			
			$("#loading").hide();
		},
		error : function(ex) {
			console.log(ex);
		}
	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})

}

function addForm1(id,codtrab) {

	
	
	var fechaI1 = $("#fechaInicio").val();
	var fechaT1 = $("#fechaFin").val();

	    //Split de las fechas recibidas para separarlas
	    var x = fechaI1.split("/");
	    var z = fechaT1.split("/");


	    fecha1 = x[1] + "-" + x[0] + "-" + x[2];
	    fecha2 = z[1] + "-" + z[0] + "-" + z[2];
	    
	    
	    //Comparamos las fechas
	    if (Date.parse(fecha1) > Date.parse(fecha2)){
	    	alerta("Fecha Fin no Debe Ser Inferion A Fecha Inicio");
	        return;
	    }
	    
	var codigoTrab = codtrab;

	var form_data = new FormData();

	var d = new Date();

	var month = d.getMonth() + 1;
	var day = d.getDate();
	var year = d.getFullYear();
	var min = d.getMinutes();
	var hour = d.getHours()
	var seconds = d.getSeconds();
    
	//var ruta = "../assets/permisoylicencia/";
	if ($('#7').val() == '') {

	} else{
	
	var ruta = "";
    
     $.ajax({
     		type : "GET",
     		url : '/simpleWeb/json/work/getRutaLicencia/',
     		async: false,
     		dataType : "text",
     		success : function(data) {
     			ruta = data;
     		}
     	}).fail(function(jqXHR, textStatus, errorThrown) {

		    alerta(errorThrown);
			$("#loading").hide();
		})


	var nombreArchivo = $("#7").prop("files")[0].name;

	var strArray = nombreArchivo.split(".");
	var ruta2 = (ruta + strArray[0] + codigoTrab + "-" + year + "-" + month
			+ "-" + day + "-" + hour + "-" + min + "-" + seconds + "." + strArray[1]);
	}
	
	  if ($('#tipolicencia').val() === '') {
		alerta("Debe Seleccionar un Tipo de Licencia");segundoPopup();
		$("#tipolicencia").focus();
		return;
	} else if ($('#fechaInicio').val() === '') {
		alerta("Debe Seleccionar una fecha de Inicio");segundoPopup();
		$("#fechaInicio").focus();
		return;
	} else if ($('#fechaFin').val() === '') {
		alerta("Debe Seleccionar una fecha de Fin");segundoPopup();
		$("#fechaFin").focus();
		return;
	} else if ($('#fechaFin').val() === 'NaN/NaN/NaN') {
		alerta("Debe Seleccionar una fecha de Fin");segundoPopup();
		$("#fechaFin").focus();
		return;
	} else if ($('#TipoR').val() === '') {
		alerta("Debe Seleccionar un Tipo de Reposo");segundoPopup();
		$("#TipoR").focus();
		return;
	} else if ($('#TipoR').val() === '188' && $('#parcial').val() === '') {
		alerta("Debe Seleccionar un Tipo Parcial");segundoPopup();
		$("#parcial").focus();
		return;
	} else if ($('#tipolicencia').val() === '166'
			&& $('#subtipolicencia').val() === '') {
		alerta("Debe Seleccionar un Sub Tipo Licencia");segundoPopup();
		$("#subtipolicencia").focus();
		return;
	} else if ($('#tipolicencia').val() === '168'
			&& $('#subtipolicencia').val() === '') {
		alerta("Debe Seleccionar un Sub Tipo Licencia");segundoPopup();
		$("#subtipolicencia").focus();
		return;
	}

	
	var numeroinput = 7;
	if ($('#7').val() == '') {

	} else {
		UploadFileLicencia(numeroinput,codigoTrab);
	}

	
	var tipo_licenciaL = $("#tipolicencia").val();
	var subtipo_licenciaL = $("#subtipolicencia").val();
	var fechaI1 = $("#fechaInicio").val();
	var fechaT1 = $("#fechaFin").val();

	var fechaI2 = fechaI1.split("/");
	var fecha_inicioL = (fechaI2[2] + "-" + fechaI2[1] + "-" + fechaI2[0]);

	var fechaT2 = fechaT1.split("/");
	var fecha_finL = (fechaT2[2] + "-" + fechaT2[1] + "-" + fechaT2[0]);

	var reposoT = $("#TipoR").val();
	var dias_corridosL = $("#diascorridosL").val();
	var reposoParcial = $("#parcial").val();
	
	var nombreDoctor = $("#nombredoctor").val();
	var especialidad = $("#especialidad").val();

	var checkLicencia = 0;

	if ($('#checkLicencia').is(':checked')) {
		checkLicencia = 1;
	}

	var json2 = {

		tipo_licenciaid : tipo_licenciaL,
		subtipo_licenciaid : subtipo_licenciaL,
		fecha_desde : fecha_inicioL,
		fecha_hasta : fecha_finL,
		dias_corridos : dias_corridosL,
		incluye_feriados : checkLicencia,
		reposo : reposoParcial,
		ruta_archivo : ruta2,
		doctor : nombreDoctor,
		especialidad : especialidad, 
		tipo_reposo : reposoT,
		id : id

	}
	
	

	$("#loading").show();
	$.ajax({
		url : "/simpleWeb/json/work/updateLicencia/",
		type : "PUT",
		data : JSON.stringify(json2),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
			$("#loading").show();

		},
		success : function(data, textStatus, jqXHR) {
			
			$("#modalupdateLicencia").modal('hide');
			onLoad();
			$('#7').val("");
			$("#loading").hide();
			alerta("Modificado con Exito");
		},
		error : function(ex) {
			console.log(ex);
		}
	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})

}


function UploadFileLicencia(idInput,codigoTrab) {

	var codigoTrab = codigoTrab;
	var file_data = $("#" + idInput).prop("files")[0];
	var form_data = new FormData();

	var d = new Date();

	var month = d.getMonth() + 1;
	var day = d.getDate();
	var year = d.getFullYear();
	var min = d.getMinutes();
	var hour = d.getHours()
	var seconds = d.getSeconds();

	var nombre = (codigoTrab + "-" + year + "-" + month + "-" + day + "-"
			+ hour + "-" + min + "-" + seconds);

	form_data.append("file", file_data);
	form_data.append(idInput, idInput);
	form_data.append(nombre, nombre);
	$.ajax({
		url : "/simpleWeb/UploadFileLicencia",
		dataType : 'script',
		cache : false,
		contentType : false,
		processData : false,
		data : form_data,
		type : 'post',
		success : function() {
		}
	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})
}

function addForm4(id,codtrab) {

	var fechaI1 = $("#fechaInicioPSG").val();
	var fechaT1 = $("#fechaFinPSG").val();

	    //Split de las fechas recibidas para separarlas
	    var x = fechaI1.split("/");
	    var z = fechaT1.split("/");


	    fecha1 = x[1] + "-" + x[0] + "-" + x[2];
	    fecha2 = z[1] + "-" + z[0] + "-" + z[2];
	    
	    
	    //Comparamos las fechas
	    if (Date.parse(fecha1) > Date.parse(fecha2)){
	    	alerta("Fecha Fin no Debe Ser Inferion A Fecha Inicio");
	        return;
	    }
	    
	var codigoTrab = codtrab;
	var form_data = new FormData();

	var d = new Date();

	var month = d.getMonth() + 1;
	var day = d.getDate();
	var year = d.getFullYear();
	var min = d.getMinutes();
	var hour = d.getHours()
	var seconds = d.getSeconds();

	if ($('#9').val() == '') {
		
	}else{
	
    var ruta = "";
    
    $.ajax({
    		type : "GET",
    		url : '/simpleWeb/json/work/getRutaSinGoceDeSueldo/',
    		async: false,
    		dataType : "text",
    		success : function(data) {
    			ruta = data;
    		}
    	}).fail(function(jqXHR, textStatus, errorThrown) {

		    alerta(errorThrown);
			$("#loading").hide();
		})

	var nombreArchivo = $("#9").prop("files")[0].name;
	var strArray = nombreArchivo.split(".");
	var ruta2 = (ruta + strArray[0] + codigoTrab + "-" + year + "-" + month
			+ "-" + day + "-" + hour + "-" + min + "-" + seconds + "." + strArray[1]);
	}
	
	 if ($('#fechaInicioPSG').val() === '') {
		alerta("Debe Seleccionar una fecha de Inicio");segundoPopup();
		$("#fechaInicioPSG").focus();
		return;
	} else if ($('#fechaFinPSG').val() === 'NaN/NaN/NaN') {
		alerta("Debe Seleccionar una fecha de Fin");segundoPopup();
		$("#fechaFinPSG").focus();
		return;
	} else if ($('#fechaFinPSG').val() === '') {
		alerta("Debe Seleccionar una fecha de Fin");segundoPopup();
		$("#fechaFinPSG").focus();
		return;
	}

	var numeroinput = 9;
	if ($('#9').val() == '') {

	} else {
		uploadPermisoSinGoce(numeroinput,codtrab);
	}

	

	var fechaI1 = $("#fechaInicioPSG").val();
	var fechaT1 = $("#fechaFinPSG").val();

	var fechaI2 = fechaI1.split("/");
	var fecha_inicio = (fechaI2[2] + "/" + fechaI2[1] + "/" + fechaI2[0]);

	var fechaT2 = fechaT1.split("/");
	var fecha_fin = (fechaT2[2] + "/" + fechaT2[1] + "/" + fechaT2[0]);

	
	var dias_corridos = $("#diascorridosPSG").val();


	var fecha_inicio2 = fecha_inicio.replace("/", "-");
	var fecha_inicio3 = fecha_inicio2.replace("/", "-");

	var fecha_fin2 = fecha_fin.replace("/", "-");
	var fecha_fin3 = fecha_fin2.replace("/", "-");

	var checkpermiso = 0;
	if ($('#checkPermisoSG').is(':checked')) {
		checkpermiso = 1;
	}
	var json2 = {

		fecha_desde : fecha_inicio3,
		fecha_hasta : fecha_fin3,
		dias_corridos : dias_corridos,
		incluye_feriados : checkpermiso,
		ruta_archivo : ruta2,
		id : id

	}

	$("#loading").show();
	$.ajax({
		url : "/simpleWeb/json/work/updatePermisoSinGoce/",
		type : "PUT",
		data : JSON.stringify(json2),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
			$("#loading").show();

		},
		success : function(data, textStatus, jqXHR) {

			
			$("#modalupdatePermisoSinGose").modal('hide');
			onLoad();
			$('#9').val("");
			$("#loading").hide();
			alerta("Modificado con Exito");
			
		
			$("#loading").hide();
		},
		error : function(ex) {
			console.log(ex);
		}
	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})

}

function uploadPermisoSinGoce(idInput,codtrab) {

	var codigoTrab = codtrab;
	var file_data = $("#" + idInput).prop("files")[0];
	var form_data = new FormData();

	var d = new Date();

	var month = d.getMonth() + 1;
	var day = d.getDate();
	var year = d.getFullYear();
	var min = d.getMinutes();
	var hour = d.getHours()
	var seconds = d.getSeconds();

	var nombre = (codigoTrab + "-" + year + "-" + month + "-" + day + "-"
			+ hour + "-" + min + "-" + seconds);

	form_data.append("file", file_data);
	form_data.append(idInput, idInput);
	form_data.append(nombre, nombre);
	$.ajax({
		url : "/simpleWeb/UploadFilePermisoSinGoce",
		dataType : 'script',
		cache : false,
		contentType : false,
		processData : false,
		data : form_data,
		type : 'post',
		success : function() {

		}
	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})
}



function upload(idInput,codTrab) {

	var codigoTrab = codTrab;
	var file_data = $("#" + idInput).prop("files")[0];
	var form_data = new FormData();

	var d = new Date();

	var month = d.getMonth() + 1;
	var day = d.getDate();
	var year = d.getFullYear();
	var min = d.getMinutes();
	var hour = d.getHours()
	var seconds = d.getSeconds();

	var nombre = (codigoTrab + "-" + year + "-" + month + "-" + day + "-"
			+ hour + "-" + min + "-" + seconds);

	form_data.append("file", file_data);
	form_data.append(idInput, idInput);
	form_data.append(nombre, nombre);
	$.ajax({
		url : "/simpleWeb/UploadFile",
		dataType : 'script',
		cache : false,
		contentType : false,
		processData : false,
		data : form_data,
		type : 'post',
		success : function() {

		}
	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})
}


$('#checkLicencia').change(function(e) {
	
	var fechaI1 = $("#fechaInicio").val();
	var fechaT1 = $("#fechaFin").val();
	
	if ($('#checkLicencia').is(':checked')) {
		

		var fechaI2 = fechaI1.split("/");
		var fechaI = (fechaI2[2] + "/" + fechaI2[1] + "/" + fechaI2[0]);

		var fechaT2 = fechaT1.split("/");
		var fechaT = (fechaT2[2] + "/" + fechaT2[1] + "/" + fechaT2[0]);

		if (fechaI1 == '') {
			alerta("Debe Seleccionar una Fecha Inicio");
			$("#checkLicencia").prop("checked", false);
			return;
		}else if(fechaT1 == '' ){
			alerta("Debe Seleccionar una Fecha Inicio");
			$("#checkLicencia").prop("checked", false);
			return;
		}
		
		else {

			var date_1 = new Date(fechaI);
			var date_2 = new Date(fechaT);

			var day_as_milliseconds = 86400000;
			var diff_in_millisenconds = date_2 - date_1;
			var diff_in_days = diff_in_millisenconds / day_as_milliseconds;

			var agregarValor = (diff_in_days);
			var agregarValorAprox = Math.round(agregarValor);
			var totaldiasvalor = agregarValorAprox + 1;

			$("#diascorridosL").val(totaldiasvalor);
		}
		
	}else{
		
		var fechaI1 = $("#fechaInicio").val();
		var fechaT1 = $("#fechaFin").val();

		var fechaI2 = fechaI1.split("/");
		var fechaI = (fechaI2[2] + "/" + fechaI2[1] + "/" + fechaI2[0]);

		var fechaT2 = fechaT1.split("/");
		var fechaT = (fechaT2[2] + "/" + fechaT2[1] + "/" + fechaT2[0]);

		if (fechaI1 == '') {
			alerta("Debe Seleccionar una Fecha Inicio");
			return;
		}else if(fechaT1 == '' ){
			alerta("Debe Seleccionar una Fecha Inicio");
			return;
		}
		
		else {

			var date_1 = new Date(fechaI);
			var date_2 = new Date(fechaT);

			var day_as_milliseconds = 86400000;
			var diff_in_millisenconds = date_2 - date_1;
			var diff_in_days = diff_in_millisenconds / day_as_milliseconds;

			var agregarValor = (diff_in_days);
			var agregarValorAprox = Math.round(agregarValor);
			var totaldiasvalor = agregarValorAprox + 1;
			
			var start = $.datepicker.parseDate('dd/mm/yy', fechaI1);
			var end = $.datepicker.parseDate('dd/mm/yy', fechaT1);

			var startDate = new Date(start);
			var endDate = new Date(end);
			var totalSundays = 0;

			for (var i = startDate; i <= endDate; ){
			    if (i.getDay() == 0){
			        totalSundays++;
			    }
			    i.setTime(i.getTime() + 1000*60*60*24);
			}

			var totalFeriados = totalSundays * 2;

			$("#diascorridosL").val(totaldiasvalor - totalFeriados);
		}
		
	}
	
	
	
	
});

$('#checkFalta').change(function(e) {
	
	
	
	if ($('#checkFalta').is(':checked')) {
		
		var fechaI1 = $("#fechaInicioFalta").val();
		var fechaT1 = $("#fechaFinFalta").val();

		var fechaI2 = fechaI1.split("/");
		var fechaI = (fechaI2[2] + "/" + fechaI2[1] + "/" + fechaI2[0]);

		var fechaT2 = fechaT1.split("/");
		var fechaT = (fechaT2[2] + "/" + fechaT2[1] + "/" + fechaT2[0]);


		if (fechaI == '') {
			alerta("Debe Seleccionar una Fecha Inicio");
			return;
		} else {

			var date_1 = new Date(fechaI);
			var date_2 = new Date(fechaT);

			var day_as_milliseconds = 86400000;
			var diff_in_millisenconds = date_2 - date_1;
			var diff_in_days = diff_in_millisenconds / day_as_milliseconds;

			var agregarValor = (diff_in_days);
			var agregarValorAprox = Math.round(agregarValor);
			var totaldiasvalor = agregarValorAprox + 1;

			$("#diascorridosFalta").val(totaldiasvalor);
		}
		
	}else{
		var fechaI1 = $("#fechaInicioFalta").val();
		var fechaT1 = $("#fechaFinFalta").val();
		
		var fechaI2 = fechaI1.split("/");
		var fechaI = (fechaI2[2] + "/" + fechaI2[1] + "/" + fechaI2[0]);

		var fechaT2 = fechaT1.split("/");
		var fechaT = (fechaT2[2] + "/" + fechaT2[1] + "/" + fechaT2[0]);
		
		
		var date_1 = new Date(fechaI);
		var date_2 = new Date(fechaT);

		var day_as_milliseconds = 86400000;
		var diff_in_millisenconds = date_2 - date_1;
		var diff_in_days = diff_in_millisenconds / day_as_milliseconds;

		var agregarValor = (diff_in_days);
		var agregarValorAprox = Math.round(agregarValor);
		var totaldiasvalor = agregarValorAprox + 1;
		
		var start = $.datepicker.parseDate('dd/mm/yy', fechaI1);
		var end = $.datepicker.parseDate('dd/mm/yy', fechaT1);

		var startDate = new Date(start);
		var endDate = new Date(end);
		var totalSundays = 0;

		for (var i = startDate; i <= endDate; ){
		    if (i.getDay() == 0){
		        totalSundays++;
		    }
		    i.setTime(i.getTime() + 1000*60*60*24);
		}

		var totalFeriados = totalSundays * 2;
		$("#diascorridosFalta").val(totaldiasvalor - totalFeriados);
		
	}
});


$('#checkPermisoSG').change(function(e) {
	
	var fechaI1 = $("#fechaInicioPSG").val();
	var fechaT1 = $("#fechaFinPSG").val();
	
	if ($('#checkPermisoSG').is(':checked')) {
		
		

		var fechaI2 = fechaI1.split("/");
		var fechaI = (fechaI2[2] + "/" + fechaI2[1] + "/" + fechaI2[0]);

		var fechaT2 = fechaT1.split("/");
		var fechaT = (fechaT2[2] + "/" + fechaT2[1] + "/" + fechaT2[0]);

		if (fechaI == '') {
			alerta("Debe Seleccionar una Fecha Inicio");
			return;
		} else {

			var date_1 = new Date(fechaI);
			var date_2 = new Date(fechaT);

			var day_as_milliseconds = 86400000;
			var diff_in_millisenconds = date_2 - date_1;
			var diff_in_days = diff_in_millisenconds / day_as_milliseconds;

			var agregarValor = (diff_in_days);
			var agregarValorAprox = Math.round(agregarValor);
			var totaldiasvalor = agregarValorAprox + 1;

			$("#diascorridosPSG").val(totaldiasvalor);
		}
		
	}else{
		
		
		var fechaI2 = fechaI1.split("/");
		var fechaI = (fechaI2[2] + "/" + fechaI2[1] + "/" + fechaI2[0]);

		var fechaT2 = fechaT1.split("/");
		var fechaT = (fechaT2[2] + "/" + fechaT2[1] + "/" + fechaT2[0]);
		
		var date_1 = new Date(fechaI);
		var date_2 = new Date(fechaT);

		var day_as_milliseconds = 86400000;
		var diff_in_millisenconds = date_2 - date_1;
		var diff_in_days = diff_in_millisenconds / day_as_milliseconds;

		var agregarValor = (diff_in_days);
		var agregarValorAprox = Math.round(agregarValor);
		var totaldiasvalor = agregarValorAprox + 1;
		
		var start = $.datepicker.parseDate('dd/mm/yy', fechaI1);
		var end = $.datepicker.parseDate('dd/mm/yy', fechaT1);

		var startDate = new Date(start);
		var endDate = new Date(end);
		var totalSundays = 0;

		for (var i = startDate; i <= endDate; ){
		    if (i.getDay() == 0){
		        totalSundays++;
		    }
		    i.setTime(i.getTime() + 1000*60*60*24);
		}

		var totalFeriados = totalSundays * 2;
		$("#diascorridosPSG").val(totaldiasvalor - totalFeriados);
		
	}
	
});