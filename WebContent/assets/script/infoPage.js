var dataTable = $('#tbl_Info').DataTable({
	"sPaginationType": "full_numbers" ,
	"filter": false
	
});
$(document).ready(function(){
	$("#dataHuerto").trigger("change");
	add();
	var selectHuerto = "<option value='0'>Todos</option>";
	$.each(SESION.campo, function(ks,va){
		selectHuerto += "<option value='"+va.campo+"'>"+va.descripcion+"</option>";
	})
	$("#dataHuerto").html(selectHuerto);
	$("#loading").hide();
	console.log(CUARTEL)
}); 
$("#variedadFilter").html(variedadFilter);
 
$('#dataHuerto').change(function(){
	var campo = $(this).val();
	var sectorFilter = "<option value='0'>Todos</option>";
	$.each(SESION.sector, function(k,v){
		if(campo == null || campo == 0 || campo.indexOf(v.campo) != -1) {
			sectorFilter += "<option value='"+v.sector+"'>"+v.descripcion+"</option>";
		}
	})
	$("#sectorFilter").html(sectorFilter);
});
$('#sectorFilter').change(function(){
	var especieFilter = "<option value='0'>Todos</option>";
	var arrayEspecie = [];
	$.each(CUARTEL, function(k,v){
		if(arrayEspecie.indexOf(v.especie) == -1){
			especieFilter += "<option value='"+v.especie+"'>"+v.nespecie+"</option>";
			arrayEspecie.push(v.especie);
		}
	})
	$("#especieFilter").html(especieFilter);
});

$('#especieFilter').change(function(){
	var variedadFilter = "<option value='0'>Todos</option>";
	var arrayVariedad = [];
	$.each(CUARTEL, function(k,v){
		if(arrayVariedad.indexOf(v.variedad) == -1){
			variedadFilter += "<option value='"+v.variedad+"'>"+v.nvariedad+"</option>";
			arrayVariedad.push(v.variedad);
		}
	})
	$("#variedadFilter").html(variedadFilter);
});

var especie;
var variedad;
var SESION;
var detalleCuartel;
var bloqueo = false; // variable para comprobar si hay una actividad por parte del usuario (al modificar).
var CECO = getCeco();
var exportTabla = [];
var tablaInfoPage = $("#ignore").html();

function LimpiarTabla() {
	$("#ignore").html("");
	$("#ignore").html(tablaInfoPage);
	$('#tblInfo').html("");
}

function pdf(){
	var tab= $('#tbl_Info').val();
	var doc = new jsPDF();
	doc.text(20, 20, tab);
	doc.save('Mapeo.pdf');
}
var detalleCuartel = [];
$.ajax({
	url: "/simpleWeb/json/AGRO/GETCUARTEL/",
	type:	"GET",
	dataType: 'json',
	async: false,
	success: function(data){
		detalleCuartel = data;	
	}
});



