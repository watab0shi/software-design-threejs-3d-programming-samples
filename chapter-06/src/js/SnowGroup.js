import * as THREE from 'three';
import { SnowBranchGroup } from './SnowBranchGroup';

// extendsでGroupクラスを継承
class SnowGroup extends THREE.Group {
  constructor() {
    super();

    // ひとつ分の枝を60°ずつ回転させながらグループに追加
    for (let i = 0; i < 6; i++) {
      const branch = new SnowBranchGroup();
      branch.rotation.z = i * (Math.PI / 3) - Math.PI / 2;
      this.add(branch);
    }
  }

  setSize(size) {
    this.children.forEach((branch) => {
      branch.scale.setScalar(size);
    })
  }
}

export { SnowGroup };