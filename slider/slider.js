function sliderJS(selector, options) {
  const slider = document.querySelector(selector);
  const slides = document.querySelectorAll(selector + ' div');
  const wrapper = document.createElement('div');
  const list = document.createElement('div');
  const arrowLeft = document.createElement('button');
  const arrowRight = document.createElement('button');

  function init() {
    addClasses();
    addElements();
  }

  function addClasses() {
    slider.classList.add('slider-js');
    wrapper.classList.add('slider-js-wrap');
    list.classList.add('slider-js-list');
    arrowLeft.classList.add('slider-js__arrow', 'slider-js__arrow-left');
    arrowRight.classList.add('slider-js__arrow', 'slider-js__arrow-right');
  }

  function addElements() {
    slides.forEach((slide, index) => {
      slide.classList.add('slider-js__item');
      list.appendChild(slide);
    });
  
    wrapper.appendChild(list);
    slider.appendChild(wrapper);
    slider.appendChild(arrowLeft);
    slider.appendChild(arrowRight);
  }

  init();
}