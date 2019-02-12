$(document).ready(function(){
	$.ajax({
		url: "/simpleWeb/json/AGRO/Get_CampoEspecie/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			campo_especie = data;
		}
	})
	$.ajax({
		url: "/simpleWeb/json/AGRO/Get_CampoVariedad2/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			console.log(data)
			campo_variedad = data;
		}
	})
	loadVariedad();
	loadCuartel();
	$(".select2.select2-container.select2-container--bootstrap").attr("style", "");
	$("#ano_plantacion").attr("max", "2018");
	console.log(getCuartel())
});
var CUARTEL = getCuartel();
var poly;
var rs;
var SECTOR;
var bounds = {
	north: -33.44262,
	south: -33.44264,
	east: -70.87731,
	west: -70.87733
}; 


var campo_especie;
var campo_variedad;
var campoRaius = null;
var selCuartelFilter = "<option value='0'>Todos</option>";
var selCuartelFilter_SG = "<option value=''>Selecciones</option>";
var selSectorFilter = "<option value='0'>Todos</option>";
var selEspecieFilter = "<option value='0'>Todos</option>";
var selVariedadFilterGlobal = "<option value='0'>Todos</option>";
var CECO;
var CECO2;
var CECOARR;
var checkIngresar;
var incidenciaMark = [];
var checkUrgencia;
var checkTipo_incidencia;
var dataCampo;
var coordenadasArray;
var rectanglesArr;
var rectangle1;
var cordCircle_Radius;
var cordCircle_Center;
var drawingManager = null;
var selectedShape;
var colors = ['#1E90FF', '#32CD32', '#FF8C00', '#4B0082', '#ff0000'];
var selectedColor;
var colorButtons = [];
var map = null;
var currColor = null;
var Especie = "";
var idtest;
var drawCord = null;
var infowindow = null;
var drawCordNew = null;
var Info = [];
var Dibujo = [];
var Funcion = [];
var status;
var zoom;
var CAMPOSELECTED;
var opcion;
var creando = false;
//FUNCION DE CARGA SEGUN URL
function loadCeco(sociedad, grupo){
	var arrCeco = [];
	$.each(CUARTEL, function(k,v){
		arrCeco.push(v.ceco);
	})
	$.getJSON(IPSERVERSAP+"JSON_BAPI_COSTCENTER_GETLIST1.aspx?SOCIEDAD="+sociedad+"&GRUPO="+grupo, function(data){
		CECOARR = data;
		CECO = "<option value=''></option>";
		CECO2 = "<option value=''></option>";
		$.each(data.COSTCENTERLIST, function(k,v){
			CECO += "<option value='0'>Ninguno</option>";
			if(arrCeco.indexOf(v.COSTCENTER) == -1){
				CECO += "<option value="+v.COSTCENTER+">"+v.DESCRIPT+"</option>";
				CECO2 += "<option value="+v.COSTCENTER+">"+v.DESCRIPT+"</option>";
			}
		})
		$("#ceco").html(CECO);
	})
	$.getJSON(IPSERVERSAP+"JSON_BAPI_INTERNALORDER_GETLIST.aspx?TIPO=Z600", function(data){
		MACRO = data;
		CECO = "<option value=''>Seleccionar</option>";
		$.each(data.ORDER_LIST, function(k,v){
			//if(arrCeco.indexOf(v.COSTCENTER) == -1){
				CECO += "<option value="+v.OBJECT_NO+">"+v.ORDER_NAME+"</option>";
			//}
		})
//		$("#ordenco").html(CECO);
	})
}

$("#ceco").change(function(){
	$("#cod_ceco").val($(this).val());
	$("#cod_ceco").attr('disabled',true);
});
$("#ordenco").change(function(){
	$("#cod_ceco").val($(this).val());
	$("#cod_ceco").attr('disabled',true);
});

var arrayFormacion;

$.ajax({
	url: "/simpleWeb/json/AGRO/getParametro_especie/formacion/",
	type:	"GET",
	dataType: 'json',
	async: false,
	success: function (data) { 
		arrayFormacion = data;
    }
})

