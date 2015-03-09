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
  position : {
    vec : null,
    x:null,
    y:null,
    z:null
  },
  clickable : true,
  active_material : new THREE.MeshBasicMaterial({color:0x00ff00}),
  geometry: new THREE.BoxGeometry(10,10,10),
  extra : {
    href : 'http://www.google.de/',
    description : 'Dieser Gegenstand hat eine Beschreibung',
  }
}




  camera = new THREE.PerspectiveCamera( 15, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.set(0,800,1000);
//////////////////////////////////////////
    //    Controls
//////////////////////////////////////////
  controls = new THREE.OrbitControls( camera );
  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;
  controls.noZoom = false;
  controls.noPan = false;
  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;

  scene = new THREE.Scene();

  scene.add( new THREE.AmbientLight( 0x505050 ) );
//////////////////////////////////////////
    //    Light Setup
//////////////////////////////////////////
  

//////////////////////////////////////////
    //   Renderer
//////////////////////////////////////////




var light = new THREE.SpotLight( 0xffffff, 1.5 );
    light.position.set( 0, 1000, 2500 );
    light.castShadow = true;

    //light.shadowCameraNear = 500;
    //light.shadowCameraFar = camera.far;
    //light.shadowCameraFov = 50;
//
    //light.shadowBias = -0.00022;
    //light.shadowDarkness = 0.5;
//
    //light.shadowMapWidth = 2048;
    //light.shadowMapHeight = 2048;

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
    return;
  }

  var intersects = raycaster.intersectObjects( objects );

  if ( intersects.length > 0 ) {
    if ( INTERSECTED != intersects[ 0 ].object ) {
      if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );

      INTERSECTED = intersects[ 0 ].object;
      INTERSECTED.currentHex = INTERSECTED.material.color.getHex();

      plane.position.copy( INTERSECTED.position );
      plane.lookAt( camera.position );

    }

    document.body.style.cursor = 'pointer';

  } else {
    //reset Mesh to default 
    if ( INTERSECTED ){
      INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
    }
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
   

    
    down_Handler(SELECTED);
    document.body.style.cursor = 'move';
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
    SELECTED = null;
    up_Handler(SELECTED);
  }
  document.body.style.cursor = 'auto';
}

var meshMaterial = new THREE.MeshLambertMaterial({specular: 0xffffff, color: 0x444444, shininess: 0, metal: true});



var basic_material = new THREE.MeshLambertMaterial( { color: 0xffffff, opacity:1, transparent: false } );

var loader = new THREE.JSONLoader();

function add_new_Object(object_options){

  if(object_options.type == 'box'){
    //object_options.geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 5, 0 ) );
    var mesh = new THREE.Mesh(object_options.geometry,new THREE.MeshBasicMaterial({color:0xff0000}));
    mesh.position.y = 5;
    mesh.scale.set(1,10,1);
    objects.push(mesh);
    mesh.options = object_options;
    scene.add(mesh);
  }
  if(object_options.type == 'schrank'){
    object_options.geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 5, 0 ) );
    
    // load hirsch
    loader.load(
      // resource URL
      "model/hirsch.js",
      // Function when resource is loaded
      function ( geometry) {
        console.log(geometry);
        var mesh = new THREE.Mesh( geometry, basic_material );
            mesh.scale.set(20,20,20);
            mesh.position.set(0,0,0);
            objects.push(mesh);
            mesh.options = object_options;
        scene.add( mesh );
      }
    );
  }
  console.log(objects)
}


function down_Handler(SELECTED){
  updateGUI(SELECTED.options.controls);
  console.log(SELECTED.options.controls);
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
  this.message = 'text';
  this.scene = scene;
  this.x = 50;
  this.y = 50;
  this.scale = 1;
  this.displayOutline = false;
  this.href = 'http://www.google.de/';
  this.description = 'Dieser Gegenstand hat eine Beschreibung';
  this.type = 'schrank';
  //this.position
  this.clickable = true;
  this.geometry = '';//new THREE.BoxGeometry(10,10,10);
  this.Material = 'MeshLambertMaterial';
  this.export = function () {
    
      var exporter = new THREE.SceneExporter();

      var sceneJson = exporter.parse(this.scene);
      console.log(sceneJson);
      //localStorage.setItem('scene', sceneJson);
  };

  this.add = function(){
    console.log(gui_value.type);
    object_options.type = gui_value.type;
    object_options.controls = gui_value;
    add_new_Object(object_options);
    console.log("clicked");
  }
};

