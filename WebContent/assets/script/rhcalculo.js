$(document).ready(function() {
  $("#loading").show();
  onLoadCalculo();

});

var iM="";
var PSCI="";
var PSCEF="";
var PorcentajeSCEI="";
var HoraExtra="";
var PorcentajeFSC="";
var DiasLaborales="";
var HoraExtraDiario="";
var HoraExtraSemanal="";
var SelectTI="";
var TopeImponible="";
var SelectTS="";
var TopeSC="";
var SelectTAPV="";
var TopeAPV="";
var SelectTDC="";
var TDConv="";
var SelectTFI="";
var TopeFI="";
var SelectTIPS="";
var TopeIPS="";
var iM2="";
var PSCI2="";
var PSCEF2="";
var PorcentajeSCEI2="";
var HoraExtra2="";
var PorcentajeFSC2="";
var DiasLaborales2="";
var HoraExtraDiario2="";
var HoraExtraSemanal2="";
var SelectTI2="";
var TopeImponible2="";
var SelectTS2="";
var TopeSC2="";
var SelectTAPV2="";
var TopeAPV2="";
var SelectTDC2="";
var TDConv2="";
var SelectTFI2="";
var TopeFI2="";
var SelectTIPS2="";
var TopeIPS2="";








/*--------------submits--------------------------*/

$("#editRHCalculosForm").submit(function(event) {
	event.preventDefault();
  updateRHCalculo();
});

/*-----------------CRUD-----------------------*/
/*-----------------onload-----------------------*/

function llenarSelector($selector){
	$.ajax({
	    type: "GET",
	    async: false,
    url: '/simpleWeb/json/work/divisas/getDivisas/', 
    dataType: "json",
    success: function(data){
    	$($selector).append('<option value=0>Seleccionar...</option>');
    	
    	$.each(data,function(key, registro) {
        $($selector).append('<option value='+registro.idMoneda+'>'+registro.moneda+'</option>');
       
     
    	});        
    },
    error: function(data) {
      alert('error');
    }
  });
	
}

function llenarSelectores()
{
	 var editarSelectTI="#editarSelectTI";
	 var editarSelectTS="#editarSelectTS";
	 var editarSelectTAPV="#editarSelectTAPV";
	 var editarSelectTDC="#editarSelectTDC";
	 var editarSelectFI="#editarSelectTFI";
	 var editarSelectTIPS="#editarSelectTIPS";
	llenarSelector(editarSelectTI);
	llenarSelector(editarSelectTS);
	llenarSelector(editarSelectTAPV);
	llenarSelector(editarSelectTDC);
	llenarSelector(editarSelectFI);	
	llenarSelector(editarSelectTIPS);

}




