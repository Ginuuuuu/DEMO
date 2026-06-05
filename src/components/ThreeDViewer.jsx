import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { buildModel } from '../utils/buildModel';

export default function ThreeDViewer({ product, type }) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current || !product) return;
    const el = mountRef.current;
    const W = el.clientWidth;
    const H = el.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
    camera.position.set(0, 0.15, 3.65);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.32));
    const key = new THREE.DirectionalLight(0xfff8f0, 1.3);
    key.position.set(2, 4, 3);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xd8e8ff, 0.38);
    fill.position.set(-3, 1, 2);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffe8b0, 0.45);
    rim.position.set(0, -2, -3);
    scene.add(rim);
    const top = new THREE.DirectionalLight(0xffffff, 0.28);
    top.position.set(0, 5, 0);
    scene.add(top);

    const grid = new THREE.GridHelper(3.5, 18, 0x2a2a2a, 0x1a1a1a);
    grid.position.y = -1.28;
    scene.add(grid);

    const diskGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.01, 32);
    const diskMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(product.color).multiplyScalar(0.5),
      transparent: true,
      opacity: 0.22,
    });
    const disk = new THREE.Mesh(diskGeo, diskMat);
    disk.position.y = -1.27;
    scene.add(disk);

    const group = buildModel(type, product.color);
    scene.add(group);

    let rotY = 0.3;
    let rotX = 0;
    let dragging = false;
    let prevX = 0;
    let prevY = 0;
    let autoRotate = true;
    let autoTimer = null;
    const raf = { id: null };

    const animate = () => {
      raf.id = requestAnimationFrame(animate);
      if (autoRotate) rotY += 0.007;
      group.rotation.y = rotY;
      group.rotation.x = rotX;
      renderer.render(scene, camera);
    };
    animate();

    const handlers = {
      mousedown: (e) => {
        dragging = true;
        autoRotate = false;
        prevX = e.clientX;
        prevY = e.clientY;
        clearTimeout(autoTimer);
        renderer.domElement.style.cursor = 'grabbing';
      },
      mousemove: (e) => {
        if (!dragging) return;
        rotY += (e.clientX - prevX) * 0.012;
        rotX = Math.max(-0.45, Math.min(0.45, rotX + (e.clientY - prevY) * 0.008));
        prevX = e.clientX;
        prevY = e.clientY;
      },
      mouseup: () => {
        dragging = false;
        renderer.domElement.style.cursor = 'grab';
        autoTimer = setTimeout(() => {
          autoRotate = true;
        }, 2800);
      },
      touchstart: (e) => {
        dragging = true;
        autoRotate = false;
        prevX = e.touches[0].clientX;
        prevY = e.touches[0].clientY;
        clearTimeout(autoTimer);
        e.preventDefault();
      },
      touchmove: (e) => {
        if (!dragging) return;
        rotY += (e.touches[0].clientX - prevX) * 0.012;
        rotX = Math.max(-0.45, Math.min(0.45, rotX + (e.touches[0].clientY - prevY) * 0.008));
        prevX = e.touches[0].clientX;
        prevY = e.touches[0].clientY;
        e.preventDefault();
      },
      touchend: () => {
        dragging = false;
        autoTimer = setTimeout(() => {
          autoRotate = true;
        }, 2800);
      },
    };

    const onResize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const c = renderer.domElement;
    c.style.cursor = 'grab';
    c.addEventListener('mousedown', handlers.mousedown);
    window.addEventListener('mousemove', handlers.mousemove);
    window.addEventListener('mouseup', handlers.mouseup);
    c.addEventListener('touchstart', handlers.touchstart, { passive: false });
    window.addEventListener('touchmove', handlers.touchmove, { passive: false });
    window.addEventListener('touchend', handlers.touchend);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf.id);
      clearTimeout(autoTimer);
      c.removeEventListener('mousedown', handlers.mousedown);
      window.removeEventListener('mousemove', handlers.mousemove);
      window.removeEventListener('mouseup', handlers.mouseup);
      c.removeEventListener('touchstart', handlers.touchstart);
      window.removeEventListener('touchmove', handlers.touchmove);
      window.removeEventListener('touchend', handlers.touchend);
      window.removeEventListener('resize', onResize);
      scene.traverse((obj) => {
        if (obj.isMesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [product, type]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}
