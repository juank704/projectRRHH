
var params=new Object();

//objeto con variables de los modals
params.Modals=new Object();
params.Modals.insertModalTag="#agregarDepositoModal";
params.Modals.updateModalTag="#editarDepositoModal";
//objeto con definiciones y tags de formularios
 //formulario insert
params.Formularios=new Object();
params.Formularios.Create=new Object();
params.Formularios.Create.codigo="DEPOSITO_CONVENIDO";
params.Formularios.Create.tagNombre="#agregarNombreDeposito";

//formulario update
params.Formularios.Update=new Object();
params.Formularios.Update.codigo="DEPOSITO_CONVENIDO";
params.Formularios.Update.id="#editarIdDeposito";
params.Formularios.Update.tagNombre="#editarNombreDeposito";
params.Formularios.Update.Text="Deposito editado con éxito";

//parametros generales de la tabla  
params.tableTag="#tbl_Deposito";


//parametros referentes a la funcion Create de ajax
params.Create=new Object();
params.Create.url="../../simpleWeb/json/work/DepositosConvenidos/createDeposito/";
params.Create.Text="Deposito Creado";

params.Read=new Object();
params.Read.url="../../simpleWeb/json/work/DepositosConvenidos/getDepositos/";
params.Read.urlById="../../simpleWeb/json/work/DepositosConvenidos/getDepositoById/";
params.Read.params=new Object();

params.Update=new Object();
params.Update.url="../../simpleWeb/json/work/DepositosConvenidos/updateDeposito/";
params.Update.Text="Deposito Actualizado";
params.Update.params=new Object();


params.Delete=new Object();
params.Delete.url="../../simpleWeb/json/work/DepositosConvenidos/deleteDeposito/";
params.Delete.Text="Deposito borrado con éxito";


var crud = new CRUD(params);
$( document ).ready(function() {
	
	crud.readFromParams();
	
});
$("#editDepositoForm").submit(function(event) {
	  event.preventDefault();
	  crud.updateFromParams();
	});
$("#insertDepositoForm").submit(function(event) {
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
