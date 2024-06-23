document.addEventListener('DOMContentLoaded', function() {
  const listItems = document.querySelectorAll('.centered-text ul li');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const items = Array.from(entry.target.querySelectorAll('li'));
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('show');
          }, index * 300); // 300ms delay between each item
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const ul = document.querySelector('.centered-text ul');
  observer.observe(ul);
});
