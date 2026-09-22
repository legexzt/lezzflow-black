const fs = require('fs');

const buf = fs.readFileSync('public/assets/lezzflow-graphite.glb');
// GLB header: magic (4), version (4), length (4)
// Chunk 0: chunkLength (4), chunkType (4) = 0x4E4F534A ('JSON')
const chunk0Length = buf.readUInt32LE(12);
const chunk0Type = buf.readUInt32LE(16);
const jsonStr = buf.toString('utf8', 20, 20 + chunk0Length);
const gltf = JSON.parse(jsonStr);

console.log('Nodes:');
gltf.nodes?.forEach((n, i) => console.log(`  [${i}] ${n.name} (mesh: ${n.mesh})`));

console.log('\nAnimations:');
gltf.animations?.forEach((a, i) => {
  console.log(`  [${i}] ${a.name}`);
  a.channels?.forEach(ch => {
    const targetNode = gltf.nodes[ch.target.node]?.name;
    console.log(`     target: ${targetNode} -> ${ch.target.path}`);
  });
});
