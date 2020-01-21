function sliderJS(selector, options = {}) {
  const slider = document.querySelector(selector);
  const wrapper = document.createElement('div');
  const list = document.createElement('div');
  const slides = document.querySelectorAll(selector + ' > div');
  const arrowLeft = document.createElement('button');
  const arrowRight = document.createElement('button');
  const pointsWrap = document.createElement('ul');
  let points;
  let activePoint = 0;
  let widthSlide = 0;
  let widthWrapSlides = 0;
  let position = 0;
  let cloneFirst;
  let cloneLast;

  function init() {
    arrowLeft.innerHTML = '&#9668;';
    arrowRight.innerHTML = '&#9658;';

    addClasses();
    createPoints();
    addElements();
    setWidth();
    eventHandlerArrow();

    pointsWrap.addEventListener('click', toggleSlide);

    list.style.transform = `translateX(${-widthSlide}px)`;

    points = document.querySelectorAll('.slider-js-points-list > li');
  }

  function addClasses() {
    slider.classList.add('slider-js');
    wrapper.classList.add('slider-js-wrap');
    list.classList.add('slider-js-list');
    arrowLeft.classList.add('slider-js__arrow', 'slider-js__arrow-left');
    arrowRight.classList.add('slider-js__arrow', 'slider-js__arrow-right');
    pointsWrap.classList.add('slider-js-points-list');
  }

  function createPoints() {
    for (let i = 0; i < slides.length; i++) {
      const point = document.createElement('li');
      point.classList.add('slider-js__point');

      if (i === 0) {
        point.classList.add('slider-js__point_active');
      }

      point.setAttribute('id', 'slider-js-point-' + i);
      point.setAttribute('data-slider-index', i);
      pointsWrap.append(point);
    }
  }

  function addElements() {
    slides.forEach((slide, index) => {
      slide.classList.add('slider-js__slide');
      slide.setAttribute('id', 'slider-js-slide-' + index);
      slide.setAttribute('data-slider-index', index);

      if (index === 0) {
        cloneFirst = slide.cloneNode(true);
        cloneFirst.setAttribute('id', 'slider-js-slide-clone1');
        cloneFirst.setAttribute('data-slider-index', -1);
      }

      list.append(slide);

      if (index === slides.length - 1) {
        cloneLast = slide.cloneNode(true);
        cloneLast.setAttribute('id', 'slider-js-slide-clone2');
        cloneLast.setAttribute('data-slider-index', slides.length);
        list.prepend(cloneLast);
        list.append(cloneFirst);
      }
    });
  
    wrapper.append(list);
    slider.append(wrapper);
    slider.append(arrowLeft);
    slider.append(arrowRight);
    slider.append(pointsWrap);
  }

  function setWidth() {
    widthSlide = slider.offsetWidth - 100;
    widthWrapSlides = widthSlide * slides.length + (widthSlide * 2);

    slides.forEach(slide => {
      slide.style.width = widthSlide + 'px';
    });

    cloneFirst.style.width = widthSlide + 'px';
    cloneLast.style.width = widthSlide + 'px';

    list.style.width = widthWrapSlides + 'px';
  }

  function eventHandlerArrow() {
    arrowLeft.addEventListener('click', prevSlider);
    arrowRight.addEventListener('click', nextSlider);
  }

  function prevSlider() {
    if (position >= 0) {
      position--;

      arrowLeft.removeEventListener('click', prevSlider);
      pointsWrap.removeEventListener('click', toggleSlide);

      slideAnimation('prev').then(() => {
        list.style.transform = `translateX(${-widthSlide * position - widthSlide}px)`;

        points[activePoint].classList.remove('slider-js__point_active');
        activePoint = (position >= 0) ? position : slides.length - 1;
        points[activePoint].classList.add('slider-js__point_active');

        jump();

        arrowLeft.addEventListener('click', prevSlider);
        pointsWrap.addEventListener('click', toggleSlide);
      });
    }
  }

  function nextSlider() {
    if (position < slides.length) {
      position++;

      arrowRight.removeEventListener('click', nextSlider);
      pointsWrap.removeEventListener('click', toggleSlide);

      slideAnimation('next').then(() => {
        list.style.transform = `translateX(${-widthSlide * position - widthSlide}px)`;

        points[activePoint].classList.remove('slider-js__point_active');
        activePoint = (position < slides.length) ? position : 0;
        points[activePoint].classList.add('slider-js__point_active');
        
        jump();
        
        arrowRight.addEventListener('click', nextSlider);
        pointsWrap.addEventListener('click', toggleSlide);
      });
    }
  }

  function slideAnimation(direction) {
    let start = Date.now();
    let currentPosition = activePoint * -widthSlide - widthSlide;
    let endPosition = position * widthSlide + widthSlide;
    let step;

    if (direction === 'next') {
      step = (endPosition + currentPosition) / 40;
    } else {
      step = (currentPosition + endPosition) / 40 * -1;
    }

    return new Promise(resolve => {
      let timer = setInterval(function() {
        let timePassed = Date.now() - start;
        currentPosition = (direction === 'next') ? currentPosition - step : currentPosition + step;
  
        if (timePassed >= 400 && currentPosition >= -endPosition) {
          console.log(currentPosition, -endPosition);
          clearInterval(timer);
          resolve();
        }
        
        list.style.transform = `translateX(${currentPosition}px)`;
      }, 10);
    });
  }

  function jump() {
    if (position === slides.length) {
      position = 0;
      list.style.transform = `translateX(${-widthSlide * position - widthSlide}px)`;
    }

    if (position === -1) {
      position = slides.length - 1;
      list.style.transform = `translateX(${-widthSlide * position - widthSlide}px)`;
    }
  }

  function toggleSlide() {
    let clickPosition = +event.target.dataset.sliderIndex;

    if (!isNaN(clickPosition)) {
      if (clickPosition < position) {
        position = clickPosition + 1;
        prevSlider();
      } else {
        position = clickPosition - 1;
        nextSlider();
      }
    }
  }

  init();
}