//////////////////////////////////////////
    //    Render Loop
//////////////////////////////////////////

function animate() {
  requestAnimationFrame( animate );
  render();

}

function render() {
  //
  if(gui_value.camera == 'Orbit' || gui_value.camera == 'Orthographic'){
  	controls.update();
  }
  else if(gui_value.camera == 'First Person'){
  	updateControls();
  }

  if(info_schild){
  	info_schild.lookAt(camera.position);
  }
  renderer.render( scene, camera );
}