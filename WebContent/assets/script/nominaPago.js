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


	$(".newRut").rut();
	ListaSociedad();
	ListaBanco();
	ListaTipodeCuenta();
	ListaTipodeCuenta2();
	ListaOficina();

	formatNumber();
	format();
	$.fn.dataTable.ext.errMode = 'none';
	
	$(".select2-container--bootstrap .select2-selection--single").css("display", "none");
	$( ".select2-container--bootstrap .select2-selection--single" ).addClass( "form-control blue input-circle mayusculasWork" );

	var tableFiniquito = $('#tbl_Info2').DataTable({
//		"sorting": false,
		"order": [[ 3, "asc" ]],
		columnDefs: [
			             {
			                 targets: [9],
			                 className: 'tdright'
			             }
			           ]
			         } );
	
	tableFiniquito.columns([ 5 ]).visible(false);
	tableFiniquito.columns([ 8 ]).visible(false);
	tableFiniquito.columns([ 10 ]).visible(false);
	tableFiniquito.columns([ 11 ]).visible(false);
	tableFiniquito.columns([ 12 ]).visible(false);
	tableFiniquito.columns([ 13 ]).visible(false);
	tableFiniquito.columns([ 14 ]).visible(false);
	
	var tableAnticipo = $('#tbl_Info').DataTable({
//		"sorting": false,
		"order": [[ 3, "asc" ]],
		columnDefs: [
			             {
			                 targets: [9],
			                 className: 'tdright'
			             }
			           ]
			         } );
	
	tableAnticipo.columns([ 5 ]).visible(false);
	tableAnticipo.columns([ 8 ]).visible(false);
	tableAnticipo.columns([ 10 ]).visible(false);
	tableAnticipo.columns([ 11 ]).visible(false);
	tableAnticipo.columns([ 12 ]).visible(false);
	tableAnticipo.columns([ 13 ]).visible(false);
	tableAnticipo.columns([ 14 ]).visible(false);
	
	var tableLiquidacion = $('#tbl_Info3').DataTable({
//		"sorting": false,
		"order": [[ 3, "asc" ]],
		columnDefs: [
			             {
			                 targets: [9],
			                 className: 'tdright'
			             }
			           ]
			         } );
	
	tableLiquidacion.columns([ 5 ]).visible(false);
	tableLiquidacion.columns([ 8 ]).visible(false);
	tableLiquidacion.columns([ 10 ]).visible(false);
	tableLiquidacion.columns([ 11 ]).visible(false);
	tableLiquidacion.columns([ 12 ]).visible(false);
	tableLiquidacion.columns([ 13 ]).visible(false);
	tableLiquidacion.columns([ 14 ]).visible(false);
	
	
	
		
	
	

});



function Buscar() {

	var banco = $("#bancoB").val();

	if (banco == '') {
		banco = null;
	} else {
		banco = $("#bancoB").val();
	}

	var fechaPago = $("#fechaPago").val();

	if (fechaPago == '') {
		fechaPago = null;
	}else if (fechaPago == null) {
		fechaPago = null;
	}
	else {
		var ftU = fechaPago.split('-');
		fechaPago = ftU[2] + "-" + ftU[1] + "-" + ftU[0];
	}

	var periodo = $("#periodoRemuneraciones").val();

	if (periodo == '') {
		periodo = null;
	} else {
		periodo = $("#periodoRemuneraciones").val().replace(/-/gi, "");
	}

	var tipo_cuenta = $("#selectTipoCuenta").val();

	if (tipo_cuenta == '') {
		tipo_cuenta = null;
	} else {
		tipo_cuenta = $("#selectTipoCuenta").val();
	}

	var empresa = $("#empresaB").val();

	if (empresa == '') {
		alerta("Debe Seleccionar una Empresa");
		$("#empresaB").focus();
		return;
	} else {
		empresa = $("#empresaB").val();
	}

	var division = $("#divisionB").val();
	if (division === "-1") {
		division = null;
	} else if (division == '') {
		division = null;
	} else {
		division = $("#divisionB").val();
	}

	var subdivision = $("#subdivisionB").val();

	if (subdivision === "-1") {
		subdivision = null;
	} else if (subdivision == '') {
		subdivision = null;
	} else {
		subdivision = null;
	}

	var grupo = $("#grupoB").val();
	if (grupo === "-1") {
		grupo = null;
	} else if (grupo == '') {
		grupo = null;
	} else {
		grupo = $("#grupoB").val();
	}

	
	var tableadd = $('#tbl_Info').DataTable();
	tableadd.clear().draw();
	

	$("#loading").show();

	$
			.getJSON(
					"/simpleWeb/json/work/BuscarNominaPagoAnticipos/"
							+ fechaPago + "," + periodo + "," + tipo_cuenta
							+ "," + empresa + "," + division + ","
							+ subdivision + "," + grupo + ","
							+ banco,
					function(data) {
								
								
								 
						var numero = 1;
						$.each(data,function(k, v) 
								{
											var valNew = v.fechaanticipo.split('-');
										    var fechaAn = valNew[2]+"-"+valNew[1]+"-"+valNew[0];
										    
										    tableadd.row.add( [
										           			"<td><input type='checkbox'  id='inlineCheckbox" + k + "' value='option2' checked onchange='idcheck(this.id);' ></td>",
										           			"<td>"+ fechaAn + "</td>",
										           			"<td>"+ v.cod_trabajador +"</td>",
										           			"<td>"+ v.apellidopaterno + " " + v.apellidomaterno + " " + v.nombre +"</td>",
										           			"<td>"+ v.nombrebanco != "null" ? v.nombrebanco : ""  + "</td>",
										           			"<td>"+ v.idbanco + "</td>",
										           			"<td>"+ v.numero_cuenta_string != "null" ? v.numero_cuenta_string : "" + "</td>",
										           			"<td>"+ v.nombretipocuenta +"</td>",
										           			"<td>"+ v.idtipocuenta + "</td>",
										           			"<td>"+ String(v.montoingresado).replace(/(.)(?=(\d{3})+$)/g,'$1.') +"</td>",
										           			"<td>"+ v.idtabla_sw_asignacionAnticipos +"</td>",
										           			"<td>"+ v.periodo + "</td>",
										           			"<td>"+ v.rut + "</td>",
										           			"<td>"+ v.direccion + "</td>",
										           			"<td>"+ v.nombrehuerto + "</td>"
										           
										           			] ).node().id = "td"+k;
										           	tableadd.draw();
					
										           	var total2 = 0;
													montoFiniquito = [];
												 	
													var cells2 = new Array(); 
													var montoFiniquito = new Array();
													cells2 = tableadd.row().column(9).data().draw();  for (var i = 0; i < cells2.length; i++) 
													{
													    var montoFila = cells2[i]; var cod = $(montoFila).text().toString().replace(/\./g,'');;
													    montoFiniquito.push(cod);

													}
													
													var total = 0;
													
													for (var i = 0; i < montoFiniquito.length; i++) 
													{
														total = parseInt(montoFiniquito[i]) + total ;
													}
													total2 = String(total).replace(/(.)(?=(\d{3})+$)/g,'$1.');
													$('#montoTotal').val(total2);
						                            

									})// end each

						$("#loading").hide();
						

					}).fail(function(jqXHR, textStatus, errorThrown) {

				alerta(errorThrown);
				$("#loading").hide();
			})
}

function formatNumber(n) {
	n = String(n).replace(/\D/g, "");
	return n === '' ? n : Number(n).toLocaleString();
}
function format() {
	var number = $('.number');
	for (var i = 0; i < number.length; i++) {
		number[i].addEventListener('keyup', function(e) {
			var element = e.target;
			var value = element.value;
			element.value = formatNumber(value);
		})
	}
}

function ListaSociedad() {

	$.getJSON(
			"/simpleWeb/json/work/ListaSociedad/",
			function(data) {
				datos = data;
				$.each(data, function(k, v) {
					var SelectSociedad = "";
					if (v.idSociedad == -1) {

					} else {
						SelectSociedad += "<option value=" + v.idSociedad + ">"
								+ v.denominacionSociedad + "</option>";

						$("#empresaB").append(SelectSociedad);
						$("#empresaFiniquito").append(SelectSociedad);
						$("#empresaLiquidacion").append(SelectSociedad);
					}
				})
			}).fail(function(jqXHR, textStatus, errorThrown) {

		alerta(errorThrown);
		$("#loading").hide();
	})
}


function ListaBanco() {

	$.getJSON(
			"/simpleWeb/json/work/ListaBanco/",
			function(data) {

				$.each(data, function(k, v) {
					var Selectbanco = "";
					Selectbanco += "<option value=" + v.llave + ">"
							+ v.descripcion + "</option>";

					$("#bancoB").append(Selectbanco);
					$("#bancoFiniquito").append(Selectbanco);
					$("#bancoLiqui").append(Selectbanco);

				})
			}).fail(function(jqXHR, textStatus, errorThrown) {

		alerta(errorThrown);
		$("#loading").hide();
	})
}

function ListaOficina() {

	
	$.ajax(
			{
				url : "/simpleWeb/json/work/ListaOficina/",
				type : "GET",
				async : true,
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Accept",
							"application/json");
					xhr.setRequestHeader(
							"Content-Type",
							"application/json");

				},
				success : function(data, textStatus,
						jqXHR) {
					var SelectOficina = "";
					SelectOficina += "<option value='-1'>Seleccione una Oficina...</option>";
					$.each(data, function(k, v) {
						var arrOf = [];
						if(arrOf.indexOf(v.llave) == -1){
							arrOf.push(v.llave)
							SelectOficina += "<option value=" + v.llave + ">"+ v.descripcion + "</option>";
						}
						

						

					})
					$("#oficina").html(SelectOficina);
					$("#oficinaFiniquito").html(SelectOficina);
					$("#oficinaliquidacion").html(SelectOficina);
					
				}
			}).done(function() {

		$("#loading").hide();
	}).fail(function(jqXHR, textStatus, errorThrown) {

		alerta(errorThrown);
		$("#loading").hide();

	})	
	
	
	
	
	
	
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
function ListaTipodeCuenta() {
	$.getJSON(
			"/simpleWeb/json/work/ListaTipoCuenta/",
			function(data) {
				datos = data;
				$.each(data, function(k, v) {
					var Selectbanco = "";
					
					
					Selectbanco += "<option value=" + v.llave + ">"+ v.descripcion + "</option>";
                    
					$("#selectTipoCuenta").append(Selectbanco);
					$("#selectTipoCuentaLiqui").append(Selectbanco);

				})
			}).fail(function(jqXHR, textStatus, errorThrown) {

		alerta(errorThrown);
		$("#loading").hide();
	})
}

