//////////////////////////////////////////
    //    Plane
//////////////////////////////////////////
  plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry( 2000, 2000, 8, 8 ),
    basic_material
  );
  plane.visible = false;
  scene.add( plane );

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}
//////////////////////////////////////////
    //    Move
//////////////////////////////////////////
function onDocumentMouseMove( event ) {

  event.preventDefault();

  ///////////////////////////////////////
  ////  Update Mouse Object
  ///////////////////////////////////////
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  raycaster.setFromCamera( mouse, camera );

  // Wenn ausgewaehlt
  if ( SELECTED ) {

    var intersects = raycaster.intersectObject( plane );
    SELECTED.position.copy( intersects[ 0 ].point.sub( offset ) );
    //prevent object from fly
    SELECTED.position.y = 0;
    move_Handler(SELECTED);
    return;
  }

  var intersects = raycaster.intersectObjects( objects );

  if ( intersects.length > 0 ) {
    if ( INTERSECTED != intersects[ 0 ].object ) {
      if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );

      INTERSECTED = intersects[ 0 ].object;
      INTERSECTED.currentHex = INTERSECTED.material.color.getHex();

      plane.position.copy( INTERSECTED.position );
      plane.lookAt( camera.position );

    }

    document.body.style.cursor = 'pointer';

  } else {
    //reset Mesh to default 
    if ( INTERSECTED ){
      INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
    }
    INTERSECTED = null;
    document.body.style.cursor = 'auto';
  }
}
//////////////////////////////////////////
    //    Down
//////////////////////////////////////////
function onDocumentMouseDown( event ) {

  event.preventDefault();

  var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 ).unproject( camera );
  var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
  var intersects = raycaster.intersectObjects( objects );

  if ( intersects.length > 0 ) {

    controls.enabled = false;

    SELECTED = intersects[ 0 ].object;

    var intersects = raycaster.intersectObject( plane );
    offset.copy( intersects[ 0 ].point ).sub( plane.position );
   

    
    down_Handler(SELECTED);
    document.body.style.cursor = 'move';
  }
}

//////////////////////////////////////////
    //    Up Setup
//////////////////////////////////////////
function onDocumentMouseUp( event ) {

  event.preventDefault();
  controls.enabled = true;
  if ( INTERSECTED ) {
    plane.position.copy( INTERSECTED.position );
    SELECTED = null;
    up_Handler(SELECTED);
  }
  document.body.style.cursor = 'auto';
}