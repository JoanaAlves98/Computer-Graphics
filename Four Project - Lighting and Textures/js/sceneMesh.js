class sceneMesh extends THREE.Mesh{

    constructor(geometry, PhongMaterial, BasicMaterial){
        'use strict';
        
        super(geometry, PhongMaterial);

        this.BasicMaterial = BasicMaterial;
        this.PhongMaterial = PhongMaterial;
        
    }
}