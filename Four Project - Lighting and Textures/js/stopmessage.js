class StopMessage  extends THREE.Object3D{

  constructor(x,y,z){
    'use strict';

    super();

    var geometry = new THREE.PlaneGeometry(175,175,10);
    var texture = new THREE.TextureLoader().load('js/Textures/texturaStop.jpg');
    var material = new THREE.MeshBasicMaterial({map:texture});

    var mesh = new THREE.Mesh(geometry, material);

    this.position.set(x,y,z);
    this.rotation.y = Math.PI/2;
    
    this.add(mesh);
    pauseScene.add(this);
  }

}