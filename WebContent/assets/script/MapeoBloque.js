var arrayfactores;
$(document).ready(function(){
	cargarCampo();
	cargarFiltros();	
})
var poly;
var rs;
var SECTOR;
var bounds = {
	north: -33.44262,
	south: -33.44264,
	east: -70.87731,
	west: -70.87733
};
var arrayRiegos = "";
var arrayEvaporacion = "";
var valores = getMAP();
var arrAux = [valores];
var arrayCuarteles = [];
var auxCuartel = getCuartel();
var CECO = getCeco();
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
var Info = [];
var Dibujo = [];
var Funcion = [];
var status;
var zoom;
var campo;
var cod_campo;
var cod_sector;
var cod_bloque;
var cod_equipo;
var equipo;
var sector;
var CAMPOSELECTED;
var CUARTEL = getCuartel();
var BLOQUE;
var SESION = getVars();
var creando = false;
//FUNCION DE CARGA SEGUN URL

function cargarFiltros(){
	var auxEspecie = "<option value=''>Seleccione</option>";
	var selEspecieFilter = "<option value='0'>Todos</option>";
	$.each(SESION.especie,function(k,v){
		auxEspecie +=  "<option value='"+v.codigo+"'>"+v.especie+"</option>"; 
		selEspecieFilter +=  "<option value='"+v.codigo+"'>"+v.especie+"</option>"; 
	})
	//var sector = "<option value=''>Seleccione</option>";
	var sector = "";
	$.each(SESION.sector, function(k,v){
		sector += "<option value='"+v.sector+"'>"+v.descripcion+"</option>";
	})
	$("#sector").html(sector);
	$("#selEspecieFilter").html(selEspecieFilter);
	$('#especie').html(auxEspecie);
}
function loadCeco(){
	var ceco = "<option value=''>Seleccione</option>";
	$.each(CECO, function(k,v){
		ceco += "<option value="+v.codigo+">"+v.ceco+"</option>";
	})
	$("#ceco").html(ceco);
}
function cargarCampo(){
	
	$.each( SESION.campo, function( key, val ) {
		campo += "<option value="+val.campo+">"+val.descripcion+"</option>";
	});
	
	$("#filtroCampo").html(campo);
	cod_campo = $("#filtroCampo").val();
	$.getJSON("/simpleWeb/json/AGRO/GETFACTORBYCAMPO/"+cod_campo, function( data ){
		arrayfactores = data;	
	})
	loadInfo();
	porCampo(cod_campo);
	loadEquipo(cod_campo);
}
$("#filtroCampo").change(function(){
	cod_campo = $("#filtroCampo").val();
	$.getJSON("/simpleWeb/json/AGRO/GETFACTORBYCAMPO/"+cod_campo, function( data ){
		arrayfactores = data;	
	})
	loadInfo();
	loadEquipo(cod_campo);
	porCampo(cod_campo);
	$('#filtroBloque').html("");
});
function loadEquipo(cod_campo){
	equipo = "<option value=''>Seleccionar</option>";
	$.ajax({
		url: "/simpleWeb/json/AGRO/GETEQUIPO/"+cod_campo,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function (data) {
			$.each(data, function(k, v) {
				equipo += "<option value="+v.codigo_equipo+">"+v.descripcion+"</option>";
			});
			$('#filtroEquipo').html(equipo);
			cod_equipo = $("#filtroEquipo").val();
			
	    }
	})
}
$("#filtroEquipo").change(function(){
	cod_equipo = $("#filtroEquipo").val();
	porEquipo(cod_equipo);
	loadBloque();
});

function loadBloque(){
	var arraybloques;
	$.ajax({
		url: "/simpleWeb/json/AGRO/GETEQUIPOBYCOD/"+cod_equipo,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function (data) {
				arraybloques = data;
	    }
	})
	var arr = [];
	$.each(arraybloques, function(k,v){
		arr.push(v.codigo_bloque)
	})
	bloque = "<option value=''>Seleccionar</option>";
	$.ajax({
		url: "/simpleWeb/json/AGRO/GETBLOQUES/"+arr,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function (data) {
			$.each(data, function(k, v) {
				bloque += "<option value="+v.codigo+">"+v.nombre+"</option>";	
			});
			$('#filtroBloque').html(bloque);
	    }
	})
}
$("#filtroBloque").change(function(){
	cod_bloque = $("#filtroBloque").val();
	porBloque(cod_campo);
});
function eliminarFiltro(){
	$('#filtroEquipo').html("<option value=''>Seleccionar</option>");
	$('#filtroBloque').html("<option value=''>Seleccionar</option>");
	porCampo(cod_campo);
	loadEquipo(cod_campo);
}

