
var geometry = new THREE.PlaneGeometry( 760,760, 32 );


var floor = new THREE.Mesh( geometry, floor_material );
  	floor.rotation.x = 90 * Math.PI/180;
		floor.position.x = -15;
		floor.position.z = 10;
		floor.scale.set(1.5,1.5,1.5);
		floor.enableShadow = true;
		floor.castShadow = true;
		scene.add( floor );