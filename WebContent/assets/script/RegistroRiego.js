var dataTable = $('#Table_mantenedor').DataTable({
	"sPaginationType": "full_numbers" ,
	"filter": false
	
});
$(document).ready(function() {
	$.fn.dataTable.ext.errMode = 'none';
	$('#loading').hide();
	loadCampo();
});

var arrayFactores = "";
var arrayEvaporacion = "";
var arrayRiegos = "";
var arrayBloques = "";
var filtro;
var cod_campo;
var d=new Date();

function loadCampo(){
	$.each(SESION.campo, function(k, v) {
    	filtro += '<option value="'+v.campo+'">'+v.descripcion+'</option>';
    });
    $('#filtroCampo').html(filtro);
    cod_campo = $("#filtroCampo").val();
    loadBloques();
    loadEvaporacion();
    loadRiegos();
    loadFactor();
    loadTabla();    
}
$("#filtroCampo").change(function(){
	cod_campo = $("#filtroCampo").val();
	loadBloques();
	loadEvaporacion();
	loadRiegos();
	loadFactor();
	loadTabla();
});
function fechaRiego(input){
	var hoy = new Date(dateHoy());
	var newDate = new Date(formatFecha(input.value));
	if(hoy < newDate){
		alerta("La fecha no puede ser mayor a la actual")
		$("#"+input.id).addClass("has-error");
		$("#"+input.id).val("");
	}
	else{
		loadTablaHistorial();
	}
	
}
function loadEvaporacion(){
	$.ajax({
		url: "/simpleWeb/json/AGRO/getEvaporacionByCampo/"+cod_campo,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function (data) {
			arrayEvaporacion = data;
	    }
	})	
}
function loadRiegos(){
	$.ajax({
		url: "/simpleWeb/json/AGRO/getRiegosByCampo/"+cod_campo,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function (data) {
			arrayRiegos = data;
	    }
	})
}
function loadReposicion(cod_bloque){
	var reposicion;
	$.ajax({
		url: "/simpleWeb/json/AGRO/GETBLOQUES/"+cod_bloque,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function (data) {
	        $.each(data, function(k, v) {
        		reposicion = v.reposicion;
	        });
	    }
	})
	return reposicion;
}
function loadFactor(cod_bloque){
	var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
		
	var factorDecision;
	$.ajax({
		url: "/simpleWeb/json/AGRO/GETFACTORBYMES/"+meses[d.getMonth()]+"/"+cod_bloque,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function (data) {
	        $.each(data, function(k, v) {
        		factorDecision = v.mes;
	        });
	    }
	})
	return factorDecision;

}
function loadBloques(){

	$.ajax({
		url: "/simpleWeb/json/AGRO/GETBLOQUESBYCAMPO/"+cod_campo,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function (data) {
	        $.each(data, function(k, v) {
        		arrayBloques = data;
	        });
	    }
	})

}
function loadTabla(){
	dataTable.clear().draw();
	var tbl = "";
	$.each(arrayRiegos,function(k, v) {
		$.each(arrayBloques,function(kb, vb) {
			if(vb.codigo == v.bloque){
				
				var sumaEvaporacion = evaporacionAcumulada(v.bloque);
				var maximo = loadReposicion(v.bloque)*1/loadFactor(v.bloque)*1;
				estado = sumaEvaporacion * 100 / maximo;
				estado2 = Math.trunc(estado);
				var confirmar = "<div style='text-align:center'><button title='Confirmar' onclick='javascript: Confirmar("+v.codigo+", "+v.bloque+")' class='btn btn-primary' type='button' data-toggle='dropdown'>CONFIRMAR</button>"
				var horas = "<input type='number' class='form-control input-sm' id='horas"+v.codigo+"' value='"+v.horas+"'>";
				var noListo = "<div style='text-align:center'><button title='No listo' class='btn btn-info' type='button' data-toggle='dropdown' disabled>NO LISTO, EVAPORACIÓN AL "+estado2+"%</button>"
				
				var tbl = "";
					
				
				
//				console.log("Evaporacion Acumulada: "+sumaEvaporacion)
//				console.log("Máximo: "+maximo)
//				console.log("Estado: "+estado+"%")
//				console.log("")

				if(v.activo==1){
					if(estado>=70){
						tbl = [v.nombre_bloque, horas, formatFecha(v.fecha), confirmar];
					}
					else{
						tbl = [v.nombre_bloque, v.horas, formatFecha(v.fecha), noListo];
					}
					var rowNode = dataTable
				    .row.add( tbl )
				    .draw()
				    .node();
					
				}				
			}
		})		
	})
}
function loadTablaHistorial(){
	dataTable.clear().draw();
	var tbl = "";
	$.each(arrayRiegos,function(k, v) {
		$.each(arrayBloques,function(kb, vb) {
			if(vb.codigo == v.bloque){
				
				var yaRegado = "<div style='text-align:center'><button title='Ya regado' class='btn btn-success' type='button' data-toggle='dropdown' disabled>YA REGADO</button>"
				
				var tbl = "";
					
				var sumaEvaporacion = evaporacionAcumulada(v.bloque);
				var maximo = loadReposicion(v.bloque)*1/loadFactor(v.bloque)*1;
				estado = sumaEvaporacion * 100 / maximo;
				
//				console.log("Evaporacion Acumulada: "+sumaEvaporacion)
//				console.log("Máximo: "+maximo)
//				console.log("Estado: "+estado+"%")
//				console.log("")
//
//				console.log("Fecha: " + formatFecha(v.fecha))

				if(formatFecha(v.fecha) == $("#fecha_rendimiento").val() && v.activo==0){
					$("#fecha").html("Fecha");
					tbl = [v.nombre_bloque, v.horas, formatFecha(v.fecha), yaRegado];
					var rowNode = dataTable
				    .row.add( tbl )
				    .draw()
				    .node();
					
				}
				
			}
		})		
	})
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
function Confirmar(codigo, cod_bloque){
	var c = confirmar.confirm("¿Estás seguro?")
	$(c.aceptar).click(function(){
		var newAplicaciones = {
				codigo : codigo,
				campo : cod_campo,
				bloque: cod_bloque,
				horas : $("#horas"+codigo).val()
			}
			$.ajax({
				type: "PUT",
				async: false,
				url: "/simpleWeb/json/AGRO/updateEstadoRiego/",
				data: JSON.stringify(newAplicaciones),
				beforeSend : function(xhr){
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},success:function(){
					alerta("Se ha confirmado el riego correctamente");
					loadCampo();
				},
			});
	})
}