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
	$("#loading").hide();
	ListaSociedad();
	
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


$("#Sociedad").change(function() {

			$("#tipodivision").empty();
			$("#tiposubdivision").empty();
			$("#listagrupo").empty();
			$("#tiposubdivision").append("<option value='-1'>Seleccione Zona</option>");
			$("#listagrupo").append("<option value='-1'>Seleccione CECO</option>");

			var soc = $("#Sociedad").val();

			if (soc == -1) {
				alerta("Debe Seleccionar una Empresa");
				$('.swal2-container').css('z-index', '15000');
				return;
			}

			var soci_sap = "";
			$("#loading").show();
			
			$.getJSON("/simpleWeb/json/work/getSociedadById/"+ $('#Sociedad').val() + "",function(data) 
					{
						soci_sap = JSON.stringify(data.sociedad);

					}).done(function()
					{
						$("#tipodivision").append("<option value='-1'>Seleccione Huerto</option>");
						var soci_sapFinal = soci_sap.replace(/\"/g, '');
						
						$.getJSON("/simpleWeb/json/work/getCampoBySociedad/"+  $('#Sociedad').val() + "",function(data)
						{
							//Obtener huertos en base a los privilegios del usuario
					    	let queryString = huertoPrivilege == null ? "" : JSON.stringify(huertoPrivilege).slice(1,-1);
					    	
					    	 
					    	
					    	
							$.each(data,function(k,v)
									{
								
										var SelectHuerto = "";
										if(huertoPrivilege.includes(v.campo) == true){
						                	SelectHuerto += 	"<option value="+v.campo+">"+v.descripcion+"</option>";
						                }
										$("#tipodivision").append(SelectHuerto);

									})//end each

						}).done(function() 
								{
									$("#loading").hide();

								}) // end done

					})// end done

			lodtrab();

		});

$("#tipodivision").change(function() 
		{

					var valor = $("#tipodivision").val();
					var soc = $("#Sociedad").val();

					if (valor === '') {
						return;
					} else if (soc === '-1') {
						alerta("Debe Seleccionar una Empresa Antes de Filtrar");
						var valor = $("#tipodivision").val("-1");
						$('.swal2-container').css('z-index', '15000');
						return;
					}

					var zona_sap = "";
					$("#loading").show();
					$("#tiposubdivision").empty();
					$("#listagrupo").empty();
					$("#listagrupo").append("<option value='-1'>Seleccione CECO</option>");
					
			       	$.getJSON("/simpleWeb/json/work/getCampoByCampo/"+ $('#tipodivision').val() + "", function(data)
			       			{
								var SelecZona = "";
								SelecZona += "<option value=''>Seleccione Zona</option>";
										
								$.each(data, function(k, v)
										{
											SelecZona += 	"<option value="+v.grupo+">"+v.zona+"</option>";
											$("#tiposubdivision").append(SelecZona);

										})

			       			 }).done(function() 
			       					 {

			       				 		$("#loading").hide();
			       					 });

					lodtrab();

				});

$("#tiposubdivision").change(function() 
		{
			var valor = $("#tiposubdivision").val();
			var soc = $("#Sociedad").val();

			if (valor === '') {
				return;
			} else if (soc === '-1') {
				alerta("Debe Seleccionar una Empresa Antes de Filtrar");
				var valor = $("#tiposubdivision").val("-1");
				$('.swal2-container').css('z-index', '15000');
				return;
			}

			$("#listagrupo").empty();
			var valor_zona = $("#tiposubdivision").val();

			if (valor_zona == "" || valor_zona == "") {
				alerta("Debe Seleccionar una Zona");
				$("#tiposubdivision").focus();
				return;
			}

			var soci_sap = "";
			$("#loading").show();
			
			$.getJSON("/simpleWeb/json/work/getSociedadById/"+ $('#Sociedad').val() + "",function(data)
					{
						soci_sap = JSON.stringify(data.sociedad);

					}).done(function()
							{
						
						 $.each(SESION.campo, function(key, value){

			                  if(value.campo == $('#tipodivision').val()){

			                        CECOAgrupacion = value.cecos;
			                  }
			            });
								var soci_sapFinal = soci_sap.replace(/\"/g, '');
								$.getJSON("http://200.55.206.140/SCLEM/JSON_BAPI_COSTCENTER_GETLIST1.aspx?SOCIEDAD="+$('#Sociedad').val()+"&GRUPO="+valor_zona+"&CECO="+CECOAgrupacion , function(data){
								
													var SelectCECO = "";
													SelectCECO += "<option value=''>Seleccione CECO</option>";

													$.each(data.COSTCENTERLIST,function(k,v) 
															{

																if (v.DESCRIPT.indexOf("Cuartel") > -1 == true) 
																{

																} else 
																{
																	SelectCECO += "<option value="+ v.COSTCENTER + ">" + v.DESCRIPT + "</option>";
																}

															}) // end each
													
															$("#listagrupo").append(SelectCECO);

												}).done(function() {
											$("#loading").hide();

										})

							}) // end fuction

			lodtrab();

		}); // end change

$("#listagrupo").change(function() {

	var valor = $("#listagrupo").val();
	var soc = $("#Sociedad").val();

	if (valor === '') {
		return;
	} else if (soc === '-1') {
		alerta("Debe Seleccionar una Empresa Antes de Filtrar");
		var valor = $("#listagrupo").val("-1");
		$('.swal2-container').css('z-index', '15000');
		return;
	}

	lodtrab();

});



function lodtrab() {

	$("#nombreTrabajador").empty();
	var sociedad = $("#Sociedad").val();

	if (sociedad == '') {
		sociedad = null;
	} else {
		sociedad = $("#Sociedad").val();
	}

	var tipo_contrato = $("#tipocontratoSelect").val();

	if (tipo_contrato === "-1") {
		tipo_contrato = null;
	} else if (tipo_contrato == '') {
		tipo_contrato = null;
	} else {
		tipo_contrato = null;
	}

	var tipo_division = $("#tipodivision").val();

	if (tipo_division === "-1") {
		tipo_division = null;
	} else if (tipo_division == '') {
		tipo_division = null;
	} else {
		tipo_division = $("#tipodivision").val();
	}

	var tipo_subdivision = $("#tiposubdivision").val();
	if (tipo_subdivision === "-1") {
		tipo_subdivision = null;
	} else if (tipo_subdivision == '') {
		tipo_subdivision = null;
	} else {
		tipo_subdivision = null;
	}

	var grupo = $("#listagrupo").val();
	if (grupo === "-1") {
		grupo = null;
	} else if (grupo == '') {
		grupo = null;
	} else {
		grupo = $("#listagrupo").val();
	}

	$("#loading").show();

	$.getJSON(
			"/simpleWeb/json/work/LoadTrabajadorXSociedadFiniquitosModulo/"
					+ sociedad + "," + tipo_division + "," + tipo_subdivision
					+ "," + grupo + "," + tipo_contrato + "",
			function(data) {

				var SelectTrabajadorNombre = "";
				SelectTrabajadorNombre += "<option value='0'>Buscar</option>";
				$("#nombreTrabajador").append(SelectTrabajadorNombre);
				$.each(data, function(k, v) {
					var SelectTrabajador = "";

					var SelectTrabajadorNombre = "";
					SelectTrabajadorNombre += "<option value="
							+ v.codigo_trabajador + ">" + v.codigo_trabajador
							+ "|" + v.apellidoPaterno + " " + v.apellidoMaterno
							+ " " + v.nombre + "|" + v.rut + "</option>";
					$("#nombreTrabajador").append(SelectTrabajadorNombre);
				});
			}).done(function() {
		$("#loading").hide();

	})
}



function buscarTrabajadorByParams() {
	if ($("#nombreTrabajador").val() == ''
			|| parseInt($("#nombreTrabajador").val()) == 0) {
		alerta("Debe Seleccionar un trabajador");
	} else {
		$
				.ajax({
					type : "GET",
					async : false,
					url : "/simpleWeb/json/work/gruops/getTrabajadorByCodeFiniquito/"
							+ $("#nombreTrabajador").val(),
							
					success : function(data) {
						
						window.location.href = ("datosTrabajadorFiniquito?id=" + data.id + "&cod=" +$("#nombreTrabajador").val()+"&soc=" +$('#Sociedad').val()+"");
					},
					error : function(ex) {
						swal({
							title : '<i>ERROR</i>',
							type : 'info',
							html : JSON.stringify(ex),
							showCloseButton : true,
							showCancelButton : true,
							focusConfirm : false,
							confirmButtonText : '<i class="fa fa-thumbs-up"></i>OK!',
							confirmButtonAriaLabel : 'Thumbs up, great!',
							cancelButtonText : '<i class="fa fa-thumbs-down"></i>',
							cancelButtonAriaLabel : 'Thumbs down',
						});
					}
				});
	}

}