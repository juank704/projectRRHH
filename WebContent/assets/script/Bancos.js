
var params=new Object();

//objeto con variables de los modals
params.Modals=new Object();
params.Modals.insertModalTag="#agregarBancoModal";
params.Modals.updateModalTag="#editarBancoModal";
//objeto con definiciones y tags de formularios
 //formulario insert
params.Formularios=new Object();
params.Formularios.Create=new Object();
params.Formularios.Create.codigo="BANCO";
params.Formularios.Create.tagNombre="#agregarNombreBanco";
params.Formularios.Create.tagRutParametro="#agregarRutBanco";
params.Formularios.Create.Text="Banco creado con éxito";

//formulario update
params.Formularios.Update=new Object();
params.Formularios.Update.codigo="BANCO";
params.Formularios.Update.id="#editarIdBanco";
params.Formularios.Update.tagNombre="#editarNombreBanco";
params.Formularios.Update.tagRutParametro="#editarRutBanco";
params.Formularios.Update.Text="Banco editado con éxito";

//parametros generales de la tabla  
params.tableTag="#tbl_Banco";
params.hasCodPrevired=false;
params.hasRutParametro=true;
params.hasCodSap=false;

//parametros referentes a la funcion Create de ajax
params.Create=new Object();
params.Create.url="../../simpleWeb/json/work/Bancos/createBanco/";
params.Create.Text="Banco Creado";

params.Read=new Object();
params.Read.url="../../simpleWeb/json/work/Bancos/getBancos/";
params.Read.urlById="../../simpleWeb/json/work/Bancos/getBancoById/";
params.Read.params=new Object();

params.Update=new Object();
params.Update.url="../../simpleWeb/json/work/Bancos/updateBanco/";
params.Update.Text="Banco Actualizado";
params.Update.params=new Object();


params.Delete=new Object();
params.Delete.url="../../simpleWeb/json/work/Bancos/deleteBanco/";
params.Delete.Text="Banco borrado con éxito";


var crud = new CRUD(params);
$( document ).ready(function() {
	
	crud.readFromParams();
	
});


$(".newRut").rut();
$("#editBancoForm").submit(function(event) {
	  event.preventDefault();
	  if($.rut.validar($("#editarRutBanco").val()) && $.trim($("#editarRutBanco").val()) != ''&&($("#editarRutBanco").val().length<13))
	  {
		  crud.updateFromParams();
	  }
	  else{
		  $("#fwe").css("display","block");
	  }
	});
$("#insertBancoForm").submit(function(event) {
	  event.preventDefault();
	  if($.rut.validar($("#agregarRutBanco").val()) && $.trim($("#agregarRutBanco").val()) != ''&&($("#agregarRutBanco").val().length<13))
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
