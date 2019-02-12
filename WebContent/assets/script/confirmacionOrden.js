//$(document).ready(function(){
//	loadTblOrden();
//});
var mayor = 0;
var countMa = 1;
var arrayMaterial;
$(document).ready(function(){
	 
	onLoad();
});

function getMaterial(){
	$.ajax({
		url: "/simpleWeb/json/AGRO/GETMA/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			arrayMaterial = data;
		}
	})
}
function loadMercado(){		
		
	$('#mercado').append($('<option>', {value: 0, text: "Seleccione"}));
	$.getJSON("/simpleWeb/json/AGRO/GETMERCADOS", function(data){
		$.each(data, function(k, v){
			$('#mercado').append($('<option>', {value: v.codigo, text: v.descripcion}));
		})
	
});
}


function loadFormaAplicacion(){		
		
	$('#forma_aplicacion').append($('<option>', {value: 0, text: "Seleccione"}));
	$.getJSON("/simpleWeb/json/AGRO/GETFA/", function(data){
		$.each(data, function(k, v){
			$('#forma_aplicacion').append($('<option>', {value: v.codigo, text: v.descripcion}));
		})
	
});
}

function loadJefeAplicacion(){		
	
	$('#jefe_aplicacion').append($('<option>', {value: 0, text: "Seleccione"}));
	$.getJSON("/simpleWeb/json/AGRO/getP/", function(data){
		$.each(data, function(k, v){
			$('#jefe_aplicacion').append($('<option>', {value: v.codigo, text: v.nombre + " "+v.apellido_paterno}));
		})
	
});
}

function loadMaquinarias(){		
	
	$('#maquinarias').append($('<option>', {value: 0, text: "Seleccione"}));
	$.getJSON("/simpleWeb/json/AGRO/GETMAQUINARIAS/", function(data){
		$.each(data, function(k, v){
			$('#maquinarias').append($('<option>', {value: v.codigo, text: v.descripcion}));
		})
	
});
}

function loadImplementos(){		
	
	$('#implementos').append($('<option>', {value: 0, text: "Seleccione"}));
	$.getJSON("/simpleWeb/json/AGRO/GETIMPLEMENTOS/", function(data){
		$.each(data, function(k, v){
			$('#implementos').append($('<option>', {value: v.codigo, text: v.descripcion}));
		})
	
});
}


$('#fecha_inicio').change(function(){

	//alert("ok");
	$("#fecha_viable").val(addDays($("#fecha_inicio").val(),mayor));
	
});


function addDays(date, days) {
	  var result = new Date(date);
	  result.setDate(result.getDate() + days+1);
	  
	  var dd = result.getDate();
	  var mm = result.getMonth()+1; //January is 0!

	  var yyyy = result.getFullYear();
	  if(dd<10){
	      dd='0'+dd;
	  } 
	  if(mm<10){
	      mm='0'+mm;
	  } 
	  var today = dd+'/'+mm+'/'+yyyy;
	  
	  return  today;
	  
	  
	}

function onLoad(){
	
	$.getJSON("/simpleWeb/json/AGRO/LISTA_ORDEN_DETALLE/"+window.location.hash.replace("#",""), function(data){
		console.log(data);
		
		loadMercado();
		loadFormaAplicacion();
		loadJefeAplicacion();
		loadMaquinarias();
		loadImplementos();
		
		$("#numero_orden").val(data.numero_orden);
		$("#especie").val(data.especie);
		$("#estado_fenologico").val(data.estado_fenologico);
		$("#fecha_estimada_aplicacion").val(data.fecha_estimada_aplicacion);
		$("#fecha_estimada_cosecha").val(data.fecha_estimada_cosecha);
		$("#forma_aplicacion").val(data.forma_aplicacion);
		
		var fechaInicio = new Date(data.fecha_estimada_cosecha);
		
		var fechaFin = new Date(data.fecha_estimada_aplicacion);
		
		var diff = fechaInicio - fechaFin;
		
		$("#dias_cosecha").val(diff/(1000*60*60*24) );	
		
		console.log(fechaInicio);
		
	
		
		$.each(data.lista_materiales, function(k, v){			
			console.log(k);
			console.log(v);
			
			if(v.detalle_material.carencia > mayor)				
			mayor = v.detalle_material.carencia; 
			
			var tbl = "";
			tbl += "<tr>";
			tbl += 		"<td>"+v.detalle_material.descripcion+"</td>";
			tbl += 		"<td>"+v.cantidad+"</td>";			
			tbl += 		"<td>"+v.detalle_material.carencia+"</td>";
			tbl += 		"<td>"+v.detalle_material.reingreso+"</td>";			
			tbl += "</tr>";
			$('#tblMateriales').append(tbl);
		})    
		
		
		
       
 
});


}

