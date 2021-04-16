<?php
// получаем текущий url
$url = $_SERVER['REQUEST_URI'];
$url = htmlspecialchars($url);
$url = preg_replace('/\//', '', $url);
$url = preg_replace('/audio/', '', $url);
?>
<script>
    let resultUrl = "<?= $url ?>";
</script>