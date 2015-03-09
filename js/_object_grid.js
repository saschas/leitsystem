/*var grid = {
  x : 50,
  y : 50,
  size : 20,
  margin:1.01
}

  var geometry = new THREE.BoxGeometry( grid.size, 2, grid.size );
for ( var j = 0; j < grid.y; j ++ ) {
  for ( var i = 0; i < grid.x; i ++ ) {

    var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0xffffff } ) );

    object.material.ambient = object.material.color;

    object.position.x = -((grid.x/2) * grid.size*grid.margin) + (i * grid.size*grid.margin);
    object.position.y = 0 ;
    object.position.z = -((grid.y/2) * grid.size*grid.margin) + (j * grid.size*grid.margin) ;

    object.castShadow = true;
    object.receiveShadow = true;
    object.options = object_options;
    scene.add( object );

    objects.push( object );

  }
}*/