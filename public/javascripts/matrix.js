const canvas = document.getElementById('Matrix');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = [
  'ア', 'イ', 'ウ', 'エ', 'オ',
  'カ', 'キ', 'ク', 'ケ', 'コ',
  'サ', 'シ', 'ス', 'セ', 'ソ',
  'タ', 'チ', 'ツ', 'テ', 'ト',
  'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
  'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
  'マ', 'ミ', 'ム', 'メ', 'モ',
  'ヤ', 'ユ', 'ヨ',
  'ラ', 'リ', 'ル', 'レ', 'ロ',
  'ワ', 'ヲ', 'ン',
  'ガ', 'ギ', 'グ', 'ゲ', 'ゴ',
  'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ',
  'ダ', 'ヂ', 'ヅ', 'デ', 'ド',
  'バ', 'ビ', 'ブ', 'ベ', 'ボ',
  'パ', 'ピ', 'プ', 'ペ', 'ポ',
  'ァ', 'ィ', 'ゥ', 'ェ', 'ォ',
  'ャ', 'ュ', 'ョ',
  'ッ', 'ー'
];

const latin = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

const nums = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
];

const alphabet = katakana+latin+nums;

const fontSize = 16;

const columns = canvas.width/fontSize;

const rainDrops =[];

for(let x =0; x<columns; x++){
    rainDrops[x]=1;
}

const draw =()=>{
    context.fillStyle = 'rgba(0,0,0,0.05)';
    context.fillRect(0,0,canvas.width,canvas.height);
    
    context.fillStyle = '#0dff0d';
    context.font = fontSize+'px monospace';

    for(let i = 0; i < rainDrops.length; i++){
        const text = alphabet.charAt(Math.floor(Math.random()*alphabet.length));
        context.fillText(text,i*fontSize,rainDrops[i]*fontSize);

        if(rainDrops[i]*fontSize > canvas.height && Math.random() > 0.975){
            rainDrops[i]=0;
        }
        rainDrops[i]++;
    }
};

setInterval(draw,30);

const button =document.getElementById('btnStart');
button.addEventListener('click',(e)=>{
  window.open('/game','_self');
})