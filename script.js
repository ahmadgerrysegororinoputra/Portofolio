/**
 * PORTFOLIO SCRIPT - AHMAD GERRY SEGORO RINO PUTRA
 * PPLG SMK Wikrama Bogor
 * Pure Vanilla JavaScript: Typing Effect, Dark/Light Mode, Filter, Form, & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. THEME SWITCHER (DARK / LIGHT MODE)
     ========================================================================== */
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  // Cek preferensi yang tersimpan di LocalStorage atau preferensi sistem OS
  const savedTheme = localStorage.getItem('gerry_theme');
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    if (savedTheme === 'light') {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
    } else {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
    }
  } else if (!systemPrefersDark) {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
  }

  // Event listener tombol ganti tema
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isCurrentlyDark = body.classList.contains('dark-theme');
      if (isCurrentlyDark) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('gerry_theme', 'light');
        showToast('Beralih ke Tema Terang (Light Mode)', 'info');
      } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('gerry_theme', 'dark');
        showToast('Beralih ke Tema Gelap (Dark Mode)', 'info');
      }
    });
  }

  /* ==========================================================================
     2. DYNAMIC TYPING EFFECT
     ========================================================================== */
  const typingElement = document.getElementById('typingText');
  const wordsToType = [
    'Frontend Web Developer',
    'Siswa PPLG SMK Wikrama Bogor',
    'JavaScript Enthusiast',
    'Creative Problem Solver',
    'UI/UX & Web Explorer'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    if (!typingElement) return;

    const currentWord = wordsToType[wordIndex];

    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      // Selesai mengetik satu kata, tunggu sejenak sebelum menghapus
      typingSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Selesai menghapus, ganti ke kata berikutnya
      isDeleting = false;
      wordIndex = (wordIndex + 1) % wordsToType.length;
      typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  // Mulai animasi typing
  typeEffect();

  /* ==========================================================================
     3. NAVBAR SCROLL & ACTIVE LINK SPY
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Tambah shadow saat scroll
    if (navbar) {
      if (scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Scrollspy: update link aktif
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });

    // Back to top button visibility
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'all';
        backToTopBtn.style.transform = 'translateY(0)';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.pointerEvents = 'none';
        backToTopBtn.style.transform = 'translateY(10px)';
      }
    }
  });

  /* ==========================================================================
     4. MOBILE NAVIGATION (HAMBURGER MENU)
     ========================================================================== */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isActive = navMenu.classList.toggle('active');
      hamburgerBtn.classList.toggle('active');
      hamburgerBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    // Tutup menu saat link diklik
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Tutup menu saat klik di luar
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ==========================================================================
     5. PROJECT CATEGORY FILTER
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Atur class active pada tombol
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px) scale(0.97)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  /* ==========================================================================
     6. SKILL BARS ANIMATION ON SCROLL
     ========================================================================== */
  const skillBars = document.querySelectorAll('.skill-progress-fill');
  
  if ('IntersectionObserver' in window) {
    const skillObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            skillBars.forEach((bar) => {
              const targetWidth = bar.style.width;
              bar.style.width = '0%';
              setTimeout(() => {
                bar.style.width = targetWidth;
              }, 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    const skillsSection = document.getElementById('keahlian');
    if (skillsSection) {
      skillObserver.observe(skillsSection);
    }
  }

  /* ==========================================================================
     7. COPY EMAIL TO CLIPBOARD
     ========================================================================== */
  const emailCopyBtn = document.getElementById('emailCopyBtn');
  if (emailCopyBtn) {
    emailCopyBtn.addEventListener('click', () => {
      const email = 'ahmadgerrysegororinoputra@smkwikrama.sch.id';
      navigator.clipboard.writeText(email).then(
        () => {
          showToast('Email berhasil disalin ke clipboard! 📋', 'success');
        },
        () => {
          showToast('Gagal menyalin email otomatis.', 'info');
        }
      );
    });
  }

  /* ==========================================================================
     8. INTERACTIVE CONTACT FORM
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('senderName');
      const emailInput = document.getElementById('senderEmail');
      const subjectInput = document.getElementById('senderSubject');
      const messageInput = document.getElementById('senderMessage');

      let isValid = true;

      // Validasi Nama
      if (!nameInput.value.trim()) {
        setFieldError(nameInput, true);
        isValid = false;
      } else {
        setFieldError(nameInput, false);
      }

      // Validasi Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        setFieldError(emailInput, true);
        isValid = false;
      } else {
        setFieldError(emailInput, false);
      }

      // Validasi Subject
      if (!subjectInput.value.trim()) {
        setFieldError(subjectInput, true);
        isValid = false;
      } else {
        setFieldError(subjectInput, false);
      }

      // Validasi Pesan
      if (!messageInput.value.trim()) {
        setFieldError(messageInput, true);
        isValid = false;
      } else {
        setFieldError(messageInput, false);
      }

      if (!isValid) return;

      // Simulasi Pengiriman Pesan
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim Pesan...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;

        showToast(`Terima kasih ${nameInput.value.trim()}! Pesan Anda telah terkirim. 🚀`, 'success');

        // Reset form input
        contactForm.reset();
      }, 1200);
    });

    // Clear error on input typing
    ['senderName', 'senderEmail', 'senderSubject', 'senderMessage'].forEach((id) => {
      const input = document.getElementById(id);
      if (input) {
        input.addEventListener('input', () => {
          setFieldError(input, false);
        });
      }
    });
  }

  function setFieldError(inputElement, hasError) {
    const parentGroup = inputElement.closest('.form-group');
    if (!parentGroup) return;
    if (hasError) {
      parentGroup.classList.add('has-error');
    } else {
      parentGroup.classList.remove('has-error');
    }
  }

  /* ==========================================================================
     9. MODAL DETAIL PROYEK
     ========================================================================== */
  const infoModal = document.getElementById('infoModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalOkBtn = document.getElementById('modalOkBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalTriggers = document.querySelectorAll('.info-modal-trigger');

  modalTriggers.forEach((btn) => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title');
      const desc = btn.getAttribute('data-desc');

      if (modalTitle) modalTitle.textContent = title || 'Informasi Proyek';
      if (modalDesc) modalDesc.textContent = desc || 'Tidak ada detail tambahan.';

      if (infoModal) infoModal.classList.add('active');
    });
  });

  function closeModal() {
    if (infoModal) infoModal.classList.remove('active');
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOkBtn) modalOkBtn.addEventListener('click', closeModal);
  if (infoModal) {
    infoModal.addEventListener('click', (e) => {
      if (e.target === infoModal) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  /* ==========================================================================
     10. BACK TO TOP BUTTON
     ========================================================================== */
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     11. TOAST NOTIFICATION HELPER
     ========================================================================== */
  function showToast(message, type = 'info', duration = 3800) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const iconClass = type === 'success' ? 'fa-circle-check' : 'fa-circle-info';
    toast.innerHTML = `
      <i class="fa-solid ${iconClass}"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    // Animasi muncul
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    // Animasi hilang
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 350);
    }, duration);
  }

  /* ==========================================================================
     12. DOWNLOAD / VIEW CV BTN NOTIFICATION
     ========================================================================== */
  const downloadCvBtn = document.getElementById('downloadCvBtn');
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', () => {
      showToast('Menampilkan ringkasan profil dan kompetensi Gerry 💡', 'info', 3000);
    });
  }
});
