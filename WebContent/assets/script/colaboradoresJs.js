var sociedadPrivilege = new Set();
var huertoPrivilege = new Set();
//Obtener Sociedades y Huertos que tiene acceso
$.each(SESION.campo, function(key, value){
	sociedadPrivilege.add(value.idSociedad);
	huertoPrivilege.add(value.campo);
}); 

var rolPrivado;

$(function(){
	if(SESION.rolPrivado == 1){
		 rolPrivado = ["0", "1"];
	}else{
		rolPrivado = ["0"];
	}
});

var rolPrivado = function(){
	//No tiene rol privado
	
}


$(document).ready(function() {
	loadTable();
	filterColumns();
	buscadorRut();
	setFormatInputs();
	// Obtener Selectores
	getSelector();
	// Setear Eventos en los Inputs
	setEventInputs();
});

var datos;
var chechTr = [];

function getSelector() {

	//Obtener Sociedades
	let queryString;
	if(sociedadPrivilege == null){
		queryString = "";
	}else{
		queryString = JSON.stringify(sociedadPrivilege).slice(1,-1);
	}
		
	//Obtener sociedades
	let sociedades = $(this).getJSONSync('/simpleWeb/json/work/getSociedad/?idSociedad='+queryString);
	
	//Colocar Sociedades en el Select
	$('#idSociedad').empty();
	$('#idSociedad').append('<option value="" selected="selected">Seleccione...</option>');
	$('#idSociedad').setOptionsByArrayWithoutUnshift(sociedades, "sociedad", "idSociedad");
	
	// Array de Parametros
	let param = new Array('TIPO_DOCUMENTO');
	
	let selector;
	
	// Obtener datos para llenado de selects
	$.ajax({
		type : "GET",
		async : true,
		url : '/simpleWeb/json/work/getParametrosByCodigos',
		data : {param:param}, // se recibe array de parametros que se
								// requieren
		dataType : "json",
		success : function(data) {
			selector = data;
			
			$.each(selector, function(key, registro) {
				if(registro.codigo == "TIPO_DOCUMENTO"){
//					$("#documentoContrato").append(
//							'<option value=' + registro.llave + '>'
//							+ registro.descripcion + '</option>');
				}
			});
		},
		error : function(data) {
			alert('error');
		}
	});
	
	
	
	//Select Impresion Contrato Masivo
	$('#documentoContrato').change(
			function() {

				$('#idTemplate').empty();

				let
				queryString = $("#imprimirForm").serialize();

				console.log(queryString);
				
				// Obtener los documentos
				let
				documentos = $(this).getJSONSync(
						'/simpleWeb/json/work/getDocuments/?' + queryString);

				// Cambiar Nombres de Propiedades por value - text
				$.each(documentos, function(key, object) {
					documentos[key] = renameProperty(object, "idTemplate",
							"value");
					documentos[key] = renameProperty(object, "documento",
							"text");
				});

				$('#idTemplate').setOptionsByArray(documentos);

			});

}

function setEventInputs() {

	//Seleccionar el Huerto asociado a la empresa:
	$('#idSociedad').change(function(){ 
		
		$('#idHuerto').empty();

		//Obtener Codigo de la Sociedad en base al Id:
		let sociedadSAP = $(this).getJSONSync("/simpleWeb/json/work/getSociedadById/"+$('#idSociedad').val());
		
		let queryString;
		if(huertoPrivilege == null){
			queryString = "";
		}else{
			queryString = JSON.stringify(huertoPrivilege).slice(1,-1);
		}
		
		//Obtener Huerto por la Sociedad
		let huerto = $(this).getJSONSync("/simpleWeb/json/work/getCampoWithFilter/?"+"campo="+queryString+"&sociedad="+sociedadSAP.sociedad);
		
		// Cambiar Nombres de Propiedades  por value - text
		$.each(huerto, function(key, object){
			huerto[key] = renameProperty(object,"campo", "value");
			huerto[key] = renameProperty(object,"descripcion", "text");
		});
		
		// Llenar select de la Lista Huerto
		$('#idHuerto').setOptionsByArray(huerto);
		
		$('#idHuerto').prop('disabled',false);
		

	});
	
	
	
	// Cerrar/Mostrar Informaticon
	$('#documentoContrato').change(function() {
		
		if($('#documentoContrato').val() == 1){
			$(this).collapseInformation('.row_dataImpresionContrato');
		}else{
			$(this).collapseInformationAction('.row_dataImpresionContrato', "hide()");
		}
		
	});
	
	$('#imprimirDocumentos').on('hidden', function(){
		  $.clearFormFields('#imprimirDocumentos');
	});

}

function setFormatInputs() {

	//Formato de Fecha
	$('.dateWork').each(function(key, value){
		$(value).mask("00-00-0000", {placeholder: "__-__-____"});
	});
	
	// Fechas
	$('.dateWork').each(function(key, value){
		$(value).datepicker({ changeMonth: true, changeYear: true, yearRange: "1930:+10", dateFormat: 'dd-mm-yy' });
	});
	
	// Colocar todos los select en mayusculas
	$(document).find('select').each(function(key, value) {
		$(value).addClass('mayusculasWork');
	});

	$(document).find('input').each(function(key, value) {
		$(value).addClass('text-uppercase');
	});

}

$("#addWorker").click(function() {
	window.location.href = "/simpleWeb/webApp/addTrabajador";
})
$("#addGroupToWorkersForm").submit(function(event) {
	var checktbl = new Array();

	$('#dataBodyC input[type=checkbox]:checked').each(function() {
		checktbl.push($(this).val());

	});
	if ($("#nombreGrupo") != "") {
		var nombre = $("#nombreGrupo").val();
		$.ajax({
			type : "POST",
			async : false,
			url : "/simpleWeb/json/work/groups/" + nombre + "/" + checktbl,
			success : function(data) {
				swal({
					position : 'top-end',
					type : 'success',
					title : 'Datos Agregados Correctamente',
					showConfirmButton : false,
					timer : 1500
				});
			},
			error : function(ex) {
				swal({
					title : '<i>ERROR</i>',
					type : 'info',
					html : JSON.stringify(ex),
					showCloseButton : true,
					showCancelButton : true,
					focusConfirm : false,
					confirmButtonText : '<i class="fa fa-thumbs-up"></i>OK!',
					confirmButtonAriaLabel : 'Thumbs up, great!',
					cancelButtonText : '<i class="fa fa-thumbs-down"></i>',
					cancelButtonAriaLabel : 'Thumbs down',
				});
			}
		});
	} else {
		swal({
			position : 'top-end',
			type : 'error',
			title : 'no se seleccionó ningun trabajador',
			showConfirmButton : false,
			timer : 1500
		});
	}
});
function detCol(id) {
	window.location.href = ("detalleTrabajador?id=" + id);
}
function selectTr(tr, idtr) {
	if (tr.checked == true) {
		$("#" + idtr.id).removeClass("success");
		$("#" + idtr.id).addClass("success");
	} else {
		$("#" + idtr.id).removeClass("success");
	}
}
function addMovPersonal() {
	$('input[type=checkbox]:checked').each(function() {
		chechTr.push($(this).val());
	});
	if (chechTr.length != 0) {
		window.location.href = ("addMovPersonal?cod=" + chechTr);
	} else {
		swal({
			position : 'top-end',
			type : 'error',
			title : 'no se seleccionó ningun trabajador',
			showConfirmButton : false,
			timer : 1500
		});
		return;
	}
}

