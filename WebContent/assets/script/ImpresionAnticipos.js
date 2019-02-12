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
	ListaTipodeCuenta();
	var table = $('#tbl_Info2').DataTable({
		"sorting": false,
		 "order": [[ 2, "asc" ]],
		columnDefs: [
			             {
			                 targets: [0,1,4,5,6,7,8,9],
			                 className: 'tdcenter'
			             },
			             {
			                 targets: [3],
			                 className: 'tdright'
			             }
			           ]
			           
			         });
	
	
	table.columns([ 5 ]).visible(false);
	table.columns([ 6 ]).visible(false);
	table.columns([ 7 ]).visible(false);
	table.columns([ 8 ]).visible(false);
	table.columns([ 10 ]).visible(false);

	$("#periodoRemuneraciones").datepicker({
		dateFormat : 'mm-yy',
		firstDay : 1,
		changeMonth : true,
		changeYear : true

	});
	
	 $("#fechaPago").datepicker({ 
			dateFormat: 'dd-mm-yy',
			firstDay: 1,
	        changeMonth: true,
	        changeYear: true

			});

});// end document ready

function ListaSociedad(){
	
	$.getJSON("/simpleWeb/json/work/ListaSociedad/", function(data){
		datos = data;
		$.each(data, function(k, v){
			var SelectSociedad = "";
	if(v.idSociedad == -1){
				
			}else{
			SelectSociedad += 	"<option value="+v.idSociedad+">"+v.denominacionSociedad+"</option>";
			
			$("#Sociedad").append(SelectSociedad);
			}
		})
});
}

