$(document).ready(function(){
	onLoad();
	loadSelect();
	LoadFaena();
	LoadCargo();
	LoadPosicion();
	$("#loading").hide();
	$('#cantidadP').keyup(function(e) {            
	    var code = e.keyCode || e.which;
	    if(code == 109 || code == 189) { //Enter keycode
	       //Do something
	        var valor = $(this).val();
	        $(this).val(valor.replace(/[-]/g, ''))
	    }
	  });

	$('#cantidadP').change(function(e) {
	   var valor = $(this).val();
	   $(this).val(valor.replace(/[-]/g, ''))
	});
});
var aux = [];
var idTRab;
var nameTrab;
var unidad;
var dataHuerto;
var operaciones = [{
	id_operacion: 1,
	operacion: "Poda"
},{
	id_operacion: 2,
	operacion: "Cosecha"
},{
	id_operacion: 3,
	operacion: "Plantacion"
}];
var cuarteles = [{
	id_cuartel: 1,
	operacion: "Cuartel 1"
},{
	id_cuartel: 2,
	operacion: "Cuartel 2"
},{
	id_cuartel: 3,
	operacion: "Cuartel 3"
}]
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
function onLoad(){
	$.each(cuarteles, function(k, v){
		aux.push(v.operacion);
	})
	//console.log(aux)
	$("#cuartel").autocomplete({
		source: aux,
		select: function(a, b){
			var bodyLaboresTrab = "";
			$.each(cuarteles, function(k,v){
//				if(v.nombre == b.item.value){
//					idTRab = v.id;
//					nameTrab = v.nombre;
//					$("#tblHide").show();
//					$("#tdCod").html(v.codigo);
//					$("#tdRut").html(v.rut);
//					$("#tdCNombre").html(v.nombre);
//				}
			})
		}
	}).dblclick(function(){
		$(this).autocomplete("search", " ");
	});
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
	$('#operacion').html("");
	$('#operacion').append("<option value=''>Operacion</option>");
	$.each( operaciones, function( key, val ) {
		cadena = "";
		cadena = "<option value="+val.id_operacion+">"+val.operacion+"</option>";
		$('#operacion').append(cadena);
	});
}
//function addAct(){
//	var validate = true;
//  	var labores = document.getElementsByName("labores");
//  	for(var i = 0; i < labores.length;i++){
//  		if(!$(labores[i]).val()){
//  			$(labores[i]).focus();
//  			validate = false;
//  			return;
//  		}
//  	}
//  	if(validate){
//  		var row = {
//  			id: 1,
//  			obra_faena:  $("#operacion2").val(),
//  			c_trabajadores: $("#cantTrabajo").val(),
//  			f_inicio: $("#fechaInicio").val(),
//  			observacion: $("#obsPeticion").val()
//  			//cant_trabajo: $("#cantTrabajo").val(),
//  			
//  		}
//  		$.ajax({
//  			url : "/simpleWeb/json/work/insertReclutamiento/",
//  			type : "PUT",
//  			data : JSON.stringify(row),
//  			beforeSend : function(xhr) {
//  				xhr.setRequestHeader("Accept","application/json");
//  				xhr.setRequestHeader("Content-Type","application/json");
//  			},
//  			success : function(data, textStatus, jqXHR) {
//  				for(var i = 0; i < labores.length; i++){
//  					$(labores[i]).val("");
//  				}
//  				//alert("Labores asignadas a "+nameTrab+"")
//  				alert("Enviado con exito");
//  				$("#header_notification_bar").load();
//  				location.reload();
//  			},
//  			error : function(ex) {
//  				//console.log(ex);
//  			}
//  		
//  		})
//  	}
//}

function LoadFaena(){
	
	$.getJSON("/simpleWeb/json/work/ListaFaena/", function(data){
		//console.log(data);
		datos = data;
		$.each(data, function(k, v){
			var SelectFaena = "";	
			SelectFaena += 	"<option value="+v.faena+">"+v.faena+"</option>";
			$("#operacion2").append(SelectFaena);
		})
}).fail(function(jqXHR, textStatus, errorThrown) {

    alerta(errorThrown);
	$("#loading").hide();
})

}

function LoadCargo(){
	
	$.getJSON("/simpleWeb/json/work/cargos/getCargos/", function(data){
		//console.log(data);
		datos = data;
	
		$.each(data, function(k, v){
			var SelectCargo = "";
			SelectCargo += 	"<option value="+v.cargos+">"+v.cargos+"</option>";
			
			$("#cargo").append(SelectCargo);
		})
}).fail(function(jqXHR, textStatus, errorThrown) {

    alerta(errorThrown);
	$("#loading").hide();
})

}

function LoadPosicion(){
	
	$.getJSON("/simpleWeb/json/work/ListaPosicion/", function(data){
		//console.log(data);
		datos = data;
		$.each(data, function(k, v){
			jsonTRab = v.trabajadores;
			var Selectposicion = "";	
			Selectposicion += 	"<option value="+v.posicion+">"+v.posicion+"</option>";
			
			$("#posicion").append(Selectposicion);
		})
}).fail(function(jqXHR, textStatus, errorThrown) {

    alerta(errorThrown);
	$("#loading").hide();
})

}
var peticion = [];
var numero = 0;

