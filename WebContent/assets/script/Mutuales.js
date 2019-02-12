
var params=new Object();

//objeto con variables de los modals
params.Modals=new Object();
params.Modals.insertModalTag="#agregarMutualModal";
params.Modals.updateModalTag="#editarMutualModal";
//objeto con definiciones y tags de formularios
 //formulario insert
params.Formularios=new Object();
params.Formularios.Create=new Object();
params.Formularios.Create.codigo="MUTUALES";
params.Formularios.Create.tagNombre="#agregarNombreMutual"
params.Formularios.Create.tagRutParametro="#agregarRutMutual";
params.Formularios.Create.tagCodPrevired="#agregarCodigoMutual";
params.Formularios.Create.tagCodSap="#agregarCodSapMutual";
params.Formularios.Create.Text="Mutual creada con éxito";

//formulario update
params.Formularios.Update=new Object();
params.Formularios.Update.codigo="MUTUALES";
params.Formularios.Update.id="#editarIdMutual";
params.Formularios.Update.tagNombre="#editarNombreMutual";
params.Formularios.Update.tagRutParametro="#editarRutMutual";
params.Formularios.Update.tagCodPrevired="#editarCodigoMutual";
params.Formularios.Update.tagCodSap="#editarCodSapMutual";
params.Formularios.Update.Text="Mutual editada con éxito";


//parametros generales de la tabla  
params.tableTag="#tbl_Mutual";
params.hasCodPrevired=true;
params.hasRutParametro=true;
params.hasCodSap=true;

//parametros referentes a la funcion Create de ajax
params.Create=new Object();
params.Create.url="../../simpleWeb/json/work/Mutuales/createMutual/";
params.Create.Text="Mutual Creada";

params.Read=new Object();
params.Read.url="../../simpleWeb/json/work/Mutuales/getMutuales/";
params.Read.urlById="../../simpleWeb/json/work/Mutuales/getMutualById/";
params.Read.params=new Object();

params.Update=new Object();
params.Update.url="../../simpleWeb/json/work/Mutuales/updateMutual/";
params.Update.Text="Mutual actualizada";
params.Update.params=new Object();

params.Delete=new Object();
params.Delete.url="../../simpleWeb/json/work/Mutuales/deleteMutual/";
params.Delete.Text="Mutual borrada con éxito";

var crud = new CRUD(params);

$( document ).ready(function() {

	crud.readFromParams();
	
});
$("#editMutualForm").submit(function(event) {
	  event.preventDefault();
	  if($.rut.validar($("#editarRutMutual").val()) && $.trim($("#editarRutMutual").val()) != ''&&($("#editarRutMutual").val().length<13))
	  {
		  crud.updateFromParams();
	  }
	  else{
		  $("#fwe").css("display","block");
	  }
	});
$("#insertMutualForm").submit(function(event) {
	  event.preventDefault();
	  if($.rut.validar($("#agregarRutMutual").val()) && $.trim($("#agregarRutMutual").val()) != ''&&($("#agregarRutMutual").val().length<13))
	  {
		  crud.createFromParams();
	  }
	  else{
		  $("#fwa").css("display","block");
	  }
	});

$(".newRut").rut();

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