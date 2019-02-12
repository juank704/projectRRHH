$(document).ready(function() {
	LoadInfo();
	$('#loading').hide();
	$('#tbl_Info').DataTable({
		"sPaginationType" : "full_numbers",
		filter: false,
	});
});

var tabla= false;//Variable para comprar que no se ingresen mas filas a la tabla hasta que se guarde una antes.
var compara = false; // variable para comparar, que no se puedan modificar mas de una fila.
var SESION = getVars();
var recorrido;
var tb_recorrido;
var tablaLaborFaena = $("#Recorrido_Tabla").html();

function LimpiarTabla() {
	$("#Recorrido_Tabla").html("");
	$("#Recorrido_Tabla").html(tablaLaborFaena);
	$('#Tabla_Recorrido').html("");
}


function add(){
	var object1 = document.getElementById('tbl_Info_paginate');
	object1.style.float = "right";
}
function add2(){
	var object1 = document.getElementById('Table_recorrido_paginate');
	object1.style.float = "right";
}

function loadTabla(data){
	$('#Tabla_Recorrido').html("")//Indico que la tabla este vacia de inicio para que no traiga un error
			$.each(data, function(k,v){
				var tbl = "";
				tbl += "<tr>";
				tbl += 		"<td><select id='campo"+v.id_recorrido+"' class='form-control input-sm' style='min-height: 34px; min-width:172px;' disabled>"+SelectCampo()+"</select></td>";	
//				tbl += 		"<td><input type='text' id='campo"+v.id_recorrido+"' value='"+v.descripcion+"' disabled></td>";
				tbl += 		"<td><input type='text' id='detalle"+v.id_recorrido+"' value='"+v.detalle+"' style='min-height: 34px; min-width:172px;' disabled></td>";
				tbl += 		"<td><input type='text' id='chofer"+v.id_recorrido+"' value='"+v.chofer+"' style='min-height: 34px; min-width:172px;' disabled></td>";
				tbl += 		"<td><input type='text' id='tipo_vehiculo"+v.id_recorrido+"' value='"+v.tipo_vehiculo+"' style='min-height: 34px; min-width:172px;' disabled></td>";
				tbl += 		"<td><input type='text' id='patente"+v.id_recorrido+"' value='"+v.patente+"' style='min-height: 34px; min-width:172px;' disabled></td>";
				tbl += 		"<td><input type='text' id='origen"+v.id_recorrido+"' value='"+v.origen+"' style='min-height: 34px; min-width:172px;' disabled></td>";
				tbl += 		"<td><input type='text' id='destino"+v.id_recorrido+"' value='"+v.destino+"' style='min-height: 34px; min-width:172px;' disabled></td>";
				tbl += 		"<td><input type='text' id='responsable"+v.id_recorrido+"' value='"+v.responsable+"' style='min-height: 34px; min-width:172px;' disabled></td>";
				tbl += 		"<td><input type='number' id='cantidad_persona"+v.id_recorrido+"' min='0' value='"+v.cantidad_persona+"' onkeypress='return justNumbers(event);' style='min-height: 34px; min-width:172px;' disabled></td>";
				tbl += 		"<td><input type='time' id='horario_salida"+v.id_recorrido+"' value='"+v.horario_salida+"' onkeypress='return justNumbers(event);' style='min-height: 34px; min-width: 172px;' disabled></td>";
				tbl += 		"<td><input type='time' id='horario_llegada"+v.id_recorrido+"' value='"+v.horario_llegada+"' onkeypress='return justNumbers(event);' style='min-height: 34px; min-width: 172px;' disabled></td>";
				tbl +=		"<td><select id='BoxTipoPago"+v.id_recorrido+"' class='form-control input-sm' style='min-height: 34px; min-width:172px;' disabled>" +
							"<option value='' disabled selected hidden=''>Seleccione</option>"+
							"<option value=1>Diario</option>"+
							"<option value=2>Por Asiento</option>"+
							"</select>"+
							"</td>";
				tbl += 		"<td><input type='number' id='BoxTarifa"+v.id_recorrido+"' calss='form-control' min='0' value='"+v.tarifa+"' onkeypress='return justNumbers(event);' style='min-height: 34px; min-width:172px;' disabled></td>"
				tbl +=		"<td><select id='BoxEstado"+v.id_recorrido+"' class='form-control input-sm' style='min-height: 34px; min-width:172px;' disabled>" +
							"<option value='' disabled selected hidden=''>Seleccione</option>"+
							"<option value=1>Activo</option>"+
							"<option value=2>Inactivo</option>"+
							"</select>"+
							"</td>";
				tbl += 		"<td><input type='number' onkeypress='return justNumbers(event);' id='BoxPorcentaje"+v.id_recorrido+"' min='0' max='100' value='"+v.porcentaje+"' style='min-height: 34px; min-width:172px;' disabled></td>"
				tbl += 		"<td><input type='date' id='BoxDesde"+v.id_recorrido+"' name='fecha'  calss='form-control' value='"+v.vigencia_desde+"' style='min-height: 34px; min-width:172px;' disabled></td>"
				tbl += 		"<td><input type='date' id='BoxHasta"+v.id_recorrido+"' name='fecha' calss='form-control' value='"+v.vigencia_hasta+"' style='min-height: 34px; min-width:172px;' disabled></td>"
				tbl +=		"<td><div class='dropdown dropleft' style='float: left;'>";
				tbl +=			"<button class='btn btn-circle yellow btn-outline btn-sm dropdown-toggle' title='Editar' id='bt_editar"+v.id_recorrido+"' onclick='javascript: BT_Editar("+ v.id_recorrido+ ")' type='button' data-toggle='dropdown'>";
				tbl +=			"<span class='fa fa-pencil-square-o fa-lg'></span></button>";
				tbl += 		"<a title='Guardar' id='bt_guardar"+v.id_recorrido+"' onclick='javascript: Modifica_Datos("+ v.id_recorrido+ ")'  style='display: none;' class='btn btn-circle green btn-outline icon-cloud-upload'></a></td>";
				tbl +=		"</div>";
				tbl += 		"<td><button id='pdf' class='btn btn-circle red btn-outline' onclick='javascript: TD("+v.id_recorrido+")'><i class='fa fa-file-text-o fa-lg'></td>";
				tbl += 		"<tr>";
				$('#Tabla_Recorrido').append(tbl);
				$("#campo"+v.id_recorrido).val(v.campo);
				$("#BoxTipoPago"+v.id_recorrido).val(v.tipo_pago);
				$("#BoxEstado"+v.id_recorrido).val(v.estado);
			})	
	add();
}

