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



