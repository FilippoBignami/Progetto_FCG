//Filippo Bignami

/*
drawBufferInfo does automatically the distintion between drawElements and drawArrays
Moreover, if anything is specified about the type, it automatically draws with gl.TRIANGLES
Otherwise, it is necessary to specify the type, as we did for example in drawCubeWire (car.js) where it uses gl.LINES

The code for the drawElements that was used previously, was the following:
	if (objToDraw.type === "triangles")
		gl.drawElements(gl.TRIANGLES, bufferInfo.numElements, gl.UNSIGNED_SHORT, 0);
	if (objToDraw.type === "lines")
		gl.drawElements(gl.LINES, bufferInfo.numElements, gl.UNSIGNED_SHORT, 0);
	
The code for the drawArrays was similar...
	gl.drawArrays(gl.TRIANGLES, 0, bufferInfo.numElements);

Now they're no longer necessary 
*/

//ORDINE CORRETTO DI APPLICAZIONE DELLE TRASFORMAZIONI DELLE MATRICI: traslate, rotate, scale

function update(time){
	if(nstep*PHYS_SAMPLING_STEP <= timeNow){ //skip the frame if the call is too early
		catchKey();
		CarDoStep(); 
		nstep++; 
		changes=true;
		window.requestAnimationFrame(update);
		return; // return as there is nothing to do
	}
	timeNow=time;
	if (changes) {
		render();
		changeswww=false;
	}
	window.requestAnimationFrame(update); // get next frame
}

// variabili globali per scelta camera
var Swap_camera = false; // per passare tra la camera posteriore e anteriore
var Eye_camera = false; // drag del mouse
var reset_camera = false;
var D_star = 4 *0.9;
var lightWorldMatrix, lightProjectionMatrix, projectionMatrix, cameraMatrix;

function render(){

	//gl.enable(gl.CULL_FACE); 	//se è disabilitato, riesco a vedere dentro al cubo, se no no
    gl.enable(gl.DEPTH_TEST);

    // first draw from the POV of the light
    lightWorldMatrix = m4.lookAt(
        [x_light, y_light, z_light],          			// position
        [x_targetlight, y_targetlight,z_targetlight], 	// target
        up,                                              					// up
    );

    lightProjectionMatrix = m4.perspective(
            degToRad(fovLight),
            width_projLight / height_projLight,
            1,  	// near: top of the frustum
            600);   // far: bottom of the frustum


	// -----------------------------------------------------------
    // draw to the depth texture
	
    gl.bindFramebuffer(gl.FRAMEBUFFER, depthFramebuffer);
    gl.viewport(0, 0, depthTextureSize, depthTextureSize);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

   	drawLight( lightProjectionMatrix, lightWorldMatrix, m4.identity(), lightWorldMatrix, programInfo_color);

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 1); //setta tutto a nero se 0,0,0,1
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    let textureMatrix = m4.identity();
    textureMatrix = m4.translate(textureMatrix, 0.5, 0.5, 0.5);
    textureMatrix = m4.scale(textureMatrix, 0.5, 0.5, 0.5);
    textureMatrix = m4.multiply(textureMatrix, lightProjectionMatrix);
    textureMatrix = m4.multiply(textureMatrix, m4.inverse(lightWorldMatrix));

	// -------------------------------------------------------------------
	//matrici di vista
	
	projectionMatrix = m4.perspective(degToRad(fov), aspect, 1, 2000);

	var targetAuto = [px, py, pz];
	if (reset_camera){
		PHI=0.3482;
		D = 54;
		reset_camera = false;
	}
	camera = [px + (D*Math.sin(THETA)*Math.cos(PHI)), py+( D*Math.sin(PHI)), pz+(D*Math.cos(THETA))]; 
	if(Swap_camera ){
		var targetAuto = [px, py, pz];
		camera = [px + (-D*Math.sin(THETA)*Math.cos(PHI)), py+( D*Math.sin(PHI)), pz+(-D*Math.cos(THETA))];		
	}
	//permette di muoversi nella scena (esempio con la drag del mouse)
	if(Eye_camera){

		camera = [px+(D*D_star)*Math.sin(THETA_2)*Math.cos(PHI_2),
			py+( (D*D_star)*Math.sin(PHI_2)), pz+((D*D_star)*Math.cos(THETA_2))];
	}
	

    cameraMatrix = m4.lookAt(camera, targetAuto, up);
	

    drawScene( projectionMatrix, cameraMatrix, textureMatrix, lightWorldMatrix, programInfo_scene);
	//drawFrustum();
}

