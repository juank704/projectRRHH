$(document).ready(function() {
setearInput();
traerCentrosDeCostos();
});


function setearInput(){
	$("#inputMoneda").val("$0,00");
}

function traerCentrosDeCostos(){
	//IPSERVERSAP+JSON_BAPI_COSTCENTER_GETLIST1.aspx?SOCIEDAD=%22%22&GRUPO=%22%22&CECO=SH11AC0001
	
	$.ajax({
		  type: "GET",
	      async: false,
		  dataType: "json",	  
		  url: "/simpleWeb/json/work/CentroCostos/getCentroCostoByCeco/SH11AC0001/p",	  
		  processData: false,
		  contentType: false,
		  success:function (data){
			 console.log(data);
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
		  complete:function (){
			  
		  }
		});
	
}



function corroborar(){
	$("#inputMoneda2").val(monedaToStringParseado($("#inputMoneda").val()));
	var a =$("#inputMoneda2").val();
	var b=darFormatoMonedaTexto(a,0,"$");
	
	$("#inputMoneda3").val(b);
	
	
}
function monedaToStringParseado($valor){
	$string=$valor.replace('$','');
	$string=$string.replace(/[\.\$]/gi,'');
	
	return $string;
	
}
function cambiarAValor($this){
	var a=$this.value;
	var b=darFormatoMonedaTexto(a,3,"$");
	
	$("#inputMoneda3").val(b)
	
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
