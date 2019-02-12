$(document).ready(function() {
	$("#loading").hide();
	
});

function addForm1() {

	if ($('#7').val() === '') {
		alerta("Debe Subir un Archivo");
		return;
	} else {

	}
	
	
	var form_data = new FormData();

	var d = new Date();

	var month = d.getMonth() + 1;
	var day = d.getDate();
	var year = d.getFullYear();
	var min = d.getMinutes();
	var hour = d.getHours()
	var seconds = d.getSeconds();
    
	//var ruta = "../assets/permisoylicencia/";
     var ruta;
    
     $.ajax({
     		type : "GET",
     		url : '/simpleWeb/json/work/getRutaLicencia/',
     		async: false,
     		dataType : "text",
     		success : function(data) {
     			ruta = data;
     		}
     	}).fail(function(jqXHR, textStatus, errorThrown) {

		    alerta(errorThrown);
			$("#loading").hide();
		})


	var numeroinput = 7;
	if ($('#7').val() === '') {

	} else {
		UploadFileHoraAsistencia(numeroinput,ruta);
	}

}

function UploadFileHoraAsistencia(idInput,ruta) {

	datosEnviar = [];
	var file_data = $("#" + idInput).prop("files")[0];
	var form_data = new FormData();

	var d = new Date();

	var month = d.getMonth() + 1;
	var day = d.getDate();
	var year = d.getFullYear();
	var min = d.getMinutes();
	var hour = d.getHours()
	var seconds = d.getSeconds();

	var nombre = (year + "-" + month + "-" + day + "-"
			+ hour + "-" + min + "-" + seconds);
	
	var nombreArchivo = $("#7").prop("files")[0].name;

	var strArray = nombreArchivo.split(".");
	var ruta2 = (strArray[0] + year + "-" + month
			+ "-" + day + "-" + hour + "-" + min + "-" + seconds + "." + strArray[1]);

	form_data.append("file", file_data);
	form_data.append(idInput, idInput);
	form_data.append(nombre, nombre);
	$.ajax({
		url : "/simpleWeb/UploadExcelDiasFalta",
		dataType : 'script',
		cache : false,
		async : false,
		contentType : false,
		processData : false,
		data : form_data,
		type : 'post',
		success : function() {
          console.log(nombre);
          
       
		}
	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})
	
	var rutafinal = ruta+ruta2;
	
	var json2 = {
			
			ruta : rutafinal,
		

		}
	
	datosEnviar.push(json2);
	$("#loading").show();
		
		$.ajax({
			url : "/simpleWeb/json/work/insertExelmysqlDiasFalta/",
			type : "PUT",
			dataType : "text",
			async : false,
			data : JSON.stringify(json2),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
				$("#loading").show();

			},
			success : function(data, textStatus, jqXHR) {
					
				alerta(data);
				

				$("#loading").hide();
			},
			error : function(ex) {
				console.log(ex);
			}
		}).fail(function(jqXHR, textStatus, errorThrown) {
			console.log(errorThrown);
		    alerta(errorThrown);
			$("#loading").hide();
		})
	
	
}

function excel(){
	
	var ruta = "/simplework/Nomina/Anticipo/importarExcelDiasFalta.xlsx";
	window.open('/simpleWeb/json/work/getRutaPlanillaHoraExtraFalta.html?ruta='+ruta);
}