function drawLight(	lightProjectionMatrix, lightWorldMatrix, textureMatrix, lightWorldMatrix, programInfo) {


	lightIntensity = controls.lightIntensity
	shadowIntensity = controls.shadowIntensity
	x_light = controls.x_light
	y_light = controls.y_light
	z_light = controls.z_light
	shadowIntensity = controls.shadowIntensity

	const viewMatrix = m4.inverse(lightWorldMatrix);
	gl.useProgram(programInfo.program);

	webglUtils.setUniforms(programInfo, {
		u_view: viewMatrix,
		u_projection: lightProjectionMatrix,
		u_bias: bias,
		u_textureMatrix: textureMatrix,
		u_projectedTexture: depthTexture,
		u_reverseLightDirection: lightWorldMatrix.slice(8, 11),
		u_lightIntensity: lightIntensity,
		u_shadowIntensity: shadowIntensity,
	});

	drawCar(programInfo);
	drawFloor(programInfo);
	drawParetedx(programInfo);
	drawParetesx(programInfo);
	drawBack(programInfo);
	drawFront(programInfo);
	drawFountain(programInfo);
	drawCapanna(programInfo);
	drawGrattacieli(programInfo);
	drawTrees(programInfo);
	drawWelcome(programInfo);
	drawTorre(programInfo);
	drawDavid(programInfo) ;
	drawKeys(programInfo);
	drawArea1(programInfo);
	drawArea2(programInfo);
	drawArea3(programInfo);
	drawArea4(programInfo);
	drawPrincess(programInfo);

}	
	

function drawScene(	projectionMatrix, cameraMatrix, textureMatrix, lightWorldMatrix, programInfo) {

	lightIntensity = controls.lightIntensity
	shadowIntensity = controls.shadowIntensity
	x_light = controls.x_light
	y_light = controls.y_light
	z_light = controls.z_light
	shadowIntensity = controls.shadowIntensity
    const viewMatrix = m4.inverse(cameraMatrix);

	gl.useProgram(programInfo.program);

	webglUtils.setUniforms(programInfo, {
		u_view: viewMatrix,
		u_projection: projectionMatrix,
		u_bias: bias,
		u_textureMatrix: textureMatrix,
		u_projectedTexture: depthTexture,
		u_reverseLightDirection: lightWorldMatrix.slice(8, 11),
		u_lightIntensity: lightIntensity,
		u_shadowIntensity: shadowIntensity,
	});
	
	
	
	drawCar(programInfo);
	drawFloor(programInfo);
	drawParetedx(programInfo);
	drawParetesx(programInfo);
	drawBack(programInfo);
	drawFront(programInfo);
	drawFountain(programInfo);
	drawCapanna(programInfo);
	drawGrattacieli(programInfo);
	drawTrees(programInfo);
	drawWelcome(programInfo);
	drawTorre(programInfo);
	drawDavid(programInfo) ;
	drawKeys(programInfo);
	drawArea1(programInfo);
	drawArea2(programInfo);
	drawArea3(programInfo);
	drawArea4(programInfo);
	drawPrincess(programInfo);
}

// ------------------------------------------------------------------------------------------------




function drawFountain(programInfo) {
	
	
var objToDraw = getObjToDraw(objectsToDraw, "fontana");

webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
webglUtils.setUniforms(programInfo, objToDraw.uniforms);
webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);
}