function menuAddMaterial(x){
	countMa++;
	$("#tblMaterial").append(createTblMaterial(x));
}

function createTblMaterial(x){
	var prgAplicacion = $("#progAplicacion"+x).val();
	console.log(x);
	var tblMaterial = '<tr id="trM'+x+'">'+
				'<td>'+
				'<select class="btn blue btn-outline btn-circle btn-md" name="material" id="material'+x+'">';
//					'<option value="">Seleccione</option>'+
//					'<option value="1">Cuartel 01</option>'+
//					'<option value="2">Cuartel 02</option>'+
//					'<option value="3">Cuartel 03</option>'+
	$.each(arrayMaterial,function(key,value){
		tblMaterial += '<option value="'+value.codigo+'">'+value.descripcion+'</option>';	
	});
	tblMaterial +=	'</select>';
			if(prgAplicacion == "3"){
				tblMaterial += '<td><input type="text" class="form-control input-circle" name="Niteogeno" id="Niteogeno'+x+'"></td>';
				tblMaterial += '<td><input type="text" class="form-control input-circle" name="Fosforo" id="Fosforo'+x+'"></td>';
				tblMaterial += '<td><input type="text" class="form-control input-circle" name="Potasio" id="Potasio'+x+'"></td>';
				tblMaterial += '<td><input type="text" class="form-control input-circle" name="Azufre" id="Azufre'+x+'"></td>';
				tblMaterial += '<td><input type="text" class="form-control input-circle" name="Calcio" id="Calcio'+x+'"></td>';
				tblMaterial += '<td><input type="text" class="form-control input-circle" name="Zinc" id="Zinc'+x+'"></td>';
				tblMaterial += '<td><input type="text" class="form-control input-circle" name="Fierro" id="Fierro'+x+'"></td>';
				tblMaterial += '<td><input type="text" class="form-control input-circle" name="Cobre" id="Cobre'+x+'"></td>';
				tblMaterial += '<td><input type="text" class="form-control input-circle" name="Manganeso" id="Manganeso'+x+'"></td>';
			}else{
				tblMaterial += '<td>'+
					'<input type="text" class="form-control input-circle" name="dosiscien" id="dosiscien'+x+'">'+
					'</td>'+
					'<td>'+
						'<input type="text" class="form-control input-circle" name="dosisHa" id="dosisHa'+x+'">'+
					'</td>';
			}
			
			tblMaterial += '<td>';
		//if(x > 0){
			tblMaterial += '<a class="" id="'+x+'" onclick="descartarMaterial('+x+');">'+
					'<i class="fa fa-minus">'+
				'</a>';
		//}
		tblMaterial += '</td>'+
		'</tr>';
	return tblMaterial;
}




function descartarMaterial(desc){
	$("#trM"+desc).remove();
}

