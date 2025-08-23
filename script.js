document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();
  
  // Mobile menu toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  menuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    const icon = menuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
  
  // Scroll progress bar
  const progress = document.getElementById("scroll-progress");
  window.addEventListener("scroll", () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progress.style.width = scrolled + '%';
    
    // Header scroll effect
    const header = document.querySelector('.site-header');
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Active nav highlight
  const sections = document.querySelectorAll("section");
  const navLinksAll = document.querySelectorAll(".nav-link");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 100) {
        current = section.id;
      }
    });
    navLinksAll.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
  
  // Reveal animations with IntersectionObserver
  const reveals = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Animate skill bars
        if (entry.target.querySelector('.skill-progress')) {
          const skillBars = entry.target.querySelectorAll('.skill-progress');
          skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
          });
        }
        
        // Animate stats
        if (entry.target.querySelector('.stat-number')) {
          const stats = entry.target.querySelectorAll('.stat-number');
          stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 16ms per frame approx
            let current = 0;
            
            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                clearInterval(timer);
                stat.textContent = target + '+';
              } else {
                stat.textContent = Math.floor(current) + '+';
              }
            }, 16);
          });
        }
      }
    });
  }, { threshold: 0.15 });
  
  reveals.forEach(reveal => revealObs.observe(reveal));
  
  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  
  contactForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simple validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !message) {
      formStatus.textContent = 'Please fill in all fields.';
      formStatus.className = 'error';
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formStatus.textContent = 'Please enter a valid email address.';
      formStatus.className = 'error';
      return;
    }
    
    // Simulate form submission
    formStatus.textContent = 'Sending your message...';
    formStatus.className = '';
    
    setTimeout(() => {
      formStatus.textContent = 'Thank you! Your message has been sent.';
      formStatus.className = 'success';
      contactForm.reset();
    }, 1500);
  });
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        navLinks.classList.remove('active');
        menuBtn.querySelector('i').classList.remove('fa-times');
        menuBtn.querySelector('i').classList.add('fa-bars');
        
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
});
