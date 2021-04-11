(function () {
    //Получаем объекты

    // имя трека
    var nameTrack = document.querySelector('.radio-player-name-track')

    //Плеер
    var radioPlayer = document.getElementById("radio-player");


    //Время

    var progressBar = document.getElementById("audio-hud-progress-bar");

    var currTime = document.getElementById("audio-hud-curr-time");

    var durationTime = document.getElementById("audio-hud-duration");

    //Кнопки

    var actionButton = document.querySelector(".radio__player__action");

    var bodyActionButton = document.querySelector(".radio-player-body-play");

    //  блок с анимацией эквалайзера
    let radioPlayerEqualizer = document.querySelector('.radio-player-equalizer');

    // массив с активным плейлистом
    let currentPlaylistIsActive = []


    // записываем в переменную текуший трек в плеере
    let currentIndexTrack;

    //  загружай плейлист
    setPlaylist(playLists[2].tracks);

    // функция загрузки плейлиста в плеер
    function setPlaylist(playList) {
        currentPlaylistIsActive = [];
        playList.map(e => {
            currentPlaylistIsActive.push(e)
        });
    };


    //функция загрузки трека в плеер
    function setTrack(index) {
        radioPlayer.src = currentPlaylistIsActive[index].src;
        nameTrack.textContent = currentPlaylistIsActive[index].name;
        currentIndexTrack = index
    };




    // функция расчета времени
    function createTime() {

        // подсчитываем общее время звучания треков
        let allDurationTime = arrayDuration.reduce((accumulator, currentValue) => accumulator + Math.floor(currentValue));
        // производим расчет исходя из текущего времени
        let time = Math.floor(Date.now() / 1000) % 191535;
        return time;
    }


    // массив с временем звучания
    let arrayDuration = [3584, 3466, 3540, 3623, 1745, 3405, 2786, 3333, 3258, 3577, 3232, 3289, 3212, 3329, 3064, 3115, 3352, 3041, 3318, 3678, 3653, 3363, 3244, 3549, 2999, 3598, 2570, 2633, 3019, 1368, 917, 2494, 2238, 2682, 2104, 3441, 2267, 2887, 1883, 2594, 2412, 2237, 3373, 2103, 1559, 1570, 1817, 1620, 1985, 1679, 1797, 2601, 1883, 1919, 477, 1564, 1717, 1579, 1290, 1807, 1561, 1581, 1769, 1300, 1548, 1571, 1410, 1494, 1662, 1436, 1855, 1532, 1651, 1661, 1722, 854, 1820, 1637, 1735, 1525, 1453, 1852, 1467];


    // устанавливает текушее время дорожки
    function setCurrentTime(check) {
        // временая переменая для расчета текущего времени
        let tmp = 0;
        // запускаем функцию расчета времени
        let time = createTime();
        // запускаем цикл расчета времени
        for (let i = 0; tmp < time; i++) {
            tmp += arrayDuration[i];
            if (tmp > time) {
                if (currentIndexTrack !== i) {
                    setTrack(i);
                }
                let x = Math.floor(tmp)
                x = x - time;
                x = Math.floor(arrayDuration[i]) - x;
                radioPlayer.currentTime = x;
                // проверка нужно ли запускать плеер
                if (check) {
                    audioAct();
                }
            }
        }
    }

    // поведение плеера когда заканчивается трек
    radioPlayer.addEventListener('ended', () => {
        //   автоматический переход к следующему треку
        if (currentIndexTrack !== currentPlaylistIsActive.length - 1) {
            currentIndexTrack++;
            setTrack(currentIndexTrack);
            audioAct();
        } else {
            currentIndexTrack = 0;
            setTrack(currentIndexTrack);
            audioAct();
        };
    });

    function audioAct() { //Запускаем или ставим на паузу
        if (radioPlayer.paused) {
            radioPlayer.play();
        } else {
            radioPlayer.pause();
        }

        // if (durationTime.innerHTML == "00:00") {
        //     durationTime.innerHTML = audioTime(radioPlayer.duration); //Об этой функции чуть ниже
        // }
    }

    //Отображение времени
    // radioPlayer.addEventListener("timeupdate", audioProgress);

    // определяем на паузе ли плеер и запускаем соотвествующую функцию
    function setPlay() {
        changeButton();
        if (radioPlayer.paused) {
            setCurrentTime(true);
        } else (
            radioPlayer.pause()
        );
    }

    //  функция замены кнопки плей
    function changeButton() {
        if (radioPlayer.paused) {
            actionButton.classList.remove("radio-hud-action-play");
            radioPlayerEqualizer.pause();
        } else {
            actionButton.classList.add("radio-hud-action-play");
            radioPlayerEqualizer.play();
        };
    }

    // отрабатываем клик по кнопке плей
    bodyActionButton.addEventListener('click', setPlay);

    // замена кнопки когда плеер ставяться на паузу
    radioPlayer.addEventListener('pause', changeButton);

    //  обработка когда плеер запускается
    radioPlayer.addEventListener('play', () => {
        // устанавливаем коректное время трека
        setCurrentTime(false);

        // меняем кнопки
        changeButton();
    });

    // подключаем горячие клавиши
    window.addEventListener('keydown', (e) => {
        if (document.activeElement !== document.querySelector('.donation__form__input__message')) {
            if (e.keyCode === 32) {
                e.preventDefault();
                setPlay();
            }
        }
    });
    setCurrentTime(true);

    // функция запроса на сервер
    async function getContUsers() {
        // отправляем запрос
        let response =
            await fetch('count_users.inc.php?click=1', {
                method: 'get',
            });
        // обрабатываем ответ
        if (response.ok) {
            let result = await response.json();

            // выводим колличество пользователй
            document.querySelector('.radio__count__users').textContent = `${result.message} чел.`
        }
    }

    // запускаем функцию запроса на сервер каждые n времени
    setInterval(getContUsers, 10000);


    document.addEventListener('dblclick', () => {

        // если элемент уже в полноэкранном режиме, выйти из него
        // В противном случае войти в полный экран
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    });


    // проверка длинны массива с временем всех треков
    // let countArrayDuration = 0;
    // function countDuration(audioDuration) {
    //     // заполняем массив
    //     arrayDuration.push(Math.floor(audioDuration));

    //     // отслеживаем длинну массива с временем треков
    //     countArrayDuration++
    //     // если массив полностью собран запускаем расчет текущего трека и времени
    //     if (countArrayDuration === playLists[2].tracks.length) {
    //         setCurrentTime(true)
    //     }
    // }

    // // проверка на колличество треков
    // let countTracks = 0;
    // // получаем время всех треков
    // function loadDuration() {
    //     // создаем аудио тег
    //     let audio = document.createElement('audio');
    //     // загружаем в него трек и устанавливаем настройки
    //     audio.src = playLists[2].tracks[countTracks].src;
    //     audio.preload = "metadata";

    //     // дожидаемся загрузки данных о треке и запускаем функцию извлечения времени трека
    //     audio.addEventListener('loadeddata', () => {
    //         countDuration(audio.duration);
    //         countTracks++
    //         // запускаем петлю этой функции пока не пройдемся по всем трекам
    //         if (countTracks < playLists[2].tracks.length) {
    //             loadDuration()
    //         } else {

    //         }
    //     });
    // }





    // получаем время трека
    // radioPlayer.onloadedmetadata = function () {
    //     durationTime.innerHTML = audioTime(this.duration)
    // };

    // устанавливаем градиент для времени
    // progressBar.style.background = `-webkit-linear-gradient(left, #fff 0%, #fff ${progressBar.value}%, #000 ${progressBar.value}%, #000 100%)`;


    // function audioTime(time) { //Рассчитываем время в секундах и минутах

    //     time = Math.floor(time);

    //     var minutes = Math.floor(time / 60);

    //     var seconds = Math.floor(time - minutes * 60);

    //     var minutesVal = minutes;

    //     var secondsVal = seconds;

    //     if (minutes < 10) {

    //         minutesVal = "0" + minutes;

    //     }

    //     if (seconds < 10) {

    //         secondsVal = "0" + seconds;

    //     }

    //     return minutesVal + ":" + secondsVal;

    // };


    // function audioProgress() { //Отображаем время воспроизведения
    //     progress = radioPlayer.duration / 100;
    //     progress = radioPlayer.currentTime / progress;
    //     let x = progress
    //     if (x === progress) {
    //         progressBar.value = progress
    //     };
    //     currTime.innerHTML = audioTime(radioPlayer.currentTime);
    //     progressBar.style.background = `-webkit-linear-gradient(left, #fff 0%, #fff ${progressBar.value}%, #000 ${progressBar.value}%, #000 100%)`;
    //     if (progressBar.value == 100) {
    //         progressBar.style.borderRight = '1px solid #000'
    //     } else { progressBar.style.borderRight = '1px solid #fff' };

    // };

})();