$("#empresaB").change(function() {
	$("#periodoRemuneraciones").val("");
	$("#fechaPago").empty();
	$("#selectTipoCuenta").val("");
	$("#divisionB").val("");
	
	$("#subdivisionB").val("");
	$("#grupoB").val("");
	$("#bancoB").val("");
	$("#montoTotal").val("");
	
	$("#divisionB").empty();
	$("#subdivisionB").empty();
	$("#grupoB").empty();
	$("#subdivisionB").append("<option value='-1'>Seleccione ZONA</option>");
	$("#grupoB").append("<option value='-1'>Seleccione CECO</option>");
	$("#fechaPago").append("<option value=''>Seleccione...</option>");
	
	
	var soc = $("#empresaB").val();
	
	if(soc === '-1'){alerta("Debe Seleccionar una Empresa");return;}

	var soci_sap = "";
	$("#loading").show();
	$.getJSON("/simpleWeb/json/work/getSociedadById/"+$('#empresaB').val()+"" , function(data){
        
		soci_sap = JSON.stringify(data.sociedad);
	
		
	}).done(function() {
		
		$("#divisionB").append("<option value='-1'>Seleccione Huerto</option>");
		var soci_sapFinal  = soci_sap.replace(/\"/g, '');
		$.getJSON("/simpleWeb/json/work/getCampoBySociedad/"+$('#empresaB').val()+"" , function(data){
	     
	      
			let queryString = huertoPrivilege == null ? "" : JSON.stringify(huertoPrivilege).slice(1,-1);
			$.each(data, function(k, v){
				
				  var SelectHuerto = "";	

                if(huertoPrivilege.includes(v.campo) == true){
                	SelectHuerto += 	"<option value="+v.campo+">"+v.descripcion+"</option>";
                }
				$("#divisionB").append(SelectHuerto);
				
				
				
				
				
			})
			
			
		}).done(function() {
			$("#loading").hide();

		})
		

	})
	
	//Buscar();
});

$("#bancoB,#fechaPago,#selectTipoCuenta,#grupoB").change(function() {
	
	var valorTipoCuenta = $("#selectTipoCuenta").val();
	if(valorTipoCuenta == 2){
		
		$("#label_rut_PA_anticipo").show();
		$("#rutPersonaAutorizada").show();
		$("#label_nombre_PA_anticipo").show();
		$("#nombrePersonaAutorizada").show();
		$("#label_oficina").show();
		$(".select2-container--bootstrap .select2-selection--single").css("display", "block");
	}else{
		$("#label_rut_PA_anticipo").hide();
		$("#rutPersonaAutorizada").hide();
		$("#label_nombre_PA_anticipo").hide();
		$("#nombrePersonaAutorizada").hide();
		$("#label_oficina").hide();
		$(".select2-container--bootstrap .select2-selection--single").css("display", "none");
	}
	$("#montoTotal").val("");
	Buscar();
});





$("#divisionB").change(function() 
{
	var huertoValor = $("#divisionB").val();
	
	if(huertoValor == "" || huertoValor == -1){
		
	}
	
	
	
	var zona_sap = "";	 
	$("#loading").show();
	$("#subdivisionB").empty();
	$("#grupoB").empty();
	$("#grupoB").append("<option value='-1'>Seleccione CECO</option>");
	
	
	
	$.getJSON("/simpleWeb/json/work/getCampoByCampo/"+$('#divisionB').val()+"" , function(data){
		
		var SelecZona = "";
		SelecZona +=  "<option value=''>Seleccione ZONA</option>";
		
		$.each(data, function(k, v){
			
			
			
			SelecZona += 	"<option value="+v.grupo+">"+v.zona+"</option>";
			$("#subdivisionB").append(SelecZona);
			
		})
		
	

	
	}).done(function() {
		
		$("#loading").hide();
		
	});
	$("#montoTotal").val("");
	Buscar();
	
});
$("#subdivisionB").change(function() 
{
	
	$("#grupoB").empty();
	var valor_zona = $("#subdivisionB").val();
	
	if(valor_zona == "" || valor_zona == ""){
	
	}else{
		
		var soci_sap = "";
		$("#loading").show();
		$.getJSON("/simpleWeb/json/work/getSociedadById/"+$('#empresaB').val()+"" , function(data){
	        
			soci_sap = JSON.stringify(data.sociedad);
		
			
		}).done(function() {
			
			var CECOAgrupacion;

	        $.each(SESION.campo, function(key, value){

	              if(value.campo == $('#tipodivisionB').val()){

	                    CECOAgrupacion = value.cecos;
	              }
	        });
	        
			
			var soci_sapFinal  = soci_sap.replace(/\"/g, '');
			$.getJSON("http://200.55.206.140/SCLEM/JSON_BAPI_COSTCENTER_GETLIST1.aspx?SOCIEDAD="+$('#empresaB').val()+"&GRUPO="+valor_zona+"&CECO="+CECOAgrupacion , function(data){

				var SelectCECO = "";
				SelectCECO +=  "<option value=''>Seleccione CECO</option>";
			
					
					$.each(data.COSTCENTERLIST, function(k, v){
						
						
						if(v.DESCRIPT.indexOf("Cuartel") > -1 == true ){
							
						}else{SelectCECO += 	"<option value="+v.COSTCENTER+">"+v.DESCRIPT+"</option>";}
			
					})
					$("#grupoB").append(SelectCECO);
					
					
			
				
					$("#loading").hide();
			}).done(function() {
				$("#loading").hide();
			
			})
			

		})
	}
	
	
					
			$("#montoTotal").val("");
			Buscar();
			
});



function idcheck(id) {
	
	var checkval = [];
	
	var table = $('#tbl_Info').DataTable({
        stateSave: true
    } );
 	
	var info = table.page.info();
	var numberpage = info.page;
	
	
	table.rows().every(function(rowIdx, tableLoop, rowLoop) {
		var data = this.node();
		checkval.push($(data).find('input').prop('checked'));

	});
	
	var total2 = 0;
	montoAnticipo = [];
 	
	var cells2 = new Array(); 
	var montoAnticipo = new Array();
	cells2 = table.row().column(9).data().draw();  
	
	for (var i = 0; i < cells2.length; i++) 
	{
	    var montoFila = cells2[i]; var cod = $(montoFila).text().toString().replace(/\./g,'');;
	    montoAnticipo.push(cod);

	}
	
	totalfor = 0;
	for (var i = 0; i < checkval.length; i++) 
	{
	    if(checkval[i] == true){
	    	totalfor =  parseInt(montoAnticipo[i]) + totalfor;
	    }else{
	    	
	    }

	}
	
	var totalAnticipo =  String(totalfor).replace(/(.)(?=(\d{3})+$)/g,'$1.');
	$('#montoTotal').val(totalAnticipo);
	
	 table.page(numberpage).draw(false);
}

function modalAnticipo(){
	
	$("#nombre_nomina_anticipo").modal('hide');
	
	var periodoAdd = $("#periodoRemuneraciones").val();
	var fecha_pagoAdd = $("#fechaPago").val();
	var nFilas = $("#tablePreselect tr").length;
	var existe = $("#tablePreselect td").hasClass("dataTables_empty");
	var emp = $("#empresaB").val();
	var valorTipoCuenta = $("#selectTipoCuenta").val();
	

	if (emp == '') {
		alerta("Debe Seleccionar una Empresa");
		$("#loading").hide();
		$("#empresaB").focus();
		return;
	} else if (periodoAdd == '') {
		alerta("Debe Seleccionar un Periodo");
		$("#periodoRemuneraciones").focus();
		$("#loading").hide();
		return;
	} else if (fecha_pagoAdd == '') {
		alerta("Debe Seleccionar una Fecha  Pago");
		$("#fechaPago").focus();
		$("#loading").hide();
		return;
	} else if (valorTipoCuenta == '') {
		alerta("Debe Seleccionar un Tipo de Cuenta");
		$("#selectTipoCuenta").focus();
		$("#loading").hide();
		return;
	}
	
	else if (nFilas == 0) {
		alerta("No hay datos Disponibles Para Generar el Voucher");
		$("#loading").hide();
		return;
	} else if (existe == true) {
		alerta("No hay datos Disponibles Para Generar el Voucher");
		$("#loading").hide();
		return;
	}
	
	 if(valorTipoCuenta == 2){
			
			if($("#nombrePersonaAutorizada").val() == ""){
				alerta("Debe Ingresar un Nombre Persona Autorizada");
				$("#nombrePersonaAutorizada").focus();
				return;
			}else if($("#rutPersonaAutorizada").val() == ""){
				alerta("Debe Ingresar un RUT Persona Autorizada");
				$("#rutPersonaAutorizada").focus();
				return;
			}else if($("#oficina").val() == -1){
				alerta("Debe Ingresar una oficina");
				$("#oficina").focus();
				return;
			}
			
		}
	$("#nombre_nomina_anticipo").modal('show');
}

function EnviarTesoreria() {
	
	$("#nombre_nomina_anticipo").modal('hide');
	var periodoAdd = $("#periodoRemuneraciones").val();
	var fecha_pagoAdd = $("#fechaPago").val();
	var nFilas = $("#tablePreselect tr").length;
	var existe = $("#tablePreselect td").hasClass("dataTables_empty");
	var emp = $("#empresaB").val();
	var valorTipoCuenta = $("#selectTipoCuenta").val();
	var nombreNomina = $("#nombreNominaAnticipo").val();
	
	

	if (emp == '') {
		alerta("Debe Seleccionar una Empresa");segundoPopup();
		$("#loading").hide();
		$("#empresaB").focus();
		return;
	} else if (periodoAdd == '') {
		alerta("Debe Seleccionar un Periodo");segundoPopup();
		$("#periodoRemuneraciones").focus();
		$("#loading").hide();
		return;
	} else if (fecha_pagoAdd == '') {
		alerta("Debe Seleccionar una Fecha  Pago");segundoPopup();
		$("#fechaPago").focus();
		$("#loading").hide();
		return;
	} else if (valorTipoCuenta == '') {
		alerta("Debe Seleccionar un Tipo de Cuenta");segundoPopup();
		$("#selectTipoCuenta").focus();
		$("#loading").hide();
		return;
	}
	
	else if (nFilas == 0) {
		alerta("No hay datos Disponibles Para Generar el Voucher");segundoPopup();
		$("#loading").hide();
		return;
	} else if (existe == true) {
		alerta("No hay datos Disponibles Para Generar el Voucher");segundoPopup();
		$("#loading").hide();
		return;
	}
	else {
		
		  if(valorTipoCuenta == 2){
				
				if($("#nombrePersonaAutorizada").val() == ""){
					alerta("Debe Ingresar un Nombre Persona Autorizada");segundoPopup();
					$("#nombrePersonaAutorizada").focus();
					return;
				}else if($("#rutPersonaAutorizada").val() == ""){
					alerta("Debe Ingresar un RUT Persona Autorizada");segundoPopup();
					$("#rutPersonaAutorizada").focus();
					return;
				}else if($("#oficina").val() == -1){
					alerta("Debe Ingresar una oficina");segundoPopup();
					$("#oficina").focus();
					return;
				}
				
				 if($.rut.validar($("#rutPersonaAutorizada").val()) && $.trim($("#rutPersonaAutorizada").val()) != ''&&($("#rutPersonaAutorizada").val().length<13))
				  {
					 
				  }
				  else{
					  alerta("Rut Incorrecto");
					  $("#rutPersonaAutorizada").focus();segundoPopup();
						return;
				  }
				
			}

		var montotal = $("#montoTotal").val();
		montotal = montotal.toString().replace(/\./g, '');
		var NumeroEmpresa = $("#empresaB").val();
		periodoAdd2 = $("#periodoRemuneraciones").val().replace(/-/gi, "");
		emepresavalor = $("#empresaB option:selected").text();
		
	    var periodo_String =  $("#periodoRemuneraciones").val();
		
		
		var rut_autorizado = $("#rutPersonaAutorizada").val();
		var valoroficina = $("#oficina").val();
		var nombre_oficina = $('#oficina').select2('data')
		var nombre_oficina_string = nombre_oficina[0].text;
		
		var rutautorizado2 = rut_autorizado.toString().replace(/\./g, '');
		var rutautorizadofinal1 = rutautorizado2.toString().replace(/\-/g, '');
		var rutautorizadofinal = rutautorizadofinal1.toUpperCase();

		var checkval = [];
		var table = $('#tbl_Info').DataTable();
		table.rows().every(function(rowIdx, tableLoop, rowLoop) {
			var data = this.node();
			checkval.push($(data).find('input').prop('checked'));

		});
		
		var total2 = 0;
		montoFiniquito = [];
	 	
		var cells2 = new Array(); 
		var montoFiniquito = new Array();
		cells2 = table.row().column(9).data().draw();  
		
		for (var i = 0; i < cells2.length; i++) 
		{
		    var montoFila = cells2[i]; var cod = $(montoFila).text().toString().replace(/\./g,'');;
		    montoFiniquito.push(cod);

		}
		
		
		var cellsDireccion = new Array(); 
		 var textDireccion = new Array();
		 cellsDireccion = table.row().column(13).data().draw();  
		 for (var i = 0; i < cellsDireccion.length; i++) 
		 {
		     	var textDirecc = cellsDireccion[i]; 
		     	var textDirecc2 = $(textDirecc).text();
		     	textDireccion.push(textDirecc2);

		}
		 
		// fecha anticipo
		 
		 var cellsFechaAnticipo = new Array(); 
		 var fecha_anticipo = new Array();
		 var fecha_anticipoPoint = new Array();
		 cellsFechaAnticipo = table
		    .row()
		    .column(1).data().draw();  for (var i = 0; i < cellsFechaAnticipo.length; i++) {
			var fechaAnticipo = cellsFechaAnticipo[i];
			var pe = $(fechaAnticipo).text();
			var ftU = pe.split('-');
			var ftU2 = ftU[2] +"-"+ ftU[1] +"-"+ ftU[0];
		    fecha_anticipo.push(ftU2);
		    
		    var ftU3 = ftU[2] + ftU[1] + ftU[0];
		    fecha_anticipoPoint.push(ftU3);
		    
		}
		    
		// codigo trabajador 
		    var cellsCodigoTrabajador = new Array(); 
			 var codigo = new Array();
			 cellsCodigoTrabajador = table
			    .row()
			    .column(2).data().draw();  for (var i = 0; i < cellsCodigoTrabajador.length; i++) {
			     	var cod_trabajador = cellsCodigoTrabajador[i]; var cod = $(cod_trabajador).text();
			    codigo.push(cod);

			}
	    // id banco 
			    var cellsIdBanco = new Array(); 
				 var id_banco = new Array();
				 cellsIdBanco = table.row().column(5).data().draw(); 
				 for (var i = 0; i < cellsIdBanco.length; i++) {
				     	var idbanco1 = cellsIdBanco[i]; 
				     	var idbanco2 = $(idbanco1).text();
				     	id_banco.push(idbanco2);

				}
		// id tabla finiquito
				 
				    var cellsIdTablaFiniquito = new Array(); 
					 var id_tabla = new Array();
					 cellsIdTablaFiniquito = table.row().column(10).data().draw(); 
					 for (var i = 0; i < cellsIdTablaFiniquito.length; i++) {
					     	var idtabla1 = cellsIdTablaFiniquito[i]; 
					     	var idtabla2 = $(idtabla1).text();
					     	id_tabla.push(idtabla2);

					}
		// id tipo cuenta
					 
					    var cellsIdTipoCuenta = new Array(); 
						 var id_tipo_cuenta = new Array();
						 cellsIdTipoCuenta = table.row().column(8).data().draw(); 
						 for (var i = 0; i < cellsIdTipoCuenta.length; i++) {
						     	var idtipocuenta1 = cellsIdTipoCuenta[i]; 
						     	var idtipocuenta2 = $(idtipocuenta1).text();
						     	id_tipo_cuenta.push(idtipocuenta2);

						}
		// nombre tipo cuenta
						 
						    var cellsNombreTipoCuenta = new Array(); 
							 var nombre_tipo_cuenta = new Array();
							 cellsNombreTipoCuenta = table.row().column(7).data().draw(); 
							 for (var i = 0; i < cellsNombreTipoCuenta.length; i++) {
							     	var nombretipocuenta1 = cellsNombreTipoCuenta[i]; 
							     	var nombretipocuenta2 = $(nombretipocuenta1).text();
							     	nombre_tipo_cuenta.push(nombretipocuenta2);

							}
		// nombre BANCO
							 
							    var cellsNombreBanco = new Array(); 
								 var nombre_banco = new Array();
								 cellsNombreBanco = table.row().column(4).data().draw(); 
								 for (var i = 0; i < cellsNombreBanco.length; i++) {
								     	var nombrebanco1 = cellsNombreBanco[i]; 
								     	nombre_banco.push(nombrebanco1);

								}
	// numero de cuenta
								 
								    var cellsNCuenta = new Array(); 
									 var numero_cuenta = new Array();
									 cellsNCuenta = table.row().column(6).data().draw(); 
									 for (var i = 0; i < cellsNCuenta.length; i++) {
									     	var numerocuenta1 = cellsNCuenta[i]; 
									     	numero_cuenta.push(numerocuenta1);

									}
	// nombre trabajador
	
									 var cellsNombreTrabajador = new Array(); 
									 var nombre_trabajador = new Array();
								
									 cellsNombreTrabajador = table
									    .row()
									    .column(3).data().draw();  for (var i = 0; i < cellsNombreTrabajador.length; i++) {
										var nombre1 = cellsNombreTrabajador[i];
										var nombre2 = $(nombre1).text();
										
										var nombre3 = nombre2.split(' ');
										
										
										if(nombre3.length == 3){
											var nombre4 = nombre3[2] +" "+ nombre3[1] +" "+ nombre3[0];
										}else{
											var nombre4 = nombre2;
										}
										nombre_trabajador.push(nombre4);
									    
									   
									    
									}
	 // rut trabajador 
									    
									    var cellsRutTrabajador = new Array(); 
										 var rut_trabajador = new Array();
									
										 cellsRutTrabajador = table
										    .row()
										    .column(12).data().draw();  for (var i = 0; i < cellsRutTrabajador.length; i++) {
											var ruttrabajador1 = cellsRutTrabajador[i];
											var ruttrabajador2 = $(ruttrabajador1).text().toString().replace(/\./g, '');
											var ruttrabajador3 = ruttrabajador2.toString().replace(/\-/g, '');
											rut_trabajador.push(ruttrabajador3);
										    
										   
										    
										}
										    
										    // huerto trabajador 
										    
										    var cellsHuerto = new Array(); 
											 var huerto_trabajador = new Array();
										
											 cellsHuerto = table
											    .row()
											    .column(14).data().draw();  for (var i = 0; i < cellsHuerto.length; i++) {
												var huertotrabajador1 = cellsHuerto[i];
												var huertottrabajador2 = $(huertotrabajador1).text().toString().replace(/\./g, '');
												var huertotrabajador3 = huertottrabajador2.toString().replace(/\-/g, '');
												huerto_trabajador.push(huertotrabajador3.toUpperCase());
											    
											   
											    
											}
									    
									
		 
		 
		
		peticion2 = [];
		totalfor = 0;
		for (var i = 0; i < checkval.length; i++) 
		{
		    if(checkval[i] == true){
		    	 var montoString = parseInt(montoFiniquito[i]) + totalfor;
		    	 var montoStringFinal = montoString.toString().replace(/\./g, '')
		    	      	var json2 = {
							periodo_string : periodoAdd2,
							fechaanticipo : fecha_anticipo[i],
							cod_trabajador_string :codigo[i],
							nombre : nombre_trabajador[i],
							nombrebanco : nombre_banco[i],
							numero_cuenta_string : numero_cuenta[i],
							nombretipocuenta : nombre_tipo_cuenta[i],
							monto_ingresado_string : montoStringFinal,
							idtabla_sw_asignacionAnticipos : id_tabla[i],
							totalmonto : montotal,
							periodo : periodoAdd2,
							rut : rut_trabajador[i],
							fechaanticipoint : fecha_anticipoPoint[i],
							empresa : NumeroEmpresa,
							idbanco : id_banco[i],
							nombre_autorizada : $("#nombrePersonaAutorizada").val(),
							rut_autorizada : rut_autorizado,
                            rut_autorizado_replace : rutautorizadofinal,
                            idtipocuentastring :  id_tipo_cuenta[i],
                            direccion : textDireccion[i],
                            oficina_string : valoroficina,
                            nombre_nomina : nombreNomina,
                            idconcepto : 1,
                            nombre_oficina_string : nombre_oficina_string,
                            empresatext : emepresavalor,
                            periodoString :periodo_String,
                            nombrehuerto  : huerto_trabajador[i]
						}     
		    	 peticion2.push(json2); 
		    	
		    }else{
		    	
		    }
		     
		}
		
		
		
		$("#loading").show();
				

         
		$.ajax({
			url : "/simpleWeb/json/work/CrearCSVMAsMail/",
			type : "PUT",
			async : true,
			data : JSON.stringify(peticion2),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");

			},
			success : function(data, textStatus, jqXHR) {
				
				
				var tableadd = $('#tbl_Info').DataTable();
				tableadd.clear().draw();
				
				$("#wait").css("display", "none");
				Buscar();
				$("#montoTotal").val("");
				$("#fechaPago").empty();
				var fechaPagoclean = "";
				fechaPagoclean += "<option value=''>Seleccione...</option>";
				$("#fechaPago").append(fechaPagoclean);
				$("#periodoRemuneraciones").val("");
				$("#label_rut_PA_anticipo").hide();
				$("#rutPersonaAutorizada").hide();
				$("#rutPersonaAutorizada").val("");
				$("#nombreNominaAnticipo").val("");
				$("#empresaB").val("");
				
				
				$("#label_nombre_PA_anticipo").hide();
				$("#nombrePersonaAutorizada").hide();
				$("#nombrePersonaAutorizada").val("");
				$(".select2-container--bootstrap .select2-selection--single").css("display", "none");
			}
		}).done(function() {

			$("#loading").hide();
			$("#nombre_nomina_anticipo").modal('hide');
			alerta("Nomina Generada con Exito")
		}).fail(function(jqXHR, textStatus, errorThrown) {

			alerta(errorThrown);

		})

	} // end else
}

$("#periodoRemuneraciones").change(
				function() {

					$("#fechaPago").empty();
					var empresa = $("#empresaB").val();
					var periodo = $("#periodoRemuneraciones").val();

					if (empresa == '') {
						alerta("Debe Seleccionar una Empresa");
						$("#empresaB").focus();
						return
					} else if (periodo == '') {
						alerta("Debe Seleccionar un Periodo");
						$("#periodoRemuneraciones").focus();
						return
					}

					var fechaPago2 = "";
					fechaPago2 += "<option value=''>Seleccione...</option>";
					periodo = $("#periodoRemuneraciones").val().replace(/-/gi,
							"");

					$("#loading").show();
					$
							.ajax(
									{
										url : "/simpleWeb/json/work/fechaAnticipoEmpresaYPeriodo/"
												+ empresa + "," + periodo,
										type : "GET",
										async : true,
										beforeSend : function(xhr) {
											xhr.setRequestHeader("Accept",
													"application/json");
											xhr.setRequestHeader(
													"Content-Type",
													"application/json");

										},
										success : function(data, textStatus,
												jqXHR) {
											$.each(data, function(k, v) {
												var ftSelect = v.fechaanticipo
														.split('-');
												fechaPagoSelect = ftSelect[2]
														+ "-" + ftSelect[1]
														+ "-" + ftSelect[0];

												fechaPago2 += "<option value="
														+ fechaPagoSelect + ">"
														+ fechaPagoSelect
														+ "</option>";

											})
											$("#fechaPago").append(fechaPago2);
										}
									}).done(function() {

								$("#loading").hide();
							}).fail(function(jqXHR, textStatus, errorThrown) {

								alerta(errorThrown);
								$("#loading").hide();

							})
				});
$("#TipoNomina").change(function() {
	
	var TipoNomina = $("#TipoNomina").val();
    
	//anticipo clean
	$("#bancoB,#empresaB,#periodoRemuneraciones,#selectTipoCuenta").val("");
	$("#nombrePersonaAutorizada,#rutPersonaAutorizada").val("");
	$("#oficina").val("-1");
	$("#divisionB").empty("");
	$("#subdivisionB").empty();
	$("#grupoB").empty();
	$("#divisionB").append("<option value='-1'>Seleccione Huerto</option>");
	$("#subdivisionB").append("<option value='-1'>Seleccione ZONA</option>");
	$("#grupoB").append("<option value='-1'>Seleccione CECO</option>");
	$("#label_rut_PA_anticipo").hide();
	$("#rutPersonaAutorizada").hide();
	$("#label_nombre_PA_anticipo").hide();
	$("#nombrePersonaAutorizada").hide();
	$("#label_oficina").hide();
	
	//liquidacion clean
	$("#bancoLiqui,#empresaLiquidacion,#periodoRemuneracionesLiqui,#selectTipoCuentaLiqui").val("");
	$("#nombrePersonaAutorizadaliquidacion,#rutPersonaAutorizadaliquidacion").val("");
	$("#oficinaliquidacion").val("-1");
	$("#divisionLiqui").empty();
	$("#subdivisionLiqui").empty();
	$("#grupoLiqui").empty();
	$("#divisionLiqui").append("<option value='-1'>Seleccione Huerto</option>");
	$("#subdivisionLiqui").append("<option value='-1'>Seleccione ZONA</option>");
	$("#grupoLiqui").append("<option value='-1'>Seleccione CECO</option>");
	$("#label_rut_PA_liquidacion").hide();
	$("#rutPersonaAutorizadaliquidacion").hide();
	$("#label_nombre_PA_liquidacion").hide();
	$("#nombrePersonaAutorizadaliquidacion").hide();
	$("#label_oficinaliquidacion").hide();
	
	//finiquito clean
	$("#bancoFiniquito,#empresaFiniquito,#periodoRemuneracionesFiniquito,#selectTipoCuentaFiniquito").val("");
	$("#nombrePersonaAutorizadaFiniquito,#rutPersonaAutorizadaFiniquito").val("");
	$("#oficinaFiniquito").val("-1");
	$("#divisionFiniquito").empty();
	$("#subdivisionFiniquito").empty();
	$("#grupoFiniquito").empty();
	$("#divisionFiniquito").append("<option value='-1'>Seleccione Huerto</option>");
	$("#subdivisionFiniquito").append("<option value='-1'>Seleccione ZONA</option>");
	$("#grupoFiniquito").append("<option value='-1'>Seleccione CECO</option>");
	$("#label_rut_PA_finiquito").hide();
	$("#rutPersonaAutorizadaFiniquito").hide();
	$("#label_nombre_PA_finiquito").hide();
	$("#nombrePersonaAutorizadaFiniquito").hide();
	$("#label_oficina_finiquito").hide();
	
	
	
	$(".select2-container--bootstrap .select2-selection--single").css("display", "none");
	

	
	var tableadd = $('#tbl_Info').DataTable();
	tableadd.clear().draw();
	
	var table = $('#tbl_Info2').DataTable();
    table.clear().draw();
    
	
	var tableadd3 = $('#tbl_Info3').DataTable();
	tableadd3.clear().draw();

	var elemento = document.getElementsByClassName('valoridEmpresa');
	var id = elemento[0].getAttribute('id');

	if (TipoNomina == 1) {

		$("#empresaB").show();
		$("#divAnticipo").show();
		$("#tblAnticipo").show();
		$("#botonAnticipos").show();

		$("#empresaFiniquito").hide();
		$("#divFiniquito").hide();
		$("#tblFiniquito").hide();
		$("#botonFiniquito").hide();

		$("#empresaLiquidacion").hide();
		$("#divLiquidacion").hide();
		$("#tblLiquidacion").hide();
		$("#botonLiquidacion").hide();
	} else if (TipoNomina == 2) {

		$("#empresaFiniquito").show();
		$("#divFiniquito").show();
		$("#tblFiniquito").show();
		$("#botonFiniquito").show();

		$("#empresaB").hide();
		$("#divAnticipo").hide();
		$("#tblAnticipo").hide();
		$("#botonAnticipos").hide();

		$("#empresaLiquidacion").hide();
		$("#divLiquidacion").hide();
		$("#tblLiquidacion").hide();
		$("#botonLiquidacion").hide();
	} else if (TipoNomina == 3) {

		$("#empresaLiquidacion").show();
		$("#divLiquidacion").show();
		$("#tblLiquidacion").show();
		$("#botonLiquidacion").show();

		$("#empresaFiniquito").hide();
		$("#divFiniquito").hide();
		$("#tblFiniquito").hide();
		$("#botonFiniquito").hide();

		$("#empresaB").hide();
		$("#divAnticipo").hide();
		$("#tblAnticipo").hide();
		$("#botonAnticipos").hide()

	}

});

// nomina Finiquito

function BuscarFiniquito() {

	var table = $('#tbl_Info2').DataTable();
    table.clear().draw();

	var banco = $("#bancoFiniquito").val();

	if (banco == '') {
		banco = null;
	} else {
		banco = $("#bancoFiniquito").val();
	}

	var fechatermino = $("#fechaTerminoContratoFiniquito").val();

	if (fechatermino == '' || fechatermino == null) {
		fechatermino = null;
	} else {
		var ftU = fechatermino.split('-');
		fechatermino = ftU[2] + "-" + ftU[1] + "-" + ftU[0];
	}

	var tipo_cuenta = $("#selectTipoCuentaFiniquito").val();

	if (tipo_cuenta == '') {
		tipo_cuenta = null;
	} else {
		tipo_cuenta = $("#selectTipoCuentaFiniquito").val();
	}

	var empresa = $("#empresaFiniquito").val();

	if (empresa == '') {
		alerta("Debe Seleccionar una Empresa");
		$("#empresaFiniquito").focus();
		return;
	} else {
		empresa = $("#empresaFiniquito").val();
	}

	var division = $("#divisionFiniquito").val();
	if (division === "-1") {
		division = null;
	} else if (division == '') {
		division = null;
	} else {
		division = $("#divisionFiniquito").val();
	}
     
	var subdivision = $("#subdivisionFiniquito").val();
	
	
	if (subdivision === "-1") {
		subdivision = null;
	} else if (subdivision == '') {
		subdivision = null;
	} else {
		subdivision = null;
	}



	var grupo = $("#grupoFiniquito").val();
	if (grupo === "-1") {
		grupo = null;
	} else if (grupo == '') {
		grupo = null;
	} else {
		grupo = $("#grupoFiniquito").val();
	}
	
	var periodo = $("#periodoRemuneracionesFiniquito").val();

	if (periodo == '') {
		periodo = null;
	} else {
		periodo = $("#periodoRemuneracionesFiniquito").val().replace(/-/gi, "");
	}


	$('#tbl_Info').dataTable().fnClearTable();
	$('#tbl_Info').dataTable().fnDestroy();

	$("#loading").show();

	$
			.getJSON(
					"/simpleWeb/json/work/BuscarNominaPagoFiniquito/"
							+ fechatermino + "," + tipo_cuenta + "," + empresa
							+ "," + division + "," + subdivision + "," + grupo
							+ "," + banco +","+periodo,
					function(data) {
                  debugger;
						var numero = 1;
						$.each(data,function(k, v)
						{
                              console.log("Analizar Codigo : " + v.cod_trabajador);              
							var valNew = v.fechaPago.split('-');
						    var fechap = valNew[2]+"-"+valNew[1]+"-"+valNew[0];
										    
						    var tableadd = $('#tbl_Info2').DataTable();
						    
						    tableadd.row.add( [
						           			"<td><input type='checkbox' id='inlineCheckbox"+ k + "' value='option2' checked onchange='idcheckFiniquito(this.id);' ></td>",
						           			"<td>"+ fechap + "</td>",
						           			"<td>"+ v.cod_trabajador +"</td>",
						           			"<td>"+ v.apellidopaterno + " " + v.apellidomaterno + " " + v.nombre +"</td>",
						           			"<td>"+ v.nombrebanco != "null" ? v.nombrebanco : ""  + "</td>",
						           			"<td>"+ v.idbanco + "</td>",
						           			"<td>"+ v.numero_cuenta_string != "null" ? v.numero_cuenta_string : "" + "</td>",
						           			"<td>"+ v.nombretipocuenta +"</td>",
						           			"<td>"+ v.idtipocuenta +"</td>",
						           			"<td>"+ String(v.totalpagofiniquito).replace(/(.)(?=(\d{3})+$)/g,'$1.') +"</td>",
						           			"<td>"+ v.idtablafiniquito+"</td>",
						           			"<td>"+ v.periodo +"</td>",
						           			"<td>"+ v.rut + "</td>",
						           			"<td>"+ v.direccion + "</td>",
						           			"<td>"+ v.nombrehuerto + "</td>"
						           
						           			] ).node().id = "td"+k;
						           	tableadd.draw();
						                   


								var total2 = 0;
								montoFiniquito = [];
							 	
								var cells2 = new Array(); 
								var montoFiniquito = new Array();
								cells2 = tableadd.row().column(9).data().draw();  for (var i = 0; i < cells2.length; i++) 
								{
								    var montoFila = cells2[i]; var cod = $(montoFila).text().toString().replace(/\./g,'');;
								    montoFiniquito.push(cod);

								}
								
								var total = 0;
								
								for (var i = 0; i < montoFiniquito.length; i++) 
								{
									total = parseInt(montoFiniquito[i]) + total ;
								}
								total2 = String(total).replace(/(.)(?=(\d{3})+$)/g,'$1.');
								$('#montoTotalFiniquito').val(total2);
	                           
								
								
								

						})// end each
						
						
												
							
						$("#loading").hide();
						
				

					}).fail(function(jqXHR, textStatus, errorThrown) {

				alerta(errorThrown);
				$("#loading").hide();
			})
}


function EnviarTesoreriaFiniquito() {
	
	$("#nombre_nomina_finiquito").modal('hide');
	var fecha_pagoAdd = $("#fechaTerminoContrato").val();
	var nFilas = $("#tablePreselectFiniquito tr").length;
	var existe = $("#tablePreselect td").hasClass("dataTables_empty");
	var emp = $("#empresaFiniquito").val();
	var periodoFini = $("#periodoRemuneracionesFiniquito").val();
	
	var rut_autorizado = $("#rutPersonaAutorizadaFiniquito").val();
	
	var rutautorizado2 = rut_autorizado.toString().replace(/\./g, '');
	var rutautorizadofinal1 = rutautorizado2.toString().replace(/\-/g, '');
	var rutautorizadofinal = rutautorizadofinal1.toUpperCase();
	
	var valoroficina = $("#oficinaFiniquito").val();
	var nombre_oficina = $('#oficinaFiniquito').select2('data')
	var nombre_oficina_string = nombre_oficina[0].text;

	if (emp == '') {
		alerta("Debe Seleccionar una Empresa");segundoPopup();
		$("#loading").hide();
		$("#empresaFiniquito").focus();
		return;
	}

	else if (periodoFini == '') {
		alerta("Debe Seleccionar un Periodo");
		$("#periodoRemuneracionesFiniquito").focus();segundoPopup();
		$("#loading").hide();
		return;
	} else if (fecha_pagoAdd == '') {
		alerta("Debe Seleccionar una Fecha  Pago");
		$("#fechaTerminoContrato").focus();
		$("#loading").hide();
		return;
	} else if (nFilas == 0) {
		alerta("No hay datos Disponibles Para Generar el Voucher");segundoPopup();
		$("#loading").hide();
		return;
	} else if (existe == true) {
		alerta("No hay datos Disponibles Para Generar el Voucher");segundoPopup();
		$("#loading").hide();
		return;
	} else {
		    var  valorTipoCuenta = $("#selectTipoCuentaFiniquito").val();
		  if(valorTipoCuenta == 2){
				
				if($("#nombrePersonaAutorizadaFiniquito").val() == ""){
					alerta("Debe Ingresar un Nombre Persona Autorizada");
					segundoPopup();
					$("#nombrePersonaAutorizadaFiniquito").focus();
					return;
				}else if($("#rutPersonaAutorizadaFiniquito").val() == ""){
					alerta("Debe Ingresar un RUT Persona Autorizada");
					segundoPopup();
					$("#rutPersonaAutorizadaFiniquito").focus();
					return;
				}else if($("#oficinaFiniquito").val() == -1){
					alerta("Debe Ingresar una oficina");
					segundoPopup();
					$("#oficinaFiniquito").focus();
					return;
				}
				
				 if($.rut.validar($("#rutPersonaAutorizadaFiniquito").val()) && $.trim($("#rutPersonaAutorizadaFiniquito").val()) != ''&&($("#rutPersonaAutorizadaFiniquito").val().length<13))
				  {
					 
				  }
				  else{
					  alerta("Rut Incorrecto");
					  segundoPopup();
					  $("#rutPersonaAutorizadaFiniquito").focus();
						return;
				  }
				
			}
		var periodo_String =  $("#periodoRemuneracionesFiniquito").val();
		emepresavalor = $("#empresaFiniquito option:selected").text();
		
		var montotal = $("#montoTotalFiniquito").val();
		montotal = montotal.toString().replace(/\./g, '');
		
		var NumeroEmpresa = $("#empresaFiniquito").val();
		var periodoFiniquito = $("#periodoRemuneracionesFiniquito").val().replace(/-/gi, "");
		
		
		
		var checkval = [];
		var table = $('#tbl_Info2').DataTable();
		table.rows().every(function(rowIdx, tableLoop, rowLoop) {
			var data = this.node();
			checkval.push($(data).find('input').prop('checked'));

		});
		
		var total2 = 0;
		montoFiniquito = [];
	 	
		var cells2 = new Array(); 
		var montoFiniquito = new Array();
		cells2 = table.row().column(9).data().draw();  
		
		for (var i = 0; i < cells2.length; i++) 
		{
		    var montoFila = cells2[i]; var cod = $(montoFila).text().toString().replace(/\./g,'');;
		    montoFiniquito.push(cod);

		}
		
		
		var cellsDireccion = new Array(); 
		 var textDireccion = new Array();
		 cellsDireccion = table.row().column(13).data().draw();  
		 for (var i = 0; i < cellsDireccion.length; i++) 
		 {
		     	var textDirecc = cellsDireccion[i]; 
		     	var textDirecc2 = $(textDirecc).text();
		     	textDireccion.push(textDirecc2);

		}
		 
		// fecha anticipo
		 
		 var cellsFechaAnticipo = new Array(); 
		 var fecha_anticipo = new Array();
		 var fecha_anticipoPoint = new Array();
		 cellsFechaAnticipo = table
		    .row()
		    .column(1).data().draw();  for (var i = 0; i < cellsFechaAnticipo.length; i++) {
			var fechaAnticipo = cellsFechaAnticipo[i];
			var pe = $(fechaAnticipo).text();
			var ftU = pe.split('-');
			var ftU2 = ftU[2] +"-"+ ftU[1] +"-"+ ftU[0];
		    fecha_anticipo.push(ftU2);
		    
		    var ftU3 = ftU[2] + ftU[1] + ftU[0];
		    fecha_anticipoPoint.push(ftU3);
		    
		}
		    
		// codigo trabajador 
		    var cellsCodigoTrabajador = new Array(); 
			 var codigo = new Array();
			 cellsCodigoTrabajador = table
			    .row()
			    .column(2).data().draw();  for (var i = 0; i < cellsCodigoTrabajador.length; i++) {
			     	var cod_trabajador = cellsCodigoTrabajador[i]; var cod = $(cod_trabajador).text();
			    codigo.push(cod);

			}
	    // id banco 
			    var cellsIdBanco = new Array(); 
				 var id_banco = new Array();
				 cellsIdBanco = table.row().column(5).data().draw(); 
				 for (var i = 0; i < cellsIdBanco.length; i++) {
				     	var idbanco1 = cellsIdBanco[i]; 
				     	var idbanco2 = $(idbanco1).text();
				     	id_banco.push(idbanco2);

				}
		// id tabla finiquito
				 
				    var cellsIdTablaFiniquito = new Array(); 
					 var id_tabla = new Array();
					 cellsIdTablaFiniquito = table.row().column(10).data().draw(); 
					 for (var i = 0; i < cellsIdTablaFiniquito.length; i++) {
					     	var idtabla1 = cellsIdTablaFiniquito[i]; 
					     	var idtabla2 = $(idtabla1).text();
					     	id_tabla.push(idtabla2);

					}
		// id tipo cuenta
					 
					    var cellsIdTipoCuenta = new Array(); 
						 var id_tipo_cuenta = new Array();
						 cellsIdTipoCuenta = table.row().column(8).data().draw(); 
						 for (var i = 0; i < cellsIdTipoCuenta.length; i++) {
						     	var idtipocuenta1 = cellsIdTipoCuenta[i]; 
						     	var idtipocuenta2 = $(idtipocuenta1).text();
						     	id_tipo_cuenta.push(idtipocuenta2);

						}
		// nombre tipo cuenta
						 
						    var cellsNombreTipoCuenta = new Array(); 
							 var nombre_tipo_cuenta = new Array();
							 cellsNombreTipoCuenta = table.row().column(7).data().draw(); 
							 for (var i = 0; i < cellsNombreTipoCuenta.length; i++) {
							     	var nombretipocuenta1 = cellsNombreTipoCuenta[i]; 
							     	var nombretipocuenta2 = $(nombretipocuenta1).text();
							     	nombre_tipo_cuenta.push(nombretipocuenta2);

							}
		// nombre BANCO
							 
							    var cellsNombreBanco = new Array(); 
								 var nombre_banco = new Array();
								 cellsNombreBanco = table.row().column(4).data().draw(); 
								 for (var i = 0; i < cellsNombreBanco.length; i++) {
								     	var nombrebanco1 = cellsNombreBanco[i]; 
								     	var nombrebanco2 = $(nombrebanco1).text();
								     	nombre_banco.push(nombrebanco2);

								}
	// numero de cuenta
								 
								    var cellsNCuenta = new Array(); 
									 var numero_cuenta = new Array();
									 cellsNCuenta = table.row().column(6).data().draw(); 
									 for (var i = 0; i < cellsNCuenta.length; i++) {
									     	var numerocuenta1 = cellsNCuenta[i]; 
									     	var numerocuenta2 = $(numerocuenta1).text();
									     	numero_cuenta.push(numerocuenta2);

									}
	// nombre trabajador
	
									 var cellsNombreTrabajador = new Array(); 
									 var nombre_trabajador = new Array();
								
									 cellsNombreTrabajador = table
									    .row()
									    .column(3).data().draw();  for (var i = 0; i < cellsNombreTrabajador.length; i++) {
										var nombre1 = cellsNombreTrabajador[i];
										var nombre2 = $(nombre1).text();
										
										var nombre3 = nombre2.split(' ');
										if(nombre3.length == 3){
											var nombre4 = nombre3[2] +" "+ nombre3[1] +" "+ nombre3[0];
										}else{
											var nombre4 = nombre2;
										}
										nombre_trabajador.push(nombre4);
									    
									   
									    
									}
	 // rut trabajador 
									    
									    var cellsRutTrabajador = new Array(); 
										 var rut_trabajador = new Array();
									
										 cellsRutTrabajador = table
										    .row()
										    .column(12).data().draw();  for (var i = 0; i < cellsRutTrabajador.length; i++) {
											var ruttrabajador1 = cellsRutTrabajador[i];
											var ruttrabajador2 = $(ruttrabajador1).text().toString().replace(/\./g, '');
											var ruttrabajador3 = ruttrabajador2.toString().replace(/\-/g, '');
											rut_trabajador.push(ruttrabajador3);
										    
										   
										    
										}
									    
// huerto trabajador 
										    
										    var cellsHuerto = new Array(); 
											 var huerto_trabajador = new Array();
										
											 cellsHuerto = table
											    .row()
											    .column(14).data().draw();  for (var i = 0; i < cellsHuerto.length; i++) {
												var huertotrabajador1 = cellsHuerto[i];
												var huertottrabajador2 = $(huertotrabajador1).text().toString().replace(/\./g, '');
												var huertotrabajador3 = huertottrabajador2.toString().replace(/\-/g, '');
												huerto_trabajador.push(huertotrabajador3.toUpperCase());
											    
											   
											    
											}							
		 
		 
		
		peticion2 = [];
		totalfor = 0;
		for (var i = 0; i < checkval.length; i++) 
		{
		    if(checkval[i] == true){
		    	 var montoString = parseInt(montoFiniquito[i]) + totalfor;
		    	 var montoStringFinal = montoString.toString().replace(/\./g, '')
		    	      var json2 = {
		    	    		 
		    	    		        
		    	    		        cod_trabajador_string  : codigo[i],
		    	    		        direccion : textDireccion[i],
		    	    		        empresa : NumeroEmpresa,
		    	    		        fechaanticipo : fecha_anticipo[i],
		    	    		        fechaanticipoint : fecha_anticipoPoint[i],
		    	    		        idbanco : id_banco[i],
		    	    		        idconcepto : 3,
		    	    		        idtablafiniquito : id_tabla[i],
		    	    		        idtipocuentastring : id_tipo_cuenta[i],
		    	    		        monto_ingresado_string : montoStringFinal,
		    	    		        nombre : nombre_trabajador[i],
		    	    		        nombre_autorizada :	$("#nombrePersonaAutorizadaFiniquito").val(), 
		    	    		        nombre_nomina : $("#nombreNominaFiniquito").val(),
		    	    		        nombre_oficina_string : nombre_oficina_string,
		    	    		        nombrebanco : nombre_banco[i],
		    	    		        nombretipocuenta : nombre_tipo_cuenta[i],									
		    	    		        numero_cuenta_string : numero_cuenta[i],
		    	    		        oficina_string : valoroficina,
		    	    		        periodo : periodoFiniquito,
		    	    		        periodo_string : periodoFiniquito,
				    	    		rut : rut_trabajador[i],
				    	    		rut_autorizada : rut_autorizado,
				    	    		rut_autorizado_replace : rutautorizadofinal,
				    	    		totalmonto : montotal,
				    	    		valor_select_tipo_cuenta : $("#selectTipoCuentaFiniquito").val(),
				    	    		empresatext : emepresavalor,
									periodoString :periodo_String,
									nombrehuerto  : huerto_trabajador[i]
				    	    			
				    	    		
				    	    
		    	    		        

		    	    		        
		    	                  }      
		    	 peticion2.push(json2); 
		    	
		    }else{
		    	
		    }
		     
		}
		
		
		$("#loading").show();

	 

		$.ajax({
			url : "/simpleWeb/json/work/CrearTxtMAsMailFiniquito/",
			type : "PUT",
			async : true,
			data : JSON.stringify(peticion2),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");

			},
			success : function(data, textStatus, jqXHR) {
				var table = $('#tbl_Info2').DataTable();
			    table.clear().draw();
				$("#wait").css("display", "none");
				BuscarFiniquito();
				$("#montoTotalFiniquito").val("");
				$("#fechaTerminoContratoFiniquito").empty();
				$("#periodoRemuneracionesFiniquito").val("");
				$("#selectTipoCuentaFiniquito").val("");
				$("#nombrePersonaAutorizadaFiniquito").val("");
				$("#rutPersonaAutorizadaFiniquito").val("");
				$("#oficinaFiniquito").val("-1");
				$("#selectTipoCuentaFiniquito").val("");
				$("#nombreNominaFiniquito").val("");
				$("#empresaFiniquito").val("");
				
				
				
				

				var fechaPagoclean = "";
				fechaPagoclean += "<option value=''>Seleccione...</option>";
				$("#fechaTerminoContratoFiniquito").append(fechaPagoclean);
			}
		}).done(function() {
			$("#nombre_nomina_finiquito").modal('hide');
			$("#loading").hide();
			alerta("Nomina Finiquito Generada con Exito")
		}).fail(function(jqXHR, textStatus, errorThrown) {
			$("#loading").hide();
			alerta(errorThrown);

		})
  
	} // end else
	
	
}
function idcheckFiniquito(id) {
	
	var checkval = [];
	
	
	var table = $('#tbl_Info2').DataTable({
        stateSave: true
    } );
 	
	var info = table.page.info();
	var numberpage = info.page;
	
	table.rows().every(function(rowIdx, tableLoop, rowLoop) {
		var data = this.node();
		checkval.push($(data).find('input').prop('checked'));

	});
	
	var total2 = 0;
	montoFiniquito = [];
 	
	var cells2 = new Array(); 
	var montoFiniquito = new Array();
	cells2 = table.row().column(9).data().draw();  
	
	for (var i = 0; i < cells2.length; i++) 
	{
	    var montoFila = cells2[i]; var cod = $(montoFila).text().toString().replace(/\./g,'');;
	    montoFiniquito.push(cod);

	}
	
	totalfor = 0;
	for (var i = 0; i < checkval.length; i++) 
	{
	    if(checkval[i] == true){
	    	totalfor =  parseInt(montoFiniquito[i]) + totalfor;
	    }else{
	    	
	    }

	}
	
	var totalFiniquito =  String(totalfor).replace(/(.)(?=(\d{3})+$)/g,'$1.');
	$('#montoTotalFiniquito').val(totalFiniquito);
	
	 table.page(numberpage).draw(false);

}

