import { Notify } from 'notiflix/build/notiflix-notify-aio';

// читаю форму
const refs = {
  delayInp: document.querySelector('input[name="delay"]'),
  stepInp: document.querySelector('input[name="step"]'),
  amountInp: document.querySelector('input[name="amount"]'),
  onForm: document.querySelector('.form'),
}
refs.onForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
evt.preventDefault();
console.log('refs.delayInp', refs.delayInp.value)
const firstDelay = Number(`${refs.delayInp.value}`);
const stepDelay = Number(`${refs.stepInp.value}`);
const promiseCount = Number(`${refs.amountInp.value}`);

console.log('firstDelay', firstDelay);
console.log('stepDelay', stepDelay);
console.log('promiseCount', promiseCount);

let currentDelay = firstDelay;
for (let i=0; i< promiseCount; i+=1) {
  if (currentDelay !== 0) {
    currentDelay += stepDelay;
  }
  createPromise(i + 1, currentDelay);
}
}

// Функция создания промиса. номер создаваемого промиса (position), задержка (delay)
function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
          // Fulfill
        resolve({ position, delay });
        console.log('✅')
      }
          // Reject
      reject({ position, delay });
      console.log('❌')
    }, delay);
  });

// вывод результатов промиса
promise
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
};