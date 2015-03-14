var container, stats;
var camera, controls, scene, renderer,hirsch;



///////////////////////////////////////
//// Object Setup
///////////////////////////////////////
var object_options = {
  type : 'schrank',
  active_material : new THREE.MeshBasicMaterial({color:0x00ff00}),
  geometry: new THREE.BoxGeometry(10,10,10),
  extra : {
    href : 'http://www.google.de/',
    description : 'Dieser Gegenstand hat eine Beschreibung',
  }
}
function set_Positions(el,object_options){
  el.position.x = (function(){
    if(object_options.position){
      return object_options.position.x;
    }
    else{
      return 0;
    }
  })();
  el.position.y = (function(){
    if(object_options.position){
      return object_options.position.y;
  }
    else{
      return 0;
    }
  })();
  el.position.z = (function(){
    if(object_options.position){
      return object_options.position.z;
  }
    else{
      return 0;
    }
  })();
  el.rotation.y = (function(){
    
    if(object_options.rot){
      return object_options.rot * Math.PI/180;
  }
    else{
      return 0;
    }
  })();
}
function add_Options(el,optional_edges,object_options){

    el.options = {
      type : (function(){
        if(object_options.bestand != undefined){
          return object_options.type;
        }
        else{
          return gui.__folders['Mesh Options'].__controllers[0].object.type;
        }
      })(),
      rot : (function(){
        if(object_options.rot != undefined){
          return object_options.rot;
        }
        else{
          return gui.__folders['Mesh Options'].__controllers[0].object.rot;
        }
      })(),
      bestand : (function(){
        if(object_options.bestand != undefined){
          return object_options.bestand;
        }
        else{
          return gui.__folders['Mesh Options'].__controllers[0].object.bestand;
        }
      })(),
      
      href :  (function(){
        if(object_options.bestand != undefined){
          return object_options.href;
        }
        else{
          return gui.__folders['Mesh Options'].__controllers[0].object.href;
        }
      })(),
      parent : (function(){
        if(el.parent != false){
          return false;
        }
        else{
          console.log(el.parent)
          return el.parent.uuid;
        }
      })(),
      description : (function(){
        if(object_options.bestand != undefined){
          return object_options.description;
        }
        else{
          return gui.__folders['Mesh Options'].__controllers[0].object.description;
        }
      })()
    };
  if(optional_edges){
  	el.options.edges = optional_edges;
  }
}

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



scene = new THREE.Scene();
scene.add( new THREE.AmbientLight( 0x505050 ) );


var scene_options = {
  
}

renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setClearColor( 0x1d385f );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight);
renderer.sortObjects = false;

renderer.shadowMapEnabled = true;
renderer.shadowMapType = THREE.PCFShadowMap;

document.body.appendChild( renderer.domElement );

////////////////////////////////////////
  //    Event Listener
////////////////////////////////////////
renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );
renderer.domElement.addEventListener("contextmenu", onContextMenu);
//Resize

window.addEventListener( 'resize', onWindowResize, false );

camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100000 ); //.toPerspective();
	

/*new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100000 );*/
camera.position.set(0,60,0);

////////////////////////////////////////
  //    Controls
////////////////////////////////////////


function orbit_Controls(){
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100000 ); //.toPerspective();
	controls = new THREE.OrbitControls( camera );
	controls.rotateSpeed = 1.0;
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 0.8;
	controls.noZoom = false;
	controls.noPan = false;
	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;
	camera.lookAt(new THREE.Vector3(0,0,0));
	camera.position.set(0,1000,0);
	camera.rotation.z = Math.sin(camera.rotation.y)/3.5;
}

