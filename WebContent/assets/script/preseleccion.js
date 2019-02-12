$(document).ready(function(){
//	$('#tbl_Info').DataTable({
//		"sPaginationType": "full_numbers" ,
//		
//});
    //TableDatatablesAjax.init();
	$.fn.dataTable.ext.errMode = 'none';
	tablePreselect();
	onLoad();
	loadSelect();
	detalleNotificacion();
	detalleNotificacionVer();
	ListaSociedad();
	LoadCargo();
	
	$("#fechaMasiva").change(function(){
	   var fechaMasiva = $("#fechaMasiva").val();
	   
	   var nFilas = $("#tablePreselect tr").length;
	   for(var i = 0; i < nFilas;i++){
		   $("#fecha"+i).val(fechaMasiva);
		   $("#fecha"+i).prop( "disabled", true );
	   }
	   
    });
	
	
	$('#fechaInicio').datetimepicker({
		autoclose: true
        //language:  'fr',
//        weekStart: 1,
//        todayBtn:  1,
//		autoclose: 1,
//		todayHighlight: 1,
//		startView: 2,
//		forceParse: 0,
//        showMeridian: 1
    });
	
	
	
 
	$('#fechaInicio2').datetimepicker({
		autoclose: true
        //language:  'fr',
//        weekStart: 1,
//        todayBtn:  1,
//		autoclose: 1,
//		todayHighlight: 1,
//		startView: 2,
//		forceParse: 0,
//        showMeridian: 1
    });
});
var aux = [];
var preRecAux = [];
var idTRab;
var nameTrab;
var unidad;
var dataHuerto;
var datos;
var prese = ["Si", "No"];
function seCodigo(e){
	tecla = (document.all) ? e.keyCode : e.which;
	if (tecla==13){
		if(!$("#cod").val()){
			return false;
		}else{
			var cod = $("#cod").val();
			$("#tdCod").html(cod);
			$("#tblHide").show();
		}
	}
}

function limpiar(){
	
	 if ($('#fechaMasiva').val() === '') {
		 alerta("Debe Seleccinar una Fecha Masiva");
	 }else
		 {
		 var nFilas = $("#tablePreselect tr").length;
		   for(var i = 0; i < nFilas;i++){
			   
			   $("#fecha"+i).prop( "disabled", false );
			   $("#fecha"+i).val("");
			   $("#fechaMasiva").val("");
		   }
		 }
}

function Preseleccionar(k){
	datoFila = [];
	var get = getINFO();
	var id_reclutamiento = get.id_pet;
	
	  if ($("#loadCargo").val() === ''){
		 alerta("Debe Seleccionar Cargo");
	        $("#loadCargo").focus();
	        return;
	 }
	  
	  else if ($("#fecha"+k).val() === '') {
	        alerta("Debe Seleccionar una Fecha");
	        $("#fecha"+k).focus();
	        return;
	    }
	 
	 $("#botonSel" + k + " td").each(function() {
		 datoFila.push($(this).text());
		 
	    });
	   
	    datoFila.push($("#fecha"+k).val());
	    datoFila.push($("#loadCargo").val());
	    datoFila.push(id_reclutamiento);
	    
		
	    
	    
	    var row = {
	    		codigoTrabajador: datoFila[0],
				apellidoNombre: datoFila[2],
				cargo: datoFila[3],
				fechaUlContrato: datoFila[4],
				direccion: datoFila[5],
				telefono: datoFila[6],
				email: datoFila[7],
				fechaEntreista: datoFila[10],
                id_peticion: datoFila[11],
	            id_reclutamiento: datoFila[12]
			}
	   console.log(row);
		$.ajax({
		    url: "/simpleWeb/json/work/addPreseleccionSimple",
		    type: "PUT",
		    data: JSON.stringify(row),
		    beforeSend: function(xhr) {
		        xhr.setRequestHeader("Accept", "application/json");
		        xhr.setRequestHeader("Content-Type", "application/json");
		    },
		    success: function(data, textStatus, jqXHR) {
		    	 $( "#modalBody" ).empty();
		 	
		    	detalleNotificacionVer();
		        closeModal();
		        onLoad();

		        alerta("Trabajador Preseleccionado con exito ");

		    },
		    error: function(ex) {
		        console.log(ex);
		    }

		}).fail(function(jqXHR, textStatus, errorThrown) {

		    alerta(errorThrown);
			$("#loading").hide();
		})


		}
