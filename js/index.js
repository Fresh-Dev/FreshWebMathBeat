// Minimal Audio Driver
//
var audioContext = new (window.AudioContext || window.webkitAudioContext)();

var sampleRate = audioContext.sampleRate;

var seconds = 0.0;

var scriptProcessor = audioContext.createScriptProcessor( 2048, 1, 1 );

var bufferSize = scriptProcessor.bufferSize;

scriptProcessor.onaudioprocess = 
	function ( event )
	{
	  var data = event.outputBuffer.getChannelData( 0 );
	  for( var i = 0 ; i < bufferSize ; ++i )
		data[i] = f( seconds += 1.0 / sampleRate );
	  
	  render(data);
	};

var e = document.getElementById( "dsp" );
var m = document.getElementById( "message" );
var b = document.getElementById( "toggle-button" );
var w = document.getElementById( "waveform" );
var f = function (t) { return 0.0 };

var isPlaying = false;

function togglePlayback()
{
  if( isPlaying ){scriptProcessor.disconnect( audioContext.destination );isPlaying = false;b.innerHTML = '<i class="fa fa-play"></i>';}
  else{seconds = 0.0;scriptProcessor.connect( audioContext.destination );isPlaying = true;b.innerHTML = '<i class="fa fa-pause"></i>';}
}

function render(values)
{
  var width=w.width;
  var height=w.height;
  var heightHalf=height/2;
  var ratio=bufferSize/width;
  var ctx=w.getContext("2d");
  ctx.clearRect(0,0,width,height);
  ctx.lineWidth=0.0;
  ctx.strokeStyle='#16d6ff';
  ctx.beginPath();
  ctx.moveTo(0,heightHalf+values[0]*heightHalf);
  for(var x=0;x<width;++x)
    ctx.lineTo(x,heightHalf+Math.min(1,Math.max(-1,values[Math.floor(x*ratio)]))*heightHalf);
  ctx.stroke();
}
function compile(){try{f=new Function('t',"with(Math){"+e.value+"}");m.innerHTML="";}catch(e){m.innerHTML=e.message;}}

e.value="var q=1-(t*2.15)%1;\t//Playspeed\nvar s=sin;\t\t//Sinus-Wave\nvar p=pow;\n\nreturn s(24*p(q,24))*.9+3*s(p((q*4)%1,5)*3)*min(.1,max(-.1,(6+s(t*.5)*3)*s(40*(1+q)*s(690+q*3))));";
e.focus();compile();

 function updateSlider_a(slideAmount) 
 {
	var display_a = document.getElementById("sliderVal_a");
	var display_b = document.getElementById("sliderVal_b");
	var display_c = document.getElementById("sliderVal_c");	
	var playtime = slideAmount;
	var pitch = display_b.innerHTML;
	var beat_a = display_c.innerHTML;
	
    display_a.innerHTML=slideAmount;
	compile();	
	e.value="var q=1-(t*"+slideAmount+")%1;\t//Playspeed\nvar s=sin;\t\t//Sinus-Wave\nvar p=pow;\n\nreturn s("+pitch+"*p(q,24))*.9+3*s(p((q*4)%1,5)*3)*min(.1,max(-.1,(6+s(t*.5)*3)*s(40*(1+q)*s("+beat_a+"+q*3))));";
}; 

function updateSlider_b(slideAmount) 
 {
	var display_a = document.getElementById("sliderVal_a");
	var display_b = slideAmount;
	var display_c = document.getElementById("sliderVal_c");	
	var playtime = display_a.innerHTML;
	var pitch = slideAmount;
	var beat_a = display_c.innerHTML;
	
    display_b.innerHTML=slideAmount;
	compile();	
	e.value="var q=1-(t*"+playtime+")%1;\t//Playspeed\nvar s=sin;\t\t//Sinus-Wave\nvar p=pow;\n\nreturn s("+pitch+"*p(q,24))*.9+3*s(p((q*4)%1,5)*3)*min(.1,max(-.1,(6+s(t*.5)*3)*s(40*(1+q)*s("+beat_a+"+q*3))));";
}; 


function updateSlider_c(slideAmount) 
 {
	var display_a = document.getElementById("sliderVal_a");
	var display_b = document.getElementById("sliderVal_b");
	var display_c = slideAmount;	
	var playtime = display_a.innerHTML;
	var pitch = display_b.innerHTML;
	var beat_a = slideAmount;
	
    display_c.innerHTML=slideAmount;
	compile();	
	e.value="var q=1-(t*"+playtime+")%1;\t//Playspeed\nvar s=sin;\t\t//Sinus-Wave\nvar p=pow;\n\nreturn s("+pitch+"*p(q,24))*.9+3*s(p((q*4)%1,5)*3)*min(.1,max(-.1,(6+s(t*.5)*3)*s(40*(1+q)*s("+beat_a+"+q*3))));";
}; 