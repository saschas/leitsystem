var container, stats;
var camera, controls, scene, renderer;
var objects = [], plane;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(),
offset = new THREE.Vector3(),
INTERSECTED, SELECTED;


/////////////////
/// Output Options
/////////////////
var output = {
  size : {
    x : 1,
    y : 1
  }
}
///////////////////////////////////////
//// Object Setup
///////////////////////////////////////
var object_options = {
  type : null,
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

///////////////////////////////////////
/// Fire
///////////////////////////////////////
init();
animate();

///////////////////////////////////////
////  Init
///////////////////////////////////////
function init() {

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
  var light = new THREE.SpotLight( 0xffffff, 1.5 );
  light.position.set( 0, 1000, 2500 );
  light.castShadow = true;

  light.shadowCameraNear = 500;
  light.shadowCameraFar = camera.far;
  light.shadowCameraFov = 50;

  light.shadowBias = -0.00022;
  light.shadowDarkness = 0.5;

  light.shadowMapWidth = 2048;
  light.shadowMapHeight = 2048;

  scene.add( light );

//////////////////////////////////////////
    //    Geometry
//////////////////////////////////////////
var grid = {
  x : 50,
  y : 50,
  size : 20,
  margin:1.01
}
/*
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
}
*/
//////////////////////////////////////////
    //    Plane
//////////////////////////////////////////
  plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry( 2000, 2000, 8, 8 ),
    new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0.25, transparent: true } )
  );
  plane.visible = false;
  scene.add( plane );


//////////////////////////////////////////
    //   Renderer
//////////////////////////////////////////
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setClearColor( 0xf0f0f0 );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight);
  renderer.sortObjects = false;

  renderer.shadowMapEnabled = true;
  renderer.shadowMapType = THREE.PCFShadowMap;

  document.body.appendChild( renderer.domElement );

//////////////////////////////////////////
    //    Event Listener
//////////////////////////////////////////
  renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
  renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
  renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );
  renderer.domElement.addEventListener("contextmenu", onContextMenu);
  //Resize

  window.addEventListener( 'resize', onWindowResize, false );
}

function cuber(x,y){

}


//////////////////////////////////////////
    //    Floor Geometry
//////////////////////////////////////////

var geometry = new THREE.PlaneGeometry( window.innerWidth,window.innerHeight, 32 );
var material = new THREE.MeshBasicMaterial( {
  color: 0xffffff, 
  side: THREE.DoubleSide, 
  map : THREE.ImageUtils.loadTexture(
        "raumplan.png"
)});

var floor = new THREE.Mesh( geometry, material );
  floor.rotation.x = 90 * Math.PI/180;
floor.position.y = 5;
floor.receiveShadow = true;
scene.add( floor );
//////////////////////////////////////////
    //    Event Handler
//////////////////////////////////////////

function onContextMenu(e){
  eX = e.pageX;
  eY = e.pageY;
}
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
        var material = new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0.25, transparent: true } );
        var mesh = new THREE.Mesh( geometry, material );
            mesh.scale.set(20,20,20);
            mesh.position.set(0,0,0);
            objects.push(mesh);
            mesh.options = object_options;
        scene.add( mesh );
      }
    );
  }
}

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

var meshMaterial = new THREE.MeshPhongMaterial({specular: 0xffffff, color: 0x444444, shininess: 100, metal: true});
function createMesh(geom) {
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    // create a multimaterial
    var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial]);
  
    mesh.rotation.z = 90 * Math.PI/180;
    return mesh;
}

var grundriss_holder = new THREE.Object3D();
$(".st0").each(function(){
  shape = createMesh(new THREE.ExtrudeGeometry(drawShape($(this)), options));
  // add it to the scene.
  grundriss_holder.add(shape);
});
grundriss_holder.scale.set(2,2,20);
grundriss_holder.rotation.x = 90*Math.PI/180;
grundriss_holder.position.y = 50;
grundriss_holder.position.x = 600;
grundriss_holder.position.z = -600;
scene.add(grundriss_holder);

