function add_mesh_hirsch(object_options){
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
          //make it movable
          objects.push(hirsch);
          hirsch.options = {
            type : gui.__folders['Mesh Options'].__controllers[0].object.type,
            material : gui.__folders['Mesh Options'].__controllers[1].object.Material,
            href : gui.__folders['Mesh Options'].__controllers[2].object.href,
            description : gui.__folders['Mesh Options'].__controllers[3].object.description
          };
      var edges = new THREE.EdgesHelper( hirsch, 0x000000 );
          edges.material.linewidth = 2;
          scene.add( edges );
      scene.add( hirsch );
    }
  );
}