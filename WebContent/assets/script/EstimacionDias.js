$(document).ready(function(){
	loadSelects();
	console.log(CUARTEL)
})
var arrayList;
var a = [];
var HAS;
var PC;
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
	tipo: 1,
	descripcion: "CAJAS/TOTALES",
	formula: "" 
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
	CargaHanson();
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
function CargaHanson(){
	var prod = '';
	if('' != $("#selectableh").val()){
		prod =$("#selectableh").val();
	} else {
		prod =$("#selectable").val();
	}
	//var prod =$("#selectable").val();
    var esp =$("#especie").val();
	var vari =$("#variedad").val();
	/*if(vari.length > 0 || esp != '' || prod != ''){
		return false;
	}*/
	
	var inicio2 = 0;
	var fin = 0;
	var envase = 0;
	var peso = 0;
	var url = "http://200.55.206.140/ddceco/ECO_CONSULTA_TEMPORADA.aspx?e="+esp;
	console.log(url);
	/*$.ajax({
		url: url,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			inicio2 = parseInt(data[0]['INICIO']);
			fin = parseInt(data[0]['FIN']);
			envase = data[0]['ENVASE']; 
			peso = data[0]['PESO'].replace(',','.');
		}
	})*/
	var kilos = $('#selectableUMedida').val();
	$.getJSON( url, function( data ) {
		inicio2 = parseInt(data[0]['INICIO']);
		fin = parseInt(data[0]['FIN']);
		envase = data[0]['ENVASE']; 
		peso = data[0]['PESO'].replace(',','.');
			
    
    var usuario = $("#user").val();
    var cen = $("#Centros").val();
	//cen = 'DC02';
    //var sem = nroSemana+4;
	var selectedItems = $('.ui-selected', this);
    //if(cen == ""){
        //alert("Seleccione Centro Por Favor");
	//	$('#centrado').css('display','none');
       //  $('.ui-selected', this).removeClass("ui-selected");  
       // return false;
  //  }else{
		
		var semana = $("#nroSemana").text();
		
		//console.log.log(url);
		var AnoTem = $('#slAno').val();
		//var test1 = [[''],['Variedad','L','M','MI','J','V','S','D','Total','L','M','MI','J','V','S','D','Total','W','W']];
		
		//console.log.log(arrayReal);
		var ys = 0;
		
		$.each(vari, function(k,valVar){
			arrayReal[ys] = [];
			for(var i = 0; i <= 52;i++){
				arrayReal[ys][i] = [];
				arrayReal[ys][i]['L'] = 0;
				arrayReal[ys][i]['M'] = 0;
				arrayReal[ys][i]['MI'] = 0;
				arrayReal[ys][i]['J'] = 0;
				arrayReal[ys][i]['V'] = 0;
				arrayReal[ys][i]['S'] = 0;
				arrayReal[ys][i]['D'] = 0;
				arrayReal[ys][i]['T'] = 0;
			}
			var url = "http://200.55.206.140/ddceco/ECO_CONSULTA_ANUAL.aspx?c="+cen+"&p="+prod+"&e="+esp+"&es=&US="+usuario+"&v="+valVar; 
			var dataSemana = [];
			$.ajax({
				url: url,
				type:	"GET",
				dataType: 'json',
				async: false,
				success: function(data){
					dataSemana = data;
				}
			})
			$.each( dataSemana, function( key, val ) {
				if(val['centro'] != undefined){
					$("#Centros").val(val['centro']).trigger('change');
				}						
				if(AnoTem == val['ano'] ){
					//id = val['id']; 
					idEstimaciones[val['variedad']] = val['id'];
					//console.log.log(val);
					console.log(val);
					var ysIndex = 0;
					var xsIndex = 1;
					$.each(val , function(k,v){
						if(ysIndex > 5 && ysIndex < 58){
							if(kilos == 'true'){					
								arrayReal[ys][xsIndex]['T']  = v;
								arrayReal[ys][xsIndex]['TA']  = v;
							} else {
								arrayReal[ys][xsIndex]['T']  = Math.round(parseInt(v)/parseFloat(peso));
								arrayReal[ys][xsIndex]['TA']  = Math.round(parseInt(v)/parseFloat(peso));
							}
							xsIndex++;
						}
						ysIndex++;
					})
				}
			});
			console.log(arrayReal);
			var url2 = "http://200.55.206.140/ddceco/ECO_SEMANA_CONSULT.aspx?c="+cen+"&p="+prod+"&e="+esp+"&US="+usuario+"&v="+valVar+"&s="+semana; 
			console.log();
			var dataSemana2 = [];
			$.ajax({
				url: url2,
				type:	"GET",
				dataType: 'json',
				async: false,
				success: function(data){
					dataSemana2 = data;
				}
			})
			var x = 0; 
			$.each( dataSemana2, function( key, val ) {
				if(AnoTem == val['Ano'] && valVar == val['variedad']){						
					x++;
					//arrayReal[val['semana']] = [];
					if(kilos == 'true'){	
						$('#titleSemana').text("Seleccion de Semana en Kilos");
						arrayReal[ys][val['semana']]['L'] = val['lunes'];
						arrayReal[ys][val['semana']]['M'] = val['martes'];
						arrayReal[ys][val['semana']]['MI'] = val['miercoles'];
						arrayReal[ys][val['semana']]['J'] = val['jueves'];
						arrayReal[ys][val['semana']]['V'] = val['viernes'];
						arrayReal[ys][val['semana']]['S'] = val['sabado'];
					} else {
						var title = "Seleccion Semana en "+envase+" equivale a "+peso+" kilos";
						$('#titleSemana').text(title);
						arrayReal[ys][val['semana']]['L'] = Math.round( val['lunes']/parseFloat(peso));
						arrayReal[ys][val['semana']]['M'] = Math.round( val['martes']/parseFloat(peso));
						arrayReal[ys][val['semana']]['MI'] = Math.round( val['miercoles']/parseFloat(peso));
						arrayReal[ys][val['semana']]['J'] = Math.round( val['jueves']/parseFloat(peso));
						arrayReal[ys][val['semana']]['V'] = Math.round( val['viernes']/parseFloat(peso));
						arrayReal[ys][val['semana']]['S'] = Math.round( val['sabado']/parseFloat(peso));
						arrayReal[ys][val['semana']]['D'] = Math.round( val['domingo']/parseFloat(peso));
					}
				}
			});
			ys++;
		});				
		console.log(arrayReal);
		//actualizarTabla();
		cargaSemana(arrayReal,semana); 
	});
}