function drawKeys(programInfo) {
	
if(!CatchedKey1){
	var objToDraw = getObjToDraw(objectsToDraw, "Key1");

	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);
}
	
if(!CatchedKey2){
	var objToDraw = getObjToDraw(objectsToDraw, "Key2");

	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);
}
if(!CatchedKey3){
	var objToDraw = getObjToDraw(objectsToDraw, "Key3");

	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);
}
}

function drawArea1(programInfo) {
	

if(!CatchedKey1){
	let objToDraw = getObjToDraw(objectsToDraw, "Area1");

	let matrix = m4.identity();

	matrix = m4.translate(matrix, pxArea1, 1.5, pzArea1); //QUI
	matrix = m4.scale(matrix, 2,2, 2);
	objToDraw.uniforms.u_world = matrix;

	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);

	webglUtils.setUniforms(programInfo, objToDraw.uniforms);


	if (insideArea1) //cambia colore in verde
		webglUtils.setUniforms(programInfo, {
			u_texture: textures[17],
		});

	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);	
}
}

function drawArea2(programInfo) {
	
if (!CatchedKey2) {
	let objToDraw = getObjToDraw(objectsToDraw, "Area2");
	let matrix = m4.identity();

	matrix = m4.translate(matrix, pxArea2, 1.5, pzArea2); //QUI
	matrix = m4.scale(matrix, 2,2, 2);
	objToDraw.uniforms.u_world = matrix;

	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);

	webglUtils.setUniforms(programInfo, objToDraw.uniforms);


	if (insideArea2) //cambia colore in verde
		webglUtils.setUniforms(programInfo, {
			u_texture: textures[17],
		});

	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);	


}
}

function drawArea3(programInfo) {
	
if (!CatchedKey3) {
	let objToDraw = getObjToDraw(objectsToDraw, "Area3");
	let matrix = m4.identity();
	
	matrix = m4.translate(matrix, pxArea3, 1.5, pzArea3); //QUI
	matrix = m4.scale(matrix, 2,2, 2);
	objToDraw.uniforms.u_world = matrix;
	
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);

		
	if (insideArea3) //cambia colore in verde
		webglUtils.setUniforms(programInfo, {
			u_texture: textures[17],
		});
	
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);	
	

}
}

function drawArea4(programInfo) {
	

if(CatchedKey==3 && !open_tower){
	let objToDraw = getObjToDraw(objectsToDraw, "Area4");
	
	let matrix = m4.identity();
	
	matrix = m4.translate(matrix, pxArea4, 1.5, pzArea4); //QUI
	matrix = m4.yRotate(matrix,degToRad(-90));
	matrix = m4.scale(matrix, 2,2, 2);
	objToDraw.uniforms.u_world = matrix;
	
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	
	if (CatchedKey==3 && insideArea4) //cambia colore in verde
	webglUtils.setUniforms(programInfo, {
		u_texture: textures[17],
	});

	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);	

}
}

function drawPrincess(programInfo) {
	
if(open_tower){
	let objToDraw = getObjToDraw(objectsToDraw, "Princess");

	let matrix = m4.identity();
	matrix = m4.translate(matrix,-600,10,250);
	matrix = m4.yRotate(matrix,degToRad(150));
	matrix = m4.scale(matrix,1.5,2.3,1.5);
	objToDraw.uniforms.u_world = matrix;

	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);	
}

}

function drawTrees(programInfo) {
	
	
var objToDraw = getObjToDraw(objectsToDraw, "Albero1");

webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
webglUtils.setUniforms(programInfo, objToDraw.uniforms);
webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);

var objToDraw = getObjToDraw(objectsToDraw, "Albero2");

webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
webglUtils.setUniforms(programInfo, objToDraw.uniforms);
webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);

var objToDraw = getObjToDraw(objectsToDraw, "Albero3");

webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
webglUtils.setUniforms(programInfo, objToDraw.uniforms);
webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);
}

function drawTorre(programInfo) {
	
var objToDraw = getObjToDraw(objectsToDraw, "Torre");

webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
webglUtils.setUniforms(programInfo, objToDraw.uniforms);
webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);
}

