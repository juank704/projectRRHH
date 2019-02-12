$(document).ready(function(){
	$(".taller").hide();
	$(".riego").hide();
	$(".consumo").hide();
	loading.show();
	setTimeout(function(){ loadSelect(); }, 500);
	$("#range").ionRangeSlider({
		grid: true,
	    min: 0,
	    max: 100,
	    from: 1,
	    values: ["10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"]
	});
	$("#fecha_taller").datepicker({ maxDate: 0 });
	$("#fecha_taller").on("change", function(e){
		var f = e.target.value.split("/");
		if(f[1] != undefined && f[2] != undefined){
			e.target.value = f[1]+"-"+f[0]+"-"+f[2];
		}
	})
//	loadSelect();
})

var operador_taller;
var lista_combustibles;
var dataTable = $('#tbl_ConsumoCombustible').DataTable({	    
	"sPaginationType": "full_numbers" ,
	"filter": false,
	//"ordering": true,
	 "order": [[ 0, "desc" ]]
	
});
function selectTodoCuartel(){
	console.log($("#cbSelectTodo").is(':checked'));
	if($("#cbSelectTodo").is(':checked')){
		$('.cbEquipo').prop('checked', true);
		$('.activa').prop('disabled', false);
		
		
	} else {
		$('.cbEquipo').prop('checked', false);
		$('.activa').prop('disabled', true);
	}
}

function enableConsumo(id){
	
	var ida = id.replace("cbequipo","");
	if($("#cbequipo"+ida).is(':checked')){

		$('#BoxTrabajador'+ida).attr('disabled', false);
		$('#litros'+ida).attr('disabled', false);
		$('#horo'+ida).attr('disabled', false);
		
		
	
		
				
		$('#BoxTrabajador'+ida).addClass("required");
		$('#litros'+ida).addClass("required");
		$('#horo'+ida).addClass("required");
	}
	else
	{
		$('#BoxTrabajador'+ida).attr('disabled', true);
		$('#litros'+ida).attr('disabled', true);
		$('#horo'+ida).attr('disabled', true);
		
		$('#BoxTrabajador'+ida).removeClass("required");
		$('#litros'+ida).removeClass("required");
		$('#horo'+ida).removeClass("required");
		
		$('#litros'+ida).val('');
		$('#horo'+ida).val('');
				
	}
}

function loadInfo(){
	dataTable.clear().draw();
	
	$(".equipo").empty();
	console.log(arrayMaquinaria);
	var equipo = "<option value=''></option>"
	$.each(arrayMaquinaria, function(ka,va){
		if(va.EQUICATGRY == $("#BoxTipo").val()){
			//equipo += '<option value="'+va.EQUIPMENT+'">'+va.DESCRIPT+'</option>';
			var check = "<input type='checkbox' onchange='enableConsumo(this.id)' class='cbEquipo'  id='cbequipo"+va.EQUIPMENT+"' >";
			var litrosinput = "<input disabled type='numeric' id='litros"+va.EQUIPMENT+"' onkeypress='return justNumbers(event);' onchange=valStock(this); class='activa form-control consumo-input  litrosclase' placeholder=Ingrese Litros'>";
			var horometroinput ="<input disabled type=tex; id='horo"+va.EQUIPMENT+"' onkeypress='return justNumbers(event);' class='activa form-control consumo-input ' placeholder='Ingrese Horómetro'>";;
			if($("#BoxTipo").val() == 'V') {
				var operador = "<input disabled  id='BoxTrabajador"+va.EQUIPMENT+"' class='activa form-control input-sm consumo-input ' style='width: 200p'>";
			} else {
				var operador = "<select disabled  id='BoxTrabajador"+va.EQUIPMENT+"' class='activa form-control input-sm consumo-input ' style='width: 200p'>"+operador_taller+"</select>";
			}
			var hidd = "<input type='hidden'  id='"+va.EQUIPMENT+"' >'";
			var labelEquipo =  "<label id='label"+va.EQUIPMENT+"' for='"+va.EQUIPMENT+"'>"+va.DESCRIPT+"</label>";
			
			var tbl = [check, labelEquipo, litrosinput,horometroinput,  operador ]
			var rowNode = dataTable
		    .row.add( tbl )
		    .draw()
		    .node();
		}				
	})
	selectCss();
	//$(".equipo").html(equipo);
	
	
	$('#tbl_ListaAplicaciones_paginate').css('text-align','center');
	$('.buttons-excel').addClass('btn btn-circle red btn-outline');
	$('.buttons-pdf').addClass('btn btn-circle red btn-outline');
	$('#tbl_ListaAplicaciones_length').hide();
	$("#loading").hide();
}

