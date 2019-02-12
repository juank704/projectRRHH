
var params=new Object();

//objeto con variables de los modals
params.Modals=new Object();
params.Modals.insertModalTag="#agregarParentescoModal";
params.Modals.updateModalTag="#editarParentescoModal";
//objeto con definiciones y tags de formularios
 //formulario insert
params.Formularios=new Object();
params.Formularios.Create=new Object();
params.Formularios.Create.codigo="PARENTESCO";
params.Formularios.Create.tagNombre="#agregarNombreParentesco";
params.Formularios.Create.tagRutParametro="#agregarRutParentesco";
params.Formularios.Create.tagCodPrevired="#agregarCodigoParentesco";
params.Formularios.Create.Text="PARENTESCO creado con éxito";

//formulario update
params.Formularios.Update=new Object();
params.Formularios.Update.codigo="PARENTESCO";
params.Formularios.Update.id="#editarIdParentesco";
params.Formularios.Update.tagNombre="#editarNombreParentesco";

params.Formularios.Update.Text="Parentesco editado con éxito";

//parametros generales de la tabla  
params.tableTag="#tbl_Parentesco";
params.hasCodPrevired=false;
params.hasRutParametro=false;
params.hasCodSap=false;

//parametros referentes a la funcion Create de ajax
params.Create=new Object();
params.Create.url="../../simpleWeb/json/work/Parentescos/createParentesco/";
params.Create.Text="Parentesco Creado";

params.Read=new Object();
params.Read.url="../../simpleWeb/json/work/Parentescos/getParentescos/";
params.Read.urlById="../../simpleWeb/json/work/Parentescos/getParentescoById/";
params.Read.params=new Object();

params.Update=new Object();
params.Update.url="../../simpleWeb/json/work/Parentescos/updateParentesco/";
params.Update.Text="AFP Actualizada";
params.Update.params=new Object();


params.Delete=new Object();
params.Delete.url="../../simpleWeb/json/work/Parentescos/deleteParentesco/";
params.Delete.Text="Parentesco borrado con éxito";


var crud = new CRUD(params);
$( document ).ready(function() {
	
	crud.readFromParams();
	
});



$("#editParentescoForm").submit(function(event) {
	  event.preventDefault();
	  
		  crud.updateFromParams();
	  
	});
$("#insertParentescoForm").submit(function(event) {
	  event.preventDefault();
	  
		  crud.createFromParams();
	  
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
