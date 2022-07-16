//Filippo Bignami

//*****************************************************************************************************************
var  controls = new function(){
    this.lightIntensity = 2.5;
   this.shadowIntensity = 0.5
   this.x_light = 52;
   this.y_light = 440;
   this.z_light  = 10;
  
  }
  var canvas = document.getElementById('my_Canvas');
  var gl = canvas.getContext('webgl');
  var salpha = 0.0025;
if (!gl) {
      console.log("NON SUPPORTA WEBGL Context");
  }
  
  //ext serve per la depth texture, se no diventa tutto nero
  var ext = gl.getExtension('WEBGL_depth_texture');
  if (!ext) {
    console.log("NON SUPPORTA WEBGL_depth_texture");  // eslint-disable-line
    }	
  let command1 = "--COMANDI:-- -W : --Avanti--; -S : --Indietro--; -A : --Sinistra--; -D : --Destra--; -----SPACE:----- Raccogli/Apri  ";
  document.getElementById('Command').innerHTML = command1;
  let string = "TROVA LE 3 CHIAVI SPARSE NELLA CITTA' E LIBERA LA PRINCIPESSA RINCHIUSA NELLA TORRE!";
  document.getElementById('text').innerHTML = string;
  setGeometries(gl);

  var programInfo_scene = webglUtils.createProgramInfo(gl, ["scene-vs", "scene-fs"]);
  var programInfo_color = webglUtils.createProgramInfo(gl, ["color-vs", "color-fs"]);
  var programInfo_world = webglUtils.createProgramInfo(gl, ["world-vs", "world-fs"]);
  
  setTextures();
  createTextureForLights();
  setObjsToDraw();

  //-----------------------------------------------------------------
  // global parameters
  
  var matrix_car, matrix_wheels;
  var changes=false; 
  var nstep=0; 
  var timeNow=0;

  const PHYS_SAMPLING_STEP=20; 
  
  var Theta_resetta = 1.57;
  var bias = -0.00005;
  var dr = 5.0 * Math.PI/180.0;
  var lightIntensity = 2.5;
  var shadowIntensity= 0.5;
  var PHI=0.3482;	//degToRad(86)	
  var THETA=1.57; 
  var PHI_2=0.6973;	//degToRad(86)	
  var THETA_2=3.7517; 	//degToRad(23)
  var	D=  54; //40,					
  var	target= [0, 0, 0]; //at dove guardiamo
  var	up= [0, 1, 0]; //se cambia up, ruota l'intero SDR, quindi cambiano gli assi
  var	aspect=  gl.canvas.clientWidth / gl.canvas.clientHeight;
  var	zmin= 1;	// faccia più piccola del frustum znear
  var	zmax=  100;	// faccia più grande del frustum zfar
  var	fov=  55; 	// aumentando questo, aumento l'ampiezza della visuale (tipo grandangolo)
  var	x_light=  52;
  var	y_light=  440;
  var	z_light= 10; 
  var	x_targetlight= 0;	
  var	y_targetlight=  0;	
  var	z_targetlight=  0;				
  var	width_projLight=  30;
  var	height_projLight=  30;
  var	fovLight= 500;
  
  window.onwheel = e => {
      if(e.deltaY >= 0){
      // Scrolling Down with mouse
      D *=1.1; 
      
      render();
      
      } else {
      // Scrolling Up with mouse
      D *=0.9; 
      
      render();
      }
  }
  
  var drag;
  var gc_btnw=10, gc_btnh=4;
  var btnw=gc_btnw.toString()+"%", btnh=gc_btnh.toString()+"%";
  btn("ButtonIncreaseD", "90%", "25%", "8%", btnh, function(){D  *= 1.1;}, "INCREASE_D", "lightgreen", "");
  btn("ButtonDecreaseD", "90%", "30%", "8%", btnh, function(){D *= 0.9;}, "DECREASE_D", "lightgreen", "");
  btn("ButtonViewRetro", "89%", "55%", "10%", "6%", function(){Swap_camera = !Swap_camera;}, "SWAP CAMERA", "lightred", "");
  btn("ButtonIncreaseTheta", "89%", "35%", "10%", btnh,  function(){THETA += dr;}, "INCREASE_THETA", "red", "");
  btn("ButtonDecreaseTheta", "89%", "40%", "10%", btnh,  function(){THETA -= dr;}, "DECREASE_THETA", "red", "");
  btn("ButtonIncreasePhi", "89%", "45%", "10%", btnh,  function(){PHI += dr;}, "INCREASE_PHI", "lightblue", "");
  btn("ButtonDecreasePhi", "89%", "50%", "10%", btnh,  function(){PHI-= dr;}, "DECREASE_PHI", "lightblue", "");
  btn("ResetCamera", "89%", "63%", "10%", "6%", function(){reset_camera = true;THETA=Theta_resetta;}, "RESET  CAMERA", "lightred", "");

  if( !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ) {
    var gui = new dat.GUI();
  
    gui.add(controls,'lightIntensity',0,10);
    gui.add(controls,'shadowIntensity',0,4);
    gui.add(controls,'x_light',0,300);
    gui.add(controls,'y_light',300,600);
    gui.add(controls,'z_light',0,100);

    if (screen.width === 1920 && screen.height ===1080)
        document.getElementById("my_Canvas").style.width = "1400px";

    document.getElementById("ButtonA").style.visibility = "hidden";
    document.getElementById("ButtonW").style.visibility = "hidden";
    document.getElementById("ButtonS").style.visibility = "hidden";
    document.getElementById("ButtonD").style.visibility = "hidden";
    document.getElementById("ButtonCatch").style.visibility = "hidden";
          
  }
  else { //i'm in the mobile version
      document.getElementById("my_Canvas").style.height = "320px";
      document.getElementById("my_Canvas").style.width = "680px";
      document.getElementById("my_Canvas").style.left = "50px";
      document.getElementById("my_Canvas").style.top = "50px";
      document.getElementById("container_text").style.top = "15px";
      document.getElementById("container_text").style.left = "450px";
      document.getElementById("container_text").style.width = "500px";

      document.getElementById("ButtonIncreaseD").style.top = "400px";
      document.getElementById("ButtonIncreaseD").style.left = "100px";
    

      document.getElementById("ButtonDecreaseD").style.top = "440px";
      document.getElementById("ButtonDecreaseD").style.left = "100px";
   

      document.getElementById("ButtonIncreaseTheta").style.top = "400px";
      document.getElementById("ButtonIncreaseTheta").style.left = "250px";
      

      document.getElementById("ButtonDecreaseTheta").style.top = "440px";
      document.getElementById("ButtonDecreaseTheta").style.left = "250px";
    

      document.getElementById("ButtonIncreasePhi").style.top = "400px";
      document.getElementById("ButtonIncreasePhi").style.left = "400px";
      

      document.getElementById("ButtonDecreasePhi").style.top = "440px";
      document.getElementById("ButtonDecreasePhi").style.left = "400px";
     

      document.getElementById("ButtonViewRetro").style.top = "400px";
      document.getElementById("ButtonViewRetro").style.left = "550px";
      

      document.getElementById("ResetCamera").style.top = "440px";
      document.getElementById("ResetCamera").style.left = "550px";
     
      bias = -0.005; //su mobile lo metto diverso, se no viene tutto nero
  }


  // -----------------------------------------------------------------
  // actions for mouse, keyboard and mobile
  

  document.getElementById("ButtonW").ontouchstart = function(){key[0] = true; };
  document.getElementById("ButtonW").ontouchend = function(){key[0] = false; };

  document.getElementById("ButtonS").ontouchstart = function(){key[2]=true; };
  document.getElementById("ButtonS").ontouchend = function(){key[2]=false; };

  document.getElementById("ButtonA").ontouchstart = function(){key[1] = true; };
  document.getElementById("ButtonA").ontouchend = function(){key[1] = false; };

  document.getElementById("ButtonD").ontouchstart = function(){key[3] = true; };
  document.getElementById("ButtonD").ontouchend = function(){key[3] = false; };

  document.getElementById("ButtonCatch").onclick = function(){key[4]=true;};
  canvas.onmousedown = mouseDown;
  canvas.onmouseup = mouseUp;
  canvas.mouseout = mouseUp;
  canvas.onmousemove = mouseMove;
  window.addEventListener('keydown', doKeyDown, true);
  window.addEventListener('keyup', doKeyUp, true);
              
  CarInit(); 
  update(); // start animation
  window.requestAnimationFrame(update);

