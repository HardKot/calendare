function CreateCalendar(date) {
    //Счетчик недель в месяце
    let weekid = 1;
    // Надо сделать так, что бы он выводил числа прошлого месяца, вместо белого фона
    if (date.getDay() != 0) {
        for (let i = 1; i < date.getDay(); i++) {
            let e = document.createElement('td');
            week_1.append(e);
            e.style.background = '#ffffff';
        }
    } else {
        for (let i = 0; i < 6; i++) {
            let e = document.createElement('td');
            week_1.append(e);
            e.style.background = '#ffffff';
        }
    }
    // Создает календарь
    for (let i = 1; i <= new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); i++) {
        // Переходит на следующию неделю
        if (new Date(date.getFullYear(), date.getMonth(), i).getDay() == 1) {
            let week = document.createElement('tr');
            weekid++;
            week.id = 'week_' + weekid;
            week.classList.add('week');
            calendar.append(week);
        }
        //получаем неделю
        let week = document.getElementById('week_' + weekid);

        let day = document.createElement('td');
        day.classList.add('day');
        let events = document.createElement('input'),
            list = document.createElement('ul'),
            nb = document.createElement("span"),
            div = document.createElement('div');
        nb.textContent = i;
        nb.classList.add("nbday");
        div.classList.add("div_calendare");
        day.append(div);
        list.id = 'list' + date.getFullYear() + '-' + date.getMonth() + '-' + i;
        events.id = date.getFullYear() + '-' + date.getMonth() + '-' + i;
        list.classList.add('list');
        events.classList.add('events');
        events.type = 'button';
        events.value = "+";
        div.append(nb);
        div.append(events);
        div.append(list);
        if (new Date(date.getFullYear(), date.getMonth(), i).getTime() == new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime()) {
            day.style.borderTop = '3px solid blue';
            day.style.borderLeft = '1px solid blue';
            day.style.borderRight = '1px solid blue';
            day.style.color = 'blue';
        }
        week.append(day);

    }
}

function DeleteCalendar() {
    for (let i = 1; true; i++) {
        let a = document.getElementById('week_' + i);
        if (a == null) {
            break;
        }
        a.remove();
    }
    let e = document.createElement('tr');
    e.id = 'week_1';
    calendar.append(e);
}

function Months(time) {
    //список месяцев
    let months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    //получаем нужные нам объекты
    let month = document.getElementById("month"),
        year = document.getElementById("year"),
        date = document.getElementById("header_date");
    //меняет информацию на странице
    month.textContent = months[time.getMonth()];
    date.month = time.getMonth();
    date.year = time.getFullYear();
    year.textContent = time.getFullYear();
}

function Start() {
    Months(new Date());
    CreateCalendar(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
    Events();
    listEvents();
}

document.getElementById("big_ass").onclick = function () {
    if (event.target.id == "big_ass"){
        document.getElementById("big_ass").style.display = "none";
    }
}

function formEvents(){
    document.getElementById("big_ass").style.display = "block";
    document.getElementById("id_date").value = this.id;
}

function Events() {
    let days = document.getElementsByClassName("events");
    for (let i = 0; i < days.length; i++) {
        days[i].onclick = formEvents;
    }
}

document.getElementById("event_save").onclick = async function() {
    let form = document.getElementById('addEvent'),
        url = document.getElementById("main__URL").value;
    let response = await fetch('/calendare/addevent/' + url, {
        method: 'POST',
        body: new FormData(form)
    });
    id = 'list' + document.getElementById("id_date").value;
    document.getElementById("big_ass").style.display = "none";
    let e = document.createElement('li');
    e.textContent = document.getElementById("id_event_name").value
        + "(" + document.getElementById("id_place").value + ")";
    document.getElementById(id).append(e);
}

async function listEvents(){
    let url = document.getElementById("main__URL").value,
        year = document.getElementById("header_date").year,
        month = document.getElementById("header_date").month;
    let form = new FormData();
    form.append("csrfmiddlewaretoken", document.getElementsByName('csrfmiddlewaretoken')[0].value);
    form.append("year", year);
    form.append("month", month + 1);
    let response = await fetch('/calendare/listevent/' + url,{
        method: 'POST',
        body: form,
    }).then(function (response) {
        response.json().then(function (data) {
            let events = data;
            let date = year + "-" + month + "-";
            events = JSON.parse(data);
            for (let i = 0; i < events.length; i++){
                id = 'list' + date + events[i]['day'];
                let e = document.createElement('li');
                e.textContent = events[i]['name'] + "(" + events[i]['place'] + ")";
                document.getElementById(id).append(e);
            }
        })
    })
}
Start();

document.getElementById("next__month").onclick = function () {
    DeleteCalendar();
    //получаем нужные нам объекты
    let date = document.getElementById("header_date");
    if (date.month == 11) {
        date.month = 0;
        date.year += 1
    } else {
        date.month += 1;
    }
    CreateCalendar(new Date(date.year, date.month));
    Months(new Date(date.year, date.month));
    Events();
    listEvents();
}

document.getElementById("last__month").onclick = function () {
    DeleteCalendar();
    //получаем нужные нам объекты
    let date = document.getElementById("header_date");
    if (date.month == 0) {
        date.month = 11;
        date.year -= 1
    } else {
        date.month -= 1;
    }
    CreateCalendar(new Date(date.year, date.month));
    Months(new Date(date.year, date.month));
    Events();
    listEvents();
}

