<?php
// получаем текущий url
$url = $_SERVER['REQUEST_URI'];
// $url = htmlspecialchars($url);
$url = preg_replace('/\//', '', $url);
$url = preg_replace('/audio/', '', $url);

// проверяем get
if (isset($_GET["idPlaylist"]) && $_GET["idPlaylist"] !== '') { ?>
    // сохраняем в пременную плейлист
    let playList = playLists[<?php echo htmlspecialchars($_GET["idPlaylist"]) ?> - 1];
    // проверяем существует ли объект
    if (playList !== undefined) {
    // заполняем список треков
    filingPlaylist(playList.tracks);
    // устанавливаем первый трек в текущем плейлисте
    currentIdTrack = currentPlaylist[0].id;
    // устанавливаем текущий плейлист
    currentIdPlaylist = <?php echo htmlspecialchars($_GET["idPlaylist"]) ?>;
    // загружаем плейлист в плеер
    setPlaylist(currentPlaylist);
    // устанавливаем трек в плеер
    setTrack(0);
    // запускаем плеер
    audioAct();
    } else {
    // загружаем плеер согласно localStorage
    loadPage();
    }
    // ищем трек по url
<?php } else { ?>
    let result = lookforTrack('nameTranslit', '<?= $url ?>');
    if (result['playlist'] !== undefined) {
    // заполняем список треков
    filingPlaylist(result['playlist']);
    // устанавливаем трек
    currentIdTrack = result['idTrack'];
    // загружаем плейлист в плеер
    setPlaylist(currentPlaylist);
    // устанавливаем трек в плеер
    setTrack(lookforIndexTrack());
    // подсвечиваем трек
    markerCurrentTrack(searchTrackInPlaylist(currentPlaylist, currentIdTrack));
    setTimeout(scroll, 1);
    } else {
    // загружаем плеер согласно localStorage
    loadPage();
    }
<?php } ?>