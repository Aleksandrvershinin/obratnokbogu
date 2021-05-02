(function () {
    //  получаем элементы
    //  элемент с фотографией
    let photoItemElement = document.querySelectorAll('.photo__item');

    // список с фотографиями
    let photoListElement = document.querySelector('.photo__list');

    // body большого режима просмотра фотографий
    let bigScreenBody = document.querySelector('.photo__body__big-screen');

    // box куда будем загружать полноэкранную фотографию
    let bigScreenImg = document.querySelector('.photo__big-screen__img');

    // кнопка возврата к предыдущей фотографии
    let prevBtn = document.querySelector('.photo__prev__btn');

    // кнопка перехода к следующей фотографии
    let nextBtn = document.querySelector('.photo__next__btn');

    // кнопка открытия полно-экранного режима
    let fullScreenBtn = document.querySelector('.btn__open__full-screen');

    // счетчик фотографий
    let countPhoto = document.querySelector('.count__photo');

    // переменная отслеживания текущей фотографии
    let currentIndexPhoto = -1;

    // функция определения ширины списка с фотографиями
    function getWidthPhotoListElement() {
        return photoListElement.scrollWidth;
    }

    // функция рассчета ширины фотографии
    function calcWidthPhoto() {
        // высчитываем ширину списка с фотографиями
        let width = getWidthPhotoListElement();

        // высчитываем сколько фотографий поставить в ряд
        let countPhoto = Math.floor(width / 220);

        // устанавливаем ширину каждой фотографии
        photoItemElement.forEach(element => {
            element.style.width = `${width / 5 - 5}px`;
        });

    }
    calcWidthPhoto();

    // отслеживаем изменение ширины блока с фотографиями
    window.addEventListener('resize', () => {
        calcWidthPhoto();
    });

    //  отслеживаем клик по фотографиям
    photoItemElement.forEach((element, index) => {

        element.addEventListener('click', () => {
            // убираем scroll
            document.body.style.overflow = 'hidden';
            // показываем body полноэкранного режима просмотра фотографий
            bigScreenBody.classList.remove('hide');

            // показываем фотографию по которой кликнули
            bigScreenImg.src = element.children[0].dataset.src;
            // записываем индекс текущей фотографии
            currentIndexPhoto = index;

            // счетчик фотографий
            countPhoto.textContent = `${currentIndexPhoto + 1}/${photoItemElement.length}`;
        });
    });


    // отслеживаем клик по body полноэкранного режима просмотра фотографий
    bigScreenBody.addEventListener('click', (e) => {
        // проверяем где произошел клик
        if (e.target === document.querySelector('.form__close__photo') || e.target === document.querySelector('.photo__body__big-screen')) {
            // если клик случился на нужном элементе прячем body полноэкранного режима просмотра фотографий
            bigScreenBody.classList.add('hide');

            // удаляем ссылку на фотографию
            bigScreenImg.removeAttribute('src');

            // включаем scroll
            document.body.style.overflow = "";
        }
    });


    // отслеживаем клик по кнопкам листания фотографий назад
    prevBtn.addEventListener('click', () => {
        flipPhoto();
    });


    // отслеживаем клик по кнопкам листания фотографий вперед
    nextBtn.addEventListener('click', () => {
        flipPhoto("next");
    });

    // функция листания фотографий
    function flipPhoto(direction) {
        if (direction === "next") {
            // проверяем индекс текущего элемента
            if (currentIndexPhoto === photoItemElement.length - 1) {
                // если индекс равен количеству всех фотографий, то присваиваем значение индекс 0
                currentIndexPhoto = 0;
            } else {
                // если индекс не равен равен количеству всех фотографий, увеличиваем индекс на 1
                currentIndexPhoto++;
            }
        } else {
            // проверяем индекс текущего элемента
            if (currentIndexPhoto === 0) {
                // если индекс равен 0, то присваиваем значение индекс последний элемент в списке
                currentIndexPhoto = photoItemElement.length - 1;
            } else {
                // если индекс не равен 0, уменьшаем индекс на 1
                currentIndexPhoto--;
            }
        }
        // показываем фотографию
        bigScreenImg.src = photoItemElement[currentIndexPhoto].children[0].dataset.src;
        // счетчик фотографий
        countPhoto.textContent = `${currentIndexPhoto + 1}/${photoItemElement.length}`;
    }

    // отслеживаем клик и открываем полно-экранный режим
    fullScreenBtn.addEventListener('click', openFullScreen);


    // отслеживаем событие изменение полно-экранного режима
    document.addEventListener('fullscreenchange', checkFullScreen);


    // функция проверки полно-экранного режима
    function checkFullScreen() {
        // если элемент не в полноэкранном режиме, выходим из просмотра fullScreen
        if (!document.fullscreenElement) {
            bigScreenBody.classList.remove('photo__body__full-screen');
        }
    }

    // открытие полно-экранного режима
    function openFullScreen() {
        bigScreenBody.classList.toggle('photo__body__full-screen');
        // если элемент уже в полноэкранном режиме, выйти из него
        // В противном случае войти в полный экран
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    }


    // lazy load

    let options = {
        root: null,
        rootNargin: "0px",
        threshold: 0.1,
    }

    function handleImg(myImg) {
        myImg.forEach(elem => {
            if (elem.intersectionRatio > 0) {
                loadImg(elem.target);
            }
        });
    }
    function loadImg(elem) {
        elem.children[0].src = elem.children[0].dataset.src
    }
    let observer = new IntersectionObserver(handleImg, options);

    photoItemElement.forEach(elem => {
        observer.observe(elem);
    });
})();
