//Filippo Bignami

var objectsToDraw = [];

function setObjsToDraw() {
	objectsToDraw = [
		
		{
			name: "floor",
			bufferInfo: bufferInfo_floor,
			uniforms: {
				u_colorMult: [0.5, 0.5, 1, 1],
				u_texture: textures[0],
				u_world: m4.identity(),
			},
		},
		{
			name: "fontana",
			bufferInfo: bufferInfo_obj_fontana,
			uniforms: {
				
				u_texture: textures[1],
				u_world: m4.scale(m4.translation(-300, 0, 50), 15, 15, 15),
			},
		},

{
			name: "paretedx",
			bufferInfo: bufferInfo_paretedx,
			uniforms: {
				u_texture: textures[2],
				u_world: m4.identity(),
			},
		},
		{
			name: "paretesx",
			bufferInfo: bufferInfo_paretesx,
			uniforms: {
				u_texture: textures[2],
				u_world: m4.identity(),
			},
		},
		{
			name: "back",
			bufferInfo: bufferInfo_pareteback,
			uniforms: {
				u_texture: textures[3],
				u_world: m4.identity(),
			},
		},

		{
			name: "front",
			bufferInfo: bufferInfo_paretefront,
			uniforms: {
				u_texture: textures[3],
				u_world: m4.identity(),
			},
		},

		{
			name: "Key1",
			bufferInfo: bufferInfo_obj_Key,
			uniforms: {
				
				u_texture: textures[4],
				u_world: m4.scale(m4.yRotate(m4.translation(600, 2, 250),degToRad(-90)), 3, 3,3),
						
			},
		},

		{
			name: "Key2",
			bufferInfo: bufferInfo_obj_Key,
			uniforms: {
				
				u_texture: textures[4],
				u_world: m4.scale(m4.yRotate(m4.translation(330, 2, 286),degToRad(-90)), 3, 3,3),
						
			},
		},

		{
			name: "Key3",
			bufferInfo: bufferInfo_obj_Key,
			uniforms: {
				
				u_texture: textures[4],
				u_world: m4.scale(m4.translation(30, 2, 60), 3, 3,3)
						
			},
		},
		{
			//not affected by the light
			name: "Area1",
			bufferInfo: bufferInfo_keyarea,
			uniforms: {
				u_texture: textures[18],
				u_world: m4.identity(),
			},
		},
		{
			//not affected by the light
			name: "Area2",
			
			bufferInfo: bufferInfo_keyarea,
			uniforms: {
				u_texture: textures[18],
				u_world: m4.identity(),
			},
		},
		{
			//not affected by the light
			name: "Area3",
			
			bufferInfo: bufferInfo_keyarea,
			uniforms: {
				u_texture: textures[18],
				u_world: m4.identity(),
			},
		},
		{
			
			name: "Area4",
			
			bufferInfo: bufferInfo_keyarea,
			uniforms: {
				u_texture: textures[18],
				u_world: m4.identity(),
			},
		},

		{
			
			name: "Princess",
			
			bufferInfo: bufferInfo_Princess,
			uniforms: {
				u_texture: textures[6],
				u_world: m4.identity(),
			},
		},

		{
			name: "Albero1",
			bufferInfo: bufferInfo_obj_tree,
			uniforms: {
				
				u_texture: textures[7],
				u_world: m4.scale(m4.translation(-260, 0, 50), 15, 15, 15),
			},
		},

		{
			name: "Albero2",
			bufferInfo: bufferInfo_obj_tree,
			uniforms: {
				
				u_texture: textures[7],
				u_world: m4.scale(m4.translation(460, 0, 150), 12, 12, 12),
			},
		},


		{
			name: "Albero3",
			bufferInfo: bufferInfo_obj_tree,
			uniforms: {
				
				u_texture: textures[7],
				u_world: m4.scale(m4.translation(400, 0, -100), 17, 17, 17),
			},
		},
		{
			name: "Welcome",
			bufferInfo: bufferInfo_Welcome,
			uniforms: {
				u_texture: textures[8],
				u_world: m4.identity(),
			},
		},
		{
			name: "Torre",
			bufferInfo: bufferInfo_obj_Torre,
			uniforms: {
				
				u_texture: textures[9],
				u_world: m4.scale(m4.translation(-240, -70, 80), 7, 7, 7),
						
			},
		},

		{
			name: "Edificio1",
			bufferInfo: bufferInfo_obj_grattacielo,
			uniforms: {
				
				u_texture: textures[10],
				u_world: m4.scale(m4.translation(-150, -30, -200), 4, 4, 4),
						
			},
		},
		{
			name: "Edificio2",
			bufferInfo: bufferInfo_obj_grattacielo,
			uniforms: {
				
				u_texture: textures[11],
				u_world: m4.scale(m4.translation(100, -30, -200), 4, 4, 4),
						
			},
		},

		{
			name: "capanna",
			bufferInfo: bufferInfo_obj_capanna,
			uniforms: {
				
				u_texture: textures[4],
				u_world: m4.scale(m4.translation(600, 0, 100), 20, 20, 20),
						
			},
		},
		{
			name: "David",
			bufferInfo: bufferInfo_obj_David,
			uniforms: {
				
				u_texture: textures[12],
				u_world: m4.scale(m4.xRotate(m4.yRotate(m4.translation(300, 0, 370),degToRad(180)),degToRad(-90)), 0.2, 0.2, 0.2),
						
			},
		},

		//automobile
		{
			name: "extra",
			bufferInfo: bufferInfo_obj_chassis,
			uniforms: {
				u_texture: textures[13],
				u_world: m4.scale(m4.translation(1, 5, 0), 5, 5, 5),
			},
		},
		{
			name: "fari",
			bufferInfo: bufferInfo_objfari,
			uniforms: {
				u_texture: textures[14],
				u_world: m4.scale(m4.translation(1, 5, 0), 5, 5, 5),
			},
		},
		{
			name: "carrozzeria",
			bufferInfo: bufferInfo_obj_chassisnowind,
			uniforms: {
				u_diffuse: [1, 1, 1, 1],
				u_texture: textures[5],
				//u_world: m4.identity(),
				u_world: m4.scale(m4.translation(1, 5, 0), 5, 5, 5),
			},
		},
		{
			name: "windows",
			bufferInfo: bufferInfo_obj_ch,
			uniforms: {
				u_diffuse: [1, 1, 1, 1],
				u_texture: textures[15],
				//u_world: m4.identity(),
				u_world: m4.scale(m4.translation(1, 5, 0), 5, 5, 5),
			},
		},
		{
			name: "wheel_adx",
			bufferInfo: bufferInfo_obj_wheel,
			uniforms: {
				u_texture: textures[16],
				u_world: m4.scale(m4.translation(6, 2, -2), .6, .6, .6),
			},
		},
		{
			name: "wheel_asx",
			bufferInfo: bufferInfo_obj_wheel,
			uniforms: {
				u_texture: textures[16],
				u_world: m4.scale(m4.translation(-6, 2, -2), .6, .6, .6),
			},
		},
		{
			name: "wheel_pdx",
			bufferInfo: bufferInfo_obj_wheel,
			uniforms: {
				u_texture: textures[16],
				u_world: m4.identity(), //m4.scale(m4.translation(6, 2, 18), .6, .6, .6),
			},
		},
		{
			name: "wheel_psx",
			bufferInfo: bufferInfo_obj_wheel,
			uniforms: {
				u_texture: textures[16],
				u_world: m4.identity(),
			},
		},
	];
}


