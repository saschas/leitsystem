/*var vrHMD, vrSensor;
var vrHMD, vrSensor;

//navigator.mozGetVRDevices(vrDeviceCallback);
function vrDeviceCallback(vrdevs) {
  // First, find a HMD -- just use the first one we find
  for (var i = 0; i < vrdevs.length; ++i) {
    if (vrdevs[i] instanceof HMDVRDevice) {
      vrHMD = vrdevs[i];
      break;
    }
  }

  if (!vrHMD)
   return;

  // Then, find that HMD's position sensor
  for (var i = 0; i < vrdevs.length; ++i) {
    if (vrdevs[i] instanceof PositionSensorVRDevice &&
        vrdevs[i].hardwareUnitId == vrHMD.hardwareUnitId)
    {
      vrSensor = vrdevs[i];
      break;
    }
  }

  if (!vrHMD || !vrSensor) {
    alert("Didn't find a HMD and sensor!");
    return;
  }

  startRendering();
}

leftFOV = vrHMD.getCurrentEyeFieldOfView("left");
rightFOV = vrHMD.getCurrentEyeFieldOfView("right");

leftTranslation = vrHMD.getEyeTranslation("left");
rightTranslation = vrHMD.getEyeTranslation("right");


document.addEventListener("mozfullscreenchange", fullScreenChange, false);

renderer.domElement.mozRequestFullScreen({ vrDisplay: vrHMD });

var state = vrSensor.getState();
if (state.orientation) {
  //... use state.orientation.xyzw as a quaternion ...
}
if (state.position) {
  //... use state.position.xyz as position ...
}
*/
window.addEventListener("load", function() {
    if (navigator.getVRDevices) {
        navigator.getVRDevices().then(vrDeviceCallback);
    } else if (navigator.mozGetVRDevices) {
        navigator.mozGetVRDevices(vrDeviceCallback);
    }
}, false);

function vrDeviceCallback(vrdevs) {
    for (var i = 0; i < vrdevs.length; ++i) {
        if (vrdevs[i] instanceof HMDVRDevice) {
            vrHMD = vrdevs[i];
            break;
        }
    }
    for (var i = 0; i < vrdevs.length; ++i) {
        if (vrdevs[i] instanceof PositionSensorVRDevice &&
            vrdevs[i].hardwareUnitId == vrHMD.hardwareUnitId) {
            vrHMDSensor = vrdevs[i];
            break;
        }
    }
    initScene();
    initRenderer();
    render();
}

var renderer = new THREE.WebGLRenderer();
var vrrenderer = new THREE.VRRenderer(renderer, vrHMD);

window.addEventListener("keypress", function(e) {
    if (e.charCode == 'f'.charCodeAt(0)) {
        if (renderCanvas.mozRequestFullScreen) {
            renderCanvas.mozRequestFullScreen({
                vrDisplay: vrHMD
            });
        } else if (renderCanvas.webkitRequestFullscreen) {
            renderCanvas.webkitRequestFullscreen({
                vrDisplay: vrHMD,
            });
        }
    }
}, false);


var state = vrHMDSensor.getState();
    camera.quaternion.set(state.orientation.x, 
                          state.orientation.y, 
                          state.orientation.z, 
                          state.orientation.w);
    vrrenderer.render(scene, camera);