function modalAddMaterial(id){
	//var splitId = id.split("");
	//var prgAplicacion =  $("#progAplicacion"+splitId[splitId.length-1]).val();
	var prgAplicacion =  $("#progAplicacion"+id).val();
	var addMaterial = '';
	
	
	addMaterial +='<div class="table-responsive" id="ignore">';
	addMaterial +=	'<table class="table table-striped table-condensed" id="tbl_colaboradores">';
	addMaterial +=		'<thead style="text-align: center;">';
	addMaterial +=			'<tr>';
	addMaterial +=				'<th style="text-align: center;">Material</th>';
	var width = "500px";
	if(prgAplicacion == "3"){
		addMaterial +=			'<th style="text-align: center;">Niteogeno</th>';
		addMaterial +=			'<th style="text-align: center;">Fosforo</th>';
		addMaterial +=			'<th style="text-align: center;">Potasio</th>';
		addMaterial +=			'<th style="text-align: center;">Azufre</th>';
		addMaterial +=			'<th style="text-align: center;">Calcio</th>';
		addMaterial +=			'<th style="text-align: center;">Zinc</th>';
		addMaterial +=			'<th style="text-align: center;">Fierro</th>';
		addMaterial +=			'<th style="text-align: center;">Cobre</th>';
		addMaterial +=			'<th style="text-align: center;">Manganeso</th>';
		width = "1000px";
	}else{
		addMaterial +=			'<th style="text-align: center;">Dosis (100)</th>';
		addMaterial +=			'<th style="text-align: center;">Dosis (Ha)</th>';
	}
	addMaterial +=				'<th style="text-align: center;">Descartar</th>';
	addMaterial +=			'</tr>';
	addMaterial +=		'</thead>';
	addMaterial +=		'<tbody id="tblMaterial">';
	var bodyAddMaterial = '';
	$.getJSON('/simpleWeb/json/AGRO/GETMPF/'+id,function(data){
		$.each(data, function(k,va){
			console.log(va);
			//arrIdCuartel.push(va);
			bodyAddMaterial +="<tr id='tr"+va.codigo_material+"'>" ;
			bodyAddMaterial +=	"<td>" ;
			bodyAddMaterial +=		"<select class='btn blue btn-outline btn-circle btn-md' name='material' id='material"+va.codigo_material+"  >" ;
			bodyAddMaterial +=			selectMaterial(va.codigo_material);
			//console.log(selectMaterial(va.codigo_material));
			bodyAddMaterial +=		"</select>" ;
			bodyAddMaterial +=	"</td>" ;
			//bodyAddMaterial +=	"<td>" ;
			if(prgAplicacion == "3"){
				bodyAddMaterial +=		"<td><input class='form-control input-circle' value='"+va.nitrogeno+"' name='nitrogeno' id='nitrogeno"+va.codigo_material+"'></td>" ;
				bodyAddMaterial +=		"<td><input class='form-control input-circle' value='"+va.fosforo+"' name='fosforo' id='fosforo"+va.codigo_material+"'></td>" ;
				bodyAddMaterial +=		"<td><input class='form-control input-circle' value='"+va.potasio+"' name='potasio' id='potasio"+va.codigo_material+"'></td>" ;
				bodyAddMaterial +=		"<td><input class='form-control input-circle' value='"+va.azufre+"' name='azufre' id='azufre"+va.codigo_material+"'></td>" ;
				bodyAddMaterial +=		"<td><input class='form-control input-circle' value='"+va.calcio+"' name='calcio' id='calcio"+va.codigo_material+"'></td>" ;
				bodyAddMaterial +=		"<td><input class='form-control input-circle' value='"+va.zinc+"' name='Zinc' id='Zinc"+va.codigo_material+"'></td>" ;
				bodyAddMaterial +=		"<td><input class='form-control input-circle' value='"+va.fierro+"' name='fierro' id='fierro"+va.codigo_material+"'></td>" ;
				bodyAddMaterial +=		"<td><input class='form-control input-circle' value='"+va.cobre+"' name='cobre' id='cobre"+va.codigo_material+"'></td>" ;
				bodyAddMaterial +=		"<td><input class='form-control input-circle' value='"+va.manganeso+"' name='manganeso' id='manganeso"+va.codigo_material+"'></td>" ;
			} else {
				bodyAddMaterial +=		"<td><input class='form-control input-circle' value='"+va.dosis_100+"' name='hecCuartel' id='hecCuartel"+va.codigo_material+"'></td>" ;
				bodyAddMaterial +=		"<td><input class='form-control input-circle' value='"+va.dosis_has+"' name='hecCuartel' id='hecCuartel"+va.codigo_material+"'></td>" ;
			}
			//bodyAddMaterial +=	"</td>" ;
			bodyAddMaterial +=	"<td>" ;
			bodyAddMaterial +=		"<a class='' id='"+va.codigo_material+"' onclick='descartarCuartel("+va.codigo_material+");'>";
			bodyAddMaterial +=			"<i class='fa fa-minus'>";
			bodyAddMaterial +=		"</a>" ;
			bodyAddMaterial +=	"</td>";
			bodyAddMaterial +="</tr>";
		})
	
		addMaterial += bodyAddMaterial;
		//addMaterial +=			createTblMaterial(id);
		addMaterial +=		'</tbody>';
		addMaterial +=	'</table>';
		addMaterial +='</div>';
		addMaterial +='<div style="text-align: right;">';
		addMaterial +=	'<a id="addMaterial" class="" onclick="javascript: menuAddMaterial('+id+');">';
		addMaterial +=		'<i class="fa fa-plus"></i>';
		addMaterial +=	'</a>';
		addMaterial +='</div>';
		addMaterial +='<div class="col-sm-12 col-md-12">';
		addMaterial +=		'<div class="btn btn-circle blue btn-outline" id="registrarIncidencia" onclick="addMaterial('+id+')" >Guardar</div>';
		addMaterial +=		'<div class="btn btn-circle red btn-outline" onclick="closeModal();">Cancelar</div>';
		addMaterial +='</div>';
		popUp("Seleccione Material", addMaterial, true, width, true);
	});
}

