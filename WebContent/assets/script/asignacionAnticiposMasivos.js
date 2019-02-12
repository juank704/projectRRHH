$(document).ready(function(){

	$.fn.dataTable.ext.errMode = 'none';
	ListaSociedad();
	
	ListaDivision();
	ListaSubDivision();
	ListaGrupo();
	ListaSubGrupo();
	 format();
	 var SelectTrabajadorNombre = "";
		SelectTrabajadorNombre += " <option value='0'>Buscar</option>";
		$("#nombreTrabajadorB").append(SelectTrabajadorNombre);
	 $("#nombreTrabajador").select2({
		    dropdownAutoWidth : true
		});
	 $("#select2-nombreTrabajadorB-container").css("text-align", "center");



	$("#nombreTrabajador").change(function(event){
		
		
		var codigoTrabajador = $("#nombreTrabajador").val();

			$.getJSON("/simpleWeb/json/work/cargarXCodTrabajador/" + codigoTrabajador , function(data){

			  
				$.each(data, function(k, v){
					
					$('#tipodivision option[value='+v.division+']').attr('selected','selected');
					$('#tiposubdivision option[value='+v.subDivision+']').attr('selected','selected');
					$('#listagrupo option[value='+v.grupo+']').attr('selected','selected');
					$('#listasubgrupo option[value='+v.subgrupo+']').attr('selected','selected');

				})
			});
	});
	$("#loading").hide();
});



function ListaSociedad(){
	
	$.getJSON("/simpleWeb/json/work/ListaSociedad/", function(data){
		datos = data;
		$.each(data, function(k, v){
			var SelectSociedad = "";	
			SelectSociedad += 	"<option value="+v.idSociedad+">"+v.denominacionSociedad+"</option>";
			
			
			$("#SociedadUpdate").append(SelectSociedad);
			$("#SociedadB").append(SelectSociedad);
			
		})
});
}
function ListaDivision(){
	
	$.getJSON("/simpleWeb/json/work/ListaDivision/", function(data){
		datos = data;
		$.each(data, function(k, v){
			var SelectDivision = "";	
			SelectDivision += 	"<option value="+v.id+">"+v.descripcion+"</option>";
			
			$("#tipodivisionB").append(SelectDivision);
			$("#tipodivisionUpdate").append(SelectDivision);
			
		})
});
}
function ListaSubDivision(){
	
	$.getJSON("/simpleWeb/json/work/ListaSubDivision/", function(data){
		datos = data;
		$.each(data, function(k, v){
			var SelectSubDivision = "";	
			SelectSubDivision += 	"<option value="+v.id+">"+v.descripcion+"</option>";
			
			$("#tiposubdivisionB").append(SelectSubDivision);
			$("#tiposubdivisionUpdate").append(SelectSubDivision);
			
		})
});
}
function ListaGrupo(){
	
	$.getJSON("/simpleWeb/json/work/ListaGrupo/", function(data){
		datos = data;
		$.each(data, function(k, v){
			var SelectGrupo = "";	
			SelectGrupo += 	"<option value="+v.id+">"+v.descripcion+"</option>";
			
			$("#listagrupoB").append(SelectGrupo);
			$("#listagrupoUpdate").append(SelectGrupo);
			
		})
});
}
function ListaSubGrupo(){
	
	$.getJSON("/simpleWeb/json/work/ListaSubGrupo/", function(data){
		datos = data;
		$.each(data, function(k, v){
			var SelectSubGrupo = "";	
			SelectSubGrupo += 	"<option value="+v.id+">"+v.descripcion+"</option>";
			
			$("#listasubgrupoB").append(SelectSubGrupo);
			$("#listasubgrupoUpdate").append(SelectSubGrupo);
			
		})
});
}

$("#SociedadB").change(function(){
	
  var soc = $("#SociedadB").val();
	
	if(soc === ''){return;}

	$("#tipodivisionB").val("");
	var tipo_subdivision = $("#tiposubdivisionB").val("");
	var grupo = $("#listagrupoB").val("");
	var tipo_grupo = $("#listasubgrupoB").val();

	var rut_trabajador = $("#rutTrabajadorB").val();
	 
	
	lodtrab2();
	
});



