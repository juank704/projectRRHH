var hd=new Object();
var haberImponible=0;
var haberNoImponible=0;
var descuento=0;
var costoEmpresa=0;
var maxcodes=[];
$( document ).ready(function() {
	$("#loading").show();
	llenarSelectorEmpresa();

	llenarTipos();
	llenarIT();
	getMaxCodes();
	getHDs();
	
	
});
function getMaxCodes(){
	$.ajax({
		  type: "GET",
	      async: false,
		  dataType: "json",	  
		  url: "/simpleWeb/json/work/HaberesDescuentos/getMaxCodes/",	  
		  processData: false,
		  contentType: false,
		  success:function (data){
			  console.log(data);			  
			  haberImponible=data[0]!=0?data[0]:1000;
			  haberNoImponible=data[1]!=0?data[1]:2000;
			  descuento=data[2]!=0?data[2]:3000;
			  costoEmpresa=data[3]!=0?data[3]:4000;
			  maxcodes=data;
			
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
function existeCodigo($codigo)
{ var retorno=false;
	$.ajax({
		  type: "GET",
	      async: false,
		  dataType: "json",	  
		  url: "/simpleWeb/json/work/HaberesDescuentos/existCodigo/"+$codigo,	  
		  processData: false,
		  contentType: false,
		  success:function (data){
			  
				  retorno=data;
			  
			  
			  		
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
	return retorno;
}
function llenarTipos()
{
	$("#editarSelectorTipoHD").append("<option value='0'>Seleccionar...</option>");
	$("#editarSelectorTipoHD").append("<option value='h'>Haber</option>");
	$("#editarSelectorTipoHD").append("<option value='d'>Descuento</option>");
	$("#editarSelectorTipoHD").append("<option value='c'>Costo Empresa</option>");
	$("#agregarSelectorTipoHD").append("<option value='0'>Seleccionar...</option>");
	$("#agregarSelectorTipoHD").append("<option value='h'>Haber</option>");
	$("#agregarSelectorTipoHD").append("<option value='d'>Descuento</option>");
	$("#agregarSelectorTipoHD").append("<option value='c'>Costo Empresa</option>");
}
function llenarIT()
{
	$("#editarSelectorImponibleHD").append("<option value='0'>Seleccionar...</option>");
	$("#editarSelectorImponibleHD").append("<option value='s'>Si</option>");
	$("#editarSelectorImponibleHD").append("<option value='n'>No</option>");
	$("#editarSelectorTributableHD").append("<option value='0'>Seleccionar...</option>");
	$("#editarSelectorTributableHD").append("<option value='s'>Si</option>");
	$("#editarSelectorTributableHD").append("<option value='n'>No</option>");
	$("#agregarSelectorImponibleHD").append("<option value='0'>Seleccionar...</option>");
	$("#agregarSelectorImponibleHD").append("<option value='s'>Si</option>");
	$("#agregarSelectorImponibleHD").append("<option value='n'>No</option>");
	$("#agregarSelectorTributableHD").append("<option value='0'>Seleccionar...</option>");
	$("#agregarSelectorTributableHD").append("<option value='s'>Si</option>");
	$("#agregarSelectorTributableHD").append("<option value='n'>No</option>");
}





function llenarSelectorEmpresa()
{
	var arrayData = [];
	$.ajax({
        type : "GET",
        url : IPSERVERSAP + 'JSON_BAPI_LISTA_PROVEEDORES.aspx?SOCIEDAD='+"AS01",
        async: false,
        dataType : "json",
        success : function(data) {
        	arrayData = data.VENDOR;
        },
        error : function(ex) {
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

	var sortResults=function(json,prop, asc) {
        json = json.sort(function(a, b) {
	        if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
	        else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
	    });
        return json;
	};
	
	
	sortResults(arrayData,'NAME','asc');
	$("#editarRutEmpresaHD").append('<option value="0">No aplica</option>');
	$("#agregarRutEmpresaHD").append('<option value="0">No aplica</option>');
	$.each(arrayData, function(key, registro) {
		$("#editarRutEmpresaHD").append('<option value=' + registro.VENDOR_NO + '>'+ registro.NAME + '</option>');
		$("#agregarRutEmpresaHD").append('<option value=' + registro.VENDOR_NO + '>'+ registro.NAME + '</option>');
    });       
	
	
	
	
	
}
function cambiarAtrib(that)
{
	
	
	if(that.value=="d" || that.value=="c"){
		$("#agregarImponible").css("display", "none");
		$("#agregarTributable").css("display", "none");
	}
	else{
		$("#agregarImponible").css("display", "block");
		$("#agregarTributable").css("display", "block");
	}
	
}

function getHDs()
{
	var table;	
	 if ( $.fn.dataTable.isDataTable("#tbl_HD") ) {
	    table = $("#tbl_HD").DataTable();
	    table.clear();
	}
	else {
	    table = $("#tbl_HD").DataTable( 
	    	{
	    		searching: true,
	    		paging:true,
	    		info: false,
	    		search: true
	    	}
	    )	    
	}
	  $.ajax({
		  type: "GET",
	      async: false,
		  dataType: "json",	  
		  url: "/simpleWeb/json/work/HaberesDescuentos/getHaberesDescuentos/",	  
		  processData: false,
		  contentType: false,
		  success:function (data){
			  $.each(data, function(k, v) {
			    	var acciones = "";
			    	var tipo="";
			    	
			    	if(v.tipo=='h' && v.imponible=='s'){
			    		tipo="Haber Imponible";
			    	}
			    	else if(v.tipo=='h' && v.imponible=='n'){
			    		tipo="Haber no imponible";
			    	}
			    	else if(v.tipo=='d' && v.imponible=='n'){
			    		tipo="Descuento";
			    	}
			    	else
			    	{
			    		tipo="Costo Empresa";
			    	}
			    	
			   		acciones +=		"<button title='Actualizar' id='"+k+"' onclick=\"javascript:modificarMant('" +v.codigo + "')\" class='btn btn-circle green btn-outline btn-sm col-md-6 col-md-offset-3'><i class='fa fa-pencil-square-o fa-lg'></i></button>";
			    	
			    	table.row.add([  v.codigo, v.descripcion, tipo, v.imponible=='s'?"Si":"No",v.tributable=='s'?"Si":"No", acciones]);
			   	 	
			  	});
			    table.draw();
			    
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
		  },
		  complete:function(){
			  $("#loading").hide();
		  }
		});
}
function modificarMant($id)
{
	$.ajax({
	    type: "GET",
	    async: false,
	    url: "/simpleWeb/json/work/HaberesDescuentos/getHaberDescuentoById/" + $id,
	    success: function(data) {
	    	
	    	
	    	hd.codigo=$id;
	    	hd.descripcion=data.descripcion;
	    	hd.tipo=data.tipo;
	    	hd.imponible=data.imponible;
	    	hd.tributable=data.tributable;
	    	hd.rutEmpresa=data.rutEmpresa;
	    	hd.codSap=data.codSap;
	    	hd.centroCosto=data.centroCosto;
	    	
	    	$("#editarIdHD").val(data.codigo);
	    	
	  
	      $("#editarNombreHD").val(data.descripcion);
	      
	      
	      $("#editarSelectorTipoHD").val(data.tipo)
	      $("#editarSelectorImponibleHD").val(data.imponible);
	      $("#editarSelectorTributableHD").val(data.tributable);
	      $("#editarRutEmpresaHD").val(data.rutEmpresa);
	     data.codSap=data.codSap==null?'0':data.codSap;
	      
	      
	      $("#editarCodigoSapHD").val(data.codSap);
	      $("#editarCentroCostoHD").val(data.centroCosto);
	      
	      if(data.tipo=='d'||data.tipo=='c')
	      {
	    	  $("#editarImponible").css("display","none");
	    	  $("#editarTributable").css("display","none");
	      }
	      else{
	    	  $("#editarImponible").css("display","block");
	    	  $("#editarTributable").css("display","block");
	      }
	      
	      
	      
	      
	      //parte critica funcional
	      $("#editarHDModal").modal("toggle");
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
$("#insertHDForm").submit(function(event) {
	  
	  event.preventDefault();
	  getMaxCodes();
	  insertHD();
	});




function insertHD() {
	var hd2= new Object();  
	 
	  
	  hd2.descripcion=$("#agregarNombreHD").val();
	  hd2.tipo=$("#agregarSelectorTipoHD").val();
	  hd2.imponible=$("#agregarSelectorImponibleHD").val();
	  hd2.tributable=$("#agregarSelectorTributableHD").val();
	  hd2.rutEmpresa=$("#agregarRutEmpresaHD").val();
	  hd2.codSap=$("#agregarCodigoSapHD").val();
	  hd2.centroCosto=$("#agregarCentroCostoHD").val();
//	  
	  if(hd2.tipo!='0' && hd2.tipo=='h')
	  {
		 
		  
		  hd2.imponible=$("#agregarSelectorImponibleHD").val();
		  hd2.tributable=$("#agregarSelectorTributableHD").val();
		  if(hd2.imponible!='0')
		  {
			  
			  if(hd2.tributable!='0')
			  {
				 
				  if(hd2.imponible=='s')
				  {
					  hd2.codigo=parseInt(haberImponible)+1;
					  
				  }
				  else{
					  hd2.codigo=parseInt(haberNoImponible)+1;
				  }
				 
				 a(hd2);
			  }
			  else{
				  
				  $("#fwa").css("display","block");
			  }
		  }
		  else{
			 
			  hd2.imponible='0';
			  hd2.tributable='0';
			  $("#agregarSelectorImponibleHD").val('0');
			  $("#agregarSelectorTributableHD").val('0');
			  $("#fwa").css("display","block");
		  }
	  }
	  else if(hd2.tipo!='0' && hd2.tipo=='d')
	  {
		 
		   
		  hd2.imponible='n';
		  hd2.tributable='n';
		  $("#agregarSelectorImponibleHD").val('n');
		  $("#agregarSelectorTributableHD").val('n');
		  
		  if(hd2.imponible!='0')
		  {
			  
			  if(hd2.tributable!='0')
			  {
				  hd2.codigo=parseInt(descuento)+1;
				  
				  a(hd2);
				    
			  }
			  else{
				  
				  $("#fwa").css("display","block");
			  }
		  }
		  else{
			  
			  hd2.imponible='0';
			  hd2.tributable='0';
			  $("#agregarSelectorImponibleHD").val('0');
			  $("#agregarSelectorTributableHD").val('0');
			  $("#fwa").css("display","block");
		  }
	  }
	  else if(hd2.tipo!='0' && hd2.tipo=='c')
	  {
		  
		
		  hd2.imponible='n';
		  hd2.tributable='n';
		  $("#agregarSelectorImponibleHD").val('n');
		  $("#agregarSelectorTributableHD").val('n');
		  
		  if(hd2.imponible!='0')
		  {
			 
			  if(hd2.tributable!='0')
			  {
				  if(maxcodes[3]==0){
					  hd2.codigo=parseInt(costoEmpresa);
						 	  
				  }
				  else{
					  hd2.codigo=parseInt(costoEmpresa)+1;
						 
				  }
				 
				   a(hd2);
				    
			  }
			  else{
				 
				  $("#fwa").css("display","block");
			  }
		  }
		  else{
			  
			  hd2.imponible='0';
			  hd2.tributable='0';
			  $("#agregarSelectorImponibleHD").val('0');
			  $("#agregarSelectorTributableHD").val('0');
			  $("#fwa").css("display","block");
		  }
	  }
	  else
	  {
		 
		  $("#fwa").css("display","block");
	  }
//	  
	
		    
	  
	}
function searchDescripcion()
{
	var table = $('#tbl_HD').DataTable();
	var value=$("#searchDescripcion").val();

	
	table.column(1).search(value).draw();	
}
function searchTipo()
{
	var table = $('#tbl_HD').DataTable();
	var value=$("#searchTipo").val();
	
	
	table.column(2).search(value ? '^'+value+'$' : '', true, false).draw();	
}
function a(ob){
	 $.ajax({
	  	    type: "PUT",
	  	    async: false,
	  	    url: "/simpleWeb/json/work/HaberesDescuentos/createHaberDescuento/",
	  	    data: JSON.stringify(ob),
	  	    beforeSend: function(xhr) {
	  	      xhr.setRequestHeader("Accept", "application/json");
	  	      xhr.setRequestHeader("Content-Type", "application/json");
	  	    },
	  	    success: function(data) {
	  	    	$("#agregarHDModal").modal("toggle");
	  	    	
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
	  	    complete: function(){
	  	    	alerta("Haber y Descuento creado");
	  	    	 location.reload();
	  	    }
	  	  });
}

$("#editHDForm").submit(function(event) {
	  event.preventDefault();
	
	  
	  
	  
	  
	  
	  updateHD();
	});
function updateHD() {
		
	  hd.codigo=$("#editarIdHD").val();
	  hd.descripcion=$("#editarNombreHD").val();	  
	  hd.rutEmpresa=$("#editarRutEmpresaHD").val();
	  hd.codSap=$("#editarCodSapHD").val();
	  hd.centroCosto=$("#editarCentroCostoHD").val();
	  
	  
	  $.ajax({
  	    type: "POST",
  	    async: false,
  	    url: "/simpleWeb/json/work/HaberesDescuentos/updateHaberDescuento/",
  	    data: JSON.stringify(hd),
  	    beforeSend: function(xhr) {
  	      xhr.setRequestHeader("Accept", "application/json");
  	      xhr.setRequestHeader("Content-Type", "application/json");
  	    },
  	    success: function(data) {
  	    	$("#editarHDModal").modal("toggle");
  	    	alerta("Haber y descuento Actualizado");
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
	      deleteTurno($id);
	    }
	  });
	}
	/*----------------Delete function------------------------*/

	function deleteTurno($id) {
	  $.ajax({
	    type: "PUT",
	    async: false,
	    url: "/simpleWeb/json/work/GruposINE/deleteGrupoINEById/" + $id,

	    beforeSend: function(xhr) {
	      xhr.setRequestHeader("Accept", "application/json");
	      xhr.setRequestHeader("Content-Type", "application/json");
	    },
	    success: function(data) {
	      alerta("Grupo INE Borrado");
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
	function proveedorOnChange($this){
		$("#agregarCodigoSapHD").val($this.value);
	}
	function proveedorOnChangeUp($this){
		$("#editarCodigoSapHD").val($this.value);
	}
	
	
function cerrarUpdate()
{
	$("#editarHDModal").modal("toggle");
}
function agregarHD(){
	
	$("#agregarCodigoHD").val('');
	 $("#agregarNombreHD").val("");
	 $("#agregarCodSapHD").val("");
	 
	 $("#agregarSelectorTipoHD").val(0);
    $("#agregarSelectorImponibleHD").val(0);
    $("#agregarSelectorTributableHD").val(0);
    $("#agregarRutEmpresaHD").val(0);
    $("#agregarCodigoSapHD").val($("#agregarRutEmpresaHD").val());
     $("#agregarCentroCostoHD").val("");
    $("#agregarHDModal").modal("toggle");
}
function cerrarModalAgregar(){
	 

     $("#agregarHDModal").modal("toggle");
  
}