var cecoMaq = '';
var tipos_de_ingreso = [{
	id: 1,
	desc: "Taller"
},{
	id: 3,
	desc: "Consumo de Combustible"
}]
var SESION = getVars();
console.log(SESION);
$('#campo_taller').change(function(){
	var campo_ = $(this).val();
	var camposMaq = '';
	$.each(SESION.campo, function(k,v){
		if(v.campo == campo_) {
			cecoMaq = v.cecoMaq;
			camposMaq = v.campos_maq;
		}
	})
	dataTable.clear().draw();
	console.log(cecoMaq);
	getMaquinaria(camposMaq);
});

var tipo_Vehiculo = [
                     {
	codigo: '',
	descripcion: "Seleccione"}
,{
	codigo: 'V',
	descripcion: "Vehiculos"}
,{	codigo: 'T',
	descripcion: "Tractores"}
,{	codigo: 'Y',
	descripcion: "Otros Equipos"}
];

var tipo_tallerArr = [{
	codigo: 'V',
	descripcion: "Vehiculos"}
,{	codigo: 'T',
	descripcion: "Tractor"}
,{	codigo: 'I',
	descripcion: "Implementos"}
,{	codigo: 'A',
	descripcion: "Implementos de Aplicación"}
,{	codigo: 'Y',
	descripcion: "Otros Equipos"}
,{	codigo: 'O',
	descripcion: "Otras Maquinas a Combustion"}

];
var vehiculos = [{
	codigo: 1,
	descripcion: "Vehiculo 01",
	tipo: 1
},{
	codigo: 2,
	descripcion: "Vehiculo 02",
	tipo: 2
},{
	codigo: 3,
	descripcion: "Vehiculo 02",
	tipo: 1
},{
	codigo: 4,
	descripcion: "Vehiculo 03",
	tipo: 1
}];
var causa = [{
	codigo: 1,
	descripcion: "Falla Operador",
	tipo: 2
},{
	codigo: 2,
	descripcion: "Falla Maquinaria",
	tipo: 2
},{
	codigo: 3,
	descripcion: "Otros",
	tipo: 2
},];
function cambio_tipo(input){
	if(input.value == 1){
		$(".taller").show();
		$(".taller-input").addClass("required");
		$(".riego").hide();
		$(".riego-input").removeClass("required");
		$(".consumo").hide();
		$(".consumo-input").removeClass("required");
	}else if(input.value == 2){
		$(".taller").hide();
		$(".taller-input").removeClass("required");
		$(".riego").show();
		$(".riego-input").addClass("required");
		$(".consumo").hide();
		$(".consumo-input").removeClass("required");
	}else if(input.value == 3){
		$(".taller").hide();
		$(".taller-input").removeClass("required");
		$(".riego").hide();
		$(".riego-input").removeClass("required");
		$(".consumo").show();
		$(".consumo-input").addClass("required");
	}else if(input.value == 4){
		$(".taller").hide();
		$(".taller-input").removeClass("required");
		$(".riego").hide();
		$(".riego-input").removeClass("required");
		$(".consumo").hide();
		$(".consumo-input").removeClass("required");
	}
}
function loadSelect(){
	var campo_taller = "<option value=''>Seleccione</option>";
	var tipo_taller = "<option value=''>Seleccione</option>";
	var tipo_Vehiculolista = "<option value=''>Seleccione</option>";
	var tipo_ingreso = "<option value=''>Seleccione</option>";
	$.each(SESION.campo, function(k,v){
		campo_taller += "<option value='"+v.campo+"'>"+v.descripcion+"</option>";
	})
	$("#campo_taller").html(campo_taller);
	
	$.each(tipo_tallerArr, function(k,v){
		tipo_taller += "<option value='"+v.codigo+"'>"+v.descripcion+"</option>";
	})
	
	$.each(tipo_tallerArr, function(k,v){
		tipo_Vehiculolista += "<option value='"+v.codigo+"'>"+v.descripcion+"</option>";
	})
	
	
	$("#tipo_taller").html(tipo_taller);
	$("#BoxTipo").html(tipo_Vehiculolista);
	
	
	$.each(tipos_de_ingreso , function(k,v){
		tipo_ingreso += "<option value='"+v.id+"'>"+v.desc+"</option>";
	})
	$("#tipo_ingreso").html(tipo_ingreso)

	$("#fecha_taller").val(formatFecha(dateHoy())).trigger("change");
	$(".motivo").empty();
	$.ajax({
		url: "/simpleWeb/json/AGRO/GET_MOTIVO_INGRESO/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			var motivo_ingreso = "<option value=''>Seleccione</option>";
			$.each(data, function(k,v){
				motivo_ingreso += "<option value='"+v.codigo+"'>"+v.descripcion+"</option>";
			})
			$(".motivo").html(motivo_ingreso);
		}
	});
	
	
	
	loading.hide();
}
$("#tipo_taller").change(function(){
	$(".equipo").empty();
	console.log(arrayMaquinaria);
	var equipo = "<option value=''></option>";
	var equipo2 = "<option value=''></option>";
	var auxArrTaller = [];
	$.each(dataTallerFecha, function(k,v){
		auxArrTaller.push(v.vehiculo);
	})
	console.log(auxArrTaller);
	$.each(arrayMaquinaria, function(ka,va){
		if(va.EQUICATGRY == $("#tipo_taller").val()){
			
			equipo += '<option value="'+va.EQUIPMENT+'">'+va.DESCRIPT+'</option>';
			if(auxArrTaller.indexOf(va.EQUIPMENT*1) >= 0){
				equipo2 += '<option value="'+va.EQUIPMENT+'" disabled="disabled">'+va.DESCRIPT+' (EN TALLER)</option>';
			}else{
				equipo2 += '<option value="'+va.EQUIPMENT+'">'+va.DESCRIPT+'</option>';
			}
		}
	})
	$(".equipo").html(equipo);
	$("#vehiculo_taller").html(equipo2);
});