function loadInfo(){
	loading.show();
	setTimeout(function(){
	var campo = $("#dataHuerto").val();
	var sector = $("#sectorFilter").val();
	var especie = $("#especieFilter").val();
	var variedad = $("#variedadFilter").val();
	exportTabla = [];
	//$('#tblInfo').html("");
	dataTable.clear().draw();
	
	
	$.each(CUARTEL, function(k,v){
		var geo = '';
		
		if(v.georeferencia == '' || v.georeferencia == null){
			geo = 'NO';
		} else {
			geo = 'SI';
		}
		
		if(v.formacion == 0 || v.formacion == null){
			v.nformacion = "";
		}
		if(v.tipo_planta == 0 || v.tipo_planta == null){
			v.ntipo_planta = "";
		}
		if(v.tipo_control_heladas == 0 || v.tipo_control_heladas == null){
			v.ntipo_control_heladas = "";
		}
		if(v.tipo_proteccion == 0 || v.tipo_proteccion == null){
			v.ntipo_proteccion = "";
		}
		if(v.limitante_suelo == 0 || v.limitante_suelo == null){
			v.nlimitante_suelo = "";
		}
		if(v.polinizante == 0 || v.polinizante == null){
			v.polinizante = "";
		}
		if(v.tipo_plantacion == 0 || v.tipo_plantacion == null){
			v.ntipo_plantacion = "";
		}
		if(campo == null || campo == 0 || campo.indexOf(v.campo) != -1) {
			var sociedad = '';
			var grupo = '';
			$.each(SESION.campo, function(kc, vc){
				if(vc.campo == v.campo){
					sociedad = vc.sociedad;
					grupo = vc.grupo;
				}
			})
		if(sector == null || sector == 0 || sector.indexOf(v.sector) != -1) {
		if(especie == null || especie == 0 || especie.indexOf(v.especie+"") != -1) {
		if(variedad == null || variedad == 0 || variedad.indexOf(v.variedad+"") != -1) {
			var tbl = [];
			tbl[0] = 		"<input type='text' class='form-control input-sm' id='descripcion"+v.codigo+"' value='"+v.descripcion+"'disabled>";
			tbl[1] = 		"<input type='text' class='form-control input-sm' id='especie"+v.codigo+"' value='"+v.nespecie+"' disabled>";
			tbl[2] = 		"<input type='text' class='form-control input-sm' id='variedad"+v.codigo+"' value='"+v.nvariedad+"' disabled>";
			tbl[3] = 		"<input type='text' class='form-control input-sm' id='nombre"+v.codigo+"' value='"+v.nombre+"' disabled>";
			tbl[4] =		"<input type='text' class='form-control input-sm' id='zona"+v.codigo+"' value='"+v.zona+"' disabled>";
			tbl[5] = 		"<input type='text' onkeypress='return justNumbers(event);' class='form-control input-sm' id='superficie"+v.codigo+"' value='"+formatNumber(v.superficie)+"' disabled>";
			tbl[6] = 		"<input type='number' onkeypress='return justNumbers(event);' class='form-control input-sm' id='plantas"+v.codigo+"' value='"+v.plantas+"' disabled>";
			tbl[7] = 		"<input type='text' class='form-control input-sm' id='tipo_planta"+v.codigo+"' value='"+v.ntipo_planta+"' disabled>";
			tbl[8] = 		"<input type='text' class='form-control input-sm' id='patron"+v.codigo+"' value='"+v.patron+"' disabled>";
			tbl[9] = 		"<input type='number' onkeypress='return justNumbers(event);' class='form-control input-sm' id='distancia_hancho"+v.codigo+"' value='"+v.distancia_hancho+"' disabled>";
			tbl[10] = 		"<input type='number' onkeypress='return justNumbers(event);' class='form-control input-sm' id='distancia_largo"+v.codigo+"' value='"+v.distancia_largo+"' disabled>";
			tbl[11] = 		"<input type='text' class='form-control input-sm' id='formacion"+v.codigo+"' value='"+v.nformacion+"' disabled>";
			tbl[12] = 		"<input type='text' class='form-control input-sm' id='vivero"+v.codigo+"' value='"+v.vivero+"' disabled>";
			tbl[13] = 		"<input type='text' class='form-control input-sm' id='tipo_control_heladas"+v.codigo+"' value='"+v.ntipo_control_heladas+"' disabled>";
			tbl[14] = 		"<input type='text' class='form-control input-sm' id='tipo_proteccion"+v.codigo+"' value='"+v.ntipo_proteccion+"' disabled>";
			tbl[15] = 		"<input type='text' class='form-control input-sm' id='limite_suelo"+v.codigo+"' value='"+v.nlimitante_suelo+"' disabled>";
			tbl[16] = 		"<input type='text' onkeypress='return justNumbers(event);' class='form-control input-sm' id='polinizante"+v.codigo+"' value='"+v.polinizante+"' disabled>";
			tbl[17] = 		"<input type='text' class='form-control input-sm' id='tipo_plantacion"+v.codigo+"' value='"+v.ntipo_plantacion+"' disabled>";
			tbl[18] = 		"<input type='text' class='form-control input-sm' id='clon"+v.codigo+"' value='"+v.clon+"' disabled>";
			tbl[19] = 		"<input type='text' onkeypress='return justNumbers(event);' class='form-control input-sm' id='ano_plantacion"+v.codigo+"' value='"+v.ano_plantacion+"' disabled>";
			var estado = '';	
			if(v.estado == 1){
				tbl[20] = 		"<select type='text' id='ceco"+v.codigo+"' class='form-control' disabled>"+loadCeco(sociedad, grupo,v.ceco)+"</select>";		
				tbl[21] =		"<select id='estado"+v.codigo+"' class='form-control input-sm' disabled>";
				tbl[21] +=			"<option value='1' selected>Productivo</option>";
				tbl[21] +=			"<option value='2'>No Productivo</option>";
				tbl[21] +=			"</select>";
				estado = 'Productivo';
			} else {
				tbl[20] = 		"<select type='text' id='ceco"+v.codigo+"' class='form-control' disabled>"+loadCeo(v.ordenco)+"</select>";		
				tbl[21] =		"<select id='estado"+v.codigo+"' class='form-control input-sm' disabled>";
				tbl[21] +=			"<option value='1'>Productivo</option>";
				tbl[21] +=			"<option value='2' selected>No Productivo</option>";
				tbl[21] +=			"</select>";
				estado = 'No Productivo';
			}	
			//tbl[22] =		"<div class='dropdown dropleft' style='float: left;'>";
			//tbl[22] +=			"<button class='btn btn-circle yellow btn-outline btn-sm dropdown-toggle' title='Editar' id='bt_editar"+v.codigo+"' onclick='javascript: BT_Editar("+ v.codigo+ ")' type='button' data-toggle='dropdown'>";
			//tbl[22] +=			"<span class='fa fa-pencil-square-o fa-lg'></span></button>";
			//tbl[22] += 		"<a title='Guardar' id='bt_guardar"+v.codigo+"' onclick='javascript: BT_Guardar("+ v.codigo+ ")'  style='display: none;' class='btn btn-circle green btn-outline icon-cloud-upload'></a>";
			//tbl[22] +=		"</div>";
			var rowNode = dataTable
		    .row.add( tbl )
		    .draw()
		    .node();
			//$("#ceco"+v.codigo).val(v.ceco);
			//$('#estado'+v.codigo).val(v.estado);
			if(v.ordenco == null){
				v.ordenco = "";
			}
			if(v.macroco == null){
				v.macroco = "";
			}
			var json = {
				"Nombre Sector": v.descripcion,
				"Especie": v.nespecie,
				"Variedad": v.nvariedad,
				"Cuartel": v.nombre,
				"Zona":v.zona,
				"Superficie": formatNumber(v.superficie),
				"Plantas": v.plantas,
				"Tipo Planta": v.ntipo_planta,
				"Patron":v.patron,
				"Entre Hileras":v.distancia_hancho,
				"Sobre Hileras":v.distancia_largo,					
				"Formacion":v.nformacion,
				"Vivero":v.vivero,
				"Tipo Control Heladas":v.ntipo_control_heladas,
				"Tipo Proteccion":v.ntipo_proteccion,
				"Limitante Suelo":v.nlimitante_suelo,
				"Polinizante":v.polinizante,
				"Tipo Plantacion":v.ntipo_plantacion,
				"Clon":v.clon,
				"Año Plantacion":v.ano_plantacion,
				"Macro del Proyecto": v.macroco,
				"Ceco":v.ceco,
				"OrdenCo": v.ordenco,
				"Estado":estado,
				"Georreferencia" : geo
			}
			exportTabla.push(json);
		}}}}
	})

	loading.hide();
	}, 50);
}
	

