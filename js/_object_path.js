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
	new THREE.Vector3(  0, 80, 10),
	new THREE.Vector3(  0, 80, 100),
	new THREE.Vector3(150, 80, 110),
	new THREE.Vector3(150, 80, 10),
	new THREE.Vector3(250, 80, 10),
	new THREE.Vector3(250, 80, 110)]);
var geometry = new THREE.Geometry();
var splinePoints = spline.getPoints(numPoints);

for (var i = 0; i < splinePoints.length; i++) {
	geometry.vertices.push(splinePoints[i]);
}

var line = new THREE.Line(geometry, line_material);
scene.add(line);