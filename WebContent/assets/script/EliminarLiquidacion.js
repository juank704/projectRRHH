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
	ListaSociedad();
	
	var table = $('#loadTabla').DataTable({
//		"sorting": false,
		responsive: true,
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
			                        	 columns: [ 0, 1, 2, 3, 4 ]
			                      
			                     		
			                         }
			                     }
			                     
			                 ]
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


function trabajadores() {
	$("#loading").show();
	var SelectConcepto = "";
	SelectConcepto += " <option value='0'>Buscar</option>";
	$("#CodigoTra").append(SelectConcepto);
	
	var codigoS = $("#Sociedad").val();
	
	$.getJSON(
			"/simpleWeb/json/work/allTrabajadoresCodNomHD/"+codigoS,
			function(data) {

				$.each(data, function(k, v) {
					$("#loading").show();
					var SelectConcepto = "";

					SelectConcepto += "<option value=" + v.codigo + ">"
							+ v.codigo + " | " + v.ap_paterno + " "+v.ap_materno+" "+v.nombre+"</option>";
					$("#CodigoTra").append(SelectConcepto);
					
					
				});

			}).done(function() {
		$("#loading").hide();

	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})

}


$("#CodigoTra").change(function() {
	
	
	 
	$("#idContrato").empty();
	
	var codt = $('#CodigoTra').val();
	
	if(codt == ""){
		alerta("Debe Seleccionar un Trabajador");
		return;
	}
	$("#loading").show();
	$.getJSON(
			"/simpleWeb/json/work/LoadSelectIdContratoLIquidacion/" + codt,
			function(data) {

            cantidadData = data.length;
            
            if(cantidadData > 1){
           	 $("#idContrato").prop("disabled", false);
           	 var SelectIdContrato = "";
				SelectIdContrato += "<option value=''>Seleccione..</option>";

				$("#idContrato").append(SelectIdContrato);
				$.each(data, function(k, v) {

					var SelectIdContrato = "";
					SelectIdContrato += "<option value='" + v.idcontra+ "'>"
							+ v.fecha_inicio_actividad + "</option>";

					$("#idContrato").append(SelectIdContrato);

				});
            }else if(cantidadData == 1){
           	 $("#idContrato").prop("disabled", true);
			
				$.each(data, function(k, v) {

					var SelectIdContrato = "";
					SelectIdContrato += "<option value=" + v.idcontra+ ">"
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


function buscar(){
	
	
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
		
	
	$("#loading").show();
	
	  var tableadd = $('#loadTabla').DataTable();
         var count = 0;
		  $.ajax({
	     		type : "GET",
	     		url : "/simpleWeb/json/work/buscarLiquidacionParaEliminar/" + soci + "," + periodo + ","+ idcontrato + "," +codtrabajador+","+ tipo_division +","+ tipo_subdivision+","+grupo,
	     		async: true,
	     		dataType : "JSON",
	     		success : function(data) {
	     		    console.log(data);
	    			$.each(data, function(k, v){
	    				var str = v.periodo;
	    				 var res1 = str.toString().substr(0,4);
	    			     var res2 = str.toString().substr(-2);
	    			     var res3 = res1+"-"+res2;
	    			     
	    			     
	    			    tableadd.row.add( [
	    				"<td >"+res3+"</td>",
	    				"<td >"+v.cod_trabajador+"</td>",
	    				"<td>"+v.nombre+"</td>",
	    				"<td>"+v.fecha_pago+"</td>",
	    			    "<td id='number'>"+String(v.totalapago).replace(/(.)(?=(\d{3})+$)/g,'$1.')+"</td>",
	    				"<td><button title='Eliminar' id='"+k+"' onclick='Eliminar("+v.periodo+","+v.id_liquidacion+","+v.cod_trabajador+","+v.id_contrato+");' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button></td>",
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


function Eliminar(periodo,id_liquidacion,cod_trabajador,id_contrato){
	
	PopupEliminar = "";
	PopupEliminar +='<div class="col-sm-12 col-md-12">';
	PopupEliminar +=          "<div class='btn btn-circle blue btn-outline'  onclick='validarEliminar("+periodo+","+id_liquidacion+","+cod_trabajador+","+id_contrato+");'><i class='fa fa-clock-o'></i> Confirmar</div>";
	PopupEliminar +=          "<div class='btn btn-circle red btn-outline' onclick='closeModal();'> Cancelar</div>";
	PopupEliminar +='</div>';

    popUp("Confirmar Para eliminar", PopupEliminar, true, "400px", true);
	
}




function validarEliminar(periodo,id_liquidacion,cod_trabajador,id_contrato){
	$.ajax({
	    url: "/simpleWeb/json/work/EliminarLiquidaciontrabajador/"+periodo+","+id_liquidacion+","+cod_trabajador+","+id_contrato+"",
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
