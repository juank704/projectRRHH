var dteFactura = function(){
	var enviarFactura = function() {
		var arrayDetallesVenta = new Array();
		var arrayReferencias = new Array();
		var row = {};

		var form1 = $('#envia-factura-form');
						// parametrosCuenta.Cuenta = cuenta;
						
						//var f = $("#fecha").val().split('/');
						//console.log( "******************************************************");
						//console.log( new Date($('#fecha').val()).toUTCString());
						//console.log( "******************************************************");
						row.rutCliente = $('#cliente').val();
						row.giro = $("#giro").val();
						row.dirección = $("#direccionCliente").val();
						row.fecha = new Date($('#fecha').val()).toUTCString();//f[2]+"-"+f[0]+"-"+f[1].toUTCString();
						row.tipoDocumento = parseInt($('#tipoDte option:selected').val());
						row.rutChofer = $('#rutChofer').val();
						row.chofer = $('#nombreChofer').val();
						row.direccionDestino = $('#direccionDest').val();
						row.comunaDestino = $('#comunaDest option:selected').text();
						row.ciudadDestino = $('#ciudadDest').val();
						row.patente = $('#patente').val();
						row.rutTransporte = $('#rutTranstporte').val();
						row.tipoDespacho = $('#tipoDespacho').val();
						row.ciReceptor = $('#ciRecep').val();
						row.ciudadDestino = $('#ciudadDest').val();
						
						
						var tr = $('tr[id^="trVenta-"]:last');
						var num = parseInt(tr.prop('id').match(/\d+/g),10);
						for(i=1; i<=num; i++)
						{
							var detalle={};
							detalle.codigo = $('#cod'+i).val();
							detalle.producto = $('#prod'+i).val();
							detalle.cantidad = $('#cant'+i).val();
							detalle.unidad = $('#uni'+i+' option:selected').text();
							detalle.precio = $('#precio'+i).val();
							detalle.recargo = $('#dscto'+i).val();
							detalle.retencion = $('#reten'+i).val();
							detalle.exencion = $('#exen'+i+' option:selected').text();
							detalle.total = $('#total'+i).val();
							arrayDetallesVenta.push(detalle);
						}
						var tr = $('tr[id^="trReference-"]:last');
						var num = parseInt(tr.prop('id').match(/\d+/g),10);
						for(i=1; i<=num; i++)
						{
							var reference={};
							reference.tipoDocumento = detalle.unidad = $('#tipoDto'+i+' option:selected').text();
							reference.nDte = $('#nDto'+i).val();
							if($('#chkGlobal'+i).is(':checked'))
							{
								reference.global=1;
							}else
							{
								reference.global=0;
							}
							reference.fechaReferencia = new Date($('#fechaReferencia'+i).val()).toUTCString();
							reference.motivo = $('#motivo'+i+' option:selected').text();
							reference.glosa = $('#glosa'+i).val();
							arrayReferencias.push(reference);
						}
						
						row.detallesVenta = arrayDetallesVenta;
						row.referencias = arrayReferencias;
						row.netoFactura = $('#netoTotal').val();
						row.exentoFactura = $('#exentoTotal').val();
						row.ivaFactura = $('#ivaTotal').val();
						row.retencionFactura = $('#retencionTotal').val();
						row.totalFactura = $('#totalFactura').val();
						//console.log(row.fecha);
						
						/*var tr = $('tr[id^="tr-"]:last');
						$(tr).each(function(x,y){
							$(y).children("td").each(function(a,i){
								$(i).children().each(function(e,o)
										{
											console.log(o);
										})
							})
						})*/
						
						
						//row.ciudadDestinoDetalle = $("#ciudadDestDetalle").val();
						//row.ciRecep = $("#ciRecep").val();
						//row.tipoDte = $('#tipoDte').find(":selected").text()

						$.ajax({
									url : "/eDteWeb/json/dteVenta/put",
									type : "PUT",
									data : JSON.stringify(row),
									beforeSend : function(xhr) {
										xhr.setRequestHeader("Accept",
												"application/json");
										xhr.setRequestHeader("Content-Type",
												"application/json");
									},

									success : function(data, textStatus, jqXHR) {
										App.unblockUI('#modal-modifica-cuenta');

										$('#modal-modifica-cuenta .modal-footer')
												.append(
														' <input type="hidden" data-dismiss="modal" class="btn default cerrar" value="Cancelar" />');

										var table = $('#datatable_ajax')
												.DataTable({
													bRetrieve : true
												});
										table.ajax.reload();
										// handleDemo1();
										$('#modal-modifica-cuenta .modal-footer .cerrar')
												.click();

										App.alert({
											container : $('#alert_container')
													.val(), // alerts parent
															// container
											place : 'append', // append or
																// prepent in
																// container
											type : 'success', // alert's type
											message : data.mensaje, 
											close : true,
											reset : false,
											focus : true, 
											closeInSeconds : 5,
											icon : 'fa fa-check'
										});
									},
									error : function(jqXHR, textStatus,
											errorThrown) {

										App.unblockUI('#modal-modifica-cuenta');
										$('#modal-modifica-cuenta').modal(
												'hide')

										App.alert({
											container : $('#alert_container')
													.val(), // alerts parent
															// container
											place : 'append', // append or
																// prepent in
																// container
											type : 'danger', // alert's type
											message : textStatus + ': '
													+ errorThrown, // alert's
																	// message
											close : true, // make alert
															// closable
											reset : false, // close all
															// previouse alerts
															// first
											focus : true, // auto scroll to
															// the alert after
															// shown
											closeInSeconds : 50
										// auto close after defined seconds
										// icon: 'fa fa-check' // put icon class
										// before the message
										});

									}
								});

					}
	return {
		envia: function()
		{
			enviarFactura();
		}

	};
	}();

