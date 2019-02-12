var dataTable = $('#Table_mantenedor').DataTable({
	"sPaginationType": "full_numbers" ,
	"filter": false
	
});
$(document).ready(function() {
	$.fn.dataTable.ext.errMode = 'none';
	$('#loading').hide();
	loadCampo();
	
});
var arraydata = "";
var filtro;
var cod_campo;
var activo = false;
function loadCampo(){
	$.each(SESION.campo, function(k, v) {
    	filtro += '<option value="'+v.campo+'">'+v.descripcion+'</option>';
    });
    $('#filtroCampo').html(filtro);
    cod_campo = $("#filtroCampo").val();
    loadInfo();
}
$("#filtroCampo").change(function(){
	cod_campo = $("#filtroCampo").val();
	loadInfo();
});

function loadTabla(){
	if(activo==true){
		alerta("No ha guardado");
	}
	else{
		$('#anterior').hide();
		$('#siguiente').show();
		
		var d = new Date();
	    var weekday = new Array(7);
	    weekday[0] = "D ";
	    weekday[1] = "L ";
	    weekday[2] = "M ";
	    weekday[3] = "MI ";
	    weekday[4] = "J ";
	    weekday[5] = "V ";
	    weekday[6] = "S ";

	    var a;
	    var b;
	    var x = d.getMonth();
	    var y = d.getYear();

	    
	    Date.prototype.getWeek = function () {
		    var onejan = new Date(this.getFullYear(), 0, 1);
		    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
		};

		$('#semana').html("S "+d.getWeek());
	    
	    if(d.getDay()==0){
	    	b = d.getDate();
	    	
	    	diaLunes = b+1;
	    	diaMartes = b+2;
	    	diaMiercoles = b+3;
	    	diaJueves = b*1+4;
	    	diaViernes = b*1+5;
	    	diaSabado = b*1+6;
	    	diaDomingo = b;
	    	
	    	lunes = weekday[1]+diaLunes;
	    	martes = weekday[1+1]+diaMartes;
	    	miercoles = weekday[1+2]+diaMiercoles;
	   		jueves = weekday[1+3]+diaJueves;
	   		viernes = weekday[1+4]+diaViernes;
	   		sabado = weekday[1+5]+diaSabado;
	   		domingo = weekday[0]+diaDomingo;
	    	
	    	
	   		if(diaLunes<=getDaysInMonth(x,y)){
	   			$('#lunes').html(lunes);
	   		}
	   		else{
	   			$('#lunes').html("L");
	   		}
	   		if(diaMartes<=getDaysInMonth(x,y)){
	   			$('#martes').html(martes);
	   		}
	   		else{
	   			$('#martes').html("M");
	   		}
	   		if(diaMiercoles<=getDaysInMonth(x,y)){
	   			$('#miercoles').html(miercoles);
	   		}
	   		else{
	   			$('#miercoles').html("MI");
	   		}
	   		if(diaJueves<=getDaysInMonth(x,y)){
	   			$('#jueves').html(jueves);
	   		}
	   		else{
	   			$('#jueves').html("J");
	   		}
	   		if(diaViernes<=getDaysInMonth(x,y)){
	   			$('#viernes').html(viernes);
	   		}
	   		else{
	   			$('#viernes').html("V");
	   		}
	   		if(diaSabado<=getDaysInMonth(x,y)){
	   			$('#sabado').html(sabado);
	   		}
	   		else{
	   			$('#sabado').html("S");
	   		}
	   		if(diaDomingo<=getDaysInMonth(x,y)){
	   			$('#domingo').html(domingo);
	   			$('#domingo').css({'background-color' : 'lightblue'})
	   		}
	   		else{
	   			$('#domingo').html("D");
	   		}
	    }
	    if(d.getDay()==1){
	    	
	    	b = d.getDate();
	    	
	    	diaLunes = b;
	    	diaMartes = b+1;
	    	diaMiercoles = b+2;
	    	diaJueves = b*1+3;
	    	diaViernes = b*1+4;
	    	diaSabado = b*1+5;
	    	diaDomingo = b*1+6;
	    	
	    	lunes = weekday[1]+diaLunes;
	    	martes = weekday[1+1]+diaMartes;
	    	miercoles = weekday[1+2]+diaMiercoles;
	   		jueves = weekday[1+3]+diaJueves;
	   		viernes = weekday[1+4]+diaViernes;
	   		sabado = weekday[1+5]+diaSabado;
	   		domingo = weekday[1-1]+diaDomingo;

	   		
	   		if(diaLunes<=getDaysInMonth(x,y)){
	   			$('#lunes').html(lunes);
	   			$('#lunes').css({'background-color' : 'lightblue'})
	   		}
	   		else{
	   			$('#lunes').html("L");
	   		}
	   		if(diaMartes<=getDaysInMonth(x,y)){
	   			$('#martes').html(martes);
	   		}
	   		else{
	   			$('#martes').html("M");
	   		}
	   		if(diaMiercoles<=getDaysInMonth(x,y)){
	   			$('#miercoles').html(miercoles);
	   		}
	   		else{
	   			$('#miercoles').html("MI");
	   		}
	   		if(diaJueves<=getDaysInMonth(x,y)){
	   			$('#jueves').html(jueves);
	   		}
	   		else{
	   			$('#jueves').html("J");
	   		}
	   		if(diaViernes<=getDaysInMonth(x,y)){
	   			$('#viernes').html(viernes);
	   		}
	   		else{
	   			$('#viernes').html("V");
	   		}
	   		if(diaSabado<=getDaysInMonth(x,y)){
	   			$('#sabado').html(sabado);
	   		}
	   		else{
	   			$('#sabado').html("S");
	   		}
	   		if(diaDomingo<=getDaysInMonth(x,y)){
	   			$('#domingo').html(domingo);
	   		}
	   		else{
	   			$('#domingo').html("D");
	   		}
	    }
	    if(d.getDay()==2){
	    	b = d.getDate();
	    	
	    	diaLunes = b*1-1;
	    	diaMartes = b;
	    	diaMiercoles = b+1;
	    	diaJueves = b*1+2;
	    	diaViernes = b*1+3;
	    	diaSabado = b*1+4;
	    	diaDomingo = b*1+5;
	    	
	    	lunes = weekday[2-1]+diaLunes;
	    	martes = weekday[2]+diaMartes;
	    	miercoles = weekday[2+1]+diaMiercoles;
	   		jueves = weekday[2+2]+diaJueves;
	   		viernes = weekday[2+3]+diaViernes;
	   		sabado = weekday[2+4]+diaSabado;
	   		domingo = weekday[2-2]+diaDomingo;
	    	
	    	
	   		if(diaLunes<=getDaysInMonth(x,y)){
	   			$('#lunes').html(lunes);
	   		}
	   		else{
	   			$('#lunes').html("L");
	   		}
	   		if(diaMartes<=getDaysInMonth(x,y)){
	   			$('#martes').html(martes);
	   			$('#martes').css({'background-color' : 'lightblue'})
	   		}
	   		else{
	   			$('#martes').html("M");
	   		}
	   		if(diaMiercoles<=getDaysInMonth(x,y)){
	   			$('#miercoles').html(miercoles);
	   		}
	   		else{
	   			$('#miercoles').html("MI");
	   		}
	   		if(diaJueves<=getDaysInMonth(x,y)){
	   			$('#jueves').html(jueves);
	   		}
	   		else{
	   			$('#jueves').html("J");
	   		}
	   		if(diaViernes<=getDaysInMonth(x,y)){
	   			$('#viernes').html(viernes);
	   		}
	   		else{
	   			$('#viernes').html("V");
	   		}
	   		if(diaSabado<=getDaysInMonth(x,y)){
	   			$('#sabado').html(sabado);
	   		}
	   		else{
	   			$('#sabado').html("S");
	   		}
	   		if(diaDomingo<=getDaysInMonth(x,y)){
	   			$('#domingo').html(domingo);
	   		}
	   		else{
	   			$('#domingo').html("D");
	   		}
	    }
	    if(d.getDay()==3){
	    	b = d.getDate();
	    	
	    	diaLunes = b*1-2;
	    	diaMartes = b*1-1;
	    	diaMiercoles = b;
	    	diaJueves = b*1+1;
	    	diaViernes = b*1+2;
	    	diaSabado = b*1+3;
	    	diaDomingo = b*1+4;
	    	
	    	lunes = weekday[3-2]+diaLunes;
	    	martes = weekday[3-1]+diaMartes;
	    	miercoles = weekday[3]+diaMiercoles;
	   		jueves = weekday[3+1]+diaJueves;
	   		viernes = weekday[3+2]+diaViernes;
	   		sabado = weekday[3+3]+diaSabado;
	   		domingo = weekday[3-3]+diaDomingo;
	    	
	    	
	   		if(diaLunes<=getDaysInMonth(x,y)){
	   			$('#lunes').html(lunes);
	   		}
	   		else{
	   			$('#lunes').html("L");
	   		}
	   		if(diaMartes<=getDaysInMonth(x,y)){
	   			$('#martes').html(martes);
	   		}
	   		else{
	   			$('#martes').html("M");
	   		}
	   		if(diaMiercoles<=getDaysInMonth(x,y)){
	   			$('#miercoles').html(miercoles);
	   			$('#miercoles').css({'background-color' : 'lightblue'})
	   		}
	   		else{
	   			$('#miercoles').html("MI");
	   		}
	   		if(diaJueves<=getDaysInMonth(x,y)){
	   			$('#jueves').html(jueves);
	   		}
	   		else{
	   			$('#jueves').html("J");
	   		}
	   		if(diaViernes<=getDaysInMonth(x,y)){
	   			$('#viernes').html(viernes);
	   		}
	   		else{
	   			$('#viernes').html("V");
	   		}
	   		if(diaSabado<=getDaysInMonth(x,y)){
	   			$('#sabado').html(sabado);
	   		}
	   		else{
	   			$('#sabado').html("S");
	   		}
	   		if(diaDomingo<=getDaysInMonth(x,y)){
	   			$('#domingo').html(domingo);
	   		}
	   		else{
	   			$('#domingo').html("D");
	   		}  	
	    	
	    }
	    if(d.getDay()==4){
	    	b = d.getDate();
	    	
	    	diaLunes = b*1-3;
	    	diaMartes = b*1-2;
	    	diaMiercoles = b*1-1;
	    	diaJueves = b;
	    	diaViernes = b*1+1;
	    	diaSabado = b*1+2;
	    	diaDomingo = b*1+3;
	    	
	    	lunes = weekday[4-3]+diaLunes;
	    	martes = weekday[4-2]+diaMartes;
	    	miercoles = weekday[4-1]+diaMiercoles;
	   		jueves = weekday[4]+diaJueves;
	   		viernes = weekday[4+1]+diaViernes;
	   		sabado = weekday[4+2]+diaSabado;
	   		domingo = weekday[4-4]+diaDomingo;
	    	
	   		if(diaLunes<=getDaysInMonth(x,y)){
	   			$('#lunes').html(lunes);
	   		}
	   		else{
	   			$('#lunes').html("L");
	   		}
	   		if(diaMartes<=getDaysInMonth(x,y)){
	   			$('#martes').html(martes);
	   		}
	   		else{
	   			$('#martes').html("M");
	   		}
	   		if(diaMiercoles<=getDaysInMonth(x,y)){
	   			$('#miercoles').html(miercoles);
	   		}
	   		else{
	   			$('#miercoles').html("MI");
	   		}
	   		if(diaJueves<=getDaysInMonth(x,y)){
	   			$('#jueves').html(jueves);
	   			$('#jueves').css({'background-color' : 'lightblue'})
	   		}
	   		else{
	   			$('#jueves').html("J");
	   		}
	   		if(diaViernes<=getDaysInMonth(x,y)){
	   			$('#viernes').html(viernes);
	   		}
	   		else{
	   			$('#viernes').html("V");
	   		}
	   		if(diaSabado<=getDaysInMonth(x,y)){
	   			$('#sabado').html(sabado);
	   		}
	   		else{
	   			$('#sabado').html("S");
	   		}
	   		if(diaDomingo<=getDaysInMonth(x,y)){
	   			$('#domingo').html(domingo);
	   		}
	   		else{
	   			$('#domingo').html("D");
	   		}
	    }
	    if(d.getDay()==5){
	    	b = d.getDate();
	    	
	    	diaLunes = b*1-4;
	    	diaMartes = b*1-3;
	    	diaMiercoles = b*1-2;
	    	diaJueves = b-1;
	    	diaViernes = b;
	    	diaSabado = b*1+1;
	    	diaDomingo = b*1+2;
	    	
	    	lunes = weekday[5-4]+diaLunes;
	    	martes = weekday[5-3]+diaMartes;
	    	miercoles = weekday[5-2]+diaMiercoles;
	   		jueves = weekday[5-1]+diaJueves;
	   		viernes = weekday[5]+diaViernes;
	   		sabado = weekday[5+1]+diaSabado;
	   		domingo = weekday[5-5]+diaDomingo;
	    	
	   		if(diaLunes<=getDaysInMonth(x,y)){
	   			$('#lunes').html(lunes);
	   		}
	   		else{
	   			$('#lunes').html("L");
	   		}
	   		if(diaMartes<=getDaysInMonth(x,y)){
	   			$('#martes').html(martes);
	   		}
	   		else{
	   			$('#martes').html("M");
	   		}
	   		if(diaMiercoles<=getDaysInMonth(x,y)){
	   			$('#miercoles').html(miercoles);
	   		}
	   		else{
	   			$('#miercoles').html("MI");
	   		}
	   		if(diaJueves<=getDaysInMonth(x,y)){
	   			$('#jueves').html(jueves);
	   		}
	   		else{
	   			$('#jueves').html("J");
	   		}
	   		if(diaViernes<=getDaysInMonth(x,y)){
	   			$('#viernes').html(viernes);
	   			$('#viernes').css({'background-color' : 'lightblue'})
	   		}
	   		else{
	   			$('#viernes').html("V");
	   		}
	   		if(diaSabado<=getDaysInMonth(x,y)){
	   			$('#sabado').html(sabado);
	   		}
	   		else{
	   			$('#sabado').html("S");
	   		}
	   		if(diaDomingo<=getDaysInMonth(x,y)){
	   			$('#domingo').html(domingo);
	   		}
	   		else{
	   			$('#domingo').html("D");
	   		}
	    }
	    if(d.getDay()==6){
	    	b = d.getDate();
	    	
	    	diaLunes = b*1-5;
	    	diaMartes = b*1-4;
	    	diaMiercoles = b*1-3;
	    	diaJueves = b-2;
	    	diaViernes = b-1;
	    	diaSabado = b;
	    	diaDomingo = b*1+1;
	    	
	    	lunes = weekday[6-5]+diaLunes;
	    	martes = weekday[6-4]+diaMartes;
	    	miercoles = weekday[6-3]+diaMiercoles;
	   		jueves = weekday[6-2]+diaJueves;
	   		viernes = weekday[6-1]+diaViernes;
	   		sabado = weekday[6]+diaSabado;
	   		domingo = weekday[6-6]+diaDomingo;
	    	
	   		if(diaLunes<=getDaysInMonth(x,y)){
	   			$('#lunes').html(lunes);
	   		}
	   		else{
	   			$('#lunes').html("L");
	   		}
	   		if(diaMartes<=getDaysInMonth(x,y)){
	   			$('#martes').html(martes);
	   		}
	   		else{
	   			$('#martes').html("M");
	   		}
	   		if(diaMiercoles<=getDaysInMonth(x,y)){
	   			$('#miercoles').html(miercoles);
	   		}
	   		else{
	   			$('#miercoles').html("MI");
	   		}
	   		if(diaJueves<=getDaysInMonth(x,y)){
	   			$('#jueves').html(jueves);
	   		}
	   		else{
	   			$('#jueves').html("J");
	   		}
	   		if(diaViernes<=getDaysInMonth(x,y)){
	   			$('#viernes').html(viernes);
	   		}
	   		else{
	   			$('#viernes').html("V");
	   		}
	   		if(diaSabado<=getDaysInMonth(x,y)){
	   			$('#sabado').html(sabado);
	   			$('#sabado').css({'background-color' : 'lightblue'})
	   		}
	   		else{
	   			$('#sabado').html("S");
	   		}
	   		if(diaDomingo<=getDaysInMonth(x,y)){
	   			$('#domingo').html(domingo);
	   		}
	   		else{
	   			$('#domingo').html("D");
	   		}
	    }
	    
	    dataTable.clear().draw();
	    var tbl = []
		$.each(arraydata,function(k, v) {
			tbl[0] = "<input style='text-align: center;' type='text' class='form-control input-sm' id='lunesactual' value="+v.lunes+" disabled>";
			tbl[1] = "<input style='text-align: center;' type='text' class='form-control input-sm' id='martesactual' value="+v.martes+" disabled>";
			tbl[2] = "<input style='text-align: center;' type='text' class='form-control input-sm' id='miercolesactual' value="+v.miercoles+" disabled>";
			tbl[3] = "<input style='text-align: center;' type='text' class='form-control input-sm' id='juevesactual' value="+v.jueves+" disabled>";
			tbl[4] = "<input style='text-align: center;' type='text' class='form-control input-sm' id='viernesactual' value="+v.viernes+" disabled>";
			tbl[5] = "<input style='text-align: center;' type='text' class='form-control input-sm' id='sabadoactual' value="+v.sabado+" disabled>";
			tbl[6] = "<input style='text-align: center;' type='text' class='form-control input-sm' id='domingoactual' value="+v.domingo+" disabled>";
			tbl[7] = "<button class='btn btn-circle yellow btn-outline btn-sm dropdown-toggle' title='Editar' id='bt_editar' onclick='javascript: BT_Editar1()' type='button' data-toggle='dropdown'>";
			tbl[7] += "<span class='fa fa-pencil-square-o fa-lg'></span></button>";
			tbl[7] += "<a title='Guardar' id='bt_guardar' onclick='javascript: BT_Guardar1()'  style='display: none;' class='btn btn-circle green btn-outline icon-cloud-upload'></a>";
			tbl[7] += "<a title='Cancelar' id='bt_cancelar' onclick='javascript: BT_Cancelar1()' style='display: none;' class='btn btn-circle red btn-outline glyphicon glyphicon-ban-circle'></a>";
//		    tbl = [lunes, martes, miercoles, jueves, viernes, sabado, domingo, editar];
			var rowNode = dataTable
		    .row.add( tbl )
		    .draw()
		    .node();
		})
	}
	
    
}

