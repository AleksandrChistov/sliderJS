function sliderJS(selector, options = {}) {
  const slider = document.querySelector(selector);
  const wrapper = document.createElement('div');
  const list = document.createElement('div');
  const slides = document.querySelectorAll(selector + ' div');
  const arrowLeft = document.createElement('button');
  const arrowRight = document.createElement('button');
  const pointsWrap = document.createElement('ul');
  // let marginSlide = options.margin || '10px';
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

    list.style.transform = `translateX(${-widthSlide}px)`;
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
      // slide.style.margin = '0 ' + marginSlide;

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
    // widthSlide = slider.offsetWidth - 100 - (parseInt(marginSlide) * 2);
    // widthWrapSlides = (widthSlide + parseInt(marginSlide) * 2) * slides.length;

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
      slideAnimation('prev');
      setTimeout(jump, 400);
    }
  }

  function nextSlider() {
    if (position < slides.length) {
      position++;

      slideAnimation('next');
      setTimeout(jump, 400);
    }
  }

  function slideAnimation(direction) {
    let start = Date.now();
    let shift = widthSlide / 40;
    let newShift = (direction === 'next') ? shift : widthSlide * 2;

    let timer = setInterval(function() {
      let timePassed = Date.now() - start;
      newShift = (direction === 'next') ? newShift + shift : newShift - shift;

      if (timePassed >= 400) {
        clearInterval(timer);
        list.style.transform = `translateX(${-widthSlide * position - widthSlide}px)`;
        return;
      }

      list.style.transform = `translateX(${-widthSlide * position - newShift}px)`;
    }, 10);
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

  init();
}