var sem1;	   
var sem2;
var sem3;
var sem4;
var sem5;
var sem6;
var sem7;

function cargaSemana(arrayReal,semano){
	$("#calendarioSemana").html("");
	var varie = $("#selectable3").val();
	var cabecera = [];
	var variedad = "";
	semano = parseInt(semano);
	sem1 = semano;
	sem2 = semano+1;
	sem3 = semano+2;
	sem4 = semano+3;
	sem5 = semano+4;
	sem6 = semano+5;
	sem7 = semano+6;
	if(semano == 48){
		sem6 = 1;
		sem7 = 2;
	}
	if(semano == 49){
		sem5 = 1;
		sem6 = 2;
		sem7 = 3;
	}
	if(semano == 50){
		sem4 = 1;
		sem5 = 2;
		sem6 = 3;
		sem7 = 4;
	}
	if(semano == 51){
		sem3 = 1;
		sem4 = 2;
		sem5 = 3;
		sem6 = 4;
		sem7 = 5;
	}
	if(semano == 52){
		sem2 = 1;
		sem3 = 2;
		sem4 = 3;
		sem5 = 4;
		sem6 = 5;
		sem7 = 6;
	}
	var cabecera = [['',{label: 'W'+(semano), colspan: 8},{label: 'W'+(sem2), colspan: 8},{label: 'W'+(sem3), colspan: 8},{label: 'W'+(sem4), colspan: 1},,{label: 'W'+(sem5), colspan: 1},,{label: 'W'+(sem6), colspan: 1},,{label: 'W'+(sem7), colspan: 1}],
					['Variedad','L','M','MI','J','V','S','D','Total','L','M','MI','J','V','S','D','Total','L','M','MI','J','V','S','D','Total','Total','Total','Total','Total','Total']];
	//$('#cabecera').text(semano);
	var y = 0;
	var yy = 0;
	console.log(varie.length);
	var arraySemana = [];
	$.each(varie, function(k,v){
		for(var e = 0; e <= 1;e++){
			console.log(e);
			arraySemana[y] = [];
			if(e == 0){	
				arraySemana[y][0] = v;
				var x = 1;
				for(var i = 0; i <= 6;i++){
					var se = i+semano;
					if(se == 53){se = 1;}
					if(se == 54){se = 2;}
					if(se == 55){se = 3;}
					if(se == 56){se = 4;}
					if(se == 57){se = 5;}
					if(se == 58){se = 6;}
					if(i < 3) {
						arraySemana[y][x] = arrayReal[yy][se]['L'];x++;
						arraySemana[y][x] = arrayReal[yy][se]['M'];x++;
						arraySemana[y][x] = arrayReal[yy][se]['MI'];x++;
						arraySemana[y][x] = arrayReal[yy][se]['J'];x++;
						arraySemana[y][x] = arrayReal[yy][se]['V'];x++;
						arraySemana[y][x] = arrayReal[yy][se]['S'];x++;
						arraySemana[y][x] = arrayReal[yy][se]['D'];x++;
						arraySemana[y][x] = arrayReal[yy][se]['T'];x++;
					} else {
						arraySemana[y][x] = arrayReal[yy][se]['T'];x++;
					}	
					
						
				}
				yy++;
			} else {
				arraySemana[y][0] = v + " Real";
				var x = 1;
				for(var i = 0; i <= 6;i++){
					var se = i+semano;
					if(se == 53){se = 1;}
					if(se == 54){se = 2;}
					if(se == 55){se = 3;}
					if(se == 56){se = 4;}
					if(se == 57){se = 5;}
					if(se == 58){se = 6;}
					if(i < 3) {
						arraySemana[y][x] = 0;x++;
						arraySemana[y][x] = 0;x++;
						arraySemana[y][x] = 0;x++;
						arraySemana[y][x] = 0;x++;
						arraySemana[y][x] = 0;x++;
						arraySemana[y][x] = 0;x++;
						arraySemana[y][x] = 0;x++;
						arraySemana[y][x] = 0;x++;
					} else {
						arraySemana[y][x] = 0;x++;
					}	

						
				}	
			}
			
			y++;
		}
		
	});
	
		
	
	//console.log(arraySemana);
	//console.log.log(cabecera);
	//return
	  function firstRowRenderer(instance, td, row, col, prop, value, cellProperties) {

		Handsontable.renderers.TextRenderer.apply(this, arguments);
		td.style.fontWeight = 'bold';
		td.style.color = 'green';
		td.style.background = '#CEC';
	  }
	var container = document.getElementById('calendarioSemana');
		hot =  new Handsontable(container, {
		data: arraySemana,//Handsontable.helper.createSpreadsheetData(5,23),
		colHeaders: true,
		beforeChange: function (changes, source) {
			console.log(changes);
			console.log(isImpar(changes[0][0]));
			if(isImpar(changes[0][0])){
				alerta("No se puede modificar valores reales.");
				changes[0][3] = changes[0][2];
				return false;
			}
			if(source != 'edit'){
				if (changes[0][3] == ""){
					if(changes[0][1] == 8 || changes[0][1] == 16 || changes[0][1] == 24 ){
						alerta("No se puede modificar los totales, debe modificar dia a dia.");
						changes[0][3] = changes[0][2];
					} else {
						if (changes[0][3] == ""){
						//	alert('No puede ingresar valores vacios.');
							changes[0][3] = 0;
						}
						//changes[0][3] = 0;
						if(changes[0][1] > 0 && changes[0][1] < 8) {
							var total = parseInt(hot.getDataAtCell(0,8));
							var newTotal = parseInt(total) + 0 - parseInt(changes[0][2]);
							//hot.setDataAtCell(0, 8, newTotal);
						}
						if(changes[0][1] < 17 && changes[0][1] > 8) {
							var total = parseInt(hot.getDataAtCell(0,16));
							var newTotal = parseInt(total) + 0 - parseInt(changes[0][2]);
							//hot.setDataAtCell(0, 16, newTotal);
						}
					}		
				}
			}	
			if(source == 'edit'){
				if( changes != null){
					if(changes[0][1] == 8 || changes[0][1] == 16 || changes[0][1] == 24 ){
						alerta("No se puede modificar los totales, debe modificar dia a dia.");
							changes[0][3] = changes[0][2];
					} else {
						if (changes[0][3] == ""){
							//	alert('No puede ingresar valores vacios.');
								changes[0][3] = 0;
							}
						//if(changes[0][1] == 7 || changes[0][1] == 15){
							//alert("No se puede modificar los domingo.");
							//changes[0][3] = changes[0][2];
						//}
						if(changes[0][1] > 0 && changes[0][1] < 8) {
							////console.log.log(changes[0][3]);
							if (changes[0][3] == ""){
							//	alert('No puede ingresar valores vacios.');
								changes[0][3] = 0;
							}
							if (!/^([0-9])*$/.test(changes[0][3])){
								alerta('Debe ingresar valores numericos.');
								changes[0][3] = changes[0][2];
							}
							if(changes[0][3] < 0){
								alerta('No puede ingresar valores negativos.');
								changes[0][3] = changes[0][2];
							}												
							var total = parseInt(hot.getDataAtCell(0,8));
							var newTotal = parseInt(total) + parseInt(changes[0][3]) - parseInt(changes[0][2]);
							////console.log.log(newTotal);
							//hot.setDataAtCell(0, 8, newTotal);
							//$('#calendarioSemana').handsontable('setDataAtCell', 0, 8, newTotal);
						}
						if(changes[0][1] < 17 && changes[0][1] > 8) {
							if(changes[0][3] < 0){
								alerta('No puede ingresar valores negativos.');
								changes[0][3] = changes[0][2];
							}	
							if (!/^([0-9])*$/.test(changes[0][3])){
								alerta('Debe ingresar valores numericos.');
								changes[0][3] = changes[0][2];
							}
							var total = parseInt(hot.getDataAtCell(0,16));
							var newTotal = parseInt(total) + parseInt(changes[0][3]) - parseInt(changes[0][2]);
							////console.log.log(newTotal);
							//hot.setDataAtCell(0, 16, newTotal);
						}
					}				
				}
			} /*else {
				changes[0][3] = 0;
				//console.log.log(changes[0][1]);
				if(changes[0][1] > 0 && changes[0][1] < 8) {
					var total = parseInt(hot.getDataAtCell(0,8));
					//console.log.log(total);
					var newTotal = parseInt(total) + parseInt(changes[0][3]) - parseInt(changes[0][2]);
					//console.log.log(newTotal);
					hot.setDataAtCell(0, 8, newTotal);
				}
			}*/			
		},
		rowHeaders: true,
		nestedHeaders: cabecera ,
	});
	 $("#nroSemana").html(semano);
	////console.log.log(semanano);
}	