var grid,gridHolder;
function add_mesh_grid(object_options){

	gridHolder = new THREE.Object3D();

	for(var j=0;j<gui_value.grid_y;j++){
		for(var i=0;i<gui_value.grid_x;i++){
			grid = new THREE.Mesh(object_options.geometry,basic_material);
			grid.position.x = i * 11;
			grid.position.z = j * 11;
			grid.scale.set(1,10,1);
			
			var edges = new THREE.EdgesHelper( grid, 0x000000 );
			    edges.material.linewidth = 1;
			    scene.add( edges );

			add_Options(grid);
			objects.push(grid);

			gridHolder.add(grid);
		}
	}
	gridHolder.applyMatrix(new THREE.Matrix4().makeTranslation(0,50, 0));
	scene.add(gridHolder);
}