function lodtrab2() {

	$("#loading").show();
	$("#nombreTrabajadorB").empty();
	
	var valueSociedad = $('#SociedadB').val();
	var SelectTrabajadorNombre = "";
	SelectTrabajadorNombre += " <option value='0'>Buscar</option>";
	$("#nombreTrabajadorB").append(SelectTrabajadorNombre);
	$.getJSON(
			"/simpleWeb/json/work/LoadTrabajadorXSociedadAnticiposSimple/"
					+ valueSociedad,
			function(data) {
				console.log(data);

				$.each(data, function(k, v) {

					var SelectTrabajador = "";

					var SelectTrabajadorNombre = "";
					SelectTrabajadorNombre += "<option value="
							+ v.codigotrabajador + ">" + v.codigotrabajador
							+ "|" + v.nombre + " " + v.apellidoPaterno + " "
							+ v.apellidoMaterno + "|" + v.rut + "</option>";
					$("#nombreTrabajadorB").append(SelectTrabajadorNombre);

				});

			}).done(function() {
		$("#loading").hide();

	})
}

var numero = 0;
Array_total_monto = [];
Array_numero_fila = [];




function formatNumber (n) {
	n = String(n).replace(/\D/g, "");
	return n === '' ? n : Number(n).toLocaleString();
}
function format() {
	var number = $('.number');
	for(var i = 0; i < number.length; i++){
		number[i].addEventListener('keyup', function(e){
			var element = e.target;
			var value = element.value;
			element.value = formatNumber(value);
		})
	}
}	

function buscarTrabajadorByParams(){
	
	BuscarAnticipoSimple();
	
}


