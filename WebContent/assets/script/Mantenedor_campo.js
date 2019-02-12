$(document).ready(function() {
	$.fn.dataTable.ext.errMode = 'none';
	$('#loading').hide();
	loadTabla();
});
var drawingManager = null;
var coordenadas;

function loadTabla() {
	var tbl = "";
	$.each(SESION.campo,function(k, v) {
						tbl += "<tr>";
						tbl += 		"<td>" + v.descripcion + "</td>";
						tbl +=		"<td><div class='dropdown dropleft' style='float: left;'>";
						tbl +=			"<button class='btn btn-circle yellow btn-outline btn-sm dropdown-toggle' title='Modificar' onclick='javascript: initMap("+v.codigo+")' type='button' data-toggle='dropdown'>";
						tbl +=			"<span class='fa fa-pencil-square-o fa-lg'></span></button></td>";
						tbl +=			"<span class='fa fa-trash fa-2x'></span></button></td>";
						tbl += "</tr>";
					})
	$('#BodyMantenedorCampo').html(tbl);
}
var location2;
function initMap(id){
	$.each(SESION.campo, function(k,v){
		if(v.codigo == id){
			deleteMarkers();
			deleteCircles();
			var geo = "";
			geo +=	'<div class="col-xs-12 col-sm-12 col-md-12 portlet light">';
//			geo +=  	'<div class="col-xs-6 col-sm-6 col-md-6">';
//			geo +=  		'<label style="color: #337ab7;" >Buscar: </label>';
//			geo +=  		'<input class="form-control type="text" id="address" placeholder="Ingresa una Dirección">';	    
//			geo +=  	'</div>';
			geo +=  	'<div class="col-xs-3 col-sm-3 col-md-3">';
			geo +=  		'<h4 style="color: #337ab7;" >Área (Km): </h4>';	
			geo +=  	'</div>';
			geo +=  	'<div class="col-xs-6 col-sm-6 col-md-6">';
			geo +=			'<input class="form-control" type="text" id="radio" onkeyup="createRadio()" value="'+v.area+'">';
			geo +=  	'</div>';		
			geo +=  	'<div class="col-xs-12 col-sm-12 col-md-12"><br></div>';
			geo +=		'<div class="col-xs-12 col-sm-12 col-md-12">';
			geo +=			'<div id="map" style="width: 100%; height: 500px; float: left;">';
			geo +=				'';
			geo +=			'</div>';
			geo +=		'</div>';
			geo +=  	'<div class="col-xs-12 col-sm-12 col-md-12"><br></div>';
			geo +=  	'<div class="col-xs-12 col-sm-12 col-md-12">';
			geo +=			'<div class="col-md-2">';
			geo +=				'<label style="color: #C70039;font-weight: bold" class="col-form-label" style="float: right;">LAT/LGN:</label>';
			geo +=			'</div>';
			geo +=			'<div class="col-sm-6 col-md-6">';
			geo +=				'<label style="color: #337ab7;font-weight: bold" id="lnglat"></label>';
			geo +=			'</div>';
			geo +=		'</div>';
			geo +=  	'<div class="col-xs-12 col-sm-12 col-md-12"><br></div>';
			geo +=		'<div class="col-xs-12 col-sm-12 col-md-12">'+
							'<div class="btn btn-circle blue btn-outline" onclick="guardar('+id+')" id="registrarFormaAp">Guardar</div>'+ 
							"&nbsp;&nbsp;&nbsp;"+ 
							'<div class="btn btn-circle red btn-outline" onclick="closeModal()" id="cancelarFormaAp">Cancelar</div>'+ 
						'</div>'
			geo +=	'</div>';
			popUp("Modificar Georeferencia "+v.descripcion, geo, true, "700px", true);
			map = new google.maps.Map(document.getElementById('map'),{
				center: {lat: v.georeferencia.split(",")[0]*1, lng: v.georeferencia.split(",")[1]*1},
				zoom: 10,
				mapTypeId: 'satellite'
			});
			
			var marker = new google.maps.Marker({
		          position: {lat: v.georeferencia.split(",")[0]*1, lng: v.georeferencia.split(",")[1]*1},
		          map: map,
		          draggable: true,
		    });
			$("#lnglat").html(marker.position.lat()+","+marker.position.lng());
			location2 = marker.getPosition();
			google.maps.event.addListener(marker, "dragend", function() {
				posicion = marker.getPosition();
				location2 = posicion;
				deleteCircles();
				createRadio(posicion);
				$("#lnglat").html(posicion.lat()+","+posicion.lng());
			  });
			var cityCircle = new google.maps.Circle({
		        strokeColor: 'blue',
		        strokeOpacity: 0.8,
		        strokeWeight: 2,
		        fillColor: 'blue',
		        fillOpacity: 0.35,
		        map: map,
		        center: {lat: v.georeferencia.split(",")[0]*1, lng: v.georeferencia.split(",")[1]*1},
		        radius: v.area*1000
		    });
			
			google.maps.event.addListener(map, 'click', function(event) {
				deleteMarkers();
				deleteCircles();
				createMarker(event.latLng);
				createRadio(event.latLng);
				location2 = event.latLng;
			});

			circles.push(cityCircle);
			markers.push(marker);

		}
	})
}
function guardar(id){
	var descripc = {
		codigo: id,
		georeferencia : $('#lnglat').text(),
		area : $("#radio").val()
	}
	if($('#lnglat').text()==""){
		alerta("No se ha ingresado una geolocalización");
	}
	else{
		$.ajax({
			url : "/simpleWeb/json/work/updateGeoAreaCampo/",
			type : "PUT",
			data : JSON.stringify(descripc),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},success: function(){
				SESION = getVars();
				loadTabla();
				closeModal();
				alerta("Registro modificado");
			}
		})
	}
	
}
var circles = [];
function createRadio(location) {
	if (location == undefined){
		location = location2;
	}
	deleteCircles();
	var cityCircle = new google.maps.Circle({
        strokeColor: 'blue',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: 'blue',
        fillOpacity: 0.35,
        map: map,
        center: location,
        radius: ($("#radio").val())*1000,
      });
	circles.push(cityCircle);
}
var markers = [];

function createMarker(location) {			
	var marker = new google.maps.Marker({
          position: location,
          map: map,
          draggable: true,
        })
	google.maps.event.addListener(marker, "dragend", function() {
		posicion = marker.getPosition();
		location2 = posicion;
		deleteCircles();
		createRadio(posicion);
		$("#lnglat").html(posicion.lat()+","+posicion.lng());
	  });
	
	markers.push(marker);
	$("#lnglat").html(marker.position.lat()+","+marker.position.lng());
}
function deleteMarkers(){
	setMapOnAll(null);
}
function deleteCircles(){
	setMapOnAll2(null);
}
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
    	markers[i].setMap(map);
    	markers.pop();
    }  
}
function setMapOnAll2(map){
	for (var i = 0; i < circles.length; i++) {
    	circles[i].setMap(map);
    	circles.pop();
    }
}