//Cargo Datos	
function LoadInfo() {
	$.getJSON("/simpleWeb/json/AGRO/GET_RECORRIDO/", function(data) {
		recorrido = data;
		loadTabla(data);
	});
	$("#loading").hide();	
}
//*--------------------*//
/* Al apretar el boton cambiara el estado de la variable, para ver si se esta realizando 2 acciones a la vez */
$('#Agregar').click(function() {
	tabla = true;
})

//*--------------------*//
function AgregarFila_Tabla(){	
	t = "";
	if (tabla == false){
			if (compara == false){
			t += "<tr>";
			t += 		"<td><select type='text' id='campo'  class='form-control input-sm' style='min-height: 34px; min-width:172px;'>"+SelectCampo()+" </select></td>";
			t += 		"<td><input type='text' id='detalle' style='min-height: 34px; min-width:172px;' placeholder='Ingrese Bus'></td>";
			t += 		"<td><input type='text' id='chofer' style='min-height: 34px; min-width:172px;' placeholder='Ingrese un Chofer'></td>";
			t += 		"<td><input type='text' id='tipo_vehiculo' style='min-height: 34px; min-width:172px;' placeholder='Ingrese Tipo de Vehículo'></td>";
			t += 		"<td><input type='text' id='patente' style='min-height: 34px; min-width:172px;' placeholder='Ingrese Patente'></td>";
			t += 		"<td><input type='text' id='origen' style='min-height: 34px; min-width:172px;' placeholder='Indique un Origen'></td>";
			t += 		"<td><input type='text' id='destino' style='min-height: 34px; min-width:172px;' placeholder='Indique un Destino'></td>";
			t += 		"<td><input type='text' id='responsable' style='min-height: 34px; min-width:172px;' placeholder='Ingrese Responsable'></td>";
			t += 		"<td><input type='number' id='cantidad_persona' min='0' onkeypress='return justNumbers(event);' style='min-height: 34px; min-width:172px;'></td>";
			t += 		"<td><input type='time' id='horario_salida' onkeypress='return justNumbers(event);' style='min-height: 34px; min-width: 172px; '></td>";
			t += 		"<td><input type='time' id='horario_llegada' onkeypress='return justNumbers(event);' style='min-height: 34px; min-width: 172px;'></td>";
			t +=		"<td><select id='BoxTipoPago' class='form-control input-sm' style='min-height: 34px; min-width:172px;'>" +
						"<option value='' disabled selected hidden=''>Seleccione</option>"+
						"<option value=1>Diario</option>"+
						"<option value=2>Por Asiento</option>"+
						"</select>"+
						"</td>";
			t += 		"<td><input type='number' id='BoxTarifa' min='0' onkeypress='return justNumbers(event);' style='min-height: 34px; min-width:172px; min-width:172px;' placeholder='$'></td>"
			t +=		"<td><select id='BoxEstado' class='form-control input-sm' style='min-height: 34px; min-width:172px;'>" +
						"<option value='' disabled selected hidden=''>Seleccione</option>"+
						"<option value=1>Activo</option>"+
						"<option value=2>Inactivo</option>"+
						"</select>"+
						"</td>";
			t += 		"<td><input type='number' onkeypress='return justNumbers(event);' min='0' max='100' id='BoxPorcentaje' style='min-height: 34px; min-width:172px;' placeholder='0 - 100%'></td>"
			t += 		"<td><input type='date' id='BoxDesde' name='fecha' class='form-control' style='min-height: 34px; min-width:172px;'></td>"
			t += 		"<td><input type='date' id='BoxHasta' name='fecha' style='min-height: 34px; min-width:172px;'></td>"			
			t +=		"<td>";
			t +=			"<button class='btn btn-circle yellow btn-outline btn-sm dropdown-toggle' title='Editar' id='bt_editar' onclick='javascript: BT_Editar(\"\")' style='display: none;' type='button' data-toggle='dropdown'>";
			t +=			"<span	 class='fa fa-pencil-square-o fa-lg'></span></button>";
			t += 			"<button class='btn btn-circle green btn-outline icon-cloud-upload' title='Guardar' id='bt_guardar' onclick='javascript: BT_Guardar(\"\")'  ></button></td>";
			t +=		"</tr>";
			$('#Tabla_Recorrido').append(t);
			}else{
				alerta("Termine de Modificar para crear otro registro");
			}
	}else{
		alerta("Termine de ingresar el Registro para crear otro");
	}
}
	
