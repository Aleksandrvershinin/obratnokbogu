<?php

// подключаем файл с функцией поиска
include $_SERVER['DOCUMENT_ROOT'] . '/php/functions.php';

// подключаем массив с товарами
include $_SERVER['DOCUMENT_ROOT'] . '/magazin/include/goods.php';

// получаем текущий url
$url = $_SERVER['REQUEST_URI'];
$url = preg_replace('/\/$/', '', $url);
// получаем ключ товара через поиск по url
$key = searchArticle($url, $goods);

// получаем текущий масив с товаром
$product = $goods[$key];

if ($key !== false) {
?>
    <!DOCTYPE html>
    <html lang="ru">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script class="script-share" src="/js/share_social_media.js" async></script>
        <link rel="stylesheet" href="/style/share_social_media.css">

        <script src="/js/jquery.js"></script>

        <script defer src="/js/main.js"></script>
        <!-- <link rel="stylesheet" href="style/animate.css"> -->
        <link rel="stylesheet" href="/style/normalize.css">
        <link rel="stylesheet" href="/style/style.css">
        <title><?= $product["name"] ?></title>
    </head>

    <body class="magazin-js" id="si">
        <script src="/js/header.js"></script>
        <div class="main-and-footer">
            <main class="main">
                <section class="magazin-second-header">
                    <div class="magazin-second-header-container">
                        <nav class="nav magazin-second-nav">
                            <ul class="magazin-second-nav-list">
                                <li class="magazin-second-nav-item">
                                    <a class="magazin-second-nav-link" href="/">Главная </a>/
                                </li>
                                <li class="magazin-second-nav-item">
                                    <a class="magazin-second-nav-link" href="/magazin">&nbsp; Магазин </a>/
                                </li>
                                <li class="magazin-second-nav-item">
                                    <a style="pointer-events: none;" class="magazin-second-nav-link  _js-magazin-second-nav-link">&nbsp; <?= $product["name"] ?>&nbsp;</a>/
                                </li>
                            </ul>
                        </nav>
                    </div>
                </section>
                <section class="section section-book">
                    <div class="container container-book">
                        <div class="book-item-download goods-container-item-js">
                            <img class="book-img" src="<?= $product["path_img"] ?>" alt="image">
                            <!-- <a class="book-share" href="#">Поделиться </a> -->
                            <div class="ya-share2" data-url="<?= $_SERVER["SCRIPT_URI"] ?>" data-title="<?= $product["name"] ?>" data-popup-direction="top" data-more-button-type="long" data-direction="horizontal" data-limit="0" data-copy="last" data-shape="round" data-services="vkontakte,facebook,odnoklassniki,telegram,whatsapp,viber"></div>
                            <div class="book-download">
                                <span>Cкачать -</span>
                                <a href="<?= $product["href_pdf"] ?>">pdf,</a>
                                <a href="<?= $product["href_fb2"] ?>">fb2,</a>
                                <a href="<?= $product["href_epub"] ?>">epub,</a>
                                <a href="<?= $product["href_mobi"] ?>">mobi</a>
                            </div>
                        </div>
                        <div class="book-item-buy">
                            <h3>Перевод с оригинала <?= $product["translate"] ?> года</h3>
                            <h1><?= $product["name"] ?></h1>
                            <div class="book-buy">
                                <div class="book-availability">
                                    Доступно
                                </div>
                                <div class="book-icon"></div>
                                <div class="book-price"><?= $product["price"] ?> ₽</div>
                                <button data-product-key="<?= $key ?>" class="book-buy-btn _js-magazin-book-btn btn">
                                    Купить
                                </button>
                            </div>
                            <div class="book-descriotion">
                                <p>
                                    <?= $product["description"] ?>
                                </p>
                            </div>
                            <div class="book-characteristics">
                                <div class="book-weight">Вес - <?= $product["weight"] ?> грамм.</div>
                                <div class="book-format">Формат - <?= $product["format"] ?></div>
                                <div class="book-cover-type">Тип обложки - <?= $product["type_of_cover"] ?></div>
                            </div>
                        </div>
                    </div>

                </section>
            </main>
            <? include $_SERVER['DOCUMENT_ROOT'] . '/php/footer.php';?>
        </div>


    </body>


    </html>
<?php
} else {
?>
    <link rel="stylesheet" href="/style/normalize.css">
    <link rel="stylesheet" href="/style/style.css">
    <script src="/js/header.js"></script>
<?php
    include $_SERVER['DOCUMENT_ROOT'] . "/php/not_found.php";
}