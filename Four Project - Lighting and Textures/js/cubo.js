class Cubo extends THREE.Object3D{

  constructor(x,y,z){
    'use strict';

    super();

    var geometry = new THREE.BoxGeometry(75,75,75,20);

    var materials_P = [new THREE.MeshPhongMaterial( {map: new THREE.TextureLoader().load('js/Textures/face1.jpg'), bumpMap: new THREE.TextureLoader().load('js/Textures/face2.jpg'), bumpScale: 20, wireframe: false}), 
                    new THREE.MeshPhongMaterial( {map: new THREE.TextureLoader().load('js/Textures/face4.jpg'), bumpMap: new THREE.TextureLoader().load('js/Textures/face2.jpg'), bumpScale: 20, wireframe: false}),
                    new THREE.MeshPhongMaterial( {map: new THREE.TextureLoader().load('js/Textures/face3.jpg'), bumpMap: new THREE.TextureLoader().load('js/Textures/face2.jpg'), bumpScale: 20, wireframe: false}), 
                    new THREE.MeshPhongMaterial( {map: new THREE.TextureLoader().load('js/Textures/face2.jpg'), bumpMap: new THREE.TextureLoader().load('js/Textures/face2.jpg'), bumpScale: 20, wireframe: false}), 
                    new THREE.MeshPhongMaterial( {map: new THREE.TextureLoader().load('js/Textures/face5.jpg'), bumpMap: new THREE.TextureLoader().load('js/Textures/face2.jpg'), bumpScale: 20, wireframe: false}),
                    new THREE.MeshPhongMaterial( {map: new THREE.TextureLoader().load('js/Textures/face6.jpg'), bumpMap: new THREE.TextureLoader().load('js/Textures/face2.jpg'), bumpScale: 20, wireframe: false})];
    
    var materials_B = [new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('js/Textures/face1.jpg'), wireframe: false}), 
                    new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('js/Textures/face4.jpg'), wireframe: false}),
                    new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('js/Textures/face3.jpg'), wireframe: false}), 
                    new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('js/Textures/face2.jpg'), wireframe: false}), 
                    new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('js/Textures/face5.jpg'), wireframe: false}),
                    new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('js/Textures/face6.jpg'), wireframe: false})];

    var mesh = new sceneMesh(geometry, materials_P, materials_B);
    this.add(mesh);
    this.position.set(x,y,z);
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
    
    if (this.children[0] instanceof (sceneMesh)){
      for(var i=0; i<6; i++)
        this.children[0].material[i].wireframe = wireframe;
    }
  }
}