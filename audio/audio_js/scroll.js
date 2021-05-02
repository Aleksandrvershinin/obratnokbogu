// функция скролла
export function scroll(param = false) {
    // получаем элементы
    // ативный трек
    let myElement = document.querySelector('.audio-playlist-item.audio-item-is-active');
    //  контейнер с треками
    let windowElem = document.querySelector('.simplebar-content-wrapper');
    //  получаем высоту от самого верха до активного элемента
    let topPos = myElement.offsetTop;
    // получаем высоту окна
    let heighthWindow = windowElem.clientHeight;
    // получаем высоту елемента
    let heightElem = myElement.clientHeight;
    // получаем  высоту прокрученную до начала окна
    let scrollToWindow = windowElem.scrollTop;
    // получаем высоту прокрутки до активного трека относительно высоты окна
    let scrollToElemByWindow = topPos - scrollToWindow;

    // определяем где должен быть активный элемент относительного окна, если true то значит нужно оставить элемент внизу, если false поставить элемент сверху
    if (param) {
        // проверяем находиться ли активный элемент внизу
        if (scrollToElemByWindow >= heighthWindow - heightElem) {
            // устанавливем элемент внизу в зоне видимости
            windowElem.scrollTop = topPos - heighthWindow + heightElem;
        }
    } else {
        // устанавливаем элемент вверху
        windowElem.scrollTop = topPos;
    }
}