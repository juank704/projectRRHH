$(document).ready(function(){
	loadTable();
	llenarSelect();
//	buscadorRut();
	setFormatInputs();
})

var datos;
var chechTr = [];

$("#addWorker").click(function(){
	window.location.href = "/simpleWeb/webApp/trabajadorContratista";
})
$("#addGroupToWorkersForm").submit(function(event) {
	var checktbl=new Array();

	$('#dataBodyC input[type=checkbox]:checked').each(function() {
		checktbl.push($(this).val());

	});
	if($("#nombreGrupo")!=""){
		var nombre=$("#nombreGrupo").val();
		$.ajax({
			type: "POST",
			async: false,			    
			url: "/simpleWeb/json/work/groups/"+nombre+"/"+checktbl,			  
			success:function (data){
				swal({
					position: 'top-end',
					type: 'success',
					title: 'Datos Agregados Correctamente',
					showConfirmButton: false,
					timer: 1500
				});
			},
			error:function (ex){
				swal({
					title: '<i>ERROR</i>',
					type: 'info',
					html: JSON.stringify(ex),
					showCloseButton: true,
					showCancelButton: true,
					focusConfirm: false,
					confirmButtonText:
						'<i class="fa fa-thumbs-up"></i>OK!',
						confirmButtonAriaLabel: 'Thumbs up, great!',
						cancelButtonText:
							'<i class="fa fa-thumbs-down"></i>',
							cancelButtonAriaLabel: 'Thumbs down',
				});
			}
		});
	}
	else{
		swal({
			position: 'top-end',
			type: 'error',
			title: 'no se seleccionó ningun trabajador',
			showConfirmButton: false,
			timer: 1500
		});
	}
});

function setFormatInputs(){
	
	// Colocar todos los select en mayusculas
	$(document).find('select').each(function(key, value){
		$(value).addClass('mayusculasWork');
	});

	$(document).find('input').each(function(key, value){
		$(value).addClass('text-uppercase');
	});
	
}

function detCol(id){
	window.location.href = ("trabajadorContratista?id="+id);
}
function selectTr(tr, idtr){
	if(tr.checked == true){
		$("#"+idtr.id).removeClass("success");
		$("#"+idtr.id).addClass("success");
	}else{
		$("#"+idtr.id).removeClass("success");
	}
}
function addMovPersonal(){
	$('input[type=checkbox]:checked').each(function() {
		chechTr.push($(this).val());
	});
	if(chechTr.length != 0){
		window.location.href = ("addMovPersonal?cod="+chechTr);
	}else{
		swal({
			position: 'top-end',
			type: 'error',
			title: 'no se seleccionó ningun trabajador',
			showConfirmButton: false,
			timer: 1500
		});
		return;
	}
}

function addTest(){
	$('input[type=checkbox]:checked').each(function() {
		chechTr.push($(this).val());
	});
	var pos = chechTr.indexOf('on');
	if(pos > -1){
		var elementoEliminado = chechTr.splice(pos, 1);
	}
	if(chechTr.length != 0){
		window.location.href = ("test?cod="+chechTr);
	}else{
		swal({
			position: 'top-end',
			type: 'error',
			title: 'no se seleccionó ningun trabajador',
			showConfirmButton: false,
			timer: 1500
		});
		return;
	}
}
function filter(input){
	$("#tblCola").html("");
	$.each(datos, function(kDatos, v){
		if(v.hasOwnProperty(input.id)){
			if(input.id == "codigo"){
				if(v.codigo.match(input.value)){
					llenarTabla(v);
				}
			}else if(input.id == "nombre"){
				if(v.nombre.toUpperCase().match(input.value.toUpperCase())){
					llenarTabla(v);
				}
			}
		}
	})
}

