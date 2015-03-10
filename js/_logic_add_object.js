var loader = new THREE.JSONLoader();
var hirsch,box;
function add_new_Object(object_options){

  if(object_options.type == 'box'){
    //object_options.geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 5, 0 ) );
        box = new THREE.Mesh(object_options.geometry,basic_material);
        box.position.y = 5;
        box.scale.set(1,10,1);
        box.options = object_options;
        var edges = new THREE.EdgesHelper( box, 0x000000 );
            edges.material.linewidth = 5;
            scene.add( edges );
        box.type = 'box';
        objects.push(box);
        scene.add(box);
  }
  if(object_options.type == 'schrank'){
    object_options.geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 5, 0 ) );
    
    // load hirsch
    loader.load(
      // resource URL
      "model/hirsch.js",
      // Function when resource is loaded
      function ( geometry) {
            hirsch = new THREE.Mesh( geometry, basic_material );
            hirsch.scale.set(20,20,20);
            hirsch.position.set(0,0,0);
            objects.push(hirsch);
            hirsch.options = {
              type : gui.__folders['Mesh Options'].__controllers[0].object.type,
              material : gui.__folders['Mesh Options'].__controllers[1].object.Material,
              href : gui.__folders['Mesh Options'].__controllers[2].object.href,
              description : gui.__folders['Mesh Options'].__controllers[3].object.description
            };
        var edges = new THREE.EdgesHelper( hirsch, 0x000000 );
            edges.material.linewidth = 5;
            scene.add( edges );
        scene.add( hirsch );
      }
    );
  }
}
