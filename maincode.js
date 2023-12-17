var mc = document.getElementById("c");
var ctx = mc.getContext("2d");
var ctxW = mc.width;
var ctxH = mc.height;
ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, ctxW, ctxH);
ctx.willReadFrequently = true;
var idw = ctx.getImageData(0,0,ctxW,ctxH);
var isRunning = false;
var tempamp = parseAMP();





var bitness = parseInt(tempamp[0],10);
var formula = atob(tempamp[1]);
var interval = parseInt(tempamp[2]);
var sharpening = parseInt(tempamp[3],10);
var res = parseInt(tempamp[4],10);


if(bitness){document.getElementById("cfi").selectedIndex = bitness;}
else       {document.getElementById("cfi").selectedIndex = 1;}

if(formula){document.getElementById("ili").value = formula;}
else       {document.getElementById("ili").value = '((x+80*Math.sin(t/800000))>>2&(y+80*Math.cos(t/800000))>>2)*t>>19';}

if(interval){document.getElementsByClassName("del")[0].selectedIndex = interval;}
else        {document.getElementsByClassName("del")[0].selectedIndex = 0;}

if(sharpening){document.getElementsByClassName("shpi")[0].selectedIndex = sharpening;}

if(res){document.getElementsByClassName("scale")[0].selectedIndex = res;}
//else   {document.getElementsByClassName("scale")[0].selectedIndex = 3;}


var t = 0;

function parseAMP(){
	return decodeURI(window.location.hash.replace("#","")).split(",");
}
function saveAMP(){
	var AMPinterval = document.getElementsByClassName("del")[0].selectedIndex;
	var AMPsharp = document.getElementsByClassName("shpi")[0].selectedIndex;
	var e = document.getElementById("cfi");
	
	var AMPvalue = e.selectedIndex;
	var AMPvar = btoa(whatsIn());
	var AMPres = document.getElementsByClassName("scale")[0].selectedIndex;
	
	window.location.hash = encodeURI([AMPvalue, AMPvar,AMPinterval,AMPsharp,AMPres]);
}



function whatsIn(){
	var aaaaa = document.getElementById("ili");
	
	return aaaaa.value;
}

function setPixel(imageData, x, y, r, g, b, a) {
    var index = 4 * (x + y * imageData.width);
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}

/*
ctxW = mc.width = 100;
ctxH = mc.height = 100;
*/


function idr(){ // infinite drawing loop. not i dont remember
	compd = whatsIn();

	if(document.getElementsByClassName("scale")[0].selectedIndex==0){
		ctxW = mc.width = 128;
		ctxH = mc.height = 128;
	}
	if(document.getElementsByClassName("scale")[0].selectedIndex==1){
		ctxW = mc.width = 256;
		ctxH = mc.height = 128;
	}
	if(document.getElementsByClassName("scale")[0].selectedIndex==2){
		ctxW = mc.width = 128;
		ctxH = mc.height = 256;
	}
	
	if(document.getElementsByClassName("scale")[0].selectedIndex==3){
		ctxW = mc.width = 256;
		ctxH = mc.height = 192;
	}
	if(document.getElementsByClassName("scale")[0].selectedIndex==4){
		ctxW = mc.width = 192;
		ctxH = mc.height = 256;
	}
	
	if(document.getElementsByClassName("scale")[0].selectedIndex==5){
		ctxW = mc.width = 256;
		ctxH = mc.height = 256;
	}

	//alert(document.getElementsByClassName("shp")[0].style.imageRendering);
	document.getElementsByClassName("compileComments")[0].innerHTML = "Running...";
	var interval = document.getElementsByClassName("del")[0].selectedIndex*20;
	saveAMP();
	//alert(compd);
	if(!isRunning){
		isRunning = true;
		if(document.getElementsByClassName("del")[0].selectedIndex!=6){twwe = setInterval(draw,interval,compd);}
		else{twwe = setInterval(draw,null,compd);}
	} else {
		alert("The player is running");
	}
}

function sidr(){ // XAXA CИDP
	document.getElementsByClassName("compileComments")[0].innerHTML = "Compile and run";
	isRunning = false;
	t = 0;
	clearInterval(twwe);
}



function draw(compd){

	if(document.getElementsByClassName("shpi")[0].selectedIndex==1){ // sharp
		document.getElementsByClassName("shp")[0].style.imageRendering = "pixelated";
		
	}
	if(document.getElementsByClassName("shpi")[0].selectedIndex==0){ // smooth
		document.getElementsByClassName("shp")[0].style.imageRendering = "";
	}
	console.log(document.getElementsByClassName("shpi")[0].selectedIndex,document.getElementsByClassName("shp")[0].style.imageRendering);
	var e = document.getElementById("cfi");
	var value = e.selectedIndex;
	for(var x=0;x<ctxW;x++){
		for(var y=0;y<ctxH;y++){
			try {
				out = eval(compd);
				if(value==0){ // 3-bit
					out = eval(compd)&0b00000111;
					rout = ((out>>2)&1)*256;
					gout = ((out>>1)&1)*256;
					bout = ((out>>0)&1)*256;
				} else if (value==1){ // 6-bit
					out = eval(compd)&0b00111111;
					rout = ((out>>4)&0b011)*85;
					gout = ((out>>2)&0b011)*85;
					bout = ((out>>0)&0b011)*85;
				}
				 else if (value==2){ // 12-bit
					out = eval(compd)&0b0000111111111111;
					rout = ((out>>8)&0b01111)*17;
					gout = ((out>>4)&0b01111)*17;
					bout = ((out>>0)&0b01111)*17;
				}
				 else if (value==3){ // 24-bit
					out = eval(compd)&0b00000000111111111111111111111111;
					rout = ((out>>16)&255);
					gout = ((out>>8)&255);
					bout = ((out>>0)&255);
				}
				
				
				
				setPixel(idw,x,y,rout,gout,bout,    256);
			
			} catch (error) {
				document.getElementsByClassName('errors')[0].innerHTML=`error t=${t} x=${x} y=${y}:<br>${error}`;
			}
			
			
			
			if(isRunning)t++;
		}
	}
	
	ctx.putImageData(idw, 0,0,0,0,768,512);
}

