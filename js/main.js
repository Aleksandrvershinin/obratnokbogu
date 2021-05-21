// фукция добавления кнопки вверх и вниз
function addBtnGoToTop() {
    let btnBottom = document.querySelector('.btn-go-to-bottom');
    let btnTop = document.querySelector('.btn-go-to-top');

    window.addEventListener('scroll', trackScroll, {
        passive: true
    });

    // обработка события 'click' для скролла
    btnTop.addEventListener('click', () => {
        getScrolled();
        goTo(0);
    });

    trackScroll();

    function trackScroll() {
        let scrolled = window.pageYOffset;
        if (scrolled > 50) {
            btnTop.classList.add('show');
            btnBottom.classList.remove('show');
        }
        if (scrolled < 50) {
            btnTop.classList.remove('show');
        }
    }
    // функция скролла наверх
    function goTo(scroll) {
        window.scrollTo({
            top: scroll,
        });
    }
    // функция получения текущего скрола
    function getScrolled() {
        let scrolled = window.pageYOffset;
        // работаем с кнопкой вниз
        addBtnGoToBotton(scrolled);
    }

    // работа с кнопкой вниз
    function addBtnGoToBotton(scrolled) {
        btnBottom.classList.add('show');
        // отслеживаем клик по кнопке
        btnBottom.addEventListener('click', () => {
            goTo(scrolled);
        });
    }
}