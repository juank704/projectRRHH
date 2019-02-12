var periodoTrabajadorGlobal;
var periodoContratoGlobal;
var periodoContratoPosicionGlobal;

var datosDireccion;
var datosDiscapacidad;
var datosInformacionContacto;
var datosContactoEmergencias;
var datosRecorridoBus;
var datosAcademicos;
var datosBancarios1;
var datosBancarios2;
var datosLicenciaConducir;
var datosLicenciaQuimicos;
var datosAhorroAFP;
var datosAhorroAPV;
var datosAhorroConvenido;
var datosLicenciaMaternal;
var datosParaFiniquitar;

function modificarPeriodo() {
	
	//Si no es rol privado no puede modificar
	if(SESION.rolPrivado != "1"){
		$('#btnEditPeriodo').hide();
		return false;
	}
	
	//Mostrar Boton para modificar el periodo
	$("#btnEditPeriodo").show();
	
	//Mostrar modal para seleccionar periodo que se va a modificar
	 swal({
       title: 'Elegir Periodo que se quiere modificar',
       showCancelButton: true,
       width: 400,
       cancelButtonColor: '#d33',
       html: '<div class="col-md-6 col-md-offset-3"><input id="fechaBack" type="text" class="form-control input-circle row_data dateWork" edit-type="" col_name="fechaBack" name="fechaBack" /></div>',
       onOpen: function () {
    	   
    	   let fechaIngreso = $("#fechaIngreso").val().split("-");
    	   
    	   $("#fechaBack").datepicker({ dateFormat: 'mm-yy', changeMonth: true, changeYear: true, yearRange: "1930:+10", minDate: new Date(Number(fechaIngreso[2]), Number(fechaIngreso[1]) - 1 , Number(fechaIngreso[0]) ) });
    	   
       }
   }).then(function (result) {

       if (result.value) {
    	   
    	   let fecha = $("#fechaBack").val().split("-");
    	   
    	   let periodo = fecha[1]+fecha[0];
    	   
    	   //Buscar Trabajador para el periodo seleccionado
    	   periodoTrabajadorGlobal = $(this).getJSONSync('/simpleWeb/json/work/TrabajadoresPer/getTrabajadorPerWithFilter/?periodo='+periodo + '&codigo='+trabajadorGlobal.codigo );
    	   periodoTrabajadorGlobal.periodo = periodo;
    	   
    	   periodoContratoGlobal = $(this).getJSONSync('/simpleWeb/json/work/ContratosPer/getContratosPerWithFilter/?periodo='+periodo+'&codigo_trabajador='+trabajadorGlobal.codigo );
    	   periodoContratoGlobal.periodo = periodo;
    	   
    	   //Colocar los datos en el input
    	   $(this).setJSONToInputs(".row_data", periodoTrabajadorGlobal);
    	   
    	   //Obtener la Posicion del Contrato
    	   periodoContratoPosicionGlobal = 0;
    	   
    	   if(periodoContratoGlobal.length >= 2){
    		   
    		   swal({
    		       title: 'El trabajador tiene mas contratos para ese periodo',
    		       showCancelButton: true,
    		       width: 400,
    		       cancelButtonColor: '#d33',
    		       html: '<div class="col-md-6 col-md-offset-3"><select id="contratoBack" type="text" class="form-control input-circle row_dataLaboral dateWork" edit-type="" col_name="contratoBack" name="contratoBack" /></select></div>',
    		       onOpen: function(){
    		    	   
    		    	   let fechasInicioContrato = new Array();
    		    	   
    		    	   //Obtener todos los contratos del trabajador
    		    	   $.each(periodoContratoGlobal, function(key, val){
    		    		   fechasInicioContrato.push({  idContrato : val.id,
    		    			   							fecha : changeDateformatDDMMYY(val.fecha_inicio_actividad)
    		    			   						});
    		    	   })
    		    	   $('#contratoBack').setOptionsByArray(fechasInicioContrato, "fecha", "idContrato");
    		    	   
    		    	   
    		       }
    		   }).then(function (result) {
    		       if (result.value) {
    		    	   

    		    	   
    		    	   $.each(periodoContratoGlobal, function(key, val){
    		    		  if(val.id == $('#contratoBack').val()){
    		    			  periodoContratoPosicionGlobal = key;
    		    			  $(this).setJSONToInputs(".row_dataLaboral:not(#sociedad)", periodoContratoGlobal[periodoContratoPosicionGlobal]);
    		    			  $("#estadoContrato").val(periodoContratoGlobal[periodoContratoPosicionGlobal].estadoContrato);
    		    		  }
    		    	   });
    		    	   
    		       }
    		   });
    	   }
    	   
    	   //Colocar Informacion de Contrato
    	   $(this).setJSONToInputs(".row_dataLaboral:not(#sociedad)", periodoContratoGlobal[0]);
    	   $(this).collapseInformation('.row_dataEstadoContrato');
    	   
    	   // Hacer todos los Campos Editables
    	   $(document).find('form#actualizarTrabajadorForm :input, form#actualizarTrabajadorForm2 :input')
    	   .attr('contenteditable', 'true')
    	   .attr('edit_type', 'button')
    	   .addClass('bg-warning')
    	   .css('padding', '0px')
    	   .attr('readonly', false)
    	   .attr('disabled', false)
    	   .css('background-color', '#f9e491')
    	    
    	   //Ocultar Inputs no necesarios para nuevo ingreso
			$(document).find(".row_dataCuenta").closest('table').hide();
			$(document).find("#datosAcademicos").closest('table').hide();
			$(document).find(".row_dataDiscapacidad").closest('table').hide();
			$(document).find(".row_dataConducir:first").closest('tr').parent('tr').hide();
			$(document).find("#licenciaQuimicos").closest('tr').hide();
			$(document).find("#licenciaConducir").closest('tr').hide();
			$(document).find("#licenciaMaternal").closest('tr').hide();
	   
    	   //Mostrar Boton para modificar el periodo
    	   $("#btnEditPeriodo").hide();
    	   $("#btnEdit").remove();
    	   $("#btnSave").remove();
    	   $("#btnSavePeriodo").show();
    	   $("#btnCancelPeriodo").show();
  
       }

   });
	
	
}


function salvarPeriodo(){
	
	// Obtener Datos de Trabajador de los Inputs
    let arrTrabajador = $(document).find('.row_data').getObjectByInputs();
    let arrContrato = $(document).find('.row_dataLaboral').getObjectByInputs();
	
    $.extend(arrTrabajador, {periodo : periodoTrabajadorGlobal.periodo}, {id : idTrabajadorGlobal}, {codigo : $('#codigo').val()});
    $.extend(arrContrato,   {periodo : periodoTrabajadorGlobal.periodo}, {id : periodoContratoGlobal[periodoContratoPosicionGlobal == null ? 0 : periodoContratoPosicionGlobal].id });
    $.extend(arrContrato,   {codigo_trabajador : periodoTrabajadorGlobal.codigo });
    $.extend(arrContrato, { estado_contrato : $('#estadoContrato').val() })
    
    // Actualizar Trabajador en Periodo
    $(this).setJSONSync('/simpleWeb/json/work/TrabajadoresPer/updateTrabajadorPer/', arrTrabajador);
    $(this).setJSONSync('/simpleWeb/json/work/ContratosPer/updateContratosPer/', arrContrato)
    
    console.log(arrContrato);
    
    location.reload();
	
}

//Copiar Informacion de Huerto tabla Trabajador a Contrato
$(function () {
    var $src = $('#idHuerto'),
        $dst = $('#idHuertoContrato');
    $src.on('input', function () {
        $dst.val($src.val());
    });
});

//Copiar Informacion de CECO tabla Trabajador a Contrato
$(function () {
    var $src = $('#idCECO'),
        $dst = $('#idCECOContrato');
    $src.on('input', function () {
        $dst.val($src.val());
    });
});

//Copiar Informacion de Faena tabla Trabajador a Contrato
$(function () {
    var $src = $('#idFaenaContrato'),
        $dst = $('#idFaena');
    $src.on('input', function () {
        $dst.val($src.val());
    });
});

var updateBack = 0;
var insertPeriod = false;
var insertPeriodContract = false;
var codigoTrabajadorGlobal;
var idTrabajadorGlobal;
var idContratoGlobal;
var trabajadorGlobal;
var contratoGlobal;

// Options Academicos
var optionsNivel = [];
var optionsCarrera = [];
var optionsInstituciones = [];
var optionsNombreInstitucion = [];

var sociedadPrivilege = new Set();
var huertoPrivilege = new Set();
//Obtener Sociedades y Huertos que tiene acceso
$.each(SESION.campo, function(key, value){
	sociedadPrivilege.add(value.idSociedad);
	huertoPrivilege.add(value.campo);
}); 


$('.charCloseX').click(function(){
	$('#fechaTermino').val("");
});


$('.subirFoto').on('show.bs.modal', function (event) {
	  let button = $(event.relatedTarget); // Button that triggered the modal
	  let idTipoDocumento = button.data('idtipodocumento'); // Extract info from data-* attributes
	  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
	  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
	  let modal = $(this);
	  modal.find('#idTipoDocumento').val(idTipoDocumento);  
});

$('.subirFoto').on('hidden.bs.modal', function (event) {
	  // do something...
	$('.fileinput-remove-button').click();
});


function insertImagen(){

	if($('#idDocumento').val() == ""){
		return;
	}
	//Inicializar Datos
	let formDocumento = new FormData();
	//Obtener Archivo
	let fileDocumento = $('#idDocumento').prop("files")[0];
	
	//Inserto documento y datos del formulario
	formDocumento.append("documento", fileDocumento);
	formDocumento.append("codTrabajador", localStorage.getItem('codTrabajador'));
	formDocumento.append("tipoDocumento", $('#idTipoDocumento').val());
	formDocumento.append("nombreDocumento", fileDocumento.name);
	
	//Enviar documentos y datos del formulario al servicio 
	$.ajax({
		url : "/simpleWeb/file/work/DocumentosFile/imagenes/insertDocumentos/",
		dataType : 'script',
		async : false,
		cache : false,
		contentType : false,
		processData : false,
		data : formDocumento, //Datos
		type : 'post',
		success : function() {

		}
	});
	
	loadTrabajador();
	
}

function deleteImagen(){
	
	if($('#imgFoto').attr('src') == "../assets/pages/img/avatars/img-default.png" && $('#idTipoDocumento').val() == 50){
		alerta("Trabajador sin foto");
		return false;
	}
	
	
	let codigo = $('#codigo').text();
	if(codigo != null){
		$.getJSON("/simpleWeb/file/work/DocumentosFile/imagenes/deleteDocumentos/?tipoDocumento="+$('#idTipoDocumento').val()+"&codTrabajador="+codigo)
		.success(function(data){
			if($('#idTipoDocumento').val()==50){
				$('#imgFoto').attr("src", "../assets/pages/img/avatars/img-default.png")
			}else{
				alerta("Documento Eliminado");
			}
		});
	}
	
	
}

function downloadImagen(){
	
	if($('#imgFoto').attr('src') == "../assets/pages/img/avatars/img-default.png" && $('#idTipoDocumento').val() == 50){
		alerta("Trabajador sin foto");
		return false;
	}
	
	
	let codigo = $('#codigo').text();
	if(codigo != null){		
		window.open('/simpleWeb/file/work/DocumentosFile/imagenes/downloadDocumentosWithFilter/?codTrabajador='+codigo+'&tipoDocumento='+$('#idTipoDocumento').val());
	}
	
	
}


function previsualizarImagen(idTipoDocumento){
	
	$("#btnDownloadImagen").hide();
	$("#btnDeleteImagen").hide();
	
	if($('#imgFoto').attr('src') == "../assets/pages/img/avatars/img-default.png" && idTipoDocumento == 50){
		return false;
	}
	
	//Cargar Imagen en el Modal
	$.ajax({
	    type: "GET",
	    url: '/simpleWeb/file/work/getDocumentosWithFilter/?codTrabajador='+trabajadorGlobal.codigo+'&tipoDocumento='+idTipoDocumento,
	    contentType: 'image/png',
	    success: function (data) {
	    	if(data!=""){
	    
	    	$("#btnDownloadImagen").show();
	    	$("#btnDeleteImagen").show();
	    		
	    	let src='data:image/png;base64,'+data;
	    	
	    	$('.file-input-new').removeClass('file-input-new');
	    	$('.file-preview-thumbnails').append('<div class="file-preview-frame"></div>');   
	    	$('.file-preview-frame').append('<img class="file-preview-image"></img>');
	        $('.file-preview-image').attr('src',src);
	        
	        }
	      }
	 });
	
	
} 


$(document).ready(function () {
	
	$('#loading').show();
	
	if(SESION.rolPrivado != "1"){
		$('#btnEditPeriodo').hide();
	}
	
	//Ejecutar Elementos antes de los Eventos
	beforeEvents();

    // Setear Parametros
    getSelector();

    // Cargar Datos del Trabajador
    loadTrabajador();

    // Cargar Formatos de Inputs
    setFormatInputs();

    // Cargar Eventos
    setLogicEventInputs();

    // Agregar Elementos que modifican el estilo
    setStyleInView();

    datatableMovimientos();
    datatableFamiliares();
    datatablePermisos();
    datatableLicencias();

    

});


function afterLoadData(trabajador, contrato){

	//Direccion del Trabajador
	if(!(trabajador.calle || trabajador.ndireccion || trabajador.depto || trabajador.poblacion)){
	   $(this).collapseInformation('.row_dataDireccion');
	}
	
	//Discapacidad --> En getDatosDiscapacidad()
	
	//Datos Trabajador Tlf mail
	if( !(trabajador.phoneCasa || trabajador.celular || trabajador.mailWorker) ){
	   $(this).collapseInformation('.row_dataContacto');
	}
	
	//CuentasBancarias --> En getCuentasBancarias()
	
	//LicenciaConducir --> En getDatosLicenciaConducir()
	
	//LicenciaQuimicos --> En getDatosLicenciaQuimicos()
	
	//Adicional AFP	
	if( trabajador.idAdicionalAFP ){
		   $(this).collapseInformation('.row_dataAhorroAFP');
	 }
	
	//APV
	if( trabajador.institucionAPV ){
		   $(this).collapseInformation('.row_dataAPV');
	 }
	
	//LicenciaMaternal --> En getDatosLicenciaMaternal()
	
    
    $('#loading').hide();
	
}



async function beforeEvents(){
	
	//Obtener id del Trabajador
	idTrabajadorGlobal = getINFO().id;
	
	// Obtener Trabajador
    trabajadorGlobal = await $.getJSON("/simpleWeb/json/work/getTrabajadorById/"+ idTrabajadorGlobal);
    
    //Si tiene rol privado mostrar checkbox
    if(SESION.rolPrivado == "1"){
    	$("#rolPrivadoDiv").show();
    }
    
    if(trabajadorGlobal.rolPrivado == "1"){
    	$("#rolPrivado").attr("checked", true);
    }else{
    	$("#rolPrivado").attr("checked", false);
    }
    
    
    //Obtener codigo del Trabajador
    codigoTrabajadorGlobal = trabajadorGlobal.codigo;
    
    //Insertar codigo de Trabajador en el Local Storage
    localStorage.setItem('codTrabajador', codigoTrabajadorGlobal);
    
    //Obtener ultimo contrato del Trabajador
    contratoGlobal = await $.getJSON("/simpleWeb/json/work/getUltimoContratoActivoByIdTrabajador/"+codigoTrabajadorGlobal);
    
    //Obtener Id del ultimo contrato del Trabajador
    idContratoGlobal = contratoGlobal.id;
	
}


var aux = [];

// Setear Datos de CECO
async function setDatosCECO(idTrabajadorGlobal, id_sociedad) {

    // Obtener Trabajador
    let trabajador = await $.getJSON("/simpleWeb/json/work/getTrabajadorById/"+idTrabajadorGlobal);

    // Obtener Codigo de la Sociedad en base al Id
    let sociedadSAP = await $.getJSON("/simpleWeb/json/work/getSociedadById/" + id_sociedad);

    // Obtener Huerto por la Sociedad
    let huerto = await $.getJSON("/simpleWeb/json/work/getCampoWithFilter/?sociedad=" + sociedadSAP.sociedad);

    //Limpiar Select Huerto
    $('#idHuerto').children('option:not(:first)').remove();
    
    // Llenar select de la Lista Huerto
    $('#idHuerto').setOptionsByArray(huerto, "descripcion", "campo");

    $('#idHuerto').val(trabajador.idHuerto);

    // Obtener Zona por el Huerto
    let idZona = await $.getJSON("/simpleWeb/json/work/getCampoByCampo/" + trabajador.idHuerto);

    // Llenar select de la Lista Zona
    $('#idZona').children('option:not(:first)').remove();
    $('#idZona').setOptionsByArray(idZona, "zona", "grupo_ceco_work");
    //Seleccionar Segunda Opcion
    $("#idZona option:eq(1)").attr('selected','selected');
 
    //Filtrar CECOS en Base a la variable de Sesion
    let CECOAgrupacion = ""
		$.each(SESION.campo, function(key, value){
			if(value.campo == $('#idHuerto').val()){
				CECOAgrupacion = value.cecos;
			} 
		});

    // Obtener CECO por la Zona
    let CECOSAP = await $.getJSON(IPSERVERSAP+"JSON_BAPI_COSTCENTER_GETLIST1.aspx?SOCIEDAD=" + id_sociedad + "&GRUPO=" + $('#idZona').val() + "&CECO="+CECOAgrupacion);
    let CECO = CECOSAP.COSTCENTERLIST;

    //Limpiar Select CECO
    $('#idCECO').children('option:not(:first)').remove();
    
    // Llenar select de la Lista de CECO
    $.each(CECO, function(key, value) {
		$('#idCECO').append($('<option>').text(value.DESCRIPT + " | " + value.COSTCENTER).val(value.COSTCENTER));
	});

    $('#idCECO').val(trabajador.idCECO);
    
    //bug: Insertar faena correspondiente
    $('#idFaenaContrato').val(trabajador.idFaena);
    $('#idFaena').val(trabajador.idFaena);


}


