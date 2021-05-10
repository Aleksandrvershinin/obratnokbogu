export function drowPlaylists(currentIdPlaylist) {
    // тег для добавления списка плейлистов
    let playlistsList = document.querySelector('.audio-playlists-list');
    // заполняем плейлисты
    function filingPlaylists() {
        playLists.forEach((e, i) => {
            let li = document.createElement('li');
            li.classList.add('audio-playlists-item');
            playlistsList.append(li);
            li.textContent = e.name
            if (i <= 17) {
                li.dataset.categoryId = "1";
            } else {
                li.classList.add('hide');
                li.dataset.categoryId = "2";
            }
        });
    };
    // заполняем плейлисты
    filingPlaylists();

    // получаем категории
    let category = document.querySelectorAll('[data-category-name]');

    // отслеживаем клик по категориям
    category.forEach(element => {
        element.addEventListener('click', () => {
            changeCategory(element);
        });
    });
    // меняем категорию
    function changeCategory(element) {

        let categoryId = element.dataset.categoryId;
        let playlistShow = document.querySelectorAll(`.audio-playlists-item[data-category-id='${categoryId}']`);
        let playlist = document.querySelectorAll('.audio-playlists-item');
        category.forEach(element => {
            element.classList.remove('first');
        });
        element.classList.add('first');
        playlist.forEach(element => {
            element.classList.add('hide');
        });
        playlistShow.forEach(element => {
            element.classList.remove('hide');
        });
    }
    // проверяем какую категорию показать
    if (currentIdPlaylist > 17) {
        changeCategory(category[1]);
    }
}

// функция отметки плейлиста
export function markerPlaylist(idTrack, lookforTrack) {
    // ищем трек который проигрывается по id
    let result = lookforTrack('id', idTrack);
    // получаем элементы плей листов
    let playlist = document.querySelectorAll('.audio-playlists-item');
    // получаем отмеченный элемент
    let playlistMarker = document.querySelector('.point');

    // проверяем существует отмеченный элемент
    if (playlistMarker !== null) {
        // проверяем подсвечен текущий элемент
        if (playlistMarker !== playlist[result['idPlaylist'] - 1]) {
            //  если отмеченный и текущий плейлисты не равны
            // убираем у всех плейлистов класс и добавляем плейлисту в котором найден трек класс
            workClass();
        }
    } else {
        // если нет отмеченного плейлиста
        // убираем у всех плейлистов класс и добавляем плейлисту в котором найден трек класс
        workClass();
    }
    // функция отбирания класса и добавления
    function workClass() {
        // убираем у плейлиста класс
        if (playlistMarker !== null) {
            playlistMarker.classList.remove('point');
        }
        // добавляем плейлисту в котором найден трек класс
        playlist[result['idPlaylist'] - 1].classList.add('point');
    }
}