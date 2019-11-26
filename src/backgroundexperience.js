const canvas3d = document.getElementById("canvas3d");

let scene, camera, renderer, cube, textOrb;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    renderer = new THREE.WebGLRenderer(
        { canvas3d },
        { alpha: true },
        { antialias: true }
    );
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(10, 10, 10);
    var url =
        "https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg";
    const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = "Anonymous";
    const cubeTexture = textureLoader.load(url);
    const material = new THREE.MeshBasicMaterial({
        map: cubeTexture
    });

    // const geometryOrb = new THREE.BoxGeometry(11, 11, 11);
    // const orbTexture = textureLoader.load(
    //     "https://1.bp.blogspot.com/-HyT2Heozmyk/WCyjOl7ikUI/AAAAAAAAAeI/eh5bHhAnF9Aau_pBkcMWrp9XepX5PMFZQCLcB/s1600/PicsArt_11-16-11.19.43.png"
    // );
    // const textmaterial = new THREE.MeshBasicMaterial({
    //     map: orbTexture
    // });
    // textOrb = new THREE.Mesh(geometryOrb, textmaterial);
    const color = "rgb(255, 0, 0)";
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-10, 2, 4);
    light.castShadow = true;

    cube = new THREE.Mesh(geometry, material);

    scene.add(cube);
    // scene.add(textOrb);

    scene.add(light);
    camera.position.z = 10;
}

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    // textOrb.rotation.x += 0.05;
    // textOrb.rotation.y += 0.05;
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