function setFormatInputs() {

    // Formato para rut y validacion
    $('.input_rut').Rut({ format_on: 'keyup' });
    
    //Input de Hora
	$(".timeWork").timepicker();

    // Formato numero de Telefono
    $('#phoneCasa, #telefonoEmergencia').mask('00 0000000');
	$('#celular').mask('0 0000-0000');

    // Formato de Porcentaje
    $('#porcentajeDiscapacidad, .percentage').mask('##0,00%', { reverse: true });
    
  //Formato de Fecha
	$('.dateWork').each(function(key, value){
		$(value).mask("00-00-0000", {placeholder: "__-__-____"});
	});

    // Formato de Moneda
    $('.money').each(function (key, value) {

        $(value)
            .blur(function () {
                $(this).formatCurrency({ colorize: true, negativeFormat: '-%n', roundToDecimalPlace: 3, digitGroupSymbol: '.', decimalSymbol: ',' });
            })
            .keyup(function (e) {
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
            .bind('decimalsEntered', function (e, cents) {
                if (String(cents).length > 2) {
                }
            });
    });



}



async function loadTrabajador(periodo) {
	
	

	// Obtener Trabajador
    let trabajador = await $.getJSON("/simpleWeb/json/work/getTrabajadorById/"+ idTrabajadorGlobal);
    
  //Obtener ultimo contrato del Trabajador
    let contrato = await $.getJSON("/simpleWeb/json/work/getUltimoContratoActivoByIdTrabajador/"+codigoTrabajadorGlobal);
    contratoGlobal = contrato;
    
    if(trabajador.rolPrivado == "1" && SESION.rolPrivado == "0"){
    	swal({title:"No posee autorización para ver este Trabajador",
       	 allowOutsideClick: false}).then(function (result) {
           if (result.value) {
        	   history.back()
           }
       	});
    	return false;
    }
    
	
	//Cargar Foto
	$.ajax({
	    type: "GET",
	    url: '/simpleWeb/file/work/getDocumentosWithFilter/?codTrabajador='+trabajador.codigo+'&tipoDocumento=50',
	    contentType: 'image/png',
	    success: function (data) {
	    	if(data!=""){
	    	let src='data:image/png;base64,'+data;
	        $('#imgFoto').attr('src',src);
	        }
	      }
	 });

    // Setear el CECO, Huerto, Zona, CECO
    setDatosCECO(idTrabajadorGlobal, contrato.id_sociedad);
    // Si el Trabajador Tiene Un periodo Guardar datos del Periodo Seleccionado
    // TODO:
//    if (periodo) {
//
//        // Guardar Periodo
//        updateBack = periodo;
//        insertPeriod = false;
//        insertPeriodContract = false;
//
//        // Obtener Trabajador Para ese Periodo
//        var periodoTrabajador = $(this).getJSONSync("/simpleWeb/json/work/getTrabajadorPeriodoByIdTrabajadorAndPeriodo/" + getINFO().id + "," + periodo + "-01");
//        var periodoContrato = $(this).getJSONSync("/simpleWeb/json/work/getAnexoContratoByIdTrabajadorAndPeriodo/" + getINFO().id + "," + periodo + "-01");
//
//        // Si el trabajador no tiene periodo, insertar datos de nuevo periodo
//        if (periodoTrabajador.length <= 0) {
//            // alerta("No Existe el Trabajador con dicho Periodo");
//            insertPeriod = true;
//        } else {
//            // Si el trabajador tiene periodo Mostrar datos del periodo
//            $.extend(trabajador, periodoTrabajador.pop());
//        }
//
//        // Si no se tiene un Periodo para ese Contrato insertar un Anexo
//        // Contrato
//        if (periodoContrato.length <= 0) {
//            insertPeriodContract = true;
//        } else {
//            // Si el trabajador tiene contrato para este periodo Mostrar datos
//            // de ese periodo
//            // alerta("Existe un Anexo de Contrato para este Periodo");
//            $.extend(contrato, periodoContrato.pop());
//        }
//
//    }

    // Datos de Cabecera
    $("#name").html(trabajador.apellidoPaterno + " " + trabajador.apellidoMaterno + ", " + trabajador.nombre);
    $("#codigo").html(trabajador.codigo);

    if (trabajador.pasaporte != "") {
        $("#labelRut").text('Pasaporte: ');
        $("#rutWorkerHead").html(" " + trabajador.pasaporte);
    } else if (trabajador.rutTemporal != "") {
        $("#labelRut").text('RUT Temporal: ');
        $("#rutWorkerHead").html(" " + trabajador.rutTemporal);
    } else if (trabajador.rut != "") {
        $("#rutWorkerHead").html(" " + trabajador.rut);
    } else {
        $("#rutWorkerHead").html(" " + trabajador.rut);
    }

    $("#phoneWorker").html(trabajador.telefono);
    $("#inWorker").html(changeDateformatDDMMYY(contrato.fIngresoCompContrato));

    // Obtener Datos Acedemicos
    getDatosAcademicos(idTrabajadorGlobal);

    // Obtener Cuentas Bancarias del Trabajador
    getCuentasBancarias(idTrabajadorGlobal);

    // Obtener Datos Discapacidads
    getDatosDiscapacidad(idTrabajadorGlobal);
    
    //Obtener Datos de Licencia 
    getDatosLicenciaConducir(trabajador.codigo);
    
    //Obtener Datos Credencial SAG
    getDatosLicenciaQuimicos(trabajador.codigo);
    
    //Obtener Datos de Maternal
    //getDatosLicenciaMaternal(trabajador.codigo);

    // Obtener Datos Vacaciones
    // getDatosVacaciones(getINFO().id);

    $("#tipoTrabajador").val(contrato.tipoTrabajador);
    $("#sociedad").val(contrato.id_sociedad);
    $("#fechaIngreso").val(changeDateformatDDMMYY(contrato.fecha_inicio_actividad));
    // $("#fechaIngresoCompania").val(changeDateformatDDMMYY(trabajador.fechaIngresoCompania));
    $("#fechaTermino").val(changeDateformatDDMMYY(contrato.fecha_termino_actividad));

    // En base al tipo de Contrato elegir
    $("#tipoContrato").val(contrato.tipoContrato);

    $("#cargo").val(contrato.cargo);
    $("#posicion").val(contrato.posicion);

    $("#sueldo_mensual").val(formatNumber(contrato.sueldoBase));
    $("#hrs_semanal").val(contrato.horasSemanales);

    $("#pensionados").val(trabajador.pensionados);
    
    $("#pensionadosCotizante").val(trabajador.pensionadosCotizantes);
    $("#mayor11Anos").val(trabajador.mayor11Anos);
    
    
    $("#sCesantia").val(trabajador.sCesantia);
    $("#agro").val(trabajador.agro);
    $("#supervisor").val(contrato.supervisor);
    $("#maquinista").val(contrato.maquinista);
    $("#trabajadorJoven").val(trabajador.trabajadorJoven);

    $("#division").val(trabajador.division);
    $("#idSubDivision").val(trabajador.idSubDivision);
    $("#grupo").val(trabajador.grupo);
    $("#idSubGrupo").val(trabajador.idSubGrupo);

    $('#idTurno').val(contrato.idTurno);

    $("#colacionFija").val(contrato.colacionFija == 0 ? "" : formatNumber(contrato.colacionFija));
    $("#movilizacionFija").val(contrato.movilizacionFija == 0 ? "" : formatNumber(contrato.movilizacionFija));

    $('#idMonedaAVP').val(trabajador.idMonedaAVP)
    $('#idMonedaAFP').val(trabajador.idMonedaAFP)
    $('#idMonedaConvenido').val(trabajador.idMonedaConvenido)
    $('#idMonedaPlan').val(trabajador.idMonedaPlan)
    
    //Nuevos Datos
    $('#paraFiniquitar').val(contrato.paraFiniquitar);
    $('#finiquitado').val(contrato.finiquitado);
    $('#rolPrivado').val(trabajador.rolPrivado);
    //$('#idIsapre').val
    if(trabajador.idIsapre == 13){$(".row_dataSalud").closest('tr').hide();}
    
    
    
$('#idMonedaAVP, #idMonedaAFP, #idMonedaConvenido, #idMonedaPlan').each(function(key, val){
		
		let input;
		//Obtener el input que voy a cambiar Manual TODO: mejorar
		if($(val).attr('id') == 'idMonedaAVP'){
			input = '#valorDepositoAPV';
		}else if($(val).attr('id') == 'idMonedaAFP'){
			input = '#valorAFP';
		}else if($(val).attr('id') == 'idMonedaConvenido'){
			input = '#valorConvenido';
		}else if($(val).attr('id') == 'idMonedaPlan'){
			input = '#valorPlan';
		}
		
		if($(val).find("option:selected").text() == 'U.F.'){
			$(input).addClass('UF');
		}else{
			$(input).removeClass('UF');
		}
			
 });
    
    // Obtener todos los valores de Trabajdor e insertarlo en input
    $(this).setJSONToInputs(".row_data", trabajador);
    $(this).setJSONToInputs(".row_dataLaboral", contrato);

    $('#calle').val(trabajador.calle == null ? 'S/N' : trabajador.calle );
    getExtranjero(trabajador.idNacionalidad);
    $("#empresaWorker").html($('#sociedad option:selected').text());
    
    //Bug Finiquitado after setJSONToInputs
    if(contrato.fecha_inicio_actividad == null){
    	$('#finiquitado').prop('checked', true);
    	$('#finiquitado').val(1);
    }
    
    //Logica para expandir los datos cuando entran al menu
    if(trabajador.codigo != null){
    	//Ejecutar acciones despues de la Carga de Datos
        afterLoadData(trabajador, contrato)
    }
    

}

//Licencia de Conducir
async function getDatosLicenciaConducir(codTrabajador) {
    
	// Obtener Datos Licencia de Conducir por Codigo de Trabajador
    let licencia = await $.getJSON('/simpleWeb/json/work/getTrabajadorLicenciaConducirByIdTrabajador/'+codTrabajador);

    // Obtener todos los valores de Licencia de Conducir e insertarlo en input
    $('.row_dataConducir').fillDataToInputByObject(licencia);
    
    if( licencia.numeroLicencia ){
       $(this).collapseInformation('.row_dataConducir');
 	}
    
    
}

//Licencia Quimicos
async function getDatosLicenciaQuimicos(codTrabajador) {
	
	// Obtener Datos Licencia de Credencial SAG por Codigo de Trabajador
    let quimicos = await $.getJSON('/simpleWeb/json/work/getTrabajadorLicenciaAplicadorByIdTrabajador/'+codTrabajador);

    // Obtener todos los valores de Licencia de Conducir e insertarlo en input
    $('.row_dataQuimicos').fillDataToInputByObject(quimicos);
    
    if( quimicos.numeroLicenciaSAG ){
        $(this).collapseInformation('.row_dataQuimicos');
  	}
    
}

//Licencia Maternal
async function getDatosLicenciaMaternal(codTrabajador) {
    
	// Obtener Datos Licencia de Conducir por Codigo de Trabajador
    let maternal = await $.getJSON('/simpleWeb/json/work/getTrabajadorLicenciaMaternalByIdTrabajador/'+codTrabajador);

    // Obtener todos los valores de Licencia de Conducir e insertarlo en input
    $('.row_dataMaternal').fillDataToInputByObject(maternal);
    
    if( maternal.fechaConcepcion || maternal.fechaTerminoContrato ){
        $(this).collapseInformation('.row_dataMaternal');
  	}
}


async function getDatosDiscapacidad(idTrabajador) {

    // Obtener Datos Discapacidad por Id Trabajador
    let discapacidad = await $.getJSON("/simpleWeb/json/work/getLastDiscapacidadByIdTrabajadores/"+idTrabajador);
    
    // Obtener todos los valores de discapacidad e insertarlo en input
    $('.row_dataDiscapacidad').fillDataToInputByObject(discapacidad);
        
    if( !( nCredencial || fechaReevaluacion || gradoDiscapacidad 
    	|| procentajeDiscapacidad || causaDiscapacidad || movilidadDiscapacidad ) ){
    	$(this).collapseInformation('.row_dataDiscapacidad');
    }
    
}

async function getDatosAcademicos(idTrabajador) {

    // Obtener Datos Academicos por Id Trabajador
    let academicos = await $.getJSON("/simpleWeb/json/work/getAcademicosByIdTrabajador/"+idTrabajador);

    // Academicos
    $("#nivelEducacion").val(academicos.nivelEducacion);
    $("#nivel").val(academicos.nivel);
    $("#carrera").val(academicos.carrera);
    $("#instituciones").val(academicos.instituciones);
    $("#nombreInstitucion").val(academicos.nombreInstitucion);

    $("#fechaDesdeInstitucion").val(changeDateformatDDMMYY(academicos.fechaDesdeInstitucion));
    $("#fechaHastaInstitucion").val(changeDateformatDDMMYY(academicos.fechaHastaInstitucion));


}


async function getCuentasBancarias(idTrabajador) {

    let cuentaBancaria = await $.getJSON("/simpleWeb/json/work/getCuentaBancariaByIdTrabajador/"+idTrabajador);

    // Si no existe cuenta bancaria setear el valor de los check a 0
    if (cuentaBancaria.length == 0) {
        $("#i1").val(0);
        $("#i2").val(0);
    }

    $.each(cuentaBancaria, function (key, value) {

        $("#i" + (key + 1)).attr("idcuentabancaria", value.idCuentaBancaria);

        if (value.cuentaPrimaria == 1) {
            $("#i" + (key + 1)).prop("checked", true);
            $("#i" + (key + 1)).val(1);
        }
        else {
            $("#i" + (key + 1)).prop("checked", false);
            $("#i" + (key + 1)).val(0);
        }

        $("#idTipoCuenta" + (key + 1)).val(value.idTipoCuenta);

        $("#idBanco" + (key + 1)).val(value.idBanco);

        $("#nCuenta" + (key + 1)).val(value.nCuenta);


    });

    
    if(cuentaBancaria[0].cuentaPrimaria == 1){
    	$(this).collapseInformation('.row_dataCuenta2');
    }
    
    if(cuentaBancaria[1].cuentaPrimaria == 1){
    	$(this).collapseInformation('.row_dataCuenta1');
    }
    
    

}


// Hacer los Campos editables
$(document).on('click', '.btn_edit', function (event) {

    event.preventDefault();
    $('#btnEditPeriodo').hide();
    loadTrabajador($('#fechaBack').val());
    editWorker();
    $('.charCloseX').show();
    

//    // Obtener la Ultima fecha de Contrato del Trabajador
//    let contrato = objContrato;
//    try {
//        // TODO: Obtener la fecha de Hoy
//        var today = new Date()
//        var fecha = new Date(today.getFullYear(), today.getMonth(), 1);
//        var fechaIngresoContrato = contrato.fecha_inicio_actividad.split("-");
//        var endList = new Date(fechaIngresoContrato[0], parseInt(fechaIngresoContrato[1]) - 1, 1);
//
//        var listaPeriodos = new Array();
//
//        for (var i = 0; i <= 4; i++) {
//
//            var d = new Date(fecha.getFullYear(), fecha.getMonth() - i, 1);
//
//            var mes = d.getMonth() + 1;
//            mes = mes < 10 ? "0" + mes : mes + "";
//
//            var anio = d.getFullYear();
//
//            var selectOptionDates = {
//                value: anio + "-" + mes,
//                text: $(this).getJSONSync("/simpleWeb/json/work/getParametrosByCodigoAndLlave/MES," + mes).descripcion + "-" + anio
//            }
//
//            listaPeriodos.push(selectOptionDates);
//
//            if (d.getTime() === endList.getTime()) {
//                break;
//            }
//
//        }
//
//        swal({
//            title: 'Elegir Periodo que se quiere modificar',
//            showCancelButton: true,
//            width: 400,
//            cancelButtonColor: '#d33',
//            html: '<div class="col-md-6 col-md-offset-3"><select id="fechaBack" type="text" class="row_data form-control input-circle mayusculasWork" edit-type="" col_name="fechaBack" name="fechaBack" ></select></div>',
//            onOpen: function () {
//
//                $('#fechaBack').append($('<option>', { value: listaPeriodos[0].value, text: 'Reciente' }));
//                // Remover Primer Elemento del Array
//                listaPeriodos.shift();
//                // Setear fechas de Periodos en select
//                $('#fechaBack').setOptionsByArray(listaPeriodos);
//
//            }
//        }).then(function (result) {
//
//            if (result.value) {
//
//                // Setear datos de la tabla back seleccionada
//                loadTrabajador($('#fechaBack').val());
//                editWorker();
//            }
//
//        });
//
//    }
//    catch (err) {
//        alerta("El Contrato del trabajador no se encuentra activo");
//    }

});




function editWorker() {

    // Obtener los Inputs del Formulario
    let div_info = $(document).find('form#actualizarTrabajadorForm :input, form#actualizarTrabajadorForm2 :input');
    // Obtener el nombre de la propiedad col_name
    let col_name = div_info.attr('col_name');
    // Obtener el valor del Input
    let col_val = div_info.html();

    // Mostrat Botones de Guardar y Cancelar
    $(document).find('.btn_save').show();
    $(document).find('.btn_cancel').show();

    // Ocultar Boton de Editar
    $(document).find('.btn_edit').hide();

    // Hacer todos los Campos Editables
    $(document).find('form#actualizarTrabajadorForm :input, form#actualizarTrabajadorForm2 :input')
        .attr('contenteditable', 'true')
        .attr('edit_type', 'button')
        .addClass('bg-warning')
        .css('padding', '0px')
        .attr('readonly', false)
        .attr('disabled', false)
        .css('background-color', '#f9e491')

    // Hacer los campos de Fecha solo ReadOnly
    $(document).find('.dateWork').prop('readonly', true);

    // Devolver los Cambios realizados
    div_info.each(function (index, val) {
        $(this).attr('original_entry', $(this).val());
    });
    

    $("#idZona").val($("#idZona option:eq(1)").val());

}



// Cancelar edicion
$(document).on('click', '.btn_cancel', function (event) {
//    event.preventDefault();
//    cancelarEnvio();
//    setLogicEventInputs();
	
	location.reload();
	
});


function cancelarEnvio() {

    // Buscar todos los Inputs del Formulario
    let div_info = $(document).find('form#actualizarTrabajadorForm :input, form#actualizarTrabajadorForm2 :input');

    // Deshabilitar
    div_info.prop('disabled', true);

    // Botones de Acciones Ocultar
    $(document).find('.btn_save').hide();
    $(document).find('.btn_cancel').hide();

    // Mostrar Boton de Editar
    $(document).find('.btn_edit').show();

    // Colocar Inputs Deshabilitados
    div_info.attr('edit_type', 'click')
        .removeAttr('contenteditable')
        .removeClass('bg-warning')
        .css('padding', '')
        .attr('readonly', true)
        .css('background-color', '')

    // Obtener el valor Almacenado en la Propiedad Original_Entry
    div_info.each(function (index, val) {
        $(this).val($(this).attr('original_entry'));
        $(this).prop("checked", $(this).attr('original_entry') == '1' ? true : false);
    });


}

function validarForm() {

    var frmvalid = $("#actualizarTrabajadorForm");
    var frmvalid2 = $("#actualizarTrabajadorForm2");


    frmvalid.validate({
        errorElement: 'span',
        errorClass: 'help-block help-block-error',
        focusInvalid: true,
        rules: {
            rut: {
                required: function (element) { return $("#idNacionalidad").find("option:selected").text() == 'Chileno'; },
                // remote : {
                // url: "/simpleWeb/json/work/existTrabajadorByRut",
                // type: "post",
                // dataFilter: function (data) {
                // var json = JSON.parse(data);
                // if (json.rut) {
                // return "\"" + "El rut ya existe" + "\"";
                // } else {
                // return 'true';
                // }
                // }
                // },
            },
            rutTemporal: {
            	required : function(element){ return $("#idNacionalidad").find("option:selected").text() != 'Chileno' && $('#rutWorker').val() == '' && $('#pasaporte').val() == ''; },
                // remote : {
                // url: "/simpleWeb/json/work/existTrabajadorByRutTemporal",
                // type: "post",
                // dataFilter: function (data) {
                // var json = data;
                // if (json == true) {
                // return "\"" + "El rut provisorio ya existe" + "\"";
                // } else {
                // return 'true';
                // }
                // }
                // },
            },
            pasaporte : { required : function(element){ return $("#idNacionalidad").find("option:selected").text() != 'Chileno' && $('#rutWorker').val() == '' && $('rutTemporal').val() == ''; } },
            nombre: { required: true },
            apellidoPaterno: { required: true },
            fNacimiento: { required: true, underAge: true },
            idGenero: { required: true },
            idNacionalidad: { required: true },
            idEstadoCivil: { required: true },
            telefono: { required: false },
            celular: { required: false },
            email: { required: false, email: true },
            direccion: { required: true },
            idRegion: { required: true },
            idProvincia: { required: true },
            idComuna: { required: true },
            emailEmergencia: { email: true },
            
            // Educacion Validaciones
            nivel                 : { required : function(element){ return $("#nivelEducacion").val() >= 2; } },
			carrera               : { required : function(element){  if($("#nivelEducacion").val() >= 2 || $("#nivel").val() >= 1){return false}    } },
			instituciones         : { required : function(element){  if($("#nivelEducacion").val() >= 3 || $("#nivel").val() >= 1){return false}    } },
			nombreInstitucion     : { required : function(element){  if($("#nivelEducacion").val() >= 3 || $("#nivel").val() >= 1){return false}    } },
			fechaDesdeInstitucion : { required : function(element){  if($("#nivelEducacion").val() >= 3 || $("#nivel").val() >= 1){return false}    } },

        },
        messages: {
            rut: { required: 'requerido' },
            rutTemporal: { required: 'requerido' },
            pasaporte: { required: 'requerido' },
            nombre: { required: 'requerido' },
            apellidoPaterno: { required: 'requerido' },
            fNacimiento: { required: 'requerido' },
            idGenero: { required: 'requerido' },
            idNacionalidad: { required: 'requerido' },
            idEstadoCivil: { required: 'requerido' },
            telefono: { required: 'requerido' },
            celular: { required: 'requerido' },
            email: { required: 'requerido', email: 'Inserte un email valido' },
            direccion: { required: 'requerido' },
            idRegion: { required: 'requerido' },
            idProvincia: { required: 'requerido' },
            idComuna: { required: 'requerido' },
            emailEmergencia: { required: 'requerido', email: 'Inserte un email Valido' },
            // Educacion Validaciones
            nivel: { required: 'requerido' },
            carrera: { required: 'requerido' },
            instituciones: { required: 'requerido' },
            nombreInstitucion: { required: 'requerido' },
            fechaDesdeInstitucion: { required: 'requerido' },
        },
        errorPlacement: function (error, element) {
            if (element.parent(".input-group").size() > 0) {
                error.insertAfter(element.parent(".input-group"));
            } else {
                error.insertAfter(element)
            }
        },
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        success: function (label) {
            label.closest('.form-group').removeClass('has-error');
        }
    });


    frmvalid2.validate({
        errorElement: 'span',
        errorClass: 'help-block help-block-error',
        focusInvalid: true,
        rules: {
            tipoTrabajador: { required: true },
            idTurno: { required: false },
            cargo: { required: true },
            posicion: { required: false },
            sociedad: { required: true },
            idHuerto: { required: true },
            idZona: { required: true },
            idCECO: { required: true },
            fecha_inicio_actividad: { required: true },
            fecha_termino_actividad: { required: function (element) { return $("#tipoContrato").find("option:selected").text() == 'Plazo Fijo' },
            						   required: "#finiquitado:checked" },
            fechaIngresoCompania: { required: false },
            hrs_semanal: { required: true },
            tipoContrato: { required: true },
            sueldo_mensual: { required: true },
            colacionFija: { required: "#valorFijo:checked" },
            movilizacionFija: { required: "#valorFijo:checked" },

            // Salud
            idIsapre: { required: true },
            idMonedaPlan: { required: function (element) { return $("#idIsapre").val() != 13; } },
            valorPlan: { required: function (element) { return $("#idIsapre").val() != 13; } },

            // AFP
            idAFP: { required: true },
            idMonedaAFP: { required: false },
            valorAFP: { required: false },
            
            //Adicional AFP Ahorro AFP
            idAdicionalAFP: { required: true },
            idMonedaAdicionalAFP: { required: true },
            valorAdicionalAFP: { required: true },
            
            // APV
            idMonedaAPV: { required: function (element) { return $("#institucionAPV").val() >= 1; } },
            valorDepositoAPV: { required: function (element) { return $("#institucionAPV").val() >= 1; } },
            valorAPV: { required: function (element) { return $("#institucionAPV").val() >= 1; } },
            nContrato: { required: function (element) { return $("#institucionAPV").val() >= 1; } },

            // Discapacidad
            nCredencial: { required: '#capacidades:checked' },
            fechaReevaluacion: { required: '#capacidades:checked' },
            gradoDiscapacidad: { required: '#capacidades:checked' },
            porcentajeDiscapacidad: { required: '#capacidades:checked' },
            causaDiscapacidad: { required: '#capacidades:checked' },
            movilidadReducida: { required: '#capacidades:checked' },
            
            //Contrato
            articuloTerminoContrato : { required: "#finiquitado:checked" },
            incisoTerminoContrato : { required: "#finiquitado:checked" },
            letraTerminoContrato : { required: "#finiquitado:checked" },
            descripcion : { required: "#finiquitado:checked" },
            fechaNotificacion : { required: "#finiquitado:checked" },
            fechaPago : { required: "#finiquitado:checked" },
            lugarPago : { required: "#finiquitado:checked" },
            horaPago : { required: "#finiquitado:checked" },
            horaPago2 : { required: "#finiquitado:checked" }


        },
        messages: {
            tipoTrabajador: { required: 'requerido' },
            idTurno: { required: 'requerido' },
            cargo: { required: 'requerido' },
            posicion: { required: 'requerido' },
            sociedad: { required: 'requerido' },
            idHuerto: { required: 'requerido' },
            idZona: { required: 'requerido' },
            idCECO: { required: 'requerido' },
            fecha_inicio_actividad: { required: 'requerido' },
            fecha_termino_actividad: { required: 'requerido' },
            fechaIngresoCompania: { required: 'requerido' },
            hrs_semanal: { required: 'requerido' },
            tipoContrato: { required: 'requerido' },
            sueldo_mensual: { required: 'requerido' },
            colacionFija: { required: 'requerido' },
            movilizacionFija: { required: 'requerido' },

            // AFP
            idAFP: { required: 'requerido' },
            idMonedaAFP: { required: 'requerido' },
            valorAFP: { required: 'requerido' },
            // Salud
            idIsapre: { required: 'requerido' },
            idMonedaPlan: { required: 'requerido' },
            valorPlan: { required: 'requerido' },
            
            //AFP Adicional
            idAdicionalAFP: { required: 'requerido' },
            idMonedaAdicionalAFP: { required: 'requerido' },
            valorAdicionalAFP: { required: 'requerido' },

            // APV
            idMonedaAPV: { required: 'requerido' },
            valorDepositoAPV: { required: 'requerido' },
            valorAPV: { required: 'requerido' },
            nContrato: { required: 'requerido' },

            // Discapacidad
            nCredencial: { required: 'requerido' },
            fechaReevaluacion: { required: 'requerido' },
            gradoDiscapacidad: { required: 'requerido' },
            porcentajeDiscapacidad: { required: 'requerido' },
            causaDiscapacidad: { required: 'requerido' },
            movilidadReducida: { required: 'requerido' },
            
          //Contrato
            articuloTerminoContrato : { required: 'requerido' },
            incisoTerminoContrato : { required: 'requerido' },
            letraTerminoContrato : { required: 'requerido' },
            descripcion : { required: 'requerido' },
            fechaNotificacion : { required: 'requerido' },
            fechaPago : { required: 'requerido' },
            lugarPago : { required: 'requerido' },
            horaPago : { required: 'requerido' },
            horaPago2 : { required: 'requerido' }

        },
        errorPlacement: function (error, element) {
            if (element.parent(".input-group").size() > 0) {
                error.insertAfter(element.parent(".input-group"));
            } else {
                error.insertAfter(element)
            }
        },
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        success: function (label) {
            label.closest('.form-group').removeClass('has-error');
        }
    });

    if (frmvalid.valid()) {
        if (frmvalid2.valid()) {
            return true;
        }
    }

    return false;
}

// Salvar Cambios
$(document).on('click', '.btn_save', function (event) {
    event.preventDefault();

    console.log("mostrar loading")
    $("#loading").show();
    
    setTimeout(function(){
    	console.log("salvar cambios")
    	salvarCambios();
    },500);
    
    //$("#loading").hide();

});


async function salvarCambios(){
	
	 $('.charCloseX').hide();
	    
	    var valido = validarForm();

	    if (valido == false) {
	    	console.log("falta rellenar campos");
	    	setTimeout(function(){
	        	$("#loading").hide();
	        },500);
	    	return false;
	    	
	    }

	    console.log("paso exitoso");
	    var id = getINFO().id;

	    var div_info = $(document).find('.row_data');
	    var div_infoInstitucion = $(document).find('.row_dataInstitucion');
	    var div_infoCuenta = $(document).find('.row_dataCuenta');
	    var div_infoLaboral = $(document).find('.row_dataLaboral');
	    var div_infoCalculo = $(document).find('.row_dataCalculo');
	    var div_infoDiscapacidad = $(document).find('.row_dataDiscapacidad');

	    // Escondes botones de Salvado y Cancelar
	    $(document).find('.btn_save').hide();
	    $(document).find('.btn_cancel').hide();

	    // Mostrar Boton de Editar
	    $(document).find('.btn_edit').show();

	    // Hacer toda la fila Editable
	    div_info.find('.row_data')
	        .attr('edit_type', 'click')
	        .removeAttr('contenteditable')
	        .removeClass('bg-warning')
	        .css('padding', '')
	        .attr('readonly', true)
	        .attr('disabled', 'disabled')

	    div_infoInstitucion.find('.row_dataInstitucion, .row_dataCuenta, .row_dataLaboral')
	        .attr('edit_type', 'click')
	        .removeAttr('contenteditable')
	        .removeClass('bg-warning')
	        .css('padding', '')
	        .attr('readonly', true)

	    $(document).find('.money').css('padding-left', '');

	    // Obtener Datos de Trabajador de los Inputs
	    var arr = $(document).find('.row_data').getObjectByInputs();

	    // Obtener Datos de Trabajador Laboral
	    var arrLaboral = $(document).find('.row_dataLaboral').getObjectByInputs();

	    // Obtener Datos de Discapacidad del Trabajador
	    var arrDiscapacidad = $(document).find('.row_dataDiscapacidad').getObjectByInputs();
	    
	    var arrConducir = $(document).find('.row_dataConducir').getObjectByInputs();
	    
	    var arrQuimicos = $(document).find('.row_dataQuimicos').getObjectByInputs();
	    
	    var arrMaternal = $(document).find('.row_dataLicenciaMaternal').getObjectByInputs();

	    // Obtener Datos de Institucion del Trabajador
	    var arrInstitucion = $(document).find('.row_dataInstitucion').getObjectByInputs();

	    // Obtener Datos para Calculo del Trabajador
	    var arrCalculo = $(document).find('.row_dataCalculo').getObjectByInputs();

	    // Obtener Datos de Cuentas Bancarias
	    var arrCuenta = {};
	    var listaCuenta = [];
	    debugger;
	    var cuenta1 = {
	        idCuentaBancaria: $('#i1').attr('idcuentabancaria'),
	        cuentaPrimaria: $('#i1').val(),
	        idTrabajador: id,
	        idTipoCuenta: $('#idTipoCuenta1').val(),
	        nCuenta: $('#nCuenta1').val(),
	        idBanco: $('#idBanco1').val() == "Seleccione..." ? "0" : $('#idBanco1').val(),
	        codigoTrabajador: $('#codigo').html()
	    }

	    var cuenta2 = {
	        idCuentaBancaria: $('#i2').attr('idcuentabancaria'),
	        cuentaPrimaria: $('#i2').val(),
	        idTrabajador: id,
	        idTipoCuenta: $('#idTipoCuenta2').val(),
	        nCuenta: $('#nCuenta2').val(),
	        idBanco: $('#idBanco2').val() == "Seleccione..." ? "0" : $('#idBanco2').val(),
	        codigoTrabajador: $('#codigo').html()
	    }

	    listaCuenta.push(cuenta1);
	    listaCuenta.push(cuenta2);

	    let rolPrivado;
	    
	    //rolPrivado
	    if($("#rolPrivado").is(":checked")){
	    	rolPrivado = "1"
	    }else{
	    	rolPrivado = "0"
	    }
	    
	    // Merge data (Insertar id del Trabajador en el JSON, )
	    if($("#rolPrivado").is(":hidden")){
	    	rolPrivado = trabajadorGlobal.rolPrivado;
	    }
	    
	    $.extend(arr, { id: id }, {rolPrivado : rolPrivado});
	    $.extend(arrInstitucion, { id: id });
	    $.extend(contratoGlobal, arrLaboral);

	    addnewWorker(arr);
	    addnewWorkerInstitucion(arrInstitucion);
	    debugger;
	    addnewWorkerCuenta(listaCuenta);
	    addnewWorkerLaboral(contratoGlobal);
	    addnewWorkerDiscapacidad(arrDiscapacidad);
	    addnewWorkerLicenciaConducir(arrConducir);
	    addnewWorkerLicenciaQuimicos(arrQuimicos);
	    //addnewWorkerLicenciaMaternal(arrMaternal);
	    


	    // Agregar Datos en la Tabla Periodo
	    addnewWorkerCalculo(arrCalculo);
	    addnewWorkerAnexoContrato(contratoGlobal);

	    // Cargar Eventos
	    setLogicEventInputs();
	
	
}



function addnewWorkerLicenciaConducir(arrConducir){

	let trabajador = $(this).getJSONSync('/simpleWeb/json/work/getCodigoByIdTrabajador/' + getINFO().id);
	
	let conducir = $(this).getJSONSync('/simpleWeb/json/work/getTrabajadorLicenciaConducirByIdTrabajador/' + trabajador);
	
	$.extend(conducir , arrConducir, {idTrabajador:trabajador});
	
	$(this).setJSONSync('/simpleWeb/json/work/updateTrabajadorLicenciaConducir/', conducir);
	
}

function addnewWorkerLicenciaQuimicos(arrQuimicos){
	let trabajador = $(this).getJSONSync('/simpleWeb/json/work/getCodigoByIdTrabajador/' + getINFO().id);
	let quimicos = $(this).getJSONSync('/simpleWeb/json/work/getTrabajadorLicenciaAplicadorByIdTrabajador/' + trabajador);
	$.extend(quimicos , arrQuimicos, {idTrabajador:trabajador});
	$(this).setJSONSync('/simpleWeb/json/work/updateTrabajadorLicenciaAplicador/', quimicos);
}

//TODO: Reparar Servicios de UPDATE e INSERT sw_r_trabajadoresLicenciaMaternal
function addnewWorkerLicenciaMternal(arrMaternal){
	
	let trabajador = $(this).getJSONSync('/simpleWeb/json/work/getCodigoByIdTrabajador/' + getINFO().id);
	
	let maternal = $(this).getJSONSync('/simpleWeb/json/work/getTrabajadorLicenciaMaternalByIdTrabajador/' + trabajador);
	
	$.extend(maternal , arrMaternal, {idTrabajador:trabajador});
	
	$(this).setJSONSync('/simpleWeb/json/work/updateTrabajadorLicenciaMaternal/', maternal);
	
}

//TODO: Verificar Servicios de Trabajadores Discapacitados
function addnewWorkerDiscapacidad(arrDiscapacidad) {

    var discapacidad;

    // Obtener ultimo datos Discapacidad
    $.ajax({
        url: "/simpleWeb/json/work/getLastDiscapacidadByIdTrabajadores/" + getINFO().id,
        type: "GET",
        async: false,
        success: function (data) {
            discapacidad = data;
        }

    });


    $.extend(discapacidad, arrDiscapacidad);

    // Insertar datos Discapacidad
    $.ajax({
        url: "/simpleWeb/json/work/updateDiscapacidad/",
        type: "PUT",
        async: false,
        data: JSON.stringify(discapacidad),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-Type", "application/json");
        },
        success: function () {

        }

    });

}

// Modificar Calculo a la tabla sw_r_trabajadorPeriodo
function addnewWorkerCalculo(arrCalculoNew) {

    // Viejos valores de Calculo para AFP, Salud, Seguro, y etc.
    var arrCalculoOld = $(document).find('.row_dataCalculo').getPreviousObjectByInputs();

    // Obtener fecha actual
    var today = new Date();

    // Obtener Datos de la tabla Periodo_Trabajador
    var TrabajadorPeriodo = $(this).getJSONSync("/simpleWeb/json/work/getTrabajadorPeriodoByIdTrabajadorAndPeriodo/" + getINFO().id + "," + updateBack + "-01").pop();

    // Merge de nuevos Datos
    $.extend(TrabajadorPeriodo, arrCalculoNew);

    // Si el trabajador tiene periodo actualizar
    if (insertPeriod == false) {

        // Si es undefined o NULL No Guardar
        if (TrabajadorPeriodo == null) { return; }

        // Actualizar
        $(this).setJSONSync("/simpleWeb/json/work/updateTrabajadorPeriodo/", TrabajadorPeriodo);
    }
    // Sino Insertar datos en un nuevo periodo
    else {
        TrabajadorPeriodo = {};
        $.extend(TrabajadorPeriodo, arrCalculoNew);

        TrabajadorPeriodo.fechaBack = $.datepicker.formatDate('yy-mm-dd', new Date());
        TrabajadorPeriodo.idTrabajador = getINFO().id;
        TrabajadorPeriodo.periodo = updateBack;
        TrabajadorPeriodo.periodoTrabajador = updateBack + "-01";

        // Insertar TrabajadorPeriodo
        $(this).setJSONSync("/simpleWeb/json/work/insertTrabajadorPeriodo/", TrabajadorPeriodo);

    }

}

// Modificar Anexo de Contrato TODO:
function addnewWorkerAnexoContrato(arrAnexoContratoNew) {

    // Obtener Datos de la tabla sw_r_anexoContrato
    var anexoContrato = $(this).getJSONSync("/simpleWeb/json/work/getAnexoContratoByIdTrabajadorAndPeriodo/" + getINFO().id + "," + updateBack + "-01").pop();

    // Merge de nuevos Datos
    $.extend(anexoContrato, arrAnexoContratoNew);

    // Si el trabajador tiene anexo de Contrato Actualizar
    if (insertPeriodContract == false) {

        // Si es undefined o NULL No Guardar
        if (anexoContrato == null) { return; }

        // Actualizar Anexo de Contrato
        $(this).setJSONSync("/simpleWeb/json/work/updateAnexoContrato/", anexoContrato);
    }
    // Sino Insertar Nuevo Anexo de Contrato
    else {
        anexoContrato = {};
        $.extend(anexoContrato, arrAnexoContratoNew);

        anexoContrato.fechaCreacion = $.datepicker.formatDate('yy-mm-dd', new Date());
        anexoContrato.idTrabajador = getINFO().id;
        anexoContrato.periodo = updateBack + "-01";

        // Insertar Anexo de Contrato
        $(this).setJSONSync("/simpleWeb/json/work/insertAnexoContrato/", anexoContrato);

    }

}



function addnewWorkerInstitucion(arrInstitucion) {

    // Obtener Datos Academicos por Id Trabajador
    var academicos;
    $.ajax({
        async: false,
        dataType: 'json',
        url: "/simpleWeb/json/work/getAcademicosByIdTrabajador/" + getINFO().id,
        success: function (data) {
            academicos = data;
        },
        error: function (ex) {
            alerta("Error, No se encuentra el Trabajador: " + ex);
        }
    });


    $.extend(academicos, arrInstitucion, { idTrabajador: getINFO().id });

    // Modificar datos Academicos
    $.ajax({
        url: "/simpleWeb/json/work/updateAcademicos/",
        async: false,
        type: "PUT",
        data: JSON.stringify(academicos),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-Type", "application/json");
        },
        success: function () {

        }

    });

}


function addnewWorkerLaboral(arrLaboral) {

	// Modificar datos de Laboral
    $.ajax({
        url: "/simpleWeb/json/work/updateContratoTrabajador/",
        type: "PUT",
        async: false,
        data: JSON.stringify(arrLaboral),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-Type", "application/json");
        },
        success: function () {

        }

    });

}

function addnewWorkerCuenta(listaCuenta) {
debugger;
    $.each(listaCuenta, function (key, value) {

        // Si tiene cuenta Bancaria
        if (value.idCuentaBancaria != null) {

            // Enviar cuentas Bancarias al servicio
            $.ajax({
                url: "/simpleWeb/json/work/updateCuentaBancaria/",
                type: "PUT",
                async: false,
                data: JSON.stringify(value),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Accept", "application/json");
                    xhr.setRequestHeader("Content-Type", "application/json");
                },
                success: function () {

                }

            });

        }
        else {

            // Enviar cuentas Bancarias al servicio
            $.ajax({
                url: "/simpleWeb/json/work/updateOrInsertCuentaBancaria/",
                type: "PUT",
                async: false,
                data: JSON.stringify(value),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Accept", "application/json");
                    xhr.setRequestHeader("Content-Type", "application/json");
                },
                success: function () {

                }

            });

        }

    });

}


// Envio de Datos
function addnewWorker(arr) {

    if (arr == "addnewWorker") {

        // Obtener Trabajador Rut
        var trabajadorRut;
        $.ajax({
            async: false,
            type: "GET",
            dataType: 'json',
            url: "/simpleWeb/json/work/getTrabajadorByRut/" + rutW,
            success: function (data) {
                trabajadorRut = data.rut;
            },
            error: function (ex) {
                console.log(ex);
            }
        });

        if (trabajadorRut == rutW) {
            alert("El trabajador con el rut " + rutW + " ya existe, o se encuentra dentro de nuestros registros");
            $("#rutWorker").val("");
            return;
        }

    }

    // Validar campos Requeridos
    var validate = true;
    var adwork = document.getElementsByName("adwork");
    var hasDiv = document.getElementsByName("hasDiv");

    for (var i = 0; i < adwork.length; i++) {
        if ($(adwork[i]).val() == "") {
            $(adwork[i]).focus();
            $(hasDiv[i]).addClass("has-error");
            validate = false;
            $(document).find('.btn_edit').hide();
            $(document).find('.btn_save').show();
            $(document).find('.c').show();

            return;
        }
    }

    // Si todos los campos requeridos estan llenados
    if (validate == true) {

        // Obtener Trabajador
        var trabajador;
        $.ajax({
            async: false,
            type: "GET",
            dataType: 'json',
            url: "/simpleWeb/json/work/getTrabajadorById/" + getINFO().id,
            success: function (data) {
                trabajador = data;
            },
            error: function (ex) {
                console.log(ex);
            }
        });

        // Unir viejos datos de trabajador con datos por actualizar
        $.extend(trabajador, arr);

        // Enviar trabajador al servicio
        $.ajax({
            url: "/simpleWeb/json/work/updateTrabajador/",
            async: false,
            type: "PUT",
            data: JSON.stringify(trabajador),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function () {

            }

        });


        swal({title:'Trabajador Actualizado con Exito',
        	 allowOutsideClick: false}).then(function (result) {
            if (result.value) {

                var div_info = $(document).find('.row_data');
                var div_infoInstitucion = $(document).find('.row_dataInstitucion');
                var div_infoCuenta = $(document).find('.row_dataCuenta');
                var div_infoLaboral = $(document).find('.row_dataLaboral');
                var div_infoDiscapacidad = $(document).find('.row_dataDiscapacidad');

                $('#fNacimiento, #idNacionalidad, #idEstadoCivil, #idGenero').prop('disabled', true);
                $('#idRegion, #idProvincia, #idComuna').prop('disabled', true);
                $('#i1, #i2, #idBanco1, #idBanco2, #idTipoCuenta1, #idTipoCuenta2').prop('disabled', true);

                // Laborales
                $(document).find('.row_dataLaboral')
                    .attr('contenteditable', 'true')
                    .attr('edit_type', 'button')
                    .addClass('bg-warning')
                    .css('padding', '0px')
                    .attr('readonly', false)
                    .css('background-color', '')

                // $(document).find('.fa-usd').show();

                $('#fechaAfiliacionAFP, #fechaIngreso, #fechaIngresoCompania, #fIngresoCompContrato, #fechaTermino, #fechaReevaluacion').prop('readonly', true);

                // Desahabilitar Select Laborales
                $('#idAFP, #idAdicionalAFP, #idIsapre, #idMoneda, #capacidades, #subsidio, #mayor11Anos, #idTurno, #cargo').prop('disabled', true);
                $('#posicion, #pensionados, #sCesantia, #fechaAfiliacionAFP, #valorFijo').prop('disabled', true);

                $(document).find('.btn_save, .btn_cancel').hide();

                $(document).find('.btn_edit').show();

                // make the whole row editable
                $(document).find('.row_data, .row_dataInstitucion, .row_dataDiscapacidad, .row_dataMaternal, .row_dataConducir, .row_dataQuimicos')
                    .attr('edit_type', 'click')
                    .removeAttr('contenteditable')
                    .removeClass('bg-warning')
                    .css('padding', '')
                    .attr('readonly', true)
                    .attr('disabled', 'disabled')
                    .css('background-color', '')

                $(document).find('.row_dataCuenta, .row_dataLaboral')
                    .attr('edit_type', 'click')
                    .removeAttr('contenteditable')
                    .removeClass('bg-warning')
                    .css('padding', '')
                    .attr('readonly', true)
                    .css('background-color', '')

                $(document).find('.money').css('padding-left', '0px');

                location.reload();
                
                //loadTrabajador();
                
                

            };
        });


    }// If validate = true


}