function addTest() {
	$('input[type=checkbox]:checked').each(function() {
		chechTr.push($(this).val());
	});
	var pos = chechTr.indexOf('on');
	if (pos > -1) {
		var elementoEliminado = chechTr.splice(pos, 1);
	}
	if (chechTr.length != 0) {
		window.location.href = ("test?cod=" + chechTr);
	} else {
		swal({
			position : 'top-end',
			type : 'error',
			title : 'no se seleccionó ningun trabajador',
			showConfirmButton : false,
			timer : 1500
		});
		return;
	}
}
function filter(input) {
	$("#tblCola").html("");
	$.each(datos, function(kDatos, v) {
		if (v.hasOwnProperty(input.id)) {
			if (input.id == "codigo") {
				if (v.codigo.match(input.value)) {
					llenarTabla(v);
				}
			} else if (input.id == "nombre") {
				if (v.nombre.toUpperCase().match(input.value.toUpperCase())) {
					llenarTabla(v);
				}
			}
		}
	})
}

function menuImprimir(codigoTrabajador) {
	
	
	$('#imprimirDocumentos').modal("toggle");
	$('#informacionImprimir').val(codigoTrabajador);
	$('#imprimirBotonModal').show();
		
}

function menuImprimirMasivo(){

	//Obtener listado de Personas Seleccionadas
	let listaTrabajadores = new Array();
	
	listaTrabajadores = getSelectedCheckBox();
	
	console.log(listaTrabajadores);
	
	$('#imprimirDocumentos').modal("toggle");
	$('#informacionImprimir').val(listaTrabajadores);
	$('#imprimirMasivoBotonModal').show();
	
}

function excelReportListaTrabajadores(){
	
	
	let informeTrabajadores = new Object();
	
	$(this).setJSONSync('/simpleWeb/json/work/excelReportListaTrabajadores/', informeTrabajadores);
	
}


function getSelectedCheckBox(){
	
	let lista = new Array();
	
	var table = $('#datatable_ajax').DataTable();
	
	let listado = new Array();
	
	//Recorrer la Tabla
	table.rows().every(function(rowIdx, tableLoop, rowLoop) {
		
		var checkBoxRow = this.node();
		var data = this.data();
		
		if($(checkBoxRow).find('input').prop('checked')){
			listado.push(data[1]);
		}
	});

	return listado;
	 
}


function imprimir(id) {

	if(validarFormularioImprimir() == false){
		return false;
	}
	
	//Envio de Informacion para el Contrato
	let informacionExtra = new Object();
	//Obtener el Codigo del Empleador en el Modal
	informacionExtra.listaTrabajador = $('#informacionImprimir').val();
	informacionExtra.fechaContratacion = $('#fechaImpresionContrato').val();
	informacionExtra.fechaPactoHorasExtra = $('#fechaPactoHorasExtra').val();
	
	//Servicio para Imprimir
	let file = $(this).setJSONSync('/simpleWeb/json/work/generateOneContrato/'+$('#idTemplate').val(), informacionExtra);
	
	//Si recibe ruta del Archivo
	if(file != null){
		
		//Descargar Archivo PDF
		window.open("/simpleWeb/json/work/showOneContrato/?FILE="+file[0]);
		
		let trabajadorDocumento = new Object();
	
		trabajadorDocumento.codTrabajador = $('#informacionImprimir').val();
		trabajadorDocumento.impreso = 1;
		trabajadorDocumento.idTemplate = $('#idTemplate').val();
		
		//Actualizar la Tabla Trabajador Documentos
		$(this).setJSONSync('/simpleWeb/json/work/updateTrabajadorDocumentos/', trabajadorDocumento );
		
		//Recargar la Pagina
		location.reload();
			
	}
	
}


function imprimirMasivo(){
	
	
	if(validarFormularioImprimir() == false){
		return false;
	}
	
	//Listado de Informacion
	let listaInformacionExtra = new Array();
	
	//Lista de Trabajadores
	let listaTrabajadores = $('#informacionImprimir').val().split(",");
	
	//Obtener todos los trabajadores Seleccionados
	$.each(listaTrabajadores, function(key, value) {
		let informacionExtra = new Object();
		informacionExtra.listaTrabajador = value;
		informacionExtra.fechaContratacion = $('#fechaImpresionContrato').val();
		listaInformacionExtra.push(informacionExtra);
	});

	//Servicio para Imprimir Contratos Multiples
	let file = $(this).setJSONSync('/simpleWeb/json/work/generateMultipleContrato/'+$('#idTemplate').val(), listaInformacionExtra);
	
	
	//Si recibe ruta del Archivo
	if(file != null){
		
		//Descargar Archivo PDF
		window.open("/simpleWeb/json/work/showOneContrato/?FILE="+file[0]);
		
	}
	
	
	
}

function validarFormularioImprimir(){
	
	let formValidation = $('#imprimirForm');

	formValidation.validate({
		rules : {
			fechaImpresionContrato : {
				required : true
			},
		},
		messages : {
			fechaImpresionContrato : {
				required : 'requerido'
			},
		}
	});

	//Validar el Formulario
	if (!formValidation.valid()) {
		return false;
	} 
	
	return true;
	
}


// Mostrar el Contrato Generado por Base de Datos
function generarContrato(id) {
	// window.open('/simpleWeb/json/work/generaContratoTrabajador.html?id=' +
	// id);
	window.open('/simpleWeb/json/work/showContrato.html?id=' + id);
}

function fanticipos() {
	$('input[type=checkbox]:checked').each(function() {
		chechTr.push($(this).val());
	});
	var pos = chechTr.indexOf('on');
	if (pos > -1) {
		var elementoEliminado = chechTr.splice(pos, 1);
	}
	if (chechTr.length != 0) {
		window.location.href = ("anticipos?id=" + chechTr);
	} else {
		swal({
			position : 'top-end',
			type : 'error',
			title : 'no se seleccionó ningun trabajador',
			showConfirmButton : false,
			timer : 1500
		});
		return;
	}
}

