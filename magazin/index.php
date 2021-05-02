<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="/js/jquery.js"></script>
    <script defer src="/magazin/magazin.js"></script>
    <script src="/js/main.js"></script>

    <!-- <link rel="stylesheet" href="style/animate.css"> -->
    <link rel="stylesheet" href="/style/normalize.css">
    <link rel="stylesheet" href="/style/style.css">
    <title>Магазин</title>
</head>

<body class="magazin-js" id="magazin">
    <? include $_SERVER['DOCUMENT_ROOT'] . '/php/header.php';?>
    <button class="btn-go-to-top"></button>
    <button class="btn-go-to-bottom"></button>
    <div class="magazin-shopping-cart">
        <div class="magazin-shopping-cart-count"></div>
        <a href="/shopcart"></a>
    </div>
    <div class="main-and-footer">
        <main class="main">
            <section class="magazin-second-header">
                <div class="container magazin-second-header-container">
                    <!-- <nav class="nav magazin-second-nav">
                        <ul class="magazin-second-nav-list">
                            <li class="magazin-second-nav-item">
                                <a class="magazin-second-nav-link" href="/">Главная </a>/
                            </li>
                            <li class="magazin-second-nav-item">
                                <a style="pointer-events: none;" class="magazin-second-nav-link">&nbsp; Магазин </a>/
                            </li>
                        </ul>
                    </nav> -->
                    <div class="container magazin-container-logo">
                        <div class="magazin-logo">
                            <div class="magazin-logo-icon"></div>
                            <p>Bhaktivedanta Book Trust</p>
                        </div>
                    </div>

                </div>
            </section>
            <section class="magazin-description">
                <div class="container magazin-description-container">
                    <h1 class="magazin-title">
                        Книги Шрилы Прабхупады
                    </h1>
                    <div class="line"></div>
                    <p class="magazin-description-description">
                        Его Божественная Милость А.Ч. Бхактиведанта Свами Прабхупада, основатель и ачарья ISKCON
                        (ИСККОН), опубликовал более 70 книг, содержащих его лекции, комментарии и переводы ведичеческих
                        писаний с санскрита на английский.
                    </p>
                </div>
            </section>
            <section class="section section-magazin-books">
                <div class="container magazin-container-books">
                    <ul class="books-container-list">
                        <?include $_SERVER['DOCUMENT_ROOT'] . '/php/create_list_goods.php';?>
                    </ul>
                </div>
            </section>
        </main>
        <? include $_SERVER['DOCUMENT_ROOT'] . '/php/footer.php';?>
    </div>
    <script>
        //< !--скрипт добвления кнопки наверх-- >
        addBtnGoToTop();
    </script>
</body>

</html>