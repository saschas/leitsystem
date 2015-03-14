
var geometry = new THREE.PlaneGeometry( 760,760, 32 );
var material = new THREE.MeshLambertMaterial( {
  color: 0x222222, 
  side: THREE.DoubleSide,
  shineness: .01,
  specular: .1
  //map : THREE.ImageUtils.loadTexture("raumplan.png")
	
	}
);

var floor = new THREE.Mesh( geometry, basic_material );
  	floor.rotation.x = 90 * Math.PI/180;
		floor.position.x = -15;
		floor.position.z = 15;
		floor.scale.set(1.5,1.5,1.5);
		floor.enableShadow = true;
		floor.castShadow = true;
		scene.add( floor );