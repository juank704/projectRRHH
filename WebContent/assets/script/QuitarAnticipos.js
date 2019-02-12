
//Colocar Permisos
var sociedadPrivilege = new Set();
var huertoPrivilege = new Array();
//Obtener Sociedades y Huertos que tiene acceso
$.each(SESION.campo, function(key, value){
	sociedadPrivilege.add(value.idSociedad);
	huertoPrivilege.push(value.campo);
});

$(document).ready(function(){
	
	$(".select2-selection").addClass("form-control btn-circle btn-sm mayusculasWork");

	$.fn.dataTable.ext.errMode = 'none';
	ListaSociedad();
	ListaTipoContrato();
	
	format();
	

	
	$('#tbl_InfoPopup').DataTable({
		"sPaginationType": "full_numbers" ,
		"columns": [
                    { className: "tdPeriodo" },
		            { className: "tdFechaPago" },
		            { className: "tdCodTrabajador" },
		            { className: "tdNombreTrabajador" },
		            { className: "tdIdContrato" },
		            { className: "tdMontoIngresado" },
		            { className: "tdcodNew" },
		            { className: "tdSociedad" }
		          ]
	

		
		
});  
	$('#tbl_InfoPopup').DataTable({
		"sPaginationType": "full_numbers" ,
		"columns": [
		            { className: "tdPeriodo" },
		            { className: "tdFechaPago" },
		            { className: "tdCodTrabajador" },
		            { className: "tdNombreTrabajador" },
		            { className: "tdIdContrato" },
		            { className: "tdMontoIngresado" },
		            { className: "tdcodNew" },
		            { className: "tdSociedad" }
		          ]
		
});
	var currentTime = new Date();	
    var startDateFrom = new Date(currentTime.getFullYear(), currentTime.getMonth() -1, 1);
	
	 $("#fechaPago").datepicker({ 
			dateFormat: 'dd-mm-yy',
			firstDay: 1,
	        changeMonth: true,
	        changeYear: true,
	        minDate : startDateFrom,
	       

			});
	 $("#periodoRemuneraciones").datepicker({ 
			dateFormat: 'yy-mm',
			firstDay: 1,
	        changeMonth: true,
	        changeYear: true,
	        minDate : startDateFrom,
	       

			});
			$("#periodoRemuneracionesB").datepicker({
				dateFormat : 'yy-mm',
				minDate : startDateFrom,
				firstDay: 1,
				changeMonth : true,
				changeYear : true

			});
	 var SelectTrabajadorNombre = "";
		SelectTrabajadorNombre += " <option value='0'>Buscar</option>";
		$("#nombreTrabajadorB").append(SelectTrabajadorNombre);
	 $("#nombreTrabajador").select2({
		    dropdownAutoWidth : true
		});

	 $("#select2-nombreTrabajadorB-container").css("text-align", "center");



	$("#nombreTrabajador").change(function(event){
		
		buscarIdContrato();
		var codigoTrabajador = $("#nombreTrabajador").val();

			$.getJSON("/simpleWeb/json/work/cargarXCodTrabajador/" + codigoTrabajador , function(data){
               
			  
				$.each(data, function(k, v){
					
					$('#tipodivision option[value='+v.division+']').attr('selected','selected');
					$('#tiposubdivision option[value='+v.subDivision+']').attr('selected','selected');
					$('#listagrupo option[value='+v.grupo+']').attr('selected','selected');
					$('#listasubgrupo option[value='+v.subgrupo+']').attr('selected','selected');

				})
			});
	});
	$("#loading").hide();
});



function ListaSociedad(){
	
	$.getJSON("/simpleWeb/json/work/ListaSociedad/", function(data){
		datos = data;
		$.each(data, function(k, v){
			var SelectSociedad = "";
	if(v.idSociedad == -1){
				
			}else{
			SelectSociedad += 	"<option value="+v.idSociedad+">"+v.denominacionSociedad+"</option>";
			
			$("#Sociedad").append(SelectSociedad);
			$("#SociedadUpdate").append(SelectSociedad);
			$("#SociedadB").append(SelectSociedad);
			}
		})
});
}