function drawGrattacieli(programInfo) {
	
	
	var objToDraw = getObjToDraw(objectsToDraw, "Edificio1");

	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);

	var objToDraw = getObjToDraw(objectsToDraw, "Edificio2");

	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);
	

}

function drawWelcome(programInfo) {


var objToDraw = getObjToDraw(objectsToDraw, "Welcome");
let matrix = m4.identity();
matrix = m4.translate(matrix,700,5,415);
matrix = m4.yRotate(matrix,degToRad(150));
matrix = m4.scale(matrix,4,1,4);
objToDraw.uniforms.u_world = matrix;
webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
webglUtils.setUniforms(programInfo, objToDraw.uniforms);
webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);
}

function drawCapanna(programInfo) {
	
	
	var objToDraw = getObjToDraw(objectsToDraw, "capanna");

	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);


}

function drawDavid(programInfo) {
	
	
	var objToDraw = getObjToDraw(objectsToDraw, "David");

	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);
}
//WORLD
function drawFloor(programInfo) {
	
	var objToDraw = getObjToDraw(objectsToDraw, "floor");

	let matrix = m4.identity();
	matrix = m4.scale(matrix,50,50,50);
	objToDraw.uniforms.u_world = matrix;
	
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);


	

}

function drawParetedx(programInfo){
	var objToDraw = getObjToDraw(objectsToDraw, "paretedx");

	let matrix = m4.identity();
	matrix = m4.scale(matrix,50,50,50);
	objToDraw.uniforms.u_world = matrix;
	
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);
}

function drawParetesx(programInfo){
	var objToDraw = getObjToDraw(objectsToDraw, "paretesx");

	let matrix = m4.identity();
	matrix = m4.scale(matrix,50,50,50);
	objToDraw.uniforms.u_world = matrix;
	
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);
}

function drawBack(programInfo){
	var objToDraw = getObjToDraw(objectsToDraw, "back");

	let matrix = m4.identity();

	matrix = m4.scale(matrix,50,50,50);
	objToDraw.uniforms.u_world = matrix;
	
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);
}

