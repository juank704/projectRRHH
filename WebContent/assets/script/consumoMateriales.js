var codigoCampo="";
var codigoEspecie="";
var codigoVariedad="";
var arrayCuarteles = [];
var cuarteles;
var table;
var table1;
table1 = $('#tbl_MaterialesM').DataTable({
    		searching: false,
    		paging: false,
    		info: false,
    		search: false,
    		"columnDefs" : [{
    	         "targets" : [0],
    	         "visible" : false,
    	         "searchable" : true
    	     }]
    	});
var countMat=0;
$(document).ready(function(){
	$('#selectorRutEvMut').select2();
	
	 $("#campo").select2();
	 $("#especie").select2({
		multiple: true,
		placeholder: "Seleccione.."
	 });
	 $("#variedad").select2({
		multiple: true,
		placeholder: "Seleccione..",
		closeOnSelect: false
	 });
	 
	llenarCampo();

	
})
//----------------------Materiales------------------------------------




var arrayMaterial = [];
getMaterial();
function getMaterial(familia){
	arrayMaterial = [];
	$.ajax({
		//url: "/simpleWeb/json/AGRO/GETMA/",
		url: IPSERVERSAP + "JSON_ZMOV_10020.aspx?FAMILIA="+familia,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			$.each(data.LT_DETALLE, function(k, v) {
				arrayMaterial.push(v);
		  	});
		}
	})
	var sortResults=function(json,prop, asc) {
        json = json.sort(function(a, b) {
	        if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
	        else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
	    });
        return json;
	};
	table1.clear().draw();	
	
}


//-------------------end Materiales-----------------------------------