function ortho_Controls(){
	camera = new THREE.OrthographicCamera( -window.innerWidth * gui_value.distance ,window.innerWidth *  gui_value.distance, -window.innerWidth * gui_value.distance , window.innerWidth * gui_value.distance, 1, 100000 );
	camera.position.x = 0;
	camera.position.y = 2000;
	camera.position.z = 0;
	
	controls = new THREE.TrackballControls( camera );
	controls.rotateSpeed = 0;
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 10;

	controls.noZoom = false;
	controls.noPan = false;

	controls.staticMoving = false;
	controls.dynamicDampingFactor = 1;
	camera.updateProjectionMatrix();

	//controls.addEventListener( 'change', render );
	/*
	camera.lookAt(new THREE.Vector3(0,0,0));
	camera.position.set(0,0,1000);
	camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 10000 );
	camera.updateProjectionMatrix();
	controls.enabled = true;
	//camera.rotation.z = Math.sin(camera.rotation.y)/3.5;
	*/
}

var controlsEnabled = true;
	var moveForward = false;
	var moveBackward = false;
	var moveLeft = false;
	var moveRight = false;
	var canJump = true;

	var prevTime = performance.now();
	var velocity = new THREE.Vector3();


function first_Controls(){
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100000 ); //.toPerspective();
	camera.position.y = 80;
	controlsEnabled = true;
	moveForward = false;
	moveBackward = false;
	moveLeft = false;
	moveRight = false;
	canJump = true;

	prevTime = performance.now();
	velocity = new THREE.Vector3();
	controls = new THREE.PointerLockControls( camera );
	scene.add( controls.getObject() );

	var onKeyDown = function ( event ) {

			switch ( event.keyCode ) {

				case 38: // up
				case 87: // w
					moveForward = true;
					break;

				case 37: // left
				case 65: // a
					moveLeft = true; 
					break;

				case 40: // down
				case 83: // s
					moveBackward = true;
					break;

				case 39: // right
				case 68: // d
					moveRight = true;
					break;

				case 32: // space
					if ( canJump === true ) velocity.y += 350;
					//canJump = false;
					break;

			}

		};

		var onKeyUp = function ( event ) {

			switch( event.keyCode ) {

				case 38: // up
				case 87: // w
					moveForward = false;
					break;

				case 37: // left
				case 65: // a
					moveLeft = false;
					break;

				case 40: // down
				case 83: // s
					moveBackward = false;
					break;

				case 39: // right
				case 68: // d
					moveRight = false;
					break;

			}

		};

		document.addEventListener( 'keydown', onKeyDown, false );
		document.addEventListener( 'keyup', onKeyUp, false );
}

orbit_Controls();

function updateControls(){

		if(scene_options.mousedown){
			raycaster.ray.origin.copy( controls.getObject().position );
			raycaster.ray.origin.y -= 10;

			var intersections = raycaster.intersectObjects( objects );

			var isOnObject = intersections.length > 0;
		}
		var time = performance.now();
		var delta = ( time - prevTime ) / 1000;

		velocity.x -= velocity.x * 10.0 * delta;
		velocity.z -= velocity.z * 10.0 * delta;

		velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

		if ( moveForward ) velocity.z -= gui_value.movementSpeed * delta;
		if ( moveBackward ) velocity.z += gui_value.movementSpeed * delta;

		if ( moveLeft ) velocity.x -= gui_value.movementSpeed * delta;
		if ( moveRight ) velocity.x += gui_value.movementSpeed * delta;

		if ( isOnObject === true ) {
			velocity.y = Math.max( 0, velocity.y );

			canJump = true;
		}

		controls.getObject().translateX( velocity.x * delta );
		controls.getObject().translateY( velocity.y * delta );
		controls.getObject().translateZ( velocity.z * delta );

		if ( controls.getObject().position.y < 10 ) {

			velocity.y = 0;
			controls.getObject().position.y = 10;
		}

		prevTime = time;

}

var light = new THREE.SpotLight( 0xffffff, 1.5 );
    light.position.set( 0, 1000, 0 );
    light.castShadow = true;

    light.shadowCameraNear = 50;
    light.shadowCameraFar = camera.far;
    light.shadowCameraFov = 50;
    
    light.shadowBias = -0.00022;
    light.shadowDarkness = 0.5;
    
    light.shadowMapWidth = 2048;
    light.shadowMapHeight = 2048;

    scene.add( light );



