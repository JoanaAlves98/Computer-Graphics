class Tabuleiro extends THREE.Object3D{

    addBase(obj, x, y, z, lado, material) {
      'use strict';

      geometry = new THREE.CubeGeometry(2*lado, 1, lado);
      mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      obj.add(mesh);
    }

    addWidthWall(obj, x, y, z, lado, material, altura) {
      'use strict';

      geometry = new THREE.CubeGeometry(1, altura, lado);
      mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      obj.add(mesh);
    }

    addLengthWall(obj, x, y, z, lado, material, altura) {
      'use strict';

      geometry = new THREE.CubeGeometry(2*lado, altura, 1);
      mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      obj.add(mesh);
    }


    constructor(x, y, z, lado){
      'user strict';

      super();

      this.x = x;
      this.y = y;
      this.z = z

      var altura = (Math.sqrt(Math.pow(lado,2) + Math.pow(2*lado,2)))/10;

      var material = new THREE.MeshBasicMaterial({ color: 0x85C1E9, wireframe: true });
      var materialBase = new THREE.MeshBasicMaterial({ color: 0x2E86C1, wireframe: true });

      this.addBase(this, this.x, this.y, this.z, lado, materialBase, altura);

      this.addWidthWall(this, -lado+0.5, altura/2+0.5, 0, lado, material, altura);
      this.addWidthWall(this, lado-0.5, altura/2+0.5, 0, lado, material, altura);
      this.addLengthWall(this, 0, altura/2+0.5, -lado/2+0.5, lado, material, altura);
      this.addLengthWall(this, 0, altura/2+0.5, lado/2-0.5, lado, material, altura);

    }
}