function imprimir(id){
	var imprimir = "";
	imprimir +='<div class="table-responsive">';
	imprimir +=	'<table class="table table-striped table-condensed table-bordered" id="tbl_colaboradores">';
	imprimir +=		'<thead style="text-align: center;">';
	imprimir +=			'<tr>';
	imprimir +=				'<th style="text-align: center;">Documento</th>';
	imprimir +=				'<th style="text-align: center;">Imprimir</th>';
	imprimir +=			'</tr>';
	imprimir +=		'</thead>';
	imprimir +=		'<tbody id="tblMaterial">';
	imprimir +=			"<tr>";
	imprimir +=				"<th>Contrato</th>";
	imprimir +=				"<td><input type='checkbox' id='hola' data-toggle='toggle' onchange='selected(this);' data-onstyle='success' data-size='mini'></td>";
	imprimir +=			"</tr>";
	imprimir +=			"<tr>";
	imprimir +=				"<th>Anexo de Horas Extraordinarias</th>";
	imprimir +=				"<td><input type='checkbox' id='docContrato' data-toggle='toggle' onchange='selected(this);' data-onstyle='success' data-size='mini'></td>";
	imprimir +=			"</tr>";
	imprimir +=			"<tr>";
	imprimir +=				"<th>Derecho a Saber</th>";
	imprimir +=				"<td><input type='checkbox' id='docContrato' data-toggle='toggle' onchange='selected(this);' data-onstyle='success' data-size='mini'></td>";
	imprimir +=			"</tr>";
	imprimir +=		'</tbody>';
	imprimir +=	'</table>';
	imprimir +='</div>';
	imprimir +='<div class="col-sm-12 col-md-12">';
	imprimir +=		"<div class='btn btn-circle red btn-outline' onclick='confirmRechazar();'>Imprimir</div>";
	imprimir +='</div>';
	popUp("Impresion de Documentos", imprimir, true, "500px", true);
}

function generarContrato(id){
	window.open('/simpleWeb/json/work/generaContratoTrabajador.html?id='+id);
}

function fanticipos(){
	$('input[type=checkbox]:checked').each(function() {
		chechTr.push($(this).val());
	});
	var pos = chechTr.indexOf('on');
	if(pos > -1){
		var elementoEliminado = chechTr.splice(pos, 1);
	}
	if(chechTr.length != 0){
		window.location.href = ("anticipos?id="+chechTr);
	}else{
		swal({
			position: 'top-end',
			type: 'error',
			title: 'no se seleccionó ningun trabajador',
			showConfirmButton: false,
			timer: 1500
		});
		return;
	}
}