//var url = "simpleWeb";
var url = "simpleWeb";
var jsonTRab2;
function onLoad(){
	$("#tablePreselect").empty();
	$.getJSON("/simpleWeb/json/work/loadPersonal/", function(data){
		
		datos = data;
		data.length
		var numero = 1;
		$.each(data, function(k, v){
			jsonTRab = v.trabajadores;
			var bodyPreselect = "";
			
			bodyPreselect += "<tr id='botonSel"+k+"'>";
			bodyPreselect += 	"<td id='' style='display: none;'>"+v.codigo+"</td>";
			bodyPreselect += 	"<td id=''>"+numero+"</td>";
			bodyPreselect += 	"<td>"+v.nombre+"</td>";
			bodyPreselect += "<td>"+v.cargo+"</td>";
			bodyPreselect += 	"<td id='valorC'>"+v.f_termino+"</td>";
			bodyPreselect += 	"<td>"+v.direccion+"</td>";
			bodyPreselect += 	"<td>"+v.telefono+"</td>";
			bodyPreselect += 	"<td>"+v.email+"</td>";
			bodyPreselect +="<td><input type='date' id='fecha"+k+"' class='form-control input-circle' onchange='javascript: valDias(this)'></td>";
			bodyPreselect += 	"<td>";
			bodyPreselect +=		"<a href='detalleTrabajador?id="+v.id+"' target='blank'><button title='Ver ficha' id='botonSel'  class='btn btn-circle yellow btn-outline btn-sm'><i class='fa fa-align-justify fa-lg'></i></button></a>";
			bodyPreselect +=		"<button onclick='Preseleccionar("+k+");' title='Preseleccionar' id='botonSel"+k+"'  class='btn btn-circle green btn-outline btn-sm'><i class='fa fa-check fa-lg'></i></button>";
			bodyPreselect +=	"</td>";
			bodyPreselect += "</tr>" ;
			$("#tablePreselect").append(bodyPreselect);
			numero = numero + 1;
		})
		 fechas();
		$('#tbl_Info').DataTable({
			"destoy": true ,
			
	});
		$('#tbl_Info').DataTable({
			"sPaginationType": "full_numbers" ,
			
	});
		
}).fail(function(jqXHR, textStatus, errorThrown) {

    alerta(errorThrown);
	$("#loading").hide();
})
	
	
	
	
	
	
	/*$.getJSON("/"+url+"/json/map/loadPersonal/", function(data){
		console.log(data);
		datos = data;
		$.each(data, function(k, v){
			aux.push(v.nombre);
		})
		$("#bus_trab").autocomplete({
			source: aux,
			select: function(a, b){
				var bodyLaboresTrab = "";
				$.each(data, function(k,v){
					if(v.nombre == b.item.value){
						idTRab = v.id;
						nameTrab = v.nombre;
						$("#tblHide").show();
						$("#tdCod").html(v.codigo);
						$("#tdRut").html(v.rut);
						$("#tdCNombre").html(v.nombre);
					}
				})
			}
		}).dblclick(function(){
			$(this).autocomplete("search", " ");
		});
	})*/
}
/*function addTrabajador(){
	if(!$("#bus_trab").val()){
		alerta("No ha ingresado ningun nombre");
		$("#bus_trab").focus();
		return;
	}
	var validate = true;
	var validate2 = true; 
	var value;
	var trab = $("#bus_trab").val();
	$.each(preRecAux, function(ka, va){
		if(va.nombre == trab){
			alerta("Esta trabajador ya se encuentra en esta lista");
			$("#bus_trab").val("");
			validate = false;
		}
	})
	if(validate){
		$.each(datos, function(k, v){
			if(v.nombre == trab){
				value = v;
				validate2 = true;
				return false;
			}else{
				console.log("2")
				validate2 = false;
			}
		})
	}
	if(validate2 && validate){
		console.log(value)
		preRecAux.push(value);
		tablePreselect();
		$("#bus_trab").val("");
	}else if(!validate2 || !validate){
		confirmar(""+trab+" no se encuentra en los registros ¿Desea agregarlo?");
	}
}*/
function tablePreselect(){
	//$("#tablePreselect").html("");
	/*var bodyPreselect = "";
	$.each(preRecAux, function(k, v){
		bodyPreselect += "<tr>";
		bodyPreselect += 	"<td>"+v.codigo+"</td>";
		bodyPreselect += 	"<td>"+v.rut+"</td>";
		bodyPreselect += 	"<td>"+v.nombre+"</td>";
		bodyPreselect += 	"<td>"+v.f_ingreso+"</td>";
		bodyPreselect += 	"<td>"+v.direccion+"</td>";
		bodyPreselect += 	"<td>"+v.telefono+"</td>";
		bodyPreselect += 	"<td>"+v.email+"</td>";
		bodyPreselect += 	"<td contentEditable='true' id='renta"+v.id+"'></td>";
		bodyPreselect += 	"<td contentEditable='true' id='preselect"+v.id+"'></td>";
		bodyPreselect += 	"<td>";
		bodyPreselect +=		"<button title='Modificar ficha' onclick='editarFicha("+v.id+");' class='btn btn-circle yellow btn-outline btn-sm'><i class='fa fa-pencil-square-o fa-lg'></i></button>";
		bodyPreselect +=		"<button title='Descartar' onclick='descartar("+v.id+");' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button>";
		bodyPreselect +=	"</td>";
		bodyPreselect += "</tr>" ;
		$("#tablePreselect").append(bodyPreselect);
		preselect(v.id);
		
		*/
		
		

//	
//	add();
	$("#loading").hide();

	$("#tbl_Info_next").html("<a id='next' href='#'>Siguiente</a>");
	$("#next").html("Siguiente");
	
	

}

