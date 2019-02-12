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
	ListaTipodeCuenta2();
	 $("#fechaPago").datepicker({ 
			dateFormat: 'dd-mm-yy',
			firstDay: 1,
	        changeMonth: true,
	        changeYear: true

			});
	 
	 var table = $('#tbl_Info2').DataTable({
			"sorting": false,
			 "order": [[ 2, "asc" ]],
			columnDefs: [
				             {
				                 targets: [0,1,4,5],
				                 className: 'tdcenter'
				             },
				             {
				                 targets: [6],
				                 className: 'tdright'
				             }
				           ]
				           
				         });
	 table.columns([ 8 ]).visible(false);
	
});
function ListaSociedad(){
	
	//Obtener Sociedades en base a los privilegios del usuario
	let queryString = sociedadPrivilege == null ? "" : JSON.stringify(sociedadPrivilege).slice(1,-1);
	$("#loading").show();
	$.getJSON("/simpleWeb/json/work/getSociedad/?idSociedad="+queryString, function(data){

		datos = data;
		$.each(data, function(k, v){
			var SelectSociedad = "";
			if(v.idSociedad == -1){
				
			}else{
			SelectSociedad += 	"<option value="+v.idSociedad+">"+v.sociedad+"</option>";
			
			$("#Sociedad").append(SelectSociedad);
			}
		})
	});
	$("#loading").hide();
}

$("#Sociedad").change(function(){
	$("#nombreTrabajador").empty();
	
	lodtrab2();
	
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


function buscarTrabajadorByParams(){
	
	BuscarAnticipoSimple();
	
}
function lodtrab2() {

	$("#loading").show();
	$("#nombreTrabajador").empty();
	
	var valueSociedad =  $("#Sociedad").val(); 
	
	$.getJSON(
			"/simpleWeb/json/work/LoadTrabajadorXSociedadFiniquitooImprimir/"
					+ valueSociedad,
			function(data) {
		
						var SelectTrabajadorNombre = "";
						SelectTrabajadorNombre += " <option value='0'>Buscar</option>";
						$("#nombreTrabajador").append(SelectTrabajadorNombre);		
				$.each(data, function(k, v) {

					

					var SelectTrabajadorNombre = "";
					SelectTrabajadorNombre += "<option value="
							+ v.codigo_trabajador + ">" + v.codigo_trabajador
							+ "|" + v.apellidoPaterno + " " + v.apellidoMaterno + " "
							+ v.nombre + "|" + v.rut + "</option>";
					$("#nombreTrabajador").append(SelectTrabajadorNombre);

				});

			}).done(function() {
		$("#loading").hide();

	})
}

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
		
		var CECOAgrupacion;

        $.each(SESION.campo, function(key, value){

              if(value.campo == $('#tipodivision').val()){

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
				$("#listagrupo").append(SelectCECO);
						
				$("#loading").hide();
		}).done(function() {
			$("#loading").hide();
		
		})
	})
});