//shape.position.y = 50;

//////////////////////////////////////////////////
 // Menu
//////////////////////////////////////////////////
$('.item').click(function(){

  var type = $(this).attr('data-type');
  console.log(type);
 
  if(type=='box'){
    object_options.type = type;
  }
  if(type=='schrank'){
    object_options.type = type;
  }

  if(type=='export'){
    console.log('All Objects = objects',objects);
  }
  else{
    add_new_Object(object_options);
  }
  
});

$('canvas').bind({
  mouseenter : function(){
    controls.enabled = true;
    $('.open').removeClass('open');
  },
  mouseout : function(){
    controls.enabled = false;
  }
})

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
    $('.object-menu').addClass('open').css({
      transform : 'translateX('+event.pageX+'px) translateY('+event.pageY+'px)'
    })
    intersects[0].object.material.color.r = 1;
    console.log(SELECTED.options);

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
  }
  document.body.style.cursor = 'auto';
}

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





/*
var objects = [], plane;

      var raycaster = new THREE.Raycaster();
      var mouse = new THREE.Vector2(),
      offset = new THREE.Vector3(),
      INTERSECTED, SELECTED;


///////////////////////////
// clear AnimationFrame
//////////////////////////
if (!window.cancelAnimationFrame)
  window.cancelAnimationFrame = function (id) {
    clearTimeout(id);
  };
///////////////////////////////////////////////
// Animation
// update Function
///////////////////////////////////////////////
var $loop;
var objects = [];
function update() {
  $loop = requestAnimationFrame(update);
  return $loop; //returns loop for canceling
};
 
///////////////////////////////////////////////
var main_color = 0x222222;
var canvas_height = window.innerHeight;
var canvas_width = window.innerWidth;
//////////////////////////////////////////
    //   Scene
//////////////////////////////////////////
var scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2( main_color, 0.0025 );

//////////////////////////////////////////
    //   Camera
//////////////////////////////////////////
var camera = new THREE.PerspectiveCamera( 75, canvas_width/canvas_height, 0.1, 1000 );
    camera.lookAt(new THREE.Vector3(0,0,0));
    camera.position.set(0,150,400);
//////////////////////////////////////////
    //   Renderer
//////////////////////////////////////////
var renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize( canvas_width*.9, canvas_height*.9 );
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFSoftShadowMap;
    renderer.setClearColor(main_color,1);
    renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
    renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
    renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );
$('body').append( renderer.domElement );

/////////////////////////////////
//		init domEvents
/////////////////////////////////
var projector = new THREE.Projector();
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

//////////////////////////////////////////
    //   Resize
//////////////////////////////////////////
window.onresize = function(){
  canvas_height = window.innerHeight;
  canvas_width = window.innerWidth;
  camera.aspect = canvas_width*.9 / canvas_height*.9;
  camera.updateProjectionMatrix();
  renderer.setSize( canvas_width*.9, canvas_height*.9 );
}
//////////////////////////////////////////
    //   Controls
//////////////////////////////////////////
  controls = new THREE.OrbitControls( camera );
  controls.damping = 0.2;
  //controls.maxPolarAngle = Math.PI/2;
  //controls.minPolarAngle = 1;
  controls.minDistance = 450;
  controls.maxDistance = 450;
  controls.enabled = true;
//////////////////////////////////////////
    //    Light Setup
//////////////////////////////////////////
var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set( 0, 500, 0 );
    spotLight.intensity = 1;
    spotLight.castShadow = true;
    scene.add(spotLight);

var r = 1,
    g = 1,
    b = 1,
    intensity = .2;
var ambient = new THREE.AmbientLight({
  color:0xffffff,
	intensity: .5
});
ambient.color.setRGB( r * intensity, g * intensity, b * intensity );
scene.add(ambient);
//////////////////////////////////////////
    //    Materials
//////////////////////////////////////////
var floor_material = new THREE.MeshBasicMaterial( {
  color: 0xffffff,
  side: THREE.DoubleSide
});
var cube_material = new THREE.MeshLambertMaterial( {
  color: 0xffffff,
  opacity:1,
  transparent:true
});
var active_material = new THREE.MeshBasicMaterial( {
  color: 0xff0000,
  side: THREE.DoubleSide
});
var click_material = new THREE.MeshBasicMaterial( {
  color: 0xff0ff,
  side: THREE.DoubleSide
});

//////////////////////////////////////////
    //   Sphere Geometry
//////////////////////////////////////////
var cube_options = {
  x : 30,
  y : 30,
  z : 30
}
var cube_geometry = new THREE.BoxGeometry( cube_options.x ,cube_options.y, cube_options.z );

var cube_fac = window.innerWidth;
var cube_scale = .6;
var cube_width = 18;
var cube_count = 50;
var cube_holder = new THREE.Object3D();
var cube = new THREE.Mesh( cube_geometry, cube_material );
for(var j=0;j<cube_count;j++){
  for(var i=0;i<cube_count;i++){
    var x = (-cube_count*cube_width)/2 + j * cube_width;
    var z = (-cube_count*cube_width)/2 + i * cube_width;
    cube  = cube.clone();
    cube.scale.set(cube_scale,.01,cube_scale);
		cube.position.x = x;
    cube.position.z = z;
    scene.add(cube);
    objects.push( cube );
  }
}
cube_holder.receiveShadow = true;
cube_holder.castShadow = true;

scene.add( cube_holder );


//////////////////////////////////////////
 //    Floor Geometry
//////////////////////////////////////////
var geometry = new THREE.PlaneGeometry( canvas_width * 4,canvas_height*4, 32 );
var floor = new THREE.Mesh( geometry, floor_material );
		floor.rotation.x = 90 * Math.PI/180;
    floor.position.y = -5;
    floor.receiveShadow = true;
		scene.add( floor );

//////////////////////////////////////////
//   Render
//////////////////////////////////////////
var render = function () { 
  render_loop = requestAnimationFrame( render );	
  animation();
  renderer.render(scene, camera);
  return render_loop;
};
render();
//////////////////////////////////////////
    //    Animation
//////////////////////////////////////////
var data_count = 0;
var global_count = 0;

function animation(){
 
}

/*
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function getIntersectionObjects(eX,eY,camera,objects){
  var intersecting_objects = [];
  var not_intersecting_objects = [];
var x = eX,
    y = eY,
    z = 0.5;
var mouse3D = new THREE.Vector3(x,y,z);  
projector.unprojectVector( mouse3D, camera );   
mouse3D.sub( camera.position );                
mouse3D.normalize();
  
var raycaster = new THREE.Raycaster( camera.position, mouse3D );
  raycaster.ray.origin = camera.position;
  raycaster.ray.direction = mouse3D;
var intersects = raycaster.intersectObjects( objects );
// Change color if hit block
  if ( intersects.length > 0 ) {
    
    intersecting_objects.push(intersects[ 0 ].object);
  }
  console.log(intersecting_objects);
  return intersecting_objects;
}

var new_Cube = {
  x : 0,
  y : 0,
  z : 0,
  vec : null
}
var user_mouse = {
  down : false,
  move : false
}*/
/*
$('canvas').bind({
  mousemove : function(e){
    user_mouse.move = true;
    var eX = e.clientX,
      	eY = e.clientY;
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1,
		mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    var selected = getIntersectionObjects(mouse.x,mouse.y,camera,objects);
    objects.forEach(function(i){
      i.material = cube_material;
    })
    selected[0].material = active_material;
  },
  mousedown :function(){
    user_mouse.down = true;
  },
  mouseup : function(){
    user_mouse.down = false;
  }
  click : function(e){
    var eX = e.clientX,
      	eY = e.clientY;
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1,
		mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    var selected = getIntersectionObjects(mouse.x,mouse.y,camera,objects);
    
    $('.add_menu').toggleClass('active').css({
      transform:'translateX(' + eX +'px) translateY('+eY+'px)'
    });
    selected[0].material = click_material;
    console.log(selected[0].position);
    new_Cube.vec = selected[0].position
    
  }
});

$('.item').click(function(){
  cuber(new_Cube.vec);
});


var object_options = {
  type : null,
  position : {
    vec : null,
    x:null,
    y:null,
    z:null
  },
  clickable : true,
  material: new THREE.MeshBasicMaterial({color:0xff0000}),
  active_material : new THREE.MeshBasicMaterial({color:0x00ff00}),
  geometry: function(element){
    var geometry = new THREE.BoxGeometry(10,10,10);
    return geometry;
  },
  extra : {
    href : 'http://www.google.de/',
    description : 'Dieser Gegenstand hat eine Beschreibung',

  }
}

function add_new_Object(obj){
  var mesh = new THREE.Mesh(object_options.geometry,object_options.material);
  scene.append(mesh);
}

////////////////////////////////////////////////////
///   SVG
////////////////////////////////////////////////////
var options = {
  amount: 2,
  bevelThickness: 2,
  bevelSize: 0.5,
  bevelSegments: 3,
  bevelEnabled: true,
  curveSegments: 12,
  steps: 1
};

var transformSVGPathExposed;
transformSVGPathExposed = transformSVGPath;
function drawShape() {
    var shape = transformSVGPathExposed($("#grundriss").attr("d"));
    return shape;
}
function createMesh(geom) {

    geom.applyMatrix(new THREE.Matrix4().makeTranslation(-390, -74, 0));


    var meshMaterial = new THREE.MeshPhongMaterial({specular: 0xffffff, color: 0x444444, shininess: 100, metal: true});

    // create a multimaterial
    var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial]);
    mesh.scale.x = 0.1;
    mesh.scale.y = 0.1;
    mesh.rotation.z = Math.PI;
    mesh.rotation.x = -1.1;
    return mesh;
}
shape = createMesh(new THREE.ExtrudeGeometry(drawShape(), options));
// add it to the scene.
scene.add(shape);
shape.position.y = 50;



function cuber(pos){
var cube = new THREE.Mesh( cube_geometry, cube_material );
    cube.scale.set(cube_scale,.5,cube_scale);
  	cube.position.x = pos.x;
    cube.position.y = pos.y;
    cube.position.z = pos.z;
    scene.add(cube);
    objects.push( cube );
  scene.add(cube);
}





////////////////////////////////////////////////////
///   Draggable
////////////////////////////////////////////////////




var container = document.getElementById('c');
function onDocumentMouseMove( event ) {

        event.preventDefault();

        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        //

        raycaster.setFromCamera( mouse, camera );

        if ( SELECTED ) {

          var intersects = raycaster.intersectObject( plane );
          SELECTED.position.copy( intersects[ 0 ].point.sub( offset ) );
          return;

        }

        var intersects = raycaster.intersectObjects( objects );

        if ( intersects.length > 0 ) {

          if ( INTERSECTED != intersects[ 0 ].object ) {

            if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );

            INTERSECTED = intersects[ 0 ].object;
            INTERSECTED.currentHex = INTERSECTED.material.color.getHex();

          }

          container.style.cursor = 'pointer';

        } else {

          if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );

          INTERSECTED = null;

          container.style.cursor = 'auto';

        }

      }

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

          container.style.cursor = 'move';

        }

      }

      function onDocumentMouseUp( event ) {

        event.preventDefault();

        controls.enabled = true;

        if ( INTERSECTED ) {

          SELECTED = null;

        }

        container.style.cursor = 'auto';

      }

      */