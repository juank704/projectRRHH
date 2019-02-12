var params=new Object();

//objeto con variables de los modals
params.Modals=new Object();
params.Modals.insertModalTag="#agregarIsapreModal";
params.Modals.updateModalTag="#editarIsapreModal";
//objeto con definiciones y tags de formularios
 //formulario insert
params.Formularios=new Object();
params.Formularios.Create=new Object();
params.Formularios.Create.codigo="ISAPRE";
params.Formularios.Create.tagNombre="#agregarNombreIsapre"
params.Formularios.Create.tagRutParametro="#agregarRutIsapre";
params.Formularios.Create.tagCodPrevired="#agregarCodigoIsapre";
params.Formularios.Create.tagCodSap="#agregarCodSapIsapre";
params.Formularios.Create.Text="ISAPRE creada con éxito";

//formulario update
params.Formularios.Update=new Object();
params.Formularios.Update.codigo="ISAPRE";
params.Formularios.Update.id="#editarIdIsapre";
params.Formularios.Update.tagNombre="#editarNombreIsapre";
params.Formularios.Update.tagRutParametro="#editarRutIsapre";
params.Formularios.Update.tagCodPrevired="#editarCodigoIsapre";
params.Formularios.Update.tagCodSap="#editarCodSapIsapre";
params.Formularios.Update.Text="ISAPRE editada con éxito";


//parametros generales de la tabla  
params.tableTag="#tbl_Isapre";
params.hasCodPrevired=true;
params.hasRutParametro=true;
params.hasCodSap=true;

//parametros referentes a la funcion Create de ajax
params.Create=new Object();
params.Create.url="../../simpleWeb/json/work/Isapres/createIsapre/";
params.Create.Text="Isapre Creada";

params.Read=new Object();
params.Read.url="../../simpleWeb/json/work/Isapres/getIsapres/";
params.Read.urlById="../../simpleWeb/json/work/Isapres/getIsapreById/";
params.Read.params=new Object();

params.Update=new Object();
params.Update.url="../../simpleWeb/json/work/Isapres/updateIsapre/";
params.Update.Text="Isapre actualizada";
params.Update.params=new Object();

params.Delete=new Object();
params.Delete.url="../../simpleWeb/json/work/Isapres/deleteIsapre/";
params.Delete.Text="Isapre borrada con éxito";

var crud = new CRUD(params);

$( document ).ready(function() {
	crud.readFromParams();
});
$("#editIsapreForm").submit(function(event) {
	  event.preventDefault();
	  if($.rut.validar($("#editarRutIsapre").val()) && $.trim($("#editarRutIsapre").val()) != ''&&($("#editarRutIsapre").val().length<13))
	  {
		  crud.updateFromParams();
	  }
	  else{
		  $("#fwe").css("display","block");
	  }
	});
$("#insertIsapreForm").submit(function(event) {
	  event.preventDefault();
	  if($.rut.validar($("#agregarRutIsapre").val()) && $.trim($("#agregarRutIsapre").val()) != ''&&($("#agregarRutIsapre").val().length<13))
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