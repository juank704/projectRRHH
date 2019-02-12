var tope = 0;
var anioServicio = 0;
var dias_propor_change = 0;
var dias_propor = 0;
var dias_propor2 = 0;
var dias_basico = 0;
var dias_progresivo = 0;
var dias_convencional = 0;
var subtotalA = 0; 
var saldo_disponible = 0;
var dias_inhabiles = 0
var dias_tomado = 0;
var fecha_terminoT = "";
var anio_pago;
var aviso_pago;
var tipo_contrato; 
var Sociedad_trabajador;
var total_h_d = 0;

var valorHDtablaAviso = 0;
var valorHDtablaAnio = 0;
var valorHDtablaFeriado = 0;
$(document).ready(function(){

	format();
	ListaArticulo();
	ListaInciso();
	ListaLetra();
	
	UltimosSueldosBase();
	$("#horaPago").timepicker();
	var currentTime = new Date();	
    var startDateFrom = new Date(currentTime.getFullYear(), currentTime.getMonth() -1, 1);
	$('#fechaPago').datepicker({
		dateFormat : 'dd/mm/yy',
		minDate : startDateFrom,
		firstDay: 1,
		changeMonth: true,
		 
	})
	
	$('#fechaTermino').datepicker({
		dateFormat : 'dd-mm-yy',
		minDate : startDateFrom,
		firstDay: 1,
		changeMonth: true,
		 
	})
	
	

	
	table = $('#tbl_Fito').DataTable( {
	    retrieve: true,
	    paging: false
	} );
	

	 var nodes = table.column(3).nodes();
	 $(nodes).addClass('tdright');
	
		
	
	 $('#sinAviso').change(function() 
			 {
		 		var promedio_aviso = $("#promedioTotalAviso").val().replace(/\./g, "");
		 		if ($('#sinAviso').is(':checked')) 
		 		{
		 			$("#pagoMesAviso").val(0);
		 			
		 			var val_aviso = $("#pagoMesAviso").val().replace(/\./g, "");
		 			var val_anio = $("#anioServicio").val().replace(/\./g, "");
		 			
		 			 if(valorHDtablaFeriado != 0){
		 				var val_fer = valorHDtablaFeriado;
		 				$("#feriadosProporcionales").css("color", "red");
		 				$( "#diastomado,#f_c,#f_p,#f_b,#promedioAvisoSueldo3,#promedioAvisoAsigInpo3,#promedioAvisoNoimponible3" ).prop( "disabled", true );
		 				$('#aplicar,#rehacer').attr("disabled", true);
		 			 }else{
		 				var val_fer = $("#feriadosProporcionales").val().replace(/\./g, "");
		 				$("#feriadosProporcionales").css("color", "black");
		 			}
		 			
		 			
		 			var sum_t = parseInt(val_aviso) + parseInt(val_anio) + parseInt(val_fer) + total_h_d;
		 			$("#totalFiniquito").val(String(sum_t).replace(/(.)(?=(\d{3})+$)/g, '$1.'));
		 		}
		 		else
		 		{
		 			if(promedio_aviso > tope)
		 			{
		 				$("#pagoMesAviso").val(String(tope).replace(/(.)(?=(\d{3})+$)/g, '$1.'));
		 			}
		 			else
		 			{
		 				$("#pagoMesAviso").val(String(promedio_aviso).replace(/(.)(?=(\d{3})+$)/g, '$1.'));
		 			}
		 			
		 			var val_aviso = $("#pagoMesAviso").val().replace(/\./g, "");
		 			var val_anio = $("#anioServicio").val().replace(/\./g, "");
		 			
		 			if(valorHDtablaFeriado != 0){
		 				var val_fer = valorHDtablaFeriado;
		 				$("#feriadosProporcionales").css("color", "red");
		 				$( "#diastomado,#f_c,#f_p,#f_b,#promedioAvisoSueldo3,#promedioAvisoAsigInpo3,#promedioAvisoNoimponible3" ).prop( "disabled", true );
		 				$('#aplicar,#rehacer').attr("disabled", true);
		 			}else{
		 				var val_fer = $("#feriadosProporcionales").val().replace(/\./g, "");
		 				$("#feriadosProporcionales").css("color", "black");
		 			}
		 			
		 			
		 			var sum_t = parseInt(val_aviso) + parseInt(val_anio) + parseInt(val_fer) + total_h_d;
		 			$("#totalFiniquito").val(String(sum_t).replace(/(.)(?=(\d{3})+$)/g, '$1.'));
		 			
		 		}
			 });
	
	 $('#topeMesAviso').change(function() {
		 var promedio_aviso = $("#promedioTotalAviso").val().replace(/\./g, "");
		 if ($('#topeMesAviso').is(':checked')) {
			 
			 if ($('#sinAviso').is(':checked')) 
		 		{
		 			$("#pagoMesAviso").val(0);
		 		}else{
		 			if(promedio_aviso > tope){
						$("#pagoMesAviso").val(String(tope).replace(/(.)(?=(\d{3})+$)/g, '$1.'));
						
					}else{
						$("#pagoMesAviso").val(String(promedio_aviso).replace(/(.)(?=(\d{3})+$)/g, '$1.'));
					}
		 		}
			}else{
				
				if ($('#sinAviso').is(':checked')) 
		 		{
					$("#pagoMesAviso").val(0);
		 		}else
		 			{
		 			$("#pagoMesAviso").val(String(promedio_aviso).replace(/(.)(?=(\d{3})+$)/g, '$1.'));
		 			}
				
			}
		 
	    });
	 
	 $('#topeAnoServicio').change(function() {
		 var promedio_aviso = $("#promedioTotalAviso2").val().replace(/\./g, "");
		
		 if(anioServicio != 0){
		 if($("#topeAnoServicio").prop('checked') == true){
		
			   if(anioServicio != 0){
				   promedio_aviso = promedio_aviso * anioServicio;
			   }
			   
				if(promedio_aviso > tope){
					$("#anioServicio").val(String(tope).replace(/(.)(?=(\d{3})+$)/g, '$1.'));
					
				}else{
					$("#anioServicio").val(String(promedio_aviso).replace(/(.)(?=(\d{3})+$)/g, '$1.'));
				}
			}else{
				if(anioServicio != 0){
					   promedio_aviso = promedio_aviso * anioServicio;
				   }
				$("#anioServicio").val(String(promedio_aviso).replace(/(.)(?=(\d{3})+$)/g, '$1.'));
			}
	 }else{
		 $("#anioServicio").val(0);
	 }
		 
	    });
});

////Am to pm convert
function ConvertTimeformat(format) {
	var time = format;
	var hours = Number(time.match(/^(\d+)/)[1]);
	var minutes = Number(time.match(/:(\d+)/)[1]);
	var AMPM = time.match(/\s(.*)$/)[1];
	if (AMPM == "PM" && hours < 12) hours = hours + 12;
	if (AMPM == "AM" && hours == 12) hours = hours - 12;
	var sHours = hours.toString();
	var sMinutes = minutes.toString();
	if (hours < 10) sHours = "0" + sHours;
	if (minutes < 10) sMinutes = "0" + sMinutes;
	return (sHours + ":" + sMinutes + ":00");
}

function detCol(id){
	window.location.href = ("detalleTrabajador?id="+id);
}

