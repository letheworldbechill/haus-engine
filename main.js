// --- Grund-Setup ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87a4c0);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500);
camera.position.set(10, 6, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// --- Licht ---
const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
scene.add(hemi);

const sun = new THREE.DirectionalLight(0xffffff, 1);
sun.position.set(10, 20, 10);
sun.castShadow = true;
scene.add(sun);

// --- Haus laden ---
const house = buildHouse();
scene.add(house);

// --- Interaktionen aktivieren ---
setupInteraction(renderer, camera, scene);

// --- Animate ---
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener("resize", ()=>{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