//------Realizar Consumo en Sap--------------
function consumoSap(){
	if(SESION.user == undefined){
		alerta("Se perdió sesión");
		$('.swal2-confirm').click(function(){
			window.location.href = ("login");
		})
		return false;
	}
	var xd = 0;
	var fecha = formatFecha($('#fecha_consumo').val()).replace("-", "").replace("-", "");
	var campo = $("#campo").val();
	var arrayMaterial = [];
	var arrayListConsumo = [];
	var totalPrev = 0;
	var cx = 0;
	var mensajeProrrateo = "";
	var xprorr = 0;
	$('.material').each(function(index,element){
		var id = element.id.split("selectorDeMaterial");
		var cantidadProrrateada = 0;
		var cantidad = $('#cantidadMaterial'+id[1]).val().replace(".","");
		cantidad = cantidad.replace(",",".");
		cantidad = parseFloat(cantidad);
		$.each(arrayCuarteles, function(k,v){					
			if($("#cantidadMaterial"+id[1]).val() != "" && $("#cantidadMaterial"+id[1]).val() > 0){
				if(arrayDisNueva[id[1]] != undefined){
					var arrayListCons = arrayDisNueva[id[1]][v.codigo][0];
					arrayListConsumo.push(arrayListCons);
					cantidadProrrateada += arrayListCons['CANTIDAD'];
				} else {
					var UM = $("#UM"+id[1]).text();
					var porcentaje = parseFloat(v.porcentaje);
					
					
					var cantidadFinal = cantidad * porcentaje / 100;
					cx++;
					if(UM == 'CS' || UM == 'UN'){
						if(cx != countCuartel){
							cantidadFinal = Math.round(cantidadFinal);
							totalPrev += cantidadFinal;
						} else {
							cantidadFinal = cantidad - totalPrev;
							totalPrev += cantidadFinal;
						}
					} else {
						if(cx != countCuartel){
							cantidadFinal = parseFloat(cantidadFinal);
							totalPrev += cantidadFinal;
						} else {
							cantidadFinal = cantidad - totalPrev;
							totalPrev += cantidadFinal;
						}
						
					}
					
					cantidadProrrateada += parseFloat(cantidadFinal.toFixed(3));
					var arrayListCons = {};
					arrayListCons.COD         = $('#codigo'+id[1]).html();
					arrayListCons.CANTIDAD    = cantidadFinal.toFixed(3);
					arrayListCons.CENTROCOSTO = v.ceco;
					arrayListCons.ALMACEN     = $('#almacen'+id[1]).val();
					arrayListCons.TIPO        = v.tipo;
					arrayListConsumo.push(arrayListCons);
				}
			}
			
		});
		if(parseFloat(cantidadProrrateada.toFixed(2)) != cantidad){
			if(xprorr == 0){
				mensajeProrrateo += "Se produce diferencia en el(los) siguiente(s) Material(es) por distribución de porcetanje<br>";
				xprorr++;	
			}
			mensajeProrrateo += "-"+$("#selectorDeMaterial"+id[1]+" option:selected").text()+"<br>";
			
		}
		
		var id = element.id.replace("selectorDeMaterial","");
		if(($("#devolucion"+id).val() != "" && $("#devolucion"+id).val() > 0) && $("#almacen"+id).val() == 'TRAN' ) {
			var devolucion = $("#devolucion"+id).val().replace(".","");
			devolucion = devolucion.replace(",",".");
			devolucion = parseFloat(devolucion);
			var arrayList             = {};
			arrayList.MATERIAL        = $('#codigo'+id).html();
			arrayList.CANTIDAD        = devolucion;			
			arrayList.ALMACEN_ORIGEN  = 'TRAN';
			arrayList.ALMACEN_DESTINO = $("#almacenDestino"+id).val();
			arrayList.UNIDAD		  = $("#UM"+id).text();
			arrayMaterial.push(arrayList);
			xd++;
		}	
	});
	if(mensajeProrrateo != ""){
		mensajeProrrateo += "Favor realizar re-distribución."
		alerta(mensajeProrrateo);
		return;
	}
	var mat = {};
	mat.MATERIALES = arrayListConsumo;
	materiales = JSON.stringify(mat);
	var consumo     = IPSERVERSAP + "JSON_BAPI_CONSUMO_MASIVO.aspx?FECHA="+fecha+"&MATERIALES="+materiales+"&CENTRO="+campo+"&ALMACEN=7000&MOVIMIENTO=201"+"&EQUIPO="+"&SOLICITANTE="+$("#solicitante").val();
	var user = "&USPAS="+SESION.user+"X*X"+SESION.pass;
	consumo += user;
	//return;
	var mensaje = '';
	var hoy = dateHoy();
	hoy = hoy.split("-");
	var fecha = hoy[0]+hoy[1]+hoy[2];
	var param = {};
	var parametro = {};
	param.OBJETOENTRADA = [];
	parametro.BAPI    = "BAPI_MIGO_311";
	parametro.RUNTEST = "false";
	parametro.PARAMETROS = {};
	parametro.PARAMETROS.FECHA 		= fecha;
	parametro.PARAMETROS.MATERIALES = arrayMaterial;
	parametro.PARAMETROS.CENTRO 	= campo;
	parametro.PARAMETROS.MOVIMIENTO = "311";
	param.OBJETOENTRADA.push(parametro);
	var devolucion  = IPSERVERSAP + "JSON_MIGO_311_CAMPO.aspx?PARAMETRO="+JSON.stringify(param);
	var resultaEsperado = true;
	
	$("#loading").show();
	setTimeout(function(){
		if(xd > 0){
			$.ajax({
				url: devolucion,
				type:	"GET",
				dataType: 'json',
				async: false,
				success: function(data){
					if(data.MATERIALDOCUMENT != ""){
						mensaje += "Devolución realizada con éxito, Número de documento "+data.MATERIALDOCUMENT + "<br>";
						document = data.MATERIALDOCUMENT;
					} else {
						resultaEsperado = false;
						mensaje = "";
						$.each(data.RETURN, function(key, val){
							mensaje += val.MESSAGE+"<br>";
						});
					}
				} ,error : function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR);
					console.log(textStatus);
					console.log(errorThrown);
				}
			})
		}
		$.ajax({
			url: consumo,
			type:	"GET",
			dataType: 'json',
			async: false,
			success: function(data){
				if(data.MATERIALDOCUMENT != ""){					
					mensaje += "Consumo realizado con éxito, Número de documento "+data.MATERIALDOCUMENT + "<br>";
					alerta(mensaje);
					$('.swal2-confirm').click(function(){
						$("#loading").hide();
						window.location.href = ("ConsumoMaterial");
					})
				} else {
					resultaEsperado = false;
					//mensaje = "";
					$.each(data.RETURN, function(key, val){
						mensaje += val.MESSAGE+"<br>";
					});
					
					$("#loading").hide();
				}
			}
		});
		alerta(mensaje);
	}, 500);
}

