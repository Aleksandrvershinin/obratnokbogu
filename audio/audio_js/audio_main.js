import {
    startMarquee
} from '/audio/audio_js/marquee.js';
import {
    scroll
} from '/audio/audio_js/scroll.js';
import {
    drowPlaylists,
    markerPlaylist
} from '/audio/audio_js/drowPlaylists.js';


// функция добавления к каждому плейлисту id
addIdToAllPlaylist();
// функция добавления к каждому треку уникального id
addIdToAllTracks()

// функция добавления к каждому треку названия на латинице
addTranslit();

//Получаем объекты

// тело элемнета с бегущей строкой
let marqueeWrapper = document.querySelector('.audio-player-name-track');

//  бегущая строка с название трека
let marquee1 = document.querySelector('.audio-player-name-track-marquee1');
// вторая бегущая строка с название трека
let marquee2 = document.querySelector('.audio-player-name-track-marquee2');

// тег для добавления списка треков
let playlistList = document.querySelector('.audio-playlist-list');

// имя трека
let nameTrack = document.querySelectorAll('.audio-player-name-track p');

//Плеер
let audioPlayer = document.getElementById("audio-player");

// контейнер с плей листом
let audioPlaylistContainer = document.querySelector('.audio-playlist-container')

//Время
let progressBar = document.getElementById("audio-hud-progress-bar");

let currTime = document.getElementById("audio-hud-curr-time");

let durationTime = document.getElementById("audio-hud-duration");

//Кнопки
let previeButton = document.querySelector('.audio-player-body-previe');

let nextButton = document.querySelector('.audio-player-body-next');

let mixButton = document.querySelector('.audio-hud-mix');

let loopButton = document.querySelector('.audio-hud-loop');

let actionButton = document.getElementById("audio-hud-action");

let bodyActionButton = document.getElementById("audio-player-body-play");

let muteButton = document.getElementById("audio-hud-mute");

let volumeScale = document.getElementById("audio-hud-volume");

let btnSearch = document.querySelector('.audio-playlists-form-btn');

let formInputSearch = document.querySelector('.audio-playlists-form-input');

let audioPlaylistsFormLabel = document.getElementById('audio__playlists__form__label');

// переменная интервального таймера бегущей строки
window.intervalMarquee = 0;

// переменная с отложенным таймером запуска бегущей строки
let timeoutMarquee;
// массив с текущим плей листом
let currentPlaylist = []

// массив с активным плейлистом
let currentPlaylistIsActive = []
let copyCurrentPlaylistIsActive = [];

// записываем в переменную текуший трек в плеере
let currentIndexTrack;

// записываем в переменную текущий id трека
let currentIdTrack;
// переменная с id текущего плейлиста
let currentIdPlaylist;
// переменная с временем
let timeTrack;
// отслеживаем активно ли перемешивание плей листа
let mix = false
    //получаем данные из localStorage
let safeInfo = localStorage.getItem('safeInfoTrack');
if (safeInfo == null) {
    currentIdTrack = 1;
    timeTrack = 0;
} else {
    safeInfo = JSON.parse(safeInfo);
    currentIdTrack = safeInfo['idTrack'];
    timeTrack = safeInfo['time'];
    if (currentIdTrack === undefined) {
        currentIdTrack = 1;
        timeTrack = 0;
    }
};


// проверка колличества символов
formInputSearch.addEventListener('input', () => {
    if (formInputSearch.value.trim().length < 2) {
        formInputSearch.classList.add('is-error');
    } else {
        formInputSearch.classList.remove('is-error');
    }
    if (formInputSearch.value.trim().length === 0) {
        formInputSearch.classList.remove('is-error');
    }
});


// объявляем функцию поиска
btnSearch.addEventListener('click', () => startSearch());





// добавляем кастомный скролл
audioPlaylistContainer.setAttribute('data-simplebar', '');
audioPlaylistContainer.setAttribute('data-simplebar-scrollbar-max-size', '50');

// получаем элемент "плей" в плейлисте
let audioPlaylistItemPlay = document.querySelectorAll('.audio-playlist-item-play-pause');
let audioPlaylistItemPlayEqualizer = document.querySelectorAll('.audio-playlist-item-equalizer');



