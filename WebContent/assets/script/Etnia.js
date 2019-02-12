
var params=new Object();

//objeto con variables de los modals
params.Modals=new Object();
params.Modals.insertModalTag="#agregarEtniaModal";
params.Modals.updateModalTag="#editarEtniaModal";
//objeto con definiciones y tags de formularios
 //formulario insert
params.Formularios=new Object();
params.Formularios.Create=new Object();
params.Formularios.Create.codigo="ETNIA";
params.Formularios.Create.tagNombre="#agregarNombreEtnia";
params.Formularios.Create.Text="Etnia creada con éxito";

//formulario update
params.Formularios.Update=new Object();
params.Formularios.Update.codigo="ETNIA";
params.Formularios.Update.id="#editarIdEtnia";
params.Formularios.Update.tagNombre="#editarNombreEtnia";
params.Formularios.Update.Text="Etnia editada con éxito";

//parametros generales de la tabla  
params.tableTag="#tbl_Etnia";
params.hasCodPrevired=false;
params.hasRutParametro=false;

//parametros referentes a la funcion Create de ajax
params.Create=new Object();
params.Create.url="../../simpleWeb/json/work/Etnias/createEtnia/";
params.Create.Text="Etnia Creada";

params.Read=new Object();
params.Read.url="../../simpleWeb/json/work/Etnias/getEtnias/";
params.Read.urlById="../../simpleWeb/json/work/Etnias/getEtniaById/";
params.Read.params=new Object();

params.Update=new Object();
params.Update.url="../../simpleWeb/json/work/Etnias/updateEtnia/";
params.Update.Text="Etnia Actualizada";
params.Update.params=new Object();


params.Delete=new Object();
params.Delete.url="../../simpleWeb/json/work/Etnias/deleteEtnia/";
params.Delete.Text="Etnia borrada con éxito";


var crud = new CRUD(params);
$( document ).ready(function() {
	
	crud.readFromParams();
	
});
$("#editEtniaForm").submit(function(event) {
	  event.preventDefault();
	  
		  crud.updateFromParams();
	  
	});
$("#insertEtniaForm").submit(function(event) {
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
