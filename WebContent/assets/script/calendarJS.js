$(document).ready(function(){
	loadCalendar();
});
var mescal;
var annocal;
var diassemana;
function loadClientes(){
	
}
function loadCalendar(){
	meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
	lasemana=["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"]
	diassemana=["dom", "lun","mar","mié","jue","vie","sáb"];
	
	hoy=new Date();
	diasemhoy=hoy.getDay();
	diahoy=hoy.getDate();
	meshoy=hoy.getMonth();
	annohoy=hoy.getFullYear();
	
	mescal = meshoy;
	annocal = annohoy;
	primeromes = new Date(annocal,mescal,"1");
	
//	primeromes = primeromes.getMonth();
	diasDelMes(mescal, annocal);
	cabecera();
    var dt = new Date(meshoy+' '+diahoy+', '+annohoy);
    console.log(meshoy +" "+diahoy+" "+annohoy );
    var text = "Dia de la semana : " + diassemana[dt.getUTCDay()];
}
function cabecera(){
	$("#titulo").html(meses[mescal]+" de "+annocal);
	$("#anterior").html(meses[mescal-1]);
	$("#posterior").html(meses[mescal+1]);
	mesant=mescal-1;
    mespos=mescal+1;
    console.log(mesant);
    if (mesant<0) {mesant=11;}
    if (mespos>11) {mespos=0;}
}
function crearTblCalendar(days){
	$("#headCalendar").html("");
	console.log(days);
	var thead = "<th>Cliente</th>";
	for(var i=1; i <= days; i++){
		thead += "<th>"+i+"<br></th>"
	}
	$("#headCalendar").append(thead);
}
function diasDelMes(mes, anno) {
	var days = new Date(anno || new Date().getFullYear(), mes+1, 0).getDate();
	crearTblCalendar(days);
}
function mesantes(){
	var nuevomes=new Date();
	primeromes--;
	nuevomes.setTime(primeromes);
	mescal=nuevomes.getMonth();
	annocal=nuevomes.getFullYear();
	diasDelMes(mescal, annocal);
	primeromes = new Date(annocal,mescal,"1");
	cabecera();
}
function mesdespues() {
	nuevomes=new Date();
	tiempounix=primeromes.getTime();
	tiempounix=tiempounix+(45*24*60*60*1000);
	nuevomes.setTime(tiempounix);
	mescal=nuevomes.getMonth();
	annocal=nuevomes.getFullYear()
	diasDelMes(mescal, annocal);
	primeromes = new Date(annocal,mescal,"1");
	cabecera();
}