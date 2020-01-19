function sliderJS(selector, options) {
  const slider = document.querySelector(selector);
  const wrapper = document.createElement('div');
  const list = document.createElement('div');
  const slides = document.querySelectorAll(selector + ' div');
  const arrowLeft = document.createElement('button');
  const arrowRight = document.createElement('button');
  const pointsWrap = document.createElement('ul');

  function init() {
    addClasses();
    createPoints();
    addElements();
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
      pointsWrap.append(point);
    }
  }

  function addElements() {
    slides.forEach((slide, index) => {
      slide.classList.add('slider-js__slide');
      slide.setAttribute('id', 'slider-js-slide-' + index);
      list.append(slide);
    });
  
    wrapper.append(list);
    slider.append(wrapper);
    slider.append(arrowLeft);
    slider.append(arrowRight);
    slider.append(pointsWrap);
  }

  init();
}