function UltimosSueldosBase(){
	
	var get = getINFO();
    var codigo_trabajador = get.cod;
    var dato1 = "";
		var dato2 = "";
		var dato3 = "";
		var dato4 = "";
		var dato5 = "";
		var dato6 = 0;
		var Articulo = 0;
		var Inciso = 0;
		var Letra = 0;
		var check_aviso;
		var fecha_pago;
		var lugar_pago;
		var hora_pago;
		var anio_servicio;
		var fecha_meses_inicio;
		var fecha_meses_termino;
		
	 $.ajax({
	  		type : "GET",
	  		url : "/simpleWeb/json/work/obtenerSueldoLiquido/"+codigo_trabajador+"",
	  		async: false,
	  		dataType : "json",
	  		success : function(data) {
	  			console.log(data);
	  			var numeroSueldo = 1;
	  			var numeroAsignacion = 1;
	  			var numeroGratificacion = 1;
	  			var numeronoimponible = 1;
	  			
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
		  			$("#des_tipoContrato").html(v.nombretipocontrato);
		  			Sociedad_trabajador = v.sociedad;
		  			
		  			$("#descripcion").val(v.descripcion);
		  			
	  				}
	  				
	  				if(v.nombre_concepto == "SUELDO" && numeroSueldo == 1 ){
	  					$("#mes1").val(String(v.valor).replace(/(.)(?=(\d{3})+$)/g,'$1.'));
	  					$("#mes51").val(String(v.valor).replace(/(.)(?=(\d{3})+$)/g,'$1.'));
	  					$("#mes91").val(String(v.valor).replace(/(.)(?=(\d{3})+$)/g,'$1.'));
	  					numeroSueldo ++;
	  				}else if(v.nombre_concepto == "SUELDO" && numeroSueldo == 2){
	  					$("#mes2").val(String(v.valor).replace(/(.)(?=(\d{3})+$)/g,'$1.'));
	  					$("#mes52").val(String(v.valor).replace(/(.)(?=(\d{3})+$)/g,'$1.'));
	  					$("#mes92").val(String(v.valor).replace(/(.)(?=(\d{3})+$)/g,'$1.'));
	  					numeroSueldo ++;
	  				}else if(v.nombre_concepto == "SUELDO" && numeroSueldo == 3){
	  					$("#mes3").val(String(v.valor).replace(/(.)(?=(\d{3})+$)/g,'$1.'));
	  					$("#mes53").val(String(v.valor).replace(/(.)(?=(\d{3})+$)/g,'$1.'));
	  					$("#mes93").val(String(v.valor).replace(/(.)(?=(\d{3})+$)/g,'$1.'));
	  					numeroSueldo ++;
	  				}
	  				
	  				// asignacion imponible
	  				if(v.nombre_concepto == "ASIGNACIONES IMPONIBLES" && numeroAsignacion == 1 ){
	  					$("#mes21").val(String(v.valorasignacionesimponibles).replace(/(.)(?=(\d{3})+$)/g,'$1.'));
	  					$("#mes61").val(String(v.valorasignacionesimponibles).replace(/(.)(?=(\d{3})+$)/g,'$1.'));
	  					$("#mes101").val(String(v.valorasignacionesimponibles).replace(/(.)(?=(\d{3})+$)/g,'$1.'));
	  					numeroAsignacion ++;
	  				}else if(v.nombre_concepto == "ASIGNACIONES IMPONIBLES" && numeroAsignacion == 2){
	  					$("#mes22").val(String(v.valorasignacionesimponibles).replace(/(.)(?=(\d{3})+$)/g,'$1.'));
	  					$("#mes62").val(String(v.valorasignacionesimponibles).replace(/(.)(?=(\d{3})+$)/g,'$1.'));
	  					$("#mes102").val(String(v.valorasignacionesimponibles).replace(/(.)(?=(\d{3})+$)/g,'$1.'));
	  					numeroAsignacion ++;
	  				}else if(v.nombre_concepto == "ASIGNACIONES IMPONIBLES" && numeroAsignacion == 3){
	  					$("#mes23").val(String(v.valorasignacionesimponibles).replace(/(.)(?=(\d{3})+$)/g,'$1.'));
	  					$("#mes63").val(String(v.valorasignacionesimponibles).replace(/(.)(?=(\d{3})+$)/g,'$1.'));
	  					$("#mes103").val(String(v.valorasignacionesimponibles).replace(/(.)(?=(\d{3})+$)/g,'$1.'));
	  					numeroAsignacion ++;
	  				}
	  				
	  				// GRATIFICACION 
	  				
	  				if(v.nombre_concepto == "GRATIFICACION" && numeroGratificacion == 1 ){
	  					$("#mes31").val(String(v.valorgratificacion).replace(/(.)(?=(\d{3})+$)/g,'$1.'));
	  					$("#mes71").val(String(v.valorgratificacion).replace(/(.)(?=(\d{3})+$)/g,'$1.'));
	  					numeroGratificacion ++;
	  				}else if(v.nombre_concepto == "GRATIFICACION" && numeroGratificacion == 2){
	  					$("#mes32").val(String(v.valorgratificacion).replace(/(.)(?=(\d{3})+$)/g,'$1.'));
	  					$("#mes72").val(String(v.valorgratificacion).replace(/(.)(?=(\d{3})+$)/g,'$1.'));
	  					numeroGratificacion ++;
	  				}else if(v.nombre_concepto == "GRATIFICACION" && numeroGratificacion == 3){
	  					$("#mes33").val(String(v.valorgratificacion).replace(/(.)(?=(\d{3})+$)/g,'$1.'));
	  					$("#mes73").val(String(v.valorgratificacion).replace(/(.)(?=(\d{3})+$)/g,'$1.'));
	  					numeroGratificacion ++;
	  				}
	  				
	  				// NO IMPONIBLES 
	  				
	  				if(v.nombre_concepto == "NO IMPONIBLES" && numeronoimponible == 1 ){
	  					$("#mes41").val(String(v.valornoimponible).replace(/(.)(?=(\d{3})+$)/g,'$1.'));
	  					$("#mes81").val(String(v.valornoimponible).replace(/(.)(?=(\d{3})+$)/g,'$1.'));
	  					
	  					numeronoimponible ++;
	  				}else if(v.nombre_concepto == "NO IMPONIBLES" && numeronoimponible == 2){
	  					$("#mes42").val(String(v.valornoimponible).replace(/(.)(?=(\d{3})+$)/g,'$1.'));
	  					$("#mes82").val(String(v.valornoimponible).replace(/(.)(?=(\d{3})+$)/g,'$1.'));
	  					
	  					numeronoimponible ++;
	  				}else if(v.nombre_concepto == "NO IMPONIBLES" && numeronoimponible == 3){
	  					$("#mes43").val(String(v.valornoimponible).replace(/(.)(?=(\d{3})+$)/g,'$1.'));
	  					$("#mes83").val(String(v.valornoimponible).replace(/(.)(?=(\d{3})+$)/g,'$1.'));
	  					
	  					numeronoimponible ++;
	  				}
	  				
	  				
	  				numeroDato ++;
	  			})
	  		}
	  	}).fail(function(jqXHR, textStatus, errorThrown) {

			    alerta(errorThrown);
				$("#loading").hide();
			})
			
		var divididosueldo = 0;
		var calculoSueldos = "";
		
		var sueldo1 = $("#mes1").val().replace(/\./g, '');
		var sueldo2 = $("#mes2").val().replace(/\./g, '');
		var sueldo3 = $("#mes3").val().replace(/\./g, '');
		
		if(sueldo1 != "0"){
			calculoSueldos = calculoSueldos+""+sueldo1; divididosueldo ++;
		}
		
		if(sueldo2 != "0" && sueldo1 != "0"){
			calculoSueldos = calculoSueldos+"+"+sueldo2; divididosueldo ++;
		}
		else if(sueldo2 != "0" && sueldo1 == "0"){calculoSueldos = sueldo2; divididosueldo ++; }
		
		if(sueldo3 != "0" && sueldo2 != "0"){
			calculoSueldos = calculoSueldos+"+"+sueldo3; divididosueldo ++;
		}
		else if(sueldo3 != "0" && sueldo2 == "0"){ calculoSueldos = sueldo3; divididosueldo ++; }
		 
		var iNum = calculoSueldos.split('+'); 
		
		totalSplit = iNum.length;
		
		if(totalSplit == 1){
		    var total1 = parseInt(iNum[0]);
			var total11 = String(total1).replace(/(.)(?=(\d{3})+$)/g, '$1.')
			
			 $("#promedioAvisoSueldo").val(total11);
			 $("#promedioAvisoSueldo2").val(total11);
			 $("#promedioAvisoSueldo3").val(total11); 
			
		}else if(totalSplit == 2 ){
			  
			var total2 = parseInt((parseInt(iNum[0])+ parseInt(iNum[1]))/2);
			var total21 = String(total2).replace(/(.)(?=(\d{3})+$)/g, '$1.') 
			
			 $("#promedioAvisoSueldo").val(total21); 
			 $("#promedioAvisoSueldo2").val(total21); 
			 $("#promedioAvisoSueldo3").val(total21); 
			
		}else if(totalSplit == 3){
			
			var total3 = parseInt((parseInt(iNum[0])+ parseInt(iNum[1]) + parseInt(iNum[2]))/3);
			var total31 = String(total3).replace(/(.)(?=(\d{3})+$)/g, '$1.') 
			
			 $("#promedioAvisoSueldo").val(total31); 
			 $("#promedioAvisoSueldo2").val(total31); 
			 $("#promedioAvisoSueldo3").val(total31); 
			
		}
		
		if(sueldo1 == "0" && sueldo2 == "0" && sueldo3 == "0"){ 
			$("#promedioAvisoSueldo").val(0);
			$("#promedioAvisoSueldo2").val(0);
			$("#promedioAvisoSueldo3").val(0);
			
		}
		
		// asignaciones imponibles
		
		var divididoAsig = 0;
		var calculoSAsig = "";
		
		var sueldo21 = $("#mes21").val().replace(/\./g, '');
		var sueldo22 = $("#mes22").val().replace(/\./g, '');
		var sueldo23 = $("#mes23").val().replace(/\./g, '');
		
		if(sueldo21 != "0"){
			calculoSAsig = calculoSAsig+""+sueldo21; divididoAsig ++;
		}
		
		if(sueldo22 != "0" && sueldo21!= "0"){
			calculoSAsig = calculoSAsig+"+"+sueldo22; divididoAsig ++;
		}else if(sueldo22 != "0" && sueldo21 == "0"){calculoSAsig = sueldo22; divididoAsig ++; }
		
		if(sueldo23 != "0" && sueldo22 != "0"){
			calculoSAsig = calculoSAsig+"+"+sueldo23; divididoAsig ++;
		}else if(sueldo23 != "0" && sueldo22 == "0"){ calculoSAsig = sueldo23; divididoAsig ++; }
		 
		var iNum2 = calculoSAsig.split('+'); 
		
		var totalSplit2 = iNum2.length;
		
		if(totalSplit2 == 1){
		     
			var total4 = parseInt(parseInt(iNum2[0]));
			var total41 = String(total4).replace(/(.)(?=(\d{3})+$)/g, '$1.');
			
			 $("#promedioAvisoAsigInpo").val(total41); 
			 $("#promedioAvisoAsigInpo2").val(total41); 
			 $("#promedioAvisoAsigInpo3").val(total41); 
			
		}else if(totalSplit2 == 2 ){
			
			var total5 = parseInt(parseInt((parseInt(iNum2[0])+ parseInt(iNum2[1]))/2));
			var total51 = String(total5).replace(/(.)(?=(\d{3})+$)/g, '$1.');
			
			 $("#promedioAvisoAsigInpo").val(total51);
			 $("#promedioAvisoAsigInpo2").val(total51); 
			 $("#promedioAvisoAsigInpo3").val(total51); 
			
		}else if(totalSplit2 == 3){
			
			var total6 = parseInt(parseInt((parseInt(iNum2[0])+ parseInt(iNum2[1]) + parseInt(iNum2[2]))/3));
			var total61 = String(total6).replace(/(.)(?=(\d{3})+$)/g, '$1.');
			
			 $("#promedioAvisoAsigInpo").val(total61); 
			 $("#promedioAvisoAsigInpo2").val(total61);
			 $("#promedioAvisoAsigInpo3").val(total61);
			
		}
		
		if(sueldo21 == "0" && sueldo22 == "0" && sueldo23 == "0"){ 
			
			
			$("#promedioAvisoAsigInpo").val(0);
			$("#promedioAvisoAsigInpo2").val(0);
			$("#promedioAvisoAsigInpo3").val(0);
			
		}
		
      // GRATIFICACION
		
		var divididoGrati = 0;
		var calculoGratifi = "";
		
		var sueldo31 = $("#mes31").val().replace(/\./g, '');
		var sueldo32 = $("#mes32").val().replace(/\./g, '');
		var sueldo33 = $("#mes33").val().replace(/\./g, '');
		
		if(sueldo31 != "0"){
			calculoGratifi = calculoGratifi+""+sueldo31; divididoGrati ++;
		}
		
		if(sueldo32 != "0" && sueldo31!= "0"){
			calculoGratifi = calculoGratifi+"+"+sueldo32; divididoGrati ++;
		}else if(sueldo32 != "0" && sueldo31 == "0"){calculoGratifi = sueldo32; divididoGrati ++; }
		
		if(sueldo33 != "0" && sueldo32 != "0"){
			calculoGratifi = calculoGratifi+"+"+sueldo33; divididoGrati ++;
		}else if(sueldo33 != "0" && sueldo32 == "0"){ calculoGratifi = sueldo33; divididoGrati ++; }
		 
		var iNum3 = calculoGratifi.split('+'); 
		
		var totalSplit3 = iNum3.length;
		
		if(totalSplit3 == 1){
		     
			var total7 = parseInt(parseInt(iNum3[0]));
			var total71 = String(total7).replace(/(.)(?=(\d{3})+$)/g, '$1.');
			
			 $("#promedioAvisoGrati").val(total71);
			 $("#promedioAvisoGrati2").val(total71); 
			
		}else if(totalSplit3 == 2 ){
			
			var total8 = parseInt((parseInt(iNum3[0])+ parseInt(iNum3[1]))/2);
			var total81 = String(total8).replace(/(.)(?=(\d{3})+$)/g, '$1.');
			
			 $("#promedioAvisoGrati").val(total81); 
			 $("#promedioAvisoGrati2").val(total81); 
			
		}else if(totalSplit3 == 3){
			
			var total9 = parseInt((parseInt(iNum3[0])+ parseInt(iNum3[1]) + parseInt(iNum3[2]))/3);
			var total91 = String(total9).replace(/(.)(?=(\d{3})+$)/g, '$1.');
			
			 $("#promedioAvisoGrati").val(total91); 
			 $("#promedioAvisoGrati2").val(total91);
			
		}
		
		if(sueldo31 == "0" && sueldo32 == "0" && sueldo33 == "0"){
			$("#promedioAvisoGrati").val(0);
			$("#promedioAvisoGrati2").val(0);
			
		}
	
       // no imponible
		
		var divididonoimpo = 0;
		var calculonoimpo = "";
		
		var sueldo41 = $("#mes41").val().replace(/\./g, '');
		var sueldo42 = $("#mes42").val().replace(/\./g, '');
		var sueldo43 = $("#mes43").val().replace(/\./g, '');
		
		if(sueldo41 != "0"){
			calculonoimpo = calculonoimpo+""+sueldo41; divididonoimpo ++;
		}
		
		if(sueldo42 != "0" && sueldo41 != "0"){
			calculonoimpo = calculonoimpo+"+"+sueldo42; divididonoimpo ++;
		}else if(sueldo42 != "0" && sueldo41 == "0"){calculonoimpo = sueldo42; divididonoimpo ++; }
		
		if(sueldo43 != "0" && sueldo42 != "0"){
			calculonoimpo = calculonoimpo+"+"+sueldo43; divididonoimpo ++;
		}else if(sueldo43 != "0" && sueldo42 == "0"){ calculonoimpo = sueldo43; divididonoimpo ++; }
		 
		var iNum4 = calculonoimpo.split('+'); 
		
		var totalSplit4 = iNum4.length;
		
		if(totalSplit4 == 1){
			 
			var total10 = parseInt(parseInt(iNum4[0]));
			var total101 = String(total10).replace(/(.)(?=(\d{3})+$)/g, '$1.');
			
			 $("#promedioAvisoNoimponible").val(total101); 
			 $("#promedioAvisoNoimponible2").val(total101); 
			
			
		}else if(totalSplit4 == 2 ){
			
			var total11 = parseInt(parseInt((parseInt(iNum4[0])+ parseInt(iNum4[1]))/2));
			var total111 = String(total11).replace(/(.)(?=(\d{3})+$)/g, '$1.');
			
			 $("#promedioAvisoNoimponible").val(total111); 
			 $("#promedioAvisoNoimponible2").val(total111);
			 
			
		}else if(totalSplit4 == 3){
			
			var total12 = parseInt(parseInt((parseInt(iNum4[0])+ parseInt(iNum4[1]) + parseInt(iNum4[2]))/3));
			var total121 = String(total12).replace(/(.)(?=(\d{3})+$)/g, '$1.');
			
			 $("#promedioAvisoNoimponible").val(total121); 
			 $("#promedioAvisoNoimponible2").val(total121); 
			
			
		}
		
        if(sueldo41 == "0" && sueldo42 == "0" && sueldo43 == "0"){ 
        	$("#promedioAvisoNoimponible").val(0);
        	$("#promedioAvisoNoimponible2").val(0);
        	
        	}
         
        if(anio_servicio != null){
			var iNum = parseInt(anio_servicio) / 365;
			var res = String(iNum).split("."); 



			var anio = res[0];
			
			if(anio == 0 ){
				$("#aniosServicio").html("");
				$("#aniosServicio").html("Valor Años servicio: ("+anio+")");
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
					 $("#aniosServicio").html("Años servicio: ("+anio+")");
					 anioServicio = anio;
				}
				else{
					$("#aniosServicio").html("Años servicio: ("+anio+")");
					anioServicio = anio;
				}
			}
			
		}
        
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
		

		
		var options = {  day: 'numeric', month: 'long', year: 'numeric',   };
		
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
		
			dt1 = new Date(fechai_split[0],fechai_split[1],fechai_split[2]);
			dt2 = new Date(fechaT_split[0],fechaT_split[1],fechaT_split[2]);
		  
		
		var fecha1_dt = dt1.toLocaleDateString("en-EN", options);
		var fecha2_dt = dt2.toLocaleDateString("en-EN", options);

		dt11 = new Date(fecha1_dt);
		dt22 = new Date(fecha2_dt);
		
