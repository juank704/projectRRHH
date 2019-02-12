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
	
				$("#peridoS").datepicker({
				dateFormat : 'mm-yy',
				firstDay : 1,
				changeMonth : true,
				changeYear : true,

			});
});

function Enviar(){

	    var valueSociedad = $("#Sociedad").val();
	    var perioEnviar = $("#peridoS").val();
	    
	    if(valueSociedad == 1){
	    	alerta("Debe Seleccionar una Empresa");$("#Sociedad").focus();return;
	    } 
	    
	    if(perioEnviar == ""){
	    	alerta("Debe Seleccionar un Periodo");$("#peridoS").focus();return;
	    }else{
	    	var periodoSplit = perioEnviar.split("-");
	    	perioEnviar = periodoSplit[1]+"-"+periodoSplit[0];
	    }
	    
	    
		$("#loading").show();
		$.ajax({
			url : "/simpleWeb/json/work/generateExcelSinLiquidacion/"+ valueSociedad + "," +perioEnviar,
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
					alerta("Todos Los Trabajadores Se Encuentran Con Liquidación");
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