function add(){
	var object = document.getElementById('tbl_Info_filter');
	var object1 = document.getElementById('tbl_Info_paginate');
	object.style.float = "right";
	object1.style.float = "right";
}


function LoadCargo(){
	var get = getINFO();
	var entero = get.id_pet;
$.getJSON("/simpleWeb/json/work/LoadCargoPreseleccion/"+entero, function(data){
	$.each(data, function(k,v){
		
		var SelectCargo = "";	
		SelectCargo += 	"<option value="+v.id_peticion+">N°"+v.id_peticion+" "+v.cargo+": "+v.posicion+"</option>";
		
		$("#loadCargo").append(SelectCargo);
			
	});
}).fail(function(jqXHR, textStatus, errorThrown) {

    alerta(errorThrown);
	$("#loading").hide();
})
}



function detalleNotificacion(){
	var get = getINFO();
	var entero = get.id_pet;
$.getJSON("/simpleWeb/json/work/LoadNumeroSolicitud/"+entero, function(data){
	console.log(data);
	$.each(data, function(k,v){
		
		$("#idPeticion").append("SOLICITUD Nº: "+v.id_reclutamiento+"");  
		$("#cantid").append("CANT. SOLICITADOS: "+v.cantidad+"");
		$("#fechaSoli").append("FECHA DE SOLICITUD: "+v.fecha_now+"");
		$("#obraFaena").append("OBRA/FAENA: "+v.obra+"");	
	});
}).fail(function(jqXHR, textStatus, errorThrown) {

    alerta(errorThrown);
	$("#loading").hide();
})
}

function detalleNotificacionVer(){
	var get = getINFO();
	var entero = get.id_pet;
  
$.getJSON("/simpleWeb/json/work/PreseleccionDetalleVer/"+entero, function(data){
	$.each(data, function(k, v){
		
		 var reprogramar = "";
		 reprogramar +="<tr>"+
		 "<td>"+v.cargo+"</td>"+
		 "<td>"+v.posicion+"</td>"+
		 "<td>"+v.cantidad+"</td>"+
		 "<td>"+v.preseleccionado+"</td>"+
		 "<td>"+v.seleccionado+"</td>"+
		 "<td>"+v.saldo+"</td>"+
		 "<td>"+v.fecha_inicio+"</td>"+
		 "</tr>";

		
				 	   
		
		$("#modalBody").append(reprogramar);
	})
}).fail(function(jqXHR, textStatus, errorThrown) {

    alerta(errorThrown);
	$("#loading").hide();
})
}



