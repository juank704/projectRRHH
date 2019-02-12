//Cargar Trabajadores
$(document).ready(function(){
	loadEmpresa();
	getSelector();
	$('#listaColaboradores').hide();
})

//Obtener listado de trabajadores
var datos = JSON.parse(localStorage.getItem("datosPersonal"));

//Cargar contratos del trabajador
function loadEmpresa(){
	
	//Obtener ID del trabajador
	var get = getINFO();
	
	//Obtener trabajadores
	$.each(datos, function(k,v){
		
		//Si el trabajador es igual al codigo id de la URL
		if(get.id == v.codigo){
			
			var i = 0;
            //Cargar contratos del trabajador
            while(i < v.contratos.length){
				var bodyCambioEmpresa = "";
				bodyCambioEmpresa += "<tr>";
				bodyCambioEmpresa += 	"<td>"+v.nombre+"</td>";
				bodyCambioEmpresa += 	"<td>"+v.contratos[i].empresa+"</td>";
				bodyCambioEmpresa += 	"<td>"+v.contratos[i].fechaInicio+"</td>";
				bodyCambioEmpresa += 	"<td>"+v.contratos[i].fechaTermino+"</td>";
				bodyCambioEmpresa += "</tr>";
				//Colocar tabla en HTML
	            $("#bodyCambioEmpresa").append(bodyCambioEmpresa);
	            i++;
            }
		}
	})
}

//Cambiar Empresas del Trabajador
function CambiarEmpresa(){
	
	//Obtener codigo del trabajador
	var get = getINFO();
	
	//Obtener trabajador
	var search = datos.find(function(item){
		//Comparar Id del URL y codigo de lista de trabajadores  
		if(item.codigo == get.id){
			 //retornar trabajador
			 return item;
		 }
		//Metodo simplificado con ECMAScript2107 
	 }/*item => item.codigo == get.id*/);
	     
	//Cambiar contratos del trabajador
	var aux = setContratos(search);
	
	//Quitar el trabajador de la lista de trabajadores con viejo contratos
	var data = [search.codigo];
    var i = datos.length;
    while (i--) {
        if(data.indexOf(datos[i].codigo)!=-1){
            datos.splice(i,1);
        }
    }
    
    //Agregar el trabajador de la lista de trabajadores con nuevos contratos 
	datos.push(aux);
	
	//Agregar lista de trabajadores al localStrorage
	localStorage.setItem("datosPersonal", JSON.stringify(datos));
	
	////Refrescar pagina;
	location.reload();
	
	//Funcionalidad con base de Datos
	
	/*var validate = true;
	
	$.ajax({
		//TODO: Hacer servicio para finalizar contrato y crear otro nuevo
		url : "/SpringMVC/json/map/cambiarEmpresa/",
		type: "POST",
		data: JSON.stringify(row),
		beforeSend: function(xhr){
			xhr.setRequestHeader("Accept","application/json");
			xhr.setRequestHeader("Content-Type","application/json");
		},
		success: function(){
			//var a = [];
			//TODO: Hacer metodo para actualizar registro agregado
//			$.getJSON("/simpleWeb/json/map/loadnewEmpresa", function(data){
//				datos = data;
//				a.push(datos[datos.lenght-1]);
//			})
			
			alert("Se cambio el Trabajador de Empresa");
		},
		error: function(ex){
			console.log(ex);
		}
		
	})//close ajax*/
	
	
	
	
}

//Cambiar contratos del trabajador
function setContratos(trabajador){

	//Obtener fecha de termino del ultimo contrato a la fecha
	var f_auxiliarActual = trabajador.contratos.slice(-1)[0].fechaTermino;

	//Obtener fecha de termino para el contrato anterior
	var f_terminoAnterior = $("#fechaTermino").val();

	//Obtener fecha de inicio del nuevo contrato
	var f_inicioActual = $("#fechaInicio").val();

	//Obtener ultimo contrato
	var modificarContrato = trabajador.contratos.slice(-1)[0];

	//Modificar fecha de termino del contrato anterior
	modificarContrato.fechaTermino = f_terminoAnterior;

	//Nuevo contrato del Trabajador
	var row =  
	{
		//Tipo de Movimiento	
		"movimiento": "Cambio Empresa",
		//Obtener nueva empresa
		"empresa": $("#newEmpresa").val(),
		//fecha de termino del contrato
		"fechaTermino": f_auxiliarActual,
		//fecha de inicio del contrato
		"fechaInicio": f_inicioActual,
		//contrato en pdf
		"imagenContrato": agregarContrato()
	}

	//Insertar nuevo contrato
	trabajador.contratos.push(row);


	//Retornar viejo contrato modificado con nuevo contrato del Trabajador
	return trabajador;
}



