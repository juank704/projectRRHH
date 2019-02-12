//Colocar Permisos
var sociedadPrivilege = new Set();
var huertoPrivilege = new Array();
//Obtener Sociedades y Huertos que tiene acceso
$.each(SESION.campo, function(key, value){
	sociedadPrivilege.add(value.idSociedad);
	huertoPrivilege.push(value.campo);
});

$(document).ready(function() {
	$.fn.dataTable.ext.errMode = 'none';
	
	ListaSociedad();
	
	var currentTime = new Date();	
    var startDateFrom = new Date(currentTime.getFullYear(), currentTime.getMonth() -2, 1);
    

				$("#peridoS").datepicker({
				dateFormat : 'mm-yy',
				minDate : startDateFrom,
				firstDay : 1,
				changeMonth : true,
				changeYear : true,

			});
});

function Enviar(){

	    var valueSociedad = $("#Sociedad").val();
	    var fechaI = $("#fechaInicio").val();
	    var fechaT = $("#fechaTermino").val();
	    
	    
	    var x = fechaI.split("-");
	    var z = fechaT.split("-");
	    fecha1 = x[1] + "-" + x[0] + "-" + x[2];
	    fecha2 = z[1] + "-" + z[0] + "-" + z[2];
	    
	    
	    //Comparamos las fechas
	    if (Date.parse(fecha1) > Date.parse(fecha2)){
	    	alerta("Fecha Término no Debe Ser Inferion A Fecha Inicio");
	        return;
	    }
	    
	    if(valueSociedad == 1){
	    	alerta("Debe Seleccionar una Empresa");$("#Sociedad").focus();return;
	    }else if(fechaI == ""){
	    	alerta("Debe Seleccionar una Fecha de Inicio");$("#fechaInicio").focus();return;
	    }else if(fechaT == ""){
	    	alerta("Debe Seleccionar una Fecha de Término");$("#fechaTermino").focus();return;
	    }
	    
	    var tipo_division = $("#tipodivisionB").val();
		
	    if(tipo_division === "-1"){tipo_division = null;}
	    else if(tipo_division == ''){
			tipo_division = null;
		}
		else{
			 tipo_division = $("#tipodivisionB").val();
		}
	    
	    var fechaISplit = formatFecha(fechaI);

	    
	    var fechaTSplit = formatFecha(fechaT);
	    
	
	    
		$("#loading").show();
		$.ajax({
			url : "/simpleWeb/json/work/generateAvisoInspeccionTrabajo/"+ valueSociedad + "," +fechaISplit + "," + fechaTSplit +","+ tipo_division ,
			type : "PUT",
			dataType : "text",
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept","application/json");
				xhr.setRequestHeader("Content-Type","application/json");
			},
			success : function(data, textStatus, jqXHR) {
				
				
         		console.log(data);
				var myJSON = JSON.stringify(data);
				
				if(data == "NO DATA"){
					alerta("No se Encontrarón Registros con los Parametros Seleccionados");
				}else{
//         		var myJSON = data;
				window.open("/simpleWeb/json/work/descargarDocumetoAvisoTrabajo/?FILE="+myJSON);
				}
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

$('#peridoS').change(function(e) {
	$("#fechaInicio").prop("disabled", false);
	$("#fechaTermino").prop("disabled", false);
	$("#fechaInicio").val("");
	$("#fechaTermino").val("");
	
	var periodo = $("#peridoS").val();
	periodo = periodo.split("-");
	
	$("#fechaInicio").datepicker("destroy");
	$("#fechaTermino").datepicker("destroy");
	
	$("#fechaInicio").datepicker({
		dateFormat : 'dd-mm-yy',
		minDate : new Date(periodo[1], periodo[0] -1, 01),
		firstDay : 1,
		changeMonth : false,
		changeYear : false,
		

	});
	
	$("#fechaTermino").datepicker({
		dateFormat : 'dd-mm-yy',
		minDate : new Date(periodo[1], periodo[0] -1, 01),
		firstDay : 1,
		changeMonth : false,
		changeYear : false,
		

	});
	
	});

$('#Sociedad').change(function(e) {
	$("#tipodivisionB").empty();
	var valorSociedad = $('#Sociedad').val();
	if (valorSociedad === '') {
		alerta("Campo Empresa no Puede Estar vacio");
		return;
	}
	
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