function loadCeco(sociedad, grupo,ceco){
	var url = IPSERVERSAP+"JSON_BAPI_COSTCENTER_GETLIST1.aspx?SOCIEDAD="+sociedad+"&GRUPO="+grupo;
	$.ajax({
		url: url,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			CECOARR = data;
			var arrCeco = [];
			$.each(CUARTEL, function(k,v){
				arrCeco.push(v.ceco);
			})
			CECO = "<option value='' >Seleccione</option>";
			$.each(data.COSTCENTERLIST, function(k,v){
				if(ceco == v.COSTCENTER) {
					CECO += "<option value="+v.COSTCENTER+" selected>"+v.DESCRIPT+"</option>";
				} else {
					CECO += "<option value="+v.COSTCENTER+">"+v.DESCRIPT+"</option>";
				}
					
			})
		}
	})
	return CECO;
}




function loadCeo(ceo){
	var url = IPSERVERSAP+"SON_BAPI_INTERNALORDER_GETLIST.aspx?TIPO=Z600";
	var CEO = "<option value='' >Seleccione</option>";
	$.ajax({
		url: url,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			$.each(data.ORDER_LIST, function(k,v){
				if(ceo == v.OBJECT_NO) {
					CEO += "<option value="+v.OBJECT_NO+" selected>"+v.ORDER_NAME+"</option>";
				} else {
					CEO += "<option value="+v.OBJECT_NO+">"+v.ORDER_NAME+"</option>";
				}
					
			})
		}
	})
	return CEO;
}


