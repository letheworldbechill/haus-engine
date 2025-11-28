function setupInteraction(renderer, camera, scene) {
  const ray = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  let doorOpen = false;
  let doorAngle = 0;

  function onClick(e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    ray.setFromCamera(mouse, camera);

    const hits = ray.intersectObjects(scene.children, true);
    if (hits.length === 0) return;

    const obj = hits[0].object;

    // Tür erkennen (gehört zur Türgruppe)
    if (obj.parent && obj.parent.parent && obj.parent.parent.userData.doorPivot) {
      doorOpen = !doorOpen;
    }
  }

  window.addEventListener("click", onClick);

  // Animations-Loop für Tür
  function animateDoor() {
    requestAnimationFrame(animateDoor);

    const speed = 0.06;
    const target = doorOpen ? Math.PI / 2 : 0;

    doorAngle += (target - doorAngle) * speed;

    scene.traverse(obj => {
      if (obj.userData.doorPivot) {
        obj.userData.doorPivot.rotation.y = -doorAngle;
      }
    });
  }
  animateDoor();
}
