//////////////////////////////////////////
    //    Render Loop
//////////////////////////////////////////

function animate() {
  requestAnimationFrame( animate );
  render();

}

function render() {
  controls.update();
  if(info_schild){
  	info_schild.lookAt(camera.position);
  }
  renderer.render( scene, camera );
}