// переключение трека назад
previeButton.addEventListener('click', () => {
    if (currentIndexTrack === 0) {
        currentIndexTrack = currentPlaylistIsActive.length - 1;
        setTrack(currentIndexTrack)
        audioAct()
    } else {
        currentIndexTrack--
        setTrack(currentIndexTrack)
        audioAct()
    };
});



// переключение трека вперед
nextButton.addEventListener('click', () => {
    if (currentIndexTrack === currentPlaylistIsActive.length - 1) {
        currentIndexTrack = 0;
        setTrack(currentIndexTrack)
        audioAct()
    } else {
        currentIndexTrack++
        setTrack(currentIndexTrack)
        audioAct()
    };
});


// отслеживаем клик и заполняем перемешанный плейлист
mixButton.addEventListener('click', () => {
    mixArray();
});
// получаем время трека
audioPlayer.onloadedmetadata = function() {
        durationTime.innerHTML = audioTime(this.duration);
    }
    // устанавливаем градиент для времени
progressBar.style.background = `-webkit-linear-gradient(left, rgb(38, 111, 170) 0%, rgb(38, 111, 170) ${progressBar.value}%, #000 ${progressBar.value}%, #000 100%)`;
// устанавливаем градиент для звука
volumeScale.style.background = `-webkit-linear-gradient(left, #fff 0%, #fff ${volumeScale.value}%, rgb(100, 100, 100) ${volumeScale.value}%, rgb(100, 100, 100) 100%)`;

if (audioPlayer.paused || audioPlayer.stop) {
    actionButton.setAttribute("class", "audio-hud-element audio-hud-action audio-hud-action-pause");
};
// устанавливаем громкость
audioPlayer.volume = volumeScale.value / 100;

// настраиваем повтор
let loopCheck = 0
loopButton.addEventListener('click', () => {
    if (loopCheck === 0) {
        loopCheck++;
        loopButton.classList.add('audio-hud-loop-active1');
        return
    };
    if (loopCheck === 1) {
        audioPlayer.loop = true
        loopCheck++;
        loopButton.classList.add('audio-hud-loop-active2');
        return
    };
    if (loopCheck === 2) {
        audioPlayer.loop = false
        loopCheck = 0;
        loopButton.classList.remove('audio-hud-loop-active2', 'audio-hud-loop-active1');
        return
    };
});


//Запуск, пауза

bodyActionButton.addEventListener("click", audioAct);


// поведение плеера когда заканчивается трек
audioPlayer.addEventListener('ended', () => {
    //  отключение плеера когда заканчивается последний трек в плейлисте
    if (loopCheck === 0) {
        if (currentIndexTrack !== currentPlaylistIsActive.length - 1) {
            playTimeout();
        } else {
            audioPlayer.pause()
            changeButton(searchTrackInPlaylist(currentPlaylist))
            return
        };
    };
    //   автоматический переход к следующему треку
    if (loopCheck === 1) {
        if (currentIndexTrack !== currentPlaylistIsActive.length - 1) {
            playTimeout();
        } else {
            currentIndexTrack = -1;
            playTimeout();
        };
    };
});
// фукция отложенного старта следующего трека
function playTimeout() {
    setTimeout(() => {
        playNextTrack();
        // подкручиваем что бы активный трек оставался на виду
        scroll(true);
    }, 2000);
}
// функция старта следующего трека
function playNextTrack() {
    currentIndexTrack++;
    setTrack(currentIndexTrack);
    audioAct();
}


//Отображение времени

audioPlayer.addEventListener("timeupdate", () => {
    audioProgress();
    saveInfo();
});

//Перемотка

progressBar.addEventListener("input", audioChangeTime);





//Звук

muteButton.addEventListener("click", audioMute);

volumeScale.addEventListener("input", audioChangeVolume);