// Guardo Datos	
function Guardar_Datos(){
	var descripcion={
			campo : $('#campo').val(),
			detalle : $('#detalle').val(),
			chofer : $('#chofer').val(),
			tipo_vehiculo : $('#tipo_vehiculo').val(),
			patente : $('#patente').val(),
			origen : $('#origen').val(),
			destino : $('#destino').val(),
			responsable : $('#responsable').val(),
			cantidad_persona : $('#cantidad_persona').val(),
			horario_salida : $('#horario_salida').val(),
			horario_llegada : $('#horario_llegada').val(),
			tipo_pago:$("#BoxTipoPago").val(),
			tarifa : $('#BoxTarifa').val(),
			estado:$("#BoxEstado").val(),
			porcentaje:$("#BoxPorcentaje").val(),
			vigencia_desde : $('#BoxDesde').val(),
			vigencia_hasta : $('#BoxHasta').val()
	}
	$.ajax({
		url: "/simpleWeb/json/AGRO/ADDRECORRIDO/",
		type: "PUT",
		data: JSON.stringify(descripcion),
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},success:function(){
			alerta("Datos guardados satisfactoriamente")
		}
	})
			LoadInfo();
}

//Modifico Datos
function Modifica_Datos(id_recorrido){
	var registro={
			id_recorrido : id_recorrido,
			campo : $("#campo"+id_recorrido).val(),
//			campo : $('#campo'+id_recorrido).val(),
			detalle : $('#detalle'+id_recorrido).val(),
			chofer : $('#chofer'+id_recorrido).val(),
			tipo_vehiculo : $('#tipo_vehiculo'+id_recorrido).val(),
			patente : $('#patente'+id_recorrido).val(),
			origen : $('#origen'+id_recorrido).val(),
			destino : $('#destino'+id_recorrido).val(),
			responsable : $('#responsable'+id_recorrido).val(),
			cantidad_persona : $('#cantidad_persona'+id_recorrido).val(),
			horario_salida : $('#horario_salida'+id_recorrido).val(),
			horario_llegada : $('#horario_llegada'+id_recorrido).val(),
			tipo_pago:$("#BoxTipoPago"+id_recorrido).val(),
			tarifa : $('#BoxTarifa'+id_recorrido).val(),
			estado:$("#BoxEstado"+id_recorrido).val(),
			porcentaje:$("#BoxPorcentaje"+id_recorrido).val(),
			vigencia_desde : $('#BoxDesde'+id_recorrido).val(),
			vigencia_hasta : $('#BoxHasta'+id_recorrido).val()
	}
	$.ajax({
			url:"/simpleWeb/json/AGRO/UPRECORRIDO/",
			async: false,
			type : "PUT",
			data : JSON.stringify(registro),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
				alerta("Datos Modificados Satisfactoriamente");
			}
		})
		$('#Tabla_Recorrido').html("");
			LoadInfo();
		$('#loading').hide();
		compara = false;
		tabla = false;
}
			