function selectALL(nameTable) {

	var table = $('#datatable_ajax').DataTable();
	
	var checked = $('#checkAll').is(":checked");
	
	table.column(0).nodes().to$().each(function(index) {
		if (checked) {
			$(this).find('.checkbox').prop('checked', 'checked');
		} else {
			$(this).find('.checkbox').removeProp('checked');
		}
	});
	table.draw();

}
function delCol(id) {
	var c = confirm("Este trabajador se eliminara ¿Esta Seguro?");
	if (c == true) {
		$.ajax({
			url : "/simpleWeb/json/map/delTrabajador/" + id,
			type : "POST",
			success : function() {
				alert("Trabajador eliminado");
				loadWorker();
			},
			error : function(a, b) {
				console.log(a);
			}
		});
	} else {
		alert("Operacion cancelada");
	}
}
function editCol(id) {

	window.location.href = ("detalleTrabajador?id=" + id);
}

function editEmpresa(id) {
	window.location.href = ("cambioempresa.html?id=" + id);
}

function contratoMasivos() {

	var checkArr = []

	$('input[type=checkbox]:checked').each(function() {
		chechArr.push($(this).val());
	});

	var pos = checkArr.indexOf('on');
	if (pos > -1) {
		var elementoEliminado = checkArr.splice(pos, 1);
	}
	if (checkArr.length != 0) {
		window.location.href = ("contratos?id=" + checkArr);
	} else {
		swal({
			position : 'top-end',
			type : 'error',
			title : 'no se seleccionó ningun trabajador',
			showConfirmButton : false,
			timer : 1500
		});
		return;
	}

}

function contratoMasivos() {
	$('input[type=checkbox]:checked').each(function() {
		chechTr.push($(this).val());
	});
	var pos = chechTr.indexOf('on');
	if (pos > -1) {
		var elementoEliminado = chechTr.splice(pos, 1);
	}
	if (chechTr.length != 0) {
		window.location.href = ("contratos/?id=" + chechTr);
	} else {
		swal({
			position : 'top-end',
			type : 'error',
			title : 'no se seleccionó ningun trabajador',
			showConfirmButton : false,
			timer : 1500
		});
		return;
	}
}
function addToGroup() {
	var checkArray = new Array();

	$('input[type=checkbox]:checked').each(function() {
		if ($(this).val() == "on") {

		} else {
			checkArray.push($(this).val());
		}

	});
	getTrabajadoresByIds(checkArray);

}
function getTrabajadoresByIds($checkArray) {

	var table;
	if ($checkArray.length > 0) {

		if ($.fn.dataTable.isDataTable('#addGroupTable')) {
			table = $('#addGroupTable').DataTable();
			table.clear();
		} else {
			table = $('#addGroupTable').DataTable({
				searching : false,
				paging : false,
				info : false,
				search : false
			})
		}
		$.ajax({
			type : "GET",
			async : false,
			url : "/simpleWeb/json/work/gruops/getTrabajadoresByIds/"
					+ $checkArray,
			success : function(data) {
				$.each(data,
						function(k, v) {
							table.row.add([ v.id, v.rut, v.nombre,
									v.apellidoPaterno ]);
						});
				table.draw();
				$("#addGroupToWorkersModal").modal("toggle");

			},
			error : function(ex) {
				swal({
					title : '<i>ERROR</i>',
					type : 'info',
					html : JSON.stringify(ex),
					showCloseButton : true,
					showCancelButton : true,
					focusConfirm : false,
					confirmButtonText : '<i class="fa fa-thumbs-up"></i>OK!',
					confirmButtonAriaLabel : 'Thumbs up, great!',
					cancelButtonText : '<i class="fa fa-thumbs-down"></i>',
					cancelButtonAriaLabel : 'Thumbs down',
				});

			}

		});
		var checkArray = new Array();

	} else {
		swal({
			position : 'top-end',
			type : 'error',
			title : 'no se seleccionó ningun trabajador',
			showConfirmButton : false,
			timer : 1500
		});
	}
}
function clearData() {
	var checkArray = new Array();
	$("#addGroupToWorkersModal").modal("toggle");

}

function buscadorRut() {

	$("#buscador_rut").Rut({
		format_on : 'keyup'
	})

	$("#buscador_rut").on('keyup', function() {
		var table = $('#datatable_ajax').DataTable();

		table.column(2).search(this.value.replace.draw());
	});

}

function filterColumns() {

	var table = $('#datatable_ajax').DataTable();

	$('#datatable_ajax tfoot th:not(:first-child):not(:last-child)').each(
			function(key, value) {
				var title = $(this).text();

				// Ancho de la Columna
				var ancho = $(this).closest('th').width();

				if (key == 1) {

					$(this).html(
							'<input type="text" id="buscador_rut" placeholder="Buscar por '
									+ title + '" style="width:' + ancho
									+ 'px;" />');

				} else {
					$(this).html(
							'<input type="text" placeholder="Buscar por '
									+ title + '" style="width:' + ancho
									+ 'px;" />');
				}

			});

	table
			.columns([ 1, 2, 3, 4, 6 ])
			.every(
					function(key) {
						var that = this;

						$('input', this.footer()).on('keyup change',
								function() {

									// Colocar Buscador por Input
									if (that.search() !== this.value) {
										that.search(this.value).draw();
									}

								});

						table
								.columns([ 5, 7, 8 ])
								.every(
										function() {

											var column = this;

											var select = $(
													'<select class="form-control input-circle"><option value=""></option></select>')
													.appendTo(
															$(column.footer())
																	.empty())
													.on(
															'change',
															function() {

																var val = $.fn.dataTable.util
																		.escapeRegex($(
																				this)
																				.val());

																column
																		.search(
																				val ? '^'
																						+ val
																						+ '$'
																						: '',
																				true,
																				false)
																		.draw();

															});

											column
													.data()
													.unique()
													.sort()
													.each(
															function(d, j) {
																select
																		.append('<option value="'
																				+ d
																				+ '">'
																				+ d
																				+ '</option>')
															});
										});

					});

}