audioPlayer.addEventListener('pause', () => {
    if (audioPlayer.paused) {
        actionButton.classList.remove("audio-hud-action-play");
        changeButton(searchTrackInPlaylist(currentPlaylist))
    } else {
        actionButton.classList.add("audio-hud-action-play");
        changeButton(searchTrackInPlaylist(currentPlaylist))
    };
});
audioPlayer.addEventListener('play', () => {
    if (audioPlayer.paused) {
        actionButton.classList.remove("audio-hud-action-play");
        changeButton(searchTrackInPlaylist(currentPlaylist))
    } else {
        actionButton.classList.add("audio-hud-action-play");
        changeButton(searchTrackInPlaylist(currentPlaylist))
    };
});

window.addEventListener('keydown', (e) => {
    if (audioPlayer.src.length > 0 && document.activeElement !== formInputSearch) {
        if (e.keyCode === 32) {
            e.preventDefault();
            audioAct();
        }
    }
});

// загружаем страничку
loadPage();

// добовляем в переменную элементы плей листов
let audioPlaylists = document.querySelectorAll('.audio-playlists-item');
// подсвечиваем плейлист
markerCurrentPlaylist();
// отслеживаевае клики по плейлистам
audioPlaylists.forEach((e, i) => {
    e.addEventListener('click', () => {
        audioPlaylists.forEach(e => {
            e.classList.remove('audio-item-is-active')
        });
        audioPlaylists[i].classList.add('audio-item-is-active');
        filingPlaylist(lookforPlaylistByName(audioPlaylists[i].textContent));
        if (currentPlaylistIsActive.length !== 0) {
            changeButton(searchTrackInPlaylist(currentPlaylist))
        };
    });
});

// функция добавления к каждому плейлисту id
function addIdToAllPlaylist() {
    let id = 1
    playLists.forEach((element) => {
        element.id = id;
        id++
    })
};

// функция добавления к каждому треку уникального id
function addIdToAllTracks() {
    let id = 1
    playLists.forEach((e, i) => {

        e.tracks.forEach((element, index) => {
            if (element !== null) {
                element.id = id;
                id++
            };
        })
    })
};


// функция добавления к каждому треку названия на латинице
function addTranslit() {
    playLists.forEach((e, i) => {
        e.tracks.forEach((element, index) => {
            if (element !== null) {
                element.nameTranslit = translit(element.name);
            };
        })
    });
};
// функция транслита
function translit(word) {
    let converter = {
        'а': 'a',
        'б': 'b',
        'в': 'v',
        'г': 'g',
        'д': 'd',
        'е': 'e',
        'ё': 'e',
        'ж': 'zh',
        'з': 'z',
        'и': 'i',
        'й': 'y',
        'к': 'k',
        'л': 'l',
        'м': 'm',
        'н': 'n',
        'о': 'o',
        'п': 'p',
        'р': 'r',
        'с': 's',
        'т': 't',
        'у': 'u',
        'ф': 'f',
        'х': 'h',
        'ц': 'c',
        'ч': 'ch',
        'ш': 'sh',
        'щ': 'sch',
        'ь': '',
        'ы': 'y',
        'ъ': '',
        'э': 'e',
        'ю': 'yu',
        'я': 'ya'
    };

    word = word.toLowerCase();
    let answer = '';
    for (let i = 0; i < word.length; ++i) {
        if (converter[word[i]] === undefined) {
            answer += word[i];
        } else {
            answer += converter[word[i]];
        }
    }
    answer = answer.replace(/[^\_0-9a-z]/g, '_');
    answer = answer.replace(/[_]+/g, '_');
    answer = answer.replace(/^\-|-$/g, '');
    return answer;
}

// функция поиска плейлиста по названию
function lookforPlaylistByName(namePlaylist) {
    let findedObject
    playLists.map(e => {
        if (e.name == namePlaylist) {
            findedObject = e.tracks;
            currentIdPlaylist = e.id;
        }
    });
    return findedObject;
};

// функция поиска  трека
function lookforTrack(key, name) {
    let idTrack;
    let playlist;
    let idPlaylist;
    playLists.map(element => {
        if (playlist === undefined) {
            element.tracks.map((e, i) => {
                if (e[key] == name) {
                    playlist = element.tracks;
                    idTrack = e.id;
                    idPlaylist = element.id;
                    return;
                };
            });
        }
    });
    return {
        playlist,
        idTrack,
        idPlaylist,
    };
};

