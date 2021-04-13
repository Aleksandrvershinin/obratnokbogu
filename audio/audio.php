<script>
    document.addEventListener('DOMContentLoaded', () => {


        // функция добавления к каждому треку уникального id
        addIdToAllTracks()

        // функция добавления к каждому треку названия на латинице
        addTranslit();

        //Получаем объекты

        // тег для добавления списка плейлистов
        var playlistsList = document.querySelector('.audio-playlists-list');

        // тег для добавления списка треков
        var playlistList = document.querySelector('.audio-playlist-list');

        // имя трека
        var nameTrack = document.querySelector('.audio-player-name-track');

        //Плеер
        var audioPlayer = document.getElementById("audio-player");

        // контейнер с плей листом
        var audioPlaylistContainer = document.querySelector('.audio-playlist-container')

        //Время
        var progressBar = document.getElementById("audio-hud-progress-bar");

        var currTime = document.getElementById("audio-hud-curr-time");

        var durationTime = document.getElementById("audio-hud-duration");

        //Кнопки
        var previeButton = document.querySelector('.audio-player-body-previe');

        var nextButton = document.querySelector('.audio-player-body-next');

        var mixButton = document.querySelector('.audio-hud-mix');

        var loopButton = document.querySelector('.audio-hud-loop');

        var actionButton = document.getElementById("audio-hud-action");

        var bodyActionButton = document.getElementById("audio-player-body-play");

        var muteButton = document.getElementById("audio-hud-mute");

        var volumeScale = document.getElementById("audio-hud-volume");

        var speedSelect = document.getElementById("audio-hud-speed");

        var btnSearch = document.querySelector('.audio-playlists-form-btn');

        var formInputSearch = document.querySelector('.audio-playlists-form-input');

        let audioPlaylistsFormLabel = document.getElementById('audio__playlists__form__label');

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
        let currentIdPlaylist
        //получаем данные из localStorage
        // отслеживаем активно ли перемешивание плей листа
        let mix = false
        let safeInfo = localStorage.getItem('safeInfoTrack');
        localStorage.removeItem('safeInfoPlaylist');
        localStorage.removeItem('book');
        if (safeInfo == null) {
            currentIdTrack = 1;
        } else {
            safeInfo = JSON.parse(safeInfo);
            currentIdTrack = safeInfo;
        };


        // проверка колличества символов
        formInputSearch.addEventListener('input', () => {
            if (formInputSearch.value.trim().length < 3) {
                formInputSearch.classList.add('is-error');
                audioPlaylistsFormLabel.textContent = 'Введите не менее 3 символов'
            } else {
                formInputSearch.classList.remove('is-error');
                audioPlaylistsFormLabel.textContent = ''
            }
            if (formInputSearch.value.trim().length === 0) {
                formInputSearch.classList.remove('is-error');
                audioPlaylistsFormLabel.textContent = ''
            }
        });


        // объявляем функцию поиска
        btnSearch.addEventListener('click', () => startSearch());





        // добавляем кастомный скролл
        audioPlaylistContainer.setAttribute('data-simplebar', '')
        audioPlaylistContainer.setAttribute('data-simplebar-scrollbar-max-size', '50')

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


        // заполняем плейлисты
        filingPlaylists()


        // отслеживаем клик и заполняем перемешанный плейлист
        mixButton.addEventListener('click', () => {
            mixArray()
        });
        // получаем время трека
        audioPlayer.onloadedmetadata = function() {
            durationTime.innerHTML = audioTime(this.duration)
        };
        // устанавливаем градиент для времени
        progressBar.style.background = `-webkit-linear-gradient(left, #fff 0%, #fff ${progressBar.value}%, #000 ${progressBar.value}%, #000 100%)`;
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
        <?php
        include $_SERVER['DOCUMENT_ROOT'] . "/audio/process_url.php";
        ?>





        function scroll() {
            let myElement = document.querySelector('.audio-playlist-item.audio-item-is-active');
            let topPos = myElement.offsetTop;
            document.querySelector('.simplebar-content-wrapper').scrollTop = topPos;
        }

        // добовляем в переменную элементы плей листов
        let audioPlaylists = document.querySelectorAll('.audio-playlists-item');
        // подсвечивае текущий плейлист
        if (currentIdPlaylist !== undefined) {
            audioPlaylists[currentIdPlaylist - 1].classList.add('audio-item-is-active');
        }

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




        //Запуск, пауза

        bodyActionButton.addEventListener("click", audioAct);


        // поведение плеера когда заканчивается трек
        audioPlayer.addEventListener('ended', () => {
            //  отключение плеера когда заканчивается последний трек в плейлисте
            if (loopCheck === 0) {
                if (currentIndexTrack !== currentPlaylistIsActive.length - 1) {
                    currentIndexTrack++;
                    setTrack(currentIndexTrack);
                    audioAct();
                } else {
                    audioPlayer.pause()
                    changeButton(searchTrackInPlaylist(currentPlaylist))
                    return
                };
            };
            //   автоматический переход к следующему треку
            if (loopCheck === 1) {
                if (currentIndexTrack !== currentPlaylistIsActive.length - 1) {
                    currentIndexTrack++;
                    setTrack(currentIndexTrack);
                    audioAct();
                } else {
                    currentIndexTrack = 0;
                    setTrack(currentIndexTrack);
                    audioAct();
                };
            };
        });



        //Отображение времени

        audioPlayer.addEventListener("timeupdate", audioProgress);

        //Перемотка

        progressBar.addEventListener("input", audioChangeTime);



        // function audioChangeSpeed() { //Меняем скорость

        //     var speed = speedSelect.value / 100;

        //     audioPlayer.playbackRate = speed;

        // }

        //Звук

        muteButton.addEventListener("click", audioMute);

        volumeScale.addEventListener("input", audioChangeVolume);

        //Работа со скоростью
        // speedSelect.addEventListener("change", audioChangeSpeed);

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




        // функция добавления к каждому треку уникального id
        function addIdToAllTracks() {
            id = 1
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
            var converter = {
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
            var answer = '';
            for (var i = 0; i < word.length; ++i) {
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

        // функция поиска плей трека
        function lookforTrack(key, name) {
            let idTrack;
            let playlist;
            let idPlaylist;
            // for (i = 0; i < playLists.length && result === undefined; i++) {
            //     result = playLists[i].tracks.find(item => item[key] == name);
            //     if (result !== undefined) {
            //         currentIdPlaylist = playLists[i].id;
            //         idPlaylist = playLists[i].id;
            //         idTrack = result.id;
            //         playlist = playLists[i].tracks
            //     }
            // }

            playLists.map(element => {
                if (playlist === undefined) {
                    element.tracks.map((e, i) => {
                        if (e[key] == name) {
                            playlist = element.tracks;
                            idTrack = e.id;
                            currentIdPlaylist = element.id;
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
        // фильтрация массива на одинаковые названия треков
        function filterArray(array) {
            newArray = [];
            array.forEach(e => {
                if (newArray.length === 0) {
                    newArray.push(e);
                } else {
                    for (i = 0; i < newArray.length; i++) {
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
            let findedTracks = [];
            playLists.map(element => {
                element.tracks.map(el => {
                    if (el.name.toLowerCase().replace(/[()\\/\s]/gi, '').search(formInputSearch.value.toLowerCase().replace(/[()\\/\s]/gi, '')) !== -1 && formInputSearch.value.trim() != '') {
                        findedTracks.push(el)
                    }
                })
            })
            let newfindedTracks = filterArray(findedTracks)
            return newfindedTracks
            // return findedTracks
        };
        // запускаем поиск
        function startSearch() {
            if (formInputSearch.value.trim().length < 3) {} else {
                filingPlaylist(searchTracks());
                audioPlaylists.forEach(e => {
                    e.classList.remove('audio-item-is-active')
                    formInputSearch.value = '';
                });

            }
        }
        //функция заполнения плей листа
        function filingPlaylist(namePlaylist) {
            var audioPlaylist = document.querySelectorAll('.audio-playlist-item');
            audioPlaylist.forEach(e => {
                e.remove();
            });
            currentPlaylist = []
            namePlaylist.map((e, i) => {
                currentPlaylist.push(e);
                let li = document.createElement('li');
                li.classList.add('audio-playlist-item')
                playlistList.append(li);
                e.sliceName = e.name;
                let uri = `https://obratnokbogu.ru/audio/${e.nameTranslit}`;
                if (e.sliceName.length > 80) {
                    // index = e.sliceName.indexOf(' ', 70);
                    // count = 80 - index;
                    // e.sliceName = e.sliceName.substr(0, );
                    // e.sliceName = e.sliceName + ' ';
                };
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
              <p title="${e.name}" class="audio-playlist-item-name-track">${e.sliceName}

                </p>
                <span class='audio-playlist-item-name-track-points'>...</span>
            </div>
            <div class="audio-playlist-item-btns">
               <div class="audio__duration">${e.duration}</div>
               <button title="скачать"  class="audio-playlist-item-download">
                  <a  download href="${e.src}"></a>
               </button>
               <div class="ya-share2" data-url="${uri}" data-title="${e.name}" data-image="https://obratnokbogu.ru/media/sh.jpg" data-more-button-type="short" data-popup-direction="auto" data-popup-position="outer" data-direction="horizontal" data-limit="0" data-copy="last" data-shape="round" data-size="s" data-services="vkontakte,facebook,odnoklassniki,telegram,whatsapp,viber"></div>
            </div>`;
                if (e.name.length > 85) {
                    addPointsNameTracks(i)
                };
            });
            clickAudioPlaylistPlay();
            // запуск скрипта поделиться
            initShare();
        };
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
            item = document.querySelectorAll('.audio-playlist-item-name-track-points');
            item[i].style.display = 'inline';
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
                currentPlaylistIsActive.push(e)
            });
            copyCurrentPlaylistIsActive = currentPlaylistIsActive.slice();
        };
        //функция загрузки трека в плеер
        function setTrack(index) {
            audioPlayer.src = currentPlaylistIsActive[index].src;
            nameTrack.textContent = currentPlaylistIsActive[index].name;
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
            audioPlaylist = document.querySelectorAll('.audio-playlist-item');
            audioPlaylistIsActive = document.querySelectorAll('.audio-item-is-active');
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
        // заполняем плейлисты
        function filingPlaylists() {
            playLists.forEach((e, i) => {
                let li = document.createElement('li');
                li.classList.add('audio-playlists-item')
                playlistsList.append(li);
                li.textContent = e.name
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
        // функция загрузки  согласно localStorage
        function loadPage() {
            // Заполняем плейлист
            let result = lookforTrack('id', currentIdTrack);
            filingPlaylist(result['playlist']);
            // подсвечиваем трек
            markerCurrentTrack(searchTrackInPlaylist(currentPlaylist, currentIdTrack));
        }

        function audioAct() { //Запускаем или ставим на паузу
            if (audioPlayer.src) {
                if (audioPlayer.paused) {
                    audioPlayer.play();
                    currentIdTrack = currentPlaylistIsActive[currentIndexTrack].id
                    localStorage.setItem('safeInfoTrack', JSON.stringify(currentIdTrack));
                    changeButton(searchTrackInPlaylist(currentPlaylist))
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

            var minutes = Math.floor(time / 60);

            var seconds = Math.floor(time - minutes * 60);

            var minutesVal = minutes;

            var secondsVal = seconds;

            if (minutes < 10) {

                minutesVal = "0" + minutes;

            }

            if (seconds < 10) {

                secondsVal = "0" + seconds;

            }

            return minutesVal + ":" + secondsVal;

        };


        function audioProgress() { //Отображаем время воспроизведения
            progress = audioPlayer.duration / 100;
            progress = audioPlayer.currentTime / progress;
            let x = progress
            if (x === progress) {
                progressBar.value = progress
            };



            currTime.innerHTML = audioTime(audioPlayer.currentTime);
            progressBar.style.background = `-webkit-linear-gradient(left, #fff 0%, #fff ${progressBar.value}%, #000 ${progressBar.value}%, #000 100%)`;
            if (progressBar.value == 100) {
                progressBar.style.borderRight = '1px solid #000'
            } else {
                progressBar.style.borderRight = '1px solid #fff'
            };

        };

        function audioChangeTime() { //Перематываем
            var mouseX = progressBar.value;
            audioPlayer.currentTime = audioPlayer.duration / 100 * mouseX
            progressBar.style.background = `-webkit-linear-gradient(left, #fff 0%, #fff ${progressBar.value}%, #000 ${progressBar.value}%, #000 100%)`;
            if (mouseX == 100) {
                progressBar.style.borderRight = '1px solid #000'
            } else {
                progressBar.style.borderRight = '1px solid #fff'
            };
        };

        function audioChangeVolume() { //Меняем громкость
            volumeScale.style.background = `-webkit-linear-gradient(left, #fff 0%, #fff ${volumeScale.value}%, rgb(100, 100, 100) ${volumeScale.value}%, rgb(100, 100, 100) 100%)`;

            var volume = volumeScale.value / 100;

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

        }
    });
</script>