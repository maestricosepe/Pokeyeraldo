const canvas=document.getElementById('game'),ctx=canvas.getContext('2d');
const story=document.getElementById('story');let heroName=null;
const TILE=32,W=15,H=10;
const map=["###############","#.............#","#..###........#","#........###..#","#.............#","#..####.......#","#.............#","#......###....#","#.............#","###############"];
let p={x:2,y:2};let other={x:11,y:6,active:false};let last=0;
function choose(name){heroName=name;document.body.classList.add('started');story.textContent=`¡Bienvenido, ${name}! Tu aventura comienza en la región de Geraldo. Explora el pueblo y habla con los personajes para descubrir tu próximo objetivo.`;draw();}
function blocked(x,y){return x<0||y<0||x>=W||y>=H||map[y][x]=='#'}
function move(dx,dy){let x=p.x+dx,y=p.y+dy;if(!blocked(x,y)){p.x=x;p.y=y;events();draw()}}
function events(){
 if(p.x===8&&p.y===4) story.textContent=`${heroName}, aquí habrá un encuentro importante con tu rival.`;
 else if(p.x===10&&p.y===7) story.textContent="Aquí colocaremos más adelante un centro Pokémon.";
 else if(p.x===6&&p.y===2) story.textContent="Esta zona será la salida hacia la primera ruta y el área de Pokémon salvajes.";
}
function draw(){
 ctx.clearRect(0,0,480,320);
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){
  ctx.fillStyle=map[y][x]=='#'?'#315b36':((x+y)%2?'#79ae55':'#8bc365');
  ctx.fillRect(x*TILE,y*TILE,TILE,TILE);
 }
 // casas
 ctx.fillStyle="#9b5d3b";ctx.fillRect(1*TILE,1*TILE,3*TILE,2*TILE);
 ctx.fillStyle="#dfc48a";ctx.fillRect(2*TILE,2*TILE,TILE,TILE);
 // player
 ctx.fillStyle=heroName==="Lady"?"#9a4db2":"#3157a8";
 ctx.fillRect(p.x*TILE+7,p.y*TILE+7,18,19);
 ctx.fillStyle="#f0c09a";ctx.fillRect(p.x*TILE+9,p.y*TILE+1,14,13);
 // other player placeholder
 if(other.active){ctx.fillStyle="#d16a35";ctx.fillRect(other.x*TILE+7,other.y*TILE+7,18,19);ctx.fillStyle="#f0c09a";ctx.fillRect(other.x*TILE+9,other.y*TILE+1,14,13)}
}
const dirs={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]};
document.querySelectorAll('[data-dir]').forEach(b=>{
 const d=()=>{if(heroName)move(...dirs[b.dataset.dir])};
 b.addEventListener('pointerdown',e=>{e.preventDefault();d()});
});
document.getElementById('action').addEventListener('pointerdown',()=>{if(heroName)events()});
addEventListener('keydown',e=>{
 if(!heroName)return;
 const k=e.key.toLowerCase();
 if(k==='arrowup'||k==='w')move(0,-1);if(k==='arrowdown'||k==='s')move(0,1);
 if(k==='arrowleft'||k==='a')move(-1,0);if(k==='arrowright'||k==='d')move(1,0);
});
draw();