var gui = new dat.GUI();
var gui_value = new guiOptions();

var scene_GUI = gui.addFolder('Scene Options');
var options_clickable = scene_GUI.add(gui_value, 'clickable');
var options_x = scene_GUI.add(gui_value, 'x',0,100);
var options_y = scene_GUI.add(gui_value, 'y',0,100);
var options_scale = scene_GUI.add(gui_value, 'scale',0,10).step(1);
    scene_GUI.open();

var mesh_GUI = gui.addFolder('Mesh Options');

    mesh_GUI.add(gui_value, 'type', [ 'schrank', 'box', 'arbeitsplatz' ]);
    //f1.add(text, 'position');

    mesh_GUI.add(gui_value, 'Material', [ 'MeshBasicMaterial', 'MeshLambertMaterial', 'MeshPhongMaterial' ] );
    mesh_GUI.add(gui_value, 'href');
    mesh_GUI.add(gui_value, 'description');
    
    // Add Button
    mesh_GUI.add(gui_value,'add');
    mesh_GUI.add(gui_value,'export');
    //f1.add(text, 'extra');
    mesh_GUI.open();

$('.close-button').click(function(){
  $('.dg.ac').toggleClass('active');
});


function updateGUI(options){
  console.log(options)

  guiOptions.message = options.message;
  guiOptions.scene = options.scene;
  guiOptions.x = options.x;
  guiOptions.y = options.y;
  guiOptions.scale = options.scale;
  guiOptions.displayOutline = options.displayOutline;
  guiOptions.href = options.href;
  guiOptions.description = options.description;
  guiOptions.type = options.type;
 //guiOptionsuiis.position
  guiOptions.clickable = options.clickable;
  guiOptions.geometry = options.geometry;//new THREE.BoxGeometry(10,10,10);
  guiOptions.Material = options.Material;

  gui.add(options);
}



/*

message.onChange(function(value) {
  console.log(value);
  // Fires on every change, drag, keypress, etc.
});

message.onFinishChange(function(value) {
  // Fires when a controller loses focus.
 console.log(value);
});
*/

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
  bevelEnabled: false,
  curveSegments: 0,
  steps: 1
};

function drawShape(el) {
    var shape = transformSVGPathExposed(el.attr("d"));
    return shape;
}

function createMesh(geom) {
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    // create a multimaterial
    var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [basic_material]);
  
    mesh.rotation.z = 90 * Math.PI/180;
    return mesh;
}

var grundriss_holder = new THREE.Object3D();
$(".st0").each(function(){
  shape = createMesh(new THREE.ExtrudeGeometry(drawShape($(this)), options));
  // add it to the scene.
  grundriss_holder.add(shape);
});
  grundriss_holder.scale.set(2,2,50);
  grundriss_holder.rotation.x = 90*Math.PI/180;
  grundriss_holder.position.y = 100;
  grundriss_holder.position.x = 600;
  grundriss_holder.position.z = -600;
  grundriss_holder.enableShadow = true;
  grundriss_holder.castShadow = true;
scene.add(grundriss_holder);

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

var geometry = new THREE.PlaneGeometry( window.innerWidth,window.innerHeight, 32 );

var floor = new THREE.Mesh( geometry, basic_material );
		floor.rotation.x = 90 * Math.PI/180;
		floor.position.y = 1;
		floor.enableShadow = true;
		floor.castShadow = true;
scene.add( floor );


var geometry = new THREE.PlaneGeometry( window.innerWidth,window.innerHeight, 32 );
var material = new THREE.MeshBasicMaterial( {
  color: 0xffffff, 
  side: THREE.DoubleSide, 
  map : THREE.ImageUtils.loadTexture(
        "raumplan.png"
)});

var floor = new THREE.Mesh( geometry, material );
  floor.rotation.x = 90 * Math.PI/180;
floor.position.y = 0;
floor.enableShadow = true;
floor.castShadow = true;
scene.add( floor );

//////////////////////////////////////////
    //    Render Loop
//////////////////////////////////////////

function animate() {
  requestAnimationFrame( animate );
  render();

}

function render() {
  controls.update();
  renderer.render( scene, camera );
}



