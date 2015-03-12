var info_schild;
function add_mesh_info(){
	var geometry = new THREE.PlaneGeometry( 35,35, 32 );
	var material = new THREE.MeshBasicMaterial( {
	  color: 0xffffff, 
	  side: THREE.DoubleSide,
	  transparent: true,
	  alpha:0,
	  map : THREE.ImageUtils.loadTexture(
	        "raumplan/info_schild.png"
	)});

		info_schild = new THREE.Mesh( geometry, material );
	  info_schild.rotation.x = 90 * Math.PI/180;
		info_schild.lookAt(camera.position);
		info_schild.scale.set(1.5,1.5,1.5);
		info_schild.enableShadow = true;
		info_schild.castShadow = true;

		info_schild.geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 15, 0 ) );

		//make it moveable
		objects.push(info_schild);

		info_schild.options = {
            type : gui.__folders['Mesh Options'].__controllers[0].object.type,
            material : gui.__folders['Mesh Options'].__controllers[1].object.Material,
            href : gui.__folders['Mesh Options'].__controllers[2].object.href,
            description : gui.__folders['Mesh Options'].__controllers[3].object.description
          };
		scene.add( info_schild );
}