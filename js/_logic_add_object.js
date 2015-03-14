

function add_new_Object(object_options){

  switch(object_options.type){
    case 'Box':
      console.log('box_yep');
      add_mesh_box(object_options);
    break;

    case 'Schrank':
      console.log('schrank_yep');
      add_mesh_hirsch(object_options);
    break;

    case 'Info':
      console.log('info_yep');
      add_mesh_info(object_options); 
    break;

    case 'Grid':
      console.log('grid_yep',object_options);
      add_mesh_grid(object_options); 
    break;
  }
}