function BuscarAnticipoSimple(){
	var periodo = $("#periodoRemuneracionesB").val();
	
	if(periodo === ''){
		
		periodo = null;
	}else{
		periodo = $("#periodoRemuneracionesB").val().replace(/-/gi, "");;
	}
	
	
	var sociedad = $("#SociedadB").val();
	if(sociedad == ''){
		sociedad = null;
	}else{
		 sociedad = $("#SociedadB").val();
	}
	
	var tipo_division = $("#tipodivisionB").val();
	if(tipo_division == ''){
		tipo_division = null;
	}else{
		 tipo_division = $("#tipodivisionB").val();
	}
	
	var tipo_subdivision = $("#tiposubdivisionB").val();
	if(tipo_subdivision == ''){
		tipo_subdivision = null;
	}else{
		tipo_subdivision = $("#tiposubdivisionB").val();
	}
	
	var grupo = $("#listagrupoB").val();
	if(grupo == ''){
		grupo = null;
	}else{
		 grupo = $("#listagrupoB").val();
	}
	
	var tipo_grupo = $("#listasubgrupoB").val();
	if(tipo_grupo == ''){
		tipo_grupo = null;
	}else{
	  tipo_grupo = $("#listasubgrupoB").val();
	}
	
	var fechaPago = $("#fechaPagoB").val();
	if(fechaPago == ''){
		fechaPago = null;
	}else{
		fechaPago = $("#fechaPagoB").val();
	}
	
	var nombre_trabajador = $("#nombreTrabajadorB").val();
	if(nombre_trabajador == '0'){
		nombre_trabajador = null;
	}else{
		nombre_trabajador = $("#nombreTrabajadorB").val();
	}
	
	
	
	
	$('#tbl_Info').dataTable().fnClearTable();
	$('#tbl_Info').dataTable().fnDestroy();
	

	$("#loading").show();
	$.getJSON("/simpleWeb/json/work/BuscarAsignacionSimple/" + periodo + "," + fechaPago + ","+nombre_trabajador+","+sociedad+","+tipo_division+","+tipo_subdivision+","+grupo+","+tipo_grupo+"", function(data){
		
	console.log(data);
		var numero = 1;
		$.each(data, function(k, v){
			
			var bodyPreselect = "";
			bodyPreselect += "<tr id='td"+k+"'>";
			bodyPreselect += 	"<td  style='text-align: center;'>"+v.fecha+"</td>";
			bodyPreselect += 	"<td style='text-align: center;'>"+v.codtrabajador+"</td>";
			bodyPreselect += 	"<td style='text-align: center;'>"+v.nombre+" "+v.appaterno+" "+v.appmaterno+"</td>";
			bodyPreselect += 	"<td id='number' style='text-align: center;'>"+String(v.montoingresado).replace(/(.)(?=(\d{3})+$)/g,'$1.')+"</td>";
			bodyPreselect += 	"<td id='"+k+"' style='text-align: center;'>";
			bodyPreselect +=		"<button title='Actualizar' id='"+v.id+"' onclick='editarFicha(this.id);' class='btn btn-circle yellow btn-outline btn-sm'><i class='fa fa-pencil-square-o fa-lg'></i></button>";
			bodyPreselect +=		"<button title='Eliminar' id='"+v.id+"' onclick='eliminarSolicitud(this.id);' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button>"
			bodyPreselect +=	"</td>";
			bodyPreselect += "</tr>" ;
			$("#tblPeticion2").append(bodyPreselect);
		})
		$("#loading").hide();
		$('#tbl_Info').DataTable({
			"sPaginationType": "full_numbers" ,
			
			
	});  
		$('#tbl_Info').DataTable({
			"sPaginationType": "full_numbers" ,
			
	}); 

});
}
function editarFicha(id){

	$('#ModalUpdate').modal('show');
	
	$
			.getJSON(
					"/simpleWeb/json/work/cargarPopupUpdateasignacionAnticiposIndividuales/"+ id, function(data) {

						console.log(data);
						var numero = 1;
						$.each(data, function(k, v) {
							var str = v.periodo;
							 var res1 = str.toString().substr(0,4);
						     var res2 = str.toString().substr(-2);
						     var res3 = res1+"-"+res2;
						     
							$("#cod_trabUpdate").val(v.codtrabajador);
							$("#nombre_trabUpdate").val(v.nombre+" "+v.appaterno+" "+v.appmaterno);
							$("#periodoRemuneracionesUpdate").val(res3);
							$("#fechaPagoUpdate").val(v.fecha);
							$('#SociedadUpdate option[value='+v.empresa+']').attr('selected','selected');
							$('#tipodivisionUpdate option[value='+v.division+']').attr('selected','selected');
							$('#tiposubdivisionUpdate option[value='+v.subDivision+']').attr('selected','selected');
							$('#listagrupoUpdate option[value='+v.grupo+']').attr('selected','selected');
							$('#listasubgrupoUpdate option[value='+v.subgrupo+']').attr('selected','selected');
							$("#montoTrabajadorUpdate").val(v.montoingresado);
							$('.idupdate').attr('id', v.id);

						})

					}).done(function() {
				$("#loading").hide();
			})
	
	
}

