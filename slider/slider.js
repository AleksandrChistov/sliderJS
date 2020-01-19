function sliderJS(selector, options) {
  const slider = document.querySelector(selector);
  const slides = document.querySelectorAll(selector + ' div');
  const wrapper = document.createElement('div');
    
  slider.classList.add('slider-js');
  wrapper.classList.add('slider-js-wrap');

  slides.forEach((slide, index) => {
    slide.classList.add('slider-js__item');
    wrapper.appendChild(slide);
  });

  slider.appendChild(wrapper);
}