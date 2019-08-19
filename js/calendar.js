const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const week = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
const currentDate = new Date();
const today = new Date();

const body = document.getElementsByTagName("body")[0];
const navDate = document.getElementById("nav-date");
const calendar = document.getElementById("calendar");

renderDate();

function switchMonth(direction) {
    if (direction === 'prev') {
        currentDate.setMonth(currentDate.getMonth() - 1);
    } else {
        currentDate.setMonth(currentDate.getMonth() + 1);
    }
    renderDate();
}

function toToday() {
    currentDate.setFullYear(today.getFullYear());
    currentDate.setMonth(today.getMonth());
    navDate.innerHTML = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    renderDate();
}

function renderDate() {
    body.style.backgroundImage = `url('images/${currentDate.getMonth()}.jpg')`;
    navDate.innerHTML = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    calendar.innerHTML = "";

    const monthLength = (new Date(currentDate.getFullYear(),currentDate.getMonth() + 1, 1) -
        new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)) / (1000 * 60 * 60 * 24);

    let monthStartWeekDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    // set week start from monday (not from sunday by default)
    monthStartWeekDay === 0 ? monthStartWeekDay = 6 : monthStartWeekDay -= 1;

    let numberOfCells;
    if (monthStartWeekDay === 6 || monthStartWeekDay === 5) {
        numberOfCells = 42;
    } else {
        numberOfCells = 35;
    }

    // j - rest days of prev month
    for (let i = 0, j = monthStartWeekDay - 1; i < numberOfCells; i++, j--) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDate() - j);

        const div = document.createElement("div");
        div.setAttribute("class", "day");
        const span = document.createElement("span");
        const h3 = document.createElement("h3");
        h3.innerHTML = date.getDate();

        div.appendChild(span);
        div.appendChild(h3);

        if (i < 7) {
            div.getElementsByTagName("span")[0].innerHTML += week[i] + ", ";
        }

        if (today.getDate() === date.getDate()) {
            div.className += " today"
        }

        if (date.getMonth() === currentDate.getMonth()) {
            div.className += " current-month"
        }

        if (date.getDay() === 0 || date.getDay() === 6) {
            div.className += " weekend";
        }

        calendar.appendChild(div);
    }
}




