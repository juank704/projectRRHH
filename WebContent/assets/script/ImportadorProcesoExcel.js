var table;	
var table2;
		 if ( $.fn.dataTable.isDataTable("#tbl_Centra") ) {
		    table = $("#tbl_Centra").DataTable();
		    table.clear();
		}
		else {
		    table = $("#tbl_Centra").DataTable( 
		    	{
		    		searching: false,
		    		paging:false,
		    		info: false,
		    		search: false,
		    		"ordering": false
		    	}
		    )	    
		}


$(document).ready(function(){
	
	getImportador();
	
	
	$("#loading").hide();
	
});


//TODO: Obtener listado de Todos los Procesos para Importar
function getImportador(){
	
	
}


$("#crearLibroForm").submit(function(event) {
	  event.preventDefault();
	  var importador=$("#idImportador").val();
	  
	  if(importador!=""){
		  
		//Inicializar Datos
		 let formDocumento = new FormData();
		//Obtener Archivo
		 let fileDocumento = $('#exampleFormControlFile1').prop("files")[0];
		 debugger;
		 if(fileDocumento.size > 50000000){
			 alerta("archivo muy grande - maximo: 5000 lineas de proceso");
			 return false;
		 }
		 
		//Inserto documento y datos del formulario
		formDocumento.append("documento", fileDocumento);
		formDocumento.append("idImportador", importador);
		
		  $("#loading").show();
		  $("#crearLibroModal").modal("toggle"); 
		  
		  uploadImportadorExcel(formDocumento);
			
	  }
	  else{
		  $("#crearLibroModal").modal("toggle"); 
		  alerta("Elija un tipo de Importador");
	  }
	  
});


function uploadImportadorExcel(formDocumento){

	//Enviar documentos y datos del formulario al servicio 
	$.ajax({
		url : "/simpleWeb/file/work/ExcelImport/modifyDataTrabajadorPerProcess/",
		dataType : 'script',
		async : false,
		cache : false,
		contentType : false,
		processData : false,
		data : formDocumento, //Datos
		type : 'post',
		success : function(data) {
			debugger;
			if(JSON.parse(data)[0]){
				alerta(JSON.parse(data)+" <br> <p class='btn-warning'>las demas lineas fueron procesadas</p> ")
			}else{
				alerta("Se Procesaron todos los datos");
			}
		}
	});
	
	 $("#loading").hide();
}


function traerDatos($this){
	
	$("#btnUpload").show();
	
}

function abrirCerrarModal(){
	$("#crearLibroModal").modal("toggle");
	$("#crearNombreLibro").val("");
}

function abrirCerrarModal2(){
	$("#responseModal").modal("toggle");
	
}

function getTemplate(){
	window.open("/simpleWeb/json/work/Templates/showTemplate/83/?nombreDocumento=ImportadorHD&extension=xlsx");
}


