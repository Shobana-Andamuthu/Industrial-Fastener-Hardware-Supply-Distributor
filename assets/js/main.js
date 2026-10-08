/**
 * TITAN FASTENERS - Industrial Fastener & Hardware Supply Distributor
 * Main JavaScript Controller
 */

// Global Theme Management (Light / Dark)
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('apex_theme', theme);
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.innerHTML = theme === 'dark' 
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  });
}

// Global RTL Management (LTR / RTL)
function applyDirection(dir) {
  document.documentElement.setAttribute('dir', dir);
  document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
  localStorage.setItem('apex_dir', dir);
  document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
    btn.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
    btn.setAttribute('aria-label', `Switch to ${dir === 'rtl' ? 'LTR' : 'RTL'}`);
  });
}

// Immediate Theme & RTL Restoration
const currentStoredTheme = localStorage.getItem('apex_theme') || 'light';
const currentStoredDir = localStorage.getItem('apex_dir') || 'ltr';
applyTheme(currentStoredTheme);
applyDirection(currentStoredDir);

// Delegated Global Event Handler for Theme & RTL (Always Active on All Pages)
document.addEventListener('click', (e) => {
  const themeBtn = e.target.closest('.theme-toggle-btn');
  if (themeBtn) {
    e.preventDefault();
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    return;
  }

  const rtlBtn = e.target.closest('.rtl-toggle-btn');
  if (rtlBtn) {
    e.preventDefault();
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    applyDirection(newDir);
    return;
  }
});