//	--------CARGO FILTRO CAMPO-----------				
	var selectCampo = "<option value='0'>Todos</option>";
	$.each(SESION.campo, function(ks,va){
		selectCampo += "<option value='"+va.campo+"'>"+va.descripcion+"</option>";
	})
	$("#BoxCampo").append(selectCampo);	

// /*------------------------------------- 
	
function SelectCampo(){
		var varcampo = "<option value='0'> Seleccione </option>";
		$.each(SESION.campo, function(k,v){
			varcampo += "<option value="+v.campo+">"+v.descripcion+"</option>";
		})
		return varcampo;
}

//PONGO LOS TEXTBOX HABILIDATOS
function BT_Editar(codigo){
	
	if(compara == false){
			if(tabla == false){
			$('#bt_guardar'+codigo).show();
			$('#bt_editar'+codigo).hide();
			
			$("#campo"+codigo).prop("disabled", false);
			$("#detalle"+codigo).prop("disabled", false);
			$("#chofer"+codigo).prop("disabled", false);
			$("#tipo_vehiculo"+codigo).prop("disabled", false);
			$("#patente"+codigo).prop("disabled", false);
			$("#origen"+codigo).prop("disabled", false);
			$("#destino"+codigo).prop("disabled", false);
			$("#responsable"+codigo).prop("disabled", false);
			$("#cantidad_persona"+codigo).prop("disabled", false);
			$("#horario_salida"+codigo).prop("disabled", false);
			$("#horario_llegada"+codigo).prop("disabled", false);
			$("#BoxTipoPago"+codigo).prop("disabled",false);
			$("#BoxTarifa"+codigo).prop("disabled",false);
			$("#BoxEstado"+codigo).prop("disabled",false);
			$("#BoxPorcentaje"+codigo).prop("disabled",false);
			$("#BoxDesde"+codigo).prop("disabled",false);
			$("#BoxHasta"+codigo).prop("disabled",false);
			compara = true;
			}else{
				alerta("Termine de ingresar registro para modificar");
			}
	}else{
		alerta("Termine de Modificar, antes de iniciar otra modificación.")
	}
}

