$(document).ready(function(){
	cargaCampos();
	$(".select2.select2-container.select2-container--bootstrap").attr("style", "");
})
var campo_especie;
$.ajax({
	url: "/simpleWeb/json/AGRO/Get_CampoEspecie/",
	type:	"GET",
	dataType: 'json',
	async: false,
	success: function(data){
		campo_especie = data;
	}
})
var aux = [];
var rg = [];
var SESION = getVars();
console.log(SESION.idUser);
var trabajadoresCuadrilla = [];
var CUARTEL = getCuartel();
var laborBloqueo = [];
var datosActuales;
var CAMPO;
function recorrer(campo){
	var especie_rendimiento = "<option value=''>Seleccione Especie</option>";
	var especies = [];
	$.each(CUARTEL, function(k,v){
		if(v.campo == campo){
			$.each(SESION.variedad, function(ka,va){
				if(va.codigo == v.variedad){
					$.each(SESION.especie, function(kb,vb){
						if(va.especie == vb.codigo && especies.indexOf(vb.codigo) == -1){
							especies.push(vb.codigo);
							especie_rendimiento += "<option value="+vb.codigo+">"+vb.especie+"</option>";
						}
					})
				}
			})
		}
	})
	$('#especie_incidencia').html(especie_rendimiento);
}
function cargaCampos(){
	$('#campo_incidencia').html("");
	var campo_rendimiento = "<option value=''>Seleccione Campo</option>";
	
	console.log(SESION.campo);
	$.each(SESION.campo, function( key, val ) {
		campo_rendimiento += "<option value="+val.campo+">"+val.descripcion+"</option>";
	});
	$('#campo_incidencia').html(campo_rendimiento);
	loading.hide();
}
function cambioCampo(campo){
	var cuartel_incidencia = "<option value=''>Seleccione</option>";
	var especie_rendimiento = "<option value=''>Seleccione Especie</option>";
	$.each(SESION.sector, function(k,v){
		if(v.campo == campo){
			$.each(CUARTEL, function(ka,va){
				if(va.sector == v.sector){
					
					cuartel_incidencia += "<option value='"+va.codigo+"'>"+va.nombre+"</option>";
				}
			})
		}
	})
	$.each(campo_especie, function(kb,vb){
		if(vb.codigo_campo == campo){
			$.each(SESION.especie, function(k,v){
				if(v.codigo == vb.codigo_especie){
					especie_rendimiento += "<option value="+v.codigo+">"+v.especie+"</option>";
				}
			});
		}
	});
	$('#especie_incidencia').html(especie_rendimiento);
	$("#cuartel_incidencia").html(cuartel_incidencia);
	
}

function cambioVariedad(variedad){
	var campo = $("#campo_incidencia").val();
	var cuartel_rendimiento = "<option value=''>Seleccione</option>";
	$.each(CUARTEL, function(ka,va){
		if(va.variedad == variedad && va.campo == campo){
			cuartel_rendimiento += "<option value='"+va.codigo+"'>"+va.nombre+"</option>";
		}
	})
	$("#cuartel_incidencia").html(cuartel_rendimiento);
}

function cambioEspecie(especie){
	var variedad_rendimiento = "<option value=''>Seleccione Variedad</option>";
	$.each(SESION.variedad, function(k,v){
		if(v.especie == especie){
			variedad_rendimiento += "<option value='"+v.codigo+"'>"+v.variedad+"</option>";
			if(v.especie == ""){
				variedad_rendimiento = "<option value=''>Sin Variedad</option>";
			}
		}
	})
	$("#variedad_incidencia").html(variedad_rendimiento);
	if($("#campo_incidencia").val()){
	}
}

