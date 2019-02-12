
var params=new Object();

//objeto con variables de los modals
params.Modals=new Object();
params.Modals.insertModalTag="#agregarAFPmModal";
params.Modals.updateModalTag="#editarAFPmModal";
//objeto con definiciones y tags de formularios
 //formulario insert
params.Formularios=new Object();
params.Formularios.Create=new Object();
params.Formularios.Create.codigo="AFP";
params.Formularios.Create.tagNombre="#agregarNombreAFPm";
params.Formularios.Create.tagRutParametro="#agregarRutAFPm";
params.Formularios.Create.tagCodPrevired="#agregarCodigoAFPm";
params.Formularios.Create.tagCodSap="#agregarCodSapAFPm";
params.Formularios.Create.Text="AFP creada con éxito";

//formulario update
params.Formularios.Update=new Object();
params.Formularios.Update.codigo="AFP";
params.Formularios.Update.id="#editarIdAFPm";
params.Formularios.Update.tagNombre="#editarNombreAFPm";
params.Formularios.Update.tagRutParametro="#editarRutAFPm";
params.Formularios.Update.tagCodPrevired="#editarCodigoAFPm";
params.Formularios.Update.tagCodSap="#editarCodSapAFPm";
params.Formularios.Update.Text="AFP editada con éxito";

//parametros generales de la tabla  
params.tableTag="#tbl_AFPm";
params.hasCodPrevired=true;
params.hasRutParametro=true;
params.hasCodSap=true;

//parametros referentes a la funcion Create de ajax
params.Create=new Object();
params.Create.url="../../simpleWeb/json/work/AFPm/createAFPm/";
params.Create.Text="AFP Creada";

params.Read=new Object();
params.Read.url="../../simpleWeb/json/work/AFPm/getAFPms/";
params.Read.urlById="../../simpleWeb/json/work/AFPm/getAFPmById/";
params.Read.params=new Object();

params.Update=new Object();
params.Update.url="../../simpleWeb/json/work/AFPm/updateAFPm/";
params.Update.Text="AFP Actualizada";
params.Update.params=new Object();


params.Delete=new Object();
params.Delete.url="../../simpleWeb/json/work/AFPm/deleteAFPm/";
params.Delete.Text="AFP borrada con éxito";


var crud = new CRUD(params);
$( document ).ready(function() {
	
	crud.readFromParams();
	
});


$(".newRut").rut();
$("#editAFPmForm").submit(function(event) {
	  event.preventDefault();
	  if($.rut.validar($("#editarRutAFPm").val()) && $.trim($("#editarRutAFPm").val()) != ''&&($("#editarRutAFPm").val().length<13))
	  {
		  crud.updateFromParams();
	  }
	  else{
		  $("#fwe").css("display","block");
	  }
	});
$("#insertAFPmForm").submit(function(event) {
	  event.preventDefault();
	  if($.rut.validar($("#agregarRutAFPm").val()) && $.trim($("#agregarRutAFPm").val()) != ''&&($("#agregarRutAFPm").val().length<13))
	  {
		  crud.createFromParams();
	  }
	  else{
		  $("#fwa").css("display","block");
	  }
	});
function modificarMant($id)
{
	crud.chargeForEdit($id);
}
function agregar()
{
	crud.AbrirCerrarModalCreate();
}
function cerrarAgregar()
{
	crud.AbrirCerrarModalCreate();
}
function cerrarUpdate()
{
	crud.AbrirCerrarModalUpdate();
}
function borrarMant($id)
{
	crud.borrarMant($id);
}