function loadFormacion(cod_especie){
	$('#formacion').empty();
	$('#formacion').append('<option value=""></option>');
	$.each(arrayFormacion, function(index, element) {
		if(cod_especie == element.especie){
			$('#formacion').append('<option value="'+element.id+'">'+element.descripcion+'</option>');
		}
    });
}
loadTipoPlanta();
function loadTipoPlanta(){
	$('#tipo_planta').empty();
	$('#tipo_planta').append('<option value="0">Seleccionar</option>');
	$.ajax({
		url: "/simpleWeb/json/work/getParametros/TIPO%20DE%20PLANTA/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function (data) { 
	        $.each(data, function(index, element) {
	            $('#tipo_planta').append('<option value="'+element.llave+'">'+element.descripcion+'</option>');
	        });
	    }
	})
}
loadTipoProteccion();
function loadTipoProteccion(){
	$('#tipo_proteccion').empty();
	$('#tipo_proteccion').append('<option value="0">Seleccionar</option>');
	$.ajax({
		url: "/simpleWeb/json/work/getParametros/TIPO%20PROTECCION/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function (data) {
	        $.each(data, function(index, element) {
	            $('#tipo_proteccion').append('<option value="'+element.llave+'">'+element.descripcion+'</option>');
	        });
	    }
	})
}
loadLimitantesSuelo();
function loadLimitantesSuelo(){
	$('#limitantes_suelo').empty();
	$('#limitantes_suelo').append('<option value="0">Seleccionar</option>');
	$.ajax({
		url: "/simpleWeb/json/work/getParametros/LIMITANTES%20DE%20SUELO/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function (data) { 
	        $.each(data, function(index, element) {
	            $('#limitantes_suelo').append('<option value="'+element.llave+'">'+element.descripcion+'</option>');
	        });
	    }
	})
}
loadTipoPlantacion();
function loadTipoPlantacion(){
	$('#tipo_plantacion').empty();
	$('#tipo_plantacion').append('<option value="0">Seleccionar</option>');
	$.ajax({
		url: "/simpleWeb/json/work/getParametros/TIPO%20PLANTACION/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function (data) {
	        $.each(data, function(index, element) {
	            $('#tipo_plantacion').append('<option value="'+element.llave+'">'+element.descripcion+'</option>');
	        });
	    }
	})
}
loadTipoControlHeladas();
function loadTipoControlHeladas(){
	$('#tipo_control_heladas').empty();
	$('#tipo_control_heladas').append('<option value="0">Seleccionar</option>');
	$.ajax({
		url: "/simpleWeb/json/work/getParametros/TIPO%20CONTROL%20HELADAS/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function (data) {
	        $.each(data, function(index, element) {
	            $('#tipo_control_heladas').append('<option value="'+element.llave+'">'+element.descripcion+'</option>');
	        });
	    }
	})
}
//function cargaHuertosSelect(SESION){
//	$('#selCoordenadas').html("");
//	var selectHuerto = "<option value=''>Seleccionar Campo</option>";
//	var campoId = "<option value=''>Seleccionar Campo</option>";
//	$.each( SESION.campo, function( key, val ) {
//		selectHuerto += "<option value="+val.codigo+">"+val.descripcion+"</option>";
//		campoId += "<option value="+val.campo+">"+val.descripcion+"</option>";
//	});
//	$("#campoID").html(campoId);
//	$('#selCoordenadas').html(selectHuerto);
//}
window.onload = function(){
	var auxEspecie = "<option value=''>Seleccionar</option>";
	var selEspecieFilter = "<option value='0'>Todos</option>";
	$.each(SESION.especie,function(k,v){
		auxEspecie +=  "<option value='"+v.codigo+"'>"+v.especie+"</option>"; 
		selEspecieFilter +=  "<option value='"+v.codigo+"'>"+v.especie+"</option>"; 
	})
	var sector = "<option value=''>Seleccionar</option>";
	$.each(SESION.sector, function(k,v){
		sector += "<option value='"+v.sector+"'>"+v.descripcion+"</option>";
	})
	$("#sector").html(sector);
	$("#selEspecieFilter").html(selEspecieFilter);
	$('#especie').html(auxEspecie);
	var valores = getMAP();
	var arrAux = [valores];
	if(valores){
		$.each(arrAux, function(k, v){
			if(v.id == 0){
				$('#save').hide();
				$('#update').show();
				$.getJSON("/simpleWeb/json/map/view", function(data){
					for(var i = 0; i < data.length; i++){
						Info.push({info:null});
						Dibujo.push({draw:'',marker:''})
					}
					var auxI = 0;
					$.each(data, function(key, val){
						var cordDatos = (val.coordenada);
						var cordColor = (val.color);
						var res = cordDatos.split("),(");
						var listaCorrds=[];
						for(var i = 0; i < res.length; i++){
							var row = res[i].split("(").join("").split(")").join("").split(" ").join("").split(",");
							listaCorrds.push({lat:row[0]*1,lng:row[1]*1});
						}
						Info[auxI].info = new google.maps.InfoWindow({
							content: 'Nombre: <strong>'+val.valor1+'</strong>'
							+'<br>Especie: <strong>'+val.especie+'</strong>'
							+'<br>Variedad: <strong>'+val.variedad+'</strong>'
							+'<br>Cantidad: <strong>'+val.cantidad+'</strong>'
							+'<br>F/Plantacion: <strong>'+val.plantacion+'</strong>'
							+'<br>Hectarias: <strong>'+val.hectarias+'</strong>'
							+'<br>Estado: <strong>'+val.status+'</strong>'
						});
						Dibujo[auxI].draw = new google.maps.Polygon({
							paths: listaCorrds,
							fillOpacity: .3,
							strokeWeight: 1.5,
							fillColor: cordColor,
							editable: false
						});
						var latSum = 0;
						var lngSum = 0;
						$.each(listaCorrds, function(k, v){
							latSum = latSum + v.lat;
							lngSum = lngSum + v.lng;
						});
						latSum = latSum / listaCorrds.length;
						lngSum = lngSum / listaCorrds.length;
						
						Dibujo[auxI].marker = new google.maps.Marker({
							position: new google.maps.LatLng(latSum,lngSum),
							visible: false,
							map: map
						})
						drawingManager.setMap(map);
						Dibujo[auxI].draw.setMap(map);
						auxI++;
					});
					
					$.each(Dibujo,function(k,v){
						google.maps.event.addListener(v.draw, 'click', function(){
							var select = (infowindow);
							infowindow = (Info[k].info);
							if(select != null){
								select.close(map,v.marker);
							}
							Info[k].info.open(map,v.marker);
							selectedShape = v.draw;
							setSelection(v.draw);
//							$('#color_palette').show();
						})
						google.maps.event.addListener(map, 'click', function(){
							$('#color_palette').hide();
							infowindow.close(map,v.marker);
						})	
					})
				})
			}else{
//				$("#historial").show();
				selCoordenadas(v.id);
			}
		});
	}
}
function clearSelection(){
	if(selectedShape) {
		selectedShape.setEditable(false);
		selectedShape = null;
	}
}
function setSelection(shape) {
	clearSelection();
	selectedShape = shape;
	shape.setEditable(false);
	selectColor(shape.get('fillColor') || shape.get('strokeColor'))
}
function deleteSelectedShape() {
	var coordenada = (selectedShape.getPath().getArray().toString());
	$.each(CAMPOSELECTED, function(k,v){
		if(v.georeferencia == coordenada){
			cuartelS = v;
		}
	})
	if(selectedShape) {
		var c = confirmar.confirm("Desea eliminar este Cuartel(No se puede revertir)");
		$(c.aceptar).click(function(){
			$.ajax({
				url:	"/simpleWeb/json/AGRO/DELETE_CUARTEL/"+cuartelS.codigo,
				type:	"POST",
				success: function(){
					alerta("Se ha eliminado el Cuartel");
					if(infowindow != null){
						infowindow.close(map);
					}
					$('#color_palette').hide();
					selectedShape.setMap(null);
					$("#superficie").val("");
					CUARTEL = getCuartel();
					selCoordenadas($("#selCoordenadas").val());
				},
				error: function(a, b){
					console.log(a);
				}
			});
		});
	}
}
function cambio_ano(val){
	var hoy = dateHoy();
	hoy = hoy.split("-");
	if(val.value < 1960 && val.value.length == 4){
		alerta("El año no puede ser menor a 1960"),
		$(val).val("");
		return;
	}else if(val.value > hoy[0]*1){
		alerta("El año no puede ser mayor al año Actual"),
		$(val).val("");
		return;
	}
}
var cuartelS;
function editarCuartel(){
	if(selectedShape){
		opcion = "Editar";
		var variedad = "<option value=''>Seleccionar</option>";
		$.each(SESION.variedad, function(kv,vv){
			variedad += "<option value='"+vv.codigo+"'>"+vv.variedad+"</option>";
		})
		$("#variedad").html(variedad);

		var campo = $("#selCoordenadas").val();
		$.each(SESION.campo, function(k,v){
			if(campo == v.codigo){
				campo = v.campo;
			}
		})
		var coordenada = (selectedShape.getPath().getArray().toString());
		$.each(CAMPOSELECTED, function(k,v){
			if(v.georeferencia == coordenada){
				$(".block").each(function(){
					$(this).prop("disabled", true);
				})
				$(".blocked").each(function(){
					$(this).prop("disabled", true);
				})
				valExit = true;
				CECO = CECO2;
				CECO += "<option value='0'>Ninguno</option>";
				$.each(CECOARR.COSTCENTERLIST, function(kc,vc){
					if(v.ceco == vc.COSTCENTER){
						CECO += "<option value="+vc.COSTCENTER+">"+vc.DESCRIPT+"</option>";
					}
				})
				$("#ceco").html(CECO);
				cuartelS = v;
				var ancho = v.distancia_hancho;
				var largo = v.distancia_largo;
				if(largo == ""){largo = 0}
				if(ancho == ""){ancho = 0}
				var plantas_has = (10000*1)/(ancho * largo);
				if(plantas_has != Infinity){
					plantas_has = plantas_has+"";
					$("#plantas_has").val(formatNumber(plantas_has));
					//$("#plantas_has").val(plantas_has);
				}
				$("#save").hide();
				$("#update").show();
				$("#modificar").show();
				$("#plantas_has").val();
				$("#nameCuartel").val(v.nombre);
				$("#sector").html(loadSector(campo));
				$("#sector").val(v.sector);
				$("#estado").val(v.estado).trigger('change');
				$("#ordencomacro").val(v.macroco).trigger("change");
				$("#ordenco").val(v.ordenco).trigger("change");
				$("#ceco").val(v.ceco).trigger("change");
				$("#especie").html(loadEspecie(campo));
				$("#especie").val(v.especie).trigger("change");
				$("#variedad").html(loadVariedad(v.especie));
				$("#variedad").val(v.variedad);
				$("#patron").val(v.patron);
				$("#alias").val(v.codigo_cuartel);
				$("#ano_plantacion").val(v.ano_plantacion);
				var superficie = v.superficie+'';
				$("#superficie").val(superficie.replace('.',','));
				$("#plantas").val(formatNumber(v.plantas));
				var distancia_hancho = v.distancia_hancho+'';
				$("#distancia_hancho").val(distancia_hancho.replace('.',','));
				var distancia_largo = v.distancia_largo+'';
				$("#distancia_largo").val(distancia_largo.replace('.',','));
				loadFormacion(v.especie);
				$("#formacion").val(v.formacion).trigger('change');
				$("#vivero").val(v.vivero);
				$("#tipo_planta").val(v.tipo_planta).trigger('change');
				$("#tipo_control_heladas").val(v.tipo_control_heladas).trigger('change');
				$("#tipo_proteccion").val(v.tipo_proteccion).trigger('change');
				$("#limitantes_suelo").val(v.limitante_suelo).trigger('change');
				$("#polinizante").val(v.polinizante);
				$("#tipo_plantacion").val(v.tipo_plantacion).trigger('change');
				$("#clon").val(v.clon);
//				if(v.ceco == ""){
//					$("#divOrdenCo").show();
//					$("#divCeco").hide();
//					$("#ordenco").val(v.ordenco);
//					$("#ordenco").prop("disabled", true);
//					$("#ceco").prop("disabled", false);
//				}else{
//					$("#divOrdenCo").hide();
//					$("#divCeco").show();
//					$("#ceco").val(v.ceco);
//					$("#cod_ceco").val(v.ceco);
//					$("#ceco").prop("disabled", true);
//					$("#ordenco").prop("disabled", false);
//				}
				$("#addCuartel").show();
			}
		})
	}
}
function loadSector(campo){
	var sector = "<option value=''>Seleccionar</option>";
	$.each(SESION.sector, function(k,v){
		if(v.campo == campo){
			sector += "<option value='"+v.sector+"'>"+v.descripcion+"</option>";
		}
	})
	return sector;
}
function loadVariedad(especie,campo){
	var variedad = "<option value=''>Seleccionar</option>";
	var arrayVar = [];
	$.each(campo_variedad, function(kb,vb){
		if(vb.codigo_campo == campoGlobal){
			$.each(SESION.variedad, function(k,v){
				if(v.especie == especie && vb.codigo == v.codigo){
					if(arrayVar.indexOf(v.codigo) == -1) {
						arrayVar.push(v.codigo);
						variedad += "<option value='"+v.codigo+"'>"+v.variedad+"</option>";
					}
					
				}
			})
		}
	});
	return variedad;
}
function loadEspecie(campo){
	var especie = "<option value=''>Seleccionar</option>";
	$.each(campo_especie, function(kb,vb){
		if(vb.codigo_campo == campo){
			$.each(SESION.especie, function(k,v){
				if(v.codigo == vb.codigo_especie){
					especie += "<option value='"+v.codigo+"'>"+v.especie+"</option>";
				}
			})
		}
	})
	return especie;
}
function cancelar(input){
	$("#delete").hide();
	$("#editar").hide();
	drawingManager.setOptions({
		drawingControl: false
	});
	drawingManager.drawingMode = null;
	if(input && input.id == "cancelar"){
		selCoordenadas($("#selCoordenadas").val());
	}
	if(drawCord){
		drawCord.setMap(null);
	}
	$.each(Dibujo, function(kd,vd){
		if(vd.draw != ""){
			vd.draw.setOptions({clickable: true});
		}
	})
	if(selectedShape){
		selectedShape.set('fillColor', "#000000");
	}
	var campo = $("#selCoordenadas").val();
	$.each(SESION.campo, function(k,v){
		if(campo == v.codigo){
			campo = v.campo;
		}
	})
	$("#coordenadas").val("");
	document.getElementById('superficie').placeholder ='';
	$("#sector").html(loadSector(campo));
	$(".form-add").each(function(){
		$(this).val("");
	})
	valExit = false;
	$("#updGeoreferencia").hide();
	$("#addGeoreferencia").show();
	$("#addCuartel").hide();
	$("#sector").html(loadSector(campo));
	limpiarInput();
}
function selectColor(color) {
	selectedColor = color;
	for (var i = 0; i < colors.length; i++) {
		currColor = colors[i];
		colorButtons[currColor].style.border = currColor == color ? '2px solid #789' : '2px solid #fff'; 
	}
}
function setSelectedShapeColor(color) {
    if (selectedShape) {
    	if (selectedShape.type == google.maps.drawing.OverlayType.POLYLINE) {
    		selectedShape.set('strokeColor', color);
    	} else {
    		selectedShape.set('fillColor', color);
    	}
    }
}
function makeColorButton(color,i) {
    var button = document.createElement('span');
    button.className = 'color-button';
    button.style.backgroundColor = color;
    google.maps.event.addDomListener(button, 'click', function() {
    	selectColor(color);
	    setSelectedShapeColor(color);
    });
    if(i == 0){button.title = 'Sembrado'}
    if(i == 1){button.title = 'Listo para Cosechar'}
    if(i == 2){button.title = 'Seco'}
    if(i == 3){button.title = 'Fumigado'}
    if(i == 4){button.title = 'Prohibido el acceso'}
    
    return button;
}
function buildColorPalette() {
    var colorPalette = document.getElementById('color_palette');
    for (var i = 0; i < colors.length; ++i) {
    	var currColor = colors[i];
	    var colorButton = makeColorButton(currColor,i);
	    colorPalette.appendChild(colorButton);
	    colorButtons[currColor] = colorButton;
    }
    
    colors[0].titleName = 'Sembrado';
    selectColor(colors[0]);
}
function initMap (){
	formatMapa();
	$("#mapa").addClass("disabledbutton");
	google.maps.event.addListener(drawingManager, 'drawingmode_changed', function(event){
		if(drawingManager.drawingMode == 'polyline'){
			poly = new google.maps.Polyline({
		          strokeColor: '#000000',
		          strokeOpacity: 1.0,
		          strokeWeight: 3
		        });
	        poly.setMap(map);
	        map.addListener('click', console.log("sdjhfdshfsdhfjsdhjk"));
			map.addListener('click', addLatLng);
		}
	})
	
	google.maps.event.addListener(drawingManager, 'polylinecomplete', function(linea){
		var stringCords = linea.getPath().getArray().toString();
		var polylineArray = resCords(stringCords);
		drawCord = linea;
//		$('#color_palette').show();
	})
	var flightPlanCoordinates = [
        {lat: 37.772, lng: -122.214},
        {lat: 21.291, lng: -157.821},
        {lat: -18.142, lng: 178.431},
      	{lat: -27.467, lng: 153.027}
    ];
	var flightPath = new google.maps.Polyline({
		path: flightPlanCoordinates,
		geodesic: true,
		strokeColor: '#FF0000',
		strokeOpacity: 1.0,
		strokeWeight: 2
	});

    flightPath.setMap(map);
	google.maps.event.addListener(drawingManager, 'circlecomplete', function (circle){
		cordCircle_Radius = (circle.getRadius().toString());
		cordCircle_Center = (circle.getCenter().toString());
	})
	
	google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
		if (e.type != google.maps.drawing.OverlayType.MARKER) {
	        drawingManager.setDrawingMode(null);
	        var newShape = e.overlay;
	        newShape.type = e.type;
	        google.maps.event.addListener(newShape, 'click', function() {
//	        	$('#color_palette').show();
	        	setSelection(newShape);
	        });
	        setSelection(newShape);
        }
    });
	
	google.maps.event.addListener(drawingManager, 'drawingmode_changed', clearSelection);
    google.maps.event.addListener(map, 'click', function(){
    	$('#color_palette').hide();
    	clearSelection();
    });
    google.maps.event.addDomListener(document.getElementById('delete'), 'click', deleteSelectedShape);
	buildColorPalette();
	$("#loading").hide();
}
function addLatLng(event) {
    var path = poly.getPath();

    // Because path is an MVCArray, we can simply append a new coordinate
    // and it will automatically appear.
    path.push(event.latLng);

    // Add a new marker at the new plotted point on the polyline.
    var marker = new google.maps.Marker({
      position: event.latLng,
      title: '#' + path.getLength(),
      map: map
    });
  }
