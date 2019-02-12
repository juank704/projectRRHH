$(document).ready(function(){
	loadCampo();
})
var countTbl = 0;
var codigoAux = 0;
var working = false;
var datos;
function loadCampo(){
	var campo = "<option value=''></option>";
	$.each(SESION.campo, function(k,v){
		campo += "<option value='"+v.campo+"'>"+v.descripcion+"</option>";
	})
	$("#selCampo").html(campo);
	var especie = "<option value=''></option>";
	$.each(SESION.especie, function(k,v){
		especie += "<option value='"+v.codigo+"'>"+v.especie+"</option>";
	})
	$("#especie").html(especie);
}
function cambioEspecie(input){
	var variedad = "<option value=''></option>";
	$.each(SESION.variedad, function(k,v){
		if(v.especie == input.value){
			variedad += "<option value='"+v.codigo+"'>"+v.variedad+"</option>";
		}
	})
	$("#variedad").html(variedad);
	loadInfo();
}
function loadInfo(){
	$.ajax({
		url: "/simpleWeb/json/AGRO/GET_PARAMETRO_ESTIMACION/"+$("#selCampo").val()+"/"+$("#especie").val()*1,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			datos = data;
			var kghas = $("#kghas");
			$('#body_Param').html("");
			var c = 0;
			var kg = "";
			$.each(data, function(k,v){
				if(v.id != "KGHAS"){
					console.log("e")
					var tr = "";
					tr += "<tr id='tr"+v.codigo+"'>";
					tr += 	"<td><input value='"+v.id+"' input type='text' onkeyup='justUpperLeters(this); spaceOff(this);' onblur=' valVariables(this)' class='form-control param"+v.codigo+"' id='id"+v.codigo+"'></td>";
					tr += 	"<td><select class='form-control input-sm param"+v.codigo+"' id='tipo"+v.codigo+"' onchange='cambioTipo(this, "+v.codigo+")'>"+rTipos()+"</select></td>";
					tr += 	"<td><input value='"+v.descripcion+"' type='text' class='form-control param"+v.codigo+"' id='descripcion"+v.codigo+"'></td>";
					tr += 	"<td><input value='"+v.formula+"' type='text' onkeyup='justUpperLeters(this); spaceOff(this);' class='form-control param"+v.codigo+"' id='formula"+v.codigo+"'></td>";
					tr += 	"<td><button title='Guardar' style='display: none;' onclick='addParam("+v.codigo+");' class='btn green-dark btn-outline btn-sm param-button-"+v.codigo+"'><i class='icon-cloud-upload' aria-hidden='true'></i></button>";
					tr += 	"<button title='Modificar' style='display: block;' onclick='modParam("+v.codigo+");' class='btn yellow btn-outline btn-sm param-button-"+v.codigo+"'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></button></td>";
					tr += 	"<td><button title='Eliminar' onclick='delParam("+v.codigo+", "+true+");' class='btn red btn-outline btn-sm param-cancel"+v.codigo+"'><i class='fa fa-trash-o' aria-hidden='true'></i></button>";
					tr += 	"<button title='Cancelar' style='display: none;' onclick='cancelar("+v.codigo+");' class='btn red btn-outline btn-sm param-cancel"+v.codigo+"'><i class='fa fa-times' aria-hidden='true'></i></button></td>";
					tr += "</tr>";
					$('#body_Param').append(tr);
				}
				c++;
				$("#tipo"+v.codigo).val(v.tipo);
				if(v.id == "KGHAS"){
					console.log("p")
					var codigo = 0;
					var valor = "";
					if(v.id == "KGHAS"){
						codigo = v.codigo;
						valor = v.formula;
					}
					kg += "<tr id='tr0'>";
					kg += 	"<td><input value='KGHAS' type='text' disabled class='form-control' id='id"+codigo+"'></td>";
					kg += 	"<td><select class='form-control input-sm' id='tipo"+codigo+"' disabled onchange='cambioTipo(this, "+codigo+")'><option value='4'>Formula</option></select></td>";
					kg += 	"<td><input value='KILOS/HECTAREAS' disabled type='text' class='form-control' id='descripcion"+codigo+"'></td>";
					kg += 	"<td><input type='text' class='form-control param"+codigo+"' value='"+valor+"' disabled onkeyup='justUpperLeters(this); spaceOff(this);' id='formula"+codigo+"'></td>";
					kg += 	"<td><button title='Guardar' style='display: none;' onclick='addParam("+codigo+");' class='btn green-dark btn-outline btn-sm param-button-"+codigo+"'><i class='icon-cloud-upload' aria-hidden='true'></i></button>";
					kg += 	"<button title='Modificar' style='display: block;' onclick='modParam("+codigo+");' class='btn yellow btn-outline btn-sm param-button-"+codigo+"'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></button></td>";
					kg += 	"<td>";
					kg += 	"<button title='Cancelar' style='display: none;' onclick='cancelar("+codigo+");' class='btn red btn-outline btn-sm param-cancel"+codigo+"'><i class='fa fa-times' aria-hidden='true'></i></button></td>";
					kg += "</tr>";
				}
				if(c == data.length){
					$('#body_Param').append(kg);
				}
				selectCss();
				$(".param"+v.codigo).each(function(){
					$(this).prop("disabled", true);
				})
				countTbl = v.codigo+1;
			})
		},errror: function(er){
			alerta("Ha ocurrido un error interno del servidor, consulte con el administrador del sistema")
		}
	})
}
function valVariables(input){
	$.each(datos, function(k,v){
		if(v.id == input.value){
			alerta("El identificador "+input.value.toUpperCase()+" ya se encuentra en este Parametro");
			$(input).val("");
			return false;
		}else if(input.value.toUpperCase() == "KEP" || input.value == "KE" || input.value == "KXP" || input.value == "KX" || input.value == "CT" || input.value == "CTH" || input.value == "KGHAS"){
			alerta("El identificador "+input.value.toUpperCase()+" se encuentra reservado para uso del sistema");
			$(input).val("");
			return false;
		}
	})
}
function rTipos(){
	var tipos = [{
		codigo: 1,
		descripcion: "Entero"
	},{
		codigo: 2,
		descripcion: "Decimal"
	},{
		codigo: 3,
		descripcion: "Porcentaje"
	},{
		codigo: 4,
		descripcion: "Formula"
	}];
	var select = "<option value=''></option>";
	$.each(tipos, function(k,v){
		select += "<option value='"+v.codigo+"'>"+v.descripcion+"</option>";
	})
	return select;
}
function sumParam(){
	if(working){
		alerta("Ya esta modificando un registro");
		return;
	}else if(!$("#especie").val()){
		alerta("Debe seleccionar una Especie");
		return;
	}
	var kghas = $("#tr0").html();
	$("#tr0").remove();
	var aux = kghas;
	console.log(aux)
	if(aux == undefined){
		kghas = "";
		kghas += "<tr id='tr0'>";
		kghas += 	"<td><input value='KGHAS' type='text' disabled class='form-control' id='id0'></td>";
		kghas += 	"<td><select class='form-control input-sm' id='tipo0' disabled onchange='cambioTipo(this, 0)'><option value='4'>Formula</option></select></td>";
		kghas += 	"<td><input value='KILOS/HECTAREAS' disabled type='text' class='form-control' id='descripcion0'></td>";
		kghas += 	"<td><input type='text' class='form-control param0' disabled onkeyup='justUpperLeters(this); spaceOff(this);' id='formula0'></td>";
		kghas += 	"<td><button title='Guardar' style='display: none;' onclick='addParam(0);' class='btn green-dark btn-outline btn-sm param-button-0'><i class='icon-cloud-upload' aria-hidden='true'></i></button>";
		kghas += 	"<button title='Modificar' style='display: block;' onclick='modParam(0);' class='btn yellow btn-outline btn-sm param-button-0'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></button></td>";
		kghas += 	"<td>";
		kghas += 	"<button title='Cancelar' style='display: none;' onclick='cancelar(0);' class='btn red btn-outline btn-sm param-cancel0'><i class='fa fa-times' aria-hidden='true'></i></button></td>";
		kghas += "</tr>";
	}else{
		kghas = "<tr id='tr0'>";
		kghas += aux;
		kghas += "</tr>";
	}
	working = true;
	codigoAux = 0;
	var tr = "";
	tr += "<tr id='tr"+countTbl+"'>";
	tr += 	"<td><input input type='text' onkeyup='justUpperLeters(this); spaceOff(this);' onblur=' valVariables(this)' class='form-control param"+countTbl+"' id='id"+countTbl+"'></td>";
	tr += 	"<td><select class='form-control input-sm param"+countTbl+"' id='tipo"+countTbl+"' onchange='cambioTipo(this, "+countTbl+")'>"+rTipos()+"</select></td>";
	tr += 	"<td><input type='text' class='form-control param"+countTbl+"' id='descripcion"+countTbl+"'></td>";
	tr += 	"<td><input type='text' onkeyup='justUpperLeters(this); spaceOff(this);' class='form-control param"+countTbl+"' id='formula"+countTbl+"'></td>";
	tr += 	"<td><button title='Guardar' onclick='addParam("+countTbl+");' class='btn green-dark btn-outline btn-sm param-button-"+countTbl+"'><i class='icon-cloud-upload' aria-hidden='true'></i></button>";
	tr += 	"<button title='Guardar' style='display: none;' onclick='modParam("+countTbl+");' class='btn yellow btn-outline btn-sm param-button-"+countTbl+"'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></button></td>";
	tr += 	"<td><button title='Eliminar' onclick='delParam("+countTbl+", "+false+");' class='btn red btn-outline btn-sm'><i class='fa fa-times' aria-hidden='true'></i></button></td>";
	tr += "</tr>";
	if(aux != undefined){
		$('#body_Param').append(tr);
		selectCss();
		$('#body_Param').append(kghas);
	}else{
		$('#body_Param').append(tr);
		$('#body_Param').append(kghas);
		selectCss();
	}
	countTbl++;
}
function cambioTipo(input, id){
	console.log($("#tipo"+id).val()*1)
	
	if($("#tipo"+id).val()*1 != 4){
		$("#formula"+id).prop("disabled", true);
	}else{
		$("#formula"+id).prop("disabled", false);
	}
}
function modParam(id){
	if(working){
		alerta("Ya esta modificando un registro");
		return;
	}
	working = true;
	codigoAux = id;
	$(".param"+id).each(function(){
		$(this).prop("disabled", false);
	})
	cambioTipo($("#tipo"+id), id);
	$(".param-button-"+id).toggle();
	$(".param-cancel"+id).toggle();
}
function delParam(id, bool){
	if(bool){
		var c = confirmar.confirm("Desea eliminar este Parametro");
		$(c.aceptar).click(function(){
			loading.show();
			$.ajax({
				url:	"/simpleWeb/json/AGRO/DELETE_PARAMETRO_ESTIMACION/"+id,
				type:	"POST",
				success: function(){
					alerta("Se ha eliminado el parametro");
					loadInfo();
					loading.hide();
					working = false;
				},
				error: function(a, b){
					loading.hide();
					alerta("No se ha podido registrar la informacion, contactece con el administrador del sistema.");
				}
			});
		})
	}else{
		$("#tr"+id).remove();
		working = false;
	}
}
function cancelar(id){
	$(".param-cancel"+id).toggle();
	$(".param-button-"+id).toggle();
	$(".param"+id).each(function(){
		$(this).prop("disabled", true);
	})
	working = false;
}
function addParam(id){
	if(!$("#id"+id).val()){
		alerta("No se ha ingresado un identificador");
		return;
	}else if(!$("#tipo"+id).val()){
		alerta("No se ha Seleccionado un tipo de parametro");
		return;
	}else if(!$("#descripcion"+id).val()){
		alerta("No se ha ingresado una descripcion");
		return;
	}else if(!$("#formula"+id).val() && $("#formula"+id).val()*1 == 4){
		alerta("Debe ingresar un aformula para el tipo 'Formula'");
		return;
	}else{
		loading.show();
		var json = {
			codigo: codigoAux,
			campo: $("#selCampo").val(),
			especie: $("#especie").val(),
			id: $("#id"+id).val(),
			tipo: $("#tipo"+id).val(),
			descripcion: $("#descripcion"+id).val(),
			formula: $("#formula"+id).val()
		}
		$.ajax({
			url : "/simpleWeb/json/AGRO/ADD_PARAMETRO_ESTIMACION/",
			type : "PUT",
			data : JSON.stringify(json),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept","application/json");
				xhr.setRequestHeader("Content-Type","application/json");
			},
			success : function(data, textStatus, jqXHR) {
				$(".param"+id).each(function(){
					$(this).prop("disabled", true);
				})
				$(".param-button-"+id).toggle();
				codigoAux = 0;
				working = false;
				loadInfo();
				loading.hide();
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alerta("No se ha podido registrar la informacion, contactece con el administrador del sistema");
			}
		});
	}
}