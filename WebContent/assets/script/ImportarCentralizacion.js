var sociedad;
var fecha_proceso;
var periodo;

var table;	
var table2;
		 if ( $.fn.dataTable.isDataTable("#tbl_Centra") ) {
		    table = $("#tbl_Centra").DataTable();
		    table.clear();
		}
		else {
		    table = $("#tbl_Centra").DataTable( 
		    	{
		    		searching: false,
		    		paging:false,
		    		info: false,
		    		search: false,
		    		"ordering": false
		    	}
		    )	    
		}


$(document).ready(function(){
	llenarSelectorEmpresa();
	
	//Formato de los Inputs
	setFormatInputs();
	
	$("#selectorSociedad").select2({
	    placeholder: "Seleccionar..",
	    allowClear: true
	});
	$("#loading").hide();
});
var sociedades=[];
var sociedad;
var sociedadElegida;

//llenarSelectorPeriodo();
//$('#selectorPeriodo').select2({
//    placeholder: "Seleccionar..",
//    allowClear: true
//});

function setFormatInputs(){
	
//	//Configuracion de Fechas
//	$('.dateWork').each(function(key, value){
//		$(value).datepicker({  firstDay : 1, changeMonth: true, changeYear: true, yearRange: "1930:+10", dateFormat: 'dd-mm-yy' });
//	});
	
}

function llenarSelectorEmpresa(){
	$.ajax({
		  type: "GET",
	      async: false,
		  dataType: "json",	  
		  url: "/simpleWeb/json/work/Empresas/getEmpresas/",	  
		  processData: false,
		  contentType: false,
		  success:function (data){
			  sociedades=data;
			  
			  var newOption = new Option("seleccionar..", "0", false, false);
	    	    // Append it to the select
	    	    $('#selectorSociedad').append(newOption);
			  $.each(data, function(k, v) {
				  if(v.idSociedad!=-1){
					 
			    	if ($('#selectorSociedad').find("option[value='" + v.sociedad + "']").length) {
			    		
			    	} else { 
			    	    // Create a DOM Option and pre-select by default
			    	    var newOption = new Option(v.denominacionSociedad, v.sociedad, false, false);
			    	    // Append it to the select
			    	    $('#selectorSociedad').append(newOption);
			    	}
				  }
			  	});
		  },
		  error:function (ex){
			  swal({
		            title: '<i>ERROR</i>',
		            type: 'info',
		            html: JSON.stringify(ex),
		            showCloseButton: true,
		            showCancelButton: true,
		            focusConfirm: false,
		            confirmButtonText:
		              '<i class="fa fa-thumbs-up"></i>OK!',
		            confirmButtonAriaLabel: 'Thumbs up, great!',
		            cancelButtonText:
		            '<i class="fa fa-thumbs-down"></i>',
		            cancelButtonAriaLabel: 'Thumbs down',
		          });
		  } 
		});
}
function abrirCerrarModal(){
	
	if($('#fecha_proceso').val() == ""){
		alerta("Debe seleccionar una fecha de proceso");
		return false;
	}
	
	$("#crearLibroModal").modal("toggle");
	$("#crearNombreLibro").val("");
}
function abrirCerrarModal2(){
	$("#responseModal").modal("toggle");
	
}



$("#crearLibroForm").submit(function(event) {
	  event.preventDefault();
	  var nombre=$("#crearNombreCentralizacion").val();
	  var Empresa=$("#selectorSociedad").val();
	  var periodo=$("#selectorPeriodo").val();
	  
	  if(nombre!="" && Empresa!="" && periodo!="" && periodo!=null && periodo!=0){
		  
		 alerta("Enviando Excel");
		  debugger;
		//Inicializar Datos
		 let formDocumento = new FormData();
		//Obtener Archivo
		 let fileDocumento = $('#exampleFormControlFile1').prop("files")[0];
			
		 sociedad = $('#selectorSociedad').val();
		 fecha_proceso = $('#fecha_proceso').datepicker({ dateFormat: 'yy-mm-dd' }).val();
		 periodo = $('#selectorPeriodo').datepicker({ dateFormat: 'mmyy' }).val();
		 
		//Inserto documento y datos del formulario
		formDocumento.append("documento", fileDocumento);
		formDocumento.append("idSociedad", sociedad );
		formDocumento.append("fechaProceso", fecha_proceso );
		formDocumento.append("periodo", periodo );
		
		  $("#loading").show();
		  $("#crearLibroModal").modal("toggle"); 
		  $('#crearLibroModal').on('hidden.bs.modal', function (e) {
			  uploadCentralizacion(formDocumento);
			})  
	  }
	  else{
		  $("#crearLibroModal").modal("toggle"); 
		  alerta("Existen Campos Vacios");
	  }
	  
	  
	  
	});
