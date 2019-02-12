var feriadosGlobal = "";
var feriadosArray = [];
var valorDiaTrab = 0;
diashabiles_trab = [];
ultima_fecha_retornada = "";
var cargo_trabajador;

//Colocar Permisos
var sociedadPrivilege = new Set();
var huertoPrivilege = new Array();
//Obtener Sociedades y Huertos que tiene acceso
$.each(SESION.campo, function(key, value){
	sociedadPrivilege.add(value.idSociedad);
	huertoPrivilege.push(value.campo);
});

$(document).ready(function() {
	$("#loading").hide();
	$("#btnChange").hide();
	ListaSociedad();
	ListaTipoLicencia();
	ListaSubtipoLicencia();
	ListaPermisosLegales();
	ListaPermisosConvencionales();
	
	
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
	feriadosGlobal = feriadosreplace;
    
	
	var currentTime = new Date();	
    var startDateFrom = new Date(currentTime.getFullYear(), currentTime.getMonth() -3, 1);

	// -- controlar fechas----------------
	$('#fechaInicio').datepicker({
		dateFormat : 'dd/mm/yy',
		minDate : startDateFrom,
		firstDay: 1,
		changeMonth: true,
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

	$('#fechaInicioLM').datepicker({
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
	$('#fechaFinLM').datepicker({
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
	// -------end fechas------------------------

	$("#CodigoTra").prop("disabled", true);
	$("#accion").prop("disabled", true);

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

	$('#diascorridosLM').keyup(function(e) {
		var code = e.keyCode || e.which;
		if (code == 109 || code == 189) { // Enter keycode
			// Do something
			var valor = $(this).val();
			$(this).val(valor.replace(/[-]/g, ''))
		}
	});

	$('#diascorridosLM').change(function(e) {
		var valor = $(this).val();
		$(this).val(valor.replace(/[-]/g, ''))
	});

})

$('#Sociedad').change(function(e) {

	var valorSociedad = $('#Sociedad').val();
	if (valorSociedad === '') {
		alerta("Campo Empresa no Puede Estar vacio");
		return;
	}
	$("#accion").prop("disabled", true);
	$('#divpermiso').hide();
	$('#divlicencia').hide();
	$('#divpermisoSinGoce').hide();
	$('#divlicenciaMutual').hide();
	

	
	$('#accion').val("");
	$("#CodigoTra").prop("disabled", false);
	$("#detalletrab").empty();
	
	$("#CodigoTra").focus();
	
	var soc = $('#Sociedad').val();
	if(soc == ""){
		alerta("Debe Seleccionar una Empresa");
		return;
	}
	
	
	$("#tipodivisionB").empty();
	$("#CodigoTra").empty();
	
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
	lodtrab();
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
	
	});
	

$('#subtipolicencia').change(function(e) {

	var valorSub = $("#subtipolicencia").val();

});
$('#tipolicencia').change(
		function(e) {
			
			$("#TipoR").val("");
			$("#parcial").val("");
			$("#labelParcial").css("display", "none");
			$("#parcial").css("display", "none");

			$("#subtipolicencia").prop("disabled", false);
			tipodereposo();
			$("#subtipolicencia").empty();
			var valorL = $("#tipolicencia").val();

			if (valorL == '168') {

				$("#labelsubtipo").css("display", "block");
				$("#subtipolicencia").css("display", "block");
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
				$("#labelsubtipo").css("display", "block");
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
				$("#labelsubtipo").css("display", "none");
				$("#subtipolicencia").css("display", "none");
			}

		});

$('#accion').change(function(e) {
    
	
	//limpiar datos
	$("#fechaInicioP").val();$("#fechaFinP").val();$("#diascorridosP").val();$("#8").val("");
	$("#fechaInicioPSG").val();$("#fechaFinPSG").val();$("#diascorridosPSG").val();$("#checkPermisoSG").val("");$("#9").val("");
	
	$("#tipolicencia").val();$("#TipoR").val();$("#parcial").val();
	$("#fechaInicio").val("");$("#fechaFin").val("");$("#7").val("");
	$("#diascorridosL").val("");$("#checkLicencia").val("");
	
	$("#fechaInicioLM").val("");$("#fechaFinLM").val("");
	$("#diascorridosLM").val("");$("#checkLicenciaMutual").val("");
	
	
	
	var valorAccion = $("#accion").val();
	if(valorAccion == ""){alerta("Debe Seleccionar una Acción");$("#accion").focus();return;}
	
	
	$("#parcial").css("display", "none");
	$("#labelParcial").css("display", "none");
	$("#labelsubtipo").css("display", "none");
	$("#subtipolicencia").css("display", "none");

	tipodereposo();

	$("#subtipolicencia").empty();
	$("#subtipolicencia").prop("disabled", true);

	var accion = $('#accion').val();

	if (accion == 1) {

		$('#divlicenciaMutual').hide();
		$('#divlicencia').hide();
		$('#divpermisoSinGoce').hide();
		
		$('#divpermiso').show();


	} else if (accion == 2) {

		$('#divpermiso').hide();
		$('#divlicenciaMutual').hide();
		$('#divpermisoSinGoce').hide();
		$('#divlicencia').show();



	} else if (accion == 3) {
		$('#divlicenciaMutual').show();
		$('#divpermiso').hide();
		$('#divlicencia').hide();
		$('#divpermisoSinGoce').hide();


	} else if (accion == 4) {
		$('#divpermisoSinGoce').show();
		$('#divlicenciaMutual').hide();
		$('#divpermiso').hide();
		$('#divlicencia').hide();
		

		
	}
	else {
		

		$('#divlicenciaMutual').hide();
		$('#divpermiso').hide();
		$('#divlicencia').hide();
	}

});
$('#CodigoTra').change(function(e) 
		{
	buscarIdContrato();
	buscarHuertoTrabaj();
	
	                $('#accion').val("");
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
																	+ "</div>";
															$("#detalletrab")
																	.append(
																			detalletra);

														});

									}).done(function() {
								$("#loading").hide();

							}).fail(function(jqXHR, textStatus, errorThrown) {

							    alerta(errorThrown);
								$("#loading").hide();
							})
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
			"/simpleWeb/json/work/LoadTrabajadorXSociedad/"+ valueSociedad +","+ tipo_division +","+ tipo_subdivision+","+grupo+","+SESION.idUser,
			function(data) {
				$.each(data, function(k, v) {

					var SelectConcepto = "";
					SelectConcepto += "<option value=''>Buscar</option>";
					SelectConcepto += "<option class='mayusculasWork' value=" + v.codigotrabajador
							+ ">" + v.codigotrabajador +  " | " + v.apellidoPaterno.toUpperCase() + " "
							+ v.apellidoMaterno.toUpperCase() + " " + v.nombre.toUpperCase() + " | " + v.rut + " </option>";
					$("#CodigoTra").append(SelectConcepto);

				});

			}).done(function() {
		$("#loading").hide();

	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})
}

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


function UploadFileLicencia(idInput) {

	var codigoTrab = $("#CodigoTra").val();
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
function upload(idInput) {

	var codigoTrab = $("#CodigoTra").val();
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

function uploadPermisoSinGoce(idInput) {

	var codigoTrab = $("#CodigoTra").val();
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



// --- funcion enviar datos Licencia-----//
function addForm1() {

	if ($('#7').val() === '') {
		alerta("Debe Subir un Archivo");
		return;
	} else {

	}
	
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
	    
	var codigoTrab = $("#CodigoTra").val();
	var reposoT = $("#TipoR").val();
	var form_data = new FormData();

	var d = new Date();

	var month = d.getMonth() + 1;
	var day = d.getDate();
	var year = d.getFullYear();
	var min = d.getMinutes();
	var hour = d.getHours()
	var seconds = d.getSeconds();
    
	//var ruta = "../assets/permisoylicencia/";
     var ruta;
    
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

	if ($('#CodigoTra').val() === '') {
		alerta("Debe Seleccionar un Trabajador");
		$("#CodigoTra").focus();
		return;
	} else if ($('#Sociedad').val() === '') {
		alerta("Debe Seleccionar una Empresa");
		$("#Sociedad").focus();
		return;
	} else if ($('#tipolicencia').val() === '') {
		alerta("Debe Seleccionar un Tipo de Licencia");
		$("#tipolicencia").focus();
		return;
	} else if ($('#fechaInicio').val() === '') {
		alerta("Debe Seleccionar una fecha de Inicio");
		$("#fechaInicio").focus();
		return;
	} else if ($('#fechaFin').val() === '') {
		alerta("Debe Seleccionar una fecha de Fin");
		$("#fechaFin").focus();
		return;
	} else if ($('#fechaFin').val() === 'NaN/NaN/NaN') {
		alerta("Debe Seleccionar una fecha de Fin");
		$("#fechaFin").focus();
		return;
	} else if ($('#TipoR').val() === '') {
		alerta("Debe Seleccionar un Tipo de Reposo");
		$("#TipoR").focus();
		return;
	} else if ($('#TipoR').val() === '188' && $('#parcial').val() === '') {
		alerta("Debe Seleccionar un Tipo Parcial");
		$("#parcial").focus();
		return;
	} else if ($('#tipolicencia').val() === '166'
			&& $('#subtipolicencia').val() === '') {
		alerta("Debe Seleccionar un Sub Tipo Licencia");
		$("#subtipolicencia").focus();
		return;
	} else if ($('#tipolicencia').val() === '168'
			&& $('#subtipolicencia').val() === '') {
		alerta("Debe Seleccionar un Sub Tipo Licencia");
		$("#subtipolicencia").focus();
		return;
	}

	
	var numeroinput = 7;
	if ($('#7').val() === '') {

	} else {
		UploadFileLicencia(numeroinput);
	}

	licencia = [];
	var codigo_traba = $("#CodigoTra").val();
	var sociedadL = $("#Sociedad").val();
	var tipo_licenciaL = $("#tipolicencia").val();
	var subtipo_licenciaL = $("#subtipolicencia").val();
	var fechaI1 = $("#fechaInicio").val();
	var fechaT1 = $("#fechaFin").val();

	var fechaI2 = fechaI1.split("/");
	var fecha_inicioL = (fechaI2[2] + "-" + fechaI2[1] + "-" + fechaI2[0]);

	var fechaT2 = fechaT1.split("/");
	var fecha_finL = (fechaT2[2] + "-" + fechaT2[1] + "-" + fechaT2[0]);


	var dias_corridosL = $("#diascorridosL").val();
	var accionT = $("#accion").val();
	var reposoParcial = $("#parcial").val();
	
	var nombreDoctor = $("#nombredoctor").val();
	var especialidad = $("#especialidad").val();

	var checkLicencia = 0;

	if ($('#checkLicencia').is(':checked')) {
		checkLicencia = 1;
	}
	var id_contrato = $("#idContrato").val();
	
	var json2 = {

		codigo_trabajador : codigo_traba,
		id_empresa : sociedadL,
		tipo_licenciaid : tipo_licenciaL,
		subtipo_licenciaid : subtipo_licenciaL,
		fecha_desde : fecha_inicioL,
		fecha_hasta : fecha_finL,
		dias_corridos : dias_corridosL,
		incluye_feriados : checkLicencia,
		accion : accionT,
		reposo : reposoParcial,
		ruta_archivo : ruta2,
		doctor : nombreDoctor,
		especialidad : especialidad, 
		tipo_reposo : reposoT,
		idContrato : id_contrato

	}
	licencia.push(json2);
	$("#loading").show();
	$.ajax({
		url : "/simpleWeb/json/work/insertTrabajadorLicencia/",
		type : "PUT",
		data : JSON.stringify(licencia),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
			$("#loading").show();

		},
		success : function(data, textStatus, jqXHR) {

			$('#fechaInicio').val("");
			$('#fechaFin').val("");
			$('#diascorridosL').val("");
			$('#7').val("");
			$("#checkLicencia").prop("checked", false);
			$("#tipolicencia").val("");
			$("#subtipolicencia").val("");
			$("#parcial").val("");
			$("#TipoR").val("");
			
			$("#nombredoctor").val("");
			$("#especialidad").val("");

			$("#labelsubtipo").css("display", "none");
			$("#subtipolicencia").css("display", "none");
			$("#parcial").css("display", "none");
			$("#labelParcial").css("display", "none");

			alerta("Enviado");
			
		
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
// --- funcion enviar datos Permiso-----//
function addForm2() {
	
	if ($('#8').val() === '') {
		alerta("Debe Subir un Archivo");
		return;
	} else {

	}
	
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
	        return;
	    }
	
	var codigoTrab = $("#CodigoTra").val();
	var form_data = new FormData();

	var d = new Date();

	var month = d.getMonth() + 1;
	var day = d.getDate();
	var year = d.getFullYear();
	var min = d.getMinutes();
	var hour = d.getHours()
	var seconds = d.getSeconds();

	 var ruta;
/// ruta Permiso 
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

	if ($('#CodigoTra').val() === '') {
		alerta("Debe Seleccionar un Trabajador");
		$("#CodigoTra").focus();
		return;
	} else if ($('#Sociedad').val() === '') {
		alerta("Debe Seleccionar una Empresa");
		$("#Sociedad").focus();
		return;
	} else if ($('#fechaInicioP').val() === '') {
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
	if ($('#8').val() === '') {

	} else {
		upload(numeroinput);
	}

	permiso = [];

	var codigo_traba = $("#CodigoTra").val();
	var sociedadP = $("#Sociedad").val();

	var fechaI1 = $("#fechaInicioP").val();
	var fechaT1 = $("#fechaFinP").val();
	
	var permiso_legal = $("#permisolegales").val();
	var permiso_convencional = $("#permisoConven").val();

	var fechaI2 = fechaI1.split("/");
	var fecha_inicio = (fechaI2[2] + "/" + fechaI2[1] + "/" + fechaI2[0]);

	var fechaT2 = fechaT1.split("/");
	var fecha_fin = (fechaT2[2] + "/" + fechaT2[1] + "/" + fechaT2[0]);

	
	var dias_corridos = $("#diascorridosP").val();
	var accionT = $("#accion").val();

	var fecha_inicio2 = fecha_inicio.replace("/", "-");
	var fecha_inicio3 = fecha_inicio2.replace("/", "-");

	var fecha_fin2 = fecha_fin.replace("/", "-");
	var fecha_fin3 = fecha_fin2.replace("/", "-");
    var id_contrato = $("#idContrato").val();
    var jsonFechas;
    
	/// si el trabajador es agro
	if (esAgro == 1){
		
		if(valorDiaTrab == 0){
			alerta("Debe Seleccionar Base de Sueldo")
			return;
		}
		
		for(var i = 0;i < diashabiles_trab.length; i++){
			
			if(diashabiles_trab[i].habil == "1"){
				
				var fecha_habil = diashabiles_trab[i].fecha;
				var periodoSplit = fecha_habil.split("-");
				var periodoFinal = periodoSplit[0]+periodoSplit[1];
				jsonFechas ={
						
						fechapermiso : diashabiles_trab[i].fecha,
						codigo_trabajador : codigo_traba,
						accion : accionT,
						id_empresa : sociedadP,
						fecha_desde : fecha_inicio3,
						fecha_hasta : fecha_fin3,
						ruta_archivo : ruta2,
						dias_corridos : dias_corridos,
						idContrato : id_contrato,
						permisolegal : permiso_legal,
						permisoconvencional : permiso_convencional,
						totalliquidodia : valorDiaTrab,
						periodo : periodoFinal,
						huerto : huerto_trabajador,
						idtrabajador : id_trabajador,
						cargo : cargo_trabajador
						
				}
				permiso.push(jsonFechas);
			}
			
			 
				if(diashabiles_trab[i].fecha == ultima_fecha_retornada){
					break;
				}
		}
	}
	// no es agro
	else{
				
				jsonFechas ={
						
						codigo_trabajador : codigo_traba,
						accion : accionT,
						id_empresa : sociedadP,
						fecha_desde : fecha_inicio3,
						fecha_hasta : fecha_fin3,
						ruta_archivo : ruta2,
						dias_corridos : dias_corridos,
						idContrato : id_contrato,
						permisolegal : permiso_legal,
						permisoconvencional : permiso_convencional
						
				}
				permiso.push(jsonFechas);
	}
	
	if (esAgro == 0){
	     
		$("#loading").show();
		$.ajax({
			url : "/simpleWeb/json/work/insertTrabajadorPermiso/",
			type : "PUT",
			data : JSON.stringify(permiso),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
				$("#loading").show();

			},
			success : function(data, textStatus, jqXHR) {

				$('#fechaInicioP').val("");
				$('#fechaFinP').val("");
				$('#diascorridosP').val("");
				$('#8').val("");
				$("#checkPermiso").prop("checked", false);

				alerta("Enviado");
				
			
				$("#loading").hide();
			},
			error : function(ex) {
				console.log(ex);
			}
		}).fail(function(jqXHR, textStatus, errorThrown) {

		    alerta(errorThrown);
			$("#loading").hide();
		})
	}else if(esAgro == 1){
		$("#loading").show();
		$.ajax({
			url : "/simpleWeb/json/work/insertTrabajadorPermisoAgro/",
			type : "PUT",
			data : JSON.stringify(permiso),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
				$("#loading").show();

			},
			success : function(data, textStatus, jqXHR) {

				$('#fechaInicioP').val("");
				$('#fechaFinP').val("");
				valorDiaTrab = 0;
//				huerto_trabajador = "";
				diashabiles_trab = [];
//				id_trabajador = "";
				$("#checkPlegales").prop("checked", false);
				$("#checkPconvenc").prop("checked", false);
				$('#permisolegales').val("");
				$('#permisoConven').val("");
				$("#permisolegales").prop("disabled", true);
				$("#permisoConven").prop("disabled", true);
				
				$('#diascorridosP').val("");
				$('#8').val("");
				$("#checkPermiso").prop("checked", false);

				alerta("Enviado");
				
			
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

}

// --- funcion enviar datos Licencia Mutualidad-----//
function addForm3() {

	var codigoTrab = $("#CodigoTra").val();
	var form_data = new FormData();

	if ($('#CodigoTra').val() === '') {
		alerta("Debe Seleccionar un Trabajador");
		$("#CodigoTra").focus();
		return;
	} else if ($('#Sociedad').val() === '') {
		alerta("Debe Seleccionar una Empresa");
		$("#Sociedad").focus();
		return;
	} else if ($('#fechaInicioLM').val() === '') {
		alerta("Debe Seleccionar una fecha de Inicio");
		$("#fechaInicioLM").focus();
		return;
	} else if ($('#fechaFinLM').val() === '') {
		alerta("Debe Seleccionar una fecha de Fin");
		$("#fechaFinLM").focus();
		return;
	} else if ($('#idContrato').val() === '-1') {
		alerta("Debe Seleccionar una fecha de Contrato");
		$("#idContrato").focus();
		return;
	}
	
	else if ($('#fechaFinLM').val() === 'NaN/NaN/NaN') {
		alerta("Debe Seleccionar una fecha de Fin");
		$("#fechaFinLM").focus();
		return;
	}
	
	var fechaI1 = $("#fechaInicioLM").val();
	var fechaT1 = $("#fechaFinLM").val();

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

	LicenciaM = [];

	var codigo_traba = $("#CodigoTra").val();
	var sociedadLM = $("#Sociedad").val();

	var fechaI1 = $("#fechaInicioLM").val();
	var fechaT1 = $("#fechaFinLM").val();

	var fechaI2 = fechaI1.split("/");
	var fecha_inicio = (fechaI2[2] + "/" + fechaI2[1] + "/" + fechaI2[0]);

	var fechaT2 = fechaT1.split("/");
	var fecha_fin = (fechaT2[2] + "/" + fechaT2[1] + "/" + fechaT2[0]);

	
	var dias_corridos = $("#diascorridosLM").val();
	var accionT = $("#accion").val();

	var fecha_inicio2 = fecha_inicio.replace("/", "-");
	var fecha_inicio3 = fecha_inicio2.replace("/", "-");

	var fecha_fin2 = fecha_fin.replace("/", "-");
	var fecha_fin3 = fecha_fin2.replace("/", "-");

	var checkpermiso = 0;
	if ($('#checkLicenciaMutual').is(':checked')) {
		checkpermiso = 1;
	}
	
	var id_contrato = $("#idContrato").val();
	
	var json2 = {

		codigo_trabajador : codigo_traba,
		accion : accionT,
		id_empresa : sociedadLM,
		fecha_desde : fecha_inicio3,
		fecha_hasta : fecha_fin3,
		dias_corridos : dias_corridos,
		incluye_feriados : checkpermiso,
		idContrato : id_contrato

	}

	LicenciaM.push(json2);
	$("#loading").show();
	$.ajax({
		url : "/simpleWeb/json/work/insertLicenciaMutualidad/",
		type : "PUT",
		data : JSON.stringify(LicenciaM),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
			$("#loading").show();

		},
		success : function(data, textStatus, jqXHR) {

			$('#fechaInicioLM').val("");
			$('#fechaFinLM').val("");
			$('#diascorridosLM').val("");
			$("#checkLicenciaMutual").prop("checked", false);

			alerta("Enviado");
			
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

feriados = [];




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

$('#diascorridosL').change(function(e) {

	monto = $("#diascorridosL").val();
	
	if(monto == 0){
		alerta("Debe Ingresar un Día Mayor 0");
		return;
	}

	var fechaIC1 = $("#fechaInicio").val();

	var fechaIC2 = fechaIC1.split("/");
	var fechaIC = (fechaIC2[2] + "/" + fechaIC2[1] + "/" + fechaIC2[0]);

	if (fechaIC1 == '') {
		alerta("Debe Seleccionar una Fecha Inicio");
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

$('#fechaFin').change(function(e) {

	var fechaI1 = $("#fechaInicio").val();
	var fechaT1 = $("#fechaFin").val();

	var fechaI2 = fechaI1.split("/");
	var fechaI = (fechaI2[2] + "/" + fechaI2[1] + "/" + fechaI2[0]);

	var fechaT2 = fechaT1.split("/");
	var fechaT = (fechaT2[2] + "/" + fechaT2[1] + "/" + fechaT2[0]);

	if (fechaI1 == '') {
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
		
		var from = $("#fechaInicio").val();
		from = from.split("/");
		from = from[2]+"-"+from[1]+"-"+from[0];
		
		var to = $("#fechaFin").val();
		to = to.split("/");
		to = to[2]+"-"+to[1]+"-"+to[0];

		if ($('#checkLicencia').is(':checked')) 
		{
			var contadorferiados = 0;
			for (var i = 0; i < feriadosArray.length; i++) {
				
			     if ( Date.parse(feriadosArray[i]) >= Date.parse(from)) 
			     {     
	               if(Date.parse(feriadosArray[i]) <= Date.parse(to)){
				   
				    contadorferiados ++
			      
				   }			 
			       
			     }
					
				}
			
			$("#diascorridosL").val(totaldiasvalor - contadorferiados);
		}
	else
		{
		
		var start = $.datepicker.parseDate('dd/mm/yy', fechaI1);
		var end = $.datepicker.parseDate('dd/mm/yy', fechaT1);

		var startDate = new Date(start);
		var endDate = new Date(end);
		var totalSundays = 0;
		
		var from = $("#fechaInicio").val();
		from = from.split("/");
		from = from[2]+"-"+from[1]+"-"+from[0];
		
		var to = $("#fechaFin").val();
		to = to.split("/");
		to = to[2]+"-"+to[1]+"-"+to[0];

		for (var i = startDate; i <= endDate; ){
		    if (i.getDay() == 0){
		        totalSundays++;
		    }
		    i.setTime(i.getTime() + 1000*60*60*24);
		}

		var totalFeriados = totalSundays * 2;
		
		var contadorferiados2 = 0;
		
		for (var i = 0; i < feriadosArray.length; i++) {
			
		     if ( Date.parse(feriadosArray[i]) >= Date.parse(from)) 
		     {     
              if(Date.parse(feriadosArray[i]) <= Date.parse(to)){
			   
			    contadorferiados2 ++
		      
			   }			 
		       
		     }
				
			}
		

		$("#diascorridosL").val((totaldiasvalor - contadorferiados2)- totalFeriados);
		}
	}
});
$('#fechaInicio').change(function(e) {

	var fechaI1 = $("#fechaInicio").val();
	var fechaT1 = $("#fechaFin").val();

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
        var totaldiasvalor = agregarValorAprox + 1 ;
        
    	var from = $("#fechaInicio").val();
		from = from.split("/");
		from = from[2]+"-"+from[1]+"-"+from[0];
		
		var to = $("#fechaFin").val();
		to = to.split("/");
		to = to[2]+"-"+to[1]+"-"+to[0];
		
		
		
		if ($('#checkLicencia').is(':checked')) 
			{
			
			var contadorferiados = 0;
			for (var i = 0; i < feriadosArray.length; i++) {
				
			     if ( Date.parse(feriadosArray[i]) >= Date.parse(from)) 
			     {     
	               if(Date.parse(feriadosArray[i]) <= Date.parse(to)){
				   
				    contadorferiados ++
			      
				   }			 
			       
			     }
					
				}
			
			    
			
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
			
			var contadorferiados = 0;
			for (var i = 0; i < feriadosArray.length; i++) {
				
			     if ( Date.parse(feriadosArray[i]) >= Date.parse(from)) 
			     {     
	               if(Date.parse(feriadosArray[i]) <= Date.parse(to)){
				   
				    contadorferiados ++
			      
				   }			 
			       
			     }
					
				}

			
			
			$("#diascorridosL").val((totaldiasvalor - contadorferiados)- totalFeriados);
			}
	}
});

function monthDiff(d1, d2) {
	var months;
	months = (d2.getFullYear() - d1.getFullYear()) * 12;
	months -= d1.getMonth();
	months += d2.getMonth() + 1;
	return months <= 0 ? 0 : months;
}
$('#fechaFinP').change(function(e) {
	var fechaI1 = $("#fechaInicioP").val();
	var fechaT1 = $("#fechaFinP").val();

	var fechaI2 = fechaI1.split("/");
	var fechaI = (fechaI2[2] + "/" + fechaI2[1] + "/" + fechaI2[0]);

	var fechaT2 = fechaT1.split("/");
	var fechaT = (fechaT2[2] + "/" + fechaT2[1] + "/" + fechaT2[0]);

	if (fechaI1 == '') {
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
		
		var from = $("#fechaInicioP").val();
		from = from.split("/");
		from = from[2]+"-"+from[1]+"-"+from[0];
		
		var to = $("#fechaFinP").val();
		to = to.split("/");
		to = to[2]+"-"+to[1]+"-"+to[0];
		
		var start = $.datepicker.parseDate('dd/mm/yy', $("#fechaInicioP").val());
		var end = $.datepicker.parseDate('dd/mm/yy',  $("#fechaFinP").val());

		var startDate = new Date(start);
		var endDate = new Date(end);
		var totalSundays = 0;
		
		var from = $("#fechaInicioP").val();
		from = from.split("/");
		from = from[2]+"-"+from[1]+"-"+from[0];
		
		var to = $("#fechaFinP").val();
		to = to.split("/");
		to = to[2]+"-"+to[1]+"-"+to[0];

		for (var i = startDate; i <= endDate; ){
		    if (i.getDay() == 0){
		        totalSundays++;
		    }
		    i.setTime(i.getTime() + 1000*60*60*24);
		}

		var totalsabadoDomingo = totalSundays * 2;
		
		
		
		var contadorferiados = 0;
		for (var i = 0; i < feriadosArray.length; i++) {
			
		     if ( Date.parse(feriadosArray[i]) >= Date.parse(from)) 
		     {     
               if(Date.parse(feriadosArray[i]) <= Date.parse(to)){
			   
			    contadorferiados ++
		      
			   }			 
		       
		     }
				
			}

		$("#diascorridosP").val((totaldiasvalor - contadorferiados) - totalsabadoDomingo );
	}
	
monto = $("#diascorridosP").val();
	
	if(monto == 0){
		alerta("Debe Ingresar un Días Habiles Mayor 0");
		return;
	}

	var fechaIC1 = $("#fechaInicioP").val();

	var fechaIC2 = fechaIC1.split("/");
	var fechaIC = (fechaIC2[2] + "/" + fechaIC2[1] + "/" + fechaIC2[0]);

	if (fechaIC1 == '') {
		alerta("Debe Seleccionar una Fecha Inicio");
		$("#diascorridosP").val("");
		return;
	}
	var valNew = fechaIC.split('/');

	var valNew2 = valNew[2] + "-" + valNew[1] + "-" + valNew[0];

	var cantidadtotal = '+';
	
	var multiplicadorDias = parseInt(monto) * 2;
	
	var resultadocantidad = cantidadtotal.concat(multiplicadorDias);
	
	var diasSeleccionado = [];
	var nuevo = "";
	
	for (var i=0; i<multiplicadorDias +1; i++) {
		nuevo  = editar_fecha(valNew2, "+"+i, "d");
		nuevo = nuevo.split('-');
		nuevo = nuevo[2]+"-"+nuevo[1]+"-"+nuevo[0];
	    
			diasSeleccionado.push(nuevo);
	}

	

	
	var arrayDias = [];
	for(var i = 0;i < diasSeleccionado.length; i++){
		var json = {
			habil: 1,
			fecha: diasSeleccionado[i]
		}
		arrayDias.push(json);
	}
	
	 
	 var days = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"];
	$.each(arrayDias, function(k,v){
	   var fechaobtenida = v.fecha;
	   var d = new Date(fechaobtenida);
	  var quediaes =  days[d.getDay()];
	  if(quediaes == "Sabado" ){
		  v.habil = 0;
	  }else if(quediaes == "Domingo"){
		  v.habil = 0;
	  }
	})
	
	var er = parseInt(monto);
	var ej = 0;
	var fecha = "";
	$.each(arrayDias, function(k,v){
		// si lo encuentra le agrega el 0
		if(feriadosArray.indexOf(v.fecha) != -1){
			v.habil = 0;
			
		
		// si no lo encuentra agrega 1
	
			
		}else{
			   if(v.habil == 0){}else{ej++;}
			}
		
		if(er == ej){
			fecha = v.fecha;
			return false;
		}
	})
	
    diashabiles_trab = arrayDias;
	
	ultima_fecha_retornada = fecha;
	var nuevo4 = fecha.split('-');

	var nuevo5 = nuevo4[2] + "/" + nuevo4[1] + "/" + nuevo4[0];
	$("#fechaFinP").val(nuevo5);

	$("#fechaFinP").datepicker('destroy').datepicker({
		dateFormat : 'dd/mm/yy',
		setdate : new Date(nuevo5),
		firstDay: 1,
		changeMonth: true,
        changeYear: true,
        changeMonth: true,
		  beforeShowDay: function (date) {
            var datestring = jQuery.datepicker.formatDate('yy-mm-dd', date);
            if (feriadosGlobal.indexOf(datestring) != -1) {
                return [true, "nonbusiness"];
            } 
            else {
                return [true];
            }                   
        }

	});
	
});

$('#fechaInicioP').change(function(e) {

	var fechaI1 = $("#fechaInicioP").val();
	var fechaT1 = $("#fechaFinP").val();

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
		
		var from = $("#fechaInicioP").val();
		from = from.split("/");
		from = from[2]+"-"+from[1]+"-"+from[0];
		
		var to = $("#fechaFinP").val();
		to = to.split("/");
		to = to[2]+"-"+to[1]+"-"+to[0];
		
		var start = $.datepicker.parseDate('dd/mm/yy', $("#fechaInicioP").val());
		var end = $.datepicker.parseDate('dd/mm/yy',  $("#fechaFinP").val());

		var startDate = new Date(start);
		var endDate = new Date(end);
		var totalSundays = 0;
		
		var from = $("#fechaInicioP").val();
		from = from.split("/");
		from = from[2]+"-"+from[1]+"-"+from[0];
		
		var to = $("#fechaFinP").val();
		to = to.split("/");
		to = to[2]+"-"+to[1]+"-"+to[0];

		for (var i = startDate; i <= endDate; ){
		    if (i.getDay() == 0){
		        totalSundays++;
		    }
		    i.setTime(i.getTime() + 1000*60*60*24);
		}

		var totalsabadoDomingo = totalSundays * 2;
		
		var contadorferiados = 0;
		for (var i = 0; i < feriadosArray.length; i++) {
			
		     if ( Date.parse(feriadosArray[i]) >= Date.parse(from)) 
		     {     
               if(Date.parse(feriadosArray[i]) <= Date.parse(to)){
			   
			    contadorferiados ++
		      
			   }			 
		       
		     }
				
			}
		$("#diascorridosP").val((totaldiasvalor - contadorferiados) - totalsabadoDomingo );
	}
	
	
monto = $("#diascorridosP").val();
	
	

	var fechaIC1 = $("#fechaInicioP").val();

	var fechaIC2 = fechaIC1.split("/");
	var fechaIC = (fechaIC2[2] + "/" + fechaIC2[1] + "/" + fechaIC2[0]);

	if (fechaIC1 == '') {
		alerta("Debe Seleccionar una Fecha Inicio");
		$("#diascorridosP").val("");
		return;
	}
	var valNew = fechaIC.split('/');

	var valNew2 = valNew[2] + "-" + valNew[1] + "-" + valNew[0];

	var cantidadtotal = '+';
	
	var multiplicadorDias = parseInt(monto) * 2;
	
	var resultadocantidad = cantidadtotal.concat(multiplicadorDias);
	
	var diasSeleccionado = [];
	var nuevo = "";
	
	for (var i=0; i<multiplicadorDias +1; i++) {
		nuevo  = editar_fecha(valNew2, "+"+i, "d");
		nuevo = nuevo.split('-');
		nuevo = nuevo[2]+"-"+nuevo[1]+"-"+nuevo[0];
	    
			diasSeleccionado.push(nuevo);
	}

	

	
	var arrayDias = [];
	for(var i = 0;i < diasSeleccionado.length; i++){
		var json = {
			habil: 1,
			fecha: diasSeleccionado[i]
		}
		arrayDias.push(json);
	}
	
	 
	 var days = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"];
	$.each(arrayDias, function(k,v){
	   var fechaobtenida = v.fecha;
	   var d = new Date(fechaobtenida);
	  var quediaes =  days[d.getDay()];
	  if(quediaes == "Sabado" ){
		  v.habil = 0;
	  }else if(quediaes == "Domingo"){
		  v.habil = 0;
	  }
	})
	
	var er = parseInt(monto);
	var ej = 0;
	var fecha = "";
	$.each(arrayDias, function(k,v){
		// si lo encuentra le agrega el 0
		if(feriadosArray.indexOf(v.fecha) != -1){
			v.habil = 0;
			
		
		// si no lo encuentra agrega 1
	
			
		}else{
			   if(v.habil == 0){}else{ej++;}
			}
		
		if(er == ej){
			fecha = v.fecha;
			return false;
		}
	})
	
    diashabiles_trab = arrayDias;
	
	ultima_fecha_retornada = fecha;
	var nuevo4 = fecha.split('-');

	var nuevo5 = nuevo4[2] + "/" + nuevo4[1] + "/" + nuevo4[0];
	$("#fechaFinP").val(nuevo5);

	$("#fechaFinP").datepicker('destroy').datepicker({
		dateFormat : 'dd/mm/yy',
		setdate : new Date(nuevo5),
		firstDay: 1,
		changeMonth: true,
        changeYear: true,
        changeMonth: true,
		  beforeShowDay: function (date) {
            var datestring = jQuery.datepicker.formatDate('yy-mm-dd', date);
            if (feriadosGlobal.indexOf(datestring) != -1) {
                return [true, "nonbusiness"];
            } 
            else {
                return [true];
            }                   
        }

	});
	
	var fecha_finn = $("#fechaFinP").val();
	
	if(fecha_finn == "undefined/undefined/"){
		$("#fechaFinP").val("");
	}
	
});
///fecha change permiso sin goce
$('#fechaFinPSG').change(function(e) {
	var fechaI1 = $("#fechaInicioPSG").val();
	var fechaT1 = $("#fechaFinPSG").val();

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
		
		var from = $("#fechaInicioPSG").val();
		from = from.split("/");
		from = from[2]+"-"+from[1]+"-"+from[0];
		
		var to = $("#fechaFinPSG").val();
		to = to.split("/");
		to = to[2]+"-"+to[1]+"-"+to[0];

		
		if ($('#checkPermisoSG').is(':checked')) 
		{
			
			var contadorferiados = 0;
			for (var i = 0; i < feriadosArray.length; i++) {
				
			     if ( Date.parse(feriadosArray[i]) >= Date.parse(from)) 
			     {     
	               if(Date.parse(feriadosArray[i]) <= Date.parse(to)){
				   
				    contadorferiados ++
			      
				   }			 
			       
			     }
					
				}
			$("#diascorridosPSG").val(totaldiasvalor - contadorferiados);
			
		}
	else
		{
		var start = $.datepicker.parseDate('dd/mm/yy', fechaI1);
		var end = $.datepicker.parseDate('dd/mm/yy', fechaT1);

		var startDate = new Date(start);
		var endDate = new Date(end);
		var totalSundays = 0;
		
		var from = $("#fechaInicioPSG").val();
		from = from.split("/");
		from = from[2]+"-"+from[1]+"-"+from[0];
		
		var to = $("#fechaFinPSG").val();
		to = to.split("/");
		to = to[2]+"-"+to[1]+"-"+to[0];

		for (var i = startDate; i <= endDate; ){
		    if (i.getDay() == 0){
		        totalSundays++;
		    }
		    i.setTime(i.getTime() + 1000*60*60*24);
		}

		var totalFeriados = totalSundays * 2;
		
		var contadorferiados2 = 0;
		
		
		for (var i = 0; i < feriadosArray.length; i++) {
			
		     if ( Date.parse(feriadosArray[i]) >= Date.parse(from)) 
		     {     
              if(Date.parse(feriadosArray[i]) <= Date.parse(to)){
			   
			    contadorferiados2 ++
		      
			   }			 
		       
		     }
				
			}
		
		$("#diascorridosPSG").val((totaldiasvalor - contadorferiados2)- totalFeriados);
		
		}
	}
});

$('#fechaInicioPSG').change(function(e) {

	var fechaI1 = $("#fechaInicioPSG").val();
	var fechaT1 = $("#fechaFinPSG").val();

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
		
		var from = $("#fechaInicioPSG").val();
		from = from.split("/");
		from = from[2]+"-"+from[1]+"-"+from[0];
		
		var to = $("#fechaFinPSG").val();
		to = to.split("/");
		to = to[2]+"-"+to[1]+"-"+to[0];

		
		if ($('#checkPermisoSG').is(':checked')) 
		{
			
			var contadorferiados = 0;
			for (var i = 0; i < feriadosArray.length; i++) {
				
			     if ( Date.parse(feriadosArray[i]) >= Date.parse(from)) 
			     {     
	               if(Date.parse(feriadosArray[i]) <= Date.parse(to)){
				   
				    contadorferiados ++
			      
				   }			 
			       
			     }
					
				}
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
		
		var contadorferiados = 0;
		for (var i = 0; i < feriadosArray.length; i++) {
			
		     if ( Date.parse(feriadosArray[i]) >= Date.parse(from)) 
		     {     
               if(Date.parse(feriadosArray[i]) <= Date.parse(to)){
			   
			    contadorferiados ++
		      
			   }			 
		       
		     }
				
			}
		

		$("#diascorridosPSG").val((totaldiasvalor - contadorferiados)- totalFeriados);
		}
	}
});

$('#diascorridosP').change(function(e) {

	monto = $("#diascorridosP").val();
	
	if(monto == 0){
		alerta("Debe Ingresar un Día Mayor 0");
		return;
	}

	var fechaIC1 = $("#fechaInicioP").val();

	var fechaIC2 = fechaIC1.split("/");
	var fechaIC = (fechaIC2[2] + "/" + fechaIC2[1] + "/" + fechaIC2[0]);

	if (fechaIC1 == '') {
		alerta("Debe Seleccionar una Fecha Inicio");
		$("#diascorridosP").val("");
		return;
	}
	var valNew = fechaIC.split('/');

	var valNew2 = valNew[2] + "-" + valNew[1] + "-" + valNew[0];

	var cantidadtotal = '+';
	
	var multiplicadorDias = parseInt(monto) * 2;
	
	var resultadocantidad = cantidadtotal.concat(multiplicadorDias);
	
	var diasSeleccionado = [];
	var nuevo = "";
	
	for (var i=0; i<multiplicadorDias +1; i++) {
		nuevo  = editar_fecha(valNew2, "+"+i, "d");
		nuevo = nuevo.split('-');
		nuevo = nuevo[2]+"-"+nuevo[1]+"-"+nuevo[0];
	    
			diasSeleccionado.push(nuevo);
	}

	

	
	var arrayDias = [];
	for(var i = 0;i < diasSeleccionado.length; i++){
		var json = {
			habil: 1,
			fecha: diasSeleccionado[i]
		}
		arrayDias.push(json);
	}
	
	 
	 var days = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"];
	$.each(arrayDias, function(k,v){
	   var fechaobtenida = v.fecha;
	   var d = new Date(fechaobtenida);
	  var quediaes =  days[d.getDay()];
	  if(quediaes == "Sabado" ){
		  v.habil = 0;
	  }else if(quediaes == "Domingo"){
		  v.habil = 0;
	  }
	})
	
	var er = parseInt(monto);
	var ej = 0;
	var fecha = "";
	$.each(arrayDias, function(k,v){
		// si lo encuentra le agrega el 0
		if(feriadosArray.indexOf(v.fecha) != -1){
			v.habil = 0;
			
		
		// si no lo encuentra agrega 1
	
			
		}else{
			   if(v.habil == 0){}else{ej++;}
			}
		
		if(er == ej){
			fecha = v.fecha;
			return false;
		}
	})
	
    diashabiles_trab = arrayDias;
	
	ultima_fecha_retornada = fecha;
	var nuevo4 = fecha.split('-');

	var nuevo5 = nuevo4[2] + "/" + nuevo4[1] + "/" + nuevo4[0];
	$("#fechaFinP").val(nuevo5);

	$("#fechaFinP").datepicker('destroy').datepicker({
		dateFormat : 'dd/mm/yy',
		setdate : new Date(nuevo5),
		firstDay: 1,
		changeMonth: true,
        changeYear: true,
        changeMonth: true,
		  beforeShowDay: function (date) {
            var datestring = jQuery.datepicker.formatDate('yy-mm-dd', date);
            if (feriadosGlobal.indexOf(datestring) != -1) {
                return [true, "nonbusiness"];
            } 
            else {
                return [true];
            }                   
        }

	});
});

$('#diascorridosPSG').change(function(e) {

	monto = $("#diascorridosPSG").val();
	
	if(monto == 0){
		alerta("Debe Ingresar un Día Mayor 0");
		return;
	}

	var fechaIC1 = $("#fechaInicioPSG").val();

	var fechaIC2 = fechaIC1.split("/");
	var fechaIC = (fechaIC2[2] + "/" + fechaIC2[1] + "/" + fechaIC2[0]);

	if (fechaIC1 == '') {
		alerta("Debe Seleccionar una Fecha Inicio");
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

	var nuevo5 = nuevo4[0] + "/" + nuevo4[1] + "/" + nuevo4[1];

	$("#fechaFinPSG").val(nuevo5);

	$("#fechaFinPSG").datepicker('destroy').datepicker({
		dateFormat : 'dd/mm/yy',
		setdate : new Date(nuevo5),
		firstDay: 1,
		changeMonth: true,
        changeYear: true

	});
	
	$('#checkPermisoSG').prop('checked', true);
});
// seccion falta

$('#fechaFinLM').change(function(e) {
	var fechaI1 = $("#fechaInicioLM").val();
	var fechaT1 = $("#fechaFinLM").val();

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
		
		var from = $("#fechaInicioLM").val();
		from = from.split("/");
		from = from[2]+"-"+from[1]+"-"+from[0];
		
		var to = $("#fechaFinLM").val();
		to = to.split("/");
		to = to[2]+"-"+to[1]+"-"+to[0];
		
		
		if ($('#checkLicenciaMutual').is(':checked')) 
		{
			
			var contadorferiados = 0;
			for (var i = 0; i < feriadosArray.length; i++) {
				
			     if ( Date.parse(feriadosArray[i]) >= Date.parse(from)) 
			     {     
	               if(Date.parse(feriadosArray[i]) <= Date.parse(to)){
				   
				    contadorferiados ++
			      
				   }			 
			       
			     }
					
				}
			
			$("#diascorridosLM").val(totaldiasvalor - contadorferiados);
			
		}
	else
		{
		var start = $.datepicker.parseDate('dd/mm/yy', fechaI1);
		var end = $.datepicker.parseDate('dd/mm/yy', fechaT1);

		var startDate = new Date(start);
		var endDate = new Date(end);
		var totalSundays = 0;
		
		var from = $("#fechaInicioLM").val();
		from = from.split("/");
		from = from[2]+"-"+from[1]+"-"+from[0];
		
		var to = $("#fechaFinLM").val();
		to = to.split("/");
		to = to[2]+"-"+to[1]+"-"+to[0];

		for (var i = startDate; i <= endDate; ){
		    if (i.getDay() == 0){
		        totalSundays++;
		    }
		    i.setTime(i.getTime() + 1000*60*60*24);
		}
     
		var totalFeriados = totalSundays * 2;
		
		var contadorferiados2 = 0;
		
		for (var i = 0; i < feriadosArray.length; i++) {
			
		     if ( Date.parse(feriadosArray[i]) >= Date.parse(from)) 
		     {     
              if(Date.parse(feriadosArray[i]) <= Date.parse(to)){
			   
			    contadorferiados2 ++
		      
			   }			 
		       
		     }
				
			}
		$("#diascorridosLM").val((totaldiasvalor - contadorferiados2)- totalFeriados);
		
		}
	}
});

$('#fechaInicioLM').change(function(e) {

	var fechaI1 = $("#fechaInicioLM").val();
	var fechaT1 = $("#fechaFinLM").val();

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

		var from = $("#fechaInicioLM").val();
		from = from.split("/");
		from = from[2]+"-"+from[1]+"-"+from[0];
		
		var to = $("#fechaFinLM").val();
		to = to.split("/");
		to = to[2]+"-"+to[1]+"-"+to[0];
		
		if ($('#checkLicenciaMutual').is(':checked')) 
		{
			var contadorferiados = 0;
			for (var i = 0; i < feriadosArray.length; i++) {
				
			     if ( Date.parse(feriadosArray[i]) >= Date.parse(from)) 
			     {     
	               if(Date.parse(feriadosArray[i]) <= Date.parse(to)){
				   
				    contadorferiados ++
			      
				   }			 
			       
			     }
					
				}
			
			$("#diascorridosLM").val(totaldiasvalor);
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
		
		var contadorferiados = 0;
		for (var i = 0; i < feriadosArray.length; i++) {
			
		     if ( Date.parse(feriadosArray[i]) >= Date.parse(from)) 
		     {     
               if(Date.parse(feriadosArray[i]) <= Date.parse(to)){
			   
			    contadorferiados ++
		      
			   }			 
		       
		     }
				
			}

		var totalFeriados = totalSundays * 2;
		$("#diascorridosLM").val((totaldiasvalor - contadorferiados)- totalFeriados);
		
		}
	}
});

$('#diascorridosLM').change(function(e) {

	monto = $("#diascorridosLM").val();
	
	if(monto == 0){
		alerta("Debe Ingresar un Día Mayor 0");
		return;
	}

	var fechaIC1 = $("#fechaInicioLM").val();

	var fechaIC2 = fechaIC1.split("/");
	var fechaIC = (fechaIC2[2] + "/" + fechaIC2[1] + "/" + fechaIC2[0]);

	if (fechaIC1 == '') {
		alerta("Debe Seleccionar una Fecha Inicio");
		$("#diascorridosLM").val("");
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

	$("#fechaFinLM").val(nuevo5);

	$("#fechaFinLM").datepicker('destroy').datepicker({
		dateFormat : 'dd/mm/yy',
		setdate : new Date(nuevo5),
	    firstDay: 1,
	    changeMonth: true,
        changeYear: true

	});
	
	$('#checkLicenciaMutual').prop('checked', true);
});



function addForm4() {


	
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
	    
	var codigoTrab = $("#CodigoTra").val();
	var form_data = new FormData();

	var d = new Date();

	var month = d.getMonth() + 1;
	var day = d.getDate();
	var year = d.getFullYear();
	var min = d.getMinutes();
	var hour = d.getHours()
	var seconds = d.getSeconds();

	
    var ruta;
    
    if ($('#9').val() === '') {
    	
    }else{
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
    }

    if ($('#9').val() === '') { 
    	
    }else{
	var nombreArchivo = $("#9").prop("files")[0].name;
	var strArray = nombreArchivo.split(".");
    }
	
	if ($('#9').val() === '') { 
		var ruta2 = "";
	}
	else{
	var ruta2 = (ruta + strArray[0] + codigoTrab + "-" + year + "-" + month
			+ "-" + day + "-" + hour + "-" + min + "-" + seconds + "." + strArray[1]);
    }


	if ($('#CodigoTra').val() === '') {
		alerta("Debe Seleccionar un Trabajador");
		$("#CodigoTra").focus();
		return;
	} else if ($('#Sociedad').val() === '') {
		alerta("Debe Seleccionar una Empresa");
		$("#Sociedad").focus();
		return;
	} else if ($('#fechaInicioPSG').val() === '') {
		alerta("Debe Seleccionar una fecha de Inicio");
		$("#fechaInicioPSG").focus();
		return;
	} else if ($('#fechaFinPSG').val() === 'NaN/NaN/NaN') {
		alerta("Debe Seleccionar una fecha de Fin");
		$("#fechaFinPSG").focus();
		return;
	} else if ($('#fechaFinPSG').val() === '') {
		alerta("Debe Seleccionar una fecha de Fin");
		$("#fechaFinPSG").focus();
		return;
	}

	var numeroinput = 9;
	if ($('#9').val() === '') {

	} else {
		uploadPermisoSinGoce(numeroinput);
	}

	permiso = [];

	var codigo_traba = $("#CodigoTra").val();
	var sociedadP = $("#Sociedad").val();

	var fechaI1 = $("#fechaInicioPSG").val();
	var fechaT1 = $("#fechaFinPSG").val();

	var fechaI2 = fechaI1.split("/");
	var fecha_inicio = (fechaI2[2] + "/" + fechaI2[1] + "/" + fechaI2[0]);

	var fechaT2 = fechaT1.split("/");
	var fecha_fin = (fechaT2[2] + "/" + fechaT2[1] + "/" + fechaT2[0]);

	
	var dias_corridos = $("#diascorridosPSG").val();
	var accionT = $("#accion").val();

	var fecha_inicio2 = fecha_inicio.replace("/", "-");
	var fecha_inicio3 = fecha_inicio2.replace("/", "-");

	var fecha_fin2 = fecha_fin.replace("/", "-");
	var fecha_fin3 = fecha_fin2.replace("/", "-");

	var checkpermiso = 0;
	if ($('#checkPermisoSG').is(':checked')) {
		checkpermiso = 1;
	}
	 var id_contrato = $("#idContrato").val();
	 
	 
	var json2 = {

		codigo_trabajador : codigo_traba,
		accion : accionT,
		id_empresa : sociedadP,
		fecha_desde : fecha_inicio3,
		fecha_hasta : fecha_fin3,
		dias_corridos : dias_corridos,
		incluye_feriados : checkpermiso,
		ruta_archivo : ruta2,
		idContrato : id_contrato

	}

	permiso.push(json2);
	$("#loading").show();
	$.ajax({
		url : "/simpleWeb/json/work/insertTrabajadorPermisoSinGoceDeSueldo/",
		type : "PUT",
		data : JSON.stringify(permiso),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
			$("#loading").show();

		},
		success : function(data, textStatus, jqXHR) {

			$('#fechaInicioPSG').val("");
			$('#fechaFinPSG').val("");
			
			$('#diascorridosPSG').val("");
			$('#9').val("");
			$("#checkPermisoSG").prop("checked", false);

			alerta("Enviado");
			
		
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
			
			
			var contadorferiados = 0;
			var total = 0;
			
			var from = $("#fechaInicio").val();
			from = from.split("/");
			from = from[2]+"-"+from[1]+"-"+from[0];
			
			var to = $("#fechaFin").val();
			to = to.split("/");
			to = to[2]+"-"+to[1]+"-"+to[0];
			
			for (var i = 0; i < feriadosArray.length; i++) {
				
			     if ( Date.parse(feriadosArray[i]) >= Date.parse(from)) 
			     {     
	               if(Date.parse(feriadosArray[i]) <= Date.parse(to)){
				   
				    contadorferiados ++
			      
				   }			 
			       
			     }
					
				}

		
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
			
			
			var contadorferiados = 0;
			
			
			var from = $("#fechaInicio").val();
			from = from.split("/");
			from = from[2]+"-"+from[1]+"-"+from[0];
			
			var to = $("#fechaFin").val();
			to = to.split("/");
			to = to[2]+"-"+to[1]+"-"+to[0];
			
			for (var i = 0; i < feriadosArray.length; i++) {
				
			     if ( Date.parse(feriadosArray[i]) >= Date.parse(from)) 
			     {     
	               if(Date.parse(feriadosArray[i]) <= Date.parse(to)){
				   
				    contadorferiados ++
			      
				   }			 
			       
			     }
					
				}

			$("#diascorridosL").val((totaldiasvalor - contadorferiados) - totalFeriados);
		}
		
	}
	
	
	
	
});

$('#checkLicenciaMutual').change(function(e) {
	
	
	
	if ($('#checkLicenciaMutual').is(':checked')) {
		
		var fechaI1 = $("#fechaInicioLM").val();
		var fechaT1 = $("#fechaFinLM").val();

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
			
			var contadorferiados = 0;
			
			var from = $("#fechaInicioLM").val();
			from = from.split("/");
			from = from[2]+"-"+from[1]+"-"+from[0];
			
			var to = $("#fechaFinLM").val();
			to = to.split("/");
			to = to[2]+"-"+to[1]+"-"+to[0];
			
			for (var i = 0; i < feriadosArray.length; i++) {
				
			     if ( Date.parse(feriadosArray[i]) >= Date.parse(from)) 
			     {     
	               if(Date.parse(feriadosArray[i]) <= Date.parse(to)){
				   
				    contadorferiados ++
			      
				   }			 
			       
			     }
					
				}
		
			$("#diascorridosLM").val(totaldiasvalor);
		}
		
	}else{
		var fechaI1 = $("#fechaInicioLM").val();
		var fechaT1 = $("#fechaFinLM").val();
		
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
		
		var contadorferiados = 0;
		
		
		var from = $("#fechaInicioLM").val();
		from = from.split("/");
		from = from[2]+"-"+from[1]+"-"+from[0];
		
		var to = $("#fechaFinLM").val();
		to = to.split("/");
		to = to[2]+"-"+to[1]+"-"+to[0];
		
		for (var i = 0; i < feriadosArray.length; i++) {
			
		     if ( Date.parse(feriadosArray[i]) >= Date.parse(from)) 
		     {     
               if(Date.parse(feriadosArray[i]) <= Date.parse(to)){
			   
			    contadorferiados ++
		      
			   }			 
		       
		     }
				
			}
		$("#diascorridosLM").val((totaldiasvalor - contadorferiados) - totalFeriados);
		
		
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
			
			var contadorferiados = 0;
			var from = $("#fechaInicioPSG").val();
			from = from.split("/");
			from = from[2]+"-"+from[1]+"-"+from[0];
			
			var to = $("#fechaFinPSG").val();
			to = to.split("/");
			to = to[2]+"-"+to[1]+"-"+to[0];
			
			for (var i = 0; i < feriadosArray.length; i++) {
				
			     if ( Date.parse(feriadosArray[i]) >= Date.parse(from)) 
			     {     
	               if(Date.parse(feriadosArray[i]) <= Date.parse(to)){
				   
				    contadorferiados ++
			      
				   }			 
			       
			     }
					
				}

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
		
		var contadorferiados = 0;
		
		
		var from = $("#fechaInicio").val();
		from = from.split("/");
		from = from[2]+"-"+from[1]+"-"+from[0];
		
		var to = $("#fechaFin").val();
		to = to.split("/");
		to = to[2]+"-"+to[1]+"-"+to[0];
		
		for (var i = 0; i < feriadosArray.length; i++) {
			
		     if ( Date.parse(feriadosArray[i]) >= Date.parse(from)) 
		     {     
               if(Date.parse(feriadosArray[i]) <= Date.parse(to)){
			   
			    contadorferiados ++
		      
			   }			 
		       
		     }
				
			}
		$("#diascorridosPSG").val((totaldiasvalor - contadorferiados) - totalFeriados);
	
		
	}
	
});

var huerto_trabajador = "";
var id_trabajador = "";
var esAgro;
function buscarHuertoTrabaj(){
	var codt = $('#CodigoTra').val();
	$("#loading").show();
	$.getJSON("/simpleWeb/json/work/BuscarHuertoTrabajador&id/" + codt,
			function(data) {
		$.each(data, function(k, v) {
			huerto_trabajador = v.idhuerto;
			id_trabajador = v.id;
			esAgro = v.agro;
			if(esAgro == 0){
				$("#btnChange").hide();
			}else{
				$("#btnChange").show();
			}
		})

			}).done(function() {
		$("#loading").hide();
	}).fail(function(jqXHR, textStatus, errorThrown) {

		alerta(errorThrown);
		$("#loading").hide();
	})
	
}

function buscarIdContrato() {

	$("#idContrato").empty();
	var codt = $('#CodigoTra').val();
	$("#loading").show();
	$
			.getJSON(
					"/simpleWeb/json/work/LoadSelectIdContrato/" + codt,
					function(data) {

						cantidadData = data.length;

						if (cantidadData > 1) {
							$("#idContrato").prop("disabled", false);
							var SelectIdContrato = "";
							SelectIdContrato += "<option value='-1'>Seleccione..</option>";

							$("#idContrato").append(SelectIdContrato);
							$.each(data, function(k, v) {

								var SelectIdContrato = "";
								SelectIdContrato += "<option value=" + v.id
										+ ">" + v.fecha_inicio_actividad
										+ "</option>";

								$("#idContrato").append(SelectIdContrato);

							});
						} else if (cantidadData == 1) {
							$("#idContrato").prop("disabled", true);

							$.each(data, function(k, v) {

								var SelectIdContrato = "";
								SelectIdContrato += "<option value=" + v.id
										+ ">" + v.fecha_inicio_actividad
										+ "</option>";
								$("#idContrato").append(SelectIdContrato);

							});
						} else if (cantidadData == 0) {
							$("#idContrato").prop("disabled", true);
						}

					}).done(function() {
				$("#loading").hide();
			}).fail(function(jqXHR, textStatus, errorThrown) {

				alerta(errorThrown);
				$("#loading").hide();
			})
}

function ListaPermisosLegales() {
	$("#loading").show();
	$.getJSON(
			"/simpleWeb/json/work/ListaPermisosLegales/",
			function(data) {

				$.each(data, function(k, v) {
					var SelectTipoLicencia = "";
					SelectTipoLicencia += "<option value=" + v.id + ">"
							+ v.descripcion + "</option>";

					$("#permisolegales").append(SelectTipoLicencia);
				})
			}).done(function() {
		$("#loading").hide();

	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})
}

function ListaPermisosConvencionales() {
	$("#loading").show();
	$.getJSON(
			"/simpleWeb/json/work/ListaPermisosConvencionales/",
			function(data) {

				$.each(data, function(k, v) {
					var SelectTipoLicencia = "";
					SelectTipoLicencia += "<option value=" + v.id + ">"
							+ v.descripcion + "</option>";

					$("#permisoConven").append(SelectTipoLicencia);
				})
			}).done(function() {
		$("#loading").hide();

	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})
}

$('#checkPlegales').change(function(e) {
	$( "#permisolegales" ).prop( "disabled", false );
	$( "#permisoConven" ).prop( "disabled", true );
	$('#checkPconvenc').filter(':checkbox').prop('checked',false);
	$('#permisoConven').val("");
});
$('#checkPconvenc').change(function(e) {
	$( "#permisoConven" ).prop( "disabled", false );
	$( "#permisolegales" ).prop( "disabled", true );
	$('#checkPlegales').filter(':checkbox').prop('checked',false);
	$('#permisolegales').val("");
	
});

function changeBaseBtn(){
	var basePiso = $("#basePiso").val();
	var baseSueldo = "";
	baseSueldo +=	"<div class='table-responsive'>";
	baseSueldo +=		"<table class='table table-bordered table-hover table-striped table-condensed' id='tbl_Datos_Comunes'>";
	baseSueldo +=			"<thead>";
	baseSueldo +=				"<tr>";
	baseSueldo +=					"<th>#</th>";
	baseSueldo +=					"<th>Tipo Trabajo</th>";
	baseSueldo +=					"<th>Sueldo Mensual</th>";
	baseSueldo +=				"</tr>";
	baseSueldo +=			"</thead>";
	baseSueldo +=			"<body id='bodyValores'>"+loadTipos_Pago()+"</body>";
	baseSueldo +=		"</table>";
	baseSueldo +=	'</div>';
	baseSueldo += 	"<div style='text-align: center;'>";
	baseSueldo += 		"<a id='confirmBase' class='btn green-dark submit-modal' onclick='cambiarPisoDia()'>Aceptar</a>";
	baseSueldo += 		"<a class='btn red' onclick='closeModal();'>Cancelar</a>";
	baseSueldo += 	"</div>";
	popUp("Base Sueldo", baseSueldo, true, "450px", true);
	format();
	$(".selectBase").click(function(){
		if($(this).val().split(", ")[1] != "otro"){
			$("#otro").val("");
			$("#otro").removeClass("required-modal");
			$("#otro").attr("disabled", true);
			validateModal();
		}else{
			$("#otro").attr("disabled", false);
			$("#otro").addClass("required-modal");
		}
	})
}
var cargos;
var selected;
var monto;
function loadTipos_Pago(){
	
	
	var cargosAux = [];
	var tBody = "";
	$.ajax({
		url : "/simpleWeb/json/AGRO/GETSUELDOSCARGO/"+huerto_trabajador+"",
		type : "GET",
		dataType : 'json',
		async : false,
		success : function(data) {
			$.each(data, function(k,v){
				cargosAux.push(v);
			})
		}
	})
	var c = 0;
	
	cargos = cargosAux;
	$.each(cargosAux, function(k,v){
		if(selected == v.cargo){
			tBody += "<tr>";
			tBody += 	"<td><div class='form-check'><input class='form-check-input selectBase' type='radio' checked value='"+JSON.stringify(v)+"' id='baseSelect' name='optvalor'><label class='form-check-label' for='baseSelect'></label></div></td>";
			tBody += 	"<td>"+v.cargo.bold()+"</td>";
			tBody += 	"<td>$ "+formatNumber(JSON.stringify(v.sueldo)).fontcolor("red")+"</td>";
			tBody += "</tr>";
		}else{
			tBody += "<tr>";
			tBody += 	"<td><div class='form-check'><input class='form-check-input selectBase' type='radio' value='"+JSON.stringify(v)+"" +
					"' id='baseSelect' name='optvalor'><label class='form-check-label' for='baseSelect'></label></div></td>";
			tBody += 	"<td>"+v.cargo.bold()+"</td>";
			tBody += 	"<td>$ "+formatNumber(JSON.stringify(v.sueldo)).fontcolor("red")+"</td>";
			tBody += "</tr>";
		}
		c++;
	})
	var otro = "otro";
	var check = "";
	if(selected == "otro"){
		check = "checked";
	}
	tBody += "<tr id='tr_otro'>";
	tBody += 	"<td><div class='form-check'><input class='form-check-input selectBase' "+check+" type='radio' value='"+JSON.stringify(cargos[cargos.length-1])+"' id='baseSelect' name='optvalor'><label class='form-check-label' for='baseSelect'></label></div></td>";
	tBody += 	"<td>"+otro.bold()+"</td>";
	tBody += 	"<td><div class='input-icon input-icon-sm'><i class='fa fa-usd'></i><input type='text' class='form-control input-sm number' id='otro'></div></td>";
	tBody += "</tr>";
	return tBody;
}



function cambiarPisoDia(){
	
	
	$(".selectBase").each(function(){
		if($(this)[0].checked){
			var v = JSON.parse($(this).val());
			cargo = v.id;
			cargo_trabajador = cargo;
			sueldo_base = v.sueldo;
			valorDiaTrab = sueldo_base; 
			if(sueldo_base*1 == 0){
				sueldo_base = formatNumberDB($("#otro").val());
				valorDiaTrab = sueldo_base;
				monto = formatNumberDB($("#otro").val());
			}
			
		
		
			
		}
	})
	
	
	
	closeModal();
};
