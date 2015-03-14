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

  objects.forEach(function(el){
    //console.log(el.options.type);
    if(el.options.type ==="Info"){
      el.lookAt(camera.position);
    }
  })

  renderer.render( scene, camera );
}