//PONGO LOS TEXTBOX DESABILIDATOS
function BT_Guardar(codigo){
		$('#bt_editar'+codigo).show();
		$('#bt_guardar'+codigo).hide();	
		$("#campo"+codigo).prop("disabled", true);
		$("#detalle"+codigo).prop("disabled", true);
		$("#chofer"+codigo).prop("disabled", true);
		$("#tipo_vehiculo"+codigo).prop("disabled", true);
		$("#patente"+codigo).prop("disabled", true);
		$("#origen"+codigo).prop("disabled", true);
		$("#destino"+codigo).prop("disabled", true);
		$("#responsable"+codigo).prop("disabled", true);
		$("#cantidad_persona"+codigo).prop("disabled", true);
		$("#horario_salida"+codigo).prop("disabled", true);
		$("#horario_llegada"+codigo).prop("disabled", true);
		$("BoxTarifaPago"+codigo).prop("disabled",true);
		$("#BoxTarifa"+codigo).prop("disabled",true);
		$("#BoxEstado"+codigo).prop("disabled",true);
		$("#BoxPorcentaje"+codigo).prop("disabled",true);
		$("#BoxDesde"+codigo).prop("disabled",true);
		$("#BoxHasta"+codigo).prop("disabled",true);
		compara = false;
		tabla = false;
		Guardar_Datos();
}



var table = [];
var detalle;
function filterTable(){
	table = [];
	$('#Tabla_Recorrido').html("");
	var campo = $("#BoxCampo").val();
	if(!campo){campo=0}
	var estado = $("#Estado").val();
	if(!estado){estado=0}
	$.each(recorrido, function(k,v){
		if(campo == 0 && estado==0){
			llenarTabla(v);
		}else{
			for(var i = 0; i < campo.length; i++){
				if(campo[i] != 0 && campo[i] == v.campo){
					llenarTabla(v);
				}
			}
			for(var i=0; i< estado.length; i++){
				if(estado[i] !=0 && estado[i] == v.estado){
					llenarTabla(v);
				}
			}
		}
	})
}