$("#SociedadB").change(function(){
	
	
	var soc = $("#SociedadB").val();
		
		if(soc === '-1'){alerta("Debe Seleccionar una Empresa");$('.swal2-container').css('z-index', '15000');return;}

	
		$("#nombreTrabajadorB").empty();
		$("#tipodivisionB").empty();
		$("#tiposubdivisionB").empty();
		$("#listagrupoB").empty();
		$("#tiposubdivisionB").append("<option value='-1'>Seleccione Zona</option>");
		$("#listagrupoB").append("<option value='-1'>Seleccione CECO</option>");
		
		
		var soc = $("#SociedadB").val();
			
			if(soc === '-1'){alerta("Debe Seleccionar una Empresa");$('.swal2-container').css('z-index', '15000');return;}

			var soci_sap = "";
			$("#loading").show();
			$.getJSON("/simpleWeb/json/work/getSociedadById/"+$('#SociedadB').val()+"" , function(data){
		        
				soci_sap = JSON.stringify(data.sociedad);
			
				
			}).done(function() {
				
				$("#tipodivisionB").append("<option value='-1'>Seleccione Huerto</option>");
				var soci_sapFinal  = soci_sap.replace(/\"/g, '');
				
				$.getJSON("/simpleWeb/json/work/getCampoBySociedad/"+$('#SociedadB').val()+"" , function(data){
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
	 
	
		lodtrab2();
	
});
$("#Sociedad").change(function(){
	
	$("#tblPeticion").empty();
	$("#periodoRemuneraciones").val("");
	$("#totalMonto").empty();
	$("#totalMonto").append("0");
	$("#fechaPago").val("");
	$("#tipodivision").val(-1);
	$("#tipodivision").val(-1);
	$("#listagrupo").val(-1);
	$("#listasubgrupo").val(-1);
	$("#nombreTrabajador").empty();
	$("#montoTrabajador").val("");
	$("#idContrato").empty();
	estadoAddAll = 0

	Array_total_monto = [];
	Array_numero_fila = [];
	numero = 0;

	var table = $('#tbl_InfoPopup').DataTable();

	table.clear().draw();
	
	 
	
	
	var soc = $("#Sociedad").val();
		
		if(soc == -1){alerta("Debe Seleccionar una Empresa");$('.swal2-container').css('z-index', '15000');return;}

	
	 
	
	lodtrab();
	
});


function lodtrab(){
	
	$("#nombreTrabajador").empty();
	var sociedad = $("#Sociedad").val();
	
	if(sociedad == ''){
		sociedad = null;
	}else{
		 sociedad = $("#Sociedad").val();
	}
	
	var tipo_division = $("#tipodivision").val();
	
    if(tipo_division === "-1"){tipo_division = null;}
    else if(tipo_division == ''){
		tipo_division = null;
	}
	else{
		 tipo_division = $("#tipodivision").val();
	}
    
	
	var tipo_subdivision = $("#tiposubdivision").val();
	if(tipo_subdivision === "-1"){tipo_subdivision = null;}
	else if(tipo_subdivision == ''){
		tipo_subdivision = null;
	}else{
		tipo_subdivision = $("#tiposubdivision").val();
	}
	
	var grupo = $("#listagrupo").val();
	if(grupo === "-1"){grupo = null;}
	else if(grupo == ''){
		grupo = null;
	}else{
		 grupo = $("#listagrupo").val();
	}
	
	var tipo_grupo = $("#listasubgrupo").val();
	if(tipo_grupo === "-1"){tipo_grupo = null;}
	else if(tipo_grupo == ''){
		tipo_grupo = null;
	}else{
	  tipo_grupo = $("#listasubgrupo").val();
	}
	
	$("#loading").show();
	
	$.getJSON("/simpleWeb/json/work/LoadTrabajadorXSociedadAnticiposSimple2/"+sociedad+","+tipo_division+","+tipo_subdivision+","+grupo+","+tipo_grupo+"", function(data){
		
		var SelectTrabajadorNombre = "";
		SelectTrabajadorNombre += "<option value='0'>Buscar</option>";
		$("#nombreTrabajador").append(SelectTrabajadorNombre);
		$.each(data, function(k,v){
			var SelectTrabajador = "";

			var SelectTrabajadorNombre = "";
			SelectTrabajadorNombre += "<option value="
					+ v.codigotrabajador + ">" + v.codigotrabajador
					+ "|" + v.nombre + " " + v.apellidoPaterno + " "
					+ v.apellidoMaterno + "|" + v.rut + "</option>";
			$("#nombreTrabajador").append(SelectTrabajadorNombre);
		});
	}).done(function() {
		$("#loading").hide();

	})
}

function lodtrab2() {

	$("#loading").show();
	$("#nombreTrabajadorB").empty();
	
	var valueSociedad = $('#SociedadB').val();
	
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
	
	
	var SelectTrabajadorNombre = "";
	SelectTrabajadorNombre += " <option value='0'>Buscar</option>";
	$("#nombreTrabajadorB").append(SelectTrabajadorNombre);
	$.getJSON(
			"/simpleWeb/json/work/LoadTrabajadorXSociedadAnticiposSimple/"
			+ valueSociedad+","+tipo_division+","+tipo_subdivision+","+grupo+"",
			function(data) {
		

				$.each(data, function(k, v) {

					var SelectTrabajador = "";

					var SelectTrabajadorNombre = "";
					SelectTrabajadorNombre += "<option value="
							+ v.codigotrabajador + ">" + v.codigotrabajador
							+ "|" + v.apellidoPaterno + " " + v.apellidoMaterno + " "
							+ v.nombre + "|" + v.rut + "</option>";
					$("#nombreTrabajadorB").append(SelectTrabajadorNombre);

				});

			}).done(function() {
		$("#loading").hide();

	})
}

var estadoAddAll = 0;
var numero = 0;
var numero2 = 0;
Array_total_monto = [];
Array_numero_fila = [];
function agregarFila(){
	
	var sociedad = $("#Sociedad").val();
	 if (sociedad == "-1") {
			alerta("Debe Selecionar una Empresa");
			$("#Sociedad").focus();
			$('.swal2-container').css('z-index', '15000');
			return;
		}
	 var periodo = $("#periodoRemuneraciones").val();
	 var fechaDePago = $("#fechaPago").val();
		
	 
	  if (periodo == '') {
			alerta("Debe Ingresar un Periodo");
			$("#Sociedad").focus();
			$('.swal2-container').css('z-index', '15000');
			return;
		}
	  else if(fechaDePago == '')
	  {alerta("Debe Ingresar una Fecha de Pago"); $( "#fechaPago" ).focus();
	  $('.swal2-container').css('z-index', '15000');return;
	  }

	  else{
			var periodoSplit = $("#periodoRemuneraciones").val();
			var fslit = fechaDePago.split('-');
			var pslit = periodoSplit.split('-');
			
			 if(pslit[1] != fslit[1] ){
				alerta("Debe Seleccionar una Fecha de Pago o Periodo Correspondiente al Mismo Mes");$('.swal2-container').css('z-index', '15000');return;
			}
		}
  
	  if($('#nombreTrabajador').val() == '0'){alerta("Debe Seleccionar un Nombre Trabajador");
		$( "#nombreTrabajador" ).focus(); segundoPopup(); return;
		}else{
			var codigoTrabajador = $("#nombreTrabajador").val();
			var data = $('#nombreTrabajador').select2('data')
			var nombretrabajador3 = data[0].text;
			var nombretrabajador = nombretrabajador3.split('|');
		}
		var monto = $("#montoTrabajador").val();
	    if(monto == ''){
	    	alerta("Debe Ingresar un Monto");
	    	$( "#montoTrabajador" ).focus();
	    	$('.swal2-container').css('z-index', '15000');return;
	    	}else{
	    		
	    	}
	    
	    if($("#idContrato").val() == null || $("#idContrato").val() == "-1") {alerta("Debe Aeleccionar una Fecha de Contrato");
	    $('.swal2-container').css('z-index', '15000');return;
	    }else{
	    	var id_contrato = $("#idContrato").val();
	    	var text_contrato = $("#idContrato").text();
	    }
	

	
	
	var tableadd = $('#tbl_InfoPopup').DataTable();
  
 
   
	tableadd.row.add( [
            "<td class='tdperiodo'  style='text-align: center;'>"+periodoSplit+"</td>",
            "<td class='tdFechaPago'  style='text-align: center;'>"+fechaDePago+"</td>",
            "<td class='tdCodTrabajador'  style='text-align: left;'>"+codigoTrabajador+"</td>",
			"<td class='tdNombreTrabajador'  style='text-align: center;'>"+nombretrabajador[1]+"</td>",
			"<td class='tdIdContrato'><select id='idContrato"+numero+"'class='form-control btn-circle btn-sm mayusculasWork' disabled><option value='"+id_contrato+"'>"+text_contrato+"</option></select></td>",
			"<td class='tdMontoIngresado'  style='text-align: center;'>"+monto+"</td>",
			"<td class='tdcodNew'  style='text-align: center;'><button id=td"+ numero+"  onclick='javascript: eliminarFila(this.id);'title='Eliminar' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button></td>",
			"<td>"+sociedad+"</td>"
			] ).node().id = "td"+numero;
	tableadd.draw();
        
       
   
	
	
//	$("#tblPeticion")
//	.append(
//			"" + "<tr id=td"+numero+ ">"
//			   + "
//			   
//	           +"</tr>");
	        
	        var montoN2 = monto.toString().replace(/\./g, '');
	         
	        
	    	var datos = {
	    			fila : numero,
	    			monto : montoN2

	    		}
	    
	         Array_total_monto.push(datos);
	        
	    	
	    	var total = 0;for (var i = 0; i < Array_total_monto.length; i++) {
	    	   
	    	   total = parseInt(Array_total_monto[i].monto) + total ;
	    	}
	    	
	        var total = String(total).replace(/(.)(?=(\d{3})+$)/g,'$1.')
	         
	         $("#totalMonto").empty();
	  	     $("#totalMonto").append(total);
	
	         numero = numero + 1;
	     
	         
}
function eliminarFila(id) {

console.log(Array_total_monto);
	var res = id.slice(2);

	for (var i = 0; i < Array_total_monto.length; i++) {

		if (Array_total_monto[i].fila == res) {

			Array_total_monto.splice(i, 1);
		}
	}
	
	console.log(Array_total_monto);

	var total = 0;
	for (var i = 0; i < Array_total_monto.length; i++) {

		total = parseInt(Array_total_monto[i].monto) + total;
	}

	var total = String(total).replace(/(.)(?=(\d{3})+$)/g, '$1.')

	$("#totalMonto").empty();
	$("#totalMonto").append(total);


	
	var table = $('#tbl_InfoPopup').DataTable();
	
	
	 
	 var str = id; 
	    var res = str.slice(2);
	
	table.row( "#" + id + "").remove( {
	   
	} );table.draw();
	
	$("#" + id + " td").each(function() {
		$("#" + id + " tr").remove();
		$("#" + id + "").remove();
	});
	
   
}

function Enviar() {
	
	peticion2 = [];
	
	var existe = $("#tblPeticion td").hasClass("dataTables_empty");

	if (nFilas == 0) {
		alerta("Debe Agregar la Lista Antes de Enviar");segundoPopup();
		return;
	}else if (existe == true) {
		alerta("No hay datos Disponibles");
		segundoPopup();
		return;
	} else {

		var table = $('#tbl_InfoPopup').DataTable();
		 var cells = new Array(); 
		 var monto = new Array();
		cells = table
		    .row()
		    .column(5).data().draw();  for (var i = 0; i < cells.length; i++) {
		     	var texto = cells[i]; 
		     	var texto2 = $(texto).text();
		     	var montoN = texto2.toString().replace(/\./g, '');
		    monto.push(montoN);

		}

		 var cells2 = new Array(); 
		 var codigo = new Array();
		cells2 = table
		    .row()
		    .column(2).data().draw();  for (var i = 0; i < cells2.length; i++) {
		     	var cod_trabajador = cells2[i]; var cod = $(cod_trabajador).text();
		    codigo.push(cod);

		}

		var cells3 = new Array(); 
		 var fecha_anticipo = new Array();
		cells3 = table
		    .row()
		    .column(1).data().draw();  for (var i = 0; i < cells3.length; i++) {
			var fechaAnticipo = cells3[i];
			var pe = $(fechaAnticipo).text();
			var ftU = pe.split('-');
			var ftU2 = ftU[2] +"-"+ ftU[1] +"-"+ ftU[0];
		    fecha_anticipo.push(ftU2);
		    
		   

		}

		var cells4 = new Array(); 
		 var periodo = new Array();
		cells4 = table
		    .row()
		    .column(0).data().draw();  for (var i = 0; i < cells4.length; i++) {
		     	var periodo_anticipo = cells4[i];
		     	var peri = $(periodo_anticipo).text();
		     	var periodoReplace = peri.replace(/-/gi, "");
		    periodo.push(periodoReplace);

		}

		var idContrato = new Array();
		table.column(4).nodes().each(function (node, index, dt) {
		  idContrato.push($(table.cell(node).node()).find('select.form-control').val());
	})
	
	var cells5 = new Array(); 
 var sociedad = new Array();
cells5 = table
    .row()
    .column(7).data().draw();  for (var i = 0; i < cells5.length; i++) {
     	var soci = cells5[i]; var soc = $(soci).text();
    sociedad.push(soc);

}
	
	var nFilas = table.rows().count();
	
        
		for (var i = 0; i < nFilas; i++) {
			var json2 = {

				periodo : periodo[i],
				fecha : fecha_anticipo[i],
				codtrabajador : codigo[i],
				montoingresado : monto[i],
				empresa : sociedad[i],
				idcontrato : idContrato[i]

			}
			peticion2.push(json2);

		    
		}
		
		
		$.ajax({
			url : "/simpleWeb/json/work/insertAnticiposIndividuales/",
			type : "PUT",
			data : JSON.stringify(peticion2),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
				$("#loading").show();

			},
			success : function(data, textStatus, jqXHR) {

				$("#tblPeticion").empty();
				$("#periodoRemuneraciones").val("");
				$("#TipodePago").val("");
				$("#Sociedad").val(-1);
				$("#tipodivision").val(-1);
				$("#tiposubdivision").val(-1);
				$("#listagrupo").val(-1);
				$("#listasubgrupo").val(-1);
				$("#montoTrabajador").val("");
				$("#fechaPago").val("");
				$("#codTrabajador").val("");
				$("#nombreTrabajador").val("");
				$("#rutTrabajador").val("");
				Array_total_monto.length = 0;
				$("#totalMonto").empty();
				total = 0;
				$("#totalMonto").append(total);
				$('#modalIngresar').modal('toggle');
				
				alerta("Enviado");
				
				$("#loading").hide();
			}
		}).fail(function(jqXHR, textStatus, errorThrown) {

		    alerta(errorThrown);
		    segundoPopup();
			$("#loading").hide();
		})
	}
} 
function formatNumber (n) {
	n = String(n).replace(/\D/g, "");
	return n === '' ? n : Number(n).toLocaleString();
}
function format() {
	var number = $('.number');
	for(var i = 0; i < number.length; i++){
		number[i].addEventListener('keyup', function(e){
			var element = e.target;
			var value = element.value;
			element.value = formatNumber(value);
		})
	}
}	

function buscarTrabajadorByParams(){
	
	BuscarAnticipoSimple();
	
}

function cargarxperiodo(){
	
	var periodo = $("#periodoRemuneracionesB").val();

	var periodoF = periodo.replace(/-/gi, "");
   
	$("#loading").show();
	$.getJSON("/simpleWeb/json/work/cargarPorPeriodoAsignacionSimple/" + periodoF , function(data){
		
	
		var numero = 1;
		$.each(data, function(k, v){
			
			var bodyPreselect = "";
			bodyPreselect += "<tr id='td"+k+"'>";
			bodyPreselect += 	"<td  style='text-align: center;'>"+v.fecha+"</td>";
			bodyPreselect += 	"<td style='text-align: center;'>"+v.codtrabajador+"</td>";
			bodyPreselect += 	"<td style='text-align: left;'>"+v.nombre+" "+v.appaterno+" "+v.appmaterno+"</td>";
			bodyPreselect += 	"<td id='number' style='text-align: center;'>"+String(v.montoingresado).replace(/(.)(?=(\d{3})+$)/g,'$1.')+"</td>";
			bodyPreselect += 	"<td id='"+k+"' style='text-align: center;'>";
			bodyPreselect +=		"<button title='Actualizar' id='"+v.id+"' onclick='editarFicha(this.id);' class='btn btn-circle yellow btn-outline btn-sm'><i class='fa fa-pencil-square-o fa-lg'></i></button>";
			bodyPreselect +=		"<button title='Eliminar' id='"+v.id+"' onclick='eliminarSolicitud(this.id);' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button>"
			bodyPreselect +=	"</td>";
			bodyPreselect += "</tr>" ;
			$("#tblPeticion2").append(bodyPreselect);
		})
		$("#loading").hide();
		$('#tbl_Info2').DataTable({
			"sPaginationType": "full_numbers" ,
			
			
	});  
		$('#tbl_Info2').DataTable({
			"sPaginationType": "full_numbers" ,
			
	}); 
n
});
}

function cargarxfecha(){

	var fecha = $("#fechaPagoB").val();

	
   
	$("#loading").show();
	$.getJSON("/simpleWeb/json/work/cargarPorFechaAsignacionSimple/" + fecha , function(data){
		
	
		var numero = 1;
		$.each(data, function(k, v){
			
			var bodyPreselect = "";
			bodyPreselect += "<tr id='td"+k+"'>";
			bodyPreselect += 	"<td  style='text-align: center;'>"+v.fecha+"</td>";
			bodyPreselect += 	"<td style='text-align: center;'>"+v.codtrabajador+"</td>";
			bodyPreselect += 	"<td style='text-align: left;'>"+v.nombre+" "+v.appaterno+" "+v.appmaterno+"</td>";
			bodyPreselect += 	"<td id='number' style='text-align: center;'>"+String(v.montoingresado).replace(/(.)(?=(\d{3})+$)/g,'$1.')+"</td>";
			bodyPreselect += 	"<td id='"+k+"' style='text-align: center;'>";
			bodyPreselect +=		"<button title='Actualizar' id='"+v.id+"' onclick='editarFicha(this.id);' class='btn btn-circle yellow btn-outline btn-sm'><i class='fa fa-pencil-square-o fa-lg'></i></button>";
			bodyPreselect +=		"<button title='Eliminar' id='"+v.id+"' onclick='eliminarSolicitud(this.id);' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button>"
			bodyPreselect +=	"</td>";
			bodyPreselect += "</tr>" ;
			$("#tblPeticion2").append(bodyPreselect);
		})
		$("#loading").hide();
		$('#tbl_Info').DataTable({
			"sPaginationType": "full_numbers" ,
			
			
	});  
		$('#tbl_Info').DataTable({
			"sPaginationType": "full_numbers" ,
			
	}); 

});
}
function cargarxCodTrabajador(){
	
	var codigo = $("#nombreTrabajadorB").val();
	$('#tbl_Info').dataTable().fnClearTable();
	$('#tbl_Info').dataTable().fnDestroy();
	
   
	$("#loading").show();
	$.getJSON("/simpleWeb/json/work/cargarPorCodTrabajadorAsignacionSimple/" + codigo , function(data){
		
	
		var numero = 1;
		$.each(data, function(k, v){
			
			var bodyPreselect = "";
			bodyPreselect += "<tr id='td"+k+"'>";
			bodyPreselect += 	"<td  style='text-align: center;'>"+v.fecha+"</td>";
			bodyPreselect += 	"<td style='text-align: center;'>"+v.codtrabajador+"</td>";
			bodyPreselect += 	"<td style='text-align: left;'>"+v.nombre+" "+v.appaterno+" "+v.appmaterno+"</td>";
			bodyPreselect += 	"<td id='number' style='text-align: center;'>"+String(v.montoingresado).replace(/(.)(?=(\d{3})+$)/g,'$1.')+"</td>";
			bodyPreselect += 	"<td id='"+k+"' style='text-align: center;'>";
			bodyPreselect +=		"<button title='Actualizar' id='"+v.id+"' onclick='editarFicha(this.id);' class='btn btn-circle yellow btn-outline btn-sm'><i class='fa fa-pencil-square-o fa-lg'></i></button>";
			bodyPreselect +=		"<button title='Eliminar' id='"+v.id+"' onclick='eliminarSolicitud(this.id);' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button>"
			bodyPreselect +=	"</td>";
			bodyPreselect += "</tr>" ;
			$("#tblPeticion2").append(bodyPreselect);
		})
		$("#loading").hide();
		$('#tbl_Info').DataTable({
			"sPaginationType": "full_numbers" ,
			
			
	});  
		$('#tbl_Info').DataTable({
			"sPaginationType": "full_numbers" ,
			
	}); 

});
}
function cargarxEmpresa(){
	
	var empresa = $("#SociedadB").val();
	$('#tbl_Info').dataTable().fnClearTable();
	$('#tbl_Info').dataTable().fnDestroy();
	
   
	$("#loading").show();
	$.getJSON("/simpleWeb/json/work/cargarPorEmpresaAsignacionSimple/" + empresa , function(data){
		
	
		var numero = 1;
		$.each(data, function(k, v){
			
			var bodyPreselect = "";
			bodyPreselect += "<tr id='td"+k+"'>";
			bodyPreselect += 	"<td  style='text-align: center;'>"+v.fecha+"</td>";
			bodyPreselect += 	"<td style='text-align: center;'>"+v.codtrabajador+"</td>";
			bodyPreselect += 	"<td style='text-align: left;'>"+v.nombre+" "+v.appaterno+" "+v.appmaterno+"</td>";
			bodyPreselect += 	"<td id='number' style='text-align: center;'>"+String(v.montoingresado).replace(/(.)(?=(\d{3})+$)/g,'$1.')+"</td>";
			bodyPreselect += 	"<td id='"+k+"' style='text-align: center;'>";
			bodyPreselect +=		"<button title='Actualizar' id='"+v.id+"' onclick='editarFicha(this.id);' class='btn btn-circle yellow btn-outline btn-sm'><i class='fa fa-pencil-square-o fa-lg'></i></button>";
			bodyPreselect +=		"<button title='Eliminar' id='"+v.id+"' onclick='eliminarSolicitud(this.id);' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button>"
			bodyPreselect +=	"</td>";
			bodyPreselect += "</tr>" ;
			$("#tblPeticion2").append(bodyPreselect);
		})
		$("#loading").hide();
		$('#tbl_Info').DataTable({
			"sPaginationType": "full_numbers" ,
			
			
	});  
		$('#tbl_Info').DataTable({
			"sPaginationType": "full_numbers" ,
			
	}); 

});
}
function cargarxDivision(){
	
	var division = $("#tipodivisionB").val();
	$('#tbl_Info').dataTable().fnClearTable();
	$('#tbl_Info').dataTable().fnDestroy();
	
   
	$("#loading").show();
	$.getJSON("/simpleWeb/json/work/cargarPorDivisionAsignacionSimple/" + division , function(data){
		

		var numero = 1;
		$.each(data, function(k, v){
			
			var bodyPreselect = "";
			bodyPreselect += "<tr id='td"+k+"'>";
			bodyPreselect += 	"<td  style='text-align: center;'>"+v.fecha+"</td>";
			bodyPreselect += 	"<td style='text-align: center;'>"+v.codtrabajador+"</td>";
			bodyPreselect += 	"<td style='text-align: left;'>"+v.nombre+" "+v.appaterno+" "+v.appmaterno+"</td>";
			bodyPreselect += 	"<td id='number' style='text-align: center;'>"+String(v.montoingresado).replace(/(.)(?=(\d{3})+$)/g,'$1.')+"</td>";
			bodyPreselect += 	"<td id='"+k+"' style='text-align: center;'>";
			bodyPreselect +=		"<button title='Actualizar' id='"+v.id+"' onclick='editarFicha(this.id);' class='btn btn-circle yellow btn-outline btn-sm'><i class='fa fa-pencil-square-o fa-lg'></i></button>";
			bodyPreselect +=		"<button title='Eliminar' id='"+v.id+"' onclick='eliminarSolicitud(this.id);' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button>"
			bodyPreselect +=	"</td>";
			bodyPreselect += "</tr>" ;
			$("#tblPeticion2").append(bodyPreselect);
		})
		$("#loading").hide();
		$('#tbl_Info').DataTable({
			"sPaginationType": "full_numbers" ,
			
			
	});  
		$('#tbl_Info').DataTable({
			"sPaginationType": "full_numbers" ,
			
	}); 

});
}
function cargarxSubDivision(){
	
	var subDivision = $("#tiposubdivisionB").val();
	$('#tbl_Info').dataTable().fnClearTable();
	$('#tbl_Info').dataTable().fnDestroy();
	
   
	$("#loading").show();
	$.getJSON("/simpleWeb/json/work/cargarPorSubDivisionAsignacionSimple/" + subDivision , function(data){
		

		var numero = 1;
		$.each(data, function(k, v){
			
			var bodyPreselect = "";
			bodyPreselect += "<tr id='td"+k+"'>";
			bodyPreselect += 	"<td  style='text-align: center;'>"+v.fecha+"</td>";
			bodyPreselect += 	"<td style='text-align: center;'>"+v.codtrabajador+"</td>";
			bodyPreselect += 	"<td style='text-align: left;'>"+v.nombre+" "+v.appaterno+" "+v.appmaterno+"</td>";
			bodyPreselect += 	"<td id='number' style='text-align: center;'>"+String(v.montoingresado).replace(/(.)(?=(\d{3})+$)/g,'$1.')+"</td>";
			bodyPreselect += 	"<td id='"+k+"' style='text-align: center;'>";
			bodyPreselect +=		"<button title='Actualizar' id='"+v.id+"' onclick='editarFicha(this.id);' class='btn btn-circle yellow btn-outline btn-sm'><i class='fa fa-pencil-square-o fa-lg'></i></button>";
			bodyPreselect +=		"<button title='Eliminar' id='"+v.id+"' onclick='eliminarSolicitud(this.id);' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button>"
			bodyPreselect +=	"</td>";
			bodyPreselect += "</tr>" ;
			$("#tblPeticion2").append(bodyPreselect);
		})
		$("#loading").hide();
		$('#tbl_Info').DataTable({
			"sPaginationType": "full_numbers" ,
			
			
	});  
		$('#tbl_Info').DataTable({
			"sPaginationType": "full_numbers" ,
			
	}); 

});
}
function cargarxGrupo(){
	
	var grupo = $("#listagrupoB").val();
	$('#tbl_Info').dataTable().fnClearTable();
	$('#tbl_Info').dataTable().fnDestroy();
	
   
	$("#loading").show();
	$.getJSON("/simpleWeb/json/work/cargarPorGrupoAsignacionSimple/" + grupo , function(data){
	
		var numero = 1;
		$.each(data, function(k, v){
			
			var bodyPreselect = "";
			bodyPreselect += "<tr id='td"+k+"'>";
			bodyPreselect += 	"<td  style='text-align: center;'>"+v.fecha+"</td>";
			bodyPreselect += 	"<td style='text-align: center;'>"+v.codtrabajador+"</td>";
			bodyPreselect += 	"<td style='text-align: left;'>"+v.nombre+" "+v.appaterno+" "+v.appmaterno+"</td>";
			bodyPreselect += 	"<td id='number' style='text-align: center;'>"+String(v.montoingresado).replace(/(.)(?=(\d{3})+$)/g,'$1.')+"</td>";
			bodyPreselect += 	"<td id='"+k+"' style='text-align: center;'>";
			bodyPreselect +=		"<button title='Actualizar' id='"+v.id+"' onclick='editarFicha(this.id);' class='btn btn-circle yellow btn-outline btn-sm'><i class='fa fa-pencil-square-o fa-lg'></i></button>";
			bodyPreselect +=		"<button title='Eliminar' id='"+v.id+"' onclick='eliminarSolicitud(this.id);' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button>"
			bodyPreselect +=	"</td>";
			bodyPreselect += "</tr>" ;
			$("#tblPeticion2").append(bodyPreselect);
		})
		$("#loading").hide();
		$('#tbl_Info').DataTable({
			"sPaginationType": "full_numbers" ,
			
			
	});  
		$('#tbl_Info').DataTable({
			"sPaginationType": "full_numbers" ,
			
	}); 

});
}
function BuscarAnticipoSimple(){
	var periodo = $("#periodoRemuneracionesB").val();
	
	if(periodo == ''){
		
		periodo = null;
	}else{
		periodo = $("#periodoRemuneracionesB").val().replace(/-/gi, "");;
	}
	
	
	var sociedad = $("#SociedadB").val();
	if(sociedad == ''){
		sociedad = null;
	}else{
		 sociedad = $("#SociedadB").val();
	}
	
	var tipo_division = $("#tipodivisionB").val();
	if(tipo_division == '' || tipo_division == '-1'){
		tipo_division = null;
	}else{
		 tipo_division = $("#tipodivisionB").val();
	}
	
	var tipo_subdivision = $("#tiposubdivisionB").val();
	if(tipo_subdivision == '' || tipo_subdivision == '-1'){
		tipo_subdivision = null;
	}else{
		tipo_subdivision = null;
	}
	
	var grupo = $("#listagrupoB").val();
	if(grupo == '' || grupo == '-1'){
		grupo = null;
	}else{
		 grupo = $("#listagrupoB").val();
	}
	
	var tipo_contrato = $("#tipocontratoSelect").val();
	
	 if(tipo_contrato === "-1"){tipo_contrato = null;}
	    else if(tipo_contrato == ''){
	    	tipo_contrato = null;
		}
		else{
			tipo_contrato = $("#tipocontratoSelect").val();
		}
	

	var fechaPago = $("#fechaPagoB").val();
	if(fechaPago == ''){
		fechaPago = null;
	}else{
		fechaPago = $("#fechaPagoB").val();
	}
	
	var nombre_trabajador = $("#nombreTrabajadorB").val();
	if(nombre_trabajador == '0'){
		nombre_trabajador = null;
	}else{
		nombre_trabajador = $("#nombreTrabajadorB").val();
	}
	
	
	
	
	$('#tbl_Info2').dataTable().fnClearTable();
	$('#tbl_Info2').dataTable().fnDestroy();
	

	$("#loading").show();
	$.getJSON("/simpleWeb/json/work/BuscarAsignacionSimple/" + periodo + "," + fechaPago + ","+nombre_trabajador+","+sociedad+","+tipo_division+","+tipo_subdivision+","+grupo+","+tipo_contrato+"", function(data){
		
     
		var numero = 1;
		$.each(data, function(k, v){
			
			
			
			var bodyPreselect = "";
			bodyPreselect += "<tr id='td"+k+"'>";
			bodyPreselect += 	"<td  style='text-align: center;'>"+v.fecha+"</td>";
			bodyPreselect += 	"<td style='text-align: center;'>"+v.codtrabajador+"</td>";
			bodyPreselect += 	"<td style='text-align: left;'>"+v.appaterno.toUpperCase()+" "+v.appmaterno.toUpperCase()+" "+v.nombre.toUpperCase()+"</td>";
			bodyPreselect += 	"<td id='number' style='text-align: right;'>"+String(v.montoingresado).replace(/(.)(?=(\d{3})+$)/g,'$1.')+"</td>";
			bodyPreselect += 	"<td id='"+k+"' style='text-align: center;'>";
			bodyPreselect +=		"<button title='Modificar' id='"+v.id+"' onclick='editarFicha(this.id);' class='btn btn-circle yellow btn-outline btn-sm'><i class='fa fa-pencil-square-o fa-lg'></i></button>";
			bodyPreselect +=		"<button title='Eliminar' id='"+v.id+"' onclick='eliminarSolicitud(this.id);' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button>"
			bodyPreselect +=	"</td>";
			bodyPreselect += "</tr>" ;
			$("#tblPeticion2").append(bodyPreselect);
		})
		$("#loading").hide();
		$('#tbl_Info2').DataTable({
			"sPaginationType": "full_numbers" ,
			
			
	});  
		$('#tbl_Info2').DataTable({
			"sPaginationType": "full_numbers" ,
			
	}); 

}).fail(function(jqXHR, textStatus, errorThrown) {
//	var r = JSON.stringify(jqXHR);
	
    alerta(errorThrown);
	$("#loading").hide();
})
}
function editarFicha(id){

	$('#ModalUpdate').modal('show');
	
	$
			.getJSON(
					"/simpleWeb/json/work/cargarPopupUpdateasignacionAnticiposIndividuales/"+ id, function(data) {

				
						var numero = 1;
						$.each(data, function(k, v) {
							var str = v.periodo;
							 var res1 = str.toString().substr(0,4);
						     var res2 = str.toString().substr(-2);
						     var res3 = res1+"-"+res2;
						     
							$("#cod_trabUpdate").val(v.codtrabajador);
							$("#nombre_trabUpdate").val(v.nombre+" "+v.appaterno+" "+v.appmaterno);
							$("#periodoRemuneracionesUpdate").val(res3);
							$("#fechaPagoUpdate").val(v.fecha);
							$('#SociedadUpdate option[value='+v.empresa+']').attr('selected','selected');
//							$('#tipodivisionUpdate option[value='+v.division+']').attr('selected','selected');
//							$('#tiposubdivisionUpdate option[value='+v.subDivision+']').attr('selected','selected');
//							$('#listagrupoUpdate option[value='+v.grupo+']').attr('selected','selected');
//							$('#listasubgrupoUpdate option[value='+v.subgrupo+']').attr('selected','selected');
							$("#montoTrabajadorUpdate").val(v.montoingresado);
							$('.idupdate').attr('id', v.id);

						})

					}).done(function() {
				$("#loading").hide();
			}).fail(function(jqXHR, textStatus, errorThrown) {
				
			    alerta(errorThrown);
				$("#loading").hide();
			})
	
	
}

function actualizarTrabajador(id){
	
	var cod = $("#cod_trabUpdate").val();
	var nombre = $("#nombre_trabUpdate").val();
	var periodo_u = $("#periodoRemuneracionesUpdate").val().replace(/-/gi, "");;
	var tipoPago_u = $('#TipodePagoUpdate').val();
	var fecha_u = $("#fechaPagoUpdate").val();
	var empresa_u = $('#SociedadUpdate').val();
//	var division_u = $('#tipodivisionUpdate').val();
//	var subdivision_u = $('#tiposubdivisionUpdate').val();
//	var grupo_u = $('#listagrupoUpdate').val();
//	var subgrupo_u = $('#listasubgrupoUpdate').val();
	var monto = $("#montoTrabajadorUpdate").val();
	
	var montoN2 = monto.toString().replace(/\./g, '');
	montoN2 = montoN2.toString().replace(/\,/g, '');
	var id_u = id; 
	
		var row = {

			periodo : periodo_u,
			fecha :fecha_u,
			montoingresado : montoN2,
			id : id_u
		
	}
	$.ajax({
		url : "/simpleWeb/json/work/UpdateAnticiposIndividuales/",
		type : "PUT",
		data : JSON.stringify(row),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
			$("#loading").show();

		},
		success : function(data, textStatus, jqXHR) {
			
			$('#ModalUpdate').modal('toggle');
			alerta("Actualizado con Exito");
			$('#tbl_Info').dataTable().fnClearTable();
			$('#tbl_Info').dataTable().fnDestroy();
			
		
			BuscarAnticipoSimple();
			
			$("#loading").hide();

		}
	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})
}

function ingresar(){
	$('#modalIngresar').modal('show');
	
	 $("#nombreTrabajador").select2({


     }).on('select2:open',function(){

         $(".select2-container--open").css("z-index", "9999999");
        

     });

	 $(".select2-selection").addClass("form-control btn-circle btn-sm mayusculasWork")
}

function segundoPopup(){
	
	$('.swal2-container').css('z-index', '15000');
	
}

function eliminarSolicitud(id){
	
	 var popupCierre = "";

	
	 popupCierre +='<div class="col-sm-12 col-md-12">';
	 popupCierre +=          "<div class='btn btn-circle green btn-outline'  onclick='enviarEliminar("+id+");'><i class='fa fa-clock-o'></i> Confirmar</div>";
	 popupCierre +=          "<div class='btn btn-circle red btn-outline' onclick='closeModal2();'> Cancelar</div>";
	 popupCierre +='</div>';

	    popUp("Esta Seguro de Eliminar", popupCierre, true, "400px", true);
}

function enviarEliminar(id) {

	var row = {
		id : id

	}
	$.ajax({
		url : "/simpleWeb/json/work/EliminarAnticipoSimple/",
		type : "PUT",
		data : JSON.stringify(row),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success : function(data, textStatus, jqXHR) {
			closeModal();
			alerta("Eliminado con Exito")
			$('#tbl_Info').dataTable().fnClearTable();
			$('#tbl_Info').dataTable().fnDestroy();
			
			BuscarAnticipoSimple();
		}

	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})

}

$("#tipodivision").change(function(){
	
	  var valor = $("#tipodivision").val();
	  var soc = $("#Sociedad").val();
		
		if(valor === ''){return;}
		else if(soc === '-1'){alerta("Debe Seleccionar una Empresa Antes de Filtrar");var valor = $("#tipodivision").val("-1");$('.swal2-container').css('z-index', '15000'); return;}

	
		 
		
		lodtrab();
		
		
	});

$("#tiposubdivision").change(function(){
	
	  var valor = $("#tiposubdivision").val();
	  var soc = $("#Sociedad").val();
		
		if(valor === ''){return;}
		else if(soc === '-1'){alerta("Debe Seleccionar una Empresa Antes de Filtrar");var valor = $("#tiposubdivision").val("-1");$('.swal2-container').css('z-index', '15000'); return;}

	
		 
		
		lodtrab();
		
	});
$("#listagrupo").change(function(){
	
	  var valor = $("#listagrupo").val();
	  var soc = $("#Sociedad").val();
		
		if(valor === ''){return;}
		else if(soc === '-1'){alerta("Debe Seleccionar una Empresa Antes de Filtrar");var valor = $("#listagrupo").val("-1");$('.swal2-container').css('z-index', '15000'); return;}

	
		 
		
		lodtrab();
		
	});
$("#listasubgrupo").change(function(){
	
	  var valor = $("#listasubgrupo").val();
	  var soc = $("#Sociedad").val();
		
		if(valor === ''){return;}
		else if(soc === '-1'){alerta("Debe Seleccionar una Empresa Antes de Filtrar");var valor = $("#listasubgrupo").val("-1");$('.swal2-container').css('z-index', '15000'); return;}

	
		 
		
		lodtrab();
		
	});

function buscarIdContrato(){
	
		
		$("#idContrato").empty();
		var codt = $('#nombreTrabajador').val();
		$("#loading").show();
		$.getJSON(
				"/simpleWeb/json/work/LoadSelectIdContrato/" + codt,
				function(data) {
					
                 cantidadData = data.length;
                 
                 if(cantidadData > 1){
                	 $("#idContrato").prop("disabled", false);
                	 var SelectIdContrato = "";
						SelectIdContrato += "<option value='-1'>Seleccione..</option>";

						$("#idContrato").append(SelectIdContrato);
						$.each(data, function(k, v) {

						var SelectIdContrato = "";
						SelectIdContrato += "<option value=" + v.id+ ">"
								+ v.fecha_inicio_actividad + "</option>";

						$("#idContrato").append(SelectIdContrato);

					});
                 }else if(cantidadData == 1){
                	 $("#idContrato").prop("disabled", true);
					
						$.each(data, function(k, v) {

						var SelectIdContrato = "";
						SelectIdContrato += "<option value=" + v.id+ ">"
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
}


function closeModal2(){
	
	$("#tblPeticion").empty();
	$("#periodoRemuneraciones").val("");
	$("#totalMonto").empty();
	$("#totalMonto").append("0");
	$("#fechaPago").val("");
	$("#Sociedad").val(-1);
	$("#tipodivision").val(-1);
	$("#tipodivision").val(-1);
	$("#listagrupo").val(-1);
	$("#listasubgrupo").val(-1);
	$("#nombreTrabajador").empty();
	$("#montoTrabajador").val("");
	$("#idContrato").empty();
	estadoAddAll = 0

	Array_total_monto = [];
	Array_numero_fila = [];
	numero = 0;

	var table = $('#tbl_InfoPopup').DataTable();

	table.clear().draw();
}
$("#modalIngresar .close").click(function(){
	
	$("#tblPeticion").empty();
	$("#periodoRemuneraciones").val("");
	$("#totalMonto").empty();
	$("#totalMonto").append("0");
	$("#fechaPago").val("");
	$("#Sociedad").val(-1);
	$("#tipodivision").val(-1);
	$("#tipodivision").val(-1);
	$("#listagrupo").val(-1);
	$("#listasubgrupo").val(-1);
	$("#nombreTrabajador").empty();
	$("#montoTrabajador").val("");
	$("#idContrato").empty();
	estadoAddAll = 0

	Array_total_monto = [];
	Array_numero_fila = [];
	numero = 0;

	var table = $('#tbl_InfoPopup').DataTable();

	table.clear().draw();

	

	
           
    
});


function addAll() {
	
	
	if(estadoAddAll == 1){
		
		alerta("No Puede Añadir Nuevamente Todos los Trabajadores a la Lista");
        $('.swal2-container').css('z-index', '15000');
        return;
	}
	

	    $('#tblPeticion').empty();

	

	var codigoTrabajador = $("#nombreTrabajador").val();

        var sociedad = $("#Sociedad").val();
        var periodo = $("#periodoRemuneraciones").val();
        var fechaDePago = $("#fechaPago").val();
        var monto = $("#montoTrabajador").val();
        
        if (sociedad == '-1') {
            alerta("Debe Selecionar una Empresa");
            $('.swal2-container').css('z-index', '15000');
            $("#Sociedad").focus();
            return;
        }
        else if (periodo == '') {
            alerta("Debe Ingresar un Periodo");
            $("#Sociedad").focus();
            $('.swal2-container').css('z-index', '15000');
            return;
        } else if (fechaDePago == '') {
            alerta("Debe Ingresar una Fecha de Pago");
            $("#fechaPago").focus();
            $('.swal2-container').css('z-index', '15000');
            return;
        } else if (monto == '') {
            alerta("Debe Ingresar un Monto");
            $("#montoTrabajador").focus();
            $('.swal2-container').css('z-index', '15000');
            return;
        }

        var data = $('#nombreTrabajador').select2('data')
        var nombretrabajador3 = data[0].text;
        var nombretrabajador = nombretrabajador3.split('|');
        
        var options = $('#nombreTrabajador option');

		var values = $.map(options, function(option) {
			return option.value;
		});
       
        
        var codidos_trabajador;
        var codTrab = [];
        
        for (var i = 0; i < values.length; i++) {

            if (values[i] == "0") {


            } else {
                codidos_trabajador += "," + values[i];
                codTrab.push(values[i]);
            }
           

        }
        
        var nombreTrab = [];$("#nombreTrabajador option").each(function () {
        	   var $this = $(this);
        	   if ($this.length) {
        	    var selText = $this.text().split('|');if(selText[1] == null){}else{nombreTrab.push(selText[1])}
        	    
        	   
        	  }
        	});
       
        for (var i = 0; i < codTrab.length; i++) {
        
            var montoN2 = monto.toString().replace(/\./g, '');
			var datos = {
				fila : numero,
				monto : montoN2
				
				

			}
			
			Array_total_monto.push(datos);
			
            console.log(datos);    
        	   
    
			
            var codtr = codTrab[i];

            
             
           
              
                    $
                        .ajax({
                            type: "GET",
                            url: "/simpleWeb/json/work/LoadSelectIdContrato/" + codtr,
                            
                            async: false,
                            dataType: "JSON",
                            beforeSend: function() {
                                $("#loading").hide();
                            },
                            success: function(data) {
                            	
                            	$("#loading").show();
                                $("#loading").css('z-index', '15000');

                                cantidadData = data.length;
                                if (cantidadData > 1) {
                                   
                                    var SelectIdContrato = "";
                                    SelectIdContrato += "<option value='-1'>Seleccione..</option>";
                                    
                                    $.each(data,
                                            function(k,v) {
                                         
                                                var SelectIdContrato = "";
                                                SelectIdContrato += "<option value=" + v.id + ">" + v.fecha_inicio_actividad + "</option>";
 
                                            })
                                            
                                            var table = $('#tbl_InfoPopup').DataTable();
                                    table.row.add( [
                                                    "<td class='tdperiodo'  style='text-align: center;'>"+periodo+"</td>",
                                                    "<td class='tdFechaPago'  style='text-align: center;'>"+fechaDePago+"</td>",
                                                    "<td class='tdCodTrabajador'  style='text-align: center;'>"+ codTrab[i] + "</td>",
                                        			"<td class='tdNombreTrabajador'  style='text-align: center;'>"+nombreTrab[i]+"</td>",
                                        			"<td class='tdIdContrato'><select id='idContrato"+numero+"'class='form-control btn-circle btn-sm mayusculasWork' disabled>"+SelectIdContrato+"</select></td>",
                                        			"<td class='tdMontoIngresado'  style='text-align: center;'>"+monto+"</td>",
                                        			"<td class='tdcodNew'  style='text-align: center;'><button id=td"+ i+"  onclick='javascript: eliminarFila(this.id);'title='Eliminar' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button></td>",
                                        			"<td>"+sociedad+"</td>"
                                        		] ).node().id = "td"+numero;
                                        		table.draw();
                                
                                }
                                
                                else if (cantidadData == 1) {
                                	var SelectIdContrato = "";
                                	 $.each(data,function(k,v) {
                                		 
                                         SelectIdContrato += "<option value=" + v.id +">" + v.fecha_inicio_actividad + "</option>";
//                                       
                                     
                                	 })
                                	 console.log(SelectIdContrato);
                                	var table = $('#tbl_InfoPopup').DataTable();
                                    table.row.add( [
                                                    "<td class='tdperiodo'  style='text-align: center;'>"+periodo+"</td>",
                                                    "<td class='tdFechaPago'  style='text-align: center;'>"+fechaDePago+"</td>",
                                                    "<td class='tdCodTrabajador'  style='text-align: center;'>"+ codTrab[i] + "</td>",
                                        			"<td class='tdNombreTrabajador'  style='text-align: center;'>"+nombreTrab[i]+"</td>",
                                        			"<td class='tdIdContrato'><select id='idContrato"+numero+"'class='form-control btn-circle btn-sm mayusculasWork' disabled>"+SelectIdContrato+"</select></td>",
                                        			"<td class='tdMontoIngresado'  style='text-align: center;'>"+monto+"</td>",
                                        			"<td class='tdcodNew'  style='text-align: center;'><button id=td"+numero+"  onclick='javascript: eliminarFila(this.id);'title='Eliminar' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button></td>",
                                        			"<td>"+sociedad+"</td>"
                                        		] ).node().id = "td"+numero;
                                        		table.draw();
                                	
                                        		
                                	
                                	
                                }
                                
                                else if (cantidadData == 0) {
                                    $("#idContrato" + numero)
                                        .prop("disabled",
                                            true);
                                }
                               
                                estadoAddAll = 1;

                            }
                        }).done(function() {
                        	
                        	 $("#loading").hide();
                        	
                        		   
                        		

                        })
                        .fail(function(jqXHR, textStatus, errorThrown) {

                            alerta(errorThrown);
                            $("#loading").hide();

                        })

                  
//                }, 50);


    		numero = numero + 1;
    		
    		

        }

        var total = 0;
		for (var i = 0; i < Array_total_monto.length; i++) {
         
			total = parseInt(Array_total_monto[i].monto) + total;
		}
		
		 total = String(total).replace(/(.)(?=(\d{3})+$)/g, '$1.')

		$("#totalMonto").empty();
		$("#totalMonto").append(total);

       
   
    

}

$("#tipodivisionB").change(function(){
	
	
	
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
		console.log(data);
//		zona_sap = JSON.stringify(data.sociedad);
	
		
	}).done(function() {
		
		$("#loading").hide();
		
	});
	BuscarAnticipoSimple();

});

$("#tiposubdivisionB").change(function(){ 
	$("#listagrupoB").empty();
	var valor_zona = $("#tiposubdivisionB").val();
	
	if(valor_zona == "" || valor_zona == ""){
		alerta("Debe Seleccionar una Zona");$("#tiposubdivisionB").focus();
		return;
	}
	
	var soci_sap = "";
	$("#loading").show();
	$.getJSON("/simpleWeb/json/work/getSociedadById/"+$('#SociedadB').val()+"" , function(data){
        
		soci_sap = JSON.stringify(data.sociedad);
	
		
	}).done(function() {
		
		var CECOAgrupacion;

        $.each(SESION.campo, function(key, value){

              if(value.campo == $('#tipodivisionB').val()){

                    CECOAgrupacion = value.cecos;
              }
        });
 
        
		var soci_sapFinal  = soci_sap.replace(/\"/g, '');
		$.getJSON("http://200.55.206.140/SCLEM/JSON_BAPI_COSTCENTER_GETLIST1.aspx?SOCIEDAD="+$('#SociedadB').val()+"&GRUPO="+valor_zona+"&CECO="+CECOAgrupacion , function(data){
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
	
	BuscarAnticipoSimple();
	
});
$("#listagrupoB").change(function(){ 
	BuscarAnticipoSimple();
});

function ListaTipoContrato(){
	
	$.getJSON("/simpleWeb/json/work/ListaTipoContrato/", function(data){
	
		$.each(data, function(k, v){
			var SelectTipoContrato = "";
	
			SelectTipoContrato += 	"<option value="+v.llave+">"+v.descripcion+"</option>";
			
			$("#tipocontratoSelect").append(SelectTipoContrato);
			
			
		})
});
}
