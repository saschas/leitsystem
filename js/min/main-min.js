var container, stats;
var camera, controls, scene, renderer;
var objects = [], plane;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(),
offset = new THREE.Vector3(),
INTERSECTED, SELECTED;


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


camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100000 );
camera.position.set(0,10,1000);



////////////////////////////////////////
  //    Controls
////////////////////////////////////////
//controls = new THREE.FirstPersonControls( camera);
//controls.movementSpeed = 70;
//controls.lookSpeed = 0.05;
//controls.enabled = true;
//controls.movementSpeed = 1.0;
//controls.lookSpeed = 0.005;

controls = new THREE.OrbitControls( camera );
controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;
controls.noZoom = false;
controls.noPan = false;
controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;

//
scene = new THREE.Scene();
scene.add( new THREE.AmbientLight( 0x505050 ) );


var scene_options = {
  
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

renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setClearColor( 0xf0f0f0 );
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

function add_mesh_hirsch(object_options){
  object_options.geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 5, 0 ) );

  // load hirsch
  loader.load(
    // resource URL
    "model/hirsch.js",
    // Function when resource is loaded
    function ( geometry) {
          hirsch = new THREE.Mesh( geometry, basic_material );
          hirsch.scale.set(20,20,20);
          hirsch.position.set(0,0,0);
          //make it movable
          objects.push(hirsch);
          hirsch.options = {
            type : gui.__folders['Mesh Options'].__controllers[0].object.type,
            material : gui.__folders['Mesh Options'].__controllers[1].object.Material,
            href : gui.__folders['Mesh Options'].__controllers[2].object.href,
            description : gui.__folders['Mesh Options'].__controllers[3].object.description
          };
      var edges = new THREE.EdgesHelper( hirsch, 0x000000 );
          edges.material.linewidth = 2;
          scene.add( edges );
      scene.add( hirsch );
    }
  );
}

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

    var intersects = raycaster.intersectObject( plane );
    SELECTED.position.copy( intersects[ 0 ].point.sub( offset ) );
    //prevent object from fly
    SELECTED.position.y = 0;

    move_Handler(SELECTED);
    gui_value.x = SELECTED.position.x;
    gui_value.z = SELECTED.position.z;
    gui_value.rot = SELECTED.rotation.y;
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
function onDocumentMouseDown( event ) {

  event.preventDefault();

  var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 ).unproject( camera );
  var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
  var intersects = raycaster.intersectObjects( objects );

  if ( intersects.length > 0 ) {

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
  controls.enabled = true;
  if ( INTERSECTED ) {
    plane.position.copy( INTERSECTED.position );
    
    up_Handler(SELECTED);
  
  }
  SELECTED = null;
  document.body.style.cursor = 'auto';
}

var loader = new THREE.JSONLoader();