function drawFront(programInfo){
	var objToDraw = getObjToDraw(objectsToDraw, "front");

	let matrix = m4.identity();
	matrix = m4.scale(matrix,50,50,50);
	objToDraw.uniforms.u_world = matrix;
	
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);
}
// -------------------------------------------------------------------------
//CAR
function drawCar(programInfo) {

	var objToDraw = getObjToDraw(objectsToDraw, "carrozzeria");
	
	matrix_car = m4.identity(); 
	
	matrix_car = m4.translate(matrix_car,px,py+3,pz);
	matrix_car = m4.yRotate(matrix_car, degToRad(180));
	matrix_car = m4.yRotate(matrix_car, degToRad(verso));
	matrix_car = m4.scale(matrix_car, 5, 5, 5);
	objToDraw.uniforms.u_world = matrix_car;
	matrix_car = m4.yRotate(matrix_car, degToRad(-180));
	matrix_car = m4.scale(matrix_car, 1/5, 1/5, 1/5);
	
	
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);
	//***
	
	var objToDraw = getObjToDraw(objectsToDraw, "extra");
	
	matrix_car = m4.identity(); 
	
	matrix_car = m4.translate(matrix_car,px,py+3,pz);
	matrix_car = m4.yRotate(matrix_car, degToRad(180));
	matrix_car = m4.yRotate(matrix_car, degToRad(verso));
	matrix_car = m4.scale(matrix_car, 5, 5, 5);
	objToDraw.uniforms.u_world = matrix_car;

	
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);
	
	var objToDraw = getObjToDraw(objectsToDraw, "windows");
	
	matrix_car = m4.identity(); 
	
	matrix_car = m4.translate(matrix_car,px,py+3,pz);
	matrix_car = m4.yRotate(matrix_car, degToRad(180));
	matrix_car = m4.yRotate(matrix_car, degToRad(verso));
	matrix_car = m4.scale(matrix_car, 5, 5, 5);
	objToDraw.uniforms.u_world = matrix_car;
	

	
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);

	var objToDraw = getObjToDraw(objectsToDraw, "fari");
	
	matrix_car = m4.identity(); 
	
	matrix_car = m4.translate(matrix_car,px,py+3,pz);
	matrix_car = m4.yRotate(matrix_car, degToRad(180));
	matrix_car = m4.yRotate(matrix_car, degToRad(verso));
	matrix_car = m4.scale(matrix_car, 5, 5, 5);
	objToDraw.uniforms.u_world = matrix_car;
	
	matrix_car = m4.yRotate(matrix_car, degToRad(-180));
	matrix_car = m4.scale(matrix_car, 1/5, 1/5, 1/5);
	
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);

	objToDraw = getObjToDraw(objectsToDraw, "wheel_adx");
	
	
	matrix_wheels = m4.copy(matrix_car);
	matrix_wheels = m4.translate(matrix_wheels, 5.5, 0, -6);
	matrix_wheels = m4.yRotate(matrix_wheels,degToRad(sterzo));
	matrix_wheels = m4.xRotate(matrix_wheels, degToRad(mozzoA));
	matrix_wheels = m4.scale(matrix_wheels, .6, .6, .6);
	objToDraw.uniforms.u_world = matrix_wheels;
	
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);
	//anteriore sx
	//anteriore sx
	objToDraw = getObjToDraw(objectsToDraw, "wheel_asx");
	
	matrix_wheels = m4.copy(matrix_car);
	matrix_wheels = m4.translate(matrix_wheels, -5.5, 0, -6);
	matrix_wheels = m4.yRotate(matrix_wheels, degToRad(180));
	matrix_wheels = m4.yRotate(matrix_wheels,degToRad(sterzo));
	matrix_wheels = m4.xRotate(matrix_wheels, degToRad(-mozzoA));
	matrix_wheels = m4.scale(matrix_wheels, .6, .6, .6);
	objToDraw.uniforms.u_world = matrix_wheels;
	
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);
	
	// -----------------------------------------------------
	//posteriore dx
	var objToDraw = getObjToDraw(objectsToDraw, "wheel_pdx");
	
	matrix_wheels = m4.copy(matrix_car);
	matrix_wheels = m4.translate(matrix_wheels, 5.5, 0, 14);
	matrix_wheels = m4.xRotate(matrix_wheels, degToRad(mozzoP));
	matrix_wheels = m4.scale(matrix_wheels, .6, .6, .6);
	objToDraw.uniforms.u_world = matrix_wheels;
	
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);
	
	// -----------------------------------------------------
	//posteriore sx
	objToDraw = getObjToDraw(objectsToDraw, "wheel_psx");
	
	matrix_wheels = m4.copy(matrix_car);
	matrix_wheels = m4.translate(matrix_wheels, -5.5, 0, 14);
	matrix_wheels = m4.yRotate(matrix_wheels, degToRad(180));
	matrix_wheels = m4.xRotate(matrix_wheels,degToRad(-mozzoP));
	matrix_wheels = m4.scale(matrix_wheels, .6, .6, .6);
	objToDraw.uniforms.u_world = matrix_wheels;
	
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);
}

function drawFrustum() {
	
	const viewMatrix = m4.inverse(cameraMatrix);

	gl.useProgram(programInfo_color.program);

	webglUtils.setBuffersAndAttributes(gl, programInfo_color, cubeLinesBufferInfo);
	const mat = m4.multiply(lightWorldMatrix, m4.inverse(lightProjectionMatrix));

	webglUtils.setUniforms(programInfo_color, {
		u_color: [1, 1, 1, 1], //frustum color = white
		u_view: viewMatrix,
		u_projection: projectionMatrix,
		u_world: mat,
	});

	webglUtils.drawBufferInfo(gl, cubeLinesBufferInfo, gl.LINES);
}









