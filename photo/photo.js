(function () {
    //  получаем элементы
    //  элемент с фотографией
    let photoItemElement = document.querySelectorAll('.photo__item');

    // список с фотографиями
    let photoListElement = document.querySelector('.photo__list');

    // body полноэкранного режима просмотра фотографий
    let fullScreenBody = document.querySelector('.photo__body__full-screen');

    // box куда будем загружать полноэкранную фотографию
    let fullScreenImg = document.querySelector('.photo__full-screen__img');

    // кнопка возврата к предыдущей фотографии
    let prevBtn = document.querySelector('.photo__prev__btn');

    // кнопка перехода к следующей фотографии
    let nextBtn = document.querySelector('.photo__next__btn');

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
        let countPhoto = Math.floor(width / 200);

        // устанавливаем ширину каждой фотографии
        photoItemElement.forEach(element => {
            element.style.width = `${width / countPhoto - 5}px`;
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
            // показываем body полноэкранного режима просмотра фотографий
            fullScreenBody.classList.remove('hide');

            // показываем фотографию по которой кликнули
            fullScreenImg.src = element.children[0].src;
            // записываем индекс текущей фотографии
            currentIndexPhoto = index;

            // счетчик фотографий
            countPhoto.textContent = `${currentIndexPhoto + 1}/${photoItemElement.length}`;
        });
    });


    // отслеживаем клик по body полноэкранного режима просмотра фотографий
    fullScreenBody.addEventListener('click', (e) => {
        // проверяем где произошел клик
        if (e.target === document.querySelector('.form__close')) {
            // если клик случился на нужном элементе прячем body полноэкранного режима просмотра фотографий
            fullScreenBody.classList.add('hide');

            // удаляем ссылку на фотографию
            fullScreenImg.removeAttribute('src');
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
        fullScreenImg.src = photoItemElement[currentIndexPhoto].children[0].src;
        // счетчик фотографий
        countPhoto.textContent = `${currentIndexPhoto + 1}/${photoItemElement.length}`;
    }
})();
