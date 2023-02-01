import * as THREE from 'three';

const init = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('canvas'),
        antialias: true
    });
    renderer.setSize(width, height);// レンダリングする画面サイズ
    renderer.setPixelRatio(window.devicePixelRatio);// ディスプレイのピクセル比率
    renderer.setClearColor('#000000');// 背景色

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.z = 3;// カメラを手前に引く

    // メッシュを作成
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
        color: '#ffffff'
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = Math.PI * 0.2;// X軸回転
    mesh.rotation.y = Math.PI * 0.25;// Y軸回転

    // ライトを作成
    const light = new THREE.PointLight('#ffffff');
    // ライトを手前右上に移動
    light.position.x = 0.5;
    light.position.y = 0.5;
    light.position.z = 2.5;

    // シーンにメッシュとライトを追加
    const scene = new THREE.Scene();
    scene.add(mesh);
    scene.add(light);

    // カメラで撮影したシーンをcanvas要素に描画
    renderer.render(scene, camera);
}

if (document.readyState === 'complete') {
    init()
} else {
    document.addEventListener('DOMContentLoaded', init)
}