function loadTable() {
	
	let huertos = Array.from(huertoPrivilege);
	let codHuertos = huertos;
	let queryString = ""
	
	//Reparar Bug Arreglar en Base de Datos TODO:
	if(huertos == null){
		queryString = "";
	}else{
		let soloUnHuerto = false;
		if(huertos.length <= 1){
			soloUnHuerto = true;
		}
		codHuertos = JSON.stringify(huertos).slice(1,-1);
		if(soloUnHuerto == true){
			codHuertos = codHuertos.slice(1,-1);
		}
		
		
		queryString = "idHuerto="+codHuertos;
		
		queryStringRolPrivado = "&rolPrivado="+JSON.stringify(rolPrivado).slice(1,-1);
		console.log("rolprivado :"+JSON.stringify(queryStringRolPrivado));
		
	}
	
	let
	trabajadores = $(this).getJSONSync(
			"/simpleWeb/json/work/getAllTrabajadorWithLastContrato?_orderBy=codigo&"+queryString + queryStringRolPrivado);
	//let
	//sociedad = $(this).getJSONSync("/simpleWeb/json/work/getSociedad/");
	
	let table = new Datatable();
	table.init({
				src : $("#datatable_ajax"),
				loadingMessage : 'Loading...',
				dataTable : {
					"bStateSave" : true,
					"data" : trabajadores,
					"columns" : [ {
						"data" : "id"
					}, {
						"data" : "codigo"
					}, {
						"data" : "rut"
					}, {
						"data" : ""
					}, {
						"data" : "contratos.0.fechaInicio_actividad"
					}, {
						"data" : "denominacionSociedad"
					}, {
						"data" : ""
					}, {
						"data" : "contratos.0.estadoContrato"
					}, 
//					{
//						"data" : "impreso"
//					},
					{
						"data" : "id"
					} ],
					"columnDefs" : [
							{
								"targets" : [ 0 ],
								"render" : function(value, type, data) {
									return "<input type='checkbox' style='margin-left:auto; margin-right:auto;' "
											+ "title='Seleccionar "
											+ data.apellidoPaterno
											+ " "
											+ data.apellidoMaterno
											+ ", "
											+ data.nombre
											+ "'"
											+ "id='"
											+ value
											+ "' value='"
											+ value
											+ "' name='check' class='checkbox'/>";
								}
							},
							{
								"targets" : [ 2 ],
								"render" : function(value, type, data) {
									return data.rut == "" ? (data.rutTemporal == "" ? data.pasaporte
											: data.rutTemporal)
											: data.rut
								}
							},
							{
								"targets" : [ 3 ],
								"render" : function(value, type, data) {
									return data.apellidoPaterno + " "
											+ data.apellidoMaterno + ", "
											+ data.nombre
								}
							},
							{
								"targets" : [ 4 ],
								"render" : function(value) {
									return changeDateformatDDMMYY(value);
								}
							},
							{
								"targets" : [ 5 ],
								"render" : function(value) {
									return value;
								}
							},
							{
								"targets" : [ 6 ],
								"render" : function(value, type, data) {
									return data.telefono == "" ? (data.celular == "" ? "N/A"
											: data.celular)
											: data.telefono
								}
							},
							{
								"targets" : [ 7 ],
								"render" : function(value) {
									return value == 1 ? "Activo" : "Inactivo"
								}
							},
							{
								"targets" : [ -2 ],
								"render" : function(value, type, data) {
									return value == 0 ? "NO" : "SI";
								}
							},
							{
								"targets" : [ -1 ],
								"render" : function(value, type, data) {
									let
									acciones = ""
									acciones += "<div class='dropdown dropleft' style='float: left;'>";
									acciones += "<button class='btn btn-circle blue btn-outline btn-sm dropdown-toggle' title='Modificar' type='button' data-toggle='dropdown'>";
									acciones += "<span class='fa fa-align-justify '></span></button>";
									acciones += "<ul class='dropdown-menu' style='max-width: 100px important;'>";
									acciones += "<li><a href='cambioempresa?id="
											+ value
											+ "' onclick='javascript:editEmpresa("
											+ value
											+ ");'>Cambio de Empresa</a></li>";
									acciones += "<li><a href='separacion?id="
											+ value + "'>Separacion</a></li>";
									acciones += "<li><a href='anticipos?id="
											+ value + "'>Anticipos</a></li>";
									acciones += "<li><a href='vacaciones?id="
											+ value + "'>Vacaciones</a></li>";
									acciones += "<li class='divider'></li>";
									acciones += "<li><a href='#' onclick='generarContrato("
											+ data.codigo
											+ ")'>Ver contrato</a></li>";
									acciones += "<li><a onclick='imprimir("
											+ value + ")'>Impresion</a></li>";
									acciones += "</ul>";
									acciones += "</div>";
									acciones += "<a id='detCol' onclick='javascript: detCol("
											+ value
											+ ");' title='Detalles' class='btn btn-circle yellow btn-outline btn-sm'><i class='fa fa-pencil-square-o fa-lg'></i></a>"
									acciones += "<a style='display:none;' id='delCol' title='Eliminar' onclick='javascript:delCol("
											+ value
											+ ");' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-trash-o fa-lg'></i></a>"
									acciones += "<a id='imprimir' title='Impresión de Documentos' onclick='javascript:menuImprimir("
											+ data.codigo
											+ ");' class='btn btn-circle green btn-outline btn-sm'><i class='fa fa-print fa-lg'></i></a>"
									acciones += "</div>";
									return acciones
								}
							}, ]

				}
			});

	$('#datatable_ajax').dataTable().fnDestroy();
	$("#datatable_ajax").DataTable({
		"searching" : true,
		"ordering" : false,
		"paging" : true,
		"info" : false,
	}).draw();

	$("#loading").hide();

}

function selectingGroup($this) {
	if ($this == -1) {

		loadTable();
		var all = document.getElementById("checkAll").checked = false;
	} else if ($this == 0) {

	} else {
		loadGroups($this);
	}

}
function loadGroups($value) {
	// inicializo la tabla
	var table;
	if ($.fn.dataTable.isDataTable('#datatable_ajax')) {
		table = $('#datatable_ajax').DataTable();
		table.clear();
	} else {
		table = $('#datatable_ajax').DataTable({
			searching : false,
			paging : true,
			info : false,
			search : false
		})
	}
	$
			.ajax({
				type : "GET",
				async : false,
				url : "/simpleWeb/json/work/groups/getWorkersByGroup/" + $value,
				success : function(data) {

					$
							.each(
									data,
									function(k, v) {
										var acciones = ""
										acciones += "<div class='dropdown dropleft' style='float: left;'>";
										acciones += "<button class='btn btn-circle yellow btn-outline btn-sm dropdown-toggle' title='Modificar' type='button' data-toggle='dropdown'>";
										acciones += "<span class='fa fa-pencil-square-o fa-lg'></span></button>";
										acciones += "<ul class='dropdown-menu' style='max-width: 100px important;'>";
										acciones += "<li><a href='cambioempresa?id="
												+ v.id
												+ "' onclick='javascript: editEmpresa("
												+ v.id
												+ ");'>Cambio de Empresa</a></li>";
										acciones += "<li><a href='separacion?id="
												+ v.id
												+ "'>Separacion</a></li>";
										acciones += "<li><a href='anticipos?id="
												+ v.id + "'>Anticipos</a></li>";
										acciones += "<li><a href='vacaciones?id="
												+ v.id
												+ "'>Vacaciones</a></li>";
										acciones += "<li class='divider'></li>";
										acciones += "<li><a href='#' onclick='generarContrato("
												+ v.id
												+ ")'>Ver contrato</a></li>";
										acciones += "<li><a onclick='imprimir("
												+ v.id
												+ ")'>Impresion</a></li>";
										acciones += "</ul>";
										acciones += "</div>";
										acciones += "<a id='detCol' onclick='javascript: detCol("
												+ v.id
												+ ");' title='Detalles' class='btn btn-circle blue btn-outline btn-sm'><i class='fa fa-align-justify'></i></a>"
										acciones += "<a id='delCol' title='Eliminar' onclick='javascript: delCol("
												+ v.id
												+ ");' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-trash-o fa-lg'></i></a>"
										acciones += "</div>";
										table.row
												.add([
														"<input type='checkbox' style='margin-left:auto; margin-right:auto;' title='Seleccionar "
																+ v.nombre
																+ " "
																+ v.apellidoPaterno
																+ "' id='"
																+ v.id
																+ "' value='"
																+ v.id
																+ "' name='check'  class='checkbox'/>",
														v.codigo, v.rut,
														v.nombre,
														v.apellidoPaterno,
														v.fechaIngresoCompania,
														v.direccion,
														v.telefono, acciones ]);
									});
					table.draw();
					selectAllCheck();
					$("#loading").hide();

				},
				error : function(ex) {
					swal({
						title : '<i>ERROR</i>',
						type : 'info',
						html : JSON.stringify(ex),
						showCloseButton : true,
						showCancelButton : true,
						focusConfirm : false,
						confirmButtonText : '<i class="fa fa-thumbs-up"></i>OK!',
						confirmButtonAriaLabel : 'Thumbs up, great!',
						cancelButtonText : '<i class="fa fa-thumbs-down"></i>',
						cancelButtonAriaLabel : 'Thumbs down',
					});

				}

			});

}
function selectAllCheck() {
	var all = document.getElementById("checkAll").checked = true;
	var check = document.getElementsByName("check");

	for (var x = 0; x < check.length; x++) {
		check[x].checked = true;
	}
}
var changeDateformatDDMMYY = function(input) {
	var pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
	if (!input || !input.match(pattern)) {
		return null;
	}
	return input.replace(pattern, '$3-$2-$1');
};
var changeDateformatYYMMDD = function(input) {
	var pattern = /(\d{2})\-(\d{2})\-(\d{4})/;
	if (!input || !input.match(pattern)) {
		return null;
	}
	return input.replace(pattern, '$3-$2-$1');
};