function devolucion(id, orden){

	var arrayMaterial = [];
	var campo = $('#campo').val();
	$('.material').each(function(index,element){
		var id = element.id.replace("selectorDeMaterial","");
			
	});	
	var hoy = dateHoy();
	hoy = hoy.split("-");
	var fecha = hoy[0]+hoy[1]+hoy[2];
	var param = {};
	var parametro = {};
	param.OBJETOENTRADA = [];
	parametro.BAPI    = "BAPI_MIGO_311";
	parametro.RUNTEST = "false";
	parametro.PARAMETROS = {};
	parametro.PARAMETROS.FECHA 		= fecha;
	parametro.PARAMETROS.MATERIALES = arrayMaterial;
	parametro.PARAMETROS.CENTRO 	= campo;
	parametro.PARAMETROS.MOVIMIENTO = "311";
	param.OBJETOENTRADA.push(parametro);
	var devolucion  = IPSERVERSAP + "JSON_MIGO_311_CAMPO.aspx?PARAMETRO="+JSON.stringify(param);
	var mensaje = "";
	var resultaEsperado = true;	
	$.ajax({
		url: devolucion,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			if(data.MATERIALDOCUMENT != ""){
				mensaje += "Devolución realizada con éxito, Número de documento "+data.MATERIALDOCUMENT + "<br>";
				document = data.MATERIALDOCUMENT;
			} else {
				resultaEsperado = false;
				mensaje = "";
				$.each(data.RETURN, function(key, val){
					mensaje += val.MESSAGE+"<br>";
				});
			}
		} ,error : function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		}
	})
	return mensaje;
}


function verDetalle(x){
	var material = $("#selectorDeMaterial"+x+" option:selected").text();
	var cantidad = $('#cantidadMaterial'+x).val().replace(".","");
	cantidad = cantidad.replace(",",".");
	cantidad = parseFloat(cantidad);
	var codigo = $("#selectorDeMaterial"+x).val();
	var UM = $("#UM"+x).text();
	var totalPrev = 0;
	var cx = 0;
	var almacen = $('#almacen'+x).val();
	var detalle = "";
	detalle +='<div class="table-responsive">';
	detalle +=	'<table class="table table-striped table-condensed" id="tbl_colaboradores">';
	detalle +=		'<thead style="text-align: center;">';
	detalle +=			'<tr>';
	detalle +=				'<th>Cuartel</th>';
	detalle +=				'<th style="text-align: center;">Ceco</th>';
	detalle +=				'<th style="text-align: center;">Superficie</th>';
	//detalle +=				'<th style="text-align: center;">Porcentaje</th>';
	detalle +=				'<th>Cantidad</th>';
	detalle +=			'</tr>';
	detalle +=		'</thead>';
	detalle +=		'<tbody >';
	if(cantidad > 0){
		$.each(arrayCuarteles, function(k,v){			
			if(arrayDisNueva[x] != undefined){
				var cantidadFinal = arrayDisNueva[x][v.codigo][0].CANTIDAD;
				cantidad = parseFloat(cantidad);
				totalPrev += cantidadFinal;
				var input = "<input type='text' name='cantidad' class='form-control cantidaMaterial' id='cantidad"+v.codigo+"' onchange='calcularTotalMaterial("+x+","+v.codigo+")' placeholder='' value='"+formatNumber2(arrayDisNueva[x][v.codigo][0].CANTIDAD)+"' step='0.01' >"
	    		detalle +=			'<tr>';
				detalle +=				'<td>'+v.cuartel+'</td>';
				detalle +=				'<td style="text-align: center;" id="codCeco'+v.codigo+'">'+v.ceco+'</td>';
				detalle +=				'<td style="text-align: center;">'+formatNumber(v.superficie)+'</td>';
				//detalle +=				'<td style="text-align: center;">'+v.porcentaje+'%</td>';
				detalle +=				'<td>'+input+'</td>';
				detalle +=			'</tr>';
			} else {
				var porcentaje = parseFloat(v.porcentaje);
				var cantidadFinal = cantidad * porcentaje / 100;
				cx++;
				if(UM == 'CS' || UM == 'UN'){
					if(cx != countCuartel){
						cantidadFinal = Math.round(cantidadFinal);
						totalPrev += cantidadFinal;
					} else {
						cantidadFinal = cantidad - totalPrev;
						totalPrev += cantidadFinal;
					}
				} else {
					if(cx != countCuartel){
						cantidadFinal = parseFloat(cantidadFinal);
						totalPrev += cantidadFinal;
					} else {
						cantidadFinal = cantidad - totalPrev;
						totalPrev += cantidadFinal;
					}
					
				}
				var input = "<input type='text' name='cantidad' class='form-control cantidaMaterial' id='cantidad"+v.codigo+"' onchange='calcularTotalMaterial("+x+","+v.codigo+")' placeholder='' value='"+formatNumber2(cantidadFinal)+"' step='0.01' >"
	    		
				detalle +=			'<tr>';
				detalle +=				'<td>'+v.cuartel+'</td>';
				detalle +=				'<td style="text-align: center;" id="codCeco'+v.codigo+'">'+v.ceco+'</td>';
				detalle +=				'<td style="text-align: center;">'+formatNumber(v.superficie)+'</td>';
				//detalle +=				'<td style="text-align: center;">'+v.porcentaje+'%</td>';
				detalle +=				'<td>'+input+'</td>';
				detalle +=			'</tr>';
			}
			
			
	
		});
	} else {
		alerta("Debe ingresar cantidad");
		return false;
	}
	detalle +=			'<tr>';
	detalle +=				'<td></td>';
	detalle +=				'<td style="text-align: center;"></td>';
	//detalle +=				'<td style="text-align: center;"></td>';
	detalle +=				'<td style="text-align: center;">Total</td>';
	detalle +=				'<td id="total'+x+'">'+formatNumber2(totalPrev)+'</td>';
	detalle +=			'</tr>';
	detalle +=		'</tbody >';
	detalle +=	'</table >';
	detalle +='</div>';
	detalle +='<div class="col-sm-12 col-md-12">';	
	detalle +=		"<td><div class='btn btn-circle green dark btn-outline' onclick='nuevaDistribucion(\""+codigo+"\",\""+almacen+"\","+x+");'>Guardar</div></td>";
	detalle +=		"<td><div class='btn btn-circle red btn-outline' onclick='closeModal()'>Cancelar</div></td>";	
	detalle +='</div>';

	popUp(material, detalle, true, "800px", true);	
}