function BT_Editar(codigo){
	
	if(bloqueo == false){	
//		var disabl = $(".disa"+codigo);
//		for(var i = 0; i < disabl.length; i++){
//			$(disabl[i]).prop("disabled", false);
//		}
		$('#bt_guardar'+codigo).show();
		$('#bt_editar'+codigo).hide();
		
//		PONGO LOS TEXTBOX HABILIDATOS
		$("#superficie"+codigo).prop("disabled", false);
		$("#plantas"+codigo).prop("disabled", false);
		$("#tipo_planta"+codigo).prop("disabled", false);
		$("#patron"+codigo).prop("disabled", false);
		$("#distancia_largo"+codigo).prop("disabled", false);
		$("#distancia_hancho"+codigo).prop("disabled", false);
		$("#formacion"+codigo).prop("disabled", false);
		$("#vivero"+codigo).prop("disabled", false);
		$("#tipo_control_heladas"+codigo).prop("disabled", false);
		$("#tipo_proteccion"+codigo).prop("disabled", false);
		$("#limite_suelo"+codigo).prop("disabled", false);
		$("#polinizante"+codigo).prop("disabled", false);
		$("#tipo_plantacion"+codigo).prop("disabled", false);
		$("#tipo_plantacion").prop("disabled", false);
		$("#clon"+codigo).prop("disabled", false);
		$("#ano_plantacion"+codigo).prop("disabled", false);
		$("#ceco"+codigo).prop("disabled", false);	
		$('#estado'+codigo).prop("disabled",false);
		bloqueo = true;
	}else{
		alerta("Termine de Modificar, antes de iniciar otra modificaciÃ³n.")
		return;
	}
}

function BT_Guardar(codigo){
		$('#bt_editar'+codigo).show();
		$('#bt_guardar'+codigo).hide();
		
//		PONGO LOS TEXTBOX DESABILIDATOS
		$("#superficie"+codigo).prop("disabled", true);
		$("#plantas"+codigo).prop("disabled", true);
		$("#tipo_planta"+codigo).prop("disabled", true);
		$("#patron"+codigo).prop("disabled", true);
		$("#distancia_largo"+codigo).prop("disabled", true);
		$("#distancia_hancho"+codigo).prop("disabled", true);
		$("#formacion"+codigo).prop("disabled", true);
		$("#vivero"+codigo).prop("disabled", true);
		$("#tipo_control_heladas"+codigo).prop("disabled", true);
		$("#tipo_proteccion"+codigo).prop("disabled", true);
		$("#limite_suelo"+codigo).prop("disabled", true);
		$("#polinizante"+codigo).prop("disabled", true);
		$("#tipo_plantacion"+codigo).prop("disabled", true);
		$("#tipo_plantacion").prop("disabled", true);
		$("#clon"+codigo).prop("disabled", true);
		$("#ano_plantacion"+codigo).prop("disabled", true);
		$("#ceco"+codigo).prop("disabled", true);
		$("#estado"+codigo).prop("disabled",true);
		Modificar(codigo);
		bloqueo = false;
}



//function Guardar() {
function Modificar(codigo){
	var descripc = {
			codigo : codigo,
			superficie : $("#superficie"+codigo).val(),
			plantas : $("#plantas"+codigo).val(),
			tipo_planta : $("#tipo_planta"+codigo).val(),
			patron : $("#patron"+codigo).val(),
			distancia_largo : $("#distancia_largo"+codigo).val(),
			distancia_hancho : $("#distancia_hancho"+codigo).val(),
			formacion : $("#formacion"+codigo).val(),
			vivero : $("#vivero"+codigo).val(),
			tipo_control_heladas : $("#tipo_control_heladas"+codigo).val(),
			tipo_proteccion : $("#tipo_proteccion"+codigo).val(),
			limitante_suelo : $("#limite_suelo"+codigo).val(),
			polinizante : $("#polinizante"+codigo).val(),
			tipo_plantacion : $("#tipo_plantacion"+codigo).val(),
			clon : $("#clon"+codigo).val(),
			ano_plantacion : $("#ano_plantacion"+codigo).val(),
			ceco : $("#ceco"+codigo).val(),
			estado:$("#estado"+codigo).val()
		}	
		$.ajax({
			url : "/simpleWeb/json/AGRO/UP_CUARTEL/",
			type : "PUT",
			data : JSON.stringify(descripc),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
				alerta("Datos Guardados Satisfactoriamente");	
				return;
				$('#tblInfo').html("");
				loadInfo();
			}
		})	
	$("#loading").hide();
}