$("#BoxTipo").change(function(){
	loadInfo();
});

function addTaller(){
	var validate = true;
	$(".required").each(function(){
		if(!$(this).val()){
			alerta("Todos los Campos son requeridos");
			validate = false;
			return false;
		}
	})
	if(validate){
		var operadorFinal = $("#operador_taller").val();
		if($("#tipo_taller").val() == 'V'){
			operadorFinal =  $("#operador_taller_V").val();
		}
		var newTaller = {
			codigo: 0,
			campo: $("#campo_taller").val(),
			tipo: $("#tipo_taller").val(),
			vehiculo: $("#vehiculo_taller").val(),
			motivo: $("#motivo_ingreso").val(),
			causa: $("#causa").val(),
			fecha: formatFecha($("#fecha_taller").val()),
			operador: operadorFinal,
			horometro: $("#horomtr_taller").val(),
			observacion: $("#obs_taller").val()
		}
		
		console.log(newTaller);
		$.ajax({
			url : "/simpleWeb/json/AGRO/ADD_TALLER/",
			type : "PUT",
			data : JSON.stringify(newTaller),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept","application/json");
				xhr.setRequestHeader("Content-Type","application/json");
			},
			success : function(data, textStatus, jqXHR) {
				alerta("Ingreso Guardado correctamente");
				$('.swal2-confirm').click(function(){
					window.location.href = ("IngresoTaller");
				})
				
			},
			error : function(jqXHR, textStatus, errorThrown) {
				swal({
					  title: "Error!",
					  text: "No se ha podido registrar la infomacion, consulte con el administrador del sistema",
					  type: "error",
					  confirmButtonText: "Aceptar"
				});
			}
		});
	}
}
var arrayMaterial = [];
var arrayMaquinaria = [];
function getMaquinaria(c){
	arrayMaquinaria = [];
	$(".equipo").empty();
	console.log(IPSERVERSAP + "JSON_BAPI_EQUI_GETLIST.aspx?CENTRO="+c);
	$.ajax({
		url: IPSERVERSAP + "JSON_BAPI_EQUI_GETLIST.aspx?CENTRO="+c,//ZREP
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			arrayMaquinaria = data.EQUIPMENT_LIST;
		}
	})
	loading.hide();
}