//		var mesesEntrePeriodos = monthDiff(dt11,dt22) -1;
		var mesesEntrePeriodos = monthDiff(dt11,dt22);
	
		 mesesEntrePeriodos = parseInt(mesesEntrePeriodos -1) * porcentaje_mes;
		
		suna_Total = total_mesInicial_mesFinal + mesesEntrePeriodos;
		
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
		
		
		dias_basico = suna_Total;
		$("#f_b").val(parseFloat(dias_basico).toFixed(2));
		
		var get = getINFO();
	    var codigo_trabajador = get.cod;
		 $.ajax({
		  		type : "GET",
		  		url : '/simpleWeb/json/work/DiasProporcionalesIndividual/'+fecha_T_Enviar+','+sumT+','+codigo_trabajador+'',
		  		async: false,
		  		dataType : "JSON",
		  		success : function(data) {
		  			
		  			console.log(data);
		  			
		  			var contador = 0;
		  			var tipo_hd = "";
		  			$.each(data, function(k, v) {
						
		  				if(contador == 0)
		  					{
				  				dias_propor = parseFloat(v.proporcional).toFixed(2);
				  				dias_propor2 = parseFloat(v.proporcional).toFixed(2);
				  				$("#valorProporcionales").html( parseFloat(v.proporcional).toFixed(2));
				  				$("#t_grupo").val(parseFloat(v.proporcional).toFixed(2));
				  				
				  				contador ++;
		  					}else{
		  						
		  						
		  						
		  						if(v.codHD == 2006 || v.codHD == 2007 || v.codHD == 2008)
		  						{
		  							if(v.codHD == 2006){
		  								valorHDtablaFeriado = v.montoHD;
		  								$("#valorProporcionales2").css("display", "block");
		  								$("#valorProporcionales2").html("Valor Feriado proporcional: "+v.diasint);
		  								$("#valorProporcionales2").css("color", "red");
		  							}else if(v.codHD == 2007){
		  								valorHDtablaAnio = v.montoHD;
		  								$("#aniosServicio2").css("display", "block");
		  								$("#aniosServicio2").html("Valor Años servicio: ("+v.diasint+")");
		  								$("#aniosServicio2").css("color", "red");
		  							}else if(v.codHD == 2008){
		  								valorHDtablaAviso = v.montoHD;
		  							}
		  						}else{
		  							if(v.tipoHD == "h"){
			  				        	tipo_hd = "HABER";
			  				        	total_h_d = total_h_d + v.montoHD;
			  				        }else if(v.tipoHD == "d"){
			  				        	tipo_hd = "DESCUENTO";
			  				        	total_h_d = total_h_d - v.montoHD;
			  				        }
			  						
			  						var tableadd = $('#tbl_Fito').DataTable();
			  						tableadd.row.add( [
			  				            	            "<td>"+v.codHD+"</td>",
			  				            	            "<td>"+v.nombreHD+"</td>",
			  				            	            "<td>"+tipo_hd+"</td>",
			  				            	            "<td>"+String(v.montoHD).replace(/(.)(?=(\d{3})+$)/g, '$1.')+"</td>",
			  				            				] ).node().id = "td"+k;
			  				            		tableadd.draw();
		  						}
		  					}
		  				
					})
					
					$("#totalhd").html(" $ "+String(total_h_d).replace(/(.)(?=(\d{3})+$)/g, '$1.')+"");
		  			
		  		}
		  	}).fail(function(jqXHR, textStatus, errorThrown) {

				    alerta(errorThrown);
					$("#loading").hide();
				}).done(function() {
					$("#loading").hide();
				})
         var promedio1 = parseInt($("#promedioAvisoNoimponible").val().replace(/\./g, ""));
         var promedio2 = parseInt($("#promedioAvisoGrati").val().replace(/\./g, ""));
         var promedio3 = parseInt($("#promedioAvisoAsigInpo").val().replace(/\./g, ""));
         var promedio4 = parseInt($("#promedioAvisoSueldo").val().replace(/\./g, ""));
         
	     var total_aviso_fer =  promedio3 + promedio4;
	     
	     var total_aviso =  promedio1 + promedio2 + promedio3 + promedio4;
	    
	     if(anioServicio == 0){
	    	var total_avisoServicio = 0;
	    }else{
	    	var total_avisoServicio = total_aviso * anioServicio;
	    }
	    
	     var total_feriados_pro = (total_aviso_fer/30) * dias_propor;
	     var total_feriados_pro2 = Math.round(total_feriados_pro);
	    
	     var total = String(total_aviso).replace(/(.)(?=(\d{3})+$)/g, '$1.');
	     var total_fer = String(total_aviso_fer).replace(/(.)(?=(\d{3})+$)/g, '$1.');
	     
	     
	     var total2 = String(total_avisoServicio).replace(/(.)(?=(\d{3})+$)/g, '$1.');
	     var total3 = String(total_feriados_pro2).replace(/(.)(?=(\d{3})+$)/g, '$1.');
	     
	     if(dato5 != ""){
				
				var fechaTermino = dato5.split('-');
				fechaTermino = fechaTermino[2]+"-"+fechaTermino[1]+"-"+fechaTermino[0];
				calcularTope(fechaTermino);
			}
	     
        $("#promedioTotalAviso").val(total);
        $("#promedioTotalAviso2").val(total);
        $("#promedioTotalAviso3").val(total_fer);
        
        $('#topeMesAviso').prop('checked', true);
        $('#topeAnoServicio').prop('checked', true);
        
        
        
        if(valorHDtablaAviso != 0){
        	
        	$("#pagoMesAviso").val(String(valorHDtablaAviso).replace(/(.)(?=(\d{3})+$)/g, '$1.'));
			$("#pagoMesAviso").css("color", "red");
			$( "#promedioAvisoSueldo,#promedioAvisoAsigInpo,#promedioAvisoGrati,#f_b,#promedioAvisoNoimponible" ).prop( "disabled", true );
			
			}else{
				if(total_aviso > tope){
					$("#pagoMesAviso").val(String(tope).replace(/(.)(?=(\d{3})+$)/g, '$1.'));
				}else{
					$("#pagoMesAviso").val(String(total_aviso).replace(/(.)(?=(\d{3})+$)/g, '$1.'));
				}
			$("#pagoMesAviso").css("color", "black");
		}
        
        
        if(valorHDtablaAnio != 0){
        	
			$("#anioServicio").css("color", "red");
			$( "#promedioAvisoSueldo2,#promedioAvisoAsigInpo2,#promedioAvisoGrati2,#f_b,#promedioAvisoNoimponible2" ).prop( "disabled", true );
			$("#anioServicio").val(String(valorHDtablaAnio).replace(/(.)(?=(\d{3})+$)/g, '$1.'));

			}else{
				 if(total_avisoServicio > tope){
						$("#anioServicio").val(String(tope).replace(/(.)(?=(\d{3})+$)/g, '$1.'));
					}else{
						$("#anioServicio").val(String(total_avisoServicio).replace(/(.)(?=(\d{3})+$)/g, '$1.'));
					}
			        
			$("#anioServicio").css("color", "black");
		}
        
        
       
        if(valorHDtablaFeriado != 0){
			
				$("#feriadosProporcionales").val(String(valorHDtablaFeriado).replace(/(.)(?=(\d{3})+$)/g, '$1.'));
				$("#feriadosProporcionales").css("color", "red");
				$( "#diastomado,#f_c,#f_p,#f_b,#promedioAvisoSueldo3,#promedioAvisoAsigInpo3,#promedioAvisoNoimponible3" ).prop( "disabled", true );
				$('#aplicar,#rehacer').attr("disabled", true);
        }else{
				$("#feriadosProporcionales").val(total3);
				$("#feriadosProporcionales").css("color", "black");
			}
        
        
		    $("#rut_trabajador").html(dato1);
			$("#nombre_trabajador").html(dato2.toUpperCase());
			$("#sociedad_trabajador").html(dato3.toUpperCase());
			$("#FechaI_trabajador").html(dato4);
			$("#FechaT_trabajador").html(dato5);
			
			
			$("#fechaTermino").val(dato5); 
			
			$("#detCol").attr("onclick", "detCol("+dato6+")");
			
			 
					 
					 
			
			
  			
  			
  			if(hora_pago != null){
  				
  				console.log("hora pago es :"+hora_pago);
  				var timeString = hora_pago;
  				var H = +timeString.substr(0, 2);
  				var h = H % 12 || 12;
  				var ampm = (H < 12 || H === 24) ? " AM" : " PM";
  				timeString = h + timeString.substr(2, 3) + ampm;
  				
 				$("#horaPago").val(timeString);
 				$( "#horaPago" ).prop( "disabled", true );
 				
 			}
  			else{
 				$("#horaPago").val("");
 				$( "#horaPago" ).prop( "disabled", false );
 				console.log("hora pago es :"+hora_pago);
 				
 			}
  			
  			if(lugar_pago != null){
 				$("#lugarPago").val(lugar_pago);
 				$( "#lugarPago" ).prop( "disabled", true );
 			}else{}
  			
  			if(fecha_pago != null){
  				 var fechapago_split = fecha_pago.split("-")
  				$("#fechaPago").val(fechapago_split[2]+"/"+fechapago_split[1]+"/"+fechapago_split[0]);
  				$( "#fechaPago" ).prop( "disabled", true );
  			}else{}
			
			   if(Articulo == 0){
				   
			   }else{
				   $("#articulo option[value='"+Articulo+"']").attr('selected', 'selected');
				 
			   }
			   
               if(Inciso == 0){
				   
			   }else{
				   $("#inciso option[value='"+Inciso+"']").attr('selected', 'selected');
				  
			   }
               
               if(Letra == 0){
				   
			   }else{
				   $("#letra option[value='"+Letra+"']").attr('selected', 'selected');
				   
			   }
				
			   if(check_aviso == 1){
				   $('#sinAviso').prop('checked', true);
				   
				   if(valorHDtablaAviso != 0){
			        	
			        	$("#pagoMesAviso").val(String(valorHDtablaAviso).replace(/(.)(?=(\d{3})+$)/g, '$1.'));
						$("#pagoMesAviso").css("color", "red");
						$( "#promedioAvisoSueldo,#promedioAvisoAsigInpo,#promedioAvisoGrati,#f_b,#promedioAvisoNoimponible" ).prop( "disabled", true );
						
						}else{
					    $("#pagoMesAviso").val(0);
						$("#pagoMesAviso").css("color", "black");
					}
				   
				  
			   }else{
				   $('#sinAviso').prop('checked', false);
			   }
			   
			   var T_aviso = $("#pagoMesAviso").val().replace(/\./g, "");
			   var T_anio = $("#anioServicio").val().replace(/\./g, "");
			   
			   if(valorHDtablaFeriado != 0){
					 var T_proporcional = valorHDtablaFeriado;
					 $("#feriadosProporcionales").css("color", "red");
					 $( "#diastomado,#f_c,#f_p,#f_b,#promedioAvisoSueldo3,#promedioAvisoAsigInpo3,#promedioAvisoNoimponible3" ).prop( "disabled", true );
					 $('#aplicar,#rehacer').attr("disabled", true);
			   }else{
					 var T_proporcional = $("#feriadosProporcionales").val().replace(/\./g, "");
					 $("#feriadosProporcionales").css("color", "black");
				}
			  
			   
			   if(tipo_contrato == 1){
				   var T_item = parseInt(T_aviso) + parseInt(T_anio) + parseInt(T_proporcional) + total_h_d;  
				   
			   }else{
				   var T_item = parseInt(T_proporcional) + total_h_d;
			   }
			 
			   $("#totalFiniquito").val(String(T_item).replace(/(.)(?=(\d{3})+$)/g, '$1.'));
			   
			   var subtotal1 = $("#f_b").val().replace(/\./g, "") + $("#f_p").val().replace(/\./g, "");
			   
			   var v_f_b = parseFloat($("#f_b").val());
			   var v_f_p = parseFloat( $("#f_p").val());
			   var v_f_c = parseFloat($("#f_c").val());
			   var v_d_t = $("#diastomado").val();

			   var subtotal1 =  v_f_b + v_f_p + v_f_c;
			   var subtotal1_3 = parseFloat(subtotal1).toFixed(2) 
			   $("#totalbpc").val(subtotal1_3);
			   
			   var subtotal2 = subtotal1_3 - v_d_t;
			   var subtotal2_1 = parseFloat(subtotal2).toFixed(2) 
			   $("#subtotal").val(subtotal2_1);
			   
			   var Total_d_h = dias_propor -  subtotal2_1;
			   $("#d_i").val(Total_d_h);
			   
			   // guardar datos anteriores
			   dias_basico = suna_Total;
			   dias_progresivo = 0;
			   dias_convencional = 0;
			   subtotalA = subtotal1_3; 
			   saldo_disponible = subtotal2_1;
			   dias_inhabiles = Total_d_h;
			   
			   
			   var art = $("#articulo").val();
			   var inci = $("#inciso").val();
			   $( "#fechaTermino" ).prop( "disabled", true );
			   
			   if(tipo_contrato == 1){
				   if(art == 3 ){
					   
					   if(inci == 14 || inci == 16 )
					   {

					   }
				   }else{
					   
					   $("#calculo-finiquito-aviso").hide();
					   $("#divPagoMesAviso").hide();
					   $("#label_mes_aviso").hide();
					   $("#label_anio_servicio").hide();
					   $("#calculo-finiquito-servicios").hide();
					   $("#anio_valor").hide();
					    anio_pago = $("#anioServicio").val();
						aviso_pago = $("#pagoMesAviso").val();
						$("#anioServicio").val(0);
					    $("#pagoMesAviso").val(0);
				   }
			   }else{
				   $("#calculo-finiquito-aviso").hide();
				   $("#divPagoMesAviso").hide();
				   $("#label_mes_aviso").hide();
				   $("#label_anio_servicio").hide();
				   $("#calculo-finiquito-servicios").hide();
				   $("#anio_valor").hide();
				    anio_pago = $("#anioServicio").val();
					aviso_pago = $("#pagoMesAviso").val();
					$("#anioServicio").val(0);
				    $("#pagoMesAviso").val(0);
			   }
			  
			   
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