// подсвечивае текущий плейлист
function markerCurrentPlaylist() {
    if (currentIdPlaylist !== undefined) {
        audioPlaylists[currentIdPlaylist - 1].classList.add('audio-item-is-active');
    }
}
// фильтрация массива на одинаковые названия треков
function filterArray(array) {
    let newArray = [];
    array.forEach(e => {
        if (newArray.length === 0) {
            newArray.push(e);
        } else {
            for (let i = 0; i < newArray.length; i++) {
                let check = i;
                if (e.name !== newArray[i].name) {
                    check++
                    if (check === newArray.length) {
                        newArray.push(e);
                    }
                } else {
                    return
                }
            }
        }
    });
    return newArray;
}

// функция поиска треков
function searchTracks() {
    let stringSearch = formInputSearch.value.toLowerCase().trim();
    let findedTracks = [];
    playLists.map(element => {
        element.tracks.map(el => {
            if (el.name.toLowerCase().trim().indexOf(stringSearch) !== -1) {
                findedTracks.push(el);
            }
        });
    });
    let newfindedTracks = filterArray(findedTracks);
    return newfindedTracks;
}
// запускаем поиск
function startSearch() {
    if (formInputSearch.value.trim().length > 1) {
        filingPlaylist(searchTracks(), formInputSearch.value.toLowerCase().trim());
        audioPlaylists.forEach(e => {
            e.classList.remove('audio-item-is-active');
        });
    }
}
//функция заполнения плей листа
function filingPlaylist(namePlaylist, stringSearch = false) {
    let audioPlaylist = document.querySelectorAll('.audio-playlist-item');
    audioPlaylist.forEach(e => {
        e.remove();
    });
    currentPlaylist = []
    namePlaylist.map((e, i) => {
        currentPlaylist.push(e);
        let li = document.createElement('li');
        li.classList.add('audio-playlist-item');
        playlistList.append(li);
        e.markName = e.name;
        // проверяем активен ли поиск
        if (stringSearch) {
            // записываем индекс начала вхождения
            let start = e.name.toLowerCase().trim().indexOf(stringSearch);
            // записываем длинну строки
            let length = stringSearch.length;
            // отмечаем подстроки
            // debugger
            e.markName = e.name.substring(0, start) + "<mark>" + e.name.substring(start, start + length) + "</mark>" + e.name.substring(start + length);
        }
        let uri = `https://obratnokbogu.ru/audio/${e.nameTranslit}`;
        li.innerHTML = `
            <button class="audio-playlist-item-body-play">
            <div class="audio-playlist-item-play audio-playlist-item-play-pause">
            </div>
            <div class="audio-playlist-item-equalizer">
            <div class="audio-playlist-item-equalizer-bar"></div>
            <div class="audio-playlist-item-equalizer-bar"></div>
            <div class="audio-playlist-item-equalizer-bar"></div>
            <div class="audio-playlist-item-equalizer-bar"></div>
            </div>
            </button>
            <audio preload="none" class="audio1" src="${e.src}"></audio>
            <div class="audio-playlist-item-info-playlist">
                <p title="${e.name}" class="audio-playlist-item-name-track">${e.markName}</p>
                <span class='audio-playlist-item-name-track-points'>...</span>
            </div>
            <div class="audio-playlist-item-btns">
               <div class="audio__duration">${e.duration}</div>
               <button title="скачать"  class="audio-playlist-item-download">
                  <a  download href="${e.src}"></a>
               </button>
               <div class="ya-share2" data-url="${uri}" data-title="${e.name}" data-image="https://obratnokbogu.ru/media/sh.jpg" data-more-button-type="short" data-popup-direction="auto" data-popup-position="outer" data-direction="horizontal" data-limit="0" data-copy="last" data-shape="round" data-size="s" data-services="vkontakte,facebook,odnoklassniki,telegram,whatsapp,viber"></div>
            </div>`;

        // if (e.name.length > 87) {
        //     addPointsNameTracks(i)
        // };
        // cutName(i);
    });
    clickAudioPlaylistPlay();
    // запуск скрипта поделиться
    initShare();
};
// // функция обрезки имени
// function cutName(index) {
//     let div = document.querySelectorAll('.audio-playlist-item-info-playlist');
//     let nameTrackElement = document.querySelectorAll('.audio-playlist-item-name-track');
//     let wDiv = div[index].clientWidth;
//     cut();
//     function cut() {
//         let wNameTrack = nameTrackElement[index].clientWidth;
//         if (wNameTrack > wDiv) {
//             let nameTrack = nameTrackElement[index].textContent.trim();
//             console.log(nameTrack);
//             nameTrackElement[index].textContent = nameTrack.substring(0, nameTrack.length - 1);
//             cut();
//         }
//     }
// }