function preselect(id){
	$("#preselect"+id).autocomplete({
		source: prese,
		select: function(a, b){
			var bodyLaboresTrab = "";
//			$.each(data, function(k,v){
//				if(v.nombre == b.item.value){
//					idTRab = v.id;
//					nameTrab = v.nombre;
//					$("#tblHide").show();
//					$("#tdCod").html(v.codigo);
//					$("#tdRut").html(v.rut);
//					$("#tdCNombre").html(v.nombre);
//				}
//			})
		}
	}).dblclick(function(){
		$("#preselect"+id).autocomplete("search", " ");
	});
}




function verFicha(){
//	console.log(id)
//	checkTr = [];	
//	 $("#"+id+" td").each(function(){
//		 checkTr.push($(this).text());
//		 });
	
	 var reprogramar = "";

    reprogramar +=    '<div class="col-xs-12 col-sm-12 col-md-12" style="margin-bottom: 10px;">';
    reprogramar +=          '<div class="col-xs-6 col-sm-6 col-md-6">';
    reprogramar +=                '<div class="col-xs-12 col-sm-12 col-md-12">';
    reprogramar +=                      '<h4>Nombre</h4>';
    reprogramar +=                '</div>';
    reprogramar +=                '<div class="col-xs-12 col-sm-12 col-md-12">';
    
    reprogramar +=                      '<input type="text" class="form-control"  id="hola" value="'+checkTr[1]+'" name="nombre">';
    reprogramar +=                '</div>';
    reprogramar +=          '</div>';
    reprogramar +=          '<div class="col-xs-6 col-sm-6 col-md-6">';
    reprogramar +=                '<div class="col-xs-12 col-sm-12 col-md-12">';
    reprogramar +=                      '<h4>Dirección</h4>';
    reprogramar +=                '</div>';
    reprogramar +=                '<div class="col-xs-12 col-sm-12 col-md-12">';
    reprogramar +=                      '<input type="text" class="form-control"  id="" value="'+checkTr[3]+'" name="direccion">';
    reprogramar +=                '</div>';
    reprogramar +=          '</div>';
    
    reprogramar +=          '<div class="col-xs-6 col-sm-6 col-md-6">';
    reprogramar +=                '<div class="col-xs-12 col-sm-12 col-md-12">';
    reprogramar +=                      '<h4>Teléfono</h4>';
    reprogramar +=                '</div>';
    reprogramar +=                '<div class="col-xs-12 col-sm-12 col-md-12">';
    
    reprogramar +=                      '<input type="text" class="form-control"  id="" value="'+checkTr[4]+'" name="telefono">';
    reprogramar +=                '</div>';
    reprogramar +=          '</div>';
    reprogramar +=          '<div class="col-xs-6 col-sm-6 col-md-6">';
    reprogramar +=                '<div class="col-xs-12 col-sm-12 col-md-12">';
    reprogramar +=                      '<h4>Email</h4>';
    reprogramar +=                '</div>';
    reprogramar +=                '<div class="col-xs-12 col-sm-12 col-md-12">';
    reprogramar +=                      '<input type="text" class="form-control"  id="" value="" name="email">';
    reprogramar +=                '</div>';
    reprogramar +=          '</div>';
    reprogramar +=    '</div>';
    reprogramar +=    '<div ></div>';
    reprogramar +='<div class="col-sm-12 col-md-12">';
   // reprogramar +=          "<div class='btn btn-circle blue btn-outline' id='"+checkTr[0]+"' onclick='actualizarTrabajador(this.id);'><i class='fa fa-clock-o'></i> Actualizar</div>";
    reprogramar +=          "<div class='btn btn-circle red btn-outline' onclick='closeModal();'> Cancelar</div>";
    reprogramar +='</div>';

    popUp("Ficha Trabajador", reprogramar, true, "400px", true);
	
}


