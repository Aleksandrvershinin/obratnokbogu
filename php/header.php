<?php
// подключаем файл с меню
include_once $_SERVER['DOCUMENT_ROOT'] . '/php/main_menu.php';
// подключаем файл с функциями
include_once $_SERVER['DOCUMENT_ROOT'] . '/php/functions.php';
?>

<header class="header">
    <div class="container header-container">
        <div class="header-logo">
            <img class="header-logo-img" src="/media/img/logo.jpg" alt="">
            <a href="/" class="header-logo-link"></a>
        </div>
        <nav class="header-nav">
            <ul class="header-nav-lists">
                <?php
                foreach ($menu as $key => $value) {
                ?>
                    <li class="header-nav-item <? if (isCurrentUrl($value['path'])) echo 'is-active'; ?>">
                        <a href="<?= $value['path']; ?>"><?= $value['title']; ?></a>
                    </li>
                <?php
                }
                ?>
                <!-- <li class="header-nav-item">
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
                </li> -->
            </ul>
        </nav>
        <button class="header-night-btn"></button>
        <div class="header-radio">
            <div class="box-header-radio">
                <div class="body-icon-play-header-radio">
                    <div class="icon-play-header-radio">
                    </div>
                </div>
                <p class="header-radio-text">радио - Прабхупада</p>
            </div>
            <a target=" blank" href="/radio"></a>
        </div>
    </div>
</header>