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
        <!-- выводим меню -->
        <?php writeMenu($menu); ?>
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