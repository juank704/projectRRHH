$(document).ready(function() {
	$.fn.dataTable.ext.errMode = 'none';
	$('#loading').hide();
	loadInfo();
});

var detalle_servicio;
var TablaServicio = $("#Div_TableServicio").html();
var SESION=getVars();
var MAQUINARIA = loadMaquinaria();

function LimpiarTabla() {
	$("#Div_TableServicio").html("");
	$("#Div_TableServicio").html(TablaServicio);
	$('#BodyServicio').html("");
}

function SelectCampo(){
	var varcampo = "<option value='' disabled selected hidden=''> Seleccione </option>";
	$.each(SESION.campo, function(k,v){
		varcampo += "<option value="+v.campo+">"+v.descripcion+"</option>";
	})
	return varcampo;
}
function cargarMaquinaria(){
	var maquinaria = "<option value='' disabled selected hidden=''>Seleccione</option>";
	$.each(MAQUINARIA, function(k,v){
		maquinaria += "<option value="+v.codigo+">"+v.descripcion+"</option>";
	})
	return maquinaria;
}

function loadTabla(data) {
	var tbl = "";
	$.each(data,function(k, v) {
		var tipo;
		if(v.tipo_servicio==1){
			tipo= "Servicio 1";
		}else if(v.tipo_servicio==2){
			tipo="Servicio 2";
		}else if(v.tipo_servicio==3){
			tipo="Servicio 3";
		}
		$('#BodyServicio').html("");
						tbl += "<tr>";
						tbl += "<td>"+v.fecha+"</td>";
						tbl += "<td>"+v.nvcampo+"</td>";
						tbl += "<td>"+v.nvmaquina+"</td>";
						tbl += "<td>"+tipo+"</td>";
						tbl += "<td>"+v.horometro+"</td>";
						tbl +=		"<td><button title='Recepción'  onclick=\"javascript:ModificaPopUP("+v.orden_ingreso+")\" class='btn btn-circle green btn-outline btn-sm  margin-left-7'><i class='fa fa-pencil-square-o fa-lg'></i></button></td>";						
						tbl += "</tr>";
					})
	$('#BodyServicio').html(tbl);
}
function loadInfo() {
	$.getJSON("/simpleWeb/json/AGRO/GET_ServicioExterno_Envio/", function(data) {
		detalle_servicio = data;
		loadTabla(data);
		$('#Table_Servicio').DataTable({
			"sPaginationType" : "full_numbers",
			"filter" : false
		});
	});
	$("#loading").hide();
}

function Guardar (){
	LimpiarTabla();
	dato={
			campo: $('#BoxCampo').val(),
			maquina:$('#BoxMaquina').val(),
			tipo_servicio: $('#tipo_servicio').val(),
			horometro:$('#horometro').val(),
			fecha:formatFecha($('#fecha').val())
	}
	console.log(dato)
	$.ajax({
			url : "/simpleWeb/json/AGRO/ADD_ServicioExterno/",
			type : "PUT",
			data : JSON.stringify(dato),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
		},success:function(){
			closeModal();
			LimpiarTabla();
			$('#BodyServicio').html();
			alerta("Servicio Enviado Correctamente");
			loadInfo();
		}
	})
}

function PopUP(orden_ingreso){
	var campo="";
	var maquina="";
	var fecha = "";
	var tipo_servicio = "";
	var horometro = "";
	var titulo = "Solicitud Envió";
	var boton;
	orden_ingreso = "";
		boton = '<div class="btn btn-circle blue btn-outline" id="Guardar"  onclick="Guardar()" >Registrar</div>';

		  var html = 
			  '<div class="col-xs-12 col-md-12 col-lg-12" id="formProductor">'
			+ '<div class="box-datos-generales" style="width:100%">'
			+ '<div class="col-xs-12 col-md-12 col-lg-12 portlet light bordered">'	

			+ '<div class="col-xs-12 col-md-4 col-lg-4 portlet light bordered">'
			+ '<h4>Campo</h4>'
			+ '<select id="BoxCampo'+orden_ingreso+'" class="form-control input-sm" style="height: 30px;">"'+SelectCampo()+'"</select>'
			+ '</div>'
			
			+ '<div class="col-xs-6 col-md-4 col-lg-4 portlet light bordered">'
			+ '<h4>Fecha</h4>'
			+ '<input id="fecha'+orden_ingreso+'" type="text" name="fecha" class="form-control" readonly placeholder="dd-mm-aa" style="height: 30px;">'
			+ '<input type="hidden" id="codigoEdit" value="'+orden_ingreso+'">'
			+ '</div>'	
			
			+ '<div class="col-xs-12 col-md-4 col-lg-4 portlet light bordered">'
			+ '<h4>Maquinaria</h4>'
			+ '<select id="BoxMaquina'+orden_ingreso+'" class="form-control input-sm" style="height: 30px;">"'+cargarMaquinaria()+'"</select>'
			+ '</div>'
			
			+ '<div class="col-xs-12 col-md-4 col-lg-4 portlet light bordered">'
			+ '<h4>Tipo de Servicio</h4>'
			+ '<select id="tipo_servicio'+orden_ingreso+'" class="form-control" style="height: 30px;">'
			+ '<option value="" disabled selected hidden="">Seleccione</option>'
			+ '<option value=1>Servicio1</option>'
			+ '<option value=2>Servicio2</option>'
			+ '<option value=3>Servicio3</option>'
			+ '</select>'
			+ '</div>'	
		  
		  	+ '<div class="col-xs-12 col-md-4 col-lg-4 portlet light bordered">'
			+ '<h4>Horómetro</h4>'
			+ '<input id="horometro'+orden_ingreso+'" onkeypress="return justNumbers(event);"  class="form-control" placeholder="Ingrese Horómetro" style="height: 30px;">'
			+ '</div>'
			+ '</div>'
			+ '</div>'
			+ '<div class="col-xs-12 col-md-12 col-lg-12 portled">'+boton
			+ '<div class="btn btn-circle red btn-outline" id="cancelarFormaAp" onclick="closeModal();">Cancelar</div>'
			+ '</div>' + '</div>';
		  popUp(titulo, html, true, "730px", false);
		  fechas();
		  $('#BoxCampo'+orden_ingreso).val(campo);
		  $('#BoxMaquina'+orden_ingreso).val(maquina);		
}