function llenarTabla(vr){
	$('#Tabla_Recorrido').html("");			
		if(table.length != 0){
			$.each(table, function(ka,va){
				if(table.indexOf(vr)==-1){
					table.push(vr);
			}
		})
	}else{
		table.push(vr);
	}
	$.each(table, function(k,v){
		var tbl = "";
		tbl += "<tr>";
		tbl += 		"<td><select type='text' id='campo"+v.id_recorrido+"' value='"+v.campo+"' class='form-control' style='min-height: 34px; min-width:172px;' disabled>"+SelectCampo()+"</select></td>";	
		tbl += 		"<td><input type='text' id='detalle"+v.id_recorrido+"' value='"+v.detalle+"' style='min-height: 34px; min-width:172px;' disabled></td>";
		tbl += 		"<td><input type='text' id='chofer"+v.id_recorrido+"' value='"+v.chofer+"' style='min-height: 34px; min-width:172px;' disabled></td>";
		tbl += 		"<td><input type='text' id='tipo_vehiculo"+v.id_recorrido+"' value='"+v.tipo_vehiculo+"' style='min-height: 34px; min-width:172px;' disabled></td>";
		tbl += 		"<td><input type='text' id='patente"+v.id_recorrido+"' value='"+v.patente+"' style='min-height: 34px; min-width:172px;' disabled></td>";
		tbl += 		"<td><input type='text' id='origen"+v.id_recorrido+"' value='"+v.origen+"' style='min-height: 34px; min-width:172px;' disabled></td>";
		tbl += 		"<td><input type='text' id='destino"+v.id_recorrido+"' value='"+v.destino+"' style='min-height: 34px; min-width:172px;' disabled></td>";
		tbl += 		"<td><input type='text' id='responsable"+v.id_recorrido+"' value='"+v.responsable+"' style='min-height: 34px; min-width:172px;' disabled></td>";
		tbl += 		"<td><input type='number' id='cantidad_persona"+v.id_recorrido+"' min='0' value='"+v.cantidad_persona+"' onkeypress='return justNumbers(event);' style='min-height: 34px; min-width:172px;' disabled></td>";
		tbl += 		"<td><input type='time' id='horario_salida"+v.id_recorrido+"' value='"+v.horario_salida+"' onkeypress='return justNumbers(event);' style='min-height: 34px; min-width: 172px;' disabled></td>";
		tbl += 		"<td><input type='time' id='horario_llegada"+v.id_recorrido+"' value='"+v.horario_llegada+"' onkeypress='return justNumbers(event);' style='min-height: 34px; min-width: 172px;' disabled></td>";
		tbl +=		"<td><select id='BoxTipoPago"+v.id_recorrido+"' class='form-control input-sm' style='min-height: 34px; min-width:172px;' disabled>" +
							"<option value='' disabled selected hidden=''>Seleccione</option>"+
							"<option value=1>Diario</option>"+
							"<option value=2>Por Asiento</option>"+
						"</select>"+
					"</td>";
		tbl += 		"<td><input type='number' id='BoxTarifa"+v.id_recorrido+"' min='0' calss='form-control' value='"+v.tarifa+"' min='0' onkeypress='return justNumbers(event);' style='min-height: 34px; min-width:172px;' disabled></td>"
		tbl +=		"<td><select id='BoxEstado"+v.id_recorrido+"' class='form-control input-sm' style='min-height: 34px; min-width:172px;' disabled>" +
					"<option value='' disabled selected hidden=''>Seleccione</option>"+
					"<option value=1>Activo</option>"+
					"<option value=2>Inactivo</option>"+
					"</select>"+
					"</td>";
		tbl += 		"<td><input type='number' onkeypress='return justNumbers(event);' id='BoxPorcentaje"+v.id_recorrido+"' min='0' max='100' value='"+v.porcentaje+"' style='min-height: 34px; min-width:172px;' disabled></td>"
		tbl += 		"<td><input type='date' id='BoxDesde"+v.id_recorrido+"' name='fecha' calss='form-control' value='"+v.vigencia_desde+"' min='0' style='min-height: 34px; min-width:172px;' disabled></td>"
		tbl += 		"<td><input type='date' id='BoxHasta"+v.id_recorrido+"' neme='fecha' calss='form-control' value='"+v.vigencia_hasta+"' max='100' style='min-height: 34px; min-width:172px;' disabled></td>"
		
		tbl +=		"<td><div class='dropdown dropleft' style='float: left;'>";
		tbl +=			"<button class='btn btn-circle yellow btn-outline btn-sm dropdown-toggle' title='Editar' id='bt_editar"+v.id_recorrido+"' onclick='javascript: BT_Editar("+ v.id_recorrido+ ")' type='button' data-toggle='dropdown'>";
		tbl +=			"<span class='fa fa-pencil-square-o fa-lg'></span></button>";
		tbl += 		"<a title='Guardar' id='bt_guardar"+v.id_recorrido+"' onclick='javascript: Modifica_Datos("+ v.id_recorrido+ ")'  style='display: none;' class='btn btn-circle green btn-outline icon-cloud-upload'></a></td>";
		tbl +=		"</div></tr>";
		$('#Tabla_Recorrido').append(tbl);
		$("#campo"+v.id_recorrido).val(v.campo)
		$("#BoxTipoPago"+v.id_recorrido).val(v.tipo_pago);
		$("#BoxEstado"+v.id_recorrido).val(v.estado);
	})
}