var hemi = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
    hemi.position.set( 0.5, 1, 0.75 );
    scene.add( hemi );




var geometry = new THREE.PlaneGeometry( 760,760, 32 );


var floor = new THREE.Mesh( geometry, floor_material );
  	floor.rotation.x = 90 * Math.PI/180;
		floor.position.x = -15;
		floor.position.z = 10;
		floor.scale.set(1.5,1.5,1.5);
		floor.enableShadow = true;
		floor.castShadow = true;
		scene.add( floor );

var box;
function add_mesh_box(object_options){
	object_options.geometry = new THREE.BoxGeometry(60,100,30);
	box = new THREE.Mesh(object_options.geometry,basic_material);
	//box.scale.set(10,10,3);
	set_Positions(box,object_options);
	box.applyMatrix(new THREE.Matrix4().makeTranslation(0,100, 0));
	var edges = new THREE.EdgesHelper( box, 0x000000 );
	    edges.material.linewidth = 1;
	    scene.add( edges );
	add_Options(box,edges,object_options);
	objects.push(box);
	scene.add(box);
}

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


var loader = new THREE.JSONLoader();
function add_mesh_hirsch(object_options){
  // load hirsch
  loader.load(
    // resource URL
    "model/hirsch.js",
    // Function when resource is loaded
    function ( geometry) {
      hirsch = new THREE.Mesh( geometry, basic_material );
          hirsch.scale.set(20,20,20);
          
          set_Positions(hirsch,object_options);

          
          
      var edges = new THREE.EdgesHelper( hirsch, 0x000000 );
          edges.material.linewidth = 2;
          scene.add( edges );
          

          //make it movable
          objects.push(hirsch);
           add_Options(hirsch,edges,object_options);
      scene.add( hirsch );

    }
  );
}


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

var objects = [], plane;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(),
offset = new THREE.Vector3(),
INTERSECTED, SELECTED;
//////////////////////////////////////////
    //    Plane
//////////////////////////////////////////
  plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry( 2000, 2000, 8, 8 ),
    basic_material
  );
  plane.visible = false;
  scene.add( plane );

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  if(gui_value.camera == 'Orthographic'){
    ortho_Controls();
  }

  renderer.setSize( window.innerWidth, window.innerHeight );

}
//////////////////////////////////////////
    //    Move
//////////////////////////////////////////
function onDocumentMouseMove( event ) {

  event.preventDefault();


  ///////////////////////////////////////
  ////  Update Mouse Object
  ///////////////////////////////////////
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  raycaster.setFromCamera( mouse, camera );

  // Wenn ausgewaehlt
  if ( SELECTED ) {
    if(SELECTED.parent  && SELECTED.parent.type === 'Object3D'){
      var options =SELECTED.options; 
      SELECTED = SELECTED.parent;
      SELECTED.options = options;
    }
    if(gui_value.clickable == true){
      var intersects = raycaster.intersectObject( plane );
      SELECTED.position.copy( intersects[ 0 ].point.sub( offset ) );
      //prevent object from fly
      SELECTED.position.y = 0;
      gui_value.x = SELECTED.position.x;
      gui_value.z = SELECTED.position.z;
      gui_value.rot = SELECTED.rotation.y;
    }
    else{

      move_Handler(SELECTED);
    
    }
    return;
  }

  var intersects = raycaster.intersectObjects( objects );

  if ( intersects.length > 0 ) {
    if ( INTERSECTED != intersects[ 0 ].object ) {

      INTERSECTED = intersects[ 0 ].object;

      plane.position.copy( INTERSECTED.position );
      plane.lookAt( camera.position );

    }

    document.body.style.cursor = 'pointer';

  } else {
    //reset Mesh to default 
    
    INTERSECTED = null;
    document.body.style.cursor = 'auto';
  }
}
//////////////////////////////////////////
    //    Down
