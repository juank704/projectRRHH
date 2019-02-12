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
				
				var table = $('#tbl_Info').DataTable({
					
					         } 		
			);		
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





function insertUpdate(empresaL,huertoL,periodoL,workafroL,UD){
	


    var valueSociedad = $("#Sociedad").val();
    var periodo = $("#peridoS").val();
    var huerto = $("#tipodivisionB").val();
    

    if(valueSociedad == -1){
    	alerta("Debe Seleccionar una Empresa");$("#Sociedad").focus();return;
    }else if(periodo == ""){
    	alerta("Debe Seleccionar un Periodo");$("#peridoS").focus();return;
    }else if(huerto == "" || huerto == "-1"){
    	alerta("Debe Seleccionar un Huerto");$("#tipodivisionB").focus();return;
    }
    
 
    
    var x = periodo.split("-");

    var periodoSplit = x[1] + x[0] ;
    
    
    
    $("#loading").show();
	
	$.ajax({
		url : "/simpleWeb/json/work/CierrePeriodoWork/"+ empresaL + "," +huertoL + "," + periodoL + "," + workafroL + "," + UD,
		type : "PUT",
		dataType : "text",
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
			$("#loading").show();

		},
		success : function(data, textStatus, jqXHR) {
				
			alerta(data);
			buscar();
			

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

function buscar(){
	

	
	var table = $('#tbl_Info').DataTable();

	table.clear().draw();
	
	var valorSociedad = $('#Sociedad').val();
	var huerto = $('#tipodivisionB').val();
	var periodoSelect = $('#peridoS').val();
	var agro_work = $('#agrowork').val();
	
	var periodoSplit = periodoSelect.split("-");
	periodoSplit = periodoSplit[1]+periodoSplit[0];
	
	if (valorSociedad === '-1') {
		alerta("Campo Empresa no Puede Estar vacio");
		return;
	}else if(huerto == "-1" || huerto == ""){
		alerta("Seleccione un Huerto");
		return;
	}
	else if(periodoSelect == ""){
		alerta("Seleccione un Periodo");
		return;
	}else if(agro_work == ""){
		alerta("Seleccione WORK O AGRO");
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
	    	 var tableadd = $('#tbl_Info').DataTable();
			$.each(data, function(k, v){
				  var SelectHuerto = "";
				
				  

                if(huertoPrivilege.includes(v.campo) == true){
                	
                	console.log(v.campo);
                	
                	
                	var estadoCierre = "";
                	$.ajax({
                		url : "/simpleWeb/json/work/CierrePeriodoWorkData/"+ $('#Sociedad').val() + "," +v.campo + "," + periodoSplit + "," + $('#agrowork').val(),
                		type : "PUT",
                		dataType : "text",
                		async: false,
                		beforeSend : function(xhr) {
                			xhr.setRequestHeader("Accept", "application/json");
                			xhr.setRequestHeader("Content-Type", "application/json");
                			$("#loading").show();

                		},
                		success : function(data, textStatus, jqXHR) {
                			var valorData = "";	
                			valorData = data;
                			var esuno = 1;
                			var esdos = 2;
                			console.log(valorData);
                			
                			var campo = '"'+v.campo+'"';
                			if(valorData == "1"){
                				tableadd.row.add( [
                 		            	            "<td>"+$("#Sociedad :selected").text()+"</td>",
                 		            	            "<td>"+v.descripcion+"</td>",
                 		            	            
                 		            	            "<td>"+$("#peridoS").val()+"</td>",
                 		            	           "<td><button title='CERRADO' id='' onclick='insertUpdate("+$('#Sociedad').val() + ","+campo+"," + periodoSplit + "," + $('#agrowork').val()+"," + esdos +");' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-lock'></i></button></td>",
                 		            				
                 		            				] ).node().id = "td"+k;
                 		            		tableadd.draw();
               	            }else{
               	            	tableadd.row.add( [
                 		            	            "<td>"+$("#Sociedad :selected").text()+"</td>",
                 		            	            "<td>"+v.descripcion+"</td>",
                 		            	            
                 		            	            "<td>"+$("#peridoS").val()+"</td>",
                 		            	            "<td><button title='ABIERTO' id='' onclick='insertUpdate("+$('#Sociedad').val() + ","+campo+"," + periodoSplit + "," + $('#agrowork').val()+"," + esuno +");' class='btn btn-circle green btn-outline btn-sm'><i class='fa fa-unlock'></i></button></td>",

                 		            	            
                 		            				
                 		            				] ).node().id = "td"+k;
                 		            		tableadd.draw();
               	            }
                       	
                			

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
				
				
				
				
			})
			
		}).done(function() {
			$("#loading").hide();

		})
	})
	
	}