function clearSelection(){
	if(selectedShape) {
		selectedShape.setEditable(false);
		selectedShape = null;
	}
}
//function setSelection(shape) {
//	clearSelection();
//	selectedShape = shape;
//	shape.setEditable(true);
//	selectColor(shape.get('fillColor') || shape.get('strokeColor'))
//}
function deleteSelectedShape() {
	var cod_bloque2 = CAMPOSELECTED.codigo;
	var c = confirmar.confirm("¿Seguro desea eliminar Bloque de riego?");
	$(c.aceptar).click(function(){
		if(selectedShape) {
			$.ajax({
				url:	"/simpleWeb/json/AGRO/DELETEBLOQUE/"+cod_bloque2,
				type:	"GET",
				success: function(){
					alerta("Se ha eliminado el Bloque");
					cargarCampo();
					cargarFiltros();
				},
				error: function(a, b){
					console.log(a);
				}
			});
		}
	});
}
//function cambio_ano(val){
//	if(val.value < 1960 && val.value != ""){
//		alerta("El año no puede ser menor a 1960"),
//		$(val).val("");
//		return;
//	}
//}
var cuartelS;
function editarBloque(){
	if(selectedShape){
		var variedad = "";
		$.each(SESION.variedad, function(k,v){
			if(v.codigo == CAMPOSELECTED.variedad){
				variedad += "<option value='"+v.codigo+"' selected>"+v.variedad+"</option>";
			} else {
				variedad += "<option value='"+v.codigo+"' >"+v.variedad+"</option>";
			}
		})
		var especie = "";
		$.each(SESION.especie, function(kv,v){
			if(v.codigo == CAMPOSELECTED.especie){
				especie += "<option value='"+v.codigo+"' selected>"+v.especie+"</option>";
			} else {
				especie += "<option value='"+v.codigo+"' >"+v.especie+"</option>";
			}
		})
		var tipoRiego = "";


		if(CAMPOSELECTED.tipoRiego=="Goteo"){
			tipoRiego += "<option value='2' selected>Aspersor</option>";
			tipoRiego += "<option value='1' >Goteo</option>";
		}
		if(CAMPOSELECTED.tipoRiego=="Aspersor"){
			tipoRiego += "<option value='1' >Goteo</option>";
			tipoRiego += "<option value='2' selected>Aspersor</option>";
		}
		
		$("#variedad").html(variedad);
		$("#save").hide();
		$("#update").show();
		$("#codigo").val(CAMPOSELECTED.codigo);
		$("#nameCuartel").val(CAMPOSELECTED.nombre);
		$("#sector").val(CAMPOSELECTED.sector);
		$("#especie").html(especie);				
		$("#tipoRiego").html(tipoRiego);
		$("#precipitacion").val(CAMPOSELECTED.precipitacion_nominativa);
		$("#aforo").val(CAMPOSELECTED.aforo);
		$("#reposicion").val(CAMPOSELECTED.reposicion);
		$("#addBloque").show();

	}
}
function loadVariedad(especie){
	var variedad = "<option value=''>Seleccione</option>";
	$.each(SESION.variedad, function(k,v){
		if(v.especie == especie){
			variedad += "<option value='"+v.codigo+"'>"+v.variedad+"</option>";
		}
	})
	return variedad;
}
function cancelar(){
	creando = false;
	drawingManager.setMap(null);
	var variedad = "";
	variedad += "<option value='0'>Seleccionar</option>";
	$.each(SESION.variedad, function(k,v){
		variedad += "<option value='"+v.codigo+"' >"+v.variedad+"</option>";
	})
	var especie = "";
	especie += "<option value='0'>Seleccionar</option>";
	$.each(SESION.especie, function(kv,v){
		especie += "<option value='"+v.codigo+"' >"+v.especie+"</option>";
		
	})
	var tipoRiego = "";
	tipoRiego += "<option value='0'>Seleccionar</option>";
	tipoRiego += "<option value='1' >Goteo</option>";
	tipoRiego += "<option value='2' >Aspersor</option>";
	
	$("#tipoRiego").html(tipoRiego);
	$("#especie").html(especie);
	$("#variedad").html(variedad);
	$("#addBloque").hide();
	$("#precipitacion").val("");
	$("#aforo").val("");
	$("#reposicion").val("");
	$("#nameCuartel").val("");
}
//function selectColor(color) {
//	selectedColor = color;
//	for (var i = 0; i < colors.length; i++) {
//		currColor = colors[i];
//		colorButtons[currColor].style.border = currColor == color ? '2px solid #789' : '2px solid #fff'; 
//	}
//}
function setSelectedShapeColor(color) {
	console.log(color);
    if (selectedShape) {
    	if (selectedShape.type == google.maps.drawing.OverlayType.POLYLINE) {
    		selectedShape.set('strokeColor', color);
    	} else {
    		selectedShape.set('fillColor', color);
    	}
    }
}
//function makeColorButton(color,i) {
//    var button = document.createElement('span');
//    button.className = 'color-button';
//    button.style.backgroundColor = color;
//    google.maps.event.addDomListener(button, 'click', function() {
//    	selectColor(color);
//	    setSelectedShapeColor(color);
//    });
//    if(i == 0){button.title = 'Sembrado'}
//    if(i == 1){button.title = 'Listo para Cosechar'}
//    if(i == 2){button.title = 'Seco'}
//    if(i == 3){button.title = 'Fumigado'}
//    if(i == 4){button.title = 'Prohibido el acceso'}
//    
//    return button;
//}
//function buildColorPalette() {
//    var colorPalette = document.getElementById('color_palette');
//    for (var i = 0; i < colors.length; ++i) {
//    	var currColor = colors[i];
//	    var colorButton = makeColorButton(currColor,i);
//	    colorPalette.appendChild(colorButton);
//	    colorButtons[currColor] = colorButton;
//    }
//    
//    colors[0].titleName = 'Sembrado';
//    selectColor(colors[0]);
//}
//function formatMapa(){
//	google.maps.event.addListener(drawingManager, 'drawingmode_changed', function(event){
//		if(drawingManager.drawingMode == 'polyline'){
//			poly = new google.maps.Polyline({
//		          strokeColor: '#000000',
//		          strokeOpacity: 1.0,
//		          strokeWeight: 3
//		        });
//	        poly.setMap(map);
//	        map.addListener('click', console.log("sdjhfdshfsdhfjsdhjk"));
//			map.addListener('click', addLatLng);
//		}
//	})
//	
//	google.maps.event.addListener(drawingManager, 'polylinecomplete', function(linea){
//		var stringCords = linea.getPath().getArray().toString();
//		var polylineArray = resCords(stringCords);
//		drawCord = linea;
//		//$('#color_palette').show();
//	})
//	var flightPlanCoordinates = [
//        {lat: 37.772, lng: -122.214},
//        {lat: 21.291, lng: -157.821},
//        {lat: -18.142, lng: 178.431},
//      	{lat: -27.467, lng: 153.027}
//    ];
//	var flightPath = new google.maps.Polyline({
//		path: flightPlanCoordinates,
//		geodesic: true,
//		strokeColor: '#FF0000',
//		strokeOpacity: 1.0,
//		strokeWeight: 2
//	});
//
//    flightPath.setMap(map);
//	google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon){
//		drawCord = polygon;
//		//$('#color_palette').show();
//		var getpath = polygon.getPath().getArray();
//		var cordPolygon = (polygon.getPath().getArray().toString());
//		console.log("aquiii:" + cordPolygon);
//		document.getElementById('coordenadas').value=cordPolygon;
//		var res = cordPolygon.split("),(");
//		var listaCorrds = [];
//		for(var i = 0; i < res.length; i++){
//			var row = res[i].split("(").join("").split(")").join("").split(" ").join("").split(",");
//			listaCorrds.push({lat:row[0]*1,lng:row[1]*1});
//		}
//		var arrArea = [];
//		$.each(listaCorrds,function(k,v){
//			arrArea.push(new google.maps.LatLng(v.lat,v.lng));
//		})
//		var area = google.maps.geometry.spherical.computeArea(arrArea);
//		area = area/10000;
//		var ar = parseFloat(area);
//		rs = Math.round(ar*100)/100;
//		//document.getElementById('superficie').value=rs;
//		rectanglesArr = cordPolygon;
//		coordenadasArray = listaCorrds;
//		rectangle1 = JSON.parse(JSON.stringify(listaCorrds));
//		//markerFlowers()
//	})
//	google.maps.event.addListener(drawingManager, 'markercomplete', function(marker){
//		if(!drawCord){
//			alert("No se ha seleccionado ni creado ningunn campo");
//			marker.setMap(null);
//			return;
//		}
//		var cordMarker = marker.getPosition().toString();
//		if(google.maps.geometry.poly.containsLocation(marker.position, drawCord)!=true){
//			alerta("No se encuentra dentro de ningun campo");
//			marker.setMap(null);
//			return;
//		}else{
//			var registrarIncidencia = "";
//			registrarIncidencia += '<div class="col-xs-12 col-md-12 col-lg-12" id="formProductor">';
//			registrarIncidencia += 		'<div class="box-datos-generales" style="width: 100%">';
//			registrarIncidencia += 			'<div><h3>'+dataCampo.valor1+'</h3></div>';
//			registrarIncidencia += 			'<div class="col-xs-0 col-md-4 col-lg-4">';
//			registrarIncidencia += 			'</div>';
//			registrarIncidencia += 			'<div class="col-xs-12 col-md-4 col-lg-4">';
//			registrarIncidencia += 				'<h4>Titulo Incidencia</h4>';
//			registrarIncidencia += 				'<input type="text" class="form-control input-circle ui-autocomplete-input" id="tituloIncidencia">';
//			registrarIncidencia += 			'</div>';
//			registrarIncidencia += 			'<div class="col-xs-0 col-md-4 col-lg-4">';
//			registrarIncidencia += 			'</div>';
//			registrarIncidencia += 			'<div class="col-xs-12 col-md-12 col-lg-12">';
//			registrarIncidencia += 				'<div class="col-xs-12 col-md-4 col-lg-4 portlet light bordered">';
//			registrarIncidencia += 					'<h4>Sector Afectado</h4>';
//			registrarIncidencia += 					'<select class="btn blue btn-outline btn-circle btn-sm" id="sectorAfectadoSelect">';
//			registrarIncidencia += 						'<option value="">Seleccione</option>';
//			registrarIncidencia += 						'<option value="Riego">Riego</option>';
//			registrarIncidencia += 						'<option value="Plantacion">Plantacion</option>';
//			registrarIncidencia += 						'<option value="Cierre">Cierre</option>';
//			registrarIncidencia += 					'</select>';
//			registrarIncidencia += 				'</div>';
//			registrarIncidencia += 				'<div>';
//			registrarIncidencia += 					'<h4>Urgencia</h4>';
//			registrarIncidencia += 					'<label class="radio-inline"><input id="urgencia" onclick="javascript: radioUrgencia(this);" value="Leve" type="radio" name="Urgencia">Leve</label>';
//			registrarIncidencia += 					'<label class="radio-inline"><input id="urgencia" onclick="javascript: radioUrgencia(this);" value="Medio" type="radio" name="Urgencia">Medio</label>';
//			registrarIncidencia += 					'<label class="radio-inline"><input id="urgencia" onclick="javascript: radioUrgencia(this);" value="Alto" type="radio" name="Urgencia">Alto</label>';
//			registrarIncidencia += 				'</div>';
//			registrarIncidencia += 				'<div class="col-xs-12 col-md-4 col-lg-4 portlet light bordered">';
//			registrarIncidencia += 					'<h4>Tipo de Incidencia</h4>';
//			registrarIncidencia += 					'<label class="radio-inline"><input id="urgencia" onclick="javascript: radioTipo_Incidencia(this);" value="Preventiva" type="radio" name="tipo_incidencia">Preventiva</label>';
//			registrarIncidencia += 					'<label class="radio-inline"><input id="urgencia" onclick="javascript: radioTipo_Incidencia(this);" value="Correctiva" type="radio" name="tipo_incidencia">Correctiva</label>';
//			registrarIncidencia += 				'</div>';
//			registrarIncidencia += 			'</div>';
//			registrarIncidencia += 			'<div class="col-xs-12 col-md-12 col-lg-12 portlet light bordered">';
//			registrarIncidencia += 				'<h3>Observaciones</h3>';
//			registrarIncidencia += 				'<textarea maxlength="100" id="observaciones" class="form-control input-circle" style="width:100%"></textarea>';
//			registrarIncidencia += 			'</div>';
//			registrarIncidencia += 		'</div>';
//			registrarIncidencia += 		'<div class="col-sm-12 col-md-12">';
//			registrarIncidencia += 			'<div class="btn btn-circle blue btn-outline" id="registrarIncidencia" >Registrar Incidencia</div>';
//			registrarIncidencia += 			'<div class="btn btn-circle red btn-outline" id="cancelarRegistrarIncidencia">Cancelar</div>';
//			registrarIncidencia += 		'</div>';
//			registrarIncidencia += 	'</div>';
//			popUp("Registrar Incidencia", registrarIncidencia, true, '500px', false);
//			$("#registrarIncidencia").click(function(){
//				if(!$("#tituloIncidencia").val()){
//					alert("No ha ingresado un nombre a la incidencia");
//					return;
//				}else if(!$("#sectorAfectadoSelect").val()){
//					alert("No ha seleccionado un sector afectado");
//					return;
//				}else if(!checkUrgencia){
//					alert("No ha seleccionado un sector afectado");
//					return;
//				}else if(!checkTipo_incidencia){
//					alert("No ha seleccionado un sector afectado");
//					return;
//				}else{
//					var hoy = new Date();
//					hoy = hoy.getFullYear()+"-"+(hoy.getMonth()+1)+"-"+hoy.getDate();
//					var incidencia = {
//						id_campo: dataCampo.idtest,
//						descripcion: $("#tituloIncidencia").val(),
//						coordenadas: cordMarker,
//						sector_afectado: $("#sectorAfectadoSelect").val(),
//						urgencia: checkUrgencia,
//						tipo_incidencia: checkTipo_incidencia,
//						observaciones: $("#observaciones").val(),
//						estado: "Pendiente",
//						fecha: hoy
//					}
//					$.ajax({
//						url : "/simpleWeb/json/map/addIncidencia/",
//						type : "PUT",
//						data : JSON.stringify(incidencia),
//						beforeSend : function(xhr) {
//							xhr.setRequestHeader("Accept","application/json");
//							xhr.setRequestHeader("Content-Type","application/json");
//						},
//						success : function(data, textStatus, jqXHR) {
//							alerta("Incidencia Registrada con exito");
//							swal.closeModal();
//						},
//						error : function(ex) {
//							console.log(ex);
//						}
//					});
//				}
//			});
//			$("#cancelarRegistrarIncidencia").click(function(){
//				swal.closeModal();
//				marker.setMap(null);
//			})
//		}
//	});
//	
//	google.maps.event.addListener(drawingManager, 'circlecomplete', function (circle){
//		cordCircle_Radius = (circle.getRadius().toString());
//		cordCircle_Center = (circle.getCenter().toString());
//	})
//	
//	google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
//		if (e.type != google.maps.drawing.OverlayType.MARKER) {
//	        drawingManager.setDrawingMode(null);
//	        var newShape = e.overlay;
//	        newShape.type = e.type;
//	        google.maps.event.addListener(newShape, 'click', function() {
//	        	//$('#color_palette').show();
//	        	setSelection(newShape);
//	        });
//	        setSelection(newShape);
//        }
//    });
//	
//	google.maps.event.addListener(drawingManager, 'drawingmode_changed', clearSelection);
//    google.maps.event.addListener(map, 'click', function(){
//    	//$('#color_palette').hide();
//    	clearSelection();
//    });
//    google.maps.event.addDomListener(document.getElementById('delete'), 'click', deleteSelectedShape);
//	buildColorPalette();
//	$("#loading").hide();
//}
//function addLatLng(event) {
//    var path = poly.getPath();
//
//    // Because path is an MVCArray, we can simply append a new coordinate
//    // and it will automatically appear.
//    path.push(event.latLng);
//
//    // Add a new marker at the new plotted point on the polyline.
//    var marker = new google.maps.Marker({
//      position: event.latLng,
//      title: '#' + path.getLength(),
//      map: map
//    });
//  }
//function resCords(path){
//	var res = path.split("),(");
//	var listaCorrds = [];
//	for(var i = 0; i < res.length; i++){
//		var row = res[i].split("(").join("").split(")").join("").split(" ").join("").split(",");
//		listaCorrds.push({lat:row[0]*1,lng:row[1]*1});
//	}
//	return listaCorrds;
//}
//function checkAdd(opt){
//	checkIngresar = opt.value;
//}
//function radioUrgencia(check){
//	checkUrgencia = check.value;
//}
//function radioTipo_Incidencia(check){
//	checkTipo_incidencia = check.value;
//}
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
//function app_click(){
//	$("#aplicaciones").addClass("active");
//	$("#labores").removeClass('active');
//	$("#incidencias").removeClass('active');
//	$("#archivos").removeClass('active');
//	
//	$("#app_div").show();
//	$("#works_div").hide();
//	$("#in_div").hide();
//	$("#docs_div").hide();
//};
//function works_click(){
//	$("#aplicaciones").removeClass("active");
//	$("#labores").addClass('active');
//	$("#incidencias").removeClass('active');
//	$("#archivos").removeClass('active');
//	
//	$("#app_div").hide();
//	$("#works_div").show();
//	$("#in_div").hide();
//	$("#docs_div").hide();
//};
//function in_click(){
//	$("#aplicaciones").removeClass("active");
//	$("#labores").removeClass('active');
//	$("#incidencias").addClass('active');
//	$("#archivos").removeClass('active');
//	
//	$("#app_div").hide();
//	$("#works_div").hide();
//	$("#in_div").show();
//	$("#docs_div").hide();
//};
//function docs_click(){
//	$("#aplicaciones").removeClass("active");
//	$("#labores").removeClass('active');
//	$("#incidencias").removeClass('active');
//	$("#archivos").addClass('active');
//	
//	$("#app_div").hide();
//	$("#works_div").hide();
//	$("#in_div").hide();
//	$("#docs_div").show();
//};
//function vari(){
//	var varie = document.getElementsByName("varie");
//	$.each(SESION.variedad, function(k,v){
//		for(var i = 0; i < varie.length; i++){
//			$(varie[i]).val(datosGenerales.rendimiento_general[0].variedad);
//		}
//	})
//}
function initMap(campoGeo){
	if(campoGeo==undefined){
		map = new google.maps.Map(document.getElementById('mapa'),{
			center: {lat: -37.702385846359235, lng: -72.61271889331374},
			zoom: 12,
			mapTypeId: 'satellite'
		});
	}
	else{
		map = new google.maps.Map(document.getElementById('mapa'),{
			center: {lat: campoGeo.split(",")[0]*1, lng: campoGeo.split(",")[1]*1},
			zoom: 12,
			mapTypeId: 'satellite'
		});
	}
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
		

		drawingControl: true,
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
			fillColor: '#FF0000',
			fillOpacity: .1,
			strokeWeight: 1.5,
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
	drawingManager.setMap(map);
//	formatMapa();
}
function porCampo(cod_campo){
	
	var campoGeo;
	$.each(SESION.campo, function(kc, vc){
		if(vc.campo == cod_campo){
			campoGeo = vc.georeferencia;			
		}
	})
	
	$.getJSON("/simpleWeb/json/AGRO/GETBLOQUESBYCAMPO/"+cod_campo, function( data ){
		if(data==""){			
			selCoordenadas(cod_campo);
		}
		else{
			filtrarCuartel(data, campoGeo);
		}
		
	})
	
}
function porEquipo(cod_equipo){
	var campoGeo;
	$.each(SESION.campo, function(kc, vc){
		if(vc.campo == cod_campo){
			campoGeo = vc.georeferencia;			}
	})
	
	//
	var arraybloques;
	$.ajax({
		url: "/simpleWeb/json/AGRO/GETBLOQUESBYEQUIPO/"+cod_campo+"/"+cod_equipo,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function (data) {
				arraybloques = data;
	    }
	})
	var arr = [];
	$.each(arraybloques, function(k,v){
		arr.push(v.codigo_bloque)
	})
	$.ajax({
		url: "/simpleWeb/json/AGRO/GETBLOQUES/"+arr,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function (data) {
			filtrarCuartel(data, campoGeo);
	    }
	})
	//
	
}
function porBloque(cod_campo){
	var campoGeo;
	$.each(SESION.campo, function(kc, vc){
		if(vc.campo == cod_campo){
			campoGeo = vc.georeferencia;			}
	})
	$.getJSON("/simpleWeb/json/AGRO/GETBLOQUES/"+cod_bloque, function( data ){
		filtrarCuartel(data, campoGeo);
	})
}
function selCoordenadas(id){

	cancelar();
	if(id != ""){
		$("#selSectorFilter").attr("disabled", false);
		$("#selCuartelFilter").attr("disabled", false);
		$("#selEspecieFilter").attr("disabled", false);
		$("#selVariedadFilter").attr("disabled", false);
	}else{
		$("#selSectorFilter").attr("disabled", true);
		$("#selCuartelFilter").attr("disabled", true);
		$("#selEspecieFilter").attr("disabled", true);
		$("#selVariedadFilter").attr("disabled", true);
	}
	var cecoId;

	var campoId;

	var campoGeo;
	$.each(SESION.campo, function(kc, vc){
		if(vc.campo == id){
			campoGeo = vc.georeferencia;	
			campoId = vc.campo;
		}
	})

	var selCuartelFilter = "<option value='0'>Todos</option>";
	var selSectorFilter = "<option value='0'>Todos</option>";
	var arraySector = [];
	
	$.each(SESION.sector, function(k,v){
		
		if(v.campo == campoId){
			$.each(BLOQUE, function(ka,va){
				//if(va.sector == v.sector){
					arraySector.push();
					selCuartelFilter += "<option value='"+va.codigo+"'>"+va.nombre+"</option>";
				//}
			})
			if(arraySector.indexOf(v.sector) == -1){
				arraySector.push(v.sector);
				selSectorFilter += "<option value='"+v.sector+"'>"+v.descripcion+"</option>";
			}
			
		}
	})
	$("#sector").html(selSectorFilter);
	$("#selSectorFilter").html(selSectorFilter);
	$("#selCuartelFilter").html(selCuartelFilter);
//	$("#historial").show();
	if(!id){
		$("#historial").hide();
	}
	if(drawCord != null){
		drawCord.setMap(null);
	}
	if(infowindow !=null){
		infowindow.close(map);
	}
	drawingManager.setMap(map);

	//console.log("/simpleWeb/json/AGRO/GETBLOQUES/"+id);
	$.getJSON("/simpleWeb/json/AGRO/GETBLOQUES/"+cod_bloque, function( data ){
		filtrarCuartel(data, campoGeo);
	})
}
//function sumDistancias(input){
//	var ancho = $("#distancia_hancho").val();
//	var largo = $("#distancia_largo").val();
//	var plantas;
//	var plantas_has;
//	if(input.id == "distancia_hancho"){
//		if(ancho != ""){
//			plantas = ancho*1+largo*1;
//			plantas_has = rs/plantas;
////			$("#plantas_has").val(plantas_has);
//			$("#plantas").val(plantas);
//		}
//	}else{
//		if(largo != ""){
//			plantas = ancho*1+largo*1;
//			plantas_has = rs/plantas;
////			$("#plantas_has").val(plantas_has);
//			$("#plantas").val(plantas);
//		}
//	}
//}

