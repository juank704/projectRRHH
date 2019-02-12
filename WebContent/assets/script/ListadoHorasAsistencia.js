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
	$('.bootstrap-timepicker-widget').hide();
	 var currentTime = new Date();	
	   var startDateFrom = new Date(currentTime.getFullYear(), currentTime.getMonth() -1, 1);
	
	   $('#fechaupdate').datepicker({
			dateFormat : 'dd-mm-yy',
			minDate : startDateFrom,
			firstDay: 1,
			changeMonth: true,
		    changeYear: true
		})
		
	   
	   $("#periodoupdate").datepicker({
			dateFormat : 'mm-yy',
			firstDay: 1,
			changeMonth : true,
			changeYear : true

		});
		
	
	ListaSociedad();
	ListaConcepto();
	

	

	
	var table = $('#tbl_Info').DataTable({
		columnDefs: [
		             {
		                 targets: [0,1,2,4,5,6,7],
		                 className: 'tdcenter'
		             },
		             {
		                 targets: [3],
		                 className: 'tdleft'
		             }
		           ],
		           dom: 'Bfrtip',
		           buttons: [
		                     {
		                      
		                     
		                         extend: 'excelHtml5',
		                         exportOptions: {
		                             columns: [ 1, 2, 3,4,5,6 ]
		                         }
		                     }
		                     
		                 ]
		         } 		
);
 

		
			table.columns([ 0 ]).visible(false);
			
	
	$('#panelform').css({"display" : "block", "opacity" : "0.5"});
	$(".select2-selection").addClass("form-control btn-circle btn-sm mayusculasWork");
})

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

function ListaConcepto(){
	$("#loading").show();
	
	$.getJSON("/simpleWeb/json/work/ListaConcepto/", function(data){
	
		var selectConcepto = "";
		selectConcepto += 	"<option value=''>Seleccione..</option>";
		$.each(data, function(k, v){
		
			
				selectConcepto += 	"<option value="+v.id+">"+v.descripcion+"</option>";
				
			
			
		})
		
		$("#conceptos").append(selectConcepto);
}).fail(function(jqXHR, textStatus, errorThrown) {

    alerta(errorThrown);
	$("#loading").hide();
}).done(function() {
	$("#loading").hide();
});

}
function trabajadores() {
	$("#loading").show();
	var SelectConcepto = "";
	SelectConcepto += " <option value='0'>Buscar</option>";
	$("#CodigoTra").append(SelectConcepto);
	
	var sociedad = $("#Sociedad").val();
	
	
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
	
	
	
	var concepto = $("#concepto").val();
	if(concepto == -1){
		concepto = null;
	}else{
		concepto = $("#concepto").val();
	}
	var periodo = $("#periodo").val();
	if(periodo == ""){
		periodo = null;
	}else{
		periodo = $("#periodo").val().replace(/-/gi, "");
	}
	

	$.getJSON(
			"/simpleWeb/json/work/allTrabajaCodNomHorasAsistencia/"+sociedad+","+tipo_division+","+tipo_subdivision+","+grupo+","+concepto+","+periodo+"",
			function(data) {
				$.each(data, function(k, v) {
					$("#loading").show();
					var SelectConcepto = "";

					SelectConcepto += "<option value=" + v.codigotrabajador + ">"
							+ v.codigotrabajador + " | " + v.apellidoPaterno.toUpperCase() + " "+v.apellidoMaterno.toUpperCase() +" "+v.nombre.toUpperCase()+  " | " + v.rut + "</option>";
					$("#CodigoTra").append(SelectConcepto);
					
					
				});

			}).done(function() {
		$("#loading").hide();

	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})

}
$('#Sociedad').change(function(e) {

	var table = $('#tbl_Info').DataTable();

	table.clear().draw();
	
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
	trabajadores();
	});






$('#tipodivisionB,#tiposubdivisionB,#listagrupoB,#concepto').change(function(e) {
	
	var soc = $('#Sociedad').val();
	if(soc == ""){
		alerta("Debe Seleccionar una Empresa");
		return;
	}
	$("#CodigoTra").empty();
	trabajadores();
	
	});

