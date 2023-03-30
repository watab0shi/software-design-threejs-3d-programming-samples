import { gsap } from 'gsap';
import * as THREE from 'three';
import { SnowGroup } from './SnowGroup';

class App {
    constructor() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('canvas'),
            antialias: true
        });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor('#000000');

        this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
        this.camera.position.z = 3;

        this.group = new SnowGroup();

        this.light = new THREE.PointLight('#ffffff');
        this.light.position.x = 0.5;
        this.light.position.y = 0.5;
        this.light.position.z = 2.5;

        this.scene = new THREE.Scene();
        this.scene.add(this.group);
        this.scene.add(this.light);

        this.clock = new THREE.Clock();

        requestAnimationFrame(this.render.bind(this));

        this.enter();
    }

    enter() {
        const from = new THREE.Vector3(0, 0, 0);
        const to = new THREE.Vector3(1, 1, 1);
        gsap.fromTo(this.group.scale, from, { ...to, ease: 'back.out', duration: 1.5 });
    }

    render() {
        const seconds = this.clock.getElapsedTime();
        this.group.rotation.y = seconds * Math.PI * 0.25;
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }
}

export { App };