function searchByName(name){
	debugger;
	// Obtener Id del Trabajador por Codigo
	let trabajadorName = $(this).getJSONSync("/simpleWeb/json/work/getAllTrabajadorWithFilter/?_byNombreCompleto=" + name);

	 if ((name == "")) {
		 alerta("Campo Vacio");
		 return false;
	 }
	
    //Si no se encuentra trabajador
    if ((trabajadorName.length <= 0)) {
    	alerta("No se Encuentra Trabajador");
        return;
    }
    
    if(trabajadorName.length >= 2){
    	 swal({
    		 html: '<table class="table table-bordered table-hover table-condensed" id="searchByNameResult">'+
    		 	 '<thead>'+
    		 	 '<tr>'+
    		 	 '<th style="min-width: 100px;">Codigo</th>'+
    			 '<th style="min-width: 150px;">Nombre</th>'+
    			 '<th style="min-width: 150px;">Apellido Paterno</th>'+
    			 '<th style="min-width: 150px;">Apellido Materno</th>'+
    			 '<th style="min-width: 100px;">Opciones</th>'+
    			 '</tr>'+
    			 '</thead>'+
    			 '</table>',
             title: 'Se encontro mas de un resultado:',
             showCancelButton: true,
             cancelButtonColor: '#d33',
             showConfirmButton: false,
             width: 700,
             onOpen : function(val){
            	 debugger;
            	 $('#searchByNameResult').dataTable( {
            		 data : trabajadorName,
                     columns: [
                         {"data" : "codigo"},
                         {"data" : "nombre"},
                         {"data" : "apellidoPaterno"},
                         {"data" : "apellidoMaterno"},
                         {"data" : "id"}
                     ],columnDefs: [
                                    {
                                    	"targets": [-1],
                                    	"render": function (value, type, full, meta) {
                                    		return '<a class="btn btn-circle blue btn-outline btn-xs" onclick="hasPrivilage('+value+')" ><i class="fa fa-search"></i></a>';
                                    	}
                                    },      
                                    ]
            	 });
             }
         }).then(function (result) {        	 
        	alerta("Seleccione"); 
         });
    }else{
    	//Si el Trabajador tienes acceso a ese huerto 
        if((huertoPrivilege.has(trabajadorName[0].idHuerto) == true)){
        	window.location.href = ("detalleTrabajador?id=" + trabajadorName[0].id); 
        }else{
        	alerta("No tiene privilegios para ver a este Trabajador");
       	 	return;
        }
    }
}

function hasPrivilage(id){
	let trabajador   = $(this).getJSONSync("/simpleWeb/json/work/getTrabajadorById/" + id);
	
	 if((huertoPrivilege.has(trabajador.idHuerto) == true)){
     	window.location.href = ("detalleTrabajador?id=" + id); 
     }else{
     	alerta("No tiene privilegios para ver a este Trabajador");
    	 	return;
     }
}



function getId() {
    var location = document.location.href;
    if (location.indexOf('?') > 0) {
        var getString = location.split('?')[1];
        var GET = getString.split('&');
        var get = {};
        for (var i = 0, l = GET.length; i < l; i++) {
            var tmp = GET[i].split('=');
            get[tmp[0]] = unescape(decodeURI(tmp[1]));
        }
        return get;
    }
}

function justNumbers(e) {
    var keynum = window.event ? window.event.keyCode : e.which;
    if ((keynum == 8) || (keynum == 46) || (keynum == 44)) {
        return true;
    }
    return /\d/.test(String.fromCharCode(keynum));
}

function justNumbers3(e) {
    var keynum = window.event ? window.event.keyCode : e.which;
    if ((keynum == 8) || (keynum == 46) || (keynum == 44) || (keynum == 45)) {
        return true;
    }
    return /\d/.test(String.fromCharCode(keynum));
}

function onBlurEroor(input) {
    $("#" + input.id).addClass("has-success");
}

function justNumbers2(e) {
    var keynum = window.event ? window.event.keyCode : e.which;
    if ((keynum == 8)) {
        return true;
    }
    return /\d/.test(String.fromCharCode(keynum));
}


// Funciones de AddWorker


// Tabla dinamica con Filtros para Movimientos
async function datatableMovimientos() {

	//Obtener id del Trabajador
	idTrabajadorGlobal = getINFO().id;
	
	// Obtener Trabajador
    trabajadorGlobal = await $.getJSON("/simpleWeb/json/work/getTrabajadorById/"+ idTrabajadorGlobal);
 
    //Obtener codigo del Trabajador
    codigoTrabajadorGlobal = trabajadorGlobal.codigo;

    // Traer Movimientos del Trabajador
    let trabajadorMovimientos = await $.getJSON("/simpleWeb/json/work/getAllContratoWithFilter/?EstadoContrato=0&codigo_trabajador="+ codigoTrabajadorGlobal );
    
    console.log(trabajadorMovimientos);
    
    let grid = new Datatable();
    grid.init({
        src: $("#datatableMovimientos"),
        loadingMessage: 'Loading...',
        dataTable: {
            "data": trabajadorMovimientos,
            "columns": [
                { "data": "id_sociedad" },
                { "data": "fecha_inicio_actividad" },
                { "data": "fecha_termino_actividad" },
                { "data": "estado_contrato" },
                { "data": "cargo" },
                { "data": "tipoContrato" },
                { "data": "fechaNotificacion" },
                { "data": "articuloTerminoContrato" },
                { "data": "incisoTerminoContrato" },
                { "data": "letraTerminoContrato" },
                { "data": "fechaPago" },
                { "data": "lugarPago" },
                { "data": "horaPago" },
                { "data": "horaPago2" },
                { "data": "descripcion" }
            ],
            "columnDefs": [
                {
                	"targets": [-1],
                	"render": function (value){
                		return "";
                	}
                },           
                {
                    "targets": [0],
                    "render": function (value, type, full, meta) {
                    	$.getJSON("/simpleWeb/json/work/getSociedadById/" + value).success(function(data){
                    		let currentCell = $("#"+"datatableMovimientos").DataTable().cells({"row":meta.row, "column":meta.col}).nodes(0);
                    		$(currentCell).text(data.denominacionSociedad);
                    	});
                    	return "";
                    }
                },
                {
                	"targets": [1,2,6,10],
                    "render": function (value) {
                    	return changeDateformatDDMMYY(value);
                    }
                },
                {
					"targets" : [ 3 ],
					"render" : function(value) {
						return value == 1 ? "Activo" : "Inactivo"
					}
				},
				{
                    "targets": [4],
                    "render": function (value, type, full, meta) {
                    	$.getJSON("/simpleWeb/json/work/cargos/getCargoById/" + value).success(function(data){
                    		let currentCell = $("#"+"datatableMovimientos").DataTable().cells({"row":meta.row, "column":meta.col}).nodes(0);
                    		$(currentCell).text(data.cargos);
                    	});
                    	return "";
                    }
                },
                {
                    "targets": [5],
                    "render": function (value, type, full, meta) {
                    	$.getJSON("/simpleWeb/json/work/getParametrosByCodigoAndLlave/TIPO_CONTRATO," + value).success(function(data){
                    		let currentCell = $("#"+"datatableMovimientos").DataTable().cells({"row":meta.row, "column":meta.col}).nodes(0);
                    		$(currentCell).text(data.descripcion);
                    	});
                    	return "";
                    }
                },
                {
                    "targets": [7],
                    "render": function (value, type, full, meta) {
                    	$.getJSON("/simpleWeb/json/work/getArticuloTerminoContratoByIdArticulo/" + value).success(function(data){
                    		let currentCell = $("#"+"datatableMovimientos").DataTable().cells({"row":meta.row, "column":meta.col}).nodes(0);
                    		$(currentCell).text(data.descripcion);
                    	});
                    	return "";
                    }
                },
                {
                    "targets": [8],
                    "render": function (value, type, full, meta) {
                    	$.getJSON("/simpleWeb/json/work/getIncisoTerminoContratoByIdInciso/" + value).success(function(data){
                    		let currentCell = $("#"+"datatableMovimientos").DataTable().cells({"row":meta.row, "column":meta.col}).nodes(0);
                    		$(currentCell).text(data.descripcion);
                    	});
                    	return "";
                    }
                },
                {
                    "targets": [9],
                    "render": function (value, type, full, meta) {
                    	$.getJSON("/simpleWeb/json/work/getLetraTerminoContratoByIdLetra/" + value).success(function(data){
                    		let currentCell = $("#"+"datatableMovimientos").DataTable().cells({"row":meta.row, "column":meta.col}).nodes(0);
                    		$(currentCell).text(data.descripcion == null ? "" : data.descripcion);
                    	});
                    	return "";
                    }
                },
                {
                    "targets": [12,13],
                    "render": function (value) {
                    	
                    	function tConvert2(time12h) {
							try{
							let timeString = time12h;
							let H = +timeString.substr(0, 2);
							let h = H % 12 || 12;
							let ampm = (H < 12 || H === 24) ? " AM" : " PM";
							return timeString = h + timeString.substr(2, 3) + ampm;
							}catch(e){
								return "";
							}
						}
                    	
                    	return tConvert2(value);
                    }
                }
            ]
        }
    });

    $('#datatableMovimientos').dataTable().fnDestroy();
	
	
	$('#datatableMovimientos').DataTable({
		"searching" : true,
		"ordering" : false,
		"paging" : true,
		"info" : false,
		"scrollX": true,
		"scrollY": "300px",
	}).draw();
    
    
}


// Tabla Dinamica con Filtros

//Obtener Celda
var getCurrentCell = function(datatable, meta){
	let currentCell;
	currentCell = $("#"+datatable).DataTable().cells({"row":meta.row, "column":meta.col}).nodes(0);
	return currentCell;
}


// Que se muestre imagen de PDF
function generarContrato() {

    window.open('../assets/global/img/pruebaImagen.JPG', '_blank');

}

// logica de eventos para los inputs
function setLogicEventInputs() {

	//Evitar que la persona presione enter para enviar el formulario
	window.addEventListener("keypress", function(event){
	    if (event.keyCode == 13){
	        event.preventDefault();
	    }
	}, false);
	
    // Ocultar botones de Guardado y Salvar
    $(document).find('.btn_save, .btn_cancel').hide();

    // Fecha de Nacimiento
    $("#fNacimiento").datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,
        yearRange: "1930:+10",
        onSelect: function (value, ui) {
            var today = new Date(),
                age = today.getFullYear() - ui.selectedYear;
            age < 18 ? alerta('Persona menor a 18 años') : ""
        },
        maxDate: '0'
    });

    // Personales Fechas
    $(".dateWork:not(#fNacimiento)").datepicker({ dateFormat: 'dd-mm-yy', changeMonth: true, changeYear: true, yearRange: "1930:+10" });

    // Pre-Defaults:
    $('.checkboxOption').on('change', function () {
        this.value = this.checked ? 1 : 0;
    }).change();

    $('#idTipoCuenta1').on('change', function () {

        // Si es Servipag
        if ($(this).val() == 12) {
            $('#idBanco1, #nCuenta1').prop('disabled', true).val('');
            $('#idBanco1').val(33);
        }
        else {
            $('#idBanco1, #nCuenta1').prop('disabled', false);
        }

    }).change();

    $('#idTipoCuenta2').on('change', function () {

        // Si es Servipag
        if ($(this).val() == 12) {
            $('#idBanco2, #nCuenta2').prop('disabled', true).val('');
            $('#idBanco2').val(33);
        }
        else {
            $('#idBanco2, #nCuenta2').prop('disabled', false);
        }

    }).change();

    // Validaciones para Banco
    $('#idBanco1').on('change', function () {

        // Si es Servipag
        if ($(this).val() == 33) {
            $('#nCuenta1').prop('disabled', true).val('');
        }
        else {
            $('#nCuenta1').prop('disabled', false);
        }

    }).change();

    $('#idBanco2').on('change', function () {

        // Si es Servipag
        if ($(this).val() == 33) {
            $('#nCuenta2').prop('disabled', true).val('');
        }
        else {
            $('#nCuenta2').prop('disabled', false);
        }

    }).change();

    // Si el Tipo de Contrato es Diferente a Plazo Fijo no puede tener fecha fin
    // (1)
    $('#tipoContrato').on('change', function () {

        if ($(this).val() != 3) {
            $('#fechaTermino').datepicker('setDate', null);
            $('#fechaTermino').prop('disabled', true);
        }
        else {
            $('#fechaTermino').prop('disabled', false);
        }

    }).change();

    // Cambiar variable de Cuenta Bancaria
    $('#i1 ,#i2').on('click', function () {

        if ($('#i1').is(':checked')) {
            $('#i1').val(1);
            $('#i1').prop('checked', true);
        } else {
            $('#i1').val(0);
            $('#i1').prop('checked', false);
        }

        if ($('#i2').is(':checked')) {
            $('#i2').val(1);
            $('#i2').prop('checked', true);
        } else {
            $('#i2').val(0);
            $('#i2').prop('checked', false);
        }

    });

    // Si es Extranjero Ingresar Pasaporte y Rut Temporal
    $(document).bind('change load', '#idNacionalidad', function () {


        if ($('#idNacionalidad').find('option:selected').text() == "Chileno") {

            $(document).find('#pasaporte').closest('tr').removeClass('tr-display-table-row');
            $(document).find('#pasaporte').closest('tr').addClass('tr-display-none');

            $(document).find('#rutTemporal').closest('tr').removeClass('tr-display-table-row');
            $(document).find('#rutTemporal').closest('tr').addClass('tr-display-none');

            $('#pasaporte').val('');
            $('#rutTemporal').val('');

            $(document).find('.two, .seven').css('padding-top', '10%');

        }
        else {

            $(document).find('#pasaporte').closest('tr').addClass('tr-display-table-row');
            $(document).find('#pasaporte').closest('tr').removeClass('tr-display-none');

            $(document).find('#rutTemporal').closest('tr').addClass('tr-display-table-row');
            $(document).find('#rutTemporal').closest('tr').removeClass('tr-display-none');

            // $('#rutWorker').val('');

            $(document).find('.two, .seven').css('padding-top', '');

        }

    });

    // Si es discapacidato Llenar datos de Discapacitacion
    $('#capacidades').on('change', function () {

        this.value = this.checked ? 1 : 0;

        if (this.checked == true) {
            $(document).find('#nCredencial,#fechaReevaluacion,#gradoDiscapacidad,#porcentajeDiscapacidad,#causaDiscapacidad,#movilidadReducida').closest('tr').removeClass('tr-display-none');
            $(document).find('#nCredencial,#fechaReevaluacion,#gradoDiscapacidad,#porcentajeDiscapacidad,#causaDiscapacidad,#movilidadReducida').closest('tr').addClass('tr-display-table-row');
        } else {
            $(document).find('#nCredencial,#fechaReevaluacion,#gradoDiscapacidad,#porcentajeDiscapacidad,#causaDiscapacidad,#movilidadReducida').closest('tr').addClass('tr-display-none');
            $(document).find('#nCredencial,#fechaReevaluacion,#gradoDiscapacidad,#porcentajeDiscapacidad,#causaDiscapacidad,#movilidadReducida').closest('tr').removeClass('tr-display-table-row');

            $('.row_dataDiscapacidad').each(function (key, value) { $(value).val('') });

        }

    }).change();

    // Filtros para Nivel Academico del Trabajador
    $('#nivel').getOptionsBySelect(optionsNivel);
    $('#carrera').getOptionsBySelect(optionsCarrera);
    $('#instituciones').getOptionsBySelect(optionsInstituciones);
    $('#nombreInstitucion').getOptionsBySelect(optionsNombreInstitucion);

    $(document).on('change', '#nivelEducacion', function () {

        $('#nivel').empty().data('options');
        $('#carrera').empty().data('options');
        $('#instituciones').empty().data('options');
        $('#nombreInstitucion').empty().data('options');

        var optionNivel = [];
        var optionCarrera = [];
        var optionInstituciones = [];
        var optionNombreInstitucion = [];

        if (this.value == $('#nivelEducacion option:contains("Sin Escolaridad")').val()) {

            optionNivel = optionsNivel.slice(0, 1);
            optionCarrera = optionsCarrera.slice(0, 1);
            optionInstituciones = optionsInstituciones.slice(0, 1);
            optionNombreInstitucion = optionsNombreInstitucion.slice(0, 1);

        }
        else if (this.value == $('#nivelEducacion option:contains("Basica")').val()) {

            optionNivel = optionsNivel.slice(0, 3);
            optionCarrera = optionsCarrera;
            optionInstituciones = optionsInstituciones;
            optionNombreInstitucion = optionsNombreInstitucion;

        }
        else {
            optionNivel = optionsNivel;
            optionCarrera = optionsCarrera;
            optionInstituciones = optionsInstituciones;
            optionNombreInstitucion = optionsNombreInstitucion;
        }


        $('#nivel').setOptionsByArray(optionNivel);
        $('#carrera').setOptionsByArray(optionCarrera);
        $('#instituciones').setOptionsByArray(optionInstituciones);
        $('#nombreInstitucion').setOptionsByArray(optionNombreInstitucion);


    });

    // Seleccionar el Huerto y la Faena asociado a la empresa:
    $('#sociedad').change(function () {

    	//Limpiar Selects
        $('#idHuerto').children('option:not(:first)').remove();
        $('#idZona').children('option:not(:first)').remove();
        $('#idCECO').children('option:not(:first)').remove();
        
        let idSociedad = $('#sociedad').val();
        
        getFaenas(idSociedad);
        
        getCargos(idSociedad);
        
        getHuertos(idSociedad);
        
    });


    // Seleccionar la Zona en base al Huerto Seleccionado
    $('#idHuerto').change(function () {

        $('#idZona').children('option:not(:first)').remove();
        $('#idCECO').children('option:not(:first)').remove();

        let idHuerto = $('#idHuerto').val();
        
        getZonas(idHuerto);
        
    });

    //Seleccionar CECO en base a la Zona Seleccionada
    $('#idZona').change(function () {
    	//Limpiar CECOs del Select
        $('#idCECO').children('option:not(:first)').remove();
        //Obtener CECOS
        getCECOs();

    });

    // Colocar todos los select en mayusculas
    $(document).find('select').each(function (key, value) {
        $(value).addClass('mayusculasWork');
    });

    $(document).find('input').each(function (key, value) {
        $(value).addClass('text-uppercase');
    });

    //Poder Deseleccionar CheckBox de Cuenta Primaria
    var allRadios = document.getElementsByName('cuentaPrimaria');
    var booRadio;
    var x = 0;
    for (x = 0; x < allRadios.length; x++) {
        allRadios[x].onclick = function () {
            if (booRadio == this) {
                this.checked = false;
                booRadio = null;
            } else {
                booRadio = this;
            }
        };
    }
    
    // Collapse/Show Information
    cerrarModales();

    // Se coloco aqui para sobreescribir la validacion (1)
    $("#fechaTermino").prop("disabled", "disabled");

    // Colocar Inputs no editables por default
    $(document).find('form#actualizarTrabajadorForm :input, form#actualizarTrabajadorForm2 :input')
        .css('padding', '0px')
        .attr('readonly', true)
        .attr('disabled', true)

    // Colocar los checkbox editables para cerrar y abrir las opciones
    $(document).find('.checkboxCollapse').attr('disabled', false);

    //Boton de Buscar trabajador
    $("#buscarTrabajador").click(function () {

        swal({
            title: 'Buscar por Codigo Trabajador: ',
            input: 'number',
            showCancelButton: true,
            width: 400,
            cancelButtonColor: '#d33',
            inputPlaceholder: 'codigo trabajador',
            inputAttributes: {
                maxlength: 7,
            }
        }).then(function (result) {

            if (result.value > 0) {

                // Obtener Id del Trabajador por Codigo
                let idTrabajador = $(this).getJSONSync("/simpleWeb/json/work/getIdTrabajadorByCodigo/" + result.value);

                let trabajador   = $(this).getJSONSync("/simpleWeb/json/work/getTrabajadorById/" + idTrabajador);

              //Si no se encuentra trabajador
                if (idTrabajador == 0 || idTrabajador == null) {
                    alerta("No se Encuentra Trabajador");
                    return;

                }
                
              //Si el Trabajador tienes acceso a ese huerto 
                if(huertoPrivilege.has(trabajador.idHuerto) == true){
                	window.location.href = ("detalleTrabajador?id=" + idTrabajador);
                }else{
                	alerta("No tiene privilegios para ver a este Trabajador");
                }

                
            }

        });

    });

    //Eventos Carga Familiar
    $('#tipoCarga').change(function(){
    	
    	$(document).find('.row_dataFamiliarCalculo, .row_dataFamiliar').attr('disabled',false);
    	$('#montoFamiliar').attr('disabled', 'disabled');
    	
    	switch ($('#tipoCarga').find('option:selected').text()) {
		case "Solo Registro":{
			$(document).find('.row_dataFamiliarCalculo').attr('disabled','disabled').val('');
    		$(this).attr('disabled',false).val(1);
    		$('#montoFamiliar').val('');
		}
			break;
		case "Maternal":
			{
			$('#rutFamiliar').attr('disabled', 'disabled');
    		$('#fNacimientoFamiliar').attr('disabled', 'disabled').val('');
    		$('#parentesco option:contains("Hijo")').prop('selected',true).val('');
			}
			break;
		default:
			{
			$(document).find('.row_dataFamiliarCalculo').attr('disabled',false);
    		$('#rutFamiliar').attr('disabled', false);
    		$('#fNacimientoFamiliar').attr('disabled', false);
			}
			break;
		}
	
    });
    
    $('#tipoCarga2').change(function(){
    	
    	$(document).find('.row_dataFamiliarCalculoEdit, .row_dataFamiliarEdit').attr('disabled',false);
    	$('#montoFamiliar2').attr('disabled', 'disabled');
    	
    	switch ($('#tipoCarga2').find('option:selected').text()) {
		case "Solo Registro":{
			$(document).find('.row_dataFamiliarCalculoEdit').attr('disabled','disabled').val('');
    		$(this).attr('disabled',false).val(1);
    		$('#montoFamiliar2').val('');
		}
			break;
		case "Maternal":
			{
			$('#rutFamiliar2').attr('disabled', 'disabled').val('');
    		$('#fNacimientoFamiliar2').attr('disabled', 'disabled').val('');
    		$('#parentesco2 option:contains("Hijo")').prop('selected',true);
			}
			break;
		default:
			{
			$(document).find('.row_dataFamiliarCalculoEdit').attr('disabled',false);
    		$('#rutFamiliar2').attr('disabled', false);
    		$('#fNacimientoFamiliar2').attr('disabled', false);
			}
			break;
		}

    	
    });
    
    //TODO: Cambiar Formato moneda segun el tipo de moneda
	$('#idMonedaAVP, #idMonedaAFP, #idMonedaConvenido, #idMonedaPlan').change(function(element){
		
		let input;
		
		//Obtener el input que voy a cambiar Manual TODO: mejorar
		if($(this).attr('id') == 'idMonedaAVP'){
			input = '#valorDepositoAPV';
		}else if($(this).attr('id') == 'idMonedaAFP'){
			input = '#valorAFP';
		}else if($(this).attr('id') == 'idMonedaConvenido'){
			input = '#valorConvenido';
		}else if($(this).attr('id') == 'idMonedaPlan'){
			input = '#valorPlan';
		}
		
		if($(this).find("option:selected").text() == 'U.F.'){
			$(input).removeClass('moneyWork');
			$(input).addClass('UF');
			$(input).off("blur");
			$(input).off("keyup");
			 
			$(input).on({
				  "focus": function(event) {
				    $(event.target).select();
				  },
				  "keyup": function(event) {
				    $(event.target).val(function(index, value) {
				    	  return value.replace(/[^0-9\,]/g, "")
				        .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
				    });
				  }
				});
			 
			 $(input).addClass('moneyWork');
			 
		}
		else if($(this).find("option:selected").text() == 'Pesos'){
			$(input).addClass('moneyWork');
			$(input).removeClass('UF');
			$(input).off("focus");
			$(input).off("keyup");
			setFormatInputs();
		}
		
	});
	
	//Solo seleccionar un CHECK en pensionados, pesionadosCotizantes
	$('#pensionados, #pensionadosCotizantes , #mayor11Anos , #sCesantia').click(function(element){
		if($("#pensionados").is(':checked') || $("#pensionadosCotizantes").is(':checked')){
			$('#sCesantia').prop('checked', false).val(0);
			$('#sCesantia').attr('disabled', true);
		}else{
			$('#sCesantia').attr('disabled', false);
		}
		
	});
	
	//Bloquear Datos Academicos si el Trabajador es Sin Escolaridad
	$('#nivelEducacion').change(function(){
		if($('#nivelEducacion').find('option:selected').text() == "Sin Escolaridad"){
			$('#nivel, #carrera, #instituciones, #nombreInstitucion, #fechaDesdeInstitucion, #fechaHastaInstitucion').attr('disabled',true);	
		}else{
			$('#nivel, #carrera, #instituciones, #nombreInstitucion, #fechaDesdeInstitucion, #fechaHastaInstitucion').attr('disabled',false);
		}
	});
    
	$('#finiquitado').click(function(){

		if($(this).val() == 1){
			 let contratos = $(this).getJSONSync("/simpleWeb/json/work/getAllContratoWithFilter/?EstadoContrato=0&codigo_trabajador="+localStorage.getItem('codTrabajador'));
			 let ultimoContrato = contratos.slice(-1).pop();
			 
			 //Obtener datos del ultimo Contrato y Activar porque le Quitaron el Check de Finiquito
			 if(ultimoContrato != null){
				 contratoGlobal = ultimoContrato;
				 contratoGlobal.estado_contrato = 1;
			 }
			 else{
				 console.log("No se encuentra el Ultimo Contrato");
			 }
			 
			 $(document).find('.row_dataFiniquito').each(function (key, value) {
			        $(value).closest('tr').hide();
			    });
			 
		}
		
		if($(this).val() == 0){
			
			
		}
		
		
		
		
		 
	});
    

}
//FIN Logic Event Inputs

//Obtener Faenas y Llenar el Select
async function getFaenas(idSociedad){
	//Limpiar Select Faena
	$('#idFaena').children('option:not(:first)').remove();
	$('#idFaenaContrato').children('option:not(:first)').remove();
	//Obtener la faena 
	let faena = await $.getJSON("/simpleWeb/json/work/Faenas/getFaenaBySociedad/"+idSociedad);
	//Colocar datos de Faena en el Select
	$('#idFaena').setOptionsByArray(faena, "nombreFaena", "idFaena");
	$('#idFaenaContrato').setOptionsByArray(faena, "nombreFaena", "idFaena");
}

async function getCargos(idSociedad){
	//Limpiar Select Faena
	$('#cargo').children('option').remove();
	$('#cargo').append('<option value="" >Seleccione...</option>');
	let cargo = await $.getJSON("/simpleWeb/json/work/cargos/getCargoByIdSociedad/"+idSociedad);
	$('#cargo').setOptionsByArray(cargo, "cargos", "id_cargo");
}


//Obtener Huerto y Llenar el Select
async function getHuertos(idSociedad){
	 // Obtener Codigo de la Sociedad en base al Id:
    let sociedadSAP = await $.getJSON("/simpleWeb/json/work/getSociedadById/"+idSociedad);

    //Obtener los privilegios del Usuario de Sesion
    let queryString;
	if(huertoPrivilege == null){
		queryString = "";
	}else{
		queryString = JSON.stringify(huertoPrivilege).slice(1,-1);
	}
	
	//Obtener Huerto por la Sociedad
	let huerto = await $.getJSON("/simpleWeb/json/work/getCampoWithFilter/?"+"campo="+queryString+"&sociedad="+sociedadSAP.sociedad);

    // Llenar select de la Lista Huerto
    $('#idHuerto').setOptionsByArray(huerto, "descripcion", "campo");
    //Habilitar el Select
    $('#idHuerto').prop('disabled', false);
	
}

async function getZonas(idHuerto){
	
	// Obtener Zona por el Huerto
    let idZona = await $.getJSON("/simpleWeb/json/work/getCampoByCampo/"+idHuerto);

    // Llenar select de la Lista Zona
    $('#idZona').setOptionsByArray(idZona, "zona" , "grupo_ceco_work" );

    //Habilitar Select
    $('#idZona').prop('disabled', false);
	
}

async function getCECOs(){
	
	let CECOAgrupacion = ""
		$.each(SESION.campo, function(key, value){
			if(value.campo == $('#idHuerto').val()){
				CECOAgrupacion = value.cecos;
			} 
		});

    // Obtener CECO por la Zona
    let CECOSAP = await $.getJSON(IPSERVERSAP+"JSON_BAPI_COSTCENTER_GETLIST1.aspx?SOCIEDAD=" + $('#sociedad').val() + "&GRUPO=" + $('#idZona').val()+"&CECO="+CECOAgrupacion);
    let CECO = CECOSAP.COSTCENTERLIST;
 
    // Llenar select de la Lista de CECO    
    $.each(CECO, function(key, value) {
		$('#idCECO').append($('<option>').text(value.DESCRIPT + " | " + value.COSTCENTER).val(value.COSTCENTER));
	});
    
    //TODO:
    //Habilitar Select de CECO
    $('#idCECO').prop('disabled', false);
	
	
	
}

async function getExtranjero(nacionalidad){
	
	 if (nacionalidad == 9) {

         $(document).find('#pasaporte').closest('tr').removeClass('tr-display-table-row');
         $(document).find('#pasaporte').closest('tr').addClass('tr-display-none');

         $(document).find('#rutTemporal').closest('tr').removeClass('tr-display-table-row');
         $(document).find('#rutTemporal').closest('tr').addClass('tr-display-none');

         $('#pasaporte').val('');
         $('#rutTemporal').val('');

         $(document).find('.two, .seven').css('padding-top', '10%');

     }
     else {

         $(document).find('#pasaporte').closest('tr').addClass('tr-display-table-row');
         $(document).find('#pasaporte').closest('tr').removeClass('tr-display-none');

         $(document).find('#rutTemporal').closest('tr').addClass('tr-display-table-row');
         $(document).find('#rutTemporal').closest('tr').removeClass('tr-display-none');

         // $('#rutWorker').val('');

         $(document).find('.two, .seven').css('padding-top', '');

     }
	
	
}

// Agregar Elementos que modifican el estilo
function setStyleInView() {

    $('#actualizarTrabajadorForm').find('table').each(function (key, value) {
        $(value).addClass('col-md-12');
    });

    $('#actualizarTrabajadorForm').find('th').each(function (key, value) {
        $(value).addClass('col-md-3');
    });

    $('#actualizarTrabajadorForm').find('td').each(function (key, value) {
        $(value).addClass('col-md-9');
    });

    $('#actualizarTrabajadorForm2').find('table').each(function (key, value) {
        $(value).addClass('col-md-12');
    });

    $('#actualizarTrabajadorForm2').find('th').each(function (key, value) {
        $(value).addClass('col-md-3');
    });

    $('#actualizarTrabajadorForm2').find('td').each(function (key, value) {
        $(value).addClass('col-md-9');
    });

    $('#actualizarTrabajadorForm, #actualizarTrabajadorForm2').find('input[type="checkbox"], .desplegar-label').each(function (key, value) {
        $(value).css('float', 'right');
    });

}


// Collapse/Show Information
function cerrarModales() {

	$('#licenciaQuimicos').click(function () {
	    $(this).collapseInformation('.row_dataQuimicos');
	});
	
    $('#licenciaMaternal').click(function () {
        $(this).collapseInformation('.row_dataMaternal');
    });

    $('#licenciaConducir').click(function () {
        $(this).collapseInformation('.row_dataConducir');
    });

    $('#datosAcademicos').click(function () {
        $(this).collapseInformation('.row_dataInstitucion');
    });

    $('#datosEmergencia').click(function () {
        $(this).collapseInformation('.row_dataEmergencia');
    });

    $('#datosRecorrido').click(function () {
        $(this).collapseInformation('.row_dataRecorrido');
    });

    $('#informacionContacto').click(function () {
        $(this).collapseInformation('.row_dataContacto');
    });

    $('#cuentaPrimaria').click(function () {
        $(this).collapseInformation('.row_dataCuenta1');
    });

    $('#cuentaSecundaria').click(function () {
        $(this).collapseInformation('.row_dataCuenta2');
    });

    $('#apv').click(function () {
        $(this).collapseInformation('.row_dataAPV');
    });

    $('#convenido').click(function () {
        $(this).collapseInformation('.row_dataConvenido');
    });

    $('#ahorroAFP').click(function () {
        $(this).collapseInformation('.row_dataAhorroAFP');
    });

    $('#datosDireccion').click(function () {
        $(this).collapseInformation('.row_dataDireccion');
    });
    
    $('#finiquitado').click(function () {
        $(this).collapseInformation('.row_dataFiniquito');
    });
    
    $('#idIsapre').on('change',function(){
    	if(this.value == "13"){
    		$(".row_dataSalud").closest('tr').hide();	
    	}else{
    		$(".row_dataSalud").closest('tr').show();	
    	}
    });

}



