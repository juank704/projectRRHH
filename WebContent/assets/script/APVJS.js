
var params=new Object();

//objeto con variables de los modals
params.Modals=new Object();
params.Modals.insertModalTag="#agregarAPVModal";
params.Modals.updateModalTag="#editarAPVModal";
//objeto con definiciones y tags de formularios
 //formulario insert
params.Formularios=new Object();
params.Formularios.Create=new Object();
params.Formularios.Create.codigo="APV";
params.Formularios.Create.tagNombre="#agregarNombreAPV";
params.Formularios.Create.tagRutParametro="#agregarRutAPV";
params.Formularios.Create.tagCodPrevired="#agregarCodigoAPV";
params.Formularios.Create.tagCodSap="#agregarCodSapAPV";
params.Formularios.Create.Text="APV editada con éxito";
//formulario update
params.Formularios.Update=new Object();
params.Formularios.Update.codigo="APV";
params.Formularios.Update.id="#editarIdAPV";
params.Formularios.Update.tagNombre="#editarNombreAPV";
params.Formularios.Update.tagRutParametro="#editarRutAPV";
params.Formularios.Update.tagCodPrevired="#editarCodigoAPV";
params.Formularios.Update.tagCodSap="#editarCodSapAPV";
params.Formularios.Update.Text="APV Creada con éxito";

//parametros generales de la tabla  
params.tableTag="#tbl_APV";
params.hasCodPrevired=true;
params.hasRutParametro=true;
params.hasCodSap=true;

//parametros referentes a la funcion Create de ajax
params.Create=new Object();
params.Create.url="../../simpleWeb/json/work/APVs/createAPV/";
params.Create.Text="APV Creada";

params.Read=new Object();
params.Read.url="../../simpleWeb/json/work/APVs/getAPVs/";
params.Read.urlById="../../simpleWeb/json/work/APVs/getAPVById/";
params.Read.params=new Object();

params.Update=new Object();
params.Update.url="../../simpleWeb/json/work/APVs/updateAPV/";
params.Update.Text="APV Actualizada";
params.Update.params=new Object();


params.Delete=new Object();
params.Delete.url="../../simpleWeb/json/work/APVs/deleteAPV/";
params.Delete.Text="APV borrado con éxito";


var crud = new CRUD(params);
$( document ).ready(function() {
	
	crud.readFromParams();
	
});

	$(".newRut").rut();




$("#editAPVForm").submit(function(event) {
	  event.preventDefault();
	  if($.rut.validar($("#editarRutAPV").val()) && $.trim($("#editarRutAPV").val()) != ''&&($("#editarRutAPV").val().length<13))
	  {
		  crud.updateFromParams();
	  }
	  else{
		  $("#fwe").css("display","block");
	  }
	  
	});
$("#insertAPVForm").submit(function(event) {
	  event.preventDefault();
	  if($.rut.validar($("#agregarRutAPV").val()) &&($("#agregarRutAPV").val().length<14))
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
