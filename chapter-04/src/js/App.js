import { gsap } from 'gsap';
import * as THREE from 'three';
import { SnowGroup } from './SnowGroup';

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

        // スクロール追従させたい3Dオブジェクトをグループにまとめる
        this.scroller = new THREE.Group();
        // スクロール復元時にズレないように初期化時点のスクロール位置を反映しておく
        this.scroller.position.y = window.scrollY;
        this.scroller.add(this.group);

        this.light = new THREE.PointLight('#ffffff');
        // 変化をわかりやすくするためにライトを近づける
        this.light.position.z = this.width * 0.15;
        // ライト座標の目標地点
        this.lightTarget = new THREE.Vector3(0, 0, this.light.position.z);

        this.scene = new THREE.Scene();
        // groupの代わりにscrollerをsceneに追加する
        this.scene.add(this.scroller);
        this.scene.add(this.light);

        this.clock = new THREE.Clock();

        requestAnimationFrame(this.render.bind(this));

        this.enter();

        // ウィンドウリサイズ時のイベントリスナーを登録
        window.addEventListener('resize', this.onResize.bind(this));
        // マウス移動時のイベントリスナーを登録
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
        // スクロール時のイベントリスナーを登録
        window.addEventListener('scroll', this.onScroll.bind(this));
    }

    // スクロールイベント
    onScroll() {
        // スクロール用グループの位置を更新
        this.scroller.position.y = window.scrollY;
    }

    // マウス移動時のイベント
    onMouseMove(event) {
        // マウス座標
        const { clientX, clientY } = event;
        // ① ウィンドウ座標からWebGL座標に変換
        const glX = clientX - (this.width / 2);
        const glY = (this.height / 2) - clientY;
        // ライト座標に直接代入せず目標値のみ更新する
        this.lightTarget.set(glX, glY, this.light.position.z);
    }

    // ウィンドウリサイズ時のイベント
    onResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.group.setSize(this.width * 0.2);
        // 変化をわかりやすくするためにライトを近づける
        this.light.position.z = this.width * 0.15;
        this.resetCamera();
        this.renderer.setSize(this.width, this.height);
    }

    // カメラ再設定
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
        // ① ライト座標を簡易的なイーズアウトで目標地点に10%ずつ近づける
        this.light.position.lerp(this.lightTarget, 0.1);
        const seconds = this.clock.getElapsedTime();
        this.group.rotation.y = seconds * Math.PI * 0.25;
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }
}

export { App };