// change mes de aviso

$("#promedioAvisoSueldo,#promedioAvisoAsigInpo,#promedioAvisoGrati,#promedioAvisoNoimponible").change(function(event) {
	var monto1 = $("#promedioAvisoSueldo").val().replace(/\./g, "");
	var monto2 = $("#promedioAvisoAsigInpo").val().replace(/\./g, "");
	var monto3 = $("#promedioAvisoGrati").val().replace(/\./g, "");
	var monto4 = $("#promedioAvisoNoimponible").val().replace(/\./g, ""); 
	
	if(monto1 == ""){monto1 = 0; $("#promedioAvisoSueldo").val(0)}
	if(monto2 == ""){monto2 = 0; $("#promedioAvisoAsigInpo").val(0)}
	if(monto3 == ""){monto3 = 0; $("#promedioAvisoGrati").val(0)}
	if(monto4 == ""){monto4 = 0; $("#promedioAvisoNoimponible").val(0)}
	
	$("#promedioTotalAviso").val("");
	var total = parseInt(monto1) + parseInt(monto2) + parseInt(monto3) + parseInt(monto4);
	var totalFormat = String(total).replace(/(.)(?=(\d{3})+$)/g, '$1.');
	$("#promedioTotalAviso").val(totalFormat);
	
	 if ($('#sinAviso').is(':checked')) 
		{
			$("#pagoMesAviso").val(0);
		}else{
			$("#pagoMesAviso").val(totalFormat);
		}
	
	
	
	   var T_aviso = $("#pagoMesAviso").val().replace(/\./g, "");
	   var T_anio = $("#anioServicio").val().replace(/\./g, "");
	   
	   
	   if(valorHDtablaFeriado != 0){
			 var T_proporcional = valorHDtablaFeriado;
			 $("#feriadosProporcionales").css("color", "red");
			 $( "#diastomado,#f_c,#f_p,#f_b,#promedioAvisoSueldo3,#promedioAvisoAsigInpo3,#promedioAvisoNoimponible3" ).prop( "disabled", true );
			 $('#aplicar,#rehacer').attr("disabled", true);
	   }else{
		   var T_proporcional = $("#feriadosProporcionales").val().replace(/\./g, "");
		   $("#feriadosProporcionales").css("color", "black");
		}
	  
	   
	   var T_item = parseInt(T_aviso) + parseInt(T_anio) + parseInt(T_proporcional) + total_h_d;
	   $("#totalFiniquito").val(String(T_item).replace(/(.)(?=(\d{3})+$)/g, '$1.'));
	
	
});
//change años de servicio
$("#promedioAvisoSueldo2,#promedioAvisoAsigInpo2,#promedioAvisoGrati2,#promedioAvisoNoimponible2").change(function(event) {
	var monto1 = $("#promedioAvisoSueldo2").val().replace(/\./g, "");
	var monto2 = $("#promedioAvisoAsigInpo2").val().replace(/\./g, "");
	var monto3 = $("#promedioAvisoGrati2").val().replace(/\./g, "");
	var monto4 = $("#promedioAvisoNoimponible2").val().replace(/\./g, ""); 
	
	if(monto1 == ""){monto1 = 0; $("#promedioAvisoSueldo2").val(0)}
	if(monto2 == ""){monto2 = 0; $("#promedioAvisoAsigInpo2").val(0)}
	if(monto3 == ""){monto3 = 0; $("#promedioAvisoGrati2").val(0)}
	if(monto4 == ""){monto4 = 0; $("#promedioAvisoNoimponible2").val(0)}
	
	$("#promedioTotalAviso2").val("");
	var total = parseInt(monto1) + parseInt(monto2) + parseInt(monto3) + parseInt(monto4);
	
	var totalFormat = String(total).replace(/(.)(?=(\d{3})+$)/g, '$1.');
	if(anioServicio == 0){
		
		var total2 = 0;
	}else{
		var total2 = total * anioServicio;
	}
	
	$("#promedioTotalAviso2").val(totalFormat);
	
	var totalFormat2 = String(total2).replace(/(.)(?=(\d{3})+$)/g, '$1.');
    $("#anioServicio").val(totalFormat2);
    
    var T_aviso = $("#pagoMesAviso").val().replace(/\./g, "");
	   var T_anio = $("#anioServicio").val().replace(/\./g, "");
	   
	   if(valorHDtablaFeriado != 0){
			 var T_proporcional = valorHDtablaFeriado;
			 $("#feriadosProporcionales").css("color", "red");
			 $( "#diastomado,#f_c,#f_p,#f_b,#promedioAvisoSueldo3,#promedioAvisoAsigInpo3,#promedioAvisoNoimponible3" ).prop( "disabled", true );
			 $('#aplicar,#rehacer').attr("disabled", true);
	   }else{
		   var T_proporcional = $("#feriadosProporcionales").val().replace(/\./g, "");
		   $("#feriadosProporcionales").css("color", "black");
		}
	   
	   
	   var T_item = parseInt(T_aviso) + parseInt(T_anio) + parseInt(T_proporcional) + total_h_d;
	   $("#totalFiniquito").val(String(T_item).replace(/(.)(?=(\d{3})+$)/g, '$1.'));
});

