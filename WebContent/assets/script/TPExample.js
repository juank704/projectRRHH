var tp= new Object;




function setExampleDatos(){
	tp.datos[0]=["$$lugar$$","SAN CLEMENTE"];
	tp.datos[1]=["$$FECHA$$","2018-11-07"];
	tp.datos[2]=["$$HORA$$","12:03"];
	tp.datos[3]=["$$numeroFolio$$","101032140J"];
	tp.datos[4]=["$$totalCajasPallet$$","145"];
	
	
}
function setExampleDatosPrincipales(){
	tp.datosPrincipales[0]=["$$etiqueta$$","Et-prueba2"];
	tp.datosPrincipales[1]=["$$especie$$","Es-prueba3"];
	tp.datosPrincipales[2]=["$$packing$$","Pa-prueba4"];
	tp.datosPrincipales[3]=["$$mercado$$","Me-prueba1"];
	tp.datosPrincipales[4]=["$$categoria$$","Ca-prueba1"];
	tp.datosPrincipales[5]=["$$altura$$","Al-prueba1"];
	tp.datosPrincipales[6]=["$$tipoDeEnvase$$","Ti-prueba1"];
	tp.datosPrincipales[7]=["$$carEnvase$$","Ca-prueba1"];
	tp.datosPrincipales[8]=["$$embalaje$$","Em-prueba1"];
	tp.datosPrincipales[9]=["$$frigorifico$$","Fri-prueba1"];
	tp.datosPrincipales[10]=["$$exportadora$$","Ex-prueba1"];
	tp.datosPrincipales[11]=["$$varComercial$$","Va-prueba1"];
	tp.datosPrincipales[12]=["$$pPromedioCaja$$","PPC-prueba1"];
	
	
	
	
}
function setExampleTablaDatos(){
tp.tablaDatos[0]=["25723450", "13", "PRO 3301-0", "1-0", "FRSADA-1 AGRICOLA A-0", "ASdAS-0", "FUA-0", "A-1-0", "20181006-0"];
tp.tablaDatos[1]=["25723451", "11", "PRO 3301-1", "1-1", "FRSADA-1 AGRICOLA A-1", "ASdAS-1", "FUA-1", "A-1-1", "20181006-1"];	
tp.tablaDatos[2]=["25723452", "12", "PRO 3301-2", "1-2", "FRSADA-1 AGRICOLA A-2", "ASdAS-2", "FUA-2", "A-1-2", "20181006-2"];	
tp.tablaDatos[3]=["25723453", "13", "PRO 3301-3", "1-3", "FRSADA-1 AGRICOLA A-3", "ASdAS-3", "FUA-3", "A-1-3", "20181006-3"];	
tp.tablaDatos[4]=["25723454", "14", "PRO 3301-4", "1-4", "FRSADA-1 AGRICOLA A-4", "ASdAS-4", "FUA-4", "A-1-4", "20181006-4"];	
tp.tablaDatos[5]=["25723455", "15", "PRO 3301-5", "1-5", "FRSADA-1 AGRICOLA A-5", "ASdAS-5", "FUA-5", "A-1-5", "20181006-5"];	
tp.tablaDatos[6]=["25723456", "16", "PRO 3301-6", "1-6", "FRSADA-1 AGRICOLA A-6", "ASdAS-6", "FUA-6", "A-1-6", "20181006-6"];	
tp.tablaDatos[7]=["25723457", "17", "PRO 3301-7", "1-7", "FRSADA-1 AGRICOLA A-7", "ASdAS-7", "FUA-7", "A-1-7", "20181006-7"];	
tp.tablaDatos[8]=["25723458", "18", "PRO 3301-8", "1-8", "FRSADA-1 AGRICOLA A-8", "ASdAS-8", "FUA-8", "A-1-8", "20181006-8"];	
tp.tablaDatos[9]=["25723459", "19", "PRO 3301-9", "1-9", "FRSADA-1 AGRICOLA A-9", "ASdAS-9", "FUA-9", "A-1-9", "20181006-9"];	

}
function setExampleTitulos(){
	tp.titulos[0]="Pallet Tarja";
	tp.titulos[1]="Cajas";
	tp.titulos[2]="T. Ing.  Nro";
	tp.titulos[3]="Lote";
	tp.titulos[4]="Productor";
	tp.titulos[5]="Proced";
	tp.titulos[6]="Var";
	tp.titulos[7]="Cal";
	tp.titulos[8]="fecha";	
}
function CrearTarjaPallet(){
	tp.nombreArchivo="tj";
	tp.pathDestino="";
	tp.extension=".docx";
	tp.datos=[];
	tp.datosPrincipales=[];
	tp.tablaDatos=[];
	tp.titulos=[];
	setExampleDatos();
	setExampleTitulos();
	setExampleDatosPrincipales();
	setExampleTablaDatos();
	console.log(JSON.stringify(tp));
	var r='{"nombreArchivo":"20181129_2321312312","pathDestino":"","extension":".docx","datos":[["$$lugar$$","SCLEM"],["$$usuario$$","jcolihuinca"],["$$FECHA$$","29.11.2018"],["$$HORA$$","12:25"],["$$numeroFolio$$","2321312312"],["$$totalCajasPallet$$",22]],"datosPrincipales":[["$$etiqueta$$","ENZA"],["$$especie$$","CEREZAS"],["$$pLU$$","NO"],["$$packing$$","ES02"],["$$mercado$$","CHI"],["$$categoria$$","CAT1"],["$$altura$$","2.3"],["$$tipoDeEnvase$$","CZCB5PSF"],["$$embalaje$$","CZCB5PSF"],["$$frigorifico$$","FCM"],["$$exportadora$$","ES02"],["$$varComercial$$","SUMMIT"],["$$pPromedioCaja$$",2]],"tablaDatos":[["2321312312",22,"10CTP10107","PT2000059","AGRICOLA SANTA CECILIA LTDA.","","SUMMIT","LD","22.11.2018"]],"titulos":["Pallet Tarja","Cajas","Número PR.","Número PT.","Productor","Cod. SAG","Var","Cal","fecha Proc."]}';
	
	 $.ajax({
		    type: "POST",
		    async: false,
		    url: "/simpleWeb/json/work/TarjaPallets/CreateTarjaDocumento/",
		    data: r,
		    beforeSend: function(xhr) {
		      xhr.setRequestHeader("Accept", "application/json");
		      xhr.setRequestHeader("Content-Type", "application/json");
		    },
		    success: function(data) {
		    	alert(JSON.stringify(data));
		    	window.open("/simpleWeb/json/work/TarjaPallets/descargarDocumentoTarjaPallet/"+data.file);
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