// change Select Finiquito
$("#periodoRemuneracionesFiniquito,#fechaTerminoContratoFiniquito,#selectTipoCuentaFiniquito,#subdivisionFiniquito,#grupoFiniquito,#bancoFiniquito")
		.change(function() {
			
			var valorTipoCuenta = $("#selectTipoCuentaFiniquito").val();
			if(valorTipoCuenta == 2){
				
				$("#label_rut_PA_finiquito").show();
				$("#rutPersonaAutorizadaFiniquito").show();
				$("#label_nombre_PA_finiquito").show();
				$("#nombrePersonaAutorizadaFiniquito").show();
				$("#label_oficina_finiquito").show();
				$(".select2-container--bootstrap .select2-selection--single").css("display", "block");
			}else{
				$("#label_rut_PA_finiquito").hide();
				$("#rutPersonaAutorizadaFiniquito").hide();
				$("#label_nombre_PA_finiquito").hide();
				$("#nombrePersonaAutorizadaFiniquito").hide();
				$("#label_oficina_finiquito").hide();
				$(".select2-container--bootstrap .select2-selection--single").css("display", "none");
			}
			var empresafiniquito = $("#empresaFiniquito").val();

			if (empresafiniquito == "") {
				alerta("Debe Seleccionar una Empresa");
				$("#empresaFiniquito").focus();
				return;
			} else {
                     if($("#selectTipoCuentaFiniquito").val() == 4 ){
                    	return; 
                     }
				$("#montoTotalFiniquito").val("");
				BuscarFiniquito();
			}

		});

