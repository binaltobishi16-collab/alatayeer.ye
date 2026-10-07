/**
 * عالطائر (Alatayer) - Official Landing Page Script
 * Smart Device Detection, Micro-Interactions, and Performance Optimization
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Smart Device Detection & Button Spotlighting
  detectDeviceAndHighlightStore();

  // 2. Header shadow on scroll
  setupHeaderScrollEffect();

  // 3. Smooth scroll for hero CTA
  setupSmoothScroll();

  // 4. Desktop QR Code generation / setup
  setupDesktopQRCode();

  // 5. Interactive micro-interactions in phone preview
  setupAppPreviewInteractions();
});

/**
 * Detect User Operating System and spotlight the relevant store
 */
function detectDeviceAndHighlightStore() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const platform = navigator.platform || '';
  
  const isIOS = (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) || 
                (platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAndroid = /android/i.test(userAgent);

  const bannerText = document.getElementById('deviceBannerText');
  const btnAppStore = document.getElementById('btnAppStore');
  const btnGooglePlay = document.getElementById('btnGooglePlay');
  const appStoreTag = document.getElementById('appStoreTag');
  const googlePlayTag = document.getElementById('googlePlayTag');

  if (isIOS) {
    if (btnAppStore) btnAppStore.classList.add('is-recommended');
    if (appStoreTag) appStoreTag.style.display = 'block';
    if (bannerText) {
      bannerText.innerHTML = '✨ رصدنا أنك تستخدم جهاز <strong>iPhone / Apple</strong> — جاهز للتحميل فوراً من App Store';
    }
  } else if (isAndroid) {
    if (btnGooglePlay) btnGooglePlay.classList.add('is-recommended');
    if (googlePlayTag) googlePlayTag.style.display = 'block';
    if (bannerText) {
      bannerText.innerHTML = '✨ رصدنا أنك تستخدم جهاز <strong>Android</strong> — جاهز للتحميل فوراً من Google Play';
    }
  } else {
    // Desktop or other
    if (bannerText) {
      bannerText.innerHTML = '💻 تتصفح من جهاز الكمبيوتر — حمّل التطبيق لمتجرك أو امسح رمز QR بهاتفك';
    }
  }
}

/**
 * Dynamic Header Shadow on Scroll
 */
function setupHeaderScrollEffect() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 15) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/**
 * Smooth Scroll to Download Section with visual attention pulse
 */
function setupSmoothScroll() {
  const heroCta = document.getElementById('heroCtaBtn');
  if (!heroCta) return;

  heroCta.addEventListener('click', (e) => {
    e.preventDefault();
    const downloadSection = document.getElementById('download');
    if (downloadSection) {
      downloadSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Highlight the recommended or primary button briefly
      setTimeout(() => {
        const recommendedBtn = document.querySelector('.store-btn.is-recommended') || document.querySelector('.store-btn');
        if (recommendedBtn) {
          recommendedBtn.style.transform = 'scale(1.03)';
          setTimeout(() => {
            recommendedBtn.style.transform = '';
          }, 350);
        }
      }, 500);
    }
  });
}

/**
 * Render dynamic QR Code for Desktop users to scan and download on phone
 */
function setupDesktopQRCode() {
  const qrContainer = document.getElementById('desktopQrContainer');
  if (!qrContainer) return;

  // Use a public fast high-res QR code API to render the landing page url
  const currentUrl = window.location.href;
  const qrImg = document.createElement('img');
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(currentUrl)}&color=03122c&bgcolor=ffffff&margin=1`;
  qrImg.alt = 'رمز QR لتحميل تطبيق عالطائر';
  qrImg.loading = 'lazy';
  qrContainer.appendChild(qrImg);
}

/**
 * Micro interactions in simulated phone UI
 */
function setupAppPreviewInteractions() {
  const miniCards = document.querySelectorAll('.mini-category-card');
  miniCards.forEach(card => {
    card.addEventListener('click', () => {
      card.style.transform = 'scale(0.95)';
      setTimeout(() => {
        card.style.transform = '';
      }, 150);
    });
  });
}
