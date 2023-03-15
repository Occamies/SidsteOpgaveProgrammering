import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import World from "./World";
import { DoubleSide } from "three";
import gsap from "gsap";
import Navigation from "./Navigation";

import Rotation from "./rotation";

export default class Po {
  constructor() {
    const scene = new THREE.Scene();

    const world = new World({
      showCameraPos: false,
      setCameraPos: [-5.15, 0.6, 0.0],
      showGrid: false,
      ambientLight: true,
      orbitControl: true,
      showFloor: false,
    });

    //*sky  */
    let backgroundSphere = new THREE.Mesh(
      new THREE.SphereGeometry(60, 20, 10),
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("../assets/bg.jpg"),
        side: DoubleSide,
      })
    );
    world.scene.add(backgroundSphere);
    //*END sky  */

    //*3d model*/
    const loader = new GLTFLoader();
    loader.load("../assets/3dmodels/scene.gltf", (gltf) => {
      let model = gltf.scene;
      model.position.set(-5, -1, 0);
      model.rotation.set(0, Math.PI/2,0)
      world.scene.add(model);
      model.traverse((n)=>{
        if(n.isMesh) {
          n.castShadow = true;
          n.receiveShadow = true
        }
      })
    });
    //*END 3d model*/

    new Navigation(world);
    
    //*camera*/
    //world.camera.rotation.set(0,Math.PI*1.5,0) /* base rotation */
    //world.camera.rotation.set(0,Math.PI*1.2,0) /* min rotation */
    //world.camera.rotation.set(0,Math.PI*1.8,0) /* max rotation */
    //*END camera*/
  } //END constructor
} //END class