$("#periodoRemuneracionesFiniquito").change(
				function() {

					$("#fechaTerminoContratoFiniquito").empty();
					var empresa = $("#empresaFiniquito").val();
					var periodo = $("#periodoRemuneracionesFiniquito").val();

					if (empresa == '') {
						alerta("Debe Seleccionar una Empresa");
						$("#empresaFiniquito").focus();
						return
					} else if (periodo == '') {
						alerta("Debe Seleccionar un Periodo");
						$("#periodoRemuneracionesFiniquito").focus();
						return
					}

					var fechaPago2 = "";
					fechaPago2 += "<option value=''>Seleccione...</option>";
					periodo = $("#periodoRemuneracionesFiniquito").val()
							.replace(/-/gi, "");

					$("#loading").show();
					$
							.ajax(
									{
										url : "/simpleWeb/json/work/fechaAnticipoEmpresaYPeriodoFiniquito/"
												+ empresa + "," + periodo,
										type : "GET",
										async : true,
										beforeSend : function(xhr) {
											xhr.setRequestHeader("Accept",
													"application/json");
											xhr.setRequestHeader(
													"Content-Type",
													"application/json");

										},
										success : function(data, textStatus,
												jqXHR) {
											$.each(data, function(k, v) {
												var ftSelect = v.fechaanticipo
														.split('-');
												fechaPagoSelect = ftSelect[2]
														+ "-" + ftSelect[1]
														+ "-" + ftSelect[0];

												fechaPago2 += "<option value="
														+ fechaPagoSelect + ">"
														+ fechaPagoSelect
														+ "</option>";

											})
											$("#fechaTerminoContratoFiniquito").append(
													fechaPago2);
										}
									}).done(function() {

								$("#loading").hide();
							}).fail(function(jqXHR, textStatus, errorThrown) {

								alerta(errorThrown);
								$("#loading").hide();

							})
				});