function addIncidencia(){
	if(!$("#fecha_incidencia").val()){
		alerta("No ha seleccionado una fecha");
		return;
	}else if(!$("#campo_incidencia").val()){
		alerta("No ha seleccionado un Campo");
		return;
	}else if(!$("#especie_incidencia").val()){
		alerta("Debe seleccionar una especie");
		return;
	}else if(!$("#variedad_incidencia").val()){
		alerta("Debe seleccionar una variedad");
		return;
	}else if(!$("#cuartel_incidencia").val()){
		alerta("Debe seleccionar una Cuartel");
		return;
	} else{
		loading.show();
		var json = {
			codigo: 0,
			fecha_ingreso: formatFecha($("#fecha_incidencia").val()),
			tipo_incidencia: $("#tipo_incidencia :selected").text(),
			cuartel: $("#cuartel_incidencia").val(),
			campo: $("#campo_incidencia").val(),
			observacion: $('#observacion').val(),
			usuario_ingreso : SESION.idUser,
			img : nombre+".jpg"
		}
		$.ajax({
			url : "/simpleWeb/json/AGRO/INSERT_INCIDENCIAS/",
			type : "PUT",
			data : JSON.stringify(json),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept","application/json");
				xhr.setRequestHeader("Content-Type","application/json");
			},
			success : function(data, textStatus, jqXHR) {
				loading.hide();
				$("#fecha_incidencia").val('');
				$("#campo_incidencia").val('').trigger('change');
				$("#especie_incidencia").val('').trigger('change');
				$("#variedad_incidencia").val('').trigger('change');
				$("#cuartel_incidencia").val('').trigger('change');
				$("#tipo_incidencia").val('1').trigger('change');
				$("#observacion").val('');
				var a = alerta("Datos guardados exitosamente");
				
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alerta("No se ha podido registrar la infomacion, consulte con el administrador del sistema");
			}
		});
	}
}

function tblCampo(cuartel){
	var campo;
	$.each(CUARTEL, function(k,v){
		if(v.codigo == cuartel){
			$.each(SESION.campo, function(ka,va){
				if(v.campo == va.campo){
					campo = v.descripcion;
				}
			})
		}
	})
	return campo;
}

function runEffect() {
	var selectedEffect = "slide";
	var options = {
		direction: "up"
	}
	$("#agregar_datos_comunes").show(selectedEffect, options, 500, callback);
}
function callback() {
	setTimeout(function() {
		$("#effect:visible").removeAttr("style").fadeOut();
	}, 1000);
};

