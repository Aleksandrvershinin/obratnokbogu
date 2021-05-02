<?php include $_SERVER['DOCUMENT_ROOT'] . '/photo/get_photo.php'; ?>
<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- <meta property="og:title" content="Обратно к Богу">
    <meta property="og:site_name" content="Обратно к богу">
    <meta property="og:url" content="https://obratnokbogu.ru/">
    <meta property="og:description" content="">
    <meta property="og:image" content="https://obratnokbogu.ru/media/img/link_home.jpg"> -->
    <script defer src="/photo/photo.js"></script>
    <script src="/js/main.js"></script>

    <!-- <link rel="stylesheet" href="style/animate.css"> -->
    <link rel="stylesheet" href="/style/normalize.css">
    <link rel="stylesheet" href="/style/style.css">
    <title>Фотографии</title>
</head>

<body>
    <? include $_SERVER['DOCUMENT_ROOT'] . '/php/header.php';?>
    <button class="btn-go-to-top"></button>
    <button class="btn-go-to-bottom"></button>
    <div class="main-and-footer">
        <main class="main">
            <section class="photo__section">
                <div class="container photo__container">
                    <h1 class="photo__title">Фотографии Шрилы Прабхупады</h1>
                    <ul class="photo__list">
                        <?
                        foreach ($files as $file) { ?>

                        <li class="photo__item user-select-none">
                            <img class="photo__item__img" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src=" /media/photo/<?= $file ?>" alt="Фотография Шрилы Прабхупады">
                        </li>

                        <? }?>
                    </ul>
                    <a target="_blanck" class="photo__archive__link" href="https://drive.google.com/drive/folders/1kyLO-ZMNOIHOGmL-SuNUEUZmLu1WUhqH?usp=sharing">
                        Смотреть архив полностью
                    </a>
                </div>
                <div class="photo__body__big-screen hide">
                    <div class="form__close form__close__photo"></div>
                    <div class="photo__big-screen__item">
                        <button class="photo__prev__btn"></button>
                        <div class="photo__big-screen__box__img user-select-none">
                            <img class="photo__big-screen__img" alt="Фотография Шрилы Прабхупады">
                        </div>
                        <button class="photo__next__btn"></button>
                        <button class="btn__open__full-screen"></button>
                        <div class="count__photo"></div>
                    </div>
                </div>
            </section>
        </main>
        <? include $_SERVER['DOCUMENT_ROOT'] . '/php/footer.php';?>
    </div>

    <!-- скрипт добвления кнопки наверх -->
    <script>
        addBtnGoToTop();
    </script>
</body>

</html>