const $=s=>document.querySelector(s);
let tf='M1', symbol='XAUUSD';
function draw(){
 const c=$('#chart'),r=c.getBoundingClientRect(),dpr=window.devicePixelRatio||1;
 c.width=r.width*dpr;c.height=r.height*dpr;const x=c.getContext('2d');x.scale(dpr,dpr);
 const w=r.width,h=r.height,base=symbol==='XAUUSD'?2345.6:1.0842;
 x.strokeStyle='#292b31';x.lineWidth=1;
 for(let i=1;i<5;i++){let y=h*i/5;x.beginPath();x.moveTo(0,y);x.lineTo(w,y);x.stroke()}
 let vals=[],v=base*.997;for(let i=0;i<48;i++){v+=(Math.sin(i*.75)*.00028+(Math.cos(i*.31)*.00015));vals.push(v)}
 const min=Math.min(...vals),max=Math.max(...vals),pad=15;
 x.beginPath();vals.forEach((n,i)=>{let px=i/(vals.length-1)*w,py=h-pad-(n-min)/(max-min||1)*(h-2*pad);i?x.lineTo(px,py):x.moveTo(px,py)});
 x.lineWidth=2;x.strokeStyle='#d9ad55';x.stroke();
 let lastY=h-pad-(vals.at(-1)-min)/(max-min||1)*(h-2*pad);
 x.lineTo(w,h);x.lineTo(0,h);x.closePath();let g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#d9ad5528');g.addColorStop(1,'#d9ad5500');x.fillStyle=g;x.fill();
 x.beginPath();x.arc(w-2,lastY,3,0,Math.PI*2);x.fillStyle='#f1ca78';x.fill();
}
function update(){
 const gold=symbol==='XAUUSD',base=gold?2345.60:1.08420,delta=(Math.random()-.42)*(gold?1.8:.0012);
 $('#price').textContent=(base+delta).toLocaleString('en-US',{minimumFractionDigits:gold?2:5,maximumFractionDigits:gold?2:5});
 $('#change').textContent=(delta>=0?'+':'')+((delta/(gold?base:base))*100).toFixed(2)+'%';
 $('#change').className='change '+(delta>=0?'positive':'');
 const rsi=(49+Math.random()*17).toFixed(1);$('#rsi').textContent=rsi;document.querySelector('.meter i').style.width=rsi+'%';
 $('#ema20').textContent=(base-2.1+Math.random()).toFixed(gold?2:5);$('#ema50').textContent=(base-6.8+Math.random()).toFixed(gold?2:5);
 $('#macd').textContent=(Math.random()*2-0.5).toFixed(2);
 $('#insightTitle').textContent=delta>0?'تمایل مثبت در داده نمایشی':'حرکت خنثی در داده نمایشی';
 $('#lastUpdate').textContent='بروزرسانی نمایشی: همین حالا';draw();
}
document.querySelectorAll('[data-tf]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-tf]').forEach(z=>z.classList.remove('active'));b.classList.add('active');tf=b.dataset.tf;update()}));
$('#symbol').addEventListener('change',e=>{symbol=e.target.value;update()});
window.addEventListener('resize',draw);update();setInterval(update,6000);
let installPrompt;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;$('#installBtn').classList.remove('hidden')});
$('#installBtn').addEventListener('click',async()=>{if(!installPrompt)return;installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;$('#installBtn').classList.add('hidden')});
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