//////////////////////////////////////////

var intersects;
function onDocumentMouseDown( event ) {

  event.preventDefault();
  controls.enabled = true;
  var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 ).unproject( camera );
  var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
  var intersects = raycaster.intersectObjects( objects );

  
  if ( intersects.length > 0 ) {

    // Prevent Drag Look
    controls.enabled = false;

    SELECTED = intersects[ 0 ].object;
    var intersects = raycaster.intersectObject( plane );
    offset.copy( intersects[ 0 ].point ).sub( plane.position );
    
    //wenn noch nichts ausgewählt ist
    if(!scene_options.active){
      scene_options.active = SELECTED;
      scene_options.materialbackup = SELECTED.material;
      SELECTED.material = active_material;
    }

    //wenn auf ein neues Objekt ausgewählt wird = activiert
    else if(JSON.stringify(scene_options.active) != JSON.stringify( SELECTED)){
      console.log('nichst ausgewählt gewesen',scene_options.materialbackup);
      scene_options.active.material = basic_material;
      scene_options.active = SELECTED;
      SELECTED.material = active_material;
    }

    //wenn auf ein ausgewähltes Object geklickt wird == deactiviert
    else if(JSON.stringify(scene_options.active) === JSON.stringify( SELECTED)){
      
      scene_options.active.material = scene_options.materialbackup;
      scene_options.active = null;
    }

    //waehrend etwas ausgewaehlt ist
    if(scene_options.active){
      console.log(gui_value.x);
      gui_value.x = scene_options.active.position.x;
      gui_value.z = scene_options.active.position.z;
      gui_value.rot = scene_options.active.rotation.y;
      gui_value.type = scene_options.active.options.type;
      gui_value.href = scene_options.active.options.href;
      gui_value.description = scene_options.active.options.description;
      document.body.style.cursor = 'move';
    }
    down_Handler(SELECTED);
    //
  }
  else{
    if(scene_options.active){
      scene_options.active.material = scene_options.materialbackup;
      scene_options.active = null;
    }
  }
}

//////////////////////////////////////////
    //    Up Setup
//////////////////////////////////////////
function onDocumentMouseUp( event ) {
    
  event.preventDefault();
  

  if(gui_value.camera == 'First Person'){
    // Enable Controls while mousedown
    controls.enabled = false;
  }
  

  if ( INTERSECTED ) {
    plane.position.copy( INTERSECTED.position );    
    up_Handler(SELECTED);
  
  }
  SELECTED = null;
  document.body.style.cursor = 'auto';
}



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


function export_scene(objects){
	var scene_export_array = [];
	objects.forEach(function(el){
		el.options.edges = null;
		el.options.rot = el.options.rot;
		el.options.parent = (function(){
			if(el.parent.type != 'Scene'){
				return el.parent.uuid;
			}
			else{
				return false;
			};
		})();
		el.options.position = (function(){
			if(el.parent.type != 'Scene'){
				el.options.parent_position = el.parent.position;
			}
			else{
				
			};
			return el.position;
		})();
		scene_export_array.push(el.options);
	});
	(function(console){

	    console.save = function(data, filename){

	        if(!data) {
	            console.error('Console.save: No data')
	            return;
	        }

	        if(!filename) filename = 'console.json'

	        if(typeof data === "object"){
	            data = JSON.stringify(data, undefined, 4)
	        }

	        var blob = new Blob([data], {type: 'text/json'}),
	            e    = document.createEvent('MouseEvents'),
	            a    = document.createElement('a')

	        a.download = filename
	        a.href = window.URL.createObjectURL(blob)
	        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
	        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
	        a.dispatchEvent(e)
	    }
	})(console);

	console.log(scene_export_array);
	console.save(scene_export_array);
}

function down_Handler(SELECTED){
	
//  updateGUI(gui,SELECTED);
}
function up_Handler(SELECTED){

}
function move_Handler(SELECTED){

}

function onContextMenu(e){
  eX = e.pageX;
  eY = e.pageY;
}

