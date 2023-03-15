import data from "../assets/json/navigation.json"
import * as THREE from "three";
import gsap from "gsap";
import { Mesh } from "three";


export default class Navigation  {
  constructor(world){
    this.planetArr2 = [];

    this.world=world

    data.navigation.forEach((item)=>{

      this.createElementSphere( item.placementZ, item.src)
    });


}//END constructor

  createElementSphere( Z, textureURL){
    const texture = new THREE.TextureLoader().load(textureURL)
    const geometry = this.sphere = new THREE.SphereGeometry(.03);
    const material = new THREE.MeshPhongMaterial({map:texture})
    const newPlanet = new THREE.Mesh(geometry, material)
    
    this.world.scene.add(newPlanet)
    newPlanet.position.set(-4.55, 0.3, Z);
    newPlanet.castShadow = true
    newPlanet.receiveShadow = true

    this.planetArr2.push(newPlanet)

    this.animationgloop(newPlanet)
    

  }

  animationgloop(item) {
    gsap.to(item.rotation, {
      y: Math.PI*2,
      repeat: -1,
      duration: 1,
      ease: "none"
    })
  }


}//END class