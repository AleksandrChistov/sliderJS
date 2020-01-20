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

  function init() {
    arrowLeft.innerHTML = '&#9668;';
    arrowRight.innerHTML = '&#9658;';

    addClasses();
    createPoints();
    addElements();
    setWidth();
    eventHandlerArrow();
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
      list.append(slide);
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
    widthWrapSlides = widthSlide * slides.length;

    slides.forEach(slide => {
      slide.style.width = widthSlide + 'px';
    });

    list.style.width = widthWrapSlides + 'px';
  }

  function eventHandlerArrow() {
    arrowLeft.addEventListener('click', prevSlider)
    arrowRight.addEventListener('click', nextSlider)
  }

  function prevSlider() {
    if (position > 0) {
      position--;
      console.log(position);
      list.style.transform = `translateX(${-widthSlide * position}px)`
    }
  }

  function nextSlider() {
    if (position < slides.length - 1) {
      position++;
      console.log(position);
      list.style.transform = `translateX(${-widthSlide * position}px)`
    }
  }

  init();
}