////////////////////////////////////////
  //    Controls
////////////////////////////////////////


function orbit_Controls(){
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100000 ); //.toPerspective();
	controls = new THREE.OrbitControls( camera );
	controls.rotateSpeed = 1.0;
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 0.8;
	controls.noZoom = false;
	controls.noPan = false;
	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;
	camera.lookAt(new THREE.Vector3(0,0,0));
	camera.position.set(0,1000,0);
	camera.rotation.z = Math.sin(camera.rotation.y)/3.5;
}

function ortho_Controls(){
	camera = new THREE.OrthographicCamera( -window.innerWidth * gui_value.distance ,window.innerWidth *  gui_value.distance, -window.innerWidth * gui_value.distance , window.innerWidth * gui_value.distance, 1, 100000 );
	camera.position.x = 0;
	camera.position.y = 2000;
	camera.position.z = 0;
	
	controls = new THREE.TrackballControls( camera );
	controls.rotateSpeed = 0;
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 10;

	controls.noZoom = false;
	controls.noPan = false;

	controls.staticMoving = false;
	controls.dynamicDampingFactor = 1;
	camera.updateProjectionMatrix();

	//controls.addEventListener( 'change', render );
	/*
	camera.lookAt(new THREE.Vector3(0,0,0));
	camera.position.set(0,0,1000);
	camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 10000 );
	camera.updateProjectionMatrix();
	controls.enabled = true;
	//camera.rotation.z = Math.sin(camera.rotation.y)/3.5;
	*/
}

var controlsEnabled = true;
	var moveForward = false;
	var moveBackward = false;
	var moveLeft = false;
	var moveRight = false;
	var canJump = true;

	var prevTime = performance.now();
	var velocity = new THREE.Vector3();


function first_Controls(){
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100000 ); //.toPerspective();
	camera.position.y = 80;
	controlsEnabled = true;
	moveForward = false;
	moveBackward = false;
	moveLeft = false;
	moveRight = false;
	canJump = true;

	prevTime = performance.now();
	velocity = new THREE.Vector3();
	controls = new THREE.PointerLockControls( camera );
	scene.add( controls.getObject() );

	var onKeyDown = function ( event ) {

			switch ( event.keyCode ) {

				case 38: // up
				case 87: // w
					moveForward = true;
					break;

				case 37: // left
				case 65: // a
					moveLeft = true; 
					break;

				case 40: // down
				case 83: // s
					moveBackward = true;
					break;

				case 39: // right
				case 68: // d
					moveRight = true;
					break;

				case 32: // space
					if ( canJump === true ) velocity.y += 350;
					//canJump = false;
					break;

			}

		};

		var onKeyUp = function ( event ) {

			switch( event.keyCode ) {

				case 38: // up
				case 87: // w
					moveForward = false;
					break;

				case 37: // left
				case 65: // a
					moveLeft = false;
					break;

				case 40: // down
				case 83: // s
					moveBackward = false;
					break;

				case 39: // right
				case 68: // d
					moveRight = false;
					break;

			}

		};

		document.addEventListener( 'keydown', onKeyDown, false );
		document.addEventListener( 'keyup', onKeyUp, false );
}

orbit_Controls();

function updateControls(){

		if(scene_options.mousedown){
			raycaster.ray.origin.copy( controls.getObject().position );
			raycaster.ray.origin.y -= 10;

			var intersections = raycaster.intersectObjects( objects );

			var isOnObject = intersections.length > 0;
		}
		var time = performance.now();
		var delta = ( time - prevTime ) / 1000;

		velocity.x -= velocity.x * 10.0 * delta;
		velocity.z -= velocity.z * 10.0 * delta;

		velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

		if ( moveForward ) velocity.z -= gui_value.movementSpeed * delta;
		if ( moveBackward ) velocity.z += gui_value.movementSpeed * delta;

		if ( moveLeft ) velocity.x -= gui_value.movementSpeed * delta;
		if ( moveRight ) velocity.x += gui_value.movementSpeed * delta;

		if ( isOnObject === true ) {
			velocity.y = Math.max( 0, velocity.y );

			canJump = true;
		}

		controls.getObject().translateX( velocity.x * delta );
		controls.getObject().translateY( velocity.y * delta );
		controls.getObject().translateZ( velocity.z * delta );

		if ( controls.getObject().position.y < 10 ) {

			velocity.y = 0;
			controls.getObject().position.y = 10;
		}

		prevTime = time;

}