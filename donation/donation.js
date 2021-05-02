// document.write(`
// <footer class="footer">
//     <div class="footer-container">
//         <div class="contact-phone-footer">
//       <p>Контакты для связи</p>
//       <p>Владимир<a href="tel:+79189898921 "> +7 918 989 89 21</a> </p>
//       <p>Эл.почта <a href="mailto:obratnokbogu@mail.ru">obratnokbogu@mail.ru</a></p>
//    </div>
//    <div class="donation-foter">
//       <button class="btn btn-donation-foter">Поддержать сайт
//          <a href="#"></a>
//       </button>
//    </div>
//    <div class="footer__social-media">
//       <div class="footer__social-media__you-tube">
//          <p>Ресурс на You Tube</p>
//          <a target="blank"
//             href="https://www.youtube.com/c/%D0%9E%D0%B1%D1%80%D0%B0%D1%82%D0%BD%D0%BE%D0%BA%D0%91%D0%BE%D0%B3%D1%83/featured"></a>
//       </div>
//       <div class="footer__social-media__vk">
//          <p>Ресурс ВКонтакте</p>
//          <a target="blank" href="https://vk.com/obratnokbogu"></a>
//       </div>
//    </div>
// </div>
// </footer>
// `)

document.addEventListener('DOMContentLoaded', () => {
   // получаем кнопку donation
   let donationBtn = document.querySelector('.btn__donation__js');

   // получаем кнопку отправить платеж
   let donationSendBtn = document.querySelector('.donation__form__input__btn');

   // получаем кнопку (крестик) для закрытия окна с формой donation
   let donationBtnClose = document.querySelector('.donation__form__close');

   // получаем кнопки с выбором суммы
   let donationBtnSum = document.querySelectorAll('.donation__form__btn__sum');
   let donationBtnSumBody = document.querySelectorAll('.donation__form__btn__sum__body');

   // получаем item с суммой
   let donationFormItemSum = document.querySelector('.donation__form__item__sum');

   // получаем input с суммой
   let donationFormInputSum = document.querySelector('.donation__form__input__sum');
   // получаем окно с формой donation
   let donationBody = document.querySelector('.body__donation');

   // заголовок для суммы
   let donationTitleSum = document.querySelector('.donation__form__title__sum');


   // переменная ошбки
   let error = 0;

   // отслеживаем клик по кнопке donation
   donationBtn.addEventListener('click', () => {
      // открываем окно с donation
      donationBody.classList.remove('hide');
   });

   // отслеживаем клик и закрываем окно с donation
   donationBody.addEventListener('click', (element) => {
      if (element.target === document.querySelector('.donation__form__close')) {
         donationBody.classList.add('hide');
      }
   });

   function removeClassIsActive() {
      donationBtnSumBody.forEach(el => {
         el.classList.remove('is-active');
      });
      donationFormItemSum.classList.remove('is-active');
   }
   // функция установки активной кнопки
   function getBtnActive(index) {
      // отбираем у всех кнопок актив
      removeClassIsActive();

      if (index === 2) {
         donationFormItemSum.classList.add('is-active');

      } else {
         donationBtnSumBody[index].classList.add('is-active');
         // прячем инпут для ввода суммы
         donationFormItemSum.classList.add('hide');
         document.querySelector('[data-sum-body=""]').classList.remove('hide');
      }
   }

   // перебираем кнопки
   donationBtnSumBody.forEach((element, index) => {

      // отслеживаем клик
      element.addEventListener('click', () => {
         // устанвливаем значение суммы инпута соглассно значению выбранной суммы
         donationFormInputSum.value = element.dataset.sumBody;

         getBtnActive(index);
         // проверяем если значение равно пустой строке показываем инпут для самостоятельного ввода суммы
         if (element.dataset.sumBody === "") {

            // показваем инпут для ввода суммы
            donationFormItemSum.classList.remove('hide');
            document.querySelector('[data-sum-body=""]').classList.add('hide');
            // устанавливаем в значение суммы пустую строку
            // donationFormInputSum.value = "";

         }
         // проверяем если значение пустое запрещаем отправку
         checkValueSum();
      });
   });

   // отслеживаем событие input
   donationFormInputSum.addEventListener('input', () => {

      //проверяем если значение пустое запрещаем отправку и заменяем все не цифры пустой строкой
      checkValueSum();
   });

   // отслеживаем сгобытие focus
   donationFormInputSum.addEventListener('focus', () => {
      // отбираем активной кнопке класс
      removeClassIsActive();
      getBtnActive(2);
   });
   // отслеживаем сгобытие blur
   donationFormInputSum.addEventListener('blur', () => {
      //проверяем если значение пустое запрещаем отправку и заменяем все не цифры пустой строкой
      checkValueSum();
   });
   // отслеживаем событие клик
   donationSendBtn.addEventListener('click', (e) => {
      checkValueSum();
      if (error) {
         e.preventDefault()
      }
   });

   // функция проверки значения суммы
   function checkValueSum() {
      // заменяем все не цифры пустой строкой
      donationFormInputSum.value = donationFormInputSum.value.replace(/[^\d]*/gi, '');
      // заменяем все нули в начале пустой строкой
      donationFormInputSum.value = donationFormInputSum.value.replace(/^0*/gi, '');
      if (donationFormInputSum.value === "" || donationFormInputSum.value == 0) {
         donationSendBtn.disabled = true;
         error++
      } else {
         donationSendBtn.disabled = false;
         error = 0
      }
   }
});