function ImprimirIndividual(cod,id,total_finiquito){
	
	var informacionExtra = new Object();

	informacionExtra.cod_trabajador_string = cod;
	informacionExtra.idString = id;
	informacionExtra.valor_texto = NumeroALetras(total_finiquito);
	
	console.log(informacionExtra.valor_texto)
    
	$("#loading").show();
	$.ajax({
		url : "/simpleWeb/json/work/generateDocumentoFiniquito/76",
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
			window.open("/simpleWeb/json/work/descargardocumentofiniquito/?FILE="+myJSON);
     
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


function BuscarAnticipoSimple(){
	
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
	
	var tipo_cuenta = $("#selectTipoCuentaFiniquito").val();

	if (tipo_cuenta == '') {
		tipo_cuenta = null;
	} else {
		tipo_cuenta = $("#selectTipoCuentaFiniquito").val();
	}
	
	var table = $('#tbl_Info2').DataTable();

	table.clear().draw();
	
	
	
	

	$("#loading").show();
	
	$.getJSON("/simpleWeb/json/work/BuscarFiniquitosSimpleImprimir/"+fechaPago + ","+nombre_trabajador+","+sociedad+","+tipo_division+","+tipo_subdivision+","+grupo+","+tipo_cuenta+"", function(data){
		
       console.log(data);
		var numero = 1;
		$.each(data, function(k, v){
	
			
		  

			
			var fechasplitInicio = v.fecha_inicio.split('-');
			var fechasplit_final_I = fechasplitInicio[2] +"-"+ fechasplitInicio[1] +"-"+ fechasplitInicio[0];
			
			var fechasplitTermino = v.fecha_termino.split('-');
			var fechasplit_final_T = fechasplitTermino[2] +"-"+ fechasplitTermino[1] +"-"+ fechasplitTermino[0];
			
			var fechasplitPago = v.fechapago.split('-');
			var fechasplit_final_P = fechasplitPago[2] +"-"+ fechasplitPago[1] +"-"+ fechasplitPago[0];
			
			table.row.add( [
			    				"<td >"+v.codigo_trabajador+"</td>",
			    				"<td>"+v.apellidoPaterno.toUpperCase()+" "+v.apellidoMaterno.toUpperCase()+" "+v.nombre.toUpperCase()+"</td>",
			    				"<td >"+v.rut+"</td>",
			    				"<td >"+fechasplit_final_I+"</td>",
			    				"<td >"+fechasplit_final_T+"</td>",
			    				"<td >"+fechasplit_final_P+"</td>",
			    				"<td>"+String(v.total_finiquito).replace(/(.)(?=(\d{3})+$)/g,'$1.')+"</td>",
			    				
			    				
			    				"<td><button id='' title='Imprimir' class='btn btn-circle green btn-outline' data-toggle='modal' onclick='javascript:ImprimirIndividual("+v.codigo_trabajador+","+v.id+","+v.total_finiquito+")'><i class='fa fa-print fa-lg'> Imprimir</i></button></td>",
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


function ImprimirMasivo(){
	
	var table = $('#tbl_Info2').DataTable();
	var nFilas = table.rows().count();

	if(nFilas == 0){
		alerta("No se Encuentran Datos");
		return;
	}

		var cellsIdTabla = new Array(); 
		var idtablaFiniquito = new Array();
		cellsIdTabla = table.row().column(8).data().draw();  

			for (var i = 0; i < cellsIdTabla.length; i++) {
			var textoid = cellsIdTabla[i];
			var textovalor = $(textoid).text();
			idtablaFiniquito.push(textovalor);

		}
			var cellsCodTrabajador = new Array(); 
			var codtrab = new Array();
			cellsCodTrabajador = table.row().column(0).data().draw();  

				for (var i = 0; i < cellsCodTrabajador.length; i++) {
				var textocod = cellsCodTrabajador[i];
				var textovalorcod = $(textocod).text();
				codtrab.push(textovalorcod);

			}
				
				
				
				var montoFiniquito = new Array();
				cellsMontoTabla = table.row().column(6).data().draw();  

					for (var i = 0; i < cellsMontoTabla.length; i++) {
					var textomonto = cellsMontoTabla[i];
					var textovalormonto = $(textomonto).text().replace(/\./g, '');
					
					montoFiniquito.push(NumeroALetras(parseInt(textovalormonto)));

				}
				
				
				
		    
				trabajadores = [];
				for (var i = 0; i < idtablaFiniquito.length; i++) {
					
					  json = {
							  codigo_trabajador : codtrab[i],	  
							  id : idtablaFiniquito[i],
							  valor_texto : montoFiniquito[i]
					  }
						
					  trabajadores.push(json);
				}
				
				console.log(trabajadores)
				
				$("#loading").show();
				$.ajax({
					url : "/simpleWeb/json/work/generateDocumentoFiniquitoMasivo/76",
					type : "PUT",
					data : JSON.stringify(trabajadores),
					beforeSend : function(xhr) {
						xhr.setRequestHeader("Accept","application/json");
						xhr.setRequestHeader("Content-Type","application/json");
					},
					success : function(data, textStatus, jqXHR) {
						
						
						console.log(data);
						var myJSON = JSON.stringify(data[0]);
						//Descargar Archivo PDF
						window.open("/simpleWeb/json/work/descargardocumentofiniquito/?FILE="+myJSON);
			     
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



function Unidades(num){

	  switch(num)
	  {
	    case 1: return "UN";
	    case 2: return "DOS";
	    case 3: return "TRES";
	    case 4: return "CUATRO";
	    case 5: return "CINCO";
	    case 6: return "SEIS";
	    case 7: return "SIETE";
	    case 8: return "OCHO";
	    case 9: return "NUEVE";
	  }

	  return "";
	}

	function Decenas(num){

	  decena = Math.floor(num/10);
	  unidad = num - (decena * 10);

	  switch(decena)
	  {
	    case 1:   
	      switch(unidad)
	      {
	        case 0: return "DIEZ";
	        case 1: return "ONCE";
	        case 2: return "DOCE";
	        case 3: return "TRECE";
	        case 4: return "CATORCE";
	        case 5: return "QUINCE";
	        default: return "DIECI" + Unidades(unidad);
	      }
	    case 2:
	      switch(unidad)
	      {
	        case 0: return "VEINTE";
	        default: return "VEINTI" + Unidades(unidad);
	      }
	    case 3: return DecenasY("TREINTA", unidad);
	    case 4: return DecenasY("CUARENTA", unidad);
	    case 5: return DecenasY("CINCUENTA", unidad);
	    case 6: return DecenasY("SESENTA", unidad);
	    case 7: return DecenasY("SETENTA", unidad);
	    case 8: return DecenasY("OCHENTA", unidad);
	    case 9: return DecenasY("NOVENTA", unidad);
	    case 0: return Unidades(unidad);
	  }
	}//Unidades()

	function DecenasY(strSin, numUnidades){
	  if (numUnidades > 0)
	    return strSin + " Y " + Unidades(numUnidades)

	  return strSin;
	}//DecenasY()

	function Centenas(num){

	  centenas = Math.floor(num / 100);
	  decenas = num - (centenas * 100);

	  switch(centenas)
	  {
	    case 1:
	      if (decenas > 0)
	        return "CIENTO " + Decenas(decenas);
	      return "CIEN";
	    case 2: return "DOSCIENTOS " + Decenas(decenas);
	    case 3: return "TRESCIENTOS " + Decenas(decenas);
	    case 4: return "CUATROCIENTOS " + Decenas(decenas);
	    case 5: return "QUINIENTOS " + Decenas(decenas);
	    case 6: return "SEISCIENTOS " + Decenas(decenas);
	    case 7: return "SETECIENTOS " + Decenas(decenas);
	    case 8: return "OCHOCIENTOS " + Decenas(decenas);
	    case 9: return "NOVECIENTOS " + Decenas(decenas);
	  }

	  return Decenas(decenas);
	}//Centenas()

	function Seccion(num, divisor, strSingular, strPlural){
	  cientos = Math.floor(num / divisor)
	  resto = num - (cientos * divisor)

	  letras = "";

	  if (cientos > 0)
	    if (cientos > 1)
	      letras = Centenas(cientos) + " " + strPlural;
	    else
	      letras = strSingular;

	  if (resto > 0)
	    letras += "";

	  return letras;
	}//Seccion()

	function Miles(num){
	  divisor = 1000;
	  cientos = Math.floor(num / divisor)
	  resto = num - (cientos * divisor)

	  strMiles = Seccion(num, divisor, "UN MIL", "MIL");
	  strCentenas = Centenas(resto);

	  if(strMiles == "")
	    return strCentenas;

	  return strMiles + " " + strCentenas;

	  //return Seccion(num, divisor, "UN MIL", "MIL") + " " + Centenas(resto);
	}//Miles()

	function Millones(num){
	  divisor = 1000000;
	  cientos = Math.floor(num / divisor)
	  resto = num - (cientos * divisor)

	  strMillones = Seccion(num, divisor, "UN MILLON", "MILLONES");
	  strMiles = Miles(resto);

	  if(strMillones == "")
	    return strMiles;

	  return strMillones + " " + strMiles;

	  //return Seccion(num, divisor, "UN MILLON", "MILLONES") + " " + Miles(resto);
	}//Millones()

	function NumeroALetras(num){
	  var data = {
	    numero: num,
	    enteros: Math.floor(num),
	    centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
	    letrasCentavos: "",
	    letrasMonedaPlural: "PESOS",
	    letrasMonedaSingular: "PESOS"
	  };

	  if (data.centavos > 0)
	    data.letrasCentavos = "CON " + data.centavos + "/100";

	  if(data.enteros == 0)
	    return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
	  if (data.enteros == 1)
	    return Millones(data.enteros) + " " + data.letrasMonedaSingular + " " + data.letrasCentavos;
	  else
	    return Millones(data.enteros) + " " + data.letrasMonedaPlural + " " + data.letrasCentavos;
	}
	
	function ListaTipodeCuenta2() {
		$.getJSON(
				"/simpleWeb/json/work/ListaTipoCuenta/",
				function(data) {
					
					$.each(data, function(k, v) {
						var Selectbanco = "";
						
						
						if(v.llave == 2 || v.llave == 0 || v.llave == 4){
							Selectbanco += "<option value=" + v.llave + ">"+ v.descripcion + "</option>";
		                    
							$("#selectTipoCuentaFiniquito").append(Selectbanco);
						}else{}
						
						
						
						
						

					})
					
				}).fail(function(jqXHR, textStatus, errorThrown) {

			alerta(errorThrown);
			$("#loading").hide();
		})
	}