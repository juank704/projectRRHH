$(document).ready(function(){
	
});
function asignarCampos(){
	var check = [];
	$(".check").each(function(){
		if($(this)[0].checked){
			check.push({codigo: $("#usuarios").val()*1, descripcion: $(this).val()});
		}
	})
	console.log(check);
	$.ajax({
		url : "/simpleWeb/json/AGRO/ADD_USUARIO_CAMPO/",
		type : "PUT",
		data : JSON.stringify(check),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept","application/json");
			xhr.setRequestHeader("Content-Type","application/json");
		},
		success : function(data, textStatus, jqXHR) {
			alerta("Campos Asignados");
		},
		error : function(jqXHR, textStatus, errorThrown) {
			loading.hide();
			swal({
				  title: "Error!",
				  text: "No se ha podido registrar la infomacion, consulte con el administrador del sistema",
				  type: "error",
				  confirmButtonText: "Aceptar"
			});
		}
	});
}