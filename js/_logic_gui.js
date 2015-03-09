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