// ---------------------------PLUGIN VALIDATE RUT CHILENO--------------------//

/*
 * Copyright (c) 2009 José Joaquín Núñez (josejnv@gmail.com)
 * http://joaquinnunez.cl/blog/ Licensed under GPL
 * (http://www.opensource.org/licenses/gpl-2.0.php) Use only for non-commercial
 * usage.
 * 
 * Version : 0.5
 * 
 * Requires: jQuery 1.2+
 */

(function($) {
	jQuery.fn.Rut = function(options) {
		var defaults = {
			digito_verificador : null,
			on_error : function() {
			},
			on_success : function() {
			},
			validation : true,
			format : true,
			format_on : 'change'
		};

		var opts = $.extend(defaults, options);

		this
				.each(function() {

					if (defaults.format) {
						jQuery(this)
								.bind(
										defaults.format_on,
										function() {
											jQuery(this)
													.val(
															jQuery.Rut
																	.formatear(
																			jQuery(
																					this)
																					.val(),
																			defaults.digito_verificador == null));
										});
					}
					if (defaults.validation) {
						if (defaults.digito_verificador == null) {
							jQuery(this).bind(
									'blur',
									function() {
										var rut = jQuery(this).val();
										if (jQuery(this).val() != ""
												&& !jQuery.Rut.validar(rut)) {
											defaults.on_error();
										} else if (jQuery(this).val() != "") {
											defaults.on_success();
										}
									});
						} else {
							var id = jQuery(this).attr("id");
							jQuery(defaults.digito_verificador).bind(
									'blur',
									function() {
										var rut = jQuery("#" + id).val() + "-"
												+ jQuery(this).val();
										if (jQuery(this).val() != ""
												&& !jQuery.Rut.validar(rut)) {
											defaults.on_error();
										} else if (jQuery(this).val() != "") {
											defaults.on_success();
										}
									});
						}
					}
				});
	}
})(jQuery);

/**
 * Funciones
 */

jQuery.Rut = {

	formatear : function(Rut, digitoVerificador) {
		var sRut = new String(Rut);
		var sRutFormateado = '';
		sRut = jQuery.Rut.quitarFormato(sRut);
		if (digitoVerificador) {
			var sDV = sRut.charAt(sRut.length - 1);
			sRut = sRut.substring(0, sRut.length - 1);
		}
		while (sRut.length > 3) {
			sRutFormateado = "." + sRut.substr(sRut.length - 3)
					+ sRutFormateado;
			sRut = sRut.substring(0, sRut.length - 3);
		}
		sRutFormateado = sRut + sRutFormateado;
		if (sRutFormateado != "" && digitoVerificador) {
			sRutFormateado += "-" + sDV;
		} else if (digitoVerificador) {
			sRutFormateado += sDV;
		}

		return sRutFormateado;
	},

	quitarFormato : function(rut) {
		var strRut = new String(rut);
		while (strRut.indexOf(".") != -1) {
			strRut = strRut.replace(".", "");
		}
		while (strRut.indexOf("-") != -1) {
			strRut = strRut.replace("-", "");
		}

		return strRut;
	},

	digitoValido : function(dv) {
		if (dv != '0' && dv != '1' && dv != '2' && dv != '3' && dv != '4'
				&& dv != '5' && dv != '6' && dv != '7' && dv != '8'
				&& dv != '9' && dv != 'k' && dv != 'K') {
			return false;
		}
		return true;
	},

	digitoCorrecto : function(crut) {
		largo = crut.length;
		if (largo < 2) {
			return false;
		}
		if (largo > 2) {
			rut = crut.substring(0, largo - 1);
		} else {
			rut = crut.charAt(0);
		}
		dv = crut.charAt(largo - 1);
		jQuery.Rut.digitoValido(dv);

		if (rut == null || dv == null) {
			return 0;
		}

		dvr = jQuery.Rut.getDigito(rut);

		if (dvr != dv.toLowerCase()) {
			return false;
		}
		return true;
	},

	getDigito : function(rut) {
		var dvr = '0';
		suma = 0;
		mul = 2;
		for (i = rut.length - 1; i >= 0; i--) {
			suma = suma + rut.charAt(i) * mul;
			if (mul == 7) {
				mul = 2;
			} else {
				mul++;
			}
		}
		res = suma % 11;
		if (res == 1) {
			return 'k';
		} else if (res == 0) {
			return '0';
		} else {
			return 11 - res;
		}
	},

	validar : function(texto) {
		texto = jQuery.Rut.quitarFormato(texto);
		largo = texto.length;

		// rut muy corto
		if (largo < 2) {
			return false;
		}

		// verifica que los numeros correspondan a los de rut
		for (i = 0; i < largo; i++) {
			// numero o letra que no corresponda a los del rut
			if (!jQuery.Rut.digitoValido(texto.charAt(i))) {
				return false;
			}
		}

		var invertido = "";
		for (i = (largo - 1), j = 0; i >= 0; i--, j++) {
			invertido = invertido + texto.charAt(i);
		}
		var dtexto = "";
		dtexto = dtexto + invertido.charAt(0);
		dtexto = dtexto + '-';
		cnt = 0;

		for (i = 1, j = 2; i < largo; i++, j++) {
			if (cnt == 3) {
				dtexto = dtexto + '.';
				j++;
				dtexto = dtexto + invertido.charAt(i);
				cnt = 1;
			} else {
				dtexto = dtexto + invertido.charAt(i);
				cnt++;
			}
		}

		invertido = "";
		for (i = (dtexto.length - 1), j = 0; i >= 0; i--, j++) {
			invertido = invertido + dtexto.charAt(i);
		}

		if (jQuery.Rut.digitoCorrecto(texto)) {
			return true;
		}
		return false;
	}
};

