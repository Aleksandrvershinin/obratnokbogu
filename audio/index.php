<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <script defer src="/audio/audio.js"></script> -->
    <?php include $_SERVER['DOCUMENT_ROOT'] . "/audio/audio.php"; ?>
    <script class="script-share" src="/js/share_social_media.js" async></script>
    <link rel="stylesheet" href="/style/share_social_media.css">

    <script src="/js/simplebar.min.js"></script>
    <link rel="stylesheet" href="/style/normalize.css">

    <script src="/audio/playlists.js"></script>
    <link rel="stylesheet" href="/style/simplebar.css">



    <!-- <link rel="stylesheet" href="style/animate.css"> -->
    <link rel="stylesheet" href="/style/style.css">
    <title>аудио лекции</title>
</head>

<body id="audio">
    <script src="/js/header.js"></script>
    <div class="main-and-footer">
        <main class="main main__audio">
            <section class="section section-audio">
                <div class="audio-container">
                    <div class="audio-playlists-container">
                        <h2 class="audio-playlists-title">
                            ЛЕКЦИИ
                            <div class="item-line"></div>
                            БХАДЖАНЫ
                            <div class="item-line"></div>
                            КИРТАНЫ
                        </h2>
                        <div class="audio-playlists-list-element">
                            <div class="item-line"></div>
                            <ul class="audio-playlists-list"></ul>

                        </div>
                        <form class="audio-playlists-form-search" onclick="event.preventDefault()">
                            <input placeholder="Поиск" class="audio-playlists-form-input" type="text">
                            <button type="submit" class="audio-playlists-form-btn"></button>
                            <label id="audio__playlists__form__label"></label>
                        </form>
                    </div>
                    <div class="audio-playlist__body">
                        <div data-simplebar-auto-hide="false" class="audio-playlist-container">
                            <ul class="audio-playlist-list">

                            </ul>
                        </div>
                    </div>

                </div>

            </section>
        </main>
        <div class="section section-audio-player">
            <div class="audio-player-container">

                <audio preload="auto" class="audio-player" id="audio-player"></audio>

                <div class="audio-hud">
                    <button class="audio-player-body-previe">
                        <div class="audio-player-previe"></div>
                    </button>
                    <button class="audio-player-body-play" id="audio-player-body-play">
                        <div class="audio-hud-element audio-hud-action audio-hud-action-play" id="audio-hud-action">
                        </div>
                    </button>

                    <button class="audio-player-body-next">
                        <div class="audio-player-next"></div>
                    </button>
                    <div class="audio-hud-element audio-hud-curr-time" id="audio-hud-curr-time">00:00</div>
                    <div class="audio-player-info">
                        <!-- <div class="audio-hud-element audio-player-name-track"> </div> -->
                        <marquee behavior="alternate" scrollamount="2" class="audio-hud-element audio-player-name-track">
                        </marquee>
                        <input disabled type="range" step="0.000000000000000001" value="0" max="100" class="audio-hud-element audio-hud-progress-bar" id="audio-hud-progress-bar">
                    </div>
                    <div class="audio-hud-element audio-hud-duration" id="audio-hud-duration">00:00</div>

                    <div class="audio-hud-element audio-hud-share" style="background-color: #fff; border-radius: 50%;" id="my-share">
                    </div>
                    <div class="audio-hud-element audio-hud-loop"></div>
                    <div class=" audio-hud-element audio-hud-mix"></div>
                    <div class="audio-hud-element audio-hud-mute audio-hud-mute-false" id="audio-hud-mute"></div>
                    <input style=" -moz-user-select: none; -webkit-user-select: none; -ms-user-select: none; user-select: none;" type="range" value="50" max="100" title="Громкость" class="audio-hud-element audio-hud-volume" id="audio-hud-volume">
                    <!-- <select title="Скорость" class="audio-hud-element audio-hud-speed" id="audio-hud-speed">

                            <option value="25">x0.25</option>

                            <option value="50">x0.50</option>

                            <option value="75">x0.75</option>

                            <option value="100" selected>x1.00</option>

                            <option value="125">x1.25</option>

                            <option value="150">x1.50</option>

                            <option value="175">x1.75</option>

                            <option value="200">x2.00</option>

                        </select> -->
                    <!-- <a class="audio-hud-element audio-hud-download" title="Скачать" href="audio.mp4" download></a> -->

                </div>

            </div>
        </div>
    </div>
    <div class="pla">

    </div>
</body>
<!-- скрипт поделиться в соц сетях -->
<script>
    var myShare = document.getElementById('my-share');

    var share = Ya.share2(myShare, {
        content: {
            url: 'https://obratnokbogu.ru/audio/',
            title: 'аудио лекции',
            image: 'https://obratnokbogu.ru/media/sh.jpg',
        },
        theme: {
            services: 'vkontakte,facebook,odnoklassniki,telegram,whatsapp,viber',
            limit: 0,
            size: 's',
            moreButtonType: 'short',
            popupDirection: 'top',
        },

    });
</script>

</html>
<ul>
    <?
foreach($user as $key => $value ) { ?>
    <li>
        <?= $key . '-' . $value; ?>
    </li>
    <?}
?>
</ul>