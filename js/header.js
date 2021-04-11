(function () {
    document.write(
        ` <header class="header">
        <div class="container header-container">
            <div class="header-logo">
                <img class="header-logo-img" src="/media/img/logo.jpg" alt="">
                <a href="/" class="header-logo-link"></a>
            </div>
            <nav class="header-nav">
                <ul class="header-nav-lists">
                    <li class="header-nav-item">
                        <a href="/audio">аудио</a>
                    </li>
                    <li class="header-nav-item">
                        <a href="/video">видео</a>
                    </li>
                    <li class="header-nav-item">
                        <a href="/photo">фото</a>
                    </li>
                    <li class="header-nav-item">
                        <a href="/magazin">магазин</a>
                    </li>
                    <li class="header-nav-item">
                        <a href="/articles">статьи</a>
                    </li>
                    <li class="header-nav-item">
                        <a href="/files">файлы</a>
                    </li>
                    <li class="header-nav-item">
                        <a href="#">база поиска</a>
                    </li>
                </ul>
            </nav>
            <div class="header-shopping-cart">
                <div class="header-shopping-cart-count"></div>
                <div class="header-shopping-cart-line"></div>
                <a href="/shopcart"></a>
            </div>
            <div class="header-radio">
                <a target="blank" href="/radio">радио - Прабхупада</a>
            </div>
        </div>
    </header>`
    );

    window.goodsInShoppingCart;
    window.getLocalStorage = function () {
        goodsInShoppingCart = localStorage.getItem('goodsInShoppingCart');
        if (goodsInShoppingCart === null) {
            goodsInShoppingCart = [];
        } else {
            goodsInShoppingCart = JSON.parse(goodsInShoppingCart);
        }
    }

    // функция счетчика колличества товаров в корзине
    window.countShoppingCart = function () {
        getLocalStorage()
        let quantitygoodsInShoppingCartElem = document.querySelector('.header-shopping-cart-count');
        if (goodsInShoppingCart.length === 0) {
            quantitygoodsInShoppingCartElem.style.display = 'none';
        } else {
            quantitygoodsInShoppingCartElem.style.display = '';
            quantitygoodsInShoppingCartElem.textContent = goodsInShoppingCart.length;
        }
    }
    getLocalStorage()
    // вешаем обработчик на LocalStorage
    window.addEventListener('storage', () => {
        getLocalStorage();
        countShoppingCart();
    });
    countShoppingCart();
})();

