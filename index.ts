import * as THREE from 'three';
import { Brush, Evaluator, SUBTRACTION } from 'three-bvh-csg';          // yarn add three-bvh-csg
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// グローバル変数の型宣言
declare global {
  function saveAs(blob: Blob, filename: string): void;
}

// シーンの作成
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

// カメラの設定
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 100;

// レンダラーの設定
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// コントロールの追加
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 光源の追加
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// 1) ベースとカッターを用意
const boxGeometry = new THREE.BoxGeometry(50, 50, 50);
const box = new Brush(boxGeometry);
box.material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

const cylinderGeometry = new THREE.CylinderGeometry(10, 10, 60, 64);
const cutter = new Brush(cylinderGeometry);
cutter.rotation.x = Math.PI/2;
cutter.updateMatrixWorld();
cutter.material = new THREE.MeshStandardMaterial({ color: 0xff0000, opacity: 0.5, transparent: true });

// 両方のブラシを表示
scene.add(box);
scene.add(cutter);

// 2) 減算（一発）
const evaluator = new Evaluator();
const resultMesh = evaluator.evaluate(box, cutter, SUBTRACTION);
resultMesh.material = new THREE.MeshStandardMaterial({ color: 0x2194ce });

// 結果のメッシュを表示
scene.add(resultMesh);
box.visible = false;
cutter.visible = false;

// 3) STL にエクスポート
const exporter = new STLExporter();
const stl = exporter.parse(resultMesh, { binary: false }); // ASCII 例

// ダウンロードボタンを追加
const downloadButton = document.createElement('button');
downloadButton.textContent = 'STLダウンロード';
downloadButton.style.position = 'absolute';
downloadButton.style.top = '20px';
downloadButton.style.left = '20px';
downloadButton.style.padding = '10px';
downloadButton.style.zIndex = '1000';
document.body.appendChild(downloadButton);

downloadButton.addEventListener('click', () => {
  const blob = new Blob([stl], { type: 'text/plain' });
  saveAs(blob, 'difference.stl');
});

// 表示切替ボタンを追加
const toggleButton = document.createElement('button');
toggleButton.textContent = '表示切替';
toggleButton.style.position = 'absolute';
toggleButton.style.top = '20px';
toggleButton.style.left = '150px';
toggleButton.style.padding = '10px';
toggleButton.style.zIndex = '1000';
document.body.appendChild(toggleButton);

toggleButton.addEventListener('click', () => {
  box.visible = !box.visible;
  cutter.visible = !cutter.visible;
  resultMesh.visible = !resultMesh.visible;
});

// ウィンドウリサイズ対応
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// アニメーションループ
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
