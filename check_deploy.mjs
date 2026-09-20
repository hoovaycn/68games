import fs from 'fs';
import path from 'path';

const dir = './src/data/chapters';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  const playerMatch = content.match(/playerDeploy:\s*\[([\s\S]*?)\]/);
  const enemyMatch = content.match(/enemyDeploy:\s*\[([\s\S]*?)\]/);
  
  if (playerMatch && enemyMatch) {
    const players = playerMatch[1].match(/x:\s*(\d+)/g)?.map(m => parseInt(m.split(':')[1])) || [];
    const enemies = enemyMatch[1].match(/x:\s*(\d+)/g)?.map(m => parseInt(m.split(':')[1])) || [];
    
    console.log(`${file}: players=${players.length}, p_x=[${Math.min(...players)}, ${Math.max(...players)}], e_x=[${Math.min(...enemies)}, ${Math.max(...enemies)}]`);
  }
}
