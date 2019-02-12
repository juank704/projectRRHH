var numeroDeInputs;
$(document).ready(function(){

});
onLoadResources();
getSueldoBaseByContract();

function onLoadResources()
{
$.ajax({
	  type: "GET",
      async: false,
	  dataType: "json",	  
	  url: "/simpleWeb/json/work/SueldoMinimoMasivo/getLastSueldoMinimoMasivo/",	  
	  processData: false,
	  contentType: false,
	  success:function (data){
		  
		  $("#sueldoMinimoActualLabel").html(formatearAMoneda(data.valorSueldoMinimo));
		  
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
function getSueldoBaseByContract()
{
	$.ajax({
		  type: "GET",
	      async: false,
		  dataType: "json",	  
		  url: "/simpleWeb/json/work/SueldoMinimoMasivo/getSueldosMinimosByContract/",	  
		  processData: false,
		  contentType: false,
		  success:function (data){
			  var a=0;
			  $.each(data, function(k, v) {
				  $("#blocksSueldos").append(addInput(v.horasSemanales, k));
				  a=k;
			  });
			  numeroDeInputs=a;
			  
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
function listarSueldo(){
	var a=$("#inputSueldoBaseNuevo").val();
	
	a=a.replace(/\./g,'');
	a=a.replace(/[^0-9]/gi,'');
	a.replace(/[\.\$\,]/gi,'');
	a=a.replace('$','');
	
	for(var $i=0;$i<=numeroDeInputs;$i++)
	{
		var l=parseFloat($("#labelSueldoMinimo"+$i).html());
		var aux=(l*a)/45;
		aux=parseInt(aux);
		;
		$("#InputSueldoMinimo"+$i).val(this.formatearAMoneda(aux));
		
	}
}

function modificarSueldoMinimoBase()
{
	
	for(var $i=0; $i<numeroDeInputs;$i++)
	{
		$.ajax({
    	    type: "POST",
    	    async: false,
    	    url: "/simpleWeb/json/work/AFPs/updateAFP/",
    	    data: JSON.stringify(data),
    	    beforeSend: function(xhr) {
    	      xhr.setRequestHeader("Accept", "application/json");
    	      xhr.setRequestHeader("Content-Type", "application/json");
    	    },
    	    success: function(data) {
    	    	$("#editarAFPModal").modal("toggle");
    	    	alerta("AFP Actualizada");
    	    	 location.reload();
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
    	    }
    	  });
		
	}
}







//Formato de Moneda

$('.money').each(function(key, value){
	$(value)
	.blur(function() {
		$(this).formatCurrency({ colorize: true, negativeFormat: '-%n', roundToDecimalPlace: -1, digitGroupSymbol: '.', decimalSymbol: ',' });
		
	})
	.keyup(function(e) {
			var e = window.event || e;
			var keyUnicode = e.charCode || e.keyCode;
			if (e !== undefined) {
				switch (keyUnicode) {
					case 16: break; // Shift
					case 17: break; // Ctrl
					case 18: break; // Alt
					case 27: this.value = ''; break; // Esc: clear entry
					case 35: break; // End
					case 36: break; // Home
					case 37: break; // cursor left
					case 38: break; // cursor up
					case 39: break; // cursor right
					case 40: break; // cursor down
					case 78: break; // N (Opera 9.63+ maps the "." from the
									// number key section to the "N" key
									// too!) (See:
									// http://unixpapa.com/js/key.html
									// search for ". Del")
					case 110: break; // . number block (Opera 9.63+ maps
										// the "." from the number block to
										// the "N" key (78) !!!)
					case 190: break; // .
					default: $(this).formatCurrency({ colorize: true, negativeFormat: '-%n', digitGroupSymbol: '.', decimalSymbol: ',', roundToDecimalPlace: -1, eventOnDecimalsEntered: true });
				}
			}
			
		})
		.bind('decimalsEntered', function(e, cents) {
			if (String(cents).length > 2) {
			}
		});
});

function addInput($hora, $numeroInput)
{
	var input="<div class='form-group'>";
	input+="<label class='col-md-3 control-label' id='labelSueldoMinimo"+$numeroInput+"'>"+$hora+" </label>";
	input+="<div class='col-md-4'>";
	input+="<input type='text' class='form-control' placeholder='Ingresar valor' id='InputSueldoMinimo"+$numeroInput+"'>";
	input+="<span class='help-block hide money'> A block of help text. </span>";
	input+="</div>";
	input+="</div>";
	
	return input;
	
}
(function($){$.formatCurrency={};$.formatCurrency.regions=[];$.formatCurrency.regions[""]={symbol:"$",positiveFormat:"%s%n",negativeFormat:"(%s%n)",decimalSymbol:".",digitGroupSymbol:",",groupDigits:true};
$.fn.formatCurrency=function(destination,settings){if(arguments.length==1&&typeof destination!=="string"){settings=destination;destination=false
}var defaults={name:"formatCurrency",colorize:false,region:"",global:true,roundToDecimalPlace:2,eventOnDecimalsEntered:false};defaults=$.extend(defaults,$.formatCurrency.regions[""]);
settings=$.extend(defaults,settings);if(settings.region.length>0){settings=$.extend(settings,getRegionOrCulture(settings.region))}settings.regex=generateRegex(settings);
return this.each(function(){$this=$(this);var num="0";num=$this[$this.is("input, select, textarea")?"val":"html"]();if(num.search("\\(")>=0){num="-"+num
}if(num===""||(num==="-"&&settings.roundToDecimalPlace===-1)){return}if(isNaN(num)){num=num.replace(settings.regex,"");if(num===""||(num==="-"&&settings.roundToDecimalPlace===-1)){return
}if(settings.decimalSymbol!="."){num=num.replace(settings.decimalSymbol,".")}if(isNaN(num)){num="0"}}var numParts=String(num).split(".");var isPositive=(num==Math.abs(num));
var hasDecimals=(numParts.length>1);var decimals=(hasDecimals?numParts[1].toString():"0");var originalDecimals=decimals;num=Math.abs(numParts[0]);
num=isNaN(num)?0:num;if(settings.roundToDecimalPlace>=0){decimals=parseFloat("1."+decimals);decimals=decimals.toFixed(settings.roundToDecimalPlace);
if(decimals.substring(0,1)=="2"){num=Number(num)+1}decimals=decimals.substring(2)}num=String(num);if(settings.groupDigits){for(var i=0;i<Math.floor((num.length-(1+i))/3);
i++){num=num.substring(0,num.length-(4*i+3))+settings.digitGroupSymbol+num.substring(num.length-(4*i+3))}}if((hasDecimals&&settings.roundToDecimalPlace==-1)||settings.roundToDecimalPlace>0){num+=settings.decimalSymbol+decimals
}var format=isPositive?settings.positiveFormat:settings.negativeFormat;var money=format.replace(/%s/g,settings.symbol);money=money.replace(/%n/g,num);
var $destination=$([]);if(!destination){$destination=$this}else{$destination=$(destination)}$destination[$destination.is("input, select, textarea")?"val":"html"](money);
if(hasDecimals&&settings.eventOnDecimalsEntered&&originalDecimals.length>settings.roundToDecimalPlace){$destination.trigger("decimalsEntered",originalDecimals)
}if(settings.colorize){$destination.css("color",isPositive?"black":"red")}})};$.fn.toNumber=function(settings){var defaults=$.extend({name:"toNumber",region:"",global:true},$.formatCurrency.regions[""]);
settings=jQuery.extend(defaults,settings);if(settings.region.length>0){settings=$.extend(settings,getRegionOrCulture(settings.region))}settings.regex=generateRegex(settings);
return this.each(function(){var method=$(this).is("input, select, textarea")?"val":"html";$(this)[method]($(this)[method]().replace("(","(-").replace(settings.regex,""))
})};$.fn.asNumber=function(settings){var defaults=$.extend({name:"asNumber",region:"",parse:true,parseType:"Float",global:true},$.formatCurrency.regions[""]);
settings=jQuery.extend(defaults,settings);if(settings.region.length>0){settings=$.extend(settings,getRegionOrCulture(settings.region))}settings.regex=generateRegex(settings);
settings.parseType=validateParseType(settings.parseType);var method=$(this).is("input, select, textarea")?"val":"html";var num=$(this)[method]();
num=num?num:"";num=num.replace("(","(-");num=num.replace(settings.regex,"");if(!settings.parse){return num}if(num.length==0){num="0"}if(settings.decimalSymbol!="."){num=num.replace(settings.decimalSymbol,".")
}return window["parse"+settings.parseType](num)};function getRegionOrCulture(region){var regionInfo=$.formatCurrency.regions[region];if(regionInfo){return regionInfo
}else{if(/(\w+)-(\w+)/g.test(region)){var culture=region.replace(/(\w+)-(\w+)/g,"$1");return $.formatCurrency.regions[culture]}}return null}function validateParseType(parseType){switch(parseType.toLowerCase()){case"int":return"Int";
case"float":return"Float";default:throw"invalid parseType"}}function generateRegex(settings){if(settings.symbol===""){return new RegExp("[^\\d"+settings.decimalSymbol+"-]","g")
}else{var symbol=settings.symbol.replace("$","\\$").replace(".","\\.");return new RegExp(symbol+"|[^\\d"+settings.decimalSymbol+"-]","g")}}})(jQuery);




