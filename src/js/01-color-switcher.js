const DELAY = 1000; 
const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    body: document.body,
} 
let colorSwitcherId = null;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);
refs.stopBtn.disabled = true;

function onStartBtnClick() {
    colorSwitcherId = setInterval(() => {
        const hexColor = getRandomHexColor();
        refs.body.style.backgroundColor = hexColor;
        colorSwitcherActive();
    }, DELAY);
}

function onStopBtnClick() {
    clearInterval(colorSwitcherId);
    colorSwitcherStoped();
}

function colorSwitcherActive() {
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
}

function colorSwitcherStoped() {
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}