let a = '';
let b = '';
let sign = '';
let finish = false;
const history = document.querySelector('#history');

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', ];
const action = ['-', '+', 'x', '/'];
const historyArr = [];

const out = document.querySelector('.calc-screen p');

function allClear() {
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = 0;
    history.textContent = '';
}

document.querySelector('.calc').
addEventListener('click', (event) => {
    if (event.target.classList.contains('history-span')) {
        console.log('ok');
    }
    if (event.target.classList.contains('ac')) {
        allClear();
    }
    if (!event.target.classList.contains('btn')) return;

    const key = event.target.textContent;

    if (digit.includes(key)) {
        if (b === '' && sign === '') {
            if (key === '.' && a.includes('.')) {

                a += '';
                out.textContent = a;
            } else {
                a += key;
                out.textContent = a;
            }
        } else if (a !== '' && b !== '' && finish) {
            b = key;
            finish = false;
            out.textContent = b;
        } else {
            if (key === '.' && b.includes('.')) {
                b += '';
                out.textContent = b;
            } else {
                b += key;
                out.textContent = b;
            }
        }
        console.log(a, sign, b);
        return;
    }

    if (action.includes(key)) {
        sign = key;
        out.textContent = sign;
    }

    if (key === '+/-') {
        if (b === '' && sign === '') {
            a = a * (-1);
            out.textContent = a;
        } else if (a !== '' && b !== '') {
            b = b * (-1);
            out.textContent = b;
        }
    }

    if (key === '=') {
        if (b === '') b = a;
        switch (sign) {
            case '+':
                a = (+a) + (+b);
                break;
            case '-':
                a = a - b;
                break;
            case 'x':
                a = a * b;
                break;
            case '/':
                if (b === '0') {
                    allClear();
                    return;
                }
                a = a / b;
                break;
        }
        finish = true;
        out.textContent = a;
        history.textContent = a;
        addToHistory(a);
        renderHistory();
    }
})


const observer = new MutationObserver(
    function(mutations) {
        if (a.toString().length > 10) {
            out.style.fontSize = 400 / a.toString().length + 'px';
            if (b.toString().length > 12) {
                out.style.fontSize = 400 / b.toString().length + 'px';
            }
        } else if (b.toString().length > 10) {
            out.style.fontSize = 400 / b.toString().length + 'px';
        } else {
            out.style.fontSize = '44px';
        }
    }
);
observer.observe(out, { childList: true });

// popup history
const popupHistory = document.querySelector('.calc-popup');
let popupContainer = document.querySelector('.popup-content__history');
const popupHistoryClose = document.querySelector('.popup-content__close');
// historyArr

function addToHistory(a) {
    historyArr.push({ result: a });
}

function renderHistory(result) {
    popupContainer.innerHTML = '';
    historyArr.forEach(num => {
        popupContainer.innerHTML +=
            `
           <p>${num.result}</p>
            `
    })
}

history.addEventListener('click', function() {
    popupHistory.style.display = "block";
    renderHistory();
});

popupHistoryClose.addEventListener('click', function() {
    popupHistory.style.display = "none";
})



// let date = new Date().toLocaleDateString() + ' at ' +
//     new Date().toLocaleTimeString();
// console.log(date);