function initTitanApp() {
  // Sync UI state for theme & RTL buttons
  applyTheme(localStorage.getItem('apex_theme') || 'light');
  applyDirection(localStorage.getItem('apex_dir') || 'ltr');

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

  // 13. High-Performance Responsive Custom Select Enhancer (100% Viewport Bound)
  function initCustomSelects() {
    const selects = document.querySelectorAll('select.form-select, select.sku-select, select.catalog-sort-select, select.auth-select, select');

    selects.forEach(select => {
      if (select.dataset.customSelectInit === 'true' || select.getAttribute('data-no-custom') === 'true') return;
      select.dataset.customSelectInit = 'true';

      // Hide native select visually while keeping it in the DOM for forms & accessibility
      select.classList.add('custom-select-native-hidden');

      // Create custom wrapper
      const wrapper = document.createElement('div');
      wrapper.className = 'custom-select-wrapper';
      if (select.className) {
        select.className.split(' ').forEach(cls => {
          if (cls && cls !== 'custom-select-native-hidden') {
            wrapper.classList.add(cls + '-custom');
          }
        });
      }

      if (select.disabled) wrapper.classList.add('disabled');

      // Create trigger button
      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'custom-select-trigger';
      trigger.setAttribute('aria-haspopup', 'listbox');
      trigger.setAttribute('aria-expanded', 'false');
      if (select.id) trigger.setAttribute('aria-controls', 'cmenu-' + select.id);

      const labelSpan = document.createElement('span');
      labelSpan.className = 'custom-select-label';

      const chevron = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      chevron.setAttribute('class', 'custom-select-arrow');
      chevron.setAttribute('width', '16');
      chevron.setAttribute('height', '16');
      chevron.setAttribute('viewBox', '0 0 24 24');
      chevron.setAttribute('fill', 'none');
      chevron.setAttribute('stroke', 'currentColor');
      chevron.setAttribute('stroke-width', '2.2');
      chevron.setAttribute('stroke-linecap', 'round');
      chevron.setAttribute('stroke-linejoin', 'round');
      chevron.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';

      trigger.appendChild(labelSpan);
      trigger.appendChild(chevron);

      // Create dropdown menu
      const menu = document.createElement('div');
      menu.className = 'custom-select-menu';
      menu.setAttribute('role', 'listbox');
      if (select.id) menu.id = 'cmenu-' + select.id;

      function renderOptions() {
        menu.innerHTML = '';
        const options = Array.from(select.options);
        const selectedIndex = select.selectedIndex >= 0 ? select.selectedIndex : 0;
        const currentOption = options[selectedIndex];

        if (currentOption) {
          labelSpan.textContent = currentOption.textContent;
          if (currentOption.disabled || currentOption.value === '') {
            trigger.classList.add('placeholder-active');
          } else {
            trigger.classList.remove('placeholder-active');
          }
        }

        options.forEach((opt, idx) => {
          const optDiv = document.createElement('div');
          optDiv.className = 'custom-select-option';
          optDiv.setAttribute('role', 'option');
          optDiv.setAttribute('data-value', opt.value);
          optDiv.setAttribute('data-index', idx);
          optDiv.textContent = opt.textContent;

          if (opt.disabled) {
            optDiv.classList.add('disabled');
          }
          if (idx === selectedIndex) {
            optDiv.classList.add('selected');
            optDiv.setAttribute('aria-selected', 'true');
          }

          optDiv.addEventListener('click', (e) => {
            e.stopPropagation();
            if (opt.disabled) return;
            select.selectedIndex = idx;
            select.value = opt.value;

            // Dispatch standard events so catalog filtering, calculators, and validation work
            select.dispatchEvent(new Event('input', { bubbles: true }));
            select.dispatchEvent(new Event('change', { bubbles: true }));

            updateDisplay();
            closeMenu();
            trigger.focus();
          });

          menu.appendChild(optDiv);
        });
      }

      function updateDisplay() {
        const selectedIndex = select.selectedIndex >= 0 ? select.selectedIndex : 0;
        const currentOption = select.options[selectedIndex];
        if (currentOption) {
          labelSpan.textContent = currentOption.textContent;
          if (currentOption.disabled || currentOption.value === '') {
            trigger.classList.add('placeholder-active');
          } else {
            trigger.classList.remove('placeholder-active');
          }
        }
        menu.querySelectorAll('.custom-select-option').forEach((el, idx) => {
          const isSel = idx === selectedIndex;
          el.classList.toggle('selected', isSel);
          el.setAttribute('aria-selected', isSel ? 'true' : 'false');
        });
      }

      function checkDropPosition() {
        const rect = trigger.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        if (spaceBelow < 220 && spaceAbove > spaceBelow) {
          wrapper.classList.add('dropup');
        } else {
          wrapper.classList.remove('dropup');
        }
      }

      function openMenu() {
        document.querySelectorAll('.custom-select-wrapper.open').forEach(w => {
          if (w !== wrapper) {
            w.classList.remove('open');
            const trig = w.querySelector('.custom-select-trigger');
            if (trig) trig.setAttribute('aria-expanded', 'false');
          }
        });
        checkDropPosition();
        wrapper.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');

        const selectedOpt = menu.querySelector('.custom-select-option.selected');
        if (selectedOpt) {
          selectedOpt.scrollIntoView({ block: 'nearest' });
        }
      }

      function closeMenu() {
        wrapper.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      }

      function toggleMenu() {
        if (wrapper.classList.contains('open')) {
          closeMenu();
        } else {
          openMenu();
        }
      }

      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
      });

      // Keyboard navigation
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'Down') {
          e.preventDefault();
          if (!wrapper.classList.contains('open')) {
            openMenu();
          } else {
            const nextIndex = Math.min(select.options.length - 1, select.selectedIndex + 1);
            if (!select.options[nextIndex].disabled) {
              select.selectedIndex = nextIndex;
              select.dispatchEvent(new Event('input', { bubbles: true }));
              select.dispatchEvent(new Event('change', { bubbles: true }));
              updateDisplay();
            }
          }
        } else if (e.key === 'ArrowUp' || e.key === 'Up') {
          e.preventDefault();
          if (!wrapper.classList.contains('open')) {
            openMenu();
          } else {
            const prevIndex = Math.max(0, select.selectedIndex - 1);
            if (!select.options[prevIndex].disabled) {
              select.selectedIndex = prevIndex;
              select.dispatchEvent(new Event('input', { bubbles: true }));
              select.dispatchEvent(new Event('change', { bubbles: true }));
              updateDisplay();
            }
          }
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleMenu();
        } else if (e.key === 'Escape' || e.key === 'Tab') {
          closeMenu();
        }
      });

      // Synchronize when underlying select value changes externally
      select.addEventListener('change', () => {
        updateDisplay();
      });

      // Insert wrapper into DOM
      select.parentNode.insertBefore(wrapper, select);
      wrapper.appendChild(trigger);
      wrapper.appendChild(menu);
      wrapper.appendChild(select);

      renderOptions();
    });

    // Close on document click outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.custom-select-wrapper')) {
        document.querySelectorAll('.custom-select-wrapper.open').forEach(w => {
          w.classList.remove('open');
          const trig = w.querySelector('.custom-select-trigger');
          if (trig) trig.setAttribute('aria-expanded', 'false');
        });
      }
    });

    // Close on resize/scroll
    window.addEventListener('resize', () => {
      document.querySelectorAll('.custom-select-wrapper.open').forEach(w => {
        w.classList.remove('open');
        const trig = w.querySelector('.custom-select-trigger');
        if (trig) trig.setAttribute('aria-expanded', 'false');
      });
    }, { passive: true });
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
      setTimeout(hidePreloader, 1800);
    }
  }

  // 14. High-Performance Responsive Custom Date Picker (100% Viewport Bound, Zero Gap)
  function initCustomDatePickers() {
    const dateInputs = document.querySelectorAll('input[type="date"]');

    dateInputs.forEach(dateInput => {
      if (dateInput.dataset.customDateInit === 'true' || dateInput.getAttribute('data-no-custom') === 'true') return;
      dateInput.dataset.customDateInit = 'true';

      // Hide native date input visually
      dateInput.classList.add('custom-datepicker-native-hidden');

      // Create wrapper
      const wrapper = document.createElement('div');
      wrapper.className = 'custom-datepicker-wrapper';

      // Trigger button
      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'custom-datepicker-trigger form-input';
      trigger.setAttribute('aria-haspopup', 'dialog');
      trigger.setAttribute('aria-expanded', 'false');

      const labelSpan = document.createElement('span');
      labelSpan.className = 'custom-datepicker-label';
      labelSpan.textContent = dateInput.value ? formatDateDisplay(dateInput.value) : (dateInput.getAttribute('placeholder') || 'Select required date...');
      if (!dateInput.value) trigger.classList.add('placeholder-active');

      const calIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      calIcon.setAttribute('class', 'custom-datepicker-icon');
      calIcon.setAttribute('width', '18');
      calIcon.setAttribute('height', '18');
      calIcon.setAttribute('viewBox', '0 0 24 24');
      calIcon.setAttribute('fill', 'none');
      calIcon.setAttribute('stroke', 'currentColor');
      calIcon.setAttribute('stroke-width', '2');
      calIcon.setAttribute('stroke-linecap', 'round');
      calIcon.setAttribute('stroke-linejoin', 'round');
      calIcon.innerHTML = '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>';

      trigger.appendChild(labelSpan);
      trigger.appendChild(calIcon);

      // Popover Calendar Dialog
      const popover = document.createElement('div');
      popover.className = 'custom-datepicker-popover';
      popover.setAttribute('role', 'dialog');
      popover.setAttribute('aria-label', 'Calendar Date Picker');

      let viewDate = dateInput.value ? new Date(dateInput.value + 'T00:00:00') : new Date();
      if (isNaN(viewDate.getTime())) viewDate = new Date();

      let currentYear = viewDate.getFullYear();
      let currentMonth = viewDate.getMonth(); // 0-11

      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

      function formatDateDisplay(isoString) {
        if (!isoString) return '';
        const parts = isoString.split('-');
        if (parts.length !== 3) return isoString;
        const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        if (isNaN(d.getTime())) return isoString;
        return monthNames[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
      }

      function renderCalendar() {
        popover.innerHTML = '';

        // Header
        const header = document.createElement('div');
        header.className = 'cdp-header';

        const prevBtn = document.createElement('button');
        prevBtn.type = 'button';
        prevBtn.className = 'cdp-nav-btn cdp-prev';
        prevBtn.setAttribute('aria-label', 'Previous Month');
        prevBtn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>';
        prevBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          currentMonth--;
          if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
          }
          renderCalendar();
        });

        const titleWrap = document.createElement('div');
        titleWrap.className = 'cdp-title';
        titleWrap.textContent = `${monthNames[currentMonth]} ${currentYear}`;

        const nextBtn = document.createElement('button');
        nextBtn.type = 'button';
        nextBtn.className = 'cdp-nav-btn cdp-next';
        nextBtn.setAttribute('aria-label', 'Next Month');
        nextBtn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>';
        nextBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          currentMonth++;
          if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
          }
          renderCalendar();
        });

        header.appendChild(prevBtn);
        header.appendChild(titleWrap);
        header.appendChild(nextBtn);
        popover.appendChild(header);

        // Weekday row
        const weekdays = document.createElement('div');
        weekdays.className = 'cdp-weekdays';
        ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].forEach(day => {
          const span = document.createElement('span');
          span.textContent = day;
          weekdays.appendChild(span);
        });
        popover.appendChild(weekdays);

        // Days Grid
        const daysGrid = document.createElement('div');
        daysGrid.className = 'cdp-days-grid';

        const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

        const today = new Date();
        const isCurrentMonthThisMonth = today.getFullYear() === currentYear && today.getMonth() === currentMonth;

        let selectedYear = null, selectedMonth = null, selectedDay = null;
        if (dateInput.value) {
          const sParts = dateInput.value.split('-');
          if (sParts.length === 3) {
            selectedYear = parseInt(sParts[0]);
            selectedMonth = parseInt(sParts[1]) - 1;
            selectedDay = parseInt(sParts[2]);
          }
        }

        // Previous month padding days
        for (let i = firstDayIndex - 1; i >= 0; i--) {
          const pDay = daysInPrevMonth - i;
          const dayCell = document.createElement('button');
          dayCell.type = 'button';
          dayCell.className = 'cdp-day other-month';
          dayCell.textContent = pDay;
          dayCell.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            currentMonth--;
            if (currentMonth < 0) {
              currentMonth = 11;
              currentYear--;
            }
            selectDay(pDay);
          });
          daysGrid.appendChild(dayCell);
        }

        // Current month days
        for (let day = 1; day <= daysInMonth; day++) {
          const dayCell = document.createElement('button');
          dayCell.type = 'button';
          dayCell.className = 'cdp-day current-month';
          dayCell.textContent = day;

          if (isCurrentMonthThisMonth && today.getDate() === day) {
            dayCell.classList.add('today');
          }

          if (selectedYear === currentYear && selectedMonth === currentMonth && selectedDay === day) {
            dayCell.classList.add('selected');
          }

          dayCell.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            selectDay(day);
          });

          daysGrid.appendChild(dayCell);
        }

        // Next month padding days
        const totalRendered = firstDayIndex + daysInMonth;
        const nextDaysCount = (totalRendered <= 35 ? 35 : 42) - totalRendered;
        for (let n = 1; n <= nextDaysCount; n++) {
          const dayCell = document.createElement('button');
          dayCell.type = 'button';
          dayCell.className = 'cdp-day other-month';
          dayCell.textContent = n;
          dayCell.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            currentMonth++;
            if (currentMonth > 11) {
              currentMonth = 0;
              currentYear++;
            }
            selectDay(n);
          });
          daysGrid.appendChild(dayCell);
        }

        popover.appendChild(daysGrid);

        // Footer Actions (Clear & Today)
        const footer = document.createElement('div');
        footer.className = 'cdp-footer';

        const clearBtn = document.createElement('button');
        clearBtn.type = 'button';
        clearBtn.className = 'cdp-action-btn cdp-clear';
        clearBtn.textContent = 'Clear';
        clearBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          dateInput.value = '';
          dateInput.dispatchEvent(new Event('input', { bubbles: true }));
          dateInput.dispatchEvent(new Event('change', { bubbles: true }));
          labelSpan.textContent = dateInput.getAttribute('placeholder') || 'Select required date...';
          trigger.classList.add('placeholder-active');
          closePopover();
        });

        const todayBtn = document.createElement('button');
        todayBtn.type = 'button';
        todayBtn.className = 'cdp-action-btn cdp-today';
        todayBtn.textContent = 'Today';
        todayBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const now = new Date();
          currentYear = now.getFullYear();
          currentMonth = now.getMonth();
          selectDay(now.getDate());
        });

        footer.appendChild(clearBtn);
        footer.appendChild(todayBtn);
        popover.appendChild(footer);
      }

      function selectDay(day) {
        const mm = String(currentMonth + 1).padStart(2, '0');
        const dd = String(day).padStart(2, '0');
        const isoValue = `${currentYear}-${mm}-${dd}`;
        dateInput.value = isoValue;

        dateInput.dispatchEvent(new Event('input', { bubbles: true }));
        dateInput.dispatchEvent(new Event('change', { bubbles: true }));

        labelSpan.textContent = formatDateDisplay(isoValue);
        trigger.classList.remove('placeholder-active');
        closePopover();
      }

      function checkPosition() {
        const rect = trigger.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;

        if (spaceBelow < 310 && spaceAbove > spaceBelow) {
          wrapper.classList.add('dropup');
        } else {
          wrapper.classList.remove('dropup');
        }

        // Keep inside horizontal viewport
        if (rect.left + 300 > window.innerWidth) {
          popover.style.right = '0px';
          popover.style.left = 'auto';
        } else {
          popover.style.left = '0px';
          popover.style.right = 'auto';
        }
      }

      function openPopover() {
        document.querySelectorAll('.custom-datepicker-wrapper.open').forEach(w => {
          if (w !== wrapper) {
            w.classList.remove('open');
            const tr = w.querySelector('.custom-datepicker-trigger');
            if (tr) tr.setAttribute('aria-expanded', 'false');
          }
        });
        document.querySelectorAll('.custom-select-wrapper.open').forEach(w => {
          w.classList.remove('open');
        });

        if (dateInput.value) {
          const parts = dateInput.value.split('-');
          if (parts.length === 3) {
            currentYear = parseInt(parts[0]);
            currentMonth = parseInt(parts[1]) - 1;
          }
        }

        renderCalendar();
        checkPosition();
        wrapper.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }

      function closePopover() {
        wrapper.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      }

      function togglePopover() {
        if (wrapper.classList.contains('open')) {
          closePopover();
        } else {
          openPopover();
        }
      }

      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        togglePopover();
      });

      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          togglePopover();
        } else if (e.key === 'Escape' || e.key === 'Tab') {
          closePopover();
        }
      });

      // Synchronize with external changes
      dateInput.addEventListener('change', () => {
        if (dateInput.value) {
          labelSpan.textContent = formatDateDisplay(dateInput.value);
          trigger.classList.remove('placeholder-active');
        } else {
          labelSpan.textContent = dateInput.getAttribute('placeholder') || 'Select required date...';
          trigger.classList.add('placeholder-active');
        }
      });

      // Insert wrapper into DOM
      dateInput.parentNode.insertBefore(wrapper, dateInput);
      wrapper.appendChild(trigger);
      wrapper.appendChild(popover);
      wrapper.appendChild(dateInput);
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.custom-datepicker-wrapper')) {
        document.querySelectorAll('.custom-datepicker-wrapper.open').forEach(w => {
          w.classList.remove('open');
          const tr = w.querySelector('.custom-datepicker-trigger');
          if (tr) tr.setAttribute('aria-expanded', 'false');
        });
      }
    });

    // Close on resize/scroll
    window.addEventListener('resize', () => {
      document.querySelectorAll('.custom-datepicker-wrapper.open').forEach(w => {
        w.classList.remove('open');
        const tr = w.querySelector('.custom-datepicker-trigger');
        if (tr) tr.setAttribute('aria-expanded', 'false');
      });
    }, { passive: true });
  }

  // Initialize Custom Selects & Date Pickers
  initCustomSelects();
  initCustomDatePickers();
}

// Bootstrap application immediately or on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTitanApp);
} else {
  initTitanApp();
}




