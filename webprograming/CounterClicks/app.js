const containerClicks = document.getElementById('counterCliks');
const btnIncrement = document.querySelector('.btnOne');
const btnDecrement = document.querySelector('.btnTwo');
const btnReset = document.querySelector('.btnThree');
let counter = 0;

btnIncrement.onclick = function() {
    counter++;
    containerClicks.innerText = counter;
}

btnDecrement.onclick = () => {
    counter--;
    containerClicks.innerText = counter;
};

btnReset.onclick = () => {
    counter = 0;
    containerClicks.innerText = counter;
};