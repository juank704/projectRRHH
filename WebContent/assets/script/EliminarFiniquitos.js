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
	
	
	$("#fechaTermino").datepicker({ 
		dateFormat: 'dd-mm-yy',
		firstDay: 1,
        changeMonth: true,
        changeYear: true

		});

var table_per_sin_goce = $('#tbl_Info').DataTable({
	"order": [[ 1, "asc" ]],	
	columnDefs: [
		             {
		                 targets: [6],
		                 className: 'tdright'
		             }
		           ]
		         } 		
);


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

$('#tipodivisionB,#tiposubdivisionB,#listagrupoB,#fechaTermino,#tipoContrato').change(function(e) {
	
	var soc = $('#Sociedad').val();
	if(soc == ""){
		alerta("Debe Seleccionar una Empresa");
		return;
	}
	$("#CodigoTra").empty();
	trabajadores();
	
	});

function trabajadores() {
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
	
	
	var fecha_t = $("#fechaTermino").val();
	if(fecha_t === "-1"){fecha_t = null;}
	else if(fecha_t == ''){
		fecha_t = null;
	}else{
		fecha_t = $("#fechaTermino").val();
		var fecha_t_split = fecha_t.split("-");
		fecha_t = fecha_t_split[2]+"-"+fecha_t_split[1]+"-"+fecha_t_split[0];
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
	
	

	$.getJSON(
			"/simpleWeb/json/work/allTrabajadorFiniquitoEliminar/"+sociedad+","+tipo_division+","+tipo_subdivision+","
			+grupo+","+fecha_t+","+tipocontrato_t+","+cod_t+"",
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
	
	
	var fecha_t = $("#fechaTermino").val();
	if(fecha_t === "-1"){fecha_t = null;}
	else if(fecha_t == ''){
		fecha_t = null;
	}else{
		fecha_t = $("#fechaTermino").val();
		var fecha_t_split = fecha_t.split("-");
		fecha_t = fecha_t_split[2]+"-"+fecha_t_split[1]+"-"+fecha_t_split[0];
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
	
	

	$.getJSON(
			"/simpleWeb/json/work/allTrabajadorFiniquitoEliminar/"+sociedad+","+tipo_division+","+tipo_subdivision+","
			+grupo+","+fecha_t+","+tipocontrato_t+","+cod_t+"",
			function(data) {
               console.log(data);
               var tableadd = $('#tbl_Info').DataTable();
               $.each(data, function(k, v){

            	    fechaI = v.fecha_inicio;
            	    var fslit = fechaI.split('-');
        			var fecha_split = fslit[2]+"-"+fslit[1]+"-"+fslit[0];
        			
        			fechaT = v.fecha_termino;
            	    var fslitT = fechaT.split('-');
        			var fecha_splitT = fslitT[2]+"-"+fslitT[1]+"-"+fslitT[0];
 
            		tableadd.row.add( [
            	            "<td>"+v.codigo_trabajador+"</td>",
            	            "<td>"+v.apellidoPaterno.toUpperCase()+" "+v.apellidoMaterno.toUpperCase()+" "+v.nombre.toUpperCase()+"</td>",
            	            "<td>"+v.rut+"</td>",
            	            "<td>"+fecha_split+"</td>",
            				"<td>"+fecha_splitT+"</td>",
            				"<td>"+v.nombre_causal+"</td>",
            				"<td>"+String(v.total_finiquito).replace(/(.)(?=(\d{3})+$)/g,'$1.')+"</td>",
            				"<td><button title='Eliminar' id=''onclick='eliminar("+v.id+","+v.id_contrato+","+v.codigo_trabajador+");' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button></td>",
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



function eliminar(id,id_contrato,codigo_trabajador){
	
	PopupEliminar = "";
	PopupEliminar +='<div class="col-sm-12 col-md-12">';
	PopupEliminar +=          "<div class='btn btn-circle blue btn-outline' id='"+id+"' onclick='validarEliminar("+id+","+id_contrato+","+codigo_trabajador+");'><i class='fa fa-clock-o'></i> Confirmar</div>";
	PopupEliminar +=          "<div class='btn btn-circle red btn-outline' onclick='closeModal();'> Cancelar</div>";
	PopupEliminar +='</div>';

    popUp("Confirmar Para eliminar", PopupEliminar, true, "400px", true);
	
}

function validarEliminar(id,id_contrato,codigo_trabajador){
	$("#loading").show();
	$.ajax({
	    url: "/simpleWeb/json/work/EliminarFiniquitos/" + id + ","+id_contrato+","+codigo_trabajador+"",
	    type: "PUT",
	    beforeSend: function(xhr) {
	        xhr.setRequestHeader("Accept", "application/json");
	        xhr.setRequestHeader("Content-Type", "application/json");
	    },
	    success: function(data, textStatus, jqXHR) {
            
	    
	    	closeModal();
	    	
	    	$("#CodigoTra").empty();
		    Buscar();
	    
	        alerta("Elimado con Exito ");

	    },
	    error: function(ex) {
	        console.log(ex);
	    }

	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	}).done(function() {
		$("#loading").hide();
	});
	
}