$('#search_panel a').each(function(){
	$(this).attr('data-search',$(this).text());
});
$('#search_panel a').click(function(){
	search($(this).attr('data-search'));
});


function search(needle){
	objects.forEach(function(el){
		var curr = el.options.bestand;
		if(needle ==curr){
			el.material = active_material;
		}
		else{
			el.material = basic_material;
		}
		console.log();
	});
}

///////////////////////////////////////////////////////// 
//// GUI Presets
/////////////////////////////////////////////////////////

var guiOptions = function() {

  ////////////////////////
  /// Scene Options
  ////////////////////////

  this.clickable = true;
  this.lineWidth = 1;
  this.bg_color = '#cccccc';

  this.exporter = function () {
    export_scene(objects);
    //  var exporter = new THREE.SceneExporter();
    //  var sceneJson = exporter.parse(this.scene);
     // console.log(sceneJson);
      //localStorage.setItem('scene', sceneJson);
  };

  ////////////////////////
  /// Camera Options
  ////////////////////////
  this.camera = 'Orbit';
  this.distance = 1;  
  this.perspective = 75;
  this.movementSpeed = 1200;
  
  this.scene = scene;


  ////////////////////////// 
  //// Mesh OPTIONs
  //////////////////////////
  this.x = 50;
  this.z = 50;
  this.rot = 0;

  this.grid_x = 2;
  this.grid_y = 2;

  this.displayOutline = false;

  this.bestand = 'Allgemeines';
  this.href = 'link';
  this.description = 'Beschreibungstext';
  this.type = 'Schrank';
  

  this.add = function(){
    object_options.type = gui_value.type;
    object_options.controls = gui_value;
    add_new_Object(object_options);
  }
  this.delete = function(){
    if(scene_options.active){
      var counter = -1;
      objects.forEach(function(el){
        counter++;
        if(el.uuid == scene_options.active.uuid ){
          console.log(el);
          if(scene_options.active.parent.type != 'Scene'){
            scene.remove(scene_options.active.parent);
          }
          else{
            scene.remove(scene_options.active);
          }

          if(scene_options.active.options.edges){
            scene.remove(scene_options.active.options.edges);
          }
          console.log(objects.splice(counter, 1));
        }
      })
      //scene.remove(scene_options.active);
      
    }
  }
};

///////////////////////////////////////////////////////// 
//// GUI
/////////////////////////////////////////////////////////
var gui = new dat.GUI();
var gui_value = new guiOptions();


//////////////////////
//// Scene Folder
//////////////////////
var scene_GUI = gui.addFolder('Scene Options');
    scene_GUI.addColor(gui_value,'bg_color');    
    scene_GUI.add(gui_value, 'lineWidth',1,10).step(1).listen();
    scene_GUI.add(gui_value, 'clickable');
    scene_GUI.add(gui_value,'exporter');
//////////////////////
//// Scene Actions
//////////////////////   
    for (var i in scene_GUI.__controllers) {
      scene_GUI.__controllers[i].onChange(function(value) {
        
        if(this.property == 'bg_color'){
          var color = new THREE.Color(value);
          renderer.setClearColor( color );
        }
        if(this.property == 'lineWidth'){

          grundriss_wire_holder.children.forEach(function(el){
            el.material.linewidth = value;
          });
          edges.material.linewidth = value;
        }
      });
    }
  scene_GUI.open();

//////////////////////
//// Camera Folder
//////////////////////

var camera_GUI = gui.addFolder('Camera Options');
    camera_GUI.add(gui_value, 'camera',[ 'Orbit','Orthographic', 'First Person']).listen();
    camera_GUI.add(gui_value, 'perspective',1,160).listen();
    camera_GUI.add(gui_value, 'movementSpeed',0,2000).step(20).listen();
    camera_GUI.add(gui_value, 'distance',0.2,2).step(.1).listen();

