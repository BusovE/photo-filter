//add fullscreen button
const fullScreen = document.documentElement;
const fullScreenId = document.getElementById('fullscreen');

const turnOnFullScreen = () => {
  if (!document.fullscreenElement) {
    fullScreen.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      turnOffFullScreen();
    }
  }
};

const turnOffFullScreen = () => {
  document.addEventListener("keypress", (event) => {
    if (event.key === 'Escape') {
      turnOnFullScreen();
    }
  }, false);
};

fullScreenId.addEventListener('click', turnOnFullScreen);

//function that works with filters
const image = document.querySelector('.image');
const btnReset = document.querySelector('.btn-reset');
const inputs = document.querySelectorAll('.filters input');

function changeFilter() {

  function changeInputsFilter() {

    const filter = this.dataset.sizing || '';
    image.style.setProperty(`--${this.name}`, this.value + filter);
    const outFilter = this.nextElementSibling;
    outFilter.innerHTML = this.value;
  }

  inputs.forEach(input => input.addEventListener('input', changeInputsFilter));

}

changeFilter();

//function Button Reset
function resetFilters() {
  inputs.forEach(input => {
    (input.name === 'saturate') ? input.value = 100: input.value = 0;
    image.style.setProperty(`--${input.name}`, input.value + (input.dataset.sizing || ''));
    const outFilter = input.nextElementSibling;
    outFilter.innerHTML = input.value;
  });

}

btnReset.addEventListener('click', resetFilters);

// next Picture
function nextImage() {
  const btnNextImage = document.querySelector('.btn-next');
  const btnPrevImage = document.querySelector('.btn-prev');
  const hour = new Date().getHours();
  let url;

  function getUrlOfHour() {
    console.log(hour);
    if (hour >= 6 && hour < 12) {
      return url = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/morning/';
    } else if (hour >= 12 && hour < 18) {
      return url = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/day/';
    } else if (hour >= 18 && hour < 24) {
      return url = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/';
    } else {
      return url = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/night/';
    }
  }

  const imagesList = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
  let i = 0;

  function getImageFromUrl() {
    getUrlOfHour();
    const index = i % imagesList.length;
    const imageUrl = url + imagesList[index];
    image.src = imageUrl;
    i++;
    btnNextImage.disabled = true;
    setTimeout(() => {
      btnNextImage.disabled = false;
    }, 300);
  }
  btnNextImage.addEventListener('click', getImageFromUrl);

  function getPrevImage() {
    getUrlOfHour();
    if (i === 0) {
      i = imagesList.length - 1;
    } else {
      i--;
    }
    const index = i % imagesList.length;
    const imageUrl = url + imagesList[index];
    image.src = imageUrl;
    btnPrevImage.disabled = true;
    setTimeout(() => {
      btnPrevImage.disabled = false;
    }, 300);
  }
  btnPrevImage.addEventListener('click', getPrevImage);

}

nextImage();

// load picture
function loadImage() {
  const fileLoad = document.querySelector('input[type="file"]');
  fileLoad.addEventListener('change', function () {
    const file = fileLoad.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      image.src = reader.result;
    };

    reader.readAsDataURL(file);
    fileLoad.value = null;
    console.log(fileLoad.value);
  });
}

loadImage();

//save Image
function downloadImage() {

  const canvas = document.querySelector('canvas');
  const btnSaveImage = document.querySelector('.btn-save');
  const canv = canvas.getContext('2d');

  function createCanvas(img) {
    let filters = '';
    canvas.width = img.width;
    canvas.height = img.height;

    inputs.forEach(input => {
      if (input.name === 'blur') {
        const sizeBlur = (input.value * ((img.width / image.width + img.height / image.height) / 2)).toFixed(2);
        filters += `${input.name}(${sizeBlur}${input.dataset.sizing})`;
      } else {
        filters += `${input.name}(${input.value}${input.dataset.sizing})`;
      }
    });
    canv.filter = filters.trim();
    canv.drawImage(img, 0, 0);
  }


  function saveImage() {
    btnSaveImage.addEventListener('click', () => {
      const img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      img.src = image.src;
      img.onload = () => {
        createCanvas(img);
        let link = document.createElement('a');
        link.download = 'savedImage.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        link.delete;
      };
    });
  }
  saveImage();
}
downloadImage();

//function add active class for buttons
function btnActive() {

  const btns = document.querySelectorAll('.btn');

  btns.forEach(btn => btn.addEventListener('click', function () {
    const active = document.getElementsByClassName('btn-active');
    active[0].className = active[0].className.replace(' btn-active', "");
    this.className += ' btn-active';
  }));
}

btnActive();
