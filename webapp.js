var renderer = Detector.webgl ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();


var width  = window.innerWidth;
var height = window.innerHeight;

renderer.setSize(width, height);

var webglEl = document.getElementById('sphere');
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(100, width / height, 1, 1000);
camera.position.x = 0.1;

/* Creates a sphere and texturemaps the projection onto the sphere */
var sphere = new THREE.Mesh(
	new THREE.SphereGeometry(120, 40, 40),
	new THREE.MeshBasicMaterial({
		map: THREE.ImageUtils.loadTexture("./upload/"+imageFile)
	})
);

sphere.scale.x = -1;
scene.add(sphere);

var cube = new THREE.Mesh( new THREE.BoxGeometry( 15, 15, 15 ), new THREE.MeshBasicMaterial({color: "rgb(0,200,200)"}) );
cube.position.y = 0;
cube.position.x = 50;
scene.add( cube );

function toggleCube() {
	cube.visible = !cube.visible;
}

var button = document.getElementById('button');
button.addEventListener('click', toggleCube);

var controls = new THREE.OrbitControls(camera);
controls.noPan = true;
controls.noZoom = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;
webglEl.appendChild(renderer.domElement);
render();

function render() {
	controls.update();
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}

init();

function init() {
	stars();
}

function stars() {
	var starQty = 60000;
	var geometry = new THREE.SphereGeometry(1000, 100, 50);

	materialOptions = {
		size: 1.0,
		transparency: true,
		opacity: 0.7
	};

	starStuff = new THREE.PointCloudMaterial(materialOptions);

	for (var i = 0; i < starQty; i++) {

		var starVertex = new THREE.Vector3();
		starVertex.x = Math.random() * 2000 - 1000;
		starVertex.y = Math.random() * 2000 - 1000;
		starVertex.z = Math.random() * 2000 - 1000;

		geometry.vertices.push(starVertex);
	}

	stars = new THREE.PointCloud(geometry, starStuff);
	scene.add(stars);
}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}


window.addEventListener( 'resize', onWindowResize, false );