function cargarTablaMiembros(v){
	var body_Miembros = "";
	body_Miembros += "<tr id='tr"+v.idTrabajador+"'>";
	body_Miembros += 	"<td>"+v.idTrabajador+"</td>";
	body_Miembros += 	"<td>"+v.rut+"</td>";
	body_Miembros += 	"<td>"+v.nombre+"</td>";
	body_Miembros += 	"<td><a onclick='javascript: deleteTrab("+v.idTrabajador+");' title='Eliminar' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-minus'></i></a></td>";
	body_Miembros += 	"<td><select id='dotacion"+v.idTrabajador+"' class='btn blue btn-outline btn-circle btn-sm' onchange='selectDotacion(this, "+v.idTrabajador+");'><option value='1'>Presente</option><option value='2'>Ausente</option></select></td>";
	body_Miembros += "</tr>";
	$("#body_Miembros").append(body_Miembros);
}
function block(){
	var min = $(".min");
	for(var i = 0; i < min.length; i++){
		$(min[i]).val("2018-06-04");
	}
}
function selectDotacion(input, id){
	if(input.value == 2){
		var Dotacion = "";
		Dotacion +=	'<div class="col-xs-12 col-sm-12 col-md-12" style="margin-bottom: 10px;">';
		Dotacion +=		'<div class="col-xs-12 col-sm-12 col-md-12">';
		Dotacion +=			'<div class="col-xs-12 col-sm-12 col-md-12">';
		Dotacion +=				'<h4>Motivo</h4>';
		Dotacion +=			'</div>';
		Dotacion +=			'<div class="col-xs-12 col-sm-12 col-md-12">';
		Dotacion +=				'<select class="btn blue btn-outline btn-circle btn-md" id="motivo'+id+'" onchange="changeMotivo(this, '+id+')"><option value="">Selecione</option><option value="1">Licencia</option><option value="2">Permiso</option><option value="3">Otro</option></select>';
		Dotacion +=			'</div>';
		Dotacion +=			'<div style="display: block;" id="horas'+id+'" class="col-xs-12 col-sm-12 col-md-12">';
		Dotacion +=				'<div class="col-xs-6 col-sm-6 col-md-6">';
		Dotacion +=					'<h4>Desde</h4>';
		Dotacion +=					'<input name="time" id="hora_desde'+id+'" type="time" class="form-control"/>';
		Dotacion +=				'</div>';
		Dotacion +=				'<div class="col-xs-6 col-sm-6 col-md-6">';
		Dotacion +=					'<h4>Hasta</h4>';
		Dotacion +=					'<input name="time" id="hora_hasta'+id+'" type="time" class="form-control"/>';
		Dotacion +=				'</div>';
		Dotacion +=			'</div>';
		Dotacion +=			'<div style="display: block;" id="fechaRango'+id+'" class="col-xs-12 col-sm-12 col-md-12">';
		Dotacion +=				'<div class="col-xs-6 col-sm-6 col-md-6">';
		Dotacion +=					'<h4>Desde</h4>';
		Dotacion +=					'<input name="fecha" id="fecha_desde'+id+'" type="text" class="form-control"/>';
		Dotacion +=				'</div>';
		Dotacion +=				'<div class="col-xs-6 col-sm-6 col-md-6">';
		Dotacion +=					'<h4>Hasta</h4>';
		Dotacion +=					'<input name="fecha" id="fecha_hasta'+id+'" type="text" class="form-control min"/>';
		Dotacion +=				'</div>';
		Dotacion +=			'</div>';
		Dotacion +=			'<div class="col-xs-12 col-sm-12 col-md-12">';
		Dotacion +=				'<h4>Observacion</h4>';
		Dotacion +=			'</div>';
		Dotacion +=			'<div class="col-xs-12 col-sm-12 col-md-12">';
		Dotacion +=				'<textarea id="observacion'+id+'" class="form-control input-circle"></textarea>';
		Dotacion +=			'</div>';
		Dotacion +=		'</div>';
		Dotacion +=	'</div>';
		Dotacion +=	'<div class="col-sm-6 col-md-6 ">';
		Dotacion +=		"<div class='btn btn-circle blue btn-outline' id='aceptar"+id+"' onclick='javascript: aceptarObs("+id+");'>Aceptar</div>";
		Dotacion +=	'</div>';
		Dotacion +=	'<div class="col-sm-6 col-md-6 ">';
		Dotacion +=		"<div class='btn btn-circle red btn-outline' onclick='javascript: cancelDotacion("+id+");'> Cancelar</div>";
		Dotacion +=	'</div>';
		popUp("Observaciones", Dotacion, true, "400px", false);
		block()
	}else{
		//TODO
		$.each(cuadrillaSelect.trab, function(k,v){
			if(v.idTrabajador == id){
				cuadrillaSelect.trab[k].idSociedad = 1;
				cuadrillaSelect.trab[k].cargo = 0;
				cuadrillaSelect.trab[k].descripcionTipoTrabajador = "";
			}
		})
	}
	console.log(cuadrillaSelect.trab);
}
function changeMotivo(input, id){
	if(input.value == 2){
		$("#horas"+id).show();
		$("#fechaRango"+id).hide();
		$("#fecha_desde"+id).val("");
		$("#fecha_hasta"+id).val("");
		horaPicker();
		fechas();
	}else{
		$("#fechaRango"+id).show();
		$("#horas"+id).hide();
		$("#fecha_desde"+id).val("");
		$("#fecha_hasta"+id).val("");
		horaPicker();
		fechas();
	}
}
function horaPicker(){
	var hora = document.getElementsByName("hora");
	for(var i = 0; i < hora.length; i++){
		$(hora[i]).timepicker();
	}
}
function cancelDotacion(id){
	$("#dotacion"+id).val(1);
	$.each(cuadrillaSelect.trab, function(k,v){
		if(v.idTrabajador == id){
			cuadrillaSelect.trab[k].idSociedad = 1;
			cuadrillaSelect.trab[k].cargo = 0;
			cuadrillaSelect.trab[k].descripcionTipoTrabajador = "";
			cuadrillaSelect.trab[k].fechaActualizacion = "";
			cuadrillaSelect.trab[k].fechaIngresoCompania = "";
			cuadrillaSelect.trab[k].direccion = "";
			cuadrillaSelect.trab[k].email = "";
		}
	})
	console.log(cuadrillaSelect)
	closeModal();
}
function aceptarObs(id){
	//TODO
	$.each(cuadrillaSelect.trab, function(k,v){
		if(v.idTrabajador == id){
			cuadrillaSelect.trab[k].idSociedad = 2; //asistencia
			cuadrillaSelect.trab[k].cargo = $("#motivo"+id).val(); //motivo
			cuadrillaSelect.trab[k].descripcionTipoTrabajador = $("#observacion"+id).val() //observacion
			cuadrillaSelect.trab[k].fechaActualizacion = $("#hora_desde"+id).val();
			cuadrillaSelect.trab[k].fechaIngresoCompania = $("#hora_hasta"+id).val();
			cuadrillaSelect.trab[k].direccion = formatFecha($("#fecha_desde"+id).val());
			cuadrillaSelect.trab[k].email = formatFecha($("#fecha_hasta"+id).val());
		}
	})
	closeModal();
}

