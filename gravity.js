import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.135/build/three.module.js';

export function fall(object) 
    {
    // let vec3 = new THREE.Vector3(object.position);
    // let rotation = object.rotation;

    object.rotation.y += 0.01;
    object.rotation.x += 0.01;

    //object.position.set(vec3);
  }

export function HelloConsole(string)
{
    console.log(string);
}