//
//function cambioCampo(campo){
//	var campo = $("#dataHuerto").val();
//	var sectorFilter = "<option value='0'>Todos</option>";
//	$.each(SESION.sector, function(k,v){
//		if(!campo || campo == 0){
//			sectorFilter += "<option value='"+v.sector+"'>"+v.descripcion+"</option>";
//		}else{
//			for(var i = 0; i < campo.length; i++){
//				if(campo[i] == v.campo){
//					sectorFilter += "<option value='"+v.sector+"'>"+v.descripcion+"</option>";
//				}
//			}
//		}
//	})
//	$("#sectorFilter").html(sectorFilter);
//	filterTable();
//}

function cambioEspecie(especie){
	var especie = $("#especieFilter").val();
	var variedadFilter = "<option value='0'>Todos</option>";
	$.each(SESION.variedad, function(k,v){
		if(!especie || especie == 0){
			variedadFilter += "<option value='"+v.codigo+"'>"+v.variedad+"</option>";
		}else{
			for(var i = 0; i < especie.length; i++){
				if(especie[i] == v.especie){
					variedadFilter += "<option value='"+v.codigo+"'>"+v.variedad+"</option>";
				}
			}
		}
	})
	$("#variedadFilter").html(variedadFilter);
	filterTable();
}
var table = [];
function filterTable(){
	table = [];
	$('#tblInfo').html("");
	var campo = $("#dataHuerto").val();
	if(!campo){campo=0}
	var sector = $("#sectorFilter").val();
	if(!sector){sector=0}
	var especie = $("#especieFilter").val();
	if(!especie){especie=0}
	var variedad = $("#variedadFilter").val();
	if(!variedad){variedad=0}
	$.each(detalleCuartel, function(k,v){
		if(especie == 0 && campo == 0 && sector == 0 && variedad == 0){
			llenarTabla(v);
			Mostrar_Excel();
		}else{
			for(var i = 0; i < especie.length; i++){
				if(especie[i] != 0 && especie[i] == v.especie){
					llenarTabla(v);
					Mostrar_Excel();
				}else {
					Ocultar_Excel();
				}
			}
			for(var i = 0; i < variedad.length; i++){
				if(variedad[i] != 0 && variedad[i] == v.variedad){
					llenarTabla(v);
					Mostrar_Excel();
				}else{
					Ocultar_Excel();
				}
			}
			for(var i = 0; i < campo.length; i++){
				if(campo[i] != 0 && campo[i] == v.campo){
					llenarTabla(v);
					Mostrar_Excel();					
				}else{
//					Ocultar_Excel();
				}
			}
			for(var i = 0; i < sector.length; i++){
				if(sector[i] != 0 && sector[i] == v.sector){
					llenarTabla(v);
					Mostrar_Excel();
				}else{
					Ocultar_Excel();
				}
			}			
		}
	})
}


