/*Global Variables*/
var scene, renderer;
var wireframe, geometry, mesh;
var frustum = 600;              //Constant defines the volume viewed
var camFactor = 10;

var camera1, camera2, camera3, cameraAtiva;
var originalAspect = window.innerWidth/window.innerHeight;
var tabuleiro;
var bola;
var lado = 40;
var altura = (Math.sqrt(Math.pow(lado,2) + Math.pow(2*lado,2)))/10;
var raio = ((Math.sqrt(Math.pow(lado,2) + Math.pow(2*lado,2)))/10)/2;

var tableLimits_X_min = -lado + raio + 1
var tableLimits_X_max = lado - raio - 1
var tableLimits_Z_min = -(lado/2) + raio + 1
var tableLimits_Z_max = (lado/2) - raio - 1

var ballsArray = [];
var ballsCreated = 0;
var NUMBALLS = 10;

var delta = 0;
var deltaChange = 0;

var clock = new THREE.Clock();


function createScene() {
    'use strict';
    scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(10));

    tabuleiro = new Tabuleiro(0,0,0,lado);
    scene.add(tabuleiro);

    while(ballsCreated<NUMBALLS){
        createBall();
    }
}


function createCamera1() {
    'use strict';

    camera1 = new THREE.OrthographicCamera(frustum*originalAspect/-camFactor, frustum*originalAspect/camFactor, frustum/camFactor, frustum/-camFactor, 1, 1000);


    camera1.position.x = 0;
    camera1.position.y = 80;
    camera1.position.z = 0;

    camera1.lookAt(tabuleiro.position);
    cameraAtiva = camera1;
}

function createCamera2(){
    'use strict'

    camera2 = new THREE.PerspectiveCamera(45, originalAspect, 1, 1000);

    camera2.position.x = 65;
    camera2.position.y = 60;
    camera2.position.z = -50;

    camera2.lookAt(tabuleiro.position);
}

function createCamera3(){
    'use strict'

    camera3 = new THREE.PerspectiveCamera(75, originalAspect, 1, 1000);

    camera3.position.x = ballsArray[0].position.x;
    camera3.position.y = 2*raio + raio;
    camera3.position.z = ballsArray[0].position.z;

    camera3.lookAt(ballsArray[0].position);
}

