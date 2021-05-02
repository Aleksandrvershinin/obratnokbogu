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
?>

<!DOCTYPE html>
<html lang="ru">


<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script class="script-share" src="/js/share_social_media.js" async></script>
    <link rel="stylesheet" href="/style/share_social_media.css">

    <script src="/js/jquery.js"></script>
    <script defer src="/magazin/magazin.js"></script>
    <script src="/js/main.js"></script>
    <!-- <link rel="stylesheet" href="style/animate.css"> -->
    <link rel="stylesheet" href="/style/normalize.css">
    <link rel="stylesheet" href="/style/style.css">
    <title><?= $product["name"] ?></title>
</head>

<body class="magazin-js" id="si">
    <? include $_SERVER['DOCUMENT_ROOT'] . '/php/header.php'; ?>
    <button class="btn-go-to-top"></button>
    <button class="btn-go-to-bottom"></button>
    <div class="magazin-shopping-cart">
        <div class="magazin-shopping-cart-count"></div>
        <a href="/shopcart"></a>
    </div>
    <?
    if ($key !== false) {
    ?>
        <div class="main-and-footer">
            <main class="main">
                <section class="magazin-second-header">
                    <div class="magazin-second-header-container">
                        <nav class="nav magazin-second-nav">
                            <ul class="magazin-second-nav-list">
                                <div class="magazin-second-nav-link back__btn">
                                    <button><a href="/magazin">назад </a></button>
                                </div>
                                <!-- <li class="magazin-second-nav-item">
                                <a class="magazin-second-nav-link" href="/">Главная </a>/
                            </li> -->
                                <!-- <li class="magazin-second-nav-item">
                                <a class="magazin-second-nav-link" href="/magazin">назад </a>
                            </li> -->
                                <!-- <li class="magazin-second-nav-item">
                                <a style="pointer-events: none;" class="magazin-second-nav-link  _js-magazin-second-nav-link">&nbsp; <?= $product["name"] ?>&nbsp;</a>/
                            </li> -->
                            </ul>
                        </nav>
                    </div>
                </section>
                <section class="section section-book">
                    <div class="container container-book">
                        <div class="user-select-none book-item-download goods-container-item-js">
                            <img class="book-img" src="<?= $product["path_img"] ?>" alt="image">
                            <div class="item-share">
                                <div class="ya-share2 book-share-social-media" data-image="<?= $product["path_img_for_share"] ?>" data-url="<?= $_SERVER["SCRIPT_URI"] ?>" data-title="<?= $product["name"] ?>" data-popup-direction="top" data-more-button-type="short" data-direction="vertical" data-limit="10" data-copy="extraItem" data-shape="round" data-services="vkontakte,facebook,odnoklassniki,telegram,whatsapp,viber"></div>
                                <btn class="book-share-btn">Поделиться </btn>
                            </div>

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
            <? include $_SERVER['DOCUMENT_ROOT'] . '/php/footer.php'; ?>
        </div>
        <script>
            // показываем элементы соц.сетей поделиться
            let bookShareBtn = document.querySelector('.book-share-btn');
            let bookShareSocialMedia = document.querySelector('.book-share-social-media');

            bookShareBtn.addEventListener('click', () => {
                bookShareSocialMedia.classList.toggle('is-active');
            });
            bookShareSocialMedia.addEventListener('click', (e) => {
                closeWindowShare();
            })

            function closeWindowShare() {
                document.querySelector('.book-share-social-media').classList.remove('is-active');
            }
            window.addEventListener('click', (e) => {
                if (e.target !== bookShareBtn) {
                    closeWindowShare()
                }
            });
        </script>
    <?

    } else {

        include $_SERVER['DOCUMENT_ROOT'] . "/php/not_found.php";
    }
    ?>

</body>


</html>