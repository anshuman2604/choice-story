
function handleAmbientLighting() {
    try {
      const root = document.documentElement;
      const particles = document.querySelector('.cyber-particles');
  

      if (particles) {
        for (let i = 0; i < 50; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle';
          particle.style.setProperty('--delay', `${Math.random() * 5}s`);
          particle.style.setProperty('--size', `${Math.random() * 3 + 1}px`);
          particles.appendChild(particle);
        }
      }
  

      let debounceTimeout;
      document.addEventListener('mousemove', (e) => {
        if (debounceTimeout) {
          window.cancelAnimationFrame(debounceTimeout);
        }
  
        debounceTimeout = window.requestAnimationFrame(() => {
          const x = (e.clientX / window.innerWidth) * 100;
          const y = (e.clientY / window.innerHeight) * 100;
  
          root.style.setProperty('--mouse-x', `${x}%`);
          root.style.setProperty('--mouse-y', `${y}%`);
  

          if (particles) {
            particles.style.transform = `translate(${x/50}px, ${y/50}px)`;
          }
        });
      });
    } catch (error) {
      console.error('Error setting up ambient lighting:', error);
    }
  }
  

  function setupStoryObserver() {
    try {
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      };
  
      const storyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            storyObserver.unobserve(entry.target);
          }
        });
      }, observerOptions);
  
      const storyCard = document.querySelector('.story-card');
      if (storyCard) {
        storyObserver.observe(storyCard);
  
   
        storyCard.addEventListener('mouseenter', () => {
          storyCard.style.transform = 'scale(1.02)';
          storyCard.style.boxShadow = '0 0 30px var(--glow-color)';
        });
  
        storyCard.addEventListener('mouseleave', () => {
          storyCard.style.transform = 'scale(1)';
          storyCard.style.boxShadow = 'none';
        });
      }
    } catch (error) {
      console.error('Error setting up story observer:', error);
    }
  }
  
 
  function setupMobileMenu() {
    try {
      const menuToggle = document.querySelector('.menu-toggle');
      const navLinks = document.querySelector('.nav-links');
  
      if (menuToggle && navLinks) {

        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
          link.addEventListener('mouseenter', () => {
            link.style.textShadow = '0 0 10px var(--glow-color)';
          });
  
          link.addEventListener('mouseleave', () => {
            link.style.textShadow = 'none';
          });
        });
  
        menuToggle.addEventListener('click', () => {
          navLinks.classList.toggle('active');
          menuToggle.classList.toggle('active');
        });
      }
    } catch (error) {
      console.error('Error setting up mobile menu:', error);
    }
  }
  

  function handlePreloader() {
    try {
      const preloader = document.querySelector('.preloader');
      if (preloader) {
        setTimeout(() => {
          preloader.classList.add('hide');
          document.body.classList.add('loaded');
        }, 2000);
      }
    } catch (error) {
      console.error('Error handling preloader:', error);
    }
  }
  

  function enhanceGlitchEffect() {
    const glitchTexts = document.querySelectorAll('.glitch-span');
  
    glitchTexts.forEach(text => {

      text.style.setProperty('--glitch-duration', `${Math.random() * 2 + 1}s`);
  
      text.addEventListener('mouseover', () => {
        text.style.animation = 'none';
        text.offsetHeight; 
        text.style.animation = null;
        text.classList.add('glitch-hover');
      });
  
      text.addEventListener('mouseleave', () => {
        text.classList.remove('glitch-hover');
      });
    });
  }
  
  function setupStoryParallax() {
    const storyCard = document.querySelector('.story-card');
    const storyImage = document.querySelector('.story-image-overlay');
  
    if (storyCard && storyImage) {
      storyCard.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = storyCard.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
  
        storyImage.style.transform = `
          scale(1.1) 
          translate(${x * 10}px, ${y * 10}px)
          rotateX(${(y - 0.5) * 10}deg)
          rotateY(${(x - 0.5) * 10}deg)
        `;
      });
  
      storyCard.addEventListener('mouseleave', () => {
        storyImage.style.transform = 'scale(1) translate(0, 0) rotateX(0) rotateY(0)';
      });
    }
  }
  
  function handleScrollAnimations() {
    const elements = document.querySelectorAll('.story-card, .hero-content');
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );
  
    elements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      observer.observe(element);
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    setupStoryObserver();
    setupMobileMenu();
    handlePreloader();
    handleAmbientLighting();
    enhanceGlitchEffect();
    setupStoryParallax();
    handleScrollAnimations();
  });