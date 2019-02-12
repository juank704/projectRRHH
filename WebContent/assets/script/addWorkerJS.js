$(document).ready(function(){
//	loadRegiones();
//	loadCargo();
});
var addXpContButon = 1;
var vCodigo;
var codigo;
var datos;
var REGIONES = {};
function loadRegiones(){
	$.getJSON("/simpleWeb/json/map/loadRegiones/", function(data){
		REGIONES.REGION = data;
		loadProvincias();
	})
}
function loadProvincias(){
	$.getJSON("/simpleWeb/json/map/loadProvincias/", function(data){
		REGIONES.PROVINCIA = data;
		loadComunas();
	})
}
function loadComunas(){
	$.getJSON("/simpleWeb/json/map/loadComunas/", function(data){
		REGIONES.COMUNA = data;
	})
	console.log(REGIONES);
}
window.onload = function(){
		
	var get = getId();
	console.log(get);
	
	if(get){
		$("#updWorker").show();
		$("#addnewWorker").hide();
		var id = get.id;
		
		$.getJSON("/simpleWeb/json/work/getTrabajadorById/"+id, function(data){

			var v = data;
			
				$("#rutWorker").val(v.rut);
				$("#nameWorker").val(v.nombre);
				$("#patWorker").val(v.apellidoPaterno);
				$("#matWorker").val(v.apellidoMaterno);
				$("#birthWorker").val(v.fechaNacimineto);
				$("#nacWorker").val(v.idNacionalidad);
				$("#estWorker").val(v.idEstadoCivil);
				$("#generoWorker").val(v.idGenero);
				$("#phoneWorker").val(v.telefono);
				$("#mailWorker").val(v.email);
				$("#direWorker").val(v.direccion);
				$("#inWorker").val(v.fechaIngresoCompania);
				$("#estadoWorker").val(v.est_contrato);
				$("#tipoconWorker").val(v.tipo_contrato);
				$("#depaWorker").val(v.id_departamento);
				$("#estaWorker").val(v.establecimiento);
				$("#afsbWorker").val(v.ajus_sueldo_base);
				$("#abscWorker").val(v.bene_semana_corrida);
				$("#cargoWorker").val(v.id_perfil);
				$("#inWorker").val(v.fechaIngresoCompania);
				$("#prevWorker").val(v.prevision);
				$("#carNorPrev").val(v.c_normales);
				$("#carInvPrev").val(v.c_invalidas);
				$("#horasWorker").val(v.hrs_semanal);
				$("#segPrev").val(v.seguro_cesantia);
				$("#iniPerSeCe").val(v.in_per_seg_ces);
				$("#AfecPrev").val(v.aefc_seg_accidentes);
				$("#isaPrev").val(v.isapre);
				$("#tipoPacto").val(v.tipo_pacto);
				$("#gesPrev").val(v.moneda_mon_ges);
				$("#monPac").val(v.monto_pactado);
				$("#monGes").val(v.monto_ges);
				$("#tramoPrev").val(v.t_asign_familiar);
				$("#tipoSueldoBase").val(v.tipo_sueldo_base);
				$("#sueldoMensual").val(v.sueldo_mensual);
				$("#asignZonaExtrema").val(v.asign_zona_extrema);
				$("#gratLegal").val(v.gratificacion_legal);
				$("#nroCta").val(v.no_cuenta);
				$("#institucion").val(v.institucion_bco);
				var adwork = document.getElementsByName("adwork");
				$("#loading").hide();

		})
	}else{
		$("#loading").hide();
	}
}
function cancelAdd(){
	window.location.href = ("colaboradoresJSP");
};
function addXp(){
	if(addXpContButon == 1){
		$("#addXpDivXp").show();
		addXpContButon++;
	}else{
		$("#addXpDivXp").hide();
		addXpContButon--;
	}
};
function cancelAddXp(){
	$("#addXpDivXp").hide();
	var addXp = document.getElementsByName('addXP');
	for(var i = 0; i < addXp.length; i++){
		$(addXp[i]).val("");
	}
};
function addnewXP(){
	var validate = true;
	var addXP = document.getElementsByName("addXP");
	for(var i = 0; i < addXP.length; i++){
		if(!$(addXP[i]).val()){
			$(addXP[i]).focus();
			return;
			validate = false;
		}
	}
	if(validate == true){
		console.log("123456789");
	}
};
function tipoconWorker(){
	var tipoconWorker = $("#tipoconWorker").val();
	if(tipoconWorker == "Indefinido"){
		$("#outWorker").prop("disabled", true);
		$("#outWorker").val("");
	}else if(tipoconWorker == "Fijo"){
		$("#outWorker").prop("disabled", false);
	}
};
function validarEmail(email){
	var mail = true;
	if(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)){
		mail = true;
	}else{
		mail = false;
	}
	return mail;
}
function mailValidate(){
	if($("#mailWorker").val() != ""){
		var email = $("#mailWorker").val();
		var m = validarEmail(email);
		if(!m){
			alert("La dirección de email es incorrecta!.");
			$("#mailWorker").val("");
			return;
		}
	}
}
function addnewWorker(butonId){
	var rutW = $("#rutWorker").val();
	if(butonId == "addnewWorker"){
		
		
		//Obtener Trabajador Rut
		var trabajadorRut;
		$.ajax({
			async: false,
			type: "GET",
			dataType: 'json',
			url: "/simpleWeb/json/work/getTrabajadorByRut/"+rutW,
			success: function(data){
				trabajadorRut = data.rut;
			},
			error: function(ex){
				console.log(ex);
			}
		});
		
		
		
			if(trabajadorRut == rutW){
				alert("El trabajador con el rut "+rutW+" ya existe, o se encuentra dentro de nuestros registros");
				$("#rutWorker").val("");
				return;
			}
				
	}
	
	//Validar campos Requeridos
	var validate = true;
	var adwork = document.getElementsByName("adwork");
	var hasDiv = document.getElementsByName("hasDiv");
	for(var i = 0; i < adwork.length; i++){
		if($(adwork[i]).val() == ""){
			$(adwork[i]).focus();
			$(hasDiv[i]).addClass("has-error");
			validate = false;
			return;
		}
	}
	
	//Si todos los campos requeridos estan llenados
	if(validate == true){
		
		//Validar si el contrato es indefinido colocar string de guiones
//		var f_termino;
//		if($("#tipoconWorker").val() == "Indefinido"){
//			f_termino = "----------";
//		}else{
//			if(!$("#outWorker").val() == ""){
//				$("#outWorker").focus();
//				return;
//			}else{
//				f_termino = $("#outWorker").val();
//			}
//		}
		
		//Crear codigo de trabajador
//		var arrCodigo = [];
//		$.each(datos, function(k,v){
//			arrCodigo.push(v.codigo);
//		})
//		vCodigo = arrCodigo[arrCodigo.length-1]*1;
//		codigo = vCodigo + 1;
		
		Valida_Rut(rutW);
		
		//Crea nombre completo del Trabajador
//		var nom = $("#nameWorker").val();
//		var apel = $("#patWorker").val();
//		var nomCompleto = nom+" "+apel;
		
		var trabajador = {
			
			idTrabajador:"",
			idPerfil:"2",
			idContrato:"",
			rut:$("#rutWorker").val(),
			apellidoPaterno:$("#patWorker").val(),
			apellidoMaterno:"",
			nombre:$("#nameWorker").val(),
			fechaNacimiento:$("#birthWorker").val(),
			edad:"",
			idNacionalidad:$("#nacWorker").val(),
			idGenero:$("#generoWorker").val(),
			idStatus:1,
			idEstadoCivil:$("#estWorker").val(),
			telefono:$("#phoneWorker").val(),
			email:$("#mailWorker").val(),
			direccion:$("#direWorker").val(),
			fechaIngresoCompania:$("#inWorker").val()

		}
		
		//Enviar trabajador al servicio
		$.ajax({
			url : "/simpleWeb/json/work/insertTrabajador2/",
			type : "PUT",
			data : JSON.stringify(trabajador),
			beforeSend : function(xhr){
				xhr.setRequestHeader("Accept","application/json");
				xhr.setRequestHeader("Content-Type","application/json");
			},
			success: function(){
				
				alert("Informacion Ingresada con exito")
				
			}
				
		});
				
	}
	
}