function cambioCuartel(input){
	if(input.value != ""){
		$("#supervisor").prop("disabled", false);
		buscarCuadrillaSupervisor(input);
	}
}
function buscarCuadrillaSupervisor(input){
	var valFecha = $("#fecha_rendimiento").val();
	var fecha = formatFecha(valFecha)
	if(valFecha == ""){
		alerta("Debe seleccionar una fecha");
		loadSupervisor();
		loading.hide();
		return;
	}
	if($("#supervisor").val() != "" && $("#cuartel_rendimiento").val() != ""){
		loading.show();
		$.ajax({
			url: "/simpleWeb/json/AGRO/GET_RENDIMIENTO_GENERAL/"+fecha+"/"+$("#supervisor").val()+"/"+$("#cuartel_rendimiento").val(),
			type:	"GET",
			dataType: 'json',
			async: false,
			success: function(data){
				loading.hide();
				if(data.length != 0){
					if(data[0].codigo_cuadrilla == 0){
						var c = confirmar.confirm("Este Supervisor ya posee un rendimiento para la fecha seleccionada, pero no posee trabajadores. ¿Desea Agregarlos ahora?")
						$(c.aceptar).click(function(){
							datosActuales = data;

							replicarCuadrilla("1969-01-01");
							loadCuadrilla();
							rg = data[0];
							var selectedEffect = "slide";
							var options = {
								direction: "right"
							}
							$("#agregar_datos_comunes").hide();
							$("#body_Datos_Comunes").html("");
							$.each(data, function(k,v){
								$("#body_Datos_Comunes").html("");
								cambioFaena(v.faena);
								var body_Datos_Comunes = "";
								body_Datos_Comunes += "<tr>";
								body_Datos_Comunes +=	"<td>"+tblSupervisor(v.codigo_supervisor)+"</td>";
								body_Datos_Comunes +=	"<td>"+tblCampo(v.cuartel)+"</td>";
								body_Datos_Comunes +=	"<td>"+tblEspecie(v.especie)+"</td>";
								body_Datos_Comunes +=	"<td>"+tblVariedad(v.variedad)+"</td>";
								body_Datos_Comunes +=	"<td>"+tblCuartel(v.cuartel)+"</td>";
								body_Datos_Comunes +=	"<td>"+tblFaena(v.faena)+"</td>";
								body_Datos_Comunes +=	"<td>"+tblLabor(v.labor)+"</td>";
								body_Datos_Comunes +=	"<td>"+formatFecha(v.fecha)+"</td>";
								body_Datos_Comunes +=	"<td>"+v.valor+"</td>";
								body_Datos_Comunes +=	"<td>"+v.horas+"</td>";
								body_Datos_Comunes += "</tr>";
								$("#body_Datos_Comunes").append(body_Datos_Comunes);
							})
							$("#addCuadrilla").show(selectedEffect, options, 500, callback);
						})
						$(c.cancelar).click(function(){
							$("#supervisor").val("").trigger("change");
						})
					}else{
						$.ajax({
							url: "/simpleWeb/json/AGRO/GET_RENDIMIENTO_GENERAL_FECHA/"+fecha+"/"+$("#supervisor").val()+"/"+$("#cuartel_rendimiento").val(),
							type:	"GET",
							dataType: 'json',
							async: false,
							success: function(data){
								console.log(data)
								rg = data.rendimiento_general[0];
								loading.hide();
								if(data.rendimiento_general[0].estado == 4){
									alerta("Ya se ha ingresado un Rendimiento para esta fecha, y se encuentra cerrado");
									loadSupervisor();
									return;
								}
								if(data.trab.length != 0){
									console.log(data);
									var c = confirmar.confirm("Este Supervisor ya posee un rendimiento para la fecha seleccionada, ¿Desea Ir al Rendimiento?");
									$(c.aceptar).click(function(){
										window.location.href = ("rendimiento?cuadrilla="+fecha+"&supervisor="+data.supervisor+"&cuartel="+data.rendimiento_general[0].cuartel);
									})
									$(c.cancelar).click(function(){
										$("#supervisor").val("").trigger("change");
									})
								}
							},errror: function(er){
								alerta("Ha ocurrido un error interno del servidor, consulte con el administrador del sistema")
							}
						})
					}
				}
			},errror: function(er){
				alerta("Ha ocurrido un error interno del servidor, consulte con el administrador del sistema")
			}
		})
	}
}

