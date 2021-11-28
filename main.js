import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.135/build/three.module.js';
import {fall} from "./gravity.js"

import {
  OrbitControls
} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

    let _threejs;
    let _camera;
    let _scene;

    _threejs = new THREE.WebGLRenderer({
      antialias: true,
    });
    _threejs.shadowMap.enabled = true;
    _threejs.shadowMap.type = THREE.PCFSoftShadowMap;
    _threejs.setPixelRatio(window.devicePixelRatio);
    _threejs.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(_threejs.domElement);

    window.addEventListener('resize', () => {
      _OnWindowResize();
    }, false);

    const fov = 60;
    const aspect = 1920 / 1080;
    const near = 1.0;
    const far = 1000.0;
    _camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    _camera.position.set(75, 20, 0);

    _scene = new THREE.Scene();

    let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light.position.set(20, 100, 10);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.bias = -0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.left = 100;
    light.shadow.camera.right = -100;
    light.shadow.camera.top = 100;
    light.shadow.camera.bottom = -100;
    _scene.add(light);

    light = new THREE.AmbientLight(0x101010);
    _scene.add(light);

    const controls = new OrbitControls(
      _camera, _threejs.domElement);
    controls.target.set(0, 20, 0);
    controls.update();

    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
      './Models/Skybox/skycube_1/skyrender0001.bmp', //✔️
      './Models/Skybox/skycube_1/skyrender0004.bmp', //✔️//✔️
      './Models/Skybox/skycube_1/skyrender_top.bmp', //✔️
      './Models/Skybox/skycube_1/skyrender_bottom.bmp', //✔️
      './Models/Skybox/skycube_1/skyrender0005.bmp', //✔️
      './Models/Skybox/skycube_1/skyrender0002.bmp', //✔️
    ]);
    _scene.background = texture;

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100, 10, 10),
      new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
      }));
    plane.castShadow = false;
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI / 2;
    _scene.add(plane);
    
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(5, 200, 100, 100),
      new THREE.MeshStandardMaterial( { 
        color: 0xFFFFFF,
       } )
    );
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    sphere.position.set(0, 20, 0);


    _scene.add(sphere);

    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial( {
        color: 0x00ff00,
      })
      );
    cube.position.set(0, 20, 20);
    cube.castShadow = true;
    cube.receiveShadow = true;
    

    _scene.add(cube);

    _RAF();
  

  function _OnWindowResize() {
    _camera.aspect = window.innerWidth / window.innerHeight;
    _camera.updateProjectionMatrix();
    _threejs.setSize(window.innerWidth, window.innerHeight);
  }

  function _RAF() {
    requestAnimationFrame(() => {
      fall(cube);
      // sphere.rotation.x += 1;
      _threejs.render(_scene, _camera);
      _RAF();
    });
  }
