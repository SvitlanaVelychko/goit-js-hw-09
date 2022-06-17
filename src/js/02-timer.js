import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const DELAY = 1000;
const refs = {
    startBtn: document.querySelector('button[data-start]'),
    input: document.querySelector('#datetime-picker'),
    timerDaysValue: document.querySelector('span[data-days]'),
    timerHoursValue: document.querySelector('span[data-hours]'),
    timerMinutesValue: document.querySelector('span[data-minutes]'),
    timerSecondsValue: document.querySelector('span[data-seconds]'),
}
let selectedDate = null;
let timerId = null;
let time = null;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);

        if (selectedDates[0] > options.defaultDate) {
            refs.startBtn.disabled = false;
            selectedDate = selectedDates[0];
            Notiflix.Notify.success('You choose a valid date, please click on button start');
            return;
        } 
        Notiflix.Notify.failure('Please choose a date in the future');
    },
};

flatpickr(refs.input, options);
refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', onStart);

function onStart() {
    timerId = setInterval(() => {
        const currentDate = Date.now();
        time = selectedDate - currentDate;
        onUpdateTimer();
        onStopTimer();
    }, DELAY);
}

function onStopTimer() {
    if (time < DELAY) {
        clearInterval(timerId);
        refs.startBtn.disabled = true;
    }
}

function onUpdateTimer() {
    const { days, hours, minutes, seconds } = convertMs(time);
    refs.timerDaysValue.textContent = addLeadingZero(days);
    refs.timerHoursValue.textContent = addLeadingZero(hours);
    refs.timerMinutesValue.textContent = addLeadingZero(minutes);
    refs.timerSecondsValue.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}