function resCords(path){
	var res = path.split("),(");
	var listaCorrds = [];
	for(var i = 0; i < res.length; i++){
		var row = res[i].split("(").join("").split(")").join("").split(" ").join("").split(",");
		listaCorrds.push({lat:row[0]*1,lng:row[1]*1});
	}
	return listaCorrds;
}
function checkAdd(opt){
	checkIngresar = opt.value;
}
function radioUrgencia(check){
	checkUrgencia = check.value;
}
function radioTipo_Incidencia(check){
	checkTipo_incidencia = check.value;
}
function getMAP(){
	var location = document.location.href;
	if(location.indexOf('?')>0){
		var getString = location.split('?')[1];
		var GET = getString.split('&');
		var get = {};
		
		for(var i = 0, l = GET.length; i < l; i++){
			var tmp = GET[i].split('=');
            get[tmp[0]] = unescape(decodeURI(tmp[1]));
		}
		return get;
	}
}
function app_click(){
	$("#aplicaciones").addClass("active");
	$("#labores").removeClass('active');
	$("#incidencias").removeClass('active');
	$("#archivos").removeClass('active');
	
	$("#app_div").show();
	$("#works_div").hide();
	$("#in_div").hide();
	$("#docs_div").hide();
};
function works_click(){
	$("#aplicaciones").removeClass("active");
	$("#labores").addClass('active');
	$("#incidencias").removeClass('active');
	$("#archivos").removeClass('active');
	
	$("#app_div").hide();
	$("#works_div").show();
	$("#in_div").hide();
	$("#docs_div").hide();
};
function in_click(){
	$("#aplicaciones").removeClass("active");
	$("#labores").removeClass('active');
	$("#incidencias").addClass('active');
	$("#archivos").removeClass('active');
	
	$("#app_div").hide();
	$("#works_div").hide();
	$("#in_div").show();
	$("#docs_div").hide();
};
function docs_click(){
	$("#aplicaciones").removeClass("active");
	$("#labores").removeClass('active');
	$("#incidencias").removeClass('active');
	$("#archivos").addClass('active');
	
	$("#app_div").hide();
	$("#works_div").hide();
	$("#in_div").hide();
	$("#docs_div").show();
};
function vari(){
	var varie = document.getElementsByName("varie");
	$.each(SESION.variedad, function(k,v){
		for(var i = 0; i < varie.length; i++){
			$(varie[i]).val(datosGenerales.rendimiento_general[0].variedad);
		}
	})
}
function formatMapa(){
	map = new google.maps.Map(document.getElementById('mapa'),{
		center: {lat: -33.4032493, lng: -70.6158353},
		zoom: 10,
		mapTypeId: 'satellite'
	});
	var input = document.getElementById("address");
	
	var searchBox = new google.maps.places.SearchBox(input);
	
	map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });
	
	var markers = [];
    searchBox.addListener('places_changed', function() {
    	var places = searchBox.getPlaces();
    	if (places.length == 0){
    		return;
    	}
    	markers.forEach(function(marker){
    		marker.setMap(null);
    	});
    	markers = [];
    	var bounds = new google.maps.LatLngBounds();
    	places.forEach(function(place) {
    		if (!place.geometry) {
    			return;
    		}
    		var icon = {
    			url: place.icon,
    			size: new google.maps.Size(71, 71),
    			origin: new google.maps.Point(0, 0),
    			anchor: new google.maps.Point(17, 34),
    			scaledSize: new google.maps.Size(25, 25)
    		};

    		markers.push(new google.maps.Marker({
    			map: map,
    			icon: icon,
    			title: place.name,
    			position: place.geometry.location
    		}));
    		if (place.geometry.viewport) {
    			bounds.union(place.geometry.viewport);
    		} else {
    			bounds.extend(place.geometry.location);
    		}
    	});
    	map.fitBounds(bounds);
    });
    
	drawingManager = new google.maps.drawing.DrawingManager({
		drawingControl: false,
		drawingControlOptions: {
			position: google.maps.ControlPosition.TOP_CENTER,
			drawingModes: ['polygon']
		},
		markerOptions: {
			icon: "../assets/global/img/incidencia.png",
			size: new google.maps.Size(20, 32),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(0, 32)
		},
		circleOptions: {
			fillColor: '#A7A7A7',
			fillOpacity: .5,
			strokeWeight: 1,
			draggable: false,
			selected: true,
			zIndex: 1
		},
		polygonOptions: {
			fillOpacity: .3,
			strokeWeight: 1.5,
			selected: true,
			editable: false
		},
		rectangleOptions: {
			draggable: true,
			fillOpacity: .3,
			selected: true,
			strokeWeight: 1
		},
		polylineOptions: {
			draggable: false,
			selected: true,
			strokeWeight: 1.5
		}
		
	});

	google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon){
		if(creando==true){
			drawCord.setMap(null);
		}
	})
	
	google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon){
		drawCord = polygon;
		clearSelection();
		$.each(Dibujo, function(kd,vd){
			if(vd.draw != ""){
				var cordDraw = (vd.draw.getPath().getArray().toString());
				var res2 = cordDraw.split("),(");
				var listaDraw = [];
				for(var i = 0; i < res2.length; i++){
					var row = res2[i].split("(").join("").split(")").join("").split(" ").join("").split(",");
					listaDraw.push({lat:row[0]*1,lng:row[1]*1});
				}
				var validateTue = true;
				$.each(listaDraw, function(kf, vf){
					var marker = new google.maps.Marker({
					    position: vf,
					    map: map,
					    visible: false
					});
					if(google.maps.geometry.poly.containsLocation(marker.position, polygon)){
						validateTue = false;
					}
					else{
						creando = true;
					}
				})
				
				var cordPolygon = (polygon.getPath().getArray().toString());
				var res = cordPolygon.split("),(");
				var listaCorrds = [];
				for(var i = 0; i < res.length; i++){
					var row = res[i].split("(").join("").split(")").join("").split(" ").join("").split(",");
					listaCorrds.push({lat:row[0]*1,lng:row[1]*1});
				}
				$.each(listaCorrds, function(kl,vl){
					var marker = new google.maps.Marker({
					    position: vl,
					    map: map,
					    visible: false
					});
					if(google.maps.geometry.poly.containsLocation(marker.position, vd.draw)){
						validateTue = false;
					}
					else{
						creando = true;
					}
				})
				vd.draw.setOptions({
					clickable: false,
					fillColor: "#000000"
				});
				if(!validateTue){
					alerta("Este Cuartel sobrepasa los limites de otro cuartel ya ingresado");
					drawCord.setMap(null);
					return false;
				}
			}
		})
		var getpath = polygon.getPath().getArray();
		var cordPolygon = (polygon.getPath().getArray().toString());
		document.getElementById('coordenadas').value=cordPolygon;
		var validate = true;
		for(var x = 0; x < getpath.length; x++){
			var getP = getpath[x].toString().split(",");
			getP[0] = getP[0].replace("(", "");
			getP[1] = getP[1].replace(")", "");
			var corner = {lat: getP[0]*1, lng: getP[1]*1};
			console.log(corner)
			var position = new google.maps.LatLng(corner.lat, corner.lng);
			if(campoRaius.getBounds().contains(position)){
				validate = true;
				break;
			}else{
				validate = false;
			}
		}
		if(!validate){
			alerta("Esta Cuartel esta fuera de los limites establecidos para este campo");
			drawCord.setMap(null);
			return;
		}
		else{
			creando = true;
		}
//		drawingManager.setOptions({
//			drawingControl: false
//		});
		var res = cordPolygon.split("),(");
		var listaCorrds = [];
		for(var i = 0; i < res.length; i++){
			var row = res[i].split("(").join("").split(")").join("").split(" ").join("").split(",");
			listaCorrds.push({lat:row[0]*1,lng:row[1]*1});
		}
		var arrArea = [];
		$.each(listaCorrds,function(k,v){
			arrArea.push(new google.maps.LatLng(v.lat,v.lng));
		})
		var area = google.maps.geometry.spherical.computeArea(arrArea);
		area = area/10000;
		var ar = parseFloat(area);
		rs = Math.round(ar*100)/100;
		document.getElementById('superficie').placeholder =rs;
		rectanglesArr = cordPolygon;
		coordenadasArray = listaCorrds;
		rectangle1 = JSON.parse(JSON.stringify(listaCorrds));

		
		
	})
	google.maps.event.addListener(drawingManager, 'circlecomplete', function (circle){
		cordCircle_Radius = (circle.getRadius().toString());
		cordCircle_Center = (circle.getCenter().toString());
	})
	google.maps.event.addListener(drawingManager, 'markercomplete', function(marker){
		marker = marker;
		console.log(marker.latLng);
//		getKilometros(marker.position.lat(), marker.position.lng(), marker.position.lat(),  marker.position.lng());
	});
	drawingManager.setMap(map);
