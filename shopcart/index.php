<?php // подключаем массив с товарами
include $_SERVER['DOCUMENT_ROOT'] . '/magazin/include/goods.php';
?>
<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script defer src="/js/main.js"></script>
    <script defer type="module" src="/shopcart/sopping-cart.js"></script>
    <!-- <link rel="stylesheet" href="style/animate.css"> -->
    <link rel="stylesheet" href="../style/normalize.css">
    <link rel="stylesheet" href="../style/style.css">
    <title>Корзина</title>
</head>

<body>
    <script src="../js/header.js"></script>
    <div class="main-and-footer">
        <main class="main">
            <nav class="nav magazin-second-nav">
                <ul class="magazin-second-nav-list">
                    <li class="magazin-second-nav-item">
                        <a class="magazin-second-nav-link" href="/">Главная </a>/
                    </li>
                    <li class="magazin-second-nav-item">
                        <a class="magazin-second-nav-link" href="/magazin">&nbsp; Магазин </a>/
                    </li>
                    <li class="magazin-second-nav-item">
                        <a style="pointer-events: none;" class="magazin-second-nav-link">&nbsp; Корзина </a>/
                    </li>
                </ul>
            </nav>
            <div class="container shopping-cart__container">
                <h1 class="shopping-cart__title">Корзина</h1>
                <p class="shopping-cart__description">
                    Корзина пока пуста, перейдите в <a href="/magazin">магазин</a>, что бы добавить товаров в
                    корзину
                </p>
                <div class="shopping-cart__box">
                    <ul class="shopping-cart__list">

                    </ul>
                </div>
            </div>
        </main>
        <? include $_SERVER['DOCUMENT_ROOT'] . '/php/footer.php';?>
    </div>
    <template id="template__item__shopping-cart">
        <li class="shopping-cart__item">
            <hr class="shopping-cart__line">
            <div class="shopping-cart__item__row">
                <a class="shopping-cart__item__href" href="">
                    <img alt="обложка книги" class="shopping-cart__item__img">
                </a>
                <div class="shopping-cart__item__text">
                    <p class="shopping-cart__item__name"></p>
                    <p class="shopping-cart__item__description">описание</p>
                    <p class="shopping-cart__item__weight"></p>
                </div>
                <div class="shopping-cart__item__panel">
                    <div class="shopping-cart__item__control-panel">
                        <button class="shopping-cart__item__panel_down"></button>
                        <div class="shopping-cart__item__panel_quantity"></div>
                        <button class="shopping-cart__item__panel_up"></button>
                    </div>
                    <div class="shopping-cart__item__price">50 ₽/ шт</div>
                    <button class="shopping-cart__item__panel_delete">удалить</button>
                </div>
                <div class="shopping-cart__item__total-price"></div>
            </div>
        </li>
    </template>
    <template id="template__header__shopping-cart">
        <div class="shopping-cart__row__header-panel">
            <div class="shopping-cart__total-quantity"></div>
            <button class="shopping-cart__delete-all-goods__btn btn no-active">удалить все товары</button>
        </div>
    </template>
    <template id="template__total__shopping-cart">
        <div class="shopping-cart__total__row">
            <div class="shopping-cart__total__goods"></div>
            <div class="shopping-cart__total__sum"></div>
            <button class="shopping-cart__total__btn btn">Оформить заказ</button>
        </div>
    </template>
    <div class="shopping-cart__body__form body__form hide">
        <form class="shopping-cart__form">
            <div class="shopping-cart__form__close form__close1"></div>
            <div class="shopping-cart__form__close1 form__close2"></div>
            <div class="shopping-cart__form__close2 form__close"></div>
            <div class="shopping-cart__form__item">
                <label class="shopping-cart__form__item_label" for="name">Имя*</label>
                <input class="shopping-cart__form__item_input req" id="name" name="name" type="text">
            </div>
            <div class="shopping-cart__form__item">
                <label class="shopping-cart__form__item_label" for="middle-name">Отчество</label>
                <input class="shopping-cart__form__item_input" id="middle-name" name="middle-name" type="text">
            </div>
            <div class="shopping-cart__form__item">
                <label class="shopping-cart__form__item_label" for="city">Город*</label>
                <input class="shopping-cart__form__item_input req" id="city" name="city" type="text">
            </div>
            <div class="shopping-cart__form__item">
                <label class="shopping-cart__form__item_label" for="email">E-mail*</label>
                <input class="shopping-cart__form__item_input req _email" id="email" name="email" type="email">
            </div>
            <div class="shopping-cart__form__item">
                <label class="shopping-cart__form__item_label" for="phone">Телефон*</label>
                <input class="shopping-cart__form__item_input req" id="phone" name="phone" type="tel">
            </div>
            <button type="submit" class="btn shopping-cart__form_btn">Отправить заказ</button>
        </form>
    </div>

</body>

</html>