function llenarTabla(v){
	$('#tblInfo').html("");
	if(table.length != 0){
		$.each(table, function(ka,va){
			if(table.indexOf(v)==-1){
				table.push(v);
			}
		})
	}else{
		table.push(v);
	}
	var sociedad = '';
	var grupo = '';
	$.each(SESION.campo, function(kc, vc){
		if(vc.campo == v.campo){
			sociedad = vc.sociedad;
			grupo = vc.grupo;
		}
	})
	
	if(v.formacion == 0 || v.formacion == null){
		v.nformacion = "";
	}
	if(v.tipo_planta == 0 || v.tipo_planta == null){
		v.ntipo_planta = "";
	}
	if(v.tipo_control_heladas == 0 || v.tipo_control_heladas == null){
		v.ntipo_control_heladas = "";
	}
	if(v.tipo_proteccion == 0 || v.tipo_proteccion == null){
		v.ntipo_proteccion = "";
	}
	if(v.limitante_suelo == 0 || v.limitante_suelo == null){
		v.nlimitante_suelo = "";
	}
	if(v.polinizante == 0 || v.polinizante == null){
		v.polinizante = "";
	}
	if(v.tipo_plantacion == 0 || v.tipo_plantacion == null){
		v.ntipo_plantacion = "";
	}
	
	var json = {
			Nombre_Sector: v.descripcion,
			Especie: v.nespecie,
			Variedad: v.nvariedad,
			Cuartel: v.nombre,
			Zona:v.zona,
			Superficie: v.superficie,
			Plantas: v.plantas,
			Tipo_Planta: v.ntipo_planta,
			Patron:v.patron,
			Distancia_Largo:v.distancia_largo,
			Distancia_Ancho:v.distancia_hancho,
			Formacion:v.nformacion,
			Vivero:v.vivero,
			Tipo_Control_Heladas:v.ntipo_control_heladas,
			Tipo_Proteccion:v.ntipo_proteccion,
			Limitante_Suelo:v.limitante_suelo,
			Polinizante:v.polinizante,
			Tipo_Plantacion:v.ntipo_plantacion,
			Clon:v.clon,
			Año_Plantacion:v.ano_plantacion,
			Ceco:v.ceco,
			Estado:v.estado
		}
	exportTabla.push(json);
	$.each(table, function(k,v){
		var tbl = "";
		tbl += "<tr>";
		tbl += 		"<td><input type='text' class='form-control input-sm' id='descripcion"+v.codigo+"' value='"+v.descripcion+"'disabled></td>";
		tbl += 		"<td><input type='text' class='form-control input-sm' id='especie"+v.codigo+"' value='"+v.nespecie+"' disabled></td>";
		tbl += 		"<td><input type='text' class='form-control input-sm' id='variedad"+v.codigo+"' value='"+v.nvariedad+"' disabled></td>";
		tbl += 		"<td><input type='text' class='form-control input-sm' id='nombre"+v.codigo+"' value='"+v.nombre+"' disabled></td>";
		tbl +=		"<td><input type='text' class='form-control input-sm' id='zona"+v.codigo+"' value='"+v.zona+"' disabled></td>";
		tbl += 		"<td><input type='number' onkeypress='return justNumbers(event);' class='form-control input-sm' id='superficie"+v.codigo+"' value='"+v.superficie+"' disabled></td>";
		tbl += 		"<td><input type='number' onkeypress='return justNumbers(event);' class='form-control input-sm' id='plantas"+v.codigo+"' value='"+v.plantas+"' disabled></td>";
		tbl += 		"<td><input type='text' class='form-control input-sm' id='tipo_planta"+v.codigo+"' value='"+v.tipo_planta+"' disabled></td>";
		tbl += 		"<td><input type='text' class='form-control input-sm' id='patron"+v.codigo+"' value='"+v.patron+"' disabled></td>";
		tbl += 		"<td><input type='number' onkeypress='return justNumbers(event);' class='form-control input-sm' id='distancia_largo"+v.codigo+"' value='"+v.distancia_largo+"' disabled></td>";
		tbl += 		"<td><input type='number' onkeypress='return justNumbers(event);' class='form-control input-sm' id='distancia_hancho"+v.codigo+"' value='"+v.distancia_hancho+"' disabled></td>";
		tbl += 		"<td><input type='text' class='form-control input-sm' id='formacion"+v.codigo+"' value='"+v.formacion+"' disabled></td>";
		tbl += 		"<td><input type='text' class='form-control input-sm' id='vivero"+v.codigo+"' value='"+v.vivero+"' disabled></td>";
		tbl += 		"<td><input type='text' class='form-control input-sm' id='tipo_control_heladas"+v.codigo+"' value='"+v.tipo_control_heladas+"' disabled></td>";
		tbl += 		"<td><input type='text' class='form-control input-sm' id='tipo_proteccion"+v.codigo+"' value='"+v.tipo_proteccion+"' disabled></td>";
		tbl += 		"<td><input type='text' class='form-control input-sm' id='limite_suelo"+v.codigo+"' value='"+v.limitante_suelo+"' disabled></td>";
		tbl += 		"<td><input type='text' onkeypress='return justNumbers(event);' class='form-control input-sm' id='polinizante"+v.codigo+"' value='"+v.polinizante+"' disabled></td>";
		tbl += 		"<td><input type='text' class='form-control input-sm' id='tipo_plantacion"+v.codigo+"' value='"+v.tipo_plantacion+"' disabled></td>";
		tbl += 		"<td><input type='text' class='form-control input-sm' id='clon"+v.codigo+"' value='"+v.clon+"' disabled></td>";
		tbl += 		"<td><input type='number' onkeypress='return justNumbers(event);' class='form-control input-sm' id='ano_plantacion"+v.codigo+"' value='"+v.ano_plantacion+"' disabled></td>";
		tbl += 		"<td><select type='text' id='ceco"+v.codigo+"' class='form-control' disabled>"+loadCeco(sociedad, grupo)+"</select></td>";		
		tbl +=		"<td><select id='estado"+v.codigo+"' class='form-control input-sm' disabled>" +
					"<option value='' disabled selected hidden=''>Seleccione</option>"+
					"<option value=1>Productivo</option>"+
					"<option value=0>No Productivo</option>"
					"</select></td>";
		tbl +=		"<td><div class='dropdown dropleft' style='float: left;'>";
		tbl +=			"<button class='btn btn-circle yellow btn-outline btn-sm dropdown-toggle' title='Editar' id='bt_editar"+v.codigo+"' onclick='javascript: BT_Editar("+ v.codigo+ ")' type='button' data-toggle='dropdown'>";
		tbl +=			"<span class='fa fa-pencil-square-o fa-lg'></span></button>";
		tbl += 		"<a title='Guardar' id='bt_guardar"+v.codigo+"' onclick='javascript: BT_Guardar("+ v.codigo+ ")'  style='display: none;' class='btn btn-circle green btn-outline icon-cloud-upload'></a></td>";
		tbl +=		"</div></tr>";
		$('#tblInfo').append(tbl);
		$("#ceco"+v.codigo).val(v.ceco);
		$('#estado'+v.codigo).val(v.estado);
	})
	
}
function add(){
	//var object = document.getElementById('tbl_Info_filter');
	//var object1 = document.getElementById('tbl_Info_paginate');
	//object.style.float = "right";
	//object1.style.float = "right";
}
//function edit(e){
//	window.location.href = ("homePage?id="+e)
//}
//$('#addMap').click(function(){
//	window.location.href = ("homePage");
//})
$('#viewAll').click(function(){
	if (bloqueo == true){
		alerta("Termine de modificar para crear un nuevo registro")
		return;		
	}else{
		window.location.href = ("homePage?id="+0);
	}
})