function modalAddCuartel(x){
	
	var validate = true;
	var bodyAddCuartel = "";
	var arrIdCuartel = [];
	var tblAddCuartel = "";
	tblAddCuartel +='<div class="table-responsive" id="ignore2">';
	tblAddCuartel +=	'<table class="table table-striped table-condensed" id="tbl_colaboradores">';
	tblAddCuartel +=		'<thead style="text-align: center;">';
	tblAddCuartel +=			'<tr>';
	//tblAddCuartel +=				"<th style='width: 2%; text-align: center;'><input type='checkbox' checked id='cbSelectTodo' onchange='selectTodoCuartel()' ></th>";
	tblAddCuartel +=				'<th style="text-align: center;">Maquinaria</th>';
	tblAddCuartel +=				'<th style="text-align: center;">Litros</th>';
	tblAddCuartel +=				'<th style="text-align: center;">Horometro</th>';
	tblAddCuartel +=				'<th style="text-align: center;">Operario</th>';
	tblAddCuartel +=			'</tr>';
	tblAddCuartel +=		'</thead>';
	tblAddCuartel +=		'<tbody id="tblCuartel">';
	var flag = true;
	
	$('.litrosclase').each(function(index,element){
		
		var ida = element.id.replace("litros","");
		
		if($("#cbequipo"+ida).is(':checked'))
		{
			
			
			 bodyAddCuartel +="<tr>" ;
			//bodyAddCuartel +=	"<td><input type='checkbox' class='cbCuartel' onchange='calcularTotalHas()' id='cbCuartel"+va.cuartel+"' "+va.estado+" value='"+va.cuartel+"' ></td>" ;
			if($("#litros"+ida).val()=="" || $("#litros"+ida).val()=="" || $("#horo"+ida).val()=="" || $("#BoxTrabajador"+ida).val()=="")				
				{
				 flag = false;
					return false;
				}
			
			 bodyAddCuartel +=	"<td>"+$("#label"+ida).text()+"</td>" ;
			bodyAddCuartel +=	"<td>"+$("#litros"+ida).val()+"</td>" ;
			bodyAddCuartel +=	"<td>"+$("#horo"+ida).val()+"</td>" ;
			if($("#BoxTipo").val() == 'V'){
				bodyAddCuartel +=	"<td>"+$("#BoxTrabajador"+ida).val()+"</td>" ;
			} else {
				bodyAddCuartel +=	"<td>"+$("#BoxTrabajador"+ida+ " option:selected").text()+"</td>" ;
			}
			
			
			bodyAddCuartel +="</tr>";
			
		}
		
		
	});
	if(flag == false) {
		alerta("Debe completar los campos para continuar");
		return false;
	}
		
	
	var totalconsumo = parseFloat($("#stock").val().replace(".","").replace(",",".") ) - parseFloat($("#stocksaldo").val().replace(".","").replace(",",".") ) ;

	bodyAddCuartel +="<tr>" ;	
	
	bodyAddCuartel +=	"<td>Total</td>" ;
	bodyAddCuartel +=	"<td id='totalHas'>"+formatNumber2(totalconsumo)+"</td>" ;
	bodyAddCuartel +=	"<td></td>" ;
	bodyAddCuartel +="</tr>";
	tblAddCuartel += bodyAddCuartel;
	tblAddCuartel += 		'</tbody>';
	tblAddCuartel +=	'</table>';
	tblAddCuartel +='</div>';
	tblAddCuartel +='<div class="col-sm-12 col-md-12">';	
	tblAddCuartel +=	'<div class="btn btn-circle blue btn-outline" onclick="ingresar_consumo();">Guardar</div>';
	tblAddCuartel +=	'<div class="btn btn-circle red btn-outline" onclick="closeModal();">Cancelar</div>';
	tblAddCuartel +='</div>';
	popUp("Consumo Combustible", tblAddCuartel, true, '500px', true);
}

