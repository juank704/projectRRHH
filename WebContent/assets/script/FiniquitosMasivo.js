//Colocar Permisos
var sociedadPrivilege = new Set();
var huertoPrivilege = new Array();
//Obtener Sociedades y Huertos que tiene acceso
$.each(SESION.campo, function(key, value){
	sociedadPrivilege.add(value.idSociedad);
	huertoPrivilege.push(value.campo);
});

var numeroc = 0;

var $loading = $('#loading').hide();

$(document).ajaxStart(function () 
		{
    		$loading.show();
		})
  .ajaxStop(function () {
    $loading.hide();
  });
$(document).ready(function() {
	$.fn.dataTable.ext.errMode = 'none';
	
	ListaSociedad();
	ListaTipoContrato();
	
	$("#fechaCuotas").datepicker({ 
		dateFormat: 'mm-yy',
		firstDay: 1,
        changeMonth: true,
        changeYear: true,
       
       

		});
	
	$("#fechaTermino").datepicker({ 
		dateFormat: 'dd-mm-yy',
		firstDay: 1,
        changeMonth: true,
        changeYear: true

		});

var table_per_sin_goce = $('#tbl_Info').DataTable({
	responsive: {
        details: {
            display: $.fn.dataTable.Responsive.display.modal( {
                header: function ( row ) {
                    var data = row.data();
                    return 'Details for '+data[0]+' '+data[1];
                }
            } ),
            renderer: $.fn.dataTable.Responsive.renderer.tableAll()
        }
    },
	"order": [[ 1, "asc" ]],	
	columnDefs: [
//		             {
//		                 targets: [0,1,2,3,4,5,6],
//		                 className: 'tdcenter'
//		             },
		             {
		                 targets: [18],
		                 className: 'tdright'
		             }
		           ]
		         } 		
);

table_per_sin_goce.columns( [5] ).visible( false );
table_per_sin_goce.columns( [7] ).visible( false );
table_per_sin_goce.columns( [8] ).visible( false );
table_per_sin_goce.columns( [9] ).visible( false );

//table_per_sin_goce.columns( [11] ).visible( false );
//table_per_sin_goce.columns( [12] ).visible( false );
//table_per_sin_goce.columns( [13] ).visible( false );
//table_per_sin_goce.columns( [14] ).visible( false );
//table_per_sin_goce.columns( [15] ).visible( false );
//table_per_sin_goce.columns( [16] ).visible( false );


table_per_sin_goce.columns( [20] ).visible( false );
table_per_sin_goce.columns( [21] ).visible( false );
table_per_sin_goce.columns( [22] ).visible( false );
table_per_sin_goce.columns( [23] ).visible( false );
table_per_sin_goce.columns( [24] ).visible( false );
table_per_sin_goce.columns( [25] ).visible( false );
table_per_sin_goce.columns( [26] ).visible( false );
table_per_sin_goce.columns( [27] ).visible( false );
table_per_sin_goce.columns( [28] ).visible( false );
table_per_sin_goce.columns( [29] ).visible( false );
table_per_sin_goce.columns( [30] ).visible( false );
});


