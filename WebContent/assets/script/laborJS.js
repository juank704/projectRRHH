$(document).ready(function(){
	loadLabores();
});
var labores = [];
var jsonLabores = {
	codigo: 10063,
	descripcion: 'Labor 1',
	tipo: 'trabajo',
	unidad: 'Metros',
	precio: '3500',
	fecha_inicio: '2018-02-26',
	fecha_fin: '2018-03-05',
	estado: 'Pendiente'
}
labores.push(jsonLabores);
var dataHuerto;
var especie;
function loadLabores(){
	dataHuerto = JSON.parse(localStorage.getItem("dataHuerto"));
	var selectHuerto = "<option value=''>Seleccione</option>";
	$.each(dataHuerto, function(ks,va){
		selectHuerto += "<option value='"+va.id+"'>"+va.valor1+"</option>";
	})
	$("#dataHuerto").append(selectHuerto);
	$('#BodyLabor').html("");
	$.each(labores, function(k,v){
		var tBody = '<tr>'+
			'<td>'+v.codigo+'</td>'+
			'<td>'+v.descripcion+'</td>'+
			'<td>'+v.tipo+'</td>'+
			'<td>'+v.unidad+'</td>'+
			'<td>'+v.precio+'</td>'+
			'<td>'+v.fecha_inicio+'</td>'+
			'<td>'+v.fecha_fin+'</td>'+
			'<td>'+v.estado+'</td>'+
			"</td><td><a id='editCol' onclick='javascript: addLabor("+v.codigo+");' title='Modificar' class='btn btn-circle yellow btn-outline'><i class='fa fa-pencil-square-o fa-lg'></i></a>" +
			"<a id='delCol' title='Eliminar' onclick='javascript: delCol("+v.codigo+");' class='btn btn-circle red btn-outline'><i class='fa fa-trash-o fa-lg'></i></a>" +
			"</td></tr>";
		$('#BodyLabor').append(tBody);
	})
}
function addLabor(codigo){
	console.log(codigo);
	var descripcion = "";
	var tipo = "";
	var unidad = "";
	var precio = "";
	var fecha_inicio = "";
	var fecha_fin = "";
	var estado = "";
	var titulo = "Registrar Labores";
	if(codigo == undefined){
		codigo = "";
	}else{
		titulo = "Modificar Labor"
		$.each(labores, function(ka,va){
			if(codigo == va.codigo){
				console.log(va);
				descripcion = va.descripcion;
				tipo = va.tipo;
				unidad = va.unidad;
				precio = va.precio;
				fecha_inicio = va.fecha_inicio;
				fecha_fin = va.fecha_fin;
				estado = va.estado;
			}
		})
	}
	swal({
		title: titulo,
		html: '<div class="col-xs-12 col-md-12 col-lg-12" id="formProductor">'+
						'<div class="box-datos-generales" style="width: 100%">'+
					'<div class="col-xs-12 col-md-12 col-lg-12">'+
						'<div class="col-xs-12 col-md-4 col-lg-4 portlet light bordered">'+
							'<h4>Codigo</h4>'+
							'<input type="text" class="form-control input-circle ui-autocomplete-input" id="codigoLabor" value='+codigo+' disabled>'+
						'</div>'+
						'<div class="col-xs-12 col-md-4 col-lg-4 portlet light bordered">'+
							'<h4>Descripción</h4>'+
							'<input type="text" class="form-control input-circle ui-autocomplete-input" id="descripcionLabor" value='+descripcion+'>'+
						'</div>'+
						'<div class="col-xs-12 col-md-4 col-lg-4 portlet light bordered">'+
							'<h4>Tipo</h4>'+
							'<input type="text" class="form-control input-circle ui-autocomplete-input" id="tipoLabor" value='+tipo+'>'+
						'</div>'+
						'<div class="col-xs-12 col-md-4 col-lg-4 portlet light bordered">'+
							'<h4>Unidad de Medida</h4>'+
							'<select class="btn blue btn-outline btn-circle btn-md" id="unidadSelect" value='+unidad+'>'+
								'<option value="">Seleccione</option>'+
								'<option value="Metros">Metros</option>'+
								'<option value="Kilos">Kilos</option>'+
								'<option value="Cantidad">Cantidad</option>'+
							'</select>'+ 
						'</div>'+
						'<div class="col-xs-12 col-md-4 col-lg-4 portlet light bordered">'+
							'<h4>Precio</h4>'+
							'<input type="text" class="form-control input-circle ui-autocomplete-input" id="precioLabor" value='+precio+' >'+
						'</div>'+
						'<div class="col-xs-12 col-md-4 col-lg-4 portlet light bordered">'+
							'<h4>Fecha Inicio</h4>'+
							'<input type="date" class="form-control input-circle ui-autocomplete-input" id="fecha_inicioLabor" value="'+fecha_inicio+'" >'+
						'</div>'+
						'<div class="col-xs-12 col-md-4 col-lg-4 portlet light bordered">'+
							'<h4>Fecha Termino</h4>'+
							'<input type="date" class="form-control input-circle ui-autocomplete-input" id="fecha_finLabor" value='+fecha_fin+' >'+
						'</div>'+
						'<div class="col-xs-12 col-md-4 col-lg-4 portlet light bordered">'+
							'<h4>Estado</h4>'+
							'<input type="text" class="form-control input-circle ui-autocomplete-input" id="estadoLabor" value='+estado+' >'+
						'</div>'+
					'</div>'+
				'</div>'+
				'<div class="col-sm-12 col-md-12">'+
					'<div class="btn btn-circle blue btn-outline" id="registrarLabores" >Registrar Labores</div>'+
					'<div class="btn btn-circle red btn-outline" id="cancelarRegistrarLabores">Cancelar</div>'+
				'</div>'+
			'</div>',
		animation: true,
		width: '80%',
		closeButtonAriaLabel: 'Cancelar esta operacion',
		showCloseButton: true,
		showConfirmButton: false,
		focusConfirm: false,
		allowOutsideClick: false,
		allowEscapeKey: true
	});
	$("#registrarLabores").click(function(){
		if(!$("#codigoLabor").val()){
			alert("No ha ingresado un codigo");
			return;
		}else if(!$("#descripcionLabor").val()){
			alert("No ha ingresado una descripcion");
			return;
		}else if(!$("#tipoLabor").val()){
			alert("No ha seleccionado una faena");
			return;
		}else if(!$("#unidadSelect").val()){
			alert("No ha seleccionado un tipo de labor");
			return;
		}else{
			var newLabores = {
				codigo : $("#codigoLabor").val(),
				descripcion: $("#descripcionLabor").val(),
				tipo: $("#tipoLabor").val(),
				unidad: $("#unidadSelect").val(),
				precio: $("#precioLabor").val(),
				fecha_inicio: $("#fecha_inicioLabor").val(),
				fecha_fin: $("#fecha_finLabor").val(),
				estado: $("#estadoLabor").val()
			}
			labores.push(newLabores);
			console.log(labores);
			loadLabores();
			swal.closeModal();
//			$.ajax({
//				url : "/simpleWeb/json/map/addIncidencia/",
//				type : "PUT",
//				data : JSON.stringify(incidencia),
//				beforeSend : function(xhr) {
//					xhr.setRequestHeader("Accept","application/json");
//					xhr.setRequestHeader("Content-Type","application/json");
//				},
//				success : function(data, textStatus, jqXHR) {
//					alert("Incidencia Registrada con exito");
//					swal.closeModal();
//				},
//				error : function(ex) {
//					console.log(ex);
//				}
//			});
		}
	});
	$("#cancelarRegistrarLabores").click(function(){
		swal.closeModal();
	})
}