function actualizaSaldo(input)
{
	var totalConsumo = 0;
	$('.litrosclase').each(function(index,element){
		
		var ida = element.id.replace("litros","");
		
		if($("#cbequipo"+ida).is(':checked'))
		{
		var id = element.id; 
		var value = element.value;
		 totalConsumo =  totalConsumo + parseFloat(value);		
		}
	}
		)
		
		var saldo =  parseFloat($("#stock").val().replace(".","").replace(",",".") ) - totalConsumo;	
	if(saldo<0)
		{
			alerta("La cantidad de Litros no puede exceder al Stock del Campo seleccionado");
			$(input).val("");	
		}
	else
		{
		$("#stocksaldo").val(formatNumber2(saldo));
		}
}
function valStock(input) {
	
	if (input.value > parseFloat($("#stock").val().replace(".","").replace(",",".") ) || $("#stock").val()=="-") {
		alerta("La cantidad de Litros no puede exceder al Stock del Campo seleccionado");
		$(input).val("");
		var saldo =  parseFloat($("#stock").val().replace(".","").replace(",",".") ) - totalConsumo;
		return;
	}
	else
	{
		
		if(input.value!="")
		{
			actualizaSaldo(input)
			
		}
		
	}
		
}
$('#BoxCombustible').change(function(){
	loading.show();
	$.ajax({
		url : IPSERVERSAP + "JSON_BAPI_MATERIAL_STOCK_REQ_LIST.aspx?CENTRO="+ $('#campo_taller').val()+ "&MATERIAL="+$('#BoxCombustible').val()+"&ALMACEN=PL01",
		type : "GET",
		dataType : 'json',
		async : false,
		success : function(data) {
			if (data.T_STOCK_MATNR != undefined) {
				$("#stock").val(formatNumber(data.T_STOCK_MATNR[0].LABST));
				$("#stocksaldo").val(formatNumber(data.T_STOCK_MATNR[0].LABST));
			}
		}
	})
	
	$('.litrosclase').val('');
	
	
	loading.hide();
	
});
$('#campo_taller').change(function(){
	loading.show();
		
	var url = "/simpleWeb/json/AGRO/getTrabajadoresAgro2/?TRABAJADOR=*&CAMPO="+this.value+"&RUT=*&CARGO=7&FECHA="+formatFecha($("#fecha_taller").val())+"&DIGITADOR="+SESION.idUser;	
	console.log(url);
	//console.log("/simpleWeb//json/AGRO/getTrabajadoresAgro2/?TRABAJADOR=*&CAMPO="+ this.value + "&RUT=*&CARGO=7&FECHA=*");
	$.ajax({
		url : url,
		type : "GET",
		async : false,
		success: function(data){
			operador_taller = "<option value=''>Seleccione</option>";
			$.each(data, function(k,v){
				operador_taller += "<option value='"+v.idTrabajador+"'>"+v.nombre+"</option>";
			})
			$("#operador_taller").html(operador_taller);
			$("#BoxTrabajador").html(operador_taller);
			
		}
	})
			
	
	$.ajax({
		//url : IPSERVERSAP + "JSON_ZMOV_10020.aspx?FAMILIA=HIBE&SUBFAMILIA=Z005",
		url : IPSERVERSAP + "JSON_ZMOV_10020.aspx?FAMILIA=HIBE",
		type : "GET",
		async : false,
		success: function(data){
			lista_combustibles = "<option value='0'>Seleccione</option>";
			var comb = JSON.parse(data);
			$.each(comb.LT_DETALLE, function(kc,vc){
				console.log(vc);
				lista_combustibles += "<option value='"+vc.MATNR+"'>"+vc.MAKTX+"</option>";
			})
			$("#operador_taller").html(operador_taller);
			$("#BoxTrabajador").html(operador_taller);
			$("#BoxCombustible").html(lista_combustibles);
		}
	})
	$(".equipo").empty();
	$("#tipo_taller").val('').trigger("change");
	loading.hide();
	//getMaquinaria($(this).val());
});
var cMat = 0;
function addMateriales(){
	$('#reser').remove();
	if($('#campo_taller').val() == ''){
		alerta("Debe seleccionar el Campo para continuar.");
		return false;
	}
	var tr  = "<tr id='tr"+cMat+"'>";
	tr += "<td><select id='mat"+cMat+"' onchange='getDetalleMaterial("+cMat+")'  class='form-control2 input-sm2'>";	
    $.each(arrayMaterial[0], function(ka,va){
    	tr += "<option value='"+va.MATNR+"'>"+va.MAKTX+"</option>";
    })
	tr += "</select>";
	tr += "</td>";
	tr += "<td id='um"+cMat+"'></td>";
	tr += "<td><input class='form-control' type='number' id='cant"+cMat+"'></td>";	
	tr += "<td id='stock"+cMat+"'></td>";
	tr += "<td><input class='form-control' type='number' id='cantSol"+cMat+"'></td>";
	tr += "<td id='solped"+cMat+"'></td>";
	tr += "<td id='cantS"+cMat+"'></td>";
	tr += "<td id='fecha"+cMat+"'></td>";
	tr += 	'<td>';
	tr += 		'<a onclick="descartarMaterial('+cMat+');">';
	tr +=			'<i class="fa fa-minus">';
	tr +=		'</a>';
	tr += '</td>';
	tr += "</tr>";
	var trf = "<tr id='reser'>";
	trf += "<td></td>";
	trf += "<td></td>";
	trf += "<td>"+$('#reservarDiv').html()+"</td>";
	trf += "<td></td>";
	trf += "<td>"+$('#solpedDiv').html()+"</td>";
	trf += "<td></td>";
	trf += "<td></td>";
	trf += "<td></td>";
	trf += "<td></td>";
	trf += "</tr>";
	$("#tfoot_Materiales").html(trf);
	$('#tbl_Materiales').append(tr);
	$('.form-control2.input-sm2').select2({
		multiple: false,
		placeholder: "Seleccione",
		width: "380px"
	});
	$('#mat'+cMat).trigger('change');
	$('#addReserva').show();
	$('#addSolped').show();
	cMat++;
}
function descartarMaterial(c){
	$('#tr'+c).remove();
	if($("#tbl_Materiales tr").length == 1){
		$('#addReserva').hide();
		$('#addSolped').hide();
		$('#reser').remove();
	}
}
function getDetalleMaterial(c){
	var id = $('#mat'+c).val();
	var campo = $('#campo_taller').val();
	$('#um'+c).empty();
	$('#stock'+c).empty();
	$('#solped'+c).empty();
	$('#cantS'+c).empty();
	$('#fecha'+c).empty();
	$.getJSON(IPSERVERSAP + "JSON_ZMOV_10020.aspx?MATERIAL="+id, function(dataMat){
		$('#um'+c).html(dataMat.LT_DETALLE[0].MEINS);
	});
	$.getJSON(IPSERVERSAP + "JSON_BAPI_MATERIAL_STOCK_REQ_LIST.aspx?CENTRO="+campo+"&MATERIAL="+id+"&ALMACEN=0", function(dataStock){
		$('#stock'+c).html(formatNumber(dataStock.T_STOCK_MATNR[0].LABST));
	});
	$.getJSON(IPSERVERSAP + "JSON_BAPI_REQUISITION_GETITEMS.aspx?CENTRO="+campo+"&MATERIAL="+id, function(dataSoped){
		console.log(dataSoped);
		var data = [];
		var x = 0;
		$.each(dataSoped.REQUISITION_ITEMS, function(ka,va){
			data = va;
			if(x==0){
				$('#solped'+c).html(data.PREQ_NO);
				$('#cantS'+c).html(data.QUANTITY);
				$('#fecha'+c).html(formatFecha(data.REL_DATE));
				x++;
			} else
			{
				var tr = "<tr>";
					tr += "<td></td>";
					tr += "<td></td>";
					tr += "<td></td>";
					tr += "<td></td>";
					tr += "<td></td>";
					tr += "<td>"+data.PREQ_NO+"</td>";
					tr += "<td>"+data.QUANTITY+"</td>";
					tr += "<td>"+formatFecha(data.REL_DATE)+"</td>";
					tr += "</tr>";
					$('#tbl_Materiales').append(tr);
			}
		})
		/*console.log(data);
		if(dataSoped.REQUISITION_ITEMS.length > 0) {
			console.log(data.QUANTITY);
			$('#solped'+c).html(data.PREQ_NO);
			$('#cantS'+c).html(data.QUANTITY);
			$('#fecha'+c).html(formatFecha(data.REL_DATE));
		}*/
		
	});
}

