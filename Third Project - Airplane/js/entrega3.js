/*Global Variables*/
var scene, renderer;
var wireframe, geometry, mesh;

var camera;
var aspect = window.innerWidth/window.innerHeight;
var plane;

var sun;
var sunHelper;
var sunFlag = 0;

var helpers = [];
var cones = [];
var spheres = [];

var spotLights = [];
var spotLight1Active = false;
var spotLight2Active = false;
var spotLight3Active = false;
var spotLight4Active = false;

var keyL = false;
var lambertUsed = false;

/*Arrow Flags*/
var upPressed = false;
var downPressed = false;
var rightPressed = false;
var leftPressed = false;

/*--------------------------CREATE PLANE---------------------------*/
function createPlane(){
    'use strict';
    plane = new Plane(0,0,0);

    scene.add(plane);
}
/*--------------------------CREATE LAMP----------------------------*/

function createLamp(x,y,z,i){
    'use strict';
    var geometry = new THREE.ConeBufferGeometry( 5, 5, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0x999999, wireframe: true} );
    cones[i] = new THREE.Mesh( geometry, material );
    cones[i].position.set(x,y,z);
    var geometry = new THREE.SphereGeometry(2, 10, 10);
    var materialbulb = new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe: true} );
    spheres[i] = new THREE.Mesh( geometry, materialbulb);
    if(i==0){
        var sphereX = x+2;
        var sphereY = y-2;
        var sphereZ = z+1;
    }
    if(i==1){
        var sphereX = x+2;
        var sphereY = y-2;
        var sphereZ = z-1;
    }
    if(i==2){
        var sphereX = x-2;
        var sphereY = y-2;
        var sphereZ = z-1;
    }if(i==3){
        var sphereX = x-2;
        var sphereY = y-2;
        var sphereZ = z+1;
    }
    spheres[i].position.set(sphereX,sphereY,sphereZ);
}
/*------------------------CREATE SPOTLIGHTS-------------------------*/
function createSpotlights(){
    'use strict';
    for (var spotLightNumber = 0; spotLightNumber < 4; spotLightNumber++){
        spotLights[spotLightNumber] = new THREE.SpotLight( 0xffffff, 0 );
        if(spotLightNumber == 0){
            spotLights[spotLightNumber].position.set( -40, 40, -40 );
            createLamp(-40, 40, -40, 0);
            cones[0].rotation.x = -Math.PI/3;
            cones[0].rotation.z = Math.PI/3;
        }
       if(spotLightNumber == 1){
              spotLights[spotLightNumber].position.set( -40, 40, 60 );
              createLamp(-40, 40, 60, 1);
              cones[1].rotation.x = Math.PI/3;
              cones[1].rotation.z = Math.PI/3;
       }
       if(spotLightNumber == 2){
              spotLights[spotLightNumber].position.set( 40, 40, 60 );
              createLamp(40, 40, 60 ,2);
              cones[2].rotation.x = Math.PI/3;
              cones[2].rotation.z = -Math.PI/3;
       }
       if(spotLightNumber == 3){
              spotLights[spotLightNumber].position.set( 40, 40, -40 );
              createLamp(40, 40, -40, 3);
              cones[3].rotation.x = -Math.PI/3;
              cones[3].rotation.z = -Math.PI/3
       }
       spotLights[spotLightNumber].castShadow = true;
       spotLights[spotLightNumber].angle = Math.PI / 3;
       spotLights[spotLightNumber].penumbra = 0.1;
       spotLights[spotLightNumber].distance = 100;

       scene.add(spotLights[spotLightNumber]);
    }
}
/*-------------------------CREATE SUNLIGHT------------------------*/
function createSunLight(){
    'use strict';
    sunFlag = 1;
    sun = new THREE.DirectionalLight( 0xffffff, 1);
    sun.position.set(30,70,10);
    //sun.target.position.set(-window.innerWidth/2,-window.innerHeight/2,0);
    //sun.target.updateMatrixWorld();

    scene.add(sun);

    sunHelper = new THREE.DirectionalLightHelper(sun,10);
    scene.add(sunHelper);
}
/*-----------------------CHANGE MATERIAL TO BASIC/PHONG------------*/
function changeKeyL(){
    'use strict';
    if(keyL == false)
      lambertUsed = plane.changeMaterial_KeyL('Basic', lambertUsed);

    else
      lambertUsed = plane.changeMaterial_KeyL('', lambertUsed);

}
/*--------------------------CHANGE SHADING-------------------------*/
function changeKeyG(){
    'use strict';
    plane.changeMaterial_KeyG(lambertUsed);
}
/*--------------------------ROTATE PLANE---------------------------*/
function rotatePlane(){
    'use strict';
    if(upPressed)
        plane.rotatePlane('x', 1);

    if(downPressed)
         plane.rotatePlane('x', -1);

    if(rightPressed)
        plane.rotatePlane('y', -1);

    if(leftPressed)
         plane.rotatePlane('y', 1);
}
/*--------------------------CREATE SCENE---------------------------*/
function createScene() {
    'use strict';
    scene = new THREE.Scene();
    //scene.add(new THREE.AxesHelper(50));

    createSpotlights();
    createSunLight();

    createPlane();
}
/*--------------------------CREATE CAMERA--------------------------*/
function createCamera(){
    'use strict'
    camera = new THREE.PerspectiveCamera(45, aspect , 1, 1000);

    camera.position.x = 100;
    camera.position.y = 100;
    camera.position.z = 100;

    camera.lookAt(scene.position);
}
/*-----------------------------RESIZE------------------------------*/
function onResize(){
    'use strict';
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (window.innerHeight > 0 && window.innerWidth > 0) {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
    }
}
/*------------------------------KEY DOWN---------------------------*/
function onKeyDown(e) {
    'use strict';
    switch (e.keyCode){
        case 69:  //E
        case 101: //e
            scene.traverse(function (node) {
            if (node instanceof THREE.AxesHelper) {
                node.visible = !node.visible;}
            });
            break;
        case 65: //A
        case 97: //a
            wireframe = !wireframe;
            plane.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                 node.material.wireframe = wireframe;}
            });
            break;
        case 78://N
        case 110: //n
           if(sunFlag == 1){
                sun.intensity = 0;
                sunFlag = 0;
                scene.remove(sunHelper);
            }
            else{
                sun.intensity = 1;
                sunFlag = 1;
                scene.add(sunHelper);
            }
            break;
        case 76://L
        case 108: //l
            changeKeyL();
            keyL = !keyL;
            break;
        case 71://G
        case 103: //g
            changeKeyG();
            lambertUsed = !lambertUsed;
            break;
        case 49: //1
            if(spotLight1Active == false){
                spotLights[0].intensity = 2;
                helpers[0] = new THREE.DirectionalLightHelper(spotLights[0],5);
                scene.add(helpers[0]);
                scene.add(cones[0]);
                scene.add(spheres[0]);
            }
            else{
                spotLights[0].intensity = 0;
                scene.remove(helpers[0]);
                scene.remove(cones[0]);
                scene.remove(spheres[0]);

            }
            spotLight1Active = !spotLight1Active;
            break;
        case 50: //2
            if(spotLight2Active == false){
                spotLights[1].intensity = 2;
                helpers[1] = new THREE.DirectionalLightHelper(spotLights[1],5);
                scene.add(helpers[1]);
                scene.add(cones[1]);
                scene.add(spheres[1]);
            }
            else{
                spotLights[1].intensity = 0;
                scene.remove(helpers[1]);
                scene.remove(cones[1]);
                scene.remove(spheres[1]);

            }
            spotLight2Active = !spotLight2Active;
            break;
        case 51: //3
            if(spotLight3Active == false){
                spotLights[2].intensity = 2;
                helpers[2] = new THREE.DirectionalLightHelper(spotLights[2],5);
                scene.add(helpers[2]);
                scene.add(cones[2]);
                scene.add(spheres[2]);
            }
            else{
                spotLights[2].intensity = 0;
                scene.remove(helpers[2]);
                scene.remove(cones[2]);
                scene.remove(spheres[2]);
            }
            spotLight3Active = !spotLight3Active;
            break;
        case 52: //4
            if(spotLight4Active == false){
                spotLights[3].intensity = 2;
                helpers[3] = new THREE.DirectionalLightHelper(spotLights[3],5);
                scene.add(helpers[3]);
                scene.add(cones[3]);
                scene.add(spheres[3]);
            }
            else{
                spotLights[3].intensity = 0;
                scene.remove(helpers[3]);
                scene.remove(cones[3]);
                scene.remove(spheres[3]);
            }
            spotLight4Active = !spotLight4Active;
            break;
        case 37: //<-
            leftPressed = true;
            break;
        case 38: //arrow up
            upPressed = true;
            break;
        case 39: //->
            rightPressed = true;
            break;
        case 40: //arrow down
            downPressed = true;
            break;
    }
}
/*------------------------KEY UP-----------------------------------*/
function onKeyUp(e) {
    'use strict';
    switch(e.keyCode){
        case 37:
            leftPressed = false;
            break;
        case 38:
            upPressed = false;
            break;
        case 39:
            rightPressed = false;
            break;
        case 40:
            downPressed = false;
            break;
    }
}
/*----------------------------RENDER-------------------------------*/
function render() {
    'use strict';
    renderer.render(scene, camera);
}
/*----------------------------INIT---------------------------------*/
function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup",onKeyUp)
    window.addEventListener("resize", onResize);
}
/*----------------------------ANIMATE------------------------------*/
function animate() {
    'use strict';
    render();

    rotatePlane();

    requestAnimationFrame(animate);
}