// Fomatear Numero
function formatNumber(input) {

    if (input == '') {
        return '';
    } else {
        var number = parseFloat(input).toFixed(3);

        var numberVal = number.replace(".", ",");

        numberArray = new Array();
        numberArray = numberVal.split(',');

        entero = numberArray[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        let decimal = numberArray[1] == "000" ? "" : "," + numberArray[1];    
        
        return ("$" + entero + decimal);
    }

}


// Selectores
// Get Selector para Empresas TODO:
async function getSelector() {

    // Array de Parametros
    var param = new Array('SEXO', 'ISAPRE', 'PARENTESCO', 'NACIONALIDAD', 'ESTADO_CIVIL',
        'NIVEL_DE_EDUCACION', 'NIVEL', 'CARRERA_OFICIO', 'INSTITUCIONES', 'NOMBRE_INSTITUCION',
        'MONEDA_PLAN',
        'DIVISION_PERSONAL', 'SUBDIVISION_PERSONAL', 'GRUPO', 'SUBGRUPO', 'TIPO_CONTRATO', 'TIPO_TRABAJADOR',
        'GRADO_DISCAPACIDAD', 'CAUSA_DISCAPACIDAD', 'MOVILIDAD_REDUCIDA', 'MES', 'ETNIA', 'AFP', 'TIPO_LICENCIA_CONDUCIR', 'TRAMO', 'TIPO_CARGA', 'APV');

    // Obtener datos para llenado de selects
    $.ajax({
        type: "GET",
        async: false,
        url: '/simpleWeb/json/work/getParametrosByCodigos',
        data: { param: param }, // se recibe array de parametros que se
        // requieren
        dataType: "json",
        success: function (data) {
            
        	$.each(data, function (key, registro) {

                if (registro.codigo == "SEXO") {
                    $("#idGenero").append(
                        '<option value=' + registro.llave + '>'
                        + registro.descripcion + '</option>');
                }

                if (registro.codigo == "ISAPRE") {
                    $("#idIsapre").append(
                        '<option value=' + registro.llave + '>'
                        + registro.descripcion + '</option>');
                }

                if (registro.codigo == "PARENTESCO") {
                    $("#parentesco, #parentesco2").append(
                        '<option value=' + registro.llave + '>'
                        + registro.descripcion + '</option>');
                }

                if (registro.codigo == "NACIONALIDAD") {
                    $("#idNacionalidad").append(
                        '<option value=' + registro.llave + '>'
                        + registro.descripcion + '</option>');
                }

                if (registro.codigo == "ESTADO_CIVIL") {
                    $("#idEstadoCivil").append(
                        '<option value=' + registro.llave + '>'
                        + registro.descripcion + '</option>');
                }

                if (registro.codigo == "NIVEL_DE_EDUCACION") {
                    $("#nivelEducacion").append(
                        '<option value=' + registro.llave + '>'
                        + registro.descripcion + '</option>');
                }

                if (registro.codigo == "NIVEL") {
                    $("#nivel").append(
                        '<option value=' + registro.llave + '>'
                        + registro.descripcion + '</option>');
                }

                if (registro.codigo == "CARRERA_OFICIO") {
                    $("#carrera").append(
                        '<option value=' + registro.llave + '>'
                        + registro.descripcion + '</option>');
                }

                if (registro.codigo == "INSTITUCIONES") {
                    $("#instituciones").append(
                        '<option value=' + registro.llave + '>'
                        + registro.descripcion + '</option>');
                }

                if (registro.codigo == "NOMBRE_INSTITUCION") {
                    $("#nombreInstitucion").append(
                        '<option value=' + registro.llave + '>'
                        + registro.descripcion + '</option>');
                }

                if (registro.codigo == "MONEDA_PLAN") {
                    $("#idMonedaPlan, #idMonedaAFP, #idMonedaAdicionalAFP, #idMonedaAPV, #idMonedaConvenido").append(
                        '<option value=' + registro.llave + '>'
                        + registro.descripcion + '</option>');
                }

                if (registro.codigo == "GRUPO") {
                    $("#grupo").append(
                        '<option value=' + registro.llave + '>'
                        + registro.descripcion + '</option>');
                }

                if (registro.codigo == "SUBGRUPO") {
                    $("#idSubGrupo").append(
                        '<option value=' + registro.llave + '>'
                        + registro.descripcion + '</option>');
                }

                if (registro.codigo == "TIPO_CONTRATO") {
                    $("#tipoContrato").append(
                        '<option value=' + registro.llave + '>'
                        + registro.descripcion + '</option>');
                }

                if (registro.codigo == "TIPO_TRABAJADOR") {
                    if (registro.llave != 2 && registro.llave != 4 && registro.llave != 5) {
                        $("#tipoTrabajador").append(
                            '<option value=' + registro.llave + '>'
                            + registro.descripcion + '</option>');
                    }
                }

                if (registro.codigo == "GRADO_DISCAPACIDAD") {
                    $("#gradoDiscapacidad").append(
                        '<option value=' + registro.llave + '>'
                        + registro.descripcion + '</option>');
                }

                if (registro.codigo == "CAUSA_DISCAPACIDAD") {
                    $("#causaDiscapacidad").append(
                        '<option value=' + registro.llave + '>'
                        + registro.descripcion + '</option>');
                }

                if (registro.codigo == "MOVILIDAD_REDUCIDA") {
                    $("#movilidadReducida").append(
                        '<option value=' + registro.llave + '>'
                        + registro.descripcion + '</option>');
                }

                if (registro.codigo == "ETNIA") {
                    $("#idEtnia").append(
                        '<option value=' + registro.llave + '>'
                        + registro.descripcion + '</option>');
                }

                if (registro.codigo == "AFP") {
                    $("#idAFP, #idAdicionalAFP").append(
                        '<option value=' + registro.llave + '>'
                        + registro.descripcion + '</option>');
                }

                if (registro.codigo == "TIPO_LICENCIA_CONDUCIR") {
                    $("#idTipoLicenciaConducir1, #idTipoLicenciaConducir2, #idTipoLicenciaConducir3").append(
                        '<option value=' + registro.llave + '>'
                        + registro.descripcion + '</option>');
                }

                if (registro.codigo == "TRAMO") {
                    $("#tramoFamiliar, #tramoFamiliar2").append(
                        '<option value=' + registro.llave + '> TRAMO ('
                        + registro.llave + ') </option>');
                }

                if (registro.codigo == "TIPO_CARGA") {
                    $("#tipoCarga, #tipoCarga2").append(
                        '<option value=' + registro.llave + '>'
                        + registro.descripcion + '</option>');
                }

                if (registro.codigo == "APV") {
                    $("#institucionAPV, #institucionConvenido").append(
                        '<option value=' + registro.llave + '>'
                        + registro.descripcion + '</option>');
                }


            });
        	
        	
        },
        error: function (data) {
            alert('error');
        }
    });


    // Seleccionar Cargo
    $.ajax({
        type: "GET",
        async: false,
        url: '/simpleWeb/json/work/cargos/getCargos/',
        dataType: "json",
        success: function (data) {
            $.each(data, function (key, registro) {

                $("#cargo").append(
                    '<option value=' + registro.id_cargo + '>'
                    + registro.cargos + '</option>');
            });
        },
        error: function (data) {
            alert('error');
        }
    });


    // Seleccionar Faena
    $.ajax({
        type: "GET",
        async: false,
        url: '/simpleWeb/json/work/Faenas/getFaenas/',
        dataType: "json",
        success: function (data) {
            $.each(data, function (key, registro) {

                $("#idFaena, #idFaenaContrato").append(
                    '<option value=' + registro.idFaena + '>'
                    + registro.nombreFaena + '</option>');
            });
        },
        error: function (data) {
            alert('error');
        }
    });


    var banco;
    // Select para Seccion de Cuenta Bancaria
    for (banco = 1; banco <= 2; banco++) {

        // Seleccionar Tipo de Cuenta
        $.ajax({
            type: "GET",
            async: false,
            url: '/simpleWeb/json/work/getParametros/TIPO_DE_CUENTA',
            dataType: "json",
            success: function (data) {
                $.each(data, function (key, registro) {

                    $("#idTipoCuenta" + banco).append(
                        '<option value=' + registro.codPrevired + '>'
                        + registro.descripcion + '</option>');
                });
            },
            error: function (data) {
                alert('error');
            }
        });

        // Seleccionar Banco
        $.ajax({
            type: "GET",
            async: false,
            url: '/simpleWeb/json/work/getParametros/BANCO',
            dataType: "json",
            success: function (data) {
                $.each(data, function (key, registro) {

                    $("#idBanco" + banco).append(
                        '<option value=' + registro.llave + '>'
                        + registro.descripcion + '</option>');
                });
            },
            error: function (data) {
                alert('error');
            }
        });

    }
    
  //Obtener Sociedades
	let queryString;
	if(sociedadPrivilege == null){
		queryString = "";
	}else{
		queryString = JSON.stringify(sociedadPrivilege).slice(1,-1);
	}
    
	//Obtener sociedades
	let sociedades = await $.getJSON('/simpleWeb/json/work/getSociedad/?idSociedad='+queryString);
	
	//Limpiar Select
	$('#sociedad').children('option:not(:first)').remove();
	//Colocar Sociedades en el Select
	$('#sociedad').setOptionsByArray(sociedades, "sociedad", "idSociedad");
	
    reorderSelect('#cargo, #posicion, #idBanco1, #idBanco2, #idTipoCuenta1, #idTipoCuenta2, #carrera, #parentesco', '#idNacionalidad');
    
}

// Seleccionar Monto en Base al Tipo de Carga TODO:
$(document).on('change', '#tramoFamiliar', function () {

    // Obtener Tramos por periodo
    let montosTramo = $(this).getJSONSync("/simpleWeb/json/work/tramo/getTramosByLastPeriod/");

    //Obtener tramo seleccionado
    let tramo = $('#tramoFamiliar').val();
    
    //Recorrer lista de tramos
    $.each(montosTramo, function(key, value){
    	
    	//Si el tramo es Igual al tramo seleccionado
    	if(value.letraTramoCarga == tramo){
    		//Setear monto del tramo
    		$('#montoFamiliar').val(formatNumber(value.montoTramoCarga));
    	}
    	
    });

});

$(document).on('change', '#tramoFamiliar2', function () {

	 // Obtener Tramos por periodo
    let montosTramo = $(this).getJSONSync("/simpleWeb/json/work/tramo/getTramosByLastPeriod/");

    //Obtener tramo seleccionado
    let tramo = $('#tramoFamiliar2').val();
    
    //Recorrer lista de tramos
    $.each(montosTramo, function(key, value){
    	
    	//Si el tramo es Igual al tramo seleccionado
    	if(value.letraTramoCarga == tramo){
    		//Setear monto del tramo
    		$('#montoFamiliar2').val(formatNumber(value.montoTramoCarga));
    	}
    	
    });

});


// Seleccionar Provincia
$(document).on('change', '#idRegion', function () {

    $('#idProvincia').html('<option value="">Seleccione...</option>');
    $('#idComuna').html('<option value="">Seleccione...</option>');

    // Servicio para Obtener Provincia dado una Region
    $.ajax({
        type: "GET",
        url: '/simpleWeb/json/work/getProvinciaByIdRegion/' + $("#idRegion").val(),
        async: false,
        dataType: "json",
        success: function (data) {
            $.each(data, function (key, registro) {

                $("#idProvincia").append(
                    '<option value=' + registro.id + '>'
                    + registro.nombre + '</option>');
            });
        },
        error: function (data) {
            alert('error');
        }
    });




});

// Seleccionar Comuna
$(document).on('change', '#idProvincia', function () {

    $('#idComuna').html('<option value="">Seleccione...</option>');

    // Servicio para Obtener Comuna dado una provincia
    $.ajax({
        type: "GET",
        url: '/simpleWeb/json/work/getComunaByIdProvincia/' + $("#idProvincia").val(),
        async: false,
        dataType: "json",
        success: function (data) {
            $.each(data, function (key, registro) {
                $("#idComuna").append(
                    '<option value=' + registro.id + '>'
                    + registro.nombre + '</option>');
            });
        },
        error: function (data) {
            alert('error');
        }
    });




});



function generarAnexoContrato() {




}



// Tablas Dinamicas con Filtros para Grupo Familiar
async function datatableFamiliares() {

    var grid = new Datatable();

    let trabajador = await $.getJSON("/simpleWeb/json/work/getTrabajadorById/" + idTrabajadorGlobal);
    
    grid.init({
        src: $("#datatable_Familiares"),
        loadingMessage: 'Loading...',
        dataTable: {

            "bStateSave": true,
            "paging": false,
            "info": false,
            "ajax": {
                "url": "/simpleWeb/json/work/getFamiliarByIdTrabajador/"+trabajador.codigo ,
            },
            "columnDefs": [
                {
                    "targets": [0],
                    "render": function (data, type, full) {

                        var html = "";
                        html += "<td><input type='checkbox' style='margin-left:auto; margin-right:auto;' id='" + full[0] + "' class='checkbox'/></td>";
                        return html;
                    }

                },
                {
                    "targets": [2, 6, 7],
                    "render": function (data, type, full) {
                        return changeDateformatDDMMYY(data);
                    }

                },
                {
                    "targets": [3],
                    "render": function (data, type, full) {
                        switch (data) {
                        case "1":
							return "SOLO REGISTRO";
							break;
						case "2":
							return "SIMPLE";
							break;
						case "3":
							return "INVALIDEZ";
							break;
						case "4":
							return "MATERNAL";
							break;
						default:
							return "SOLO REGISTRO";
							break;
						}
                    	
                    }

                },
                {
                	"targets": [-2],
                    "render": function (data, type, full) {
                    	let contrato = $(this).getJSONSync("/simpleWeb/json/work/contrato/getContratoWithFilter/?id=" + data);
                    	return changeDateformatDDMMYY(contrato[0].fechaInicio_actividad);
                    }
                	
                },
                {
                    "targets": [-1],
                    "render": function (data, type, full) {
                        var html = "";
                        html += "<a id='detColFamiliar' onclick='javascript: verFamiliar(" + full[0] + ");' title='Detalles' class='btn btn-circle blue btn-outline btn-sm'><i class='fa fa-eye fa-sm'></i></a>"
                        html += "<a id='modificarFamiliar' onclick='javascript: modificarFamiliar(" + full[0] + ");' title='Modificar' class='btn btn-circle yellow btn-outline btn-sm'><i class='fa fa-pencil-square-o fa-sm'></i></a>";
                        html += "<a id='reactivarFamiliar' onclick='javascript: reactivarFamiliar(" + full[0] + ");' title='Reactivar' class='btn btn-circle green btn-outline btn-sm'><i class='fa fa-refresh fa-sm'></i></a>";

                        window.data_familiar = full;
                        return html;
                    }
                }

            ],
            "order": [[1, "asc"]]
        }
    });

}


function reactivarFamiliar(datos){
	
	let familiar = { idFamiliar : parseInt(datos) }
	
	 // Actualizar Familiar del Contrato
    $(this).setJSONSync('/simpleWeb/json/work/actualizarFamiliarContrato/', familiar);
	
	 $('#datatable_Familiares').dataTable().fnClearTable();
     $('#datatable_Familiares').dataTable().fnDestroy();
     datatableFamiliares();
     $('#insertarFamiliarForm').trigger("reset");

	
}

function reactivarFamiliarMasivo(datos){
	
	let table = $('#reactivarFamiliares').DataTable();
	
	//Recorrer datatable
	table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
		
		let data = this.node();
		let familiar = $(data).find('.activarFamiliar').attr('id');
		
		let familiarDatos = { idFamiliar : parseInt(familiar) }
		 // Actualizar Familiar del Contrato
	    $(this).setJSONSync('/simpleWeb/json/work/actualizarFamiliarContrato/', familiarDatos);
		
	});
	
	$('#datatable_Familiares').dataTable().fnClearTable();
    $('#datatable_Familiares').dataTable().fnDestroy();
	datatableFamiliares();
	
	$('.swal2-cancel').click();
	alerta('Se Activaron los Datos');
	
	//location.reload();
	
}


function sincronizarFamiliar(){
	
	let familiarTrabajadores = $(this).getJSONSync("/simpleWeb/json/work/getFamiliarByIdTrabajador/"+trabajadorGlobal.codigo);
	let familiarTrabajadorArray = new Array();
	
	 swal({
		 html: '<a onclick="reactivarFamiliarMasivo()" class="btn btn-circle green btn-outline">Reactivar Todos <i class="fa fa-refresh"></i></a>'+ 
			 '<table class="table table-bordered table-hover table-condensed" id="reactivarFamiliares">'+
		 	 '<thead>'+
		 	 '<tr>'+
			 '<th style="min-width: 150px;">Nombre</th>'+
			 '<th style="min-width: 150px;">Tipo Familiar</th>'+
			 '<th style="min-width: 150px;">Tramo C</th>'+
			 '<th style="min-width: 100px;">Opciones</th>'+
			 '</tr>'+
			 '</thead>'+
			 '</table>',
         title: 'Reactivar Familiares',
         showCancelButton: true,
         cancelButtonColor: '#d33',
         showConfirmButton: false,
         width: 700,
         onOpen : function(val){
        	 debugger;
        	 $('#reactivarFamiliares').dataTable( {
        		 data : familiarTrabajadores.data,
                 columns: [
                     {"data" : "1"},
                     {"data" : "3"},
                     {"data" : "4"},
                     {"data" : "0"}
                 ],columnDefs: [
                                {
                                	"targets": [-1],
                                	"render": function (value, type, full, meta) {
                                		return '<a class="btn btn-circle blue btn-outline btn-xs activarFamiliar" onclick="reactivarFamiliar('+value+')" id="'+value+'" ><i class="fa fa-refresh fa-sm"></i></a>';
                                	}
                                },      
                                ]
        	 });
         }
     }).then(function (result) {        	 
    	
     });
	
	
}


$(function () {

    $("#insertarFamiliarForm").validate({

        errorElement: 'span',
        errorClass: 'help-block help-block-error',
        focusInvalid: true,
        rules: {
            rutFamiliar: {
                required: true, remote: {
                    url: "/simpleWeb/json/work/existFamiliarByRut/",
                    type: "post",
                    dataFilter: function (data) {
                        var json = JSON.parse(data);
                        if (json.rutFamiliar) {
                        	
                            return "\"" + "El rut ya existe" + "\"";
                        } else {
                        	
                            return 'true';
                        }
                    }
                }
            },
            apellidoPaternoFamiliar: {
                required: function (element) { return $('#tipoCarga').val() != "4"; }
            },
            tramoFamiliar: {
                required: function (element) { return $('#tipoCarga').val() != ""; }
            },
            montoFamiliar: {
                required: function (element) { return $('#tipoCarga').val() != ""; }
            },
            nombreFamiliar: {
                required: function (element) { return $('#tipoCarga').val() != "4"; }
            },
            retroActivoFamiliar: {
                required: function (element) { return $('#tipoCarga').val() != ""; }
            },
            fNacimientoFamiliar: {
                required: true
            },
            fechaInicioFamiliar: {
                required: function (element) { return $('#tipoCarga').val() != ""; }
            },
            fechaFinFamiliar: {
//                required: function (element) { return $('#tipoCarga').val() != ""; }
            	required : true
            },
            parentesco: {
                required: true
            }
        },
        messages: {
            rutFamiliar: {
                required: "requerido"
            },
            tipoCarga: {
                required: "requerido"
            },
            apellidoPaternoFamiliar: {
                required: "requerido"
            },
            tramoFamiliar: {
                required: "requerido"
            },
            montoFamiliar: {
                required: "requerido"
            },
            nombreFamiliar: {
                required: "requerido"
            },
            retroActivoFamiliar: {
                required: "requerido"
            },
            fNacimientoFamiliar: {
                required: "requerido"
            },
            fechaInicioFamiliar: {
                required: "requerido"
            },
            fechaFinFamiliar: {
                required: "requerido"
            },
            parentesco: {
                required: "requerido"
            }
        },
        errorPlacement: function (error, element) {
            if (element.parent(".input-group").size() > 0) {
                error.insertAfter(element.parent(".input-group"));
            } else {
                error.insertAfter(element); // for other inputs,
            }
        },
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        success: function (label) {
            label.closest('.form-group').removeClass('has-error');
        },
        submitHandler: function (form) {
        	
            let arrFamiliar = $(document).find('.row_dataFamiliar').getObjectByInputs();

            let trabajador = $(this).getJSONSync("/simpleWeb/json/work/getTrabajadorById/" + getINFO().id);
            
            $.extend(arrFamiliar, { codTrabajador : trabajador.codigo });
            $.extend(arrFamiliar, { idContrato    : contratoGlobal.id } );

            debugger;
            // Enviar Familiar al servicio
            $(this).setJSONSync('/simpleWeb/json/work/insertFamiliar/', arrFamiliar);
            
            //Restar tabla
            $('#datatable_Familiares').dataTable().fnClearTable();
            $('#datatable_Familiares').dataTable().fnDestroy();
            datatableFamiliares();
            $('#insertarFamiliarForm').trigger("reset");

        }
    });

});

function cancelCheck(selectorCheck) {
    $(selectorCheck).prop('checked', false);
    swal.closeModal();

}

//TODO: Opciones Retro Activo
$('#btnRetroActivo').click(function(){
	
	$('#modalFamiliarRetroActivo').modal('toggle');
	//Cargar Informacion de RetroActivos
	loadDatatableFamiliarRetroActivo();
});

//Cargar Informacion de RetroActivos
function loadDatatableFamiliarRetroActivo(){
	
	let trabajador = $(this).getJSONSync("/simpleWeb/json/work/getTrabajadorById/" + getINFO().id);
	let familiarRetroActivo = $(this).getJSONSync('/simpleWeb/json/work/getFamiliarRetroActivoByCodTrabajador/' + trabajador.codigo);
	
	
	
	$('#datatableFamiliarRetroActivo').dataTable().fnClearTable();
    $('#datatableFamiliarRetroActivo').dataTable().fnDestroy();
	
	let datatableFamiliarRetroActivo = $('#datatableFamiliarRetroActivo').DataTable({
																								"data": familiarRetroActivo
																								,"columns": [
	                                                                                            { "data": "codTrabajador" },
	                                                                                            { "data": "idFamiliar" },
	                                                                                            { "data": "monto" },
	                                                                                            { "data": "periodo" },
	                                                                                            { "data": "idContrato"},
	                                                                                            { "data": "idFamiliarRetroActivo" }
	                                                                                            ],
	                                                                                            "columnDefs" : [{
                                                                                    				"targets" : [ -1 ],
                                                                                    				"render"  : function(data, type, full){
                                                                                    					return "<button title='Borrar' id='" + data + "' onclick=\"javascript:deleteFamiliarRetroActivoById(" + data + ")\" class='btn btn-circle red btn-outline btn-sm col-md-4'><i class='fa fa-trash-o fa-lg'></i></button>";
                                                                                    				}
                                                                                    			},
                                                                                    			{
                                                                                    				"targets" : [ 1 ],
                                                                                    				"render"  : function(data, type, full){
                                                                                    					let nombreFamiliar = $(this).getJSONSync('/simpleWeb/json/work/getFamiliarById/'+data);
                                                                                    					return nombreFamiliar.apellidoPaternoFamiliar+" "+nombreFamiliar.apellidoMaternoFamiliar +", "+nombreFamiliar.nombreFamiliar;
                                                                                    				}
                                                                                    			},
                                                                                    			{
                                                                                    				"targets" : [ 2 ],
                                                                                    				"render"  : function(data, type, full){
                                                                                    					return formatNumber(data);
                                                                                    				}
                                                                                    			},
                                                                                    			{
                                                                                    				"targets" : [ 4 ],
                                                                                    				"render"  : function(data, type, full){
                                                                                    					
                                                                                    					let contratos = $(this).getJSONSync("/simpleWeb/json/work/contrato/getContratoWithFilter/?codigo_trabajador="+full.codTrabajador+"");
                                                                                    				
                                                                                    					let html = '<select id="idContratoFamiliar_'+data+'" class="form-control input-circle">'; 
                                                                    									if(contratos != null){
                                                                    										$.each(contratos,function(key,value){
                                                                    											if(data == value.id){
                                                                    												html += '<option disabled selected value="'+value.id+'">'+changeDateformatDDMMYY(value.fechaInicio_actividad)+'</option>';
                                                                    											}
                                                                    										});
                                                                    									}
                                                                    										html += '</select>';
                                                                    									
                                                                    									return html;
                                                                                    				}
                                                                                    			}
                                                                                    			],
	                                                                                            "searching": false,
	                                                                                            "ordering": false,
	                                                                                            "paging": false,
	                                                                                            "info": false,
	                                                                                        }).draw();
	
}

function deleteFamiliarRetroActivoById(idFamiliarRetroActivo){
	$(this).getJSONSync('/simpleWeb/json/work/deleteFamiliarRetroActivoById/'+idFamiliarRetroActivo);
	alerta("Eliminado con Exito");
	
	//Cargar Informacion de RetroActivos
	loadDatatableFamiliarRetroActivo();
}

$('#btnVisualizarRetroActivo').click(function(){
	
	if($('#periodoRetroActivo').val() == ""){
		alerta("Debe agregar un periodo");
		return false;
	}
	
	$('#editarFamiliarModalRetroActivo').modal('toggle');
	
});

$('#btnInsertRetroActivo').click(function(){
	
	//Abrir Modal para Insertar RetroActivo
	$('#editarFamiliarModalRetroActivo').modal('toggle');
	
	//Obtener Trabajador
	let trabajador = $(this).getJSONSync("/simpleWeb/json/work/getTrabajadorById/" + getINFO().id);
	$('#codTrabajadorFamiliar').val(trabajador.codigo);
	
	//Llenar Campo Familiares
	let familiares = $(this).getJSONSync("/simpleWeb/json/work/getFamiliarByIdTrabajador/"+trabajador.codigo);
	
	$('#idFamiliar').empty();
	$('#idFamiliar').append($('<option>').text("Seleccione...").val(""));
	
	$.each(familiares.data, function(key,value){
		$('#idFamiliar').append($('<option>').text(value[1]).val(value[0]));
	});
	
	let contratos = $(this).getJSONSync("/simpleWeb/json/work/contrato/getContratoWithFilter/?codigo_trabajador="+trabajador.codigo+"&EstadoContrato=1");
	
	$('#idContratoFamiliar').empty();
	$('#idContratoFamiliar').append($('<option>').text("Seleccione...").val(""));
	
	if(contratos != null){
		$.each(contratos,function(key,value){
			$('#idContratoFamiliar').append($('<option>').text(changeDateformatDDMMYY(value.fechaInicio_actividad)).val(value.id));
		});
	}
	
});

$('#btnIngresarRetroActivo').click(function(){
	
	 let familiarRetroActivo = $('#formRetroActivo').find('.row_dataFamiliarRetroActivo').getObjectByInputs();
	 let fecha = familiarRetroActivo.periodo.split('-');
	 familiarRetroActivo.periodo = fecha[0]+fecha[1];
	 debugger;
	 
	 //Insertar Formulario
	 $(this).setJSONSync("/simpleWeb/json/work/insertFamiliarRetroActivo/", familiarRetroActivo);
	 
	 //Limpiar Formulario
	 $('#formRetroActivo').find(":input").val('');
	 
	 swal('Familiar Actualizado con Exito').then(function (result) {
         if (result.value) {
        	 //Cerrar Modal despues de Ingresar
             $('#editarFamiliarModalRetroActivo').modal('toggle');
             //Cargar Informacion de Retroactivos
             loadDatatableFamiliarRetroActivo();
         }
     });
	
	
})


/*--------------VER FAMILIARES--------------------------------*/
function verFamiliar($id) {
    
	$.ajax({
        type: "GET",
        async: false,
        processData: false,
        contentType: false,
        url: "/simpleWeb/json/work/getFamiliarById/" + $id,

        success: function (data) {
//TODO:FAMILIAR
            $("#fNacimientoFamiliar2, #fechaInicioFamiliar2, #fechaFinFamiliar2").datepicker({ dateFormat: 'dd-mm-yy', changeMonth: true, changeYear: true });

            $("#rutFamiliar2").val(data.rutFamiliar);
            $("#nombreFamiliar2").val(data.nombreFamiliar);
            $("#apellidoPaternoFamiliar2").val(data.apellidoPaternoFamiliar);
            $("#apellidoMaternoFamiliar2").val(data.apellidoMaternoFamiliar);
            $("#fNacimientoFamiliar2").val(changeDateformatDDMMYY(data.fNacimientoFamiliar));
            $("#idFamiliarEdit2").val(data.idFamiliar);
            $("#parentesco2").val(data.parentesco);
            $("#tramoFamiliar2").val(data.tramoFamiliar);
            $("#tipoCarga2").val(data.tipoCarga);
            $("#montoFamiliar2").val(formatNumber(data.montoFamiliar));
            $("#fechaInicioFamiliar2").val(changeDateformatDDMMYY(data.fechaInicioFamiliar));
            $("#fechaFinFamiliar2").val(changeDateformatDDMMYY(data.fechaFinFamiliar));
            //$("#periodo").val(data.periodo);

            $("#editarFamiliarModal").modal("toggle");
            // manejador de la llamada a la base de datos
            let familiarForm = $(document).find('.row_dataFamiliarEdit');
            
            $.each(familiarForm, function(key, value){
        		$(value).attr('disabled', 'disabled');
        		$('#btnActualizarFamiliar').hide();
        	});
        		
        },
        error: function (ex) {
           console.log("Error en Editar Familiar"+ex);
        }
    });
}

function restablecerFamiliarForm(){
	 let familiarForm = $(document).find('.row_dataFamiliarEdit');
     
     $.each(familiarForm, function(key, value){
 		$(value).attr('disabled', false);
 		$('#btnActualizarFamiliar').show();
 	});
}


//---------------Crear RetroActivo------------------------------//
$('#addRetroActivo').click(function(){
	
	$(document).find('#editarFamiliarModalRetroActivo').modal('toggle');
	
});



/*----------------Modificar Familiares------------------------*/
function modificarFamiliar($id) {
    $.ajax({
        type: "GET",
        async: false,
        processData: false,
        contentType: false,
        url: "/simpleWeb/json/work/getFamiliarById/" + $id,

        success: function (data) {
//TODO:FAMILIAR
            $("#fNacimientoFamiliar2, #fechaInicioFamiliar2, #fechaFinFamiliar2").datepicker({ dateFormat: 'dd-mm-yy', changeMonth: true, changeYear: true });

            $("#rutFamiliar2").val(data.rutFamiliar);
            $("#nombreFamiliar2").val(data.nombreFamiliar);
            $("#apellidoPaternoFamiliar2").val(data.apellidoPaternoFamiliar);
            $("#apellidoMaternoFamiliar2").val(data.apellidoMaternoFamiliar);
            $("#fNacimientoFamiliar2").val(changeDateformatDDMMYY(data.fNacimientoFamiliar));
            $("#idFamiliarEdit2").val(data.idFamiliar);
            $("#parentesco2").val(data.parentesco);
            $("#tramoFamiliar2").val(data.tramoFamiliar);
            $("#tipoCarga2").val(data.tipoCarga);
            $("#montoFamiliar2").val(formatNumber(data.montoFamiliar));
            $("#fechaInicioFamiliar2").val(changeDateformatDDMMYY(data.fechaInicioFamiliar));
            $("#fechaFinFamiliarFin2").val(changeDateformatDDMMYY(data.fechaFinFamiliar));
            //$("#periodo").val(data.periodo);

            $("#editarFamiliarModal").modal("toggle");
            // manejador de la llamada a la base de datos
            
            restablecerFamiliarForm();
        },
        error: function (ex) {
           console.log("Error en Editar Familiar"+ex);
        }
    });
}


