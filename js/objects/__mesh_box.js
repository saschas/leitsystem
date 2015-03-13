var box;
function add_mesh_box(object_options){
	object_options.geometry = new THREE.BoxGeometry(60,100,30);
	box = new THREE.Mesh(object_options.geometry,basic_material);
	//box.scale.set(10,10,3);
	box.applyMatrix(new THREE.Matrix4().makeTranslation(0,100, 0));
	var edges = new THREE.EdgesHelper( box, 0x000000 );
	    edges.material.linewidth = 1;
	    scene.add( edges );
	add_Options(box,edges);
	objects.push(box);
	scene.add(box);
}