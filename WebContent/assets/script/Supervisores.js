
var params=new Object();

//objeto con variables de los modals
params.Modals=new Object();
params.Modals.insertModalTag="#agregarSupervisorModal";
params.Modals.updateModalTag="#editarSupervisorModal";
//objeto con definiciones y tags de formularios
 //formulario insert
params.Formularios=new Object();
params.Formularios.Create=new Object();
params.Formularios.Create.codigo="SUPERVISOR";
params.Formularios.Create.tagNombre="#agregarNombreSupervisor";
params.Formularios.Create.tagRutParametro="#agregarRutSupervisor";
params.Formularios.Create.Text="Supervisor creado con éxito";

//formulario update
params.Formularios.Update=new Object();
params.Formularios.Update.codigo="SUPERVISOR";
params.Formularios.Update.id="#editarIdSupervisor";
params.Formularios.Update.tagNombre="#editarNombreSupervisor";
params.Formularios.Update.tagRutParametro="#editarRutSupervisor";
params.Formularios.Update.Text="Supervisor editado con éxito";

//parametros generales de la tabla  
params.tableTag="#tbl_Supervisor";
params.hasCodPrevired=false;
params.hasRutParametro=true;

//parametros referentes a la funcion Create de ajax
params.Create=new Object();
params.Create.url="../../simpleWeb/json/work/Supervisores/createSupervisor/";
params.Create.Text="Supervisor Creado";

params.Read=new Object();
params.Read.url="../../simpleWeb/json/work/Supervisores/getSupervisores/";
params.Read.urlById="../../simpleWeb/json/work/Supervisores/getSupervisorById/";
params.Read.params=new Object();

params.Update=new Object();
params.Update.url="../../simpleWeb/json/work/Supervisores/updateSupervisor/";
params.Update.Text="Supervisor Actualizado";
params.Update.params=new Object();


params.Delete=new Object();
params.Delete.url="../../simpleWeb/json/work/Supervisores/deleteSupervisor/";
params.Delete.Text="Supervisor borrado con éxito";


var crud = new CRUD(params);
$( document ).ready(function() {
	
	crud.readFromParams();
	
});
$(".newRut").rut();
$("#editSupervisorForm").submit(function(event) {
	  event.preventDefault();
	  
		  crud.updateFromParams();
	  
	});
$("#insertSupervisorForm").submit(function(event) {
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
