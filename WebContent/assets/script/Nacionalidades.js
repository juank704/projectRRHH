
var params=new Object();

//objeto con variables de los modals
params.Modals=new Object();
params.Modals.insertModalTag="#agregarNacionalidadModal";
params.Modals.updateModalTag="#editarNacionalidadModal";
//objeto con definiciones y tags de formularios
 //formulario insert
params.Formularios=new Object();
params.Formularios.Create=new Object();
params.Formularios.Create.codigo="NACIONALIDAD";
params.Formularios.Create.tagNombre="#agregarNombreNacionalidad"
params.Formularios.Create.Text="Nacionalidad creada con éxito";
//formulario update
params.Formularios.Update=new Object();
params.Formularios.Update.codigo="NACIONALIDAD";
params.Formularios.Update.id="#editarIdNacionalidad";
params.Formularios.Update.tagNombre="#editarNombreNacionalidad"
params.Formularios.Update.Text="Nacionalidad editada con éxito";



//parametros generales de la tabla  
params.tableTag="#tbl_Nacionalidades";
params.hasCodPrevired=false;
params.hasRutParametro=false;
params.hasCodSap=false;

//parametros referentes a la funcion Create de ajax
params.Create=new Object();
params.Create.url="../../simpleWeb/json/work/Nacionalidades/createNacionalidad/";
params.Create.Text="Nacionalidad Creada";

params.Read=new Object();
params.Read.url="../../simpleWeb/json/work/Nacionalidades/getNacionalidades/";
params.Read.urlById="../../simpleWeb/json/work/Nacionalidades/getNacionalidadById/";
params.Read.params=new Object();

params.Update=new Object();
params.Update.url="../../simpleWeb/json/work/Nacionalidades/updateNacionalidad/";
params.Update.Text="Nacionalidad actualizada";
params.Update.params=new Object();

params.Delete=new Object();
params.Delete.url="../../simpleWeb/json/work/Nacionalidades/deleteNacionalidad/";
params.Delete.Text="Nacionalidad borrada con éxito";
var crud = new CRUD(params);

$( document ).ready(function() {

	crud.readFromParams();
	
});
$("#editNacionalidadForm").submit(function(event) {
	  event.preventDefault();
	  crud.updateFromParams();
	});
$("#insertNacionalidadForm").submit(function(event) {
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