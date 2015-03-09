var loader = new THREE.JSONLoader();

function add_new_Object(object_options){

  if(object_options.type == 'box'){
    //object_options.geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 5, 0 ) );
    var mesh = new THREE.Mesh(object_options.geometry,new THREE.MeshBasicMaterial({color:0xff0000}));
    mesh.position.y = 5;
    mesh.scale.set(1,10,1);
    objects.push(mesh);
    mesh.options = object_options;
    scene.add(mesh);
  }
  if(object_options.type == 'schrank'){
    object_options.geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 5, 0 ) );
    
    // load hirsch
    loader.load(
      // resource URL
      "model/hirsch.js",
      // Function when resource is loaded
      function ( geometry) {
        console.log(geometry);
        var mesh = new THREE.Mesh( geometry, basic_material );
            mesh.scale.set(20,20,20);
            mesh.position.set(0,0,0);
            objects.push(mesh);
            mesh.options = object_options;
        scene.add( mesh );
      }
    );
  }
  console.log(objects)
}