function Modificar(orden_ingreso){
	LimpiarTabla();
	datos={
		orden_ingreso:orden_ingreso,
		horometro_recepcionado: $('#BoxHorometroRecepcion'+orden_ingreso).val(),
		fecha_llegada:formatFecha($('#BoxFechaLlegada'+orden_ingreso).val()),
		costo_servicio:$('#BoxCostoServicio'+orden_ingreso).val()
	}
	$.ajax({
		url : "/simpleWeb/json/AGRO/UP_ServicioExterno/",
		type : "PUT",
		data : JSON.stringify(datos),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
	},success: function(){
		closeModal();
		LimpiarTabla();
		$('#BodyServicio').html();		
		alerta("Recepcionado Correctamente");
		loadInfo();
		}
	})
	loadInfo();
}

function ModificaPopUP(orden_ingreso){
	var fecha_llegada = "";
	var costo_servicio = "";
	var horometro_recepcionado = "";
	var boton;
	var	titulo = "Generar Recepción";
		boton = '<div class="btn btn-circle blue btn-outline" id="BTGuardarRecepcion" onclick="Modificar('+orden_ingreso+')" >Guardar</div>'
		$.each(detalle_servicio, function(ka, va) {
			if (orden_ingreso == va.orden_ingreso) {	
				fecha_llegada = va.fecha_llegada;
				costo_servicio = va.costo_servicio;
				horometro_recepcionado = va.horometro_recepcionado;	
			}
		})
	  var html = 
		  '<div class="col-xs-12 col-md-12 col-lg-12 portlet light bordered" id="formProductor">'
		+ '<div class="box-datos-generales" style="width: 100%">'
		+ '<div class="col-xs-12 col-md-12 col-lg-12">'
		+ '<div class="col-xs-12 col-md-12 col-lg-12 portlet">'
		+ '<h4>Fecha Llegada:</label>'
		+ '<input id="BoxFechaLlegada'+orden_ingreso+'" type="text" name="fecha" class="form-control" readonly placeholder="Seleccione Fecha">'
		+ '<input type="hidden" id="codigoEdit" value="'+orden_ingreso+'">'
		+ '</div>'		
		+ '<div class="col-xs-12 col-md-12 col-lg-12 portlet">'
		+ '<h4>Costo Servicio</h4>'
		+ '<input id="BoxCostoServicio'+orden_ingreso+'" value="'+costo_servicio+'" onkeypress="return justNumbers(event);" class="form-control" placeholder="Ingrese Costo del Servicio">'
		+ '</div>'	
		+ '<div class="col-xs-12 col-md-12 col-lg-12 portlet">'
		+ '<h4>Horómetro Recepcionado</h4>'
		+ '<input id="BoxHorometroRecepcion'+orden_ingreso+'" value="'+horometro_recepcionado+'" onkeypress="return justNumbers(event);" class="form-control" placeholder="Ingrese Horómetro">'
		+ '</div>'
		+ '</div>'
		+ '</div>' 
		+ '<div class="col-xs-12 col-md-12 col-lg-12 portled">'+boton
		+ '<div class="btn btn-circle red btn-outline" id="cancelarFormaAp" onclick="closeModal();">Cancelar</div>'
		+ '</div>' + '</div>';
	  popUp(titulo, html, true, "420px", false);
	  fechas();
}