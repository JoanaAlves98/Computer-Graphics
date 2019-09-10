class Bola extends THREE.Object3D{

  constructor(x,y,z,raio){
    'use strict';

    super();

    this.raio = raio;

    var geometry = new THREE.SphereGeometry(raio,15,15);
    var texture = new THREE.TextureLoader().load('js/Textures/imagem.jpg');
    var material_P = new THREE.MeshPhongMaterial( {map: texture, specular: 0x111111, shininess: 100, wireframe: false} );
    var material_B = new THREE.MeshBasicMaterial( {map: texture, wireframe: false} );
    
    var mesh = new sceneMesh(geometry, material_P, material_B);

    this.userData = {velocity: 0};
  
    this.add(mesh);
    this.position.set(x,y,z);
    this.add(new THREE.AxesHelper(50));
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

  setVelocity(value){
    'use strict';

    this.userData.velocity = value;
  }

  getVelocity(){
    'use strict';
    
    return this.userData.velocity;
  }
  
  translateBall(time, a){
    'use strict';
    
    this.userData.velocity += a*time;
    
    if(this.userData.velocity > 5) 
      this.userData.velocity = 5;
      
    if(this.userData.velocity < 0) 
      this.userData.velocity = 0;

    var vector = new THREE.Vector3(0,1,0);
    this.position.applyAxisAngle(vector, this.userData.velocity/140);
  }

  rotateBall(){
    'use strict';

    if (this.children[0] instanceof (sceneMesh))
      this.children[0].rotation.x -= this.userData.velocity/this.raio;
    this.rotation.y += this.userData.velocity/140;
  }
}
