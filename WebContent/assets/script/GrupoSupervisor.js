var t=new Object();
var Gr=[];
var Tu=new Object();
var table1;
var table2;
$(document).ready(function() {
	$("#tipoCampo").select2();
	$("#listaGrupos").select2();
	$("#listaCecos").select2();
	$("#nombreTrabajador").select2();
	

  $("#Sociedad").select2();
  getTurnos();
  $("#Turno").select2();
  ListaSociedad();
  
	
  
});
function getTurnos(){
	$("#Turno").html("");
	$.ajax({
		  type: "GET",
	      async: false,			    
		  url: "/simpleWeb/json/work/turnos/getTurnosSimple/",			  
		  success:function (data){
			  
			 if(data.length!=0){
			  var newOption1 = new Option("seleccionar..", "0", true, true);
			  $("#Turno").append(newOption1);
			  $.each(data, function(k, v) {
				  
				
			    	if ($('#Turno').find("option[value='" + v.idTurno + "']").length) {
			    		
			    	} else { 
			    	    // Create a DOM Option and pre-select by default
			    		var descripcion=v.nombreTurno;
			    		
			    	    var newOption = new Option(descripcion, v.idTurno, true, true);
			    	    // Append it to the select
			    	    $('#Turno').append(newOption);
			    	}
				  
			  	});
			 }
			 else{
				
			 }
			 $('#Turno').val(0);
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
		  complete: function(){
			  
		  }
		});
	
	
	
}

function addTurno(){
	
	$("#agregarNombreTurnoGrupo").val("");
	$("#agregarTurnoGrupoModal").modal("toggle");
}




function changeTurno(){
	var idTurno=$("#Turno").val();
	if(idTurno==0){
		alerta("Debes Seleccionar un Turno Para Editarlo");
	}
	else{
		$.ajax({
			  type: "GET",
		      async: false,			    
			  url: "/simpleWeb/json/work/turnos/getTurnoSimpleById/"+idTurno,			  
			  success:function (data){
				  alert(JSON.stringify(data));
				t.nombreTurno=data.nombreTurno;
				$("#editarNombreTurnoGrupo").val(t.nombreTurno);
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
			  complete:function (e){
				  $("#editarTurnoGrupoModal").modal("toggle");
			  }
			});
	}
	
}


function selectTurno($this){
	var val=$this.value;
	t.idTurno=val;
	
	
	if(val!=0){
		
		  
		  if ( $.fn.dataTable.isDataTable( '#tbl_gsup_2' ) ) {
			    table2 = $('#tbl_gsup_2').DataTable();
			    table2.clear();
			}
			else {
			    table2 = $('#tbl_gsup_2').DataTable( 
			    	{
			    		searching: false,
			    		paging: false,
			    		info: false,
			    		search: false
			    	}
			    )
			}
		
		
		
		
		$.ajax({
			  type: "GET",
		      async: false,			    
			  url: "/simpleWeb/json/work/turnos/getTrabajadoresByTurno/"+val,			  
			  success:function (data){
				  Tu.idTurno=val;
				  Tu.Grupo=[];
				  $.each(data, function(k, v) {
					  table2.row.add([v.apellidoPaterno, v.apellidoMaterno,v.nombre, v.denominacionSociedad, v.nombreHuerto]);
				    	 Tu.Grupo.push(v);
				    });
				    table2.draw();
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
	else{
		alerta("Debes seleccionar un Turno para poder desplegar los trabajadores");
	}
	
}


function selectHuertoBySociedad($this){
	var value= $this.value;
	$("#Huerto").html("");


	var newOption2 = new Option("seleccionar..", "0", true, true);
	$("#listaGrupos").append(newOption2);
	
	
	$.ajax({
		  type: "GET",
	      async: false,			    
		  url: "/simpleWeb/json/work/getCampoBySoc/"+value,			  
		  success:function (data){
			 if(data.length!=0){
			  var newOption1 = new Option("seleccionar..", "0", true, true);
			  $("#Huerto").append(newOption1);
			  $.each(data, function(k, v) {
				  
			    	if ($('#Huerto').find("option[value='" + v.campo + "']").length) {
			    		
			    	} else { 
			    	    // Create a DOM Option and pre-select by default
			    	    var newOption = new Option(v.descripcion, v.campo, true, true);
			    	    // Append it to the select
			    	    $('#Huerto').append(newOption);
			    	}
				  
			  	});
			 }
			 else{
				 if($("#Sociedad").val()==0){
					 var newOption1 = new Option("seleccionar..", "0", true, true);
					  $("#Huerto").append(newOption1);
				 }
				 else{
					 alerta("La sociedad seleccionada no posee Huertos asociados");
					 var newOption1 = new Option("seleccionar..", "0", true, true);
					  $("#Huerto").append(newOption1);
				 }
				 
			 }
			  $('#Huerto').val(0);
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
		  complete: function(){
			//selecciona los trabajadores de la sociedad  /work/turnos/getTrabajadoresBy/{Sociedad}/{Huerto}			  
			  
			  if(value!=0){
				 
				  
				  if ( $.fn.dataTable.isDataTable( '#tbl_gsup_1' ) ) {
					    table1 = $('#tbl_gsup_1').DataTable();
					    table1.clear();
					}
					else {
					    table1 = $('#tbl_gsup_1').DataTable( 
					    	{
					    		searching: false,
					    		paging: false,
					    		info: false,
					    		search: false
					    	}
					    )
					}
				$.ajax({
					  type: "GET",
				      async: false,			    
					  url: "/simpleWeb/json/work/turnos/getTrabajadoresBy/"+value+"/0",			  
					  success:function (data){
						  
						  if(data.length!=0){
							  console.log(data);
							  $.each(data, function(k, v) {
								  var acciones="";
								  table1.row.add([v.apellidoPaterno, v.apellidoMaterno,v.nombre, v.denominacionSociedad, v.nombreHuerto]);
							    });
						  }
						  else{
							  alerta("No hay trabajadores en esta sociedad");
						  }
						  	table1.context[0].aoData.splice(0,1);
						  	table1.context[0].aiDisplayMaster.splice(0,1);
						  	for(var i=0;i<table1.context[0].aoData.length;i++){
						  		table1.context[0].aoData[i].idx=i;
						  		table1.context[0].aiDisplayMaster[i]=i;
						  	}
						    table1.draw();
						    console.log(table1.context[0].aoData[0]);
						    console.log(table1);
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
			  else{
				  alerta("No hay trabajadores para esta sociedad?");
			  }
		  }
		});
}

function ListaSociedad() {
	
	
	$.ajax({
		  type: "GET",
	      async: false,			    
		  url: "/simpleWeb/json/work/solicitud/getEmpresas/",			  
		  success:function (data){
			
			  var newOption1 = new Option("seleccionar..", "0", true, true);
			  $("#Sociedad").append(newOption1);
			  $.each(data, function(k, v) {
				  if(v.idSociedad!=-1){
			    	if ($('#Sociedad').find("option[value='" + v.sociedad + "']").length) {
			    		
			    	} else { 
			    	    // Create a DOM Option and pre-select by default
			    	    var newOption = new Option(v.denominacionSociedad, v.sociedad, true, true);
			    	    // Append it to the select
			    	    $('#Sociedad').append(newOption);
			    	}
				  }
			  	});
			  
			  $('#Sociedad').val(0);
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