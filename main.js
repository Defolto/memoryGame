const reset = document.getElementById("reset");
const help = document.getElementById("help");
const pole = document.querySelector(".pole");
const divs = document.querySelectorAll(".pole div");

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const size = 16;

function render() {
    let numbers = [];
    for (let i = 0; i < size / 2; i++) {
        numbers.push(i);
        numbers.push(i);
    }
    numbers.sort(() => getRandom(-1, 1));
    divs.forEach((div, i) => {
        div.innerHTML = `<p>${numbers[i]}</p>`;
        div.classList.add("pass");
    });
}

render();

reset.addEventListener("click", () => {
    render();
});

let firstNumber = null;
let timer = null;
pole.addEventListener("click", (e) => {
    if (timer) {
        return;
    }
    let element = null;
    if (e.target.tagName == "P") {
        element = e.target.parentNode;
    } else {
        element = e.target;
    }

    if (!element.classList.contains("pass")) {
        return;
    }

    if (!firstNumber) {
        firstNumber = element;
        element.classList.remove("pass");
    } else {
        element.classList.remove("pass");
        timer = setTimeout(() => {
            if (firstNumber.children[0].innerHTML == element.children[0].innerHTML) {
                firstNumber = null;
            } else {
                firstNumber.classList.add("pass");
                element.classList.add("pass");
                firstNumber = null;
            }
            timer = null;
        }, 1000);
    }
});

help.addEventListener("click", () => {
    const passes = document.querySelectorAll(".pole .pass");

    passes.forEach((div) => {
        div.classList.remove("pass");
    });

    setTimeout(() => {
        passes.forEach((div) => {
            div.classList.add("pass");
        });
    }, 1000);
});
