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