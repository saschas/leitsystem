var loader = new THREE.JSONLoader();
function add_mesh_hirsch(object_options){
  // load hirsch
  loader.load(
    // resource URL
    "model/hirsch.js",
    // Function when resource is loaded
    function ( geometry) {
      hirsch = new THREE.Mesh( geometry, basic_material );
          hirsch.scale.set(20,20,20);
          
          set_Positions(hirsch,object_options);

          
          
      var edges = new THREE.EdgesHelper( hirsch, 0x000000 );
          edges.material.linewidth = 2;
          scene.add( edges );
          

          //make it movable
          objects.push(hirsch);
           add_Options(hirsch,edges,object_options);
      scene.add( hirsch );

    }
  );
}