materialAsasEstabilizadores_P = new THREE.MeshPhongMaterial({ color: 0xFF9999, wireframe: false, side: THREE.FrontSide });
materialFuselagem_P = new THREE.MeshPhongMaterial({ color: 0xFFCCFF,  wireframe: false });
materialCockPit_P = new THREE.MeshPhongMaterial({ color: 0xF00BC0,   wireframe: false });

materialAsasEstabilizadores_B = new THREE.MeshBasicMaterial({ color: 0xFF9999, wireframe: false, side: THREE.FrontSide });
materialFuselagem_B = new THREE.MeshBasicMaterial({ color: 0xFFCCFF,  wireframe: false });
materialCockPit_B = new THREE.MeshBasicMaterial({ color: 0xF00BC0,   wireframe: false });

materialAsasEstabilizadores_L = new THREE.MeshLambertMaterial({ color: 0xFF9999, wireframe: false, side: THREE.FrontSide });
materialFuselagem_L = new THREE.MeshLambertMaterial({ color: 0xFFCCFF,  wireframe: false });
materialCockPit_L = new THREE.MeshLambertMaterial({ color: 0xF00BC0,   wireframe: false });

class Plane extends THREE.Object3D{

    constructor(x,y,z){
        'use strict';

        super();

        var larguraTriangulo = 1;
        var comprimentoAsa = 50;
        var comprimentoFus = 80;
        var comprimentoNearFar = 10;
        var comprimentoEstabilizadores = 10;
        var comprimentoCockPit = 10;

        this.add(new THREE.AxesHelper(20));

        /*Cockpit*/
        this.addTopBottom(this,-2.5, 12.5, 15,materialCockPit_L, -larguraTriangulo, comprimentoCockPit, 5, 0);
        this.addLeftRight(this, 2.5, 12.5, 15, materialCockPit_L, -larguraTriangulo, comprimentoCockPit, 2.5, 0);
        this.addLeftRight(this, -2.5, 12.5, 15, materialCockPit_L, -larguraTriangulo, comprimentoCockPit, 2.5, 1);
        this.addNearFar(this,-2.5, 12.5, 15,materialCockPit_L, larguraTriangulo, comprimentoCockPit/2, 2.5, 0);
        this.addNearFar(this,-2.5, 12.5, 10,materialCockPit_L, larguraTriangulo, comprimentoCockPit/2, 2.5, 1);

        /*Fuselagem*/
        this.addTopBottom(this, -5, 10, 20, materialFuselagem_L, -larguraTriangulo, comprimentoFus,10,0);
        this.addTopBottom(this, -5, 0, 20, materialFuselagem_L, -larguraTriangulo, comprimentoFus,10,1);
        this.addLeftRight(this, 5, 10, 20, materialFuselagem_L, -larguraTriangulo, comprimentoFus,10, 0);
        this.addLeftRight(this, -5, 10, 20, materialFuselagem_L, -larguraTriangulo, comprimentoFus,10, 1);
        this.addNearFar(this, -5, 10, 20, materialFuselagem_L, larguraTriangulo, comprimentoNearFar,10, 0);
        this.addNearFar(this,-5, 10, -20 ,materialFuselagem_L, larguraTriangulo, comprimentoNearFar,10, 1);

        /*Asas*/
        this.addAsa(this, 5, 5, 0, materialAsasEstabilizadores_L, larguraTriangulo, comprimentoAsa);
        this.addAsa(this, -5, 5, 0, materialAsasEstabilizadores_L, -larguraTriangulo, comprimentoAsa);

        /*Estabilizadores*/
        this.addEstabelizadoresHorizontais(this, 5, 5, -17.5, materialAsasEstabilizadores_L, larguraTriangulo, comprimentoEstabilizadores);
        this.addEstabelizadoresHorizontais(this, -5, 5, -17.5, materialAsasEstabilizadores_L, -larguraTriangulo, comprimentoEstabilizadores);
        this.addEstabilizadorVertical(this, 0, 10, -17.5, materialAsasEstabilizadores_L, larguraTriangulo, comprimentoEstabilizadores);

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;

    }

    addAsa(obj, x, y, z, material, largura, comprimento){
        'use strict';
        var geometry = new THREE.Geometry();

        geometry.vertices.push(
            new THREE.Vector3( x, y, z),
            new THREE.Vector3( x, y, z+5)
        );

        for(var i=0; i < comprimento/Math.abs(largura); i=i+2){
            var x1 = geometry.vertices[i].x;
            var z1 = geometry.vertices[i].z;
            var x2 = geometry.vertices[i+1].x;
            var z2 = geometry.vertices[i+1].z;
            geometry.vertices.push(
                new THREE.Vector3( x1+largura, y, z1),
                new THREE.Vector3( x2+largura, y, z2)
            );
            geometry.faces.push( new THREE.Face3( i, i+1, i+3));
            geometry.faces.push( new THREE.Face3( i, i+3, i+2));

            geometry.faces.push( new THREE.Face3( i+3, i+1, i));
            geometry.faces.push( new THREE.Face3( i+2, i+3, i));
        }
        geometry.computeFaceNormals();

        var mesh = new THREE.Mesh( geometry, material);
        mesh.drawMode = THREE.TrianglesDrawMode;
        obj.add(mesh);
    }

