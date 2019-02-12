var documento = new Object();
$(document).ready(function() {
	$("#loading").show();
	llenarSelectorEmpresa();
	llenarSelectorTipo();
	onLoadDocuments();

	//Change Empresa
	$('#editarEmpresaDocumento, #agregarEmpresaDocumento').change(function() {
		llenarSelectorHuerto($(this).val());
	});

});
function searchDescripcion() {
	var table = $('#tbl_doc').DataTable();
	var value = $("#searchDescripcion").val();
	table.column(1).search(value).draw();
}
function dataFile($this) {
	var input = document.getElementById('agregarFile');
	console.log(input.file);
	console.log(input.files)
}

function searchEmpresa() {
	var table = $('#tbl_doc').DataTable();
	var value = $("#searchEmpresa").val();

	table.column(3).search(value).draw();
}
function searchTipo() {
	var table = $('#tbl_doc').DataTable();
	var value = $("#searchTipo").val();
	if ($("#searchTipo").val() == -1) {
		value = "";
	}
	table.column(2).search(value).draw();
}
function llenarSelectorEmpresa() {
	$.ajax({
		type : "GET",
		url : "/simpleWeb/json/work/getSociedad/",
		async : false,
		dataType : "json",
		success : function(data) {
			$.each(data, function(key, registro) {
				$("#searchEmpresa").append(
						'<option value="' + registro.sociedad + '">'
								+ registro.sociedad + '</option>');
				$("#agregarEmpresaDocumento").append(
						'<option value="' + registro.idSociedad + '">'
								+ registro.sociedad + '</option>');
				$("#editarEmpresaDocumento").append(
						'<option value="' + registro.idSociedad + '">'
								+ registro.sociedad + '</option>');
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
}
function llenarSelectorHuerto(idEmpresa) {
	$.ajax({
		type : "GET",
		url : "/simpleWeb/json/work/getCampoBySociedad/" + idEmpresa,
		async : true,
		dataType : "json",
		success : function(data) {
			$("#agregarHuertoDocumento").empty();
			$("#editarHuertoDocumento").empty();
			$.each(data, function(key, registro) {
				//$("#searchEmpresa").append('<option value="' + registro.sociedad + '">'+ registro.sociedad + '</option>');
				$("#agregarHuertoDocumento").append(
						'<option value="' + registro.campo + '">'
								+ registro.descripcion + '</option>');
				$("#editarHuertoDocumento").append(
						'<option value="' + registro.campo + '">'
								+ registro.descripcion + '</option>');
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
}
function llenarSelectorTipo() {
	$.ajax({
		type : "GET",
		url : "/simpleWeb/json/work/getParametros/TIPO_DOCUMENTO",
		async : false,
		dataType : "json",
		success : function(data) {
			$("#searchTipo").append(
					'<option value="-1">Seleccionar...</option>');
			$.each(data, function(key, registro) {
				$("#searchTipo").append(
						'<option value="' + registro.descripcion + '">'
								+ registro.descripcion + '</option>');
				$("#agregarTipoDocumento").append(
						'<option value="' + registro.llave + '">'
								+ registro.descripcion + '</option>');
				$("#editarTipoDocumento").append(
						'<option value="' + registro.llave + '">'
								+ registro.descripcion + '</option>');

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
}
function borrarMant($Id) {

}
function buscarMan($Id, $dd) {
	swal({
		position : "top-end",
		type : "success",
		title : "Búsqueda exitosa",
		showConfirmButton : false,
		timer : 550
	});
}
/*--------------submits--------------------------*/
$("#insertDocForm").submit(function(event) {
	addDocumentB();
});

$("#editarDocumentoModal").submit(function(event) {
	event.preventDefault();
	updateDocument();
});
/*-----------------CRUD-----------------------*/
/*-----------------onload-----------------------*/
function onLoadDocuments() {
	var table;
	if ($.fn.dataTable.isDataTable("#tbl_doc")) {
		table = $("#tbl_doc").DataTable();
		table.clear();
	} else {
		table = $("#tbl_doc").DataTable({
			searching : true,
			paging : true,
			info : false,
			search : true,
		})
	}

	$
			.ajax({
				type : "GET",
				async : false,
				dataType : "json",
				url : "/simpleWeb/json/work/Templates/getTemplates/",
				processData : false,
				contentType : false,
				success : function(data) {
					$
							.each(
									data,
									function(k, v) {
										var acciones = "";
										acciones += "<button title='Actualizar' id='"
												+ k
												+ "' onclick=\"javascript:verMant('"
												+ v.idTemplate+"','"+k
												+ "')\" class='btn btn-circle green btn-outline btn-sm col-md-3'><i class='fa fa-eye fa-lg'></i></button>";
										acciones += "<button title='Actualizar' id='"
												+ k
												+ "' onclick=\"javascript:modificarMant('"
												+ v.idTemplate
												+ "')\" class='btn btn-circle yellow btn-outline btn-sm col-md-3'><i class='fa fa-pencil-square-o fa-lg'></i></button>";
										acciones += "<button title='Borrar' id='"
												+ k
												+ "' onclick=\"javascript:borrarMant("
												+ v.idTemplate
												+ ")\" class='btn btn-circle red btn-outline btn-sm col-md-3'><i class='fa fa-trash-o fa-lg'></i></button>";
										table.row.add([ k + 1, v.documento,
												v.nombreTipoDocumento,
												v.nombreEmpresa,
												v.fechaModificacion,
												v.nombreUsuario, acciones ]);

									});
					table.draw();
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
/*-----------------Read-----------------------*/

/*-----------------Create-----------------------*/

function addDocumentB() {
	let
	documento = new FormData();

	documento.append("documento", $("#agregarNombre").val());
	documento.append("tipoDocumento", $("#agregarTipoDocumento").val());
	documento.append("idEmpresa", $("#agregarEmpresaDocumento").val());
	documento.append("file", $('#agregarFile').prop("files")[0]);
	documento.append("idHuerto", $('#agregarHuertoDocumento').val());

	//Enviar documentos y datos del formulario al servicio 
	$.ajax({
		url : "/simpleWeb/file/work/documents/insertDocument/",
		dataType : 'script',
		async : false,
		cache : false,
		contentType : false,
		processData : false,
		data : documento, //Datos
		type : 'post',
		success : function() {

		}
	});
}
/*----------------Delete------------------------*/

function borrarMant($id) {
	swal({
		title : "Estás Seguro?",
		text : "No serás capaz de revertir esto",
		type : "warning",
		showCancelButton : true,
		confirmButtonColor : "#3085d6",
		cancelButtonColor : "#d33",
		confirmButtonText : "Bórralo!"
	}).then(function(result) {
		if (result.value) {
			deleteDocument($id);

		}
	});
}
/*----------------Delete function------------------------*/

function deleteDocument($id) {
	$.ajax({
		type : "PUT",
		async : false,
		url : "/simpleWeb/json/work/documents/deleteDocument/" + $id,

		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success : function(data) {
			swal({
				position : "top-end",
				type : "success",
				title : "Documento Borrado",
				showConfirmButton : false,
				timer : 550
			}).then(function(result) {
				location.reload();
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
}
/*----------------Modify------------------------*/
function modificarMant($id) {
	$.ajax({
		type : "GET",
		async : false,
		processData : false,

		url : "/simpleWeb/json/work/Templates/getTemplateById/" + $id,

		success : function(data) {

			documento.documento = data.documento;
			documento.fechaCreacion = data.fechaCreacion;
			documento.fechaModificacion = data.fechaModificacion;
			documento.tipoDocumento = data.tipoDocumento;
			documento.idEmpresa = data.idEmpresa;
			documento.idHuerto = data.idHuerto;
			documento.idTemplate = $("#editarId");

			$("#editarNombre").val(data.documento);
			$("#editarFechaCreacion").val(data.fechaCreacion);
			$("#editarFechaModificacion").val(data.fechaModificacion);
			$("#editarTipoDocumento").val(data.tipoDocumento);
			$("#editarEmpresaDocumento").val(data.idEmpresa);
			//Llenar Huertos
			llenarSelectorHuerto(data.idEmpresa)
			$("#editarHuertoDocumento").val(data.idHuerto);
			$("#editarId").val($id);
			//pzfgd critica funcional
			$("#editarDocumentoModal").modal("toggle");
			//manejador de la llamada a la base de datos33
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
			})
		}
	});

}
function verMant(id,nfila) {
	
	let nombreDocumento = $(document).find('#'+nfila).closest('tr').find('td:eq(1)').html();
	
	window.open("/simpleWeb/json/work/Templates/showTemplate/"+id+"?nombreDocumento="+nombreDocumento);
	
//	$.ajax({
//		type : "PUT",
//		async : true,
//		url : "/simpleWeb/json/work/Templates/showTemplate/" + id,
//		data : document
//		success : function(data) {
//			
//		}
//	});

	//	//setup ajax
	//	$.ajaxSetup({
	//	  beforeSend:function(jqXHR,settings){
	//	    if (settings.dataType === 'binary'){
	//	      settings.xhr().responseType='arraybuffer';
	//	      settings.processData=false;
	//	    }
	//	  }
	//	})
	//
	//	//use ajax now
	//	$.ajax({
	//	  url:"/simpleWeb/json/work/Templates/getFileById//"+id,
	//	  dataType:"binary",
	//	  success:function(data){
	//	    console.log(data); //ArrayBuffer
	//	    console.log(new Blob([data])) // Blob
	//	  }
	//	})
}

/*----------------Create------------------------*/
function agregarDocumentoNuevo() {
	$("#agregarDocumentoModal").modal("toggle");
}
/*---------------Update Document--------------- */
function updateDocument1() {
	$id = $("#editarId").val();
	$
			.ajax({
				type : "GET",
				async : false,
				url : "/simpleWeb/json/work/documents/getDocument/" + $id,

				beforeSend : function(xhr) {
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},
				success : function(data) {
					data.documento = $("#editarNombre").val();
					data.idHuerto = $("#editarHuertoDocumento").val();
					data.idEmpresa = $("#editarEmpresaDocumento").val();
					$
							.ajax({
								type : "PUT",
								async : false,
								url : "/simpleWeb/json/work/documents/updateDocument/",
								data : JSON.stringify(data),
								beforeSend : function(xhr) {
									xhr.setRequestHeader("Accept",
											"application/json");
									xhr.setRequestHeader("Content-Type",
											"application/json");
								},
								success : function(data) {
									swal({
										position : "top-end",
										type : "success",
										title : "Documento Actualizado",
										showConfirmButton : false,
										timer : 550
									}).then(function(result) {
										location.reload();
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
function updateDocument2() {

	let
	documento = new FormData();

	documento.append("documento", $("#editarNombre").val());
	documento.append("tipoDocumento", $("#editarTipoDocumento").val());
	documento.append("idEmpresa", $("#editarEmpresaDocumento").val());
	documento.append("file", $('#editarFile').prop("files")[0]);
	documento.append("idHuerto", $('#editarHuertoDocumento').val());
	documento.append("idTemplate", $("#editarId").val());

	//Enviar documentos y datos del formulario al servicio 
	$.ajax({
		url : "/simpleWeb/file/work/documents/updateDocuments/",
		dataType : 'script',
		async : false,
		cache : false,
		contentType : false,
		processData : false,
		data : documento, //Datos
		type : 'post',
		success : function() {

		}
	});

	//	$.ajax({
	//	    type: "PUT",
	//	    async: false,
	//	    url: "/simpleWeb/json/work/Templates/updateTemplate/",
	//	    data: JSON.stringify(data),
	//	    beforeSend: function(xhr) {
	//	      xhr.setRequestHeader("Accept", "application/json");
	//	      xhr.setRequestHeader("Content-Type", "application/json");
	//	    },
	//	    success: function(data) {
	//	      swal({
	//	        position: "top-end",
	//	        type: "success",
	//	        title: "Documento Actualizado",
	//	        showConfirmButton: false,
	//	        timer: 550
	//	      }).then(function(result){
	//	        location.reload();
	//	      });
	//	      
	//
	//	    },
	//	    error: function(ex) {
	//	      swal({
	//        title: '<i>ERROR</i>',
	//        type: 'info',
	//        html:
	//        JSON.stringify(ex),
	//        showCloseButton: true,
	//        showCancelButton: true,
	//        focusConfirm: false,
	//        confirmButtonText:
	//          '<i class="fa fa-thumbs-up"></i>OK!',
	//        confirmButtonAriaLabel: 'Thumbs up, great!',
	//        cancelButtonText:
	//        '<i class="fa fa-thumbs-down"></i>',
	//        cancelButtonAriaLabel: 'Thumbs down',
	//      });
	//	    }
	//	  });

}

function updateDocument() {
	$id = $("#editarId").val();

	if ($('#editarFile').prop('files')[0] == null) {
		updateDocument1();
	} else {
		updateDocument2();
	}
}
