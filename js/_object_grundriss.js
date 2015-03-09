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