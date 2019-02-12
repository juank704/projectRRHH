
var TableDatatablesAjax = function() {
	var handleDemo1 = function() {

		var grid = new Datatable();

		grid
				.init({
					src : $("#datatable_ajax"),
					onSuccess : function(grid, response) {
						// grid: grid object
						// response: json object of server side ajax response
						// execute some code after table records loaded
					},
					onError : function(grid) {
						// execute some code on network or other general error
					},
					onDataLoad : function(grid) {
						// execute some code on ajax data load
					},
					loadingMessage : 'Loading...',
					dataTable : {

						"bStateSave" : true, // save datatable
						// state(pagination, sort, etc)
						// in cookie.

						"lengthMenu" : [ [ 10, 20, 50, 100, 150, -1 ],
								[ 10, 20, 50, 100, 150, "All" ] // change per
						// page values
						// here
						],
						"pageLength" : 20, // default record count per page
						"ajax" : {
							"url" : "/simpleWeb/json/work/getAllDocumentos", // ajax
						// source
						},
						"columnDefs" : [ {
							"targets": [1],
							"render": function(data, type, full){
								console.log(full);
								var html = "";
								html += "<button id='"+full[0]+"' class='btn btn-circle yellow btn-outline btn-sm dropdown-toggle' title='Modificar' type='button' data-toggle='dropdown'><span class='fa fa-pencil-square-o fa-lg'></span></button>";
								html += "<button id='"+full[0]+"' class='btn btn-circle red btn-outline btn-sm' title='Eliminar' onclick= 'javascript: deleteDoc(id)' type='button'><span class='fa fa-trash-o fa-lg'></span></button>";
								return html;
								
								
								
							}
						} ],
						"order" : [ [ 1, "asc" ] ]
					// set first column as a default sort by asc

					}
				});

		// handle group actionsubmit button click
		grid.getTableWrapper().on(
				'click',
				'.table-group-action-submit',
				function(e) {
					e.preventDefault();
					var action = $(".table-group-action-input", grid
							.getTableWrapper());
					if (action.val() != "" && grid.getSelectedRowsCount() > 0) {
						grid.setAjaxParam("customActionType", "group_action");
						grid.setAjaxParam("customActionName", action.val());
						grid.setAjaxParam("id", grid.getSelectedRows());
						grid.getDataTable().ajax.reload();
						grid.clearAjaxParams();
					} else if (action.val() == "") {
						App.alert({
							type : 'danger',
							icon : 'warning',
							message : 'Please select an action',
							container : grid.getTableWrapper(),
							place : 'prepend'
						});
					} else if (grid.getSelectedRowsCount() === 0) {
						App.alert({
							type : 'danger',
							icon : 'warning',
							message : 'No record selected',
							container : grid.getTableWrapper(),
							place : 'prepend'
						});
					}
				});

	}

	var obtener = function() {
		$("#modal-modifica-certificacion").on(
				'show.bs.modal',
				function(e) {

					var button = $(e.relatedTarget);// Button which is clicked
					var id = button.data('id');// Get id of the button
					ID = id;
					$.ajax({
						type : 'GET',
						url : "/restPesticida/json/certificacion/" + id,
						data : "",
						success : function(data) {
							console.log(data)
							$("#updatecertificacionesCol").val(
									data.certificacionesCol);
							$("#updateFeCreacion").val(data.creado);
							$("#updateModificacion").val(data.modificado);

						}
					});
				});
	}

	var editar = function() {

		var row = {};

		var form1 = $('#modifica-cuenta-form');

		form1
				.validate({
					errorElement : 'span',
					errorClass : 'help-block help-block-error',
					focusInvalid : true,
					rules : {
						updateCodProd : {
							required : true,
							rangelength : [ 5, 50 ],
							alfanumerico : true
						},
						updatecodRem : {
							required : true,
							rangelength : [ 5, 50 ],
							alfanumerico : true
						}

					},

					messages : {

						updatecodRem : {
							required : "Este campo es obligatorio",
							rangelength : "Debe ser mayor a 5 y menor a 50",
							alfanumerico : "Ingrese sólo valores alfanumericos"
						}

					},

					errorPlacement : function(error, element) { // render error
						// placement for
						// each input
						// type
						if (element.parent(".input-group").size() > 0) {
							error.insertAfter(element.parent(".input-group"));
						} else if (element.attr("data-error-container")) {
							error
									.appendTo(element
											.attr("data-error-container"));
						} else if (element.parents('.radio-list').size() > 0) {
							error.appendTo(element.parents('.radio-list').attr(
									"data-error-container"));
						} else if (element.parents('.radio-inline').size() > 0) {
							error.appendTo(element.parents('.radio-inline')
									.attr("data-error-container"));
						} else if (element.parents('.checkbox-list').size() > 0) {
							error.appendTo(element.parents('.checkbox-list')
									.attr("data-error-container"));
						} else if (element.parents('.checkbox-inline').size() > 0) {
							error.appendTo(element.parents('.checkbox-inline')
									.attr("data-error-container"));
						} else {
							error.insertAfter(element);
						}
					},

					invalidHandler : function(event, validator) {
						App
								.alert({
									container : '#modal-modifica-cuenta .modal-body',
									place : 'prepend', // append or prepent in
									// container
									type : 'danger', // alert's type
									message : 'Por favor Corrija los errores antes de continuar', // alert's
									// message
									close : false, // make alert closable
									reset : true, // close all previouse
									// alerts first
									focus : false, // auto scroll to the alert
									// after shown
									closeInSeconds : 5
								});
					},

					highlight : function(element) { // hightlight error inputs
						$(element).closest('.form-group').addClass('has-error');
					},

					unhighlight : function(element) { // revert the change
						// done by hightlight
						$(element).closest('.form-group').removeClass(
								'has-error'); // set error class to the
						// control group
					},

					success : function(label) {
						label.closest('.form-group').removeClass('has-error');
					},

					submitHandler : function(form) {

						// parametrosCuenta.Cuenta = cuenta;

						row.certificacionesCol = $('#updatecertificacionesCol')
								.val();
						;
						row.idUser = $("#idUserPefil").val();
						row.idCertificaciones = ID;

						$
								.ajax({
									url : PROYECT + "json/certificacion/put",
									type : "PUT",
									data : JSON.stringify(row),
									beforeSend : function(xhr) {
										xhr.setRequestHeader("Accept",
												"application/json");
										xhr.setRequestHeader("Content-Type",
												"application/json");
									},

									success : function(data, textStatus, jqXHR) {
										$('#modal-modifica-certificacion')
												.modal("toggle");
										swal({
											title : 'Certificacion Modificado exitosamente!',
											animation : true,
											customClass : 'animated tada'
										})
										var table = $('#datatable_ajax')
												.DataTable({
													bRetrieve : true
												});
										table.ajax.reload();

									},
									error : function(jqXHR, textStatus,
											errorThrown) {
									}
								});

					}

				});

	}

	var insertCertificacion = function() {
		var row = {};

		var form1 = $('#form-InsertCertificacion');

		form1
				.validate({
					errorElement : 'span',
					errorClass : 'help-block help-block-error',
					focusInvalid : true,
					rules : {
						regCertificacion : {
							required : true,
							rangelength : [ 2, 50 ],
							alfanumerico : true
						}

					},

					messages : {

						regCertificacion : {
							required : "Este campo es obligatorio",
							rangelength : "No debe ser menor a 2 y mayor a 50 caracteres",
							alfanumerico : "ingrese valores alfanumericos"
						}

					},

					errorPlacement : function(error, element) {
						if (element.parent(".input-group").size() > 0) {
							error.insertAfter(element.parent(".input-group"));
						} else if (element.attr("data-error-container")) {
							error
									.appendTo(element
											.attr("data-error-container"));
						} else if (element.parents('.radio-list').size() > 0) {
							error.appendTo(element.parents('.radio-list').attr(
									"data-error-container"));
						} else if (element.parents('.radio-inline').size() > 0) {
							error.appendTo(element.parents('.radio-inline')
									.attr("data-error-container"));
						} else if (element.parents('.checkbox-list').size() > 0) {
							error.appendTo(element.parents('.checkbox-list')
									.attr("data-error-container"));
						} else if (element.parents('.checkbox-inline').size() > 0) {
							error.appendTo(element.parents('.checkbox-inline')
									.attr("data-error-container"));
						} else {
							error.insertAfter(element); // for other inputs,
							// just perform default
							// behavior
						}
					},

					invalidHandler : function(event, validator) { // display
						// error
					},

					highlight : function(element) { // hightlight error inputs
						$(element).closest('.form-group').addClass('has-error');
					},

					unhighlight : function(element) {
						$(element).closest('.form-group').removeClass(
								'has-error');
					},

					success : function(label) {
						label.closest('.form-group').removeClass('has-error');
					},

					submitHandler : function(form) {

						row.certificacionesCol = $('#regCertificacion').val();
						row.idUser = $('#idUserPefil').val();
						console.log(row);

						$
								.ajax({
									url : PROYECT
											+ "json/certificacion/insertCertificacion",
									type : "PUT",
									data : JSON.stringify(row),
									beforeSend : function(xhr) {
										xhr.setRequestHeader("Accept",
												"application/json");
										xhr.setRequestHeader("Content-Type",
												"application/json");
									},

									success : function(data, textStatus, jqXHR) {
										$('#modal-newCertificacion').modal(
												'toggle');
										swal({
											title : 'Certificación ingresado exitosamente!',
											animation : true,
											customClass : 'animated tada'
										})
										var table = $('#datatable_ajax')
												.DataTable({
													bRetrieve : true
												});
										table.ajax.reload();
									},
									error : function(jqXHR, textStatus,
											errorThrown) {
										console.log("error");

									}
								});
					}

				});
	}

return {

		// main function to initiate the module
		init : function() {

			handleDemo1();
			insertCertificacion();
			editar();
			obtener();
			jQuery.validator.addMethod("alfanumerico",
					function(value, element) {
						return this.optional(element)
								|| /^[a-zA-Z0-9._-]+$/.test(value);
					}, "solo números ddddd");
		}

	};;
	
}();
function addDoc(){
	var json = {
		idTemplate: 0,
		nombre: $("#test2").val()
	}
	$.ajax({
		url : "/simpleWeb/json/WORK/insertDocumentos/",
		type : "PUT",
		data : JSON.stringify(json),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},success: function(data){
			alerta("Datos Guardados Satisfactoriamente");
		}
	})
}

function deleteDoc(id){
	$(document).ready(function(){
		var c = confirmar.confirm("¿Esta seguro de eliminar este Documento?");
		$(c.aceptar).click(function(){
			

			console.log(id);	
			$.ajax({
				url : "/simpleWeb/json/WORK/deleteDocumentos/"+id,
				type: "POST",
				success: function(data){
					alerta("Datos Eliminados Satisfactoriamente");
				}
			})
			
		})
	})

	
	
	
}

jQuery(document).ready(function() {
	TableDatatablesAjax.init();
});