//	initMap();
}
function selCoordenadas(id){
	drawingManager.setOptions({
		drawingControl: false
	});
	cancelar();
	if(id != ""){
		$("#mapa").removeClass("disabledbutton");
		$("#selSectorFilter").attr("disabled", false);
		$("#selCuartelFilter").attr("disabled", false);
		$("#selEspecieFilter").attr("disabled", false);
		$("#selVariedadFilter").attr("disabled", false);
		$("#selCuartelFilter_SG").attr("disabled", false);
	}else{
		$("#mapa").addClass("disabledbutton");
		$("#selSectorFilter").attr("disabled", true);
		$("#selCuartelFilter").attr("disabled", true);
		$("#selEspecieFilter").attr("disabled", true);
		$("#selVariedadFilter").attr("disabled", true);
		$("#selCuartelFilter_SG").attr("disabled", true);
	}
	var cecoId;
	var campoId;
	$.each(SESION.campo, function(kc, vc){
		if(vc.codigo == id){
			loadCeco(vc.sociedad, vc.grupo);
			campoId = vc.campo;
			campoGlobal = vc.campo;
		}
	})
	var sectorAdd = "<option value=''>Selecciones</option>";
	var auxArra = [];
	var varArrAux = [];
	var secArr = [];
	selCuartelFilter = "<option value='0'>Todos</option>";
	selCuartelFilter_SG = "<option value=''>Selecciones</option>";
	selSectorFilter = "<option value='0'>Todos</option>";
	selEspecieFilter = "<option value='0'>Todos</option>";
	selVariedadFilterGlobal = "<option value='0'>Todos</option>";
	$.each(CUARTEL, function(k,v){
		if(campoId == v.campo){
			if(v.georeferencia == ""){
				selCuartelFilter_SG += "<option value='"+v.codigo+"'>"+v.nombre+"</option>";
			}else{
				selCuartelFilter += "<option value='"+v.codigo+"'>"+v.nombre+"</option>";
			}
			$.each(SESION.variedad, function(ka,va){
				if(v.variedad == va.codigo && varArrAux.indexOf(va.codigo) == -1){
					varArrAux.push(va.codigo);
					selVariedadFilterGlobal += "<option value='"+va.codigo+"'>"+va.variedad+"</option>";
				}
			});
			$.each(SESION.especie, function(kb,vb){
				if(v.especie == vb.codigo && auxArra.indexOf(vb.codigo) == -1){
					auxArra.push(vb.codigo);
					selEspecieFilter += "<option value='"+vb.codigo+"'>"+vb.especie+"</option>";
				}
			});
			$.each(SESION.sector, function(kc,vc){
				if(v.sector == vc.sector && secArr.indexOf(vc.sector) == -1){
					secArr.push(vc.sector);
					selSectorFilter += "<option value='"+vc.sector+"'>"+vc.descripcion+"</option>";
					sectorAdd += "<option value="+vc.sector+">"+vc.descripcion+"</option>";
				}
			});
		}
	})
	$("#sector").html(sectorAdd);
	$("#selSectorFilter").html(selSectorFilter);
	$("#especie").html(loadEspecie(campoId));
	$("#selEspecieFilter").html(selEspecieFilter);
	$("#selVariedadFilter").html(selVariedadFilterGlobal);
	$("#selCuartelFilter").html(selCuartelFilter);
	$("#selCuartelFilter_SG").html(selCuartelFilter_SG);
	if(!id){
		$("#historial").hide();
	}
	if(drawCord != null){
		drawCord.setMap(null);
	}
	if(infowindow !=null){
		infowindow.close(map);
	}
	$.getJSON("/simpleWeb/json/AGRO/GETALLCAMPO/"+id, function( data ){
		if(data.length == 0){
			formatMapa();
		}
		CAMPOSELECTED = data;
		filtrarCuartel(data);
	})
}
function sumDistancias(input){
	var ancho = $("#distancia_hancho").val().replace(',','.');
	
	var largo = $("#distancia_largo").val().replace(',','.');
	if(largo > ancho){
		var a = alerta("El ancho no puede ser menor al largo");
		$(a.aceptar).click(function(){
			$("#distancia_largo").val("");
		})
		return;
	}
	var plantasHas = $("#plantas_has").val();
	var plantasTotales = $("#plantas").val();
	if(largo == ""){largo = 0}
	if(ancho == ""){ancho = 0}
	var plantas_has = (10000*1)/(ancho * largo);
	if(plantas_has != Infinity && plantas_has != NaN){
		var plantas = parseFloat(plantas_has) * $("#superficie").val().replace(',','.');
		plantas = parseInt(plantas);
		plantas = formatNumber(plantas);
		$("#plantas").val(plantas);
		plantas_has = plantas_has+"";
		$("#plantas_has").val(formatNumber(parseInt(plantas_has)));
	}
}
function calcularPlantas(value){
	var has = $("#superficie").val().replace(',','.');
	var ancho = $("#distancia_hancho").val();
	var largo = $("#distancia_largo").val();
	plantas_has = has/value;
	plantas_has = plantas_has.toFixed(2);
	//$("#plantas_has").val(plantas_has);
}
function filtrarCuartel(data){
	var idCuartel = $("#selCoordenadas").val();
	Dibujo = [];
	for(var i = 0; i < data.length; i++){
		Info.push({info:null});
		Dibujo.push({draw:'',marker:'',codigo:0})
	}
	var auxI = 0;
	var zommArray = [];
	var NOGeo = 0;
	var dataArray = [];
	var idCuartel;
	var campoGeoreferencia;
	$.each(data, function(k,v){
		if(v.georeferencia != "" && v.georeferencia != null){
			dataArray.push(v)
		}
	})
	$.each(SESION.campo, function(kc,vc){
		if(idCuartel == vc.codigo){
			campoGeoreferencia = vc.georeferencia;
		}
	})
	if(campoGeoreferencia){
		campoGeoreferencia = campoGeoreferencia.split(",");
		campoGeoreferencia[0] = campoGeoreferencia[0].replace("(", "");
		campoGeoreferencia[1] = campoGeoreferencia[1].replace(")", "");
		centro = {lat: campoGeoreferencia[0]*1, lng: campoGeoreferencia[1]*1};
	}
	$.each(dataArray, function(k,v){
		Info[auxI].info = new google.maps.InfoWindow({
			content: 
			'Campo: <strong>'+v.campo+'</strong>'
			+'<br>Nombre: <strong>'+v.nombre+'</strong>'
			+'<br>Ceco: <strong>'+v.ceco+'</strong>'
			+'<br>Año Plantacion: <strong>'+v.ano_plantacion+'</strong>'
			+'<br>Superficie: <strong>'+v.superficie+'</strong>'
			+'<br>Plantas Totales: <strong>'+v.plantas+'</strong>'
			
		});
		var cordDatos = (v.georeferencia);
		var res = cordDatos.split("),(");
		var listaCorrds=[];
		for(var i = 0; i < res.length; i++){
			var row = res[i].split("(").join("").split(")").join("").split(" ").join("").split(",");
			listaCorrds.push({
				lat: row[0]*1,
				lng: row[1]*1
			});
		}
		rectanglesArr = listaCorrds;
		zommArray.push(listaCorrds);
		Dibujo[auxI].draw = new google.maps.Polygon({
			paths: listaCorrds,
			fillOpacity: .3,
			strokeWeight: 1.5,
			editable: false
		});
		Dibujo[auxI].codigo = v.codigo;
		var latSum = 0;
		var lngSum = 0;
		$.each(listaCorrds, function(k, v){
			latSum = latSum + v.lat;
			lngSum = lngSum + v.lng;
		});
		latSum = latSum / listaCorrds.length;
		lngSum = lngSum / listaCorrds.length;
		var centerMarker = {lat: latSum,lng: lngSum};
		Dibujo[auxI].marker = new google.maps.Marker({
			position: centerMarker,
			visible: false,
			map: map
		})
		drawingManager.setMap(map);
		auxI++;
	});
	var latZoom = 0;
	var lngZoom = 0;
	var contZoom = 0;
	$.each(zommArray, function(key, value){
		$.each(value, function(k,v){
			latZoom = latZoom + v.lat;
			lngZoom = lngZoom + v.lng;
			contZoom++;
		})
	})
	latZoom = latZoom / contZoom;
	lngZoom = lngZoom / contZoom;
	if(!campoGeoreferencia){
		var centro = {lat: latZoom, lng: lngZoom};
	}
	var rad=2000;
	if(dataArray.length == 0 && !campoGeoreferencia){
		formatMapa();
		return;
	}
	campoRaius = new google.maps.Circle({
		center: new google.maps.LatLng(centro.lat, centro.lng),
		radius: rad,
		strokeColor: "#0A0A0A",
		fillOpacity: .3,
		strokeWeight: 1.5,
		visible: false,
		fillColor: "#0A0A0A",
		fillOpacity: 0.35,
		map: map
	});
	map = new google.maps.Map(document.getElementById('mapa'),{
		center: centro,
		zoom: 15,
		mapTypeId: 'satellite'
	});
	campoRaius.setMap(map);
	$.each(Dibujo,function(k,v){
		if(v.codigo != 0){
			google.maps.event.addListener(v.draw, 'click', function(){
				var coordenada = (v.draw.getPath().getArray().toString());
				$("#lnglat").html(v.marker.position.lat()+","+v.marker.position.lng());
				if(selectedShape){
					selectedShape.set('fillColor', "#000000");
				}
				$("#delete").show();
				$("#editar").show();
				$("#excel_app").show();
				if(infowindow != null){
					infowindow.close(map,v.marker);
				}
				infowindow = Info[k].info;
				infowindow.open(map,v.marker);
				selectedShape = v.draw;
				setSelection(v.draw);
				selectedShape.set('fillColor', "#0004FF");
			})
			google.maps.event.addListener(map, 'click', function(){
				$("#delete").hide();
				$("#editar").hide();
				infowindow.close(map,v.marker);
			})	
			Dibujo[k].marker.setMap(map);
			Dibujo[k].draw.setMap(map);
			drawingManager.setMap(map);
		}
	})
	drawingManager.setMap(map);
}
function filtroSector(sector){
	var filtradoSector = [];
	var sector = $("#selSectorFilter").val();
	var selCuartelFilter = "<option value='0'>Todos</option>";
	$.each(CAMPOSELECTED, function(key, value){
		if(!sector || sector == 0){
			filtradoSector.push(value);
			if(value.georeferencia == ""){
				selCuartelFilter_SG += "<option value='"+value.codigo+"'>"+value.nombre+"</option>";
			}else{
				selCuartelFilter += "<option value='"+value.codigo+"'>"+value.nombre+"</option>";
			}
		}else{
			for(var i = 0; i < sector.length; i++){
				if(value.sector == sector[i]){
					filtradoSector.push(value);
				}if(value.sector == sector[i]){
					if(value.georeferencia == ""){
						selCuartelFilter_SG += "<option value='"+value.codigo+"'>"+value.nombre+"</option>";
					}else{
						selCuartelFilter += "<option value='"+value.codigo+"'>"+value.nombre+"</option>";
					}
				}
			}
		}
	})
	$("#selCuartelFilter").html(selCuartelFilter);
	filtrarCuartel(filtradoSector);
}
function filtroCuartelSel(cuartel){
	var cuartel = $("#selCuartelFilter").val();
	var filtradoCuartel = [];
	$.each(CAMPOSELECTED, function(key, value){
		if(!cuartel || cuartel == 0){
			filtradoCuartel.push(value);
		}else{
			for(var i = 0; i < cuartel.length; i++){
				if(value.codigo == cuartel[i]){
					filtradoCuartel.push(value);
				}
			}
		}
	})
	filtrarCuartel(filtradoCuartel);
}
function filtroEspecieSel(especie){
	var especie = $("#selEspecieFilter").val();
	var campo = $("#selCoordenadas").val();
	$.each(SESION.campo, function(k,v){
		if(campo == v.codigo){
			campo = v.campo;
		}
	})
	var filtradoEspecie = [];
	var selVariedadFilter = "<option value='0'>Todos</option>";
	var selCuartelFilter = "<option value='0'>Todos</option>";
	var selCuartelFilter_SG = "<option value=''>Seleccionar</option>";
	$.each(CAMPOSELECTED, function(key, value){
		if(!especie || especie == 0){
			filtradoEspecie.push(value);
		}else{
			for(var i = 0; i < especie.length; i++){
				if(value.especie == especie[i]){
					filtradoEspecie.push(value);
				}
			}
		}
	})
	var c = 0;
	var varArrAux = [];
	$.each(SESION.variedad, function(k,v){
		if(!especie || especie[0] == 0){
			$("#selVariedadFilter").html(selVariedadFilterGlobal);
		}else{
			for(var i = 0; i < especie.length; i++){
				$.each(CUARTEL, function(kc,vc){
					if(vc.variedad == v.codigo && especie[i] == v.especie && campo == vc.campo && varArrAux.indexOf(v.codigo) == -1){
						varArrAux.push(v.codigo);
						c++;
						selVariedadFilter += "<option value='"+v.codigo+"'>"+v.variedad+"</option>";
					}
				})
			}
		}
	})
	if(c != 0){
		$("#selVariedadFilter").html(selVariedadFilter);
	}
	$.each(CUARTEL, function(k,v){
		if(!especie || especie[0] == 0 && campo == v.campo){
			if(v.georeferencia == ""){
				selCuartelFilter_SG += "<option value='"+v.codigo+"'>"+v.nombre+"</option>";
			}else{
				selCuartelFilter += "<option value='"+v.codigo+"'>"+v.nombre+"</option>";
			}
		}else{
			for(var i = 0; i < especie.length; i++){
				if(especie[i] == v.especie && campo == v.campo){
					if(v.georeferencia == ""){
						selCuartelFilter_SG += "<option value='"+v.codigo+"'>"+v.nombre+"</option>";
					}else{
						selCuartelFilter += "<option value='"+v.codigo+"'>"+v.nombre+"</option>";
					}
				}
			}
		}
	})
	$("#selCuartelFilter_SG").html(selCuartelFilter_SG);
	$("#selCuartelFilter").html(selCuartelFilter);
	filtrarCuartel(filtradoEspecie);
}
function filtroVariedadSel(vari){
	var filtradoVariedad = [];
	var variedad = $("#selVariedadFilter").val();
	var campo = $("#selCoordenadas").val();
	$.each(SESION.campo, function(k,v){
		if(campo == v.codigo){
			campo = v.campo;
		}
	})
	var selVariedadFilter = "<option value='0'>Todos</option>";
	var selCuartelFilter = "<option value='0'>Todos</option>";
	var selCuartelFilter_SG = "<option value=''>Seleccionar</option>";
	$.each(CAMPOSELECTED, function(key, value){
		if(!variedad || variedad == 0){
			filtradoVariedad.push(value);
		}else{
			for(var i = 0; i < variedad.length; i++){
				if(value.variedad == variedad[i]){
					filtradoVariedad.push(value);
				}
			}
		}
	})
	$.each(CUARTEL, function(k,v){
		if(!variedad || variedad == 0 && campo == v.campo){
			if(v.georeferencia == ""){
				selCuartelFilter_SG += "<option value='"+v.codigo+"'>"+v.nombre+"</option>";
			}else{
				selCuartelFilter += "<option value='"+v.codigo+"'>"+v.nombre+"</option>";
			}
		}else{
			for(var i = 0; i < variedad.length; i++){
				if(variedad[i] == v.variedad && campo == v.campo){
					if(v.georeferencia == ""){
						selCuartelFilter_SG += "<option value='"+v.codigo+"'>"+v.nombre+"</option>";
					}else{
						selCuartelFilter += "<option value='"+v.codigo+"'>"+v.nombre+"</option>";
					}
				}
			}
		}
	})
	$("#selCuartelFilter_SG").html(selCuartelFilter_SG);
	$("#selCuartelFilter").html(selCuartelFilter);
	filtrarCuartel(filtradoVariedad);
}
function selSectorFilter(id){
	$.getJSON("/simpleWeb/json/AGRO/GET_CUARTEL_SECTOR/"+id, function( data ){
		var selCuartelFilter = "<option value=''>Seleccionar</option>"
		$.each(data, function(k,v){
			selCuartelFilter += "<option value='"+v.codigo+"'>"+v.nombre+"</option>"
		})
		$("#selCuartelFilter").html(selCuartelFilter);
	})
}
var campoGlobal;
function selectEscpecie(){
	console.log(campo_variedad)
	$('#varLoading').show();
	var VarOp = [];
	var arrPrd = [];
	var especie = $('#especie').val();
	var arrayVar = [];
	$.each(campo_variedad, function(kb,vb){
		if(vb.codigo_campo == campoGlobal){
			$.each(SESION.variedad,function(key,value){
				if(value.especie == especie && value.codigo == vb.codigo){
					VarOp.push({DESCRIPTION:value.variedad,VALUE_CHAR:value.codigo})
				}
			})
		}
	});
	
	
	
	var aux = "<option value=''>Seleccionar</option>";
	var cont = 0;
	$.each(VarOp,function(k,v){
		if(arrPrd.indexOf(v.DESCRIPTION) == -1){
			aux +=  "<option value='"+v.VALUE_CHAR+"'>"+v.DESCRIPTION+"</option>";
			arrPrd.push(v.DESCRIPTION)
			cont++;
		}
	})
	if(cont==0){
		var aux = "<option value=''>Seleccione</option>";
		aux += "<option value='Sin Variedad'>Sin Variedad</option>";
	}
//	$("#variedad").prop("disabled", false);
	$('#varLoading').hide();
	$('#variedad').html(aux);
	loadFormacion(especie);
}
function updateMap(){
	var val = document.getElementsByName("map");
	if(!$("#sector").val()){
		alerta("No ha seleccionado Sector");
		return;
	}else if(!$("#estado").val()){
		alerta("No ha Ingresado estado");
		return;
	}else if(!$("#ceco").val() && $("#estado").val()*1 == 1){
		alerta("No ha seleccionado un Centro de Costo");
		return;
	}else if(!$("#ordenco").val() && $("#estado").val()*1 == 2){
		alerta("No ha seleccionado una Orden de Inversión");
		return;
	}else if(!$("#especie").val()){
		alerta("No ha seleccionado Especie ni Variedad");
		return;
	}else if(!$("#variedad").val() && $("#variedad").val() != "Sin Variedad"){
		alerta("No ha seleccionado Variedad");
		return;
	}else if(!$("#ano_plantacion").val()){
		alerta("No ha Ingresado un año de plantacion");
		return;
	}else if(!$("#alias").val() && rtrnValCeco($("#ordenco").val())){
		alerta("Debe ingresar un codigo Identificador para el Cuartel");
		return;
	}else if(!$("#superficie").val() && rtrnValCeco($("#ordenco").val())){
		alerta("No ha Ingresado una superficie");
		return;
	}else if(!$("#plantas").val() && rtrnValCeco($("#ordenco").val())){
		alerta("No ha Ingresado plantas totales");
		return;
	}
	if(add_geo){
		if(!$("#coordenadas").val()){
			//alerta("No ha ingresado Georeferecia");
			//return;
			//var c = confirmar.confirm("No se han registrado nuevas coordenadas, desea continuar sin agregar georreferencia");
			//$(c.cancelar).click(function(){
				//loading.show();
				//saveFinal();
				//return;
			//});
		}
	}
	var estado = $("#estado").val()*1;
	var ceco = "";
	var ordenco = "";
	var nombre = "";
	var codigo_cuartel = $("#alias").val();
	if(estado == 2 && !rtrnValCeco($("#ordenco").val())){
		ceco = "";
		ordenco = $("#ordenco").val();
		nombre = $("#ordenco option:selected").text();
	}else if(estado == 2 && rtrnValCeco($("#ordenco").val())){
		ceco =  $("#ceco").val();
		nombre = $("#ordenco option:selected").text();
		ordenco = $("#ordenco").val();
	}else{
		ceco =  $("#ceco").val();
		nombre = $("#ceco option:selected").text();
		ordenco = $("#ordenco").val();
		if($("#ceco").val()*1 == 0){
			ceco = "";
			nombre = "";
		}
	}
	console.log(nombre)
	var row = {};
	row.codigo=cuartelS.codigo;
	row.codigo_cuartel = codigo_cuartel;
	row.nombre = nombre;
	row.sector = $("#sector").val();
	row.variedad = $("#variedad").val();
	row.patron = $("#patron").val();
	row.ano_plantacion = $("#ano_plantacion").val();
	row.superficie = $("#superficie").val().replace(',','.');
	row.plantas = parseInt($("#plantas").val().replace('.',''));
	row.distancia_largo = $("#distancia_largo").val().replace(',','.');
	row.distancia_hancho = $("#distancia_hancho").val().replace(',','.');
	row.formacion = $("#formacion").val();
	row.vivero = $("#vivero").val();
	row.tipo_planta = $("#tipo_planta").val();
	row.tipo_control_heladas = $("#tipo_control_heladas").val();
	row.tipo_proteccion = $("#tipo_proteccion").val();
	row.limitante_suelo = $("#limitantes_suelo").val();
	row.polinizante = $("#polinizante").val();
	row.estado = $("#estado").val();
	row.tipo_plantacion = $("#tipo_plantacion").val();
	row.clon = $("#clon").val();
	if(add_geo){
		row.georeferencia = $("#coordenadas").val();
	}else{
		row.georeferencia = cuartelS.georeferencia;
	}
	row.ceco = ceco;
	row.especie = $("#especie").val();
	row.macroco = $("#ordencomacro").val();
	row.ordenco = ordenco;
	$.ajax({
		url : "/simpleWeb/json/AGRO/UPDATE_CUARTEL/",
		type : "PUT",
		data : JSON.stringify(row),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept","application/json");
			xhr.setRequestHeader("Content-Type","application/json");
		},
		success : function(data, textStatus, jqXHR) {
			var arrName = document.getElementsByName('map');
			for(var i = 0; i < arrName.length; i++){
				$(arrName[i]).val("");
			}
			alerta("Se ha actualizado la informacion del Cuartel");
			SESION = getVars();
			CUARTEL = getCuartel();
			selCoordenadas($("#selCoordenadas").val());
		},
		error : function(jqXHR, textStatus, errorThrown) {
			swal({
				  title: "Error!",
				  text: "No se ha podido registrar la infomacion, consulte con el administrador del sistema",
				  type: "error",
				  confirmButtonText: "Aceptar"
			});
		}
	});
};
function modificar(){
	$(".block").each(function(){
		$(this).prop("disabled", false);
	})
}
function saveFinal(){
	if(selectedColor == '#1E90FF'){status = 'Sembrado';
	}else if(selectedColor == '#32CD32'){status = 'Listo para Cosechar';
	}else if(selectedColor == '#FF8C00'){status = 'Seco';
	}else if(selectedColor == '#4B0082'){status = 'Fumigado';
	}else if(selectedColor == '#ff0000'){status = 'Prohibido el acceso';}
	var codigo_cuartel = $("#alias").val();
	var row = {};
	var estado = $("#estado").val()*1;
	var ceco = "";
	var ordenco = "";
	var nombre = "";
	/*var nombre = "";
	$.each(data.COSTCENTERLIST, function(k,v){
		if(v.COSTCENTER == $("#ceco").val()){
			nombre = v.DESCRIPT;
		}
	})*/
	row.codigo=0;
	row.codigo_cuartel = codigo_cuartel;
	row.sector = $("#sector").val();
	row.variedad = $("#variedad").val();
	row.patron = $("#patron").val();
	row.ano_plantacion = $("#ano_plantacion").val();
	row.superficie = $("#superficie").val().replace(',','.');
	row.plantas = parseInt($("#plantas").val().replace('.',''));
	row.distancia_largo = $("#distancia_largo").val().replace(',','.');
	row.distancia_hancho = $("#distancia_hancho").val().replace(',','.');
	row.formacion = $("#formacion").val();
	row.vivero = $("#vivero").val();
	row.tipo_planta = $("#tipo_planta").val();
	row.tipo_control_heladas = $("#tipo_control_heladas").val();
	row.tipo_proteccion = $("#tipo_proteccion").val();
	row.limitante_suelo = $("#limitantes_suelo").val();
	row.polinizante = $("#polinizante").val();
	row.estado = $("#estado").val();
	row.tipo_plantacion = $("#tipo_plantacion").val();
	row.clon = $("#clon").val();
	row.georeferencia = $("#coordenadas").val();
	row.especie = $("#especie").val();
	row.macroco = $("#ordencomacro").val();
	row.ceco =  $("#ceco").val();
	row.ordenco = $("#ordenco").val();
	if(estado == 2){
		row.nombre = "";
	}else{
		row.nombre = $("#ceco option:selected").text();		
	}
	$.ajax({
		url : "/simpleWeb/json/AGRO/ADDCUARTEL/",
		type : "PUT",
		data : JSON.stringify(row),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept","application/json");
			xhr.setRequestHeader("Content-Type","application/json");
		},
		success : function(data, textStatus, jqXHR) {
			$.ajax({
				url: "/simpleWeb/json/AGRO/GETCUARTEL/",
				type:	"GET",
				dataType: 'json',
				async: false,
				success: function(data){
					loading.hide();
					valExit = false;
					var arrName = document.getElementsByName('map');
					for(var i = 0; i < arrName.length; i++){
						$(arrName[i]).val("");
					}
					creando = false;
					alerta("Informacion Guardada con exito");
					CUARTEL = getCuartel();
					selCoordenadas($("#selCoordenadas").val());
					limpiarInput()
				}
			})
			
			
		},
		error : function(jqXHR, textStatus, errorThrown) {
			swal({
				  title: "Error!",
				  text: "No se ha podido registrar la infomacion, consulte con el administrador del sistema",
				  type: "error",
				  confirmButtonText: "Aceptar"
			});
		}
	});
}

