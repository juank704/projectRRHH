//Colocar Permisos
var sociedadPrivilege = new Set();
var huertoPrivilege = new Array();
//Obtener Sociedades y Huertos que tiene acceso
$.each(SESION.campo, function(key, value){
	sociedadPrivilege.add(value.idSociedad);
	huertoPrivilege.push(value.campo);
});

$(document).ready(function() {
	$.fn.dataTable.ext.errMode = 'none';
	
	ListaSociedad();
	ListaTipoContrato();
	LoadHDReady();
	
	window.onbeforeunload = function(e) 
	{
		  return 'Texto de aviso';
	};
	
	$("#periodoHD").datepicker({ 
		dateFormat: 'mm-yy',
		firstDay: 1,
        changeMonth: true,
        changeYear: true,
       
       

		});
	
	$("#fechaCuotas").datepicker({ 
		dateFormat: 'mm-yy',
		firstDay: 1,
        changeMonth: true,
        changeYear: true,
       
       

		});
	
	$('#monto').keyup(function(e) {
		var code = e.keyCode || e.which;
		if (code == 109 || code == 189) { 
			var valor = $(this).val();
			$(this).val(valor.replace(/[-]/g, ''))
		}
	});

	$('#monto').change(function(e) {
		var valor = $(this).val();
		$(this).val(valor.replace(/[-]/g, ''))
	});
	

var table = $('#tbl_Info').DataTable({
	"order": [[ 1, "asc" ]],
	columnDefs: [
		             {
		                 targets: [8],
		                 className: 'tdright'
		             }
		           ],
		           "aoColumnDefs": [
		                            { "bSortable": false, "aTargets": [ 0 ] },
		                            { "sWidth": "50px", "aTargets": [1] },
		                            { "sWidth": "312px", "aTargets": [2] },
		                            { "sWidth": "110px", "aTargets": [3] },
		                           
		                         ]
		          
		         } 		
);

table.columns([ 0 ]).visible(false);
table.columns([ 4 ]).visible(false);
table.columns([ 5 ]).visible(false);
table.columns([ 10 ]).visible(false);


});


function ListaSociedad(){
	$("#loading").show();
	//Obtener Sociedades en base a los privilegios del usuario
	let queryString = sociedadPrivilege == null ? "" : JSON.stringify(sociedadPrivilege).slice(1,-1);
	
	$.getJSON("/simpleWeb/json/work/getSociedad/?idSociedad="+queryString, function(data){
		
		
		$.each(data, function(k, v){
			var SelectSociedad = "";
			if(v.idSociedad == -1){
				
			}else{
			SelectSociedad += 	"<option value="+v.idSociedad+">"+v.sociedad+"</option>";
			
			$("#Sociedad").append(SelectSociedad);
			}
		})
}).fail(function(jqXHR, textStatus, errorThrown) {

    alerta(errorThrown);
	$("#loading").hide();
}).done(function() {
	$("#loading").hide();
});

}

function ListaTipoContrato()
{
$.getJSON("/simpleWeb/json/work/getAllTipoContrato/", function(data){
		
		$.each(data, function(k, v){
			var SelectTipoContrato = "";
				
			SelectTipoContrato += 	"<option value="+v.idSociedad+">"+v.denominacionSociedad+"</option>";
			
			$("#tipoContrato").append(SelectTipoContrato);
	
		})
}).fail(function(jqXHR, textStatus, errorThrown) {

    alerta(errorThrown);
	$("#loading").hide();
}).done(function() {
	$("#loading").hide();
});
}