function addForm() {
    var cargo = $("#cargo").val();
    var posicion = $("#posicion").val();
    var obra = $("#operacion2").val();
    var cantidad = $("#cantidadP").val();
    var fecha = $("#fechaE").val();
    
  
    
    
    if ($('#cargo').val() === '') {
        alerta("Debe Seleccionar un Cargo");
        $("#cargo").focus();
        return;
    } else if ($('#posicion').val() === '') {
        alerta("Debe Seleccionar una Posición");
        $("#posicion").focus();
        return;
    } else if ($('#cantidadP').val() === '') {
        alerta("Debe Ingresar una Cantidad");
        $("#cantidadP").focus();
        return;
    
    } else if ($('#cantidadP').val() == 0) {
		alerta("Debe Ingresar una Cantidad de Personas mayor a 0");
		$("#cantidadP").focus();
		return;
	}
    else {
    	  
    	  
    	  if ($('#operacion2').prop("disabled") == false) {
    	        
    		   if ($('#operacion2').val() === '') {
    		        alerta("Debe Seleccionar una Obra/Faena");
    		        $("#operacion2").focus();
    		        return;
    		    }
    	    }
    	  else{}
    	  
    	  if ($('#fechaE').prop("disabled") == false) {
  	        
   		   if ($('#fechaE').val() === '') {
   		        alerta("Debe Ingresar una Fecha");
   		        $("#fechaE").focus();
   		        return;
   		    }
   	    }
   	  else{}
    	  
    	  
    	  
    	  
        $("#tblPeticion").append("<tr id=td" + numero + "><td class='cargo'>" + cargo + "</td><td class='posicion'>" + posicion + "</td><td class='obra'>" + obra + "</td><td class='cantidad'>" + cantidad + "</td><td class='fecha'>" + fecha + "</td><td  id=td" + numero + " onclick='javascript: eliminarFila(this.id);' ><button title='Eliminar Solicitud'< class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button></td></tr>");
        numero = numero + 1;
    }
    $( "#operacion2" ).prop( "disabled", true );
    $( "#fechaE" ).prop( "disabled", true );
    
    $("#cargo").val("");
    $("#posicion").val("");
   // $("#operacion2").val("");
    $("#cantidadP").val("");
    //$("#fechaE").val("");
}//end Function

function eliminarFila(id) {
    $("#" + id + " td").each(function() {
        $("#" + id + " tr").remove();
        $("#" + id + "").remove();
    });
	var nFilas = $("#tblPeticion tr").length;
	
	if( nFilas == 0){
		$( "#operacion2" ).prop( "disabled", false );
		$( "#fechaE" ).prop( "disabled", false );
		 $("#fechaE").val("");
		 $("#operacion2").val("");
	}
    
}//end Function

function Enviar(){
	
	peticion2 = [];
	var nFilas = $("#tblPeticion tr").length;
	
	if( nFilas == 0){
		alerta("Debe Agregar una Solicitud a la Lista Antes de Enviar");
		return;
	}
	else {
		Array_cargo = [];	
		Array_posicion = [];
		Array_obra = [];
		Array_cantidad = [];
		Array_fecha = [];
		
		$("td.cargo").each(function()
				{
					Array_cargo.push($(this).text());
				});
				$("td.posicion").each(function()
				{
					Array_posicion.push($(this).text());
				});	
				$("td.obra").each(function()
				{
					Array_obra.push($(this).text());
				});	
				$("td.cantidad").each(function()
				{
					Array_cantidad.push($(this).text());
						});	
				$("td.fecha").each(function()
				{
					Array_fecha.push($(this).text());
				});
				
				var usuario = "jose";
				var empresa = "goblicity";
				for(var i = 0; i < nFilas;i++){
					var json2 = {
							cargo: Array_cargo[i],
							posicion: Array_posicion[i],
							obra: Array_obra[i],
							cantidad: Array_cantidad[i],
							fecha_estimada: Array_fecha[i],
							usuario: usuario,
							empresa: empresa
						}
					peticion2.push(json2);
				}
				$("#loading").show();
				$.ajax({
					url : "/simpleWeb/json/work/insertReclutamiento/",
					type : "PUT",
					data : JSON.stringify(peticion2),
					beforeSend : function(xhr) {
						xhr.setRequestHeader("Accept","application/json");
						xhr.setRequestHeader("Content-Type","application/json");
					},
					success : function(data, textStatus, jqXHR) {
						
						alerta("Enviado")
						$("#tblPeticion").empty();
						$( "#operacion2" ).prop( "disabled", false );
						$( "#fechaE" ).prop( "disabled", false );
						$("#fechaE").val("");
						 $("#operacion2").val("");
						 $("#loading").hide();
					},
					error : function(ex) {
						console.log(ex);
					}

				}).fail(function(jqXHR, textStatus, errorThrown) {

				    alerta(errorThrown);
					$("#loading").hide();
				})
				
				
				$("#tblPeticion").empty();
		
	}// end else 
} //end Function