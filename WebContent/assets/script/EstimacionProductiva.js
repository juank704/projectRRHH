$(document).ready(function(){
	loadSelects();
	console.log(CUARTEL)
})
var arrayList;
var a = [];
var HAS;
var PC;
var codigo_e;
var b = [{
	codigo: 0,
	campo: "",
	especie: "",
	id: "KEP",
	tipo: 1,
	descripcion: "%KILOS/EMBALAJE",
	formula: "" 
},{
	codigo: 0,
	campo: "",
	especie: "",
	id: "KE",
	tipo: 4,
	descripcion: "KILOS7/EMBALAJE",
	formula: "(KGHAS*KEP)/100" 
},{
	codigo: 0,
	campo: "",
	especie: "",
	id: "KXP",
	tipo: 1,
	descripcion: "%KILOS/EXPORTACION",
	formula: "" 
},{
	codigo: 0,
	campo: "",
	especie: "",
	id: "KX",
	tipo: 4,
	descripcion: "KILOS/EXPORTACION",
	formula: "(KE*KXP)/100" 
},{
	codigo: 0,
	campo: "",
	especie: "",
	id: "CT",
	tipo: 4,
	descripcion: "CAJAS/TOTALES",
	formula: "KX/PC" 
},{
	codigo: 0,
	campo: "",
	especie: "",
	id: "CTH",
	tipo: 4,
	descripcion: "CAJAS/TOTALES/CUARTEL",
	formula: "CT*HAS" 
},];

