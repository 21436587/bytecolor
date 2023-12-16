var mc = document.getElementById("c");
var ctx = mc.getContext("2d");
var ctxW = mc.width;
var ctxH = mc.height;
ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, ctxW, ctxH);
ctx.willReadFrequently = true;
var idw = ctx.getImageData(0,0,ctxW,ctxH);
var isRunning = false;

var t = 0;

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

function idr(){ // infinite drawing loop. not i dont remember
	compd = whatsIn();
	document.getElementsByClassName("compileComments")[0].innerHTML = "Running...";
	alert(compd);
	if(!isRunning){
		isRunning = true;
		twwe = setInterval(draw,1,compd);
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
	var e = document.getElementById("cfi");
	var value = e.selectedIndex;
	for(var x=0;x<256;x++){
		for(var y=0;y<256;y++){
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
			if(isRunning)t++;
		}
	}
	
	ctx.putImageData(idw, 0, 0);
	
}

