
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  

    const heroOverlay = document.querySelector('.hero-overlay');
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      if (heroOverlay) {
        heroOverlay.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    });
  
 
    const mobileMenu = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
  
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        if (mobileMenu.classList.contains('active')) {
          mobileMenu.style.display = 'flex';
          mobileMenu.style.position = 'absolute';
          mobileMenu.style.top = '100%';
          mobileMenu.style.left = '0';
          mobileMenu.style.right = '0';
          mobileMenu.style.backgroundColor = 'var(--background)';
          mobileMenu.style.padding = '1rem';
          mobileMenu.style.flexDirection = 'column';
          mobileMenu.style.gap = '1rem';
        } else {
          mobileMenu.style.display = 'none';
        }
      });
    }
  
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768 && mobileMenu) {
        mobileMenu.style.display = 'flex';
        mobileMenu.style.position = 'static';
        mobileMenu.style.padding = '0';
        mobileMenu.style.backgroundColor = 'transparent';
      } else if (mobileMenu) {
        mobileMenu.style.display = 'none';
      }
    });
  

    if (typeof handleAmbientLighting === 'function') handleAmbientLighting();
    if (typeof enhanceGlitchEffect === 'function') enhanceGlitchEffect();
    if (typeof setupStoryParallax === 'function') setupStoryParallax();
    if (typeof handleScrollAnimations === 'function') handleScrollAnimations();
    if (typeof enhanceGridAnimation === 'function') enhanceGridAnimation();
  });

  function delay(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

async function showtext() {
    let texts = [
        "Welcome To Choice Story",
        "Live The Story The Way You Want",
        "Let's Dive Into It!"
    ];

    document.querySelector(".ambient-light").classList.add("invisible");
    document.querySelector(".navigation").classList.add("invisible");
    document.querySelector(".hero").classList.add("invisible");
    document.querySelector(".story").classList.add("invisible");

    for (const text of texts) {

        document.querySelector(".intro").innerHTML = `<div class="intro-text">${text}</div>`;
        await delay(2500);
    }
}

async function showhomepage() {
    await delay(7500);
    document.querySelector(".ambient-light").classList.remove("invisible");
    document.querySelector(".navigation").classList.remove("invisible");
    document.querySelector(".hero").classList.remove("invisible");
    document.querySelector(".story").classList.remove("invisible");
    document.querySelector(".intro").classList.add("invisible");
}

showtext();
showhomepage();