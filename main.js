const tools = document.getElementsByClassName('tool')
const range = document.getElementById('range');

const pen = document.getElementById('pen');
const highlighter = document.getElementById('highlighter');
const eraser = document.getElementById('eraser');
const line = document.getElementById('line');
const rect = document.getElementById('rect');
const circle = document.getElementById('circle');
const clear = document.getElementById('clear');
const undo = document.getElementById('undo');
const redo = document.getElementById('redo');
const save = document.getElementById('save');


let isErasing = false
// window.onbeforeunload = () => 'Reload site?'

selectTool()

save.onclick = function () {
    let imgUrl = canvas.toDataURL('image/png');
    let saveA = document.createElement('a');
    document.body.appendChild(saveA);
    saveA.href = imgUrl;
    saveA.download = 'pic' + (new Date).getTime();
    saveA.target = '_blank';
    saveA.click();
};

// eraser.onclick = function () {
//     isErasing = true;
// };

// pen.onclick = function () {
//     isErasing = false;
// };

function selectTool(){
  for (let i = 0; i < tools.length; i++) {
    console.log(tools)
    tools[i].onclick = function () {
      for (let i = 0; i < tools.length; i++) {
        tools[i].classList.remove('active');
        this.classList.add('active');
      }
    }
  }
}

