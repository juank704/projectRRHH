var Impuestos=[];
var UTM=new Object();
var Impuesto=new Object();
$(document).ready(function() {
  $("#loading").show();
  onLoadImpuesto();
  $("#selectorPeriodo").select2();
  getPeriodos();
});

function getPeriodos(){
	
	$.ajax({
		  type: "GET",
	      async: true,			    
		  url: "/simpleWeb/json/work/ImpuestoUnico/getPeriodos/",			  
		  success:function (data){			  
			  
			  var newOption1 = new Option("seleccionar..", "0", true, true);
			  $("#selectorPeriodo").append(newOption1);
			 
			    $.each(data, function(k, v) {		    
			    	if ($('#selectorPeriodo').find("option[value='" + v.fecha + "']").length) {
			    		 $('#selectorPeriodo').val(v.fecha);
			    	} else { 
			    	    // Create a DOM Option and pre-select by default
			    		var p=""+v.fecha;
					      var a=p.substring(0, 4);
					      var b=p.substring(5, 7);
					      var periodo= b+"-"+a;
			    		
			    		
			    	    var newOption = new Option(periodo, v.fecha, true, true);
			    	    // Append it to the select
			    	    $('#selectorPeriodo').append(newOption);
			    	} 			    	
			  	});
		  },
		  error:function (ex){
			  swal({
		            title: '<i>ERROR</i>',
		            type: 'info',
		            html: JSON.stringify(ex),
		            showCloseButton: true,
		            showCancelButton: true,
		            focusConfirm: false,
		            confirmButtonText:
		              '<i class="fa fa-thumbs-up"></i>OK!',
		            confirmButtonAriaLabel: 'Thumbs up, great!',
		            cancelButtonText:
		            '<i class="fa fa-thumbs-down"></i>',
		            cancelButtonAriaLabel: 'Thumbs down',
		          });
		  }  
		});
}
function onLoadImpuestoByPeriodo($this){
	var periodo=$this.value;
	
	
	
}