var arrayDisNueva = [];
function nuevaDistribucion(codigo,almacen, x){
	arrayDisNueva[x] = [];
	var UM = $("#UM"+x).text();
	$('.cantidaMaterial').each(function(index,element){
		var cantidad = element.value;
		cantidad = cantidad.replace(".","");
		cantidad = cantidad.replace(",",".");
		cantidad = parseFloat(cantidad);
		var id = element.id;
		id = id.replace("cantidad","");
		var arrayListCons = {};
		arrayListCons.COD         = codigo;
		arrayListCons.CANTIDAD    = parseNumericFloat(element.value);
		arrayListCons.CENTROCOSTO = $("#codCeco"+id).text();
		arrayListCons.ALMACEN     = almacen;
		arrayListCons.TIPO        = $("#prod"+id).val();
		arrayDisNueva[x][id] = [];
		arrayDisNueva[x][id].push(arrayListCons);
	});
	var total1 = $("#total"+x).html();
	total1 = total1.replace(".","");
	total1 = total1.replace(",",".");
	total1 = parseFloat(total1);
	var total = $("#cantidadMaterial"+x).val();
	total = total.replace(".","");
	total = total.replace(",",".");
	total = parseFloat(total);
	if(total1 != total){
//		var c = confirmar.confirm("¿Esta seguro que quiere cambiar el total a "+$("#total"+x).html()+"?");
//		$(c.aceptar).click(function(){
//			$("#cantidadMaterial"+x).val($("#total"+x).html());
//			closeModal();
//		});
		arrayDisNueva[x] = [];
		alerta("La cantidad distribuida no coincide con el total a consumir del material, favor corregir para continuar.");
		return false;
	} else {
		closeModal();
	}
}