// Actualizar datos Familiares
$(function () {

    $("#editFamiliarForm").validate({

        errorElement: 'span',
        errorClass: 'help-block help-block-error',
        focusInvalid: true,
        rules: {
            rutFamiliar: {
                required: true
            },
            apellidoPaternoFamiliar: {
                required: true
            },
            nombreFamiliar: {
                required: true
            },
            fNacimientoFamiliar: {
                required: true
            },
            parentesco: {
                required: true
            }
        },
        messages: {
            apellidoPaternoFamiliar: {
                required: "requerido"
            },
            nombreFamiliar: {
                required: "requerido"
            },
            fNacimientoFamiliar: {
                required: "requerido"
            },
            parentesco: {
                required: "requerido"
            }
        },
        errorPlacement: function (error, element) {

            if (element.parent(".input-group").size() > 0) {
                error.insertAfter(element.parent(".input-group"));
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        success: function (label) {
            label.closest('.form-group').removeClass('has-error');
        },
        submitHandler: function (form) {

            // Traer Data Familiar de JSON
            $('#editarFamiliarModal').modal('hide');

            var familiar;
            $.ajax({
                url: "/simpleWeb/json/work/getFamiliarById/" + $("#idFamiliarEdit2").val(),
                async: false,
                type: "GET",
                success: function (data) {
                    familiar = data;
                },
                error: function (ex) {
                    console.log(ex);
                }
            });

            let arrFamiliar = $(document).find('.row_dataFamiliarEdit').getObjectByInputs();

            $.extend(familiar, arrFamiliar);

            // Enviar Familiar al servicio
            $.ajax({
                url: "/simpleWeb/json/work/updateFamiliar/",
                async: false,
                type: "PUT",
                data: JSON.stringify(familiar),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Accept", "application/json");
                    xhr.setRequestHeader("Content-Type", "application/json");
                },
                success: function (data) {
                    $('#datatable_Familiares').dataTable().fnClearTable();
                    $('#datatable_Familiares').dataTable().fnDestroy();
                    datatableFamiliares();
                    $('#insertarFamiliarForm').trigger("reset");
                },
                error: function (ex) {
                    console.log(ex);
                }
            });


            swal('Familiar Actualizado con Exito').then(function (result) {
                if (result.value) {
                    swal.closeModal();
                }
            });


        }
    });

});


// Permisos
async function datatablePermisos() {

    // Obtener Trabajador
    let trabajador = await $.getJSON("/simpleWeb/json/work/getTrabajadorById/" + idTrabajadorGlobal);

    // Obtener Sociedades donde el trabajador ha tenido contrato
    let idSociedadLista = await $.getJSON("/simpleWeb/json/work/getAllSociedadesByCodigoTrabajador/" + trabajador.codigo);

    let permisosObject = new Array();
    let requests = [];
 // Obtener todos los permisos del trabajador por sociedad 
    for (var i = 0; i < idSociedadLista.length; i++) {
    
    requests.push(
    		$.ajax({
                dataType: 'json',
                type: "GET",
                url: "/simpleWeb/json/work/LodtablaPermisoLicencia/" + trabajador.codigo + ",1," + idSociedadLista[i] +  ',null,null,null' ,
                success: function (data) {
                	$.each(data, function (key) {
                		permisosObject.push(data[key]);
	                });
                }
            }),
            $.ajax({
                dataType: 'json',
                type: "GET",
                url: "/simpleWeb/json/work/LodtablaPermisoLicencia/" + trabajador.codigo + ",4," + idSociedadLista[i] +  ',null,null,null',
                success: function (data) {
                	$.each(data, function (key) {
                		permisosObject.push(data[key]);
	                });
                }
            })
    );
   
    }
    
    let todosLosRegistros = await Promise.all(requests).then(
    );

    var grid = new Datatable();
    grid.init({
        src: $("#datatable_permisos"),
        loadingMessage: 'Loading...',
        dataTable: {
            "bStateSave": true,
            "data": permisosObject,
            "columns": [
                { "data": "codigo_trabajador" },
                { "data": "incluye_feriados" },
                { "data": "fecha_desde" },
                { "data": "fecha_hasta" },
                { "data": "horas_inasistencia" },
                { "data": "dias_corridos" },
                { "data": "ruta_archivo" },
            ],
            "columnDefs": [
                {
                    "targets": [6],
                    "render": function (data, type, full) {

                        var html = "";
                        if (data == null) {
                            return "<td style='text-align:center;'>N/A</td>";
                        }
                        html += "<center><td style='text-align:center;'><a href='" + data + "' target='blank'><i class='fa fa-file-pdf-o fa-lg'></i></a></td></center>";
                        return html;

                    }
                },
                {

                    "targets": [2, 3],
                    "render": function (data, type, full) {
                        var html = "";
                        if (data == null) {
                            return "<center><td style='text-align:center;'>N/A</td></center>";
                        }
                        return html += "<center>" + changeDateformatDDMMYY(data) + "</center>";
                    }

                }
            ]
        }
    });

    
    $('#datatable_permisos').dataTable().fnDestroy();
    $("#datatable_permisos").DataTable({
        "searching": true,
        "ordering": false,
        "paging": false,
        "info": false
    }).draw();
    
    
    
}


// Licencias
async function datatableLicencias() {

    // Obtener Trabajador
    let trabajador = await $.getJSON("/simpleWeb/json/work/getTrabajadorById/" + idTrabajadorGlobal);
  
    // Obtener Sociedades donde el trabajador ha tenido contrato
    let idSociedadLista = await $.getJSON("/simpleWeb/json/work/getAllSociedadesByCodigoTrabajador/" + trabajador.codigo);      

    let licenciasObject = new Array();
    let requests = [];
    
    // Obtener todos las licencias del trabajador
    for (var i = 0; i < idSociedadLista.length; i++) {
    
    requests.push(
    		 $.ajax({
    	            dataType: 'json',
    	            async: false,
    	            url: "/simpleWeb/json/work/LodtablaPermisoLicencia/" + trabajador.codigo + ",2," + idSociedadLista[i] +  ',null,null,null' ,
    	            success: function (data) {
    	                $.each(data, function (key) {
    	                    licenciasObject.push(data[key]);
    	                });
    	            }
    	        })
    );

    }//END FOR
    
    let todosLosRegistros = await Promise.all(requests).then(
    );

    

    var grid = new Datatable();
    grid.init({
        src: $("#datatable_licencias"),
        loadingMessage: 'Loading...',
        dataTable: {
            "bStateSave": true,
            "data": licenciasObject,
            "columns": [
                { "data": "codigo_trabajador" },
                { "data": "tipo_licencia" },
                { "data": "subtipo_licencia" },
                { "data": "nombre_reposo" },
                { "data": "incluye_feriados" },
                { "data": "fecha_desde" },
                { "data": "fecha_hasta" },
                { "data": "horas_inasistencia" },
                { "data": "dias_corridos" },
                { "data": "ruta_archivo" }
            ],
            "columnDefs": [
                {

                    "targets": [1, 2, 3, 4, 7, 8],
                    "render": function (data, type, full) {
                        var html = "";
                        if (data == null) {
                            return "<center><td style='text-align:center;'>N/A</td></center>";
                        }
                        return html += "<center>" + data + "</center>";
                    }

                },
                {

                    "targets": [5, 6],
                    "render": function (data, type, full) {
                        var html = "";
                        if (data == null) {
                            return "<center><td style='text-align:center;'>N/A</td></center>";
                        }
                        return html += "<center>" + changeDateformatDDMMYY(data) + "</center>";
                    }

                },
                {

                    "targets": [9],
                    "render": function (data, type, full) {

                        var html = "";
                        if (data == null) {
                            return "<center><td style='text-align:center;'>N/A</td></center>";
                        }
                        html += "<center><td style='text-align:center;'><a href='" + data + "' target='blank'><i class='fa fa-file-pdf-o fa-lg'></i></a></td></center>";
                        return html;

                    }
                }
            ]
        }
    });

    
   $('#datatable_licencias').dataTable().fnDestroy();
   $("#datatable_licencias").DataTable({
      "searching": false,
      "ordering": false,
      "paging": true,
      "info": false
   }).draw();

}


// -----------JQUERY PLUGIN MASK--------------------//

/**
 * jquery.mask.js
 * 
 * @version: v1.14.15
 * @author: Igor Escobar
 * 
 * Created by Igor Escobar on 2012-03-10. Please report any bug at
 * github.com/igorescobar/jQuery-Mask-Plugin
 * 
 * Copyright (c) 2012 Igor Escobar http://igorescobar.com
 * 
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/* jshint laxbreak: true */
/* jshint maxcomplexity:17 */
/* global define */

// UMD (Universal Module Definition) patterns for JavaScript modules that work
// everywhere.
// https://github.com/umdjs/umd/blob/master/templates/jqueryPlugin.js
(function (factory, jQuery, Zepto) {

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery || Zepto);
    }

}(function ($) {
    'use strict';

    var Mask = function (el, mask, options) {

        var p = {
            invalid: [],
            getCaret: function () {
                try {
                    var sel,
                        pos = 0,
                        ctrl = el.get(0),
                        dSel = document.selection,
                        cSelStart = ctrl.selectionStart;

                    // IE Support
                    if (dSel && navigator.appVersion.indexOf('MSIE 10') === -1) {
                        sel = dSel.createRange();
                        sel.moveStart('character', -p.val().length);
                        pos = sel.text.length;
                    }
                    // Firefox support
                    else if (cSelStart || cSelStart === '0') {
                        pos = cSelStart;
                    }

                    return pos;
                } catch (e) { }
            },
            setCaret: function (pos) {
                try {
                    if (el.is(':focus')) {
                        var range, ctrl = el.get(0);

                        // Firefox, WebKit, etc..
                        if (ctrl.setSelectionRange) {
                            ctrl.setSelectionRange(pos, pos);
                        } else { // IE
                            range = ctrl.createTextRange();
                            range.collapse(true);
                            range.moveEnd('character', pos);
                            range.moveStart('character', pos);
                            range.select();
                        }
                    }
                } catch (e) { }
            },
            events: function () {
                el
                    .on('keydown.mask', function (e) {
                        el.data('mask-keycode', e.keyCode || e.which);
                        el.data('mask-previus-value', el.val());
                        el.data('mask-previus-caret-pos', p.getCaret());
                        p.maskDigitPosMapOld = p.maskDigitPosMap;
                    })
                    .on($.jMaskGlobals.useInput ? 'input.mask' : 'keyup.mask', p.behaviour)
                    .on('paste.mask drop.mask', function () {
                        setTimeout(function () {
                            el.keydown().keyup();
                        }, 100);
                    })
                    .on('change.mask', function () {
                        el.data('changed', true);
                    })
                    .on('blur.mask', function () {
                        if (oldValue !== p.val() && !el.data('changed')) {
                            el.trigger('change');
                        }
                        el.data('changed', false);
                    })
                    // it's very important that this callback remains in this
                    // position
                    // otherwhise oldValue it's going to work buggy
                    .on('blur.mask', function () {
                        oldValue = p.val();
                    })
                    // select all text on focus
                    .on('focus.mask', function (e) {
                        if (options.selectOnFocus === true) {
                            $(e.target).select();
                        }
                    })
                    // clear the value if it not complete the mask
                    .on('focusout.mask', function () {
                        if (options.clearIfNotMatch && !regexMask.test(p.val())) {
                            p.val('');
                        }
                    });
            },
            getRegexMask: function () {
                var maskChunks = [], translation, pattern, optional, recursive, oRecursive, r;

                for (var i = 0; i < mask.length; i++) {
                    translation = jMask.translation[mask.charAt(i)];

                    if (translation) {

                        pattern = translation.pattern.toString().replace(/.{1}$|^.{1}/g, '');
                        optional = translation.optional;
                        recursive = translation.recursive;

                        if (recursive) {
                            maskChunks.push(mask.charAt(i));
                            oRecursive = { digit: mask.charAt(i), pattern: pattern };
                        } else {
                            maskChunks.push(!optional && !recursive ? pattern : (pattern + '?'));
                        }

                    } else {
                        maskChunks.push(mask.charAt(i).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
                    }
                }

                r = maskChunks.join('');

                if (oRecursive) {
                    r = r.replace(new RegExp('(' + oRecursive.digit + '(.*' + oRecursive.digit + ')?)'), '($1)?')
                        .replace(new RegExp(oRecursive.digit, 'g'), oRecursive.pattern);
                }

                return new RegExp(r);
            },
            destroyEvents: function () {
                el.off(['input', 'keydown', 'keyup', 'paste', 'drop', 'blur', 'focusout', ''].join('.mask '));
            },
            val: function (v) {
                var isInput = el.is('input'),
                    method = isInput ? 'val' : 'text',
                    r;

                if (arguments.length > 0) {
                    if (el[method]() !== v) {
                        el[method](v);
                    }
                    r = el;
                } else {
                    r = el[method]();
                }

                return r;
            },
            calculateCaretPosition: function () {
                var oldVal = el.data('mask-previus-value') || '',
                    newVal = p.getMasked(),
                    caretPosNew = p.getCaret();
                if (oldVal !== newVal) {
                    var caretPosOld = el.data('mask-previus-caret-pos') || 0,
                        newValL = newVal.length,
                        oldValL = oldVal.length,
                        maskDigitsBeforeCaret = 0,
                        maskDigitsAfterCaret = 0,
                        maskDigitsBeforeCaretAll = 0,
                        maskDigitsBeforeCaretAllOld = 0,
                        i = 0;

                    for (i = caretPosNew; i < newValL; i++) {
                        if (!p.maskDigitPosMap[i]) {
                            break;
                        }
                        maskDigitsAfterCaret++;
                    }

                    for (i = caretPosNew - 1; i >= 0; i--) {
                        if (!p.maskDigitPosMap[i]) {
                            break;
                        }
                        maskDigitsBeforeCaret++;
                    }

                    for (i = caretPosNew - 1; i >= 0; i--) {
                        if (p.maskDigitPosMap[i]) {
                            maskDigitsBeforeCaretAll++;
                        }
                    }

                    for (i = caretPosOld - 1; i >= 0; i--) {
                        if (p.maskDigitPosMapOld[i]) {
                            maskDigitsBeforeCaretAllOld++;
                        }
                    }

                    // if the cursor is at the end keep it there
                    if (caretPosNew > oldValL) {
                        caretPosNew = newValL * 10;
                    } else if (caretPosOld >= caretPosNew && caretPosOld !== oldValL) {
                        if (!p.maskDigitPosMapOld[caretPosNew]) {
                            var caretPos = caretPosNew;
                            caretPosNew -= maskDigitsBeforeCaretAllOld - maskDigitsBeforeCaretAll;
                            caretPosNew -= maskDigitsBeforeCaret;
                            if (p.maskDigitPosMap[caretPosNew]) {
                                caretPosNew = caretPos;
                            }
                        }
                    }
                    else if (caretPosNew > caretPosOld) {
                        caretPosNew += maskDigitsBeforeCaretAll - maskDigitsBeforeCaretAllOld;
                        caretPosNew += maskDigitsAfterCaret;
                    }
                }
                return caretPosNew;
            },
            behaviour: function (e) {
                e = e || window.event;
                p.invalid = [];

                var keyCode = el.data('mask-keycode');

                if ($.inArray(keyCode, jMask.byPassKeys) === -1) {
                    var newVal = p.getMasked(),
                        caretPos = p.getCaret();

                    // this is a compensation to devices/browsers that don't
                    // compensate
                    // caret positioning the right way
                    setTimeout(function () {
                        p.setCaret(p.calculateCaretPosition());
                    }, $.jMaskGlobals.keyStrokeCompensation);

                    p.val(newVal);
                    p.setCaret(caretPos);
                    return p.callbacks(e);
                }
            },
            getMasked: function (skipMaskChars, val) {
                var buf = [],
                    value = val === undefined ? p.val() : val + '',
                    m = 0, maskLen = mask.length,
                    v = 0, valLen = value.length,
                    offset = 1, addMethod = 'push',
                    resetPos = -1,
                    maskDigitCount = 0,
                    maskDigitPosArr = [],
                    lastMaskChar,
                    check;

                if (options.reverse) {
                    addMethod = 'unshift';
                    offset = -1;
                    lastMaskChar = 0;
                    m = maskLen - 1;
                    v = valLen - 1;
                    check = function () {
                        return m > -1 && v > -1;
                    };
                } else {
                    lastMaskChar = maskLen - 1;
                    check = function () {
                        return m < maskLen && v < valLen;
                    };
                }

                var lastUntranslatedMaskChar;
                while (check()) {
                    var maskDigit = mask.charAt(m),
                        valDigit = value.charAt(v),
                        translation = jMask.translation[maskDigit];

                    if (translation) {
                        if (valDigit.match(translation.pattern)) {
                            buf[addMethod](valDigit);
                            if (translation.recursive) {
                                if (resetPos === -1) {
                                    resetPos = m;
                                } else if (m === lastMaskChar && m !== resetPos) {
                                    m = resetPos - offset;
                                }

                                if (lastMaskChar === resetPos) {
                                    m -= offset;
                                }
                            }
                            m += offset;
                        } else if (valDigit === lastUntranslatedMaskChar) {
                            // matched the last untranslated (raw) mask
                            // character that we encountered
                            // likely an insert offset the mask character
                            // from the last entry; fall
                            // through and only increment v
                            maskDigitCount--;
                            lastUntranslatedMaskChar = undefined;
                        } else if (translation.optional) {
                            m += offset;
                            v -= offset;
                        } else if (translation.fallback) {
                            buf[addMethod](translation.fallback);
                            m += offset;
                            v -= offset;
                        } else {
                            p.invalid.push({ p: v, v: valDigit, e: translation.pattern });
                        }
                        v += offset;
                    } else {
                        if (!skipMaskChars) {
                            buf[addMethod](maskDigit);
                        }

                        if (valDigit === maskDigit) {
                            maskDigitPosArr.push(v);
                            v += offset;
                        } else {
                            lastUntranslatedMaskChar = maskDigit;
                            maskDigitPosArr.push(v + maskDigitCount);
                            maskDigitCount++;
                        }

                        m += offset;
                    }
                }

                var lastMaskCharDigit = mask.charAt(lastMaskChar);
                if (maskLen === valLen + 1 && !jMask.translation[lastMaskCharDigit]) {
                    buf.push(lastMaskCharDigit);
                }

                var newVal = buf.join('');
                p.mapMaskdigitPositions(newVal, maskDigitPosArr, valLen);
                return newVal;
            },
            mapMaskdigitPositions: function (newVal, maskDigitPosArr, valLen) {
                var maskDiff = options.reverse ? newVal.length - valLen : 0;
                p.maskDigitPosMap = {};
                for (var i = 0; i < maskDigitPosArr.length; i++) {
                    p.maskDigitPosMap[maskDigitPosArr[i] + maskDiff] = 1;
                }
            },
            callbacks: function (e) {
                var val = p.val(),
                    changed = val !== oldValue,
                    defaultArgs = [val, e, el, options],
                    callback = function (name, criteria, args) {
                        if (typeof options[name] === 'function' && criteria) {
                            options[name].apply(this, args);
                        }
                    };

                callback('onChange', changed === true, defaultArgs);
                callback('onKeyPress', changed === true, defaultArgs);
                callback('onComplete', val.length === mask.length, defaultArgs);
                callback('onInvalid', p.invalid.length > 0, [val, e, el, p.invalid, options]);
            }
        };

        el = $(el);
        var jMask = this, oldValue = p.val(), regexMask;

        mask = typeof mask === 'function' ? mask(p.val(), undefined, el, options) : mask;

        // public methods
        jMask.mask = mask;
        jMask.options = options;
        jMask.remove = function () {
            var caret = p.getCaret();
            if (jMask.options.placeholder) {
                el.removeAttr('placeholder');
            }
            if (el.data('mask-maxlength')) {
                el.removeAttr('maxlength');
            }
            p.destroyEvents();
            p.val(jMask.getCleanVal());
            p.setCaret(caret);
            return el;
        };

        // get value without mask
        jMask.getCleanVal = function () {
            return p.getMasked(true);
        };

        // get masked value without the value being in the input or element
        jMask.getMaskedVal = function (val) {
            return p.getMasked(false, val);
        };

        jMask.init = function (onlyMask) {
            onlyMask = onlyMask || false;
            options = options || {};

            jMask.clearIfNotMatch = $.jMaskGlobals.clearIfNotMatch;
            jMask.byPassKeys = $.jMaskGlobals.byPassKeys;
            jMask.translation = $.extend({}, $.jMaskGlobals.translation, options.translation);

            jMask = $.extend(true, {}, jMask, options);

            regexMask = p.getRegexMask();

            if (onlyMask) {
                p.events();
                p.val(p.getMasked());
            } else {
                if (options.placeholder) {
                    el.attr('placeholder', options.placeholder);
                }

                // this is necessary, otherwise if the user submit the form
                // and then press the "back" button, the autocomplete will erase
                // the data. Works fine on IE9+, FF, Opera, Safari.
                if (el.data('mask')) {
                    el.attr('autocomplete', 'off');
                }

                // detect if is necessary let the user type freely.
                // for is a lot faster than forEach.
                for (var i = 0, maxlength = true; i < mask.length; i++) {
                    var translation = jMask.translation[mask.charAt(i)];
                    if (translation && translation.recursive) {
                        maxlength = false;
                        break;
                    }
                }

                if (maxlength) {
                    el.attr('maxlength', mask.length).data('mask-maxlength', true);
                }

                p.destroyEvents();
                p.events();

                var caret = p.getCaret();
                p.val(p.getMasked());
                p.setCaret(caret);
            }
        };

        jMask.init(!el.is('input'));
    };

    $.maskWatchers = {};
    var HTMLAttributes = function () {
        var input = $(this),
            options = {},
            prefix = 'data-mask-',
            mask = input.attr('data-mask');

        if (input.attr(prefix + 'reverse')) {
            options.reverse = true;
        }

        if (input.attr(prefix + 'clearifnotmatch')) {
            options.clearIfNotMatch = true;
        }

        if (input.attr(prefix + 'selectonfocus') === 'true') {
            options.selectOnFocus = true;
        }

        if (notSameMaskObject(input, mask, options)) {
            return input.data('mask', new Mask(this, mask, options));
        }
    },
        notSameMaskObject = function (field, mask, options) {
            options = options || {};
            var maskObject = $(field).data('mask'),
                stringify = JSON.stringify,
                value = $(field).val() || $(field).text();
            try {
                if (typeof mask === 'function') {
                    mask = mask(value);
                }
                return typeof maskObject !== 'object' || stringify(maskObject.options) !== stringify(options) || maskObject.mask !== mask;
            } catch (e) { }
        },
        eventSupported = function (eventName) {
            var el = document.createElement('div'), isSupported;

            eventName = 'on' + eventName;
            isSupported = (eventName in el);

            if (!isSupported) {
                el.setAttribute(eventName, 'return;');
                isSupported = typeof el[eventName] === 'function';
            }
            el = null;

            return isSupported;
        };

    $.fn.mask = function (mask, options) {
        options = options || {};
        var selector = this.selector,
            globals = $.jMaskGlobals,
            interval = globals.watchInterval,
            watchInputs = options.watchInputs || globals.watchInputs,
            maskFunction = function () {
                if (notSameMaskObject(this, mask, options)) {
                    return $(this).data('mask', new Mask(this, mask, options));
                }
            };

        $(this).each(maskFunction);

        if (selector && selector !== '' && watchInputs) {
            clearInterval($.maskWatchers[selector]);
            $.maskWatchers[selector] = setInterval(function () {
                $(document).find(selector).each(maskFunction);
            }, interval);
        }
        return this;
    };

    $.fn.masked = function (val) {
        return this.data('mask').getMaskedVal(val);
    };

    $.fn.unmask = function () {
        clearInterval($.maskWatchers[this.selector]);
        delete $.maskWatchers[this.selector];
        return this.each(function () {
            var dataMask = $(this).data('mask');
            if (dataMask) {
                dataMask.remove().removeData('mask');
            }
        });
    };

    $.fn.cleanVal = function () {
        return this.data('mask').getCleanVal();
    };

    $.applyDataMask = function (selector) {
        selector = selector || $.jMaskGlobals.maskElements;
        var $selector = (selector instanceof $) ? selector : $(selector);
        $selector.filter($.jMaskGlobals.dataMaskAttr).each(HTMLAttributes);
    };

    var globals = {
        maskElements: 'input,td,span,div',
        dataMaskAttr: '*[data-mask]',
        dataMask: true,
        watchInterval: 300,
        watchInputs: true,
        keyStrokeCompensation: 10,
        // old versions of chrome dont work great with input event
        useInput: !/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent) && eventSupported('input'),
        watchDataMask: false,
        byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
        translation: {
            '0': { pattern: /\d/ },
            '9': { pattern: /\d/, optional: true },
            '#': { pattern: /\d/, recursive: true },
            'A': { pattern: /[a-zA-Z0-9]/ },
            'S': { pattern: /[a-zA-Z]/ }
        }
    };

    $.jMaskGlobals = $.jMaskGlobals || {};
    globals = $.jMaskGlobals = $.extend(true, {}, globals, $.jMaskGlobals);

    // looking for inputs with data-mask attribute
    if (globals.dataMask) {
        $.applyDataMask();
    }

    setInterval(function () {
        if ($.jMaskGlobals.watchDataMask) {
            $.applyDataMask();
        }
    }, globals.watchInterval);
}, window.jQuery, window.Zepto));


// -------------------------OWN JQUERY FUNCTIONALITY-------------------------//

//Ocultar Informacion
jQuery.fn.collapseInformationAction = function(selector, action) {
	$(document).find(selector).each(function(key, value) {
		eval("$(value).closest('div')."+action);
	});
}

//Am to pm convert
function ConvertTimeformat(format) {
	
	var time = format;
	var hours = Number(time.match(/^(\d+)/)[1]);
	var minutes = Number(time.match(/:(\d+)/)[1]);
	var AMPM = time.match(/\s(.*)$/)[1];
	if (AMPM == "PM" && hours < 12)
		hours = hours + 12;
	if (AMPM == "AM" && hours == 12)
		hours = hours - 12;
	var sHours = hours.toString();
	var sMinutes = minutes.toString();
	if (hours < 10)
		sHours = "0" + sHours;
	if (minutes < 10)
		sMinutes = "0" + sMinutes;
	return (sHours + ":" + sMinutes + ":00");
}

function tConvert(time24h) {
	let timeString = time24h;
	let H = +timeString.substr(0, 2);
	let h = H % 12 || 12;
	let ampm = (H < 12 || H === 24) ? " AM" : " PM";
	return timeString = h + timeString.substr(2, 3) + ampm;
}

function format() {
	var number = $('.number');
	if(number.length != 0){
		for(var i = 0; i < number.length; i++){
			number[i].addEventListener('keyup', function(e){
				var element = e.target;
				var value = element.value;
				element.value = formatNumber(value);
			})
		}
	}
}

function reorderSelect(nameSelect){
	  
	  var select = $(nameSelect);
	  
	  $.each(select, function(key, value){
		  
		  $(value).html($(value).find('option:not(:first)').sort(function(x, y) {
		    // to change to descending order switch "<" for ">"
		    return $(x).text() > $(y).text() ? 1 : -1;
		  }));
		  
		  $("<option>", { value: 'Seleccione...', selected: true }).prependTo($(value));
		  
		  $(value).get(0).selectedIndex = 0;
	  });
}

var changeDateformatDDMMYY = function (input) {
    var pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
    if (!input || !input.match(pattern)) {
        return null;
    }
    return input.replace(pattern, '$3-$2-$1');
};

var changeDateformatYYMMDD = function (input) {
    var pattern = /(\d{2})\-(\d{2})\-(\d{4})/;
    if (!input || !input.match(pattern)) {
        return null;
    }
    return input.replace(pattern, '$3-$2-$1');
};

var changeDateformatMMYYYY = function (input) {
    var pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
    if (!input || !input.match(pattern)) {
        return null;
    }
    return input.replace(pattern, '$2-$4');
};

var changeDateformatYYYYMM = function (input) {
    var pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
    if (!input || !input.match(pattern)) {
        return null;
    }
    return input.replace(pattern, '$4-$2');
};


var chageMoneyFormat = function (input) {

    if (!input) {
        return "";
    }

    if ((new RegExp(/[.]/)).test(input)) {

        var number = input.replace(".", ",")

        numberArray = new Array();
        numberArray = number.split(',');

        entero = numberArray[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        return "" + entero + "," + numberArray[1];

    } else if ((new RegExp(/[,]/)).test(input)) {
        return input
    }
    else {
        return input + ',000';
    }

}

jQuery.validator.addMethod("rut", function (value, element) {
    return this.optional(element) || $.Rut.validar(value);
}, "Este campo debe ser un rut valido.");

// Obtener las opciones de un select para poder filtrarlo
jQuery.fn.getOptionsBySelect = function (array) {

    var select = this;
    var options = [];

    $(select).find('option').each(function () {
        array.push({
            value: $(this).val(),
            text: $(this).text()
        });
    });
};

// Validar Si es Menor de Edad
$.validator.addMethod(
    "underAge",
    function (value, element) {
        var from = value.split("-"); // DD MM YYYY
        // var from = value.split("/"); // DD/MM/YYYY

        var day = from[0];
        var month = from[1];
        var year = from[2];
        var age = 18;

        var mydate = new Date();
        mydate.setFullYear(year, month - 1, day);

        var currdate = new Date();
        var setDate = new Date();

        setDate.setFullYear(mydate.getFullYear() + age, month - 1, day);

        if ((currdate - setDate) > 0) {
            return true;
        } else {
            return false;
        }
    },
    "Debes ser mayor a 18 años"
);

// TODO: Mostrar/Ocultar Informacion
jQuery.fn.collapseInformation = function (selector) {
    $(document).find(selector).each(function (key, value) {
        $(value).closest('tr').toggle();
    });
}

jQuery.fn.fillSelectByService = function (URLService) {

    var select = this;

    $.ajax({
        type: "GET",
        url: URLService,
        async: false,
        dataType: "json",
        success: function (data) {

            $.each(data, function (key, registro) {
                $(".division").append(
                    '<option value=' + registro.idDivision + '>'
                    + registro.nombre + '</option>');
            });

        },
        error: function (ex) {
            alerta("Error" + ex);
        }
    });

}


// Pasado un Array insertar opciones en un select
jQuery.fn.setOptionsByArray = function(array, nameProperty1, nameProperty2) {

	var select = this;
	
	$.each(array, function(key, value) {
		$(select).append($('<option>').text(eval("value."+nameProperty1)).val(eval("value."+nameProperty2)));
	});

};

// Insertar datos en los inputs
jQuery.fn.fillDataToInputByObject = function (objectData) {
    var form = this;

    for (var key in objectData) {
        if (objectData.hasOwnProperty(key)) {
            // Encuentra input que tenga en el value el nombre del valor
            $(form).each(function (keyInput, valueInput) {

                if ($(valueInput).attr('col_name') == key) {
                    $(valueInput).val(objectData[key]);
                }

            });
        }
    }

};

// Obtener el valor de los inputs y retornar un objecto JSON
jQuery.fn.getObjectByInputs = function () {

    var objectData = new Object();

    $(this).each(function (key, value) {
        var col_name = $(this).attr('col_name');

        var col_val;

        if ($(value).hasClass('percentage')) {
            col_val = $(this).val().toString().replace(',', '.').slice(0, -1);
        }
        else if ($(value).hasClass('money')) {
            col_val = $(this).val().replace(/\./g, '');
            col_val = col_val.replace('$', '');
            col_val = col_val.replace(',', '.');
        } else if ($(value).hasClass('checkboxOption')) {
            col_val = $(this).val() == 1 ? 1 : 0;
        }
        else if ($(value).hasClass('timeWork')) {
        	if($(value).is(":visible")){
        		col_val = ConvertTimeformat($(this).val());	
        	}else{
        		col_val = $(this).val();
        	}
        }
        else {
            col_val = $(this).val();
        }

        objectData[col_name] = col_val;
    });

    return objectData;

};

// Obtener el valor de los inputs de un estado anterior y retornar un objecto
// JSON
jQuery.fn.getPreviousObjectByInputs = function () {

    var objectData = new Object();

    $(this).each(function (key, value) {

        var col_nameOld = $(this).attr('col_name');

        var col_valOld;

        if ($(value).hasClass('percentage')) {
            col_valOld = $(this).attr('original_entry').toString().replace(',', '.').slice(0, -1);
        }
        else if ($(value).hasClass('money')) {
            col_valOld = $(this).attr('original_entry')
                .replace(/\./g, '')
                .replace('$', '')
                .replace(',', '.');
        }
        else if ($(value).hasClass('checkboxOption')) {
            col_valOld = $(this).attr('original_entry') == 1 ? 1 : 0;
        }
        else {
            col_valOld = $(this).attr('original_entry');
        }

        objectData[col_nameOld] = col_valOld;

    });

    return objectData;

};




// Obtener objecto JSON por Servicio synchronous
jQuery.fn.getJSONSync = function (urlServicioPath) {

    var objectData = new Object;

    $.ajax({
        type: "GET",
        async: false,
        url: urlServicioPath,
        dataType: "json",
        success: function (data) {
            objectData = data;
        },
        error: function (ex) {
            console.log('Error:' + ex);
        }
    });

    return objectData;

};


// Renombre propiedad del Objeto
function renameProperty(object, oldName, newName) {
    // Do nothing if the names are the same
    if (oldName == newName) {
        return object;
    }
    // Check for the old property name to avoid a ReferenceError in strict mode.
    if (object.hasOwnProperty(oldName)) {
        object[newName] = object[oldName];
        delete object[oldName];
    }
    return object;
};


// Insertar objecto JSON por Servicio synchronous
jQuery.fn.setJSONSync = function (urlServicioPath, ObjectData) {

    var enviado;

    $.ajax({
        url: urlServicioPath,
        async: false,
        type: "PUT",
        data: JSON.stringify(ObjectData),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-Type", "application/json");
        },
        success: function (data) {
            enviado = data;
        },
        error: function (ex) {
            console.log("Error al Insertar: " + ex);
        }

    });

    return enviado;

};


