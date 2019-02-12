var Empresa=new Object();
$( document ).ready(function() {
	llenarSelectores();
	getEmpresas(); 
	
});
function searchNombre(){
	var table = $('#tbl_Empresa').DataTable();
	var value=$("#searchNombre").val();

	
	table.column(1).search(value).draw();
}
function searchRut()
{
	var table = $('#tbl_Empresa').DataTable();
	var value=$("#searchRut").val();

	
	table.column(2).search(value).draw();
}
function getEmpresas()
{
	var table;	
	 if ( $.fn.dataTable.isDataTable("#tbl_Empresa") ) {
	    table = $("#tbl_Empresa").DataTable();
	    table.clear();
	}
	else {
	    table = $("#tbl_Empresa").DataTable( 
	    	{
	    		searching: true,
	    		paging:true,
	    		info: false,
	    		search: true,
	    		autoWidth: true
	    	}
	    )	    
	}
	  $.ajax({
		  type: "GET",
	      async: false,
		  dataType: "json",	  
		  url: "/simpleWeb/json/work/Empresas/getEmpresas/",	  
		  processData: false,
		  contentType: false,
		  success:function (data){
			  $.each(data, function(k, v) {
			    	var acciones = ""
			   		acciones +=		"<button title='Actualizar' id='"+k+"' onclick=\"javascript:modificarMant('" +v.idSociedad + "')\" class='btn btn-circle green btn-outline btn-sm col-md-12'><i class='fa fa-pencil-square-o fa-lg'></i></button>";
			    	table.row.add([  k+1, v.denominacionSociedad, v.rut, v.mutual,v.cajaCompensacion,v.valorCB,v.valorCA,v.valorCE,v.valorSA,v.valorG, acciones]);
			   	 	
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
function llenarSelectores()
{
	$.ajax({
		  type: "GET",
	      async: false,
		  dataType: "json",	  
		  url: "/simpleWeb/json/work/getParametros/CAJA_COMPENSACION/",	  
		  processData: false,
		  contentType: false,
		  success:function (data){
			  
			  
		    	$.each(data,function(key, registro) {
		        $("#editarCajaCompensacionEmpresa").append('<option value='+registro.llave+'>'+registro.descripcion+'</option>');
		          
		     
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
	
	
	$.ajax({
		  type: "GET",
	      async: false,
		  dataType: "json",	  
		  url: "/simpleWeb/json/work/getParametros/MUTUALES",	  
		  processData: false,
		  contentType: false,
		  success:function (data){
			  
			 
		    	$.each(data,function(key, registro) {
		        $("#editarMutualEmpresa").append('<option value='+registro.llave+'>'+registro.descripcion+'</option>');
		       
			       
		     
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
function aparecerCampos()
{
	/*ids
	 * editarTasaUnoEmpresa
	 * editarTasaDosEmpresa
	 * editarTasaTresEmpresa
	 * editarTasaCuatroEmpresa
	 * 
	 */
	if($("#editarMutualEmpresa").val()==1)
	{
		$("#T1").css("display","none");
		$("#T2").css("display","none");
		$("#T3").css("display","none");
		$("#T4").css("display","none");
		$("#borde").removeClass("borde");
		
	}
	else{
		$("#T1").css("display","block");
		$("#T2").css("display","block");
		$("#T3").css("display","block");
		$("#T4").css("display","block");
		$("#borde").addClass("borde");
	}
	
	
	
}
function modificarMant($id)
{
	$.ajax({
	    type: "GET",
	    async: false,
	    url: "/simpleWeb/json/work/Empresas/getEmpresaById/" + $id,
	    success: function(data) {
	    	Empresa.sociedad=data.sociedad;
	    	Empresa.denominacionSociedad=data.denominacionSociedad;
	    	Empresa.idSociedad=data.idSociedad;
	    	Empresa.rut=data.rut;
	    	Empresa.numeroConvenio=data.numeroConvenio;
	    	Empresa.numeroNomina=data.numeroNomina;
	    	Empresa.tipoNomina=data.tipoNomina;
	    	Empresa.idMutual=data.idMutual;
	    	Empresa.Mutual=data.Mutual;
	    	Empresa.idCajaCompensacion=data.idCajaCompensacion;
	    	Empresa.cajaCompensacion=data.cajaCompensacion;
	    	Empresa.valorCB=data.valorCB;
	    	Empresa.valorCA=data.valorCA;
	    	Empresa.valorCE=data.valorCE;
	    	Empresa.valorSA=data.valorSA;
	    	Empresa.valorG=data.valorG;
	    	Empresa.pG=data.pG;
	    	Empresa.pCB=data.pCB;
	    	Empresa.pCA=data.pCA;
	    	Empresa.pCE=data.pCE;
	    	Empresa.pSA=data.pSA;
	    	
	      $("#editarIdEmpresa").val(data.idSociedad);
	      $("#editarMutualEmpresa").val(Empresa.idMutual);
	      
	      if(Empresa.idMutual!=1)
	      {
	    	  $("#borde").addClass("borde");
	      }
	      
	      
	      
	      $("#editarCajaCompensacionEmpresa").val(Empresa.idCajaCompensacion);
		     
	      $("#editarNombreEmpresa").val(Empresa.denominacionSociedad);
	      $("#editarCodigoEmpresa").val(Empresa.sociedad);
	      $("#editarRutEmpresa").val(Empresa.rut);
	      $("#editarNumeroConvenioEmpresa").val(Empresa.numeroConvenio);
	      $("#editarNumeroNominaEmpresa").val(Empresa.numeroNomina);
	      $("#editarTipoNominaEmpresa").val(Empresa.tipoNomina);
	      $("#editarTasaUnoEmpresa").val(Empresa.valorCB);
	      $("#editarTasaDosEmpresa").val(Empresa.valorCA);
	      $("#editarTasaTresEmpresa").val(Empresa.valorCE);
	      $("#editarTasaCuatroEmpresa").val(Empresa.valorSA);
	      $("#editarGratificacionEmpresa").val(Empresa.valorG);
	      
	      
	      //parte critica funcional
	      $("#editarEmpresaModal").modal("toggle");
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
$("#editEmpresaForm").submit(function(event) {
	  event.preventDefault();
	  updateEmpresa();
	});
function updateEmpresa() {
	  $id = $("#editarIdEmpresa").val();
	  Empresa.idMutual=$("#editarMutualEmpresa").val();
	  Empresa.idCajaCompensacion=$("#editarCajaCompensacionEmpresa").val();	
	  
	  
	  Empresa.valorCB=$("#editarTasaUnoEmpresa").val();
	  Empresa.valorCA=$("#editarTasaDosEmpresa").val();
	  Empresa.valorCE=$("#editarTasaTresEmpresa").val();
	  Empresa.valorSA=$("#editarTasaCuatroEmpresa").val();
	  Empresa.valorG=$("#editarGratificacionEmpresa").val();
	  
	  if(Empresa.idMutual==1)
	  {
		  Empresa.valorCB=0;
		  Empresa.valorCA=0;
		  Empresa.valorCE=0;
		  Empresa.valorSA=0;
	  }
	  
	  
	  
	  $.ajax({
  	    type: "POST",
  	    async: false,
  	    url: "/simpleWeb/json/work/Empresas/updateEmpresa/",
  	    data: JSON.stringify(Empresa),
  	    beforeSend: function(xhr) {
  	      xhr.setRequestHeader("Accept", "application/json");
  	      xhr.setRequestHeader("Content-Type", "application/json");
  	    },
  	    success: function(data) {
  	    	$("#editarEmpresaModal").modal("toggle");
  	    	alerta("Empresa Actualizada");
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

function cerrarUpdate()
{
	$("#editarEmpresaModal").modal("toggle");
}
