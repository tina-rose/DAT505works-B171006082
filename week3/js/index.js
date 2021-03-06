var container, stats;
var camera, scene, raycaster, renderer;

var mouse = new THREE.Vector2(), INTERSECTED;
var radius = 100, theta = 0;
var object;
var controls;
var objects = [];
	var myMaterials;
	var texte1 = new THREE.TextureLoader().load( '3d66Model-497572-3-44.jpg' );   
	var texte2 = new THREE.TextureLoader().load( '3d66Model-497572-8-44.jpg' );   
	var texte3 = new THREE.TextureLoader().load( '3d66Model-497572-10-44.jpg' );   

init();
animate();

function init() {
  container = document.createElement( 'div' );
  document.body.appendChild( container );

  camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set( 0, 0, 20 );                                                              
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xf0f0f0 );

  var light = new THREE.DirectionalLight( 0xffffff, 1 );
  light.position.set( 1, 1, 1 ).normalize();
  scene.add( light );

  var geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );
	
  // Model/material loading!
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.load("1.mtl", function(materials){
	materials.preload();
	for (var key in materials.materials){
		materials.materials[key].side = THREE.DoubleSide;
	}
		myMaterials = materials.materials["wire_224198087"];
		myMaterials.map = texte1;
		
    var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(materials);

  		objLoader.load("1.obj", function(mesh){
  			
  			mesh.children[0].geometry.center(); 
  			mesh.traverse(function(node){
  				if( node instanceof THREE.Mesh ){
  					node.castShadow = true;
  					node.receiveShadow = true;
  				}
  			});
        mesh.scale.set(1,1,1);
        mesh.position.set(0,0,0);
        mesh.rotation.x = 0.6;

        scene.add(mesh);
        objects.push(mesh); 
  		});
  	});

  raycaster = new THREE.Raycaster();

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );





  //stats = new Stats();
  //container.appendChild( stats.dom );
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
//  document.addEventListener( 'mousedown', onDocumentMouseDown, false );
  window.addEventListener( 'resize', onWindowResize, false );
}



function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove( event ) {
  event.preventDefault();
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function onDocumentMouseDown( event ) {
  var intersects = raycaster.intersectObjects( objects, true);
  if(intersects.length > 0){
    intersects[0].object.material.color.set(Math.random()*0xffffff);
  }
}

//
function animate() {
  requestAnimationFrame( animate );
  render();
  //stats.update();
}

function render() {
  //Auto rotate camera

  /*
  theta += 0.1;
  camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
  camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
  camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
  camera.lookAt( scene.position );
  camera.updateMatrixWorld();
*/
  //Find intersections
  raycaster.setFromCamera( mouse, camera );
  //var intersects = raycaster.intersectObjects( scene.children );
/*
  var intersects = raycaster.intersectObjects( objects, true );

  if ( intersects.length > 0 ) {
    if ( INTERSECTED != intersects[ 0 ].object ) {
      if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
      INTERSECTED = intersects[ 0 ].object;
      INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
      INTERSECTED.material.emissive.setHex( 0xff0000 );
    }
  } else {
    if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
    INTERSECTED = null;
  }
  */
  renderer.render( scene, camera );
}
