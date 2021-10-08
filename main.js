const tools = document.getElementsByClassName('tool')
const range = document.getElementById('range');


const clear = document.getElementById('clear');
const undo = document.getElementById('undo');
const redo = document.getElementById('redo');
const save = document.getElementById('save');

// window.onbeforeunload = () => 'Reload site?'



save.onclick = function () {
    let imgUrl = canvas.toDataURL('image/png');
    let saveA = document.createElement('a');
    document.body.appendChild(saveA);
    saveA.href = imgUrl;
    saveA.download = 'pic' + (new Date).getTime();
    saveA.target = '_blank';
    saveA.click();
};

range.onchange = function(){
  lineWidth = this.value;
};

selectTool()

function selectTool(){
  for (let i = 0; i < tools.length; i++) {
    tools[i].onmousedown = function () {
      for (let i = 0; i < tools.length; i++) {
        tools[i].classList.remove('active');
        this.classList.add('active');
      }
    }
  }
}

let historyData = [];

undo.onclick = () =>{
  if(historyData.length < 1)
    return false;
  top = historyData[historyData.length - 1]
  ctx.putImageData(historyData[historyData.length - 1], 0, 0)
  historyData.pop()
  console.log(historyData)
};

redo.onclick = function () {
  if(historyData.length < 1)
    return false;
  ctx.putImageData(historyData[historyData.length - 1], 0, 0)
  historyData.push(top)
  console.log(historyData)
};

function saveData(data) {
  (historyData.length === 10) && (historyData.shift());// 上限为储存10步，太多了怕挂掉
  historyData.push(data);
}

clear.onclick = function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setCanvasBg('white');
};
