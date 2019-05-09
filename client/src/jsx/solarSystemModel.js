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
        const camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 10000); // 4th argument sets the clipping distance.
        const renderer = new THREE.WebGLRenderer({ antialias: true });

        // let height = document.getElementsByTagName("nav");
        // let width = document.getElementsByTagName("nav").clientHeight;

        // console.log(height, width);

        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('scene').appendChild(renderer.domElement);
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


        const sunModel = planets[0];
        const mercuryModel = planets[1];
        const venusModel = planets[2];
        const earthModel = planets[3];
        const marsModel = planets[4];
        const jupiterModel = planets[5];
        const saturnModel = planets[6];
        const uranusModel = planets[7];
        const neptuneModel = planets[8];


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

        makeMesh(sunModel, material[0]);
        makeMesh(mercuryModel, material[1]);
        makeMesh(venusModel, material[2]);
        makeMesh(earthModel, material[3]);
        makeMesh(marsModel, material[4]);
        makeMesh(jupiterModel, material[5]);
        makeMesh(saturnModel, material[6]);
        makeMesh(uranusModel, material[7]);
        makeMesh(neptuneModel, material[8]);

        let sun = mesh[0]
        let mercury = mesh[1]
        let venus = mesh[2]
        let earth = mesh[3]
        let mars = mesh[4]
        let jupiter = mesh[5]
        let saturn = mesh[6]
        let uranus = mesh[7]
        let neptune = mesh[8]

        scene.add(sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune);



        const render = function () {
            requestAnimationFrame(render);

            sun.position.set(-2000, 0, 0);
            mercury.position.set(-300, 0, 0);
            venus.position.set(-200, 0, 0);
            earth.position.set(-100, 0, 0);
            mars.position.set(0, 0, 0);
            jupiter.position.set(300, 0, 0);
            saturn.position.set(700, 0, 0);
            uranus.position.set(1000, 0, 0);
            neptune.position.set(1200, 0, 0);


            sun.rotation.y += rotations[0];
            mercury.rotation.y += rotations[1];
            venus.rotation.y += rotations[2];
            earth.rotation.y += rotations[3];
            mars.rotation.y += rotations[4];
            jupiter.rotation.y += rotations[5];
            saturn.rotation.y += rotations[6];
            uranus.rotation.y += rotations[7];
            neptune.rotation.y += rotations[8];


            // required if controls.enableDamping or controls.autoRotate are set to true
            controls.update();

            renderer.render(scene, camera);
        }



        render();
    }




    render() {

        return (
            <div className="controls">
                <div className="row">
                    <div className="col s6 offset-s5">
                        <blockquote> <p className="flow-text controlText">Controls </p>
                            <p className="flow-text controlText"> Right Mouse = Pan Camera, </p>
                            <p className="flow-text controlText">Left Mouse = Orbit Camera, </p>
                            <p className="flow-text controlText">Mouse Wheel = Zoom</p> </blockquote>

                    </div>





                </div>


                <div className="row">
                    <div className="col s12">
                        <div id="scene"> </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default SolarSystemModel;
