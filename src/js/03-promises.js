import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
    
  const formElements = event.currentTarget.elements;
  let delay = parseInt(formElements.delay.value);
  let step = parseInt(formElements.step.value);
  let amount = parseInt(formElements.amount.value);

  createPromise(1, delay)
    .then(value => {
      Notiflix.Notify.success(value);
    })
    .catch(error => {
      Notiflix.Notify.failure(error);
    });
  
  for (let i = 2; i <= amount; i += 1) {
    delay += step;
    
    createPromise(i, delay)
    .then(value => {
      Notiflix.Notify.success(value);
    })
    .catch(error => {
      Notiflix.Notify.failure(error);
    })
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  })
}