function actualizarTrabajador(id){
	
	var cod = $("#cod_trabUpdate").val();
	var nombre = $("#nombre_trabUpdate").val();
	var periodo_u = $("#periodoRemuneracionesUpdate").val().replace(/-/gi, "");;
	var tipoPago_u = $('#TipodePagoUpdate').val();
	var fecha_u = $("#fechaPagoUpdate").val();
	var empresa_u = $('#SociedadUpdate').val();
	var division_u = $('#tipodivisionUpdate').val();
	var subdivision_u = $('#tiposubdivisionUpdate').val();
	var grupo_u = $('#listagrupoUpdate').val();
	var subgrupo_u = $('#listasubgrupoUpdate').val();
	var monto = $("#montoTrabajadorUpdate").val();
	
	var montoN2 = monto.toString().replace(/\./g, '');
	var id_u = id; 
	
		var row = {

			periodo : periodo_u,
			fecha :fecha_u,
			montoingresado : montoN2,
			id : id_u
		
	}
	$.ajax({
		url : "/simpleWeb/json/work/UpdateAnticiposIndividuales/",
		type : "PUT",
		data : JSON.stringify(row),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
			$("#loading").show();

		},
		success : function(data, textStatus, jqXHR) {
			
			$('#ModalUpdate').modal('toggle');
			alerta("Actualizado con Exito");
			$('#tbl_Info').dataTable().fnClearTable();
			$('#tbl_Info').dataTable().fnDestroy();
			
			var periodo = $("#periodoRemuneracionesB").val();
			var tipo_pago = $("#TipodePagoB").val();
			
			var sociedad = $("#Sociedad").val();
			var tipo_division = $("#tipodivision").val();
			var tipo_subdivision = $("#tiposubdivision").val();
			var grupo = $("#listagrupo").val();
			var tipo_grupo = $("#listasubgrupo").val();
			var nombre_trabajador = $("#nombreTrabajador").val(); 
			var rut_trabajador = $("#rutTrabajador").val();
			
			var fechaPago = $("#fechaPagoB").val();
			
			
			
				if ( periodo != '' && tipo_pago == '' && fechaPago == '' ){
					
					$('#tbl_Info').dataTable().fnClearTable();
				    $('#tbl_Info').dataTable().fnDestroy();
				    cargarxperiodo();
				  
				
			    } else if ( periodo == '' && tipo_pago != '' && fechaPago == '' ){	
			    	
			    	cargarxTipoPago();
			    }
			    else if ( periodo == '' && tipo_pago == '' && fechaPago != '' ){	
			    	cargarxfecha();
			    }
			
			
			

			$("#loading").hide();

		},
		error : function(ex) {
			console.log(ex);
		}
	})
}

function eliminarSolicitud(id){
	
	 var popupCierre = "";

	
	 popupCierre +='<div class="col-sm-12 col-md-12">';
	 popupCierre +=          "<div class='btn btn-circle green btn-outline'  onclick='enviarEliminar("+id+");'><i class='fa fa-clock-o'></i> Confirmar</div>";
	 popupCierre +=          "<div class='btn btn-circle red btn-outline' onclick='closeModal();'> Cancelar</div>";
	 popupCierre +='</div>';

	    popUp("Esta Seguro de Eliminar", popupCierre, true, "400px", true);
}

function enviarEliminar(id) {

	var row = {
		id : id

	}
	$.ajax({
		url : "/simpleWeb/json/work/EliminarAnticipoSimple/",
		type : "PUT",
		data : JSON.stringify(row),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success : function(data, textStatus, jqXHR) {
			closeModal();
			alerta("Eliminado con Exito")
			$('#tbl_Info').dataTable().fnClearTable();
			$('#tbl_Info').dataTable().fnDestroy();
			
			var periodo = $("#periodoRemuneracionesB").val();
			var tipo_pago = $("#TipodePagoB").val();
			
			var sociedad = $("#Sociedad").val();
			var tipo_division = $("#tipodivision").val();
			var tipo_subdivision = $("#tiposubdivision").val();
			var grupo = $("#listagrupo").val();
			var tipo_grupo = $("#listasubgrupo").val();
			var nombre_trabajador = $("#nombreTrabajador").val(); 
			var rut_trabajador = $("#rutTrabajador").val();
			
			var fechaPago = $("#fechaPagoB").val();
			
			
			
				if ( periodo != '' && tipo_pago == '' && fechaPago == '' ){
					
					$('#tbl_Info').dataTable().fnClearTable();
				    $('#tbl_Info').dataTable().fnDestroy();
				    cargarxperiodo();
				  
				
			    } else if ( periodo == '' && tipo_pago != '' && fechaPago == '' ){	
			    	
			    	cargarxTipoPago();
			    }
			    else if ( periodo == '' && tipo_pago == '' && fechaPago != '' ){	
			    	cargarxfecha();
			    }

			

		},
		error : function(ex) {

		}

	})

}