function selectALL(all){
	console.log(all);
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
function delCol(id){
	var c = confirm("Este trabajador se eliminara ¿Esta Seguro?");
	if(c == true){
		$.ajax({
			url:	"/simpleWeb/json/map/delTrabajador/"+id,
			type:	"POST",
			success: function(){
				alert("Trabajador eliminado");
				loadWorker();
			},
			error: function(a, b){
				console.log(a);
			}
		});
	}else{
		alert("Operacion cancelada");
	}
}
function editCol(id){

	window.location.href = ("detalleTrabajador?id="+id); 
}

function editEmpresa(id){
	window.location.href = ("cambioempresa.html?id="+id);
}

function contratoMasivos(){

	var checkArr = [] 

	$('input[type=checkbox]:checked').each(function() {
		chechArr.push($(this).val());
	});

	var pos = checkArr.indexOf('on');
	if(pos > -1){
		var elementoEliminado = checkArr.splice(pos, 1);
	}
	if(checkArr.length != 0){
		window.location.href = ("contratos?id="+checkArr);
	}else{
		swal({
			position: 'top-end',
			type: 'error',
			title: 'no se seleccionó ningun trabajador',
			showConfirmButton: false,
			timer: 1500
		});
		return;
	}


}

function llenarSelect(){
	$.ajax({
		type: "GET",
		async: false,			    
		url: "/simpleWeb/json/work/groups/getGroups/",			  
		success:function (data){
			$("#SelectGroup").append('<option value=0>Seleccionar...</option>');
			$.each(data,function(key, registro) {
				$("#SelectGroup").append('<option value='+registro.idGrupo+'>'+registro.nombreGrupo+'</option>');

			});
			$("#SelectGroup").append('<option value=-1>Todos</option>');

		},
		error:function (ex){
			swal({
				title: '<i>ERROR</i>',
				type: 'info',
				html: JSON.stringify(ex),
				showCloseButton: true,
				showCancelButton: true,
				focusConfirm: false,
				confirmButtonText:
					'<i class="fa fa-thumbs-up"></i>OK!',
					confirmButtonAriaLabel: 'Thumbs up, great!',
					cancelButtonText:
						'<i class="fa fa-thumbs-down"></i>',
						cancelButtonAriaLabel: 'Thumbs down',
			});

		}

	});

}
function contratoMasivos(){
	$('input[type=checkbox]:checked').each(function() {
		chechTr.push($(this).val());
	});
	var pos = chechTr.indexOf('on');
	if(pos > -1){
		var elementoEliminado = chechTr.splice(pos, 1);
	}
	if(chechTr.length != 0){
		window.location.href = ("contratos/?id="+chechTr);
	}else{
		swal({
			position: 'top-end',
			type: 'error',
			title: 'no se seleccionó ningun trabajador',
			showConfirmButton: false,
			timer: 1500
		});
		return;
	}	
}
function addToGroup()
{
	var checkArray=new Array();

	$('input[type=checkbox]:checked').each(function() {
		if($(this).val()=="on")
		{

		}
		else{
			checkArray.push($(this).val());
		}

	});
	getTrabajadoresByIds(checkArray);


}
function getTrabajadoresByIds($checkArray){

	var table;
	if($checkArray.length>0){

		if ( $.fn.dataTable.isDataTable( '#addGroupTable' ) ) {
			table = $('#addGroupTable').DataTable();
			table.clear();
		}
		else {
			table = $('#addGroupTable').DataTable( 
					{
						searching: true,
						paging: false,
						info: false,
						search: true
					}
			)
		}
		$.ajax({
			type: "GET",
			async: false,			    
			url: "/simpleWeb/json/work/gruops/getTrabajadoresByIds/"+$checkArray,			  
			success:function (data){
				$.each(data, function(k, v) {
					table.row.add([  v.id, v.rut, v.nombre, v.apellidoPaterno ]);
				});
				table.draw();
				$("#addGroupToWorkersModal").modal("toggle");

			},
			error:function (ex){
				swal({
					title: '<i>ERROR</i>',
					type: 'info',
					html: JSON.stringify(ex),
					showCloseButton: true,
					showCancelButton: true,
					focusConfirm: false,
					confirmButtonText:
						'<i class="fa fa-thumbs-up"></i>OK!',
						confirmButtonAriaLabel: 'Thumbs up, great!',
						cancelButtonText:
							'<i class="fa fa-thumbs-down"></i>',
							cancelButtonAriaLabel: 'Thumbs down',
				});

			}

		});
		var checkArray=new Array();

	}
	else{
		swal({
			position: 'top-end',
			type: 'error',
			title: 'no se seleccionó ningun trabajador',
			showConfirmButton: false,
			timer: 1500
		});
	}
}
function clearData(){
	var checkArray=new Array();
	$("#addGroupToWorkersModal").modal("toggle");

}

function buscadorRut(){

	$("#buscador_rut").Rut({format_on: 'keyup'})

	$("#buscador_rut").on('keyup', function (){
		var table = $('#datatable_ajax').DataTable();

		table.column(2).search( this.value ).draw();

	});

}


function loadTable() {

	//inicializo la tabla
	var table;	
	if ( $.fn.dataTable.isDataTable( '#datatable_ajax' ) ) {
		table = $('#datatable_ajax').DataTable();
		table.clear();
	}
	else {
		table = $('#datatable_ajax').DataTable( 
				{
					searching: true,
					paging:true,
					info: false,
					search: true,
				}
		)	    
	}



	$.ajax({
		type: "GET",
		async: false,			    
		url: "/simpleWeb/json/work/getTrabajadorByColumnAndValue/tipoTrabajador=4",			  
		success:function (data){

			$.each(data, function(k, v) {
				var acciones = ""
					acciones +=	"<a id='detCol' onclick='javascript: detCol("+v.id+");' title='Detalles' class='btn btn-circle yellow btn-outline btn-sm'><i class='fa fa-pencil-square-o fa-lg'></i></a>"
					acciones +=	"<a id='delCol' title='Eliminar' onclick='javascript: delCol("+v.id+");' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-trash-o fa-lg'></i></a>"
				acciones += "</div>";
				table.row.add([ "<input type='checkbox' style='margin-left:auto; margin-right:auto;' title='Seleccionar "+v.nombre+" "+v.apellidoPaterno+"' id='"+v.id+"' value='"+v.id+"' name='check'  class='checkbox'/>" ,
					v.codigo,
					v.rut,
					v.apellidoPaterno +" "+ v.apellidoMaterno +" "+ v.nombre,
					v.telefono,
					v.celular,
					v.email,
					acciones
					]);
			});
			table.draw();
			$("#loading").hide();

		},
		error:function (ex){
			swal({
				title: '<i>ERROR</i>',
				type: 'info',
				html: JSON.stringify(ex),
				showCloseButton: true,
				showCancelButton: true,
				focusConfirm: false,
				confirmButtonText:
					'<i class="fa fa-thumbs-up"></i>OK!',
					confirmButtonAriaLabel: 'Thumbs up, great!',
					cancelButtonText:
						'<i class="fa fa-thumbs-down"></i>',
						cancelButtonAriaLabel: 'Thumbs down',
			});

		}

	});

}
function selectingGroup($this){
	if($this==-1)
	{

		loadTable();
		var all=document.getElementById("checkAll").checked=false;
	}
	else if($this==0){

	}
	else{
		loadGroups($this);
	}


}
function loadGroups($value)
{
	//inicializo la tabla
	var table;	
	if ( $.fn.dataTable.isDataTable( '#datatable_ajax' ) ) {
		table = $('#datatable_ajax').DataTable();
		table.clear();
	}
	else {
		table = $('#datatable_ajax').DataTable( 
				{
					searching: true,
					paging:true,
					info: false,
					search: true
				}
		)	    
	}
	$.ajax({
		type: "GET",
		async: false,			    
		url: "/simpleWeb/json/work/groups/getWorkersByGroup/"+$value,			  
		success:function (data){

			$.each(data, function(k, v) {
				var acciones = ""
					acciones +=		"<div class='dropdown dropleft' style='float: left;'>";
				acciones +=			"<button class='btn btn-circle yellow btn-outline btn-sm dropdown-toggle' title='Modificar' type='button' data-toggle='dropdown'>";
				acciones +=			"<span class='fa fa-pencil-square-o fa-lg'></span></button>";
				acciones +=			"<ul class='dropdown-menu' style='max-width: 100px important;'>";
				acciones +=				"<li><a href='cambioempresa?id="+v.id+"' onclick='javascript: editEmpresa("+v.id+");'>Cambio de Empresa</a></li>";
				acciones +=				"<li><a href='separacion?id="+v.id+"'>Separacion</a></li>";
				acciones +=				"<li><a href='anticipos?id="+v.id+"'>Anticipos</a></li>";
				acciones +=				"<li><a href='vacaciones?id="+v.id+"'>Vacaciones</a></li>";
				acciones +=				"<li class='divider'></li>";
				acciones +=				"<li><a href='#' onclick='generarContrato("+v.id+")'>Ver contrato</a></li>";
				acciones +=				"<li><a onclick='imprimir("+v.id+")'>Impresion</a></li>";
				acciones +=			"</ul>";
				acciones +=			"</div>";
				acciones +=				"<a id='detCol' onclick='javascript: detCol("+v.id+");' title='Detalles' class='btn btn-circle blue btn-outline btn-sm'><i class='fa fa-align-justify'></i></a>"
				acciones +=				"<a id='delCol' title='Eliminar' onclick='javascript: delCol("+v.id+");' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-trash-o fa-lg'></i></a>"
				acciones += "</div>";
				table.row.add([ "<input type='checkbox' style='margin-left:auto; margin-right:auto;' title='Seleccionar "+v.nombre+" "+v.apellidoPaterno+"' id='"+v.id+"' value='"+v.id+"' name='check'  class='checkbox'/>" ,
					v.codigo,
					v.rut,
					v.nombre,
					v.apellidoPaterno,
					v.fechaIngresoCompania,
					v.direccion,
					v.telefono,
					acciones
					]);
			});
			table.draw();
			selectAllCheck();
			$("#loading").hide();

		},
		error:function (ex){
			swal({
				title: '<i>ERROR</i>',
				type: 'info',
				html: JSON.stringify(ex),
				showCloseButton: true,
				showCancelButton: true,
				focusConfirm: false,
				confirmButtonText:
					'<i class="fa fa-thumbs-up"></i>OK!',
					confirmButtonAriaLabel: 'Thumbs up, great!',
					cancelButtonText:
						'<i class="fa fa-thumbs-down"></i>',
						cancelButtonAriaLabel: 'Thumbs down',
			});

		}

	});




}
function selectAllCheck(){
	var all=document.getElementById("checkAll").checked=true;
	var check = document.getElementsByName("check");

	for(var x = 0; x < check.length; x++){
		check[x].checked = true;
	}	
}
var changeDateformatDDMMYY = function(input) {
	var pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
	if (!input || !input.match(pattern)) {
		return null;
	}
	return input.replace(pattern, '$3-$2-$1');
};
var changeDateformatYYMMDD = function(input) {
	var pattern = /(\d{2})\-(\d{2})\-(\d{4})/;
	if (!input || !input.match(pattern)) {
		return null;
	}
	return input.replace(pattern, '$3-$2-$1');
};


//---------------------------PLUGIN VALIDATE RUT CHILENO--------------------//

/* Copyright (c) 2009 José Joaquín Núñez (josejnv@gmail.com) http://joaquinnunez.cl/blog/
 * Licensed under GPL (http://www.opensource.org/licenses/gpl-2.0.php)
 * Use only for non-commercial usage.
 *
 * Version : 0.5
 *
 * Requires: jQuery 1.2+
 */

(function($)
		{
	jQuery.fn.Rut = function(options)
	{
		var defaults = {
				digito_verificador: null,
				on_error: function(){},
				on_success: function(){},
				validation: true,
				format: true,
				format_on: 'change'
		};

		var opts = $.extend(defaults, options);

		this.each(function(){

			if(defaults.format)
			{
				jQuery(this).bind(defaults.format_on, function(){
					jQuery(this).val(jQuery.Rut.formatear(jQuery(this).val(),defaults.digito_verificador==null));
				});
			}
			if(defaults.validation)
			{
				if(defaults.digito_verificador == null)
				{
					jQuery(this).bind('blur', function(){
						var rut = jQuery(this).val();
						if(jQuery(this).val() != "" && !jQuery.Rut.validar(rut))
						{
							defaults.on_error();
						}
						else if(jQuery(this).val() != "")
						{
							defaults.on_success();
						}
					});
				}
				else
				{
					var id = jQuery(this).attr("id");
					jQuery(defaults.digito_verificador).bind('blur', function(){
						var rut = jQuery("#"+id).val()+"-"+jQuery(this).val();
						if(jQuery(this).val() != "" && !jQuery.Rut.validar(rut))
						{
							defaults.on_error();
						}
						else if(jQuery(this).val() != "")
						{
							defaults.on_success();
						}
					});
				}
			}
		});
	}
		})(jQuery);

/**
  Funciones
 */


jQuery.Rut = {

		formatear:  function(Rut, digitoVerificador)
		{
			var sRut = new String(Rut);
			var sRutFormateado = '';
			sRut = jQuery.Rut.quitarFormato(sRut);
			if(digitoVerificador){
				var sDV = sRut.charAt(sRut.length-1);
				sRut = sRut.substring(0, sRut.length-1);
			}
			while( sRut.length > 3 )
			{
				sRutFormateado = "." + sRut.substr(sRut.length - 3) + sRutFormateado;
				sRut = sRut.substring(0, sRut.length - 3);
			}
			sRutFormateado = sRut + sRutFormateado;
			if(sRutFormateado != "" && digitoVerificador)
			{
				sRutFormateado += "-"+sDV;
			}
			else if(digitoVerificador)
			{
				sRutFormateado += sDV;
			}

			return sRutFormateado;
		},

		quitarFormato: function(rut)
		{
			var strRut = new String(rut);
			while( strRut.indexOf(".") != -1 )
			{
				strRut = strRut.replace(".","");
			}
			while( strRut.indexOf("-") != -1 )
			{
				strRut = strRut.replace("-","");
			}

			return strRut;
		},

		digitoValido: function(dv)
		{ 
			if ( dv != '0' && dv != '1' && dv != '2' && dv != '3' && dv != '4' 
				&& dv != '5' && dv != '6' && dv != '7' && dv != '8' && dv != '9' 
					&& dv != 'k'  && dv != 'K')
			{   
				return false; 
			} 
			return true;
		},

		digitoCorrecto:   function(crut)
		{ 
			largo = crut.length;
			if ( largo < 2 )  
			{   
				return false; 
			}
			if(largo > 2)
			{
				rut = crut.substring(0, largo - 1);
			}
			else
			{   
				rut = crut.charAt(0);
			}
			dv = crut.charAt(largo-1);
			jQuery.Rut.digitoValido(dv);  

			if(rut == null || dv == null)
			{
				return 0;
			}

			dvr = jQuery.Rut.getDigito(rut);

			if (dvr != dv.toLowerCase())  
			{   
				return false;
			}
			return true;
		},

		getDigito:    function(rut)
		{
			var dvr = '0';
			suma = 0;
			mul  = 2;
			for(i=rut.length -1;i >= 0;i--) 
			{ 
				suma = suma + rut.charAt(i) * mul;    
				if (mul == 7)
				{
					mul = 2;
				}   
				else
				{         
					mul++;
				} 
			}
			res = suma % 11;  
			if (res==1)
			{
				return 'k';
			} 
			else if(res==0)
			{   
				return '0';
			} 
			else  
			{   
				return 11-res;
			}
		},

		validar:   function(texto)
		{
			texto = jQuery.Rut.quitarFormato(texto);
			largo = texto.length;



			// rut muy corto
			if ( largo < 2 )  
			{
				return false; 
			}

			// verifica que los numeros correspondan a los de rut
			for (i=0; i < largo ; i++ ) 
			{   
				// numero o letra que no corresponda a los del rut
				if(!jQuery.Rut.digitoValido(texto.charAt(i)))
				{     
					return false;
				}
			}

			var invertido = "";
			for(i=(largo-1),j=0; i>=0; i--,j++)
			{
				invertido = invertido + texto.charAt(i);
			}
			var dtexto = "";
			dtexto = dtexto + invertido.charAt(0);
			dtexto = dtexto + '-';  
			cnt = 0;  

			for ( i=1,j=2; i<largo; i++,j++ ) 
			{
				if ( cnt == 3 )   
				{     
					dtexto = dtexto + '.';      
					j++;      
					dtexto = dtexto + invertido.charAt(i);      
					cnt = 1;    
				}
				else    
				{       
					dtexto = dtexto + invertido.charAt(i);      
					cnt++;    
				} 
			} 

			invertido = ""; 
			for (i=(dtexto.length-1),j=0; i>=0; i--,j++)
			{   
				invertido = invertido + dtexto.charAt(i);
			}

			if (jQuery.Rut.digitoCorrecto(texto))
			{   
				return true;
			}
			return false;
		}
};