$('#guardar').click(function()
{
	dteFactura.envia();
})

$('#add').click(function()
{
	var tr = $('tr[id^="trVenta-"]:last');
	var num = parseInt(tr.prop('id').match(/\d+/g),10)+1;
	/*$(tr).each(function(x,y){
		$(y.cells).each(function(a,i){
			console.log(i.firstChild.value);
		})
	})*/

	var cadena = "";
    cadena +='<tr class="active" id="trVenta-'+num+'">';
    cadena +='<td>';
    cadena +='	<a onclick= "removeRow(this)" id="remove" class="btn red btn-table button-grilla-elimina"><i class="fa fa-trash-o"> </i></a>';
    cadena += ' </td>';
    cadena += '<td><input id="cod'+num+'" style="width: 97px;" type="text" class="input-sm"/>';
    cadena +='<button style="margin-right: -4px;"';
    cadena +='	 class="btn btn-sm green">';
    cadena +='	<i class="fa fa-search"></i>';
    cadena +='	</button>';
    cadena +='		</td>';
    cadena +='<td><input id="prod'+num+'" style="width: 118px;" type="text" class="input-sm"/><img style="width: 31px;" src="assets/pages/img/Edit.png"/> </td>';
    cadena +='<td> <input onChange="total(this)" id="cant'+num+'" style="width: 109px;" type="text" class="input-sm" value="0"/> </td>';
    cadena +='<td> <select id="uni'+num+'" style="width: 48px;" name="colors" class="form-control" title="Choose 2-4 colors">';
    cadena += '            <option>0</option>';
    cadena += '       </select> </td>';
    cadena +='<td> <input onChange="total(this)"  id="precio'+num+'" style="width: 121px;" type="text" class="input-sm"/> </td>';
    cadena +='<td> <input  id="dscto'+num+'" style="width: 121px;" type="text" class="input-sm"/> </td>';
    cadena +='<td> <input  id="reten'+num+'" style="width: 100px;" type="text" class="input-sm"/><img style="width: 31px;" src="assets/pages/img/Edit.png"/> </td>';
    cadena +='<td> <select  id="exen'+num+'" style="width: 115px;" name="colors" class="form-control" title="Choose 2-4 colors">';
    cadena +='        <option>0</option>';
    cadena +='   </select> </td>';
    cadena +='<td> <input  id="total'+num+'" style="width: 121px;" type="text" class="input-sm"/> </td>';
    cadena +='</tr>';
    $('#bodyDetalleVenta').append(cadena);
    //var clon = tr.clone().prop('id','tr-'+num).appendTo('#bodyDetalleVenta');
	//var clon = tr.clone().prop('id','tr-'+num).appendTo('#bodyDetalleVenta');

	//$('#tr-1').clone().appendTo('#bodyDetalleVenta');
})
$('#addReference').click(function()
{
	var tr = $('tr[id^="trReference-"]:last');
	var num = parseInt(tr.prop('id').match(/\d+/g),10)+1;


	var cadena = "";
	cadena +='<tr class="active" id="trReference-'+num+'">';
	cadena +='<td> <a onclick= "removeRow(this)" class="btn red btn-table pull-right button-grilla-elimina"><i class="fa fa-trash-o"> </i></a></td>';
	cadena +='<td><select id="tipoDto'+num+'" style="width: 111px;" name="colors" class="form-control" title="Choose 2-4 colors">';
	cadena +=' <option>0</option>';
	cadena +=' </select></td>';
	cadena +='	<td><input id="nDto'+num+'" style="width: 140px;" type="text" class="input-sm"/></td>';
	cadena +='	<td><center><label><input id="chkGlobal'+num+'" type="checkbox" class="icheck"></label></center></td>';
	cadena +='	<td> <input readOnly id="fechaReferencia'+num+'" style="width: 111px;" class="form-control datepicker"/>';
	cadena +='  </td>';
	cadena +='	<td> <select id="motivo'+num+'" style="width: 111px;" name="colors" class="form-control" title="Choose 2-4 colors">';
	cadena +='  <option>0</option>';
	cadena +='   </select></td>';
	cadena +='	<td> <input id="glosa'+num+'" style="width: 121px;" type="text" class="input-sm"/> </td>';
	cadena +='	 </tr>';
    $('#tbodyDetalleReference').append(cadena);
    $('.datepicker').datepicker()
    //var clon = tr.clone().prop('id','tr-'+num).appendTo('#bodyDetalleVenta');
	//var clon = tr.clone().prop('id','tr-'+num).appendTo('#bodyDetalleVenta');

	//$('#tr-1').clone().appendTo('#bodyDetalleVenta');
})
/*$('#remove').click(function(){
	var tr = $('tr[id^="tr-"]:last');
	var num = parseInt(tr.prop('id').match(/\d+/g),10);
	if(num!=1)
	{
		tr.remove();
	}else
	{
		alert('no puede eliminar la primera fila');
	}
})*/
function total (row)
{
	if($('#totalFactura').val()!=0 || $('#totalFactura').val()!='')
	{
		var totalVenta = parseInt($('#totalFactura').val());
	}else
	{
		var totalVenta = 0;
	}
	var tr = $(row).closest('tr');
	var num = parseInt(tr.prop('id').match(/\d+/g),10);
	
	//var trLast = $('tr[id^="trReference-"]:last');
	//var numLast = parseInt(tr.prop('id').match(/\d+/g),10);
	

	$('#total'+num).val($('#cant'+num).val()*$('#precio'+num).val());
	
	//for(i=1; i<=numLast; i++)
	//{
		if($('#total'+num).val()!=0)
		{
			//alert($('#total'+num).val());
			totalVenta += parseInt($('#total'+num).val());
		}else
			{
			 totalVenta+=0;
		}
	//}
	$('#totalFactura').val(parseInt(totalVenta));
	$('#netoTotal').val(parseInt($('#totalFactura').val()-($('#totalFactura').val()*0.19)));
	$('#ivaTotal').val(($('#totalFactura').val()*0.19));
	//$('#totalFactura').val($('#ivaTotal').val()+$('#netoTotal').val());
}
function removeRow(row){
	var tr = $(row).closest('tr');
	var num = parseInt(tr.prop('id').match(/\d+/g),10);
	if(num!=1)
	{
		tr.remove();
	}else
	{
		alert('no puede eliminar la primera fila');
	}
}

$(document).ready(function(){
  $("#demo1").on("show.bs.collapse", function(){
	    $("#collapse1").attr('class','glyphicon glyphicon-collapse-up');
  });
  $("#demo1").on("hide.bs.collapse", function(){
    $("#collapse1").attr('class','glyphicon glyphicon-collapse-down');
  });
  
  $('.datepicker').datepicker()
});