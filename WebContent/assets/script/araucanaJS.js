$(document).ready(function(){
	
});

$("#usCod").change(function(){
	var usCod = $("#usCod").val();
	if(usCod == 1){
		$("#codSu").prop("disabled", true);
	}else{
		$("#codSu").prop("disabled", false);
	}
});

$("#araPer").change(function(){
	var araPer = $("#araPer").val();
	var aux = araPer.split("-");
	var perIn = "01-"+aux[1]+"-"+aux[0];
	var perFin = "31-"+aux[1]+"-"+aux[0];
})

$("#btnAraucana").click(function(){
	var araucana = document.getElementsByName("araucana");
	for(var i = 0; i < araucana.length; i++){
		if(!$(araucana[i]).val()){
			$(araucana[i]).focus();
			return false;
		}
	}
});