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
		window.open('/simpleWeb/json/work/obtenerPrevired.html?periodo='+$("#cantidad").val().replace('-','')+'&empresa='+$("#Sociedad").val());
	}
}

function ListaSociedad(){
	
	$.getJSON("/simpleWeb/json/work/ListaSociedad/", function(data){
		
		$.each(data, function(k, v){
			var SelectSociedad = "";
			if(v.idSociedad == -1){
				
			}else{
			SelectSociedad += 	"<option value="+v.idSociedad+">"+v.denominacionSociedad+"</option>";
			
			$("#Sociedad").append(SelectSociedad);
			}
		})
}).fail(function(jqXHR, textStatus, errorThrown) {

    alerta(errorThrown);
	$("#loading").hide();
})
}