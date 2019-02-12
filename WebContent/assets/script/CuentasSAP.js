$(document).ready(function() {

	$("#loading").hide();
	loadCuentas();
	
	var table = $('#tbl_Info').DataTable({}
		
		       	
);
 

})


function loadCuentas(){
	
	$("#loading").show();
	$.getJSON(
			"/simpleWeb/json/work/BuscarCuentasSap/",
			function(data) {
         
               var tableadd = $('#tbl_Info').DataTable();
               tableadd.clear().draw();
               $.each(data, function(k, v){
       			
 
            		tableadd.row.add( [
            	            "<td>"+v.nombrecuenta+"</td>",
            	            "<td>"+v.numerocuenta+"</td>",
            				"<td><button title='Actualizar' id='' onclick='editarFicha("+k+","+v.idCuenta+");' class='btn btn-circle yellow btn-outline btn-sm'><i class='fa fa-pencil-square-o fa-lg'></i></button></td>",
            				] ).node().id = "td"+k;
            		tableadd.draw();
       				
       		     
       		})

			}).done(function() {
		$("#loading").hide();

	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})  	
	
}


function editarFicha(td,id){
	
	var cuenta = [];
	var table = $('#tbl_Info').DataTable();
	$("#numerocuenta").val("");
	concepto = table.row().column(1).data().draw(); 
	var texto = concepto[td]; 
	var texto2 = $(texto).text();
	var cuentaToString = texto2.toString();
	
	$("#modalupdate").modal();
    
    $("#numerocuenta").val(cuentaToString);
   
	$("#actualizarUp").attr("onclick","actualizarCuenta("+id+")");
   
  
}
function actualizarCuenta(id){
	

	 if($("#numerocuenta").val() == ""){
		alerta("Numero de Cuenta No puede estar Vacio"); $("#numerocuenta").focus();return;
	
	}else{
	
		var row = {
					idCuenta : id,
					numerocuenta : $("#numerocuenta").val(),
				  }
		
	
	$("#loading").show();
	
	
	$.ajax({
		url : "/simpleWeb/json/work/UpdateNumeroCuenta",
		type : "PUT",
		data : JSON.stringify(row),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept","application/json");
			xhr.setRequestHeader("Content-Type","application/json");
		},
		success : function(data, textStatus, jqXHR) {
			
			$('#modalupdate').modal('toggle');
			loadCuentas();
	        
			alerta("Enviado");
			
			
			$("#loading").hide();
			 
				
            
		},
		error : function(ex) {
			console.log(ex);
		}
	
	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	}).done(function() {
		$("#loading").hide();
	});
	}
}

