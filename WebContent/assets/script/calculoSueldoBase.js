
$(document).ready(function(){

	//colocar reglas a los inputs
	setInputs();
	
	var table;

	 table = $('#datatable_haberes').DataTable({
		    		searching: false,
		    		paging: false,
		    		info: false,
		    		search: false
		    });

	 
	 //table.row.add([ "<div id='' ></div>" ,"Prueba" , "Prueba" , "Prueba" , "Prueba", "" ]).draw()
	 
	 table.draw();

});


//Cambiar porcentaje de AFP
$(document).on('change', '#idAFP', function(){

	//Servicio para Obtener Porcentaje de AFP
	$.ajax({
		type : "GET",
		url : '/simpleWeb/json/work/AFPs/readAFP/'+$("#idAFP").val(),
		async: false,
		dataType : "json",
		success : function(data){
				$("#porcentajeAFP").val(data.tasaAFP);
		},
		error : function(ex){
			alerta("No se encuentra Porcentaje de AFP asociado a ese AFP" + ex );
		}
		
	});

});


$(document).on('change', '#idAFP', function(){

	//Servicio para Obtener Porcentaje de AFP
	$.ajax({
		type : "GET",
		url : '/simpleWeb/json/work/AFPs/readAFP/'+$("#idAFP").val(),
		async: false,
		dataType : "json",
		success : function(data){
				$("#porcentajeAFP").val(data.tasaAFP);
		},
		error : function(ex){
			alerta("No se encuentra Porcentaje de AFP asociado a ese AFP" + ex );
		}
		
	});

});



//Setear Inputs y colocar Reglas
function setInputs(){

	//Configuracion de rut usando un plugin para validar y formatear un RUT Chileno
	$('.input_rut').rut({
		placeholder: true,
		fn_error: function(input){
			error = '<span class="rut-error">Rut incorrecto</span>';
			input.closest('.rut-container').append(error);
			$('#searchWorker').prop('disabled', 'disabled');
		},
		error_html: '<span class="rut-error">Rut incorrecto</span>',
		fn_validado: function(input){
			$('#searchWorker').prop('disabled', false)
		}
	});


	//Llenar Selectores
	getSelector();

	//Lenar parametros UF, UTM
	getParameters();


}



function loadWorker(trabajador){

	var AFP
	$.ajax({
		type:"GET",
		url: "/simpleWeb/json/work/AFPs/readAFP/"+trabajador.idAFP,
		async: false,
		success: function(data){ AFP = data },
		error: function(ex){ alerta("No se puedo encontrar AFP asociada al trabajador "+ ex);	}
	});


	$('#porcentajeAFP').val(AFP.tasaAFP);
	$('#idAFP').val(AFP.idafp);


}