//////////////////////
//// Scene Actions
//////////////////////
    for (var i in camera_GUI.__controllers) {
      camera_GUI.__controllers[i].onChange(function(value) {
        
        switch(this.property){
          case 'distance':
            camera.left = -window.innerWidth * value;
            camera.right = window.innerWidth * value;
            camera.top = -window.innerWidth * value;
            camera.bottom = window.innerWidth * value;
            camera.updateProjectionMatrix();
          break;
        }
        if(this.property == 'perspective'){
            camera.fov = value;
            camera.updateProjectionMatrix();
          }
        console.log(this.property);
        if(this.property == 'camera'){

          if(value == 'Orbit'){
            controls.enabled = false;
            orbit_Controls();
          }
          else if(value == 'First Person'){
            camera.position.set(0,80,0);
            first_Controls();
          }
          else if(value == 'Orthographic'){
            ortho_Controls();
          }
        }
      });
    }


//////////////////////
//// Mesh Folder
//////////////////////
var mesh_GUI = gui.addFolder('Mesh Options');
    mesh_GUI.add(gui_value, 'type', [ 'Schrank','Grid', 'Box','Info', 'Arbeitsplatz' ]).listen();
    mesh_GUI.add(gui_value, 'x',-window.innerWidth,window.innerWidth).listen();
    mesh_GUI.add(gui_value, 'z',-window.innerWidth,window.innerWidth).listen();
    mesh_GUI.add(gui_value, 'rot',0,360).step(45).listen();
    
    mesh_GUI.add(gui_value,'grid_x',1,20).step(1).listen();
    mesh_GUI.add(gui_value,'grid_y',1,20).step(1).listen();

    mesh_GUI.add(gui_value,'bestand',["Allgemeines","Architektur","Bauingenieurwesen","Bildungswesen","Biologie","Chemie","Geographie","Geschichtswissen","Gestaltung","Informatik","Information","Kunstwissenschaft","Maschinenbau","Mathematik","Medizin","Naturwissenschaft","Pädagogik","Philosophie","Physik","Politologie","Psychologie","Rechtswissenschaft","Religionswissenschaft","Sozialpädagogik","Sozialwissenschaft","Sport, Freizeit","Sprache","Technik","Volkswirtschaft","Werkstoffkunde","Wissenschaftskunde","Zeitschriften"]).listen();
    mesh_GUI.add(gui_value, 'href').listen();
    mesh_GUI.add(gui_value, 'description').listen();
    mesh_GUI.add(gui_value,'add');
    mesh_GUI.add(gui_value,'delete');

//////////////////////
//// Mesh Actions
//////////////////////
    for (var i in mesh_GUI.__controllers) {
      mesh_GUI.__controllers[i].onChange(function(value) {
        if(scene_options.active){
          switch(this.property){
            case 'x':
              scene_options.active.position.x = value;
            break;

            case 'z':
              scene_options.active.position.z = value;
            break;

            case 'rot':
              if(scene_options.active.parent.type != 'Scene'){
                scene_options.active.parent.rotation.y = value * Math.PI/180;
              }
              else{
                scene_options.active.rotation.y = value * Math.PI/180;
              }
            break;
          }
        }
      });

      mesh_GUI.__controllers[i].onFinishChange(function(value) {

        if(scene_options.active){
          
          scene_options.active.options[this.property] = value;
        }
      });
    }
    mesh_GUI.open();

$('.close-button').click(function(){
  $('.dg.ac').toggleClass('active');
});

$('.dg.ac').bind({
  mouseenter : function(){
    controls.enabled = true;
    $('.open').removeClass('open');
  },
  mouseout : function(){
    controls.enabled = false;
  }
});



///////////////////////////////////////
/// Fire
///////////////////////////////////////

animate();




//////////////////////////////////////////////////
// SVG
//////////////////////////////////////////////////

var options = {
  amount: 2,
  bevelThickness: 0,
  bevelSize: 0,
  bevelSegments: 0,
  bevelEnabled: true,
  curveSegments: 0,
  steps: 1
};