// функция инцилизации скрипта поделиться
function initShare() {
    let scriptShare = document.querySelector('.script-share');
    scriptShare.remove();
    scriptShare = document.createElement('script');
    scriptShare.classList.add('script-share');
    scriptShare.src = "/js/share_social_media.js";
    scriptShare.async = true;
    document.getElementsByTagName('head')[0].appendChild(scriptShare);
}

// функция добавление точек в конец имени трека
function addPointsNameTracks(i) {
    let items = document.querySelectorAll('.audio-playlist-item-name-track-points');
    items[i].style.display = 'inline';
};

// функция генерации случайных чисел
function getRandomArray(n = 7, m = 0) {
    let randomArray = [];
    let range = Math.abs(m - n);


    for (let i = 0; i < range + 1; i++) {
        getRandomNomber(n, m);
    }

    function getRandomNomber(n, m) {
        let nomberInrange = Math.round(Math.random() * range);
        let min = Math.min(n, m);
        let r = min + nomberInrange;
        let c = randomArray.includes(r);
        if (c === true) {
            if (range + 1 == randomArray.length) {
                return
            } else {
                getRandomNomber(n, m);
            }
        } else {
            randomArray.push(r);
        }

    };
    return randomArray;
};
// функция поиска трека в плей листе из плеера
function searchTrackInPlaylist(array, id = currentPlaylistIsActive[currentIndexTrack].id) {
    let result;
    array.map((e, i) => {
        if (e.id === id) {
            result = i
        };
    });
    return result
};
//переключаем вид кнопок в плейлисте
function changeButton(index) {
    if (index !== undefined) {
        markerCurrentTrack(index)
        audioPlaylistItemPlay = document.querySelectorAll('.audio-playlist-item-play-pause');
        audioPlaylistItemPlayEqualizer = document.querySelectorAll('.audio-playlist-item-equalizer');
        audioPlaylistItemPlay.forEach(e => {
            e.classList.add('audio-playlist-item-play');
        });
        audioPlaylistItemPlayEqualizer.forEach(e => {
            e.classList.remove('audio-playlist-item-equalizer-is-active');
            e.parentNode.classList.remove('is-active');
        });
        if (audioPlayer.paused) {
            audioPlaylistItemPlay[index].classList.add('audio-playlist-item-play');
            audioPlaylistItemPlayEqualizer[index].classList.remove('audio-playlist-item-equalizer-is-active');
            audioPlaylistItemPlayEqualizer[index].parentNode.classList.remove('is-active');
        } else {
            audioPlaylistItemPlay[index].classList.remove('audio-playlist-item-play');
            audioPlaylistItemPlayEqualizer[index].classList.add('audio-playlist-item-equalizer-is-active');
            audioPlaylistItemPlayEqualizer[index].parentNode.classList.add('is-active');
        };
    };
};

// функция поиска индекса трека
function lookforIndexTrack() {
    if (currentPlaylistIsActive.length !== 0) {
        currentPlaylistIsActive.map((e, i) => {
            if (e.id === currentIdTrack) {
                currentIndexTrack = i;
            };
        });
        return currentIndexTrack
    }

};

// функция загрузки плейлиста в плеер
function setPlaylist(playList) {
    currentPlaylistIsActive = [];
    playList.map(e => {
        currentPlaylistIsActive.push(e);
    });
    copyCurrentPlaylistIsActive = currentPlaylistIsActive.slice();
};