// Obtener todos los valores formatearlos e insertarlo en input correspondiente
jQuery.fn.setJSONToInputs = function (selector, Object) {

    Object = Object;

    $(document).find(selector).each(function (key, val) {
  	
        if ($(val).hasClass('dateWork')) {
        	
            aux = eval("Object." + $(val).attr('col_name'));
            $(val).val(changeDateformatDDMMYY(aux));
        }
        else if($(val).hasClass('UF')){
        	
        	$(val).val(formatNumber(eval("Object." + $(val).attr('col_name'))).replace('$', ''));
        }
        else if ($(val).hasClass('money')) {
        	
            $(val).val(formatNumber(eval("Object." + $(val).attr('col_name'))));
        }
        else if ($(val).hasClass('checkboxOption')) {
            aux = eval("Object." + $(val).attr('col_name'));
            aux == 1 ? $(val).prop('checked', true) : $(val).prop('checked', false);
        }
        else {
        	
            $(val).val(eval("Object." + $(val).attr('col_name')));
        }

    });


};

// Colocar un Buscador en las Tablas, nameTable = nombre de la tabla;
// arrayColumns donde colocar el buscador
function filterColumnsInput(nameTable, arrayColumns) {

    var table = $('#' + nameTable).DataTable();

    table.columns(arrayColumns).every(function (key) {
        var that = this;

        var column = this;

        $(column.footer()).each(
            function (key, value) {
                var title = $(this).text();

                $(this).html(
                    '<input type="text" placeholder="Buscar por '
                    + title + '" />');
            });


        $('input', this.footer()).on('keyup change', function () {

            // Colocar Buscador por Input
            if (that.search() !== this.value) {
                that.search(this.value).draw();
            }

        });

    });

}


// Colocar un Buscador en las Tablas, nameTable = nombre de la tabla;
// arrayColumns donde colocar el buscador
function filterColumnsSelect(nameTable, arrayColumns) {

    var table = $('#' + nameTable).DataTable();

    table.columns(arrayColumns).every(function () {

        var column = this;

        var select = $('<select class="form-control input-circle"><option value=""></option></select>')
            .appendTo($(column.footer()).empty())
            .on('change', function () {

                var val = $.fn.dataTable.util.escapeRegex($(this).val());

                column.search(val ? '^' + val + '$' : '', true, false).draw();

            });

        column.data().unique().sort().each(function (d, j) {
            select.append('<option value="' + d + '">' + d + '</option>')
        });
    });

}


// ---------------------------PLUGIN VALIDATE RUT CHILENO--------------------//

/*
 * Copyright (c) 2009 José Joaquín Núñez (josejnv@gmail.com)
 * http://joaquinnunez.cl/blog/ Licensed under GPL
 * (http://www.opensource.org/licenses/gpl-2.0.php) Use only for non-commercial
 * usage.
 * 
 * Version : 0.5
 * 
 * Requires: jQuery 1.2+
 */

(function ($) {
    jQuery.fn.Rut = function (options) {
        var defaults = {
            digito_verificador: null,
            on_error: function () { },
            on_success: function () { },
            validation: true,
            format: true,
            format_on: 'change'
        };

        var opts = $.extend(defaults, options);

        this.each(function () {

            if (defaults.format) {
                jQuery(this).bind(defaults.format_on, function () {
                    jQuery(this).val(jQuery.Rut.formatear(jQuery(this).val(), defaults.digito_verificador == null));
                });
            }
            if (defaults.validation) {
                if (defaults.digito_verificador == null) {
                    jQuery(this).bind('blur', function () {
                        var rut = jQuery(this).val();
                        if (jQuery(this).val() != "" && !jQuery.Rut.validar(rut)) {
                            defaults.on_error();
                        }
                        else if (jQuery(this).val() != "") {
                            defaults.on_success();
                        }
                    });
                }
                else {
                    var id = jQuery(this).attr("id");
                    jQuery(defaults.digito_verificador).bind('blur', function () {
                        var rut = jQuery("#" + id).val() + "-" + jQuery(this).val();
                        if (jQuery(this).val() != "" && !jQuery.Rut.validar(rut)) {
                            defaults.on_error();
                        }
                        else if (jQuery(this).val() != "") {
                            defaults.on_success();
                        }
                    });
                }
            }
        });
    }
})(jQuery);

/**
 * Funciones
 */


jQuery.Rut = {

    formatear: function (Rut, digitoVerificador) {
        var sRut = new String(Rut);
        var sRutFormateado = '';
        sRut = jQuery.Rut.quitarFormato(sRut);
        if (digitoVerificador) {
            var sDV = sRut.charAt(sRut.length - 1);
            sRut = sRut.substring(0, sRut.length - 1);
        }
        while (sRut.length > 3) {
            sRutFormateado = "." + sRut.substr(sRut.length - 3) + sRutFormateado;
            sRut = sRut.substring(0, sRut.length - 3);
        }
        sRutFormateado = sRut + sRutFormateado;
        if (sRutFormateado != "" && digitoVerificador) {
            sRutFormateado += "-" + sDV;
        }
        else if (digitoVerificador) {
            sRutFormateado += sDV;
        }

        return sRutFormateado;
    },

    quitarFormato: function (rut) {
        var strRut = new String(rut);
        while (strRut.indexOf(".") != -1) {
            strRut = strRut.replace(".", "");
        }
        while (strRut.indexOf("-") != -1) {
            strRut = strRut.replace("-", "");
        }

        return strRut;
    },

    digitoValido: function (dv) {
        if (dv != '0' && dv != '1' && dv != '2' && dv != '3' && dv != '4'
            && dv != '5' && dv != '6' && dv != '7' && dv != '8' && dv != '9'
            && dv != 'k' && dv != 'K') {
            return false;
        }
        return true;
    },

    digitoCorrecto: function (crut) {
        largo = crut.length;
        if (largo < 2) {
            return false;
        }
        if (largo > 2) {
            rut = crut.substring(0, largo - 1);
        }
        else {
            rut = crut.charAt(0);
        }
        dv = crut.charAt(largo - 1);
        jQuery.Rut.digitoValido(dv);

        if (rut == null || dv == null) {
            return 0;
        }

        dvr = jQuery.Rut.getDigito(rut);

        if (dvr != dv.toLowerCase()) {
            return false;
        }
        return true;
    },

    getDigito: function (rut) {
        var dvr = '0';
        suma = 0;
        mul = 2;
        for (i = rut.length - 1; i >= 0; i--) {
            suma = suma + rut.charAt(i) * mul;
            if (mul == 7) {
                mul = 2;
            }
            else {
                mul++;
            }
        }
        res = suma % 11;
        if (res == 1) {
            return 'k';
        }
        else if (res == 0) {
            return '0';
        }
        else {
            return 11 - res;
        }
    },

    validar: function (texto) {
        texto = jQuery.Rut.quitarFormato(texto);
        largo = texto.length;



        // rut muy corto
        if (largo < 2) {
            return false;
        }

        // verifica que los numeros correspondan a los de rut
        for (i = 0; i < largo; i++) {
            // numero o letra que no corresponda a los del rut
            if (!jQuery.Rut.digitoValido(texto.charAt(i))) {
                return false;
            }
        }

        var invertido = "";
        for (i = (largo - 1), j = 0; i >= 0; i-- , j++) {
            invertido = invertido + texto.charAt(i);
        }
        var dtexto = "";
        dtexto = dtexto + invertido.charAt(0);
        dtexto = dtexto + '-';
        cnt = 0;

        for (i = 1, j = 2; i < largo; i++ , j++) {
            if (cnt == 3) {
                dtexto = dtexto + '.';
                j++;
                dtexto = dtexto + invertido.charAt(i);
                cnt = 1;
            }
            else {
                dtexto = dtexto + invertido.charAt(i);
                cnt++;
            }
        }

        invertido = "";
        for (i = (dtexto.length - 1), j = 0; i >= 0; i-- , j++) {
            invertido = invertido + dtexto.charAt(i);
        }

        if (jQuery.Rut.digitoCorrecto(texto)) {
            return true;
        }
        return false;
    }
};

// ----------------------JQUERY CURRENCY CONVERTED--------------//
(function ($) {
$.formatCurrency = {}; $.formatCurrency.regions = []; $.formatCurrency.regions[""] = { symbol: "$", positiveFormat: "%s%n", negativeFormat: "(%s%n)", decimalSymbol: ".", digitGroupSymbol: ",", groupDigits: true };
    $.fn.formatCurrency = function (destination, settings) {
        if (arguments.length == 1 && typeof destination !== "string") {
            settings = destination; destination = false
        } var defaults = { name: "formatCurrency", colorize: false, region: "", global: true, roundToDecimalPlace: 2, eventOnDecimalsEntered: false }; defaults = $.extend(defaults, $.formatCurrency.regions[""]);
        settings = $.extend(defaults, settings); if (settings.region.length > 0) { settings = $.extend(settings, getRegionOrCulture(settings.region)) } settings.regex = generateRegex(settings);
        return this.each(function () {
            $this = $(this); var num = "0"; num = $this[$this.is("input, select, textarea") ? "val" : "html"](); if (num.search("\\(") >= 0) {
                num = "-" + num
            } if (num === "" || (num === "-" && settings.roundToDecimalPlace === -1)) { return } if (isNaN(num)) {
                num = num.replace(settings.regex, ""); if (num === "" || (num === "-" && settings.roundToDecimalPlace === -1)) {
                    return
                } if (settings.decimalSymbol != ".") { num = num.replace(settings.decimalSymbol, ".") } if (isNaN(num)) { num = "0" }
            } var numParts = String(num).split("."); var isPositive = (num == Math.abs(num));
            var hasDecimals = (numParts.length > 1); var decimals = (hasDecimals ? numParts[1].toString() : "0"); var originalDecimals = decimals; num = Math.abs(numParts[0]);
            num = isNaN(num) ? 0 : num; if (settings.roundToDecimalPlace >= 0) {
                decimals = parseFloat("1." + decimals); decimals = decimals.toFixed(settings.roundToDecimalPlace);
                if (decimals.substring(0, 1) == "2") { num = Number(num) + 1 } decimals = decimals.substring(2)
            } num = String(num); if (settings.groupDigits) {
                for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3);
                    i++) { num = num.substring(0, num.length - (4 * i + 3)) + settings.digitGroupSymbol + num.substring(num.length - (4 * i + 3)) }
            } if ((hasDecimals && settings.roundToDecimalPlace == -1) || settings.roundToDecimalPlace > 0) {
                num += settings.decimalSymbol + decimals
            } var format = isPositive ? settings.positiveFormat : settings.negativeFormat; var money = format.replace(/%s/g, settings.symbol); money = money.replace(/%n/g, num);
            var $destination = $([]); if (!destination) { $destination = $this } else { $destination = $(destination) } $destination[$destination.is("input, select, textarea") ? "val" : "html"](money);
            if (hasDecimals && settings.eventOnDecimalsEntered && originalDecimals.length > settings.roundToDecimalPlace) {
                $destination.trigger("decimalsEntered", originalDecimals)
            } if (settings.colorize) { $destination.css("color", isPositive ? "black" : "red") }
        })
    }; $.fn.toNumber = function (settings) {
        var defaults = $.extend({ name: "toNumber", region: "", global: true }, $.formatCurrency.regions[""]);
        settings = jQuery.extend(defaults, settings); if (settings.region.length > 0) { settings = $.extend(settings, getRegionOrCulture(settings.region)) } settings.regex = generateRegex(settings);
        return this.each(function () {
            var method = $(this).is("input, select, textarea") ? "val" : "html"; $(this)[method]($(this)[method]().replace("(", "(-").replace(settings.regex, ""))
        })
    }; $.fn.asNumber = function (settings) {
        var defaults = $.extend({ name: "asNumber", region: "", parse: true, parseType: "Float", global: true }, $.formatCurrency.regions[""]);
        settings = jQuery.extend(defaults, settings); if (settings.region.length > 0) { settings = $.extend(settings, getRegionOrCulture(settings.region)) } settings.regex = generateRegex(settings);
        settings.parseType = validateParseType(settings.parseType); var method = $(this).is("input, select, textarea") ? "val" : "html"; var num = $(this)[method]();
        num = num ? num : ""; num = num.replace("(", "(-"); num = num.replace(settings.regex, ""); if (!settings.parse) { return num } if (num.length == 0) { num = "0" } if (settings.decimalSymbol != ".") {
            num = num.replace(settings.decimalSymbol, ".")
        } return window["parse" + settings.parseType](num)
    }; function getRegionOrCulture(region) {
        var regionInfo = $.formatCurrency.regions[region]; if (regionInfo) {
            return regionInfo
        } else { if (/(\w+)-(\w+)/g.test(region)) { var culture = region.replace(/(\w+)-(\w+)/g, "$1"); return $.formatCurrency.regions[culture] } } return null
    } function validateParseType(parseType) {
        switch (parseType.toLowerCase()) {
            case "int": return "Int";
            case "float": return "Float"; default: throw "invalid parseType"
        }
    } function generateRegex(settings) {
        if (settings.symbol === "") {
            return new RegExp("[^\\d" + settings.decimalSymbol + "-]", "g")
        } else { var symbol = settings.symbol.replace("$", "\\$").replace(".", "\\."); return new RegExp(symbol + "|[^\\d" + settings.decimalSymbol + "-]", "g") }
    }
})(jQuery);

// ----------------------JQUERY PLUGIN FLOT---------------------//
/*
 * Javascript plotting library for jQuery, version 0.8.3.
 * 
 * Copyright (c) 2007-2014 IOLA and Ole Laursen. Licensed under the MIT license.
 * 
 */
