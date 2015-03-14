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