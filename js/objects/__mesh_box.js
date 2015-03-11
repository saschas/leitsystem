var box;
function add_mesh_box(object_options){
	box = new THREE.Mesh(object_options.geometry,basic_material);
	box.position.y = 5;
	box.scale.set(1,10,1);
	box.options = {
    type : gui.__folders['Mesh Options'].__controllers[0].object.type,
    material : gui.__folders['Mesh Options'].__controllers[1].object.Material,
    href : gui.__folders['Mesh Options'].__controllers[2].object.href,
    description : gui.__folders['Mesh Options'].__controllers[3].object.description
  };
	var edges = new THREE.EdgesHelper( box, 0x000000 );
	    edges.material.linewidth = 1;
	    scene.add( edges );
	box.type = 'box';
	objects.push(box);
	scene.add(box);
}