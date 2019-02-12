$(document).ready(function(){
	
});

var depMovPer;
var hapMovPer;

$("#backMovPersonal").click(function(){
	window.location.href = ("movPersonal");
});

$("#pMovPer").change(function(){
	var pMovPer = $("#pMovPer").val();
	var auxpMovPer = pMovPer.split("-");
	depMovPer = "01-" + auxpMovPer[1] +"-" +auxpMovPer[0];
	hapMovPer = "31-" + auxpMovPer[1] +"-" +auxpMovPer[0];
});