function loadSelects(){
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
function cambioCampo(input){
	var sector = "<option value=''></option>";
	$.each(SESION.sector, function(k,v){
		if(v.campo == input.value){
			sector += "<option value='"+v.sector+"'>"+v.descripcion+"</option>";
		}
	})
	$("#sector").html(sector);
}
function cambioSector(input){
	var especie = "<option value=''></option>";
	var arrAux = [];
	$.each(CUARTEL, function(k,v){
		if(v.sector == input.value && arrAux.indexOf(v.especie) == -1){
			arrAux.push(v.especie);
			especie += "<option value='"+v.especie+"'>"+v.nespecie+"</option>";
		}
	})
	$("#especie").html(especie);
}
function cambioEspecie(input){
	var variedad = "<option value=''></option>";
	var arrAux = [];
	$.each(CUARTEL, function(k,v){
		if(v.especie == input.value && arrAux.indexOf(v.variedad) == -1){
			arrAux.push(v.variedad);
			variedad += "<option value='"+v.variedad+"'>"+v.nvariedad+"</option>";
		}
	})
	$("#variedad").html(variedad);
}
function cambioVariedad(input){
	var cuartel = "<option value=''></option>";
	var arrAux = [];
	$.each(CUARTEL, function(k,v){
		if(v.variedad == input.value && arrAux.indexOf(v.codigo) == -1){
			arrAux.push(v.codigo);
			cuartel += "<option value='"+v.codigo+"'>"+v.nombre+"</option>";
		}
	})
	$("#cuartel").html(cuartel);
}
function cambioCuartel(input){
	$.each(CUARTEL, function(k,v){
		if(v.codigo == input.value){
			HAS = v.superficie*1;
			PH = (v.plantas/v.superficie).toFixed(0)*1;
			PC = 1;
			var tbl = "";
			tbl += 	"<tr>";
			tbl += 		"<td style='color: #C70039;font-weight: bold'>Has:</td>";
			tbl += 		"<td>Hectareas</td>";
			tbl += 		"<td style='color: #C70039;font-weight: bold'>"+v.superficie+"</td>";
			tbl += 	"</tr>";
			tbl += 	"<tr>";
			tbl += 		"<td style='color: #C70039;font-weight: bold'>PH:</td>";
			tbl += 		"<td>Plantas por Hectareas</td>";
			tbl += 		"<td style='color: #C70039;font-weight: bold'>"+(v.plantas/v.superficie).toFixed(0)+"</td>";
			tbl += 	"</tr>";
			tbl += 	"<tr>";
			tbl += 		"<td style='color: #C70039;font-weight: bold'>PC:</td>";
			tbl += 		"<td>Peso por Caja</td>";
			tbl += 		"<td style='color: #C70039;font-weight: bold'>"+v.superficie+"</td>";
			tbl += 	"</tr>";
			$("#b_valores").html(tbl);
		}
	})
	loadInfo();
}
function loadInfo(){
	loading.show();
	$.ajax({
		url: "/simpleWeb/json/AGRO/GET_ESTIMACION_PRODUCTIVA/"+$("#selCampo").val()+"/"+$("#especie").val()*1+"/"+$("#cuartel").val(),
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			if(data.length == 0){
				$.ajax({
					url: "/simpleWeb/json/AGRO/GET_PARAMETRO_ESTIMACION/"+$("#selCampo").val()+"/"+$("#especie").val()*1,
					type:	"GET",
					dataType: 'json',
					async: false,
					success: function(e){
						codigo_e = 0;
						$.each(b , function(k,v){
							v.campo = $("#selCampo").val();
							v.especie = $("#especie").val();
							e.push(v);
						})
						arrayList = e;
						$('#body_Param').html("");
						var arrayFormulas = [];
						var filas = "";
						var inFormulas = "";
						$.each(e, function(k,v){
							arrayFormulas.push(v.formula);
							var tr = "";
							if(v.id != "KGHAS" && v.id != "KEP" && v.id != "KE" && v.id != "KXP" && v.id != "KX" && v.id != "CT" && v.id != "CTH" && v.formula == ""){
								tr += "<tr id='tr"+v.codigo+"'>";
								tr += 	"<td style='color: #C70039;font-weight: bold' >"+v.id+"</td>";
								tr += 	"<td>"+v.descripcion+"</td>";
								tr += 	"<td>"+v.formula+"</td>";
								tr += 	"<td><input placeholder='"+v.formula+"' onkeyup='calculoParam(this)' type='text' class='form-control input-sm param' id='"+v.id+"'></td>";;
								tr += "</tr>";
							}else if(v.id != "KGHAS" && v.id != "KEP" && v.id != "KE" && v.id != "KXP" && v.id != "KX" && v.id != "CT" && v.id != "CTH" && v.formula != ""){
								inFormulas += "<tr id='tr"+v.codigo+"'>";
								inFormulas += 	"<td style='color: #C70039;font-weight: bold' >"+v.id+"</td>";
								inFormulas += 	"<td>"+v.descripcion+"</td>";
								inFormulas += 	"<td>"+v.formula+"</td>";
								inFormulas += 	"<td><input placeholder='"+v.formula+"' onkeyup='calculoParam(this)' type='text' class='form-control input-sm param' id='"+v.id+"'></td>";;
								inFormulas += "</tr>";
							}
							$('#body_Param').append(tr);
							if(v.id == "KGHAS" || v.id == "KEP" || v.id == "KE" || v.id == "KXP" || v.id == "KX" || v.id == "CT" || v.id == "CTH" && v.formula != ""){
								filas += "<tr id='tr"+v.codigo+"'>";
								filas += 	"<td style='color: #C70039;font-weight: bold' >"+v.id+"</td>";
								filas += 	"<td>"+v.descripcion+"</td>";
								filas += 	"<td>"+v.formula+"</td>";
								filas += 	"<td><input placeholder='"+v.formula+"' onkeyup='calculoParam(this)' type='text' class='form-control input-sm param' id='"+v.id+"'></td>";;
								filas += "</tr>";
							}
							if(v.tipo == 4){
								$("#"+v.id).prop("disabled", true);
							}
							loading.hide();
						})
						$('#body_Param').append(inFormulas);
						$('#body_Param').append(filas);
						var formula = [];
						$(".param").each(function(){
							if($(this)[0].placeholder != ""){
								$(this).prop("disabled", true);
							}
							for(var i = 0; i < arrayFormulas.length; i++){
								if(arrayFormulas[i].indexOf("$('#"+this.id) == -1){
									arrayFormulas[i] = arrayFormulas[i].replace(this.id, "($('#"+this.id+"').val()*1)");
								}
							}
						})
						for(var i = 0; i < arrayFormulas.length; i++){
							$(".param").each(function(){
								if(arrayFormulas[i].indexOf(this.id) != -1){
									var json = {
										input: this,
										formula: arrayFormulas[i],
										input_destino: "",
										indice: arrayFormulas[i].indexOf(this.id),
										valor: 0
									}
									if(arrayList[i].formula != ""){
										json.input_destino = arrayList[i].id;
									}
									a.push(json);
								}
							})
						}
					},errror: function(er){
						alerta("Ha ocurrido un error interno del servidor, consulte con el administrador del sistema")
					}
				})
			}else{
				console.log(data)
				$.each(b , function(k,v){
					v.campo = $("#selCampo").val();
					v.especie = $("#especie").val();
					data.push(v);
				})
				arrayList = data;
				$('#body_Param').html("");
				var arrayFormulas = [];
				var filas = "";
				var inFormulas = "";
				$.each(data, function(k,v){
					if(v.codigo_e != undefined){
						codigo_e = v.codigo_e;
					}
					arrayFormulas.push(v.formula);
					var tr = "";
					if(v.id != "KGHAS" && v.id != "KEP" && v.id != "KE" && v.id != "KXP" && v.id != "KX" && v.id != "CT" && v.id != "CTH" && v.formula == ""){
						tr += "<tr id='tr"+v.codigo+"'>";
						tr += 	"<td style='color: #C70039;font-weight: bold' >"+v.id+"</td>";
						tr += 	"<td>"+v.descripcion+"</td>";
						tr += 	"<td>"+v.formula+"</td>";
						tr += 	"<td><input placeholder='"+v.formula+"' onkeyup='calculoParam(this)' type='text' class='form-control input-sm param' id='"+v.id+"'></td>";;
						tr += "</tr>";
					}else if(v.id != "KGHAS" && v.id != "KEP" && v.id != "KE" && v.id != "KXP" && v.id != "KX" && v.id != "CT" && v.id != "CTH" && v.formula != ""){
						inFormulas += "<tr id='tr"+v.codigo+"'>";
						inFormulas += 	"<td style='color: #C70039;font-weight: bold' >"+v.id+"</td>";
						inFormulas += 	"<td>"+v.descripcion+"</td>";
						inFormulas += 	"<td>"+v.formula+"</td>";
						inFormulas += 	"<td><input placeholder='"+v.formula+"' onkeyup='calculoParam(this)' type='text' class='form-control input-sm param' id='"+v.id+"'></td>";;
						inFormulas += "</tr>";
					}
					$('#body_Param').append(tr);
					if(v.id == "KGHAS" || v.id == "KEP" || v.id == "KE" || v.id == "KXP" || v.id == "KX" || v.id == "CT" || v.id == "CTH" && v.formula != ""){
						filas += "<tr id='tr"+v.codigo+"'>";
						filas += 	"<td style='color: #C70039;font-weight: bold' >"+v.id+"</td>";
						filas += 	"<td>"+v.descripcion+"</td>";
						filas += 	"<td>"+v.formula+"</td>";
						filas += 	"<td><input placeholder='"+v.formula+"' onkeyup='calculoParam(this)' type='text' class='form-control input-sm param' id='"+v.id+"'></td>";;
						filas += "</tr>";
					}
					if(v.tipo == 4){
						$("#"+v.id).prop("disabled", true);
					}
					loading.hide();
				})
				$('#body_Param').append(inFormulas);
				$('#body_Param').append(filas);
				var formula = [];
				$(".param").each(function(){
					if($(this)[0].placeholder != ""){
						$(this).prop("disabled", true);
					}
					for(var i = 0; i < arrayFormulas.length; i++){
						if(arrayFormulas[i].indexOf("$('#"+this.id) == -1){
							arrayFormulas[i] = arrayFormulas[i].replace(this.id, "($('#"+this.id+"').val()*1)");
						}
					}
				})
				for(var i = 0; i < arrayFormulas.length; i++){
					$(".param").each(function(){
						if(arrayFormulas[i].indexOf(this.id) != -1){
							var json = {
								input: this,
								formula: arrayFormulas[i],
								input_destino: "",
								indice: arrayFormulas[i].indexOf(this.id),
								valor: 0
							}
							if(arrayList[i].formula != ""){
								json.input_destino = arrayList[i].id;
							}
							a.push(json);
						}
					})
				}
			}
		},errror: function(er){
			alerta("Ha ocurrido un error interno del servidor, consulte con el administrador del sistema")
		}
	})
}