//change feriados proporcionales
$("#promedioAvisoSueldo3,#promedioAvisoAsigInpo3,#promedioAvisoNoimponible3").change(function(event) {
	var monto1 = $("#promedioAvisoSueldo3").val().replace(/\./g, "");
	var monto2 = $("#promedioAvisoAsigInpo3").val().replace(/\./g, "");
	var monto4 = $("#promedioAvisoNoimponible3").val().replace(/\./g, ""); 
	
	if(monto1 == ""){monto1 = 0; $("#promedioAvisoSueldo3").val(0)}
	if(monto2 == ""){monto2 = 0; $("#promedioAvisoAsigInpo3").val(0)}
	if(monto4 == ""){monto4 = 0; $("#promedioAvisoNoimponible3").val(0)}
	
	$("#promedioTotalAviso3").val("");
	var total = parseInt(monto1) + parseInt(monto2) + parseInt(monto4);
	
	var totalFormat = String(total).replace(/(.)(?=(\d{3})+$)/g, '$1.');
	$("#promedioTotalAviso3").val(totalFormat);
	
	 var total_feriados_pro = (total/30) * dias_propor;
     var total_feriados_pro2 = Math.round(total_feriados_pro);
     var totalFormat2 = String(total_feriados_pro2).replace(/(.)(?=(\d{3})+$)/g, '$1.');
     
     if(valorHDtablaFeriado != 0){
		 $("#feriadosProporcionales").val(String(valorHDtablaFeriado).replace(/(.)(?=(\d{3})+$)/g, '$1.'));
		 $("#feriadosProporcionales").css("color", "red");
		 $( "#diastomado,#f_c,#f_p,#f_b,#promedioAvisoSueldo3,#promedioAvisoAsigInpo3,#promedioAvisoNoimponible3" ).prop( "disabled", true );
		 $('#aplicar,#rehacer').attr("disabled", true);
     }else{
	   $("#feriadosProporcionales").val(totalFormat2);
	   $("#feriadosProporcionales").css("color", "black");
	}
   
    
    var T_aviso = $("#pagoMesAviso").val().replace(/\./g, "");
	   var T_anio = $("#anioServicio").val().replace(/\./g, "");
	   
	   if(valorHDtablaFeriado != 0){
			 var T_proporcional = valorHDtablaFeriado;
			 $("#feriadosProporcionales").css("color", "red");
			 $( "#diastomado,#f_c,#f_p,#f_b,#promedioAvisoSueldo3,#promedioAvisoAsigInpo3,#promedioAvisoNoimponible3" ).prop( "disabled", true );
			 $('#aplicar,#rehacer').attr("disabled", true);
	   }else{
		   var T_proporcional = $("#feriadosProporcionales").val().replace(/\./g, "");
		   $("#feriadosProporcionales").css("color", "black");
		}
	  
	   
	   var T_item = parseInt(T_aviso) + parseInt(T_anio) + parseInt(T_proporcional) + total_h_d;
	   $("#totalFiniquito").val(String(T_item).replace(/(.)(?=(\d{3})+$)/g, '$1.'));
    
});