function uploadCentralizacion(formDocumento){
	debugger;
	//Enviar documentos y datos del formulario al servicio 
	$.ajax({
		url : "/simpleWeb/file/work/ExcelImport/Centralizacion/",
		dataType : 'script',
		async : false,
		cache : false,
		contentType : false,
		processData : false,
		data : formDocumento, //Datos
		type : 'post',
		success : function() {
			datatableCentralizacion();
		}
	});
	
	 $("#loading").hide();
}

function datatableCentralizacion(){
	debugger;
	$("#loading").show();
	var valor=1;
	if(valor!="0"){
		
		 if ( $.fn.dataTable.isDataTable("#tbl_Centra") ) {
		    table = $("#tbl_Centra").DataTable();
		    table.clear();
		}
		else {
		    table = $("#tbl_Centra").DataTable( 
		    	{
		    		searching: false,
		    		paging:false,
		    		info: false,
		    		search: false,
		    		"ordering": false
		    	}
		    )	    
		}

	  $.ajax({
		  type: "GET",
	      async: false,
		  dataType: "json",	  
		  url: "/simpleWeb/json/work/CentralizacionDetalleTmp/getCentralizacionDetalleTmp/?id_sociedad="
			  																 +sociedad+"&fecha_proceso="
			  																  +fecha_proceso+"&periodo="
			  							+$('#selectorPeriodo').datepicker({ dateFormat: 'mmyy' }).val(),	  
		  processData: false,
		  contentType: false,
		  success:function (data){
			  var suma=0;
			  var total="TOTAL"
			    $.each(data, function(k, v) {
			    	suma=suma+parseInt(v.valor);  
				   	 table.row.add([ v.concepto, v.descripcion, v.idCECO, v.ordenCO ,v.cuenta, v.proveedor, v.valor]); 		
			    	});
	
			  //Si hay un descuadre en la centralizacion por un monto mayor o menor a 1000 pesos 
			  //Lanzar un mensaje de Error
			  if(suma <= -1000 || suma >= 1000){
				alerta("centralizacion descuadrada por un monto de "+suma+" pesos de diferencia ");  
			  }
			  table.row.add([ "", "", "", "", total, "", suma]);			  
			    
			    table.draw();
			    
		  },
		  error:function (ex){
			  swal({
		            title: '<i>ERROR</i>',
		            type: 'info',
		            html: JSON.stringify(ex),
		            showCloseButton: true,
		            showCancelButton: true,
		            focusConfirm: false,
		            confirmButtonText:
		              '<i class="fa fa-thumbs-up"></i>OK!',
		            confirmButtonAriaLabel: 'Thumbs up, great!',
		            cancelButtonText:
		            '<i class="fa fa-thumbs-down"></i>',
		            cancelButtonAriaLabel: 'Thumbs down',
		          });
			  
		  },
		  complete:function(e){
			  $("#loading").hide();
		  }
			  
		});
	  
	}
	else{
		$("#loading").hide();
		alerta("Debes seleccionar un periodo");
		
	}
	
	
}