function loadInfo(){
	$.getJSON("/simpleWeb/json/AGRO/getEvaporacionByCampo/"+cod_campo, function(data) {
		arraydata = data;
		loadTabla(data);
	});
	$("#loading").hide();
}

function getDaysInMonth(m, y) {
	return new Date(y, m, 0).getDate();
}

function siguiente(){
	if(activo == true){
		alerta("No ha guardado");
	}
	else{
		$('#anterior').show();
		$('#siguiente').hide();
		$('#lunes').css({'background-color' : 'white'})
		$('#martes').css({'background-color' : 'white'})
		$('#miercoles').css({'background-color' : 'white'})
		$('#jueves').css({'background-color' : 'white'})
		$('#viernes').css({'background-color' : 'white'})
		$('#sabado').css({'background-color' : 'white'})
		$('#domingo').css({'background-color' : 'white'})
		
		var d = new Date();
	    var weekday = new Array(7);
	    weekday[0] = "D ";
	    weekday[1] = "L ";
	    weekday[2] = "M ";
	    weekday[3] = "MI ";
	    weekday[4] = "J ";
	    weekday[5] = "V ";
	    weekday[6] = "S ";

	    d.setDate(d.getDate()+7);

	    var a;
	    var b;
	    var x = d.getMonth();
	    var y = d.getYear();

	    
	    Date.prototype.getWeek = function () {
		    var onejan = new Date(this.getFullYear(), 0, 1);
		    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
		};

		$('#semana').html("S "+d.getWeek());
	    
	    if(d.getDay()==0){
	    	b = d.getDate();
	    	
	    	diaLunes = b+1;
	    	diaMartes = b+2;
	    	diaMiercoles = b+3;
	    	diaJueves = b*1+4;
	    	diaViernes = b*1+5;
	    	diaSabado = b*1+6;
	    	diaDomingo = b;
	    	
	    	lunes = weekday[1]+diaLunes;
	    	martes = weekday[1+1]+diaMartes;
	    	miercoles = weekday[1+2]+diaMiercoles;
	   		jueves = weekday[1+3]+diaJueves;
	   		viernes = weekday[1+4]+diaViernes;
	   		sabado = weekday[1+5]+diaSabado;
	   		domingo = weekday[0]+diaDomingo;
	    	
	    	
	   		if(diaLunes<=getDaysInMonth(x,y)){
	   			$('#lunes').html(lunes);
	   		}
	   		else{
	   			$('#lunes').html("L");
	   		}
	   		if(diaMartes<=getDaysInMonth(x,y)){
	   			$('#martes').html(martes);
	   		}
	   		else{
	   			$('#martes').html("M");
	   		}
	   		if(diaMiercoles<=getDaysInMonth(x,y)){
	   			$('#miercoles').html(miercoles);
	   		}
	   		else{
	   			$('#miercoles').html("MI");
	   		}
	   		if(diaJueves<=getDaysInMonth(x,y)){
	   			$('#jueves').html(jueves);
	   		}
	   		else{
	   			$('#jueves').html("J");
	   		}
	   		if(diaViernes<=getDaysInMonth(x,y)){
	   			$('#viernes').html(viernes);
	   		}
	   		else{
	   			$('#viernes').html("V");
	   		}
	   		if(diaSabado<=getDaysInMonth(x,y)){
	   			$('#sabado').html(sabado);
	   		}
	   		else{
	   			$('#sabado').html("S");
	   		}
	   		if(diaDomingo<=getDaysInMonth(x,y)){
	   			$('#domingo').html(domingo);
	   			$('#domingo').setColor("blue");
	   		}
	   		else{
	   			$('#domingo').html("D");
	   		}
	    }
	    if(d.getDay()==1){
	    	
	    	b = d.getDate();
	    	
	    	diaLunes = b;
	    	diaMartes = b+1;
	    	diaMiercoles = b+2;
	    	diaJueves = b*1+3;
	    	diaViernes = b*1+4;
	    	diaSabado = b*1+5;
	    	diaDomingo = b*1+6;
	    	
	    	lunes = weekday[1]+diaLunes;
	    	martes = weekday[1+1]+diaMartes;
	    	miercoles = weekday[1+2]+diaMiercoles;
	   		jueves = weekday[1+3]+diaJueves;
	   		viernes = weekday[1+4]+diaViernes;
	   		sabado = weekday[1+5]+diaSabado;
	   		domingo = weekday[1-1]+diaDomingo;

	   		
	   		if(diaLunes<=getDaysInMonth(x,y)){
	   			$('#lunes').html(lunes);
	   		}
	   		else{
	   			$('#lunes').html("L");
	   		}
	   		if(diaMartes<=getDaysInMonth(x,y)){
	   			$('#martes').html(martes);
	   		}
	   		else{
	   			$('#martes').html("M");
	   		}
	   		if(diaMiercoles<=getDaysInMonth(x,y)){
	   			$('#miercoles').html(miercoles);
	   		}
	   		else{
	   			$('#miercoles').html("MI");
	   		}
	   		if(diaJueves<=getDaysInMonth(x,y)){
	   			$('#jueves').html(jueves);
	   		}
	   		else{
	   			$('#jueves').html("J");
	   		}
	   		if(diaViernes<=getDaysInMonth(x,y)){
	   			$('#viernes').html(viernes);
	   		}
	   		else{
	   			$('#viernes').html("V");
	   		}
	   		if(diaSabado<=getDaysInMonth(x,y)){
	   			$('#sabado').html(sabado);
	   		}
	   		else{
	   			$('#sabado').html("S");
	   		}
	   		if(diaDomingo<=getDaysInMonth(x,y)){
	   			$('#domingo').html(domingo);
	   		}
	   		else{
	   			$('#domingo').html("D");
	   		}
	    }
	    if(d.getDay()==2){
	    	b = d.getDate();
	    	
	    	diaLunes = b*1-1;
	    	diaMartes = b;
	    	diaMiercoles = b+1;
	    	diaJueves = b*1+2;
	    	diaViernes = b*1+3;
	    	diaSabado = b*1+4;
	    	diaDomingo = b*1+5;
	    	
	    	lunes = weekday[2-1]+diaLunes;
	    	martes = weekday[2]+diaMartes;
	    	miercoles = weekday[2+1]+diaMiercoles;
	   		jueves = weekday[2+2]+diaJueves;
	   		viernes = weekday[2+3]+diaViernes;
	   		sabado = weekday[2+4]+diaSabado;
	   		domingo = weekday[2-2]+diaDomingo;
	    	
	    	
	   		if(diaLunes<=getDaysInMonth(x,y)){
	   			$('#lunes').html(lunes);
	   		}
	   		else{
	   			$('#lunes').html("L");
	   		}
	   		if(diaMartes<=getDaysInMonth(x,y)){
	   			$('#martes').html(martes);
	   		}
	   		else{
	   			$('#martes').html("M");
	   		}
	   		if(diaMiercoles<=getDaysInMonth(x,y)){
	   			$('#miercoles').html(miercoles);
	   		}
	   		else{
	   			$('#miercoles').html("MI");
	   		}
	   		if(diaJueves<=getDaysInMonth(x,y)){
	   			$('#jueves').html(jueves);
	   		}
	   		else{
	   			$('#jueves').html("J");
	   		}
	   		if(diaViernes<=getDaysInMonth(x,y)){
	   			$('#viernes').html(viernes);
	   		}
	   		else{
	   			$('#viernes').html("V");
	   		}
	   		if(diaSabado<=getDaysInMonth(x,y)){
	   			$('#sabado').html(sabado);
	   		}
	   		else{
	   			$('#sabado').html("S");
	   		}
	   		if(diaDomingo<=getDaysInMonth(x,y)){
	   			$('#domingo').html(domingo);
	   		}
	   		else{
	   			$('#domingo').html("D");
	   		}
	    }
	    if(d.getDay()==3){
	    	b = d.getDate();
	    	
	    	diaLunes = b*1-2;
	    	diaMartes = b*1-1;
	    	diaMiercoles = b;
	    	diaJueves = b*1+1;
	    	diaViernes = b*1+2;
	    	diaSabado = b*1+3;
	    	diaDomingo = b*1+4;
	    	
	    	lunes = weekday[3-2]+diaLunes;
	    	martes = weekday[3-1]+diaMartes;
	    	miercoles = weekday[3]+diaMiercoles;
	   		jueves = weekday[3+1]+diaJueves;
	   		viernes = weekday[3+2]+diaViernes;
	   		sabado = weekday[3+3]+diaSabado;
	   		domingo = weekday[3-3]+diaDomingo;
	    	
	    	
	   		if(diaLunes<=getDaysInMonth(x,y)){
	   			$('#lunes').html(lunes);
	   		}
	   		else{
	   			$('#lunes').html("L");
	   		}
	   		if(diaMartes<=getDaysInMonth(x,y)){
	   			$('#martes').html(martes);
	   		}
	   		else{
	   			$('#martes').html("M");
	   		}
	   		if(diaMiercoles<=getDaysInMonth(x,y)){
	   			$('#miercoles').html(miercoles);
	   		}
	   		else{
	   			$('#miercoles').html("MI");
	   		}
	   		if(diaJueves<=getDaysInMonth(x,y)){
	   			$('#jueves').html(jueves);
	   		}
	   		else{
	   			$('#jueves').html("J");
	   		}
	   		if(diaViernes<=getDaysInMonth(x,y)){
	   			$('#viernes').html(viernes);
	   		}
	   		else{
	   			$('#viernes').html("V");
	   		}
	   		if(diaSabado<=getDaysInMonth(x,y)){
	   			$('#sabado').html(sabado);
	   		}
	   		else{
	   			$('#sabado').html("S");
	   		}
	   		if(diaDomingo<=getDaysInMonth(x,y)){
	   			$('#domingo').html(domingo);
	   		}
	   		else{
	   			$('#domingo').html("D");
	   		}  	
	    	
	    }
	    if(d.getDay()==4){
	    	b = d.getDate();
	    	
	    	diaLunes = b*1-3;
	    	diaMartes = b*1-2;
	    	diaMiercoles = b*1-1;
	    	diaJueves = b;
	    	diaViernes = b*1+1;
	    	diaSabado = b*1+2;
	    	diaDomingo = b*1+3;
	    	
	    	lunes = weekday[4-3]+diaLunes;
	    	martes = weekday[4-2]+diaMartes;
	    	miercoles = weekday[4-1]+diaMiercoles;
	   		jueves = weekday[4]+diaJueves;
	   		viernes = weekday[4+1]+diaViernes;
	   		sabado = weekday[4+2]+diaSabado;
	   		domingo = weekday[4-4]+diaDomingo;
	    	
	   		if(diaLunes<=getDaysInMonth(x,y)){
	   			$('#lunes').html(lunes);
	   		}
	   		else{
	   			$('#lunes').html("L");
	   		}
	   		if(diaMartes<=getDaysInMonth(x,y)){
	   			$('#martes').html(martes);
	   		}
	   		else{
	   			$('#martes').html("M");
	   		}
	   		if(diaMiercoles<=getDaysInMonth(x,y)){
	   			$('#miercoles').html(miercoles);
	   		}
	   		else{
	   			$('#miercoles').html("MI");
	   		}
	   		if(diaJueves<=getDaysInMonth(x,y)){
	   			$('#jueves').html(jueves);
	   		}
	   		else{
	   			$('#jueves').html("J");
	   		}
	   		if(diaViernes<=getDaysInMonth(x,y)){
	   			$('#viernes').html(viernes);
	   		}
	   		else{
	   			$('#viernes').html("V");
	   		}
	   		if(diaSabado<=getDaysInMonth(x,y)){
	   			$('#sabado').html(sabado);
	   		}
	   		else{
	   			$('#sabado').html("S");
	   		}
	   		if(diaDomingo<=getDaysInMonth(x,y)){
	   			$('#domingo').html(domingo);
	   		}
	   		else{
	   			$('#domingo').html("D");
	   		}
	    }
	    if(d.getDay()==5){
	    	b = d.getDate();
	    	
	    	diaLunes = b*1-4;
	    	diaMartes = b*1-3;
	    	diaMiercoles = b*1-2;
	    	diaJueves = b-1;
	    	diaViernes = b;
	    	diaSabado = b*1+1;
	    	diaDomingo = b*1+2;
	    	
	    	lunes = weekday[5-4]+diaLunes;
	    	martes = weekday[5-3]+diaMartes;
	    	miercoles = weekday[5-2]+diaMiercoles;
	   		jueves = weekday[5-1]+diaJueves;
	   		viernes = weekday[5]+diaViernes;
	   		sabado = weekday[5+1]+diaSabado;
	   		domingo = weekday[5-5]+diaDomingo;
	    	
	   		if(diaLunes<=getDaysInMonth(x,y)){
	   			$('#lunes').html(lunes);
	   		}
	   		else{
	   			$('#lunes').html("L");
	   		}
	   		if(diaMartes<=getDaysInMonth(x,y)){
	   			$('#martes').html(martes);
	   		}
	   		else{
	   			$('#martes').html("M");
	   		}
	   		if(diaMiercoles<=getDaysInMonth(x,y)){
	   			$('#miercoles').html(miercoles);
	   		}
	   		else{
	   			$('#miercoles').html("MI");
	   		}
	   		if(diaJueves<=getDaysInMonth(x,y)){
	   			$('#jueves').html(jueves);
	   		}
	   		else{
	   			$('#jueves').html("J");
	   		}
	   		if(diaViernes<=getDaysInMonth(x,y)){
	   			$('#viernes').html(viernes);
	   		}
	   		else{
	   			$('#viernes').html("V");
	   		}
	   		if(diaSabado<=getDaysInMonth(x,y)){
	   			$('#sabado').html(sabado);
	   		}
	   		else{
	   			$('#sabado').html("S");
	   		}
	   		if(diaDomingo<=getDaysInMonth(x,y)){
	   			$('#domingo').html(domingo);
	   		}
	   		else{
	   			$('#domingo').html("D");
	   		}
	    }
	    if(d.getDay()==6){
	    	b = d.getDate();
	    	
	    	diaLunes = b*1-5;
	    	diaMartes = b*1-4;
	    	diaMiercoles = b*1-3;
	    	diaJueves = b-2;
	    	diaViernes = b-1;
	    	diaSabado = b;
	    	diaDomingo = b*1+1;
	    	
	    	lunes = weekday[6-5]+diaLunes;
	    	martes = weekday[6-4]+diaMartes;
	    	miercoles = weekday[6-3]+diaMiercoles;
	   		jueves = weekday[6-2]+diaJueves;
	   		viernes = weekday[6-1]+diaViernes;
	   		sabado = weekday[6]+diaSabado;
	   		domingo = weekday[6-6]+diaDomingo;
	    	
	   		if(diaLunes<=getDaysInMonth(x,y)){
	   			$('#lunes').html(lunes);
	   		}
	   		else{
	   			$('#lunes').html("L");
	   		}
	   		if(diaMartes<=getDaysInMonth(x,y)){
	   			$('#martes').html(martes);
	   		}
	   		else{
	   			$('#martes').html("M");
	   		}
	   		if(diaMiercoles<=getDaysInMonth(x,y)){
	   			$('#miercoles').html(miercoles);
	   		}
	   		else{
	   			$('#miercoles').html("MI");
	   		}
	   		if(diaJueves<=getDaysInMonth(x,y)){
	   			$('#jueves').html(jueves);
	   		}
	   		else{
	   			$('#jueves').html("J");
	   		}
	   		if(diaViernes<=getDaysInMonth(x,y)){
	   			$('#viernes').html(viernes);
	   		}
	   		else{
	   			$('#viernes').html("V");
	   		}
	   		if(diaSabado<=getDaysInMonth(x,y)){
	   			$('#sabado').html(sabado);
	   		}
	   		else{
	   			$('#sabado').html("S");
	   		}
	   		if(diaDomingo<=getDaysInMonth(x,y)){
	   			$('#domingo').html(domingo);
	   		}
	   		else{
	   			$('#domingo').html("D");
	   		}
	    }
	    


	    dataTable.clear().draw();
	    var tbl = []
		$.each(arraydata,function(k, v) {
			tbl[0] = "<input style='text-align: center;' type='text' class='form-control input-sm' id='lunesnext' value="+v.lunesnext+" disabled>";
			tbl[1] = "<input style='text-align: center;' type='text' class='form-control input-sm' id='martesnext' value="+v.martesnext+" disabled>";
			tbl[2] = "<input style='text-align: center;' type='text' class='form-control input-sm' id='miercolesnext' value="+v.miercolesnext+" disabled>";
			tbl[3] = "<input style='text-align: center;' type='text' class='form-control input-sm' id='juevesnext' value="+v.juevesnext+" disabled>";
			tbl[4] = "<input style='text-align: center;' type='text' class='form-control input-sm' id='viernesnext' value="+v.viernesnext+" disabled>";
			tbl[5] = "<input style='text-align: center;' type='text' class='form-control input-sm' id='sabadonext' value="+v.sabadonext+" disabled>";
			tbl[6] = "<input style='text-align: center;' type='text' class='form-control input-sm' id='domingonext' value="+v.domingonext+" disabled>";
			tbl[7] = "<button class='btn btn-circle yellow btn-outline btn-sm dropdown-toggle' title='Editar' id='bt_editar' onclick='javascript: BT_Editar2()' type='button' data-toggle='dropdown'>";
			tbl[7] += "<span class='fa fa-pencil-square-o fa-lg'></span></button>";
			tbl[7] += "<a title='Guardar' id='bt_guardar' onclick='javascript: BT_Guardar2()'  style='display: none;' class='btn btn-circle green btn-outline icon-cloud-upload'></a>";
			tbl[7] += "<a title='Cancelar' id='bt_cancelar' onclick='javascript: BT_Cancelar2()' style='display: none;' class='btn btn-circle red btn-outline glyphicon glyphicon-ban-circle'></a>";
//			tbl = [lunes, martes, miercoles, jueves, viernes, sabado, domingo, editar];
			var rowNode = dataTable
		    .row.add( tbl )
		    .draw()
		    .node();
		})
	}
	
}
function BT_Cancelar1(){
	activo = false;
	
	$('#bt_cancelar').hide();
	$('#bt_guardar').hide();
	$('#bt_editar').show();
	
	$("#lunesactual").prop("disabled", true);
	$("#martesactual").prop("disabled", true);
	$("#miercolesactual").prop("disabled", true);
	$("#juevesactual").prop("disabled", true);
	$("#viernesactual").prop("disabled", true);
	$("#sabadoactual").prop("disabled", true);
	$("#domingoactual").prop("disabled", true);
}
function BT_Cancelar2(){
	activo = false;
	
	$('#bt_cancelar').hide();
	$('#bt_guardar').hide();
	$('#bt_editar').show();
	
	$("#lunesnext").prop("disabled", true);
	$("#martesnext").prop("disabled", true);
	$("#miercolesnext").prop("disabled", true);
	$("#juevesnext").prop("disabled", true);
	$("#viernesnext").prop("disabled", true);
	$("#sabadonext").prop("disabled", true);
	$("#domingonext").prop("disabled", true);
}
function BT_Editar1(){
	activo = true;
	
	$('#bt_editar').hide();
	$('#bt_guardar').show();
	$('#bt_cancelar').show();
	
	$("#lunesactual").prop("disabled", false);
	$("#martesactual").prop("disabled", false);
	$("#miercolesactual").prop("disabled", false);
	$("#juevesactual").prop("disabled", false);
	$("#viernesactual").prop("disabled", false);
	$("#sabadoactual").prop("disabled", false);
	$("#domingoactual").prop("disabled", false);
}
function BT_Editar2(){
	activo = true;
	
	$('#bt_editar').hide();
	$('#bt_guardar').show();
	$('#bt_cancelar').show();
	
	$("#lunesnext").prop("disabled", false);
	$("#martesnext").prop("disabled", false);
	$("#miercolesnext").prop("disabled", false);
	$("#juevesnext").prop("disabled", false);
	$("#viernesnext").prop("disabled", false);
	$("#sabadonext").prop("disabled", false);
	$("#domingonext").prop("disabled", false);
}
function BT_Guardar1(){
	activo = false;
	
	$('#bt_editar').show();
	$('#bt_guardar').hide();
	$('#bt_cancelar').hide();
	
	$("#lunesactual").prop("disabled", true);
	$("#martesactual").prop("disabled", true);
	$("#miercolesactual").prop("disabled", true);
	$("#juevesactual").prop("disabled", true);
	$("#viernesactual").prop("disabled", true);
	$("#sabadoactual").prop("disabled", true);
	$("#domingoactual").prop("disabled", true);
	
	
	var descripc = {
			campo : cod_campo,
			lunes : $("#lunesactual").val(),
			martes : $("#martesactual").val(),
			miercoles : $("#miercolesactual").val(),
			jueves : $("#juevesactual").val(),
			viernes : $("#viernesactual").val(),
			sabado : $("#sabadoactual").val(),
			domingo : $("#domingoactual").val()
		}	

		$.ajax({
			url : "/simpleWeb/json/AGRO/UPEVAPORACIONACTUAL/",
			type : "PUT",
			data : JSON.stringify(descripc),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
				alerta("Datos Guardados Satisfactoriamente");	
				return;
			}
		})	
	$("#loading").hide();
}
function BT_Guardar2(){
	activo = false;
	
	$('#bt_editar').show();
	$('#bt_guardar').hide();
	$('#bt_cancelar').hide();
	
	$("#lunesnext").prop("disabled", true);
	$("#martesnext").prop("disabled", true);
	$("#miercolesnext").prop("disabled", true);
	$("#juevesnext").prop("disabled", true);
	$("#viernesnext").prop("disabled", true);
	$("#sabadonext").prop("disabled", true);
	$("#domingonext").prop("disabled", true);
	
	
	var descripc = {
			campo : cod_campo,
			lunesnext : $("#lunesnext").val(),
			martesnext : $("#martesnext").val(),
			miercolesnext : $("#miercolesnext").val(),
			juevesnext : $("#juevesnext").val(),
			viernesnext : $("#viernesnext").val(),
			sabadonext : $("#sabadonext").val(),
			domingonext : $("#domingonext").val()
		}	
	

		$.ajax({
			url : "/simpleWeb/json/AGRO/UPEVAPORACIONNEXT/",
			type : "PUT",
			data : JSON.stringify(descripc),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
				alerta("Datos Guardados Satisfactoriamente");	
				return;
			}
		})	
	$("#loading").hide();
}