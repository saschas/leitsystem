var loader = new THREE.JSONLoader();

function add_new_Object(object_options){

  if(object_options.type == 'Box'){
    add_mesh_box(object_options);   
  }
  if(object_options.type == 'Schrank'){
    add_mesh_hirsch(object_options); 
  }
  if(object_options.type == 'Info'){

    console.log('Info');
    add_mesh_info(object_options); 
  }
}
