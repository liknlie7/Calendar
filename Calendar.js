'use strict';

{
    const todayButton = document.getElementById('todayButton');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const scheduleButton = document.getElementById('scheduleButton');

    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();

    let inputText = null;
    let inputDate = null;
    let inputTime = null;

    function getCalendarHead() {
        const dates = [];
        const d = new Date(year, month, 0).getDate();
        const n = new Date(year, month, 1).getDay();

        for (let i = 0; i < n; i++) {
            dates.unshift({
                date: d - i,
                isToday: false,
                isDisabled: true,
            });
        }
        return dates;
    }

    function getCalendarBody() {
        const dates = [];
        const lastDate = new Date(year, month + 1, 0).getDate();

        for (let i = 1; i <= lastDate; i++) {
            dates.push({
                date: i,
                isToday: false,
                isDisabled: false,
            });
        }

        if (year === today.getFullYear() && month === today.getMonth()) {
            dates[today.getDate() - 1].isToday = true;
        }

        return dates;
    }

    function getCalendarTail() {
        const dates = [];
        const lastDay = new Date(year, month + 1, 0).getDay();

        for (let i = 1; i < 7 - lastDay; i++) {
            dates.push({
                date: i,
                isToday: false,
                isDisabled: true,
            });
        }

        return dates;
    }

    function renderWeeks() {
        const dates = [
            // スプレッド構文
            ...getCalendarHead(),
            ...getCalendarBody(),
            ...getCalendarTail(),
        ];

        const weeks = [];
        const weeksCount = dates.length / 7;

        for (let i = 0; i < weeksCount; i++) {
            weeks.push(dates.splice(0, 7));
        }

        weeks.forEach(week => {
            const tr = document.createElement('tr');
            week.forEach(date => {
                const td = document.createElement('td');

                td.textContent = date.date;
                if (date.isToday) {
                    td.classList.add('today');
                }
                if (date.isDisabled) {
                    td.classList.add('disabled');
                } else {
                    td.classList.add('day');
                }

                tr.appendChild(td);
            });
            document.querySelector('tbody').appendChild(tr);
        });
    }

    function clearCalendar() {
        const tbody = document.querySelector('tbody');

        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }
    }

    function renderDate() {
        // テンプレートリテラル
        //　パッドスタート
        const date = `${year}年${String(month + 1)}月`;
        document.getElementById('date').textContent = date;
    }

    function createCalendar() {
        clearCalendar();
        renderDate();
        renderWeeks();
        setSchedule();
    }

    function prevButtonBehavior() {
        prevButton.addEventListener('click', () => {
            month--;
            if (month < 0) {
                year--;
                month = 11;
            }
            createCalendar();
        });

        prevButton.addEventListener('mouseover', () => {
            prevButton.style.background = 'honeydew';
            prevButton.style.borderRadius = '50%';
            prevButton.classList.add('prevButton2')
        })

        prevButton.addEventListener('mouseleave', () => {
            prevButton.style.background = 'white';
            prevButton.classList.remove('prevButton2')
        })
    }

    function nextButtonBehavior() {
        nextButton.addEventListener('click', () => {
            month++;
            if (month > 11) {
                year++;
                month = 0;
            }
            createCalendar();
        });

        nextButton.addEventListener('mouseover', () => {
            nextButton.style.background = 'honeydew';
            nextButton.style.borderRadius = '50%';
            nextButton.classList.add('nextButton2')
        })

        nextButton.addEventListener('mouseleave', () => {
            nextButton.style.background = 'white';
            nextButton.classList.remove('nextButton2')
        })
    }

    function todayButtonBehavior() {
        todayButton.addEventListener('click', () => {
            year = today.getUTCFullYear();
            month = today.getMonth();

            createCalendar();
        });

        todayButton.addEventListener('mouseover', () => {
            todayButton.style.background = 'honeydew';
            todayButton.classList.add('todayButton2')
        })

        todayButton.addEventListener('mouseleave', () => {
            todayButton.style.background = 'white';
            todayButton.classList.remove('todayButton2')
        })
    }

    function scheduleButtonBehavior() {
        scheduleButton.addEventListener('mouseover', () => {
            scheduleButton.style.background = 'honeydew';
            scheduleButton.classList.add('scheduleButton2')
        })

        scheduleButton.addEventListener('mouseleave', () => {
            scheduleButton.style.background = 'white';
            scheduleButton.classList.remove('scheduleButton2')
        })
    }

    function buttonBehavior() {
        prevButtonBehavior();
        nextButtonBehavior();
        todayButtonBehavior();
        scheduleButtonBehavior();
    }

    createCalendar();

    buttonBehavior();

    document.getElementById('scheduleButton').addEventListener('click', () => {
        document.getElementById('inputForm').style.display = 'inline';
    })

    const exit = document.getElementsByClassName('exit');

    exit[0].addEventListener('click', () => {
        document.getElementById('inputForm').style.display = 'none';
    })

    const submit = document.getElementsByClassName('formSubmit');

    submit[0].addEventListener('click', () => {
        inputText = document.getElementsByClassName('formText');
        inputDate = document.getElementsByClassName('formDate');
        inputTime = document.getElementsByClassName('formTime');

        if (inputText[0].value == null && inputDate[0].value == null && inputTime[0].value == 0) {
            document.getElementById('inputForm').style.display = 'none';
        }

        //入力された日付を年月日で分ける
        const inputYear = inputDate[0].value.substr(0, 4);
        var inputMonth = inputDate[0].value.substr(5, 2);
        const inputDay = inputDate[0].value.substr(8, 2);

        if (inputMonth.charAt(0) == "0") {
            inputMonth = Number(inputDate[0].value.substr(6, 1) - 1);
        } else {
            inputMonth = Number(inputDate[0].value.substr(5, 2) - 1);
        }

        //指定された月のカレンダーを作る
        year = inputYear;
        month = inputMonth;

        // 必要なデータを格納しておく
        var detalist = [];
        detalist.unshift({
            year: inputYear,
            month: inputMonth,
            day: inputDay,
            title: inputText[0].value,
            time: inputTime[0].value
        });


        // データがない場所に保存する
        for (var i = 1; i < 1000; i++) {
            var temp = "detalist";
            var str = temp + i;

            if(localStorage.getItem(str)){
                continue;
            }else{
            localStorage.setItem(str,JSON.stringify(detalist));
                break;
            }
        }
    })

    function setSchedule() {
        var schedule = [];

        for (let i = 1; i < 1000; i++) {
            var temp = "detalist";
            var str = temp + i;

            if (localStorage.getItem(str) != null) {
                // parseで取り出さないと綺麗に取り出せない
                schedule[i] = JSON.parse(localStorage.getItem(str));
            }
        }

        // inputdayから-1した日にテキストを作る
        for (let i = 1; i < schedule.length; i++) {
            var obj = Object.values(schedule[i]);
            if(obj[0].year == year)
            {
                if(obj[0].month + 1 == month + 1){

                var a = document.getElementsByClassName('day');
                var div = document.createElement('div');
                div.classList.add("schedule");

                a[obj[0].day - 1].appendChild(div);
                div.innerHTML = obj[0].time + " " + obj[0].title;
                }
            }
        }
    }
}