$("#1").change(function(){
	upload("1");
});
var nombre = '';
function upload(idInput) {
	if($("#cuartel_incidencia").val() == '' || $("#cuartel_incidencia").val() == null){
		alerta("Debe seleccionar un cuartel para cargar la Imagen.");
		return false;
	}
	nombre = $("#cuartel_incidencia").val();
	var file_data = $("#" + idInput).prop("files")[0];
	var form_data = new FormData();

	var d = new Date();

	var month = d.getMonth() + 1;
	var day = d.getDate();
	var year = d.getFullYear();
	var min = d.getMinutes();
	var hour = d.getHours()
	var seconds = d.getSeconds();

	nombre = (nombre + "-" + year + "-" + month + "-" + day + "-"
			+ hour + "-" + min + "-" + seconds);
	console.log(nombre);
	form_data.append("file", file_data);
	form_data.append(idInput, idInput);
	form_data.append(nombre, nombre);
	$.ajax({
		url : "/simpleWeb/UploadFileIncidencia",
		dataType : 'script',
		cache : false,
		contentType : false,
		processData : false,
		data : form_data,
		type : 'post',
		success : function() {

		}
	}).fail(function(jqXHR, textStatus, errorThrown) {
		
	    //alerta(errorThrown);
		$("#loading").hide();
	})
}
function tblEspecie(id){
	var especie = "";
	$.each(SESION.especie, function(k,v){
		if(v.codigo == id){
			especie = v.especie;
		}
	})
	return especie;
}
function tblVariedad(id){
	console.log(SESION.variedad)
	var variedad = "";
	$.each(SESION.variedad, function(k,v){
		if(v.codigo == id){
			variedad = v.variedad;
		}
	})
	return variedad;
}
function tblCuartel(id){
	var cuartel = "";
	$.each(CUARTEL, function(k,v){
		if(v.codigo == id){
			cuartel = v.nombre;
		}
	})
	return cuartel;
}