function ListaTipoContrato()
{
$.getJSON("/simpleWeb/json/work/getAllTipoContrato/", function(data){
		
		$.each(data, function(k, v){
			var SelectTipoContrato = "";
				
			SelectTipoContrato += 	"<option value="+v.idSociedad+">"+v.denominacionSociedad+"</option>";
			
			$("#tipoContrato").append(SelectTipoContrato);
	
		})
}).fail(function(jqXHR, textStatus, errorThrown) {

    alerta(errorThrown);
	$("#loading").hide();
}).done(function() {
	$("#loading").hide();
});
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


$('#Sociedad').change(function(e) {

	var table = $('#tbl_Info2').DataTable();
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

$('#tipodivisionB,#tiposubdivisionB,#listagrupoB,#concepto,#periodo,#fechaTermino,#tipoContrato').change(function(e) {
	
	var soc = $('#Sociedad').val();
	if(soc == ""){
		alerta("Debe Seleccionar una Empresa");
		return;
	}
	$("#CodigoTra").empty();
	trabajadores();
	
	});



function trabajadores() {
	$("#loading").show();
	$("#CodigoTra").empty();
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
	
	
	var fecha_t = $("#fechaTermino").val();
	if(fecha_t === "-1"){fecha_t = null;}
	else if(fecha_t == ''){
		fecha_t = null;
	}else{
		fecha_t = $("#fechaTermino").val();
		var fecha_t_split = fecha_t.split("-");
		fecha_t = fecha_t_split[2]+"-"+fecha_t_split[1]+"-"+fecha_t_split[0];
	}
	
	var tipocontrato_t = $("#tipoContrato").val();
	
	if(tipocontrato_t === "-1")
	{tipocontrato_t = null;}
	else if(tipocontrato_t == ''){
		tipocontrato_t = null;
	}else{
		tipocontrato_t = $("#tipoContrato").val();
		
	}
	
	console.log(tipocontrato_t+"    "+fecha_t);
	$.getJSON(
			"/simpleWeb/json/work/allTrabajadorFiniquitoDeTemporada/"+sociedad+","+tipo_division+","+tipo_subdivision+","
			+grupo+","+fecha_t+","+tipocontrato_t+"",
			function(data) {
               console.log(data);
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
var trabajadorEnLista = new Array();
function agregarFila(){
	
	var codigo_trabajador = "";
	codigo_trabajador = $("#CodigoTra").val();
	var soci = $("#Sociedad").val();
	
	periodo_centralizacion = $("#fechaCuotas").val();
	
	if(periodo_centralizacion == ""){
		
		alerta("Debe Seleccionar un Periodo de Centralizacón");
		$("#fechaCuotas").focus();
		return;
	}
	
	if(codigo_trabajador == ""){
		alerta("Debe Seleccionar un trabajador");
		$("#CodigoTra").focus();
		return;
		
	}
	
	for (var i = 0; i < trabajadorEnLista.length; i++) {
		
	    if(trabajadorEnLista[i][1] == codigo_trabajador)
	    {
	    	alerta("Trabajador Código "+ codigo_trabajador + " Se Encuentra ya en la Lista")
	    	return;
	    }
	   
	    
	}
	
	
	
	if(soci == ""){
		alerta("Debe Seleccionar una Empresa");
		$("#Sociedad").focus();
		return;
		
	}
	$("#loading").show();
	
   var hora_pago;
   var periodo_trab;
   var n_letra;
   var dato4;
   $.ajax({
		  		type : "GET",
		  		url : "/simpleWeb/json/work/obtenerSueldoLiquidoTemporal/"+codigo_trabajador+"",
		  		dataType : "json",
		  		success : function(data) {
		  			$("#loading").show();
		  			console.log(data);
		  			var numeroDato = 0;
		  			$.each(data, function(k, v){
		  				if(numeroDato == 0){
		  			    
		  					dato1 = v.rut;
				  		    dato2 = v.appaterno+" "+v.apmaterno+" "+v.nombre;
				  			dato3 = v.nombre_sociedad;
				  			dato4 = v.fecha_inicio.split('-'); 
				  			dato4 = dato4[2]+"-"+dato4[1]+"-"+dato4[0];
				  			dato5 = v.fecha_termino.split('-');
				  			dato5 = dato5[2]+"-"+dato5[1]+"-"+dato5[0];
				  			fecha_meses_inicio = v.fecha_inicio;
				  			fecha_meses_termino = v.fecha_termino;
				  			dato6 = v.id_trabajador;
				  			Articulo = v.articulo;
				  			Inciso = v.inciso;
				  			Letra = v.letra;
				  			check_aviso = v.aviso;
				  			fecha_pago = v.fechapago;
				  			lugar_pago = v.lugarpago;
				  			hora_pago = v.horapago;
				  			anio_servicio = v.dias;
				  			dias_tomado = v.diastomado;
				  			tipo_contrato = v.tipocontrato;
				  			descripcion_t = v.descripcion;
				  			codtrab = v.codigo_trabajador;
				  			id_contrato = v.id_contrato;
				  			promedio_sueldo = v.valor;
				  			valorImponible = v.valorasignacionesimponibles;
				  			valorNoImponible = v.valornoimponible;
				  			valorGratificacion = v.valorgratificacion;
				  			n_letra = v.nombre_letra;
				  			n_causal = v.nombre_causal;
				  			aviso_trab = v.aviso;
		  				}
		  				
		  				console.log("hora pago es "+hora_pago)
		  				numeroDato ++;
		  			})
		  			
		  			if(n_letra == null){
		  				n_letra = "";
		  			}
		  			///////////////////////////////////////////////
		  		///  CALCULAR DIAS PROPORCIONALES	
					
					var fecha_i = dato4.split('-');
					var fecha_T = dato5.split('-');
					var fecha_T_Enviar = fecha_T[2]+"-"+fecha_T[1]+"-"+fecha_T[0];
					fecha_terminoT = fecha_T_Enviar;

					var suna_Total;
					var diasDelMes = 30;
					var porcentaje_dia;
					var porcentaje_dia_T;
					var porcentaje_mes = 1.25;

					var dia_inicio = fecha_i[0];
					var total_1_mes;
					var total_1_mes_T;

					var dia_inicioTermino = fecha_T[0];
					var total_1_mesTermino;
			        
					// calculamos dia de inicio
					var diames = new Date(fecha_i[2], fecha_i[1], 0).getDate();
					var resultadoDias = diames - dia_inicio;
					porcentaje_dia = porcentaje_mes / diasDelMes;
					total_1_mes = (resultadoDias +1) * porcentaje_dia;

			        // calculamos dias del mes 30 - dia inicio termino 
					var resultadoDiasTermino = (dia_inicioTermino);
					porcentaje_dia_T = porcentaje_mes / diasDelMes;
					// total mes de termino
					
					if(resultadoDiasTermino == 31){
						resultadoDiasTermino = 30;
					}
					total_1_mes_T = resultadoDiasTermino * porcentaje_dia_T;

					var total_mesInicial_mesFinal = 0;
					 if(fecha_i[1] == fecha_T[1]){
						 total_mesInicial_mesFinal = total_1_mes_T;
					 }else
					 {
						 total_mesInicial_mesFinal = total_1_mes + total_1_mes_T;
					 }
					
					
					 
					
					
					

					
					var options = {  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Santiago',  };
					
					var fechai_split = fecha_meses_inicio.split('-');
					var fechaT_split = fecha_meses_termino.split('-');
					
					
					var fechaI = new Date(fechai_split[0],fechai_split[1],fechai_split[2])
					var fechaF = new Date(fechaT_split[0],fechaT_split[1],fechaT_split[2])

					var difM = fechaF - fechaI // diferencia en milisegundos
					var difD = difM / (1000 * 60 * 60 * 24) // diferencia en dias

					var dias_trabajado = difD +1;
					
					console.log("dias trabajado = "+dias_trabajado);
					
					
					
					
					if(dias_trabajado >= 31)
					
					{
					  
						dt1 = new Date(fechai_split[0],fechai_split[1] -1,fechai_split[2]);
						dt2 = new Date(fechaT_split[0],fechaT_split[1] -1 ,fechaT_split[2]);
					  
					
					var fecha1_dt = dt1.toLocaleDateString("en-EN", options);
					var fecha2_dt = dt2.toLocaleDateString("en-EN", options);

					dt11 = new Date(fecha1_dt);
					dt22 = new Date(fecha2_dt);
					
					
					var mesesEntrePeriodos = monthDiffPrueba5(''+fecha_meses_inicio,''+fecha_meses_termino);
					
					mesesEntrePeriodos = parseInt(mesesEntrePeriodos) * porcentaje_mes;
					
					
					var mes1 = fechaT_split[1]; var mes2 = fechai_split[1]; 
					var totalmes =  mes1 - mes2; 
					if(totalmes == 1 && fechai_split[0] == fechaT_split[0]){
						suna_Total = total_mesInicial_mesFinal;
					}else{
						suna_Total = total_mesInicial_mesFinal + mesesEntrePeriodos;
					}
					
					
					}
					else{
						suna_Total = 0;
					}
					var sumT;
					if(dias_trabajado >= 31){
						sumT = parseFloat(suna_Total - dias_tomado).toFixed(2);
						$("#diastomado").val(dias_tomado);
					}else{
						sumT = parseFloat(suna_Total).toFixed(2);
						$("#diastomado").val(0);
					}
					
					console.log("suma total2 "+sumT);
					
					var valorHDtablaFeriado = 0;
					var valorProporcionaltablaFeriado = 0;
					dias_basico = suna_Total;
				    var total_h_d = 0;
				    var valorHDtablaAnio = 0;
				    var valorHDtablaAviso;
				    var anioServicio = 0;
		  			
		  			var datosExtras = "";
		  			//////////////////////////////////////////////
				    $("#loading").show();
					 $.ajax({
					  		type : "GET",
					  		url : '/simpleWeb/json/work/DiasProporcionalesMasivo/'+fecha_T_Enviar+','+sumT+','+codigo_trabajador+','+id_contrato+'',
					  		dataType : "JSON",
					  		success : function(data) {
					  			
					  			console.log(data);
					  			var contador = 0;
					  			var tipo_hd = "";
					  			$.each(data, function(k, v) {
					  			
					  				if(contador == 0)
					  					{
					  					
					  					    articulo_trab = v.articulo;
					  					    diasinhabiles_trab = v.diasinhabiles;
					  					    diastomado_trab = v.diastomado;
					  					    fechapago_trab = v.fechapago;
					  					    fecha_termino_trab = v.fecha_termino;
					  					    feriadobasico_trab = v.feriadobasico;
					  					    feriadoconvencional_trab = v.feriadoconvencional;
					  					    feriadoprogresivo_trab = v.feriadoprogresivo;
					  					    horapago_trab = v.horapago;
					  					    inciso_trab = v.inciso;
					  					    letra_trab = v.letra;
					  					    lugarpago_trab = v.lugarpago;
					  					    proporcional_trab = v.proporcional;
					  					    subtotal_trab = v.subtotal;
					  					    total_finiquito_trab = v.total_finiquito;
					  					    totalferiadobpc_trab = v.totalferiadobpc;
					  					    descripcion_trab = v.descripcion;
					  					    aviso_trabdetalle = v.aviso;
					  					    
					  					    
					  					    
							  				dias_propor = parseFloat(v.proporcional).toFixed(2);
							  				contador ++;
					  					}else{
					  						if(v.codHD == 2006 || v.codHD == 2007 || v.codHD == 2008)
					  						{
					  							if(v.codHD == 2006){
					  								valorHDtablaFeriado = v.montoHD;
					  								valorProporcionaltablaFeriado = v.diasint;
					  								
					  							}else if(v.codHD == 2007){
					  								valorHDtablaAnio = v.montoHD;
					  							
					  							}else if(v.codHD == 2008){
					  								valorHDtablaAviso = v.montoHD;
					  							}
					  						}else{
					  							if(v.tipoHD == "h"){
						  				        	tipo_hd = "HABER";
						  				        	total_h_d = total_h_d + v.montoHD;
						  				        	datosExtras +="$ "+String(v.montoHD).replace(/(.)(?=(\d{3})+$)/g, '$1.')+" "+tipo_hd+" "+v.nombreHD+" &#10";
						  				        }else if(v.tipoHD == "d"){
						  				        	tipo_hd = "DESCUENTO";
						  				        	total_h_d = total_h_d - v.montoHD;
						  				        	datosExtras +="$ "+String(v.montoHD).replace(/(.)(?=(\d{3})+$)/g, '$1.')+" "+tipo_hd+" "+v.nombreHD+" &#10";
						  				        	
						  				        }
						  				      else if(v.tipoHD == "hn"){
						  				        	tipo_hd = "HABER NO IMPONIBLE";
						  				        	total_h_d = total_h_d + v.montoHD;
						  				        	datosExtras +="$ "+String(v.montoHD).replace(/(.)(?=(\d{3})+$)/g, '$1.')+" "+tipo_hd+" "+v.nombreHD+" &#10";
						  				        	
						  				        }
						  						
						  					
					  						}
					  					}
					  				
								})
								
								var tableadd = $('#tbl_Info').DataTable({
									"language" : {
										"processing" : "Cargando...."
									}
								});
						 
					  	
					  	
					  	
						 var v_f_b = parseFloat(dias_basico).toFixed(2); 
						 var v_f_p = 0; // falta dato de marcelo
						 var v_f_c = 0; // falta dato de marcelo
						   

						   var subtotal1 =  v_f_b + v_f_p + v_f_c;
						   var subtotal1_3 = parseFloat(subtotal1).toFixed(2); 
						   
						   
						   var subT = parseFloat(subtotal1_3).toFixed(2);
						   var v_d_t = dias_tomado;
						   
						   var subtotal2 = subT - v_d_t;
						   var subtotal2_1 = parseFloat(subtotal2).toFixed(2); 
						   
						    var valorGrupo = parseFloat(dias_propor).toFixed(2); 
					        var v_saldo = parseFloat(subtotal2_1).toFixed(2); 
					   
					   var Total_d_h2 = valorGrupo -  v_saldo;
					   if(valorImponible == null){
						   valorImponible = 0;
					   }
					  
					  var total_a_pago;
					
					   if(tipo_contrato == 1){
						   
						   if(dato5 == null){
							   dato5 = "";
						   } 
						   
						   dato5split = dato5.split("-");
						   dato5 = dato5split[2]+"-"+dato5split[1]+"-"+dato5split[0];
						   periodo_trab = dato5split[2]+dato5split[1];
						   
						   if(fecha_termino_trab != null){
							   dato5 = fecha_termino_trab;
							   dato5split = dato5.split("-");
							   dato5 = dato5split[2]+"-"+dato5split[1]+"-"+dato5split[0];
							   periodo_trab = dato5split[0]+dato5split[1];
						   }
						   else{
							   dato5split = dato5.split("-");
							   dato5 = dato5split[2]+"-"+dato5split[1]+"-"+dato5split[0];
						   }
						   
						   

						  
						   if(sumT == 0){
							   sumT = sumT;
						   }
						   if(feriadobasico_trab != null){
							   sumT = feriadobasico_trab;
						   }
						   
						  
						   
						   
						   
						   if(letra_trab != 0){
							   Letra = letra_trab;
						   }
						   
						  
						   if(inciso_trab != 0){
							   Inciso = inciso_trab;
						   }
						   
						   if(v_f_p == 0){
							   v_f_p = v_f_p;
						   }
						   if(v_f_p != 0){
							   v_f_p = v_f_p;
						   }
						   if(feriadoprogresivo_trab != null){
							   v_f_p = feriadoprogresivo_trab;
						   }
						   
						   if(v_f_c == 0){
							   v_f_c = v_f_c; 
						   }
						   if(v_f_c != 0){
							   v_f_c = v_f_c;
						   }
						   if(feriadoconvencional_trab != null){
							   v_f_c = feriadoconvencional_trab;
						   }
						   
						  
						   if(articulo_trab != 0){
							   Articulo = articulo_trab;
						   }
						   
						   console.log("sub "+subtotal1_3)
						   if(totalferiadobpc_trab != null ){
							   subtotal1_3 = totalferiadobpc_trab;
						   }
						   
						   if(diastomado_trab != 0){
							   dias_tomado = diastomado_trab;
						   }
						   if(subtotal_trab != null){
							   subtotal2_1 = subtotal_trab;
						   }
						   if(diasinhabiles_trab != 0){
							   Total_d_h2 = diasinhabiles_trab;
						   }
						   
						   if(valorProporcionaltablaFeriado != 0){
							   valorGrupo = valorProporcionaltablaFeriado;  
							   dias_basico = 0;
						   }
//						   if(proporcional_trab != 0){
//							   valorGrupo = proporcional_trab;  
//						   }
						   
						   
						   if(total_finiquito_trab != 0)
							   {
							    total_a_pago = total_finiquito_trab;
							   }
						   
						   
						   
						   if(descripcion_t == null){
							   descripcion_t = "";
						   }
						   if(descripcion_trab != null){
							   descripcion_t = descripcion_trab;
						   }
						   if(fecha_pago == null){
							   fecha_pago = ""; 
						   }
						   
						   if(fechapago_trab != null){
							   fecha_pago = fechapago_trab; 
						   }
						   
						   if(hora_pago == null){
							   hora_pago = ""; 
						   }
						   
						   if(horapago_trab != null){
							   hora_pago = horapago_trab; 
						   }
						   
						   if(lugar_pago == null){
							   lugar_pago = ""; 
						   }
						   
						   if(lugarpago_trab != null){
							   lugar_pago = lugarpago_trab; 
						   }
						
						   
						  
						   if(aviso_trabdetalle != 0)
						   {
							   aviso_trab = aviso_trabdetalle
						   }
						  
						   var total_a_pago_Total = parseInt(promedio_sueldo) + parseInt(valorImponible) +
						   parseInt(valorNoImponible) + parseInt(valorGratificacion);
						   
						   var total_pago_aviso = total_a_pago_Total;
						   ////////años de servicio//////
						   
						   if(anio_servicio != null){
								var iNum = parseInt(anio_servicio) / 365;
								var res = String(iNum).split("."); 



								var anio = res[0];
								
								if(anio == 0 ){
									
								}else{
									var resto = res[1].substring(0, 1);
									var restoCadena = 0;
									var cadena = res[1].substring(1);
									

									for (i = 0; i < cadena.length; i++) 
									{

										var numero = cadena.charAt(i);
										var numero2 = parseInt(numero);

										if (numero2 > 0) 
										{
											restoCadena = restoCadena + 1;
										}

									}// end for
									
									if(resto == 5 && restoCadena >0)
									{
										 
										 anio = parseInt(anio) +1;
										
										 anioServicio = anio;
										 console.log("año de servicio es "+anio)
									}
									else{
										
										anioServicio = anio;
										console.log("año de servicio es "+anio)
									}
								}
								
							}
						   var total_pago_anio = (total_a_pago_Total * anioServicio);
						   
						   console.log("total_pago_anio "+total_pago_anio)
						   console.log("total_a_pago_Total "+total_a_pago_Total)
						   console.log("total hd "+total_h_d)
						   ///end años de servicio/////////
						   
						   var total_a_pagoFeriados = (total_a_pago_Total /30) * valorGrupo;
						   total_a_pagoFeriados = parseInt(total_a_pagoFeriados);
						   
						   
						   if(valorHDtablaFeriado != 0)
							   {
							    total_a_pagoFeriados = valorHDtablaFeriado
							   }
						   
						   
						   
						   
						    if(valorHDtablaAnio != 0){
							   
						    	total_pago_anio  = valorHDtablaAnio
						   }
						    
						   if(valorHDtablaAviso != ""){
							   total_pago_aviso = valorHDtablaAviso
						   }
						   
						   if(total_pago_aviso == "" || total_pago_aviso == null){
							   total_pago_aviso = 0;
						   }
						 
//							   total_a_pago =  parseInt(total_pago_aviso)  + parseInt(total_pago_anio) +
//		                       parseInt(total_a_pagoFeriados) + total_h_d;
							

						   if(valorHDtablaAnio != 0){
							   
							   total_a_pago = parseInt(total_a_pagoFeriados) + total_h_d + valorHDtablaAnio + total_pago_aviso; 
						   }else{
							   total_a_pago = parseInt(total_a_pagoFeriados) + total_h_d;
						   }
						   
							   
						  
						   
						   
						  
						   total_a_pago = String(total_a_pago).replace(/(.)(?=(\d{3})+$)/g, '$1.'); 
					   }else{
						   
						   var total_pago_aviso = 0;
						   var total_pago_anio = 0;
						   
						   if(dato5 == null){
							   dato5 = "";
						   } 
						   
						   dato5split = dato5.split("-");
						   dato5 = dato5split[0]+"-"+dato5split[1]+"-"+dato5split[2];
						   periodo_trab = dato5split[2]+dato5split[1];
						   
						   if(fecha_termino_trab != null){
							   dato5 = fecha_termino_trab;
							   dato5split = dato5.split("-");
							   dato5 = dato5split[2]+"-"+dato5split[1]+"-"+dato5split[0];
							   periodo_trab = dato5split[0]+dato5split[1];
						   }
//						   +n_causal+"-"+Inciso+"-"+ n_letra +"</td>",// nombre letra
						  
						   if(sumT == 0){
							   sumT = sumT;
						   }
						   if(feriadobasico_trab != null){
							   sumT = feriadobasico_trab;
						   }
						   
						  
						   
						   
						   
						   if(letra_trab != 0){
							   Letra = letra_trab;
						   }
						   
						  
						   if(inciso_trab != 0){
							   Inciso = inciso_trab;
						   }
						   
						   if(v_f_p == 0){
							   v_f_p = v_f_p;
						   }
						   if(v_f_p != 0){
							   v_f_p = v_f_p;
						   }
						   if(feriadoprogresivo_trab != null){
							   v_f_p = feriadoprogresivo_trab;
						   }
						   
						   if(v_f_c == 0){
							   v_f_c = v_f_c; 
						   }
						   if(v_f_c != 0){
							   v_f_c = v_f_c;
						   }
						   if(feriadoconvencional_trab != null){
							   v_f_c = feriadoconvencional_trab;
						   }
						   
						  
						   if(articulo_trab != 0){
							   Articulo = articulo_trab;
						   }
						   
						   console.log("sub "+subtotal1_3)
						   if(totalferiadobpc_trab != null ){
							   subtotal1_3 = totalferiadobpc_trab;
						   }
						   
						   if(diastomado_trab != 0){
							   dias_tomado = diastomado_trab;
						   }
						   if(subtotal_trab != null){
							   subtotal2_1 = subtotal_trab;
						   }
						   if(diasinhabiles_trab != 0){
							   Total_d_h2 = diasinhabiles_trab;
						   }

						   if(valorProporcionaltablaFeriado != 0){
							   valorGrupo = valorProporcionaltablaFeriado;  
							   dias_basico = 0;
						   }
						   
						   
						   if(total_finiquito_trab != 0)
							   {
							    total_a_pago = total_finiquito_trab;
							   }
						   
						   
						   
						   if(descripcion_t == null){
							   descripcion_t = "";
						   }
						   if(descripcion_trab != null){
							   descripcion_t = descripcion_trab;
						   }
						   if(fecha_pago == null){
							   fecha_pago = null; 
						   }
						   
						   if(fechapago_trab != null){
							   fecha_pago = fechapago_trab; 
						   }
						   
						   if(hora_pago == null){
							   hora_pago = ""; 
						   }
						   
						   if(horapago_trab != null){
							   hora_pago = horapago_trab; 
						   }
						   
						   if(lugar_pago == null){
							   lugar_pago = ""; 
						   }
						   
						   if(lugarpago_trab != null){
							   lugar_pago = lugarpago_trab; 
						   }
						
						   
						  
						   if(aviso_trabdetalle != 0)
						   {
							   aviso_trab = aviso_trabdetalle
						   }
						  
						   
						   //var total_a_pago_Total = parseInt(promedio_sueldo) + parseInt(valorImponible);
						   var total_a_pago_Total = parseInt(promedio_sueldo);
						   var total_a_pagoFeriados = (total_a_pago_Total /30) * valorGrupo;
						   
						   
						   if(valorHDtablaFeriado != 0)
						   {
						    total_a_pagoFeriados = valorHDtablaFeriado
						   }else{
							   total_a_pagoFeriados = parseInt(total_a_pagoFeriados);
						   }
						   
						  
						   
						  
						   
						   
						   if(valorHDtablaAnio != 0){
							   
							   total_a_pago = parseInt(total_a_pagoFeriados) + total_h_d + valorHDtablaAnio; 
						   }else{
							   total_a_pago = parseInt(total_a_pagoFeriados) + total_h_d;
						   }
						   
						   total_a_pago = String(total_a_pago).replace(/(.)(?=(\d{3})+$)/g, '$1.');
					   }
					   
					  var peridocentra_split = periodo_centralizacion.split("-");
					      peridocentra_split = peridocentra_split[1]+peridocentra_split[0];
						 $(".dataTables_processing").show();
						 
						 
						 datosExtras +="SUELDO BASE $ "+String(promedio_sueldo).replace(/(.)(?=(\d{3})+$)/g, '$1.')+" &#10";
					     tableadd.row.add([
					          "<td class=''  style='text-align: center;'>"+ codtrab + "</td>",//codigo trabajador
					          "<td class=''  style='text-align: center;'>"+ dato2 + "</td>",// nombre trabajador
					          "<td class=''  style='text-align: center;'>"+ dato1 + "</td>",// rut
					          "<td class=''  style='text-align: center;'>"+ dato4 + "</td>",// fecha inicio
					          "<td class=''  style='text-align: center; width: 0px !important'>"+ dato5 + "</td>",// fecha termino
					          "<td class=''  style='text-align: center;'>"+ id_contrato + "</td>",// id contrato
					          "<td class=''  style='text-align: center;'>"+n_causal+"-"+Inciso+"-"+ n_letra +"</td>",// nombre letra
					          "<td class=''  style='text-align: center;'>"+ Articulo + "</td>",
					          "<td class=''  style='text-align: center;'>"+ Inciso + "</td>",
					          "<td class=''  style='text-align: center;'>"+ Letra + "</td>",
					          "<td class=''  style='text-align: center;'>"+ parseFloat(dias_basico).toFixed(2) + "</td>",// feriado basico
					          "<td class=''  style='text-align: center;'>"+ v_f_p + "</td>",//feriado progresivo
					          "<td class=''  style='text-align: center;'>"+ v_f_c + "</td>",//feriado convencional
					          "<td class=''  style='text-align: center;'>"+ subtotal1_3 + "</td>",// total total_feriado_bpc
					          "<td class=''  style='text-align: center;'>"+ dias_tomado + "</td>", // dias tomado
					          "<td class=''  style='text-align: center;'>"+ subtotal2_1 + "</td>",// subtotal
					          "<td class=''  style='text-align: center;'>"+ parseInt(Total_d_h2) + "</td>", // dias_inhabiles
					          "<td class=''  style='text-align: center;'>"+ valorGrupo + "</td>",// total_dias_proporcional
					          "<td class='tdright' style='text-align: right'>"+ total_a_pago + "</td>", // total_pago
							  "<td class=''  style='text-align: center;'>" +
							  "<button id='td"+ numeroc +"' onclick='javascript: eliminarFila(this.id);'title='Eliminar' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i>" +
							  "</button><button class='btn btn-circle blue btn-outline btn-sm'><i class='fa fa-plus' id='datoextra"+numeroc+"' title='"+datosExtras+"'></i></button>" + 
							  "</td>",
							   "<td class=''  style='text-align: center;'>"+ numeroc + "</td>",
							   "<td class=''  style='text-align: center;'>"+ descripcion_t + "</td>",
							   "<td class=''  style='text-align: center;'>"+ fecha_pago + "</td>",
							   "<td class=''  style='text-align: center;'>"+ hora_pago + "</td>",
							   "<td class=''  style='text-align: center;'>"+ lugar_pago + "</td>",
							   "<td class=''  style='text-align: center;'>"+ aviso_trab + "</td>",
							   "<td class=''  style='text-align: center;'>"+ periodo_trab + "</td>",
							   "<td class=''  style='text-align: center;'>"+ total_pago_aviso + "</td>",
							   "<td class=''  style='text-align: center;'>"+ total_pago_anio + "</td>",
							   "<td class=''  style='text-align: center;'>"+ total_a_pagoFeriados + "</td>",
							   "<td class=''  style='text-align: center;'>"+ peridocentra_split + "</td>",
							   
							   ]).node().id = "td"
									+ numeroc;
							tableadd.draw();
							var datosLista = ["td"+ numeroc, codtrab]; 
							
							trabajadorEnLista.push(datosLista);
							$(".dataTables_processing").hide();
							
							numeroc = numeroc + 1;
					  			
					  		}
					  	}).fail(function(jqXHR, textStatus, errorThrown) {

							    alerta(errorThrown);
								$("#loading").hide();
							}).done(function() {
								$("#loading").hide();
							})	
				    
				    
		  		}
	
		  	}).fail(function(jqXHR, textStatus, errorThrown) {

				    alerta(errorThrown);
					$("#loading").hide();
				}).done(function() {
					$("#loading").hide();
				})
			
			      
			   
				
				
						
						
					
}



function monthDiff(day1, day2) {
	
	
	var d1 = day1, d2 = day2;
	if (day1 < day2) {
	d1 = day2;
	d2 = day1;
	}

	var m = (d1.getFullYear() - d2.getFullYear()) * 12 + (d1.getMonth() - d2.getMonth());

	if (d1.getDate() < d2.getDate()) --m;

	return m;

	}

function Enviar(){
	var table = $('#tbl_Info').DataTable(); 
	var nFilas = table.rows().count();
	var existe = $("#tbl_Info td").hasClass("dataTables_empty");
	
	peticion2 = [];

	if (nFilas == 0) {
		alerta("Debe Agregar la Lista Antes de Enviar");
		return;
	} else if (existe == true) {
		alerta("No hay datos Disponibles");
		return;
	} else {
	
		var cells1 = new Array();
		var codigo = new Array();
		cells1 = table.row().column(0).data().draw();
		for (var i = 0; i < cells1.length; i++) {
			var cod_trabajador = cells1[i];
			var cod = $(cod_trabajador).text();
			codigo.push(cod);
		}
		
		// nombre trabajador
		var cells2 = new Array();
		var nombre_trab = new Array();
		cells2 = table.row().column(1).data().draw();
		for (var i = 0; i < cells2.length; i++) {
			var nom_trabajador = cells2[i];
			var nom_t = $(nom_trabajador).text();
			nombre_trab.push(nom_t);

		}
		// rut trabajador
		var cells3 = new Array();
		var rut_trab = new Array();
		cells3 = table.row().column(2).data().draw();
		for (var i = 0; i < cells3.length; i++) {
			var rut_trabajador = cells3[i];
			var rut_t = $(rut_trabajador).text();
			rut_trab.push(rut_t);

		}
		// Fecha inicio contrato
		
		var cells4 = new Array();
		var fechaI_trab = new Array();
		cells4 = table.row().column(3).data().draw();
		for (var i = 0; i < cells4.length; i++) {
			var fechaI_trabajador = cells4[i];
			var fechaI_t = $(fechaI_trabajador).text();
			var fechaI_t_split = fechaI_t.split('-'); 
			fechaI_trab.push(fechaI_t_split[0]+"-"+fechaI_t_split[1]+"-"+fechaI_t_split[2]);

		}
		// fecha termino contrato 
		
		var periodo_tra = "";
		var cells5 = new Array();
		var fechaT_trab = new Array();
		cells5 = table.row().column(4).data().draw();
		for (var i = 0; i < cells5.length; i++) {
			var fechaT_trabajador = cells5[i];
			var FechaT_t = $(fechaT_trabajador).text();
			var fechaT_t_split = FechaT_t.split('-');
			fechaT_trab.push(fechaT_t_split[2]+"-"+fechaT_t_split[1]+"-"+fechaT_t_split[0]);
			periodo_tra = fechaT_t_split[0]+ fechaT_t_split[1];

		}
		// id contrato 
		
		var cells6 = new Array();
		var idcontrato_trab = new Array();
		cells6 = table.row().column(5).data().draw();
		for (var i = 0; i < cells6.length; i++) {
			var idcontr_trabajador = cells6[i];
			var idContrato_t = $(idcontr_trabajador).text();
			idcontrato_trab.push(idContrato_t);

		}
		
		// causal 
		
		var cells7 = new Array();
		var causal_trab = new Array();
		cells7 = table.row().column(6).data().draw();
		for (var i = 0; i < cells7.length; i++) {
			var causal_trabajador = cells7[i];
			var causal_t = $(causal_trabajador).text();
			causal_trab.push(causal_t);

		}
		
		// articulo
		
		var cells9 = new Array();
		var articulo_trab = new Array();
		cells9 = table.row().column(7).data().draw();
		for (var i = 0; i < cells9.length; i++) {
			var articulo_trabajador = cells9[i];
			var articulo_t = $(articulo_trabajador).text();
			articulo_trab.push(articulo_t);

		}
		
		// inciso
		
		var cells10 = new Array();
		var inciso_trab = new Array();
		cells10 = table.row().column(8).data().draw();
		for (var i = 0; i < cells10.length; i++) {
			var inciso_trabajador = cells10[i];
			var inciso_t = $(inciso_trabajador).text();
			inciso_trab.push(inciso_t);

		}
		
		// letra
		
		var cells11 = new Array();
		var letra_trab = new Array();
		cells11 = table.row().column(9).data().draw();
		for (var i = 0; i < cells11.length; i++) {
			var letra_trabajador = cells11[i];
			var letra_t = $(letra_trabajador).text();
			letra_trab.push(letra_t);

		}
		
		//  Feriado Básico
		var cells12 = new Array();
		var feriadobasico_trab = new Array();
		cells12 = table.row().column(10).data().draw();
		for (var i = 0; i < cells12.length; i++) {
			var feriadoBasico_trabajador = cells12[i];
			var feriadoBasico_t = $(feriadoBasico_trabajador).text();
			feriadobasico_trab.push(feriadoBasico_t);

		}
		//feriado_progresivo
		var cells30 = new Array();
		var feriadoprogresivo_trab = new Array();
		cells30 = table.row().column(11).data().draw();
		for (var i = 0; i < cells30.length; i++) {
			var feriadoprogresivo_trabajador = cells30[i];
			var feriadoprogresivo_t = $(feriadoprogresivo_trabajador).text();
			feriadoprogresivo_trab.push(feriadoprogresivo_t);

		}
		
		
		//feriado_convencional
		var cells31 = new Array();
		var feriadoprogresivo_trab = new Array();
		cells31 = table.row().column(12).data().draw();
		for (var i = 0; i < cells31.length; i++) {
			var convencional_trabajador = cells31[i];
			var convencional_t = $(convencional_trabajador).text();
			feriadoprogresivo_trab.push(convencional_t);

		}
		
		// total_feriado_bpc
		var cells15 = new Array();
		var totalFeriadoBPC_trab = new Array();
		cells15 = table.row().column(13).data().draw();
		for (var i = 0; i < cells15.length; i++) {
			var totalFeriadoBPC_trabajador = cells15[i];
			var totalFeriadoBPC_t = $(totalFeriadoBPC_trabajador).text();
			totalFeriadoBPC_trab.push(totalFeriadoBPC_t);

		}
		
		// dias_tomado
		var cells16 = new Array();
		var DiasTomado_trab = new Array();
		cells16 = table.row().column(14).data().draw();
		for (var i = 0; i < cells16.length; i++) {
			var DiasTomado_trabajador = cells16[i];
			var DiasTomado_t = $(DiasTomado_trabajador).text();
			DiasTomado_trab.push(DiasTomado_t);

		}

		// subtotal
		var cells17 = new Array();
		var subTotal_trab = new Array();
		cells17 = table.row().column(15).data().draw();
		for (var i = 0; i < cells17.length; i++) {
			var subTotal_trabajador = cells17[i];
			var subTotal_t = $(subTotal_trabajador).text();
			subTotal_trab.push(subTotal_t);

		}
        
		// dias_inhabiles
		var cells18 = new Array();
		var diasInhabiles_trab = new Array();
		cells18 = table.row().column(16).data().draw();
		for (var i = 0; i < cells18.length; i++) {
			var diasInhabiles_trabajador = cells18[i];
			var diasInhabiles_t = $(diasInhabiles_trabajador).text();
			diasInhabiles_trab.push(diasInhabiles_t);

		}
		
		// total_dias_proporcional
		var cells19 = new Array();
		var totalDiasProporcional_trab = new Array();
		cells19 = table.row().column(17).data().draw();
		for (var i = 0; i < cells19.length; i++) {
			var totalDiasProporcional_trabajador = cells19[i];
			var totalDiasProporcional_t = $(totalDiasProporcional_trabajador).text();
			totalDiasProporcional_trab.push(totalDiasProporcional_t);

		}
		
		// Total Pago
		var cells20 = new Array();
		var totalPago_trab = new Array();
		cells20 = table.row().column(18).data().draw();
		for (var i = 0; i < cells20.length; i++) {
			var totalPago_trabajador = cells20[i];
			var totalPago_t = $(totalPago_trabajador).text();
			totalPago_trab.push(totalPago_t.replace(/\./g, ''));

		}
  
		// descripcion trab
		var cells21 = new Array();
		var descripcion_trab = new Array();
		cells21 = table.row().column(21).data().draw();
		for (var i = 0; i < cells21.length; i++) {
			var descripcion_trabajador = cells21[i];
			var descripcion_t = $(descripcion_trabajador).text();
			if(descripcion_t == null){
				descripcion_t = "";
			}
			descripcion_trab.push(descripcion_t);

		}
		
		// fecha pago
		var cells22 = new Array();
		var fechaPago_trab = new Array();
		cells22 = table.row().column(22).data().draw();
		for (var i = 0; i < cells22.length; i++) {
			var fechaPago_trabajador = cells22[i];
			var fechaPago_t = $(fechaPago_trabajador).text();
			fechaPago_trab.push(fechaPago_t);

		}

		// Hora Pago
		var cells24 = new Array();
		var horaPago_trab = new Array();
		cells24 = table.row().column(23).data().draw();
		for (var i = 0; i < cells24.length; i++) {
			var horaPago_trab_trabajador = cells24[i];
			var horaPago_trab_t = $(horaPago_trab_trabajador).text()
			horaPago_trab.push(horaPago_trab_t);

		}
		
		// lugar de pago
		var cells23 = new Array();
		var lugarPago_trab = new Array();
		cells23 = table.row().column(24).data().draw();
		for (var i = 0; i < cells23.length; i++) {
			var lugarPago_trabajador = cells23[i];
			var lugarPago_t = $(lugarPago_trabajador).text();
			lugarPago_trab.push(lugarPago_t);

		}
        
		// aviso
		var cells32 = new Array();
		var aviso_trab = new Array();
		cells32 = table.row().column(25).data().draw();
		for (var i = 0; i < cells32.length; i++) {
			var aviso_trabajador = cells32[i];
			var aviso_t = $(aviso_trabajador).text();
			aviso_trab.push(aviso_t);

		}
       // PERIODO 
		var cells33 = new Array();
		var periodo_traba = new Array();
		cells33 = table.row().column(26).data().draw();
		for (var i = 0; i < cells33.length; i++) {
			var periodo_trabajador = cells33[i];
			var periodo_t = $(periodo_trabajador).text();
			periodo_traba.push(periodo_t);

		}
		
		// INDEMNIZACION MES DE NO AVISO 
		var cells34 = new Array();
		var noaviso_trab = new Array();
		cells34 = table.row().column(27).data().draw();
		for (var i = 0; i < cells34.length; i++) {
			var noaviso_trabajador = cells34[i];
			var noaviso_t = $(noaviso_trabajador).text();
			if(noaviso_t == "undefined"){
				noaviso_t = 0;
			}
			noaviso_trab.push(noaviso_t);

		}
		
		// INDEMNIZACION AÑOS DE SERVICIO 
		var cells35 = new Array();
		var anioServicio_trab = new Array();
		cells35 = table.row().column(28).data().draw();
		for (var i = 0; i < cells35.length; i++) {
			var anioServicio_trabajador = cells35[i];
			var anioServicio_t = $(anioServicio_trabajador).text();
			anioServicio_trab.push(anioServicio_t);

		}
		
		// PAGO FERIADOS PROPORCIONALES 
		var cells36 = new Array();
		var FeriadoPropor_trab = new Array();
		cells36 = table.row().column(29).data().draw();
		for (var i = 0; i < cells36.length; i++) {
			var FeriadoPropor_trabajador = cells36[i];
			var FeriadoPropor_t = $(FeriadoPropor_trabajador).text();
			FeriadoPropor_trab.push(FeriadoPropor_t);

		}
		
		var cells37 = new Array();
		var centralizacion_trab = new Array();
		cells37 = table.row().column(30).data().draw();
		for (var i = 0; i < cells37.length; i++) {
			var centralizacion_trab_trabajador = cells37[i];
			var centralizacion_trab_t = $(centralizacion_trab_trabajador).text();
			centralizacion_trab.push(centralizacion_trab_t);

		}

		var nFilas = table.rows().count();

		for (var i = 0; i < nFilas; i++) {

		
				var json2 = {

						codigo_trabajador : codigo[i],
						fecha_inicio : fechaI_trab[i],
						fecha_termino : fechaT_trab[i],
						id_contrato : idcontrato_trab[i],
						articulo :articulo_trab[i],
						inciso : inciso_trab[i],
					    letra : letra_trab[i],
					    feriadobasico : feriadobasico_trab[i],
					    totalferiadobpc : totalFeriadoBPC_trab[i],
					    diastomado: DiasTomado_trab[i],
					    subtotal : subTotal_trab[i],
					    diasinhabiles : diasInhabiles_trab[i],
					    totaldiasproporcional : totalDiasProporcional_trab[i],
					    total_finiquito : totalPago_trab[i],
					    descripcion : descripcion_trab[i],
					    rut : rut_trab[i],
					    periodo : periodo_traba[i],
						fechapago : fechaPago_trab[i],
						lugarpago : lugarPago_trab[i],
				        horapago : horaPago_trab[i],
				        sociedad : $("#Sociedad").val(),
				        feriadoprogresivo : feriadoprogresivo_trab[i],
				        feriadoconvencional : feriadoprogresivo_trab[i],
				        aviso : aviso_trab[i],
				        montoaviso : noaviso_trab[i],
				        montoanio : anioServicio_trab[i],
				        montoferiado : FeriadoPropor_trab[i],
				        peridocentralizacion : parseInt(centralizacion_trab)
				        
						
				        
				}
				peticion2.push(json2);
			

		}
		
		console.log(peticion2);
 
		$.ajax({
			url : "/simpleWeb/json/work/insertFiniquitoMasivo/",
			type : "PUT",
			data : JSON.stringify(peticion2),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
				$("#loading").show();

			},
			success : function(data, textStatus, jqXHR) {
                if(data == true){
                	alerta("Enviado");
                }else{
                	alerta("No Enviado");
                }
                var table = $('#tbl_Info').DataTable();
				table.clear().draw();
				
				trabajadores();
          
				$("#loading").hide();
			},error: function (e){alerta("no enviado")}
		}).fail(function(jqXHR, textStatus, errorThrown) {

			alerta(errorThrown);
			
			$("#loading").hide();
		})
	}
	
	trabajadorEnLista = [];
	
}

function eliminarFila(id) {

	
for (var i = 0; i < trabajadorEnLista.length; i++) {
		
	    if(trabajadorEnLista[i][0] == ''+id+'')
	    {
	    	trabajadorEnLista.splice(i, 1);
	    	
	    }
	   
	    
	}
	
	
	var res = id.slice(2);

	

	var table = $('#tbl_Info').DataTable({
		stateSave : true
	});

	var info = table.page.info();
	var numberpage = info.page;

	var str = id;
	var res = str.slice(2);

	table.row("#" + id + "").remove({

	});
	table.page(numberpage).draw(false);

	$("#" + id + " td").each(function() {
		$("#" + id + " tr").remove();
		$("#" + id + "").remove();
	});

}

 

  function addAll(){
	
	
	  periodo_centralizacion = $("#fechaCuotas").val();
		
		if(periodo_centralizacion == ""){
			
			alerta("Debe Seleccionar un Periodo de Centralizacón");
			$("#fechaCuotas").focus();
			return;
		}
	
	var dias_propor = 0;
	
	var options = $('#CodigoTra option');

	var values = $.map(options, function(option) {
		return option.value;
	});

	var codidos_trabajador;
	var codTrab = [];
	
	$('#loading').css('z-index', '15000');
	for (var i = 0; i < values.length; i++) {

		
		if(values[i] == 0){
			
				
			
		}
		else{
			

			 var codigo_trabajador = values[i];
			 var hora_pago;
			 var periodo_trab;
			 
			
			 
			   
			   $.ajax({
					  		type : "GET",
					  		url : "/simpleWeb/json/work/obtenerSueldoLiquidoTemporal/"+codigo_trabajador+"",
					  		async: false,
					  		dataType : "json",
					  		success : function(data) {
					  			$("#loading").show();
					  		
					  			var numeroDato = 0;
					  			$.each(data, function(k, v){
					  				if(numeroDato == 0){
					  			    
					  					dato1 = v.rut;
							  		    dato2 = v.appaterno+" "+v.apmaterno+" "+v.nombre;
							  			dato3 = v.nombre_sociedad;
							  			dato4 = v.fecha_inicio.split('-'); 
							  			dato4 = dato4[2]+"-"+dato4[1]+"-"+dato4[0];
							  			dato5 = v.fecha_termino.split('-');
							  			dato5 = dato5[2]+"-"+dato5[1]+"-"+dato5[0];
							  			fecha_meses_inicio = v.fecha_inicio;
							  			fecha_meses_termino = v.fecha_termino;
							  			dato6 = v.id_trabajador;
							  			Articulo = v.articulo;
							  			Inciso = v.inciso;
							  			Letra = v.letra;
							  			check_aviso = v.aviso;
							  			fecha_pago = v.fechapago;
							  			lugar_pago = v.lugarpago;
							  			hora_pago = v.horapago;
							  			anio_servicio = v.dias;
							  			dias_tomado = v.diastomado;
							  			tipo_contrato = v.tipocontrato;
							  			descripcion_t = v.descripcion;
							  			codtrab = v.codigo_trabajador;
							  			id_contrato = v.id_contrato;
							  			promedio_sueldo = v.valor;
							  			valorImponible = v.valorasignacionesimponibles;
							  			valorNoImponible = v.valornoimponible;
							  			valorGratificacion = v.valorgratificacion;
							  			n_letra = v.nombre_letra;
							  			n_causal = v.nombre_causal;
							  			aviso_trab = v.aviso;
					  				}
					  				
					  				console.log("hora pago es "+hora_pago)
					  				numeroDato ++;
					  			})
					  			
					  			if(n_letra == null){
					  				n_letra = "";
					  			}
					  			
					  			///////////////////////////////////////////////////
					  		///  CALCULAR DIAS PROPORCIONALES	
								
					  			var fecha_i = dato4.split('-');
								var fecha_T = dato5.split('-');
								var fecha_T_Enviar = fecha_T[2]+"-"+fecha_T[1]+"-"+fecha_T[0];
								fecha_terminoT = fecha_T_Enviar;

								var suna_Total;
								var diasDelMes = 30;
								var porcentaje_dia;
								var porcentaje_dia_T;
								var porcentaje_mes = 1.25;

								var dia_inicio = fecha_i[0];
								var total_1_mes;
								var total_1_mes_T;

								var dia_inicioTermino = fecha_T[0];
								var total_1_mesTermino;
						        
								// calculamos dia de inicio
								var diames = new Date(fecha_i[2], fecha_i[1], 0).getDate();
								var resultadoDias = diames - dia_inicio;
								porcentaje_dia = porcentaje_mes / diasDelMes;
								total_1_mes = (resultadoDias +1) * porcentaje_dia;

						        // calculamos dias del mes 30 - dia inicio termino 
								var resultadoDiasTermino = (dia_inicioTermino);
								porcentaje_dia_T = porcentaje_mes / diasDelMes;
								// total mes de termino
								
								if(resultadoDiasTermino == 31){
									resultadoDiasTermino = 30;
								}
								total_1_mes_T = resultadoDiasTermino * porcentaje_dia_T;

								var total_mesInicial_mesFinal = total_1_mes + total_1_mes_T;
								
								var total_mesInicial_mesFinal = 0;
								 if(fecha_i[1] == fecha_T[1]){
									 total_mesInicial_mesFinal = total_1_mes_T;
								 }else
								 {
									 total_mesInicial_mesFinal = total_1_mes + total_1_mes_T;
								 }

								
								var options = {  day: 'numeric', month: 'long', year: 'numeric',   };
								
								var fechai_split = fecha_meses_inicio.split('-');
								var fechaT_split = fecha_meses_termino.split('-');
								
								
								var fechaI = new Date(fechai_split[0],fechai_split[1] -1,fechai_split[2])
								var fechaF = new Date(fechaT_split[0],fechaT_split[1] -1,fechaT_split[2])

								var difM = fechaF - fechaI // diferencia en milisegundos
								var difD = difM / (1000 * 60 * 60 * 24) // diferencia en dias

								var dias_trabajado = difD +1;
								
								console.log("dias trabajado = "+dias_trabajado);
								
								
								
								
								if(dias_trabajado >= 31)
								
								{
								  
									dt1 = new Date(fechai_split[0],fechai_split[1] -1,fechai_split[2]);
									dt2 = new Date(fechaT_split[0],fechaT_split[1] -1,fechaT_split[2]);
								  
								
								var fecha1_dt = dt1.toLocaleDateString("en-EN", options);
								var fecha2_dt = dt2.toLocaleDateString("en-EN", options);

								dt11 = new Date(fecha1_dt);
								dt22 = new Date(fecha2_dt);
								
								
								
								var mesesEntrePeriodos = monthDiffPrueba5(''+fecha_meses_inicio,''+fecha_meses_termino);
								
								mesesEntrePeriodos = parseInt(mesesEntrePeriodos) * porcentaje_mes;
							
								
								
								var mes1 = fechaT_split[1]; var mes2 = fechai_split[1]; 
								var totalmes =  mes1 - mes2; 
								if(totalmes == 1 && fechai_split[0] == fechaT_split[0]){
									suna_Total = total_mesInicial_mesFinal;
								}else{
									suna_Total = total_mesInicial_mesFinal + mesesEntrePeriodos;
								}
								
								
								}
								else{
									suna_Total = 0;
								}
								var sumT;
								if(dias_trabajado >= 31){
									sumT = parseFloat(suna_Total - dias_tomado).toFixed(2);
									$("#diastomado").val(dias_tomado);
								}else{
									sumT = parseFloat(suna_Total).toFixed(2);
									$("#diastomado").val(0);
								}
								//////////////////////////////////////////////////////////////////////
								var valorHDtablaFeriado = 0;
								var anioServicio = 0;
								var valorHDtablaAnio = 0;
								var valorProporcionaltablaFeriado = 0;
								var valorHDtablaAnio = 0;
								dias_basico = suna_Total;
							    var total_h_d = 0;
							    var valorHDtablaAviso = 0;
							    var datosExtras = "";
								$("#loading").show();
								 $.ajax({
								  		type : "GET",
								  		url : '/simpleWeb/json/work/DiasProporcionalesMasivo/'+fecha_T_Enviar+','+sumT+','+codigo_trabajador+','+id_contrato+'',
								  		async: false,
								  		dataType : "JSON",
								  		success : function(data) {
								  			
								  			console.log(data);
								  			var contador = 0;
								  			var tipo_hd = "";
								  			$.each(data, function(k, v) {
								  				
								  				if(contador == 0)
								  					{
								  					
								  					    articulo_trab = v.articulo;
								  					    diasinhabiles_trab = v.diasinhabiles;
								  					    diastomado_trab = v.diastomado;
								  					    fechapago_trab = v.fechapago;
								  					    fecha_termino_trab = v.fecha_termino;
								  					    feriadobasico_trab = v.feriadobasico;
								  					    feriadoconvencional_trab = v.feriadoconvencional;
								  					    feriadoprogresivo_trab = v.feriadoprogresivo;
								  					    horapago_trab = v.horapago;
								  					    inciso_trab = v.inciso;
								  					    letra_trab = v.letra;
								  					    lugarpago_trab = v.lugarpago;
								  					    proporcional_trab = v.proporcional;
								  					    subtotal_trab = v.subtotal;
								  					    total_finiquito_trab = v.total_finiquito;
								  					    totalferiadobpc_trab = v.totalferiadobpc;
								  					    descripcion_trab = v.descripcion;
								  					    aviso_trabdetalle = v.aviso;
								  					    
								  					    
								  					    
										  				dias_propor = parseFloat(v.proporcional).toFixed(2);
										  				contador ++;
								  					}else{
								  						if(v.codHD == 2006 || v.codHD == 2007 || v.codHD == 2008)
								  						{
								  							if(v.codHD == 2006){
								  								valorHDtablaFeriado = v.montoHD;
								  								valorProporcionaltablaFeriado = v.diasint;
								  								
								  							}else if(v.codHD == 2007){
								  								valorHDtablaAnio = v.montoHD;
								  							
								  							}else if(v.codHD == 2008){
								  								valorHDtablaAviso = v.montoHD;
								  							}
								  						}else{
								  							if(v.tipoHD == "h"){
									  				        	tipo_hd = "HABER";
									  				        	total_h_d = total_h_d + v.montoHD;
									  				        	datosExtras +="$ "+String(v.montoHD).replace(/(.)(?=(\d{3})+$)/g, '$1.')+" "+tipo_hd+" "+v.nombreHD+" &#10";
									  				        }else if(v.tipoHD == "d"){
									  				        	tipo_hd = "DESCUENTO";
									  				        	total_h_d = total_h_d - v.montoHD;
									  				        	datosExtras +="$ "+String(v.montoHD).replace(/(.)(?=(\d{3})+$)/g, '$1.')+" "+tipo_hd+" "+v.nombreHD+" &#10";
									  				        }
									  				      else if(v.tipoHD == "hn"){
									  				        	tipo_hd = "HABER NO IMPONIBLE";
									  				        	total_h_d = total_h_d + v.montoHD;
									  				        	datosExtras +="$ "+String(v.montoHD).replace(/(.)(?=(\d{3})+$)/g, '$1.')+" "+tipo_hd+" "+v.nombreHD+" &#10";
									  				        	
									  				        }
									  						
									  					
								  						}
								  					}
								  				
											})
											/////////////////////////////////////////////////////////////
											
											var tableadd = $('#tbl_Info').DataTable({
												"language" : {
													"processing" : "Cargando...."
												}
											});
									 
									 
									 var v_f_b = parseFloat(dias_basico).toFixed(2); 
									 var v_f_p = 0; // falta dato de marcelo
									 var v_f_c = 0; // falta dato de marcelo
									   

									   var subtotal1 =  v_f_b + v_f_p + v_f_c;
									   var subtotal1_3 = parseFloat(subtotal1).toFixed(2); 
									   
									   
									   var subT = parseFloat(subtotal1_3).toFixed(2);
									   var v_d_t = dias_tomado;
									   
									   var subtotal2 = subT - v_d_t;
									   var subtotal2_1 = parseFloat(subtotal2).toFixed(2); 
									   
									    var valorGrupo = parseFloat(dias_propor).toFixed(2); 
								        var v_saldo = parseFloat(subtotal2_1).toFixed(2); 
								   
								   var Total_d_h2 = valorGrupo -  v_saldo;
								   if(valorImponible == null){
									   valorImponible = 0;
								   }
								  
								  var total_a_pago;
								
								   if(tipo_contrato == 1){
									   
									   if(dato5 == null){
										   dato5 = "";
									   } 
									   dato5split = dato5.split("-");
									   dato5 = dato5split[2]+"-"+dato5split[1]+"-"+dato5split[0];
									   periodo_trab = dato5split[2]+dato5split[1];
									   
									   if(fecha_termino_trab != null){
										   dato5 = fecha_termino_trab;
										   dato5split = dato5.split("-");
										   dato5 = dato5split[2]+"-"+dato5split[1]+"-"+dato5split[0];
										   periodo_trab = dato5split[0]+dato5split[1];
									   }
									   

									  
									   if(sumT == 0){
										   sumT = sumT;
									   }
									   if(feriadobasico_trab != null){
										   sumT = feriadobasico_trab;
									   }
									   
									  
									   
									   
									   
									   if(letra_trab != 0){
										   Letra = letra_trab;
									   }
									   
									  
									   if(inciso_trab != 0){
										   Inciso = inciso_trab;
									   }
									   
									   if(v_f_p == 0){
										   v_f_p = v_f_p;
									   }
									   if(v_f_p != 0){
										   v_f_p = v_f_p;
									   }
									   if(feriadoprogresivo_trab != null){
										   v_f_p = feriadoprogresivo_trab;
									   }
									   
									   if(v_f_c == 0){
										   v_f_c = v_f_c; 
									   }
									   if(v_f_c != 0){
										   v_f_c = v_f_c;
									   }
									   if(feriadoconvencional_trab != null){
										   v_f_c = feriadoconvencional_trab;
									   }
									   
									  
									   if(articulo_trab != 0){
										   Articulo = articulo_trab;
									   }
									   
									   console.log("sub "+subtotal1_3)
									   if(totalferiadobpc_trab != null ){
										   subtotal1_3 = totalferiadobpc_trab;
									   }
									   
									   if(diastomado_trab != 0){
										   dias_tomado = diastomado_trab;
									   }
									   if(subtotal_trab != null){
										   subtotal2_1 = subtotal_trab;
									   }
									   if(diasinhabiles_trab != 0){
										   Total_d_h2 = diasinhabiles_trab;
									   }
									  
									   if(valorProporcionaltablaFeriado != 0){
										   valorGrupo = valorProporcionaltablaFeriado;  
										   dias_basico = 0;
									   }
									   
									   
									   if(total_finiquito_trab != 0)
										   {
										    total_a_pago = total_finiquito_trab;
										   }
									   
									   
									   
									   if(descripcion_t == null){
										   descripcion_t = "";
									   }
									   if(descripcion_trab != null){
										   descripcion_t = descripcion_trab;
									   }
									   if(fecha_pago == null){
										   fecha_pago = ""; 
									   }
									   
									   if(fechapago_trab != null){
										   fecha_pago = fechapago_trab; 
									   }
									   
									   if(hora_pago == null){
										   hora_pago = ""; 
									   }
									   
									   if(horapago_trab != null){
										   hora_pago = horapago_trab; 
									   }
									   
									   if(lugar_pago == null){
										   lugar_pago = ""; 
									   }
									   
									   if(lugarpago_trab != null){
										   lugar_pago = lugarpago_trab; 
									   }
									
									   
									  
									   if(aviso_trabdetalle != 0)
									   {
										   aviso_trab = aviso_trabdetalle
									   }
									  
									   var total_a_pago_Total = parseInt(promedio_sueldo) + parseInt(valorImponible) +
									   parseInt(valorNoImponible) + parseInt(valorGratificacion);
									   
									   var total_pago_aviso = total_a_pago_Total;
									   ////////años de servicio//////
									   
									   if(anio_servicio != null){
											var iNum = parseInt(anio_servicio) / 365;
											var res = String(iNum).split("."); 



											var anio = res[0];
											
											if(anio == 0 ){
												
											}else{
												var resto = res[1].substring(0, 1);
												var restoCadena = 0;
												var cadena = res[1].substring(1);
												

												for (i = 0; i < cadena.length; i++) 
												{

													var numero = cadena.charAt(i);
													var numero2 = parseInt(numero);

													if (numero2 > 0) 
													{
														restoCadena = restoCadena + 1;
													}

												}// end for
												
												if(resto == 5 && restoCadena >0)
												{
													 
													 anio = parseInt(anio) +1;
													
													 anioServicio = anio;
													 console.log("año de servicio es "+anio)
												}
												else{
													
													anioServicio = anio;
													console.log("año de servicio es "+anio)
												}
											}
											
										}
									   var total_pago_anio = (total_a_pago_Total * anioServicio);
									   
									   console.log("total_pago_anio "+total_pago_anio)
									   console.log("total_a_pago_Total "+total_a_pago_Total)
									   console.log("total hd "+total_h_d)
									   ///end años de servicio/////////
									   
									   var total_a_pagoFeriados = (total_a_pago_Total /30) * valorGrupo;
									   total_a_pagoFeriados = parseInt(total_a_pagoFeriados);
									   
									   
									   if(valorHDtablaFeriado != 0)
										   {
										    total_a_pagoFeriados = valorHDtablaFeriado
										   }
									   
									   
									   
									   
									    if(valorHDtablaAnio != ""){
										   
									    	total_pago_anio  = valorHDtablaAnio
									   }
									   if(valorHDtablaAviso != ""){
										   total_pago_aviso = valorHDtablaAviso
									   }
									 
//										   total_a_pago =  parseInt(total_pago_aviso)  + parseInt(total_pago_anio) +
//					                       parseInt(total_a_pagoFeriados) + total_h_d;
									  
									   if(total_pago_aviso == "" || total_pago_aviso == null){
										   total_pago_aviso = 0;
									   }
									   
									   if(valorHDtablaAnio != 0){
										   
										   total_a_pago = parseInt(total_a_pagoFeriados) + total_h_d + valorHDtablaAnio + total_pago_aviso; 
									   }else{
										   total_a_pago = parseInt(total_a_pagoFeriados) + total_h_d;
									   }
									   
									  
									   total_a_pago = String(total_a_pago).replace(/(.)(?=(\d{3})+$)/g, '$1.'); 
								   }else{
									   
									   var total_pago_aviso = 0;
									   var total_pago_anio = 0;
									   if(dato5 == null){
										   dato5 = "";
									   } 
									   dato5split = dato5.split("-");
									   dato5 = dato5split[0]+"-"+dato5split[1]+"-"+dato5split[2];
									   periodo_trab = dato5split[2]+dato5split[1];
									   
									   if(fecha_termino_trab != null){
										   dato5 = fecha_termino_trab;
										   dato5split = dato5.split("-");
										   dato5 = dato5split[2]+"-"+dato5split[1]+"-"+dato5split[0];
										   periodo_trab = dato5split[0]+dato5split[1];
									   }
//									   +n_causal+"-"+Inciso+"-"+ n_letra +"</td>",// nombre letra
									  
									   if(sumT == 0){
										   sumT = sumT;
									   }
									   if(feriadobasico_trab != null){
										   sumT = feriadobasico_trab;
									   }
									   
									  
									   
									   
									   
									   if(letra_trab != 0){
										   Letra = letra_trab;
									   }
									   
									  
									   if(inciso_trab != 0){
										   Inciso = inciso_trab;
									   }
									   
									   if(v_f_p == 0){
										   v_f_p = v_f_p;
									   }
									   if(v_f_p != 0){
										   v_f_p = v_f_p;
									   }
									   if(feriadoprogresivo_trab != null){
										   v_f_p = feriadoprogresivo_trab;
									   }
									   
									   if(v_f_c == 0){
										   v_f_c = v_f_c; 
									   }
									   if(v_f_c != 0){
										   v_f_c = v_f_c;
									   }
									   if(feriadoconvencional_trab != null){
										   v_f_c = feriadoconvencional_trab;
									   }
									   
									  
									   if(articulo_trab != 0){
										   Articulo = articulo_trab;
									   }
									   
									   console.log("sub "+subtotal1_3)
									   if(totalferiadobpc_trab != null ){
										   subtotal1_3 = totalferiadobpc_trab;
									   }
									   
									   if(diastomado_trab != 0){
										   dias_tomado = diastomado_trab;
									   }
									   if(subtotal_trab != null){
										   subtotal2_1 = subtotal_trab;
									   }
									   if(diasinhabiles_trab != 0){
										   Total_d_h2 = diasinhabiles_trab;
									   }
									   if(valorProporcionaltablaFeriado != 0){
										   valorGrupo = valorProporcionaltablaFeriado;  
									   }
									   
									   
									   if(total_finiquito_trab != 0)
										   {
										    total_a_pago = total_finiquito_trab;
										   }
									   
									   
									   
									   if(descripcion_t == null){
										   descripcion_t = "";
									   }
									   if(descripcion_trab != null){
										   descripcion_t = descripcion_trab;
									   }
									   if(fecha_pago == null){
										   fecha_pago = null; 
									   }
									   
									   if(fechapago_trab != null){
										   fecha_pago = fechapago_trab; 
									   }
									   
									   if(hora_pago == null){
										   hora_pago = ""; 
									   }
									   
									   if(horapago_trab != null){
										   hora_pago = horapago_trab; 
									   }
									   
									   if(lugar_pago == null){
										   lugar_pago = ""; 
									   }
									   
									   if(lugarpago_trab != null){
										   lugar_pago = lugarpago_trab; 
									   }
									
									   
									  
									   if(aviso_trabdetalle != 0)
									   {
										   aviso_trab = aviso_trabdetalle
									   }
									  
									   
//									   var total_a_pago_Total = parseInt(promedio_sueldo) + parseInt(valorImponible);
//									   var total_a_pagoFeriados = (total_a_pago_Total /30) * valorGrupo;
									   
									   var total_a_pago_Total = parseInt(promedio_sueldo);
									   var total_a_pagoFeriados = (total_a_pago_Total /30) * valorGrupo;
									   
									   if(valorHDtablaFeriado != 0)
									   {
									    total_a_pagoFeriados = valorHDtablaFeriado
									   }else{
										   total_a_pagoFeriados = parseInt(total_a_pagoFeriados);
									   }
									   
									   
									   
									   if(valorHDtablaAnio != 0){
										   
										   total_a_pago = parseInt(total_a_pagoFeriados) + total_h_d + valorHDtablaAnio; 
									   }else{
										   total_a_pago = parseInt(total_a_pagoFeriados) + total_h_d;
									   }
									   total_a_pago = String(total_a_pago).replace(/(.)(?=(\d{3})+$)/g, '$1.');
								   }
								   
								     var peridocentra_split = periodo_centralizacion.split("-");
								      peridocentra_split = peridocentra_split[1]+peridocentra_split[0];
								  
									 $(".dataTables_processing").show();
									 datosExtras +="SUELDO BASE $ "+String(promedio_sueldo).replace(/(.)(?=(\d{3})+$)/g, '$1.')+" &#10";
								     tableadd.row.add([
								          "<td class=''  style='text-align: center;'>"+ codtrab + "</td>",//codigo trabajador
								          "<td class=''  style='text-align: center;'>"+ dato2 + "</td>",// nombre trabajador
								          "<td class=''  style='text-align: center;'>"+ dato1 + "</td>",// rut
								          "<td class=''  style='text-align: center;'>"+ dato4 + "</td>",// fecha inicio
								          "<td class=''  style='text-align: center; width: 0px !important'>"+ dato5 + "</td>",// fecha termino
								          "<td class=''  style='text-align: center;'>"+ id_contrato + "</td>",// id contrato
								          "<td class=''  style='text-align: center;'>"+n_causal+"-"+Inciso+"-"+ n_letra +"</td>",// nombre letra
								          "<td class=''  style='text-align: center;'>"+ Articulo + "</td>",
								          "<td class=''  style='text-align: center;'>"+ Inciso + "</td>",
								          "<td class=''  style='text-align: center;'>"+ Letra + "</td>",
								          "<td class=''  style='text-align: center;'>"+ parseFloat(dias_basico).toFixed(2) + "</td>",// feriado basico
								          "<td class=''  style='text-align: center;'>"+ v_f_p + "</td>",//feriado progresivo
								          "<td class=''  style='text-align: center;'>"+ v_f_c + "</td>",//feriado convencional
								          "<td class=''  style='text-align: center;'>"+ subtotal1_3 + "</td>",// total total_feriado_bpc
								          "<td class=''  style='text-align: center;'>"+ dias_tomado + "</td>", // dias tomado
								          "<td class=''  style='text-align: center;'>"+ subtotal2_1 + "</td>",// subtotal
								          "<td class=''  style='text-align: center;'>"+ parseInt(Total_d_h2) + "</td>", // dias_inhabiles
								          "<td class=''  style='text-align: center;'>"+ valorGrupo + "</td>",// total_dias_proporcional
								          "<td class='tdright' style='text-align: right'>"+ total_a_pago + "</td>", // total_pago
										  "<td class=''  style='text-align: center;'>" +
										  "<button id='td"+ numeroc +"' onclick='javascript: eliminarFila(this.id);'title='Eliminar' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i>" +
										  "</button><button class='btn btn-circle blue btn-outline btn-sm'><i class='fa fa-plus' id='datoextra"+numeroc+"' title='"+datosExtras+"'></i></button>" + 
										  "</button>" + 
										  "</td>",
										   "<td class=''  style='text-align: center;'>"+ numeroc + "</td>",
										   "<td class=''  style='text-align: center;'>"+ descripcion_t + "</td>",
										   "<td class=''  style='text-align: center;'>"+ fecha_pago + "</td>",
										   "<td class=''  style='text-align: center;'>"+ hora_pago + "</td>",
										   "<td class=''  style='text-align: center;'>"+ lugar_pago + "</td>",
										   "<td class=''  style='text-align: center;'>"+ aviso_trab + "</td>",
										   "<td class=''  style='text-align: center;'>"+ periodo_trab + "</td>",
										   "<td class=''  style='text-align: center;'>"+ total_pago_aviso + "</td>",
										   "<td class=''  style='text-align: center;'>"+ total_pago_anio + "</td>",
										   "<td class=''  style='text-align: center;'>"+ total_a_pagoFeriados + "</td>",
										   "<td class=''  style='text-align: center;'>"+ peridocentra_split + "</td>",
										   
										   ]).node().id = "td"
												+ numeroc;
										tableadd.draw();
										var datosLista = ["td"+ numeroc, codtrab]; 
										trabajadorEnLista.push(datosLista);
										
										$(".dataTables_processing").hide();
										
										numeroc = numeroc + 1;
								  			
								  		}
								  	}).fail(function(jqXHR, textStatus, errorThrown) {

										    alerta(errorThrown);
											$("#loading").hide();
										}).done(function() {
											$("#loading").hide();
										})
					  			
					  		}
				
					  	}).fail(function(jqXHR, textStatus, errorThrown) {

							    alerta(errorThrown);
								$("#loading").hide();
							}).done(function() {
								$("#loading").hide();
							})
						
			
		}	// end else	
			
			
				
				
}
	
}


  function monthDiffPrueba5(d1, d2) {
	    let months;
	    let anno1 = parseInt(d1.split('-')[0]);
	    let anno2 = parseInt(d2.split('-')[0]);
	    let mes1  = parseInt(d1.split('-')[1]);
	    let mes2  = parseInt(d2.split('-')[1]);
		console.log("mes1:" + mes1 + " mes2:" + mes2 + " anno1:" + anno1 + " anno2:" + anno2);
	    months = (anno2 - anno1) * 12;
	    months -= mes1 + 1;
	    months += mes2;
	    return months <= 0 ? 0 : months;
	}



	 
	 


	