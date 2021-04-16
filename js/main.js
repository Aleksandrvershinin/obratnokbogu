function forShop() {
    // Скрипт для магазина

    // получаем кнопки купить
    const buttongoodsInShoppingCart = document.querySelectorAll('._js-magazin-book-btn');

    // меняем кнопки
    function changeBtn(index) {
        buttongoodsInShoppingCart[index].textContent = 'в корзине';
        buttongoodsInShoppingCart[index].classList.add('in-shopping-cart');
        buttongoodsInShoppingCart[index].classList.remove('_js-magazin-book-btn');
        let a = document.createElement('a');
        a.href = "/shopcart"
        buttongoodsInShoppingCart[index].append(a)
    }
    // перебираем книги для замены кнопок
    function checkBtn() {
        getLocalStorage();
        buttongoodsInShoppingCart.forEach(element => {
            element.classList.remove('in-shopping-cart')
            element.classList.add('_js-magazin-book-btn');
            element.textContent = 'купить';
        });
        goodsInShoppingCart.forEach((element) => {
            buttongoodsInShoppingCart.forEach((e, i) => {
                if (element.key == e.dataset.productKey) {
                    changeBtn(i);
                }
            });
        });
    }

    checkBtn();

    // пребираем кнопки и вешаем обработчик 'клик' на каждую
    buttongoodsInShoppingCart.forEach((element, index) => {
        element.addEventListener('click', (e) => {
            getLocalStorage();
            // проверяем есть ли товар в массиве
            let check = goodsInShoppingCart.find(item => item.key == element.dataset.productKey);
            if (!check) {
                let product = {
                    "key": element.dataset.productKey,
                    "quantity": 1,
                }
                goodsInShoppingCart.push(product);
                localStorage.setItem('goodsInShoppingCart', JSON.stringify(goodsInShoppingCart));
            }
        });
    });


    // вешаем обработчик на LocalStorage
    window.addEventListener('storage', () => {
        getLocalStorage();
        checkBtn();
    });


    // анимация полета товара в корзину
    // получаем элементы
    // кнопки
    let magazinBtn = document.querySelectorAll('.magazin-book-btn');

    // картинки
    let booksImg = document.querySelectorAll('.goods-container-item-js img');

    // контейнер
    let books = document.querySelectorAll('.goods-container-item-js');

    // перебираем все кнопки
    buttongoodsInShoppingCart.forEach((element, index) => {
        // обрабатываем клик
        element.addEventListener('click', () => {
            if (element.textContent === 'купить') {
                // отключаем кнопку купить
                $(element).addClass('disabled-btn');
                element.disabled = true;

                // клонируем картинку
                $(booksImg[index]).clone()
                    // добавляем стилей
                    .css({ 'position': 'absolute', 'z-index': '100', 'opacity': '0.7' })
                    // добавляем в контейнер клонированую картинку и запускаем анимацию
                    .appendTo(books[index]).animate({
                        // вытаскиваем координаты корзины и добавляем их в top и left клонированной картинки
                        top: $(".header-shopping-cart a").offset()['top'] + 20,
                        left: $(".header-shopping-cart a").offset()['left'] + 30,
                        height: 20,
                        width: 20
                    }, 800, function () {
                        // включаем кнопку
                        $(element).removeClass('disabled-btn');
                        element.removeAttribute('disabled');

                        // удаляем клонированную картинку
                        $(this).remove();
                        checkBtn();
                        countShoppingCart();
                    });
            }
        });
    });
}
// фукция добавления кнопки вверх и вниз
function addBtnGoToTop() {
    // добавление кнопки вниз
    let btnBottom = document.createElement('button');
    btnBottom.classList.add('btn-go-to-bottom');
    document.body.prepend(btnBottom);

    // добавление кнопки вверх
    let btnTop = document.createElement('button');
    btnTop.classList.add('btn-go-to-top');
    btnTop.textContent = 'наверх';
    document.body.prepend(btnTop);

    window.addEventListener('scroll', trackScroll,
        { passive: true });

    // обработка события 'click' для скролла
    btnTop.addEventListener('click', () => {
        getScrolled();
        goTo(0);
    });


    function trackScroll() {
        let scrolled = window.pageYOffset;
        if (scrolled > 50) {
            btnTop.classList.add('show');
            btnBottom.classList.remove('show');
        }
        if (scrolled < 50) {
            btnTop.classList.remove('show');
        }
    }
    // функция скролла наверх
    function goTo(scroll) {
        window.scrollTo({ top: scroll, });
    }
    // функция получения текущего скрола
    function getScrolled() {
        let scrolled = window.pageYOffset;
        // работаем с кнопкой вниз
        addBtnGoToBotton(scrolled);
    }

    // работа с кнопкой вниз
    function addBtnGoToBotton(scrolled) {
        btnBottom.classList.add('show');
        // отслеживаем клик по кнопке
        btnBottom.addEventListener('click', () => {
            goTo(scrolled);
        });
    }
}