function limpiarInput(){
	$('#sector').val('').trigger('change');
	$('#variedad').val('').trigger('change');
	$("#patron").val('');
	$("#ano_plantacion").val('');
	$("#superficie").val('');
	$("#plantas").val('');
	$("#distancia_largo").val('');
	$("#distancia_hancho").val('');
	$("#formacion").val('').trigger('change');
	$("#vivero").val('');
	$("#tipo_planta").val('').trigger('change');
	$("#tipo_control_heladas").val('').trigger('change');
	$("#tipo_proteccion").val('').trigger('change');
	$("#limitantes_suelo").val('').trigger('change');
	$("#polinizante").val('');
	$("#estado").val('').trigger('change');
	$("#tipo_plantacion").val('').trigger('change');
	$("#clon").val('');
	$("#coordenadas").val('');
	$("#especie").val('').trigger('change');
	$("#ceco").val('').trigger('change');
	$("#ordenco").val('').trigger('change');
}
//OPCIONES MAPA
function selectCheck(type){
	if(type.checked == true){
		for(var i = 0; i < incidenciaMark.length; i++){
			incidenciaMark[i].setVisible(true);
		}
	}else{
		for(var i = 0; i < incidenciaMark.length; i++){
			incidenciaMark[i].setVisible(false);
		}
	}
}
function loadCuartel(){
	var selCuartelFilter = "<option value='0'>Todos</option>"
	$.each(CUARTEL, function(k,v){
		selCuartelFilter += "<option value='"+v.codigo+"'>"+v.nombre+"</option>"
	})
	$("#selCuartelFilter").html(selCuartelFilter);
}
function viewRiego(check){
	var riego = document.getElementsByName("riego");
	if(check.checked){
		for(var i = 0; i < riego.length; i++){
			riego[i].checked = check.checked;
		}
	}else{
		for(var i = 0; i < riego.length; i++){
			riego[i].checked = check.unchecked;
			
		}
	}
}
function selectALL(all){
	var check = document.getElementsByName("check");
	if(all.checked == true){
		for(var x = 0; x < check.length; x++){
			check[x].checked = all.checked;
		}
	}else{
		for(var x = 0; x < check.length; x++){
			check[x].checked = all.unchecked;
		}
	}
}
var valExit = false;
function addCuartel(){
	$(".block").each(function(){
		$(this).prop("disabled", false);
	})
	drawingManager.setOptions({
		drawingControl: true
	});
	if(selectedShape){
		selectedShape.set('fillColor', "#000000");
		clearSelection();
	}
	$.each(Dibujo, function(kd,vd){
		if(vd.draw != ""){
			vd.draw.setOptions({
				clickable: false,
				fillColor: "#000000"
			});
		}
	})
	if(infowindow != null){
		infowindow.close();
	}
	var camp = $("#selCoordenadas").val();
	if(!camp){
		alerta("No ha seleccionado un Campo");
		$("#selCoordenadas").focus();
		return;
	}
	$(".form-add").each(function(){
		$(this).val("");
	})
	opcion = "Agregar";
	valExit = true;
	$("#addCuartel").show();
	$("#save").show();
	$("#modificar").hide();
	$("#update").hide();
	$("#ceco").prop("disabled", false);
	$(".limp").val("");
	$(".limps").val("");
    $("html, body").animate({
    	scrollTop: $('#addCuartel').offset().top 
    }, 1000);
}
$("#marcar").click(function(){
	navigator.geolocation.getCurrentPosition(function(position){
		var pos = {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		}
		var marker = new google.maps.Marker({
			icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
			position: pos,
			map: map,
			visible: true
		});
	})
})
function valNombre(input){
	var campo = $("#selCoordenadas").val();
	$.each(SESION.campo, function(k,v){
		if(campo == v.codigo){
			campo = v.campo;
		}
	})
	var especie = $("#especie").val();
	var variedad = $("#variedad").val();
	$.each(CUARTEL, function(k,v){
		if(input.value == v.nombre && campo == v.campo && especie == v.especie && variedad == v.variedad && opcion == "Agregar"){
			$("#valNombre").addClass('has-error');
			return false;
		}else{
			$("#valNombre").removeClass('has-error');
			return;
		}
	})
}
function errorNombre(input){
	var campo = $("#selCoordenadas").val();
	$.each(SESION.campo, function(k,v){
		if(campo == v.codigo){
			campo = v.campo;
		}
	})
	var especie = $("#especie").val();
	var variedad = $("#variedad").val();
	$.each(CUARTEL, function(k,v){
		if(input.value == v.nombre && campo == v.campo && especie == v.especie && variedad == v.variedad && opcion == "Agregar"){
			var a = alerta("Este nombre ya se ha registrado anteriormente");
			$(a.aceptar).click(function(){
				$("#nameCuartel").focus();
			})
			return false;
		}
	})
}
function getKilometros(lat1,lon1,lat2,lon2){
	rad = function(x) {return x*Math.PI/180;}
	var R = 6378.137; //Radio de la tierra en km
	var dLat = rad( lat2 - lat1 );
	var dLong = rad( lon2 - lon1 );
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1));
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c;
	return d; //Retorna tres decimales
}
var add_geo = false;