function ListaArticulo() {
	$("#loading").show();
	var SelectArticulo1 = "";
	SelectArticulo1 += "<option value=''>Seleccione un Artículo</option>";

	$("#articulo").append(SelectArticulo1);
	
	 $.ajax({
  		type : "GET",
  		url : '/simpleWeb/json/work/ListaArticulo/',
  		async: false,
  		dataType : "JSON",
  		success : function(data) {
  			$.each(data, function(k, v) {
				var SelectArticulo = "";
				SelectArticulo += "<option value=" + v.id + ">"
						+ v.descripcion + "</option>";

				$("#articulo").append(SelectArticulo);
			})
  			
  		}
  	}).fail(function(jqXHR, textStatus, errorThrown) {

		    alerta(errorThrown);
			$("#loading").hide();
		}).done(function() {
			$("#loading").hide();
		})
	
}


function ListaInciso() {
	$("#loading").show();
	var SelectInciso1 = "";
	SelectInciso1 += "<option value=''>Seleccione un Inciso</option>";

	$("#inciso").append(SelectInciso1);
	
	 $.ajax({
  		type : "GET",
  		url : '/simpleWeb/json/work/ListaInciso/',
  		async: false,
  		dataType : "JSON",
  		success : function(data) {
  			$.each(data, function(k, v) {
				var SelectInciso = "";
				SelectInciso += "<option value=" + v.id + ">"
						+ v.descripcion + "</option>";

				$("#inciso").append(SelectInciso);
			})
  			
  		}
  	}).fail(function(jqXHR, textStatus, errorThrown) {

		    alerta(errorThrown);
			$("#loading").hide();
		}).done(function() {
			$("#loading").hide();
		})
	
}

function ListaLetra() {
	$("#loading").show();
	var SelectLetra1 = "";
	SelectLetra1 += "<option value=''>Seleccione una Letra</option>";

	$("#letra").append(SelectLetra1);
	
	 $.ajax({
  		type : "GET",
  		url : '/simpleWeb/json/work/ListaLetra/',
  		async: false,
  		dataType : "JSON",
  		success : function(data) {
  			console.log(data);
  			$.each(data, function(k, v) {
				var Selectletra = "";
				Selectletra += "<option value=" + v.id + ">"
						+ v.descripcion + "</option>";

				$("#letra").append(Selectletra);
			})
  			
  		}
  	}).fail(function(jqXHR, textStatus, errorThrown) {

		    alerta(errorThrown);
			$("#loading").hide();
		}).done(function() {
			$("#loading").hide();
		})
	
}

function calcularTope(fecha)
{
	$("#loading").show();
	
	 $.ajax({
  		type : "GET",
  		url : '/simpleWeb/json/work/CalcularTope/'+fecha+'',
  		async: false,
  		dataType : "JSON",
  		success : function(data) {
  			$.each(data, function(k, v) {
				
  				tope = v.valor;
  				console.log("el tope es "+tope);
			})
  			
  		}
  	}).fail(function(jqXHR, textStatus, errorThrown) {

		    alerta(errorThrown);
			$("#loading").hide();
		}).done(function() {
			$("#loading").hide();
		})
		
		$("#valorTopeAviso").html("");
	    $("#valorTopeAnoServicio").html("");
	    
	    $("#valorTopeAviso").html("$ "+String(tope).replace(/(.)(?=(\d{3})+$)/g, '$1.'));
	    $("#valorTopeAnoServicio").html("$ "+String(tope).replace(/(.)(?=(\d{3})+$)/g, '$1.'));
	
}