function TD(codigo){
	Pop();
	var tbl="" ;
	$.ajax({
		url: "/simpleWeb/json/AGRO/GET_HRECORRIDO/"+codigo,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			tb_recorrido = data;	
			$.each(tb_recorrido, function(k,v){	
				var json={
					campo:v.campo,
					detalle:v.detalle,
					chofer:v.chofer,
					rut:v.rut,
					tipo_vehiculo:v.tipo_vehiculo,
					patente:v.patente,
					origen:v.origen,
					destino:v.destino,
					responsable:v.responsable,
					cantidad_persona:v.cantidad_persona,
					horario_salida:v.horario_salida,
					horario_llegada:v.horario_llegada,
					tipo_pago:v.tipo_pago,
					tarifa:v.tarifa,
					estado:v.estado,
					porcentaje:v.porcentaje,
					vigencia_desde:v.vigencia_desde,
					vigencia_hasta:v.vigencia_hasta
				}
				console.log(json)
				var tbl = "";
					tbl += "<tr>";
					tbl +='<td>'+v.descripcion+'</td>';
					tbl +='<td>'+v.detalle+'</td>';
					tbl +='<td>'+v.chofer+'</td>';
					tbl +='<td>'+v.tipo_vehiculo+'</td>';
					tbl +='<td>'+v.patente+'</td>';
					tbl +='<td>'+v.origen+'</td>';
					tbl +='<td>'+v.destino+'</td>';
					tbl +='<td>'+v.responsable+'</td>';
					tbl +='<td>'+v.cantidad_persona+'</td>';
					tbl +='<td>'+v.horario_salida+'</td>';
					tbl +='<td>'+v.horario_llegada+'</td>';
					tbl +='<td>'+v.tipo_pago+'</td>';
					tbl +='<td>'+v.tarifa+'</td>';
					tbl +='<td>'+v.estado+'</td>';				
					tbl +='<td>'+v.porcentaje+'</td>';
					tbl +='<td>'+v.vigencia_desde+'</td>';
					tbl +='<td>'+v.vigencia_hasta+'</td>';
					tbl += "</tr>";
					$('#Recorrido').append(tbl);
			})
		}
	})
}


function Pop() {
	var tbl = "";
	var titulo = "Registro Histórico"
	var html = '<div class="col-xs-12 col-md-12 col-lg-12" id="formProductor">'
			+ '<div class="box-datos-generales" style="width: 100%">'
			+ '<div class="col-xs-12 col-md-12 col-lg-12">'

			+ '<table class="table table-bordered table-hover table-striped table-condensed" id="Table_recorrido">'
			+ '<tr>'
			+ '<th style="min-width: 100px;">Campo</th>'
			+ '<th style="min-width: 70px;">Bus</th>'
			+ '<th style="min-width: 7px;">Chofer</th>'
			+ '<th style="min-width: 70px;">Tipo Vehículo</th>'
			+ '<th style="min-width: 70px;">Patente</th>'
			+ '<th style="min-width: 70px;">Origen</th>'
			+ '<th style="min-width: 70px;">Destino</th>'
			+ '<th style="min-width: 70px;">Responsable</th>'
			+ '<th style="min-width: 70px;">Cant. Personas</th>'
			+ '<th style="min-width: 70px;">Horario Salida</th>'
			+ '<th style="min-width: 70px;">Horario Llegada</th>'
			+ '<th style="min-width: 70px;">Tipo Pago</th>'
			+ '<th style="min-width: 70px;">Tarifa</th>'
			+ '<th style="min-width: 70px;">Estado</th>'
			+ '<th style="min-width: 70px;">Porcentaje Rendimiento</th>'
			+ '<th style="min-width: 100px;">Vigencia Desde</th>'
			+ '<th style="min-width: 100px;">Vigencia Hasta</th>'
			+ '</tr>'
			+ '<tbody id="Recorrido"></tbody>'
			+ '</table>'
			+ '<div class="btn btn-circle red btn-outline" id="cancelar" onclick="closeModal();">Cerrar</div>'
			+ '</div></div></div>'
	popUp(titulo, html, true, "1600px", false);
}