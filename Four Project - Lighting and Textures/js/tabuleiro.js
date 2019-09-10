class Tabuleiro extends THREE.Object3D{

  constructor(x,y,z){
    'use strict';

    super();

    var texture = new THREE.TextureLoader().load('js/Textures/xadrez.jpg');
    var geometry = new THREE.PlaneGeometry(400,400,20);
    var material_P = new THREE.MeshPhongMaterial( {map: texture, wireframe: false} );
    var material_B = new THREE.MeshBasicMaterial( {map: texture, wireframe: false} );
    var mesh = new sceneMesh(geometry, material_P, material_B);
    
    this.add(mesh);
    this.position.set(x,y,z);
    this.rotation.x = - Math.PI / 2;
    scene.add(this);

  }

  changeMaterial(flagPhong, wireframe){
    'use strict';

    //flagPhong == TRUE, esta a Phong e vai mudar para Basic
    if(flagPhong){
      if (this.children[0] instanceof (sceneMesh))
        this.children[0].material = this.children[0].BasicMaterial;
    }
    else{
      if (this.children[0] instanceof (sceneMesh))
        this.children[0].material = this.children[0].PhongMaterial;
    }
    this.changeWireframe(wireframe);
  }

  changeWireframe(wireframe){
    'use strict';

    if (this.children[0] instanceof (sceneMesh)) 
      this.children[0].material.wireframe = wireframe;
  }
}
