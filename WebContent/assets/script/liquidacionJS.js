$(document).ready(function(){
	initAction();
});

$("#seLiq").click(function(){
	if(!$("#liqDes").val()){
		$("#liqDes").focus();
		return false;
	}else if(!$("#liqHas").val()){
		$("#liqHas").focus();
		return false;
	}else{
		var liqDes = $("#liqDes").val();
		var auxDes = liqDes.split("-");
		var desde = "01-"+auxDes[1]+"-"+auxDes[0];
		
		var liqHas = $("#liqHas").val();
		var auxHas = liqHas.split("-");
		var hasta = "31-"+auxHas[1]+"-"+auxHas[0];
	}
});

$("#addReportLiq").click(function(){
	window.location.href = ("reLiquidacion");
});

$("#viewLiqui").click(function(){
	$("#sectionLiqui").hide();
	$("#divReportLiq").hide();
	$("#divBacktLiq").show();
	$("#ignore").show();
	$("#divAsPdf").show();
	$("#secViewLiqui").show();
	$("#sectionViewLiqui").show();
});

$("#backLiqui").click(function(){
	$("#sectionLiqui").show();
	$("#divReportLiq").show();
	$("#ignore").hide();
	$("#divBacktLiq").hide();
	$("#divAsPdf").hide();
	$("#secViewLiqui").hide();
});

function initAction(){
	$('#tbl_liqui').DataTable({
		"sPaginationType": "full_numbers" ,
	});
	add();
}

function add(){
	var object = document.getElementById('tbl_liqui_filter');
	var object1 = document.getElementById('tbl_liqui_paginate');
	object.style.float = "right";
	object1.style.float = "right";
}

$("#viewAsPdf").click(function(){
	$("#ignore").hide();
	var doc = new jsPDF();
    
    doc.setFontSize(15);
    doc.text(15, 15, "");
	html2canvas($("#secViewLiqui"), {
		onrendered: function(canvas){
			var img = canvas.toDataURL("image/jpeg");
			doc.addImage(img, 'JPEG', 8 ,  8, 190, 200);
			doc.output("dataurlnewwindow");
		}
	});
});