function actualizarTrabajador(id){

	
	
	var row = {
	 codigo: id,
	 nombre: $('input:text[name=nombre]').val(),
	 direccion: $('input:text[name=direccion]').val(),
	 telefono: $('input:text[name=telefono]').val(),
	 email: $('input:text[name=email]').val()
  			
  		}
	
	
	$.ajax({
			url : "/simpleWeb/json/work/updatePreseleccion",
			type : "PUT",
			data : JSON.stringify(row),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept","application/json");
				xhr.setRequestHeader("Content-Type","application/json");
			},
			success : function(data, textStatus, jqXHR) {
			
			
				
				closeModal();
				onLoad();
				
				 
           alerta("Trabajador Actualizado con exito ");
				 
					
                
			},
			error : function(ex) {
				console.log(ex);
			}
		
		}).fail(function(jqXHR, textStatus, errorThrown) {

		    alerta(errorThrown);
			$("#loading").hide();
		})
	
	
	
	
}

function actSelect(){
	var sAct = $("#sAct").val();
	if(sAct == "Zanja"){
		$("#medidaDiv").show();
		$("#medida").html("Metros");
		unidad = "Metros";
	}else if(sAct == "Cosecha"){
		$("#medidaDiv").show();
		$("#medida").html("KG");
		unidad = "Kilos";
	}else if(sAct == "Poda"){
		$("#medidaDiv").show();
		$("#medida").html("Cantidad");
		unidad = "Cantidad";
	}else{
		$("#medidaDiv").hide();
		$("#medida").html("");
	}
}
function loadSelect(){
	dataHuerto = JSON.parse(localStorage.getItem("dataHuerto"));
	console.log(dataHuerto);
	$('#selCoordenadas').html("");
	$('#selCoordenadas').append("<option value=''>Seleccione Campo</option>");
	$.each( dataHuerto, function( key, val ) {
		cadena = "";
		cadena = "<option value="+val.idtest+">"+val.valor1+"</option>";
		$('#selCoordenadas').append(cadena);
	});
}

//function valArr(val){
//	var rut;
//	$.each(jsonTRab, function(k,v){
//		if(val == v.rut){
//			rut = v;
//		}
//	})
//	return rut;
//}
function ListaSociedad(){
	
	$.getJSON("/simpleWeb/json/work/ListaSociedad/", function(data){
		datos = data;
		$.each(data, function(k, v){
			var SelectSociedad = "";	
			SelectSociedad += 	"<option value="+v.sociedad+">"+v.denominacionSociedad+"</option>";
			
			$("#Sociedad").append(SelectSociedad);
		})
}).fail(function(jqXHR, textStatus, errorThrown) {

    alerta(errorThrown);
	$("#loading").hide();
})
}
//function addAct(){
//	
//	var get = getINFO();
//	
//	checkTr = [];
//	checkTr2 = [];
//	
//	$('input[type=checkbox]:checked').each(function() {
//		checkTr2.id = $(this).attr('id');
//		
//	});
//	$('input[type=checkbox]:checked').each(function() {
//	
//		checkTr.push($(this).val());
//		
//		
//	   
//		
//    });
//	if(checkTr.length == 0){
//		alerta("No ha seleccionado ningún trabajador");
//		return;
//	}else{
//		   console.log(checkTr);
//		   var row = {};
//		row.codigo_trabajador = checkTr;
//	                            
//		row.codigo_peticion = get.id_pet;
//		
//		console.log(row)
//		
//		 
//		
//		$.ajax({
//			    
//  			url : "/simpleWeb/json/work/addPreseleccion",
//  			type : "PUT",
//  			data : JSON.stringify(row),
//  			beforeSend : function(xhr) {
//  				xhr.setRequestHeader("Accept","application/json");
//  				xhr.setRequestHeader("Content-Type","application/json");
//  			},
//  			success : function(data, textStatus, jqXHR) {
//  				alerta("Enviado con exito");
//  				onLoad();
//  			},
//  			error : function(ex) {
//  				console.log(ex);
//  				alert("error");
//  			}
//  		
//  		})
//	}//end else
//	
//	
//
//}