function calculoParam(input){
	$.each(a, function(k,v){
		$("#"+v.input_destino).val(eval(v.formula).toFixed(2));
	})
}
function GuardarEstimacion(){
	var validate = true;
	$(".param").each(function(){
		var tis = this;
		if(!$(this).val()){
			var a = alerta("Debe ingresar "+this.id);
			$(a.aceptar).click(function(){
				$(tis).focus();
			})
			validate = false;
			return false;
		}
	})
	if(validate){
		loading.show();
		var param = {
			codigo_e: codigo_e,
			cuartel: $("#cuartel").val()*1,
			campo: $("#selCampo").val(),
			especie: $("#especie").val(),
			kep: $("#KEP").val()*1,
			ke: $("#KE").val()*1,
			kxp: $("#KXP").val()*1,
			kx: $("#KX").val()*1,
			ct: $("#CT").val()*1,
			cth: $("#CTH").val()*1
		}
		console.log(param)
		$.ajax({
			url : "/simpleWeb/json/AGRO/ADD_ESTIMACION_PRODUCTIVA/",
			type : "PUT",
			data : JSON.stringify(param),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept","application/json");
				xhr.setRequestHeader("Content-Type","application/json");
			},
			success : function(data, textStatus, jqXHR) {
				alerta("Informacion registrada con exito");
				loading.hide();
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alerta("No se ha podido registrar la informacion, contactece con el administrador del sistema");
			}
		});
	}
}