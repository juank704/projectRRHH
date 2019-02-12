var AFPS=[];

$(document).ready(function() {
  $("#loading").show();
  onLoadAFP();
  $("#selectorAnioMes").select2();
  llenarSelectorPeriodo();
  ListaAFP();
  
});


function buscarMan($Id, $dd) {
  swal({
    position: "top-end",
    type: "success",
    title: "Búsqueda exitosa",
    showConfirmButton: false,
    timer: 550
  });
}
function generateReport($form) {
  swal({
    position: "top-end",
    type: "success",
    title: "Tu reporte ha sido generado para: " + $form,
    showConfirmButton: false,
    timer: 1500
  });
} 
function llenarSelectores()
{
	$.ajax({
		  type: "GET",
	      async: false,
		  dataType: "json",	  
		  url: "/simpleWeb/json/work/getParametros/AFP/",	  
		  processData: false,
		  contentType: false,
		  success:function (data){
			  $("#agregarNombreAFP").append('<option value=-1>Seleccionar...</option>');
			  $("#editarNombreAFP").append('<option value=-1>Seleccionar...</option>');
		    	$.each(data,function(key, registro) {
		        $("#agregarNombreAFP").append('<option value='+registro.llave+'>'+registro.descripcion+'</option>');
		        $("#editarNombreAFP").append('<option value='+registro.llave+'>'+registro.descripcion+'</option>');
			       
		     
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
/*--------------submits--------------------------*/
$("#insertAFPForm").submit(function(event) {
	 event.preventDefault();
	 var text="tienes algunos errores, Revisa el campo ";
	var nombre=$("#agregarNombreAFP").val();
    var tasa=$("#agregarTasaAFP").val();
    var sis=$("#agregarSISAFP").val();
    var datos=new Array();
    
    if(nombre=="" || tasa=="0.000" || sis=="0.000"){
    	if(nombre=="")
    	{
    		datos.push("nombre");
    	}
    	if(tasa=="0.000")
    	{
    		datos.push("Tasa AFP");
    	}
    	if(sis=="0.000")
    	{
    		datos.push("SIS AFP");
    	}
    	for(var i=0;i<datos.length;i++)
    	{
    		if(i==0){
    			text+=datos[i];
    		}
    		else{
    			text+=", "+datos[i]
    		}
    	}
    	$("#fwa").css("display","block");
    	$("#textofwa").html(text);
    	
    }
    else{
    	var suma=parseFloat(tasa)+parseFloat(sis);     	
        $("#agregarTasaTotalAFP").val(suma);
        $("#fwa").css("display", "none");
        
        addAFP();
        
        }   
});

$("#editAFPForm2").submit(function(event) {
  event.preventDefault();

  updateAFPs();
});
function cerrarModalAgregar(){
	$("#fwa").css("display", "none");
	$("#agregarAFPModal").modal("toggle");
}
/*-----------------CRUD-----------------------*/
/*-----------------onload-----------------------*/
function onLoadAFP() {
  readAFPs();
}
function periodoOnchange($this){
	var periodo=$this.value;
	
	var table;
	 if ( $.fn.dataTable.isDataTable( '#tbl_afp' ) ) {
		    table = $('#tbl_afp').DataTable();
		    table.clear();
		}
		else {
		    table = $('#tbl_afp').DataTable( 
		    	{
		    		searching: true,
		    		paging: false,
		    		info: false,
		    		search: true,
		    		order: [[ 5, "desc" ]]
		    	}
		    )
		}
 $("#loading").show();
 $.ajax({
	  type: "GET",
     async: false,
	  dataType: "json",	  
	  url: "/simpleWeb/json/work/AFPs/getAFPsByPeriod/"+periodo,	  
	  processData: false,
	  contentType: false,
	  success:function (data){
		  
		    $.each(data, function(k, v) {
		    	var p=""+v.periodoAFP;
			      var a=p.substring(0, 4);
			      var b=p.substring(5);
			      var periodo= b+"-"+a;
		       table.row.add([ k+1,v.nombreAFP,replaceByComa(v.tasaAFP),replaceByComa(v.sisAFP),replaceByComa(v.tasaTotalAFP),periodo]);   
			      
		    });
		   
		    table.draw();
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


/*-----------------Read-----------------------*/
function readAFPs() {
	var table;
	 if ( $.fn.dataTable.isDataTable( '#tbl_afp' ) ) {
		    table = $('#tbl_afp').DataTable();
		    table.clear();
		}
		else {
		    table = $('#tbl_afp').DataTable( 
		    	{
		    		searching: true,
		    		paging: false,
		    		info: false,
		    		search: true,
		    		order: [[ 5, "desc" ]]
		    	}
		    )
		}
  $("#loading").show();
  $.ajax({
	  type: "GET",
      async: false,
	  dataType: "json",	  
	  url: "/simpleWeb/json/work/AFPs/getAFPsByLastPeriod/",	  
	  processData: false,
	  contentType: false,
	  success:function (data){
		  
		    $.each(data, function(k, v) {
		    	var p=""+v.periodoAFP;
			      var a=p.substring(0, 4);
			      var b=p.substring(5);
			      var periodo= b+"-"+a;
		    table.row.add([ k+1,v.nombreAFP,replaceByComa(v.tasaAFP),replaceByComa(v.sisAFP),replaceByComa(v.tasaTotalAFP),periodo]);   
			      
		    });
		   
		    table.draw();
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
function validadorPeriodo()
{
	var texto="faltan Tasas de AFP para los periodos: ";
	$.ajax({
		  type: "GET",
	      async: false,
		  dataType: "json",	  
		  url: "/simpleWeb/json/work/AFPs/getAFPs/",	  
		  processData: false,
		  contentType: false,
		  success:function (data){
			  
			    $.each(data, function(k, v) {
			    var	acciones = "<button title='Actualizar' id='"+k+"' onclick=\"javascript:modificarMant('" +v.idafp + "')\" class='btn btn-circle green btn-outline btn-sm col-md-4 margin-left-7'><i class='fa fa-pencil-square-o fa-lg'></i></button>";
				   acciones +="<button title='Borrar' id='" +k+"' onclick=\"javascript:borrarMant("+v.idafp+")\" class='btn btn-circle red btn-outline btn-sm col-md-4'><i class='fa fa-trash-o fa-lg'></i></button>";
			       table.row.add([ v.idafp,v.descripcion,replaceByComa(v.tasaAFP),replaceByComa(v.sisAFP),replaceByComa(v.tasaTotalAFP),v.periodoAFP, acciones]);   
				      
			    });
			    table.draw();
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




function llenarSelectorPeriodo()
{
		$.ajax({
		    type: "GET",
		    async: false,		    
	    url: '/simpleWeb/json/work/AFPs/getPeriodos/', 
	    dataType: "json",
	    success: function(data){
	    	$("#selectorAnioMes").append('<option value=0>Seleccionar...</option>');
	    	
	    	$.each(data,function(k, v) {
	    		var p=""+v.periodoAFP;
			      var a=p.substring(0, 4);
			      var b=p.substring(5);
			      var periodo= b+"-"+a;
	    		
	        $("#selectorAnioMes").append('<option value='+v.periodoAFP+'>'+periodo+'</option>');
	       
	     
	    	});        
	    },
	    error: function(data) {
	      alert('error');
	    }
	  });
}

/*-----------------Create-----------------------*/

function addAFP() {
  var afp;
  var newAFP;
  
      afp = new Object();
      afp.idParametro = $("#agregarNombreAFP").val();
      afp.tasaAFP = $("#agregarTasaAFP").val();
      afp.sisAFP = $("#agregarSISAFP").val();
      afp.tasaTotalAFP = $("#agregarTasaTotalAFP").val();
      afp.periodoAFP=$("#agregarPeriodoAFP").val();
     
      $.ajax({
  	    type: "POST",
  	    async: false,
  	    url: "/simpleWeb/json/work/AFPs/compareAddAFP/",
  	    data: JSON.stringify(afp),
  	    beforeSend: function(xhr) {
  	      xhr.setRequestHeader("Accept", "application/json");
  	      xhr.setRequestHeader("Content-Type", "application/json");
  	    },
  	    success: function(data) {
  	    	console.log("");
  	    	if(data==true){
  	    	
  	    	$.ajax({
  	    	    type: "PUT",
  	    	    async: false,
  	    	    url: "/simpleWeb/json/work/AFPs/createAFP/",
  	    	    data: JSON.stringify(afp),
  	    	    beforeSend: function(xhr) {
  	    	      xhr.setRequestHeader("Accept", "application/json");
  	    	      xhr.setRequestHeader("Content-Type", "application/json");
  	    	    },
  	    	    success: function(data2) {
  	    	    	$("#agregarAFPModal").modal("toggle");
  	    	    	alerta("AFP Creada");
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
  	    else
  	    {  	    	
  	    	alerta("No puedes Crear una AFP que ya posee este periodo");
  	    }
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
/*----------------Delete------------------------*/

function borrarMant($id) {
  swal({
    title: "Estás Seguro?",
    text: "No serás capaz de revertir esto",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Bórralo!"
  }).then(function(result) {
    if (result.value) {
      deleteAFP($id);
      
    }
  });
}
/*----------------Delete function------------------------*/

function deleteAFP($id) {
  $.ajax({
    type: "PUT",
    async: false,
    url: "/simpleWeb/json/work/AFPs/deleteAFPs/" + $id,

    beforeSend: function(xhr) {
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
    },
    success: function(data) {
      alerta("AFP Borrada");
      location.reload();

    },
    error: function(ex) {
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
/*----------------Modify------------------------*/
function modificarTramoMasivo() {
	var periodo=document.getElementById("selectorPeriodo").value;
	var desdes=document.getElementsByClassName("updateInicioTramo");
	var hastas=document.getElementsByClassName("updateFinTramo");
	var montos=document.getElementsByClassName("updateMontoTramo");
	
	tramos=[];
	
	  $.ajax({
	    type: "GET",
	    async: false,
	    
	    url: "/simpleWeb/json/work/tramo/getTramosByPeriodo/" + periodo,
	    
	    success: function(data) {
	    	
	    	$.each(data, function(k, v) {
	    	var tramo=new Object;
	    	tramo.idTramoCarga=v.idTramoCarga;
	    	tramo.descripcionTramoCarga=v.descripcionTramoCarga;
	    	tramo.inicioTramoCarga=v.inicioTramoCarga;
	    	tramo.finTramoCarga=v.finTramoCarga;
	    	tramo.montoTramoCarga=v.montoTramoCarga;
	    	tramo.letraTramoCarga=v.letraTramoCarga;
	    	tramo.periodoTramoCarga=v.periodoTramoCarga;
	    	
	    	tramos.push(tramo);
	    	var inicio="#updateInicioTramo"+v.letraTramoCarga; 
	    	var fin="#updateFinTramo"+v.letraTramoCarga;
	    	var monto="#updateMontoTramo"+v.letraTramoCarga;
	    	
	    	$(inicio).val(formatearAMoneda(v.inicioTramoCarga));
	    	fintramo=parseInt(v.finTramoCarga)>99999999?"Y MAS":formatearAMoneda(v.finTramoCarga);
	    	
	    	$(fin).val(fintramo);
	    	$(monto).val(formatearAMoneda(v.montoTramoCarga));
	    		
	    		
	    		
	    	
	    	});
	    	
	    	
	    	$("#updateMTramoModal").modal("toggle");
	    	
//	    	
//	      $("#editarIdTramo").val(data.idTramoCarga);
//	      $("#editarNombreTramo").val(data.descripcionTramoCarga);
//	       $("#editarInicioTramo").val(data.inicioTramoCarga);
//	      $("#editarFinTramo").val(data.finTramoCarga);
//	    
//	      //pzfgd critica funcional
//	      $("#editarTramoModal").modal("toggle");
//	      //manejador de la llamada a la base de datos

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
	      })
	    }
	  });
	}
function calcularTotal($this){
	var num=$this.id;
	num=num.substr(-1);
	var tasa=$("#updateTasa"+num).val();
	var sis=$("#updateSIS"+num).val();
	var total=parseFloat(sis)+parseFloat(tasa);
	 total=""+total.toFixed(2);
	 $("#totalTasa"+num).html(replaceByComa(total));
	
	
	
	
	
}





function updateAFPMasivo() {
	var periodo=$("#selectorAnioMes").val();
	var urlp="/simpleWeb/json/work/AFPs/getAFPsByPeriod/";
	if(periodo==0)
	{
		urlp="/simpleWeb/json/work/AFPs/getAFPsByLastPeriod/";
	}
	else{
		urlp=urlp+periodo;
	}
	
	AFPS=[];
	
  $.ajax({
	  
    type: "GET",
    async: false,
    url: urlp,
    success: function(data) {
    	
    	
    	
    	$.each(data, function(k, v) {
    		var afp=new Object;
    		afp.idAFP=v.idAFP;
			afp.nombreAFP=v.nombreAFP;
    		afp.tasaAFP=v.tasaAFP;
    		afp.sisAFP=v.sisAFP;
    		afp.tasaTotalAFP=v.tasaTotalAFP;
    		afp.periodoAFP=v.periodoAFP;
			afp.idParametro=v.idParametro;
			
			$("#updateNombre"+k).html(afp.nombreAFP);
			$("#updateId"+k).val(afp.idAFP);
			$("#updateTasa"+k).val(afp.tasaAFP);
			$("#updateSIS"+k).val(afp.sisAFP);
			$("#totalTasa"+k).html(replaceByComa(afp.tasaTotalAFP));
			
			
			AFPS.push(afp);
    	});
    	

      $("#editarAFPMasModal").modal("toggle");
      //manejador de la llamada a la base de datos
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
      })
    }
  });
}


/*----------------Create------------------------*/
function agregarAFP() {
  $("#agregarAFPModal").modal("toggle");
}
/*---------------Update Document--------------- */

function updateAFPs() {
  //llevar a la base de datos los valores de los inputs
	$.each(AFPS, function(k, v) {
		v.tasaAFP=$("#updateTasa"+k).val();
		v.sisAFP=$("#updateSIS"+k).val();
		v.tasaTotalAFP=parseFloat(v.tasaAFP)+parseFloat(v.sisAFP);
		v.tasaTotalAFP=v.tasaTotalAFP.toFixed(2);
		
		
	});
	$.ajax({
	    type: "POST",
	    async: false,
	    url: "/simpleWeb/json/work/AFPs/updateAFPsByPeriodo/",
	    data: JSON.stringify(AFPS),
	    beforeSend: function(xhr) {
	      xhr.setRequestHeader("Accept", "application/json");
	      xhr.setRequestHeader("Content-Type", "application/json");
	    },
	    success: function(data) {
	    	$("#editarAFPMasModal").modal("toggle");
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
	    },
	    complete:function(){
	    	alerta("AFP's actualizadas");
	    	location.reload();
	    }
	  });
}
function replaceByComa($string){
	
	var a=""+$string;
	a=a.replace(".",',');
	var d=a.split(",");
	
	if(d.length>1){
		if(d[1].length==1){
			d[1]=d[1]+'0';
		}
		a=d[0]+","+d[1];
	}
	else{
		a=d;
	}
	//alert(a);
	return a;
	
}
function replaceInputComa($this)
{
	var a=$this.value;
	
	a=a.replace(".",',');
	//alert(a);
	
	//return a;
	
}

function ListaAFP() {
	$("#loading").show();
	$.getJSON(
			"/simpleWeb/json/work/ListaafpsTASA/",
			function(data) {

				$.each(data, function(k, v) {
					var SelectTipoLicencia = "";
					SelectTipoLicencia += "<option value=" + v.codPrevired + ">"
							+ v.descripcion + "</option>";

					$("#idAFP").append(SelectTipoLicencia);
				})
			}).done(function() {
		$("#loading").hide();

	}).fail(function(jqXHR, textStatus, errorThrown) {

	    alerta(errorThrown);
		$("#loading").hide();
	})
}


