//Colocar Permisos
var sociedadPrivilege = new Set();
var huertoPrivilege = new Array();
//Obtener Sociedades y Huertos que tiene acceso
$.each(SESION.campo, function(key, value){
	sociedadPrivilege.add(value.idSociedad);
	huertoPrivilege.push(value.campo);
});
var rolPrivado;
$(document).ready(function() {
	$("#loading").hide();
	$('.bootstrap-timepicker-widget').hide();
	

				 
			if (SESION.rolPrivado == 1) {

				rolPrivado = "1";

			} else {

				rolPrivado = "0" ;

			}
	

//	$("#horas").timepicker({
//		 timeFormat: 'HH:mm',

	$("#horas").change(function(e){
	   
	   var horas = $("#horas").val();
	   if(horas.length == 1){
	   $("#horas").val("0"+horas);
	   
	   }
	  
	   if($("#horas").val() > 190){
		   
		  alerta("Las Horas no Puede Ser Superior a 190"); 
		  $("#horas").val("00");
	   }
	});
	
	$("#minutos").change(function(e){
		   
		   var minutos = $("#minutos").val();
		    if(minutos > 59){
			   
			  alerta("Los Minutos no Puede Ser Superior a 59"); 
			  $("#minutos").val("00");
		   }
		});
	
	
	
	
	
	
	
ListaSociedad();
var currentTime = new Date();	
var startDateFrom = new Date(currentTime.getFullYear(), currentTime.getMonth() -1, 1);

$('#fechaFinLM').datepicker({
	dateFormat : 'dd-mm-yy',
	minDate : startDateFrom,
	firstDay: 1,
	changeMonth: true,
    changeYear: true
})

$("#periodo").datepicker({
	dateFormat : 'mm-yy',
	firstDay: 1,
	changeMonth : true,
	changeYear : true

});





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
		else if(grupo == ""){
			grupo = null;
		}else{
			 grupo = $("#listagrupoB").val();
		}
	
	console.log("/simpleWeb/json/work/allTrabajadoresCodNom/"+ valueSociedad +","+ tipo_division +","+ tipo_subdivision+","+grupo+","+rolPrivado);
	$("#loading").show();
	$.getJSON(
			"/simpleWeb/json/work/allTrabajadoresCodNom/"+ valueSociedad +","+ tipo_division +","+ tipo_subdivision+","+grupo+","+rolPrivado,
			function(data) {
           
				$.each(data, function(k, v) {

					var SelectConcepto = "";
					SelectConcepto += "<option value=''>Buscar</option>";
					
					
					SelectConcepto += "<option value=" + v.codigo + ">"
					+ v.codigo + " | " + v.ap_paterno.toUpperCase()  + " "+ v.ap_materno.toUpperCase()+" "+ v.nombre.toUpperCase() +"</option>";
			$("#CodigoTra").append(SelectConcepto);

				});

			}).done(function() {
		$("#loading").hide();

	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})
}

$("#CodigoTra").change(function(event){
	
	if($("#CodigoTra").val() == ""){
		
	}else{
		buscarIdContrato();
		
	}
	
});
var agroono = 0;
function buscarIdContrato(){
	
	
	$("#idContrato").empty();
	var codt = $('#CodigoTra').val();
	$("#loading").show();
	$.getJSON(
			"/simpleWeb/json/work/LoadSelectIdContrato/" + codt,
			function(data) {
				
             cantidadData = data.length;
             
             if(cantidadData > 1){
            	 $("#idContrato").prop("disabled", false);
            	 var SelectIdContrato = "";
					SelectIdContrato += "<option value='-1'>Seleccione..</option>";

					$("#idContrato").append(SelectIdContrato);
					$.each(data, function(k, v) {
						
					agroono = v.agro;
                    console.log("es agro o no"+ v.agro);
					var SelectIdContrato = "";
					SelectIdContrato += "<option value=" + v.id+ ">"
							+ v.fecha_inicio_actividad + "</option>";

					$("#idContrato").append(SelectIdContrato);

				});
             }else if(cantidadData == 1){
            	 $("#idContrato").prop("disabled", true);
				
					$.each(data, function(k, v) {
						agroono = v.agro;
	                    console.log("es agro o no"+ v.agro);
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
	
	$('input[name="horas"]').focus()
}

function Enviar(){
	
	datosEnviar = [];
	var sociedad = $("#Sociedad").val();
	var codigo = $("#CodigoTra").val();
	var id_contrato =  $("#idContrato").val();
	var concepto =  $("#concepto").val();
	var periodo =  $("#periodo").val();
	var fecha =  $("#fechaFinLM").val();
	var hora =  $("#horas").val();
	var mint =  $("#minutos").val();
	
	
	 if($("#horas").val() > 190){
	 		   
	 		  alerta("Las Horas no Puede Ser Superior a 190"); 
	 		  $("#horas").val("00");
	 		 return;
	 	   }
	 	   
	 	   
	 		
	 		if($("#minutos").val() > 59){
	 			   
	 			  alerta("Los Minutos no Puede Ser Superior a 59"); 
	 			  $("#minutos").val("00");
	 			  return;
	 		   }
	
	
	if(sociedad == -1){
		alerta("Debe Seleccionar una Empresa"); $("#Sociedad").focus();return;
	}else if(codigo == null || codigo == ""){
		alerta("Debe Seleccionar un Trabajador"); $("#CodigoTra").focus();
	}else if(id_contrato == -1){
		alerta("Debe Seleccionar una Fecha Contrato"); $("#idContrato").focus();
	}else if(concepto == -1){
		alerta("Debe Seleccionar un Concepto"); $("#concepto").focus();
	}else if(periodo == ""){
		alerta("Debe Seleccionar un Periodo"); $("#periodo").focus();
	}else if(fecha == ""){
		alerta("Debe Seleccionar una Fecha"); $("#fechaFinLM").focus();
	}else if(hora == ""){
		alerta("Debe Ingresar una Hora"); $("#horas").focus();
	}else if(mint == ""){
		alerta("Debe Ingresar Minutos"); $("#minutos").focus();
	}else{
		var periodo_split =  $("#periodo").val().split('-');
		var periodofinal = periodo_split[1]+""+periodo_split[0];
		
		
		
		var horaformat =  $("#horas").val();
		var minutosformat =  $("#minutos").val();
		
		      var time = horaformat+":"+minutosformat;
			  var hoursMinutes = time.split(/[.:]/);
			  var hours = parseInt(hoursMinutes[0], 10);
			  var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
			  var  horafinal = hours + minutes / 60 ;
			  
		var ftU = fecha.split('-');
		var ftU2 = ftU[2] +"-"+ ftU[1] +"-"+ ftU[0];
		
		if(horafinal > 9 && agroono == 1)
		{
			alerta("Trabajador Agro no puede superar las 9 Horas");
			return;
		}
		
		var json2 = {
		
				empresa : sociedad,
				cod_trabajador : codigo,
				id_contrato : id_contrato,
				concepto : concepto,
				periodo : periodofinal,
				fecha : ftU2,
				hora : horafinal

			}
		
		datosEnviar.push(json2);
		
		$("#loading").show();
		
		$.ajax({
			url : "/simpleWeb/json/work/insertHoraAsistencia/"+agroono,
			type : "PUT",
			dataType : "text",
			data : JSON.stringify(datosEnviar),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
				$("#loading").show();

			},
			success : function(data, textStatus, jqXHR) {
					
				alerta(data);
				$("#CodigoTra").val("").trigger("change");
				$("#idContrato").val("");
				$( "#idContrato" ).prop( "disabled", true );
				

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
		
	}
	$('#CodigoTra').select2('focus');
	$('#CodigoTra').select2('open');
}

$("#periodo").change(function(){
	
	var periodo = $("#periodo").val();
	
	var periodoSplit1 = periodo.split('-');
	var periodoSplit = periodoSplit1[1]+"-"+periodoSplit1[0];
	
	var periodosplit = periodoSplit.split('-');
    var periodosplit2 = periodosplit[1]+"-"+periodosplit[0];
    
    var format = "01-"+periodosplit2;
    
    var fechamindate = periodoSplit.split('-');
    var fechamindate2 = fechamindate[1]+"-01-"+fechamindate[0];
    
    var fechamax1 = fechamindate2.split('-');
    
    
    var fechamax = fechamax1[2]+"-"+fechamax1[0]+"-"+fechamax1[1];
    
    
  
    let fechaInicio = fechamax;
   
	  let arrayFecha = fechaInicio.split('-');
	  let fechaUltimo = new Date(arrayFecha[0], arrayFecha[1]) 
	  fechaUltimo.setDate(fechaUltimo.getDate() - 1)

	  var ultimo = fechaUltimo.toLocaleString()
	
	
	var resultado2 = ultimo.split('/');
	var resul2 = resultado2[2];
	var res = resul2.split(' ');
	
	var mes = resultado2[1];
	if(mes.length == 1){
		
		mes = "0"+mes;
	}
	
	var resultado3 = mes +"-"+ resultado2[0] +"-"+ res[0];
	
	

	$("#fechaFinLM").datepicker('destroy').datepicker({
		dateFormat : 'dd-mm-yy',
		minDate : new Date(fechamindate2),
		maxDate : new Date(resultado3)

	});
});