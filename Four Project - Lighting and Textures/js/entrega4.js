/*Global Variables*/
var scene, renderer, pauseScene, activeScene;
var geometry, mesh;
var wireframe = false;

var cameraAtiva, camera, cameraO;
var aspect = window.innerWidth/window.innerHeight;

var tabuleiro, cubo, bola, stopMessage;

var frustum = 600;              
var camFactor = 5;

var lado = 75;
var raio = 30;

var directionalLight;
var directLightFlag = false;
var dirHelper;

var pointLight;
var pointLightFlag = false; 

var moveBall = false;
var time = 0;
var previousvelocity;

var clock = new THREE.Clock();
var clockActive = true;

var phongMaterial = true;

/*------------------------------------------FUNCTIONS---------------------------------------------------------*/
function createDirectionalLight(){
  'use strict';

  directLightFlag = true;
  directionalLight= new THREE.DirectionalLight( 0xffffff, 1);
  directionalLight.position.set(3,2,1);
  directionalLight.target.position.set(0,0,0);

  scene.add(directionalLight);

  dirHelper = new THREE.DirectionalLightHelper(directionalLight,30);
  scene.add(dirHelper);
}

function createPointLight(){
  'use strict';

  pointLight = new THREE.PointLight(0xffffff, 0, 2000);
  pointLight.position.set(150,200,100);
 
  scene.add(pointLight);
}

function createScene(){
  'use strict';

  scene = new THREE.Scene();
  scene.add(new THREE.AxesHelper(200));

  tabuleiro = new Tabuleiro(0,0,0);
  cubo = new Cubo(0,lado/2,0);
  bola = new Bola(140,raio,0,raio);

  createDirectionalLight();
  createPointLight();
}

function createPauseScene(){
  'use strict';

  pauseScene = new THREE.Scene();
  stopMessage = new StopMessage(10,0,0);
}

function createPerspectiveCamera(){
  'use strict';

  camera = new THREE.PerspectiveCamera(45,aspect ,1,1000);

  camera.position.x = 500;
  camera.position.y = 200;
  camera.position.z = 500;

  camera.lookAt(scene.position);

  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enabled = true;

  controls.minDistance = 300;
  controls.maxDistance = 800;

  controls.maxPolarAngle = Math.PI / 2;
}

function createOrthographicCamera(){
  'use strict';

  cameraO = new THREE.OrthographicCamera(frustum*aspect/-camFactor, frustum*aspect/camFactor, frustum/camFactor, frustum/-camFactor, 1, 1500);

  cameraO.position.x = 200;
  cameraO.position.y = 0;
  cameraO.position.z = 0;

  cameraO.lookAt(0,0,0);
}

function onResize() {
  'use strict';

  renderer.setSize(window.innerWidth, window.innerHeight);

  if(cameraAtiva == camera){         //PerspectiveCameras
    if (window.innerHeight > 0 && window.innerWidth > 0) {
      cameraAtiva.aspect = window.innerWidth / window.innerHeight;
      cameraAtiva.updateProjectionMatrix();
    }
  }

  else if(cameraAtiva == cameraO){    //OrthographicCamera
    var asp = window.innerWidth/window.innerHeight;
    if(asp >1){
      cameraAtiva.left = frustum*asp/-camFactor;
      cameraAtiva.right = frustum*asp/camFactor;
      cameraAtiva.top = frustum/camFactor;
      cameraAtiva.bottom = frustum/-camFactor;
    }
    else{
      cameraAtiva.left = frustum/-camFactor;
      cameraAtiva.right = frustum/camFactor;
      cameraAtiva.top = frustum/(asp*camFactor);
      cameraAtiva.bottom = frustum/(asp*-camFactor);
    }
    cameraAtiva.updateProjectionMatrix();
  }
}

function onKeyDown(e){
  'use strict';

  switch (e.keyCode){
    case 69:  //E
    case 101: //e
      if(activeScene == scene){
        scene.traverse(function (node) {
        if (node instanceof THREE.AxesHelper) {
            node.visible = !node.visible;}
        });
      }
      break;

    case 76://L
    case 108: //l
      if(activeScene == scene){
        tabuleiro.changeMaterial(phongMaterial, wireframe);
        bola.changeMaterial(phongMaterial, wireframe);
        cubo.changeMaterial(phongMaterial, wireframe);
        
        phongMaterial = !phongMaterial;
      }
      break; 

    case 68://D
    case 100: //d 
      if(activeScene == scene){
        if(directLightFlag == true){
          directionalLight.intensity = 0;
          scene.remove(dirHelper);
        }
        else{
          directionalLight.intensity = 1;
          scene.add(dirHelper);
        }
        directLightFlag = !directLightFlag;
      }
      break;

    case 80://P
    case 112: //p
      if(activeScene == scene){
        if(pointLightFlag == true)
          pointLight.intensity = 0;

        else
          pointLight.intensity = 1.5;

        pointLightFlag = !pointLightFlag;
      }
      break;

    case 87://W
    case 119: //w
      if(activeScene == scene){
        wireframe = !wireframe;

        tabuleiro.changeWireframe(wireframe);
        bola.changeWireframe(wireframe);
        cubo.changeWireframe(wireframe);
      }
      break;

    case 66://B
    case 98: //b
      if(activeScene == scene)
        moveBall = !moveBall;
      break;

    case 83://S
    case 115: //s
      if(clockActive == true){
        cameraAtiva = cameraO;
        activeScene = pauseScene;
        clock.stop();
        previousvelocity = bola.getVelocity();
        bola.setVelocity(0);
      }
      else{   
        cameraAtiva = camera;
        activeScene = scene;
        bola.setVelocity(previousvelocity);
        clock.start();
      }
      clockActive = !clockActive;
      break;

    case 82://R
    case 114: //r
      createScene();
      createPerspectiveCamera(); 
      createOrthographicCamera();
      resetFlags();
      break;
  }
}

function resetFlags(){
  'use strict';

  pointLightFlag = false; 
  phongMaterial = true;
  moveBall = false;
  clockActive = true;
  cameraAtiva = camera;
  activeScene = scene;
  clock.start();
  time = 0;  
}

function movementBall(){
  'use strict';

  if(moveBall)
    bola.translateBall(time,1);
  
  else
    bola.translateBall(time,-1);
  
  bola.rotateBall(time);
}

function render(){
  'use strict';
  
  renderer.render(activeScene, cameraAtiva);
}

function init(){
  'use strict';

  renderer = new THREE.WebGLRenderer({antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  createScene();
  createPauseScene();

  createPerspectiveCamera();
  createOrthographicCamera();

  cameraAtiva = camera;
  activeScene = scene;

  clock.start();

  render();

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("resize", onResize);
}

function animate(){
  'use strict';

  render();

  time = clock.getDelta();
 
  movementBall();

  requestAnimationFrame(animate);
}