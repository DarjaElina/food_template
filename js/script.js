window.addEventListener('DOMContentLoaded', () => {
    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');
    
    
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
    
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }
    
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabContent();
    showTabContent(0);


    tabsParent.addEventListener('click', (event) => {
        const target = event.target; // если будем часто использовать event.target то его можно переопределить в переменную

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });


    // Timer

    const deadline = '2020-03-11'; // задаем дедлайн

    function getTimeRemaining(endtime) {
        // в качестве аргумента будет дедлайн
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date()); // => техническая переменная; получаем разницу между дедлайном и текущим временем в миллисекундах

        // проверяем на отрицательное число
        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            // теперь эту разницу превращаем в кол-во дней, часов, минут и секунд
        // 1) получаем дни, кол-во м/c делим на кол-во м/с в одном дне и округляем с помощью Math.floor()
        days = Math.floor(t / (1000 * 60 * 60 * 24));
        // 1000 * 60 => м/с в одной минуте, * 60 => в одном часе, * 24 => в сутках
        hours = Math.floor((t / (1000 * 60 * 60) % 24)); // не больше чем 24 
        // t / (1000 * 60 * 60) => получаем кол-во часов, но их может быть больше 24, поэтому получим кол-во целых суток и ОСТАТОК от них
        minutes = Math.floor((t / 1000 / 60) % 60); // => не больше чем 60
        seconds = Math.floor((t / 1000) % 60);
        }

        // тк эти переменные пока существуют пока только внутри этой функции, возвращаем их наружу в виде объекта

        return {
            'total': t, // общее кол-во миллисекунд
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    // добавляем нолики к однозначным числам

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    // теперь функция которая устанавливает таймер на страничку

    function setClock(selector, endtime) {
        // в качестве атрибутов главный элемент с таймером со страницы и дедлайн
        // сначала получаем элементы со страницы
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000); // => а здесь запускаем нашу функцию каждую секунду, тк время обновляется каждую секунду

              updateClock(); // это чтобы не ждать 1000 миллисекунд чтобы не было мигания

        // теперь третья функция, которая будет обновлять наш таймер каждую секунду

        function updateClock() {
            // 1) расчет времени которое осталось на текущую секунду
            const t = getTimeRemaining(endtime);

            // 2) расчетные величины помещаем на страницу
            // из t => из нашего технического объекта с днями, часами, минутами и секундами
             days.innerHTML = getZero(t.days);
             hours.innerHTML = getZero(t.hours);
             minutes.innerHTML = getZero(t.minutes);
             seconds.innerHTML = getZero(t.seconds);


             // теперь останавливаем наш таймер
             if (t.total <= 0) {
                clearInterval(timeInterval); // => когда наш дедлайн прошел и текущая дата будет больше чем дедлайн
             }
        }
    }
    
    setClock('.timer', deadline);

    // теперь исправляем мигание и добавляем нолики к однозначному числу (09 часов etc)
});