function calcularTotalMaterial(x,cod){
	var total = 0;
	$('.cantidaMaterial').each(function(index,element){
		var cantidad = 0;
		if(element.value != ''){
			cantidad = element.value;
			cantidad = cantidad.replace(".","");
			cantidad = cantidad.replace(",",".");
			cantidad = parseFloat(cantidad);
		} else {
			console.log("no");
		}
		total += cantidad;
	});
	$("#cantidad"+cod).val(formatNumber2($("#cantidad"+cod).val()));
	$("#total"+x).html(formatNumber2(total));
}


function llenarCampo()
{
	$.ajax({
		  type: "GET",
	      async: true,			    
		  url: "/simpleWeb/json/work/getCampoWithCuartel/",			  
		  success:function (data){			  
			  
			  $("#campo").append("<option value=0>Seleccionar...</option>");
			    $.each(data, function(k, v) {		    
			    	if ($('#campo').find("option[value='" + v.campo + "']").length) {
			    	    $('#campo').val(v.campo);
			    	} else { 
			    	    // Create a DOM Option and pre-select by default
			    	    var newOption = new Option(v.descripcion, v.campo, false, false);
			    	    // Append it to the select
			    	    $('#campo').append(newOption);
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
function onchangeCampo($this)
{
	codigoCampo=$this.value;
	$("#especie").html("");
	$("#variedad").html("");
	
	if(codigoCampo==0){
		$("#especie").html("");
		$("#variedad").html("");
	}
	else{
		
	$.ajax({
		  type: "GET",
	      async: true,			    
		  url: "/simpleWeb/json/work/getEspeciesByCampo/"+$this.value,			  
		  success:function (data){			  
			  var newOption1 = new Option("Seleccionar..", 0, true, true);
	    	    // Append it to the select
	    	    //$('#especie').append(newOption1);
			    $.each(data, function(k, v) {		    
			    	if ($('#especie').find("option[value='" + v.codigo_especie + "']").length) {
			    	    
			    	} else { 
			    	    // Create a DOM Option and pre-select by default
			    	    var newOption = new Option(v.nombre_especie, v.codigo_especie, false, false);
			    	    // Append it to the select
			    	    $('#especie').append(newOption).trigger("change");
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
		loadSolicitante_consumo(codigoCampo);
	}
}
function loadSolicitante_consumo(campo){		
	//var url = "/simpleWeb/json/AGRO/getParametros_campoByCampo/"+campo+"/Solicitante_consumo";
	var url = IPSERVERSAP + "JSON_RFC_READ_TABLE.aspx?TABLA=ZMM_MSOLICITANTE&SEPARADOR=;";
		$.ajax({ 
		url: url,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			$.each(data.DATA, function(k, v){
				$('#solicitante').append($('<option>', {value: v.WA[1], text: v.WA[2] }));
			})
		}
	})
}
function onchangeEspecie($this)
{
	codigoEspecie=$this.value;
	
	
	$("#variedad").html("");
	
	if(codigoEspecie==0){
		$("#variedad").html("");
	}
	else{
	
		
		var inEspecie = '';
		if($("#especie").val() != '') {
			var arrayEspecie = $("#especie").val();
			inEspecie = " (";
			var x = 0;
			$.each(arrayEspecie, function(k,v){
				if(x == 0){
					inEspecie += "'"+v+"'";
				} else {
					inEspecie += ",'"+v+"'";
				}
				x++;
			});
			inEspecie += ") ";
		}
	$.ajax({
		  type: "GET",
	      async: true,			    
		  url: "/simpleWeb/json/work/getVariedadByCampoEspecie/"+codigoCampo+"/"+inEspecie,			  
		  success:function (data){			  
			 
			 var newOption1 = new Option("Seleccionar..", 0, true, true);
			 //$('#variedad').append(newOption1);
			    $.each(data, function(k, v) {		    
			    	if ($('#variedad').find("option[value='" + v.codigo + "']").length) {
			    	   
			    	} else { 
			    	    // Create a DOM Option and pre-select by default
			    	    var newOption = new Option(v.variedad, v.codigo, false, false);
			    	    // Append it to the select
			    	    $('#variedad').append(newOption);
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
	
	
}

var selectCuartel = false;


function calcularTotal(){
	var total = 0;
	var cx    = 0;
	var countCuartel = 0;
	$('.hasReal').each(function(index,element){
		var id = element.id;
		var id2 = element.id.split("hecCuartel");
		if($("#cbCuartel"+id2[1]).is(':checked')){
			total += parseFloat(element.value);
			var value = parseFloat(element.value).toFixed(2);
			$('#'+id).val(value);
			countCuartel++;
		}
	});
	var tPorc = 0;
	var totalC = 0;
	arrayCuarteles = [];
	$('.hasReal').each(function(index,element){
		var id = element.id.split("hecCuartel");
		cx++;
		if($("#cbCuartel"+id[1]).is(':checked')){
			var value = parseFloat(element.value).toFixed(2);
			var porcentaje = parseFloat(value/total*100).toFixed(3);
			var listCuartel         = {};
			if(cx != countCuartel){
				$("#por"+id[1]).text(Math.round(porcentaje));
				listCuartel.porcentaje  = Math.round(porcentaje);
			} else {
				var p = 100 - tPorc;
				$("#por"+id[1]).text(parseInt(p));
				listCuartel.porcentaje  = parseInt(p);
				totalC = tPorc + p;
			}
			
			listCuartel.codigo      = id[1];
			listCuartel.cuartel     = $("#nombre"+id[1]).html();
			listCuartel.ceco        = $("#ceco"+id[1]).html();
			listCuartel.superficie  = value;
			listCuartel.tipo        = $("#prod"+id[1]).val();
			
			arrayCuarteles.push(listCuartel);
			var xx = parseFloat(value/total*100);
			tPorc += Math.round(xx);
		} else {
			$("#por"+id[1]).text(0);
		}
	});
	has = parseFloat(total);
	$('#totalHas').html(formatNumber2(total));
	$("#totalPor").html(parseInt(totalC));
}
var countCuartel= 0;
function onchangeVariedad($this)
{
	selectCuartel = false;
	codigoVariedad=$this.value;
	if(codigoEspecie==0){
		$("#variedad").html("");
	}
	else{

		
	  
	  if ( $.fn.dataTable.isDataTable( '#tbl_Cuartel' ) ) {
		    table = $('#tbl_Cuartel').DataTable();
		    table.clear();
		}
		else {
		    table = $('#tbl_Cuartel').DataTable( 
		    	{
		    		searching: false,
		    		paging: false,
		    		info: false,
		    		search: false
		    	}
		    )
		}
	var st=0;
	var inVariedad = '';
	if($("#variedad").val() != '') {
		var arrayVariedad = $("#variedad").val();
		inVariedad = " WHERE codigo in(";
		var x = 0;
		$.each(arrayVariedad, function(k,v){
			if(x == 0){
				inVariedad += "'"+v+"'";
			} else {
				inVariedad += ",'"+v+"'";
			}
			x++;
		});
		inVariedad += ") ";
	}
	$.ajax({
		type: "GET",
		async: true,			    
		url: "/simpleWeb/json/work/getCuartelByVariedadCampoEspecie/"+codigoCampo+"/"+codigoEspecie+"/"+inVariedad,			  
		success:function (data){
			console.log(data)
			//TODO
			cuarteles=data;
			$.each(cuarteles, function(k, v) {
				st=st+parseFloat(v.superficie);		      
			});
			var xc = 0;
			$.each(cuarteles, function(k, v) {
				selectCuartel = true;
		    	var superficie=parseFloat(v.superficie);
		    	var superficie2=parseFloat(v.superficie);
	    		var input2="<input type='number' name='sup2' class='form-control superficie hasReal' id='hecCuartel"+v.codigo+"' placeholder='' onchange='validaMaxHas(this.id)' max='"+superficie2+"' min='0' value='"+superficie2+"' step='0.01' >"
	    		superficie= superficie/st;
	    		superficie= superficie*100;
	    		var porcentaje = "<div id='por"+v.codigo+"'></div>";
	    		var input="<input type='hidden' id='prod"+v.codigo+"' value='"+v.estado+"'><input type='checkbox' checked id='cbCuartel"+v.codigo+"' class='cbCuartel' onchange='calcularTotalHas()' >";
	    		var ceco = "<div id='ceco"+v.codigo+"'>"+v.ceco+"</div>"
	    		var nombre = "<div id='nombre"+v.codigo+"'>"+v.nombre+"</div>"
	    		table.row.add([  input,v.nvariedad , nombre, input2,porcentaje,ceco ]);
				
				xc++;
				countCuartel++;
		    });
			$('#footer').html("");
			var footer="<tr><td></td><td></td><td>Total</td><td id='totalHas'></td><td id='totalPor'></td></tr>";
			$('#footer').append(footer);
			$('#footer').show();
		    table.draw();
		    calcularTotal();
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
	
	
}

function validaMaxHas(id){
	var v = parseFloat($('#'+id).val());
	var m = parseFloat($('#'+id).attr('max'));
	//var min = parseFloat($('#'+id).attr('min'));
	if(v > m) {
		alerta("No puede agregar mas hectareas de las que posee el cuartel");
		$('#'+id).val(m);
	}
	if(v < 0 || $('#'+id).val() == ''){
		alerta("No puede ingresar número menor que 0");
		$('#'+id).val(0);
	}
	calcularTotal();
}

function selectTodoCuartel(){
	if($("#cbSelectTodo").is(':checked')){
		$('.cbCuartel').prop('checked', true);
	} else {
		$('.cbCuartel').prop('checked', false);
	}
	calcularTotalHas();
}


function calcularTotalHas(){
	var total = 0;
	$('.hasReal').each(function(index,element){
		var id = element.id.split('hecCuartel')[1];
		if($("#cbCuartel"+id).is(':checked')){
			var value = element.value;
			value = value.replace(",", ".");
			total += parseFloat(value);
		}
	});
	has = formatNumber(total);
	$('#totalHas').html(formatNumber(total));
	calcularTotal();
}

function selected(){
	var suma=0;
	var sumaHectareas=0;
	var objects=document.getElementsByClassName("checkBoxes");
	var inputs=document.getElementsByClassName("superficie");
	$.each(objects, function(k, v) {
		if(v.checked==true){
			
			sumaHectareas=sumaHectareas+parseFloat(inputs[k].value);
			suma=suma+parseFloat(table.rows().data()[k][4]);
			
		}
	});
	 $('#footer').html("");
	  var footer="<tr><td></td><td></td><td>Total</td><td>"+sumaHectareas.toFixed(2)+"</td><td>"+suma.toFixed(2)+"</td></tr>"
	  
	  
	  $('#footer').append(footer);
	  $('#footer').show();
	
}
function AddMaterial(){
	
	createTblMaterial(countMat);
	
	
	$('.form-control.input-sm').select2({
		multiple: false,
		placeholder: "Seleccione.."
	});
	
	 var newOption = new Option("Seleccionar..", 0, true, false);	
	 $('#selectorDeMaterial'+countMat).append(newOption);
	$.each(arrayMaterial, function(k, v) {		    
    	if ($('#selectorDeMaterial'+countMat).find("option[value='" + v['MATNR'] + "']").length) {
    	    
    	} else { 
    	    // Create a DOM Option and pre-select by default
    	    var newOption = new Option(parseInt(v.MATNR)+"-"+v.MAKTX, v.MATNR, true, false);
    	    // Append it to the select
    	    $('#selectorDeMaterial'+countMat).append(newOption);
    	} 			    	
  	});
	
	countMat++;
}
function actualizarValores(){
	selected();
}
function createTblMaterial(x)
{
	 /* if ( $.fn.dataTable.isDataTable( '#tbl_MaterialesM' ) ) {
		    table1 = $('#tbl_MaterialesM').DataTable({
		    	"columnDefs" : [{
	    	         "targets" : [22,23,25,26,27],
	    	         "visible" : false,
	    	         "searchable" : true
	    	     }]
		    });
		    
		}
		else {
		    table1 = $('#tbl_MaterialesM').DataTable( 
		    	{
		    		searching: false,
		    		paging: false,
		    		info: false,
		    		search: false,
		    		"columnDefs" : [{
		    	         "targets" : [22,23,25,26,27],
		    	         "visible" : false,
		    	         "searchable" : true
		    	     }]
		    	}
		    )
		}*/
	  
	  var gato=x;
	  var selector="<select id='selectorDeMaterial"+x+"' class='form-control input-sm material' onchange='onchangeSelectMaterial("+x+")'></select>"; 
	  var codigo="<label id='codigo"+x+"' ></label>";
	  var input="<input type='text' name='sup2' class='form-control cantidadMateriales'  id='cantidadMaterial"+x+"' placeholder='' min='0' value='' step='0.01' >"
	  var almacen = "<select class='form-control input-sm almacen' id='almacen"+x+"' onchange='onchangeSelectMaterial("+x+")'>";
		almacen += "<option value='7000'>Materiales de Huerto</option>";
		almacen += "<option value='8000'>Materiales de Riego</option>";
		almacen += "<option value='9000'>Rpto Maquinarias</option>";
		almacen += "<option value='MM01'>Materiales Menores</option>";
		almacen += "<option value='PL01'>Petróleo y Lubr</option>";
		almacen += "<option value='TRAN'>Transito</option>";
		almacen += "</select>";
	  var UM="<label id='UM"+x+"' ></label>";
	  var STOCK="<label id='STOCK"+x+"' ></label>";
	  var DESCARTE = "<a class='' id='des"+x+"' onclick='descartarMaterial("+x+");'>";
	  DESCARTE +=		"<i class='fa fa-minus'>";
	  DESCARTE +=	"</a>" ;
	  var input2="<input type='text' name='sup2' class='form-control'  id='devolucion"+x+"' value='0' placeholder='' min='0' value='' step='0.01' disabled >"
	  var almacenDev = "<select class='form-control input-sm' id='almacenDestino"+x+"'  >";
	  	almacenDev += "<option value='7000'>Materiales de Huerto</option>";
	  	almacenDev += "<option value='8000'>Materiales de Riego</option>";
	  	almacenDev += "<option value='9000'>Rpto Maquinarias</option>";
	  	almacenDev += "<option value='PL01'>Petróleo y Lubr</option>";
	  	almacenDev += "<option value='MM01'>Materiales Menores</option>";
	  	almacenDev += "</select>";
	  var DETALLE = "<button   title='Detalle' onclick='verDetalle("+x+")' class='btn yellow btn-outline btn-sm' ><i class='fa fa-pencil-square-o fa-lg'></i></button>" ;
	  var eliminar = "<button   title='Eliminar' onclick='eliminar("+x+")' class='btn red btn-outline btn-sm' ><i class='fa fa-minus fa-lg'></i></button>" ;
	
	  table1.row.add([  gato,selector , codigo,almacen, input,UM,STOCK,input2,almacenDev,DETALLE,eliminar ])
	  .node().id = "tr"+x;; 
	  table1.draw();
}
function eliminar(x){
	table1.row($("#tr"+x)).remove().draw();
}
function descartarMaterial(desc){
	table1.row(':eq('+desc+')').remove().draw( false );
}

function onchangeSelectMaterial(id){
	
	var valor = $("#selectorDeMaterial"+id).val();
	var intId=parseInt(id);
	$.each(arrayMaterial, function(k, v) {		    
		
		if(v.MATNR==valor)
		{
			$("#UM"+id).html(v.MEINS);
			
		}
  	});
	$("#codigo"+id).html(parseInt(valor));
	var urlgetStock = IPSERVERSAP + "JSON_BAPI_MATERIAL_STOCK_REQ_LIST.aspx?CENTRO="+$("#campo").val()+"&MATERIAL="+valor+"&ALMACEN="+$("#almacen"+id).val();
	$.ajax({
		url: urlgetStock,
		type:	"GET",
		//data : JSON.stringify(row),
		dataType: 'json',
		async: false,
		success: function(data){
			dataStock = data;
		}
	})
	$("#STOCK"+id).html(formatNumber(dataStock.T_STOCK_MATNR[0].LABST));
	if($("#almacen"+id).val() == "TRAN"){
		$("#devolucion"+id).attr("disabled",false);
	} else {
		$("#devolucion"+id).attr("disabled",true);
		$("#devolucion"+id).val(0);
	}
	
}

function formatNumber(num) {
    if (!num || num == 'NaN') return '0';
    if (num == 'Infinity') return '&#x221e;';
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
        num = num.substring(0, num.length - (4 * i + 3)) + '.' + num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num + ',' + cents);
}
function formatNumber2(num) {
    if (!num || num == 'NaN' || num == 'INFINITY') return '0';
    if (num == 'Infinity') return '&#x221e;';
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 1000 + 0.50000000001);
    cents = num % 1000;
    num = Math.floor(num / 1000).toString();
    if (cents < 100)
        cents = "0" + cents;
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
        num = num.substring(0, num.length - (4 * i + 3)) + '.' + num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num + ',' + cents);
}
