const fs = require('fs');
const THREE = require('three');
const { GLTFLoader } = require('three/examples/jsm/loaders/GLTFLoader.js');

const buffer = fs.readFileSync('public/assets/lezzflow-graphite.glb');
const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);

const loader = new GLTFLoader();
loader.parse(arrayBuffer, '', (gltf) => {
  const clip = gltf.animations.find(c => c.name === 'OrbitLoop');
  console.log('Clip duration:', clip.duration);
  clip.tracks.forEach(t => {
    console.log('Track:', t.name, 'times length:', t.times.length);
  });
  const sphereTrack = clip.tracks.find(t => t.name.includes('LEZZFLOW_ORBIT_SPHERE.position'));
  if (sphereTrack) {
    for (let i = 0; i < sphereTrack.times.length; i += 15) {
      const t = sphereTrack.times[i];
      const x = sphereTrack.values[i * 3];
      const y = sphereTrack.values[i * 3 + 1];
      const z = sphereTrack.values[i * 3 + 2];
      const angle = Math.atan2(y, x) * 180 / Math.PI;
      console.log('t=' + t.toFixed(2) + ': pos=(' + x.toFixed(2) + ', ' + y.toFixed(2) + ', ' + z.toFixed(2) + '), angle=' + angle.toFixed(1) + ' deg');
    }
  }
});