// //////////////////nomina Liquidacion////////////////////////////////////

function BuscarLiquidacion() {

	
	var table = $('#tbl_Info3').DataTable();
    table.clear().draw();

	var banco = $("#bancoLiqui").val();

	if (banco == '') {
		banco = null;
	} else {
		banco = $("#bancoLiqui").val();
	}

	
	var fechaPagoLiquidacion = $("#fechaPagoLiquidacion").val();

	if (fechaPagoLiquidacion == '') {
		fechaPagoLiquidacion = null;
	}else if (fechaPagoLiquidacion == null) {
		fechaPagoLiquidacion = null;
	}
	else {
		var ftU = fechaPagoLiquidacion.split('-');
		fechaPagoLiquidacion = ftU[2] + "-" + ftU[1] + "-" + ftU[0];
	}

	var tipo_cuenta = $("#selectTipoCuentaLiqui").val();

	if (tipo_cuenta == '') {
		tipo_cuenta = null;
	} else {
		tipo_cuenta = $("#selectTipoCuentaLiqui").val();
	}
	
	var periodo = $("#periodoRemuneracionesLiqui").val();

	if (periodo == '') {
		periodo = null;
	} else {
		periodo = $("#periodoRemuneracionesLiqui").val().replace(/-/gi, "");
	}


	// var existe = $( "#tablePreselect td" ).hasClass( "dataTables_empty" );
	//
	// } else if (existe == true){
	// alerta("No hay datos Disponibles Para Generar el Voucher");
	// $("#loading").hide();return;
	// }
	var empresa = $("#empresaliquidacion").val();

	if (empresa == '') {
		alerta("Debe Seleccionar una Empresa");
		$("#empresaliquidacion").focus();
		return;
	} else {
		empresa = $("#empresaLiquidacion").val();
	}

	var division = $("#divisionLiqui").val();
	if (division === "-1") {
		division = null;
	} else if (division == '') {
		division = null;
	} else {
		division = $("#divisionLiqui").val();
	}

	var subdivision = $("#subdivisionLiqui").val();

	
	
	if (subdivision === "-1") {
		subdivision = null;
	} else if (subdivision == '') {
		subdivision = null;
	} else {
		subdivision = null;
	}
	

	var grupo = $("#grupoLiqui").val();
	if (grupo === "-1") {
		grupo = null;
	} else if (grupo == '') {
		grupo = null;
	} else {
		grupo = $("#grupoLiqui").val();
	}

	

	
	var table = $('#tbl_Info3').DataTable();
    table.clear().draw();

	$("#loading").show();

	$
			.getJSON(
					"/simpleWeb/json/work/BuscarNominaPagoLiquidaciones/"+ fechaPagoLiquidacion + "," + tipo_cuenta + "," + empresa + "," + division + "," + subdivision + "," + grupo + "," + banco + "," + periodo,
					function(data) {

						var numero = 1;
						$.each(data,function(k, v) 
						{
							
							 var tableadd = $('#tbl_Info3').DataTable();
							 
							 var valNew = v.fechaPago.split('-');
							 var fechaliqui = valNew[2]+"-"+valNew[1]+"-"+valNew[0];
							 
							    tableadd.row.add( [
							           			"<td><input type='checkbox'  id='inlineCheckbox"+ k + "' value='option2' checked onchange='idcheckLiquidacion(this.id);' ></td>",
							           			"<td>"+ fechaliqui + "</td>",
							           			"<td>"+ v.cod_trabajador +"</td>",
							           			"<td>"+ v.apellidopaterno + " " + v.apellidomaterno + " " + v.nombre +"</td>",
							           			"<td>"+ v.nombrebanco != "null" ? v.nombrebanco : ""  + "</td>",
							           			"<td>"+ v.idbanco + "</td>",
							           			"<td>"+ v.numero_cuenta_string != "null" ? v.numero_cuenta_string : "" + "</td>",
							           			"<td>"+ v.nombretipocuenta +"</td>",
							           			"<td>"+ v.idtipocuenta +"</td>",
							           			"<td>"+ String(v.totalpagoliquidacion).replace(/(.)(?=(\d{3})+$)/g,'$1.') +"</td>",
							           			"<td>"+ v.idtablaliquidacion+"</td>",
							           			"<td>"+ v.periodo +"</td>",
							           			"<td>"+ v.rut + "</td>",
							           			"<td>"+ v.direccion + "</td>",
							           			"<td>"+ v.nombrehuerto + "</td>"
							           
							           			] ).node().id = "td"+k;
							           	tableadd.draw();
											
							           	var total2 = 0;
									 	
										var cells2 = new Array(); 
										var montoLiquidacion = new Array();
										cells2 = tableadd.row().column(9).data().draw();  for (var i = 0; i < cells2.length; i++) 
										{
										    var montoFila = cells2[i]; var cod = $(montoFila).text().toString().replace(/\./g,'');;
										    montoLiquidacion.push(cod);

										}
										
										var total = 0;
										
										for (var i = 0; i < montoLiquidacion.length; i++) 
										{
											total = parseInt(montoLiquidacion[i]) + total ;
										}
										total2 = String(total).replace(/(.)(?=(\d{3})+$)/g,'$1.');
										$('#montoTotalLiqui').val(total2);
										
										})

						$("#loading").hide();

					}).fail(function(jqXHR, textStatus, errorThrown) {

				alerta(errorThrown);
				$("#loading").hide();
			})
}

