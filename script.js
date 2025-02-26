// Floating circle follows the mouse
document.addEventListener('mousemove', function(e) {
    const circle = document.getElementById('floating-circle');
    circle.style.left = `${e.clientX}px`;
    circle.style.top = `${e.clientY}px`;
  });
  

  
  document.querySelector('.find-out-more-button').addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector('.main-video');
    const offsetAdjustment = 150; // Number of pixels to adjust the scroll position
    const offset = target.getBoundingClientRect().top + window.pageYOffset - offsetAdjustment;
    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    });
});

document.querySelector('.discover-button').addEventListener('click', function(e) {
  e.preventDefault();
  const target = document.querySelector('.profiles-section');
  const offsetAdjustment = 45; // Number of pixels to adjust the scroll position
  const offset = target.getBoundingClientRect().top + window.pageYOffset - offsetAdjustment;
  window.scrollTo({
    top: offset,
    behavior: 'smooth'
  });
});


