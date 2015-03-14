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