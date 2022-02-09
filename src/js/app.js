let a = '';
let b = '';
let sign = '';
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
const action = ['-', '+', 'x', '/'];

const out = document.querySelector('.calc-screen p');

function allClear() {
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = 0;
}

document.querySelector('.buttons').
addEventListener('click', (event) => {
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
        return;
    }

    if (action.includes(key)) {
        sign = key;
        out.textContent = sign;
        return;
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
                // case "%":
                //     a = b / 100;
                //     break;
        }
        finish = true;
        out.textContent = a;
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