import { writeFileSync } from 'node:fs';

// Short, repeatable glass crash: a sharp impact followed by irregular bright fragments.
const rate = 22050;
const duration = 0.92;
const samples = Math.round(rate * duration);
const output = Buffer.alloc(44 + samples * 2);
let seed = 41023;
const random = () => {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 0x100000000 * 2 - 1;
};
const shards = Array.from({ length: 24 }, (_, i) => ({
  start: 0.045 + (i / 24) ** 1.5 * 0.58 + random() * 0.012,
  frequency: 1300 + (random() + 1) * 2450,
  amplitude: 0.08 + (random() + 1) * 0.08
}));

output.write('RIFF', 0);
output.writeUInt32LE(output.length - 8, 4);
output.write('WAVEfmt ', 8);
output.writeUInt32LE(16, 16);
output.writeUInt16LE(1, 20);
output.writeUInt16LE(1, 22);
output.writeUInt32LE(rate, 24);
output.writeUInt32LE(rate * 2, 28);
output.writeUInt16LE(2, 32);
output.writeUInt16LE(16, 34);
output.write('data', 36);
output.writeUInt32LE(samples * 2, 40);

let previousNoise = 0;
for (let i = 0; i < samples; i++) {
  const t = i / rate;
  const noise = random();
  const crack = (noise - previousNoise * 0.75) * 0.32 * Math.exp(-t * 21);
  previousNoise = noise;
  const clatter = shards.reduce((sum, shard) => {
    const elapsed = t - shard.start;
    if (elapsed < 0) return sum;
    const impact = Math.exp(-elapsed * 115) * (noise - previousNoise * 0.2);
    const ring = Math.sin(2 * Math.PI * shard.frequency * elapsed) * Math.exp(-elapsed * 23);
    return sum + shard.amplitude * (impact + ring * 0.5);
  }, 0);
  const fade = Math.min(1, (duration - t) * 12);
  const value = Math.max(-1, Math.min(1, (crack + clatter) * fade));
  output.writeInt16LE(Math.round(value * 24576), 44 + i * 2);
}

writeFileSync(new URL('../assets/audio/sfx/sfx_glass_shatter.wav', import.meta.url), output);
