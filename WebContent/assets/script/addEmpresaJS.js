$(document).ready(function(){
	onLoad();
});
function onLoad(){
	var get = getMAP();
	if(!get){
		var llenar = ['76.061.089-1',
			  '',
			  '',
			  'Ingenierias Marcelo Valdes',
			  'XIII Region Matropolitana',
			  'Santiago',
			  'Providencia',
			  'Padre Mariano 82 Oficina 701',
			  '228188491',
			  'm.valdes@expled.cl',
			  'Servicios Informaticos',
			  '726000',
			  '9.805.785-4',
			  'Marcelo Andres Valdes Leipert',
			  'INP',
			  '0.6',
			  '',
			  '',
			  'ACHS',
			  '0.95',
			  '0',
			  '',
			  '',
			  '169-18746-02',
			  'Banco de Chile',
			  'Formato Actual',
			  '2009-01',
			  '',
		]
		var adbuss = document.getElementsByName("adbuss");
		for(var i = 0; i < adbuss.length; i++){
			$(adbuss[i]).val(llenar[i]);
		}
	}
}
$("#cancelBuss").click(function(){
	window.location.href = ("empresaJSP");
});
$("#addBuss").click(function(){
	var adbuss = document.getElementsByName("adbuss");
	for(var i = 0; i < adbuss.length; i++){
		if(!$(adbuss[i]).val()){
			$(adbuss[i]).focus();
			return false;
		}
	}
});
function getMAP(){
	var location = document.location.href;
	if(location.indexOf('?')>0){
		var getString = location.split('?')[1];
		var GET = getString.split('&');
		var get = {};
		
		for(var i = 0, l = GET.length; i < l; i++){
			var tmp = GET[i].split('=');
            get[tmp[0]] = unescape(decodeURI(tmp[1]));
		}
		return get;
	}
}