(function ($) { $.color = {}; $.color.make = function (r, g, b, a) { var o = {}; o.r = r || 0; o.g = g || 0; o.b = b || 0; o.a = a != null ? a : 1; o.add = function (c, d) { for (var i = 0; i < c.length; ++i)o[c.charAt(i)] += d; return o.normalize() }; o.scale = function (c, f) { for (var i = 0; i < c.length; ++i)o[c.charAt(i)] *= f; return o.normalize() }; o.toString = function () { if (o.a >= 1) { return "rgb(" + [o.r, o.g, o.b].join(",") + ")" } else { return "rgba(" + [o.r, o.g, o.b, o.a].join(",") + ")" } }; o.normalize = function () { function clamp(min, value, max) { return value < min ? min : value > max ? max : value } o.r = clamp(0, parseInt(o.r), 255); o.g = clamp(0, parseInt(o.g), 255); o.b = clamp(0, parseInt(o.b), 255); o.a = clamp(0, o.a, 1); return o }; o.clone = function () { return $.color.make(o.r, o.b, o.g, o.a) }; return o.normalize() }; $.color.extract = function (elem, css) { var c; do { c = elem.css(css).toLowerCase(); if (c != "" && c != "transparent") break; elem = elem.parent() } while (elem.length && !$.nodeName(elem.get(0), "body")); if (c == "rgba(0, 0, 0, 0)") c = "transparent"; return $.color.parse(c) }; $.color.parse = function (str) { var res, m = $.color.make; if (res = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(str)) return m(parseInt(res[1], 10), parseInt(res[2], 10), parseInt(res[3], 10)); if (res = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(str)) return m(parseInt(res[1], 10), parseInt(res[2], 10), parseInt(res[3], 10), parseFloat(res[4])); if (res = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(str)) return m(parseFloat(res[1]) * 2.55, parseFloat(res[2]) * 2.55, parseFloat(res[3]) * 2.55); if (res = /rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(str)) return m(parseFloat(res[1]) * 2.55, parseFloat(res[2]) * 2.55, parseFloat(res[3]) * 2.55, parseFloat(res[4])); if (res = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(str)) return m(parseInt(res[1], 16), parseInt(res[2], 16), parseInt(res[3], 16)); if (res = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(str)) return m(parseInt(res[1] + res[1], 16), parseInt(res[2] + res[2], 16), parseInt(res[3] + res[3], 16)); var name = $.trim(str).toLowerCase(); if (name == "transparent") return m(255, 255, 255, 0); else { res = lookupColors[name] || [0, 0, 0]; return m(res[0], res[1], res[2]) } }; var lookupColors = { aqua: [0, 255, 255], azure: [240, 255, 255], beige: [245, 245, 220], black: [0, 0, 0], blue: [0, 0, 255], brown: [165, 42, 42], cyan: [0, 255, 255], darkblue: [0, 0, 139], darkcyan: [0, 139, 139], darkgrey: [169, 169, 169], darkgreen: [0, 100, 0], darkkhaki: [189, 183, 107], darkmagenta: [139, 0, 139], darkolivegreen: [85, 107, 47], darkorange: [255, 140, 0], darkorchid: [153, 50, 204], darkred: [139, 0, 0], darksalmon: [233, 150, 122], darkviolet: [148, 0, 211], fuchsia: [255, 0, 255], gold: [255, 215, 0], green: [0, 128, 0], indigo: [75, 0, 130], khaki: [240, 230, 140], lightblue: [173, 216, 230], lightcyan: [224, 255, 255], lightgreen: [144, 238, 144], lightgrey: [211, 211, 211], lightpink: [255, 182, 193], lightyellow: [255, 255, 224], lime: [0, 255, 0], magenta: [255, 0, 255], maroon: [128, 0, 0], navy: [0, 0, 128], olive: [128, 128, 0], orange: [255, 165, 0], pink: [255, 192, 203], purple: [128, 0, 128], violet: [128, 0, 128], red: [255, 0, 0], silver: [192, 192, 192], white: [255, 255, 255], yellow: [255, 255, 0] } })(jQuery); (function ($) {
    var hasOwnProperty = Object.prototype.hasOwnProperty; if (!$.fn.detach) { $.fn.detach = function () { return this.each(function () { if (this.parentNode) { this.parentNode.removeChild(this) } }) } } function Canvas(cls, container) { var element = container.children("." + cls)[0]; if (element == null) { element = document.createElement("canvas"); element.className = cls; $(element).css({ direction: "ltr", position: "absolute", left: 0, top: 0 }).appendTo(container); if (!element.getContext) { if (window.G_vmlCanvasManager) { element = window.G_vmlCanvasManager.initElement(element) } else { throw new Error("Canvas is not available. If you're using IE with a fall-back such as Excanvas, then there's either a mistake in your conditional include, or the page has no DOCTYPE and is rendering in Quirks Mode.") } } } this.element = element; var context = this.context = element.getContext("2d"); var devicePixelRatio = window.devicePixelRatio || 1, backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1; this.pixelRatio = devicePixelRatio / backingStoreRatio; this.resize(container.width(), container.height()); this.textContainer = null; this.text = {}; this._textCache = {} } Canvas.prototype.resize = function (width, height) { if (width <= 0 || height <= 0) { throw new Error("Invalid dimensions for plot, width = " + width + ", height = " + height) } var element = this.element, context = this.context, pixelRatio = this.pixelRatio; if (this.width != width) { element.width = width * pixelRatio; element.style.width = width + "px"; this.width = width } if (this.height != height) { element.height = height * pixelRatio; element.style.height = height + "px"; this.height = height } context.restore(); context.save(); context.scale(pixelRatio, pixelRatio) }; Canvas.prototype.clear = function () { this.context.clearRect(0, 0, this.width, this.height) }; Canvas.prototype.render = function () { var cache = this._textCache; for (var layerKey in cache) { if (hasOwnProperty.call(cache, layerKey)) { var layer = this.getTextLayer(layerKey), layerCache = cache[layerKey]; layer.hide(); for (var styleKey in layerCache) { if (hasOwnProperty.call(layerCache, styleKey)) { var styleCache = layerCache[styleKey]; for (var key in styleCache) { if (hasOwnProperty.call(styleCache, key)) { var positions = styleCache[key].positions; for (var i = 0, position; position = positions[i]; i++) { if (position.active) { if (!position.rendered) { layer.append(position.element); position.rendered = true } } else { positions.splice(i--, 1); if (position.rendered) { position.element.detach() } } } if (positions.length == 0) { delete styleCache[key] } } } } } layer.show() } } }; Canvas.prototype.getTextLayer = function (classes) { var layer = this.text[classes]; if (layer == null) { if (this.textContainer == null) { this.textContainer = $("<div class='flot-text'></div>").css({ position: "absolute", top: 0, left: 0, bottom: 0, right: 0, "font-size": "smaller", color: "#545454" }).insertAfter(this.element) } layer = this.text[classes] = $("<div></div>").addClass(classes).css({ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }).appendTo(this.textContainer) } return layer }; Canvas.prototype.getTextInfo = function (layer, text, font, angle, width) { var textStyle, layerCache, styleCache, info; text = "" + text; if (typeof font === "object") { textStyle = font.style + " " + font.variant + " " + font.weight + " " + font.size + "px/" + font.lineHeight + "px " + font.family } else { textStyle = font } layerCache = this._textCache[layer]; if (layerCache == null) { layerCache = this._textCache[layer] = {} } styleCache = layerCache[textStyle]; if (styleCache == null) { styleCache = layerCache[textStyle] = {} } info = styleCache[text]; if (info == null) { var element = $("<div></div>").html(text).css({ position: "absolute", "max-width": width, top: -9999 }).appendTo(this.getTextLayer(layer)); if (typeof font === "object") { element.css({ font: textStyle, color: font.color }) } else if (typeof font === "string") { element.addClass(font) } info = styleCache[text] = { width: element.outerWidth(true), height: element.outerHeight(true), element: element, positions: [] }; element.detach() } return info }; Canvas.prototype.addText = function (layer, x, y, text, font, angle, width, halign, valign) { var info = this.getTextInfo(layer, text, font, angle, width), positions = info.positions; if (halign == "center") { x -= info.width / 2 } else if (halign == "right") { x -= info.width } if (valign == "middle") { y -= info.height / 2 } else if (valign == "bottom") { y -= info.height } for (var i = 0, position; position = positions[i]; i++) { if (position.x == x && position.y == y) { position.active = true; return } } position = { active: true, rendered: false, element: positions.length ? info.element.clone() : info.element, x: x, y: y }; positions.push(position); position.element.css({ top: Math.round(y), left: Math.round(x), "text-align": halign }) }; Canvas.prototype.removeText = function (layer, x, y, text, font, angle) { if (text == null) { var layerCache = this._textCache[layer]; if (layerCache != null) { for (var styleKey in layerCache) { if (hasOwnProperty.call(layerCache, styleKey)) { var styleCache = layerCache[styleKey]; for (var key in styleCache) { if (hasOwnProperty.call(styleCache, key)) { var positions = styleCache[key].positions; for (var i = 0, position; position = positions[i]; i++) { position.active = false } } } } } } } else { var positions = this.getTextInfo(layer, text, font, angle).positions; for (var i = 0, position; position = positions[i]; i++) { if (position.x == x && position.y == y) { position.active = false } } } }; function Plot(placeholder, data_, options_, plugins) {
        var series = [], options = { colors: ["#edc240", "#afd8f8", "#cb4b4b", "#4da74d", "#9440ed"], legend: { show: true, noColumns: 1, labelFormatter: null, labelBoxBorderColor: "#ccc", container: null, position: "ne", margin: 5, backgroundColor: null, backgroundOpacity: .85, sorted: null }, xaxis: { show: null, position: "bottom", mode: null, font: null, color: null, tickColor: null, transform: null, inverseTransform: null, min: null, max: null, autoscaleMargin: null, ticks: null, tickFormatter: null, labelWidth: null, labelHeight: null, reserveSpace: null, tickLength: null, alignTicksWithAxis: null, tickDecimals: null, tickSize: null, minTickSize: null }, yaxis: { autoscaleMargin: .02, position: "left" }, xaxes: [], yaxes: [], series: { points: { show: false, radius: 3, lineWidth: 2, fill: true, fillColor: "#ffffff", symbol: "circle" }, lines: { lineWidth: 2, fill: false, fillColor: null, steps: false }, bars: { show: false, lineWidth: 2, barWidth: 1, fill: true, fillColor: null, align: "left", horizontal: false, zero: true }, shadowSize: 3, highlightColor: null }, grid: { show: true, aboveData: false, color: "#545454", backgroundColor: null, borderColor: null, tickColor: null, margin: 0, labelMargin: 5, axisMargin: 8, borderWidth: 2, minBorderMargin: null, markings: null, markingsColor: "#f4f4f4", markingsLineWidth: 2, clickable: false, hoverable: false, autoHighlight: true, mouseActiveRadius: 10 }, interaction: { redrawOverlayInterval: 1e3 / 60 }, hooks: {} }, surface = null, overlay = null, eventHolder = null, ctx = null, octx = null, xaxes = [], yaxes = [], plotOffset = { left: 0, right: 0, top: 0, bottom: 0 }, plotWidth = 0, plotHeight = 0, hooks = { processOptions: [], processRawData: [], processDatapoints: [], processOffset: [], drawBackground: [], drawSeries: [], draw: [], bindEvents: [], drawOverlay: [], shutdown: [] }, plot = this; plot.setData = setData; plot.setupGrid = setupGrid; plot.draw = draw; plot.getPlaceholder = function () { return placeholder }; plot.getCanvas = function () { return surface.element }; plot.getPlotOffset = function () { return plotOffset }; plot.width = function () { return plotWidth }; plot.height = function () { return plotHeight }; plot.offset = function () { var o = eventHolder.offset(); o.left += plotOffset.left; o.top += plotOffset.top; return o }; plot.getData = function () { return series }; plot.getAxes = function () { var res = {}, i; $.each(xaxes.concat(yaxes), function (_, axis) { if (axis) res[axis.direction + (axis.n != 1 ? axis.n : "") + "axis"] = axis }); return res }; plot.getXAxes = function () { return xaxes }; plot.getYAxes = function () { return yaxes }; plot.c2p = canvasToAxisCoords; plot.p2c = axisToCanvasCoords; plot.getOptions = function () { return options }; plot.highlight = highlight; plot.unhighlight = unhighlight; plot.triggerRedrawOverlay = triggerRedrawOverlay; plot.pointOffset = function (point) { return { left: parseInt(xaxes[axisNumber(point, "x") - 1].p2c(+point.x) + plotOffset.left, 10), top: parseInt(yaxes[axisNumber(point, "y") - 1].p2c(+point.y) + plotOffset.top, 10) } }; plot.shutdown = shutdown; plot.destroy = function () { shutdown(); placeholder.removeData("plot").empty(); series = []; options = null; surface = null; overlay = null; eventHolder = null; ctx = null; octx = null; xaxes = []; yaxes = []; hooks = null; highlights = []; plot = null }; plot.resize = function () { var width = placeholder.width(), height = placeholder.height(); surface.resize(width, height); overlay.resize(width, height) }; plot.hooks = hooks; initPlugins(plot); parseOptions(options_); setupCanvases(); setData(data_); setupGrid(); draw(); bindEvents(); function executeHooks(hook, args) { args = [plot].concat(args); for (var i = 0; i < hook.length; ++i)hook[i].apply(this, args) } function initPlugins() { var classes = { Canvas: Canvas }; for (var i = 0; i < plugins.length; ++i) { var p = plugins[i]; p.init(plot, classes); if (p.options) $.extend(true, options, p.options) } } function parseOptions(opts) { $.extend(true, options, opts); if (opts && opts.colors) { options.colors = opts.colors } if (options.xaxis.color == null) options.xaxis.color = $.color.parse(options.grid.color).scale("a", .22).toString(); if (options.yaxis.color == null) options.yaxis.color = $.color.parse(options.grid.color).scale("a", .22).toString(); if (options.xaxis.tickColor == null) options.xaxis.tickColor = options.grid.tickColor || options.xaxis.color; if (options.yaxis.tickColor == null) options.yaxis.tickColor = options.grid.tickColor || options.yaxis.color; if (options.grid.borderColor == null) options.grid.borderColor = options.grid.color; if (options.grid.tickColor == null) options.grid.tickColor = $.color.parse(options.grid.color).scale("a", .22).toString(); var i, axisOptions, axisCount, fontSize = placeholder.css("font-size"), fontSizeDefault = fontSize ? +fontSize.replace("px", "") : 13, fontDefaults = { style: placeholder.css("font-style"), size: Math.round(.8 * fontSizeDefault), variant: placeholder.css("font-variant"), weight: placeholder.css("font-weight"), family: placeholder.css("font-family") }; axisCount = options.xaxes.length || 1; for (i = 0; i < axisCount; ++i) { axisOptions = options.xaxes[i]; if (axisOptions && !axisOptions.tickColor) { axisOptions.tickColor = axisOptions.color } axisOptions = $.extend(true, {}, options.xaxis, axisOptions); options.xaxes[i] = axisOptions; if (axisOptions.font) { axisOptions.font = $.extend({}, fontDefaults, axisOptions.font); if (!axisOptions.font.color) { axisOptions.font.color = axisOptions.color } if (!axisOptions.font.lineHeight) { axisOptions.font.lineHeight = Math.round(axisOptions.font.size * 1.15) } } } axisCount = options.yaxes.length || 1; for (i = 0; i < axisCount; ++i) { axisOptions = options.yaxes[i]; if (axisOptions && !axisOptions.tickColor) { axisOptions.tickColor = axisOptions.color } axisOptions = $.extend(true, {}, options.yaxis, axisOptions); options.yaxes[i] = axisOptions; if (axisOptions.font) { axisOptions.font = $.extend({}, fontDefaults, axisOptions.font); if (!axisOptions.font.color) { axisOptions.font.color = axisOptions.color } if (!axisOptions.font.lineHeight) { axisOptions.font.lineHeight = Math.round(axisOptions.font.size * 1.15) } } } if (options.xaxis.noTicks && options.xaxis.ticks == null) options.xaxis.ticks = options.xaxis.noTicks; if (options.yaxis.noTicks && options.yaxis.ticks == null) options.yaxis.ticks = options.yaxis.noTicks; if (options.x2axis) { options.xaxes[1] = $.extend(true, {}, options.xaxis, options.x2axis); options.xaxes[1].position = "top"; if (options.x2axis.min == null) { options.xaxes[1].min = null } if (options.x2axis.max == null) { options.xaxes[1].max = null } } if (options.y2axis) { options.yaxes[1] = $.extend(true, {}, options.yaxis, options.y2axis); options.yaxes[1].position = "right"; if (options.y2axis.min == null) { options.yaxes[1].min = null } if (options.y2axis.max == null) { options.yaxes[1].max = null } } if (options.grid.coloredAreas) options.grid.markings = options.grid.coloredAreas; if (options.grid.coloredAreasColor) options.grid.markingsColor = options.grid.coloredAreasColor; if (options.lines) $.extend(true, options.series.lines, options.lines); if (options.points) $.extend(true, options.series.points, options.points); if (options.bars) $.extend(true, options.series.bars, options.bars); if (options.shadowSize != null) options.series.shadowSize = options.shadowSize; if (options.highlightColor != null) options.series.highlightColor = options.highlightColor; for (i = 0; i < options.xaxes.length; ++i)getOrCreateAxis(xaxes, i + 1).options = options.xaxes[i]; for (i = 0; i < options.yaxes.length; ++i)getOrCreateAxis(yaxes, i + 1).options = options.yaxes[i]; for (var n in hooks) if (options.hooks[n] && options.hooks[n].length) hooks[n] = hooks[n].concat(options.hooks[n]); executeHooks(hooks.processOptions, [options]) } function setData(d) { series = parseData(d); fillInSeriesOptions(); processData() } function parseData(d) { var res = []; for (var i = 0; i < d.length; ++i) { var s = $.extend(true, {}, options.series); if (d[i].data != null) { s.data = d[i].data; delete d[i].data; $.extend(true, s, d[i]); d[i].data = s.data } else s.data = d[i]; res.push(s) } return res } function axisNumber(obj, coord) { var a = obj[coord + "axis"]; if (typeof a == "object") a = a.n; if (typeof a != "number") a = 1; return a } function allAxes() { return $.grep(xaxes.concat(yaxes), function (a) { return a }) } function canvasToAxisCoords(pos) { var res = {}, i, axis; for (i = 0; i < xaxes.length; ++i) { axis = xaxes[i]; if (axis && axis.used) res["x" + axis.n] = axis.c2p(pos.left) } for (i = 0; i < yaxes.length; ++i) { axis = yaxes[i]; if (axis && axis.used) res["y" + axis.n] = axis.c2p(pos.top) } if (res.x1 !== undefined) res.x = res.x1; if (res.y1 !== undefined) res.y = res.y1; return res } function axisToCanvasCoords(pos) { var res = {}, i, axis, key; for (i = 0; i < xaxes.length; ++i) { axis = xaxes[i]; if (axis && axis.used) { key = "x" + axis.n; if (pos[key] == null && axis.n == 1) key = "x"; if (pos[key] != null) { res.left = axis.p2c(pos[key]); break } } } for (i = 0; i < yaxes.length; ++i) { axis = yaxes[i]; if (axis && axis.used) { key = "y" + axis.n; if (pos[key] == null && axis.n == 1) key = "y"; if (pos[key] != null) { res.top = axis.p2c(pos[key]); break } } } return res } function getOrCreateAxis(axes, number) { if (!axes[number - 1]) axes[number - 1] = { n: number, direction: axes == xaxes ? "x" : "y", options: $.extend(true, {}, axes == xaxes ? options.xaxis : options.yaxis) }; return axes[number - 1] } function fillInSeriesOptions() { var neededColors = series.length, maxIndex = -1, i; for (i = 0; i < series.length; ++i) { var sc = series[i].color; if (sc != null) { neededColors--; if (typeof sc == "number" && sc > maxIndex) { maxIndex = sc } } } if (neededColors <= maxIndex) { neededColors = maxIndex + 1 } var c, colors = [], colorPool = options.colors, colorPoolSize = colorPool.length, variation = 0; for (i = 0; i < neededColors; i++) { c = $.color.parse(colorPool[i % colorPoolSize] || "#666"); if (i % colorPoolSize == 0 && i) { if (variation >= 0) { if (variation < .5) { variation = -variation - .2 } else variation = 0 } else variation = -variation } colors[i] = c.scale("rgb", 1 + variation) } var colori = 0, s; for (i = 0; i < series.length; ++i) { s = series[i]; if (s.color == null) { s.color = colors[colori].toString(); ++colori } else if (typeof s.color == "number") s.color = colors[s.color].toString(); if (s.lines.show == null) { var v, show = true; for (v in s) if (s[v] && s[v].show) { show = false; break } if (show) s.lines.show = true } if (s.lines.zero == null) { s.lines.zero = !!s.lines.fill } s.xaxis = getOrCreateAxis(xaxes, axisNumber(s, "x")); s.yaxis = getOrCreateAxis(yaxes, axisNumber(s, "y")) } } function processData() { var topSentry = Number.POSITIVE_INFINITY, bottomSentry = Number.NEGATIVE_INFINITY, fakeInfinity = Number.MAX_VALUE, i, j, k, m, length, s, points, ps, x, y, axis, val, f, p, data, format; function updateAxis(axis, min, max) { if (min < axis.datamin && min != -fakeInfinity) axis.datamin = min; if (max > axis.datamax && max != fakeInfinity) axis.datamax = max } $.each(allAxes(), function (_, axis) { axis.datamin = topSentry; axis.datamax = bottomSentry; axis.used = false }); for (i = 0; i < series.length; ++i) { s = series[i]; s.datapoints = { points: [] }; executeHooks(hooks.processRawData, [s, s.data, s.datapoints]) } for (i = 0; i < series.length; ++i) { s = series[i]; data = s.data; format = s.datapoints.format; if (!format) { format = []; format.push({ x: true, number: true, required: true }); format.push({ y: true, number: true, required: true }); if (s.bars.show || s.lines.show && s.lines.fill) { var autoscale = !!(s.bars.show && s.bars.zero || s.lines.show && s.lines.zero); format.push({ y: true, number: true, required: false, defaultValue: 0, autoscale: autoscale }); if (s.bars.horizontal) { delete format[format.length - 1].y; format[format.length - 1].x = true } } s.datapoints.format = format } if (s.datapoints.pointsize != null) continue; s.datapoints.pointsize = format.length; ps = s.datapoints.pointsize; points = s.datapoints.points; var insertSteps = s.lines.show && s.lines.steps; s.xaxis.used = s.yaxis.used = true; for (j = k = 0; j < data.length; ++j, k += ps) { p = data[j]; var nullify = p == null; if (!nullify) { for (m = 0; m < ps; ++m) { val = p[m]; f = format[m]; if (f) { if (f.number && val != null) { val = +val; if (isNaN(val)) val = null; else if (val == Infinity) val = fakeInfinity; else if (val == -Infinity) val = -fakeInfinity } if (val == null) { if (f.required) nullify = true; if (f.defaultValue != null) val = f.defaultValue } } points[k + m] = val } } if (nullify) { for (m = 0; m < ps; ++m) { val = points[k + m]; if (val != null) { f = format[m]; if (f.autoscale !== false) { if (f.x) { updateAxis(s.xaxis, val, val) } if (f.y) { updateAxis(s.yaxis, val, val) } } } points[k + m] = null } } else { if (insertSteps && k > 0 && points[k - ps] != null && points[k - ps] != points[k] && points[k - ps + 1] != points[k + 1]) { for (m = 0; m < ps; ++m)points[k + ps + m] = points[k + m]; points[k + 1] = points[k - ps + 1]; k += ps } } } } for (i = 0; i < series.length; ++i) { s = series[i]; executeHooks(hooks.processDatapoints, [s, s.datapoints]) } for (i = 0; i < series.length; ++i) { s = series[i]; points = s.datapoints.points; ps = s.datapoints.pointsize; format = s.datapoints.format; var xmin = topSentry, ymin = topSentry, xmax = bottomSentry, ymax = bottomSentry; for (j = 0; j < points.length; j += ps) { if (points[j] == null) continue; for (m = 0; m < ps; ++m) { val = points[j + m]; f = format[m]; if (!f || f.autoscale === false || val == fakeInfinity || val == -fakeInfinity) continue; if (f.x) { if (val < xmin) xmin = val; if (val > xmax) xmax = val } if (f.y) { if (val < ymin) ymin = val; if (val > ymax) ymax = val } } } if (s.bars.show) { var delta; switch (s.bars.align) { case "left": delta = 0; break; case "right": delta = -s.bars.barWidth; break; default: delta = -s.bars.barWidth / 2 }if (s.bars.horizontal) { ymin += delta; ymax += delta + s.bars.barWidth } else { xmin += delta; xmax += delta + s.bars.barWidth } } updateAxis(s.xaxis, xmin, xmax); updateAxis(s.yaxis, ymin, ymax) } $.each(allAxes(), function (_, axis) { if (axis.datamin == topSentry) axis.datamin = null; if (axis.datamax == bottomSentry) axis.datamax = null }) } function setupCanvases() { placeholder.css("padding", 0).children().filter(function () { return !$(this).hasClass("flot-overlay") && !$(this).hasClass("flot-base") }).remove(); if (placeholder.css("position") == "static") placeholder.css("position", "relative"); surface = new Canvas("flot-base", placeholder); overlay = new Canvas("flot-overlay", placeholder); ctx = surface.context; octx = overlay.context; eventHolder = $(overlay.element).unbind(); var existing = placeholder.data("plot"); if (existing) { existing.shutdown(); overlay.clear() } placeholder.data("plot", plot) } function bindEvents() { if (options.grid.hoverable) { eventHolder.mousemove(onMouseMove); eventHolder.bind("mouseleave", onMouseLeave) } if (options.grid.clickable) eventHolder.click(onClick); executeHooks(hooks.bindEvents, [eventHolder]) } function shutdown() { if (redrawTimeout) clearTimeout(redrawTimeout); eventHolder.unbind("mousemove", onMouseMove); eventHolder.unbind("mouseleave", onMouseLeave); eventHolder.unbind("click", onClick); executeHooks(hooks.shutdown, [eventHolder]) } function setTransformationHelpers(axis) { function identity(x) { return x } var s, m, t = axis.options.transform || identity, it = axis.options.inverseTransform; if (axis.direction == "x") { s = axis.scale = plotWidth / Math.abs(t(axis.max) - t(axis.min)); m = Math.min(t(axis.max), t(axis.min)) } else { s = axis.scale = plotHeight / Math.abs(t(axis.max) - t(axis.min)); s = -s; m = Math.max(t(axis.max), t(axis.min)) } if (t == identity) axis.p2c = function (p) { return (p - m) * s }; else axis.p2c = function (p) { return (t(p) - m) * s }; if (!it) axis.c2p = function (c) { return m + c / s }; else axis.c2p = function (c) { return it(m + c / s) } } function measureTickLabels(axis) { var opts = axis.options, ticks = axis.ticks || [], labelWidth = opts.labelWidth || 0, labelHeight = opts.labelHeight || 0, maxWidth = labelWidth || (axis.direction == "x" ? Math.floor(surface.width / (ticks.length || 1)) : null), legacyStyles = axis.direction + "Axis " + axis.direction + axis.n + "Axis", layer = "flot-" + axis.direction + "-axis flot-" + axis.direction + axis.n + "-axis " + legacyStyles, font = opts.font || "flot-tick-label tickLabel"; for (var i = 0; i < ticks.length; ++i) { var t = ticks[i]; if (!t.label) continue; var info = surface.getTextInfo(layer, t.label, font, null, maxWidth); labelWidth = Math.max(labelWidth, info.width); labelHeight = Math.max(labelHeight, info.height) } axis.labelWidth = opts.labelWidth || labelWidth; axis.labelHeight = opts.labelHeight || labelHeight } function allocateAxisBoxFirstPhase(axis) { var lw = axis.labelWidth, lh = axis.labelHeight, pos = axis.options.position, isXAxis = axis.direction === "x", tickLength = axis.options.tickLength, axisMargin = options.grid.axisMargin, padding = options.grid.labelMargin, innermost = true, outermost = true, first = true, found = false; $.each(isXAxis ? xaxes : yaxes, function (i, a) { if (a && (a.show || a.reserveSpace)) { if (a === axis) { found = true } else if (a.options.position === pos) { if (found) { outermost = false } else { innermost = false } } if (!found) { first = false } } }); if (outermost) { axisMargin = 0 } if (tickLength == null) { tickLength = first ? "full" : 5 } if (!isNaN(+tickLength)) padding += +tickLength; if (isXAxis) { lh += padding; if (pos == "bottom") { plotOffset.bottom += lh + axisMargin; axis.box = { top: surface.height - plotOffset.bottom, height: lh } } else { axis.box = { top: plotOffset.top + axisMargin, height: lh }; plotOffset.top += lh + axisMargin } } else { lw += padding; if (pos == "left") { axis.box = { left: plotOffset.left + axisMargin, width: lw }; plotOffset.left += lw + axisMargin } else { plotOffset.right += lw + axisMargin; axis.box = { left: surface.width - plotOffset.right, width: lw } } } axis.position = pos; axis.tickLength = tickLength; axis.box.padding = padding; axis.innermost = innermost } function allocateAxisBoxSecondPhase(axis) { if (axis.direction == "x") { axis.box.left = plotOffset.left - axis.labelWidth / 2; axis.box.width = surface.width - plotOffset.left - plotOffset.right + axis.labelWidth } else { axis.box.top = plotOffset.top - axis.labelHeight / 2; axis.box.height = surface.height - plotOffset.bottom - plotOffset.top + axis.labelHeight } } function adjustLayoutForThingsStickingOut() { var minMargin = options.grid.minBorderMargin, axis, i; if (minMargin == null) { minMargin = 0; for (i = 0; i < series.length; ++i)minMargin = Math.max(minMargin, 2 * (series[i].points.radius + series[i].points.lineWidth / 2)) } var margins = { left: minMargin, right: minMargin, top: minMargin, bottom: minMargin }; $.each(allAxes(), function (_, axis) { if (axis.reserveSpace && axis.ticks && axis.ticks.length) { if (axis.direction === "x") { margins.left = Math.max(margins.left, axis.labelWidth / 2); margins.right = Math.max(margins.right, axis.labelWidth / 2) } else { margins.bottom = Math.max(margins.bottom, axis.labelHeight / 2); margins.top = Math.max(margins.top, axis.labelHeight / 2) } } }); plotOffset.left = Math.ceil(Math.max(margins.left, plotOffset.left)); plotOffset.right = Math.ceil(Math.max(margins.right, plotOffset.right)); plotOffset.top = Math.ceil(Math.max(margins.top, plotOffset.top)); plotOffset.bottom = Math.ceil(Math.max(margins.bottom, plotOffset.bottom)) } function setupGrid() { var i, axes = allAxes(), showGrid = options.grid.show; for (var a in plotOffset) { var margin = options.grid.margin || 0; plotOffset[a] = typeof margin == "number" ? margin : margin[a] || 0 } executeHooks(hooks.processOffset, [plotOffset]); for (var a in plotOffset) { if (typeof options.grid.borderWidth == "object") { plotOffset[a] += showGrid ? options.grid.borderWidth[a] : 0 } else { plotOffset[a] += showGrid ? options.grid.borderWidth : 0 } } $.each(axes, function (_, axis) { var axisOpts = axis.options; axis.show = axisOpts.show == null ? axis.used : axisOpts.show; axis.reserveSpace = axisOpts.reserveSpace == null ? axis.show : axisOpts.reserveSpace; setRange(axis) }); if (showGrid) { var allocatedAxes = $.grep(axes, function (axis) { return axis.show || axis.reserveSpace }); $.each(allocatedAxes, function (_, axis) { setupTickGeneration(axis); setTicks(axis); snapRangeToTicks(axis, axis.ticks); measureTickLabels(axis) }); for (i = allocatedAxes.length - 1; i >= 0; --i)allocateAxisBoxFirstPhase(allocatedAxes[i]); adjustLayoutForThingsStickingOut(); $.each(allocatedAxes, function (_, axis) { allocateAxisBoxSecondPhase(axis) }) } plotWidth = surface.width - plotOffset.left - plotOffset.right; plotHeight = surface.height - plotOffset.bottom - plotOffset.top; $.each(axes, function (_, axis) { setTransformationHelpers(axis) }); if (showGrid) { drawAxisLabels() } insertLegend() } function setRange(axis) { var opts = axis.options, min = +(opts.min != null ? opts.min : axis.datamin), max = +(opts.max != null ? opts.max : axis.datamax), delta = max - min; if (delta == 0) { var widen = max == 0 ? 1 : .01; if (opts.min == null) min -= widen; if (opts.max == null || opts.min != null) max += widen } else { var margin = opts.autoscaleMargin; if (margin != null) { if (opts.min == null) { min -= delta * margin; if (min < 0 && axis.datamin != null && axis.datamin >= 0) min = 0 } if (opts.max == null) { max += delta * margin; if (max > 0 && axis.datamax != null && axis.datamax <= 0) max = 0 } } } axis.min = min; axis.max = max } function setupTickGeneration(axis) { var opts = axis.options; var noTicks; if (typeof opts.ticks == "number" && opts.ticks > 0) noTicks = opts.ticks; else noTicks = .3 * Math.sqrt(axis.direction == "x" ? surface.width : surface.height); var delta = (axis.max - axis.min) / noTicks, dec = -Math.floor(Math.log(delta) / Math.LN10), maxDec = opts.tickDecimals; if (maxDec != null && dec > maxDec) { dec = maxDec } var magn = Math.pow(10, -dec), norm = delta / magn, size; if (norm < 1.5) { size = 1 } else if (norm < 3) { size = 2; if (norm > 2.25 && (maxDec == null || dec + 1 <= maxDec)) { size = 2.5; ++dec } } else if (norm < 7.5) { size = 5 } else { size = 10 } size *= magn; if (opts.minTickSize != null && size < opts.minTickSize) { size = opts.minTickSize } axis.delta = delta; axis.tickDecimals = Math.max(0, maxDec != null ? maxDec : dec); axis.tickSize = opts.tickSize || size; if (opts.mode == "time" && !axis.tickGenerator) { throw new Error("Time mode requires the flot.time plugin.") } if (!axis.tickGenerator) { axis.tickGenerator = function (axis) { var ticks = [], start = floorInBase(axis.min, axis.tickSize), i = 0, v = Number.NaN, prev; do { prev = v; v = start + i * axis.tickSize; ticks.push(v); ++i } while (v < axis.max && v != prev); return ticks }; axis.tickFormatter = function (value, axis) { var factor = axis.tickDecimals ? Math.pow(10, axis.tickDecimals) : 1; var formatted = "" + Math.round(value * factor) / factor; if (axis.tickDecimals != null) { var decimal = formatted.indexOf("."); var precision = decimal == -1 ? 0 : formatted.length - decimal - 1; if (precision < axis.tickDecimals) { return (precision ? formatted : formatted + ".") + ("" + factor).substr(1, axis.tickDecimals - precision) } } return formatted } } if ($.isFunction(opts.tickFormatter)) axis.tickFormatter = function (v, axis) { return "" + opts.tickFormatter(v, axis) }; if (opts.alignTicksWithAxis != null) { var otherAxis = (axis.direction == "x" ? xaxes : yaxes)[opts.alignTicksWithAxis - 1]; if (otherAxis && otherAxis.used && otherAxis != axis) { var niceTicks = axis.tickGenerator(axis); if (niceTicks.length > 0) { if (opts.min == null) axis.min = Math.min(axis.min, niceTicks[0]); if (opts.max == null && niceTicks.length > 1) axis.max = Math.max(axis.max, niceTicks[niceTicks.length - 1]) } axis.tickGenerator = function (axis) { var ticks = [], v, i; for (i = 0; i < otherAxis.ticks.length; ++i) { v = (otherAxis.ticks[i].v - otherAxis.min) / (otherAxis.max - otherAxis.min); v = axis.min + v * (axis.max - axis.min); ticks.push(v) } return ticks }; if (!axis.mode && opts.tickDecimals == null) { var extraDec = Math.max(0, -Math.floor(Math.log(axis.delta) / Math.LN10) + 1), ts = axis.tickGenerator(axis); if (!(ts.length > 1 && /\..*0$/.test((ts[1] - ts[0]).toFixed(extraDec)))) axis.tickDecimals = extraDec } } } } function setTicks(axis) { var oticks = axis.options.ticks, ticks = []; if (oticks == null || typeof oticks == "number" && oticks > 0) ticks = axis.tickGenerator(axis); else if (oticks) { if ($.isFunction(oticks)) ticks = oticks(axis); else ticks = oticks } var i, v; axis.ticks = []; for (i = 0; i < ticks.length; ++i) { var label = null; var t = ticks[i]; if (typeof t == "object") { v = +t[0]; if (t.length > 1) label = t[1] } else v = +t; if (label == null) label = axis.tickFormatter(v, axis); if (!isNaN(v)) axis.ticks.push({ v: v, label: label }) } } function snapRangeToTicks(axis, ticks) { if (axis.options.autoscaleMargin && ticks.length > 0) { if (axis.options.min == null) axis.min = Math.min(axis.min, ticks[0].v); if (axis.options.max == null && ticks.length > 1) axis.max = Math.max(axis.max, ticks[ticks.length - 1].v) } } function draw() { surface.clear(); executeHooks(hooks.drawBackground, [ctx]); var grid = options.grid; if (grid.show && grid.backgroundColor) drawBackground(); if (grid.show && !grid.aboveData) { drawGrid() } for (var i = 0; i < series.length; ++i) { executeHooks(hooks.drawSeries, [ctx, series[i]]); drawSeries(series[i]) } executeHooks(hooks.draw, [ctx]); if (grid.show && grid.aboveData) { drawGrid() } surface.render(); triggerRedrawOverlay() } function extractRange(ranges, coord) { var axis, from, to, key, axes = allAxes(); for (var i = 0; i < axes.length; ++i) { axis = axes[i]; if (axis.direction == coord) { key = coord + axis.n + "axis"; if (!ranges[key] && axis.n == 1) key = coord + "axis"; if (ranges[key]) { from = ranges[key].from; to = ranges[key].to; break } } } if (!ranges[key]) { axis = coord == "x" ? xaxes[0] : yaxes[0]; from = ranges[coord + "1"]; to = ranges[coord + "2"] } if (from != null && to != null && from > to) { var tmp = from; from = to; to = tmp } return { from: from, to: to, axis: axis } } function drawBackground() { ctx.save(); ctx.translate(plotOffset.left, plotOffset.top); ctx.fillStyle = getColorOrGradient(options.grid.backgroundColor, plotHeight, 0, "rgba(255, 255, 255, 0)"); ctx.fillRect(0, 0, plotWidth, plotHeight); ctx.restore() } function drawGrid() {
            var i, axes, bw, bc; ctx.save(); ctx.translate(plotOffset.left, plotOffset.top); var markings = options.grid.markings; if (markings) {
                if ($.isFunction(markings)) { axes = plot.getAxes(); axes.xmin = axes.xaxis.min; axes.xmax = axes.xaxis.max; axes.ymin = axes.yaxis.min; axes.ymax = axes.yaxis.max; markings = markings(axes) } for (i = 0; i < markings.length; ++i) {
                    var m = markings[i], xrange = extractRange(m, "x"), yrange = extractRange(m, "y"); if (xrange.from == null) xrange.from = xrange.axis.min; if (xrange.to == null) xrange.to = xrange.axis.max;
                    if (yrange.from == null) yrange.from = yrange.axis.min; if (yrange.to == null) yrange.to = yrange.axis.max; if (xrange.to < xrange.axis.min || xrange.from > xrange.axis.max || yrange.to < yrange.axis.min || yrange.from > yrange.axis.max) continue; xrange.from = Math.max(xrange.from, xrange.axis.min); xrange.to = Math.min(xrange.to, xrange.axis.max); yrange.from = Math.max(yrange.from, yrange.axis.min); yrange.to = Math.min(yrange.to, yrange.axis.max); var xequal = xrange.from === xrange.to, yequal = yrange.from === yrange.to; if (xequal && yequal) { continue } xrange.from = Math.floor(xrange.axis.p2c(xrange.from)); xrange.to = Math.floor(xrange.axis.p2c(xrange.to)); yrange.from = Math.floor(yrange.axis.p2c(yrange.from)); yrange.to = Math.floor(yrange.axis.p2c(yrange.to)); if (xequal || yequal) { var lineWidth = m.lineWidth || options.grid.markingsLineWidth, subPixel = lineWidth % 2 ? .5 : 0; ctx.beginPath(); ctx.strokeStyle = m.color || options.grid.markingsColor; ctx.lineWidth = lineWidth; if (xequal) { ctx.moveTo(xrange.to + subPixel, yrange.from); ctx.lineTo(xrange.to + subPixel, yrange.to) } else { ctx.moveTo(xrange.from, yrange.to + subPixel); ctx.lineTo(xrange.to, yrange.to + subPixel) } ctx.stroke() } else { ctx.fillStyle = m.color || options.grid.markingsColor; ctx.fillRect(xrange.from, yrange.to, xrange.to - xrange.from, yrange.from - yrange.to) }
                }
            } axes = allAxes(); bw = options.grid.borderWidth; for (var j = 0; j < axes.length; ++j) { var axis = axes[j], box = axis.box, t = axis.tickLength, x, y, xoff, yoff; if (!axis.show || axis.ticks.length == 0) continue; ctx.lineWidth = 1; if (axis.direction == "x") { x = 0; if (t == "full") y = axis.position == "top" ? 0 : plotHeight; else y = box.top - plotOffset.top + (axis.position == "top" ? box.height : 0) } else { y = 0; if (t == "full") x = axis.position == "left" ? 0 : plotWidth; else x = box.left - plotOffset.left + (axis.position == "left" ? box.width : 0) } if (!axis.innermost) { ctx.strokeStyle = axis.options.color; ctx.beginPath(); xoff = yoff = 0; if (axis.direction == "x") xoff = plotWidth + 1; else yoff = plotHeight + 1; if (ctx.lineWidth == 1) { if (axis.direction == "x") { y = Math.floor(y) + .5 } else { x = Math.floor(x) + .5 } } ctx.moveTo(x, y); ctx.lineTo(x + xoff, y + yoff); ctx.stroke() } ctx.strokeStyle = axis.options.tickColor; ctx.beginPath(); for (i = 0; i < axis.ticks.length; ++i) { var v = axis.ticks[i].v; xoff = yoff = 0; if (isNaN(v) || v < axis.min || v > axis.max || t == "full" && (typeof bw == "object" && bw[axis.position] > 0 || bw > 0) && (v == axis.min || v == axis.max)) continue; if (axis.direction == "x") { x = axis.p2c(v); yoff = t == "full" ? -plotHeight : t; if (axis.position == "top") yoff = -yoff } else { y = axis.p2c(v); xoff = t == "full" ? -plotWidth : t; if (axis.position == "left") xoff = -xoff } if (ctx.lineWidth == 1) { if (axis.direction == "x") x = Math.floor(x) + .5; else y = Math.floor(y) + .5 } ctx.moveTo(x, y); ctx.lineTo(x + xoff, y + yoff) } ctx.stroke() } if (bw) { bc = options.grid.borderColor; if (typeof bw == "object" || typeof bc == "object") { if (typeof bw !== "object") { bw = { top: bw, right: bw, bottom: bw, left: bw } } if (typeof bc !== "object") { bc = { top: bc, right: bc, bottom: bc, left: bc } } if (bw.top > 0) { ctx.strokeStyle = bc.top; ctx.lineWidth = bw.top; ctx.beginPath(); ctx.moveTo(0 - bw.left, 0 - bw.top / 2); ctx.lineTo(plotWidth, 0 - bw.top / 2); ctx.stroke() } if (bw.right > 0) { ctx.strokeStyle = bc.right; ctx.lineWidth = bw.right; ctx.beginPath(); ctx.moveTo(plotWidth + bw.right / 2, 0 - bw.top); ctx.lineTo(plotWidth + bw.right / 2, plotHeight); ctx.stroke() } if (bw.bottom > 0) { ctx.strokeStyle = bc.bottom; ctx.lineWidth = bw.bottom; ctx.beginPath(); ctx.moveTo(plotWidth + bw.right, plotHeight + bw.bottom / 2); ctx.lineTo(0, plotHeight + bw.bottom / 2); ctx.stroke() } if (bw.left > 0) { ctx.strokeStyle = bc.left; ctx.lineWidth = bw.left; ctx.beginPath(); ctx.moveTo(0 - bw.left / 2, plotHeight + bw.bottom); ctx.lineTo(0 - bw.left / 2, 0); ctx.stroke() } } else { ctx.lineWidth = bw; ctx.strokeStyle = options.grid.borderColor; ctx.strokeRect(-bw / 2, -bw / 2, plotWidth + bw, plotHeight + bw) } } ctx.restore()
        } function drawAxisLabels() { $.each(allAxes(), function (_, axis) { var box = axis.box, legacyStyles = axis.direction + "Axis " + axis.direction + axis.n + "Axis", layer = "flot-" + axis.direction + "-axis flot-" + axis.direction + axis.n + "-axis " + legacyStyles, font = axis.options.font || "flot-tick-label tickLabel", tick, x, y, halign, valign; surface.removeText(layer); if (!axis.show || axis.ticks.length == 0) return; for (var i = 0; i < axis.ticks.length; ++i) { tick = axis.ticks[i]; if (!tick.label || tick.v < axis.min || tick.v > axis.max) continue; if (axis.direction == "x") { halign = "center"; x = plotOffset.left + axis.p2c(tick.v); if (axis.position == "bottom") { y = box.top + box.padding } else { y = box.top + box.height - box.padding; valign = "bottom" } } else { valign = "middle"; y = plotOffset.top + axis.p2c(tick.v); if (axis.position == "left") { x = box.left + box.width - box.padding; halign = "right" } else { x = box.left + box.padding } } surface.addText(layer, x, y, tick.label, font, null, null, halign, valign) } }) } function drawSeries(series) { if (series.lines.show) drawSeriesLines(series); if (series.bars.show) drawSeriesBars(series); if (series.points.show) drawSeriesPoints(series) } function drawSeriesLines(series) { function plotLine(datapoints, xoffset, yoffset, axisx, axisy) { var points = datapoints.points, ps = datapoints.pointsize, prevx = null, prevy = null; ctx.beginPath(); for (var i = ps; i < points.length; i += ps) { var x1 = points[i - ps], y1 = points[i - ps + 1], x2 = points[i], y2 = points[i + 1]; if (x1 == null || x2 == null) continue; if (y1 <= y2 && y1 < axisy.min) { if (y2 < axisy.min) continue; x1 = (axisy.min - y1) / (y2 - y1) * (x2 - x1) + x1; y1 = axisy.min } else if (y2 <= y1 && y2 < axisy.min) { if (y1 < axisy.min) continue; x2 = (axisy.min - y1) / (y2 - y1) * (x2 - x1) + x1; y2 = axisy.min } if (y1 >= y2 && y1 > axisy.max) { if (y2 > axisy.max) continue; x1 = (axisy.max - y1) / (y2 - y1) * (x2 - x1) + x1; y1 = axisy.max } else if (y2 >= y1 && y2 > axisy.max) { if (y1 > axisy.max) continue; x2 = (axisy.max - y1) / (y2 - y1) * (x2 - x1) + x1; y2 = axisy.max } if (x1 <= x2 && x1 < axisx.min) { if (x2 < axisx.min) continue; y1 = (axisx.min - x1) / (x2 - x1) * (y2 - y1) + y1; x1 = axisx.min } else if (x2 <= x1 && x2 < axisx.min) { if (x1 < axisx.min) continue; y2 = (axisx.min - x1) / (x2 - x1) * (y2 - y1) + y1; x2 = axisx.min } if (x1 >= x2 && x1 > axisx.max) { if (x2 > axisx.max) continue; y1 = (axisx.max - x1) / (x2 - x1) * (y2 - y1) + y1; x1 = axisx.max } else if (x2 >= x1 && x2 > axisx.max) { if (x1 > axisx.max) continue; y2 = (axisx.max - x1) / (x2 - x1) * (y2 - y1) + y1; x2 = axisx.max } if (x1 != prevx || y1 != prevy) ctx.moveTo(axisx.p2c(x1) + xoffset, axisy.p2c(y1) + yoffset); prevx = x2; prevy = y2; ctx.lineTo(axisx.p2c(x2) + xoffset, axisy.p2c(y2) + yoffset) } ctx.stroke() } function plotLineArea(datapoints, axisx, axisy) { var points = datapoints.points, ps = datapoints.pointsize, bottom = Math.min(Math.max(0, axisy.min), axisy.max), i = 0, top, areaOpen = false, ypos = 1, segmentStart = 0, segmentEnd = 0; while (true) { if (ps > 0 && i > points.length + ps) break; i += ps; var x1 = points[i - ps], y1 = points[i - ps + ypos], x2 = points[i], y2 = points[i + ypos]; if (areaOpen) { if (ps > 0 && x1 != null && x2 == null) { segmentEnd = i; ps = -ps; ypos = 2; continue } if (ps < 0 && i == segmentStart + ps) { ctx.fill(); areaOpen = false; ps = -ps; ypos = 1; i = segmentStart = segmentEnd + ps; continue } } if (x1 == null || x2 == null) continue; if (x1 <= x2 && x1 < axisx.min) { if (x2 < axisx.min) continue; y1 = (axisx.min - x1) / (x2 - x1) * (y2 - y1) + y1; x1 = axisx.min } else if (x2 <= x1 && x2 < axisx.min) { if (x1 < axisx.min) continue; y2 = (axisx.min - x1) / (x2 - x1) * (y2 - y1) + y1; x2 = axisx.min } if (x1 >= x2 && x1 > axisx.max) { if (x2 > axisx.max) continue; y1 = (axisx.max - x1) / (x2 - x1) * (y2 - y1) + y1; x1 = axisx.max } else if (x2 >= x1 && x2 > axisx.max) { if (x1 > axisx.max) continue; y2 = (axisx.max - x1) / (x2 - x1) * (y2 - y1) + y1; x2 = axisx.max } if (!areaOpen) { ctx.beginPath(); ctx.moveTo(axisx.p2c(x1), axisy.p2c(bottom)); areaOpen = true } if (y1 >= axisy.max && y2 >= axisy.max) { ctx.lineTo(axisx.p2c(x1), axisy.p2c(axisy.max)); ctx.lineTo(axisx.p2c(x2), axisy.p2c(axisy.max)); continue } else if (y1 <= axisy.min && y2 <= axisy.min) { ctx.lineTo(axisx.p2c(x1), axisy.p2c(axisy.min)); ctx.lineTo(axisx.p2c(x2), axisy.p2c(axisy.min)); continue } var x1old = x1, x2old = x2; if (y1 <= y2 && y1 < axisy.min && y2 >= axisy.min) { x1 = (axisy.min - y1) / (y2 - y1) * (x2 - x1) + x1; y1 = axisy.min } else if (y2 <= y1 && y2 < axisy.min && y1 >= axisy.min) { x2 = (axisy.min - y1) / (y2 - y1) * (x2 - x1) + x1; y2 = axisy.min } if (y1 >= y2 && y1 > axisy.max && y2 <= axisy.max) { x1 = (axisy.max - y1) / (y2 - y1) * (x2 - x1) + x1; y1 = axisy.max } else if (y2 >= y1 && y2 > axisy.max && y1 <= axisy.max) { x2 = (axisy.max - y1) / (y2 - y1) * (x2 - x1) + x1; y2 = axisy.max } if (x1 != x1old) { ctx.lineTo(axisx.p2c(x1old), axisy.p2c(y1)) } ctx.lineTo(axisx.p2c(x1), axisy.p2c(y1)); ctx.lineTo(axisx.p2c(x2), axisy.p2c(y2)); if (x2 != x2old) { ctx.lineTo(axisx.p2c(x2), axisy.p2c(y2)); ctx.lineTo(axisx.p2c(x2old), axisy.p2c(y2)) } } } ctx.save(); ctx.translate(plotOffset.left, plotOffset.top); ctx.lineJoin = "round"; var lw = series.lines.lineWidth, sw = series.shadowSize; if (lw > 0 && sw > 0) { ctx.lineWidth = sw; ctx.strokeStyle = "rgba(0,0,0,0.1)"; var angle = Math.PI / 18; plotLine(series.datapoints, Math.sin(angle) * (lw / 2 + sw / 2), Math.cos(angle) * (lw / 2 + sw / 2), series.xaxis, series.yaxis); ctx.lineWidth = sw / 2; plotLine(series.datapoints, Math.sin(angle) * (lw / 2 + sw / 4), Math.cos(angle) * (lw / 2 + sw / 4), series.xaxis, series.yaxis) } ctx.lineWidth = lw; ctx.strokeStyle = series.color; var fillStyle = getFillStyle(series.lines, series.color, 0, plotHeight); if (fillStyle) { ctx.fillStyle = fillStyle; plotLineArea(series.datapoints, series.xaxis, series.yaxis) } if (lw > 0) plotLine(series.datapoints, 0, 0, series.xaxis, series.yaxis); ctx.restore() } function drawSeriesPoints(series) { function plotPoints(datapoints, radius, fillStyle, offset, shadow, axisx, axisy, symbol) { var points = datapoints.points, ps = datapoints.pointsize; for (var i = 0; i < points.length; i += ps) { var x = points[i], y = points[i + 1]; if (x == null || x < axisx.min || x > axisx.max || y < axisy.min || y > axisy.max) continue; ctx.beginPath(); x = axisx.p2c(x); y = axisy.p2c(y) + offset; if (symbol == "circle") ctx.arc(x, y, radius, 0, shadow ? Math.PI : Math.PI * 2, false); else symbol(ctx, x, y, radius, shadow); ctx.closePath(); if (fillStyle) { ctx.fillStyle = fillStyle; ctx.fill() } ctx.stroke() } } ctx.save(); ctx.translate(plotOffset.left, plotOffset.top); var lw = series.points.lineWidth, sw = series.shadowSize, radius = series.points.radius, symbol = series.points.symbol; if (lw == 0) lw = 1e-4; if (lw > 0 && sw > 0) { var w = sw / 2; ctx.lineWidth = w; ctx.strokeStyle = "rgba(0,0,0,0.1)"; plotPoints(series.datapoints, radius, null, w + w / 2, true, series.xaxis, series.yaxis, symbol); ctx.strokeStyle = "rgba(0,0,0,0.2)"; plotPoints(series.datapoints, radius, null, w / 2, true, series.xaxis, series.yaxis, symbol) } ctx.lineWidth = lw; ctx.strokeStyle = series.color; plotPoints(series.datapoints, radius, getFillStyle(series.points, series.color), 0, false, series.xaxis, series.yaxis, symbol); ctx.restore() } function drawBar(x, y, b, barLeft, barRight, fillStyleCallback, axisx, axisy, c, horizontal, lineWidth) { var left, right, bottom, top, drawLeft, drawRight, drawTop, drawBottom, tmp; if (horizontal) { drawBottom = drawRight = drawTop = true; drawLeft = false; left = b; right = x; top = y + barLeft; bottom = y + barRight; if (right < left) { tmp = right; right = left; left = tmp; drawLeft = true; drawRight = false } } else { drawLeft = drawRight = drawTop = true; drawBottom = false; left = x + barLeft; right = x + barRight; bottom = b; top = y; if (top < bottom) { tmp = top; top = bottom; bottom = tmp; drawBottom = true; drawTop = false } } if (right < axisx.min || left > axisx.max || top < axisy.min || bottom > axisy.max) return; if (left < axisx.min) { left = axisx.min; drawLeft = false } if (right > axisx.max) { right = axisx.max; drawRight = false } if (bottom < axisy.min) { bottom = axisy.min; drawBottom = false } if (top > axisy.max) { top = axisy.max; drawTop = false } left = axisx.p2c(left); bottom = axisy.p2c(bottom); right = axisx.p2c(right); top = axisy.p2c(top); if (fillStyleCallback) { c.fillStyle = fillStyleCallback(bottom, top); c.fillRect(left, top, right - left, bottom - top) } if (lineWidth > 0 && (drawLeft || drawRight || drawTop || drawBottom)) { c.beginPath(); c.moveTo(left, bottom); if (drawLeft) c.lineTo(left, top); else c.moveTo(left, top); if (drawTop) c.lineTo(right, top); else c.moveTo(right, top); if (drawRight) c.lineTo(right, bottom); else c.moveTo(right, bottom); if (drawBottom) c.lineTo(left, bottom); else c.moveTo(left, bottom); c.stroke() } } function drawSeriesBars(series) { function plotBars(datapoints, barLeft, barRight, fillStyleCallback, axisx, axisy) { var points = datapoints.points, ps = datapoints.pointsize; for (var i = 0; i < points.length; i += ps) { if (points[i] == null) continue; drawBar(points[i], points[i + 1], points[i + 2], barLeft, barRight, fillStyleCallback, axisx, axisy, ctx, series.bars.horizontal, series.bars.lineWidth) } } ctx.save(); ctx.translate(plotOffset.left, plotOffset.top); ctx.lineWidth = series.bars.lineWidth; ctx.strokeStyle = series.color; var barLeft; switch (series.bars.align) { case "left": barLeft = 0; break; case "right": barLeft = -series.bars.barWidth; break; default: barLeft = -series.bars.barWidth / 2 }var fillStyleCallback = series.bars.fill ? function (bottom, top) { return getFillStyle(series.bars, series.color, bottom, top) } : null; plotBars(series.datapoints, barLeft, barLeft + series.bars.barWidth, fillStyleCallback, series.xaxis, series.yaxis); ctx.restore() } function getFillStyle(filloptions, seriesColor, bottom, top) { var fill = filloptions.fill; if (!fill) return null; if (filloptions.fillColor) return getColorOrGradient(filloptions.fillColor, bottom, top, seriesColor); var c = $.color.parse(seriesColor); c.a = typeof fill == "number" ? fill : .4; c.normalize(); return c.toString() } function insertLegend() { if (options.legend.container != null) { $(options.legend.container).html("") } else { placeholder.find(".legend").remove() } if (!options.legend.show) { return } var fragments = [], entries = [], rowStarted = false, lf = options.legend.labelFormatter, s, label; for (var i = 0; i < series.length; ++i) { s = series[i]; if (s.label) { label = lf ? lf(s.label, s) : s.label; if (label) { entries.push({ label: label, color: s.color }) } } } if (options.legend.sorted) { if ($.isFunction(options.legend.sorted)) { entries.sort(options.legend.sorted) } else if (options.legend.sorted == "reverse") { entries.reverse() } else { var ascending = options.legend.sorted != "descending"; entries.sort(function (a, b) { return a.label == b.label ? 0 : a.label < b.label != ascending ? 1 : -1 }) } } for (var i = 0; i < entries.length; ++i) { var entry = entries[i]; if (i % options.legend.noColumns == 0) { if (rowStarted) fragments.push("</tr>"); fragments.push("<tr>"); rowStarted = true } fragments.push('<td class="legendColorBox"><div style="border:1px solid ' + options.legend.labelBoxBorderColor + ';padding:1px"><div style="width:4px;height:0;border:5px solid ' + entry.color + ';overflow:hidden"></div></div></td>' + '<td class="legendLabel">' + entry.label + "</td>") } if (rowStarted) fragments.push("</tr>"); if (fragments.length == 0) return; var table = '<table style="font-size:smaller;color:' + options.grid.color + '">' + fragments.join("") + "</table>"; if (options.legend.container != null) $(options.legend.container).html(table); else { var pos = "", p = options.legend.position, m = options.legend.margin; if (m[0] == null) m = [m, m]; if (p.charAt(0) == "n") pos += "top:" + (m[1] + plotOffset.top) + "px;"; else if (p.charAt(0) == "s") pos += "bottom:" + (m[1] + plotOffset.bottom) + "px;"; if (p.charAt(1) == "e") pos += "right:" + (m[0] + plotOffset.right) + "px;"; else if (p.charAt(1) == "w") pos += "left:" + (m[0] + plotOffset.left) + "px;"; var legend = $('<div class="legend">' + table.replace('style="', 'style="position:absolute;' + pos + ";") + "</div>").appendTo(placeholder); if (options.legend.backgroundOpacity != 0) { var c = options.legend.backgroundColor; if (c == null) { c = options.grid.backgroundColor; if (c && typeof c == "string") c = $.color.parse(c); else c = $.color.extract(legend, "background-color"); c.a = 1; c = c.toString() } var div = legend.children(); $('<div style="position:absolute;width:' + div.width() + "px;height:" + div.height() + "px;" + pos + "background-color:" + c + ';"> </div>').prependTo(legend).css("opacity", options.legend.backgroundOpacity) } } } var highlights = [], redrawTimeout = null; function findNearbyItem(mouseX, mouseY, seriesFilter) { var maxDistance = options.grid.mouseActiveRadius, smallestDistance = maxDistance * maxDistance + 1, item = null, foundPoint = false, i, j, ps; for (i = series.length - 1; i >= 0; --i) { if (!seriesFilter(series[i])) continue; var s = series[i], axisx = s.xaxis, axisy = s.yaxis, points = s.datapoints.points, mx = axisx.c2p(mouseX), my = axisy.c2p(mouseY), maxx = maxDistance / axisx.scale, maxy = maxDistance / axisy.scale; ps = s.datapoints.pointsize; if (axisx.options.inverseTransform) maxx = Number.MAX_VALUE; if (axisy.options.inverseTransform) maxy = Number.MAX_VALUE; if (s.lines.show || s.points.show) { for (j = 0; j < points.length; j += ps) { var x = points[j], y = points[j + 1]; if (x == null) continue; if (x - mx > maxx || x - mx < -maxx || y - my > maxy || y - my < -maxy) continue; var dx = Math.abs(axisx.p2c(x) - mouseX), dy = Math.abs(axisy.p2c(y) - mouseY), dist = dx * dx + dy * dy; if (dist < smallestDistance) { smallestDistance = dist; item = [i, j / ps] } } } if (s.bars.show && !item) { var barLeft, barRight; switch (s.bars.align) { case "left": barLeft = 0; break; case "right": barLeft = -s.bars.barWidth; break; default: barLeft = -s.bars.barWidth / 2 }barRight = barLeft + s.bars.barWidth; for (j = 0; j < points.length; j += ps) { var x = points[j], y = points[j + 1], b = points[j + 2]; if (x == null) continue; if (series[i].bars.horizontal ? mx <= Math.max(b, x) && mx >= Math.min(b, x) && my >= y + barLeft && my <= y + barRight : mx >= x + barLeft && mx <= x + barRight && my >= Math.min(b, y) && my <= Math.max(b, y)) item = [i, j / ps] } } } if (item) { i = item[0]; j = item[1]; ps = series[i].datapoints.pointsize; return { datapoint: series[i].datapoints.points.slice(j * ps, (j + 1) * ps), dataIndex: j, series: series[i], seriesIndex: i } } return null } function onMouseMove(e) { if (options.grid.hoverable) triggerClickHoverEvent("plothover", e, function (s) { return s["hoverable"] != false }) } function onMouseLeave(e) { if (options.grid.hoverable) triggerClickHoverEvent("plothover", e, function (s) { return false }) } function onClick(e) { triggerClickHoverEvent("plotclick", e, function (s) { return s["clickable"] != false }) } function triggerClickHoverEvent(eventname, event, seriesFilter) { var offset = eventHolder.offset(), canvasX = event.pageX - offset.left - plotOffset.left, canvasY = event.pageY - offset.top - plotOffset.top, pos = canvasToAxisCoords({ left: canvasX, top: canvasY }); pos.pageX = event.pageX; pos.pageY = event.pageY; var item = findNearbyItem(canvasX, canvasY, seriesFilter); if (item) { item.pageX = parseInt(item.series.xaxis.p2c(item.datapoint[0]) + offset.left + plotOffset.left, 10); item.pageY = parseInt(item.series.yaxis.p2c(item.datapoint[1]) + offset.top + plotOffset.top, 10) } if (options.grid.autoHighlight) { for (var i = 0; i < highlights.length; ++i) { var h = highlights[i]; if (h.auto == eventname && !(item && h.series == item.series && h.point[0] == item.datapoint[0] && h.point[1] == item.datapoint[1])) unhighlight(h.series, h.point) } if (item) highlight(item.series, item.datapoint, eventname) } placeholder.trigger(eventname, [pos, item]) } function triggerRedrawOverlay() { var t = options.interaction.redrawOverlayInterval; if (t == -1) { drawOverlay(); return } if (!redrawTimeout) redrawTimeout = setTimeout(drawOverlay, t) } function drawOverlay() { redrawTimeout = null; octx.save(); overlay.clear(); octx.translate(plotOffset.left, plotOffset.top); var i, hi; for (i = 0; i < highlights.length; ++i) { hi = highlights[i]; if (hi.series.bars.show) drawBarHighlight(hi.series, hi.point); else drawPointHighlight(hi.series, hi.point) } octx.restore(); executeHooks(hooks.drawOverlay, [octx]) } function highlight(s, point, auto) { if (typeof s == "number") s = series[s]; if (typeof point == "number") { var ps = s.datapoints.pointsize; point = s.datapoints.points.slice(ps * point, ps * (point + 1)) } var i = indexOfHighlight(s, point); if (i == -1) { highlights.push({ series: s, point: point, auto: auto }); triggerRedrawOverlay() } else if (!auto) highlights[i].auto = false } function unhighlight(s, point) { if (s == null && point == null) { highlights = []; triggerRedrawOverlay(); return } if (typeof s == "number") s = series[s]; if (typeof point == "number") { var ps = s.datapoints.pointsize; point = s.datapoints.points.slice(ps * point, ps * (point + 1)) } var i = indexOfHighlight(s, point); if (i != -1) { highlights.splice(i, 1); triggerRedrawOverlay() } } function indexOfHighlight(s, p) { for (var i = 0; i < highlights.length; ++i) { var h = highlights[i]; if (h.series == s && h.point[0] == p[0] && h.point[1] == p[1]) return i } return -1 } function drawPointHighlight(series, point) { var x = point[0], y = point[1], axisx = series.xaxis, axisy = series.yaxis, highlightColor = typeof series.highlightColor === "string" ? series.highlightColor : $.color.parse(series.color).scale("a", .5).toString(); if (x < axisx.min || x > axisx.max || y < axisy.min || y > axisy.max) return; var pointRadius = series.points.radius + series.points.lineWidth / 2; octx.lineWidth = pointRadius; octx.strokeStyle = highlightColor; var radius = 1.5 * pointRadius; x = axisx.p2c(x); y = axisy.p2c(y); octx.beginPath(); if (series.points.symbol == "circle") octx.arc(x, y, radius, 0, 2 * Math.PI, false); else series.points.symbol(octx, x, y, radius, false); octx.closePath(); octx.stroke() } function drawBarHighlight(series, point) { var highlightColor = typeof series.highlightColor === "string" ? series.highlightColor : $.color.parse(series.color).scale("a", .5).toString(), fillStyle = highlightColor, barLeft; switch (series.bars.align) { case "left": barLeft = 0; break; case "right": barLeft = -series.bars.barWidth; break; default: barLeft = -series.bars.barWidth / 2 }octx.lineWidth = series.bars.lineWidth; octx.strokeStyle = highlightColor; drawBar(point[0], point[1], point[2] || 0, barLeft, barLeft + series.bars.barWidth, function () { return fillStyle }, series.xaxis, series.yaxis, octx, series.bars.horizontal, series.bars.lineWidth) } function getColorOrGradient(spec, bottom, top, defaultColor) { if (typeof spec == "string") return spec; else { var gradient = ctx.createLinearGradient(0, top, 0, bottom); for (var i = 0, l = spec.colors.length; i < l; ++i) { var c = spec.colors[i]; if (typeof c != "string") { var co = $.color.parse(defaultColor); if (c.brightness != null) co = co.scale("rgb", c.brightness); if (c.opacity != null) co.a *= c.opacity; c = co.toString() } gradient.addColorStop(i / (l - 1), c) } return gradient } }
    } $.plot = function (placeholder, data, options) { var plot = new Plot($(placeholder), data, options, $.plot.plugins); return plot }; $.plot.version = "0.8.3"; $.plot.plugins = []; $.fn.plot = function (data, options) { return this.each(function () { $.plot(this, data, options) }) }; function floorInBase(n, base) { return base * Math.floor(n / base) }
})(jQuery);