$("#Sociedad").change(function(){
	
	
	lodtrab2();
	$("#nombreTrabajador").empty();
	$("#tipodivision").empty();
	$("#tiposubdivision").empty();
	$("#listagrupo").empty();
	$("#tiposubdivision").append("<option value='-1'>Seleccione Grupo</option>");
	$("#listagrupo").append("<option value='-1'>Seleccione CECO</option>");
	
	
	var soc = $("#Sociedad").val();
		
		if(soc === '-1'){alerta("Debe Seleccionar una Empresa");$('.swal2-container').css('z-index', '15000');return;}

		var soci_sap = "";
		$("#loading").show();
		$.getJSON("/simpleWeb/json/work/getSociedadById/"+$('#Sociedad').val()+"" , function(data){
	        
			soci_sap = JSON.stringify(data.sociedad);
		
			
		}).done(function() {
			
			$("#tipodivision").append("<option value='-1'>Seleccione Huerto</option>");
			var soci_sapFinal  = soci_sap.replace(/\"/g, '');
			$.getJSON("/simpleWeb/json/work/getCampoBySociedad/"+$('#Sociedad').val()+"" , function(data){
            
				//Obtener huertos en base a los privilegios del usuario
		    	let queryString = huertoPrivilege == null ? "" : JSON.stringify(huertoPrivilege).slice(1,-1);
				
				
				$.each(data, function(k, v){
					  var SelectHuerto = "";	
					
					  if(huertoPrivilege.includes(v.campo) == true){
		                	SelectHuerto += 	"<option value="+v.campo+">"+v.descripcion+"</option>";
		                }
					
					$("#tipodivision").append(SelectHuerto);
	
				})
				
				
			}).done(function() {
				$("#loading").hide();

			})
			

		})
	
});

$("#tipodivision").change(function(){

	var huertoValor = $("#tipodivision").val();
	
	if(huertoValor == "" || huertoValor == -1){
		alerta("Debe Seleccionar un Huerto"); $("#tipodivision").focus();
		return;
	}
	
	
	
	var zona_sap = "";	 
	$("#loading").show();
	$("#tiposubdivision").empty();
	$("#listagrupo").empty();
	$("#listagrupo").append("<option value='-1'>Seleccione CECO</option>");
	
	var grupoSplit = "";
	
	$.getJSON("/simpleWeb/json/work/getCampoByCampo/"+$('#tipodivision').val()+"" , function(data){
		var SelecZona = "";
		SelecZona +=  "<option value=''>Seleccione Zona</option>";
		
		$.each(data, function(k, v)
				{
			          
			SelecZona += 	"<option value="+v.grupo+">"+v.zona+"</option>";
			$("#tiposubdivision").append(SelecZona);
			
				})
		
							

	}).done(function() {
		
		$("#loading").hide();
		
	});
});

$("#tiposubdivision").change(function(){ 
	$("#listagrupo").empty();
	var valor_zona = $("#tiposubdivision").val();
	
	if(valor_zona == "" || valor_zona == ""){
		alerta("Debe Seleccionar una Zona");$("#tiposubdivision").focus();
		return;
	}
	
	var soci_sap = "";
	$("#loading").show();
	$.getJSON("/simpleWeb/json/work/getSociedadById/"+$('#Sociedad').val()+"" , function(data){
        
		soci_sap = JSON.stringify(data.sociedad);
	
		
	}).done(function() {
		
		
		var soci_sapFinal  = soci_sap.replace(/\"/g, '');
		$.getJSON("http://200.55.206.140/SCLEM/JSON_BAPI_COSTCENTER_GETLIST1.aspx?SOCIEDAD="+soci_sapFinal+"&GRUPO="+valor_zona+"" , function(data){
			var SelectCECO = "";
			SelectCECO +=  "<option value=''>Seleccione CECO</option>";
		
				
				$.each(data.COSTCENTERLIST, function(k, v){
					
					
					if(v.DESCRIPT.indexOf("Cuartel") > -1 == true ){
						
					}else{SelectCECO += 	"<option value="+v.COSTCENTER+">"+v.DESCRIPT+"</option>";}
		
				})
				$("#listagrupo").append(SelectCECO);
						
				$("#loading").hide();
		}).done(function() {
			$("#loading").hide();
		
		})
	})
});

function lodtrab2() {

	$("#loading").show();
	$("#nombreTrabajador").empty();
	
	var valueSociedad =  $("#Sociedad").val(); 
	
	$.getJSON(
			"/simpleWeb/json/work/LoadTrabajadorXSociedadAnticipoImprimir/"
					+ valueSociedad,
			function(data) {
		
						var SelectTrabajadorNombre = "";
						SelectTrabajadorNombre += " <option value='0'>Buscar</option>";
						$("#nombreTrabajador").append(SelectTrabajadorNombre);		
				$.each(data, function(k, v) {

					

					var SelectTrabajadorNombre = "";
					SelectTrabajadorNombre += "<option value="
							+ v.codigotrabajador + ">" + v.codigotrabajador
							+ "|" + v.apellidoPaterno + " " + v.apellidoMaterno + " "
							+ v.nombre + "|" + v.rut + "</option>";
					$("#nombreTrabajador").append(SelectTrabajadorNombre);

				});

			}).done(function() {
		$("#loading").hide();

	})
}

function buscarTrabajadorByParams(){
	
	BuscarAnticipoSimple();
	
}

function BuscarAnticipoSimple(){
	
	var periodo = $("#periodoRemuneraciones").val();
	
	if(periodo === ''){
		
		periodo = null;
	}else{
		var periodoSplit = periodo.split('-');
		periodo = periodoSplit[1]+periodoSplit[0];
	}
	
	
	var sociedad = $("#Sociedad").val();
	if(sociedad == ''){
		sociedad = null;
	}else{
		 sociedad = $("#Sociedad").val();
	}
	
	var tipo_division = $("#tipodivision").val();
	if(tipo_division == ''){
		tipo_division = null;
	}
	else if(tipo_division == '-1'){
		tipo_division = null;
	}
	
	else{
		 tipo_division = $("#tipodivision").val();
	}
	
	var tipo_subdivision = $("#tiposubdivision").val();
	if(tipo_subdivision == ''){
		tipo_subdivision = null;
	}
	else if(tipo_subdivision == '-1'){
		tipo_subdivision = null;
	}

	else{
		tipo_subdivision = null;
	}
	
	var grupo = $("#listagrupo").val();
	if(grupo == ''){
		grupo = null;
	}
	else if(grupo == '-1'){
		grupo = null;
	}
	else{
		 grupo = $("#listagrupo").val();
	}
	

	
	var fechaPago = $("#fechaPago").val();
	if(fechaPago == ''){
		fechaPago = null;
	}else{
		fechaPago = $("#fechaPago").val();
		var fechaPagosplit = fechaPago.split('-');
		fechaPago = fechaPagosplit[2] +"-"+ fechaPagosplit[1] +"-"+ fechaPagosplit[0];
	}
	
	var nombre_trabajador = $("#nombreTrabajador").val();
	if(nombre_trabajador == '0'){
		nombre_trabajador = null;
	}else{
		nombre_trabajador = $("#nombreTrabajador").val();
	}
	
	var tipo_cuenta = $("#selectTipoCuenta").val();

	if (tipo_cuenta == '') {
		tipo_cuenta = null;
	} else {
		tipo_cuenta = $("#selectTipoCuenta").val();
	}
	
	var table = $('#tbl_Info2').DataTable();

	table.clear().draw();
	

	$("#loading").show();
	
	$.getJSON("/simpleWeb/json/work/BuscarAsignacionSimpleImprimir/" + periodo + "," + fechaPago + ","+nombre_trabajador+","+sociedad+","+tipo_division+","+tipo_subdivision+","+grupo+","+tipo_cuenta+"", function(data){
		
       console.log(data);
		var numero = 1;
		$.each(data, function(k, v){
			
			var fechasplit = v.fecha.split('-');
			var fechasplit_final = fechasplit[2] +"-"+ fechasplit[1] +"-"+ fechasplit[0];
			
			table.row.add( [
			    				"<td >"+fechasplit_final+"</td>",
			    				"<td >"+v.codtrabajador+"</td>",
			    				"<td>"+v.appaterno.toUpperCase()+" "+v.appmaterno.toUpperCase()+" "+v.nombre.toUpperCase()+"</td>",
			    				"<td>"+String(v.montoingresado).replace(/(.)(?=(\d{3})+$)/g,'$1.')+"</td>",
			    				"<td >"+v.rut+"</td>",
			    				"<td >"+v.tipo_cuenta+"</td>",
			    				"<td >"+v.numerocuenta+"</td>",
			    				"<td >"+v.nombrebanco+"</td>",
			    				"<td >"+v.rutempresa+"</td>",
			    				"<td><button id='' title='Imprimir' class='btn btn-circle green btn-outline' data-toggle='modal' onclick='javascript:ImprimirIndividual("+v.codtrabajador+","+v.id+")'><i class='fa fa-print fa-lg'> Imprimir</i></button></td>",
			    				"<td >"+v.id+"</td>"
			    				
			    				] ).node().id =  k;
			table.draw();

		})

		$("#loading").hide();


}).fail(function(jqXHR, textStatus, errorThrown) {

	
    alerta(errorThrown);
	$("#loading").hide();
})
}
function ImprimirIndividual(cod,id){
	
	var informacionExtra = new Object();

	informacionExtra.codtrabajadorstring = cod;
	informacionExtra.idstring = id;
    
	$("#loading").show();
	$.ajax({
		url : "/simpleWeb/json/work/generateDocumentoAnticipo/72",
		type : "PUT",
		data : JSON.stringify(informacionExtra),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept","application/json");
			xhr.setRequestHeader("Content-Type","application/json");
		},
		success : function(data, textStatus, jqXHR) {
			
			
			console.log(data);
			var myJSON = JSON.stringify(data[0]);
			//Descargar Archivo PDF
			window.open("/simpleWeb/json/work/descargardocumentoAnticipo/?FILE="+myJSON);
     
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


function ImprimirMasivo(){
	
var table = $('#tbl_Info2').DataTable();
var nFilas = table.rows().count();

if(nFilas == 0){
	alerta("No se Encuentran Datos");
	return;
}

	var cellsIdTabla = new Array(); 
	var idtablaAnticipo = new Array();
	cellsIdTabla = table.row().column(10).data().draw();  

		for (var i = 0; i < cellsIdTabla.length; i++) {
		var textoid = cellsIdTabla[i];
		var textovalor = $(textoid).text();
		idtablaAnticipo.push(textovalor);

	}
		var cellsCodTrabajador = new Array(); 
		var codtrab = new Array();
		cellsCodTrabajador = table.row().column(1).data().draw();  

			for (var i = 0; i < cellsCodTrabajador.length; i++) {
			var textocod = cellsCodTrabajador[i];
			var textovalorcod = $(textocod).text();
			codtrab.push(textovalorcod);

		}
			
			
			
	    var idString = "";    
			for (var i = 0; i < nFilas; i++) {
				
				
					if(i == 0 ){ idString = idString+idtablaAnticipo[i]}else{
					 
						 idString = idString+","+idtablaAnticipo[i]}
			    
			}
			
			var informacionExtra = new Object();

			informacionExtra.codtrabajadorstring = "0";
			informacionExtra.idstring = idString;
		    
			$("#loading").show();
			$.ajax({
				url : "/simpleWeb/json/work/generateDocumentoAnticipoMasivo/72",
				type : "PUT",
				data : JSON.stringify(informacionExtra),
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Accept","application/json");
					xhr.setRequestHeader("Content-Type","application/json");
				},
				success : function(data, textStatus, jqXHR) {
					
					
					console.log(data);
					var myJSON = JSON.stringify(data[0]);
					//Descargar Archivo PDF
					window.open("/simpleWeb/json/work/descargardocumentoAnticipo/?FILE="+myJSON);
		     
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

function ListaTipodeCuenta() {
	$.getJSON(
			"/simpleWeb/json/work/ListaTipoCuenta/",
			function(data) {
				datos = data;
				$.each(data, function(k, v) {
					var Selectbanco = "";
					
					Selectbanco += "<option value=" + v.llave + ">"+ v.descripcion + "</option>";
                    
					$("#selectTipoCuenta").append(Selectbanco);

				})
			}).fail(function(jqXHR, textStatus, errorThrown) {

		alerta(errorThrown);
		$("#loading").hide();
	})
}