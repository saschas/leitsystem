var meshMaterial = new THREE.MeshLambertMaterial({
	specular: 0xff0000, 
	color: 0x444444, 
	shininess: 0, 
	metal: true
});

var basic_material = new THREE.MeshBasicMaterial( { 
	color: 0xffffff, 
	opacity:1,
	shininess: 0,
	transparent: false
} );

var basic_wall_material = new THREE.MeshBasicMaterial( { 
	color: 0xD0E2F0, 
	opacity:.9,
	transparent:true,
	shininess: 0
} );
var floor_material = new THREE.MeshBasicMaterial( { 
	color: 0x555555,
	side: THREE.DoubleSide
} );

var active_material = new THREE.MeshLambertMaterial( { 
	color: 0xff0000, 
	opacity:1,
	shininess: 0,
	transparent: false 
} );
var basic_wire_material = new THREE.MeshBasicMaterial( { 
	color: 0x000000,
	wireframe: true, 
	opacity:1,
	shininess: 0,
	transparent: false 
} );

