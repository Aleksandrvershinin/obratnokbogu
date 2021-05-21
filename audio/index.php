<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta property="og:image" content="https://obratnokbogu.ru/media/audio_meta.jpg">

    <?php
    include $_SERVER['DOCUMENT_ROOT'] . "/audio/process_url.php";
    ?>

    <script class="script-share" src="/js/share_social_media.js" async></script>
    <link rel="stylesheet" href="/style/share_social_media.css">

    <script src="/js/simplebar.min.js"></script>
    <link rel="stylesheet" href="/style/simplebar.css">

    <link rel="stylesheet" href="/style/normalize.css">

    <script src="/audio/audio_js/playlists.js"></script>
    <script type="module" src="/audio/audio_js/audio_main.js"></script>

    <link rel="stylesheet" href="/style/style.css">

    <!-- скрипт и стили для переключения ночной темы -->
    <link rel="stylesheet" href="/style/light_style.css" class="style__theme">
    <script async src="/js/switch_theme.js"></script>

    <title>аудио лекции</title>
</head>

<body id="audio">
    <? include $_SERVER['DOCUMENT_ROOT'] . '/php/header.php'; ?>
    <div class="main-and-footer">
        <main class="main main__audio">
            <section class="section section-audio">
                <div class="audio-container">
                    <div class="audio-playlists-container user-select-none">
                        <h2 id="category1" data-category-id="1" data-category-name='ЛЕКЦИИ <div class="item-line"></div> БХАДЖАНЫ <div class="item-line"></div> КИРТАНЫ' class="audio-playlists-title first">
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
                        <div class="audio-playlists-row">
                            <form class="audio-playlists-form-search" onclick="event.preventDefault()">
                                <input placeholder="Поиск" class="audio-playlists-form-input" type="text">
                                <button type="submit" class="audio-playlists-form-btn"></button>
                            </form>
                            <button class="audio__switch__theme__btn switch__theme__btn">
                                <div class="audio__switch__theme__btn__img">
                                    <?php include $_SERVER['DOCUMENT_ROOT'] . '/media/img/icon_btn_dark_mode.php' ?>
                                </div>
                            </button>
                        </div>

                        <h2 id="category2" data-category-id="2" data-category-name="ФРАГМЕНТЫ ЛЕКЦИЙ" class="audio-playlists-title">
                            ФРАГМЕНТЫ ЛЕКЦИЙ
                        </h2>
                    </div>
                    <div class="audio-playlist__body">
                        <div data-simplebar-auto-hide="false" data-simplebar data-simplebar-scrollbar-max-size="50" class="audio-playlist-container">
                            <ul class="audio-playlist-list"> </ul>
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
                        <div class="audio-hud-element audio-player-name-track">
                            <p class="audio-player-name-track-marquee audio-player-name-track-marquee1"></p>
                            <p class="hide audio-player-name-track-marquee audio-player-name-track-marquee2"></p>
                        </div>

                        <input disabled type="range" step="0.000000000000000001" value="0" max="100" class="audio-hud-element audio-hud-progress-bar" id="audio-hud-progress-bar">
                    </div>
                    <div class="audio-hud-element audio-hud-duration" id="audio-hud-duration">00:00</div>

                    <div class="audio-hud-element audio-hud-share" id="my-share">
                    </div>
                    <div class="audio-hud-element audio-hud-loop">
                        <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="67.6634mm" height="57.1574mm" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" viewBox="0 0 2926 2472" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <g id="Слой_x0020_1">
                                <metadata id="CorelCorpID_0Corel-Layer" />
                                <g id="_302880128">
                                    <path class="fil0" d="M902 2137c450,-4 901,5 1351,0 383,-5 682,-324 673,-678 -3,-103 -124,-148 -196,-75 -51,53 -8,137 -70,266 -79,163 -228,260 -411,262 -385,4 -793,0 -1182,0 -39,0 -134,4 -167,-2l0 -333c-23,7 -350,196 -396,224 -64,38 -131,75 -196,111 -63,36 -129,77 -193,111 8,9 774,447 785,449l2 -335z" />
                                    <path class="fil0" d="M2026 335c-52,5 -116,1 -169,1 -56,0 -112,0 -168,0 -336,5 -677,-3 -1014,0 -179,2 -349,72 -475,198 -122,121 -205,304 -200,478 3,102 121,152 191,81 64,-65 7,-119 73,-265 74,-165 229,-263 411,-266 223,-4 450,0 673,0l506 0c54,0 119,-3 171,0l1 335c26,-7 777,-441 783,-449l-782 -448 -1 335z" />
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div class=" audio-hud-element audio-hud-mix">
                        <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="74.4322mm" height="57.9154mm" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" viewBox="0 0 2903 2259" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <g id="Слой_x0020_1">
                                <metadata id="CorelCorpID_0Corel-Layer" />
                                <path class="fil0" d="M2158 504c-42,0 -137,2 -179,3l-17 0c-8,0 -16,1 -23,1 -66,1 -115,2 -176,20 -103,31 -188,94 -261,171 -74,79 -136,173 -191,265 -31,52 -61,105 -92,159 -136,240 -282,496 -474,644 -42,32 -101,68 -166,95 -53,22 -110,38 -167,41 -28,2 -137,8 -223,7 -52,0 -95,-3 -111,-11 -23,-12 -38,-30 -47,-49 -5,-14 -7,-29 -7,-44 1,-14 5,-28 11,-41 10,-19 26,-35 45,-43 21,-8 93,-10 169,-12 61,-1 124,-2 157,-7 51,-7 99,-25 143,-48 58,-31 107,-71 142,-104 66,-65 132,-155 193,-251 62,-97 119,-199 167,-285 81,-146 167,-295 276,-420 110,-126 243,-226 417,-270 59,-15 200,-15 307,-15l107 -2 1 -308 706 404 -707 405 0 -305zm-2112 -32c-29,-16 -46,-44 -46,-95l0 -1c1,-21 9,-38 22,-51l0 0c13,-14 31,-23 51,-28 23,-5 79,-6 140,-5 84,1 177,7 206,11 76,11 152,40 220,79 78,44 148,101 201,160 27,29 59,69 90,110 34,44 66,90 89,126 9,15 11,17 17,27 7,9 17,24 33,46l6 10 -6 11 -92 164 -16 29 -17 -28c-30,-50 -37,-61 -42,-69l0 0c-2,-3 -3,-5 -5,-8 -18,-29 -37,-60 -56,-89 -19,-29 -38,-57 -57,-84 -29,-40 -56,-74 -86,-105 -29,-31 -61,-59 -99,-88 -136,-101 -246,-102 -401,-104 -17,0 -35,0 -53,-1 -39,0 -73,-2 -99,-17zm1980 1242c7,0 14,0 20,0l4 0 1 0 4 0 2 0 3 0 2 0 3 0 2 0 3 0 2 0 13 0 2 0 3 0 2 0 3 0 2 0 10 0 2 0 3 0 2 0 3 0 2 0 2 0 13 0 0 -12 0 0 0 -3 0 -1 0 0c-1,-23 0,-42 2,-58l0 -221 0 -26 0 0 0 -8 28 16c15,6 60,31 115,62 96,54 219,125 244,141 44,26 88,51 132,75 11,7 22,13 44,25 21,12 41,23 61,35l113 65 0 0 21 11 0 0 9 5 -30 17 -9 6c-45,28 -188,110 -333,193 -149,85 -301,171 -353,199l-13 7 -29 17 0 -11 0 -23 -1 -232c0,-1 0,-5 0,-11 0,-13 -1,-39 -1,-70l-175 -2c-108,-1 -195,-9 -277,-34 -82,-26 -158,-70 -242,-141 -56,-48 -104,-100 -148,-155 -44,-56 -84,-115 -125,-180 -5,-9 -13,-20 -20,-31l-4 -7 112 -194 10 15 71 112 0 0c45,73 110,170 192,251 81,80 179,145 293,158l4 0 0 0 4 1 0 0 5 0 0 0 4 1 0 0 5 0 0 0 4 1 0 0 5 0 0 0 4 0 1 0 4 1 0 0 5 0 0 0 4 0 1 0 4 1 0 0 1 0 4 0 4 0 1 0 4 1 1 0 4 0 1 0 9 0 5 1 0 0 4 0 1 0 4 0 1 0 4 0 1 0 4 0 1 1 4 0 1 0 4 0 1 0 4 0 1 0 4 0 1 0 4 0 1 0 4 0 1 1 0 0 5 0 4 0 2 0 3 0 2 0 3 0 2 0 4 0 1 0 4 0 1 0 4 0 1 0 4 0 1 0 4 0 1 0 4 0 1 0 4 1 2 0 3 0 2 0 3 0 2 0z" />
                            </g>
                        </svg>
                    </div>
                    <div class="audio-hud-element audio-hud-mute audio-hud-mute-false" id="audio-hud-mute"></div>
                    <input style=" -moz-user-select: none; -webkit-user-select: none; -ms-user-select: none; user-select: none;" type="range" value="50" max="100" title="Громкость" class="audio-hud-element audio-hud-volume" id="audio-hud-volume">
                </div>

            </div>
        </div>
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