function generarContrato(){
	
	var variable1 = $("#newEmpresa").val();
	var variable2 = $("#fechaInicio").val();
	var variable3 = $("#fechaTermino").val();
	
	//Obtener trabajador
	var trabajador = datos.find(function(item){
		//Comparar Id del URL y codigo de lista de trabajadores  
		if(item.codigo == getINFO().id){
			 //retornar trabajador
			 return item;
		 }
		//Metodo simplificado con ECMAScript2107 
	 }/*item => item.codigo == get.id*/);
	
	
	var variable4 = JSON.stringify(trabajador);
	
	console.log(variable1);
	console.log(variable2);
	console.log(variable3);
	
	//Crear nuevo documento PDF
	//var doc = new jsPDF();
	
	
	//Imagen PDF de Prueba 
	
	
	
	//Configuracion del PDF
	//doc.setFontSize(40);
	//doc.text(45,50,variable1);
	//doc.text(45,100,variable2);
	//doc.text(45,150,variable3);
	//doc.text(45,200,variable4);
	
	//doc.addImage(img, 'JPEG', 15, 40, 180, 160)
		
	//Obtener URL del PDF
	//var pdfURL = doc.output('datauristring');
	
	
	window.open('http://localhost:8080/simpleWeb/assets/global/img/pruebaImagen.JPG', '_blank');
	
	
}


function agregarContrato(){
	
	var nombreTrabajador;
	
	var get = getINFO();
	$.each(datos, function(k,v){
		if(get.id == v.codigo){
			nombreTrabajador = v.nombre;
		}
		
	})
	
		
	//Crear nuevo documento PDF
	var doc = new jsPDF();
	
	//Configuracion del PDF
	doc.setFontSize(40);
	doc.text(45,50,"Cambio de Empresa");
	doc.text(45,100,nombreTrabajador);
	
	//Obtener URL del PDF
	var pdfURL = doc.output('datauristring');
	
	
	
	
	
	return pdfURL;
	
	
}



function agregarMovimiento(){
	
	var row;
	
	var get = getINFO();
	
	$.each(datos, function(k,v){
		if(get.id == v.codigo){
			
			row = {
					
					movimiento:"Cambio de Contrato",
					empresa:v.empresa,
					fechaInicio:v.f_ingreso,
					fechaTermino:$("fechaTermino").val(),
					codigoTrabajador: get.id
			}	
		}
	})
	
	
	//Si no existe servicio guardar los datos localmente;
	var auxJson = JSON.parse(localStorage.getItem('separacion'));
	auxJson.push(row);
	localStorage.setItem('separacion', JSON.stringify(auxJson));
		
	
	//Envio del Movimiento por el Servicio
	$.ajax({
		url : 'http://localhost:8080/simpleWeb/assets/json/movimiento.json',
		type : "POST",
		data : JSON.stringify(row),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept","application/json");
			xhr.setRequestHeader("Content-Type","application/json");
		},
		success : function() {
			
		},
		error : function(ex) {
			console.log(ex);
		}
	
	})
	
	
}

//TODO: Modificar Selector
function getSelector(){
	  $.ajax({
	    type: "GET",
	    url: '/simpleWeb/json/work/getSociedad/', 
	    dataType: "json",
	    success: function(data){
	      $.each(data,function(key, registro) {
	        $("#newEmpresa").append('<option value='+registro.idSociedad+'>'+registro.sociedad+'</option>');
	      });        
	    },
	    error: function(data) {
	      alert('error');
	    }
	  });
	}





