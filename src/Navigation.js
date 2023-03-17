import data from "../assets/json/navigation.json";
import * as THREE from "three";
import gsap from "gsap";

import { Mesh } from "three";
import { interactiveTarget } from "pixi.js";

export default class Navigation {
  constructor(world) {
    this.planetArr2 = [];

    this.world = world;

    data.navigation.forEach((item, index) => {
      this.createElementSphere(item.placementZ, item.src, index);
    });

    const spotLight = new THREE.SpotLight(0x0ae7f7);
    spotLight.position.set(-5.15, .2, 0);
    spotLight.castShadow = true;
    spotLight.shadow.camera.near = .01;
    spotLight.shadow.camera.far = .01;
    spotLight.shadow.camera.fov = 10;

    this.world.scene.add(spotLight);
  } //END constructor

  createElementSphere(Z, textureURL, index) {
    const texture = new THREE.TextureLoader().load(textureURL);
    const geometry = (this.sphere = new THREE.SphereGeometry(0.03));
    const material = new THREE.MeshPhongMaterial({ map: texture });
    const newPlanet = new THREE.Mesh(geometry, material);

    this.world.scene.add(newPlanet);
    newPlanet.position.set(-4.55, 0.3, Z);
    newPlanet.castShadow = false;
    newPlanet.receiveShadow = false;

    this.animationgloop(newPlanet);
    this.world.InteractionManager.add(newPlanet);

    this.counter = 0;
    this.planetArr2.push = newPlanet
    const activePlanetArr = [];

    newPlanet.addEventListener("mousedown", (item) => {
      if (this.counter == 0) {
        activePlanetArr.push(index);
        this.growAnimation(item);
        this.counter++;
      } else if (this.counter != 0 && activePlanetArr.length != 0) {
        this.shrinkAnimaktion(item, data.navigation[index].placementZ);
        activePlanetArr.pop();
        this.counter = 0;
      }
    });
  }

  animationgloop(item) {
    gsap.to(item.rotation, {
      y: Math.PI * 2,
      repeat: -1,
      duration: 5,
      ease: "none",
    });
  }

  growAnimation(item) {
    gsap.to(item.target.scale, {
      duration: 1,
      x: 3,
      y: 3,
      z: 3,
    });
    gsap.to(item.target.position, {
      x: -4.55,
      y: 0.5,
      z: 0,
    });
  }

  shrinkAnimaktion(item, Z) {
    gsap.to(item.target.scale, {
      duration: 1,
      x: 1,
      y: 1,
      z: 1,
    });
    gsap.to(item.target.position, {
      x: -4.55,
      y: 0.3,
      z: Z,
    });
  }
} //END class
