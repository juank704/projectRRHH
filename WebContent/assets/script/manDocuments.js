$(document).ready(function() {});

function buscar($Id, $dd) {
  swal({
    position: "top-end",
    type: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 1500
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
/*----------------------------------------*/
function onLoadDocuments(){
	
      $('#tbl_doc').dataTable().fnClearTable();
         $('#tbl_doc').dataTable().fnDestroy();
         
  
}