//функция загрузки трека в плеер
function setTrack(index) {
    // остановка бегущей строки
    clearInterval(intervalMarquee);
    clearTimeout(timeoutMarquee);
    marquee1.style.left = `0`;
    // прячем второю строку
    marquee2.classList.add('hide');

    audioPlayer.src = currentPlaylistIsActive[index].src;
    nameTrack.forEach(element => {
        element.textContent = currentPlaylistIsActive[index].name
    });

    // ззапуск бегущей строки
    timeoutMarquee = setTimeout(startMarquee, 3000, {
        marqueeWrapper,
        marquee1,
        marquee2,
        intervalMarquee,
    });

    currentIndexTrack = index;
    // активируем прогресс бар
    progressBar.removeAttribute('disabled');
    let uri = `https://obratnokbogu.ru/audio/${currentPlaylistIsActive[index].nameTranslit}`;
    share.updateContent({
        title: currentPlaylistIsActive[index].name,
        url: uri,
    });
};

// функция подсветки текущего трека
function markerCurrentTrack(index) {
    let audioPlaylist = document.querySelectorAll('.audio-playlist-item');
    audioPlaylist.forEach(e => {
        e.classList.remove('audio-item-is-active');
    })
    audioPlaylist[index].classList.add('audio-item-is-active');
};

// отрабатываем клики по кнопке и запускаем плеер
function clickAudioPlaylistPlay() {
    // Получаем кнопки плей в плей листе
    let audioPlaylistPlay = document.querySelectorAll('.audio-playlist-item-body-play');
    audioPlaylistPlay.forEach((e, i) => {
        e.addEventListener('click', (e) => {
            if (currentPlaylistIsActive.length == 0) {
                setPlaylist(currentPlaylist);
                setTrack(i);
                audioAct();
                mixButton.classList.remove('audio-hud-mix-is-active');
                mix = false;
                return
            };
            if (currentIndexTrack === undefined) {
                setPlaylist(currentPlaylist);
                setTrack(i)
                audioAct();
                mixButton.classList.remove('audio-hud-mix-is-active');
                mix = false;
                return
            };
            if (currentPlaylist[i].id !== currentPlaylistIsActive[currentIndexTrack].id) {
                setPlaylist(currentPlaylist);
                setTrack(i)
                audioAct();
                mixButton.classList.remove('audio-hud-mix-is-active');
                mix = false;
            } else {
                audioAct();
            }
        });
    });
};

// функция перемешивания плей листа
function mixArray() {
    if (currentPlaylistIsActive !== undefined && currentPlaylistIsActive.length != 0) {
        if (!mix) {
            let randomArray = getRandomArray(currentPlaylistIsActive.length - 1, 0);
            let mixCurrentPlaylistIsActive = [];
            currentPlaylistIsActive.map((element, index) => {
                mixCurrentPlaylistIsActive.push(currentPlaylistIsActive[randomArray[index]]);
            });
            currentPlaylistIsActive = []
            currentPlaylistIsActive = mixCurrentPlaylistIsActive.slice();
            lookforIndexTrack()
            mixButton.classList.add('audio-hud-mix-is-active');
            mix = true
        } else {
            currentPlaylistIsActive = []
            currentPlaylistIsActive = copyCurrentPlaylistIsActive.slice();
            lookforIndexTrack()
            mixButton.classList.remove('audio-hud-mix-is-active');
            mix = false;
        };
    };
}
// функция загрузки плейлиста, плеера
function loadPage() {
    // ищем трек по названию
    let result = lookforTrack('nameTranslit', resultUrl);
    // проверка на плей
    let checkPlay = false;
    // проверяем найден ли плейлист
    if (result['playlist'] !== undefined) {
        // если трек был найден по названию устанвливаем проверку на true, далее попробуем включить авто плей
        checkPlay = true;
    } else {
        // ищем трек по id
        result = lookforTrack('id', currentIdTrack);
    }
    // id текущего плей листа
    currentIdPlaylist = result['idPlaylist'];
    // загружаем плейлисты
    drowPlaylists(currentIdPlaylist);
    // заполняем список треков
    filingPlaylist(result['playlist']);
    // устанавливаем трек
    currentIdTrack = result['idTrack'];
    // подсвечиваем трек
    markerCurrentTrack(searchTrackInPlaylist(currentPlaylist, currentIdTrack));
    // прокручиваем к треку
    setTimeout(scroll, 1);
    // загружаем плейлист в плеер
    setPlaylist(currentPlaylist);
    // устанавливаем трек в плеер
    setTrack(lookforIndexTrack());
    // учтанавливаем время начала воспроизведения
    audioPlayer.currentTime = timeTrack;
    // проверяем плей
    if (checkPlay) {
        audioAct();
    }
}
// функция сохранения информации в localStorage
function saveInfo() {
    let safeInfoTrack = {
        'idTrack': currentIdTrack,
        'time': audioPlayer.currentTime,
    }
    localStorage.setItem('safeInfoTrack', JSON.stringify(safeInfoTrack));
}

