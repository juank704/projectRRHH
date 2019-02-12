$(document).ready(function() {
  $("#loading").show();
  onLoadIndicadores();
  llenarSelectores();
  SelectorPeriodo();
});
function SelectorPeriodo(){
	$.ajax({
		  type: "GET",
	      async: false,			    
		  url: "/simpleWeb/json/work/indicadoresMonetarios/getPeriodos/",			  
		  success:function (data){
			  $("#selectorPeriodo").append('<option value=0>Seleccionar...</option>');
			    $.each(data, function(k, v) {
			    	fecha=v.fecha.split("-");
			    	$("#selectorPeriodo").append('<option value='+(fecha[2]+"-"+fecha[1]+"-"+fecha[0])+'>'+(fecha[2]+"-"+fecha[1]+"-"+fecha[0])+'</option>');
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
		  },
		  complete:function (ex){
			  $("#loading").hide();
		  }
		});
}
function onLoadIndicadores(){
	//inicializo la tabla
	var table;	
	 if ( $.fn.dataTable.isDataTable( '#tbl_Ind' ) ) {
	    table = $('#tbl_Ind').DataTable();
	    table.clear();
	}
	else {
	    table = $('#tbl_Ind').DataTable( 
	    	{
	    		searching: true,
	    		paging:true,
	    		info: false,
	    		search: true
	    	}
	    )	    
	}
		$.ajax({
		  type: "GET",
	      async: false,			    
		  url: "/simpleWeb/json/work/indicadoresMonetarios/getIndicadores/",			  
		  success:function (data){
			    $.each(data, function(k, v) {
			    	var acciones = "";
			   		acciones +=		"<button title='Actualizar' id='"+k+"' onclick=\"javascript:modificarMant('" +v.idValor + "')\" class='btn btn-circle green btn-outline btn-sm col-md-4 margin-left-7'><i class='fa fa-pencil-square-o fa-lg'></i></button>";
			   	 	acciones +=		"<button title='Borrar' id='" +k+"' onclick=\"javascript:borrarMant("+v.idValor+")\" class='btn btn-circle red btn-outline btn-sm col-md-4'><i class='fa fa-trash-o fa-lg'></i></button>";		
			   	 	var fecha=v.fecha.split("-");
			   	 	var valor=v.valor.toString().replace(".",",");
			   	 	var index=valor.indexOf(",");
			    	if(index!=-1){
			    		
			    		var decimales=valor.length-index-1;
			    		valor=darFormatoMonedaTexto(valor, decimales,"$");
			    	}
			    	else{
			    		valor=darFormatoMonedaTexto(valor, 0,"$");
			    	}
			    	
			    	
			   	 	
			   	 	
			   	 	
			   	 	
			    	table.row.add([  k+1,
			    	                 v.nombreMoneda,
			    	                 valor,
			    	                 fecha[2]+"-"+fecha[1]+"-"+fecha[0],
			    	                 acciones
			    	                 ]);
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
		  complete: function(e){
			  $("#loading").hide();
		  }
		});
}



function llenarSelectores()
{
	//
	
	$.ajax({
		  type: "GET",
	      async: false,			    
		  url: "/simpleWeb/json/work/divisas/getDivisas/",			  
		  success:function (data){
			 
			  $("#editarMonedaIndicador").append('<option value=0>Seleccionar...</option>');
			  $("#insertMonedaIndicador").append('<option value=0>Seleccionar...</option>');
			  $("#selectorTipoMoneda").append('<option value=0>Seleccionar...</option>');
			    $.each(data, function(k, v) {
			    	
			    	$("#editarMonedaIndicador").append('<option value='+v.idMoneda+'>'+v.moneda+'</option>');
			    	$("#insertMonedaIndicador").append('<option value='+v.idMoneda+'>'+v.moneda+'</option>');
			    	$("#selectorTipoMoneda").append('<option value='+v.idMoneda+'>'+v.moneda+'</option>');
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
function agregarIndicador(){
	$("#agregarIndicadorModal").modal("toggle");
}
function cerrarModalAgregar(){
	$("#agregarIndicadorModal").modal("toggle");
}
$("#insertIndicadorForm").submit(function(event) {
	  event.preventDefault();
	  insertIndicador();
	});





function insertIndicador(){
	 event.preventDefault();
	 var text="tienes algunos errores, Revisa el campo ";
	var idmoneda=$("#insertMonedaIndicador").val();
    var valor=$("#insertValorIndicador").val();
    
    
    
    var fecha=$("#insertFechaIndicador").val();
    var datos=new Array();
    
    if(idmoneda==0 || valor==0 || valor=="" || fecha==""){
    	if(idmoneda==0)
    	{
    		datos.push("tipo Moneda");
    	}
    	if(valor==0 || valor=="")
    	{
    		datos.push("valor");
    	}
    	if(fecha=="")
    	{
    		datos.push("fecha");
    	}
    	for(var i=0;i<datos.length;i++)
    	{
    		if(i==0){
    			text+=datos[i];
    		}
    		else{
    			text+=", "+datos[i]
    		}
    	}
    	$("#fwa").css("display","block");
    	$("#textofwa").html(text);
    	
    }
    else{
    	var indicador=new Object();
    	indicador.idMoneda=idmoneda;
    	
    	
    	indicador.valor=monedaToStringParseado(valor);
    	indicador.fecha=fecha;
        addIndicador(indicador);
        
        }   
}
function valorParcialEdicion($this){
	var tipo=$("#editarMonedaIndicador").val();
	if(tipo==0){
		alerta("debe elegir un tipo de moneda");
	}
	else if (tipo==2){
		$this.value=darFormatoMonedaTexto($this.value,2,"$")
	}
	else if (tipo==3){
		$this.value=darFormatoMonedaTexto($this.value,0,"$")
		}
	else if (tipo==6){
		$this.value=darFormatoMonedaTexto($this.value,1,"$")
	}
}
function valorParcialInsercion($this){
	var tipo=$("#insertMonedaIndicador").val();
	if(tipo==0){
		alerta("debe elegir un tipo de moneda");
	}
	else if (tipo==2){
		$this.value=darFormatoMonedaTexto($this.value,2,"$")
	}
	else if (tipo==3){
		$this.value=darFormatoMonedaTexto($this.value,0,"$")
		}
	else if (tipo==6){
		$this.value=darFormatoMonedaTexto($this.value,1,"$")
	}
	
}
function addIndicador(indicador)
{
	$.ajax({
        type: "PUT",
        async: false,
        url: "/simpleWeb/json/work/indicadoresMonetarios/createIndicador/",
        data: JSON.stringify(indicador),
        beforeSend: function(xhr) {
          xhr.setRequestHeader("Accept", "application/json");
          xhr.setRequestHeader("Content-Type", "application/json");
        },
        success: function(data) {
        	$("#agregarIndicadorModal").modal("toggle");
        
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
        complete:function (e){
        	alerta("Valor agregado");
   		 location.reload();
        }
      });
}
$("#editIndicadorForm").submit(function(event) {
	  event.preventDefault();
	  editarCampo();
	});
function editarCampo()
{
	var data=new Object();
	data.idValor=$("#editarIdIndicador").val();
	data.idMoneda=$("#editarMonedaIndicador").val();
	data.valor= monedaToStringParseado($("#editarValorIndicador").val());
	data.fecha=$("#editarFechaIndicador").val();
	

    
	$.ajax({
	    type: "POST",
	    async: false,
	    url: "/simpleWeb/json/work/indicadoresMonetarios/updateIndicador/",
	    data: JSON.stringify(data),
	    beforeSend: function(xhr) {
	      xhr.setRequestHeader("Accept", "application/json");
	      xhr.setRequestHeader("Content-Type", "application/json");
	    },
	    success: function(data) {
	    	$("#editarIndicadorModal").modal("toggle");
	    	
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
	    complete: function(e){
	    	alerta("Indicador Actualizado");
	    	location.reload();
	    }
	    
	  });
}
function modificarMant($id){
	
	$.ajax({
	    type: "GET",
	    async: false,
	    url: "/simpleWeb/json/work/indicadoresMonetarios/getIndicadorById/" + $id,
	    success: function(data) {
	    	var fecha=data.fecha.split("-");
	      $("#editarIdIndicador").val(data.idValor);
	      $("#editarMonedaIndicador option[value='"+data.idMoneda+"']").attr("selected","selected");
	   
	      
	      
	      var valor=data.valor.toString().replace(".",",");
	   	 	var index=valor.indexOf(",");
	    	if(index!=-1){
	    		
	    		var decimales=valor.length-index-1;
	    		valor=darFormatoMonedaTexto(valor, decimales,"$");
	    	}
	    	else{
	    		valor=darFormatoMonedaTexto(valor, 0,"$");
	    	}
	      
	      
	      $("#editarValorIndicador").val(valor);
	      $("#editarFechaIndicador").val(data.fecha);	 
	      //pzfgd critica funcional
	     
	      //manejador de la llamada a la base de datos
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
	      })
	    },
	    complete:function(e){
	    	$("#editarIndicadorModal").modal("toggle");
	    }
	  });
}

function cerrarModalEditar(){
	$("#editarIndicadorModal").modal("toggle");
}
function borrarMant($id)
{
	 swal({
		    title: "Estás Seguro?",
		    text: "No serás capaz de revertir esto",
		    type: "warning",
		    showCancelButton: true,
		    confirmButtonColor: "#3085d6",
		    cancelButtonColor: "#d33",
		    confirmButtonText: "Bórralo!"
		  }).then(function(result) {
		    if (result.value) {
		      deleteIndicador($id);
		      
		    }
		  });
}
function search()
{
	$("#loading").show();
	
	var tipo=$("#selectorTipoMoneda").val();
	var urld="";
	if(tipo!=0){
		urld="/simpleWeb/json/work/indicadoresMonetarios/getIndicadoresByType/"+tipo;
	}
	else{
		urld="/simpleWeb/json/work/indicadoresMonetarios/getIndicadores/";
	}
	
	//inicializo la tabla
	var table;	
	 if ( $.fn.dataTable.isDataTable( '#tbl_Ind' ) ) {
	    table = $('#tbl_Ind').DataTable();
	    table.clear();
	}
	else {
	    table = $('#tbl_Ind').DataTable( 
	    	{
	    		searching: true,
	    		paging:true,
	    		info: false,
	    		search: true
	    	}
	    )	    
	}
		$.ajax({
		  type: "GET",
	      async: false,			    
		  url: urld,			  
		  success:function (data){
			    $.each(data, function(k, v) {
			    	
			    	var valor=v.valor.toString().replace(".",",");
			   	 	var index=valor.indexOf(",");
			    	if(index!=-1){
			    	
			    		var decimales=valor.length-index-1;
			    		valor=darFormatoMonedaTexto(valor, decimales,"$");
			    	}
			    	else{
			    		valor=darFormatoMonedaTexto(valor, 0,"$");
			    	}
			    	
			    	
			    	
			    	var acciones = "";
			   		acciones +=		"<button title='Actualizar' id='"+k+"' onclick=\"javascript:modificarMant('" +v.idValor + "')\" class='btn btn-circle green btn-outline btn-sm col-md-4 margin-left-7'><i class='fa fa-pencil-square-o fa-lg'></i></button>";
			   	 	acciones +=		"<button title='Borrar' id='" +k+"' onclick=\"javascript:borrarMant("+v.idValor+")\" class='btn btn-circle red btn-outline btn-sm col-md-4'><i class='fa fa-trash-o fa-lg'></i></button>";		
			   	 	var fecha=v.fecha.split("-");
			    	table.row.add([  k+1,
			    	                 v.nombreMoneda,
			    	                 valor,
			    	                 fecha[2]+"-"+fecha[1]+"-"+fecha[0],
			    	                 acciones
			    	                 ]);
			  	});
			    table.draw();
			    $("#loading").hide();
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
			  SelectorPeriodoByTipo();
		  }
		});
}
function searchPeriodo()
{
	var table = $('#tbl_Ind').DataTable();
	var value=$("#selectorPeriodo").val();
	table.search(value).draw();	
}
function SelectorPeriodoByTipo()
{
	$("#selectorPeriodo").html("");
	var tipo=$("#selectorTipoMoneda").val();
	var url="";
	if(tipo!=0){
		url="/simpleWeb/json/work/indicadoresMonetarios/getPeriodosByTipo/"+tipo;
	}
	else{
		url="/simpleWeb/json/work/indicadoresMonetarios/getPeriodos/";
	}
	var fecha="";
	$.ajax({
		  type: "GET",
	      async: false,			    
		  url: url,			  
		  success:function (data){
			  $("#selectorPeriodo").append('<option value=0>Seleccionar...</option>');
			    $.each(data, function(k, v) {
			    	
			    	fecha=v.fecha.split("-");
			    	$("#selectorPeriodo").append('<option value='+(fecha[2]+"-"+fecha[1]+"-"+fecha[0])+'>'+(fecha[2]+"-"+fecha[1]+"-"+fecha[0])+'</option>');
			  	});
			    
			    $("#loading").hide();
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



function deleteIndicador($id)
{
	 $.ajax({
		    type: "PUT",
		    async: false,
		    url: "/simpleWeb/json/work/indicadoresMonetarios/deleteIndicador/" + $id,

		    beforeSend: function(xhr) {
		      xhr.setRequestHeader("Accept", "application/json");
		      xhr.setRequestHeader("Content-Type", "application/json");
		    },
		    success: function(data) {
		      alerta("valor borrado con exito");
		      
		      location.reload();

		    },
		    error: function(ex) {
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
function darFormatoMonedaTexto($valor, $decimals,$simbolo){
	var valor=$valor.toString().replace(/[^0-9]/gi,'');
	var decimales=$decimals;
	var split=valor.substring(valor.length-decimales, valor.length);
	var split2=valor.substring(0, valor.length-decimales);
	split2=parseInt(split2)?parseInt(split2):0;
	var $lenght=split2.toString().length;	
	$string=split2.toString();
	var $substring="";
	var $nAux="";
	var numeroFormateado = [];
	while($lenght>0)
	{			
		    $substring = $string.substring(($string.length-3), $string.length);
		    $string=$string.substring(0,$string.length-3);
		    numeroFormateado.push($substring);
		    $lenght=$lenght-3;
	}
	var numeroFinal=[];
	for(var $i=numeroFormateado.length-1;$i>=0;$i--)
	{	
	if($i==numeroFormateado.length-1)
		{
			$nAux=numeroFormateado[$i];
		}
		else{
			$nAux=$nAux+"."+numeroFormateado[$i];
		}
	}
	var fin="";
	if(decimales==0){
		fin=$simbolo+$nAux+""+split;
	}
	else{
		fin=$simbolo+$nAux+","+split;
	}
	
	
	return fin;
	
}
function arreglarMoneda($this, $decimals){
	var valor=$this.value.replace(/[^0-9]/gi,'');
	var decimales=$decimals;
	var split=valor.substring(valor.length-decimales, valor.length);
	var split2=valor.substring(0, valor.length-decimales);
	split2=parseInt(split2)?parseInt(split2):0;
	var $lenght=split2.toString().length;	
	$string=split2.toString();
	var $substring="";
	var $nAux="";
	var numeroFormateado = [];
	while($lenght>0)
	{			
		    $substring = $string.substring(($string.length-3), $string.length);
		    $string=$string.substring(0,$string.length-3);
		    numeroFormateado.push($substring);
		    $lenght=$lenght-3;
	}
	var numeroFinal=[];
	for(var $i=numeroFormateado.length-1;$i>=0;$i--)
	{	
	if($i==numeroFormateado.length-1)
		{
			$nAux=numeroFormateado[$i];
		}
		else{
			$nAux=$nAux+"."+numeroFormateado[$i];
		}
	}
	var fin="";
	if(decimales==0){
		fin="$"+$nAux+""+split;
	}
	else{
		fin="$"+$nAux+","+split;
	}
	$this.value=fin;
}
function monedaToStringParseado($valor){
	var $string=$valor.replace('$','');
	$string=$string.replace(/[\.\$]/gi,'');
	
	var a =$string.indexOf(",", 0);
	if(a!=0){
	$string=$string.replace(",",".");
	}
	return $string;
	
}
