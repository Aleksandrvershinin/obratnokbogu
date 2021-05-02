(function () {

    // получаем элементы

    // элементы  в которые будем загружать списки
    let playlistsElement = document.querySelectorAll(".video-playlist");

    // описание которое будем прятать
    let videoDescriptionElement = document.querySelector(".video-description");

    // список плейлистов
    let playlistsList = document.querySelectorAll(".v-playlist");

    // создаем переменную отслеживания текущего плейлиста
    let currentPlaylistIndex;

    // функция скрытия элементов плейлистов
    function hideplaylistsElement() {
        playlistsElement.forEach(e => e.style.display = "none");
    }
    // отбираем класс акитвности у плейлистов
    function removeClassPlalists() {
        playlistsList.forEach(e => e.classList.remove('is-active'));
    }

    // добавляем активному плейлисту класс
    function addClassPlaylist(index) {
        // отбираем класс акитвности у плейлистов
        removeClassPlalists();

        if (index >= 0) {
            playlistsList[index].classList.add('is-active');
        }
    }

    // скрываем элементы плейлистов
    hideplaylistsElement();

    // функция заполнения плейлистов
    function createPlaylist(playlist, index) {
        // скрываем элементы плейлистов
        hideplaylistsElement();

        // показываем нужный элемент с плейлистом
        playlistsElement[index].style.display = "";

        // функция создания ul элементов
        function CreateUlElements(count, index) {
            if (count > 0) {
                var ul1 = document.createElement("ul");
                ul1.classList.add("video-playlist-list1", "video-playlist-list");
                playlistsElement[index].append(ul1);
            }
            if (count > 1) {
                var ul2 = document.createElement("ul");
                ul2.classList.add("video-playlist-list2", "video-playlist-list");
                playlistsElement[index].append(ul2);
            }
            if (count > 2) {
                var ul3 = document.createElement("ul");
                ul3.classList.add("video-playlist-list3", "video-playlist-list");
                playlistsElement[index].append(ul3);
            }
            if (count > 3) {
                var ul4 = document.createElement("ul");
                ul4.classList.add("video-playlist-list4", "video-playlist-list");
                playlistsElement[index].append(ul4);
            }
            return [ul1, ul2, ul3, ul4];
        }

        // заполняем первый плейлист
        if (index === 0) {
            // создаем ul листы
            let ul = CreateUlElements(3, 0);
            // прячем описание
            videoDescriptionElement.style.display = "none";
            // перебираем массив и заполняем список
            playlist.forEach((element, index) => {
                let li = document.createElement("li");
                li.classList.add("video-playlist-item");
                let a = document.createElement("a");
                a.href = element.href;
                a.textContent = element.name;
                li.append(a);
                if (index < 12) {
                    ul[0].append(li);
                } else if (index < 23 && index >= 12) {
                    ul[1].append(li);
                } else {
                    ul[2].append(li);
                }
            });
        }

        // заполняем второй плейлист
        if (index === 1) {
            let ul = CreateUlElements(4, 1);
            // прячем описание
            videoDescriptionElement.style.display = "none";
            // перебираем массив и заполняем список
            playlist.forEach((element, index) => {
                let li = document.createElement("li");
                li.classList.add("video-playlist-item");
                let a = document.createElement("a");
                a.href = element.href;
                a.textContent = element.name;
                li.append(a);
                if (index < 3) {
                    ul[0].append(li);
                } else if (index < 6 && index >= 3) {
                    ul[1].append(li);
                } else if (index < 9 && index >= 6) {
                    ul[2].append(li);
                } else {
                    ul[3].append(li);
                }
            });
        }
        // заполняем третий плейлист
        if (index === 2) {
            let ul = CreateUlElements(1, 2);
            // прячем описание
            videoDescriptionElement.style.display = "none";
            // перебираем массив и заполняем список
            playlist.forEach((element, index) => {
                let li = document.createElement("li");
                li.classList.add("video-playlist-item");
                let a = document.createElement("a");
                a.href = element.href;
                a.textContent = element.name;
                li.append(a);
                ul[0].append(li);
            });
        }

        // заполняем четвертый плейлист
        if (index === 3) {
            // создаем ul листы
            let ul = CreateUlElements(4, 3);
            // прячем описание
            videoDescriptionElement.style.display = "none";
            // перебираем массив и заполняем список
            playlist.forEach((element, index) => {
                let li = document.createElement("li");
                li.classList.add("video-playlist-item");
                let a = document.createElement("a");
                a.href = element.href;
                a.textContent = element.name;
                li.append(a);
                if (index < 12) {
                    ul[0].append(li);
                } else if (index < 23 && index >= 12) {
                    ul[1].append(li);
                } else if (index < 34 && index >= 23) {
                    ul[2].append(li);
                } else {
                    ul[3].append(li);
                }
            });
        }
        // заполняем пятый плейлист
        if (index === 4) {
            // создаем ul листы
            let ul = CreateUlElements(4, 4);
            // прячем описание
            videoDescriptionElement.style.display = "none";
            // перебираем массив и заполняем список
            playlist.forEach((element, index) => {
                let li = document.createElement("li");
                li.classList.add("video-playlist-item");
                let a = document.createElement("a");
                a.href = element.href;
                a.textContent = element.name;
                li.append(a);
                if (index < 2) {
                    ul[0].append(li);
                } else if (index < 4 && index >= 2) {
                    ul[1].append(li);
                } else if (index < 6 && index >= 4) {
                    ul[2].append(li);
                } else {
                    ul[3].append(li);
                }
            });
        }

        // подключаем отслеживание кликов по дорожкам
        clickLink('video');
    }
    // функция очистки плейлиста
    function cleanPlaylist() {
        let playlistListElement = document.querySelectorAll(".video-playlist-list");
        playlistListElement.forEach(element => {
            element.remove();
        });
    }
    // вешаем клик на плейлисты и запускаем функцию создания плейлиста
    playlistsList.forEach((element, index) => {
        element.addEventListener("click", () => {
            if (currentPlaylistIndex === index) {
                // очищаем плейлист
                cleanPlaylist();

                // скрываем элементы плейлистов
                hideplaylistsElement();

                // показываем описание
                videoDescriptionElement.style.display = "";

                // сбрасываем индекс текущего плейлиста
                currentPlaylistIndex = -1;

                // добавляем активному плейлисту класс
                addClassPlaylist(currentPlaylistIndex);
            } else {
                // очищаем плейлист
                cleanPlaylist();

                // заполняем плейлист
                createPlaylist(playlists[index].list, index);

                // записываем в пременную индекс текущего плейлиста
                currentPlaylistIndex = index;
                // добавляем активному плейлисту класс
                addClassPlaylist(currentPlaylistIndex);
            }
        });
    });

    // вешаем клик на документ что бы скрыть плейлисты
    document.querySelector(".v-playlists").addEventListener('click', (e) => {
        let playlistsElement = document.querySelectorAll(".v-playlist");

        if (e.target !== playlistsElement[0] && e.target !== playlistsElement[1] && e.target !== playlistsElement[2] && e.target !== playlistsElement[3] && e.target !== playlistsElement[4] && e.target !== document.querySelector(".video-playlist-list")) {
            // очищаем плейлист
            cleanPlaylist();

            // показываем описание
            videoDescriptionElement.style.display = "";

            // сбрасываем индекс текущего плейлиста
            currentPlaylistIndex = -1;

            // скрываем элементы плейлистов
            hideplaylistsElement();

            // добавляем активному плейлисту класс
            addClassPlaylist(currentPlaylistIndex);
        }
    });



    // открываем окно с просмотром видео
    const video = document.getElementById('video');
    if (video != null) {


        // очишаем плеер и закрываем окно
        const videoModalBody = document.querySelector(`.video-modal-body`);
        videoModalBody.addEventListener('click', (e) => {
            if (e.target.classList !== "video-modal-el") {
                videoModalBody.classList.add('hide')
                const modalIframe = document.querySelector(`.video-modal-el iframe`);
                modalIframe.src = '';
            }
        });
    };

    // отслеживаем клик
    function clickLink(page) {
        const link = document.querySelectorAll(`.${page}-playlist-item a`);
        link.forEach((e, i) => {
            e.addEventListener('click', (e) => {
                e.preventDefault()
                const linkHref = getLink(page, i);
                addLink(linkHref)
                openVideo()
            })
        })
    }
    // извлекаем ссылку на видео
    function getLink(page, index) {
        const link = document.querySelectorAll(`.${page}-playlist-item a`);
        const linkHref = link[index].href
        return linkHref;
    };

    // добовляем ссылку в плеер

    function addLink(link) {
        const modalIframe = document.querySelector(`.video-modal-el iframe`);
        modalIframe.src = link;
    };
    // Открываем модальное окно с видео youtube
    function openVideo() {
        const videoModalBody = document.querySelector(`.video-modal-body`);
        videoModalBody.classList.remove('hide');
    };
})();