function add_new_Object(object_options){

  if(object_options.type == 'Box'){
    add_mesh_box(object_options);   
  }
  if(object_options.type == 'Schrank'){
    add_mesh_hirsch(object_options); 
  }
  if(object_options.type == 'Info'){

    console.log('Info');
    add_mesh_info(object_options); 
  }
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

var guiOptions = function() {

  this.clickable = true;
  this.camera = 'Orbit';
  this.lineWidth = 1;
  this.scene = scene;


  ///////////////////////////////////////////////////////// 
  //// Mesh OPTIONs
  /////////////////////////////////////////////////////////
  this.x = 50;
  this.z = 50;
  this.rot = 0;
  this.displayOutline = false;
  this.href = 'link';
  this.description = 'Beschreibungstext';
  this.type = 'Schrank';

  this.Material = 'MeshLambertMaterial';

  this.add = function(){
    object_options.type = gui_value.type;
    object_options.controls = gui_value;
    add_new_Object(object_options);
  }
  this.export = function () {
      var exporter = new THREE.SceneExporter();
      var sceneJson = exporter.parse(this.scene);
     // console.log(sceneJson);
      //localStorage.setItem('scene', sceneJson);
  };
};

var gui = new dat.GUI();
var gui_value = new guiOptions();

var scene_GUI = gui.addFolder('Scene Options');
    scene_GUI.add(gui_value, 'camera',[ 'Orbit', 'First Person']).listen();
    scene_GUI.add(gui_value, 'clickable');
    scene_GUI.add(gui_value,'export');
    scene_GUI.add(gui_value, 'lineWidth',1,10).listen();
    for (var i in scene_GUI.__controllers) {
      scene_GUI.__controllers[i].onChange(function(value) {
        if(this.property == 'camera'){
          if(value == 'Orbit'){

          }
          else if(value == 'First Person'){
            
          }
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

var mesh_GUI = gui.addFolder('Mesh Options');
    mesh_GUI.add(gui_value, 'type', [ 'Schrank', 'Box','Info', 'Arbeitsplatz' ]).listen();
    mesh_GUI.add(gui_value, 'Material', [ 'MeshBasicMaterial', 'MeshLambertMaterial', 'MeshPhongMaterial' ] ).listen();
    mesh_GUI.add(gui_value, 'x',-window.innerWidth,window.innerWidth).listen();
    mesh_GUI.add(gui_value, 'z',-window.innerWidth,window.innerWidth).listen();
    mesh_GUI.add(gui_value, 'rot',0,360).step(45).listen();
    mesh_GUI.add(gui_value, 'href').listen();
    mesh_GUI.add(gui_value, 'description').listen();

    // Add Button
    mesh_GUI.add(gui_value,'add');

    for (var i in mesh_GUI.__controllers) {
      mesh_GUI.__controllers[i].onChange(function(value) {
        if(scene_options.active){
          if(this.property == 'x'){
            scene_options.active.position.x = value;
          }
          if(this.property == 'z'){
            scene_options.active.position.z = value;
          }
          if(this.property == 'rot'){
            scene_options.active.rotation.y = value * Math.PI/180;
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
var edges;
function drawShape(el) {
    var shape = transformSVGPathExposed(el.attr("d"));
    return shape;
}

function createMesh(geom) {
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    // create a multimaterial
    var mesh = new THREE.Mesh(geom,basic_material);
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
  
  grundriss_holder.scale.set(2,2,50);
  grundriss_holder.rotation.x = 90*Math.PI/180;
  grundriss_holder.position.y = 100;
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

/*var geometry = new THREE.PlaneGeometry( window.innerWidth,window.innerHeight, 32 );

var floor = new THREE.Mesh( geometry, basic_material );
		floor.rotation.x = 90 * Math.PI/180;
		floor.position.y = 1;
		floor.enableShadow = true;
		floor.castShadow = true;
scene.add( floor );

*/


var geometry = new THREE.PlaneGeometry( 760,760, 32 );
var material = new THREE.MeshLambertMaterial( {
  color: 0x222222, 
  side: THREE.DoubleSide,
  shineness: .01,
  specular: .1
  //map : THREE.ImageUtils.loadTexture("raumplan.png")
	
	}
);

var floor = new THREE.Mesh( geometry, material );
  floor.rotation.x = 90 * Math.PI/180;
floor.position.x = -15;
floor.position.z = 15;
floor.scale.set(1.5,1.5,1.5);
floor.enableShadow = true;
floor.castShadow = true;
scene.add( floor );

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
	new THREE.Vector3(  0, 5, 10),
	new THREE.Vector3(  0, 5, 100),
	new THREE.Vector3(150, 5, 110),
	new THREE.Vector3(150, 5, 10),
	new THREE.Vector3(250, 5, 10),
	new THREE.Vector3(250, 5, 110)]);
var geometry = new THREE.Geometry();
var splinePoints = spline.getPoints(numPoints);

for (var i = 0; i < splinePoints.length; i++) {
	geometry.vertices.push(splinePoints[i]);
}

var line = new THREE.Line(geometry, line_material);
scene.add(line);

//////////////////////////////////////////
    //    Render Loop
//////////////////////////////////////////

function animate() {
  requestAnimationFrame( animate );
  render();

}

function render() {
  controls.update();
  if(info_schild){
  	info_schild.lookAt(camera.position);
  }
  renderer.render( scene, camera );
}