function reservar(id){
	if(!$('#fecha_taller').val()){
		alerta("Ingrese Fecha");
		return;
	}
	var fecha = "";
	var codMat = "";
	var cantMat = "";
	var ceco = "";
	var almacen = "";
	var campo = "";
	console.log(listMateriales());
	fecha = formatFecha($('#fecha_taller').val()).replace(/-/g, "");
	campo = $('#campo_taller').val();
	var mat = {};
	mat.MATERIALES = listMaterialesSolped();
	var materiales = JSON.stringify(mat);
	var url  = IPSERVERSAP + "JSON_BAPI_RESERVATION_CREATE1.aspx?FECHA="+fecha+"&ALMACEN=PL01&ALMACENDESTINO="+"&MATERIALES="+materiales+"&CENTRO="+campo+"&MOVIMIENTO=201&CENTROCOSTO="+cecoMaq+"&EQUIPO="+$('#vehiculo_taller').val();
	var user = "&USPAS="+SESION.user+"X*X"+SESION.pass;
	url  += user;
	console.log(url);
	//return;
		$.getJSON(url, function(response){
			if(response.RESERVATION != 0){
				$('#nreserva').val(response.RESERVATION);
				alerta("Se ha reservado con éxito, número de reserva "+response.RESERVATION);
			} else {
				var mensaje = "";
				$.each(response.RETURN, function(key, val){
					mensaje += val.MESSAGE+"<br>";
				});
				alerta(mensaje);
			}
		});
		$('#addReserva').attr('disabled','disabled');
}

$("#tipo_taller").change(function(){
	console.log($(this).val());
	if($(this).val() == 'V'){
		$("#divOprTra").hide();
		$("#divOprVeh").show();
		$("#operador_taller").removeClass('required');
	} else {
		$("#divOprVeh").hide();
		$("#divOprTra").show();
		$("#operador_taller").addClass('required');
	}
});
function solped(id){
	if(!$('#fecha_taller').val()){
		alerta("Ingrese Fecha");
		return;
	}
	var fecha = "";
	var codMat = "";
	var cantMat = "";
	var ceco = "";
	var almacen = "";
	var campo = "";
	fecha = formatFecha($('#fecha_taller').val()).replace("-", "").replace("-", "");
	var mat = {};
	mat.MATERIALES = listMaterialesSolped();
	var materiales = JSON.stringify(mat);
	campo =  $('#campo_taller').val();
	almacen = 'PL01';
	var fecha2 = "";
	var observacion = "";
	var url  = IPSERVERSAP + "JSON_BAPI_REQUISITION_CREATE.aspx?FECHA="+fecha+"&MATERIALES="+materiales+"&ALMACEN="+almacen+"&CENTRO="+campo+"&CENTROCOSTO="+cecoMaq+"&EQUIPO="+$('#vehiculo_taller').val();
	url += "&FECHAENTREGA="+fecha2+"&OBSERVACION="+observacion;
	var user = "&USPAS="+SESION.user+"X*X"+SESION.pass;
	user += "&GRUPO_COMRPA="+SESION.grupoCompra+"&SOLICITANTE="+SESION.solicitante;
	url  += user;
	console.log(url);
	//return;
	$.getJSON(url, function(response){
		if(response.NUMBER != ""){
			alerta("Se ha realizado la solicitud de pédido "+response.NUMBER);
		} else {
			var mensaje = "";
			$.each(response.RETURN, function(key, val){
				mensaje += val.MESSAGE+"<br>";
			});
			alerta(mensaje);
		}
	});
	$('#addSolped').attr('disabled','disabled');
}

