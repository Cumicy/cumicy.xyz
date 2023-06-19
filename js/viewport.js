            import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
            import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js'
            import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js'
            import Stats from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/libs/stats.module.js'


var container;
var camera, controls, scene;
var oldObject;
var newObject;
var renderer;



var mouseX = 0;
var mouseY = 0;
var targetX = 0;
var targetY = 0;
var windowHalfX = 500 / 2;
var windowHalfY = 500 / 2;


let fps = 0;
let lastTime = Date.now();


var style = [
  'background-image: url("https://ongezell.com/hello.png")',
  'background-size: contain',
  'background-repeat: no-repeat',
  'color: #000',
  'padding: 20px 20px',
  'line-height: 0px'
  ].join(';');


const hoverAmplitude = 0.1;

const hoverFrequency = 0.3;

let hoverRotation = 0;





var x = window.matchMedia("(max-width: 500px)")

init();
animate();

function init() {
  container = document.getElementById("container");
  scene = new THREE.Scene();
  


  renderer = new THREE.WebGLRenderer( { canvas: artifactCanvas, 
    alpha: true , antialias: true } );
  container.appendChild(renderer.domElement);
  
  
  

camera = new THREE.PerspectiveCamera(1000, 1600 / 900, 0.1, 100);
  camera.position.set(0.8, -2, 4);

  document.addEventListener("mousemove", onDocumentMouseMove, false);
} 


var loader = new THREE.GLTFLoader();
loader.crossOrigin = true;
loader.load("asset/kumicy.gltf", function( gltf ) {

    var objectGroup = gltf.scene.children[0];
    const textureLoader = new THREE.TextureLoader();

     objectGroup.traverse((node) => {
      if (!node.isMesh) return;

    
      

  });



  objectGroup.rotation.x = 55;
  objectGroup.rotation.y = 0;
  objectGroup.rotation.z = -100;

  newObject = new THREE.Object3D();
  
  newObject.add(objectGroup);



  
  
  objectGroup.scale.y = 0.9;
  objectGroup.scale.z = 0.9;



  



  
  scene.add(newObject);
});



var light = new THREE.PointLight( 0xFFFFFF  , 4, 70 );
light.position.set( 20, 50, 50 );
scene.add( light );


var light2 = new THREE.AmbientLight( 0x9c9899  , 1.5);
scene.add( light2 );
//object 2



function render() {
  targetX = mouseX * -0.001;
  targetY = mouseY * -0.001;

  if (newObject) {
    newObject.rotation.y += 0.05 * (targetX - newObject.rotation.y);
    newObject.rotation.x += 0.05 * (targetY - newObject.rotation.x);
    
    const time = Date.now() / 1000;
    hoverRotation = hoverAmplitude * Math.sin(time * Math.PI * hoverFrequency);

    newObject.position.y = hoverRotation;


    
    
  }

  renderer.render(scene, camera);
   
}

function animate() {
  fps = 1000 / (Date.now() - lastTime);
  lastTime = Date.now();

  if (fps < 35) {
     renderer.setSize(1200 / 2, 720 / 2 ,false);
  } else if ( fps < 25 ) {
        renderer.setSize(1200 / 3, 720 /3 ,false);
  } else {
    
    renderer.setSize(1200, 720 ,false);
}
  requestAnimationFrame(animate);
  render()
}

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

THREE.DefaultLoadingManager.onLoad = function() {
console.log('%chorray', 'color:white;font-size:20px;');
console.log('%c ', style);
  container.classList.add("loaded");
};






