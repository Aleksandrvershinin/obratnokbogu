export function startMarquee({
    marqueeWrapper,
    marquee1,
    marquee2,
    intervalMarquee,
}) {

    // ширина тела
    let marqueeWrapperWidth = marqueeWrapper.clientWidth;
    // ширина бегущей строки
    let marqueeWidth = marquee1.clientWidth;
    // устанвливаем разницу между второй и первой строкой в пикселях
    let different = 200;
    // переменные с изменяемой позитиции строки
    let offset1 = marquee1.offsetLeft;
    let offset2 = marqueeWidth + different;

    // проверяем помещается ли название в строку
    if (marqueeWrapperWidth < marqueeWidth) {
        // показываем вторую строку с названием
        marquee2.classList.remove('hide');
        // устанвливаем позитицию второй строки
        marquee2.style.left = `${offset2}px`;
        // запускаем строку
        window.intervalMarquee = setInterval(move, 1);
    }



    function move() {
        // изменяем данные в переменных
        offset1 = offset1 - 0.13;
        offset2 = offset2 - 0.13;
        // изменяем позиции строк
        marquee1.style.left = `${offset1}px`;
        marquee2.style.left = `${offset2}px`;
        // проверяем когда строки дойдут до конца
        if (marquee1.offsetLeft < -(marqueeWidth + 30)) {
            // заддаем позицию согласно разнице между строками высчитаной вначале
            offset1 = marquee2.offsetLeft + marqueeWidth + different;
        }
        // проверяем когда строки дойдут до конца
        if (marquee2.offsetLeft < -(marqueeWidth + 30)) {
            // заддаем позицию согласно разнице между строками высчитаной вначале
            offset2 = marquee1.offsetLeft + marqueeWidth + different;
        }

        // останавливаем строки в начале

        if (offset1 <= 1.05 && offset1 > 0.92) {
            clearInterval(window.intervalMarquee);
            setTimeout(() => {
                window.intervalMarquee = setInterval(move, 1);
            }, 3000);
        }
        if (offset2 <= 1.05 && offset2 > 0.92) {
            clearInterval(window.intervalMarquee);
            setTimeout(() => {
                window.intervalMarquee = setInterval(move, 1);
            }, 3000);
        }

    }
}
