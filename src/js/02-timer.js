import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
let selectedMs = null;
const CURRENT_DATE = new Date();

// опции для формы ввода
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0] < CURRENT_DATE) {
        Notify.failure('Please choose a date in the future');
      } else {
        refs.startBtn.disabled = false;
        selectedMs = selectedDates[0];
      }
    },
  };
  const refs = {
    startBtn: document.querySelector('button'),
    daysTimer: document.querySelector('span[data-days]'),
    hoursTimer: document.querySelector('span[data-hours]'),
    minutesTimer: document.querySelector('span[data-minutes]'),
    secondsTimer: document.querySelector('span[data-seconds]'),
    dateTimeInput: document.querySelector('input[id=datetime-picker]'),
  }
  refs.startBtn.disabled = true;
  refs.startBtn.addEventListener('click', () => onTimer.start())

//  текущее время на старте таймера
var nowTime = Date.now();
console.log(selectedMs)

// форма ввода даты
flatpickr(refs.dateTimeInput, options);

// управление таймером
const onTimer = {
  timerId: null,
  start() {
      refs.startBtn.disabled = true;
      refs.dateTimeInput.disabled = true;
      this.timerId = setInterval(() => {
        countdownTimer()
      }, 1000);
  },
  stop() {
      refs.startBtn.disabled = false;
      refs.dateTimeInput.disabled = false;
      clearInterval(this.timerId);
      Notify.info('Timer finished');
  }
}
// математика
function countdownTimer() {
  const diff = selectedMs - new Date();
  console.log('diff', diff)
   if (diff <= 0) {
   console.log('конец таймера')
   onTimer.stop()
   }
  const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
  const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
  const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
  const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;

  refs.daysTimer.textContent = days < 10 ? '0' + days : days;
  refs.hoursTimer.textContent = hours < 10 ? '0' + hours : hours;
  refs.minutesTimer.textContent = minutes < 10 ? '0' + minutes : minutes;
  refs.secondsTimer.textContent = seconds < 10 ? '0' + seconds : seconds;
}