function filtrarCuartel(data, campoGeo){
	google.maps.event.addDomListener(document.getElementById('delete'), 'click', deleteSelectedShape);
//	if(data.length == 0){
//		return;
//	}
	var arr = [];
	Dibujo = [];
	for(var i = 0; i < data.length; i++){
		Info.push({info:null});
		Dibujo.push({draw:'',marker:'',codigo:0})
	}
	var auxI = 0;
	var zommArray = [];
	var colorEstado;
	var estado
	
	
	
	
	
	google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon){
		if(creando==true){
			drawCord.setMap(null);
		}
		
		
		///
		drawCord = polygon;
		//$('#color_palette').show();
		var getpath = polygon.getPath().getArray();
		var cordPolygon = (polygon.getPath().getArray().toString());
		console.log("aquiii:" + cordPolygon);
		document.getElementById('coordenadas').value=cordPolygon;
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
		//document.getElementById('superficie').value=rs;
		rectanglesArr = cordPolygon;
		coordenadasArray = listaCorrds;
		rectangle1 = JSON.parse(JSON.stringify(listaCorrds));
		//markerFlowers()
			///
		creando = true;
	})
	
	
	
	
	$.each(data, function(k,v){
		var tipoRiego = "";
		if(v.tipo_riego*1 == 1){
			tipoRiego = "Goteo";
		}else{
			tipoRiego = "Aspersor";
		}
		Info[auxI].info = new google.maps.InfoWindow({
			content: 'Nombre: <strong>'+v.nombre+'</strong>'
			+'<br>Tipo de Riego: <strong>'+tipoRiego+'</strong>'
			+'<br>Precipitación Nominativa: <strong>'+v.precipitacion_nominativa+'</strong>'
			+'<br>Aforo: <strong>'+v.aforo+'</strong>'
			+'<br>Reposición: <strong>'+v.reposicion+'</strong>',
			codigo: v.codigo,
			especie: v.especie,
			nombre: v.nombre,
			sector: v.sectpr,
			variedad: v.variedad,
			tipoRiego: tipoRiego,
			precipitacion_nominativa: v.precipitacion_nominativa,
			aforo: v.aforo,
			reposicion: v.reposicion
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
		//Recoger factor de decision del mes actual
		var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
		var f=new Date();
		var factorDecision;

		$.each(arrayfactores, function(kb, vb){
			if(v.codigo==vb.cod_bloque){	
				$.ajax({
					url: "/simpleWeb/json/AGRO/GETFACTORBYMES/"+meses[f.getMonth()]+"/"+vb.cod_bloque,
					type:	"GET",
					dataType: 'json',
					async: false,
					success: function (data) {
				        $.each(data, function(k, v) {
			        		factorDecision = v.mes;
				        });
				    }
				})
			}
		})

		
		if(factorDecision==""){
			console.log("Entró")
			filtrarCuartel(data, campoGeo);
		}
		
		
		var sumaEvaporacion = evaporacionAcumulada(v.codigo);
		var maximo = v.reposicion*1/factorDecision*1;
		estado = sumaEvaporacion * 100 / maximo;
		colorEstado = estadoBloque(estado);
		
		
		
		
		console.log("Nombre bloque: "+v.nombre);
		console.log("Evaporacion Acumulada: "+sumaEvaporacion)
		console.log("Factor de decisión: "+factorDecision)
		console.log("Máximo: "+maximo)
		console.log("Estado: "+estado+"%")
		console.log("Color: "+colorEstado)
		console.log("")
		
		Dibujo[auxI].draw = new google.maps.Polygon({
			paths: listaCorrds,
			fillColor: colorEstado,
			fillOpacity: .3,
			strokeWeight: 1.5,
			editable: true
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
		
		Dibujo[auxI].marker = new google.maps.Marker({
			position: new google.maps.LatLng(latSum,lngSum),
			visible: false,
			map: map
		})
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

	
	map = new google.maps.Map(document.getElementById('mapa'),{
		center: {lat: campoGeo.split(",")[0]*1, lng: campoGeo.split(",")[1]*1},
		zoom: 15,
		mapTypeId: 'satellite'
	});
//	console.log(Dibujo)
	
	
	
	

	$.each(Dibujo, function(kd,vd){
		google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon){
				

				drawCord = polygon;
				var cordDraw = (vd.draw.getPath().getArray().toString());
				var res2 = cordDraw.split("),(");
				var listaDraw = [];
				for(var i = 0; i < res2.length; i++){
					var row = res2[i].split("(").join("").split(")").join("").split(" ").join("").split(",");
					listaDraw.push({lat:row[0]*1,lng:row[1]*1});
				}
				$.each(listaDraw, function(kf, vf){
					var marker = new google.maps.Marker({
					    position: vf,
					    map: map,
					    visible: false
					});
					if(google.maps.geometry.poly.containsLocation(marker.position, polygon)){
						alerta("Este bloque sobrepasa los límites de otro bloque ya ingresado");
						drawCord.setMap(null);
						return;
					}
					else{
						creando = true;
					}
					
				})
			
			
		})
		
	})
	
	$.each(Dibujo,function(k,v){
		google.maps.event.addListener(v.draw, 'click', function(){
			
			
			
//			if(selectedShape){
//				selectedShape.set('fillColor', estadoBloque(estado));
//			}
			$("#delete").show();
			$("#editar").show();
			var select = (infowindow);
			infowindow = (Info[k].info);
			if(select != null){
				select.close(map,v.marker);
			}
			CAMPOSELECTED = infowindow;
			Info[k].info.open(map,v.marker);
			selectedShape = v.draw;
//			setSelection(v.draw);
//			selectedShape.set('fillColor', "#0004FF");
			//$('#color_palette').show();
		})
		
		google.maps.event.addListener(map, 'click', function(){
			$("#delete").hide();
			$("#editar").hide();
			//$('#color_palette').hide();
			infowindow.close(map,v.marker);
		})	
		Dibujo[k].marker.setMap(map);
		Dibujo[k].draw.setMap(map);
		
	})

	
}

//function selSectorFilter(id){
//	$.getJSON("/simpleWeb/json/AGRO/GET_CUARTEL_SECTOR/"+id, function( data ){
//		var selCuartelFilter = "<option value=''>Seleccione</option>"
//		$.each(data, function(k,v){
//			selCuartelFilter += "<option value='"+v.codigo+"'>"+v.nombre+"</option>"
//		})
//		$("#selCuartelFilter").html(selCuartelFilter);
//	})
//}
function selectEscpecie(){
	$('#varLoading').show();
	var VarOp = [];
	var arrPrd = [];
	var especie = $('#especie').val();
	$.each(SESION.variedad,function(key,value){
		if(value.especie == especie){
			VarOp.push({DESCRIPTION:value.variedad,VALUE_CHAR:value.codigo})
		}
	})
	var aux = "<option value=''>Seleccione</option>";
	var cont = 0;
	$.each(VarOp,function(k,v){
		if(arrPrd.indexOf(v.DESCRIPTION) == -1){
			//console.log(v);
			aux +=  "<option value='"+v.VALUE_CHAR+"'>"+v.DESCRIPTION+"</option>";
			arrPrd.push(v.DESCRIPTION)
			cont++;
		}
	})
	if(cont==0){
		var aux = "<option value='Sin Variedad'>Sin Variedad</option>";
	}
	$("#variedad").prop("disabled", false);
	$('#varLoading').hide();
	$('#variedad').html(aux);
}
function updateBloque(){
	var descript = {
			nombre : $("#nameCuartel").val(),
			especie : $("#especie").val(),
			variedad : $("#variedad").val(),
			tipo_riego : $("#tipoRiego").val(),
			precipitacion_nominativa : $("#precipitacion").val(),
			aforo : $("#aforo").val(),
			reposicion : $("#reposicion").val(),
			codigo : CAMPOSELECTED.codigo
	};
//	row.codigo 					 = $("#codigo");
//	row.nombre                   = $("#nameCuartel").val();
//	row.campo                    = $("#filtroCampo").val();
//	row.sector                   = $("#sector").val();
//	row.especie                  = $("#especie").val();
//	row.variedad                 = $("#variedad").val();
//	row.tipo_riego               = $("#tipoRiego").val();
//	row.precipitacion_nominativa = $("#precipitacion").val();
//	row.aforo                    = $("#aforo").val();
//	row.reposicion               = $("#reposicion").val();
//	row.georeferencia            = $("#coordenadas").val();
//	row.cuarteles				 = arrayCuarteles;
	$.ajax({
		type: "PUT",
		async: false,
		url: "/simpleWeb/json/AGRO/UPDATEBLOQUE/",
		data: JSON.stringify(descript),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},success:function(){
			alerta("Bloque modificado satisfactoriamente");
			$("#addBloque").hide();
			infowindow.close();
			porCampo(cod_campo);
		},
	});
};
function saveBloque(){
	var val = document.getElementsByName("map");
	var req = "*";
	for(var i = 0; i < val.length; i++){
		if(!$(val[i]).val()){
			alerta("( * ) Estos Campos son requeridos");
			return false;
		}
	}
	if(selectedColor == '#1E90FF'){status = 'Sembrado';
	}else if(selectedColor == '#32CD32'){status = 'Listo para Cosechar';
	}else if(selectedColor == '#FF8C00'){status = 'Seco';
	}else if(selectedColor == '#4B0082'){status = 'Fumigado';
	}else if(selectedColor == '#ff0000'){status = 'Prohibido el acceso';}
	var row = {};
	row.codigo=0;
	row.nombre                   = $("#nameCuartel").val();
	row.campo                    = $("#filtroCampo").val();
	row.sector                   = $("#filtroSector").val();
	row.especie                  = $("#especie").val();
	row.variedad                 = $("#variedad").val();
	row.tipo_riego               = $("#tipoRiego").val();
	row.precipitacion_nominativa = $("#precipitacion").val();
	row.aforo                    = $("#aforo").val();
	row.reposicion               = $("#reposicion").val();
	row.georeferencia            = $("#coordenadas").val();
	row.cuarteles				 = arrayCuarteles;
	//console.log(row);
	//return;
	if(!($("#coordenadas").val())){
		alerta("No ha delimitado el bloque");
	}
	else{
		$.ajax({
			url : "/simpleWeb/json/AGRO/ADDBLOQUE/",
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
				alerta("Informacion guardada con exito");
				creando = false;
				$("#addBloque").hide();
				infowindow.close();
				cargarCampo();
				cargarFiltros();
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
};
//OPCIONES MAPA
//function selectCheck(type){
//	if(type.checked == true){
//		for(var i = 0; i < incidenciaMark.length; i++){
//			incidenciaMark[i].setVisible(true);
//		}
//	}else{
//		for(var i = 0; i < incidenciaMark.length; i++){
//			incidenciaMark[i].setVisible(false);
//		}
//	}
//}

function loadVariedad(){
	var selVariedadFilter = "<option value='0'>Todos</option>"
	$.each(SESION.variedad, function(k,v){
		selVariedadFilter += "<option value='"+v.codigo+"'>"+v.variedad+"</option>"
	})
	$("#selVariedadFilter").html(selVariedadFilter);
}
function loadCuartel(){
	var selCuartelFilter = "<option value='0'>Todos</option>"
	$.each(CUARTEL, function(k,v){
		selCuartelFilter += "<option value='"+v.codigo+"'>"+v.nombre+"</option>"
	})
	$("#selCuartelFilter").html(selCuartelFilter);
}
//function viewRiego(check){
//	var riego = document.getElementsByName("riego");
//	if(check.checked){
//		for(var i = 0; i < riego.length; i++){
//			riego[i].checked = check.checked;
//		}
//	}else{
//		for(var i = 0; i < riego.length; i++){
//			riego[i].checked = check.unchecked;
//			
//		}
//	}
//}
//function selectALL(all){
//	var check = document.getElementsByName("check");
//	if(all.checked == true){
//		for(var x = 0; x < check.length; x++){
//			check[x].checked = all.checked;
//		}
//	}else{
//		for(var x = 0; x < check.length; x++){
//			check[x].checked = all.unchecked;
//		}
//	}
//}

function addBloque(){
	drawingManager.setMap(map);
	
	var variedad = "";
	variedad += "<option value='0'>Seleccionar</option>";
	$.each(SESION.variedad, function(k,v){
		variedad += "<option value='"+v.codigo+"' >"+v.variedad+"</option>";
	})
	var especie = "";
	especie += "<option value='0'>Seleccionar</option>";
	$.each(SESION.especie, function(kv,v){
		especie += "<option value='"+v.codigo+"' >"+v.especie+"</option>";
		
	})
	var tipoRiego = "";
	tipoRiego += "<option value='0'>Seleccionar</option>";
	tipoRiego += "<option value='1' >Goteo</option>";
	tipoRiego += "<option value='2' >Aspersor</option>";
	
	$("#tipoRiego").html(tipoRiego);
	$("#especie").html(especie);
	$("#variedad").html(variedad);
	$("#addBloque").hide();
	$("#precipitacion").val("");
	$("#aforo").val("");
	$("#reposicion").val("");
	$("#nameCuartel").val("");
	
	var camp = $("#filtroCampo").val();
	if(!camp){
		alerta("No ha seleccionado un Campo");
		$("#filtroCampo").focus();
		return;
	}
	$("#addBloque").show();
	$("#save").show();
	$("#update").hide();
}

function cargarCuartel(id){
	arrayCuarteles = [];
	has = 0;
//	console.log(auxCuartel);
//	console.log($('#filtroCampo').val());
//	console.log($('#variedad').val());
	$.each(auxCuartel, function(k,v){
		//if(v.campo == $('#filtroCampo').val() && $('#variedad').val().indexOf(v.variedad+"") != -1){
		if(v.campo == $('#filtroCampo').val() && $('#variedad').val() == v.variedad){ 
			//console.log(v);
			var arrayCuartPf       = {};
			arrayCuartPf.codigo    = 0;
			arrayCuartPf.codigo_pf = id;
			arrayCuartPf.cuartel   = v.codigo;
			arrayCuartPf.has       = v.superficie;
			arrayCuartPf.nCuartel  = v.nombre;
			arrayCuartPf.nVariedad = v.nvariedad;
			arrayCuartPf.estado    = 'checked';
			arrayCuartPf.max       = v.superficie;
			arrayCuarteles.push(arrayCuartPf);
			has += parseFloat(v.superficie);
		}
	})
	//console.log(arrayCuarteles);
}

function modalAddCuartel(){
	if($('#especie').val()== ""){
		alerta("Debe seleccionar una Especie");
		return false;
	}
	if($('#variedad').val()== "" || $('#variedad').val() == null){
		alerta("Debe seleccionar una Variedad");
		return false;
	}
	var validate = true;
	var bodyAddCuartel = "";
	var arrIdCuartel = [];
	var tblAddCuartel = "";
	tblAddCuartel +='<div class="table-responsive" id="ignore2">';
	tblAddCuartel +=	'<table class="table table-striped table-condensed" id="tbl_colaboradores">';
	tblAddCuartel +=		'<thead style="text-align: center;">';
	tblAddCuartel +=			'<tr>';
	tblAddCuartel +=				"<th style='width: 2%; text-align: center;'><input type='checkbox' checked id='cbSelectTodo' onchange='selectTodoCuartel()' ></th>";
	tblAddCuartel +=				'<th style="text-align: center;">Variedad</th>';
	tblAddCuartel +=				'<th style="text-align: center;">Cuartel</th>';
	tblAddCuartel +=				'<th style="text-align: center;">Hectareas</th>';
	tblAddCuartel +=			'</tr>';
	tblAddCuartel +=		'</thead>';
	tblAddCuartel +=		'<tbody id="tblCuartel">';
	//console.log(arrayCuarteles);
	var tHas = 0;
	$.each(arrayCuarteles, function(k,va){
		bodyAddCuartel +="<tr>" ;
		bodyAddCuartel +=	"<td><input type='checkbox' class='cbCuartel' onchange='calcularTotalHas()' id='cbCuartel"+va.cuartel+"' "+va.estado+" value='"+va.cuartel+"' ></td>" ;
		bodyAddCuartel +=	"<td>"+va.nVariedad+"</td>" ;
		bodyAddCuartel +=	"<td>"+va.nCuartel+"</td>" ;
		bodyAddCuartel +=	"<td>" ;
		bodyAddCuartel +=		"<input type='number' class='form-control hasReal' value='"+va.has+"' onchange='validaMaxHas(this.id)' max='"+va.max+"' min='0' name='hecCuartel' id='hecCuartel"+va.cuartel+"'>" ;
		bodyAddCuartel +=	"</td>" ;
		bodyAddCuartel +="</tr>";
		tHas += va.has;
	});
	bodyAddCuartel +="<tr>" ;
	bodyAddCuartel +=	"<td></td>" ;
	bodyAddCuartel +=	"<td></td>" ;
	bodyAddCuartel +=	"<td>Total</td>" ;
	bodyAddCuartel +=	"<td id='totalHas'>"+tHas+"</td>" ;
	bodyAddCuartel +="</tr>";
	tblAddCuartel += bodyAddCuartel;
	tblAddCuartel += 		'</tbody>';
	tblAddCuartel +=	'</table>';
	tblAddCuartel +='</div>';
	tblAddCuartel +='<div class="col-sm-12 col-md-12">';
	tblAddCuartel +=	'<div class="btn btn-circle blue btn-outline" id="addCuartel" onclick="addCuartel()" >Guardar</div>';
	tblAddCuartel +=	'<div class="btn btn-circle red btn-outline" onclick="closeModal();">Cancelar</div>';
	tblAddCuartel +='</div>';
	popUp("Seleccione Cuartel", tblAddCuartel, true, '500px', true);
	
}
function selectTodoCuartel(){
	//console.log($("#cbSelectTodo").is(':checked'));
	if($("#cbSelectTodo").is(':checked')){
		$('.cbCuartel').prop('checked', true);
	} else {
		$('.cbCuartel').prop('checked', false);
	}
}
function addCuartel(id){
	has = 0;
	console.log(auxCuartel);
	arrayCuarteles = [];
	
	$.each(auxCuartel, function(k,v){
		//if(v.campo == $('#filtroCampo').val() && $('#variedad').val().indexOf(v.variedad+"") != -1){
		if(v.campo == $('#filtroCampo').val() && $('#variedad').val() == v.variedad){
			//console.log(v);
			var arrayCuartPf       = {};
			arrayCuartPf.codigo    = 0;
			arrayCuartPf.codigo_pf = id;
			arrayCuartPf.cuartel   = v.codigo;
			arrayCuartPf.nVariedad = v.nVariedad;
			arrayCuartPf.has       = $('#hecCuartel'+v.codigo).val();
			arrayCuartPf.nCuartel  = v.nombre;
			arrayCuartPf.nVariedad = v.nvariedad;
			arrayCuartPf.max       = v.superficie;
			if($("#cbCuartel"+v.codigo).is(':checked')){
				arrayCuartPf.estado = 'checked';
				has += parseFloat($('#hecCuartel'+v.codigo).val());
			} else {
				arrayCuartPf.estado = '';
			}
			
			arrayCuarteles.push(arrayCuartPf);
		}
	})
	console.log(arrayCuarteles);
	closeModal();
}
function calcularTotalHas(){
	var total = 0;
	$('.hasReal').each(function(index,element){
		var id = element.id.split('hecCuartel')[1];
		if($("#cbCuartel"+id).is(':checked')){
			total += parseFloat(element.value);
		}
	});
	has = total;
	$('#totalHas').html(total);
}

function validaMaxHas(id){
	var v = parseFloat($('#'+id).val());
	var m = parseFloat($('#'+id).attr('max'));
	//var min = parseFloat($('#'+id).attr('min'));
	if(v > m) {
		alerta("No puede agregar mas hectareas de las que posee el cuartel");
		$('#'+id).val(m);
	}
	if(v < 0){
		alerta("No puede ingresar número menor que 0");
		$('#'+id).val(0);
	}
	calcularTotalHas();
}
function evaporacionAcumulada(cod_bloque){
	var retorno;
	$.ajax({
		url: "/simpleWeb/json/AGRO/getRiegosByCampo/"+cod_campo,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function (data) {
			arrayRiegos = data;
	    }
	})
	var d = new Date();
	var dd = d.getDate();
	var mm = d.getMonth()+1;
	var yyyy = d.getFullYear();

	if(dd<10){
		dd = '0'+dd;
	}
	if(mm<10){
		mm = '0'+mm;
	}
	var fecha = yyyy + "-" + mm + "-" + dd;
	$.each(arrayRiegos, function(k, v){
		if(v.bloque == cod_bloque){

				
				var dia = new Date(v.fecha);
				var ultimoRiego = dia.getDay()+1;
				
				var dia2 = new Date(fecha);
				var diaActual = dia2.getDay()+1;
				
				
				Date.prototype.getWeek = function () {
				    var onejan = new Date(this.getFullYear(), 0, 1);
				    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
				};
				
				if(dia.getWeek() == dia2.getWeek() && ultimoRiego == 1 && diaActual == 1){
					retorno = arrayEvaporacion[0].lunes*1;
				}
				if(ultimoRiego == 1 && diaActual == 2){
					retorno = arrayEvaporacion[0].lunes*1 + arrayEvaporacion[0].martes*1;
				}
				if(ultimoRiego == 1 && diaActual == 3){
					retorno = arrayEvaporacion[0].lunes*1 + arrayEvaporacion[0].martes*1 + arrayEvaporacion[0].miercoles*1;
				}
				if(ultimoRiego == 1 && diaActual == 4){
					retorno = arrayEvaporacion[0].lunes*1 + arrayEvaporacion[0].martes*1 + arrayEvaporacion[0].miercoles*1 + arrayEvaporacion[0].jueves*1;
				}
				if(ultimoRiego == 1 && diaActual == 5){
					retorno = arrayEvaporacion[0].lunes*1 + arrayEvaporacion[0].martes*1 + arrayEvaporacion[0].miercoles*1 + arrayEvaporacion[0].jueves*1 + arrayEvaporacion[0].viernes*1;
				}
				if(ultimoRiego == 1 && diaActual == 6){
					retorno = arrayEvaporacion[0].lunes*1 + arrayEvaporacion[0].martes*1 + arrayEvaporacion[0].miercoles*1 + arrayEvaporacion[0].jueves*1 + arrayEvaporacion[0].viernes*1 + arrayEvaporacion[0].sabado*1;
				}
				if(ultimoRiego == 1 && diaActual == 7){
					retorno = arrayEvaporacion[0].lunes*1 + arrayEvaporacion[0].martes*1 + arrayEvaporacion[0].miercoles*1 + arrayEvaporacion[0].jueves*1 + arrayEvaporacion[0].viernes*1 + arrayEvaporacion[0].sabado*1 + arrayEvaporacion[0].domingo*1;
				}
				
				////////////////////
				
				if(dia.getWeek() == dia2.getWeek() && ultimoRiego == 2 && diaActual == 2){
					retorno = arrayEvaporacion[0].martes*1;
				}
				if(ultimoRiego == 2 && diaActual == 3){
					retorno = arrayEvaporacion[0].martes*1 + arrayEvaporacion[0].miercoles*1;
				}
				if(ultimoRiego == 2 && diaActual == 4){
					retorno = arrayEvaporacion[0].martes*1 + arrayEvaporacion[0].miercoles*1 + arrayEvaporacion[0].jueves*1;
				}
				if(ultimoRiego == 2 && diaActual == 5){
					retorno = arrayEvaporacion[0].martes*1 + arrayEvaporacion[0].miercoles*1 + arrayEvaporacion[0].jueves*1 + arrayEvaporacion[0].viernes*1;
				}
				if(ultimoRiego == 2 && diaActual == 6){
					retorno = arrayEvaporacion[0].martes*1 + arrayEvaporacion[0].miercoles*1 + arrayEvaporacion[0].jueves*1 + arrayEvaporacion[0].viernes*1 + arrayEvaporacion[0].sabado*1;
				}
				if(ultimoRiego == 2 && diaActual == 7){
					retorno = arrayEvaporacion[0].martes*1 + arrayEvaporacion[0].miercoles*1 + arrayEvaporacion[0].jueves*1 + arrayEvaporacion[0].viernes*1 + arrayEvaporacion[0].sabado*1 + arrayEvaporacion[0].domingo*1;
				}
				
				//////////
				
				if(dia.getWeek() == dia2.getWeek() && ultimoRiego == 3 && diaActual == 3){
					retorno = arrayEvaporacion[0].miercoles*1;
				}
				if(ultimoRiego == 3 && diaActual == 4){
					retorno = arrayEvaporacion[0].miercoles*1 + arrayEvaporacion[0].jueves*1;
				}
				if(ultimoRiego == 3 && diaActual == 5){
					retorno = arrayEvaporacion[0].miercoles*1 + arrayEvaporacion[0].jueves*1 + arrayEvaporacion[0].viernes*1;
				}
				if(ultimoRiego == 3 && diaActual == 6){
					retorno = arrayEvaporacion[0].miercoles*1 + arrayEvaporacion[0].jueves*1 + arrayEvaporacion[0].viernes*1 + arrayEvaporacion[0].sabado*1;
				}
				if(ultimoRiego == 3 && diaActual == 7){
					retorno = arrayEvaporacion[0].miercoles*1 + arrayEvaporacion[0].jueves*1 + arrayEvaporacion[0].viernes*1 + arrayEvaporacion[0].sabado*1 + arrayEvaporacion[0].domingo*1;
				}
				
				///
				
				if(dia.getWeek() == dia2.getWeek() && ultimoRiego == 4 && diaActual == 4){
					retorno = arrayEvaporacion[0].jueves*1;
				}
				if(ultimoRiego == 4 && diaActual == 5){
					retorno = arrayEvaporacion[0].jueves*1 + arrayEvaporacion[0].viernes*1;
				}
				if(ultimoRiego == 4 && diaActual == 6){
					retorno = arrayEvaporacion[0].jueves*1 + arrayEvaporacion[0].viernes*1 + arrayEvaporacion[0].sabado*1;
				}
				if(ultimoRiego == 4 && diaActual == 7){
					retorno = arrayEvaporacion[0].jueves*1 + arrayEvaporacion[0].viernes*1 + arrayEvaporacion[0].sabado*1 + arrayEvaporacion[0].domingo*1;
				}
				
				/////
				
				if(dia.getWeek() == dia2.getWeek() && ultimoRiego == 5 && diaActual == 5){
					retorno = arrayEvaporacion[0].viernes*1;
				}
				if(ultimoRiego == 5 && diaActual == 6){
					retorno = arrayEvaporacion[0].viernes*1 + arrayEvaporacion[0].sabado*1;
				}
				if(ultimoRiego == 5 && diaActual == 7){
					retorno = arrayEvaporacion[0].viernes*1 + arrayEvaporacion[0].sabado*1 + arrayEvaporacion[0].domingo*1;
				}
				
				///
				
				if(dia.getWeek() == dia2.getWeek() && ultimoRiego == 6 && diaActual == 6){
					retorno = arrayEvaporacion[0].sabado*1;
				}
				if(ultimoRiego == 6 && diaActual == 7){
					retorno = arrayEvaporacion[0].sabado*1 + arrayEvaporacion[0].domingo*1;
				}
				
				/////
				
				if(dia.getWeek() == dia2.getWeek() && ultimoRiego == 7 && diaActual == 7){
					retorno = arrayEvaporacion[0].domingo*1;
				}
				
				/////
				
				if(ultimoRiego == 7 && diaActual == 1){
					retorno = arrayEvaporacion[0].domingo*1 + arrayEvaporacion[0].lunesnext*1;
				}
				if(ultimoRiego == 7 && diaActual == 2){
					retorno = arrayEvaporacion[0].domingo*1 + arrayEvaporacion[0].lunesnext*1 + arrayEvaporacion[0].martesnext*1;
				}
				if(ultimoRiego == 7 && diaActual == 3){
					retorno = arrayEvaporacion[0].domingo*1 + arrayEvaporacion[0].lunesnext*1 + arrayEvaporacion[0].martesnext*1 + arrayEvaporacion[0].miercolesnext*1;
				}
				if(ultimoRiego == 7 && diaActual == 4){
					retorno = arrayEvaporacion[0].domingo*1 + arrayEvaporacion[0].lunesnext*1 + arrayEvaporacion[0].martesnext*1 + arrayEvaporacion[0].miercolesnext*1 + arrayEvaporacion[0].juevesnext*1;
				}
				if(ultimoRiego == 7 && diaActual == 5){
					retorno = arrayEvaporacion[0].domingo*1 + arrayEvaporacion[0].lunesnext*1 + arrayEvaporacion[0].martesnext*1 + arrayEvaporacion[0].miercolesnext*1 + arrayEvaporacion[0].juevesnext*1 + arrayEvaporacion[0].viernesnext*1;
				}
				if(ultimoRiego == 7 && diaActual == 6){
					retorno = arrayEvaporacion[0].domingo*1 + arrayEvaporacion[0].lunesnext*1 + arrayEvaporacion[0].martesnext*1 + arrayEvaporacion[0].miercolesnext*1 + arrayEvaporacion[0].juevesnext*1 + arrayEvaporacion[0].viernesnext*1 + arrayEvaporacion[0].sabadonext*1;
				}

				/////
				
				if(ultimoRiego == 6 && diaActual == 1){
					retorno = arrayEvaporacion[0].sabado*1 + arrayEvaporacion[0].domingo*1 + arrayEvaporacion[0].lunesnext*1;
				}
				if(ultimoRiego == 6 && diaActual == 2){
					retorno = arrayEvaporacion[0].sabado*1 + arrayEvaporacion[0].domingo*1 + arrayEvaporacion[0].lunesnext*1 + arrayEvaporacion[0].martesnext*1;
				}
				if(ultimoRiego == 6 && diaActual == 3){
					retorno = arrayEvaporacion[0].sabado*1 + arrayEvaporacion[0].domingo*1 + arrayEvaporacion[0].lunesnext*1 + arrayEvaporacion[0].martesnext*1 + arrayEvaporacion[0].miercolesnext*1;
				}
				if(ultimoRiego == 6 && diaActual == 4){
					retorno = arrayEvaporacion[0].sabado*1 + arrayEvaporacion[0].domingo*1 + arrayEvaporacion[0].lunesnext*1 + arrayEvaporacion[0].martesnext*1 + arrayEvaporacion[0].miercolesnext*1 + arrayEvaporacion[0].juevesnext*1;
				}
				if(ultimoRiego == 6 && diaActual == 5){
					retorno = arrayEvaporacion[0].sabado*1 + arrayEvaporacion[0].domingo*1 + arrayEvaporacion[0].lunesnext*1 + arrayEvaporacion[0].martesnext*1 + arrayEvaporacion[0].miercolesnext*1 + arrayEvaporacion[0].juevesnext*1 + arrayEvaporacion[0].viernesnext*1;
				}
				
				//////
				
				if(ultimoRiego == 5 && diaActual == 1){
					retorno = arrayEvaporacion[0].viernes*1 + arrayEvaporacion[0].sabado*1 + arrayEvaporacion[0].domingo*1 + arrayEvaporacion[0].lunesnext*1;
				}
				if(ultimoRiego == 5 && diaActual == 2){
					retorno = arrayEvaporacion[0].viernes*1 + arrayEvaporacion[0].sabado*1 + arrayEvaporacion[0].domingo*1 + arrayEvaporacion[0].lunesnext*1 + arrayEvaporacion[0].martesnext*1;
				}
				if(ultimoRiego == 5 && diaActual == 3){
					retorno = arrayEvaporacion[0].viernes*1 + arrayEvaporacion[0].sabado*1 + arrayEvaporacion[0].domingo*1 + arrayEvaporacion[0].lunesnext*1 + arrayEvaporacion[0].martesnext*1 + arrayEvaporacion[0].miercolesnext*1;
				}
				if(ultimoRiego == 5 && diaActual == 4){
					retorno = arrayEvaporacion[0].viernes*1 + arrayEvaporacion[0].sabado*1 + arrayEvaporacion[0].domingo*1 + arrayEvaporacion[0].lunesnext*1 + arrayEvaporacion[0].martesnext*1 + arrayEvaporacion[0].miercolesnext*1 + arrayEvaporacion[0].juevesnext*1;
				}
				
				//////
				
				if(ultimoRiego == 4 && diaActual == 1){
					retorno = arrayEvaporacion[0].jueves*1 + arrayEvaporacion[0].viernes*1 + arrayEvaporacion[0].sabado*1 + arrayEvaporacion[0].domingo*1 + arrayEvaporacion[0].lunesnext*1;
				}
				if(ultimoRiego == 4 && diaActual == 2){
					retorno = arrayEvaporacion[0].jueves*1 + arrayEvaporacion[0].viernes*1 + arrayEvaporacion[0].sabado*1 + arrayEvaporacion[0].domingo*1 + arrayEvaporacion[0].lunesnext*1 + arrayEvaporacion[0].martesnext*1;
				}
				if(ultimoRiego == 4 && diaActual == 3){
					retorno = arrayEvaporacion[0].jueves*1 + arrayEvaporacion[0].viernes*1 + arrayEvaporacion[0].sabado*1 + arrayEvaporacion[0].domingo*1 + arrayEvaporacion[0].lunesnext*1 + arrayEvaporacion[0].martesnext*1 + arrayEvaporacion[0].miercolesnext*1;
				}
				
				//////
				
				if(ultimoRiego == 3 && diaActual == 1){
					retorno = arrayEvaporacion[0].miercoles*1 + arrayEvaporacion[0].jueves*1 + arrayEvaporacion[0].viernes*1 + arrayEvaporacion[0].sabado*1 + arrayEvaporacion[0].domingo*1 + arrayEvaporacion[0].lunesnext*1;
				}
				if(ultimoRiego == 3 && diaActual == 2){
					retorno = arrayEvaporacion[0].miercoles*1 + arrayEvaporacion[0].jueves*1 + arrayEvaporacion[0].viernes*1 + arrayEvaporacion[0].sabado*1 + arrayEvaporacion[0].domingo*1 + arrayEvaporacion[0].lunesnext*1 + arrayEvaporacion[0].martesnext*1;
				}
				
				///////
				
				if(ultimoRiego == 2 && diaActual == 1){
					retorno = arrayEvaporacion[0].martes*1 + arrayEvaporacion[0].miercoles*1 + arrayEvaporacion[0].jueves*1 + arrayEvaporacion[0].viernes*1 + arrayEvaporacion[0].sabado*1 + arrayEvaporacion[0].domingo*1 + arrayEvaporacion[0].lunesnext*1;
				}
				
				///////
				
				if(dia.getWeek() != dia2.getWeek() && ultimoRiego == 1 && diaActual == 1){
					retorno = arrayEvaporacion[0].lunes*1 + arrayEvaporacion[0].martes*1 + arrayEvaporacion[0].miercoles*1 + arrayEvaporacion[0].jueves*1 + arrayEvaporacion[0].viernes*1 + arrayEvaporacion[0].sabado*1 + arrayEvaporacion[0].domingo*1 + arrayEvaporacion[0].lunesnext*1;
				}
				if(dia.getWeek() != dia2.getWeek() && ultimoRiego == 2 && diaActual == 2){
					retorno = arrayEvaporacion[0].martes*1 + arrayEvaporacion[0].miercoles*1 + arrayEvaporacion[0].jueves*1 + arrayEvaporacion[0].viernes*1 + arrayEvaporacion[0].sabado*1 + arrayEvaporacion[0].domingo*1 + arrayEvaporacion[0].lunesnext*1 + arrayEvaporacion[0].martesnext*1;
				}
				if(dia.getWeek() != dia2.getWeek() && ultimoRiego == 3 && diaActual == 3){
					retorno = arrayEvaporacion[0].miercoles*1 + arrayEvaporacion[0].jueves*1 + arrayEvaporacion[0].viernes*1 + arrayEvaporacion[0].sabado*1 + arrayEvaporacion[0].domingo*1 + arrayEvaporacion[0].lunesnext*1 + arrayEvaporacion[0].miercolesnext*1 + arrayEvaporacion[0].juevesnext*1;
				}
				if(dia.getWeek() != dia2.getWeek() && ultimoRiego == 4 && diaActual == 4){
					retorno = arrayEvaporacion[0].jueves*1 + arrayEvaporacion[0].viernes*1 + arrayEvaporacion[0].sabado*1 + arrayEvaporacion[0].domingo*1 + arrayEvaporacion[0].lunesnext*1 + arrayEvaporacion[0].martesnext*1 + arrayEvaporacion[0].miercolesnext*1 + arrayEvaporacion[0].juevesnext*1;
				}
				if(dia.getWeek() != dia2.getWeek() && ultimoRiego == 5 && diaActual == 5){
					retorno = arrayEvaporacion[0].viernes*1 + arrayEvaporacion[0].sabado*1 + arrayEvaporacion[0].domingo*1 + arrayEvaporacion[0].lunesnext*1 + arrayEvaporacion[0].martesnext*1 + arrayEvaporacion[0].miercolesnext*1 + arrayEvaporacion[0].juevesnext*1 + arrayEvaporacion[0].viernesnext*1;
				}
				if(dia.getWeek() != dia2.getWeek() && ultimoRiego == 6 && diaActual == 6){
					retorno = arrayEvaporacion[0].sabado*1 + arrayEvaporacion[0].domingo*1 + arrayEvaporacion[0].lunesnext*1 + arrayEvaporacion[0].martesnext*1 + arrayEvaporacion[0].miercolesnext*1 + arrayEvaporacion[0].juevesnext*1 + arrayEvaporacion[0].viernesnext*1 + arrayEvaporacion[0].sabadonext*1;
				}
				if(dia.getWeek() != dia2.getWeek() && ultimoRiego == 7 && diaActual == 7){
					retorno = arrayEvaporacion[0].domingo*1 + arrayEvaporacion[0].lunesnext*1 + arrayEvaporacion[0].martesnext*1 + arrayEvaporacion[0].miercolesnext*1 + arrayEvaporacion[0].juevesnext*1 + arrayEvaporacion[0].viernesnext*1 + arrayEvaporacion[0].sabadonext*1 + arrayEvaporacion[0].domingonext*1;
				}
				

		}
	})
	
	
	return retorno;
	

}
function loadInfo(){
	$.getJSON("/simpleWeb/json/AGRO/getEvaporacionByCampo/"+cod_campo, function(data) {
		arrayEvaporacion = data;
	});
	$("#loading").hide();
}
function estadoBloque(estado){
	var retorno = "";
	$.ajax({
		url: "/simpleWeb/json/AGRO/getEvaporacionAcumulada/"+cod_campo,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function (data) { 
			if(estado*1 <= data[0].hasta_rojo*1 && estado*1 >= data[0].desde_rojo*1){
				retorno = "red";
			}
			if(estado*1 <= data[0].hasta_amarillo*1 && estado*1 >= data[0].desde_amarillo*1){
				retorno = "yellow";
			}
			if(estado*1 <= data[0].hasta_verde*1 && estado*1 >= data[0].desde_verde*1){
				retorno = "green";
			}
			if(estado*1>100){
				retorno = "red";
			}
	    }
	})
	return retorno;
}