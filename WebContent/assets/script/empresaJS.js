$(document).ready(function(){
	loadEmpresa();
})

//$("#addEmpresa").click(function(){
//	window.location.href = ("addEmpresa");
//});

function loadEmpresa(){
	var tbl = "<tr><td>001" +
			"</td><td>93.563.233-5" +
			"</td><td>Marcelo Valdes" +
			"</td><td>Expled" +
			"</td><td>Calle falsa #123" +
			"</td><td><a id='addEmpresa' href='addEmpresa' title='Modificar' class='btn btn-circle yellow btn-outline'><i class='fa fa-pencil-square-o fa-lg'></i></a>" +
			"<a id='detCol' onclick='javascript: detCol();' title='Detalles' class='btn btn-circle blue btn-outline'><i class='fa fa-align-justify'></i></a>" +
			"<a id='delCol' title='Eliminar' class='btn btn-circle red btn-outline'><i class='fa fa-trash-o fa-lg'></i></a>" +
			"</td></tr>";
	$("#tblEmpresa").append(tbl);
};