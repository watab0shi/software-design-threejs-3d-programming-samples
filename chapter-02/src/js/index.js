import * as THREE from 'three';
import { SnowGroup } from './SnowGroup';

const init = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('canvas'),
        antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor('#000000');

    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.z = 3;

    const group = new SnowGroup();// 雪の結晶グループを作成
    group.rotation.x = Math.PI * 0.2;
    group.rotation.y = Math.PI * 0.25;

    const light = new THREE.PointLight('#ffffff');
    light.position.x = 0.5;
    light.position.y = 0.5;
    light.position.z = 2.5;

    const scene = new THREE.Scene();
    scene.add(group);
    scene.add(light);

    renderer.render(scene, camera);
}

if (document.readyState === 'complete') {
    init()
} else {
    document.addEventListener('DOMContentLoaded', init)
}