function loadCargo(){
	$.getJSON("/simpleWeb/json/map/loadCargo/", function(data){
		var aux = "<option value=''>Seleccione</option>";
		$.each(data, function(k, v){
			aux +=  "<option value='"+v.id_perfil+"'>"+v.descripcion+"</option>"; 
		})
		$("#cargoWorker").html(aux);
		loadDepartamentos();
	})
}
function loadDepartamentos(){
	$.getJSON("/simpleWeb/json/map/loadDepartamentos/", function(data){
		console.log(data);
		var aux = "<option value=''>Seleccione</option>";
		$.each(data, function(k, v){
			aux +=  "<option value='"+v.id+"'>"+v.descripcion+"</option>"; 
		})
		$("#depaWorker").html(aux);
	})
}
function valRut(valor){
    var nums = new Array();
    var val1 = new Array();
    var simb = ".";
    valor = valor.toString();
    nums = valor.split("");
    var long = nums.length - 1;
    var patron = 3;
    var prox = 2;
    var rut = "";
    var res = "";
    if(long > 0){
    	nums.splice((long - 0),0, "-");
    }
    for (var i = 0; i <= nums.length-1; i++) {
        rut += nums[i];
    }
    rut = rut.split("-");
    val1 = rut[0].split("");
    var length = val1.length - 1;
    while (length > prox) {
    	val1.splice((length - prox),0,simb);
        prox += patron;
    }
    for (var i = 0; i <= val1.length-1; i++) {
        res += val1[i];
    }
    res += "-"+rut[1];
    if(res == "-undefined"){
    	res = "";
    }else{
    	return res;
    }
}
function valRutChar(input){
	var validateRut = true;
    var valActual = $("#"+input.id).val();
    Valida_Rut(valActual);
    var nuevoValor = valRut(valActual);
    var get = getId();
    if(get == undefined){
    	$.each(datos, function(k,v){
        	if(nuevoValor == v.rut){
        		alert("El trabajador con el rut "+nuevoValor+" ya existe, o se encuentra dentro de nuestros registros");
        		$("#"+input.id).val("");
        		validateRut=false;
        		return;
        	}
        })
    }
    if(validateRut){
    	$("#"+input.id).val(nuevoValor);
    }
};
function forRut(format){
	var result = "";
	var aux = format;
	var pointsRut = aux.split(".");
	var guionRut = pointsRut[2].split("-");
	result = pointsRut[0]+""+pointsRut[1]+""+guionRut[0]+""+guionRut[1];
	return result;
}
function formatRut(rut){
	if(rut.value != ""){
		var valActual = $("#"+rut.id).val();
	    var nuevoValor = forRut(valActual);
	    $("#"+rut.id).val(nuevoValor);
	}
}
function Valida_Rut(Objeto){
	var tmpstr = "";
	if(Objeto.length> 0){
		crut = Objeto;
		largo = Objeto.length;
		if(largo < 2){
			alert('Rut Invalido')
			Objeto.focus()
			return false;
		}
		for(var i = 0;i < crut.length ; i++){
			if(crut.charAt(i) != ' ' && crut.charAt(i) != '.' && crut.charAt(i) != '-' ){
				tmpstr = tmpstr + crut.charAt(i);
			}
		}
		rut = tmpstr;
		crut=tmpstr;
		largo = crut.length;
 
		if(largo > 2){
			rut = crut.substring(0, largo - 1);
		}else{
			rut = crut.charAt(0);
		}
		dv = crut.charAt(largo-1);
 
		if(rut == null || dv == null){
			return 0;
		}
		var dvr = '0';
		suma = 0;
		mul  = 2;
		for(i = rut.length-1 ; i >= 0; i--){
			suma = suma + rut.charAt(i) * mul;
			if (mul == 7){
				mul = 2;
			}else{
				mul++;
			}
		}
		res = suma % 11;
		if (res==1){
			dvr = 'k';
		}else if (res==0){
			dvr = '0';
		}else{
			dvi = 11-res;
			dvr = dvi + "";
		}
		if (dvr != dv.toLowerCase()){
			alert('El Rut no es correcto');
			$("#"+Objeto).val("");
			return false;
		}
		return true;
	}
}
function getId(){
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
function viewDoc(){
	var validate = true;
	var adwork = document.getElementsByName("adwork");
	console.log(adwork);
	for(var i = 0; i < adwork.length; i++){
		if($(adwork[i]).val() == ""){
			$(adwork[i]).focus();
			validate = false;
			return;
		}
	}
	if(validate){
		window.location.href=("../assets/pages/docs/FORMATO_DOC_TRABAJADOR.PDF");
	}
}
function justNumbers(e){
	var keynum = window.event ? window.event.keyCode : e.which;
	if ((keynum == 8) || (keynum == 46)){
		return true;
	}
	return /\d/.test(String.fromCharCode(keynum));
}
function onBlurEroor(input){
	$("#"+input.id).addClass("has-success");
}

//Editar Trabajador
function editWorker(){
	
		var trabajador = {
			
			idTrabajador:getId().id,
			idPerfil:"2",
			idContrato:"",
			rut:$("#rutWorker").val(),
			apellidoPaterno:$("#patWorker").val(),
			apellidoMaterno:"",
			nombre:$("#nameWorker").val(),
			fechaNacimiento:$("#birthWorker").val(),
			edad:"",
			idNacionalidad:$("#nacWorker").val(),
			idGenero:$("#generoWorker").val(),
			idStatus:1,
			idEstadoCivil:$("#estWorker").val(),
			telefono:$("#phoneWorker").val(),
			email:$("#mailWorker").val(),
			direccion:$("#direWorker").val(),
			fechaIngresoCompania:$("#inWorker").val()

		}
	
		
		$.ajax({
			async: false,
			type: "PUT",
			dataType: 'json',
			url: "/simpleWeb/json/work/updateTrabajador/",
			data: JSON.stringify(trabajador),
			beforeSend : function(xhr){
				xhr.setRequestHeader("Accept","application/json");
				xhr.setRequestHeader("Content-Type","application/json");
			},
			success: function(data){
				alert("Trabajador Actualizado");
			},
			error: function(ex){
				console.log(ex);
			}
		});
	
		
	
	
}



