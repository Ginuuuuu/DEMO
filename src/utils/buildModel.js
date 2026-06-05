import * as THREE from 'three';

export function buildModel(type, colorHex) {
  const group = new THREE.Group();
  const c = new THREE.Color(colorHex);
  const mat = new THREE.MeshPhongMaterial({ color: c.clone(), shininess: 22, specular: new THREE.Color(0x333333) });
  const dkMat = new THREE.MeshPhongMaterial({ color: c.clone().multiplyScalar(0.55), shininess: 35 });
  const goldMat = new THREE.MeshPhongMaterial({ color: new THREE.Color(0xb8930c), shininess: 120, specular: new THREE.Color(0x999999) });
  const whiteMat = new THREE.MeshPhongMaterial({ color: new THREE.Color(0xcccccc), shininess: 80 });
  const glassMat = new THREE.MeshPhongMaterial({ color: c.clone(), shininess: 90, transparent: true, opacity: 0.85 });

  const mk = (geo, m, px = 0, py = 0, pz = 0, rx = 0, ry = 0, rz = 0) => {
    const mesh = new THREE.Mesh(geo, m);
    mesh.position.set(px, py, pz);
    mesh.rotation.set(rx, ry, rz);
    group.add(mesh);
    return mesh;
  };

  if (type === 'pants' || type === 'trousers') {
    mk(new THREE.CylinderGeometry(0.5, 0.5, 0.11, 24), dkMat, 0, 1.18, 0);
    mk(new THREE.CylinderGeometry(0.52, 0.57, 0.44, 24), mat, 0, 0.86, 0);
    mk(new THREE.CylinderGeometry(0.25, 0.18, 1.52, 16), mat, -0.24, -0.12, 0);
    mk(new THREE.CylinderGeometry(0.25, 0.18, 1.52, 16), mat, 0.24, -0.12, 0);
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2 + 0.3;
      mk(new THREE.BoxGeometry(0.04, 0.13, 0.04), dkMat, Math.cos(a) * 0.54, 1.12, Math.sin(a) * 0.54);
    }
  } else if (type === 'joggers') {
    mk(new THREE.CylinderGeometry(0.5, 0.5, 0.11, 24), dkMat, 0, 1.18, 0);
    mk(new THREE.CylinderGeometry(0.52, 0.57, 0.44, 24), mat, 0, 0.86, 0);
    mk(new THREE.CylinderGeometry(0.26, 0.2, 1.52, 16), mat, -0.24, -0.12, 0);
    mk(new THREE.CylinderGeometry(0.26, 0.2, 1.52, 16), mat, 0.24, -0.12, 0);
    mk(new THREE.CylinderGeometry(0.21, 0.21, 0.13, 16), dkMat, -0.24, -0.92, 0);
    mk(new THREE.CylinderGeometry(0.21, 0.21, 0.13, 16), dkMat, 0.24, -0.92, 0);
    mk(new THREE.BoxGeometry(0.08, 0.28, 0.04), dkMat, 0, 1.06, 0.5);
  } else if (type === 'shorts') {
    mk(new THREE.CylinderGeometry(0.5, 0.5, 0.11, 24), dkMat, 0, 1.18, 0);
    mk(new THREE.CylinderGeometry(0.52, 0.56, 0.44, 24), mat, 0, 0.86, 0);
    mk(new THREE.CylinderGeometry(0.26, 0.23, 0.75, 16), mat, -0.24, 0.44, 0);
    mk(new THREE.CylinderGeometry(0.26, 0.23, 0.75, 16), mat, 0.24, 0.44, 0);
    group.position.y = -0.35;
  } else if (type === 'tshirt' || type === 'underwear') {
    mk(new THREE.CylinderGeometry(0.4, 0.37, type === 'underwear' ? 0.65 : 1.1, 20), mat, 0, 0.06, 0);
    mk(new THREE.CylinderGeometry(0.47, 0.43, 0.2, 20), mat, 0, type === 'underwear' ? 0.45 : 0.7, 0);
    if (type === 'tshirt') {
      mk(new THREE.TorusGeometry(0.2, 0.042, 8, 20), mat, 0, 0.86, 0, Math.PI / 2, 0, 0);
      mk(new THREE.CylinderGeometry(0.17, 0.15, 0.38, 12), mat, -0.55, 0.66, 0, 0, 0, Math.PI / 2.8);
      mk(new THREE.CylinderGeometry(0.17, 0.15, 0.38, 12), mat, 0.55, 0.66, 0, 0, 0, -Math.PI / 2.8);
    }
  } else if (type === 'polo') {
    mk(new THREE.CylinderGeometry(0.4, 0.37, 1.1, 20), mat, 0, 0.06, 0);
    mk(new THREE.CylinderGeometry(0.47, 0.43, 0.2, 20), mat, 0, 0.7, 0);
    mk(new THREE.TorusGeometry(0.2, 0.042, 8, 20), dkMat, 0, 0.86, 0, Math.PI / 2, 0, 0);
    mk(new THREE.BoxGeometry(0.2, 0.2, 0.04), mat, -0.07, 0.94, 0.3, -0.3, 0, 0);
    mk(new THREE.BoxGeometry(0.2, 0.2, 0.04), mat, 0.07, 0.94, 0.3, -0.3, 0, 0);
    mk(new THREE.BoxGeometry(0.05, 0.32, 0.05), dkMat, 0, 0.74, 0.39);
    mk(new THREE.CylinderGeometry(0.17, 0.15, 0.38, 12), mat, -0.55, 0.66, 0, 0, 0, Math.PI / 2.8);
    mk(new THREE.CylinderGeometry(0.17, 0.15, 0.38, 12), mat, 0.55, 0.66, 0, 0, 0, -Math.PI / 2.8);
  } else if (type === 'shirt') {
    mk(new THREE.CylinderGeometry(0.4, 0.37, 1.1, 20), mat, 0, 0.06, 0);
    mk(new THREE.CylinderGeometry(0.47, 0.43, 0.2, 20), mat, 0, 0.72, 0);
    mk(new THREE.CylinderGeometry(0.155, 0.125, 0.9, 12), mat, -0.58, 0.37, 0, 0, 0, Math.PI / 5.5);
    mk(new THREE.CylinderGeometry(0.155, 0.125, 0.9, 12), mat, 0.58, 0.37, 0, 0, 0, -Math.PI / 5.5);
    mk(new THREE.BoxGeometry(0.22, 0.22, 0.04), mat, -0.1, 0.95, 0.3, -0.2, 0.3, 0);
    mk(new THREE.BoxGeometry(0.22, 0.22, 0.04), mat, 0.1, 0.95, 0.3, -0.2, -0.3, 0);
    for (let i = 0; i < 5; i++) mk(new THREE.CylinderGeometry(0.024, 0.024, 0.03, 8), whiteMat, 0, 0.65 - i * 0.2, 0.4, Math.PI / 2, 0, 0);
    mk(new THREE.CylinderGeometry(0.13, 0.13, 0.1, 12), dkMat, -0.76, 0.03, 0, 0, 0, Math.PI / 5.5);
    mk(new THREE.CylinderGeometry(0.13, 0.13, 0.1, 12), dkMat, 0.76, 0.03, 0, 0, 0, -Math.PI / 5.5);
  } else if (type === 'blazer' || type === 'suit') {
    mk(new THREE.CylinderGeometry(0.5, 0.46, 1.2, 20), mat, 0, 0.1, 0);
    mk(new THREE.CylinderGeometry(0.6, 0.54, 0.24, 20), mat, 0, 0.8, 0);
    const lapMat = new THREE.MeshPhongMaterial({ color: c.clone().multiplyScalar(0.82), shininess: 28 });
    mk(new THREE.BoxGeometry(0.23, 0.5, 0.06), lapMat, -0.2, 0.6, 0.39, 0, -0.35, 0);
    mk(new THREE.BoxGeometry(0.23, 0.5, 0.06), lapMat, 0.2, 0.6, 0.39, 0, 0.35, 0);
    mk(new THREE.BoxGeometry(0.2, 0.22, 0.05), dkMat, -0.09, 0.97, 0.35, -0.2, 0, 0);
    mk(new THREE.BoxGeometry(0.2, 0.22, 0.05), dkMat, 0.09, 0.97, 0.35, -0.2, 0, 0);
    if (type === 'suit') mk(new THREE.BoxGeometry(0.1, 0.09, 0.03), new THREE.MeshPhongMaterial({ color: 0xf8f8f8 }), -0.38, 0.68, 0.43);
    mk(new THREE.CylinderGeometry(0.17, 0.14, 1.02, 12), mat, -0.68, 0.33, 0, 0, 0, Math.PI / 6);
    mk(new THREE.CylinderGeometry(0.17, 0.14, 1.02, 12), mat, 0.68, 0.33, 0, 0, 0, -Math.PI / 6);
  } else if (type === 'belt') {
    mk(new THREE.TorusGeometry(0.65, 0.042, 8, 44, Math.PI * 1.85), mat, 0, 0, 0, Math.PI / 2, 0, 0);
    mk(new THREE.BoxGeometry(0.18, 0.12, 0.04), goldMat, 0.71, 0, 0);
    group.scale.setScalar(1.35);
    group.rotation.x = 0.22;
  } else if (type === 'tie') {
    mk(new THREE.BoxGeometry(0.115, 1.55, 0.03), mat, 0, -0.28, 0);
    mk(new THREE.ConeGeometry(0.082, 0.22, 4), mat, 0, -1.16, 0, Math.PI, 0, Math.PI / 4);
    mk(new THREE.BoxGeometry(0.16, 0.19, 0.08), mat, 0, 0.73, 0);
    group.scale.setScalar(1.55);
  } else if (type === 'shoe' || type === 'boot') {
    const soleH = type === 'boot' ? 0.22 : 0.1;
    mk(new THREE.BoxGeometry(0.46, soleH, 1.15), new THREE.MeshPhongMaterial({ color: 0xbbbbaa, shininess: 12 }), 0, -0.7, 0);
    mk(new THREE.BoxGeometry(0.41, type === 'boot' ? 0.55 : 0.29, 0.88), mat, 0, type === 'boot' ? -0.32 : -0.46, -0.08);
    const toe = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 8), mat);
    toe.scale.set(1, 0.7, 1.25);
    toe.position.set(0, type === 'boot' ? -0.32 : -0.46, 0.43);
    group.add(toe);
    if (type === 'boot') mk(new THREE.CylinderGeometry(0.22, 0.24, 0.35, 12), dkMat, 0, -0.05, -0.15);
    group.scale.setScalar(1.45);
    group.position.y = 0.18;
  } else if (type === 'sandal') {
    mk(new THREE.BoxGeometry(0.55, 0.06, 1.05), new THREE.MeshPhongMaterial({ color: 0xbbbbaa }), 0, -0.75, 0);
    mk(new THREE.BoxGeometry(0.35, 0.08, 0.75), mat, 0, -0.62, 0);
    mk(new THREE.BoxGeometry(0.06, 0.35, 0.06), mat, 0, -0.35, 0.35);
    group.scale.setScalar(1.4);
    group.position.y = 0.15;
  } else if (type === 'watch') {
    mk(new THREE.TorusGeometry(0.55, 0.055, 12, 32), goldMat, 0, 0, 0, Math.PI / 2, 0, 0);
    mk(new THREE.CylinderGeometry(0.42, 0.42, 0.12, 32), mat, 0, 0, 0, Math.PI / 2, 0, 0);
    mk(new THREE.CylinderGeometry(0.35, 0.35, 0.04, 32), dkMat, 0, 0.07, 0, Math.PI / 2, 0, 0);
    mk(new THREE.BoxGeometry(0.18, 0.45, 0.06), mat, -0.62, 0, 0);
    mk(new THREE.BoxGeometry(0.18, 0.45, 0.06), mat, 0.62, 0, 0);
    group.scale.setScalar(1.5);
    group.rotation.x = 0.15;
  } else if (type === 'cap') {
    mk(new THREE.SphereGeometry(0.55, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), mat, 0, 0.1, 0);
    mk(new THREE.CylinderGeometry(0.52, 0.52, 0.08, 24), dkMat, 0, 0.55, 0);
    mk(new THREE.BoxGeometry(0.55, 0.04, 0.35), mat, 0, 0.52, 0.42, -0.25, 0, 0);
    group.scale.setScalar(1.3);
  } else if (type === 'perfume') {
    mk(new THREE.BoxGeometry(0.35, 0.85, 0.35), glassMat, 0, -0.1, 0);
    mk(new THREE.CylinderGeometry(0.08, 0.08, 0.2, 12), goldMat, 0, 0.45, 0);
    mk(new THREE.BoxGeometry(0.4, 0.08, 0.4), dkMat, 0, -0.58, 0);
    group.scale.setScalar(1.6);
  } else if (type === 'ring' || type === 'stud') {
    mk(new THREE.TorusGeometry(type === 'stud' ? 0.15 : 0.35, type === 'stud' ? 0.04 : 0.06, 12, 24), goldMat, 0, 0, 0, Math.PI / 2, 0, 0);
    if (type === 'ring') mk(new THREE.CylinderGeometry(0.12, 0.12, 0.08, 16), mat, 0, 0.12, 0);
    group.scale.setScalar(type === 'stud' ? 2.2 : 1.8);
    group.rotation.x = 0.3;
  } else if (type === 'chain' || type === 'bracelet') {
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      mk(new THREE.TorusGeometry(0.08, 0.025, 8, 12), goldMat, Math.cos(a) * 0.45, 0, Math.sin(a) * 0.45, Math.PI / 2, a, 0);
    }
    group.scale.setScalar(type === 'bracelet' ? 1.5 : 1.35);
    group.rotation.x = 0.25;
  } else if (type === 'accessory') {
    mk(new THREE.BoxGeometry(0.7, 0.15, 0.7), mat, 0, 0, 0);
    mk(new THREE.TorusGeometry(0.35, 0.04, 8, 24), dkMat, 0, 0.15, 0, Math.PI / 2, 0, 0);
    group.scale.setScalar(1.4);
  } else if (type === 'wallet') {
    mk(new THREE.BoxGeometry(0.9, 0.65, 0.15), mat);
    mk(new THREE.BoxGeometry(0.91, 0.022, 0.16), dkMat);
    group.scale.setScalar(1.55);
  } else {
    mk(new THREE.BoxGeometry(0.8, 1.2, 0.4), mat);
  }

  return group;
}