function onLoadCalculo() {
  readRHCalculo();
}
/*-----------------Read-----------------------*/
function readRHCalculo() {
  $("#loading").show();
  $.ajax({
	  type: "GET",
      async: false,
	  dataType: "json",	  
	  url: "/simpleWeb/json/work/rhcalculo/getRHCalculos/",	  
	  processData: false,
	  contentType: false,
	  success:function (data){
		  llenarSelectores();
		
		     iM=data[0].valor;
		    $("#editarIngresoMinimo").val(formatearAMoneda(iM));
		    PSCI=data[1].valor;
		    $("#editarPorcentajeSCI").val(PSCI);
		    PSCEF=data[2].valor;
		    $("#editarPorcentajeSCEF").val(PSCEF);
		    PorcentajeSCEI=data[3].valor;
		    $("#editarPorcentajeSCEI").val(PorcentajeSCEI);
		    HoraExtra=data[4].valor;
		    $("#editarHoraExtra").val(HoraExtra);
		    PorcentajeFSC=data[5].valor;
		    $("#editarPorcentajeFSC").val(PorcentajeFSC);
		    DiasLaborales=data[6].valor;
		    $("#editarDiasLaborales").val(DiasLaborales);
		    HoraExtraDiario=data[7].valor;
		    $("#editarHoraExtraDiario").val(HoraExtraDiario);
		    HoraExtraSemanal=data[8].valor;
		    $("#editarHoraExtraSemanal").val(HoraExtraSemanal);
		    SelectTI=data[9].idMoneda;
		    $("#editarSelectTI > option[value='"+SelectTI+"']").attr('selected', 'selected');
		    TopeImponible=data[9].valor;
		    $("#editarTopeImponible").val(TopeImponible);
		    SelectTS=data[10].idMoneda;		    
		    $("#editarSelectTS > option[value='"+SelectTS+"']").attr('selected', 'selected');
		    TopeSC=data[10].valor;
		    $("#editarTopeSC").val(TopeSC);
		    SelectTAPV=data[11].idMoneda;
		    $("#editarSelectTAPV > option[value='"+SelectTAPV+"']").attr('selected', 'selected');
		    TopeAPV=data[11].valor;
		    $("#editarTopeAPV").val(TopeAPV);
		    SelectTDC=data[12].idMoneda;
		    $("#editarSelectTDC > option[value='"+SelectTDC+"']").attr('selected', 'selected');
		    TDConv=data[12].valor;		    
		    $("#editarTopeDepConv").val(TDConv);  
		    $("#loading").hide();
		    SelectTFI=data[15].idMoneda;
		    $("#editarSelectTFI > option[value='"+SelectTFI+"']").attr('selected', 'selected');
		    TopeFI=data[15].valor;
		    $("#editarTopeFI").val(TopeFI);
		    SelectTIPS=data[20].idMoneda;
		    $("#editarSelectTIPS > option[value='"+SelectTIPS+"']").attr('selected', 'selected');
		    
		    TopeIPS=data[20].valor;
		  
		    $("#editarTopeIPS").val(TopeIPS);  
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
/*---------------Update --------------- */



/*---------------Update Document--------------- */

function updateSingleRow($row)
{
	
	$.ajax({
  	    type: "POST",
  	    async: false,
  	    url: "/simpleWeb/json/work/rhcalculo/updateRHCalculo/",
  	    data: JSON.stringify($row),
  	    beforeSend: function(xhr) {
  	      xhr.setRequestHeader("Accept", "application/json");
  	      xhr.setRequestHeader("Content-Type", "application/json");
  	    },
  	    success: function(data) {
  	    	
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

function updateRHCalculo() {
	
	var rhcal=new Object();
	iM2=$("#editarIngresoMinimo").val();
	PSCI2=$("#editarPorcentajeSCI").val();
	PSCEF2=$("#editarPorcentajeSCEF").val();
	PorcentajeSCEI2=$("#editarPorcentajeSCEI").val();
	HoraExtra2=$("#editarHoraExtra").val();
	PorcentajeFSC2=$("#editarPorcentajeFSC").val();
	DiasLaborales2=$("#editarDiasLaborales").val();
	HoraExtraDiario2=$("#editarHoraExtraDiario").val();
	HoraExtraSemanal2=$("#editarHoraExtraSemanal").val();
	SelectTI2=$("#editarSelectTI").val();	
	TopeImponible2=$("#editarTopeImponible").val();
	SelectTS2=$("#editarSelectTS").val();
	TopeSC2=$("#editarTopeSC").val();
	SelectTAPV2=$("#editarSelectTAPV").val();
	TopeAPV2=$("#editarTopeAPV").val();
	SelectTDC2=$("#editarSelectTDC").val();
	TDConv2=$("#editarTopeDepConv").val(); 
	
	SelectTFI2=$("#editarSelectTFI").val();
	TopeTF2=$("#editarTopeFI").val(); 
	SelectTIPS2=$("#editarSelectTIPS").val();
	TopeIPS2=$("#editarTopeIPS").val(); 
	
	
	
	
	
	
	
	
	
	
	
  if(iM!=iM2 ||PSCI!=PSCI2 ||PSCEF!=PSCEF2||PorcentajeSCEI!=PorcentajeSCEI2||HoraExtra!=HoraExtra2||PorcentajeFSC!=PorcentajeFSC2||DiasLaborales!=DiasLaborales2||HoraExtraDiario!=HoraExtraDiario2||HoraExtraSemanal!=HoraExtraSemanal2||SelectTI!=SelectTI2||TopeImponible!=TopeImponible2||SelectTS!=SelectTS2||TopeSC!=TopeSC2||SelectTAPV!=SelectTAPV2||TopeAPV!=TopeAPV2||SelectTDC!=SelectTDC2||TDConv!=TDConv2||SelectTFI!=SelectTFI2||TopeFI!=TopeFI2||SelectTIPS!=SelectTIPS2||TopeIPS!=TopeIPS2  )
  {
	  if(iM!=iM2)
	  {
		  rhcal=new Object();
		  rhcal.idCalculo=1;
		  rhcal.concepto="Ingreso Minimo";
		  rhcal.idMoneda=4;
		  rhcal.valor=moneyToText(iM2);
		  updateSingleRow(rhcal);
	  }
	  if(PSCI!=PSCI2)
	  {
		  rhcal=new Object();
		  rhcal.idCalculo=2;
		  rhcal.concepto="Porcentaje seguro cesantia indefinido";
		  rhcal.idMoneda=1;
		  rhcal.valor=PSCI2;
		  updateSingleRow(rhcal);
	  }
	  if(PSCEF!=PSCEF2)
	  {
		  rhcal=new Object();
		  rhcal.idCalculo=3;
		  rhcal.concepto="Porcentaje seguro cesantia empleado fijo";
		  rhcal.idMoneda=1;
		  rhcal.valor=PSCEF2;
		  updateSingleRow(rhcal);
	  }
	  if(PorcentajeSCEI!=PorcentajeSCEI2)
	  {
		  rhcal=new Object();
		  rhcal.idCalculo=4;
		  rhcal.concepto="Porcentaje seguro cesantia emp indefinido";
		  rhcal.idMoneda=1;
		  rhcal.valor=PorcentajeSCEI2;
		  updateSingleRow(rhcal);
	  }
	  if(HoraExtra!=HoraExtra2)
	  {
		  rhcal=new Object();
		  rhcal.idCalculo=5;
		  rhcal.concepto="Hora Extra";
		  rhcal.idMoneda=1;
		  rhcal.valor=HoraExtra2;
		  updateSingleRow(rhcal);
	  }
	  if(PorcentajeFSC!=PorcentajeFSC2)
	  {
		  rhcal=new Object();
		  rhcal.idCalculo=6;
		  rhcal.concepto="Porcentaje fondo sol cesantia";
		  rhcal.idMoneda=1;
		  rhcal.valor=PorcentajeFSC2;
		  updateSingleRow(rhcal);
	  }
	  if(DiasLaborales!=DiasLaborales2)
	  {
		  rhcal=new Object();
		  rhcal.idCalculo=7;
		  rhcal.concepto="Dias laborales";
		  rhcal.idMoneda=5;
		  rhcal.valor=DiasLaborales2;
		  updateSingleRow(rhcal);
	  }
	  if(HoraExtraDiario!=HoraExtraDiario2)
	  {
		  rhcal=new Object();
		  rhcal.idCalculo=8;
		  rhcal.concepto="Tope hora extra diario";
		  rhcal.idMoneda=5;
		  rhcal.valor=HoraExtraDiario2;
		  updateSingleRow(rhcal);
	  }
	  if(HoraExtraSemanal!=HoraExtraSemanal2)
	  {
		  rhcal=new Object();
		  rhcal.idCalculo=9;
		  rhcal.concepto="tope hora extra semanal";
		  rhcal.idMoneda=5;
		  rhcal.valor=HoraExtraSemanal2;
		  updateSingleRow(rhcal);
	  }	 
	  if(SelectTI!=SelectTI2 || TopeImponible!=TopeImponible2)
	  {
		  rhcal=new Object();
		  rhcal.idCalculo=10;
		  rhcal.concepto="Tope imponible";
		  rhcal.idMoneda=SelectTI;
		  if(SelectTI!=SelectTI2)
		  {
			  rhcal.idMoneda=SelectTI2;
		  }
		  rhcal.valor=TopeImponible;
		  if(TopeImponible!=TopeImponible2)
		  {
			  rhcal.valor=TopeImponible2;
		  }
		  updateSingleRow(rhcal);
	  }
	 
	  if(TopeSC!=TopeSC2||SelectTS!=SelectTS2)
	  {
		  rhcal=new Object();
		  rhcal.idCalculo=11;
		  rhcal.concepto="Tope seguro cesantia";
		  rhcal.idMoneda=SelectTS;
		  if(SelectTS!=SelectTS2)
		  {
			  rhcal.idMoneda=SelectTS2;
		  }
		  rhcal.valor=TopeSC;
		  if(TopeSC!=TopeSC2)
		  {
			  rhcal.valor=TopeSC2;
		  }
		  updateSingleRow(rhcal);
	  }
	 
	  if(SelectTAPV!=SelectTAPV2||TopeAPV!=TopeAPV2)
	  {
		  rhcal=new Object();
		  rhcal.idCalculo=12;
		  rhcal.concepto="Tope APV";
		  rhcal.idMoneda=SelectTAPV;
		  if(SelectTAPV!=SelectTAPV2)
		  {
			  rhcal.idMoneda=SelectTAPV2;
		  }
		  rhcal.valor=TopeAPV;
		  if(TopeAPV!=TopeAPV2)
		  {
			  rhcal.valor=TopeAPV2;
		  }
		  updateSingleRow(rhcal);
	  }
	  
	  if(SelectTDC!=SelectTDC2||TDConv!=TDConv2)
	  {
		  rhcal=new Object();
		  rhcal.idCalculo=13;
		  rhcal.concepto="Tope deposito convenido";
		  rhcal.idMoneda=SelectTDC;
		  if(SelectTDC!=SelectTDC2)
		  {
			  rhcal.idMoneda=SelectTDC2;
		  }
		  rhcal.valor=TDConv;
		  if(TDConv!=TDConv2)
		  {
			  rhcal.valor=TDConv2;
		  }
		  updateSingleRow(rhcal);
	  }
	  if(SelectTFI!=SelectTFI2||TopeFI!=TopeFI2)
	  {
		  rhcal=new Object();
		  rhcal.idCalculo=16;
		  rhcal.concepto="Tope sueldo finiquito";
		  rhcal.idMoneda=SelectTFI;
		  if(SelectTFI!=SelectTFI2)
		  {
			  rhcal.idMoneda=SelectTFI2;
		  }
		  rhcal.valor=TopeFI;
		  if(TDConv!=TDConv2)
		  {
			  rhcal.valor=TopeFI2;
		  }
		  updateSingleRow(rhcal);
	  }
	  if(SelectTIPS!=SelectTIPS2||TopeIPS!=TopeIPS2)
	  {
		  rhcal=new Object();
		  rhcal.idCalculo=21;
		  rhcal.concepto="Tope Imponible IPS(Ex INP)";
		  rhcal.idMoneda=SelectTIPS;
		  if(SelectTIPS!=SelectTIPS2)
		  {
			  rhcal.idMoneda=SelectTIPS2;
		  }
		  rhcal.valor=TopeIPS;
		  if(TopeIPS!=TopeIPS2)
		  {
			  rhcal.valor=TopeIPS2;
		  }
		  updateSingleRow(rhcal);
	  }
	  
	  	alerta("Cálculos actualizados");
	  	location.reload();
}
  else{
	  alerta("No se modificaron los campos");
  }
}