$('#Sociedad').change(function(e) {

	var table = $('#tbl_Info2').DataTable();
	table.clear().draw();
	
	var soc = $('#Sociedad').val();
	if(soc == ""){
		alerta("Debe Seleccionar una Empresa");
		return;
	}
	
	
	$("#tipodivisionB").empty();
	$("#CodigoTra").empty();
	
	$("#panelform").removeAttr( 'style' );
	
	var soci_sap = "";
	$("#loading").show();
	$.getJSON("/simpleWeb/json/work/getSociedadById/"+$('#Sociedad').val()+"" , function(data){
        
		soci_sap = JSON.stringify(data.sociedad);
	
		
	}).done(function() {
		
		$("#tipodivisionB").append("<option value='-1'>Seleccione Huerto</option>");
		var soci_sapFinal  = soci_sap.replace(/\"/g, '');
		
		$.getJSON("/simpleWeb/json/work/getCampoBySociedad/"+$('#Sociedad').val()+"" , function(data){
	        
	      //Obtener huertos en base a los privilegios del usuario
	    	let queryString = huertoPrivilege == null ? "" : JSON.stringify(huertoPrivilege).slice(1,-1);
	    	
			$.each(data, function(k, v){
				  var SelectHuerto = "";
				

                if(huertoPrivilege.includes(v.campo) == true){
                	SelectHuerto += 	"<option value="+v.campo+">"+v.descripcion+"</option>";
                }
				$("#tipodivisionB").append(SelectHuerto);
			})
			
		}).done(function() {
			$("#loading").hide();

		})
	})
	trabajadores();
	});

$('#tipodivisionB').change(function(e) {
	
	var huertoValor = $("#tipodivisionB").val();
		
		if(huertoValor == "" || huertoValor == -1){
			alerta("Debe Seleccionar un Huerto"); $("#tipodivisionB").focus();
			return;
		}
		
		
		
		var zona_sap = "";	 
		$("#loading").show();
		$("#tiposubdivisionB").empty();
		$("#listagrupoB").empty();
		$("#listagrupoB").append("<option value='-1'>Seleccione CECO</option>");
		
		
		$.getJSON("/simpleWeb/json/work/getCampoByCampo/"+$('#tipodivisionB').val()+"" , function(data){
			var SelecZona = "";
			SelecZona +=  "<option value=''>Seleccione Zona</option>";
			$.each(data, function(k, v){
				
				SelecZona += 	"<option value="+v.grupo+">"+v.zona+"</option>";
				
				$("#tiposubdivisionB").append(SelecZona);
				
				
			})

		}).done(function() {
			
			$("#loading").hide();
			
		});
	});

$('#tiposubdivisionB').change(function(e) {
	
	$("#listagrupoB").empty();
	var valor_zona = $("#tiposubdivisionB").val();
	
	if(valor_zona == "" || valor_zona == ""){
		alerta("Debe Seleccionar una Zona");$("#tiposubdivisionB").focus();
		return;
	}
	
	var soci_sap = "";
	$("#loading").show();
	$.getJSON("/simpleWeb/json/work/getSociedadById/"+$('#Sociedad').val()+"" , function(data){
        
		soci_sap = JSON.stringify(data.sociedad);
	
		
	}).done(function() {
		var CECOAgrupacion;

	            $.each(SESION.campo, function(key, value){

	                  if(value.campo == $('#tipodivisionB').val()){

	                        CECOAgrupacion = value.cecos;
	                  }
	            });
		 
		
		var soci_sapFinal  = soci_sap.replace(/\"/g, '');
		$.getJSON("http://200.55.206.140/SCLEM/JSON_BAPI_COSTCENTER_GETLIST1.aspx?SOCIEDAD="+$('#Sociedad').val()+"&GRUPO="+valor_zona+"&CECO="+CECOAgrupacion , function(data){
			var SelectCECO = "";
			SelectCECO +=  "<option value=''>Seleccione CECO</option>";
		
				
				$.each(data.COSTCENTERLIST, function(k, v){
					
					
					if(v.DESCRIPT.indexOf("Cuartel") > -1 == true ){
						
					}else{SelectCECO += 	"<option value="+v.COSTCENTER+">"+v.DESCRIPT+"</option>";}
		
				})
				$("#listagrupoB").append(SelectCECO);
			
				$("#loading").hide();
		}).done(function() {
			$("#loading").hide();
		
		})
	})
});



$('#tipodivisionB,#tiposubdivisionB,#listagrupoB,#fechaTermino,#tipoContrato,#periodoHD').change(function(e) {
	
	var soc = $('#Sociedad').val();
	if(soc == ""){
		alerta("Debe Seleccionar una Empresa");
		return;
	}
	$("#CodigoTra").empty();
	trabajadores();
	
	});

function trabajadores() {
	
	$("#CodigoTra").empty();
	
	$("#loading").show();
	var SelectConcepto = "";
	SelectConcepto += " <option value='0'>Buscar</option>";
	$("#CodigoTra").append(SelectConcepto);
	
	var sociedad = $("#Sociedad").val();
	
	
    var tipo_division = $("#tipodivisionB").val();
	
    if(tipo_division === "-1"){tipo_division = null;}
    else if(tipo_division == ''){
		tipo_division = null;
	}
	else{
		 tipo_division = $("#tipodivisionB").val();
	}
    
	
	var tipo_subdivision = $("#tiposubdivisionB").val();
	if(tipo_subdivision === "-1"){tipo_subdivision = null;}
	else if(tipo_subdivision == ''){
		tipo_subdivision = null;
	}else{
		tipo_subdivision = null;
	}
	
	var grupo = $("#listagrupoB").val();
	if(grupo === "-1"){grupo = null;}
	else if(grupo == ''){
		grupo = null;
	}else{
		 grupo = $("#listagrupoB").val();
	}
	
	var tipocontrato_t = $("#tipoContrato").val();
	
	if(tipocontrato_t === "-1")
	{tipocontrato_t = null;}
	else if(tipocontrato_t == ''){
		tipocontrato_t = null;
	}else{
		tipocontrato_t = $("#tipoContrato").val();
		
	}
	
	 cod_t = $("#CodigoTra").val();
	
	if(cod_t === "-1")
	{cod_t = null;}
	else if(cod_t == ''){
		cod_t = null;
	}
	else if(cod_t == 0){
		cod_t = null;
	}
	else{
		cod_t = $("#CodigoTra").val();
		
	} 
	
	 periodoHD = $("#periodoHD").val();
		
		if(periodoHD === "-1")
		{cod_t = null;}
		else if(periodoHD == ''){
			periodoHD = null;
		}
		else if(periodoHD == 0){
			periodoHD = null;
		}
		else{
			periodoHD = $("#periodoHD").val();
			var periodoHDSplit = periodoHD.split("-");
			periodoHD = periodoHDSplit[1]+periodoHDSplit[0];
		} 
	

	$.getJSON(
			"/simpleWeb/json/work/allTrabajadores_HD_Finiquitos/"+sociedad+","+tipo_division+","+tipo_subdivision+","
			+grupo+","+tipocontrato_t+","+cod_t+","+periodoHD+"",
			function(data) {
               console.log(data);
				$.each(data, function(k, v) {
					$("#loading").show();
					var SelectConcepto = "";

					SelectConcepto += "<option value=" + v.codigo_trabajador + ">"
							+ v.codigo_trabajador + " | " + v.apellidoPaterno.toUpperCase() + " "+v.apellidoMaterno.toUpperCase() +" "+v.nombre.toUpperCase()+  " | " + v.rut + "</option>";
					$("#CodigoTra").append(SelectConcepto);
					
					
				});

			}).done(function() {
		$("#loading").hide();

	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})

}

function Buscar(){
	
	var table = $('#tbl_Info').DataTable();

	table.clear().draw();
	
	$("#loading").show();
	
	
	var sociedad = $("#Sociedad").val();
	
	
    var tipo_division = $("#tipodivisionB").val();
	
    if(tipo_division === "-1"){tipo_division = null;}
    else if(tipo_division == ''){
		tipo_division = null;
	}
	else{
		 tipo_division = $("#tipodivisionB").val();
	}
    
	
	var tipo_subdivision = $("#tiposubdivisionB").val();
	if(tipo_subdivision === "-1"){tipo_subdivision = null;}
	else if(tipo_subdivision == ''){
		tipo_subdivision = null;
	}else{
		tipo_subdivision = null;
	}
	
	var grupo = $("#listagrupoB").val();
	if(grupo === "-1"){grupo = null;}
	else if(grupo == ''){
		grupo = null;
	}else{
		 grupo = $("#listagrupoB").val();
	}
	
	var tipocontrato_t = $("#tipoContrato").val();
	
	if(tipocontrato_t === "-1")
	{tipocontrato_t = null;}
	else if(tipocontrato_t == ''){
		tipocontrato_t = null;
	}else{
		tipocontrato_t = $("#tipoContrato").val();
		
	}
	
	 cod_t = $("#CodigoTra").val();
	
	if(cod_t === "-1")
	{cod_t = null;}
	else if(cod_t == ''){
		cod_t = null;
	}
	else if(cod_t == 0){
		cod_t = null;
	}
	else{
		cod_t = $("#CodigoTra").val();
		
	} 
	
	 periodoHD = $("#periodoHD").val();
		
		if(periodoHD === "-1")
		{cod_t = null;}
		else if(periodoHD == ''){
			periodoHD = null;
		}
		else if(periodoHD == 0){
			periodoHD = null;
		}
		else{
			periodoHD = $("#periodoHD").val();
			var periodoHDSplit = periodoHD.split("-");
			periodoHD = periodoHDSplit[1]+periodoHDSplit[0];
		} 
	
	

	$.getJSON(
			"/simpleWeb/json/work/allTrabajadores_HD_FiniquitosTabla/"+sociedad+","+tipo_division+","+tipo_subdivision+","
			+grupo+","+tipocontrato_t+","+cod_t+","+periodoHD+"",
			function(data) {
               console.log(data);
               var tableadd = $('#tbl_Info').DataTable();
               $.each(data, function(k, v){
 
            	   var diasAnio = v.diasint;
            	   if(diasAnio == 0){
            		   diasAnio = "";
            	   }
            	   
            	    var periodo_trab = ""+v.periodo+"";
            	    var resPeridoAnio = periodo_trab.slice(0,4);
            	    var resPeriodoMes = periodo_trab.slice(4);
            	    var periodo_trabF = resPeriodoMes+"-"+resPeridoAnio;
            	    
            		tableadd.row.add( [
            	            "<td>"+v.id+"</td>",
            	            "<td>"+v.codigo_trabajador+"</td>",
            	            "<td>"+v.apellidoPaterno.toUpperCase()+" "+v.apellidoMaterno.toUpperCase()+" "+v.nombre.toUpperCase()+"</td>",
            	            "<td>"+v.rut+"</td>",
            	            "<td>"+v.tipoHD+"</td>",
            	            "<td>"+v.codHD+"</td>",
            	            "<td>"+periodo_trabF+"</td>",
            	            "<td>"+v.nombre_concepto+"</td>",
            	            "<td>"+String(v.montoHaberes).replace(/(.)(?=(\d{3})+$)/g,'$1.')+"</td>",
            	            "<td>"+diasAnio+"</td>",
            	            "<td>"+v.id_contrato+"</td>",
            				"<td><button title='Actualizar' id=''onclick='Actualizar("+v.id+","+v.id_contrato+","+v.codigo_trabajador+");' class='btn btn-circle yellow  btn-outline btn-sm'><i class='fa fa-pencil-square-o fa-lg'></i></button>" +
            				"<button title='Eliminar' id='"+v.id+"' onclick='eliminar(this.id);' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button>" +
            				"</td>",
            				] ).node().id = "td"+k;
            		tableadd.draw();
       				
       		     
       		})

			}).done(function() {
		$("#loading").hide();

	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})
}

function setTwoNumberDecimal(event) {
    this.value = parseFloat(this.value).toFixed(2);
}

function Actualizar(id,contrato,codtra){
	
	$("#actualizarUp").attr("onclick","actualizarTrabajadorDHF("+id+","+contrato+","+codtra+");");
	
	$("#conceptos").empty();
	//$('#modalUpdate').css('z-index', '0');
	$("#loading").show();
	 var frec;
	 $.ajax({
  		type : "GET",
  		url : "/simpleWeb/json/work/getModificarHDFiniquitos/"+id+","+contrato+","+codtra+"",
  		async: false,
  		dataType : "JSON",
  		success : function(data) {
  			console.log(data);
  			$.each(data, function(k, v){
  				frec = v.codHD;
  				
  				
  				var diasAnio = v.diasint;
  	     	   	if(diasAnio == 0)
  	     	   	{
  	     		   diasAnio = "";
  	     	   	}
  	     	   	
  	     	   	$("#monto2").val(diasAnio);
  	     	   	$("#monto").val(String(v.montoHDint).replace(/(.)(?=(\d{3})+$)/g,'$1.'));
  	     	   	//$("#haberes_descuentos").val(v.tipoHD);
  	     	    $('#haberes_descuentos option[value='+v.tipoHD+']').attr('selected','selected');
  	     	   	
  	     	   	var str = v.periodo;
  				var res1 = str.toString().substr(0,4);
  			    var res2 = str.toString().substr(-2);
  			    var res3 = res2+"-"+res1;
  			     
  	     	    $("#fechaCuotas").val(res3);
  	     	    
  	     	    
  	     	   var HD = $("#haberes_descuentos").val();
  	     		var IFHD = $("#haberes_descuentos").val();
  	     		
  	     		if(HD == "hn"){
  	     			
  	     			HD = "h";
  	     		}
  	     	    
  	     		$.ajax({
  	     		    type: "GET",
  	     		    url: "/simpleWeb/json/work/LoadConceptos/" + HD,
  	     		    async: false,
  	     		    dataType: "JSON",
  	     		    success: function(data) {
  	     		        console.log(data);
  	     		       
  	     		        $.each(data, function(k, v) {
                            
  	     		            if (IFHD == "hn" && v.codigo >= 2000 && v.codigo <= 2999) {
  	     		                var SelectConcepto = "";
  	     		                SelectConcepto += "<option value=" + v.codigo + ">" + v.codigo + " | " + v.conceptos + "</option>";

  	     		                $("#conceptos").append(SelectConcepto);

  	     		            } else if (IFHD == "h" && v.codigo >= 1000 && v.codigo <= 1999) {
  	     		                var SelectConcepto = "";
  	     		                SelectConcepto += "<option value=" + v.codigo + ">" + v.codigo + " | " + v.conceptos + "</option>";

  	     		                $("#conceptos").append(SelectConcepto);

  	     		            } else if (IFHD == "c" && v.codigo >= 4000 && v.codigo <= 4999) {
  	     		                var SelectConcepto = "";
  	     		                SelectConcepto += "<option value=" + v.codigo + ">" + v.codigo + " | " + v.conceptos + "</option>";

  	     		                $("#conceptos").append(SelectConcepto);

  	     		            } else {

  	     		                if (HD == "d") {
  	     		                    var SelectConcepto = "";
  	     		                    SelectConcepto += "<option value=" + v.codigo + ">" + v.codigo + " | " + v.conceptos + "</option>";

  	     		                    $("#conceptos").append(SelectConcepto);
  	     		                }
  	     		            }


  	     		        

  	     		        })

  	     		    }
  	     		}).fail(function(jqXHR, textStatus, errorThrown) {

  	     		    alerta(errorThrown);
  	     		    $("#loading").hide();

  	     		}).done(function() {
  	     		    $("#loading").hide();
  	     		 $('#conceptos option[value=' + frec + ']').attr('selected', 'selected');
  	     		    
  	     		})
  	     	    
  	     	    
  	     	    
  	     	    
//  	     		$('#conceptos option[value='+frec2+']').attr('selected','selected');
  	     	   
  	     	  
  	     	   	
  			
  			})
  			
  		}
  	}).fail(function(jqXHR, textStatus, errorThrown) {

		    alerta(errorThrown);
		    $("#loading").hide();
			
		})
	
	
	
	
	//$('#modalUpdate').css('z-index', '15000');
	 
	 
	var frec2 = frec;
	 $('#conceptos option[value='+frec2+']').attr('selected','selected');
	
	$('#modalUpdate').modal('show');
	
	
}


function LoadHDReady() {
	$("#loading").show();
	var HD = "h";

	$.getJSON(
			"/simpleWeb/json/work/LoadConceptos/" + HD,
			function(data) {

				$.each(data, function(k, v) {
					
					if(HD == "h" && v.codigo >= 1000 && v.codigo <= 1999){
						var SelectConcepto = "";
						SelectConcepto += "<option value=" + v.codigo + ">"+ v.codigo + " | "+ v.conceptos + "</option>";

						$("#conceptos").append(SelectConcepto);
					
					}

				

				});

				//bloqueSelect();
			}).done(function() {
		$("#loading").hide();
	})

}

$("#haberes_descuentos").change(function() {

	$("#CodigoTra").prop("disabled", false);
	if ($('#haberes_descuentos').val() === '') {

		alerta('Seleccione Otra Opción');
		return;
	} else {
		$("#conceptos").prop("disabled", false);

		$('#conceptos').empty();
		
		LoadHD();
	}

});

function LoadHD() {
	$("#loading").show();
	var HD = $("#haberes_descuentos").val();
	var IFHD = $("#haberes_descuentos").val();
	
	if(HD == "hn"){
		
		HD = "h";
	}

	$.getJSON("/simpleWeb/json/work/LoadConceptos/" + HD,function(data) 
			{

				$.each(data, function(k, v) {

					 
					if(IFHD == "hn" && v.codigo >= 2000 && v.codigo <= 2999){
						var SelectConcepto = "";
						SelectConcepto += "<option value=" + v.codigo + ">"+ v.codigo + " | "+ v.conceptos + "</option>";

						$("#conceptos").append(SelectConcepto);
						
					}else if(IFHD == "h" && v.codigo >= 1000 && v.codigo <= 1999){
						var SelectConcepto = "";
						SelectConcepto += "<option value=" + v.codigo + ">"+ v.codigo + " | "+ v.conceptos + "</option>";

						$("#conceptos").append(SelectConcepto);
					
					}
					
					else if(IFHD == "c" && v.codigo >= 4000 && v.codigo <= 4999){
						var SelectConcepto = "";
						SelectConcepto += "<option value=" + v.codigo + ">"+ v.codigo + " | "+ v.conceptos + "</option>";

						$("#conceptos").append(SelectConcepto);
					
					}
					
					else{
						
						if(HD == "d"){
						var SelectConcepto = "";
						SelectConcepto += "<option value=" + v.codigo + ">"+ v.codigo + " | "+ v.conceptos + "</option>";

						$("#conceptos").append(SelectConcepto);}
					}

				});
			}).done(function() {
		$("#loading").hide();
	})

}
function segundoPopup(){

	$('.swal2-container').css('z-index', '15000');


	}


function actualizarTrabajadorDHF(idT,contrato,codtra){
	
	
	var tipo = $("#haberes_descuentos").val();
	var concepto = $("#conceptos").val();
	var montoHD = $("#monto").val().replace(/\./g, '');;
	var diasAnio = $("#monto2").val();
	var periodo = $("#fechaCuotas").val();
	periodo = periodo.split("-");
	periodo = periodo[1]+periodo[0];
	
	
	var row = {
				 id : idT,
				 id_contrato : contrato,
				 codigo_trabajador  : codtra,
				 tipoHD : tipo, 
				 codHD : concepto,
				 montoHD : montoHD,
				 diasint : diasAnio,
				 periodo : periodo, 
			
		  		}
	
	$.ajax({
		url : "/simpleWeb/json/work/updateTrabHDF",
		type : "PUT",
		data : JSON.stringify(row),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept","application/json");
			xhr.setRequestHeader("Content-Type","application/json");
		},
		success : function(data, textStatus, jqXHR) {
			
			
			$('#modalUpdate').modal('hide'); 
			Buscar();
			 
			alerta("Trabajador Actualizado con exito ");
			 
				
            
		},
		error : function(ex) {
			console.log(ex);
		}
	
	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})
	
	
}

function eliminar(id){
	PopupEliminar = "";
	PopupEliminar +='<div class="col-sm-12 col-md-12">';
	PopupEliminar +=          "<div class='btn btn-circle blue btn-outline' id='"+id+"' onclick='validarEliminar(this.id);'><i class='fa fa-clock-o'></i> Confirmar</div>";
	PopupEliminar +=          "<div class='btn btn-circle red btn-outline' onclick='closeModal();'> Cancelar</div>";
	PopupEliminar +='</div>';

    popUp("Confirmar Para eliminar", PopupEliminar, true, "400px", true);
}

function validarEliminar(id){
	$("#loading").show();
	$.ajax({
	    url: "/simpleWeb/json/work/EliminarHaberDescuentoF/" + id + "",
	    type: "PUT",
	    beforeSend: function(xhr) {
	        xhr.setRequestHeader("Accept", "application/json");
	        xhr.setRequestHeader("Content-Type", "application/json");
	    },
	    success: function(data, textStatus, jqXHR) {
            
	    
	    	closeModal();
	    	
	  
	    	Buscar();
	        alerta("Elimado con Exito ");

	    },
	    error: function(ex) {
	        console.log(ex);
	    }

	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})
	
	
}