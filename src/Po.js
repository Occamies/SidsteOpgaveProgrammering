import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import World from "./World";
import { DoubleSide } from "three";
import gsap from "gsap";

export default class Po {
  constructor() {
    const scene = new THREE.Scene();

    const world = new World({
      showCameraPos: true,
      setCameraPos: [-5, 0.6, 0],
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
      model.rotation.set(0,-5,0)
      world.scene.add(model);
    });
    //*END 3d model*/

world.camera.rotation.set(0,-10.5,0)
    
    //*camera*/
    //*END camera*/
  } //END constructor
} //END class
