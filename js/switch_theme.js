function switchTheme() {
    let switchThemeBtn = document.querySelector('.switch__theme__btn');

    if (switchThemeBtn !== null) {
        switchThemeBtn.addEventListener('click', () => {
            let styleTheme = document.querySelector('.style__theme');
            if (styleTheme !== null) {
                if (styleTheme.getAttribute('href') === '/style/light_style.css') {
                    styleTheme.setAttribute('href', '/style/dark_style.css');
                } else {
                    styleTheme.setAttribute('href', '/style/light_style.css');
                }
            }
        });
    }
}
switchTheme();