function audioAct() { //Запускаем или ставим на паузу
    if (audioPlayer.src) {
        if (audioPlayer.paused) {
            audioPlayer.play();
            currentIdTrack = currentPlaylistIsActive[currentIndexTrack].id
                // сохраняем информацию в localStorage
            saveInfo();
            changeButton(searchTrackInPlaylist(currentPlaylist));
            // функция отметки плейлиста
            markerPlaylist(currentIdTrack, lookforTrack);
        } else {
            audioPlayer.pause();
            changeButton(searchTrackInPlaylist(currentPlaylist))
        };

        if (durationTime.innerHTML == "00:00") {

            durationTime.innerHTML = audioTime(audioPlayer.duration); //Об этой функции чуть ниже

        }
    }
}

function audioTime(time) { //Рассчитываем время в секундах и минутах

    time = Math.floor(time);

    let minutes = Math.floor(time / 60);

    let seconds = Math.floor(time - minutes * 60);

    let minutesVal = minutes;

    let secondsVal = seconds;

    if (minutes < 10) {

        minutesVal = "0" + minutes;

    }

    if (seconds < 10) {

        secondsVal = "0" + seconds;

    }

    return minutesVal + ":" + secondsVal;

};


function audioProgress() { //Отображаем время воспроизведения
    let progress = audioPlayer.duration / 100;
    progress = audioPlayer.currentTime / progress;
    let x = progress
    if (x === progress) {
        progressBar.value = progress
    };
    currTime.innerHTML = audioTime(audioPlayer.currentTime);
    progressBar.style.background = `-webkit-linear-gradient(left, rgb(38, 111, 170) 0%, rgb(38, 111, 170) ${progressBar.value}%, #000 ${progressBar.value}%, #000 100%)`;
    if (progressBar.value == 100) {
        progressBar.style.borderRight = '1px solid #000'
    } else {
        progressBar.style.borderRight = '1px solid #fff'
    };

};

function audioChangeTime() { //Перематываем
    let mouseX = progressBar.value;
    audioPlayer.currentTime = audioPlayer.duration / 100 * mouseX
    progressBar.style.background = `-webkit-linear-gradient(left, rgb(38, 111, 170) 0%, rgb(38, 111, 170) ${progressBar.value}%, #000 ${progressBar.value}%, #000 100%)`;
    if (mouseX == 100) {
        progressBar.style.borderRight = '1px solid #000'
    } else {
        progressBar.style.borderRight = '1px solid #fff'
    };
};

function audioChangeVolume() { //Меняем громкость
    volumeScale.style.background = `-webkit-linear-gradient(left, #fff 0%, #fff ${volumeScale.value}%, rgb(100, 100, 100) ${volumeScale.value}%, rgb(100 100 100 / 100%)`;

    let volume = volumeScale.value / 100;

    audioPlayer.volume = volume;

    if (audioPlayer.volume == 0) {

        muteButton.setAttribute("class", "audio-hud-element audio-hud-mute audio-hud-mute-true");

    } else {

        muteButton.setAttribute("class", "audio-hud-element audio-hud-mute audio-hud-mute-false");

    }

}

function audioMute() { //Убираем звук
    if (audioPlayer.volume == 0) {
        audioPlayer.volume = volumeScale.value / 100;
        muteButton.setAttribute("class", "audio-hud-element audio-hud-mute audio-hud-mute-false");
    } else {
        audioPlayer.volume = 0;
        muteButton.setAttribute("class", "audio-hud-element audio-hud-mute audio-hud-mute-true");
    }
};