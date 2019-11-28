import React from "react";
let scene, camera, renderer, cube, url;
export default class ThreeDRender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.animate = this.animate.bind(this);
        this.init = this.init.bind(this);
    }
    init() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        renderer = new THREE.WebGLRenderer(
            { alpha: true },
            { antialias: true }
        );
        renderer.setSize(window.innerWidth, window.innerHeight);

        const geometry = new THREE.BoxGeometry(5, 5, 5);
        if (!this.props || !this.props.imageurl) {
            url =
                "https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg";
        } else {
            url = this.props.imageurl;
        }

        const textureLoader = new THREE.TextureLoader();
        textureLoader.crossOrigin = "Anonymous";
        const myTexture = textureLoader.load(url);
        const material = new THREE.MeshBasicMaterial({
            map: myTexture
        });

        const color = "rgb(255, 0, 0)";
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-10, 2, 4);
        light.castShadow = true;

        cube = new THREE.Mesh(geometry, material, 100, 100, 100);

        scene.add(cube);

        scene.add(light);
        camera.position.z = 10;
        document.body.appendChild(renderer.domElement);
    }
    onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    animate() {
        requestAnimationFrame(this.animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    render() {
        window.addEventListener("resize", this.onWindowResize, false);

        this.init();
        this.animate();
        return <div id="canvas3dcontainer"></div>;
    }
}

// <canvas id="canvas3d"> </canvas>
