$(document).ready(function(){
	loadPreselect();
})
var checkTr = [];
var jsonTRab;
var preSelected = getPeticion();
function loadPreselect(){
	$("#bodySeleccion").html("");
	$.each(preSelected, function(k,v){
		if(v.proceso == "seleccion"){
			jsonTRab = v.trabajadores;
			$.each(v.trabajadores, function(kt, vt){
				var bodySeleccion = "";
				bodySeleccion += "<tr>";
				bodySeleccion += 	"<td><input type='checkbox' id='"+vt.rut+"' checked data-toggle='toggle' onchange='selected(this);' data-onstyle='success' data-size='mini'></td>";
				bodySeleccion += 	"<td>"+vt.nombre+"</td>";
				bodySeleccion += 	"<td>"+vt.sueldo_mensual+"</td>";
				bodySeleccion += 	"<td>"+vt.sueldo_mensual+"</td>";
				bodySeleccion += 	"<td>Cosechador</td>";
				bodySeleccion += 	"<td>Cosecha</td>";
				bodySeleccion += 	"<td>"+v.obs+"</td>";
				bodySeleccion += 	"<td>"+vt.f_ingreso+"</td>";
				bodySeleccion += "</tr>";
				$("#bodySeleccion").append(bodySeleccion);
			})
		}
	})
}
function selected(obj){
	if(obj.checked){
		console.log("Selected")
	}else{
		
	}
}
function valArr(val){
	var rut;
	$.each(jsonTRab, function(k,v){
		if(val == v.rut){
			rut = v;
		}
	})
	return rut;
}
function finish(){
	checkTr = [];
	$('input[type=checkbox]:checked').each(function() {
		checkTr.push(valArr(this.id));
    });
	if(checkTr.length == 0){
		alerta("No ha seleccionado nngun trabajador");
		return;
	}else{
		alerta("Los trabajadores seleccionados pasaran al area de contrato");
	}
}