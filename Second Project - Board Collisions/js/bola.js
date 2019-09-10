class Bola extends THREE.Object3D{

  constructor(x, y, z, raio, vector, veloc){
    'use strict';

    super();

    var l = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++){
        color += l[Math.floor(Math.random()*16)];
    }

    var geometry = new THREE.SphereGeometry(raio, 15, 15);
    var material = new THREE.MeshBasicMaterial({color: color, wireframe: true});
    var mesh = new THREE.Mesh(geometry, material);

    this.position.x = x
    this.position.y = y
    this.position.z = z


    this.userData = {velocity:veloc , direction: vector};

    this.add(mesh);
    mesh.add(new THREE.AxesHelper(6))

  }
}