function EnviarTesoreriaLiquidacion() {
	
	$("#nombre_nomina_liquidacion").modal('hide');
	var periodoAdd = $("#periodoRemuneracionesLiqui").val();
	var fecha_pagoAdd = $("#fechaPagoLiquidacion").val();
	var nFilas = $("#tablePreselectLiquidacion tr").length;
	var existe = $("#tablePreselectLiquidacion td").hasClass("dataTables_empty");
	var emp = $("#empresaLiquidacion").val();
	var valorTipoCuenta = $("#selectTipoCuentaLiqui").val();
	var nombreNomina = $("#nombreNominaLiquidacion").val();

	if (emp == '') {
		alerta("Debe Seleccionar una Empresa");segundoPopup();
		$("#loading").hide();
		$("#empresaLiquidacion").focus();
		return;
	} else if (periodoAdd == '') {
		alerta("Debe Seleccionar un Periodo");
		$("#periodoRemuneracionesLiqui").focus();segundoPopup();
		$("#loading").hide();
		return;
	} else if (fecha_pagoAdd == '') {
		alerta("Debe Seleccionar una Fecha  Pago");segundoPopup();
		$("#fechaPagoLiquidacion").focus();
		$("#loading").hide();
		return;
	} else if (valorTipoCuenta == '') {
		alerta("Debe Seleccionar un Tipo de Cuenta");segundoPopup();
		$("#selectTipoCuentaLiqui").focus();
		$("#loading").hide();
		return;
	}
	
	else if (nFilas == 0) {
		alerta("No hay datos Disponibles Para Generar el Voucher");segundoPopup();
		$("#loading").hide();
		return;
	} else if (existe == true) {
		alerta("No hay datos Disponibles Para Generar el Voucher");segundoPopup();
		$("#loading").hide();
		return;
	}
	else {
		
		  if(valorTipoCuenta == 2){
				
				if($("#nombrePersonaAutorizadaliquidacion").val() == ""){
					alerta("Debe Ingresar un Nombre Persona Autorizada");
					$("#nombrePersonaAutorizadaliquidacion").focus();segundoPopup();
					return;
				}else if($("#rutPersonaAutorizadaliquidacion").val() == ""){
					alerta("Debe Ingresar un RUT Persona Autorizada");
					$("#rutPersonaAutorizadaliquidacion").focus();segundoPopup();
					return;
				}else if($("#oficinaliquidacion").val() == -1){
					alerta("Debe Ingresar una oficina");segundoPopup();
					$("#oficinaliquidacion").focus();
					return;
				}
				
				 if($.rut.validar($("#rutPersonaAutorizadaliquidacion").val()) && $.trim($("#rutPersonaAutorizadaliquidacion").val()) != ''&&($("#rutPersonaAutorizadaliquidacion").val().length<13))
				  {
					 
				  }
				  else{
					  alerta("Rut Incorrecto");
					  $("#rutPersonaAutorizadaliquidacion").focus();segundoPopup();
						return;
				  }
				
			}

		var montotal = $("#montoTotalLiqui").val();
		montotal = montotal.toString().replace(/\./g, '');
		var NumeroEmpresa = $("#empresaLiquidacion").val();
		periodoAdd2 = $("#periodoRemuneracionesLiqui").val().replace(/-/gi, "");
		
		
		emepresavalor = $("#empresaLiquidacion option:selected").text();
		var periodo_String =  $("#periodoRemuneracionesLiqui").val();
		var rut_autorizado = $("#rutPersonaAutorizadaliquidacion").val();
		var valoroficina = $("#oficinaliquidacion").val();
		var nombre_oficina = $('#oficinaliquidacion').select2('data')
		var nombre_oficina_string = nombre_oficina[0].text;
		
		var rutautorizado2 = rut_autorizado.toString().replace(/\./g, '');
		var rutautorizadofinal1 = rutautorizado2.toString().replace(/\-/g, '');
		var rutautorizadofinal = rutautorizadofinal1.toUpperCase();

		var checkval = [];
		var table = $('#tbl_Info3').DataTable();
		table.rows().every(function(rowIdx, tableLoop, rowLoop) {
			var data = this.node();
			checkval.push($(data).find('input').prop('checked'));

		});
		
		var total2 = 0;
	
	 	
		var cells2 = new Array(); 
		var montoLiquidacion = new Array();
		cells2 = table.row().column(9).data().draw();  
		
		for (var i = 0; i < cells2.length; i++) 
		{
		    var montoFila = cells2[i]; var cod = $(montoFila).text().toString().replace(/\./g,'');;
		    montoLiquidacion.push(cod);

		}
		
		var cellsDireccion = new Array(); 
		 var textDireccion = new Array();
		 cellsDireccion = table.row().column(13).data().draw();  
		 for (var i = 0; i < cellsDireccion.length; i++) 
		 {
		     	var textDirecc = cellsDireccion[i]; 
		     	var textDirecc2 = $(textDirecc).text();
		     	textDireccion.push(textDirecc2);

		}
		 
		// fecha anticipo
		 
		 var cellsFechaLiquidacion = new Array(); 
		 var fecha_liquidacion = new Array();
		 var fecha_liquidacionPoint = new Array();
		 cellsFechaLiquidacion = table.row().column(1).data().draw();  
		 for (var i = 0; i < cellsFechaLiquidacion.length; i++) {
			var fechaAnticipo = cellsFechaLiquidacion[i];
			var pe = $(fechaAnticipo).text();
			var ftU = pe.split('-');
			var ftU2 = ftU[2] +"-"+ ftU[1] +"-"+ ftU[0];
			fecha_liquidacion.push(ftU2);
		    
		    var ftU3 = ftU[2] + ftU[1] + ftU[0];
		    fecha_liquidacionPoint.push(ftU3);
		    
		}
		    
		// codigo trabajador 
		    var cellsCodigoTrabajador = new Array(); 
			 var codigo = new Array();
			 cellsCodigoTrabajador = table
			    .row()
			    .column(2).data().draw();  for (var i = 0; i < cellsCodigoTrabajador.length; i++) {
			     	var cod_trabajador = cellsCodigoTrabajador[i]; var cod = $(cod_trabajador).text();
			    codigo.push(cod);

			}
	    // id banco 
			    var cellsIdBanco = new Array(); 
				 var id_banco = new Array();
				 cellsIdBanco = table.row().column(5).data().draw(); 
				 for (var i = 0; i < cellsIdBanco.length; i++) {
				     	var idbanco1 = cellsIdBanco[i]; 
				     	var idbanco2 = $(idbanco1).text();
				     	id_banco.push(idbanco2);

				}
		// id tabla liquidacion
				 
				    var cellsIdTablaLiquidacion = new Array(); 
					 var id_tabla = new Array();
					 cellsIdTablaLiquidacion = table.row().column(10).data().draw(); 
					 for (var i = 0; i < cellsIdTablaLiquidacion.length; i++) {
					     	var idtabla1 = cellsIdTablaLiquidacion[i]; 
					     	var idtabla2 = $(idtabla1).text();
					     	id_tabla.push(idtabla2);

					}
		// id tipo cuenta
					 
					    var cellsIdTipoCuenta = new Array(); 
						 var id_tipo_cuenta = new Array();
						 cellsIdTipoCuenta = table.row().column(8).data().draw(); 
						 for (var i = 0; i < cellsIdTipoCuenta.length; i++) {
						     	var idtipocuenta1 = cellsIdTipoCuenta[i]; 
						     	var idtipocuenta2 = $(idtipocuenta1).text();
						     	id_tipo_cuenta.push(idtipocuenta2);

						}
		// nombre tipo cuenta
						 
						    var cellsNombreTipoCuenta = new Array(); 
							 var nombre_tipo_cuenta = new Array();
							 cellsNombreTipoCuenta = table.row().column(7).data().draw(); 
							 for (var i = 0; i < cellsNombreTipoCuenta.length; i++) {
							     	var nombretipocuenta1 = cellsNombreTipoCuenta[i]; 
							     	var nombretipocuenta2 = $(nombretipocuenta1).text();
							     	nombre_tipo_cuenta.push(nombretipocuenta2);

							}
		// nombre BANCO
							 
							    var cellsNombreBanco = new Array(); 
								 var nombre_banco = new Array();
								 cellsNombreBanco = table.row().column(4).data().draw(); 
								 for (var i = 0; i < cellsNombreBanco.length; i++) {
								     	var nombrebanco1 = cellsNombreBanco[i]; 
								     	nombre_banco.push(nombrebanco1);

								}
	// numero de cuenta
								 
								 
								    var cellsNCuenta = new Array(); 
									 var numero_cuenta = new Array();
									 cellsNCuenta = table.row().column(6).data().draw(); 
									 for (var i = 0; i < cellsNCuenta.length; i++) {
									     	var numerocuenta1 = cellsNCuenta[i]; 
									     	numero_cuenta.push(numerocuenta1);

									}
	// nombre trabajador
	
									 var cellsNombreTrabajador = new Array(); 
									 var nombre_trabajador = new Array();
								
									 cellsNombreTrabajador = table.row().column(3).data().draw();  
									 for (var i = 0; i < cellsNombreTrabajador.length; i++) 
									 {
										var nombre1 = cellsNombreTrabajador[i];
										var nombre2 = $(nombre1).text();
										var nombre3 = nombre2.split(' ');
										
										if(nombre3.length == 3){
											var nombre4 = nombre3[2] +" "+ nombre3[1] +" "+ nombre3[0];
										}else{
											var nombre4 = nombre2;
										}
										
										nombre_trabajador.push(nombre4); 
									 }
	 // rut trabajador 
									    
									 var cellsRutTrabajador = new Array(); 
									 var rut_trabajador = new Array();
									
									 cellsRutTrabajador = table.row().column(12).data().draw();  
									 for (var i = 0; i < cellsRutTrabajador.length; i++)
									 {
										 var ruttrabajador1 = cellsRutTrabajador[i];
										 var ruttrabajador2 = $(ruttrabajador1).text().toString().replace(/\./g, '');
										 var ruttrabajador3 = ruttrabajador2.toString().replace(/\-/g, '');
										 rut_trabajador.push(ruttrabajador3);
										       
									 }
	 // huerto trabajador 
									    
									  var cellsHuerto = new Array(); 
									  var huerto_trabajador = new Array();
									
									  cellsHuerto = table.row().column(14).data().draw(); 
									  
									  for (var i = 0; i < cellsHuerto.length; i++)
									  {
											var huertotrabajador1 = cellsHuerto[i];
											var huertottrabajador2 = $(huertotrabajador1).text().toString().replace(/\./g, '');
											var huertotrabajador3 = huertottrabajador2.toString().replace(/\-/g, '');
											huerto_trabajador.push(huertotrabajador3.toUpperCase());
										    
									  }
									    
									
		 
		 
		
		peticion2 = [];
		totalfor = 0;
		for (var i = 0; i < checkval.length; i++) 
		{
		    if(checkval[i] == true){
		    	 var montoString = parseInt(montoLiquidacion[i]) + totalfor;
		    	 var montoStringFinal = montoString.toString().replace(/\./g, '')
		    	      	var json2 = {
							periodo_string : periodoAdd2,
							fechaanticipo : fecha_liquidacion[i],
							cod_trabajador_string :codigo[i],
							nombre : nombre_trabajador[i],
							nombrebanco : nombre_banco[i],
							numero_cuenta_string : numero_cuenta[i],
							nombretipocuenta : nombre_tipo_cuenta[i],
							monto_ingresado_string : montoStringFinal,
							idtablaliquidacion : id_tabla[i],
							totalmonto : montotal,
							periodo : periodoAdd2,
							rut : rut_trabajador[i],
							fechaanticipoint : fecha_liquidacionPoint[i],
							empresa : NumeroEmpresa,
							idbanco : id_banco[i],
							nombre_autorizada : $("#nombrePersonaAutorizadaliquidacion").val(),
							rut_autorizada : rut_autorizado,
                            rut_autorizado_replace : rutautorizadofinal,
                            idtipocuentastring :  id_tipo_cuenta[i],
                            direccion : textDireccion[i],
                            oficina_string : valoroficina,
                            nombre_nomina : nombreNomina,
                            idconcepto : 2,
                            nombre_oficina_string : nombre_oficina_string,
                            periodoString :periodo_String,
                            nombrehuerto  : huerto_trabajador[i],
                            empresatext : emepresavalor
						}     
		    	 peticion2.push(json2); 
		    	 console.log(nombre_trabajador[i]);
		    	
		    }else{
		    	
		    }
		     
		}
		
		
		

		$("#loading").show();
				

         
		$.ajax({
			url : "/simpleWeb/json/work/CrearTxtMAsMailLiquidacion/",
			type : "PUT",
			async : true,
			data : JSON.stringify(peticion2),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");

			},
			success : function(data, textStatus, jqXHR) {
				
				
				var tableadd = $('#tbl_Info3').DataTable();
				tableadd.clear().draw();

				$("#wait").css("display", "none");
				
				$("#montoTotalLiqui").val("");
				$("#fechaPagoLiquidacion").empty();
				var fechaPagoclean = "";
				fechaPagoclean += "<option value=''>Seleccione...</option>";
				$("#fechaPagoLiquidacion").append(fechaPagoclean);
				$("#periodoRemuneracionesLiqui").val("");
				
				
				$("#divisionLiqui").empty();
				$("#divisionLiqui").append("<option value='-1'>Seleccione Huerto</option>");
				
				$("#rutPersonaAutorizadaliquidacion").val("");
				$("#nombreNominaLiquidacion").val("");
				$("#empresaLiquidacion").val("");
				$("#oficinaliquidacion").val("-1");
				
				$("#nombrePersonaAutorizadaliquidacion").val("");
				
				$("#label_rut_PA_liquidacion").hide();
				$("#rutPersonaAutorizadaliquidacion").hide();
				$("#label_nombre_PA_liquidacion").hide();
				$("#nombrePersonaAutorizadaliquidacion").hide();
				$("#label_oficinaliquidacion").hide();
				
				$(".select2-container--bootstrap .select2-selection--single").css("display", "none");
			}
		}).done(function() {

			$("#loading").hide();
			$("#nombre_nomina_liquidacion").modal('hide');
			alerta("Nomina Generada con Exito")
		}).fail(function(jqXHR, textStatus, errorThrown) {

			alerta(errorThrown);

		})

	} // end else
	
}
function idcheckLiquidacion(id) {
	
	var checkval = [];
	
	var table = $('#tbl_Info3').DataTable({
        stateSave: true
    } );
 	
	var info = table.page.info();
	var numberpage = info.page;
	
	table.rows().every(function(rowIdx, tableLoop, rowLoop) {
		var data = this.node();
		checkval.push($(data).find('input').prop('checked'));

	});
	
	var total2 = 0;
	
 	
	var cells2 = new Array(); 
	var montoLiquidacion = new Array();
	cells2 = table.row().column(9).data().draw();  
	
	for (var i = 0; i < cells2.length; i++) 
	{
	    var montoFila = cells2[i]; var cod = $(montoFila).text().toString().replace(/\./g,'');;
	    montoLiquidacion.push(cod);

	}
	
	totalfor = 0;
	for (var i = 0; i < checkval.length; i++) 
	{
	    if(checkval[i] == true){
	    	totalfor =  parseInt(montoLiquidacion[i]) + totalfor;
	    }else{
	    	
	    }

	}
	
	var totalAnticipo =  String(totalfor).replace(/(.)(?=(\d{3})+$)/g,'$1.');
	$('#montoTotalLiqui').val(totalAnticipo);
	
	table.page(numberpage).draw(false);
}

