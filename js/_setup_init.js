

  camera = new THREE.PerspectiveCamera( 15, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.set(0,800,1000);
//////////////////////////////////////////
    //    Controls
//////////////////////////////////////////
  controls = new THREE.OrbitControls( camera );
  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;
  controls.noZoom = false;
  controls.noPan = false;
  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;

  scene = new THREE.Scene();

  scene.add( new THREE.AmbientLight( 0x505050 ) );
//////////////////////////////////////////
    //    Light Setup
//////////////////////////////////////////
  

//////////////////////////////////////////
    //   Renderer
//////////////////////////////////////////