function onResize() {
  'use strict';

  renderer.setSize(window.innerWidth, window.innerHeight);

  if(cameraAtiva == camera2 || cameraAtiva == camera3){         //PerspectiveCameras
    if (window.innerHeight > 0 && window.innerWidth > 0) {
            cameraAtiva.aspect = window.innerWidth / window.innerHeight;
            cameraAtiva.updateProjectionMatrix();
    }

  }

  else if(cameraAtiva == camera1){    //OrthographicCamera
        var asp = window.innerWidth/ window.innerHeight;
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

function getRandomNumber(bounderyMin, bounderyMax) {
    return THREE.Math.randFloat(bounderyMin, bounderyMax)
}

function createBall(){
    'use strict';
    var colision = false;

    var xPosition = getRandomNumber(tableLimits_X_min,tableLimits_X_max);
    var zPosition = getRandomNumber(tableLimits_Z_min,tableLimits_Z_max);
    var yPosition = raio + 0.5;

    var direction_x = 0;
    var direction_z = 0;

    while(direction_x == 0 || direction_z == 0){
        direction_x = getRandomNumber(-1,1);
        direction_z = getRandomNumber(-1,1);
    }

    var vec = (new THREE.Vector3(direction_x, 0, direction_z)).normalize();
    var veloc = getRandomNumber(10,20);

    var new_ball;

    if(ballsCreated>0){
        for(var i=0; i<ballsCreated; i++){
            if(colisionBallOnCreate(xPosition, zPosition,ballsArray[i])){
                colision = true;
                break;
            }
        }
    }
    if(!colision){
        new_ball = new Bola(xPosition,yPosition,zPosition, raio, vec, veloc);
        ballsArray.push(new_ball);
        scene.add(new_ball);
        ballsCreated++;
    }
}

function hasColision(){
    delta = clock.getDelta();
    if((delta*1000)% 2 > 5){
        deltaChange+= 5;
    }
    for (var i=0; i<ballsCreated; i++){
        hasColisionWithWalls(i, ballsArray[i], delta);
        hasColisionsWithBalls(i, ballsArray[i], delta);
        rotateBalls(i, ballsArray[i], delta);
    }
}

function rotateBalls(i, ball, delta){
    if(deltaChange %2 == 0){
        ball.userData.velocity +=  0.5*delta;
    }

    var vector = new THREE.Vector3();
    vector.addVectors(ball.position, ball.userData.direction);
    ball.lookAt(vector);
    ball.children[0].rotation.x += (ball.userData.velocity*delta/raio);

    ball.position.x += ball.userData.direction.x * ball.userData.velocity*delta;
    ball.position.z += ball.userData.direction.z * ball.userData.velocity*delta;
}

function hasColisionWithWalls(i, ball, delta){
    var pos_Wall_Left = tabuleiro.children[1].position.x + 0.5;
    var pos_Wall_Right = tabuleiro.children[2].position.x - 0.5;
    var pos_Wall_Bottom = tabuleiro.children[3].position.z + 0.5;
    var pos_Wall_Top = tabuleiro.children[4].position.z - 0.5;

    var next_pos_x = ball.position.x + ball.userData.direction.x *ball.userData.velocity*delta;
    var next_pos_z = ball.position.z + ball.userData.direction.z *ball.userData.velocity*delta;

    if(colisionWall(pos_Wall_Left, next_pos_x) || colisionWall(pos_Wall_Right, next_pos_x)){
        var d_x = ball.userData.direction.x;
        var d_z = ball.userData.direction.z;
        new_direction = (new THREE.Vector3(-d_x, 0, d_z)).normalize();
        ball.userData.direction = new_direction;
    }
    if(colisionWall(pos_Wall_Bottom, next_pos_z) ||colisionWall(pos_Wall_Top, next_pos_z)){
        var d_x = ball.userData.direction.x;
        var d_z = ball.userData.direction.z;
        new_direction = (new THREE.Vector3(d_x, 0, -d_z)).normalize();
        ball.userData.direction = new_direction;
    }
}

function colisionWall(c1, c2){
    var distance = Math.abs(c1 - c2);
    if(distance <= raio)
        return true;
    else
        return false;
}

function hasColisionsWithBalls(i, ball, delta){
    var next_pos_x = ball.position.x + ball.userData.direction.x *ball.userData.velocity*delta;
    var next_pos_z = ball.position.z + ball.userData.direction.z *ball.userData.velocity*delta;

    var aux_x = ball.userData.direction.x;
    var aux_z = ball.userData.direction.z;
    var aux_v = ball.userData.velocity;

    for (var i=0; i<ballsCreated; i++){
        if (ball.position.x != ballsArray[i].position.x & ball.position.z != ballsArray[i].position.z){
            if(colisionBall(next_pos_x, next_pos_z, ballsArray[i], delta)){
                ball.userData.direction.x = ballsArray[i].userData.direction.x;
                ball.userData.direction.z = ballsArray[i].userData.direction.z;
                ball.userData.velocity = ballsArray[i].userData.velocity;

                ballsArray[i].userData.direction.x = aux_x;
                ballsArray[i].userData.direction.z = aux_z;
                ballsArray[i].userData.velocity = aux_v;
            }
        }
    }
}

function colisionBall(ball1_x, ball1_z, ball2, delta){
    var next_pos_x_ball2 = ball2.position.x + ball2.userData.direction.x *ball2.userData.velocity*delta;
    var next_pos_z_ball2 = ball2.position.z + ball2.userData.direction.z *ball2.userData.velocity*delta;

    var distance_x = Math.pow((ball1_x - next_pos_x_ball2),2);
    var distance_z = Math.pow((ball1_z - next_pos_z_ball2),2);

    var distance = Math.sqrt(distance_x + distance_z);

    if(distance <= 2*raio)
        return true;
    else
        return false;
}

function colisionBallOnCreate(ball1_x, ball1_z, ball2){
    var distance_x = Math.pow((ball1_x - ball2.position.x),2);
    var distance_z = Math.pow((ball1_z - ball2.position.z),2);

    var distance = Math.sqrt(distance_x + distance_z);

    if(distance <= 2*raio)
        return true;
    else
        return false;
}

function updateCameraOnBall(){
    camera3.position.x = ballsArray[0].position.x - ballsArray[0].userData.direction.x*10;
    camera3.position.z = ballsArray[0].position.z - ballsArray[0].userData.direction.z*10;
    camera3.lookAt(ballsArray[0].position);

}

function onKeyDown(e) {
    'use strict';

    switch (e.keyCode){
        case 65: //A
        case 97: //a
            wireframe = !wireframe;
            scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                 node.material.wireframe = wireframe;}
            });
            break;

        case 69:  //E
        case 101: //e
            scene.traverse(function (node) {
            if (node instanceof THREE.AxesHelper) {
                node.visible = !node.visible;}
            });
            break;

        case 49: //1
            cameraAtiva = camera1;
            break;

        case 50: //2
            cameraAtiva = camera2;
            break;

        case 51:
            cameraAtiva = camera3;
            break;
    }
}

function init() {
    'use strict';

    renderer = new THREE.WebGLRenderer({antialias: true});

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera1();
    createCamera2();
    createCamera3();

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
}

function render() {
    'use strict';

    renderer.render(scene, cameraAtiva);
}

function animate() {
    'use strict';

    hasColision();
    updateCameraOnBall()
    render();
    requestAnimationFrame(animate);
}