var grundriss_options = {
  height : 50
}
var edges;
function drawShape(el) {
    var shape = transformSVGPathExposed(el.attr("d"));
    return shape;
}

function createMesh(geom) {
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    // create a multimaterial
    var mesh = new THREE.Mesh(geom,basic_wall_material);
    basic_wall_material.depthWrite = false;
    edges = new THREE.EdgesHelper( mesh, 0x000000 );
    edges.material.linewidth = gui.__folders['Scene Options'].__controllers[0].object.lineWidth;
    grundriss_wire_holder.add( edges );
    mesh.rotation.z = 90 * Math.PI/180;
    return [mesh];
}

var grundriss_holder = new THREE.Object3D();
var grundriss_wire_holder = new THREE.Object3D();
$(".st0").each(function(){
  shape = createMesh(new THREE.ExtrudeGeometry(drawShape($(this)), options));
  // add it to the scene.
  grundriss_holder.add(shape[0]);

});
  
  grundriss_holder.scale.set(2,2,grundriss_options.height);
  grundriss_holder.rotation.x = 90*Math.PI/180;
  grundriss_holder.position.y = grundriss_options.height*2 + 1;
  grundriss_holder.position.x = 600;
  grundriss_holder.position.z = -600;
  grundriss_holder.enableShadow = true;
  grundriss_holder.castShadow = true;

scene.add(grundriss_holder,grundriss_wire_holder);

/*var grid = {
  x : 50,
  y : 50,
  size : 20,
  margin:1.01
}

  var geometry = new THREE.BoxGeometry( grid.size, 2, grid.size );
for ( var j = 0; j < grid.y; j ++ ) {
  for ( var i = 0; i < grid.x; i ++ ) {

    var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0xffffff } ) );

    object.material.ambient = object.material.color;

    object.position.x = -((grid.x/2) * grid.size*grid.margin) + (i * grid.size*grid.margin);
    object.position.y = 0 ;
    object.position.z = -((grid.y/2) * grid.size*grid.margin) + (j * grid.size*grid.margin) ;

    object.castShadow = true;
    object.receiveShadow = true;
    object.options = object_options;
    scene.add( object );

    objects.push( object );

  }
}*/

var numPoints = 50;

var line_material = new THREE.LineBasicMaterial({
	color: 0x002C60,
	linewidth: 5,
	linecap:'round',
	linejoin: 'round'
});
/*
var line_material = new THREE.LineDashedMaterial({
	color: 0x002C60,
	linewidth : 5,
	scale:5,
	dashSize:10,
	gapSize:10
});
*/
var spline = new THREE.SplineCurve3([
	new THREE.Vector3(  0, 80, 10),
	new THREE.Vector3(  0, 80, 100),
	new THREE.Vector3(150, 80, 110),
	new THREE.Vector3(150, 80, 10),
	new THREE.Vector3(250, 80, 10),
	new THREE.Vector3(250, 80, 110)]);
var geometry = new THREE.Geometry();
var splinePoints = spline.getPoints(numPoints);

for (var i = 0; i < splinePoints.length; i++) {
	geometry.vertices.push(splinePoints[i]);
}

var line = new THREE.Line(geometry, line_material);
scene.add(line);

$.getJSON("scene/scene_1.json", function(json) {

json.forEach(function(el){

	add_new_Object(el);
});

console.log(objects);
	
	
   // console.log(json);
});

//////////////////////////////////////////
    //    Render Loop
//////////////////////////////////////////

function animate() {
  requestAnimationFrame( animate );
  render();

}

function render() {
  //
  if(gui_value.camera == 'Orbit' || gui_value.camera == 'Orthographic'){
  	controls.update();
  }
  else if(gui_value.camera == 'First Person'){
  	updateControls();
  }

  objects.forEach(function(el){
    //console.log(el.options.type);
    if(el.options.type ==="Info"){
      el.lookAt(camera.position);
    }
  })

  renderer.render( scene, camera );
}



