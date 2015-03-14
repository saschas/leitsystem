var gridHolder;
function add_mesh_grid(object_options){
	/*
	if(this.holder == undefined){
		this.holder = new THREE.Object3D();
		this.added = false;
	}
	if(object_options.parent!=false){
		var geometry = new THREE.BoxGeometry(10,100,10);
		var grid = new THREE.Mesh(geometry,basic_material);
			grid.position.x = object_options.position.x;
			grid.position.z = object_options.position.z;
			grid.scale.set(1,10,1);
			
			var edges = new THREE.EdgesHelper( grid, 0x000000 );
			    edges.material.linewidth = 1;
			    scene.add( edges );

			

			
			
			console.log(grid);
			//console.log(this.holder);
			this.holder.add(grid);
			
			objects.push(grid);
			add_Options(grid,edges,object_options);

			this.holder.position.x = object_options.parent_position.x;
			this.holder.position.y = object_options.parent_position.y;
			this.holder.position.z = object_options.parent_position.z;
			if(this.holder===undefined && !this.added){
				scene.add(this.holder);
				this.added = true;
			}
		
		this.last_parent = object_options.parent;
	}

	
	
	else{
		for(var j=0;j<gui_value.grid_y;j++){
			for(var i=0;i<gui_value.grid_x;i++){
				var grid = new THREE.Mesh(object_options.geometry,basic_material);
				grid.position.x = i * 11;
				grid.position.z = j * 11;
				grid.scale.set(1,10,1);
				
				var edges = new THREE.EdgesHelper( grid, 0x000000 );
				    edges.material.linewidth = 1;
				    scene.add( edges );

				
				

				this.holder.add(grid);
				objects.push(grid);
				add_Options(grid,edges,object_options);
			}
		}
		this.holder.applyMatrix(new THREE.Matrix4().makeTranslation(0,50, 0));
		scene.add(this.holder);
	}

	
	*/
}
