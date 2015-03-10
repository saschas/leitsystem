var guiOptions = function() {
  this.message = 'text';
  this.scene = scene;
  this.x = 50;
  this.z = 50;
  this.rot = 0;
  this.scale = 1;
  this.displayOutline = false;
  this.href = 'http://www.google.de/';
  this.description = 'Dieser Gegenstand hat eine Beschreibung';
  this.type = 'schrank';
  //this.position
  this.clickable = true;
  this.geometry = '';//new THREE.BoxGeometry(10,10,10);
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
var options_clickable = scene_GUI.add(gui_value, 'clickable');
var options_scale = scene_GUI.add(gui_value, 'scale',0,10).step(1);
    scene_GUI.open();



var mesh_GUI = gui.addFolder('Mesh Options');
    mesh_GUI.add(gui_value, 'x',-window.innerWidth,window.innerWidth).listen();
    mesh_GUI.add(gui_value, 'z',-window.innerWidth,window.innerWidth).listen();
    mesh_GUI.add(gui_value, 'rot',0,360).step(45).listen();
    mesh_GUI.add(gui_value, 'type', [ 'schrank', 'box', 'arbeitsplatz' ]).listen();
    mesh_GUI.add(gui_value, 'Material', [ 'MeshBasicMaterial', 'MeshLambertMaterial', 'MeshPhongMaterial' ] ).listen();
    mesh_GUI.add(gui_value, 'href').listen();
    mesh_GUI.add(gui_value, 'description').listen();

    // Add Button
    mesh_GUI.add(gui_value,'add');
    mesh_GUI.add(gui_value,'export');


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