// ----------------OWN JQUERY FUNCTIONALITY-------------------//

// Obtener objecto JSON por Servicio synchronous
jQuery.fn.getJSONSync = function(urlServicioPath) {

	var objectData = new Object;

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

//Dado el Array y el Nombre de la Opcion retornar el Valor
function getValueByOption(array, valor, optionIn, optionOut) {

	let
	name = ""
	$.each(array, function(key, value) {

		if (value[optionIn] == valor) {
			name = value[optionOut];
			return false;
		}

	});

	return name == null ? "" : name;

};

//Mostrar/Ocultar Informacion
jQuery.fn.collapseInformation = function(selector) {
	$(document).find(selector).each(function(key, value) {
		$(value).closest('tr').toggle();
	});
}

//Ocultar Informacion
jQuery.fn.collapseInformationAction = function(selector, action) {
	$(document).find(selector).each(function(key, value) {
		eval("$(value).closest('tr')."+action);
	});
}

//Pasado un Array insertar opciones en un select
jQuery.fn.setOptionsByArray = function(array) {

	var select = this;

	array.unshift({
		value : "",
		text : "Seleccione.."
	});

	$.each(array, function(key, value) {
		$(select).append($('<option>').text(value.text).val(value.value));
	});

};

jQuery.fn.setOptionsByArrayWithoutUnshift = function(array, nameProperty1, nameProperty2) {

	var select = this;
	
	$.each(array, function(key, value) {
		$(select).append($('<option>').text(eval("value."+nameProperty1)).val(eval("value."+nameProperty2)));
	});

};

//Renombre propiedad del Objeto
function renameProperty(object, oldName, newName) {
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

//Insertar objecto JSON por Servicio synchronous
jQuery.fn.setJSONSync = function(urlServicioPath, ObjectData){
	
	var enviado;
	
	$.ajax({
		url : urlServicioPath,
		async : false,
		type : "PUT",
		data : JSON.stringify(ObjectData),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept","application/json");
			xhr.setRequestHeader("Content-Type","application/json");
		},
		success: function(data){
			enviado = data;
		},
		error: function(ex){
			alert("Error al Insertar: " + ex);
		}

	});
	
	return enviado;
	
};

//Clear form fields in a designated area of a page
$.clearFormFields = function(area) {
  $(area).find('input[type="text"],input[type="email"],textarea,select').val('');
};


//-----------JQUERY PLUGIN MASK--------------------//

/**
 * jquery.mask.js
 * 
 * @version: v1.14.15
 * @author: Igor Escobar
 * 
 * Created by Igor Escobar on 2012-03-10. Please report any bug at
 * github.com/igorescobar/jQuery-Mask-Plugin
 * 
 * Copyright (c) 2012 Igor Escobar http://igorescobar.com
 * 
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/* jshint laxbreak: true */
/* jshint maxcomplexity:17 */
/* global define */

// UMD (Universal Module Definition) patterns for JavaScript modules that work
// everywhere.
// https://github.com/umdjs/umd/blob/master/templates/jqueryPlugin.js
(function (factory, jQuery, Zepto) {

	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory(require('jquery'));
	} else {
		factory(jQuery || Zepto);
	}

}(function ($) {
	'use strict';

	var Mask = function (el, mask, options) {

		var p = {
				invalid: [],
				getCaret: function () {
					try {
						var sel,
						pos = 0,
						ctrl = el.get(0),
						dSel = document.selection,
						cSelStart = ctrl.selectionStart;

						// IE Support
						if (dSel && navigator.appVersion.indexOf('MSIE 10') === -1) {
							sel = dSel.createRange();
							sel.moveStart('character', -p.val().length);
							pos = sel.text.length;
						}
						// Firefox support
						else if (cSelStart || cSelStart === '0') {
							pos = cSelStart;
						}

						return pos;
					} catch (e) {}
				},
				setCaret: function(pos) {
					try {
						if (el.is(':focus')) {
							var range, ctrl = el.get(0);

							// Firefox, WebKit, etc..
							if (ctrl.setSelectionRange) {
								ctrl.setSelectionRange(pos, pos);
							} else { // IE
								range = ctrl.createTextRange();
								range.collapse(true);
								range.moveEnd('character', pos);
								range.moveStart('character', pos);
								range.select();
							}
						}
					} catch (e) {}
				},
				events: function() {
					el
					.on('keydown.mask', function(e) {
						el.data('mask-keycode', e.keyCode || e.which);
						el.data('mask-previus-value', el.val());
						el.data('mask-previus-caret-pos', p.getCaret());
						p.maskDigitPosMapOld = p.maskDigitPosMap;
					})
					.on($.jMaskGlobals.useInput ? 'input.mask' : 'keyup.mask', p.behaviour)
					.on('paste.mask drop.mask', function() {
						setTimeout(function() {
							el.keydown().keyup();
						}, 100);
					})
					.on('change.mask', function(){
						el.data('changed', true);
					})
					.on('blur.mask', function(){
						if (oldValue !== p.val() && !el.data('changed')) {
							el.trigger('change');
						}
						el.data('changed', false);
					})
					// it's very important that this callback remains in this
					// position
					// otherwhise oldValue it's going to work buggy
					.on('blur.mask', function() {
						oldValue = p.val();
					})
					// select all text on focus
					.on('focus.mask', function (e) {
						if (options.selectOnFocus === true) {
							$(e.target).select();
						}
					})
					// clear the value if it not complete the mask
					.on('focusout.mask', function() {
						if (options.clearIfNotMatch && !regexMask.test(p.val())) {
							p.val('');
						}
					});
				},
				getRegexMask: function() {
					var maskChunks = [], translation, pattern, optional, recursive, oRecursive, r;

					for (var i = 0; i < mask.length; i++) {
						translation = jMask.translation[mask.charAt(i)];

						if (translation) {

							pattern = translation.pattern.toString().replace(/.{1}$|^.{1}/g, '');
							optional = translation.optional;
							recursive = translation.recursive;

							if (recursive) {
								maskChunks.push(mask.charAt(i));
								oRecursive = {digit: mask.charAt(i), pattern: pattern};
							} else {
								maskChunks.push(!optional && !recursive ? pattern : (pattern + '?'));
							}

						} else {
							maskChunks.push(mask.charAt(i).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
						}
					}

					r = maskChunks.join('');

					if (oRecursive) {
						r = r.replace(new RegExp('(' + oRecursive.digit + '(.*' + oRecursive.digit + ')?)'), '($1)?')
						.replace(new RegExp(oRecursive.digit, 'g'), oRecursive.pattern);
					}

					return new RegExp(r);
				},
				destroyEvents: function() {
					el.off(['input', 'keydown', 'keyup', 'paste', 'drop', 'blur', 'focusout', ''].join('.mask '));
				},
				val: function(v) {
					var isInput = el.is('input'),
					method = isInput ? 'val' : 'text',
							r;

					if (arguments.length > 0) {
						if (el[method]() !== v) {
							el[method](v);
						}
						r = el;
					} else {
						r = el[method]();
					}

					return r;
				},
				calculateCaretPosition: function() {
					var oldVal = el.data('mask-previus-value') || '',
					newVal = p.getMasked(),
					caretPosNew = p.getCaret();
					if (oldVal !== newVal) {
						var caretPosOld = el.data('mask-previus-caret-pos') || 0,
						newValL = newVal.length,
						oldValL = oldVal.length,
						maskDigitsBeforeCaret = 0,
						maskDigitsAfterCaret = 0,
						maskDigitsBeforeCaretAll = 0,
						maskDigitsBeforeCaretAllOld = 0,
						i = 0;

						for (i = caretPosNew; i < newValL; i++) {
							if (!p.maskDigitPosMap[i]) {
								break;
							}
							maskDigitsAfterCaret++;
						}

						for (i = caretPosNew - 1; i >= 0; i--) {
							if (!p.maskDigitPosMap[i]) {
								break;
							}
							maskDigitsBeforeCaret++;
						}

						for (i = caretPosNew - 1; i >= 0; i--) {
							if (p.maskDigitPosMap[i]) {
								maskDigitsBeforeCaretAll++;
							}
						}

						for (i = caretPosOld - 1; i >= 0; i--) {
							if (p.maskDigitPosMapOld[i]) {
								maskDigitsBeforeCaretAllOld++;
							}
						}

						// if the cursor is at the end keep it there
						if (caretPosNew > oldValL) {
							caretPosNew = newValL * 10;
						} else if (caretPosOld >= caretPosNew && caretPosOld !== oldValL) {
							if (!p.maskDigitPosMapOld[caretPosNew])  {
								var caretPos = caretPosNew;
								caretPosNew -= maskDigitsBeforeCaretAllOld - maskDigitsBeforeCaretAll;
								caretPosNew -= maskDigitsBeforeCaret;
								if (p.maskDigitPosMap[caretPosNew])  {
									caretPosNew = caretPos;
								}
							}
						}
						else if (caretPosNew > caretPosOld) {
							caretPosNew += maskDigitsBeforeCaretAll - maskDigitsBeforeCaretAllOld;
							caretPosNew += maskDigitsAfterCaret;
						}
					}
					return caretPosNew;
				},
				behaviour: function(e) {
					e = e || window.event;
					p.invalid = [];

					var keyCode = el.data('mask-keycode');

					if ($.inArray(keyCode, jMask.byPassKeys) === -1) {
						var newVal = p.getMasked(),
						caretPos = p.getCaret();

						// this is a compensation to devices/browsers that don't
						// compensate
						// caret positioning the right way
						setTimeout(function() {
							p.setCaret(p.calculateCaretPosition());
						}, $.jMaskGlobals.keyStrokeCompensation);

						p.val(newVal);
						p.setCaret(caretPos);
						return p.callbacks(e);
					}
				},
				getMasked: function(skipMaskChars, val) {
					var buf = [],
					value = val === undefined ? p.val() : val + '',
							m = 0, maskLen = mask.length,
							v = 0, valLen = value.length,
							offset = 1, addMethod = 'push',
							resetPos = -1,
							maskDigitCount = 0,
							maskDigitPosArr = [],
							lastMaskChar,
							check;

					if (options.reverse) {
						addMethod = 'unshift';
						offset = -1;
						lastMaskChar = 0;
						m = maskLen - 1;
						v = valLen - 1;
						check = function () {
							return m > -1 && v > -1;
						};
					} else {
						lastMaskChar = maskLen - 1;
						check = function () {
							return m < maskLen && v < valLen;
						};
					}

					var lastUntranslatedMaskChar;
					while (check()) {
						var maskDigit = mask.charAt(m),
						valDigit = value.charAt(v),
						translation = jMask.translation[maskDigit];

						if (translation) {
							if (valDigit.match(translation.pattern)) {
								buf[addMethod](valDigit);
								if (translation.recursive) {
									if (resetPos === -1) {
										resetPos = m;
									} else if (m === lastMaskChar && m !== resetPos) {
										m = resetPos - offset;
									}

									if (lastMaskChar === resetPos) {
										m -= offset;
									}
								}
								m += offset;
							} else if (valDigit === lastUntranslatedMaskChar) {
								// matched the last untranslated (raw) mask
								// character that we encountered
								// likely an insert offset the mask character
								// from the last entry; fall
								// through and only increment v
								maskDigitCount--;
								lastUntranslatedMaskChar = undefined;
							} else if (translation.optional) {
								m += offset;
								v -= offset;
							} else if (translation.fallback) {
								buf[addMethod](translation.fallback);
								m += offset;
								v -= offset;
							} else {
								p.invalid.push({p: v, v: valDigit, e: translation.pattern});
							}
							v += offset;
						} else {
							if (!skipMaskChars) {
								buf[addMethod](maskDigit);
							}

							if (valDigit === maskDigit) {
								maskDigitPosArr.push(v);
								v += offset;
							} else {
								lastUntranslatedMaskChar = maskDigit;
								maskDigitPosArr.push(v + maskDigitCount);
								maskDigitCount++;
							}

							m += offset;
						}
					}

					var lastMaskCharDigit = mask.charAt(lastMaskChar);
					if (maskLen === valLen + 1 && !jMask.translation[lastMaskCharDigit]) {
						buf.push(lastMaskCharDigit);
					}

					var newVal = buf.join('');
					p.mapMaskdigitPositions(newVal, maskDigitPosArr, valLen);
					return newVal;
				},
				mapMaskdigitPositions: function(newVal, maskDigitPosArr, valLen) {
					var maskDiff = options.reverse ? newVal.length - valLen : 0;
					p.maskDigitPosMap = {};
					for (var i = 0; i < maskDigitPosArr.length; i++) {
						p.maskDigitPosMap[maskDigitPosArr[i] + maskDiff] = 1;
					}
				},
				callbacks: function (e) {
					var val = p.val(),
					changed = val !== oldValue,
					defaultArgs = [val, e, el, options],
					callback = function(name, criteria, args) {
						if (typeof options[name] === 'function' && criteria) {
							options[name].apply(this, args);
						}
					};

					callback('onChange', changed === true, defaultArgs);
					callback('onKeyPress', changed === true, defaultArgs);
					callback('onComplete', val.length === mask.length, defaultArgs);
					callback('onInvalid', p.invalid.length > 0, [val, e, el, p.invalid, options]);
				}
		};

		el = $(el);
		var jMask = this, oldValue = p.val(), regexMask;

		mask = typeof mask === 'function' ? mask(p.val(), undefined, el,  options) : mask;

		// public methods
		jMask.mask = mask;
		jMask.options = options;
		jMask.remove = function() {
			var caret = p.getCaret();
			if (jMask.options.placeholder) {
				el.removeAttr('placeholder');
			}
			if (el.data('mask-maxlength')) {
				el.removeAttr('maxlength');
			}
			p.destroyEvents();
			p.val(jMask.getCleanVal());
			p.setCaret(caret);
			return el;
		};

		// get value without mask
		jMask.getCleanVal = function() {
			return p.getMasked(true);
		};

		// get masked value without the value being in the input or element
		jMask.getMaskedVal = function(val) {
			return p.getMasked(false, val);
		};

		jMask.init = function(onlyMask) {
			onlyMask = onlyMask || false;
			options = options || {};

			jMask.clearIfNotMatch  = $.jMaskGlobals.clearIfNotMatch;
			jMask.byPassKeys       = $.jMaskGlobals.byPassKeys;
			jMask.translation      = $.extend({}, $.jMaskGlobals.translation, options.translation);

			jMask = $.extend(true, {}, jMask, options);

			regexMask = p.getRegexMask();

			if (onlyMask) {
				p.events();
				p.val(p.getMasked());
			} else {
				if (options.placeholder) {
					el.attr('placeholder' , options.placeholder);
				}

				// this is necessary, otherwise if the user submit the form
				// and then press the "back" button, the autocomplete will erase
				// the data. Works fine on IE9+, FF, Opera, Safari.
				if (el.data('mask')) {
					el.attr('autocomplete', 'off');
				}

				// detect if is necessary let the user type freely.
				// for is a lot faster than forEach.
				for (var i = 0, maxlength = true; i < mask.length; i++) {
					var translation = jMask.translation[mask.charAt(i)];
					if (translation && translation.recursive) {
						maxlength = false;
						break;
					}
				}

				if (maxlength) {
					el.attr('maxlength', mask.length).data('mask-maxlength', true);
				}

				p.destroyEvents();
				p.events();

				var caret = p.getCaret();
				p.val(p.getMasked());
				p.setCaret(caret);
			}
		};

		jMask.init(!el.is('input'));
	};

	$.maskWatchers = {};
	var HTMLAttributes = function () {
		var input = $(this),
		options = {},
		prefix = 'data-mask-',
		mask = input.attr('data-mask');

		if (input.attr(prefix + 'reverse')) {
			options.reverse = true;
		}

		if (input.attr(prefix + 'clearifnotmatch')) {
			options.clearIfNotMatch = true;
		}

		if (input.attr(prefix + 'selectonfocus') === 'true') {
			options.selectOnFocus = true;
		}

		if (notSameMaskObject(input, mask, options)) {
			return input.data('mask', new Mask(this, mask, options));
		}
	},
	notSameMaskObject = function(field, mask, options) {
		options = options || {};
		var maskObject = $(field).data('mask'),
		stringify = JSON.stringify,
		value = $(field).val() || $(field).text();
		try {
			if (typeof mask === 'function') {
				mask = mask(value);
			}
			return typeof maskObject !== 'object' || stringify(maskObject.options) !== stringify(options) || maskObject.mask !== mask;
		} catch (e) {}
	},
	eventSupported = function(eventName) {
		var el = document.createElement('div'), isSupported;

		eventName = 'on' + eventName;
		isSupported = (eventName in el);

		if ( !isSupported ) {
			el.setAttribute(eventName, 'return;');
			isSupported = typeof el[eventName] === 'function';
		}
		el = null;

		return isSupported;
	};

	$.fn.mask = function(mask, options) {
		options = options || {};
		var selector = this.selector,
		globals = $.jMaskGlobals,
		interval = globals.watchInterval,
		watchInputs = options.watchInputs || globals.watchInputs,
		maskFunction = function() {
			if (notSameMaskObject(this, mask, options)) {
				return $(this).data('mask', new Mask(this, mask, options));
			}
		};

		$(this).each(maskFunction);

		if (selector && selector !== '' && watchInputs) {
			clearInterval($.maskWatchers[selector]);
			$.maskWatchers[selector] = setInterval(function(){
				$(document).find(selector).each(maskFunction);
			}, interval);
		}
		return this;
	};

	$.fn.masked = function(val) {
		return this.data('mask').getMaskedVal(val);
	};

	$.fn.unmask = function() {
		clearInterval($.maskWatchers[this.selector]);
		delete $.maskWatchers[this.selector];
		return this.each(function() {
			var dataMask = $(this).data('mask');
			if (dataMask) {
				dataMask.remove().removeData('mask');
			}
		});
	};

	$.fn.cleanVal = function() {
		return this.data('mask').getCleanVal();
	};

	$.applyDataMask = function(selector) {
		selector = selector || $.jMaskGlobals.maskElements;
		var $selector = (selector instanceof $) ? selector : $(selector);
		$selector.filter($.jMaskGlobals.dataMaskAttr).each(HTMLAttributes);
	};

	var globals = {
			maskElements: 'input,td,span,div',
			dataMaskAttr: '*[data-mask]',
			dataMask: true,
			watchInterval: 300,
			watchInputs: true,
			keyStrokeCompensation: 10,
			// old versions of chrome dont work great with input event
			useInput: !/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent) && eventSupported('input'),
			watchDataMask: false,
			byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
			translation: {
				'0': {pattern: /\d/},
				'9': {pattern: /\d/, optional: true},
				'#': {pattern: /\d/, recursive: true},
				'A': {pattern: /[a-zA-Z0-9]/},
				'S': {pattern: /[a-zA-Z]/}
			}
	};

	$.jMaskGlobals = $.jMaskGlobals || {};
	globals = $.jMaskGlobals = $.extend(true, {}, globals, $.jMaskGlobals);

	// looking for inputs with data-mask attribute
	if (globals.dataMask) {
		$.applyDataMask();
	}

	setInterval(function() {
		if ($.jMaskGlobals.watchDataMask) {
			$.applyDataMask();
		}
	}, globals.watchInterval);
}, window.jQuery, window.Zepto));