function searchWorker(rut){

	//Buscar Trabajador por Rut
	var trabajador;
	$.ajax({
		type:"GET",
		url: "/simpleWeb/json/work/getTrabajadorByRut/"+rut,
		async: false,
		success: function(data){
			trabajador = data;
		},
		error: function(ex){
			alerta("No se encuentra Trabajador con ese rut: "+ex);

		}

	});

	if(trabajador.rut != null){
		//Insertar datos de Colaborador en Inputs
		loadWorker(trabajador);
	}
	else{
		alerta("No se encuentra Trabajador con el rut: "+rut);
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

function getSelector() {

	//Selector para AFP segun tabla de Parametros
	$.ajax({
		type : "GET",
		async : false,
		url : '/simpleWeb/json/work/getParametros/AFP',
		dataType : "json",
		success : function(data) {
			$.each(data, function(key, registro) {

				$("#idAFP").append(
						'<option value=' + registro.llave + '>'
						+ registro.descripcion + '</option>');
			});
		},
		error : function(data) {
			alert('error');
		}
	});


}

//Obtener parametros como UF, UTM, IMM
function getParameters(){

	
	var param = new Array('TOPE_MAXIMO');
	
	//Obtener UF y UTM segun tabla de Parametros
	$.ajax({
		type : "GET",
		async : false,
		url : '/simpleWeb/json/work/getParametrosByCodigos',
		data : {param:param},
		dataType : "json",
		success : function(data) {
			

			$.each(data, function(key, registro) {

				if(registro.descripcion == "Valor UF"){
					$("#valorUF").val(registro.llave);
				}
				else if(registro.descripcion == "Valor UTM"){
					$("#valorUTM").val(registro.llave);
				}
				else if(registro.descripcion == "Sueldo Minimo"){
					$("#sueldoMinimo").val(registro.llave);
				}
				else if(registro.descripcion == "Tope AFP"){
					$("#topeAFP").val(registro.llave);
				}
				else if(registro.descripcion == "Tope AFC"){
					$("#topeAFC").val(registro.llave);
				}
				
				$("#salud").val('7%');
				$("#valorAFC").val('0,6%');
				
				
			});
			

		},
		error : function(ex) {
			alert('Error no se pudo obtener Valores para este periodo' + ex);
		}
	});


	//Tiene calculo de AFC
	$('input[type=radio][name=AFC]').change(function() {
		this.value == '1' ? $("#valorAFC").val('0,6%') : $("#valorAFC").val('');
	});

	
	//Tiene calculo de Gratificacion
	$('input[type=radio][name=gratificacion]').change(function() {
		
		var table = $('#datatable_haberes').DataTable();
		
		this.value == '1' ? 
				table.row.add([ "<div id='idGratificacion'></div>" , "Haberes" , "Gratificacion" , "1.000" , "Gratificacion", "" ]).draw()
			  : table.row($('#idGratificacion').parents('tr')).remove().draw();
	});
	

}


/*
Plugin para validar y formatear un RUT Chileno
Autor: www.kadumedia.com
Mail:  hola@kadumedia.com
Versión: 1.7
 */
(function($){
	$.fn.rut = function(opt){
		var defaults = $.extend({
			error_html: '<span class="rut-error">Rut incorrecto</span>',
			formatear : true,
			on : 'blur',
			required : true,
			placeholder : true,
			fn_error : function(input){
				mostrar_error(input, defaults.error_html);
			},
			fn_validado: function(input){}
		}, opt);
		return this.each(function(){
			var $t = $(this);
			$t.wrap('<div class="rut-container"></div>');
			$t.attr('pattern', '[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9Kk]{1}').attr('maxlength', 12);
			if(defaults.required) $t.attr('required', 'required');
			if(defaults.placeholder) $t.attr('placeholder', '12.345.678-5');
			if(defaults.formatear){
				$t.on('blur', function(){
					$t.val($.rut.formatear($t.val()));
				});
			}
			$t.on(defaults.on, function(){
				$('.rut-error').remove();
				if($.rut.validar($t.val()) && $.trim($t.val()) != '')
					defaults.fn_validado();
				else
					defaults.fn_error($t);
			});
		});
	}
	function mostrar_error(input, error){
		input.closest('.rut-container').append(error);
	}
})(jQuery);
jQuery.rut = {
		validar : function(rut){
			if (!/[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9Kk]{1}/.test(rut))
				return false;
			var tmp = rut.split('-');
			var dv = tmp[1], rut 	= tmp[0].split('.').join('');
			if(dv == 'K') dv = 'k';
			return ($.rut.dv(rut) == dv);
		},
		dv : function(rut){
			var M=0,S=1;
			for(;rut;rut=Math.floor(rut/10))
				S=(S+rut%10*(9-M++%6))%11;
			return S ? S-1 : 'k';
		},
		formatear : function(rut){
			var tmp = this.quitar_formato(rut);
			var rut = tmp.substring(0, tmp.length - 1), f = "";
			while(rut.length > 3) {
				f = '.' + rut.substr(rut.length - 3) + f;
				rut = rut.substring(0, rut.length - 3);
			}
			return ($.trim(rut) == '') ? '' : rut + f + "-" + tmp.charAt(tmp.length-1);
		},
		quitar_formato : function(rut){
			rut = rut.split('-').join('').split('.').join('');
			return rut;
		}
};




