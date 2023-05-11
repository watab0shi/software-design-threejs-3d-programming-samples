import { gsap } from 'gsap';
import * as THREE from 'three';
import { SnowGroup } from './SnowGroup';
import vertexShader from './glsl/shader.vert';
import fragmentShader from './glsl/shader.frag';

class App {
    constructor() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('canvas'),
            antialias: true
        });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor('#000000');

        const aspect = this.width / this.height;
        this.camera = new THREE.PerspectiveCamera(45, aspect, 1, 1000);
        this.resetCamera();

        this.group = new SnowGroup();
        this.group.setSize(this.width * 0.2);

        this.scroller = new THREE.Group();
        this.scroller.position.y = window.scrollY;
        this.scroller.add(this.group);

        this.light = new THREE.PointLight('#ffffff');
        this.light.position.z = this.width * 0.15;
        this.lightTarget = new THREE.Vector3(0, 0, this.light.position.z);

        const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);
        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0.0 },
            },
            vertexShader,
            fragmentShader,
            depthTest: false,
            // wireframe: true
        })
        this.planeMesh = new THREE.Mesh(geometry, material);
        this.planeMesh.scale.set(this.width, this.height);
        this.planeMesh.renderOrder = -1;

        this.scene = new THREE.Scene();
        this.scene.add(this.scroller);
        this.scene.add(this.light);
        this.scene.add(this.planeMesh);

        this.clock = new THREE.Clock();

        requestAnimationFrame(this.render.bind(this));

        this.enter();

        window.addEventListener('resize', this.onResize.bind(this));
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
        window.addEventListener('scroll', this.onScroll.bind(this));
    }

    onScroll() {
        this.scroller.position.y = window.scrollY;
    }

    onMouseMove(event) {
        const { clientX, clientY } = event;
        const glX = clientX - (this.width / 2);
        const glY = (this.height / 2) - clientY;
        this.lightTarget.set(glX, glY, this.light.position.z);
    }

    onResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.group.setSize(this.width * 0.2);
        this.light.position.z = this.width * 0.15;
        this.planeMesh.scale.set(this.width, this.height);
        this.resetCamera();
        this.renderer.setSize(this.width, this.height);
    }

    resetCamera() {
        const halfFovRad = THREE.MathUtils.degToRad(this.camera.fov / 2);
        const dist = (this.height / 2) / Math.tan(halfFovRad);
        this.camera.aspect = this.width / this.height;
        this.camera.position.z = dist;
        this.camera.far = dist * 2;
        this.camera.updateProjectionMatrix();
    }

    enter() {
        const from = new THREE.Vector3(0, 0, 0);
        const to = new THREE.Vector3(1, 1, 1);
        gsap.fromTo(this.group.scale, from, { ...to, ease: 'back.out', duration: 1.5 });
    }

    render() {
        this.light.position.lerp(this.lightTarget, 0.1);
        const seconds = this.clock.getElapsedTime();
        this.planeMesh.material.uniforms.uTime.value = seconds;
        this.group.rotation.y = seconds * Math.PI * 0.25;
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }
}

export { App };