import * as THREE from 'three';

// extendsでGroupクラスを継承
class SnowBranchGroup extends THREE.Group {
  constructor() {
    super();

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
        color: '#ffffff'
    });

    // 枝の軸となる直方体
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(1.5, 0.05, 0.05);
    this.add(mesh);

    // 枝の軸から垂直に伸びる直方体
    for (let i = 0; i < 3; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = i * 0.15 + 0.3;
        mesh.scale.set(0.05, 0.375 - i * 0.05, 0.05);
        this.add(mesh);
    }
  }
}

export { SnowBranchGroup };