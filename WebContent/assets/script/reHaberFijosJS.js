$(document).ready(function(){
	
});

$("#pInvo").change(function(){
	var pInvo = $("#pInvo").val();
	var auxpInvo = pInvo.split("-");
	var fIn = "01-"+auxpInvo[1]+"-"+auxpInvo[0];
	var fFin = "31-"+auxpInvo[1]+"-"+auxpInvo[0];
	console.log(fIn);	
	console.log(fFin);
});