$(document).ready(function(){
	$("#loading").hide();
	ListaSociedad();
});

function generarArchivo() {
	if($("#cantidad").val() == '')
	{
		alerta("Debe seleccionar un periodo");
		return;

	}
	if($("#Sociedad").val() == '')
	{
		alerta("Debe seleccionar una Empresa");
		return;
	}
	else{
       
		var empresaN = $("#Sociedad").val();
		var periodoN = $("#cantidad").val().replace('-','');
		
		$("#loading").show();
		$.ajax({
			url : "/simpleWeb/json/work/generateAfiliacionTrabajadoresPrevired/"+ empresaN + "," + periodoN,
			type : "PUT",
			dataType : "text",
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept","application/json");
				xhr.setRequestHeader("Content-Type","application/json");
			},
			success : function(data, textStatus, jqXHR) {
				
				
         		console.log(data);
				var myJSON = JSON.stringify(data);
				
         		
				window.open("/simpleWeb/json/work/descargarAfiliacionPREVIRED/?FILE="+myJSON);
				
				$("#loading").hide();
					
	            
			},
			error : function(ex) {
				console.log(ex);
			}
		
		}).fail(function(jqXHR, textStatus, errorThrown) {

		    alerta(errorThrown);
			$("#loading").hide();
		})
	}
}

function ListaSociedad() {

	$.getJSON(
			"/simpleWeb/json/work/ListaSociedad/",
			function(data) {

				$.each(data, function(k, v) {
					var SelectSociedad = "";
					if (v.idSociedad == -1) {

					} else {
						SelectSociedad += "<option value=" + v.idSociedad + ">"
								+ v.denominacionSociedad + "</option>";

						$("#Sociedad").append(SelectSociedad);
					}
				})
			}).fail(function(jqXHR, textStatus, errorThrown) {

		alerta(errorThrown);
		$("#loading").hide();
	})
}