//function doc(id){
//	var content = "";
//	$.getJSON ("/simpleWeb/json/map/load/"+id, function(data){
//		$.each(data, function(k,v){
//			content += "<h1>"+v.valor1+"</h1>";
//			
//			$('#jspdf').append(content);
//			var docs = new jsPDF();
//			var specialElementHandlers  = {
//				'#ignore': function (element, renderer) {
//					return true;
//				},
//				'#ignore_2': function (element, renderer) {
//					return true;
//				}
//			};
//			
//			docs.fromHTML($('#jspdf').html(), 15, 15,{
//				'width': 180,
//				'elementHandlers': specialElementHandlers 
//			});
//			docs.output("datauri");
//			//docs.save(''+v.idtest+'_'+v.valor1+'.pdf')
//		})
//	})
//}
//$("#infoExcel").click(function(){
//$("#ignore").table2excel({
//    filename: "Mapeo",
//    fileext: ".xls"
//	});
//});
function formatNumber(num) {
    if (!num || num == 'NaN') return '0';
    if (num == 'Infinity') return '&#x221e;';
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
        num = num.substring(0, num.length - (4 * i + 3)) + '.' + num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num + ',' + cents);
}
function Ocultar_Excel(){
		$('#infoExcel').prop("disabled", true);
}
function Mostrar_Excel(){
	$('#infoExcel').prop("disabled", false);
}

$("#infoExcel").click(function(){
	$("#dvjson").excelexportjs({
        containerid: "dvjson"
           , datatype: 'json'
           , dataset: exportTabla
           , worksheetName: "Mapeo"
           , columns: getColumns(exportTabla)          
    });
	//location.reload();
	$("#loading").hide();
});