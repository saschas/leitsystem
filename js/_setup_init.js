camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100000 );
camera.position.set(0,10,1000);



////////////////////////////////////////
  //    Controls
////////////////////////////////////////
//controls = new THREE.FirstPersonControls( camera);
//controls.movementSpeed = 70;
//controls.lookSpeed = 0.05;
//controls.enabled = true;
//controls.movementSpeed = 1.0;
//controls.lookSpeed = 0.005;

controls = new THREE.OrbitControls( camera );
controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;
controls.noZoom = false;
controls.noPan = false;
controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;

//
scene = new THREE.Scene();
scene.add( new THREE.AmbientLight( 0x505050 ) );


var scene_options = {
  
}