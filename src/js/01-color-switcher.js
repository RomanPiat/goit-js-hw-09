const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    switchColor: document.querySelector('body')
}

refs.startBtn.addEventListener('click', () => switcher.start());
refs.stopBtn.addEventListener('click', () => switcher.stop());

refs.stopBtn.disabled = true;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

function updateColor() {
    refs.switchColor.style.backgroundColor = getRandomHexColor()
  };

const switcher = {
    intervalId: null,
    start() {
        refs.stopBtn.disabled = false;
        refs.startBtn.disabled = true;
        this.intervalId = setInterval(() => {
           updateColor();
        }, 1000);
    },
    stop() {
        refs.stopBtn.disabled = true;
        refs.startBtn.disabled = false;
        clearInterval(this.intervalId);
    }
};
