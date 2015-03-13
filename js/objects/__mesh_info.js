var info_schild;
var service_holder;
function add_mesh_info(){
	if(service_holder ==undefined){
		service_holder = new THREE.Object3D();
	}
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
	  info_schild.position.y = 50;
		info_schild.lookAt(camera.position);
		info_schild.scale.set(1.5,1.5,1.5);
		info_schild.enableShadow = true;
		info_schild.castShadow = true;

		

		add_Options(info_schild);
		//make it moveable
		objects.push(info_schild);

		
		info_schild.geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 50, 0 ) );

		service_holder.add( info_schild );
		scene.add(service_holder);
}