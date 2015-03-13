var container, stats;
var camera, controls, scene, renderer;



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

function add_Options(el,optional_edges){

  el.options = {
      bestand : gui.__folders['Mesh Options'].__controllers[0].object.bestand,
      type : gui.__folders['Mesh Options'].__controllers[1].object.type,
      href : gui.__folders['Mesh Options'].__controllers[3].object.href,
      description : gui.__folders['Mesh Options'].__controllers[4].object.description
  };
  if(optional_edges){
  	el.options.edges = optional_edges;
  }
}