/*
 * Javascript plotting library for jQuery, version 0.8.3.
 * 
 * Copyright (c) 2007-2014 IOLA and Ole Laursen. Licensed under the MIT license.
 * 
 */
(function ($) { var REDRAW_ATTEMPTS = 10; var REDRAW_SHRINK = .95; function init(plot) { var canvas = null, target = null, options = null, maxRadius = null, centerLeft = null, centerTop = null, processed = false, ctx = null; var highlights = []; plot.hooks.processOptions.push(function (plot, options) { if (options.series.pie.show) { options.grid.show = false; if (options.series.pie.label.show == "auto") { if (options.legend.show) { options.series.pie.label.show = false } else { options.series.pie.label.show = true } } if (options.series.pie.radius == "auto") { if (options.series.pie.label.show) { options.series.pie.radius = 3 / 4 } else { options.series.pie.radius = 1 } } if (options.series.pie.tilt > 1) { options.series.pie.tilt = 1 } else if (options.series.pie.tilt < 0) { options.series.pie.tilt = 0 } } }); plot.hooks.bindEvents.push(function (plot, eventHolder) { var options = plot.getOptions(); if (options.series.pie.show) { if (options.grid.hoverable) { eventHolder.unbind("mousemove").mousemove(onMouseMove) } if (options.grid.clickable) { eventHolder.unbind("click").click(onClick) } } }); plot.hooks.processDatapoints.push(function (plot, series, data, datapoints) { var options = plot.getOptions(); if (options.series.pie.show) { processDatapoints(plot, series, data, datapoints) } }); plot.hooks.drawOverlay.push(function (plot, octx) { var options = plot.getOptions(); if (options.series.pie.show) { drawOverlay(plot, octx) } }); plot.hooks.draw.push(function (plot, newCtx) { var options = plot.getOptions(); if (options.series.pie.show) { draw(plot, newCtx) } }); function processDatapoints(plot, series, datapoints) { if (!processed) { processed = true; canvas = plot.getCanvas(); target = $(canvas).parent(); options = plot.getOptions(); plot.setData(combine(plot.getData())) } } function combine(data) { var total = 0, combined = 0, numCombined = 0, color = options.series.pie.combine.color, newdata = []; for (var i = 0; i < data.length; ++i) { var value = data[i].data; if ($.isArray(value) && value.length == 1) { value = value[0] } if ($.isArray(value)) { if (!isNaN(parseFloat(value[1])) && isFinite(value[1])) { value[1] = +value[1] } else { value[1] = 0 } } else if (!isNaN(parseFloat(value)) && isFinite(value)) { value = [1, +value] } else { value = [1, 0] } data[i].data = [value] } for (var i = 0; i < data.length; ++i) { total += data[i].data[0][1] } for (var i = 0; i < data.length; ++i) { var value = data[i].data[0][1]; if (value / total <= options.series.pie.combine.threshold) { combined += value; numCombined++; if (!color) { color = data[i].color } } } for (var i = 0; i < data.length; ++i) { var value = data[i].data[0][1]; if (numCombined < 2 || value / total > options.series.pie.combine.threshold) { newdata.push($.extend(data[i], { data: [[1, value]], color: data[i].color, label: data[i].label, angle: value * Math.PI * 2 / total, percent: value / (total / 100) })) } } if (numCombined > 1) { newdata.push({ data: [[1, combined]], color: color, label: options.series.pie.combine.label, angle: combined * Math.PI * 2 / total, percent: combined / (total / 100) }) } return newdata } function draw(plot, newCtx) { if (!target) { return } var canvasWidth = plot.getPlaceholder().width(), canvasHeight = plot.getPlaceholder().height(), legendWidth = target.children().filter(".legend").children().width() || 0; ctx = newCtx; processed = false; maxRadius = Math.min(canvasWidth, canvasHeight / options.series.pie.tilt) / 2; centerTop = canvasHeight / 2 + options.series.pie.offset.top; centerLeft = canvasWidth / 2; if (options.series.pie.offset.left == "auto") { if (options.legend.position.match("w")) { centerLeft += legendWidth / 2 } else { centerLeft -= legendWidth / 2 } if (centerLeft < maxRadius) { centerLeft = maxRadius } else if (centerLeft > canvasWidth - maxRadius) { centerLeft = canvasWidth - maxRadius } } else { centerLeft += options.series.pie.offset.left } var slices = plot.getData(), attempts = 0; do { if (attempts > 0) { maxRadius *= REDRAW_SHRINK } attempts += 1; clear(); if (options.series.pie.tilt <= .8) { drawShadow() } } while (!drawPie() && attempts < REDRAW_ATTEMPTS); if (attempts >= REDRAW_ATTEMPTS) { clear(); target.prepend("<div class='error'>Could not draw pie with labels contained inside canvas</div>") } if (plot.setSeries && plot.insertLegend) { plot.setSeries(slices); plot.insertLegend() } function clear() { ctx.clearRect(0, 0, canvasWidth, canvasHeight); target.children().filter(".pieLabel, .pieLabelBackground").remove() } function drawShadow() { var shadowLeft = options.series.pie.shadow.left; var shadowTop = options.series.pie.shadow.top; var edge = 10; var alpha = options.series.pie.shadow.alpha; var radius = options.series.pie.radius > 1 ? options.series.pie.radius : maxRadius * options.series.pie.radius; if (radius >= canvasWidth / 2 - shadowLeft || radius * options.series.pie.tilt >= canvasHeight / 2 - shadowTop || radius <= edge) { return } ctx.save(); ctx.translate(shadowLeft, shadowTop); ctx.globalAlpha = alpha; ctx.fillStyle = "#000"; ctx.translate(centerLeft, centerTop); ctx.scale(1, options.series.pie.tilt); for (var i = 1; i <= edge; i++) { ctx.beginPath(); ctx.arc(0, 0, radius, 0, Math.PI * 2, false); ctx.fill(); radius -= i } ctx.restore() } function drawPie() { var startAngle = Math.PI * options.series.pie.startAngle; var radius = options.series.pie.radius > 1 ? options.series.pie.radius : maxRadius * options.series.pie.radius; ctx.save(); ctx.translate(centerLeft, centerTop); ctx.scale(1, options.series.pie.tilt); ctx.save(); var currentAngle = startAngle; for (var i = 0; i < slices.length; ++i) { slices[i].startAngle = currentAngle; drawSlice(slices[i].angle, slices[i].color, true) } ctx.restore(); if (options.series.pie.stroke.width > 0) { ctx.save(); ctx.lineWidth = options.series.pie.stroke.width; currentAngle = startAngle; for (var i = 0; i < slices.length; ++i) { drawSlice(slices[i].angle, options.series.pie.stroke.color, false) } ctx.restore() } drawDonutHole(ctx); ctx.restore(); if (options.series.pie.label.show) { return drawLabels() } else return true; function drawSlice(angle, color, fill) { if (angle <= 0 || isNaN(angle)) { return } if (fill) { ctx.fillStyle = color } else { ctx.strokeStyle = color; ctx.lineJoin = "round" } ctx.beginPath(); if (Math.abs(angle - Math.PI * 2) > 1e-9) { ctx.moveTo(0, 0) } ctx.arc(0, 0, radius, currentAngle, currentAngle + angle / 2, false); ctx.arc(0, 0, radius, currentAngle + angle / 2, currentAngle + angle, false); ctx.closePath(); currentAngle += angle; if (fill) { ctx.fill() } else { ctx.stroke() } } function drawLabels() { var currentAngle = startAngle; var radius = options.series.pie.label.radius > 1 ? options.series.pie.label.radius : maxRadius * options.series.pie.label.radius; for (var i = 0; i < slices.length; ++i) { if (slices[i].percent >= options.series.pie.label.threshold * 100) { if (!drawLabel(slices[i], currentAngle, i)) { return false } } currentAngle += slices[i].angle } return true; function drawLabel(slice, startAngle, index) { if (slice.data[0][1] == 0) { return true } var lf = options.legend.labelFormatter, text, plf = options.series.pie.label.formatter; if (lf) { text = lf(slice.label, slice) } else { text = slice.label } if (plf) { text = plf(text, slice) } var halfAngle = (startAngle + slice.angle + startAngle) / 2; var x = centerLeft + Math.round(Math.cos(halfAngle) * radius); var y = centerTop + Math.round(Math.sin(halfAngle) * radius) * options.series.pie.tilt; var html = "<span class='pieLabel' id='pieLabel" + index + "' style='position:absolute;top:" + y + "px;left:" + x + "px;'>" + text + "</span>"; target.append(html); var label = target.children("#pieLabel" + index); var labelTop = y - label.height() / 2; var labelLeft = x - label.width() / 2; label.css("top", labelTop); label.css("left", labelLeft); if (0 - labelTop > 0 || 0 - labelLeft > 0 || canvasHeight - (labelTop + label.height()) < 0 || canvasWidth - (labelLeft + label.width()) < 0) { return false } if (options.series.pie.label.background.opacity != 0) { var c = options.series.pie.label.background.color; if (c == null) { c = slice.color } var pos = "top:" + labelTop + "px;left:" + labelLeft + "px;"; $("<div class='pieLabelBackground' style='position:absolute;width:" + label.width() + "px;height:" + label.height() + "px;" + pos + "background-color:" + c + ";'></div>").css("opacity", options.series.pie.label.background.opacity).insertBefore(label) } return true } } } } function drawDonutHole(layer) { if (options.series.pie.innerRadius > 0) { layer.save(); var innerRadius = options.series.pie.innerRadius > 1 ? options.series.pie.innerRadius : maxRadius * options.series.pie.innerRadius; layer.globalCompositeOperation = "destination-out"; layer.beginPath(); layer.fillStyle = options.series.pie.stroke.color; layer.arc(0, 0, innerRadius, 0, Math.PI * 2, false); layer.fill(); layer.closePath(); layer.restore(); layer.save(); layer.beginPath(); layer.strokeStyle = options.series.pie.stroke.color; layer.arc(0, 0, innerRadius, 0, Math.PI * 2, false); layer.stroke(); layer.closePath(); layer.restore() } } function isPointInPoly(poly, pt) { for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)(poly[i][1] <= pt[1] && pt[1] < poly[j][1] || poly[j][1] <= pt[1] && pt[1] < poly[i][1]) && pt[0] < (poly[j][0] - poly[i][0]) * (pt[1] - poly[i][1]) / (poly[j][1] - poly[i][1]) + poly[i][0] && (c = !c); return c } function findNearbySlice(mouseX, mouseY) { var slices = plot.getData(), options = plot.getOptions(), radius = options.series.pie.radius > 1 ? options.series.pie.radius : maxRadius * options.series.pie.radius, x, y; for (var i = 0; i < slices.length; ++i) { var s = slices[i]; if (s.pie.show) { ctx.save(); ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, radius, s.startAngle, s.startAngle + s.angle / 2, false); ctx.arc(0, 0, radius, s.startAngle + s.angle / 2, s.startAngle + s.angle, false); ctx.closePath(); x = mouseX - centerLeft; y = mouseY - centerTop; if (ctx.isPointInPath) { if (ctx.isPointInPath(mouseX - centerLeft, mouseY - centerTop)) { ctx.restore(); return { datapoint: [s.percent, s.data], dataIndex: 0, series: s, seriesIndex: i } } } else { var p1X = radius * Math.cos(s.startAngle), p1Y = radius * Math.sin(s.startAngle), p2X = radius * Math.cos(s.startAngle + s.angle / 4), p2Y = radius * Math.sin(s.startAngle + s.angle / 4), p3X = radius * Math.cos(s.startAngle + s.angle / 2), p3Y = radius * Math.sin(s.startAngle + s.angle / 2), p4X = radius * Math.cos(s.startAngle + s.angle / 1.5), p4Y = radius * Math.sin(s.startAngle + s.angle / 1.5), p5X = radius * Math.cos(s.startAngle + s.angle), p5Y = radius * Math.sin(s.startAngle + s.angle), arrPoly = [[0, 0], [p1X, p1Y], [p2X, p2Y], [p3X, p3Y], [p4X, p4Y], [p5X, p5Y]], arrPoint = [x, y]; if (isPointInPoly(arrPoly, arrPoint)) { ctx.restore(); return { datapoint: [s.percent, s.data], dataIndex: 0, series: s, seriesIndex: i } } } ctx.restore() } } return null } function onMouseMove(e) { triggerClickHoverEvent("plothover", e) } function onClick(e) { triggerClickHoverEvent("plotclick", e) } function triggerClickHoverEvent(eventname, e) { var offset = plot.offset(); var canvasX = parseInt(e.pageX - offset.left); var canvasY = parseInt(e.pageY - offset.top); var item = findNearbySlice(canvasX, canvasY); if (options.grid.autoHighlight) { for (var i = 0; i < highlights.length; ++i) { var h = highlights[i]; if (h.auto == eventname && !(item && h.series == item.series)) { unhighlight(h.series) } } } if (item) { highlight(item.series, eventname) } var pos = { pageX: e.pageX, pageY: e.pageY }; target.trigger(eventname, [pos, item]) } function highlight(s, auto) { var i = indexOfHighlight(s); if (i == -1) { highlights.push({ series: s, auto: auto }); plot.triggerRedrawOverlay() } else if (!auto) { highlights[i].auto = false } } function unhighlight(s) { if (s == null) { highlights = []; plot.triggerRedrawOverlay() } var i = indexOfHighlight(s); if (i != -1) { highlights.splice(i, 1); plot.triggerRedrawOverlay() } } function indexOfHighlight(s) { for (var i = 0; i < highlights.length; ++i) { var h = highlights[i]; if (h.series == s) return i } return -1 } function drawOverlay(plot, octx) { var options = plot.getOptions(); var radius = options.series.pie.radius > 1 ? options.series.pie.radius : maxRadius * options.series.pie.radius; octx.save(); octx.translate(centerLeft, centerTop); octx.scale(1, options.series.pie.tilt); for (var i = 0; i < highlights.length; ++i) { drawHighlight(highlights[i].series) } drawDonutHole(octx); octx.restore(); function drawHighlight(series) { if (series.angle <= 0 || isNaN(series.angle)) { return } octx.fillStyle = "rgba(255, 255, 255, " + options.series.pie.highlight.opacity + ")"; octx.beginPath(); if (Math.abs(series.angle - Math.PI * 2) > 1e-9) { octx.moveTo(0, 0) } octx.arc(0, 0, radius, series.startAngle, series.startAngle + series.angle / 2, false); octx.arc(0, 0, radius, series.startAngle + series.angle / 2, series.startAngle + series.angle, false); octx.closePath(); octx.fill() } } } var options = { series: { pie: { show: false, radius: "auto", innerRadius: 0, startAngle: 3 / 2, tilt: 1, shadow: { left: 5, top: 15, alpha: .02 }, offset: { top: 0, left: "auto" }, stroke: { color: "#fff", width: 1 }, label: { show: "auto", formatter: function (label, slice) { return "<div style='font-size:x-small;text-align:center;padding:2px;color:" + slice.color + ";'>" + label + "<br/>" + Math.round(slice.percent) + "%</div>" }, radius: 1, background: { color: null, opacity: 0 }, threshold: 0 }, combine: { threshold: -1, color: null, label: "Other" }, highlight: { opacity: .5 } } } }; $.plot.plugins.push({ init: init, options: options, name: "pie", version: "1.1" }) })(jQuery);