$("#plantas").change(function(){
	$(this).val(formatNumber(parseInt($(this).val())));
});

function addGeoreferencia(){
	if(!$("#selCuartelFilter_SG").val()){
		alerta("No ha seleccionado Cuartel sin georreferencia");
		return;
	}else{
		opcion = "Editar";
		$("#addCuartel").show();
		var cuartel = $("#selCuartelFilter_SG").val();
		$.each(Dibujo, function(kd,vd){
			if(vd.draw != ""){
				vd.draw.setOptions({
					clickable: false,
					fillColor: "#000000"
				});
			}
		})
		$("#editar").hide();
		$("#delete").hide();
		$.each(CUARTEL, function(k,v){
			if(v.codigo == cuartel){
				console.log(v)
				var campo = $("#selCoordenadas").val();
				$.each(SESION.campo, function(k,v){
					if(campo == v.codigo){
						campo = v.campo;
					}
				})
				$("#sector").html(loadSector(campo));
//				$("#especie").html(loadEspecie(campo));
				valExit = true;
				CECO = CECO2;
				CECO += "<option value='0'>Ninguno</option>";
				$.each(CECOARR.COSTCENTERLIST, function(kc,vc){
					if(v.ceco == vc.COSTCENTER){
						CECO += "<option value="+vc.COSTCENTER+">"+vc.DESCRIPT+"</option>";
					}
				})
				$("#ceco").html(CECO);
				cuartelS = v;
				var ancho = v.distancia_hancho;
				var largo = v.distancia_largo;
				if(largo == ""){largo = 0}
				if(ancho == ""){ancho = 0}
				var plantas_has = (10000*1)/(ancho * largo);
				if(plantas_has != Infinity){
					plantas_has = plantas_has+"";
					$("#plantas_has").val(formatNumber(parseInt(plantas_has)));
				}
				$("#save").hide();
				$("#update").show();
				$("#modificar").show();
				$("#plantas_has").val();
				$("#nameCuartel").val(v.nombre);
				$("#sector").html(loadSector(campo));
				$("#sector").val(v.sector);
				$("#estado").val(v.estado).trigger('change');
				$("#ordencomacro").val(v.macroco).trigger("change");
				$("#ordenco").val(v.ordenco).trigger("change");
				$("#ceco").val(v.ceco).trigger("change");
				$("#especie").html(loadEspecie(campo));
				$("#especie").val(v.especie).trigger("change");
				$("#variedad").val(v.variedad).trigger("change");
				$("#patron").val(v.patron);
				$("#alias").val(v.codigo_cuartel);
				$("#ano_plantacion").val(v.ano_plantacion);
				var superficie = v.superficie+'';
				$("#superficie").val(superficie.replace('.',','));
				$("#plantas").val(formatNumber(v.plantas));
				var distancia_hancho = v.distancia_hancho+'';
				$("#distancia_hancho").val(distancia_hancho.replace('.',','));
				var distancia_largo = v.distancia_largo+'';
				$("#distancia_largo").val(distancia_largo.replace('.',','));
				loadFormacion(v.especie);
				$("#formacion").val(v.formacion).trigger('change');
				$("#vivero").val(v.vivero);
				$("#tipo_planta").val(v.tipo_planta).trigger('change');
				$("#tipo_control_heladas").val(v.tipo_control_heladas).trigger('change');
				$("#tipo_proteccion").val(v.tipo_proteccion).trigger('change');
				$("#limitantes_suelo").val(v.limitante_suelo).trigger('change');
				$("#polinizante").val(v.polinizante);
				$("#tipo_plantacion").val(v.tipo_plantacion).trigger('change');
				$("#clon").val(v.clon);
				$("#addCuartel").show();
				add_geo = true;
				drawingManager.setOptions({
					drawingControl: true
				});
			}
		})
	}
}
function cancelAdd_Geo(){
	$("#addGeoreferencia").show();
	$("#updGeoreferencia").hide();
	cancelar();
}
function updGeoreferencia(){
	if(add_geo && !drawCord){
		alerta("No se ha 'Dibujado' nigun Cuartel en el Mapa");
		return;
	}else if(add_geo && drawCord){
		if(infowindow != null){
			infowindow.close();
		}
		var cordPolygon = $("#coordenadas").val();
		var cuartel = $("#selCuartelFilter_SG").val();
		var row = {};
		row.codigo = cuartel;
		row.codigo_cuartel = "";
		row.nombre = "";
		row.sector = "";
		row.variedad = "";
		row.patron = "";
		row.ano_plantacion = "";
		row.superficie = "";
		row.plantas = 0;
		row.distancia_largo = 0;
		row.distancia_hancho = 0;
		row.formacion = "";
		row.vivero = "";
		row.tipo_planta = "";
		row.tipo_control_heladas = "";
		row.tipo_proteccion = "";
		row.limitante_suelo = "";
		row.polinizante = "";
		row.estado = 0;
		row.tipo_plantacion = "";
		row.clon = "";
		row.georeferencia = cordPolygon;
		row.ceco = "";
		row.especie = "";
		$.ajax({
			url : "/simpleWeb/json/AGRO/UPDATE_GEOREFERENCIA/",
			type : "PUT",
			data : JSON.stringify(row),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept","application/json");
				xhr.setRequestHeader("Content-Type","application/json");
			},
			success : function(data, textStatus, jqXHR) {
				selCoordenadas($("#selCoordenadas").val());
				$("#addGeoreferencia").show();
				$("#updGeoreferencia").hide();
				$("#selCuartelFilter_SG").val("");
				alerta("Se ha actualizado la informacion del Cuartel");
			},
			error : function(jqXHR, textStatus, errorThrown) {
				swal({
					  title: "Error!",
					  text: "No se ha podido registrar la infomacion, consulte con el administrador del sistema",
					  type: "error",
					  confirmButtonText: "Aceptar"
				});
			}
		});
	}
}
function cambioEstado(input){
	var campo = $("#selCoordenadas").val();
	$.each(SESION.campo, function(k,v){
		if(campo == v.codigo){
			campo = v.campo;
		}
	})
	if(input.value*1 == 2){
		$("#divOrdenCoMacro").show();
		$("#divOrdenCo").show();
		$("#divCeco").hide();
		$("#ceco").removeClass("required");
		$("#ceco").val("").trigger("change");
		$("#ordenco").addClass("required");
		$("#ordencomacro").addClass("required");
		loadMacros();
	}else{
		$("#divOrdenCoMacro").hide();
		$("#divOrdenCo").hide();
		$("#divCeco").show();
		//$("#ceco").addClass("required");
		$("#ordenco").removeClass("required");
		$("#ordenco").val("");
		$("#ordencomacro").removeClass("required");
		$("#especie").html(loadEspecie(campo));
		$("#variedad").html("");
	}
	$("#cod_ceco").val('');
}
function loadMacros(){
	var gcc = "";
	$.each(SESION.campo, function(k,v){
		if(v.codigo == $("#selCoordenadas").val()){
			gcc = v.grupo_co;
		}
	})
	var arrGcc = gcc.split(";");
	var macros = "<option value=''></option>";
	$.each(arrGcc, function (k,v){
		$("#ordenco").html(macros);
		console.log(IPSERVERSAP+ "JSON_BAPI_INTERNALORDRGRP_GETDETAIL.aspx?GRUPO="+v)
		$.ajax({
			url: IPSERVERSAP+ "JSON_BAPI_INTERNALORDRGRP_GETDETAIL.aspx?GRUPO="+v,
			type:	"GET",
			dataType: 'json',
			async: false,
			success: function(data){
				console.log(data)
				$.each(data.HIERARCHYNODES, function(k,v){
					var e = v.GROUPNAME;
					if(e[e.length-1]*1 == "E" && e[e.length-2]*1 == "G"){
						macros += "<option value='"+v.GROUPNAME+"'>"+v.DESCRIPT+"</option>";
					}
					if((e[e.length-1]*1 == 1 || e[e.length-1]*1 == 2) && e[e.length-2]*1 == 0){
						macros += "<option value='"+v.GROUPNAME+"'>"+v.DESCRIPT+"</option>";
					}
				})
			}
		})
	});
	$("#ordencomacro").html(macros);
}
function selectMacro(input){
	var ordenco = "<option value=''></option>"; 
	var auxArr = [];
	$.each(MACRO.ORDER_LIST, function(k,v){
		if(v.ORDER.indexOf(input.value) != -1 && auxArr.indexOf(v.OBJECT_NO) == -1){
			auxArr.push(v.OBJECT_NO);
			ordenco += "<option value="+v.ORDER+">"+v.ORDER_NAME+"</option>";
		}
	})
	$("#ordenco").html(ordenco);
}
function selectOrdenCo(input){
	var campo = $("#selCoordenadas").val();
	$.each(SESION.campo, function(k,v){
		if(campo == v.codigo){
			campo = v.campo;
		}
	})
	if(rtrnValCeco(input.value)){
		$("#divCeco").show();
		//$("#ceco").addClass("required");
		$("#ceco").val("").trigger("change");
		$("#especie").addClass("required");
		$("#variedad").addClass("required");
		$("#especie").html(loadEspecie(campo));
		$("#variedad").html("");
		$("#ano_plantacion").val("");
		$("#ano_plantacion").attr("disabled", false);
		$("#alias").attr("disabled", false);
		$("#patron").attr("disabled", false);
		if(opcion == "Editar"){
			$("#ceco").attr("disabled", false);
		}
	}else{
		$("#divCeco").hide();
		$("#ceco").removeClass("required");
		$("#cod_ceco").val(input.value);
		$("#especie").removeClass("required");
		$("#variedad").removeClass("required");
		var option = "<option value='0'>No Aplica</option>";
		$("#ano_plantacion").val("0");
		$("#ano_plantacion").attr("disabled", true);
		//$("#alias").attr("disabled", true);
		$("#patron").attr("disabled", true);
		$("#especie").html(option);
		$("#variedad").html(option);
	}
}
function rtrnValCeco(e){
	var r = false;
	if(e){
		if(e[e.length-1]*1 == 6 && e[e.length-2]*1 == 1 && e != ""){
			r = true;
		}
	}
	
	return r;
}
function saveMap(){
	if(!$("#sector").val()){
		alerta("No ha seleccionado Sector");
		return;
	}else if(!$("#estado").val()){
		alerta("No ha Ingresado estado");
		return;
	}else if(!$("#ceco").val() && $("#ceco")[0].className.indexOf("required") != -1){
		alerta("No ha seleccionado un Centro de Costo");
		return;
	}else if(!$("#ordenco").val() && $("#ordenco")[0].className.indexOf("required") != -1){
		alerta("No ha seleccionado una Orden de Inversión");
		return;
	}else if(!$("#especie").val()){
		alerta("No ha seleccionado Especie ni Variedad");
		return;
	}else if(!$("#variedad").val() && $("#variedad").val() != "Sin Variedad"){
		alerta("No ha seleccionado Variedad");
		return;
	}else if(!$("#ano_plantacion").val()){
		alerta("No ha Ingresado un año de plantacion");
		return;
	}else if(!$("#alias").val() && rtrnValCeco($("#ordenco").val())){
		alerta("Debe ingresar un codigo Identificador para el Cuartel");
		return;
	}else if(!$("#superficie").val() && rtrnValCeco($("#ordenco").val())){
		alerta("No ha Ingresado una superficie");
		return;
	}else if(!$("#plantas").val() && rtrnValCeco($("#ordenco").val())){
		alerta("No ha Ingresado plantas totales");
		return;
	}
	if(!drawCord){
		var c = confirmar.confirm("No se han registrado nuevas coordenadas ¿Desea continuar sin agregar georreferencia?");
		$(c.aceptar).click(function(){
			loading.show();
			saveFinal();
			return;
		});
	}else if(drawCord){
		loading.show();
		saveFinal();
	}
};
window.onbeforeunload = function(e){
	var i = 0;
	var map = $(".map");
	map.each(function(){
		if($(this).val()){
			i = 1;
		}
	})
	if (valExit && i == 1) {
		return "Todavía no has guardado los datos. Si abandonas la página, se perderán por siempre jamás.";
	}
};
function justNumbers(e){
	var keynum = window.event ? window.event.keyCode : e.which;
	if ((keynum == 8) || (keynum == 44))
	return true;
	 
	return /\d/.test(String.fromCharCode(keynum));
}
function formatNumber(num) {
    if (!num || num == 'NaN') return '-';
    if (num == 'Infinity') return '&#x221e;';
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
        num = num.substring(0, num.length - (4 * i + 3)) + '.' + num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num + ',' + cents);
}