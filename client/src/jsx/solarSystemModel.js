import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


export class SolarSystemModel extends Component {

    componentDidMount() {
        // Auto initialize all the things!
        M.AutoInit();


        const scene = new THREE.Scene();
        const aspect = window.innerWidth / window.innerHeight;
        const camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 10000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });


        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        camera.position.z = 4000;
        var controls = new OrbitControls(camera);
        controls.mouseButtons = {
            RIGHT: THREE.MOUSE.RIGHT,
            MIDDLE: THREE.MOUSE.MIDDLE,
            LEFT: THREE.MOUSE.LEFT
        };

        let planets = [];
        let textures = [];
        let rotations = [];

        function genPlanets(diameter, texture, rotationSpeed) {

            planets.push(new THREE.SphereGeometry(diameter, 35, 35));
            textures.push(new THREE.TextureLoader().load(texture));
            rotations.push(rotationSpeed);

        };


        genPlanets(1392, "./img/sunmap.jpg", 0.005);
        genPlanets(5, "./img/mercurymap.jpg", 0.047);
        genPlanets(12, "./img/venusmap.jpg", -0.035);
        genPlanets(13, "./img/earthmap.jpg", 0.029);
        genPlanets(7, "./img/marsmap.jpg", 0.024);
        genPlanets(143, "./img/jupitermap.jpg", 0.013);
        genPlanets(125, "./img/saturnmap.jpg", 0.009);
        genPlanets(51, "./img/uranusmap.jpg", 0.006);
        genPlanets(50, "./img/neptunemap.jpg", 0.005);


        const sun = planets[0];
        const mercury = planets[1];
        const venus = planets[2];
        const earth = planets[3];
        const mars = planets[4];
        const jupiter = planets[5];
        const saturn = planets[6];
        const uranus = planets[7];
        const neptune = planets[8];


        var sunTexture = textures[0];
        var mercuryTexture = textures[1];
        var venusTexture = textures[2];
        var earthTexture = textures[3];
        var marsTexture = textures[4];
        var jupiterTexture = textures[5];
        var saturnTexture = textures[6];
        var uranusTexture = textures[7];
        var neptuneTexture = textures[8];

        let material = [];

        function mapMaterial(Texture) {
            material.push(new THREE.MeshBasicMaterial({
                map: Texture
            }));
        };

        mapMaterial(sunTexture);
        mapMaterial(mercuryTexture);
        mapMaterial(venusTexture);
        mapMaterial(earthTexture);
        mapMaterial(marsTexture);
        mapMaterial(jupiterTexture);
        mapMaterial(saturnTexture);
        mapMaterial(uranusTexture);
        mapMaterial(neptuneTexture);


        let mesh = [];

        function makeMesh(planet, material) {
            mesh.push(new THREE.Mesh(planet, material));
        }

        makeMesh(sun, material[0]);
        makeMesh(mercury, material[1]);
        makeMesh(venus, material[2]);
        makeMesh(earth, material[3]);
        makeMesh(mars, material[4]);
        makeMesh(jupiter, material[5]);
        makeMesh(saturn, material[6]);
        makeMesh(uranus, material[7]);
        makeMesh(neptune, material[8]);

        scene.add(mesh[0], mesh[1], mesh[2], mesh[3], mesh[4], mesh[5], mesh[6], mesh[7], mesh[8]);



        const render = function () {
            requestAnimationFrame(render);

            mesh[0].position.set(-2000, 0, 0);
            mesh[1].position.set(-300, 0, 0);
            mesh[2].position.set(-200, 0, 0);
            mesh[3].position.set(-100, 0, 0);
            mesh[4].position.set(0, 0, 0);
            mesh[5].position.set(300, 0, 0);
            mesh[6].position.set(700, 0, 0);
            mesh[7].position.set(1000, 0, 0);
            mesh[8].position.set(1200, 0, 0);


            mesh[0].rotation.y += rotations[0];
            mesh[1].rotation.y += rotations[1];
            mesh[2].rotation.y += rotations[2];
            mesh[3].rotation.y += rotations[3];
            mesh[4].rotation.y += rotations[4];
            mesh[5].rotation.y += rotations[5];
            mesh[6].rotation.y += rotations[6];
            mesh[7].rotation.y += rotations[7];
            mesh[8].rotation.y += rotations[8];


            // required if controls.enableDamping or controls.autoRotate are set to true
            controls.update();

            renderer.render(scene, camera);
        }



        render();
    }




    render() {

        return (
            <div className="container">
                <p>Controls - Right Mouse = Pan Camera, Left Mouse = Orbit Camera, Mouse Wheel = Zoom</p>
            </div>
        )
    }
};

export default SolarSystemModel;