   addTopBottom(obj, x, y, z, material, largura, comprimento, altura, side){
        'use strict';
        var geometry = new THREE.Geometry();

        geometry.vertices.push(
            new THREE.Vector3( x, y, z),
            new THREE.Vector3( x+altura, y, z)
        );

        for(var i=0; i < comprimento/Math.abs(largura); i=i+2){
            var x1 = geometry.vertices[i].x;
            var z1 = geometry.vertices[i].z;
            var x2 = geometry.vertices[i+1].x;
            var z2 = geometry.vertices[i+1].z;
            geometry.vertices.push(
                new THREE.Vector3( x1, y, z1+largura),
                new THREE.Vector3( x2, y, z2+largura)
            );
            //top
            if(side == 0){
                geometry.faces.push( new THREE.Face3( i, i+1, i+3));
                geometry.faces.push( new THREE.Face3( i, i+3, i+2));
            }
            //bottom
            else if(side == 1){
                geometry.faces.push( new THREE.Face3( i+3, i+1, i));
                geometry.faces.push( new THREE.Face3( i+2, i+3, i));
            }
        }
        geometry.computeFaceNormals();

        var mesh = new THREE.Mesh( geometry, material );
        mesh.drawMode = THREE.TrianglesDrawMode; //default
        obj.add(mesh);
    }

    addLeftRight(obj, x, y, z, material, largura, comprimento, altura, side){
        'use strict';
        var geometry = new THREE.Geometry();

        geometry.vertices.push(
            new THREE.Vector3( x, y, z),
            new THREE.Vector3( x, y-altura, z)
        );

        for(var i=0; i < comprimento/Math.abs(largura); i=i+2){
            var y1 = geometry.vertices[i].y;
            var z1 = geometry.vertices[i].z;
            var y2 = geometry.vertices[i+1].y;
            var z2 = geometry.vertices[i+1].z;

            geometry.vertices.push(
                new THREE.Vector3( x, y1, z1+largura),
                new THREE.Vector3( x, y2, z2+largura)
            );
            //right
            if(side == 0){
                geometry.faces.push( new THREE.Face3( i, i+1, i+3));
                geometry.faces.push( new THREE.Face3( i, i+3, i+2));
            }
            //left
            else if(side == 1){
                geometry.faces.push( new THREE.Face3( i+3, i+1, i));
                geometry.faces.push( new THREE.Face3( i+2, i+3, i));
            }
        }
        geometry.computeFaceNormals();

        var mesh = new THREE.Mesh( geometry, material );
        mesh.drawMode = THREE.TrianglesDrawMode; //default
        obj.add(mesh);
    }

     addNearFar(obj, x, y, z, material, largura, comprimento, altura, side){
        'use strict';

        var geometry = new THREE.Geometry();

        geometry.vertices.push(
            new THREE.Vector3( x, y, z),
            new THREE.Vector3( x, y-altura, z)
        );

        for(var i=0; i < 2*comprimento/Math.abs(largura); i=i+2){
            var x1 = geometry.vertices[i].x;
            var y1 = geometry.vertices[i].y;
            var x2 = geometry.vertices[i+1].x;
            var y2 = geometry.vertices[i+1].y;
            geometry.vertices.push(
                new THREE.Vector3( x1+largura, y1, z),
                new THREE.Vector3( x2+largura, y2, z)
            );

            //near
            if(side == 0){
                geometry.faces.push( new THREE.Face3( i, i+1, i+3));
                geometry.faces.push( new THREE.Face3( i, i+3, i+2));
            }
            //far
            else if(side == 1){
                geometry.faces.push( new THREE.Face3( i+3, i+1, i));
                geometry.faces.push( new THREE.Face3( i+2, i+3, i));
            }
        }
        geometry.computeFaceNormals();

        var mesh = new THREE.Mesh( geometry, material );
        mesh.drawMode = THREE.TrianglesDrawMode; //default
        obj.add(mesh);
    }

    addEstabelizadoresHorizontais(obj, x, y, z, material, largura, comprimento){
        'use strict';
        var geometry = new THREE.Geometry();

        geometry.vertices.push(
            new THREE.Vector3( x, y, z),
            new THREE.Vector3( x, y, z+2)
        );

        for(var i=0; i < 2*comprimento/Math.abs(largura); i=i+2){
            var x1 = geometry.vertices[i].x;
            var z1 = geometry.vertices[i].z;
            var x2 = geometry.vertices[i+1].x;
            var z2 = geometry.vertices[i+1].z;
            geometry.vertices.push(
                new THREE.Vector3( x1+largura, y, z1),
                new THREE.Vector3( x2+largura, y, z2)
            );
            geometry.faces.push( new THREE.Face3( i, i+1, i+3));
            geometry.faces.push( new THREE.Face3( i, i+3, i+2));

            geometry.faces.push( new THREE.Face3( i+3, i+1, i));
            geometry.faces.push( new THREE.Face3( i+2, i+3, i));
        }
        geometry.computeFaceNormals();

        var mesh = new THREE.Mesh( geometry, material);
        mesh.drawMode = THREE.TrianglesDrawMode;
        obj.add(mesh);
    }

