function buildHouse() {
  const group = new THREE.Group();

  // Boden (später: Garten, Wege, Terrain)
  const groundGeo = new THREE.PlaneGeometry(100, 100);
  const groundMat = new THREE.MeshStandardMaterial({ color: 0x779966 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  group.add(ground);

  // Außenwand
  const wallGeo = new THREE.BoxGeometry(8, 3, 0.3);
  const wallMat = new THREE.MeshStandardMaterial({ color: 0xe0e0e0 });
  const wall = new THREE.Mesh(wallGeo, wallMat);
  wall.position.set(0, 1.5, 0);
  wall.castShadow = true;
  group.add(wall);

  // Türgruppe (Pivot = linke Seite vom Türblatt)
  const doorGroup = new THREE.Group();
  doorGroup.position.set(-4, 0, 0); // links in der Wand
  group.add(doorGroup);

  // Türblatt (standard 90cm x 2m)
  const doorGeo = new THREE.BoxGeometry(0.04, 2, 0.9);
  const doorMat = new THREE.MeshStandardMaterial({ color: 0x5b3a1e });
  const door = new THREE.Mesh(doorGeo, doorMat);
  door.castShadow = true;

  // Tür im Drehpunkt korrekt platzieren
  door.position.set(0, 1, 0);
  doorGroup.add(door);

  // Speichern für Interaktion
  group.userData.doorPivot = doorGroup;

  return group;
}
