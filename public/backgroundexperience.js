// const canvas3d = document.getElementById("canvas3d");

let scene, camera, renderer, cube;
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    renderer = new THREE.WebGLRenderer(
        // { canvas3d },
        { alpha: true },
        { antialias: true }
    );
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    // var controls = new THREE.OrbitControls(camera, renderer.domElement);
    const geometry = new THREE.BoxGeometry(5, 5, 5);
    var url =
        "https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg";
    console.log("url", url);

    const textureLoader = new THREE.TextureLoader();

    textureLoader.crossOrigin = "Anonymous";

    const myTexture = textureLoader.load(url);
    const material = new THREE.MeshBasicMaterial({
        map: myTexture
        // opacity: 0.5,
        // transparent: true
    });

    const color = "rgb(255, 0, 0)";
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-10, 2, 4);
    light.castShadow = true;

    console.log(light);
    cube = new THREE.Mesh(geometry, material, 100, 100, 100);

    scene.add(cube);

    scene.add(light);
    camera.position.z = 10;
}

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize, false);

init();
animate();