//--------------------------Get Impuestos-----------------------
function onLoadImpuesto(){
	var table;
	var lastFecha;  
	var valor;
	
	  if ( $.fn.dataTable.isDataTable( '#tbl_Impuesto' ) ) {
		    table = $('#tbl_Impuesto').DataTable();
		    table.clear();
		}
		else {
		    table = $('#tbl_Impuesto').DataTable( 
		    	{
		    		searching: false,
		    		paging: false,
		    		info: false,
		    		search: false,
		    		"columnDefs": [
		    		               { className: "text-center", "targets": [ 0,1,2,3,4,5,6,7,8,9 ] }
		    		             ]
		    	}
		    )
		}
	  $("#loading").show();
	  //traigo la ultima fecha
	  $.ajax({
		  type: "GET",
	      async: false,
		  dataType: "json",	  
		  url: "/simpleWeb/json/work/ImpuestoUnico/getLastPeriodo/",	  
		  processData: false,
		  contentType: false,
		  success:function (data){
			
			lastFecha=""+ data[0].fecha;
			lastFecha=lastFecha.substring(0,7);    
			  
		  },
		  error:function (ex){
			  swal({
		            title: '<i>ERROR</i>',
		            type: 'info',
		            html: JSON.stringify(ex),
		            showCloseButton: true,
		            showCancelButton: true,
		            focusConfirm: false,
		            confirmButtonText:
		              '<i class="fa fa-thumbs-up"></i>OK!',
		            confirmButtonAriaLabel: 'Thumbs up, great!',
		            cancelButtonText:
		            '<i class="fa fa-thumbs-down"></i>',
		            cancelButtonAriaLabel: 'Thumbs down',
		          });
			  
		  }
			  
		});
	  
	  //traigo la ultima UTM de ese periodo
	  $.ajax({
		  type: "GET",
	      async: false,
		  dataType: "json",	  
		  url: "/simpleWeb/json/work/valorUTM/getLastByPeriodo/"+lastFecha,	  
		  processData: false,
		  contentType: false,
		  success:function (data){
			 UTM.idValor=data[0].idValor;
			 UTM.idMoneda=data[0].idMoneda;
			 UTM.valor=data[0].valor;
			 UTM.fecha=data[0].fecha;
			
			 valor=data[0].valor;
			 valor=parseFloat(valor);
			  
			  
		  },
		  error:function (ex){
			  swal({
		            title: '<i>ERROR</i>',
		            type: 'info',
		            html: JSON.stringify(ex),
		            showCloseButton: true,
		            showCancelButton: true,
		            focusConfirm: false,
		            confirmButtonText:
		              '<i class="fa fa-thumbs-up"></i>OK!',
		            confirmButtonAriaLabel: 'Thumbs up, great!',
		            cancelButtonText:
		            '<i class="fa fa-thumbs-down"></i>',
		            cancelButtonAriaLabel: 'Thumbs down',
		          });
		  }
		});
	  
	  //traigo la ultima tabla y le agrego su ultima fecha
	  $.ajax({
		  type: "GET",
	      async: false,
		  dataType: "json",	  
		  url: "/simpleWeb/json/work/ImpuestoUnico/getImpuestoByLastPeriod/",	  
		  processData: false,
		  contentType: false,
		  success:function (data){
		
			    $.each(data, function(k, v) {
			    	Impuesto=new Object();
			    	Impuesto.idImpuesto=v.idImpuesto;
			    	Impuesto.fecha=v.fecha;
			    	Impuesto.desde=v.desde;
			    	Impuesto.hasta=v.hasta;
			    	Impuesto.factor=v.factor;
			    	Impuesto.rebaja=v.rebaja;
			    	Impuesto.tasaMaxima=v.tasaMaxima;
			    	Impuesto.idMoneda=v.idMoneda;
			    	Impuesto.moneda=v.moneda;
			    	Impuestos.push(Impuesto);
			    	
			    	
				      var desde=parseFloat(v.desde);
				      var desdeUTM=parseFloat(v.desde);
				      var hasta=parseFloat(v.hasta);
				      var hastaUTM=parseFloat(v.hasta);				      
				      var factor=parseFloat(v.factor);
				      var factorUTM=parseFloat(v.factor);
				      var rebaja=parseFloat(v.rebaja);
				      var rebajaUTM=parseFloat(v.rebaja);				      
				      var tasaMaxima=parseFloat(v.tasaMaxima);
				      var tasaMaximaUTM=parseFloat(v.tasaMaxima);
				      desde=desde*valor;
				      hasta=hasta*valor;
				      hastaUTM=""+hastaUTM;
				      hastaUTM=hastaUTM=="NaN"?"Y Más":hastaUTM;
				      factor=factor*valor;
				      rebaja=rebaja*valor;
				      tasaMaxima=tasaMaxima*valor;
				      desde=desde.toFixed(2);
				      hasta=hasta.toFixed(2);
				      factor=factor.toFixed(2);
				      rebaja=rebaja.toFixed(2);
				      tasaMaxima=tasaMaxima.toFixed(2);
				      
				      table.row.add([  k+1, desdeUTM,hastaUTM,rebajaUTM, specialFixToMoney(desde), specialFixToMoney(hasta), factorUTM, specialFixToMoney(rebaja),tasaMaximaUTM, specialFixToMoney(tasaMaxima)]);
			    });
			    table.draw();
		  },
		  error:function (ex){
			  swal({
		            title: '<i>ERROR</i>',
		            type: 'info',
		            html: JSON.stringify(ex),
		            showCloseButton: true,
		            showCancelButton: true,
		            focusConfirm: false,
		            confirmButtonText:
		              '<i class="fa fa-thumbs-up"></i>OK!',
		            confirmButtonAriaLabel: 'Thumbs up, great!',
		            cancelButtonText:
		            '<i class="fa fa-thumbs-down"></i>',
		            cancelButtonAriaLabel: 'Thumbs down',
		          });
		  },
		  complete:function(){
			  $("#loading").hide();
		  }
		});
}
function mostrarPeriodo($this){
	
	Impuestos=[];
	var periodo= $this.value;
	periodo=""+ periodo;
	periodo=periodo.substring(0,7);
	var table;
	var lastFecha;  
	var valor;
	
	
	
	
	  if ( $.fn.dataTable.isDataTable( '#tbl_Impuesto' ) ) {
		    table = $('#tbl_Impuesto').DataTable();
		    table.clear();
		}
		else {
		    table = $('#tbl_Impuesto').DataTable( 
		    	{
		    		searching: false,
		    		paging: false,
		    		info: false,
		    		search: false,
		    		"columnDefs": [
		    		               { className: "text-center", "targets": [ 0,1,2,3,4,5,6,7,8,9 ] }
		    		             ]
		    	}
		    )
		}
	  $("#loading").show();
//	  traigo el ultimo valor de UTM de ese periodo
	  
	  $.ajax({
		  type: "GET",
	      async: false,
		  dataType: "json",	  
		  url: "/simpleWeb/json/work/valorUTM/getLastByPeriodo/"+periodo,	  
		  processData: false,
		  contentType: false,
		  success:function (data){
			 UTM.idValor=data[0].idValor;
			 UTM.idMoneda=data[0].idMoneda;
			 UTM.valor=data[0].valor;
			 UTM.fecha=data[0].fecha;
			
			 valor=data[0].valor;
			 valor=parseFloat(valor);
			  
			  
		  },
		  error:function (ex){
			  swal({
		            title: '<i>ERROR</i>',
		            type: 'info',
		            html: JSON.stringify(ex),
		            showCloseButton: true,
		            showCancelButton: true,
		            focusConfirm: false,
		            confirmButtonText:
		              '<i class="fa fa-thumbs-up"></i>OK!',
		            confirmButtonAriaLabel: 'Thumbs up, great!',
		            cancelButtonText:
		            '<i class="fa fa-thumbs-down"></i>',
		            cancelButtonAriaLabel: 'Thumbs down',
		          });
		  }
		});
	 
	  //traigo la ultima tabla
	  $.ajax({
		  type: "GET",
	      async: false,
		  dataType: "json",	  
		  url: "/simpleWeb/json/work/ImpuestoUnico/getImpuestosUnicosByPeriod/"+periodo,	  
		  processData: false,
		  contentType: false,
		  success:function (data){
		
			  $.each(data, function(k, v) {
			    	Impuesto=new Object();
			    	Impuesto.idImpuesto=v.idImpuesto;
			    	Impuesto.fecha=v.fecha;
			    	Impuesto.desde=v.desde;
			    	Impuesto.hasta=v.hasta;
			    	Impuesto.factor=v.factor;
			    	Impuesto.rebaja=v.rebaja;
			    	Impuesto.tasaMaxima=v.tasaMaxima;
			    	Impuesto.idMoneda=v.idMoneda;
			    	Impuesto.moneda=v.moneda;
			    	Impuestos.push(Impuesto);
			    	
			    	
				      var desde=parseFloat(v.desde);
				      var desdeUTM=parseFloat(v.desde);
				      var hasta=parseFloat(v.hasta);
				      var hastaUTM=parseFloat(v.hasta);				      
				      var factor=parseFloat(v.factor);
				      var factorUTM=parseFloat(v.factor);
				      var rebaja=parseFloat(v.rebaja);
				      var rebajaUTM=parseFloat(v.rebaja);				      
				      var tasaMaxima=parseFloat(v.tasaMaxima);
				      var tasaMaximaUTM=parseFloat(v.tasaMaxima);
				      desde=desde*valor;
				      hasta=hasta*valor;
				      hastaUTM=""+hastaUTM;
				      hastaUTM=hastaUTM=="NaN"?"Y Más":hastaUTM;
				      factor=factor*valor;
				      rebaja=rebaja*valor;
				      tasaMaxima=tasaMaxima*valor;
				      desde=desde.toFixed(2);
				      hasta=hasta.toFixed(2);
				      factor=factor.toFixed(2);
				      rebaja=rebaja.toFixed(2);
				      tasaMaxima=tasaMaxima.toFixed(2);
				      
				      table.row.add([  k+1, desdeUTM,hastaUTM,rebajaUTM, specialFixToMoney(desde), specialFixToMoney(hasta), factorUTM, specialFixToMoney(rebaja),tasaMaximaUTM, specialFixToMoney(tasaMaxima)]);
			    });
			    table.draw();  
			  
		  },
		  error:function (ex){
			  swal({
		            title: '<i>ERROR</i>',
		            type: 'info',
		            html: JSON.stringify(ex),
		            showCloseButton: true,
		            showCancelButton: true,
		            focusConfirm: false,
		            confirmButtonText:
		              '<i class="fa fa-thumbs-up"></i>OK!',
		            confirmButtonAriaLabel: 'Thumbs up, great!',
		            cancelButtonText:
		            '<i class="fa fa-thumbs-down"></i>',
		            cancelButtonAriaLabel: 'Thumbs down',
		          });
			  
		  },
		  complete:function(){
			  $("#loading").hide();
		  }
			  
		});
	  
	  
	
	
	
}








