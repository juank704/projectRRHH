
var params=new Object();

//objeto con variables de los modals
params.Modals=new Object();
params.Modals.insertModalTag="#agregarInstitucionModal";
params.Modals.updateModalTag="#editarInstitucionModal";
//objeto con definiciones y tags de formularios
 //formulario insert
params.Formularios=new Object();
params.Formularios.Create=new Object();
params.Formularios.Create.codigo="INSTITUCIONES";
params.Formularios.Create.tagNombre="#agregarNombreInstitucion";
params.Formularios.Create.Text="Institucion creada con éxito";

//formulario update
params.Formularios.Update=new Object();
params.Formularios.Update.codigo="INSTITUCIONES";
params.Formularios.Update.id="#editarIdInstitucion";
params.Formularios.Update.tagNombre="#editarNombreInstitucion";

params.Formularios.Update.Text="Institucion editada con éxito";

//parametros generales de la tabla  
params.tableTag="#tbl_Institucion";
params.hasCodPrevired=false;
params.hasRutParametro=false;

//parametros referentes a la funcion Create de ajax
params.Create=new Object();
params.Create.url="../../simpleWeb/json/work/Instituciones/createInstitucion/";
params.Create.Text="Institución Creada";

params.Read=new Object();
params.Read.url="../../simpleWeb/json/work/Instituciones/getInstituciones/";
params.Read.urlById="../../simpleWeb/json/work/Instituciones/getInstitucionById/";
params.Read.params=new Object();

params.Update=new Object();
params.Update.url="../../simpleWeb/json/work/Instituciones/updateInstitucion/";
params.Update.Text="Institucion Actualizada";
params.Update.params=new Object();


params.Delete=new Object();
params.Delete.url="../../simpleWeb/json/work/Instituciones/deleteInstitucion/";
params.Delete.Text="Institucion borrada con éxito";


var crud = new CRUD(params);
$( document ).ready(function() {
	
	crud.readFromParams();
	
});


$(".newRut").rut();
$("#editInstitucionForm").submit(function(event) {
	  event.preventDefault();
	 
		  crud.updateFromParams();
	  
	});
$("#insertInstitucionForm").submit(function(event) {
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
