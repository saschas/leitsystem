var loader = new THREE.JSONLoader();

function add_new_Object(object_options){

  switch(object_options.type){
    case 'Box':
      add_mesh_box(object_options);
    break;

    case 'Schrank':
      add_mesh_hirsch(object_options);
    break;

    case 'Info':
      add_mesh_info(object_options); 
    break;

    case 'Grid':
      add_mesh_grid(object_options); 
    break;
  }
}
