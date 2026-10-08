/**
 * TITAN FASTENERS - Industrial Fastener & Hardware Supply Distributor
 * Main JavaScript Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Light / Dark)
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('apex_theme') || 'light';
  
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('apex_theme', theme);
    themeToggleBtns.forEach(btn => {
      btn.innerHTML = theme === 'dark' 
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
      btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    });
  }
  
  applyTheme(storedTheme);
  
  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  });

  // 2. RTL Management (LTR / RTL)
  const rtlToggleBtns = document.querySelectorAll('.rtl-toggle-btn');
  const storedDir = localStorage.getItem('apex_dir') || 'ltr';
  
  function applyDirection(dir) {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
    localStorage.setItem('apex_dir', dir);
    rtlToggleBtns.forEach(btn => {
      btn.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      btn.setAttribute('aria-label', `Switch to ${dir === 'rtl' ? 'LTR' : 'RTL'}`);
    });
  }
  
  applyDirection(storedDir);
  
  rtlToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      applyDirection(newDir);
    });
  });

  // 3. Mobile Navigation Drawer & Active State
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const drawerBackdrop = document.querySelector('.mobile-drawer-backdrop');
  const drawerCloseBtn = document.querySelector('.drawer-close-btn');
  
  function resetMobileDropdowns() {
    document.querySelectorAll('.mobile-dropdown-content').forEach(content => {
      content.style.display = 'none';
    });
    document.querySelectorAll('.mobile-dropdown-header .dropdown-chevron').forEach(icon => {
      icon.style.transform = 'rotate(0deg)';
    });
  }

  function openDrawer() {
    if (drawerBackdrop) {
      drawerBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }
  
  function closeDrawer() {
    if (drawerBackdrop) {
      drawerBackdrop.classList.remove('active');
      document.body.style.overflow = '';
      resetMobileDropdowns();
    }
  }
  
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', openDrawer);
  }
  
  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeDrawer);
  }
  
  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', (e) => {
      if (e.target === drawerBackdrop) {
        closeDrawer();
      }
    });
  }

  // 4. Mobile Submenu Accordion & Active Highlighting
  const currentPath = window.location.pathname.toLowerCase();
  const isHomePage = currentPath.endsWith('index.html') || currentPath.endsWith('home-2.html') || currentPath.endsWith('/') || currentPath === '';

  const mobileDropdownBtns = document.querySelectorAll('.mobile-dropdown-header');
  mobileDropdownBtns.forEach(btn => {
    if (isHomePage) {
      btn.classList.add('active');
    }

    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const content = document.getElementById(targetId);
      if (content) {
        const isExpanded = content.style.display === 'flex';
        content.style.display = isExpanded ? 'none' : 'flex';
        const icon = btn.querySelector('.dropdown-chevron');
        if (icon) {
          icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
        }
      }
    });
  });

  // 5. Back to Top Button
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 6. Home 2 Interactive Grade Tabs & Matrix Filters
  const gradePills = document.querySelectorAll('.grade-pill');
  gradePills.forEach(pill => {
    pill.addEventListener('click', () => {
      gradePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  const filterBtns = document.querySelectorAll('.h2-filter-btn');
  const matrixCards = document.querySelectorAll('.h2-matrix-card');
  if (filterBtns.length && matrixCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterVal = (btn.getAttribute('data-filter') || 'all').toLowerCase();

        matrixCards.forEach(card => {
          const cardCat = (card.getAttribute('data-category') || '').toLowerCase();
          if (filterVal === 'all' || cardCat.includes(filterVal)) {
            card.style.display = 'flex';
            card.style.opacity = '0';
            card.style.transform = 'translateY(6px)';
            setTimeout(() => {
              card.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 7. Catalog Interactive Live Filtration Engine (Top Category Ribbon + Search + Sort)
  const catalogGrid = document.getElementById('catalogGrid');
  if (catalogGrid) {
    const catalogCards = Array.from(catalogGrid.querySelectorAll('.catalog-card'));
    const searchInput = document.getElementById('catalogSearchInput');
    const sortSelect = document.getElementById('catalogSortSelect');
    const resultsCountEl = document.getElementById('catalogResultsCount');
    const noResultsEl = document.getElementById('catalogNoResults');
    const resetNoResultsBtn = document.getElementById('catalogNoResultsReset');
    const ribbonPills = document.querySelectorAll('.cat-ribbon-pill');

    let currentCategory = 'all';

    function runCatalogFilter() {
      const query = (searchInput ? searchInput.value : '').trim().toLowerCase();
      let visibleCount = 0;

      catalogCards.forEach(card => {
        const cardCategory = (card.dataset.category || '').toLowerCase();
        const cardText = card.textContent.toLowerCase();

        const cardCategories = cardCategory.split(/\s+/);
        const matchCat = (currentCategory === 'all' || cardCategories.includes(currentCategory));
        const matchSearch = (!query || cardText.includes(query));

        if (matchCat && matchSearch) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (noResultsEl) {
        noResultsEl.style.display = (visibleCount === 0) ? 'block' : 'none';
      }

      if (resultsCountEl) {
        resultsCountEl.textContent = `Showing ${visibleCount} of ${catalogCards.length} SKUs`;
      }

      // Sync Top Ribbon Pills
      ribbonPills.forEach(p => {
        const isMatch = p.dataset.cat === currentCategory;
        p.classList.toggle('active', isMatch);
        p.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      });
    }

    function runCatalogSort() {
      if (!sortSelect) return;
      const val = sortSelect.value;
      const sorted = [...catalogCards].sort((a, b) => {
        const priceA = parseFloat(a.dataset.price || 0);
        const priceB = parseFloat(b.dataset.price || 0);
        const nameA = (a.dataset.name || '').toLowerCase();
        const nameB = (b.dataset.name || '').toLowerCase();

        if (val === 'price-asc') return priceA - priceB;
        if (val === 'price-desc') return priceB - priceA;
        if (val === 'name') return nameA.localeCompare(nameB);
        return 0; // Default/popular keeps initial order
      });

      sorted.forEach(card => catalogGrid.appendChild(card));
      if (noResultsEl) catalogGrid.appendChild(noResultsEl);
    }

    function selectCategory(cat) {
      currentCategory = cat || 'all';
      runCatalogFilter();
    }

    function resetAllFilters() {
      currentCategory = 'all';
      if (searchInput) searchInput.value = '';
      if (sortSelect) sortSelect.value = 'popular';
      runCatalogSort();
      runCatalogFilter();
    }

    // Top Category Ribbon Event Listeners
    ribbonPills.forEach(pill => {
      pill.addEventListener('click', () => {
        selectCategory(pill.dataset.cat);
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', runCatalogFilter);
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        runCatalogSort();
        runCatalogFilter();
      });
    }

    if (resetNoResultsBtn) {
      resetNoResultsBtn.addEventListener('click', resetAllFilters);
    }

    // Check URL parameters for direct category navigation (e.g. ?cat=bolts or ?cat=hex-bolts)
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat');
    if (catParam) {
      let targetCat = 'all';
      if (catParam.includes('bolt')) targetCat = 'bolts';
      else if (catParam.includes('nut')) targetCat = 'nuts';
      else if (catParam.includes('washer')) targetCat = 'washers';
      else if (catParam.includes('screw')) targetCat = 'screws';
      else if (catParam.includes('anchor')) targetCat = 'anchors';
      else if (catParam.includes('stainless')) targetCat = 'stainless';
      else if (catParam.includes('rod')) targetCat = 'rods';
      else if (catParam.includes('rivet')) targetCat = 'rivets';

      selectCategory(targetCat);
    } else {
      runCatalogFilter();
    }
  }

  // 9. Contact FAQ Accordion Handler
  const faqHeaderBtns = document.querySelectorAll('.faq-header-btn');
  faqHeaderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const faqItem = btn.closest('.faq-item');
      if (faqItem) {
        const isActive = faqItem.classList.contains('active');
        // Close all other items
        document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
        if (!isActive) {
          faqItem.classList.add('active');
        }
      }
    });
  });

  // 10. Dashboard Category Filter Pills
  const dashCatPills = document.querySelectorAll('.dash-cat-pill');
  const dashProductCards = document.querySelectorAll('.dash-product-card');
  if (dashCatPills.length && dashProductCards.length) {
    dashCatPills.forEach(pill => {
      pill.addEventListener('click', () => {
        dashCatPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const filterVal = (pill.getAttribute('data-filter') || 'all').toLowerCase();

        dashProductCards.forEach(card => {
          const cardCat = (card.getAttribute('data-category') || '').toLowerCase();
          if (filterVal === 'all' || cardCat.includes(filterVal)) {
            card.style.display = 'flex';
            card.style.opacity = '0';
            card.style.transform = 'translateY(6px)';
            setTimeout(() => {
              card.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 12. Page Preloader Dismissal
  const preloader = document.getElementById('pagePreloader');
  if (preloader) {
    const hidePreloader = () => {
      preloader.classList.add('preloader-hidden');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    };

    if (document.readyState === 'complete') {
      setTimeout(hidePreloader, 350);
    } else {
      window.addEventListener('load', () => {
        setTimeout(hidePreloader, 350);
      });
      // Fallback timeout in case window load already triggered or takes too long
      setTimeout(hidePreloader, 1800);
    }
  }
});


