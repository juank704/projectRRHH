
var params=new Object();

//objeto con variables de los modals
params.Modals=new Object();
params.Modals.insertModalTag="#agregarCajaCompensacionModal";
params.Modals.updateModalTag="#editarCajaCompensacionModal";
//objeto con definiciones y tags de formularios
 //formulario insert
params.Formularios=new Object();
params.Formularios.Create=new Object();
params.Formularios.Create.codigo="CAJA_COMPENSACION";
params.Formularios.Create.tagNombre="#agregarNombreCajaCompensacion";
params.Formularios.Create.tagRutParametro="#agregarRutCajaCompensacion";
params.Formularios.Create.tagCodPrevired="#agregarCodigoCajaCompensacion";
params.Formularios.Create.tagCodSap="#agregarCodSapCajaCompensacion";
params.Formularios.Create.Text="Caja de compensación creada con éxito";

//formulario update
params.Formularios.Update=new Object();
params.Formularios.Update.codigo="CAJA_COMPENSACION";
params.Formularios.Update.id="#editarIdCajaCompensacion";
params.Formularios.Update.tagNombre="#editarNombreCajaCompensacion";
params.Formularios.Update.tagRutParametro="#editarRutCajaCompensacion";
params.Formularios.Update.tagCodPrevired="#editarCodigoCajaCompensacion";
params.Formularios.Update.tagCodSap="#editarCodSapCajaCompensacion";
params.Formularios.Update.Text="Caja de compensación editada con éxito";

//parametros generales de la tabla  
params.tableTag="#tbl_CajaCompensacion";
params.hasCodPrevired=true;
params.hasRutParametro=true;
params.hasCodSap=true;

//parametros referentes a la funcion Create de ajax
params.Create=new Object();
params.Create.url="../../simpleWeb/json/work/CajasCompensacion/createCajaCompensacion/";
params.Create.Text="Caja de compensación creada";

params.Read=new Object();
params.Read.url="../../simpleWeb/json/work/CajasCompensacion/getCajasCompensacion/";
params.Read.urlById="../../simpleWeb/json/work/CajasCompensacion/getCajaCompensacionById/";
params.Read.params=new Object();

params.Update=new Object();
params.Update.url="../../simpleWeb/json/work/CajasCompensacion/updateCajaCompensacion/";
params.Update.Text="Caja de compensación actualizada";
params.Update.params=new Object();

params.Delete=new Object();
params.Delete.url="../../simpleWeb/json/work/CajasCompensacion/deleteCajaCompensacion/";
params.Delete.Text="Caja de compensación borrada con éxito";

var crud = new CRUD(params);
$( document ).ready(function() {
	crud.readFromParams();
});
$(".newRut").rut();

$("#editCajaCompensacionForm").submit(function(event) {
	  event.preventDefault();
	  if($.rut.validar($("#editarRutCajaCompensacion").val()) && $.trim($("#editarRutCajaCompensacion").val()) != ''&&($("#editarRutCajaCompensacion").val().length<13))
	  {
		  crud.updateFromParams();
	  }
	  else{
		  $("#fwe").css("display","block");
	  }
	});
$("#insertCajaCompensacionForm").submit(function(event) {
	  event.preventDefault();
	  event.preventDefault();
	  if($.rut.validar($("#agregarRutCajaCompensacion").val()) && $.trim($("#agregarRutCajaCompensacion").val()) != ''&&($("#agregarRutCajaCompensacion").val().length<13))
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

