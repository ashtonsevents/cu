// Floating circle follows the mouse
document.addEventListener('mousemove', function(e) {
    const circle = document.getElementById('floating-circle');
    circle.style.left = `${e.clientX}px`;
    circle.style.top = `${e.clientY}px`;
  });
  
  // Smooth scroll when Discover button is clicked
  document.querySelector('.discover-button').addEventListener('click', function(e) {
    e.preventDefault();
    // Target the <h2> element in the Profiles Section
    const target = document.querySelector('.profiles-section h2');
    const offset = target.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: offset, // Adjust offset if needed (e.g., subtract some pixels)
      behavior: 'smooth'
    });
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

