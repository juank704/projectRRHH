var TableDatatablesAjax = function() {
	var ID;
	var initPickers = function() {
		// init date pickers
		$('.date-picker').datepicker({
			rtl : App.isRTL(),
			autoclose : true
		});
	}

	var viewTable = function() {

		var grid = new Datatable();

		grid.init({
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
			dataTable : { // here you can define a typical datatable
				// settings from
				// http://datatables.net/usage/options

				// Uncomment below line("dom" parameter) to fix the
				// dropdown overflow issue in the datatable cells. The
				// default datatable layout
				// setup uses scrollable div(table-scrollable) with
				// overflow:auto to enable vertical scroll(see:
				// assets/global/scripts/datatable.js).
				// So when dropdowns used the scrollable div should be
				// removed.
				// "dom": "<'row'<'col-md-8 col-sm-12'pli><'col-md-4
				// col-sm-12'<'table-group-actions
				// pull-right'>>r>t<'row'<'col-md-8
				// col-sm-12'pli><'col-md-4 col-sm-12'>>",

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
					"url" : "/eDteWeb/json/libro/view", // ajax
				// source
				},
				"columnDefs" : [ {
					"targets" : [ 2 ],
					"render" : function(data, type, full) {
						var html ="";
						switch (full[2]) {
						case "1":
							html += "VENTA";
							break;
						case "2":
							html += "COMPRA";
							break;
					
						}
						return html;
					}

				}
				,
				{
					"targets" : [ 3 ],
					"render" : function(data, type, full) {
					    var html ="";
					    var f = full[3].split('-');; 
						html =f[1]+"-"+f[0];
						return html;
					}

				},
				{
					"targets" : [ 4 ],
					"render" : function(data, type, full) {
					    var html ="";
					    var f = full[4].split('-');; 
						html =f[2]+"-"+f[1]+"-"+f[0];
						return html;
					}

				},
				{
					"targets" : [ 5 ],
					"render" : function(data, type, full) {
						var html ="";
						switch (full[5]) {
						case "1":
							html += "TOTAL";
							break;
						case "2":
							html += "COMPRA";
							break;
						case "3":
							html += "REENVIO";
							break;
						}
						return html;
					}

				},
				{
					"targets" : [ 6 ],
					"render" : function(data, type, full) {
						var html ="";
						switch (full[6]) {
						case "0":
							html += "";
							break;
						case "1":
							html += "Aceptado";
							break;
						case "2":
							html += "Reparos";
							break;
						case "3":
							html += "Rechazado";
							break;
						
						case "10":
							html += "Xml Generado";
							break;
						case "11":
							html += "Xml Firmado";
							break;
						case "12":
							html += "SII Validando";
							break;
						}
						return html;
					}

				}
				,
				{
					"targets" : [ 8 ],
					"render" : function(data, type, full) {
						
						
						var libro ="";
						switch (full[2]) {
						case "1":
							libro += "VENTA";
							break;
						case "2":
							libro += "COMPRA";
							break;
					
						}
						 var f = full[3].split('-');; 
							periodo =f[1]+"-"+f[0];
						
						var	dataLibro=full[1]+' ' +libro+' ' + periodo
						
						var html = "<div class='btn-group pull-right  btn-group-sm'>";
						
						html += '<a id="btnDetalle" class="btn grey btn-table pull-right" data-toggle="modal" href="#basic" data-id="'+full[8]+'" data-libro="'+dataLibro+'" >Detalle</a>';

						html += '<a class="btn grey btn-table pull-right" href="downloadLibro/'+full[0]+'" target="_blanck">xml <i class="fa fa-file-code-o" aria-hidden="true"></i></a>';
						
												html += "</div>";
						return html;
					}

				}],
				"order" : [ [ 1, "desc" ] ]
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

		// grid.setAjaxParam("customActionType", "group_action");
		// grid.getDataTable().ajax.reload();
		// grid.clearAjaxParams();
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
						file : {
							required : true,
							extension: "txt"

						},
						

					},

					messages : {

						file : {
							required: "Seleccione el archivo",
							extension: "Debe Seleccionar un archivo TXT"
							
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
							error.insertAfter(element); // for other inputs,
							// just perform default
							// behavior
						}
					},

					invalidHandler : function(event, validator) { // display
						// error
						// alert on
						// form
						// submit

						App
								.alert({
									container : '#modal-modifica-cuenta .modal-body', // alerts
									// parent
									// container(by
									// default
									// placed
									// after
									// the
									// page
									// breadcrumbs)
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

						// success1.hide();
						// error1.show();
						// Metronic.scrollTo(error1, -200);
					},

					highlight : function(element) { // hightlight error inputs
						$(element).closest('.form-group').addClass('has-error'); // set
						// error
						// class
						// to
						// the
						// control
						// group
					},

					unhighlight : function(element) { // revert the change
						// done by hightlight
						$(element).closest('.form-group').removeClass(
								'has-error'); // set error class to the
						// control group
					},

					success : function(label) {
						label.closest('.form-group').removeClass('has-error'); // set
						// success
						// class
						// to
						// the
						// control
						// group
					},

					submitHandler : function(form) {

						App.blockUI({
							target : '#modal-modifica-cuenta',
							overlayColor : 'none',
							boxed : true,
							centerX : true,
							centerY : true,
							message : 'Procesando...'
						});

						// parametrosCuenta.Cuenta = cuenta;

						row.id = ID;
						row.nombre = "adasasd";
						row.file=$("#create_pfx_file").val();
						console.log(row);
						console.log(JSON.stringify(row));
						
						var oMyForm = new FormData();
						  oMyForm.append("file", file.files[0]);
						  oMyForm.append("hola","hola");

						$
								.ajax({
									url: '/eDteWeb/json/libro/put',
								    data: oMyForm,
								    dataType: 'text',
								    processData: false,
								    contentType: false,
								    type: 'POST',
									 

									success : function(data, textStatus, jqXHR) {
										var obj = jQuery.parseJSON(data);
										App.unblockUI('#modal-crea-folio');

										$('#modal-crea-folio .modal-footer')
												.append(
														' <input type="hidden" data-dismiss="modal" class="btn default cerrar" value="Cancelar" />');

										var table = $('#datatable_ajax')
												.DataTable({
													bRetrieve : true
												});
										table.ajax.reload();
										// handleDemo1();
										$('#modal-crea-folio .modal-footer .cerrar').click();

										App.alert({
											container : $('#alert_container')
													.val(), // alerts parent
											// container
											place : 'append', // append or
											// prepent in
											// container
											type : 'success', // alert's type
											message : obj.mensaje, 
											close : true,
											reset : false,
											focus : true, 
											closeInSeconds : 5,
											icon : 'fa fa-check'
										});
									},
									error : function(jqXHR, textStatus,
											errorThrown) {

										App.unblockUI('#modal-modifica-cuenta');
										$('#modal-modifica-cuenta').modal(
												'hide')

										App.alert({
											container : $('#alert_container')
													.val(), // alerts parent
											// container
											place : 'append', // append or
											// prepent in
											// container
											type : 'danger', // alert's type
											message : textStatus + ': '
													+ errorThrown, // alert's
											// message
											close : true, // make alert
											// closable
											reset : false, // close all
											// previouse alerts
											// first
											focus : true, // auto scroll to
											// the alert after
											// shown
											closeInSeconds : 50
										// auto close after defined seconds
										// icon: 'fa fa-check' // put icon class
										// before the message
										});

									}
								});

					}

				});

	}
	var create = function() {
		$("#modal-detalle").on(
				'show.bs.modal',
				function(e) {
					$("#file").val("");
					
				});
	}
	
	$(document).on("click", "#btnDetalle", function () {
	     var log = $(this).data('id');
	     var titulo = $(this).data('libro');
	     var obj =$("#textDetalle").text( log );
	     $("#detalleTitulo").text("Detalle Libro: "+ titulo );
	     obj.html(obj.html().replace(/\n/g,'<br/>'));
	     //alert($("#textDetalle").text());
	     // As pointed out in comments, 
	     // it is superfluous to have to manually call the modal.
	     // $('#addBookDialog').modal('show');
	});
				

	return {

		// main function to initiate the module
		init : function() {

			initPickers();
			viewTable();

			editar();
			create();

			jQuery.validator.addMethod("alfanumerico",
					function(value, element) {
						return this.optional(element)
								|| /^[a-zA-Z0-9._-]+$/.test(value);
					}, "solo números ddddd");

		}

	};
	

}();

jQuery(document).ready(function() {
	TableDatatablesAjax.init();
});