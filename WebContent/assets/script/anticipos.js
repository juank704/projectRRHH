$(document).ready(function(){
	loadEmpresa();
})
var datos = JSON.parse(localStorage.getItem("datosPersonal"));
var cambioEmpresa = [{
	ex_actual: "Peraz SA",
	fechaI_emactual: "2017-12-15",
	fechaT_emactual: "2018-04-18",
}];

function loadEmpresa(){
	var get = getINFO();
	var getSplit = get.id.split(",");
	$.each(datos, function(k,v){
		if(getSplit.length > 1){
			$("#un_anticipo").hide();
			$("#table_unanticipo").hide();
			var bodyAnticipo = "";
			for(var i = 0; i < getSplit.length; i++){
				if(getSplit[i] == v.id){
					bodyAnticipo += "<tr>";
					bodyAnticipo += 	"<td>"+v.nombre+"</td>";
					bodyAnticipo += 	"<td>Peraz SA</td>";
					bodyAnticipo += 	"<td><input type='text' name='fecha' class='form-control input-circle' readonly id='fechaPago"+v.id+"'></td>";
					bodyAnticipo += 	"<td></td>";
					bodyAnticipo += 	"<td><a id='delCol' title='Eliminar' onclick='javascript: delCol("+v.id+");' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-trash-o fa-lg'></i></a></td>";
					bodyAnticipo += 	"<td><a id='delCol' title='Eliminar' onclick='javascript: delCol("+v.id+");' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-trash-o fa-lg'></i></a></td>";
					bodyAnticipo += "</tr>";
					$("#bodyAnticipo").append(bodyAnticipo);
				}
			}
			console.log("sdjkfhdfjksdh");
			fechas();
		}else{
			$("#div_monto").hide();
			$("#table_anticipo").hide();
			if(get.id == v.id){
				var bodyunAnticipo = "";
				bodyunAnticipo += "<tr>";
				bodyunAnticipo += 	"<td>"+v.nombre+"</td>";
				bodyunAnticipo += 	"<td>Peraz SA</td>";
				bodyunAnticipo += 	"<td>2017-12-15</td>";
				bodyunAnticipo += 	"<td>2018-04-18</td>";
				bodyunAnticipo += "</tr>";
				$("#bodyunAnticipo").append(bodyunAnticipo);
			}
		}
	})
}