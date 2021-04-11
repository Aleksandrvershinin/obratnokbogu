<?php
include __DIR__ . "/count_users.inc.php";
?>

<!DOCTYPE html>
<html lang="ru">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta property="og:title" content="радио">
    <meta property="og:site_name" content="Обратно к богу">
    <meta property="og:url" content="https://obratnokbogu.ru/radio/">
    <!-- <meta property="og:description" content=""> -->
    <meta property="og:image" content="https://obratnokbogu.ru/media/img/link_radio.jpg">


    <script defer src="radio.js"></script>
    <script src="/js/simplebar.min.js"></script>
    <script src="/audio/playlists.js"></script>
    <link rel="stylesheet" href="../style/simplebar.css">

    <!-- <link rel="stylesheet" href="style/animate.css"> -->
    <link rel="stylesheet" href="../style/normalize.css">
    <link rel="stylesheet" href="../style/style.css">
    <title>радио</title>
</head>

<body class="radio" id="radio">
    <div class="main-and-footer">
        <main class="main main__radio">
            <section class="section radio__section">
                <div class="radio__information">
                    <a class="radio__link__home" href="/"></a>
                    <div class="radio__count__users">
                        <?= sizeof(file($base)) . " чел."; ?>
                    </div>
                </div>

                <div class="container radio__container">
                    <div class="radio__box">
                        <audio preload="metadata" id="radio-player"></audio>
                        <div class="radio-player-name-track"></div>
                        <video loop class="radio-player-equalizer" src="/media/img/radio_equalizer.mp4"></video>
                        <button class="radio-player-body-play">
                            <div class="radio__player__action radio__player__action-pause ">
                            </div>
                        </button>
                        <h1 class="radiio__title">ПРАБХУПАДА <p>радио</p>
                        </h1>
                    </div>
                </div>
            </section>
        </main>
        <footer>
            <button class="btn__donation__js radio__link__donation">поддержать</button>
            <?php include $_SERVER['DOCUMENT_ROOT'] .  '/donation/donation.php' ?>
        </footer>
        <!-- <div class="section section-audio-player section-radio-player">
            <div class="audio-player-container">
                <div class="audio-hud">
                    <div class="audio-hud-element audio-hud-curr-time" id="audio-hud-curr-time">00:00</div>
                    <div class="audio-player-info">
                        <input type="range" step="0.000000000000000001" value="0" max="100"
                            class="audio-hud-element audio-hud-progress-bar" id="audio-hud-progress-bar">
                    </div>
                    <div class="audio-hud-element audio-hud-duration" id="audio-hud-duration">00:00</div>
                </div>
            </div>
        </div> -->
    </div>
</body>

</html>