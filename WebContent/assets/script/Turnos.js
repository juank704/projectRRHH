$(document).ready(function() {
  $("#loading").show();
  onLoadTurnos();
  semana.push("Lunes");
  semana.push("Martes");
  semana.push("Miercoles");
  semana.push("Jueves");
  semana.push("Viernes");
  semana.push("Sabado");
  semana.push("Domingo");

  llenarSelectores();
});
var semana=new Array();

var turno=new Object();

function llenarSelectores()
{
	$.ajax({
		  type: "GET",
	      async: false,
		  dataType: "json",	  
		  url: "/simpleWeb/json/work/getParametros/JORNADA/",	  
		  processData: false,
		  contentType: false,
		  success:function (data){
			  $("#agregarJornadaTurno").append('<option value=-1>Seleccionar...</option>');
			  $("#editarJornadaTurno").append('<option value=-1>Seleccionar...</option>');
	
			  $.each(data,function(key, registro) {
		        $("#agregarJornadaTurno").append('<option value='+registro.llave+'>'+registro.descripcion+'</option>');
		        $("#editarJornadaTurno").append('<option value='+registro.llave+'>'+registro.descripcion+'</option>');
  
		     
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
$("#insertTurnoForm").submit(function(event) {
	 event.preventDefault();
	 var text="tienes algunos errores, Revisa el campo ";
	

    var datos=new Array();
    if(validate("agregar")==true)
    {
    	addTurno();
        
    }
    else
    {
  	  
    }
    
    
});

$("#editTurnoForm").submit(function(event) {
  event.preventDefault();

  if(validate("editar")==true)
  {
	  updateTurno();
  }
  else
  {
	  
  }
});
function cerrarModalAgregar(){
	
	$("#agregarTurnoModal").modal("toggle");
}
/*-----------------CRUD-----------------------*/
/*-----------------onload-----------------------*/
function onLoadTurnos() {
  readTurnos();
}



/*-----------------Read-----------------------*/
function readTurnos() {
	var table;
	 if ( $.fn.dataTable.isDataTable( '#tbl_Turno' ) ) {
		    table = $('#tbl_Turno').DataTable();
		    table.clear();
		}
		else {
		    table = $('#tbl_Turno').DataTable( 
		    	{
		    		searching: true,
		    		paging: false,
		    		info: false,
		    		search: true,
		    		order: [[ 4, "desc" ]]
		    	}
		    )
		}
  $("#loading").show();
  $.ajax({
	  type: "GET",
      async: false,
	  dataType: "json",	  
	  url: "/simpleWeb/json/work/turnos/getTurnos/",	  
	  processData: false,
	  contentType: false,
	  success:function (data){
		  
		    $.each(data, function(k, v) {
		    
		    var	acciones = "<button title='Actualizar' id='"+k+"' onclick=\"javascript:modificarMant('" +v.idTurno + "')\" class='btn btn-circle green btn-outline btn-sm col-md-4 margin-left-7'><i class='fa fa-pencil-square-o fa-lg'></i></button>";
			   acciones +="<button title='Borrar' id='" +k+"' onclick=\"javascript:borrarMant("+v.idTurno+")\" class='btn btn-circle red btn-outline btn-sm col-md-4'><i class='fa fa-trash-o fa-lg'></i></button>";
		       table.row.add([ k+1,v.nombreTurno,v.descripcionTurno,v.nombreJornada,v.horasTurno, acciones]);   
			      
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

/*-----------------Create-----------------------*/
function addTurno() {
	
	  var t=new Object();
	 
	  t.nombreTurno=$("#agregarNombreTurno").val();
	  t.descripcionTurno=$("#agregarDescripcionTurno").val();
	  t.jornadaTurno=$("#agregarJornadaTurno").val();
	  t.horasTurno=$("#agregarHorasTurno").val();
	  t.lunesTurno=$("#agregarLunesTurno").val();
	  t.martesTurno=$("#agregarMartesTurno").val();
	  t.miercolesTurno=$("#agregarMiercolesTurno").val();
	  t.juevesTurno=$("#agregarJuevesTurno").val();
	  t.viernesTurno=$("#agregarViernesTurno").val();
	  t.sabadoTurno=$("#agregarSabadoTurno").val();
	  t.domingoTurno=$("#agregarDomingoTurno").val();
	  t.lunesAI=$("#agregarLunesAI").val()!=""?( $("#agregarLunesAI").val().length<=5?$("#agregarLunesAI").val()+":00":$("#agregarLunesAI").val()):"00:00:00";
	  t.lunesAF=$("#agregarLunesAF").val()!=""?( $("#agregarLunesAF").val().length<=5?$("#agregarLunesAF").val()+":00":$("#agregarLunesAF").val()):"00:00:00";
	  t.martesAI=$("#agregarMartesAI").val()!=""?( $("#agregarMartesAI").val().length<=5?$("#agregarMartesAI").val()+":00":$("#agregarMartesAI").val()):"00:00:00";
	  t.martesAF=$("#agregarMartesAF").val()!=""?( $("#agregarMartesAF").val().length<=5?$("#agregarMartesAF").val()+":00":$("#agregarMartesAF").val()):"00:00:00";
	  t.miercolesAI=$("#agregarMiercolesAI").val()!=""?( $("#agregarMiercolesAI").val().length<=5?$("#agregarMiercolesAI").val()+":00":$("#agregarMiercolesAI").val()):"00:00:00";
	  t.miercolesAF=$("#agregarMiercolesAF").val()!=""?( $("#agregarMiercolesAF").val().length<=5?$("#agregarMiercolesAF").val()+":00":$("#agregarMiercolesAF").val()):"00:00:00";
	  t.juevesAI=$("#agregarJuevesAI").val()!=""?( $("#agregarJuevesAI").val().length<=5?$("#agregarJuevesAI").val()+":00":$("#agregarJuevesAI").val()):"00:00:00";
	  t.juevesAF=$("#agregarJuevesAF").val()!=""?( $("#agregarJuevesAF").val().length<=5?$("#agregarJuevesAF").val()+":00":$("#agregarJuevesAF").val()):"00:00:00";
	  t.viernesAI=$("#agregarViernesAI").val()!=""?( $("#agregarViernesAI").val().length<=5?$("#agregarViernesAI").val()+":00":$("#agregarViernesAI").val()):"00:00:00";
	  t.viernesAF=$("#agregarViernesAF").val()!=""?( $("#agregarViernesAF").val().length<=5?$("#agregarViernesAF").val()+":00":$("#agregarViernesAF").val()):"00:00:00";
	  t.sabadoAI=$("#agregarSabadoAI").val()!=""?( $("#agregarSabadoAI").val().length<=5?$("#agregarSabadoAI").val()+":00":$("#agregarSabadoAI").val()):"00:00:00";
	  t.sabadoAF=$("#agregarSabadoAF").val()!=""?( $("#agregarSabadoAF").val().length<=5?$("#agregarSabadoAF").val()+":00":$("#agregarSabadoAF").val()):"00:00:00";
	  t.domingoAI=$("#agregarDomingoAI").val()!=""?( $("#agregarDomingoAI").val().length<=5?$("#agregarDomingoAI").val()+":00":$("#agregarDomingoAI").val()):"00:00:00";
	  t.domingoAF=$("#agregarDomingoAF").val()!=""?( $("#agregarDomingoAF").val().length<=5?$("#agregarDomingoAF").val()+":00":$("#agregarDomingoAF").val()):"00:00:00";
	  t.lunesPI=$("#agregarLunesPI").val()!=""?( $("#agregarLunesPI").val().length<=5?$("#agregarLunesPI").val()+":00":$("#agregarLunesPI").val()):"00:00:00";
	  t.lunesPF=$("#agregarLunesPF").val()!=""?( $("#agregarLunesPF").val().length<=5?$("#agregarLunesPF").val()+":00":$("#agregarLunesPF").val()):"00:00:00";
	  t.martesPI=$("#agregarMartesPI").val()!=""?( $("#agregarMartesPI").val().length<=5?$("#agregarMartesPI").val()+":00":$("#agregarMartesPI").val()):"00:00:00";
	  t.martesPF=$("#agregarMartesPF").val()!=""?( $("#agregarMartesPF").val().length<=5?$("#agregarMartesPF").val()+":00":$("#agregarMartesPF").val()):"00:00:00";
	  t.miercolesPI=$("#agregarMiercolesPI").val()!=""?( $("#agregarMiercolesPI").val().length<=5?$("#agregarMiercolesPI").val()+":00":$("#agregarMiercolesPI").val()):"00:00:00";
	  t.miercolesPF=$("#agregarMiercolesPF").val()!=""?( $("#agregarMiercolesPF").val().length<=5?$("#agregarMiercolesPF").val()+":00":$("#agregarMiercolesPF").val()):"00:00:00";
	  t.juevesPI=$("#agregarJuevesPI").val()!=""?( $("#agregarJuevesPI").val().length<=5?$("#agregarJuevesPI").val()+":00":$("#agregarJuevesPI").val()):"00:00:00";
	  t.juevesPF=$("#agregarJuevesPF").val()!=""?( $("#agregarJuevesPF").val().length<=5?$("#agregarJuevesPF").val()+":00":$("#agregarJuevesPF").val()):"00:00:00";
	  t.viernesPI=$("#agregarViernesPI").val()!=""?( $("#agregarViernesPI").val().length<=5?$("#agregarViernesPI").val()+":00":$("#agregarViernesPI").val()):"00:00:00";
	  t.viernesPF=$("#agregarViernesPF").val()!=""?( $("#agregarViernesPF").val().length<=5?$("#agregarViernesPF").val()+":00":$("#agregarViernesPF").val()):"00:00:00";
	  t.sabadoPI=$("#agregarSabadoPI").val()!=""?( $("#agregarSabadoPI").val().length<=5?$("#agregarSabadoPI").val()+":00":$("#agregarSabadoPI").val()):"00:00:00";
	  t.sabadoPF=$("#agregarSabadoPF").val()!=""?( $("#agregarSabadoPF").val().length<=5?$("#agregarSabadoPF").val()+":00":$("#agregarSabadoPF").val()):"00:00:00";
	  t.domingoPI=$("#agregarDomingoPI").val()!=""?( $("#agregarDomingoPI").val().length<=5?$("#agregarDomingoPI").val()+":00":$("#agregarDomingoPI").val()):"00:00:00";
	  t.domingoPF=$("#agregarDomingoPF").val()!="" ?( $("#agregarDomingoPF").val().length<=5?$("#agregarDomingoPF").val()+":00":$("#agregarDomingoPF").val()):"00:00:00";
	  
	  

	  

	 
	  
	  $.ajax({
		    type: "PUT",
		    async: false,
		    url: "/simpleWeb/json/work/turnos/createTurno/",
		    data: JSON.stringify(t),
		    beforeSend: function(xhr) {
		      xhr.setRequestHeader("Accept", "application/json");
		      xhr.setRequestHeader("Content-Type", "application/json");
		    },
		    success: function(data) {
		    	$("#agregarTurnoModal").modal("toggle");
		    	alerta("Turno Creado");
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
      deleteTurno($id);
    }
  });
}
/*----------------Delete function------------------------*/

function deleteTurno($id) {
  $.ajax({
    type: "PUT",
    async: false,
    url: "/simpleWeb/json/work/turnos/deleteTurno/" + $id,

    beforeSend: function(xhr) {
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
    },
    success: function(data) {
      alerta("Turno Borrado");
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
function modificarMant($id) {
  $.ajax({
	  
    type: "GET",
    async: false,
    url: "/simpleWeb/json/work/turnos/getTurnoById/" + $id,
    success: function(data) {
    	
    	 turno.idTurno=data.idTurno;
    	 turno.nombreTurno=data.nombreTurno;
    	 turno.descripcionTurno=data.descripcionTurno;
    	 turno.jornadaTurno=data.jornadaTurno;
    	 turno.horasTurno=(data.horasTurno==null) ? "0":data.horasTurno;
    	 turno.lunesTurno=(data.lunesTurno==null) ? "0":data.lunesTurno;
    	 turno.martesTurno=(data.martesTurno==null) ? "0":data.martesTurno;
    	 turno.miercolesTurno=(data.miercolesTurno==null) ? "0":data.miercolesTurno;
    	 turno.juevesTurno=(data.juevesTurno==null) ? "0":data.juevesTurno;
    	 turno.viernesTurno=(data.viernesTurno==null) ? "0":data.viernesTurno;
    	 turno.sabadoTurno=(data.sabadoTurno==null) ? "0":data.sabadoTurno;
    	 turno.domingoTurno=(data.domingoTurno==null) ? "0":data.domingoTurno;
    	 turno.lunesAI=(data.lunesAI==null) ? "00:00:00":data.lunesAI;
    	 turno.lunesAF=(data.lunesAF==null) ? "00:00:00":data.lunesAF;
    	 turno.martesAI=(data.martesAI==null) ? "00:00:00":data.martesAI;
    	 turno.martesAF=(data.martesAF==null) ? "00:00:00":data.martesAF;
    	 turno.miercolesAI=(data.miercolesAI==null) ? "00:00:00":data.miercolesAI;
    	 turno.miercolesAF=(data.miercolesAF==null) ? "00:00:00":data.miercolesAF;
    	 turno.juevesAI=(data.juevesAI==null) ? "00:00:00":data.juevesAI;
    	 turno.juevesAF=(data.juevesAF==null) ? "00:00:00":data.juevesAF;
    	 turno.viernesAI=(data.viernesAI==null) ? "00:00:00":data.viernesAI;
    	 turno.viernesAF=(data.viernesAF==null) ? "00:00:00":data.viernesAF;
    	 turno.sabadoAI=(data.sabadoAI==null) ? "00:00:00":data.sabadoAI;
    	 turno.sabadoAF=(data.sabadoAF==null) ? "00:00:00":data.sabadoAF;
    	 turno.domingoAI=(data.domingoAI==null) ? "00:00:00":data.domingoAI;
    	 turno.domingoAF=(data.domingoAF==null) ? "00:00:00":data.domingoAF;
    	 turno.lunesPI=(data.lunesPI==null) ? "00:00:00":data.lunesPI;
    	 turno.lunesPF=(data.lunesPF==null) ? "00:00:00":data.lunesPF;
    	 turno.martesPI=(data.martesPI==null) ? "00:00:00":data.martesPI;
    	 turno.martesPF=(data.martesPF==null) ? "00:00:00":data.martesPF;
    	 turno.miercolesPI=(data.miercolesPI==null) ? "00:00:00":data.miercolesPI;
    	 turno.miercolesPF=(data.miercolesPF==null) ? "00:00:00":data.miercolesPF;
    	 turno.juevesPI=(data.juevesPI==null) ? "00:00:00":data.juevesPI;
    	 turno.juevesPF=(data.juevesPF==null) ? "00:00:00":data.juevesPF;
    	 turno.viernesPI=(data.viernesPI==null) ? "00:00:00":data.viernesPI;
    	 turno.viernesPF=(data.viernesPF==null) ? "00:00:00":data.viernesPF;
    	 turno.sabadoPI=(data.sabadoPI==null) ? "00:00:00":data.sabadoPI;
    	 turno.sabadoPF=(data.sabadoPF==null) ? "00:00:00":data.sabadoPF;
    	 turno.domingoPI=(data.domingoPI==null) ? "00:00:00":data.domingoPI;
    	 turno.domingoPF=(data.domingoPF==null) ? "00:00:00":data.domingoPF;
    	 

    	 
    	 $("#editarIdTurno").val(turno.idTurno);
    	 $("#editarNombreTurno").val(turno.nombreTurno);
    	 $("#editarDescripcionTurno").val(turno.descripcionTurno);
         $("#editarJornadaTurno > option[value='"+turno.jornadaTurno+"']").attr('selected', 'selected');
    	 $("#editarHorasTurno").val(turno.horasTurno);
    	 $("#editarLunesTurno").val(turno.lunesTurno);
    	 $("#editarMartesTurno").val(turno.martesTurno);
    	 $("#editarMiercolesTurno").val(turno.miercolesTurno);
    	 $("#editarJuevesTurno").val(turno.juevesTurno);
    	 $("#editarViernesTurno").val(turno.viernesTurno);
    	 $("#editarSabadoTurno").val(turno.sabadoTurno);
    	 $("#editarDomingoTurno").val(turno.domingoTurno);
    	 $("#editarLunesAI").val(turno.lunesAI);
    	 $("#editarLunesAF").val(turno.lunesAF);
    	 $("#editarMartesAI").val(turno.martesAI);
    	 $("#editarMartesAF").val(turno.martesAF);
    	 $("#editarMiercolesAI").val(turno.miercolesAI);
    	 $("#editarMiercolesAF").val(turno.miercolesAF);
    	 $("#editarJuevesAI").val(turno.juevesAI);
    	 $("#editarJuevesAF").val(turno.juevesAF);
    	 $("#editarViernesAI").val(turno.viernesAI);
    	 $("#editarViernesAF").val(turno.viernesAF);
    	 $("#editarSabadoAI").val(turno.sabadoAI);
    	 $("#editarSabadoAF").val(turno.sabadoAF);
    	 $("#editarDomingoAI").val(turno.domingoAI);
    	 $("#editarDomingoAF").val(turno.domingoAF);
    	 $("#editarLunesPI").val(turno.lunesPI);
    	 $("#editarLunesPF").val(turno.lunesPF);
    	 $("#editarMartesPI").val(turno.martesPI);
    	 $("#editarMartesPF").val(turno.martesPF);
    	 $("#editarMiercolesPI").val(turno.miercolesPI);
    	 $("#editarMiercolesPF").val(turno.miercolesPF);
    	 $("#editarJuevesPI").val(turno.juevesPI);
    	 $("#editarJuevesPF").val(turno.juevesPF);
    	 $("#editarViernesPI").val(turno.viernesPI);
    	 $("#editarViernesPF").val(turno.viernesPF);
    	 $("#editarSabadoPI").val(turno.sabadoPI);
    	 $("#editarSabadoPF").val(turno.sabadoPF);
    	 $("#editarDomingoPI").val(turno.domingoPI);
    	 $("#editarDomingoPF").val(turno.domingoPF);
      //pzfgd critica funcional
      $("#editarTurnoModal").modal("toggle");
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
function agregarTurno() {
  $("#agregarTurnoModal").modal("toggle");
}
/*---------------Update Document--------------- */

function getSum($funcion, $container)
{
	var valor=$container.value;
	var id=$container.id;
	
	if(id.includes("Lunes"))
	{
		sum($funcion,"Lunes");
	}
	else if(id.includes("Martes"))
	{
		sum($funcion,"Martes");
	}
	else if(id.includes("Miercoles"))
	{
		sum($funcion,"Miercoles");
	}
	else if(id.includes("Jueves"))
	{
		sum($funcion,"Jueves");
	}
	else if(id.includes("Viernes"))
	{
		sum($funcion,"Viernes");
	}
	else if(id.includes("Sabado"))
	{
		sum($funcion,"Sabado");
	}
	else if(id.includes("Domingo"))
	{
		sum($funcion,"Domingo");
	}
	
	
	
	
	
}
function sum($funcion, $dia)
{
var idAI=$funcion+$dia+"AI";
var AI=$("#"+idAI).val().split(":");
var aih=parseInt(AI[0]),aim=parseInt(AI[1]);
var idAF=$funcion+$dia+"AF";
var AF=$("#"+idAF).val().split(":");
var afh=parseInt(AF[0]),afm=parseInt(AF[1]);
var idPI=$funcion+$dia+"PI";
var PI=$("#"+idPI).val().split(":");
var pih=parseInt(PI[0]),pim=parseInt(PI[1]);
var idPF=$funcion+$dia+"PF";
var PF=$("#"+idPF).val().split(":");
var pfh=parseInt(PF[0]),pfm=parseInt(PF[1]);
var ah=0,am=0;
var ph=0,pm=0;
var Turno=$funcion+$dia+"Turno";




if(afh>aih)
{
	if(afm>=aim)
	{
		ah=afh-aih;
		ah=parseFloat(ah);
		am=afm-aim;
		am=parseFloat(am/60);
		

	}
	else{
		ah=afh-aih-1;
		am=60+(afm-aim);
		am=parseFloat(am/60);
		
	}
}
else if(afh==aih){
	if(afm>=aim)
	{
		ah=afh-aih;
		ah=parseFloat(ah);
		am=afm-aim;
		am=parseFloat(am/60);
	}
	else{
		ah=24+(afh-aih)-1;
		am=60+(afm-aim);
		am=parseFloat(am/60);
	}
}
else{
	
	if(afm>=aim)
	{
		ah=24+afh-aih;
		ah=parseFloat(ah);
		am=afm-aim;
		am=parseFloat(am/60);
	}
	else{
		ah=24+afh-aih-1;
		am=60+(afm-aim);
		am=parseFloat(am/60);
	}
}
if(pfh>pih)
{
	if(pfm>=pim)
	{
		ph=pfh-pih;
		ph=parseFloat(ph);
		pm=pfm-pim;
		pm=parseFloat(pm/60);
	}
	else{
		ph=pfh-pih-1;
		pm=60+(pfm-pim);
		pm=parseFloat(pm/60);
	}
}
else if(pfh==pih){
	if(pfm>=pim)
	{
		ph=pfh-pih;
		ph=parseFloat(ph);
		pm=pfm-pim;
		pm=parseFloat(pm/60);
	}
	else{
		ph=24+(pfh-pih)-1;
		pm=60+(pfm-pim);
		pm=parseFloat(pm/60);
	}
}
else{
	
	if(pfm>=pim)
	{
		ph=24+pfh-pih;
		ph=parseFloat(ph);
		pm=pfm-pim;
		pm=parseFloat(pm/60);
	}
	else{
		ph=24+pfh-pih-1;
		pm=60+(pfm-pim);
		pm=parseFloat(pm/60);
	}
}
$("#"+Turno).val(ph+ah+am+pm);
	
}
function valTH($string)
{
	var semana=new Array();
	 semana.push($("#"+$string+"LunesTurno").val());
	 semana.push($("#"+$string+"MartesTurno").val());
	 semana.push($("#"+$string+"MiercolesTurno").val());
	 semana.push($("#"+$string+"JuevesTurno").val());
	 semana.push($("#"+$string+"ViernesTurno").val());
	 semana.push($("#"+$string+"SabadoTurno").val());
	 semana.push($("#"+$string+"DomingoTurno").val());
	 
	var suma=0; 
	 for(var i=0;i<semana.length;i++)
	 {
		 suma=suma+parseFloat(semana[i]);
	 }
	 
	 if(suma<=parseFloat($("#"+$string+"HorasTurno").val()))
	 {
		 
	 }
	 else
	{
		 
	} 
	 
}

function check($a, $in)
{
	var value=$in.value;
	var s=value.split(":");
	var AI="";
	var AF="";
	var PI="";
	var PF="";
	var ha=0, ma=0;
	
	
	
	if($a=='AI')
	{	
		

		AI=$in.id;
		if(parseFloat(s[0])<6&& parseFloat(s[0])!=0)
		{
			s[0]="06";
			s=s.join(":");
			$("#"+$in.id).val(s);
		}
		if(parseFloat(s[0])>8&& parseFloat(s[0])!=0)
		{
			s[0]="08";
			s=s.join(":");
			$("#"+$in.id).val(s);
		}
	}
	
	else if($a=='AF')
	{
		
		if(parseFloat(s[0])<11&& parseFloat(s[0])!=0)
		{
			s[0]="11";
			s=s.join(":");
			$("#"+$in.id).val(s);
		}
		if(parseFloat(s[0])>13&& parseFloat(s[0])!=0)
		{
			s[0]="13";
			s=s.join(":");
			$("#"+$in.id).val(s);
		}
		
	}
	else if($a=='PI')
	{
		
		PI=$in.id;
		if(parseFloat(s[0])<11&& parseFloat(s[0])!=0)
		{
			s[0]="11";
			s=s.join(":");
			$("#"+$in.id).val(s);
		}
		if(parseFloat(s[0])>14&& parseFloat(s[0])!=0)
		{
			s[0]="14";
			s=s.join(":");
			$("#"+$in.id).val(s);
		}
	}
	else if($a=='PF')
	{
		
		PF=$in.id;
		if(parseFloat(s[0])<14&& parseFloat(s[0])!=0)
		{
			s[0]="14";
			s=s.join(":");
			$("#"+$in.id).val(s);
		}
		if(parseFloat(s[0])>19&& parseFloat(s[0])!=0)
		{
			s[0]="19";
			s=s.join(":");
			$("#"+$in.id).val(s);
		}
	}
	
}

function validate($input)
{
	//first validation 
	
	//sumatoria<= cantidad de horas
	var validacion1=validarSumatoria($input);
	
	var validacion2=validarHoras($input);
	
	if(validacion1&&validacion2)
	{
		return true;
	}
	else
	{
		return false;
	}
	
	
	
	
	
}
function validarSumatoria($input)
{
	var suma=0;
	var input="";
	var comparativa=parseFloat($("#"+$input+"HorasTurno").val());
	
	
	for(var i=0;i<semana.length;i++)
	{
		input="#"+$input+semana[i]+"Turno";
		suma=suma+ parseFloat($(input).val());
	}
	if(comparativa>=suma)
	{
		return true;
	}
	else{
		return false;
	}
	
	
}
function validarHoras($input)
{
	var arregloMensajes=new Array();
	var AF="";
	var PI="";
	var AFValue=new Array();
	var PIValue=new Array();
	var pih=0,pim=0;
	var afh=0,ahm=0;
	
	 arregloMensajes.push("Usted tiene los siguientes errores: ");
	
	for(var a=0;a<semana.length;a++)
	{
		AF="#"+$input+semana[a]+"AF";
		PI="#"+$input+semana[a]+"PI";
		AFValue=$(AF).val().split(":");
		PIValue=$(PI).val().split(":");
		afh=parseFloat(AFValue[0]);
		afm=parseFloat(AFValue[1]);
		pih=parseFloat(PIValue[0]);
		pim=parseFloat(PIValue[1]);
		
		
		if(pih>afh)
		{
			
		}
		else if(pih==afh)
		{
			if(pim>afm)
			{
				
			}
			else if(pim==afm)
			{
				
			}
			else
			{
				arregloMensajes.push("-El día "+semana[a]+" tiene horarios erróneos <br> ");
			}
		}
		else
		{
			arregloMensajes.push("-El dia "+semana[a]+" Tiene horarios erroneos <br> ");
		}
	}
	var texto="";
	 if(arregloMensajes.length>=2)
	 {
		 
		 
		 for(var b=0;b<arregloMensajes.length;b++)
		 {
			 texto=texto+arregloMensajes[b];
		 }
		 $("#"+$input+"TextoResponseFalse").html(texto);
		 return false;
		 
	 }
	 else{
		 return true;
	 }
	
	
	
	
	
}

function updateTurno() {
  $id = $("#editarIdTurno").val();
  var t=new Object();
  t.idTurno=$("#editarIdTurno").val();
  t.nombreTurno=$("#editarNombreTurno").val();
  t.descripcionTurno=$("#editarDescripcionTurno").val();
  t.jornadaTurno=$("#editarJornadaTurno").val();
  t.horasTurno=$("#editarHorasTurno").val();
  t.lunesTurno=$("#editarLunesTurno").val();
  t.martesTurno=$("#editarMartesTurno").val();
  t.miercolesTurno=$("#editarMiercolesTurno").val();
  t.juevesTurno=$("#editarJuevesTurno").val();
  t.viernesTurno=$("#editarViernesTurno").val();
  t.sabadoTurno=$("#editarSabadoTurno").val();
  t.domingoTurno=$("#editarDomingoTurno").val();
  t.lunesAI=$("#editarLunesAI").val()!=""?( $("#editarLunesAI").val().length<=5?$("#editarLunesAI").val()+":00":$("#editarLunesAI").val()):"00:00:00";
  t.lunesAF=$("#editarLunesAF").val()!=""?( $("#editarLunesAF").val().length<=5?$("#editarLunesAF").val()+":00":$("#editarLunesAF").val()):"00:00:00";
  t.martesAI=$("#editarMartesAI").val()!=""?( $("#editarMartesAI").val().length<=5?$("#editarMartesAI").val()+":00":$("#editarMartesAI").val()):"00:00:00";
  t.martesAF=$("#editarMartesAF").val()!=""?( $("#editarMartesAF").val().length<=5?$("#editarMartesAF").val()+":00":$("#editarMartesAF").val()):"00:00:00";
  t.miercolesAI=$("#editarMiercolesAI").val()!=""?( $("#editarMiercolesAI").val().length<=5?$("#editarMiercolesAI").val()+":00":$("#editarMiercolesAI").val()):"00:00:00";
  t.miercolesAF=$("#editarMiercolesAF").val()!=""?( $("#editarMiercolesAF").val().length<=5?$("#editarMiercolesAF").val()+":00":$("#editarMiercolesAF").val()):"00:00:00";
  t.juevesAI=$("#editarJuevesAI").val()!=""?( $("#editarJuevesAI").val().length<=5?$("#editarJuevesAI").val()+":00":$("#editarJuevesAI").val()):"00:00:00";
  t.juevesAF=$("#editarJuevesAF").val()!=""?( $("#editarJuevesAF").val().length<=5?$("#editarJuevesAF").val()+":00":$("#editarJuevesAF").val()):"00:00:00";
  t.viernesAI=$("#editarViernesAI").val()!=""?( $("#editarViernesAI").val().length<=5?$("#editarViernesAI").val()+":00":$("#editarViernesAI").val()):"00:00:00";
  t.viernesAF=$("#editarViernesAF").val()!=""?( $("#editarViernesAF").val().length<=5?$("#editarViernesAF").val()+":00":$("#editarViernesAF").val()):"00:00:00";
  t.sabadoAI=$("#editarSabadoAI").val()!=""?( $("#editarSabadoAI").val().length<=5?$("#editarSabadoAI").val()+":00":$("#editarSabadoAI").val()):"00:00:00";
  t.sabadoAF=$("#editarSabadoAF").val()!=""?( $("#editarSabadoAF").val().length<=5?$("#editarSabadoAF").val()+":00":$("#editarSabadoAF").val()):"00:00:00";
  t.domingoAI=$("#editarDomingoAI").val()!=""?( $("#editarDomingoAI").val().length<=5?$("#editarDomingoAI").val()+":00":$("#editarDomingoAI").val()):"00:00:00";
  t.domingoAF=$("#editarDomingoAF").val()!=""?( $("#editarDomingoAF").val().length<=5?$("#editarDomingoAF").val()+":00":$("#editarDomingoAF").val()):"00:00:00";
  t.lunesPI=$("#editarLunesPI").val()!=""?( $("#editarLunesPI").val().length<=5?$("#editarLunesPI").val()+":00":$("#editarLunesPI").val()):"00:00:00";
  t.lunesPF=$("#editarLunesPF").val()!=""?( $("#editarLunesPF").val().length<=5?$("#editarLunesPF").val()+":00":$("#editarLunesPF").val()):"00:00:00";
  t.martesPI=$("#editarMartesPI").val()!=""?( $("#editarMartesPI").val().length<=5?$("#editarMartesPI").val()+":00":$("#editarMartesPI").val()):"00:00:00";
  t.martesPF=$("#editarMartesPF").val()!=""?( $("#editarMartesPF").val().length<=5?$("#editarMartesPF").val()+":00":$("#editarMartesPF").val()):"00:00:00";
  t.miercolesPI=$("#editarMiercolesPI").val()!=""?( $("#editarMiercolesPI").val().length<=5?$("#editarMiercolesPI").val()+":00":$("#editarMiercolesPI").val()):"00:00:00";
  t.miercolesPF=$("#editarMiercolesPF").val()!=""?( $("#editarMiercolesPF").val().length<=5?$("#editarMiercolesPF").val()+":00":$("#editarMiercolesPF").val()):"00:00:00";
  t.juevesPI=$("#editarJuevesPI").val()!=""?( $("#editarJuevesPI").val().length<=5?$("#editarJuevesPI").val()+":00":$("#editarJuevesPI").val()):"00:00:00";
  t.juevesPF=$("#editarJuevesPF").val()!=""?( $("#editarJuevesPF").val().length<=5?$("#editarJuevesPF").val()+":00":$("#editarJuevesPF").val()):"00:00:00";
  t.viernesPI=$("#editarViernesPI").val()!=""?( $("#editarViernesPI").val().length<=5?$("#editarViernesPI").val()+":00":$("#editarViernesPI").val()):"00:00:00";
  t.viernesPF=$("#editarViernesPF").val()!=""?( $("#editarViernesPF").val().length<=5?$("#editarViernesPF").val()+":00":$("#editarViernesPF").val()):"00:00:00";
  t.sabadoPI=$("#editarSabadoPI").val()!=""?( $("#editarSabadoPI").val().length<=5?$("#editarSabadoPI").val()+":00":$("#editarSabadoPI").val()):"00:00:00";
  t.sabadoPF=$("#editarSabadoPF").val()!=""?( $("#editarSabadoPF").val().length<=5?$("#editarSabadoPF").val()+":00":$("#editarSabadoPF").val()):"00:00:00";
  t.domingoPI=$("#editarDomingoPI").val()!=""?( $("#editarDomingoPI").val().length<=5?$("#editarDomingoPI").val()+":00":$("#editarDomingoPI").val()):"00:00:00";
  t.domingoPF=$("#editarDomingoPF").val()!="" ?( $("#editarDomingoPF").val().length<=5?$("#editarDomingoPF").val()+":00":$("#editarDomingoPF").val()):"00:00:00";
  
  

  
 

  
  
  
  $.ajax({
	    type: "POST",
	    async: false,
	    url: "/simpleWeb/json/work/turnos/updateTurno/",
	    data: JSON.stringify(t),
	    beforeSend: function(xhr) {
	      xhr.setRequestHeader("Accept", "application/json");
	      xhr.setRequestHeader("Content-Type", "application/json");
	    },
	    success: function(data) {
	    	$("#editarTurnoModal").modal("toggle");
	    	alerta("Turno Actualizado");
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
