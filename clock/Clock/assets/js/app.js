const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconnds = document.getElementById('seconds');
const formAlarm = document.getElementById('form-alarm');
let isPermitShowNotification = false;
let isCreatedNotification;
let notificationCounter = 0;

document.addEventListener('DOMContentLoaded', (e) => {
    if ('Notification' in window) {
        Notification.requestPermission((request) => {
            if(request === 'granted') {
                isPermitShowNotification = true;
            }else
            {
                isPermitShowNotification = false;
            }

            if(!isPermitShowNotification) {
                const [input, button] = formAlarm.children;
                input.value = "";
                input.disabled = true;
                button.disable = true;
            }
        });
    }
    if (localStorage.getItem('alarma') !== null) {
        const input = formAlarm.children(0);
        input.value = new Date(localStorage.getItem('alarma'));
        console.log(formatNumber(alarm.getHours()) + ":" + formatNumber(alarm.getMinutes()));
    }
});

document.addEventListener('DOMContentLoaded', (e) => {
    getCurrentTime();
});

formAlarm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new formData(e.currentTarget());
    const value = formData.get('time');

    if(value === null || value === "") {
        alert("Set the time alarm")
    }
    else {
        let alarmHours = parseInt(value.substring(0,2));
        let alarmMinutes = parseInt(value.substring(3));

        const currentDate = new Date();

        const setAlarm = new Date();

        const lasHorasSonMenores = alarmHours < currentDate.getHours();
        const lasHorasSonIguales = alarmHours === currentDate.getHours();
        const losMinutosSonMenoresOIguales = alarmMinutes <= currentDate.getMinutes();

        if (lasHorasSonMenores || (lasHorasSonIguales && losMinutosSonMenoresOIguales)) {
            setAlarm.setDate(setAlarm.getDate() + 1);
        }

        setAlarm.setHours(alarmHours);
        setAlarm.setMinutes(alarmMinutes);
        setAlarm.setSeconds(0);

        localStorage.setItem("alarma", setAlarm.toString());
    }

    console.log(setAlarm);
});

setInterval(function() {
    getCurrentTime();
}, 1000);

function formatNumber (value) {
    return value < 10 ? "0" + value : value;
}

const showAlarm = () => {
    if (isPermitShowNotification && localStorage.getItem('alarma') !== null) {
        const currentTime = new Date();
        const alarm = new Date(localStorage.getItem('alarm'));

        const isTheSameDay = currentTime.getDate() === alarm.getDate();
        const isTheSameHour = currentTime.getHours() === alarm.getHours();
        const isTheSameMinutes = currentTime.getMinutes() === alarm.getMinutes();

        if (isTheSameDay && isTheSameHour && isTheSameMinutes && notificationCounter <= 10) {
            let notification = new Notification("Alarm");
            notificationCounter++;

            if(notificationCounter >= 10) {
                clearInterval(interval);
                formAlarm.children[0].value = "";
                localStorage.removeItem('alarma');
                notificationCounter = 0;
            }
        }
    }
}

function getCurrentTime () {
    if (isPermitShowNotification) {
        if (localStorage.getItem('alarm') !== null) {
            let notification;
            !isCreatedNotification && (notification = new Notification());
        }
    }
    const currentDate = new Date();
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const currentSeconds = currentDate.getSeconds();
    hours.innerText = formatNumber(currentHours);
    minutes.innerText = formatNumber(currentMinutes);
    seconnds.innerText = formatNumber(currentSeconds);
}