function traerPeriodos($this){
	var soc=$this.value;
	$("#selectorPeriodo").html("");
	for(var i=0;i<sociedades.length;i++){
		if(sociedades[i].sociedad==soc){
			sociedadElegida=sociedades[i].denominacionSociedad;
			sociedad=sociedades[i].sociedad;
			break;
		}
	}
	if ( $.fn.dataTable.isDataTable("#tbl_Centra") ) {
	    table = $("#tbl_Centra").DataTable();
	    table.clear().draw();
	}
	else {
	    table = $("#tbl_Centra").DataTable( 
	    	{
	    		searching: false,
	    		paging:false,
	    		info: false,
	    		search: false,
	    		"ordering": false
	    	}
	    )	    
	}
	
	$.ajax({
		  type: "GET",
	      async: false,
		  dataType: "json",	  
		  url: "/simpleWeb/json/work/Centralizacion/getPeriodosBy/"+soc,	  
		  processData: false,
		  contentType: false,
		  success:function (data){
			  if(data.length!=0){
				  var newOption = new Option("seleccionar..", "0", false, false);
		    	    // Append it to the select
		    	    $('#selectorPeriodo').append(newOption);
				  $.each(data, function(k, v) {
						 
				    	if ($('#selectorPeriodo').find("option[value='" + v.periodo + "']").length) {
				    		
				    	} else { 
				    	    // Create a DOM Option and pre-select by default
				    		
				    		var year=""+v.periodo;
				    			year=year.substring(0,4);
				    		var month=""+v.periodo;
				    		month=month.substring(4,6);
				    	    var newOption = new Option(month+"-"+year, v.periodo, false, false);
				    	    // Append it to the select
				    	    $('#selectorPeriodo').append(newOption);
				    	}
				  	});
			  }
			  else{
				  alerta("seleccione una empresa con datos");
			  }
		  },
		  error:function (ex){
			  swal({
		            title: '<i>ERROR</i>',
		            type: 'info',
		            html: JSON.stringify(ex),
		            showCloseButton: true,
		            showCancelButton: true,
		            focusConfirm: false,
		            confirmButtonText:
		              '<i class="fa fa-thumbs-up"></i>OK!',
		            confirmButtonAriaLabel: 'Thumbs up, great!',
		            cancelButtonText:
		            '<i class="fa fa-thumbs-down"></i>',
		            cancelButtonAriaLabel: 'Thumbs down',
		          });
		  } 
		});
}
function Centralizar(){
	
	if($('#fecha_proceso').val() == ""){
		alerta("Debe seleccionar una fecha de proceso");
		return false;
	}
	
	var Empresa=$("#selectorSociedad").val();
	var periodo=$("#selectorPeriodo").val();
	var fecha_proceso = $("#fecha_proceso").val();
	  
	  if(Empresa!="" && periodo!="" && periodo!=null && periodo!=0){
		 
		  $("#loading").show();
		  
		  $.ajax({
			  type: "GET",
		      async: false,
			  dataType: "json",	  
			  url: "/simpleWeb/json/work/CentralizacionDetalleTmp/Centralizar/?usuario="+SESION.user+"&id_sociedad="+sociedad+"&periodo="+$('#selectorPeriodo').datepicker({ dateFormat: 'mmyy' }).val()+"&fecha_proceso="+fecha_proceso,	  
			  processData: false,
			  contentType: false,
			  success:function (data1){
				  debugger;
				console.log(data1);
				$.each(data1.PARAMETROS.CUENTAS, function(k,v){
					if(!v.ORDENCO){
						v.ORDENCO = "";
					}
				})
//				return;
				debugger;
				var a= IPSERVERSAP + "JSON_BAPI_ACC_DOCUMENT_POST.aspx?PARAMETRO="+JSON.stringify(data1)+"&USPAS="+SESION.user+"X*X"+SESION.pass
				console.log(a);
				 $.ajax({
						url: IPSERVERSAP + "JSON_BAPI_ACC_DOCUMENT_POST.aspx?PARAMETRO="+JSON.stringify(data1)+"&USPAS="+SESION.user+"X*X"+SESION.pass,
						type:	"GET",
						dataType: 'json',
						async: false,
						success: function(data){
							
							if(data == "Object reference not set to an instance of an object."){
								alerta("No tiene Privilegios para Centralizar a SAP");
								return false;
							}
							
							debugger;
							if(data.OBJ_KEY=="$"){
								
								if ( $.fn.dataTable.isDataTable("#tbl_E") ) {
								    table2 = $("#tbl_E").DataTable();
								    table2.clear();
								}
								else {
								    table2 = $("#tbl_E").DataTable( 
								    	{
								    		paging:false,
								    		info: false,
								    		"ordering": false,
								    		"scrollX": true,
								    		"scrollY": "500px",
								    		"autoWidth": true
								    	}
								    )	    
								}
								 $.each(data.RETURN, function(k, v) {
										 if(v.TYPE=="E"){
											 table2.row.add([ v.ID, v.NUMBER, v.MESSAGE, v.MESSAGE_V1, v.MESSAGE_V2, v.MESSAGE_V3, v.MESSAGE_V4, v.PARAMETER, v.ROW, v.FIELD, v.SYSTEM]);
										 }
									 });
								 table2.draw();
								 $("#responseModal").modal("toggle");
							}
							//La respuesta fue exitosa
							else{
								
								alerta(data.RETURN[0].MESSAGE);
								
								let centralizacion = new Object();
								centralizacion.periodo = periodo ;
								centralizacion.id_sociedad = sociedad;
								centralizacion.fecha_envio = "";
								centralizacion.sap = data.RETURN[0].MESSAGE_V2;
								centralizacion.entrada_sap = JSON.stringify(data1);
								centralizacion.salida_sap = JSON.stringify(data);
								centralizacion.fecha_proceso = $('#fecha_proceso').val();
								
								
								//Insertar en Tabla de Centralizacion 
								$.ajax({
									url : "/simpleWeb/json/work/Centralizacion/insertOrUpdateCentralizacion/",
									type : "PUT",
									async : false,
									data : JSON.stringify(centralizacion),
									beforeSend : function(xhr){
										xhr.setRequestHeader("Accept","application/json");
										xhr.setRequestHeader("Content-Type","application/json");
									},
									success: function(data_centralizacion){
										
										 $.ajax({
											  type: "GET",
										      async: false,
											  dataType: "json",	  
											  url: "/simpleWeb/json/work/Centralizacion/getCentralizacion/"+sociedad+"/"+periodo,	  
											  processData: false,
											  contentType: false,
											  success:function (data3){ 
												  
												  let centralizacionDetalleList = new Array();
												  
												  $.each(data3, function(key, value){
													 
													  let centralizacionDetalle = new Object();
														
													  centralizacionDetalle.id_centralizacion = data_centralizacion.id_centralizacion;
													  centralizacionDetalle.cod_sap = data_centralizacion.sap;
													  centralizacionDetalle.periodo = periodo;
													  centralizacionDetalle.id_sociedad = sociedad;
													  centralizacionDetalle.concepto = value.concepto;
													  centralizacionDetalle.descripcion = value.descripcion;
													  centralizacionDetalle.proveedor = value.proveedor;
													  centralizacionDetalle.cuenta = value.cuenta;
													  centralizacionDetalle.valor = value.valor;
													  centralizacionDetalle.codTrabajador = value.codTrabajador;
													  centralizacionDetalle.idCECO = value.idCECO;
													  centralizacionDetalle.ordenco = value.ordenco;
													  centralizacionDetalle.fecha_proceso = $('#fecha_proceso').val();
													  
													  centralizacionDetalleList.push(centralizacionDetalle);
													    
												  });
												  
												  //Insertar en Tabla de CentralizacionDetalle
													$.ajax({
														url : "/simpleWeb/json/work/CentralizacionDetalle/insertOrUpdateCentralizacionDetalle/",
														type : "PUT",
														async : false,
														data : JSON.stringify(centralizacionDetalleList),
														beforeSend : function(xhr){
															xhr.setRequestHeader("Accept","application/json");
															xhr.setRequestHeader("Content-Type","application/json");
														},
														success: function(data4){
															console.log(data4);
														},
														error: function(ex){
															console.log(ex);
														}
													});
										
											  },
											  error: function (ex){
												  console.log(ex);
											  }
										 });
									},
									error: function(ex){
										alerta(JSON.stringify(ex.responseText));
									}

								});

							}
						},
						error: function (ex){
							 swal({
						            title: '<i>ERROR</i>',
						            type: 'info',
						            html: JSON.stringify(ex),
						            showCloseButton: true,
						            showCancelButton: true,
						            focusConfirm: false,
						            confirmButtonText:
						              '<i class="fa fa-thumbs-up"></i>OK!',
						            confirmButtonAriaLabel: 'Thumbs up, great!',
						            cancelButtonText:
						            '<i class="fa fa-thumbs-down"></i>',
						            cancelButtonAriaLabel: 'Thumbs down',
						          });
						},
						complete:function(ex){
							$("#loading").hide();
						}
				 			
					})
				 
				 
				 
				 
				 
			  },
			  error:function (ex){
				  swal({
			            title: '<i>ERROR</i>',
			            type: 'info',
			            html: JSON.stringify(ex),
			            showCloseButton: true,
			            showCancelButton: true,
			            focusConfirm: false,
			            confirmButtonText:
			              '<i class="fa fa-thumbs-up"></i>OK!',
			            confirmButtonAriaLabel: 'Thumbs up, great!',
			            cancelButtonText:
			            '<i class="fa fa-thumbs-down"></i>',
			            cancelButtonAriaLabel: 'Thumbs down',
			          });
				  
			  },
			  complete:function(e){
				  $("#loading").hide();
			  }
				  
			});
		  
	  }
	  else{
		  $("#crearLibroModal").modal("toggle"); 
		  alerta("Existen Campos Vacios");
	  }
}


function traerDatos($this){
	
	$("#btnUpload").show();
	
}



