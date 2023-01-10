const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    switchColor: document.querySelector('body')
}

refs.startBtn.addEventListener('click', () => switcher.start());
refs.stopBtn.addEventListener('click', () => switcher.stop());

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

function updateColor() {
    refs.switchColor.style.backgroundColor = getRandomHexColor()
  };

const switcher = {
    intervalId: null,
    start() {
        refs.startBtn.disabled = true;
        this.intervalId = setInterval(() => {
           const color = getRandomHexColor();
           updateColor();
           console.log(color);
        }, 1000);
    },
    stop() {
        refs.startBtn.disabled = false;
        clearInterval(this.intervalId);
    }
};