    addEstabilizadorVertical(obj, x, y, z, material, largura, comprimento){
        'use strict';
        var geometry = new THREE.Geometry();

        geometry.vertices.push(
            new THREE.Vector3( x, y, z),
            new THREE.Vector3( x, y, z+2)
        );

        for(var i=0; i < 2*comprimento/Math.abs(largura); i=i+2){
            var y1 = geometry.vertices[i].y;
            var z1 = geometry.vertices[i].z;
            var y2 = geometry.vertices[i+1].y;
            var z2 = geometry.vertices[i+1].z;
            geometry.vertices.push(
                new THREE.Vector3( x, y1+largura, z1),
                new THREE.Vector3( x, y2+largura, z2)
            );
            geometry.faces.push( new THREE.Face3( i, i+1, i+3));
            geometry.faces.push( new THREE.Face3( i, i+3, i+2));

            geometry.faces.push( new THREE.Face3( i+3, i+1, i));
            geometry.faces.push( new THREE.Face3( i+2, i+3, i));
        }
        geometry.computeFaceNormals();

        var mesh = new THREE.Mesh( geometry, material );
        mesh.drawMode = THREE.TrianglesDrawMode; //default
        obj.add(mesh);
    }

    rotatePlane(eixo, sentido){
        'use strict';
        if(eixo == 'x'){
            this.traverse(function (child){
                if(child instanceof (THREE.Mesh) || child instanceof (THREE.AxesHelper))
                    child.rotateX((Math.PI/50)*sentido);
            });0
        }
        else if(eixo == 'y'){
            this.traverse(function (child){
                if(child instanceof (THREE.Mesh) || child instanceof (THREE.AxesHelper))
                    child.rotateY((Math.PI/50)*sentido);
            });
        }
    }


    changeMaterial_KeyL(finalMaterial, flagLambert){
      'use strict';
      if(finalMaterial == 'Basic'){
        this.traverse( function(child){
            if (child instanceof (THREE.Mesh)) {
                if(child.material.color.getHex() == 0xFF9999){
                    child.material = materialAsasEstabilizadores_B;
                }
                if(child.material.color.getHex() == 0xFFCCFF){
                    child.material = materialFuselagem_B;
                }
                if(child.material.color.getHex() == 0xF00BC0){
                    child.material = materialCockPit_B;
                }

                child.castShadow = true;
                child.receiveShadow = true;
            }
         });
         return flagLambert;
      }

      else if(finalMaterial == '' & flagLambert == true){
        this.traverse( function(child) {
            if (child instanceof THREE.Mesh) {
                if(child.material.color.getHex() == 0xFF9999){
                    child.material = materialAsasEstabilizadores_L;
                }
                if(child.material.color.getHex() == 0xFFCCFF){
                    child.material = materialFuselagem_L;
                }
                if(child.material.color.getHex() == 0xF00BC0){
                    child.material = materialCockPit_L;
                }

              child.castShadow = true;
              child.receiveShadow = true;
            }
         });
         return true;
      }

      else if(finalMaterial == '' & flagLambert == false){
        this.traverse( function(child) {
            if (child instanceof THREE.Mesh) {
                if(child.material.color.getHex() == 0xFF9999){
                    child.material = materialAsasEstabilizadores_P;
                }
                if(child.material.color.getHex() == 0xFFCCFF){
                    child.material = materialFuselagem_P;
                }
                if(child.material.color.getHex() == 0xF00BC0){
                    child.material = materialCockPit_P;
                }

              child.castShadow = true;
              child.receiveShadow = true;
            }
         });
         return false;
      }
    }

    changeMaterial_KeyG(flagLambert){
      'use strict';
      if(flagLambert == false){
          this.traverse( function(child) {
              if (child instanceof THREE.Mesh) {
                  if(child.material.color.getHex() == 0xFF9999){
                      child.material = materialAsasEstabilizadores_L;
                  }
                  if(child.material.color.getHex() == 0xFFCCFF){
                      child.material = materialFuselagem_L;
                  }
                  if(child.material.color.getHex() == 0xF00BC0){
                      child.material = materialCockPit_L;
                  }
                  child.castShadow = true;
                  child.receiveShadow = true;
              }
           });
      }
      else{
          plane.traverse( function(child) {
              if (child instanceof THREE.Mesh) {
                  if(child.material.color.getHex() == 0xFF9999){
                      child.material = materialAsasEstabilizadores_P;
                  }
                  if(child.material.color.getHex() == 0xFFCCFF){
                      child.material = materialFuselagem_P;
                  }
                  if(child.material.color.getHex() == 0xF00BC0){
                      child.material = materialCockPit_P;
                  }
                  child.castShadow = true;
                  child.receiveShadow = true;
              }
           });
      }

    }
}
