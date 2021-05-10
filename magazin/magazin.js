(function () {

    // функция получения scroll
    function trackScroll() {
        // получаем иконку корзины
        let magazinShoppingCart = document.querySelector('.magazin-shopping-cart');
        // получаем scrollстраницы
        let scrolled = window.pageYOffset;

        // проверяем существует ли элемент
        if (magazinShoppingCart !== null) {
            if (scrolled > 60) {
                magazinShoppingCart.style.position = 'fixed'
                magazinShoppingCart.style.top = '30px'
            }
            if (scrolled < 60) {
                magazinShoppingCart.removeAttribute('style');
            }
        }
    }
    // отслеживаем scroll
    document.onscroll = () => {
        trackScroll();
    }
    // запускаем функцию scroll при запуске
    trackScroll();

    // получаем кнопки купить
    const buttongoodsInShoppingCart = document.querySelectorAll('._js-magazin-book-btn');
    // функция получения данных из localStorage
    function getLocalStorage() {
        let goodsInShoppingCart = localStorage.getItem('goodsInShoppingCart');
        if (goodsInShoppingCart === null) {
            goodsInShoppingCart = [];
        } else {
            goodsInShoppingCart = JSON.parse(goodsInShoppingCart);
            goodsInShoppingCart.forEach((element, index) => {
                if (element.key > 2) {
                    goodsInShoppingCart.splice(index, 1);
                    // localStorage.setItem('goodsInShoppingCart', JSON.stringify(goodsInShoppingCart));
                    // getLocalStorage();
                    // return
                    console.log(goodsInShoppingCart);
                }
            });
        }
        return goodsInShoppingCart;
    }

    // функция счетчика колличества товаров в корзине
    function countShoppingCart(goodsInShoppingCart) {
        let quantitygoodsInShoppingCartElem = document.querySelector('.magazin-shopping-cart-count');
        quantitygoodsInShoppingCartElem.textContent = goodsInShoppingCart.length;
    }


    checkBtn();
    // вешаем обработчик на LocalStorage
    window.addEventListener('storage', () => {
        getLocalStorage();
        checkBtn();
    });



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
        let goodsInShoppingCart = getLocalStorage();
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
        // изменяем колличество товаров на иконке в корзине
        countShoppingCart(goodsInShoppingCart);
    }

    // пребираем кнопки и вешаем обработчик 'клик' на каждую
    buttongoodsInShoppingCart.forEach((element, index) => {
        element.addEventListener('click', (e) => {
            goodsInShoppingCart = getLocalStorage();
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

    // анимация полета товара в корзину
    // получаем элементы

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
                        top: $(".magazin-shopping-cart a").offset()['top'] + 20,
                        left: $(".magazin-shopping-cart a").offset()['left'] + 30,
                        height: 20,
                        width: 20
                    }, 800, function () {
                        // включаем кнопку
                        $(element).removeClass('disabled-btn');
                        element.removeAttribute('disabled');

                        // удаляем клонированную картинку
                        $(this).remove();
                        checkBtn();
                    });
            }
        });
    });

})();
