var light = new THREE.SpotLight( 0xffffff, 1.5 );
    light.position.set( 0, 1000, 0 );
    light.castShadow = true;

    light.shadowCameraNear = 50;
    light.shadowCameraFar = camera.far;
    light.shadowCameraFov = 50;
    
    light.shadowBias = -0.00022;
    light.shadowDarkness = 0.5;
    
    light.shadowMapWidth = 2048;
    light.shadowMapHeight = 2048;

    scene.add( light );