function modalAddRetirarBodega(id){
	var tblRetiroBodega = "";
	tblRetiroBodega +='<div class="table-responsive" id="ignore">';
	tblRetiroBodega +=	'<table class="table table-striped table-condensed" id="tbl_colaboradores">';
	tblRetiroBodega +=		'<thead style="text-align: center;">';
	tblRetiroBodega +=			'<tr>';
	tblRetiroBodega +=				'<th style="text-align: center;">Material</th>';
	tblRetiroBodega +=				'<th style="text-align: center;">Unidad de Medida</th>';
	tblRetiroBodega +=				'<th style="text-align: center;">Cantidad</th>';
	tblRetiroBodega +=				'<th style="width: 2%; text-align: center;">Descartar</th>';
	tblRetiroBodega +=			'</tr>';
	tblRetiroBodega +=		'</thead>';
	tblRetiroBodega +=		'<tbody id="tblRetiroBodega">';
	tblRetiroBodega += 			createTblRetiroBodega(id);
	tblRetiroBodega += 		'</tbody>';
	tblRetiroBodega +=	'</table>';
	tblRetiroBodega +='</div>';
	tblRetiroBodega +='<div style="text-align: right;">';
//	tblRetiroBodega +=	'<a id="" class="" onclick="javascript: menuAddMaquinaria('+auxEx+');">';
//	tblRetiroBodega +=		'<i class="fa fa-plus"></i>';
//	tblRetiroBodega +=	'</a>';
	tblRetiroBodega +='</div>';
	tblRetiroBodega +='<div class="col-sm-12 col-md-12">';
	tblRetiroBodega +=	'<div class="btn btn-circle blue btn-outline" id="addCuartel" onclick="addCuartel('+auxEx+')" >Guardar</div>';
	tblRetiroBodega +=	'<div class="btn btn-circle red btn-outline" onclick="closeModal();">Cancelar</div>';
	tblRetiroBodega +='</div>';
	/*popUp(Titulo, Contenido(HTML), Animacion(true o false), Tamaño(% o px), Boton Cerrar(true o false))*/
	popUp("Cantidad de material a retirar de Bodega", tblRetiroBodega, true, '600px', true);
}
function createTblRetiroBodega(id){
	auxEx++;
	var idNew = "new"+auxEx;
	var tblRetiroBodega = "";
	tblRetiroBodega += '<tr id="trnew'+auxEx+'">';
	tblRetiroBodega += 	'<td>';
	tblRetiroBodega += 		'<select class="btn blue btn-outline btn-circle btn-md" name="cuartel" id="material'+idNew+'" onchange="changeCuartel(this)">';
//	tblRetiroBodega +=			selectCuartel();
	tblRetiroBodega +=		'</select>';
	tblRetiroBodega += 	'</td>';
	tblRetiroBodega += 	'<td id="tdnew'+auxEx+'">';
	tblRetiroBodega += 		'<input class="form-control input-circle" id="uni_med'+idNew+'" name="" onselect="valHas(this.id);" onkeyup="valHas(this.id);" ">';
	tblRetiroBodega += 	'</td>';
	tblRetiroBodega += 	'<td id="tdnew'+auxEx+'">';
	tblRetiroBodega += 		'<input class="form-control input-circle" id="hecCuartel'+idNew+'" name="" onselect="valHas(this.id);" onkeyup="valHas(this.id);" ">';
	tblRetiroBodega += 		'<br><label id="lblnew'+auxEx+'" style="color: #FF0000; display: none;"">El valor no puede ser mayor a las hectareas del cuartel seleccionado</label>';
	tblRetiroBodega += 	'</td>';
	tblRetiroBodega += 	'<td>';
	tblRetiroBodega += 		'<a class="" id="desc'+idNew+'" onclick="descartarCuartel('+auxEx+');">';
	tblRetiroBodega +=			'<i class="fa fa-minus">';
	tblRetiroBodega +=		'</a>';
	tblRetiroBodega += 	'</td>';
	tblRetiroBodega += '</tr>';
	return tblRetiroBodega;
}
function modalAddMaquinaria(id){
	console.log(id)
	var tblAddMaquinaria = "";
	tblAddMaquinaria +=	'<div class="table-responsive" id="ignore">';
	tblAddMaquinaria +=		'<table class="table table-striped table-condensed" id="tbl_colaboradores">';
	tblAddMaquinaria +=			'<thead style="text-align: center;">';
	tblAddMaquinaria +=				'<tr>';
	tblAddMaquinaria +=					'<th style="text-align: center;">Maquina</th>';
	tblAddMaquinaria +=					'<th style="text-align: center;">Implemento</th>';
	tblAddMaquinaria +=					'<th style="width: 2%; text-align: center;">Descartar</th>';
	tblAddMaquinaria +=				'</tr>';
	tblAddMaquinaria +=			'</thead>';
	tblAddMaquinaria +=			'<tbody id="tblAddMaquinaria'+id+'">';
	tblAddMaquinaria += 			createtblAddMaquinaria(id);
	tblAddMaquinaria += 		'</tbody>';
	tblAddMaquinaria +=		'</table>';
	tblAddMaquinaria +=	'</div>';
	tblAddMaquinaria +=	'<div style="text-align: right;">';
	tblAddMaquinaria +=		'<a id="" class="" onclick="javascript: menuAddMaquinaria('+id+');">';
	tblAddMaquinaria +=			'<i class="fa fa-plus"></i>';
	tblAddMaquinaria +=		'</a>';
	tblAddMaquinaria +=	'</div>';
	tblAddMaquinaria +=	'<div class="col-sm-12 col-md-12">';
	tblAddMaquinaria +=		'<div class="btn btn-circle blue btn-outline" id="addCuartel" onclick="addCuartel('+auxEx+')" >Guardar</div>';
	tblAddMaquinaria +=		'<div class="btn btn-circle red btn-outline" onclick="closeModal();">Cancelar</div>';
	tblAddMaquinaria +=	'</div>';
	/*popUp(Titulo, Contenido(HTML), Animacion(true o false), Tamaño(% o px), Boton Cerrar(true o false))*/
	popUp("Agregar Maquinaria", tblAddMaquinaria, true, '500px', true);
}
function createtblAddMaquinaria(id){
	auxEx++;
	var idNew = "new"+auxEx;
	var bodyAddMaquinaria = "";
	bodyAddMaquinaria += '<tr id="trnew'+auxEx+'">';
	bodyAddMaquinaria += 	'<td>';
	bodyAddMaquinaria += 		'<select class="btn blue btn-outline btn-circle btn-md" name="cuartel" id="maquina'+idNew+'" onchange="changeCuartel(this)">';
//	tblRetiroBodega +=			selectCuartel();
	bodyAddMaquinaria +=		'</select>';
	bodyAddMaquinaria += 	'</td>';
	bodyAddMaquinaria += 	'<td>';
	bodyAddMaquinaria += 		'<select class="btn blue btn-outline btn-circle btn-md" name="cuartel" id="implemento'+idNew+'" onchange="changeCuartel(this)">';
//	tblRetiroBodega +=			selectCuartel();
	bodyAddMaquinaria +=		'</select>';
	bodyAddMaquinaria += 	'</td>';
	bodyAddMaquinaria += 	'<td>';
	bodyAddMaquinaria += 		'<a class="" id="desc'+idNew+'" onclick="descartarMaquina('+auxEx+');">';
	bodyAddMaquinaria +=			'<i class="fa fa-minus">';
	bodyAddMaquinaria +=		'</a>';
	bodyAddMaquinaria += 	'</td>';
	bodyAddMaquinaria += '</tr>';
	return bodyAddMaquinaria;
}
function menuAddMaquinaria(id){
	$("#tblAddMaquinaria"+id).append(createtblAddMaquinaria(id));
}
function descartarMaquina(e){
	$("#trnew"+e).remove();
}