function buscar(){
	
	var table = $('#tbl_Info').DataTable();

	table.clear().draw();
	
	
	
	 var soc = $("#Sociedad").val();
	
    if(soc === "-1"){soc = null;}
    else if(soc == ''){
    	soc = null;
	}
	else{
		soc = $("#Sociedad").val();
	}
	
	 var cod = $("#CodigoTra").val();
		
	    if(cod === "0"){cod = null;}
	    else if(cod == ''){
	    	cod = null;
		}
		else{
			cod = $("#CodigoTra").val();
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
	

	
	var concepto = $("#concepto").val();
	if(concepto == -1){
		concepto = null;
	}else{
		concepto = $("#concepto").val();
	}
	var periodo = $("#periodo").val();
	if(periodo == ""){
		periodo = null;
	}else{
		periodo = $("#periodo").val().replace(/-/gi, "");
	}
	
	$("#loading").show();
	$.getJSON(
			"/simpleWeb/json/work/selectBuscarHorasAsistencia/"+soc+","+cod+","+tipo_division+","+tipo_subdivision+","+grupo+","+concepto+","+periodo+"",
			function(data) {
         
               var tableadd = $('#tbl_Info').DataTable();
               $.each(data, function(k, v){
       			
       			
       			 var str = v.periodoint;
       			 var res1 = str.toString().substr(0,4);
       		     var res2 = str.toString().substr(-2);
       		     var res3 = res2+"-"+res1;
       		    
       		     
       		  var textohoraFinal = v.nhoras;
       		  var textohoraString = textohoraFinal.toString();
       		
       		
       		
       		 var info = textohoraString;
       		 var hrs = parseInt(Number(info));
       		 var min = Math.round((Number(info)-hrs) * 60);
       		 var lahoraes = hrs+':'+min;
       		 
       		
       		
       		  var Hslit = lahoraes.split(':');
       		  
       		  if(Hslit[0].length == 1 && Hslit[1].length == 1){
       			  lahoraes = "0"+Hslit[0]+":0"+Hslit[1];
       			 
       		  }else if(Hslit[0].length == 1 && Hslit[1].length > 1){
       			  
       			  lahoraes = "0"+Hslit[0]+":"+Hslit[1];
       		  }  else if(Hslit[0].length == 2 && Hslit[1].length == 1){
       			  
       			  lahoraes = Hslit[0]+":0"+Hslit[1];
       		  } 
       		  
       		
       		     
       		     

            	    fechaI = v.fecha;
            	    var fslit = fechaI.split('-');
        			var fecha_split = fslit[2]+"-"+fslit[1]+"-"+fslit[0];
 
            		tableadd.row.add( [
            	            "<td>"+v.conceptoint+"</td>",
            	            "<td>"+v.nombre_concepto+"</td>",
            	            "<td>"+v.codigotrabajador+"</td>",
            	            "<td>"+v.apellidoPaterno.toUpperCase()+" "+v.apellidoMaterno.toUpperCase()+" "+v.nombre.toUpperCase()+"</td>",
            	            "<td>"+lahoraes+"</td>",
            				"<td>"+res3+"</td>",
            				"<td>"+fecha_split+"</td>", 
            				"<td><button title='Actualizar' id='' onclick='editarFicha("+k+","+v.id_sw_horasAsistencia+");' class='btn btn-circle yellow btn-outline btn-sm'><i class='fa fa-pencil-square-o fa-lg'></i></button><button title='Eliminar' id=''onclick='eliminar("+v.id_sw_horasAsistencia+");' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button></td>",
            				] ).node().id = "td"+k;
            		tableadd.draw();
       				
       		     
       		})

			}).done(function() {
		$("#loading").hide();

	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})  	
	
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
	$("#loading").show();
	$.ajax({
	    url: "/simpleWeb/json/work/EliminarHora_Asistencia/" + id + "",
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
	}).done(function() {
		$("#loading").hide();
	});
	
	
}


function editarFicha(td,id){
	
	var concepto = [];
	var hora = [];
	var periodo = [];
	var fecha = [];
	
	
	var table = $('#tbl_Info').DataTable();
	
	 
	concepto = table.row().column(0).data().draw(); 
	var texto = concepto[td]; 
	var texto2 = $(texto).text();
	var conceptoToString = texto2.toString();
	
	hora = table.row().column(4).data().draw(); 
	var textohora = hora[td]; 
	var textohoraFinal = $(textohora).text();
	var textohoraString = textohoraFinal.toString();
	
	periodo = table.row().column(5).data().draw(); 
	var textoperiodo = periodo[td]; 
	var textoperiodoFinal = $(textoperiodo).text();
	var textoperiodoFinalString = textoperiodoFinal.toString();
	
	fecha = table.row().column(6).data().draw(); 
	var textofecha = fecha[td]; 
	var textotextofechaFinal = $(textofecha).text();
	var textofechaFinalString = textotextofechaFinal.toString();
	
	$("#modalupdate").modal();
	     
   
   $("#periodoupdate").val(textoperiodoFinalString);  
   $("#fechaupdate").val(textofechaFinalString);
   $("#conceptos").val(conceptoToString);
   
	  
	 $("#horas").val(""+textohoraString+"");
	  

	 $("#actualizarUp").attr("onclick","actualizarTrabajador("+id+")");
   
  
   

   
  
}

$("#periodoupdate").change(function(){
	
	var periodo = $("#periodoupdate").val();
	
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
	
	

	$("#fechaupdate").datepicker('destroy').datepicker({
		dateFormat : 'dd-mm-yy',
		minDate : new Date(fechamindate2),
		maxDate : new Date(resultado3)

	});
});

function actualizarTrabajador(id){
	
	datosEnviar = [];

	var concepto =  $("#conceptos").val();
	var periodo =  $("#periodoupdate").val();
	var fecha =  $("#fechaupdate").val();
	var hora =  $("#horas").val();
	
	 if(concepto == -1){
		alerta("Debe Seleccionar un Concepto"); $("#concepto").focus();return;
	}else if(periodo == ""){
		alerta("Debe Seleccionar un Periodo"); $("#periodo").focus();return;
	}else if(fecha == ""){
		alerta("Debe Seleccionar una Fecha"); $("#fechaFinLM").focus();return;
	}else if(hora == ""){
		alerta("Debe Ingresar una Hora"); $("#horas").focus();return;
	}else if(hora == 0){
		alerta("Hora no Puede Ser Igual a '0'"); $("#horas").focus();return;
	}else{
		var periodo_split =  $("#periodoupdate").val().split('-');
		var periodofinal = periodo_split[1]+""+periodo_split[0];
		
		var horaformat =  $("#horas").val();
		
	      var time = horaformat;
		  var hoursMinutes = time.split(/[.:]/);
		  var hours = parseInt(hoursMinutes[0], 10);
		  var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
		  var  horafinal = hours + minutes / 60 ;
		  
	var ftU = fecha.split('-');
	var ftU2 = ftU[2] +"-"+ ftU[1] +"-"+ ftU[0];
	
		var row = {
				
				
				concepto : concepto,
				periodo : periodofinal,
				fecha : ftU2,
				hora : horafinal,
				id_horasasistencia : id

			}
		
		
		
		
        
        
	
	$("#loading").show();
	
	
	$.ajax({
		url : "/simpleWeb/json/work/UpdateHora_Asistencia",
		type : "PUT",
		data : JSON.stringify(row),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept","application/json");
			xhr.setRequestHeader("Content-Type","application/json");
		},
		success : function(data, textStatus, jqXHR) {
			
			$('#modalupdate').modal('toggle');
	    	buscar();
	        
			alerta("Enviado");
			
			
			$("#loading").hide();
			 
				
            
		},
		error : function(ex) {
			console.log(ex);
		}
	
	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	}).done(function() {
		$("#loading").hide();
	});
	}
}

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

