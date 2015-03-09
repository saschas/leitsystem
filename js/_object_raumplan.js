
var geometry = new THREE.PlaneGeometry( window.innerWidth,window.innerHeight, 32 );
var material = new THREE.MeshBasicMaterial( {
  color: 0xffffff, 
  side: THREE.DoubleSide, 
  map : THREE.ImageUtils.loadTexture(
        "raumplan.png"
)});

var floor = new THREE.Mesh( geometry, material );
  floor.rotation.x = 90 * Math.PI/180;
floor.position.y = 0;
floor.enableShadow = true;
floor.castShadow = true;
scene.add( floor );