$("#empresaLiquidacion").change(function() {
	
	$("#periodoRemuneracionesLiqui").val("");
	$("#fechaPagoLiquidacion").empty();
	$("#selectTipoCuentaLiqui").val("");

	$("#bancoLiqui").val("");
	$("#montoTotalLiqui").val("");
	
	$("#divisionLiqui").empty();
	$("#subdivisionLiqui").empty();
	$("#grupoLiqui").empty();
	$("#subdivisionLiqui").append("<option value='-1'>Seleccione ZONA</option>");
	$("#grupoLiqui").append("<option value='-1'>Seleccione CECO</option>");
	$("#fechaPagoLiquidacion").append("<option value=''>Seleccione...</option>");
	
	
	var soc = $("#empresaLiquidacion").val();
	
	if(soc == '-1'){alerta("Debe Seleccionar una Empresa");return;}

	var soci_sap = "";
	$("#loading").show();
	$.getJSON("/simpleWeb/json/work/getSociedadById/"+$('#empresaLiquidacion').val()+"" , function(data){
        
		soci_sap = JSON.stringify(data.sociedad);
	
		
	}).done(function() {
		
		$("#divisionLiqui").append("<option value='-1'>Seleccione Huerto</option>");
		var soci_sapFinal  = soci_sap.replace(/\"/g, '');
		$.getJSON("/simpleWeb/json/work/getCampoBySociedad/"+$('#empresaLiquidacion').val()+"" , function(data){
	     
			let queryString = huertoPrivilege == null ? "" : JSON.stringify(huertoPrivilege).slice(1,-1);
	        
			$.each(data, function(k, v){
				
				  var SelectHuerto = "";
					

	                if(huertoPrivilege.includes(v.campo) == true){
	                	SelectHuerto += 	"<option value="+v.campo+">"+v.descripcion+"</option>";
	                }
					$("#divisionLiqui").append(SelectHuerto);
				})
				 
			
			
		}).done(function() {
			$("#loading").hide();

		})
		

	})
	
	//BuscarLiquidacion();
});




// change Select Liquidacion
$("#fechaPagoLiquidacion,#selectTipoCuentaLiqui,#grupoLiqui,#bancoLiqui").change(function() 
				{
					var valorTipoCuenta = $("#selectTipoCuentaLiqui").val();
					if(valorTipoCuenta == 2){
						
						$("#label_rut_PA_liquidacion").show();
						$("#rutPersonaAutorizadaliquidacion").show();
						$("#label_nombre_PA_liquidacion").show();
						$("#nombrePersonaAutorizadaliquidacion").show();
						$("#label_oficinaliquidacion").show();
						$(".select2-container--bootstrap .select2-selection--single").css("display", "block");
					}else{
						$("#label_rut_PA_liquidacion").hide();
						$("#rutPersonaAutorizadaliquidacion").hide();
						$("#label_nombre_PA_liquidacion").hide();
						$("#nombrePersonaAutorizadaliquidacion").hide();
						$("#label_oficinaliquidacion").hide();
						$(".select2-container--bootstrap .select2-selection--single").css("display", "none");
					}
			
			
			var empresaliquidacion = $("#empresaLiquidacion").val();
			if (empresaliquidacion == "") {
				alerta("Debe Seleccionar una Empresa");
				$("#empresaLiquidacion").focus();
				return;
			} else {

				$("#montoTotalLiqui").val("");
				BuscarLiquidacion();
			}

		});

$("#periodoRemuneracionesLiqui").change(function() 
		{

					$("#fechaPagoLiquidacion").empty();
					var empresa = $("#empresaLiquidacion").val();
					var periodo = $("#periodoRemuneracionesLiqui").val();

					if (empresa == '') {
						alerta("Debe Seleccionar una Empresa");
						$("#empresaLiquidacion").focus();
						return
					} else if (periodo == '') {
						alerta("Debe Seleccionar un Periodo");
						$("#periodoRemuneracionesLiqui").focus();
						return
					}

					var fechaPago2 = "";
					fechaPago2 += "<option value=''>Seleccione...</option>";
					periodo = $("#periodoRemuneracionesLiqui").val().replace(
							/-/gi, "");

					$("#loading").show();
					$
							.ajax(
									{
										url : "/simpleWeb/json/work/fechaAnticipoEmpresaYPeriodoLiquidacion/"
												+ empresa + "," + periodo,
										type : "GET",
										async : true,
										beforeSend : function(xhr) {
											xhr.setRequestHeader("Accept",
													"application/json");
											xhr.setRequestHeader(
													"Content-Type",
													"application/json");

										},
										success : function(data, textStatus,
												jqXHR) {
											$.each(data, function(k, v) {
												var ftSelect = v.fechaanticipo
														.split('-');
												fechaPagoSelect = ftSelect[2]
														+ "-" + ftSelect[1]
														+ "-" + ftSelect[0];

												fechaPago2 += "<option value="
														+ fechaPagoSelect + ">"
														+ fechaPagoSelect
														+ "</option>";

											})
											$("#fechaPagoLiquidacion").append(
													fechaPago2);
										}
									}).done(function() {

								$("#loading").hide();
							}).fail(function(jqXHR, textStatus, errorThrown) {

								alerta(errorThrown);
								$("#loading").hide();

							})
							BuscarLiquidacion();
				});

/// change finiquitos

/// change empresa finiquito

$("#empresaFiniquito").change(function() {
	$("#periodoRemuneracionesFiniquito").val("");
	$("#fechaTerminoContrato").empty();
	$("#fechaTerminoContrato").append("<option value=''>Seleccione...</option>");
	$("#selectTipoCuentaFiniquito").val("");
	$("#bancoB").val("");
	
	
	$("#divisionFiniquito").empty();
	$("#subdivisionFiniquito").empty();
	$("#grupoFiniquito").empty();
	$("#subdivisionFiniquito").append("<option value='-1'>Seleccione ZONA</option>");
	$("#grupoFiniquito").append("<option value='-1'>Seleccione CECO</option>");
	
	
	var soc = $("#empresaFiniquito").val();
	
	if(soc === '-1'){alerta("Debe Seleccionar una Empresa");return;}

	var soci_sap = "";
	$("#loading").show();
	$.getJSON("/simpleWeb/json/work/getSociedadById/"+$('#empresaFiniquito').val()+"" , function(data){
        
		soci_sap = JSON.stringify(data.sociedad);
	
		
	}).done(function() {
		
		$("#divisionFiniquito").append("<option value='-1'>Seleccione Huerto</option>");
		var soci_sapFinal  = soci_sap.replace(/\"/g, '');
		$.getJSON("/simpleWeb/json/work/getCampoBySociedad/"+$('#empresaFiniquito').val()+"" , function(data){
	     
			let queryString = huertoPrivilege == null ? "" : JSON.stringify(huertoPrivilege).slice(1,-1);
	        
			$.each(data, function(k, v){
				
				var SelectHuerto = "";
				

                if(huertoPrivilege.includes(v.campo) == true){
                	SelectHuerto += 	"<option value="+v.campo+">"+v.descripcion+"</option>";
                }
				$("#divisionFiniquito").append(SelectHuerto);
				 
				
				
			})
			
			
		}).done(function() {
			$("#loading").hide();

		})
		

	})
	
	//BuscarFiniquito();
});

$("#divisionFiniquito").change(function() 
		{
		var huertoValor = $("#divisionFiniquito").val();
			
			if(huertoValor == "" || huertoValor == -1){
				alerta("Debe Seleccionar un Huerto"); $("#divisionFiniquito").focus();
				return;
			}
			
			
			
			var zona_sap = "";	 
			$("#loading").show();
			$("#subdivisionFiniquito").empty();
			$("#grupoFiniquito").empty();
			$("#grupoFiniquito").append("<option value='-1'>Seleccione CECO</option>");
			
			
			$.getJSON("/simpleWeb/json/work/getCampoByCampo/"+$('#divisionFiniquito').val()+"" , function(data){
				
				var SelecZona = "";
				SelecZona +=  "<option value=''>Seleccione ZONA</option>";

				
				
				$.each(data, function(k, v){
					
					SelecZona += 	"<option value="+v.grupo+">"+v.zona+"</option>";
					$("#subdivisionFiniquito").append(SelecZona);
				})
				
				

			
			}).done(function() {
				
				$("#loading").hide();
				
			});
			$("#montoTotal").val("");
			BuscarFiniquito();
			
		});


$("#subdivisionFiniquito").change(function() 
		{
			
			$("#grupoFiniquito").empty();
			var valor_zona = $("#subdivisionFiniquito").val();
			
			if(valor_zona == "" || valor_zona == ""){
				alerta("Debe Seleccionar una Zona");$("#subdivisionFiniquito").focus();
				return;
			}
			
			var soci_sap = "";
			$("#loading").show();
			$.getJSON("/simpleWeb/json/work/getSociedadById/"+$('#empresaFiniquito').val()+"" , function(data){
		        
				soci_sap = JSON.stringify(data.sociedad);
			
				
			}).done(function() {
				
				var CECOAgrupacion;

		        $.each(SESION.campo, function(key, value){

		              if(value.campo == $('#tipodivisionB').val()){

		                    CECOAgrupacion = value.cecos;
		              }
		        });
				
				
				var soci_sapFinal  = soci_sap.replace(/\"/g, '');
				$.getJSON("http://200.55.206.140/SCLEM/JSON_BAPI_COSTCENTER_GETLIST1.aspx?SOCIEDAD="+$('#empresaFiniquito').val()+"&GRUPO="+valor_zona+"&CECO="+CECOAgrupacion , function(data){

					var SelectCECO = "";
					SelectCECO +=  "<option value=''>Seleccione CECO</option>";
				
						
						$.each(data.COSTCENTERLIST, function(k, v){
							
							
							if(v.DESCRIPT.indexOf("Cuartel") > -1 == true ){
								
							}else{SelectCECO += 	"<option value="+v.COSTCENTER+">"+v.DESCRIPT+"</option>";}
				
						})
						$("#grupoFiniquito").append(SelectCECO);
						
						
				
					
						$("#loading").hide();
				}).done(function() {
					$("#loading").hide();
				
				})
				

			})
							
					$("#montoTotal").val("");
			BuscarFiniquito();
					
		});



function modalfiniquito(){
	
	$("#nombre_nomina_finiquito").modal('show');
	
}

function modalLiquidacion(){
	
	$("#nombre_nomina_liquidacion").modal('hide');
	var periodoAdd = $("#periodoRemuneracionesLiqui").val();
	var fecha_pagoAdd = $("#fechaPagoLiquidacion").val();
	var emp = $("#empresaLiquidacion").val();
	var valorTipoCuenta = $("#selectTipoCuentaLiqui").val();
	
	
	

	if (emp == '') {
		alerta("Debe Seleccionar una Empresa");
		$("#loading").hide();
		$("#empresaLiquidacion").focus();
		return;
	} else if (periodoAdd == '') {
		alerta("Debe Seleccionar un Periodo");
		$("#periodoRemuneracionesLiqui").focus();
		$("#loading").hide();
		return;
	} else if (fecha_pagoAdd == '') {
		alerta("Debe Seleccionar una Fecha  Pago");
		$("#fechaPagoLiquidacion").focus();
		$("#loading").hide();
		return;
	} else if (valorTipoCuenta == '') {
		alerta("Debe Seleccionar un Tipo de Cuenta");
		$("#selectTipoCuentaLiqui").focus();
		$("#loading").hide();
		return;
	}
	
	$("#nombre_nomina_liquidacion").modal('show');
	
}

function segundoPopup(){
	
	$('.swal2-container').css('z-index', '15000');
	
}

$("#subdivisionLiqui").change(function() 
		{
			
			$("#grupoLiqui").empty();
			var valor_zona = $("#subdivisionLiqui").val();
			
			if(valor_zona == "" || valor_zona == ""){
			
			}else{
				
				var soci_sap = "";
				$("#loading").show();
				$.getJSON("/simpleWeb/json/work/getSociedadById/"+$('#empresaLiquidacion').val()+"" , function(data){
			        
					soci_sap = JSON.stringify(data.sociedad);
				
					
				}).done(function() {
					
					
					var CECOAgrupacion;

			        $.each(SESION.campo, function(key, value){

			              if(value.campo == $('#tipodivisionB').val()){

			                    CECOAgrupacion = value.cecos;
			              }
			        });
					
					var SelectCECO = "";
					SelectCECO +=  "<option value=''>Seleccione CECO</option>";
					$("#grupoLiqui").append(SelectCECO);
					
					var soci_sapFinal  = soci_sap.replace(/\"/g, '');
					$.getJSON("http://200.55.206.140/SCLEM/JSON_BAPI_COSTCENTER_GETLIST1.aspx?SOCIEDAD="+$('#empresaLiquidacion').val()+"&GRUPO="+valor_zona+"&CECO="+CECOAgrupacion , function(data){
						
					
						var SelectCECO2 = "";
							$.each(data.COSTCENTERLIST, function(k, v){
								
								
								if(v.DESCRIPT.indexOf("Cuartel") > -1 == true ){
									
								}else{SelectCECO2 += 	"<option value="+v.COSTCENTER+">"+v.DESCRIPT+"</option>";}
					
							})
							$("#grupoLiqui").append(SelectCECO2);
							
							
					
						
							$("#loading").hide();
					}).done(function() {
						$("#loading").hide();
					
					})
					

				})
			}
			
			
							
					$("#montoTotalLiqui").val("");
					BuscarLiquidacion();
					
		});

$("#divisionLiqui").change(function() 
		{
		var huertoValor = $("#divisionLiqui").val();
			
			if(huertoValor == "" || huertoValor == -1){
				
			}
			
			
			
			var zona_sap = "";	 
			$("#loading").show();
			$("#subdivisionLiqui").empty();
			$("#grupoLiqui").empty();
			$("#grupoLiqui").append("<option value='-1'>Seleccione CECO</option>");
			
			var SelecZona = "";
			SelecZona +=  "<option value=''>Seleccione ZONA</option>";
			$("#subdivisionLiqui").append(SelecZona);
			
			
			
			$.getJSON("/simpleWeb/json/work/getCampoByCampo/"+$('#divisionLiqui').val()+"" , function(data){
				
		
				$.each(data, function(k, v){
					
					var SelecZona2 = "";
					SelecZona2 += 	"<option value="+v.grupo+">"+v.zona+"</option>";
					$("#subdivisionLiqui").append(SelecZona2);
					
					
				})
				
					


			}).done(function() {
				
				$("#loading").hide();
				
			});
			$("#montoTotalLiqui").val("");
			BuscarLiquidacion();
		});

