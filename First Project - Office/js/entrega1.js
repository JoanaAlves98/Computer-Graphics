/*Global Variables*/
var camera, scene, renderer;

var geometry, material, mesh;

var chair, chairUpperPart, lamp;

var rotate=0;                   //Rotation aqquired by the chair when rotated
var rotation = false;           //Existence of rotation

var clock = new THREE.Clock();
var wireframe = false;

var frustum = 600;              //Constant defines the volume viewed

/*Arrow Flags*/
var upPressed = false;
var downPressed = false;
var rightPressed = false;
var leftPressed = false;
var downReleased = false;
var upReleased = false;


/*-------------------------TABLE--------------------------------------*/
/*Creation of each of the table's legs*/
function addTableLeg(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CylinderGeometry(1,1, 5, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y - 3, z);
    obj.add(mesh);
}

/*Creation of the table's Top*/
function addTableTop(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(30, 2, 15);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

/*Creation of the table, and its components (the positions of the components are related to the position of the table created in the Scene)*/
function createTable(x, y, z) {
    'use strict';
    var table = new THREE.Object3D();
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    addTableTop(table, 0, 0, 0);                //adds the top to the object
    addTableLeg(table, -10, -0.5, -5);          //adds the first leg to the object
    addTableLeg(table, -10, -0.5, 5);           //adds the second leg to the object
    addTableLeg(table, 10, -0.5, 5);            //adds the third leg to the object
    addTableLeg(table, 10, -0.5, -5);           //adds the fourth leg to the object

    scene.add(table);                           //adds the table and its components to the scene

    table.position.x = x;
    table.position.y = y;
    table.position.z = z;
}

/*-------------------------LAMP-------------------------------------*/
/*Creation of the lamp's first base*/
function addLampLowerBase1(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CylinderGeometry(2,2, 0.5, 10);
    material = new THREE.MeshBasicMaterial({ color: 0x00bfff, wireframe: true });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}
/*Creation of the lamp's second base*/
function addLampLowerBase2(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CylinderGeometry(3,3, 0.5, 10);
    material = new THREE.MeshBasicMaterial({ color: 0x00bfff, wireframe: true });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

/*Creation of the lamp's upper base*/
function addLampUpperBase(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CylinderGeometry(1,1, 0.25, 10);
    material = new THREE.MeshBasicMaterial({ color: 0x00bfff, wireframe: true });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

/*Creation of the lamp's foot*/
function addLampHeight(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CylinderGeometry(0.25,0.25, 7, 5);
    material = new THREE.MeshBasicMaterial({ color: 0x00bfff, wireframe: true });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

/*Creation of the lamp's bulb*/
function addLampBulb(obj, x, y, z) {
    'use strict';
    geometry = new THREE.SphereGeometry(0.5,20,20);
    material = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

/*Creation the lamp's top*/
function addLampTop(obj, x, y, z) {
    'use strict';
    geometry = new THREE.ConeGeometry(3,4,20,3);
    material = new THREE.MeshBasicMaterial({ color: 0x00bfff, wireframe: true });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

/*Creation of each of the lamp's connectors*/
function addLampConnector(obj, x, y, z) {
    'use strict';
    geometry = new THREE.SphereGeometry(0.45,20,10);
    material = new THREE.MeshBasicMaterial({ color: 0x00bfff, wireframe: true });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

/*Creation of the lamp's arm*/
function addLampSideBar(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CylinderGeometry(0.25,0.25, 7, 5);
    material = new THREE.MeshBasicMaterial({ color: 0x00bfff, wireframe: true });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.rotation.x = Math.PI / 2;
    obj.add(mesh);
}

/*Creation of the section that connects the arm to the top (limited by the bulb and one connector)*/
function addLampConnectUp(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CylinderGeometry(0.25,0.25, 1, 10);
    material = new THREE.MeshBasicMaterial({ color: 0x00bfff, wireframe: true });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

/*Creation of the lamp, and its components (the positions of the components are related to the position of the lamp created in the Scene)*/
function createLamp(x, y, z) {
    'use strict';
    lamp = new THREE.Object3D();

    addLampLowerBase1(lamp, 0, 0, 0);           //adds the first base to the object
    addLampLowerBase2(lamp, 0, -0.5, 0);        //adds the second base to the object
    addLampUpperBase(lamp,0,0.5,0);             //adds the upper base to the object
    addLampHeight(lamp,0,3.5,0);                //adds the foot of the lamp to the object

    addLampConnector(lamp,0,7,0);               //adds a connector to the object
    addLampConnector(lamp,0,7,-7);              //adds a second connector to the object
    addLampTop(lamp,0,11,-7);                   //adds the top to the object

    addLampSideBar(lamp,0,7,-3.5);              //adds the arm to the object
    addLampConnectUp(lamp,0,8,-7);              //adds a third connector to the object

    addLampBulb(lamp,0,9,-7);                   //adds the bulb to the object

    scene.add(lamp);                            //adds the lamp and its components to the scene

    lamp.position.x = x;
    lamp.position.y = y;
    lamp.position.z = z;
}

/*---------------------------CHAIR-----------------------------------*/
/*Creation of the chair's main leg*/
function addChairMainLeg(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(1,4 , 1);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y -2.5, z);
    obj.add(mesh);
}

/*Creation of the chair's upper part as a whole, so it can rotate as one*/
function addChairUpperPart(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(5, 1, 5);
    material = new THREE.MeshBasicMaterial({ color: 0xfcd600, wireframe: true });
    chairUpperPart = new THREE.Mesh(geometry, material);
    chairUpperPart.position.set(x, y, z);
    obj.add(chairUpperPart);

    addChairBack(chairUpperPart,2,3,0);                 //adds the back of the chair to the object

    addChairArm(chairUpperPart,0,2,-2.5);               //adds the chair's first arm to the object
    addChairArm(chairUpperPart,0,2,2.5);                //adds the chair's second arm to the object
}

/*Creation of the chair's back*/
function addChairBack(obj,x,y,z){
    'use strict';
    geometry = new THREE.CubeGeometry(1, 7, 5);
    material = new THREE.MeshBasicMaterial({ color: 0xfcd600, wireframe: true });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

/*Creation of each of the chair's arms*/
function addChairArm(obj,x,y,z){
    'use strict';
    geometry = new THREE.CubeGeometry(5, 0.25, 0.25);
    material = new THREE.MeshBasicMaterial({ color: 0xfcd600, wireframe: true });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

/*Creation of each of the chair's wheels*/
function addChairWheel(obj,x,y,z){
    'use strict';
    geometry = new THREE.TorusGeometry(0.5 ,0.5, 3, 15, Math.Pi);
    material = new THREE.MeshBasicMaterial({ color: 0xfcd600, wireframe: true });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

/*Creation of one of the supporters of the chair (|) */
function addChairSupporter1(obj,x,y,z){
    'use strict';
    geometry = new THREE.CubeGeometry(6, 0.20, 0.25);
    material = new THREE.MeshBasicMaterial({ color: 0xfcd600, wireframe: true });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

/*Creation of the second supporter of the chair (-) */
function addChairSupporter2(obj,x,y,z){
    'use strict';
    geometry = new THREE.CubeGeometry(0.2, 0.25, 6);
    material = new THREE.MeshBasicMaterial({ color: 0xfcd600, wireframe: true });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

/*Creation of the chair, and its components (the positions of the components are related to the position of the chair created in the Scene)*/
function createChair(x, y, z) {
    'use strict';
    chair = new THREE.Object3D();
    material = new THREE.MeshBasicMaterial({ color: 0xfcd600, wireframe: true });
    chair.userData = {velocity:0};

    addChairUpperPart(chair, 2, 0, 2);          //adds the upper part (defined as a whole as stated previously) to the object
    addChairMainLeg(chair,3,0,2);               //adds the main leg to the object

    addChairWheel(chair,3.25,-4.55,-0.5);       //adds the first wheel to the object
    addChairWheel(chair,3.25,-4.55,4.85);       //adds the second wheel to the object
    addChairWheel(chair,0,-4.55,2);             //adds the third wheel to the object
    addChairWheel(chair,6,-4.55,2);             //adds the fourth wheel to the object

    addChairSupporter1(chair,3.25,-4.55,2);     //adds the first supporter to the chair
    addChairSupporter2(chair,3.25,-4.55,2);     //adds the second supporter to the chair

    scene.add(chair);                           //adds the chair and its components to the scene

    chair.position.x = x;
    chair.position.y = y;
    chair.position.z = z;
}

/*-------------------------------------------*/
/*Creation of the scene, with the axes, the table, the chair, the lamp and the bulb*/
function createScene() {
    'use strict';
    scene = new THREE.Scene();

    scene.add(new THREE.AxesHelper(10));

    createTable(0, 0, 0);
    createLamp(-30, -5, 15);
    createChair(50, -2, 0);

}

/*Creation of the orthographic camera*/
function createCamera() {
    'use strict';
    var aspect = window.innerWidth/window.innerHeight;

    camera = new THREE.OrthographicCamera(frustum*aspect/-15,frustum*aspect/15,frustum/15,frustum/-15,1,1000);

    camera.position.x = 50;
    camera.position.y = 50;
    camera.position.z = 50;
    camera.lookAt(scene.position);      //Points the camera to the defined position
}

/*Definition of function onResize, that will adjust the camera's definitions, when the window's height and widht are changed*/
function onResize() {
    'use strict';
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;

        camera.left = -frustum*camera.aspect/15;
        camera.right = frustum*camera.aspect/15;
        camera.top = frustum/15;
        camera.bottom = -frustum/15;

        camera.updateProjectionMatrix();
    }

    renderer.setSize(window.innerWidth, window.innerHeight);

}

/*Definition of function onKeyDown, that will define the behavior when certain keys are pressed*/
function onKeyDown(e) {
        'use strict';
    switch (e.keyCode){
        case 65: //A
        case 97: //a
            wireframe = !wireframe;
            scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                 node.material.wireframe = wireframe;           //All wireframes are activated/deactivated
            }
        });
        break;

        case 69:  //E
        case 101: //e
            scene.traverse(function (node) {
            if (node instanceof THREE.AxesHelper) {
                node.visible = !node.visible;                                   //The axes are visible/invisible
            }
        });
        break;

        case 49: //1
            camera.position.x = 80;
            camera.position.y = 0;
            camera.position.z = 0;
            camera.lookAt(scene.position);          //Points the camera to the defined position (side camera)
            break;

        case 50: //2
            camera.position.x = 0;
            camera.position.y = 80;
            camera.position.z = 0;
            camera.lookAt(scene.position);          //Points the camera to the defined position (up camera)
            break;

        case 51: //3
            camera.position.x = 0;
            camera.position.y = 0;
            camera.position.z = 80;
            camera.lookAt(scene.position);          //Points the camera to the defined position (front camera)
            break;

        case 37: //<-
            leftPressed = true;                     //If the left arrow is pressed, the flag is activated
            break;

        case 38: //arrow up
            upPressed = true;                       //If the up arrow is pressed, the pressed flag is activated and the released flag is deactivated
            upReleased = false;
            break;

        case 39: //->
            rightPressed = true;                    //If the right arrow is pressed, the flag is activated
            break;

        case 40: //arrow down
            downPressed = true;                    //If the down arrow is pressed, the pressed flag is activated and the released flag is deactivated
            downReleased = false;
            break;
    }
}

/*Definition of function onKeyUp, that will define the behavior when certain keys are released*/
function onKeyUp(e) {
    'use strict';
    switch(e.keyCode){
        case 37:
            leftPressed = false;                    //If the left arrow is released, the flag is deactivated
            break;

        case 38:
            upPressed = false;                      //If the up arrow is released, the pressed flag is deactivated and the released flag is activated
            upReleased = true;
            break;

        case 39:
            rightPressed = false;                   //If the right arrow is released, the flag is deactivated
            break;

        case 40:
            downPressed = false;                    //If the down arrow is released, the pressed flag is deactivated and the released flag is activated
            downReleased = true;
            break;
    }
}

/*Definition of function renderer, that displays the scene previously defined*/
function render() {
    'use strict';
    renderer.render(scene, camera);
}


/*Definition of function init, that will BE called by the index, which defines the render, creates de scene and the camera, and adds event listeners*/
function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup",onKeyUp)
    window.addEventListener("resize", onResize);

}

/*Definition of function rotateChairLeft, that rotates de chair's upper part Math.PI/25 each time it's called, saves the total of the rotation in the global variable rotate, and activates the flag that marks the existence of rotation*/
function rotateChairLeft(){
    'use strict';
    rotation = true;
    rotate +=(Math.PI/25);
    chairUpperPart.rotation.y+=(Math.PI/25);
}

/*Definition of function rotateChairRight, that rotates de chair's upper part -(Math.PI/25) each time it's called, saves the total of the rotation in the global variable rotate, and activates the flag that marks the existence of rotation*/
function rotateChairRight(){
    'use strict';
    rotation = true;
    rotate -=(Math.PI/25);
    chairUpperPart.rotation.y-=(Math.PI/25);
}

/*Definition of function updateWheels, that sees if the chair's upper part was rotated, and if so, it rotates the wheels to the same direction*/
function updateWheels(){
    if(rotation == true){
        chair.children[2].rotation.y = rotate;
        chair.children[3].rotation.y = rotate;
        chair.children[4].rotation.y = rotate;
        chair.children[5].rotation.y = rotate;
        rotation = false;
    }
}

/*Definition of function moveChair*/

/*The equation to calculate the velocity of the movement is v= v0+at*/
/*The aceleration equals 1 or -1 depending whether the chair is moving forward or backwars*/

function moveChair(n,stop,delta){
    'use strict';
    var dist = chair.userData.velocity + delta ;        //Variable that saves the distance of the movement
    if(stop==0){                                    //Stop makes the distinction between the acceleration and braking of the movement
        if(n==-1){ //Moves backwards
            chair.children[2].rotation.z -= dist;
            chair.children[3].rotation.z -= dist;
            chair.children[4].rotation.z -= dist;
            chair.children[5].rotation.z -= dist;       //Rotates the wheels under themselves

            updateWheels();                     //In case of the existence of rotation, updates the wheels' direction

            chair.translateOnAxis(new THREE.Vector3(chairUpperPart.matrixWorld.elements[0],0,chairUpperPart.matrixWorld.elements[2]),chair.userData.velocity+= delta);  //TranslateOnAxis moves the chair in the direction of the new vector(defined using the rotation of the chair's upper part, so it is consistent with the rotation), and defines the distance of this movement (given by the equation previously explained)

        }
        if(n==1){ //Moves forward
            chair.children[2].rotation.z += dist;
            chair.children[3].rotation.z += dist;
            chair.children[4].rotation.z += dist;
            chair.children[5].rotation.z += dist;       //Rotates the wheels under themselves

            updateWheels();                       //In case of the existence of rotation, updates the wheels' direction

            chair.translateOnAxis(new THREE.Vector3(chairUpperPart.matrixWorld.elements[0],0,chairUpperPart.matrixWorld.elements[2]),chair.userData.velocity-= delta);       //TranslateOnAxis moves the chair in the direction of the new vector(defined using the rotation of the chair's upper part, so it is consistent with the rotation), and defines the distance of this movement (given by the equation previously explained)
        }
    }
    else{
            if(n==-1 && chair.userData.velocity > 0){ //Moves backwards
                chair.children[2].rotation.z -= dist;
                chair.children[3].rotation.z -= dist;
                chair.children[4].rotation.z -= dist;
                chair.children[5].rotation.z -= dist;       //Rotates the wheels under themselves

                updateWheels();                    //In case of the existence of rotation, updates the wheels' direction

                chair.translateOnAxis(new THREE.Vector3(chairUpperPart.matrixWorld.elements[0],0,chairUpperPart.matrixWorld.elements[2]),chair.userData.velocity-= delta);       //TranslateOnAxis moves the chair in the direction of the new vector(defined using the rotation of the chair's upper part, so it is consistent with the rotation), and defines the distance of this movement (given by the equation previously explained)

                if(chair.userData.velocity < 0){     //When stopping, this prevents the chair from starting to move forward and not stopping
                    upReleased = false;
                }
            }
            if(n==1 && chair.userData.velocity < 0){ //Moves forward
                chair.children[2].rotation.z += dist;
                chair.children[3].rotation.z += dist;
                chair.children[4].rotation.z += dist;
                chair.children[5].rotation.z += dist;

                updateWheels();                    //In case of the existence of rotation, updates the wheels' direction

                chair.translateOnAxis(new THREE.Vector3(chairUpperPart.matrixWorld.elements[0],0,chairUpperPart.matrixWorld.elements[2]),chair.userData.velocity+= delta);       //TranslateOnAxis moves the chair in the direction of the new vector(defined using the rotation of the chair's upper part, so it is consistent with the rotation), and defines the distance of this movement (given by the equation previously explained)

                if(chair.userData.velocity > 0){        //When stopping, this prevents the chair from starting to move backwards and not stopping
                    upReleased = false;
                }
            }
        }
}

/*Definition of function chairMovement, that rotates the chair to the right if the rightPressed flag is activated,rotates the chair to the left if the leftPressed flag is activated, adds movement to the chair if the upPressed flag or the downPressed flags are activated, and stops the movement of the chair gradually if the upReleased or downReleased flags are activated */
function chairMovement(){
    'use strict';
    var delta = clock.getDelta();

    if(rightPressed){
       rotateChairRight();
    }
    if(leftPressed){
        rotateChairLeft();
    }
    if(upPressed){
       moveChair(1,0,delta);
    }
    if(downPressed){
        moveChair(-1,0,delta);
    }
    if(upReleased){
       moveChair(1,1,delta);
    }
    if(downReleased){
        moveChair(-1,1,delta);
    }
}

/*Definition of function animate, called by the index, and is responsible for the update/display cycle*/
function animate() {
    'use strict';
    chairMovement();

    render();

    requestAnimationFrame(animate);
}
