
var geometry = new THREE.PlaneGeometry( 900,800, 32 );
var material = new THREE.MeshBasicMaterial( {
  color: 0xcccccc, 
  side: THREE.DoubleSide, 
  map : THREE.ImageUtils.loadTexture(
        "raumplan.png"
)});

var floor = new THREE.Mesh( geometry, material );
  floor.rotation.x = 90 * Math.PI/180;
floor.position.x = -100;
floor.position.y = 0;
floor.scale.set(1.5,1.5,1.5);
floor.enableShadow = true;
floor.castShadow = true;
scene.add( floor );