// ****************************************************************************************************************
// GEOMETRIES
// ****************************************************************************************************************

function setGeometries(gl) {

// ---------------------------------------------------------------------
	//FRUSTUM
	cubeLinesBufferInfo = webglUtils.createBufferInfoFromArrays(gl, {
		position: [	-1, -1, -1,	1, -1, -1,	-1,  1, -1,	1,  1, -1,	-1, -1,  1,	 1, -1,  1,	-1,  1,  1,	 1,  1,  1,	],
		indices: [	0, 1,	1, 3,	3, 2,	2, 0,
					4, 5,	 5, 7,	 7, 6,	 6, 4,
					0, 4,	 1, 5,	  3, 7,	  2, 6,	], 
	});

	// ---------------------------------------------------------------------
	// plane
	{
		const S = 10; 		
		const H = 0.02; 

		const textureCoords = [ 0,0, 1,0, 0,1, 1,1,];

		const arrays_floor = {
		   position: 	{ numComponents: 3, data: [-S-10,H,-S, S+5,H,-S, -S-10,H,S,  S+5,H,S, ], },
		   texcoord: 	{ numComponents: 2, data: textureCoords, },
		   indices: 	{ numComponents: 3, data: [0,2,1, 	2,3,1,], },
		   normal:		{numComponents: 3, data: [0,1,0,	0,1,0,	0,1,0,	0,1,0,], },
		};

		bufferInfo_floor = webglUtils.createBufferInfoFromArrays(gl, arrays_floor);
	}


	{
		const S = 10; 		
		const H = 5.0; 

		const textureCoords = [0,0, 1,0, 0,1, 1,1,];

		const arrays_paretedx = {
		   position: 	{ numComponents: 3, data: [-S-10,H+4.40,-S, S+5,H+4.40,-S, -S-10,H-5,-S, S+5,H-5,-S,  ], },
		   texcoord: 	{ numComponents: 2, data: textureCoords, },
		   indices: 	{ numComponents: 3, data: [0,2,1, 	2,3,1,], },
		   normal:		{numComponents: 3, data: [0,1,0,	0,1,0,	0,1,0,	0,1,0,], },
		};

		bufferInfo_paretedx = webglUtils.createBufferInfoFromArrays(gl, arrays_paretedx);
	}
	{
		const S = 10; 		
		const H = 5.0; 

		const textureCoords = [  0,1, 1,1, 0,0, 1,0,];

		const arrays_paretesx = {
		   position: 	{ numComponents: 3, data: [S+5,H-5,S, -S-10,H-5,S, S+5,H+4.40,S, -S-10,H+4.40,S,  ], },
		   texcoord: 	{ numComponents: 2, data: textureCoords, },
		   indices: 	{ numComponents: 3, data: [0,2,1, 	2,3,1,], },
		   normal:		{numComponents: 3, data: [0,1,0,	0,1,0,	0,1,0,	0,1,0,], },
		};

		bufferInfo_paretesx = webglUtils.createBufferInfoFromArrays(gl, arrays_paretesx);
	}
	{
		const S = 10; 		
		const H = 5.0; 

		const textureCoords = [  0,1, 1,1, 0,0, 1,0,];
		
		const arrays_back = {
		   position: 	{ numComponents: 3, data: [-S-10,H-5,S, -S-10,H-5 ,-S,-S-10,H+4.40,S, -S-10,H+4.40,-S, ], },
		   texcoord: 	{ numComponents: 2, data: textureCoords, },
		   indices: 	{ numComponents: 3, data: [0,2,1, 	2,3,1,], },
		   normal:		{numComponents: 3, data: [0,1,0,	0,1,0,	0,1,0,	0,1,0,], },
		};

		bufferInfo_pareteback = webglUtils.createBufferInfoFromArrays(gl, arrays_back);
	}
	{
		const S = 10; 		
		const H = 5.0; 

		const textureCoords = [  0,1, 1,1, 0,0, 1,0,];
		
		const arrays_front = {
		   position: 	{ numComponents: 3, data:  [S+5,H-5,-S, S+5,H-5,S, S+5,H+4.40,-S, S+5,H+4.40,S, ], },
		   texcoord: 	{ numComponents: 2, data: textureCoords, },
		   indices: 	{ numComponents: 3, data: [0,2,1, 	2,3,1,], },
		   normal:		{numComponents: 3, data: [0,1,0,	0,1,0,	0,1,0,	0,1,0,], },
		};

		bufferInfo_paretefront = webglUtils.createBufferInfoFromArrays(gl, arrays_front);
	}


	{
		const S = 5; 		
		const H = 3; 

		const textureCoords = [  0,1, 1,1, 0,0, 1,0,];
		
		const arrays_welcome = {
		   position: 	{ numComponents: 3, data: [S+5,H-5,-S, S+5,H-5,S, S+5,H+4.40,-S, S+5,H+4.40,S,], },
		   texcoord: 	{ numComponents: 2, data: textureCoords, },
		   indices: 	{ numComponents: 3, data: [0,2,1, 	2,3,1,], },
		   normal:		{numComponents: 3, data: [0,1,0,	0,1,0,	0,1,0,	0,1,0,], },
		};

		bufferInfo_Welcome = webglUtils.createBufferInfoFromArrays(gl, arrays_welcome);
	}

	{
		const S = 5; 		
		const H = 1; 

		const textureCoords = [  0,1, 1,1, 0,0, 1,0,,];
		
		const arrays_princess = {
		   position: 	{ numComponents: 3, data: [S+5,H-5,-S, S+5,H-5,S, S+5,H+4.40,-S, S+5,H+4.40,S,], },
		   texcoord: 	{ numComponents: 2, data: textureCoords, },
		   //color: 	{ numComponents: 3, data: [0.7,0.7,0.7,  0.7,0.7,0.7,  0.7,0.7,0.7,  0.7,0.7,0.7], },
		   indices: 	{ numComponents: 3, data: [0,2,1, 	2,3,1,], },
		   normal:		{numComponents: 3, data: [0,1,0,	0,1,0,	0,1,0,	0,1,0,], },
		};

		bufferInfo_Princess= webglUtils.createBufferInfoFromArrays(gl, arrays_princess);
	}



	{
		const S = 10; 		
		const H = 0; 

		const textureCoords = [ 0,0, 1,0, 0,1, 1,1,];

		const arrays_keyarea = {
		   position: 	{ numComponents: 3, data: [-S,H,-S, S,H,-S, -S,H,S,  S,H,S, ], },
		   texcoord: 	{ numComponents: 2, data: textureCoords, },
		   //color: 	{ numComponents: 3, data: [0.7,0.7,0.7,  0.7,0.7,0.7,  0.7,0.7,0.7,  0.7,0.7,0.7], },
		   indices: 	{ numComponents: 3, data: [0,2,1, 	2,3,1,], },
		   normal:		{numComponents: 3, data: [0,1,0,	0,1,0,	0,1,0,	0,1,0,], },
		};

		bufferInfo_keyarea = webglUtils.createBufferInfoFromArrays(gl, arrays_keyarea);
	}

	// ****************************************************************************************************************
	// LOAD FILE.OBJ 
	// ****************************************************************************************************************

	// ---------------------------------------------------------------------


	loadDoc('resources/data/fontana.obj');

	const arrays_obj = {
	   position:	{ numComponents: 3, data:webglVertexData[0], },
	   texcoord:	{ numComponents: 2, data:webglVertexData[1], },
	   normal:		{ numComponents: 3, data:webglVertexData[2], },
	};

	bufferInfo_obj_fontana = webglUtils.createBufferInfoFromArrays(gl, arrays_obj);

	loadDoc('resources/data/chiave.obj');

	const arrays_obj_key = {
	   position:	{ numComponents: 3, data:webglVertexData[0], },
	   texcoord:	{ numComponents: 2, data:webglVertexData[1], },
	   normal:		{ numComponents: 3, data:webglVertexData[2], },
	};

	bufferInfo_obj_Key = webglUtils.createBufferInfoFromArrays(gl, arrays_obj_key); 


	loadDoc('resources/data/albero1.obj');

	const arrays_obj_tree = {
	   position:	{ numComponents: 3, data:webglVertexData[0], },
	   texcoord:	{ numComponents: 2, data:webglVertexData[1], },
	   normal:		{ numComponents: 3, data:webglVertexData[2], },
	};

	bufferInfo_obj_tree = webglUtils.createBufferInfoFromArrays(gl, arrays_obj_tree); 


	loadDoc('resources/data/torre.obj');

	const arrays_obj_Torre = {
	   position:	{ numComponents: 3, data:webglVertexData[0], },
	   texcoord:	{ numComponents: 2, data:webglVertexData[1], },
	   normal:		{ numComponents: 3, data:webglVertexData[2], },
	};

	bufferInfo_obj_Torre = webglUtils.createBufferInfoFromArrays(gl, arrays_obj_Torre);


	loadDoc('resources/data/edificio1.obj');

	const arrays_obj_grattacielo = {
	   position:	{ numComponents: 3, data:webglVertexData[0], },
	   texcoord:	{ numComponents: 2, data:webglVertexData[1], },
	   normal:		{ numComponents: 3, data:webglVertexData[2], },
	};

	bufferInfo_obj_grattacielo = webglUtils.createBufferInfoFromArrays(gl, arrays_obj_grattacielo);

	loadDoc('resources/data/capanna.obj');

	const arrays_obj_capanna = {
	   position:	{ numComponents: 3, data:webglVertexData[0], },
	   texcoord:	{ numComponents: 2, data:webglVertexData[1], },
	   normal:		{ numComponents: 3, data:webglVertexData[2], },
	};

	bufferInfo_obj_capanna = webglUtils.createBufferInfoFromArrays(gl, arrays_obj_capanna);

	loadDoc('resources/data/David.obj');

	const arrays_obj_david = {
	   position:	{ numComponents: 3, data:webglVertexData[0], },
	   texcoord:	{ numComponents: 2, data:webglVertexData[1], },
	   normal:		{ numComponents: 3, data:webglVertexData[2], },
	};

	bufferInfo_obj_David = webglUtils.createBufferInfoFromArrays(gl, arrays_obj_david);

	// ---------------------------------------------------------------------
	// wheels

	loadDoc('resources/data/ruota.obj');

	const arrays_obj_wheel = {
	   position:	{ numComponents: 3, data:webglVertexData[0], },
	   texcoord:	{ numComponents: 2, data:webglVertexData[1], },
	   normal:		{ numComponents: 3, data:webglVertexData[2], },
	};
	bufferInfo_obj_wheel = webglUtils.createBufferInfoFromArrays(gl, arrays_obj_wheel);
 
	// ---------------------------------------------------------------------
	// car
	loadDoc('resources/data/windows.obj');

	const arrays_obj_ch = {
	   position:	{ numComponents: 3, data:webglVertexData[0], },
	   texcoord:	{ numComponents: 2, data:webglVertexData[1], },
	   normal:		{ numComponents: 3, data:webglVertexData[2], },
	};

	bufferInfo_obj_ch = webglUtils.createBufferInfoFromArrays(gl, arrays_obj_ch);
	
	loadDoc('resources/data/car_without_wind.obj');

	const arrays_obj_chassisnowind = {
	   position:	{ numComponents: 3, data:webglVertexData[0], },
	   texcoord:	{ numComponents: 2, data:webglVertexData[1], },
	   normal:		{ numComponents: 3, data:webglVertexData[2], },
	};

	bufferInfo_obj_chassisnowind = webglUtils.createBufferInfoFromArrays(gl, arrays_obj_chassisnowind);
	
	loadDoc('resources/data/extra.obj');

	const arrays_obj_chassis = {
	   position:	{ numComponents: 3, data:webglVertexData[0], },
	   texcoord:	{ numComponents: 2, data:webglVertexData[1], },
	   normal:		{ numComponents: 3, data:webglVertexData[2], },
	};

	bufferInfo_obj_chassis = webglUtils.createBufferInfoFromArrays(gl, arrays_obj_chassis);
	loadDoc('resources/data/fari.obj');

	const arrays_obj_fari = {
	   position:	{ numComponents: 3, data:webglVertexData[0], },
	   texcoord:	{ numComponents: 2, data:webglVertexData[1], },
	   normal:		{ numComponents: 3, data:webglVertexData[2], },
	};

	bufferInfo_objfari = webglUtils.createBufferInfoFromArrays(gl, arrays_obj_fari);
	

	

}
