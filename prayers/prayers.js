document.addEventListener('DOMContentLoaded', () => {
    // получаем список
    let ul = document.querySelector('.prayers__list');
    ul.addEventListener('click', (e) => {
        if (e.target.classList.value === "prayers__item__list__item__title__link") {
            // получаем родительский элемент с текстом
            let itemTextBoxElement = e.target.parentElement.parentElement.querySelector('.prayers__item__list__item__text__box');
            //  получаем высоту елемента с текстом
            let scrollHeightElement = itemTextBoxElement.children[0].scrollHeight;
            // высчитываем растояние между блоком с текстом и его родителем
            let distance = itemTextBoxElement.children[0].offsetTop - itemTextBoxElement.offsetTop - itemTextBoxElement.offsetHeight;

            // проверяем раскрыт ли блок
            if (itemTextBoxElement.clientHeight === 0) {
                //    присваеваем высоту родителю равную высоте блока с тестом
                itemTextBoxElement.style.height = `${scrollHeightElement + distance}px`;
            } else {
                //    присваеваем высоту родителю равную 0 и скрываем
                itemTextBoxElement.style.height = `0px`;
            }
        }

    });
});