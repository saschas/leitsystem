
function add_mesh_info(object_options){
	
	var geometry = new THREE.PlaneGeometry( 35,35, 32 );
	var material = new THREE.MeshBasicMaterial( {
	  color: 0xffffff, 
	  side: THREE.DoubleSide,
	  transparent: true,
	  alpha:0,
	  map : THREE.ImageUtils.loadTexture(
	        "raumplan/info_schild.png"
	)});

		var info_schild = new THREE.Mesh( geometry, material );

		set_Positions(info_schild,object_options);
		info_schild.lookAt(camera.position);
		info_schild.scale.set(1.5,1.5,1.5);
		info_schild.position.y = 50;
		scene.add( info_schild );

		objects.push(info_schild);
		add_Options(info_schild,false,object_options);
}