function listMateriales(){
	var arrayListMat = [];
	for (var i=0; i<cMat; i++) {
		if($('#mat'+i).val() != undefined){
			console.log(1);
			if($('#mat'+i).val() != "" &&  $('#cant'+i).val() != ""){
				var arrayList = {};
				arrayList.COD = $('#mat'+i).val();
				arrayList.CANTIDAD = parseFloat($('#cant'+i).val()).toFixed(3);
				arrayListMat.push(arrayList);
			} 	
		} 
	}
	console.log(arrayListMat);
	return arrayListMat;
	
}
function listMaterialesSolped(){
	var arrayListMat = [];
	for (var i=0; i<cMat; i++) {
		if($('#mat'+i).val() != undefined){
			//if($("#cbMaterial"+i).is(':checked')){			
				if($('#mat'+i).val() != "" &&  $('#cantSol'+i).val() != ""){
			   		var arrayList = {};
					arrayList.COD = $('#mat'+i).val();
					arrayList.CANTIDAD = parseFloat($('#cantSol'+i).val()).toFixed(3);
					arrayListMat.push(arrayList);
			   	}
			//}
	   } 
	}
	return arrayListMat;
	
}

function formatNumber(num) {
    if (!num || num == 'NaN') return '-';
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

function selectTodo(){
	if($("#cbSelectTodo").is(':checked')){
		$('.cbMaterial').prop('checked', true);
	} else {
		$('.cbMaterial').prop('checked', false);
	}
}
function cambioMotivo(input){
	var causaS = "<option value=''></option>";
	var val = true;
	$.each(causa, function(k,v){
		if(v.tipo == input.value){
			val = true; 
			$("#causa").addClass("required");
			causaS += "<option value="+v.codigo+">"+v.descripcion+"</option>";
//			return false;
		}else{
			val = false;
		}
	})
	if(!val){
		$("#causa").removeClass("required");
	}
	$("#causa").html(causaS);
}
function ingresar_consumo() {
	var mensaje;
	if(1==0)
		{
			/*!$('#fecha_taller').val()){
		alerta("Ingrese Fecha");
	}else if(!$('#campo_taller').val()){
		alerta("Seleccione un Campo")
	}else if (!$('#BoxTipo').val()) {
		alerta("Seleccione Tipo Vehículo");
	} else if (!$('#BoxVehiculo').val()) {
		alerta("Seleccione un Vehículo");
	} else if (!$('#BoxLitro').val()) {
		alerta("Ingrese Litros");
	} else if (!$('#BoxTrabajador').val()) {
		alerta("Seleccione Trabajadores");
	} else if (!$('#BoxHorometro').val()) {
		alerta("Ingrese Horómetro");
	*/
	} else {
		loading.show();
		var fecha = formatFecha($('#fecha_taller').val()).replace(/-/g, "");
		var materiales = {
				"MATERIALES" : []
			}
		var ida = "";
		$('.litrosclase').each(function(index,element){
			
			 ida = element.id.replace("litros","");
			
			if($("#cbequipo"+ida).is(':checked'))
			{	
				//bodyAddCuartel +=	"<td>"+$("#label"+ida).text()+"</td>" ;
				//bodyAddCuartel +=	"<td>"+$("#litros"+ida).val()+"</td>" ;
				//bodyAddCuartel +=	"<td>"+$("#horo"+ida).val()+"</td>" ;
				//bodyAddCuartel +=	"<td>"+$("#BoxTrabajador"+ida+" option:selected").text();+"</td>" ;
				materiales["MATERIALES"].push(
					{
						"COD" : $('#BoxCombustible').val(),
						"CANTIDAD" : $("#litros"+ida).val(),
						"CENTROCOSTO" : cecoMaq,
						"TEXTO" : ida
					}
				)
				
				
			}			
			
		});
		
		
		
		var url = IPSERVERSAP + "JSON_BAPI_GOODSMVT_CREATE_AGRO.aspx?FECHA="+ fecha + "&MATERIALES="+JSON.stringify(materiales)+"&CENTRO=" + $('#campo_taller').val()+ "&ALMACEN=PL01&MOVIMIENTO=201&EQUIPO="+$("#BoxVehiculo").val();
		url += "&USPAS="+SESION.user+"X*X"+SESION.pass;
		
		console.log(url)
		//return;
		setTimeout(function(){
		$.ajax({
			url : url,
			type : "GET",
			dataType : 'json',
			async : false,
			success : function(data) {
				
				console.log(data);
				if(data.MATERIALDOCUMENT != ""){
					//var mensaje = "Consumo realizado con exito, Número de documento "+data.MATERIALDOCUMENT + "<br>";
					var documento = data.MATERIALDOCUMENT;
					
					
					var arrayData = [];
					var datos = {};
					$('.litrosclase').each(function(index,element){
						
						 ida = element.id.replace("litros","");
						 
						if($("#cbequipo"+ida).is(':checked'))
						{	
							datos = {};
							datos = {
								campo : $('#campo_taller').val(),
								Tipo : $('#BoxTipo').val(),
								vehiculo : parseInt(ida),
								fecha : formatFecha($('#fecha_taller').val()),
								litro : $('#litros'+ida).val(),
								operador : $('#BoxTrabajador'+ida).val(),
								horometro : $('#horo'+ida).val(),
								implemento : "",
								material_document : documento
							}
							arrayData.push(datos);
						}			
						
					});
					
					console.log(arrayData);
					$.ajax({
						url : "/simpleWeb/json/AGRO/ADD_ConsumoCombustible/",
						type : "PUT",
						data : JSON.stringify(arrayData),
						beforeSend : function(xhr) {
							xhr.setRequestHeader("Accept", "application/json");
							xhr.setRequestHeader("Content-Type","application/json");
						},
						success : function() {
							
							loading.hide();
							if(data != "A table could not be redirected."){
								alerta("Registro Guardato Correctamente.\n Documento Material: "+data.MATERIALDOCUMENT);
								$('.swal2-confirm').click(function(){
									window.location.href = ("IngresoTaller");
								})
							} else {
								alerta(data);
							}
								
							
						},
						error : function(jqXHR, textStatus, errorThrown) {
								loading.hide();
								// anular movimiento v
								$.ajax({
									url: IPSERVERSAP + "JSON_ZMOV_CANCEL_MIGO.aspx?DOCUMENTO="+data.MATERIALDOCUMENT+"&FECHAANULACION="+fecha,
									type:	"GET",
									dataType: 'json',
									async: false,
									success: function(data){
										alerta("No se ha podido registrar la infomación, consulte con el administrador del sistema Documento Material Anulado: "+data.MATERIALDOCUMENT);
																			
									}
								})
							
						}
						
					})
					
				} else {
					
					var mensaje = "";
					$.each(data.RETURN, function(key, val){
						mensaje += val.MESSAGE+"<br>";
					});
					alerta(mensaje);
					loading.hide();
				}
				
				
				
			}
		})
		}, 500);
	}
}
function Guardar(){
	if(!$('#fecha_taller').val()){
		alerta("Ingrese Fecha");
	}else if(!$('#campo_taller').val()){
		alerta("Seleccione un Campo")
	}else if (!$('#BoxCaseta').val()){
		alerta("Seleccione una Caseta de Riego")
	}else if(!$('#vehiculo_riego').val()){
		alerta("Seleccione un Equipo de Riego");
	}else if(!$('#BoxMotivoIngreso').val()){
		alerta("Seleccione un Motivo de Ingreso")
	}else if (!$('#BoxDiagnostico').val()){
		alerta("Ingrese Diagnostico")
	}else{	
		var datos={
			fecha : formatFecha($('#fecha_taller').val()),
			caseta : $('#BoxCaseta').val(),
			equipo : $('#vehiculo_taller').val(),
			campo : $('#campo_taller').val(),	
			motivo_ingreso : $('#BoxMotivoIngreso').val(),
			diagnostico_preliminar : $('#BoxDiagnostico').val()
		}
		console.log(datos)
		$.ajax({
			url : "/simpleWeb/json/AGRO/ADDIngresoRiego/",
			type : "PUT",
			data : JSON.stringify(datos),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
		},success: function(){
				//ValorPredeterminado();
				loadSelect();
				alerta("Registro Guardato Correctamente");
				location.reload();

			},success: function(){
				//ValorPredeterminado();
				loadSelect();	
				alerta("Registro Guardato Correctamente");
			}
		})
		$("#loading").hide();
	}
}
function formatNumber2(num) {
    if (!num || num == 'NaN') return '0';
    if (num == 'Infinity') return '&#x221e;';
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 1000 + 0.50000000001);
    console.log(num);
    cents = num % 1000;
    console.log(cents);
    num = Math.floor(num / 1000).toString();
    if (cents < 100)
        cents = "0" + cents;
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
        num = num.substring(0, num.length - (4 * i + 3)) + '.' + num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num + ',' + cents);
}
var dataTallerFecha;
function cambioFecha($value){
	var fecha = formatFecha($value);
	console.log(fecha);
	console.log("/simpleWeb/json/AGRO/GET_MAQUINAS_EN_TALLER?FECHA="+fecha)
	$.ajax({
		url : "/simpleWeb/json/AGRO/GET_MAQUINAS_EN_TALLER?FECHA="+fecha,
		type : "GET",
		dataType : 'json',
		async : false,
		success : function(data){
			dataTallerFecha = data;
		},error: function(e){
			console.log(e);
		}
	})
}