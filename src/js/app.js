import * as flsFunctions from './modules/functions.js'

flsFunctions.isWebp()

AOS.init({
  once: true,
  duration: 1000,
});

const colTitles = document.querySelectorAll('#accordion .panel-title a');

colTitles.forEach((method) => {
  method.addEventListener('click', () => {
    colTitles.forEach((item) =>
      item.parentElement.parentElement.parentElement.classList.remove('active')
    );
    method.parentElement.parentElement.parentElement.classList.add('active');
    if (!method.classList.contains('collapsed')) {
      method.parentElement.parentElement.parentElement.classList.remove(
        'active'
      );
    }
  });
});

const colTitles2 = document.querySelectorAll('#accordion2 .panel-title a');

colTitles2.forEach((method) => {
  method.addEventListener('click', () => {
    colTitles2.forEach((item) =>
      item.parentElement.parentElement.parentElement.classList.remove('active')
    );
    method.parentElement.parentElement.parentElement.classList.add('active');
    if (!method.classList.contains('collapsed')) {
      method.parentElement.parentElement.parentElement.classList.remove(
        'active'
      );
    }
  });
});


const collapseSelects = document.querySelectorAll("#accordion .panel-title a");
const images = document.querySelectorAll(".services-fl .images img");

for (let collapseSelect of collapseSelects) {
  collapseSelect.addEventListener('click', (e) => {
    for (let img of images) {
      if (e.target.dataset.value == img.dataset.img) {
        img.classList.add("active");
      } else {
        img.classList.remove("active");
      }
    }
  })
}


var swiper = new Swiper(".products-swiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiper2 = new Swiper(".serts-slider", {
  slidesPerView: 1,
  centeredSlides: true,
  spaceBetween: 30,
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});


var map;

DG.then(function () {
  map = DG.map('map', {
    center: [43.175626, 76.758061],
    zoom: 15
  });
  DG.marker([43.175626, 76.758061]).addTo(map);
});


$(function () {
  $('#phone').mask('+7 (999) 999-99-99');
});

$(function () {
  $('#phone2').mask('+7 (999) 999-99-99');
});


const toggleBtn = document.querySelector('.toggle-btn')
const mobMenu = document.querySelector('.mob-menu')
const mobMenuLInks = document.querySelectorAll('.mob-menu a')

toggleBtn.addEventListener('click', () => {
  mobMenu.classList.toggle('active')
  toggleBtn.classList.toggle('active')
})

for (let mobMenuLInk of mobMenuLInks) {
  mobMenuLInk.addEventListener('click', () => {
    mobMenu.classList.remove('active')
    toggleBtn.classList.remove('active')
  })
}


// $("#form1").submit(function () {
//   $.ajax({
//     type: "POST",
//     url: "form.php",
//     data: $(this).serialize(),
//   }).done(function () {
//     window.location = "/thanks.html";
//   });
//   return false;
// });

// $("#form2").submit(function () {
//   $.ajax({
//     type: "POST",
//     url: "form.php",
//     data: $(this).serialize(),
//   }).done(function () {
//     window.location = "/thanks.html";
//   });
//   return false;
// });


$('.telegram-form').on('submit', function (event) {

  event.stopPropagation();
  event.preventDefault();

  let form = this,
    submit = $('.submit', form),
    data = new FormData(),
    files = $('input[type=file]')


  $('.submit', form).val('Отправка...');
  $('input, textarea', form).attr('disabled', '');

  data.append('name', $('[name="name"]', form).val());
  data.append('phone', $('[name="phone"]', form).val());
  data.append('question', $('[name="question"]', form).val());
  // data.append('email', $('[name="email"]', form).val());
  // data.append('file', $('[name="file"]', form).val());


  files.each(function (key, file) {
    let cont = file.files;
    if (cont) {
      $.each(cont, function (key, value) {
        data.append(key, value);
      });
    }
  });

  $.ajax({
    url: 'form.php',
    type: 'POST',
    data: data,
    cache: false,
    dataType: 'json',
    processData: false,
    contentType: false,
    xhr: function () {
      let myXhr = $.ajaxSettings.xhr();

      if (myXhr.upload) {
        myXhr.upload.addEventListener('progress', function (e) {
          if (e.lengthComputable) {
            let percentage = (e.loaded / e.total) * 100;
            percentage = percentage.toFixed(0);
            $('.submit', form)
              .html(percentage + '%');
          }
        }, false);
      }

      return myXhr;
    },
    error: function (jqXHR, textStatus) {
      // Тут выводим ошибку
    },
    complete: function () {
      // Тут можем что-то делать ПОСЛЕ успешной отправки формы
      console.log('Complete')
      form.reset()
      window.location.href = "/thanks.html";
    }
  });

  return false;
});