//------------------------Edicion Multiple----------------------
$("#updateMImpuestoForm").submit(function(event) {
	  event.preventDefault();
	  updateImpuestos();
});
function updateImpuestos(){
	
	$.each(Impuestos, function(k, v) {
		var x=k+1;
		v.idImpuesto=$("#updateIdImpuesto"+x).val();
		v.desde=$("#updateDesdeImpuesto"+x).val();
		v.hasta=$("#updateHastaImpuesto"+x).val();
		v.factor=$("#updateFactorImpuesto"+x).val();
		v.rebaja=$("#updateRebajaImpuesto"+x).val();
		v.tasaMaxima=$("#updateTasaMImpuesto"+x).val();
    	
	});
	
	
	
	$.ajax({
	    type: "POST",
	    async: false,
	    url: "/simpleWeb/json/work/ImpuestoUnico/updateImpuestosUnicosByPeriodo/",
	    data: JSON.stringify(Impuestos),
	    beforeSend: function(xhr) {
	      xhr.setRequestHeader("Accept", "application/json");
	      xhr.setRequestHeader("Content-Type", "application/json");
	    },
	    success: function(data) {
	    	$("#updateMImpuestoModal").modal("toggle");
	    },
	    error: function(ex) {
	      swal({
        title: '<i>ERROR</i>',
        type: 'info',
        html:
        JSON.stringify(ex),
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i>OK!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
        '<i class="fa fa-thumbs-down"></i>',
        cancelButtonAriaLabel: 'Thumbs down',
      });
	    },
	    complete:function(){
	    	alerta("Tramos de Impuesto Actualizados");
	    	location.reload();
	    }
	  });
	 
}
function cerrarModalMupdate(){
	$("#updateMImpuestoModal").modal("toggle");
}

function modificarImpuestoMasivo(){
	
	
	$.each(Impuestos, function(k, v) {
		var x=k+1;
		
		$("#updateIdImpuesto"+x).val(v.idImpuesto);
		$("#updateDesdeImpuesto"+x).val(v.desde);
		$("#updateHastaImpuesto"+x).val(v.hasta);
		$("#updateFactorImpuesto"+x).val(v.factor);
		$("#updateRebajaImpuesto"+x).val(v.rebaja);
		$("#updateTasaMImpuesto"+x).val(v.tasaMaxima);
    	});
			$("#updateMImpuestoModal").modal("toggle");
	
	
	
}





function specialFixToMoney($number){
	
	var partes=$number.split(".");
	
	var parte1=partes[0];
	var parte2=partes[1];
	parte1=stringToMoney(parte1);
	
	var moneda=parte1+","+parte2;
	moneda=moneda=="NaN"?"Y Más":moneda;
	moneda=moneda=="$NaN,undefined"?"Y Más":moneda;
	return moneda;
	
	
}