function Enviar(){
	
	datosEnviar = [];
	var TotalFiniquito = $("#totalFiniquito").val();
	var get = getINFO();
    var codigo_trabajador = get.cod;
    var id_contrato_trab = get.id;
    var sociedad_trab = get.soc;
    var rut_trab = $("#rut_trabajador").text();
    var fecha_termino = $("#fechaTermino").val();
    var fechaTSplit = fecha_termino.split('-'); 
    var fechaTSplit_F = fechaTSplit[2]+"-"+fechaTSplit[1]+"-"+fechaTSplit[0];
	var articulo_termino_contrato = $("#articulo").val();
	var inciso_termino_contrato = $("#inciso").val();
	var letra_termino_contrato = $("#letra").val();
	var descripcionForm = $("#descripcion").val();
	var periodoS = fechaTSplit[2]+fechaTSplit[1];
	var fecha_pago = $("#fechaPago").val();	
	var fechaPagoSplit = fecha_pago.split('/'); 
    var fechaPagoSplit_F = fechaPagoSplit[2]+"-"+fechaPagoSplit[1]+"-"+fechaPagoSplit[0];
    var lugar_pago = $("#lugarPago").val();
    var horaP = $("#horaPago").val();
    if(horaP == "")
	{
	alerta("Debe Ingresar una Hora de Pago");
	$("#horaPago").focus();
	return;
	}
    else{
    	 var hora_pago =  ConvertTimeformat($("#horaPago").val());
    }
   
    var total_pago_finiquito = $("#totalFiniquito").val().replace(/\./g, "");
    
    if(fecha_termino == ""){
    	alerta("Debe Ingresar una fecha de Termino");
    	$("#fechaTermino").focus();
    	return;
    }
    else if(fecha_pago == "")
    	{
    	alerta("Debe Ingresar una fecha de Pago");
    	$("#fechaPago").focus();
    	return;
    	}
    else if(lugar_pago == "")
	{
	alerta("Debe Ingresar Lugar de Pago");
	$("#lugarPago").focus();
	return;
	}
  
	var checked_aviso;
    if ($('#sinAviso').is(':checked')) 
		{
    		checked_aviso = 1;
		}
    else{
    	checked_aviso = 0;
    	}

    
    var table = $('#tbl_Fito').DataTable();
    
    /// codigo hd
    cod_hd_row = [];
	var cells1 = new Array(); 
	cells1 = table.row().column(0).data().draw();  
	
	for (var i = 0; i < cells1.length; i++) 
	{
	    var codhdFila = cells1[i];
	    var cod = $(codhdFila).text();
	    cod_hd_row.push(cod);

	}
	// NOMBRE CONCEPTO
	    Nombre_Concepto_hd_row = [];
		var cells2 = new Array(); 
		cells2 = table.row().column(1).data().draw();  
		
		for (var i = 0; i < cells2.length; i++) 
		{
		    var nombrehdFila = cells2[i];
		    var nombrehdFilaText = $(nombrehdFila).text();
		    Nombre_Concepto_hd_row.push(nombrehdFilaText);

		}
		
		// valor haber o descuento
	    valor_Concepto_hd_row = [];
		var cells3 = new Array(); 
		cells3 = table.row().column(3).data().draw();  
		
		for (var i = 0; i < cells3.length; i++) 
		{
		    var valorhdFila = cells3[i];
		    var valorhdFilaText = $(valorhdFila).text();
		    valor_Concepto_hd_row.push(valorhdFilaText);

		}
        
		
		for (var i = 0; i < cod_hd_row.length; i++) 
		{
			var json2 = {
					codigo_trabajador : parseInt(codigo_trabajador),
					id_contrato : parseInt(id_contrato_trab),
					codHD : parseInt(cod_hd_row[i]),
					periodo : parseInt(periodoS),
					nombreHD : Nombre_Concepto_hd_row[i],
					montoHD : parseInt(valor_Concepto_hd_row[i]),
					sociedad : sociedad_trab,
					rut : rut_trab,
					fecha_termino : fechaTSplit_F,
					articulo : articulo_termino_contrato,
					inciso : inciso_termino_contrato,
					letra : letra_termino_contrato,
					descripcion : descripcionForm,
					fechapago : fechaPagoSplit_F,
					lugarpago : lugar_pago,
					horapago : hora_pago,
					total_finiquito : total_pago_finiquito,
					feriadobasico : $("#f_b").val(),
					feriadoprogresivo : $("#f_p").val(),
					feriadoconvencional : $("#f_c").val(),
					totalferiadobpc : $("#totalbpc").val(),
					diastomado : $("#diastomado").val(),
					subtotal : $("#subtotal").val(),
					diasinhabiles : $("#d_i").val(),
					totaldiasproporcional : $("#t_grupo").val(),
					aviso : checked_aviso
			}
			datosEnviar.push(json2);
		}
		
		
    
    var jsonMesAviso = {
					
					
    		codigo_trabajador : codigo_trabajador,
			id_contrato : id_contrato_trab,
			codHD : 2008,
			periodo : periodoS,
			nombreHD : "INDEMNIZACION MES DE NO AVISO",
			montoHD : $("#pagoMesAviso").val().replace(/\./g, ""),
			sociedad : sociedad_trab,
			rut : rut_trab,
			fecha_termino : fechaTSplit_F,
			articulo : articulo_termino_contrato,
			inciso : inciso_termino_contrato,
			letra : letra_termino_contrato,
			descripcion : descripcionForm,
			fechapago : fechaPagoSplit_F,
			lugarpago : lugar_pago,
			horapago : hora_pago,
			total_finiquito : total_pago_finiquito,
			feriadobasico : $("#f_b").val(),
			feriadoprogresivo : $("#f_p").val(),
			feriadoconvencional : $("#f_c").val(),
			totalferiadobpc : $("#totalbpc").val(),
			diastomado : $("#diastomado").val(),
			subtotal : $("#subtotal").val(),
			diasinhabiles : $("#d_i").val(),
			totaldiasproporcional : $("#t_grupo").val(),
			aviso : checked_aviso
    
    }
    datosEnviar.push(jsonMesAviso);
    
    var jsonAnioServicio = {
			
			
    		codigo_trabajador : codigo_trabajador,
			id_contrato : id_contrato_trab,
			codHD : 2007,
			periodo : periodoS,
			nombreHD : "INDEMNIZACION AÑOS DE SERVICIO",
			montoHD : $("#anioServicio").val().replace(/\./g, ""),
			sociedad : sociedad_trab,
			rut : rut_trab,
			fecha_termino : fechaTSplit_F,
			articulo : articulo_termino_contrato,
			inciso : inciso_termino_contrato,
			letra : letra_termino_contrato,
			descripcion : descripcionForm,
			fechapago : fechaPagoSplit_F,
			lugarpago : lugar_pago,
			horapago : hora_pago,
			total_finiquito : total_pago_finiquito,
			feriadobasico : $("#f_b").val(),
			feriadoprogresivo : $("#f_p").val(),
			feriadoconvencional : $("#f_c").val(),
			totalferiadobpc : $("#totalbpc").val(),
			diastomado : $("#diastomado").val(),
			subtotal : $("#subtotal").val(),
			diasinhabiles : $("#d_i").val(),
			totaldiasproporcional : $("#t_grupo").val(),
			aviso : checked_aviso
    
    }
    datosEnviar.push(jsonAnioServicio);
    
 var jsonFeriadoProporcional = {
			
			
    		codigo_trabajador : codigo_trabajador,
			id_contrato : id_contrato_trab,
			codHD : 2006,
			periodo : periodoS,
			nombreHD : "FERIADO PROPORCIONAL",
			montoHD : $("#feriadosProporcionales").val().replace(/\./g, ""),
			sociedad : sociedad_trab,
			rut : rut_trab,
			fecha_termino : fechaTSplit_F,
			articulo : articulo_termino_contrato,
			inciso : inciso_termino_contrato,
			letra : letra_termino_contrato,
			descripcion : descripcionForm,
			fechapago : fechaPagoSplit_F,
			lugarpago : lugar_pago,
			horapago : hora_pago,
			total_finiquito : total_pago_finiquito,
			feriadobasico : $("#f_b").val(),
			feriadoprogresivo : $("#f_p").val(),
			feriadoconvencional : $("#f_c").val(),
			totalferiadobpc : $("#totalbpc").val(),
			diastomado : $("#diastomado").val(),
			subtotal : $("#subtotal").val(),
			diasinhabiles : $("#d_i").val(),
			totaldiasproporcional : $("#t_grupo").val(),
			aviso : checked_aviso
    
    }
  
 datosEnviar.push(jsonFeriadoProporcional);		
			

 
 var codigofini = [1,2,3,4,5]
 var valorfini = [fechaTSplit_F,fechaPagoSplit_F,descripcionForm,lugar_pago,hora_pago]
 for (var i = 0; i < codigofini.length; i++) 
 		{
 			var jsonn = {
 			
 			codigo_trabajador : codigo_trabajador,
 			id_contrato : id_contrato_trab,
 			codHD : codigofini[i],
 			periodo : periodoS,
 			nombreHD : valorfini[i],
 			montoHD : 0		
  
  }
 			datosEnviar.push(jsonn);
 		}
 
 
 var codigofini2 = [6,7,8,9,10,11,12,13,14,15,16,17,18]
 var valorfini2 = [articulo_termino_contrato,inciso_termino_contrato,letra_termino_contrato,total_pago_finiquito, $("#f_b").val(),$("#f_p").val(),$("#f_c").val(),$("#totalbpc").val(),$("#diastomado").val(),$("#subtotal").val(),$("#d_i").val(),$("#t_grupo").val(),checked_aviso]
 var valorfiniNombre2 = ["ARTICULO","INCISO","LETRA","TOTAL FINIQUITO","FERIADO BASICO","FERIADO PROGRESIVO","FERIADO CONVENCIONAL","totalferiadobpc","DIAS TOMADO","SUBTOTAL","DIAS INHABILES","TOTAL DIAS PROPORCIONALES","AVISO"]
 for (var i = 0; i < codigofini2.length; i++) 
 		{
 			var jsonnn = {
 			
 			codigo_trabajador : codigo_trabajador,
 			id_contrato : id_contrato_trab,
 			codHD : codigofini2[i],
 			periodo : periodoS,
 			nombreHD : valorfiniNombre2[i],
 			montoHD : parseFloat(valorfini2[i])		
  
  }
  datosEnviar.push(jsonnn);
 			console.log(jsonnn);
 		}
 
			

		$("#loading").show();
		
		$.ajax({
			url : "/simpleWeb/json/work/insertSWFiniquitos/",
			type : "PUT",
			data : JSON.stringify(datosEnviar),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
				$("#loading").show();

			},
			success : function(data, textStatus, jqXHR) {

				alerta("Enviado");
				window.location.href = ("finiquitosModulo");

				
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

function setTwoNumberDecimal(event) {
    this.value = parseFloat(this.value).toFixed(2);
}

$("#f_b,#f_p,#f_c").change(function(event) {
	
	 var v_f_b = parseFloat($("#f_b").val());
	 var v_f_p = parseFloat( $("#f_p").val());
	 var v_f_c = parseFloat($("#f_c").val());
	   

	   var subtotal1 =  v_f_b + v_f_p + v_f_c;
	   var subtotal1_3 = parseFloat(subtotal1).toFixed(2) 
	   $("#totalbpc").val(subtotal1_3);
	   
	   var subT = parseFloat($("#totalbpc").val());
	   var v_d_t = $("#diastomado").val();
	   
	   var subtotal2 = subT - v_d_t;
	   var subtotal2_1 = parseFloat(subtotal2).toFixed(2); 
	   $("#subtotal").val(subtotal2_1);
	   
	   
	   var sumT2 = $("#subtotal").val();
	   sumT2 = parseFloat(sumT2).toFixed(2);
	   $("#loading").show();
	   $.ajax({
	  		type : "GET",
	  		url : '/simpleWeb/json/work/DiasProporcionales/'+fecha_terminoT+','+sumT2+'',
	  		async: false,
	  		dataType : "JSON",
	  		success : function(data) {
	  			
	  			console.log(data);
	  			$.each(data, function(k, v) {
					
	  				dias_propor_change = parseFloat(v.proporcional).toFixed(2);
	  				
				})
	  			
	  		}
	  	}).fail(function(jqXHR, textStatus, errorThrown) {

			    alerta(errorThrown);
				$("#loading").hide();
			}).done(function() {
				$("#loading").hide();
			})	
			
			var valorGrupo = parseFloat($("#t_grupo").val());
	        var v_saldo = parseFloat($("#subtotal").val());
	   
	   var Total_d_h2 = valorGrupo -  v_saldo;
	   $("#d_i").val(Total_d_h2);
	   
	   $("#t_grupo").val(dias_propor_change)
	   
	   

	
});

$("#diastomado").change(function(event) {
	
	   var v_d_t = $("#diastomado").val();
	   var v_f_b = parseFloat($("#f_b").val());
	   var v_f_p = parseFloat( $("#f_p").val());
	   var v_f_c = parseFloat($("#f_c").val());
	   

	   var subtotal1 =  v_f_b + v_f_p + v_f_c;
	   var subtotal1_3 = parseFloat(subtotal1).toFixed(2)
	   
	   var subtotal2 = subtotal1_3 - v_d_t;
	   var subtotal2_1 = parseFloat(subtotal2).toFixed(2) 
	   $("#subtotal").val(subtotal2_1);
	   
	   var sumT2 = $("#subtotal").val()
	   $("#loading").show();
	   $.ajax({
	  		type : "GET",
	  		url : '/simpleWeb/json/work/DiasProporcionales/'+fecha_terminoT+','+sumT2+'',
	  		async: false,
	  		dataType : "JSON",
	  		success : function(data) {
	  			
	  			console.log(data);
	  			$.each(data, function(k, v) {
					
	  				dias_propor_change =  parseFloat(v.proporcional).toFixed(2);
	  				$("#t_grupo").val(parseFloat(v.proporcional).toFixed(2));
				})
	  			
	  		}
	  	}).fail(function(jqXHR, textStatus, errorThrown) {

			    alerta(errorThrown);
				$("#loading").hide();
			}).done(function() {
				$("#loading").hide();
			})	
			
			var valorGrupo = parseFloat($("#t_grupo").val());
	        var v_saldo = parseFloat($("#subtotal").val());
	   
	   var Total_d_h2 = valorGrupo -  v_saldo;
	   $("#d_i").val(Total_d_h2);
	   $("#t_grupo").val(dias_propor_change)
	
});

function rehacer(){
	dias_propor = dias_propor2;
	$("#f_b").val(dias_basico);
	$("#f_p").val(dias_progresivo);
	$("#f_c").val(dias_convencional);
	$("#totalbpc").val(subtotalA);
	$("#diastomado").val(dias_tomado);
	$("#subtotal").val(saldo_disponible);
	$("#d_i").val(dias_inhabiles);
	$("#t_grupo").val(dias_propor);
	
	var total_aviso = parseInt($("#promedioTotalAviso3").val().replace(/\./g, ""));
	var total_feriados_pro = (total_aviso/30) * dias_propor;
    var total_feriados_pro2 = Math.round(total_feriados_pro);
	var total3 = String(total_feriados_pro2).replace(/(.)(?=(\d{3})+$)/g, '$1.');
	
	if(valorHDtablaFeriado != 0){
		 
		 $("#feriadosProporcionales").val(String(valorHDtablaFeriado).replace(/(.)(?=(\d{3})+$)/g, '$1.'));
		 $("#feriadosProporcionales").css("color", "red");
		 $( "#diastomado,#f_c,#f_p,#f_b,#promedioAvisoSueldo3,#promedioAvisoAsigInpo3,#promedioAvisoNoimponible3" ).prop( "disabled", true );
		 $('#aplicar,#rehacer').attr("disabled", true);
	}else{
	 
	   $("#feriadosProporcionales").val(total3);
	   $("#feriadosProporcionales").css("color", "black");
	}
	
	
	$("#valorProporcionales").html(dias_propor);
	
	var val_aviso = $("#pagoMesAviso").val().replace(/\./g, "");
	var val_anio = $("#anioServicio").val().replace(/\./g, "");
	
	if(valorHDtablaFeriado != 0){
	
		 var val_fer = valorHDtablaFeriado;
		 $("#feriadosProporcionales").css("color", "red");
		 $( "#diastomado,#f_c,#f_p,#f_b,#promedioAvisoSueldo3,#promedioAvisoAsigInpo3,#promedioAvisoNoimponible3" ).prop( "disabled", true );
		 $('#aplicar,#rehacer').attr("disabled", true);
	}else{
	 
	 var val_fer = $("#feriadosProporcionales").val().replace(/\./g, "");
	 $("#feriadosProporcionales").css("color", "black");
	}
	
	
	if(tipo_contrato == 1){
		   
		var sum_t = parseInt(val_aviso) + parseInt(val_anio) + parseInt(val_fer) + total_h_d;
	   }else{
		   var sum_t = parseInt(val_fer) + total_h_d;
	   }
	   
	
	
	$("#totalFiniquito").val(String(sum_t).replace(/(.)(?=(\d{3})+$)/g, '$1.'));
	
	
		 
}

function aplicar(){
	
var total_aviso = parseInt($("#promedioTotalAviso3").val().replace(/\./g, ""));
	
if(valorHDtablaFeriado != 0){

	 var total_feriados_pro = valorHDtablaFeriado;
	 $("#feriadosProporcionales").css("color", "red");
	 $( "#diastomado,#f_c,#f_p,#f_b,#promedioAvisoSueldo3,#promedioAvisoAsigInpo3,#promedioAvisoNoimponible3" ).prop( "disabled", true );
	 $('#aplicar,#rehacer').attr("disabled", true);
}else{

	var total_feriados_pro = (total_aviso/30) * $("#t_grupo").val();
	$("#feriadosProporcionales").css("color", "black");
}
	
	
	$("#valorProporcionales").html($("#t_grupo").val());    
	$("#feriadosProporcionales").val(String(parseInt(total_feriados_pro)).replace(/(.)(?=(\d{3})+$)/g, '$1.'));
	dias_propor = $("#t_grupo").val();
	
	    var val_aviso = $("#pagoMesAviso").val().replace(/\./g, "");
		var val_anio = $("#anioServicio").val().replace(/\./g, "");
		var val_fer = $("#feriadosProporcionales").val().replace(/\./g, "");
		
		if(tipo_contrato == 1){
			   
			var sum_t = parseInt(val_aviso) + parseInt(val_anio) + parseInt(val_fer) + total_h_d;
		   }else{
			   var sum_t = parseInt(val_fer);
		   }
		   
		
		
		$("#totalFiniquito").val(String(sum_t).replace(/(.)(?=(\d{3})+$)/g, '$1.'));
}

$(document).on('change', '#articulo', function(){
	
	$('#inciso').html('<option value="">Seleccione...</option>');
	$('#letra').html('<option value="">Seleccione...</option>');

	// Servicio para Obtener los Incisos dado un Articulo
	let inciso = $(this).getJSONSync("/simpleWeb/json/work/getIncisoTerminoContratoByIdArticulo/"+$('#articulo').val());
	
	// Cambiar Nombres de Propiedades  por value - text
	$.each(inciso, function(key, object){
		inciso[key] = renameProperty(object,"idIncisoTerminoContrato", "value");
		inciso[key] = renameProperty(object,"descripcion", "text");
	});

	// Llenar select de la Lista Huerto
	$('#inciso').setOptionsByArray(inciso);
	
	$('#inciso').prop('disabled',false);
	
	 var art = $("#articulo").val();
	 var inci = $("#inciso").val();
	   
	 if(tipo_contrato == 1){
	   if(art == 3 ){
		   
		   
			   $("#calculo-finiquito-aviso").show();
			   $("#divPagoMesAviso").show();
			   $("#label_mes_aviso").show();
			   
			   $("#label_anio_servicio").show();
			   $("#calculo-finiquito-servicios").show();
			   $("#anio_valor").show();
			   
			   	$("#anioServicio").val(anio_pago);
			    $("#pagoMesAviso").val(aviso_pago);
		
	   }else{
		   
		   $("#calculo-finiquito-aviso").hide();
		   $("#divPagoMesAviso").hide();
		   $("#label_mes_aviso").hide();
		   
		   $("#label_anio_servicio").hide();
		   $("#calculo-finiquito-servicios").hide();
		   $("#anio_valor").hide();

			$("#anioServicio").val(0);
		    $("#pagoMesAviso").val(0);
	   }
	 }else{
		 $("#calculo-finiquito-aviso").hide();
		   $("#divPagoMesAviso").hide();
		   $("#label_mes_aviso").hide();
		   
		   $("#label_anio_servicio").hide();
		   $("#calculo-finiquito-servicios").hide();
		   $("#anio_valor").hide();

			$("#anioServicio").val(0);
		    $("#pagoMesAviso").val(0);
	 }
});

//Pasado un Array insertar opciones en un select
jQuery.fn.setOptionsByArray = function(array) {

	var select = this;

	$.each(array, function(key, value) {
		$(select).append($('<option>').text(value.text).val(value.value));
	});

};


//Obtener objecto JSON por Servicio synchronous
jQuery.fn.getJSONSync = function(urlServicioPath) {

	var objectData = new Object();

	$.ajax({
		type : "GET",
		async : false,
		url : urlServicioPath,
		dataType : "json",
		success : function(data) {
			objectData = data;
		},
		error : function(ex) {
			alert('Error:' + ex);
		}
	});

	return objectData;

};

//Renombre propiedad del Objeto
function renameProperty (object, oldName, newName) {
    // Do nothing if the names are the same
	if (oldName == newName) {
        return object;
    }
   // Check for the old property name to avoid a ReferenceError in strict mode.
   if (object.hasOwnProperty(oldName)) {
	   object[newName] = object[oldName];
       delete object[oldName];
   }
   return object;
};


$(document).on('change', '#inciso', function(){

	$('#letra').html('<option value="">Seleccione...</option>');

	// Servicio para Obtener las Letras dado un Inciso
	let letra = $(this).getJSONSync("/simpleWeb/json/work/getLetraTerminoContratoByIdInciso/"+$('#inciso').val());
	
	// Cambiar Nombres de Propiedades  por value - text
	$.each(letra, function(key, object){
		letra[key] = renameProperty(object,"idLetraTerminoContrato", "value");
		letra[key] = renameProperty(object,"descripcion", "text");
	});

	// Llenar select de la Lista 
	$('#letra').setOptionsByArray(letra);
	
	$('#letra').prop('disabled',false);
	
	 var art = $("#articulo").val();
	 var inci = $("#inciso").val();
	 
	 
	 if(tipo_contrato == 1){
		 if(art == 3 ){
			   
			   if(inci == 14 || inci == 16 )
			   {
				   $("#calculo-finiquito-aviso").show();
				   $("#divPagoMesAviso").show();
				   $("#label_mes_aviso").show();
				   
				   $("#label_anio_servicio").show();
				   $("#calculo-finiquito-servicios").show();
				   $("#anio_valor").show();
				   
					$("#anioServicio").val(anio_pago);
				    $("#pagoMesAviso").val(aviso_pago);
			   }
		   }else{
			   
			   $("#calculo-finiquito-aviso").hide();
			   $("#divPagoMesAviso").hide();
			   $("#label_mes_aviso").hide();
			   
			   $$("#label_anio_servicio").hide();
			   $("#calculo-finiquito-servicios").hide();
			   $("#anio_valor").hide();
			
				$("#anioServicio").val(0);
			    $("#pagoMesAviso").val(0);
		   }
	   }
       else{
		 $("#calculo-finiquito-aviso").hide();
		   $("#divPagoMesAviso").hide();
		   $("#label_mes_aviso").hide();
		   
		   $$("#label_anio_servicio").hide();
		   $("#calculo-finiquito-servicios").hide();
		   $("#anio_valor").hide();
		
			$("#anioServicio").val(0);
		    $("#pagoMesAviso").val(0);  
		  }
	
	



});

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