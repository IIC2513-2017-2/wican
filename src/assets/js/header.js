document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM is loaded!');
  const body = document.querySelector('body');
  let isHeaderFixed = false;
  const HEADER_FIXED_CLASS = 'minimized-header';
  document.addEventListener('scroll', () => {
    if (window.pageYOffset > 0 && !isHeaderFixed) {
      body.classList.add(HEADER_FIXED_CLASS);
      isHeaderFixed = true;
    } else if (window.pageYOffset === 0 && isHeaderFixed) {
      body.classList.remove(HEADER_FIXED_CLASS);
      isHeaderFixed = false;
    }
  });
});
