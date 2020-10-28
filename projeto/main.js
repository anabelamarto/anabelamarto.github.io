var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
var renderer = new THREE.WebGLRenderer();0
var controls = new THREE.OrbitControls(camera, renderer.domElement);

var targetCube = null;
var buttons = [];

// Parte II.
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var loadModel = new THREE.GLTFLoader();

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true
document.body.appendChild( renderer.domElement );

camera.position.x = 80;
camera.position.y = 50;
camera.position.z = 180;
camera.lookAt(0,0,0);

loadModel.load(
    'models/bed-vintage.gltf',
    function ( gltf ) {
    scene.add( gltf.scene )

    scene.traverse( function(x) {
        if (x.isMesh) {
            x.castShadow = true;
            x.receiveShadow = true;
            //Part II
            if (x.name == 'Cubo'){
                    targetCube = x;   
            }
            else if (x.name.includes('Botao'));
                buttons.push(x);				
        }

    })
}
)


window.onclick = function(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    // invocar raycaster
    pegarPrimeiro()
    }

function pegarPrimeiro() {
    raycaster.setFromCamera(mouse, camera)
    var intersetados = raycaster.intersectObjects(buttons)
    if (intersetados.length > 0) {
    // fazer o que houver a fazer com o primeiro interesetado
    targetCube.material = intersetados[0].object.material;
    }
    }

var animate = function () {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
};

function addLights(){
    var pointLight = new THREE.PointLight( "white", 1 );
    pointLight.position.set( 500, 80, 10 );
    pointLight.castShadow = true;
    scene.add( pointLight );
    
    var pointLight2 = new THREE.PointLight( "white", 1.5 );
    pointLight2.position.set( 100, 400, 300 );
    scene.add( pointLight2 );

    var pointLight3 = new THREE.PointLight( "white", 0.5 );
    pointLight3.position.set( -300, -300, -300 );
    scene.add( pointLight3 );
}

animate();
addLights();