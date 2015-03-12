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
    gui_value.x = SELECTED.position.x;
    gui_value.z = SELECTED.position.z;
    gui_value.rot = SELECTED.rotation.y;
    return;
  }

  var intersects = raycaster.intersectObjects( objects );

  if ( intersects.length > 0 ) {
    if ( INTERSECTED != intersects[ 0 ].object ) {

      INTERSECTED = intersects[ 0 ].object;

      plane.position.copy( INTERSECTED.position );
      plane.lookAt( camera.position );

    }

    document.body.style.cursor = 'pointer';

  } else {
    //reset Mesh to default 
    
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
    
    //wenn noch nichts ausgewählt ist
    if(!scene_options.active){
      scene_options.active = SELECTED;
      scene_options.materialbackup = SELECTED.material;
      SELECTED.material = active_material;
    }

    //wenn auf ein neues Objekt ausgewählt wird = activiert
    else if(JSON.stringify(scene_options.active) != JSON.stringify( SELECTED)){
      console.log('nichst ausgewählt gewesen',scene_options.materialbackup);
      scene_options.active.material = basic_material;
      scene_options.active = SELECTED;
      SELECTED.material = active_material;
    }

    //wenn auf ein ausgewähltes Object geklickt wird == deactiviert
    else if(JSON.stringify(scene_options.active) === JSON.stringify( SELECTED)){
      
      scene_options.active.material = scene_options.materialbackup;
      scene_options.active = null;
    }

    //waehrend etwas ausgewaehlt ist
    if(scene_options.active){
      console.log(gui_value.x);
      gui_value.x = scene_options.active.position.x;
      gui_value.z = scene_options.active.position.z;
      gui_value.rot = scene_options.active.rotation.y;
      gui_value.type = scene_options.active.options.type;
      gui_value.href = scene_options.active.options.href;
      gui_value.description = scene_options.active.options.description;
      document.body.style.cursor = 'move';
    }
    down_Handler(SELECTED);
    //
  }
  else{
    if(scene_options.active){
      scene_options.active.material = scene_options.materialbackup;
      scene_options.active = null;
    }
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
    
    up_Handler(SELECTED);
  
  }
  SELECTED = null;
  document.body.style.cursor = 'auto';
}