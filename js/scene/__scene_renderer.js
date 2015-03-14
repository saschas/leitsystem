renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setClearColor( 0x1d385f );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight);
renderer.sortObjects = false;

renderer.shadowMapEnabled = true;
renderer.shadowMapType = THREE.PCFShadowMap;

document.body.appendChild( renderer.domElement );

////////////////////////////////////////
  //    Event Listener
////////////////////////////////////////
renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );
renderer.domElement.addEventListener("contextmenu", onContextMenu);
//Resize

window.addEventListener( 'resize', onWindowResize, false );